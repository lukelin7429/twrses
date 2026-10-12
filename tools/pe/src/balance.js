/*
 * 體育 Sports and Movement · 平衡的幾何（純函式，不碰 DOM、不碰 three；test/balance.test.mjs）。
 *
 * 地面上的點一律是 [x, z]（公尺）：x＝人偶的左邊為正，z＝人偶的前方為正。
 *
 *   hull(points)            凸包（Andrew monotone chain），逆時針，去掉共線的點
 *   area(poly)              多邊形面積（平方公尺）
 *   centroid(poly)          多邊形的形心
 *   inside(poly, p)         p 在不在凸多邊形裡（邊上算在裡面）
 *   margin(poly, p)         p 離邊緣多遠：在裡面是正的（最近那條邊的距離），在外面是負的
 *   nearest(poly, p)        邊緣上離 p 最近的點 { point, dist, normal }（normal 朝外）
 *   rayDist(poly, p, dir)   從裡面的 p 沿 dir 走多遠會碰到邊緣（在外面回 0）
 *   tipAngles(poly, com)    重心 [x, y, z] 往前後左右歪多少度，投影才會到邊緣：
 *                           { front, back, left, right, min, minDir }（度）
 *                           傾倒角＝atan(投影到邊緣的距離 ÷ 重心高度)——蹲低（高度變小）或把腳張開（距離變大）都讓它變大
 *   tipAny(poly, com, n)    繞一圈 n 個方向裡最小的傾倒角 { deg, dir: [x, z] }
 */

const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);

export function hull(points) {
  const pts = points.map((p) => [p[0], p[1]]).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  if (pts.length < 3) return pts;
  const lo = [];
  for (const p of pts) {
    while (lo.length >= 2 && cross(lo[lo.length - 2], lo[lo.length - 1], p) <= 1e-12) lo.pop();
    lo.push(p);
  }
  const up = [];
  for (let i = pts.length - 1; i >= 0; i--) {
    const p = pts[i];
    while (up.length >= 2 && cross(up[up.length - 2], up[up.length - 1], p) <= 1e-12) up.pop();
    up.push(p);
  }
  lo.pop(); up.pop();
  return lo.concat(up);
}

export function area(poly) {
  let a = 0;
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i], q = poly[(i + 1) % poly.length];
    a += p[0] * q[1] - q[0] * p[1];
  }
  return Math.abs(a) / 2;
}

export function centroid(poly) {
  if (!poly.length) return [0, 0];
  let a = 0, cx = 0, cy = 0;
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i], q = poly[(i + 1) % poly.length];
    const k = p[0] * q[1] - q[0] * p[1];
    a += k; cx += (p[0] + q[0]) * k; cy += (p[1] + q[1]) * k;
  }
  if (Math.abs(a) < 1e-12) {
    return [poly.reduce((s, p) => s + p[0], 0) / poly.length, poly.reduce((s, p) => s + p[1], 0) / poly.length];
  }
  return [cx / (3 * a), cy / (3 * a)];
}

export function nearest(poly, p) {
  let best = null;
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i + 1) % poly.length];
    const ex = b[0] - a[0], ey = b[1] - a[1];
    const L2 = ex * ex + ey * ey || 1e-12;
    const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * ex + (p[1] - a[1]) * ey) / L2));
    const q = [a[0] + ex * t, a[1] + ey * t];
    const d = Math.hypot(p[0] - q[0], p[1] - q[1]);
    if (!best || d < best.dist) {
      const L = Math.sqrt(L2);
      best = { point: q, dist: d, normal: [ey / L, -ex / L] };   // 逆時針多邊形，邊的右手邊朝外
    }
  }
  return best;
}

export function inside(poly, p) {
  if (poly.length < 3) return false;
  for (let i = 0; i < poly.length; i++) {
    if (cross(poly[i], poly[(i + 1) % poly.length], p) < -1e-9) return false;
  }
  return true;
}

export function margin(poly, p) {
  if (poly.length < 3) return -Infinity;
  const n = nearest(poly, p);
  return inside(poly, p) ? n.dist : -n.dist;
}

export function rayDist(poly, p, dir) {
  if (!inside(poly, p)) return 0;
  const L = Math.hypot(dir[0], dir[1]) || 1;
  const dx = dir[0] / L, dy = dir[1] / L;
  let best = Infinity;
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i + 1) % poly.length];
    const ex = b[0] - a[0], ey = b[1] - a[1];
    const den = dx * ey - dy * ex;
    if (Math.abs(den) < 1e-12) continue;
    const t = ((a[0] - p[0]) * ey - (a[1] - p[1]) * ex) / den;
    const u = ((a[0] - p[0]) * dy - (a[1] - p[1]) * dx) / den;
    if (t >= -1e-9 && u >= -1e-9 && u <= 1 + 1e-9) best = Math.min(best, Math.max(0, t));
  }
  return best === Infinity ? 0 : best;
}

const DEG = 180 / Math.PI;
export const DIRS = { front: [0, 1], back: [0, -1], left: [1, 0], right: [-1, 0] };

export function tipAngles(poly, com) {
  const p = [com[0], com[2]], h = Math.max(1e-6, com[1]);
  const out = {};
  let min = Infinity, minDir = 'front';
  for (const [k, d] of Object.entries(DIRS)) {
    out[k] = Math.atan2(rayDist(poly, p, d), h) * DEG;
    if (out[k] < min - 1e-9) { min = out[k]; minDir = k; }
  }
  out.min = min; out.minDir = minDir;
  return out;
}

export function tipAny(poly, com, n = 72) {
  const p = [com[0], com[2]], h = Math.max(1e-6, com[1]);
  let best = { deg: Infinity, dir: [0, 1] };
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2, d = [Math.sin(a), Math.cos(a)];
    const deg = Math.atan2(rayDist(poly, p, d), h) * DEG;
    if (deg < best.deg) best = { deg, dir: d };
  }
  return best;
}
