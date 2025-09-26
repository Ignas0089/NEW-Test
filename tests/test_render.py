from pathlib import Path

from app.metrics.kpi import TeamKPI
from app.render.newsletter import build_context, render_newsletter
from app.nlp.transcripts import TranscriptSummary


def test_render_newsletter_html_only(tmp_path):
    context = build_context(
        org_rollup={
            "total_members": 2,
            "total_incidents": 1,
            "open_incidents": 0,
            "average_resolution_minutes": 30.0,
        },
        team_kpis={
            "alpha": TeamKPI(
                team_id="alpha",
                member_count=2,
                incident_count=1,
                average_resolution_minutes=30.0,
                open_incidents=0,
                top_keywords=["monitoring", "response"],
            )
        },
        transcript_summaries={
            "alpha": TranscriptSummary(
                team_id="alpha",
                word_count=12,
                top_keywords=[("monitoring", 2)],
                highlights="Highlights",
            )
        },
    )

    result = render_newsletter(
        template_path=Path("app/render/templates/default/newsletter.html"),
        context=context,
        output_html=tmp_path / "newsletter.html",
        output_pdf=None,
        wkhtmltopdf_binary=Path("bin/wkhtmltopdf"),
    )

    assert result["html"].exists()
    assert result["pdf"] is None
    assert "Operations Newsletter" in (tmp_path / "newsletter.html").read_text(encoding="utf-8")
