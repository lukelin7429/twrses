/*
 * 地理 Geography ·「這裡適合蓋城市嗎？」（不需要 WebGL）：台灣小地圖上一個紅點，條件卡（海拔、地面平不平、附近有沒有大河）
 * 由地形資料算出來（四周的高低差看 6–12 公里外，「這裡平不平」看 2 公里內）；推理那裡住的人多、普通還是很少，答完用人口格網對答案（半徑 5 公里內的人數與密度）。
 * 地名答完才出現（先看地形想一想，不是考地名）。不計時，只記第一次就答對的題數（fit.js）。
 * 題目在 data/geography.json 的 city.questions（{ place 或 e、n, name_en, name_zh, answer, why_en, why_zh }），
 * 答案由 test/twpop.test.mjs 用 near()＋verdict() 驗算。
 * 除錯：document.querySelector('[data-gg-city]').__city（game、pick('many'|'some'|'few')、next()、reset()、clues(q)）
 */
import { makeFitGame } from './fit.js';
import { around, getTaiwan, heightAt } from './taiwan.js';
import { getFlow } from './flow.js';
import { drawTaiwan } from './twmap2d.js';
import { getTwPop, near } from './twpop.js';

export const BIG_RIVER = 300;   // 集水面積 300 平方公里以上算「大河」
export const R = 5;             // 對答案用的半徑（公里）

/** 條件卡：全部由資料算（海拔、四方向 6–12 公里外和這裡差多少、4 公里內有沒有大河） */
export function clues(T, F, e, n) {
  const z = heightAt(T, e, n), a = around(T, e, n);
  const ring = ['E', 'W', 'N', 'S'].map((k) => a[k]).filter((v) => !Number.isNaN(v));
  const relief = ring.length ? Math.max(...ring.map((v) => Math.abs(v - z))) : 0;
  const up = ring.length ? Math.max(0, ...ring.map((v) => v - z)) : 0, down = ring.length ? Math.max(0, ...ring.map((v) => z - v)) : 0;
  let river = 0;
  for (let y = -4; y <= 4; y++) for (let x = -4; x <= 4; x++) {
    if (Math.hypot(x, y) > 4) continue;
    const j = Math.floor(e - T.e0) + x, i = Math.floor(n - T.n0) + y;
    if (i < 0 || j < 0 || i >= T.ny || j >= T.nx) continue;
    river = Math.max(river, F.acc[i * T.nx + j] || 0);
  }
  const loc = [[2, 0], [-2, 0], [0, 2], [0, -2]].map(([x, y]) => heightAt(T, e + x, n + y)).filter((v) => !Number.isNaN(v)).map((v) => Math.abs(v - z));
  const local = loc.length ? Math.max(...loc) : 0;     // 2 公里內的高低差：盆地、縱谷的底部是平的
  return { z, relief, up, down, local, river, big: river >= BIG_RIVER };
}

const r10 = (v) => (Math.round(v / 10) * 10).toLocaleString('en-US');
function chips(c) {
  const z = Math.round(c.z / 10) * 10, rel = Math.round(c.relief / 10) * 10;
  const h = c.z < 100 ? 'good' : c.z >= 1000 ? 'hard' : 'mid';
  const shape = c.relief < 100 ? { icon: '▭', en: 'Flat land all around', zh: '四周都是平地', tone: 'good' }
    : c.local <= 50 && c.up >= 100 ? { icon: '◡', en: `Flat here, with land up to ${r10(c.up)} m higher around it`, zh: `這裡是平地，四周有高出 ${r10(c.up)} 公尺的山`, tone: 'good' }
    : c.local <= 50 && c.down >= 100 ? { icon: '▭', en: `Flat high ground: the land drops up to ${r10(c.down)} m around it`, zh: `高起來的平地：四周低下去 ${r10(c.down)} 公尺`, tone: 'good' }
    : c.relief < 600 ? { icon: '⌒', en: `Hills: up to ${rel.toLocaleString('en-US')} m higher or lower nearby`, zh: `丘陵：附近高低差到 ${rel.toLocaleString('en-US')} 公尺`, tone: 'mid' }
      : { icon: '⛰', en: `Steep: up to ${rel.toLocaleString('en-US')} m higher or lower nearby`, zh: `很陡：附近高低差到 ${rel.toLocaleString('en-US')} 公尺`, tone: 'hard' };
  return [
    c.z < 10 ? { icon: '↥', en: 'Less than 10 m above sea level', zh: '海拔不到 10 公尺', tone: h } : { icon: '↥', en: `About ${z.toLocaleString('en-US')} m above sea level`, zh: `海拔大約 ${z.toLocaleString('en-US')} 公尺`, tone: h },
    shape,
    c.big ? { icon: '〰', en: 'A big river close by', zh: '附近有大河', tone: 'good' } : { icon: '·', en: 'No big river close by', zh: '附近沒有大河', tone: 'mid' },
  ];
}

const OPTS = [['many', 'Many people', '人很多', 'more than 1,000 people per km²', '每平方公里超過 1,000 人'], ['some', 'Some people', '人不多也不少', '100 to 1,000 people per km²', '每平方公里 100～1,000 人'], ['few', 'Few people', '人很少', 'fewer than 100 people per km²', '每平方公里不到 100 人']];

