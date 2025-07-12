@echo off
echo Setting up DreamWeaver AI...

REM Add Node.js to PATH for this session
set PATH=%CD%\node-v24.4.0-win-x64;%PATH%

echo Installing dependencies...
node node-v24.4.0-win-x64\node_modules\npm\bin\npm-cli.js install

echo Setup complete!
echo.
echo To run the development server:
echo npm run dev
echo.
echo Don't forget to:
echo 1. Copy .env.example to .env
echo 2. Add your API keys to .env
echo.
pause
