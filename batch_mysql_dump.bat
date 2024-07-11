@echo off

rem Get the current date and time in the format YYYYMMDD_HHMMSS using PowerShell
for /f %%A in ('powershell -NoProfile -Command "Get-Date -Format \"yyyyMMdd_HHmmss\""') do set TIMESTAMP=%%A

rem Create backup directory if it doesn't exist
if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

rem Dump the database to a SQL file
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqldump" --routines=true -u %MYSQL_USER% -p%MYSQL_PASSWORD% %DATABASE_NAME% > "%BACKUP_DIR%\backup_%TIMESTAMP%.sql"

rem Compress the backup file using 7-Zip
"C:\Program Files\7-Zip\7z.exe" a -tzip "%BACKUP_DIR%\backup_%TIMESTAMP%.zip" "%BACKUP_DIR%\backup_%TIMESTAMP%.sql"

echo Backup completed successfully.
