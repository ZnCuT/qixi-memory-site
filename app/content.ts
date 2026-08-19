export type Memory = {
  date: string;
  title: string;
  text: string;
  image?: string;
  note: string;
  tone: string;
  position?: string;
  ratio: "portrait" | "square" | "landscape" | "wide";
};

export const loveStory = {
  from: "香宝",
  to: "臭布布",
  salutation: "亲爱的 Mr. Wang：",
  metrics: { loveDays: 1025, xhsSpark: 424 },
  letter: [
    "见字如面。虽然今晚就会相见啦 (˶ᵔ ᵕ ᵔ˶)",
    "我们勤奋又帅气的小布布，七夕快乐呀！今天是我们在一起的第 1025 天。其实刚和你在一起的时候，我从没想过我们能一起走这么久。",
    "我们之间有过冲突，也有过争吵，但你总会给我台阶下。你让我学会了很多，也让我有了一个可以依靠的人。我可以在你面前展示最真实的自己；遇到需要认真考虑的事情，也多了一个可以一起商量的人。这样想想，其实真的蛮幸福的。",
    "喜欢看你认真时的侧脸，也喜欢把脸贴在你热热的肌肤上——软软的 🐻🐥。平淡的日子里，也总会突然冒出一些可以共享的快乐瞬间，比如布布版 Spider-Man。",
    "我们会一直走下去的吧！和你在一起，我很幸福。",
  ],
  closing: "往后的四季、晚餐和散步，也请继续和我一起收藏。七夕快乐，我的布布。",
  song: "/our-song.mp3",
};

export const memories: Memory[] = [
  { date: "初见", title: "故事从这一天开始", text: "实践部让我们相识，颁奖典礼让我知道，原来我们锐涛这么厉害。", note: "原来命运真的会提前埋下伏笔", tone: "rose", image: "/photos/01-first-meeting.jpg", position: "center 56%", ratio: "portrait" },
  { date: "第一次约会", title: "紧张又开心的一天", text: "我们第一次约会，吃完寿司一起逛街。然后，我们的大魔术师布布就这样把花花变出来啦。", note: "那天的晚风，我到现在还记得", tone: "cream", image: "/photos/02-first-date.jpg", position: "center 38%", ratio: "portrait" },
  { date: "一张很喜欢的合照", title: "镜头刚好留住我们", text: "南宁之旅的合照。晚霞很美，我们两个也都很好看。", note: "美丽的晚霞，也有好看的我们", tone: "sage", image: "/photos/03-nanning-sunset.jpg", position: "center", ratio: "wide" },
  { date: "大吃一口合集", title: "一起吃很多好吃的", text: "日料、西餐，还有好多想一起打卡的味道……话说，我们真的好久没拍“大吃一口”系列了！以后也要一直一起吃好吃的 😋", note: "小宝之“大吃一口”系列", tone: "blue", image: "/photos/04-big-bite.jpg", position: "center 40%", ratio: "square" },
  { date: "平凡的一天", title: "日常才是最长情的告白", text: "一顿饭、一场电影、一次散步。最普通的瞬间，也会因为是和你一起而变得特别。", note: "普通日子里的小小幸福", tone: "peach", image: "/photos/05-sunflower-day.jpg", position: "center", ratio: "landscape" },
  { date: "值得纪念的瞬间", title: "谢谢你一直在", text: "平淡生活里突然出现的布布版 Spider-Man，是只有我们懂的快乐，也是我想一直珍藏的瞬间。", note: "快乐加倍的瞬间", tone: "cream", image: "/photos/06-spiderman.jpg", position: "center 46%", ratio: "wide" },
];

export const catchGame = {
  duration: 30,
  target: 12,
  character: "/game/bubu-duo.png",
  items: ["💗", "🌷", "🍣", "🎟️", "💿", "🕷️"],
  ending: "原来我们已经接住了这么多快乐，以后也要继续接住彼此呀。",
};
