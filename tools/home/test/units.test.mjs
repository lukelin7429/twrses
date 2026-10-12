// 單位換算與分數：數字寫死，改了 units.js 這裡要跟著對得上。
import assert from 'node:assert/strict';
import {
  ML, LABEL_ML, G, toMl, fromMl, toGrams, fromGrams, fToC, cToF, cupsToGrams, round,
  frac, fmul, fadd, fnum, parseAmount, formatMixed, scaleAmount, kitchenParts, formatParts, formatAmount, sayAmount,
} from '../src/units.js';

const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) <= eps, `${a} ≠ ${b}`);

// 美制 → 毫升
near(ML.cup, 236.5882365);
near(ML.floz, 29.5735295625);
near(ML.tbsp, 14.78676478125);
near(ML.tsp, 4.92892159375);
near(toMl(1, 'cup'), 236.5882365);
near(toMl(2, 'tbsp'), 29.5735295625);          // 2 湯匙 = 1 液量盎司
near(toMl(3, 'tsp'), ML.tbsp);                 // 3 茶匙 = 1 湯匙
near(toMl(16, 'tbsp'), ML.cup);                // 16 湯匙 = 1 杯
near(toMl(8, 'floz'), ML.cup);                 // 8 液量盎司 = 1 杯
near(toMl(48, 'tsp'), ML.cup);
// 毫升 → 美制
near(fromMl(236.5882365, 'cup'), 1);
near(fromMl(250, 'cup'), 1.0566882094, 1e-9);  // 公制杯比美制杯大一點
near(fromMl(15, 'tbsp'), 1.0144206811, 1e-9);
near(fromMl(5, 'tsp'), 1.0144206811, 1e-9);
near(fromMl(100, 'floz'), 3.3814022702, 1e-9);
// 營養標示用的整數
assert.deepEqual({ ...LABEL_ML }, { cup: 240, floz: 30, tbsp: 15, tsp: 5 });
near(toMl(1, 'cup', LABEL_ML), 240);
near(fromMl(240, 'cup', LABEL_ML), 1);
assert.throws(() => toMl(1, 'pint'));

// 盎司、磅 ↔ 公克
near(G.oz, 28.349523125);
near(G.lb, 453.59237);
near(toGrams(16, 'oz'), 453.59237);
near(toGrams(1, 'lb'), 453.59237);
near(fromGrams(100, 'oz'), 3.527396195, 1e-9);
near(fromGrams(1000, 'lb'), 2.2046226218, 1e-9);
near(fromGrams(28.349523125, 'oz'), 1);

// 華氏 ↔ 攝氏
near(fToC(32), 0);
near(fToC(212), 100);
near(fToC(350), 176.66666666666666, 1e-9);
near(fToC(400), 204.44444444444446, 1e-9);
near(fToC(-40), -40);
near(cToF(0), 32);
near(cToF(100), 212);
near(cToF(180), 356);
assert.equal(round(fToC(350)), 177);
assert.equal(round(fToC(350), 5), 175);

// 體積 → 重量
near(cupsToGrams(1, 120), 120);
near(cupsToGrams(0.75, 120), 90);
near(cupsToGrams(1.5, 89), 133.5);

// 分數
assert.deepEqual(frac(6, 8), { n: 3, d: 4 });
assert.deepEqual(frac(3, -6), { n: -1, d: 2 });
assert.deepEqual(fadd(frac(1, 2), frac(1, 3)), { n: 5, d: 6 });
assert.deepEqual(fmul(frac(3, 4), frac(2)), { n: 3, d: 2 });
near(fnum(frac(3, 8)), 0.375);
assert.throws(() => frac(1, 0));
assert.deepEqual(parseAmount('1 1/2'), { n: 3, d: 2 });
assert.deepEqual(parseAmount('3/4'), { n: 3, d: 4 });
assert.deepEqual(parseAmount('2'), { n: 2, d: 1 });
assert.deepEqual(parseAmount('1½'), { n: 3, d: 2 });
assert.deepEqual(parseAmount('¾'), { n: 3, d: 4 });
assert.throws(() => parseAmount('a pinch'));
assert.equal(formatMixed(frac(3, 2)), '1 1/2');
assert.equal(formatMixed(frac(3, 4)), '3/4');
assert.equal(formatMixed(frac(4, 2)), '2');
assert.equal(formatMixed(frac(8, 3)), '2 2/3');

