/*
 * 地理 Geography · 陸地資料的處理腳本（之後要換解析度或版本，重跑這一支）。
 *
 *   來源：Natural Earth「Land」1:50m（ne_50m_land），版本 5.1.2
 *         https://www.naturalearthdata.com/downloads/50m-physical-vectors/50m-land/
 *         GeoJSON 版：https://github.com/nvkelso/natural-earth-vector/blob/v5.1.2/geojson/ne_50m_land.geojson
 *   授權：公有領域（public domain）。Natural Earth 的使用條款：
 *         https://www.naturalearthdata.com/about/terms-of-use/
 *         「All versions of Natural Earth raster + vector map data found on this website are in the public domain.」
 *   內容：只有陸地的外形（含南極洲、裏海是洞）；沒有國界、沒有國名、沒有湖泊。
 *
 * 步驟：
 *   1. 讀 GeoJSON（沒有給路徑就從上面的 GitHub 網址抓 v5.1.2）。
 *   2. 每個環用 Douglas–Peucker 簡化（TOL 度），面積小於 MIN_AREA 平方度的島丟掉。
 *   3. 座標量化到 Q 度，差分＋zigzag＋每字元 5 位元的變長編碼成字串（見 src/land.js 的 decodeRing）。
 *   4. 另外標出三塊拿來比大小的陸塊：格陵蘭、澳洲（各是一個獨立的多邊形），
 *      以及非洲本土——從歐亞非那一個大多邊形在蘇伊士地峽切開（地中海端塞得港附近、紅海端蘇伊士附近）。
 *      非洲那一塊不含馬達加斯加等島嶼。
 *   5. 寫出 src/data/land.json。
 *
 *   node scripts/build-land.mjs [ne_50m_land.geojson]
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const VERSION = '5.1.2';
const URL_SRC = `https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v${VERSION}/geojson/ne_50m_land.geojson`;
const TOL = 0.07;        // Douglas–Peucker 的容許誤差（度）
const MIN_AREA = 0.02;   // 小於這個面積（平方度）的島不收
const Q = 0.05;          // 量化的格子（度）
const here = dirname(fileURLToPath(import.meta.url));

const src = process.argv[2];
const gj = src ? JSON.parse(readFileSync(src, 'utf8')) : await (await fetch(URL_SRC)).json();

const polys = [];
for (const f of gj.features) {
  const g = f.geometry;
  for (const p of (g.type === 'Polygon' ? [g.coordinates] : g.coordinates)) polys.push(p.map((r) => r.map(([x, y]) => [x, y])));
}

function dp(pts, tol) {
  const keep = new Uint8Array(pts.length); keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    const [ax, ay] = pts[a], [bx, by] = pts[b];
    const dx = bx - ax, dy = by - ay, L = Math.hypot(dx, dy);
    let worst = -1, wd = tol;
    for (let i = a + 1; i < b; i++) {
      const d = L ? Math.abs(dy * (pts[i][0] - ax) - dx * (pts[i][1] - ay)) / L : Math.hypot(pts[i][0] - ax, pts[i][1] - ay);
      if (d > wd) { wd = d; worst = i; }
    }
    if (worst > 0) { keep[worst] = 1; stack.push([a, worst], [worst, b]); }
  }
  return pts.filter((_, i) => keep[i]);
}
const planarArea = (r) => { let s = 0; for (let i = 0; i < r.length; i++) { const [x1, y1] = r[i], [x2, y2] = r[(i + 1) % r.length]; s += x1 * y2 - x2 * y1; } return Math.abs(s) / 2; };
const inside = ([x, y], ring) => {
  let c = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [x1, y1] = ring[i], [x2, y2] = ring[j];
    if ((y1 > y) !== (y2 > y) && x < (x2 - x1) * (y - y1) / (y2 - y1) + x1) c = !c;
  }
  return c;
};
// 環：去掉重複的收尾點；簡化時把環從最遠的兩點切成兩段各自簡化，避免起點被固定成尖角
function simplifyRing(ring) {
  let r = ring.slice();
  if (r.length > 1 && r[0][0] === r[r.length - 1][0] && r[0][1] === r[r.length - 1][1]) r.pop();
  if (r.length < 8) return r;
  let far = 0, fd = -1;
  for (let i = 1; i < r.length; i++) { const d = Math.hypot(r[i][0] - r[0][0], r[i][1] - r[0][1]); if (d > fd) { fd = d; far = i; } }
  const a = dp(r.slice(0, far + 1), TOL), b = dp(r.slice(far).concat([r[0]]), TOL);
  return a.slice(0, -1).concat(b.slice(0, -1));
}
const quant = (r) => {
  const out = [];
  for (const [x, y] of r) {
    const q = [Math.round(x / Q), Math.round(y / Q)];
    const l = out[out.length - 1];
    if (!l || l[0] !== q[0] || l[1] !== q[1]) out.push(q);
  }
  while (out.length > 1 && out[0][0] === out[out.length - 1][0] && out[0][1] === out[out.length - 1][1]) out.pop();
  return out;
};
const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
function enc(ringQ) {
  let s = '', px = 0, py = 0;
  const put = (v) => { let z = v < 0 ? (-v << 1) - 1 : v << 1; do { const b = z & 31; z >>>= 5; s += ABC[b | (z ? 32 : 0)]; } while (z); };
  for (const [x, y] of ringQ) { put(x - px); put(y - py); px = x; py = y; }
  return s;
}

const find = (pt) => polys.findIndex((p) => inside(pt, p[0]) && !p.slice(1).some((h) => inside(pt, h)));
const iGreenland = find([-40, 72]), iAustralia = find([134, -25]), iAfroEurasia = find([20, 5]), iTaiwan = find([121, 23.7]);

// 非洲本土：在蘇伊士地峽把歐亞非的外環切開
function cutAfrica(ring) {
  const near = (pt) => { let b = 0, bd = 1e9; ring.forEach(([x, y], i) => { const d = Math.hypot(x - pt[0], y - pt[1]); if (d < bd) { bd = d; b = i; } }); return b; };
  const m = near([32.31, 31.27]);   // 地中海端：塞得港附近
  const r = near([32.56, 29.93]);   // 紅海端：蘇伊士附近
  const [a, b] = m < r ? [m, r] : [r, m];
  const arc1 = ring.slice(a, b + 1), arc2 = ring.slice(b).concat(ring.slice(0, a + 1));
  const pick = inside([20, 5], arc1) ? arc1 : arc2;
  if (!inside([20, 5], pick) || inside([45, 25], pick) || inside([10, 50], pick)) throw new Error('Africa cut failed');
  return pick;
}

const out = { polys: [], pieces: {} };
let nPts = 0;
polys.forEach((p, i) => {
  const outer = quant(simplifyRing(p[0]));
  if (outer.length < 3 || planarArea(outer.map(([x, y]) => [x * Q, y * Q])) < MIN_AREA) return;
  const rings = [outer, ...p.slice(1).map((h) => quant(simplifyRing(h))).filter((h) => h.length >= 3)];
  nPts += rings.reduce((s, r) => s + r.length, 0);
  if (i === iGreenland) out.pieces.greenland = enc(outer);
  if (i === iAustralia) out.pieces.australia = enc(outer);
  if (i === iTaiwan) out.pieces.taiwan = enc(outer);
  if (i === iAfroEurasia) out.pieces.africa = enc(quant(simplifyRing(cutAfrica(p[0]))));
  out.polys.push(rings.map(enc));
});
for (const k of ['greenland', 'australia', 'africa', 'taiwan']) if (!out.pieces[k]) throw new Error('missing piece ' + k);

const doc = {
  source: 'Natural Earth, 1:50m Physical Vectors, Land (ne_50m_land)',
  version: VERSION,
  url: 'https://www.naturalearthdata.com/downloads/50m-physical-vectors/50m-land/',
  license: 'Public domain (Natural Earth terms of use: https://www.naturalearthdata.com/about/terms-of-use/)',
  processing: `Douglas-Peucker ${TOL} deg; islands under ${MIN_AREA} sq deg dropped; quantized to ${Q} deg; see tools/geo/scripts/build-land.mjs`,
  q: Q,
  ...out,
};
const fp = join(here, '..', 'src', 'data', 'land.json');
writeFileSync(fp, JSON.stringify(doc) + '\n');
console.log(`polygons ${out.polys.length} (of ${polys.length}), points ${nPts}, ${readFileSync(fp).length} bytes → ${fp}`);
