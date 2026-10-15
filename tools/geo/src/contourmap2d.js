/*
 * 地理 Geography · 畫在 canvas 上的等高線地圖（不需要 WebGL；第三課的兩個小互動共用，之後的地形課也用）。
 *   hypso(z)                              海拔 → 分層設色（海是藍色，越高從綠到黃到褐）
 *   drawContourMap(ctx, W, H, opt)        畫一張等高線地圖：分層設色底圖＋每 interval 一條等高線，每 5 條加粗並標高度
 *                                         opt = { M（terrain.js 的地形）, grid, interval, pad } → 回傳 { toXY(x, y), toKm(px, py), scale }
 *   drawProfile(ctx, W, H, prs, opt)      畫一張或幾張剖面圖（同一個比例尺），prs = [{ pts, color }]
 */
import { contour, contourLevels } from './terrain.js';

const STOPS = [[-200, [24, 62, 118]], [-0.01, [36, 88, 150]], [0, [150, 196, 136]], [150, [184, 212, 146]], [350, [222, 214, 156]], [600, [214, 182, 134]], [850, [190, 150, 116]], [1100, [236, 228, 218]]];
export function hypso(z) {
  for (let i = 1; i < STOPS.length; i++) {
    if (z <= STOPS[i][0]) {
      const [a, ca] = STOPS[i - 1], [b, cb] = STOPS[i];
      const t = Math.max(0, Math.min(1, (z - a) / (b - a)));
      return [0, 1, 2].map((k) => Math.round(ca[k] + (cb[k] - ca[k]) * t));
    }
  }
  return STOPS[STOPS.length - 1][1];
}

export function drawContourMap(ctx, W, H, { M, grid, interval = 100, pad = 0, labels = true, dpr = 1 }) {
  const [x0, y0, x1, y1] = M.box;
  const size = Math.min(W, H) - 2 * pad, scale = size / (x1 - x0);
  const ox = (W - size) / 2, oy = (H - size) / 2;
  const toXY = (x, y) => [ox + (x - x0) * scale, oy + (y1 - y) * scale];
  const toKm = (px, py) => [x0 + (px - ox) / scale, y1 - (py - oy) / scale];
  // 分層設色：用像素算（裝置像素）
  const pw = Math.round(size * dpr), img = ctx.createImageData(pw, pw);
  for (let j = 0; j < pw; j++) for (let i = 0; i < pw; i++) {
    const c = hypso(M.h(x0 + (i + 0.5) / pw * (x1 - x0), y1 - (j + 0.5) / pw * (y1 - y0)));
    const k = 4 * (j * pw + i); img.data[k] = c[0]; img.data[k + 1] = c[1]; img.data[k + 2] = c[2]; img.data[k + 3] = 255;
  }
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.putImageData(img, Math.round(ox * dpr), Math.round(oy * dpr)); ctx.restore();
  // 等高線
  const levels = contourLevels(0, 1200, interval);
  ctx.lineJoin = 'round';
  const labelsAt = [];
  for (const L of levels) {
    const index = L % (interval * 5) === 0;
    ctx.beginPath();
    for (const line of contour(grid, L)) line.forEach(([x, y], i) => { const [px, py] = toXY(x, y); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); });
    ctx.strokeStyle = L === 0 ? 'rgba(20,50,90,.9)' : index ? 'rgba(92,52,24,.95)' : 'rgba(110,70,40,.6)';
    ctx.lineWidth = L === 0 ? 1.6 : index ? 1.7 : 0.9;
    ctx.stroke();
    if (labels && index && L > 0) {
      const lines = contour(grid, L).filter((l) => l.length > 12);
      for (const line of lines) { const p = line[Math.floor(line.length * 0.2)]; labelsAt.push([L, ...toXY(p[0], p[1])]); }
    }
  }
  ctx.font = '700 10px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  for (const [L, px, py] of labelsAt) {
    const t = `${L}`; const w = ctx.measureText(t).width + 4;
    ctx.fillStyle = 'rgba(245,236,214,.92)'; ctx.fillRect(px - w / 2, py - 6, w, 12);
    ctx.fillStyle = '#5c3418'; ctx.fillText(t, px, py + 0.5);
  }
  ctx.textBaseline = 'alphabetic';
  // 外框與方位、比例尺
  ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 1; ctx.strokeRect(ox, oy, size, size);
  ctx.fillStyle = '#fff'; ctx.font = '800 11px system-ui, sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('N ↑', ox + size - 16, oy + 16);
  const bar = scale * 2;
  ctx.fillStyle = 'rgba(6,10,22,.6)'; ctx.fillRect(ox + 6, oy + size - 24, bar + 12, 18);
  ctx.fillStyle = '#fff'; ctx.fillRect(ox + 12, oy + size - 12, bar, 3);
  ctx.font = '700 9px system-ui, sans-serif'; ctx.textAlign = 'left'; ctx.fillText('2 km', ox + 12, oy + size - 15);
  return { toXY, toKm, scale, ox, oy, size };
}

/** 剖面圖：x 是水平距離（公里），y 是海拔（公尺）；同一張圖上的剖面共用比例尺 */
export function drawProfile(ctx, W, H, prs, { zMax = 1100, dMax, pad = 28, sea = true } = {}) {
  ctx.clearRect(0, 0, W, H);
  const L = pad + 6, R = 10, T = 10, B = 22;
  const dm = dMax || Math.max(...prs.map((p) => p.pts[p.pts.length - 1].d), 0.1);
  const X = (d) => L + (W - L - R) * d / dm, Y = (z) => T + (H - T - B) * (1 - Math.max(-100, z) / zMax);
  ctx.strokeStyle = 'rgba(255,255,255,.12)'; ctx.lineWidth = 1; ctx.font = '600 9px system-ui, sans-serif'; ctx.fillStyle = '#9fb0cf'; ctx.textAlign = 'right';
  for (let z = 0; z <= zMax; z += 200) { ctx.beginPath(); ctx.moveTo(L, Y(z)); ctx.lineTo(W - R, Y(z)); ctx.stroke(); ctx.fillText(`${z} m`, L - 4, Y(z) + 3); }
  ctx.textAlign = 'center';
  for (let d = 0; d <= dm + 1e-9; d += dm > 6 ? 2 : 1) ctx.fillText(`${d} km`, X(d), H - 6);
  if (sea) { ctx.fillStyle = 'rgba(36,88,150,.55)'; ctx.fillRect(L, Y(0), W - L - R, H - B - Y(0)); }
  for (const p of prs) {
    ctx.beginPath(); ctx.moveTo(X(0), Y(-100));
    for (const q of p.pts) ctx.lineTo(X(q.d), Y(q.z));
    ctx.lineTo(X(p.pts[p.pts.length - 1].d), Y(-100)); ctx.closePath();
    ctx.globalAlpha = prs.length > 1 ? 0.22 : 0.5; ctx.fillStyle = p.fill || p.color; ctx.fill(); ctx.globalAlpha = 1;
    ctx.beginPath(); p.pts.forEach((q, i) => (i ? ctx.lineTo(X(q.d), Y(q.z)) : ctx.moveTo(X(q.d), Y(q.z))));
    ctx.strokeStyle = p.color; ctx.lineWidth = 2.2; ctx.stroke();
  }
  return { X, Y };
}