// 食譜放大縮小
const twice = (s) => formatMixed(scaleAmount(parseAmount(s), 2));
const half = (s) => formatMixed(scaleAmount(parseAmount(s), frac(1, 2)));
assert.equal(twice('3/4'), '1 1/2');           // 3/4 杯的兩倍是 1 1/2 杯
assert.equal(twice('1 1/2'), '3');
assert.equal(twice('1/3'), '2/3');
assert.equal(twice('2/3'), '1 1/3');
assert.equal(twice('1/2'), '1');
assert.equal(half('1 1/2'), '3/4');
assert.equal(half('3/4'), '3/8');
assert.equal(half('1'), '1/2');
assert.equal(half('1/3'), '1/6');
assert.equal(formatMixed(scaleAmount(parseAmount('1/3'), frac(3, 2))), '1/2');
assert.equal(formatMixed(scaleAmount(parseAmount('1 1/2'), frac(3, 2))), '2 1/4');

// 換成量得出來的寫法
const kp = (s, unit, f) => formatParts(kitchenParts(scaleAmount(parseAmount(s), f), unit));
assert.equal(kp('2', 'tbsp', 2), '1/4 cup');                       // 4 湯匙 = 1/4 杯
assert.equal(kp('2', 'tbsp', frac(1, 2)), '1 tbsp');
assert.equal(kp('1', 'tbsp', frac(1, 2)), '1 1/2 tsp');            // 半湯匙 = 1 1/2 茶匙
assert.equal(kp('1', 'tbsp', 2), '2 tbsp');
assert.equal(kp('1/3', 'cup', frac(1, 2)), '2 tbsp + 2 tsp');      // 1/6 杯量不出來
assert.equal(kp('1/3', 'cup', 2), '2/3 cup');
assert.equal(kp('1/4', 'cup', frac(1, 2)), '2 tbsp');
assert.equal(kp('1 1/2', 'cup', frac(1, 2)), '3/4 cup');
assert.equal(kp('1 1/2', 'cup', 2), '3 cups');
assert.equal(kp('1/2', 'tsp', 2), '1 tsp');
assert.equal(kp('1/2', 'tsp', frac(1, 2)), '1/4 tsp');
assert.equal(kp('1', 'tsp', 3), '1 tbsp');                         // 3 茶匙 = 1 湯匙
assert.equal(kp('1', 'cup', 1), '1 cup');
assert.equal(kp('1/3', 'tsp', 1), '1/3 tsp');                      // 量不出來就照原樣
assert.equal(formatAmount(frac(3, 2), 'cup'), '1 1/2 cups');
assert.equal(formatAmount(frac(1, 2), 'cup'), '1/2 cup');
assert.equal(formatAmount(frac(1), 'cup'), '1 cup');

// 怎麼唸
assert.equal(sayAmount(frac(1, 2), 'cup'), 'half a cup');
assert.equal(sayAmount(frac(3, 2), 'cup'), 'one and a half cups');
assert.equal(sayAmount(frac(1, 4), 'cup'), 'a quarter of a cup');
assert.equal(sayAmount(frac(3, 4), 'tsp'), 'three quarters of a teaspoon');
assert.equal(sayAmount(frac(1, 3), 'cup'), 'a third of a cup');
assert.equal(sayAmount(frac(2, 3), 'cup'), 'two thirds of a cup');
assert.equal(sayAmount(frac(2), 'tbsp'), 'two tablespoons');
assert.equal(sayAmount(frac(1), 'tsp'), 'one teaspoon');
assert.equal(sayAmount(frac(9, 4), 'cup'), 'two and a quarter cups');
assert.equal(sayAmount(frac(1, 8), 'tsp'), 'an eighth of a teaspoon');

console.log('units.test.mjs ok');
