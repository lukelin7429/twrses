/*
 * 地理 Geography ·「有幾個？要看怎麼算」（不需要 WebGL）：每一題先說用哪一種算法，再問有幾個、或某個地方算哪一洲／哪一洋。
 * 不計時，只記第一次就答對的題數（fit.js）。題目在 data/geography.json 的 count.questions，
 * 答案由 test/regions.test.mjs 用 regions.js 的規則驗算（check：count／where／ocean）。
 * 除錯：document.querySelector('[data-gg-count]').__count（game、pick(值)、next()、reset()）
 */
import { makeFitGame } from './fit.js';
import { getLand } from './land.js';
import { COLORS, NAMES } from './regions.js';
import { drawLand, view } from './map2d.js';

const label = (v) => (NAMES[v] ? { en: NAMES[v].en, zh: NAMES[v].zh } : { en: v, zh: `${v} 個` });

export function initCount(root) {
  const $ = (s) => root.querySelector(s);
  const data = JSON.parse($('script[type="application/json"]').textContent);
  const game = makeFitGame(data.questions);
  const optsEl = $('.gg-ck-opts'), kEl = $('.gg-ft-k'), scEl = $('.gg-ft-score'), msg = $('.gg-ft-msg'), next = $('.gg-ft-next'), steps = $('.gg-ft-steps');
  const mapCv = $('.gg-cn-map'), schemeEl = $('.gg-cn-scheme');
  let land = null;
  steps.innerHTML = data.questions.map(() => '<i></i>').join('');
  function drawMap(q) {
    const w = mapCv.clientWidth; if (!w) return;
    const h = Math.round(w / 2), d = Math.min(window.devicePixelRatio || 1, 2);
    mapCv.width = Math.round(w * d); mapCv.height = Math.round(h * d);
    const c = mapCv.getContext('2d'); c.setTransform(d, 0, 0, d, 0, 0);
    c.fillStyle = '#16335f'; c.fillRect(0, 0, w, h);
    land = land || getLand();
    const v = view('equirect', w, h);
    drawLand(c, land, v.toXY, { fill: '#8fbf7a', stroke: '#5d8f52', lineWidth: 0.6 });
    if (q.pt) {
      const [x, y] = v.toXY(q.pt[0], q.pt[1]);
      c.beginPath(); c.arc(x, y, 9, 0, Math.PI * 2); c.strokeStyle = '#ffd36e'; c.lineWidth = 2.5; c.stroke();
      c.beginPath(); c.arc(x, y, 3.5, 0, Math.PI * 2); c.fillStyle = '#fff'; c.fill();
    }
  }
  function show() {
    const st = game.state, q = game.question();
    kEl.textContent = `Question ${st.i + 1} of ${game.total} · 第 ${st.i + 1} 題（共 ${game.total} 題）`;
    scEl.textContent = `${st.first} / ${st.log.length}`;
    schemeEl.innerHTML = `${q.rule_en}<span class="zh">${q.rule_zh}</span>`;
    mapCv.parentElement.hidden = !q.pt; if (q.pt) drawMap(q);
    $('.gg-ck-q-en').textContent = q.en; $('.gg-ck-q-zh').textContent = q.zh;
    optsEl.innerHTML = q.options.map((o) => { const L = label(o), dot = COLORS[o] ? `<i style="background:${COLORS[o]}"></i>` : ''; return `<button type="button" class="gg-ft-opt gg-ck-opt" data-pick="${o}"><span class="gg-ft-lab">${dot}${L.en}<span class="zh">${L.zh}</span></span></button>`; }).join('');
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
      msg.innerHTML = `<b>Not quite. Try again. · 不太對，再想一次。</b> ${data.hint_en}<span class="zh">${data.hint_zh}</span>`;
    }
    return r;
  }
  function goNext() {
    if (game.next()) { show(); return; }
    if (!game.state.done) return;
    const n = game.state.first;
    $('.gg-ck-q-en').textContent = `You got ${n} of ${game.total} right on the first try.`;
    $('.gg-ck-q-zh').textContent = `${game.total} 題裡，你有 ${n} 題第一次就答對。`;
    kEl.textContent = 'Finished · 完成'; optsEl.innerHTML = ''; mapCv.parentElement.hidden = true; schemeEl.innerHTML = '';
    msg.className = 'gg-ft-msg'; msg.innerHTML = `${data.end_en}<span class="zh">${data.end_zh}</span>`;
    next.textContent = 'Play again · 再玩一次'; next.hidden = false;
  }
  next.addEventListener('click', () => { if (game.state.done) { game.reset(); show(); } else goNext(); });
  new ResizeObserver(() => { const q = game.question(); if (!game.state.done && q.pt) drawMap(q); }).observe(mapCv.parentElement);
  show();
  root.__count = { game, pick, next: goNext, reset() { game.reset(); show(); } };
  return root.__count;
}
