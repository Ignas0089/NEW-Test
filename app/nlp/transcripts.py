"""Transcript processing helpers for lightweight NLP analysis."""

from __future__ import annotations

import re
from collections import Counter
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Iterable, List, Tuple

_WORD_RE = re.compile(r"[A-Za-z']+")
_STOP_WORDS = {
    "the",
    "and",
    "to",
    "of",
    "a",
    "in",
    "is",
    "for",
    "on",
    "with",
    "as",
    "that",
    "this",
    "be",
    "are",
    "we",
}


@dataclass(frozen=True)
class TranscriptSummary:
    team_id: str
    word_count: int
    top_keywords: List[Tuple[str, int]]
    highlights: str


def load_transcripts(directory: Path | str) -> Dict[str, str]:
    """Load transcripts from ``.txt`` files located in ``directory``."""

    directory = Path(directory)
    if not directory.exists():
        raise FileNotFoundError(directory)

    transcripts: Dict[str, str] = {}
    for path in directory.glob("*.txt"):
        transcripts[path.stem] = path.read_text(encoding="utf-8").strip()
    return transcripts


def _tokenize(text: str) -> List[str]:
    return [match.group(0).lower() for match in _WORD_RE.finditer(text)]


def extract_keywords(text: str, *, limit: int = 5) -> List[Tuple[str, int]]:
    tokens = [token for token in _tokenize(text) if token not in _STOP_WORDS]
    counts = Counter(tokens)
    return counts.most_common(limit)


def build_summary(team_id: str, text: str) -> TranscriptSummary:
    tokens = _tokenize(text)
    keywords = extract_keywords(text)
    sentences = re.split(r"(?<=[.!?])\s+", text.strip())
    highlights = sentences[0] if sentences else ""
    return TranscriptSummary(
        team_id=team_id,
        word_count=len(tokens),
        top_keywords=keywords,
        highlights=highlights,
    )


def summarize_transcripts(transcripts: Dict[str, str]) -> Dict[str, TranscriptSummary]:
    return {team_id: build_summary(team_id, text) for team_id, text in transcripts.items()}


def aggregate_keyword_counts(summaries: Iterable[TranscriptSummary]) -> Counter:
    counter: Counter = Counter()
    for summary in summaries:
        counter.update(dict(summary.top_keywords))
    return counter


__all__ = [
    "TranscriptSummary",
    "load_transcripts",
    "extract_keywords",
    "build_summary",
    "summarize_transcripts",
    "aggregate_keyword_counts",
]
