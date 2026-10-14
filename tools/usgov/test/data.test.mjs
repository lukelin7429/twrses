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

// 第二課：三個部門互相牽制
const k2 = lessons.find((l) => l.slug === 'checks-and-balances');
{
  const acts = k2.lab.actions, keys2 = acts.map((x) => x.key);
  assert.equal(new Set(keys2).size, keys2.length);
  const B3 = ['capitol', 'whitehouse', 'court'];
  for (const x of acts) {
    assert.ok(B3.includes(x.from) && B3.includes(x.to), x.key);
    assert.ok(x.btn_en && x.btn_zh && x.en && x.zh && x.text_en && x.text_zh && x.cite, x.key);
    for (const n of x.next || []) assert.ok(keys2.includes(n), `${x.key} → ${n}`);
    if (x.check) assert.notEqual(x.from, x.to);
  }
  const dirs = new Set(acts.filter((x) => x.check).map((x) => `${x.from}>${x.to}`));
  assert.equal(dirs.size, 6, 'every branch checks both of the others');
  for (const [name, chain] of Object.entries(k2.lab.demos)) for (const n of chain) assert.ok(keys2.includes(n), `demo ${name}: ${n}`);
  for (const pt of k2.parts) assert.ok(k2.lab.demos[pt.demo], `card demo ${pt.demo}`);
  const m2 = k2.match, mk = m2.options.map((o) => o.key);
  assert.deepEqual(mk, ['cp', 'cj', 'pc', 'pj', 'jc', 'jp']);
  assert.equal(m2.questions.length, 10);
  for (const k of mk) assert.ok(m2.questions.some((q) => q.answer === k), `direction ${k} is an answer at least once`);
  for (const q of m2.questions) assert.ok(mk.includes(q.answer) && q.why_en && q.why_zh && q.hint_en && q.hint_zh);
  const v = k2.veto;
  assert.deepEqual(v.bodies, { house: 435, senate: 100 });
  assert.deepEqual(v.acts.map((x) => x.key), ['sign', 'veto', 'wait']);
  for (const k of ['fail_congress', 'signed', 'unsigned_law', 'pocket', 'overridden', 'sustained']) assert.ok(v.results[k], k);
  for (const k of ['house', 'senate', 'both']) assert.ok(v.short[k]);
  assert.deepEqual(v.record.items.map((r) => r.n), [2599, 1066, 112]);
  assert.equal(2599 - 1066, 1533);
  assert.equal(Math.round((112 / 1533) * 100), 7);
}

// 第三課：聯邦制與五十州地圖
const k3 = lessons.find((l) => l.slug === 'federalism');
{
  const ABBR = Object.keys(k3.lab.population);
  assert.equal(ABBR.length, 51, '50 states and DC');
  assert.equal(Object.values(k3.lab.population).reduce((a, b) => a + b, 0), 331449281, '2020 resident population, 50 states and DC');
  for (const l of k3.lab.layers) {
    assert.deepEqual(Object.keys(l.values).sort(), ABBR.slice().sort(), `${l.key} has a value (or null) for every state and DC`);
    assert.ok(l.src.length && l.note_en && l.note_zh && l.btn_en && l.btn_zh);
    if (l.categories) for (const v of Object.values(l.values)) assert.ok(v === null || l.categories.some((c) => c.v === v));
    if (l.categories) for (const c of l.categories) assert.ok(!/^#(?:[c-f][0-9a-f])[0-4][0-9a-f][0-4][0-9a-f]$/i.test(c.color), 'no party red');
  }
  const seats = k3.lab.layers.find((l) => l.key === 'seats').values;
  assert.equal(Object.values(seats).filter((v) => v).reduce((a, b) => a + b, 0), 435);
  assert.equal(seats.DC, null);
  const yr = k3.lab.layers.find((l) => l.key === 'statehood').values;
  assert.equal(yr.DE, 1787); assert.equal(yr.HI, 1959); assert.equal(Object.values(yr).filter((v) => v).length, 50);
  const leg = k3.lab.layers.find((l) => l.key === 'legislature').values;
  assert.deepEqual(Object.entries(leg).filter(([, v]) => v === 'one').map(([k]) => k), ['NE']);
  assert.deepEqual(k3.fifty.layers.map((l) => l.key), k3.lab.layers.map((l) => l.key));
  const lv = new Set(k3.lab.powers.map((p) => p.level));
  assert.deepEqual([...lv].sort(), ['both', 'national', 'state']);
  for (const p of k3.lab.powers) assert.ok(p.btn_en && p.en && p.text_en && p.text_zh && p.cite);
  for (const [k, d] of Object.entries(k3.lab.demos)) for (const p of d.powers || []) assert.ok(k3.lab.powers.some((x) => x.key === p), `${k}: ${p}`);
  const m3 = k3.match;
  assert.deepEqual(m3.options.map((o) => o.key), ['national', 'state', 'both']);
  for (const o of m3.options) assert.ok(m3.questions.filter((q) => q.answer === o.key).length >= 3);
}
console.log('data.test ok');
