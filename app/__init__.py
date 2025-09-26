"""Application package initialization with logging configuration."""

from __future__ import annotations

import logging
import logging.config
import os
from pathlib import Path
from typing import Any, Dict

_DEFAULT_LOG_LEVEL = os.getenv("APP_LOG_LEVEL", "INFO")


def _default_logging_dict() -> Dict[str, Any]:
    base_dir = Path(__file__).resolve().parent.parent
    log_dir = base_dir / "logs"
    log_dir.mkdir(exist_ok=True)

    return {
        "version": 1,
        "formatters": {
            "standard": {
                "format": "%(asctime)s [%(levelname)s] %(name)s: %(message)s",
            }
        },
        "handlers": {
            "console": {
                "class": "logging.StreamHandler",
                "formatter": "standard",
                "level": _DEFAULT_LOG_LEVEL,
            },
            "file": {
                "class": "logging.FileHandler",
                "formatter": "standard",
                "level": _DEFAULT_LOG_LEVEL,
                "filename": str(log_dir / "app.log"),
            },
        },
        "root": {
            "handlers": ["console", "file"],
            "level": _DEFAULT_LOG_LEVEL,
        },
    }


logging.config.dictConfig(_default_logging_dict())

__all__ = ["logging"]
