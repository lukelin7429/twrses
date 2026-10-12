/*
 * 音樂 Music · 第四課「力度與速度」的純函式：力度階梯、速度階梯、我們自己寫的短旋律、排程與漸強漸弱的增益。
 * 沒有 DOM、沒有聲音，node 就能測：test/dynamics.test.mjs。
 *
 * 約定：
 *   - 力度記號只表示「相對」的大小聲（pp < p < mp < mf < f < ff）；頁面用一個對數階梯的相對增益（每一階約 3–5 dB 的比例，
 *     這是示意），最大是 1.0，**不是任何真實的分貝**；增益再乘主音量與壓縮器，所以 ff 也不會比第一課的最大音量大。
 *   - 速度術語：頁面只用「相對順序」（largo 最慢 … presto 最快）；播放時各用一個 BPM，那是這一頁自己的選擇，不是規則
 *     （各家參考資料給的數字差很多，見課文）。
 *   - 旋律是自己寫的、很短（四小節、4/4、C 大調五個音附近），沒有用任何現成曲子。
 */
import { midiToFreq } from './pitch.js';

/** 力度階梯：相對增益 */
export const DYNAMICS = [
  { key: 'pp', it: 'pianissimo', en: 'very soft', zh: '很弱', gain: 0.1 },
  { key: 'p', it: 'piano', en: 'soft', zh: '弱', gain: 0.17 },
  { key: 'mp', it: 'mezzo piano', en: 'medium soft', zh: '中弱', gain: 0.28 },
  { key: 'mf', it: 'mezzo forte', en: 'medium loud', zh: '中強', gain: 0.45 },
  { key: 'f', it: 'forte', en: 'loud', zh: '強', gain: 0.72 },
  { key: 'ff', it: 'fortissimo', en: 'very loud', zh: '很強', gain: 1.0 },
];
export const dynOf = (key) => DYNAMICS.find((d) => d.key === key);

/** 速度階梯：由慢到快（順序有出處；播放用的 BPM 是這一頁自己的選擇） */
export const TEMPOS = [
  { key: 'largo', it: 'largo', en: 'broad, very slow', zh: '廣板（很慢）', bpm: 50 },
  { key: 'adagio', it: 'adagio', en: 'at ease, slow', zh: '慢板', bpm: 66 },
  { key: 'andante', it: 'andante', en: 'walking pace', zh: '行板（走路的速度）', bpm: 84 },
  { key: 'moderato', it: 'moderato', en: 'moderate', zh: '中板', bpm: 104 },
  { key: 'allegro', it: 'allegro', en: 'cheerful, lively', zh: '快板', bpm: 132 },
  { key: 'presto', it: 'presto', en: 'very fast', zh: '急板', bpm: 176 },
];
export const tempoOf = (key) => TEMPOS.find((t) => t.key === key);

/** 自己寫的旋律：[音號, 拍數]。四小節、4/4、共 16 拍。 */
export const MELODY = [
  [60, 1], [64, 1], [67, 1], [64, 1],     // C E G E
  [69, 1], [67, 1], [64, 2],              // A G E-
  [62, 1], [65, 1], [69, 1], [65, 1],     // D F A F
  [67, 2], [60, 2],                       // G- C-
];
export const MELODY_BEATS = MELODY.reduce((s, [, b]) => s + b, 0);

/** 力度的「形狀」：steady 不變、cresc 漸強（< ）、dim 漸弱（> ） */
export const SHAPES = ['steady', 'cresc', 'dim'];

/** 兩個增益之間用等比（對數）內插：t 0–1 */
export const lerpGain = (a, b, t) => a * (b / a) ** t;

/**
 * 排出整段旋律：回傳 [{ i, time, dur, midi, freq, gain }]（time 與 dur 的單位是秒，從 0 起算）。
 * dyn＝基準力度（steady 用它；cresc 從 dyn 的前兩階 → 往上到 dyn 的後兩階；dim 反過來）。
 */
export function planMelody({ bpm, dyn = 'mf', shape = 'steady', melody = MELODY } = {}) {
  const spb = 60 / bpm;
  const idx = DYNAMICS.findIndex((d) => d.key === dyn);
  const lo = DYNAMICS[Math.max(0, idx - 2)].gain, hi = DYNAMICS[Math.min(DYNAMICS.length - 1, idx + 2)].gain;
  const total = melody.reduce((s, [, b]) => s + b, 0);
  let beat = 0;
  return melody.map(([midi, beats], i) => {
    const t = total <= 1 ? 0 : beat / (total - beats > 0 ? total - beats : 1);   // 0 … 1：這個音在旋律裡的位置
    const x = Math.min(1, t);
    const gain = shape === 'cresc' ? lerpGain(lo, hi, x) : shape === 'dim' ? lerpGain(hi, lo, x) : DYNAMICS[idx].gain;
    const ev = { i, time: beat * spb, dur: beats * spb, midi, freq: midiToFreq(midi), gain };
    beat += beats;
    return ev;
  });
}

/** 整段旋律的長度（秒） */
export const melodySeconds = (bpm, melody = MELODY) => (melody.reduce((s, [, b]) => s + b, 0) * 60) / bpm;

/** 「這是哪一個記號？」六題：piano、forte、crescendo、diminuendo 各至少一次，相鄰不重複 */
export const SIGNS = [
  { key: 'p', it: 'piano', en: 'soft', zh: '弱', dyn: 'p', shape: 'steady' },
  { key: 'f', it: 'forte', en: 'loud', zh: '強', dyn: 'f', shape: 'steady' },
  { key: 'cresc', it: 'crescendo', en: 'gradually louder', zh: '漸強', dyn: 'mf', shape: 'cresc' },
  { key: 'dim', it: 'diminuendo', en: 'gradually softer', zh: '漸弱', dyn: 'mf', shape: 'dim' },
];
export function makeSignRounds(rng, n = 6) {
  const out = [];
  let prev = null;
  const need = SIGNS.map((s) => s.key);                 // 先各出現一次
  const pool = need.slice();
  while (pool.length < n) pool.push(SIGNS[Math.floor(rng() * SIGNS.length)].key);
  for (let t = 0; t < 80; t++) {
    for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
    if (pool.every((v, i) => i === 0 || v !== pool[i - 1])) break;
  }
  for (const k of pool) { out.push(k); prev = k; }
  void prev;
  return out;
}

/** 「哪一個是 allegro？」五題：從速度階梯挑兩個相差至少兩階的詞，答案是比較快的那個 */
export function makeTempoRounds(rng, n = 5) {
  const out = [];
  while (out.length < n) {
    const a = Math.floor(rng() * TEMPOS.length), b = Math.floor(rng() * TEMPOS.length);
    if (Math.abs(a - b) < 2) continue;
    const fast = Math.max(a, b), slow = Math.min(a, b);
    out.push(rng() < 0.5 ? { first: TEMPOS[slow].key, second: TEMPOS[fast].key, faster: 'second' } : { first: TEMPOS[fast].key, second: TEMPOS[slow].key, faster: 'first' });
  }
  return out;
}
