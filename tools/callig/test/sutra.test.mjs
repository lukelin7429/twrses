// 檢查第十三課：五個字的筆畫數（教育部）、格子的順序（由上到下、由右到左）、課文裡的數字。node test/sutra.test.mjs
// sutra2d.js import 了 JSON，node 直接跑不了，所以把 cellOf／readingOrder 的規則在這裡再寫一次，並核對原始碼裡的寫法沒變。
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const R = (k) => JSON.parse(readFileSync(new URL(`../src/strokes/${k}.json`, import.meta.url), 'utf8'));
for (const [k, ch, n] of [['xin', '心', 4], ['se', '色', 6], ['ji', '即', 7], ['shi4', '是', 9], ['kong', '空', 8]]) {
  const c = R(k); assert.equal(c.char, ch); assert.equal(c.count, n, `${ch} 應該是 ${n} 畫`); assert.equal(c.strokes.length, n);
}
const src = readFileSync(new URL('../src/sutra2d.js', import.meta.url), 'utf8');
assert.ok(src.includes("export const LINE = ['se', 'ji', 'shi4', 'kong', 'kong', 'ji', 'shi4', 'se'];"), '色即是空空即是色');
assert.ok(src.includes('const c = Math.floor(i / rows), row = i % rows, col = cols - 1 - c;'), 'cellOf：第一行在最右邊');
assert.ok(src.includes('for (let c = cols - 1; c >= 0; c--) for (let r = 0; r < rows; r++) out.push(r * cols + c);'), 'readingOrder');
const readingOrder = (cols, rows) => { const o = []; for (let c = cols - 1; c >= 0; c--) for (let r = 0; r < rows; r++) o.push(r * cols + c); return o; };
assert.deepEqual(readingOrder(3, 4), [2, 5, 8, 11, 1, 4, 7, 10, 0, 3, 6, 9]);   // 右上角（第 0 列、最右一行＝索引 2）先寫
const D = JSON.parse(readFileSync(new URL('../../../data/calligraphy.json', import.meta.url), 'utf8'));
const L = D.units.flatMap((u) => u.lessons).find((l) => l.slug === 'copying-sutras');
assert.ok(L, '找不到第十三課');
assert.equal(L.lab.total, 260, '〈心經〉玄奘譯本正文 260 字（自己從 CBETA T0251 數的）');
assert.ok(L.paras.join(' ').includes('260 characters') && L.paras_zh.join('').includes('260 個字'));
assert.equal(R('shi').char, '十', 'shi.json 是第四課的「十」，不能被「是」蓋掉');
console.log('sutra: ok');
