@echo off
echo ShoppeHV Installation Check
echo ========================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Python is not installed or not in PATH. Please install Python.
    echo You can download Python from: https://www.python.org/downloads/
    echo.
    echo After installing, run this script again.
    goto :exit
) else (
    echo [√] Python is installed.
)

REM Check if port 8000 is available
netstat -an | findstr ":8000" >nul
if %errorlevel% equ 0 (
    echo [!] Warning: Port 8000 seems to be in use. The application may not start properly.
    echo     Try closing any running servers or applications using port 8000.
) else (
    echo [√] Port 8000 is available.
)

REM Check if all required files exist
set "requiredFiles=index.html script-new.js style-new.css dark-login.css fruit-cart.css fruit-images.js green-theme.css"
set "missingFiles="

for %%F in (%requiredFiles%) do (
    if not exist "%%F" (
        set "missingFiles=!missingFiles! %%F"
    )
)

if not "%missingFiles%"=="" (
    echo [!] Warning: Some required files appear to be missing: %missingFiles%
) else (
    echo [√] All required files are present.
)

echo.
echo Installation check complete. You can start the application by running Start_ShoppeHV.bat

:exit
pause
