"""Render utilities for the operations newsletter."""

from __future__ import annotations

import logging
from dataclasses import asdict, is_dataclass
from pathlib import Path
from typing import Any, Dict, Optional, Tuple

try:  # pragma: no cover - optional dependency
    import jinja2  # type: ignore
except Exception:  # pragma: no cover
    jinja2 = None  # type: ignore

try:  # Optional dependency used for PDF generation.
    import pdfkit  # type: ignore
except Exception:  # pragma: no cover - pdfkit is optional in tests
    pdfkit = None  # type: ignore

LOGGER = logging.getLogger(__name__)


def _build_environment(template_path: Path) -> Optional[Any]:
    if not jinja2:
        return None
    loader = jinja2.FileSystemLoader(str(template_path.parent))
    env = jinja2.Environment(autoescape=True, loader=loader)
    return env


def render_html(template_path: Path | str, context: Dict[str, Any]) -> str:
    template_path = Path(template_path)
    environment = _build_environment(template_path)
    if environment is None:
        return _render_without_jinja(context)
    template = environment.get_template(template_path.name)
    return template.render(**context)


def _render_without_jinja(context: Dict[str, Any]) -> str:
    org = context.get("organization", {})
    teams = context.get("team_kpis", [])
    transcripts = context.get("transcripts", [])

    def _render_team(team: Dict[str, Any]) -> str:
        keywords = ", ".join(team.get("top_keywords", []))
        return (
            f"<article class='team'>"
            f"<h3>{team.get('team_id', '').title()}</h3>"
            f"<ul>"
            f"<li>Members: {team.get('member_count', 0)}</li>"
            f"<li>Incidents: {team.get('incident_count', 0)}</li>"
            f"<li>Open incidents: {team.get('open_incidents', 0)}</li>"
            f"<li>Average resolution: {team.get('average_resolution_minutes', 'n/a')}</li>"
            f"<li>Top keywords: {keywords}</li>"
            f"</ul></article>"
        )

    def _render_transcript(transcript: Dict[str, Any]) -> str:
        keywords = ", ".join(
            f"{keyword} ({count})" for keyword, count in transcript.get("top_keywords", [])
        )
        return (
            f"<article class='transcript'>"
            f"<h3>{transcript.get('team_id', '').title()}</h3>"
            f"<p><strong>Highlights:</strong> {transcript.get('highlights', '')}</p>"
            f"<p><strong>Top Keywords:</strong> {keywords}</p>"
            f"</article>"
        )

    teams_html = "".join(_render_team(team) for team in teams)
    transcripts_html = "".join(_render_transcript(item) for item in transcripts)

    return (
        "<!DOCTYPE html><html><head><meta charset='UTF-8'><title>Operations Newsletter"  # noqa: E501
        "</title></head><body>"
        f"<header><h1>Operations Newsletter</h1><p>Total members: {org.get('total_members', 0)}</p>"
        f"<p>Total incidents: {org.get('total_incidents', 0)}</p>"
        f"<p>Open incidents: {org.get('open_incidents', 0)}</p>"
        f"<p>Average resolution (minutes): {org.get('average_resolution_minutes', 0)}</p>"
        "</header>"
        f"<section id='teams'><h2>Team Highlights</h2>{teams_html}</section>"
        f"<section id='transcripts'><h2>Meeting Highlights</h2>{transcripts_html}</section>"
        "</body></html>"
    )


def _resolve_pdfkit_config(binary_path: Optional[Path]) -> Optional[Any]:
    if not pdfkit:
        LOGGER.info("pdfkit not available; skipping PDF generation")
        return None
    if not binary_path:
        return None
    binary_path = binary_path.resolve()
    if not binary_path.exists():
        LOGGER.warning("wkhtmltopdf binary not found at %s; skipping PDF generation", binary_path)
        return None
    return pdfkit.configuration(wkhtmltopdf=str(binary_path))


def write_output(html: str, output_html: Path | str, output_pdf: Optional[Path | str], *, pdf_binary: Optional[Path] = None) -> Tuple[Path, Optional[Path]]:
    output_html = Path(output_html)
    output_html.parent.mkdir(parents=True, exist_ok=True)
    output_html.write_text(html, encoding="utf-8")

    pdf_path: Optional[Path] = None
    if output_pdf:
        pdf_path = Path(output_pdf)
        pdf_path.parent.mkdir(parents=True, exist_ok=True)
        config = _resolve_pdfkit_config(pdf_binary)
        if config and pdfkit:
            pdfkit.from_string(html, str(pdf_path), configuration=config)
        else:
            LOGGER.info("PDF generation skipped; configuration missing")
            pdf_path = None

    return output_html, pdf_path


def build_context(*, org_rollup: Dict[str, Any], team_kpis: Dict[str, Any], transcript_summaries: Dict[str, Any]) -> Dict[str, Any]:
    serialized_team_kpis = [
        asdict(kpi) if is_dataclass(kpi) else kpi for kpi in team_kpis.values()
    ]
    serialized_transcripts = [
        asdict(summary) if is_dataclass(summary) else summary
        for summary in transcript_summaries.values()
    ]
    return {
        "organization": org_rollup,
        "team_kpis": serialized_team_kpis,
        "transcripts": serialized_transcripts,
    }


def render_newsletter(
    *,
    template_path: Path | str,
    context: Dict[str, Any],
    css_path: Optional[Path | str] = None,
    output_html: Optional[Path | str] = None,
    output_pdf: Optional[Path | str] = None,
    wkhtmltopdf_binary: Optional[Path | str] = None,
) -> Dict[str, Optional[Path]]:
    html = render_html(Path(template_path), context)

    if css_path:
        css_path = Path(css_path)
        if css_path.exists():
            css = css_path.read_text(encoding="utf-8")
            html = html.replace("</head>", f"<style>{css}</style></head>")
        else:
            LOGGER.warning("CSS file %s does not exist", css_path)

    result: Dict[str, Optional[Path]] = {"html": None, "pdf": None}
    if output_html:
        wkhtmltopdf_binary_path = Path(wkhtmltopdf_binary) if wkhtmltopdf_binary else None
        html_path, pdf_path = write_output(
            html,
            output_html,
            output_pdf,
            pdf_binary=wkhtmltopdf_binary_path,
        )
        result["html"] = html_path
        result["pdf"] = pdf_path
    else:
        result["html_content"] = html  # type: ignore[assignment]

    return result


__all__ = [
    "build_context",
    "render_html",
    "render_newsletter",
    "write_output",
]
