/*
 * 地理 Geography · 地圖符號（自己畫的，只參考一般地形圖符號「長什麼樣子」，不是任何機關的官方圖例）。
 *   SYMBOLS[key].draw(ctx, x, y, s)   在 (x, y) 畫一個大約 s 像素大的符號
 *   SYMBOLS[key].en／zh／kind          名稱；kind 是 point／line／area
 *   symbolDataURL(key, px)             畫成一張小圖（HTML 標籤與圖例用）
 * 不用任何宗教圖案（廟用屋頂的形狀表示）。
 */
const ink = '#2b2118';
function circle(ctx, x, y, r, fill, stroke) { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.stroke(); } }

export const SYMBOLS = {
  school: { en: 'School', zh: '學校', kind: 'point', draw(c, x, y, s) {
    const w = s * 0.7, h = s * 0.45;
    c.fillStyle = '#fff'; c.strokeStyle = ink; c.lineWidth = Math.max(1, s / 14);
    c.fillRect(x - w / 2, y - h / 2 + s * 0.1, w, h); c.strokeRect(x - w / 2, y - h / 2 + s * 0.1, w, h);
    c.beginPath(); c.moveTo(x, y - h / 2 + s * 0.1); c.lineTo(x, y - s * 0.5); c.stroke();
    c.fillStyle = '#d63a3a'; c.beginPath(); c.moveTo(x, y - s * 0.5); c.lineTo(x + s * 0.28, y - s * 0.4); c.lineTo(x, y - s * 0.3); c.closePath(); c.fill();
  } },
  temple: { en: 'Temple', zh: '廟', kind: 'point', draw(c, x, y, s) {
    c.lineWidth = Math.max(1, s / 14); c.strokeStyle = ink;
    c.fillStyle = '#c0392b'; c.beginPath(); c.moveTo(x - s * 0.48, y - s * 0.05); c.quadraticCurveTo(x, y - s * 0.32, x + s * 0.48, y - s * 0.05); c.lineTo(x + s * 0.36, y - s * 0.2); c.quadraticCurveTo(x, y - s * 0.48, x - s * 0.36, y - s * 0.2); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#fff'; c.fillRect(x - s * 0.3, y - s * 0.05, s * 0.6, s * 0.38); c.strokeRect(x - s * 0.3, y - s * 0.05, s * 0.6, s * 0.38);
  } },
  harbor: { en: 'Harbor', zh: '港口', kind: 'point', draw(c, x, y, s) {
    c.strokeStyle = '#1d4f91'; c.lineWidth = Math.max(1.4, s / 9); c.lineCap = 'round';
    circle(c, x, y - s * 0.32, s * 0.1, null, '#1d4f91');
    c.beginPath(); c.moveTo(x, y - s * 0.22); c.lineTo(x, y + s * 0.4); c.moveTo(x - s * 0.2, y - s * 0.08); c.lineTo(x + s * 0.2, y - s * 0.08);
    c.moveTo(x - s * 0.36, y + s * 0.12); c.quadraticCurveTo(x - s * 0.3, y + s * 0.42, x, y + s * 0.42); c.quadraticCurveTo(x + s * 0.3, y + s * 0.42, x + s * 0.36, y + s * 0.12); c.stroke(); c.lineCap = 'butt';
  } },
  lighthouse: { en: 'Lighthouse', zh: '燈塔', kind: 'point', draw(c, x, y, s) {
    c.strokeStyle = '#e8b400'; c.lineWidth = Math.max(1, s / 14);
    for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; c.beginPath(); c.moveTo(x + Math.cos(a) * s * 0.2, y - s * 0.2 + Math.sin(a) * s * 0.2); c.lineTo(x + Math.cos(a) * s * 0.42, y - s * 0.2 + Math.sin(a) * s * 0.42); c.stroke(); }
    c.fillStyle = '#fff'; c.strokeStyle = ink; c.beginPath(); c.moveTo(x - s * 0.1, y - s * 0.15); c.lineTo(x + s * 0.1, y - s * 0.15); c.lineTo(x + s * 0.17, y + s * 0.45); c.lineTo(x - s * 0.17, y + s * 0.45); c.closePath(); c.fill(); c.stroke();
    circle(c, x, y - s * 0.2, s * 0.1, '#ffd23a', ink);
  } },
  bridge: { en: 'Bridge', zh: '橋', kind: 'point', draw(c, x, y, s) {
    c.strokeStyle = ink; c.lineWidth = Math.max(1.4, s / 9);
    c.beginPath(); c.moveTo(x - s * 0.4, y - s * 0.35); c.lineTo(x - s * 0.2, y - s * 0.18); c.lineTo(x - s * 0.2, y + s * 0.18); c.lineTo(x - s * 0.4, y + s * 0.35);
    c.moveTo(x + s * 0.4, y - s * 0.35); c.lineTo(x + s * 0.2, y - s * 0.18); c.lineTo(x + s * 0.2, y + s * 0.18); c.lineTo(x + s * 0.4, y + s * 0.35); c.stroke();
  } },
  summit: { en: 'Summit (height in meters)', zh: '山頂（標高，公尺）', kind: 'point', draw(c, x, y, s) {
    c.fillStyle = ink; c.beginPath(); c.moveTo(x, y - s * 0.32); c.lineTo(x + s * 0.3, y + s * 0.2); c.lineTo(x - s * 0.3, y + s * 0.2); c.closePath(); c.fill();
  } },
  trailhead: { en: 'Trailhead', zh: '登山口', kind: 'point', draw(c, x, y, s) {
    circle(c, x, y, s * 0.36, '#fff', '#c0392b'); c.lineWidth = Math.max(1.2, s / 10);
    c.strokeStyle = '#c0392b'; c.beginPath(); c.moveTo(x - s * 0.2, y + s * 0.18); c.lineTo(x, y - s * 0.16); c.lineTo(x + s * 0.2, y + s * 0.18); c.stroke();
  } },
  hut: { en: 'Mountain hut', zh: '山屋', kind: 'point', draw(c, x, y, s) {
    c.fillStyle = '#fff'; c.strokeStyle = ink; c.lineWidth = Math.max(1, s / 14);
    c.beginPath(); c.moveTo(x - s * 0.32, y + s * 0.32); c.lineTo(x - s * 0.32, y - s * 0.02); c.lineTo(x, y - s * 0.32); c.lineTo(x + s * 0.32, y - s * 0.02); c.lineTo(x + s * 0.32, y + s * 0.32); c.closePath(); c.fill(); c.stroke();
  } },
  river: { en: 'River', zh: '河流', kind: 'line', draw(c, x, y, s) { c.strokeStyle = '#2f7fd6'; c.lineWidth = Math.max(2, s / 7); c.beginPath(); c.moveTo(x - s * 0.45, y + s * 0.1); c.bezierCurveTo(x - s * 0.15, y - s * 0.3, x + s * 0.15, y + s * 0.3, x + s * 0.45, y - s * 0.1); c.stroke(); } },
  road: { en: 'Road', zh: '公路', kind: 'line', draw(c, x, y, s) { c.strokeStyle = ink; c.lineWidth = Math.max(4, s / 3.4); c.beginPath(); c.moveTo(x - s * 0.45, y); c.lineTo(x + s * 0.45, y); c.stroke(); c.strokeStyle = '#ffd36e'; c.lineWidth = Math.max(2, s / 6); c.stroke(); } },
  trail: { en: 'Hiking trail', zh: '登山步道', kind: 'line', draw(c, x, y, s) { c.strokeStyle = '#c0392b'; c.lineWidth = Math.max(1.5, s / 9); c.setLineDash([s * 0.14, s * 0.1]); c.beginPath(); c.moveTo(x - s * 0.45, y); c.lineTo(x + s * 0.45, y); c.stroke(); c.setLineDash([]); } },
  rice: { en: 'Rice field', zh: '稻田', kind: 'area', draw(c, x, y, s) { c.fillStyle = '#d9ec9a'; c.fillRect(x - s * 0.45, y - s * 0.3, s * 0.9, s * 0.6); c.strokeStyle = '#6a9a2a'; c.lineWidth = 1; for (let i = -1; i <= 1; i++) { c.beginPath(); c.moveTo(x - s * 0.3, y + i * s * 0.15); c.lineTo(x - s * 0.05, y + i * s * 0.15); c.moveTo(x + s * 0.05, y + i * s * 0.15); c.lineTo(x + s * 0.3, y + i * s * 0.15); c.stroke(); } } },
  forest: { en: 'Forest', zh: '森林', kind: 'area', draw(c, x, y, s) { c.fillStyle = '#9fd18a'; c.fillRect(x - s * 0.45, y - s * 0.3, s * 0.9, s * 0.6); for (const [dx, dy] of [[-0.22, -0.08], [0.18, -0.1], [0, 0.12]]) circle(c, x + dx * s, y + dy * s, s * 0.11, '#3f7d32'); } },
  town: { en: 'Buildings', zh: '房屋', kind: 'area', draw(c, x, y, s) { c.fillStyle = '#5b4a3a'; for (const [dx, dy] of [[-0.3, -0.2], [0.05, -0.22], [-0.15, 0.1], [0.2, 0.08]]) c.fillRect(x + dx * s, y + dy * s, s * 0.22, s * 0.18); } },
};

const cache = new Map();
export function symbolDataURL(key, px = 28) {
  const id = key + px;
  if (cache.has(id)) return cache.get(id);
  const d = Math.min(globalThis.devicePixelRatio || 1, 2), cv = document.createElement('canvas');
  cv.width = cv.height = Math.round(px * d);
  const c = cv.getContext('2d'); c.setTransform(d, 0, 0, d, 0, 0);
  SYMBOLS[key].draw(c, px / 2, px / 2, px);
  const url = cv.toDataURL(); cache.set(id, url);
  return url;
}
