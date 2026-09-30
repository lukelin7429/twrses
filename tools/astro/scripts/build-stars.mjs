/*
 * 把耶魯亮星星表（BSC5，公有領域）轉成第五課用的精簡星表：src/stars-data.js
 *
 * 原始檔不進 repo，下載到 ~/Documents/twrses-bsc5/：
 *   mkdir -p ~/Documents/twrses-bsc5 && cd ~/Documents/twrses-bsc5
 *   curl -O https://cdsarc.cds.unistra.fr/ftp/V/50/catalog.gz && gunzip -k catalog.gz
 * 然後在 tools/astro 底下：npm run stars    （或 node scripts/build-stars.mjs <catalog 路徑>）
 *
 * 輸出：亮於 5.0 等的星（加上連線用到的較暗的星），J2000 赤經赤緯（度）、視星等、B−V 色指數；
 * figures.js 的連線、星名、中國星官、大三角換成星表索引。名稱找不到就直接報錯。
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { FIGURES, NAMED, ASTERISMS, TRIANGLES } from '../src/figures.js';

const src = process.argv[2] || `${homedir()}/Documents/twrses-bsc5/catalog`;
const MAG_LIMIT = 5.0;
const rows = [];
const byName = new Map();
for (const line of readFileSync(src, 'latin1').split('\n')) {
  if (line.length < 110 || !line.slice(75, 77).trim()) continue;   // 沒有 J2000 位置的（新星等）略過
  const hr = +line.slice(0, 4);
  const ra = (+line.slice(75, 77) + +line.slice(77, 79) / 60 + +line.slice(79, 83) / 3600) * 15;
  const dec = (line[83] === '-' ? -1 : 1) * (+line.slice(84, 86) + +line.slice(86, 88) / 60 + +line.slice(88, 90) / 3600);
  const mag = +line.slice(102, 107);
  const bvs = line.slice(109, 114).trim();
  const r = { hr, ra, dec, mag, bv: bvs ? +bvs : 0.6 };
  rows.push(r);
  const fl = line.slice(4, 7).trim(), by = line.slice(7, 10).trim(), sup = line.slice(10, 11).trim(), con = line.slice(11, 14).trim();
  if (!con) continue;
  if (by) {
    byName.set(`${by}${sup} ${con}`, r);
    const plain = `${by} ${con}`;
    if (!byName.has(plain) || sup === '1') byName.set(plain, r);
  }
  if (fl) byName.set(`${fl} ${con}`, r);
}
const find = (n) => { const r = byName.get(n); if (!r) throw new Error(`星表裡找不到 ${n}`); return r; };

const need = new Set();
const allNames = [...FIGURES.flatMap((f) => f.lines.flat()), ...NAMED.map((n) => n[0]),
  ...ASTERISMS.flatMap((a) => a.lines.flat()), ...TRIANGLES.flatMap((t) => t.stars)];
for (const n of allNames) need.add(find(n).hr);
const stars = rows.filter((r) => r.mag <= MAG_LIMIT || need.has(r.hr)).sort((a, b) => a.mag - b.mag);
const idx = new Map(stars.map((s, i) => [s.hr, i]));
const I = (n) => idx.get(find(n).hr);
const segs = (lines) => lines.flatMap((pl) => pl.slice(1).flatMap((n, k) => [I(pl[k]), I(n)]));

const flat = stars.flatMap((s) => [+s.ra.toFixed(3), +s.dec.toFixed(3), +s.mag.toFixed(2), +s.bv.toFixed(2)]);
const out = `// 由 scripts/build-stars.mjs 從耶魯亮星星表（BSC5，公有領域）產生，不要手改。
// STARS：每 4 個數字一顆星——J2000 赤經（度）、赤緯（度）、視星等、B−V；由亮到暗排列。
export const STARS = ${JSON.stringify(flat)};
export const LINES = ${JSON.stringify(Object.fromEntries(FIGURES.map((f) => [f.abbr, segs(f.lines)])))};
export const ASTER_LINES = ${JSON.stringify(ASTERISMS.map((a) => segs(a.lines)))};
export const NAMED_IDX = ${JSON.stringify(NAMED.map((n) => I(n[0])))};
export const TRI_IDX = ${JSON.stringify(TRIANGLES.map((t) => t.stars.map(I)))};
`;
writeFileSync(new URL('../src/stars-data.js', import.meta.url), out);
console.log(`${stars.length} stars (≤ ${MAG_LIMIT} mag + ${[...need].filter((h) => stars.find((s) => s.hr === h).mag > MAG_LIMIT).length} fainter figure stars), ${(out.length / 1024).toFixed(1)} KB`);
