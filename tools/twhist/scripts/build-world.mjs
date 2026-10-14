/*
 * 台灣歷史 Taiwan's Story · 太平洋—印度洋陸地資料（南島語族那一張地圖用）。
 *
 *   來源：Natural Earth「Land」1:110m（ne_110m_land），版本 5.1.2
 *         https://www.naturalearthdata.com/downloads/110m-physical-vectors/110m-land/
 *   授權：公有領域（public domain）。https://www.naturalearthdata.com/about/terms-of-use/
 *   內容：只有陸地的外形，沒有任何界線與名稱。
 *
 * 地圖以太平洋為中心：西經 25 度以西的點經度加 360（美洲、太平洋東側、歐亞大陸跨過換日線的東北角），
 * 其餘不動（非洲與歐洲在框的西緣外面，畫圖時用 clipPath 裁掉）。只保留和框 BBOX 有交集的環
 * （格陵蘭、南極洲都在框外，不會被收進來）。
 *
 *   node scripts/build-world.mjs [ne_110m_land.geojson]
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const VERSION = '5.1.2';
const URL_SRC = `https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v${VERSION}/geojson/ne_110m_land.geojson`;
export const BBOX = { w: 20, e: 300, s: -55, n: 45 };

const src = process.argv[2];
const doc = src ? JSON.parse(readFileSync(src, 'utf8')) : await (await fetch(URL_SRC)).json();
const rings = [];
for (const f of doc.features) {
  const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
  for (const poly of polys) {
    const outer = poly[0];
    const r = outer.map(([x, y]) => [Math.round((x < -25 ? x + 360 : x) * 100) / 100, Math.round(y * 100) / 100]);
    const xs = r.map((p) => p[0]), ys = r.map((p) => p[1]);
    if (Math.max(...xs) < BBOX.w || Math.min(...xs) > BBOX.e || Math.max(...ys) < BBOX.s || Math.min(...ys) > BBOX.n) continue;
    rings.push(r);
  }
}
const out = {
  source: 'Natural Earth 1:110m Land', version: VERSION, url: 'https://www.naturalearthdata.com/downloads/110m-physical-vectors/110m-land/',
  license: 'Public domain (https://www.naturalearthdata.com/about/terms-of-use/)',
  processing: `Pacific-centered (longitudes west of 25W + 360); rings touching ${JSON.stringify(BBOX)}; rounded to 0.01 deg`,
  bbox: BBOX, rings,
};
writeFileSync(join(dirname(fileURLToPath(import.meta.url)), '../src/data/world.json'), JSON.stringify(out));
console.log(`${rings.length} rings, ${rings.reduce((s, r) => s + r.length, 0)} points`);
