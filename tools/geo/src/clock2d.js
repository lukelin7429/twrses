/*
 * 地理 Geography ·「那裡幾點？」（不需要 WebGL）：給台北的時間與星期，算出另一個城市（或經度）的理想時區時間。
 * 八題、不計時，只記第一次就答對的題數（fit.js 的計分）。答案格式是「星期-小時」，例如 '0-2'＝星期一凌晨 2 點；
 * 由 test/timezone.test.mjs 用 timezone.js 驗算。題目在 data/geography.json 的 clock.questions。
 * 除錯：document.querySelector('[data-gg-clock]').__clock（game、pick(值)、next()、reset()）
 */
import { makeFitGame } from './fit.js';
import { city, dayName, fmtTime } from './timezone.js';

const label = (v) => { const [d, h] = v.split('-').map(Number), t = fmtTime(h, 0); return { en: `${dayName(d).en}, ${t.en}`, zh: `${dayName(d).zh} ${t.zh}` }; };

export function initClock(root) {
  const $ = (s) => root.querySelector(s);
  const data = JSON.parse($('script[type="application/json"]').textContent);
  const game = makeFitGame(data.questions);
  const optsEl = $('.gg-ck-opts'), kEl = $('.gg-ft-k'), scEl = $('.gg-ft-score'), msg = $('.gg-ft-msg'), next = $('.gg-ft-next'), steps = $('.gg-ft-steps');
  steps.innerHTML = data.questions.map(() => '<i></i>').join('');
  function show() {
    const st = game.state, q = game.question();
    kEl.textContent = `Question ${st.i + 1} of ${game.total} · 第 ${st.i + 1} 題（共 ${game.total} 題）`;
    scEl.textContent = `${st.first} / ${st.log.length}`;
    const tp = fmtTime(q.h, 0), place = q.city ? city(q.city) : null;
    $('.gg-ck-from').innerHTML = `${dayName(q.day).en}, ${tp.en}<span class="zh">${dayName(q.day).zh} ${tp.zh}</span>`;
    $('.gg-ck-to').innerHTML = place ? `${place.en}<span class="zh">${place.zh}・${place.lon > 0 ? '東經' : '西經'} ${Math.abs(place.lon)} 度</span>` : `${Math.abs(q.lon)}° ${q.lon >= 0 ? 'E' : 'W'}<span class="zh">${q.lon >= 0 ? '東經' : '西經'} ${Math.abs(q.lon)} 度</span>`;
    $('.gg-ck-q-en').textContent = q.en; $('.gg-ck-q-zh').textContent = q.zh;
    optsEl.innerHTML = q.options.map((o) => { const L = label(o); return `<button type="button" class="gg-ft-opt gg-ck-opt" data-pick="${o}"><span class="gg-ft-lab">${L.en}<span class="zh">${L.zh}</span></span></button>`; }).join('');
    optsEl.querySelectorAll('[data-pick]').forEach((b) => b.addEventListener('click', () => pick(b.dataset.pick)));
    msg.className = 'gg-ft-msg'; msg.innerHTML = `${data.start_en}<span class="zh">${data.start_zh}</span>`;
    next.hidden = true;
    [...steps.children].forEach((s, i) => { s.className = i < st.log.length ? (st.log[i].first ? 'is-first' : 'is-later') : i === st.i ? 'is-now' : ''; });
  }
  function pick(v) {
    const q = game.question(), r = game.answer(v);
    if (!r) return null;
    const b = optsEl.querySelector(`[data-pick="${v}"]`), opts = [...optsEl.querySelectorAll('[data-pick]')];
    if (r.correct) {
      b.classList.add('is-right'); opts.forEach((o) => { o.disabled = true; });
      msg.className = 'gg-ft-msg is-right';
      msg.innerHTML = `<b>${r.first ? 'Right on the first try. · 第一次就答對。' : 'That is it. · 答對了。'}</b> ${q.why_en}<span class="zh">${q.why_zh}</span>`;
      next.textContent = game.state.i >= game.total - 1 ? 'See your result · 看結果' : 'Next question · 下一題'; next.hidden = false;
      scEl.textContent = `${game.state.first} / ${game.state.log.length}`;
      [...steps.children][game.state.i].className = r.first ? 'is-first' : 'is-later';
    } else {
      b.classList.add('is-wrong'); b.disabled = true;
      msg.className = 'gg-ft-msg is-wrong';
      msg.innerHTML = `<b>Not quite. Try again. · 不太對，再算一次。</b> ${data.hint_en}<span class="zh">${data.hint_zh}</span>`;
    }
    return r;
  }
  function goNext() {
    if (game.next()) { show(); return; }
    if (!game.state.done) return;
    const n = game.state.first;
    $('.gg-ck-q-en').textContent = `You worked out ${n} of ${game.total} times right on the first try.`;
    $('.gg-ck-q-zh').textContent = `${game.total} 題裡，你有 ${n} 題第一次就算對。`;
    kEl.textContent = 'Finished · 完成'; optsEl.innerHTML = '';
    msg.className = 'gg-ft-msg'; msg.innerHTML = `${data.end_en}<span class="zh">${data.end_zh}</span>`;
    next.textContent = 'Play again · 再玩一次'; next.hidden = false;
  }
  next.addEventListener('click', () => { if (game.state.done) { game.reset(); show(); } else goNext(); });
  show();
  root.__clock = { game, pick, next: goNext, reset() { game.reset(); show(); } };
  return root.__clock;
}
