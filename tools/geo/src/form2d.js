/*
 * 地理 Geography ·「這是哪一種地形？」（不需要 WebGL）：給台灣上的一個點（地圖上的紅點）、那裡的海拔、四個方向 6–12 公里外的平均海拔，
 * 和一段東西向的剖面，推理是山地、台地、盆地、平原還是縱谷；答完才顯示地名。不考背誦。
 * 不計時，只記第一次就答對的題數（fit.js）。題目在 data/geography.json 的 forms.questions（{ place, answer, why_en, why_zh }），
 * 答案由 test/taiwan.test.mjs 用 taiwan.js 的 landform() 驗算。
 * 除錯：document.querySelector('[data-gg-form]').__form（game、pick(key)、next()、reset()）
 */
import { makeFitGame } from './fit.js';
import { around, getTaiwan, heightAt } from './taiwan.js';
import { drawCut, drawTaiwan } from './twmap2d.js';

export const FORMS = {
  mountain: { en: 'Mountains', zh: '山地' },
  tableland: { en: 'Tableland', zh: '台地' },
  basin: { en: 'Basin', zh: '盆地' },
  plain: { en: 'Plain', zh: '平原' },
  valley: { en: 'Longitudinal valley', zh: '縱谷' },
};

export function initForm(root) {
  const $ = (s) => root.querySelector(s);
  const data = JSON.parse($('script[type="application/json"]').textContent);
  const T = getTaiwan(), game = makeFitGame(data.questions);
  const kEl = $('.gg-ft-k'), scEl = $('.gg-ft-score'), msg = $('.gg-ft-msg'), next = $('.gg-ft-next'), steps = $('.gg-ft-steps'), optsEl = $('.gg-ck-opts');
  steps.innerHTML = data.questions.map(() => '<i></i>').join('');
  const fit = (cv) => { const w = cv.clientWidth, h = cv.clientHeight, d = Math.min(window.devicePixelRatio || 1, 2); if (!w || !h) return null; cv.width = Math.round(w * d); cv.height = Math.round(h * d); const c = cv.getContext('2d'); c.setTransform(d, 0, 0, d, 0, 0); return { c, w, h }; };
  const r = (x) => (Number.isNaN(x) ? '—' : `${Math.round(x).toLocaleString('en-US')} m`);
  function pictures(q) {
    const p = T.places[q.place];
    const m = fit($('.gg-fm-map'));
    if (m) { const map = drawTaiwan(m.c, m.w, m.h, T); const [x, y] = map.toXY(p.e, p.n); m.c.fillStyle = '#ff4d4d'; m.c.strokeStyle = '#fff'; m.c.lineWidth = 2; m.c.beginPath(); m.c.arc(x, y, 6, 0, Math.PI * 2); m.c.fill(); m.c.stroke(); }
    const g = fit($('.gg-fm-cut'));
    if (g) {
      const pts = []; for (let e = p.e - 25; e <= p.e + 25; e += 0.25) pts.push({ e, z: heightAt(T, e, p.n) });
      const zMax = Math.max(500, ...pts.filter((q2) => !Number.isNaN(q2.z)).map((q2) => q2.z)) * 1.15;
      drawCut(g.c, g.w, g.h, pts, { exag: 10, e0: p.e - 25, e1: p.e + 25, zMax, mark: { e: p.e, z: heightAt(T, p.e, p.n) } });
    }
  }
  function show() {
    const st = game.state, q = game.question(), p = T.places[q.place], a = around(T, p.e, p.n);
    kEl.textContent = `Question ${st.i + 1} of ${game.total} · 第 ${st.i + 1} 題（共 ${game.total} 題）`;
    scEl.textContent = `${st.first} / ${st.log.length}`;
    $('.gg-fm-name').innerHTML = `The red dot<span class="zh">紅點這個地方</span>`;
    $('.gg-fm-here').textContent = r(a.here);
    for (const k of ['N', 'S', 'E', 'W']) $(`.gg-fm-${k}`).textContent = r(a[k]);
    optsEl.innerHTML = Object.entries(FORMS).map(([k, f]) => `<button type="button" class="gg-ft-opt gg-ck-opt" data-pick="${k}"><span class="gg-ft-lab">${f.en}<span class="zh">${f.zh}</span></span></button>`).join('');
    optsEl.querySelectorAll('[data-pick]').forEach((b) => b.addEventListener('click', () => pick(b.dataset.pick)));
    msg.className = 'gg-ft-msg'; msg.innerHTML = `${data.start_en}<span class="zh">${data.start_zh}</span>`;
    next.hidden = true;
    [...steps.children].forEach((x, i) => { x.className = i < st.log.length ? (st.log[i].first ? 'is-first' : 'is-later') : i === st.i ? 'is-now' : ''; });
    pictures(q);
  }
  function pick(v) {
    const q = game.question(), res = game.answer(v);
    if (!res) return null;
    const b = optsEl.querySelector(`[data-pick="${v}"]`), opts = [...optsEl.querySelectorAll('[data-pick]')];
    if (res.correct) {
      b.classList.add('is-right'); opts.forEach((o) => { o.disabled = true; });
      $('.gg-fm-name').innerHTML = `${q.name_en}<span class="zh">${q.name_zh}</span>`;
      msg.className = 'gg-ft-msg is-right';
      msg.innerHTML = `<b>${res.first ? 'Right on the first try. · 第一次就答對。' : 'That is it. · 答對了。'}</b> ${q.why_en}<span class="zh">${q.why_zh}</span>`;
      next.textContent = game.state.i >= game.total - 1 ? 'See your result · 看結果' : 'Next question · 下一題'; next.hidden = false;
      scEl.textContent = `${game.state.first} / ${game.state.log.length}`;
      [...steps.children][game.state.i].className = res.first ? 'is-first' : 'is-later';
    } else {
      b.classList.add('is-wrong'); b.disabled = true;
      msg.className = 'gg-ft-msg is-wrong';
      msg.innerHTML = `<b>Not quite. Look at the numbers again. · 不太對，再看一次數字。</b> ${data.hint_en}<span class="zh">${data.hint_zh}</span>`;
    }
    return res;
  }
  function goNext() {
    if (game.next()) { show(); return; }
    if (!game.state.done) return;
    const n = game.state.first;
    kEl.textContent = 'Finished · 完成'; optsEl.innerHTML = '';
    $('.gg-fm-name').innerHTML = `You got ${n} of ${game.total} right on the first try.<span class="zh">${game.total} 題裡，你有 ${n} 題第一次就答對。</span>`;
    msg.className = 'gg-ft-msg'; msg.innerHTML = `${data.end_en}<span class="zh">${data.end_zh}</span>`;
    next.textContent = 'Play again · 再玩一次'; next.hidden = false;
  }
  next.addEventListener('click', () => { if (game.state.done) { game.reset(); show(); } else goNext(); });
  new ResizeObserver(() => { if (!game.state.done) pictures(game.question()); }).observe($('.gg-fm-pics'));
  show();
  root.__form = { game, pick, next: goNext, reset() { game.reset(); show(); } };
  return root.__form;
}
