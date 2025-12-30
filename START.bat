@echo off
title RFID Smart Parking - Quick Start
color 0A

echo ============================================================
echo    RFID SMART PARKING SYSTEM - QUICK START
echo ============================================================
echo.
echo This will start the system:
echo   1. Backend API
echo   2. Frontend Dashboard
echo.
echo ============================================================
pause

cd /d "%~dp0"

echo.
echo [1/3] Installing Python dependencies...
pip install fastapi uvicorn --quiet

echo.
echo [2/3] Installing Frontend dependencies...
echo This may take several minutes on first run...
cd frontend\client
call npm install
cd ..\..

echo.
echo [3/3] Starting services...
echo.

echo Starting Backend API...
start "Backend API" cmd /k "cd backend && python simple_backend.py"
timeout /t 5 /nobreak >nul

echo Starting React Frontend...
start "React Frontend" cmd /k "cd frontend\client && npm start"

echo.
echo ============================================================
echo.
echo Services are starting!
echo.
echo   Backend API:  http://localhost:8000
echo   Frontend:     http://localhost:3000
echo.
echo ============================================================
echo.
echo Waiting 30 seconds for services to initialize...
timeout /t 30 /nobreak

echo.
echo Opening browser...
start http://localhost:3000

echo.
echo ============================================================
echo.
echo System is ready!
echo.
echo Press any key to close (services will keep running)
pause >nul
