from pathlib import Path

from app import logging as _  # noqa: F401 - ensure logging configured
from app.cli import main


def test_cli_main(tmp_path, monkeypatch):
    config_path = Path("tests/fixtures/config.yaml")

    # Override outputs to temp directory to avoid polluting repository
    def fake_parse_args(_argv=None):
        class Args:
            config = config_path
            output_html = tmp_path / "newsletter.html"
            output_pdf = None

        return Args()

    monkeypatch.setattr("app.cli.parse_args", fake_parse_args)

    result = main([])
    assert result["html"].exists()
    assert result["pdf"] is None
    assert "Operations Newsletter" in result["html"].read_text(encoding="utf-8")
