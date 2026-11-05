/*
 * 音樂 Music · 第十七課「一首歌是怎麼組成的？」的純函式：用 A、B、C 三個色塊（段落）排出一首歌的結構。
 * 沒有 DOM、沒有聲音，node 就能測：test/form.test.mjs。
 *
 * 約定（出處見 CLAUDE.md「音樂」一節第十七課）：
 *   - 三個段落是我們自己寫的短旋律（各 2 小節、8 拍，4/4），不是任何現成的歌：
 *     A（比較平靜，結束在 D，沒有「到家」）、B（比較高、比較明亮，結束在 C，回到主音）、C（對比：換一個音區與色彩，結束在 G，把人帶回去）；
 *   - 同一個段落每次出現，旋律與伴奏都**完全一樣**（重複）；不同段落旋律不一樣（變化／對比）；
 *   - 「主歌」「副歌」「橋段」是常用的名稱，頁面只在有出處的地方用；結構一律用字母 A、B、C 表示。
 */
export const SECTION_BEATS = 8;
export const BPM = 100;
export const beatSeconds = (bpm = BPM) => 60 / bpm;
export const MAX_SLOTS = 8;
export const SECTIONS = {
  A: { key: 'A', en: 'Section A', zh: 'A 段', melody: [64, 64, 65, 67, 67, 65, 64, 62], bass: [48, 55, 43, 50] },
  B: { key: 'B', en: 'Section B', zh: 'B 段', melody: [67, 67, 72, 72, 71, 69, 67, 72], bass: [48, 52, 43, 47] },
  C: { key: 'C', en: 'Section C', zh: 'C 段', melody: [69, 72, 69, 64, 65, 69, 67, 67], bass: [45, 52, 41, 48] },
};
export const KEYS = ['A', 'B', 'C'];
export const FORMS = [
  { key: 'AABA', en: 'A A B A', zh: 'A A B A' },
  { key: 'ABAB', en: 'A B A B', zh: 'A B A B' },
  { key: 'ABCB', en: 'A B C B', zh: 'A B C B' },
  { key: 'AAB', en: 'A A B', zh: 'A A B' },
];
export const formOf = (k) => FORMS.find((f) => f.key === k);

/** 一個結構（字串，例如 'ABAB'）→ 事件：{ part:'melody'|'bass', section, slot, midi, time, dur, beat } */
export function renderForm(form, { bpm = BPM } = {}) {
  const bs = beatSeconds(bpm), ev = [];
  [...form].forEach((k, slot) => {
    const sec = SECTIONS[k], base = slot * SECTION_BEATS;
    sec.melody.forEach((m, i) => ev.push({ part: 'melody', section: k, slot, midi: m, beat: base + i, time: (base + i) * bs, dur: bs * 0.92 }));
    sec.bass.forEach((m, i) => ev.push({ part: 'bass', section: k, slot, midi: m, beat: base + i * 2, time: (base + i * 2) * bs, dur: bs * 1.8 }));
  });
  return ev.sort((a, b) => a.time - b.time || (a.part < b.part ? -1 : 1));
}
export const totalBeats = (form) => form.length * SECTION_BEATS;
export const totalSeconds = (form, bpm = BPM) => totalBeats(form) * beatSeconds(bpm);
/** 有幾個「不同」的段落、有幾次是「回來」（重複） */
export const distinctCount = (form) => new Set(form).size;
export const repeatCount = (form) => form.length - distinctCount(form);
/** 每個段落出現的位置（第幾格，從 1 起算） */
export function positions(form) {
  const out = {}; [...form].forEach((k, i) => { (out[k] = out[k] || []).push(i + 1); }); return out;
}
/** 題目：四種結構各至少一次，相鄰不同 */
export function makeFormRounds(rng, n = 6) {
  const keys = FORMS.map((f) => f.key);
  for (let tries = 0; tries < 200; tries++) {
    const out = keys.slice();
    while (out.length < n) out.push(keys[Math.floor(rng() * keys.length)]);
    for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [out[i], out[j]] = [out[j], out[i]]; }
    if (out.every((k, i) => i === 0 || k !== out[i - 1])) return out.slice(0, n);
  }
  return keys.concat(keys).slice(0, n);
}
