"""Configuration loading utilities with YAML fallback."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any, Dict

try:  # pragma: no cover - optional dependency
    import yaml  # type: ignore
except Exception:  # pragma: no cover
    yaml = None  # type: ignore


def load_config_file(path: Path | str) -> Dict[str, Any]:
    path = Path(path)
    if not path.exists():
        raise FileNotFoundError(path)

    text = path.read_text(encoding="utf-8")
    if path.suffix in {".yml", ".yaml"}:
        if yaml:
            return yaml.safe_load(text)
        # Minimal YAML subset parser for key/value pairs
        data: Dict[str, Any] = {}
        current_dicts = [data]
        current_indent = [0]
        for line in text.splitlines():
            if not line.strip() or line.strip().startswith("#"):
                continue
            indent = len(line) - len(line.lstrip(" "))
            key, _, value = line.strip().partition(":")
            value = value.strip() or {}
            while indent < current_indent[-1]:
                current_indent.pop()
                current_dicts.pop()
            if isinstance(value, dict):
                nested: Dict[str, Any] = {}
                current_dicts[-1][key] = nested
                current_dicts.append(nested)
                current_indent.append(indent + 2)
            else:
                if value in {"true", "false"}:
                    parsed: Any = value == "true"
                elif value.isdigit():
                    parsed = int(value)
                else:
                    parsed = value.strip('"')
                current_dicts[-1][key] = parsed
        return data

    return json.loads(text)


__all__ = ["load_config_file"]
