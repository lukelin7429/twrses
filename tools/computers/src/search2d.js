/*
 * 電腦概論 · 第十課不需要 WebGL 的小互動（HTML 由 build.py 產生，這裡只綁行為）。
 *
 *   initGuessNum(el)  [data-cp-guessnum]  猜數字：電腦想一個 1 到 100 的數，每猜一次說「太大」或「太小」，記猜了幾次；
 *                                         猜中後告訴你「每次猜中間」這個數要幾次（最多 7 次）
 *   initGrow(el)      [data-cp-grow]      箱子越來越多：10 個到 100 萬個，兩種找法最多各要開幾個
 *   「該用哪一種找法？」八題用 key2d.js 的 initChoice（通用選項題）。
 */
import { SIZES, halvingGuesses, worstBinary, worstLinear } from './search.js';

const fmt = (n) => n.toLocaleString('en-US');

export function initGuessNum(root) {
  const $ = (s) => root.querySelector(s);
  const R = { form: $('.cp-gn-form'), input: $('.cp-gn-in'), msg: $('.cp-gn-msg'), n: $('.cp-gn-n'), lo: $('.cp-gn-lo'), hi: $('.cp-gn-hi'), bar: $('.cp-gn-bar'), log: $('.cp-gn-log'), again: $('.cp-gn-new') };
  let secret, lo, hi, n, done;
  const say = (en, zh) => { R.msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  function show() { R.n.textContent = String(n); R.lo.textContent = String(lo); R.hi.textContent = String(hi); R.bar.style.left = `${lo - 1}%`; R.bar.style.width = `${Math.max(1, hi - lo + 1)}%`; }
  function start(s) {
    secret = s || 1 + Math.floor(Math.random() * 100); lo = 1; hi = 100; n = 0; done = false; R.log.innerHTML = ''; R.input.value = ''; R.input.disabled = false;
    say('I am thinking of a whole number from 1 to 100. Type a guess.', '我想好了一個 1 到 100 的整數。打一個數來猜。'); show();
  }
  function guess(g) {
    if (done) return null;
    if (!Number.isInteger(g) || g < 1 || g > 100) { say('Type a whole number from 1 to 100.', '請打一個 1 到 100 的整數。'); return null; }
    n++; const li = document.createElement('li');
    if (g === secret) {
      done = true; lo = hi = g; li.className = 'is-hit'; li.textContent = `${g} ✓`; R.input.disabled = true;
      const k = halvingGuesses(secret);
      say(`Yes, it was ${g}. You took ${n} guess${n === 1 ? '' : 'es'}. Always guessing the middle of what is left would find this number in ${k}, and any number from 1 to 100 in 7 or fewer.`, `答對了，就是 ${g}。你猜了 ${n} 次。「每次都猜剩下範圍的中間」，這個數要 ${k} 次；1 到 100 的任何一個數，最多 7 次。`);
    } else if (g < secret) { lo = Math.max(lo, g + 1); li.textContent = `${g} ↑`; say(`${g} is too small. My number is bigger.`, `${g} 太小了，我的數比較大。`); }
    else { hi = Math.min(hi, g - 1); li.textContent = `${g} ↓`; say(`${g} is too big. My number is smaller.`, `${g} 太大了，我的數比較小。`); }
    R.log.appendChild(li); show(); R.input.value = ''; return g === secret;
  }
  R.form.addEventListener('submit', (e) => { e.preventDefault(); guess(Number(R.input.value)); if (!done) R.input.focus(); });
  R.again.addEventListener('click', () => start());
  start();
  root.__guessnum = { start, guess, state: () => ({ secret, lo, hi, n, done }) };
}

export function initGrow(root) {
  const $ = (s) => root.querySelector(s);
  const btns = [...root.querySelectorAll('[data-size]')], R = { lin: $('.cp-gw-lin'), bin: $('.cp-gw-bin'), barL: $('.cp-gw-bar-l'), barB: $('.cp-gw-bar-b'), msg: $('.cp-gw-msg') };
  let cur = 0;
  function set(i) {
    cur = i; const n = SIZES[i], l = worstLinear(n), b = worstBinary(n);
    btns.forEach((x, k) => x.setAttribute('aria-pressed', k === i ? 'true' : 'false'));
    R.lin.textContent = fmt(l); R.bin.textContent = fmt(b);
    R.barL.style.width = '100%'; R.barB.style.width = `${Math.max(0.15, (b / l) * 100)}%`;
    const prev = i > 0 ? SIZES[i - 1] : null;
    R.msg.innerHTML = prev
      ? `With ${fmt(n)} boxes, opening them one by one can take ${fmt(l)} tries. Halving never takes more than ${b}. Compared with ${fmt(prev)} boxes, there are ten times as many, and halving needs only ${b - worstBinary(prev)} more.<span class="zh">${fmt(n)} 個箱子，一個一個開最多要開 ${fmt(l)} 個；每次砍一半，最多只要 ${b} 個。和 ${fmt(prev)} 個箱子比，箱子變成十倍，砍一半的找法只多開 ${b - worstBinary(prev)} 個。</span>`
      : `With ${fmt(n)} boxes, opening them one by one can take ${fmt(l)} tries. Halving never takes more than ${b}. Not a big difference yet. Now add more boxes.<span class="zh">${fmt(n)} 個箱子，一個一個開最多要開 ${fmt(l)} 個；每次砍一半，最多 ${b} 個。現在差得還不多。把箱子變多看看。</span>`;
  }
  btns.forEach((b, i) => { b.textContent = fmt(SIZES[i]); b.addEventListener('click', () => set(i)); });
  set(0);
  root.__grow = { set, state: () => ({ n: SIZES[cur], lin: R.lin.textContent, bin: R.bin.textContent }) };
}
