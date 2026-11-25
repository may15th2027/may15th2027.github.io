// ====== Edit these settings ======
window.WEDDING_CONFIG = {
  // Wedding date/time (local time in Durham, NC — Eastern Time)
  weddingDate: "2027-05-15T16:00:00-04:00",

  // Paste your Google Apps Script Web App URL here to save RSVPs to a Google Sheet.
  // See google-apps-script.gs for setup steps. Leave empty to test locally
  // (RSVPs are then only saved in this browser).
  rsvpEndpoint: "https://script.google.com/macros/s/AKfycbwfMhNgl21xZMbNrTamUTV7hF6SeNRYd0TXeth_3BAhaSgHN8SimfVtKl6GxJ3k2hz4iQ/exec",

  maxGuests: 6,
  mealOptions: ["Chicken", "Fish", "Vegetarian", "Kids meal"],

  // ---- Character cards (top of "Our Story") ----
  // stats = the six RPG stats on the hexagon chart, each 1–10:
  //   STR strength · DEX dexterity · CON constitution · INT intelligence · WIS wisdom · CHA charisma
  // Clicking a card retells the SAME story from that character's point of view.
  characters: [
    {
      name: "Chin-Yi", emoji: "👩", photo: "assets/chinyi.png", tag: "P1",
      className: "Chemist", origin: "Yilan, Taiwan", skill: "Spontaneous",
      stats: { STR: 7, DEX: 7, CON: 9, INT: 9, WIS: 6, CHA: 10 },
    },
    {
      name: "Sixuan", emoji: "👨", photo: "assets/sixuan.png", tag: "P2",
      className: "Computer Scientist", origin: "Chunhua, China", skill: "Overthinking",
      stats: { STR: 10, DEX: 7, CON: 9, INT: 9, WIS: 6, CHA: 9 },
    },
    {
      name: "Leia", emoji: "🐱", photo: "assets/leia.png", tag: "P3", nameIcon: "🐾",
      className: "Boss", origin: "State College, USA", skill: "Having affair with DK and Square",
      stats: { STR: 5, DEX: 10, CON: 6, INT: 3, WIS: 10, CHA: 10 },
    },
  ],

  // ---- Gallery (real photos, in albums) ----
  // Nothing to list here: the gallery reads the folders by itself.
  //   web/assets/gallery/<Album name>-<Note>/<Photo caption>.jpg   (the "-<Note>" part is optional)
  // Each folder is an album: the name before the first "-" is the album name, the rest is the
  // short note under it ("Leia-The boss of the house"). Each photo's file name (without .jpg)
  // is its caption. Albums and photos are sorted by name; start a name with a number
  // ("1 Our Trips", "2 Leia") to choose the order. The first photo is the album cover.
  // On the live site the list comes from GitHub, so new photos show once they're pushed.
  galleryRepo: { repo: "may15th2027/may15th2027.github.io", branch: "master" },

  // ---- Our Story: the same moments, each told in 3 versions (Chin-Yi / Sixuan / Leia) ----
  // Imported from "Story Worksheet.xlsx" (one row per sentence). Each line is
  // [speaker, text, picture (or null), place shown in the badge for that sentence].
  story: [
    {
      moment: "How we met",
      views: {
        "Chin-Yi": { subtitle: "Not my type...?", emoji: "🏸", year: "2024", place: "914's House", lines: [
          ["Narrator", "Yu-Ya and Eric had a plan: introduce her to a really good guy named Sixuan.", null, "914's House"],
          ["Chin-Yi", "I’d already seen his photos... gold hair, a necklace... Honestly? Not my type at all.", null, "Penn State IM Building · badminton court"],
          ["Narrator", "Then someone new stepped onto the court.", null, "Penn State IM Building · badminton court"],
          ["Chin-Yi", "Wow... that broad chest was definitely NOT in the photos. 😳", null, "Penn State IM Building · badminton court"],
        ] },
        "Sixuan": { subtitle: "Match point", emoji: "🏀", year: "2024", place: "Penn State IM Building · basketball court", lines: [
          ["Narrator", "Sixuan and JJ were playing basketball when Yu-Ya and Eric said they wanted to set him up with someone. He agreed to meet her.", null, "Penn State IM Building · basketball court"],
          ["Narrator", "That day, Sixuan put on the shirt that makes him look extra bulky. 💪", null, "JJ’s place"],
          ["Sixuan", "Hi!", null, "Penn State IM Building · badminton court"],
          ["Narrator", "One smile from Chin-Yi... and he completely forgot the score.", null, "Penn State IM Building · badminton court"],
        ] },
        "Leia": { subtitle: "Before my time", emoji: "💤", year: "Long ago", place: "A house in State College", lines: [
          ["Narrator", "Long ago, Leia had a different name: Stormy. No one knows much about her first owner.", null, "A house in State College"],
          ["Stormy (Leia)", "Meow.", null, "A house in State College"],
        ] },
      },
    },
    {
      moment: "First date",
      views: {
        "Chin-Yi": { subtitle: "Butterflies", emoji: "🦋", year: "2024", place: "Penn State · Cremer Lab", lines: [
          ["Narrator", "Sixuan asked Chin-Yi out to dinner at Texas Roadhouse.", null, "Penn State · Cremer Lab"],
          ["Narrator", "She was exhausted after a long day in the lab, so she skipped the outfit change and went straight to the date.", null, "Penn State · Cremer Lab"],
          ["Chin-Yi", "Hello! How are you? I’m sooo hungry.", null, "Penn State · Parking Lot"],
          ["Sixuan", "Let’s go!", null, "Penn State · Parking Lot"],
          ["Narrator", "It was a great date. After dinner, Chin-Yi thought Sixuan was very considerate.", null, "Texas Roadhouse"],
          ["Narrator", "One day, Chin-Yi was hanging out with Yu-Ya when Sixuan texted her to meet up at Starbucks. Chin-Yi had a feeling something was going to happen...", null, "Joanna's House"],
          ["Chin-Yi", "Yu-Ya, Sixuan wants to meet at Starbucks. I think he’s going to confess! I like him, but it feels like we’re moving too fast... I’m going to say no.", null, "Joanna's House"],
          ["Sixuan", "I like you.", null, "Starbucks"],
          ["Narrator", "Chin-Yi had planned to say no... but Sixuan looked so sincere that she couldn’t help saying yes. ♥", null, "Starbucks"],
        ] },
        "Sixuan": { subtitle: "Mission: First Date", emoji: "🗺️", year: "2024", place: "JJ’s place", lines: [
          ["Narrator", "Sixuan worked up all his courage and asked Chin-Yi out to dinner at Texas Roadhouse.", null, "JJ’s place"],
          ["Sixuan", "Mission success. First date unlocked. ✅", null, "JJ’s place"],
          ["Narrator", "On the day, Sixuan spent extra time making himself look handsome. He was nervous, but Chin-Yi was so chill and friendly that he calmed right down.", null, "Penn State Parking Lot"],
          ["Chin-Yi", "Do you like Texas Roadhouse? It’s my favorite restaurant in State College.", null, "Texas Roadhouse"],
          ["Sixuan", "I’d never tried it... but it tastes great!", null, "Texas Roadhouse"],
          ["Narrator", "It was a great date. Sixuan kept asking Chin-Yi out over the next few days, and they grew closer day by day.", null, "State College Dog Park"],
          ["Narrator", "On August 25, 2024, Sixuan asked Chin-Yi to meet him at Starbucks. Something was about to happen...", null, "Starbucks"],
          ["Sixuan", "I like you.", null, "Starbucks"],
          ["Chin-Yi", "And?", null, "Starbucks"],
          ["Sixuan", "我们要在一起吗？ (Shall we be together?)", null, "Starbucks"],
          ["Chin-Yi", "But I’m going back to Taiwan soon...", null, "Starbucks"],
          ["Sixuan", "I can wait.", null, "Starbucks"],
          ["Chin-Yi", "In that case... of course! Let’s do it. ♥", null, "Starbucks"],
        ] },
        "Leia": { subtitle: "Where are my treats?", emoji: "🐟", year: "20XX", place: "A house in State College", lines: [
          ["Narrator", "One day, Stormy was told her owner had gone to live on a farm upstate.", null, "A house in State College"],
          ["Stormy (Leia)", "A farm upstate?! Then who’s going to feed me!?", null, "A house in State College"],
          ["Narrator", "She moved to the shelter, but she didn’t fit in very well... and she lost a lot of weight.", null, "The shelter"],
        ] },
      },
    },
    {
      moment: "The proposal",
      views: {
        "Chin-Yi": { subtitle: "The question", emoji: "🏔️", year: "2025", place: "On the road", lines: [
          ["Narrator", "In the months that followed, they explored lots of places together. They knew they would get married someday... but Chin-Yi was still waiting for the proposal.", null, "On the road"],
          ["Narrator", "On June 6, 2025, after two days of camping in Yellowstone National Park, they stopped by Grand Teton...", null, "Grand Teton National Park"],
          ["Sixuan", "Will you marry me?", null, "Grand Teton National Park"],
          ["Chin-Yi", "Of course! ...If you don’t mind that I smell bad!!! ♥", null, "Grand Teton National Park"],
        ] },
        "Sixuan": { subtitle: "Operation: Ring", emoji: "🔐", year: "2025", place: "Yellowstone National Park Camp Ground", lines: [
          ["Narrator", "In the months that followed, they went through lots of adventures — good and bad. In June 2025, they took a trip to Yellowstone.", null, "Yellowstone National Park Camp Ground"],
          ["Narrator", "What Chin-Yi didn’t know: Sixuan had been planning to propose on this trip. 🤫", null, "Yellowstone National Park"],
          ["Chin-Yi", "Two days in the woods... I want a shower and a feast!", null, "Yellowstone National Park"],
          ["Sixuan", "One last stop — Grand Teton. There’s a little chapel there that’s really beautiful.", null, "Grand Teton National Park"],
          ["Narrator", "At the chapel, the view was extraordinary, with the mountains rising behind it. Suddenly, Sixuan got down on one knee...", null, "Grand Teton National Park"],
          ["Narrator", "...and the other visitors burst into applause for the newly engaged couple! 👏", null, "Grand Teton National Park"],
          ["Chin-Yi", "I can’t believe you did this in front of all these people!", null, "Grand Teton National Park"],
        ] },
        "Leia": { subtitle: "Humans chose me", emoji: "🐾", year: "20XX", place: "The shelter", lines: [
          ["Narrator", "One day, two loud visitors came into her room. Stormy looked up from her shelter bed and studied them carefully.", null, "The shelter"],
          ["Stormy (Leia)", "I hope they can’t find me. Just keep playing with the other cats... I’m so scared.", null, "The shelter"],
          ["Stormy (Leia)", "Why does that woman keep looking at me!? Go away. Leave me alone. I miss my home... I want to go back.", null, "The shelter"],
          ["Narrator", "And just like that, Stormy became Leia. She was put in a carrier and brought to a new home.", null, "On the way home"],
        ] },
      },
    },
    {
      moment: "A new party member",
      views: {
        "Chin-Yi": { subtitle: "Our little fluffball", emoji: "🧶", year: "20XX", place: "The shelter", lines: [
          ["Narrator", "Chin-Yi had always wanted a pet. One day, Sixuan took her to the shelter.", null, "The shelter"],
          ["Chin-Yi", "Look at that grey cat... she’s so scared and skinny. She needs a home.", null, "The shelter"],
          ["Sixuan", "We need to think about it more.", null, "The shelter"],
          ["Chin-Yi", "She needs us right now! The big orange cat keeps bullying her.", null, "The shelter"],
          ["Narrator", "They named her Leia. She put on a lot of weight, and now she’s healthy — and Chin-Yi is happy!", null, "Home"],
        ] },
        "Sixuan": { subtitle: "Who’s the boss now?", emoji: "👑", year: "20XX", place: "On the way to the shelter", lines: [
          ["Narrator", "One day, Chin-Yi was feeling down, so Sixuan took her to the shelter. He knew how much she loves animals.", null, "On the way to the shelter"],
          ["Chin-Yi", "I need a cat!", null, "The shelter"],
          ["Sixuan", "I thought we just came to play with them, not adopt one.", null, "The shelter"],
          ["Chin-Yi", "I know... but now I want one.", null, "The shelter"],
          ["Narrator", "Sixuan didn’t expect to adopt a cat that day, but Chin-Yi insisted, so he agreed.", null, "The shelter"],
          ["Narrator", "Chin-Yi liked a shy grey cat who wouldn’t come out of her little house. Sixuan worried this cat wouldn’t live up to Chin-Yi’s expectations.", null, "The shelter"],
          ["Sixuan", "How about that energetic white cat?", null, "The shelter"],
          ["Chin-Yi", "That one will do just fine without us. But this one needs us!", null, "The shelter"],
          ["Sixuan", "OK. Let’s call her Leia — may she be as brave as Princess Leia.", null, "The shelter"],
          ["Chin-Yi", "Sounds great! ♥", null, "Home"],
        ] },
        "Leia": { subtitle: "A new home", emoji: "✨", year: "20XX", place: "Home", lines: [
          ["Narrator", "Chin-Yi and Sixuan were very, very patient with her.", null, "Home"],
          ["Leia", "These two humans always stare at me — especially that woman. But the food and this place are much better than the shelter.", null, "Home"],
          ["Narrator", "As time flew by, Leia reached a healthy weight... and found a lot of happiness.", null, "Home"],
          ["Chin-Yi & Sixuan", "Leia!", null, "Home"],
          ["Leia", "Ah!", null, "Home"],
        ] },
      },
    },
    {
      moment: "Next: you!",
      views: {
        "Chin-Yi": { subtitle: "Our next chapter", emoji: "⛪", year: "2027", place: "Duke Chapel", lines: [
          ["Narrator", "The final chapter needs one more thing...", null, "Duke Chapel"],
          ["Chin-Yi", "Our next chapter starts at Duke Chapel on May 15, 2027.", null, "Duke Chapel"],
          ["Chin-Yi", "It wouldn't be complete without you. Please come! ♥", null, "Duke Chapel"],
        ] },
        "Sixuan": { subtitle: "Party almost complete", emoji: "🎮", year: "2027", place: "Duke Chapel", lines: [
          ["Narrator", "Party status: 3 members. 1 slot open.", null, "Duke Chapel"],
          ["Sixuan", "May 15, 2027 — Duke Chapel. The party is almost complete.", null, "Duke Chapel"],
          ["Sixuan", "We just need one more player: you! ♥", null, "Duke Chapel"],
        ] },
        "Leia": { subtitle: "Royal approval", emoji: "👑", year: "2027", place: "Duke Chapel", lines: [
          ["Narrator", "Leia has an announcement.", null, "Duke Chapel"],
          ["Leia", "I approve of this wedding. You humans may proceed.", null, "Duke Chapel"],
          ["Leia", "Now go RSVP. Meow. 🐾", null, "Duke Chapel"],
        ] },
      },
    },
  ],
};
