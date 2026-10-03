/*
 * 書法 · 第五課起：同一個字在不同時代的樣子（2D canvas，不需要 WebGL）。
 *
 *   STAGES                                  圖畫 → 甲骨文 → 金文 → 小篆 → 隸書 → 楷書（key、中英文名、年代、怎麼做出來的）
 *   glyphFor(key, stage)                    取某個字某個階段的資料（古文字＝中心線；隸書、楷書＝毛筆筆畫）
 *   sealChar(key)                           小篆轉成寫字引擎的筆畫資料（壓力固定 → 線一樣粗），給 3D 毛筆與練字板用
 *   drawStage(g, S, key, stage, opt)        在 S×S 的畫布上畫一個階段（含底色：骨頭、拓片、宣紙）；opt.t（0–1）只畫到一部分（刻字、寫字動畫）
 *   drawCarved(g, strokes, T, opt)          刀刻的線（直的、細、V 字形刻痕：一邊暗一邊亮）
 *   boneBase / rubbingBase                  甲骨的底色、拓片的底色
 *
 * 古文字的中心線在 strokes/ancient.json（自己描的；對位參考 Wikimedia Commons「Ancient Chinese characters project」的公有領域字形）。
 * 隸書（示意）在 strokes/clerical.json（第六課重畫：蠶頭、一個字一個燕尾）；楷書用 strokes/<key>.json（筆順依教育部）。
 * 字框 1000 × 1000，y 往下；字框 → 畫布：T＝{ k, ox, oy }。
 */
import { prepStroke, stamps } from './brush.js';
import { drawStamps, paperBase, rng } from './ink2d.js';
import ANCIENT from './strokes/ancient.json';
import CLERICAL from './strokes/clerical.json';
import RI from './strokes/ri.json';
import YUE from './strokes/yue.json';
import SHAN from './strokes/shan.json';
import SHUI from './strokes/shui.json';
import REN from './strokes/ren.json';
import MA from './strokes/ma.json';

export const REGULAR = { ri: RI, yue: YUE, shan: SHAN, shui: SHUI, ren: REN, ma: MA };
export const KEYS = ['ri', 'yue', 'shan', 'shui', 'ren', 'ma'];
export const CLERICAL_KEYS = ['yi', 'san', 'tu', 'shan', 'ren', 'shui'];   // 第六課的六個字（每個字正好一個燕尾）
export { CLERICAL };

export const STAGES = [
  { key: 'pic', en: 'Picture', zh: '圖畫', note_en: 'Illustration', note_zh: '示意圖' },
  { key: 'oracle', en: 'Oracle bone script', zh: '甲骨文', note_en: 'Carved with a knife', note_zh: '用刀刻' },
  { key: 'bronze', en: 'Bronze script', zh: '金文', note_en: 'Cast in bronze (shown as a rubbing)', note_zh: '鑄在青銅器上（這裡畫成拓片）' },
  { key: 'seal', en: 'Small seal script', zh: '小篆', note_en: 'Brush, even lines', note_zh: '毛筆，線條一樣粗' },
  { key: 'clerical', en: 'Clerical script', zh: '隸書', note_en: 'Brush, flat and wide (sketch)', note_zh: '毛筆，字形扁（示意）' },
  { key: 'regular', en: 'Regular script', zh: '楷書', note_en: 'Brush, the way we write today', note_zh: '毛筆，今天寫的樣子' },
];
export const STAGE_INDEX = Object.fromEntries(STAGES.map((s, i) => [s.key, i]));

// 線寬（字框單位）
const W = { oracle: 34, bronze: 64, seal: 46 };

export function glyphFor(key, stage) {
  if (stage === 'regular') return REGULAR[key].strokes;
  if (stage === 'clerical') return CLERICAL.chars[key].strokes;
  if (stage === 'seal' && !ANCIENT.chars[key]) return CLERICAL.chars[key].seal;   // 一、三、土的小篆
  return ANCIENT.chars[key][stage];
}

/** 小篆 → 寫字引擎的筆畫：中心線先用曲線取樣，再給固定壓力；頭尾也幾乎一樣粗，印子的圓頭就是圓圓的線頭 */
export function sealChar(key) {
  const c = ANCIENT.chars[key];
  const strokes = c.seal.map((st, i) => {
    const P = smooth(st.pts, 5);
    const n = P.length;
    const pts = P.map(([x, y], j) => {
      const e = Math.min(j, n - 1 - j);
      const p = e === 0 ? 0.34 : e === 1 ? 0.38 : 0.4;   // 頭尾不收尖：小篆的線頭是圓的
      return [Math.round(x), Math.round(y), p, e === 0 ? 150 : 230];
    });
    return { n: i + 1, en: 'Stroke', zh: '筆', pts, phases: [1, n - 2] };
  });
  return { char: c.char, key, en: c.en, box: 1000, count: strokes.length, strokes };
}

