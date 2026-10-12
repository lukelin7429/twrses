/*
 * 電腦概論 · 第十六課「電腦怎麼越變越小？」的純函式與資料表（不碰 DOM、不碰 three.js；test/shrink.test.mjs）。
 *
 * 電腦從頭到尾都是同一個想法：很多個開關。變的是開關用什麼做、做得多小。
 * STOPS：五個年代，各舉一台（或一個）有可靠來源的東西，記它「裡面有幾個開關」。
 *   **每一個數字都有 src（來源的 key，對應 SOURCES）；沒有來源的數字不放進來**（測試會檢查）。
 *   count 是來源寫的數；atLeast: true 表示來源寫的是「超過」。
 * 模型裡五個開關的外形是示意，**不是照比例畫的**；柱子的高度用的是對數刻度（每高一格＝十倍）。
 */
export const SOURCES = {
  stibitz: 'IEEE Computer Society, Computer Pioneers: George Robert Stibitz',
  eniac: 'Paul A. Freiberger and Michael R. Swaine, “ENIAC,” Encyclopaedia Britannica',
  chm_transistor: 'Computer History Museum, “1947: Invention of the Point-Contact Transistor”',
  intel4004: 'Intel, “The First Programmable Microprocessor: The 4004”',
  apple_m4: 'Apple Newsroom, “Apple introduces M4 chip” (May 7, 2024)',
};
export const STOPS = [
  { key: 'relay', year: 1937, kind: 'relay', count: 2, src: 'stibitz' },                     // Stibitz 的 Model K：兩個繼電器
  { key: 'eniac', year: 1946, kind: 'tube', count: 17000, atLeast: true, src: 'eniac' },      // ENIAC：超過 17,000 根真空管
  { key: 'transistor', year: 1947, kind: 'transistor', count: 1, src: 'chm_transistor' },     // 第一顆電晶體
  { key: 'i4004', year: 1971, kind: 'transistor', count: 2300, src: 'intel4004' },            // Intel 4004：一片晶片 2,300 個電晶體
  { key: 'm4', year: 2024, kind: 'transistor', count: 28000000000, src: 'apple_m4' },         // Apple M4：一片晶片 280 億個電晶體
];
export const KEYS = STOPS.map((s) => s.key);
export const stop = (key) => STOPS.find((s) => s.key === key);
export const group = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// b 的開關數是 a 的幾倍（a 比較少時回大於 1 的數；四捨五入到整數，不到 10 倍留一位小數）
export function times(aKey, bKey) {
  const a = stop(aKey).count, b = stop(bKey).count, r = b / a;
  return r >= 10 ? Math.round(r) : Math.round(r * 10) / 10;
}
export const height = (n) => Math.log10(n);           // 柱子的高度（格）：每高一格＝十倍
export const span = (aKey, bKey) => Math.abs(stop(bKey).year - stop(aKey).year);
