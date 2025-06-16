@echo off
set /a rand=%RANDOM% %% 2

echo Simulated job completed with exit code %rand%

exit /b %rand%