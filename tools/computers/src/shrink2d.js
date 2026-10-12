/*
 * 電腦概論 · 第十六課不需要 WebGL 的小互動（HTML 由 build.py 產生，這裡只綁行為）。
 *
 *   initCompare(el)  [data-cp-compare]  比一比：選兩個年代，算出後面那個的開關數是前面那個的幾倍、中間隔了幾年
 *   「這是哪一種開關？」八題用 key2d.js 的 initChoice（通用選項題）；十六課回顧是 build.py 直接產生的靜態卡片。
 */
import { group, span, stop, times } from './shrink.js';

export function initCompare(root) {
  const NAMES = JSON.parse(root.getAttribute('data-names'));
  const $ = (s) => root.querySelector(s);
  const A = [...root.querySelectorAll('[data-a]')], B = [...root.querySelectorAll('[data-b]')], R = { na: $('.cp-cm-na'), nb: $('.cp-cm-nb'), x: $('.cp-cm-x'), yrs: $('.cp-cm-yrs'), msg: $('.cp-cm-msg') };
  let a = 'i4004', b = 'm4';
  function show() {
    A.forEach((e) => e.setAttribute('aria-pressed', e.getAttribute('data-a') === a ? 'true' : 'false')); B.forEach((e) => e.setAttribute('aria-pressed', e.getAttribute('data-b') === b ? 'true' : 'false'));
    const sa = stop(a), sb = stop(b), more = sb.count >= sa.count, t = more ? times(a, b) : times(b, a), y = span(a, b);
    R.na.textContent = group(sa.count); R.nb.textContent = group(sb.count); R.x.textContent = a === b ? '1' : group(t); R.yrs.textContent = String(y);
    const SAY = { relay: ['Stibitz’s relay adder', '史提比茲的繼電器加法器'], eniac: ['ENIAC', 'ENIAC '], transistor: ['the first transistor', '第一顆電晶體'], i4004: ['the Intel 4004', 'Intel 4004 '], m4: ['the Apple M4', 'Apple M4 '] };
    const en = (k) => (SAY[k] || [NAMES[k].en])[0], zh = (k) => (SAY[k] || [0, NAMES[k].zh])[1], cap = (t) => t.charAt(0).toUpperCase() + t.slice(1), mid = (k) => (/^[A-Za-z]/.test(zh(k)) ? ` ${zh(k)}` : zh(k));
    R.msg.innerHTML = a === b ? 'You chose the same one twice. Pick two different years.<span class="zh">你選了同一個。挑兩個不同的年代。</span>'
      : more ? `${cap(en(b))} has ${group(t)} times as many switches as ${en(a)}. The two are ${y} years apart.${sa.atLeast || sb.atLeast ? ' (The count for ENIAC is “more than 17,000,” so this is a rounded figure.)' : ''}<span class="zh">${zh(b)}的開關數是${mid(a)}的 ${group(t)} 倍。兩者相隔 ${y} 年。${sa.atLeast || sb.atLeast ? '（ENIAC 的數字是「超過 17,000」，所以這是約略的倍數。）' : ''}</span>`
        : `${cap(en(b))} has fewer switches than ${en(a)}: ${en(a)} has ${group(t)} times as many. Newer does not always mean more. Look at what each of them was.<span class="zh">${zh(b)}的開關比${mid(a)}少：${zh(a)}是它的 ${group(t)} 倍。比較新不一定比較多。看看它們各是什麼東西。</span>`;
  }
  A.forEach((e) => e.addEventListener('click', () => { a = e.getAttribute('data-a'); show(); })); B.forEach((e) => e.addEventListener('click', () => { b = e.getAttribute('data-b'); show(); }));
  show();
  root.__compare = { set: (x, y) => { a = x; b = y; show(); }, state: () => ({ a, b, x: R.x.textContent, yrs: R.yrs.textContent, msg: R.msg.textContent.slice(0, 90) }) };
}
