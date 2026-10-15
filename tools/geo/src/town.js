/*
 * 地理 Geography · 第四課的示意小鎮（純資料＋純函式，test/town.test.mjs）。全部是虛構的，不是真實的地方，沒有真實的路名或國名。
 *
 *   townIsland()          地形：第三課的山往東北移，西南多一片海邊平原（高度函式 h(x, y)，公里、公尺）
 *   FEATURES              地圖上的東西：點（學校、廟、港口、燈塔、橋、山頂、登山口）、線（河、公路、步道）、面（稻田、森林、房子）
 *   bearing(a, b)         從 a 看 b 的方位角（度；0＝北、90＝東，順時針）
 *   dir8(deg)             方位角 → 八個方位 'N' 'NE' 'E' 'SE' 'S' 'SW' 'W' 'NW'
 *   distKm(a, b)          兩點的水平距離（公里）
 *   firstToward(from, dir, pts)  從 from 往 dir 的方向（±22.5 度）看過去，最近的那個點
 *   ratioToGround(cm, scale)     地圖上幾公分 → 地面上幾公尺（1:scale）
 *   groundToMap(m, scale)        地面上幾公尺 → 地圖上幾公分
 *   printScale(widthCm, groundKm) 一張 widthCm 公分寬的地圖畫 groundKm 公里寬的地面 → 比例尺分母
 *   pathLength(pts)       折線的長度（公里）
 */
import { demoMountain } from './terrain.js';

const sm = (e0, e1, x) => { const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0))); return t * t * (3 - 2 * t); };

export function townIsland() {
  const M = demoMountain();
  const h = (x, y) => {
    const m = M.h(x - 1.3, y - 1.1);
    const r = Math.hypot((x + 1.6) / 2.6, (y + 1.7) / 1.9);
    const plain = 22 - 16 * sm(0.3, 1.25, Math.hypot((x - 0.2) / 3, (y - 0.6) / 3)) - 70 * sm(0.85, 1.05, r);   // 靠山的地方高、往海邊慢慢變低
    return Math.max(m, plain);
  };
  return { h, box: [-5, -5, 5, 5], peak: { x: M.peak.x + 1.3, y: M.peak.y + 1.1 } };
}

/** 點 */
export const POINTS = {
  school: { x: -1.8, y: -1.15, en: 'School', zh: '學校' },
  temple: { x: -2.6, y: -0.85, en: 'Temple', zh: '廟' },
  harbor: { x: 0.3, y: -1.05, en: 'Harbor', zh: '港口' },
  lighthouse: { x: -1.45, y: -3.15, en: 'Lighthouse', zh: '燈塔' },
  bridge: { x: -1.27, y: -1.5, en: 'Bridge', zh: '橋' },
  trailhead: { x: -1.9, y: -0.4, en: 'Trailhead', zh: '登山口' },
  summit: { x: 0.3, y: 1.85, en: 'Summit', zh: '山頂' },
  hut: { x: -0.95, y: 0.85, en: 'Mountain hut', zh: '山屋' },
};
/** 線 */
export const LINES = {
  river: { en: 'River', zh: '河', pts: [[-0.95, 0.35], [-1.05, -0.3], [-1.3, -1.0], [-1.25, -1.8], [-1.05, -2.6], [-0.85, -3.25]] },
  road: { en: 'Road', zh: '公路', pts: [[-3.5, -1.6], [-2.5, -1.5], [-1.27, -1.5], [-0.3, -1.3], [0.3, -1.05]] },
  lane: { en: 'Road', zh: '公路', pts: [[-1.8, -1.5], [-1.8, -1.15], [-1.9, -0.4]] },
  coast: { en: 'Road', zh: '公路', pts: [[-1.27, -1.5], [-1.5, -2.4], [-1.45, -3.15]] },
  trail: { en: 'Hiking trail', zh: '登山步道', pts: [[-1.9, -0.4], [-1.6, 0.2], [-0.95, 0.85], [-0.4, 1.4], [0.3, 1.85]] },
};
/** 面 */
export const AREAS = {
  rice: { en: 'Rice field', zh: '稻田', polys: [[[-3.3, -1.9], [-2.0, -1.85], [-2.0, -2.75], [-3.0, -2.75]], [[-0.9, -1.85], [-0.15, -1.75], [-0.25, -2.55], [-0.85, -2.55]]] },
  forest: { en: 'Forest', zh: '森林', polys: [[[-2.3, 0.35], [-1.6, 0.6], [-0.9, 1.6], [-0.8, 2.6], [-1.6, 3.0], [-2.4, 2.0]]] },
  town: { en: 'Buildings', zh: '房屋', polys: [[[-2.3, -1.3], [-1.4, -1.25], [-1.4, -1.0], [-2.3, -1.0]]] },
};

export const bearing = ([ax, ay], [bx, by]) => ((Math.atan2(bx - ax, by - ay) * 180 / Math.PI) + 360) % 360;
export const DIRS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
export const dir8 = (deg) => DIRS[Math.round(((deg % 360) + 360) % 360 / 45) % 8];
export const distKm = ([ax, ay], [bx, by]) => Math.hypot(bx - ax, by - ay);
export function firstToward(from, dir, pts) {
  const want = DIRS.indexOf(dir) * 45;
  let best = null;
  for (const [key, p] of Object.entries(pts)) {
    const q = [p.x, p.y];
    if (q[0] === from[0] && q[1] === from[1]) continue;
    const d = Math.abs(((bearing(from, q) - want + 540) % 360) - 180);
    if (d > 22.5) continue;
    const dist = distKm(from, q);
    if (!best || dist < best.dist) best = { key, dist, off: d };
  }
  return best;
}
export const ratioToGround = (cm, scale) => cm * scale / 100;        // 公尺
export const groundToMap = (m, scale) => m * 100 / scale;            // 公分
export const printScale = (widthCm, groundKm) => groundKm * 100000 / widthCm;
export const pathLength = (pts) => pts.slice(1).reduce((s, p, i) => s + distKm(pts[i], p), 0);
