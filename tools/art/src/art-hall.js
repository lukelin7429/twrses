/*
 * 美術 Art · 第五課〈怎麼在平面上畫出一個房間？〉：一條走廊，和一扇立在走廊口的「畫家的窗戶」。
 *
 * 一個機制：往遠處延伸的平行線，在畫面上往同一個點靠攏（消失點）；消失點在和眼睛一樣高的線上（視平線）。
 * 畫面固定是走廊口那一塊 4 × 3 公尺的長方形；移動的是眼睛。相機用非對稱的視錐（persp.js 的 frustum），
 * 所以畫面的四個角永遠是走廊口的四個角，消失點在畫面上的位置＝persp.js 算的 (eye.x, eye.y)。
 * 疊在上面的視平線、消失點與透視線是 SVG，用同一組函式算出來。
 *
 * 除錯：document.querySelector('[data-arthall-lab]').__lab
 *   state、setEye(x, y)、setMode('room'|'drawing')、setLines(bool)、setPosts(bool)、vp()＝純函式算的消失點 [u, v]、
 *   camUV([x, y, z])＝相機實際把這一點畫在哪裡 [u, v]、pureUV([x, y, z])、demo('height'|'side'|'lines'|'posts')、run(秒)、render()
 */
import {
  BoxGeometry, BufferGeometry, Color, DoubleSide, Float32BufferAttribute, Group, LineBasicMaterial, LineSegments, MathUtils, Mesh, MeshBasicMaterial,
  NearestFilter, PerspectiveCamera, PlaneGeometry, RepeatWrapping, Scene, Vector3, WebGLRenderer,
} from 'three';
import { canvasTex, lazyBoot } from './common.js';
import { EYE0, EYE_X, EYE_Y, HALL, HEIGHTS, PIC, POST, frustum, hallwayLines, horizonY, postPicture, project, toUV, vanishingPoint } from './persp.js';
import { initPosts, initVP } from './hall2d.js';

const NS = 'http://www.w3.org/2000/svg';
const W = 400, H = 300;
const sv = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };

