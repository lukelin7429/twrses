/*
 * 書法 · 寫字引擎的純函式（不碰 DOM、不碰 three.js；node 測試在 test/brush.test.mjs）。
 * 每一課只換筆畫資料（src/strokes/*.json），引擎不動。
 *
 * 座標：筆畫資料用 1000 × 1000 的「字框」（x 往右、y 往下），長度都是字框單位。
 * 筆畫資料格式（自己手繪；筆順一律照教育部《常用國字標準字體筆順學習網》）：
 *   { char, key, box: 1000, strokes: [ { n, en, zh, pts: [[x, y, 壓力 0–1, 速度 字框單位/秒], …], phases: [a, b] } ] }
 *   pts 是中心線的控制點；壓力 0 ＝筆尖剛碰到紙、1 ＝整個筆肚壓下去。
 *   phases：控制點 0–a 是起筆、a–b 是行筆、b–最後是收筆（第二課起分段重播用）。
 *
 *   prepStroke(stroke, opt)   控制點 → 平滑取樣（向心 Catmull-Rom）＋弧長 s、時間 t、壓力 p、階段 phase
 *   footprint(p, opt)         壓力 → 筆毛貼在紙上的形狀：圓頭在筆桿正下方，半寬 hw、往後拖的長度 len
 *   tipTrail(samples, opt)    筆尖往哪裡拖：有慣性（筆毛被拖著走，要走一段距離才轉得過來）；side＝側鋒（筆尖偏到一邊）
 *   bendGeom(L, d, tilt)      3D 筆毛彎下去的形狀（直線 → 圓弧 → 貼紙），筆桿可以斜（側鋒）
 *   bristles(n, seed)         側鋒的筆毛一根根分開：每根的位置、粗細、多快沒墨（畫飛白）
 *   curveFromStamps、curveMatch   練字板：你這一筆的提按曲線、和示範有多像
 *   stamps(samples, opt)      一筆的「印子」：每個取樣點一個水滴形，疊起來就是墨跡
 *   teardrop(st, n)           一個印子的多邊形
 *   outline(stamps)           整筆墨跡的外輪廓（左右兩條邊）
 *   sampleAt(samples, t)      某一時刻筆在哪、壓多重
 *   forceCurve(samples)       力道曲線（走了幾成 → 壓力）
 *   speedToPressure、penPressure、smoothTo   練字板：寫得慢＝粗、快＝細；觸控筆讀壓力
 *   PAPERS、INKS、bleed       一滴墨在不同的紙上暈開（示意，不是量測）
 *   grindDarkness             磨幾圈、墨有多黑（示意）
 *   HAIR、bendFor、springBack 羊毫、狼毫、兼毫：同樣的力道彎多少、放開後彈回多快（示意）
 */

export const BOX = 1000;
export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a, b, k) => a + (b - a) * k;
const wrapPi = (a) => { while (a > Math.PI) a -= 2 * Math.PI; while (a < -Math.PI) a += 2 * Math.PI; return a; };

// ---------------------------------------------------------------------
// 筆畫取樣
// ---------------------------------------------------------------------
// 向心 Catmull-Rom（Barry–Goldman），alpha 0.5：轉折處不會打圈、不會超出
function crPoint(P0, P1, P2, P3, u) {
  const d = (a, b) => Math.max(1e-6, Math.hypot(b[0] - a[0], b[1] - a[1]) ** 0.5);
  const t0 = 0, t1 = t0 + d(P0, P1), t2 = t1 + d(P1, P2), t3 = t2 + d(P2, P3);
  const t = t1 + (t2 - t1) * u;
  const mix = (A, B, ta, tb) => [((tb - t) * A[0] + (t - ta) * B[0]) / (tb - ta), ((tb - t) * A[1] + (t - ta) * B[1]) / (tb - ta)];
  const A1 = mix(P0, P1, t0, t1), A2 = mix(P1, P2, t1, t2), A3 = mix(P2, P3, t2, t3);
  const B1 = mix(A1, A2, t0, t2), B2 = mix(A2, A3, t1, t3);
  return mix(B1, B2, t1, t2);
}

export function phaseAt(ctrl, phases) {
  if (!phases) return 1;
  return ctrl < phases[0] ? 0 : ctrl < phases[1] ? 1 : 2;
}

/**
 * 控制點 → 取樣點陣列 [{ x, y, p, v, s, t, ctrl, phase }]
 *   step：取樣間距（字框單位）
 */
