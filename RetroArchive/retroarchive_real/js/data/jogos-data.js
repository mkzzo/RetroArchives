/* =========================================================
   RetroArchive — jogos-data.js
   Dossiês dos jogos marcantes e das arquiteturas de hardware
   associadas. Usado por jogos.js.
   ========================================================= */
const GAMES = [
  {
    id: "pacman",
    title: "Pac-Man",
    year: 1980,
    category: "arcade",
    categoryLabel: "Arcade",
    impact: 99,
    platform: "Arcade Original",
    dev: "Namco / Toru Iwatani",
    romDetail: "16 kilobytes de código e gráficos em 4 chips EPROM 2732. Sem armazenamento permanente além de dip-switches.",
    format: "Placa PCB Jamma pré-padrão",
    region: "Japão / Mundial",
    res: "224 × 288 px (CRT vertical)",
    audio: "Namco 3 vozes por waveform",
    gameplay: "Criou o padrão de 'labirinto de perseguição' (maze chase). O design quebrou com a estética de tiro espacial da época para atrair públicos amplos, com uma IA de perseguição individualizada para cada fantasma.",
    pillars: [
      "IA quádrupla: Blinky persegue diretamente, Pinky embosca à frente, Inky calcula um flanco vetorial e Clyde vagueia aleatoriamente.",
      "Pílula de energia: mecânica pioneira de inversão de caça, com vulnerabilidade temporária dos inimigos.",
      "Fase 256 'kill screen': falha no contador de 8 bits que corrompe metade da tela."
    ],
    trivia: "Toru Iwatani desenhou a silhueta de Pac-Man observando uma pizza da qual havia retirado uma fatia, durante um almoço em Tóquio.",
    triviaExtra: "O nome original japonês era Puck-Man (de 'paku-paku', a onomatopeia para abrir e fechar a boca), alterado nos EUA para evitar vandalismo nas letras das máquinas."
  },
  {
    id: "zelda",
    title: "The Legend of Zelda",
    year: 1986,
    category: "console",
    categoryLabel: "Console (8-bit)",
    impact: 98,
    platform: "NES / Famicom",
    dev: "Nintendo EAD / Shigeru Miyamoto",
    romDetail: "128 kilobytes de PRG-ROM + 8 kilobytes de CHR-RAM dedicados aos padrões gráficos.",
    format: "Cartucho dourado NES",
    region: "NTSC-J / NTSC-U",
    res: "256 × 240 px",
    audio: "Ricoh 2A03, PSG de 5 canais",
    gameplay: "Fundou a exploração não linear em mapa contínuo. Não exigia seguir uma rota predeterminada, premiando a curiosidade ao esconder segredos em rochas e arbustos.",
    pillars: [
      "Primeiro cartucho ocidental com bateria de lítio interna para 3 arquivos de save.",
      "Segunda Jornada (Second Quest): modo rearranjado e mais punitivo, liberado após zerar o jogo.",
      "Gestão de itens táticos: bumerangue, bombas, velas e a icônica Master Sword."
    ],
    trivia: "Foi idealizado originalmente para o Famicom Disk System no Japão, aproveitando a capacidade regravável de disquetes, antes de ser adaptado ao cartucho no Ocidente.",
    triviaExtra: "O nome da princesa foi inspirado em Zelda Fitzgerald, esposa do escritor F. Scott Fitzgerald — Miyamoto admirava a sonoridade do nome."
  },
  {
    id: "sf2",
    title: "Street Fighter II: The World Warrior",
    year: 1991,
    category: "arcade",
    categoryLabel: "Arcade",
    impact: 97,
    platform: "Capcom CPS-1 Arcade",
    dev: "Capcom / Yoshiki Okamoto & Akira Nishitani",
    romDetail: "64 megabits divididos em múltiplos chips MASK ROM e uma sub-placa C personalizada.",
    format: "Placa-mãe CPS-1 arcade",
    region: "Mundial (arcade)",
    res: "384 × 224 px @ 59.6 Hz",
    audio: "Yamaha YM2151 FM + OKI MSM6295",
    gameplay: "Fixou a gramática dos jogos de luta modernos: 6 botões (fraco, médio, forte de soco e chute), comandos de meia-lua para projéteis e um elenco com estilos verdadeiramente distintos.",
    pillars: [
      "O cancelamento de animação, descoberto por acaso, resultou no sistema de 'combos'.",
      "Golpes especiais icônicos: Hadouken, Shoryuken, Tatsumaki Senpukyaku e Yoga Fire.",
      "Sistema de 'Dizzy' (tontura), que premiava agressão sustentada e boa cadência de golpes."
    ],
    trivia: "O sistema de combos foi um efeito colateral do código escrito para tornar os comandos de golpes especiais mais tolerantes; Okamoto decidiu manter a mecânica ao notar a profundidade que ela trazia.",
    triviaExtra: "A frase 'You must defeat Sheng Long to stand a chance' foi um erro de tradução que alimentou décadas de mitos em revistas de videogame."
  },
  {
    id: "sonic-sms",
    title: "Sonic the Hedgehog (8-bit)",
    year: 1991,
    category: "console",
    categoryLabel: "Console (8-bit)",
    impact: 92,
    platform: "Sega Master System",
    dev: "Ancient / Yuzo Koshiro & Sega",
    romDetail: "2 megabits (256 KB) em chip Mask ROM, otimizados para o processador Zilog Z80 a 3,58 MHz sem perda severa de taxa de quadros.",
    format: "Cartucho Sega Card / Mega Cartucho",
    region: "NTSC-U / PAL / Brasil (TecToy)",
    res: "256 × 192 px (32 cores simultâneas)",
    audio: "Texas Instruments SN76489 PSG (3 canais quadrados + 1 ruído)",
    gameplay: "Em vez de um simples port reduzido do Mega Drive, foi recriado do zero pela Ancient. Troca parte da velocidade bruta por exploração vertical precisa, fases inéditas (como Bridge Zone e Jungle Zone) e um mapa-múndi estilo progressão de fases.",
    pillars: [
      "Esmeraldas do Caos escondidas diretamente dentro do cenário das fases normais, exigindo exploração atenta.",
      "Trilha sonora adaptada e composta por Yuzo Koshiro para o chip PSG de 8 bits, criando temas exclusivos lendários como Bridge Zone.",
      "Design de fases inédito com rolagem autônoma, fases aquáticas em labirinto e lutas contra Dr. Robotnik sem anéis de proteção."
    ],
    trivia: "Foi o primeiro projeto da empresa Ancient, fundada pelo lendário compositor Yuzo Koshiro com sua mãe Tomo Koshiro e sua irmã Ayano Koshiro especificamente para atender ao pedido da Sega.",
    triviaExtra: "No Brasil, esta versão de 8 bits tornou-se um fenômeno cultural absoluto por vir gravada na memória dos modelos Master System III Compact comercializados pela TecToy."
  },
  {
    id: "doom",
    title: "DOOM",
    year: 1993,
    category: "pc",
    categoryLabel: "PC",
    impact: 96,
    platform: "PC / MS-DOS",
    dev: "id Software / John Carmack & John Romero",
    romDetail: "Distribuído em 2 a 4 disquetes de 3,5 polegadas, contendo os arquivos DOOM.WAD.",
    format: "Disquete 3,5\" HD / shareware",
    region: "Global (PC)",
    res: "320 × 200 px (modo VGA 13h, 256 cores)",
    audio: "AdLib / Sound Blaster OPL3 / General MIDI",
    gameplay: "Velocidade vertiginosa combinada com uma renderização 3D aparente. Iluminação dinâmica por setores, variação de altura de pisos e tetos, e física de projéteis rápidos em labirintos claustrofóbicos.",
    pillars: [
      "Binary Space Partitioning (BSP): algoritmo de Carmack que viabilizou renderização veloz em PCs comuns.",
      "Filosofia shareware: o primeiro episódio era gratuito, convertendo milhões de jogadores em compradores.",
      "Cultura de mods e WADs: o motor foi pensado para que os próprios fãs criassem fases e armas."
    ],
    trivia: "John Carmack e John Romero cunharam o termo 'Deathmatch' durante os testes das primeiras partidas competitivas em rede local, na sede da id Software em Mesquite, Texas.",
    triviaExtra: "Em 1994, administradores de rede de universidades — e da própria Microsoft — precisaram instalar filtros para evitar que servidores caíssem por causa das partidas multiplayer."
  },
  {
    id: "bomberman",
    title: "Super Bomberman",
    year: 1993,
    category: "console",
    categoryLabel: "Console (16-bit)",
    impact: 91,
    platform: "Super Nintendo (SNES)",
    dev: "Hudson Soft / Produce!",
    romDetail: "4 megabits (512 KB) em cartucho LoROM padrão, sem chips de expansão necessários.",
    format: "Cartucho Super NES / Super Famicom",
    region: "NTSC-J / NTSC-U / PAL",
    res: "256 × 224 px (256 cores em tela)",
    audio: "Sony SPC700 + S-DSP (8 canais ADPCM de 16 bits, por Jun Chikuma)",
    gameplay: "Inaugurou a era 16 bits da franquia com arenas táticas de grade fixa. Combinou uma campanha principal totalmente cooperativa para dois jogadores com o lendário Battle Mode para até 4 jogadores simultâneos.",
    pillars: [
      "Pioneiro do multiplayer local de 4 jogadores no SNES através do acessório Super Multitap, co-desenvolvido pela própria Hudson Soft.",
      "Doze arenas temáticas no Battle Mode com mecânicas próprias: esteiras rolantes, telhados que escondem bombas, portais e canos.",
      "Sistema clássico de progressão por Power-Ups (Fire, Bomb-Up, Speed, Kick e Punch Glove) com risco constante de autodestruição."
    ],
    trivia: "A Hudson Soft projetou o adaptador Super Multitap (com formato da carinha de um Bomberman na versão japonesa) e o vendeu em pacote com o jogo, estabelecendo o padrão de party games de sofá nos anos 90.",
    triviaExtra: "Foi o primeiro título da série a permitir que a campanha inteira (Normal Game, com 6 mundos e 48 estágios) fosse concluída em modo cooperativo por White Bomberman e Black Bomberman."
  },
  {
    id: "pokemon",
    title: "Pokémon Red & Blue",
    year: 1996,
    category: "portable",
    categoryLabel: "Portátil",
    impact: 95,
    platform: "Nintendo Game Boy",
    dev: "Game Freak / Satoshi Tajiri & Ken Sugimori",
    romDetail: "1 megabyte (8 megabits) em chip MBC3, com 32 KB de SRAM alimentada por uma pilha tipo moeda.",
    format: "Cartucho monocromático DMG",
    region: "Japão / Ocidente",
    res: "160 × 144 px (tons de cinza/verde)",
    audio: "Sharp LR35902, 4 canais custom",
    gameplay: "Um simulador de colecionismo e combate por turnos. Exigia cooperação física entre dois consoles conectados por cabo, já que certos Pokémon só existiam em uma das versões.",
    pillars: [
      "Cabo Game Link para trocas instantâneas de criaturas entre duas pessoas.",
      "151 criaturas desenhadas com balanceamento baseado em fraquezas e resistências elementais.",
      "Compressão de dados cuidadosa para caber centenas de monstros em apenas 1 MB."
    ],
    trivia: "Satoshi Tajiri levou quase 6 anos concebendo o jogo; a Game Freak quase faliu durante o desenvolvimento.",
    triviaExtra: "Mew foi inserido secretamente pelo programador Shigeki Morimoto, aproveitando 334 bytes que sobraram na ROM pouco antes da gravação final."
  },
  {
    id: "castlevania",
    title: "Castlevania: Symphony of the Night",
    year: 1997,
    category: "console",
    categoryLabel: "Console (32-bit)",
    impact: 94,
    platform: "Sony PlayStation",
    dev: "Konami Tokyo / Koji Igarashi & Toru Hagihara",
    romDetail: "540 megabytes em CD-ROM, incluindo trilha sonora gravada por um estúdio e dublagem com atores.",
    format: "Mídia óptica CD-ROM (jewel case)",
    region: "NTSC-J / NTSC-U / PAL",
    res: "256 × 224 px / 512 × 240 px",
    audio: "Orquestra de estúdio (Michiru Yamane) + CD-DA",
    gameplay: "Fundiu o combate de chicote da franquia com a exploração de mapa e melhorias permanentes ao estilo Super Metroid. Somou um sistema de RPG com experiência, atributos e centenas de armas.",
    pillars: [
      "O Castelo Invertido: ao completar a primeira metade, o mapa inteiro vira de cabeça para baixo.",
      "Trilha sonora que mescla gótico clássico, metal progressivo e jazz fusion.",
      "Animações desenhadas à mão para Alucard, com múltiplos quadros de capa esvoaçante."
    ],
    trivia: "O produtor Koji Igarashi afirmou que a inspiração mecânica principal não foi Metroid, mas The Legend of Zelda — o objetivo era incentivar a exploração sobre o combate linear.",
    triviaExtra: "O jogo quase não foi aprovado pela diretoria da Konami norte-americana, que acreditava que 'o 2D estava morto' diante do avanço dos polígonos do PS1 e do N64."
  },
  {
    id: "smash64",
    title: "Super Smash Bros.",
    year: 1999,
    category: "console",
    categoryLabel: "Console (64-bit)",
    impact: 93,
    platform: "Nintendo 64",
    dev: "HAL Laboratory / Masahiro Sakurai & Satoru Iwata",
    romDetail: "128 megabits (16 MB) em cartucho NUS com chip SRAM alimentado por bateria interna para salvar personagens desbloqueáveis e recordes.",
    format: "Cartucho Nintendo 64 (NUS-NALP)",
    region: "NTSC-J / NTSC-U / PAL",
    res: "320 × 240 px @ 60 fps",
    audio: "MIPS / RCP Software Mixed ADPCM (composto por Hirokazu Ando)",
    gameplay: "Subverteu todas as regras dos jogos de luta tradicionais: substituiu barras de vida por um medidor percentual de impulso (knockback), trocou sequências complexas de botões por comandos direcionais de 1 botão e colocou até 4 ícones da Nintendo em arenas abertas com plataformas.",
    pillars: [
      "Sistema de porcentagem e Ring-Out: quanto maior o dano acumulado, mais longe o oponente é arremessado para fora da tela.",
      "Comandos universais acessíveis: todos os 12 lutadores (8 iniciais e 4 secretos) usam as mesmas combinações de alavanca analógica + botão A ou B.",
      "Arenas vivas com itens dinâmicos (Pokébolas, Bob-ombs, Home-Run Bat) e perigos de cenário baseados nas franquias clássicas da Nintendo."
    ],
    trivia: "O jogo nasceu como um protótipo secreto chamado 'Dragon King: The Fighting Game', programado por Masahiro Sakurai e Satoru Iwata nas horas vagas com bonecos poligonais sem rosto.",
    triviaExtra: "Sakurai incluiu personagens da Nintendo sem pedir autorização prévia para provar que o jogo precisava de rostos carismáticos; quando apresentou o protótipo já jogável, Shigeru Miyamoto aprovou o crossover oficial."
  }
];

