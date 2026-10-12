/*
 * 體育 Sports and Movement · 畫在 canvas 上的人偶剪影（不需要 WebGL；小互動與之後每一課共用）。
 *
 *   drawFigure(g, J, { view, ox, oy, scale, color, far })
 *       view 'front'＝面對你（人偶的左邊在畫面右邊）、'side'＝從人偶的右邊看（它面向畫面右邊）
 *       ox, oy＝地面上身體中線的位置（像素）、scale＝一公尺幾個像素
 *   drawGround(g, { ox, oy, scale, base, com, view, show })   地面線、支撐範圍在這個方向的寬度、重心與鉛垂線
 *   drawTop(g, J, A, { ox, oy, scale })                         正上方看：腳印、支撐範圍、重心的投影（人偶的前方朝畫面下方）
 *   fitCanvas(cv)   依裝置像素比調整畫布，回傳 { g, w, h }
 */
import { HEIGHT, RADII } from './body.js';

const H = HEIGHT;

export function fitCanvas(cv) {
  const r = Math.min(window.devicePixelRatio || 1, 2);
  const w = cv.clientWidth || cv.width, h = cv.clientHeight || cv.height;
  if (cv.width !== Math.round(w * r) || cv.height !== Math.round(h * r)) { cv.width = Math.round(w * r); cv.height = Math.round(h * r); }
  const g = cv.getContext('2d');
  g.setTransform(r, 0, 0, r, 0, 0);
  return { g, w, h };
}

const proj = (view, ox, oy, s) => (p) => [ox + (view === 'side' ? p[2] : p[0]) * s, oy - p[1] * s];
const depth = (view) => (p) => (view === 'side' ? -p[0] : p[2]);   // 越大越靠近你

export function drawFigure(g, J, o) {
  const { view = 'front', ox, oy, scale: s } = o;
  const P = proj(view, ox, oy, s), D = depth(view);
  const near = o.color || '#f2d8b0', far = o.far || '#c9a878';
  const items = [];
  const limb = (a, b, r, d) => items.push({ d: d !== undefined ? d : (D(J[a]) + D(J[b])) / 2, a: P(J[a]), b: P(J[b]), w: r * 2 * H * s });
  for (const sd of ['L', 'R']) {
    limb('hip' + sd, 'knee' + sd, RADII.thigh);
    limb('knee' + sd, 'ankle' + sd, RADII.shank);
    limb('shoulder' + sd, 'elbow' + sd, RADII.upperArm);
    limb('elbow' + sd, 'wrist' + sd, RADII.forearm);
    limb('wrist' + sd, 'hand' + sd, RADII.hand * 0.8);
    // 腳：畫高一點點，腳底才貼在地面線上
    const up = RADII.footH * H;
    const lift = (p) => [p[0], p[1] + up, p[2]];
    items.push({ d: D(J['ball' + sd]), a: P(lift(J['heel' + sd])), b: P(lift(J['ball' + sd])), w: up * 2 * s });
    items.push({ d: D(J['ball' + sd]), a: P(lift(J['ball' + sd])), b: P(lift(J['toe' + sd])), w: up * 1.7 * s });
  }
  const mid = (D(J.shoulderL) + D(J.shoulderR)) / 2;
  items.push({ d: mid, torso: true });
  items.sort((x, y) => x.d - y.d);
  const dmin = items[0].d, dmax = items[items.length - 1].d;
  g.lineCap = 'round'; g.lineJoin = 'round';
  for (const it of items) {
    const isFar = dmax - dmin > 0.02 && it.d < mid - 0.015;
    g.strokeStyle = g.fillStyle = isFar ? far : near;
    if (it.torso) {
      const sl = P(J.shoulderL), sr = P(J.shoulderR), hl = P(J.hipL), hr = P(J.hipR), pe = P(J.pelvis), ch = P(J.chest), hd = P(J.head);
      const wide = view === 'side' ? RADII.chestZ : RADII.chestX;
      g.lineWidth = wide * 2 * H * s;
      g.beginPath(); g.moveTo(pe[0], pe[1]); g.lineTo(ch[0] + (pe[0] - ch[0]) * 0.18, ch[1] + (pe[1] - ch[1]) * 0.18); g.stroke();
      g.lineWidth = RADII.shoulder * 2 * H * s;
      g.beginPath(); g.moveTo(sl[0], sl[1]); g.lineTo(sr[0], sr[1]); g.stroke();
      g.lineWidth = RADII.hip * 2 * H * s;
      g.beginPath(); g.moveTo(hl[0], hl[1]); g.lineTo(hr[0], hr[1]); g.stroke();
      g.lineWidth = RADII.neck * 2 * H * s;
      g.beginPath(); g.moveTo(ch[0], ch[1]); g.lineTo(hd[0], hd[1]); g.stroke();
      g.beginPath(); g.arc(hd[0], hd[1], RADII.head * H * s, 0, Math.PI * 2); g.fill();
      continue;
    }
    g.lineWidth = Math.max(1.5, it.w);
    g.beginPath(); g.moveTo(it.a[0], it.a[1]); g.lineTo(it.b[0], it.b[1]); g.stroke();
  }
}

