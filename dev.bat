@echo off
cd /d "%~dp0"
set "PATH=%~dp0node-v24.21.0-win-x64;%PATH%"
"%~dp0node-v24.21.0-win-x64\pnpm.cmd" dev
