/*
 * 台灣歷史 Taiwan's Story · 海岸線資料的處理腳本（要換解析度或版本就重跑這一支）。
 *
 *   來源：Natural Earth「Land」1:10m（ne_10m_land），版本 5.1.2
 *         https://www.naturalearthdata.com/downloads/10m-physical-vectors/10m-land/
 *         GeoJSON 版：https://github.com/nvkelso/natural-earth-vector/blob/v5.1.2/geojson/ne_10m_land.geojson
 *   授權：公有領域（public domain）。https://www.naturalearthdata.com/about/terms-of-use/
 *   內容：只有陸地的外形，沒有任何界線與名稱。
 *
 * 只取「整個落在 BBOX 裡」的島（台灣本島與附近的島）；歐亞大陸那一大塊不會整個落在框裡，所以不會被收進來。
 * 每個環用 Douglas–Peucker 簡化（TOL 度），太小的島（少於 MIN_PTS 點）不收，座標取到小數三位。
 *
 *   node scripts/build-coast.mjs [ne_10m_land.geojson]
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const VERSION = '5.1.2';
const URL_SRC = `https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v${VERSION}/geojson/ne_10m_land.geojson`;
export const BBOX = { w: 119.2, e: 122.2, s: 21.7, n: 25.5 };
const TOL = 0.004, MIN_PTS = 8;

function dp(pts, tol) {
  if (pts.length < 3) return pts;
  const keep = new Uint8Array(pts.length); keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    const [x1, y1] = pts[a], [x2, y2] = pts[b];
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1e-12;
    let worst = 0, at = -1;
    for (let i = a + 1; i < b; i++) {
      const d = Math.abs(dy * (pts[i][0] - x1) - dx * (pts[i][1] - y1)) / len;
      if (d > worst) { worst = d; at = i; }
    }
    if (worst > tol) { keep[at] = 1; stack.push([a, at], [at, b]); }
  }
  return pts.filter((_, i) => keep[i]);
}

const src = process.argv[2];
const doc = src ? JSON.parse(readFileSync(src, 'utf8')) : await (await fetch(URL_SRC)).json();
const rings = [];
for (const f of doc.features) {
  const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
  for (const poly of polys) {
    const outer = poly[0];
    if (!outer.every(([x, y]) => x >= BBOX.w && x <= BBOX.e && y >= BBOX.s && y <= BBOX.n)) continue;
    // 環的頭尾是同一點，直接簡化會整條被丟掉：先在離起點最遠的那一點把環切成兩半，各自簡化再接回去
    let far = 0, fd = -1;
    outer.forEach(([x, y], i) => { const d = Math.hypot(x - outer[0][0], y - outer[0][1]); if (d > fd) { fd = d; far = i; } });
    const half = [...dp(outer.slice(0, far + 1), TOL), ...dp(outer.slice(far), TOL).slice(1)];
    const r = half.map(([x, y]) => [Math.round(x * 1000) / 1000, Math.round(y * 1000) / 1000]);
    if (r.length >= MIN_PTS) rings.push(r);
  }
}
rings.sort((a, b) => b.length - a.length);
const out = {
  source: 'Natural Earth 1:10m Land', version: VERSION, url: 'https://www.naturalearthdata.com/downloads/10m-physical-vectors/10m-land/',
  license: 'Public domain (https://www.naturalearthdata.com/about/terms-of-use/)',
  processing: `islands wholly inside ${JSON.stringify(BBOX)}; Douglas-Peucker ${TOL} deg; rounded to 0.001 deg`,
  bbox: BBOX, rings,
};
const here = dirname(fileURLToPath(import.meta.url));
writeFileSync(join(here, '../src/data/coast.json'), JSON.stringify(out));
console.log(`${rings.length} rings, ${rings.reduce((s, r) => s + r.length, 0)} points; largest ${rings[0].length}`);
