"""Metrics aggregation for newsletter KPIs."""

from __future__ import annotations

from dataclasses import dataclass
from statistics import mean
from typing import Dict, Iterable, List, Optional

from app.ingest.incidents import Incident
from app.ingest.teams_export import TeamMember, index_by_team
from app.nlp.transcripts import TranscriptSummary


@dataclass(frozen=True)
class TeamKPI:
    team_id: str
    member_count: int
    incident_count: int
    average_resolution_minutes: Optional[float]
    open_incidents: int
    top_keywords: List[str]


def _average_resolution_minutes(incidents: Iterable[Incident]) -> Optional[float]:
    minutes = [incident.resolution_minutes for incident in incidents if incident.resolution_minutes]
    if not minutes:
        return None
    return round(mean(minutes), 2)


def compute_team_kpis(
    members: Iterable[TeamMember],
    incidents: Iterable[Incident],
    transcripts: Dict[str, TranscriptSummary],
) -> Dict[str, TeamKPI]:
    members_by_team = index_by_team(members)
    incidents_by_team: Dict[str, List[Incident]] = {}
    for incident in incidents:
        incidents_by_team.setdefault(incident.team_id, []).append(incident)

    kpis: Dict[str, TeamKPI] = {}
    teams = set(members_by_team) | set(incidents_by_team) | set(transcripts)
    for team_id in sorted(teams):
        team_members = members_by_team.get(team_id, [])
        team_incidents = incidents_by_team.get(team_id, [])
        summary = transcripts.get(team_id)
        kpis[team_id] = TeamKPI(
            team_id=team_id,
            member_count=len(team_members),
            incident_count=len(team_incidents),
            average_resolution_minutes=_average_resolution_minutes(team_incidents),
            open_incidents=sum(1 for incident in team_incidents if incident.is_open),
            top_keywords=[keyword for keyword, _ in (summary.top_keywords if summary else [])],
        )
    return kpis


def compute_org_rollup(kpis: Iterable[TeamKPI]) -> Dict[str, float]:
    kpi_list = list(kpis)
    total_members = sum(kpi.member_count for kpi in kpi_list)
    total_incidents = sum(kpi.incident_count for kpi in kpi_list)
    open_incidents = sum(kpi.open_incidents for kpi in kpi_list)
    avg_resolution_values = [kpi.average_resolution_minutes for kpi in kpi_list if kpi.average_resolution_minutes]
    org_avg_resolution = round(mean(avg_resolution_values), 2) if avg_resolution_values else 0.0
    return {
        "total_members": total_members,
        "total_incidents": total_incidents,
        "open_incidents": open_incidents,
        "average_resolution_minutes": org_avg_resolution,
    }


__all__ = ["TeamKPI", "compute_team_kpis", "compute_org_rollup"]
