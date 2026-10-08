import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { UPLIFT_MM, YUSHAN_M, noErosion, yearsTo, EROSION, steady, heightAt, lifted, eroded } from '../src/mtcalc.js';

const near = (a, b, e) => assert.ok(Math.abs(a - b) < e, `${a} vs ${b}`);
assert.equal(UPLIFT_MM, 5); assert.equal(YUSHAN_M, 3952);
// 沒有侵蝕：一百萬年長 5 公里；長到玉山那麼高只要約 79 萬年
near(noErosion(1e6), 5000, 1e-9); near(yearsTo(YUSHAN_M), 790400, 1); near(noErosion(5e6), 25000, 1e-9);
// 示例模型：中等的侵蝕下，高度停在 4 公里左右（和玉山差不多）
near(steady(5, EROSION.medium), 4, 1e-9); assert.ok(steady(5, EROSION.weak) > steady(5, EROSION.medium) && steady(5, EROSION.medium) > steady(5, EROSION.strong));
// 從 0 開始會越長越慢，最後接近打平的高度，不會超過
let prev = 0;
for (const t of [0.5, 1, 2, 4, 8]) { const h = heightAt(0, 5, 1.25, t); assert.ok(h > prev && h < 4); prev = h; }
near(heightAt(0, 5, 1.25, 20), 4, 1e-6); near(heightAt(0, 5, 1.25, 0), 0, 1e-12);
// 停止抬升：山被慢慢削平
assert.ok(heightAt(4, 0, 1.25, 1) < 4 && heightAt(4, 0, 1.25, 1) > 0); near(heightAt(4, 0, 1.25, 30), 0, 1e-6);
// 抬高的總量＝現在的高度＋被削掉的
near(lifted(5, 3), 15, 1e-12); near(eroded(0, 5, 1.25, 3) + heightAt(0, 5, 1.25, 3), 15, 1e-9);
assert.ok(eroded(0, 5, 1.25, 3) > heightAt(0, 5, 1.25, 3));          // 三百萬年後，被削掉的比留下的多
const p = new URL('../../../data/earth.json', import.meta.url);
const data = existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null;
const lesson = data && data.units.flatMap((u) => u.lessons).find((l) => l.slug === 'taiwan-mountains');
if (lesson) { assert.deepEqual(Object.keys(lesson.lab.msgs), ['grow', 'steady', 'shrink', 'flat']); assert.equal(lesson.peak.marks.length, 3); }
console.log('mt.test: all passed', heightAt(0, 5, 1.25, 3).toFixed(2), eroded(0, 5, 1.25, 3).toFixed(1), lesson ? 'data ok' : 'no data yet');
