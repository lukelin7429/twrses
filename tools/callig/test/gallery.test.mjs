// 檢查第十課燈光實驗的純函式（src/gallery2d.js）：node test/gallery.test.mjs
// 課文說的事要成立：照到的光＝照度 × 時間（加倍照度＝加倍曝光）；同樣的天數，越亮褪得越多；沒有光就不褪；
// 滑桿兩端是 50 和 5000 lux，來回換算不走樣。
import assert from 'node:assert/strict';
import { HOURS, LIMIT, daysToLimit, exposure, fadeOf, luxFromSlider, sliderFromLux } from '../src/gallery2d.js';

assert.equal(exposure(50, 1), 50 * HOURS);
assert.equal(exposure(100, 10), 2 * exposure(50, 10));
assert.equal(exposure(5000, 1), exposure(50, 100), '在 5000 lux 下一天＝在 50 lux 下一百天');
assert.equal(LIMIT, 16000); assert.equal(HOURS, 8);
assert.equal(daysToLimit(50), 40, '故宮規定裡的例子：50 lux、每天 8 小時，可展 40 天');
assert.equal(exposure(50, 40), LIMIT);
assert.ok(Math.abs(daysToLimit(5000) - 0.4) < 1e-9);
assert.ok(fadeOf(LIMIT) < 0.02, '一年的額度：在模型裡幾乎看不出褪色');
assert.equal(fadeOf(0), 0);
let last = 0;
for (const lux of [50, 150, 500, 1500, 5000]) {
  const f = fadeOf(exposure(lux, 365));
  assert.ok(f > last && f <= 1, `一年：${lux} lux 要比暗的褪得多`);
  last = f;
}
assert.ok(fadeOf(exposure(50, 365)) < 0.2, '50 lux 一年：只褪一點點');
assert.ok(fadeOf(exposure(5000, 365)) > 0.9, '5000 lux 一年：幾乎褪光');
assert.ok(Math.abs(luxFromSlider(0) - 50) < 1e-9 && Math.abs(luxFromSlider(100) - 5000) < 1e-6);
for (const lux of [50, 200, 500, 2000, 5000]) assert.ok(Math.abs(luxFromSlider(sliderFromLux(lux)) - lux) < 1e-6);
console.log('gallery: ok');
