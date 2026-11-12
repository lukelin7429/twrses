// 第十五課的資料：鄭和下西洋的地球儀（沿用 wh-silk）、「船有多大？」、「哪一件先發生？」、「這個字從哪裡來？」、時間軸、固定的卡。node test/zhenghe.test.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { inRing } from '../src/sphere.js';
import { unpack } from '../src/landcode.js';
import { LANES, makeScale, yearToAgo } from '../src/timeline.js';
import { checkRoute, matchOptions } from '../src/dharma.js';
import { checkGood, handoffs } from '../src/silk.js';

const data = JSON.parse(readFileSync(new URL('../../../data/world_history.json', import.meta.url), 'utf8'));
const raw = JSON.parse(readFileSync(new URL('../src/data/land.json', import.meta.url), 'utf8'));
const land = raw.polys.map((p) => p.map((s) => unpack(s, raw.q)));
const isLand = (pt) => land.some((r) => inRing(pt, r[0]) && !r.slice(1).some((h) => inRing(pt, h)));
const L = data.units[3].lessons.find((l) => l.slug === 'china-zheng-he');
assert.ok(L); assert.equal(L.n, 15); assert.equal(L.lab.kind, 'silk'); assert.ok(L.lab.home && L.lab.aria);
assert.equal(L.paras.length, 6); assert.equal(L.paras_zh.length, 6); assert.equal(L.vocab.length, 8); assert.equal(L.quiz.length, 5);
assert.equal(L.myths.length, 4); assert.equal(L.tricks.length, 4); assert.equal(L.activities.length, 2); assert.equal(L.parts.length, 4);
for (const k of ['timeline', 'how_we_know', 'views', 'phrases', 'taiwan_then', 'curric', 'culture_cards']) assert.ok(L[k], k);
assert.equal(L.phrases.rows.length, 8);
for (const q of L.views.items) { assert.ok(q.sides.length >= 2); for (const s of q.sides) assert.ok(s.src && s.url); assert.ok(q.note_en && q.note_zh); }
for (const s of L.sources) assert.ok(s.src && /^https:\/\//.test(s.url), s.en);
const all = JSON.stringify(L);
assert.ok(!all.includes('TODO') && !all.includes('example.org'));
// 用詞：不排高下、不說「發現」新大陸、不說 1421 發現美洲
const body = JSON.stringify({ ...L, myths: [] });
for (const bad of ['discovered America', '1421', 'backward', 'superior civilization', 'Four Great Inventions', '落後', '四大發明', '發現美洲']) assert.ok(!body.includes(bad), bad);
// 地球儀
{
  const lab = L.lab, keys = new Set(lab.cities.map((c) => c.key));
  assert.equal(keys.size, lab.cities.length);
  for (const c of lab.cities) {
    assert.ok(isLand(c.at), `${c.key} on land`);
    assert.ok(c.year >= lab.from && c.year <= lab.to, c.key);
    for (const f of ['what_en', 'what_zh', 'when_en', 'when_zh', 'how_en', 'how_zh', 'src', 'url']) assert.ok(c[f], `${c.key}.${f}`);
  }
  for (const r of lab.routes) {
    assert.equal(checkRoute(r, lab.cities), null, r.key);
    for (const p of r.pts) if (p[3] === 'sea') assert.ok(!isLand([p[0], p[1]]), `${r.key} ${p[0]},${p[1]} at sea`);
  }
  for (const c of lab.cities) assert.ok(lab.routes.some((r) => r.pts.some((p) => p[3] === c.key)), `${c.key} on a route`);
  for (const g of lab.goods) { assert.equal(checkGood(g, lab.cities), null, g.key); assert.ok(g.note_en && g.note_zh && g.src && g.url, g.key); }
  const by = Object.fromEntries(lab.goods.map((g) => [g.key, g]));
  assert.equal(handoffs(by.first), 0); assert.equal(handoffs(by.mahuan), 0);
  assert.ok(by.giraffe.hands_en && by.cargo.hands_en);
  // 船隊到過印度洋兩岸：東亞（經度 > 100）和東非（經度 < 46、緯度 < 5）
  assert.ok(lab.cities.some((c) => c.at[0] > 115) && lab.cities.some((c) => c.at[0] < 46 && c.at[1] < 5));
  assert.deepEqual(L.parts.map((p) => p.demo), lab.demos.map((d) => d.key));
  for (const d of lab.demos) if (d.good) assert.ok(by[d.good] && d.year >= by[d.good].year, d.key);
  const cy = Object.fromEntries(lab.cities.map((c) => [c.key, c]));
  for (const k of ['nanjing', 'cochin', 'aden', 'dhofar']) assert.ok(cy[k].when_en.includes(String(cy[k].year)), k);
}
// 船有多大
{
  const S = L.ships;
  assert.ok(S.items.length >= 4);
  const kinds = new Set(S.items.map((it) => it.kind));
  for (const k of ['record', 'evidence', 'ship']) assert.ok(kinds.has(k), k);
  for (const it of S.items) {
    assert.ok(it.m_lo > 0 && (!it.m_hi || it.m_hi > it.m_lo), it.key);
    assert.ok(it.len_en && it.len_zh && it.note_en && it.note_zh && it.src && /^https:\/\//.test(it.url), it.key);
  }
  // 公尺和英尺的換算要對（1 ft = 0.3048 m，容許 ±2 m）
  for (const it of S.items) {
    const ft = (it.len_en.match(/([\d,]+)\s*ft/) || [])[1];
    if (ft && !it.m_hi) assert.ok(Math.abs(+ft.replace(',', '') * 0.3048 - it.m_lo) < 2, `${it.key} ${ft} ft vs ${it.m_lo} m`);
  }
}
// 哪一件先發生
{
  const W = L.when, olders = W.items.map((it) => it.older);
  assert.ok(W.items.length >= 6);
  for (const it of W.items) assert.ok(it.when_en && it.when_zh && it.older >= it.nearer, it.key);
  assert.deepEqual([...olders].sort((a, b) => b - a), olders, 'items listed in true order');
  assert.ok(W.items.some((it) => /Korea/.test(it.en)) && W.items.some((it) => /Europe/.test(it.en)));
}
// 這個字從哪裡來
{
  const T = L.terms, n = T.items.length;
  assert.equal(n, 10);
  for (const it of T.items) assert.ok(it.zh && it.en && it.orig && it.lang && it.note_en && it.note_zh, it.zh);
  assert.equal(new Set(T.items.map((it) => `${it.orig}|${it.en}`)).size, n);
  assert.equal(new Set(T.items.map((it) => it.zh)).size, n);
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
const L14 = data.units[3].lessons.find((l) => l.n === 14);
assert.ok(L14.links.some((x) => x.href === '/resources/classes/world-history/china-zheng-he/'));
assert.ok(L.links[0].soon && /Mongols/.test(L.links[0].en));
console.log(`zhenghe.test.mjs ok (${L.lab.cities.length} ports, ${L.lab.routes.length} routes, ${L.lab.goods.length} journeys, ${L.ships.items.length} ships, ${L.when.items.length} events, ${L.terms.items.length} words)`);
