/*
 * 世界歷史 第一課 ·「三種證據」（不需要 WebGL）。
 *
 *   <div class="wh-sort" data-wh-sort><script type="application/json">{ buckets: [{ key, icon, en, zh }], items: [{ answer, en, zh, why_en, why_zh }], end_en, end_zh }</script>…</div>
 *
 * 一次出一句「我們想知道的事」，選它要靠哪一種證據（化石／石器／基因／三種都沒辦法）。
 * 不計時；可以一直選到對；只記第一次就選對的題數（spread.js 的 makeSort）。
 * 除錯：root.__sort（game.state、pick(key)、next()、reset()）。
 */
import { makeSort } from './spread.js';
import { each, bi, readJson } from './common.js';

export function initSort(root) {
  const data = readJson(root);
  const game = makeSort(data.items, data.buckets.map((b) => b.key));
  const $ = (s) => root.querySelector(s);
  const kEl = $('.wh-so-k'), scEl = $('.wh-so-score'), qEl = $('.wh-so-q'), msg = $('.wh-so-msg'), nextBtn = $('.wh-so-next'), steps = $('.wh-so-steps');
  const opts = [...root.querySelectorAll('[data-pick]')];
  let answered = 0;

  function draw() {
    const st = game.state, n = data.items.length;
    steps.innerHTML = data.items.map((_, i) => `<i class="${i < st.i || st.done ? 'is-done' : i === st.i ? 'is-now' : ''}"></i>`).join('');
    scEl.textContent = `${st.first} / ${answered}`;
    if (st.done) {
      kEl.innerHTML = bi('All done', '全部完成');
      qEl.innerHTML = bi(data.end_en, data.end_zh);
      opts.forEach((b) => { b.disabled = true; b.classList.remove('is-right', 'is-wrong'); });
      msg.innerHTML = bi(`You sorted ${st.first} of ${n} correctly on the first try.`, `${n} 題裡，你有 ${st.first} 題第一次就分對。`);
      msg.className = 'wh-so-msg is-ok';
      nextBtn.hidden = false; nextBtn.innerHTML = 'Play again · 再玩一次'; nextBtn.dataset.act = 'reset';
      return;
    }
    kEl.innerHTML = bi(`Question ${st.i + 1} of ${n}`, `第 ${st.i + 1} 題（共 ${n} 題）`);
    const it = game.current();
    qEl.innerHTML = bi(it.en, it.zh);
    opts.forEach((b) => { b.disabled = false; b.classList.remove('is-right', 'is-wrong'); });
    msg.innerHTML = ''; msg.className = 'wh-so-msg';
    nextBtn.hidden = true; nextBtn.dataset.act = 'next'; nextBtn.innerHTML = 'Next · 下一題';
  }
  function pick(key) {
    const it = game.current(); if (!it) return null;
    const r = game.pick(key); if (!r || r.repeat) return r;
    const b = opts.find((o) => o.dataset.pick === key);
    if (r.right) {
      answered += 1;
      b.classList.add('is-right'); opts.forEach((o) => { o.disabled = true; });
      msg.className = 'wh-so-msg is-ok'; msg.innerHTML = bi(it.why_en, it.why_zh);
      scEl.textContent = `${game.state.first} / ${answered}`;
      nextBtn.hidden = false; nextBtn.focus();
    } else {
      b.classList.add('is-wrong'); b.disabled = true;
      msg.className = 'wh-so-msg is-bad'; msg.innerHTML = bi(it.hint_en || 'Not that one. Try another.', it.hint_zh || '不是這一種，再試試別的。');
    }
    return r;
  }
  root.addEventListener('click', (ev) => {
    const b = ev.target.closest('button'); if (!b) return;
    if (b.dataset.pick) pick(b.dataset.pick);
    else if (b.dataset.act === 'next') { game.next(); draw(); }
    else if (b.dataset.act === 'reset') { game.reset(); answered = 0; draw(); }
  });
  draw();
  root.__sort = { game, pick, next() { game.next(); draw(); }, reset() { game.reset(); answered = 0; draw(); } };
  return root.__sort;
}
each('[data-wh-sort]', initSort);
