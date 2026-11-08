/*
 * 地理 Geography · 第九課「從天上看，台灣長什麼樣子？」的台灣地形資料（純函式，test/taiwan.test.mjs）。
 *
 * 資料：內政部 2026 年版全臺灣 20 公尺網格數值地形模型 DTM（政府資料開放授權條款－第1版）；
 * 處理步驟見 scripts/build-taiwan.py：平均成 1 公里的格子，座標是 TWD97／TM2（公里）。只有臺灣本島。
 *
 *   getTaiwan()                    { meta, grid: Float32Array（海是 NaN）, nx, ny, e0, n0, peak, max1k, places }
 *   heightAt(T, e, n)              那一點的海拔（公尺；雙線性內插；海回傳 NaN）
 *   rowProfile(T, n)               沿一條東西線（固定 n）的剖面：[{ e, z }]（每 1 公里一點，海是 NaN）
 *   sides(T, n)                    那條線上的最高點，以及往西、往東到海岸的距離與平均坡度（每公里升高幾公尺）
 *   around(T, e, n)                四個方向（6–12 公里外）的平均海拔：{ here, E, W, N, S }
 *   landform(T, e, n)              用上面的數字分類：'mountain' 'valley' 'basin' 'tableland' 'plain'（小遊戲的答案由這裡推）
 *   landArea(T)                    陸地面積（平方公里；1 公里格子數）
 */
import raw from './data/taiwan.json' with { type: 'json' };

let cache = null;
export function decodeTaiwan(doc = raw) {
  const m = doc.meta, bin = typeof atob === 'function' ? atob(doc.h) : Buffer.from(doc.h, 'base64').toString('binary');
  const grid = new Float32Array(m.nx * m.ny);
  for (let i = 0; i < grid.length; i++) {
    const v = bin.charCodeAt(2 * i) | (bin.charCodeAt(2 * i + 1) << 8);
    grid[i] = v === 65535 ? NaN : v;
  }
  return { meta: m, grid, nx: m.nx, ny: m.ny, e0: m.e0, n0: m.n0, peak: doc.peak, max1k: doc.max1k, places: doc.places };
}
export const getTaiwan = () => cache || (cache = decodeTaiwan());

const cellAt = (T, i, j) => (i < 0 || j < 0 || i >= T.ny || j >= T.nx ? NaN : T.grid[i * T.nx + j]);
export function heightAt(T, e, n) {
  const x = e - T.e0 - 0.5, y = n - T.n0 - 0.5, j = Math.floor(x), i = Math.floor(y), fx = x - j, fy = y - i;
  const a = cellAt(T, i, j), b = cellAt(T, i, j + 1), c = cellAt(T, i + 1, j), d = cellAt(T, i + 1, j + 1);
  const vals = [[a, (1 - fx) * (1 - fy)], [b, fx * (1 - fy)], [c, (1 - fx) * fy], [d, fx * fy]];
  // 海岸邊：只用陸地的格子；最近的那一格是海就算海
  const near = fx < 0.5 ? (fy < 0.5 ? a : c) : (fy < 0.5 ? b : d);
  if (Number.isNaN(near)) return NaN;
  let s = 0, w = 0;
  for (const [v, k] of vals) if (!Number.isNaN(v)) { s += v * k; w += k; }
  return w ? s / w : NaN;
}

export function rowProfile(T, n) {
  const out = [];
  for (let j = 0; j < T.nx; j++) { const e = T.e0 + j + 0.5; out.push({ e, z: heightAt(T, e, n) }); }
  return out;
}

export function sides(T, n) {
  const p = rowProfile(T, n), land = p.filter((q) => !Number.isNaN(q.z));
  if (!land.length) return null;
  const top = land.reduce((a, b) => (b.z > a.z ? b : a));
  const west = land[0], east = land[land.length - 1];
  const wKm = top.e - west.e, eKm = east.e - top.e;
  return { top, west, east, wKm, eKm, wSlope: (top.z - west.z) / Math.max(wKm, 0.5), eSlope: (top.z - east.z) / Math.max(eKm, 0.5) };
}

export function around(T, e, n) {
  const ring = (dx, dy) => {
    let s = 0, c = 0;
    for (const r of [6, 8, 10, 12]) { const z = heightAt(T, e + dx * r, n + dy * r); if (!Number.isNaN(z)) { s += z; c++; } }
    return c ? s / c : NaN;
  };
  return { here: heightAt(T, e, n), E: ring(1, 0), W: ring(-1, 0), N: ring(0, 1), S: ring(0, -1) };
}

/** 分類規則（簡化，只給課堂推理用）：
 *  很高（1,000 公尺以上）→ 山地；兩邊（東、西）都高出 300 公尺以上的低地 → 縱谷；
 *  低地（200 公尺以下）而四個方向有三個比它高 30 公尺以上 → 盆地；
 *  100 到 1,000 公尺、四個方向都比它低 → 台地；其餘低地 → 平原。 */
export function landform(T, e, n) {
  const a = around(T, e, n), h = a.here, dirs = ['E', 'W', 'N', 'S'];
  const higher = (k, d) => !Number.isNaN(a[k]) && a[k] > h + d;
  const lower = (k) => Number.isNaN(a[k]) || a[k] < h;
  if (h >= 1000) return 'mountain';
  if (h < 400 && higher('E', 300) && higher('W', 300)) return 'valley';
  if (h < 200 && dirs.filter((k) => higher(k, 30)).length >= 3) return 'basin';
  if (h >= 100 && dirs.every(lower)) return 'tableland';
  if (h < 100) return 'plain';
  return null;
}

export function landArea(T) { let c = 0; for (const v of T.grid) if (!Number.isNaN(v)) c++; return c * T.meta.cell * T.meta.cell; }
