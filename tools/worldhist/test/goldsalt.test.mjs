// 第十三課的資料：黃金和鹽的地球儀（沿用 wh-silk）、「往北還是往南？」、「這個字從哪裡來？」、時間軸、固定的卡。node test/goldsalt.test.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { makeSort } from '../src/spread.js';
import { inRing } from '../src/sphere.js';
import { unpack } from '../src/landcode.js';
import { LANES, makeScale, yearToAgo } from '../src/timeline.js';
import { checkRoute, matchOptions } from '../src/dharma.js';
import { checkGood, handoffs } from '../src/silk.js';

const data = JSON.parse(readFileSync(new URL('../../../data/world_history.json', import.meta.url), 'utf8'));
const raw = JSON.parse(readFileSync(new URL('../src/data/land.json', import.meta.url), 'utf8'));
const land = raw.polys.map((p) => p.map((s) => unpack(s, raw.q)));
const isLand = (pt) => land.some((r) => inRing(pt, r[0]) && !r.slice(1).some((h) => inRing(pt, h)));
const L = data.units[3].lessons.find((l) => l.slug === 'gold-and-salt');
assert.ok(L); assert.equal(L.n, 13); assert.equal(L.lab.kind, 'silk'); assert.ok(L.lab.home && L.lab.aria);
assert.equal(L.paras.length, 6); assert.equal(L.paras_zh.length, 6); assert.equal(L.vocab.length, 8); assert.equal(L.quiz.length, 5);
assert.equal(L.myths.length, 4); assert.equal(L.tricks.length, 4); assert.equal(L.activities.length, 2); assert.equal(L.parts.length, 4);
for (const k of ['timeline', 'how_we_know', 'views', 'phrases', 'taiwan_then', 'curric', 'culture_cards']) assert.ok(L[k], k);
assert.equal(L.phrases.rows.length, 8);
for (const q of L.views.items) { assert.ok(q.sides.length >= 2); for (const s of q.sides) assert.ok(s.src && s.url); assert.ok(q.note_en && q.note_zh); }
for (const s of L.sources) assert.ok(s.src && /^https:\/\//.test(s.url), s.en);
const all = JSON.stringify(L);
assert.ok(!all.includes('TODO') && !all.includes('example.org'));
// 用詞：不說「發現非洲」、不說「原始」、不說「黑暗大陸」
for (const bad of ['Dark Continent', 'primitive', 'discovered Africa', 'tribesmen', '黑暗大陸', '原始的']) assert.ok(!all.includes(bad), bad);
// 地球儀
{
  const lab = L.lab, keys = new Set(lab.cities.map((c) => c.key));
  assert.equal(keys.size, lab.cities.length);
  for (const c of lab.cities) {
    assert.ok(isLand(c.at), `${c.key} on land`);
    assert.ok(c.year >= lab.from && c.year <= lab.to, c.key);
    for (const f of ['what_en', 'what_zh', 'when_en', 'when_zh', 'how_en', 'how_zh', 'src', 'url']) assert.ok(c[f], `${c.key}.${f}`);
  }
  for (const r of lab.routes) assert.equal(checkRoute(r, lab.cities), null, r.key);
  for (const g of lab.goods) { assert.equal(checkGood(g, lab.cities), null, g.key); assert.ok(g.note_en && g.note_zh && g.src && g.url, g.key); }
  const by = Object.fromEntries(lab.goods.map((g) => [g.key, g]));
  assert.equal(handoffs(by.musa), 0); assert.equal(handoffs(by.battuta), 0); assert.ok(by.musa.same_en && by.battuta.same_en);
  assert.ok(handoffs(by.gold) >= 1);
  // 兩張網：西非（經度 < 15）和東非（經度 > 25、緯度 < 5）的城市都有
  assert.ok(lab.cities.some((c) => c.at[0] < 0) && lab.cities.some((c) => c.at[0] > 25 && c.at[1] < 5));
  assert.deepEqual(L.parts.map((p) => p.demo), lab.demos.map((d) => d.key));
  for (const d of lab.demos) if (d.good) assert.ok(by[d.good] && d.year >= by[d.good].year, d.key);
  const cy = Object.fromEntries(lab.cities.map((c) => [c.key, c]));
  for (const k of ['sijilmasa', 'taghaza', 'walata', 'niani', 'timbuktu', 'cairo', 'sofala']) assert.ok(cy[k].when_en.includes(String(cy[k].year)), k);
}
// 往北還是往南
{
  const S = L.northsouth, keys = S.buckets.map((b) => b.key);
  assert.deepEqual(keys, ['north', 'south']);
  for (const k of keys) assert.equal(S.items.filter((it) => it.answer === k).length, 3, k);
  const g = makeSort(S.items, keys);
  for (const it of S.items) { assert.ok(g.pick(it.answer).firstTry); assert.ok(g.next()); }
  assert.ok(g.state.done);
}
// 這個字從哪裡來
{
  const T = L.terms, n = T.items.length;
  assert.equal(n, 10);
  for (const it of T.items) assert.ok(it.zh && it.en && it.orig && it.lang && it.note_en && it.note_zh, it.zh);
  assert.equal(new Set(T.items.map((it) => `${it.orig}|${it.en}`)).size, n);
  for (let i = 0; i < n; i++) assert.ok(matchOptions(n, i).includes(i));
}
// 時間軸
{
  const T = L.timeline, sc = makeScale('log', T.from, T.to);
  const ago = (v) => (v && typeof v === 'object' ? yearToAgo(v.year) : v);
  const lanes = LANES.map((l) => l.key);
  for (const e of T.events) { assert.ok(lanes.includes(e.lane), e.en); const f = ago(e.from); assert.ok(sc.has(f), e.en); if (e.to) assert.ok(f > ago(e.to), e.en); }
  assert.ok(T.view.from > T.lesson.from && T.view.to < T.lesson.to);
}
const L12 = data.units[2].lessons.find((l) => l.n === 12);
assert.ok(L12.links.some((x) => x.href === '/resources/classes/world-history/gold-and-salt/'));
assert.ok(L.links[0].href === '/resources/classes/world-history/americas-builders/' && /Maya/.test(L.links[0].en));
console.log(`goldsalt.test.mjs ok (${L.lab.cities.length} cities, ${L.lab.routes.length} routes, ${L.lab.goods.length} journeys, ${L.terms.items.length} words)`);
