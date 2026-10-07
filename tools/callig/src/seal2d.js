/*
 * 書法 · 第十二課：印章的 2D 繪圖與互動（不需要 WebGL）。印面上的字用第五課的小篆（scripts2d.js 的 drawSeal）。
 *
 *   KEYS / GLYPH / SYMMETRIC        六個字：日月山水人馬；其中日、山、水的小篆左右幾乎對稱
 *   printReads(carve)               印面怎麼刻（'mirror' 反著刻｜'straight' 照正的刻）→ 蓋出來的字是 'right'（正的）還是 'backward'（反的）
 *                                   蓋印＝把印面左右翻過來，所以印面要反著刻，蓋出來才是正的
 *   inkAt(style, onChar)            那個位置沾不沾得到印泥：朱文（陽刻）＝字凸出來，字沾得到；白文（陰刻）＝字凹下去，字以外的地方沾得到
 *   drawImpression(g, S, key, opt)  蓋在紙上的樣子（朱文：紅字白底；白文：紅底白字）。opt：{ style, carve, shape, alpha }
 *   drawFace(g, S, key, opt)        印面（石頭）：凸的地方亮、凹的地方暗；opt.inked 沾了印泥後凸的地方變紅。永遠是「蓋出來」的左右相反
 *   drawMinis()                     卡片小圖：canvas[data-cg-seal="zhu|bai"][data-key][data-view="print|face"]
 *   initKind(root)                  root＝[data-cal-sealkind]：「朱文還是白文？」看一個印，選是哪一種；八題一輪
 *   initDesign(root)                root＝[data-cal-sealdesign]：「設計自己的印」選字、朱白、方圓，左邊是印面（反的）、右邊是蓋出來的樣子；可存成圖片
 *
 * 除錯：root.__kind（answer('zhu'|'bai')、next()、state）；root.__design（state、set(k, v)）
 */
import { KEYS, drawSeal } from './scripts2d.js';

export { KEYS };
export const GLYPH = { ri: '日', yue: '月', shan: '山', shui: '水', ren: '人', ma: '馬' };
export const GLYPH_EN = { ri: 'sun', yue: 'moon', shan: 'mountain', shui: 'water', ren: 'person', ma: 'horse' };
export const PASTE = '#c62a1f';
/** 小篆左右幾乎對稱的字：反著刻和照正的刻看不太出差別，示範「印面是反的」時不要用 */
export const SYMMETRIC = ['ri', 'shan', 'shui'];
export const printReads = (carve) => (carve === 'mirror' ? 'right' : 'backward');
export const inkAt = (style, onChar) => (style === 'zhu' ? onChar : !onChar);

