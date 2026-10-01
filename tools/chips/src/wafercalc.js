/*
 * 晶片與半導體 · 第三課的計算（純函式，node 測試在 test/wafer.test.mjs）。
 *
 * 一片晶圓切得出幾顆晶片：在直徑 D（mm）的圓上排方格（晶片 w × h，中間留切割道 scribe），
 *   邊緣 edge mm 以內不能用；四個角都在可用圓裡才算「完整晶片」，碰到晶圓但不完整的算「邊緣浪費」。
 *   方格的位置會影響數量，所以把格子平移試一遍（steps × steps 種），取完整晶片最多的那一種。
 * 常見的近似公式 DPW ≈ π(D/2)²/S − πD/√(2S)（S＝晶片面積）拿來對照。
 */

export const WAFER_D = 300;      // 12 吋晶圓（300 mm）
export const EDGE = 3;           // 邊緣不能用的寬度（mm，示意）
export const SCRIBE = 0.1;       // 切割道寬（mm，示意）

export function approxDies(D, S) {
  return Math.PI * (D / 2) ** 2 / S - Math.PI * D / Math.sqrt(2 * S);
}

function layout(D, w, h, edge, scribe, ox, oy) {
  const R = D / 2, Ru = R - edge, px = w + scribe, py = h + scribe;
  const nx = Math.ceil(R / px) + 1, ny = Math.ceil(R / py) + 1;
  const dies = [];
  let full = 0, partial = 0;
  for (let i = -nx; i <= nx; i++) for (let j = -ny; j <= ny; j++) {
    const x0 = i * px + ox, y0 = j * py + oy, x1 = x0 + w, y1 = y0 + h;
    // 離圓心最近的點：判斷有沒有碰到晶圓
    const cx = Math.max(x0, Math.min(0, x1)), cy = Math.max(y0, Math.min(0, y1));
    if (cx * cx + cy * cy > R * R) continue;
    const far = Math.max(x0 * x0, x1 * x1) + Math.max(y0 * y0, y1 * y1);
    const ok = far <= Ru * Ru;
    if (ok) full++; else partial++;
    dies.push({ x: x0, y: y0, full: ok });
  }
  return { full, partial, dies };
}

/** 回傳 { full, partial, dies:[{x,y,full}], used（完整晶片占晶圓面積的比例）, approx } */
export function countDies(w, h = w, { D = WAFER_D, edge = EDGE, scribe = SCRIBE, steps = 8 } = {}) {
  let best = null;
  const px = w + scribe, py = h + scribe;
  for (let a = 0; a < steps; a++) for (let b = 0; b < steps; b++) {
    const r = layout(D, w, h, edge, scribe, (a / steps) * px, (b / steps) * py);
    if (!best || r.full > best.full || (r.full === best.full && r.partial < best.partial)) best = r;
  }
  const area = Math.PI * (D / 2) ** 2;
  return { ...best, used: (best.full * w * h) / area, approx: approxDies(D, w * h) };
}
