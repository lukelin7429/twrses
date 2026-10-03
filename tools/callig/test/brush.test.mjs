// 書法寫字引擎 brush.js 的純函式測試：node test/brush.test.mjs
import assert from 'node:assert/strict';
import {
  prepStroke, strokeLength, strokeDuration, sampleAt, footprint, pressDepth, tipTrail, stamps, teardrop, outline,
  forceCurve, speedToPressure, penPressure, smoothTo, bleed, PAPERS, INKS, grindDarkness, HAIR, bendFor, springBack,
  bendGeom, bristles, curveFromStamps, curveMatch, hitStroke,
} from '../src/brush.js';

let n = 0;
const ok = (name, fn) => { fn(); n++; console.log('  ✓', name); };
const near = (a, b, tol, msg) => assert.ok(Math.abs(a - b) <= tol, `${msg ?? ''} ${a} ≈ ${b} (±${tol})`);

// 一條直線：等壓、等速
const line = { pts: [[100, 500, 0.5, 200], [400, 500, 0.5, 200], [700, 500, 0.5, 200]], phases: [1, 2] };

ok('取樣：曲線通過每個控制點，弧長、時間單調增加', () => {
  const s = prepStroke(line, { step: 5 });
  assert.equal(s[0].x, 100); assert.equal(s[s.length - 1].x, 700);
  assert.ok(s.some((q) => Math.abs(q.x - 400) < 1e-9 && Math.abs(q.y - 500) < 1e-9));
  for (let i = 1; i < s.length; i++) { assert.ok(s[i].s > s[i - 1].s); assert.ok(s[i].t > s[i - 1].t); }
  near(strokeLength(s), 600, 1e-6, '直線長度');
  near(strokeDuration(s), 3, 1e-6, '600 單位 ÷ 每秒 200');
  for (const q of s) near(q.y, 500, 1e-9, '直線不會彎');
});

ok('取樣：階段照 phases 分（起筆 0、行筆 1、收筆 2）', () => {
  const s = prepStroke(line, { step: 5 });
  assert.equal(s[0].phase, 0); assert.equal(s[Math.floor(s.length / 2) + 2].phase, 1); assert.equal(s[s.length - 1].phase, 2);
});

ok('取樣：壓力、速度在控制點之間線性內插', () => {
  const s = prepStroke({ pts: [[0, 0, 0, 100], [300, 0, 1, 300]] }, { step: 1 });
  const mid = s.find((q) => Math.abs(q.ctrl - 0.5) < 1e-9);
  near(mid.p, 0.5, 1e-9); near(mid.v, 200, 1e-9);
  // 越來越快：前半段花的時間比後半段多
  const half = sampleAt(s, strokeDuration(s) / 2);
  assert.ok(half.x < 150);
});

ok('sampleAt：頭尾夾住、中間內插', () => {
  const s = prepStroke(line, { step: 5 });
  assert.equal(sampleAt(s, -1).x, 100); assert.equal(sampleAt(s, 99).x, 700);
  near(sampleAt(s, 1.5).x, 400, 1e-6);
});

ok('筆毛印子：越壓越寬越長；沒壓（在空中）沒有印子', () => {
  assert.equal(footprint(0), null);
  const a = footprint(0.2), b = footprint(0.6), c = footprint(1);
  assert.ok(a.hw < b.hw && b.hw < c.hw); assert.ok(a.len < b.len && b.len < c.len);
  near(c.hw * 2, 118, 1e-9, '全壓下去約 118 單位寬（字框的八分之一）');
  assert.ok(pressDepth(0) === 0 && pressDepth(1) > pressDepth(0.5));
});

ok('筆尖往後拖：往右寫，筆尖在左（π）；掉頭時慢慢轉過來', () => {
  const s = prepStroke(line, { step: 2 });
  const tr = tipTrail(s);
  near(Math.abs(tr[tr.length - 1]), Math.PI, 1e-6);
  // 往右走一段再往左回來：剛掉頭時還沒轉完
  const back = prepStroke({ pts: [[100, 500, 0.5, 200], [500, 500, 0.5, 200], [470, 500, 0.5, 200]] }, { step: 1 });
  const tb = tipTrail(back, { lag: 26 });
  const end = tb[tb.length - 1];
  assert.ok(Math.abs(end) > 0.3 && Math.abs(end) < Math.PI - 0.3, `還在轉：${end}`);
});

