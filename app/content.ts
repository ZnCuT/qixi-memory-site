export type Memory = { date: string; title: string; text: string; image?: string; note: string; tone: string };
export type QuizQuestion = { question: string; options: string[]; answer: number; reply: string };

export const loveStory = {
  from: "你的女孩",
  to: "我最特别的你",
  anniversary: "2024-08-10",
  letter: [
    "见字如面。想了很久，要怎样把我们一路走来的那些小事，好好地装进一封信里。",
    "后来才发现，真正让我心动的从来不是某个盛大的瞬间，而是你记得我的习惯、接住我的情绪，也愿意陪我把普通的日子过得闪闪发光。",
    "下面这些，是我舍不得忘记的我们。照片和文字都可以替换成真实故事，但这句不会变——和你在一起，我很幸福。",
  ],
  closing: "往后的四季、晚餐和散步，也请继续和我一起收藏。七夕快乐，我的男孩。",
  song: "/our-song.mp3",
};

export const memories: Memory[] = [
  { date: "初见 · SPRING", title: "故事从这一天开始", text: "把第一次见面的地点、当时的天气，以及你对他的第一印象写在这里。", note: "原来命运真的会提前埋下伏笔", tone: "rose" },
  { date: "第一次约会", title: "紧张又开心的一天", text: "记录你们第一次认真约会时吃过的东西、走过的路，或者那个后来总被提起的小插曲。", note: "那天的晚风，我到现在还记得", tone: "cream" },
  { date: "一张很喜欢的合照", title: "镜头刚好留住我们", text: "换成你最喜欢的一张合照。照片不一定完美，只要看到它就会笑。", note: "请把照片放到 public/photos", tone: "sage" },
  { date: "第一次旅行", title: "去没去过的地方", text: "写下目的地、最好吃的一餐，以及旅途中只有你们知道的暗号。", note: "下一站也要一起去", tone: "blue" },
  { date: "平凡的一天", title: "日常才是最长情的告白", text: "可以是一顿饭、一场电影、一次散步。最普通的瞬间，因为身边是他而变得特别。", note: "普通日子里的小小偏爱", tone: "peach" },
  { date: "值得纪念的瞬间", title: "谢谢你一直在", text: "放入一次被理解、被照顾，或者一起跨过困难的回忆。", note: "有人分享，快乐真的会加倍", tone: "cream" },
];

export const quiz: QuizQuestion[] = [
  { question: "我们第一次认真聊天，最可能聊到几点？", options: ["十点前就睡了", "过了零点", "聊到忘记时间"], answer: 2, reply: "正确答案其实是：只要和你聊，时间就会跑得特别快。" },
  { question: "我心情不好的时候，最想要什么？", options: ["先抱抱我", "讲道理", "假装没看见"], answer: 0, reply: "一个拥抱不一定解决问题，但会让我知道你和我站在一起。" },
  { question: "如果现在立刻出发，我最想和你去哪里？", options: ["看海", "逛一座陌生小城", "只要一起，哪里都行"], answer: 2, reply: "地点只是背景，你才是旅程里最重要的风景。" },
  { question: "我最喜欢你什么时候的样子？", options: ["认真做事时", "逗我笑时", "每一种样子"], answer: 2, reply: "包括偶尔笨拙、偶尔孩子气，也包括一直认真爱我的你。" },
  { question: "我们的故事会写到哪里？", options: ["这个七夕", "下一次旅行", "很远很远的以后"], answer: 2, reply: "这一题没有悬念。希望每一个以后，都还能写下“我们”。" },
];
