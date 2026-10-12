import assert from 'node:assert/strict';
import {
  CLOSE_AT, LIGHTS, MATCH_AT, MATCH_ROUNDS, PIGMENTS, colorName, deltaE, hex, hslToRgb, inkOn, linearToSrgb, luminance,
  matchGrade, mixLight, mixOf, mixPaint, pct, pigmentColor, pigmentPass, rgbToHsl, rgbToHsv, rgbToLab, rgbToLch,
  sliderHints, srgbToLinear, to255,
} from '../src/color.js';

const near = (a, b, eps, msg) => assert.ok(Math.abs(a - b) <= eps, `${msg || ''} expected ${b}, got ${a}`);
const [R, G, B] = LIGHTS.map((l) => l.rgb);
const on = (r, g, b) => mixLight([{ rgb: R, k: r }, { rgb: G, k: g }, { rgb: B, k: b }]);

// ── 光：越加越亮 ──────────────────────────────────────────────────────
assert.deepEqual(to255(on(1, 1, 0)), [255, 255, 0], 'red + green light = yellow');
assert.deepEqual(to255(on(0, 1, 1)), [0, 255, 255], 'green + blue light = cyan');
assert.deepEqual(to255(on(1, 0, 1)), [255, 0, 255], 'red + blue light = magenta');
assert.deepEqual(to255(on(1, 1, 1)), [255, 255, 255], 'red + green + blue light = white');
assert.deepEqual(to255(on(0, 0, 0)), [0, 0, 0], 'no light = black');
assert.deepEqual(to255(on(1, 0.5, 0)), [255, 128, 0], 'full red + half green = orange');
assert.deepEqual(to255(mixLight([{ rgb: [1, 1, 1], k: 0.8 }, { rgb: [1, 1, 1], k: 0.8 }])), [255, 255, 255], 'sum is capped at full');
assert.equal(hex(on(1, 1, 0)), '#ffff00');
// 多開一盞燈，絕不會變暗
for (const [a, b] of [[on(1, 0, 0), on(1, 1, 0)], [on(1, 1, 0), on(1, 1, 1)], [on(0, 0, 1), on(0, 1, 1)]]) {
  assert.ok(luminance(b) > luminance(a), 'adding a light makes the mix brighter');
}

// ── 顏料（示意模型）：越加越暗 ────────────────────────────────────────
const [Y, M, C] = PIGMENTS;
const paint = (y, m, c) => mixPaint([{ absorb: Y.absorb, k: y }, { absorb: M.absorb, k: m }, { absorb: C.absorb, k: c }]);
assert.deepEqual(to255(paint(0, 0, 0)), [255, 255, 255], 'bare paper is white');
assert.deepEqual(pigmentPass(Y.absorb, 0), [1, 1, 1]);
near(pigmentPass(Y.absorb, 1)[2], 0.08, 1e-12, 'a full layer of yellow lets 8% of the blue through');
near(pigmentPass(Y.absorb, 0.5)[2], 0.54, 1e-12, 'half a layer absorbs half as much');
// 每種顏料吸掉最多的那一段：黃吸藍、洋紅吸綠、青吸紅
assert.equal(Y.absorb.indexOf(Math.max(...Y.absorb)), 2);
assert.equal(M.absorb.indexOf(Math.max(...M.absorb)), 1);
assert.equal(C.absorb.indexOf(Math.max(...C.absorb)), 0);
assert.equal(colorName(pigmentColor('y')).key, 'yellow');
assert.equal(colorName(pigmentColor('m')).key, 'magenta');
assert.equal(colorName(pigmentColor('c')).key, 'cyan');
assert.equal(colorName(paint(1, 1, 0)).key, 'red', 'yellow + magenta paint = red');
assert.equal(colorName(paint(1, 0, 1)).key, 'green', 'yellow + cyan paint = green');
assert.equal(colorName(paint(0, 1, 1)).key, 'blue', 'magenta + cyan paint = blue');
assert.equal(colorName(paint(1, 1, 1)).key, 'nearblack', 'all three layers = almost black, not pure black');
assert.deepEqual(to255(paint(1, 1, 0)), [235, 24, 18]);
assert.deepEqual(to255(paint(1, 1, 1)), [19, 22, 18]);
assert.ok(Math.max(...paint(1, 1, 1)) > 0, 'the model never reaches pure black');
// 多塗一層，絕不會變亮
for (const [a, b] of [[paint(1, 0, 0), paint(1, 1, 0)], [paint(1, 1, 0), paint(1, 1, 1)], [paint(0, 0, 1), paint(0, 1, 1)], [paint(0, 0, 0), paint(0.3, 0, 0)]]) {
  assert.ok(luminance(b) < luminance(a), 'adding a layer of paint makes the mix darker');
}
// 順序不影響結果
assert.deepEqual(mixPaint([{ absorb: C.absorb }, { absorb: Y.absorb }]), mixPaint([{ absorb: Y.absorb }, { absorb: C.absorb }]));

