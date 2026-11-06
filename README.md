# 🕹️ RetroArchive

> Uma enciclopédia interativa dedicada à preservação, história e evolução técnica dos consoles, jogos, gráficos e áudio da era clássica e moderna dos videogames.

---

## 📖 Sobre o Projeto

O **RetroArchive** é uma aplicação web desenvolvida para entusiastas, pesquisadores e estudantes da história dos videogames. O projeto reúne cronologia histórica, especificações técnicas detalhadas de plataformas desde a 1ª até a 9ª geração, dossiês de jogos marcantes com emuladores integrados, laboratórios interativos de evolução gráfica e síntese de áudio, além de dois jogos retrô (*Asteroids* e *Pong*) recriados em Canvas puro direto no navegador.

---

## 🚀 Funcionalidades

- **🏠 Home (`docs/index.html`):**
  - **Filtro CRT Global:** scanlines animadas e vinheta de monitor de tubo retro.
  - **Cursor Arcade:** mira em pixel-art integrada em todas as páginas do acervo.
  - **Hero Synthwave 3D:** malha vetorial tridimensional interativa com reação ao movimento do mouse e efeito de digitação MS-DOS.
  - **A Jornada do Hardware:** cartões interativos com sintetizador de áudio 8-bit (Web Audio API) e partículas de poeira estelar.
  - **Sala dos Gabinetes (Arcade):** jogos clássicos *Asteroids* e *Pong* recriados em Canvas com molduras em neon e pausamento automático com *IntersectionObserver* para economia de processamento.
- **🎮 Consoles & Hardware (`docs/consoles.html`):**
  - Fichas técnicas de plataformas cobrindo 9 gerações (1972 aos dias atuais).
  - Busca textual em tempo real, filtros por geração e fabricante, e ordenação dinâmica.
  - Modal com dossiê técnico aprofundado, comparador lado a lado de dois consoles e carregamento sob demanda de modelos 3D interativos (Sketchfab).
- **👾 Jogos Marcantes (`docs/jogos.html`):**
  - Catálogo de títulos clássicos com dados históricos, importância e pilares técnicos.
  - Aba de emulação com carregamento seguro sob demanda de emuladores (HTML5 / WebAssembly / JS-DOS).
- **⏳ Linha do Tempo (`docs/timeline.html`):**
  - Trilho cronológico central alternado, filtrável por geração e alimentado pela base de dados de consoles.
