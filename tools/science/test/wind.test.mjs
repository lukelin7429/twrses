// 萬物原理第四課：風機計算的檢查
import assert from 'node:assert/strict';
import { windPower, power, rpm, pitch, regime, cp, AREA, BETZ, RATED_W, MAX_RPM, tipSpeed, kmh } from '../src/windcalc.js';

// 掃風面積 ≈ 21,904 m²（SG 8.0-167 DD）
assert.ok(Math.abs(AREA - 21904) < 5, `area ${AREA}`);
// 風速加倍，風的功率變八倍；Cp 不變的區間，發電也是八倍
assert.ok(Math.abs(windPower(10) / windPower(5) - 8) < 1e-9);
assert.ok(Math.abs(power(8) / power(4) - 8) < 1e-9);
// Cp 永遠低於貝茲極限
for (let v = 0; v < 30; v += 0.5) assert.ok(cp(v) < BETZ);
// 切入以下、暴風以上都不發電；滿載是 8 MW，約 12–13 m/s 到達
assert.equal(power(2.5), 0);
assert.equal(power(26), 0);
assert.equal(power(15), RATED_W);
assert.ok(power(12) < RATED_W && power(13) === RATED_W, `p12 ${power(12)} p13 ${power(13)}`);
assert.equal(regime(2), 'calm'); assert.equal(regime(30), 'storm');
// 8 m/s 時約 3 MW
assert.ok(power(8) > 2.8e6 && power(8) < 3.2e6, `p8 ${power(8)}`);
// 轉速最快 10.3 rpm，葉尖約 90 m/s ≈ 320 km/h；暴風時停住、葉片順槳
assert.equal(rpm(20), MAX_RPM);
assert.ok(Math.abs(kmh(tipSpeed(MAX_RPM)) - 324) < 2, `tip ${kmh(tipSpeed(MAX_RPM))}`);
assert.equal(rpm(30), 0); assert.equal(pitch(30), 88);
assert.equal(pitch(8), 0); assert.ok(pitch(20) > 5);
console.log('wind.test: all passed (rated at about ' + [...Array(300)].map((_, i) => i / 10).find((v) => power(v) >= RATED_W) + ' m/s)');
