/* =========================================================
   RetroArchive — blur-reveal.js
   Comparação "San Andreas → GTA V" com desfoque progressivo.

   Progresso p (0 → 1) vem da posição horizontal do mouse
   (hover) ou do dedo (arrasto) sobre a imagem:
     p = 0.0   imagem A (antiga) nítida
     p = 0.5   as duas desfocadas no máximo (cross-fade no meio)
     p = 1.0   imagem B (nova) nítida
   Também funciona pelo teclado (setas, Home, End).
   ========================================================= */
(function () {
  "use strict";

  const root = document.getElementById("blur-reveal");
  if (!root) return;

  const MAX_BLUR = 22;                 // px de desfoque no ponto médio
  const FADE_START = 0.42;             // janela do cross-fade entre as imagens
  const FADE_END = 0.58;
  const SMOOTHING = 0.18;              // 0–1: quanto maior, mais "colado" ao ponteiro
  const KEY_STEP = 0.05;

  const fill = document.getElementById("blur-reveal-fill");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const style = root.style;

  let target = 0;
  let current = 0;
  let rafId = 0;
  let dragging = false;

  const clamp01 = (v) => Math.min(1, Math.max(0, v));
  const smoothstep = (a, b, x) => {
    const t = clamp01((x - a) / (b - a));
    return t * t * (3 - 2 * t);
  };

  function render(p) {
    const blurA = MAX_BLUR * clamp01(p / 0.5);
    const blurB = MAX_BLUR * clamp01((1 - p) / 0.5);
    const mix = smoothstep(FADE_START, FADE_END, p);

    style.setProperty("--reveal-blur-a", blurA.toFixed(2) + "px");
    style.setProperty("--reveal-blur-b", blurB.toFixed(2) + "px");
    // leve zoom proporcional ao blur, para a borda desfocada nunca aparecer
    style.setProperty("--reveal-scale-a", (1 + blurA * 0.004).toFixed(4));
    style.setProperty("--reveal-scale-b", (1 + blurB * 0.004).toFixed(4));
    style.setProperty("--reveal-opacity-a", (1 - mix).toFixed(3));
    style.setProperty("--reveal-opacity-b", mix.toFixed(3));
    style.setProperty("--reveal-progress", p.toFixed(4));

    const pct = Math.round(p * 100);
    root.setAttribute("aria-valuenow", String(pct));
    root.setAttribute(
      "aria-valuetext",
      p < 0.4 ? "GTA San Andreas" + (p < 0.05 ? ", nítido" : ", desfocando")
        : p > 0.6 ? "GTA V" + (p > 0.95 ? ", nítido" : ", ganhando nitidez")
        : "Transição entre as duas imagens"
    );
  }

  function tick() {
    const diff = target - current;
    if (reduceMotion.matches || Math.abs(diff) < 0.0005) {
      current = target;
      render(current);
      rafId = 0;
      return;
    }
    current += diff * SMOOTHING;
    render(current);
    rafId = requestAnimationFrame(tick);
  }

  function setTarget(p) {
    target = clamp01(p);
    root.classList.add("is-touched");
    if (!rafId) rafId = requestAnimationFrame(tick);
  }

  function progressFromEvent(e) {
    const rect = root.querySelector(".blur-reveal__stage").getBoundingClientRect();
    return (e.clientX - rect.left) / rect.width;
  }

  /* ---- Mouse: basta passar por cima (sem clicar) ---- */
  root.addEventListener("pointermove", (e) => {
    if (e.pointerType === "mouse") setTarget(progressFromEvent(e));
    else if (dragging) setTarget(progressFromEvent(e));
  });

  /* ---- Dedo / caneta: arrastar ---- */
  root.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse") return;
    dragging = true;
    root.setPointerCapture(e.pointerId);
    setTarget(progressFromEvent(e));
  });
  const endDrag = () => { dragging = false; };
  root.addEventListener("pointerup", endDrag);
  root.addEventListener("pointercancel", endDrag);

  /* ---- Teclado ---- */
  root.addEventListener("keydown", (e) => {
    let next = null;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") next = target + KEY_STEP;
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = target - KEY_STEP;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = 1;
    if (next === null) return;
    e.preventDefault();
    setTarget(next);
  });

  render(0);
})();
