import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { decodeLand } from '../src/land.js';
import { R_KM, SCHEMES, areaBy, continentOf, groupOf, landRows, makeIsLand, oceanAreas, oceanOf } from '../src/regions.js';

const near = (a, b, eps, msg) => assert.ok(Math.abs(a - b) <= eps, `${msg || ''} expected ${b}, got ${a}`);

// 已知地點分到哪一洲（七大洲的常見分法）
const C = {
  asia: [[121, 23.7], [138.5, 36], [80.7, 7.8], [34, 29.5], [32, 39.5], [70, 48], [-175, 66], [159, 56], [45, 24], [47, 15], [114, 1], [122, 12], [78, 22], [33, 35]],
  europe: [[-18.5, 65], [-1.5, 52.5], [37.6, 55.8], [27.5, 41.5], [-4, 40], [14, 37.5], [34, 45], [17, 78], [55, 73]],
  africa: [[46.7, -19.5], [31.2, 30], [-6, 33], [9.5, 36.5], [39, 15], [47, 6], [20, -30]],
  namerica: [[-40, 72], [-80, 8.5], [-150, 64], [-79, 22], [-100, 45]],
  samerica: [[-74, 5], [-61.3, 10.4], [-91, -0.6], [-60, -14], [-70, -50]],
  oceania: [[170.5, -44.5], [140, -5], [-155.5, 19.6], [146.7, -42], [134, -25]],
  antarctica: [[0, -80], [-60, -75], [100, -70]],
};
for (const [want, pts] of Object.entries(C)) for (const p of pts) assert.equal(continentOf(...p), want, `${p} should be ${want}`);
// 海洋
const O = [[[-30, 0], 'atlantic', 'atlantic'], [[-150, 0], 'pacific', 'pacific'], [[80, -20], 'indian', 'indian'], [[0, 85], 'arctic', 'arctic'],
  [[0, -65], 'southern', 'atlantic'], [[150, -65], 'southern', 'pacific'], [[100, -65], 'southern', 'indian'], [[-90, 25], 'atlantic', 'atlantic'],
  [[-100, 15], 'pacific', 'pacific'], [[115, 15], 'pacific', 'pacific'], [[18, 35], 'atlantic', 'atlantic'], [[38, 20], 'indian', 'indian'],
  [[51, 42], 'lake', 'lake'], [[-75, 15], 'atlantic', 'atlantic'], [[-175, 60], 'pacific', 'pacific'], [[155, -15], 'pacific', 'pacific'], [[124, 23.5], 'pacific', 'pacific']];
for (const [p, five, four] of O) { assert.equal(oceanOf(...p, true), five, `${p} (five oceans)`); assert.equal(oceanOf(...p, false), four, `${p} (four oceans)`); }
// 四種算法
assert.equal(SCHEMES.seven.groups.length, 7); assert.equal(SCHEMES.eurasia.groups.length, 6); assert.equal(SCHEMES.america.groups.length, 6); assert.equal(SCHEMES.five.groups.length, 5);
for (const [k, s] of Object.entries(SCHEMES)) {
  const seen = new Set(Object.keys(C).map((c) => groupOf(c, k)));
  assert.deepEqual([...seen].sort(), [...s.groups].sort(), `${k}: groups match`);
}
assert.equal(groupOf('europe', 'eurasia'), 'eurasia'); assert.equal(groupOf('samerica', 'america'), 'america'); assert.equal(groupOf('antarctica', 'five'), 'antarctica');
assert.equal(groupOf('asia', 'five'), 'eurasia'); assert.equal(groupOf('namerica', 'five'), 'america'); assert.equal(groupOf('asia', 'america'), 'asia');

// 用陸地資料自己量面積：和引用的數字比，順序一樣、差距在合理範圍（簡化過的海岸線，南極洲不含冰棚）
const land = decodeLand(JSON.parse(readFileSync(new URL('../src/data/land.json', import.meta.url), 'utf8')));
const rows = landRows(land.polys, 0.25);
const A = areaBy(rows, 0.25, continentOf);
const total = Object.values(A).reduce((a, b) => a + b, 0);
near(total / 1e6, 148, 4, 'total land area (million km²)');
const isLand = makeIsLand(rows, 0.25);
assert.ok(isLand(121, 23.7) && !isLand(123.5, 23.5) && !isLand(51, 42) && isLand(-40, 72), 'land lookup');
const OA = oceanAreas(rows, true);
const globe = 4 * Math.PI * R_KM * R_KM;
near((Object.values(OA).reduce((a, b) => a + b, 0)) / globe, 0.71, 0.015, 'about 71% of the Earth is water');
assert.ok(OA.pacific > OA.atlantic && OA.atlantic > OA.indian && OA.indian > OA.southern && OA.southern > OA.arctic, 'ocean order: Pacific, Atlantic, Indian, Southern, Arctic');

// 頁面資料：引用的面積排序與自己量的一致；小遊戲的答案由規則推出來
const data = JSON.parse(readFileSync(new URL('../../../data/geography.json', import.meta.url), 'utf8'));
const lesson = data.units[1].lessons.find((l) => l.slug === 'continents-and-oceans');
const cited = lesson.bars.continents;
const order = (o) => Object.entries(o).sort((a, b) => b[1] - a[1]).map(([k]) => k);
assert.deepEqual(order(Object.fromEntries(cited.map((c) => [c.key, c.km2]))), order(A), 'the continents rank the same in the cited figures and on our map');
for (const c of cited) near(A[c.key] / c.km2, 1, c.key === 'antarctica' ? 0.2 : 0.07, `${c.key}: our map vs the cited figure`);
const citedO = lesson.bars.oceans;
assert.deepEqual(order(Object.fromEntries(citedO.map((c) => [c.key, c.km2]))), order(Object.fromEntries(Object.entries(OA).filter(([k]) => k !== 'lake'))), 'oceans rank the same');
for (const q of lesson.count.questions) {
  assert.ok(q.options.includes(q.answer) && q.en && q.zh && q.why_en && q.why_zh, q.en);
  if (q.check === 'count') assert.equal(String(SCHEMES[q.scheme].groups.length), q.answer, q.en);
  if (q.check === 'where') assert.equal(groupOf(continentOf(...q.pt), q.scheme), q.answer, q.en);
  if (q.check === 'ocean') assert.equal(oceanOf(...q.pt, q.five), q.answer, q.en);
}
assert.equal(lesson.map_english.items.length, 8);
console.log('regions.test ok', Object.fromEntries(Object.entries(A).map(([k, v]) => [k, Math.round(v / 1e4) / 100])), Object.fromEntries(Object.entries(OA).map(([k, v]) => [k, Math.round(v / 1e4) / 100])));
