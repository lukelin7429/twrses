/*
 * 美術 Art · 第四課〈一條線可以說什麼？〉：同一條線的五種畫法，和一塊可以自己畫的畫板（沒有 3D；2D canvas，不載 three.js）。
 *
 * 一個機制：一條線不只是邊界；它的粗細、快慢和質地，都看得出是怎麼畫出來的。
 * 示範的線由 stroke.js 產生（固定的點、時間與壓力），重播時照它的速度畫。畫板在 pad.js。
 *
 * 除錯：document.querySelector('[data-artline-lab]').__lab
 *   state、show('even'|'heavy'|'fast'|'shaky'|'taper')、replay()、pad（createPad 回傳的物件：strokes、add(pts)、undo()、clear()、replay()）、
 *   last()＝最後一筆的描述、demo('weight'|'fast'|'taper'|'shaky')
 * 小互動：[data-ar-how].__how（round()、answer(key)、correct()、next()）、[data-ar-shape].__shape（round()、answer('geometric'|'organic')、next()）
 */
import { BRUSHES, HOW, HOW_ROUNDS, LINES, SHAPES, demoBrush, describe, howBrush, howLine, makeLine } from './stroke.js';
import { clearPaper, createPad, fitCanvas, paintStroke } from './pad.js';

const bi = (en, zh) => `${en}<span class="zh">${zh}</span>`;
const PACE = { fast: ['fast', '快'], medium: ['at a middle speed', '速度中等'], slow: ['slow', '慢'] };

/** 在 canvas 上照時間把一筆畫出來；回傳停止用的函式。 */
function animate(canvas, pts, brush, { speed = 1, onDone = null, seed = 7 } = {}) {
  const ctx = canvas.getContext('2d'), dur = pts[pts.length - 1].t - pts[0].t;
  let raf = 0; const t0 = performance.now();
  const frame = () => {
    const el = (performance.now() - t0) * speed, k = fitCanvas(canvas);
    clearPaper(ctx, k); paintStroke(ctx, pts, brush, { upTo: el, seed });
    if (el >= dur) { raf = 0; if (onDone) onDone(); return; }
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);
  return () => { if (raf) cancelAnimationFrame(raf); raf = 0; };
}
function drawWhole(canvas, pts, brush, seed = 7) {
  const ctx = canvas.getContext('2d'), k = fitCanvas(canvas);
  clearPaper(ctx, k); paintStroke(ctx, pts, brush, { seed });
}

// 畫板底下淡淡的參考圖：一棵樹（樹幹、三根枝、一團樹冠）
function treeGuide(ctx) {
  ctx.save();
  ctx.strokeStyle = '#c9c2b2'; ctx.lineWidth = 2; ctx.setLineDash([7, 7]); ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(380, 470); ctx.bezierCurveTo(388, 400, 384, 340, 396, 270);
  ctx.moveTo(430, 470); ctx.bezierCurveTo(424, 400, 430, 340, 418, 270);
  ctx.moveTo(396, 300); ctx.bezierCurveTo(350, 270, 320, 250, 290, 215);
  ctx.moveTo(418, 300); ctx.bezierCurveTo(460, 270, 495, 250, 520, 210);
  ctx.moveTo(407, 270); ctx.bezierCurveTo(404, 230, 408, 200, 404, 160);
  ctx.moveTo(250, 230); ctx.bezierCurveTo(200, 170, 250, 90, 330, 100); ctx.bezierCurveTo(360, 40, 470, 40, 490, 100);
  ctx.bezierCurveTo(580, 90, 610, 180, 560, 235); ctx.bezierCurveTo(520, 275, 300, 275, 250, 230);
  ctx.moveTo(330, 470); ctx.lineTo(480, 470);
  ctx.stroke(); ctx.restore();
}

