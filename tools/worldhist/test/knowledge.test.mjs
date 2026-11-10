// 第十一課的資料：一本書的旅程、「這個字從哪裡來？」、「哪一件先發生？」、時間軸、固定的卡。node test/knowledge.test.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { inRing } from '../src/sphere.js';
import { unpack } from '../src/landcode.js';
import { LANES, makeScale, yearToAgo } from '../src/timeline.js';
import { checkRoute, matchOptions } from '../src/dharma.js';
import { checkBook, translations, langChain } from '../src/books.js';

const data = JSON.parse(readFileSync(new URL('../../../data/world_history.json', import.meta.url), 'utf8'));
const raw = JSON.parse(readFileSync(new URL('../src/data/land.json', import.meta.url), 'utf8'));
const land = raw.polys.map((p) => p.map((s) => unpack(s, raw.q)));
const isLand = (pt) => land.some((r) => inRing(pt, r[0]) && !r.slice(1).some((h) => inRing(pt, h)));
const L = data.units[2].lessons.find((l) => l.slug === 'keeping-knowledge');
assert.ok(L); assert.equal(L.n, 11); assert.equal(L.lab.kind, 'books');
assert.equal(L.paras.length, 6); assert.equal(L.paras_zh.length, 6); assert.equal(L.vocab.length, 8); assert.equal(L.quiz.length, 5);
assert.equal(L.myths.length, 4); assert.equal(L.tricks.length, 4); assert.equal(L.activities.length, 2); assert.equal(L.parts.length, 4);
for (const k of ['timeline', 'how_we_know', 'views', 'phrases', 'taiwan_then', 'curric', 'culture_cards']) assert.ok(L[k], k);
assert.equal(L.phrases.rows.length, 8);
for (const q of L.views.items) { assert.ok(q.sides.length >= 2); for (const s of q.sides) assert.ok(s.src && s.url); assert.ok(q.note_en && q.note_zh); }
for (const s of L.sources) assert.ok(s.src && /^https:\/\//.test(s.url), s.en);
const all = JSON.stringify(L);
assert.ok(!all.includes('TODO'), 'no TODO left'); assert.ok(!all.includes('example.org'), 'no placeholder URL');
// 不用「黑暗時代」當事實（只能出現在迷思裡，加引號）；不說伊斯蘭世界「只是保管」
for (const p of L.paras) { assert.ok(!/Dark Ages/i.test(p), 'no Dark Ages in the text'); assert.ok(!/merely|just kept|only kept/i.test(p)); }

// 地球儀：城市在陸地上、路線檢查、每一本書都通過 checkBook
{
  const lab = L.lab, keys = new Set(lab.cities.map((c) => c.key));
  assert.equal(keys.size, lab.cities.length);
  for (const c of lab.cities) {
    assert.ok(isLand(c.at), `${c.key} on land`);
    assert.ok(c.year >= lab.from && c.year <= lab.to, c.key);
    for (const f of ['what_en', 'what_zh', 'when_en', 'when_zh', 'how_en', 'how_zh', 'src', 'url', 'short_en', 'short_zh']) assert.ok(c[f], `${c.key}.${f}`);
  }
  for (const r of lab.routes) assert.equal(checkRoute(r, lab.cities), null, r.key);
  for (const b of lab.goods) { assert.equal(checkBook(b, lab.cities), null, b.key); assert.ok(b.note_en && b.note_zh && b.src && b.url, b.key); }
  const by = Object.fromEntries(lab.goods.map((b) => [b.key, b]));
  assert.deepEqual(langChain(by.almagest).map((l) => l.en), ['Greek', 'Arabic', 'Latin']);
  assert.deepEqual(langChain(by.numerals).map((l) => l.en), ['Sanskrit', 'Arabic', 'Latin']);
  assert.equal(translations(by.canon), 1); assert.equal(by.canon.orig_en, 'Arabic');
  // 不是每本書都從希臘文開始
  assert.ok(lab.goods.some((b) => b.orig_en !== 'Greek'));
  // 卡片上的年代和亮起來的年代一致
  const cy = Object.fromEntries(lab.cities.map((c) => [c.key, c]));
  for (const k of ['bhinmal', 'baghdad', 'toledo', 'pisa', 'cordoba', 'dunhuang']) assert.ok(cy[k].when_en.includes(String(cy[k].year)), k);
  assert.deepEqual(L.parts.map((p) => p.demo), lab.demos.map((d) => d.key));
  for (const d of lab.demos) if (d.good) assert.ok(by[d.good] && d.year >= by[d.good].year, d.key);
}

// 「這個字從哪裡來？」
{
  const T = L.terms, n = T.items.length;
  assert.equal(n, 10);
  for (const it of T.items) assert.ok(it.zh && it.en && it.orig && it.lang && it.note_en && it.note_zh, it.zh);
  assert.equal(new Set(T.items.map((it) => `${it.orig}|${it.en}`)).size, n);
  const by = Object.fromEntries(T.items.map((it) => [it.en, it]));
  assert.equal(by.algebra.orig, 'al-jabr'); assert.equal(by.zero.orig, 'ṣifr'); assert.equal(by.museum.lang, 'Greek');
  for (let i = 0; i < n; i++) assert.ok(matchOptions(n, i).includes(i));
}

// 「哪一件先發生？」：年代照順序、距今和西元年一致
{
  const W = L.when.items;
  for (let i = 1; i < W.length; i++) assert.ok(W[i].older < W[i - 1].older, W[i].key);
  for (const it of W) { assert.ok(it.when_en && it.when_zh); const y = +(it.when_en.match(/\d+/)[0]) * (/BCE/.test(it.when_en) ? -1 : 1); assert.equal(it.older, 2000 - y, it.key); }
}

// 時間軸
{
  const T = L.timeline, sc = makeScale('log', T.from, T.to);
  const ago = (v) => (v && typeof v === 'object' ? yearToAgo(v.year) : v);
  const lanes = LANES.map((l) => l.key);
  for (const e of T.events) { assert.ok(lanes.includes(e.lane), e.en); const f = ago(e.from); assert.ok(sc.has(f), e.en); if (e.to) assert.ok(f > ago(e.to), e.en); }
  assert.ok(T.view.from > T.lesson.from && T.view.to < T.lesson.to);
}
// 連結：第十課連到這一課；下一課是製作中的第十二課
const L10 = data.units[2].lessons.find((l) => l.n === 10);
assert.ok(L10.links.some((x) => x.href === '/resources/classes/world-history/keeping-knowledge/'));
assert.ok(L.links[0].soon && /Castle/.test(L.links[0].en));
console.log(`knowledge.test.mjs ok (${L.lab.cities.length} places, ${L.lab.routes.length} routes, ${L.lab.goods.length} books, ${L.terms.items.length} words)`);
