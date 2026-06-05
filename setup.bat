@echo off
REM Digital Signature Project Setup Script

echo ========================================
echo Digital Signature - Setup Script
echo ========================================
echo.

echo Setting up Backend...
cd server
echo Installing backend dependencies...
call npm install

echo.
echo Creating .env file...
if not exist .env (
    copy .env.example .env
    echo .env file created. Please update it with your MongoDB URI and secrets.
) else (
    echo .env file already exists.
)

cd ..

echo.
echo Setting up Frontend...
cd client
echo Installing frontend dependencies...
call npm install

cd ..

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To start the application:
echo 1. Terminal 1: cd server && npm run dev
echo 2. Terminal 2: cd client && npm start
echo.
echo Backend will run on http://localhost:5000
echo Frontend will run on http://localhost:3000
echo.
pause
