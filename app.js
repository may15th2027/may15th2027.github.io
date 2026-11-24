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
  function tone(freq, dur = 0.07, type = "square", vol = 0.3, when = 0) {
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
    type: () => tone(880 + Math.random() * 120, 0.02, "square", 0.05),
    meow: () => { tone(700, 0.12, "triangle", 0.08); tone(520, 0.18, "triangle", 0.07, 0.1); },
    fanfare: () => [523, 659, 784, 1047, 784, 1047].forEach((f, i) => tone(f, 0.14, "square", 0.05, i * 0.12)),
    error: () => tone(160, 0.15, "sawtooth", 0.04),
  };
  const soundBtn = $("#soundBtn");
  const paintSound = () => (soundBtn.textContent = soundOn ? "♪ ON" : "♪ OFF");
  paintSound();
  // background music (music.js): needs a click/key first, because browsers block sound until then
  function audio() {
    try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); if (actx.state === "suspended") actx.resume(); } catch {}
    return actx;
  }
  function music() { if (!window.BGM) return; if (soundOn && !document.hidden) BGM.play(audio()); else BGM.stop(); }
  const firstGesture = () => { music(); window.removeEventListener("pointerdown", firstGesture); window.removeEventListener("keydown", firstGesture); };
  window.addEventListener("pointerdown", firstGesture);
  window.addEventListener("keydown", firstGesture);
  document.addEventListener("visibilitychange", () => { if (window.BGM && (BGM.playing || !document.hidden)) music(); });
  soundBtn.addEventListener("click", () => { soundOn = !soundOn; store.set("sound", soundOn); paintSound(); sfx.blip(); music(); });

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
  const screens = ["home", "story", "gallery", "wedding", "travel", "rsvp"];
  function show(name) {
    if (!screens.includes(name)) name = "home";
    $$(".screen").forEach((s) => (s.hidden = s.dataset.screen !== name));
    $$(".topnav a").forEach((a) => a.classList.toggle("active", a.dataset.go === name));
    document.body.classList.toggle("sub", name !== "home");
    document.title = name === "home" ? "Chin-Yi & Sixuan" : `${$(`#screen-${name} h2`).textContent.trim()} · Chin-Yi & Sixuan`;
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
    if (e.key === "Escape" && !$("#lightbox").hidden) return;
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
  const catLines = ["Meow! I'm Leia. Did you RSVP yet? 🐾", "Purrr... see you May 15! 💕", "*knocks your phone off the table*", "Mrrp! I'm the ring bearer. 💍"];
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
        <div class="char-portrait${c.photo ? " has-photo" : ""}">${c.photo ? `<img src="${esc(c.photo)}" alt="Pixel portrait of ${esc(c.name)}" />` : esc(c.emoji)}</div>
        <div>
          <div class="char-name">${esc(c.name.toUpperCase())}${c.nameIcon ? ` <span class="name-icon">${esc(c.nameIcon)}</span>` : ""}</div>
          <div class="char-class">Class: <b>${esc(c.className)}</b></div>
        </div>
      </div>
      <dl class="char-info">
        <dt>Origin</dt><dd>${esc(c.origin)}</dd>
        <dt>Special Skill</dt><dd>${esc(c.skill)}</dd>
      </dl>
      <ul class="char-stats">${c.stats.map(([k, n]) => `<li><span>${esc(k)}</span>${stars(n)}</li>`).join("")}</ul>
      <span class="char-play">▶ See the story as ${esc(c.name)}</span>
      <span class="char-select">♥ TELLING THE STORY ♥</span>`;
    card.addEventListener("click", () => {
      sfx.select();
      story.view(c.name, true);
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
    const list = $("#chapterList"), textEl = $("#dialogText"), who = $("#speaker"), dlg = $("#dialog");
    const chapters = CFG.story;
    let viewer = CFG.characters[0].name; // every version belongs to a character; first one by default
    let ch = 0, line = 0, typing = null, full = "";

    // chapter as told by the current character
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
        b.addEventListener("click", () => { sfx.blip(); load(i); });
        li.appendChild(b); list.appendChild(li);
      });
      if (u > 1) {
        const li = document.createElement("li");
        const r = document.createElement("button");
        r.type = "button"; r.className = "restart"; r.textContent = "↺ Restart this story";
        r.addEventListener("click", () => { sfx.blip(); store.set(key(), 1); justUnlocked = -1; load(0); });
        li.appendChild(r); list.appendChild(li);
      }
    }
    // Switch to a character's version. Each version is independent;
    // inside a version, finishing a chapter unlocks the next.
    function view(name, scroll) {
      viewer = name;
      $$(".char", party).forEach((x, i) => {
        const on = CFG.characters[i].name === viewer;
        x.classList.toggle("picked", on); x.setAttribute("aria-pressed", on);
      });
      $("#storyTitle").textContent = `— Our story · told by ${viewer} —`;
      justUnlocked = -1;
      load(Math.min(ch, unlocked() - 1)); // same moment if this version has unlocked it
      if (scroll) $("#storyTitle").scrollIntoView({ behavior: "smooth", block: "start" });
    }
    function load(i) {
      ch = i; line = 0;
      const c = part(i);
      $("#sceneEmoji").textContent = c.emoji;
      $("#sceneYear").textContent = c.year || "—";
      $("#scenePlace").textContent = c.place || "—";
      $("#vnIcon").textContent = c.emoji;
      $("#vnNum").textContent = i + 1;
      $("#vnName").textContent = c.subtitle;
      renderList(); say();
    }
    // ---- one picture per sentence ----
    // 1) a picture named in config (3rd item of the line), else
    // 2) assets/story/<teller>-ch<N>-<line>.png / .jpg (e.g. chinyi-ch1-2.png), else
    // 3) the animated pixel scene from story-scenes.js, else
    // 4) the speaker's portrait, else 5) the chapter icon.
    const photo = $("#scenePhoto"), emojiEl = $("#sceneEmoji"), sceneBox = $("#sceneBox"), stage = $("#sceneStage");
    const slug = (n) => String(n).toLowerCase().replace(/[^a-z0-9]/g, "");
    let sceneToken = 0;
    const imgOk = {}; // remembers which picture files exist
    function setScene() {
      const token = ++sceneToken;
      const [speaker, , pic] = part(ch).lines[line];
      const sceneKey = `${slug(viewer)}-ch${ch + 1}-${line + 1}`;
      const base = `assets/story/${sceneKey}`;
      const chapterBase = `assets/story/${slug(viewer)}-ch${ch + 1}`; // one picture for the whole chapter
      const portrait = (charOf(speaker) || {}).photo;
      const drawn = window.StoryScenes && StoryScenes.has(sceneKey);
      // a drawn scene marked "force" beats the chapter-wide picture (e.g. a different place)
      const useChapterPic = !(drawn && StoryScenes.forced && StoryScenes.forced(sceneKey));
      const tries = [pic && { src: pic, kind: "full" },
                     { src: base + ".png", kind: "full" }, { src: base + ".jpg", kind: "full" },
                     useChapterPic && { src: chapterBase + ".png", kind: "full" }, useChapterPic && { src: chapterBase + ".jpg", kind: "full" },
                     !drawn && portrait && { src: portrait, kind: "portrait" }].filter(Boolean)
                    .filter((t) => imgOk[t.src] !== false);
      const known = tries.find((t) => imgOk[t.src] === true);
      const showEmoji = () => { photo.hidden = true; stage.hidden = true; emojiEl.hidden = false; sceneBox.classList.remove("has-full"); };
      const showDrawn = () => {
        photo.hidden = true; emojiEl.hidden = true; stage.hidden = false;
        sceneBox.classList.add("has-full");
        StoryScenes.render(stage, sceneKey);
      };
      // show the drawn scene right away unless we already know a real picture exists
      if (drawn && !known) showDrawn(); else if (!drawn) stage.hidden = true;
      const attempt = (i) => {
        if (token !== sceneToken) return;
        if (i >= tries.length) return drawn ? null : showEmoji();
        const t = tries[i], img = new Image();
        img.onload = () => {
          imgOk[t.src] = true;
          if (token !== sceneToken) return;
          stage.hidden = true; stage.innerHTML = "";
          photo.src = t.src; photo.className = "scene-photo " + t.kind;
          photo.alt = t.kind === "portrait" ? speaker : `${speaker}: ${part(ch).lines[line][1]}`;
          photo.hidden = false; emojiEl.hidden = true;
          sceneBox.classList.toggle("has-full", t.kind === "full");
          photo.style.animation = "none"; void photo.offsetWidth; photo.style.animation = "";
        };
        img.onerror = () => { imgOk[t.src] = false; attempt(i + 1); };
        img.src = t.src;
      };
      attempt(0);
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
      // both of us speaking ("Chin-Yi & Sixuan") -> the two-of-us picture; end of the story -> the-end.png.
      // Both are landscape pictures, so the portrait box (and the text beside it) gets wider.
      const couple = name === "__end" ? "assets/narrator/the-end.png"
        : !c && namesIn(name).length > 1 ? "assets/narrator/sixuan-and-chinyi.png" : null;
      // "🔓 Unlocked!" message -> unlocked.png (normal size, not landscape)
      const special = couple || (name.startsWith("🔓") ? "assets/narrator/unlocked.png" : null);
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
          const probe = new Image();
          probe.onload = () => { imgOk[face] = true; use(); };
          probe.onerror = () => { imgOk[face] = false; };
          probe.src = face;
        }
      }
    }
    function say() {
      setScene();
      const [name, txt, , place] = part(ch).lines[line];
      $("#scenePlace").textContent = place || part(ch).place || "—"; // each sentence has its own place
      setPortrait(name);
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
      if (line < part(ch).lines.length - 1) { line++; say(); return; }
      // chapter finished → unlock the next chapter of this story
      if (ch < chapters.length - 1) {
        if (unlocked() < ch + 2) {
          // newly unlocked: announce it in the dialogue box, flash it in the chapter list
          store.set(key(), ch + 2);
          justUnlocked = ch + 1;
          renderList();
          const n = part(ch + 1);
          who.textContent = "🔓 Unlocked!"; setPortrait("🔓");
          textEl.textContent = `Chapter ${ch + 2} unlocked: ${n.emoji} ${n.subtitle}\nClick to continue →`;
          full = "__goto:" + (ch + 1);
          sfx.fanfare();
        } else {
          load(ch + 1);
        }
      } else {
        // story finished → RSVP pop-up
        who.textContent = "★"; setPortrait("__end");
        textEl.textContent = "THE END... of the beginning! ♥";
        full = "__end";
        sfx.fanfare();
        setTimeout(openPop, 500);
      }
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
        <p>The next chapter happens at <b>Duke Chapel</b> on <b>May 15, 2027</b> — and we want you in it!</p>
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

    dlg.addEventListener("click", () => {
      if (full === "__end") { sfx.select(); openPop(); return; }
      if (full.startsWith("__goto:")) { sfx.select(); const i = +full.slice(7); justUnlocked = -1; load(i); return; }
      advance();
    });
    window.addEventListener("keydown", (e) => {
      if ($("#screen-story").hidden || !pop.hidden) return;
      if (e.target !== dlg && e.target.closest && e.target.closest("button, a, input, textarea, select")) return;
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); dlg.click(); }
    });
    let entered = false;
    return { view, enter: () => { if (!entered) { entered = true; view(viewer); } } };
  })();

  /* ================= GALLERY (real photos in wooden frames) ================= */
  (function gallery() {
    const photos = (CFG.gallery || []).filter((p) => p && p.src);
    const album = $("#album"), lb = $("#lightbox");
    const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]));
    const meta = (p) => [p.place, p.year].filter(Boolean).join(" · ");
    if (!photos.length) {
      $("#albumHint").hidden = true;
      album.innerHTML = Array.from({ length: 6 }, (_, i) =>
        `<figure class="photo-card empty" style="--tilt:${[-1.5, 1, -.5, 1.5, -1, .5][i]}deg"><div class="photo-frame"><span class="pxi pxi-camera"></span></div>` +
        `<figcaption><b>Photo coming soon</b></figcaption></figure>`).join("");
      return;
    }
    album.innerHTML = photos.map((p, i) =>
      `<figure class="photo-card" style="--tilt:${[-1.5, 1, -.5, 1.5, -1, .5][i % 6]}deg">` +
      `<button class="photo-frame" data-i="${i}" aria-label="Open photo: ${esc(p.caption || "photo " + (i + 1))}">` +
      `<img src="${esc(p.src)}" alt="${esc(p.caption || "")}" loading="lazy" /></button>` +
      `<figcaption><b>${esc(p.caption || "")}</b>${meta(p) ? `<span>${esc(meta(p))}</span>` : ""}</figcaption></figure>`).join("");
    let cur = 0, opener = null;
    function open(i) {
      cur = (i + photos.length) % photos.length;
      const p = photos[cur];
      $("#lbImg").src = p.src; $("#lbImg").alt = p.caption || "";
      $("#lbCap").textContent = p.caption || ""; $("#lbMeta").textContent = meta(p);
      lb.hidden = false; document.body.classList.add("lb-open");
      $("#lbPrev").hidden = $("#lbNext").hidden = photos.length < 2;
      $("#lbClose").focus();
    }
    function close() { lb.hidden = true; document.body.classList.remove("lb-open"); if (opener) opener.focus(); }
    album.addEventListener("click", (e) => { const b = e.target.closest(".photo-frame[data-i]"); if (!b) return; opener = b; sfx.select(); open(+b.dataset.i); });
    $("#lbPrev").addEventListener("click", () => { sfx.blip(); open(cur - 1); });
    $("#lbNext").addEventListener("click", () => { sfx.blip(); open(cur + 1); });
    $("#lbClose").addEventListener("click", close);
    lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
    window.addEventListener("keydown", (e) => {
      if (lb.hidden) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") open(cur - 1);
      else if (e.key === "ArrowRight") open(cur + 1);
    });
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
