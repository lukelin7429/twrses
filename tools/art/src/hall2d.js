/*
 * 美術 Art · 第五課的兩個小互動（不需要 WebGL；SVG，用 persp.js 同一套投影）。
 *   [data-ar-vp]     消失點在哪裡？五張線稿，點出消失點（也可以用方向鍵按鈕微調），對答案時顯示差多遠並把線延長給你看。
 *                    __vp：round()、guess([u, v])、check()、next()、answer()＝正確位置 [u, v]
 *   [data-ar-posts]  哪一根比較高？兩根一樣高的柱子，一近一遠；拖動滑桿改變遠的那一根的位置，看畫面上的高度怎麼變。
 *                    __posts：setZ(z)、read()
 */
import { EYE0, HIT_AT, PIC, POST, SCENES, VP_ROUNDS, offPercent, fromUV, postPicture, project, sceneUV, toUV, vanishingPoint, vpGrade } from './persp.js';

const NS = 'http://www.w3.org/2000/svg';
const bi = (en, zh) => `${en}<span class="zh">${zh}</span>`;
const W = 400, H = 300;
const el = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };
const X = (u) => (u * W).toFixed(1), Y = (v) => (v * H).toFixed(1);
export function drawScene(svg, key, eye, cls = 'ar-pv-line') {
  const g = el('g', { class: 'ar-pv-scene' }, svg);
  sceneUV(key, eye).forEach(([p, q]) => el('line', { x1: X(p[0]), y1: Y(p[1]), x2: X(q[0]), y2: Y(q[1]), class: cls }, g));
  return g;
}