export function prepStroke(stroke, { step = 3 } = {}) {
  const P = stroke.pts;
  const n = P.length;
  if (n < 2) throw new Error('a stroke needs at least two points');
  const ext = (i) => {
    if (i < 0) return [2 * P[0][0] - P[1][0], 2 * P[0][1] - P[1][1]];
    if (i >= n) return [2 * P[n - 1][0] - P[n - 2][0], 2 * P[n - 1][1] - P[n - 2][1]];
    return P[i];
  };
  const out = [];
  for (let i = 0; i < n - 1; i++) {
    const chord = Math.hypot(P[i + 1][0] - P[i][0], P[i + 1][1] - P[i][1]);
    const m = Math.max(1, Math.ceil(chord / step));
    for (let k = 0; k < m; k++) {
      const u = k / m;
      const [x, y] = crPoint(ext(i - 1), P[i], P[i + 1], ext(i + 2), u);
      out.push({ x, y, p: lerp(P[i][2], P[i + 1][2], u), v: lerp(P[i][3], P[i + 1][3], u), ctrl: i + u });
    }
  }
  const L = P[n - 1];
  out.push({ x: L[0], y: L[1], p: L[2], v: L[3], ctrl: n - 1 });
  let s = 0, t = 0;
  out.forEach((q, i) => {
    if (i > 0) {
      const a = out[i - 1], ds = Math.hypot(q.x - a.x, q.y - a.y);
      s += ds;
      t += ds / Math.max(1, (q.v + a.v) / 2);
    }
    q.s = s; q.t = t; q.phase = phaseAt(q.ctrl, stroke.phases);
  });
  return out;
}

export const strokeLength = (samples) => samples[samples.length - 1].s;
export const strokeDuration = (samples) => samples[samples.length - 1].t;

/** 某一時刻（秒）筆的位置與壓力；超出範圍就停在頭尾 */
export function sampleAt(samples, t) {
  const last = samples.length - 1;
  if (t <= 0) return { ...samples[0], i: 0 };
  if (t >= samples[last].t) return { ...samples[last], i: last };
  let lo = 0, hi = last;
  while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (samples[mid].t <= t) lo = mid; else hi = mid; }
  const a = samples[lo], b = samples[hi], k = (t - a.t) / Math.max(1e-9, b.t - a.t);
  return { x: lerp(a.x, b.x, k), y: lerp(a.y, b.y, k), p: lerp(a.p, b.p, k), s: lerp(a.s, b.s, k), t, ctrl: lerp(a.ctrl, b.ctrl, k), phase: a.phase, i: lo };
}

// ---------------------------------------------------------------------
// 筆毛貼紙的形狀
// ---------------------------------------------------------------------
export const FOOT = { tipW: 6, maxW: 118, maxLen: 56, gamma: 1.12 };

/** 壓力 → { hw 半寬, len 往後拖的長度 }；壓力 ≤ 0 表示筆在空中，沒有印子 */
export function footprint(p, o = FOOT) {
  if (!(p > 0.001)) return null;
  const q = clamp(p);
  const w = o.tipW + (o.maxW - o.tipW) * q ** o.gamma;
  return { hw: w / 2, len: o.tipW * 0.5 + o.maxLen * q ** 0.9 };
}

/** 壓下去多深（筆桿往下降多少，以筆毛長 L 為 1）：給 3D 用 */
export const pressDepth = (p) => 0.58 * clamp(p) ** 0.95;

/**
 * 筆尖往哪裡拖（角度，弧度；0 ＝ +x、π/2 ＝ +y 往下）。
 * 筆毛被拖著走：目標方向是「運動方向的反方向」，每走 ds 只轉過 1 − e^(−ds/lag) 的角度差。
 * 正好掉頭（差 180°）時固定往逆時針轉，免得卡住不動。
 * side（弧度）：側鋒。筆桿斜了，筆尖不在線的中間而貼著一邊走；目標方向再轉 side（π/2＝往右寫時筆尖在上緣）。
 */
