/*
 * 地理 Geography ·「如果世界只有一百個人」（不需要 WebGL）：把世界人口換算成 100 個小人，依地區或依緯度帶排出來。
 *   地區：聯合國《World Population Prospects 2024》的六個地區（數字在 data/geography.json 的 hundred.regions，頁面引用）。
 *   緯度帶：頁面自己用人口格網（pop.js 的 latBands）算。
 * 換成 100 人用最大餘數法（加起來剛好 100）。點一組就顯示那一組是幾個人、實際大約多少人。
 * 除錯：document.querySelector('[data-gg-hundred]').__hundred（state、set('regions'|'bands')、pick(key)、groups()）
 */
import { getPop, latBands } from './pop.js';

export function toHundred(values) {
  const sum = values.reduce((a, b) => a + b, 0);
  const raw = values.map((v) => (v / sum) * 100), n = raw.map(Math.floor);
  let left = 100 - n.reduce((a, b) => a + b, 0);
  raw.map((r, i) => [r - n[i], i]).sort((a, b) => b[0] - a[0]).forEach(([, i]) => { if (left > 0) { n[i]++; left--; } });
  return n;
}
export const BANDS = [
  { key: 'n60', from: 60, to: 90, en: 'North of 60° N', zh: '北緯 60 度以北', color: '#a9d4ff' },
  { key: 'n40', from: 40, to: 60, en: '40° N to 60° N', zh: '北緯 40～60 度', color: '#7fc8a9' },
  { key: 'n20', from: 20, to: 40, en: '20° N to 40° N', zh: '北緯 20～40 度', color: '#ffb86b' },
  { key: 'n0', from: 0, to: 20, en: '0° to 20° N', zh: '赤道～北緯 20 度', color: '#ff8c69' },
  { key: 's20', from: -20, to: 0, en: '0° to 20° S', zh: '赤道～南緯 20 度', color: '#e7a3d8' },
  { key: 's90', from: -90, to: -20, en: 'South of 20° S', zh: '南緯 20 度以南', color: '#b9a6ff' },
];
const PERSON = '<svg viewBox="0 0 12 20" aria-hidden="true"><circle cx="6" cy="3.6" r="3.2"/><path d="M1.2 19.5V11a4.8 4.8 0 0 1 9.6 0v8.5z"/></svg>';

export function initHundred(root) {
  const $ = (s) => root.querySelector(s);
  const data = JSON.parse($('script[type="application/json"]').textContent);
  const state = { set: 'regions', key: null };
  let bandCache = null;
  function groups() {
    if (state.set === 'regions') {
      const g = data.regions, n = toHundred(g.map((x) => x.people));
      return g.map((x, i) => ({ ...x, n: n[i] }));
    }
    if (!bandCache) {
      const pop = getPop(), edges = [-90, -20, 0, 20, 40, 60, 90], v = latBands(pop, edges);
      const by = { s90: v[0], s20: v[1], n0: v[2], n20: v[3], n40: v[4], n60: v[5] };
      const n = toHundred(BANDS.map((b) => by[b.key]));
      bandCache = BANDS.map((b, i) => ({ ...b, people: by[b.key], n: n[i] }));
    }
    return bandCache;
  }
  function draw() {
    const g = groups();
    root.querySelectorAll('[data-hset]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.hset === state.set)));
    let html = '';
    for (const x of g) for (let i = 0; i < x.n; i++) html += `<i data-g="${x.key}" style="--c:${x.color}" class="${state.key && state.key !== x.key ? 'is-dim' : ''}">${PERSON}</i>`;
    $('.gg-hd-people').innerHTML = html;
    $('.gg-hd-keys').innerHTML = g.map((x) => `<button type="button" data-hkey="${x.key}" aria-pressed="${state.key === x.key}" style="--c:${x.color}"><b>${x.n || "<1"}</b><span>${x.en}<span class="zh">${x.zh}</span></span></button>`).join('');
    root.querySelectorAll('[data-hkey]').forEach((b) => b.addEventListener('click', () => api.pick(b.dataset.hkey)));
    const it = state.key && g.find((x) => x.key === state.key), src = state.set === 'regions' ? data.src_regions : data.src_bands;
    const out = $('.gg-hd-out');
    if (!it) out.innerHTML = `${data.hint_en}<span class="zh">${data.hint_zh}</span> <small>${src.en}<span class="zh">${src.zh}</span></small>`;
    else {
      const bil = it.people / 1e9;
      out.innerHTML = `<b>${it.n}</b> of the 100 live in ${state.set === 'regions' ? '' : 'the band '}<b>${it.en}</b>: about ${bil >= 1 ? `${bil.toFixed(2)} billion` : `${Math.round(it.people / 1e6)} million`} people.<span class="zh">一百個人裡有 <b>${it.n}</b> 個住在${it.zh}：大約 ${(it.people / 1e8).toFixed(1)} 億人。</span> <small>${src.en}<span class="zh">${src.zh}</span></small>`;
    }
  }
  const api = {
    state, groups,
    set(k) { state.set = k; state.key = null; draw(); },
    pick(k) { state.key = state.key === k ? null : k; draw(); return groups().find((x) => x.key === k); },
  };
  root.querySelectorAll('[data-hset]').forEach((b) => b.addEventListener('click', () => api.set(b.dataset.hset)));
  draw();
  root.__hundred = api;
  return api;
}