export function initVP(root) {
  const $ = (s) => root.querySelector(s);
  const E = { k: $('.ar-vp-k'), score: $('.ar-vp-score'), steps: $('.ar-vp-steps'), svg: $('.ar-vp-svg'), name: $('.ar-vp-name'), msg: $('.ar-vp-msg'), check: $('.ar-vp-check'), next: $('.ar-vp-next') };
  const state = { i: 0, guess: null, solved: false, found: 0, done: 0 };
  const NQ = VP_ROUNDS.length;
  E.steps.innerHTML = VP_ROUNDS.map(() => '<i></i>').join('');
  E.svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  const round = () => VP_ROUNDS[state.i];
  const answer = () => toUV(vanishingPoint([0, 0, -1], round().eye));
  function draw() {
    const r = round();
    E.svg.innerHTML = '';
    el('rect', { x: 0, y: 0, width: W, height: H, class: 'ar-pv-paper' }, E.svg);
    drawScene(E.svg, r.scene, r.eye);
    if (state.solved) {
      const a = answer();
      el('line', { x1: 0, y1: Y(a[1]), x2: W, y2: Y(a[1]), class: 'ar-pv-horizon' }, E.svg);
      // 把場景裡真的往遠處延伸的線（x、y 不變，只有 z 在變）從近端一路延長到消失點
      const seen = new Set();
      SCENES[r.scene].lines().filter(([p, q]) => p[0] === q[0] && p[1] === q[1] && p[2] !== q[2]).forEach(([p]) => {
        const k = `${p[0]},${p[1]}`; if (seen.has(k) || seen.size >= 8) return; seen.add(k);
        const s = toUV(project(p, r.eye));
        el('line', { x1: X(s[0]), y1: Y(s[1]), x2: X(a[0]), y2: Y(a[1]), class: 'ar-pv-guide' }, E.svg);
      });
      el('circle', { cx: X(a[0]), cy: Y(a[1]), r: 7, class: 'ar-pv-vp' }, E.svg);
      const t = el('text', { x: X(a[0]), y: (a[1] * H - 12).toFixed(1), class: 'ar-pv-t', 'text-anchor': 'middle' }, E.svg); t.textContent = 'VP 消失點';
    }
    if (state.guess) {
      const g = state.guess, x = g[0] * W, y = g[1] * H;
      el('path', { d: `M${x - 10} ${y}H${x + 10}M${x} ${y - 10}V${y + 10}`, class: 'ar-pv-cross' }, E.svg);
      el('circle', { cx: x, cy: y, r: 12, class: 'ar-pv-ring' }, E.svg);
    }
    E.k.textContent = `Picture ${state.i + 1} of ${NQ} · 第 ${state.i + 1} 張（共 ${NQ} 張）`;
    E.score.textContent = `${state.found} / ${state.done}`;
    E.name.innerHTML = `${SCENES[r.scene].en} <span class="zh">${SCENES[r.scene].zh}</span>`;
    Array.from(E.steps.children).forEach((s, n) => { s.className = n < state.i ? 'is-past' : n === state.i ? 'is-now' : ''; });
    E.check.hidden = state.solved; E.check.disabled = !state.guess;
    E.next.hidden = !state.solved; E.next.textContent = state.i === NQ - 1 ? 'Play again · 再玩一次' : 'Next picture · 下一張';
  }
  function guess(uv) { if (state.solved) return; state.guess = [Math.min(1, Math.max(0, uv[0])), Math.min(1, Math.max(0, uv[1]))]; draw(); E.msg.innerHTML = bi('Your mark is the cross in the ring. Move it if you like, then press Check.', '圓圈裡的十字是你標的位置。可以再移動，然後按「對答案」。'); }
  function check() {
    if (state.solved || !state.guess) return null;
    const pct = offPercent(fromUV(state.guess), fromUV(answer())), g = vpGrade(pct);
    state.solved = true; state.done++; if (g.key === 'hit') state.found++;
    draw();
    const e = round().eye, last = state.i === NQ - 1;
    E.msg.innerHTML = bi(`${g.mark} ${g.en}. Your mark is ${pct.toFixed(1)}% of the picture's width from the vanishing point (${HIT_AT}% or less counts). The dashed line is the eye level, ${e.y.toFixed(1)} m above the floor here.${last ? ` You found ${state.found} of ${NQ}.` : ''}`,
      `${g.mark} ${g.zh}。你標的位置離消失點有畫面寬度的 ${pct.toFixed(1)}%（${HIT_AT}% 以內算找到）。虛線是視平線，這一張的眼睛離地 ${e.y.toFixed(1)} 公尺。${last ? `${NQ} 張裡你找到了 ${state.found} 張。` : ''}`);
    return { pct, grade: g.key };
  }
  function go(i) { state.i = i; state.guess = null; state.solved = false; draw(); E.msg.innerHTML = bi('Click the picture where the lines that go into the distance would meet. On a keyboard, use the four arrow buttons.', '在圖上點出那些往遠處延伸的線會相交的地方。用鍵盤的話，按四個方向按鈕。'); }
  E.svg.addEventListener('click', (e) => { const r = E.svg.getBoundingClientRect(); guess([(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height]); });
  root.querySelectorAll('[data-nudge]').forEach((b) => b.addEventListener('click', () => {
    const [dx, dy] = b.getAttribute('data-nudge').split(',').map(Number), g = state.guess || [0.5, 0.5];
    guess([g[0] + dx * 0.02, g[1] + dy * 0.02]);
  }));
  E.check.addEventListener('click', check);
  E.next.addEventListener('click', () => { if (state.i === NQ - 1) { state.found = 0; state.done = 0; go(0); } else go(state.i + 1); });
  go(0);
  root.__vp = { state, round, guess, check, answer, next: () => go(Math.min(NQ - 1, state.i + 1)) };
}

export function initPosts(root) {
  const $ = (s) => root.querySelector(s);
  const E = { svg: $('.ar-po-svg'), z: $('.ar-po-z'), zv: $('.ar-po-zv'), read: $('.ar-po-read'), msg: $('.ar-po-msg'), tg: $('[data-t="polines"]') };
  const state = { z: -12, lines: false };
  E.svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  function read() {
    const a = postPicture(POST.near), b = postPicture(state.z);
    return { near: a.height / PIC.h * 100, far: b.height / PIC.h * 100, ratio: b.height / a.height, dNear: EYE0.d - POST.near, dFar: EYE0.d - state.z };
  }
  function draw() {
    E.svg.innerHTML = '';
    el('rect', { x: 0, y: 0, width: W, height: H, class: 'ar-pv-paper' }, E.svg);
    drawScene(E.svg, 'hallway', EYE0);
    const vp = toUV(vanishingPoint([0, 0, -1], EYE0));
    const post = (z, label) => {
      const p = postPicture(z), f = toUV(p.foot), t = toUV(p.top), w = Math.max(2, 0.16 * EYE0.d / (EYE0.d - z) / PIC.w * W);
      el('rect', { x: (f[0] * W - w / 2).toFixed(1), y: Y(t[1]), width: w.toFixed(1), height: ((f[1] - t[1]) * H).toFixed(1), class: 'ar-po-post' }, E.svg);
      const tx = el('text', { x: (f[0] * W + w / 2 + 5).toFixed(1), y: ((f[1] + t[1]) / 2 * H).toFixed(1), class: 'ar-pv-t' }, E.svg); tx.textContent = label;
      return { f, t };
    };
    const A = post(POST.near, 'A'), B = post(state.z, 'B');
    if (state.lines) {
      for (const k of ['t', 'f']) el('line', { x1: X(A[k][0]), y1: Y(A[k][1]), x2: X(vp[0]), y2: Y(vp[1]), class: 'ar-pv-guide' }, E.svg);
      el('circle', { cx: X(vp[0]), cy: Y(vp[1]), r: 6, class: 'ar-pv-vp' }, E.svg);
    }
    const r = read();
    E.zv.textContent = `${r.dFar.toFixed(0)} m`;
    E.read.innerHTML = `<div><dt>Post A in the room · A 在走廊裡</dt><dd>${POST.h} m</dd></div><div><dt>Post B in the room · B 在走廊裡</dt><dd>${POST.h} m</dd></div>`
      + `<div><dt>A on the picture · A 在畫面上</dt><dd>${r.near.toFixed(0)}%</dd></div><div><dt>B on the picture · B 在畫面上</dt><dd>${r.far.toFixed(0)}%</dd></div>`;
    E.msg.innerHTML = bi(`Both posts are ${POST.h} m tall. Post A is ${r.dNear.toFixed(0)} m from your eye and post B is ${r.dFar.toFixed(0)} m away, ${(r.dFar / r.dNear).toFixed(1)} times as far. On the picture, B is drawn ${(1 / r.ratio).toFixed(1)} times shorter than A. (The percentages are shares of the picture's height.)`,
      `兩根柱子都是 ${POST.h} 公尺高。A 離你的眼睛 ${r.dNear.toFixed(0)} 公尺，B 離 ${r.dFar.toFixed(0)} 公尺，是 A 的 ${(r.dFar / r.dNear).toFixed(1)} 倍遠。在畫面上，B 的高度是 A 的 ${(1 / r.ratio).toFixed(1)} 分之一。（百分比是占畫面高度的比例。）`);
  }
  E.z.addEventListener('input', () => { state.z = -Number(E.z.value); draw(); });
  if (E.tg) E.tg.addEventListener('change', () => { state.lines = E.tg.checked; draw(); });
  draw();
  root.__posts = { state, read, setZ: (z) => { state.z = z; E.z.value = -z; draw(); }, setLines: (v) => { state.lines = v; if (E.tg) E.tg.checked = v; draw(); } };
}
