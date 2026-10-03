/*
 * 書法 · 練字板（2D canvas，不需要 WebGL；每一課共用，只換範字資料）。
 *
 *   initPad(root, char)   root＝[data-cal-pad] 區塊；char＝src/strokes/*.json 的一個字
 *
 * 米字格＋淡紅色的範字（描紅），滑鼠、手指、觸控筆都能寫：
 *   - 滑鼠與手指：寫得慢＝粗、寫得快＝細（brush.js 的 speedToPressure）
 *   - 觸控筆（pointerType 'pen' 而且有壓力）：越壓越粗（penPressure）
 *   - 筆毛印子和 3D 宣紙同一套（brush.js 的 stamps／水滴形），所以寫出來像毛筆不像原子筆
 * 按鈕 data-pad="demo|undo|clear|save"；開關 data-pt="grid|model|order"（order＝在範字每一筆的起點標筆順數字；
 *   位置用筆畫資料的 num: [x, y]，沒有就放在起點的後方）。畫布 touch-action: none，寫字時頁面不會捲動。
 * 有 .cg-pad-curve 畫布時（第二課起）：每寫完一筆，畫出你的提按曲線（藍）疊在示範那一筆的力道曲線（金）上，
 *   .cg-pad-score 寫出和示範有多像（brush.js 的 curveFromStamps、curveMatch）。第 n 筆對示範的第 n 筆（照筆順）。
 * 有 [data-pad-char] 按鈕時（第四課）：可以換範字（setChar），換字就清掉重寫。chars＝{ key: 筆畫資料 }。
 * 有 .cg-pad-time 時（第七課）：碼表。從第一筆下筆到最後一筆提筆花了幾秒、寫了幾筆（提筆幾次），和示範比；timing() 回傳數字。
 * 除錯：root.__pad（strokes、render()、clear()、demo()、write(點陣列)、setChar(key)）
 */
import { BOX, clamp, curveFromStamps, curveMatch, footprint, forceCurve, penPressure, prepStroke, smoothTo, speedToPressure, stamps } from './brush.js';
import { drawCompare, drawGrid, drawStamps, paperBase } from './ink2d.js';

const STEP = 2.5;         // 兩個印子之間的距離（字框單位）
const LAG = 26;           // 筆尖轉向的慣性（同 brush.js 的 tipTrail）

