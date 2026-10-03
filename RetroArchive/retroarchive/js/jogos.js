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

  function cardTemplate(g) {
    return `
      <article class="card game-card" data-id="${g.id}" tabindex="0" role="button"
        aria-label="Ver dossiê de ${g.title}">
        <div class="tile" style="--tile-color-1:#3a2c1f;--tile-color-2:#10141a">
          <span class="tile__initials">${g.title[0]}</span>
        </div>
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

  function openGameModal(id) {
    const g = GAMES.find((item) => item.id === id);
    if (!g) return;
    document.getElementById("modal-game-eyebrow").textContent = `${g.year} · ${g.platform}`;
    document.getElementById("modal-game-title").textContent = g.title;
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
