"""Ingestion helpers for incident management exports."""

from __future__ import annotations

import json
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Dict, Iterable, List, Optional

_DATETIME_FORMATS = [
    "%Y-%m-%dT%H:%M:%S",
    "%Y-%m-%d %H:%M:%S",
]


def _parse_datetime(raw: str) -> datetime:
    for fmt in _DATETIME_FORMATS:
        try:
            return datetime.strptime(raw, fmt)
        except ValueError:
            continue
    raise ValueError(f"Unsupported datetime format: {raw}")


@dataclass(frozen=True)
class Incident:
    """Normalized incident information used throughout the application."""

    incident_id: str
    team_id: str
    opened_at: datetime
    closed_at: Optional[datetime]
    severity: str
    summary: str

    @property
    def is_open(self) -> bool:
        return self.closed_at is None

    @property
    def resolution_minutes(self) -> Optional[int]:
        if not self.closed_at:
            return None
        return int((self.closed_at - self.opened_at).total_seconds() // 60)


def _normalize_record(record: Dict[str, str]) -> Incident:
    closed_at = record.get("closed_at") or None
    return Incident(
        incident_id=record["id"],
        team_id=record["team_id"],
        opened_at=_parse_datetime(record["opened_at"]),
        closed_at=_parse_datetime(closed_at) if closed_at else None,
        severity=record.get("severity", "unknown"),
        summary=record.get("summary", "").strip(),
    )


def load_incidents(path: Path | str) -> List[Incident]:
    """Load incidents from a JSON export file."""

    path = Path(path)
    if not path.exists():
        raise FileNotFoundError(path)

    with path.open("r", encoding="utf-8") as handle:
        payload = json.load(handle)

    if not isinstance(payload, list):
        raise ValueError("Incident export must be a list of objects")

    return [_normalize_record(item) for item in payload]


def filter_incidents(incidents: Iterable[Incident], *, team_id: Optional[str] = None) -> List[Incident]:
    """Filter incidents optionally by team."""

    return [incident for incident in incidents if team_id in (None, incident.team_id)]


__all__ = ["Incident", "load_incidents", "filter_incidents"]
