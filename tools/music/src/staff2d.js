/*
 * 音樂 Music · 在 canvas 上畫五線譜（單元二各課共用）。不載任何網頁字型：譜號用路徑自己畫（簡化的形狀）。
 *
 *   drawStaff(canvas, { clef, notes: [{ pos, color, label }], hover, width })
 *     五條線、譜號、音符（實心橢圓＋符桿）、加線；回傳 { x(pos 的音符中心 x)、y(pos)、metrics } 讓呼叫的人把點擊轉回位置。
 *   staffGeometry(w, h)  線距 s、最上與最下的線 y、音符的 x
 *   posFromY(y, g)       點擊的 y → 最近的位置（半格）
 */
import { isLinePos, ledgerPositions } from './staff.js';

export function staffGeometry(w, h) {
  const s = Math.max(10, Math.min(22, (h - 40) / 10));        // 線距：五線高 4s，上下各留 3 個半格以上放加線
  const mid = h / 2;
  const yBottom = mid + 2 * s;                                  // pos 0 的線
  return { s, yBottom, yTop: yBottom - 4 * s, w, h, noteX: Math.max(90, w * 0.62), left: 14 };
}
export const yOf = (pos, g) => g.yBottom - (pos * g.s) / 2;
export const posFromY = (y, g) => Math.round(((g.yBottom - y) / g.s) * 2);

function trebleClef(c, x, g) {
  const s = g.s, yG = yOf(2, g);
  c.beginPath();
  c.moveTo(x, g.yBottom + 1.1 * s);                              // 底下的小尾巴
  c.bezierCurveTo(x - 0.9 * s, g.yBottom + 1.6 * s, x - 1.2 * s, g.yBottom + 0.4 * s, x - 0.2 * s, g.yBottom + 0.2 * s);
  c.lineTo(x, g.yTop - 0.9 * s);                                 // 往上到頂
  c.bezierCurveTo(x + 1.5 * s, g.yTop - 1.2 * s, x + 1.4 * s, g.yTop + 1.4 * s, x - 0.1 * s, g.yTop + 2.6 * s);
  c.bezierCurveTo(x - 1.7 * s, g.yTop + 3.6 * s, x - 1.5 * s, yG + 1.3 * s, x + 0.1 * s, yG + 1.0 * s);
  c.bezierCurveTo(x + 1.5 * s, yG + 0.8 * s, x + 1.5 * s, yG - 1.0 * s, x + 0.1 * s, yG - 0.9 * s);
  c.bezierCurveTo(x - 0.9 * s, yG - 0.8 * s, x - 0.9 * s, yG + 0.5 * s, x, yG + 0.5 * s);
  c.stroke();
}
function bassClef(c, x, g) {
  const s = g.s, yF = yOf(6, g);
  c.beginPath();
  c.arc(x - 0.2 * s, yF, 0.38 * s, 0, Math.PI * 2); c.fill();
  c.beginPath();
  c.moveTo(x - 0.5 * s, yF);
  c.bezierCurveTo(x - 0.5 * s, yF - 1.5 * s, x + 1.9 * s, yF - 1.4 * s, x + 1.7 * s, yF + 0.6 * s);
  c.bezierCurveTo(x + 1.5 * s, yF + 1.9 * s, x + 0.3 * s, yF + 3.0 * s, x - 0.8 * s, yF + 3.6 * s);
  c.stroke();
  for (const dy of [-0.55, 0.55]) { c.beginPath(); c.arc(x + 2.5 * s, yF + dy * s, 0.28 * s, 0, Math.PI * 2); c.fill(); }
}

export function drawStaff(cv, { clef = 'treble', notes = [], hover = null, ink = '#1b1405', bg = '#fffdf6' } = {}) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2), w = cv.clientWidth || 600, h = cv.clientHeight || 220;
  if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
  const c = cv.getContext('2d');
  c.setTransform(dpr, 0, 0, dpr, 0, 0);
  const g = staffGeometry(w, h);
  c.fillStyle = bg; c.fillRect(0, 0, w, h);
  c.strokeStyle = ink; c.fillStyle = ink; c.lineCap = 'round'; c.lineJoin = 'round';
  c.lineWidth = 1.4;
  for (let i = 0; i < 5; i++) { const y = yOf(i * 2, g); c.beginPath(); c.moveTo(g.left, y); c.lineTo(w - g.left, y); c.stroke(); }
  c.beginPath(); c.moveTo(g.left, g.yTop); c.lineTo(g.left, g.yBottom); c.stroke();
  c.lineWidth = Math.max(1.8, g.s * 0.16);
  (clef === 'treble' ? trebleClef : bassClef)(c, g.left + 2.2 * g.s, g);
  const draw = (pos, color, ghost) => {
    const x = g.noteX, y = yOf(pos, g);
    c.globalAlpha = ghost ? 0.35 : 1;
    c.strokeStyle = ink; c.lineWidth = 1.4;
    for (const lp of ledgerPositions(pos)) { const ly = yOf(lp, g); c.beginPath(); c.moveTo(x - 1.1 * g.s, ly); c.lineTo(x + 1.1 * g.s, ly); c.stroke(); }
    c.fillStyle = color || ink; c.strokeStyle = color || ink;
    c.beginPath(); c.ellipse(x, y, 0.72 * g.s, 0.5 * g.s, -0.35, 0, Math.PI * 2); c.fill();
    const up = pos < 4;
    c.lineWidth = Math.max(1.6, g.s * 0.12);
    c.beginPath();
    if (up) { c.moveTo(x + 0.66 * g.s, y - 0.1 * g.s); c.lineTo(x + 0.66 * g.s, y - 3.2 * g.s); } else { c.moveTo(x - 0.66 * g.s, y + 0.1 * g.s); c.lineTo(x - 0.66 * g.s, y + 3.2 * g.s); }
    c.stroke();
    c.globalAlpha = 1;
  };
  if (hover !== null && !notes.some((n) => n.pos === hover)) draw(hover, '#0d6b5c', true);
  notes.forEach((n) => draw(n.pos, n.color));
  return g;
}
