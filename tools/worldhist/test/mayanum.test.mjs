// 第十四課的馬雅數字（src/mayanum.js）。node test/mayanum.test.mjs
import assert from 'node:assert/strict';
import { digit, toMaya, levelValue, fromMaya, check, readOptions, mayaSvg, MAX } from '../src/mayanum.js';

// 一點 = 1、一橫 = 5、零有自己的符號；19 = 三橫四點
assert.deepEqual(digit(0), { zero: true, bars: 0, dots: 0 });
assert.deepEqual(digit(1), { zero: false, bars: 0, dots: 1 });
assert.deepEqual(digit(5), { zero: false, bars: 1, dots: 0 });
assert.deepEqual(digit(19), { zero: false, bars: 3, dots: 4 });
assert.throws(() => digit(20));
// 20 = 上面一點、下面一個零（Penn Museum 的例子）
assert.deepEqual(toMaya(20), [digit(1), digit(0)]);
assert.deepEqual(toMaya(105), [digit(5), digit(5)]);
assert.equal(toMaya(7).length, 1);
assert.throws(() => toMaya(MAX + 1));
// 來回都對：0–399
for (let n = 0; n <= MAX; n++) assert.equal(fromMaya(toMaya(n)), n, n);
// 一位最多四點、三橫；空的一位不合法
assert.equal(levelValue({ zero: false, bars: 0, dots: 5 }), null);
assert.equal(levelValue({ zero: false, bars: 4, dots: 0 }), null);
assert.equal(levelValue({ zero: false, bars: 0, dots: 0 }), null);
assert.equal(levelValue({ zero: true, bars: 1, dots: 0 }), null);
// 學生寫的：上面空著＝只有一位；下面空著要提醒寫零
const E = { zero: false, bars: 0, dots: 0 }, Z = { zero: true, bars: 0, dots: 0 };
assert.equal(check([E, { zero: false, bars: 2, dots: 2 }], 12), 'ok');
assert.equal(check([{ zero: false, bars: 0, dots: 2 }, Z], 40), 'ok');
assert.equal(check([{ zero: false, bars: 0, dots: 2 }, E], 40), 'need-zero');
assert.equal(check([E, E], 12), 'empty');
assert.equal(check([E, { zero: false, bars: 0, dots: 5 }], 5), 'too-many-dots');
assert.equal(check([E, { zero: false, bars: 4, dots: 0 }], 20), 'too-many-bars');
assert.equal(check([E, { zero: false, bars: 0, dots: 2 }], 40), 'wrong');
assert.equal(check([{ zero: false, bars: 1, dots: 0 }, { zero: false, bars: 1, dots: 0 }], 105), 'ok');
// 選項：四個、不重複、都在範圍內、包含答案、順序固定
for (const n of [0, 3, 7, 19, 20, 33, 100, 399]) {
  const o = readOptions(n);
  assert.equal(o.length, 4, n); assert.equal(new Set(o).size, 4, n); assert.ok(o.includes(n), n);
  for (const v of o) assert.ok(v >= 0 && v <= MAX, `${n}: ${v}`);
  assert.deepEqual(readOptions(n), o);
}
// SVG：點、橫、零各畫幾個
const svg = mayaSvg(toMaya(33));
assert.equal((svg.match(/<circle/g) || []).length, 1 + 3);
assert.equal((svg.match(/<rect x="\d/g) || []).length, 2);
assert.ok(mayaSvg(toMaya(20)).includes('mn-zero'));
assert.ok(mayaSvg([E, E]).includes('mn-empty'));
console.log('mayanum.test.mjs ok');
