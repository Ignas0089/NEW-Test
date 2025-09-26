param(
    [string]$ConfigPath = "config/config.yaml",
    [string]$OutputHtml,
    [string]$OutputPdf
)

$arguments = @("--config", $ConfigPath)
if ($OutputHtml) { $arguments += @("--output-html", $OutputHtml) }
if ($OutputPdf) { $arguments += @("--output-pdf", $OutputPdf) }

python -m app.cli @arguments
