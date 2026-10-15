/*
 * 地理 Geography · 示意小鎮的平面地圖（canvas，不需要 WebGL；第四課的兩個小互動共用）。
 *   drawTownMap(ctx, W, H, { view, dpr, labels })   view = { cx, cy, km }：以 (cx, cy) 為中心、畫 km 公里寬的範圍
 *     → 回傳 { toXY(x, y), toKm(px, py), pxPerKm }
 * 底圖：淡淡的分層設色＋每 100 公尺一條等高線；上面是面（稻田、森林、房屋）、線（河、公路、步道）、點（符號）。
 * 比例尺越大（km 越小），房屋畫成一棟一棟、公路畫得越寬。
 */
import { contour, contourLevels, sampleGrid } from './terrain.js';
import { hypso } from './contourmap2d.js';
import { AREAS, LINES, POINTS, townIsland } from './town.js';
import { SYMBOLS } from './symbols.js';

const I = townIsland();
const GRID = sampleGrid(I.h, I.box, 161);
const LEVELS = contourLevels(100, 1100, 100).map((L) => ({ L, lines: contour(GRID, L) }));
const COAST = contour(GRID, 0);

/** 小鎮裡一棟一棟的房子（固定的亂數，每次都一樣） */
function houses() {
  const out = [], [[x0, y0], [x1], [, y1]] = [AREAS.town.polys[0][0], AREAS.town.polys[0][1], AREAS.town.polys[0][2]];
  let s = 7;
  const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  for (let y = Math.min(y0, y1) + 0.03; y < Math.max(y0, y1) - 0.03; y += 0.07) for (let x = x0 + 0.03; x < x1 - 0.03; x += 0.075) {
    if (rnd() < 0.18) continue;
    out.push([x + (rnd() - 0.5) * 0.02, y + (rnd() - 0.5) * 0.02, 0.035 + rnd() * 0.02, 0.03 + rnd() * 0.015]);
  }
  return out;
}
export const HOUSES = houses();

