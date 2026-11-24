// ===== 16-bit hard-rock background music, generated live with the Web Audio API =====
// An ORIGINAL track ("Quest Accepted"): galloping power-chord riff, punchy bass, rock drums,
// a soaring lead and a big "HEY!" bridge. 16 bars (about 29 s) that loop.
// Plays while the title screen is at NIGHT. window.BGM_NIGHT.play(ctx) starts it (always from the
// full-band part, bar 5), window.BGM_NIGHT.stop() fades it out. The day music is in music-day.js.
(() => {
  const BPM = 132;
  const STEP = 60 / BPM / 4;          // one 16th note, in seconds
  const VOLUME = 0.2;                 // overall music level (sound effects are separate)

  const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
  const N = (s) => { // "E5" -> MIDI 76, "F#5" -> 78
    const m = /^([A-G])(#|b)?(\d)$/.exec(s);
    const base = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[m[1]] + (m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0);
    return base + (+m[3] + 1) * 12;
  };

  // ---- the song: 16 bars x 16 steps ----
  // bars 1-4 intro (riff builds up) · 5-12 verse with lead · 13-16 bridge with "HEY!" shouts and a drum fill
  const ROOTS = ["E2", "E2", "G2", "A2", "E2", "E2", "G2", "A2", "E2", "E2", "C2", "D2", "C2", "D2", "B1", "B1"].map(N);
  const LEAD = [
    "-:16", "-:16", "-:16", "-:8 B5:2 D6:2 E6:4",
    "E5:4 G5:2 A5:2 B5:6 A5:2", "G5:2 E5:2 D5:2 E5:10",
    "G5:4 A5:2 B5:2 D6:6 B5:2", "A5:4 G5:2 E5:2 A5:8",
    "B5:2 B5:2 D6:2 E6:6 D6:2 B5:2", "A5:2 G5:2 E5:4 G5:8",
    "C6:4 B5:2 A5:2 G5:4 E5:4", "F#5:4 G5:2 A5:2 D6:8",
    "E6:12 D6:2 C6:2", "D6:12 E6:2 F#6:2",
    "D#6:6 B5:2 F#5:4 A5:4", "B5:16",
  ].map((bar) => bar.split(" ").map((t) => { const [n, l] = t.split(":"); return [n === "-" ? null : N(n), +l]; }));

  let ctx, out, timer, nextTime = 0, step = 0, noise, pulse25, pulse50;

  // ---- mixer: guitar bus with overdrive, everything through a small room ----
  function makeBus(c) {
    const master = c.createGain(); master.gain.value = 0;
    const mix = c.createBiquadFilter(); mix.type = "lowpass"; mix.frequency.value = 6500;
    const verb = c.createConvolver(), wet = c.createGain(); wet.gain.value = 0.12;
    const len = Math.floor(c.sampleRate * 1.1), ir = c.createBuffer(2, len, c.sampleRate);
    for (let ch = 0; ch < 2; ch++) { const d = ir.getChannelData(ch); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 4); }
    verb.buffer = ir;
    mix.connect(master); mix.connect(verb).connect(wet).connect(master);
    master.connect(c.destination);
    // overdriven guitar: soft-clip waveshaper, then a cabinet-like low-pass
    const drive = c.createWaveShaper(), curve = new Float32Array(1024);
    for (let i = 0; i < 1024; i++) { const x = i / 511.5 - 1; curve[i] = Math.tanh(x * 6) * 0.8; }
    drive.curve = curve; drive.oversample = "4x";
    const cab = c.createBiquadFilter(); cab.type = "lowpass"; cab.frequency.value = 2600; cab.Q.value = 0.9;
    const gtrIn = c.createGain(); gtrIn.gain.value = 1.6;
    gtrIn.connect(drive).connect(cab).connect(mix);
    return { input: mix, guitar: gtrIn, master };
  }
  function pulseWave(c, duty) {
    const n = 32, re = new Float32Array(n), im = new Float32Array(n);
    for (let k = 1; k < n; k++) im[k] = (2 / (k * Math.PI)) * Math.sin(k * Math.PI * duty);
    return c.createPeriodicWave(re, im);
  }
  function voice(t, midi, dur, wave, vol, dest, opts = {}) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    if (typeof wave === "string") o.type = wave; else o.setPeriodicWave(wave);
    o.frequency.setValueAtTime(mtof(midi), t);
    if (opts.detune) o.detune.value = opts.detune;
    if (opts.slide) { o.frequency.setValueAtTime(mtof(midi - 2), t); o.frequency.exponentialRampToValueAtTime(mtof(midi), t + 0.06); }
    if (opts.vibrato) {
      const lfo = ctx.createOscillator(), lg = ctx.createGain();
      lfo.frequency.value = 6; lg.gain.setValueAtTime(0, t); lg.gain.linearRampToValueAtTime(mtof(midi) * 0.012, t + Math.min(dur, 0.4));
      lfo.connect(lg).connect(o.frequency); lfo.start(t); lfo.stop(t + dur + 0.1);
    }
    const r = opts.release || 0.05;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.005);
    g.gain.setTargetAtTime(vol * (opts.sustain ?? 0.7), t + 0.005, dur * 0.35);
    g.gain.setTargetAtTime(0.0001, t + dur, r / 3);
    o.connect(g).connect(dest);
    o.start(t); o.stop(t + dur + r + 0.05);
  }
  // power chord = root + fifth + octave, slightly detuned for width
  function power(t, root, dur, vol) {
    voice(t, root, dur, "sawtooth", vol, out.guitar, { detune: -6, sustain: 0.8 });
    voice(t, root + 7, dur, "sawtooth", vol * 0.8, out.guitar, { detune: 5, sustain: 0.8 });
    voice(t, root + 12, dur, pulse25, vol * 0.5, out.guitar, { sustain: 0.8 });
  }
  function noiseHit(t, type, freq, len, vol, q = 1) {
    const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = noise; f.type = type; f.frequency.value = freq; f.Q.value = q;
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + len);
    s.connect(f).connect(g).connect(out.input); s.start(t, Math.random() * 0.5); s.stop(t + len + 0.02);
  }
  function drum(t, kind) {
    if (kind === "kick") {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "sine"; o.frequency.setValueAtTime(160, t); o.frequency.exponentialRampToValueAtTime(45, t + 0.1);
      g.gain.setValueAtTime(0.9, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
      o.connect(g).connect(out.input); o.start(t); o.stop(t + 0.22);
      noiseHit(t, "lowpass", 2500, 0.015, 0.25);
    } else if (kind === "snare") {
      noiseHit(t, "bandpass", 1900, 0.16, 0.55, 0.7);
      voice(t, 50, 0.05, "triangle", 0.25, out.input, { release: 0.02 });
    } else if (kind === "hat") noiseHit(t, "highpass", 8000, 0.035, 0.12);
    else if (kind === "crash") noiseHit(t, "highpass", 5000, 1.1, 0.22);
  }
  // "HEY!": a crowd-like shout = vowel-filtered noise plus a quick falling buzz
  function hey(t) {
    noiseHit(t, "bandpass", 850, 0.22, 0.6, 3);
    noiseHit(t, "bandpass", 1500, 0.18, 0.35, 4);
    const o = ctx.createOscillator(), g = ctx.createGain(), f = ctx.createBiquadFilter();
    o.type = "sawtooth"; o.frequency.setValueAtTime(300, t); o.frequency.exponentialRampToValueAtTime(190, t + 0.2);
    f.type = "bandpass"; f.frequency.value = 900; f.Q.value = 2;
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.35, t + 0.01); g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    o.connect(f).connect(g).connect(out.input); o.start(t); o.stop(t + 0.25);
  }

  // ---- sequencer ----
  function scheduleStep(i, t) {
    const b = Math.floor(i / 16) % 16, s = i % 16, root = ROOTS[b];
    const intro = b < 4, bridge = b >= 12;
    // guitar riff: a gallop (long-short-short) on every beat; the bridge rings out with big held chords
    if (bridge) {
      if (s === 0 || s === 8) power(t, root, STEP * 7.5, 0.16);
      if (s === 6 || s === 14) power(t, root, STEP * 0.8, 0.12);
    } else if (s % 4 === 0 || s % 4 === 2 || s % 4 === 3) {
      const accent = s === 0 || s === 8;
      // turnaround: climb to the next chord on the last beat of every 2nd bar
      const climb = b % 2 === 1 && s >= 12 ? [0, 0, 3, 5][s - 12] : 0;
      power(t, root + climb, STEP * (s % 4 === 0 ? 1.7 : 0.75), (intro && b < 2 ? 0.1 : 0.13) * (accent ? 1.15 : 1));
    }
    // bass: driving 8ths on the root
    if (!(intro && b < 2) && s % 2 === 0) voice(t, root, STEP * 1.6, pulse50, 0.22, out.input, { release: 0.03, sustain: 0.9 });
    // lead melody
    let pos = 0;
    for (const [m, len] of LEAD[b]) {
      if (pos === s && m != null) voice(t, m, len * STEP * 0.95, pulse25, 0.13, out.input, { vibrato: len >= 6, slide: len >= 6, sustain: 0.75, release: 0.1 });
      pos += len;
    }
    // drums: hats only at first, then a full rock beat, a fill to end the loop
    if (b >= 2 && s % 2 === 0) drum(t, "hat");
    if (b >= 3) {
      if (s === 0 || s === 6 || s === 8 || s === 11) drum(t, "kick");
      if (s === 4 || s === 12) drum(t, "snare");
    }
    if ((b === 4 || b === 8 || b === 12) && s === 0) drum(t, "crash");
    if (b === 15 && s >= 8) { drum(t, "snare"); if (s % 2 === 0) drum(t, "kick"); }
    // the crowd joins in
    if ((b === 12 || b === 13) && (s === 4 || s === 12)) hey(t);
  }
  function tick() {
    while (nextTime < ctx.currentTime + 0.15) {
      scheduleStep(step, nextTime);
      nextTime += STEP; step++;
    }
  }

  function play(c) {
    if (!c || timer) return;
    if (ctx !== c) {
      ctx = c; out = makeBus(c);
      noise = c.createBuffer(1, c.sampleRate, c.sampleRate);
      const d = noise.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      pulse25 = pulseWave(c, 0.25); pulse50 = pulseWave(c, 0.5);
    }
    if (c.state === "suspended") c.resume();
    out.master.gain.cancelScheduledValues(c.currentTime);
    out.master.gain.setTargetAtTime(VOLUME, c.currentTime, 0.3);
    nextTime = c.currentTime + 0.05; step = 4 * 16; // jump straight in at the full band
    timer = setInterval(tick, 25); tick();
  }
  function stop() {
    if (!timer) return;
    clearInterval(timer); timer = null;
    out.master.gain.cancelScheduledValues(ctx.currentTime);
    out.master.gain.setTargetAtTime(0, ctx.currentTime, 0.15);
  }
  window.BGM_NIGHT = { play, stop, get playing() { return !!timer; } };
})();