ok('水滴形：圓頭在筆的位置、尾尖在後面；最寬處＝ 2 × 半寬', () => {
  const st = { x: 0, y: 0, a: 0, hw: 20, len: 50 };
  const pts = teardrop(st, 12);
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  near(Math.max(...xs), 50, 1e-9, '尾尖');
  near(Math.min(...xs), -20, 0.2, '圓頭');
  near(Math.max(...ys) - Math.min(...ys), 40, 1e-9, '寬');
});

ok('外輪廓：直線中段的墨跡寬度＝印子寬度', () => {
  const s = prepStroke(line, { step: 2 });
  const sts = stamps(s);
  const o = outline(sts);
  const i = Math.floor(sts.length / 2);
  near(Math.hypot(o.left[i][0] - o.right[i][0], o.left[i][1] - o.right[i][1]), sts[i].hw * 2, 0.6);
  assert.equal(o.poly.length, sts.length * 2);
});

ok('力道曲線：從 0 到 1、壓力照資料', () => {
  const fc = forceCurve(prepStroke(line, { step: 5 }), 50);
  assert.equal(fc.length, 51); assert.equal(fc[0][0], 0); assert.equal(fc[50][0], 1);
  for (const [, p] of fc) near(p, 0.5, 1e-9);
});

ok('練字板：寫得慢＝粗、寫得快＝細；觸控筆越壓越粗', () => {
  assert.ok(speedToPressure(50) > 0.85, '很慢接近最粗');
  assert.ok(speedToPressure(5000) < 0.16, '很快接近最細');
  for (let v = 0; v < 4000; v += 100) assert.ok(speedToPressure(v + 100) < speedToPressure(v));
  assert.ok(penPressure(0) > 0 && penPressure(1) === 1 && penPressure(0.3) < penPressure(0.7));
  near(smoothTo(0, 1, 10), 1, 1e-6); assert.ok(smoothTo(0, 1, 0.01) < 0.3);
});

ok('暈開（示意）：生宣 > 報紙 > 熟宣 > 影印紙；淡墨在生宣上跑得比濃墨遠', () => {
  for (const ink of Object.keys(INKS)) {
    const r = (k) => bleed(k, ink, 60).rMax;
    assert.ok(r('xuan') > r('news') && r('news') > r('shu') && r('shu') > r('copy'), ink);
    assert.ok(bleed('copy', ink, 60).rMax < 1.15, '影印紙幾乎不擴散');
  }
  assert.ok(bleed('xuan', 'light', 60).rMax > bleed('xuan', 'thick', 60).rMax);
  near(bleed('xuan', 'mid', 0).r, 1, 1e-12, '剛落下＝ 1');
  let prev = 0;
  for (let t = 0; t < 10; t += 0.25) { const r = bleed('xuan', 'mid', t).r; assert.ok(r >= prev); prev = r; }
  near(bleed('xuan', 'mid', 1000).r, bleed('xuan', 'mid', 0).rMax, 1e-9, '最後停在 rMax');
  assert.ok(bleed('copy', 'mid', 5).gloss > bleed('xuan', 'mid', 5).gloss, '影印紙上的墨珠很久才乾');
  assert.equal(Object.keys(PAPERS).length, 4);
});

ok('磨墨（示意）：0 圈＝清水、越磨越黑、永遠不超過 1', () => {
  assert.equal(grindDarkness(0), 0);
  let prev = 0;
  for (let k = 1; k < 400; k++) { const d = grindDarkness(k); assert.ok(d > prev && d < 1); prev = d; }
  assert.ok(grindDarkness(40) > 0.6 && grindDarkness(40) < 0.65);
});

ok('筆毛（示意）：同樣的力道，羊毫彎最多；放開後狼毫彈回最快', () => {
  assert.ok(bendFor('goat', 0.6) > bendFor('mixed', 0.6) && bendFor('mixed', 0.6) > bendFor('weasel', 0.6));
  assert.ok(springBack('weasel', 1, 0.3) < springBack('mixed', 1, 0.3) && springBack('mixed', 1, 0.3) < springBack('goat', 1, 0.3));
  assert.equal(springBack('goat', 1, 0), 1);
  assert.deepEqual(Object.keys(HAIR).sort(), ['goat', 'mixed', 'weasel']);
});

