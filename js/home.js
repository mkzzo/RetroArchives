/* =========================================================
   RetroArchive — home.js
   Dois jogos jogáveis em canvas, sem bibliotecas externas:
   1) Asteroids (nave vetorial, tiro, colisão, ondas)
   2) Pong (jogador vs. CPU)
   ========================================================= */

/* ===================== 1. ASTEROIDS ===================== */
(function () {
  "use strict";
  const canvas = document.getElementById("asteroids-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const overlay = document.getElementById("asteroids-overlay");
  const startBtn = document.getElementById("asteroids-start-btn");
  const scoreEl = document.getElementById("asteroids-score");
  const hiScoreEl = document.getElementById("asteroids-hiscore");
  const livesEl = document.getElementById("asteroids-lives");

  const W = canvas.width;
  const H = canvas.height;
  const FRICTION = 0.99;
  const TURN_SPEED = 3.2; // graus por frame
  const THRUST = 0.09;
  const BULLET_SPEED = 6;
  const BULLET_LIFE = 55;

  let ship, bullets, asteroids, score, lives, hiScore, running, keys;
  hiScore = Number(localStorage.getItem("retroarchive-hiscore") || 0);
  if (hiScoreEl) hiScoreEl.textContent = hiScore;

  function newShip() {
    return { x: W / 2, y: H / 2, r: 12, angle: 0, vx: 0, vy: 0, thrusting: false };
  }

  function newAsteroid(x, y, size) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.6 + Math.random() * (size === 3 ? 0.6 : 1.2);
    const points = 8 + Math.floor(Math.random() * 4);
    const offsets = Array.from({ length: points }, () => 0.7 + Math.random() * 0.5);
    return {
      x, y, size, r: size * 14,
      vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.02,
      offsets
    };
  }

  function resetLevel(count) {
    asteroids = [];
    for (let i = 0; i < count; i++) {
      let x, y;
      do {
        x = Math.random() * W;
        y = Math.random() * H;
      } while (Math.hypot(x - W / 2, y - H / 2) < 120);
      asteroids.push(newAsteroid(x, y, 3));
    }
  }

  function startGame() {
    ship = newShip();
    bullets = [];
    score = 0;
    lives = 3;
    running = true;
    resetLevel(4);
    updateHud();
    if (overlay) overlay.style.display = "none";
    requestAnimationFrame(loop);
  }

  function updateHud() {
    if (scoreEl) scoreEl.textContent = score;
    if (livesEl) livesEl.textContent = "▲".repeat(Math.max(lives, 0));
  }

  function wrap(obj) {
    if (obj.x < -obj.r) obj.x = W + obj.r;
    if (obj.x > W + obj.r) obj.x = -obj.r;
    if (obj.y < -obj.r) obj.y = H + obj.r;
    if (obj.y > H + obj.r) obj.y = -obj.r;
  }

  function endGame() {
    running = false;
    if (score > hiScore) {
      hiScore = score;
      localStorage.setItem("retroarchive-hiscore", String(hiScore));
      if (hiScoreEl) hiScoreEl.textContent = hiScore;
    }
    if (overlay) {
      overlay.style.display = "flex";
      overlay.querySelector("[data-overlay-text]").textContent =
        `FIM DE JOGO — PONTUAÇÃO: ${score}`;
    }
  }

  function shoot() {
    if (bullets.length > 5) return;
    bullets.push({
      x: ship.x + Math.cos(ship.angle) * ship.r,
      y: ship.y + Math.sin(ship.angle) * ship.r,
      vx: Math.cos(ship.angle) * BULLET_SPEED + ship.vx,
      vy: Math.sin(ship.angle) * BULLET_SPEED + ship.vy,
      life: BULLET_LIFE
    });
  }

  function splitAsteroid(a) {
    score += (4 - a.size) * 20;
    if (a.size > 1) {
      asteroids.push(newAsteroid(a.x, a.y, a.size - 1));
      asteroids.push(newAsteroid(a.x, a.y, a.size - 1));
    }
    updateHud();
  }

  function update() {
    // controles
    if (keys.left) ship.angle -= (TURN_SPEED * Math.PI) / 180;
    if (keys.right) ship.angle += (TURN_SPEED * Math.PI) / 180;
    ship.thrusting = !!keys.thrust;
    if (ship.thrusting) {
      ship.vx += Math.cos(ship.angle) * THRUST;
      ship.vy += Math.sin(ship.angle) * THRUST;
    }
    ship.vx *= FRICTION;
    ship.vy *= FRICTION;
    ship.x += ship.vx;
    ship.y += ship.vy;
    wrap(ship);

    bullets.forEach((b) => {
      b.x += b.vx;
      b.y += b.vy;
      b.life -= 1;
    });
    bullets = bullets.filter((b) => b.life > 0);
    bullets.forEach(wrap);

    asteroids.forEach((a) => {
      a.x += a.vx;
      a.y += a.vy;
      a.angle += a.spin;
      wrap(a);
    });

    // colisão bala x asteroide
    for (let i = asteroids.length - 1; i >= 0; i--) {
      const a = asteroids[i];
      for (let j = bullets.length - 1; j >= 0; j--) {
        const b = bullets[j];
        if (Math.hypot(a.x - b.x, a.y - b.y) < a.r) {
          splitAsteroid(a);
          asteroids.splice(i, 1);
          bullets.splice(j, 1);
          break;
        }
      }
    }

    // colisão nave x asteroide
    for (const a of asteroids) {
      if (Math.hypot(a.x - ship.x, a.y - ship.y) < a.r + ship.r * 0.6) {
        lives -= 1;
        updateHud();
        if (lives <= 0) {
          endGame();
        } else {
          ship = newShip();
        }
        break;
      }
    }

    if (asteroids.length === 0) resetLevel(5);
  }

  function drawShip() {
    ctx.save();
    ctx.translate(ship.x, ship.y);
    ctx.rotate(ship.angle);
    ctx.strokeStyle = "#ffe497";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(ship.r, 0);
    ctx.lineTo(-ship.r * 0.8, ship.r * 0.7);
    ctx.lineTo(-ship.r * 0.4, 0);
    ctx.lineTo(-ship.r * 0.8, -ship.r * 0.7);
    ctx.closePath();
    ctx.stroke();
    if (ship.thrusting) {
      ctx.strokeStyle = "#f0c62a";
      ctx.beginPath();
      ctx.moveTo(-ship.r * 0.4, 0);
      ctx.lineTo(-ship.r * 1.4, 0);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawAsteroid(a) {
    ctx.save();
    ctx.translate(a.x, a.y);
    ctx.rotate(a.angle);
    ctx.strokeStyle = "#b0cdbd";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    a.offsets.forEach((off, i) => {
      const ang = (i / a.offsets.length) * Math.PI * 2;
      const px = Math.cos(ang) * a.r * off;
      const py = Math.sin(ang) * a.r * off;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  function draw() {
    ctx.fillStyle = "#0a0e14";
    ctx.fillRect(0, 0, W, H);
    drawShip();
    asteroids.forEach(drawAsteroid);
    ctx.fillStyle = "#ffe497";
    bullets.forEach((b) => ctx.fillRect(b.x - 1, b.y - 1, 2, 2));
  }

  let isAsteroidsVisible = true;
  let asteroidsRaf = 0;

  function loop() {
    asteroidsRaf = 0;
    if (!running || !isAsteroidsVisible) return;
    update();
    draw();
    asteroidsRaf = requestAnimationFrame(loop);
  }

  function resumeAsteroids() {
    if (running && isAsteroidsVisible && !asteroidsRaf) {
      asteroidsRaf = requestAnimationFrame(loop);
    }
  }

  if ("IntersectionObserver" in window && canvas) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isAsteroidsVisible = entry.isIntersecting;
        if (isAsteroidsVisible) resumeAsteroids();
      });
    }, { threshold: 0.05 });
    observer.observe(canvas);
  }

  keys = { left: false, right: false, thrust: false };

  function bindHoldable(el, key) {
    if (!el) return;
    const set = (v) => (keys[key] = v);
    el.addEventListener("pointerdown", () => set(true));
    el.addEventListener("pointerup", () => set(false));
    el.addEventListener("pointerleave", () => set(false));
  }
  bindHoldable(document.getElementById("ctrl-left"), "left");
  bindHoldable(document.getElementById("ctrl-right"), "right");
  bindHoldable(document.getElementById("ctrl-thrust"), "thrust");
  document.getElementById("ctrl-fire")?.addEventListener("click", () => running && shoot());

  window.addEventListener("keydown", (e) => {
    if (!running) return;
    if (e.key === "ArrowLeft" || e.key === "a") keys.left = true;
    if (e.key === "ArrowRight" || e.key === "d") keys.right = true;
    if (e.key === "ArrowUp" || e.key === "w") keys.thrust = true;
    if (e.key === " ") { e.preventDefault(); shoot(); }
  });
  window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft" || e.key === "a") keys.left = false;
    if (e.key === "ArrowRight" || e.key === "d") keys.right = false;
    if (e.key === "ArrowUp" || e.key === "w") keys.thrust = false;
  });

  startBtn?.addEventListener("click", startGame);

  // Tela estática de espera antes do primeiro "Iniciar"
  ship = newShip();
  bullets = [];
  resetLevel(4);
  draw();
})();

