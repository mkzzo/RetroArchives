/* =========================================================
   RetroArchive — jogos.js
   Grade de dossiês de jogos com filtro por categoria, busca,
   ordenação e modal com abas (Ficha técnica / Jogabilidade /
   Curiosidades / Jogar agora). Depende de: data/jogos-data.js,
   data/game-players.js
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

  function mediaTemplate(g, extraClass, idAttr) {
    const url = typeof GAME_IMAGES !== "undefined" ? GAME_IMAGES[g.id] : null;
    const idPart = idAttr ? ` id="${idAttr}"` : "";
    const inner = url
      ? `<img src="${url}" alt="${g.title}" width="640" height="480" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="if(!this.dataset.triedRoot && this.getAttribute('src').startsWith('assets/')){this.dataset.triedRoot='1';this.src=this.getAttribute('src').slice(7);}else{this.replaceWith(Object.assign(document.createElement('span'),{className:'tile__initials',textContent:this.alt[0]}));}">`
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

  // Monta a aba "Jogar agora" sob demanda para evitar carregar emuladores pesados de uma só vez
  function fillPlaySlot(g) {
    const slot = document.getElementById("modal-game-play-slot");
    if (!slot) return;
    const player = typeof GAME_PLAYERS !== "undefined" ? GAME_PLAYERS[g.id] : null;

    if (!player) {
      slot.innerHTML = `<p style="color:var(--color-text-muted); text-align:center; padding: 20px;">Nenhum link jogável cadastrado para este jogo ainda.</p>`;
      return;
    }

    const warning = player.placeholder
      ? `<div class="fact-box fact-box--warning" style="margin-bottom:16px;"><p>⚠️ ${player.placeholderNote}</p></div>`
      : "";

    slot.innerHTML = `
      ${warning}
      <div style="text-align:center; padding: 28px 16px;">
        <p style="color:var(--color-text-muted); margin-bottom: 16px; font-size: 0.95rem;">
          Clique abaixo para inicializar o emulador web de <strong>${g.title}</strong>:
        </p>
        <button class="btn btn--primary" id="load-play-btn" type="button" style="padding: 10px 24px; font-size: 1rem; cursor: pointer;">
          ▶ Iniciar Emulador
        </button>
      </div>`;

    document.getElementById("load-play-btn").addEventListener("click", () => {
      slot.innerHTML = `
        ${warning}
        <div class="game-frame">
          <iframe 
            src="${player.src}" 
            width="${player.width}" 
            height="${player.height}"
            frameborder="0" 
            scrolling="no" 
            allowfullscreen="true" 
            webkitallowfullscreen="true" 
            mozallowfullscreen="true"
            allow="autoplay; fullscreen; gamepad; focus-without-user-activation" 
            loading="lazy"
            title="Jogar ${g.title}">
          </iframe>
        </div>
        <div style="margin-top: 14px; display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
          <a href="${player.src}" target="_blank" rel="noopener noreferrer" class="btn btn--ghost" style="font-size: 0.85rem; padding: 6px 14px; text-decoration: none;">
            ↗ Abrir em nova aba / tela cheia
          </a>
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

    // Reset para a primeira aba (Ficha técnica)
    const modal = document.getElementById("modal-game");
    modal.querySelectorAll("[data-tab]").forEach((b, i) => b.classList.toggle("is-active", i === 0));
    modal.querySelectorAll("[data-panel]").forEach((p, i) => p.classList.toggle("is-active", i === 0));

    window.RetroArchive.openModal("modal-game");
  }

  // Ao fechar o modal, limpa o iframe para parar o áudio do jogo
  const modalGame = document.getElementById("modal-game");
  if (modalGame) {
    const clearSlot = () => {
      const slot = document.getElementById("modal-game-play-slot");
      if (slot) slot.innerHTML = "";
    };
    modalGame.querySelectorAll("[data-modal-close]").forEach((b) => b.addEventListener("click", clearSlot));
    modalGame.addEventListener("click", (e) => {
      if (e.target === modalGame) clearSlot();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalGame.classList.contains("is-open")) clearSlot();
    });
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
