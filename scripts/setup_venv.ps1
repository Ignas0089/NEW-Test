[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

$scriptDirectory = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoRoot = (Resolve-Path (Join-Path $scriptDirectory '..')).Path
$venvPath = Join-Path $repoRoot '.venv'
$activationScript = Join-Path (Join-Path $venvPath 'Scripts') 'Activate.ps1'
$requirementsPath = Join-Path $repoRoot 'requirements.txt'

$summary = [ordered]@{
    'Virtual environment' = 'Not started'
    'Activation' = 'Not started'
    'Dependency installation' = 'Not started'
}

try {
    if (-not (Test-Path $venvPath)) {
        Write-Host "Creating virtual environment at $venvPath..."
        & python -m venv $venvPath
        $summary['Virtual environment'] = 'Created'
    }
    else {
        Write-Host "Virtual environment already exists at $venvPath."
        $summary['Virtual environment'] = 'Already present'
    }
}
catch {
    $summary['Virtual environment'] = 'Failed'
    Write-Error "Failed to create the virtual environment: $($_.Exception.Message)"
    Write-Host "Setup aborted."
    exit 1
}

if (-not (Test-Path $activationScript)) {
    $summary['Activation'] = 'Failed'
    Write-Error "Activation script not found at $activationScript. The virtual environment may be corrupted."
    Write-Host "Delete the .venv directory and rerun this script."
    exit 1
}

try {
    Write-Host "Activating virtual environment..."
    . $activationScript
    $summary['Activation'] = 'Successful'
}
catch {
    $summary['Activation'] = 'Failed'
    Write-Error "Failed to activate the virtual environment: $($_.Exception.Message)"
    Write-Host "Ensure PowerShell script execution is allowed and rerun the setup."
    exit 1
}

if (-not (Test-Path $requirementsPath)) {
    $summary['Dependency installation'] = 'Failed'
    Write-Error "Could not find requirements file at $requirementsPath."
    Write-Host "Confirm the file exists and rerun the script."
    exit 1
}

try {
    Write-Host "Installing dependencies from $requirementsPath..."
    & python -m pip install --upgrade pip
    & python -m pip install -r $requirementsPath
    $summary['Dependency installation'] = 'Successful'
}
catch {
    $summary['Dependency installation'] = 'Failed'
    Write-Error "Dependency installation failed: $($_.Exception.Message)"
    Write-Host "Review the error above, resolve the issue, and rerun the script."
    exit 1
}

Write-Host ""
Write-Host "Setup summary:"
foreach ($entry in $summary.GetEnumerator()) {
    Write-Host ("- {0}: {1}" -f $entry.Key, $entry.Value)
}
Write-Host ""
Write-Host "Virtual environment ready. Activate it later with:`n  $activationScript"
Write-Host "Installation complete."