/* ===================== 2. PONG ===================== */
(function () {
  "use strict";
  const canvas = document.getElementById("pong-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const scorePlayerEl = document.getElementById("pong-score-player");
  const scoreCpuEl = document.getElementById("pong-score-cpu");
  const resetBtn = document.getElementById("pong-reset-btn");

  const W = canvas.width;
  const H = canvas.height;
  const PADDLE_H = 70;
  const PADDLE_W = 10;

  let player, cpu, ball, scorePlayer, scoreCpu;

  function reset() {
    player = { y: H / 2 - PADDLE_H / 2 };
    cpu = { y: H / 2 - PADDLE_H / 2 };
    ball = { x: W / 2, y: H / 2, vx: 3.2, vy: 2 };
    scorePlayer = 0;
    scoreCpu = 0;
    updateScore();
  }

  function updateScore() {
    if (scorePlayerEl) scorePlayerEl.textContent = scorePlayer;
    if (scoreCpuEl) scoreCpuEl.textContent = scoreCpu;
  }

  function movePlayerTo(clientY) {
    const rect = canvas.getBoundingClientRect();
    const scale = H / rect.height;
    const y = (clientY - rect.top) * scale - PADDLE_H / 2;
    player.y = Math.max(0, Math.min(H - PADDLE_H, y));
  }

  canvas.addEventListener("pointermove", (e) => movePlayerTo(e.clientY));

  const keys = { up: false, down: false };
  window.addEventListener("keydown", (e) => {
    if (e.key === "w" || e.key === "ArrowUp") keys.up = true;
    if (e.key === "s" || e.key === "ArrowDown") keys.down = true;
  });
  window.addEventListener("keyup", (e) => {
    if (e.key === "w" || e.key === "ArrowUp") keys.up = false;
    if (e.key === "s" || e.key === "ArrowDown") keys.down = false;
  });

  function update() {
    if (keys.up) player.y -= 4.5;
    if (keys.down) player.y += 4.5;
    player.y = Math.max(0, Math.min(H - PADDLE_H, player.y));

    // CPU segue a bola com atraso (mais fácil de vencer)
    const cpuCenter = cpu.y + PADDLE_H / 2;
    if (cpuCenter < ball.y - 12) cpu.y += 2.6;
    else if (cpuCenter > ball.y + 12) cpu.y -= 2.6;
    cpu.y = Math.max(0, Math.min(H - PADDLE_H, cpu.y));

    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.y < 4 || ball.y > H - 4) ball.vy *= -1;

    // colisão com o jogador (esquerda)
    if (ball.x < PADDLE_W + 6 && ball.y > player.y && ball.y < player.y + PADDLE_H) {
      ball.vx = Math.abs(ball.vx) * 1.04;
      ball.vy += (ball.y - (player.y + PADDLE_H / 2)) * 0.08;
    }
    // colisão com a CPU (direita)
    if (ball.x > W - PADDLE_W - 6 && ball.y > cpu.y && ball.y < cpu.y + PADDLE_H) {
      ball.vx = -Math.abs(ball.vx) * 1.04;
      ball.vy += (ball.y - (cpu.y + PADDLE_H / 2)) * 0.08;
    }

    if (ball.x < 0) {
      scoreCpu += 1;
      updateScore();
      Object.assign(ball, { x: W / 2, y: H / 2, vx: 3.2, vy: 2 });
    }
    if (ball.x > W) {
      scorePlayer += 1;
      updateScore();
      Object.assign(ball, { x: W / 2, y: H / 2, vx: -3.2, vy: -2 });
    }
  }

  function draw() {
    ctx.fillStyle = "#050807";
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = "rgba(176,205,189,0.35)";
    ctx.setLineDash([6, 8]);
    ctx.beginPath();
    ctx.moveTo(W / 2, 0);
    ctx.lineTo(W / 2, H);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = "#ffe497";
    ctx.fillRect(4, player.y, PADDLE_W, PADDLE_H);
    ctx.fillRect(W - PADDLE_W - 4, cpu.y, PADDLE_W, PADDLE_H);
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  let isPongVisible = true;
  let pongRaf = 0;

  function loop() {
    pongRaf = 0;
    if (!isPongVisible) return;
    update();
    draw();
    pongRaf = requestAnimationFrame(loop);
  }

  function resumePong() {
    if (isPongVisible && !pongRaf) {
      pongRaf = requestAnimationFrame(loop);
    }
  }

  if ("IntersectionObserver" in window && canvas) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isPongVisible = entry.isIntersecting;
        if (isPongVisible) resumePong();
      });
    }, { threshold: 0.05 });
    observer.observe(canvas);
  }

  resetBtn?.addEventListener("click", reset);
  reset();
  loop();
})();




