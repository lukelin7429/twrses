/*
 * 地理 Geography ·「哪一條路比較陡？」（不需要 WebGL）：一張等高線地圖上兩條路線 A、B，回答比較陡／比較好走／爬得比較高／總共要爬多少。
 * 答完以後把兩條路線的剖面疊在同一張圖上對答案。八題、不計時，只記第一次就答對的題數（fit.js 的計分）。
 * 題目在 data/geography.json 的 steep.questions（a、b 是兩個端點，單位公里；答案由 test/terrain.test.mjs 用 terrain.js 驗算）。
 * 除錯：document.querySelector('[data-gg-steep]').__steep（game.state、pick('a'|'b')、next()、reset()）
 */
import { makeFitGame } from './fit.js';
import { profile, sampleGrid } from './terrain.js';
import { drawContourMap, drawProfile } from './contourmap2d.js';

const COL = { a: '#ff5a5a', b: '#4fb7ff' };

export function initSteep(root, M) {
  const $ = (s) => root.querySelector(s);
  const data = JSON.parse($('script[type="application/json"]').textContent);
  const game = makeFitGame(data.questions);
  const grid = sampleGrid(M.h, M.box, 161);
  const cv = $('.gg-st-map'), ctx = cv.getContext('2d'), pcv = $('.gg-st-prof'), pctx = pcv.getContext('2d');
  const kEl = $('.gg-ft-k'), scEl = $('.gg-ft-score'), msg = $('.gg-ft-msg'), next = $('.gg-ft-next'), steps = $('.gg-ft-steps');
  const opts = [...root.querySelectorAll('[data-pick]')];
  steps.innerHTML = data.questions.map(() => '<i></i>').join('');
  let base = null, map = null, W = 0, H = 0, dpr = 1, reveal = false;
  function resize() {
    W = cv.clientWidth; H = cv.clientHeight; if (!W || !H) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    base = document.createElement('canvas'); base.width = cv.width; base.height = cv.height;
    const b = base.getContext('2d'); b.setTransform(dpr, 0, 0, dpr, 0, 0);
    map = drawContourMap(b, W, H, { M, grid, interval: 100, dpr });
    draw();
  }
  function arrow(a, b, color, label) {
    const [ax, ay] = map.toXY(...a), [bx, by] = map.toXY(...b), ang = Math.atan2(by - ay, bx - ax);
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
    ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.stroke();
    ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx - 11 * Math.cos(ang - 0.45), by - 11 * Math.sin(ang - 0.45)); ctx.lineTo(bx - 11 * Math.cos(ang + 0.45), by - 11 * Math.sin(ang + 0.45)); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.arc(ax, ay, 9, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.font = '800 11px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText(label, ax, ay + 4);
  }
  function draw() {
    if (!base) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.drawImage(base, 0, 0); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (game.state.done) return;
    const q = game.question();
    arrow(q.a[0], q.a[1], COL.a, 'A'); arrow(q.b[0], q.b[1], COL.b, 'B');
    const pw = pcv.clientWidth, ph = pcv.clientHeight;
    pcv.width = Math.round(pw * dpr); pcv.height = Math.round(ph * dpr); pctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (reveal) drawProfile(pctx, pw, ph, [{ pts: profile(M.h, q.a[0], q.a[1], 120), color: COL.a }, { pts: profile(M.h, q.b[0], q.b[1], 120), color: COL.b }]);
    else { pctx.clearRect(0, 0, pw, ph); pctx.fillStyle = '#9fb0cf'; pctx.font = '600 12px system-ui, sans-serif'; pctx.textAlign = 'center'; pctx.fillText('The side views of both paths appear here after you answer. · 回答後，這裡會畫出兩條路線的側面。', pw / 2, ph / 2, pw - 20); }
  }
  function show() {
    const st = game.state, q = game.question();
    reveal = false;
    kEl.textContent = `Question ${st.i + 1} of ${game.total} · 第 ${st.i + 1} 題（共 ${game.total} 題）`;
    scEl.textContent = `${st.first} / ${st.log.length}`;
    $('.gg-st-q-en').textContent = q.en; $('.gg-st-q-zh').textContent = q.zh;
    opts.forEach((b) => { b.disabled = false; b.classList.remove('is-right', 'is-wrong'); });
    msg.className = 'gg-ft-msg'; msg.innerHTML = `${data.start_en}<span class="zh">${data.start_zh}</span>`;
    next.hidden = true;
    [...steps.children].forEach((s, i) => { s.className = i < st.log.length ? (st.log[i].first ? 'is-first' : 'is-later') : i === st.i ? 'is-now' : ''; });
    draw();
  }
  function pick(key) {
    const q = game.question(), r = game.answer(key);
    if (!r) return null;
    const b = opts.find((o) => o.dataset.pick === key);
    if (r.correct) {
      reveal = true;
      b.classList.add('is-right'); opts.forEach((o) => { o.disabled = true; });
      msg.className = 'gg-ft-msg is-right';
      msg.innerHTML = `<b>${r.first ? 'Right on the first try. · 第一次就答對。' : 'That is the one. · 就是這一條。'}</b> ${q.why_en}<span class="zh">${q.why_zh}</span>`;
      next.textContent = game.state.i >= game.total - 1 ? 'See your result · 看結果' : 'Next question · 下一題'; next.hidden = false;
      scEl.textContent = `${game.state.first} / ${game.state.log.length}`;
      [...steps.children][game.state.i].className = r.first ? 'is-first' : 'is-later';
    } else {
      b.classList.add('is-wrong'); b.disabled = true;
      msg.className = 'gg-ft-msg is-wrong';
      msg.innerHTML = `<b>Not this one. Look again. · 不是這一條，再看看。</b> ${data.hint[q.ask].en}<span class="zh">${data.hint[q.ask].zh}</span>`;
    }
    draw();
    return r;
  }
  function goNext() {
    if (game.next()) { show(); return; }
    if (!game.state.done) return;
    const n = game.state.first;
    $('.gg-st-q-en').textContent = `You chose the right path on the first try for ${n} of ${game.total} questions.`;
    $('.gg-st-q-zh').textContent = `${game.total} 題裡，你有 ${n} 題第一次就選對。`;
    kEl.textContent = 'Finished · 完成';
    opts.forEach((b) => { b.disabled = true; b.classList.remove('is-right', 'is-wrong'); });
    msg.className = 'gg-ft-msg'; msg.innerHTML = `${data.end_en}<span class="zh">${data.end_zh}</span>`;
    next.textContent = 'Play again · 再玩一次'; next.hidden = false;
    draw(); pctx.clearRect(0, 0, pcv.width, pcv.height);
  }
  opts.forEach((b) => b.addEventListener('click', () => pick(b.dataset.pick)));
  next.addEventListener('click', () => { if (game.state.done) { game.reset(); show(); } else goNext(); });
  new ResizeObserver(resize).observe(cv);
  resize(); show();
  root.__steep = { game, pick, next: goNext, reset() { game.reset(); show(); } };
  return root.__steep;
}
