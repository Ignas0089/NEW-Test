from pathlib import Path

from app.ingest.incidents import load_incidents
from app.ingest.teams_export import load_team_members
from app.metrics.kpi import compute_org_rollup, compute_team_kpis
from app.nlp.transcripts import load_transcripts, summarize_transcripts

FIXTURES = Path("tests/fixtures")


def test_compute_team_kpis_and_rollup():
    members = load_team_members(FIXTURES / "teams.csv")
    incidents = load_incidents(FIXTURES / "incidents.json")
    transcripts = load_transcripts(FIXTURES / "transcripts")
    summaries = summarize_transcripts(transcripts)

    kpis = compute_team_kpis(members, incidents, summaries)
    assert set(kpis) == {"alpha"}
    alpha = kpis["alpha"]
    assert alpha.member_count == 2
    assert alpha.incident_count == 1
    assert alpha.average_resolution_minutes == 30
    assert alpha.top_keywords

    rollup = compute_org_rollup(kpis.values())
    assert rollup["total_members"] == 2
    assert rollup["total_incidents"] == 1
