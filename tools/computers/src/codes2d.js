/*
 * 電腦概論 · 第二課不需要 WebGL 的小互動（HTML 由 build.py 產生，這裡只綁行為）。
 *
 *   initChars(el)   [data-cp-chars]  打幾個字，看每個字在對照表裡的編號（Unicode 碼位）和存成 UTF-8 的位元組
 *   initDraw(el)    [data-cp-draw]   8 × 8 黑白像素畫：每格一個位元，每列一個位元組
 *   initSound(el)   [data-cp-sound]  聲音取樣：一個週期量幾次、每次用幾個位元記（示意）
 */
import { ART, bytesToRows, charInfo, rowsToBytes, sampleWave, wave } from './codes.js';

const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; };
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const byteBits = (b) => b.toString(2).padStart(8, '0');

export function initChars(root) {
  const input = root.querySelector('.cp-ch-input'), list = root.querySelector('.cp-ch-list'), msg = root.querySelector('.cp-ch-msg');
  function show() {
    const info = charInfo(input.value, 8);
    list.innerHTML = '';
    let bytes = 0;
    for (const c of info) {
      bytes += c.utf8.length;
      const shown = c.ch === ' ' ? '<i>space · 空格</i>' : esc(c.ch);
      list.appendChild(el('div', 'cp-ch-card',
        `<span class="cp-ch-g">${shown}</span>`
        + `<dl><div><dt>Number in the table · 表上的編號</dt><dd>${c.code.toLocaleString('en-US')} <small>${c.hex}</small></dd></div>`
        + `<div><dt>Stored as ${c.utf8.length} byte${c.utf8.length > 1 ? 's' : ''} (UTF-8) · 存成 ${c.utf8.length} 個位元組</dt><dd class="cp-ch-b">${c.utf8.map(byteBits).join(' ')}</dd></div></dl>`));
    }
    msg.innerHTML = info.length
      ? `${info.length} character${info.length > 1 ? 's' : ''}, ${bytes} byte${bytes > 1 ? 's' : ''}, ${bytes * 8} bits.<span class="zh">${info.length} 個字，${bytes} 個位元組，${bytes * 8} 個位元。</span>`
      : 'Type something above.<span class="zh">在上面打幾個字。</span>';
  }
  input.addEventListener('input', show);
  root.querySelectorAll('[data-text]').forEach((b) => b.addEventListener('click', () => { input.value = b.getAttribute('data-text'); show(); }));
  show();
  root.__chars = { set: (s) => { input.value = s; show(); } };
}

export function initDraw(root) {
  const gridEl = root.querySelector('.cp-dr-grid'), rowsEl = root.querySelector('.cp-dr-rows'), msg = root.querySelector('.cp-dr-msg');
  let grid = bytesToRows(ART.heart);
  const cells = [];
  let paint = null;
  for (let i = 0; i < 64; i++) {
    const b = el('button', 'cp-dr-c'); b.type = 'button';
    b.setAttribute('aria-label', `Row ${Math.floor(i / 8) + 1}, column ${(i % 8) + 1} · 第 ${Math.floor(i / 8) + 1} 列第 ${(i % 8) + 1} 格`);
    b.addEventListener('pointerdown', (e) => { e.preventDefault(); paint = grid[i] ? 0 : 1; grid[i] = paint; show(); if (b.releasePointerCapture && e.pointerId !== undefined) { try { b.releasePointerCapture(e.pointerId); } catch (err) { /* 沒有 capture */ } } });
    b.addEventListener('pointerenter', () => { if (paint !== null && grid[i] !== paint) { grid[i] = paint; show(); } });
    b.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); grid[i] = grid[i] ? 0 : 1; show(); } });
    gridEl.appendChild(b); cells.push(b);
  }
  window.addEventListener('pointerup', () => { paint = null; });
  gridEl.addEventListener('touchmove', (e) => {
    if (paint === null) return;
    e.preventDefault();
    const t = e.touches[0], hit = document.elementFromPoint(t.clientX, t.clientY), k = cells.indexOf(hit);
    if (k >= 0 && grid[k] !== paint) { grid[k] = paint; show(); }
  }, { passive: false });
  function show() {
    cells.forEach((c, i) => { c.classList.toggle('is-on', !!grid[i]); c.setAttribute('aria-pressed', grid[i] ? 'true' : 'false'); });
    const bytes = rowsToBytes(grid);
    rowsEl.innerHTML = bytes.map((b) => `<li><code>${byteBits(b)}</code><b>${b}</b></li>`).join('');
    const on = grid.reduce((s, v) => s + v, 0);
    msg.innerHTML = `64 squares = 64 bits = 8 bytes. ${on} of them are 1. The whole picture is just these eight numbers: ${bytes.join(', ')}.`
      + `<span class="zh">64 格＝64 個位元＝8 個位元組，其中 ${on} 個是 1。整張圖就只是這八個數：${bytes.join('、')}。</span>`;
  }
  root.querySelectorAll('[data-art]').forEach((b) => b.addEventListener('click', () => { grid = bytesToRows(ART[b.getAttribute('data-art')]); show(); }));
  root.querySelector('.cp-dr-clear').addEventListener('click', () => { grid = grid.map(() => 0); show(); });
  root.querySelector('.cp-dr-inv').addEventListener('click', () => { grid = grid.map((v) => (v ? 0 : 1)); show(); });
  show();
  root.__draw = { set: (bytes) => { grid = bytesToRows(bytes); show(); }, bytes: () => rowsToBytes(grid) };
}

