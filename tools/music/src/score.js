/*
 * 音樂 Music · 第十九課「貝多芬聽不見了，怎麼還能作曲？」的純函式：看譜，在腦子裡「聽」。
 * 沒有 DOM、沒有聲音，node 就能測：test/score.test.mjs。
 *
 * 約定（出處見 CLAUDE.md「音樂」一節第十九課）：
 *   - **沒有任何貝多芬或現成的旋律**：旋律是我們自己寫的（4 小節、每小節 4 個四分音符、C 大調、結束在 C）；
 *   - 「在腦子裡聽」：把某幾小節設成「無聲」，譜還在畫面上，音不響；等一下再按「揭曉」把無聲的小節補播出來對答案；
 *   - 「看譜猜旋律的樣子」：一小節四個音的輪廓（contour）分五種：上行、下行、先上後下（山峰）、先下後上（山谷）、鋸齒。
 */
import { midiToPos } from './staff.js';

export const BPM = 84;
export const beatSeconds = (bpm = BPM) => 60 / bpm;
export const BARS = 4;
export const BAR_BEATS = 4;
export const MELODY = [
  64, 65, 67, 64,     // 小節 1
  67, 69, 67, 65,     // 小節 2
  64, 67, 72, 67,     // 小節 3
  69, 65, 62, 60,     // 小節 4（結束在 C）
];
export const posOf = (midi) => midiToPos(midi, 'treble');
export const barOf = (i) => Math.floor(i / BAR_BEATS);

/** silent：被設成「無聲」的小節（0 起算）的集合。回傳 { notes:[{midi,time,dur,bar,sound}], total, silentSeconds } */
export function renderScore(silent = [], { bpm = BPM } = {}) {
  const bs = beatSeconds(bpm), sil = new Set(silent);
  const notes = MELODY.map((midi, i) => ({ midi, beat: i, time: i * bs, dur: bs * 0.92, bar: barOf(i), sound: !sil.has(barOf(i)) }));
  return { notes, total: MELODY.length * bs, silentSeconds: [...sil].filter((b) => b >= 0 && b < BARS).length * BAR_BEATS * bs };
}
export const soundingCount = (silent) => renderScore(silent).notes.filter((n) => n.sound).length;

/** 輪廓：看相鄰兩音是上（+）、下（−） */
export const CONTOURS = [
  { key: 'up', en: 'Climbing', zh: '一路往上', hint_en: 'every note is higher than the one before', hint_zh: '每個音都比前一個高' },
  { key: 'down', en: 'Falling', zh: '一路往下', hint_en: 'every note is lower than the one before', hint_zh: '每個音都比前一個低' },
  { key: 'peak', en: 'A hill', zh: '山峰', hint_en: 'up first, then down', hint_zh: '先往上，再往下' },
  { key: 'valley', en: 'A valley', zh: '山谷', hint_en: 'down first, then up', hint_zh: '先往下，再往上' },
  { key: 'zigzag', en: 'Zigzag', zh: '鋸齒', hint_en: 'up, down, up, or down, up, down', hint_zh: '上下上，或下上下' },
];
export const contourOf = (key) => CONTOURS.find((c) => c.key === key);
export function classify(pitches) {
  const s = pitches.slice(1).map((m, i) => Math.sign(m - pitches[i]));
  if (s.includes(0)) return 'steady';
  const k = s.map((x) => (x > 0 ? '+' : '-')).join('');
  return { '+++': 'up', '---': 'down', '++-': 'peak', '+--': 'peak', '--+': 'valley', '-++': 'valley', '+-+': 'zigzag', '-+-': 'zigzag' }[k];
}
const SCALE = [60, 62, 64, 65, 67, 69, 71, 72];
/** 題目：n 題，每題一個 4 音小節與三個選項（一個對、兩個不對）；五種輪廓都會出現，相鄰不同 */
export function makeContourRounds(rng, n = 6) {
  const keys = CONTOURS.map((c) => c.key);
  const order = keys.slice();
  for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
  while (order.length < n) { const k = keys[Math.floor(rng() * keys.length)]; if (k !== order[order.length - 1]) order.push(k); }
  return order.slice(0, n).map((target) => {
    let pitches;
    for (let t = 0; t < 2000; t++) {
      pitches = [0, 1, 2, 3].map(() => SCALE[Math.floor(rng() * SCALE.length)]);
      if (classify(pitches) === target) break;
    }
    const others = keys.filter((k) => k !== target);
    for (let i = others.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [others[i], others[j]] = [others[j], others[i]]; }
    const options = [target, others[0], others[1]];
    for (let i = options.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [options[i], options[j]] = [options[j], options[i]]; }
    return { pitches, answer: target, options };
  });
}
