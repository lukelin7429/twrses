// 第十四課的資料：美洲的城市和道路地球儀（沿用 wh-silk）、「讀一讀、寫一寫馬雅的數字」、「這個字從哪裡來？」、時間軸、固定的卡。node test/americas.test.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { inRing } from '../src/sphere.js';
import { unpack } from '../src/landcode.js';
import { LANES, makeScale, yearToAgo } from '../src/timeline.js';
import { checkRoute, matchOptions } from '../src/dharma.js';
import { checkGood, handoffs } from '../src/silk.js';
import { toMaya, fromMaya, check } from '../src/mayanum.js';

const data = JSON.parse(readFileSync(new URL('../../../data/world_history.json', import.meta.url), 'utf8'));
const raw = JSON.parse(readFileSync(new URL('../src/data/land.json', import.meta.url), 'utf8'));
const land = raw.polys.map((p) => p.map((s) => unpack(s, raw.q)));
const isLand = (pt) => land.some((r) => inRing(pt, r[0]) && !r.slice(1).some((h) => inRing(pt, h)));
const L = data.units[3].lessons.find((l) => l.slug === 'americas-builders');
assert.ok(L); assert.equal(L.n, 14); assert.equal(L.lab.kind, 'silk'); assert.ok(L.lab.home && L.lab.aria);
assert.equal(L.paras.length, 6); assert.equal(L.paras_zh.length, 6); assert.equal(L.vocab.length, 8); assert.equal(L.quiz.length, 5);
assert.equal(L.myths.length, 4); assert.equal(L.tricks.length, 4); assert.equal(L.activities.length, 2); assert.equal(L.parts.length, 4);
for (const k of ['timeline', 'how_we_know', 'views', 'phrases', 'taiwan_then', 'curric', 'culture_cards']) assert.ok(L[k], k);
assert.equal(L.phrases.rows.length, 8);
for (const q of L.views.items) { assert.ok(q.sides.length >= 2); for (const s of q.sides) assert.ok(s.src && s.url); assert.ok(q.note_en && q.note_zh); }
for (const s of L.sources) assert.ok(s.src && /^https:\/\//.test(s.url), s.en);
const all = JSON.stringify(L);
assert.ok(!all.includes('TODO') && !all.includes('example.org'));
// 用詞：不從「發現」的角度、不說「消失的文明」「野蠻」「原始」（「哥倫布發現了美洲」只能出現在迷思裡）
const body = JSON.stringify({ ...L, myths: [], other_views: null, views: null });
for (const bad of ['discovered America', 'discovery of America', 'vanished civilization', 'lost civilization', 'savage', 'primitive', 'barbar', 'New World', '野蠻', '原始的', '消失的文明', '發現新大陸']) assert.ok(!body.includes(bad), bad);
assert.ok(/still live|today/.test(L.big_idea_en) && L.big_idea_zh.includes('今天'));
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
  // 每一座城市都有路線碰到
  for (const c of lab.cities) assert.ok(lab.routes.some((r) => r.pts.some((p) => p[3] === c.key)), `${c.key} on a route`);
  for (const g of lab.goods) { assert.equal(checkGood(g, lab.cities), null, g.key); assert.ok(g.note_en && g.note_zh && g.src && g.url, g.key); }
  const by = Object.fromEntries(lab.goods.map((g) => [g.key, g]));
  // 貢品和信差：直接寫「換手」那一行；西班牙人的行軍：同一批人
  assert.ok(by.tribute.hands_en && by.tribute.hands_zh && by.chasqui.hands_en && by.chasqui.hands_zh);
  assert.ok(/relay/.test(by.chasqui.hands_en));
  assert.equal(handoffs(by.spanish), 0); assert.ok(by.spanish.same_en);
  // 兩個地區：中美洲（緯度 > 10）和安地斯（緯度 < 0）
  assert.ok(lab.cities.filter((c) => c.at[1] > 10).length >= 5 && lab.cities.filter((c) => c.at[1] < 0).length >= 5);
  assert.deepEqual(L.parts.map((p) => p.demo), lab.demos.map((d) => d.key));
  for (const d of lab.demos) if (d.good) assert.ok(by[d.good] && d.year >= by[d.good].year, d.key);
  const cy = Object.fromEntries(lab.cities.map((c) => [c.key, c]));
  for (const k of ['tenochtitlan', 'copan', 'quito', 'maule', 'cajamarca', 'tochpan', 'tikal', 'qeswachaka']) assert.ok(cy[k].when_en.includes(String(cy[k].year)) || cy[k].when_en.includes('model uses'), k);
  assert.ok(cy.tenochtitlan.when_en.includes('1325') && cy.tenochtitlan.when_en.includes('1521'));
}
// 馬雅的數字
{
  const M = L.mayanum;
  assert.ok(M.items.length >= 6);
  assert.ok(M.items.some((it) => it.mode === 'read') && M.items.some((it) => it.mode === 'write'));
  for (const it of M.items) {
    assert.ok(['read', 'write'].includes(it.mode) && it.note_en && it.note_zh, it.n);
    assert.equal(fromMaya(toMaya(it.n)), it.n);
    if (it.mode === 'write') {
      const lv = toMaya(it.n); const two = lv.length === 1 ? [{ zero: false, bars: 0, dots: 0 }, lv[0]] : lv;
      assert.equal(check(two, it.n), 'ok', it.n);
    }
  }
  // 至少一題要用到零（20 以上、下面那一位是 0）
  assert.ok(M.items.some((it) => it.n >= 20 && it.n % 20 === 0));
}
// 這個字從哪裡來：納瓦特語和克丘亞語各一半
{
  const T = L.terms, n = T.items.length;
  assert.equal(n, 10);
  for (const it of T.items) assert.ok(it.zh && it.en && it.orig && it.lang && it.note_en && it.note_zh, it.zh);
  assert.equal(T.items.filter((it) => it.lang === 'Nahuatl').length, 5);
  assert.equal(T.items.filter((it) => it.lang === 'Quechua').length, 5);
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
  assert.ok(T.events.filter((e) => e.lane === 'americas').length >= 5);
}
const L13 = data.units[3].lessons.find((l) => l.n === 13);
assert.ok(L13.links.some((x) => x.href === '/resources/classes/world-history/americas-builders/'));
assert.ok(L.links[0].soon && /Zheng He/.test(L.links[0].en));
assert.ok(L.links.some((x) => x.href === '/resources/classes/world-history/gold-and-salt/'));
console.log(`americas.test.mjs ok (${L.lab.cities.length} cities, ${L.lab.routes.length} routes, ${L.lab.goods.length} journeys, ${L.mayanum.items.length} numbers, ${L.terms.items.length} words)`);