export function initSound(root) {
  const svg = root.querySelector('.cp-sd-svg'), nIn = root.querySelector('.cp-sd-n'), nOut = root.querySelector('.cp-sd-nout'), msg = root.querySelector('.cp-sd-msg'), nums = root.querySelector('.cp-sd-nums');
  const W = 640, H = 240, PX = 16, PY = 18;
  const X = (t) => PX + t * (W - PX * 2), Y = (v) => H - PY - v * (H - PY * 2);
  let bits = 3;
  let smooth = '';
  for (let k = 0; k <= 200; k++) smooth += `${k ? 'L' : 'M'}${X(k / 200).toFixed(1)} ${Y(wave(k / 200)).toFixed(1)}`;
  function show() {
    const n = Number(nIn.value), r = sampleWave(n, bits);
    nOut.textContent = String(n);
    const w = (W - PX * 2) / n;
    let grid = '';
    if (r.levels <= 16) for (let k = 1; k < r.levels; k++) grid += `<line class="cp-sd-lv" x1="${PX}" x2="${W - PX}" y1="${Y(k / r.levels).toFixed(1)}" y2="${Y(k / r.levels).toFixed(1)}"/>`;
    let steps = '', dots = '';
    r.samples.forEach((p, k) => {
      const x0 = PX + k * w;
      steps += `<rect class="cp-sd-bar" x="${x0.toFixed(1)}" y="${Y(p.q).toFixed(1)}" width="${Math.max(1, w - 1).toFixed(1)}" height="${(H - PY - Y(p.q)).toFixed(1)}"/>`;
      dots += `<circle class="cp-sd-dot" cx="${X(p.t).toFixed(1)}" cy="${Y(p.q).toFixed(1)}" r="${n > 40 ? 2 : 3.5}"/>`;
    });
    svg.innerHTML = `<rect class="cp-sd-bg" x="0" y="0" width="${W}" height="${H}" rx="12"/>${grid}${steps}<path class="cp-sd-wave" d="${smooth}"/>${dots}`;
    const shown = r.samples.slice(0, 16).map((p) => p.level).join(', ');
    nums.textContent = shown + (n > 16 ? ', …' : '');
    msg.innerHTML = `${n} measurements × ${bits} bit${bits > 1 ? 's' : ''} each = ${r.totalBits} bits for this one wave. Each measurement can be one of ${r.levels.toLocaleString('en-US')} heights.`
      + `<span class="zh">量 ${n} 次 × 每次 ${bits} 個位元＝這一個波用了 ${r.totalBits} 個位元。每一次可以記成 ${r.levels.toLocaleString('en-US')} 種高度之一。</span>`;
  }
  nIn.addEventListener('input', show);
  root.querySelectorAll('[data-sbits]').forEach((b) => b.addEventListener('click', () => {
    bits = Number(b.getAttribute('data-sbits'));
    root.querySelectorAll('[data-sbits]').forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
    show();
  }));
  show();
  root.__sound = { set: (n, b) => { nIn.value = String(n); bits = b; root.querySelectorAll('[data-sbits]').forEach((x) => x.setAttribute('aria-pressed', Number(x.getAttribute('data-sbits')) === b ? 'true' : 'false')); show(); } };
}
