/*
 * 書法 · 練字板（2D canvas，不需要 WebGL；每一課共用，只換範字資料）。
 *
 *   initPad(root, char)   root＝[data-cal-pad] 區塊；char＝src/strokes/*.json 的一個字
 *
 * 米字格＋淡紅色的範字（描紅），滑鼠、手指、觸控筆都能寫：
 *   - 滑鼠與手指：寫得慢＝粗、寫得快＝細（brush.js 的 speedToPressure）
 *   - 觸控筆（pointerType 'pen' 而且有壓力）：越壓越粗（penPressure）
 *   - 筆毛印子和 3D 宣紙同一套（brush.js 的 stamps／水滴形），所以寫出來像毛筆不像原子筆
 * 按鈕 data-pad="demo|undo|clear|save"；開關 data-pt="grid|model"。畫布 touch-action: none，寫字時頁面不會捲動。
 * 除錯：root.__pad（strokes、render()、clear()、demo()、write(點陣列)）
 */
import { BOX, clamp, footprint, penPressure, prepStroke, smoothTo, speedToPressure, stamps } from './brush.js';
import { drawGrid, drawStamps, paperBase } from './ink2d.js';

const STEP = 2.5;         // 兩個印子之間的距離（字框單位）
const LAG = 26;           // 筆尖轉向的慣性（同 brush.js 的 tipTrail）

