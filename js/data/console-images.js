/* =========================================================
   RetroArchive — console-images.js
   Registro central de imagens de hardware. Um objeto só,
   chave = id do console (o mesmo "id" usado em
   data/consoles-data.js), valor = endereço da imagem.

   Por que um arquivo separado da consoles-data.js?
   Pra qualquer página do site (consoles, linha do tempo,
   comparador, o que vier depois) poder puxar a MESMA imagem
   de um console só carregando este script, sem duplicar o
   endereço em vários lugares. Se um link quebrar um dia, só
   precisa trocar aqui uma vez.

   Uso típico em outro script:
     const url = CONSOLE_IMAGES[console.id];
     if (url) { ...monta a <img src="${url}">... }

   IMPORTANTE: todas essas imagens são hotlinks pra CDNs de
   terceiros (lojas, portais de notícia, Wikimedia etc.) — não
   são hospedadas pelo site. Funcionam, mas cada uma depende do
   servidor de origem continuar no ar.
   ========================================================= */
const CONSOLE_IMAGES = {
  // Magnavox Odyssey — 1972
  "magnavox-odyssey":
    "https://s2-techtudo.glbimg.com/SNIojkHSEtyOg8ORCMt4xBnuDCQ=/1200x/smart/filters:cover():strip_icc()/s.glbimg.com/po/tt2/f/original/2014/11/06/museu-do-videogame-magnavox.jpg",

  // Atari 2600 (VCS) — 1977
  atari2600:
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgrqoagrOk_RrL0M-yYHJzqyGCpeDndu2d0KTOIMAnHb8c_9kUqSgrKR4plw_VdJw78lgKmWvLUdPw7MrQPooU4x3BSxK_a2IoeGH3fx0m2X5Hoq2KiaMT7czEjotQ4wtDQtbn2Wvc1zzaG/s1600/atari.jpg",

  // NES / Famicom — 1983
  nes:
    "https://p2.trrsf.com/image/fget/cf/1200/630/middle/images.terra.com/2022/11/03/ninendo-family-computer-famicom-sohbdg2ayiwg.jpg",

  // Sega Master System — 1985 (Presença Importante)
  mastersystem:
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0b/Sega-Master-System-Set.png/1280px-Sega-Master-System-Set.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=thumbnail",

  // Sega Mega Drive — 1988
  megadrive:
    "https://d2j6dbq0eux0bg.cloudfront.net/images/17412255/categories/54000891/1499169178.jpg",

  // Game Boy (DMG-01) — 1989
  gameboy:
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Game-Boy-FL.png?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original",

  // Super Nintendo (SNES) — 1990
  snes:
    "https://upload.wikimedia.org/wikipedia/commons/3/31/SNES-Mod1-Console-Set.jpg?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=original",

  // Sony PlayStation 1 (PSX) — 1994
  ps1:
    "https://http2.mlstatic.com/D_NQ_NP_888927-MLA99984697741_112025-O.webp",

  // PlayStation 2 — 2000
  ps2:
    "https://s2.glbimg.com/8i_ayXQ_bEaQFKy-XT-6v6CMJLvIXU1ehWRGlTocPLZIoz-HdGixxa_8qOZvMp3w/s.glbimg.com/jo/g1/f/original/2013/01/23/ps2-fat.jpg",

  // Xbox Original — 2001
  "xbox-og":
    "https://down-br.img.susercontent.com/file/br-11134207-820m3-mplrqhe5wrgh07",

  // GameCube — 2001 (Presença Importante)
  gamecube:
    "https://sm.ign.com/t/ign_br/screenshot/default/gamecube-console-set_knqu.1280.jpg",

  // Xbox 360 — 2005
  xbox360:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR67ekJih3lKgvZ59qo7TwGSjjx15DTmfICM-6k-TEG3w&s=10",

  // Wii — 2006
  wii:
    "https://upload.wikimedia.org/wikipedia/commons/f/f3/Wii-Console.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=original",

  // PlayStation 3 — 2006 (Presença Importante)
  ps3:
    "https://rollingstone.com.br/wp-content/uploads/legacy/2013/img-1014584-ps3.jpg",

  // Nintendo Switch — 2017
  switch:
    "https://img.odcdn.com.br/wp-content/uploads/2017/01/20170113072252.jpg",

  // PlayStation 5 — 2020
  ps5:
    "https://horizonplay.fbitsstatic.net/img/p/sony-playstation-5-slim-edicao-digital-825gb-ssd-4k-wi-fi-6-cfi-2115b-branco-233953/430750-2.jpg?w=670&h=670&v=202608250243",

  // Xbox Series X — 2020
  "xbox-series-x":
    "https://cms-assets.xboxservices.com/assets/bc/40/bc40fdf3-85a6-4c36-af92-dca2d36fc7e5.png?n=642227_Hero-Gallery-0_A1_857x676.png",

  // Steam Deck — 2022
  steamdeck:
    "https://preview.free3d.com/img/2021/12/3190213988239541982/i5ec0d2a.jpg"
};
