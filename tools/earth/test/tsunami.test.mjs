import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { speed, kmh, depth, grow, depthVis, advance, DEEP, SHALLOW, SHORE, X0 } from '../src/tsunamicalc.js';

const near = (a, b, e) => assert.ok(Math.abs(a - b) < e, `${a} vs ${b}`);
// 氣象署：深而廣闊的海洋裡，傳播速度約每小時 500 至 1,000 公里
near(kmh(speed(4000)), 713, 1); assert.ok(kmh(speed(2000)) > 500 && kmh(speed(6000)) < 1000);
near(kmh(speed(10)), 35.6, 0.2); assert.equal(speed(0), 0);
// 地形：外海深、岸邊淺，一路變淺
assert.equal(depth(X0), DEEP); near(depth(SHORE - 1e-9), SHALLOW, 0.01); assert.equal(depth(SHORE), 0);
for (let x = -4; x < SHORE - 0.2; x += 0.2) assert.ok(depth(x) > depth(x + 0.2));
// 越淺越慢、越高
assert.ok(speed(depth(-6)) > speed(depth(0)) && speed(depth(0)) > speed(depth(3.5)));
assert.equal(grow(DEEP), 1); near(grow(SHALLOW), 4.47, 0.01); assert.ok(grow(100) > grow(1000));
assert.ok(depthVis(-8) > depthVis(0) && depthVis(0) > depthVis(3.9) && depthVis(4.5) === 0);
// 波峰在深海走得快、靠岸走得慢
assert.ok(advance(-7, 1) - -7 > advance(3, 1) - 3);
let x = X0 + 0.5, t = 0; while (x < SHORE && t < 200) { x = advance(x, 0.05); t += 0.05; } assert.ok(t > 6 && t < 40, `arrives in ${t}`);
const dp = new URL('../../../data/earth.json', import.meta.url);
const data = existsSync(dp) ? JSON.parse(readFileSync(dp, 'utf8')) : null;
const lesson = data && data.units.flatMap((u) => u.lessons).find((l) => l.slug === 'tsunami');
if (lesson) assert.deepEqual(Object.keys(lesson.lab.msgs), ['wind', 'deep', 'shoal', 'land']);
console.log('tsunami.test: all passed', Math.round(kmh(speed(4000))), t.toFixed(1), lesson ? 'data ok' : 'no data yet');
