// 第二課的資料：地圖上的地區、兩個分類遊戲、固定的卡。node test/farming.test.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { regionState, makeSort } from '../src/spread.js';
import { inRing } from '../src/sphere.js';
import { unpack } from '../src/landcode.js';
import { makeView, aspect } from '../src/map2d.js';
import { LANES, makeScale } from '../src/timeline.js';

const data = JSON.parse(readFileSync(new URL('../../../data/world_history.json', import.meta.url), 'utf8'));
const raw = JSON.parse(readFileSync(new URL('../src/data/land.json', import.meta.url), 'utf8'));
const land = raw.polys.map((p) => p.map((s) => unpack(s, raw.q)));
const isLand = (pt) => land.some((r) => inRing(pt, r[0]) && !r.slice(1).some((h) => inRing(pt, h)));
const L = data.units[0].lessons.find((l) => l.slug === 'why-farming');
assert.ok(L, 'lesson 2 is in the data');
assert.equal(L.n, 2); assert.equal(L.lab.kind, 'farm');
assert.equal(L.paras.length, 6); assert.equal(L.paras_zh.length, 6); assert.equal(L.vocab.length, 8); assert.equal(L.quiz.length, 5);
assert.equal(L.myths.length, 4); assert.equal(L.tricks.length, 4); assert.equal(L.activities.length, 2); assert.equal(L.parts.length, 4);
for (const k of ['timeline', 'how_we_know', 'views', 'phrases', 'taiwan_then']) assert.ok(L[k], `missing ${k}`);
assert.equal(L.phrases.rows.length, 8);
for (const q of L.views.items) { assert.ok(q.sides.length >= 2); for (const s of q.sides) assert.ok(s.src && s.url, 'every view needs a source'); }
// 3D：四季各一段說明，正常的一年和歉收的一年都有
assert.equal(L.lab.seasons.length, 4);
for (const s of L.lab.seasons) for (const f of ['forager_en', 'forager_zh', 'farmer_en', 'farmer_zh', 'forager_bad_en', 'forager_bad_zh', 'farmer_bad_en', 'farmer_bad_zh']) assert.ok(s[f], f);
assert.deepEqual(L.parts.map((p) => p.demo), ['camp', 'field', 'granary', 'bad']);

// 地圖：每個地區在陸地上、有範圍、有出處；滑桿一開始什麼都還沒亮，滑到底全部亮
const C = L.centers;
assert.ok(C.from > C.to);
for (const c of C.centers) {
  assert.ok(isLand(c.at), `${c.key} should be on land`);
  assert.ok(c.older >= c.nearer && c.older <= C.from && c.nearer >= C.to, c.key);
  for (const f of ['en', 'zh', 'crops_en', 'crops_zh', 'when_en', 'when_zh', 'src', 'url']) assert.ok(c[f], `${c.key}.${f}`);
}
assert.equal(C.centers.filter((c) => regionState(c, C.from) !== 'not').length, 0);
assert.ok(C.centers.every((c) => regionState(c, C.to) === 'yes'));
assert.deepEqual(C.centers.filter((c) => regionState(c, 11000) !== 'not').map((c) => c.key), ['wasia']);
{
  const v = makeView(1000, 1000 / aspect({ south: -58, north: 72 }), { south: -58, north: 72 });
  assert.ok(Math.abs(v.x(0) - 500) < 1e-9 && v.y(72) === 0 && Math.abs(v.y(-58) - v.h) < 1e-9);
  assert.ok(v.x(121) > v.x(39) && v.y(23.5) < v.y(-5.8));                     // 東邊在右、北邊在上
  const back = v.lonLat(v.x(121), v.y(23.5)); assert.ok(Math.abs(back[0] - 121) < 1e-9 && Math.abs(back[1] - 23.5) < 1e-9);
  for (const c of C.centers) assert.ok(v.y(c.at[1]) > 0 && v.y(c.at[1]) < v.h);
}

// 「它是哪裡來的？」：籃子＝地圖上的七個地區＋「不只一個地區」；每個籃子至少有一題
{
  const M = L.match, keys = M.buckets.map((b) => b.key);
  assert.deepEqual(keys, [...C.centers.map((c) => c.key), 'many']);
  for (const it of M.items) assert.ok(keys.includes(it.answer), it.en);
  for (const k of keys) assert.ok(M.items.some((it) => it.answer === k), `no question for ${k}`);
  const g = makeSort(M.items, keys);
  for (const it of M.items) { assert.ok(g.pick(it.answer).firstTry); assert.ok(g.next()); }
  assert.ok(g.state.done); assert.equal(g.state.first, M.items.length);
}
// 「什麼變了？」：增加／減少／看法不同，三種都有題目，而且每題都有說明
{
  const G = L.gains, keys = G.buckets.map((b) => b.key);
  assert.deepEqual(keys, ['up', 'down', 'open']);
  for (const k of keys) assert.ok(G.items.some((it) => it.answer === k), `no question for ${k}`);
  for (const it of G.items) { assert.ok(keys.includes(it.answer)); assert.ok(it.why_en && it.why_zh && it.hint_en && it.hint_zh); }
}
// 平行時間軸
{
  const T = L.timeline, sc = makeScale('log', T.from, T.to), lanes = LANES.map((l) => l.key);
  for (const e of T.events) { assert.ok(lanes.includes(e.lane), e.en); assert.ok(sc.has(e.from)); if (e.to != null) assert.ok(e.from > e.to, e.en); }
  assert.ok(T.view.from > T.lesson.from && T.view.to < T.lesson.to);
  for (const c of C.centers) assert.ok(T.events.some((e) => e.from === c.older), `timeline is missing ${c.key}`);
}
// 第一課的延伸閱讀已經連到這一課
const L1 = data.units[0].lessons.find((l) => l.n === 1);
assert.ok(L1.links.some((x) => x.href === '/resources/classes/world-history/why-farming/' && !x.soon));
assert.ok(!data.units[0].planned.some((p) => p.n === 2));
console.log(`farming.test.mjs ok (${C.centers.length} regions, ${L.match.items.length} + ${L.gains.items.length} cards)`);
