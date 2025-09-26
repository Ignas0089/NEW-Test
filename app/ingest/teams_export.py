"""Utilities for ingesting Microsoft Teams export CSV data."""

from __future__ import annotations

import csv
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Iterable, List, Sequence


@dataclass(frozen=True)
class TeamMember:
    """Representation of a team member record from the export."""

    team_id: str
    member_id: str
    name: str
    role: str
    timezone: str
    email: str

    @classmethod
    def from_row(cls, row: Dict[str, str]) -> "TeamMember":
        required = {
            "team_id",
            "member_id",
            "name",
            "role",
            "timezone",
            "email",
        }
        missing = required - row.keys()
        if missing:
            raise KeyError(f"Missing required columns in export: {sorted(missing)}")

        return cls(
            team_id=row["team_id"].strip(),
            member_id=row["member_id"].strip(),
            name=row["name"].strip(),
            role=row["role"].strip(),
            timezone=row["timezone"].strip(),
            email=row["email"].strip(),
        )


def load_team_members(path: Path | str) -> List[TeamMember]:
    """Load team member records from a CSV export."""

    path = Path(path)
    if not path.exists():
        raise FileNotFoundError(path)

    with path.open("r", encoding="utf-8") as csv_file:
        reader = csv.DictReader(csv_file)
        rows = [TeamMember.from_row(row) for row in reader]

    return rows


def index_by_team(members: Iterable[TeamMember]) -> Dict[str, List[TeamMember]]:
    """Group members by their team identifier."""

    grouped: Dict[str, List[TeamMember]] = {}
    for member in members:
        grouped.setdefault(member.team_id, []).append(member)
    return grouped


def unique_roles(members: Sequence[TeamMember]) -> Dict[str, int]:
    """Return a mapping of role name to the number of unique people in that role."""

    counts: Dict[str, int] = {}
    for member in members:
        counts[member.role] = counts.get(member.role, 0) + 1
    return counts


__all__ = ["TeamMember", "load_team_members", "index_by_team", "unique_roles"]
