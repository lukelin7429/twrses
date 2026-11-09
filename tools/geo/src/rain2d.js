/*
 * 地理 Geography ·「每個月下多少雨？」（不需要 WebGL）：中央氣象署 1991～2020 年的月平均降水量（數字在 data/geography.json 的
 * rainbars.stations，頁面引用），畫成十二根長條；5 到 10 月的長條用深色，算出這半年占全年的幾成、最多和最少的月份。
 * 除錯：document.querySelector('[data-gg-rainbars]').__rain（state、pick(key)、stats(key)）
 */
export const MONTHS = [['Jan', '1月'], ['Feb', '2月'], ['Mar', '3月'], ['Apr', '4月'], ['May', '5月'], ['Jun', '6月'], ['Jul', '7月'], ['Aug', '8月'], ['Sep', '9月'], ['Oct', '10月'], ['Nov', '11月'], ['Dec', '12月']];

/** 全年、5–10 月的比例、最多與最少的月份 */
export function rainStats(mm) {
  const year = mm.reduce((a, b) => a + b, 0), wet = mm.slice(4, 10).reduce((a, b) => a + b, 0);
  const max = mm.indexOf(Math.max(...mm)), min = mm.indexOf(Math.min(...mm));
  return { year, wet, wetShare: wet / year, max, min, ratio: mm[max] / mm[min] };
}

export function initRainBars(root) {
  const $ = (s) => root.querySelector(s);
  const data = JSON.parse($('script[type="application/json"]').textContent);
  const st = data.stations, state = { key: data.start || st[0].key };
  const top = Math.max(...st.flatMap((s) => s.mm));
  function draw() {
    const s = st.find((x) => x.key === state.key), k = rainStats(s.mm), r = (x) => Math.round(x).toLocaleString('en-US');
    root.querySelectorAll('[data-stn]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.stn === state.key)));
    $('.gg-rb-bars').innerHTML = s.mm.map((v, i) => `<div class="gg-rb-col${i >= 4 && i <= 9 ? ' is-wet' : ''}${i === k.max ? ' is-max' : ''}${i === k.min ? ' is-min' : ''}">
      <span class="gg-rb-v">${r(v)}</span><i style="height:${(v / top * 100).toFixed(1)}%"></i><span class="gg-rb-m">${MONTHS[i][0]}<span class="zh">${MONTHS[i][1]}</span></span></div>`).join('');
    $('.gg-rb-out').innerHTML = `<span class="gg-tw-k">Whole year<span class="zh">全年</span><b>${r(k.year)} mm</b></span>
      <span class="gg-tw-k">May to October<span class="zh">5 到 10 月</span><b>${Math.round(k.wetShare * 100)}%</b></span>
      <span class="gg-tw-k">Wettest ÷ driest month<span class="zh">最多月 ÷ 最少月</span><b>× ${k.ratio.toFixed(k.ratio < 10 ? 1 : 0)}</b></span>
      <span class="gg-tw-note">${s.note_en}<span class="zh">${s.note_zh}</span></span>`;
    return k;
  }
  const api = { state, stats: (key) => rainStats(st.find((x) => x.key === key).mm), pick(key) { state.key = key; return draw(); } };
  root.querySelectorAll('[data-stn]').forEach((b) => b.addEventListener('click', () => api.pick(b.dataset.stn)));
  draw();
  root.__rain = api;
  return api;
}
