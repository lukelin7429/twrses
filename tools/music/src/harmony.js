/*
 * 音樂 Music · 第八課「為什麼有些音放在一起很好聽？」的純函式：音程、簡單整數比、拍音、和弦。
 * 沒有 DOM、沒有聲音，node 就能測：test/harmony.test.mjs。
 *
 * 約定：
 *   - 純律（just）音程用簡單整數比 num:den（上面那個音的頻率 ÷ 下面那個音的頻率）：八度 2:1、完全五度 3:2、完全四度 4:3（國教院的標準譯名是「完全」五度，不是「純」）、大三度 5:4、小三度 6:5。
 *   - 十二平均律的同名音程是 semis × 100 音分（第一課）：兩者差幾音分用 centsDiff 算。
 *   - 兩個音一起響，合成的波形每隔 1 / (f1 / den) 秒重複一次；比值越簡單，重複得越快（repeatHz＝f1 ÷ den）。
 *   - 拍音（beating）：兩個接近的頻率疊在一起，音量一起一伏，每秒起伏的次數＝頻率差。對一個 num:den 的音程，
 *     「上面的音的第 den 諧波」和「下面的音的第 num 諧波」本來重合；上面的音調歪 f2' 時，拍音頻率＝|den × f2' − num × f1|。
 *     注意：這是樂音的「拍音」，和第三課「拍」（音樂的脈搏）是兩件事。
 *   - 和弦：大三和弦＝根音＋4＋7 個半音（大三度加純五度），小三和弦＝根音＋3＋7；純律的大三和弦頻率比 4 : 5 : 6。
 */
import { SEMITONE, midiToFreq, LETTERS } from './pitch.js';

export const INTERVALS = [
  { key: 'unison', semis: 0, num: 1, den: 1, en: 'Unison', zh: '同度' },
  { key: 'octave', semis: 12, num: 2, den: 1, en: 'Octave', zh: '八度' },
  { key: 'fifth', semis: 7, num: 3, den: 2, en: 'Perfect fifth', zh: '完全五度' },
  { key: 'fourth', semis: 5, num: 4, den: 3, en: 'Perfect fourth', zh: '完全四度' },
  { key: 'majthird', semis: 4, num: 5, den: 4, en: 'Major third', zh: '大三度' },
  { key: 'minthird', semis: 3, num: 6, den: 5, en: 'Minor third', zh: '小三度' },
  { key: 'majsecond', semis: 2, num: 9, den: 8, en: 'Major second', zh: '大二度' },
  { key: 'minsecond', semis: 1, num: 16, den: 15, en: 'Minor second', zh: '小二度' },
];
export const intervalOf = (key) => INTERVALS.find((i) => i.key === key);
export const BASE_HZ = 220;   // A3：用它做底，簡單比例算出來是整齊的數字（220、330、440…）

export const ratioOf = (iv) => iv.num / iv.den;
/** 純律音程比的音分 */
export const justCents = (iv) => 1200 * Math.log2(ratioOf(iv));
/** 純律音程比離十二平均律同名音程幾音分（正數＝純律比較高） */
export const centsDiff = (iv) => justCents(iv) - iv.semis * 100;
/** 十二平均律同名音程的頻率比 */
export const equalRatio = (iv) => SEMITONE ** iv.semis;
/** 兩個音（下面 f1、上面是比值 num:den）合成的波形，重複的頻率 */
export const repeatHz = (f1, iv) => f1 / iv.den;
/** 「差幾音分」變成頻率倍數 */
export const centsToRatio = (c) => 2 ** (c / 1200);
/** 上面那個音：純律的頻率，再調歪 cents 音分 */
export const upperHz = (f1, iv, cents = 0) => f1 * ratioOf(iv) * centsToRatio(cents);
/** 拍音頻率（每秒起伏幾次）：|den × f2' − num × f1| */
export const beatHz = (f1, f2, iv) => Math.abs(iv.den * f2 - iv.num * f1);
/** 兩個頻率的差（最簡單的拍音：同度時就是它） */
export const diffHz = (f1, f2) => Math.abs(f2 - f1);
/** 合成波形（畫圖用）：兩個正弦波相加，t 秒 */
export const sumWave = (f1, f2, t) => Math.sin(2 * Math.PI * f1 * t) + Math.sin(2 * Math.PI * f2 * t);

// ── 和弦 ────────────────────────────────────────────────────────────────
export const CHORDS = {
  major: { key: 'major', semis: [0, 4, 7], en: 'Major triad', zh: '大三和弦', ratio: [4, 5, 6] },
  minor: { key: 'minor', semis: [0, 3, 7], en: 'Minor triad', zh: '小三和弦', ratio: [10, 12, 15] },
  dim: { key: 'dim', semis: [0, 3, 6], en: 'Diminished triad', zh: '減三和弦', ratio: null },
  aug: { key: 'aug', semis: [0, 4, 8], en: 'Augmented triad', zh: '增三和弦', ratio: null },
};
export const buildChord = (rootMidi, kind) => CHORDS[kind].semis.map((s) => rootMidi + s);
const pcName = (m) => LETTERS[((m % 12) + 12) % 12];
/**
 * 判斷三個音是什麼和弦（不分八度、不分轉位）：回傳 { kind, root（音名）, rootMidi（最低的那個根音位置的音號）} 或 { kind:'other' }。
 * 少於或多於三個不同的音名時回傳 { kind:'other' }。
 */
export function classify(midis) {
  const pcs = [...new Set(midis.map((m) => ((m % 12) + 12) % 12))];
  if (pcs.length !== 3) return { kind: 'other' };
  for (const r of pcs) {
    const set = pcs.map((p) => (p - r + 12) % 12).sort((a, b) => a - b).join(',');
    for (const c of Object.values(CHORDS)) if (c.semis.join(',') === set) return { kind: c.key, root: pcName(r), rootPc: r };
  }
  return { kind: 'other' };
}

/** 題目：「這是大三和弦還是小三和弦？」n 題；根音 G3–F4 之間隨機，相鄰不同 */
export function makeChordRounds(rng, n = 6) {
  const out = [];
  let prev = '';
  for (let i = 0; i < n; i++) {
    let r;
    do { r = { root: 55 + Math.floor(rng() * 12), kind: rng() < 0.5 ? 'major' : 'minor' }; } while (`${r.root}${r.kind}` === prev);
    prev = `${r.root}${r.kind}`;
    out.push(r);
  }
  return out;
}
export const chordFreqs = (rootMidi, kind) => buildChord(rootMidi, kind).map((m) => midiToFreq(m));
