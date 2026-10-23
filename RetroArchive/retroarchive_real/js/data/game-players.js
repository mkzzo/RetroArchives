/* =========================================================
   RetroArchive — game-players.js
   Registro central dos iframes jogáveis de cada jogo. Chave =
   id do jogo (mesmo id de jogos-data.js). jogos.js monta o
   <iframe> sob demanda quando o usuário clica em "Iniciar Emulador".
   ========================================================= */
const GAME_PLAYERS = {
  // Pac-Man (1980) — HTML5 Canvas
  pacman: {
    src: "https://funhtml5games.com?embed=pacman",
    width: 342,
    height: 490,
    placeholder: false
  },

  // The Legend of Zelda (1986) — NES / Famicom
  zelda: {
    src: "https://www.retrogames.cc/embed/46280-zelda-no-densetsu-the-hyrule-fantasy-japan-rev-1.html",
    width: 600,
    height: 450,
    placeholder: false
  },

  // Street Fighter II: The World Warrior (1991) — Arcade CPS-1
  sf2: {
    src: "https://www.retrogames.cc/embed/9984-street-fighter-ii-the-world-warrior-910214-usa.html",
    width: 600,
    height: 450,
    placeholder: false
  },

  // Sonic the Hedgehog (1991) — Sega Master System (8-bit)
  "sonic-sms": {
    src: "https://www.retrogames.cc/embed/30899-sonic-the-hedgehog-usa-europe.html",
    width: 600,
    height: 450,
    placeholder: false
  },

  // DOOM (1993) — PC MS-DOS via JS-DOS WebAssembly
  doom: {
    src: "https://js-dos.com/games/doom.exe.html",
    width: 1024,
    height: 640,
    placeholder: false
  },

  // Super Bomberman (1993) — Super Nintendo (SNES)
  bomberman: {
    src: "https://www.retrogames.cc/embed/24792-super-bomberman-europe.html",
    width: 600,
    height: 450,
    placeholder: false
  },

  // Pokémon (1996) — Game Boy
  pokemon: {
    src: "https://www.retrogames.cc/embed/42834-pokemon-fire-red-extended-v2-0-4.html",
    width: 600,
    height: 450,
    placeholder: false
  },

  // Castlevania: Symphony of the Night (1997) — PlayStation
  castlevania: {
    src: "https://www.retrogames.cc/embed/44460-castlevania-symphony-of-the-night-quality-hack.html",
    width: 600,
    height: 450,
    placeholder: false
  },

  // Super Smash Bros. (1999) — Nintendo 64
  smash64: {
    src: "https://www.retrogames.cc/embed/32117-super-smash-bros-usa.html",
    width: 600,
    height: 450,
    placeholder: false
  }
};
