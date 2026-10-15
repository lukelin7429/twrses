/*
 * 看得見的數學 · 第三課不需要 WebGL 的小互動。
 *
 *   initKind(el)    [data-mth-kind]    這是哪一種問法？八個短情境（題目在資料的 kind.items，經 data-items 傳進來），
 *                                      判斷是「平分」還是「每幾個一組」；記第一次就答對的題數，不計時
 *   initCycle(el)   [data-mth-cycle]   餘數會是多少？選一個除數，1 到 30 每個數的餘數排成一條，看它怎麼循環
 */
import { divide } from './divide.js';

const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; };
const seed = () => (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

function shuffle(list, s) {
  let a = s >>> 0; const rnd = () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const out = list.slice();
  for (let k = out.length - 1; k > 0; k--) { const j = Math.floor(rnd() * (k + 1)); [out[k], out[j]] = [out[j], out[k]]; }
  return out;
}

export function initKind(root) {
  const items = JSON.parse(root.getAttribute('data-items'));
  const R = { k: root.querySelector('.mth-pq-k'), q: root.querySelector('.mth-kd-q'), opts: root.querySelector('.mth-kd-opts'), msg: root.querySelector('.mth-pq-msg'), score: root.querySelector('.mth-pq-score'), next: root.querySelector('.mth-pq-next') };
  let list, q, it, first, tried, done;
  const N = () => list.length;
  function ask() {
    it = list[q]; tried = false; done = false;
    R.k.innerHTML = `Question ${q + 1} of ${N()} · 第 ${q + 1} 題（共 ${N()} 題）`;
    R.q.innerHTML = `${esc(it.en)}<span class="zh">${esc(it.zh)}</span>`;
    R.opts.querySelectorAll('button').forEach((b) => { b.disabled = false; b.classList.remove('is-right', 'is-wrong'); });
    R.msg.innerHTML = 'Do you know how many groups there are, or how big each group is?<span class="zh">題目告訴你的是「有幾組」，還是「每組幾個」？</span>';
    R.next.hidden = true;
  }
  function pick(b) {
    if (done) return;
    const kind = b.getAttribute('data-kind');
    const { q: qq, r } = divide(it.total, it.n);
    if (kind === it.kind) {
      done = true; if (!tried) first++;
      b.classList.add('is-right');
      R.opts.querySelectorAll('button').forEach((x) => { x.disabled = true; });
      const eq = `${it.total} ÷ ${it.n} = ${qq}${r ? ` R ${r}` : ''}`;
      const ans = it.kind === 'share'
        ? [`You know how many groups (${it.n}); you are finding how many in each.`, `你知道有幾組（${it.n} 組），要找的是每組幾個。`]
        : [`You know how many in each group (${it.n}); you are finding how many groups.`, `你知道每組幾個（${it.n} 個），要找的是有幾組。`];
      R.msg.innerHTML = `Correct. ${ans[0]} ${eq}. ${esc(it.ans_en)}<span class="zh">答對了。${ans[1]}${it.total} 除以 ${it.n}，商 ${qq}${r ? `，餘 ${r}` : ''}。${esc(it.ans_zh)}</span>`;
      R.score.textContent = `${first} / ${q + 1}`;
      R.next.hidden = false;
      R.next.textContent = q + 1 < N() ? 'Next · 下一題' : 'See how I did · 看結果';
      R.next.focus({ preventScroll: true });
    } else {
      tried = true; b.classList.add('is-wrong'); b.disabled = true;
      R.msg.innerHTML = 'Not quite. Look for the number that tells you the size of each group, or the number of groups.<span class="zh">再看一次：哪一個數是在說「每組幾個」，哪一個是在說「有幾組」？</span>';
    }
  }
  function finish() {
    R.q.innerHTML = ''; R.k.innerHTML = 'Finished · 完成';
    R.opts.querySelectorAll('button').forEach((x) => { x.disabled = true; });
    R.msg.innerHTML = `You got ${first} of ${N()} right on the first try. ${first === N() ? 'You can hear the difference between the two questions.' : 'Play again: the stories come in a new order. There is no clock here.'}<span class="zh">你第一次就答對 ${first} 題（共 ${N()} 題）。${first === N() ? '兩種問法，你一聽就分得出來！' : '再玩一次，題目順序會換。這裡不計時。'}</span>`;
    R.next.hidden = false; R.next.textContent = 'Play again · 再玩一次';
  }
  function start(s) { list = shuffle(items, s ?? seed()); q = 0; first = 0; R.score.textContent = '0 / 0'; ask(); }
  R.opts.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => pick(b)));
  R.next.addEventListener('click', () => { if (q >= N()) { start(); return; } q++; if (q >= N()) finish(); else ask(); });
  start();
  root.__kind = {
    start, item: () => it, first: () => first, q: () => q,
    answer: () => R.opts.querySelector(`[data-kind="${it.kind}"]`).click(),
    wrong: () => R.opts.querySelector(`[data-kind="${it.kind === 'share' ? 'group' : 'share'}"]`).click(),
    next: () => R.next.click(),
  };
}

