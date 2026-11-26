(() => {
  const CFG = window.WEDDING_CONFIG;
  const t = (s, ctx) => (window.I18N ? window.I18N.t(s, ctx) : s); // translate (i18n.js); the rest of the page is translated automatically
  const tr = t; // same, for places where "t" means something else
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  };

  /* ================= SOUND (tiny 8-bit blips) ================= */
  let soundOn = store.get("sound", true);
  let actx;
  function tone(freq, dur = 0.07, type = "square", vol = 0.3, when = 0) {
    if (!soundOn) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state !== "running") actx.resume(); // Safari can leave it suspended (or "interrupted") until a tap
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
    type: () => tone(880 + Math.random() * 120, 0.02, "square", 0.05),
    meow: () => { tone(700, 0.12, "triangle", 0.08); tone(520, 0.18, "triangle", 0.07, 0.1); },
    fanfare: () => [523, 659, 784, 1047, 784, 1047].forEach((f, i) => tone(f, 0.14, "square", 0.05, i * 0.12)),
    error: () => tone(160, 0.15, "sawtooth", 0.04),
  };
  const soundBtn = $("#soundBtn");
  const paintSound = () => (soundBtn.textContent = soundOn ? "♪ ON" : "♪ OFF");
  paintSound();
  // background music: day = warm melodic (music-day.js), night = hard rock (music-night.js).
  // Needs a click/key first, because browsers block sound until then.
  function audio() {
    try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); if (actx.state !== "running") actx.resume(); } catch {}
    return actx;
  }
  let nightMode = false;
  function music() {
    const day = window.BGM_DAY, night = window.BGM_NIGHT;
    if (!day || !night) return;
    const on = soundOn && !document.hidden;
    const want = nightMode ? night : day, other = nightMode ? day : night;
    other.stop();
    if (on) want.play(audio()); else want.stop();
    if (navigator.mediaSession) navigator.mediaSession.playbackState = on ? "playing" : "paused";
  }
  // the music card on the phone's lock screen / control center: our cover picture and title, and its ▶ / ❚❚ work like the ♪ button
  function mediaCard() {
    if (!navigator.mediaSession || !window.MediaMetadata) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: t("Our Wedding Adventure"), artist: t("Chin-Yi & Sixuan"),
      artwork: [{ src: new URL("assets/cover.jpg", location.href).href, sizes: "512x512", type: "image/jpeg" }],
    });
  }
  try {
    mediaCard();
    navigator.mediaSession.setActionHandler("play", () => setSound(true));
    navigator.mediaSession.setActionHandler("pause", () => setSound(false));
  } catch {}
  document.addEventListener("langchange", mediaCard);
  function setSound(v) { soundOn = v; store.set("sound", soundOn); paintSound(); music(); }
  function setNight(v) { if (nightMode === v) return; nightMode = v; if (window.BGM_DAY && (BGM_DAY.playing || BGM_NIGHT.playing)) music(); }
  // Safari only lets sound start inside a finished tap/click (touchend / click), not on pointerdown
  // like Chrome does, so listen to all of them and keep trying until the audio is really running.
  const GESTURES = ["pointerdown", "touchend", "click", "keydown"];
  const firstGesture = () => {
    music();
    if (!soundOn) return; // music is off: wait until it's switched on (the ♪ button is a click, so it unlocks then)
    if (actx && actx.state === "running") GESTURES.forEach((g) => window.removeEventListener(g, firstGesture, true));
  };
  GESTURES.forEach((g) => window.addEventListener(g, firstGesture, true));
  // iPhone: by default web audio is muted when the side switch is on silent; "playback" plays it like a video would
  try { if (navigator.audioSession) navigator.audioSession.type = "playback"; } catch {}
  document.addEventListener("visibilitychange", () => { if (window.BGM_DAY && (BGM_DAY.playing || BGM_NIGHT.playing || !document.hidden)) music(); });
  /* ================= CHAT (a joke: whatever you ask, it answers with a hint about the secret night view) ================= */
  (() => {
    const btn = $("#chatBtn"), box = $("#chatBox"), log = $("#chatLog"), form = $("#chatForm"), input = $("#chatInput");
    const say = (who, text) => {
      const m = document.createElement("p");
      m.className = "chat-msg " + who; m.textContent = text;
      if (who === "me") m.setAttribute("data-no-i18n", ""); // never translate what the visitor typed
      log.appendChild(m); log.scrollTop = log.scrollHeight;
      return m;
    };
    say("bot", "Hi! 👋 Got a question about the wedding? Ask us anything!");
    const open = (v) => {
      box.hidden = !v; btn.setAttribute("aria-expanded", v); btn.classList.toggle("on", v);
      if (v) input.focus(); else btn.focus();
    };
    btn.addEventListener("click", () => { sfx.blip(); open(box.hidden); });
    $("#chatClose").addEventListener("click", () => { sfx.blip(); open(false); });
    window.addEventListener("keydown", (e) => { if (e.key === "Escape" && !box.hidden) { e.stopImmediatePropagation(); open(false); } }, true);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = input.value.trim(); if (!q) return;
      say("me", q); input.value = ""; sfx.type();
      const dots = say("bot typing", "…");
      setTimeout(() => { dots.remove(); say("bot", "You’ll have to figure it out yourself! 🤷‍♀️ All I can tell you is… try pressing the home page background. 🌙✨"); sfx.blip(); }, 700 + Math.random() * 500);
    });
  })();

  soundBtn.addEventListener("click", () => { setSound(!soundOn); sfx.blip(); });

  // full-screen button (iPhone Safari doesn't allow web pages to go full screen, so the button stays hidden there)
  (() => {
    const btn = $("#fullBtn"), root = document.documentElement;
    const enter = root.requestFullscreen || root.webkitRequestFullscreen;
    const exit = document.exitFullscreen || document.webkitExitFullscreen;
    const current = () => document.fullscreenElement || document.webkitFullscreenElement;
    if (!enter || !exit) return;
    btn.hidden = false;
    const paint = () => {
      const on = !!current(), label = on ? "Exit full screen" : "Full screen";
      btn.classList.toggle("on", on);
      btn.setAttribute("aria-label", label); btn.title = label;
    };
    btn.addEventListener("click", () => {
      sfx.blip();
      const p = current() ? exit.call(document) : enter.call(root);
      if (p && p.catch) p.catch(() => {}); // e.g. blocked inside an embedded frame
    });
    document.addEventListener("fullscreenchange", paint);
    document.addEventListener("webkitfullscreenchange", paint);
  })();

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
  const screens = ["home", "story", "gallery", "board", "wedding", "travel", "rsvp"];
  let current = "home";
  function setTitle() {
    const names = t("Chin-Yi & Sixuan");
    document.title = current === "home" ? names : `${$(`#screen-${current} h2`).textContent.trim()} · ${names}`;
  }
  function show(name) {
    if (!screens.includes(name)) name = "home";
    $$(".screen").forEach((s) => (s.hidden = s.dataset.screen !== name));
    $$(".topnav a").forEach((a) => a.classList.toggle("active", a.dataset.go === name));
    document.body.classList.toggle("sub", name !== "home");
    current = name; setTitle();
    window.scrollTo({ top: 0 });
    if (name === "gallery") gallery.shelf();
    if (name === "board") board.enter();
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
    if (e.key === "Escape" && !$("#lightbox").hidden) return;
    if (e.key === "Escape" && !$("#screen-gallery").hidden && !$("#albumView").hidden) return; // gallery: Esc = back to albums
    if (e.key === "Escape" && document.body.classList.contains("sub")) { history.pushState(null, "", "#home"); show("home"); }
  });

  /* ================= TITLE SCREEN ================= */
  // Hold the mouse button (PC) or keep a finger on the artwork (phone) to see it at night; let go to go back to day
  (() => {
    const art = $(".hero-art");
    const day = () => { art.classList.remove("night"); setNight(false); };
    art.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if (e.target.closest("a, button, .speech")) return; // clicks on the cat / mailbox / banner still work as before
      e.preventDefault();
      art.classList.add("night"); setNight(true);
    });
    window.addEventListener("pointerup", day);
    // iPhone Safari may cancel the pointer partway through a long press; for touch, wait for the finger to actually lift
    window.addEventListener("pointercancel", (e) => { if (e.pointerType !== "touch") day(); });
    window.addEventListener("touchend", day);
    window.addEventListener("touchcancel", day);
    art.addEventListener("contextmenu", (e) => { if (!e.target.closest("a, button")) e.preventDefault(); }); // long-press menu on phones
    art.addEventListener("selectstart", (e) => e.preventDefault()); // iPhone long-press text/image selection
    art.addEventListener("dragstart", (e) => e.preventDefault());
    window.addEventListener("blur", day);
  })();

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
  // announcement banner on the title picture: messages scroll by one at a time; click it for the full list
  // (messages in config.js "announcements")
  (() => {
    const btn = $("#news"), pop = $("#newsPop");
    const list = (CFG.announcements || []).map((a) => (typeof a === "string" ? { text: a } : a)).filter((a) => a && a.text);
    if (!btn || !list.length) return;
    btn.hidden = false;
    const win = btn.querySelector(".news-window"), text = btn.querySelector(".news-text"), ul = pop.querySelector(".news-list");
    const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
    const still = matchMedia("(prefers-reduced-motion: reduce)");
    btn.querySelector(".news-count").textContent = list.length;
    let i = 0, anim = null, timer = 0;

    function next() {
      clearTimeout(timer);
      const a = list[i++ % list.length];
      text.textContent = t(a.text);
      const W = win.clientWidth, w = text.scrollWidth;
      if (!W || still.matches || !text.animate) { text.style.transform = ""; timer = setTimeout(next, W ? 4000 : 1000); return; }
      // slide in from the right, all the way through, then the next message
      // (the very first one starts already in view, so the banner is never empty when the page opens)
      const from = i === 1 ? 0 : W;
      anim = text.animate([{ transform: `translateX(${from}px)` }, { transform: `translateX(${-w}px)` }],
        { duration: ((from + w) / 55) * 1000, delay: from ? 0 : 1500, easing: "linear", fill: "backwards" });
      anim.onfinish = next;
    }
    btn.addEventListener("pointerenter", () => anim && anim.pause());
    btn.addEventListener("pointerleave", () => anim && pop.hidden && anim.play());

    function fill() {
      btn.setAttribute("aria-label", t("Announcements"));
      ul.innerHTML = list.map((a) => `<li><span class="news-item">${esc(t(a.text))}</span>` +
        (a.go ? `<a class="btn btn-pink news-go" href="#${esc(a.go)}" data-go="${esc(a.go)}">${esc(t("Go"))} ▶</a>` : "") + "</li>").join("");
    }
    function open() { sfx.select(); fill(); pop.hidden = false; anim && anim.pause(); pop.querySelector(".news-close").focus(); }
    function close() { pop.hidden = true; anim && anim.play(); btn.focus({ preventScroll: true }); }
    btn.addEventListener("click", open);
    pop.addEventListener("click", (e) => {
      if (e.target === pop || e.target.closest(".news-close")) { sfx.blip(); close(); }
      else if (e.target.closest("[data-go]")) { pop.hidden = true; anim && anim.play(); }
    });
    window.addEventListener("keydown", (e) => { if (e.key === "Escape" && !pop.hidden) close(); });
    document.addEventListener("langchange", () => { if (anim) anim.cancel(); i = Math.max(0, i - 1); next(); if (!pop.hidden) fill(); });
    next();
  })();

  // click Leia, Chin-Yi or Sixuan on the title picture: they say something (one speech bubble, moved over whoever talks)
  const catSpeech = $("#catSpeech");
  const TALK = {
    // sx / sy = where the bubble sits (% of the picture), tx = which way it grows, msx = bubble spot on phones
    leia: { sx: "50%", sy: "66%", tx: "-10%", msx: "56%", lines: ["Meow! I'm Leia. Did you bring my treats? 🐾", "Purrr... try clicking the background for a surprise! 💕", "*knocks your phone off the table*", "Mrrp! I'm the ring bearer. 💍"] },
    chinyi: { sx: "46%", sy: "60%", tx: "-90%", msx: "44%", lines: ["Hi! I'm Chin-Yi. Welcome to our adventure! 💕", "I just adopted a cat! 🐱", "Sixuan has bought 4 old cars...🙄", "...and he keeps forgetting about his Mazda 6! 🚗"] },
    sixuan: { sx: "51.5%", sy: "59%", tx: "-10%", msx: "52%", lines: ["Hey! I'm Sixuan. Welcome! 👋", "You thought the Miata was my last car? 🏎️", "Then I bought a Ranger... 🛻", "...and then I got a 1995 Jeep! 🚙"] },
  };
  const talkI = {};
  let catT;
  $$("[data-talk-who]").forEach((b) => b.addEventListener("click", () => {
    const who = b.dataset.talkWho, w = TALK[who];
    if (who === "leia") sfx.meow(); else sfx.select();
    ["sx", "sy", "tx", "msx"].forEach((k) => catSpeech.style.setProperty("--" + k, w[k]));
    talkI[who] = talkI[who] || 0;
    catSpeech.textContent = w.lines[talkI[who]++ % w.lines.length];
    catSpeech.classList.add("show");
    clearTimeout(catT); catT = setTimeout(() => catSpeech.classList.remove("show"), 2600);
  }));

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
  // six RPG stats (1–10) drawn as a hexagon chart; hover (or tap) a stat for what it means
  const STATS = [
    ["STR", "Strength (STR) — body & drive: fitness, stamina for hard work, getting things done."],
    ["DEX", "Dexterity (DEX) — quick hands & reflexes: coordination, thinking on your feet, efficiency."],
    ["CON", "Constitution (CON) — energy & resilience: staying power, rarely sick, keeps calm under long stress."],
    ["INT", "Intelligence (INT) — logic & learning: reasoning, expertise, analysing problems, learning fast."],
    ["WIS", "Wisdom (WIS) — insight & calm: empathy, intuition, reading the room, staying steady in chaos."],
    ["CHA", "Charisma (CHA) — social magic: charm, way with words, leadership, makes friends anywhere."],
  ];
  function hexStats(st) {
    const R = 62, pt = (i, r) => { const a = (Math.PI / 3) * i - Math.PI / 2; return [+(r * Math.cos(a)).toFixed(1), +(r * Math.sin(a)).toFixed(1)]; };
    const ring = (f) => STATS.map((_, i) => pt(i, R * f).join(",")).join(" ");
    const val = (k) => Math.max(0, Math.min(10, +st[k] || 0));
    const shape = STATS.map(([k], i) => pt(i, (R * val(k)) / 10).join(",")).join(" ");
    const axes = STATS.map((_, i) => { const [x, y] = pt(i, R); return `<line x1="0" y1="0" x2="${x}" y2="${y}"/>`; }).join("");
    const labels = STATS.map(([k, tip], i) => {
      const [x, y] = pt(i, R + 20), anchor = Math.abs(x) < 5 ? "middle" : x > 0 ? "start" : "end";
      const [dx, dy] = pt(i, (R * val(k)) / 10);
      return `<g class="hex-stat" data-s="${i}">` +
        `<rect class="hex-dot" x="${dx - 3}" y="${dy - 3}" width="6" height="6"/>` +
        `<text x="${x}" y="${y}" text-anchor="${anchor}" dominant-baseline="middle"><tspan class="hex-k">${k}</tspan><tspan class="hex-v" dx="4">${val(k)}</tspan></text></g>`;
    }).join("");
    return `<svg class="char-hex" viewBox="-118 -92 236 184" role="img" aria-label="${STATS.map(([k]) => `${k} ${val(k)}`).join(", ")}">` +
      `<g class="hex-grid">${[1, .8, .6, .4, .2].map((f) => `<polygon points="${ring(f)}"/>`).join("")}${axes}</g>` +
      `<polygon class="hex-shape" points="${shape}"/>${labels}</svg>`;
  }
  // the stat's meaning, in a pixel box next to it (stays open while the mouse is on the stat, even after a click; tap to open / close on phones)
  const statTip = (() => {
    const box = document.createElement("div");
    box.className = "stat-tip"; box.hidden = true; box.setAttribute("role", "tooltip");
    document.body.appendChild(box);
    let on = null;
    function show(g) {
      on = g;
      box.textContent = t(STATS[+g.dataset.s][1]);
      box.hidden = false;
      const r = (g.querySelector("text") || g).getBoundingClientRect(), w = box.offsetWidth, h = box.offsetHeight;
      const x = Math.max(8, Math.min(innerWidth - w - 8, r.left + r.width / 2 - w / 2));
      let y = r.top - h - 12; if (y < 8) y = r.bottom + 12;
      box.style.left = x + "px"; box.style.top = y + "px";
    }
    function hide() { on = null; box.hidden = true; }
    party.addEventListener("pointerover", (e) => { if (e.pointerType !== "mouse") return; const g = e.target.closest(".hex-stat"); if (g && g !== on) show(g); });
    party.addEventListener("pointerout", (e) => { if (e.pointerType !== "mouse") return; const g = e.target.closest(".hex-stat"); if (g && !g.contains(e.relatedTarget)) hide(); });
    document.addEventListener("click", (e) => { if (on && !e.target.closest(".hex-stat")) hide(); });
    const follow = () => { if (on) (on.isConnected && !on.closest("[hidden]") ? show(on) : hide()); };
    window.addEventListener("scroll", follow, { passive: true });
    window.addEventListener("resize", follow);
    window.addEventListener("hashchange", hide);
    document.addEventListener("langchange", () => { if (on) show(on); });
    return { toggle: (g, type) => (type !== "mouse" && on === g ? hide() : show(g)) };
  })();
  (CFG.characters || []).forEach((c, i) => {
    // (a clickable box rather than a <button>, so the Instagram link can sit inside it)
    const card = document.createElement("div");
    card.className = "char panel parchment";
    card.setAttribute("role", "button"); card.tabIndex = 0;
    card.setAttribute("aria-pressed", "false");
    const ig = String(c.ig || "").trim().replace(/^@/, "").replace(/^https?:\/\/(www\.)?instagram\.com\//i, "").replace(/\/.*$/, "");
    card.innerHTML = `
      <span class="char-tag">${esc(c.tag || "P" + (i + 1))}</span>
      <div class="char-head">
        <div class="char-portrait${c.photo ? " has-photo" : ""}">${c.photo ? `<img src="${esc(c.photo)}" alt="Pixel portrait of ${esc(c.name)}" />` : esc(c.emoji)}</div>
        <div>
          <div class="char-name">${esc(c.name.toUpperCase())}${c.nameIcon ? ` <span class="name-icon">${esc(c.nameIcon)}</span>` : ""}</div>
          <div class="char-class">Class: <b>${esc(c.className)}</b></div>
        </div>
      </div>
      <dl class="char-info">
        <dt>Origin</dt><dd>${esc(c.origin)}</dd>
        <dt>personality</dt><dd>${esc(c.skill)}</dd>
        ${c.likes ? `<dt>Likes</dt><dd>${esc(c.likes)}</dd>` : ""}
        ${c.hates ? `<dt>Hates</dt><dd>${esc(c.hates)}</dd>` : ""}
        ${ig ? `<dt>IG</dt><dd><a class="char-ig" href="https://www.instagram.com/${encodeURIComponent(ig)}/" target="_blank" rel="noopener" data-no-i18n>@${esc(ig).replace(/_/g, "_<wbr>")} ↗</a></dd>` : ""}
      </dl>
      ${hexStats(c.stats || {})}
      <span class="char-play">▶ See the story as ${esc(c.name)}</span>
      <span class="char-select">♥ TELLING THE STORY ♥</span>`;
    card.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      const st = e.target.closest(".hex-stat");
      if (st) { statTip.toggle(st, e.pointerType || "mouse"); return; } // a stat ("?" cursor) only shows its meaning
      sfx.select();
      story.view(c.name, true);
    });
    card.addEventListener("keydown", (e) => {
      if (e.target !== card || (e.key !== "Enter" && e.key !== " ")) return;
      e.preventDefault(); card.click();
    });
    party.appendChild(card);
    if (i === 0 && CFG.characters.length === 2) {
      const vs = document.createElement("div");
      vs.className = "char-vs"; vs.textContent = "♥"; vs.setAttribute("aria-hidden", "true");
      party.appendChild(vs);
    }
  });

  /* ================= STORY (RPG dialogue) ================= */
  // Same 5 moments; each teller (Narrator / character) has their own chapter names and
  // their own unlock progress — finish a chapter to unlock the next one in that version.
  const story = (() => {
    const list = $("#chapterList"), textEl = $("#dialogText"), who = $("#speaker"), dlg = $("#dialog"), backBtn = $("#dialogBack");
    const chapters = CFG.story;
    let viewer = CFG.characters[0].name;
    let ch = 0, line = 0, typing = null, full = "";

    const part = (i, v = viewer) => {
      const base = chapters[i], o = (base.views && base.views[v]) || {};
      return { emoji: o.emoji || "📖", subtitle: o.subtitle || base.moment || "", year: o.year || "",
               place: o.place || "", lines: o.lines && o.lines.length ? o.lines : [["Narrator", "(This chapter hasn't been written yet.)"]] };
    };
    const key = (v = viewer) => "progress:" + v;
    const unlocked = (v = viewer) => Math.min(chapters.length, Math.max(1, store.get(key(v), 1)));
    let justUnlocked = -1;

    function renderList() {
      const u = unlocked();
      list.innerHTML = "";
      chapters.forEach((_, i) => {
        const c = part(i);
        const li = document.createElement("li");
        const b = document.createElement("button");
        b.type = "button";
        b.disabled = i >= u;
        b.className = (i === ch ? "current" : "") + (i === justUnlocked ? " just-unlocked" : "");
        b.innerHTML = i < u ? `${esc(c.emoji)} Chapter ${i + 1}<small>${esc(c.subtitle)}</small>` : `🔒 Chapter ${i + 1}<small>Locked</small>`;
        b.addEventListener("click", () => { sfx.blip(); load(i); toDialog(); });
        li.appendChild(b); list.appendChild(li);
      });
      if (u > 1) {
        const li = document.createElement("li");
        const r = document.createElement("button");
        r.type = "button"; r.className = "restart"; r.textContent = "↺ Restart this story";
        r.addEventListener("click", () => { sfx.blip(); store.set(key(), 1); justUnlocked = -1; load(0); toDialog(); });
        li.appendChild(r); list.appendChild(li);
      }
    }
    function view(name, scroll) {
      viewer = name;
      entered = true; $("#storyLayout").hidden = false; // the story only starts once a character is picked
      $$(".char", party).forEach((x, i) => {
        const on = CFG.characters[i].name === viewer;
        x.classList.toggle("picked", on); x.setAttribute("aria-pressed", on);
      });
      $("#storyTitle").textContent = `— Our story · told by ${viewer} —`;
      justUnlocked = -1;
      load(Math.min(ch, unlocked() - 1)); // same moment if this version has unlocked it
      if (scroll) $("#storyTitle").scrollIntoView({ behavior: "smooth", block: "start" });
      toDialog();
    }
    // After clicking a character card / chapter / Back, put the keyboard focus on the dialogue box,
    // so Space goes to the next line instead of pressing that button again (which restarted the story).
    function toDialog() { dlg.focus({ preventScroll: true }); }
    function load(i, at = 0, instant = false) {
      ch = i; line = at;
      const c = part(i);
      $("#sceneEmoji").textContent = c.emoji;
      $("#sceneYear").textContent = t(c.year) || "—";
      $("#scenePlace").textContent = t(c.place, "place") || "—";
      $("#vnIcon").textContent = c.emoji;
      $("#vnNum").textContent = `Ch. ${i + 1}`;
      $("#vnName").textContent = c.subtitle;
      renderList(); say(instant);
    }
    // ---- one picture per sentence ----
    // 1) a picture named in config (3rd item of the line), else
    // 2) assets/story/<teller>-ch<N>-<line>.png / .jpg (e.g. chinyi-ch1-2.png), else
    // 3) the chapter picture assets/story/<teller>-ch<N>.png / .jpg, else
    // 4) the speaker's portrait, else 5) the chapter icon.
    const photo = $("#scenePhoto"), emojiEl = $("#sceneEmoji"), sceneBox = $("#sceneBox");
    const slug = (n) => String(n).toLowerCase().replace(/[^a-z0-9]/g, "");
    let sceneToken = 0;
    const imgOk = {};
    function sceneTries(c, l) {
      const [speaker, , pic] = part(c).lines[l];
      const base = `assets/story/${slug(viewer)}-ch${c + 1}-${l + 1}`;
      const chapterBase = `assets/story/${slug(viewer)}-ch${c + 1}`;
      const portrait = (charOf(speaker) || {}).photo;
      return [pic && { src: pic, kind: "full" },
              { src: base + ".png", kind: "full" }, { src: base + ".jpg", kind: "full" },
              { src: chapterBase + ".png", kind: "full" }, { src: chapterBase + ".jpg", kind: "full" },
              portrait && { src: portrait, kind: "portrait" }].filter(Boolean)
             .filter((t) => imgOk[t.src] !== false);
    }
    // Shows this sentence's picture. Resolves once the new picture is on screen (and its
    // pop-in animation has played), so the sentence can start typing after the picture changed.
    function setScene() {
      const token = ++sceneToken;
      const [speaker] = part(ch).lines[line];
      const tries = sceneTries(ch, line);
      return new Promise((done) => {
        const showEmoji = () => { photo.hidden = true; emojiEl.hidden = false; sceneBox.classList.remove("has-full"); done(); };
        const attempt = (i) => {
          if (token !== sceneToken) return done();
          if (i >= tries.length) return showEmoji();
          const t = tries[i], img = new Image();
          img.onload = () => {
            imgOk[t.src] = true;
            if (token !== sceneToken) return done();
            const same = !photo.hidden && photo.getAttribute("src") === t.src;
            photo.src = t.src; photo.className = "scene-photo " + t.kind;
            photo.alt = t.kind === "portrait" ? tr(speaker) : `${tr(speaker)}: ${tr(part(ch).lines[line][1])}`;
            photo.hidden = false; emojiEl.hidden = true;
            sceneBox.classList.toggle("has-full", t.kind === "full");
            if (same) return done();
            photo.style.animation = "none"; void photo.offsetWidth; photo.style.animation = "";
            setTimeout(done, 350); // .scene-photo pop-in animation
          };
          img.onerror = () => { imgOk[t.src] = false; attempt(i + 1); };
          img.src = t.src;
        };
        attempt(0);
      });
    }
    // Look up the next sentence's picture ahead of time, so it appears without a wait.
    function preloadNext() {
      let c = ch, l = line + 1;
      if (l >= part(c).lines.length) { c++; l = 0; }
      if (c >= chapters.length) return;
      const tries = sceneTries(c, l);
      const attempt = (i) => {
        if (i >= tries.length || imgOk[tries[i].src] === true) return;
        const img = new Image();
        img.onload = () => { imgOk[tries[i].src] = true; };
        img.onerror = () => { imgOk[tries[i].src] = false; attempt(i + 1); };
        img.src = tries[i].src;
      };
      attempt(0);
    }
    function portraitReady() {
      const im = $("#dlgPortrait img");
      if (!im || im.complete) return Promise.resolve();
      return new Promise((done) => { im.addEventListener("load", done, { once: true }); im.addEventListener("error", done, { once: true }); });
    }
    // speaker name -> character: exact name, or a name inside it ("Stormy (Leia)" -> Leia).
    // Two or more names ("Chin-Yi & Sixuan") count as the couple, not one character.
    const namesIn = (name) => CFG.characters.filter((x) => String(name).toLowerCase().includes(x.name.toLowerCase()));
    const charOf = (name) => CFG.characters.find((x) => x.name === name) || (namesIn(name).length === 1 ? namesIn(name)[0] : null);
    function setPortrait(name) {
      const box = $("#dlgPortrait");
      const c = charOf(name);
      box.classList.toggle("narrator", !c);
      box.classList.remove("cutout");
      // both of us speaking ("Chin-Yi & Sixuan") -> the two-of-us picture.
      // It's a landscape picture, so the portrait box (and the text beside it) gets wider.
      const couple = !c && namesIn(name).length > 1 ? "assets/narrator/sixuan-and-chinyi.png" : null;
      // "🔓 Unlocked!" -> unlocked.png, end of the story -> the-end.png (both normal size, not landscape)
      const special = couple || (name === "__end" ? "assets/narrator/the-end.png"
        : name.startsWith("🔓") ? "assets/narrator/unlocked.png" : null);
      box.classList.toggle("wide", !!couple);
      $("#dialog").classList.toggle("wide-portrait", !!couple);
      box.innerHTML = c ? `<img src="${esc(c.photo)}" alt="">` : special ? `<img src="${special}" alt="">` : "💞";
      if (special) { box.classList.remove("narrator"); box.classList.add("cutout"); }
      // Sticker faces (assets/narrator/<who>-<mood>.png): a character's line shows that character's
      // sticker, a Narrator line shows the storyteller's sticker. The mood is picked per line.
      const inLine = line < part(ch).lines.length;
      // Narrator lines always show the book & quill picture.
      const who = c ? slug(c.name) : null;
      const sticker = name === "Narrator" ? "assets/narrator/narrator.png"
        : inLine && who && window.StoryScenes && StoryScenes.face
        ? StoryScenes.face(`${slug(viewer)}-ch${ch + 1}-${line + 1}`, who) : null;
      if (sticker && imgOk[sticker] !== false) {
        box.classList.remove("narrator"); box.classList.add("cutout");
        box.innerHTML = `<img src="${esc(sticker)}" alt="">`;
        const im = box.querySelector("img");
        im.onerror = () => { imgOk[sticker] = false; if (box.contains(im)) setPortrait(name); };
      }
      // a special face for this one sentence: assets/faces/<teller>-ch<N>-<line>.png (e.g. chinyi-ch1-2.png)
      if (c && line < part(ch).lines.length) {
        const face = `assets/faces/${slug(viewer)}-ch${ch + 1}-${line + 1}.png`, token = sceneToken;
        const use = () => { const im = box.querySelector("img"); if (im && token === sceneToken) { im.src = face; box.classList.add("cutout"); } };
        if (imgOk[face] === true) use();
        else if (imgOk[face] !== false) {
          return new Promise((done) => {
            const probe = new Image();
            probe.onload = () => { imgOk[face] = true; use(); done(); };
            probe.onerror = () => { imgOk[face] = false; done(); };
            probe.src = face;
          });
        }
      }
      return Promise.resolve();
    }
    function say(instant = false) {
      const sceneShown = setScene();
      const [name, txt, , place] = part(ch).lines[line];
      $("#scenePlace").textContent = t(place || part(ch).place, "place") || "—";
      const faceShown = setPortrait(name);
      backBtn.hidden = ch === 0 && line === 0;
      who.textContent = t(name); full = t(txt); textEl.textContent = "";
      clearInterval(typing); typing = null;
      preloadNext();
      if (instant) { textEl.textContent = full; return; } // going back: show the whole line at once
      // The sentence starts typing only once the new picture and face are on screen
      // (at most 2.5 s, so a slow connection never blocks the story). A click while
      // waiting shows the whole sentence at once, like a click while typing.
      const wait = {};
      typing = wait;
      Promise.race([Promise.all([sceneShown, faceShown, portraitReady()]), new Promise((r) => setTimeout(r, 2500))])
        .then(() => {
          if (typing !== wait) return; // clicked, or moved on, while waiting
          let k = 0;
          typing = setInterval(() => {
            textEl.textContent = full.slice(0, ++k);
            if (k % 2) sfx.type();
            if (k >= full.length) { clearInterval(typing); typing = null; }
          }, 28);
        });
    }
    function advance() {
      if (typing) { clearInterval(typing); typing = null; textEl.textContent = full; return; }
      if (line < part(ch).lines.length - 1) { line++; say(); return; }
      if (ch < chapters.length - 1) {
        if (unlocked() < ch + 2) {
          store.set(key(), ch + 2);
          justUnlocked = ch + 1;
          renderList();
          showUnlock(ch + 1);
          sfx.fanfare();
        } else {
          load(ch + 1);
        }
      } else {
        // story finished → RSVP pop-up
        showEnd();
        sfx.fanfare();
        setTimeout(openPop, 500);
      }
    }
    function showUnlock(i) {
      const n = part(i);
      who.textContent = t("🔓 Unlocked!"); setPortrait("🔓");
      textEl.textContent = t(`Chapter ${i + 1} unlocked: ${n.emoji} ${n.subtitle}`) + "\n" + t("Click to continue →");
      full = "__goto:" + i;
    }
    function showEnd() {
      who.textContent = "★"; setPortrait("__end");
      textEl.textContent = t("THE END... of the beginning! ♥");
      full = "__end";
    }
    // language switched: redraw the open line in the new language
    function relang() {
      if (!entered) return;
      $("#storyTitle").textContent = `— Our story · told by ${viewer} —`;
      $("#sceneYear").textContent = t(part(ch).year) || "—";
      clearInterval(typing); typing = null;
      if (full === "__end") showEnd();
      else if (full.startsWith("__goto:")) showUnlock(+full.slice(7));
      else say(true);
    }
    // ◀ Back: previous line; from a chapter's first line, the last line of the chapter before;
    // from the "Unlocked!" / "THE END" box, the last line of the chapter just finished.
    function back() {
      if (full === "__end" || full.startsWith("__goto:")) { justUnlocked = -1; say(true); return; }
      if (typing) { clearInterval(typing); typing = null; }
      if (line > 0) { line--; say(true); return; }
      if (ch > 0) load(ch - 1, part(ch - 1).lines.length - 1, true);
    }
    function toast(msg) {
      const t = document.createElement("div");
      t.className = "toast"; t.textContent = msg;
      document.body.appendChild(t);
      setTimeout(() => t.remove(), 2600);
    }

    // RSVP pop-up shown when a story ends
    const pop = document.createElement("div");
    pop.className = "pop"; pop.hidden = true;
    pop.setAttribute("role", "dialog"); pop.setAttribute("aria-modal", "true"); pop.setAttribute("aria-labelledby", "popTitle");
    pop.innerHTML = `
      <div class="pop-box parchment">
        <div class="pop-heart">💌</div>
        <h3 id="popTitle">Story complete!</h3>
        <p data-i18n-html>The next chapter happens at <b>Duke Chapel</b> on <b>May 15, 2027</b> — and we want you in it!</p>
        <div class="pop-actions">
          <button type="button" class="btn btn-pink" data-pop="rsvp">✉ RSVP now</button>
          <button type="button" class="btn" data-pop="close">Keep exploring</button>
        </div>
      </div>`;
    document.body.appendChild(pop);
    function openPop() {
      pop.hidden = false;
      $('[data-pop="rsvp"]', pop).focus();
    }
    function closePop() { pop.hidden = true; }
    pop.addEventListener("click", (e) => {
      const a = e.target.closest("[data-pop]");
      if (e.target === pop || (a && a.dataset.pop === "close")) { sfx.blip(); closePop(); return; }
      if (a && a.dataset.pop === "rsvp") { sfx.select(); closePop(); history.pushState(null, "", "#rsvp"); show("rsvp"); }
    });
    window.addEventListener("keydown", (e) => { if (e.key === "Escape" && !pop.hidden) { e.stopImmediatePropagation(); closePop(); } }, true);

    backBtn.addEventListener("click", (e) => { e.stopPropagation(); sfx.blip(); back(); if (e.detail) toDialog(); }); // mouse/tap click; keyboard users keep focus on Back
    dlg.addEventListener("click", () => {
      if (full === "__end") { sfx.select(); openPop(); return; }
      if (full.startsWith("__goto:")) { sfx.select(); const i = +full.slice(7); justUnlocked = -1; load(i); return; }
      advance();
    });
    window.addEventListener("keydown", (e) => {
      if (!entered || $("#screen-story").hidden || !pop.hidden) return;
      if (e.target !== dlg && e.target.closest && e.target.closest("button, a, input, textarea, select, [role=button]")) return;
      if (e.key === " " || e.key === "Enter" || e.key === "ArrowRight") { e.preventDefault(); dlg.click(); }
      if (e.key === "ArrowLeft" && !backBtn.hidden) { e.preventDefault(); backBtn.click(); }
    });
    let entered = false;
    return { view, relang };
  })();

  /* ================= GUEST MESSAGES (Forum + comments under gallery photos) ================= */
  // Saved to the Google Sheet by the same Apps Script as the RSVPs (config.js → rsvpEndpoint), which also
  // sends them back so every visitor sees them. Without it (testing), they're kept in this browser only.
  const notes = (() => {
    const API = CFG.messagesEndpoint || CFG.rsvpEndpoint;
    try { localStorage.removeItem("notes-mine"); } catch (e) {}
    let data = null, loading = null, status = API ? "loading" : "offline";
    const subs = [];
    const emit = () => subs.forEach((f) => f(data));
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    function load() {
      if (loading) return loading; // one request at a time
      loading = (async () => {
        try {
          if (!API) throw Error("offline");
          const res = await fetch(API + (API.includes("?") ? "&" : "?") + "action=notes&t=" + Date.now(), { cache: "no-store" });
          const j = await res.json();
          if (!j || !j.ok) throw Error("bad reply");
          data = { messages: j.messages || [], comments: j.comments || [] }; status = "ok";
        } catch (e) {
          status = API ? "error" : "offline";
          if (!data) data = { messages: [], comments: [] };
        }
        emit(); return data;
      })().finally(() => { loading = null; });
      return loading;
    }
    // send to the sheet, then read the sheet back: it only counts as sent once it's really there
    async function post(kind, fields) {
      if (!API) throw Error("offline");
      const x = { kind, id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8), ...fields };
      await fetch(API, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(x) });
      if (loading) await loading; // a read that started before the post doesn't count
      for (const pause of [0, 1500, 3000]) {
        if (pause) await wait(pause);
        await load();
        const list = kind === "comment" ? data.comments : data.messages;
        if (status === "ok" && list.some((y) => y.id === x.id)) return;
      }
      throw Error("not confirmed");
    }
    const locale = () => ({ "zh-Hant": "zh-TW", "zh-Hans": "zh-CN" }[window.I18N && I18N.lang] || "en-US");
    const date = (iso) => { const d = new Date(iso); return isNaN(d) ? "" : d.toLocaleDateString(locale(), { year: "numeric", month: "short", day: "numeric" }); };
    // pop-up while a message / comment is being sent: "Sending…" until it's done, then "Sent! ✨"
    const sending = (() => {
      const el = document.createElement("div");
      el.className = "send-pop"; el.hidden = true;
      el.setAttribute("role", "status"); el.setAttribute("aria-live", "polite");
      el.innerHTML = `<div class="send-box parchment"><div class="send-icon"></div><p class="send-msg"></p></div>`;
      document.body.appendChild(el);
      return {
        show(msg, icon, busy = false) {
          $(".send-icon", el).textContent = icon; $(".send-msg", el).textContent = msg;
          el.classList.toggle("busy", busy); el.hidden = false;
        },
        hide() { el.hidden = true; },
      };
    })();
    // the name + message form (board and photo comments share it)
    let last = 0;
    function wire(form, kind, extra, max) {
      const err = $("[data-note-err]", form), count = $(".note-count", form), btn = $("button[type=submit]", form);
      const nameIn = form.elements.name, textIn = form.elements.text;
      if (count) textIn.addEventListener("input", () => (count.textContent = `${textIn.value.length}/${max}`));
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = nameIn.value.trim(), text = textIn.value.trim();
        err.textContent = !name ? "Please enter your name." : !text ? "Please write a message." : Date.now() - last < 15000 ? "Slow down a little — try again in a few seconds!" : "";
        if (err.textContent) { sfx.error(); return; }
        btn.disabled = true;
        sending.show("Sending…", "🕊️", true);
        const shown = Date.now();
        try {
          await post(kind, { name, text, website: form.elements.website.value, ...extra() });
          await wait(Math.max(0, 700 - (Date.now() - shown))); // stay up long enough to read
          last = Date.now();
          textIn.value = ""; if (count) count.textContent = `0/${max}`;
          sfx.select();
          sending.show("Sent! ✨", "💌"); await wait(1000);
        } catch (ex) {
          await wait(Math.max(0, 700 - (Date.now() - shown)));
          const msg = ex.message === "offline" ? "The Forum isn't open yet — check back soon!" : "Hmm, the carrier pigeon got lost. Please try again!";
          err.textContent = msg; sfx.error();
          sending.show(msg, "😿"); await wait(2200);
        } finally { sending.hide(); btn.disabled = false; }
      });
    }
    $$("[data-notes-local]").forEach((x) => (x.hidden = !!API));
    return { load, wire, date, on: (f) => subs.push(f), get data() { return data; }, get status() { return status; } };
  })();

  /* ================= MESSAGE BOARD ================= */
  const board = (() => {
    const wall = $("#noteWall");
    const tilt = (i) => [-2, 1.5, -1, 2, -1.5, 1][i % 6];
    const colors = ["#fff3dc", "#ffe1ea", "#e3f3ff", "#eaf7dc", "#fff0c4"];
    function render(d) {
      if (!d || notes.status === "loading") { wall.innerHTML = `<p class="note-empty">Loading messages…</p>`; return; }
      if (notes.status === "offline") { wall.innerHTML = `<p class="note-empty">The Forum isn't open yet — check back soon!</p>`; return; }
      if (notes.status === "error" && !d.messages.length) { wall.innerHTML = `<p class="note-empty">Couldn't load the messages right now. Please try again later.</p>`; return; }
      const list = [...d.messages].sort((a, b) => Date.parse(b.time) - Date.parse(a.time));
      wall.innerHTML = list.length ? list.map((m, i) =>
        `<article class="note-card" style="--tilt:${tilt(i)}deg;--paper:${colors[i % colors.length]}">` +
        `<p class="note-text" data-no-i18n>${esc(m.text)}</p>` +
        `<footer><b data-no-i18n>— ${esc(m.name)}</b><time data-no-i18n>${esc(notes.date(m.time))}</time></footer></article>`).join("")
        : `<p class="note-empty">No messages yet — be the first to leave one! 💌</p>`;
    }
    notes.on(render);
    notes.wire($("#boardForm"), "message", () => ({}), 500);
    return { enter: () => { render(notes.data); notes.load(); }, render: () => render(notes.data) };
  })();

  /* ================= GALLERY (albums of real photos in wooden frames) ================= */
  // Album shelf -> click an album -> its photos -> click a photo -> lightbox.
  const gallery = (() => {
    // Albums come straight from the folders: assets/gallery/<album name>/<photo caption>.jpg
    // Nothing to list by hand. Folder name = album name, file name (without .jpg) = caption.
    // Where to look: on a local preview server, the folder listing itself; on the live site,
    // GitHub's file list for the repository (a website can't list its own folders).
    const ROOT = "assets/gallery/";
    const IMG = /\.(jpe?g|png|gif|webp|avif)$/i; // (iPhone .heic photos only open in Safari, so save them as .jpg)
    const GH = CFG.galleryRepo || { repo: "may15th2027/may15th2027.github.io", branch: "master" };
    let albums = [];
    const shelfEl = $("#albumShelf"), viewEl = $("#albumView"), album = $("#album"), lb = $("#lightbox"), hint = $("#albumHint");
    const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]));
    const meta = (p) => [p.place, p.year].filter(Boolean).join(" · ");
    const tilt = (i) => [-1.5, 1, -.5, 1.5, -1, .5][i % 6];
    const focus = (f) => f ? ` style="object-position:${esc(f)}"` : "";
    const count = (n) => n ? `${n} photo${n > 1 ? "s" : ""}` : "Photos coming soon";
    const natural = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
    const url = (path) => path.split("/").map(encodeURIComponent).join("/");
    let photos = [], cur = 0, opener = null, lastAlbum = null;

    // ["Our Trips/beach day.jpg", ...] (paths inside assets/gallery/) -> albums
    function toAlbums(paths) {
      const by = {};
      paths.forEach((p) => {
        const parts = p.split("/");
        if (parts.length < 2 || !IMG.test(p)) return; // photos must be inside an album folder
        (by[parts[0]] = by[parts[0]] || []).push(p);
      });
      return Object.keys(by).sort(natural).map((name) => ({
        // folder "5 Leia-The boss of the house" -> album "Leia", note "The boss of the house"
        // (a number in front only sets the order on the shelf; it isn't shown)
        title: name.split("-")[0].trim().replace(/^\d+[\s._)]+/, "") || name,
        note: name.includes("-") ? name.slice(name.indexOf("-") + 1).trim() : "",
        photos: by[name].sort(natural).map((p) => ({ src: url(ROOT + p), key: p, caption: p.split("/").pop().replace(IMG, "") })),
      }));
    }
    // local preview server (VS Code Live Server, python -m http.server...): read the folder listings
    async function fromListing(dir = "", depth = 0) {
      const res = await fetch(url(ROOT + dir), { cache: "no-store" });
      if (!res.ok || !/html/i.test(res.headers.get("content-type") || "")) throw Error("no listing");
      const base = new URL(url(ROOT + dir), location.href).pathname.replace(/\/?$/, "/");
      const doc = new DOMParser().parseFromString(await res.text(), "text/html");
      const names = new Set();
      $$("a[href]", doc).forEach((a) => {
        const path = new URL(a.getAttribute("href"), new URL(base, location.href)).pathname;
        if (!path.startsWith(base) || path === base) return;
        const name = decodeURIComponent(path.slice(base.length)).replace(/\/$/, "");
        if (name && !name.includes("/") && !name.startsWith(".")) names.add(name);
      });
      if (!names.size && depth === 0) throw Error("empty listing");
      const out = [];
      for (const n of names) {
        if (IMG.test(n)) out.push(dir + n);
        else if (depth < 3) out.push(...await fromListing(dir + n + "/", depth + 1).catch(() => []));
      }
      return out;
    }
    // live site: one request to GitHub for the whole file list (cached for this visit)
    async function fromGitHub() {
      const key = "gallery:" + GH.repo + "@" + GH.branch;
      try { const c = JSON.parse(sessionStorage.getItem(key)); if (c && Date.now() - c.t < 6e5) return c.paths; } catch (e) {}
      const res = await fetch(`https://api.github.com/repos/${GH.repo}/git/trees/${encodeURIComponent(GH.branch)}?recursive=1`);
      if (!res.ok) throw Error("GitHub " + res.status);
      const paths = (await res.json()).tree.filter((t) => t.type === "blob" && t.path.startsWith(ROOT)).map((t) => t.path.slice(ROOT.length));
      try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), paths })); } catch (e) {}
      return paths;
    }
    const isLocal = /^(localhost|127\.|192\.168\.|10\.|\[::1\])/.test(location.hostname);
    async function load() {
      const tries = location.protocol === "file:" ? [fromGitHub] : isLocal ? [fromListing, fromGitHub] : [fromGitHub, fromListing];
      for (const t of tries) { try { const a = toAlbums(await t()); if (a.length) return a; } catch (e) {} }
      return [];
    }

    // the shelf: one scrapbook per album (cover = its first photo, title, photo count)
    function renderShelf() {
      if (!albums.length) {
        shelfEl.innerHTML = `<div class="album-card empty" style="--tilt:-1deg"><span class="album-paper"></span>` +
          `<span class="album-cover"><span class="pxi pxi-camera"></span></span>` +
          `<span class="album-title">Photos coming soon</span><span class="album-note">Check back later!</span></div>`;
        hint.hidden = true; return;
      }
      shelfEl.innerHTML = albums.map((a, i) => {
        const cover = a.photos[0] && a.photos[0].src;
        return `<button type="button" class="album-card${cover ? "" : " empty"}" data-a="${i}" style="--tilt:${tilt(i)}deg" aria-label="Open album: ${esc(a.title)}">` +
          `<span class="album-paper"></span><span class="album-cover">${cover ? `<img src="${esc(cover)}" alt="" loading="lazy" />` : `<span class="pxi pxi-camera"></span>`}</span>` +
          `<span class="album-title">${esc(a.title)}</span>` +
          `<span class="album-note">${a.note ? esc(a.note) + " · " : ""}${count(a.photos.length)}</span></button>`;
      }).join("");
      if (viewEl.hidden) hint.hidden = false;
    }
    shelfEl.innerHTML = `<p class="album-loading">Loading albums…</p>`; hint.hidden = true;
    load().then((a) => { albums = a; renderShelf(); });

    function shelf() {
      lb.hidden = true; document.body.classList.remove("lb-open");
      viewEl.hidden = true; shelfEl.hidden = false;
      hint.hidden = !albums.length; hint.textContent = "Pick an album";
      if (lastAlbum) { lastAlbum.focus({ preventScroll: true }); lastAlbum = null; }
    }
    function openAlbum(i) {
      const a = albums[i];
      photos = a.photos;
      $("#albumTitle").textContent = a.title || "Album";
      $("#albumNote").textContent = [a.note, count(photos.length)].filter(Boolean).join(" · ");
      album.innerHTML = photos.length ? photos.map((p, j) =>
        `<figure class="photo-card" style="--tilt:${tilt(j)}deg">` +
        `<button class="photo-frame" data-i="${j}" aria-label="Open photo: ${esc(p.caption || "photo " + (j + 1))}">` +
        `<img src="${esc(p.src)}" alt="${esc(p.caption || "")}" loading="lazy"${focus(p.focus)} /></button>` +
        `<figcaption><b>${esc(p.caption || "")}</b>${meta(p) ? `<span>${esc(meta(p))}</span>` : ""}` +
        `<span class="photo-talk" data-talk="${esc(p.key)}" data-no-i18n hidden></span></figcaption></figure>`).join("")
        : Array.from({ length: 3 }, (_, j) =>
        `<figure class="photo-card empty" style="--tilt:${tilt(j)}deg"><div class="photo-frame"><span class="pxi pxi-camera"></span></div>` +
        `<figcaption><b>Photo coming soon</b></figcaption></figure>`).join("");
      shelfEl.hidden = true; viewEl.hidden = false;
      hint.hidden = !photos.length; hint.textContent = "Tap a photo to see it bigger";
      paintTalk(); notes.load();
      $("#screen-gallery").scrollIntoView({ block: "start" });
      $("#albumBack").focus({ preventScroll: true });
    }
    shelfEl.addEventListener("click", (e) => {
      const b = e.target.closest(".album-card[data-a]"); if (!b) return;
      lastAlbum = b; sfx.select(); openAlbum(+b.dataset.a);
    });
    $("#albumBack").addEventListener("click", () => { sfx.blip(); shelf(); });

    // lightbox (arrows move within the open album)
    function open(i) {
      cur = (i + photos.length) % photos.length;
      const p = photos[cur];
      $("#lbImg").src = p.src; $("#lbImg").alt = p.caption || "";
      $("#lbCap").textContent = p.caption || ""; $("#lbMeta").textContent = meta(p);
      lb.hidden = false; document.body.classList.add("lb-open");
      $("#lbPrev").hidden = $("#lbNext").hidden = photos.length < 2;
      $("#lbClose").focus();
      renderComments(); notes.load();
    }
    // comments under the open photo, and the 💬 count on each photo card
    const commentsOf = (key) => ((notes.data && notes.data.comments) || []).filter((c) => c.photo === key)
      .sort((a, b) => Date.parse(a.time) - Date.parse(b.time));
    function renderComments() {
      if (lb.hidden || !photos[cur]) return;
      const list = commentsOf(photos[cur].key);
      $("#lbList").innerHTML = !notes.data || notes.status === "loading" ? `<li class="lb-empty">Loading comments…</li>`
        : notes.status === "offline" ? `<li class="lb-empty">Comments aren't open yet — check back soon!</li>`
        : notes.status === "error" && !commentsOf(photos[cur].key).length ? `<li class="lb-empty">Couldn't load the comments right now.</li>`
        : list.length ? list.map((c) => `<li><b data-no-i18n>${esc(c.name)}</b><time data-no-i18n>${esc(notes.date(c.time))}</time>` +
          `<p data-no-i18n>${esc(c.text)}</p></li>`).join("")
        : `<li class="lb-empty">No comments yet — say something nice! 💬</li>`;
      $("#lbList").scrollTop = $("#lbList").scrollHeight;
    }
    function paintTalk() {
      $$("[data-talk]", album).forEach((x) => {
        const n = commentsOf(x.dataset.talk).length;
        x.hidden = !n; x.textContent = `💬 ${n}`;
      });
    }
    notes.on(() => { renderComments(); paintTalk(); });
    notes.wire($("#lbForm"), "comment", () => ({ photo: photos[cur].key }), 300);
    function close() { lb.hidden = true; document.body.classList.remove("lb-open"); if (opener) opener.focus(); }
    album.addEventListener("click", (e) => { const b = e.target.closest(".photo-frame[data-i]"); if (!b) return; opener = b; sfx.select(); open(+b.dataset.i); });
    $("#lbPrev").addEventListener("click", () => { sfx.blip(); open(cur - 1); });
    $("#lbNext").addEventListener("click", () => { sfx.blip(); open(cur + 1); });
    $("#lbClose").addEventListener("click", close);
    lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
    window.addEventListener("keydown", (e) => {
      if (!lb.hidden) {
        if (e.key !== "Escape" && e.target.closest && e.target.closest("input, textarea")) return; // typing a comment
        if (e.key === "Escape") close();
        else if (e.key === "ArrowLeft") open(cur - 1);
        else if (e.key === "ArrowRight") open(cur + 1);
        return;
      }
      if (e.key === "Escape" && !$("#screen-gallery").hidden && !viewEl.hidden) { sfx.blip(); shelf(); }
    });
    return { shelf, relang: () => { renderComments(); } };
  })();

  /* ================= TRAVEL MAP ================= */
  const pinInfo = {
    airport: "✈ <b>RDU Airport</b> — Raleigh-Durham International. ~25 min drive to Duke. Chin-Yi's least favorite spot on the map, too many goodbyes with Sixuan here.",
    chapel: "⛪ <b>Duke Chapel</b> — 401 Chapel Dr, Durham. Ceremony location! <a href='https://maps.google.com/?q=Duke+Chapel' target='_blank' rel='noopener'>Directions ↗</a>",
    hotel: "🏢 <b>Durham Downtown</b> — A lively hub for dining, shopping, arts, and local culture.",
    food: "🍽️ <b>Parizade</b> — One of the oldest restaurants in Durham. It features a Mediterranean style menu and will host the cocktail hour, reception dinner and dance party. <a href='https://maps.app.goo.gl/B8QxCbtWU9Mq2k4z5' target='_blank' rel='noopener'>Directions ↗</a>",
    home: "🏡 <b>Home</b> — Where Chin-Yi, Sixuan and Leia live. Our little base camp in Durham! Sorry, Jeffrey.",
    chapelhill: "🎓 <b>Chapel Hill</b> — A cute college town with cafés and shops on Franklin Street. Home of Duke's rival UNC, though that hasn't stopped Chin-Yi, Sixuan, and Jeffrey from going to the bars on Franklin Street. About 20 min from Duke.",
    airbnb: "🏠 <b>Party House</b> — A big house with a basketball court, fire pit, and 6 bedrooms. The after party will be here! About 30 min from Duke. The house is not open to the public, so please RSVP to get the address.",
    cary: "🏘️ <b>Cary</b> — A quiet, friendly town with lovely parks and shops close to RDU and I-40. Fun fact: Cary is a sister city of Hsinchu, Taiwan!",
    raleigh: "🏛️ <b>Raleigh</b> — North Carolina's capital: free museums, food halls and the State Capitol. About 35 min from Duke.",
  };
  // Clicking a place opens a pop-up with its photo and description.
  // Photo: assets/places/<name>.jpg (or .png / .webp), <name> = the data-pin of the place, e.g. assets/places/chapel.jpg.
  // No photo yet? The pop-up shows that spot of the map, zoomed in.
  (() => {
    const pop = $("#placePop"), img = $("img", pop), frame = $(".place-photo", pop);
    const title = $("#placeTitle"), text = $(".place-text", pop);
    // the map picture comes in each language: assets/map-en.webp, map-zh-Hant.webp, map-zh-Hans.webp (same layout)
    const mapImg = $("#mapImg");
    const mapSrc = () => `assets/map-${(window.I18N && I18N.lang) || "en"}.webp`;
    const setMap = () => { if (mapImg.getAttribute("src") !== mapSrc()) mapImg.src = mapSrc(); };
    setMap();
    let spot = null, tries = 0;
    const EXT = ["jpg", "png", "webp"];
    function mapCrop(b) {
      // the photo frame is 4:3 like the map, so a square region in % of the map fills it
      const cs = getComputedStyle(b), v = (k) => parseFloat(cs.getPropertyValue(k));
      const l = v("--l"), tp = v("--t"), w = v("--w"), h = v("--h");
      const s = Math.min(100, Math.max(w, h) * 1.6), cx = l + w / 2, cy = tp + h / 2;
      const x = Math.max(0, Math.min(100 - s, cx - s / 2)), y = Math.max(0, Math.min(100 - s, cy - s / 2));
      frame.style.backgroundImage = `url(${mapSrc()})`;
      frame.style.backgroundSize = `${(100 / s) * 100}%`;
      frame.style.backgroundPosition = `${s < 100 ? (x / (100 - s)) * 100 : 0}% ${s < 100 ? (y / (100 - s)) * 100 : 0}%`;
    }
    // Several photos for one place: chapel.jpg, chapel-2.jpg, chapel-3.jpg … (numbers in a row;
    // each can be .jpg, .png or .webp). The pop-up then gets ◀ ▶ arrows (or swipe / arrow keys).
    const MAX = 20, found = {}; // found[pin] = list of photo files that exist
    let photos = [], cur = 0, token = 0;
    const prevB = $(".ph-prev", pop), nextB = $(".ph-next", pop), dots = $(".ph-dots", pop);
    const exists = (src) => new Promise((r) => { const p = new Image(); p.onload = () => r(true); p.onerror = () => r(false); p.src = src; });
    async function findPhotos(pin, onFound) {
      if (found[pin]) { found[pin].forEach(onFound); return; }
      const list = [];
      for (let n = 1; n <= MAX; n++) {
        let hit = null;
        for (const e of EXT) {
          const src = `assets/places/${pin}${n === 1 ? "" : "-" + n}.${e}`;
          if (await exists(src)) { hit = src; break; }
        }
        if (!hit) break;
        list.push(hit); onFound(hit);
      }
      found[pin] = list;
    }
    function show(i) {
      if (!photos.length) { img.hidden = true; mapCrop(spot); return; }
      cur = (i + photos.length) % photos.length;
      img.src = photos[cur]; img.hidden = false; frame.style.backgroundImage = "";
      const many = photos.length > 1;
      prevB.hidden = nextB.hidden = !many;
      dots.innerHTML = many ? photos.map((_, k) => `<i${k === cur ? ' class="on"' : ""}></i>`).join("") : "";
    }
    function tryPhoto() {
      const my = ++token; photos = [];
      findPhotos(spot.dataset.pin, (src) => {
        if (my !== token) return;
        photos.push(src);
        if (photos.length === 1) show(0); else show(cur); // first photo shows at once; later ones add a dot
      });
    }
    const step = (d) => { if (photos.length > 1) { sfx.blip(); show(cur + d); } };
    prevB.addEventListener("click", () => step(-1));
    nextB.addEventListener("click", () => step(1));
    let sx = null; // swipe left / right on phones
    frame.addEventListener("pointerdown", (e) => { sx = e.clientX; });
    frame.addEventListener("pointerup", (e) => { if (sx !== null && Math.abs(e.clientX - sx) > 40) step(e.clientX < sx ? 1 : -1); sx = null; });
    function fill() {
      // "✈ <b>RDU Airport</b> — text": the bold part becomes the title, the rest the description
      const html = t(pinInfo[spot.dataset.pin]);
      const m = html.match(/^(.*?)<b>(.*?)<\/b>\s*[—–-]+\s*(.*)$/s);
      title.innerHTML = m ? `${m[1].trim()} ${m[2]}` : esc(spot.getAttribute("aria-label") || "");
      text.innerHTML = m ? m[3] : html;
      img.alt = title.textContent;
    }
    function open(b) {
      spot = b; cur = 0;
      $$(".map-area [data-pin]").forEach((x) => x.classList.toggle("on", x === b));
      prevB.hidden = nextB.hidden = true; dots.innerHTML = "";
      fill(); img.hidden = true; mapCrop(b); tryPhoto();
      pop.hidden = false; $(".news-close", pop).focus();
    }
    function close() {
      pop.hidden = true;
      $$(".map-area [data-pin]").forEach((x) => x.classList.remove("on"));
      if (spot) spot.focus({ preventScroll: true });
    }
    $$(".map-area [data-pin]").forEach((b) => b.addEventListener("click", () => { sfx.select(); open(b); }));
    pop.addEventListener("click", (e) => { if (e.target === pop || e.target.closest(".news-close")) { sfx.blip(); close(); } });
    window.addEventListener("keydown", (e) => {
      if (pop.hidden) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    });
    document.addEventListener("langchange", () => { setMap(); if (!pop.hidden) { fill(); if (img.hidden) mapCrop(spot); } });
  })();

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
      const opts = CFG.mealOptions.map((m) => `<option value="${esc(m)}">${esc(m)}</option>`).join(""); // value stays English for the sheet
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

  // forms start empty every visit; remove names / RSVPs that older versions saved on the device
  try { localStorage.removeItem("guest-name"); localStorage.removeItem("my-rsvp"); } catch (e) {}
  go(1);

  /* ================= INIT ================= */
  document.addEventListener("langchange", () => { setTitle(); story.relang(); board.render(); gallery.relang(); });
  show(location.hash.slice(1) || "home");
})();
