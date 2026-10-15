import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { AREAS, DIRS, LINES, POINTS, bearing, dir8, distKm, firstToward, groundToMap, pathLength, printScale, ratioToGround, townIsland } from '../src/town.js';

const near = (a, b, eps, msg) => assert.ok(Math.abs(a - b) <= eps, `${msg || ''} expected ${b}, got ${a}`);

// 方位角：0＝北、90＝東，順時針
near(bearing([0, 0], [0, 1]), 0, 1e-12, 'north'); near(bearing([0, 0], [1, 0]), 90, 1e-12, 'east');
near(bearing([0, 0], [0, -1]), 180, 1e-12, 'south'); near(bearing([0, 0], [-1, 0]), 270, 1e-12, 'west');
near(bearing([0, 0], [1, 1]), 45, 1e-12, 'northeast');
assert.deepEqual([0, 22, 23, 45, 90, 135, 180, 225, 270, 315, 337, 338, 359].map(dir8), ['N', 'N', 'NE', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'NW', 'N', 'N']);
assert.equal(DIRS.length, 8);

// 比例尺換算
assert.equal(ratioToGround(4, 25000), 1000, '1:25,000 — 4 cm on the map is 1 km');
assert.equal(ratioToGround(1, 50000), 500, '1:50,000 — 1 cm is 500 m');
assert.equal(groundToMap(1000, 25000), 4, '1 km at 1:25,000 is 4 cm');
near(groundToMap(2500, 50000), 5, 1e-12, '2.5 km at 1:50,000 is 5 cm');
assert.equal(printScale(20, 10), 50000, '10 km printed 20 cm wide is 1:50,000');
assert.equal(printScale(20, 2.5), 12500, '2.5 km printed 20 cm wide is 1:12,500');
assert.equal(printScale(20, 1), 5000);
for (const s of [5000, 12500, 25000, 50000]) for (const cm of [1, 3.7, 12]) near(groundToMap(ratioToGround(cm, s), s), cm, 1e-9, 'round trip');
near(pathLength([[0, 0], [3, 0], [3, 4]]), 7, 1e-12, 'path length');
near(distKm([0, 0], [3, 4]), 5, 1e-12);

// 地圖資料：點、線、面都在島上（陸地），山頂是最高點，河往下游一路變低、流進海裡
const I = townIsland();
for (const [k, p] of Object.entries(POINTS)) assert.ok(I.h(p.x, p.y) > 0, `${k} is on land`);
near(I.h(POINTS.summit.x, POINTS.summit.y), 1020, 5, 'summit height');
for (const k of ['road', 'lane', 'coast', 'trail']) for (const p of LINES[k].pts) assert.ok(I.h(...p) > 0, `${k} on land`);
const river = LINES.river.pts;
for (let i = 1; i < river.length; i++) assert.ok(I.h(...river[i]) <= I.h(...river[i - 1]) + 1, `river goes downhill at ${i}`);
{ const end = river[river.length - 1], last = river[river.length - 2]; const t = [end[0] + (end[0] - last[0]) * 0.5, end[1] + (end[1] - last[1]) * 0.5]; assert.ok(I.h(...t) < 0, 'the river reaches the sea'); }
// 橋在河上、也在公路上
const onLine = (pt, pts, tol = 0.03) => pts.some((a, i) => i > 0 && (() => { const b = pts[i - 1], dx = a[0] - b[0], dy = a[1] - b[1], L2 = dx * dx + dy * dy; const t = Math.max(0, Math.min(1, ((pt[0] - b[0]) * dx + (pt[1] - b[1]) * dy) / L2)); return Math.hypot(pt[0] - b[0] - t * dx, pt[1] - b[1] - t * dy) <= tol; })());
const B = [POINTS.bridge.x, POINTS.bridge.y];
assert.ok(onLine(B, river), 'bridge is on the river'); assert.ok(onLine(B, LINES.road.pts), 'bridge is on the road');
assert.ok(onLine([POINTS.hut.x, POINTS.hut.y], LINES.trail.pts), 'the hut is on the trail');
for (const [k, a] of Object.entries(AREAS)) for (const poly of a.polys) for (const p of poly) assert.ok(I.h(...p) > 0, `${k} corner on land`);

// 頁面資料：「照著地圖找」八題的答案由地圖資料推出來
const data = JSON.parse(readFileSync(new URL('../../../data/geography.json', import.meta.url), 'utf8'));
const lesson = data.units[0].lessons.find((l) => l.slug === 'reading-a-map');
const qs = lesson.legend.questions;
assert.equal(qs.length, 8);
const P = (k) => [POINTS[k].x, POINTS[k].y];
for (const q of qs) {
  assert.ok(q.en && q.zh && q.why_en && q.why_zh && q.options.length >= 2, 'texts and options');
  assert.ok(q.options.includes(q.answer), `${q.en}: answer is an option`);
  let want;
  if (q.type === 'toward') { const r = firstToward(P(q.from), q.dir, POINTS); want = r && r.key; assert.ok(r.off <= 16, `${q.en}: clearly inside the ${q.dir} sector (${r.off})`); }
  else if (q.type === 'dir') { const b = bearing(P(q.from), P(q.to)); want = dir8(b); assert.ok(Math.abs(((b - DIRS.indexOf(want) * 45 + 540) % 360) - 180) <= 16, `${q.en}: not near a boundary`); }
  else if (q.type === 'closer') { want = distKm(P(q.from), P(q.a)) < distKm(P(q.from), P(q.b)) ? q.a : q.b; }
  else if (q.type === 'dist') { const d = distKm(P(q.from), P(q.to)); want = q.options.reduce((m, o) => (Math.abs(+o - d) < Math.abs(+m - d) ? o : m)); assert.ok(Math.abs(+want - d) < 0.15, `${q.en}: ${d}`); }
  else if (q.type === 'trail') { const t = LINES.trail.pts; const firstPt = Object.entries(POINTS).filter(([k]) => k !== 'trailhead').map(([k, p]) => ({ k, i: t.findIndex((u) => Math.hypot(u[0] - p.x, u[1] - p.y) < 0.03) })).filter((o) => o.i > 0).sort((a, b) => a.i - b.i)[0]; want = firstPt.k; }
  else if (q.type === 'flow') { const i = river.findIndex((p, j) => j > 0 && onLine(B, [river[j - 1], p])); want = dir8(bearing(river[i - 1], river[i])); }
  else throw new Error('unknown type ' + q.type);
  assert.equal(String(q.answer), String(want), `${q.en}`);
}
assert.equal(lesson.map_english.items.length, 8);
console.log('town.test ok');