export function initCycle(root) {
  const MAX = 30;
  const R = { seg: root.querySelector('.mth-cy-seg'), strip: root.querySelector('.mth-cy-strip'), msg: root.querySelector('.mth-cy-msg') };
  let n = 3, pick = 13;
  function show() {
    R.seg.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', Number(b.getAttribute('data-d')) === n ? 'true' : 'false'));
    R.strip.style.setProperty('--d', String(n));
    R.strip.innerHTML = Array.from({ length: MAX }, (_, i) => {
      const t = i + 1, { r } = divide(t, n);
      return `<button type="button" class="mth-cy-c${t === pick ? ' is-sel' : ''}${r === 0 ? ' is-zero' : ''}" data-t="${t}" style="--h:${Math.round((r / n) * 300)}" aria-label="${t} divided by ${n} leaves ${r} · ${t} 除以 ${n} 餘 ${r}"><small>${t}</small><b>${r}</b></button>`;
    }).join('');
    const { q, r } = divide(pick, n);
    R.msg.innerHTML = `${pick} ÷ ${n} = ${q}${r ? ` R ${r}` : ''}: ${n} × ${q}${r ? ` + ${r}` : ''} = ${pick}. Look along the strip: the remainders go ${Array.from({ length: Math.min(n, 6) }, (_, k) => k + 1 >= n ? 0 : k + 1).join(', ')}${n > 6 ? ', …' : ''} and start over. A remainder is never ${n} or more, because ${n} left over would be enough for one more ${n === 1 ? 'share' : 'round'}.`
      + `<span class="zh">${pick} 除以 ${n}，商 ${q}${r ? `，餘 ${r}` : ''}：${n} × ${q}${r ? ` ＋ ${r}` : ''} = ${pick}。沿著這一條看：餘數 ${Array.from({ length: Math.min(n, 6) }, (_, k) => k + 1 >= n ? 0 : k + 1).join('、')}${n > 6 ? '……' : ''}，然後又從頭開始。餘數永遠不會到 ${n} 或更多，因為剩下 ${n} 個的話，就夠再分一輪了。</span>`;
  }
  R.seg.addEventListener('click', (e) => { const b = e.target.closest('[data-d]'); if (!b) return; n = Number(b.getAttribute('data-d')); show(); });
  R.strip.addEventListener('click', (e) => { const b = e.target.closest('[data-t]'); if (!b) return; pick = Number(b.getAttribute('data-t')); show(); });
  show();
  root.__cycle = {
    set: (d, t) => { n = d; if (t) pick = t; show(); },
    shown: () => [...R.strip.querySelectorAll('b')].map((b) => Number(b.textContent)),
  };
}
