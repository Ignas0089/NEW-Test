"""Command line entry point for generating the operations newsletter."""

from __future__ import annotations

import argparse
import logging
from pathlib import Path
from typing import Any, Dict

from app.ingest.incidents import load_incidents
from app.ingest.teams_export import load_team_members
from app.metrics.kpi import compute_org_rollup, compute_team_kpis
from app.nlp.transcripts import load_transcripts, summarize_transcripts
from app.render.newsletter import build_context, render_newsletter
from app.utils.config import load_config_file

LOGGER = logging.getLogger(__name__)


def _load_config(path: Path | str) -> Dict[str, Any]:
    path = Path(path)
    if not path.exists():
        raise FileNotFoundError(path)
    return load_config_file(path)


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--config", default="config/config.yaml", help="Path to the configuration file")
    parser.add_argument("--output-html", dest="output_html", help="Override the HTML output path", default=None)
    parser.add_argument("--output-pdf", dest="output_pdf", help="Override the PDF output path", default=None)
    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> Dict[str, Any]:
    args = parse_args(argv)
    config = _load_config(args.config)

    data_cfg = config.get("data_paths", {})
    members = load_team_members(data_cfg["teams_export"])
    incidents = load_incidents(data_cfg["incidents"])
    transcripts_raw = load_transcripts(data_cfg["transcripts"])
    transcript_summaries = summarize_transcripts(transcripts_raw)

    team_kpis = compute_team_kpis(members, incidents, transcript_summaries)
    org_rollup = compute_org_rollup(team_kpis.values())
    context = build_context(org_rollup=org_rollup, team_kpis=team_kpis, transcript_summaries=transcript_summaries)

    newsletter_cfg = config.get("newsletter", {})
    output_html = args.output_html or newsletter_cfg.get("output_html")
    output_pdf = args.output_pdf or newsletter_cfg.get("output_pdf")
    wkhtmltopdf_binary = config.get("wkhtmltopdf", {}).get("binary_path")

    result = render_newsletter(
        template_path=newsletter_cfg["template"],
        context=context,
        css_path=newsletter_cfg.get("css"),
        output_html=output_html,
        output_pdf=output_pdf,
        wkhtmltopdf_binary=wkhtmltopdf_binary,
    )

    LOGGER.info("Newsletter generated: %s", result)
    return result


if __name__ == "__main__":  # pragma: no cover
    main()
