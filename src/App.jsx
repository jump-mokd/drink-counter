import { useState, useRef } from 'react'
import './App.css'

const SELF_COMMENTS = {
  2: [
    'おい…もう2杯目か',
    '早くも2杯か。節度ってものを知ってるか？',
    '2杯。まあ許容範囲だが…油断するなよ',
  ],
  4: [
    '4杯だと？明日の仕事はどうする気だ',
    '4杯目…本当にやめないのか、お前は',
    '4杯か。肝臓が泣いてるぞ',
  ],
  6: [
    '6杯か。自制心というものがないのか',
    '6杯も…お前の脳は機能してるのか',
    '6杯目だと？情けない',
  ],
  8: [
    'もう8杯か。最低だな、お前は',
    '8杯…。もはや呆れて言葉もない',
    '8杯目。帰れ。今すぐ帰れ',
  ],
}

const HER_COMMENTS = {
  2: [
    'そんなに飲ませてどうするつもりだ',
    '相手に2杯か。カモじゃないか',
    '2杯も奢ったのか。先が思いやられるぞ',
  ],
  4: [
    '4杯か。完全にカモにされてるぞ',
    '4杯も…財布の中身が心配だ',
    '相手に4杯。お前は慈善事業をやってるのか',
  ],
  6: [
    '6杯も…頭を使え。お前はバカか',
    '6杯目だと？絞られてることに気づけ',
    '相手に6杯…本当に何を考えてるんだ',
  ],
  8: [
    'もう8杯か。財布を捨てたいのか',
    '8杯…。お前の金銭感覚を疑う',
    '相手に8杯目。もう終わりだ、帰れ',
  ],
}

const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)]

const Counter = ({ label, count, onIncrement, onDecrement }) => (
  <div className="counter-card">
    <div className="counter-label">{label}</div>
    <div className="counter-controls">
      <button className="btn btn-minus" onClick={onDecrement} disabled={count === 0}>
        −
      </button>
      <div className="counter-value">
        <span className="count-number">{count}</span>
        <span className="count-unit">杯</span>
      </div>
      <button className="btn btn-plus" onClick={onIncrement}>
        ＋
      </button>
    </div>
  </div>
)

const SpeechBubble = ({ message }) => (
  <div className="speech-bubble">
    {message}
  </div>
)

