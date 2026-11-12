/* =========================================================
   RetroArchive — comparacoes-data.js
   Pares "clássico → moderno" da seção Evolução Gráfica.
   O primeiro par (GTA) é o original da página e continua
   sendo o que aparece ao abrir. Os demais são as mesmas
   franquias dos dossiês de Jogos Marcantes (jogos-data.js),
   lado a lado com um título recente da série.

   Cada imagem guarda a largura/altura reais do arquivo: o
   palco usa essas medidas para não cortar nem esticar nada
   (as imagens são servidas exatamente como foram enviadas).
   ========================================================= */
const COMPARACOES = [
  {
    id: "gta",
    franquia: "Grand Theft Auto",
    antigo: { titulo: "GTA: San Andreas", ano: 2004, plataforma: "PlayStation 2", src: "assets/gta-sa.jpg", w: 794, h: 918 },
    novo: { titulo: "GTA V", ano: 2013, plataforma: "PlayStation 3 / Xbox 360", src: "assets/gta-v.jpg", w: 794, h: 918 },
    mesmaCena: true
  },
  {
    id: "pacman",
    franquia: "Pac-Man",
    antigo: { titulo: "Pac-Man", ano: 1980, plataforma: "Arcade", src: "assets/comparacoes/pacman-1980.jpg", w: 984, h: 701 },
    novo: { titulo: "Pac-Man World Re-PAC", ano: 2022, plataforma: "Consoles atuais e PC", src: "assets/comparacoes/pacman-world-repac-2022.jpg", w: 1460, h: 821 }
  },
  {
    id: "zelda",
    franquia: "The Legend of Zelda",
    antigo: { titulo: "The Legend of Zelda", ano: 1986, plataforma: "NES / Famicom", src: "assets/comparacoes/zelda-1986.jpg", w: 1024, h: 768 },
    novo: { titulo: "Zelda: Ocarina of Time", ano: 2023, plataforma: "Nintendo Switch", src: "assets/comparacoes/zelda-moderno.png", w: 1920, h: 1080 }
  },
  {
    id: "sf",
    franquia: "Street Fighter",
    antigo: { titulo: "Street Fighter II", ano: 1991, plataforma: "Arcade CPS-1", src: "assets/comparacoes/street-fighter-2-1991.jpg", w: 1147, h: 860 },
    novo: { titulo: "Street Fighter 6", ano: 2023, plataforma: "Consoles atuais e PC", src: "assets/comparacoes/street-fighter-6-2023.jpg", w: 1024, h: 576 }
  },
  {
    id: "sonic",
    franquia: "Sonic the Hedgehog",
    antigo: { titulo: "Sonic the Hedgehog (8-bit)", ano: 1991, plataforma: "Master System", src: "assets/comparacoes/sonic-sms-1991.jpg", w: 1047, h: 756 },
    novo: { titulo: "Sonic Frontiers", ano: 2022, plataforma: "Consoles atuais e PC", src: "assets/comparacoes/sonic-frontiers-2022.jpg", w: 1529, h: 860 }
  },
  {
    id: "doom",
    franquia: "DOOM",
    antigo: { titulo: "DOOM", ano: 1993, plataforma: "PC (MS-DOS)", src: "assets/comparacoes/doom-1993.jpg", w: 584, h: 441 },
    novo: { titulo: "DOOM: The Dark Ages", ano: 2025, plataforma: "PS5 / Xbox Series / PC", src: "assets/comparacoes/doom-the-dark-ages-2025.jpg", w: 1529, h: 860 }
  },
  {
    id: "bomberman",
    franquia: "Bomberman",
    antigo: { titulo: "Super Bomberman", ano: 1993, plataforma: "Super Nintendo", src: "assets/comparacoes/super-bomberman-1993.jpg", w: 882, h: 707 },
    novo: { titulo: "Super Bomberman R 2", ano: 2023, plataforma: "Consoles atuais e PC", src: "assets/comparacoes/super-bomberman-r2-2023.jpg", w: 1529, h: 860 }
  },
  {
    id: "pokemon",
    franquia: "Pokémon",
    antigo: { titulo: "Pokémon Red & Blue", ano: 1996, plataforma: "Game Boy", src: "assets/comparacoes/pokemon-red-blue-1996.jpg", w: 600, h: 418 },
    novo: { titulo: "Pokémon Legends: Z-A", ano: 2025, plataforma: "Nintendo Switch / Switch 2", src: "assets/comparacoes/pokemon-moderno.jpg", w: 1024, h: 517 }
  },
  {
    id: "castlevania",
    franquia: "Castlevania",
    antigo: { titulo: "Castlevania: Symphony of the Night", ano: 1997, plataforma: "PlayStation", src: "assets/comparacoes/castlevania-sotn-1997.jpg", w: 1200, h: 800 },
    novo: { titulo: "Castlevania: Belmont's Curse", ano: 2026, plataforma: "Consoles atuais e PC", src: "assets/comparacoes/castlevania-belmonts-curse-2026.jpg", w: 1024, h: 576 }
  },
  {
    id: "smash",
    franquia: "Super Smash Bros.",
    antigo: { titulo: "Super Smash Bros.", ano: 1999, plataforma: "Nintendo 64", src: "assets/comparacoes/smash-64-1999.jpg", w: 640, h: 480 },
    novo: { titulo: "Super Smash Bros. Ultimate", ano: 2018, plataforma: "Nintendo Switch", src: "assets/comparacoes/smash-ultimate-2018.jpg", w: 1529, h: 860 }
  }
];
