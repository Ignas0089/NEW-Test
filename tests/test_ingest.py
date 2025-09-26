from pathlib import Path

from app.ingest.incidents import Incident, load_incidents
from app.ingest.teams_export import TeamMember, index_by_team, load_team_members

FIXTURES = Path("tests/fixtures")


def test_load_team_members():
    members = load_team_members(FIXTURES / "teams.csv")
    assert len(members) == 2
    assert members[0] == TeamMember(
        team_id="alpha",
        member_id="1",
        name="Alice Smith",
        role="Manager",
        timezone="UTC",
        email="alice@example.com",
    )


def test_index_by_team():
    members = load_team_members(FIXTURES / "teams.csv")
    grouped = index_by_team(members)
    assert set(grouped) == {"alpha"}
    assert len(grouped["alpha"]) == 2


def test_load_incidents():
    incidents = load_incidents(FIXTURES / "incidents.json")
    assert len(incidents) == 1
    incident = incidents[0]
    assert isinstance(incident, Incident)
    assert incident.resolution_minutes == 30
