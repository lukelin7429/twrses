/*
 * 地理 Geography · 畫在 canvas 上的地圖（不需要 WebGL）。地球儀的貼圖、頁面上的小地圖、選項的小圖都用這一支。
 *
 *   view(proj, w, h, opt)            → { toXY(lon, lat, o), scale, cx, cy }：把整張地圖（或 opt.box 指定的範圍）塞進 w × h
 *   pathRing(ctx, ring, toXY, o)     把一個環接到目前的路徑
 *   drawLand(ctx, land, toXY, style) 畫所有陸地（evenodd，裏海是洞）
 *   drawGraticule(ctx, proj, toXY, step, style)  經緯線
 *   drawOutline(ctx, proj, toXY)     地圖的外框（莫爾威是橢圓、正射與極方位是圓）
 *   thumb(canvas, kind, land)        選項用的小地圖：mercator／equal（莫爾威）／polar（北極方位）／globe（正射）
 *
 * 配色只有陸地、海洋、經緯線——不畫國界、不標國名。
 */
import { extent, forward, goreOf } from './geo.js';

export const COLORS = { sea: '#16335f', seaLite: '#1d4379', land: '#8fbf7a', landEdge: '#5d8f52', grat: 'rgba(255,255,255,.22)', ice: '#e8eef5' };

/**
 * opt.box = [lonMin, latMin, lonMax, latMax]：只取這個範圍（用投影後的四個角算外框，圓柱類投影適用）。
 * opt.pad：四周留白（像素）。回傳的 toXY(lon, lat, o) 給畫圖用，o 傳給 forward（例如 gore、lon0）。
 */
export function view(proj, w, h, opt = {}) {
  const pad = opt.pad || 0;
  let x0, x1, y0, y1;
  if (opt.box) {
    const [a, b, c, d] = opt.box;
    const p = forward(proj, a, b, opt.o), q = forward(proj, c, d, opt.o);
    x0 = p[0]; x1 = q[0]; y0 = p[1]; y1 = q[1];
  } else {
    const e = extent(proj);
    x0 = -e.w / 2; x1 = e.w / 2; y0 = -e.h / 2; y1 = e.h / 2;
  }
  const scale = Math.min((w - 2 * pad) / (x1 - x0), (h - 2 * pad) / (y1 - y0));
  const cx = w / 2 - scale * (x0 + x1) / 2, cy = h / 2 + scale * (y0 + y1) / 2;
  const toXY = (lon, lat, o) => {
    const p = forward(proj, lon, lat, o || opt.o);
    return p ? [cx + scale * p[0], cy - scale * p[1]] : null;
  };
  const toLonLatY = (py) => (cy - py) / scale;   // 地圖 y 座標（R = 1）
  const toMapX = (px) => (px - cx) / scale;
  return { toXY, scale, cx, cy, toLonLatY, toMapX, w, h };
}

export function pathRing(ctx, ring, toXY, o) {
  let first = true;
  for (const [lon, lat] of ring) {
    const p = toXY(lon, lat, o);
    if (!p) continue;
    if (first) { ctx.moveTo(p[0], p[1]); first = false; } else ctx.lineTo(p[0], p[1]);
  }
  ctx.closePath();
}

/** 正射投影：背面的點拉到圓的邊上（只給小圖用，夠看） */
function pathRingOrtho(ctx, ring, proj, v, o) {
  let first = true;
  for (const [lon, lat] of ring) {
    let p = forward(proj, lon, lat, o);
    if (!p) {
      const l = (lon - (o.lon0 || 0)) * Math.PI / 180, ph = lat * Math.PI / 180, p0 = (o.lat0 || 0) * Math.PI / 180;
      const x = Math.cos(ph) * Math.sin(l), y = Math.cos(p0) * Math.sin(ph) - Math.sin(p0) * Math.cos(ph) * Math.cos(l);
      const r = Math.hypot(x, y) || 1;
      p = [x / r, y / r];
    }
    const X = v.cx + v.scale * p[0], Y = v.cy - v.scale * p[1];
    if (first) { ctx.moveTo(X, Y); first = false; } else ctx.lineTo(X, Y);
  }
  ctx.closePath();
}
const allBehind = (ring, o) => ring.every(([lon, lat]) => !forward('ortho', lon, lat, o));

export function drawLand(ctx, land, toXY, style = {}) {
  ctx.beginPath();
  for (const poly of land.polys) for (const ring of poly) pathRing(ctx, ring, toXY);
  ctx.fillStyle = style.fill || COLORS.land;
  ctx.fill('evenodd');
  if (style.stroke) { ctx.lineWidth = style.lineWidth || 1; ctx.strokeStyle = style.stroke; ctx.lineJoin = 'round'; ctx.stroke(); }
}

/** 橘子皮：每個多邊形照每一瓣各畫一次，用那一瓣的範圍裁切 */
export function drawLandGores(ctx, land, v, style = {}, n = 12) {
  for (let g = 0; g < n; g++) {
    const w = 360 / n, a = -180 + g * w, b = a + w;
    ctx.save();
    ctx.beginPath();
    for (let lat = -90; lat <= 90; lat += 3) { const p = v.toXY(a, lat, { gore: g, n }); lat === -90 ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1]); }
    for (let lat = 90; lat >= -90; lat -= 3) { const p = v.toXY(b, lat, { gore: g, n }); ctx.lineTo(p[0], p[1]); }
    ctx.closePath();
    ctx.fillStyle = style.sea || COLORS.sea; ctx.fill();
    ctx.clip();
    ctx.beginPath();
    for (const poly of land.polys) {
      const xs = poly[0].map((p) => p[0]);
      if (Math.max(...xs) < a - 1 || Math.min(...xs) > b + 1) continue;
      for (const ring of poly) pathRing(ctx, ring, v.toXY, { gore: g, n });
    }
    ctx.fillStyle = style.fill || COLORS.land; ctx.fill('evenodd');
    ctx.restore();
  }
}

