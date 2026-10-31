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

  function loop() {
    if (!running) return;
    update();
    draw();
    requestAnimationFrame(loop);
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

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  resetBtn?.addEventListener("click", reset);
  reset();
  loop();
})();
