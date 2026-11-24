// ===== 16-bit style DAY music, generated live with the Web Audio API =====
// An original, warm and melodic loop: a round lead, soft chord pad, gentle arpeggio, bass and light drums
// in a cosy room reverb. window.BGM_DAY.play(ctx) starts it (and picks up where it left off),
// window.BGM_DAY.stop() fades it out. The night (rock) music is in music-night.js.
(() => {
  const BPM = 88;
  const STEP = 60 / BPM / 4;          // one 16th note, in seconds
  const VOLUME = 0.2;                // overall music level (sound effects are separate)

  const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
  // note names -> MIDI numbers, e.g. "C5" -> 72, "F#4" -> 66
  const N = (s) => {
    const m = /^([A-G])(#|b)?(\d)$/.exec(s);
    const base = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[m[1]] + (m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0);
    return base + (+m[3] + 1) * 12;
  };

  // ---- the song: 16 bars, 16 steps each. Melody as "note:steps" ("-" = rest) ----
  const MELODY = [
    // A section
    "E5:2 G5:2 C6:4 B5:2 G5:2 E5:4", "D5:2 G5:2 B5:4 A5:2 G5:2 D5:4",
    "C5:2 E5:2 A5:4 G5:2 E5:2 C5:2 E5:2", "F5:4 E5:2 D5:2 C5:8",
    "E5:2 G5:2 C6:4 D6:2 C6:2 B5:2 G5:2", "B5:4 A5:2 G5:2 D5:8",
    "A5:2 G5:2 F5:2 E5:2 D5:4 F5:4", "E5:4 D5:4 C5:8",
    // B section
    "A5:4 C6:4 A5:2 G5:2 F5:4", "G5:4 B5:4 D6:4 B5:4",
    "G5:2 E5:2 B4:2 E5:2 G5:4 B5:4", "A5:8 C6:4 B5:4",
    "A5:2 G5:2 F5:2 A5:2 C6:4 A5:4", "B5:2 A5:2 G5:2 B5:2 D6:8",
    "E6:4 D6:2 C6:2 G5:4 E5:4", "C6:12 -:4",
  ].map((bar) => bar.split(" ").map((t) => { const [n, l] = t.split(":"); return [n === "-" ? null : N(n), +l]; }));

  const CHORDS = { C: ["C3", "C5 E5 G5"], G: ["G2", "B4 D5 G5"], Am: ["A2", "A4 C5 E5"], F: ["F2", "A4 C5 F5"], Em: ["E2", "G4 B4 E5"] };
  const PROG = ["C", "G", "Am", "F", "C", "G", "F", "C", "F", "G", "Em", "Am", "F", "G", "C", "C"];
  const BARS = PROG.map((name, i) => ({ root: N(CHORDS[name][0]), tones: CHORDS[name][1].split(" ").map(N), melody: MELODY[i] }));

  let ctx, out, timer, nextTime = 0, step = 0, noise, pulse50, pulse12;

  // ---- instruments ----
  function makeBus(c) {
    const master = c.createGain(); master.gain.value = 0;
    const tone = c.createBiquadFilter(); tone.type = "lowpass"; tone.frequency.value = 3400; // warm and soft, like an SNES DAC
    const dry = c.createGain(); dry.gain.value = 1;
    const wet = c.createGain(); wet.gain.value = 0.3;
    const verb = c.createConvolver();
    const len = Math.floor(c.sampleRate * 1.6), ir = c.createBuffer(2, len, c.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = ir.getChannelData(ch);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    }
    verb.buffer = ir;
    tone.connect(dry).connect(master);
    tone.connect(verb).connect(wet).connect(master);
    master.connect(c.destination);
    return { input: tone, master };
  }
  function pulseWave(c, duty) { // band-limited pulse wave (the classic chiptune square with a narrow duty)
    const n = 32, re = new Float32Array(n), im = new Float32Array(n);
    for (let k = 1; k < n; k++) im[k] = (2 / (k * Math.PI)) * Math.sin(k * Math.PI * duty);
    return c.createPeriodicWave(re, im);
  }
  function voice(t, midi, dur, wave, vol, opts = {}) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    if (typeof wave === "string") o.type = wave; else o.setPeriodicWave(wave);
    o.frequency.setValueAtTime(mtof(midi), t);
    if (opts.vibrato) { // delayed vibrato on long notes
      const lfo = ctx.createOscillator(), lg = ctx.createGain();
      lfo.frequency.value = 5.5; lg.gain.setValueAtTime(0, t); lg.gain.linearRampToValueAtTime(mtof(midi) * 0.006, t + Math.min(dur, 0.5));
      lfo.connect(lg).connect(o.frequency); lfo.start(t); lfo.stop(t + dur + 0.1);
    }
    const a = opts.attack || 0.012, r = opts.release || 0.1;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + a);
    g.gain.setTargetAtTime(vol * (opts.sustain ?? 0.7), t + a, dur * 0.4);
    g.gain.setTargetAtTime(0.0001, t + dur, r / 3);
    o.connect(g).connect(out.input);
    o.start(t); o.stop(t + dur + r + 0.05);
  }
  function drum(t, kind) {
    if (kind === "kick") {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "sine"; o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(42, t + 0.12);
      g.gain.setValueAtTime(0.55, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
      o.connect(g).connect(out.input); o.start(t); o.stop(t + 0.2);
      return;
    }
    const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = noise;
    const hat = kind === "hat";
    f.type = hat ? "highpass" : "bandpass"; f.frequency.value = hat ? 7000 : 1800;
    const len = hat ? 0.04 : 0.14;
    g.gain.setValueAtTime(hat ? 0.05 : 0.16, t); g.gain.exponentialRampToValueAtTime(0.001, t + len);
    s.connect(f).connect(g).connect(out.input); s.start(t); s.stop(t + len + 0.02);
  }

  // ---- sequencer: schedule a little ahead so timing stays tight ----
  function scheduleStep(i, t) {
    const bar = BARS[Math.floor(i / 16) % BARS.length], s = i % 16, secondHalf = Math.floor(i / 16) % 16 >= 8;
    // melody
    let pos = 0;
    for (const [m, len] of bar.melody) {
      if (pos === s && m != null) {
        // round lead: a 50% pulse doubled softly one octave down with a triangle
        voice(t, m, len * STEP * 0.95, pulse50, 0.11, { vibrato: len >= 4, sustain: 0.65, attack: 0.02, release: 0.18 });
        voice(t, m - 12, len * STEP * 0.95, "triangle", 0.07, { sustain: 0.7, attack: 0.02, release: 0.18 });
      }
      pos += len;
    }
    // warm pad: the whole chord held softly through the bar
    if (s === 0) bar.tones.forEach((m) => voice(t, m - 12, STEP * 15.5, "triangle", 0.035, { attack: 0.35, sustain: 0.9, release: 0.4 }));
    // arpeggio: chord tones going up and down, on 8th notes, quiet
    const arp = [0, 1, 2, 1];
    if (s % 2 === 0) voice(t, bar.tones[arp[(s / 2) % 4]], STEP * 1.6, pulse12, 0.03, { release: 0.06, sustain: 0.5 });
    // bass
    const B = { 0: [0, 3], 6: [0, 2], 8: [7, 3], 12: [12, 2], 14: [7, 2] }[s];
    if (B) voice(t, bar.root + B[0], B[1] * STEP * 0.85, "triangle", 0.32, { release: 0.04, sustain: 0.8 });
    // drums: lighter in the first half, a fuller beat in the second half
    if (s === 0 || (secondHalf && s === 8) || (!secondHalf && s === 10)) drum(t, "kick");
    if (secondHalf && (s === 4 || s === 12)) drum(t, "snare");
    if (s % 4 === 2) drum(t, "hat");
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
      pulse50 = pulseWave(c, 0.5); pulse12 = pulseWave(c, 0.125);
    }
    if (c.state === "suspended") c.resume();
    out.master.gain.cancelScheduledValues(c.currentTime);
    out.master.gain.setTargetAtTime(VOLUME, c.currentTime, 0.4);
    nextTime = c.currentTime + 0.05; // keep `step`: carry on from where it stopped
    timer = setInterval(tick, 25); tick();
  }
  function stop() {
    if (!timer) return;
    clearInterval(timer); timer = null;
    out.master.gain.cancelScheduledValues(ctx.currentTime);
    out.master.gain.setTargetAtTime(0, ctx.currentTime, 0.15);
  }
  window.BGM_DAY = { play, stop, get playing() { return !!timer; } };
})();
