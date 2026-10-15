/* =========================================================
   RetroArchive — game-images.js
   Registro central de capas de jogos. Mesmo princípio do
   console-images.js: chave = id do jogo (o mesmo "id" usado em
   data/jogos-data.js), valor = endereço da imagem. Qualquer
   página que carregar este script ganha acesso às mesmas capas.

   Todos os seis jogos têm capa cadastrada. Se alguma imagem
   falhar ao carregar (link quebrado, sem internet), jogos.js
   volta automaticamente para o placeholder (tile com a inicial
   do título).
   ========================================================= */
const GAME_IMAGES = {
  // Pac-Man — 1980
  pacman:
    "https://www.bojoga.com.br/files/2018/06/MV5BMmViYjMzN2EtOTBjNy00MmI0LTk5ZTItM2MyNzEwNGIzZjdhXkEyXkFqcGdeQXVyMTg2NzgzMDE@._V1_.jpg",

  // The Legend of Zelda — 1986
  zelda:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmGNpxH-mMQ3_z9IlSaRohn-HnXrh10REn4DezIpidV6zlQq7tuCm1AeI&s=10",

  // DOOM — 1993
  doom:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkCWzqwhewQ0AnHKdbANu1YqJeZ8OhXRba2ADInNk0aA&s=10",

  // Pokémon Red & Blue — 1996
  pokemon:
    "https://sm.ign.com/ign_br/cover/p/pokemon-re/pokemon-red-version_1evk.jpg",

  // Castlevania: Symphony of the Night — 1997
  castlevania:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwsM9ivGp_B2XIDrON-j_E_BjePoUSP5U-tngHmG4ajw&s=10",

  // Street Fighter II: The World Warrior — 1991
  sf2:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNdkHChNOXPSKgJPdEC0aZpQlUZyXoPqT0XX3avafQKQ&s=10"
};
