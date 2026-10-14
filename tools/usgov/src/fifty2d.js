/*
 * 美國政治 U.S. Government ·「同一件事，五十種答案」（不需要 WebGL）：選一個題目，看五十州＋特區各是多少。
 * 地圖用 map2d.js（州界或依人口大小的方塊），旁邊是圖例、最高與最低、選到的州。
 * 題目與數值在 data/us_government.json 的 fifty.layers（每一項都標了來源與年份），build.py 放進 <script type="application/json">。
 *
 * 除錯：document.querySelector('[data-ug-fifty]').__fifty（state、layer(key)、mode('map'|'tiles')、pick(abbr)、info()）
 */
import { makeMap2D } from './map2d.js';
import { colorAt, formatValue, ranked, ZH } from './usmap.js';

export function initFifty(root) {
  const $ = (s) => root.querySelector(s);
  const data = JSON.parse($('script[type="application/json"]').textContent);
  const L = Object.fromEntries(data.layers.map((l) => [l.key, l]));
  const st = { layer: data.layers[0].key, mode: 'map', sel: data.start || 'NE' };
  const map = makeMap2D($('.ug-ff-map'), { population: data.population, onPick: (ab) => { st.sel = ab; draw(); } });
  const nameOf = (ab) => `${map.states.find((s) => s.abbr === ab).name}<span class="zh">${ZH[ab]}</span>`;

  function draw() {
    const l = L[st.layer];
    const cats = l.categories || null;
    const [lo, hi] = map.setValues(l.values, l.fmt, cats ? (v) => cats.find((c) => c.v === v).color : null);
    map.setMode(st.mode); map.select(st.sel);
    root.querySelectorAll('[data-layer]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.layer === st.layer)));
    root.querySelectorAll('[data-mode]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mode === st.mode)));
    root.querySelectorAll('.ug-ff-note').forEach((p) => { p.hidden = p.dataset.note !== st.layer; });
    const leg = $('.ug-ff-leg');
    if (cats) {
      leg.innerHTML = cats.map((c) => `<span class="ug-ff-cat"><i style="background:${c.color}"></i>${c.en}<span class="zh">${c.zh}</span></span>`).join('');
    } else {
      const grad = [0, 0.25, 0.5, 0.75, 1].map((t) => colorAt(t)).join(',');
      leg.innerHTML = `<span class="ug-ff-ramp" style="background:linear-gradient(90deg,${grad})"></span><span class="ug-ff-ends"><b>${formatValue(lo, l.fmt)}</b><b>${formatValue(hi, l.fmt)}</b></span>`;
    }
    const r = ranked(l.values, !!l.low_first);
    const top = (arr) => arr.map(([ab, v]) => `<li><b>${ab}</b> ${formatValue(v, l.fmt)}</li>`).join('');
    $('.ug-ff-top').innerHTML = cats ? '' : `<div><p>${l.low_first ? 'Lowest · 最低' : 'Highest · 最高'}</p><ol>${top(r.slice(0, 3))}</ol></div><div><p>${l.low_first ? 'Highest · 最高' : 'Lowest · 最低'}</p><ol>${top(r.slice(-3).reverse())}</ol></div>`;
    const v = l.values[st.sel];
    $('.ug-ff-sel').innerHTML = `<span class="ug-ff-sk">Selected · 選到的</span><b class="ug-ff-sn">${nameOf(st.sel)}</b><b class="ug-ff-sv">${cats ? (cats.find((c) => c.v === v) || {}).en || '—' : formatValue(v, l.fmt)}</b>`;
  }
  const api = {
    state: st, map,
    layer(k) { if (L[k]) { st.layer = k; draw(); } },
    mode(m) { st.mode = m; draw(); },
    pick(ab) { st.sel = ab; draw(); },
    info() { const l = L[st.layer]; return { ...st, value: l.values[st.sel], n: Object.keys(l.values).length }; },
  };
  root.querySelectorAll('[data-layer]').forEach((b) => b.addEventListener('click', () => api.layer(b.dataset.layer)));
  root.querySelectorAll('[data-mode]').forEach((b) => b.addEventListener('click', () => api.mode(b.dataset.mode)));
  draw();
  root.__fifty = api;
  return api;
}