function shapePath(g, S, shape, inset) {
  const a = S * inset, b = S - a;
  g.beginPath();
  if (shape === 'round') g.arc(S / 2, S / 2, (b - a) / 2, 0, Math.PI * 2);
  else { const r = S * 0.05; g.moveTo(a + r, a); g.arcTo(b, a, b, b, r); g.arcTo(b, b, a, b, r); g.arcTo(a, b, a, a, r); g.arcTo(a, a, b, a, r); g.closePath(); }
}
/** 一張遮罩：字（和朱文的邊框）是不透明的。flip＝左右翻 */
function charMask(S, key, { border = false, shape = 'square', flip = false } = {}) {
  const c = document.createElement('canvas'); c.width = S; c.height = S;
  const g = c.getContext('2d');
  if (flip) { g.translate(S, 0); g.scale(-1, 1); }
  const m = S * (shape === 'round' ? 0.25 : 0.2), k = (S - m * 2) / 1000;
  drawSeal(g, key, { k, ox: m, oy: m }, { color: '#000' });
  if (border) { g.strokeStyle = '#000'; g.lineWidth = S * 0.045; shapePath(g, S, shape, 0.085); g.stroke(); }
  return c;
}
function tint(mask, color) {
  const c = document.createElement('canvas'); c.width = mask.width; c.height = mask.height;
  const g = c.getContext('2d');
  g.drawImage(mask, 0, 0); g.globalCompositeOperation = 'source-in'; g.fillStyle = color; g.fillRect(0, 0, c.width, c.height);
  return c;
}
/** 印泥不會蓋得完全均勻：挖掉一些小白點（示意） */
function speckle(g, S, seed, n) {
  let a = (seed * 2654435761) >>> 0 || 1;
  const r = () => { a ^= a << 13; a >>>= 0; a ^= a >>> 17; a ^= a << 5; a >>>= 0; return a / 4294967296; };
  g.save(); g.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < n; i++) { g.globalAlpha = 0.25 + r() * 0.5; g.beginPath(); g.arc(r() * S, r() * S, S * (0.003 + r() * 0.007), 0, Math.PI * 2); g.fill(); }
  g.restore();
}
export function drawImpression(g, S, key, { style = 'zhu', carve = 'mirror', shape = 'square', alpha = 0.94, clear = true } = {}) {
  const c = document.createElement('canvas'); c.width = S; c.height = S;
  const q = c.getContext('2d');
  const flip = printReads(carve) === 'backward';
  if (style === 'zhu') q.drawImage(tint(charMask(S, key, { border: true, shape, flip }), PASTE), 0, 0);
  else {
    q.fillStyle = PASTE; shapePath(q, S, shape, 0.06); q.fill();
    q.globalCompositeOperation = 'destination-out'; q.drawImage(charMask(S, key, { shape, flip }), 0, 0); q.globalCompositeOperation = 'source-over';
  }
  speckle(q, S, key.length * 7 + (style === 'zhu' ? 3 : 5), Math.round(S * 0.9));
  if (clear) g.clearRect(0, 0, S, S);
  g.save(); g.globalAlpha = alpha; g.drawImage(c, 0, 0); g.restore();
}
export function drawFace(g, S, key, { style = 'zhu', carve = 'mirror', shape = 'square', inked = false, bg = null } = {}) {
  g.clearRect(0, 0, S, S);
  if (bg) { g.fillStyle = bg; g.fillRect(0, 0, S, S); }
  const flip = carve === 'mirror';   // 反著刻：印面上的字是左右相反的
  const HI = inked ? PASTE : '#d9c7a3', LO = '#6b5a45', EDGE = 'rgba(0,0,0,.28)';
  const mask = charMask(S, key, { border: style === 'zhu', shape, flip });
  g.save();
  shapePath(g, S, shape, 0.04); g.clip();
  g.fillStyle = style === 'zhu' ? LO : HI; g.fillRect(0, 0, S, S);              // 朱文：底是凹的；白文：底是凸的
  g.drawImage(tint(mask, EDGE), S * 0.008, S * 0.012);                            // 一點點陰影，看得出高低
  g.drawImage(tint(mask, style === 'zhu' ? HI : LO), 0, 0);                       // 朱文：字是凸的；白文：字是凹的
  g.restore();
  g.strokeStyle = 'rgba(0,0,0,.35)'; g.lineWidth = Math.max(1, S * 0.012); shapePath(g, S, shape, 0.04); g.stroke();
}
export function drawMinis() {
  document.querySelectorAll('canvas[data-cg-seal]').forEach((c) => {
    const style = c.getAttribute('data-cg-seal'), key = c.getAttribute('data-key') || 'ma', S = 220;
    c.width = S; c.height = S;
    const g = c.getContext('2d');
    if (c.getAttribute('data-view') === 'face') drawFace(g, S, key, { style, inked: c.getAttribute('data-inked') === '1', carve: c.getAttribute('data-carve') || 'mirror' });
    else { g.fillStyle = '#f6f0e1'; g.fillRect(0, 0, S, S); drawImpression(g, S, key, { style, carve: c.getAttribute('data-carve') || 'mirror', clear: false }); }
  });
}

