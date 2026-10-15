// 第四課的資料：河邊城市地圖、「河帶來了什麼」遊戲、四種坡道假說、時間軸、固定的卡。node test/rivers.test.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { regionState, makeSort } from '../src/spread.js';
import { inRing } from '../src/sphere.js';
import { unpack } from '../src/landcode.js';
import { LANES, makeScale, yearToAgo } from '../src/timeline.js';
import { KINDS, builtFraction } from '../src/pyramid.js';

const data = JSON.parse(readFileSync(new URL('../../../data/world_history.json', import.meta.url), 'utf8'));
const raw = JSON.parse(readFileSync(new URL('../src/data/land.json', import.meta.url), 'utf8'));
const land = raw.polys.map((p) => p.map((s) => unpack(s, raw.q)));
const isLand = (pt) => land.some((r) => inRing(pt, r[0]) && !r.slice(1).some((h) => inRing(pt, h)));
const L = data.units[0].lessons.find((l) => l.slug === 'cities-by-rivers');
assert.ok(L); assert.equal(L.n, 4); assert.equal(L.lab.kind, 'pyramid');
assert.equal(L.paras.length, 6); assert.equal(L.paras_zh.length, 6); assert.equal(L.vocab.length, 8); assert.equal(L.quiz.length, 5);
assert.equal(L.myths.length, 4); assert.equal(L.tricks.length, 4); assert.equal(L.activities.length, 2); assert.equal(L.parts.length, 4);
assert.deepEqual(L.parts.map((p) => p.demo), ['half', 'straight', 'spiral', 'finished']);
for (const k of ['timeline', 'how_we_know', 'views', 'phrases', 'taiwan_then']) assert.ok(L[k], k);
assert.equal(L.phrases.rows.length, 8);
for (const q of L.views.items) { assert.ok(q.sides.length >= 2); for (const s of q.sides) assert.ok(s.src && s.url); assert.ok(q.note_en && q.note_zh); }

// 3D：四種想法剛好對上 pyramid.js 的四種坡道，每一種都有支持、難題和出處；「一半高度」的卡和公式說的一樣
{
  const lab = L.lab;
  assert.deepEqual(lab.ideas.map((i) => i.key), KINDS);
  for (const i of lab.ideas) for (const f of ['en', 'zh', 'what_en', 'what_zh', 'for_en', 'for_zh', 'against_en', 'against_zh', 'src', 'url']) assert.ok(i[f], `${i.key}.${f}`);
  assert.equal(Math.round(builtFraction(0.5) * 100), 88);
  assert.ok(L.parts[0].text_en.includes('88 percent'));
  assert.ok(lab.numbers_note_en.includes('1 in 10'));
}

// 地圖：地方都在陸地上；一開始什麼都沒亮；烏魯克最早；最後全部都亮；不只「四大」
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
assert.ok(C.centers.length > 4 && ['yangtze', 'andes'].every((k) => C.centers.some((c) => c.key === k)));

// 「河帶來了什麼？」：三個籃子都有題目，而且玩得完
{
  const S = L.needs, keys = S.buckets.map((b) => b.key);
  assert.deepEqual(keys, ['food', 'travel', 'trouble']);
  for (const k of keys) assert.ok(S.items.filter((it) => it.answer === k).length >= 2, k);
  const g = makeSort(S.items, keys);
  for (const it of S.items) { assert.ok(g.pick(it.answer).firstTry); assert.ok(g.next()); }
  assert.ok(g.state.done);
}

// 時間軸：都在範圍內、在對的線上；烏魯克最左邊；大金字塔是一個點
{
  const T = L.timeline, sc = makeScale('log', T.from, T.to);
  const ago = (v) => (v && typeof v === 'object' ? yearToAgo(v.year) : v);
  const lanes = LANES.map((l) => l.key);
  const evs = T.events.map((e) => ({ ...e, from: ago(e.from), to: e.to == null ? null : ago(e.to) }));
  for (const e of evs) { assert.ok(lanes.includes(e.lane), e.en); assert.ok(sc.has(e.from), e.en); if (e.to != null) assert.ok(e.from > e.to, e.en); }
  assert.equal(evs.slice().sort((a, b) => b.from - a.from)[0].en, 'The Uruk period, Mesopotamia');
  const gp = evs.find((e) => e.en.includes('Great Pyramid')); assert.ok(gp && gp.kind === 'anchor' && gp.to == null);
  assert.ok(T.view.from > T.lesson.from && T.view.to < T.lesson.to);
}
// 連結：第三課連到這一課；這一課連到地球與天氣的河流單元；第一單元已經沒有「即將推出」
const L3 = data.units[0].lessons.find((l) => l.n === 3);
assert.ok(L3.links.some((x) => x.href === '/resources/classes/world-history/cities-by-rivers/'));
assert.ok(L.links.some((x) => x.href === '/resources/classes/earth/rivers-shape-the-land/'));
assert.equal(data.units[0].planned.length, 0);
console.log(`rivers.test.mjs ok (${C.centers.length} places, ${L.needs.items.length} cards, ${L.lab.ideas.length} ideas)`);
