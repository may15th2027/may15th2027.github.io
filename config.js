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
  ],

  // ---- Our Story chapters (edit freely) ----
  story: [
    {
      title: "Chapter 1", subtitle: "How we met", emoji: "🌸", year: "20XX", place: "Somewhere special",
      lines: [
        ["Narrator", "Once upon a time, two adventurers were each wandering their own map..."],
        ["Chin-Yi", "(Replace this with how you two first met!)"],
        ["Sixuan", "(And what you thought the very first time.)"],
      ],
    },
    {
      title: "Chapter 2", subtitle: "First date", emoji: "☕", year: "20XX", place: "A cozy café",
      lines: [
        ["Narrator", "A party of two was formed."],
        ["Sixuan", "(Tell the first-date story here.)"],
      ],
    },
    {
      title: "Chapter 3", subtitle: "A new party member", emoji: "🐱", year: "20XX", place: "Home",
      lines: [
        ["Narrator", "A wild kitty appeared! It joined the party."],
        ["Cat", "Meow. (I am the real boss here.)"],
      ],
    },
    {
      title: "Chapter 4", subtitle: "The proposal", emoji: "💍", year: "20XX", place: "Somewhere magical",
      lines: [
        ["Narrator", "Sixuan used a rare item: ✨ Ring of Forever ✨"],
        ["Sixuan", "Will you marry me?"],
        ["Chin-Yi", "YES!!! ♥"],
        ["Narrator", "Quest unlocked: The Wedding at Duke Chapel."],
      ],
    },
    {
      title: "Chapter 5", subtitle: "Next: you!", emoji: "⛪", year: "2027", place: "Duke Chapel",
      lines: [
        ["Narrator", "The final chapter needs one more thing..."],
        ["Chin-Yi & Sixuan", "YOU! Please join us on May 15, 2027. ♥"],
      ],
    },
  ],
};
