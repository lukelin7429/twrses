/*
 * 音樂 Music · 第七課「音階是什麼？」的純函式：全音與半音、音階的排列圖樣、依音名拼寫、同一段旋律換音階。
 * 沒有 DOM、沒有聲音，node 就能測：test/scale.test.mjs。
 *
 * 約定：
 *   - 半音＝十二平均律裡相鄰兩個鍵（頻率比 2^(1/12)，第一課）；全音＝兩個半音。
 *   - 音階用「離主音幾個半音」列出（含高八度的主音）；大調 0 2 4 5 7 9 11 12，自然小調 0 2 3 5 7 8 10 12，
 *     大調五聲音階（1 2 3 5 6）0 2 4 7 9 12，小調五聲音階（1 ♭3 4 5 ♭7）0 3 5 7 10 12。
 *   - 拼寫：七聲音階每一級用不同的字母（C D E F G A B 依序），所以 D 大調是 D E F♯ G A B C♯ D，不是 D E G♭…；
 *     五聲音階從七聲音階裡挑出對應的級，字母與升降記號照七聲音階的拼法。
 *   - 這一課的主音只用 C D E F G A B（白鍵）；另有一個黑鍵五聲音階（F♯ G♯ A♯ C♯ D♯）的示範。
 */
import { SEMITONE, midiToFreq } from './pitch.js';
import { LETTERS, WHITE_SEMI, stepToMidi, stepToPos } from './staff.js';
import { beatSeconds } from './beat.js';

export const SCALES = {
  major: { key: 'major', en: 'Major scale', zh: '大調音階', semis: [0, 2, 4, 5, 7, 9, 11, 12], degs: [0, 1, 2, 3, 4, 5, 6, 7] },
  minor: { key: 'minor', en: 'Natural minor scale', zh: '自然小調音階', semis: [0, 2, 3, 5, 7, 8, 10, 12], degs: [0, 1, 2, 3, 4, 5, 6, 7] },
  majpent: { key: 'majpent', en: 'Major pentatonic scale', zh: '大調五聲音階', semis: [0, 2, 4, 7, 9, 12], degs: [0, 1, 2, 4, 5, 7] },
  minpent: { key: 'minpent', en: 'Minor pentatonic scale', zh: '小調五聲音階', semis: [0, 3, 5, 7, 10, 12], degs: [0, 2, 3, 4, 6, 7] },
};
export const SCALE_KEYS = ['major', 'minor', 'majpent', 'minpent'];
export const TONICS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
export const ACC = { '-1': '♭', 0: '', 1: '♯' };

/** 音階裡相鄰兩音相差幾個半音：[2,2,1,2,2,2,1] */
export const gaps = (semis) => semis.slice(1).map((s, i) => s - semis[i]);
/** 一段距離（半音數）的說法 */
export function gapName(n) {
  if (n === 1) return { short: 'H', en: 'half step', zh: '半音' };
  if (n === 2) return { short: 'W', en: 'whole step', zh: '全音' };
  if (n === 3) return { short: 'W+H', en: 'a whole step and a half step (3 semitones)', zh: '一個全音加一個半音（3 個半音）' };
  return { short: String(n), en: `${n} semitones`, zh: `${n} 個半音` };
}
/** 「W W H W W W H」 */
export const patternOf = (semis) => gaps(semis).map((g) => gapName(g).short).join(' ');
/** 相鄰兩音的頻率比（十二平均律）：2^(半音數/12) */
export const gapRatio = (n) => SEMITONE ** n;

/**
 * 依主音（字母 C–G、A、B，在第 octave 八度；acc 為主音自己的升降 −1/0/1）與音階種類拼出整個音階。
 * 回傳 [{ i（第幾個音，從 0）, deg（七聲級 0–7，五聲音階會跳過）, midi, freq, letter, acc, accSym, name:'F♯4', step, pos（高音譜號位置）}]。
 */
export function spell(tonic, scaleKey, { octave = 4, acc = 0 } = {}) {
  const sc = SCALES[scaleKey];
  const li = LETTERS.indexOf(tonic);
  if (li < 0) throw new Error(`bad tonic ${tonic}`);
  const tonicStep = octave * 7 + li;
  const tonicMidi = stepToMidi(tonicStep) + acc;
  return sc.semis.map((semi, i) => {
    const step = tonicStep + sc.degs[i];
    const midi = tonicMidi + semi;
    const a = midi - stepToMidi(step);
    const letter = LETTERS[((step % 7) + 7) % 7], oct = Math.floor(step / 7);
    return { i, deg: sc.degs[i], midi, freq: midiToFreq(midi), letter, acc: a, accSym: ACC[a] ?? (a > 0 ? '𝄪' : '𝄫'), name: `${letter}${ACC[a] ?? ''}${oct}`, step, pos: stepToPos(step, 'treble'), semi };
  });
}
/** 名稱（沒有八度）例如 C D E♭ F G A♭ B♭ C */
export const spellNames = (notes) => notes.map((n) => `${n.letter}${n.accSym}`);

/** 同一段旋律：用「音階裡的第幾個音」記（0＝主音），換音階就換音高；八個音，上去再下來，回到主音 */
export const TUNE_IDX = [0, 1, 2, 3, 4, 2, 1, 0];
export const TUNE_BEATS = [1, 1, 1, 1, 1, 1, 1, 2];
export const TUNES_SCALES = ['major', 'minor', 'majpent'];
export function tuneNotes(tonic, scaleKey, opts = {}) {
  const sc = spell(tonic, scaleKey, opts);
  return TUNE_IDX.map((k, n) => ({ ...sc[k], beats: TUNE_BEATS[n] }));
}

/** 排成時間：notes（含 midi）依序，每個音 beats 拍（預設 1），回傳 [{ i, midi, time, dur }] */
export function scheduleNotes(notes, bpm, defaultBeats = 1) {
  const spb = beatSeconds(bpm);
  let t = 0;
  return notes.map((n, i) => {
    const b = n.beats ?? defaultBeats, ev = { i, midi: n.midi, time: t, dur: b * spb };
    t += b * spb;
    return ev;
  });
}

/** 「這是哪一種音階？」題目：{ tonic, scale }，n 題，相鄰不同；音階只出大調、小調、大調五聲 */
export function makeScaleRounds(rng, n = 6) {
  const out = [];
  let prev = '';
  for (let i = 0; i < n; i++) {
    let r;
    do {
      r = { tonic: TONICS[Math.floor(rng() * TONICS.length)], scale: TUNES_SCALES[Math.floor(rng() * TUNES_SCALES.length)] };
    } while (`${r.tonic}${r.scale}` === prev);
    prev = `${r.tonic}${r.scale}`;
    out.push(r);
  }
  return out;
}

/** 黑鍵五聲音階：F♯ G♯ A♯ C♯ D♯（F♯ 大調五聲音階） */
export const BLACK_KEYS = [66, 68, 70, 73, 75];
export const isBlackMidi = (m) => !WHITE_SEMI.includes(((m % 12) + 12) % 12);
