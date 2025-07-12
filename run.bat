@echo off
echo Starting DreamWeaver AI...

REM Add Node.js to PATH for this session
set PATH=%CD%\node-v24.4.0-win-x64;%PATH%

echo Opening browser at http://localhost:3000
start http://localhost:3000

echo Starting development server...
node node-v24.4.0-win-x64\node_modules\npm\bin\npm-cli.js run dev
