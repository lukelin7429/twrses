/*
 * 書法 · 畫在 2D canvas 上的墨（練字板 pad.js、3D 宣紙的貼圖 brush3d.js、「一滴墨」都用這一份）。
 * 只用 CanvasRenderingContext2D，不碰 three.js。字框座標 → 畫布像素用 T = { k, ox, oy }：px = ox + x·k。
 *
 *   rng(seed)                         固定種子的亂數（每次畫出來一樣）
 *   paperBase(g, w, h, opt)           紙色＋淡淡的纖維
 *   drawGrid(g, x, y, s, opt)         米字格（kind 'mi'）或九宮格（'jiu'），紅線
 *   drawStamp / drawStamps            筆毛印子（brush.js 的水滴形）
 *   drawBristles                      側鋒：筆毛一根根畫，筆肚那一緣會乾（飛白）
 *   drawCompare                       練字板：示範的力道曲線（金色）和你的提按曲線（藍線），白底
 *   drawBlot(g, cx, cy, R, b, seed)   一滴墨暈開（brush.js 的 bleed 結果）
 *   drawForce(g, w, h, curve, opt)    力道曲線（走了幾成 → 壓力）
 */
import { teardrop } from './brush.js';

export function rng(seed = 1) {
  let a = (seed * 2654435761) >>> 0 || 1;
  return () => { a ^= a << 13; a >>>= 0; a ^= a >>> 17; a ^= a << 5; a >>>= 0; return a / 4294967296; };
}

export function paperBase(g, w, h, { color = '#f6f0e1', seed = 7, fiber = 0.5, edge = 0 } = {}) {
  g.save();
  g.fillStyle = color; g.fillRect(0, 0, w, h);
  const r = rng(seed);
  const n = Math.round(((w * h) / 900) * fiber);
  g.lineCap = 'round';
  for (let i = 0; i < n; i++) {
    const x = r() * w, y = r() * h, L = 4 + r() * 16, a = r() * Math.PI * 2;
    g.strokeStyle = r() < 0.55 ? 'rgba(150,120,70,0.10)' : 'rgba(255,255,255,0.38)';
    g.lineWidth = 0.5 + r() * 0.9;
    g.beginPath(); g.moveTo(x, y);
    g.quadraticCurveTo(x + Math.cos(a + 0.7) * L * 0.5, y + Math.sin(a + 0.7) * L * 0.5, x + Math.cos(a) * L, y + Math.sin(a) * L);
    g.stroke();
  }
  if (edge > 0) {   // 紙邊淡淡的陰影，看得出是一張紙
    const gr = g.createLinearGradient(0, 0, edge, 0);
    gr.addColorStop(0, 'rgba(120,100,60,.16)'); gr.addColorStop(1, 'rgba(120,100,60,0)');
    g.fillStyle = gr; g.fillRect(0, 0, edge, h);
    g.save(); g.translate(w, 0); g.scale(-1, 1); g.fillRect(0, 0, edge, h); g.restore();
  }
  g.restore();
}

/** 米字格／九宮格：外框實線、裡面虛線（練習紙上常見的紅格子） */
export function drawGrid(g, x, y, s, { kind = 'mi', color = 'rgba(205,62,50,.62)', lw = 2 } = {}) {
  g.save();
  g.strokeStyle = color; g.lineWidth = lw * 1.5;
  g.strokeRect(x, y, s, s);
  g.lineWidth = lw; g.setLineDash([lw * 5, lw * 4]);
  g.beginPath();
  if (kind === 'jiu') {
    for (const f of [1 / 3, 2 / 3]) { g.moveTo(x + s * f, y); g.lineTo(x + s * f, y + s); g.moveTo(x, y + s * f); g.lineTo(x + s, y + s * f); }
  } else {
    g.moveTo(x + s / 2, y); g.lineTo(x + s / 2, y + s); g.moveTo(x, y + s / 2); g.lineTo(x + s, y + s / 2);
    g.moveTo(x, y); g.lineTo(x + s, y + s); g.moveTo(x + s, y); g.lineTo(x, y + s);
  }
  g.stroke();
  g.restore();
}

export function drawStamp(g, st, T) {
  const pts = teardrop(st, 8);
  g.beginPath();
  g.moveTo(T.ox + pts[0][0] * T.k, T.oy + pts[0][1] * T.k);
  for (let i = 1; i < pts.length; i++) g.lineTo(T.ox + pts[i][0] * T.k, T.oy + pts[i][1] * T.k);
  g.closePath();
  g.fill();
}