export function drawTownMap(ctx, W, H, { view = { cx: 0, cy: 0, km: 10 }, dpr = 1, labels = true, sym = 22 } = {}) {
  const pxPerKm = Math.min(W, H) / view.km;
  const toXY = (x, y) => [W / 2 + (x - view.cx) * pxPerKm, H / 2 - (y - view.cy) * pxPerKm];
  const toKm = (px, py) => [view.cx + (px - W / 2) / pxPerKm, view.cy - (py - H / 2) / pxPerKm];
  // 底圖（裝置像素）
  const pw = Math.round(W * dpr), ph = Math.round(H * dpr), img = ctx.createImageData(pw, ph);
  for (let j = 0; j < ph; j++) for (let i = 0; i < pw; i++) {
    const [x, y] = toKm((i + 0.5) / dpr, (j + 0.5) / dpr), z = I.h(x, y);
    const c = z < 0 ? [170, 206, 236] : hypso(z).map((v) => Math.round(v * 0.45 + 255 * 0.55));
    const k = 4 * (j * pw + i); img.data[k] = c[0]; img.data[k + 1] = c[1]; img.data[k + 2] = c[2]; img.data[k + 3] = 255;
  }
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.putImageData(img, 0, 0); ctx.restore();
  const path = (pts, close) => { pts.forEach((p, i) => { const [x, y] = toXY(p[0], p[1]); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); if (close) ctx.closePath(); };
  ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // 等高線與海岸線
  ctx.strokeStyle = 'rgba(140,96,60,.45)'; ctx.lineWidth = 0.8;
  for (const { L, lines } of LEVELS) { ctx.beginPath(); for (const l of lines) path(l); ctx.lineWidth = L % 500 === 0 ? 1.4 : 0.8; ctx.stroke(); }
  ctx.strokeStyle = '#3d74b5'; ctx.lineWidth = 1.4; ctx.beginPath(); for (const l of COAST) path(l); ctx.stroke();
  // 面
  for (const key of ['rice', 'forest']) for (const poly of AREAS[key].polys) {
    ctx.beginPath(); path(poly, true);
    ctx.fillStyle = key === 'rice' ? 'rgba(217,236,154,.9)' : 'rgba(159,209,138,.85)'; ctx.fill();
    ctx.save(); ctx.clip();
    const xs = poly.map((p) => toXY(...p)), minX = Math.min(...xs.map((p) => p[0])), maxX = Math.max(...xs.map((p) => p[0])), minY = Math.min(...xs.map((p) => p[1])), maxY = Math.max(...xs.map((p) => p[1]));
    const step = Math.max(9, Math.min(22, pxPerKm * 0.12));
    for (let y = minY + step / 2, r = 0; y < maxY; y += step, r++) for (let x = minX + (r % 2) * step / 2; x < maxX; x += step) {
      if (key === 'rice') { ctx.strokeStyle = '#6a9a2a'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x - step * 0.3, y); ctx.lineTo(x + step * 0.3, y); ctx.stroke(); }
      else { ctx.fillStyle = '#3f7d32'; ctx.beginPath(); ctx.arc(x, y, Math.max(1.4, step * 0.16), 0, Math.PI * 2); ctx.fill(); }
    }
    ctx.restore();
  }
  // 房屋：比例尺小的時候是一塊，大的時候一棟一棟
  if (view.km > 4) { ctx.beginPath(); path(AREAS.town.polys[0], true); ctx.fillStyle = 'rgba(91,74,58,.75)'; ctx.fill(); }
  else { ctx.fillStyle = '#5b4a3a'; for (const [x, y, w, h] of HOUSES) { const [px, py] = toXY(x, y); ctx.fillRect(px - w * pxPerKm / 2, py - h * pxPerKm / 2, w * pxPerKm, h * pxPerKm); } }
  // 線
  const roadW = Math.max(3, Math.min(14, pxPerKm * 0.012 + 2.4));
  ctx.strokeStyle = '#2f7fd6'; ctx.lineWidth = Math.max(2, roadW * 0.6); ctx.beginPath(); path(LINES.river.pts); ctx.stroke();
  for (const k of ['road', 'lane', 'coast']) { ctx.beginPath(); path(LINES[k].pts); ctx.strokeStyle = '#2b2118'; ctx.lineWidth = roadW + 2; ctx.stroke(); ctx.strokeStyle = '#ffd36e'; ctx.lineWidth = roadW; ctx.stroke(); }
  ctx.setLineDash([6, 4]); ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 1.8; ctx.beginPath(); path(LINES.trail.pts); ctx.stroke(); ctx.setLineDash([]);
  // 點
  const s = sym * Math.max(0.8, Math.min(1.6, pxPerKm / 70));
  for (const [key, p] of Object.entries(POINTS)) {
    const [x, y] = toXY(p.x, p.y);
    if (x < -s || y < -s || x > W + s || y > H + s) continue;
    if (key !== 'bridge') { ctx.beginPath(); ctx.arc(x, y, s * 0.55, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.fill(); }
    SYMBOLS[key].draw(ctx, x, y, s);
    if (key === 'summit') { ctx.font = '800 11px system-ui, sans-serif'; ctx.fillStyle = '#2b2118'; ctx.textAlign = 'left'; ctx.fillText(`${Math.round(I.h(p.x, p.y))}`, x + s * 0.45, y + 4); }
    if (labels && pxPerKm > 120) { ctx.font = '700 11px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(255,255,255,.9)'; ctx.strokeText(p.en, x, y + s * 0.95); ctx.fillStyle = '#2b2118'; ctx.fillText(p.en, x, y + s * 0.95); }
  }
  ctx.lineCap = 'butt';
  return { toXY, toKm, pxPerKm };
}

/** 北方箭頭 */
export function drawNorth(ctx, x, y, r = 16) {
  ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.beginPath(); ctx.arc(x, y, r + 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#2b2118'; ctx.beginPath(); ctx.moveTo(x, y - r); ctx.lineTo(x + r * 0.45, y + r * 0.6); ctx.lineTo(x, y + r * 0.25); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.strokeStyle = '#2b2118'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x, y - r); ctx.lineTo(x - r * 0.45, y + r * 0.6); ctx.lineTo(x, y + r * 0.25); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#2b2118'; ctx.font = '800 11px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('N', x, y - r - 3);
}

/** 圖形比例尺：挑一個「好看的」整數長度 */
export function niceBar(pxPerKm, maxPx) {
  const opts = [0.05, 0.1, 0.2, 0.25, 0.5, 1, 2, 5];
  let km = opts[0];
  for (const o of opts) if (o * pxPerKm <= maxPx) km = o;
  return { km, px: km * pxPerKm, label: km < 1 ? `${Math.round(km * 1000)} m` : `${km} km` };
}
export function drawBar(ctx, x, y, pxPerKm, maxPx) {
  const b = niceBar(pxPerKm, maxPx);
  ctx.fillStyle = 'rgba(255,255,255,.88)'; ctx.fillRect(x - 6, y - 18, b.px + 12, 26);
  ctx.fillStyle = '#2b2118'; ctx.fillRect(x, y, b.px, 4); ctx.fillStyle = '#fff'; ctx.fillRect(x + b.px / 2, y + 1, b.px / 2 - 1, 2);
  ctx.fillStyle = '#2b2118'; ctx.fillRect(x, y - 4, 1.5, 8); ctx.fillRect(x + b.px - 1.5, y - 4, 1.5, 8);
  ctx.font = '700 10px system-ui, sans-serif'; ctx.textAlign = 'left'; ctx.fillText('0', x - 2, y - 7); ctx.textAlign = 'right'; ctx.fillText(b.label, x + b.px + 2, y - 7);
  return b;
}
