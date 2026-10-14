/*
 * 世界歷史 World History · 畫在 canvas 上的世界地圖（不需要 WebGL；每一課都可以用）。
 * 等距圓柱投影，只畫陸地的外形（Natural Earth，公有領域）；**不畫國界、不標國名**。
 *
 *   makeView(w, h, { south, north, west, east }) → { x(lon), y(lat), lonLat(px, py), w, h }
 *   drawWorld(ctx, view, land, { sea, fill, stroke })
 *   halo(ctx, view, [lon, lat], rDeg, color, alpha)   「大約這一帶」的光暈：沒有邊界線，往外淡掉
 */
export function makeView(w, h, box = {}) {
  const { south = -58, north = 74, west = -180, east = 180 } = box;
  const x = (lon) => (lon - west) / (east - west) * w, y = (lat) => (north - lat) / (north - south) * h;
  return { w, h, south, north, west, east, x, y, lonLat: (px, py) => [west + px / w * (east - west), north - py / h * (north - south)], k: w / (east - west) };
}
export const aspect = (box = {}) => { const { south = -58, north = 74, west = -180, east = 180 } = box; return (east - west) / (north - south); };

export function drawWorld(ctx, view, land, { sea = '#dbe9f4', fill = '#c9d8b6', stroke = '#9db386' } = {}) {
  ctx.fillStyle = sea; ctx.fillRect(0, 0, view.w, view.h);
  ctx.beginPath();
  for (const { rings, box } of land) {
    if (box[3] < view.south || box[1] > view.north) continue;
    for (const r of rings) {
      ctx.moveTo(view.x(r[0][0]), view.y(r[0][1]));
      for (let i = 1; i < r.length; i++) ctx.lineTo(view.x(r[i][0]), view.y(r[i][1]));
      ctx.closePath();
    }
  }
  ctx.fillStyle = fill; ctx.fill('evenodd');
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 0.6; ctx.lineJoin = 'round'; ctx.stroke(); }
}

export function halo(ctx, view, at, rDeg, color, alpha = 1) {
  const cx = view.x(at[0]), cy = view.y(at[1]), r = rDeg * view.k;
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  g.addColorStop(0, color); g.addColorStop(0.45, color); g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.save(); ctx.globalAlpha = alpha; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill(); ctx.restore();
}