/**
 * 畫第 i0 到 i1（不含）個印子。soft：墨跡邊緣在紙上微微暈開的像素。
 * alpha < 1（描紅的淡色範字）：印子互相重疊，直接半透明畫會越疊越深，所以先用不透明畫在暫存畫布上，再整張淡淡地貼上去。
 */
let scratch = null;
export function drawStamps(g, sts, T, { color = '#151311', i0 = 0, i1 = sts.length, soft = 0, alpha = 1 } = {}) {
  if (i1 <= i0) return;
  if (alpha < 1 && typeof document !== 'undefined') {
    const W = g.canvas.width, H = g.canvas.height;
    scratch = scratch || document.createElement('canvas');
    if (scratch.width !== W || scratch.height !== H) { scratch.width = W; scratch.height = H; }
    const s = scratch.getContext('2d');
    s.clearRect(0, 0, W, H);
    drawStamps(s, sts, T, { color, i0, i1, soft });
    g.save(); g.globalAlpha = alpha; g.drawImage(scratch, 0, 0); g.restore();
    return;
  }
  g.save();
  g.fillStyle = color;
  if (soft > 0) { g.shadowColor = 'rgba(21,19,17,.55)'; g.shadowBlur = soft; }
  for (let i = i0; i < i1; i++) drawStamp(g, sts[i], T);
  g.restore();
}

// 一圈有起伏的邊：r(θ)＝ r·(1 + 毛糙 × 幾個正弦波相加)
function blobPath(g, cx, cy, r, rough, seed) {
  const R = rng(seed);
  const waves = Array.from({ length: 6 }, (_, i) => ({ k: 3 + i * 2 + Math.floor(R() * 3), ph: R() * 6.283, a: (0.5 + R()) / (i + 1.5) }));
  const N = 120;
  g.beginPath();
  for (let i = 0; i <= N; i++) {
    const th = (i / N) * Math.PI * 2;
    let f = 0;
    for (const w of waves) f += w.a * Math.sin(w.k * th + w.ph);
    const rr = r * (1 + rough * f * 0.55);
    const x = cx + Math.cos(th) * rr, y = cy + Math.sin(th) * rr;
    if (i) g.lineTo(x, y); else g.moveTo(x, y);
  }
  g.closePath();
}

/**
 * 一滴墨：R＝剛落下時的半徑（像素），b＝brush.js 的 bleed() 結果。
 * 外圈淡淡的水痕（會吸水的紙）、墨跡本體（越外圈越淡）、毛毛的纖維邊、表面的反光（還沒吸進去的墨珠）。
 */
export function drawBlot(g, cx, cy, R, b, seed = 3) {
  const r = R * b.r;
  g.save();
  if (b.halo > 0.01) {
    blobPath(g, cx, cy, r * (1 + b.halo), b.feather * 1.3 + 0.05, seed + 11);
    g.fillStyle = `rgba(90,96,110,${0.16 * b.dark})`; g.fill();
  }
  blobPath(g, cx, cy, r, b.feather, seed);
  const gr = g.createRadialGradient(cx, cy, 0, cx, cy, r * (1 + b.feather * 0.4));
  gr.addColorStop(0, `rgba(16,15,18,${b.dark})`);
  gr.addColorStop(0.55, `rgba(16,15,18,${b.dark * (1 - b.feather * 0.35)})`);
  gr.addColorStop(1, `rgba(30,30,36,${b.dark * (0.62 - b.feather * 0.4)})`);
  g.fillStyle = gr; g.fill();
  if (b.feather > 0.12) {   // 纖維把墨吸出去的細絲
    const Rn = rng(seed + 5);
    g.strokeStyle = `rgba(20,20,26,${0.35 * b.dark})`; g.lineCap = 'round';
    const n = Math.round(40 * b.feather + 6);
    for (let i = 0; i < n; i++) {
      const th = Rn() * Math.PI * 2, L = r * (0.12 + Rn() * 0.28) * b.feather * 2.2;
      g.lineWidth = 0.6 + Rn() * 1.1;
      g.beginPath(); g.moveTo(cx + Math.cos(th) * r * 0.92, cy + Math.sin(th) * r * 0.92);
      g.lineTo(cx + Math.cos(th + (Rn() - 0.5) * 0.2) * (r + L), cy + Math.sin(th + (Rn() - 0.5) * 0.2) * (r + L));
      g.stroke();
    }
  }
  if (b.gloss > 0.04) {    // 墨珠還浮在紙面上：亮亮的反光
    g.beginPath(); g.ellipse(cx - r * 0.32, cy - r * 0.36, r * 0.34, r * 0.18, -0.6, 0, Math.PI * 2);
    g.fillStyle = `rgba(255,255,255,${0.55 * b.gloss})`; g.fill();
  }
  g.restore();
}

