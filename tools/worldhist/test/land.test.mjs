// 陸地資料：解得開、位置對、台灣有畫出來。node test/land.test.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { unpack } from '../src/landcode.js';
import { inRing } from '../src/sphere.js';

// land.js 用 import json（esbuild 會處理）；node 測試直接讀檔，再用同一個 unpack 解
const raw = JSON.parse(readFileSync(new URL('../src/data/land.json', import.meta.url), 'utf8'));
const land = raw.polys.map((p) => p.map((s) => unpack(s, raw.q)));
const isLand = (pt) => land.some((rings) => inRing(pt, rings[0]) && !rings.slice(1).some((h) => inRing(pt, h)));

assert.match(raw.source, /Natural Earth/);
assert.match(raw.source, /public domain/);
assert.ok(land.length > 500);
for (const rings of land) for (const r of rings) {
  assert.ok(r.length >= 3);
  for (const [x, y] of r) assert.ok(x >= -180.01 && x <= 180.01 && y >= -90.01 && y <= 90.01);
}

const yes = { 'East Africa': [37, 2], Sahara: [10, 22], Arabia: [45, 23], India: [78, 20], Siberia: [100, 62], 'North China Plain': [115, 36],
  Australia: [134, -25], 'New Guinea': [141, -5], Alaska: [-150, 65], 'Great Plains': [-100, 40], Amazon: [-60, -5], Patagonia: [-70, -45],
  Europe: [15, 50], Greenland: [-40, 72], Antarctica: [0, -80], Taiwan: [121, 23.8], Madagascar: [47, -19], 'New Zealand (South Island)': [170.5, -44],
  Borneo: [114, 1], Britain: [-1.5, 52.5], Honshu: [138, 36] };
const no = { 'Mid Pacific': [-150, 0], 'Mid Atlantic': [-30, 30], 'Indian Ocean': [80, -20], 'Taiwan Strait': [119.5, 24.3], 'Bering Strait': [-169, 65.8],
  'Arafura Sea': [136, -9.5], 'Caspian Sea': [51, 41], 'Bay of Bengal': [88, 15], 'Timor Sea': [127, -11.5], 'Mediterranean': [18, 35] };
for (const [name, pt] of Object.entries(yes)) assert.ok(isLand(pt), `${name} should be land`);
for (const [name, pt] of Object.entries(no)) assert.ok(!isLand(pt), `${name} should be sea`);

// 台灣是一塊獨立的島，位置和大小對（約 3.6 萬平方公里）
const tw = land.find((rings) => inRing([121, 23.8], rings[0]));
const xs = tw[0].map((p) => p[0]), ys = tw[0].map((p) => p[1]);
assert.ok(Math.min(...xs) > 119.9 && Math.max(...xs) < 122.2 && Math.min(...ys) > 21.7 && Math.max(...ys) < 25.5);
{
  let s = 0; const r = tw[0];
  for (let i = 0; i < r.length; i++) { const a = r[i], b = r[(i + 1) % r.length]; s += a[0] * b[1] - b[0] * a[1]; }
  const km2 = Math.abs(s) / 2 * 111.195 ** 2 * Math.cos(23.7 * Math.PI / 180);
  assert.ok(Math.abs(km2 - 36000) < 3000, `Taiwan area ${km2}`);
}
console.log(`land.test.mjs ok (${land.length} polygons)`);
