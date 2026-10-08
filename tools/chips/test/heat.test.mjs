// 晶片與半導體第九課：發熱與散熱模型的檢查
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { relPower, power, steadyTemp, simulate, safeSpeed, LIMIT, AMBIENT, LOADS, COOLERS } from '../src/heatcalc.js';

// P ∝ V²·f：電壓降兩成 → 功率剩 64%；速度減半 → 一半；兩個一起 → 32%
assert.ok(Math.abs(relPower(0.8, 1) - 0.64) < 1e-12);
assert.equal(relPower(1, 0.5), 0.5);
assert.ok(Math.abs(relPower(0.8, 0.5) - 0.32) < 1e-12);
assert.ok(relPower(1.2, 1) > 1.4);                                   // 電壓加兩成，功率多四成四
assert.equal(power('game'), 100); assert.equal(power('idle'), 10);
// 待機：不裝散熱片也沒事
assert.ok(steadyTemp('idle', 'none') < LIMIT);
const idle = simulate({ load: 'idle', cooler: 'none' });
assert.ok(idle.hi < LIMIT && idle.speed === 1);
// 玩遊戲、沒有散熱：會過熱，只好降速，溫度守在上限附近
assert.ok(steadyTemp('game', 'none') > 150);
const hot = simulate({ load: 'game', cooler: 'none' });
assert.ok(hot.minSpeed < 0.6 && hot.hi < LIMIT + 12, `${hot.minSpeed} ${hot.hi}`);
assert.ok(Math.abs(safeSpeed('game', 'none') - 0.4375) < 1e-9);
// 加散熱片好一點，但全速還是太熱；加風扇就能全速
assert.ok(safeSpeed('game', 'sink') < 1 && safeSpeed('game', 'sink') > safeSpeed('game', 'none'));
const fan = simulate({ load: 'game', cooler: 'fan' });
assert.ok(fan.hi < LIMIT && fan.speed === 1 && fan.T > 60);
assert.equal(safeSpeed('game', 'fan'), 1);
// 散熱越好，同樣的工作溫度越低；工作越重，溫度越高
assert.ok(steadyTemp('video', 'fan') < steadyTemp('video', 'sink') && steadyTemp('video', 'sink') < steadyTemp('video', 'none'));
assert.ok(steadyTemp('game', 'fan') > steadyTemp('video', 'fan') && steadyTemp('video', 'fan') > steadyTemp('idle', 'fan'));
assert.ok(AMBIENT === 25 && Object.keys(LOADS).length === 3 && Object.keys(COOLERS).length === 3);
const data = JSON.parse(readFileSync(new URL('../../../data/semiconductors.json', import.meta.url), 'utf8'));
const lesson = data.units.flatMap((u) => u.lessons).find((l) => l.slug === 'chip-heat');
if (lesson) { assert.equal(Object.keys(lesson.lab.msgs).length, 4); assert.equal(lesson.vf.presets.length, 3); }
console.log('heat.test: all passed', hot.minSpeed.toFixed(2), hot.hi.toFixed(0), fan.T.toFixed(0), lesson ? 'data ok' : 'no data yet');
