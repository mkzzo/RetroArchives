/* =========================================================
   RetroArchive — consoles.js
   Grade de consoles com filtro por geração, busca por nome
   e modal de detalhes com abas (Specs / História).
   Depende de: data/consoles-data.js
   ========================================================= */
(function () {
  "use strict";

  const grid = document.getElementById("consoles-grid");
  const searchInput = document.getElementById("console-search");
  const filterBar = document.getElementById("gen-filters");
  const resultCount = document.getElementById("console-count");
  if (!grid) return;

  const GEN_COLORS = {
    gen1: ["#2a2a2a", "#10141a"],
    gen2: ["#3a2c1f", "#10141a"],
    gen3: ["#234839", "#10141a"],
    gen4: ["#3b3416", "#10141a"],
    gen5: ["#2f2a4a", "#10141a"],
    gen6: ["#1f3a3a", "#10141a"],
    gen7: ["#33263f", "#10141a"],
    gen8: ["#3a2436", "#10141a"],
    gen9: ["#234046", "#10141a"]
  };

  // monta o quadrado visual de um console: se existir imagem real
  // registrada em data/console-images.js, usa ela; senão cai pro
  // placeholder de iniciais (mesmo .tile de sempre)
  function mediaTemplate(c, extraClass, idAttr) {
    const url = typeof CONSOLE_IMAGES !== "undefined" ? CONSOLE_IMAGES[c.id] : null;
    const colors = GEN_COLORS[c.gen] || ["#234839", "#10141a"];
    const idPart = idAttr ? ` id="${idAttr}"` : "";
    const inner = url
      ? `<img src="${url}" alt="${c.name}" loading="lazy">`
      : `<span class="tile__initials">${initials(c.name)}</span>`;
    return `<div class="tile ${extraClass}"${idPart} style="--tile-color-1:${colors[0]};--tile-color-2:${colors[1]}">${inner}</div>`;
  }

  function initials(name) {
    const words = name
      .replace(/[()&/]/g, " ")
      .split(" ")
      .filter(Boolean);
    return words
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  }

  let currentGen = "all";
  let currentSearch = "";

  function matches(console) {
    const genOk = currentGen === "all" || console.gen === currentGen;
    const search = currentSearch.trim().toLowerCase();
    const searchOk =
      !search ||
      console.name.toLowerCase().includes(search) ||
      console.chipset.toLowerCase().includes(search);
    return genOk && searchOk;
  }

  function cardTemplate(c) {
    // "famoso, mas não revolucionou" — selo que aparece tanto aqui
    // quanto na linha do tempo, sempre lendo o mesmo campo de dados
    const importantTag = c.importantPresence
      ? `<span class="badge badge--important" title="Marcante na sua época, mas não mudou os rumos da indústria">Presença Importante</span>`
      : "";
    return `
      <article class="card console-card" data-id="${c.id}" tabindex="0" role="button"
        aria-label="Ver detalhes de ${c.name}">
        <span class="console-card__pick" aria-hidden="true"></span>
        ${mediaTemplate(c, "")}
        <div>
          <div class="badge badge--accent">${c.year}</div>
          ${importantTag}
          <h3 style="font-family:var(--font-display);font-size:1.05rem;margin-top:6px;">${c.name}</h3>
          <p style="color:var(--color-text-muted);font-size:13px;margin-top:2px;">${c.genLabel}</p>
        </div>
        <p style="font-size:14px;color:var(--color-text);flex:1;">${c.desc}</p>
        <span class="badge">${c.chipset}</span>
      </article>`;
  }

  function render() {
    const filtered = CONSOLES.filter(matches).sort((a, b) => a.year - b.year);
    grid.innerHTML = filtered.length
      ? filtered.map(cardTemplate).join("")
      : `<div class="empty-state">Nenhum console encontrado para esse filtro.</div>`;
    if (resultCount) {
      resultCount.textContent = `${filtered.length} de ${CONSOLES.length} sistemas`;
    }
    // o grid é recriado do zero aqui (innerHTML), então se o modo comparar
    // estiver ativo com alguma seleção, precisa repintar os selos ①/②
    paintSelection();
  }

  // a aba "Modelo 3D" só baixa o embed pesado do Sketchfab quando o
  // usuário realmente clica em carregar — assim abrir o dossiê de um
  // console não puxa WebGL de graça se a pessoa nunca for olhar o 3D
  function fill3dSlot(c) {
    const slot = document.getElementById("modal-console-3d-slot");
    if (!slot) return;
    const model = typeof CONSOLE_MODELS !== "undefined" ? CONSOLE_MODELS[c.id] : null;

    if (!model) {
      slot.innerHTML = `<p style="color:var(--color-text-muted);">Nenhum modelo 3D cadastrado pra este console ainda.</p>`;
      return;
    }

    slot.innerHTML = `
      <button class="btn btn--ghost" id="load-3d-btn" type="button">Carregar modelo 3D</button>
      <p style="color:var(--color-text-muted);font-size:12px;margin-top:6px;">O modelo vem do Sketchfab — pode demorar um instante e consome dados.</p>`;

    document.getElementById("load-3d-btn").addEventListener("click", () => {
      slot.innerHTML = `
        <div class="model3d-frame">
          <iframe title="${model.modelTitle}" src="${model.embedSrc}" frameborder="0"
            allow="autoplay; fullscreen; xr-spatial-tracking" allowfullscreen loading="lazy"></iframe>
        </div>
        <p class="model3d-credit">
          <a href="${model.modelUrl}" target="_blank" rel="nofollow noopener">${model.modelTitle}</a>
          por <a href="${model.authorUrl}" target="_blank" rel="nofollow noopener">${model.author}</a>
          em <a href="https://sketchfab.com" target="_blank" rel="nofollow noopener">Sketchfab</a>
        </p>`;
    });
  }

  function openConsoleModal(id) {
    const c = CONSOLES.find((item) => item.id === id);
    if (!c) return;
    document.getElementById("modal-console-eyebrow").textContent = `${c.genLabel} · ${c.year}`;
    document.getElementById("modal-console-title").textContent = c.name;
    document.getElementById("modal-console-important").hidden = !c.importantPresence;
    document.getElementById("modal-console-image").outerHTML =
      mediaTemplate(c, "modal__media", "modal-console-image");
    document.getElementById("modal-console-chipset").textContent = c.chipset;
    document.getElementById("modal-console-cpu").textContent = c.cpu;
    document.getElementById("modal-console-ram").textContent = c.ram;
    document.getElementById("modal-console-media").textContent = c.media;
    document.getElementById("modal-console-audio").textContent = c.audio;
    document.getElementById("modal-console-desc").textContent = c.desc;
    document.getElementById("modal-console-history").textContent = c.history;
    document.getElementById("modal-console-legacy").textContent = c.legacy;
    fill3dSlot(c);

    const modal = document.getElementById("modal-console");
    modal.querySelectorAll("[data-tab]").forEach((b, i) => b.classList.toggle("is-active", i === 0));
    modal.querySelectorAll("[data-panel]").forEach((p, i) => p.classList.toggle("is-active", i === 0));

    window.RetroArchive.openModal("modal-console");
  }

  grid.addEventListener("click", (event) => {
    const card = event.target.closest(".console-card");
    if (!card) return;
    // com o modo comparar ligado, clicar no card seleciona pra comparação
    // em vez de abrir a ficha técnica individual
    if (compareMode) togglePick(card.dataset.id);
    else openConsoleModal(card.dataset.id);
  });

  grid.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest(".console-card");
    if (!card) return;
    event.preventDefault();
    if (compareMode) togglePick(card.dataset.id);
    else openConsoleModal(card.dataset.id);
  });

  if (filterBar) {
    filterBar.addEventListener("click", (event) => {
      const btn = event.target.closest(".filter-btn");
      if (!btn) return;
      filterBar.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      currentGen = btn.dataset.gen;
      render();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      currentSearch = event.target.value;
      render();
    });
  }

  /* =========================================================
     Modo comparação
     - compareMode: liga/desliga o comportamento de seleção
     - picks: array com os ids escolhidos, NA ORDEM do clique
       (picks[0] = escolhido primeiro = vai pro lado esquerdo;
        picks[1] = escolhido segundo = vai pro lado direito)
     ========================================================= */
  const compareToggle = document.getElementById("compare-toggle");
  const compareToggleLabel = document.getElementById("compare-toggle-label");
  const compareBar = document.getElementById("compare-bar");
  const compareBarText = document.getElementById("compare-bar-text");
  const compareReset = document.getElementById("compare-reset");
  const compareSwap = document.getElementById("compare-swap");
  const compareAgain = document.getElementById("compare-again");

  let compareMode = false;
  let picks = [];

  // cada item é [rótulo exibido, função que extrai o valor do objeto console]
  const COMPARE_FIELDS = [
    ["Ano", (c) => String(c.year)],
    ["Geração", (c) => c.genLabel],
    ["Chipset", (c) => c.chipset],
    ["CPU", (c) => c.cpu],
    ["Memória", (c) => c.ram],
    ["Mídia", (c) => c.media],
    ["Áudio", (c) => c.audio]
  ];

  // reflete o estado de `picks` na tela: liga a borda + o selo ①/② de
  // cada card que está selecionado, tira dos que não estão mais
  function paintSelection() {
    grid.querySelectorAll(".console-card").forEach((card) => {
      const index = picks.indexOf(card.dataset.id);
      card.classList.toggle("is-selected", index !== -1);
      const pickBadge = card.querySelector(".console-card__pick");
      if (pickBadge) pickBadge.textContent = index === -1 ? "" : String(index + 1);
    });
  }

  function updateCompareBar() {
    if (!compareBar) return;
    compareBar.hidden = !compareMode;
    if (!compareMode || !compareBarText) return;
    if (picks.length === 0) {
      compareBarText.textContent = "Modo comparar ativo — clique em até 2 consoles.";
    } else if (picks.length === 1) {
      const a = CONSOLES.find((c) => c.id === picks[0]);
      compareBarText.textContent = `${a.name} selecionado — escolha o segundo.`;
    }
  }

  // monta o miolo de uma "cabeça" do comparativo (tile + nome + ano)
  function compareHeadTemplate(c) {
    return `
      ${mediaTemplate(c, "")}
      <h4>${c.name}</h4>
      <span class="badge badge--accent">${c.year}</span>`;
  }

  function openCompareModal() {
    const [a, b] = picks.map((id) => CONSOLES.find((item) => item.id === id));
    if (!a || !b) return;

    document.getElementById("compare-head-a").innerHTML = compareHeadTemplate(a);
    document.getElementById("compare-head-b").innerHTML = compareHeadTemplate(b);

    const table = document.getElementById("compare-table");
    table.innerHTML = COMPARE_FIELDS.map(([label, getValue]) => {
      const valueA = getValue(a);
      const valueB = getValue(b);
      // se os dois valores forem diferentes, pinta de âmbar pra
      // chamar atenção pra onde os hardwares realmente divergem
      const diffClass = valueA !== valueB ? "is-diff" : "";
      return `
        <div class="compare-row-label">${label}</div>
        <div class="compare-cell ${diffClass}">${valueA}</div>
        <div class="compare-cell ${diffClass}">${valueB}</div>`;
    }).join("");

    window.RetroArchive.openModal("modal-compare");
  }

  // chamada ao clicar num card enquanto o modo comparar está ligado
  function togglePick(id) {
    const existingIndex = picks.indexOf(id);
    if (existingIndex !== -1) {
      picks.splice(existingIndex, 1); // clicou de novo no mesmo -> desmarca
    } else if (picks.length < 2) {
      picks.push(id); // ainda tinha vaga -> entra na fila
    } else {
      return; // já tem 2 escolhidos: precisa desmarcar um antes de trocar
    }
    paintSelection();
    updateCompareBar();
    if (picks.length === 2) openCompareModal();
  }

  if (compareToggle) {
    compareToggle.addEventListener("click", () => {
      compareMode = !compareMode;
      compareToggle.classList.toggle("is-active", compareMode);
      compareToggle.setAttribute("aria-pressed", String(compareMode));
      if (compareToggleLabel) {
        compareToggleLabel.textContent = compareMode ? "Sair do modo comparar" : "Comparar";
      }
      picks = [];
      paintSelection();
      updateCompareBar();
    });
  }

  if (compareReset) {
    compareReset.addEventListener("click", () => {
      picks = [];
      paintSelection();
      updateCompareBar();
    });
  }

  if (compareSwap) {
    // troca qual console fica à esquerda/direita sem precisar escolher de novo
    compareSwap.addEventListener("click", () => {
      picks.reverse();
      paintSelection();
      openCompareModal();
    });
  }

  if (compareAgain) {
    compareAgain.addEventListener("click", () => {
      picks = [];
      paintSelection();
      updateCompareBar();
      window.RetroArchive.closeAllModals();
    });
  }

  render();
})();
