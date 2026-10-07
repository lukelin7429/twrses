// 檢查第十二課的判斷（src/seal2d.js 的純函式；那個檔 import 了 JSON 與 canvas，這裡把同樣的規則再寫一次核對）：node test/seal.test.mjs
// 課文說的事要成立：反著刻 → 蓋出來是正的；照正的刻 → 蓋出來是反的；朱文：字沾得到印泥；白文：字以外的地方沾得到。
// 另外檢查原始碼裡的預設字不是左右對稱的字（對稱的字看不出鏡像）。
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const src = readFileSync(new URL('../src/seal2d.js', import.meta.url), 'utf8');
const lab = readFileSync(new URL('../src/cal-seal.js', import.meta.url), 'utf8');
assert.ok(src.includes("export const printReads = (carve) => (carve === 'mirror' ? 'right' : 'backward');"));
assert.ok(src.includes("export const inkAt = (style, onChar) => (style === 'zhu' ? onChar : !onChar);"));
const printReads = (carve) => (carve === 'mirror' ? 'right' : 'backward');
const inkAt = (style, onChar) => (style === 'zhu' ? onChar : !onChar);
assert.equal(printReads('mirror'), 'right'); assert.equal(printReads('straight'), 'backward');
assert.equal(inkAt('zhu', true), true); assert.equal(inkAt('zhu', false), false);
assert.equal(inkAt('bai', true), false); assert.equal(inkAt('bai', false), true);
const sym = src.match(/export const SYMMETRIC = \[([^\]]+)\]/)[1];
for (const m of [...lab.matchAll(/key: '(\w+)'/g), ...src.matchAll(/state = \{ key: '(\w+)'/g)]) assert.ok(!sym.includes(`'${m[1]}'`), `預設字 ${m[1]} 不能是左右對稱的字`);
console.log('seal: ok');
