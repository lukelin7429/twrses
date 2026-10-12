import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { makeFindGame } from '../src/find.js';
import { decodeLand } from '../src/land.js';

const g = makeFindGame([{ lon: 121, lat: 23.5 }, { lon: 0, lat: 0 }], 9);
let r = g.answer(100, 50);
assert.equal(r.correct, false); assert.equal(r.ns, 'south'); assert.equal(r.ew, 'east');
assert.equal(g.next(), false, 'cannot skip');
r = g.answer(124, 20);
assert.equal(r.correct, true); assert.equal(r.first, false); assert.ok(r.off < 9);
assert.equal(g.answer(121, 23.5), null, 'already found');
assert.equal(g.next(), true);
r = g.answer(3, -4);
assert.deepEqual([r.correct, r.first], [true, true]);
assert.equal(g.next(), false); assert.equal(g.state.done, true); assert.equal(g.state.first, 1);
g.reset(); assert.equal(g.state.i, 0); assert.equal(g.state.first, 0);
// 剛好在邊界上算找到；超過一點就不算
{ const h = makeFindGame([{ lon: 0, lat: 0 }], 9); assert.equal(h.answer(0, 9).correct, true); }
{ const h = makeFindGame([{ lon: 0, lat: 0 }], 9); assert.equal(h.answer(0, 9.01).correct, false); }
// 高緯度：經度差很多度，實際距離其實很近
{ const h = makeFindGame([{ lon: -40, lat: 80 }], 9); assert.equal(h.answer(0, 80).correct, true, '40 degrees of longitude at 80 N is only about 7 degrees of arc'); }

// 頁面資料：八題；目標是陸塊、島或海洋（不是國家）；land 指定的要真的落在陸地／海上
const data = JSON.parse(readFileSync(new URL('../../../data/geography.json', import.meta.url), 'utf8'));
const lesson = data.units[0].lessons.find((l) => l.slug === 'latitude-and-longitude');
const land = decodeLand(JSON.parse(readFileSync(new URL('../src/data/land.json', import.meta.url), 'utf8')));
const inside = ([x, y], ring) => { let c = false; for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) { const [x1, y1] = ring[i], [x2, y2] = ring[j]; if ((y1 > y) !== (y2 > y) && x < (x2 - x1) * (y - y1) / (y2 - y1) + x1) c = !c; } return c; };
const isLand = (pt) => land.polys.some((p) => inside(pt, p[0]) && !p.slice(1).some((h) => inside(pt, h)));
const qs = lesson.find.questions;
assert.equal(qs.length, 8);
for (const q of qs) {
  assert.ok(Math.abs(q.lat) <= 80 && Math.abs(q.lon) <= 180, 'in range');
  assert.ok(q.en && q.zh && q.where_en && q.where_zh, 'texts');
  assert.equal(isLand([q.lon, q.lat]), q.land, `${q.where_en}: land flag`);
}
assert.ok(qs.filter((q) => q.lat < 0).length >= 3 && qs.filter((q) => q.lon < 0).length >= 3, 'all four hemispheres appear');
assert.equal(lesson.map_english.items.length, 8);
console.log('find.test ok');
