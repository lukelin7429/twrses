// 晶片與半導體第二課：transcalc.js 的檢查（node test/transistor.test.mjs）
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  AND, OR, VDD, VTH, XOR, YEAR, addBits, channel, countSeconds, current, fmtDuration, fromBits, fullAdd, halfAdd, isOn,
  parallel, series, toBits,
} from '../src/transcalc.js';

// 開關：臨界電壓以下沒有通道、沒有電流；全開時 1；電流隨閘極電壓單調增加
assert.equal(channel(0), 0); assert.equal(current(0), 0);
assert.equal(channel(VTH), 0); assert.equal(current(VTH - 0.01), 0);
assert.equal(channel(VDD), 1); assert.equal(current(VDD), 1);
for (let v = 0; v < VDD; v += 0.01) assert.ok(current(v + 0.01) >= current(v), `電流單調 ${v}`);
assert.equal(isOn(0), false); assert.equal(isOn(VDD), true);
assert.ok(current(0.7) > 0.2 && current(0.7) < 0.3, '平方律：0.7 V 約四分之一');

// 串聯＝AND、並聯＝OR（四種輸入都檢查）
const truth = [[0, 0], [0, 1], [1, 0], [1, 1]];
assert.deepEqual(truth.map(([a, b]) => series(a, b)), [0, 0, 0, 1], '串聯：兩個都開才通');
assert.deepEqual(truth.map(([a, b]) => parallel(a, b)), [0, 1, 1, 1], '並聯：有一個開就通');
assert.equal(AND, series); assert.equal(OR, parallel);
assert.deepEqual(truth.map(([a, b]) => XOR(a, b)), [0, 1, 1, 0]);
// 半加器：1 + 1 = 10（和 0、進位 1）
assert.deepEqual(halfAdd(1, 1), { sum: 0, carry: 1 });
assert.deepEqual(halfAdd(1, 0), { sum: 1, carry: 0 });
for (const [a, b] of truth) { const h = halfAdd(a, b); assert.equal(h.carry * 2 + h.sum, a + b, `半加器 ${a}+${b}`); }
for (const a of [0, 1]) for (const b of [0, 1]) for (const c of [0, 1]) { const f = fullAdd(a, b, c); assert.equal(f.carry * 2 + f.sum, a + b + c, '全加器'); }
// 二進位：1、2、3、4 → 1、10、11、100；四位元加法器把 0–15 全部加過一遍
assert.deepEqual([1, 2, 3, 4].map((n) => toBits(n, 3).join('').replace(/^0+/, '')), ['1', '10', '11', '100']);
for (let x = 0; x < 16; x++) for (let y = 0; y < 16; y++) assert.equal(addBits(x, y, 4).value, x + y, `${x}+${y}`);
assert.equal(fromBits(addBits(5, 5, 4).sum), 10);

// 一秒數一顆：查證過的電晶體數量（data/semiconductors.json 第二課的 count）
const data = JSON.parse(readFileSync(new URL('../../../data/semiconductors.json', import.meta.url), 'utf8'));
const lesson = data.units[0].lessons.find((l) => l.n === 2);
const cnt = lesson.count;
const by = Object.fromEntries(cnt.chips.map((c) => [c.key, c]));
assert.equal(by.i4004.n, 2300, 'Intel 4004：2,300 顆（Intel）');
assert.equal(by.m4.n, 28e9, 'Apple M4：280 億顆（Apple 2024）');
assert.equal(by.blackwell.n, 208e9, 'NVIDIA Blackwell：2,080 億顆（NVIDIA 2024）');
for (const c of cnt.chips) assert.ok(c.src && c.year, `${c.key} 要有出處與年份`);
assert.deepEqual(fmtDuration(countSeconds(28e9)), { en: '887 years', zh: '887 年' }, 'M4 一秒一顆：887 年');
assert.deepEqual(fmtDuration(countSeconds(208e9)), { en: '6,591 years', zh: '6,591 年' });
assert.deepEqual(fmtDuration(countSeconds(2300)), { en: '38 minutes', zh: '38 分鐘' });
assert.ok(cnt.people > 23e6 && cnt.people < 23.5e6, '台灣人口約 2,320 萬');
assert.deepEqual(fmtDuration(countSeconds(28e9, cnt.people)), { en: '20 minutes', zh: '20 分鐘' }, '全台灣一起數 M4：約 20 分鐘');
assert.deepEqual(fmtDuration(countSeconds(208e9, cnt.people)), { en: '2.5 hours', zh: '2.5 小時' });
assert.deepEqual(fmtDuration(countSeconds(2300, cnt.people)), { en: 'less than a second', zh: '不到 1 秒' });
assert.deepEqual(fmtDuration(1), { en: '1 second', zh: '1 秒' });
assert.ok(Math.abs(YEAR - 31557600) < 1);
// 摩爾定律：1971 → 2024 大約翻了幾倍
assert.ok(28e9 / 2300 > 1e7, '4004 到 M4 超過一千萬倍');

console.log('transistor.test.mjs ✓ 全部通過');
