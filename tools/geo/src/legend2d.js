/*
 * 地理 Geography ·「照著地圖找」（不需要 WebGL）：用方位、圖例和比例尺回答八個問題。每一題都要讀地圖才答得出來（不是背符號）。
 * 題目在 data/geography.json 的 legend.questions；答案由 test/town.test.mjs 從地圖資料推出來驗算。不計時，只記第一次就答對的題數。
 * 除錯：document.querySelector('[data-gg-legend]').__legend（game、pick(值)、next()、reset()）
 */
import { makeFitGame } from './fit.js';
import { POINTS } from './town.js';
import { drawBar, drawNorth, drawTownMap } from './townmap2d.js';
import { symbolDataURL } from './symbols.js';

const VIEW = { cx: -0.6, cy: -0.3, km: 10 };

export function initLegend(root) {
  const $ = (s) => root.querySelector(s);
  const data = JSON.parse($('script[type="application/json"]').textContent);
  const game = makeFitGame(data.questions);
  const cv = $('.gg-lg-map'), ctx = cv.getContext('2d'), optsEl = $('.gg-lg-opts');
  const kEl = $('.gg-ft-k'), scEl = $('.gg-ft-score'), msg = $('.gg-ft-msg'), next = $('.gg-ft-next'), steps = $('.gg-ft-steps');
  steps.innerHTML = data.questions.map(() => '<i></i>').join('');
  let base = null, map = null, W = 0, H = 0, dpr = 1, solved = false, t0 = 0, raf = 0;
  function render() {
    W = cv.clientWidth; H = cv.clientHeight; if (!W || !H) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    base = document.createElement('canvas'); base.width = cv.width; base.height = cv.height;
    const b = base.getContext('2d'); b.setTransform(dpr, 0, 0, dpr, 0, 0);
    map = drawTownMap(b, W, H, { view: VIEW, dpr, labels: false });
    drawNorth(b, W - 30, 34); drawBar(b, 14, H - 16, map.pxPerKm, W * 0.3);
    draw();
  }
  function draw(now = performance.now()) {
    if (!base) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.drawImage(base, 0, 0); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (game.state.done) return;
    const q = game.question(), from = POINTS[q.from || q.at || 'trailhead'];
    const [x, y] = map.toXY(from.x, from.y), pulse = (Math.sin((now - t0) / 260) + 1) / 2;
    ctx.beginPath(); ctx.arc(x, y, 16 + pulse * 6, 0, Math.PI * 2); ctx.strokeStyle = `rgba(255,77,138,${0.9 - pulse * 0.5})`; ctx.lineWidth = 3; ctx.stroke();
    ctx.font = '800 11px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.lineWidth = 3; ctx.strokeStyle = '#fff'; ctx.strokeText('START · 起點', x, y - 24); ctx.fillStyle = '#d8336b'; ctx.fillText('START · 起點', x, y - 24);
    if (solved && q.show) {
      const [p, r] = q.show.map((k) => map.toXY(POINTS[k].x, POINTS[k].y));
      ctx.setLineDash([6, 5]); ctx.strokeStyle = '#d8336b'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(r[0], r[1]); ctx.stroke(); ctx.setLineDash([]);
      ctx.beginPath(); ctx.arc(r[0], r[1], 15, 0, Math.PI * 2); ctx.strokeStyle = '#2f9e63'; ctx.lineWidth = 3; ctx.stroke();
    }
  }
  function loop(now) { draw(now); raf = requestAnimationFrame(loop); }
  new IntersectionObserver((ents) => { if (ents[0].isIntersecting) { if (!raf) raf = requestAnimationFrame(loop); } else { cancelAnimationFrame(raf); raf = 0; } }).observe(root);
  const label = (o) => data.labels[o] || { en: o, zh: o };
  function show() {
    const st = game.state, q = game.question();
    solved = false; t0 = performance.now();
    kEl.textContent = `Question ${st.i + 1} of ${game.total} · 第 ${st.i + 1} 題（共 ${game.total} 題）`;
    scEl.textContent = `${st.first} / ${st.log.length}`;
    $('.gg-lg-q-en').textContent = q.en; $('.gg-lg-q-zh').textContent = q.zh;
    optsEl.innerHTML = q.options.map((o) => {
      const L = label(o), img = POINTS[o] ? `<img src="${symbolDataURL(o, 26)}" alt="">` : `<b class="gg-lg-d">${L.icon || ''}</b>`;
      return `<button type="button" class="gg-ft-opt gg-lg-opt" data-pick="${o}">${img}<span class="gg-ft-lab">${L.en}<span class="zh">${L.zh}</span></span></button>`;
    }).join('');
    optsEl.querySelectorAll('[data-pick]').forEach((b) => b.addEventListener('click', () => pick(b.dataset.pick)));
    msg.className = 'gg-ft-msg'; msg.innerHTML = `${data.start_en}<span class="zh">${data.start_zh}</span>`;
    next.hidden = true;
    [...steps.children].forEach((s, i) => { s.className = i < st.log.length ? (st.log[i].first ? 'is-first' : 'is-later') : i === st.i ? 'is-now' : ''; });
    draw();
  }
  function pick(v) {
    const q = game.question(), r = game.answer(String(v) === String(q.answer) ? q.answer : v);
    if (!r) return null;
    const b = optsEl.querySelector(`[data-pick="${v}"]`), opts = [...optsEl.querySelectorAll('[data-pick]')];
    if (r.correct) {
      solved = true; b.classList.add('is-right'); opts.forEach((o) => { o.disabled = true; });
      msg.className = 'gg-ft-msg is-right';
      msg.innerHTML = `<b>${r.first ? 'Right on the first try. · 第一次就答對。' : 'That is it. · 答對了。'}</b> ${q.why_en}<span class="zh">${q.why_zh}</span>`;
      next.textContent = game.state.i >= game.total - 1 ? 'See your result · 看結果' : 'Next question · 下一題'; next.hidden = false;
      scEl.textContent = `${game.state.first} / ${game.state.log.length}`;
      [...steps.children][game.state.i].className = r.first ? 'is-first' : 'is-later';
    } else {
      b.classList.add('is-wrong'); b.disabled = true;
      msg.className = 'gg-ft-msg is-wrong';
      msg.innerHTML = `<b>Not that one. Look at the map again. · 不是這個，再看一次地圖。</b> ${data.hint[q.type].en}<span class="zh">${data.hint[q.type].zh}</span>`;
    }
    draw();
    return r;
  }
  function goNext() {
    if (game.next()) { show(); return; }
    if (!game.state.done) return;
    const n = game.state.first;
    $('.gg-lg-q-en').textContent = `You answered ${n} of ${game.total} questions right on the first try.`;
    $('.gg-lg-q-zh').textContent = `${game.total} 題裡，你有 ${n} 題第一次就答對。`;
    kEl.textContent = 'Finished · 完成'; optsEl.innerHTML = '';
    msg.className = 'gg-ft-msg'; msg.innerHTML = `${data.end_en}<span class="zh">${data.end_zh}</span>`;
    next.textContent = 'Play again · 再玩一次'; next.hidden = false; draw();
  }
  next.addEventListener('click', () => { if (game.state.done) { game.reset(); show(); } else goNext(); });
  new ResizeObserver(render).observe(cv);
  render(); show();
  root.__legend = { game, pick, next: goNext, reset() { game.reset(); show(); } };
  return root.__legend;
}
