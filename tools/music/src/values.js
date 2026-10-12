/*
 * 音樂 Music · 第六課「音符的長短」的純函式：時值、附點、休止符、小節填滿、排成時間。
 * 沒有 DOM、沒有聲音，node 就能測：test/values.test.mjs。
 *
 * 約定：
 *   - 時值一律用「四分音符＝1 拍」為單位（x/4 拍號下 x 就是每小節拍數）：全音符 4、二分 2、四分 1、八分 1/2、十六分 1/4。
 *   - 附點使時值變成 1.5 倍（延長原時值的一半）。休止符和同時值的音符一樣長，只是沒有聲音。
 *   - 音符長短是「相對」的：實際幾秒要看速度（BPM）：一拍＝60 / BPM 秒（beat.js）。
 */
import { beatSeconds } from './beat.js';

export const VALUES = [
  { key: 'whole', beats: 4, en: 'whole note', zh: '全音符', rest_en: 'whole rest', rest_zh: '全休止符', flags: 0, open: true, stem: false },
  { key: 'half', beats: 2, en: 'half note', zh: '二分音符', rest_en: 'half rest', rest_zh: '二分休止符', flags: 0, open: true, stem: true },
  { key: 'quarter', beats: 1, en: 'quarter note', zh: '四分音符', rest_en: 'quarter rest', rest_zh: '四分休止符', flags: 0, open: false, stem: true },
  { key: 'eighth', beats: 0.5, en: 'eighth note', zh: '八分音符', rest_en: 'eighth rest', rest_zh: '八分休止符', flags: 1, open: false, stem: true },
  { key: 'sixteenth', beats: 0.25, en: 'sixteenth note', zh: '十六分音符', rest_en: 'sixteenth rest', rest_zh: '十六分休止符', flags: 2, open: false, stem: true },
];
export const valueOf = (key) => VALUES.find((v) => v.key === key);

/** 拍號 → 每小節幾個四分音符（只做 x/4） */
export const TIME_SIGS = { '2/4': 2, '3/4': 3, '4/4': 4 };
export const barBeats = (ts) => TIME_SIGS[ts];

/** 一個項目 { v:'quarter', dot:bool, rest:bool } 的拍數 */
export const itemBeats = (it) => valueOf(it.v).beats * (it.dot ? 1.5 : 1);
export const sumBeats = (items) => items.reduce((s, it) => s + itemBeats(it), 0);
const EPS = 1e-9;
export const remaining = (items, ts) => Math.max(0, barBeats(ts) - sumBeats(items));
export const canAdd = (items, it, ts) => itemBeats(it) <= remaining(items, ts) + EPS;
export const isFull = (items, ts) => remaining(items, ts) < EPS;

/** 項目的名稱（英文與中文），例如 dotted half note／附點二分音符、quarter rest／四分休止符 */
export function nameOf(it) {
  const v = valueOf(it.v);
  const en = it.rest ? v.rest_en : v.en, zh = it.rest ? v.rest_zh : v.zh;
  return { en: it.dot ? `dotted ${en}` : en, zh: it.dot ? `附點${zh}` : zh };
}

/** 排成時間：回傳 [{ i, beat（第幾拍開始）, beats, time, dur（秒）, rest, midi }]；旋律音依序取自 pitches（循環） */
export function scheduleBar(items, bpm, pitches = [60, 62, 64, 65, 67, 69, 67, 64]) {
  const spb = beatSeconds(bpm);
  let beat = 0, k = 0;
  return items.map((it, i) => {
    const b = itemBeats(it);
    const ev = { i, beat, beats: b, time: beat * spb, dur: b * spb, rest: !!it.rest, midi: it.rest ? null : pitches[k % pitches.length] };
    if (!it.rest) k++;
    beat += b;
    return ev;
  });
}

/** 「對半分」：把一小節（4 拍）平均分成 n 個音符：每個音符的拍數與時間 */
export function equalSplit(n, bpm, beats = 4) {
  const spb = beatSeconds(bpm), each = beats / n;
  return Array.from({ length: n }, (_, i) => ({ i, beat: i * each, beats: each, time: i * each * spb, dur: each * spb }));
}
export const SPLIT_ROWS = [1, 2, 4, 8, 16];            // 全音符、二分、四分、八分、十六分各填滿 4 拍所需的個數
export const splitValueKey = (n) => VALUES.find((v) => Math.abs(4 / n - v.beats) < EPS).key;

/** 「這個音符幾拍？」題目（4/4）：{ it, beats }，六至八題，相鄰不同 */
const ASK = [
  { v: 'whole' }, { v: 'half' }, { v: 'quarter' }, { v: 'eighth' }, { v: 'sixteenth' },
  { v: 'half', dot: true }, { v: 'quarter', dot: true },
  { v: 'quarter', rest: true }, { v: 'half', rest: true }, { v: 'eighth', rest: true },
];
export function makeBeatQuestions(rng, n = 8) {
  const pool = ASK.slice();
  for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
  return pool.slice(0, n).map((it) => ({ it, beats: itemBeats(it) }));
}
export const BEAT_OPTIONS = [0.25, 0.5, 1, 1.5, 2, 3, 4];
export const beatsLabel = (b) => ({ 0.25: '¼', 0.5: '½', 1: '1', 1.5: '1½', 2: '2', 3: '3', 4: '4' }[b] ?? String(b));