export function drawGraticule(ctx, proj, toXY, step = 30, style = {}) {
  ctx.beginPath();
  const line = (pts) => { let f = true; for (const p of pts) { if (!p) { f = true; continue; } if (f) { ctx.moveTo(p[0], p[1]); f = false; } else ctx.lineTo(p[0], p[1]); } };
  const latMax = style.latMax != null ? style.latMax : 90, latMin = style.latMin != null ? style.latMin : -90;
  for (let lon = -180; lon <= 180; lon += step) {
    const pts = []; for (let lat = latMin; lat <= latMax + 1e-9; lat += 2) pts.push(toXY(lon, Math.min(lat, latMax))); line(pts);
  }
  for (let lat = -90 + step; lat < 90; lat += step) {
    if (lat < latMin || lat > latMax) continue;
    const pts = []; for (let lon = -180; lon <= 180; lon += 3) pts.push(toXY(lon, lat)); line(pts);
  }
  ctx.lineWidth = style.lineWidth || 1; ctx.strokeStyle = style.stroke || COLORS.grat; ctx.stroke();
}

export function outlinePath(ctx, proj, v) {
  ctx.beginPath();
  if (proj === 'mollweide') { const e = extent(proj); ctx.ellipse(v.cx, v.cy, v.scale * e.w / 2, v.scale * e.h / 2, 0, 0, Math.PI * 2); }
  else if (proj === 'ortho') ctx.arc(v.cx, v.cy, v.scale, 0, Math.PI * 2);
  else { const e = extent(proj); ctx.rect(v.cx - v.scale * e.w / 2, v.cy - v.scale * e.h / 2, v.scale * e.w, v.scale * e.h); }
}

/** 選項用的小地圖。kind：mercator、equal、polar、globe、plate、gores */
export function thumb(canvas, kind, land, dpr = Math.min(window.devicePixelRatio || 1, 2)) {
  const W = canvas.clientWidth || 150, H = canvas.clientHeight || 100;
  canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, W, H);
  const pad = 4;
  if (kind === 'globe') {
    const o = { lon0: 60, lat0: 22 };
    const v = view('ortho', W, H, { pad, o });
    outlinePath(ctx, 'ortho', v);
    const g = ctx.createRadialGradient(v.cx - v.scale * 0.35, v.cy - v.scale * 0.4, v.scale * 0.1, v.cx, v.cy, v.scale);
    g.addColorStop(0, '#2a5fa8'); g.addColorStop(1, '#0f2547');
    ctx.fillStyle = g; ctx.fill();
    ctx.save(); outlinePath(ctx, 'ortho', v); ctx.clip();
    ctx.beginPath();
    for (const poly of land.polys) { if (allBehind(poly[0], o)) continue; for (const ring of poly) pathRingOrtho(ctx, ring, 'ortho', v, o); }
    ctx.fillStyle = COLORS.land; ctx.fill('evenodd');
    drawGraticule(ctx, 'ortho', (a, b) => v.toXY(a, b, o), 30, { stroke: 'rgba(255,255,255,.18)' });
    ctx.restore();
    return;
  }
  if (kind === 'polar') {
    const R = Math.min(W, H) / 2 - pad, cx = W / 2, cy = H / 2, sc = R / (Math.PI / 2);   // 只畫到赤道
    const toXY = (lon, lat) => { const p = forward('polar_n', lon, Math.max(lat, -8)); return [cx + sc * p[0], cy - sc * p[1]]; };
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fillStyle = COLORS.sea; ctx.fill(); ctx.clip();
    ctx.beginPath();
    for (const poly of land.polys) { if (Math.max(...poly[0].map((p) => p[1])) < 0) continue; for (const ring of poly) pathRing(ctx, ring, toXY); }
    ctx.fillStyle = COLORS.land; ctx.fill('evenodd');
    drawGraticule(ctx, 'polar_n', toXY, 30, { latMin: 0, stroke: 'rgba(255,255,255,.2)' });
    ctx.restore();
    return;
  }
  if (kind === 'gores') {
    const v = view('gores', W, H, { pad });
    drawLandGores(ctx, land, v);
    return;
  }
  const proj = { mercator: 'mercator', equal: 'mollweide', plate: 'equirect', peters: 'gallpeters' }[kind];
  const v = view(proj, W, H, { pad });
  ctx.save(); outlinePath(ctx, proj, v); ctx.fillStyle = COLORS.sea; ctx.fill(); ctx.clip();
  drawLand(ctx, land, v.toXY);
  drawGraticule(ctx, proj, v.toXY, 30, { stroke: 'rgba(255,255,255,.18)', latMax: proj === 'mercator' ? 85 : 90, latMin: proj === 'mercator' ? -85 : -90 });
  ctx.restore();
}

export { goreOf };
