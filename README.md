# Weekly Newsletter Generator

## Project Overview
This project automates the creation of weekly newsletters by combining Markdown source articles, layout templates, and rendering tooling into polished PDF exports. The provided PowerShell scripts orchestrate environment setup, data ingestion, newsletter generation, and scheduled execution so the entire process can run hands-free once configured.

## Prerequisites
- Windows 10 or later with PowerShell 7 installed.
- Python 3.10 or later (installed system-wide or via the provided virtual environment script).
- `pip` package manager for installing Python dependencies.
- [wkhtmltopdf](https://wkhtmltopdf.org/downloads.html) installed and added to the system `PATH`.
- Git (optional, for cloning and updating the repository).

## Initial Setup
1. Clone or download this repository to the machine that will run the newsletter job.
2. Open PowerShell and navigate to the repository root.
3. Run the setup script to create the Python virtual environment and install dependencies:
   ```powershell
   scripts/setup_venv.ps1
   ```
   The script creates a `.venv` folder inside the repository and installs required packages using `requirements.txt`. Reactivate the environment in future sessions with:
   ```powershell
   .\.venv\Scripts\Activate.ps1
   ```

## Data Placement
Organize input content under the `data/` directory to match the expected structure:
```
repo-root/
├─ data/
│  ├─ sample/
│  │  ├─ articles/
│  │  │  ├─ 2024-06-01.md
│  │  │  └─ 2024-06-08.md
│  │  └─ images/
│  │     └─ header.png
│  └─ templates/
│     ├─ newsletter.html
│     └─ styles.css
├─ output/
└─ scripts/
```
- Place Markdown or HTML articles in `data/articles/` (sample files are in `data/sample/articles/` for reference).
- Store reusable newsletter templates in `data/templates/`.
- Generated PDFs appear in the `output/` directory after running the newsletter script.
- If wkhtmltopdf cannot be added to the system `PATH`, copy `wkhtmltopdf.exe` into `bin/` at the repository root and update the configuration file (see customization section) to point to the executable.

## Generating the Weekly Newsletter
Use the helper script to build the latest newsletter:
```powershell
scripts/run_generate_last_week.ps1
```
The script activates the virtual environment, loads content from the previous week (relative to the execution date), and writes the finished PDF into the `output/` folder. Verify that all required data files exist before running the script to avoid missing-content warnings.

## Managing Scheduled Tasks
Automate weekly execution with Windows Task Scheduler:
1. Open Task Scheduler and create a new basic task.
2. Schedule it to run weekly at the desired time.
3. Set the action to start a program and provide:
   - **Program/script:** `powershell.exe`
   - **Add arguments:** `-ExecutionPolicy Bypass -File "<repo-path>\scripts\run_generate_last_week.ps1"`
   - **Start in:** `<repo-path>`
4. Ensure the task runs whether the user is logged on or not and has sufficient permissions to access the data and output directories.

## Customization Options
- **Template editing:** Modify files under `data/templates/` (e.g., `newsletter.html`, `styles.css`) to change layout or branding.
- **Configuration:** Adjust configuration values (such as wkhtmltopdf path or date filtering rules) in `config/settings.json` if provided by your setup.
- **Sample data:** Duplicate the contents of `data/sample/` to quickly scaffold new newsletter issues or test custom templates.
- **Output location:** Update script parameters or configuration files to redirect PDFs to a shared folder or cloud-synced directory.

## Troubleshooting
- **wkhtmltopdf not found:** Confirm it is installed and on the `PATH`, or set the explicit executable path in the configuration file as described above.
- **Virtual environment activation errors:** Ensure PowerShell execution policy allows script execution (`Set-ExecutionPolicy RemoteSigned`) and rerun `scripts/setup_venv.ps1`.
- **Missing images or articles:** Verify files exist in `data/articles/` or `data/sample/` and that relative paths inside templates are correct.
- **Scheduled task failures:** Check Task Scheduler history for error codes, confirm the configured user has permissions, and ensure the virtual environment path in the script remains valid.
- **PDF generation issues:** Inspect console output for wkhtmltopdf warnings, confirm CSS/HTML validity, and test rendering manually via `wkhtmltopdf` to isolate layout problems.

For additional details, explore the scripts inside the `scripts/` directory and adapt them to match your workflow.
