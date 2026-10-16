// 第五課的資料：3D 的四群人、「這個人能投票嗎？」遊戲、陶片放逐的兩種讀法、時間軸、固定的卡。node test/greeks.test.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { makeSort } from '../src/spread.js';
import { LANES, makeScale, yearToAgo } from '../src/timeline.js';
import { figures, ostracism, RULES } from '../src/assembly.js';

const data = JSON.parse(readFileSync(new URL('../../../data/world_history.json', import.meta.url), 'utf8'));
const L = data.units[1].lessons.find((l) => l.slug === 'greeks-start');
assert.ok(L); assert.equal(L.n, 5); assert.equal(L.lab.kind, 'assembly');
assert.equal(L.paras.length, 6); assert.equal(L.paras_zh.length, 6); assert.equal(L.vocab.length, 8); assert.equal(L.quiz.length, 5);
assert.equal(L.myths.length, 4); assert.equal(L.tricks.length, 4); assert.equal(L.activities.length, 2); assert.equal(L.parts.length, 4);
assert.deepEqual(L.parts.map((p) => p.demo), ['people', 'citizens', 'pnyx', 'vote']);
for (const k of ['timeline', 'how_we_know', 'views', 'phrases', 'taiwan_then']) assert.ok(L[k], k);
assert.equal(L.phrases.rows.length, 8);
for (const q of L.views.items) { assert.ok(q.sides.length >= 2); for (const s of q.sides) assert.ok(s.src && s.url); assert.ok(q.note_en && q.note_zh); }
assert.ok(!JSON.stringify(L).includes('TODO'), 'no TODO left');

// 3D：只有一群能投票、就是成年男性公民；每一群都寫了範圍；課文說「十個人裡一個多一點」要和數字對得上
{
  const lab = L.lab, voters = lab.groups.filter((g) => g.vote);
  assert.equal(voters.length, 1); assert.equal(voters[0].key, 'men');
  for (const g of lab.groups) for (const f of ['en', 'zh', 'short_en', 'short_zh', 'range_en', 'range_zh', 'color']) assert.ok(g[f], `${g.key}.${f}`);
  const all = lab.groups.reduce((s, g) => s + g.use, 0), share = voters[0].use / all;
  assert.ok(share > 0.1 && share < 0.15, `voters ${share}`);
  assert.ok(L.parts[1].text_en.includes('one person in ten'));
  assert.ok(L.paras[2].includes(`${(voters[0].use).toLocaleString('en-US')} citizen men`));
  assert.ok(L.paras[2].includes(`${((all - voters[0].use) / 1000).toFixed(0)},000 other people`));
  assert.equal(lab.seats, 6000);
  assert.ok(figures(lab.groups, lab.per).reduce((s, n) => s + n, 0) < 5000, 'not too many figures');
  assert.deepEqual(lab.modes.map((m) => m.key), ['people', 'citizens', 'pnyx', 'vote']);
}

// 「這個人能投票嗎？」：兩個籃子都有題目，玩得完
{
  const S = L.whovotes, keys = S.buckets.map((b) => b.key);
  assert.deepEqual(keys, ['yes', 'no']);
  for (const k of keys) assert.ok(S.items.filter((it) => it.answer === k).length >= 2, k);
  const g = makeSort(S.items, keys);
  for (const it of S.items) { assert.ok(g.pick(it.answer).firstTry); assert.ok(g.next()); }
  assert.ok(g.state.done);
}

// 陶片放逐：兩種讀法都有出處；第一個情境兩種讀法結果不同，第三個相同（說明文字要對得上）
{
  const O = L.ostraka;
  assert.deepEqual(O.rules.map((r) => r.key), RULES);
  for (const r of O.rules) assert.ok(r.src && r.url && !r.url.includes('example'));
  const start = Object.fromEntries(O.names.map((n) => [n.key, n.start]));
  assert.notEqual(ostracism(start, 'quorum', O.need).exiled, ostracism(start, 'against', O.need).exiled);
  const [s0, s1, s2] = O.scenarios.map((x) => x.votes);
  assert.notEqual(ostracism(s0, 'quorum').exiled, ostracism(s0, 'against').exiled);
  for (const r of RULES) assert.equal(ostracism(s1, r).exiled, null);
  for (const r of RULES) assert.equal(ostracism(s2, r).exiled, 'aristides');
  for (const k of ['too-few', 'tie', 'most', 'enough']) assert.ok(O.result[k]);
}

// 時間軸：都在範圍內、在對的線上；克里斯提尼與蘇格拉底受審是點；佛陀是「有爭論」
{
  const T = L.timeline, sc = makeScale('log', T.from, T.to);
  const ago = (v) => (v && typeof v === 'object' ? yearToAgo(v.year) : v);
  const lanes = LANES.map((l) => l.key);
  const evs = T.events.map((e) => ({ ...e, from: ago(e.from), to: e.to == null ? null : ago(e.to) }));
  for (const e of evs) { assert.ok(lanes.includes(e.lane), e.en); assert.ok(sc.has(e.from), e.en); if (e.to != null) assert.ok(e.from > e.to, e.en); }
  for (const k of ['Cleisthenes', 'trial of Socrates']) assert.equal(evs.find((e) => e.en.includes(k)).kind, 'anchor');
  assert.equal(evs.find((e) => e.en === 'The Buddha').kind, 'debated');
  assert.ok(T.view.from > T.lesson.from && T.view.to < T.lesson.to);
}
// 連結：第四課連到這一課；第二單元開始了
const L4 = data.units[0].lessons.find((l) => l.n === 4);
assert.ok(L4.links.some((x) => x.href === '/resources/classes/world-history/greeks-start/'));
assert.ok(!data.units[1].planned.some((p) => p.n === 5));
console.log(`greeks.test.mjs ok (${L.whovotes.items.length} people, ${L.lab.groups.length} groups)`);