export function initPad(root, char) {
  const cv = root.querySelector('.cg-pad-cv');
  const g = cv.getContext('2d');
  const meter = root.querySelector('.cg-pad-meter i');
  const modeEl = root.querySelector('.cg-pad-mode');
  const msg = root.querySelector('.cg-pad-msg');
  const opts = { grid: true, model: true };
  const model = char.strokes.map((st) => { const s = prepStroke(st); return { s, sts: stamps(s) }; });
  const strokes = [];          // 使用者寫的：[{ sts: [印子…] }]
  let T = { k: 1, ox: 0, oy: 0 }, S = 0, cur = null, usedPen = false;
  let demo = null;             // { t, until } 示範播放中
  let base = null;             // 紙＋格線＋範字（快取，寫字時只疊新的印子）

  function size() {
    const css = cv.clientWidth || 320;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const px = Math.round(css * dpr);
    if (cv.width !== px || cv.height !== px) { cv.width = px; cv.height = px; }
    S = px; T = { k: px / BOX, ox: 0, oy: 0 };
    base = null;
    render();
  }
  function drawBase() {
    if (!base) {
      base = document.createElement('canvas'); base.width = S; base.height = S;
      const b = base.getContext('2d');
      paperBase(b, S, S, { seed: 11, fiber: 0.35 });
      if (opts.grid) drawGrid(b, S * 0.012, S * 0.012, S * 0.976, { lw: Math.max(1, S / 360) });
      if (opts.model) model.forEach((m) => drawStamps(b, m.sts, T, { color: 'rgb(214,72,60)', alpha: 0.3 }));
    }
    g.drawImage(base, 0, 0);
  }
  function render() {
    if (!S) return;
    drawBase();
    for (const st of strokes) drawStamps(g, st.sts, T, { soft: S / 420 });
    if (demo) drawDemo();
  }

  // ---------- 寫字 ----------
  const toBox = (e) => {
    const r = cv.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * BOX, y: ((e.clientY - r.top) / r.height) * BOX };
  };
  function begin(e) {
    if (demo) stopDemo();
    const pt = toBox(e);
    const pen = e.pointerType === 'pen' && e.pressure > 0;
    if (pen && !usedPen) { usedPen = true; root.classList.add('cg-pad-pen'); }
    cur = { id: e.pointerId, pen, x: pt.x, y: pt.y, sx: pt.x, sy: pt.y, t: e.timeStamp, p: pen ? penPressure(e.pressure) : 0.32, a: Math.PI, sts: [] };
    strokes.push(cur);
    put(cur.x, cur.y, cur.p, cur.a);
  }
  function put(x, y, p, a) {
    const f = footprint(p);
    if (!f) return;
    const st = { x, y, a, hw: f.hw, len: f.len, p };
    cur.sts.push(st);
    drawStamps(g, [st], T, { soft: S / 420 });
  }
  function move(e) {
    if (!cur || e.pointerId !== cur.id) return;
    const evs = typeof e.getCoalescedEvents === 'function' ? e.getCoalescedEvents() : [];
    for (const ev of (evs.length ? evs : [e])) step(ev);
  }
  function step(e) {
    const raw = toBox(e);
    // 位置輕微平滑，手抖不會變成鋸齒
    const x = cur.sx + (raw.x - cur.sx) * 0.65, y = cur.sy + (raw.y - cur.sy) * 0.65;
    cur.sx = x; cur.sy = y;
    const dx = x - cur.x, dy = y - cur.y, dist = Math.hypot(dx, dy);
    const dt = Math.max(0.001, (e.timeStamp - cur.t) / 1000);
    if (dist < 0.5) return;
    const target = cur.pen && e.pressure > 0 ? penPressure(e.pressure) : speedToPressure(dist / dt);
    const p1 = smoothTo(cur.p, target, dt, cur.pen ? 0.03 : 0.08);
    const n = Math.max(1, Math.ceil(dist / STEP));
    const goal = Math.atan2(-dy, -dx);
    for (let i = 1; i <= n; i++) {
      const f = i / n;
      let d = goal - cur.a;
      while (d > Math.PI) d -= 2 * Math.PI;
      while (d < -Math.PI) d += 2 * Math.PI;
      cur.a += d * (1 - Math.exp(-(dist / n) / LAG));
      put(cur.x + dx * f, cur.y + dy * f, cur.p + (p1 - cur.p) * f, cur.a);
    }
    cur.x = x; cur.y = y; cur.t = e.timeStamp; cur.p = p1;
    if (meter) meter.style.width = `${Math.round(clamp(p1) * 100)}%`;
  }
  function end(e) {
    if (!cur || (e && e.pointerId !== cur.id)) return;
    if (!cur.sts.length) strokes.pop();
    cur = null;
    if (msg) msg.textContent = '';
  }
  cv.addEventListener('pointerdown', (e) => {
    if (e.button !== undefined && e.button > 0) return;
    e.preventDefault();
    try { cv.setPointerCapture(e.pointerId); } catch (err) { /* 合成事件沒有真的指標 */ }
    begin(e);
  });
  cv.addEventListener('pointermove', (e) => { if (cur) { e.preventDefault(); move(e); } });
  cv.addEventListener('pointerup', end);
  cv.addEventListener('pointercancel', end);
  cv.addEventListener('lostpointercapture', end);
  // iOS Safari：觸控時不要捲頁面、不要放大
  cv.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
  cv.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });

  // ---------- 看示範 ----------
  const totalDemo = model.reduce((a, m) => a + m.s[m.s.length - 1].t, 0) + 0.45 * (model.length - 1);
  function drawDemo() {
    let t = demo.t;
    for (const m of model) {
      const dur = m.s[m.s.length - 1].t;
      let n = 0; while (n < m.sts.length && m.sts[n].t <= t) n++;
      drawStamps(g, m.sts, T, { i1: n, soft: S / 420, color: '#1b2236' });
      if (t >= 0 && t < dur && n) {      // 筆尖的位置：一個空心圈
        const q = m.sts[n - 1];
        g.save(); g.strokeStyle = 'rgba(201,161,74,.95)'; g.lineWidth = Math.max(2, S / 260);
        g.beginPath(); g.arc(q.x * T.k, q.y * T.k, Math.max(8, q.hw * T.k * 0.9), 0, Math.PI * 2); g.stroke(); g.restore();
      }
      t -= dur + 0.45;
    }
  }
  let raf = 0, last = 0;
  function tick(now) {
    raf = 0;
    if (!demo) return;
    const dt = Math.min(0.05, (now - (last || now)) / 1000); last = now;
    demo.t += dt;
    render();
    if (demo.t > totalDemo + 1.6) { stopDemo(); return; }
    raf = requestAnimationFrame(tick);
  }
  function startDemo() {
    demo = { t: 0 }; last = 0;
    root.classList.add('cg-pad-demoing');
    if (msg) msg.textContent = 'Watch the brush, then try it yourself. · 看完示範，換你寫寫看。';
    if (!raf) raf = requestAnimationFrame(tick);
  }
  function stopDemo() {
    demo = null; root.classList.remove('cg-pad-demoing');
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
    render();
  }

  // ---------- 按鈕與開關 ----------
  root.querySelectorAll('[data-pad]').forEach((b) => b.addEventListener('click', () => {
    const k = b.getAttribute('data-pad');
    if (k === 'demo') { if (demo) stopDemo(); else startDemo(); }
    if (k === 'undo') { strokes.pop(); render(); }
    if (k === 'clear') { strokes.length = 0; render(); }
    if (k === 'save') save();
  }));
  root.querySelectorAll('[data-pt]').forEach((el) => el.addEventListener('change', () => {
    opts[el.getAttribute('data-pt')] = el.checked; base = null; render();
  }));
  function save() {
    render();
    const done = (url) => {
      const a = document.createElement('a');
      a.href = url; a.download = `calligraphy-practice-${char.key}.png`;
      document.body.appendChild(a); a.click(); a.remove();
    };
    if (cv.toBlob) cv.toBlob((b) => { if (b) { const u = URL.createObjectURL(b); done(u); setTimeout(() => URL.revokeObjectURL(u), 4000); } });
    else done(cv.toDataURL('image/png'));
  }

  new ResizeObserver(size).observe(cv);
  size();
  if (modeEl) modeEl.hidden = false;

  root.__pad = {
    strokes, render, clear: () => { strokes.length = 0; render(); }, demo: startDemo, stopDemo,
    setDemoTime: (t) => { demo = demo || { t: 0 }; demo.t = t; render(); },
    // 除錯：照點陣列寫一筆 [[x, y, 毫秒], …]（字框座標），走跟真的指標一樣的流程
    write(pts, pointerType = 'mouse', pressure = 0.5) {
      const ev = ([x, y, ms]) => ({ pointerId: 99, pointerType, pressure, timeStamp: ms, clientX: cv.getBoundingClientRect().left + (x / BOX) * cv.clientWidth, clientY: cv.getBoundingClientRect().top + (y / BOX) * cv.clientHeight });
      begin(ev(pts[0])); pts.slice(1).forEach((q) => step(ev(q))); end();
      return strokes[strokes.length - 1].sts.length;
    },
  };
  return root.__pad;
}