function initLab(root) {
  const $ = (s) => root.querySelector(s), $$ = (s) => Array.from(root.querySelectorAll(s));
  const cv = $('.al-space-cv'), spaceWrap = $('.al-space'), over = $('.ar-hl-over');
  const state = { x: EYE0.x, y: EYE0.y, d: EYE0.d, mode: 'room', lines: true, posts: false };
  const R = { x: $('[data-s="ex"]'), y: $('[data-s="ey"]'), xv: $('.ar-hl-xv'), yv: $('.ar-hl-yv'), from: $('.ar-hl-from'), facts: $('.ar-hl-facts'), msg: $('.ar-msg') };
  const bi = (en, zh) => `${en}<span class="zh">${zh}</span>`;
  const say = (en, zh) => { R.msg.innerHTML = bi(en, zh); };
  const eye = () => ({ x: state.x, y: state.y, d: state.d });
  over.setAttribute('viewBox', `0 0 ${W} ${H}`);

  let dirty = true, view = null, timers = [], glide = null;
  const touch = () => { dirty = true; };
  const stopAuto = () => { timers.forEach(clearTimeout); timers = []; glide = null; };
  const play = (list) => { timers.forEach(clearTimeout); timers = list.map((s) => setTimeout(s.fn, s.at * 1000)); };

  function overlay() {
    const e = eye(), vp = toUV(vanishingPoint([0, 0, -1], e)), X = (u) => (u * W).toFixed(1), Y = (v) => (v * H).toFixed(1);
    over.innerHTML = '';
    if (state.lines) {
      for (const c of [[0, 0], [1, 0], [0, 1], [1, 1]]) sv('line', { x1: X(c[0]), y1: Y(c[1]), x2: X(vp[0]), y2: Y(vp[1]), class: 'ar-hl-guide' }, over);
    }
    sv('line', { x1: 0, y1: Y(vp[1]), x2: W, y2: Y(vp[1]), class: 'ar-hl-horizon' }, over);
    const hl = sv('text', { x: 6, y: (vp[1] * H - 5).toFixed(1), class: 'ar-hl-t' }, over); hl.textContent = `Eye level · 視平線 ${e.y.toFixed(1)} m`;
    sv('circle', { cx: X(vp[0]), cy: Y(vp[1]), r: 6, class: 'ar-hl-vp' }, over);
    sv('path', { d: `M${vp[0] * W - 11} ${vp[1] * H}h22M${vp[0] * W} ${vp[1] * H - 11}v22`, class: 'ar-hl-cross' }, over);
    const vt = sv('text', { x: X(vp[0]), y: (vp[1] * H + 16).toFixed(1), class: 'ar-hl-t', 'text-anchor': 'middle' }, over); vt.textContent = 'Vanishing point · 消失點';
    if (state.posts) {
      [['A', POST.near], ['B', -12]].forEach(([name, z]) => {
        const p = postPicture(z, e), t = toUV(p.top);
        const tx = sv('text', { x: (t[0] * W + 6).toFixed(1), y: (t[1] * H - 3).toFixed(1), class: 'ar-hl-t' }, over); tx.textContent = `${name}: ${(p.height / PIC.h * 100).toFixed(0)}%`;
      });
    }
  }
  function refresh() {
    const e = eye(), vp = toUV(vanishingPoint([0, 0, -1], e));
    root.setAttribute('data-mode', state.mode);
    $$('[data-t="lines"]').forEach((c) => { c.checked = state.lines; }); $$('[data-t="posts"]').forEach((c) => { c.checked = state.posts; });
    R.x.value = Math.round(state.x * 100); R.y.value = Math.round(state.y * 100);
    R.xv.textContent = Math.abs(state.x) < 0.05 ? 'center · 正中間' : `${Math.abs(state.x).toFixed(1)} m ${state.x < 0 ? 'left · 偏左' : 'right · 偏右'}`;
    R.yv.textContent = `${state.y.toFixed(1)} m`;
    $$('[data-height]').forEach((b) => b.setAttribute('aria-pressed', String(Math.abs(HEIGHTS[b.getAttribute('data-height')].y - state.y) < 0.03)));
    $$('[data-mode-pick]').forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute('data-mode-pick') === state.mode)));
    R.from.innerHTML = bi(`The vanishing point is straight in front of your eye, and the horizon is at your eye level.`, '消失點就在眼睛的正前方；視平線和眼睛一樣高。');
    const up = (1 - vp[1]) * 100, lf = vp[0] * 100;
    R.facts.innerHTML = `<div><dt>Eye height · 眼睛的高度</dt><dd>${e.y.toFixed(1)} m</dd></div>`
      + `<div><dt>Horizon on the picture · 視平線在畫面上</dt><dd>${up.toFixed(0)}% <small>up from the bottom · 從底邊往上</small></dd></div>`
      + `<div><dt>Vanishing point · 消失點</dt><dd>${lf.toFixed(0)}% <small>from the left · 從左邊算</small></dd></div>`
