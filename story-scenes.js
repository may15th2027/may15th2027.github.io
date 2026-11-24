// ===== Sticker faces for the dialogue portrait =====
// Picks assets/narrator/<who>-<mood>.png for each sentence. Key = "<teller>-ch<chapter>-<line>", e.g. "chinyi-ch1-3".
// (The story pictures themselves come only from assets/story/ — there are no drawn scenes any more.)
(() => {
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

  window.StoryScenes = { face };
})();
