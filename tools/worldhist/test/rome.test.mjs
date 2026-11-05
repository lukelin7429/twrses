// 第六課的資料：3D 石拱、帝國地圖、「比羅馬還早，還是羅馬人的點子？」、時間軸、固定的卡。node test/rome.test.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { regionState, makeSort } from '../src/spread.js';
import { inRing } from '../src/sphere.js';
import { unpack } from '../src/landcode.js';
import { LANES, makeScale, yearToAgo } from '../src/timeline.js';
import { stands, keystoneIndex } from '../src/arch.js';

const data = JSON.parse(readFileSync(new URL('../../../data/world_history.json', import.meta.url), 'utf8'));
const raw = JSON.parse(readFileSync(new URL('../src/data/land.json', import.meta.url), 'utf8'));
const land = raw.polys.map((p) => p.map((s) => unpack(s, raw.q)));
const isLand = (pt) => land.some((r) => inRing(pt, r[0]) && !r.slice(1).some((h) => inRing(pt, h)));
const L = data.units[1].lessons.find((l) => l.slug === 'rome-empire');
assert.ok(L); assert.equal(L.n, 6); assert.equal(L.lab.kind, 'arch');
assert.equal(L.paras.length, 6); assert.equal(L.paras_zh.length, 6); assert.equal(L.vocab.length, 8); assert.equal(L.quiz.length, 5);
assert.equal(L.myths.length, 4); assert.equal(L.tricks.length, 4); assert.equal(L.activities.length, 2); assert.equal(L.parts.length, 4);
assert.deepEqual(L.parts.map((p) => p.demo), ['build', 'remove', 'nokey', 'thin']);
for (const k of ['timeline', 'how_we_know', 'views', 'phrases', 'taiwan_then']) assert.ok(L[k], k);
assert.equal(L.phrases.rows.length, 8);
for (const q of L.views.items) { assert.ok(q.sides.length >= 2); for (const s of q.sides) assert.ok(s.src && s.url); assert.ok(q.note_en && q.note_zh); }
assert.ok(!JSON.stringify(L).includes('TODO'), 'no TODO left');
assert.ok(!JSON.stringify(L).includes('example.org'), 'no placeholder URL');

// 3D：預設的拱撐得住、最薄的會塌；課文和模型說的最小比例一致
{
  const lab = L.lab, base = { n: lab.n, R: lab.R, minRatio: lab.min_ratio, placed: lab.n, centering: false };
  keystoneIndex(lab.n);
  assert.ok(stands({ ...base, t: lab.t }), 'default arch stands');
  assert.ok(!stands({ ...base, t: lab.t_min }), 'thinnest arch falls');
  assert.ok(stands({ ...base, t: lab.t_max }));
  assert.ok(!stands({ ...base, placed: lab.n - 1, t: lab.t }), 'missing keystone falls');
  assert.equal(lab.min_ratio, 0.1075);
  assert.ok(lab.numbers_note_en.includes('0.1075') && lab.numbers_note_zh.includes('0.1075'));
  assert.ok(L.parts[3].text_en.includes('0.11'));
  for (const k of ['centering', 'missing', 'thin', 'ok']) for (const f of ['en', 'zh', 'short_en', 'short_zh']) assert.ok(lab.status[k][f], `${k}.${f}`);
}

// 地圖：都在陸地上、一開始都還沒亮、最後全亮、義大利最早
{
  const C = L.empire;
  for (const c of C.centers) {
    assert.ok(isLand(c.at), c.key);
    assert.ok(c.older >= c.nearer && c.older <= C.from && c.nearer >= C.to, c.key);
    for (const f of ['crops_en', 'crops_zh', 'when_en', 'when_zh', 'src', 'url']) assert.ok(c[f], `${c.key}.${f}`);
  }
  assert.equal(C.centers.filter((c) => regionState(c, C.from) === 'yes').length, 0);
  assert.ok(C.centers.every((c) => regionState(c, C.to) === 'yes'));
  assert.equal(C.centers.slice().sort((a, b) => b.older - a.older)[0].key, 'italy');
}

// 「比羅馬還早，還是羅馬人的點子？」：兩個籃子都有題目，玩得完
{
  const S = L.borrowed, keys = S.buckets.map((b) => b.key);
  assert.deepEqual(keys, ['older', 'roman']);
  for (const k of keys) assert.ok(S.items.filter((it) => it.answer === k).length >= 3, k);
  const g = makeSort(S.items, keys);
  for (const it of S.items) { assert.ok(g.pick(it.answer).firstTry); assert.ok(g.next()); }
  assert.ok(g.state.done);
  assert.equal(S.items.find((it) => it.en === 'The stone arch').answer, 'older');
}

// 時間軸：都在範圍內、在對的線上；漢朝和羅馬帝國有重疊
{
  const T = L.timeline, sc = makeScale('log', T.from, T.to);
  const ago = (v) => (v && typeof v === 'object' ? yearToAgo(v.year) : v);
  const lanes = LANES.map((l) => l.key);
  const evs = T.events.map((e) => ({ ...e, from: ago(e.from), to: e.to == null ? null : ago(e.to) }));
  for (const e of evs) { assert.ok(lanes.includes(e.lane), e.en); assert.ok(sc.has(e.from), e.en); if (e.to != null) assert.ok(e.from > e.to, e.en); }
  const han = evs.find((e) => e.en.startsWith('The Han')), emp = evs.find((e) => e.en === 'The Roman Empire begins');
  assert.ok(han.from > emp.from && han.to < emp.from, 'Han overlaps the start of the empire');
  assert.ok(T.view.from > T.lesson.from && T.view.to < T.lesson.to);
}
// 連結：第五課連到這一課
const L5 = data.units[1].lessons.find((l) => l.n === 5);
assert.ok(L5.links.some((x) => x.href === '/resources/classes/world-history/rome-empire/'));
assert.ok(!data.units[1].planned.some((p) => p.n === 6));
console.log(`rome.test.mjs ok (${L.empire.centers.length} regions, ${L.borrowed.items.length} cards)`);
