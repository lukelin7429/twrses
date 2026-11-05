/*
 * 地理 Geography ·「手電筒照桌面」（不需要 WebGL）：同一支手電筒，從正上方照和斜斜地照，光斑一樣亮嗎？
 * 左邊是側面圖（光束、桌面上的格子），右邊是從上往下看的光斑；拖角度，光斑長度＝光束寬 ÷ sin(角度)，
 * 每一格分到的光＝sin(角度)（sunlight.js 的 spread／share）。
 * 除錯：document.querySelector('[data-gg-torch]').__torch（state、setAngle(度)、info()）
 */
import { share, spread } from './sunlight.js';

const RAD = Math.PI / 180;

export function initTorch(root) {
  const $ = (s) => root.querySelector(s);
  const state = { a: 90 };
  const side = $('.gg-tc-side'), top = $('.gg-tc-top'), sl = $('.gg-tc-a');
  function prep(cv) {
    const w = cv.clientWidth, h = cv.clientHeight, d = Math.min(window.devicePixelRatio || 1, 2);
    if (!w || !h) return null;
    cv.width = Math.round(w * d); cv.height = Math.round(h * d);
    const c = cv.getContext('2d'); c.setTransform(d, 0, 0, d, 0, 0); c.clearRect(0, 0, w, h);
    return { c, w, h };
  }
  function draw() {
    const a = state.a, k = share(a), L = spread(a);
    const S = prep(side);
    if (S) {
      const { c, w, h } = S, ty = h * 0.78, cx = w * 0.5, unit = Math.min(w / 12, 34), bw = 2 * unit;   // 光束寬 2 格
      // 桌面與格子
      c.fillStyle = '#3a2c1e'; c.fillRect(0, ty, w, h - ty);
      c.strokeStyle = 'rgba(255,255,255,.25)'; c.lineWidth = 1;
      for (let x = cx % unit; x < w; x += unit) { c.beginPath(); c.moveTo(x, ty); c.lineTo(x, ty + 8); c.stroke(); }
      // 光束：中心打在 (cx, ty)，從角度 a 照下來（從右上方）
      const dx = Math.cos(a * RAD), dy = -Math.sin(a * RAD), len = h * 0.9;
      const px = -dy, py = dx;                      // 垂直光束的方向
      const half = bw / 2, spot = half / Math.sin(a * RAD);
      const A = [cx - spot, ty], B = [cx + spot, ty];
      const A2 = [A[0] + dx * len - px * 0, A[1] + dy * len], B2 = [B[0] + dx * len, B[1] + dy * len];
      void px; void py;
      const g = c.createLinearGradient(cx + dx * len, ty + dy * len, cx, ty);
      g.addColorStop(0, 'rgba(255,214,110,.05)'); g.addColorStop(1, 'rgba(255,214,110,.55)');
      c.fillStyle = g; c.beginPath(); c.moveTo(A[0], A[1]); c.lineTo(B[0], B[1]); c.lineTo(B2[0], B2[1]); c.lineTo(A2[0], A2[1]); c.closePath(); c.fill();
      // 手電筒
      const fx = cx + dx * (h * 0.62), fy = ty + dy * (h * 0.62);
      c.save(); c.translate(fx, fy); c.rotate(Math.atan2(-dy, -dx));
      c.fillStyle = '#c9d3e6'; c.fillRect(-12, -half - 3, 34, bw + 6); c.fillStyle = '#7d8aa6'; c.fillRect(22, -half / 2, 40, half);
      c.restore();
      // 光斑
      c.fillStyle = `rgba(255,226,120,${(0.25 + 0.75 * k).toFixed(2)})`; c.fillRect(A[0], ty - 3, B[0] - A[0], 6);
      // 角度弧
      c.strokeStyle = '#ffd36e'; c.lineWidth = 2; c.beginPath(); c.arc(cx, ty, unit * 1.2, Math.PI * 2 - a * RAD, Math.PI * 2); c.stroke();
      c.fillStyle = '#ffd36e'; c.font = '700 13px system-ui, sans-serif'; c.textAlign = 'left';
      c.fillText(`${Math.round(a)}°`, cx + unit * 1.35, ty - 8);
    }
    const T = prep(top);
    if (T) {
      const { c, w, h } = T, unit = Math.min(w / 8, h / 6), cx = w / 2, cy = h / 2;
      c.fillStyle = '#3a2c1e'; c.fillRect(0, 0, w, h);
      const sw = 2 * unit, sh = 2 * unit * L;
      c.fillStyle = `rgba(255,226,120,${(0.15 + 0.85 * k).toFixed(2)})`;
      c.fillRect(cx - sw / 2, cy - sh / 2, sw, sh);
      c.strokeStyle = 'rgba(255,255,255,.22)'; c.lineWidth = 1;
      for (let x = cx - 4 * unit; x <= cx + 4 * unit + 0.5; x += unit) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, h); c.stroke(); }
      for (let y = cy - 4 * unit; y <= cy + 4 * unit + 0.5; y += unit) { c.beginPath(); c.moveTo(0, y); c.lineTo(w, y); c.stroke(); }
    }
    $('.gg-tc-av').textContent = `${Math.round(a)}°`;
    $('.gg-tc-l').textContent = `× ${L.toFixed(2)}`;
    $('.gg-tc-k').textContent = `${Math.round(k * 100)}%`;
    sl.value = a;
    root.querySelectorAll('[data-tangle]').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.tangle === Math.round(a))));
  }
  const api = { state, setAngle(a) { state.a = Math.max(10, Math.min(90, a)); draw(); return api.info(); }, info: () => ({ a: state.a, spread: spread(state.a), share: share(state.a) }) };
  sl.addEventListener('input', () => api.setAngle(+sl.value));
  root.querySelectorAll('[data-tangle]').forEach((b) => b.addEventListener('click', () => api.setAngle(+b.dataset.tangle)));
  new ResizeObserver(draw).observe(side);
  draw();
  root.__torch = api;
  return api;
}
