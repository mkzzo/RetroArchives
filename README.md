# RetroArchive

Uma enciclopédia interativa dedicada à preservação, história e evolução técnica dos consoles, jogos, gráficos e áudio da era clássica e moderna dos videogames.

[🌐 Acessar o site](https://mkzzo.github.io/RetroArchives/) · [📦 Repositório no GitHub](https://github.com/mkzzo/RetroArchives)

---

## Sobre o projeto

O RetroArchive é um projeto web educativo voltado para entusiastas, estudantes e pesquisadores da história dos videogames. A plataforma reúne conteúdos históricos e técnicos em uma experiência interativa, combinando narrativa, visual retrô e recursos multimídia.

O objetivo do projeto é preservar a memória da indústria de videogames, contextualizando consoles, franquias, avanços gráficos e evolução sonora em uma interface acessível e dinâmica.

---

## Funcionalidades

- Catálogo de consoles e hardware com filtros e comparação técnica
- Dossiês de jogos marcantes com contexto histórico e referências importantes
- Linha do tempo com marcos da indústria dos videogames
- Comparador visual da evolução gráfica e estética dos jogos
- Laboratório de áudio com referências a chips, síntese e tecnologias sonoras
- Jogos clássicos jogáveis diretamente no navegador
- Experiência visual com elementos retrô e interativos em HTML, CSS e JavaScript

---

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript ES6+
- Canvas 2D
- Web Audio API
- APIs nativas do navegador para interatividade e performance

---

## Como executar localmente

Para que o site funcione corretamente, é recomendável servir os arquivos em um servidor local.

### Opção 1: terminal

```bash
git clone https://github.com/mkzzo/RetroArchives.git
cd RetroArchives
python -m http.server 8000
```

Depois, acesse:

```text
http://localhost:8000
```

### Opção 2: VS Code + Live Server

1. Abra a pasta do projeto no VS Code.
2. Clique com o botão direito em `index.html`.
3. Escolha `Open with Live Server`.

### Opção 3: scripts automáticos

- Windows: `iniciar_site.bat`
- Linux/macOS: `iniciar_site.sh`

---

## Estrutura do projeto

```text
RetroArchives/
├── README.md
├── LEIA-ME.txt
├── LICENSE
├── index.html
├── consoles.html
├── jogos.html
├── timeline.html
├── graficos.html
├── audio.html
├── iniciar_site.bat
├── iniciar_site.sh
├── assets/
├── css/
├── js/
│   └── data/
└── ...
```

---

## Publicação online

### GitHub Pages

1. Faça o push do projeto para o GitHub.
2. Acesse `Settings` > `Pages`.
3. Em `Branch`, selecione `main`.
4. Em `Folder`, mantenha `/ (root)`.
5. Salve.

A aplicação ficará disponível em um link semelhante a:

```text
https://<usuario>.github.io/RetroArchives/
```

### Vercel / Netlify

Também é possível publicar o projeto em plataformas estáticas como Vercel e Netlify, apontando para a pasta raiz do repositório.

---

## Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais informações.

---

Projeto desenvolvido com fins educacionais e de preservação histórica da cultura dos videogames.
