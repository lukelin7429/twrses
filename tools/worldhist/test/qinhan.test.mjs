// 第七課的資料：3D 錢幣、統一的地圖、「秦朝還是漢朝？」、時間軸、固定的卡。node test/qinhan.test.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { regionState, makeSort } from '../src/spread.js';
import { inRing } from '../src/sphere.js';
import { unpack } from '../src/landcode.js';
import { LANES, makeScale, yearToAgo } from '../src/timeline.js';
import { outline, area, bbox, KINDS } from '../src/coins.js';

const data = JSON.parse(readFileSync(new URL('../../../data/world_history.json', import.meta.url), 'utf8'));
const raw = JSON.parse(readFileSync(new URL('../src/data/land.json', import.meta.url), 'utf8'));
const land = raw.polys.map((p) => p.map((s) => unpack(s, raw.q)));
const isLand = (pt) => land.some((r) => inRing(pt, r[0]) && !r.slice(1).some((h) => inRing(pt, h)));
const L = data.units[1].lessons.find((l) => l.slug === 'qin-han');
assert.ok(L); assert.equal(L.n, 7); assert.equal(L.lab.kind, 'coins');
assert.equal(L.paras.length, 6); assert.equal(L.paras_zh.length, 6); assert.equal(L.vocab.length, 8); assert.equal(L.quiz.length, 5);
assert.equal(L.myths.length, 4); assert.equal(L.tricks.length, 4); assert.equal(L.activities.length, 2); assert.equal(L.parts.length, 4);
assert.deepEqual(L.parts.map((p) => p.demo), ['before', 'knife', 'qin', 'han']);
for (const k of ['timeline', 'how_we_know', 'views', 'phrases', 'taiwan_then']) assert.ok(L[k], k);
assert.equal(L.phrases.rows.length, 8);
for (const q of L.views.items) { assert.ok(q.sides.length >= 2); for (const s of q.sides) assert.ok(s.src && s.url); assert.ok(q.note_en && q.note_zh); }
const all = JSON.stringify(L);
assert.ok(!all.includes('TODO'), 'no TODO left'); assert.ok(!all.includes('example.org'), 'no placeholder URL');

// 3D：每一種錢的外形都畫得出來；尺寸和說明裡的公釐數一致；秦國的錢就是半兩
{
  const lab = L.lab;
  for (const s of lab.states) { assert.ok(KINDS.includes(s.kind), s.key); const o = outline(s.kind, s.size); assert.ok(area(o.outer) > 0, s.key); for (const f of ['coin_en', 'coin_zh', 'note_en', 'note_zh']) assert.ok(s[f], `${s.key}.${f}`); }
  const by = Object.fromEntries(lab.states.map((s) => [s.key, s]));
  assert.equal(by.qi.size.len, 18.3); assert.ok(by.qi.note_en.includes('183 millimeters'));
  assert.equal(by.zhao.size.h, 5.6); assert.ok(by.zhao.note_en.includes('56 millimeters'));
  assert.equal(by.qin.kind, 'square'); assert.deepEqual(by.qin.size, lab.banliang.size);
  const [x0, , x1] = bbox(outline('square', lab.banliang.size).outer); assert.ok(Math.abs(x1 - x0 - 3.1) < 0.01);
  assert.ok(lab.numbers_note_en.includes('31 mm') && lab.numbers_note_en.includes('183 mm'));
  assert.ok(new Set(lab.states.map((s) => s.coin_en)).size >= 5, 'several kinds before unification');
}

// 地圖：七個都城都在陸地上；從 232 年開始只有秦亮；221 年全亮；滅國的順序對
{
  const C = L.conquest;
  for (const c of C.centers) {
    assert.ok(isLand(c.at), c.key);
    assert.ok(c.older >= c.nearer && c.older <= C.from && c.nearer >= C.to, c.key);
    for (const f of ['crops_en', 'crops_zh', 'when_en', 'when_zh', 'src', 'url']) assert.ok(c[f], `${c.key}.${f}`);
  }
  assert.deepEqual(C.centers.filter((c) => regionState(c, C.from) === 'yes').map((c) => c.key), ['qin']);
  assert.ok(C.centers.every((c) => regionState(c, C.to) === 'yes'));
  assert.deepEqual(C.centers.slice().sort((a, b) => b.older - a.older).map((c) => c.key), ['qin', 'han', 'zhao', 'wei', 'chu', 'yan', 'qi']);
  for (const c of C.centers.slice(1)) assert.ok(c.when_en.includes(`${c.older - 2000} BCE`), c.key);   // 小卡寫的年份和亮起來的年份一致
}

// 「秦朝還是漢朝？」：兩個籃子各四題，玩得完
{
  const S = L.qinhan, keys = S.buckets.map((b) => b.key);
  assert.deepEqual(keys, ['qin', 'han']);
  for (const k of keys) assert.equal(S.items.filter((it) => it.answer === k).length, 4, k);
  const g = makeSort(S.items, keys);
  for (const it of S.items) { assert.ok(g.pick(it.answer).firstTry); assert.ok(g.next()); }
  assert.ok(g.state.done);
}

// 時間軸：都在範圍內；秦朝很短、漢朝和羅馬帝國重疊
{
  const T = L.timeline, sc = makeScale('log', T.from, T.to);
  const ago = (v) => (v && typeof v === 'object' ? yearToAgo(v.year) : v);
  const lanes = LANES.map((l) => l.key);
  const evs = T.events.map((e) => ({ ...e, from: ago(e.from), to: e.to == null ? null : ago(e.to) }));
  for (const e of evs) { assert.ok(lanes.includes(e.lane), e.en); assert.ok(sc.has(e.from), e.en); if (e.to != null) assert.ok(e.from > e.to, e.en); }
  const qin = evs.find((e) => e.en === 'The Qin dynasty'), han = evs.find((e) => e.en === 'The Han dynasty'), rome = evs.find((e) => e.en.startsWith('The Roman Empire'));
  assert.ok(qin.from - qin.to < 20); assert.ok(han.from - han.to > 400);
  assert.ok(han.to < rome.from && han.from > rome.from, 'Han overlaps Rome');
  assert.ok(T.view.from > T.lesson.from && T.view.to < T.lesson.to);
}
// 連結：第六課連到這一課
const L6 = data.units[1].lessons.find((l) => l.n === 6);
assert.ok(L6.links.some((x) => x.href === '/resources/classes/world-history/qin-han/'));
assert.ok(!data.units[1].planned.some((p) => p.n === 7));
console.log(`qinhan.test.mjs ok (${L.lab.states.length} coins, ${L.conquest.centers.length} capitals, ${L.qinhan.items.length} cards)`);
