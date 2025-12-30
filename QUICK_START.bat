@echo off
title RFID Smart Parking - Quick Start
color 0A

echo ============================================================
echo    RFID SMART PARKING SYSTEM - QUICK START
echo ============================================================
echo.
echo This will start the system with minimal setup:
echo   1. Backend API (simple version)
echo   2. Frontend (React dashboard)
echo.
echo Note: First time setup may take 5-10 minutes for npm install
echo ============================================================
echo.
pause

cd /d "%~dp0"

:: Install minimal Python dependencies
echo.
echo [1/3] Installing Python dependencies...
pip install fastapi uvicorn --quiet

:: Install Node.js dependencies if needed
echo.
echo [2/3] Setting up Frontend...
cd frontend\client
if not exist node_modules (
    echo Installing frontend dependencies (this may take 5-10 minutes)...
    call npm install
) else (
    echo Frontend dependencies already installed.
)
cd ..\..

:: Start services
echo.
echo [3/3] Starting services...
echo.

:: Start Backend
echo Starting Backend API...
start "Backend API" cmd /k "cd /d %~dp0backend && python simple_backend.py"
timeout /t 5 /nobreak >nul

:: Start Frontend
echo Starting React Frontend...
start "React Frontend" cmd /k "cd /d %~dp0frontend\client && npm start"

echo.
echo ============================================================
echo.
echo ✅ Services are starting!
echo.
echo ============================================================
echo.
echo Services will be available at:
echo   • Backend API:       http://localhost:8000
echo   • API Docs:          http://localhost:8000/docs
echo   • Frontend:          http://localhost:3000
echo.
echo ============================================================
echo.
echo Waiting 25 seconds for services to start...
echo (Frontend compilation may take longer on first run)
timeout /t 25 /nobreak

echo.
echo Opening browser...
start http://localhost:3000

echo.
echo ============================================================
echo.
echo 🚀 System should be ready!
echo.
echo If the page doesn't load, wait a bit longer for React to compile.
echo Check the terminal windows for any errors.
echo.
echo ============================================================
echo.
echo Press any key to close this window (services will keep running)
pause >nul
