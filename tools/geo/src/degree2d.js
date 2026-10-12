/*
 * 地理 Geography ·「一度有多長？」（不需要 WebGL）：拉動緯度，看同樣一度經度在地面上從赤道的約 111 公里縮到兩極的 0。
 * 左邊畫地球的側面與那一圈緯線；右邊把「一度 × 一度」的那一格照比例畫出來（高固定是一度緯度，寬是一度經度）。
 * 數字用 geo.js 的 degreeLengths（球面、平均半徑 6371.0088 公里）；真正的地球略扁，數字會差一點點，頁面上有說明。
 *
 * 除錯：document.querySelector('[data-gg-degree]').__degree（state.lat、setLat(度)、info()）
 */
import { RAD, degreeLengths } from './geo.js';

const km = (v) => (v >= 100 ? Math.round(v).toLocaleString('en-US') : v >= 10 ? v.toFixed(1) : v.toFixed(2));

export function initDegree(root) {
  const $ = (s) => root.querySelector(s);
  const cv = $('.gg-dd-cv'), ctx = cv.getContext('2d'), sl = $('.gg-dd-lat');
  const state = { lat: +sl.value || 0 };
  const info = () => {
    const d = degreeLengths(state.lat);
    return { lat: state.lat, latKm: d.lat, lonKm: d.lon, pct: d.lon / d.lat, around: d.lon * 360 };
  };
  function draw() {
    const w = cv.clientWidth, h = cv.clientHeight;
    if (!w || !h) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const i = info(), p = state.lat * RAD;
    const narrow = w < 520;
    // ── 地球的側面 ──
    const R = Math.min(narrow ? w * 0.26 : w * 0.2, h * 0.4), cx = narrow ? w * 0.3 : w * 0.27, cy = h * 0.5;
    const g = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
    g.addColorStop(0, '#2a5fa8'); g.addColorStop(1, '#10284d');
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 1; ctx.stroke();
    const ring = (lat, color, lw, dash) => {
      const y = cy - R * Math.sin(lat * RAD), rx = R * Math.cos(lat * RAD);
      ctx.beginPath(); ctx.ellipse(cx, y, Math.max(0.5, rx), Math.max(0.5, rx * 0.22), 0, 0, Math.PI * 2);
      ctx.setLineDash(dash || []); ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.stroke(); ctx.setLineDash([]);
      return [y, rx];
    };
    for (const la of [-60, -30, 30, 60]) ring(la, 'rgba(255,255,255,.16)', 1);
    ring(0, 'rgba(255,157,107,.9)', 1.4);
    const [y, rx] = ring(state.lat, '#ffd36e', 2.6);
    // 地心到那一圈的線與緯度角
    ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + R, cy); ctx.moveTo(cx, cy); ctx.lineTo(cx + rx, y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R * 0.3, 0, -p, true); ctx.closePath(); ctx.fillStyle = 'rgba(255,211,110,.35)'; ctx.fill();
    ctx.font = '700 11px system-ui, sans-serif'; ctx.fillStyle = '#ffd36e'; ctx.textAlign = 'left';
    ctx.fillText(`${state.lat}°`, cx + R * 0.33, cy - Math.max(4, R * 0.12 * Math.sin(p) + 4));
    ctx.fillStyle = '#ffc9a8'; ctx.textAlign = 'center'; ctx.fillText('0°', cx - R - 12, cy + 4);
    ctx.fillStyle = '#cfd8ee'; ctx.fillText('N', cx, cy - R - 6); ctx.fillText('S', cx, cy + R + 14);
    // ── 一度 × 一度的那一格 ──
    const bx = narrow ? w * 0.63 : w * 0.56, bw = narrow ? w * 0.32 : w * 0.36, side = Math.min(bw, h * 0.52), by = h * 0.5 - side / 2;
    ctx.setLineDash([4, 4]); ctx.strokeStyle = 'rgba(255,255,255,.3)'; ctx.lineWidth = 1; ctx.strokeRect(bx, by, side, side); ctx.setLineDash([]);
    const ww = Math.max(1.5, side * i.pct);
    ctx.fillStyle = 'rgba(255,211,110,.3)'; ctx.fillRect(bx + (side - ww) / 2, by, ww, side);
    ctx.strokeStyle = '#ffd36e'; ctx.lineWidth = 2; ctx.strokeRect(bx + (side - ww) / 2, by, ww, side);
    ctx.fillStyle = '#ffd36e'; ctx.textAlign = 'center'; ctx.font = '800 12px system-ui, sans-serif';
    ctx.fillText(`${km(i.lonKm)} km`, bx + side / 2, by + side + 16);
    ctx.save(); ctx.translate(bx - 8, by + side / 2); ctx.rotate(-Math.PI / 2); ctx.fillStyle = '#cfd8ee'; ctx.fillText(`${km(i.latKm)} km`, 0, 0); ctx.restore();
    ctx.font = '700 10px system-ui, sans-serif'; ctx.fillStyle = '#9fb0cf';
    ctx.fillText('1° × 1°', bx + side / 2, by - 7);
  }
  function sync() {
    const i = info();
    $('.gg-dd-latv').textContent = i.lat === 0 ? '0° (equator · 赤道)' : i.lat === 90 ? '90° (pole · 極點)' : `${i.lat}°`;
    $('.gg-dd-latkm').innerHTML = `${km(i.latKm)} <small>km · 公里</small>`;
    $('.gg-dd-lonkm').innerHTML = `${km(i.lonKm)} <small>km · 公里</small>`;
    $('.gg-dd-pct').textContent = `${Math.round(i.pct * 100)}%`;
    $('.gg-dd-around').innerHTML = `${(Math.round(i.around / 10) * 10).toLocaleString('en-US')} <small>km · 公里</small>`;
    root.querySelectorAll('[data-lat]').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.lat === i.lat)));
    const k = i.lat === 0 ? 'eq' : i.lat >= 89.5 ? 'pole' : Math.abs(i.lat - 60) < 0.26 ? 'half' : 'mid';
    root.querySelectorAll('.gg-dg-msg [data-when]').forEach((s) => { s.hidden = s.dataset.when !== k; });
    sl.value = i.lat;
    draw();
  }
  const api = { state, info, setLat(v) { state.lat = Math.min(90, Math.max(0, Math.round(v * 2) / 2)); sync(); } };
  sl.addEventListener('input', () => api.setLat(+sl.value));
  root.querySelectorAll('[data-lat]').forEach((b) => b.addEventListener('click', () => api.setLat(+b.dataset.lat)));
  new ResizeObserver(draw).observe(cv);
  sync();
  root.__degree = api;
  return api;
}
