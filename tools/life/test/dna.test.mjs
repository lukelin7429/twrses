import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { LETTERS, PAIR, START, partner, next, change, diff, copy, opened, holding, clean, combos } from '../src/dnacalc.js';

for (const c of LETTERS) assert.equal(PAIR[PAIR[c]], c);
assert.equal(PAIR.A, 'T'); assert.equal(PAIR.C, 'G');
assert.equal(START.length, 12); assert.equal(clean(START), START);
assert.equal(partner('ATCG'), 'TAGC'); assert.equal(partner(partner(START)), START);
// 複製出來的兩份讀起來一樣：第一份 舊=原來那股、新=它的搭檔；第二份 舊=搭檔、新=原來那股
const [a, b] = copy(START);
assert.equal(a.old, START); assert.equal(a.fresh, partner(START)); assert.equal(b.old, partner(START)); assert.equal(b.fresh, START);
assert.equal(next('A'), 'T'); assert.equal(next('G'), 'A');
const ch = change(START, 5); assert.equal(diff(ch, START), 1); assert.equal(ch.length, 12); assert.equal(copy(ch)[1].fresh, ch);
let s = START; for (let i = 0; i < 4; i++) s = change(s, 3); assert.equal(s, START);
assert.equal(opened(0, 12), 0); assert.equal(opened(50, 12), 6); assert.equal(opened(100, 12), 12); assert.equal(opened(140, 12), 12);
assert.equal(holding(0, false), 'closed'); assert.equal(holding(0, true), 'changed'); assert.equal(holding(40, true), 'opening');
assert.equal(holding(100, false), 'done'); assert.equal(holding(100, true), 'donechanged');
assert.equal(clean('at-cg xyz AAT'), 'ATCGAAT'); assert.equal(clean('AAAAAAAAAAAAAAAAAA').length, 12);
assert.equal(combos(1), 4); assert.equal(combos(3), 64); assert.equal(combos(12), 16777216);
const dp = new URL('../../../data/life.json', import.meta.url);
const data = existsSync(dp) ? JSON.parse(readFileSync(dp, 'utf8')) : null;
const lesson = data && data.units.flatMap((u) => u.lessons).find((l) => l.slug === 'what-is-dna');
if (lesson) assert.deepEqual(Object.keys(lesson.lab.msgs).sort(), ['changed', 'closed', 'done', 'donechanged', 'opening']);
console.log('dna.test: all passed', lesson ? 'data ok' : 'no data yet');
