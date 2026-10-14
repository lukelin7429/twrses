/*
 * 世界歷史 第二課 ·「哪裡開始種田？」（不需要 WebGL）。
 *
 *   <div class="wh-centers" data-wh-centers><script type="application/json">{ from, to, centers: [{ key, en, zh, at, r, older, nearer, crops_en, crops_zh, note_en, note_zh, src, url }] }</script>…</div>
 *
 * 一張世界地圖（只有陸地，沒有國界）和一支時間滑桿。每個地區有一段估計的範圍 [older, nearer]（距今幾年）：
 * 滑到 older 之後光暈淡淡地出現（「也許已經開始」），過了 nearer 才變實。光暈沒有邊界線——只表示「大約這一帶」。
 * 點地圖上的編號或下面的按鈕，讀這個地區馴化了什麼、年代與出處。
 * 除錯：root.__centers（state、setAgo(年前)、select(key)、info()）。
 */
import { getLand } from './land.js';
import { makeView, aspect, drawWorld, halo } from './map2d.js';
import { regionState } from './spread.js';
import { formatAgoRange, describe } from './timeline.js';
import { each, esc, bi, readJson } from './common.js';

export function initCenters(root) {
  const data = readJson(root), centers = data.centers;
  const cv = root.querySelector('canvas'), ctx = cv.getContext('2d');
  const slider = root.querySelector('.wh-ce-slider'), whenEl = root.querySelector('.wh-ce-when'), countEl = root.querySelector('.wh-ce-count');
  const list = root.querySelector('.wh-ce-list'), card = root.querySelector('.wh-ce-card');
  const state = { ago: data.from, sel: null };
  const BOX = { south: -58, north: 72 };
  let view = null;
  list.innerHTML = centers.map((c, i) => `<button type="button" data-center="${c.key}" aria-pressed="false"><b>${i + 1}</b><span>${bi(c.en, c.zh)}</span></button>`).join('');

  function draw() {
    const w = cv.clientWidth, h = Math.round(w / aspect(BOX)), dpr = Math.min(2, window.devicePixelRatio || 1);
    if (!w) return;
    if (cv.width !== Math.round(w * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); cv.style.height = `${h}px`; }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    view = makeView(w, h, BOX);
    drawWorld(ctx, view, getLand());
    let n = 0;
    centers.forEach((c, i) => {
      const st = regionState(c, state.ago);
      if (st !== 'not') { n += 1; halo(ctx, view, c.at, c.r || 9, st === 'yes' ? '#e89a1c' : '#f1c56b', st === 'yes' ? 0.78 : 0.42); }
      const x = view.x(c.at[0]), y = view.y(c.at[1]), on = state.sel === c.key, r = on ? 12 : 9.5;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = st === 'not' ? '#ffffff' : st === 'yes' ? '#0e6b5c' : '#c4861a'; ctx.fill();
      ctx.lineWidth = on ? 3 : 1.5; ctx.strokeStyle = on ? '#1b1405' : st === 'not' ? '#8fa0a8' : '#ffffff'; ctx.stroke();
      ctx.fillStyle = st === 'not' ? '#5b6b73' : '#ffffff'; ctx.font = `800 ${on ? 13 : 11}px system-ui, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(String(i + 1), x, y + 0.5);
    });
    const d = describe(state.ago);
    whenEl.innerHTML = bi(d.en.replace(/^about /, 'About '), d.zh);
    countEl.textContent = `${n} / ${centers.length}`;
    slider.setAttribute('aria-valuetext', `${d.en} · ${d.zh}`);
    list.querySelectorAll('[data-center]').forEach((b) => {
      const c = centers.find((x) => x.key === b.dataset.center);
      b.dataset.state = regionState(c, state.ago); b.setAttribute('aria-pressed', state.sel === c.key);
    });
  }
  function select(key) {
    state.sel = state.sel === key ? null : key;
    const c = centers.find((x) => x.key === state.sel);
    if (!c) card.innerHTML = card.dataset.idle;
    else {
      const r = formatAgoRange(c.older, c.nearer);
      if (state.ago > c.older) setAgo(c.older, true);
      card.innerHTML = `<h3>${bi(c.en, c.zh)}</h3><dl>`
        + `<div><dt>${bi('First farmed here', '這裡最早栽培、畜養的')}</dt><dd>${bi(c.crops_en, c.crops_zh)}</dd></div>`
        + `<div><dt>${bi('Roughly when', '大約什麼時候')}</dt><dd>${bi(c.when_en || r.en, c.when_zh || r.zh)}</dd></div></dl>`
        + (c.note_en ? `<p class="wh-ce-note">${bi(c.note_en, c.note_zh)}</p>` : '')
        + (c.url ? `<a class="wh-ce-src" href="${esc(c.url)}" target="_blank" rel="noopener">${esc(c.src)} &#8599;</a>` : c.src ? `<p class="wh-ce-src">${esc(c.src)}</p>` : '');
    }
    draw();
  }
  function setAgo(ago, quiet) {
    state.ago = Math.min(data.from, Math.max(data.to, ago));
    slider.value = Math.round((data.from - state.ago) / (data.from - data.to) * 1000);
    if (!quiet) draw();
  }
  card.dataset.idle = card.innerHTML;
  slider.addEventListener('input', () => { state.ago = data.from - slider.value / 1000 * (data.from - data.to); draw(); });
  list.addEventListener('click', (ev) => { const b = ev.target.closest('[data-center]'); if (b) select(b.dataset.center); });
  cv.addEventListener('click', (ev) => {
    if (!view) return;
    const r = cv.getBoundingClientRect(), px = ev.clientX - r.left, py = ev.clientY - r.top;
    let best = null, bd = 22;
    for (const c of centers) { const d = Math.hypot(view.x(c.at[0]) - px, view.y(c.at[1]) - py); if (d < bd) { bd = d; best = c; } }
    if (best) select(best.key);
  });
  root.querySelectorAll('[data-ce-jump]').forEach((b) => b.addEventListener('click', () => setAgo(Number(b.dataset.ceJump))));
  new ResizeObserver(draw).observe(cv);
  setAgo(data.start || data.from);
  root.__centers = { state, setAgo, select, info: () => ({ ago: state.ago, sel: state.sel, lit: centers.filter((c) => regionState(c, state.ago) !== 'not').map((c) => c.key) }) };
  return root.__centers;
}
each('[data-wh-centers]', initCenters);