export function initCity(root) {
  const $ = (s) => root.querySelector(s);
  const data = JSON.parse($('script[type="application/json"]').textContent);
  const T = getTaiwan(), F = getFlow(), P = getTwPop(), game = makeFitGame(data.questions);
  const kEl = $('.gg-ft-k'), scEl = $('.gg-ft-score'), msg = $('.gg-ft-msg'), next = $('.gg-ft-next'), steps = $('.gg-ft-steps'), optsEl = $('.gg-ck-opts');
  steps.innerHTML = data.questions.map(() => '<i></i>').join('');
  const at = (q) => T.places[q.place] || q;
  let shown = false;
  function map(q) {
    const cv = $('.gg-dp-map'), w = cv.clientWidth, h = cv.clientHeight, d = Math.min(window.devicePixelRatio || 1, 2);
    if (!w || !h) return;
    cv.width = Math.round(w * d); cv.height = Math.round(h * d); const c = cv.getContext('2d'); c.setTransform(d, 0, 0, d, 0, 0);
    const m = drawTaiwan(c, w, h, T), p = at(q), [x, y] = m.toXY(p.e, p.n);
    if (shown) { c.strokeStyle = '#ffd36e'; c.lineWidth = 2; c.beginPath(); c.arc(x, y, Math.max(11, R * m.scale), 0, Math.PI * 2); c.stroke(); }
    c.fillStyle = '#ff4d4d'; c.strokeStyle = '#fff'; c.lineWidth = 2; c.beginPath(); c.arc(x, y, 6, 0, Math.PI * 2); c.fill(); c.stroke();
  }
  function show() {
    const st = game.state, q = game.question(), p = at(q); shown = false;
    kEl.textContent = `Question ${st.i + 1} of ${game.total} · 第 ${st.i + 1} 題（共 ${game.total} 題）`;
    scEl.textContent = `${st.first} / ${st.log.length}`;
    $('.gg-dp-name').innerHTML = `Place ${st.i + 1}<span class="zh">第 ${st.i + 1} 個地方</span>`;
    $('.gg-wh-chips').innerHTML = chips(clues(T, F, p.e, p.n)).map((c) => `<li class="is-${c.tone}"><span aria-hidden="true">${c.icon}</span><b>${c.en}</b><span class="zh">${c.zh}</span></li>`).join('');
    $('.gg-wh-data').hidden = true;
    optsEl.innerHTML = OPTS.map(([k, en, zh, s, sz]) => `<button type="button" class="gg-ft-opt gg-ck-opt" data-pick="${k}"><span class="gg-ft-lab">${en}<span class="zh">${zh}</span><small>${s}<br>${sz}</small></span></button>`).join('');
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
      const p = at(q), r = near(T, P, p.e, p.n, R), ppl = Math.round(r.people / 1000) * 1000, den = r.density >= 1000 ? Math.round(r.density / 100) * 100 : Math.round(r.density);
      $('.gg-dp-name').innerHTML = `${q.name_en}<span class="zh">${q.name_zh}</span>`;
      const d = $('.gg-wh-data'); d.hidden = false;
      d.innerHTML = `The data: about ${ppl ? ppl.toLocaleString('en-US') : 'fewer than 1,000'} people live within ${R} km of the dot, ${den.toLocaleString('en-US')} per km² (${data.year} estimate).<span class="zh">資料：紅點方圓 ${R} 公里內大約住了 ${ppl ? ppl.toLocaleString('en-US') : '不到一千'} 人，每平方公里 ${den.toLocaleString('en-US')} 人（${data.year} 年推估）。</span>`;
      b.classList.add('is-right'); opts.forEach((o) => { o.disabled = true; });
      msg.className = 'gg-ft-msg is-right';
      msg.innerHTML = `<b>${res.first ? 'Right on the first try. · 第一次就答對。' : 'That is it. · 答對了。'}</b> ${q.why_en}<span class="zh">${q.why_zh}</span>`;
      next.textContent = game.state.i >= game.total - 1 ? 'See your result · 看結果' : 'Next question · 下一題'; next.hidden = false;
      scEl.textContent = `${game.state.first} / ${game.state.log.length}`;
      [...steps.children][game.state.i].className = res.first ? 'is-first' : 'is-later';
    } else {
      b.classList.add('is-wrong'); b.disabled = true;
      msg.className = 'gg-ft-msg is-wrong';
      msg.innerHTML = `<b>Not quite. Look at the cards again. · 不太對，再看一次條件卡。</b> ${data.hint_en}<span class="zh">${data.hint_zh}</span>`;
    }
    return res;
  }
  function goNext() {
    if (game.next()) { show(); return; }
    if (!game.state.done) return;
    const n = game.state.first;
    kEl.textContent = 'Finished · 完成'; optsEl.innerHTML = ''; $('.gg-wh-chips').innerHTML = ''; $('.gg-wh-data').hidden = true;
    $('.gg-dp-name').innerHTML = `You got ${n} of ${game.total} right on the first try.<span class="zh">${game.total} 題裡，你有 ${n} 題第一次就答對。</span>`;
    msg.className = 'gg-ft-msg'; msg.innerHTML = `${data.end_en}<span class="zh">${data.end_zh}</span>`;
    next.textContent = 'Play again · 再玩一次'; next.hidden = false;
  }
  next.addEventListener('click', () => { if (game.state.done) { game.reset(); show(); } else goNext(); });
  new ResizeObserver(() => { if (!game.state.done) map(game.question()); }).observe($('.gg-dp-map'));
  show();
  root.__city = { game, pick, next: goNext, reset() { game.reset(); show(); }, clues: (q) => { const p = at(q); return clues(T, F, p.e, p.n); } };
  return root.__city;
}
