import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { makeFitGame } from '../src/fit.js';

const qs = [{ answer: 'mercator' }, { answer: 'equal' }, { answer: 'polar' }];
const g = makeFitGame(qs);
assert.equal(g.total, 3);
assert.deepEqual(g.answer('equal'), { correct: false, first: false });
assert.equal(g.next(), false, 'cannot skip an unsolved question');
assert.deepEqual(g.answer('mercator'), { correct: true, first: false });
assert.equal(g.answer('mercator'), null, 'already solved');
assert.equal(g.state.first, 0);
assert.equal(g.next(), true);
assert.deepEqual(g.answer('equal'), { correct: true, first: true });
assert.equal(g.next(), true);
assert.deepEqual(g.answer('polar'), { correct: true, first: true });
assert.equal(g.next(), false);
assert.equal(g.state.done, true);
assert.equal(g.state.first, 2);
assert.equal(g.answer('polar'), null);
g.reset();
assert.equal(g.state.first, 0); assert.equal(g.state.i, 0); assert.equal(g.state.done, false);

// 頁面資料：八題，答案都是選項裡有的那四種，四種各出現兩次
const data = JSON.parse(readFileSync(new URL('../../../data/geography.json', import.meta.url), 'utf8'));
const lesson = data.units[0].lessons.find((l) => l.slug === 'flat-maps');
const fit = lesson.fit;
assert.equal(fit.questions.length, 8, 'eight questions');
const keys = fit.options.map((o) => o.key);
assert.deepEqual(keys.slice().sort(), ['equal', 'globe', 'mercator', 'polar']);
const count = {};
for (const q of fit.questions) { assert.ok(keys.includes(q.answer), `answer ${q.answer}`); count[q.answer] = (count[q.answer] || 0) + 1; assert.ok(q.en && q.zh && q.why_en && q.why_zh); }
assert.deepEqual(count, { mercator: 2, equal: 2, polar: 2, globe: 2 });
// 「地圖英語」：每課 8 句
assert.equal(lesson.map_english.items.length, 8);
console.log('fit.test ok');
