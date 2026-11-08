/*
 * 地理 Geography · 畫在 canvas 上的台灣地形小地圖與剖面（不需要 WebGL；第九課的兩個小互動與 3D 旁邊的剖面共用）。
 *   twColor(z)                              海拔 → 顏色（0 公尺綠、越高越黃褐、最高處淡灰白；海是深藍）
 *   drawTaiwan(ctx, W, H, T, dpr)           分層設色的台灣（北在上）；回傳 { toXY(e, n), toEN(px, py), scale }
 *   drawCut(ctx, W, H, pts, opt)            東西向剖面：pts = [{ e, z }]，opt = { exag, e0, e1, zMax, mark }，回傳 { toXY(e, z) }
 */
const STOPS = [[0, [96, 150, 92]], [100, [132, 176, 110]], [400, [196, 198, 132]], [1000, [204, 164, 110]], [2000, [168, 124, 92]], [3000, [150, 120, 104]], [3800, [232, 228, 222]]];
export function twColor(z) {
  if (Number.isNaN(z)) return [20, 52, 96];
  for (let i = 1; i < STOPS.length; i++) {
    if (z <= STOPS[i][0]) {
      const [a, ca] = STOPS[i - 1], [b, cb] = STOPS[i], t = Math.max(0, Math.min(1, (z - a) / (b - a)));
      return [0, 1, 2].map((k) => Math.round(ca[k] + (cb[k] - ca[k]) * t));
    }
  }
  return STOPS[STOPS.length - 1][1];
}

export function drawTaiwan(ctx, W, H, T, dpr = 1, pad = 6) {
  const scale = Math.min((W - 2 * pad) / T.nx, (H - 2 * pad) / T.ny);
  const ox = (W - T.nx * scale) / 2, oy = (H - T.ny * scale) / 2;
  const toXY = (e, n) => [ox + (e - T.e0) * scale, oy + (T.n0 + T.ny - n) * scale];
  const toEN = (px, py) => [T.e0 + (px - ox) / scale, T.n0 + T.ny - (py - oy) / scale];
  const img = ctx.createImageData(T.nx, T.ny);
  for (let i = 0; i < T.ny; i++) for (let j = 0; j < T.nx; j++) {
    const z = T.grid[i * T.nx + j], o = ((T.ny - 1 - i) * T.nx + j) * 4, c = twColor(z);
    // 簡單的山影：和西北邊的格子比，亮一點或暗一點
    const zw = T.grid[Math.min(T.ny - 1, i + 1) * T.nx + Math.max(0, j - 1)];
    const sh = Number.isNaN(z) || Number.isNaN(zw) ? 0 : Math.max(-40, Math.min(40, (zw - z) * -0.08));
    img.data[o] = c[0] + sh; img.data[o + 1] = c[1] + sh; img.data[o + 2] = c[2] + sh; img.data[o + 3] = 255;
  }
  const off = document.createElement('canvas'); off.width = T.nx; off.height = T.ny; off.getContext('2d').putImageData(img, 0, 0);
  ctx.fillStyle = '#14345f'; ctx.fillRect(0, 0, W, H);
  ctx.imageSmoothingEnabled = true; ctx.drawImage(off, ox, oy, T.nx * scale, T.ny * scale);
  return { toXY, toEN, scale };
}

export function drawCut(ctx, W, H, pts, { exag = 10, e0, e1, zMax = 4000, mark = null, padL = 38, padB = 22 } = {}) {
  ctx.fillStyle = '#0a1226'; ctx.fillRect(0, 0, W, H);
  const pw = W - padL - 8, ph = H - padB - 10;
  // 垂直誇大：水平 1 公里 ＝ 垂直 1000/exag 公尺；照可用的寬度決定比例，zMax 只是上限
  const sx = pw / (e1 - e0), sy = Math.min(ph / zMax, sx * exag / 1000);
  const base = 10 + ph;
  const toXY = (e, z) => [padL + (e - e0) * sx, base - z * sy];
  ctx.strokeStyle = 'rgba(160,180,230,.18)'; ctx.fillStyle = '#7f8fb0'; ctx.font = '11px system-ui, sans-serif'; ctx.textAlign = 'right';
  const top = (base - 4) / sy, step = top > 2500 ? 1000 : top > 1000 ? 500 : top > 400 ? 200 : 100;   // 格線的間距跟著畫得下的高度
  for (let z = 0; z <= zMax; z += step) { const [, y] = toXY(e0, z); if (y < 4) break; ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(W - 8, y); ctx.stroke(); ctx.fillText(z ? (z % 1000 ? `${z} m` : `${z / 1000}k m`) : '0', padL - 4, y + 4); }
  // 海
  const [, y0] = toXY(e0, 0);
  ctx.fillStyle = 'rgba(63,143,224,.35)'; ctx.fillRect(padL, y0, pw, 6);
  // 地形
  ctx.beginPath(); let open = false;
  const close = (e) => { const [x] = toXY(e, 0); ctx.lineTo(x, y0); ctx.closePath(); open = false; };
  let last = null;
  for (const p of pts) {
    if (Number.isNaN(p.z)) { if (open) close(last.e); continue; }
    const [x, y] = toXY(p.e, p.z);
    if (!open) { const [xs] = toXY(p.e, 0); ctx.moveTo(xs, y0); open = true; }
    ctx.lineTo(x, y); last = p;
  }
  if (open) close(last.e);
  const g = ctx.createLinearGradient(0, toXY(0, 3500)[1], 0, y0); g.addColorStop(0, '#d9c3a2'); g.addColorStop(0.5, '#a9814f'); g.addColorStop(1, '#5f965c');
  ctx.fillStyle = g; ctx.fill(); ctx.strokeStyle = '#fff3c4'; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.textAlign = 'left'; ctx.fillStyle = '#9fb0cf';
  ctx.fillText('W 西', padL + 2, H - 6); ctx.textAlign = 'right'; ctx.fillText('東 E', W - 10, H - 6);
  if (mark) { const [x, y] = toXY(mark.e, mark.z); ctx.fillStyle = '#ff6b6b'; ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill(); }
  return { toXY };
}
