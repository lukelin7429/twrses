// 第十二課的恆星顏色：node test/starcolor.test.mjs（有 assert）
// 黑體顏色對照 Mitchell Charity 的黑體色表（2° CIE、sRGB）：1000 K #ff3800、3000 K #ffb46b、4000 K #ffd1a3、10000 K #ccdbff
import assert from 'node:assert/strict';
import { bbColor, bvToT, wienPeak, spectralClass, colorName, peakBand, TEMPS, SUN_T } from '../src/starcolor.js';
import { starByKey } from '../src/distance.js';

const near = (a, b, tol = 14) => a.every((v, i) => Math.abs(v - b[i]) <= tol);
for (const [T, rgb] of [[1000, [255, 56, 0]], [3000, [255, 180, 107]], [4000, [255, 209, 163]], [10000, [204, 219, 255]]]) {
  const c = bbColor(T);
  console.log(`${T} K → rgb(${c.join(', ')})   expected ≈ rgb(${rgb.join(', ')})`);
  assert.ok(near(c, rgb), `${T} K color`);
}
// 太陽（5772 K）幾乎是白的；6500 K 最接近純白
const sun = bbColor(SUN_T), w = bbColor(6500);
assert.ok(Math.min(...sun) > 225 && Math.min(...w) > 245, 'Sun is white');
// 紅冷藍熱：溫度越高，藍色成分越多、紅色成分越少
for (let T = 2000; T < 30000; T *= 1.3) { const a = bbColor(T), b = bbColor(T * 1.3); assert.ok(b[2] >= a[2] && b[0] <= a[0]); }
// 維恩：太陽的光在 502 nm（綠光）最強——卻看起來是白的（迷思段）
assert.ok(Math.abs(wienPeak(SUN_T) - 502) < 1 && peakBand(SUN_T).en === 'green');
assert.equal(peakBand(3600).en, 'infrared'); assert.equal(peakBand(25300).en, 'ultraviolet');
// B−V → 溫度（Ballesteros 2012）：太陽 B−V 0.65 → 5,778 K
assert.ok(Math.abs(bvToT(0.65) - SUN_T) < 50);
// Hipparcos 的 B−V 換出來的溫度，和文獻值相差 12% 以內（中等溫度的星；熱星的 B−V 幾乎不變，公式會低估；參宿四是變星，B−V 1.5–1.85）
for (const k of ['betelgeuse', 'aldebaran', 'arcturus', 'procyon', 'acen', 'sirius', 'vega']) {
  const s = starByKey(k), t = bvToT(s.bv);
  console.log(`${s.en.padEnd(15)} B−V ${s.bv.toFixed(2)} → ${Math.round(t)} K (${spectralClass(t)}); literature ${TEMPS[k]} K (${spectralClass(TEMPS[k])})`);
  assert.ok(Math.abs(t - TEMPS[k]) / TEMPS[k] < 0.12, `${k} temperature`);
}
// 光譜型與顏色名稱
assert.deepEqual(['betelgeuse', 'arcturus', 'sun', 'procyon', 'sirius', 'rigel', 'spica'].map((k) => spectralClass(TEMPS[k])), ['M', 'K', 'G', 'F', 'A', 'B', 'B']);
assert.equal(colorName(TEMPS.betelgeuse).zh, '橙紅色'); assert.equal(colorName(TEMPS.rigel).zh, '藍白色'); assert.equal(colorName(SUN_T).zh, '黃白色');
console.log('starcolor: all good');
