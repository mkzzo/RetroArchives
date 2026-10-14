/* =========================================================
   RetroArchive — game-players.js
   Registro central dos iframes jogáveis de cada jogo. Chave =
   id do jogo (mesmo id de jogos-data.js). jogos.js só monta o
   <iframe> quando o usuário clica em "Jogar agora", pra não
   carregar 6 jogos pesados de uma vez na página.

   AVISO IMPORTANTE: 3 dos 6 links do material de referência
   apontam pra HOMEPAGE genérica do site (retrogames.cc ou
   archive.org), sem o caminho específico do jogo — ou seja,
   vão abrir o site, não a partida em si. Marquei esses com
   "placeholder: true" e um aviso que aparece pro usuário antes
   de carregar o iframe, em vez de fingir que funciona.
   ========================================================= */
const GAME_PLAYERS = {
  // Pac-Man — link específico, com parâmetro de embed
  pacman: {
    src: "https://funhtml5games.com?embed=pacman",
    width: 342,
    height: 490,
    placeholder: false
  },

  // The Legend of Zelda — o material só trouxe a home do retrogames.cc,
  // sem o slug do jogo específico
  zelda: {
    src: "https://retrogames.cc",
    width: 600,
    height: 450,
    placeholder: true,
    placeholderNote:
      "Este link ainda aponta só pra home do RetroGames.cc, não pra partida específica de Zelda — troque pelo endereço /embed/... do jogo quando tiver em mãos."
  },

  // Street Fighter II — o material só trouxe a home do archive.org
  sf2: {
    src: "https://archive.org",
    width: 640,
    height: 480,
    placeholder: true,
    placeholderNote:
      "Este link ainda aponta só pra home do Archive.org, não pro emulador do jogo em si — troque pelo endereço /embed/... da partida quando tiver em mãos."
  },

  // DOOM — link específico pro executável via js-dos
  doom: {
    src: "https://js-dos.com/games/doom.exe.html",
    width: 1024,
    height: 640,
    placeholder: false
  },

  // Pokémon Red & Blue — mesmo problema do Zelda: home genérica
  pokemon: {
    src: "https://retrogames.cc",
    width: 600,
    height: 450,
    placeholder: true,
    placeholderNote:
      "Este link ainda aponta só pra home do RetroGames.cc, não pra partida específica de Pokémon — troque pelo endereço /embed/... do jogo quando tiver em mãos."
  },

  // Castlevania: Symphony of the Night — link específico com slug do jogo
  castlevania: {
    src: "https://www.retrogames.cc/embed/44460-castlevania-symphony-of-the-night-quality-hack.html",
    width: 600,
    height: 450,
    placeholder: false
  }
};
