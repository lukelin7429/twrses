/*
 * 世界歷史 第八課 ·「同一個詞，三種語言」（不需要 WebGL）。
 *
 *   <div class="wh-match" data-wh-match><script type="application/json">{ items: [{ zh, pali, skt, en, note_en, note_zh }], end_en, end_zh }</script>…</div>
 *
 * 一次出一個中文的佛教名詞，從四個選項裡選出它的巴利文／梵文與英文。不計時；可以一直選到對；只記第一次就答對的題數。
 * 選項的順序用固定的種子打亂（matchOptions），每次載入都一樣，方便老師帶全班一起做。
 * 除錯：root.__match（state、pick(i)、next()、reset()、options()）。
 */
import { each, bi, esc, readJson } from './common.js';
import { matchOptions } from './dharma.js';

const label = (it) => `${it.pali ? `<b>${esc(it.pali)}</b> <small>Pāli</small>` : ''}${it.pali && it.skt ? ' · ' : ''}${it.skt ? `<b>${esc(it.skt)}</b> <small>Skt.</small>` : ''}<span class="wh-ma-en">${esc(it.en)}</span>`;

export function initMatch(root) {
  const data = readJson(root), items = data.items, n = items.length;
  const $ = (s) => root.querySelector(s);
  const state = { i: 0, first: 0, tried: false, done: false };
  const kEl = $('.wh-ma-k'), qEl = $('.wh-ma-q'), optsEl = $('.wh-ma-opts'), msg = $('.wh-ma-msg'), nextBtn = $('.wh-ma-next'), sc = $('.wh-ma-score');
  let opts = [];
  function draw() {
    sc.textContent = `${state.first} / ${Math.min(n, state.i + (state.done ? 0 : 0))}`;
    if (state.done) {
      kEl.innerHTML = bi('All done', '全部完成'); qEl.innerHTML = bi(data.end_en, data.end_zh); optsEl.innerHTML = '';
      msg.className = 'wh-ma-msg is-ok'; msg.innerHTML = bi(`You matched ${state.first} of ${n} on the first try.`, `${n} 題裡，你有 ${state.first} 題第一次就配對正確。`);
      nextBtn.hidden = false; nextBtn.dataset.act = 'reset'; nextBtn.innerHTML = 'Play again · 再玩一次'; return;
    }
    const it = items[state.i];
    kEl.innerHTML = bi(`Term ${state.i + 1} of ${n}`, `第 ${state.i + 1} 個（共 ${n} 個）`);
    qEl.innerHTML = `<span class="wh-ma-zh">${esc(it.zh)}</span>`;
    opts = matchOptions(n, state.i);
    optsEl.innerHTML = opts.map((j) => `<button type="button" class="wh-ma-opt" data-opt="${j}">${label(items[j])}</button>`).join('');
    msg.innerHTML = ''; msg.className = 'wh-ma-msg'; nextBtn.hidden = true; nextBtn.dataset.act = 'next'; nextBtn.innerHTML = 'Next · 下一個';
    state.tried = false;
  }
  function pick(j) {
    if (state.done) return null;
    const it = items[state.i], b = optsEl.querySelector(`[data-opt="${j}"]`), right = j === state.i;
    if (right) {
      if (!state.tried) state.first += 1;
      b.classList.add('is-right'); optsEl.querySelectorAll('button').forEach((o) => { o.disabled = true; });
      msg.className = 'wh-ma-msg is-ok'; msg.innerHTML = bi(it.note_en, it.note_zh);
      sc.textContent = `${state.first} / ${state.i + 1}`; nextBtn.hidden = false; nextBtn.focus();
    } else {
      state.tried = true; b.classList.add('is-wrong'); b.disabled = true;
      msg.className = 'wh-ma-msg is-bad'; msg.innerHTML = bi('Not this one. Look at the English meaning and try again.', '不是這一個。看看英文的意思，再試一次。');
    }
    return right;
  }
  function next() { state.i += 1; if (state.i >= n) state.done = true; draw(); }
  function reset() { Object.assign(state, { i: 0, first: 0, tried: false, done: false }); draw(); }
  root.addEventListener('click', (ev) => {
    const b = ev.target.closest('button'); if (!b) return;
    if (b.dataset.opt != null) pick(+b.dataset.opt);
    else if (b.dataset.act === 'next') next();
    else if (b.dataset.act === 'reset') reset();
  });
  draw();
  root.__match = { state, pick, next, reset, options: () => opts };
  return root.__match;
}

each('[data-wh-match]', initMatch);
