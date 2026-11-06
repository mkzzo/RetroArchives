#!/bin/bash
echo "========================================================"
echo "  🕹️ RetroArchive - Servidor Local"
echo "========================================================"
echo ""
echo "Abrindo em http://localhost:8000..."
if command -v xdg-open > /dev/null; then
  xdg-open http://localhost:8000 &
elif command -v open > /dev/null; then
  open http://localhost:8000 &
fi
python3 -m http.server 8000