export function initPad(root, char, chars = null) {
  const cv = root.querySelector('.cg-pad-cv');
  const g = cv.getContext('2d');
  const meter = root.querySelector('.cg-pad-meter i');
  const modeEl = root.querySelector('.cg-pad-mode');
  const msg = root.querySelector('.cg-pad-msg');
  const opts = { grid: true, model: true, order: false };
  root.querySelectorAll('[data-pt]').forEach((el) => { opts[el.getAttribute('data-pt')] = el.checked; });
  let model = char.strokes.map((st) => { const s = prepStroke(st); return { s, sts: stamps(s) }; });
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
      if (opts.order) model.forEach((m, k) => {   // 筆順數字：藍底白字的小圓
        let x, y;
        const num = char.strokes[k].num;
        if (num) [x, y] = num;
        else {
          const a = m.s[0], b2 = m.s[Math.min(m.s.length - 1, 12)], L = Math.hypot(b2.x - a.x, b2.y - a.y) || 1;
          x = a.x - ((b2.x - a.x) / L) * 50; y = a.y - ((b2.y - a.y) / L) * 50;
        }
        const r = 23 * T.k;
        b.save(); b.fillStyle = 'rgba(31,111,139,.92)'; b.beginPath(); b.arc(x * T.k, y * T.k, r, 0, Math.PI * 2); b.fill();
        b.fillStyle = '#fff'; b.font = `800 ${Math.round(r * 1.25)}px system-ui, sans-serif`; b.textAlign = 'center'; b.textBaseline = 'middle';
        b.fillText(String(k + 1), x * T.k, y * T.k + r * 0.06); b.restore();
      });
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
    cur = { id: e.pointerId, pen, x: pt.x, y: pt.y, sx: pt.x, sy: pt.y, t: e.timeStamp, t0: e.timeStamp, t1: e.timeStamp, p: pen ? penPressure(e.pressure) : 0.32, a: Math.PI, sts: [] };
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
    cur.t1 = Math.max(cur.t, e && e.timeStamp ? e.timeStamp : cur.t);
    if (!cur.sts.length) strokes.pop();
    cur = null;
    if (msg) msg.textContent = '';
    compare(); showTime();
  }

  // ---------- 提按曲線比較（第二課起） ----------
  const cmpCv = root.querySelector('.cg-pad-curve'), cmpOut = root.querySelector('.cg-pad-score');
  let mCurves = model.map((m) => forceCurve(m.s));
  const boundsOf = (m) => {
    const L = m.s[m.s.length - 1].s || 1, a = m.s.find((q) => q.phase >= 1), b = m.s.find((q) => q.phase >= 2);
    return [a ? a.s / L : 0.2, b ? b.s / L : 0.8];
  };
  let mBounds = model.map(boundsOf);
  let lastScore = null;
  function compare() {
    if (!cmpCv) return;
    const css = cmpCv.clientWidth || 300, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(css * dpr), h = Math.round((cmpCv.clientHeight || 120) * dpr);
    if (cmpCv.width !== w || cmpCv.height !== h) { cmpCv.width = w; cmpCv.height = h; }
    const g2 = cmpCv.getContext('2d');
    const real = strokes.filter((st) => st.sts.length >= 8);
    const k = real.length ? (real.length - 1) % model.length : 0;
    const zhs = ['起筆', '行筆', '收筆'];
    if (!real.length) {
      drawCompare(g2, w, h, mCurves[0], [], { bounds: mBounds[0], labels: zhs });
      lastScore = null;
      if (cmpOut) cmpOut.innerHTML = `Write stroke 1 (${char.strokes[0].en}) to see your curve.<span class="zh">寫第 1 筆（${char.strokes[0].zh}），看看你的提按曲線。</span>`;
      return;
    }
    const uc = curveFromStamps(real[real.length - 1].sts);
    const m = curveMatch(mCurves[k], uc);
    lastScore = { k, m };
    drawCompare(g2, w, h, mCurves[k], uc, { bounds: mBounds[k], labels: zhs });
    if (cmpOut) cmpOut.innerHTML = `Stroke ${k + 1} (${char.strokes[k].en}): <b>${Math.round(m * 100)}%</b> like the demo.`
      + `<span class="zh">第 ${k + 1} 筆（${char.strokes[k].zh}）：和示範的提按 <b>${Math.round(m * 100)}%</b> 相似。</span>`;
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
  let totalDemo = model.reduce((a, m) => a + m.s[m.s.length - 1].t, 0) + 0.45 * (model.length - 1);

  // ---------- 碼表（第七課） ----------
  const timeEl = root.querySelector('.cg-pad-time');
  function timing() {
    const real = strokes.filter((st) => st.sts.length >= 3);
    const sec = real.length ? Math.max(0, (real[real.length - 1].t1 - real[0].t0) / 1000) : 0;
    return { strokes: real.length, lifts: Math.max(0, real.length - 1), seconds: sec, modelStrokes: model.length, modelSeconds: totalDemo };
  }
  function showTime() {
    if (!timeEl) return;
    const t = timing();
    const you = t.strokes ? `<b>${t.seconds.toFixed(1)} s</b> · ${t.strokes} ${t.strokes === 1 ? 'stroke' : 'strokes'}, ${t.lifts} ${t.lifts === 1 ? 'lift' : 'lifts'}` : '<b>—</b>';
    const youZh = t.strokes ? `${t.seconds.toFixed(1)} 秒・${t.strokes} 筆・提筆 ${t.lifts} 次` : '還沒寫';
    timeEl.innerHTML = `<span class="cg-pad-you"><i>You · 你</i>${you}<small>${youZh}</small></span>`
      + `<span class="cg-pad-brush"><i>Demo · 示範</i><b>${t.modelSeconds.toFixed(1)} s</b> · ${t.modelStrokes} ${t.modelStrokes === 1 ? 'stroke' : 'strokes'}, ${t.modelStrokes - 1} ${t.modelStrokes === 2 ? 'lift' : 'lifts'}<small>${t.modelSeconds.toFixed(1)} 秒・${t.modelStrokes} 筆・提筆 ${t.modelStrokes - 1} 次</small></span>`;
  }
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
    if (k === 'undo') { strokes.pop(); render(); compare(); showTime(); }
    if (k === 'clear') { strokes.length = 0; render(); compare(); showTime(); }
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

  // ---------- 換範字（第四課） ----------
  function setChar(key) {
    if (!chars || !chars[key]) return;
    char = chars[key];
    model = char.strokes.map((st) => { const s2 = prepStroke(st); return { s: s2, sts: stamps(s2) }; });
    totalDemo = model.reduce((a, m) => a + m.s[m.s.length - 1].t, 0) + 0.45 * (model.length - 1);
    mCurves = model.map((m) => forceCurve(m.s)); mBounds = model.map(boundsOf);
    strokes.length = 0; if (demo) stopDemo(); base = null; render(); compare(); showTime();
    root.querySelectorAll('[data-pad-char]').forEach((b2) => b2.setAttribute('aria-pressed', b2.getAttribute('data-pad-char') === key ? 'true' : 'false'));
  }
  root.querySelectorAll('[data-pad-char]').forEach((b2) => b2.addEventListener('click', () => setChar(b2.getAttribute('data-pad-char'))));

  new ResizeObserver(size).observe(cv);
  size();
  if (cmpCv) { new ResizeObserver(() => compare()).observe(cmpCv); compare(); }
  if (modeEl) modeEl.hidden = false;
  showTime();

  root.__pad = {
    strokes, render, clear: () => { strokes.length = 0; render(); compare(); showTime(); }, demo: startDemo, stopDemo, score: () => lastScore, setChar, timing,
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