/**
 * 力道曲線：curve＝[[走了幾成, 壓力], …]；at＝目前走到幾成（null 不畫）；bounds＝[起筆結束, 行筆結束]（幾成）
 * 顏色照 3D 深色面板。
 */
export function drawForce(g, w, h, curve, { at = null, bounds = null, labels = null, color = '#ffd36e', bands = null } = {}) {
  const padL = 6, padR = 6, padT = 10, padB = 18;
  const X = (f) => padL + f * (w - padL - padR), Y = (p) => h - padB - p * (h - padT - padB);
  g.clearRect(0, 0, w, h);
  g.save();
  if (bounds) {
    const shade = ['rgba(79,209,197,.10)', 'rgba(255,255,255,.03)', 'rgba(255,143,184,.10)'];
    const edges = [0, bounds[0], bounds[1], 1];
    for (let i = 0; i < 3; i++) { g.fillStyle = shade[i]; g.fillRect(X(edges[i]), padT - 6, X(edges[i + 1]) - X(edges[i]), h - padT - padB + 6); }
    if (labels) {
      g.fillStyle = 'rgba(207,216,234,.85)'; g.font = `600 ${Math.round(h * 0.1)}px system-ui, sans-serif`; g.textAlign = 'center';
      for (let i = 0; i < 3; i++) g.fillText(labels[i], (X(edges[i]) + X(edges[i + 1])) / 2, h - 5);
    }
  }
  if (bands) {   // 永字八法：一筆裡的幾法，各一個色帶＋名稱（[{ from, to, label, on }]，from／to 是走了幾成）
    const fill = ['rgba(79,209,197,.10)', 'rgba(255,211,110,.08)', 'rgba(255,143,184,.10)'];
    g.font = `700 ${Math.round(h * 0.1)}px system-ui, sans-serif`; g.textAlign = 'center';
    bands.forEach((b, i) => {
      g.fillStyle = b.on ? 'rgba(255,211,110,.22)' : fill[i % 3];
      g.fillRect(X(b.from), padT - 6, X(b.to) - X(b.from), h - padT - padB + 6);
      g.fillStyle = b.on ? '#ffd36e' : 'rgba(207,216,234,.85)';
      g.fillText(b.label, (X(b.from) + X(b.to)) / 2, h - 5);
      if (i) { g.strokeStyle = 'rgba(255,255,255,.25)'; g.beginPath(); g.moveTo(X(b.from), padT - 6); g.lineTo(X(b.from), h - padB); g.stroke(); }
    });
  }
  g.strokeStyle = 'rgba(160,180,230,.18)'; g.lineWidth = 1;
  for (const p of [0, 0.5, 1]) { g.beginPath(); g.moveTo(padL, Y(p)); g.lineTo(w - padR, Y(p)); g.stroke(); }
  g.beginPath(); g.moveTo(X(0), Y(0));
  for (const [f, p] of curve) g.lineTo(X(f), Y(p));
  g.lineTo(X(1), Y(0)); g.closePath();
  const gr = g.createLinearGradient(0, padT, 0, h - padB);
  gr.addColorStop(0, 'rgba(255,211,110,.55)'); gr.addColorStop(1, 'rgba(255,211,110,.05)');
  g.fillStyle = gr; g.fill();
  g.beginPath();
  curve.forEach(([f, p], i) => (i ? g.lineTo(X(f), Y(p)) : g.moveTo(X(f), Y(p))));
  g.strokeStyle = color; g.lineWidth = 2; g.stroke();
  if (at !== null) {
    let p = 0;
    for (let i = 1; i < curve.length; i++) if (curve[i][0] >= at) { const a = curve[i - 1], b = curve[i]; p = a[1] + (b[1] - a[1]) * ((at - a[0]) / Math.max(1e-9, b[0] - a[0])); break; }
    g.strokeStyle = 'rgba(255,255,255,.55)'; g.setLineDash([3, 3]);
    g.beginPath(); g.moveTo(X(at), padT - 6); g.lineTo(X(at), h - padB); g.stroke(); g.setLineDash([]);
    g.fillStyle = '#fff'; g.beginPath(); g.arc(X(at), Y(p), 4.5, 0, Math.PI * 2); g.fill();
  }
  g.restore();
}

