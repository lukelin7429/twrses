/*
 * 音樂 Music · 音高的純函式（頻率、音名、弦長比例的換算）。沒有 DOM、沒有聲音，node 就能測：test/pitch.test.mjs。
 *
 * 約定（全系列共用）：
 *   - 標準音 A4 ＝ 440 Hz（ISO 16）；十二平均律：一個八度分成 12 個相等的半音，每個半音的頻率比是 2^(1/12)。
 *   - MIDI 音號：A4 ＝ 69，C4（中央 C）＝ 60；每差 1 就差一個半音。
 *   - 弦的頻率和「會振動的那一段」的長度成反比（張力、粗細不變）：f = f0 / r，r 是那一段占整根弦的比例。
 *   - 音分（cent）：一個八度 ＝ 1200 音分、一個十二平均律的半音 ＝ 100 音分。
 */

export const A4 = 440;
export const A4_MIDI = 69;
export const SEMITONE = 2 ** (1 / 12);

/** 英文音名（升記號用 ♯）與唱名（固定唱名法；台灣學校常用的 Do Re Mi Fa Sol La Si） */
export const LETTERS = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
export const SOLFEGE = ['Do', 'Do♯', 'Re', 'Re♯', 'Mi', 'Fa', 'Fa♯', 'Sol', 'Sol♯', 'La', 'La♯', 'Si'];
const WHITE = new Set([0, 2, 4, 5, 7, 9, 11]);

export const midiToFreq = (m, a4 = A4) => a4 * 2 ** ((m - A4_MIDI) / 12);
export const freqToMidiFloat = (f, a4 = A4) => A4_MIDI + 12 * Math.log2(f / a4);
export const isWhite = (m) => WHITE.has(((m % 12) + 12) % 12);

/** 音號 → { midi, letter:'C♯', octave:4, name:'C♯4', solfege:'Do♯', white } */
export function noteInfo(m) {
  const pc = ((m % 12) + 12) % 12;
  const octave = Math.floor(m / 12) - 1;
  return { midi: m, letter: LETTERS[pc], octave, name: `${LETTERS[pc]}${octave}`, solfege: SOLFEGE[pc], white: WHITE.has(pc) };
}

/** 最接近的鋼琴音名：{ midi, name, letter, octave, solfege, freq（那個音的標準頻率）, cents（你的頻率比它高幾音分，−50…+50）} */
export function nearestNote(f, a4 = A4) {
  const mf = freqToMidiFloat(f, a4);
  const m = Math.round(mf);
  return { ...noteInfo(m), freq: midiToFreq(m, a4), cents: (mf - m) * 100 };
}

/** 兩個頻率差幾音分（正數＝b 比 a 高） */
export const centsBetween = (a, b) => 1200 * Math.log2(b / a);
/** 頻率比 → 音分 */
export const ratioToCents = (r) => 1200 * Math.log2(r);
/** 往上 n 音分的頻率 */
export const shiftCents = (f, c) => f * 2 ** (c / 1200);
/** 兩個頻率差幾個八度 */
export const octavesBetween = (a, b) => Math.log2(b / a);

// ── 弦 ──────────────────────────────────────────────────────────────────
/** 會振動的那一段占整根弦的比例 r → 頻率（整根弦是 f0） */
export const stringFreq = (r, f0) => f0 / r;
/** 想要頻率 f，那一段要占整根弦的多少 */
export const stringRatio = (f, f0) => f0 / f;

/** 預設的幾個弦長：整根弦、1/2、2/3、3/4 與它們的簡單整數比名稱 */
export const PRESETS = [
  { key: 'whole', r: 1, num: 1, den: 1, en: 'Whole string', zh: '整根弦', interval_en: 'the open string', interval_zh: '空弦' },
  { key: 'half', r: 1 / 2, num: 1, den: 2, en: 'One half', zh: '二分之一', interval_en: 'octave (2 : 1)', interval_zh: '八度（2 : 1）' },
  { key: 'twothirds', r: 2 / 3, num: 2, den: 3, en: 'Two thirds', zh: '三分之二', interval_en: 'perfect fifth (3 : 2)', interval_zh: '純五度（3 : 2）' },
  { key: 'threequarters', r: 3 / 4, num: 3, den: 4, en: 'Three quarters', zh: '四分之三', interval_en: 'perfect fourth (4 : 3)', interval_zh: '純四度（4 : 3）' },
];

/** 簡單整數比 vs 十二平均律：弦長比 r 的頻率比 1/r，離最近的平均律半音差幾音分 */
export function justVsEqual(r) {
  const ratio = 1 / r;
  const justCents = ratioToCents(ratio);
  const semis = Math.round(justCents / 100);
  return { ratio, justCents, semis, equalRatio: SEMITONE ** semis, equalCents: semis * 100, diff: justCents - semis * 100 };
}

// ── 人耳的範圍 ───────────────────────────────────────────────────────────
export const HEAR_LOW = 20;
export const HEAR_HIGH = 20000;
/** 這個頻率在哪一區：'infra'（低於 20 Hz）／'audible'／'ultra'（高於 20,000 Hz） */
export const hearingZone = (f) => (f < HEAR_LOW ? 'infra' : f > HEAR_HIGH ? 'ultra' : 'audible');

/** 滑桿（0–1）↔ 頻率（對數刻度：每一段看起來一樣寬，就是每一個八度一樣寬） */
export const sliderToFreq = (t, lo, hi) => lo * (hi / lo) ** t;
export const freqToSlider = (f, lo, hi) => Math.log(f / lo) / Math.log(hi / lo);

/** 保守的音量上限：高頻的耳機聲音容易刺耳，超過 4 kHz 就把振幅壓下來（安全限制，不是響度模型） */
export function safeScale(f) {
  if (f <= 4000) return 1;
  return Math.max(0.12, (4000 / f) ** 1.2);
}

// ── 亂數與「哪一個比較高？」──────────────────────────────────────────────
export function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 八題：兩個音差幾音分，越後面越接近（700 音分＝一個純五度，25 音分＝不到半個半音的四分之一） */
export const HIGHER_GAPS = [700, 500, 300, 200, 100, 60, 40, 25];
export const HIGHER_LO = 220;
export const HIGHER_HI = 660;

/** 做一題：{ gap, a, b, higher: 'a'|'b' }。基準音在 220–660 Hz（對數均勻）隨機，誰高誰低也隨機。 */
export function makeHigherRound(rng, q) {
  const gap = HIGHER_GAPS[q];
  const base = sliderToFreq(rng(), HIGHER_LO, HIGHER_HI);
  const upper = shiftCents(base, gap);
  const swap = rng() < 0.5;
  return swap ? { gap, a: upper, b: base, higher: 'a' } : { gap, a: base, b: upper, higher: 'b' };
}

/** 鋼琴鍵盤：從 lo 到 hi（含）的音號清單 */
export const keyRange = (lo, hi) => Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
