/* =========================================================
   RetroArchive — jogos.js
   Grade de dossiês de jogos com filtro por categoria, busca,
   ordenação e modal com abas (Ficha técnica / Jogabilidade /
   Curiosidades). Depende de: data/jogos-data.js
   ========================================================= */
(function () {
  "use strict";

  const grid = document.getElementById("games-grid");
  const searchInput = document.getElementById("game-search");
  const filterBar = document.getElementById("category-filters");
  const sortSelect = document.getElementById("game-sort");
  const hwGrid = document.getElementById("hardware-grid");
  if (!grid) return;

  let currentCategory = "all";
  let currentSearch = "";
  let currentSort = "year-asc";

  function matches(game) {
    const catOk = currentCategory === "all" || game.category === currentCategory;
    const search = currentSearch.trim().toLowerCase();
    const searchOk =
      !search ||
      game.title.toLowerCase().includes(search) ||
      game.dev.toLowerCase().includes(search);
    return catOk && searchOk;
  }

  function sortGames(list) {
    const sorted = [...list];
    switch (currentSort) {
      case "year-desc":
        return sorted.sort((a, b) => b.year - a.year);
      case "impact-desc":
        return sorted.sort((a, b) => b.impact - a.impact);
      default:
        return sorted.sort((a, b) => a.year - b.year);
    }
  }

  // imagem real quando existe (game-images.js), senão o placeholder de
  // sempre com a inicial do título — mesma lógica de consoles.js, só
  // reescrita aqui porque cada página carrega seu próprio script
  function mediaTemplate(g, extraClass, idAttr) {
    const url = typeof GAME_IMAGES !== "undefined" ? GAME_IMAGES[g.id] : null;
    const idPart = idAttr ? ` id="${idAttr}"` : "";
    const inner = url
      ? `<img src="${url}" alt="${g.title}" width="640" height="480" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'tile__initials',textContent:this.alt[0]}))">`
      : `<span class="tile__initials">${g.title[0]}</span>`;
    return `<div class="tile ${extraClass}"${idPart} style="--tile-color-1:#3a2c1f;--tile-color-2:#10141a">${inner}</div>`;
  }

  function cardTemplate(g) {
    return `
      <article class="card game-card" data-id="${g.id}" tabindex="0" role="button"
        aria-label="Ver dossiê de ${g.title}">
        ${mediaTemplate(g, "")}
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          <span class="badge badge--accent">${g.year}</span>
          <span class="badge">${g.categoryLabel}</span>
        </div>
        <h3 style="font-family:var(--font-display);font-size:1.05rem;">${g.title}</h3>
        <p style="font-size:13px;color:var(--color-text-muted);">${g.platform} · ${g.dev}</p>
        <p style="font-size:14px;flex:1;">${g.gameplay.slice(0, 110)}…</p>
      </article>`;
  }

  function render() {
    const filtered = sortGames(GAMES.filter(matches));
    grid.innerHTML = filtered.length
      ? filtered.map(cardTemplate).join("")
      : `<div class="empty-state">Nenhum jogo encontrado para essa busca.</div>`;
  }

  function fillList(id, items) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = items.map((i) => `<li>${i}</li>`).join("");
  }

  // a aba "Jogar agora" só monta o <iframe> quando o usuário clica em
  // carregar (evita puxar 6 jogos de uma vez) — e, pros 3 links que o
  // material de referência deixou apontando só pra home do site de
  // origem (não pra partida específica), mostra um aviso em vez de
  // fingir que o jogo vai abrir
  function fillPlaySlot(g) {
    const slot = document.getElementById("modal-game-play-slot");
    if (!slot) return;
    const player = typeof GAME_PLAYERS !== "undefined" ? GAME_PLAYERS[g.id] : null;

    if (!player) {
      slot.innerHTML = `<p style="color:var(--color-text-muted);">Nenhum link jogável cadastrado pra este jogo ainda.</p>`;
      return;
    }

    const warning = player.placeholder
      ? `<div class="fact-box fact-box--warning"><p>⚠️ ${player.placeholderNote}</p></div>`
      : "";

    slot.innerHTML = `
      ${warning}
      <button class="btn btn--ghost" id="load-play-btn" type="button">Carregar jogo</button>`;

    document.getElementById("load-play-btn").addEventListener("click", () => {
      slot.innerHTML = `
        ${warning}
        <div class="game-frame">
          <iframe src="${player.src}" width="${player.width}" height="${player.height}"
            frameborder="0" scrolling="no" allowfullscreen loading="lazy"
            title="Jogar ${g.title}"></iframe>
        </div>`;
    });
  }

  function openGameModal(id) {
    const g = GAMES.find((item) => item.id === id);
    if (!g) return;
    document.getElementById("modal-game-eyebrow").textContent = `${g.year} · ${g.platform}`;
    document.getElementById("modal-game-title").textContent = g.title;
    document.getElementById("modal-game-image").outerHTML = mediaTemplate(g, "modal__media", "modal-game-image");
    fillPlaySlot(g);
    document.getElementById("modal-game-dev").textContent = g.dev;
    document.getElementById("modal-game-rom").textContent = g.romDetail;
    document.getElementById("modal-game-format").textContent = g.format;
    document.getElementById("modal-game-region").textContent = g.region;
    document.getElementById("modal-game-res").textContent = g.res;
    document.getElementById("modal-game-audio").textContent = g.audio;
    document.getElementById("modal-game-gameplay").textContent = g.gameplay;
    fillList("modal-game-pillars", g.pillars);
    document.getElementById("modal-game-trivia").textContent = g.trivia;
    document.getElementById("modal-game-trivia-extra").textContent = g.triviaExtra;

    // reset to first tab
    const modal = document.getElementById("modal-game");
    modal.querySelectorAll("[data-tab]").forEach((b, i) => b.classList.toggle("is-active", i === 0));
    modal.querySelectorAll("[data-panel]").forEach((p, i) => p.classList.toggle("is-active", i === 0));

    window.RetroArchive.openModal("modal-game");
  }

  function hwCardTemplate(key, hw) {
    return `<button class="card" style="align-items:flex-start;text-align:left;" data-hw="${key}">
      <span class="badge">Coprocessador</span>
      <h3 style="font-family:var(--font-display);font-size:1rem;">${hw.title}</h3>
      <p style="font-size:13px;color:var(--color-text-muted);">${hw.desc.slice(0, 100)}…</p>
    </button>`;
  }

  function openHwModal(key) {
    const hw = HARDWARE_NOTES[key];
    if (!hw) return;
    document.getElementById("modal-hw-title").textContent = hw.title;
    document.getElementById("modal-hw-desc").textContent = hw.desc;
    window.RetroArchive.openModal("modal-hw");
  }

  if (hwGrid) {
    hwGrid.innerHTML = Object.entries(HARDWARE_NOTES)
      .map(([key, hw]) => hwCardTemplate(key, hw))
      .join("");
    hwGrid.addEventListener("click", (event) => {
      const btn = event.target.closest("[data-hw]");
      if (btn) openHwModal(btn.dataset.hw);
    });
  }

  grid.addEventListener("click", (event) => {
    const card = event.target.closest(".game-card");
    if (card) openGameModal(card.dataset.id);
  });

  grid.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest(".game-card");
    if (card) {
      event.preventDefault();
      openGameModal(card.dataset.id);
    }
  });

  if (filterBar) {
    filterBar.addEventListener("click", (event) => {
      const btn = event.target.closest(".filter-btn");
      if (!btn) return;
      filterBar.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      currentCategory = btn.dataset.category;
      render();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      currentSearch = event.target.value;
      render();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", (event) => {
      currentSort = event.target.value;
      render();
    });
  }

  render();
})();
