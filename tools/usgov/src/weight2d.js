/*
 * 美國政治 U.S. Government · 「一票的分量」（第五課；不需要 WebGL）。
 * 選兩州，並排比較：2020 年普查的居民人數、眾議院席次、每位眾議員代表多少人、每位參議員代表多少人，
 * 以及兩州相差幾倍。數字由 build.py 從 data/us_government.json 的 lab.states 放進 <script type="application/json">。
 *
 * 除錯：document.querySelector('[data-ug-weight]').__weight（set(a, b)、info()）
 */
import { perSeat, ratio } from './seats.js';

const nf = (v) => v.toLocaleString('en-US');

export function initWeight(root) {
  const $ = (s) => root.querySelector(s);
  const data = JSON.parse($('script[type="application/json"]').textContent);
  const by = Object.fromEntries(data.states.map((s) => [s.abbr, s]));
  const [sa, sb] = root.querySelectorAll('select');
  const opts = data.states.slice().sort((a, b) => a.name.localeCompare(b.name)).map((s) => `<option value="${s.abbr}">${s.name} · ${s.zh}</option>`).join('');
  sa.innerHTML = opts; sb.innerHTML = opts;
  sa.value = data.a || 'CA'; sb.value = data.b || 'WY';
  const tb = $('tbody'), msg = $('.ug-wt-msg'), ha = $('[data-col="a"]'), hb = $('[data-col="b"]');

  function info() {
    const A = by[sa.value], B = by[sb.value];
    return { a: A.abbr, b: B.abbr, repA: perSeat(A.pop, A.house), repB: perSeat(B.pop, B.house), senA: perSeat(A.pop, 2), senB: perSeat(B.pop, 2) };
  }
  function show() {
    const A = by[sa.value], B = by[sb.value], r = info();
    ha.innerHTML = `${A.name}<span class="zh">${A.zh}</span>`; hb.innerHTML = `${B.name}<span class="zh">${B.zh}</span>`;
    const row = (en, zh, a, b) => `<tr><th scope="row">${en}<span class="zh">${zh}</span></th><td>${a}</td><td>${b}</td></tr>`;
    tb.innerHTML = row('Residents (2020 census)', '居民（2020 年普查）', nf(A.pop), nf(B.pop))
      + row('House seats', '眾議院席次', A.house, B.house)
      + row('Residents per representative', '每位眾議員代表的居民', nf(r.repA), nf(r.repB))
      + row('Senate seats', '參議院席次', 2, 2)
      + row('Residents per senator', '每位參議員代表的居民', nf(r.senA), nf(r.senB));
    if (A.abbr === B.abbr) { msg.innerHTML = 'Choose two different states. <span class="zh">請選兩個不同的州。</span>'; return; }
    const [big, small] = r.senA >= r.senB ? [A, B] : [B, A];
    const sx = ratio(Math.max(r.senA, r.senB), Math.min(r.senA, r.senB));
    const hx = ratio(Math.max(r.repA, r.repB), Math.min(r.repA, r.repB));
    msg.innerHTML = `Senate: each senator from ${big.name} speaks for about <b>${sx}</b> times as many residents as each senator from ${small.name}. House: residents per representative differ by about <b>${hx}</b> times. House seats follow population, but they come in whole numbers and every state gets at least one, so the House figures are close without being equal.`
      + `<span class="zh">參議院：${big.zh}每位參議員代表的居民，約是${small.zh}的 <b>${sx}</b> 倍。眾議院：兩州每位眾議員代表的居民相差約 <b>${hx}</b> 倍。眾議院的席次依人口分配，但席次只能是整數、每州至少一席，所以數字接近而不相等。</span>`;
  }
  sa.addEventListener('change', show); sb.addEventListener('change', show);
  show();
  root.__weight = { set(a, b) { sa.value = a; sb.value = b; show(); }, info };
  return root.__weight;
}