- **🎨 Evolução Gráfica (`docs/graficos.html`):**
  - Comparador visual interativo com efeito de desfoque progressivo (*blur reveal*) ao arrastar o mouse ou dedo.
  - Grade responsiva 5x2 com 10 grandes franquias: *Grand Theft Auto*, *Pac-Man*, *The Legend of Zelda*, *Street Fighter*, *Sonic the Hedgehog*, *DOOM*, *Bomberman*, *Pokémon*, *Castlevania* (com captura de *Castlevania: Belmont's Curse*) e *Super Smash Bros.*
- **🔊 Laboratório de Áudio (`docs/audio.html`):**
  - História sonora dos videogames (chips PSG, FM, sintetizadores lendários como SID e YM2612, PCM, CD-ROM e áudio posicional moderno) com jukebox e visualizador de ondas.

---

## 🗂️ Estrutura do Projeto

```text
RetroArchive/
├── README.md                          # Documentação principal do projeto
└── docs/                              # Diretório da aplicação web
    ├── index.html                     # Página inicial (Hero 3D, Hardware e Gabinetes)
    ├── consoles.html                  # Catálogo, fichas técnicas e comparador
    ├── jogos.html                     # Dossiês de jogos e emuladores
    ├── timeline.html                  # Cronologia histórica interativa
    ├── graficos.html                  # Comparador de evolução gráfica (blur reveal)
    ├── audio.html                     # História do áudio e reprodutor interativo
    ├── LEIA-ME.txt                    # Instruções rápidas de execução e publicação
    ├── iniciar_site.bat               # Inicializador do servidor local (Windows)
    ├── iniciar_site.sh                # Inicializador do servidor local (Linux/macOS)
    ├── assets/                        # Imagens locais e mídias do site
    │   ├── bomberman.jpg
    │   ├── gta-sa.jpg
    │   ├── gta-v.jpg
    │   ├── sonic.jpg
    │   ├── super-mario.jpg
    │   └── comparacoes/               # Capturas para o comparador gráfico (10 franquias)
    │       ├── castlevania-belmonts-curse-2026.jpg
    │       ├── castlevania-sotn-1997.jpg
    │       ├── doom-1993.jpg
    │       ├── doom-the-dark-ages-2025.jpg
    │       ├── pacman-1980.jpg
    │       ├── pacman-world-repac-2022.jpg
    │       ├── pokemon-red-blue-1996.jpg
    │       ├── pokemon-scarlet-violet-2022.jpg
    │       ├── smash-64-1999.jpg
    │       ├── smash-ultimate-2018.jpg
    │       ├── sonic-frontiers-2022.jpg
    │       ├── sonic-sms-1991.jpg
    │       ├── street-fighter-2-1991.jpg
    │       ├── street-fighter-6-2023.jpg
    │       ├── super-bomberman-1993.jpg
    │       ├── super-bomberman-r2-2023.jpg
    │       ├── zelda-1986.jpg
    │       └── zelda-totk-2023.jpg
    ├── css/                           # Folhas de estilo modulares
    │   ├── style.css                  # Estilos globais, cursor arcade e variáveis :root
    │   ├── home.css                   # Animações, CRT, hero 3D e gabinetes arcade
    │   ├── consoles.css               # Grid de consoles e modal comparador
    │   ├── jogos.css                  # Barra de filtros e modal de emulação
    │   ├── timeline.css               # Trilho da linha do tempo e nós cronológicos
    │   ├── graficos.css               # Seletor 5x2 e palco de desfoque progressivo
    │   └── audio.css                  # Estilos da jukebox e visualizador sonoro
    └── js/                            # Scripts de interação e lógica
        ├── main.js                    # Menu mobile, navegação ativa, modais e helpers (GEN_COLORS/initials)
        ├── home.js                    # Gabinetes Asteroids e Pong, Hero 3D e síntese Web Audio
        ├── consoles.js                # Renderização, busca e comparador de consoles
        ├── jogos.js                   # Renderização de dossiês e carregamento de emuladores
        ├── timeline.js                # Montagem cronológica e filtros da linha do tempo
        ├── blur-reveal.js             # Lógica de arraste e desfoque progressivo de imagens
        ├── comparacoes.js             # Seletor dinâmico de franquias e pré-carregamento de telas
        ├── audio.js                   # Interatividade do laboratório de som
        └── data/                      # Bases de dados relacionais em JavaScript
            ├── consoles-data.js       # Metadados e especificações dos consoles
            ├── console-images.js      # Mapeamento central de imagens de hardware
            ├── console-models.js      # Mapeamento de embeds de modelos 3D (Sketchfab)
            ├── jogos-data.js          # Dossiês e metadados dos jogos marcantes
            ├── game-images.js         # Mapeamento central de capas de jogos
            ├── game-players.js        # Mapeamento de iframes para os emuladores
            ├── timeline-data.js       # Marcos históricos independentes
            └── comparacoes-data.js    # Metadados e medidas reais para evolução gráfica
```

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Semântica acessível, atributos ARIA e tags de mídia.
- **CSS3 Moderno:** Flexbox, CSS Grid (layout 5x2 responsivo), variáveis customizadas (`var(--...)`), animações por `@keyframes`, filtros gráficos (`blur`, `contrast`, `radial-gradient`) e temas neon retrô.
- **JavaScript Moderno (ES6+ Vanilla):** Arquitetura desacoplada sem dependência de bibliotecas externas pesadas, manipulação limpa de DOM e gerenciamento sob demanda de recursos assíncronos.
- **Web Audio API:** Síntese de frequências chiptune 8-bit em tempo real via osciladores em onda quadrada (`square`).
- **HTML5 Canvas 2D:** Renderização matemática da malha vetorial 3D e motores físicos dos jogos *Asteroids* e *Pong*.
- **IntersectionObserver API:** Pausamento inteligente dos loops de renderização (`requestAnimationFrame`) quando os elementos saem da viewport, economizando CPU e bateria.

---

## 💻 Como Executar

Para garantir o funcionamento completo de áudio, Canvas e emuladores, recomenda-se executar a aplicação em um servidor web local:

### Opção 1: Atalhos Automáticos (Recomendado)
- **No Windows:** dê um duplo clique no arquivo `docs/iniciar_site.bat`. Ele iniciará o servidor local e abrirá o navegador em `http://localhost:8000`.
- **No Linux ou macOS:** execute o script `docs/iniciar_site.sh` no terminal.

### Opção 2: Via Terminal (Python)
Abra o terminal na pasta `docs/` e execute:
```bash
python -m http.server 8000
```
Em seguida, acesse no navegador: `http://localhost:8000`

### Opção 3: Extensão Live Server (VS Code)
Abra a pasta do projeto no VS Code, clique com o botão direito sobre `docs/index.html` e selecione **Open with Live Server**.

---

## 🚀 Como Publicar Online (Grátis)

- **Vercel / Netlify:** basta arrastar a pasta descompactada para o painel de projetos. Se necessário, aponte o diretório de publicação para a pasta `docs/`.
- **GitHub Pages:**
  1. Envie o repositório para o seu GitHub.
  2. Acesse **Settings** > **Pages**.
  3. Em **Branch**, selecione `main` e a pasta `/docs`, depois clique em **Save**.

---

## 👥 Equipe de Desenvolvimento

| Integrante | Função / Responsabilidade | GitHub | LinkedIn |
| :--- | :--- | :--- | :--- |
| **Hiago Melo** | *Coordenação & Desenvolvimento* | [@mkzzo](https://www.google.com/search?q=https://github.com/mkzzo) | [Perfil](https://www.google.com/search?q=https://www.linkedin.com/in/hiago-melo-989033258/) |
| **Kalil Rodrigues** | *Frontend & CSS* | [@Kalil-1Rodrigues](https://www.google.com/search?q=https://github.com/Kalil-1Rodrigues) | [Perfil](https://linkedin.com/in/) |
| **Guilherme Honoria** | *Pesquisa de Dados & Conteúdo* | [@Guimarks08](https://www.google.com/search?q=https://github.com/Guimarks08) | [Perfil](https://www.google.com/search?q=https://www.linkedin.com/in/guilherme-marques-hon%25C3%25B3ria-173928312/) |
| **Matheus Sena** | *Módulos de Áudio & Gráficos* | [@matheusena0503-prog](https://www.google.com/search?q=https://github.com/matheusena0503-prog) | [Perfil](https://www.google.com/search?q=https://www.linkedin.com/in/matheusenadev/) |
| **Matheus Melo** | *Linha do Tempo & Testes* | [@matheusmth09silva-cmd](https://github.com/matheusmth09silva-cmd) | [Perfil](https://www.linkedin.com/in/matheus-silva-melo-147622386/) |

---

## 📝 Licença e Observações

- **Disciplina/Instituição:** *Desenvolvimento front-end para web / Engenharia de Software / Unicid*
- **Status do Projeto:** Em desenvolvimento / Versão Refinada
- Este projeto foi desenvolvido com finalidade puramente educacional e de preservação histórica.
