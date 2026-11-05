/*
 * 地理 Geography ·「哪裡的太陽比較高？」（不需要 WebGL）：給兩個地方的緯度和季節，判斷哪裡正午的太陽比較高。
 * 不考背誦——用「離太陽直射的緯度越近，太陽越高」來想；答完顯示兩地的正午太陽高度角。
 * 不計時，只記第一次就答對的題數（fit.js）。題目在 data/geography.json 的 sunq.questions，
 * 答案由 test/sunlight.test.mjs 用 noonAltitude 驗算（差不到 1 度算「差不多」）。
 * 除錯：document.querySelector('[data-gg-sunq]').__sunq（game、pick('a'|'b'|'same')、next()、reset()）
 */
import { makeFitGame } from './fit.js';
import { PLACES, SEASONS, noonAltitude } from './sunlight.js';

const SEASON = { march: { en: 'March', zh: '三月' }, june: { en: 'June', zh: '六月' }, december: { en: 'December', zh: '十二月' } };
const latTxt = (l) => ({ en: `${Math.abs(l).toFixed(1)}° ${l >= 0 ? 'N' : 'S'}`, zh: `${l >= 0 ? '北緯' : '南緯'} ${Math.abs(l).toFixed(1)} 度` });

function drawSky(cv, alt) {
  const w = cv.clientWidth, h = cv.clientHeight, d = Math.min(window.devicePixelRatio || 1, 2);
  if (!w || !h) return;
  cv.width = Math.round(w * d); cv.height = Math.round(h * d);
  const c = cv.getContext('2d'); c.setTransform(d, 0, 0, d, 0, 0);
  const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#2c5aa0'); g.addColorStop(1, '#9fc3ee');
  c.fillStyle = g; c.fillRect(0, 0, w, h);
  c.fillStyle = '#4f7a3a'; c.fillRect(0, h - 10, w, 10);
  const r = Math.min(w * 0.42, h - 22), x0 = w / 2, y0 = h - 10;
  c.strokeStyle = 'rgba(255,255,255,.35)'; c.setLineDash([3, 4]); c.beginPath(); c.arc(x0, y0, r, Math.PI, 0); c.stroke(); c.setLineDash([]);
  if (alt == null) return;
  const t = Math.max(0, alt) * Math.PI / 180, sx = x0 - Math.cos(t) * r, sy = y0 - Math.sin(t) * r;
  c.strokeStyle = '#ffd36e'; c.lineWidth = 2; c.beginPath(); c.moveTo(x0, y0); c.lineTo(sx, sy); c.stroke();
  c.fillStyle = '#ffd36e'; c.beginPath(); c.arc(sx, sy, 8, 0, Math.PI * 2); c.fill();
  c.fillStyle = '#fff'; c.font = '700 12px system-ui, sans-serif'; c.textAlign = 'center'; c.fillText(`${alt.toFixed(1)}°`, x0, y0 - 14);
}

export function initSunq(root) {
  const $ = (s) => root.querySelector(s);
  const data = JSON.parse($('script[type="application/json"]').textContent);
  const game = makeFitGame(data.questions);
  const kEl = $('.gg-ft-k'), scEl = $('.gg-ft-score'), msg = $('.gg-ft-msg'), next = $('.gg-ft-next'), steps = $('.gg-ft-steps'), optsEl = $('.gg-ck-opts');
  const cards = { a: $('[data-side="a"]'), b: $('[data-side="b"]') };
  steps.innerHTML = data.questions.map(() => '<i></i>').join('');
  let shown = false;
  function card(side, q) {
    const p = PLACES[q[side]], L = latTxt(p.lat), el = cards[side];
    el.querySelector('.gg-sq-n').innerHTML = `${p.en}<span class="zh">${p.zh}</span>`;
    el.querySelector('.gg-sq-l').innerHTML = `${L.en}<span class="zh">${L.zh}</span>`;
    drawSky(el.querySelector('canvas'), shown ? noonAltitude(p.lat, SEASONS[q.season]) : null);
  }
  function show() {
    const st = game.state, q = game.question(); shown = false;
    kEl.textContent = `Question ${st.i + 1} of ${game.total} · 第 ${st.i + 1} 題（共 ${game.total} 題）`;
    scEl.textContent = `${st.first} / ${st.log.length}`;
    const s = SEASON[q.season], dl = latTxt(SEASONS[q.season]);
    $('.gg-sq-season').innerHTML = `${s.en} at noon: the Sun is overhead at ${SEASONS[q.season] === 0 ? 'the equator' : dl.en}.<span class="zh">${s.zh}的正午：太陽直射${SEASONS[q.season] === 0 ? '赤道' : dl.zh}。</span>`;
    card('a', q); card('b', q);
    const A = PLACES[q.a], B = PLACES[q.b];
    const opts = [['a', A.en, A.zh], ['b', B.en, B.zh], ['same', 'About the same', '差不多']];
    optsEl.innerHTML = opts.map(([k, en, zh]) => `<button type="button" class="gg-ft-opt gg-ck-opt" data-pick="${k}"><span class="gg-ft-lab">${en}<span class="zh">${zh}</span></span></button>`).join('');
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
      shown = true; card('a', q); card('b', q);
      b.classList.add('is-right'); opts.forEach((o) => { o.disabled = true; });
      const d = SEASONS[q.season], A = noonAltitude(PLACES[q.a].lat, d), B = noonAltitude(PLACES[q.b].lat, d);
      msg.className = 'gg-ft-msg is-right';
      msg.innerHTML = `<b>${r.first ? 'Right on the first try. · 第一次就答對。' : 'That is it. · 答對了。'}</b> ${q.why_en} Noon Sun: ${PLACES[q.a].en} ${A.toFixed(1)}°, ${PLACES[q.b].en} ${B.toFixed(1)}°.<span class="zh">${q.why_zh}正午太陽高度：${PLACES[q.a].zh} ${A.toFixed(1)} 度、${PLACES[q.b].zh} ${B.toFixed(1)} 度。</span>`;
      next.textContent = game.state.i >= game.total - 1 ? 'See your result · 看結果' : 'Next question · 下一題'; next.hidden = false;
      scEl.textContent = `${game.state.first} / ${game.state.log.length}`;
      [...steps.children][game.state.i].className = r.first ? 'is-first' : 'is-later';
    } else {
      b.classList.add('is-wrong'); b.disabled = true;
      msg.className = 'gg-ft-msg is-wrong';
      msg.innerHTML = `<b>Not quite. Try again. · 不太對，再想一次。</b> ${data.hint_en}<span class="zh">${data.hint_zh}</span>`;
    }
    return r;
  }
  function goNext() {
    if (game.next()) { show(); return; }
    if (!game.state.done) return;
    const n = game.state.first;
    kEl.textContent = 'Finished · 完成'; optsEl.innerHTML = '';
    $('.gg-sq-season').innerHTML = `You got ${n} of ${game.total} right on the first try.<span class="zh">${game.total} 題裡，你有 ${n} 題第一次就答對。</span>`;
    msg.className = 'gg-ft-msg'; msg.innerHTML = `${data.end_en}<span class="zh">${data.end_zh}</span>`;
    next.textContent = 'Play again · 再玩一次'; next.hidden = false;
  }
  next.addEventListener('click', () => { if (game.state.done) { game.reset(); show(); } else goNext(); });
  new ResizeObserver(() => { if (!game.state.done) { const q = game.question(); card('a', q); card('b', q); } }).observe(cards.a);
  show();
  root.__sunq = { game, pick, next: goNext, reset() { game.reset(); show(); } };
  return root.__sunq;
}
