"use client";

import { useEffect, useRef, useState } from "react";
import { loveStory, memories, quiz } from "./content";

export const dynamic = "force-static";

export default function Home() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const [opened, setOpened] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [musicError, setMusicError] = useState(false);
  const [secretTaps, setSecretTaps] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const current = quiz[quizIndex];

  useEffect(() => () => audioRef.current?.pause(), []);

  function openLetter() {
    if (opened) return;
    setOpened(true);
    window.setTimeout(() => document.querySelector("#letter")?.scrollIntoView({ behavior: "smooth" }), 1500);
  }

  async function toggleMusic() {
    if (!audioRef.current) {
      const audio = new Audio(`${basePath}${loveStory.song}`);
      audio.loop = true;
      audio.addEventListener("error", () => { setMusicError(true); setPlaying(false); });
      audioRef.current = audio;
    }
    try {
      if (playing) audioRef.current.pause(); else await audioRef.current.play();
      setPlaying(!playing);
      setMusicError(false);
    } catch {
      setMusicError(true);
      setPlaying(false);
    }
  }

  function nextQuestion() {
    if (choice === null) return;
    if (quizIndex === quiz.length - 1) setFinished(true);
    else { setQuizIndex((index) => index + 1); setChoice(null); }
  }

  function restart() {
    setQuizIndex(0); setChoice(null); setFinished(false);
  }

  return (
    <main>
      <header className="topbar">
        <a href="#top" className="brand">OUR STORY <i>♥</i></a>
        <button className="music" type="button" onClick={toggleMusic} aria-label={playing ? "暂停音乐" : "播放音乐"}>
          <span className={playing ? "equalizer playing" : "equalizer"}><i /><i /><i /></span>
          {playing ? "暂停音乐" : "播放我们的歌"}
        </button>
      </header>

      <section id="top" className={`opening ${opened ? "is-open" : ""}`}>
        <p className="eyebrow">A LETTER FOR YOU · 七夕 2026</p>
        <div className="hero-copy">
          <p>To · {loveStory.to}</p>
          <h1>七夕有封信，<br />点击打开吧 <i className="pointing">👉</i></h1>
          <span>写于七夕，寄给我的臭布布</span>
        </div>
        <button className="envelope-stage" type="button" aria-label={opened ? "信封已打开，阅读信件" : "点击拆开信封"} aria-pressed={opened} onClick={openLetter}>
          <span className="envelope">
            <span className="letter-preview"><b>给你</b><small>我们的故事，未完待续。</small></span>
            <span className="back" /><span className="flap" /><span className="front" /><span className="seal">囍</span>
          </span>
        </button>
        <p className="hint">{opened ? "信已拆开 · 向下继续读" : "轻触火漆印章 · 拆开这封信"}</p>
        <div className="grain" aria-hidden="true" />
      </section>

      <section id="letter" className="letter-section">
        <div className="section-mark"><span>01</span><p>LOVE LETTER<br />写给你的话</p></div>
        <article className="paper-letter">
          <p className="salutation">{loveStory.salutation}</p>
          {loveStory.letter.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <p className="signature">爱你的<br /><b>{loveStory.from}</b></p>
        </article>
        <p className="side-note">把喜欢写进纸里<br />把你放进未来里</p>
      </section>

      <section className="numbers" aria-label="我们的纪念数字">
        <p className="section-kicker">A FEW LITTLE NUMBERS</p>
        <div><article><strong>{loveStory.metrics.loveDays}</strong><span>恋爱天数</span></article><article><strong>{loveStory.metrics.xhsSpark}</strong><span>小红书火花</span></article><article><strong>∞</strong><span>还没写完的以后</span></article></div>
      </section>

      <section className="timeline" id="memories">
        <header><p className="section-kicker">02 · OUR MEMORIES</p><h2>一些舍不得<br /><em>忘记的瞬间</em></h2><p>照片会褪色，记忆偶尔模糊。<br />还好我们可以一次次讲起。</p></header>
        <div className="memory-list">
          {memories.map((memory, index) => (
            <article className={index % 2 ? "memory reverse" : "memory"} key={memory.title}>
              <div className={`photo-frame ${memory.tone}`} style={memory.image ? { backgroundImage: `url(${basePath}${memory.image})`, backgroundPosition: memory.position } : undefined}>
                {!memory.image && <div className="photo-placeholder"><span>PHOTO {String(index + 1).padStart(2, "0")}</span><i>♥</i><small>替换成你们的照片</small></div>}
                <p>{memory.note}</p>
              </div>
              <div className="memory-copy"><span>{String(index + 1).padStart(2, "0")} / {memory.date}</span><h3>{memory.title}</h3><p>{memory.text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="quiz-section" id="quiz">
        <div className="quiz-intro"><p className="section-kicker">03 · ONLY YOU KNOW</p><h2>关于我们，<br />你还记得吗？</h2><p>没有输赢，只有藏在答案里的小情话。</p></div>
        <div className="quiz-card">
          {!finished ? <>
            <div className="quiz-progress"><span>QUESTION {quizIndex + 1} / {quiz.length}</span><i style={{ width: `${((quizIndex + 1) / quiz.length) * 100}%` }} /></div>
            <h3>{current.question}</h3>
            <div className="options">{current.options.map((option, index) => <button type="button" className={choice === index ? "selected" : ""} onClick={() => setChoice(index)} key={option}><span>{String.fromCharCode(65 + index)}</span>{option}</button>)}</div>
            {choice !== null && <div className="answer"><b>{choice === current.answer ? "被你猜中啦 ♥" : "这个答案也很可爱"}</b><p>{current.reply}</p><button type="button" onClick={nextQuestion}>{quizIndex === quiz.length - 1 ? "打开最后一页" : "下一题"} →</button></div>}
          </> : <div className="quiz-finish"><span>♥</span><p>默契测试完成</p><h3>答案也许会忘，<br />喜欢你这件事不会。</h3><button type="button" onClick={() => document.querySelector("#finale")?.scrollIntoView({ behavior: "smooth" })}>领取你的告白</button><button className="text-button" type="button" onClick={restart}>再玩一次</button></div>}
        </div>
      </section>

      <section id="finale" className="finale">
        <p className="section-kicker">TO BE CONTINUED</p>
        <p className="big-love">LOVE</p>
        <article><span>写在最后</span><h2>{loveStory.closing}</h2><button type="button" className="final-seal" onClick={() => setSecretTaps((count) => count + 1)} aria-label="隐藏彩蛋">♥</button>{secretTaps >= 5 && <p className="secret">彩蛋被你发现了：再点五下，也还是最喜欢你。</p>}</article>
        <footer><p>七夕 · 2026</p><a href="#top">再读一遍 ↑</a></footer>
      </section>
      {musicError && <div className="toast" role="status">还没有放入专属歌曲，请添加 public/our-song.mp3</div>}
    </main>
  );
}
