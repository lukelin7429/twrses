/*
 * 地理 Geography ·「雨水會流到哪裡？」（不需要 WebGL）：台灣小地圖上一個紅點，下一滴雨，它會從西海岸還是東海岸入海？
 * 想一想：最高的山脊在哪裡？雨水從落下的那一邊往下流。答完在地圖上畫出雨水的路（flow.js），讀出走了幾公里、經過哪一條河。
 * 不計時，只記第一次就答對的題數（fit.js）。題目在 data/geography.json 的 drop.questions（{ place, answer, why_en, why_zh }），
 * 答案由 test/flow.test.mjs 用 pathFrom() 驗算。
 * 除錯：document.querySelector('[data-gg-drop]').__drop（game、pick('west'|'east')、next()、reset()）
 */
import { makeFitGame } from './fit.js';
import { getTaiwan } from './taiwan.js';
import { getFlow, pathFrom } from './flow.js';
import { drawTaiwan } from './twmap2d.js';

const riverAt = (rivers, o) => { let best = null, bd = 4; for (const r of rivers) { const d = Math.hypot(r.e - o[0], r.n - o[1]); if (d < bd) { bd = d; best = r; } } return best; };

export function initDrop(root) {
  const $ = (s) => root.querySelector(s);
  const data = JSON.parse($('script[type="application/json"]').textContent);
  const T = getTaiwan(), F = getFlow(), game = makeFitGame(data.questions);
  const kEl = $('.gg-ft-k'), scEl = $('.gg-ft-score'), msg = $('.gg-ft-msg'), next = $('.gg-ft-next'), steps = $('.gg-ft-steps'), optsEl = $('.gg-ck-opts');
  steps.innerHTML = data.questions.map(() => '<i></i>').join('');
  let shown = false;
  function map(q) {
    const cv = $('.gg-dp-map'), w = cv.clientWidth, h = cv.clientHeight, d = Math.min(window.devicePixelRatio || 1, 2);
    if (!w || !h) return;
    cv.width = Math.round(w * d); cv.height = Math.round(h * d); const c = cv.getContext('2d'); c.setTransform(d, 0, 0, d, 0, 0);
    const m = drawTaiwan(c, w, h, T), p = T.places[q.place] || q;
    if (shown) {
      const path = pathFrom(F, p.e, p.n);
      c.strokeStyle = '#fff'; c.lineWidth = 4.5; c.lineJoin = 'round'; c.beginPath(); path.pts.forEach(([e, n], i) => { const [x, y] = m.toXY(e, n); if (i) c.lineTo(x, y); else c.moveTo(x, y); }); c.stroke();
      c.strokeStyle = '#3f8fe0'; c.lineWidth = 2.5; c.stroke();
    }
    const [x, y] = m.toXY(p.e, p.n);
    c.fillStyle = '#ff4d4d'; c.strokeStyle = '#fff'; c.lineWidth = 2; c.beginPath(); c.arc(x, y, 7, 0, Math.PI * 2); c.fill(); c.stroke();
  }
  function show() {
    const st = game.state, q = game.question(); shown = false;
    kEl.textContent = `Question ${st.i + 1} of ${game.total} · 第 ${st.i + 1} 題（共 ${game.total} 題）`;
    scEl.textContent = `${st.first} / ${st.log.length}`;
    $('.gg-dp-name').innerHTML = `${q.name_en}<span class="zh">${q.name_zh}</span>`;
    optsEl.innerHTML = [['west', 'The west coast', '西海岸'], ['east', 'The east coast', '東海岸']].map(([k, en, zh]) => `<button type="button" class="gg-ft-opt gg-ck-opt" data-pick="${k}"><span class="gg-ft-lab">${en}<span class="zh">${zh}</span></span></button>`).join('');
    optsEl.querySelectorAll('[data-pick]').forEach((b) => b.addEventListener('click', () => pick(b.dataset.pick)));
    msg.className = 'gg-ft-msg'; msg.innerHTML = `${data.start_en}<span class="zh">${data.start_zh}</span>`;
    next.hidden = true;
    [...steps.children].forEach((x, i) => { x.className = i < st.log.length ? (st.log[i].first ? 'is-first' : 'is-later') : i === st.i ? 'is-now' : ''; });
    map(q);
  }
  function pick(v) {
    const q = game.question(), res = game.answer(v);
    if (!res) return null;
    const b = optsEl.querySelector(`[data-pick="${v}"]`), opts = [...optsEl.querySelectorAll('[data-pick]')];
    if (res.correct) {
      shown = true; map(q);
      const p = T.places[q.place] || q, path = pathFrom(F, p.e, p.n), riv = riverAt(data.rivers, path.outlet);
      b.classList.add('is-right'); opts.forEach((o) => { o.disabled = true; });
      msg.className = 'gg-ft-msg is-right';
      msg.innerHTML = `<b>${res.first ? 'Right on the first try. · 第一次就答對。' : 'That is it. · 答對了。'}</b> ${q.why_en} The drop travels about ${Math.round(path.km)} km${riv ? `, down the ${riv.en}` : ''}.<span class="zh">${q.why_zh}這滴雨大約走了 ${Math.round(path.km)} 公里${riv ? `，經過${riv.zh}` : ''}。</span>`;
      next.textContent = game.state.i >= game.total - 1 ? 'See your result · 看結果' : 'Next question · 下一題'; next.hidden = false;
      scEl.textContent = `${game.state.first} / ${game.state.log.length}`;
      [...steps.children][game.state.i].className = res.first ? 'is-first' : 'is-later';
    } else {
      b.classList.add('is-wrong'); b.disabled = true;
      msg.className = 'gg-ft-msg is-wrong';
      msg.innerHTML = `<b>Not quite. Look for the highest ridge. · 不太對，找找最高的山脊。</b> ${data.hint_en}<span class="zh">${data.hint_zh}</span>`;
    }
    return res;
  }
  function goNext() {
    if (game.next()) { show(); return; }
    if (!game.state.done) return;
    const n = game.state.first;
    kEl.textContent = 'Finished · 完成'; optsEl.innerHTML = '';
    $('.gg-dp-name').innerHTML = `You got ${n} of ${game.total} right on the first try.<span class="zh">${game.total} 題裡，你有 ${n} 題第一次就答對。</span>`;
    msg.className = 'gg-ft-msg'; msg.innerHTML = `${data.end_en}<span class="zh">${data.end_zh}</span>`;
    next.textContent = 'Play again · 再玩一次'; next.hidden = false;
  }
  next.addEventListener('click', () => { if (game.state.done) { game.reset(); show(); } else goNext(); });
  new ResizeObserver(() => { if (!game.state.done) map(game.question()); }).observe($('.gg-dp-map'));
  show();
  root.__drop = api();
  function api() { return { game, pick, next: goNext, reset() { game.reset(); show(); } }; }
  return root.__drop;
}