ok('側鋒：往右寫時筆尖偏到上緣（−π/2），中鋒在正後方（π）', () => {
  const s = prepStroke(line, { step: 2 });
  const c = tipTrail(s), d = tipTrail(s, { side: Math.PI / 2 });
  near(Math.abs(c[c.length - 1]), Math.PI, 1e-6);
  near(d[d.length - 1], -Math.PI / 2, 1e-6);
  // 側鋒的墨跡：印子的尾巴朝上，所以整條線上緣到中心線的距離＝ len、下緣＝ hw（扁的，不對稱）
  const st = stamps(s, { side: Math.PI / 2 }), m = st[Math.floor(st.length / 2)];
  const ys = teardrop(m, 12).map((q) => q[1]);
  near(m.y - Math.min(...ys), m.len, 1e-6); near(Math.max(...ys) - m.y, m.hw, 0.2);
});

ok('3D 筆毛彎法：總長＝筆毛長；筆桿直立時和第一課的四分之一圓一樣；斜的筆桿要壓更深才碰到紙', () => {
  const L = 0.45;
  for (const tilt of [0, 0.2, 0.42]) for (const d of [0.02, 0.08, 0.15, 0.26]) {
    const g = bendGeom(L, d, tilt);
    if (!g.touch) continue;
    near(g.b0 + g.arc + g.flat, L, 1e-9, `總長 tilt ${tilt} d ${d}`);
    assert.ok(g.flat >= 0 && g.rc > 0 && g.b0 >= 0);
    near(g.b0 * Math.cos(tilt) + g.rc * (1 - Math.sin(tilt)), L - d, 1e-9, '根部高度');
  }
  const g0 = bendGeom(L, 0.1, 0);
  near(g0.rc, Math.min(1.2 * 0.1, 0.9 * (L - 0.1)), 1e-12); near(g0.offset, g0.rc, 1e-12);
  assert.equal(bendGeom(L, 0, 0).touch, false);
  assert.equal(bendGeom(L, 0.02, 0.42).touch, false, '筆斜 24°，壓 0.02 還碰不到紙');
  assert.equal(bendGeom(L, L * (1 - Math.cos(0.42)) + 0.05, 0.42).touch, true);
});

ok('側鋒的筆毛：固定種子每次一樣、位置 0–1 由小到大', () => {
  const a = bristles(30, 7), b = bristles(30, 7);
  assert.deepEqual(a, b); assert.equal(a.length, 30);
  for (let i = 1; i < a.length; i++) assert.ok(a[i].u > a[i - 1].u);
  assert.ok(a[0].u > 0 && a[a.length - 1].u < 1);
});

ok('練字板的提按曲線：照示範寫＝ 100%，壓力全反過來很低', () => {
  const s = prepStroke({ pts: [[100, 500, 0.1, 200], [300, 500, 0.8, 200], [500, 500, 0.3, 200], [700, 500, 0.6, 200]] }, { step: 2 });
  const model = forceCurve(s, 60), user = curveFromStamps(stamps(s), 60);
  assert.equal(user.length, 61);
  assert.ok(curveMatch(model, user) > 0.97, `${curveMatch(model, user)}`);
  const flipped = user.map(([f, p]) => [f, 0.9 - p]);
  assert.ok(curveMatch(model, flipped) < 0.5);
  assert.equal(curveMatch(model, []), 0);
});

ok('猜下一筆：點在哪一筆上（最近的中心線、太遠不算）', () => {
  const a = prepStroke({ pts: [[100, 300, 0.1, 200], [900, 300, 0.1, 200]] }, { step: 5 });   // 橫
  const b = prepStroke({ pts: [[500, 100, 0.1, 200], [500, 900, 0.1, 200]] }, { step: 5 });   // 豎
  const list = [{ i: 0, s: a }, { i: 1, s: b }];
  assert.equal(hitStroke(list, 200, 310), 0);
  assert.equal(hitStroke(list, 505, 700), 1);
  assert.equal(hitStroke(list, 120, 900), -1, '離每一筆都很遠');
  assert.equal(hitStroke([{ i: 1, s: b }], 200, 310, 70), -1, '只剩豎的時候點橫的位置不算');
});

console.log(`brush.test.mjs: ${n} 項全部通過`);
