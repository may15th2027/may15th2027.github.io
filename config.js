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
  // likes / hates = one short line each ("???" until you decide; leave "" to hide the line).
  // ig = Instagram handle (e.g. "leia_the_little_princess"); leave "" to hide the IG line.
  // Clicking a card retells the SAME story from that character's point of view.
  characters: [
    {
      name: "Chin-Yi", emoji: "👩", photo: "assets/chinyi.png", tag: "P1",
      className: "Chemist", origin: "Yilan, Taiwan", skill: "Spontaneous", ig: "pinkpig0720",
      likes: "Napping 😴, Good food 🍖", hates: "Bugs 🐛, Frogs 🐸",
      stats: { STR: 7, DEX: 8, CON: 9, INT: 9, WIS: 6, CHA: 10 },
    },
    {
      name: "Sixuan", emoji: "👨", photo: "assets/sixuan.png", tag: "P2",
      className: "Computer Scientist", origin: "Chunhua, China", skill: "Overthinking", ig: "nickdang1019",
      likes: "Cars 🚗, Tools 🔧", hates: "Sweet potatoes 🍠, (Program) Bugs 👾",
      stats: { STR: 10, DEX: 7, CON: 9, INT: 9, WIS: 6, CHA: 8 },
    },
    {
      name: "Leia", emoji: "🐱", photo: "assets/leia.png", tag: "P3", nameIcon: "🐾",
      className: "Boss", origin: "State College, USA", skill: "Having affair with DK and Square", ig: "leia_the_little_princess",
      likes: "Chin-Yi 💕, Treat 🐟", hates: "Sixuan 😾, Thunder ⛈️",
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
  // ---- Scrolling announcement sign at the top of the home page ----
  // Each line: "text", or { text: "...", go: "rsvp" } to make it a link to a page
  // (home / story / gallery / board / wedding / travel / rsvp). Leave the list empty [] to hide the sign.
  // (Add the Chinese for a new line in i18n.js, or it stays in English.)
  announcements: [
    { text: "💌 Please RSVP by March 1, 2027!", go: "rsvp" },
    { text: "⛪ May 15, 2027 · Duke Chapel, Durham, NC", go: "wedding" },
    { text: "✈️ Coming from far away? See the Travel page", go: "travel" },
    { text: "📸 New photos in the Gallery. Leave us a comment!", go: "gallery" },
    "🐾 Leia says: don't forget to RSVP!",
  ],

  galleryRepo: { repo: "may15th2027/may15th2027.github.io", branch: "master" },

  // ---- Our Story: the same moments, each told in 3 versions (Chin-Yi / Sixuan / Leia) ----
  // Imported from "Story Worksheet.xlsx" (one row per sentence). Each line is
  // [speaker, text, picture (or null), place shown in the badge for that sentence].
  story: [
    {
      moment: "How we met",
      views: {
        "Chin-Yi": { subtitle: "Not my type...?", emoji: "🏸", year: "2024", place: "914's House", lines: [
          ["Narrator", "One day, at a barbecue at 914’s house, Yu-Ya and Eric said Sixuan was coming to State College. They wanted to introduce him to Chin-Yi, so everyone planned to play badminton together.", null, "914's House"],
          ["Chin-Yi", "Are you guys serious? He dyed his hair blond AND wears a necklace... isn’t he kind of a bad boy?", null, "Penn State IM Building · badminton court"],
          ["Narrator", "Just as Chin-Yi was sure she was being pranked... someone walked toward the court.", null, "Penn State IM Building · badminton court"],
          ["Chin-Yi", "Wow... they only told me Sixuan has a nice butt. Nobody mentioned those huge pecs!! 😳", null, "Penn State IM Building · badminton court"],
        ] },
        "Sixuan": { subtitle: "Match point", emoji: "🏀", year: "2024", place: "Penn State IM Building · basketball court", lines: [
          ["Narrator", "One day, while Sixuan and JJ were playing basketball, Yu-Ya and Eric asked if he wanted a girlfriend. They knew a really fun, lively girl, and they’d already planned to play badminton together.", null, "Penn State IM Building · basketball court"],
          ["Narrator", "Sixuan heard that Chin-Yi loves working out, so he put on the shirt that makes him look extra buff 💪 and headed to the badminton court.", null, "JJ’s place"],
          ["Sixuan", "Hi!", null, "Penn State IM Building · badminton court"],
          ["Narrator", "Chin-Yi turned around to say hi. One look at her bright smile and he could tell she was fun, Sixuan fell for her on the spot!", null, "Penn State IM Building · badminton court"],
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
          ["Narrator", "The next day, Chin-Yi went to the lab as usual, and Sixuan texted to ask her out to dinner.", null, "Penn State · Cremer Lab"],
          ["Narrator", "She was exhausted after a long day in the lab and had no time to go home and change, so she went straight to the date.", null, "Penn State · Cremer Lab"],
          ["Chin-Yi", "Hello! Are you hungry? I’m freaking STARVING!", null, "Penn State · Parking Lot"],
          ["Sixuan", "Then let’s hurry to the restaurant!", null, "Penn State · Parking Lot"],
          ["Narrator", "It was a great date. Chin-Yi found Sixuan really caring and down-to-earth, nothing like his blond hair and necklace!", null, "Texas Roadhouse"],
          ["Narrator", "One day, Chin-Yi was hanging out with Yu-Ya when Sixuan texted her to meet up at Starbucks. Chin-Yi had a feeling something was going to happen...", null, "Chin-Yi's Car"],
          ["Chin-Yi", "Yu-Ya, Sixuan says he has something to tell me! What if he wants us to be together? We’ve only known each other a few days. I want to get to know him longer. I can’t just say yes. I’m playing it cool!", null, "Chin-Yi's Car"],
          ["Sixuan", "I like you.", null, "Starbucks"],
          ["Narrator", "Chin-Yi had planned to say no... but Sixuan looked so sincere that she couldn’t help saying yes. ♥", null, "Starbucks"],
        ] },
        "Sixuan": { subtitle: "Mission: First Date", emoji: "🗺️", year: "2024", place: "JJ’s place", lines: [
          ["Narrator", "The next day, Sixuan worked up his courage and asked Chin-Yi out to dinner at Texas Roadhouse.", null, "JJ’s place"],
          ["Sixuan", "Chin-Yi said yes right away! Mission success. First date unlocked. ✅", null, "JJ’s place"],
          ["Narrator", "On the day of the date, he was nervous. Chin-Yi was easygoing and friendly, but he was STILL nervous.", null, "Penn State · Parking Lot"],
          ["Chin-Yi", "Have you ever been to Texas Roadhouse? There aren’t many good places to eat in this little town, but this one’s my favorite.", null, "Texas Roadhouse"],
          ["Sixuan", "I’d never tried it... but it tastes great!", null, "Texas Roadhouse"],
          ["Narrator", "It was a great date. Sixuan kept asking Chin-Yi out over the next few days. They even had a picnic at the town’s dog park, and they grew closer day by day.", null, "State College Dog Park"],
          ["Narrator", "On August 25, 2024, Sixuan asked Chin-Yi to meet him at Starbucks. Something was about to happen...", null, "Starbucks"],
          ["Sixuan", "I like you.", null, "Starbucks"],
          ["Chin-Yi", "And?", null, "Starbucks"],
          ["Sixuan", "Shall we be together?", null, "Starbucks"],
          ["Chin-Yi", "But I’m going back to Taiwan soon, and I don’t know when I’ll be back... it could be months...", null, "Starbucks"],
          ["Sixuan", "I can wait!", null, "Starbucks"],
          ["Chin-Yi", "In that case... sure! Let’s be together. ♥", null, "Starbucks"],
        ] },
        "Leia": { subtitle: "Where are my treats?", emoji: "🐟", year: "2026", place: "A house in State College", lines: [
          ["Narrator", "One day, Stormy was told her owner had gone to live on a farm upstate.", null, "A house in State College"],
          ["Stormy (Leia)", "A farm upstate?! What the heck? Then who’s going to feed me!?", null, "A house in State College"],
          ["Narrator", "She moved to the shelter, but she didn’t fit in very well... and she lost a lot of weight.", null, "Centre County Paws"],
        ] },
      },
    },
    {
      moment: "The proposal",
      views: {
        "Chin-Yi": { subtitle: "The question", emoji: "🏔️", year: "2025", place: "On the road", lines: [
          ["Narrator", "In the months that followed, they went on adventures to lots of places together, and along the way they both realized they had found the right partner.", null, "On the road"],
          ["Narrator", "On June 6, 2025, after two days of camping in Yellowstone National Park, they stopped by Grand Teton...", null, "Grand Teton National Park"],
          ["Sixuan", "Will you marry me?", null, "Grand Teton National Park"],
          ["Chin-Yi", "Of course! ...Though we haven’t showered in two days. We’re officially the stinky couple!!! ♥", null, "Grand Teton National Park"],
        ] },
        "Sixuan": { subtitle: "Operation: Ring", emoji: "🔐", year: "2025", place: "Yellowstone National Park", lines: [
          ["Narrator", "In the months that followed, they went to lots of places for fun, and life together was lively and happy. In June 2025, they took a trip to Yellowstone.", null, "Yellowstone National Park"],
          ["Narrator", "That day Sixuan was driving, and Chin-Yi fell asleep in the passenger seat as usual 🤫 She had no idea Sixuan was going to propose on this trip.", null, "Yellowstone National Park"],
          ["Chin-Yi", "We haven’t showered in two days. I’m hungry, I’m tired, and my head is so itchy!", null, "Yellowstone National Park"],
          ["Sixuan", "There’s a really pretty chapel over at Grand Teton. One last stop, and then we’ll go have a feast!", null, "Grand Teton National Park"],
          ["Narrator", "The chapel really was beautiful, with the mountains rising behind it. Suddenly, Sixuan got down on one knee...", null, "Grand Teton National Park"],
          ["Narrator", "...and the other visitors burst into applause for the newly engaged couple! 👏", null, "Grand Teton National Park"],
          ["Chin-Yi", "How did a shy introvert like you dare to propose in front of all these people?! I’m dying of laughter!", null, "Grand Teton National Park"],
        ] },
        "Leia": { subtitle: "Humans chose me", emoji: "🐾", year: "2026", place: "Centre County Paws", lines: [
          ["Narrator", "One day, a very loud couple walked in. Stormy was terrified. She looked up from her shelter bed and studied them carefully.", null, "Centre County Paws"],
          ["Stormy (Leia)", "I hope they can’t find me. Just keep playing with the other cats... I’m scared.", null, "Centre County Paws"],
          ["Stormy (Leia)", "Why does that woman keep staring at me!? Go away. Stop looking at me. I want to go back to my old home... everything here is so scary.", null, "Centre County Paws"],
          ["Narrator", "Even though she wasn’t happy about it, Stormy became Leia. A shelter worker put her in a carrier, and the couple took her to her new home.", null, "On the way home"],
        ] },
      },
    },
    {
      moment: "A new party member",
      views: {
        "Chin-Yi": { subtitle: "Our little fluffball", emoji: "🧶", year: "2026", place: "Centre County Paws", lines: [
          ["Narrator", "Chin-Yi has always loved animals. One day, Sixuan took her to the shelter to spend time with the animals.", null, "Centre County Paws"],
          ["Chin-Yi", "Look at that grey cat... she’s too scared to come out, and she’s skin and bones. I want to adopt her.", null, "Centre County Paws"],
          ["Sixuan", "Should we think about it a bit more?", null, "Centre County Paws"],
          ["Chin-Yi", "She needs us right now! That fat orange cat keeps bullying her.", null, "Centre County Paws"],
          ["Narrator", "They adopted her and named her Leia. Now she eats well and is much healthier, and Chin-Yi is happy!", null, "Home"],
        ] },
        "Sixuan": { subtitle: "Who’s the boss now?", emoji: "👑", year: "2026", place: "On the way to the shelter", lines: [
          ["Narrator", "One day, Sixuan noticed Chin-Yi was feeling down, so he took her to the animal shelter to spend time with the animals.", null, "On the way to the shelter"],
          ["Chin-Yi", "I want a cat!", null, "Centre County Paws"],
          ["Sixuan", "Didn’t we just come to play with them? Do you really want to adopt one?", null, "Centre County Paws"],
          ["Chin-Yi", "You brought me here, I saw them, so now I want one!", null, "Centre County Paws"],
          ["Narrator", "Sixuan didn’t expect Chin-Yi to adopt a cat, but she looked so happy that he helped her look for the right one.", null, "Centre County Paws"],
          ["Narrator", "Chin-Yi liked a shy grey cat who wouldn’t come out of her little house. Sixuan worried this cat was too shy.", null, "Centre County Paws"],
          ["Sixuan", "How about that friendly, playful calico?", null, "Centre County Paws"],
          ["Chin-Yi", "That one steals everyone’s food like a little gangster. She’ll do just fine without us. But this one needs protecting!", null, "Centre County Paws"],
          ["Sixuan", "Then let’s call her Leia! May she be as brave as Princess Leia.", null, "Centre County Paws"],
          ["Chin-Yi", "Sounds great! ♥", null, "Home"],
        ] },
        "Leia": { subtitle: "A new home", emoji: "✨", year: "2026", place: "Home", lines: [
          ["Narrator", "In her new home, Leia slowly relaxed. She slept a lot and caught up on all the sleep she’d lost at the shelter!", null, "Home"],
          ["Leia", "These two humans always stare at me, especially that woman. But life here is pretty sweet, so I’ll put up with it.", null, "Home"],
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
          ["Narrator", "Party status: 3 of 4. One player missing.", null, "Duke Chapel"],
          ["Sixuan", "May 15, 2027, Duke Chapel. The party is almost complete.", null, "Duke Chapel"],
          ["Sixuan", "We just need one more player: you! ♥", null, "Duke Chapel"],
        ] },
        "Leia": { subtitle: "Royal approval", emoji: "👑", year: "2027", place: "Duke Chapel", lines: [
          ["Narrator", "Leia has an announcement.", null, "Duke Chapel"],
          ["Leia", "I approve of this wedding. You humans may now get married.", null, "Duke Chapel"],
          ["Leia", "Now go RSVP. Meow. 🐾", null, "Duke Chapel"],
        ] },
      },
    },
  ],
};
