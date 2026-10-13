/*
 * 世界歷史 World History · 陸地外形（Natural Earth 1:50m Land 5.1.2，公有領域；scripts/build-land.mjs 產生 data/land.json）。
 * 只有陸地的外形，沒有國界、沒有國名。
 */
import raw from './data/land.json';
import { inRing } from './sphere.js';
import { unpack } from './landcode.js';

let cache = null;
/** [{ rings: [外環, 洞…], box: [w, s, e, n] }] */
export function getLand() {
  if (cache) return cache;
  cache = raw.polys.map((p) => {
    const rings = p.map((s) => unpack(s, raw.q));
    let w = 180, s = 90, e = -180, n = -90;
    for (const [x, y] of rings[0]) { if (x < w) w = x; if (x > e) e = x; if (y < s) s = y; if (y > n) n = y; }
    return { rings, box: [w, s, e, n] };
  });
  return cache;
}
export const landSource = raw.source;

export function isLand(pt) {
  for (const { rings, box } of getLand()) {
    if (pt[0] < box[0] || pt[0] > box[2] || pt[1] < box[1] || pt[1] > box[3]) continue;
    if (inRing(pt, rings[0]) && !rings.slice(1).some((h) => inRing(pt, h))) return true;
  }
  return false;
}
