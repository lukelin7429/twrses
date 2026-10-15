/*
 * 音樂 Music · 第十四課「爵士樂為什麼聽起來像爵士？」的純函式：把每一拍裡的兩個八分音符從「平均」切成「長—短」。
 * 沒有 DOM、沒有聲音，node 就能測：test/swing.test.mjs。
 *
 * 約定（出處見 CLAUDE.md「音樂」一節第十四課）：
 *   - 旋律與伴奏是我們自己寫的（4 小節、4/4、C 大調、八分音符為主），不是任何現成的爵士曲。
 *   - 比例 ratio＝一拍裡「前一個八分音符」長度 ÷「後一個」長度。1＝平均（straight）；2＝前面是後面的兩倍（三連音的切法）。
 *     後一個八分音符（off-beat，反拍）開始在拍的 ratio/(ratio+1) 處：平均 0.5、2:1 為 2/3、3:1 為 0.75。
 *   - 搖擺**不改變速度**：每一拍的長度不變、四分音符不變，只有反拍八分音符的位置往後移。
 *   - 這裡只提供「比例」這個數學；爵士樂手實際用多少比例不固定，頁面不給「正確」的數字。
 */
import { midiToFreq } from './pitch.js';

export const BPM_MIN = 60;
export const BPM_MAX = 200;
export const RATIO_MIN = 1;
export const RATIO_MAX = 3;
export const clampRatio = (r) => Math.min(RATIO_MAX, Math.max(RATIO_MIN, r));
export const clampBpm = (b) => Math.min(BPM_MAX, Math.max(BPM_MIN, Math.round(b)));
export const beatSeconds = (bpm) => 60 / bpm;

/** 反拍八分音符開始在拍的哪個位置（0–1） */
export const offbeatPos = (ratio) => ratio / (ratio + 1);
/** 一拍裡兩個八分音符各佔多少（比例相加＝1） */
export const split = (ratio) => ({ first: offbeatPos(ratio), second: 1 / (ratio + 1) });
/** 第 i 個八分音符（0 起算）開始在第幾拍（可為小數）：偶數＝正拍，奇數＝反拍 */
export const eighthBeat = (i, ratio) => Math.floor(i / 2) + (i % 2 ? offbeatPos(ratio) : 0);
export const eighthSeconds = (i, bpm, ratio) => eighthBeat(i, ratio) * beatSeconds(bpm);
/** 把一個時間（以拍為單位）貼到最近的八分音符格 */
export function nearestEighth(beatPos, ratio) {
  let best = 0, bd = Infinity;
  const lo = Math.max(0, Math.floor(beatPos) * 2 - 2), hi = lo + 6;
  for (let i = lo; i <= hi; i++) { const d = Math.abs(eighthBeat(i, ratio) - beatPos); if (d < bd) { bd = d; best = i; } }
  return best;
}

/** 旋律：[midi, 起點（第幾個八分音符）, 長度（幾個八分音符）]。4 小節 × 8 個八分音符 = 32，結束在 C4。 */
export const MELODY = [
  [64, 0, 1], [67, 1, 1], [69, 2, 1], [67, 3, 1], [64, 4, 2], [62, 6, 1], [60, 7, 1],      // C | E G A G E(長) D C
  [62, 8, 1], [65, 9, 1], [69, 10, 1], [65, 11, 1], [62, 12, 2], [60, 15, 1],               // F | D F A F D(長) · C
  [67, 16, 1], [71, 17, 1], [74, 18, 1], [71, 19, 1], [67, 20, 1], [69, 21, 1], [71, 22, 2], // G | G B D B G A B(長)
  [72, 24, 1], [69, 25, 1], [67, 26, 1], [64, 27, 1], [62, 28, 1], [64, 29, 1], [60, 30, 2], // C | C A G E D E C(長)
];
export const EIGHTHS = 32;
export const BEATS = 16;
/** 每小節的低音（每拍一個四分音符）：C | F | G | C，自己寫的簡單低音線 */
export const BASS = [36, 40, 43, 40, 41, 45, 48, 45, 43, 47, 50, 47, 36, 40, 43, 36];
export const CHORD_NAMES = ['C', 'F', 'G', 'C'];

/**
 * 一個版本的所有事件：{ time, dur, midi, part: 'melody'|'bass'|'hat'|'beat', eighth, beat }。
 * time、dur 以秒計。melody 的 dur 依搖擺後的位置算（音符接到下一個八分音符的開頭）。
 */
export function renderSwing({ bpm = 120, ratio = 1, hat = true, bass = true } = {}) {
  const ev = [], bs = beatSeconds(bpm), r = clampRatio(ratio);
  MELODY.forEach(([midi, i, n]) => {
    const t = eighthSeconds(i, bpm, r), end = eighthSeconds(i + n, bpm, r);
    ev.push({ time: t, dur: end - t, midi, part: 'melody', eighth: i, beat: eighthBeat(i, r) });
  });
  if (bass) BASS.forEach((m, b) => ev.push({ time: b * bs, dur: bs * 0.9, midi: m, part: 'bass', eighth: b * 2, beat: b }));
  if (hat) for (let i = 0; i < EIGHTHS; i++) ev.push({ time: eighthSeconds(i, bpm, r), dur: 0.05, midi: 0, part: 'hat', eighth: i, beat: eighthBeat(i, r) });
  return ev.sort((a, b) => a.time - b.time || (a.part < b.part ? -1 : 1));
}
export const totalSeconds = (bpm) => BEATS * beatSeconds(bpm);
/** 旋律裡「落在反拍」的音有幾個（奇數的八分音符起點） */
export const offbeatNotes = () => MELODY.filter((n) => n[1] % 2 === 1).length;

/** 「平均還是搖擺？」的題目：每題 ratio 與速度 */
export const SWING_ROUNDS = [
  { ratio: 1, label: 'straight' }, { ratio: 2, label: 'swung' },
];
export function makeSwingRounds(rng, n = 6) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const swung = i % 2 === 1 ? rng() < 0.8 : rng() < 0.2;     // 大約一半一半，但不是剛好交錯
    out.push({ swung, ratio: swung ? [1.7, 2, 2.4, 3][Math.floor(rng() * 4)] : 1, bpm: [100, 120, 140][Math.floor(rng() * 3)] });
  }
  if (out.every((r) => r.swung) || out.every((r) => !r.swung)) { out[0].swung = !out[0].swung; out[0].ratio = out[0].swung ? 2 : 1; }
  return out;
}

/** 即興：用來點的音（C 大調五聲音階，第七課），與每個和弦小節。 */
export const PENTA = [60, 62, 64, 67, 69, 72];
export const noteName = (m) => ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'][m % 12];
export const freqOf = (m) => midiToFreq(m);
/** 把一串「被點的音」（beatPos 以拍為單位）貼到八分音符格，再依 ratio 排時間；同一格只留最後一個 */
export function quantizeTaps(taps, ratio, bpm) {
  const by = new Map();
  taps.forEach((t) => { by.set(nearestEighth(t.beat, ratio), t.midi); });
  return [...by.entries()].sort((a, b) => a[0] - b[0]).map(([i, midi]) => ({ eighth: i, midi, time: eighthSeconds(i, bpm, ratio) }));
}
