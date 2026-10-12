import assert from 'node:assert/strict';
import { colorName, to255 } from '../src/color.js';
import {
  LAMPS, LAYOUTS, OBJ, SPOT_R, WALL, clampSpot, lightParts, regions, shadowMask, shadowOnWall, spotMask, wallColor, wallLight, wallPaint,
} from '../src/lights.js';

const near = (a, b, eps, msg) => assert.ok(Math.abs(a - b) <= eps, `${msg || ''} expected ${b}, got ${a}`);
const state = (layout, over = {}) => ({
  mode: 'light', r: SPOT_R, lamps: LAMPS, obj: { ...OBJ },
  spots: LAYOUTS[layout].map(([x, y]) => ({ x, y, k: 1, on: true })), ...over,
});
const name = (c) => colorName(c).key;

// 光斑：圓內 1、圓外 0
assert.equal(spotMask(0), 1); assert.equal(spotMask(SPOT_R - 0.5), 1); assert.equal(spotMask(SPOT_R), 0); assert.equal(spotMask(SPOT_R + 1), 0);
assert.ok(spotMask(SPOT_R - 0.1) > 0 && spotMask(SPOT_R - 0.1) < 1, 'soft edge');

// ── 光：預設的三圓排法，七個區域的顏色 ────────────────────────────────
const venn = state('venn');
const rg = regions(venn);
for (let k = 1; k < 8; k++) assert.ok(rg[k].area > 0.3, `region ${k} exists in the default layout`);
const at = (k, st = venn) => { const r = regions(st)[k]; return wallColor(r.x, r.y, st); };
assert.deepEqual(to255(at(1)), [255, 0, 0], 'red alone');
assert.deepEqual(to255(at(2)), [0, 255, 0], 'green alone');
assert.deepEqual(to255(at(4)), [0, 0, 255], 'blue alone');
assert.deepEqual(to255(at(3)), [255, 255, 0], 'red + green = yellow');
assert.deepEqual(to255(at(6)), [0, 255, 255], 'green + blue = cyan');
assert.deepEqual(to255(at(5)), [255, 0, 255], 'red + blue = magenta');
assert.deepEqual(to255(at(7)), [255, 255, 255], 'all three = white');
assert.deepEqual(to255(wallLight(-6, 0.5, venn)), [0, 0, 0], 'the unlit wall is black in a dark room');

// 亮度與開關
const dim = state('venn'); dim.spots[1].k = 0.5;
assert.deepEqual(to255(at(3, dim)), [255, 128, 0], 'full red + half green = orange');
const off = state('venn'); off.spots[2].on = false;
assert.equal(regions(off)[7].area, 0, 'no triple overlap when blue is off');
assert.deepEqual(to255(wallColor(rg[7].x, rg[7].y, off)), [255, 255, 0], 'where white was, yellow is left');

// 排法
assert.equal(regions(state('apart'))[3].area, 0, 'apart: no overlaps');
assert.equal(regions(state('apart'))[7].area, 0);
const tg = regions(state('together'));
assert.ok(tg[7].area > 8 && tg[1].area === 0 && tg[3].area === 0, 'together: one white disc');

// ── 彩色的影子 ────────────────────────────────────────────────────────
// 三盞燈打在同一個地方（白），中間放一顆球：每盞燈各有一個影子，影子裡少了那盞燈的光
const sh = state('together', { obj: { ...OBJ, on: true } });
const C = [OBJ.x, OBJ.y, OBJ.z];
const s = LAMPS.map((L) => shadowOnWall(L, C, OBJ.rad));
near(s[1].x, 0, 1e-9); assert.ok(s[0].x > 0.4 && s[2].x < -0.4, 'the left lamp throws its shadow to the right');
assert.ok(s[1].y > s[0].y + 0.2, 'the low lamp in the middle throws its shadow higher');
near(s[0].r, OBJ.rad * 6 / (6 - OBJ.z), 1e-9, 'the shadow is bigger than the ball');
assert.equal(shadowMask([s[0].x, s[0].y, 0], LAMPS[0], C, OBJ.rad), 0, 'center of the shadow is fully blocked');
assert.equal(shadowMask([5, 6, 0], LAMPS[0], C, OBJ.rad), 1, 'far from the shadow the light arrives');
// 三個影子部分重疊：只擋住一盞燈的地方是青、洋紅、黃；擋住兩盞的地方是藍、紅、綠；三盞都擋住是黑
const onlyR = [s[0].x + 0.5, s[0].y - 0.15], onlyB = [s[2].x - 0.5, s[2].y - 0.15], onlyG = [0, s[1].y + 0.6];
assert.deepEqual(lightParts(...onlyR, sh), [0, 1, 1]);
assert.deepEqual(to255(wallColor(...onlyR, sh)), [0, 255, 255], 'the red lamp’s shadow is cyan');
assert.deepEqual(to255(wallColor(...onlyB, sh)), [255, 255, 0], 'the blue lamp’s shadow is yellow');
assert.deepEqual(to255(wallColor(...onlyG, sh)), [255, 0, 255], 'the green lamp’s shadow is magenta');
assert.deepEqual(to255(wallColor(0.45, 4.3, sh)), [0, 0, 255], 'red and green both blocked: only blue arrives');
assert.deepEqual(to255(wallColor(-0.45, 4.3, sh)), [255, 0, 0], 'green and blue both blocked: only red arrives');
assert.deepEqual(to255(wallColor(0, 3.15, sh)), [0, 255, 0], 'red and blue both blocked: only green arrives');
assert.deepEqual(to255(wallColor(0, 3.75, sh)), [0, 0, 0], 'all three blocked: black');
assert.deepEqual(to255(wallColor(0, 7.3, state('together'))), [0, 0, 0], 'outside the spots stays dark');
assert.equal(name(wallColor(0, 5.4, sh)), 'white', 'next to the shadows the wall is still white');
// 球關掉就沒有影子
assert.deepEqual(to255(wallColor(...onlyR, state('together'))), [255, 255, 255]);

// ── 顏料：同一個排法，換成色片 ────────────────────────────────────────
const pv = state('venn', { mode: 'paint' });
assert.deepEqual(to255(wallPaint(-6, 0.5, pv)), [255, 255, 255], 'bare wall is white');
assert.equal(name(at(1, pv)), 'yellow'); assert.equal(name(at(2, pv)), 'magenta'); assert.equal(name(at(4, pv)), 'cyan');
assert.equal(name(at(3, pv)), 'red', 'yellow + magenta = red');
assert.equal(name(at(6, pv)), 'blue', 'magenta + cyan = blue');
assert.equal(name(at(5, pv)), 'green', 'yellow + cyan = green');
assert.equal(name(at(7, pv)), 'nearblack', 'all three = almost black');
const thin = state('venn', { mode: 'paint' }); thin.spots.forEach((p) => { p.k = 0.3; });
assert.ok(Math.min(...at(7, thin)) > Math.max(...at(7, pv)), 'thin layers absorb less');

// 圓心留在牆面裡
assert.deepEqual(clampSpot(99, 99), [WALL.w / 2 - 0.6, WALL.cy + WALL.h / 2 - 0.6]);
assert.deepEqual(clampSpot(0.5, 3), [0.5, 3]);

console.log('lights.test.mjs: all assertions passed');
