/* =========================================================
   RetroArchive — audio.js
   Jukebox chiptune e sintetizador histórico usando a Web Audio API:
   recriação procedural de melodias clássicas e timbres de hardware
   com osciloscópio e VU meter ligados a um AnalyserNode.
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

  // Tabela completa de frequências em Hertz
  const NOTE_FREQ = {
    // Oitava 3
    C3: 130.81, Cs3: 138.59, D3: 146.83, Ds3: 155.56, E3: 164.81, F3: 174.61, Fs3: 185.00, G3: 196.00, Gs3: 207.65, A3: 220.00, As3: 233.08, B3: 246.94,
    // Oitava 4
    C4: 261.63, Cs4: 277.18, D4: 293.66, Ds4: 311.13, E4: 329.63, F4: 349.23, Fs4: 369.99, G4: 392.00, Gs4: 415.30, A4: 440.00, As4: 466.16, B4: 493.88,
    // Oitava 5
    C5: 523.25, Cs5: 554.37, D5: 587.33, Ds5: 622.25, E5: 659.25, F5: 698.46, Fs5: 739.99, G5: 783.99, Gs5: 830.61, A5: 880.00, As5: 932.33, B5: 987.77,
    // Oitava 6
    C6: 1046.50, Cs6: 1108.73, D6: 1174.66, Ds6: 1244.51, E6: 1318.51, F6: 1396.91, Fs6: 1479.98, G6: 1567.98, A6: 1760.00, B6: 1975.53
  };

  const TRACKS = {
    // --- Músicas Marcantes dos Games ---
    mario: {
      label: "Super Mario Bros (Overworld)",
      waveform: "square",
      baseMs: 115,
      sequence: [
        ["E5", 1], ["E5", 1], ["REST", 1], ["E5", 1], ["REST", 1], ["C5", 1], ["E5", 2],
        ["G5", 2], ["REST", 2], ["G4", 2], ["REST", 2],
        ["C5", 3], ["REST", 1], ["G4", 3], ["REST", 1], ["E4", 3], ["REST", 1],
        ["A4", 2], ["B4", 2], ["As4", 1], ["A4", 2],
        ["G4", 1.5], ["E5", 1.5], ["G5", 1.5], ["A5", 2], ["F5", 1], ["G5", 1],
        ["REST", 1], ["E5", 2], ["C5", 1], ["D5", 1], ["B4", 2], ["REST", 2]
      ]
    },
    pacman: {
      label: "Pac-Man (Tema de Abertura)",
      waveform: "triangle",
      baseMs: 125,
      sequence: [
        ["B4", 1], ["B5", 1], ["Fs5", 1], ["Ds5", 1], ["B5", 1], ["Fs5", 1], ["Ds5", 2],
        ["C5", 1], ["C6", 1], ["G5", 1], ["E5", 1], ["C6", 1], ["G5", 1], ["E5", 2],
        ["B4", 1], ["B5", 1], ["Fs5", 1], ["Ds5", 1], ["B5", 1], ["Fs5", 1], ["Ds5", 2],
        ["Ds5", 0.5], ["E5", 0.5], ["F5", 0.5], ["REST", 0.5],
        ["F5", 0.5], ["Fs5", 0.5], ["G5", 0.5], ["REST", 0.5],
        ["G5", 0.5], ["Gs5", 0.5], ["A5", 0.5], ["REST", 0.5],
        ["B5", 2], ["REST", 3]
      ]
    },
    megaman: {
      label: "Mega Man 2 (Dr. Wily Stage 1)",
      waveform: "square",
      baseMs: 125,
      sequence: [
        ["Ds4", 1], ["Ds4", 1], ["Fs4", 1], ["Gs4", 1], ["As4", 2], ["Gs4", 1], ["Fs4", 1],
        ["Ds4", 1], ["Ds4", 1], ["Fs4", 1], ["Gs4", 1], ["As4", 2], ["B4", 1], ["As4", 1],
        ["Gs4", 1], ["Fs4", 1], ["Gs4", 1], ["As4", 1], ["B4", 2], ["As4", 1], ["Gs4", 1],
        ["Fs4", 1], ["Ds4", 1], ["Fs4", 1], ["Gs4", 1], ["As4", 3], ["REST", 1]
      ]
    },
    sonic: {
      label: "Sonic the Hedgehog (Green Hill Zone)",
      waveform: "sawtooth",
      baseMs: 135,
      sequence: [
        ["D5", 2], ["C5", 2], ["B4", 2], ["A4", 2], ["B4", 2], ["G4", 3], ["REST", 1],
        ["D5", 2], ["C5", 2], ["B4", 2], ["A4", 2], ["B4", 2], ["G4", 3], ["REST", 1],
        ["E5", 2], ["D5", 2], ["C5", 2], ["B4", 2], ["C5", 2], ["A4", 3], ["REST", 1],
        ["D5", 2], ["C5", 2], ["B4", 2], ["A4", 2], ["B4", 4], ["REST", 2]
      ]
    },

    // --- Simulação dos Chips Históricos ---
    tia: {
      label: "Atari TIA (1977)",
      waveform: "square",
      baseMs: 180,
      sequence: [
        ["C4", 1], ["E4", 1], ["G4", 1], ["C5", 1], ["G4", 1], ["E4", 1]
      ]
    },
    psg: {
      label: "PSG NES / Master System (1985)",
      waveform: "square",
      baseMs: 140,
      sequence: [
        ["E4", 1], ["G4", 1], ["A4", 1], ["C5", 1], ["A4", 1], ["G4", 1], ["E4", 1], ["D4", 1]
      ]
    },
    fm: {
      label: "FM Synth Mega Drive (1988)",
      waveform: "sawtooth",
      baseMs: 200,
      sequence: [
        ["A4", 1], ["C5", 1], ["E5", 1], ["D5", 1], ["C5", 1], ["A4", 1]
      ]
    }
  };

  let ctx, analyser, masterGain, timer, activeOsc = [];
  let isPlaying = false;

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
    isPlaying = false;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    activeOsc.forEach((o) => {
      try { o.stop(); } catch (e) { /* já parado */ }
    });
    activeOsc = [];
    if (statusEl) statusEl.textContent = "PARADO";
    playBtns.forEach((b) => b.classList.remove("is-active"));
  }

  function playNote(freq, waveform, durationMs) {
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = waveform;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Envelope rápido característico de chiptune (ataque instantâneo e decaimento exponencial)
    const attackTime = 0.005;
    const decayTime = Math.max(0.02, (durationMs / 1000) - attackTime);
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.24, ctx.currentTime + attackTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + attackTime + decayTime);

    osc.connect(gain);
    gain.connect(masterGain);
    osc.start();
    osc.stop(ctx.currentTime + (durationMs / 1000) + 0.05);

    activeOsc.push(osc);
    osc.addEventListener("ended", () => {
      activeOsc = activeOsc.filter((o) => o !== osc);
    });
  }

  function playTrack(key) {
    ensureContext();
    stopAll();
    const track = TRACKS[key];
    if (!track) return;

    isPlaying = true;
    if (statusEl) statusEl.textContent = `TOCANDO: ${track.label}`;
    playBtns.forEach((b) => b.classList.toggle("is-active", b.dataset.chip === key));

    let stepIndex = 0;

    function scheduleNext() {
      if (!isPlaying) return;
      const item = track.sequence[stepIndex];
      const noteName = Array.isArray(item) ? item[0] : item;
      const mult = Array.isArray(item) ? item[1] : 1;
      const duration = track.baseMs * mult;

      if (noteName !== "REST" && NOTE_FREQ[noteName]) {
        playNote(NOTE_FREQ[noteName], track.waveform, duration * 0.92);
      }

      stepIndex = (stepIndex + 1) % track.sequence.length;
      timer = setTimeout(scheduleNext, duration);
    }

    scheduleNext();
  }

  playBtns.forEach((btn) => {
    btn.addEventListener("click", () => playTrack(btn.dataset.chip));
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

    if (!analyser || !isPlaying) {
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
    const litCount = Math.min(vuBars.length, Math.floor(rms * vuBars.length * 4.5));
    vuBars.forEach((bar, idx) => {
      bar.style.opacity = idx < litCount ? "1" : "0.15";
    });
  }

  drawScope();
})();
