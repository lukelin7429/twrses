/*
 * 地理 Geography ·「誰最大？」（不需要 WebGL）：大洲、大洋的面積長條圖（數字是頁面引用的，見 data/geography.json 的 bars），
 * 點一條就換算成「大約幾個台灣」。長條的 HTML 由 build.py 畫好；這裡只負責切換與換算。
 * 除錯：document.querySelector('[data-gg-bars]').__bars（state、set('continents'|'oceans')、pick(key)）
 */
export const asTaiwans = (km2, tw) => km2 / tw;
export function fmtTaiwans(n) { return n >= 100 ? Math.round(n / 10) * 10 : Math.round(n); }

export function initBars(root) {
  const $ = (s) => root.querySelector(s);
  const data = JSON.parse($('script[type="application/json"]').textContent);
  const state = { set: 'continents', key: null };
  const out = $('.gg-br-out');
  function draw() {
    root.querySelectorAll('[data-bset]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.bset === state.set)));
    root.querySelectorAll('[data-bpanel]').forEach((p) => { p.hidden = p.dataset.bpanel !== state.set; });
    root.querySelectorAll('[data-bar]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.bar === state.key)));
    const it = state.key && data.items[state.key];
    if (!it) { out.innerHTML = `${data.hint_en}<span class="zh">${data.hint_zh}</span>`; return; }
    const n = fmtTaiwans(asTaiwans(it.km2, data.taiwan));
    out.innerHTML = `<b>${it.en}</b>: about <b>${n.toLocaleString('en-US')}</b> Taiwans would fit in it.<span class="zh">${it.zh}大約放得下 <b>${n.toLocaleString('en-US')}</b> 個台灣。</span>`;
  }
  const api = { state, set(k) { state.set = k; state.key = null; draw(); }, pick(k) { state.key = k; draw(); return fmtTaiwans(asTaiwans(data.items[k].km2, data.taiwan)); } };
  root.querySelectorAll('[data-bset]').forEach((b) => b.addEventListener('click', () => api.set(b.dataset.bset)));
  root.querySelectorAll('[data-bar]').forEach((b) => b.addEventListener('click', () => api.pick(b.dataset.bar)));
  draw();
  root.__bars = api;
  return api;
}
