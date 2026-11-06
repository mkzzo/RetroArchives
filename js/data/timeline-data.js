/* =========================================================
   RetroArchive — timeline-data.js
   A Linha do Tempo não guarda mais sua própria lista de
   marcos: ela é montada em cima de CONSOLES (consoles-data.js),
   ordenada por ano — exatamente a ordem do material de
   referência. Isso evita manter a mesma história duas vezes
   em dois arquivos diferentes.

   Este arquivo só guarda a lista de filtros por geração,
   reaproveitando os mesmos "gen"/"genLabel" já usados na
   página de Consoles & Hardware — mesmo sistema de categorias
   nas duas páginas.
   ========================================================= */
const TIMELINE_GENS = [
  { id: "all", label: "Todas as gerações" },
  { id: "gen1", label: "1ª Geração" },
  { id: "gen2", label: "2ª Geração" },
  { id: "gen3", label: "3ª Geração (8-bit)" },
  { id: "gen4", label: "4ª Geração (16-bit)" },
  { id: "gen5", label: "5ª Geração (32-bit)" },
  { id: "gen6", label: "6ª Geração" },
  { id: "gen7", label: "7ª Geração" },
  { id: "gen8", label: "8ª Geração" },
  { id: "gen9", label: "9ª Geração" }
];
