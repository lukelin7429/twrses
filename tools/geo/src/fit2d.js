/*
 * 地理 Geography ·「哪一張地圖適合？」（不需要 WebGL）：給一個用途，選一種地圖。
 * 八題、不計時，可以一直選到對；只記第一次就答對的題數（fit.js）。選項的小地圖用 map2d.js 的 thumb 現畫。
 * 題目寫在 data/geography.json 的 fit.questions，build.py 放進 <script type="application/json">。
 *
 * 除錯：document.querySelector('[data-gg-fit]').__fit（game.state、pick(key)、next()、reset()）
 */
import { makeFitGame } from './fit.js';
import { thumb } from './map2d.js';

export function initFit(root, land) {
  const $ = (s) => root.querySelector(s);
  const data = JSON.parse($('script[type="application/json"]').textContent);
  const game = makeFitGame(data.questions);
  const opts = [...root.querySelectorAll('[data-pick]')];
  const qEn = $('.gg-ft-q-en'), qZh = $('.gg-ft-q-zh'), kEl = $('.gg-ft-k'), scEl = $('.gg-ft-score'), msg = $('.gg-ft-msg'), next = $('.gg-ft-next'), steps = $('.gg-ft-steps');
  steps.innerHTML = data.questions.map(() => '<i></i>').join('');
  const drawThumbs = () => root.querySelectorAll('canvas[data-thumb]').forEach((c) => thumb(c, c.dataset.thumb, land));
  new ResizeObserver(drawThumbs).observe(root);

  function show() {
    const st = game.state, q = game.question();
    kEl.textContent = `Question ${st.i + 1} of ${game.total} · 第 ${st.i + 1} 題（共 ${game.total} 題）`;
    scEl.textContent = `${st.first} / ${st.log.length}`;
    qEn.textContent = q.en; qZh.textContent = q.zh;
    opts.forEach((b) => { b.disabled = false; b.classList.remove('is-right', 'is-wrong'); });
    msg.innerHTML = ''; msg.className = 'gg-ft-msg';
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
      msg.className = 'gg-ft-msg is-right';
      msg.innerHTML = `<b>${r.first ? 'Right on the first try. · 第一次就答對。' : 'That is the one. · 就是這一種。'}</b> ${q.why_en}<span class="zh">${q.why_zh}</span>`;
      const last = game.state.i >= game.total - 1;
      next.textContent = last ? 'See your result · 看結果' : 'Next question · 下一題';
      next.hidden = false;
      scEl.textContent = `${game.state.first} / ${game.state.log.length}`;
      [...steps.children][game.state.i].className = r.first ? 'is-first' : 'is-later';
    } else {
      b.classList.add('is-wrong'); b.disabled = true;
      msg.className = 'gg-ft-msg is-wrong';
      msg.innerHTML = `<b>Not the best fit. Try another. · 不太適合，再選選看。</b> ${q.hint_en}<span class="zh">${q.hint_zh}</span>`;
    }
    return r;
  }
  function goNext() {
    if (game.next()) { show(); return; }
    if (!game.state.done) return;
    const n = game.state.first;
    qEn.textContent = `You chose the fitting map on the first try for ${n} of ${game.total} questions.`;
    qZh.textContent = `${game.total} 題裡，你有 ${n} 題第一次就選到適合的地圖。`;
    kEl.textContent = 'Finished · 完成';
    opts.forEach((b) => { b.disabled = true; b.classList.remove('is-right', 'is-wrong'); });
    msg.className = 'gg-ft-msg';
    msg.innerHTML = `${data.end_en}<span class="zh">${data.end_zh}</span>`;
    next.textContent = 'Play again · 再玩一次'; next.hidden = false;
  }
  opts.forEach((b) => b.addEventListener('click', () => pick(b.dataset.pick)));
  next.addEventListener('click', () => { if (game.state.done) { game.reset(); show(); } else goNext(); });
  show(); drawThumbs();
  root.__fit = { game, pick, next: goNext, reset() { game.reset(); show(); } };
  return root.__fit;
}
