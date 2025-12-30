@echo off
title RFID Smart Parking - Setup and Run
color 0A

echo ============================================================
echo    RFID SMART PARKING SYSTEM - SETUP AND RUN
echo ============================================================
echo.
echo This script will:
echo   1. Check and install Python dependencies
echo   2. Check and install Node.js dependencies
echo   3. Start all services
echo.
echo ============================================================
pause

cd /d "%~dp0"

:: Check Python
echo.
echo [1/5] Checking Python installation...
python --version
if errorlevel 1 (
    echo ERROR: Python is not installed!
    echo Please install Python 3.8+ from https://www.python.org/
    pause
    exit /b 1
)

:: Install Python dependencies
echo.
echo [2/5] Installing Python dependencies...
echo Installing backend dependencies...
cd backend
pip install -r requirements.txt --quiet
cd ..

echo Installing vision dependencies...
cd vision
pip install -r requirements.txt --quiet
cd ..

echo Installing aggregator dependencies...
cd aggregator
pip install -r requirements.txt --quiet
cd ..

:: Check Node.js
echo.
echo [3/5] Checking Node.js installation...
node --version
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js 16+ from https://nodejs.org/
    pause
    exit /b 1
)

:: Install Node.js dependencies
echo.
echo [4/5] Installing Node.js dependencies...
echo This may take a few minutes...

cd frontend\client
if not exist node_modules (
    echo Installing React frontend dependencies...
    call npm install
) else (
    echo Frontend dependencies already installed.
)
cd ..\..

cd frontend\server
if not exist node_modules (
    echo Installing server dependencies...
    call npm install
) else (
    echo Server dependencies already installed.
)
cd ..\..

:: Start all services
echo.
echo [5/5] Starting all services...
echo.
echo ============================================================
echo.

:: Start Backend
echo Starting Backend API (port 8000)...
start "Backend API" cmd /k "cd /d "%~dp0backend" && python simple_backend.py"
timeout /t 3 /nobreak >nul

:: Start Vision Service
echo Starting Vision Service (port 8001)...
cd vision
if exist vision_simulator.py (
    start "Vision Service" cmd /k "cd /d "%~dp0vision" && python vision_simulator.py"
) else if exist src\vision_service.py (
    start "Vision Service" cmd /k "cd /d "%~dp0vision" && python src\vision_service.py"
) else (
    echo Warning: Vision service not found, skipping...
)
cd ..
timeout /t 2 /nobreak >nul

:: Start Aggregator
echo Starting Aggregator Service (port 8002)...
cd aggregator
if exist aggregator_simulator.py (
    start "Aggregator Service" cmd /k "cd /d "%~dp0aggregator" && python aggregator_simulator.py"
) else if exist aggregator_service.py (
    start "Aggregator Service" cmd /k "cd /d "%~dp0aggregator" && python aggregator_service.py"
) else (
    echo Warning: Aggregator service not found, skipping...
)
cd ..
timeout /t 2 /nobreak >nul

:: Start Frontend
echo Starting React Frontend (port 3000)...
start "React Frontend" cmd /k "cd /d "%~dp0frontend\client" && npm start"
timeout /t 2 /nobreak >nul

echo.
echo ============================================================
echo.
echo ✅ ALL SERVICES STARTED!
echo.
echo ============================================================
echo.
echo Services are running on:
echo   • Backend API:       http://localhost:8000
echo   • API Docs:          http://localhost:8000/docs
echo   • Vision Service:    http://localhost:8001
echo   • Aggregator:        http://localhost:8002
echo   • Frontend:          http://localhost:3000
echo.
echo ============================================================
echo.
echo Waiting 20 seconds for services to initialize...
timeout /t 20 /nobreak

echo.
echo Opening browser...
start http://localhost:3000

echo.
echo ============================================================
echo.
echo 🚀 System is ready!
echo.
echo Default Login Credentials:
echo   Email:    admin@parking.com
echo   Password: admin123
echo.
echo ============================================================
echo.
echo Press any key to close this window (services will keep running)
pause >nul
