import assert from 'node:assert/strict';
import { BEAT_OPTIONS, SPLIT_ROWS, TIME_SIGS, VALUES, barBeats, canAdd, equalSplit, isFull, itemBeats, makeBeatQuestions, nameOf, remaining, scheduleBar, splitValueKey, sumBeats, valueOf } from '../src/values.js';
import { mulberry32 } from '../src/pitch.js';

const near = (a, b, eps = 1e-9, m = '') => assert.ok(Math.abs(a - b) <= eps, `${m} expected ${b}, got ${a}`);

// 時值一路對半分
assert.deepEqual(VALUES.map((v) => v.key), ['whole', 'half', 'quarter', 'eighth', 'sixteenth']);
assert.deepEqual(VALUES.map((v) => v.beats), [4, 2, 1, 0.5, 0.25]);
for (let i = 1; i < VALUES.length; i++) near(VALUES[i].beats * 2, VALUES[i - 1].beats);
assert.equal(valueOf('quarter').en, 'quarter note');
// 美式名稱，沒有英式
for (const v of VALUES) assert.ok(!/semibreve|minim|crotchet|quaver/i.test(v.en + v.rest_en));
// 空心與實心、符尾
assert.deepEqual(VALUES.map((v) => v.open), [true, true, false, false, false]);
assert.deepEqual(VALUES.map((v) => v.flags), [0, 0, 0, 1, 2]);
assert.deepEqual(VALUES.map((v) => v.stem), [false, true, true, true, true]);
// 一個全音符＝2 個二分＝4 個四分＝8 個八分＝16 個十六分
for (const v of VALUES) near((4 / v.beats) * v.beats, 4);
assert.deepEqual(SPLIT_ROWS.map(splitValueKey), ['whole', 'half', 'quarter', 'eighth', 'sixteenth']);
// 附點：×1.5
near(itemBeats({ v: 'half', dot: true }), 3); near(itemBeats({ v: 'quarter', dot: true }), 1.5); near(itemBeats({ v: 'eighth', dot: true }), 0.75);
// 休止符和同時值一樣長
near(itemBeats({ v: 'quarter', rest: true }), itemBeats({ v: 'quarter' }));
// 拍號與填滿
assert.deepEqual(TIME_SIGS, { '2/4': 2, '3/4': 3, '4/4': 4 });
{
  const bar = [{ v: 'half' }, { v: 'quarter' }];
  near(sumBeats(bar), 3); near(remaining(bar, '4/4'), 1); near(remaining(bar, '3/4'), 0);
  assert.ok(isFull(bar, '3/4')); assert.ok(!isFull(bar, '4/4'));
  assert.ok(canAdd(bar, { v: 'quarter' }, '4/4')); assert.ok(!canAdd(bar, { v: 'half' }, '4/4'));
  assert.ok(canAdd(bar, { v: 'eighth' }, '4/4')); assert.ok(!canAdd(bar, { v: 'eighth' }, '3/4'));
  // 附點二分＋四分＝4 拍
  assert.ok(isFull([{ v: 'half', dot: true }, { v: 'quarter' }], '4/4'));
  // 兩個八分＝一個四分
  assert.ok(isFull([{ v: 'quarter' }, { v: 'eighth' }, { v: 'eighth' }], '3/4') === false);
  assert.ok(isFull([{ v: 'quarter' }, { v: 'quarter' }, { v: 'eighth' }, { v: 'eighth' }], '3/4'));
  // 16 個十六分音符填滿 4/4（浮點數不誤判）
  assert.ok(isFull(Array.from({ length: 16 }, () => ({ v: 'sixteenth' })), '4/4'));
  assert.ok(isFull(Array.from({ length: 12 }, () => ({ v: 'sixteenth' })), '3/4'));
  assert.ok(isFull([{ v: 'eighth', dot: true }, { v: 'sixteenth' }, { v: 'half' }, { v: 'quarter' }], '4/4'), '0.75+0.25+2+1');
}
assert.equal(barBeats('3/4'), 3);
// 名稱
assert.deepEqual(nameOf({ v: 'half', dot: true }), { en: 'dotted half note', zh: '附點二分音符' });
assert.deepEqual(nameOf({ v: 'quarter', rest: true }), { en: 'quarter rest', zh: '四分休止符' });
// 排成時間：100 BPM、4/4：二分＋四分＋四分
{
  const ev = scheduleBar([{ v: 'half' }, { v: 'quarter' }, { v: 'quarter', rest: true }], 120);
  near(ev[0].time, 0); near(ev[0].dur, 1);            // 二分 2 拍 × 0.5 s
  near(ev[1].time, 1); near(ev[1].dur, 0.5);
  near(ev[2].time, 1.5); assert.equal(ev[2].rest, true); assert.equal(ev[2].midi, null);
  assert.equal(ev[0].midi, 60); assert.equal(ev[1].midi, 62, 'rests do not use up a pitch');
  const slow = scheduleBar([{ v: 'quarter' }, { v: 'quarter' }], 60);
  near(slow[1].time, 1);
  // 速度加倍，時間減半（時值是相對的）
  const a = scheduleBar([{ v: 'half' }, { v: 'quarter' }], 60), b = scheduleBar([{ v: 'half' }, { v: 'quarter' }], 120);
  near(a[1].time, 2 * b[1].time);
}
// 對半分
for (const n of SPLIT_ROWS) {
  const s = equalSplit(n, 60);
  assert.equal(s.length, n); near(s[n - 1].time + s[n - 1].dur, 4); near(s[0].dur, 4 / n);
}
near(equalSplit(8, 120)[7].time, 1.75);
// 題目
{
  const q = makeBeatQuestions(mulberry32(21), 8);
  assert.equal(q.length, 8);
  assert.ok(q.every((x) => BEAT_OPTIONS.includes(x.beats)));
  assert.equal(new Set(q.map((x) => JSON.stringify(x.it))).size, 8, 'no repeats');
  assert.deepEqual(makeBeatQuestions(mulberry32(21), 8), q);
}
console.log('values.test.mjs ok');
