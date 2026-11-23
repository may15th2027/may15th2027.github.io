// ====== Edit these settings ======
window.WEDDING_CONFIG = {
  // Wedding date/time (local time in Durham, NC — Eastern Time)
  weddingDate: "2027-05-15T16:00:00-04:00",

  // Paste your Google Apps Script Web App URL here to save RSVPs to a Google Sheet.
  // See google-apps-script.gs for setup steps. Leave empty to test locally
  // (RSVPs are then only saved in this browser).
  rsvpEndpoint: "",

  maxGuests: 6,
  mealOptions: ["Chicken", "Fish", "Vegetarian", "Kids meal"],

  // ---- Character cards (top of "Our Story") — stars are out of 5 ----
  // Clicking a card retells the SAME story from that character's point of view.
  characters: [
    {
      name: "Chin-Yi", emoji: "👩", photo: "assets/chinyi.png", tag: "P1",
      className: "Scientist", origin: "Taiwan 🇹🇼", skill: "Overthinking",
      stats: [["Intelligence", 5], ["Curiosity", 5], ["Patience", 3]],
    },
    {
      name: "Sixuan", emoji: "👨", photo: "assets/sixuan.png", tag: "P2",
      className: "Computer Scientist", origin: "China 🇨🇳", skill: "Problem Solving",
      stats: [["Intelligence", 5], ["Patience", 5], ["Communication", 4]],
    },
    {
      name: "Leia", emoji: "🐱", photo: "assets/leia.png", tag: "P3", nameIcon: "🐾",
      className: "Quest Companion", origin: "Home 🏡", skill: "Napping Anywhere",
      stats: [["Cuteness", 5], ["Fluffiness", 5], ["Obedience", 1]],
    },
  ],

  // ---- Our Story: the same 5 moments, each told in 3 versions (Chin-Yi / Sixuan / Leia) ----
  // Each version has its own chapter name, icon, year, place and dialogue —
  // including its own Narrator lines. Each version unlocks chapter by chapter as guests read.
  // Lines in (brackets) are prompts — replace them with your real memories.
  story: [
    {
      moment: "How we met",
      views: {
        "Chin-Yi": { subtitle: "The day we met", emoji: "👀", year: "20XX", place: "Somewhere special", lines: [
          ["Narrator", "Our scientist was deep in a quest of science, not expecting anything new..."],
          ["Chin-Yi", "I remember that day... (Where were you? What was happening?)"],
          ["Chin-Yi", "(What did you first think of Sixuan? Did you overthink it? 😆)"],
        ] },
        "Sixuan": { subtitle: "First sight", emoji: "💡", year: "20XX", place: "Somewhere special", lines: [
          ["Narrator", "Somewhere nearby, a computer scientist was solving problems as usual..."],
          ["Sixuan", "(Where were you when you first saw Chin-Yi?)"],
          ["Sixuan", "(What was your first impression?)"],
        ] },
        "Leia": { subtitle: "Before my time", emoji: "💤", year: "20XX", place: "Somewhere special", lines: [
          ["Narrator", "Long before Leia joined the party, two humans met..."],
          ["Leia", "Meow. I was not born yet. But I have heard this story many, many times."],
          ["Leia", "Apparently it was very romantic. I would have napped through it."],
        ] },
      },
    },
    {
      moment: "First date",
      views: {
        "Chin-Yi": { subtitle: "Butterflies", emoji: "🦋", year: "20XX", place: "A cozy café", lines: [
          ["Narrator", "A party of two was about to form."],
          ["Chin-Yi", "(How did you feel before the first date? Nervous? Excited?)"],
          ["Chin-Yi", "(One thing you remember most from that day.)"],
        ] },
        "Sixuan": { subtitle: "Mission: First Date", emoji: "🗺️", year: "20XX", place: "A cozy café", lines: [
          ["Narrator", "Sixuan accepted the most important mission yet: the first date."],
          ["Sixuan", "(How did you plan the first date?)"],
          ["Sixuan", "(One thing you remember most from that day.)"],
        ] },
        "Leia": { subtitle: "Where are my treats?", emoji: "🐟", year: "20XX", place: "A cozy café", lines: [
          ["Narrator", "Meanwhile, somewhere, a tiny kitten was dreaming of fish."],
          ["Leia", "A date? Did they bring back any treats? No? Disappointing."],
        ] },
      },
    },
    {
      moment: "A new party member",
      views: {
        "Chin-Yi": { subtitle: "Our little fluffball", emoji: "🧶", year: "20XX", place: "Home", lines: [
          ["Narrator", "One day, a wild kitty appeared!"],
          ["Chin-Yi", "(How did you find or adopt Leia?)"],
          ["Chin-Yi", "(What was Leia like on the first day?)"],
        ] },
        "Sixuan": { subtitle: "Who's the boss now?", emoji: "👑", year: "20XX", place: "Home", lines: [
          ["Narrator", "The party grew to three members."],
          ["Sixuan", "(Your memory of bringing Leia home.)"],
          ["Sixuan", "(Who is Leia's favorite? Be honest. 😼)"],
        ] },
        "Leia": { subtitle: "I chose my humans", emoji: "🐾", year: "20XX", place: "Home", lines: [
          ["Narrator", "Leia inspected her new kingdom."],
          ["Leia", "I chose these two humans. They seemed trainable."],
          ["Leia", "Daily quests: nap, eat, sit on the keyboard, judge everyone. Obedience? Never heard of it."],
        ] },
      },
    },
    {
      moment: "The proposal",
      views: {
        "Chin-Yi": { subtitle: "The question", emoji: "💍", year: "20XX", place: "Somewhere magical", lines: [
          ["Narrator", "It seemed like an ordinary day..."],
          ["Chin-Yi", "(Did you see it coming? What went through your head?)"],
          ["Chin-Yi", "YES!!! ♥"],
        ] },
        "Sixuan": { subtitle: "Operation: Ring", emoji: "🔐", year: "20XX", place: "Somewhere magical", lines: [
          ["Narrator", "Sixuan obtained a rare item: ✨ Ring of Forever ✨"],
          ["Sixuan", "(How long did you plan it? Any close calls?)"],
          ["Sixuan", "Will you marry me?"],
        ] },
        "Leia": { subtitle: "The shiny thing", emoji: "✨", year: "20XX", place: "Somewhere magical", lines: [
          ["Narrator", "Leia noticed something shiny..."],
          ["Leia", "There was a shiny ring. I was not allowed to bat it under the sofa."],
          ["Leia", "Then there was crying. Happy crying. Humans are strange."],
        ] },
      },
    },
    {
      moment: "Next: you!",
      views: {
        "Chin-Yi": { subtitle: "Our next chapter", emoji: "⛪", year: "2027", place: "Duke Chapel", lines: [
          ["Narrator", "The final chapter needs one more thing..."],
          ["Chin-Yi", "Our next chapter starts at Duke Chapel on May 15, 2027."],
          ["Chin-Yi", "It wouldn't be complete without you. Please come! ♥"],
        ] },
        "Sixuan": { subtitle: "Party almost complete", emoji: "🎮", year: "2027", place: "Duke Chapel", lines: [
          ["Narrator", "Party status: 3 members. 1 slot open."],
          ["Sixuan", "May 15, 2027 — Duke Chapel. The party is almost complete."],
          ["Sixuan", "We just need one more player: you! ♥"],
        ] },
        "Leia": { subtitle: "Royal approval", emoji: "👑", year: "2027", place: "Duke Chapel", lines: [
          ["Narrator", "Leia has an announcement."],
          ["Leia", "I approve of this wedding. You humans may proceed."],
          ["Leia", "Now go RSVP. Meow. 🐾"],
        ] },
      },
    },
  ],
};
