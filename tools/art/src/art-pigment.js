/*
 * 美術 Art · 第九課〈顏料的顏色從哪裡來？〉：選一種色粉、再選一種黏著劑，桌上的紙條就塗出那種顏料（沒有 3D；畫在 2D canvas 上）。
 *
 * 色塊的顏色由 pigment.js 的 swatch() 算（示意模型）；紙條中間有一條黑線，看顏料蓋不蓋得住它。
 * 色覺差異：每張色粉卡都有名稱、來源的記號（▲ 土和礦石、● 生物、■ 工廠）和文字；結果用文字寫出「是哪一種顏料」與黑線透出多少。
 *
 * 除錯：document.querySelector('[data-artpigment-lab]').__lab
 *   state、setPigment(key)、setBinder(key)、expect(overInk)＝公式算的 [r, g, b]（0–255）、pixel(overInk)＝canvas 上實際的像素、demo('same'|'sources'|'cover'|'blues')
 * 小互動：[data-ar-origin].__origin（round()、answer(origin)、correct()、next()）、[data-ar-binder].__binder（round()、answer(key)、next()）
 */
import { css, to255 } from './color.js';
import { BINDERS, BINDER_ROUNDS, INK, ORIGINS, ORIGIN_ROUNDS, PAPER, PIGMENTS, binderOf, paintName, pigmentOf, showThrough, swatch } from './pigment.js';

const bi = (en, zh) => `${en}<span class="zh">${zh}</span>`;
const W = 800, H = 480;
// 紙條與黑線、色塊的位置（canvas 的邏輯座標）
const STRIP = { x: 430, y: 70, w: 320, h: 340 };
const LINE = { y: 220, h: 46 };
const SWATCH = { x: 470, y: 110, w: 240, h: 260 };

