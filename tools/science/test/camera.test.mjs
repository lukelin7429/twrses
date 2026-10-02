// 萬物原理第十二課：成像與像素計算的檢查
import assert from 'node:assert/strict';
import { imageDistance, magnification, blurDiameter, imageHeight, pinholeBlur, bayer, bayerCounts, megapixels, exposure } from '../src/cameracalc.js';

const near = (a, b, tol) => Math.abs(a - b) <= tol;
const di = imageDistance(2.7, 8);
assert.ok(near(1 / 2.7, 1 / 8 + 1 / di, 1e-12));                // 薄透鏡公式
assert.ok(di > 2.7);                                             // 像距比焦距長
assert.ok(imageDistance(2.7, 1e9) - 2.7 < 1e-6);                 // 很遠的東西：像在焦點上
assert.ok(imageDistance(2.7, 4) > imageDistance(2.7, 8));        // 越近的東西，像越往後 → 要調焦
assert.ok(imageHeight(1, 8, di) < 0);                            // 影像倒過來
assert.ok(near(magnification(8, di), di / 8, 1e-12));
assert.equal(blurDiameter(1.2, di, di), 0);                      // 對準焦：一個點還是一個點
assert.ok(blurDiameter(2.4, di + 0.5, di) === 2 * blurDiameter(1.2, di + 0.5, di));   // 光圈越大，失焦越糊
assert.ok(pinholeBlur(0.1, 8, 4) < pinholeBlur(0.6, 8, 4));      // 針孔越小越清楚（但越暗）
assert.equal(bayer(0, 0), 0); assert.equal(bayer(0, 1), 1); assert.equal(bayer(1, 0), 1); assert.equal(bayer(1, 1), 2);
const c = bayerCounts(64, 48);
assert.equal(c[1], 2 * c[0]); assert.equal(c[0], c[2]);           // 綠色是紅、藍的兩倍
assert.equal(megapixels(100, 100), 0.01);                        // 1975 年第一台數位相機
assert.ok(near(megapixels(8064, 6048), 48.8, 0.1));              // 4800 萬畫素等級
assert.equal(exposure(2), 4);                                    // 光圈直徑加倍，進光四倍
console.log('camera.test: all passed');