/* ===================== 3. HERO SECTION (BLOCO 2) ===================== */
(function () {
  "use strict";

  /* ---------------------------------------------------------
     1. Texto Máquina de Escrever (MS-DOS boot)
     Frase: C:\> LOADING RETROARCHIVE.EXE... [OK]
     --------------------------------------------------------- */
  function initTypewriter() {
    const container = document.getElementById("hero-typewriter");
    if (!container) return;

    const textSpan = container.querySelector(".typewriter-text");
    if (!textSpan) return;

    const phrase = "C:\\> LOADING RETROARCHIVE.EXE... [OK]";
    let index = 0;
    textSpan.textContent = "";

    function typeNextChar() {
      if (index < phrase.length) {
        textSpan.textContent += phrase.charAt(index);
        const char = phrase.charAt(index);
        index++;

        // Cadência de digitação mecânica retro
        let delay = 45 + Math.random() * 30;
        if (char === ">") delay = 260;
        else if (char === ".") delay = 160;
        else if (char === " ") delay = 80;

        setTimeout(typeNextChar, delay);
      }
    }

    setTimeout(typeNextChar, 300);
  }

  /* ---------------------------------------------------------
     2. Background Interativo Wireframe 3D (Synthwave/Tron)
     Grade perspectiva em loop infinito + parallax suave do mouse
     --------------------------------------------------------- */
  function initHeroWireframe() {
    const canvas = document.getElementById("hero-bg");
    const heroSection = document.querySelector(".hero");
    if (!canvas || !heroSection) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;

    function resize() {
      W = canvas.width = heroSection.clientWidth;
      H = canvas.height = heroSection.clientHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Parallax do mouse
    let targetPx = 0;
    let targetPy = 0;
    let currentPx = 0;
    let currentPy = 0;

    heroSection.addEventListener("mousemove", (e) => {
      const rect = heroSection.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      targetPx = relX * 60; // deslocamento horizontal do ponto de fuga
      targetPy = relY * 25; // inclinação vertical suave
    });

    heroSection.addEventListener("mouseleave", () => {
      targetPx = 0;
      targetPy = 0;
    });

    // Animação da grade 3D
    let gridOffset = 0;
    const speed = 0.0035;
    const numHorizontalLines = 16;
    const verticalLineSpacing = 70;

    function render() {
      ctx.clearRect(0, 0, W, H);

      // Suavização do parallax por interpolação (lerp)
      currentPx += (targetPx - currentPx) * 0.05;
      currentPy += (targetPy - currentPy) * 0.05;

      const vpX = W * 0.5 + currentPx;
      const vpY = H * 0.22 + currentPy;

      // Brilho difuso do horizonte retro
      const horizonGlow = ctx.createLinearGradient(0, vpY - 30, 0, vpY + 50);
      horizonGlow.addColorStop(0, "rgba(0, 255, 204, 0)");
      horizonGlow.addColorStop(0.5, "rgba(0, 255, 204, 0.12)");
      horizonGlow.addColorStop(1, "rgba(0, 255, 204, 0)");
      ctx.fillStyle = horizonGlow;
      ctx.fillRect(0, vpY - 30, W, 80);

      // Linha do horizonte
      ctx.beginPath();
      ctx.strokeStyle = "rgba(0, 255, 204, 0.4)";
      ctx.lineWidth = 1;
      ctx.moveTo(0, vpY);
      ctx.lineTo(W, vpY);
      ctx.stroke();

      // Linhas radiais (perspectiva em profundidade)
      ctx.lineWidth = 1;
      const baseSpan = W * 1.6;
      for (let x = -baseSpan; x <= W + baseSpan; x += verticalLineSpacing) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(0, 255, 204, 0.22)";
        ctx.moveTo(vpX, vpY);
        ctx.lineTo(x + currentPx * 1.6, H);
        ctx.stroke();
      }

      // Linhas horizontais com movimento para frente
      gridOffset = (gridOffset + speed) % 1;

      for (let i = 0; i <= numHorizontalLines; i++) {
        const p = ((i + gridOffset) % numHorizontalLines) / numHorizontalLines;
        if (p <= 0.01) continue;

        const lineY = vpY + (H - vpY) * Math.pow(p, 2.3);
        const alpha = Math.min(Math.pow(p, 1.4) * 0.45, 0.4);

        ctx.beginPath();
        ctx.strokeStyle = "rgba(0, 255, 204, " + alpha + ")";
        ctx.moveTo(0, lineY);
        ctx.lineTo(W, lineY);
        ctx.stroke();
      }

      // Transição suave no rodapé da hero
      const bottomFade = ctx.createLinearGradient(0, H - 70, 0, H);
      bottomFade.addColorStop(0, "rgba(16, 20, 26, 0)");
      bottomFade.addColorStop(1, "#10141a");
      ctx.fillStyle = bottomFade;
      ctx.fillRect(0, H - 70, W, 70);

      wireframeRaf = 0;
      if (isWireframeVisible) {
        wireframeRaf = requestAnimationFrame(render);
      }
    }

    let isWireframeVisible = true;
    let wireframeRaf = 0;

    function resumeWireframe() {
      if (isWireframeVisible && !wireframeRaf) {
        wireframeRaf = requestAnimationFrame(render);
      }
    }

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          isWireframeVisible = entry.isIntersecting;
          if (isWireframeVisible) resumeWireframe();
        });
      }, { threshold: 0.05 });
      observer.observe(heroSection);
    }

    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initTypewriter();
      initHeroWireframe();
    });
  } else {
    initTypewriter();
    initHeroWireframe();
  }
})();


