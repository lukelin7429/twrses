// 頁面資料 data/us_government.json 的檢查：課數、每課固定的卡、配對題、時間軸事件與修憲門檻用到的數字。
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseDate, sortEvents, countAt } from '../src/timeline.js';
import { gates, need } from '../src/amend.js';

const data = JSON.parse(readFileSync(new URL('../../../data/us_government.json', import.meta.url), 'utf8'));
const lessons = data.units.flatMap((u) => u.lessons), planned = data.units.flatMap((u) => u.planned || []);
assert.equal(data.units.length, 6, 'six units');
assert.equal(lessons.length + planned.length, 24, 'twenty-four lessons in all');
assert.deepEqual([...lessons, ...planned].map((l) => l.n).sort((a, b) => a - b), Array.from({ length: 24 }, (_, i) => i + 1));
assert.ok(data.level_en && data.level_zh && data.rules.items.length >= 6);

for (const l of lessons) {
  assert.equal(l.paras.length, l.paras_zh.length, `${l.slug}: every paragraph has a translation`);
  assert.ok(l.paras.length >= 7 && l.paras.length <= 9, `${l.slug}: about eight paragraphs`);
  for (const p of l.paras) { const w = p.split(/\s+/).length; assert.ok(w >= 80 && w <= 135, `${l.slug}: paragraph of ${w} words`); }
  assert.equal(l.vocab.length, 12, `${l.slug}: twelve words`);
  assert.equal(l.quiz.length, 5); assert.equal(l.questions.length, 3); assert.equal(l.answers.length, 3);
  for (const q of l.quiz) { assert.equal(q.options.length, 4); assert.ok(q.correct >= 0 && q.correct < 4); }
  assert.equal(l.myths.length, 4); assert.equal(l.activities.length, 2);
  // 每課固定的五張卡
  for (const k of ['clause', 'primary', 'debate', 'taiwan', 'news_english']) assert.ok(l[k], `${l.slug}: has ${k}`);
  assert.equal(l.news_english.items.length, 8, `${l.slug}: eight News English terms`);
  for (const d of l.primary.docs) { assert.equal(d.questions.length, 3); assert.ok(d.gloss.length >= 3 && d.text.length === d.text_zh.length && d.src.length); }
  assert.equal(l.debate.sides.length, 2);
  for (const s of l.debate.sides) assert.ok(s.points.length >= 3 && s.src.length, 'each side has at least three points and a source');
  assert.equal(l.debate.sides[0].points.length, l.debate.sides[1].points.length, 'the two sides get the same number of points');
  for (const c of l.clause.items) assert.ok(c.text && c.zh && c.src.length);
  for (const s of l.sources) assert.ok(/^https:\/\//.test(s.url), s.url);
}

// 第一課
const c = lessons.find((l) => l.slug === 'constitution');
assert.equal(c.primary.docs[0].text[0], 'We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America.');
const m = c.match;
assert.equal(m.questions.length, 10, 'ten things to place');
const keys = m.options.map((o) => o.key);
assert.deepEqual(keys, ['a1', 'a2', 'a3', 'a4', 'a5', 'a6']);
for (const q of m.questions) { assert.ok(keys.includes(q.answer)); assert.ok(q.en && q.zh && q.why_en && q.why_zh && q.hint_en && q.hint_zh); }
assert.deepEqual(keys.map((k) => m.questions.filter((q) => q.answer === k).length), [4, 2, 1, 1, 1, 1], 'every article is an answer at least once');

const lab = c.lab;
assert.deepEqual(lab.articles.map((a) => a.key), ['pre', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'am']);
const ev = sortEvents(lab.events.map((e) => ({ ...e, t: parseDate(e.date) })));
assert.deepEqual(ev.map((e) => e.id), ['declaration', 'articles_adopted', 'articles_force', 'convention_open', 'signed', 'delaware', 'ninth', 'government', 'congress_meets', 'president_sworn', 'proposed12', 'court_sits', 'ri', 'bor']);
for (const id of ['declaration', 'articles_force', 'signed', 'ninth', 'government', 'proposed12', 'bor']) assert.ok(lab.events.some((e) => e.id === id), `the model needs event ${id}`);
assert.deepEqual(lab.branches, { a1: '1789-04-06', a2: '1789-04-30', a3: '1790-02-02' }, 'when each branch began to work (National Archives Q&A)');
assert.equal(lab.states.length, 13);
const st = lab.states.map((s) => ({ ...s, t: parseDate(s.date) }));
assert.deepEqual(st.slice().sort((a, b) => a.t - b.t).map((s) => s.order), Array.from({ length: 13 }, (_, i) => i + 1), 'order matches the dates');
const at = (d) => countAt(st, parseDate(d));
assert.equal(at('1787-12-06'), 0); assert.equal(at('1787-12-31'), 3); assert.equal(at('1788-06-20'), 8); assert.equal(at('1788-06-21'), 9);
assert.equal(at('1789-03-04'), 11, 'eleven states were in when the government began'); assert.equal(at('1790-05-29'), 13);
const am = lab.amendments.map((a) => ({ ...a, t: parseDate(a.date) }));
assert.deepEqual(am.map((a) => a.n), Array.from({ length: 27 }, (_, i) => i + 1));
const amAt = (d) => countAt(am, parseDate(d));
assert.equal(amAt('1791-12-14'), 0); assert.equal(amAt('1791-12-15'), 10); assert.equal(amAt('1870-12-31'), 15); assert.equal(amAt('1933-12-05'), 21);
assert.equal(amAt('1992-05-06'), 26); assert.equal(amAt('2026-10-01'), 27);
for (const a of am.filter((x) => x.n > 10)) assert.ok(a.en && a.zh);
for (const p of lab.presets) assert.ok(p.a >= lab.min && p.b <= lab.max && p.a < p.b);

const a = c.amend;
assert.deepEqual(a.bodies, { house: 435, senate: 100, states: 50 });
for (const p of a.propose) for (const r of a.ratify) {
  assert.ok(a.used[`${p.key}+${r.key}`], `used text for ${p.key}+${r.key}`);
  for (const g of gates(p.key, r.key, a.bodies)) assert.ok(a.gates[g.key], `gate text for ${g.key}`);
}
for (const k of ['ratified', 'proposed', 'ordinary', 'fails']) assert.ok(a.results[k]);
assert.equal(need(a.bodies.states, 3, 4), 38);
assert.deepEqual(a.record.items.map((r) => r.n), [11985, 33, 27]);
assert.equal(Math.round(11985 / 27), 444);
console.log('data.test ok');
