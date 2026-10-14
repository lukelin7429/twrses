/*
 * 音樂 Music · 第十二課「國樂器有哪些？」的純函式：吹、拉、彈、打、五聲音階（宮商角徵羽）的音高、各件樂器的聲音配方。
 * 沒有 DOM、沒有聲音，node 就能測：test/chinese.test.mjs。
 *
 * 約定（出處見 CLAUDE.md「音樂」一節第十二課）：
 *   - 演奏方式：吹（吹管）、拉（拉弦／擦弦）、彈（彈撥）、打（打擊）。對應第九課的「什麼在振動」：吹＝空氣柱、拉與彈＝弦、打＝膜或體。
 *   - 五聲音階：宮、商、角、徵、羽；以宮為主音時，各音距離主音 0、2、4、7、9 個半音（和第七課大調五聲的 1 2 3 5 6 相同）。
 *     與西樂唱名的對應只能說「大致」（Do Re Mi Sol La）：每一個音都可以當主音。
 *   - 這些聲音是我們自己合成的簡化配方，不是樂器的錄音；鑼的泛音比是示意，沒有測量依據。
 */
import { midiToFreq } from './pitch.js';

export const WAYS = [
  { key: 'blow', zh: '吹', en: 'Blow', hs: 'air column', hs_zh: '空氣柱', ex_zh: '笛、笙、嗩吶', how_en: 'Breath sets the air in a tube vibrating.', how_zh: '氣流讓管子裡的空氣振動。' },
  { key: 'bow', zh: '拉', en: 'Bow', hs: 'string', hs_zh: '弦', ex_zh: '二胡、高胡、中胡', how_en: 'A bow rubs the strings and sets them vibrating.', how_zh: '弓摩擦琴弦，讓弦振動。' },
  { key: 'pluck', zh: '彈', en: 'Pluck', hs: 'string', hs_zh: '弦', ex_zh: '琵琶、古箏、柳琴', how_en: 'A finger or a pick pulls the string and lets go.', how_zh: '手指或撥片勾起弦再放開。' },
  { key: 'strike', zh: '打', en: 'Strike', hs: 'membrane or body', hs_zh: '膜或體', ex_zh: '鼓、鑼、鈸', how_en: 'A stick or a hand hits a skin or a metal body.', how_zh: '槌子或手敲在皮或金屬上。' },
];
export const wayOf = (k) => WAYS.find((w) => w.key === k);

/** 樂器：只放辭典有逐字的（二胡、琵琶、笛、梆笛、鼓、鑼） */
export const INSTRUMENTS = [
  { key: 'erhu', way: 'bow', en: 'Erhu', zh: '二胡', hs: 'chordophone', strings: 2 },
  { key: 'pipa', way: 'pluck', en: 'Pipa', zh: '琵琶', hs: 'chordophone', strings: 4 },
  { key: 'dizi', way: 'blow', en: 'Dizi', zh: '笛', hs: 'aerophone' },
  { key: 'gu', way: 'strike', en: 'Drum (gu)', zh: '鼓', hs: 'membranophone' },
  { key: 'luo', way: 'strike', en: 'Gong (luo)', zh: '鑼', hs: 'idiophone' },
];
export const instrumentOf = (k) => INSTRUMENTS.find((i) => i.key === k);
/** 梆笛的孔（教育部辭典）：一個吹孔、一個膜孔、六個按音孔 */
export const BANGDI_HOLES = { blow: 1, membrane: 1, finger: 6 };

