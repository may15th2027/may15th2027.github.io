(() => {
  const CFG = window.WEDDING_CONFIG;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  };

  /* ================= SOUND (tiny 8-bit blips) ================= */
  let soundOn = store.get("sound", true);
  let actx;
  function tone(freq, dur = 0.07, type = "square", vol = 0.05, when = 0) {
    if (!soundOn) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const t = actx.currentTime + when;
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = type; o.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(actx.destination); o.start(t); o.stop(t + dur + 0.02);
    } catch {}
  }
  const sfx = {
    blip: () => tone(660, 0.05),
    select: () => { tone(523, 0.06); tone(784, 0.08, "square", 0.05, 0.06); },
    type: () => tone(880 + Math.random() * 120, 0.02, "square", 0.02),
    meow: () => { tone(700, 0.12, "triangle", 0.08); tone(520, 0.18, "triangle", 0.07, 0.1); },
    fanfare: () => [523, 659, 784, 1047, 784, 1047].forEach((f, i) => tone(f, 0.14, "square", 0.05, i * 0.12)),
    error: () => tone(160, 0.15, "sawtooth", 0.04),
  };
  const soundBtn = $("#soundBtn");
  const paintSound = () => (soundBtn.textContent = soundOn ? "♪ ON" : "♪ OFF");
  paintSound();
  soundBtn.addEventListener("click", () => { soundOn = !soundOn; store.set("sound", soundOn); paintSound(); sfx.blip(); });

  /* ================= BOOT ================= */
  const boot = $("#boot");
  function start() {
    if (boot.classList.contains("gone")) return;
    boot.classList.add("gone");
    sfx.select();
    setTimeout(() => boot.remove(), 600);
    window.removeEventListener("keydown", start);
  }
  // Skip the start screen if arriving via a deep link (e.g. #rsvp) or on return visits this session
  let seen = false;
  try { seen = sessionStorage.getItem("started") === "1"; sessionStorage.setItem("started", "1"); } catch {}
  if (seen || (location.hash && location.hash !== "#home")) boot.remove();
  else { $("#startBtn").addEventListener("click", start); window.addEventListener("keydown", start); }

  /* ================= ROUTER ================= */
  const screens = ["home", "story", "wedding", "travel", "rsvp"];
  function show(name) {
    if (!screens.includes(name)) name = "home";
    $$(".screen").forEach((s) => (s.hidden = s.dataset.screen !== name));
    $$(".topnav a").forEach((a) => a.classList.toggle("active", a.dataset.go === name));
    document.body.classList.toggle("sub", name !== "home");
    document.title = name === "home" ? "Chin-Yi & Sixuan" : `${$(`#screen-${name} h2`).textContent.replace(/^\S+\s/, "")} · Chin-Yi & Sixuan`;
    window.scrollTo({ top: 0 });
    if (name === "story") story.enter();
  }
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-go]");
    if (!a) return;
    e.preventDefault();
    sfx.blip();
    const target = "#" + a.dataset.go;
    if (location.hash !== target) history.pushState(null, "", target);
    show(a.dataset.go);
  });
  window.addEventListener("popstate", () => show(location.hash.slice(1)));
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("sub")) { history.pushState(null, "", "#home"); show("home"); }
  });

  /* ================= TITLE SCREEN ================= */
  // falling cherry blossom petals
  const petals = $(".petals");
  for (let i = 0; i < 22; i++) {
    const p = document.createElement("i");
    p.className = "petal";
    p.style.left = Math.random() * 60 + "%";
    p.style.animationDuration = 7 + Math.random() * 8 + "s";
    p.style.animationDelay = -Math.random() * 15 + "s";
    p.style.setProperty("--drift", 60 + Math.random() * 260 + "px");
    const s = 4 + Math.round(Math.random() * 2) * 2;
    p.style.width = p.style.height = s + "px";
    petals.appendChild(p);
  }
  // cat easter egg
  const catSpeech = $("#catSpeech");
  const catLines = ["Meow! Did you RSVP yet? 🐾", "Purrr... see you May 15! 💕", "*knocks your phone off the table*", "Mrrp! I'm the ring bearer. 💍"];
  let catI = 0, catT;
  $("#catBtn").addEventListener("click", () => {
    sfx.meow();
    catSpeech.textContent = catLines[catI++ % catLines.length];
    catSpeech.classList.add("show");
    clearTimeout(catT); catT = setTimeout(() => catSpeech.classList.remove("show"), 2600);
  });

  // countdown
  const target = new Date(CFG.weddingDate).getTime();
  const pad = (n) => String(n).padStart(2, "0");
  function tick() {
    let d = Math.max(0, target - Date.now()) / 1000;
    const days = Math.floor(d / 86400); d -= days * 86400;
    const h = Math.floor(d / 3600); d -= h * 3600;
    const m = Math.floor(d / 60); const s = Math.floor(d - m * 60);
    $("#cdD").textContent = days; $("#cdH").textContent = pad(h); $("#cdM").textContent = pad(m); $("#cdS").textContent = pad(s);
  }
  tick(); setInterval(tick, 1000);

  /* ================= CHARACTER CARDS ================= */
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const party = $("#party");
  (CFG.characters || []).forEach((c, i) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "char panel parchment";
    card.setAttribute("aria-pressed", "false");
    const stars = (n) => `<span class="stars" aria-label="${n} out of 5">${"★".repeat(n)}<i>${"★".repeat(5 - n)}</i></span>`;
    card.innerHTML = `
      <span class="char-tag">${esc(c.tag || "P" + (i + 1))}</span>
      <div class="char-head">
        <div class="char-portrait">${esc(c.emoji)}</div>
        <div>
          <div class="char-name">${esc(c.name.toUpperCase())}</div>
          <div class="char-class">Class: <b>${esc(c.className)}</b></div>
        </div>
      </div>
      <dl class="char-info">
        <dt>Origin</dt><dd>${esc(c.origin)}</dd>
        <dt>Special Skill</dt><dd>${esc(c.skill)}</dd>
      </dl>
      <ul class="char-stats">${c.stats.map(([k, n]) => `<li><span>${esc(k)}</span>${stars(n)}</li>`).join("")}</ul>
      <span class="char-select">▶ SELECTED!</span>`;
    card.addEventListener("click", () => {
      $$(".char", party).forEach((x) => { x.classList.toggle("picked", x === card); x.setAttribute("aria-pressed", x === card); });
      sfx.select();
    });
    party.appendChild(card);
    if (i === 0 && CFG.characters.length > 1) {
      const vs = document.createElement("div");
      vs.className = "char-vs"; vs.textContent = "♥"; vs.setAttribute("aria-hidden", "true");
      party.appendChild(vs);
    }
  });

  /* ================= STORY (RPG dialogue) ================= */
  const story = (() => {
    const list = $("#chapterList"), textEl = $("#dialogText"), who = $("#speaker"), dlg = $("#dialog");
    let unlocked = store.get("chapters", 1);
    let ch = 0, line = 0, typing = null, full = "";

    function renderList() {
      list.innerHTML = "";
      CFG.story.forEach((c, i) => {
        const li = document.createElement("li");
        const b = document.createElement("button");
        b.type = "button";
        b.disabled = i >= unlocked;
        b.className = i === ch ? "current" : "";
        b.innerHTML = i < unlocked ? `${c.emoji} ${c.title}<small>${c.subtitle}</small>` : `🔒 ${c.title}<small>Locked</small>`;
        b.addEventListener("click", () => { sfx.blip(); load(i); });
        li.appendChild(b); list.appendChild(li);
      });
    }
    function load(i) {
      ch = i; line = 0;
      const c = CFG.story[i];
      $("#sceneEmoji").textContent = c.emoji;
      $("#sceneYear").textContent = c.year;
      $("#scenePlace").textContent = c.place;
      renderList(); say();
    }
    function say() {
      const [name, txt] = CFG.story[ch].lines[line];
      who.textContent = name; full = txt; textEl.textContent = "";
      let k = 0; clearInterval(typing);
      typing = setInterval(() => {
        textEl.textContent = full.slice(0, ++k);
        if (k % 2) sfx.type();
        if (k >= full.length) { clearInterval(typing); typing = null; }
      }, 28);
    }
    function advance() {
      if (typing) { clearInterval(typing); typing = null; textEl.textContent = full; return; }
      const c = CFG.story[ch];
      if (line < c.lines.length - 1) { line++; say(); return; }
      // chapter finished
      if (ch < CFG.story.length - 1) {
        if (unlocked < ch + 2) { unlocked = ch + 2; store.set("chapters", unlocked); sfx.fanfare(); }
        load(ch + 1);
      } else {
        who.textContent = "★";
        textEl.textContent = "THE END... of the beginning! ♥\nClick to RSVP →";
        full = "__end";
      }
    }
    dlg.addEventListener("click", () => {
      if (full === "__end") { history.pushState(null, "", "#rsvp"); show("rsvp"); sfx.select(); return; }
      advance();
    });
    window.addEventListener("keydown", (e) => {
      if ($("#screen-story").hidden) return;
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); dlg.click(); }
    });
    let entered = false;
    return { enter: () => { if (!entered) { entered = true; load(0); } } };
  })();

  /* ================= TRAVEL MAP ================= */
  const pinInfo = {
    airport: "✈ <b>RDU Airport</b> — Raleigh-Durham International. ~25 min drive to Duke.",
    chapel: "⛪ <b>Duke Chapel</b> — 401 Chapel Dr, Durham. Ceremony location! <a href='https://maps.google.com/?q=Duke+Chapel' target='_blank' rel='noopener'>Directions ↗</a>",
    hotel: "🏨 <b>Hotels</b> — Room block details coming soon. Stay near campus or downtown Durham.",
    food: "🍜 <b>Eats</b> — Downtown Durham has amazing food: BBQ, ramen, biscuits, and more.",
    fun: "🌳 <b>Explore</b> — Sarah P. Duke Gardens is gorgeous in the fall. Don't miss it!",
  };
  $$(".pin").forEach((p) => p.addEventListener("click", () => {
    sfx.blip();
    $$(".pin").forEach((x) => x.classList.toggle("on", x === p));
    $("#mapInfo").innerHTML = pinInfo[p.dataset.pin];
  }));

  /* ================= RSVP ================= */
  const form = $("#rsvpForm");
  const steps = $$(".step", form);
  const prevBtn = $("#prevBtn"), nextBtn = $("#nextBtn"), submitBtn = $("#submitBtn");
  const guestsInput = form.elements.guests;
  let step = 1;

  function attending() { return form.elements.attending.value; }
  function renderGuests() {
    const n = +guestsInput.value;
    const box = $("#guestList");
    const prev = $$(".guest-row", box).map((r) => ({ n: $("input", r).value, m: $("select", r).value }));
    box.innerHTML = "";
    for (let i = 0; i < n; i++) {
      const row = document.createElement("div");
      row.className = "guest-row";
      const opts = CFG.mealOptions.map((m) => `<option>${m}</option>`).join("");
      row.innerHTML = `
        <label>${i === 0 ? "Player 1 (you)" : "Player " + (i + 1)} name
          <input data-guest-name placeholder="Full name" /></label>
        <label>Meal<select data-guest-meal>${opts}</select></label>`;
      const nameIn = $("input", row);
      nameIn.value = prev[i]?.n ?? (i === 0 ? form.elements.name.value : "");
      if (prev[i]) $("select", row).value = prev[i].m;
      box.appendChild(row);
    }
  }
  $$("[data-step-btn]", form).forEach((b) => b.addEventListener("click", () => {
    const v = Math.min(CFG.maxGuests, Math.max(1, +guestsInput.value + +b.dataset.stepBtn));
    if (v !== +guestsInput.value) { guestsInput.value = v; renderGuests(); sfx.blip(); }
  }));
  form.addEventListener("change", (e) => {
    if (e.target.name === "attending") { form.classList.toggle("no", attending() === "no"); sfx.select(); }
  });

  function validate(n) {
    const err = $(`[data-err="${n}"]`, form);
    let msg = "";
    if (n === 1) {
      if (!form.elements.name.value.trim()) msg = "Please enter your name.";
      else if (!/^\S+@\S+\.\S+$/.test(form.elements.email.value.trim())) msg = "Please enter a valid email.";
    }
    if (n === 2 && !attending()) msg = "Choose one to continue!";
    if (err) err.textContent = msg;
    if (msg) sfx.error();
    return !msg;
  }
  function go(n) {
    step = n;
    steps.forEach((s) => (s.hidden = +s.dataset.step !== n));
    prevBtn.style.visibility = n === 1 ? "hidden" : "visible";
    nextBtn.hidden = n === 4; submitBtn.hidden = n !== 4;
    $("#xpFill").style.width = n * 25 + "%";
    $("#xpText").textContent = `Step ${n}/4`;
    if (n === 3 && !$(".guest-row")) renderGuests();
    const first = $("input:not([type=radio]), textarea", steps[n - 1]);
    if (first && n !== 3) first.focus({ preventScroll: true });
  }
  nextBtn.addEventListener("click", () => { if (validate(step)) { sfx.select(); go(step + 1); } });
  prevBtn.addEventListener("click", () => { sfx.blip(); go(step - 1); });
  form.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.tagName === "INPUT" && step < 4) { e.preventDefault(); nextBtn.click(); }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validate(4)) return;
    const yes = attending() === "yes";
    const party = yes ? $$(".guest-row").map((r) => ({ name: $("input", r).value.trim(), meal: $("select", r).value })) : [];
    const data = {
      timestamp: new Date().toISOString(),
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      attending: attending(),
      guests: yes ? +guestsInput.value : 0,
      party: party.map((p, i) => `${p.name || "Guest " + (i + 1)} (${p.meal})`).join("; "),
      dietary: yes ? form.elements.dietary.value.trim() : "",
      song: yes ? form.elements.song.value.trim() : "",
      message: form.elements.message.value.trim(),
    };
    submitBtn.disabled = true; submitBtn.textContent = "Sending…";
    try {
      if (CFG.rsvpEndpoint) {
        await fetch(CFG.rsvpEndpoint, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(data) });
      } else {
        const all = store.get("rsvps-local", []); all.push(data); store.set("rsvps-local", all);
        console.info("[RSVP] No rsvpEndpoint set in config.js — saved locally only:", data);
      }
      store.set("my-rsvp", data);
      celebrate(yes, data.name);
    } catch (err) {
      $('[data-err="4"]').textContent = "Hmm, the carrier pigeon got lost. Please try again!";
      sfx.error();
    } finally {
      submitBtn.disabled = false; submitBtn.textContent = "✉ Send RSVP";
    }
  });

  function celebrate(yes, name) {
    form.hidden = true;
    $("#rsvpDone").hidden = false;
    const first = name.split(" ")[0];
    $("#doneTitle").textContent = yes ? `Quest accepted, ${first}!` : `Thank you, ${first}!`;
    $("#doneMsg").textContent = yes
      ? "Your RSVP is in. We can't wait to celebrate with you at Duke Chapel on May 15, 2027! ♥"
      : "We'll miss you dearly, but thank you for letting us know. Sending love! 💌";
    sfx.fanfare();
    const box = $("#confetti");
    const bits = yes ? ["♥", "💖", "🌸", "✨", "💍", "🎉"] : ["💌", "♥", "🌸"];
    for (let i = 0; i < 60; i++) {
      const c = document.createElement("i");
      c.textContent = bits[i % bits.length];
      c.style.left = Math.random() * 100 + "vw";
      c.style.animationDelay = Math.random() * 0.8 + "s";
      c.style.setProperty("--dx", (Math.random() - 0.5) * 300 + "px");
      box.appendChild(c);
      setTimeout(() => c.remove(), 3600);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  $("#againBtn").addEventListener("click", () => {
    $("#rsvpDone").hidden = true; form.hidden = false; go(1); sfx.blip();
  });

  // Pre-fill from a previous RSVP on this device
  const mine = store.get("my-rsvp", null);
  if (mine) { form.elements.name.value = mine.name; form.elements.email.value = mine.email; }
  go(1);

  /* ================= INIT ================= */
  show(location.hash.slice(1) || "home");
})();
