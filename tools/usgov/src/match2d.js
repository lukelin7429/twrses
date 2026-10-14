/*
 * 美國政治 U.S. Government · 配對題（不需要 WebGL；每課共用）：給一項權力或規定，選它寫在哪裡。
 * 不計時，可以一直選到對；只記第一次就答對的題數（match.js）。
 * 題目寫在 data/us_government.json 的 match.questions，build.py 放進 <script type="application/json">。
 *
 * 除錯：document.querySelector('[data-ug-match]').__match（game.state、pick(key)、next()、reset()）
 */
import { makeMatchGame } from './match.js';

export function initMatch(root) {
  const $ = (s) => root.querySelector(s);
  const data = JSON.parse($('script[type="application/json"]').textContent);
  const game = makeMatchGame(data.questions);
  const opts = [...root.querySelectorAll('[data-pick]')];
  const qEn = $('.ug-mt-q-en'), qZh = $('.ug-mt-q-zh'), kEl = $('.ug-mt-k'), scEl = $('.ug-mt-score'), msg = $('.ug-mt-msg'), next = $('.ug-mt-next'), steps = $('.ug-mt-steps');
  steps.innerHTML = data.questions.map(() => '<i></i>').join('');

  function show() {
    const st = game.state, q = game.question();
    kEl.textContent = `${st.i + 1} of ${game.total} · 第 ${st.i + 1} 題（共 ${game.total} 題）`;
    scEl.textContent = `${st.first} / ${st.log.length}`;
    qEn.textContent = q.en; qZh.textContent = q.zh;
    opts.forEach((b) => { b.disabled = false; b.classList.remove('is-right', 'is-wrong'); });
    msg.innerHTML = ''; msg.className = 'ug-mt-msg';
    next.hidden = true;
    [...steps.children].forEach((s, i) => { s.className = i < st.log.length ? (st.log[i].first ? 'is-first' : 'is-later') : i === st.i ? 'is-now' : ''; });
  }
  function pick(key) {
    const q = game.question();
    const r = game.answer(key);
    if (!r) return null;
    const b = opts.find((o) => o.dataset.pick === key);
    if (r.correct) {
      b.classList.add('is-right');
      opts.forEach((o) => { o.disabled = true; });
      msg.className = 'ug-mt-msg is-right';
      msg.innerHTML = `<b>${r.first ? 'Right on the first try. · 第一次就答對。' : 'That is the one. · 就是這個。'}</b> ${q.why_en}<span class="zh">${q.why_zh}</span>`;
      const last = game.state.i >= game.total - 1;
      next.textContent = last ? 'See your result · 看結果' : 'Next · 下一題';
      next.hidden = false;
      scEl.textContent = `${game.state.first} / ${game.state.log.length}`;
      [...steps.children][game.state.i].className = r.first ? 'is-first' : 'is-later';
    } else {
      b.classList.add('is-wrong'); b.disabled = true;
      msg.className = 'ug-mt-msg is-wrong';
      msg.innerHTML = `<b>Not that one. Try again. · 不是這個，再選選看。</b> ${q.hint_en}<span class="zh">${q.hint_zh}</span>`;
    }
    return r;
  }
  function goNext() {
    if (game.next()) { show(); return; }
    if (!game.state.done) return;
    const n = game.state.first;
    qEn.textContent = `You placed ${n} of ${game.total} on the first try.`;
    qZh.textContent = `${game.total} 題裡，你有 ${n} 題第一次就放對了。`;
    kEl.textContent = 'Finished · 完成';
    opts.forEach((b) => { b.disabled = true; b.classList.remove('is-right', 'is-wrong'); });
    msg.className = 'ug-mt-msg';
    msg.innerHTML = `${data.end_en}<span class="zh">${data.end_zh}</span>`;
    next.textContent = 'Play again · 再玩一次'; next.hidden = false;
  }
  opts.forEach((b) => b.addEventListener('click', () => pick(b.dataset.pick)));
  next.addEventListener('click', () => { if (game.state.done) { game.reset(); show(); } else goNext(); });
  show();
  root.__match = { game, pick, next: goNext, reset() { game.reset(); show(); } };
  return root.__match;
}
