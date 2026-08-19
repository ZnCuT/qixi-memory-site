"use client";

import { useEffect, useRef, useState } from "react";
import { catchGame, loveStory, memories } from "./content";

export const dynamic = "force-static";

type FallingItem = { id: number; icon: string; x: number; y: number; speed: number };

function CatchGame({ basePath }: { basePath: string }) {
  const boardRef = useRef<HTMLDivElement | null>(null);
  const playerXRef = useRef(50);
  const scoreRef = useRef(0);
  const [status, setStatus] = useState<"ready" | "playing" | "finished">("ready");
  const [items, setItems] = useState<FallingItem[]>([]);
  const [playerX, setPlayerX] = useState(50);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(catchGame.duration);

  function movePlayer(next: number) {
    const clamped = Math.max(10, Math.min(90, next));
    playerXRef.current = clamped;
    setPlayerX(clamped);
  }

  function startGame() {
    scoreRef.current = 0;
    setScore(0);
    setItems([]);
    setTimeLeft(catchGame.duration);
    setStatus("playing");
  }

  useEffect(() => {
    if (status !== "playing") return;
    let frame = 0;
    let nextId = 0;
    let last = performance.now();
    let spawnClock = 0;
    let elapsed = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function tick(now: number) {
      const dt = Math.min(40, now - last);
      last = now;
      elapsed += dt;
      spawnClock += dt;
      const height = boardRef.current?.clientHeight ?? 440;
      if (spawnClock >= (reduced ? 900 : 650)) {
        spawnClock = 0;
        const icon = catchGame.items[nextId % catchGame.items.length];
        const fresh = { id: nextId++, icon, x: 8 + Math.random() * 84, y: -45, speed: reduced ? 0.10 : 0.15 + Math.random() * 0.06 };
        setItems((current) => [...current, fresh]);
      }
      setItems((current) => current.flatMap((item) => {
        const moved = { ...item, y: item.y + item.speed * dt };
        const caught = moved.y > height - 112 && moved.y < height - 45 && Math.abs(moved.x - playerXRef.current) < 13;
        if (caught) {
          scoreRef.current += 1;
          setScore(scoreRef.current);
          return [];
        }
        return moved.y > height + 20 ? [] : [moved];
      }));
      const remaining = Math.max(0, catchGame.duration - Math.floor(elapsed / 1000));
      setTimeLeft(remaining);
      if (elapsed < catchGame.duration * 1000) frame = requestAnimationFrame(tick);
      else setStatus("finished");
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [status]);

  useEffect(() => {
    if (status !== "playing") return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        movePlayer(playerXRef.current + (event.key === "ArrowLeft" ? -7 : 7));
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [status]);

  function handlePointer(event: React.PointerEvent<HTMLDivElement>) {
    if (status !== "playing" || !boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    movePlayer(((event.clientX - rect.left) / rect.width) * 100);
  }

  return (
    <div className="catch-game">
      <div className="game-hud"><span>TIME <b>{timeLeft}s</b></span><span>已接住 <b>{score}</b> / {catchGame.target}</span></div>
      <div
        className="game-board"
        ref={boardRef}
        onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); handlePointer(event); }}
        onPointerMove={handlePointer}
        aria-label="接住爱的碎片小游戏，可左右拖动角色，也可使用键盘方向键"
      >
        <div className="game-sky" aria-hidden="true">LOVE · DINNER · WALK · US</div>
        {items.map((item) => <span className="falling-item" key={item.id} style={{ left: `${item.x}%`, top: item.y }}>{item.icon}</span>)}
        <img className="game-character" src={`${basePath}${catchGame.character}`} alt="两只布布一起接住爱的碎片" draggable={false} style={{ left: `${playerX}%` }} />
        {status === "ready" && <div className="game-overlay"><span>💌</span><h3>接住爱的碎片</h3><p>左右拖动布布，接住从回忆里掉下来的小快乐。</p><button type="button" onClick={startGame}>开始游戏</button></div>}
        {status === "finished" && <div className="game-overlay finished"><span>{score >= catchGame.target ? "💞" : "🌷"}</span><h3>{score >= catchGame.target ? "全部好好接住啦" : "快乐已经装进口袋啦"}</h3><p>{catchGame.ending}</p><button type="button" onClick={startGame}>再玩一次</button></div>}
      </div>
      <p className="game-tip">手机左右拖动 · 电脑也可使用 ← →</p>
    </div>
  );
}

export default function Home() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [musicError, setMusicError] = useState(false);
  const [secretTaps, setSecretTaps] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  return (
    <main>
      <header className="topbar">
        <a href="#top" className="brand">OUR STORY <i>♥</i></a>
        <button className={`music-disc ${playing ? "is-playing" : ""}`} type="button" onClick={toggleMusic} aria-label={playing ? "暂停《Kiss Me》" : "播放《Kiss Me》"} aria-pressed={playing}>
          <img src={`${basePath}/cd-player.png`} alt="" aria-hidden="true" />
          <span>{playing ? "Ⅱ" : "▶"}</span>
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
              <div className={`photo-frame ${memory.tone} ${memory.ratio}`}>
                {memory.image ? <img src={`${basePath}${memory.image}`} alt={`${memory.date}：${memory.note}`} style={{ objectPosition: memory.position }} loading="lazy" /> : <div className="photo-placeholder"><span>PHOTO {String(index + 1).padStart(2, "0")}</span><i>♥</i><small>替换成你们的照片</small></div>}
                <p>{memory.note}</p>
              </div>
              <div className="memory-copy"><span>{String(index + 1).padStart(2, "0")} / {memory.date}</span><h3>{memory.title}</h3><p>{memory.text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="quiz-section" id="game">
        <div className="quiz-intro"><p className="section-kicker">03 · ONLY YOU KNOW</p><h2>关于我们，<br />你还记得吗？</h2><p>一起接住爱心、花花、寿司，还有那些只有我们懂的小快乐。</p></div>
        <CatchGame basePath={basePath} />
      </section>

      <section id="finale" className="finale">
        <p className="section-kicker">TO BE CONTINUED</p>
        <p className="big-love">LOVE</p>
        <article><span>写在最后</span><h2>{loveStory.closing}</h2><button type="button" className="final-seal" onClick={() => setSecretTaps((count) => count + 1)} aria-label="隐藏彩蛋">♥</button>{secretTaps >= 5 && <p className="secret">彩蛋被你发现了：再点五下，也还是最喜欢你。</p>}</article>
        <footer><p>七夕 · 2026</p><a href="#top">再读一遍 ↑</a></footer>
      </section>
      {musicError && <div className="toast" role="status">音乐暂时没有加载成功，稍后再点一次试试吧。</div>}
    </main>
  );
}