function initLab(root) {
  const $ = (s) => root.querySelector(s), $$ = (s) => Array.from(root.querySelectorAll(s));
  const E = { demo: $('.ar-ln-democv'), padcv: $('.ar-ln-padcv'), read: $('.ar-ln-read'), msg: $('.ar-msg'), last: $('.ar-ln-last') };
  const state = { kind: 'even', stop: null };
  const say = (en, zh) => { E.msg.innerHTML = bi(en, zh); };
  const TEXT = {
    even: ['Drawn slowly, with light pressure that never changes. The line is the same width from end to end.', '畫得慢，力道很輕，而且從頭到尾沒有變。整條線一樣粗。'],
    heavy: ['Drawn slowly, pressing hard. The line is wide and full, with clean edges.', '畫得慢，壓得很重。線又寬又飽滿，邊緣很乾淨。'],
    fast: ['Drawn in less than half a second. In this model, a stroke that fast leaves gaps where no ink lands. Calligraphers call this look flying white. With a real brush it also depends on the ink and the paper.', '不到半秒就畫完了。在這個模型裡，這麼快的一筆會留下沒沾到墨的空隙；書法把這種樣子叫做飛白。真的毛筆還要看墨量和紙。'],
    shaky: ['The hand trembled a little all the way along. The path is the same, but the edge is rough.', '手一路上都有一點抖。走的是同一條路，邊緣卻毛毛的。'],
    taper: ['Pressed hard at the start, then lifted little by little. The line goes from thick to thin, and you can see which end came first.', '起筆壓得重，然後一點一點提起來。線由粗變細，看得出哪一頭是先畫的。'],
  };
  function readout(pts, brush) {
    const d = describe(pts, brush);
    E.read.innerHTML = `<div><dt>Length · 長度</dt><dd>${Math.round(d.length)}</dd></div><div><dt>Time · 時間</dt><dd>${d.seconds.toFixed(1)} s</dd></div>`
      + `<div><dt>Speed · 速度</dt><dd>${Math.round(d.speed)} / s</dd></div><div><dt>Width · 粗細</dt><dd>${d.wmin.toFixed(0)}–${d.wmax.toFixed(0)}</dd></div>`;
  }
  function show(kind, play = true) {
    if (!LINES[kind]) return;
    if (state.stop) state.stop();
    state.kind = kind;
    $$('[data-line]').forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute('data-line') === kind)));
    const pts = makeLine(kind), br = demoBrush(kind);
    readout(pts, br); say(TEXT[kind][0], TEXT[kind][1]);
    if (play) state.stop = animate(E.demo, pts, br, { onDone: () => { state.stop = null; } });
    else drawWhole(E.demo, pts, br);
  }
  $$('[data-line]').forEach((b) => b.addEventListener('click', () => show(b.getAttribute('data-line'))));
  $('.ar-ln-replay').addEventListener('click', () => show(state.kind));

  // 畫板
  const lastText = (s, n) => {
    const d = describe(s.pts, BRUSHES[s.brush]), p = PACE[d.pace];
    E.last.innerHTML = bi(`Stroke ${n}: ${Math.round(d.length)} long, drawn in ${d.seconds.toFixed(1)} s. That is ${p[0]} (${Math.round(d.speed)} per second). Width ${d.wmin.toFixed(0)} to ${d.wmax.toFixed(0)}. ${d.steady ? 'A steady line.' : 'A line with some wobble in it.'}`,
      `第 ${n} 筆：長 ${Math.round(d.length)}，花了 ${d.seconds.toFixed(1)} 秒，算${p[1]}（每秒 ${Math.round(d.speed)}）。粗細 ${d.wmin.toFixed(0)} 到 ${d.wmax.toFixed(0)}。${d.steady ? '這條線很穩。' : '這條線有一點抖。'}`);
    return d;
  };
  let lastD = null;
  const pad = createPad(E.padcv, { brush: 'brush', guide: treeGuide, onStroke: (s, n) => { lastD = lastText(s, n); } });
  const idle = () => { E.last.innerHTML = bi('Draw on the paper with a mouse, a finger, or a pen. With the brush, a slow stroke is thick and a fast one is thin. A pen that senses pressure sets the width by how hard you press.', '用滑鼠、手指或觸控筆在紙上畫。用毛筆時，畫得慢線就粗，畫得快線就細；會感應壓力的觸控筆，則是壓得越重越粗。'); };
  idle();
  $$('[data-brush]').forEach((b) => b.addEventListener('click', () => {
    pad.setBrush(b.getAttribute('data-brush'));
    $$('[data-brush]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  }));
  $('.ar-ln-undo').addEventListener('click', () => { pad.undo(); if (!pad.strokes.length) idle(); });
  $('.ar-ln-clear').addEventListener('click', () => { pad.clear(); idle(); });
  $('.ar-ln-again').addEventListener('click', () => pad.replay());
  const tg = $('[data-t="guide"]'); if (tg) tg.addEventListener('change', () => pad.setGuide(tg.checked));
  window.addEventListener('resize', () => { pad.redraw(); if (!state.stop) drawWhole(E.demo, makeLine(state.kind), demoBrush(state.kind)); });

  let timers = [];
  const play = (list) => { timers.forEach(clearTimeout); timers = list.map((s) => setTimeout(s.fn, s.at * 1000)); };
  const DEMO = {
    weight() { show('even'); play([{ at: 4.2, fn: () => show('heavy') }]); },
    fast() { show('fast'); play([{ at: 2.5, fn: () => show('fast') }]); },
    taper() { show('taper'); },
    shaky() { show('even'); play([{ at: 4.2, fn: () => show('shaky') }]); },
  };
  document.querySelectorAll('[data-lab-demo]').forEach((b) => b.addEventListener('click', (e) => {
    e.preventDefault();
    root.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const v = b.getAttribute('data-lab-demo'); if (DEMO[v]) DEMO[v]();
  }));

  show('even', false);
  root.classList.add('al-ready');
  root.__lab = { state, show, replay: () => show(state.kind), pad, last: () => lastD, demo: (v) => DEMO[v] && DEMO[v]() };
}

// ── 小互動一：這條線是怎麼畫的？ ──────────────────────────────────────
function initHow(root) {
  const $ = (s) => root.querySelector(s);
  const E = { k: $('.ar-hw-k'), score: $('.ar-hw-score'), steps: $('.ar-hw-steps'), cv: $('.ar-hw-cv'), opts: $('.ar-hw-opts'), msg: $('.ar-hw-msg'), next: $('.ar-hw-next'), watch: $('.ar-hw-watch') };
  const state = { i: 0, right: 0, done: 0, tried: false, solved: false, stop: null };
  const NQ = HOW_ROUNDS.length, ORDER = ['slow-light', 'slow-heavy', 'fast-light', 'fast-heavy'];
  E.steps.innerHTML = HOW_ROUNDS.map(() => '<i></i>').join('');
  const round = () => HOW_ROUNDS[state.i];
  function draw() {
    if (state.stop) { state.stop(); state.stop = null; }
    drawWhole(E.cv, howLine(round()), howBrush(), 11 + state.i);
    E.k.textContent = `Question ${state.i + 1} of ${NQ} · 第 ${state.i + 1} 題（共 ${NQ} 題）`;
    E.score.textContent = `${state.right} / ${state.done}`;
    Array.from(E.steps.children).forEach((s, n) => { s.className = n < state.i ? 'is-past' : n === state.i ? 'is-now' : ''; });
    E.opts.innerHTML = ORDER.map((o) => `<button type="button" class="ar-lp-opt ar-hw-opt" data-o="${o}"><b>${HOW[o].en}</b><span class="zh">${HOW[o].zh}</span><span class="ar-pk-mk"></span></button>`).join('');
    E.opts.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => answer(b.getAttribute('data-o'))));
    E.next.hidden = true; E.watch.hidden = true;
    E.msg.innerHTML = bi('How was this line drawn? Look at how wide it is, and whether it has gaps.', '這條線是怎麼畫的？看它有多粗，還有線上有沒有空隙。');
  }
  function watch() {
    if (state.stop) state.stop();
    state.stop = animate(E.cv, howLine(round()), howBrush(), { seed: 11 + state.i, onDone: () => { state.stop = null; } });
  }
  function answer(o) {
    if (state.solved) return null;
    const r = round(), b = E.opts.querySelector(`[data-o="${o}"]`);
    if (o === r.answer) {
      state.solved = true; state.done++; if (!state.tried) state.right++;
      b.classList.add('is-right'); b.querySelector('.ar-pk-mk').textContent = '✓ right · 答對了';
      E.opts.querySelectorAll('button').forEach((x) => { x.disabled = true; });
      const [pace, weight] = r.answer.split('-');
      const en = `${pace === 'fast' ? 'The gaps show that this brush moved fast.' : 'There are no gaps, so this brush moved slowly.'} ${weight === 'heavy' ? 'The line is wide, so it was pressed hard.' : 'The line is narrow, so the touch was light.'}`;
      const zh = `${pace === 'fast' ? '線上有空隙，表示這支筆走得很快。' : '線上沒有空隙，所以這支筆走得慢。'}${weight === 'heavy' ? '線很寬，所以壓得重。' : '線很細，所以下筆很輕。'}`;
      const last = state.i === NQ - 1;
      E.msg.innerHTML = bi(`✓ ${en} Press Watch to see it drawn at its real speed.${last ? ` You got ${state.right} of ${NQ} right on the first try.` : ''}`, `✓ ${zh}按「看它怎麼畫」，用真實的速度重播一次。${last ? `${NQ} 題裡有 ${state.right} 題第一次就答對。` : ''}`);
      E.next.hidden = false; E.watch.hidden = false; E.next.textContent = last ? 'Play again · 再玩一次' : 'Next question · 下一題';
      E.score.textContent = `${state.right} / ${state.done}`;
    } else {
      state.tried = true; b.disabled = true; b.classList.add('is-wrong'); b.querySelector('.ar-pk-mk').textContent = '✗ not this one · 不是這個';
      E.msg.innerHTML = bi('✗ Not quite. Width tells you about pressure. Gaps tell you about speed.', '✗ 不太對。粗細看的是力道，空隙看的是速度。');
    }
    return o === r.answer;
  }
  function go(i) { state.i = i; state.tried = false; state.solved = false; draw(); }
  E.next.addEventListener('click', () => { if (state.i === NQ - 1) { state.right = 0; state.done = 0; go(0); } else go(state.i + 1); });
  E.watch.addEventListener('click', watch);
  window.addEventListener('resize', () => { if (!state.stop) drawWhole(E.cv, howLine(round()), howBrush(), 11 + state.i); });
  go(0);
  root.__how = { state, round, answer, watch, next: () => go(Math.min(NQ - 1, state.i + 1)), correct: () => round().answer };
}

// ── 小互動二：幾何的形狀，還是自然的形狀？ ────────────────────────────
function initShape(root) {
  const $ = (s) => root.querySelector(s);
  const E = { k: $('.ar-sh-k'), score: $('.ar-sh-score'), steps: $('.ar-sh-steps'), fig: $('.ar-sh-fig'), name: $('.ar-sh-name'), opts: Array.from(root.querySelectorAll('[data-kind]')), msg: $('.ar-sh-msg'), next: $('.ar-sh-next') };
  const state = { i: 0, right: 0, done: 0, solved: false };
  const NQ = SHAPES.length;
  E.steps.innerHTML = SHAPES.map(() => '<i></i>').join('');
  const round = () => SHAPES[state.i];
  function draw() {
    const s = round();
    E.k.textContent = `Shape ${state.i + 1} of ${NQ} · 第 ${state.i + 1} 個（共 ${NQ} 個）`;
    E.score.textContent = `${state.right} / ${state.done}`;
    Array.from(E.steps.children).forEach((x, n) => { x.className = n < state.i ? 'is-past' : n === state.i ? 'is-now' : ''; });
    E.fig.innerHTML = `<svg viewBox="0 0 100 100" role="img" aria-label="${s.en} · ${s.zh}"><path d="${s.d}" fill="#16181d"/></svg>`;
    E.name.innerHTML = `${s.en} <span class="zh">${s.zh}</span>`;
    E.opts.forEach((b) => { b.disabled = false; b.classList.remove('is-right', 'is-wrong'); b.querySelector('.ar-pk-mk').textContent = ''; });
    E.next.hidden = true;
    E.msg.innerHTML = bi('Is this shape geometric or organic?', '這個形狀是幾何的，還是自然的（有機的）？');
  }
  function answer(kind) {
    if (state.solved) return null;
    const s = round(), ok = kind === s.kind, b = E.opts.find((x) => x.getAttribute('data-kind') === kind);
    state.solved = true; state.done++; if (ok) state.right++;
    E.opts.forEach((x) => { x.disabled = true; });
    const good = E.opts.find((x) => x.getAttribute('data-kind') === s.kind);
    good.classList.add('is-right'); good.querySelector('.ar-pk-mk').textContent = '✓ this one · 是這個';
    if (!ok) { b.classList.add('is-wrong'); b.querySelector('.ar-pk-mk').textContent = '✗ not this one · 不是這個'; }
    const why = s.kind === 'geometric'
      ? [`${s.en}: a regular shape that you could draw with a ruler or a compass.`, `${s.zh}：規則的形狀，用尺或圓規就畫得出來。`]
      : [`${s.en}: an irregular shape with free curves, like the ones found in nature.`, `${s.zh}：不規則的形狀，邊緣是自由的曲線，像自然界裡看到的那樣。`];
    const last = state.i === NQ - 1;
    E.msg.innerHTML = bi(`${ok ? '✓' : '✗'} ${why[0]}${last ? ` You got ${state.right} of ${NQ}.` : ''}`, `${ok ? '✓' : '✗'} ${why[1]}${last ? `${NQ} 個裡你答對了 ${state.right} 個。` : ''}`);
    E.next.hidden = false; E.next.textContent = last ? 'Play again · 再玩一次' : 'Next shape · 下一個';
    E.score.textContent = `${state.right} / ${state.done}`;
    return ok;
  }
  function go(i) { state.i = i; state.solved = false; draw(); }
  E.opts.forEach((b) => b.addEventListener('click', () => answer(b.getAttribute('data-kind'))));
  E.next.addEventListener('click', () => { if (state.i === NQ - 1) { state.right = 0; state.done = 0; go(0); } else go(state.i + 1); });
  go(0);
  root.__shape = { state, round, answer, next: () => go(Math.min(NQ - 1, state.i + 1)) };
}

function boot() {
  const lab = document.querySelector('[data-artline-lab]'); if (lab) initLab(lab);
  const h = document.querySelector('[data-ar-how]'); if (h) initHow(h);
  const s = document.querySelector('[data-ar-shape]'); if (s) initShape(s);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
