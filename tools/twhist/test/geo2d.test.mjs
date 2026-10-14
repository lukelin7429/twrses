import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { activeAt, dated, distanceKm, layerAt, makeProjection, ringPath, spanOf } from '../src/geo2d.js';

const near = (a, b, e = 1e-6) => assert.ok(Math.abs(a - b) <= e * Math.max(1, Math.abs(b)), `${a} ≉ ${b}`);
const coast = JSON.parse(readFileSync(new URL('../src/data/coast.json', import.meta.url), 'utf8'));
const B = coast.bbox, P = makeProjection(B, 600, 20);

// 四個角落與來回換算
let [x, y] = P.xy(B.w, B.n); near(x, 20); near(y, 20);
[x, y] = P.xy(B.e, B.s); near(x, 580); near(y, P.height - 20);
for (const [lo, la] of [[121.0, 23.5], [120.2, 22.0], [121.9, 25.2]]) { const q = P.lonLat(...P.xy(lo, la)); near(q[0], lo); near(q[1], la); }
// 北在上、東在右
assert.ok(P.xy(121, 25)[1] < P.xy(121, 22)[1]); assert.ok(P.xy(122, 23)[0] > P.xy(120, 23)[0]);
// 東西向和南北向的比例尺一樣：畫面上 100 px 都是同樣的公里數（誤差 1% 以內）
const c = P.lonLat(300, 300), ex = P.lonLat(400, 300), sy = P.lonLat(300, 400);
const kmE = distanceKm(c, ex), kmS = distanceKm(c, sy);
assert.ok(Math.abs(kmE - kmS) / kmS < 0.01, `${kmE} vs ${kmS}`);
near(kmS / 100, P.kmPerPx, 0.01);
// 海岸線：最大的那個環是台灣本島，全部落在框裡，而且真的是封閉的
const main = coast.rings[0];
assert.ok(main.length > 150);
coast.rings.forEach((r) => { r.forEach(([lo, la]) => assert.ok(lo >= B.w && lo <= B.e && la >= B.s && la <= B.n)); assert.deepEqual(r[0], r.at(-1)); });
const lons = main.map((p) => p[0]), lats = main.map((p) => p[1]);
assert.ok(Math.min(...lats) < 22.0 && Math.max(...lats) > 25.2 && Math.min(...lons) < 120.2 && Math.max(...lons) > 121.9);
// 本島南北大約 390 公里上下
const len = distanceKm([120.85, Math.min(...lats)], [121.55, Math.max(...lats)]);
assert.ok(len > 370 && len < 400, String(len));
assert.ok(ringPath(main, P).startsWith('M') && ringPath(main, P).endsWith('Z'));
assert.match(coast.license, /Public domain/);

// 文化層
const S = { layers: [{ fromAgo: 5300, toAgo: 4200 }, { fromAgo: 3500, toAgo: 2300 }, { name: 'undated' }] };
assert.equal(dated(S).length, 2);
assert.ok(activeAt(S, 5000) && activeAt(S, 3500) && activeAt(S, 2300) && !activeAt(S, 4000) && !activeAt(S, 1000) && !activeAt(S, 9000));
assert.equal(layerAt(S, 3000).length, 1);
assert.deepEqual(spanOf(S), { fromAgo: 5300, toAgo: 2300 });
assert.equal(spanOf({ layers: [{ name: 'x' }] }), null); assert.ok(!activeAt({ layers: [] }, 500));
near(distanceKm([121, 23], [121, 24]), 111.19, 1e-3);
console.log('geo2d.test.mjs ok');
