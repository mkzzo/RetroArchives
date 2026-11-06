@echo off
chcp 65001 > nul
echo ========================================================
echo   🕹️ RetroArchive - Servidor Local
echo ========================================================
echo.
echo Abrindo o RetroArchive no seu navegador...
start http://localhost:8000
echo.
echo Servidor ativo em: http://localhost:8000
echo Para encerrar o servidor, feche esta janela ou pressione Ctrl + C.
echo ========================================================
python -m http.server 8000
pause