const GuardDogCharacter = () => (
  <svg width="210" height="203" viewBox="0 0 170 165" xmlns="http://www.w3.org/2000/svg">
    {/* 足 / 脚 */}
    <ellipse cx="67" cy="157" rx="14" ry="7" fill="#0c0c2a"/>
    <ellipse cx="103" cy="157" rx="14" ry="7" fill="#0c0c2a"/>
    <rect x="59" y="133" width="18" height="25" rx="5" fill="#141448"/>
    <rect x="93" y="133" width="18" height="25" rx="5" fill="#141448"/>
    {/* 胴体 */}
    <path d="M 54 82 Q 85 77 116 82 L 122 136 L 48 136 Z" fill="#141448"/>
    {/* 腕スリーブ */}
    <path d="M 114 86 Q 140 94 136 113 Q 134 121 126 123" stroke="#141448" strokeWidth="15" strokeLinecap="round" fill="none"/>
    <path d="M 56 86 Q 32 94 34 109 Q 35 116 48 115" stroke="#141448" strokeWidth="15" strokeLinecap="round" fill="none"/>
    {/* 警棒 */}
    <line x1="60" y1="93" x2="121" y2="118" stroke="#7a4020" strokeWidth="7" strokeLinecap="round"/>
    <line x1="60" y1="93" x2="121" y2="118" stroke="#a05828" strokeWidth="4" strokeLinecap="round" opacity="0.5"/>
    <line x1="110" y1="113" x2="123" y2="120" stroke="#3a1a08" strokeWidth="9" strokeLinecap="round"/>
    <line x1="60" y1="93" x2="65" y2="96" stroke="#c8c8c8" strokeWidth="8" strokeLinecap="round"/>
    {/* 両手 */}
    <ellipse cx="50" cy="113" rx="11" ry="10" fill="#b87040" transform="rotate(-20 50 113)"/>
    <path d="M 42 108 Q 48 104 54 108" fill="none" stroke="#8a5828" strokeWidth="1.5" opacity="0.7"/>
    <ellipse cx="124" cy="122" rx="11" ry="10" fill="#b87040" transform="rotate(-10 124 122)"/>
    <path d="M 117 117 Q 123 113 129 117" fill="none" stroke="#8a5828" strokeWidth="1.5" opacity="0.7"/>
    {/* 肩章 */}
    <rect x="43" y="82" width="18" height="6" rx="3" fill="#ffd700"/>
    <line x1="45" y1="85" x2="60" y2="85" stroke="#b8860b" strokeWidth="1.2"/>
    <rect x="109" y="82" width="18" height="6" rx="3" fill="#ffd700"/>
    <line x1="110" y1="85" x2="126" y2="85" stroke="#b8860b" strokeWidth="1.2"/>
    {/* 襟 */}
    <polygon points="70,82 85,96 100,82 95,82 85,92 75,82" fill="#e8e0f8"/>
    {/* 胸ハイライト */}
    <ellipse cx="85" cy="98" rx="20" ry="12" fill="#1a1a52" opacity="0.5"/>
    {/* バッジ */}
    <polygon points="78,93 85,97 85,105 78,108 71,105 71,97" fill="#ffd700" stroke="#b8860b" strokeWidth="0.8"/>
    <circle cx="78" cy="101" r="3.5" fill="#141448"/>
    <line x1="73" y1="95" x2="76" y2="98" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.85"/>
    {/* ボタン */}
    <circle cx="85" cy="115" r="2.5" fill="#ffd700"/>
    <circle cx="85" cy="123" r="2.5" fill="#ffd700"/>
    {/* 首 */}
    <rect x="72" y="73" width="26" height="13" rx="5" fill="#9a6030"/>
    {/* 頭 */}
    <ellipse cx="85" cy="50" rx="39" ry="28" fill="#b87040"/>
    {/* 垂れ頬 */}
    <ellipse cx="47" cy="66" rx="12" ry="15" fill="#ae6c3c"/>
    <ellipse cx="123" cy="66" rx="12" ry="15" fill="#ae6c3c"/>
    {/* 眉弓 */}
    <path d="M 47 44 Q 85 33 123 44 Q 123 50 85 47 Q 47 50 47 44 Z" fill="#9a5828" opacity="0.5"/>
    {/* マズル */}
    <ellipse cx="85" cy="63" rx="23" ry="17" fill="#d4a870"/>
    {/* 下あご */}
    <path d="M 67 70 Q 85 82 103 70 L 103 77 Q 85 90 67 77 Z" fill="#c49060"/>
    {/* 耳 */}
    <ellipse cx="47" cy="36" rx="10" ry="8" fill="#9a5828" transform="rotate(-15 47 36)"/>
    <ellipse cx="123" cy="36" rx="10" ry="8" fill="#9a5828" transform="rotate(15 123 36)"/>
    {/* 帽子 */}
    <rect x="46" y="22" width="78" height="22" rx="3" fill="#0c0c2a"/>
    <ellipse cx="85" cy="22" rx="39" ry="9" fill="#0c0c2a"/>
    <rect x="46" y="41" width="78" height="5" fill="#ffd700"/>
    <path d="M 42 46 Q 85 57 128 46 L 126 44 Q 85 54 44 44 Z" fill="#080818"/>
    {/* 左目 */}
    <ellipse cx="68" cy="51" rx="10" ry="9" fill="white"/>
    <ellipse cx="68" cy="53" rx="6.5" ry="6" fill="#3a1860"/>
    <circle cx="68" cy="53" r="3.8" fill="#080818"/>
    <circle cx="69.5" cy="50.5" r="1.8" fill="white" opacity="0.55"/>
    <path d="M 58 47 Q 68 42 78 47 L 78 50 Q 68 48 58 50 Z" fill="#b87040"/>
    <path d="M 58 47 Q 68 42 78 47" fill="none" stroke="#7a4520" strokeWidth="2.2"/>
    {/* 右目 */}
    <ellipse cx="102" cy="51" rx="10" ry="9" fill="white"/>
    <ellipse cx="102" cy="53" rx="6.5" ry="6" fill="#3a1860"/>
    <circle cx="102" cy="53" r="3.8" fill="#080818"/>
    <circle cx="103.5" cy="50.5" r="1.8" fill="white" opacity="0.55"/>
    <path d="M 92 47 Q 102 42 112 47 L 112 50 Q 102 48 92 50 Z" fill="#b87040"/>
    <path d="M 92 47 Q 102 42 112 47" fill="none" stroke="#7a4520" strokeWidth="2.2"/>
    {/* 眉 */}
    <path d="M 59 43 Q 68 42 77 44" fill="none" stroke="#4a2010" strokeWidth="4" strokeLinecap="round"/>
    <path d="M 93 44 Q 102 42 111 43" fill="none" stroke="#4a2010" strokeWidth="4" strokeLinecap="round"/>
    {/* 眉間のしわ */}
    <line x1="83" y1="45" x2="83" y2="49" stroke="#7a4520" strokeWidth="1.5" strokeLinecap="round" opacity="0.85"/>
    <line x1="87" y1="45" x2="87" y2="49" stroke="#7a4520" strokeWidth="1.5" strokeLinecap="round" opacity="0.85"/>
    {/* 鼻 */}
    <rect x="74" y="59" width="22" height="12" rx="6" fill="#3a1808"/>
    <ellipse cx="79" cy="65" rx="4" ry="3.2" fill="#280e08"/>
    <ellipse cx="91" cy="65" rx="4" ry="3.2" fill="#280e08"/>
    <line x1="85" y1="59" x2="85" y2="71" stroke="#280e08" strokeWidth="1.3"/>
    {/* 口（ニヤリ） */}
    <path d="M 66 78 Q 85 63 104 78" fill="none" stroke="#7a4520" strokeWidth="2.8" strokeLinecap="round"/>
    <line x1="66" y1="78" x2="63" y2="73" stroke="#7a4520" strokeWidth="1.8" strokeLinecap="round" opacity="0.75"/>
    <line x1="104" y1="78" x2="107" y2="73" stroke="#7a4520" strokeWidth="1.8" strokeLinecap="round" opacity="0.75"/>
    {/* しわ */}
    <path d="M 75 44 Q 85 41 95 44" fill="none" stroke="#9a6030" strokeWidth="1.3" opacity="0.65"/>
    <path d="M 79 40 Q 85 38 91 40" fill="none" stroke="#9a6030" strokeWidth="1" opacity="0.4"/>
    <path d="M 52 68 Q 56 74 60 77" fill="none" stroke="#9a6030" strokeWidth="1.2" opacity="0.4"/>
    <path d="M 118 68 Q 114 74 110 77" fill="none" stroke="#9a6030" strokeWidth="1.2" opacity="0.4"/>
  </svg>
)

