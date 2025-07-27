@echo off
echo Cleaning up duplicate and unnecessary files in ShoppeHV...
echo.

:: Duplicate JavaScript Files (keeping script-new.js which has all features)
echo Deleting duplicate JavaScript files...
del /q "script.js" 2>nul
del /q "script.js.new" 2>nul
del /q "fruit-images.js" 2>nul

:: Duplicate CSS Files (keeping style-new.css which is most comprehensive)
echo Deleting duplicate style files...
del /q "style.css" 2>nul
del /q "styles-v2.css" 2>nul
del /q "styles-v3.css" 2>nul
del /q "styles-v4.css" 2>nul
del /q "styles-v5.css" 2>nul

:: Unused Theme CSS Files
echo Deleting unused theme files...
del /q "blue-theme.css" 2>nul
del /q "green-theme.css" 2>nul

:: Deprecated Checkout CSS Files (keeping neon-pink-checkout.css as final version)
echo Deleting deprecated checkout styling files...
del /q "checkout-background.css" 2>nul
del /q "checkout-enhancement.css" 2>nul
del /q "checkout-improved-visibility.css" 2>nul
del /q "checkout-text-only.css" 2>nul
del /q "debug-images.css" 2>nul
del /q "maximum-visibility-checkout.css" 2>nul
del /q "payment-success.css" 2>nul

:: Unused CSS Files
del /q "professional-login-styles.css" 2>nul

:: Duplicate HTML Files (keeping index.html as main)
echo Deleting duplicate HTML files...
del /q "index-v2.html" 2>nul
del /q "professional-login-template.html" 2>nul

:: Test and temporary HTML files
echo Deleting test HTML files...
del /q "image-paths-test.html" 2>nul
del /q "test-image.html" 2>nul

:: Cleanup image directory
echo Cleaning up image directory...
del /q "images\fruit-background.txt" 2>nul
del /q "images\set-hand-drawn-fruits-berries-doodle_563464-27.avif" 2>nul

:: Delete documentation files that are not essential
del /q "files-to-delete.md" 2>nul
del /q "IMPLEMENTATION_GUIDE.md" 2>nul
del /q "images\fruit-background.txt" 2>nul
del /q "images\set-hand-drawn-fruits-berries-doodle_563464-27.avif" 2>nul

:: Delete this cleanup script itself (optional)
:: del /q "%~f0"

echo.
echo ============================================
echo CLEANUP SUMMARY
echo ============================================
echo.
echo ESSENTIAL FILES KEPT:
echo  - index.html (main application)
echo  - script-new.js (complete functionality)
echo  - style-new.css (comprehensive styling)
echo  - Core CSS files for functionality
echo  - README.md (documentation)
echo  - Start_ShoppeHV.bat (launcher)
echo  - Install_Check.bat (setup verification)
echo.
echo DELETED:
echo  - Duplicate script files (script.js, script.js.new)
echo  - Duplicate style files (style.css, styles-v*.css)
echo  - Deprecated checkout CSS files
echo  - Test HTML files
echo  - Unused theme files
echo.
echo The application should now run with only essential files!
echo You can run the application with Start_ShoppeHV.bat
echo.
pause