/**
 * 側鋒的墨：每個印子沿著筆尖方向排一列筆毛（brush.js 的 bristles），每根畫一個小圓；印子很密，
 * 所以每根筆毛拖出一條順著運筆方向的細線。筆肚那一緣（u 小）比較容易乾，門檻 k 太高的筆毛就不畫 → 飛白的縫。
 * 筆尖那一緣筆毛密、圓也大一點，邊緣是齊的。
 */
export function drawBristles(g, sts, T, { i0 = 0, i1 = sts.length, bristles = [], color = '#151311', dry = 0.55 } = {}) {
  if (i1 <= i0) return;
  g.save();
  g.fillStyle = color;
  for (let i = i0; i < i1; i++) {
    const st = sts[i], ca = Math.cos(st.a), sa = Math.sin(st.a), span = st.hw + st.len;
    for (const b of bristles) {
      if (b.k > 1 - dry * (1 - b.u) ** 1.5) continue;
      const pos = -st.hw + b.u * span;
      const r = Math.max(0.5, st.hw * (0.045 + 0.05 * b.u) * b.w * T.k);
      g.beginPath();
      g.arc(T.ox + (st.x + ca * pos) * T.k, T.oy + (st.y + sa * pos) * T.k, r, 0, Math.PI * 2);
      g.fill();
    }
  }
  g.restore();
}

/**
 * 練字板的提按曲線比較（白底）：model＝示範（金色填色），user＝你寫的（藍線）；bounds＝起筆、行筆結束在幾成。
 */
export function drawCompare(g, w, h, model, user, { bounds = null, labels = null } = {}) {
  const padL = 8, padR = 8, padT = 10, padB = 20;
  const X = (f) => padL + f * (w - padL - padR), Y = (p) => h - padB - p * (h - padT - padB);
  g.clearRect(0, 0, w, h);
  g.save();
  g.fillStyle = '#fbf8f1'; g.fillRect(0, 0, w, h);
  if (bounds) {
    const shade = ['rgba(31,111,139,.07)', 'rgba(0,0,0,0)', 'rgba(201,161,74,.10)'];
    const edges = [0, bounds[0], bounds[1], 1];
    for (let i = 0; i < 3; i++) { g.fillStyle = shade[i]; g.fillRect(X(edges[i]), padT - 6, X(edges[i + 1]) - X(edges[i]), h - padT - padB + 6); }
    if (labels) {
      g.fillStyle = 'rgba(60,60,60,.75)'; g.font = `600 ${Math.max(10, Math.round(h * 0.085))}px system-ui, sans-serif`; g.textAlign = 'center';
      for (let i = 0; i < 3; i++) g.fillText(labels[i], (X(edges[i]) + X(edges[i + 1])) / 2, h - 5);
    }
  }
  g.strokeStyle = 'rgba(0,0,0,.08)'; g.lineWidth = 1;
  for (const p of [0, 0.5, 1]) { g.beginPath(); g.moveTo(padL, Y(p)); g.lineTo(w - padR, Y(p)); g.stroke(); }
  if (model.length) {
    g.beginPath(); g.moveTo(X(0), Y(0));
    for (const [f, p] of model) g.lineTo(X(f), Y(p));
    g.lineTo(X(1), Y(0)); g.closePath();
    g.fillStyle = 'rgba(201,161,74,.32)'; g.fill();
    g.beginPath(); model.forEach(([f, p], i) => (i ? g.lineTo(X(f), Y(p)) : g.moveTo(X(f), Y(p))));
    g.strokeStyle = '#b8902f'; g.lineWidth = 2; g.stroke();
  }
  if (user.length) {
    g.beginPath(); user.forEach(([f, p], i) => (i ? g.lineTo(X(f), Y(p)) : g.moveTo(X(f), Y(p))));
    g.strokeStyle = '#1f6f8b'; g.lineWidth = 2.5; g.stroke();
  }
  g.restore();
}

