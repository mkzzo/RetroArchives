/* =========================================================
   RetroArchive — game-players.js
   Registro central dos iframes jogáveis de cada jogo. Chave =
   id do jogo (mesmo id de jogos-data.js). jogos.js só monta o
   <iframe> quando o usuário clica em "Carregar jogo", para não
   carregar múltiplos emuladores pesados ao mesmo tempo na página.
   ========================================================= */
const GAME_PLAYERS = {
  // Pac-Man — link específico, com parâmetro de embed
  pacman: {
    src: "https://funhtml5games.com?embed=pacman",
    width: 342,
    height: 490,
    placeholder: false
  },

  // The Legend of Zelda: The Hyrule Fantasy (1986) — RetroGames.cc
  zelda: {
    src: "https://www.retrogames.cc/embed/46280-zelda-no-densetsu-the-hyrule-fantasy-japan-rev-1.html",
    width: 600,
    height: 450,
    placeholder: false,
    allow: "cross-origin-isolated"
  },

  // Street Fighter II — RetroGames.cc
  sf2: {
    src: "https://www.retrogames.cc/embed/9984-street-fighter-ii-the-world-warrior-910214-usa.html",
    width: 600,
    height: 450,
    placeholder: false,
    allow: "cross-origin-isolated"
  },

  // DOOM — link específico pro executável via js-dos
  doom: {
    src: "https://js-dos.com/games/doom.exe.html",
    width: 1024,
    height: 640,
    placeholder: false
  },

  // Pokémon Fire Red Extended — RetroGames.cc
  pokemon: {
    src: "https://www.retrogames.cc/embed/42834-pokemon-fire-red-extended-v2-0-4.html",
    width: 600,
    height: 450,
    placeholder: false,
    allow: "cross-origin-isolated"
  },

  // Castlevania: Symphony of the Night — link específico com slug do jogo
  castlevania: {
    src: "https://www.retrogames.cc/embed/44460-castlevania-symphony-of-the-night-quality-hack.html",
    width: 600,
    height: 450,
    placeholder: false,
    allow: "cross-origin-isolated"
  }
};
