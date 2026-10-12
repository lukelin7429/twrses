/*
 * 音樂 Music · 在 canvas 上畫五線譜（單元二各課共用）。不載任何網頁字型：譜號用路徑自己畫（簡化的形狀）。
 *
 *   drawStaff(canvas, { clef, notes: [{ pos, color, label }], hover, width })
 *     五條線、譜號、音符（實心橢圓＋符桿）、加線；回傳 { x(pos 的音符中心 x)、y(pos)、metrics } 讓呼叫的人把點擊轉回位置。
 *   staffGeometry(w, h)  線距 s、最上與最下的線 y、音符的 x
 *   posFromY(y, g)       點擊的 y → 最近的位置（半格）
 */
import { isLinePos, ledgerPositions } from './staff.js';

export function staffGeometry(w, h, maxS = 22) {
  const s = Math.max(10, Math.min(maxS, (h - 40) / 10));        // 線距：五線高 4s，上下各留 3 個半格以上放加線
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

export function drawStaff(cv, { clef = 'treble', notes = [], hover = null, ink = '#1b1405', bg = '#fffdf6', maxS = 22 } = {}) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2), w = cv.clientWidth || 600, h = cv.clientHeight || 220;
  if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
  const c = cv.getContext('2d');
  c.setTransform(dpr, 0, 0, dpr, 0, 0);
  const g = staffGeometry(w, h, maxS);
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

// ── 第六課起：把一小節（或單一個音符、休止符）畫在五線譜上 ─────────────────────
import { midiToPos } from './staff.js';
import { itemBeats, valueOf } from './values.js';

function drawNoteShape(c, g, x, pos, it, color) {
  const v = valueOf(it.v), y = yOf(pos, g), s = g.s;
  c.fillStyle = color; c.strokeStyle = color;
  c.lineWidth = 1.4;
  for (const lp of ledgerPositions(pos)) { const ly = yOf(lp, g); c.beginPath(); c.moveTo(x - 1.1 * s, ly); c.lineTo(x + 1.1 * s, ly); c.stroke(); }
  c.save(); c.translate(x, y); c.rotate(-0.35);
  c.beginPath(); c.ellipse(0, 0, 0.72 * s, 0.5 * s, 0, 0, Math.PI * 2);
  if (v.open) { c.lineWidth = Math.max(1.8, s * 0.17); c.stroke(); } else c.fill();
  c.restore();
  if (it.dot) { c.beginPath(); c.arc(x + 1.25 * s, y - (isLinePos(pos) ? 0.5 * s : 0), 0.2 * s, 0, Math.PI * 2); c.fill(); }
  if (!v.stem) return;
  const up = pos < 4, sx = up ? x + 0.66 * s : x - 0.66 * s, ey = up ? y - 3.3 * s : y + 3.3 * s;
  c.lineWidth = Math.max(1.6, s * 0.12);
  c.beginPath(); c.moveTo(sx, y + (up ? -0.1 : 0.1) * s); c.lineTo(sx, ey); c.stroke();
  for (let f = 0; f < v.flags; f++) {      // 符尾：往右下彎的短弧
    const fy = ey + (up ? 1 : -1) * f * 0.75 * s, d = up ? 1 : -1;
    c.beginPath(); c.moveTo(sx, fy);
    c.bezierCurveTo(sx + 0.2 * s, fy + d * 0.9 * s, sx + 1.5 * s, fy + d * 1.0 * s, sx + 1.0 * s, fy + d * 2.4 * s);
    c.stroke();
  }
}
function drawRestShape(c, g, x, it, color) {
  const s = g.s;
  c.fillStyle = color; c.strokeStyle = color; c.lineWidth = Math.max(1.8, s * 0.16); c.lineCap = 'round';
  if (it.v === 'whole') c.fillRect(x - 0.7 * s, yOf(6, g), 1.4 * s, 0.5 * s);                 // 掛在第四線下
  else if (it.v === 'half') c.fillRect(x - 0.7 * s, yOf(4, g) - 0.5 * s, 1.4 * s, 0.5 * s);    // 坐在第三線上
  else if (it.v === 'quarter') {
    const y0 = yOf(7, g);
    c.beginPath(); c.moveTo(x - 0.4 * s, y0); c.lineTo(x + 0.5 * s, y0 + 0.9 * s); c.lineTo(x - 0.4 * s, y0 + 1.7 * s); c.lineTo(x + 0.5 * s, y0 + 2.5 * s);
    c.bezierCurveTo(x - 0.8 * s, y0 + 2.7 * s, x - 0.8 * s, y0 + 3.7 * s, x + 0.2 * s, y0 + 3.5 * s); c.stroke();
  } else {
    const n = it.v === 'eighth' ? 1 : 2, y0 = yOf(5, g);
    for (let k = 0; k < n; k++) { c.beginPath(); c.arc(x - 0.3 * s + k * 0.2 * s, y0 + k * 0.9 * s, 0.32 * s, 0, Math.PI * 2); c.fill(); }
    c.beginPath(); c.moveTo(x + 0.4 * s - (n - 1) * 0.0, y0 - 0.1 * s); c.lineTo(x - 0.4 * s + (n - 1) * 0.2 * s, y0 + (n + 1.6) * s); c.stroke();
  }
  if (it.dot) { c.beginPath(); c.arc(x + 1.1 * s, yOf(5, g), 0.2 * s, 0, Math.PI * 2); c.fill(); }
}

