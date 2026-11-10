/*
 * 地理 Geography ·「一百個台灣人住在哪裡？」（不需要 WebGL）：把台灣本島的人換算成 100 個小人，依海拔帶或依地形排出來。
 * 人數由人口格網算（twpop.js 的 bandStats／formStats；GHS-POP 2025 推估），地形分類用第九課的 landform()。
 * 每一組同時顯示「占幾成的土地」：人和土地的比例差很多，就是這一課的重點。
 * 換成 100 人用最大餘數法（twpop.js 的 toHundred，和第八課 hundred2d.js 的一樣；不直接 import，免得把全世界的人口資料也打包進來）。版面共用第八課的 gg-hd- 樣式。
 * 除錯：document.querySelector('[data-gg-twhundred]').__hundred（state、set('bands'|'forms')、pick(key)、groups()）
 */
import { getTaiwan } from './taiwan.js';
import { BANDS, bandStats, formStats, getTwPop, toHundred } from './twpop.js';

export const FORM_GROUPS = [
  { key: 'plain', en: 'Plains', zh: '平原', color: '#7fd18b' },
  { key: 'basin', en: 'Basins', zh: '盆地', color: '#ffb86b' },
  { key: 'tableland', en: 'Tablelands', zh: '台地', color: '#e7a3d8' },
  { key: 'valley', en: 'The long valley in the east', zh: '東部的縱谷', color: '#7fc8ff' },
  { key: 'other', en: 'Hills and lower slopes', zh: '丘陵與山坡', color: '#e0c36a' },
  { key: 'mountain', en: 'High mountains (1,000 m and up)', zh: '高山（1,000 公尺以上）', color: '#b59cff' },
];
const PERSON = '<svg viewBox="0 0 12 20" aria-hidden="true"><circle cx="6" cy="3.6" r="3.2"/><path d="M1.2 19.5V11a4.8 4.8 0 0 1 9.6 0v8.5z"/></svg>';
const pct = (x) => (x < 0.005 ? '<1' : String(Math.round(x * 100)));

export function hundredGroups(set, T = getTaiwan(), P = getTwPop()) {
  const defs = set === 'bands' ? BANDS : FORM_GROUPS, st = set === 'bands' ? bandStats(T, P) : formStats(T, P);
  const n = toHundred(defs.map((d) => st[d.key].people));
  return defs.map((d, i) => ({ ...d, ...st[d.key], n: n[i] }));
}

export function initTwHundred(root) {
  const $ = (s) => root.querySelector(s);
  const data = JSON.parse($('script[type="application/json"]').textContent);
  const state = { set: 'bands', key: null };
  const cache = {};
  const groups = () => cache[state.set] || (cache[state.set] = hundredGroups(state.set));
  function draw() {
    const g = groups();
    root.querySelectorAll('[data-hset]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.hset === state.set)));
    let html = '';
    for (const x of g) for (let i = 0; i < x.n; i++) html += `<i data-g="${x.key}" style="--c:${x.color}" class="${state.key && state.key !== x.key ? 'is-dim' : ''}">${PERSON}</i>`;
    $('.gg-hd-people').innerHTML = html;
    $('.gg-hd-keys').innerHTML = g.map((x) => `<button type="button" data-hkey="${x.key}" aria-pressed="${state.key === x.key}" style="--c:${x.color}"><b>${x.n || '<1'}</b><span>${x.en}<span class="zh">${x.zh}</span></span></button>`).join('');
    root.querySelectorAll('[data-hkey]').forEach((b) => b.addEventListener('click', () => api.pick(b.dataset.hkey)));
    const it = state.key && g.find((x) => x.key === state.key), out = $('.gg-hd-out');
    const src = `<small>${data.src_en}<span class="zh">${data.src_zh}</span></small>`;
    if (!it) { out.innerHTML = `${data.hint_en}<span class="zh">${data.hint_zh}</span> ${src}`; return; }
    const who = it.n ? `<b>${it.n}</b> of the 100` : 'Fewer than 1 of the 100';
    const whoZh = it.n ? `一百個人裡有 <b>${it.n}</b> 個` : '一百個人裡不到 1 個';
    out.innerHTML = `${who} live in <b>${it.en.toLowerCase().startsWith('the') ? it.en.replace(/^The/, 'the') : it.en.toLowerCase()}</b>, which is <b>${pct(it.aShare)}</b> of every 100 km² of land.<span class="zh">${whoZh}住在<b>${it.zh}</b>，這裡占每 100 平方公里土地的 <b>${pct(it.aShare)}</b> 平方公里。</span> ${src}`;
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
