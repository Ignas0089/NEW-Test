[CmdletBinding()]
param(
    [string]$ConfigPath = "config/config.yaml",
    [string]$VirtualEnvPath = ".\\.venv",
    [Nullable[datetime]]$ReferenceDate = $null
)

$ErrorActionPreference = "Stop"

function Get-LastWeekRange {
    param(
        [datetime]$Today
    )

    $todayDate = $Today.Date
    $dayOfWeek = [int]$todayDate.DayOfWeek
    $mondayIndex = [int][System.DayOfWeek]::Monday
    $daysSinceMonday = $dayOfWeek - $mondayIndex
    if ($daysSinceMonday -lt 0) {
        $daysSinceMonday += 7
    }

    $startOfCurrentWeek = $todayDate.AddDays(-$daysSinceMonday)
    $startOfLastWeek = $startOfCurrentWeek.AddDays(-7)
    $endOfLastWeek = $startOfCurrentWeek.AddDays(-1)

    return [pscustomobject]@{
        Start = $startOfLastWeek
        End   = $endOfLastWeek
    }
}

$today = if ($ReferenceDate) { [datetime]$ReferenceDate } else { Get-Date }
$range = Get-LastWeekRange -Today $today
$startStamp = $range.Start.ToString("yyyyMMdd")
$endStamp = $range.End.ToString("yyyyMMdd")

$env:NEWSLETTER_START_DATE = $range.Start.ToString("yyyy-MM-dd")
$env:NEWSLETTER_END_DATE = $range.End.ToString("yyyy-MM-dd")

$pythonExecutable = $null
if ($VirtualEnvPath -and $VirtualEnvPath.Trim()) {
    $activateScript = Join-Path $VirtualEnvPath "Scripts/Activate.ps1"
    if (-not (Test-Path $activateScript)) {
        throw "Virtual environment activation script not found: $activateScript"
    }

    Write-Verbose "Activating virtual environment at $VirtualEnvPath"
    . $activateScript

    $pythonCandidate = Join-Path $VirtualEnvPath "Scripts/python.exe"
    if (Test-Path $pythonCandidate) {
        $pythonExecutable = $pythonCandidate
    }
}

if (-not $pythonExecutable) {
    $pythonExecutable = "python"
}

$outputDirectory = "output"
if (-not (Test-Path $outputDirectory)) {
    New-Item -ItemType Directory -Path $outputDirectory | Out-Null
}

$outputBaseName = "newsletter_{0}_{1}" -f $startStamp, $endStamp
$outputHtml = Join-Path $outputDirectory "$outputBaseName.html"
$outputPdf = Join-Path $outputDirectory "$outputBaseName.pdf"

$arguments = @("-m", "app.cli", "--config", $ConfigPath, "--output-html", $outputHtml, "--output-pdf", $outputPdf)

Write-Host "Generating newsletter for $($env:NEWSLETTER_START_DATE) to $($env:NEWSLETTER_END_DATE)"
Write-Verbose "Using config: $ConfigPath"
Write-Verbose "Output HTML: $outputHtml"
Write-Verbose "Output PDF: $outputPdf"

& $pythonExecutable @arguments
$exitCode = $LASTEXITCODE
if ($exitCode -ne 0) {
    throw "Newsletter generation failed with exit code $exitCode"
}
