// 課文裡的數字與資料檔的結構，自己再算一遍：node test/data.test.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { enWords, zhWords } from '../src/names.js';
import { WIDTHS, expandedText, groupThousands, maxValue, numeral, toDigits } from '../src/place.js';

const data = JSON.parse(readFileSync(new URL('../../../data/math.json', import.meta.url), 'utf8'));
const lessons = data.units.flatMap((u) => u.lessons), planned = data.units.flatMap((u) => u.planned);

// 六個單元、二十六課，課次連號
assert.equal(data.units.length, 6);
assert.deepEqual([...lessons, ...planned].map((l) => l.n).sort((a, b) => a - b), Array.from({ length: 26 }, (_, i) => i + 1));

const L = lessons.find((l) => l.slug === 'count-in-tens');
assert.equal(L.paras.length, 6); assert.equal(L.paras_zh.length, 6);
assert.equal(L.vocab.length, 8); assert.equal(L.questions.length, 3); assert.equal(L.answers.length, 3);
assert.equal(L.quiz.length, 5); assert.equal(L.parts.length, 4); assert.equal(L.myths.length, 4); assert.equal(L.tricks.length, 4);
assert.equal(L.culture_cards.cards.length, 4); assert.equal(L.activities.length, 2);
L.quiz.forEach((q) => { assert.equal(q.options.length, 4); assert.ok(q.correct >= 0 && q.correct < 4); });
L.vocab.forEach((v) => assert.ok(v.ex.includes('<b>')));

// 「怎麼唸」卡：6–8 列；整數的唸法和 names.js 算出來的一樣（英文逗號只是停頓，比對時拿掉）
const rows = L.sayit.rows;
assert.ok(rows.length >= 6 && rows.length <= 8);
rows.forEach((r) => {
  assert.ok(r.say_en && r.say_zh && !/\d/.test(r.say_en) && !/\d/.test(r.say_zh), `唸法裡不能有阿拉伯數字：${r.expr}`);
  if (/^[\d,]+$/.test(r.expr)) {
    const n = Number(r.expr.replace(/,/g, ''));
    assert.equal(r.expr, groupThousands(n));
    assert.equal(r.say_en.replace(/,/g, ''), enWords(n));
    assert.equal(r.say_zh, zhWords(n));
  }
});
assert.ok(!rows.some((r) => /\band\b/.test(r.say_en)));

// 課文與卡片裡的數
assert.equal(10 * 10, 100); assert.equal(10 * 10 * 10, 1000);
assert.equal(expandedText(305), '300 + 0 + 5');
assert.ok(35 / 305 < 1 / 8);                         // 迷思一：35 不到 305 的八分之一
assert.equal(numeral(toDigits(13, 10)), '13');       // 卡片四、「同一個數，三種寫法」
assert.equal(numeral(toDigits(13, 5)), '23');
assert.equal(numeral(toDigits(13, 2)), '1101');
assert.equal(maxValue(WIDTHS[10], 10), 9999);        // 模型說明裡的三個範圍
assert.equal(maxValue(WIDTHS[5], 5), 624);
assert.equal(maxValue(WIDTHS[2], 2), 255);
assert.equal(4 * 20 + 7, 87);                        // four score and seven
assert.equal(4 * 20, 80);                            // quatre-vingts
assert.equal(12 * 5, 60);                            // 活動二：十二個指節 × 五根手指
assert.equal(4 * 3, 12);
[1, 2, 3, 4, 5, 6].forEach((k) => assert.equal(60 % k, 0));   // 60 可以被 1–6 整除
assert.equal(10000, 10 * 1000);                      // 萬：千的十倍
assert.equal(100000000, 10000 * 10000);              // 億：萬的萬倍
assert.equal(enWords(12345), 'twelve thousand three hundred forty-five');
assert.equal(1e9, 1000 * 1e6);                       // billion：一千個 million
assert.equal(zhWords(1e9), '十億');
// 小測驗的答案
assert.equal(toDigits(472, 10)[1] * 10, 70);
assert.equal(numeral([6, 0, 4]), '406');
// 小卡的示範鍵要和 math-blocks.js 的 DEMO 一致
const src = readFileSync(new URL('../src/math-blocks.js', import.meta.url), 'utf8');
L.parts.forEach((p) => assert.ok(new RegExp(`\\n    ${p.demo}\\(\\) \\{`).test(src), `DEMO.${p.demo}`));
// 美式拼字：常見的英式拼法不能出現在英文欄位
// （出處欄的逐字引文照原文，例如 MacTutor 的 “civilisation”，所以 sources 不掃）
const en = JSON.stringify(data, (k, v) => (k === 'sources' ? undefined : v)).replace(/[\u4e00-\u9fff]/g, '');
assert.ok(!/\b(maths|colour|centre|metre|programme|practise|favourite|grey|whilst|towards|recognise|organise|analyse|civilisation)\b/i.test(en));

console.log('data.test.mjs ok');