// ── 色相／彩度／亮度 ──────────────────────────────────────────────────
assert.deepEqual(rgbToHsl([1, 0, 0]), [0, 1, 0.5]);
assert.deepEqual(rgbToHsl([0, 1, 0]), [120, 1, 0.5]);
assert.deepEqual(rgbToHsl([0, 0, 1]), [240, 1, 0.5]);
assert.deepEqual(rgbToHsl([1, 1, 0]), [60, 1, 0.5]);
assert.deepEqual(rgbToHsl([0, 1, 1]), [180, 1, 0.5]);
assert.deepEqual(rgbToHsl([1, 0, 1]), [300, 1, 0.5]);
assert.deepEqual(rgbToHsl([0.5, 0.5, 0.5]), [0, 0, 0.5]);
assert.deepEqual(rgbToHsv([1, 0.5, 0]), [30, 1, 1]);
assert.deepEqual(rgbToHsv([0.5, 0.5, 0.5]), [0, 0, 0.5]);
for (const c of [[1, 0, 0], [0.2, 0.7, 0.4], [0.9, 0.9, 0.1], [0.1, 0.2, 0.9], [0.3, 0.3, 0.3], [1, 0.5, 0.75]]) {
  hslToRgb(rgbToHsl(c)).forEach((v, i) => near(v, c[i], 1e-9, 'hsl round trip'));
}
hslToRgb([-60, 1, 0.5]).forEach((v, i) => near(v, [1, 0, 1][i], 1e-9, 'negative hue wraps around'));

// ── CIELAB：數字寫死（sRGB、D65）──────────────────────────────────────
near(srgbToLinear(0.5), 0.2140, 1e-4); near(linearToSrgb(srgbToLinear(0.3)), 0.3, 1e-12);
const lab = (c, L, a, b) => { const v = rgbToLab(c); near(v[0], L, 0.02, 'L*'); near(v[1], a, 0.02, 'a*'); near(v[2], b, 0.02, 'b*'); };
lab([1, 1, 1], 100, 0, 0);
lab([0, 0, 0], 0, 0, 0);
lab([1, 0, 0], 53.24, 80.09, 67.20);
lab([0, 1, 0], 87.73, -86.18, 83.18);
lab([0, 0, 1], 32.30, 79.19, -107.86);
lab([1, 1, 0], 97.14, -21.55, 94.48);
near(rgbToLch([0.5, 0.5, 0.5])[1], 0, 0.01, 'gray has no chroma');
near(rgbToLch([1, 0, 0])[2], 40.0, 0.05, 'hue angle of red');
near(luminance([0, 1, 0]), 0.7152, 1e-4); near(luminance([1, 0, 0]), 0.2127, 1e-4); near(luminance([0, 0, 1]), 0.0722, 1e-4);
// 同樣開到最亮，黃比青亮、青比洋紅亮
assert.ok(rgbToLab([1, 1, 0])[0] > rgbToLab([0, 1, 1])[0] && rgbToLab([0, 1, 1])[0] > rgbToLab([1, 0, 1])[0]);

