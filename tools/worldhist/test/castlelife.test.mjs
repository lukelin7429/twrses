// 第十二課的資料：城堡的四個階段與部分、「泥土木頭，還是石頭？」、「這個字從哪裡來？」、時間軸、固定的卡。node test/castlelife.test.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { makeSort } from '../src/spread.js';
import { LANES, makeScale, yearToAgo } from '../src/timeline.js';
import { matchOptions } from '../src/dharma.js';
import { STAGES, checkParts, partsAt, newAt } from '../src/castle.js';

const data = JSON.parse(readFileSync(new URL('../../../data/world_history.json', import.meta.url), 'utf8'));
const L = data.units[2].lessons.find((l) => l.slug === 'castle-life');
assert.ok(L); assert.equal(L.n, 12); assert.equal(L.lab.kind, 'castle');
assert.equal(L.paras.length, 6); assert.equal(L.paras_zh.length, 6); assert.equal(L.vocab.length, 8); assert.equal(L.quiz.length, 5);
assert.equal(L.myths.length, 4); assert.equal(L.tricks.length, 4); assert.equal(L.activities.length, 2); assert.equal(L.parts.length, 4);
for (const k of ['timeline', 'how_we_know', 'views', 'phrases', 'taiwan_then', 'curric', 'culture_cards']) assert.ok(L[k], k);
assert.equal(L.phrases.rows.length, 8);
for (const q of L.views.items) { assert.ok(q.sides.length >= 2); for (const s of q.sides) assert.ok(s.src && s.url); assert.ok(q.note_en && q.note_zh); }
for (const s of L.sources) assert.ok(s.src && /^https:\/\//.test(s.url), s.en);
const all = JSON.stringify(L);
assert.ok(!all.includes('TODO') && !all.includes('example.org'));
for (const p of L.paras) assert.ok(!/Dark Ages|barbaric|primitive/i.test(p), p.slice(0, 30));

// 3D：四個階段、每一個部分都合法、每一個階段都有新東西、每一個部分都有說明和出處；示範對得上
{
  const lab = L.lab;
  assert.deepEqual(lab.stages.map((s) => s.key), STAGES);
  assert.equal(checkParts(lab.parts), null);
  for (const s of STAGES) { assert.ok(newAt(lab.parts, s).length >= 1, s); assert.ok(partsAt(lab.parts, s).length >= 4, s); }
  for (const p of lab.parts) for (const f of ['en', 'zh', 'what_en', 'what_zh', 'src', 'url']) assert.ok(p[f], `${p.key}.${f}`);
  for (const s of lab.stages) for (const f of ['en', 'zh', 'when_en', 'when_zh', 'text_en', 'text_zh', 'src', 'url']) assert.ok(s[f], `${s.key}.${f}`);
  const by = Object.fromEntries(lab.parts.map((p) => [p.key, p]));
  assert.deepEqual(by.timbertower.stages, ['motte']); assert.deepEqual(by.outerwall.stages, ['concentric']);
  assert.ok(by.keep.stages.includes('concentric') && !by.keep.stages.includes('motte'));
  assert.deepEqual(L.parts.map((p) => p.demo), lab.demos.map((d) => d.key));
  for (const d of lab.demos) { assert.ok(STAGES.includes(d.stage), d.key); if (d.part) assert.ok(by[d.part].stages.includes(d.stage), d.key); }
  // 每一個部分在 wh-castle.js 裡都畫得出來
  const js = readFileSync(new URL('../src/wh-castle.js', import.meta.url), 'utf8');
  for (const p of lab.parts) assert.ok(js.includes(`groups.${p.key}`), `drawn: ${p.key}`);
}
// 「泥土木頭，還是石頭？」
{
  const S = L.built, keys = S.buckets.map((b) => b.key);
  assert.deepEqual(keys, ['early', 'later']);
  for (const k of keys) assert.equal(S.items.filter((it) => it.answer === k).length, 4, k);
  const g = makeSort(S.items, keys);
  for (const it of S.items) { assert.ok(g.pick(it.answer).firstTry); assert.ok(g.next()); }
  assert.ok(g.state.done);
}
// 「這個字從哪裡來？」
{
  const T = L.terms, n = T.items.length;
  assert.equal(n, 10);
  for (const it of T.items) assert.ok(it.zh && it.en && it.orig && it.lang && it.note_en && it.note_zh, it.zh);
  assert.equal(new Set(T.items.map((it) => `${it.orig}|${it.en}`)).size, n);
  const by = Object.fromEntries(T.items.map((it) => [it.en, it]));
  assert.equal(by.castle.orig, 'castellum'); assert.equal(by.dungeon.orig, 'donjon'); assert.equal(by.knight.orig, 'cniht');
  for (let i = 0; i < n; i++) assert.ok(matchOptions(n, i).includes(i));
}
// 時間軸
{
  const T = L.timeline, sc = makeScale('log', T.from, T.to);
  const ago = (v) => (v && typeof v === 'object' ? yearToAgo(v.year) : v);
  const lanes = LANES.map((l) => l.key);
  for (const e of T.events) { assert.ok(lanes.includes(e.lane), e.en); const f = ago(e.from); assert.ok(sc.has(f), e.en); if (e.to) assert.ok(f > ago(e.to), e.en); }
  assert.ok(new Set(T.events.map((e) => e.lane)).size >= 3, 'more than Europe');
  assert.ok(T.view.from > T.lesson.from && T.view.to < T.lesson.to);
}
const L11 = data.units[2].lessons.find((l) => l.n === 11);
assert.ok(L11.links.some((x) => x.href === '/resources/classes/world-history/castle-life/'));
assert.ok(L.links[0].soon && /Gold and Salt/.test(L.links[0].en));
assert.equal(data.units[2].planned.length, 0);
console.log(`castlelife.test.mjs ok (${L.lab.stages.length} stages, ${L.lab.parts.length} parts, ${L.built.items.length} cards, ${L.terms.items.length} words)`);