/* ===================== 4. JORNADA DO HARDWARE (BLOCO 3) ===================== */
(function () {
  "use strict";

  // 1. Card 1 (Laboratório de Áudio) - Web Audio API 8-bit Beep
  const cardAudio = document.getElementById("card-audio");
  let audioCtx = null;

  function play8BitBeep() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioCtx) {
        audioCtx = new AudioCtx();
      }
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }

      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc.type = "square"; // Som chiptune característico de onda quadrada
      // Salto clássico de frequência 8-bit (440Hz -> 880Hz)
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.08);

      // Envelope de volume suave para evitar estalo no áudio
      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);

      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.2);
    } catch (err) {
      console.warn("Web Audio API bloqueada ou indisponível:", err);
    }
  }

  if (cardAudio) {
    cardAudio.addEventListener("mouseenter", play8BitBeep);
  }

  // 3. Card 3 (Linha do Tempo) - Partículas "Poeira Estelar" no mousemove
  const cardTimeline = document.getElementById("card-timeline");
  const stage = document.getElementById("timeline-particles");

  if (cardTimeline && stage) {
    let lastParticle = 0;
    const colors = ["#00ffcc", "#ffe497", "#f0c62a", "#b0cdbd", "#ffffff"];

    cardTimeline.addEventListener("mousemove", (e) => {
      const now = performance.now();
      if (now - lastParticle < 28) return; // Limita frequência para garantir 60fps
      lastParticle = now;

      const rect = cardTimeline.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const p = document.createElement("div");
      p.className = "stardust-particle";

      const size = Math.floor(Math.random() * 4) + 3;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const jitterX = (Math.random() - 0.5) * 12;
      const jitterY = (Math.random() - 0.5) * 12;

      p.style.width = size + "px";
      p.style.height = size + "px";
      p.style.left = (x + jitterX) + "px";
      p.style.top = (y + jitterY) + "px";
      p.style.backgroundColor = color;
      p.style.boxShadow = "0 0 6px " + color;

      stage.appendChild(p);

      setTimeout(() => {
        p.remove();
      }, 750);
    });
  }
})();