/**
 * 畫一小節：{ items:[{v,dot,rest}], pitches:[midi...], ts:'4/4'（有就畫拍號與小節線）, playhead:拍數或 -1, single:true（只畫一個，置中，不畫拍號） }
 * 音符位置依拍數等比排開；回傳 { g, xOfBeat }。
 */
export function drawMeasure(cv, { items = [], pitches = [60, 62, 64, 65, 67, 69, 67, 64], ts = null, playhead = -1, single = false, ink = '#1b1405', bg = '#fffdf6', clef = 'treble' } = {}) {
  const g = drawStaff(cv, { clef, notes: [], ink, bg });
  const c = cv.getContext('2d');
  const w = g.w;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  c.setTransform(dpr, 0, 0, dpr, 0, 0);
  const s = g.s;
  const x0 = g.left + (single ? 7 : 9.5) * s, xEnd = w - 16;
  if (ts && !single) {
    c.fillStyle = ink; c.font = `700 ${Math.round(s * 2.3)}px "PingFang TC", -apple-system, "Segoe UI", sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle';
    const [a, b] = ts.split('/');
    c.fillText(a, g.left + 7 * s, yOf(6, g)); c.fillText(b, g.left + 7 * s, yOf(2, g));
    c.lineWidth = 1.6; c.strokeStyle = ink;
    c.beginPath(); c.moveTo(xEnd, g.yTop); c.lineTo(xEnd, g.yBottom); c.stroke();
  }
  const total = single ? 1 : ts ? { '2/4': 2, '3/4': 3, '4/4': 4 }[ts] : items.reduce((t, it) => t + itemBeats(it), 0);
  const W = xEnd - x0 - 12;
  const xOfBeat = (b) => x0 + 10 + (b / total) * (W - 10);
  let beat = 0, k = 0;
  items.forEach((it) => {
    const x = single ? (x0 + xEnd) / 2 : xOfBeat(beat) + 0.6 * s;
    if (it.rest) drawRestShape(c, g, x, it, ink);
    else drawNoteShape(c, g, x, midiToPos(pitches[k % pitches.length], clef), it, ink);
    if (!it.rest) k++;
    beat += itemBeats(it);
  });
  if (playhead >= 0 && !single) {
    const x = xOfBeat(Math.min(playhead, total));
    c.strokeStyle = '#0d9d8c'; c.lineWidth = 2.5; c.beginPath(); c.moveTo(x, g.yTop - 1.5 * s); c.lineTo(x, g.yBottom + 1.5 * s); c.stroke();
  }
  return { g, xOfBeat };
}

// ── 第七課起：畫一串音（音階、旋律），含升記號與降記號 ─────────────────────────
function sharpSign(c, x, y, s, color) {
  c.strokeStyle = color; c.fillStyle = color;
  c.lineWidth = Math.max(1.2, s * 0.1);
  for (const dx of [-0.22, 0.22]) { c.beginPath(); c.moveTo(x + dx * s, y - 1.1 * s); c.lineTo(x + dx * s, y + 1.1 * s); c.stroke(); }
  c.lineWidth = Math.max(2, s * 0.22);
  for (const dy of [-0.34, 0.34]) { c.beginPath(); c.moveTo(x - 0.5 * s, y + (dy + 0.14) * s); c.lineTo(x + 0.5 * s, y + (dy - 0.14) * s); c.stroke(); }
}
function flatSign(c, x, y, s, color) {
  c.strokeStyle = color; c.fillStyle = color;
  c.lineWidth = Math.max(1.4, s * 0.12);
  c.beginPath(); c.moveTo(x - 0.25 * s, y - 1.7 * s); c.lineTo(x - 0.25 * s, y + 0.7 * s); c.stroke();
  c.beginPath(); c.moveTo(x - 0.25 * s, y + 0.7 * s);
  c.bezierCurveTo(x + 0.9 * s, y + 0.1 * s, x + 0.8 * s, y - 0.9 * s, x - 0.25 * s, y - 0.5 * s); c.stroke();
}

/**
 * 畫一串音符（由左到右等距）：notes = [{ pos, acc（−1 降、0、1 升）, color? }]；active＝正在播放的那一個的索引（用強調色）。
 * 回傳 { g, xs }（每個音符中心的 x）。
 */
export function drawScale(cv, { notes = [], clef = 'treble', active = -1, ink = '#1b1405', bg = '#fffdf6', color = ink, accent = '#0d9d8c', maxS = 17 } = {}) {
  const g = drawStaff(cv, { clef, notes: [], ink, bg, maxS });
  const c = cv.getContext('2d'), s = g.s, w = g.w;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  c.setTransform(dpr, 0, 0, dpr, 0, 0);
  const x0 = g.left + 6.6 * s, xEnd = w - 18, n = Math.max(1, notes.length);
  const step = notes.length > 1 ? (xEnd - x0) / (n - 1) : 0;
  const xs = notes.map((_, i) => (n === 1 ? (x0 + xEnd) / 2 : x0 + i * step));
  notes.forEach((nt, i) => {
    const x = xs[i], y = yOf(nt.pos, g), col = i === active ? accent : (nt.color || color);
    c.strokeStyle = col; c.fillStyle = col; c.lineWidth = 1.4;
    for (const lp of ledgerPositions(nt.pos)) { const ly = yOf(lp, g); c.beginPath(); c.moveTo(x - 1.1 * s, ly); c.lineTo(x + 1.1 * s, ly); c.stroke(); }
    c.beginPath(); c.ellipse(x, y, 0.72 * s, 0.5 * s, -0.35, 0, Math.PI * 2); c.fill();
    const up = nt.pos < 4;
    c.lineWidth = Math.max(1.5, s * 0.12);
    c.beginPath();
    if (up) { c.moveTo(x + 0.66 * s, y - 0.1 * s); c.lineTo(x + 0.66 * s, y - 3.1 * s); } else { c.moveTo(x - 0.66 * s, y + 0.1 * s); c.lineTo(x - 0.66 * s, y + 3.1 * s); }
    c.stroke();
    if (nt.acc === 1) sharpSign(c, x - 1.55 * s, y, s * 0.78, col);
    else if (nt.acc === -1) flatSign(c, x - 1.45 * s, y, s * 0.78, col);
  });
  return { g, xs };
}