/** Catmull-Rom 曲線取樣（點可以帶第三個值：寬度倍率） */
export function smooth(p, n = 8) {
  if (p.length < 3) return p.map((q) => [q[0], q[1], q[2] || 1]);
  const o = [];
  for (let i = 0; i < p.length - 1; i++) {
    const a = p[Math.max(0, i - 1)], b = p[i], c = p[i + 1], d = p[Math.min(p.length - 1, i + 2)];
    for (let k = 0; k < n; k++) {
      const t = k / n, t2 = t * t, t3 = t2 * t;
      const f = (j) => 0.5 * ((2 * b[j]) + (-a[j] + c[j]) * t + (2 * a[j] - 5 * b[j] + 4 * c[j] - d[j]) * t2 + (-a[j] + 3 * b[j] - 3 * c[j] + d[j]) * t3);
      o.push([f(0), f(1), (b[2] || 1) + ((c[2] || 1) - (b[2] || 1)) * t]);
    }
  }
  const L = p[p.length - 1];
  o.push([L[0], L[1], L[2] || 1]);
  return o;
}

/** 一組線（每一筆一條折線）照總長度只取前面 t（0–1）的部分 */
function partial(lines, t) {
  if (t >= 1) return lines;
  const len = (l) => l.reduce((s, q, i) => (i ? s + Math.hypot(q[0] - l[i - 1][0], q[1] - l[i - 1][1]) : 0), 0);
  const total = lines.reduce((s, l) => s + len(l), 0);
  let left = total * Math.max(0, t);
  const out = [];
  for (const l of lines) {
    if (left <= 0) break;
    const L = len(l);
    if (L <= left) { out.push(l); left -= L; continue; }
    const part = [l[0]];
    for (let i = 1; i < l.length; i++) {
      const d = Math.hypot(l[i][0] - l[i - 1][0], l[i][1] - l[i - 1][1]);
      if (d >= left) { const u = left / d; part.push([l[i - 1][0] + (l[i][0] - l[i - 1][0]) * u, l[i - 1][1] + (l[i][1] - l[i - 1][1]) * u, l[i][2]]); break; }
      part.push(l[i]); left -= d;
    }
    out.push(part); left = 0;
  }
  return out;
}

// ---------------------------------------------------------------------
// 底色
// ---------------------------------------------------------------------
/** 甲骨（龜甲、牛骨）：米黃色、有斑點和細孔 */
export function boneBase(g, w, h, { seed = 5, color = '#e6d8b8' } = {}) {
  g.save();
  g.fillStyle = color; g.fillRect(0, 0, w, h);
  const r = rng(seed);
  for (let i = 0; i < 60; i++) {   // 一塊塊顏色深淺
    const x = r() * w, y = r() * h, R = (0.04 + r() * 0.16) * Math.max(w, h);
    const gr = g.createRadialGradient(x, y, 0, x, y, R);
    const c = r() < 0.6 ? '160,120,70' : '255,250,235';
    gr.addColorStop(0, `rgba(${c},${0.05 + r() * 0.08})`); gr.addColorStop(1, `rgba(${c},0)`);
    g.fillStyle = gr; g.fillRect(x - R, y - R, R * 2, R * 2);
  }
  for (let i = 0; i < (w * h) / 500; i++) {   // 細孔
    g.fillStyle = `rgba(110,80,45,${0.08 + r() * 0.18})`;
    g.fillRect(r() * w, r() * h, 0.6 + r() * 1.4, 0.6 + r() * 1.4);
  }
  g.restore();
}

/** 拓片：黑色的墨拍在紙上，深淺不勻 */
export function rubbingBase(g, w, h, { seed = 8 } = {}) {
  g.save();
  g.fillStyle = '#1f1f22'; g.fillRect(0, 0, w, h);
  const r = rng(seed);
  for (let i = 0; i < 90; i++) {
    const x = r() * w, y = r() * h, R = (0.03 + r() * 0.12) * Math.max(w, h);
    const gr = g.createRadialGradient(x, y, 0, x, y, R);
    gr.addColorStop(0, `rgba(${r() < 0.5 ? '70,70,74' : '8,8,10'},${0.25 + r() * 0.3})`); gr.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = gr; g.fillRect(x - R, y - R, R * 2, R * 2);
  }
  g.restore();
}

