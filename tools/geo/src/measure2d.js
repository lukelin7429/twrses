/*
 * 地理 Geography ·「量一量」（不需要 WebGL）：在示意小鎮的地圖上拖一把尺（兩個端點），用比例尺換算地面上的距離。
 * 地圖假想印成 20 公分寬：看整座島（10 公里）是 1:50,000，看小鎮（2.5 公里）是 1:12,500，看街區（1 公里）是 1:5,000。
 * 讀數：尺在「印出來的地圖」上有幾公分 → 乘上比例尺分母 → 地面上幾公尺；並和直接用座標算出來的距離對照（town.js 的換算有測試）。
 * 除錯：document.querySelector('[data-gg-measure]').__measure（state、setView('island'|'town'|'street')、setRuler([x, y], [x, y])、info()）
 */
import { distKm, POINTS, printScale, ratioToGround } from './town.js';
import { drawBar, drawNorth, drawTownMap } from './townmap2d.js';

export const PRINT_CM = 20;
export const VIEWS = {
  island: { cx: -0.6, cy: -0.3, km: 10 },
  town: { cx: -1.45, cy: -1.55, km: 2.5 },
  street: { cx: -1.6, cy: -1.25, km: 1 },
};

export function initMeasure(root) {
  const $ = (s) => root.querySelector(s);
  const cv = $('.gg-ms-cv'), ctx = cv.getContext('2d');
  const P = (k) => [POINTS[k].x, POINTS[k].y];
  const state = { view: 'island', a: P('school'), b: P('harbor'), drag: null };
  let base = null, map = null, W = 0, H = 0, dpr = 1;
  function render() {
    W = cv.clientWidth; H = cv.clientHeight; if (!W || !H) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    base = document.createElement('canvas'); base.width = cv.width; base.height = cv.height;
    const b = base.getContext('2d'); b.setTransform(dpr, 0, 0, dpr, 0, 0);
    map = drawTownMap(b, W, H, { view: VIEWS[state.view], dpr });
    drawNorth(b, W - 30, 34);
    drawBar(b, 14, H - 16, map.pxPerKm, W * 0.32);
    draw();
  }
  const info = () => {
    const v = VIEWS[state.view], scale = printScale(PRINT_CM, v.km), km = distKm(state.a, state.b);
    const cm = km / v.km * PRINT_CM;
    return { scale, cm, meters: ratioToGround(cm, scale), km };
  };
  function draw() {
    if (!base) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.drawImage(base, 0, 0); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const [ax, ay] = map.toXY(...state.a), [bx, by] = map.toXY(...state.b), ang = Math.atan2(by - ay, bx - ax), len = Math.hypot(bx - ax, by - ay);
    // 尺：一條半透明的帶子，每 1 公分（印出來的）一個刻度
    ctx.save(); ctx.translate(ax, ay); ctx.rotate(ang);
    ctx.fillStyle = 'rgba(255,248,220,.82)'; ctx.strokeStyle = '#7a5a12'; ctx.lineWidth = 1;
    ctx.fillRect(0, -9, len, 18); ctx.strokeRect(0, -9, len, 18);
    const pxPerCm = W / PRINT_CM;
    ctx.fillStyle = '#7a5a12'; ctx.font = '700 9px system-ui, sans-serif'; ctx.textAlign = 'center';
    for (let c = 0, i = 0; c <= len + 0.5; c += pxPerCm / 2, i++) { ctx.fillRect(c - 0.5, -9, 1, i % 2 ? 4 : 8); if (i % 2 === 0 && i > 0 && pxPerCm > 14) ctx.fillText(String(i / 2), c, 8); }
    ctx.restore();
    for (const [x, y, t] of [[ax, ay, 'A'], [bx, by, 'B']]) {
      ctx.beginPath(); ctx.arc(x, y, 10, 0, Math.PI * 2); ctx.fillStyle = '#b8860b'; ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.font = '800 11px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText(t, x, y + 4);
    }
    const i = info(), n = (v) => Math.round(v).toLocaleString('en-US');
    $('.gg-ms-scale').textContent = `1 : ${n(i.scale)}`;
    $('.gg-ms-means').textContent = `1 cm = ${i.scale / 100 >= 1000 ? (i.scale / 100000) + ' km' : n(i.scale / 100) + ' m'}`;
    const cm1 = Math.round(i.cm * 10) / 10, m1 = ratioToGround(cm1, i.scale);   // 用讀到的（四捨五入後的）公分數來算，算式才對得起來
    $('.gg-ms-cm').textContent = `${cm1.toFixed(1)} cm`;
    $('.gg-ms-calc').textContent = `${cm1.toFixed(1)} × ${n(i.scale)} = ${n(cm1 * i.scale)} cm`;
    $('.gg-ms-ground').textContent = m1 >= 1000 ? `${(m1 / 1000).toFixed(2)} km` : `${n(m1)} m`;
    root.querySelectorAll('[data-mv]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mv === state.view)));
  }
  const local = (e) => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * (W / r.width), (e.clientY - r.top) * (H / r.height)]; };
  const hitEnd = (px, py) => ['a', 'b'].find((k) => { const [x, y] = map.toXY(...state[k]); return Math.hypot(px - x, py - y) < 18; });
  cv.addEventListener('touchstart', (e) => { const t = e.touches[0], r = cv.getBoundingClientRect(); if (hitEnd((t.clientX - r.left) * (W / r.width), (t.clientY - r.top) * (H / r.height))) e.preventDefault(); }, { passive: false });
  cv.addEventListener('pointerdown', (e) => { const [px, py] = local(e), k = hitEnd(px, py); if (!k) return; state.drag = k; try { cv.setPointerCapture(e.pointerId); } catch (err) { /* 沒有也沒關係 */ } });
  cv.addEventListener('pointermove', (e) => {
    const [px, py] = local(e);
    if (!state.drag) { cv.style.cursor = hitEnd(px, py) ? 'grab' : ''; return; }
    state[state.drag] = map.toKm(Math.max(4, Math.min(W - 4, px)), Math.max(4, Math.min(H - 4, py))); draw();
  });
  const end = () => { state.drag = null; }; cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
  const api = {
    state, info,
    setView(v) {
      state.view = v; const c = VIEWS[v];
      const inView = (p) => Math.abs(p[0] - c.cx) < c.km * 0.45 && Math.abs(p[1] - c.cy) < c.km * 0.45;
      if (!inView(state.a) || !inView(state.b)) { state.a = [c.cx - c.km * 0.3, c.cy - c.km * 0.15]; state.b = [c.cx + c.km * 0.25, c.cy + c.km * 0.2]; }
      render();
    },
    setRuler(a, b) { state.a = a; state.b = b; draw(); },
  };
  root.querySelectorAll('[data-mv]').forEach((b) => b.addEventListener('click', () => api.setView(b.dataset.mv)));
  root.querySelectorAll('[data-pair]').forEach((b) => b.addEventListener('click', () => { const [p, q] = b.dataset.pair.split(','); api.setView('island'); api.setRuler(P(p), P(q)); }));
  new ResizeObserver(render).observe(cv);
  render();
  root.__measure = api;
  return api;
}
