/*
 * 家政 Life Skills at Home · 「幫食譜換單位」（不需要 WebGL）。
 * build.py 的 _hm_convert() 把食譜畫成一列一列（美制的寫法），這裡負責按下去之後算出公制並寫出算式。
 * 除錯：document.querySelector('[data-hm-convert]').__convert → { all(), reset(), values() }
 */
import { formatAmount, parseAmount } from './units.js';
import { ovenMetric, toMetric } from './recipe.js';

export function initConvert(root) {
  const recipe = JSON.parse(root.getAttribute('data-recipe'));
  const rows = Array.from(root.querySelectorAll('.hm-cv-row'));
  const msg = root.querySelector('.hm-cv-msg');
  const done = new Set();
  const calc = (row) => {
    const i = row.getAttribute('data-i');
    if (i === 'oven') return ovenMetric(recipe.oven_f);
    return toMetric(recipe.items[Number(i)]);
  };
  function show(row) {
    const m = calc(row), out = row.querySelector('.hm-cv-m'), how = row.querySelector('.hm-cv-how');
    if (!m) {
      out.innerHTML = 'a pinch<span class="zh">一小撮</span>';
      how.innerHTML = 'No number to change: a pinch is what fits between your thumb and one finger.<span class="zh">沒有數字可以換：一小撮就是拇指和一根手指捏得起來的量。</span>';
    } else {
      out.innerHTML = `about <b>${m.text}</b>`;
      how.innerHTML = `${m.how_en}<span class="zh">${m.how_zh}</span>`;
    }
    row.classList.add('is-done'); done.add(row);
    const b = row.querySelector('.hm-cv-go'); if (b) b.disabled = true;
    tell();
  }
  function tell() {
    const n = done.size, all = rows.length;
    if (!msg) return;
    if (!n) msg.innerHTML = 'Guess first, then press a row to check.<span class="zh">先猜猜看，再按那一列對答案。</span>';
    else if (n < all) msg.innerHTML = `${n} of ${all} changed. Notice which ones turn into grams and which into milliliters.<span class="zh">已經換了 ${n} 項（共 ${all} 項）。注意哪些換成公克、哪些換成毫升。</span>`;
    else msg.innerHTML = 'All done. Dry things went to grams, each with its own number per cup; liquids and small spoons went to milliliters.<span class="zh">全部換好了。乾的材料換成公克，每一種「一杯幾公克」都不一樣；液體和小匙換成毫升。</span>';
  }
  function reset() {
    done.clear();
    rows.forEach((row) => {
      row.classList.remove('is-done');
      row.querySelector('.hm-cv-m').innerHTML = '?';
      row.querySelector('.hm-cv-how').innerHTML = '';
      const b = row.querySelector('.hm-cv-go'); if (b) b.disabled = false;
    });
    tell();
  }
  rows.forEach((row) => { const b = row.querySelector('.hm-cv-go'); if (b) b.addEventListener('click', () => show(row)); });
  const all = root.querySelector('.hm-cv-all'), rs = root.querySelector('.hm-cv-reset');
  if (all) all.addEventListener('click', () => rows.forEach(show));
  if (rs) rs.addEventListener('click', reset);
  reset();
  root.classList.add('is-ready');
  root.__convert = {
    all: () => rows.forEach(show), reset,
    values: () => rows.map((row) => { const m = calc(row); return m ? m.text : 'a pinch'; }),
    us: () => recipe.items.map((it) => (it.pinch ? 'a pinch' : formatAmount(parseAmount(it.amount), it.unit))),
  };
}
