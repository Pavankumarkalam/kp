@echo off
echo Starting ShoppeHV Application - Turquoise Theme...
echo.
echo Access the application at: http://localhost:8000
echo.
echo Press Ctrl+C to stop the server when done
cd "%~dp0"
python -m http.server 8000
pause
