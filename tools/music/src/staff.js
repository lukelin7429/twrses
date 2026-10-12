/*
 * 音樂 Music · 五線譜的純函式（單元二各課共用）：自然音（白鍵）↔ 譜上的位置、譜號、加線、位置的說法。
 * 沒有 DOM、沒有聲音，node 就能測：test/staff.test.mjs。
 *
 * 約定：
 *   - 「階」step：C0＝0、D0＝1 … B0＝6、C1＝7 …（每個八度七階；只算白鍵，升降記號與階數無關）。
 *   - 位置 pos：以半格為單位，從最下面那條線算起：0＝第一線、1＝第一間、2＝第二線 … 8＝第五線（最上面）；
 *     小於 0 在五線下方、大於 8 在上方；偶數在線（或加線）上、奇數在間裡。
 *   - 高音譜號（G 譜號）的最下面那條線是 E4（階 30）；低音譜號（F 譜號）最下面那條線是 G2（階 18）。
 *   - 同一個位置，高音譜號與低音譜號差兩個八度少一階（中央 C 在高音譜號下加一線、在低音譜號上加一線）。
 */
import { midiToFreq, noteInfo } from './pitch.js';

export const CLEFS = {
  treble: { key: 'treble', en: 'Treble clef (G clef)', zh: '高音譜號（G 譜號）', bottomStep: 30, anchorPos: 2, anchorName: 'G4' },
  bass: { key: 'bass', en: 'Bass clef (F clef)', zh: '低音譜號（F 譜號）', bottomStep: 18, anchorPos: 6, anchorName: 'F3' },
};
export const WHITE_SEMI = [0, 2, 4, 5, 7, 9, 11];
export const LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
export const SOLFEGE_WHITE = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];

/** 階 → 音號（MIDI）；C4＝60 */
export const stepToMidi = (step) => 12 * (Math.floor(step / 7) + 1) + WHITE_SEMI[((step % 7) + 7) % 7];
/** 白鍵的音號 → 階（不是白鍵會丟錯） */
export function midiToStep(m) {
  const pc = ((m % 12) + 12) % 12, i = WHITE_SEMI.indexOf(pc);
  if (i < 0) throw new Error(`not a natural note: ${m}`);
  return (Math.floor(m / 12) - 1) * 7 + i;
}
/** 階 → { letter:'C', octave:4, name:'C4', solfege:'Do', midi, freq } */
export function stepInfo(step) {
  const i = ((step % 7) + 7) % 7, o = Math.floor(step / 7), m = stepToMidi(step);
  return { step, letter: LETTERS[i], octave: o, name: `${LETTERS[i]}${o}`, solfege: SOLFEGE_WHITE[i], midi: m, freq: midiToFreq(m) };
}

export const posToStep = (pos, clef) => CLEFS[clef].bottomStep + pos;
export const stepToPos = (step, clef) => step - CLEFS[clef].bottomStep;
export const posToMidi = (pos, clef) => stepToMidi(posToStep(pos, clef));
export const midiToPos = (m, clef) => stepToPos(midiToStep(m), clef);
export const posInfo = (pos, clef) => stepInfo(posToStep(pos, clef));

export const isLinePos = (pos) => ((pos % 2) + 2) % 2 === 0;
/** 這個位置需要哪些加線（位置清單，離五線最近的先）。在五線下方：-2、-4…；上方：10、12… */
export function ledgerPositions(pos) {
  const out = [];
  if (pos <= -2) for (let p = -2; p >= pos; p -= 2) out.push(p);
  else if (pos >= 10) for (let p = 10; p <= pos; p += 2) out.push(p);
  return out;
}

const ORD = ['first', 'second', 'third', 'fourth', 'fifth'];
const ORD_ZH = ['第一', '第二', '第三', '第四', '第五'];
/** 位置的說法（英文與中文） */
export function describePos(pos) {
  if (pos >= 0 && pos <= 8) {
    return isLinePos(pos)
      ? { en: `on the ${ORD[pos / 2]} line`, zh: `在${ORD_ZH[pos / 2]}線上` }
      : { en: `in the ${ORD[(pos - 1) / 2]} space`, zh: `在${ORD_ZH[(pos - 1) / 2]}間裡` };
  }
  const below = pos < 0, n = below ? -pos : pos - 8;           // 離最近那條線幾個半格
  const k = Math.ceil(n / 2);
  if (isLinePos(pos)) {
    return { en: `on the ${ORD[k - 1] || k + 'th'} ledger line ${below ? 'below' : 'above'} the staff`, zh: `在五線${below ? '下' : '上'}方的${ORD_ZH[k - 1] || '第' + k}條加線上` };
  }
  return k === 1
    ? { en: `in the space just ${below ? 'below' : 'above'} the staff`, zh: `在五線${below ? '下' : '上'}方緊鄰的間裡` }
    : { en: `in the space ${below ? 'below' : 'above'} the ${ORD[k - 2]} ledger line`, zh: `在${ORD_ZH[k - 2]}條加線${below ? '下' : '上'}方的間裡` };
}

/** 一個譜號下，五條線（由下往上）與四個間的音名 */
export function staffNames(clef) {
  const lines = [0, 2, 4, 6, 8].map((p) => posInfo(p, clef).name);
  const spaces = [1, 3, 5, 7].map((p) => posInfo(p, clef).name);
  return { lines, spaces };
}

/** 題目：在位置範圍內隨機出 n 題，相鄰不同位置；清單元素 { clef, pos } */
export function makeStaffRounds(rng, n = 8, range = { treble: [-2, 10], bass: [-2, 10] }) {
  const out = [];
  let prev = -99;
  for (let i = 0; i < n; i++) {
    const clef = i % 2 === 0 ? 'treble' : 'bass';
    const [lo, hi] = range[clef];
    let pos;
    do { pos = lo + Math.floor(rng() * (hi - lo + 1)); } while (pos === prev);
    prev = pos;
    out.push({ clef, pos });
  }
  return out;
}
