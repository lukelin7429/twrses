/*
 * 音樂 Music · 第二十課「誰寫了台灣人到現在還在唱的歌？」的純函式：用五聲音階（C D E G A）寫旋律。
 * 沒有 DOM、沒有聲音，node 就能測：test/compose.test.mjs。
 *
 * 約定（出處見 CLAUDE.md「音樂」一節第二十課）：
 *   - **沒有任何作曲家的旋律或歌詞**：頁面的現成旋律都是我們自己寫的；
 *   - 五聲音階 C D E G A（pitch class 0 2 4 7 9）：任兩個音之間都不會相差一個半音或三全音（這是可以用算的事實，測試證明）；
 *   - 加上 F（5）或 B（11）：F 在 E 的上面一個半音、B 在 C 的下面一個半音，所以會出現半音；
 *   - 回饋不是打分數：只列出旋律「做了什麼」（用到哪些音、有沒有回到 C、有沒有重複的小圖樣）。
 */
export const STEPS = 8;
export const BPM = 92;
export const beatSeconds = (bpm = BPM) => 60 / bpm;
export const PENTA_PC = [0, 2, 4, 7, 9];
export const PENTA = [60, 62, 64, 67, 69, 72];            // C4 D4 E4 G4 A4 C5
export const MISSING = [65, 71];                           // F4 B4：C 大調裡不在五聲音階的兩個音
export const ROWS = [72, 71, 69, 67, 65, 64, 62, 60];      // 由高到低（含 F 與 B）
export const NAMES = { 60: 'C', 62: 'D', 64: 'E', 65: 'F', 67: 'G', 69: 'A', 71: 'B', 72: 'C' };
export const isPenta = (m) => PENTA_PC.includes(((m % 12) + 12) % 12);
export const pcInterval = (a, b) => (((a - b) % 12) + 12) % 12;

/** 我們自己寫的現成旋律（每個 8 步，null＝休止），全部只用五聲音階，結束在 C */
export const STARTERS = [
  { key: 'rise', en: 'Climbing', zh: '一路往上', steps: [60, 62, 64, 64, 67, 69, 72, 72] },
  { key: 'wave', en: 'Waves', zh: '浪', steps: [64, 62, 60, 62, 64, 67, 64, 60] },
  { key: 'echo', en: 'Echo', zh: '回聲', steps: [67, 64, 67, 64, 69, 67, 64, 60] },
];
export const emptySteps = () => Array(STEPS).fill(null);

/** 一段旋律（steps：8 格，每格是 midi 或 null）的「做了什麼」 */
export function analyze(steps) {
  const notes = steps.filter((m) => m != null);
  const outside = [...new Set(notes.filter((m) => !isPenta(m)))].sort((a, b) => a - b);
  const last = [...steps].reverse().find((m) => m != null);
  // 重複的小圖樣：任意相鄰兩個音（含休止位置）的音程序列在別處又出現
  const pairs = [];
  for (let i = 0; i + 1 < steps.length; i++) if (steps[i] != null && steps[i + 1] != null) pairs.push([i, steps[i + 1] - steps[i]]);
  let repeat = false;
  for (let a = 0; a < pairs.length; a++) for (let b = a + 1; b < pairs.length; b++) if (pairs[a][1] === pairs[b][1] && pairs[a][1] !== 0 && Math.abs(pairs[a][0] - pairs[b][0]) >= 2) repeat = true;
  let leaps = 0, steps2 = 0;
  for (let i = 0; i + 1 < steps.length; i++) if (steps[i] != null && steps[i + 1] != null) { const d = Math.abs(steps[i + 1] - steps[i]); if (d >= 5) leaps++; else if (d > 0) steps2++; }
  const semitones = [];
  for (let i = 0; i + 1 < steps.length; i++) if (steps[i] != null && steps[i + 1] != null && pcInterval(steps[i], steps[i + 1]) % 12 && [1, 11].includes(pcInterval(steps[i], steps[i + 1]))) semitones.push(i);
  return {
    count: notes.length, distinct: new Set(notes).size, inScale: notes.length > 0 && outside.length === 0, outside,
    endsHome: last != null && last % 12 === 0, repeat, leaps, stepwise: steps2, semitones: semitones.length,
    range: notes.length ? Math.max(...notes) - Math.min(...notes) : 0,
  };
}
/** 播放事件 */
export function renderCompose(steps, { bpm = BPM } = {}) {
  const bs = beatSeconds(bpm);
  return steps.map((m, i) => (m == null ? null : { midi: m, step: i, time: i * bs, dur: bs * 0.95 })).filter(Boolean);
}
export const totalSeconds = (bpm = BPM) => STEPS * beatSeconds(bpm);

/** 「哪一個音不在五聲音階裡？」：五個音，其中一個是 F 或 B；其餘四個是五聲音階的音 */
export function makeOddRounds(rng, n = 6) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const odd = MISSING[i % 2 === 0 ? Math.floor(rng() * 2) : (i >> 1) % 2];
    const keep = PENTA.slice(0, 5).slice();           // C D E G A
    // 拿掉一個，換上 odd；選哪個被拿掉
    keep.splice(Math.floor(rng() * keep.length), 1);
    const set = keep.concat([odd]);
    for (let k = set.length - 1; k > 0; k--) { const j = Math.floor(rng() * (k + 1)); [set[k], set[j]] = [set[j], set[k]]; }
    out.push({ notes: set, odd });
  }
  if (out.every((r) => r.odd === 65) || out.every((r) => r.odd === 71)) out[0].odd = out[0].odd === 65 ? 71 : 65, out[0].notes = out[0].notes.map((m) => (m === 65 || m === 71 ? out[0].odd : m));
  return out;
}
/** 為什麼它不合：它和哪一個音相差一個半音（在這組音裡）；沒有就回 null */
export function whyOdd(notes, odd) {
  const near = notes.filter((m) => m !== odd && pcInterval(m, odd) % 12 && [1, 11].includes(pcInterval(m, odd)));
  return near.length ? near[0] : null;
}