export function drawGround(g, o) {
  const { ox, oy, scale: s, view = 'front', base, com, show = true, w } = o;
  g.lineCap = 'round';
  g.strokeStyle = o.line || 'rgba(160,180,230,.45)'; g.lineWidth = 2;
  g.beginPath(); g.moveTo(ox - (w || 200) / 2, oy + 1); g.lineTo(ox + (w || 200) / 2, oy + 1); g.stroke();
  if (!show || !base || base.length < 3) return;
  const k = view === 'side' ? 1 : 0;
  let lo = Infinity, hi = -Infinity;
  for (const p of base) { lo = Math.min(lo, p[k]); hi = Math.max(hi, p[k]); }
  const cx = view === 'side' ? com[2] : com[0];
  const ok = cx >= lo && cx <= hi;
  g.strokeStyle = ok ? '#43c98a' : '#ff7a6b'; g.lineWidth = 6;
  g.beginPath(); g.moveTo(ox + lo * s, oy + 8); g.lineTo(ox + hi * s, oy + 8); g.stroke();
  g.setLineDash([4, 4]); g.lineWidth = 1.5; g.strokeStyle = '#ffd36e';
  g.beginPath(); g.moveTo(ox + cx * s, oy - com[1] * s); g.lineTo(ox + cx * s, oy + 8); g.stroke();
  g.setLineDash([]);
  g.fillStyle = '#ffd36e'; g.strokeStyle = '#1b1405'; g.lineWidth = 1.5;
  g.beginPath(); g.arc(ox + cx * s, oy - com[1] * s, 5.5, 0, Math.PI * 2); g.fill(); g.stroke();
  g.beginPath(); g.arc(ox + cx * s, oy + 8, 3.5, 0, Math.PI * 2); g.fill();
}

export function drawTop(g, J, A, o) {
  const { ox, oy, scale: s } = o;
  const P = (p) => [ox + p[0] * s, oy + p[1] * s];     // [x, z] → 畫面；前方（+z）朝下
  const base = A.base;
  if (base.length >= 3) {
    g.beginPath();
    base.forEach((p, i) => { const q = P(p); if (i) g.lineTo(q[0], q[1]); else g.moveTo(q[0], q[1]); });
    g.closePath();
    g.fillStyle = A.inside ? 'rgba(67,201,138,.28)' : 'rgba(255,122,107,.28)'; g.fill();
    g.strokeStyle = A.inside ? '#43c98a' : '#ff7a6b'; g.lineWidth = 2; g.setLineDash([6, 4]); g.stroke(); g.setLineDash([]);
  }
  // 腳印
  g.lineCap = 'round';
  for (const sd of ['L', 'R']) {
    const up = J['ball' + sd][1] > 0.03;
    g.strokeStyle = up ? 'rgba(242,216,176,.3)' : '#f2d8b0';
    const h = P([J['heel' + sd][0], J['heel' + sd][2]]), b = P([J['ball' + sd][0], J['ball' + sd][2]]), t = P([J['toe' + sd][0], J['toe' + sd][2]]);
    g.lineWidth = 0.05 * H * s; g.beginPath(); g.moveTo(h[0], h[1]); g.lineTo(b[0], b[1]); g.stroke();
    g.lineWidth = 0.042 * H * s; g.beginPath(); g.moveTo(b[0], b[1]); g.lineTo(t[0] + (b[0] - t[0]) * 0.25, t[1] + (b[1] - t[1]) * 0.25); g.stroke();
  }
  const c = P([A.com[0], A.com[2]]);
  g.fillStyle = '#ffd36e'; g.strokeStyle = '#1b1405'; g.lineWidth = 2;
  g.beginPath(); g.arc(c[0], c[1], 7, 0, Math.PI * 2); g.fill(); g.stroke();
}
