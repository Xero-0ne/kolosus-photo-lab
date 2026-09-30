@echo off
setlocal
cd /d "%~dp0"
start "Kolosus Photo Lab Server" cmd /k "npm run dev -- --host 127.0.0.1"
timeout /t 3 /nobreak >nul
start "" "http://localhost:3000/"
endlocal
