/* =========================================================
   RetroArchive — graficos.js
   Demonstração lado a lado de exibição vetorial (linhas
   desenhadas por feixe) vs. matriz raster (grade de pixels),
   com controles reais de efeito CRT (scanlines, curvatura
   e bloom) aplicados via CSS sobre o próprio canvas.
   ========================================================= */
(function () {
  "use strict";
  const vectorCanvas = document.getElementById("vector-canvas");
  const rasterCanvas = document.getElementById("raster-canvas");
  if (!vectorCanvas || !rasterCanvas) return;

  const vctx = vectorCanvas.getContext("2d");
  const rctx = rasterCanvas.getContext("2d", { willReadFrequently: false });
  rctx.imageSmoothingEnabled = false;

  const RASTER_SCALE = 12; // "pixels" grandes para simular baixa resolução
  const rw = rasterCanvas.width / RASTER_SCALE;
  const rh = rasterCanvas.height / RASTER_SCALE;
  const rasterBuffer = document.createElement("canvas");
  rasterBuffer.width = rw;
  rasterBuffer.height = rh;
  const bctx = rasterBuffer.getContext("2d");

  let angle = 0;

  function shapePoints(cx, cy, size) {
    // nave estilizada de 5 pontas
    const pts = [];
    for (let i = 0; i < 5; i++) {
      const a = angle + (i / 5) * Math.PI * 2;
      const r = i % 2 === 0 ? size : size * 0.45;
      pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
    }
    return pts;
  }

  function drawVector() {
    vctx.fillStyle = "#050807";
    vctx.fillRect(0, 0, vectorCanvas.width, vectorCanvas.height);
    const pts = shapePoints(vectorCanvas.width / 2, vectorCanvas.height / 2, 60);
    vctx.strokeStyle = "#ffe497";
    vctx.lineWidth = 2;
    vctx.beginPath();
    pts.forEach(([x, y], i) => (i === 0 ? vctx.moveTo(x, y) : vctx.lineTo(x, y)));
    vctx.closePath();
    vctx.stroke();
  }

  function drawRaster() {
    bctx.fillStyle = "#050807";
    bctx.fillRect(0, 0, rw, rh);
    const pts = shapePoints(rw / 2, rh / 2, rw * 0.32);
    bctx.fillStyle = "#f0c62a";
    bctx.beginPath();
    pts.forEach(([x, y], i) => (i === 0 ? bctx.moveTo(x, y) : bctx.lineTo(x, y)));
    bctx.closePath();
    bctx.fill();

    rctx.clearRect(0, 0, rasterCanvas.width, rasterCanvas.height);
    rctx.drawImage(rasterBuffer, 0, 0, rasterCanvas.width, rasterCanvas.height);
  }

  function loop() {
    angle += 0.02;
    drawVector();
    drawRaster();
    requestAnimationFrame(loop);
  }
  loop();

  /* ---- Controles CRT ---- */
  const scanlineSlider = document.getElementById("scanline-intensity");
  const bloomSlider = document.getElementById("bloom-intensity");
  const curvatureToggle = document.getElementById("curvature-toggle");
  const scopes = document.querySelectorAll(".crt-scope");

  function applyScanlines(value) {
    document.documentElement.style.setProperty("--scanline-opacity", value / 100);
  }
  function applyBloom(value) {
    document.documentElement.style.setProperty("--bloom-blur", `${value / 12}px`);
    document.documentElement.style.setProperty("--bloom-alpha", value / 140);
  }

  scanlineSlider?.addEventListener("input", (e) => applyScanlines(e.target.value));
  bloomSlider?.addEventListener("input", (e) => applyBloom(e.target.value));
  curvatureToggle?.addEventListener("click", () => {
    scopes.forEach((s) => s.classList.toggle("is-curved"));
    const active = scopes[0]?.classList.contains("is-curved");
    curvatureToggle.classList.toggle("is-active", active);
    curvatureToggle.textContent = active ? "Curvatura: Ligada" : "Curvatura: Desligada";
  });

  // valores iniciais
  if (scanlineSlider) applyScanlines(scanlineSlider.value);
  if (bloomSlider) applyBloom(bloomSlider.value);
})();
