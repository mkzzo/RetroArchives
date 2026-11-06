/* =========================================================
   RetroArchive — main.js
   Comportamento compartilhado por todas as páginas:
   menu mobile, item de navegação ativo, modais genéricos.
   ========================================================= */
(function () {
  "use strict";

  /* ---- Menu mobile ---- */
  const menuToggle = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Marca o link de navegação ativo com base em body[data-page] ---- */
  const currentPage = document.body.dataset.page;
  if (currentPage) {
    document.querySelectorAll("[data-nav]").forEach((link) => {
      if (link.dataset.nav === currentPage) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  /* ---- Rodapé: ano atual ---- */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---- Modais genéricos ----
     Abrir:  <button data-modal-open="id-do-modal">
     Fechar: <button data-modal-close> ou clique fora do cartão do modal
  */
  function openModal(id) {
    const overlay = document.getElementById(id);
    if (!overlay) return;
    document.querySelectorAll(".modal-overlay.is-open").forEach((m) => m.classList.remove("is-open"));
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
    const firstTab = overlay.querySelector(".modal__tab");
    if (firstTab) firstTab.focus({ preventScroll: true });
  }

  function closeAllModals() {
    document.querySelectorAll(".modal-overlay.is-open").forEach((m) => m.classList.remove("is-open"));
    document.body.style.overflow = "";
  }

  document.addEventListener("click", (event) => {
    const opener = event.target.closest("[data-modal-open]");
    if (opener) {
      openModal(opener.dataset.modalOpen);
      return;
    }
    const closer = event.target.closest("[data-modal-close]");
    if (closer) {
      closeAllModals();
      return;
    }
    if (event.target.classList.contains("modal-overlay")) {
      closeAllModals();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeAllModals();
  });

  /* ---- Abas dentro de um modal (data-tab / data-panel) ---- */
  document.addEventListener("click", (event) => {
    const tabBtn = event.target.closest("[data-tab]");
    if (!tabBtn) return;
    const modal = tabBtn.closest(".modal");
    if (!modal) return;
    modal.querySelectorAll("[data-tab]").forEach((btn) => btn.classList.remove("is-active"));
    modal.querySelectorAll("[data-panel]").forEach((panel) => panel.classList.remove("is-active"));
    tabBtn.classList.add("is-active");
    const panel = modal.querySelector(`[data-panel="${tabBtn.dataset.tab}"]`);
    if (panel) panel.classList.add("is-active");
  });

    /* ---- Helpers compartilhados: paleta de gerações e iniciais ---- */
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

  function initials(name) {
    if (!name) return "";
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

  // Expor helpers simples para os scripts de cada página, se precisarem.
  window.RetroArchive = { openModal, closeAllModals, GEN_COLORS, initials };
})();
