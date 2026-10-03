# 🕹️ RetroArchive

> Uma enciclopédia interativa dedicada à preservação, história e evolução dos consoles, jogos, gráficos e áudio clássicos da era dos videogames retrô.

---

## 📖 Sobre o Projeto

O **RetroArchive** é uma aplicação web desenvolvida para entusiastas e estudantes da história dos videogames. O projeto centraliza informações cronológicas, fichas técnicas de plataformas clássicas, catálogos de jogos marcantes e análises sobre o avanço tecnológico de gráficos e trilhas sonoras.

---

## 🚀 Funcionalidades

- **🏠 Home (`index.html`):** Apresentação geral do acervo, destaques e novidades.
- **🎮 Consoles (`consoles.html`):** Fichas técnicas, gerações e especificações dos videogames clássicos.
- **👾 Jogos (`jogos.html`):** Catálogo detalhado com títulos clássicos e dados históricos.
- **⏳ Linha do Tempo (`timeline.html`):** Cronologia interativa da indústria dos jogos eletrônicos.
- **🎨 Gráficos (`graficos.html`):** Evolução visual, de sprites e paletas 8-bit aos modelos 3D poligonais.
- **🔊 Áudio (`audio.html`):** História da evolução sonora (chiptune, canais de síntese, CD-ROM e trilhas orquestradas).

---

## 🗂️ Estrutura do Projeto

```text
retroarchive/
├── assets/                 # Imagens, ícones e mídias gerais
├── css/
│   ├── style.css           # Estilos globais e componentes base
│   ├── home.css            # Estilos específicos da página inicial
│   ├── consoles.css        # Layout da seção de consoles
│   ├── jogos.css           # Layout do catálogo de jogos
│   ├── timeline.css        # Estilos da linha do tempo interativa
│   ├── graficos.css        # Layout da página de evolução visual
│   └── audio.css           # Layout da página de áudio
├── js/
│   ├── main.js             # Scripts compartilhados e inicializações
│   ├── home.js             # Lógica da tela inicial
│   ├── consoles.js         # Renderização e filtros de consoles
│   ├── jogos.js            # Renderização e filtros de jogos
│   ├── timeline.js         # Interações da linha do tempo
│   ├── graficos.js         # Interatividades da página de gráficos
│   ├── audio.js            # Controles e interações de áudio
│   └── data/
│       ├── consoles-data.js   # Base de dados dos consoles
│       ├── jogos-data.js      # Base de dados dos jogos
│       ├── timeline-data.js   # Eventos cronológicos
│       └── console-images.js  # Mapeamento de imagens e mídias
├── index.html
├── consoles.html
├── jogos.html
├── timeline.html
├── graficos.html
└── audio.html
```

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Semântica e estruturação das páginas.
- **CSS3:** Estilização modularizada, flexbox/grid e responsividade.
- **JavaScript (ES6+):** Manipulação de DOM, renderização dinâmica de dados via arquivos de dados locais (`data/`).

---

## 💻 Como Executar

Por ser uma aplicação web estática, não há dependência de gerenciadores de pacotes ou servidores complexos:

1. Clone ou descompacte o repositório em sua máquina:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```
2. Abra o arquivo `index.html` em qualquer navegador web moderno:
   - Dica: você também pode usar a extensão **Live Server** no VS Code para desenvolvimento local.

---

## 👥 Equipe de Desenvolvimento

| Integrante | Função / Responsabilidade | GitHub | LinkedIn |
| :--- | :--- | :--- | :--- |
| **[Seu Nome Aqui]** | *[Ex: Coordenação & Desenvolvimento]* | [@mkzzo](https://github.com/mkzzo) | [Perfil](https://www.linkedin.com/in/hiago-melo-989033258/) |
| **[Nome Integrante 2]** | *[Ex: Frontend & CSS]* | [@user2](https://github.com/) | [Perfil](https://linkedin.com/in/) |
| **[Nome Integrante 3]** | *[Ex: Pesquisa de Dados & Conteúdo]* | [@user3](https://github.com/) | [Perfil](https://linkedin.com/in/) |
| **[Nome Integrante 4]** | *[Ex: Módulos de Áudio & Gráficos]* | [@user4](https://github.com/) | [Perfil](https://linkedin.com/in/) |
| **[Nome Integrante 5]** | *[Ex: Linha do Tempo & Testes]* | [@user5](https://github.com/) | [Perfil](https://linkedin.com/in/) |

---

## 📝 Licença e Observações

- **Disciplina/Instituição:** *[Desenvolvimento front-end para web / Engenharia de Software / Unicid]*
- **Status do Projeto:** Em desenvolvimento
- Este projeto foi desenvolvido com finalidade puramente educacional e de preservação histórica.