function drawBench(cv, pKey, bKey) {
  const k = Math.min(2, Math.max(1, Math.round(window.devicePixelRatio || 1)));
  if (cv.width !== W * k) { cv.width = W * k; cv.height = H * k; }
  const ctx = cv.getContext('2d');
  ctx.setTransform(k, 0, 0, k, 0, 0);
  ctx.fillStyle = '#2a2622'; ctx.fillRect(0, 0, W, H);                         // 木頭桌面
  ctx.fillStyle = 'rgba(255,255,255,.05)'; for (let i = 0; i < 9; i++) ctx.fillRect(0, 30 + i * 52, W, 2);
  const p = pigmentOf(pKey), b = binderOf(bKey);
  // 左邊：玻璃板上的一堆色粉
  ctx.fillStyle = 'rgba(220,235,240,.18)'; ctx.strokeStyle = 'rgba(220,235,240,.5)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.roundRect(40, 250, 330, 170, 14); ctx.fill(); ctx.stroke();
  ctx.fillStyle = css(p.rgb);
  ctx.beginPath(); ctx.moveTo(80, 380); ctx.quadraticCurveTo(150, 250, 215, 300); ctx.quadraticCurveTo(250, 330, 280, 380); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.beginPath(); ctx.ellipse(180, 384, 110, 10, 0, 0, Math.PI * 2); ctx.fill();
  // 黏著劑（瓶子或蛋）
  ctx.save(); ctx.translate(205, 70);
  if (bKey === 'egg') {
    ctx.fillStyle = '#f4efe2'; ctx.beginPath(); ctx.ellipse(0, 70, 50, 62, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f2b51f'; ctx.beginPath(); ctx.arc(0, 78, 26, 0, Math.PI * 2); ctx.fill();
  } else {
    const liquid = { gum: '#e7d9a8', oil: '#d9b44a', acrylic: '#f2f2ee' }[bKey];
    ctx.fillStyle = 'rgba(230,240,245,.25)'; ctx.strokeStyle = 'rgba(230,240,245,.7)'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(-38, 20, 76, 120, 12); ctx.fill(); ctx.stroke();
    ctx.fillStyle = liquid; ctx.beginPath(); ctx.roundRect(-34, 60, 68, 76, 10); ctx.fill();
    ctx.fillStyle = '#6b5a40'; ctx.fillRect(-16, 2, 32, 20);
  }
  ctx.restore();
  ctx.fillStyle = '#ffd36e'; ctx.font = "800 44px system-ui, sans-serif"; ctx.textAlign = 'center'; ctx.fillText('+', 300, 150);
  ctx.fillText('→', 395, 250);
  // 右邊：紙條、黑線、塗上去的顏料
  ctx.fillStyle = css(PAPER); ctx.fillRect(STRIP.x, STRIP.y, STRIP.w, STRIP.h);
  ctx.fillStyle = css(INK); ctx.fillRect(STRIP.x, LINE.y, STRIP.w, LINE.h);
  ctx.save();
  // 色塊的邊緣做成筆刷刷過的樣子（波浪的上下緣、斜斜的起筆和收筆）；取樣點都在內部
  ctx.beginPath();
  const { x, y, w, h } = SWATCH;
  ctx.moveTo(x + 14, y + 6);
  for (let i = 1; i <= 12; i++) ctx.lineTo(x + 14 + ((w - 24) * i) / 12, y + 6 + (i % 2 ? -5 : 4));
  ctx.quadraticCurveTo(x + w + 6, y + h / 2, x + w - 6, y + h - 4);
  for (let i = 12; i >= 0; i--) ctx.lineTo(x + 6 + ((w - 18) * i) / 12, y + h - 4 + (i % 2 ? 5 : -3));
  ctx.quadraticCurveTo(x - 8, y + h / 2, x + 14, y + 6);
  ctx.clip();
  ctx.fillStyle = css(swatch(pKey, bKey, false)); ctx.fillRect(SWATCH.x - 10, SWATCH.y - 10, SWATCH.w + 20, SWATCH.h + 20);
  ctx.fillStyle = css(swatch(pKey, bKey, true)); ctx.fillRect(SWATCH.x - 10, LINE.y, SWATCH.w + 20, LINE.h);
  if (b.gloss) {                                                                  // 光澤：一道斜斜的亮光（避開取樣的地方）
    const g = ctx.createLinearGradient(SWATCH.x, SWATCH.y, SWATCH.x + 70, SWATCH.y + 70);
    g.addColorStop(0, `rgba(255,255,255,${b.gloss})`); g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g; ctx.fillRect(SWATCH.x, SWATCH.y, 70, 70);
  }
  ctx.restore();
}

function initLab(root) {
  const $ = (s) => root.querySelector(s), $$ = (s) => Array.from(root.querySelectorAll(s));
  const cv = $('.ar-pg-cv');
  const R = { result: $('.ar-pg-result'), card: $('.ar-pg-card'), msg: $('.ar-msg'), cover: $('.ar-pg-cover') };
  const state = { pigment: 'ochre', binder: 'gum' };
  // 色粉卡與黏著劑的按鈕由資料產生（名稱、來源記號、示意色塊都有文字）
  $('.ar-pg-pigs').innerHTML = PIGMENTS.map((p) => `<button type="button" data-pigment="${p.key}" aria-pressed="false"><i class="ar-pg-dot" style="background:${css(p.rgb)}" aria-hidden="true"></i><b>${p.en}</b><small>${p.zh}</small><em>${ORIGINS[p.origin].mark} ${ORIGINS[p.origin].en} · ${ORIGINS[p.origin].zh}${p.toxic ? ' · ⚠' : ''}</em></button>`).join('');
  $('.ar-pg-binds').innerHTML = BINDERS.map((b) => `<button type="button" data-binder="${b.key}" aria-pressed="false"><b>${b.en}</b><small>${b.zh} → ${b.paint.en} · ${b.paint.zh}</small></button>`).join('');
  const say = (en, zh) => { R.msg.innerHTML = bi(en, zh); };
  function render() {
    drawBench(cv, state.pigment, state.binder);
    const p = pigmentOf(state.pigment), b = binderOf(state.binder), o = ORIGINS[p.origin], n = paintName(state.binder);
    $$('[data-pigment]').forEach((x) => x.setAttribute('aria-pressed', String(x.getAttribute('data-pigment') === state.pigment)));
    $$('[data-binder]').forEach((x) => x.setAttribute('aria-pressed', String(x.getAttribute('data-binder') === state.binder)));
    R.result.innerHTML = bi(`${p.en} + ${b.en} = ${n.en}`, `${p.zh}＋${b.zh}＝${n.zh}`);
    R.card.innerHTML = `<p class="ar-pg-ck"><span aria-hidden="true">${o.mark}</span> ${o.en} · ${o.zh}${p.toxic ? ' <b>⚠ toxic · 有毒</b>' : ''}</p>`
      + `<p>${p.src_en || ''}<span class="zh">${p.src_zh || ''}</span></p>`;
    const st = Math.round(showThrough(state.binder) * 100);
    R.cover.innerHTML = bi(`The black line shows through about ${st}% in this model.`, `在這個模型裡，黑線大約透出 ${st}%。`);
    cv.setAttribute('aria-label', `${p.en} mixed with ${b.en} makes ${n.en}, painted over a black line · ${p.zh}加${b.zh}成了${n.zh}，塗在一條黑線上`);
  }
  function setPigment(k) { if (!pigmentOf(k)) return; state.pigment = k; render(); }
  function setBinder(k) { if (!binderOf(k)) return; state.binder = k; render(); }
  $$('[data-pigment]').forEach((x) => x.addEventListener('click', () => { stop(); setPigment(x.getAttribute('data-pigment')); const p = pigmentOf(state.pigment); say(`${p.en}: ${p.src_en || ''}`, `${p.zh}：${p.src_zh || ''}`); }));
  $$('[data-binder]').forEach((x) => x.addEventListener('click', () => {
    stop(); setBinder(x.getAttribute('data-binder'));
    const b = binderOf(state.binder); say(b.note_en || `${b.en} turns the powder into ${b.paint.en.toLowerCase()}.`, b.note_zh || `${b.zh}讓色粉變成${b.paint.zh}。`);
  }));
  window.addEventListener('resize', render);

  let timers = [];
  const stop = () => { timers.forEach(clearTimeout); timers = []; };
  const play = (list) => { stop(); timers = list.map((s) => setTimeout(s.fn, s.at * 1000)); };
  const DEMO = {
    same() {
      setPigment('ochre'); setBinder('gum');
      say('The same yellow ochre powder, with four different binders. Watch the name of the paint change.', '同樣的土黃色粉，配上四種不同的黏著劑。看顏料的名字怎麼變。');
      play(BINDERS.slice(1).map((b, i) => ({ at: 2.2 * (i + 1), fn: () => setBinder(b.key) })));
    },
    sources() {
      setBinder('gum'); const order = ['ochre', 'ultramarine', 'cochineal', 'indigo', 'prussian', 'titanium'];
      setPigment(order[0]); say('One card from each kind of source: the earth, living things, and the factory.', '每一種來源各拿幾張卡：土和礦石、生物、工廠。');
      play(order.slice(1).map((k, i) => ({ at: 2.2 * (i + 1), fn: () => { setPigment(k); const p = pigmentOf(k), o = ORIGINS[p.origin]; say(`${o.mark} ${p.en}: ${o.en.toLowerCase()}.`, `${o.mark} ${p.zh}：${o.zh}。`); } })));
    },
    cover() {
      setPigment('ultramarine'); setBinder('gum');
      say('Watercolor first. The black line shows clearly through the blue.', '先看水彩。黑線清楚地從藍色底下透出來。');
      play([{ at: 3, fn: () => { setBinder('acrylic'); say('Now acrylic paint. In this model it covers the line much more.', '現在換成壓克力顏料。在這個模型裡，它把黑線蓋住得多了。'); } }]);
    },
    blues() {
      setBinder('gum'); const order = ['ultramarine', 'azurite', 'indigo', 'prussian'];
      setPigment(order[0]); say('Four blues, four different stories.', '四種藍，四個不同的故事。');
      play(order.slice(1).map((k, i) => ({ at: 2.4 * (i + 1), fn: () => { setPigment(k); const p = pigmentOf(k); say(`${p.en}: ${p.src_en || ''}`, `${p.zh}：${p.src_zh || ''}`); } })));
    },
  };
  document.querySelectorAll('[data-lab-demo]').forEach((x) => x.addEventListener('click', (e) => {
    e.preventDefault(); root.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const v = x.getAttribute('data-lab-demo'); if (DEMO[v]) DEMO[v]();
  }));

  render();
  say('Choose a pigment, then a binder. The strip of paper on the right shows the paint you made, painted over a black line.', '先選一種色粉，再選一種黏著劑。右邊的紙條會塗上你做出來的顏料，底下有一條黑線。');
  root.classList.add('al-ready');
  const px = (overInk) => {
    const k = cv.width / W, x = Math.round((SWATCH.x + SWATCH.w * 0.75) * k), y = Math.round((overInk ? LINE.y + LINE.h / 2 : SWATCH.y + SWATCH.h * 0.85) * k);
    const d = cv.getContext('2d').getImageData(x, y, 1, 1).data; return [d[0], d[1], d[2]];
  };
  root.__lab = { state, setPigment, setBinder, expect: (overInk) => to255(swatch(state.pigment, state.binder, overInk)), pixel: px, demo: (v) => DEMO[v] && DEMO[v](), stop };
}

// ── 小互動一：這是從哪裡來的？ ───────────────────────────────────
function initOrigin(root) {
  const $ = (s) => root.querySelector(s);
  const E = { k: $('.ar-or-k'), score: $('.ar-or-score'), steps: $('.ar-or-steps'), card: $('.ar-or-card'), opts: Array.from(root.querySelectorAll('[data-origin]')), msg: $('.ar-or-msg'), next: $('.ar-or-next') };
  const N = ORIGIN_ROUNDS.length, state = { i: 0, right: 0, done: 0, solved: false };
  E.steps.innerHTML = ORIGIN_ROUNDS.map(() => '<i></i>').join('');
  const round = () => pigmentOf(ORIGIN_ROUNDS[state.i]);
  function show() {
    const p = round();
    E.k.textContent = `Card ${state.i + 1} of ${N} · 第 ${state.i + 1} 張（共 ${N} 張）`;
    E.score.textContent = `${state.right} / ${state.done}`;
    Array.from(E.steps.children).forEach((s, n) => { s.className = n < state.i ? 'is-past' : n === state.i ? 'is-now' : ''; });
    E.card.innerHTML = `<span class="ar-or-sw" style="background:${css(p.rgb)}"></span><span class="ar-or-b"><b>${p.en}</b><span class="zh">${p.zh}</span><span class="ar-or-clue">${p.clue_en || ''}<span class="zh">${p.clue_zh || ''}</span></span></span>`;
    E.opts.forEach((b) => { b.disabled = false; b.classList.remove('is-right', 'is-wrong'); b.querySelector('.ar-pk-mk').textContent = ''; });
    E.next.hidden = true;
    E.msg.innerHTML = bi('Read the clue. Where does this color come from?', '讀讀線索。這個顏色是從哪裡來的？');
  }
  function answer(o) {
    if (state.solved) return null;
    const p = round(), ok = o === p.origin;
    state.solved = true; state.done++; if (ok) state.right++;
    E.opts.forEach((b) => { b.disabled = true; });
    const good = E.opts.find((b) => b.getAttribute('data-origin') === p.origin);
    good.classList.add('is-right'); good.querySelector('.ar-pk-mk').textContent = '✓ this one · 是這個';
    if (!ok) { const b = E.opts.find((x) => x.getAttribute('data-origin') === o); b.classList.add('is-wrong'); b.querySelector('.ar-pk-mk').textContent = '✗ not this one · 不是這個'; }
    const last = state.i === N - 1;
    E.msg.innerHTML = bi(`${ok ? '✓' : '✗'} ${p.en}: ${p.src_en || ''}${last ? ` You got ${state.right} of ${N}.` : ''}`, `${ok ? '✓' : '✗'} ${p.zh}：${p.src_zh || ''}${last ? `${N} 張你答對了 ${state.right} 張。` : ''}`);
    E.next.hidden = false; E.next.textContent = last ? 'Play again · 再玩一次' : 'Next card · 下一張';
    E.score.textContent = `${state.right} / ${state.done}`;
    return ok;
  }
  function go(i) { state.i = i; state.solved = false; show(); }
  E.opts.forEach((b) => b.addEventListener('click', () => answer(b.getAttribute('data-origin'))));
  E.next.addEventListener('click', () => { if (state.i === N - 1) { state.right = 0; state.done = 0; go(0); } else go(state.i + 1); });
  go(0);
  root.__origin = { state, round, answer, correct: () => round().origin, next: () => go(Math.min(N - 1, state.i + 1)) };
}

// ── 小互動二：要做哪一種顏料？ ───────────────────────────────────
function initBinder(root) {
  const $ = (s) => root.querySelector(s);
  const E = { k: $('.ar-bd-k'), score: $('.ar-bd-score'), steps: $('.ar-bd-steps'), ask: $('.ar-bd-ask'), opts: $('.ar-bd-opts'), msg: $('.ar-bd-msg'), next: $('.ar-bd-next') };
  const N = BINDER_ROUNDS.length, state = { i: 0, right: 0, done: 0, solved: false };
  E.steps.innerHTML = BINDER_ROUNDS.map(() => '<i></i>').join('');
  const round = () => BINDER_ROUNDS[state.i];
  function show() {
    const r = round(), want = binderOf(r.want).paint;
    E.k.textContent = `Question ${state.i + 1} of ${N} · 第 ${state.i + 1} 題（共 ${N} 題）`;
    E.score.textContent = `${state.right} / ${state.done}`;
    Array.from(E.steps.children).forEach((s, n) => { s.className = n < state.i ? 'is-past' : n === state.i ? 'is-now' : ''; });
    E.ask.innerHTML = bi(`You have a pile of pigment and want to make ${want.en.toLowerCase()}. What do you mix it with?`, `你有一堆色粉，想做成${want.zh}。要和什麼混在一起？`);
    E.opts.innerHTML = r.options.map((k) => { const b = binderOf(k); return `<button type="button" class="ar-lp-opt" data-b="${k}"><i aria-hidden="true">${b.icon || '•'}</i><b>${b.en}</b><span class="zh">${b.zh}</span><span class="ar-pk-mk"></span></button>`; }).join('');
    E.opts.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => answer(b.getAttribute('data-b'))));
    E.next.hidden = true; E.msg.innerHTML = '&nbsp;';
  }
  function answer(k) {
    if (state.solved) return null;
    const r = round(), ok = k === r.want, b = binderOf(r.want);
    state.solved = true; state.done++; if (ok) state.right++;
    E.opts.querySelectorAll('button').forEach((x) => { x.disabled = true; });
    const good = E.opts.querySelector(`[data-b="${r.want}"]`); good.classList.add('is-right'); good.querySelector('.ar-pk-mk').textContent = '✓ this one · 是這個';
    if (!ok) { const x = E.opts.querySelector(`[data-b="${k}"]`); x.classList.add('is-wrong'); x.querySelector('.ar-pk-mk').textContent = '✗ not this one · 不是這個'; }
    const last = state.i === N - 1;
    E.msg.innerHTML = bi(`${ok ? '✓' : '✗'} ${b.paint.en} is made with ${b.en.toLowerCase()}. ${b.note_en || ''}${last ? ` You got ${state.right} of ${N}.` : ''}`, `${ok ? '✓' : '✗'} ${b.paint.zh}用的是${b.zh}。${b.note_zh || ''}${last ? `${N} 題你答對了 ${state.right} 題。` : ''}`);
    E.next.hidden = false; E.next.textContent = last ? 'Play again · 再玩一次' : 'Next question · 下一題';
    E.score.textContent = `${state.right} / ${state.done}`;
    return ok;
  }
  function go(i) { state.i = i; state.solved = false; show(); }
  E.next.addEventListener('click', () => { if (state.i === N - 1) { state.right = 0; state.done = 0; go(0); } else go(state.i + 1); });
  go(0);
  root.__binder = { state, round, answer, next: () => go(Math.min(N - 1, state.i + 1)) };
}

function boot() {
  const lab = document.querySelector('[data-artpigment-lab]'); if (lab) initLab(lab);
  const a = document.querySelector('[data-ar-origin]'); if (a) initOrigin(a);
  const b = document.querySelector('[data-ar-binder]'); if (b) initBinder(b);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
