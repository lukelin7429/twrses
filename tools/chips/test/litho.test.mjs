// 晶片與半導體第四課：lithocalc.js 的檢查（node test/litho.test.mjs）
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { K1_MIN, LIGHT, REDUCTION, blur1D, blurRadius, cd, edgeWidth, ratio, segments, shrink, tone } from '../src/lithocalc.js';

assert.equal(LIGHT.duv.nm, 193); assert.equal(LIGHT.euv.nm, 13.5);
assert.ok(ratio('duv', 'euv') > 14 && ratio('duv', 'euv') < 14.5, 'EUV 的波長約短 14 倍');
assert.equal(REDUCTION, 4); assert.equal(shrink(104), 26, '光罩上 104 mm → 晶圓上 26 mm');
assert.equal(LIGHT.euv.air, false, 'EUV 要在真空裡'); assert.equal(LIGHT.euv.optics, 'mirror');
// 瑞利公式：DUV 約 57 nm、EUV 約 16 nm、EUV 物理極限約 10 nm；都比流感病毒（80–120 nm）小
const cdD = cd('duv'), cdE = cd('euv'), cdMin = cd('euv', K1_MIN);
assert.ok(Math.abs(cdD - 57.2) < 0.5 && Math.abs(cdE - 16.4) < 0.5 && Math.abs(cdMin - 10.2) < 0.3, `${cdD} ${cdE} ${cdMin}`);
assert.ok(cdE < 80 && cdD < 80, '線條比流感病毒細');
assert.ok(cdD / cdE > 3 && cdD / cdE < 4, '波長短 14 倍，線只細約 3.5 倍');
assert.equal(segments('duv'), 6); assert.equal(segments('euv'), 21);

// 藍曬：被光罩擋住的地方不變色；越曬越深、會飽和
assert.equal(tone(10, 0), 0);
assert.equal(tone(0, 1), 0);
for (let m = 0; m < 30; m++) assert.ok(tone(m + 1) > tone(m), '越曬越深');
assert.ok(tone(60) > 0.99, '曬很久就飽和');
assert.ok(tone(12) > 0.6 && tone(12) < 0.66, '12 分鐘約 63%');
assert.ok(tone(5, 0.5) < tone(5, 1), '半透明的地方比較淺');

// 光罩離紙越遠，邊緣越糊
const edge = Array.from({ length: 60 }, (_, i) => (i < 30 ? 0 : 1));
const w0 = edgeWidth(blur1D(edge, blurRadius(0)));
const w2 = edgeWidth(blur1D(edge, blurRadius(2)));
const w5 = edgeWidth(blur1D(edge, blurRadius(5)));
assert.ok(w0 <= 1 && w2 > w0 && w5 > w2, `邊緣寬度 ${w0} < ${w2} < ${w5}`);
// 兩條很近的線：糊到一定程度就分不開（解析度的直覺）
const lines = Array.from({ length: 40 }, (_, i) => (Math.floor(i / 4) % 2 ? 1 : 0));
const contrast = (a) => Math.max(...a.slice(8, 32)) - Math.min(...a.slice(8, 32));
assert.ok(contrast(blur1D(lines, 0)) === 1 && contrast(blur1D(lines, 4)) < 0.3, '線靠太近又太糊，就分不開');

// 頁面資料
const data = JSON.parse(readFileSync(new URL('../../../data/semiconductors.json', import.meta.url), 'utf8'));
const lesson = data.units[1].lessons.find((l) => l.n === 4);
assert.equal(lesson.lab.steps.length, 5, '晶圓上的五個步驟');
for (const m of lesson.sunprint.masks) assert.ok(m.key && m.en && m.zh, 'mask');
console.log('litho.test.mjs ✓ 全部通過', { ratio: ratio('duv', 'euv').toFixed(1), edges: [w0, w2, w5] });