// ---------------------------------------------------------------------
// 朱文還是白文？
// ---------------------------------------------------------------------
const NAME = { zhu: { en: 'Red-character seal', zh: '朱文', hint_en: 'The characters are red: on the seal they stand up, so they pick up the paste.', hint_zh: '字是紅的：印面上的字是凸起來的，所以沾得到印泥。' },
  bai: { en: 'White-character seal', zh: '白文', hint_en: 'The characters are white: on the seal they are cut in, so the paste cannot reach them.', hint_zh: '字是白的：印面上的字是凹下去的，印泥沾不到。' } };
export function initKind(root) {
  const cv = root.querySelector('.cg-kind-cv'), g = cv.getContext('2d');
  const opts = root.querySelector('.cg-kind-opts'), msg = root.querySelector('.cg-kind-msg'), q = root.querySelector('.cg-kind-q'), scoreEl = root.querySelector('.cg-kind-score');
  const ROUNDS = 8;
  let seed = (Date.now() % 2147483646) + 1;
  const rand = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const shuffle = (a) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const deal = () => shuffle(KEYS.flatMap((k) => ['zhu', 'bai'].map((s) => ({ key: k, style: s, shape: rand() < 0.3 ? 'round' : 'square' })))).slice(0, ROUNDS);
  const state = { order: deal(), i: 0, right: 0, answered: false, firstTry: true };
  function paint() {
    const css = cv.clientWidth || 300, dpr = Math.min(window.devicePixelRatio || 1, 2), S = Math.round(css * dpr);
    if (cv.width !== S) { cv.width = S; cv.height = S; }
    const it = state.order[state.i];
    g.fillStyle = '#f6f0e1'; g.fillRect(0, 0, S, S);
    const s = Math.round(S * 0.62), c = document.createElement('canvas'); c.width = s; c.height = s;
    drawImpression(c.getContext('2d'), s, it.key, it);
    g.drawImage(c, (S - s) / 2, (S - s) / 2);
  }
  function showScore() { if (scoreEl) scoreEl.textContent = `${state.right} / ${ROUNDS}`; }
  function round() {
    state.answered = false; state.firstTry = true;
    opts.innerHTML = ['zhu', 'bai'].map((s) => `<button type="button" data-ans="${s}"><b>${NAME[s].zh}</b><span>${NAME[s].en}</span></button>`).join('');
    opts.querySelectorAll('[data-ans]').forEach((b) => b.addEventListener('click', () => answer(b.getAttribute('data-ans'))));
    if (q) q.innerHTML = `Question ${state.i + 1} of ${ROUNDS}: which kind of seal made this print?<span class="zh">第 ${state.i + 1} 題（共 ${ROUNDS} 題）：這是哪一種印蓋出來的？</span>`;
    if (msg) msg.innerHTML = 'Look at the characters: are they red, or white?<span class="zh">看看字：字是紅的，還是白的？</span>';
    paint();
  }
  function answer(a) {
    if (state.answered) return null;
    const it = state.order[state.i], btn = opts.querySelector(`[data-ans="${a}"]`), ok = a === it.style;
    if (ok) {
      if (state.firstTry) state.right++;
      state.answered = true;
      if (btn) btn.classList.add('ok');
      opts.querySelectorAll('button').forEach((b) => { b.disabled = true; });
      const last = state.i === ROUNDS - 1;
      if (msg) msg.innerHTML = `Yes! ${NAME[a].en} (${NAME[a].zh}), with the seal-script character ${GLYPH[it.key]}. ${NAME[a].hint_en}${last ? ` You got ${state.right} of ${ROUNDS} on the first try.` : ''}<span class="zh">答對了！這是${NAME[a].zh}，刻的是小篆的「${GLYPH[it.key]}」。${NAME[a].hint_zh}${last ? `你一次就答對 ${state.right} 題（共 ${ROUNDS} 題）。` : ''}</span>`;
    } else {
      state.firstTry = false;
      if (btn) { btn.classList.add('no'); btn.disabled = true; }
      if (msg) msg.innerHTML = `Not ${NAME[a].zh}. ${NAME[a].hint_en}<span class="zh">不是${NAME[a].zh}。${NAME[a].hint_zh}</span>`;
    }
    showScore();
    return ok;
  }
  function next() {
    if (state.i >= ROUNDS - 1) { state.order = deal(); state.i = 0; state.right = 0; } else state.i++;
    showScore(); round();
  }
  root.querySelectorAll('[data-kind="next"]').forEach((b) => b.addEventListener('click', next));
  root.querySelectorAll('[data-kind="again"]').forEach((b) => b.addEventListener('click', () => { state.order = deal(); state.i = 0; state.right = 0; showScore(); round(); }));
  new ResizeObserver(paint).observe(cv);
  round(); showScore();
  root.__kind = { state, answer, next };
  return root.__kind;
}

