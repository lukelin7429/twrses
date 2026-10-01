// 萬物原理第六課：無線電計算的檢查
import assert from 'node:assert/strict';
import { wavelengthM, fspl, pathLoss, rxDbm, bars, travelMicroseconds } from '../src/radio.js';

assert.ok(Math.abs(wavelengthM(700) - 0.428) < 0.002);         // 700 MHz 約 43 公分
assert.ok(Math.abs(wavelengthM(3500) - 0.0857) < 0.001);       // 3.5 GHz 約 8.6 公分
assert.ok(Math.abs(fspl(2, 700) - fspl(1, 700) - 6.02) < 0.01); // 自由空間：距離加倍多 6 dB
assert.ok(pathLoss(5, 3500) > pathLoss(5, 700));                // 頻率越高，損失越多
for (const band of ['low', 'high']) {                           // 越遠越弱；被山擋住更弱
  assert.ok(rxDbm(4, band, false) < rxDbm(2, band, false));
  assert.ok(rxDbm(3, band, true) < rxDbm(3, band, false));
}
assert.ok(bars(rxDbm(1, 'low', false)) === 4);                  // 鎮上靠近基地台：滿格
assert.ok(bars(rxDbm(7, 'low', true)) <= 1);                    // 山的背後很遠：幾乎沒訊號
assert.ok(bars(rxDbm(4, 'high', false)) < bars(rxDbm(4, 'low', false)));   // 同樣距離，高頻格數比較少
assert.ok(Math.abs(travelMicroseconds(3) - 10.0) < 0.1);        // 3 公里只要 10 微秒
console.log('signal.test: all passed');
