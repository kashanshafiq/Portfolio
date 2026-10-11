$ErrorActionPreference = "Stop"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $ScriptDir
$env:PATH = "$ScriptDir\node-v24.21.0-win-x64;$env:PATH"
& "$ScriptDir\node-v24.21.0-win-x64\pnpm.cmd" dev
