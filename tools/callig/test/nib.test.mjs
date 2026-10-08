// 檢查第十四課平頭筆的純函式（src/nib.js）：node test/nib.test.mjs
// 課文說的事要成立：筆嘴角度 30° 時，豎的線比橫的線粗；順著筆嘴方向走最細、垂直筆嘴最粗；線寬和「按多重」無關（函式根本沒有壓力這個參數）；
// 把筆嘴轉成 90°，就變成橫粗豎細。
import assert from 'node:assert/strict';
import { LETTERS, NIB_W, edge, nibWidth, rad, resample, smooth, sweep, widthStats, wordStrokes } from '../src/nib.js';

const W = 100, n30 = rad(30), near = (a, b, e = 1e-6) => Math.abs(a - b) < e;
assert.ok(near(nibWidth(W, rad(0), n30), 50), '橫線：W·sin30°＝一半');
assert.ok(near(nibWidth(W, rad(-90), n30), W * Math.cos(n30)), '豎線：W·cos30°');
assert.ok(nibWidth(W, rad(-90), n30) > nibWidth(W, rad(0), n30), '30°：豎粗橫細');
assert.ok(near(nibWidth(W, n30, n30), 0), '順著筆嘴走：最細');
assert.ok(near(nibWidth(W, n30 + Math.PI / 2, n30), W), '垂直筆嘴走：最粗');
assert.ok(near(nibWidth(W, rad(0), n30), nibWidth(W, rad(180), n30)), '來回一樣粗');
assert.ok(nibWidth(W, rad(0), rad(90)) > nibWidth(W, rad(-90), rad(90)), '筆嘴 90°：橫粗豎細');
assert.equal(nibWidth.length, 3, '線寬只看筆嘴寬、方向、筆嘴角度，沒有壓力');
const [ex, ey] = edge(n30); assert.ok(near(Math.hypot(ex, ey), 1) && ey < 0, '筆嘴的邊往右上（畫布 y 往下）');
const line = resample([[0, 0], [100, 0]], 10); assert.equal(line.length, 11); assert.ok(near(line[10].s, 100));
const v = widthStats(sweep([[0, 0], [0, 300]], W, n30)), h = widthStats(sweep([[0, 0], [300, 0]], W, n30));
assert.ok(near(v.avg, W * Math.cos(n30), 1e-3) && near(h.avg, 50, 1e-3));
for (const [k, L] of Object.entries(LETTERS)) {
  assert.ok(L.strokes.length >= 2, `${k}：至少兩筆`);
  for (const st of L.strokes) {
    assert.ok(st.en && st.zh);
    for (const [x, y] of st.pts) assert.ok(x >= 60 && x <= 960 && y >= 280 && y <= 720, `${k}：點要在 x 高度裡`);
    const P = smooth(st.pts); assert.ok(P.length > st.pts.length);
  }
  const o = widthStats(L.strokes.flatMap((st) => sweep(smooth(st.pts), NIB_W, n30)));
  assert.ok(o.max > o.min * 2.5, `${k}：一個字母裡最粗至少是最細的 2.5 倍`);
}
assert.equal(wordStrokes().length, 6);
console.log('nib: ok');
