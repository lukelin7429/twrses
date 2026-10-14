import assert from 'node:assert/strict';
import { colorAt, extent, formatValue, norm, PALETTE, popSide, ranked, ringArea, TILES, TILE_COLS, TILE_ROWS, W, H } from '../src/usmap.js';

import { getStates, META } from '../src/usmap.js';
const RAW = { meta: META };
const states = getStates();
const ab = states.map((s) => s.abbr);
assert.equal(states.length, 51, '50 states and DC');
assert.ok(!ab.includes('PR'), 'territories are not drawn');
assert.equal(new Set(ab).size, 51);
assert.ok(/Census Bureau/.test(RAW.meta.source) && /acknowledgement/.test(RAW.meta.source), 'the credit the Census Bureau asks for');
const bb = (s) => { let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9; for (const r of s.rings) for (const [x, y] of r) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); } return [x0, y0, x1, y1]; };
for (const s of states) {
  const [x0, y0, x1, y1] = bb(s);
  assert.ok(x0 >= -5 && y0 >= -5 && x1 <= W + 5 && y1 <= H + 5, `${s.abbr} inside the canvas`);
  assert.ok(s.rings.length >= 1);
}
const B = Object.fromEntries(states.map((s) => [s.abbr, bb(s)]));
const cx = (k) => (B[k][0] + B[k][2]) / 2, cy = (k) => (B[k][1] + B[k][3]) / 2;
assert.ok(cx('CA') < cx('NV') && cx('NV') < cx('CO') && cx('CO') < cx('KS') && cx('KS') < cx('OH') && cx('OH') < cx('NJ'), 'west to east');
assert.ok(cy('ND') < cy('SD') && cy('SD') < cy('NE') && cy('NE') < cy('KS') && cy('KS') < cy('OK') && cy('OK') < cy('TX'), 'north to south');
assert.ok(cx('AK') < cx('CA') && cy('AK') > cy('WA') && cx('HI') < cx('TX') && cy('HI') > cy('CA'), 'Alaska and Hawaii are inset at the lower left');
// 等積投影：陸地面積的比例在畫面上大致保留（本土各州；阿拉斯加縮小過，不比）
const area = (k) => states.find((s) => s.abbr === k).rings.reduce((a, r) => a + Math.abs(ringArea(r)), 0);
const land = (k) => states.find((s) => s.abbr === k).aland;
const ratio = (a, b) => (area(a) / area(b)) / (land(a) / land(b));
for (const [a, b] of [['TX', 'CO'], ['MT', 'IA'], ['CA', 'PA']]) assert.ok(Math.abs(ratio(a, b) - 1) < 0.08, `${a}/${b} area ratio ${ratio(a, b).toFixed(3)}`);

// 方塊地圖：每州一格、格子不重複、都在範圍內
assert.deepEqual(Object.keys(TILES).sort(), ab.slice().sort());
const cells = new Set(Object.values(TILES).map(([c, r]) => `${c},${r}`));
assert.equal(cells.size, 51);
for (const [c, r] of Object.values(TILES)) assert.ok(c >= 0 && c < TILE_COLS && r >= 0 && r < TILE_ROWS);
assert.ok(TILES.WA[0] < TILES.MN[0] && TILES.MN[0] < TILES.NY[0] && TILES.ND[1] < TILES.TX[1]);

// 著色與格式
assert.deepEqual(extent({ a: 3, b: null, c: -1, d: 7 }), [-1, 7]);
assert.equal(norm(5, 0, 10), 0.5); assert.equal(norm(20, 0, 10), 1); assert.equal(norm(3, 3, 3), 0.5);
assert.equal(colorAt(0), PALETTE[0]); assert.equal(colorAt(1), PALETTE[PALETTE.length - 1]);
for (const c of PALETTE) { const [r, g, b] = [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16)); assert.ok(!(r > 180 && g < 90 && b < 90) && !(b > 180 && r < 90 && g < 120), `${c} is neither party red nor party blue`); }
assert.equal(formatValue(1787, 'year'), '1787'); assert.equal(formatValue(7.25, 'pct'), '7.25%'); assert.equal(formatValue(6.0, 'pct'), '6%');
assert.equal(formatValue(39538223, 'int'), '39,538,223'); assert.equal(formatValue(null, 'pct'), '—');
assert.deepEqual(ranked({ a: 2, b: 5, c: null, d: 5 }), [['b', 5], ['d', 5], ['a', 2]]);
assert.deepEqual(ranked({ a: 2, b: 5 }, true), [['a', 2], ['b', 5]]);
assert.ok(Math.abs(popSide(100, 100, 50) - 46) < 1e-9); assert.ok(Math.abs(popSide(25, 100, 50) - 23) < 1e-9);
console.log('usmap.test ok');