// ---------------------------------------------------------------------
// 線
// ---------------------------------------------------------------------
/** 刀刻的線：折線（不圓滑）、兩頭收尖一點；刻痕一邊暗一邊亮 */
export function drawCarved(g, strokes, T, { t = 1, w = W.oracle, dark = '#4b2f18', light = 'rgba(255,248,232,.75)', mid = '#7d5a37' } = {}) {
  const lines = partial(strokes.map((st) => st.pts.map((q) => [q[0], q[1], q[2] || 1])), t);
  const px = (q) => [T.ox + q[0] * T.k, T.oy + q[1] * T.k];
  g.save();
  g.lineCap = 'round'; g.lineJoin = 'miter'; g.miterLimit = 3;
  const pass = (color, lw, dx, dy) => {
    g.strokeStyle = color; g.lineWidth = lw;
    for (const l of lines) {
      if (l.length < 2) continue;
      g.beginPath();
      l.forEach((q, i) => { const [x, y] = px(q); if (i) g.lineTo(x + dx, y + dy); else g.moveTo(x + dx, y + dy); });
      g.stroke();
    }
  };
  const lw = w * T.k;
  pass(light, lw * 0.95, lw * 0.16, lw * 0.16);   // 刻痕下緣的亮邊
  pass(dark, lw, 0, 0);                             // 刻下去的溝
  pass(mid, lw * 0.42, lw * 0.12, lw * 0.12);       // 溝底比較淺的一面
  g.restore();
}

/** 圓滑、一樣粗（或照寬度倍率變粗細）的線：小篆、金文 */
function drawEven(g, strokes, T, { t = 1, w = W.seal, color = '#151311', smoothIt = true } = {}) {
  const lines = partial(strokes.map((st) => (smoothIt && st.smooth !== false ? smooth(st.pts) : st.pts.map((q) => [q[0], q[1], q[2] || 1]))), t);
  g.save();
  g.lineCap = 'round'; g.lineJoin = 'round';
  g.strokeStyle = color; g.fillStyle = color;
  for (const l of lines) {
    if (l.length === 1) continue;
    for (let i = 0; i < l.length - 1; i++) {
      g.lineWidth = w * T.k * (l[i][2] || 1);
      g.beginPath(); g.moveTo(T.ox + l[i][0] * T.k, T.oy + l[i][1] * T.k); g.lineTo(T.ox + l[i + 1][0] * T.k, T.oy + l[i + 1][1] * T.k); g.stroke();
    }
  }
  g.restore();
}

/** 金文的拓片：字是白的（凹下去的地方沒拍到墨），上面有細細的斑點 */
let glyphCv = null;
function drawRubbingGlyph(g, strokes, T, { t = 1, seed = 4 } = {}) {
  const Wd = g.canvas.width, Hd = g.canvas.height;
  glyphCv = glyphCv || (typeof document !== 'undefined' ? document.createElement('canvas') : null);
  if (!glyphCv) return;
  if (glyphCv.width !== Wd || glyphCv.height !== Hd) { glyphCv.width = Wd; glyphCv.height = Hd; }
  const s = glyphCv.getContext('2d');
  s.clearRect(0, 0, Wd, Hd);
  drawEven(s, strokes, T, { t, w: W.bronze, color: '#ece8dd' });
  s.save();
  s.globalCompositeOperation = 'source-atop';
  const r = rng(seed);
  for (let i = 0; i < (Wd * Hd) / 260; i++) {
    s.fillStyle = `rgba(30,30,32,${0.12 + r() * 0.35})`;
    s.fillRect(r() * Wd, r() * Hd, 0.8 + r() * 2.2, 0.8 + r() * 2.2);
  }
  s.restore();
  g.drawImage(glyphCv, 0, 0);
}

/** 毛筆（隸書、楷書）：寫字引擎的印子；t 照筆畫順序只畫前面一部分 */
const brushCache = new Map();
function brushStamps(id, strokes) {
  if (!brushCache.has(id)) brushCache.set(id, strokes.map((st) => stamps(prepStroke(st))));
  return brushCache.get(id);
}
function drawBrush(g, id, strokes, T, { t = 1, color = '#151311' } = {}) {
  const all = brushStamps(id, strokes);
  const total = all.reduce((s, a) => s + a.length, 0);
  let left = Math.round(total * Math.min(1, Math.max(0, t)));
  for (const sts of all) {
    if (left <= 0) break;
    drawStamps(g, sts, T, { color, i1: Math.min(sts.length, left) });
    left -= sts.length;
  }
}