/* Coprocessadores e arquiteturas citados nos dossiês acima */
const HARDWARE_NOTES = {
  cps1: {
    title: "Arquitetura arcade Capcom CPS-1 (1988)",
    desc: "A Capcom Play System 1 era formada por três placas empilhadas (principal, de ROMs e de proteção/gráficos). O coração era um Motorola 68000 a 10 MHz, junto com um Z80 dedicado ao áudio. A capacidade de renderizar até 256 sprites simultâneos, em 3 planos independentes de rolagem paralaxe, sustentou os cenários vibrantes de Street Fighter II sem perda de quadros."
  },
  superfx: {
    title: "Coprocessadores de cartucho: MMC e Super FX",
    desc: "Quando o hardware dos consoles começava a mostrar limites, desenvolvedores colocavam computadores extras dentro dos próprios cartuchos. Os chips MMC1 a MMC5 da Nintendo, no NES, ampliavam a memória com troca de bancos e permitiam rolagem diagonal suave. No Super Nintendo, o chip Super FX — um coprocessador RISC de 16 bits a 21,4 MHz — calculava polígonos 3D no próprio cartucho e enviava o resultado já pronto para o console exibir."
  },
  ps1gte: {
    title: "Sony PlayStation GTE e a VRAM (1994)",
    desc: "O Geometry Transformation Engine (GTE) era um coprocessador embutido no chip principal do PS1, capaz de realizar cálculos matriciais de projeção 3D a cerca de 1,5 milhão de operações vetoriais por segundo. Em Symphony of the Night, a Konami usou o 1 MB de VRAM e os canais de áudio ADPCM para manter dezenas de megabytes de animações em pixel art na memória de vídeo."
  }
};
