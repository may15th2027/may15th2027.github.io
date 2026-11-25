// ====== Languages: English → 繁體中文 → 简体中文 (the 文 button above the chat button) ======
// Every row is [English, Traditional Chinese, Simplified Chinese]. The English text must match the
// website text exactly (it is looked up as-is); anything without a row simply stays in English.
// To change a translation, edit it here. To translate new text, add a row.
(() => {
  const LANGS = ["en", "zh-Hant", "zh-Hans"];
  const LABEL = { en: "EN", "zh-Hant": "繁", "zh-Hans": "简" };

  // ---------- plain text ----------
  const ROWS = [
    // names
    ["Chin-Yi", "進怡", "进怡"],
    ["Sixuan", "思旋", "思旋"],
    ["Leia", "阿咪", "阿咪"],
    ["CHIN-YI", "進怡", "进怡"],
    ["SIXUAN", "思旋", "思旋"],
    ["LEIA", "阿咪", "阿咪"],
    ["Chin-Yi & Sixuan", "進怡 & 思旋", "进怡 & 思旋"],
    ["Stormy (Leia)", "Stormy（阿咪）", "Stormy（阿咪）"],
    ["Narrator", "旁白", "旁白"],

    // start screen, buttons in the corner, chat
    ["Our Wedding Adventure", "我們的婚禮冒險", "我们的婚礼冒险"],
    ["▶ PRESS START", "▶ 按下開始", "▶ 按下开始"],
    ["or press any key", "或按任意鍵", "或按任意键"],
    ["Start", "開始", "开始"],
    ["Open chat", "開啟聊天", "打开聊天"],
    ["Ask us anything", "有問題問我們", "有问题问我们"],
    ["Toggle sound", "切換音效", "切换音效"],
    ["Sound", "音效", "音效"],
    ["♪ ON", "♪ 開", "♪ 开"],
    ["♪ OFF", "♪ 關", "♪ 关"],
    ["Chat", "聊天", "聊天"],
    ["Ask us anything!", "有問題儘管問！", "有问题尽管问！"],
    ["Close chat", "關閉聊天", "关闭聊天"],
    ["Type your question…", "輸入你的問題…", "输入你的问题…"],
    ["Your question", "你的問題", "你的问题"],
    ["Send", "送出", "发送"],
    ["Hi! 👋 Got a question about the wedding? Ask us anything!", "嗨！👋 對婚禮有什麼問題嗎？儘管問我們！", "嗨！👋 对婚礼有什么问题吗？尽管问我们！"],
    ["You’ll have to figure it out yourself! 🤷‍♀️ All I can tell you is… try pressing the home page background. 🌙✨", "你得自己想辦法囉！🤷‍♀️ 我只能告訴你……試著按住首頁的背景看看。🌙✨", "你得自己想办法啰！🤷‍♀️ 我只能告诉你……试着按住首页的背景看看。🌙✨"],

    // menus
    ["Main", "主選單", "主菜单"],
    ["Menu", "選單", "菜单"],
    ["Home", "首頁", "首页"],
    ["Our Story", "我們的故事", "我们的故事"],
    ["Gallery", "相簿", "相册"],
    ["Wedding", "婚禮", "婚礼"],
    ["Travel", "交通住宿", "交通住宿"],
    ["RSVP", "回覆出席", "回复出席"],

    // title screen
    ["Pixel art: Chin-Yi and Sixuan sitting on a log with their cat, looking toward Duke Chapel at sunset, under a sign reading Chin-Yi & Sixuan, Our Wedding Adventure, We’re Getting Married!",
     "像素畫：進怡和思旋帶著貓坐在木頭上，望向夕陽下的杜克教堂，上方的招牌寫著「進怡 & 思旋，我們的婚禮冒險，我們要結婚了！」",
     "像素画：进怡和思旋带着猫坐在木头上，望向夕阳下的杜克教堂，上方的招牌写着「进怡 & 思旋，我们的婚礼冒险，我们要结婚了！」"],
    ["Pet the cat", "摸摸貓咪", "摸摸猫咪"],
    ["Mailbox: RSVP", "信箱：回覆出席", "信箱：回复出席"],
    ["Heart sign: Forum", "愛心告示牌：留言板", "爱心告示牌：留言板"],
    ["Meow! Did you RSVP yet? 🐾", "喵！你回覆出席了嗎？🐾", "喵！你回复出席了吗？🐾"],
    ["Meow! I'm Leia. Did you RSVP yet? 🐾", "喵！我是阿咪。你回覆出席了嗎？🐾", "喵！我是阿咪。你回复出席了吗？🐾"],
    ["Purrr... see you May 15! 💕", "呼嚕嚕……5月15日見！💕", "呼噜噜……5月15日见！💕"],
    ["*knocks your phone off the table*", "*把你的手機推下桌*", "*把你的手机推下桌*"],
    ["Mrrp! I'm the ring bearer. 💍", "咪！我是戒指花童。💍", "咪！我是戒指花童。💍"],
    ["Wedding details", "婚禮資訊", "婚礼信息"],
    ["The Big Day", "大日子", "大日子"],
    ["May 15, 2027", "2027年5月15日", "2027年5月15日"],
    ["Saturday", "星期六", "星期六"],
    ["Durham, NC", "北卡羅來納州 達勒姆", "北卡罗来纳州 达勒姆"],
    ["Duke Chapel", "杜克教堂", "杜克教堂"],
    ["💌 View Wedding Details", "💌 查看婚禮資訊", "💌 查看婚礼信息"],
    ["Read Our Story", "閱讀我們的故事", "阅读我们的故事"],
    ["Days until the Big Day", "距離大日子還有", "距离大日子还有"],
    ["days", "天", "天"],
    ["hrs", "時", "时"],
    ["min", "分", "分"],
    ["sec", "秒", "秒"],

    // our story
    ["Meet the players", "認識玩家", "认识玩家"],
    ["— Choose your character —", "— 選擇你的角色 —", "— 选择你的角色 —"],
    ["— Chapter select —", "— 選擇章節 —", "— 选择章节 —"],
    ["Class:", "職業：", "职业："],
    ["Origin", "家鄉", "出身"],
    ["personality", "個性", "个性"],
    ["Yilan, Taiwan", "台灣宜蘭", "台湾宜兰"],
    ["Chunhua, China", "中國淳化", "中国淳化"],
    ["State College, USA", "美國 State College", "美国 State College"],
    ["Spontaneous", "隨性", "随性"],
    ["Boss", "老大", "老大"],
    ["Having affair with DK and Square", "跟 DK 和 Square 搞曖昧", "跟 DK 和 Square 搞暧昧"],
    ["♥ TELLING THE STORY ♥", "♥ 正在講故事 ♥", "♥ 正在讲故事 ♥"],
    ["Chemist", "化學家", "化学家"],
    ["Computer Scientist", "電腦科學家", "计算机科学家"],
    ["Overthinking", "想太多", "想太多"],
    ["STR", "力量", "力量"],
    ["DEX", "敏捷", "敏捷"],
    ["CON", "體質", "体质"],
    ["INT", "智力", "智力"],
    ["WIS", "感知", "感知"],
    ["CHA", "魅力", "魅力"],
    ["Strength (STR) — body & drive: fitness, stamina for hard work, getting things done.", "力量（STR）—— 身體素質與執行力：體格、運動爆發力、扛得住高壓任務的硬實力。", "力量（STR）—— 身体素质与执行力：体格、运动爆发力、扛得住高压任务的硬实力。"],
    ["Dexterity (DEX) — quick hands & reflexes: coordination, thinking on your feet, efficiency.", "敏捷（DEX）—— 反應速度與手腳靈巧度：協調性、臨場應變能力、處理事務的效率。", "敏捷（DEX）—— 反应速度与手脚灵巧度：协调性、临场应变能力、处理事务的效率。"],
    ["Constitution (CON) — energy & resilience: staying power, rarely sick, keeps calm under long stress.", "體質（CON）—— 精力上限與抗壓性：續航力、熬夜能力、免疫力，以及心理韌性。", "体质（CON）—— 精力上限与抗压性：续航力、熬夜能力、免疫力，以及心理韧性。"],
    ["Intelligence (INT) — logic & learning: reasoning, expertise, analysing problems, learning fast.", "智力（INT）—— 邏輯思維與學習能力：邏輯推理、專業知識、分析問題與快速學習。", "智力（INT）—— 逻辑思维与学习能力：逻辑推理、专业知识、分析问题与快速学习。"],
    ["Wisdom (WIS) — insight & calm: empathy, intuition, reading the room, staying steady in chaos.", "感知（WIS）—— 洞察力與情緒穩定度：情商、直覺、同理心，在混亂中依然保持冷靜。", "感知（WIS）—— 洞察力与情绪稳定度：情商、直觉、同理心，在混乱中依然保持冷静。"],
    ["Charisma (CHA) — social magic: charm, way with words, leadership, makes friends anywhere.", "魅力（CHA）—— 社交手腕與個人氣場：口才、感染力、領導魅力，走到哪都能打成一片。", "魅力（CHA）—— 社交手腕与个人气场：口才、感染力、领导魅力，走到哪都能打成一片。"],
    ["Go back to the previous line", "回到上一句", "回到上一句"],
    ["◀ Back", "◀ 返回", "◀ 返回"],
    ["Locked", "未解鎖", "未解锁"],
    ["↺ Restart this story", "↺ 重新開始這個故事", "↺ 重新开始这个故事"],
    ["🔓 Unlocked!", "🔓 解鎖！", "🔓 解锁！"],
    ["Click to continue →", "點擊繼續 →", "点击继续 →"],
    ["THE END... of the beginning! ♥", "全劇終……其實才剛開始！♥", "全剧终……其实才刚开始！♥"],
    ["(This chapter hasn't been written yet.)", "（這一章還沒寫好。）", "（这一章还没写好。）"],
    ["Story complete!", "故事完成！", "故事完成！"],
    ["✉ RSVP now", "✉ 立即回覆", "✉ 立即回复"],
    ["Keep exploring", "繼續探索", "继续探索"],

    // story: chapter names
    ["How we met", "我們的相遇", "我们的相遇"],
    ["First date", "第一次約會", "第一次约会"],
    ["The proposal", "求婚", "求婚"],
    ["A new party member", "新隊友", "新队友"],
    ["Next: you!", "下一位：你！", "下一位：你！"],
    ["Not my type...?", "不是我的菜……？", "不是我的菜……？"],
    ["Match point", "賽末點", "赛末点"],
    ["Before my time", "在我來之前", "在我来之前"],
    ["Butterflies", "小鹿亂撞", "小鹿乱撞"],
    ["Mission: First Date", "任務：第一次約會", "任务：第一次约会"],
    ["Where are my treats?", "我的零食呢？", "我的零食呢？"],
    ["The question", "那個問題", "那个问题"],
    ["Operation: Ring", "行動代號：戒指", "行动代号：戒指"],
    ["Humans chose me", "人類選了我", "人类选了我"],
    ["Our little fluffball", "我們的小毛球", "我们的小毛球"],
    ["Who’s the boss now?", "現在誰是老大？", "现在谁是老大？"],
    ["A new home", "新家", "新家"],
    ["Our next chapter", "我們的下一章", "我们的下一章"],
    ["Party almost complete", "隊伍快湊齊了", "队伍快凑齐了"],
    ["Royal approval", "女王批准", "女王批准"],
    ["Long ago", "很久以前", "很久以前"],

    // story: places ("place:" = only when it's a place, e.g. Home = 家, not the Home menu)
    ["914's House", "914 的家", "914 的家"],
    ["Penn State IM Building · badminton court", "賓州州立大學 IM 體育館 · 羽球場", "宾州州立大学 IM 体育馆 · 羽毛球场"],
    ["Penn State IM Building · basketball court", "賓州州立大學 IM 體育館 · 籃球場", "宾州州立大学 IM 体育馆 · 篮球场"],
    ["JJ’s place", "JJ 家", "JJ 家"],
    ["A house in State College", "State College 的一間房子", "State College 的一间房子"],
    ["Penn State · Cremer Lab", "賓州州立大學 · Cremer 實驗室", "宾州州立大学 · Cremer 实验室"],
    ["Penn State · Parking Lot", "賓州州立大學 · 停車場", "宾州州立大学 · 停车场"],
    ["Penn State Parking Lot", "賓州州立大學停車場", "宾州州立大学停车场"],
    ["Texas Roadhouse", "Texas Roadhouse", "Texas Roadhouse"],
    ["Joanna's House", "Joanna 的家", "Joanna 的家"],
    ["Starbucks", "星巴克", "星巴克"],
    ["State College Dog Park", "State College 狗狗公園", "State College 狗狗公园"],
    ["On the road", "在路上", "在路上"],
    ["Grand Teton National Park", "大提頓國家公園", "大提顿国家公园"],
    ["Yellowstone National Park Camp Ground", "黃石國家公園露營地", "黄石国家公园露营地"],
    ["Yellowstone National Park", "黃石國家公園", "黄石国家公园"],
    ["The shelter", "收容所", "收容所"],
    ["On the way home", "回家的路上", "回家的路上"],
    ["On the way to the shelter", "去收容所的路上", "去收容所的路上"],
    ["place:Home", "家", "家"],

    // story: chapter 1
    ["Yu-Ya and Eric had a plan: introduce her to a really good guy named Sixuan.", "Yu-Ya 和 Eric 有個計畫：介紹一個很好的男生給她，他叫思旋。", "Yu-Ya 和 Eric 有个计划：介绍一个很好的男生给她，他叫思旋。"],
    ["I’d already seen his photos... gold hair, a necklace... Honestly? Not my type at all.", "我早就看過他的照片了……金髮、戴項鍊……老實說？完全不是我的菜。", "我早就看过他的照片了……金发、戴项链……老实说？完全不是我的菜。"],
    ["Then someone new stepped onto the court.", "這時，一個陌生人走進了球場。", "这时，一个陌生人走进了球场。"],
    ["Wow... that broad chest was definitely NOT in the photos. 😳", "哇……照片裡可沒有這麼寬的胸膛啊。😳", "哇……照片里可没有这么宽的胸膛啊。😳"],
    ["Sixuan and JJ were playing basketball when Yu-Ya and Eric said they wanted to set him up with someone. He agreed to meet her.", "思旋和 JJ 正在打籃球時，Yu-Ya 和 Eric 說想介紹一個女生給他認識。他答應見個面。", "思旋和 JJ 正在打篮球时，Yu-Ya 和 Eric 说想介绍一个女生给他认识。他答应见个面。"],
    ["That day, Sixuan put on the shirt that makes him look extra bulky. 💪", "那天，思旋特地穿上那件讓他看起來特別壯的上衣。💪", "那天，思旋特地穿上那件让他看起来特别壮的上衣。💪"],
    ["Hi!", "嗨！", "嗨！"],
    ["One smile from Chin-Yi... and he completely forgot the score.", "進怡一個微笑……他就完全忘了比數。", "进怡一个微笑……他就完全忘了比分。"],
    ["Long ago, Leia had a different name: Stormy. No one knows much about her first owner.", "很久以前，阿咪有另一個名字：Stormy。沒人太了解她的第一個主人。", "很久以前，阿咪有另一个名字：Stormy。没人太了解她的第一个主人。"],
    ["Meow.", "喵。", "喵。"],

    // story: chapter 2
    ["Sixuan asked Chin-Yi out to dinner at Texas Roadhouse.", "思旋約進怡去 Texas Roadhouse 吃晚餐。", "思旋约进怡去 Texas Roadhouse 吃晚餐。"],
    ["She was exhausted after a long day in the lab, so she skipped the outfit change and went straight to the date.", "她在實驗室忙了一整天，累壞了，所以沒換衣服就直接去約會。", "她在实验室忙了一整天，累坏了，所以没换衣服就直接去约会。"],
    ["Hello! How are you? I’m sooo hungry.", "哈囉！你好嗎？我好～餓喔。", "哈喽！你好吗？我好～饿哦。"],
    ["Let’s go!", "走吧！", "走吧！"],
    ["It was a great date. After dinner, Chin-Yi thought Sixuan was very considerate.", "那是一次很棒的約會。吃完晚餐，進怡覺得思旋很體貼。", "那是一次很棒的约会。吃完晚餐，进怡觉得思旋很体贴。"],
    ["One day, Chin-Yi was hanging out with Yu-Ya when Sixuan texted her to meet up at Starbucks. Chin-Yi had a feeling something was going to happen...", "有一天，進怡正和 Yu-Ya 在一起，思旋傳訊息約她在星巴克見面。進怡有種預感，好像要發生什麼事……", "有一天，进怡正和 Yu-Ya 在一起，思旋发消息约她在星巴克见面。进怡有种预感，好像要发生什么事……"],
    ["Yu-Ya, Sixuan wants to meet at Starbucks. I think he’s going to confess! I like him, but it feels like we’re moving too fast... I’m going to say no.", "Yu-Ya，思旋約我在星巴克見面。我覺得他要告白了！我喜歡他，可是感覺進展太快了……我要拒絕他。", "Yu-Ya，思旋约我在星巴克见面。我觉得他要表白了！我喜欢他，可是感觉进展太快了……我要拒绝他。"],
    ["I like you.", "我喜歡你。", "我喜欢你。"],
    ["Chin-Yi had planned to say no... but Sixuan looked so sincere that she couldn’t help saying yes. ♥", "進怡本來打算拒絕……但思旋看起來好真誠，她忍不住就答應了。♥", "进怡本来打算拒绝……但思旋看起来好真诚，她忍不住就答应了。♥"],
    ["Sixuan worked up all his courage and asked Chin-Yi out to dinner at Texas Roadhouse.", "思旋鼓起所有勇氣，約進怡去 Texas Roadhouse 吃晚餐。", "思旋鼓起所有勇气，约进怡去 Texas Roadhouse 吃晚餐。"],
    ["Mission success. First date unlocked. ✅", "任務成功。第一次約會，解鎖。✅", "任务成功。第一次约会，解锁。✅"],
    ["On the day, Sixuan spent extra time making himself look handsome. He was nervous, but Chin-Yi was so chill and friendly that he calmed right down.", "約會當天，思旋花了特別多時間打扮。他很緊張，但進怡很隨和又友善，他一下子就放鬆了。", "约会当天，思旋花了特别多时间打扮。他很紧张，但进怡很随和又友善，他一下子就放松了。"],
    ["Do you like Texas Roadhouse? It’s my favorite restaurant in State College.", "你喜歡 Texas Roadhouse 嗎？這是我在 State College 最喜歡的餐廳。", "你喜欢 Texas Roadhouse 吗？这是我在 State College 最喜欢的餐厅。"],
    ["I’d never tried it... but it tastes great!", "我從來沒吃過……但很好吃！", "我从来没吃过……但很好吃！"],
    ["It was a great date. Sixuan kept asking Chin-Yi out over the next few days, and they grew closer day by day.", "那是一次很棒的約會。接下來幾天思旋一直約進怡出去，兩人一天比一天親近。", "那是一次很棒的约会。接下来几天思旋一直约进怡出去，两人一天比一天亲近。"],
    ["On August 25, 2024, Sixuan asked Chin-Yi to meet him at Starbucks. Something was about to happen...", "2024年8月25日，思旋約進怡在星巴克見面。有什麼事就要發生了……", "2024年8月25日，思旋约进怡在星巴克见面。有什么事就要发生了……"],
    ["And?", "然後呢？", "然后呢？"],
    ["我们要在一起吗？ (Shall we be together?)", "我們要在一起嗎？", "我们要在一起吗？"],
    ["But I’m going back to Taiwan soon...", "可是我很快就要回台灣了……", "可是我很快就要回台湾了……"],
    ["I can wait.", "我可以等。", "我可以等。"],
    ["In that case... of course! Let’s do it. ♥", "這樣的話……當然好！我們在一起吧。♥", "这样的话……当然好！我们在一起吧。♥"],
    ["One day, Stormy was told her owner had gone to live on a farm upstate.", "有一天，有人告訴 Stormy，她的主人搬去北邊的農場住了。", "有一天，有人告诉 Stormy，她的主人搬去北边的农场住了。"],
    ["A farm upstate?! Then who’s going to feed me!?", "北邊的農場？！那誰來餵我啊！？", "北边的农场？！那谁来喂我啊！？"],
    ["She moved to the shelter, but she didn’t fit in very well... and she lost a lot of weight.", "她被送到收容所，但過得不太好……瘦了好多。", "她被送到收容所，但过得不太好……瘦了好多。"],

    // story: chapter 3
    ["In the months that followed, they explored lots of places together. They knew they would get married someday... but Chin-Yi was still waiting for the proposal.", "接下來的幾個月，他們一起去了很多地方。他們知道總有一天會結婚……但進怡還在等求婚。", "接下来的几个月，他们一起去了很多地方。他们知道总有一天会结婚……但进怡还在等求婚。"],
    ["On June 6, 2025, after two days of camping in Yellowstone National Park, they stopped by Grand Teton...", "2025年6月6日，在黃石國家公園露營兩天後，他們順道去了大提頓……", "2025年6月6日，在黄石国家公园露营两天后，他们顺道去了大提顿……"],
    ["Will you marry me?", "你願意嫁給我嗎？", "你愿意嫁给我吗？"],
    ["Of course! ...If you don’t mind that I smell bad!!! ♥", "當然願意！……如果你不介意我身上很臭的話！！！♥", "当然愿意！……如果你不介意我身上很臭的话！！！♥"],
    ["In the months that followed, they went through lots of adventures — good and bad. In June 2025, they took a trip to Yellowstone.", "接下來的幾個月，他們一起經歷了許多冒險——有好有壞。2025年6月，他們去了黃石公園旅行。", "接下来的几个月，他们一起经历了许多冒险——有好有坏。2025年6月，他们去了黄石公园旅行。"],
    ["What Chin-Yi didn’t know: Sixuan had been planning to propose on this trip. 🤫", "進怡不知道的是：思旋早就計畫要在這趟旅行中求婚。🤫", "进怡不知道的是：思旋早就计划要在这趟旅行中求婚。🤫"],
    ["Two days in the woods... I want a shower and a feast!", "在森林裡待了兩天……我想洗澡，還想大吃一頓！", "在森林里待了两天……我想洗澡，还想大吃一顿！"],
    ["One last stop — Grand Teton. There’s a little chapel there that’s really beautiful.", "最後一站——大提頓。那裡有一座很漂亮的小教堂。", "最后一站——大提顿。那里有一座很漂亮的小教堂。"],
    ["At the chapel, the view was extraordinary, with the mountains rising behind it. Suddenly, Sixuan got down on one knee...", "教堂的景色美極了，群山就在後面聳立。突然，思旋單膝跪下……", "教堂的景色美极了，群山就在后面耸立。突然，思旋单膝跪下……"],
    ["...and the other visitors burst into applause for the newly engaged couple! 👏", "……其他遊客都為這對剛訂婚的新人熱烈鼓掌！👏", "……其他游客都为这对刚订婚的新人热烈鼓掌！👏"],
    ["I can’t believe you did this in front of all these people!", "真不敢相信你在這麼多人面前求婚！", "真不敢相信你在这么多人面前求婚！"],
    ["One day, two loud visitors came into her room. Stormy looked up from her shelter bed and studied them carefully.", "有一天，兩個很吵的訪客走進她的房間。Stormy 從收容所的小床上抬起頭，仔細打量著他們。", "有一天，两个很吵的访客走进她的房间。Stormy 从收容所的小床上抬起头，仔细打量着他们。"],
    ["I hope they can’t find me. Just keep playing with the other cats... I’m so scared.", "希望他們找不到我。你們繼續跟其他貓玩就好……我好害怕。", "希望他们找不到我。你们继续跟其他猫玩就好……我好害怕。"],
    ["Why does that woman keep looking at me!? Go away. Leave me alone. I miss my home... I want to go back.", "那個女人為什麼一直看我！？走開。別管我。我好想家……我想回去。", "那个女人为什么一直看我！？走开。别管我。我好想家……我想回去。"],
    ["And just like that, Stormy became Leia. She was put in a carrier and brought to a new home.", "就這樣，Stormy 變成了阿咪。她被放進外出籠，帶回了新家。", "就这样，Stormy 变成了阿咪。她被放进外出笼，带回了新家。"],

    // story: chapter 4
    ["Chin-Yi had always wanted a pet. One day, Sixuan took her to the shelter.", "進怡一直很想養寵物。有一天，思旋帶她去了收容所。", "进怡一直很想养宠物。有一天，思旋带她去了收容所。"],
    ["Look at that grey cat... she’s so scared and skinny. She needs a home.", "你看那隻灰貓……她好害怕、好瘦。她需要一個家。", "你看那只灰猫……她好害怕、好瘦。她需要一个家。"],
    ["We need to think about it more.", "我們需要再想想。", "我们需要再想想。"],
    ["She needs us right now! The big orange cat keeps bullying her.", "她現在就需要我們！那隻大橘貓一直欺負她。", "她现在就需要我们！那只大橘猫一直欺负她。"],
    ["They named her Leia. She put on a lot of weight, and now she’s healthy — and Chin-Yi is happy!", "他們幫她取名叫阿咪。她胖了好多，現在很健康——進怡也很開心！", "他们给她取名叫阿咪。她胖了好多，现在很健康——进怡也很开心！"],
    ["One day, Chin-Yi was feeling down, so Sixuan took her to the shelter. He knew how much she loves animals.", "有一天進怡心情不好，思旋就帶她去收容所。他知道她有多愛動物。", "有一天进怡心情不好，思旋就带她去收容所。他知道她有多爱动物。"],
    ["I need a cat!", "我需要一隻貓！", "我需要一只猫！"],
    ["I thought we just came to play with them, not adopt one.", "我以為我們只是來跟牠們玩，不是來領養的。", "我以为我们只是来跟它们玩，不是来领养的。"],
    ["I know... but now I want one.", "我知道……可是我現在想要一隻。", "我知道……可是我现在想要一只。"],
    ["Sixuan didn’t expect to adopt a cat that day, but Chin-Yi insisted, so he agreed.", "思旋沒想到那天會領養貓，但進怡很堅持，他就答應了。", "思旋没想到那天会领养猫，但进怡很坚持，他就答应了。"],
    ["Chin-Yi liked a shy grey cat who wouldn’t come out of her little house. Sixuan worried this cat wouldn’t live up to Chin-Yi’s expectations.", "進怡喜歡一隻躲在小屋裡不肯出來的害羞灰貓。思旋擔心這隻貓達不到進怡的期待。", "进怡喜欢一只躲在小屋里不肯出来的害羞灰猫。思旋担心这只猫达不到进怡的期待。"],
    ["How about that energetic white cat?", "那隻活潑的白貓怎麼樣？", "那只活泼的白猫怎么样？"],
    ["That one will do just fine without us. But this one needs us!", "那隻沒有我們也會過得很好。但這隻需要我們！", "那只没有我们也会过得很好。但这只需要我们！"],
    ["OK. Let’s call her Leia — may she be as brave as Princess Leia.", "好。就叫她 Leia（阿咪）吧——希望她像莉亞公主一樣勇敢。", "好。就叫她 Leia（阿咪）吧——希望她像莱娅公主一样勇敢。"],
    ["Sounds great! ♥", "好啊！♥", "好啊！♥"],
    ["Chin-Yi and Sixuan were very, very patient with her.", "進怡和思旋對她非常、非常有耐心。", "进怡和思旋对她非常、非常有耐心。"],
    ["These two humans always stare at me — especially that woman. But the food and this place are much better than the shelter.", "這兩個人類老是盯著我看——尤其是那個女人。不過這裡的食物和環境比收容所好多了。", "这两个人类老是盯着我看——尤其是那个女人。不过这里的食物和环境比收容所好多了。"],
    ["As time flew by, Leia reached a healthy weight... and found a lot of happiness.", "時光飛逝，阿咪長到了健康的體重……也找到了滿滿的幸福。", "时光飞逝，阿咪长到了健康的体重……也找到了满满的幸福。"],
    ["Leia!", "阿咪！", "阿咪！"],
    ["Ah!", "啊！", "啊！"],

    // story: chapter 5
    ["The final chapter needs one more thing...", "最後一章還少了一樣東西……", "最后一章还少了一样东西……"],
    ["Our next chapter starts at Duke Chapel on May 15, 2027.", "我們的下一章，2027年5月15日在杜克教堂展開。", "我们的下一章，2027年5月15日在杜克教堂展开。"],
    ["It wouldn't be complete without you. Please come! ♥", "少了你就不完整。請一定要來！♥", "少了你就不完整。请一定要来！♥"],
    ["Party status: 3 members. 1 slot open.", "隊伍狀態：3 名成員，還有 1 個空位。", "队伍状态：3 名成员，还有 1 个空位。"],
    ["May 15, 2027 — Duke Chapel. The party is almost complete.", "2027年5月15日——杜克教堂。隊伍快要湊齊了。", "2027年5月15日——杜克教堂。队伍快要凑齐了。"],
    ["We just need one more player: you! ♥", "我們只差一位玩家：就是你！♥", "我们只差一位玩家：就是你！♥"],
    ["Leia has an announcement.", "阿咪有事要宣布。", "阿咪有事要宣布。"],
    ["I approve of this wedding. You humans may proceed.", "本喵批准這場婚禮。人類們，可以開始了。", "本喵批准这场婚礼。人类们，可以开始了。"],
    ["Now go RSVP. Meow. 🐾", "現在快去回覆出席。喵。🐾", "现在快去回复出席。喵。🐾"],

    // gallery
    ["Our photo albums", "我們的相簿", "我们的相册"],
    ["◀ All albums", "◀ 所有相簿", "◀ 所有相册"],
    ["Pick an album", "選一本相簿", "选一本相册"],
    ["Tap a photo to see it bigger", "點照片看大圖", "点照片看大图"],
    ["Loading albums…", "相簿載入中…", "相册加载中…"],
    ["Photos coming soon", "照片即將上傳", "照片即将上传"],
    ["Photo coming soon", "照片即將上傳", "照片即将上传"],
    ["Check back later!", "晚點再來看看！", "晚点再来看看！"],
    ["Album", "相簿", "相册"],
    ["Photo", "照片", "照片"],
    ["Previous photo", "上一張", "上一张"],
    ["Next photo", "下一張", "下一张"],
    ["Close", "關閉", "关闭"],

    // wedding
    ["Main quest", "主線任務", "主线任务"],
    ["Quest Info", "任務資訊", "任务信息"],
    ["Saturday, May 15, 2027", "2027年5月15日（星期六）", "2027年5月15日（星期六）"],
    ["Save the date!", "請預留時間！", "请预留时间！"],
    ["Durham, North Carolina", "北卡羅來納州 達勒姆", "北卡罗来纳州 达勒姆"],
    ["Open in Maps ↗", "在地圖中開啟 ↗", "在地图中打开 ↗"],
    ["Dress code: Formal / Cocktail", "服裝：正式／雞尾酒禮服", "服装：正式／鸡尾酒礼服"],
    ["Comfortable shoes — the quad is grassy!", "建議穿舒適的鞋——廣場是草地！", "建议穿舒适的鞋——广场是草地！"],
    ["✉ Accept this quest (RSVP)", "✉ 接受任務（回覆出席）", "✉ 接受任务（回复出席）"],
    ["Objectives", "任務目標", "任务目标"],
    ["Arrive & find your seat at Duke Chapel", "抵達杜克教堂並入座", "抵达杜克教堂并入座"],
    ["Ceremony — witness the vows 💍", "典禮——見證誓言 💍", "典礼——见证誓言 💍"],
    ["Photos on the quad & cocktail hour 🥂", "草坪合照 & 雞尾酒時間 🥂", "草坪合照 & 鸡尾酒时间 🥂"],
    ["Reception dinner 🍽", "婚宴晚餐 🍽", "婚宴晚餐 🍽"],
    ["First dance & party on the dance floor 💃", "第一支舞 & 舞池派對 💃", "第一支舞 & 舞池派对 💃"],
    ["Sparkler send-off ✨", "仙女棒歡送 ✨", "仙女棒欢送 ✨"],
    ["Quest complete!", "任務完成！", "任务完成！"],
    ["Villager FAQ", "村民常見問題", "村民常见问题"],
    ["Can I bring a plus-one?", "可以帶伴嗎？", "可以带伴吗？"],
    ["Your invitation lists everyone in your party. If it says \"and guest,\" yes! Add them in the RSVP.", "邀請函上會列出受邀的所有人。如果寫著「及同伴」，當然可以！請在回覆出席時加上他們。", "邀请函上会列出受邀的所有人。如果写着「及同伴」，当然可以！请在回复出席时加上他们。"],
    ["Are kids welcome?", "歡迎帶小孩嗎？", "欢迎带小孩吗？"],
    ["Please let us know in the RSVP and we'll do our best to accommodate.", "請在回覆出席時告訴我們，我們會盡力安排。", "请在回复出席时告诉我们，我们会尽力安排。"],
    ["Is there parking?", "有停車位嗎？", "有停车位吗？"],
    ["Yes — Duke has visitor parking near the Chapel. Details coming soon.", "有——杜克教堂附近有訪客停車場，詳情稍後公布。", "有——杜克教堂附近有访客停车场，详情稍后公布。"],
    ["When should I RSVP by?", "回覆出席的截止日期是？", "回复出席的截止日期是？"],

    // travel
    ["World map & inventory", "世界地圖 & 道具欄", "世界地图 & 道具栏"],
    ["RDU Airport", "RDU 機場", "RDU 机场"],
    ["Hotels", "飯店", "酒店"],
    ["Eats", "美食", "美食"],
    ["Explore", "探索", "探索"],
    ["Tap a pin on the map 📍", "點地圖上的圖釘 📍", "点地图上的图钉 📍"],
    ["Inventory", "道具欄", "道具栏"],
    ["Flying in", "搭飛機", "搭飞机"],
    ["Where to stay", "住宿", "住宿"],
    ["Hotel block info coming soon. Look near Duke's campus or downtown Durham.", "飯店團體房資訊即將公布。可以找杜克校園附近或達勒姆市中心。", "酒店团体房信息即将公布。可以找杜克校园附近或达勒姆市中心。"],
    ["Getting around", "交通", "交通"],
    ["Rideshare is easiest. A rental car helps if you want to explore the Triangle.", "叫車（Uber / Lyft）最方便。如果想逛逛三角研究區，租車會比較方便。", "叫车（Uber / Lyft）最方便。如果想逛逛三角研究区，租车会比较方便。"],
    ["Side quests", "支線任務", "支线任务"],
    ["Sarah P. Duke Gardens, American Tobacco Campus, Durham Bulls, and great BBQ!", "莎拉·杜克花園、美國菸草園區、達勒姆公牛隊棒球賽，還有超棒的烤肉！", "莎拉·杜克花园、美国烟草园区、达勒姆公牛队棒球赛，还有超棒的烤肉！"],
    ["Weather", "天氣", "天气"],
    ["Mid-May in Durham: warm & sunny, ~60–82°F. Pack sunscreen and a light layer for the evening.", "五月中的達勒姆：溫暖晴朗，約 16–28°C。記得帶防曬，晚上加件薄外套。", "五月中的达勒姆：温暖晴朗，约 16–28°C。记得带防晒，晚上加件薄外套。"],
    ["Need help?", "需要幫忙？", "需要帮忙？"],
    ["Questions? Reach out to us anytime — we're happy to help plan your trip.", "有問題嗎？隨時聯絡我們——很樂意幫你規劃行程。", "有问题吗？随时联系我们——很乐意帮你规划行程。"],

    // rsvp
    ["Join the party! Please reply by Mar 1, 2027", "加入隊伍！請於 2027年3月1日 前回覆", "加入队伍！请于 2027年3月1日 前回复"],
    ["Party setup", "組隊設定", "组队设定"],
    ["Player 1 — who are you?", "玩家 1——你是誰？", "玩家 1——你是谁？"],
    ["Full name", "全名", "全名"],
    ["e.g. Leia Dang", "例如：黨阿咪", "例如：党阿咪"],
    ["Email", "電子郵件", "电子邮件"],
    ["Will you join the adventure?", "你會加入這場冒險嗎？", "你会加入这场冒险吗？"],
    ["🎉 Accept quest!", "🎉 接受任務！", "🎉 接受任务！"],
    ["Joyfully attending", "開心出席", "开心出席"],
    ["💌 Can't make it", "💌 無法出席", "💌 无法出席"],
    ["Sending love from afar", "遠方送上祝福", "远方送上祝福"],
    ["Build your party", "組建你的隊伍", "组建你的队伍"],
    ["Number of guests (including you)", "出席人數（包含你）", "出席人数（包含你）"],
    ["Fewer", "減少", "减少"],
    ["More", "增加", "增加"],
    ["Dietary restrictions / allergies", "飲食限制／過敏", "饮食限制／过敏"],
    ["Vegetarian, nut allergy, ...", "素食、堅果過敏……", "素食、坚果过敏……"],
    ["We'll miss you! 🥺 Feel free to leave us a note on the next screen.", "我們會想你的！🥺 歡迎在下一頁留言給我們。", "我们会想你的！🥺 欢迎在下一页留言给我们。"],
    ["Final touches", "最後一步", "最后一步"],
    ["🎵 Song request — what gets you on the dance floor?", "🎵 點歌——什麼歌會讓你衝進舞池？", "🎵 点歌——什么歌会让你冲进舞池？"],
    ["Song – Artist", "歌名 – 歌手", "歌名 – 歌手"],
    ["💌 A message for Chin-Yi & Sixuan", "💌 給進怡 & 思旋的話", "💌 给进怡 & 思旋的话"],
    ["Write something sweet...", "寫點甜蜜的話……", "写点甜蜜的话……"],
    ["Next ▶", "下一步 ▶", "下一步 ▶"],
    ["✉ Send RSVP", "✉ 送出回覆", "✉ 发送回复"],
    ["Sending…", "傳送中…", "发送中…"],
    ["Quest accepted!", "任務接受！", "任务接受！"],
    ["We can't wait to celebrate with you.", "迫不及待要和你一起慶祝！", "迫不及待要和你一起庆祝！"],
    ["+1000 XP · Achievement unlocked:", "+1000 經驗值 · 成就解鎖：", "+1000 经验值 · 成就解锁："],
    ["Wedding Guest", "婚禮嘉賓", "婚礼嘉宾"],
    ["🗺 Plan travel", "🗺 規劃行程", "🗺 规划行程"],
    ["↺ Edit / new RSVP", "↺ 修改／重新回覆", "↺ 修改／重新回复"],
    ["Meal", "餐點", "餐点"],
    ["Chicken", "雞肉", "鸡肉"],
    ["Fish", "魚", "鱼"],
    ["Vegetarian", "素食", "素食"],
    ["Kids meal", "兒童餐", "儿童餐"],
    ["Please enter your name.", "請輸入你的名字。", "请输入你的名字。"],
    ["Please enter a valid email.", "請輸入有效的電子郵件。", "请输入有效的电子邮件。"],
    ["Choose one to continue!", "請選一個才能繼續！", "请选一个才能继续！"],
    ["Hmm, the carrier pigeon got lost. Please try again!", "嗯……信鴿迷路了，請再試一次！", "嗯……信鸽迷路了，请再试一次！"],
    ["Your RSVP is in. We can't wait to celebrate with you at Duke Chapel on May 15, 2027! ♥", "已收到你的回覆！2027年5月15日杜克教堂見，迫不及待要和你一起慶祝！♥", "已收到你的回复！2027年5月15日杜克教堂见，迫不及待要和你一起庆祝！♥"],
    ["We'll miss you dearly, but thank you for letting us know. Sending love! 💌", "我們會非常想你，謝謝你告訴我們。送上滿滿的愛！💌", "我们会非常想你，谢谢你告诉我们。送上满满的爱！💌"],

    // message board + photo comments
    ["Forum", "留言板", "留言板"],
    ["Leave us a note!", "留言給我們！", "留言给我们！"],
    ["Your name", "你的名字", "你的名字"],
    ["Your message", "你的留言", "你的留言"],
    ["📌 Pin it!", "📌 貼上去！", "📌 贴上去！"],
    ["Preview mode: the Forum isn't connected to the Google Sheet yet (config.js → rsvpEndpoint).", "預覽模式：留言板還沒連上 Google 試算表（config.js → rsvpEndpoint）。", "预览模式：留言板还没连上 Google 表格（config.js → rsvpEndpoint）。"],
    ["The Forum isn't open yet — check back soon!", "留言板還沒開放——晚點再來看看！", "留言板还没开放——晚点再来看看！"],
    ["Couldn't load the messages right now. Please try again later.", "現在無法載入留言，請稍後再試。", "现在无法加载留言，请稍后再试。"],
    ["Comments aren't open yet — check back soon!", "留言還沒開放——晚點再來看看！", "留言还没开放——晚点再来看看！"],
    ["Couldn't load the comments right now.", "現在無法載入留言。", "现在无法加载留言。"],
    ["Loading messages…", "留言載入中…", "留言加载中…"],
    ["No messages yet — be the first to leave one! 💌", "還沒有留言——來當第一個吧！💌", "还没有留言——来当第一个吧！💌"],
    ["Comments", "留言", "留言"],
    ["💬 Comments", "💬 留言", "💬 留言"],
    ["Say something about this photo...", "對這張照片說點什麼……", "对这张照片说点什么……"],
    ["Your comment", "你的留言", "你的留言"],
    ["Post", "送出", "发送"],
    ["Loading comments…", "留言載入中…", "留言加载中…"],
    ["No comments yet — say something nice! 💬", "還沒有留言——說點好話吧！💬", "还没有留言——说点好话吧！💬"],
    ["Please write a message.", "請寫點留言。", "请写点留言。"],
    ["Sent! ✨", "送出成功！✨", "发送成功！✨"],
    ["Slow down a little — try again in a few seconds!", "慢一點——過幾秒再試一次！", "慢一点——过几秒再试一次！"],
  ];

  // ---------- text with formatting inside (bold, links...): translated as a whole ----------
  // These elements carry data-i18n-html in the page; the English side must match their HTML.
  const HTML_ROWS = [
    ["Click the box or press <kbd>Space</kbd> to continue · <b>◀ Back</b> or <kbd>←</kbd> to go back",
     "點擊對話框或按 <kbd>空白鍵</kbd> 繼續 · <b>◀ 返回</b> 或 <kbd>←</kbd> 回到上一句",
     "点击对话框或按 <kbd>空格键</kbd> 继续 · <b>◀ 返回</b> 或 <kbd>←</kbd> 回到上一句"],
    ["* Times are placeholders — update in <code>index.html</code>.",
     "* 時間尚未確定，之後會更新。", "* 时间尚未确定，之后会更新。"],
    ["Please RSVP by <b>March 1, 2027</b>.",
     "請在 <b>2027年3月1日</b> 前回覆出席。", "请在 <b>2027年3月1日</b> 前回复出席。"],
    ["Fly into <b>Raleigh-Durham International (RDU)</b> — about 25 minutes from Duke by car.",
     "搭機抵達 <b>羅里-達勒姆國際機場（RDU）</b>——開車到杜克大約 25 分鐘。",
     "搭机抵达 <b>罗利-达勒姆国际机场（RDU）</b>——开车到杜克大约 25 分钟。"],
    ["The next chapter happens at <b>Duke Chapel</b> on <b>May 15, 2027</b> — and we want you in it!",
     "下一章將於 <b>2027年5月15日</b> 在 <b>杜克教堂</b> 展開——我們希望你也在其中！",
     "下一章将于 <b>2027年5月15日</b> 在 <b>杜克教堂</b> 展开——我们希望你也在其中！"],
    ["✈ <b>RDU Airport</b> — Raleigh-Durham International. ~25 min drive to Duke.",
     "✈ <b>RDU 機場</b>——羅里-達勒姆國際機場。開車到杜克約 25 分鐘。",
     "✈ <b>RDU 机场</b>——罗利-达勒姆国际机场。开车到杜克约 25 分钟。"],
    ["⛪ <b>Duke Chapel</b> — 401 Chapel Dr, Durham. Ceremony location! <a href='https://maps.google.com/?q=Duke+Chapel' target='_blank' rel='noopener'>Directions ↗</a>",
     "⛪ <b>杜克教堂</b>——401 Chapel Dr, Durham。典禮地點！<a href='https://maps.google.com/?q=Duke+Chapel' target='_blank' rel='noopener'>路線 ↗</a>",
     "⛪ <b>杜克教堂</b>——401 Chapel Dr, Durham。典礼地点！<a href='https://maps.google.com/?q=Duke+Chapel' target='_blank' rel='noopener'>路线 ↗</a>"],
    ["🏨 <b>Hotels</b> — Room block details coming soon. Stay near campus or downtown Durham.",
     "🏨 <b>飯店</b>——團體房資訊即將公布。可以住校園附近或達勒姆市中心。",
     "🏨 <b>酒店</b>——团体房信息即将公布。可以住校园附近或达勒姆市中心。"],
    ["🍜 <b>Eats</b> — Downtown Durham has amazing food: BBQ, ramen, biscuits, and more.",
     "🍜 <b>美食</b>——達勒姆市中心有超多好吃的：烤肉、拉麵、比司吉等等。",
     "🍜 <b>美食</b>——达勒姆市中心有超多好吃的：烤肉、拉面、司康饼等等。"],
    ["🌳 <b>Explore</b> — Sarah P. Duke Gardens is gorgeous in the fall. Don't miss it!",
     "🌳 <b>探索</b>——莎拉·杜克花園秋天超美，千萬別錯過！",
     "🌳 <b>探索</b>——莎拉·杜克花园秋天超美，千万别错过！"],
  ];

  // ---------- text with a changing part ($1, $2 = the changing part, itself translated) ----------
  const PM = (m) => `${+m[1] >= 6 && +m[1] < 12 ? "晚上" : "下午"} ${m[1]}:${m[2]}`; // 6:30 PM → 晚上 6:30, 3:30 PM → 下午 3:30
  const PATTERNS = [
    [/^(.*?)\s*Chapter (\d+)$/, "$1 第 $2 章", "$1 第 $2 章"],
    [/^Ch\. (\d+)$/, "第 $1 章", "第 $1 章"],
    [/^Chapter (\d+) unlocked: (\S+) (.+)$/, "第 $1 章已解鎖：$2 $3", "第 $1 章已解锁：$2 $3"],
    [/^— Our story · told by (.+) —$/, "— 我們的故事 · 由$1講述 —", "— 我们的故事 · 由$1讲述 —"],
    [/^▶ See the story as (.+)$/, "▶ 用$1的視角看故事", "▶ 用$1的视角看故事"],
    [/^Pixel portrait of (.+)$/, "$1的像素肖像", "$1的像素肖像"],
    [/^Step (\d+)\/(\d+)$/, "第 $1/$2 步", "第 $1/$2 步"],
    [/^(\d+) photos?$/, "$1 張照片", "$1 张照片"],
    [/^Open album: (.+)$/, "打開相簿：$1", "打开相册：$1"],
    [/^Open photo: (.+)$/, "打開照片：$1", "打开照片：$1"],
    [/^Player 1 \(you\) name$/, "玩家 1（你）姓名", "玩家 1（你）姓名"],
    [/^Player (\d+) name$/, "玩家 $1 姓名", "玩家 $1 姓名"],
    [/^Quest accepted, (.+)!$/, "任務接受，$1！", "任务接受，$1！"],
    [/^Thank you, (.+)!$/, "謝謝你，$1！", "谢谢你，$1！"],
    [/^(\d{1,2}):(\d\d) PM$/, PM, PM],
    [/^(\d{1,2}):(\d\d) AM$/, "上午 $1:$2", "上午 $1:$2"],
  ];

  // ===================== the translator =====================
  const norm = (s) => String(s).replace(/\s+/g, " ").trim();
  const DICT = { "zh-Hant": {}, "zh-Hans": {} }, HDICT = { "zh-Hant": {}, "zh-Hans": {} };
  ROWS.forEach(([en, a, b]) => { DICT["zh-Hant"][norm(en)] = a; DICT["zh-Hans"][norm(en)] = b; });
  const tpl = document.createElement("template");
  const htmlKey = (h) => { tpl.innerHTML = h; return norm(tpl.innerHTML); }; // same form the browser gives back
  HTML_ROWS.forEach(([en, a, b]) => { const k = htmlKey(en); HDICT["zh-Hant"][k] = a; HDICT["zh-Hans"][k] = b; });

  let lang = "en";
  try { const s = localStorage.getItem("lang"); if (LANGS.includes(s)) lang = s; } catch (e) {}

  function lookup(k, ctx) {
    const d = DICT[lang];
    if (ctx && d[ctx + ":" + k] != null) return d[ctx + ":" + k];
    if (d[k] != null) return d[k];
    for (const [re, a, b] of PATTERNS) {
      const m = k.match(re); if (!m) continue;
      const out = lang === "zh-Hant" ? a : b;
      return typeof out === "function" ? out(m, lang) : out.replace(/\$(\d)/g, (_, i) => { const p = m[i] || ""; const r = lookup(norm(p), ctx); return r == null ? p : r; });
    }
    if (k.includes(" · ")) { // "Album note · 3 photos": translate each piece
      const parts = k.split(" · "), tr = parts.map((p) => lookup(p, ctx));
      if (tr.some((x) => x != null)) return parts.map((p, i) => (tr[i] == null ? p : tr[i])).join(" · ");
    }
    return null;
  }
  // translate one piece of text (keeps the spaces around it)
  function t(s, ctx) {
    if (lang === "en" || s == null) return s;
    const str = String(s), k = norm(str);
    if (!k) return str;
    const r = lookup(k, ctx);
    return r == null ? str : str.match(/^\s*/)[0] + r + str.match(/\s*$/)[0];
  }

  // ---- the page: every text, a few attributes, and the data-i18n-html blocks ----
  const ATTRS = ["placeholder", "aria-label", "title", "alt"];
  const SKIP = "script, style, textarea, [data-no-i18n]";
  const metaT = new WeakMap(), metaA = new WeakMap(), metaH = new WeakMap();
  const htmlHost = (n) => { const el = n.nodeType === 1 ? n : n.parentElement; return el && el.closest("[data-i18n-html]"); };

  function doText(node) {
    const el = node.parentElement;
    if (!el || el.closest(SKIP) || htmlHost(node)) return;
    const m = metaT.get(node);
    const en = m && node.data === m.out ? m.en : node.data; // changed by the page → new English text
    const out = t(en);
    if (out !== node.data) node.data = out;
    metaT.set(node, { en, out });
  }
  function doAttrs(el) {
    if (el.closest("[data-no-i18n]")) return; // (a textarea's text is the visitor's, but its placeholder is ours)
    let m = metaA.get(el); if (!m) metaA.set(el, (m = {}));
    for (const a of ATTRS) {
      if (!el.hasAttribute(a)) continue;
      const cur = el.getAttribute(a), mm = m[a];
      const en = mm && cur === mm.out ? mm.en : cur;
      const out = t(en);
      if (out !== cur) el.setAttribute(a, out);
      m[a] = { en, out };
    }
  }
  function doHtml(el) {
    const cur = el.innerHTML, m = metaH.get(el);
    const en = m && cur === m.out ? m.en : cur;
    const k = norm(en);
    const out = lang === "en" ? en : HDICT[lang][k] != null ? HDICT[lang][k] : (lookup(k) != null ? lookup(k) : en);
    // (compare with what we set last time: the browser may write it back slightly differently, e.g. ' → ")
    if (!(m && en === m.en && out === m.src && cur === m.out) && out !== cur) el.innerHTML = out;
    metaH.set(el, { en, src: out, out: el.innerHTML });
  }
  function walk(root) {
    if (root.nodeType === 3) return doText(root);
    if (root.nodeType !== 1) return;
    if (root.matches("[data-i18n-html]")) doHtml(root);
    else if (htmlHost(root)) return doHtml(htmlHost(root));
    if (root.closest("[data-no-i18n]")) return;
    doAttrs(root);
    root.querySelectorAll("[data-i18n-html]").forEach(doHtml);
    root.querySelectorAll("*").forEach((el) => { if (el.attributes.length) doAttrs(el); });
    const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let n = tw.nextNode(); n; n = tw.nextNode()) doText(n);
  }
  // follow whatever the page changes later (story, gallery, RSVP steps...)
  const mo = new MutationObserver((list) => {
    for (const r of list) {
      if (r.type === "characterData") doText(r.target);
      else if (r.type === "attributes") { if (r.target.isConnected) doAttrs(r.target); }
      else {
        const host = htmlHost(r.target);
        if (host) { doHtml(host); continue; }
        r.addedNodes.forEach((n) => { if (n.isConnected) walk(n); });
      }
    }
  });

  // ---- the language button ----
  const btn = document.getElementById("langBtn");
  const NAMES = { en: "English", "zh-Hant": "繁體中文", "zh-Hans": "简体中文" };
  function paint() {
    document.documentElement.lang = lang;
    if (!btn) return;
    btn.textContent = LABEL[lang];
    const next = LANGS[(LANGS.indexOf(lang) + 1) % LANGS.length];
    btn.title = `${NAMES[lang]} → ${NAMES[next]}`; btn.setAttribute("aria-label", btn.title);
  }
  function set(l) {
    if (!LANGS.includes(l)) return;
    lang = l;
    try { localStorage.setItem("lang", l); } catch (e) {}
    paint();
    walk(document.body);
    document.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
  }
  if (btn) btn.addEventListener("click", () => set(LANGS[(LANGS.indexOf(lang) + 1) % LANGS.length]));

  paint();
  walk(document.body);
  mo.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });

  window.I18N = { t, set, get lang() { return lang; } };
})();
