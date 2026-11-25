// ===== Sticker faces for the dialogue portrait =====
// When a character speaks, their portrait is assets/narrator/<who>-<mood>.png, with the mood picked per line here.
// (Narrator lines always show assets/narrator/narrator.png, so they need no mood.)
(() => {
  // sticker files: assets/narrator/<who>-<mood>.png
  const MOODS = {
    chinyi: ["cheer", "love", "surprised", "giggle", "wink"],
    sixuan: ["laugh", "smile", "surprised", "thinking", "lol"],
    leia: ["stare", "happy", "curious", "yell", "grumpy"],
  };
  // used when a line has no mood below, or a mood that speaker doesn't have
  const DEFAULT = { chinyi: "wink", sixuan: "smile", leia: "stare" };

  // the speaker's mood for each line. Key = "<teller>-ch<chapter>-<line>", e.g. "chinyi-ch1-2" =
  // Chin-Yi's version of the story, chapter 1, line 2 (count every line, Narrator lines too).
  const MOOD = {
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

  // key = "<teller>-ch<N>-<line>", who = the speaker ("chinyi" / "sixuan" / "leia")
  const face = (key, who) => {
    if (!MOODS[who]) return null;
    const mood = MOODS[who].includes(MOOD[key]) ? MOOD[key] : DEFAULT[who];
    return `assets/narrator/${who}-${mood}.png`;
  };

  window.StoryScenes = { face };
})();
