/* =========================================================
   RetroArchive — comparacoes.js
   Seletor de franquias da seção Evolução Gráfica. Reaproveita
   o MESMO componente de desfoque progressivo (blur-reveal.js):
   ao escolher outra franquia, só troca as duas imagens, os
   rótulos e a proporção do palco, e volta o efeito ao início.

   - GTA continua sendo o par inicial, com o palco original.
   - As outras imagens só são baixadas quando o par é
     escolhido (ou quando o ponteiro/foco passa no botão).
   - Imagens com proporção diferente do palco (telas 4:3 dos
     clássicos) aparecem inteiras, sem corte e sem esticar.
   Depende de: data/comparacoes-data.js, blur-reveal.js
   ========================================================= */
(function () {
  "use strict";

  const root = document.getElementById("blur-reveal");
  const picker = document.getElementById("reveal-picker");
  const caption = document.getElementById("reveal-caption");
  if (!root || !picker || typeof COMPARACOES === "undefined") return;

  const stage = root.querySelector(".blur-reveal__stage");
  const imgA = root.querySelector(".blur-reveal__img--a");
  const imgB = root.querySelector(".blur-reveal__img--b");
  const tagA = root.querySelector(".blur-reveal__tag--a");
  const tagB = root.querySelector(".blur-reveal__tag--b");

  const byId = Object.fromEntries(COMPARACOES.map((p) => [p.id, p]));
  const cache = {};
  let active = COMPARACOES[0];
  let token = 0;

  /* ---------- carregamento sob demanda ---------- */
  function load(src) {
    if (!cache[src]) {
      cache[src] = new Promise((resolve) => {
        const im = new Image();
        im.decoding = "async";
        im.onload = im.onerror = () => resolve();
        im.src = src;
      });
    }
    return cache[src];
  }

  function prefetch(pair) {
    if (!pair) return;
    load(pair.antigo.src);
    load(pair.novo.src);
  }

  /* ---------- botões ---------- */
  picker.innerHTML = COMPARACOES.map((p) => `
    <button class="reveal-chip" type="button" data-pair="${p.id}" aria-pressed="${p === active}">
      <span class="reveal-chip__name">${p.franquia}</span>
      <span class="reveal-chip__years">${p.antigo.ano} → ${p.novo.ano}</span>
    </button>`).join("");

  function captionHtml(p) {
    const gap = p.novo.ano - p.antigo.ano;
    return `<strong>${p.franquia}</strong> · ${p.antigo.titulo} <span>(${p.antigo.plataforma}, ${p.antigo.ano})</span>
      → ${p.novo.titulo} <span>(${p.novo.plataforma}, ${p.novo.ano})</span>
      · ${gap} anos de distância${p.mesmaCena ? " · mesma cena nas duas versões" : ""}`;
  }

  /* ---------- aplica um par ao componente ---------- */
  function fitClass(img, info, stageRatio) {
    const ratio = info.w / info.h;
    // proporção diferente do palco: mostra a imagem inteira (sem corte)
    img.classList.toggle("is-fit", Math.abs(ratio - stageRatio) / stageRatio > 0.04);
  }

  function apply(p) {
    active = p;
    const original = !!p.mesmaCena;
    root.classList.toggle("blur-reveal--wide", !original);
    if (original) {
      stage.style.removeProperty("--stage-ratio");
      imgA.classList.remove("is-fit");
      imgB.classList.remove("is-fit");
    } else {
      const stageRatio = p.novo.w / p.novo.h;
      stage.style.setProperty("--stage-ratio", `${p.novo.w} / ${p.novo.h}`);
      fitClass(imgA, p.antigo, stageRatio);
      fitClass(imgB, p.novo, stageRatio);
    }

    imgA.src = p.antigo.src;
    imgA.alt = `Cena de ${p.antigo.titulo} (${p.antigo.ano})`;
    imgB.src = p.novo.src;
    imgB.alt = original ? `Mesma cena em ${p.novo.titulo} (${p.novo.ano})` : `Cena de ${p.novo.titulo} (${p.novo.ano})`;
    tagA.textContent = `${p.antigo.titulo} · ${p.antigo.ano}`;
    tagB.textContent = `${p.novo.titulo} · ${p.novo.ano}`;

    root.dataset.nameA = p.antigo.titulo;
    root.dataset.nameB = p.novo.titulo;
    root.setAttribute("aria-label", `Comparação gráfica entre ${p.antigo.titulo} e ${p.novo.titulo}`);
    if (caption) caption.innerHTML = captionHtml(p);

    if (window.RetroArchiveBlurReveal) window.RetroArchiveBlurReveal.reset();
  }

  function select(id) {
    const p = byId[id];
    if (!p || p === active) return;
    const mine = ++token;
    picker.querySelectorAll(".reveal-chip").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.pair === id)));
    stage.classList.add("is-switching");
    Promise.all([load(p.antigo.src), load(p.novo.src)]).then(() => {
      if (mine !== token) return; // o usuário já escolheu outro par
      apply(p);
      requestAnimationFrame(() => requestAnimationFrame(() => stage.classList.remove("is-switching")));
    });
  }

  picker.addEventListener("click", (e) => {
    const btn = e.target.closest(".reveal-chip");
    if (btn) select(btn.dataset.pair);
  });

  const warm = (e) => {
    const btn = e.target.closest && e.target.closest(".reveal-chip");
    if (btn) prefetch(byId[btn.dataset.pair]);
  };
  picker.addEventListener("pointerover", warm);
  picker.addEventListener("focusin", warm);

  if (caption) caption.innerHTML = captionHtml(active);
})();
