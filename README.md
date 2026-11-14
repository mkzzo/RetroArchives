# 🕹️ RetroArchive

> Enciclopédia interativa dedicada à preservação, história e evolução técnica dos consoles, jogos, gráficos e áudio da era clássica e moderna dos videogames.

---

## 📖 Sobre o Projeto

O RetroArchive é uma aplicação web estática criada para entusiastas, pesquisadores e estudantes da história dos videogames. O projeto reúne cronologia histórica, fichas técnicas de consoles, dossiês de jogos, comparadores visuais e um laboratório de áudio e gráficos em um único portal interativo.

---

## 🚀 Funcionalidades

- Home com visual retrô e elementos interativos em canvas e CSS.
- Catálogo de consoles com filtros, busca e comparador técnico.
- Dossiês de jogos marcantes com emuladores embutidos e informações de contexto histórico.
- Linha do tempo cronológica dos principais marcos da indústria.
- Estudo visual da evolução gráfica e comparação entre franquias.
- Laboratório de áudio com síntese sonora, jukebox e referências a chips e tecnologias de áudio.
- Jogos clássicos jogáveis diretamente no navegador, como Asteroids e Pong.

---

## 🗂️ Estrutura do Projeto

```text
RetroArchive/
├── README.md                          # Documentação principal
├── LEIA-ME.txt                        # Instruções rápidas
├── LICENSE                            # Licença do projeto
├── index.html                         # Página inicial
├── consoles.html                      # Catálogo de consoles
├── jogos.html                         # Jogos marcantes
├── timeline.html                      # Linha do tempo
├── graficos.html                      # Evolução gráfica
├── audio.html                         # Laboratório de áudio
├── iniciar_site.bat                   # Inicialização local (Windows)
├── iniciar_site.sh                    # Inicialização local (Linux/macOS)
├── assets/                            # Imagens e mídia do site
│   ├── ...
│   └── comparacoes/
├── css/                               # Folhas de estilo
│   ├── style.css
│   ├── home.css
│   ├── consoles.css
│   ├── jogos.css
│   ├── timeline.css
│   ├── graficos.css
│   └── audio.css
├── js/                                # Scripts e dados da aplicação
│   ├── main.js
│   ├── home.js
│   ├── consoles.js
│   ├── jogos.js
│   ├── timeline.js
│   ├── blur-reveal.js
│   ├── comparacoes.js
│   ├── audio.js
│   └── data/
│       ├── consoles-data.js
│       ├── console-images.js
│       ├── console-models.js
│       ├── jogos-data.js
│       ├── game-images.js
│       ├── game-players.js
│       ├── timeline-data.js
│       └── comparacoes-data.js
└── ...
```

---

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3 moderno
- JavaScript ES6+
- Web Audio API
- HTML5 Canvas 2D
- IntersectionObserver API

---

## 💻 Como Executar Localmente

Para garantir o funcionamento completo de áudio, canvas e emuladores, o ideal é rodar a aplicação em um servidor web local.

### Opção 1: via terminal

Na raiz do projeto, execute:

```bash
python -m http.server 8000
```

Depois abra no navegador:

```text
http://localhost:8000
```

### Opção 2: VS Code + Live Server

1. Abra a pasta do projeto no VS Code.
2. Clique com o botão direito em `index.html`.
3. Selecione `Open with Live Server`.

### Opção 3: atalhos automáticos

- Windows: `iniciar_site.bat`
- Linux/macOS: `iniciar_site.sh`

---

## 🌐 Publicação Online

### GitHub Pages

1. Faça o push do repositório para o GitHub.
2. Acesse `Settings` > `Pages`.
3. Em `Branch`, selecione `main`.
4. Em `Folder`, mantenha `/ (root)`.
5. Salve.

A aplicação será disponibilizada em um link do tipo:

```text
https://<usuario>.github.io/RetroArchives/
```

### Vercel / Netlify

É possível hospedar o projeto também em plataformas estáticas como Vercel e Netlify, apontando para a pasta raiz do repositório.

---

## 👥 Equipe de Desenvolvimento

| Integrante | Função / Responsabilidade | GitHub |
| :--- | :--- | :--- |
| Hiago Melo | Coordenação & desenvolvimento | [@mkzzo](https://github.com/mkzzo) |
| Kalil Rodrigues | Frontend & CSS | [@Kalil-1Rodrigues](https://github.com/Kalil-1Rodrigues) |
| Guilherme Honoria | Pesquisa de dados & conteúdo | [@Guimarks08](https://github.com/Guimarks08) |
| Matheus Sena | Módulos de áudio & gráficos | [@matheusena0503-prog](https://github.com/matheusena0503-prog) |
| Matheus Melo | Linha do tempo & testes | [@matheusmth09silva-cmd](https://github.com/matheusmth09silva-cmd) |

---

## 📝 Licença e Observações

- Projeto desenvolvido com finalidade educacional e de preservação histórica.
- O site é estático e não depende de build tools ou bibliotecas externas pesadas.
- Conteúdo e estrutura podem ser ampliados conforme o projeto evolui.

