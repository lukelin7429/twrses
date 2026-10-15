/*
 * 地理 Geography ·「從等高線到剖面」（不需要 WebGL）：在等高線地圖上拖兩個端點，下面即時畫出沿線的高度剖面。
 * 除錯：document.querySelector('[data-gg-profile]').__profile（state.a、state.b、setLine([x, y], [x, y])、stats()）
 */
import { pathStats, profile, sampleGrid } from './terrain.js';
import { drawContourMap, drawProfile } from './contourmap2d.js';

export function initProfile(root, M) {
  const $ = (s) => root.querySelector(s);
  const cv = $('.gg-pf-map'), pcv = $('.gg-pf-prof'), ctx = cv.getContext('2d'), pctx = pcv.getContext('2d');
  const grid = sampleGrid(M.h, M.box, 161);
  const state = { a: [-3.8, 0.75], b: [3.2, -1.4], drag: null };
  let base = null, map = null, W = 0, H = 0, dpr = 1;
  function resize() {
    W = cv.clientWidth; H = cv.clientHeight; if (!W || !H) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    base = document.createElement('canvas'); base.width = cv.width; base.height = cv.height;
    const b = base.getContext('2d'); b.setTransform(dpr, 0, 0, dpr, 0, 0);
    map = drawContourMap(b, W, H, { M, grid, interval: 100, dpr });
    draw();
  }
  const stats = () => pathStats(M.h, state.a, state.b);
  function draw() {
    if (!base) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.drawImage(base, 0, 0); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const [ax, ay] = map.toXY(...state.a), [bx, by] = map.toXY(...state.b);
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
    ctx.strokeStyle = '#ff5a8a'; ctx.lineWidth = 2.2; ctx.stroke();
    for (const [x, y, t] of [[ax, ay, 'A'], [bx, by, 'B']]) {
      ctx.beginPath(); ctx.arc(x, y, 10, 0, Math.PI * 2); ctx.fillStyle = '#ff5a8a'; ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.font = '800 11px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText(t, x, y + 4);
    }
    const pw = pcv.clientWidth, ph = pcv.clientHeight;
    if (pw && ph) {
      pcv.width = Math.round(pw * dpr); pcv.height = Math.round(ph * dpr); pctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const pr = profile(M.h, state.a, state.b, 160);
      const { X, Y } = drawProfile(pctx, pw, ph, [{ pts: pr, color: '#ff5a8a' }]);
      pctx.fillStyle = '#fff'; pctx.font = '800 11px system-ui, sans-serif'; pctx.textAlign = 'center';
      pctx.fillText('A', X(0) + 6, Y(pr[0].z) - 8); pctx.fillText('B', X(pr[pr.length - 1].d) - 6, Y(pr[pr.length - 1].z) - 8);
    }
    const s = stats(), m = (v) => `${Math.round(v).toLocaleString('en-US')} m`;
    $('.gg-pf-len').textContent = `${s.len.toFixed(1)} km`;
    $('.gg-pf-ends').textContent = `${m(Math.max(0, s.z0))} → ${m(Math.max(0, s.z1))}`;
    $('.gg-pf-top').textContent = m(s.top);
    $('.gg-pf-climb').textContent = m(s.climb);
    $('.gg-pf-max').textContent = `${s.maxDeg.toFixed(0)}°`;
  }
  const local = (e) => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * (W / r.width), (e.clientY - r.top) * (H / r.height)]; };
  const hitEnd = (px, py) => ['a', 'b'].find((k) => { const [x, y] = map.toXY(...state[k]); return Math.hypot(px - x, py - y) < 18; });
  cv.addEventListener('touchstart', (e) => { const t = e.touches[0], r = cv.getBoundingClientRect(); if (hitEnd((t.clientX - r.left) * (W / r.width), (t.clientY - r.top) * (H / r.height))) e.preventDefault(); }, { passive: false });
  cv.addEventListener('pointerdown', (e) => {
    const [px, py] = local(e), k = hitEnd(px, py);
    if (!k) return;
    state.drag = k; try { cv.setPointerCapture(e.pointerId); } catch (err) { /* 沒有也沒關係 */ }
  });
  cv.addEventListener('pointermove', (e) => {
    const [px, py] = local(e);
    if (!state.drag) { cv.style.cursor = hitEnd(px, py) ? 'grab' : ''; return; }
    const [x, y] = map.toKm(px, py), [x0, y0, x1, y1] = M.box;
    state[state.drag] = [Math.max(x0, Math.min(x1, x)), Math.max(y0, Math.min(y1, y))];
    draw();
  });
  const end = () => { state.drag = null; };
  cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
  root.querySelectorAll('[data-line]').forEach((b) => b.addEventListener('click', () => {
    const L = { across: [[-3.8, 0.75], [3.2, -1.4]], peaks: [[-1, 0.75], [1.25, -1]], valley: [[-2.2, -1.2], [1.2, -1.6]], ns: [[-1, 4.2], [-1, -4.2]] }[b.dataset.line];
    api.setLine(...L);
  }));
  const api = { state, stats, setLine(a, b) { state.a = a; state.b = b; draw(); } };
  new ResizeObserver(resize).observe(cv);
  resize();
  root.__profile = api;
  return api;
}
