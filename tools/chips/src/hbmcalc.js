/*
 * 晶片與半導體 · 第七課「HBM 是什麼？AI 為什麼需要它？」的計算（純函式）。
 *
 * 各代 HBM（JEDEC 標準，數字經 Wikipedia “High Bandwidth Memory” 的規格表）：
 *   bits：一疊的資料線數（車道數）；gbps：每條線每秒幾十億位元；dies：一疊最多幾層
 *   頻寬（GB/s）＝ bits × gbps ÷ 8
 * 對照：一般顯示卡記憶體（GDDR）每顆晶片的匯流排寬度是 32 位元（同一條目）。
 */
export const GENS = [
  { key: 'hbm1', name: 'HBM', year: 2013, bits: 1024, gbps: 1.0, dies: 4 },
  { key: 'hbm2', name: 'HBM2', year: 2016, bits: 1024, gbps: 2.4, dies: 8 },
  { key: 'hbm3', name: 'HBM3', year: 2022, bits: 1024, gbps: 6.4, dies: 12 },
  { key: 'hbm4', name: 'HBM4', year: 2025, bits: 2048, gbps: 8, dies: 16 },
];
export const GDDR_BITS = 32;
export const gen = (key) => GENS.find((g) => g.key === key) || GENS[0];
export const bandwidth = (key) => { const g = gen(key); return (g.bits * g.gbps) / 8; };      // GB/s（每一疊）
export const lanesVs = (key) => gen(key).bits / GDDR_BITS;                                    // 是一顆 GDDR 的幾倍寬
// 每秒能搬幾部電影（movieGB 是示例的檔案大小）
export const moviesPerSecond = (key, stacks = 1, movieGB = 5) => (bandwidth(key) * stacks) / movieGB;
// 同樣的資料量，用家裡的網路（Mb/s，示例）要傳多久（秒）
export const homeSeconds = (gb, mbps = 100) => (gb * 8000) / mbps;
export function fmtDuration(s) {
  if (s < 1) return { en: 'less than 1 second', zh: '不到 1 秒' };
  if (s < 90) return { en: `${Math.round(s)} seconds`, zh: `${Math.round(s)} 秒` };
  if (s < 5400) return { en: `${Math.round(s / 60)} minutes`, zh: `${Math.round(s / 60)} 分鐘` };
  if (s < 172800) return { en: `${+(s / 3600).toFixed(1)} hours`, zh: `${+(s / 3600).toFixed(1)} 小時` };
  return { en: `${+(s / 86400).toFixed(1)} days`, zh: `${+(s / 86400).toFixed(1)} 天` };
}
