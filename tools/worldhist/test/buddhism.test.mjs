// 第八課的資料：佛教傳播的地球儀、「同一個詞，三種語言」、「傳說還是紀錄？」、時間軸、固定的卡。node test/buddhism.test.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { makeSort } from '../src/spread.js';
import { inRing } from '../src/sphere.js';
import { unpack } from '../src/landcode.js';
import { LANES, makeScale, yearToAgo } from '../src/timeline.js';
import { checkRoute, fmtYear, reached, matchOptions } from '../src/dharma.js';

const data = JSON.parse(readFileSync(new URL('../../../data/world_history.json', import.meta.url), 'utf8'));
const raw = JSON.parse(readFileSync(new URL('../src/data/land.json', import.meta.url), 'utf8'));
const land = raw.polys.map((p) => p.map((s) => unpack(s, raw.q)));
const isLand = (pt) => land.some((r) => inRing(pt, r[0]) && !r.slice(1).some((h) => inRing(pt, h)));
const L = data.units[1].lessons.find((l) => l.slug === 'buddhism-travels');
assert.ok(L); assert.equal(L.n, 8); assert.equal(L.lab.kind, 'dharma');
assert.equal(L.paras.length, 6); assert.equal(L.paras_zh.length, 6); assert.equal(L.vocab.length, 8); assert.equal(L.quiz.length, 5);
assert.equal(L.myths.length, 4); assert.equal(L.tricks.length, 4); assert.equal(L.activities.length, 2); assert.equal(L.parts.length, 4);
assert.deepEqual(L.parts.map((p) => p.demo), ['start', 'ashoka', 'south', 'north']);
for (const k of ['timeline', 'how_we_know', 'views', 'phrases', 'taiwan_then']) assert.ok(L[k], k);
assert.equal(L.phrases.rows.length, 8);
for (const q of L.views.items) { assert.ok(q.sides.length >= 2); for (const s of q.sides) assert.ok(s.src && s.url); assert.ok(q.note_en && q.note_zh); }
const all = JSON.stringify(L);
assert.ok(!all.includes('TODO'), 'no TODO left'); assert.ok(!all.includes('example.org'), 'no placeholder URL');

// 地球儀：每個地方都在陸地上、有 tag 和出處；路線的年代不倒退、和地方一致；最早出現的是傳統說法的地方
{
  const lab = L.lab, keys = new Set(lab.sites.map((s) => s.key));
  assert.equal(keys.size, lab.sites.length, 'unique keys');
  for (const s of lab.sites) {
    assert.ok(isLand(s.at), `${s.key} on land`);
    assert.ok(['tradition', 'evidence'].includes(s.tag), s.key);
    assert.ok(s.year >= lab.from && s.year <= lab.to, s.key);
    for (const f of ['what_en', 'what_zh', 'when_en', 'when_zh', 'how_en', 'how_zh', 'src', 'url', 'short_en', 'short_zh']) assert.ok(s[f], `${s.key}.${f}`);
  }
  for (const r of lab.routes) {
    assert.equal(checkRoute(r, lab.sites), null, r.key);
    for (const w of r.pts) { const k = w.find((x) => typeof x === 'string' && x !== 'sea'); if (k) assert.ok(keys.has(k), `${r.key}: ${k}`); }
  }
  const first = lab.sites.slice().sort((a, b) => a.year - b.year)[0];
  assert.equal(first.tag, 'tradition');
  assert.deepEqual(reached(lab.sites, -300).map((s) => s.key).sort(), ['bodhgaya', 'sarnath']);
  // 卡片上寫的年份和亮起來的年份一致（大約的年代除外）
  const exact = ['pengcheng', 'luoyang', 'dunhuang', 'changan', 'goguryeo', 'baekje', 'asuka', 'palembang'];
  for (const k of exact) { const s = lab.sites.find((x) => x.key === k); assert.ok(s.when_en.includes(String(s.year)), k); }
  const by = Object.fromEntries(lab.sites.map((s) => [s.key, s]));
  for (const k of ['goguryeo', 'baekje', 'silla', 'asuka', 'anuradhapura', 'bodhgaya', 'dunhuang']) assert.equal(by[k].tag, 'tradition', k);
  for (const k of ['lumbini', 'pengcheng', 'gandhara', 'luoyang']) assert.equal(by[k].tag, 'evidence', k);
  assert.equal(fmtYear(by.lumbini.year).en, '249 BCE');
  for (const d of ['start', 'ashoka', 'south', 'north']) assert.ok(L.parts.some((p) => p.demo === d));
}

// 「同一個詞，三種語言」：每個詞都有中文、巴利文或梵文、英文；選項都分得出來
{
  const T = L.terms, n = T.items.length;
  assert.ok(n >= 8);
  for (const it of T.items) { assert.ok(it.zh && it.en && it.note_en && it.note_zh, it.zh); assert.ok(it.pali || it.skt, it.zh); }
  assert.equal(new Set(T.items.map((it) => `${it.pali}|${it.skt}|${it.en}`)).size, n, 'options distinguishable');
  const by = Object.fromEntries(T.items.map((it) => [it.zh, it]));
  assert.equal(by['涅槃'].pali, 'nibbāna'); assert.equal(by['涅槃'].skt, 'nirvāṇa');
  assert.equal(by['僧伽'].pali, 'saṅgha'); assert.equal(by['無我'].pali, 'anattā'); assert.equal(by['苦'].skt, 'duḥkha');
  for (let i = 0; i < n; i++) assert.ok(matchOptions(n, i).includes(i));
}

// 「傳說還是紀錄？」：兩個籃子各四題，玩得完
{
  const S = L.legend, keys = S.buckets.map((b) => b.key);
  assert.deepEqual(keys, ['tradition', 'evidence']);
  for (const k of keys) assert.equal(S.items.filter((it) => it.answer === k).length, 4, k);
  const g = makeSort(S.items, keys);
  for (const it of S.items) { assert.ok(g.pick(it.answer).firstTry); assert.ok(g.next()); }
  assert.ok(g.state.done);
}

// 時間軸：都在範圍內；佛教傳到中國時漢朝和羅馬都在
{
  const T = L.timeline, sc = makeScale('log', T.from, T.to);
  const ago = (v) => (v && typeof v === 'object' ? yearToAgo(v.year) : v);
  const lanes = LANES.map((l) => l.key);
  const evs = T.events.map((e) => ({ ...e, from: ago(e.from), to: e.to == null ? null : ago(e.to) }));
  for (const e of evs) { assert.ok(lanes.includes(e.lane), e.en); assert.ok(sc.has(e.from), e.en); if (e.to != null) assert.ok(e.from > e.to, e.en); }
  const han = evs.find((e) => e.en === 'The Han dynasty'), rome = evs.find((e) => e.en.startsWith('The Roman Empire')), ying = evs.find((e) => e.from === yearToAgo(65));
  assert.ok(ying && han.from > ying.from && han.to < ying.from && rome.from > ying.from && rome.to < ying.from);
  assert.ok(T.view.from > T.lesson.from && T.view.to < T.lesson.to);
}
// 連結：第七課連到這一課；單元二已經沒有製作中的課
const L7 = data.units[1].lessons.find((l) => l.n === 7);
assert.ok(L7.links.some((x) => x.href === '/resources/classes/world-history/buddhism-travels/'));
assert.equal(data.units[1].planned.length, 0);
console.log(`buddhism.test.mjs ok (${L.lab.sites.length} places, ${L.lab.routes.length} routes, ${L.terms.items.length} terms, ${L.legend.items.length} cards)`);