;
    overlay();
    if (view) view.sync();
    touch();
  }
  function setEye(x, y) { state.x = MathUtils.clamp(x, EYE_X.min, EYE_X.max); state.y = MathUtils.clamp(y, EYE_Y.min, EYE_Y.max); refresh(); }
  function setMode(m, quiet) {
    if (m !== 'room' && m !== 'drawing') return;
    state.mode = m; refresh();
    if (quiet) return;
    if (m === 'drawing') say('This is the same view as a line drawing on paper. Every line that goes into the distance is aimed at one point. Draw those lines first, and the room draws itself.', '這是同一個畫面，畫成紙上的線稿。每一條往遠處延伸的線，都對準同一個點。先畫出這些線，房間就自己出現了。');
    else say('Back in the hallway. The walls, the floor, and the ceiling are flat rectangles, yet on the picture each one narrows toward the vanishing point.', '回到走廊裡。牆、地板和天花板都是平平的長方形，但在畫面上，每一面都往消失點收窄。');
  }
  function setLines(v) { state.lines = !!v; refresh(); }
  function setPosts(v) { state.posts = !!v; refresh(); }
  function step(dt) {
    if (!glide) return;
    glide.t = Math.min(glide.dur, glide.t + dt);
    const k = MathUtils.smootherstep(glide.t / glide.dur, 0, 1);
    setEye(glide.x0 + (glide.x1 - glide.x0) * k, glide.y0 + (glide.y1 - glide.y0) * k);
    if (glide.t >= glide.dur) { const done = glide.done; glide = null; if (done) done(); }
  }
  const glideTo = (x, y, dur, done) => { glide = { t: 0, dur, x0: state.x, y0: state.y, x1: x, y1: y, done }; touch(); };

  // ── 3D ───────────────────────────────────────────────────────────────
  function make3D() {
    let renderer;
    try { renderer = new WebGLRenderer({ canvas: cv, antialias: true }); } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const scene = new Scene();
    const camera = new PerspectiveCamera(50, PIC.w / PIC.h, 0.1, 200);
    const { w, h, len } = HALL, x = w / 2;
    const basic = (c, extra = {}) => new MeshBasicMaterial({ color: c, side: DoubleSide, ...extra });
    const room = new Group(), paper = new Group();
    scene.add(room, paper);
    // 地板：兩種顏色的方格（1 公尺一格），用貼圖重複
    const tile = canvasTex((ctx, cw, ch) => { ctx.fillStyle = '#c9b89a'; ctx.fillRect(0, 0, cw, ch); ctx.fillStyle = '#8f7b5c'; ctx.fillRect(0, 0, cw / 2, ch / 2); ctx.fillRect(cw / 2, ch / 2, cw / 2, ch / 2); }, 64, 64);
    tile.wrapS = tile.wrapT = RepeatWrapping; tile.magFilter = NearestFilter; tile.repeat.set(w / 2, len / 2);
    const plane = (pw, ph, mat, pos, rot, group = room) => { const m = new Mesh(new PlaneGeometry(pw, ph), mat); m.position.set(...pos); m.rotation.set(...rot); group.add(m); return m; };
    plane(w, len, new MeshBasicMaterial({ map: tile, side: DoubleSide }), [0, 0, -len / 2], [-Math.PI / 2, 0, 0]);
    plane(w, len, basic(0xe9e4d8), [0, h, -len / 2], [Math.PI / 2, 0, 0]);
    plane(len, h, basic(0xd3dbe6), [-x, h / 2, -len / 2], [0, Math.PI / 2, 0]);
    plane(len, h, basic(0xc3ccda), [x, h / 2, -len / 2], [0, -Math.PI / 2, 0]);
    plane(w, h, basic(0xb4bfd0), [0, h / 2, -len], [0, 0, 0]);
    plane(1, 2.1, basic(0x5b4630), [0, 1.05, -len + 0.01], [0, 0, 0]);
    for (const z of [-4, -9, -14]) for (const s of [-1, 1]) plane(1.2, 2.1, basic(0x6f573b), [s * (x - 0.01), 1.05, z - 0.6], [0, s * -Math.PI / 2, 0]);
    for (let z = -2.5; z > -len; z -= 4) plane(1.2, 0.5, basic(0xfff6cf), [0, h - 0.01, z], [Math.PI / 2, 0, 0]);
    // 線稿：白色的面＋黑色的線
    plane(w, len, basic(0xfbf8f0), [0, 0, -len / 2], [-Math.PI / 2, 0, 0], paper);
    plane(w, len, basic(0xfbf8f0), [0, h, -len / 2], [Math.PI / 2, 0, 0], paper);
    plane(len, h, basic(0xfbf8f0), [-x, h / 2, -len / 2], [0, Math.PI / 2, 0], paper);
    plane(len, h, basic(0xfbf8f0), [x, h / 2, -len / 2], [0, -Math.PI / 2, 0], paper);
    plane(w, h, basic(0xfbf8f0), [0, h / 2, -len], [0, 0, 0], paper);
    const pts = [];
    hallwayLines().forEach(([a, b]) => { const eps = (p) => [p[0] * 0.998, p[1] === 0 ? 0.004 : p[1] === h ? h - 0.004 : p[1], p[2] === -len ? -len + 0.01 : p[2]]; pts.push(...eps(a), ...eps(b)); });
    const lg = new BufferGeometry(); lg.setAttribute('position', new Float32BufferAttribute(pts, 3));
    const ink = new LineSegments(lg, new LineBasicMaterial({ color: 0x16181d }));
    scene.add(ink);
    // 兩根一樣高的柱子
    const posts = new Group();
    for (const z of [POST.near, -12]) { const m = new Mesh(new BoxGeometry(0.16, POST.h, 0.16), basic(0xd9a520)); m.position.set(POST.x, POST.h / 2, z); posts.add(m); }
    scene.add(posts);

    function sync() {
      const e = eye(), f = frustum(e, 0.1), drawing = state.mode === 'drawing';
      camera.position.set(e.x, e.y, e.d); camera.rotation.set(0, 0, 0); camera.updateMatrixWorld(true);
      camera.projectionMatrix.makePerspective(f.left, f.right, f.top, f.bottom, f.near, 200);
      camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
      room.visible = !drawing; paper.visible = drawing; ink.visible = drawing; posts.visible = state.posts;
      scene.background = new Color(drawing ? 0xfbf8f0 : 0x0c0e13);
    }
    function render() { renderer.render(scene, camera); }
    function resize() {
      const cw = spaceWrap.clientWidth, ch = spaceWrap.clientHeight;
      if (!cw || !ch) return;
      renderer.setSize(cw, ch, false);
      root.classList.toggle('ar-narrow', cw < 520);
      touch();
    }
    new ResizeObserver(resize).observe(spaceWrap);
    resize();
    // 拖曳畫面＝移動眼睛（往右拖，眼睛往右；往上拖，眼睛升高）
    let drag = null;
    cv.addEventListener('pointerdown', (e) => {
      stopAuto(); root.classList.remove('al-fresh');
      drag = { id: e.pointerId, cx: e.clientX, cy: e.clientY, x: state.x, y: state.y };
      try { cv.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    });
    cv.addEventListener('pointermove', (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      const r = cv.getBoundingClientRect();
      setEye(drag.x + (e.clientX - drag.cx) / r.width * PIC.w, drag.y - (e.clientY - drag.cy) / r.height * PIC.h);
    });
    const end = (e) => { if (drag && e.pointerId === drag.id) drag = null; };
    cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
    const v3 = new Vector3();
    return { sync, render, camUV: (P) => { sync(); v3.set(P[0], P[1], P[2]).project(camera); return [v3.x * 0.5 + 0.5, 1 - (v3.y * 0.5 + 0.5)]; } };
  }
  view = make3D();
  if (!view) root.classList.add('al-nogl');

  R.x.addEventListener('input', () => { stopAuto(); setEye(Number(R.x.value) / 100, state.y); });
  R.y.addEventListener('input', () => { stopAuto(); setEye(state.x, Number(R.y.value) / 100); });
  $$('[data-height]').forEach((b) => b.addEventListener('click', () => {
    stopAuto(); const hh = HEIGHTS[b.getAttribute('data-height')];
    glideTo(state.x, hh.y, 0.9);
    say(`${hh.en}: your eye is ${hh.y.toFixed(1)} m above the floor, so the horizon is ${hh.y.toFixed(1)} m up the picture. ${hh.y > 1.5 ? 'From up here you see more of the floor and less of the ceiling.' : hh.y < 1 ? 'From down here you see more of the ceiling and less of the floor.' : ''}`,
      `${hh.zh}：眼睛離地 ${hh.y.toFixed(1)} 公尺，所以視平線在畫面上 ${hh.y.toFixed(1)} 公尺高的地方。${hh.y > 1.5 ? '從高處看，地板看到的比較多，天花板比較少。' : hh.y < 1 ? '從低處看，天花板看到的比較多，地板比較少。' : ''}`);
  }));
  $$('[data-mode-pick]').forEach((b) => b.addEventListener('click', () => { stopAuto(); setMode(b.getAttribute('data-mode-pick')); }));
  const tgL = $('[data-t="lines"]'), tgP = $('[data-t="posts"]');
  if (tgL) tgL.addEventListener('change', () => setLines(tgL.checked));
  if (tgP) tgP.addEventListener('change', () => {
    setPosts(tgP.checked);
    if (tgP.checked) say('Two posts stand in the hallway. Both are 1.5 m tall. The labels give each post\'s height on the picture, as a share of the picture\'s height.', '走廊裡立著兩根柱子，都是 1.5 公尺高。標籤寫的是每一根在畫面上的高度，占畫面高度的百分之幾。');
  });

  const DEMO = {
    height() {
      stopAuto(); setMode('room', true); setEye(0, HEIGHTS.crouch.y);
      say('You are crouching. The horizon is low on the picture, and so is the vanishing point. Now stand up, then climb on a chair.', '你蹲著。視平線在畫面很低的地方，消失點也是。現在站起來，再站到椅子上。');
      play([{ at: 2.5, fn: () => glideTo(0, HEIGHTS.chair.y, 6, () => say('The horizon rose with your eye the whole way. It is always at eye level.', '一路上，視平線都跟著眼睛一起升高。它永遠和眼睛一樣高。')) }]);
    },
    side() {
      stopAuto(); setMode('room', true); setEye(-1.5, 1.2);
      say('You are standing near the left wall. The vanishing point is on the left of the picture, right in front of you.', '你站在靠左邊牆的地方。消失點在畫面的左邊，就在你的正前方。');
      play([{ at: 2.5, fn: () => glideTo(1.5, 1.2, 6, () => say('The vanishing point walked across the picture with you. The near wall takes up less of the picture, and the far wall takes up more.', '消失點跟著你一起走過畫面。靠近你的那面牆在畫面上變窄，另一面牆變寬。')) }]);
    },
    lines() {
      stopAuto(); setEye(0.6, 1.2); state.lines = true; if (tgL) tgL.checked = true; setMode('drawing');
    },
    posts() {
      stopAuto(); setMode('room', true); setEye(0, 1.2); state.posts = true; if (tgP) tgP.checked = true; refresh();
      say('Posts A and B are both 1.5 m tall. B is three times as far from your eye as A, so on the picture it is one third as tall.', 'A 和 B 兩根柱子都是 1.5 公尺高。B 離眼睛的距離是 A 的三倍，所以在畫面上只有 A 的三分之一高。');
    },
  };

  let raf = 0, last = 0, visible = false;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t; step(dt);
    if (view && dirty) { dirty = false; view.render(); }
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; dirty = true; raf = requestAnimationFrame(frame); }
    if (!visible) stopAuto();
  }, { rootMargin: '120px' }).observe(root);

  refresh();
  say('You are looking down a hallway through a window 4 m wide and 3 m tall. Drag the picture, or use the sliders, to move your eye. The window stays where it is.', '你透過一扇寬 4 公尺、高 3 公尺的窗戶，看著一條走廊。拖動畫面或用滑桿，移動的是你的眼睛；窗戶留在原地。');
  root.classList.add('al-ready', 'al-fresh');
  root.__lab = {
    state, view, setEye, setMode, setLines, setPosts,
    vp: () => toUV(vanishingPoint([0, 0, -1], eye())),
    horizon: () => horizonY(eye()),
    pureUV: (P) => toUV(project(P, eye())),
    camUV: (P) => (view ? view.camUV(P) : null),
    demo: (v) => DEMO[v] && DEMO[v](),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { if (view) { view.sync(); view.render(); } },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  const a = document.querySelector('[data-ar-vp]'); if (a) initVP(a);
  const b = document.querySelector('[data-ar-posts]'); if (b) initPosts(b);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-arthall-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