// ── 色差 ──────────────────────────────────────────────────────────────
assert.equal(deltaE([0.3, 0.6, 0.9], [0.3, 0.6, 0.9]), 0);
near(deltaE([1, 1, 1], [0, 0, 0]), 100, 0.01, 'black to white');
near(deltaE([1, 0, 0], [0, 1, 0]), 170.57, 0.05, 'red to green');
near(deltaE([1, 0, 0], [0, 0, 1]), 176.31, 0.05, 'red to blue');
near(deltaE([0.2, 0.4, 0.6], [0.6, 0.4, 0.2]), deltaE([0.6, 0.4, 0.2], [0.2, 0.4, 0.6]), 1e-12, 'symmetric');
assert.equal(matchGrade(0).key, 'match'); assert.equal(matchGrade(MATCH_AT).key, 'match');
assert.equal(matchGrade(MATCH_AT + 0.1).key, 'close'); assert.equal(matchGrade(CLOSE_AT + 0.1).key, 'near'); assert.equal(matchGrade(60).key, 'far');
// 每個等級都有不靠顏色的記號
assert.equal(new Set([0, 10, 20, 60].map((d) => matchGrade(d).mark)).size, 4);

// ── 顏色名稱 ──────────────────────────────────────────────────────────
const name = (c) => colorName(c).key;
assert.equal(name([1, 0, 0]), 'red'); assert.equal(name([0, 1, 0]), 'green'); assert.equal(name([0, 0, 1]), 'blue');
assert.equal(name([1, 1, 0]), 'yellow'); assert.equal(name([0, 1, 1]), 'cyan'); assert.equal(name([1, 0, 1]), 'magenta');
assert.equal(name([1, 1, 1]), 'white'); assert.equal(name([0, 0, 0]), 'black'); assert.equal(name([0.5, 0.5, 0.5]), 'gray');
assert.equal(name([1, 0.5, 0]), 'orange'); assert.equal(name([1, 0.5, 0.75]), 'pink'); assert.equal(name([0.5, 0.25, 0]), 'brown');
assert.equal(name([0.5, 0, 0]), 'darkred'); assert.equal(name([0.6, 0, 1]), 'purple'); assert.equal(name([0.8, 0.8, 0.8]), 'lightgray');
assert.deepEqual(colorName([0, 1, 1]), { key: 'cyan', en: 'Cyan', zh: '青' });
assert.deepEqual(colorName([1, 0, 1]), { key: 'magenta', en: 'Magenta', zh: '洋紅' });
assert.equal(inkOn([1, 1, 0]), '#10131c'); assert.equal(inkOn([0, 0, 1]), '#ffffff');
assert.equal(pct(0.5), '50%'); assert.equal(pct(1.4), '100%');

// ── 「調出這個顏色」──────────────────────────────────────────────────
assert.equal(MATCH_ROUNDS.filter((r) => r.mode === 'light').length, 4);
assert.equal(MATCH_ROUNDS.filter((r) => r.mode === 'paint').length, 4);
const names = MATCH_ROUNDS.map((r) => `${r.mode}:${colorName(mixOf(r.mode, r.mix)).key}`);
assert.deepEqual(names, ['light:yellow', 'light:orange', 'light:gray', 'light:pink', 'paint:red', 'paint:green', 'paint:orange', 'paint:darkblue']);
for (const r of MATCH_ROUNDS) {
  // 滑桿一格 5%：每一題都調得出來，而且一開始（光全關、顏料全沒塗）不算調出來
  assert.ok(r.mix.every((v) => Math.abs(v * 20 - Math.round(v * 20)) < 1e-9), 'targets sit on slider steps');
  assert.equal(deltaE(mixOf(r.mode, r.mix), mixOf(r.mode, r.mix)), 0);
  assert.ok(deltaE(mixOf(r.mode, [0, 0, 0]), mixOf(r.mode, r.mix)) > CLOSE_AT, 'the starting point is not already close');
  // 差一格（5%）仍然算調出來；差四格就不算
  const off1 = r.mix.map((v, i) => (i === 0 ? (v >= 1 ? v - 0.05 : v + 0.05) : v));
  assert.ok(deltaE(mixOf(r.mode, off1), mixOf(r.mode, r.mix)) <= MATCH_AT, `one step off still matches (${r.mode} ${r.mix})`);
}
assert.deepEqual(sliderHints([0.5, 1, 0], [1, 1, 0.5]), [1, 0, 1]);
assert.deepEqual(sliderHints([1, 0.55, 0.3], [0.5, 0.5, 0]), [-1, 0, -1]);

console.log('color.test.mjs: all assertions passed');