export function tipTrail(samples, { lag = 26, start = null, side = 0 } = {}) {
  const out = new Array(samples.length);
  let a = start;
  if (a === null) {
    // 起始方向：第一段有在動的運動方向的反方向
    let k = 1;
    while (k < samples.length && Math.hypot(samples[k].x - samples[0].x, samples[k].y - samples[0].y) < 1e-6) k++;
    const b = samples[Math.min(k, samples.length - 1)];
    a = Math.atan2(samples[0].y - b.y, samples[0].x - b.x) + side;
  }
  out[0] = a;
  for (let i = 1; i < samples.length; i++) {
    const dx = samples[i].x - samples[i - 1].x, dy = samples[i].y - samples[i - 1].y, ds = Math.hypot(dx, dy);
    if (ds > 1e-9) {
      const target = Math.atan2(-dy, -dx) + side;   // 中鋒 side＝0：拖在正後方；側鋒：偏到一邊
      let d = wrapPi(target - a);
      if (Math.abs(Math.abs(d) - Math.PI) < 1e-6) d = Math.PI - 1e-6;
      a = wrapPi(a + d * (1 - Math.exp(-ds / lag)));
    }
    out[i] = a;
  }
  return out;
}

/** 一筆的印子：[{ x, y, a 筆尖拖的方向, hw, len, p, phase, t }] */
export function stamps(samples, opt = {}) {
  const trail = tipTrail(samples, opt);
  const out = [];
  samples.forEach((q, i) => {
    const f = footprint(q.p, opt.foot || FOOT);
    if (f) out.push({ x: q.x, y: q.y, a: trail[i], hw: f.hw, len: f.len, p: q.p, phase: q.phase, t: q.t, s: q.s });
  });
  return out;
}

/** 一個印子的多邊形（圓頭在 (x, y)、尾巴往 a 方向收窄成蛋形的尾端：尾端是圓的，筆尖轉向時邊緣才不會鋸齒） */
export function teardrop(st, n = 10) {
  const ca = Math.cos(st.a), sa = Math.sin(st.a);
  const nx = -sa, ny = ca;            // 左手邊的法向量
  const pts = [];
  // 左邊的尾巴：從尾尖往圓頭
  for (let k = n; k >= 0; k--) {
    const u = k / n, w = st.hw * (1 - u * u) ** 0.55;
    pts.push([st.x + ca * st.len * u + nx * w, st.y + sa * st.len * u + ny * w]);
  }
  // 圓頭（背向尾巴的半圓）
  for (let k = 1; k < n * 2; k++) {
    const th = Math.PI / 2 + (Math.PI * k) / (n * 2);
    const c = Math.cos(th), s = Math.sin(th);
    // 在「尾巴方向＝0°」的座標裡取點，再轉回來
    pts.push([st.x + (ca * c - sa * s) * st.hw, st.y + (sa * c + ca * s) * st.hw]);
  }
  // 右邊的尾巴：從圓頭往尾尖
  for (let k = 0; k <= n; k++) {
    const u = k / n, w = st.hw * (1 - u * u) ** 0.55;
    pts.push([st.x + ca * st.len * u - nx * w, st.y + sa * st.len * u - ny * w]);
  }
  return pts;
}

/**
 * 整筆墨跡的外輪廓：每個印子在「行進方向的左右」最遠到哪裡。
 * 回傳 { left: [[x,y]…], right: [[x,y]…], poly: 左邊＋右邊倒過來 }
 */
export function outline(sts) {
  const left = [], right = [];
  sts.forEach((st, i) => {
    const a = sts[Math.max(0, i - 1)], b = sts[Math.min(sts.length - 1, i + 1)];
    let mx = b.x - a.x, my = b.y - a.y;
    const m = Math.hypot(mx, my);
    if (m < 1e-9) { mx = -Math.cos(st.a); my = -Math.sin(st.a); } else { mx /= m; my /= m; }
    const nx = my, ny = -mx;          // 行進方向的左手邊（y 往下的座標）
    let best = -Infinity, worst = Infinity, L = null, R = null;
    for (const [x, y] of teardrop(st, 8)) {
      const d = (x - st.x) * nx + (y - st.y) * ny;
      if (d > best) { best = d; L = [x, y]; }
      if (d < worst) { worst = d; R = [x, y]; }
    }
    left.push(L); right.push(R);
  });
  return { left, right, poly: left.concat(right.slice().reverse()) };
}

/** 力道曲線：[[走了幾成 0–1, 壓力], …]（第二課起和自己寫的比較） */
export function forceCurve(samples, n = 120) {
  const L = strokeLength(samples) || 1;
  const out = [];
  let j = 0;
  for (let k = 0; k <= n; k++) {
    const s = (L * k) / n;
    while (j < samples.length - 2 && samples[j + 1].s < s) j++;
    const a = samples[j], b = samples[j + 1] || a;
    const f = b.s > a.s ? (s - a.s) / (b.s - a.s) : 0;
    out.push([k / n, lerp(a.p, b.p, clamp(f))]);
  }
  return out;
}

