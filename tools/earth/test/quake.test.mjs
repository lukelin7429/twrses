import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { RATE_CM, MODES, stored, cycle, VP, VS, ALERT_S, tP, tS, warning, blindKm } from '../src/quakecalc.js';

const near = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) < e, `${a} vs ${b}`);
assert.ok(RATE_CM >= 7 && RATE_CM <= 8);                                  // 氣象署：每年約 7 至 8 公分
near(stored(100), 7.5); near(stored(40), 3); near(stored(160), 12);
// 卡得越久，一次滑得越多；長期下來滑的總量一樣（都等於板塊走的距離）
assert.ok(cycle(0, 'easy').n === 0 && cycle(39.9, 'easy').n === 0 && cycle(40, 'easy').n === 1);
assert.equal(cycle(320, 'easy').n, 8); assert.equal(cycle(320, 'hard').n, 2);
near(cycle(320, 'easy').total, cycle(320, 'hard').total); near(cycle(320, 'hard').total, stored(320));
assert.ok(cycle(100, 'hard').slip > cycle(100, 'easy').slip);
near(cycle(50, 'easy').since, 10); assert.equal(cycle(-5, 'easy').n, 0);
// 地震波：P 比 S 快，比例約 1.7：1；P 波落在 5–8 km/s
assert.ok(VP >= 5 && VP <= 8 && VP / VS > 1.6 && VP / VS < 1.8);
assert.ok(tP(140) < tS(140)); near(tS(100), 25); near(tP(70), 10);
// 警報：15–20 秒＋1–2 秒
assert.ok(ALERT_S >= 16 && ALERT_S <= 22);
assert.equal(warning(40), 0); near(warning(100), 6); near(blindKm(), 76);
assert.ok(warning(300) > warning(150) && warning(150) > 0);
// 氣象署的例子：2016 年美濃地震 12 秒算出震央，台北有 49 秒；用 13 秒（12＋通報）與約 250 公里檢查量級
assert.ok(Math.abs(warning(250, 13) - 49) < 2, String(warning(250, 13)));
const p = new URL('../../../data/earth.json', import.meta.url);
const data = existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null;
const lesson = data && data.units.flatMap((u) => u.lessons).find((l) => l.slug === 'taiwan-earthquakes');
if (lesson) { assert.equal(Object.keys(lesson.lab.msgs).length, 4); assert.equal(lesson.warn.places.length, 4); }
if (data) { const ns = data.units.flatMap((u) => [...u.lessons, ...(u.planned || [])].map((x) => x.n)).sort((a, b) => a - b); assert.deepEqual(ns, [...Array(16).keys()].map((i) => i + 1)); }
console.log('quake.test: all passed', warning(250, 13).toFixed(1), blindKm(), lesson ? 'data ok' : 'no data yet');
