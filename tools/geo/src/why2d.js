/*
 * 地理 Geography ·「這裡人多還是人少？」（不需要 WebGL）：給一個地方的條件卡（水、地形、氣候），推理那裡人多還是人少，
 * 答完用人口格網對答案（那個 1 度格子裡大約住了多少人，pop.js 的 peopleIn）。
 * 不考背誦；不計時，只記第一次就答對的題數（fit.js）。題目在 data/geography.json 的 why.questions，
 * 答案由 test/pop.test.mjs 用資料驗算（一百萬人以上算人多、不到十萬人算人少）。
 * 除錯：document.querySelector('[data-gg-why]').__why（game、pick('many'|'few')、next()、reset()）
 */
import { makeFitGame } from './fit.js';
import { PLACES, cellKm2, getPop, peopleIn } from './pop.js';

export function fmtPeople(n) {
  if (n >= 1e6) return { en: `about ${(n / 1e6).toFixed(n >= 1e7 ? 0 : 1)} million`, zh: `大約 ${Math.round(n / 1e4).toLocaleString("en-US")} 萬` };
  if (n >= 1e4) return { en: `about ${Math.round(n / 1e3).toLocaleString('en-US')},000`, zh: `大約 ${(n / 1e4).toFixed(1).replace(/\.0$/, '')} 萬` };
  if (n >= 1000) return { en: `about ${(Math.round(n / 100) * 100).toLocaleString('en-US')}`, zh: `大約 ${(Math.round(n / 100) * 100).toLocaleString('en-US')}` };
  return n > 0 ? { en: 'fewer than 1,000', zh: '不到一千' } : { en: 'almost nobody', zh: '幾乎沒有人' };
}

export function initWhy(root) {
  const $ = (s) => root.querySelector(s);
  const data = JSON.parse($('script[type="application/json"]').textContent);
  const game = makeFitGame(data.questions);
  const pop = getPop();
  const kEl = $('.gg-ft-k'), scEl = $('.gg-ft-score'), msg = $('.gg-ft-msg'), next = $('.gg-ft-next'), steps = $('.gg-ft-steps'), optsEl = $('.gg-ck-opts');
  const card = $('.gg-wh-card');
  steps.innerHTML = data.questions.map(() => '<i></i>').join('');
  function show() {
    const st = game.state, q = game.question(), p = PLACES[q.place];
    kEl.textContent = `Question ${st.i + 1} of ${game.total} · 第 ${st.i + 1} 題（共 ${game.total} 題）`;
    scEl.textContent = `${st.first} / ${st.log.length}`;
    card.innerHTML = `<p class="gg-wh-n">${p.en}<span class="zh">${p.zh}</span></p>
      <ul class="gg-wh-chips">${q.chips.map((c) => `<li class="is-${c.tone}"><span aria-hidden="true">${c.icon}</span><b>${c.en}</b><span class="zh">${c.zh}</span></li>`).join('')}</ul>
      <p class="gg-wh-data" hidden></p>`;
    optsEl.innerHTML = [['many', 'Many people', '人很多'], ['few', 'Few people', '人很少']]
      .map(([k, en, zh]) => `<button type="button" class="gg-ft-opt gg-ck-opt" data-pick="${k}"><span class="gg-ft-lab">${en}<span class="zh">${zh}</span></span></button>`).join('');
    optsEl.querySelectorAll('[data-pick]').forEach((b) => b.addEventListener('click', () => pick(b.dataset.pick)));
    msg.className = 'gg-ft-msg'; msg.innerHTML = `${data.start_en}<span class="zh">${data.start_zh}</span>`;
    next.hidden = true;
    [...steps.children].forEach((x, i) => { x.className = i < st.log.length ? (st.log[i].first ? 'is-first' : 'is-later') : i === st.i ? 'is-now' : ''; });
  }
  function pick(v) {
    const q = game.question(), r = game.answer(v);
    if (!r) return null;
    const b = optsEl.querySelector(`[data-pick="${v}"]`), opts = [...optsEl.querySelectorAll('[data-pick]')];
    if (r.correct) {
      const p = PLACES[q.place], n = peopleIn(pop, p.lon, p.lat), f = fmtPeople(n), km = Math.round(cellKm2(Math.floor(p.lat) + 0.5) / 1000) * 1000;
      const d = $('.gg-wh-data'); d.hidden = false;
      d.innerHTML = `The data: ${f.en} people live in this 1° × 1° square (about ${km.toLocaleString('en-US')} km², ${data.year}).<span class="zh">資料：這一個 1 度 × 1 度的格子（大約 ${km.toLocaleString('en-US')} 平方公里）住了${f.zh}人（${data.year} 年）。</span>`;
      b.classList.add('is-right'); opts.forEach((o) => { o.disabled = true; });
      msg.className = 'gg-ft-msg is-right';
      msg.innerHTML = `<b>${r.first ? 'Right on the first try. · 第一次就答對。' : 'That is it. · 答對了。'}</b> ${q.why_en}<span class="zh">${q.why_zh}</span>`;
      next.textContent = game.state.i >= game.total - 1 ? 'See your result · 看結果' : 'Next question · 下一題'; next.hidden = false;
      scEl.textContent = `${game.state.first} / ${game.state.log.length}`;
      [...steps.children][game.state.i].className = r.first ? 'is-first' : 'is-later';
    } else {
      b.classList.add('is-wrong'); b.disabled = true;
      msg.className = 'gg-ft-msg is-wrong';
      msg.innerHTML = `<b>Not quite. Look at the cards again. · 不太對，再看一次條件卡。</b> ${data.hint_en}<span class="zh">${data.hint_zh}</span>`;
    }
    return r;
  }
  function goNext() {
    if (game.next()) { show(); return; }
    if (!game.state.done) return;
    const n = game.state.first;
    kEl.textContent = 'Finished · 完成'; optsEl.innerHTML = '';
    card.innerHTML = `<p class="gg-wh-n">You got ${n} of ${game.total} right on the first try.<span class="zh">${game.total} 題裡，你有 ${n} 題第一次就答對。</span></p>`;
    msg.className = 'gg-ft-msg'; msg.innerHTML = `${data.end_en}<span class="zh">${data.end_zh}</span>`;
    next.textContent = 'Play again · 再玩一次'; next.hidden = false;
  }
  next.addEventListener('click', () => { if (game.state.done) { game.reset(); show(); } else goNext(); });
  show();
  root.__why = { game, pick, next: goNext, reset() { game.reset(); show(); } };
  return root.__why;
}