/* ===================== 5. SALA DOS GABINETES (BLOCO 4) ===================== */
(function () {
  "use strict";

  // Esconder "INSERT COIN" no Asteroids
  const asteroidsCoin = document.getElementById("asteroids-insert-coin");
  const asteroidsBtn = document.getElementById("asteroids-start-btn");
  const asteroidsCanvas = document.getElementById("asteroids-canvas");
  const asteroidsScreen = asteroidsCanvas?.parentElement;

  function hideAsteroidsCoin() {
    if (asteroidsCoin) {
      asteroidsCoin.classList.add("is-hidden");
    }
  }

  asteroidsBtn?.addEventListener("click", hideAsteroidsCoin);
  asteroidsCanvas?.addEventListener("click", hideAsteroidsCoin);
  asteroidsCanvas?.addEventListener("pointerdown", hideAsteroidsCoin);
  asteroidsScreen?.addEventListener("click", hideAsteroidsCoin);

  // Esconder "INSERT COIN" no Pong
  const pongCoin = document.getElementById("pong-insert-coin");
  const pongCanvas = document.getElementById("pong-canvas");
  const pongBtn = document.getElementById("pong-reset-btn");

  function hidePongCoin() {
    if (pongCoin) {
      pongCoin.classList.add("is-hidden");
    }
  }

  pongCanvas?.addEventListener("click", hidePongCoin);
  pongCanvas?.addEventListener("pointerdown", hidePongCoin);
  pongCanvas?.addEventListener("pointermove", hidePongCoin, { once: true });
  pongBtn?.addEventListener("click", hidePongCoin);

  // Teclas de controle de ambos os jogos também dispensam a moeda
  window.addEventListener("keydown", (e) => {
    const gameKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "s", "a", "d", " "];
    if (gameKeys.includes(e.key)) {
      hideAsteroidsCoin();
      hidePongCoin();
    }
  });
})();
