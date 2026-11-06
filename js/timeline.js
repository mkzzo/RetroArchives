/* =========================================================
   RetroArchive — timeline.js
   Linha do tempo com trilho central alternado, filtro por
   geração e modal de dossiê. Os marcos não são mais escritos
   aqui: vêm direto de CONSOLES (data/consoles-data.js),
   ordenados por ano — a mesma fonte de dados usada na página
   de Consoles & Hardware, pra nunca desincronizar as duas.
   Depende de: data/consoles-data.js, data/console-images.js,
   data/timeline-data.js
   ========================================================= */
(function () {
  "use strict";

  const list = document.getElementById("timeline-list");
  const filterBar = document.getElementById("era-filters");
  if (!list || typeof CONSOLES === "undefined") return;

  let currentGen = "all";

  const { GEN_COLORS = {}, initials = ((n) => (n || "").slice(0, 2).toUpperCase()) } = window.RetroArchive || {};



  // o nó circular do marco: imagem real (console-images.js) quando
  // existe, senão cai pro placeholder de iniciais — mesma lógica de
  // consoles.js, só reescrita aqui porque cada página tem seu script
  // independente
  function tileTemplate(c) {
    const url = typeof CONSOLE_IMAGES !== "undefined" ? CONSOLE_IMAGES[c.id] : null;
    const colors = GEN_COLORS[c.gen] || ["#234839", "#10141a"];
    const inner = url
      ? `<img src="${url}" alt="${c.name}" loading="lazy">`
      : `<span class="tile__initials">${initials(c.name)}</span>`;
    return `<div class="tile tl-card__tile" style="--tile-color-1:${colors[0]};--tile-color-2:${colors[1]}">${inner}</div>`;
  }

  function cardTemplate(c, index) {
    const side = index % 2 === 0 ? "left" : "right";

    // a "mini aba" que o pedido original chamou de Presença
    // Importante: fica grudada na borda externa do card (do lado
    // oposto à espinha), só pros hardwares marcados como famosos
    // mas que não mudaram os rumos da indústria
    const importantTab = c.importantPresence
      ? `<span class="tl-card__tab" title="Marcante na sua época, mas não mudou os rumos da indústria">Presença&nbsp;Importante</span>`
      : "";

    const content = `
      <div class="tl-card">
        ${importantTab}
        <div class="tl-card__head">
          <span class="tl-card__years">${c.year}</span>
          <span class="badge">${c.genLabel}</span>
        </div>
        ${tileTemplate(c)}
        <h3 class="tl-card__title">${c.name}</h3>
        <p class="tl-card__subtitle">${c.chipset}</p>
        <p class="tl-card__desc">${c.desc}</p>
        <button class="btn btn--ghost" data-modal-open="modal-timeline" data-event="${c.id}">
          Ver dossiê completo
        </button>
      </div>`;

    return `
      <div class="tl-row tl-row--${side}">
        <div class="tl-row__side">${side === "left" ? content : ""}</div>
        <div class="tl-row__spine"><span class="tl-row__dot"></span></div>
        <div class="tl-row__side">${side === "right" ? content : ""}</div>
      </div>`;
  }

  function render() {
    const ordered = CONSOLES.slice().sort((a, b) => a.year - b.year);
    const filtered = ordered.filter((c) => currentGen === "all" || c.gen === currentGen);
    list.innerHTML = filtered.length
      ? filtered.map((c, i) => cardTemplate(c, i)).join("")
      : `<div class="empty-state">Nenhum hardware nesta geração.</div>`;
  }

  // o dossiê reaproveita os mesmos campos já escritos pra página de
  // Consoles & Hardware (history = contexto, legacy = legado) — texto
  // único, sem duplicar conteúdo em dois arquivos de dados
  function openDossier(id) {
    const c = CONSOLES.find((item) => item.id === id);
    if (!c) return;
    document.getElementById("modal-timeline-eyebrow").textContent = `${c.year} · ${c.chipset}`;
    document.getElementById("modal-timeline-title").textContent = c.name;
    document.getElementById("modal-timeline-lead").textContent = c.history;
    document.getElementById("modal-timeline-factlabel").textContent = "Legado";
    document.getElementById("modal-timeline-fact").textContent = c.legacy;
  }

  list.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-event]");
    if (btn) openDossier(btn.dataset.event);
  });

  if (filterBar) {
    TIMELINE_GENS.forEach((gen, i) => {
      const btn = document.createElement("button");
      btn.className = "filter-btn" + (i === 0 ? " is-active" : "");
      btn.dataset.gen = gen.id;
      btn.textContent = gen.label;
      filterBar.appendChild(btn);
    });

    filterBar.addEventListener("click", (event) => {
      const btn = event.target.closest(".filter-btn");
      if (!btn) return;
      filterBar.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      currentGen = btn.dataset.gen;
      render();
    });
  }

  render();
})();
