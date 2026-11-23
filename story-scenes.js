// ===== Animated pixel-art scenes for every story sentence =====
// Key = "<teller>-ch<chapter>-<line>", e.g. "chinyi-ch1-3".
// A real picture in assets/story/<key>.png|.jpg always wins over these drawn scenes.
(() => {
  /* ---------- pixel sprites (one character = one pixel) ---------- */
  const MAPS = {
    chinyi: [
      "....hhhh....",
      "...hhhhhh...",
      "..hhhhhhhh..",
      ".hhhhhhhhhh.",
      ".hhsssssshh.",
      ".hsesssssesh",
      ".hsmssssmsh.",
      "..sssmmsss..",
      "..wccccccw..",
      ".cccwccwccc.",
      ".cccccccccc.",
      "sccccccccccs",
      ".cccccccccc.",
      "..pppppppp..",
      "..ppp..ppp..",
      "..ppp..ppp..",
      "..bbb..bbb..",
    ],
    sixuan: [
      "...hHhHhh...",
      "..hHhhHhHh..",
      ".hhHhhhhHhh.",
      ".hhsssssshh.",
      ".hgegssgegh.",
      "..ssssssss..",
      "..sssmmsss..",
      "...ssssss...",
      "..CccccccC..",
      ".cccccccccc.",
      ".cccccccccc.",
      "sccccccccccs",
      ".cCccccccCc.",
      "..pppppppp..",
      "..ppp..ppp..",
      "..ppp..ppp..",
      "..bbb..bbb..",
    ],
    leia: [
      ".gg......gg.",
      ".gpg....gpg.",
      ".gggggggggg.",
      "gggggggggggg",
      "ggyegggyeggg",
      "gGgggnngggGg",
      ".ggLLLLLLgg.",
      ".gLLLLLLLLg.",
      ".gLLLLLLLLgt",
      ".gggLLLLgggt",
      "..LL....LLt.",
    ],
  };
  // gold-hair + necklace version (the "photos" Chin-Yi saw first)
  MAPS.sixuanGold = MAPS.sixuan.map((r, i) => (i === 8 ? "..CcnnnncC.." : r));
  // friends + shelter cats reuse the same shapes with their own colors
  MAPS.yuya = MAPS.chinyi;
  MAPS.jj = MAPS.eric = MAPS.sixuan;
  MAPS.orange = MAPS.white = MAPS.leia;

  const BASE = { s: "#f6cfae", e: "#2b1a1a", m: "#e8837a", p: "#3b3f5c", b: "#2b1a14" };
  const PALS = {
    chinyi: { ...BASE, h: "#3d2416", c: "#2c3350", w: "#efe0c2" },
    sixuan: { ...BASE, h: "#5a3418", H: "#c98a3a", g: "#d5dcea", c: "#2f5fb8", C: "#244a91" },
    sixuanGold: { ...BASE, h: "#e8c04a", H: "#fff0a0", g: "#d5dcea", c: "#2f5fb8", C: "#244a91", n: "#f7d65a" },
    leia: { g: "#6f6259", G: "#9a8c80", L: "#a89a8e", p: "#e8a3a0", y: "#f2c230", e: "#1a1a1a", n: "#e8837a", t: "#5d5148" },
    yuya: { ...BASE, h: "#6a3b22", c: "#c76b98", w: "#fbe3ee" },
    jj: { ...BASE, h: "#1d1d1d", H: "#333333", g: "#f6cfae", c: "#c0504d", C: "#9a3b38" },
    eric: { ...BASE, h: "#2b1a14", H: "#4a3020", g: "#d5dcea", c: "#4f9a5a", C: "#3c7a46" },
    orange: { g: "#e8913a", G: "#f2b36b", L: "#f7d2a0", p: "#e8a3a0", y: "#7fc45a", e: "#1a1a1a", n: "#e8837a", t: "#c9741f" },
    white: { g: "#e9e6de", G: "#ffffff", L: "#ffffff", p: "#f4b6b2", y: "#6fb7e8", e: "#1a1a1a", n: "#e8837a", t: "#d6d1c6" },
  };
  const OUTFITS = ["#2c3350", "#c0504d", "#4f9a5a"]; // Chin-Yi trying on outfits

  const url = (svg) => "data:image/svg+xml," + encodeURIComponent(svg);
  function sprite(map, pal) {
    const w = Math.max(...map.map((r) => r.length)), h = map.length;
    let r = "";
    map.forEach((row, y) => [...row].forEach((ch, x) => {
      if (pal[ch]) r += `<rect x="${x}" y="${y}" width="1.05" height="1.05" fill="${pal[ch]}"/>`;
    }));
    return url(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges">${r}</svg>`);
  }
  const SPR = {};
  const spr = (name, pal) => SPR[name + JSON.stringify(pal || "")] ||= sprite(MAPS[name], pal || PALS[name]);

  /* ---------- backgrounds (180 x 60 pixel canvas) ---------- */
  const R = (x, y, w, h, c) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`;
  const P = (pts, c) => `<polygon points="${pts}" fill="${c}"/>`;
  const rep = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join("");
  const bgSvg = (body) => url(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 60" preserveAspectRatio="xMidYMax slice" shape-rendering="crispEdges">${body}</svg>`);

  const BG = {
    court: bgSvg(
      R(0, 0, 180, 60, "#d9c49b") + R(0, 0, 180, 6, "#a88f66") +
      rep(5, (i) => R(14 + i * 36, 2, 14, 2, "#fff6c8")) +
      R(0, 22, 180, 2, "#8a3b2f") + R(0, 25, 180, 1, "#1f3b73") +
      R(0, 40, 180, 20, "#d39b54") + rep(16, (i) => R(i * 12, 40, 0.7, 20, "#b98242")) +
      R(0, 48, 180, 1, "#ffffff") + R(0, 40, 180, 1, "#b98242") +
      R(89, 24, 2, 26, "#4a4a4a") + R(84, 28, 12, 1, "#ffffff") +
      rep(6, (i) => R(84 + i * 2, 29, 0.5, 12, "#5a5a5a")) + rep(6, (i) => R(84, 30 + i * 2, 12, 0.5, "#5a5a5a"))
    ),
    restaurant: bgSvg(
      R(0, 0, 180, 60, "#7a4a24") + rep(18, (i) => R(i * 10, 0, 0.8, 34, "#6a3e1c")) +
      R(18, 6, 32, 20, "#5a3418") + R(20, 8, 28, 16, "#f7c58a") + R(33, 8, 2, 16, "#5a3418") +
      R(130, 6, 32, 20, "#5a3418") + R(132, 8, 28, 16, "#f7c58a") + R(145, 8, 2, 16, "#5a3418") +
      R(70, 0, 1, 10, "#2b1a14") + R(66, 10, 9, 3, "#e8b04a") + R(67, 13, 7, 1, "#fff3b0") +
      R(110, 0, 1, 10, "#2b1a14") + R(106, 10, 9, 3, "#e8b04a") + R(107, 13, 7, 1, "#fff3b0") +
      R(0, 34, 180, 6, "#5a3418") + R(0, 40, 180, 20, "#3b2414") +
      rep(9, (i) => R(i * 20 + (i % 2) * 10, 52, 10, 8, "#4a2c14")) +
      R(26, 30, 22, 18, "#a8322d") + R(132, 30, 22, 18, "#a8322d") +
      R(56, 41, 68, 4, "#8b5a2b") + R(56, 45, 68, 1, "#5a3418") + R(62, 46, 3, 10, "#5a3418") + R(115, 46, 3, 10, "#5a3418")
    ),
    shelter: bgSvg(
      R(0, 0, 180, 60, "#efe3cd") + R(0, 0, 180, 4, "#d9c7a5") +
      rep(6, (i) => R(8 + i * 29, 7, 24, 18, "#cdbb97") + rep(8, (j) => R(8 + i * 29 + j * 3, 7, 0.8, 18, "#8c7a5c")) + R(8 + i * 29, 7, 24, 1, "#8c7a5c") + R(8 + i * 29, 24, 24, 1, "#8c7a5c")) +
      R(80, 28, 20, 8, "#f08f87") + R(88, 30, 4, 4, "#ffffff") +
      R(0, 42, 180, 18, "#b8a07a") + rep(7, (i) => R(10 + i * 25, 52 - (i % 2) * 4, 2, 2, "#9c8560") + R(13 + i * 25, 50 - (i % 2) * 4, 1.4, 1.4, "#9c8560"))
    ),
    mountains: bgSvg(
      R(0, 0, 180, 14, "#7fa8ea") + R(0, 14, 180, 10, "#a2c2f2") + R(0, 24, 180, 10, "#f5c3ae") +
      P("0,42 22,24 36,32 58,8 70,20 84,11 100,28 120,15 138,30 158,19 180,33 180,46 0,46", "#66708d") +
      P("54,14 58,8 62,14", "#ffffff") + P("81,16 84,11 87,16", "#ffffff") + P("116,20 120,15 124,20", "#ffffff") + P("155,23 158,19 161,23", "#ffffff") +
      R(0, 40, 180, 6, "#5fa6d6") + R(20, 42, 20, 0.6, "#bfe3f7") + R(110, 43, 26, 0.6, "#bfe3f7") +
      rep(14, (i) => P(`${i * 13 + 2},48 ${i * 13 + 6},${38 - (i % 3) * 2} ${i * 13 + 10},48`, "#2f5d3a")) +
      R(0, 46, 180, 14, "#6aa84f") + rep(12, (i) => R(i * 15 + 4, 52 + (i % 3), 2, 1, "#8cc96a"))
    ),
    home: bgSvg(
      R(0, 0, 180, 60, "#f3d7b4") + rep(30, (i) => R((i * 23) % 180, 4 + ((i * 7) % 34), 1, 1, "#e6c39b")) +
      R(118, 6, 34, 22, "#ffffff") + R(120, 8, 30, 18, "#a9d2f5") + R(134, 8, 2, 18, "#ffffff") + R(120, 16, 30, 1.5, "#ffffff") +
      R(16, 28, 54, 8, "#5b7cc2") + R(14, 34, 58, 10, "#6f8fd1") + R(14, 34, 4, 10, "#5b7cc2") + R(68, 34, 4, 10, "#5b7cc2") +
      R(24, 30, 10, 6, "#f08f87") + R(52, 30, 10, 6, "#f7d36b") +
      R(160, 30, 10, 12, "#a0522d") + P("158,30 165,14 172,30", "#4f9a5a") + R(88, 12, 14, 10, "#c98a4b") + R(90, 14, 10, 6, "#fff3cf") +
      R(0, 44, 180, 16, "#c99a6b") + rep(12, (i) => R(i * 15, 44, 0.6, 16, "#b3845a")) + R(60, 50, 70, 5, "#d98a8a") + R(62, 51, 66, 3, "#e8a3a0")
    ),
    road: bgSvg(
      R(0, 0, 180, 30, "#9fd0f7") + R(20, 6, 18, 4, "#ffffff") + R(120, 10, 24, 4, "#ffffff") +
      P("0,34 30,22 60,32 95,18 130,30 160,20 180,28 180,40 0,40", "#7cbf4a") +
      rep(9, (i) => R(i * 21 + 6, 28, 3, 8, "#6b3f1c") + R(i * 21 + 3, 22, 9, 7, "#3f8a3a")) +
      R(0, 38, 180, 4, "#6aa84f") + R(0, 42, 180, 14, "#555b66") + rep(10, (i) => R(i * 20, 48.5, 10, 1.4, "#ffffff")) + R(0, 56, 180, 4, "#6aa84f")
    ),
    chapel: bgSvg(
      R(0, 0, 180, 12, "#7f76dc") + R(0, 12, 180, 10, "#b48fe0") + R(0, 22, 180, 10, "#f2a9b8") + R(0, 32, 180, 10, "#ffcf9a") +
      R(36, 30, 14, 8, "#ffe08a") + R(38, 28, 10, 2, "#ffe08a") + R(18, 8, 16, 3, "#ffd0dc") + R(150, 12, 20, 3, "#ffd0dc") +
      // chapel hall + roof
      R(96, 26, 60, 22, "#d8c3a0") + P("94,27 126,16 158,27", "#9c8a70") +
      rep(4, (i) => R(101 + i * 14, 31, 4, 8, "#ffd27a") + R(101 + i * 14, 30, 4, 1, "#9c8a70")) +
      // tower with spires
      R(118, 4, 18, 44, "#e0cba6") + R(118, 4, 18, 1, "#b9a27c") + R(116, 18, 22, 1.5, "#b9a27c") +
      P("118,5 120,-3 122,5", "#c9b38c") + P("132,5 134,-3 136,5", "#c9b38c") + P("125,5 127,-6 129,5", "#c9b38c") +
      R(123, 8, 8, 9, "#6b5a8a") + R(126.5, 8, 1, 9, "#e0cba6") + R(123, 22, 8, 10, "#6b5a8a") + R(126.5, 22, 1, 10, "#e0cba6") +
      R(122, 37, 10, 11, "#6b3f1c") + R(124, 39, 6, 9, "#ffcf6b") + R(126.5, 39, 1, 9, "#e0a64a") +
      R(110, 34, 3, 7, "#1f3b8f") + R(141, 34, 3, 7, "#1f3b8f") +
      // trees + lamps
      rep(3, (i) => R(58 + i * 12, 30 - (i % 2) * 4, 12, 14, "#3f8a3a") + R(60 + i * 12, 27 - (i % 2) * 4, 8, 4, "#4fa04a") + R(63 + i * 12, 44, 2, 5, "#5a3418")) +
      rep(2, (i) => R(160 + i * 10, 26 + i * 3, 11, 18, "#3f8a3a") + R(164 + i * 10, 44, 2, 5, "#5a3418")) +
      R(92, 34, 1.2, 15, "#2b1a14") + R(90.5, 32, 4, 3, "#ffe08a") + R(162, 36, 1.2, 13, "#2b1a14") + R(160.5, 34, 4, 3, "#ffe08a") +
      // lawn + path
      R(0, 48, 180, 12, "#6aa84f") + P("122,48 132,48 152,60 102,60", "#e6c98f") +
      rep(14, (i) => R(i * 13 + 3, 52 + (i % 3) * 2, 1.5, 1, i % 2 ? "#ffd0dc" : "#ffffff"))
    ),
  };
  // basketball gym = the court with a hoop instead of the net
  BG.gym = bgSvg(
    R(0, 0, 180, 60, "#d9c49b") + R(0, 0, 180, 6, "#a88f66") + rep(5, (i) => R(14 + i * 36, 2, 14, 2, "#fff6c8")) +
    R(0, 22, 180, 2, "#8a3b2f") + R(0, 25, 180, 1, "#1f3b73") +
    R(0, 40, 180, 20, "#d39b54") + rep(16, (i) => R(i * 12, 40, 0.7, 20, "#b98242")) + R(0, 40, 180, 1, "#b98242") +
    P("120,60 132,44 168,44 180,60", "#c7503f") + R(0, 48, 180, 1, "#ffffff") +
    R(149, 18, 2, 26, "#4a4a4a") + R(140, 8, 20, 12, "#ffffff") + R(140, 8, 20, 1, "#c0504d") + R(140, 19, 20, 1, "#c0504d") +
    R(140, 8, 1, 12, "#c0504d") + R(159, 8, 1, 12, "#c0504d") + R(146, 13, 8, 5, "#ffffff") + R(146, 13, 8, 0.7, "#c0504d") +
    R(144, 20, 12, 1.2, "#e8742c") + rep(5, (i) => R(144.5 + i * 2.6, 21.2, 0.6, 5, "#f4f4f4")) + R(145, 26, 10, 0.6, "#f4f4f4")
  );
  BG.lab = bgSvg(
    R(0, 0, 180, 60, "#dfe7ea") + R(0, 0, 180, 4, "#c4d0d6") +
    R(10, 11, 52, 1.5, "#8a9aa3") + R(10, 23, 52, 1.5, "#8a9aa3") +
    rep(6, (i) => R(13 + i * 8, 6, 3, 5, ["#7fd1c7", "#f2a65a", "#b48fe0"][i % 3]) + R(14 + i * 8, 4.5, 1, 1.5, "#cfd8dc")) +
    rep(5, (i) => R(15 + i * 9, 18, 4, 5, ["#f08f87", "#7fa8ea", "#9ccc65"][i % 3])) +
    R(120, 6, 40, 22, "#ffffff") + R(122, 8, 36, 18, "#a9d2f5") + R(139, 8, 2, 18, "#ffffff") +
    R(86, 25, 3, 10, "#4a4f5a") + R(82, 33, 11, 2, "#4a4f5a") + R(88, 23, 6, 3, "#4a4f5a") +
    R(104, 28, 4, 7, "#9ccc65") + R(105, 26, 2, 2, "#cfd8dc") +
    R(0, 35, 180, 4, "#5e6b73") + R(0, 39, 180, 3, "#3f4a52") + R(0, 42, 180, 18, "#b9c3c8") + rep(12, (i) => R(i * 15, 42, 0.6, 18, "#a3aeb4"))
  );
  BG.cafe = bgSvg(
    R(0, 0, 180, 60, "#2f5d4a") + rep(18, (i) => R(i * 10, 0, 0.8, 34, "#295240")) +
    R(14, 6, 40, 18, "#5a3418") + R(16, 8, 36, 14, "#333333") + rep(4, (i) => R(19, 10 + i * 3, 18 + (i % 2) * 8, 1, "#f2efe6")) +
    R(120, 6, 44, 22, "#5a3418") + R(122, 8, 40, 18, "#bfe3f7") + R(141, 8, 2, 18, "#5a3418") +
    R(80, 0, 1, 8, "#1b1b1b") + R(77, 8, 7, 3, "#f2c94c") + R(100, 0, 1, 8, "#1b1b1b") + R(97, 8, 7, 3, "#f2c94c") +
    R(0, 34, 180, 8, "#8b5a2b") + R(0, 34, 180, 1.5, "#a8743d") + R(62, 29, 5, 5, "#f2efe6") + R(67, 30.5, 1.5, 2, "#f2efe6") +
    R(0, 42, 180, 18, "#6b4a2e") + rep(9, (i) => R(i * 20 + (i % 2) * 10, 52, 10, 8, "#5e4027"))
  );
  BG.woods = bgSvg(
    R(0, 0, 180, 20, "#9fd0f7") + R(0, 20, 180, 12, "#c9e4f7") +
    rep(16, (i) => P(`${i * 12 - 4},46 ${i * 12 + 4},${10 + (i % 3) * 5} ${i * 12 + 12},46`, i % 2 ? "#2f5d3a" : "#3f7a4a")) +
    R(0, 44, 180, 16, "#6aa84f") + P("118,50 134,30 150,50", "#e8742c") + P("130,50 134,41 138,50", "#5a3418") +
    R(58, 52, 12, 2, "#6b3f1c") + P("60,52 64,45 68,52", "#f2a65a") + P("62,52 64,48 66,52", "#ffe08a") +
    rep(10, (i) => R(i * 18 + 5, 55 + (i % 3), 2, 1, "#8cc96a"))
  );
  // Penn State parking lot
  BG.lot = bgSvg(
    R(0, 0, 180, 26, "#9fd0f7") + R(24, 5, 18, 4, "#ffffff") + R(130, 8, 22, 4, "#ffffff") +
    R(40, 12, 70, 22, "#c9b79a") + R(40, 12, 70, 2, "#8c7a5c") + rep(6, (i) => R(46 + i * 11, 17, 6, 5, "#5d7fa8")) + rep(6, (i) => R(46 + i * 11, 25, 6, 5, "#5d7fa8")) +
    rep(5, (i) => R(i * 40 + 4, 22, 3, 12, "#6b3f1c") + R(i * 40, 15, 11, 9, "#3f8a3a")) +
    R(0, 34, 180, 4, "#6aa84f") + R(0, 38, 180, 22, "#5b616c") + rep(10, (i) => R(i * 18 + 4, 39, 1.2, 9, "#ffffff")) +
    R(6, 40, 12, 6, "#c0504d") + R(8, 38, 8, 3, "#a8322d") + R(150, 40, 12, 6, "#4f6fb8") + R(152, 38, 8, 3, "#3c5590") +
    R(0, 52, 180, 1, "#e8c94a")
  );
  const BG_STYLE = {};
  const FLOOR = { lot: 8, court: 10, gym: 10, lab: 10, cafe: 12, woods: 8, restaurant: 22, shelter: 10, mountains: 8, home: 12, road: 14, chapel: 8 };

  /* ---------- scene list ---------- */
  // a = actors: [who, x%, motion, delay]   who: chinyi | sixuan | leia | you | photo
  // p = props:  [emoji or TEXT, x%, y%, motion, size%, delay]
  // fx = extra effect: hearts | confetti | sparkles
  const S = {
    // ===== Chapter 1 — How we met (badminton court) =====
    "chinyi-ch1-1": { bg: "home", force: true, a: [["yuya", 26, "idle"], ["eric", 44, "idle", 0.2], ["chinyi", 74, "idle"]], p: [["💡", 35, 8, "bounce", 13], ["📱", 58, 34, "float", 12, 0.4], ["❓", 74, 8, "pop", 12, 0.8]] },
    "chinyi-ch1-2": { bg: "court", a: [["chinyi", 28, "shake"], ["photo", 64, "float"]], p: [["❌", 78, 22, "pop", 14, 0.7]] },
    "chinyi-ch1-3": { bg: "court", a: [["chinyi", 26, "idle"], ["sixuan", 70, "enterR"]], p: [["✨", 70, 16, "twinkle", 12, 0.9], ["✨", 78, 30, "twinkle", 9, 1.2]] },
    "chinyi-ch1-4": { bg: "court", a: [["chinyi", 28, "jump"], ["sixuan", 68, "flex"]], p: [["😳", 28, 12, "pop"], ["💪", 82, 34, "bounce"]], fx: "hearts" },

    // ===== Sixuan · Ch1 — Match point (basketball → badminton court) =====
    "sixuan-ch1-1": { bg: "gym", a: [["sixuan", 22, "jump"], ["jj", 40, "idle"], ["yuya", 64, "enterR"], ["eric", 80, "enterR", 0.2]], p: [["🏀", 31, 30, "arc", 11], ["💬", 72, 16, "pop", 13, 1.1]] },
    "sixuan-ch1-2": { bg: "home", a: [["sixuan", 44, "flex"]], p: [["👕", 70, 30, "float", 15], ["💪", 26, 34, "bounce", 13], ["✨", 60, 18, "twinkle", 10, 0.4]] },
    "sixuan-ch1-3": { bg: "court", a: [["sixuan", 30, "wave"], ["chinyi", 70, "idle"]], p: [["👋", 42, 22, "pop", 12, 0.3]] },
    "sixuan-ch1-4": { bg: "court", a: [["sixuan", 30, "idle"], ["chinyi", 70, "idle"]], p: [["😍", 30, 10, "pop", 13], ["😊", 70, 12, "pop", 12, 0.4], ["SCORE?", 30, 26, "shake", 7, 0.9], ["🏀", 40, 40, "drop", 11]], fx: "hearts" },

    // ===== Chin-Yi · Ch2 — Butterflies (lab → Texas Roadhouse → Starbucks) =====
    "chinyi-ch2-1": { bg: "lab", a: [["chinyi", 32, "idle"]], p: [["📱", 48, 34, "bounce", 12], ["💬", 62, 18, "pop", 14, 0.4], ["🥩", 62, 17, "pop", 8, 0.7]] },
    "chinyi-ch2-2": { bg: "lab", a: [["chinyi", 40, "shake"]], p: [["😩", 40, 10, "pop", 12], ["🧪", 64, 30, "float", 12], ["💤", 24, 24, "float", 10, 0.3], ["➡️", 78, 44, "nudge", 12, 0.6]] },
    "chinyi-ch2-3": { bg: "lot", a: [["chinyi", 34, "jump"], ["sixuan", 60, "idle"]], p: [["🤤", 34, 8, "pop", 12], ["🥩", 46, 22, "float", 11, 0.4]] },
    "chinyi-ch2-4": { bg: "lot", a: [["chinyi", 34, "walk"], ["sixuan", 56, "wave"]], p: [["🚗", 82, 66, "bounce", 20], ["➡️", 70, 30, "nudge", 12, 0.4]] },
    "chinyi-ch2-5": { bg: "restaurant", a: [["chinyi", 38, "idle"], ["sixuan", 62, "idle"]], p: [["😊", 38, 10, "pop", 12], ["👍", 50, 26, "bounce", 12, 0.5]], fx: "sparkles" },
    "chinyi-ch2-6": { bg: "home", a: [["chinyi", 34, "idle"], ["yuya", 60, "idle"]], p: [["📱", 46, 30, "shake", 12], ["❗", 34, 8, "pop", 12, 0.5], ["☕", 76, 20, "float", 12, 0.8]] },
    "chinyi-ch2-7": { bg: "home", a: [["chinyi", 34, "shake"], ["yuya", 60, "idle"]], p: [["💬", 44, 14, "pop", 12], ["❌", 34, 8, "pop", 12, 0.7], ["😮", 60, 10, "pop", 11, 1]] },
    "chinyi-ch2-8": { bg: "cafe", a: [["chinyi", 36, "idle"], ["sixuan", 62, "idle"]], p: [["💗", 62, 10, "beat", 12], ["☕", 49, 50, "float", 10]] },
    "chinyi-ch2-9": { bg: "cafe", a: [["chinyi", 38, "jump"], ["sixuan", 60, "jump", 0.15]], p: [["YES!", 50, 10, "pop", 9]], fx: "hearts" },

    // ===== Sixuan · Ch2 — Mission: First Date =====
    "sixuan-ch2-1": { bg: "home", a: [["sixuan", 40, "shake"]], p: [["📱", 58, 32, "bounce", 12], ["💬", 68, 16, "pop", 13, 0.4], ["💦", 46, 12, "drop", 9]] },
    "sixuan-ch2-2": { bg: "home", a: [["sixuan", 46, "jump"]], p: [["✅", 50, 12, "pop", 18]], fx: "confetti" },
    "sixuan-ch2-3": { bg: "lot", a: [["sixuan", 36, "shake"], ["chinyi", 66, "enterR", 0.3]], p: [["✨", 28, 18, "twinkle", 10], ["💓", 36, 8, "beat", 10, 0.5], ["😊", 66, 8, "pop", 11, 1.4]] },
    "sixuan-ch2-4": { bg: "restaurant", a: [["chinyi", 38, "wave"], ["sixuan", 62, "idle"]], p: [["⭐", 38, 10, "twinkle", 12], ["🥩", 50, 58, "pop", 12]] },
    "sixuan-ch2-5": { bg: "restaurant", a: [["chinyi", 38, "idle"], ["sixuan", 62, "jump"]], p: [["🥩", 50, 46, "spin", 14], ["😋", 62, 8, "pop", 12, 0.4]] },
    "sixuan-ch2-6": { bg: "road", a: [["chinyi", 40, "walk"], ["sixuan", 58, "walk", 0.2]], p: [["📅", 28, 16, "pop", 10], ["📅", 50, 16, "pop", 10, 0.4], ["📅", 72, 16, "pop", 10, 0.8], ["🐕", 80, 66, "bounce", 12, 0.3]], fx: "hearts" },
    "sixuan-ch2-7": { bg: "cafe", a: [["sixuan", 40, "idle"]], p: [["☕", 58, 40, "float", 12], ["❗", 40, 10, "pop", 12, 0.5], ["📅", 72, 18, "pop", 12, 0.8]] },
    "sixuan-ch2-8": { bg: "cafe", a: [["chinyi", 36, "idle"], ["sixuan", 62, "shake"]], p: [["💗", 62, 10, "beat", 12]] },
    "sixuan-ch2-9": { bg: "cafe", a: [["chinyi", 36, "idle"], ["sixuan", 62, "idle"]], p: [["❓", 36, 10, "bounce", 12], ["💦", 66, 14, "drop", 9]] },
    "sixuan-ch2-10": { bg: "cafe", a: [["chinyi", 36, "idle"], ["sixuan", 62, "shake"]], p: [["💞", 50, 14, "pop", 14]], fx: "sparkles" },
    "sixuan-ch2-11": { bg: "cafe", a: [["chinyi", 36, "idle"], ["sixuan", 62, "idle"]], p: [["✈️", 24, 14, "drift", 12], ["🌏", 36, 10, "pop", 11, 0.4], ["😢", 62, 10, "pop", 11, 0.8]] },
    "sixuan-ch2-12": { bg: "cafe", a: [["chinyi", 36, "idle"], ["sixuan", 62, "idle"]], p: [["⏳", 62, 10, "bounce", 12], ["💪", 76, 30, "pop", 11, 0.5]] },
    "sixuan-ch2-13": { bg: "cafe", a: [["chinyi", 38, "jump"], ["sixuan", 60, "jump", 0.15]], p: [["💑", 50, 10, "pop", 14]], fx: "hearts" },

    // ===== Chin-Yi · Ch3 — The question (Yellowstone → Grand Teton) =====
    "chinyi-ch3-1": { bg: "road", a: [], p: [["🚗", 50, 64, "drive", 24], ["🗺️", 18, 16, "float", 12], ["💭", 74, 18, "pop", 18, 0.4], ["💍", 74, 17, "twinkle", 8, 0.7]] },
    "chinyi-ch3-2": { bg: "mountains", a: [["chinyi", 36, "walk"], ["sixuan", 56, "walk", 0.2]], p: [["⛺", 14, 56, "float", 12], ["☀️", 86, 12, "float", 12], ["🦅", 20, 14, "drift", 10]] },
    "chinyi-ch3-3": { bg: "mountains", a: [["chinyi", 34, "shake"], ["sixuan", 62, "kneel"]], p: [["💍", 52, 48, "twinkle", 13, 0.6], ["😮", 34, 8, "pop", 12, 0.8]] },
    "chinyi-ch3-4": { bg: "mountains", a: [["chinyi", 40, "jump"], ["sixuan", 60, "jump", 0.15]], p: [["💍", 50, 10, "twinkle", 13], ["💨", 30, 40, "float", 10, 0.4], ["😆", 40, 4, "pop", 10, 0.8]], fx: "hearts" },

    // ===== Sixuan · Ch3 — Operation: Ring =====
    "sixuan-ch3-1": { bg: "woods", a: [["chinyi", 30, "idle"], ["sixuan", 48, "idle", 0.2]], p: [["🦬", 84, 40, "bounce", 13], ["🗺️", 18, 16, "float", 12], ["🔥", 64, 70, "twinkle", 10]] },
    "sixuan-ch3-2": { bg: "woods", a: [["sixuan", 36, "idle"], ["chinyi", 72, "sleep"]], p: [["💍", 52, 32, "twinkle", 13], ["🤫", 36, 8, "pop", 12, 0.4]] },
    "sixuan-ch3-3": { bg: "woods", a: [["chinyi", 34, "shake"], ["sixuan", 58, "idle"]], p: [["💭", 74, 16, "pop", 20], ["🚿", 70, 15, "pop", 8, 0.4], ["🍗", 78, 15, "pop", 8, 0.6]] },
    "sixuan-ch3-4": { bg: "mountains", a: [["chinyi", 34, "idle"], ["sixuan", 56, "wave"]], p: [["⛪", 82, 42, "pop", 16, 0.4], ["✨", 88, 30, "twinkle", 9, 0.8]] },
    "sixuan-ch3-5": { bg: "mountains", a: [["chinyi", 34, "shake"], ["sixuan", 56, "kneel"]], p: [["💍", 46, 48, "twinkle", 13, 0.6], ["⛪", 84, 42, "idle", 16]] },
    "sixuan-ch3-6": { bg: "mountains", a: [["chinyi", 36, "jump"], ["sixuan", 56, "jump", 0.15]], p: [["👏", 14, 40, "bounce", 12], ["👏", 84, 40, "bounce", 12, 0.3]], fx: "confetti" },
    "sixuan-ch3-7": { bg: "mountains", a: [["chinyi", 38, "shake"], ["sixuan", 60, "idle"]], p: [["😳", 38, 8, "pop", 12], ["😁", 60, 8, "pop", 12, 0.4]], fx: "hearts" },

    // ===== Chin-Yi · Ch4 — Our little fluffball (the shelter) =====
    "chinyi-ch4-1": { bg: "shelter", a: [["chinyi", 22, "enterL"], ["sixuan", 38, "enterL", 0.2], ["leia", 74, "idle"]], p: [["✨", 74, 40, "twinkle", 11, 0.8], ["🐾", 56, 70, "pop", 9, 1]] },
    "chinyi-ch4-2": { bg: "shelter", a: [["chinyi", 24, "idle"], ["leia", 58, "shake", 0, 1.4]], p: [["🥺", 24, 8, "pop", 12], ["💧", 60, 34, "drop", 9, 0.5]] },
    "chinyi-ch4-3": { bg: "shelter", a: [["chinyi", 30, "idle"], ["sixuan", 60, "idle"]], p: [["🤔", 60, 8, "pop", 12], ["💭", 74, 20, "float", 12, 0.4]] },
    "chinyi-ch4-4": { bg: "shelter", a: [["chinyi", 16, "jump"], ["leia", 42, "shake"], ["orange", 66, "swipe", 0, 1.5]], p: [["❗", 16, 8, "pop", 12], ["💢", 56, 40, "pop", 11, 0.4], ["😾", 66, 28, "pop", 11, 0.6]] },
    "chinyi-ch4-5": { bg: "home", a: [["chinyi", 26, "idle"], ["leia", 50, "jump", 0, 1.35], ["sixuan", 74, "idle"]], p: [["🍗", 50, 26, "bounce", 11], ["😊", 26, 8, "pop", 12, 0.4]], fx: "hearts" },

    // ===== Sixuan · Ch4 — Who's the boss now? (the shelter) =====
    "sixuan-ch4-1": { bg: "road", a: [], p: [["🚗", 50, 64, "drive", 24], ["💙", 22, 20, "beat", 12], ["🐾", 78, 28, "bounce", 12, 0.4]] },
    "sixuan-ch4-2": { bg: "shelter", a: [["chinyi", 38, "jump"], ["sixuan", 64, "idle"]], p: [["CAT!", 38, 6, "shake", 8], ["🐈", 80, 70, "pop", 10, 0.4]] },
    "sixuan-ch4-3": { bg: "shelter", a: [["chinyi", 36, "idle"], ["sixuan", 62, "shake"]], p: [["😅", 62, 8, "pop", 12]] },
    "sixuan-ch4-4": { bg: "shelter", a: [["chinyi", 36, "idle"], ["sixuan", 62, "idle"]], p: [["🥺", 36, 8, "pop", 12], ["💕", 46, 20, "float", 10, 0.5]] },
    "sixuan-ch4-5": { bg: "shelter", a: [["chinyi", 36, "jump"], ["sixuan", 62, "idle"]], p: [["🤷", 62, 8, "pop", 12], ["✅", 50, 18, "pop", 12, 0.6]] },
    "sixuan-ch4-6": { bg: "shelter", a: [["chinyi", 22, "idle"], ["leia", 52, "shake"], ["sixuan", 80, "idle"]], p: [["🏠", 52, 50, "idle", 22], ["💗", 22, 8, "beat", 11], ["😟", 80, 8, "pop", 11, 0.4]] },
    "sixuan-ch4-7": { bg: "shelter", a: [["sixuan", 28, "idle"], ["white", 66, "jump"]], p: [["👉", 46, 44, "nudge", 12], ["⚡", 66, 30, "twinkle", 10]] },
    "sixuan-ch4-8": { bg: "shelter", a: [["chinyi", 26, "idle"], ["leia", 56, "shake"], ["white", 82, "jump", 0, 0.9]], p: [["💗", 56, 28, "beat", 12], ["👍", 82, 34, "pop", 9, 0.5]] },
    "sixuan-ch4-9": { bg: "shelter", a: [["leia", 46, "idle", 0, 1.25], ["sixuan", 74, "idle"]], p: [["LEIA", 46, 10, "pop", 9], ["⭐", 46, 24, "twinkle", 11, 0.4]] },
    "sixuan-ch4-10": { bg: "home", a: [["chinyi", 28, "jump"], ["leia", 50, "jump", 0.15], ["sixuan", 72, "idle"]], p: [["3️⃣", 50, 8, "pop", 13]], fx: "hearts" },

    // ===== Leia · Ch1 — Before my time =====
    "leia-ch1-1": { bg: "home", a: [["leia", 50, "sleep"]], p: [["🌧️", 28, 18, "float", 13], ["❓", 70, 26, "bounce", 12, 0.4]] },
    "leia-ch1-2": { bg: "home", a: [["leia", 50, "idle", 0, 1.4]], p: [["MEOW", 50, 14, "pop", 9]] },

    // ===== Leia · Ch2 — Where are my treats? =====
    "leia-ch2-1": { bg: "road", a: [["leia", 18, "idle"]], p: [["🚜", 56, 62, "drive", 22], ["🌾", 84, 30, "float", 12]] },
    "leia-ch2-2": { bg: "home", a: [["leia", 50, "shake", 0, 1.3]], p: [["😾", 50, 18, "pop", 12], ["?!", 64, 20, "shake", 10, 0.3], ["🍽️", 74, 60, "fade", 12]] },
    "leia-ch2-3": { bg: "shelter", a: [["leia", 30, "sleep", 0, 0.85], ["orange", 62, "idle", 0, 1.4], ["white", 82, "jump"]], p: [["💧", 32, 46, "drop", 9], ["📉", 46, 22, "pop", 12, 0.5]] },

    // ===== Leia · Ch3 — Humans chose me =====
    "leia-ch3-1": { bg: "shelter", a: [["chinyi", 24, "enterL"], ["sixuan", 40, "enterL", 0.2], ["leia", 72, "idle"]], p: [["👀", 72, 40, "blink", 12, 1]] },
    "leia-ch3-2": { bg: "shelter", a: [["orange", 30, "idle"], ["white", 50, "jump"], ["leia", 76, "shake"]], p: [["😿", 76, 40, "pop", 11], ["💦", 82, 40, "drop", 8, 0.4]] },
    "leia-ch3-3": { bg: "shelter", a: [["chinyi", 28, "idle"], ["leia", 64, "shake"]], p: [["👀", 30, 10, "blink", 11], ["💢", 64, 40, "pop", 11, 0.4], ["💭", 82, 24, "pop", 18, 0.7], ["🏠", 82, 23, "pop", 8, 0.9]] },
    "leia-ch3-4": { bg: "road", a: [], p: [["🚗", 50, 64, "drive", 24], ["MEOW!", 50, 28, "shake", 9], ["🏠", 86, 34, "pop", 13, 0.6]] },

    // ===== Leia · Ch4 — A new home =====
    "leia-ch4-1": { bg: "home", a: [["chinyi", 26, "idle"], ["leia", 50, "idle"], ["sixuan", 74, "idle"]], p: [["⏳", 26, 8, "bounce", 11], ["🐟", 50, 38, "bounce", 10, 0.4], ["⏳", 74, 8, "bounce", 11, 0.3]] },
    "leia-ch4-2": { bg: "home", a: [["chinyi", 22, "idle"], ["leia", 52, "idle", 0, 1.3]], p: [["👀", 22, 8, "blink", 11], ["😼", 52, 22, "pop", 11, 0.3], ["🍗", 74, 42, "bounce", 12, 0.6]] },
    "leia-ch4-3": { bg: "home", a: [["leia", 50, "jump", 0, 1.4]], p: [["💖", 50, 18, "beat", 12], ["⚖️", 72, 32, "pop", 12, 0.4]], fx: "sparkles" },
    "leia-ch4-4": { bg: "home", a: [["chinyi", 26, "wave"], ["leia", 50, "idle"], ["sixuan", 74, "wave", 0.2]], p: [["LEIA!", 50, 12, "shake", 9]] },
    "leia-ch4-5": { bg: "home", a: [["leia", 50, "jump", 0, 1.3]], p: [["❗", 50, 26, "pop", 12], ["AH!", 64, 22, "shake", 9, 0.2]] },

    // ===== Chapter 5 — Next: you! (Duke Chapel) =====
    "chinyi-ch5-1": { bg: "chapel", a: [["chinyi", 32, "idle"], ["sixuan", 52, "idle"], ["you", 74, "blink"]], p: [["❓", 74, 14, "bounce", 13]] },
    "chinyi-ch5-2": { bg: "chapel", a: [["chinyi", 40, "idle"], ["sixuan", 60, "idle"]], p: [["📅", 50, 12, "pop", 14]], fx: "sparkles" },
    "chinyi-ch5-3": { bg: "chapel", a: [["chinyi", 36, "wave"], ["sixuan", 64, "wave", 0.2]], p: [["💌", 50, 26, "bounce", 16]], fx: "hearts" },
    "sixuan-ch5-1": { bg: "chapel", a: [["chinyi", 20, "idle"], ["sixuan", 38, "idle"], ["leia", 56, "idle"], ["you", 78, "blink"]], p: [["❓", 78, 14, "blink", 13]] },
    "sixuan-ch5-2": { bg: "chapel", a: [["chinyi", 30, "idle"], ["sixuan", 50, "idle"], ["leia", 68, "idle"]], p: [["📅", 50, 10, "pop", 13], ["🎮", 84, 20, "float", 12]] },
    "sixuan-ch5-3": { bg: "chapel", a: [["chinyi", 20, "wave"], ["sixuan", 38, "wave"], ["leia", 56, "jump"], ["you", 78, "blink"]], p: [["👉", 66, 44, "nudge", 12], ["YOU!", 78, 12, "blink", 9]] },
    "leia-ch5-1": { bg: "chapel", a: [["leia", 46, "idle"]], p: [["📢", 64, 36, "shake", 14]] },
    "leia-ch5-2": { bg: "chapel", a: [["chinyi", 24, "bow"], ["leia", 50, "idle"], ["sixuan", 76, "bow", 0.2]], p: [["👑", 50, 54, "bounce", 11]] },
    "leia-ch5-3": { bg: "chapel", a: [["leia", 46, "jump"]], p: [["💌", 68, 34, "bounce", 15], ["🐾", 24, 78, "pop", 8], ["🐾", 30, 72, "pop", 8, 0.3], ["🐾", 36, 78, "pop", 8, 0.6]] },
  };

  /* ---------- renderer ---------- */
  const HEIGHT = { chinyi: 46, sixuan: 46, you: 46, yuya: 44, jj: 46, eric: 46, leia: 25, orange: 25, white: 25, photo: 40 };
  function actorEl([who, x, motion = "idle", delay = 0, scale = 1], floor) {
    const wrap = document.createElement("div");
    wrap.className = "sc-actor";
    wrap.style.left = x + "%";
    wrap.style.bottom = floor + "%";
    wrap.style.height = HEIGHT[who] * scale + "%";
    const inner = document.createElement("div");
    inner.className = "sc-move m-" + motion;
    inner.style.animationDelay = delay + "s";
    const img = (src, cls = "") => `<img src="${src}" alt="" class="${cls}" draggable="false">`;
    if (who === "photo") {
      inner.innerHTML = `<div class="sc-frame">${img(spr("sixuanGold"))}</div>`;
    } else if (who === "you") {
      inner.innerHTML = img(spr("sixuan"), "sc-ghost");
    } else if (motion === "outfit") {
      inner.innerHTML = OUTFITS.map((c, i) => img(spr("chinyi", { ...PALS.chinyi, c }), "sc-outfit o" + i)).join("");
    } else {
      inner.innerHTML = img(spr(who));
    }
    wrap.appendChild(inner);
    return wrap;
  }
  function propEl([item, x, y, motion = "pop", size = 13, delay = 0]) {
    const wrap = document.createElement("div");
    wrap.className = "sc-prop";
    wrap.style.left = x + "%";
    wrap.style.top = y + "%";
    wrap.style.fontSize = `calc(var(--sc-h) * ${size / 100})`;
    const inner = document.createElement("span");
    inner.className = "sc-move m-" + motion + (/^[A-Z!? ]+$/.test(item) ? " sc-text" : "");
    inner.style.animationDelay = delay + "s";
    inner.textContent = item;
    wrap.appendChild(inner);
    return wrap;
  }
  function fxProps(kind) {
    const out = [];
    if (kind === "hearts") for (let i = 0; i < 7; i++) out.push([["💗", "💖", "💕"][i % 3], 12 + i * 12.5, 70, "rise", 9, i * 0.35]);
    if (kind === "confetti") for (let i = 0; i < 12; i++) out.push([["🎉", "✨", "🎊", "⭐"][i % 4], 5 + i * 8, -10, "fall", 8, (i % 5) * 0.25]);
    if (kind === "sparkles") for (let i = 0; i < 6; i++) out.push(["✨", 10 + i * 16, 18 + (i % 3) * 18, "twinkle", 8, i * 0.3]);
    return out;
  }

  function render(stage, key) {
    const sc = S[key];
    if (!sc) return false;
    stage.innerHTML = "";
    stage.style.background = BG_STYLE[sc.bg] || `url("${BG[sc.bg]}") center bottom / cover no-repeat`;
    stage.style.setProperty("--sc-h", stage.clientHeight + "px");
    const floor = FLOOR[sc.bg] ?? 10;
    (sc.a || []).forEach((a) => stage.appendChild(actorEl(a, floor)));
    [...(sc.p || []), ...fxProps(sc.fx)].forEach((p) => stage.appendChild(propEl(p)));
    return true;
  }

  /* ---------- Narrator stickers: the storyteller's face for each Narrator line ---------- */
  // files: assets/narrator/<teller>-<mood>.png
  //   chinyi: cheer love surprised giggle wink · sixuan: laugh smile surprised thinking lol
  //   leia: stare happy curious yell grumpy
  const NARRATOR_DEFAULT = { chinyi: "wink", sixuan: "smile", leia: "stare" };
  const NARRATOR = {
    "chinyi-ch1-1": "wink", "chinyi-ch1-3": "surprised",
    "chinyi-ch2-1": "love", "chinyi-ch2-2": "giggle", "chinyi-ch2-5": "love", "chinyi-ch2-6": "surprised", "chinyi-ch2-9": "giggle",
    "chinyi-ch3-1": "wink", "chinyi-ch3-2": "cheer",
    "chinyi-ch4-1": "love", "chinyi-ch4-5": "cheer",
    "chinyi-ch5-1": "wink",
    "sixuan-ch1-1": "smile", "sixuan-ch1-2": "laugh", "sixuan-ch1-4": "surprised",
    "sixuan-ch2-1": "thinking", "sixuan-ch2-3": "smile", "sixuan-ch2-6": "laugh", "sixuan-ch2-7": "surprised",
    "sixuan-ch3-1": "smile", "sixuan-ch3-2": "thinking", "sixuan-ch3-5": "surprised", "sixuan-ch3-6": "lol",
    "sixuan-ch4-1": "smile", "sixuan-ch4-5": "lol", "sixuan-ch4-6": "thinking",
    "sixuan-ch5-1": "laugh",
    "leia-ch1-1": "stare", "leia-ch2-1": "curious", "leia-ch2-3": "grumpy",
    "leia-ch3-1": "stare", "leia-ch3-4": "yell",
    "leia-ch4-1": "curious", "leia-ch4-3": "happy",
    "leia-ch5-1": "yell",
  };
  // lines spoken by a character: the mood of that speaker's sticker
  const SPOKEN = {
    "chinyi-ch1-2": "surprised", "chinyi-ch1-4": "surprised",
    "chinyi-ch2-3": "cheer", "chinyi-ch2-4": "laugh", "chinyi-ch2-7": "surprised", "chinyi-ch2-8": "smile",
    "chinyi-ch3-3": "smile", "chinyi-ch3-4": "giggle",
    "chinyi-ch4-2": "love", "chinyi-ch4-3": "thinking", "chinyi-ch4-4": "surprised",
    "chinyi-ch5-2": "cheer", "chinyi-ch5-3": "love",
    "sixuan-ch1-3": "smile",
    "sixuan-ch2-2": "laugh", "sixuan-ch2-4": "cheer", "sixuan-ch2-5": "lol", "sixuan-ch2-8": "smile", "sixuan-ch2-9": "wink",
    "sixuan-ch2-10": "smile", "sixuan-ch2-11": "surprised", "sixuan-ch2-12": "smile", "sixuan-ch2-13": "love",
    "sixuan-ch3-3": "giggle", "sixuan-ch3-4": "laugh", "sixuan-ch3-7": "giggle",
    "sixuan-ch4-2": "cheer", "sixuan-ch4-3": "surprised", "sixuan-ch4-4": "wink", "sixuan-ch4-7": "thinking",
    "sixuan-ch4-8": "love", "sixuan-ch4-9": "smile", "sixuan-ch4-10": "cheer",
    "sixuan-ch5-2": "smile", "sixuan-ch5-3": "laugh",
    "leia-ch1-2": "stare", "leia-ch2-2": "yell", "leia-ch3-2": "stare", "leia-ch3-3": "grumpy",
    "leia-ch4-2": "grumpy", "leia-ch4-5": "yell", "leia-ch5-2": "happy", "leia-ch5-3": "yell",
  };
  const MOODS = {
    chinyi: ["cheer", "love", "surprised", "giggle", "wink"],
    sixuan: ["laugh", "smile", "surprised", "thinking", "lol"],
    leia: ["stare", "happy", "curious", "yell", "grumpy"],
  };
  // key = "<teller>-ch<N>-<line>", who = whose sticker set to use (speaker, or teller for Narrator)
  const face = (key, who) => {
    if (!MOODS[who]) return null;
    const teller = key.split("-")[0];
    let mood = who === teller && NARRATOR[key] ? NARRATOR[key] : SPOKEN[key];
    if (!MOODS[who].includes(mood)) mood = NARRATOR_DEFAULT[who];
    return `assets/narrator/${who}-${mood}.png`;
  };

  window.StoryScenes = { has: (key) => !!S[key], forced: (key) => !!(S[key] || {}).force, render, face, bgOf: (key) => (S[key] || {}).bg };
})();
