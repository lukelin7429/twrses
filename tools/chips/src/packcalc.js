/*
 * 晶片與半導體 · 第六課「先進封裝：為什麼要把晶片疊在一起？」的計算（純函式）。
 *
 * 三種放法，資料從運算晶片到記憶體要走多遠（**示例長度**，只為了比大小；真的產品各有不同）：
 *   board：各自封裝、分開焊在電路板上 → 走電路板上的線，幾公分
 *   side ：並排放在同一塊中介層上（2.5D）→ 走中介層裡的細線，幾公釐
 *   stack：疊起來、用矽穿孔上下連（3D）→ 往上走幾層，零點幾公釐
 * 一次曝光最大 26 × 33 mm（第三、四課查過）→ 單一顆晶片做不了無限大。
 */
export const MODES = ['board', 'side', 'stack'];
export const FIELD_W = 26, FIELD_H = 33, FIELD_MM2 = FIELD_W * FIELD_H;     // 858 mm²
export const EX = { boardGap: 30, sideGap: 3, layerPitch: 0.05 };           // 公釐（示例）
export const MAX_LAYERS = 16;

export function pathMm(mode, layers = 8) {
  if (mode === 'board') return EX.boardGap;
  if (mode === 'side') return EX.sideGap;
  return EX.layerPitch * Math.max(1, layers);          // 到最上面那一層
}
export const shorter = (mode, layers = 8) => pathMm('board') / pathMm(mode, layers);
export function dieCount({ logic = 1, stacks = 0, layers = 1 } = {}) {
  return Math.max(0, logic) + Math.max(0, stacks) * Math.max(1, layers);
}
// 把長度寫成順口的單位
export function fmtMm(mm) {
  if (mm >= 10) return { en: `${+(mm / 10).toFixed(1)} cm`, zh: `${+(mm / 10).toFixed(1)} 公分` };
  if (mm >= 1) return { en: `${+mm.toFixed(1)} mm`, zh: `${+mm.toFixed(1)} 公釐` };
  return { en: `${+mm.toFixed(2)} mm`, zh: `${+mm.toFixed(2)} 公釐` };
}
// 長條圖用對數刻度（30 mm 和 0.4 mm 差太多，線性畫不出來）
export const barFrac = (mm) => Math.min(1, Math.max(0.04, Math.log10(mm / 0.03) / Math.log10(EX.boardGap / 0.03)));