/** 小篆（一樣粗的圓滑線）畫在任何地方：第六課「隸變」的底圖與前後對照 */
export function drawSeal(g, key, T, { t = 1, color = '#151311' } = {}) { drawEven(g, glyphFor(key, 'seal'), T, { t, w: W.seal, color }); }
/** 隸書每一筆的印子（快取）：第六課「找燕尾」要一筆一筆畫、一筆一筆判斷 */
export function clericalStamps(key) { return brushStamps(`${key}-clerical`, glyphFor(key, 'clerical')); }

// ---------------------------------------------------------------------
// 圖畫（示意）：太陽、月亮、山、河、人、馬
// ---------------------------------------------------------------------
function drawPicture(g, S, key, { t = 1 } = {}) {
  g.save();
  g.globalAlpha *= Math.min(1, Math.max(0, t * 1.5));
  const sky = (top, bot) => { const gr = g.createLinearGradient(0, 0, 0, S); gr.addColorStop(0, top); gr.addColorStop(1, bot); g.fillStyle = gr; g.fillRect(0, 0, S, S); };
  const k = S / 1000;
  if (key === 'ri') {
    sky('#9fd3f2', '#e8f4fb');
    const gr = g.createRadialGradient(500 * k, 470 * k, 40 * k, 500 * k, 470 * k, 420 * k);
    gr.addColorStop(0, 'rgba(255,214,90,.85)'); gr.addColorStop(1, 'rgba(255,214,90,0)');
    g.fillStyle = gr; g.fillRect(0, 0, S, S);
    g.fillStyle = '#ffb22e'; g.beginPath(); g.arc(500 * k, 470 * k, 250 * k, 0, Math.PI * 2); g.fill();
    g.fillStyle = '#ffd25a'; g.beginPath(); g.arc(470 * k, 440 * k, 190 * k, 0, Math.PI * 2); g.fill();
  } else if (key === 'yue') {
    sky('#141c3a', '#2d3a66');
    const r = rng(3); g.fillStyle = '#fff';
    for (let i = 0; i < 40; i++) { g.globalAlpha = 0.3 + r() * 0.6; g.fillRect(r() * S, r() * S, 2 * k + r() * 3 * k, 2 * k + r() * 3 * k); }
    g.globalAlpha = 1;
    g.fillStyle = '#f6e7a8'; g.beginPath(); g.arc(470 * k, 500 * k, 300 * k, 0, Math.PI * 2); g.fill();
    g.fillStyle = '#1d2850'; g.beginPath(); g.arc(300 * k, 470 * k, 290 * k, 0, Math.PI * 2); g.fill();
  } else if (key === 'shan') {
    sky('#bfe0f0', '#eef6fa');
    const peak = (x0, x1, top, xTop, col) => { g.fillStyle = col; g.beginPath(); g.moveTo(x0 * k, 860 * k); g.lineTo(xTop * k, top * k); g.lineTo(x1 * k, 860 * k); g.closePath(); g.fill(); };
    peak(40, 460, 330, 220, '#6f8a74'); peak(560, 960, 360, 800, '#6f8a74'); peak(230, 800, 150, 520, '#4f6b57');
    g.fillStyle = '#f4f7f8'; g.beginPath(); g.moveTo(452 * k, 290 * k); g.lineTo(520 * k, 150 * k); g.lineTo(590 * k, 290 * k); g.lineTo(545 * k, 260 * k); g.lineTo(520 * k, 300 * k); g.lineTo(490 * k, 262 * k); g.closePath(); g.fill();
    g.fillStyle = '#86a36a'; g.fillRect(0, 850 * k, S, 150 * k);
  } else if (key === 'shui') {
    sky('#d7eef7', '#a9d6ea');
    g.strokeStyle = '#2f7fb4'; g.lineCap = 'round';
    g.lineWidth = 90 * k; g.beginPath(); g.moveTo(560 * k, 40 * k); g.bezierCurveTo(380 * k, 300 * k, 640 * k, 600 * k, 440 * k, 960 * k); g.stroke();
    g.strokeStyle = 'rgba(255,255,255,.6)'; g.lineWidth = 14 * k; g.beginPath(); g.moveTo(540 * k, 120 * k); g.bezierCurveTo(420 * k, 320 * k, 600 * k, 560 * k, 470 * k, 860 * k); g.stroke();
    g.fillStyle = '#3d93c8';
    for (const [x, y] of [[270, 290], [700, 340], [300, 740], [720, 760]]) {
      g.beginPath(); g.moveTo(x * k, (y - 70) * k); g.quadraticCurveTo((x + 45) * k, (y + 10) * k, x * k, (y + 40) * k); g.quadraticCurveTo((x - 45) * k, (y + 10) * k, x * k, (y - 70) * k); g.fill();
    }
  } else if (key === 'ren') {
    sky('#f3ead8', '#e9dcc2');
    // 側面彎腰、手往前伸的人（面向左，像甲骨文的「人」）
    g.fillStyle = '#5b4636';
    g.beginPath(); g.arc(430 * k, 170 * k, 70 * k, 0, Math.PI * 2); g.fill();
    g.strokeStyle = '#5b4636'; g.lineCap = 'round'; g.lineJoin = 'round';
    g.lineWidth = 70 * k; g.beginPath(); g.moveTo(470 * k, 250 * k); g.quadraticCurveTo(600 * k, 400 * k, 580 * k, 560 * k); g.stroke();   // 背
    g.lineWidth = 58 * k; g.beginPath(); g.moveTo(580 * k, 560 * k); g.lineTo(560 * k, 900 * k); g.stroke();   // 腿
    g.beginPath(); g.moveTo(580 * k, 560 * k); g.lineTo(650 * k, 880 * k); g.stroke();
    g.lineWidth = 40 * k; g.beginPath(); g.moveTo(500 * k, 300 * k); g.quadraticCurveTo(430 * k, 420 * k, 380 * k, 540 * k); g.stroke();   // 手
  } else if (key === 'ma') {
    sky('#e3eed9', '#cfe0bf');
    g.fillStyle = '#7a4a2a';
    g.beginPath();   // 側面的馬（頭在右邊）
    g.moveTo(230 * k, 430 * k); g.bezierCurveTo(260 * k, 360 * k, 520 * k, 350 * k, 640 * k, 380 * k);
    g.bezierCurveTo(690 * k, 300 * k, 720 * k, 230 * k, 790 * k, 210 * k); g.lineTo(880 * k, 300 * k); g.lineTo(860 * k, 330 * k); g.lineTo(780 * k, 300 * k);
    g.bezierCurveTo(740 * k, 360 * k, 720 * k, 440 * k, 700 * k, 500 * k); g.bezierCurveTo(690 * k, 560 * k, 600 * k, 580 * k, 520 * k, 580 * k);
    g.bezierCurveTo(420 * k, 590 * k, 300 * k, 580 * k, 250 * k, 540 * k); g.closePath(); g.fill();
    g.strokeStyle = '#7a4a2a'; g.lineCap = 'round'; g.lineWidth = 34 * k;
    for (const [x0, x1] of [[290, 280], [360, 370], [600, 590], [670, 690]]) { g.beginPath(); g.moveTo(x0 * k, 540 * k); g.lineTo(x1 * k, 820 * k); g.stroke(); }
    g.strokeStyle = '#3d2414'; g.lineWidth = 26 * k; g.beginPath(); g.moveTo(232 * k, 440 * k); g.quadraticCurveTo(170 * k, 520 * k, 180 * k, 660 * k); g.stroke();   // 尾巴
    g.lineWidth = 18 * k;
    for (let i = 0; i < 5; i++) { g.beginPath(); g.moveTo((640 + i * 30) * k, (370 - i * 34) * k); g.lineTo((600 + i * 30) * k, (330 - i * 34) * k); g.stroke(); }   // 鬃毛
    g.fillStyle = '#1b1008'; g.beginPath(); g.arc(800 * k, 250 * k, 10 * k, 0, Math.PI * 2); g.fill();
  }
  g.restore();
}

// ---------------------------------------------------------------------
/**
 * 畫一個階段（含底色）。opt：{ t 0–1 只畫一部分, base 是否畫底色, margin 字框外留白（比例）, grid 宣紙上要不要米字格 }
 */
export function drawStage(g, S, key, stage, { t = 1, base = true, margin = 0.08 } = {}) {
  const k = (S * (1 - margin * 2)) / 1000, o = S * margin;
  const T = { k, ox: o, oy: o };
  if (stage === 'pic') { drawPicture(g, S, key, { t }); return; }
  if (stage === 'oracle') {
    if (base) boneBase(g, S, S);
    drawCarved(g, glyphFor(key, 'oracle'), T, { t });
    return;
  }
  if (stage === 'bronze') {
    if (base) rubbingBase(g, S, S);
    drawRubbingGlyph(g, glyphFor(key, 'bronze'), T, { t });
    return;
  }
  if (base) paperBase(g, S, S, { seed: 11, fiber: 0.4 });
  if (stage === 'seal') { drawEven(g, glyphFor(key, 'seal'), T, { t, w: W.seal }); return; }
  drawBrush(g, `${key}-${stage}`, glyphFor(key, stage), T, { t });
}
