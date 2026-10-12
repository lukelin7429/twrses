/*
 * 地理 Geography · 陸地資料（Natural Earth 1:50m Land 5.1.2，公有領域；處理步驟見 scripts/build-land.mjs）。
 * 只有陸地的外形，沒有國界、沒有國名。
 *
 *   LAND.polys    [[外環, 洞…], …]，每個環是 [[lon, lat], …]（度）
 *   LAND.pieces   { greenland, africa, australia, taiwan }：單獨一個外環
 *   LAND.meta     來源、版本、授權
 */
import raw from './data/land.json' with { type: 'json' };

const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
const IDX = {};
for (let i = 0; i < ABC.length; i++) IDX[ABC[i]] = i;

/** 解開一個環：每個數字是 zigzag 後每字元 5 位元的變長編碼，數字是和前一點的差（單位 q 度） */
export function decodeRing(s, q) {
  const out = [];
  let i = 0, x = 0, y = 0;
  const next = () => {
    let z = 0, shift = 0, c;
    do { c = IDX[s[i++]]; z |= (c & 31) << shift; shift += 5; } while (c & 32);
    return (z & 1) ? -((z + 1) >> 1) : (z >> 1);
  };
  while (i < s.length) { x += next(); y += next(); out.push([x * q, y * q]); }
  return out;
}

export function decodeLand(doc = raw) {
  const pieces = {};
  for (const k of Object.keys(doc.pieces)) pieces[k] = decodeRing(doc.pieces[k], doc.q);
  return {
    polys: doc.polys.map((p) => p.map((r) => decodeRing(r, doc.q))),
    pieces,
    meta: { source: doc.source, version: doc.version, url: doc.url, license: doc.license, processing: doc.processing },
  };
}

let cache = null;
export const getLand = () => cache || (cache = decodeLand());
