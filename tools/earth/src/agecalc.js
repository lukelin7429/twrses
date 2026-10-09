// 第十五課：我們怎麼知道地球幾歲？
// 半衰期：每過一個半衰期，原來的原子就剩下一半
export const remaining = (halfLives) => 0.5 ** Math.max(0, halfLives);
export const halfLivesFrom = (fraction) => -Math.log2(Math.min(1, Math.max(1e-9, fraction)));
// 三座「鐘」（半衰期，年；Wikipedia “Uranium–lead dating”、“Radiocarbon dating”）
export const CLOCKS = {
  u238: { half: 4.47e9 },      // 鈾 238 → 鉛 206
  u235: { half: 7.1e8 },       // 鈾 235 → 鉛 207
  c14: { half: 5730 },         // 碳 14 → 氮 14
};
export const ageYears = (clock, halfLives) => CLOCKS[clock].half * halfLives;
export const EARTH = 4.54e9;                                   // 地球的年齡（年）
export const T_MAX = 5;                                        // 模型最多看五個半衰期
// 把年數寫成好讀的樣子
export function fmtYears(y) {
  if (y >= 1e9) return { n: (y / 1e9).toFixed(2), en: 'billion years', zh: '十億年', zhFull: `${(y / 1e8).toFixed(1)} 億年` };
  if (y >= 1e6) return { n: (y / 1e6).toFixed(0), en: 'million years', zh: '百萬年', zhFull: y >= 1e8 ? `${(y / 1e8).toFixed(1)} 億年` : `${Math.round(y / 1e4).toLocaleString('en-US')} 萬年` };
  return { n: Math.round(y).toLocaleString('en-US'), en: 'years', zh: '年', zhFull: `${Math.round(y).toLocaleString('en-US')} 年` };
}
// 把地球的歷史縮成一天：幾百萬年前的事，是幾點幾分幾秒（從午夜算起的秒數）
export const daySeconds = (millionYearsAgo, totalMa = EARTH / 1e6) => 86400 * (1 - millionYearsAgo / totalMa);
export function clockText(sec) {
  const s = Math.min(86399.999, Math.max(0, sec)), h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), ss = Math.floor(s % 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
}
