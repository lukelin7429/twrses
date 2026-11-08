/*
 * 地理 Geography ·「切一刀」（不需要 WebGL）：在台灣地形小地圖上選一條東西向的線，下面畫出那條線的剖面（垂直誇大 10 倍），
 * 並算出最高點往西、往東到海岸的距離與平均坡度——東邊陡、西邊緩。數字都由 taiwan.js 用 DTM 資料算。
 * 預設的線在 data/geography.json 的 cut.lines（{ key, en, zh, n 公里 }）。
 * 除錯：document.querySelector('[data-gg-cut]').__cut（state、setN(公里)、pick(key)、stats()）
 */
import { getTaiwan, heightAt, sides } from './taiwan.js';
import { drawCut, drawTaiwan } from './twmap2d.js';

export const EXAG = 10;

export function initCut(root) {
  const $ = (s) => root.querySelector(s);
  const data = JSON.parse($('script[type="application/json"]').textContent);
  const T = getTaiwan();
  const mapCv = $('.gg-tw-map'), cutCv = $('.gg-tw-cut'), slider = $('.gg-tw-n');
  const first = data.lines.find((l) => l.key === 'changhua') || data.lines[0];
  const state = { n: first.n, key: first.key };
  slider.min = Math.ceil(T.n0 + 3); slider.max = Math.floor(T.n0 + T.ny - 3); slider.value = state.n;
  let base = null, map = null;
  const fit = (cv) => { const w = cv.clientWidth, h = cv.clientHeight, d = Math.min(window.devicePixelRatio || 1, 2); if (!w || !h) return null; cv.width = Math.round(w * d); cv.height = Math.round(h * d); const c = cv.getContext('2d'); c.setTransform(d, 0, 0, d, 0, 0); return { c, w, h, d }; };
  function drawMap() {
    const f = fit(mapCv); if (!f) return;
    base = document.createElement('canvas'); base.width = mapCv.width; base.height = mapCv.height;
    const b = base.getContext('2d'); b.setTransform(f.d, 0, 0, f.d, 0, 0);
    map = drawTaiwan(b, f.w, f.h, T, f.d);
    map.f = f;
  }
  const stats = () => sides(T, state.n);
  function draw() {
    if (!map) drawMap(); if (!map) return;
    const { c, w, d } = map.f;
    c.setTransform(1, 0, 0, 1, 0, 0); c.drawImage(base, 0, 0); c.setTransform(d, 0, 0, d, 0, 0);
    const [, y] = map.toXY(T.e0, state.n);
    c.strokeStyle = '#fff'; c.lineWidth = 3.5; c.beginPath(); c.moveTo(0, y); c.lineTo(w, y); c.stroke();
    c.strokeStyle = '#ff5a8a'; c.lineWidth = 1.8; c.stroke();
    const s = stats(), g = fit(cutCv);
    if (g && s) {
      const pts = [];
      for (let e = T.e0; e <= T.e0 + T.nx; e += 0.5) pts.push({ e, z: heightAtRow(e) });
      drawCut(g.c, g.w, g.h, pts, { exag: EXAG, e0: T.e0, e1: T.e0 + T.nx, mark: s.top });
    }
    const out = $('.gg-tw-out');
    if (!s) { out.innerHTML = 'This line misses the island. Move it a little.<span class="zh">這條線沒有經過本島，移一下。</span>'; return; }
    const r = (x) => Math.round(x);
    out.innerHTML = `<span class="gg-tw-k">Highest point on the line<span class="zh">線上最高點</span><b>${r(s.top.z).toLocaleString('en-US')} m</b></span>
      <span class="gg-tw-k">West side<span class="zh">西邊</span><b>${r(s.wKm)} km · ${r(s.wSlope)} m/km</b></span>
      <span class="gg-tw-k">East side<span class="zh">東邊</span><b>${r(s.eKm)} km · ${r(s.eSlope)} m/km</b></span>
      <span class="gg-tw-note">${s.eSlope > s.wSlope ? `The east side climbs about ${(s.eSlope / s.wSlope).toFixed(1)} times as steeply as the west side.<span class="zh">東邊的坡大約是西邊的 ${(s.eSlope / s.wSlope).toFixed(1)} 倍陡。</span>` : 'Here the west side is steeper.<span class="zh">這裡反而是西邊比較陡。</span>'}</span>`;
    root.querySelectorAll('[data-cut]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.cut === state.key)));
  }
  const heightAtRow = (e) => heightAt(T, e, state.n);
  const api = {
    state, stats,
    setN(n) { state.n = +n; state.key = (data.lines.find((l) => Math.abs(l.n - state.n) < 0.5) || {}).key || null; slider.value = state.n; draw(); return stats(); },
    pick(k) { const l = data.lines.find((x) => x.key === k); return l ? api.setN(l.n) : null; },
  };
  slider.addEventListener('input', () => api.setN(+slider.value));
  root.querySelectorAll('[data-cut]').forEach((b) => b.addEventListener('click', () => api.pick(b.dataset.cut)));
  new ResizeObserver(() => { map = null; draw(); }).observe(root);
  draw();
  root.__cut = api;
  return api;
}
