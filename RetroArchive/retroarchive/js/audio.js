/* =========================================================
   RetroArchive — audio.js
   Jukebox chiptune real usando a Web Audio API: cada "chip"
   histórico é aproximado por um tipo de onda de oscilador e
   uma pequena sequência de notas, com osciloscópio e VU
   meter ligados a um AnalyserNode.
   ========================================================= */
(function () {
  "use strict";
  const playBtns = document.querySelectorAll("[data-chip]");
  const stopBtn = document.getElementById("jukebox-stop");
  const volumeSlider = document.getElementById("jukebox-volume");
  const statusEl = document.getElementById("jukebox-status");
  const scopeCanvas = document.getElementById("oscilloscope-canvas");
  const vuBars = document.querySelectorAll(".vu-bar");
  if (!playBtns.length || !scopeCanvas) return;

  const NOTE_FREQ = { C4: 261.6, D4: 293.7, E4: 329.6, G4: 392.0, A4: 440.0, C5: 523.3, D5: 587.3, E5: 659.3 };

  const CHIPS = {
    tia: {
      label: "Atari TIA (1977)",
      waveform: "square",
      sequence: ["C4", "E4", "G4", "C5", "G4", "E4"],
      noteMs: 180
    },
    psg: {
      label: "PSG NES/SMS (1985)",
      waveform: "square",
      sequence: ["E4", "G4", "A4", "C5", "A4", "G4", "E4", "D4"],
      noteMs: 140
    },
    fm: {
      label: "FM Synth Mega Drive (1988)",
      waveform: "sawtooth",
      sequence: ["A4", "C5", "E5", "D5", "C5", "A4"],
      noteMs: 200
    }
  };

  let ctx, analyser, masterGain, timer, activeOsc = [];

  function ensureContext() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = ctx.createGain();
      masterGain.gain.value = volumeSlider ? volumeSlider.value / 100 : 0.5;
      analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      masterGain.connect(analyser);
      analyser.connect(ctx.destination);
    }
    if (ctx.state === "suspended") ctx.resume();
  }

  function stopAll() {
    clearInterval(timer);
    activeOsc.forEach((o) => {
      try { o.stop(); } catch (e) { /* já parado */ }
    });
    activeOsc = [];
    if (statusEl) statusEl.textContent = "PARADO";
    playBtns.forEach((b) => b.classList.remove("is-active"));
  }

  function playNote(freq, waveform, durationMs) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = waveform;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.22, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationMs / 1000);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start();
    osc.stop(ctx.currentTime + durationMs / 1000 + 0.02);
    activeOsc.push(osc);
    osc.addEventListener("ended", () => {
      activeOsc = activeOsc.filter((o) => o !== osc);
    });
  }

  function playChip(key) {
    ensureContext();
    stopAll();
    const chip = CHIPS[key];
    if (!chip) return;
    if (statusEl) statusEl.textContent = `TOCANDO: ${chip.label}`;
    playBtns.forEach((b) => b.classList.toggle("is-active", b.dataset.chip === key));

    let step = 0;
    playNote(NOTE_FREQ[chip.sequence[0]], chip.waveform, chip.noteMs);
    timer = setInterval(() => {
      step = (step + 1) % chip.sequence.length;
      playNote(NOTE_FREQ[chip.sequence[step]], chip.waveform, chip.noteMs);
    }, chip.noteMs);
  }

  playBtns.forEach((btn) => {
    btn.addEventListener("click", () => playChip(btn.dataset.chip));
  });

  stopBtn?.addEventListener("click", stopAll);

  volumeSlider?.addEventListener("input", (e) => {
    if (masterGain) masterGain.gain.value = e.target.value / 100;
  });

  /* ---- Visualização: osciloscópio + VU ---- */
  const sctx = scopeCanvas.getContext("2d");
  const timeData = new Uint8Array(512);

  function drawScope() {
    requestAnimationFrame(drawScope);
    sctx.fillStyle = "#050807";
    sctx.fillRect(0, 0, scopeCanvas.width, scopeCanvas.height);

    if (!analyser) {
      sctx.strokeStyle = "rgba(176,205,189,0.3)";
      sctx.beginPath();
      sctx.moveTo(0, scopeCanvas.height / 2);
      sctx.lineTo(scopeCanvas.width, scopeCanvas.height / 2);
      sctx.stroke();
      vuBars.forEach((bar) => (bar.style.opacity = 0.15));
      return;
    }

    analyser.getByteTimeDomainData(timeData);
    sctx.strokeStyle = "#f0c62a";
    sctx.lineWidth = 2;
    sctx.beginPath();
    const step = scopeCanvas.width / timeData.length;
    let sumSquares = 0;
    timeData.forEach((v, i) => {
      const y = (v / 255) * scopeCanvas.height;
      const centered = (v - 128) / 128;
      sumSquares += centered * centered;
      i === 0 ? sctx.moveTo(i * step, y) : sctx.lineTo(i * step, y);
    });
    sctx.stroke();

    const rms = Math.sqrt(sumSquares / timeData.length);
    const litBars = Math.round(rms * vuBars.length * 3.2);
    vuBars.forEach((bar, i) => (bar.style.opacity = i < litBars ? 1 : 0.15));
  }
  drawScope();
})();