// ---------------------------------------------------------------------
// 3D 筆毛彎下去的形狀（brush3d.js 用）
// ---------------------------------------------------------------------
/**
 * 筆毛長 L、筆毛根部離紙面 H＝L − d、筆桿斜 tilt（弧度，往筆尖的反方向倒）時，中心線分三段：
 *   順著筆桿往下的直線 b0 → 轉到水平的圓弧（半徑 rc，轉 π/2 − tilt）→ 貼在紙上的直線 flat。總長固定＝L。
 * offset＝貼紙的地方（圓弧結束）離筆桿正下方多遠：墨跡的圓頭在那裡，所以 3D 要把筆桿往前挪這麼多。
 * 沒碰到紙（L·cos tilt ≤ H）：整根直的。tilt＝0 時和第一課的四分之一圓完全一樣（rc＝min(1.2d, 0.9H)）。
 */
export function bendGeom(L, d, tilt = 0) {
  const H = L - d, c = Math.cos(tilt), s = Math.sin(tilt);
  const excess = L - H / c;                       // 順著筆桿量，超過紙面多長
  if (excess <= 1e-6) return { touch: false, H, b0: L, rc: 0, arc: 0, flat: 0, offset: 0, tilt };
  let rc = Math.min(1.2 * excess, (0.9 * H) / Math.max(1e-6, 1 - s));
  let b0 = (H - rc * (1 - s)) / c;
  const turn = Math.PI / 2 - tilt;
  let flat = L - b0 - rc * turn;
  if (flat < 0) {                                 // 圓弧太大：縮到剛好沒有平的那段
    rc = (H / c - L) / ((1 - s) / c - turn);
    b0 = (H - rc * (1 - s)) / c; flat = 0;
  }
  return { touch: true, H, b0, rc, arc: rc * turn, flat, offset: b0 * s + rc * c, tilt };
}

/** 側鋒寫字時筆毛一根根分開：[{ u 位置 0＝筆肚那一緣…1＝筆尖那一緣, w 粗細, k 乾的門檻 }]（固定種子，每次一樣） */
export function bristles(n = 28, seed = 7) {
  let a = (seed * 2654435761) >>> 0 || 1;
  const r = () => { a ^= a << 13; a >>>= 0; a ^= a >>> 17; a ^= a << 5; a >>>= 0; return a / 4294967296; };
  const out = [];
  for (let i = 0; i < n; i++) out.push({ u: (i + 0.15 + 0.7 * r()) / n, w: 0.6 + 0.8 * r(), k: r() });
  return out;
}

// ---------------------------------------------------------------------
// 練字板：寫得慢＝粗、寫得快＝細；有觸控筆壓力時用壓力
// ---------------------------------------------------------------------
export const PAD = { pMin: 0.12, pMax: 0.92, vMid: 700 };

/** 速度（字框單位／秒）→ 壓力：越慢越接近 pMax，越快越接近 pMin */
export function speedToPressure(v, o = PAD) {
  const x = Math.max(0, v) / o.vMid;
  return o.pMin + (o.pMax - o.pMin) / (1 + x * x);
}
/** 觸控筆的 PointerEvent.pressure（0–1）→ 壓力；輕輕碰也留得下細線 */
export function penPressure(raw) {
  return 0.06 + 0.94 * clamp(raw) ** 0.85;
}
/** 往目標值平滑靠近（時間常數 tau 秒）：手抖或速度跳動時線寬不會忽粗忽細 */
export function smoothTo(prev, target, dt, tau = 0.06) {
  return prev + (target - prev) * (1 - Math.exp(-Math.max(0, dt) / tau));
}

/** 使用者寫的一筆（印子陣列，每個有 x、y、p）→ 提按曲線 [[走了幾成, 壓力], …]，和 forceCurve 同格式 */
export function curveFromStamps(sts, n = 120) {
  if (!sts.length) return [];
  const d = [0];
  for (let i = 1; i < sts.length; i++) d.push(d[i - 1] + Math.hypot(sts[i].x - sts[i - 1].x, sts[i].y - sts[i - 1].y));
  const L = d[d.length - 1] || 1;
  const out = [];
  let j = 0;
  for (let k = 0; k <= n; k++) {
    const s = (L * k) / n;
    while (j < sts.length - 2 && d[j + 1] < s) j++;
    const b = Math.min(j + 1, sts.length - 1), f = d[b] > d[j] ? clamp((s - d[j]) / (d[b] - d[j])) : 0;
    out.push([k / n, lerp(sts[j].p, sts[b].p, f)]);
  }
  return out;
}
/** 兩條提按曲線有多像（0–1）：同一個位置的壓力差平均起來，差 0.5 以上算 0 */
export function curveMatch(a, b) {
  if (!a.length || a.length !== b.length) return 0;
  let s = 0;
  for (let i = 0; i < a.length; i++) s += Math.abs(a[i][1] - b[i][1]);
  return clamp(1 - s / a.length / 0.5);
}

