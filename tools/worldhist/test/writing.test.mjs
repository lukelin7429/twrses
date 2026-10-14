// 第三課的資料：最早的文字地圖、「是圖還是聲音」遊戲、時間軸、固定的卡。node test/writing.test.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { regionState, makeSort } from '../src/spread.js';
import { inRing } from '../src/sphere.js';
import { unpack } from '../src/landcode.js';
import { LANES, makeScale, yearToAgo } from '../src/timeline.js';

const data = JSON.parse(readFileSync(new URL('../../../data/world_history.json', import.meta.url), 'utf8'));
const raw = JSON.parse(readFileSync(new URL('../src/data/land.json', import.meta.url), 'utf8'));
const land = raw.polys.map((p) => p.map((s) => unpack(s, raw.q)));
const isLand = (pt) => land.some((r) => inRing(pt, r[0]) && !r.slice(1).some((h) => inRing(pt, h)));
const L = data.units[0].lessons.find((l) => l.slug === 'why-writing');
assert.ok(L); assert.equal(L.n, 3); assert.equal(L.lab.kind, 'tablet');
assert.equal(L.paras.length, 6); assert.equal(L.paras_zh.length, 6); assert.equal(L.vocab.length, 8); assert.equal(L.quiz.length, 5);
assert.equal(L.myths.length, 4); assert.equal(L.tricks.length, 4); assert.equal(L.activities.length, 2); assert.equal(L.parts.length, 4);
assert.deepEqual(L.parts.map((p) => p.demo), ['one', 'count', 'round', 'sixty']);
for (const k of ['timeline', 'how_we_know', 'views', 'phrases', 'taiwan_then']) assert.ok(L[k], k);
assert.equal(L.phrases.rows.length, 8);
for (const q of L.views.items) { assert.ok(q.sides.length >= 2); for (const s of q.sides) assert.ok(s.src && s.url); assert.ok(q.note_en && q.note_zh); }

// 地圖：地方都在陸地上；從 5,600 年前開始什麼都沒有亮；美索不達米亞第一個亮
const C = L.centers;
assert.ok(C.labels && C.labels.what_en && C.count_en);
for (const c of C.centers) {
  assert.ok(isLand(c.at), c.key);
  assert.ok(c.older >= c.nearer && c.older <= C.from && c.nearer >= C.to, c.key);
  for (const f of ['crops_en', 'crops_zh', 'when_en', 'when_zh', 'src', 'url']) assert.ok(c[f], `${c.key}.${f}`);
}
assert.equal(C.centers.filter((c) => regionState(c, C.from) !== 'not').length, 0);
assert.equal(C.centers.slice().sort((a, b) => b.older - a.older)[0].key, 'meso');
assert.ok(C.centers.every((c) => regionState(c, C.to) === 'yes'));

// 「是圖，還是聲音？」：兩個籃子都有題目，而且同一個圖至少有一次兩種用法都出現（例如 👁️ 和 🔑）
{
  const S = L.signs, keys = S.buckets.map((b) => b.key);
  assert.deepEqual(keys, ['thing', 'sound']);
  for (const k of keys) assert.ok(S.items.some((it) => it.answer === k));
  for (const pic of ['👁️', '☀️', '🔑']) {
    const uses = new Set(S.items.filter((it) => it.en.includes(pic)).map((it) => it.answer));
    assert.deepEqual([...uses].sort(), ['sound', 'thing'], `${pic} should appear both ways`);
  }
  const g = makeSort(S.items, keys);
  for (const it of S.items) { assert.ok(g.pick(it.answer).firstTry); assert.ok(g.next()); }
  assert.ok(g.state.done);
}

// 時間軸：曆年寫法換得回來、都在範圍內、Uruk 在最左邊
{
  const T = L.timeline, sc = makeScale('log', T.from, T.to);
  const ago = (v) => (v && typeof v === 'object' ? yearToAgo(v.year) : v);
  const lanes = LANES.map((l) => l.key);
  const evs = T.events.map((e) => ({ ...e, from: ago(e.from), to: e.to == null ? null : ago(e.to) }));
  for (const e of evs) { assert.ok(lanes.includes(e.lane), e.en); assert.ok(sc.has(e.from), e.en); if (e.to != null) assert.ok(e.from > e.to, e.en); }
  assert.equal(evs.slice().sort((a, b) => b.from - a.from)[0].en, 'Earliest writing, Uruk');
  assert.equal(yearToAgo(-3350), 5349);
  assert.ok(T.view.from > T.lesson.from && T.view.to < T.lesson.to);
}
// 連結：第二課的延伸閱讀已連到這一課；這一課的延伸閱讀連到書法第五課
const L2 = data.units[0].lessons.find((l) => l.n === 2);
assert.ok(L2.links.some((x) => x.href === '/resources/classes/world-history/why-writing/'));
assert.ok(L.links.some((x) => x.href === '/resources/classes/calligraphy/oracle-bones/'));
assert.ok(!data.units[0].planned.some((p) => p.n === 3));
console.log(`writing.test.mjs ok (${C.centers.length} places, ${L.signs.items.length} cards)`);