// ---------------------------------------------------------------------
// 設計自己的印
// ---------------------------------------------------------------------
export function initDesign(root) {
  const face = root.querySelector('.cg-design-face'), print = root.querySelector('.cg-design-print'), msg = root.querySelector('.cg-design-msg');
  const state = { key: 'ma', style: 'zhu', shape: 'square' };
  function paint() {
    for (const [cv, fn] of [[face, 'face'], [print, 'print']]) {
      const css = cv.clientWidth || 240, dpr = Math.min(window.devicePixelRatio || 1, 2), S = Math.round(css * dpr);
      if (cv.width !== S) { cv.width = S; cv.height = S; }
      const g = cv.getContext('2d');
      if (fn === 'face') drawFace(g, S, state.key, { ...state, bg: '#2b3140' });
      else { g.fillStyle = '#f6f0e1'; g.fillRect(0, 0, S, S); const s = Math.round(S * 0.8), c = document.createElement('canvas'); c.width = s; c.height = s; drawImpression(c.getContext('2d'), s, state.key, state); g.drawImage(c, (S - s) / 2, (S - s) / 2); }
    }
    for (const k of ['key', 'style', 'shape']) root.querySelectorAll(`[data-design-${k}]`).forEach((b) => b.setAttribute('aria-pressed', b.getAttribute(`data-design-${k}`) === state[k] ? 'true' : 'false'));
    if (msg) msg.innerHTML = state.style === 'zhu'
      ? `Red-character seal of ${GLYPH[state.key]} (${GLYPH_EN[state.key]}): carve away everything except the lines.<span class="zh">朱文的「${GLYPH[state.key]}」：把線條以外的地方都刻掉。</span>`
      : `White-character seal of ${GLYPH[state.key]} (${GLYPH_EN[state.key]}): carve only the lines.<span class="zh">白文的「${GLYPH[state.key]}」：只把線條刻掉。</span>`;
  }
  const set = (k, v) => { state[k] = v; paint(); };
  for (const k of ['key', 'style', 'shape']) root.querySelectorAll(`[data-design-${k}]`).forEach((b) => b.addEventListener('click', () => set(k, b.getAttribute(`data-design-${k}`))));
  root.querySelectorAll('[data-design="save"]').forEach((b) => b.addEventListener('click', () => {
    const S = 600, c = document.createElement('canvas'); c.width = S; c.height = S;
    const g = c.getContext('2d'); g.fillStyle = '#f6f0e1'; g.fillRect(0, 0, S, S);
    const s = 480, t = document.createElement('canvas'); t.width = s; t.height = s; drawImpression(t.getContext('2d'), s, state.key, state); g.drawImage(t, 60, 60);
    const a = document.createElement('a'); a.href = c.toDataURL('image/png'); a.download = `my-seal-${state.key}-${state.style}.png`; document.body.appendChild(a); a.click(); a.remove();
  }));
  new ResizeObserver(paint).observe(face);
  paint();
  root.__design = { state, set };
  return root.__design;
}
