/*
 * 世界歷史 World History · 陸地外形的處理腳本（要換解析度或版本就重跑這一支）。
 *
 *   來源：Natural Earth「Land」1:50m（ne_50m_land），版本 5.1.2
 *         https://www.naturalearthdata.com/downloads/50m-physical-vectors/50m-land/
 *   授權：公有領域。https://www.naturalearthdata.com/about/terms-of-use/
 *   內容：只有陸地的外形（含南極洲；裏海是洞）。沒有國界、沒有國名——歷史地圖不把今天的國界畫進去。
 *
 * 做法：每個環用 Douglas–Peucker 簡化、丟掉太小的島、座標量化成整數格，
 *       再把「和前一點的差」用 zigzag＋每字元 6 位元的變長碼寫成字串（解碼在 src/land.js）。
 *
 *   node scripts/build-land.mjs [ne_50m_land.geojson]
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const VERSION = '5.1.2';
const SRC = `https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v${VERSION}/geojson/ne_50m_land.geojson`;
const TOL = 0.06, MIN_AREA = 0.015, Q = 0.05;
const here = dirname(fileURLToPath(import.meta.url));
const gj = process.argv[2] ? JSON.parse(readFileSync(process.argv[2], 'utf8')) : await (await fetch(SRC)).json();

const area = (r) => { let s = 0; for (let i = 0; i < r.length; i++) { const a = r[i], b = r[(i + 1) % r.length]; s += a[0] * b[1] - b[0] * a[1]; } return Math.abs(s) / 2; };
function simplify(pts, tol) {
  const keep = new Uint8Array(pts.length); keep[0] = keep[pts.length - 1] = 1;
  const todo = [[0, pts.length - 1]];
  while (todo.length) {
    const [i, j] = todo.pop();
    const [ax, ay] = pts[i], [bx, by] = pts[j], dx = bx - ax, dy = by - ay, len = Math.hypot(dx, dy);
    let far = -1, fd = tol;
    for (let k = i + 1; k < j; k++) {
      const d = len ? Math.abs(dy * (pts[k][0] - ax) - dx * (pts[k][1] - ay)) / len : Math.hypot(pts[k][0] - ax, pts[k][1] - ay);
      if (d > fd) { fd = d; far = k; }
    }
    if (far > 0) { keep[far] = 1; todo.push([i, far], [far, j]); }
  }
  return pts.filter((_, k) => keep[k]);
}
function ringOut(ring) {
  let r = ring.slice(0, -1);                                  // GeoJSON 的環首尾重複
  if (r.length >= 8) {                                        // 從離起點最遠的點切兩段各自簡化，起點才不會變成尖角
    let far = 0, fd = -1;
    r.forEach((p, i) => { const d = Math.hypot(p[0] - r[0][0], p[1] - r[0][1]); if (d > fd) { fd = d; far = i; } });
    r = simplify(r.slice(0, far + 1), TOL).slice(0, -1).concat(simplify(r.slice(far).concat([r[0]]), TOL).slice(0, -1));
  }
  const q = [];
  for (const [x, y] of r) {
    const c = [Math.round(x / Q), Math.round(y / Q)], l = q[q.length - 1];
    if (!l || l[0] !== c[0] || l[1] !== c[1]) q.push(c);
  }
  while (q.length > 1 && q[0][0] === q[q.length - 1][0] && q[0][1] === q[q.length - 1][1]) q.pop();
  return q;
}
const CH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
function pack(q) {
  let s = '', px = 0, py = 0;
  const put = (v) => { let z = v < 0 ? -2 * v - 1 : 2 * v; do { const b = z & 31; z = Math.floor(z / 32); s += CH[b + (z ? 32 : 0)]; } while (z); };
  for (const [x, y] of q) { put(x - px); put(y - py); px = x; py = y; }
  return s;
}

const polys = [];
let pts = 0;
for (const f of gj.features) {
  const g = f.geometry;
  for (const poly of (g.type === 'Polygon' ? [g.coordinates] : g.coordinates)) {
    if (area(poly[0]) < MIN_AREA) continue;
    const rings = poly.filter((r, i) => i === 0 || area(r) >= MIN_AREA).map(ringOut).filter((r) => r.length >= 3);
    if (!rings.length) continue;
    rings.forEach((r) => { pts += r.length; });
    polys.push(rings.map(pack));
  }
}
const out = {
  source: `Natural Earth 1:50m Land v${VERSION} (public domain) · naturalearthdata.com`,
  q: Q, polys,
};
const dst = join(here, '..', 'src', 'data', 'land.json');
writeFileSync(dst, JSON.stringify(out));
console.log(`${polys.length} polygons, ${pts} points, ${JSON.stringify(out).length} bytes → ${dst}`);
