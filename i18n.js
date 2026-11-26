// ====== Languages: English → 繁體中文 → 简体中文 (the 文 button above the chat button) ======
// Every row is [English, Traditional Chinese, Simplified Chinese]. The English text must match the
// website text exactly (it is looked up as-is); anything without a row simply stays in English.
// To change a translation, edit it here. To translate new text, add a row.
(() => {
  const LANGS = ["en", "zh-Hant", "zh-Hans"];
  // the language button says where it goes next, in that language
  const LABEL = { en: "切換到繁體中文", "zh-Hant": "切换成简体中文", "zh-Hans": "Switch to English" };

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
    ["Full screen", "全螢幕", "全屏"],
    // home page announcement sign (config.js announcements)
    ["Announcements", "公告", "公告"],
    ["Go", "前往", "前往"],
    ["💌 Please RSVP by March 1, 2027!", "💌 請在 2027年3月1日 前回覆出席！", "💌 请在 2027年3月1日 前回复出席！"],
    ["⛪ May 15, 2027 · Duke Chapel, Durham, NC", "⛪ 2027年5月15日 · 北卡羅來納州達勒姆 杜克教堂", "⛪ 2027年5月15日 · 北卡罗来纳州达勒姆 杜克教堂"],
    ["✈️ Coming from far away? See the Travel page", "✈️ 從遠方來嗎？請看交通住宿頁", "✈️ 从远方来吗？请看交通住宿页"],
    ["📸 New photos in the Gallery. Leave us a comment!", "📸 相簿有新照片，來留言給我們吧！", "📸 相册有新照片，来留言给我们吧！"],
    ["🐾 Leia says: don't forget to RSVP!", "🐾 阿咪說：別忘了回覆出席喔！", "🐾 阿咪说：别忘了回复出席哦！"],
    ["Exit full screen", "離開全螢幕", "退出全屏"],
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
    ["*knocks your phone off the table*", "*把你的手機推下桌*", "*把你的手机推下桌*"],
    ["Mrrp! I'm the ring bearer. 💍", "咪！我是戒指花童。💍", "咪！我是戒指花童。💍"],
    ["Talk to Chin-Yi", "跟進怡說話", "跟进怡说话"],
    ["Talk to Sixuan", "跟思旋說話", "跟思旋说话"],
    ["Hi! I'm Chin-Yi. Welcome to our adventure! 💕", "嗨！我是進怡，歡迎來到我們的冒險！💕", "嗨！我是进怡，欢迎来到我们的冒险！💕"],
    ["Hey! I'm Sixuan. Welcome! 👋", "嘿！我是思旋，歡迎！👋", "嘿！我是思旋，欢迎！👋"],
    ["Meow! I'm Leia. Did you bring my treats? 🐾", "喵！我是阿咪。你有帶我的零食來嗎？🐾", "喵！我是阿咪。你有带我的零食来吗？🐾"],
    ["Purrr... try clicking the background for a surprise! 💕", "呼嚕嚕……點一下背景試試看，有驚喜喔！💕", "呼噜噜……点一下背景试试看，有惊喜哦！💕"],
    ["I just adopted a cat! 🐱", "我剛領養了一隻貓！🐱", "我刚领养了一只猫！🐱"],
    ["Sixuan has bought 4 old cars...🙄", "思旋已經買了4台老車了……🙄", "思旋已经买了4辆老车了……🙄"],
    ["...and he keeps forgetting about his Mazda 6! 🚗", "……而且他一直忘記自己還有一台Mazda 6！🚗", "……而且他一直忘记自己还有一辆Mazda 6！🚗"],
    ["You thought the Miata was my last car? 🏎️", "你以為Miata是我的最後一台車？🏎️", "你以为Miata是我的最后一辆车？🏎️"],
    ["Then I bought a Ranger... 🛻", "結果我又買了一台Ranger……🛻", "结果我又买了一辆Ranger……🛻"],
    ["...and then I got a 1995 Jeep! 🚙", "……然後又入手了一台1995年的Jeep！🚙", "……然后又入手了一辆1995年的Jeep！🚙"],
    ["Wedding details", "婚禮資訊", "婚礼信息"],
    ["The Big Day", "婚禮日", "婚礼日"],
    ["May 15, 2027", "2027年5月15日", "2027年5月15日"],
    ["Saturday", "星期六", "星期六"],
    ["Durham, NC", "北卡羅來納州 達勒姆", "北卡罗来纳州 达勒姆"],
    ["Duke Chapel", "杜克教堂", "杜克教堂"],
    ["💌 View Wedding Details", "💌 查看婚禮資訊", "💌 查看婚礼信息"],
    ["Read Our Story", "閱讀我們的故事", "阅读我们的故事"],
    ["Days until the Big Day", "距離婚禮日還有", "距离婚礼日还有"],
    ["days", "天", "天"],
    ["hrs", "時", "时"],
    ["min", "分", "分"],
    ["sec", "秒", "秒"],

    // our story
    ["Meet the players", "認識玩家", "认识玩家"],
    ["— Choose your character —", "— 選擇你的角色 —", "— 选择你的角色 —"],
    ["▲ Pick a character to start the story ▲", "▲ 選一位角色開始故事 ▲", "▲ 选一位角色开始故事 ▲"],
    ["Class:", "職業：", "职业："],
    ["Origin", "家鄉", "出身"],
    ["personality", "個性", "个性"],
    ["Likes", "喜歡", "喜欢"],
    ["Hates", "討厭", "讨厌"],
    ["Napping 😴, Good food 🍖", "睡午覺 😴、好吃的食物 🍖", "睡午觉 😴、好吃的食物 🍖"],
    ["Bugs 🐛, Frogs 🐸", "蟲 🐛、青蛙 🐸", "虫 🐛、青蛙 🐸"],
    ["Cars 🚗, Tools 🔧", "車 🚗、工具 🔧", "车 🚗、工具 🔧"],
    ["Sweet potatoes 🍠, (Program) Bugs 👾", "地瓜 🍠、（程式）Bug 👾", "红薯 🍠、（程序）Bug 👾"],
    ["Chin-Yi 💕, Treat 🐟", "進怡 💕、零食 🐟", "进怡 💕、零食 🐟"],
    ["Sixuan 😾, Thunder ⛈️", "思旋 😾、打雷 ⛈️", "思旋 😾、打雷 ⛈️"],
    ["Yilan, Taiwan", "台灣宜蘭", "台湾宜兰"],
    ["Chunhua, China", "中國淳化", "中国淳化"],
    ["State College, USA", "美國州學院", "美国州学院"],
    ["Spontaneous", "隨性", "随性"],
    ["Boss", "老大", "老大"],
    ["Having affair with DK and Square", "跟DK和正方形偷情", "跟DK和正方形偷情"],
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
    ["Penn State IM Building · badminton court", "賓州州立大學體育館 · 羽球場", "宾州州立大学体育馆 · 羽毛球场"],
    ["Penn State IM Building · basketball court", "賓州州立大學體育館 · 籃球場", "宾州州立大学体育馆 · 篮球场"],
    ["JJ’s place", "阿正家", "阿正家"],
    ["A house in State College", "州學院的一間房子", "州学院的一间房子"],
    ["Penn State · Cremer Lab", "賓州州立大學 · Cremer實驗室", "宾州州立大学 · Cremer实验室"],
    ["Penn State · Parking Lot", "賓州州立大學停車場", "宾州州立大学停车场"],
    ["Texas Roadhouse", "德州路屋", "德州路屋"],
    ["Starbucks", "星巴克", "星巴克"],
    ["Chin-Yi's Car", "進怡的車", "进怡的车"],
    ["State College Dog Park", "狗狗公園", "狗狗公园"],
    ["On the road", "在路上", "在路上"],
    ["Grand Teton National Park", "大提頓國家公園", "大提顿国家公园"],
    ["Yellowstone National Park", "黃石國家公園", "黄石国家公园"],
    ["Centre County Paws", "Paws收容所", "Paws收容所"],
    ["On the way home", "回家的路上", "回家的路上"],
    ["On the way to the shelter", "去收容所的路上", "去收容所的路上"],
    ["place:Home", "家", "家"],

    // story: chapter 1
    ["One day, at a barbecue at 914’s house, Yu-Ya and Eric said Sixuan was coming to State College. They wanted to introduce him to Chin-Yi, so everyone planned to play badminton together.", "有一天在914家吃烤肉時，Yu-Ya 跟 Eric 說黨老師（思旋）剛好要來小鎮，想順便把他介紹給進怡認識，大家還相約一起打羽球。", "有一天在914家吃烤肉时，Yu-Ya 跟 Eric 说党老师（思旋）刚好要来小镇，想顺便把他介绍给进怡认识，大家还相约一起打羽毛球。"],
    ["Are you guys serious? He dyed his hair blond AND wears a necklace... isn’t he kind of a bad boy?", "你們是認真的嗎？他染金髮又戴項鍊耶，是不是有點痞啊？", "你们是认真的吗？他染金发又戴项链耶，是不是有点痞啊？"],
    ["Just as Chin-Yi was sure she was being pranked... someone walked toward the court.", "正當進怡覺得自己一定是被整了的時候……有一個人朝球場走來。", "正当进怡觉得自己一定是被整了的时候……有一个人朝球场走来。"],
    ["Wow... they only told me Sixuan has a nice butt. Nobody mentioned those huge pecs!! 😳", "哇……他們只跟我說黨老師（思旋）屁股翹，沒跟我說有大奶！！😳", "哇……他们只跟我说党老师（思旋）屁股翘，没跟我说有大奶！！😳"],
    ["One day, while Sixuan and JJ were playing basketball, Yu-Ya and Eric asked if he wanted a girlfriend. They knew a really fun, lively girl, and they’d already planned to play badminton together.", "有一天，思旋和阿正在打籃球時，Yu-Ya和Eric問他想不想談戀愛，他們說他們認識一個很猴的女生，正好一起約了打羽球。", "有一天，思旋和阿正在打篮球时，Yu-Ya 和 Eric 问他想不想谈恋爱，他们说他们认识一个很猴的女生，正好一起约了打羽毛球。"],
    ["Sixuan heard that Chin-Yi loves working out, so he put on the shirt that makes him look extra buff 💪 and headed to the badminton court.", "思旋聽說進怡很喜歡健身，於是思旋穿上讓他看起來特別壯的上衣。💪 出發前往羽球場。", "思旋听说进怡很喜欢健身，于是思旋穿上让他看起来特别壮的上衣 💪 出发前往羽毛球场。"],
    ["Hi!", "嗨！", "嗨！"],
    ["Chin-Yi turned around to say hi. One look at her bright smile and he could tell she was fun, Sixuan fell for her on the spot!", "進怡轉過頭打招呼，她笑容開朗一看就很猴，思旋馬上就淪陷了！", "进怡转过头打招呼，她笑容开朗，一看就很猴，思旋马上就沦陷了！"],
    ["Long ago, Leia had a different name: Stormy. No one knows much about her first owner.", "很久以前，阿咪有另一個名字：Stormy。沒人太了解她的第一個主人。", "很久以前，阿咪有另一个名字：Stormy。没人太了解她的第一个主人。"],
    ["Meow.", "喵。", "喵。"],

    // story: chapter 2
    ["The next day, Chin-Yi went to the lab as usual, and Sixuan texted to ask her out to dinner.", "隔天，進怡一如既往地去實驗室，思旋傳了訊息約她一起吃晚餐。", "隔天，进怡一如既往地去实验室，思旋发消息约她一起吃晚饭。"],
    ["She was exhausted after a long day in the lab and had no time to go home and change, so she went straight to the date.", "她在實驗室忙了一整天，累壞了，所以沒來得及回家換衣服就直接去約會。", "她在实验室忙了一整天，累坏了，所以没来得及回家换衣服就直接去约会。"],
    ["Hello! Are you hungry? I’m freaking STARVING!", "哈囉！你餓不餓？我餓到靠北！", "哈喽！你饿不饿？我饿到靠北！"],
    ["Then let’s hurry to the restaurant!", "那我們快點去餐廳吧！", "那我们快点去餐厅吧！"],
    ["It was a great date. Chin-Yi found Sixuan really caring and down-to-earth, nothing like his blond hair and necklace!", "那是一次很棒的約會。進怡覺得思旋非常體貼老實，跟他的金頭髮和項鍊完全不一樣！", "那是一次很棒的约会。进怡觉得思旋非常体贴老实，跟他的金头发和项链完全不一样！"],
    ["One day, Chin-Yi was hanging out with Yu-Ya when Sixuan texted her to meet up at Starbucks. Chin-Yi had a feeling something was going to happen...", "有一天，進怡正和 Yu-Ya 在一起，思旋傳訊息約她在星巴克見面。進怡有種預感，好像要發生什麼事……", "有一天，进怡正和 Yu-Ya 在一起，思旋发消息约她在星巴克见面。进怡有种预感，好像要发生什么事……"],
    ["Yu-Ya, Sixuan says he has something to tell me! What if he wants us to be together? We’ve only known each other a few days. I want to get to know him longer. I can’t just say yes. I’m playing it cool!", "Yu-Ya，思旋說有話要跟我說耶！如果他告白怎麼辦？我們才認識沒幾天耶，我要再認識久一點，不能亂答應，我要高冷！", "Yu-Ya，思旋说有话要跟我说耶！如果他表白怎么办？我们才认识没几天耶，我要再认识久一点，不能乱答应，我要高冷！"],
    ["I like you.", "我喜歡你。", "我喜欢你。"],
    ["Chin-Yi had planned to say no... but Sixuan looked so sincere that she couldn’t help saying yes. ♥", "進怡本來打算拒絕……但思旋看起來好真誠，她不小心就答應了。♥", "进怡本来打算拒绝……但思旋看起来好真诚，她不小心就答应了。♥"],
    ["The next day, Sixuan worked up his courage and asked Chin-Yi out to dinner at Texas Roadhouse.", "第二天，思旋鼓起勇氣，約進怡去德州路屋吃晚餐。", "第二天，思旋鼓起勇气，约进怡去德州路屋吃晚饭。"],
    ["Chin-Yi said yes right away! Mission success. First date unlocked. ✅", "進怡爽快地答應了！任務成功。第一次約會，解鎖。✅", "进怡爽快地答应了！任务成功。第一次约会，解锁。✅"],
    ["On the day of the date, he was nervous. Chin-Yi was easygoing and friendly, but he was STILL nervous.", "約會當天，他很緊張，雖然進怡很隨和又友善，但他還是很緊張。", "约会当天，他很紧张，虽然进怡很随和又友善，但他还是很紧张。"],
    ["Have you ever been to Texas Roadhouse? There aren’t many good places to eat in this little town, but this one’s my favorite.", "你之前吃過德州路屋嗎？小鎮好吃的沒多少，這是我最喜歡的餐廳。", "你之前吃过德州路屋吗？小镇好吃的没多少，这是我最喜欢的餐厅。"],
    ["I’d never tried it... but it tastes great!", "我從來沒吃過……但很好吃！", "我从来没吃过……但很好吃！"],
    ["It was a great date. Sixuan kept asking Chin-Yi out over the next few days. They even had a picnic at the town’s dog park, and they grew closer day by day.", "那是一次很棒的約會。接下來幾天思旋一直約進怡出去，他們還去了小鎮的狗狗公園野餐，兩人一天比一天親近。", "那是一次很棒的约会。接下来几天思旋一直约进怡出去，他们还去了小镇的狗狗公园野餐，两人一天比一天亲近。"],
    ["On August 25, 2024, Sixuan asked Chin-Yi to meet him at Starbucks. Something was about to happen...", "2024年8月25日，思旋約進怡在星巴克見面。有什麼事就要發生了……", "2024年8月25日，思旋约进怡在星巴克见面。有什么事就要发生了……"],
    ["And?", "然後呢？", "然后呢？"],
    ["Shall we be together?", "我們要在一起嗎？", "我们要在一起吗？"],
    ["But I’m going back to Taiwan soon, and I don’t know when I’ll be back... it could be months...", "可是我最近就要回台灣，不知道甚麼時候回來，可能要幾個月……", "可是我最近就要回台湾，不知道什么时候回来，可能要几个月……"],
    ["I can wait!", "我可以等啊！", "我可以等啊！"],
    ["In that case... sure! Let’s be together. ♥", "這樣的話……好啊！一起啊。♥", "这样的话……好啊！一起啊。♥"],
    ["One day, Stormy was told her owner had gone to live on a farm upstate.", "有一天，有人告訴 Stormy，她的主人搬去北邊的農場住了。", "有一天，有人告诉 Stormy，她的主人搬去北边的农场住了。"],
    ["A farm upstate?! What the heck? Then who’s going to feed me!?", "北邊的農場？！那尛？那誰來餵我啊！？", "北边的农场？！真假？那谁来喂我啊！？"],
    ["She moved to the shelter, but she didn’t fit in very well... and she lost a lot of weight.", "她被送到收容所，但過得不太好……瘦了好多。", "她被送到收容所，但过得不太好……瘦了好多。"],

    // story: chapter 3
    ["In the months that followed, they went on adventures to lots of places together, and along the way they both realized they had found the right partner.", "接下來的幾個月裡，他們一起去了許多地方探險，也在相處中漸漸發現，彼此都是很適合自己的伴侶。", "接下来的几个月里，他们一起去了许多地方探险，也在相处中渐渐发现，彼此都是很适合自己的伴侣。"],
    ["On June 6, 2025, after two days of camping in Yellowstone National Park, they stopped by Grand Teton...", "2025年6月6日，在黃石國家公園露營兩天後，他們順道去了大提頓……", "2025年6月6日，在黄石国家公园露营两天后，他们顺道去了大提顿……"],
    ["Will you marry me?", "你願意嫁給我嗎？", "你愿意嫁给我吗？"],
    ["Of course! ...Though we haven’t showered in two days. We’re officially the stinky couple!!! ♥", "當然願意！……只是我們已經兩天沒洗澡了，現在是臭臭 couple ！！！♥", "当然愿意！……只是我们已经两天没洗澡了，现在是臭臭 couple！！！♥"],
    ["In the months that followed, they went to lots of places for fun, and life together was lively and happy. In June 2025, they took a trip to Yellowstone.", "接下來的幾個月，他們去了很多地方玩耍，兩個人的生活非常熱鬧、開心。2025年6月，他們去了黃石公園旅行。", "接下来的几个月，他们去了很多地方玩耍，两个人的生活非常热闹、开心。2025年6月，他们去了黄石公园旅行。"],
    ["That day Sixuan was driving, and Chin-Yi fell asleep in the passenger seat as usual 🤫 She had no idea Sixuan was going to propose on this trip.", "那天思旋開著車，進怡一如既往地在副駕睡著了🤫 她還沒有意識到思旋要在這趟旅程求婚。", "那天思旋开着车，进怡一如既往地在副驾睡着了🤫 她还没有意识到思旋要在这趟旅程求婚。"],
    ["We haven’t showered in two days. I’m hungry, I’m tired, and my head is so itchy!", "都兩天沒洗澡了，我又餓又累，頭還很癢！", "都两天没洗澡了，我又饿又累，头还很痒！"],
    ["There’s a really pretty chapel over at Grand Teton. One last stop, and then we’ll go have a feast!", "大提頓那邊有一個教堂很漂亮，我們再停最後一站，就去吃大餐！", "大提顿那边有一个教堂很漂亮，我们再停最后一站，就去吃大餐！"],
    ["The chapel really was beautiful, with the mountains rising behind it. Suddenly, Sixuan got down on one knee...", "教堂的景色確實很美，群山就在後面聳立。突然，思旋單膝跪下……", "教堂的景色确实很美，群山就在后面耸立。突然，思旋单膝跪下……"],
    ["...and the other visitors burst into applause for the newly engaged couple! 👏", "……其他遊客都為這對剛訂婚的新人熱烈鼓掌！👏", "……其他游客都为这对刚订婚的新人热烈鼓掌！👏"],
    ["How did a shy introvert like you dare to propose in front of all these people?! I’m dying of laughter!", "你這個臭I人怎麼敢在這麼多人面前求婚！笑死我了！", "你这个臭I人怎么敢在这么多人面前求婚！笑死我了！"],
    ["One day, a very loud couple walked in. Stormy was terrified. She looked up from her shelter bed and studied them carefully.", "有一天，一對很吵的情侶走了進來。Stormy嚇爛，從收容所的小床上抬起頭，仔細打量著他們。", "有一天，一对很吵的情侣走了进来。Stormy 吓坏了，从收容所的小床上抬起头，仔细打量着他们。"],
    ["I hope they can’t find me. Just keep playing with the other cats... I’m scared.", "希望他們找不到我。你們繼續跟其他貓玩就好……我很怕。", "希望他们找不到我。你们继续跟其他猫玩就好……我很怕。"],
    ["Why does that woman keep staring at me!? Go away. Stop looking at me. I want to go back to my old home... everything here is so scary.", "那個女人幹嘛一直看我！？走開，別看我，我好想回去以前的家，這裡的一切都好可怕。", "那个女人干嘛一直看我！？走开，别看我，我好想回去以前的家，这里的一切都好可怕。"],
    ["Even though she wasn’t happy about it, Stormy became Leia. A shelter worker put her in a carrier, and the couple took her to her new home.", "儘管很不情願，Stormy還是變成了阿咪。她被社工放進外出籠，被這對情侶帶回了新家。", "尽管很不情愿，Stormy 还是变成了阿咪。她被社工放进外出笼，被这对情侣带回了新家。"],

    // story: chapter 4
    ["Chin-Yi has always loved animals. One day, Sixuan took her to the shelter to spend time with the animals.", "進怡一直很喜歡動物。有一天，思旋帶她去了收容所跟動物們互動。", "进怡一直很喜欢动物。有一天，思旋带她去了收容所跟动物们互动。"],
    ["Look at that grey cat... she’s too scared to come out, and she’s skin and bones. I want to adopt her.", "你看那隻灰貓……她都不敢出來，瘦到見骨了。我要領養她。", "你看那只灰猫……她都不敢出来，瘦到见骨了。我要领养她。"],
    ["Should we think about it a bit more?", "我們要不要再想想看呢？", "我们要不要再想想看呢？"],
    ["She needs us right now! That fat orange cat keeps bullying her.", "她現在就需要我們！那隻胖橘貓一直欺負她。", "她现在就需要我们！那只胖橘猫一直欺负她。"],
    ["They adopted her and named her Leia. Now she eats well and is much healthier, and Chin-Yi is happy!", "後來他們成功領養了她，並幫她取名叫阿咪。現在很能吃也健康許多，進怡也很開心！", "后来他们成功领养了她，并给她取名叫阿咪。现在很能吃也健康许多，进怡也很开心！"],
    ["One day, Sixuan noticed Chin-Yi was feeling down, so he took her to the animal shelter to spend time with the animals.", "有一天思旋察覺到進怡心情不好，就帶她去動物收容所跟動物們互動。", "有一天思旋察觉到进怡心情不好，就带她去动物收容所跟动物们互动。"],
    ["I want a cat!", "我想要養一隻貓！", "我想要养一只猫！"],
    ["Didn’t we just come to play with them? Do you really want to adopt one?", "我們不是來跟牠們玩的嗎？你真的要養嗎？", "我们不是来跟它们玩的吗？你真的要养吗？"],
    ["You brought me here, I saw them, so now I want one!", "你帶我來了，我看到了，我就想養！", "你带我来了，我看到了，我就想养！"],
    ["Sixuan didn’t expect Chin-Yi to adopt a cat, but she looked so happy that he helped her look for the right one.", "思旋沒想到進怡會領養貓，但是她看起來很開心，於是就跟進怡一起找一隻適合的貓。", "思旋没想到进怡会领养猫，但是她看起来很开心，于是就跟进怡一起找一只适合的猫。"],
    ["Chin-Yi liked a shy grey cat who wouldn’t come out of her little house. Sixuan worried this cat was too shy.", "進怡喜歡一隻躲在小屋裡不肯出來的害羞灰貓。思旋擔心這隻貓太害羞了。", "进怡喜欢一只躲在小屋里不肯出来的害羞灰猫。思旋担心这只猫太害羞了。"],
    ["How about that friendly, playful calico?", "那隻活潑親人的三花怎麼樣？", "那只活泼亲人的三花猫怎么样？"],
    ["That one steals everyone’s food like a little gangster. She’ll do just fine without us. But this one needs protecting!", "那隻跟流氓一樣到處搶別人飼料，沒有我們也會過得很好。但這隻需要保護！", "那只跟流氓一样到处抢别人的猫粮，没有我们也会过得很好。但这只需要保护！"],
    ["Then let’s call her Leia! May she be as brave as Princess Leia.", "那就給她叫Leia（阿咪）吧！期許她像莉亞公主一樣勇敢。", "那就叫她 Leia（阿咪）吧！期许她像莱娅公主一样勇敢。"],
    ["Sounds great! ♥", "好啊！♥", "好啊！♥"],
    ["In her new home, Leia slowly relaxed. She slept a lot and caught up on all the sleep she’d lost at the shelter!", "阿咪到了新家，逐漸放鬆了不少，睡了很多覺，把在收容所失的眠都補了回來！", "阿咪到了新家，逐渐放松了不少，睡了很多觉，把在收容所失的眠都补了回来！"],
    ["These two humans always stare at me, especially that woman. But life here is pretty sweet, so I’ll put up with it.", "這兩個人類老是盯著我看，尤其是那個女人。不過看在這裡日子爽，我就忍忍。", "这两个人类老是盯着我看，尤其是那个女人。不过看在这里日子爽，我就忍忍。"],
    ["As time flew by, Leia reached a healthy weight... and found a lot of happiness.", "時光飛逝，阿咪長到了健康的體重……也找到了滿滿的幸福。", "时光飞逝，阿咪长到了健康的体重……也找到了满满的幸福。"],
    ["Leia!", "阿咪！", "阿咪！"],
    ["Ah!", "啊！", "啊！"],

    // story: chapter 5
    ["The final chapter needs one more thing...", "最後一章還少了一樣東西……", "最后一章还少了一样东西……"],
    ["Our next chapter starts at Duke Chapel on May 15, 2027.", "我們的下一章，2027年5月15日在杜克教堂展開。", "我们的下一章，2027年5月15日在杜克教堂展开。"],
    ["It wouldn't be complete without you. Please come! ♥", "少了你就不完整。請一定要來！♥", "少了你就不完整。请一定要来！♥"],
    ["Party status: 3 of 4. One player missing.", "隊伍目前三缺一。", "队伍目前三缺一。"],
    ["May 15, 2027, Duke Chapel. The party is almost complete.", "2027年5月15日，杜克教堂。隊伍快要湊齊了。", "2027年5月15日，杜克教堂。队伍快要凑齐了。"],
    ["We just need one more player: you! ♥", "我們只差一位玩家：就是你！♥", "我们只差一位玩家：就是你！♥"],
    ["Leia has an announcement.", "阿咪有事要宣布。", "阿咪有事要宣布。"],
    ["I approve of this wedding. You humans may now get married.", "本喵批准這場婚禮。人類們，你們可以結婚了。", "本喵批准这场婚礼。人类们，你们可以结婚了。"],
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
    // album folders (assets/gallery/"<n> Title-Note"): titles, then notes
    ["How We Met", "相遇", "相遇"],
    ["Where it all began", "一切的起點", "一切的起点"],
    ["First Date", "第一次約會", "第一次约会"],
    ["Level 1 unlocked", "解鎖第 1 關", "解锁第 1 关"],
    ["Side Quests", "支線任務", "支线任务"],
    ["Trips and adventures", "旅行與冒險", "旅行与冒险"],
    ["The Proposal", "求婚", "求婚"],
    ["She said yes!", "她說好！", "她说好！"],
    ["The real boss", "真正的老大", "真正的老大"],
    ["Two Homes", "兩個家", "两个家"],
    ["Taiwan & China", "台灣與中國", "台湾与中国"],
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
    ["✉ Accept this quest (RSVP)", "✉ 接受任務（回覆出席）", "✉ 接受任务（回复出席）"],
    ["Objectives", "任務目標", "任务目标"],
    ["Arrive at Duke Chapel!", "抵達杜克教堂並入座！", "抵达杜克教堂并入座！"],
    ["Ceremony: witness the vows 💍", "典禮: 見證誓言 💍", "典礼: 见证誓言 💍"],
    ["Photos & cocktail hour 🥂", "合照 & 雞尾酒時間 🥂", "合照 & 鸡尾酒时间 🥂"],
    ["Reception dinner 🍽", "婚宴晚餐 🍽", "婚宴晚餐 🍽"],
    ["First dance & party 💃", "第一支舞 & 派對 💃", "第一支舞 & 派对 💃"],
    ["After party 🍻", "續攤 🍻", "续摊 🍻"],
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
    ["Our home", "我們的家", "我们的家"],
    ["Chapel Hill", "教堂山", "教堂山"],
    ["Cary", "卡里", "卡里"],
    ["Raleigh", "羅利", "罗利"],
    ["Tap a place on the map 📍", "點地圖上的地點 📍", "点地图上的地点 📍"],
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
    ["Fly into Raleigh-Durham International (RDU), about 25 minutes drive to Duke.",
     "搭機抵達羅里-達勒姆國際機場（RDU），開車到杜克大約 25 分鐘。",
     "搭机抵达罗利-达勒姆国际机场（RDU），开车到杜克大约 25 分钟。"],
    ["The next chapter happens at <b>Duke Chapel</b> on <b>May 15, 2027</b>, and we want you in it!",
     "下一章將於 <b>2027年5月15日</b> 在 <b>杜克教堂</b> 展開，我們希望你也在其中！",
     "下一章将于 <b>2027年5月15日</b> 在 <b>杜克教堂</b> 展开，我们希望你也在其中！"],
    ["✈ <b>RDU Airport</b> — Raleigh-Durham International. ~25 min drive to Duke. Chin-Yi's least favorite spot on the map, too many goodbyes with Sixuan here.",
     "✈ <b>RDU 機場</b>——羅里-達勒姆國際機場。開車到杜克約 25 分鐘。進怡不太喜歡這裡，因為來這裡就要跟思旋說再見。",
     "✈ <b>RDU 机场</b>——罗利-达勒姆国际机场。开车到杜克约 25 分钟。进怡不太喜欢这里，因为来这里就要跟思旋说再见。"],
    ["⛪ <b>Duke Chapel</b> — 401 Chapel Dr, Durham. Ceremony location! <a href='https://maps.google.com/?q=Duke+Chapel' target='_blank' rel='noopener'>Directions ↗</a>",
     "⛪ <b>杜克教堂</b>——401 Chapel Dr, Durham。婚禮地點！<a href='https://maps.google.com/?q=Duke+Chapel' target='_blank' rel='noopener'>路線 ↗</a>",
     "⛪ <b>杜克教堂</b>——401 Chapel Dr, Durham。婚礼地点！<a href='https://maps.google.com/?q=Duke+Chapel' target='_blank' rel='noopener'>路线 ↗</a>"],
    ["🏢 <b>Durham Downtown</b> — A lively hub for dining, shopping, arts, and local culture.",
     "🏢 <b>達勒姆市中心</b>——充滿活力的美食、購物、藝術與在地文化中心。",
     "🏢 <b>达勒姆市中心</b>——充满活力的美食、购物、艺术与本地文化中心。"],
    ["🍽️ <b>Parizade</b> — One of the oldest restaurants in Durham. It features a Mediterranean style menu and will host the cocktail hour, reception dinner and dance party. <a href='https://maps.app.goo.gl/B8QxCbtWU9Mq2k4z5' target='_blank' rel='noopener'>Directions ↗</a>",
     "🍽️ <b>Parizade</b>——達勒姆最老的餐廳之一，提供地中海風味料理，會在這裡舉辦雞尾酒時間、婚宴晚餐與舞會。<a href='https://maps.app.goo.gl/B8QxCbtWU9Mq2k4z5' target='_blank' rel='noopener'>路線 ↗</a>",
     "🍽️ <b>Parizade</b>——达勒姆最老的餐厅之一，提供地中海风味料理，会在这里举办鸡尾酒时间、婚宴晚餐与舞会。<a href='https://maps.app.goo.gl/B8QxCbtWU9Mq2k4z5' target='_blank' rel='noopener'>路线 ↗</a>"],
    ["🏡 <b>Home</b> — Where Chin-Yi, Sixuan and Leia live. Our little base camp in Durham! Sorry, Jeffrey.",
     "🏡 <b>家</b>——進怡、思旋和阿咪住的地方，我們在達勒姆的小小基地！抱歉，Jeffrey。",
     "🏡 <b>家</b>——进怡、思旋和阿咪住的地方，我们在达勒姆的小小基地！抱歉，Jeffrey。"],
    ["🎓 <b>Chapel Hill</b> — A cute college town with cafés and shops on Franklin Street. Home of Duke's rival UNC, though that hasn't stopped Chin-Yi, Sixuan, and Jeffrey from going to the bars on Franklin Street. About 20 min from Duke.",
     "🎓 <b>教堂山</b>——可愛的大學城，Franklin Street 上有咖啡廳和小店。雖然這裡是杜克的死對頭北卡教堂山（UNC）所在地，但進怡、思旋和 Jeffrey 還是會去 Franklin Street 的酒吧。離杜克約 20 分鐘。",
     "🎓 <b>教堂山</b>——可爱的大学城，Franklin Street 上有咖啡厅和小店。虽然这里是杜克的死对头北卡教堂山（UNC）所在地，但进怡、思旋和 Jeffrey 还是会去 Franklin Street 的酒吧。离杜克约 20 分钟。"],
    ["🏠 <b>Party House</b> — A big house with a basketball court, fire pit, and 6 bedrooms. The after party will be here! About 30 min from Duke. The house is not open to the public, so please RSVP to get the address.",
     "🏠 <b>派對屋</b>——有籃球場、篝火堆和 6 間臥室的大房子。續攤會在這裡！離杜克約 30 分鐘。房子不對外開放，回覆出席後會取得地址。",
     "🏠 <b>派对屋</b>——有篮球场、篝火堆和 6 间卧室的大房子。续摊会在这里！离杜克约 30 分钟。房子不对外开放，回复出席后会取得地址。"],
    ["🏘️ <b>Cary</b> — A quiet, friendly town with lovely parks and shops close to RDU and I-40. Fun fact: Cary is a sister city of Hsinchu, Taiwan!",
     "🏘️ <b>卡里</b>——安靜友善的小鎮，有漂亮的公園，靠近 RDU 及 I-40 公路。趣味小知識：卡里是台湾新竹的姊妹市！",
     "🏘️ <b>卡里</b>——安静友善的小镇，有漂亮的公园，靠近 RDU 及 I-40 公路。趣味小知识：卡里是台湾新竹的姐妹市！"],
    ["🏛️ <b>Raleigh</b> — North Carolina's capital: free museums, food halls and the State Capitol. About 35 min from Duke.",
     "🏛️ <b>羅利</b>——北卡羅來納州首府：有免費博物館、美食和州議會。離杜克約 35 分鐘。",
     "🏛️ <b>罗利</b>——北卡罗来纳州首府：有免费博物馆、美食和州议会。离杜克约 35 分钟。"],
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
    if (r == null && str.includes("<")) { const h = HDICT[lang][htmlKey(str)]; if (h != null) return h; } // text with tags: the HTML rows
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
    const lbl = btn.querySelector(".lang-label") || btn;
    lbl.textContent = LABEL[lang];
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

  window.I18N = { t, get lang() { return lang; } };
})();