// ---------------------------------------------------------------------
// 一滴墨在紙上暈開（示意：相對大小，不是量測）
// ---------------------------------------------------------------------
export const PAPERS = {
  xuan: { en: 'Raw Xuan paper', zh: '生宣紙', spread: 3.1, tau: 1.5, feather: 0.42, gloss: 0 },
  shu: { en: 'Sized Xuan paper', zh: '熟宣紙', spread: 1.45, tau: 2.2, feather: 0.1, gloss: 0.25 },
  news: { en: 'Newspaper', zh: '報紙', spread: 2.1, tau: 1.0, feather: 0.28, gloss: 0 },
  copy: { en: 'Copy paper', zh: '影印紙', spread: 1.1, tau: 3.0, feather: 0.03, gloss: 1 },
};
export const INKS = {
  thick: { en: 'Thick ink', zh: '濃墨', water: 0.2, dark: 0.96 },
  mid: { en: 'Medium ink', zh: '中墨', water: 0.55, dark: 0.72 },
  light: { en: 'Light ink', zh: '淡墨', water: 0.95, dark: 0.42 },
};

/**
 * 一滴墨落在紙上 t 秒後：{ r 半徑（落下時＝1）, rMax, feather 邊緣毛糙度, dark 墨色, halo 水痕比墨跡多出的比例, gloss 表面還亮亮的程度 }
 * 會吸水的紙（生宣、報紙）：水帶著墨往纖維裡跑，越淡（水越多）跑越遠；邊緣毛毛的，外圈有一圈淡淡的水痕。
 * 上過膠的紙（影印紙）：水進不去，墨珠停在表面，幾乎不擴散，很久才乾。
 */
export function bleed(paperKey, inkKey, t) {
  const pa = PAPERS[paperKey], ink = INKS[inkKey];
  if (!pa || !ink) throw new Error(`unknown paper or ink: ${paperKey}, ${inkKey}`);
  const S = 1 + (pa.spread - 1) * (0.55 + 0.75 * ink.water);
  const k = 1 - Math.exp(-Math.max(0, t) / pa.tau);
  const absorb = 1 - pa.gloss;
  return {
    r: 1 + (S - 1) * k,
    rMax: S,
    feather: pa.feather * (0.6 + 0.6 * ink.water) * k,
    dark: ink.dark * (1 - 0.18 * absorb * k),
    halo: absorb * (0.08 + 0.3 * ink.water) * k,
    gloss: pa.gloss * Math.exp(-Math.max(0, t) / 14) + (1 - pa.gloss) * 0.7 * Math.exp(-Math.max(0, t) / 0.35),
  };
}

// ---------------------------------------------------------------------
// 磨墨（示意）：磨越多圈越黑，越來越慢才變黑
// ---------------------------------------------------------------------
export const grindDarkness = (circles, n0 = 40) => 1 - Math.exp(-Math.max(0, circles) / n0);

// ---------------------------------------------------------------------
// 筆毛（示意）：soft＝同樣的力道彎多少（羊毫為 1）；spring＝放開後彈回來的速度（每秒）
// ---------------------------------------------------------------------
export const HAIR = {
  goat: { en: 'Goat hair', zh: '羊毫', soft: 1, spring: 2.2, color: 0xf2ebd8 },
  mixed: { en: 'Mixed hair', zh: '兼毫', soft: 0.72, spring: 4.2, color: 0xc9a77a },
  weasel: { en: 'Weasel hair', zh: '狼毫', soft: 0.48, spring: 7.5, color: 0x9b6a3c },
};
/** 同樣的力道（0–1）彎多少（0–1） */
export const bendFor = (hairKey, force) => clamp(force * HAIR[hairKey].soft);
/** 放開 t 秒後還彎著多少（從 b0 開始）：越硬的毛彈回越快 */
export const springBack = (hairKey, b0, t) => b0 * Math.exp(-HAIR[hairKey].spring * Math.max(0, t));
