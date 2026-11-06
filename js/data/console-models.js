/* =========================================================
   RetroArchive — console-models.js
   Registro central dos modelos 3D (Sketchfab) de cada
   console. Chave = mesmo "id" de consoles-data.js. Cada
   entrada guarda só o essencial pra montar o iframe e dar a
   atribuição correta — a licença Creative Commons do Sketchfab
   exige crédito ao autor, então o selo de atribuição é
   obrigatório e não deve ser removido.

   consoles.js só cria o <iframe> quando o usuário clica em
   "Carregar modelo 3D" (lazy load) — embed do Sketchfab é
   pesado, não faz sentido baixar os 18 de uma vez.
   ========================================================= */
const CONSOLE_MODELS = {
  "magnavox-odyssey": {
    embedSrc: "https://sketchfab.com/models/1442250a6bba4c70af4fc6b9807bcfdf/embed",
    modelTitle: "Magnavox Odyssey",
    modelUrl: "https://sketchfab.com/3d-models/magnavox-odyssey-1442250a6bba4c70af4fc6b9807bcfdf",
    author: "JesseJimison",
    authorUrl: "https://sketchfab.com/JesseJimison"
  },
  atari2600: {
    embedSrc: "https://sketchfab.com/models/2024d933f6214117a399ad4287ede64d/embed",
    modelTitle: "Atari 2600",
    modelUrl: "https://sketchfab.com/3d-models/atari-2600-2024d933f6214117a399ad4287ede64d",
    author: "dark_igorek",
    authorUrl: "https://sketchfab.com/dark_igorek"
  },
  nes: {
    embedSrc: "https://sketchfab.com/models/f00c88ca6216499ba05269c91f29bb04/embed",
    modelTitle: "Nintendo - Famicon",
    modelUrl: "https://sketchfab.com/3d-models/nintendo-famicon-f00c88ca6216499ba05269c91f29bb04",
    author: "Digital Heritage Australia",
    authorUrl: "https://sketchfab.com/digitalheritageaustralia"
  },
  mastersystem: {
    embedSrc: "https://sketchfab.com/models/0ec998c9b9de4e7f956cab56bbca3c0f/embed",
    modelTitle: "Sega Master System",
    modelUrl: "https://sketchfab.com/3d-models/sega-master-system-0ec998c9b9de4e7f956cab56bbca3c0f",
    author: "dark_igorek",
    authorUrl: "https://sketchfab.com/dark_igorek"
  },
  megadrive: {
    embedSrc: "https://sketchfab.com/models/92bffbb11cb8476ebdd67580faeac8e5/embed",
    modelTitle: "Sega Genesis (feira de ciências)",
    modelUrl: "https://sketchfab.com/3d-models/sega--genesis-feira-de-ciencias-92bffbb11cb8476ebdd67580faeac8e5",
    author: "MuriMonteiro",
    authorUrl: "https://sketchfab.com/MuriMonteiro"
  },
  gameboy: {
    embedSrc: "https://sketchfab.com/models/26144110dbbe469cb87ce3a055b5c0df/embed",
    modelTitle: "Nintendo Gameboy DMG-01 (3D Scan)",
    modelUrl: "https://sketchfab.com/3d-models/nintendo-gameboy-dmg-01-3d-scan-26144110dbbe469cb87ce3a055b5c0df",
    author: "stevencmutter",
    authorUrl: "https://sketchfab.com/stevencmutter"
  },
  snes: {
    embedSrc: "https://sketchfab.com/models/d544c482b7604e029779a16cd753f493/embed",
    modelTitle: "SNES (feira de ciências)",
    modelUrl: "https://sketchfab.com/3d-models/snes-feira-de-ciencias-d544c482b7604e029779a16cd753f493",
    author: "MuriMonteiro",
    authorUrl: "https://sketchfab.com/MuriMonteiro"
  },
  ps1: {
    embedSrc: "https://sketchfab.com/models/96bed8283f2940d7bb4b1866ab0637a2/embed",
    modelTitle: "Playstation 1",
    modelUrl: "https://sketchfab.com/3d-models/playstation-1-96bed8283f2940d7bb4b1866ab0637a2",
    author: "Ceki",
    authorUrl: "https://sketchfab.com/ecjhr0awipso"
  },
  ps2: {
    embedSrc: "https://sketchfab.com/models/13d115a80a034f96aafd5d6839c560a4/embed",
    modelTitle: "Sony PlayStation 2",
    modelUrl: "https://sketchfab.com/3d-models/sony-playstation-2-13d115a80a034f96aafd5d6839c560a4",
    author: "stevencmutter",
    authorUrl: "https://sketchfab.com/stevencmutter"
  },
  "xbox-og": {
    embedSrc: "https://sketchfab.com/models/6f46ef3adbe047158ec1b5504ef34b96/embed",
    modelTitle: "Original Xbox Console",
    modelUrl: "https://sketchfab.com/3d-models/original-xbox-console-6f46ef3adbe047158ec1b5504ef34b96",
    author: "C-eal",
    authorUrl: "https://sketchfab.com/C-eal"
  },
  gamecube: {
    embedSrc: "https://sketchfab.com/models/8376cc6bfe294b0ab245d065c3abff6f/embed",
    modelTitle: "Nintendo GameCube",
    modelUrl: "https://sketchfab.com/3d-models/nintendo-gamecube-8376cc6bfe294b0ab245d065c3abff6f",
    author: "Scott",
    authorUrl: "https://sketchfab.com/scotty"
  },
  xbox360: {
    embedSrc: "https://sketchfab.com/models/c7bfaf92d6f64ddd99e741562ecf32c3/embed",
    modelTitle: "XBOX 360 Original",
    modelUrl: "https://sketchfab.com/3d-models/xbox-360-original-c7bfaf92d6f64ddd99e741562ecf32c3",
    author: "Smoggybeard",
    authorUrl: "https://sketchfab.com/Smoggybeard"
  },
  wii: {
    embedSrc: "https://sketchfab.com/models/6474974a70674873811a0965bd1ac7c2/embed",
    modelTitle: "Nintendo Wii",
    modelUrl: "https://sketchfab.com/3d-models/nintendo-wii-6474974a70674873811a0965bd1ac7c2",
    author: "Freemodels",
    authorUrl: "https://sketchfab.com/vivaanarora9"
  },
  ps3: {
    embedSrc: "https://sketchfab.com/models/2341abe39eb74249b6e5869d0f740f84/embed",
    modelTitle: "PS3 Slim",
    modelUrl: "https://sketchfab.com/3d-models/ps3-slim-2341abe39eb74249b6e5869d0f740f84",
    author: "Vasily",
    authorUrl: "https://sketchfab.com/3D-Models-Geek"
  },
  switch: {
    embedSrc: "https://sketchfab.com/models/64d331c01f2b4733b78639b270e1935b/embed",
    modelTitle: "Nintendo Switch 2017-2023",
    modelUrl: "https://sketchfab.com/3d-models/nintendo-switch-2017-2023-64d331c01f2b4733b78639b270e1935b",
    author: "JackTheOhio",
    authorUrl: "https://sketchfab.com/ijackprovostjr"
  },
  ps5: {
    embedSrc: "https://sketchfab.com/models/54810f0b23a441ca93f44a8b06ec937b/embed",
    modelTitle: "PlayStation 5",
    modelUrl: "https://sketchfab.com/3d-models/playstation-5-54810f0b23a441ca93f44a8b06ec937b",
    author: "Virtual Studio",
    authorUrl: "https://sketchfab.com/virtualstudio"
  },
  "xbox-series-x": {
    embedSrc: "https://sketchfab.com/models/e983b0e9ef984aa6934176e310b7f0f2/embed",
    modelTitle: "Xbox Series X Console",
    modelUrl: "https://sketchfab.com/3d-models/xbox-series-x-console-e983b0e9ef984aa6934176e310b7f0f2",
    author: "jordanger88",
    authorUrl: "https://sketchfab.com/jordanger88"
  },
  steamdeck: {
    embedSrc: "https://sketchfab.com/models/46e0c05675a7442dbe73f261436e6819/embed",
    modelTitle: "Steam Deck Console",
    modelUrl: "https://sketchfab.com/3d-models/steam-deck-console-46e0c05675a7442dbe73f261436e6819",
    author: "wallmasterr",
    authorUrl: "https://sketchfab.com/wallmasterr"
  }
};
