/*
 * 地理 Geography ·「打電話前先算一算」（不需要 WebGL）：拉台北的時間、選一個城市，兩個鐘並排，看對方是不是在睡覺。
 * 用理想時區（標準時間，不算夏令時間）。除錯：document.querySelector('[data-gg-call]').__call（state、setHour(h)、setCity(key)、info()）
 */
import { city, dayName, fmtTime, fromTaipei } from './timezone.js';

function drawClock(cv, h, m) {
  const w = cv.clientWidth, d = Math.min(window.devicePixelRatio || 1, 2);
  if (!w) return;
  cv.width = cv.height = Math.round(w * d);
  const c = cv.getContext('2d'); c.setTransform(d, 0, 0, d, 0, 0);
  const r = w / 2 - 4, x = w / 2, y = w / 2, night = h < 6 || h >= 19;
  c.clearRect(0, 0, w, w);
  c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fillStyle = night ? '#16234a' : '#fff6dc'; c.fill(); c.lineWidth = 3; c.strokeStyle = night ? '#6f86c9' : '#d8a93a'; c.stroke();
  c.fillStyle = night ? '#b9c8e6' : '#5c4320';
  for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; c.fillRect(x + Math.sin(a) * (r - 9) - 1, y - Math.cos(a) * (r - 9) - 1, 2.5, 2.5); }
  const hand = (ang, len, wdt, col) => { c.strokeStyle = col; c.lineWidth = wdt; c.lineCap = 'round'; c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.sin(ang) * len, y - Math.cos(ang) * len); c.stroke(); };
  hand(((h % 12) + m / 60) * Math.PI / 6, r * 0.5, 5, night ? '#e8edf7' : '#2b2118');
  hand(m * Math.PI / 30, r * 0.75, 3, night ? '#9fb0cf' : '#6b5a48');
  c.font = `${Math.round(r * 0.32)}px system-ui`; c.textAlign = 'center'; c.fillText(night ? '🌙' : '☀️', x, y + r * 0.55);
}

export function initCall(root) {
  const $ = (s) => root.querySelector(s);
  const state = { h: 20, day: 0, city: 'newyork' };
  const sl = $('.gg-cl-h');
  const info = () => { const c = city(state.city), r = fromTaipei(state.day, state.h, c.lon); return { city: c, h: r.h, day: r.day, zone: r.zone }; };
  function draw() {
    const i = info(), a = fmtTime(state.h, 0), b = fmtTime(i.h, 0);
    drawClock($('.gg-cl-a'), state.h, 0); drawClock($('.gg-cl-b'), i.h, 0);
    $('.gg-cl-ta').innerHTML = `${dayName(state.day).en}, ${a.en}<span class="zh">${dayName(state.day).zh} ${a.zh}</span>`;
    $('.gg-cl-tb').innerHTML = `${dayName(i.day).en}, ${b.en}<span class="zh">${dayName(i.day).zh} ${b.zh}</span>`;
    $('.gg-cl-nb').innerHTML = `${i.city.en} <span class="zh">${i.city.zh}</span>`;
    const k = i.h >= 23 || i.h < 7 ? 'sleep' : i.h < 8 || i.h >= 21 ? 'edge' : 'ok';
    root.querySelectorAll('.gg-cl-msg [data-when]').forEach((s) => { s.hidden = s.dataset.when !== k; });
    sl.value = state.h;
    root.querySelectorAll('[data-ccity]').forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.ccity === state.city)));
  }
  const api = { state, info, setHour(h) { state.h = h; draw(); }, setCity(k) { state.city = k; draw(); } };
  sl.addEventListener('input', () => api.setHour(+sl.value));
  root.querySelectorAll('[data-ccity]').forEach((x) => x.addEventListener('click', () => api.setCity(x.dataset.ccity)));
  new ResizeObserver(draw).observe($('.gg-cl-a'));
  draw();
  root.__call = api;
  return api;
}
