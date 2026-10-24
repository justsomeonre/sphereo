@echo off
title SphereO Artisan Marketplace
cd /d "%~dp0"
echo ========================================================
echo   SPHEREO - AI-POWERED ARTISAN MARKETPLACE
echo   "AI that respects human hands."
echo ========================================================
echo.
echo Starting SphereO on http://localhost:3000 ...
echo.
start http://localhost:3000
npm run dev
pause
