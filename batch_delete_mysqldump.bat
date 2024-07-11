@echo off
rem Check if there are files to delete
dir /b /s /a-d "%BACKUP_DIR%\*" > nul 2>&1
if errorlevel 1 (
    echo No files to delete.
    exit /b
)
rem Delete files older than 3 days using PowerShell
for /f "delims=" %%B in ('dir /b /s /a-d "%BACKUP_DIR%\*" ^| findstr /r /i /c:"[^\.]*\.[^\.]*$"') do (
    for /f "usebackq delims=" %%C in (`powershell -Command "if((Get-Item '%%B').LastWriteTime -lt (Get-Date).AddDays(-3)){ Write-Output '%%B' }"`) do (
        del "%%C"
    )
)
echo Deletion completed successfully.
