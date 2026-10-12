/*
 * 家政 Life Skills at Home · 「放大縮小」（不需要 WebGL）：把食譜改成幾人份，看分數怎麼變。
 * build.py 的 _hm_scale() 畫出每一列（原本的份量），這裡依 data-serves 的按鈕重算。
 * 除錯：document.querySelector('[data-hm-scale]').__scale → { set(人數), values() }
 */
import { fnum, formatMixed } from './units.js';
import { scaleItem, servingFactor, unitZh } from './recipe.js';

export function initScale(root) {
  const recipe = JSON.parse(root.getAttribute('data-recipe'));
  const rows = Array.from(root.querySelectorAll('.hm-sc-row'));
  const sum = root.querySelector('.hm-sc-sum');
  let serves = recipe.serves;
  function set(n) {
    serves = Number(n);
    const f = servingFactor(serves, recipe.serves), k = fnum(f);
    root.querySelectorAll('[data-serves]').forEach((b) => b.setAttribute('aria-pressed', String(Number(b.getAttribute('data-serves')) === serves)));
    rows.forEach((row) => {
      const it = recipe.items[Number(row.getAttribute('data-i'))];
      const r = scaleItem(it, f);
      row.querySelector('.hm-sc-out').innerHTML = `<b>${r.text}</b><span class="zh">${r.zh}</span>`;
      const how = row.querySelector('.hm-sc-how');
      if (r.pinch) how.innerHTML = k === 1 ? '' : 'A pinch has no exact size, so just use a little less or a little more.<span class="zh">一小撮沒有固定的大小，少一點或多一點就可以。</span>';
      else if (k === 1) how.innerHTML = '';
      else {
        const eq = `${it.amount} × ${formatMixed(f)} = ${r.exact}`;
        const eqZh = `${it.amount} × ${formatMixed(f)} = ${formatMixed(r.amount)} ${unitZh(it.unit)}`;
        how.innerHTML = r.changedUnit
          ? `${eq}, which is easier to measure as ${r.text}<span class="zh">${eqZh}，改用 ${r.zh} 比較好量</span>`
          : `${eq}<span class="zh">${eqZh}</span>`;
      }
      row.classList.toggle('is-changed', k !== 1);
      row.classList.toggle('is-unit', !!r.changedUnit);
    });
    const made = recipe.yield * k;
    if (sum) {
      sum.innerHTML = k === 1
        ? `This is the recipe as written: ${recipe.serves} servings, about ${recipe.yield} ${recipe.yield_en}.<span class="zh">這是食譜原本的份量：${recipe.serves} 人份，大約 ${recipe.yield} ${recipe.yield_zh}。</span>`
        : `${serves} servings = ${formatMixed(f)} × the recipe: about ${made} ${recipe.yield_en}. Every amount is multiplied by ${formatMixed(f)}; the oven stays at ${recipe.oven_f}°F.<span class="zh">${serves} 人份 = 食譜的 ${formatMixed(f)} 倍：大約 ${made} ${recipe.yield_zh}。每一項都乘以 ${formatMixed(f)}；烤箱的溫度不變，還是華氏 ${recipe.oven_f} 度。</span>`;
    }
  }
  root.querySelectorAll('[data-serves]').forEach((b) => b.addEventListener('click', () => set(b.getAttribute('data-serves'))));
  set(serves);
  root.classList.add('is-ready');
  root.__scale = { set, values: () => rows.map((row) => row.querySelector('.hm-sc-out b').textContent), serves: () => serves };
}