// ── 五聲音階 ────────────────────────────────────────────────────────────
export const PENTATONIC = [
  { key: 'gong', zh: '宮', py: 'gōng', semis: 0, solfege: 'Do' },
  { key: 'shang', zh: '商', py: 'shāng', semis: 2, solfege: 'Re' },
  { key: 'jue', zh: '角', py: 'jué', semis: 4, solfege: 'Mi' },
  { key: 'zhi', zh: '徵', py: 'zhǐ', semis: 7, solfege: 'Sol' },
  { key: 'yu', zh: '羽', py: 'yǔ', semis: 9, solfege: 'La' },
];
export const noteMidi = (idx, tonic = 62, octave = 0) => tonic + PENTATONIC[idx % 5].semis + 12 * (octave + Math.floor(idx / 5));
export const noteFreq = (idx, tonic = 62) => midiToFreq(noteMidi(idx, tonic));
/** 一段自己寫的短旋律：用五聲音階的音（索引 0–9；5 以上是高八度），每個音的拍數 */
export const TUNE = [
  { i: 0, b: 1 }, { i: 1, b: 1 }, { i: 2, b: 1 }, { i: 1, b: 1 },
  { i: 2, b: 1 }, { i: 3, b: 1 }, { i: 4, b: 2 },
  { i: 5, b: 1 }, { i: 4, b: 1 }, { i: 3, b: 1 }, { i: 2, b: 1 },
  { i: 1, b: 1 }, { i: 0, b: 3 },
];
export const tuneBeats = () => TUNE.reduce((s, n) => s + n.b, 0);
/** 排成時間（秒）：bpm 每分鐘幾拍 */
export function scheduleTune(bpm = 96, tonic = 62) {
  const spb = 60 / bpm; let t = 0;
  return TUNE.map((n) => { const e = { i: n.i, midi: noteMidi(n.i, tonic), freq: noteFreq(n.i, tonic), time: t, dur: n.b * spb }; t += n.b * spb; return e; });
}

// ── 聲音配方（我們的簡化）─────────────────────────────────────────────────
/** 回傳 { kind:'complex'|'inharmonic', amps/ratios, env, dur, noise, gain } */
export function recipeOf(key, f0) {
  if (key === 'erhu') {      // 弓拉：高諧波多、起音慢、有一點顫音（顫音由頁面處理）
    return { kind: 'complex', amps: [1, 0.7, 0.55, 0.42, 0.32, 0.25, 0.18, 0.12], env: { attack: 0.12, decay: 1.2, sustain: 0.8 }, dur: 1.8, noise: null, gain: 0.55 };
  }
  if (key === 'pipa') {      // 撥弦：起音很快、衰減
    return { kind: 'complex', amps: [1, 0.8, 0.6, 0.45, 0.3, 0.2, 0.12, 0.08], env: { attack: 0.003, decay: 0.9, sustain: 0 }, dur: 1.6, noise: null, gain: 0.7 };
  }
  if (key === 'dizi') {      // 吹管：基音強、有氣息噪音、膜孔讓聲音帶一點嗡嗡的明亮（我們用多一點高諧波與噪音表示）
    return { kind: 'complex', amps: [1, 0.35, 0.45, 0.2, 0.25, 0.12, 0.1], env: { attack: 0.07, decay: 0.5, sustain: 0.85 }, dur: 1.4, noise: { freq: f0 * 4, q: 1.5, dur: 0.6, gain: 0.1, type: 'bandpass' }, gain: 0.5 };
  }
  if (key === 'gu') {        // 鼓：不諧波＋短噪音
    return { kind: 'inharmonic', ratios: [1, 1.593, 2.135, 2.295, 2.917], amps: [1, 0.7, 0.5, 0.4, 0.3], damp: 3, dur: 0.7, noise: { freq: f0 * 1.5, q: 0.8, dur: 0.12, gain: 0.5, type: 'lowpass' }, gain: 0.8 };
  }
  // 鑼：不諧波（比例是示意）、很長的尾音
  return { kind: 'inharmonic', ratios: [1, 1.52, 2.17, 2.51, 3.1], amps: [1, 0.8, 0.6, 0.45, 0.3], damp: 0.25, dur: 3.2, noise: null, gain: 0.7 };
}
export const MELODIC = ['erhu', 'pipa', 'dizi'];

// ── 題目：「吹、拉、彈、打？」────────────────────────────────────────────
export function makeWayRounds(rng, n = 6) {
  const items = INSTRUMENTS.map((i) => i.key), out = items.slice();
  while (out.length < n) out.push(items[Math.floor(rng() * items.length)]);
  for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [out[i], out[j]] = [out[j], out[i]]; }
  for (let i = 1; i < out.length; i++) if (out[i] === out[i - 1]) { const j = out.findIndex((k, x) => x > i && k !== out[i] && out[x - 1] !== k); if (j > 0) [out[i], out[j]] = [out[j], out[i]]; }
  const hz = { erhu: [293.66, 392.0, 440.0], pipa: [196.0, 261.63, 329.63], dizi: [440.0, 523.25, 587.33], gu: [110, 130.81], luo: [130.81, 196] };
  return out.slice(0, n).map((k) => ({ key: k, f0: hz[k][Math.floor(rng() * hz[k].length)] }));
}
