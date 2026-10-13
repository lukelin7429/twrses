/*
 * 美術 Art · 畫板（共用工具；滑鼠、手指、觸控筆都能畫）。筆畫的幾何在 stroke.js（純函式）。
 *
 *   paintStroke(ctx, pts, brush, { upTo, seed, ink })   把一筆畫到 2D context 上（邏輯座標 800 × 500；先自己 scale）
 *   createPad(canvas, { brush, guide, onStroke })       → { strokes, setBrush(key), undo(), clear(), replay(), redraw(), busy() }
 *
 * canvas 的 width／height 屬性是邏輯大小（800 × 500）的整數倍（依螢幕解析度），CSS 寬度隨版面縮放。
 * 畫的時候不捲動頁面（touch-action: none 寫在 CSS），pointer capture 讓筆畫到畫板外面也不會斷。
 * 觸控筆有回報壓力就用壓力決定粗細；滑鼠和手指沒有，就用速度（慢＝粗、快＝細）。
 */
import { BRUSHES, PAD_H, PAD_W, segments } from './stroke.js';

export const PAPER = '#fbf8f0', INK = '#16181d';

export function paintStroke(ctx, pts, brush, { upTo = Infinity, seed = 7, ink = INK } = {}) {
  if (!pts.length) return;
  ctx.strokeStyle = ink; ctx.fillStyle = ink; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (pts.length === 1) { ctx.beginPath(); ctx.arc(pts[0].x, pts[0].y, brush.max / 4 + 1, 0, Math.PI * 2); ctx.fill(); return; }
  const segs = segments(pts, brush, seed), t0 = pts[0].t;
  for (let i = 0; i < segs.length; i++) {
    if (pts[i + 1].t - t0 > upTo) break;
    const s = segs[i];
    if (s.gap) continue;
    ctx.lineWidth = s.w; ctx.beginPath(); ctx.moveTo(s.x0, s.y0); ctx.lineTo(s.x1, s.y1); ctx.stroke();
  }
}

/** 讓 canvas 的像素數配合螢幕解析度；回傳要乘的倍率。 */
export function fitCanvas(canvas) {
  const k = Math.min(2, Math.max(1, Math.round(window.devicePixelRatio || 1)));
  if (canvas.width !== PAD_W * k) { canvas.width = PAD_W * k; canvas.height = PAD_H * k; }
  return k;
}
export function clearPaper(ctx, k) {
  ctx.setTransform(k, 0, 0, k, 0, 0);
  ctx.fillStyle = PAPER; ctx.fillRect(0, 0, PAD_W, PAD_H);
}

export function createPad(canvas, { brush = 'brush', guide = null, onStroke = null } = {}) {
  const ctx = canvas.getContext('2d');
  const state = { strokes: [], brush, cur: null, guide: true, replay: null };
  const now = () => performance.now();
  function redraw(upToStroke = Infinity, partial = null) {
    const k = fitCanvas(canvas);
    clearPaper(ctx, k);
    if (guide && state.guide) guide(ctx);
    state.strokes.forEach((s, i) => { if (i < upToStroke) paintStroke(ctx, s.pts, BRUSHES[s.brush], { seed: 7 + i }); });
    if (partial) paintStroke(ctx, partial.pts, BRUSHES[partial.brush], { upTo: partial.upTo, seed: 7 + partial.i });
    if (state.cur) paintStroke(ctx, state.cur.pts, BRUSHES[state.cur.brush], { seed: 7 + state.strokes.length });
  }
  const at = (e) => { const r = canvas.getBoundingClientRect(); return { x: (e.clientX - r.left) / r.width * PAD_W, y: (e.clientY - r.top) / r.height * PAD_H, t: Math.round(now()), p: e.pointerType === 'pen' && e.pressure > 0 ? e.pressure : 0.5 }; };
  let raf = 0;
  const later = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; redraw(); }); };

  canvas.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    stopReplay();
    e.preventDefault();
    try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    state.cur = { id: e.pointerId, brush: state.brush, pts: [at(e)] };
    later();
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!state.cur || e.pointerId !== state.cur.id) return;
    e.preventDefault();
    const evs = e.getCoalescedEvents ? e.getCoalescedEvents() : [];
    (evs.length ? evs : [e]).forEach((ev) => {
      const q = at(ev), last = state.cur.pts[state.cur.pts.length - 1];
      if (Math.hypot(q.x - last.x, q.y - last.y) >= 1.5) { if (q.t <= last.t) q.t = last.t + 1; state.cur.pts.push(q); }
    });
    later();
  });
  const end = (e) => {
    if (!state.cur || e.pointerId !== state.cur.id) return;
    const s = { brush: state.cur.brush, pts: state.cur.pts };
    state.cur = null; state.strokes.push(s);
    redraw();
    if (onStroke) onStroke(s, state.strokes.length);
  };
  canvas.addEventListener('pointerup', end);
  canvas.addEventListener('pointercancel', end);

  function stopReplay() { if (state.replay) { cancelAnimationFrame(state.replay); state.replay = null; redraw(); } }
  /** 照原來的速度把整張圖重畫一次（兩筆之間最多停 0.3 秒）。 */
  function replay(done) {
    stopReplay();
    if (!state.strokes.length) { if (done) done(); return; }
    let i = 0, t0 = now();
    const frame = () => {
      const s = state.strokes[i], el = now() - t0, dur = s.pts[s.pts.length - 1].t - s.pts[0].t;
      redraw(i, { pts: s.pts, brush: s.brush, upTo: el, i });
      if (el > dur + 300) { i++; t0 = now(); }
      if (i >= state.strokes.length) { state.replay = null; redraw(); if (done) done(); return; }
      state.replay = requestAnimationFrame(frame);
    };
    state.replay = requestAnimationFrame(frame);
  }
  redraw();
  return {
    state, strokes: state.strokes, redraw, replay,
    setBrush: (k) => { if (BRUSHES[k]) state.brush = k; },
    setGuide: (v) => { state.guide = !!v; redraw(); },
    undo: () => { stopReplay(); const s = state.strokes.pop(); redraw(); return s; },
    clear: () => { stopReplay(); state.strokes.length = 0; redraw(); },
    add: (pts, b = state.brush) => { const s = { brush: b, pts }; state.strokes.push(s); redraw(); if (onStroke) onStroke(s, state.strokes.length); return s; },
    busy: () => !!state.replay || !!state.cur,
  };
}
