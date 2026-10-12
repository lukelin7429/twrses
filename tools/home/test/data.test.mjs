// data/home.json 的數字和引擎算出來的要一致：模型、食譜、課文三邊不能各說各話。
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ML, G, cupsToGrams, fnum, parseAmount, toMl, fToC, frac } from '../src/units.js';
import { ovenMetric, scaleItem, servingFactor, toMetric } from '../src/recipe.js';

const HOME = JSON.parse(readFileSync(new URL('../../../data/home.json', import.meta.url), 'utf8'));
const lessons = HOME.units.flatMap((u) => u.lessons);
const planned = HOME.units.flatMap((u) => u.planned || []);
assert.equal(HOME.units.length, 7);
assert.equal(lessons.length + planned.length, 28);
assert.deepEqual([...lessons, ...planned].map((l) => l.n).sort((a, b) => a - b), Array.from({ length: 28 }, (_, i) => i + 1));

const L = lessons.find((l) => l.slug === 'cups-and-grams');
const foods = Object.fromEntries(L.lab.foods.map((f) => [f.key, f]));
// 模型裡「一杯幾公克」：出處的數字（USDA FoodData Central；壓實的麵粉是 King Arthur Baking）
assert.deepEqual(Object.fromEntries(L.lab.foods.map((f) => [f.key, f.g_cup])), { water: 237, flour: 125, sugar: 200, rice: 185, oil: 218 });
assert.equal(foods.flour.g_cup_packed, 160);
// 水：一杯 236.6 mL，1 mL 大約 1 g
assert.equal(Math.round(ML.cup), foods.water.g_cup);
// 每一種份量算出來的讀數
const reading = (key, amt, packed) => Math.round(cupsToGrams(fnum(parseAmount(amt)), packed ? foods[key].g_cup_packed : foods[key].g_cup));
assert.equal(reading('flour', '1'), 125);
assert.equal(reading('flour', '1', true), 160);
assert.equal(reading('flour', '3/4'), 94);
assert.equal(reading('sugar', '1/2'), 100);
assert.equal(reading('rice', '1/4'), 46);
assert.equal(reading('oil', '1/3'), 73);
assert.equal(reading('water', '1/4'), 59);
assert.equal(Math.round(toMl(0.25, 'cup')), 59);
assert.equal(Math.round(toMl(0.75, 'cup')), 177);
// 課文裡的數字
const text = L.paras.join(' ');
for (const n of ['237 grams of water', '125 grams of flour', '200 grams of sugar', '160 grams', '350°F is at about 177°C']) assert.ok(text.includes(n), n);
assert.equal(Math.round(fToC(350)), 177);
assert.equal((foods.flour.g_cup / G.oz).toFixed(1), '4.4');           // 迷思卡：一杯麵粉大約 4.4 盎司
assert.equal(Math.round((foods.flour.g_cup_packed / foods.flour.g_cup - 1) * 100), 28);

// 食譜換公制
const R = L.recipe;
const metric = R.items.map((it) => { const m = toMetric(it); return m ? m.text : 'a pinch'; });
assert.deepEqual(metric, ['225 g', '122 g', '48 g', '30 mL', '13 g', '2.5 mL', 'a pinch']);
assert.equal(ovenMetric(R.oven_f).text, '177°C');
// 食譜放大縮小
const scaled = (serves) => R.items.map((it) => scaleItem(it, servingFactor(serves, R.serves)).text);
assert.deepEqual(scaled(4), ['1 cup', '1 1/2 cups', '1/3 cup', '2 tbsp', '1 tbsp', '1/2 tsp', 'a pinch']);
assert.deepEqual(scaled(2), ['1/2 cup', '3/4 cup', '2 tbsp + 2 tsp', '1 tbsp', '1 1/2 tsp', '1/4 tsp', 'a pinch']);
assert.deepEqual(scaled(8), ['2 cups', '3 cups', '2/3 cup', '1/4 cup', '2 tbsp', '1 tsp', '2 pinches']);
assert.deepEqual(scaled(6), ['1 1/2 cups', '2 1/4 cups', '1/2 cup', '3 tbsp', '1 1/2 tbsp', '3/4 tsp', 'a big pinch']);
assert.deepEqual(servingFactor(6, 4), frac(3, 2));
assert.deepEqual(L.resize.serves, [2, 4, 6, 8]);

// 誰的一杯
const cups = Object.fromEntries(L.cupsq.cups.map((c) => [c.key, c.ml]));
assert.deepEqual(cups, { us: 236.6, label: 240, metric: 250, japan: 200, rice: 180 });
assert.equal(Math.round(cups.rice / ML.cup * 100), 76);

// 每課都有的兩張卡與規格
assert.equal(L.phrases.items.length, 8);
assert.ok(['yes', 'no'].includes(L.home_task.adult));
assert.equal(L.paras.length, 6); assert.equal(L.paras_zh.length, 6);
assert.equal(L.vocab.length, 8); assert.equal(L.quiz.length, 5); assert.equal(L.questions.length, 3);
assert.equal(L.parts.length, 4); assert.equal(L.myths.length, 4); assert.equal(L.tricks.length, 4);
assert.equal(L.culture_cards.cards.length, 4); assert.equal(L.activities.length, 2);

// 全素檢查：整課的英文與中文都不能把肉、魚、海鮮、蛋、奶當食材
const all = JSON.stringify(L);
const banned = /\b(meat|beef|pork|chicken|fish|shrimp|seafood|egg|eggs|milk|butter|cheese|cream|yogurt|honey|bacon|ham|lard|gelatin)\b/i;
const hit = all.replace(/no raw meat to deal with/g, '').match(banned);
assert.equal(hit, null, hit && `non-vegan word: ${hit[0]}`);
assert.equal(/[肉魚蝦蛋奶]|蜂蜜|起司|奶油|海鮮/.test(all.replace(/肉桂/g, '')), false, 'non-vegan zh word');

console.log('data.test.mjs ok');
