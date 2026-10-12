/*
 * 家政 Life Skills at Home · 「誰的一杯？」（不需要 WebGL）：把別的「一杯」倒進美制的量杯，看到哪裡。
 * build.py 的 _hm_cups() 畫出一個美制量杯的 SVG（.hm-cq-fill 是裡面的水），資料在 data-cups。
 * 除錯：document.querySelector('[data-hm-cups]').__cups → { set(key), ml() }
 */
import { ML } from './units.js';

export function initCups(root) {
  const cups = JSON.parse(root.getAttribute('data-cups'));
  const fill = root.querySelector('.hm-cq-fill'), over = root.querySelector('.hm-cq-over');
  const out = root.querySelector('.hm-cq-out'), big = root.querySelector('.hm-cq-ml');
  const Y0 = Number(fill.getAttribute('data-y0')), PX = Number(fill.getAttribute('data-px'));   // 杯底的 y、每毫升幾個像素
  let cur = null;
  function set(key) {
    const c = cups.find((x) => x.key === key); if (!c) return;
    cur = c;
    root.querySelectorAll('[data-cup]').forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute('data-cup') === key)));
    const inCup = Math.min(c.ml, ML.cup), spill = Math.max(0, c.ml - ML.cup);
    fill.setAttribute('y', (Y0 - inCup * PX).toFixed(1)); fill.setAttribute('height', (inCup * PX).toFixed(1));
    over.setAttribute('y', (Y0 - (inCup + spill) * PX).toFixed(1)); over.setAttribute('height', (spill * PX).toFixed(1));
    big.innerHTML = `${c.approx ? '<i>about</i> ' : ''}${c.ml} <small>mL</small>`;
    const ratio = c.ml / ML.cup, d = c.ml - ML.cup;
    const cmp = Math.abs(d) < 0.5
      ? ['It fills the US cup exactly to the 1-cup line.', '剛好倒到美制量杯的 1 杯刻度。']
      : d > 0
        ? [`It goes ${d.toFixed(1)} mL over the 1-cup line, ${Math.round((ratio - 1) * 100) || 'less than 1'}% more.`, `比 1 杯的刻度多出 ${d.toFixed(1)} 毫升，多了${Math.round((ratio - 1) * 100) ? `大約 ${Math.round((ratio - 1) * 100)}%` : '不到 1%'}。`]
        : [`It stops ${(-d).toFixed(1)} mL below the 1-cup line: only ${Math.round(ratio * 100)}% of a US cup.`, `離 1 杯的刻度還差 ${(-d).toFixed(1)} 毫升：只有美制一杯的 ${Math.round(ratio * 100)}%。`];
    out.innerHTML = `<b>${c.en}</b> ${cmp[0]} ${c.note_en}<span class="zh"><b>${c.zh}</b>　${cmp[1]}${c.note_zh}</span>`;
  }
  root.querySelectorAll('[data-cup]').forEach((b) => b.addEventListener('click', () => set(b.getAttribute('data-cup'))));
  set(cups[0].key);
  root.classList.add('is-ready');
  root.__cups = { set, ml: () => cur.ml, ratio: () => cur.ml / ML.cup };
}