const App = () => {
  const [myCount, setMyCount] = useState(0)
  const [herCount, setHerCount] = useState(0)
  const [bubble, setBubble] = useState(null)
  const bubbleTimer = useRef(null)

  const total = myCount + herCount

  const showBubble = (message) => {
    if (bubbleTimer.current) clearTimeout(bubbleTimer.current)
    setBubble({ message })
    bubbleTimer.current = setTimeout(() => setBubble(null), 3000)
  }

  const handleSelfIncrement = () => {
    const next = myCount + 1
    setMyCount(next)
    if (SELF_COMMENTS[next]) showBubble(pickRandom(SELF_COMMENTS[next]))
  }

  const handleHerIncrement = () => {
    const next = herCount + 1
    setHerCount(next)
    if (HER_COMMENTS[next]) showBubble(pickRandom(HER_COMMENTS[next]))
  }

  const handleReset = () => {
    setMyCount(0)
    setHerCount(0)
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-icon">🍸</div>
        <h1 className="app-title">ドリンクカウンター</h1>
      </header>

      <main className="app-main">
        <Counter
          label="相手"
          count={herCount}
          onIncrement={handleHerIncrement}
          onDecrement={() => setHerCount(c => Math.max(0, c - 1))}
        />
        <Counter
          label="自分"
          count={myCount}
          onIncrement={handleSelfIncrement}
          onDecrement={() => setMyCount(c => Math.max(0, c - 1))}
        />

        <div className="total-card">
          <span className="total-label">合計</span>
          <span className="total-value">{total}杯</span>
        </div>

        <button className="btn-reset" onClick={handleReset}>
          リセット
        </button>
      </main>

      <div className="character-container">
        {bubble && <SpeechBubble message={bubble.message} />}
        <GuardDogCharacter />
      </div>
    </div>
  )
}

export default App
