/*
 * 電腦概論 · 第四課「電腦怎麼做加法？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：**幾個邏輯閘接起來就是加法器**；每一位一個全加器，進位從右邊一位一位傳到左邊。
 * 場景（由後到前）：A 的四個開關與燈（bits3d.js）、B 的四個開關與燈、四個「全加器」方塊、答案的五盞燈（沒有撥桿）。
 * 同一直行就是同一位：最右邊是 1，往左 2、4、8；答案多一盞 16（最後的進位）。
 *   點 A 或 B 的開關（或右邊的位元按鈕）   改數字，答案立刻跟著變（真的加法器也是這樣，沒有「按下等號」）
 *   .al-play                               看它怎麼加：答案先清掉，由右往左一位一位算，進位小球跳到左邊那個方塊
 *   .cp-step                               一次只算一位
 *   data-speed                             0.5／1／3 倍
 *   .cp-reset                              兩個數都歸零
 * 右邊：直式（二進位與十進位）、現在這一位的算式（1 + 1 + 進位 0 = 10 → 寫 0 進 1）。
 *
 * 控制器不靠 WebGL：沒有 WebGL 時 3D 不畫，右邊的按鈕、直式與逐位說明照樣能用。
 * 2D（不需要 WebGL）：半加器／全加器、自己當加法器——adder2d.js。
 *
 * 產物：cd tools/computers && npm run build → assets/js/comp-adder.js
 * 除錯：document.querySelector('[data-compadder-lab]').__lab
 *   set(a, b)、toggle('a'|'b', i)、watch()、stepOnce()、setPlaying(bool)、setSpeed(n)、demo('simple'|'one'|'ripple'|'overflow')、
 *   run(秒)、goCam()、render()、sum()
 */
import {
  AdditiveBlending, AmbientLight, BoxGeometry, CircleGeometry, Color, DirectionalLight, HemisphereLight, MathUtils, Mesh, MeshBasicMaterial,
  MeshStandardMaterial, PerspectiveCamera, Raycaster, Scene, SphereGeometry, Sprite, SpriteMaterial, Vector2, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { addBits, columnText } from './adder.js';
import { initAddQ, initHalf } from './adder2d.js';
import { bitString, fromBits, toBits } from './bits.js';
import { makeBitRow } from './bits3d.js';
import { canvasTex, labeler, lazyBoot } from './common.js';

const N = 4, S = 1.5;
const Z = { a: -3.3, b: -0.7, box: 1.45, sum: 3.3 };
const HOP = 0.9;
const V = (x, y, z) => new Vector3(x, y, z);

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space'), cv = $('.al-space-cv');
  const R = {
    a: $('.cp-ad-a'), b: $('.cp-ad-b'), s: $('.cp-ad-s'), ad: $('.cp-ad-ad'), bd: $('.cp-ad-bd'), sd: $('.cp-ad-sd'), col: $('.cp-ad-col'), msg: $('.cp-msg'), play: $('.al-play'),
    strip: { a: [...$$('[data-row="a"] [data-bit]')], b: [...$$('[data-row="b"] [data-bit]')] },
  };
  const state = { a: toBits(5, N), b: toBits(3, N), shown: N + 1, playing: false, speed: 1, labels: true, t: 0, wait: 0, cur: -1 };
  let script = null, view = null;

  const calc = () => addBits(state.a, state.b);
  const sum = () => calc().value;
  const say = (en, zh) => { R.msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  const press = (sel, attr, v) => $$(sel).forEach((b) => b.setAttribute('aria-pressed', b.getAttribute(attr) === String(v) ? 'true' : 'false'));

  function show() {
    const r = calc(), done = state.shown > N;
    R.a.textContent = bitString(state.a, 0); R.b.textContent = bitString(state.b, 0);
    R.ad.textContent = String(fromBits(state.a)); R.bd.textContent = String(fromBits(state.b));
    R.s.textContent = r.bits.map((v, i) => (i < state.shown && (i < N || done) ? v : '·')).reverse().join('');
    R.sd.textContent = done ? String(r.value) : '?';
    for (const k of ['a', 'b']) R.strip[k].forEach((b) => { const i = Number(b.getAttribute('data-bit')); b.setAttribute('aria-pressed', state[k][i] ? 'true' : 'false'); b.querySelector('b').textContent = String(state[k][i]); });
    const c = state.cur >= 0 && state.cur < N ? r.steps[state.cur] : null;
    R.col.innerHTML = c
      ? `<b>Column worth ${2 ** c.i}</b> ${columnText(c)}<small>write ${c.sum}, carry ${c.cout} · 代表 ${2 ** c.i} 的那一位：寫 ${c.sum}，進 ${c.cout}</small>`
      : `<b>${fromBits(state.a)} + ${fromBits(state.b)} = ${r.value}</b><small>${done ? 'Press “Watch it add” to see each column. · 按「看它怎麼加」，一位一位看。' : ''}</small>`;
    root.classList.toggle('cp-adding', !done);
    if (view) view.sync();
  }
  function told() {
    const r = calc();
    say(`${bitString(state.a, 0)} + ${bitString(state.b, 0)} = ${bitString(r.bits, 0)}. In everyday numbers, ${fromBits(state.a)} + ${fromBits(state.b)} = ${r.value}.`,
        `${bitString(state.a, 0)}＋${bitString(state.b, 0)}＝${bitString(r.bits, 0)}，換成平常的數就是 ${fromBits(state.a)}＋${fromBits(state.b)}＝${r.value}。`);
  }
  function live() { state.shown = N + 1; state.cur = -1; state.wait = 0; }
  function set(a, b) { state.a = toBits(a, N); state.b = toBits(b, N); live(); show(); }
  function toggle(k, i) { user(); state[k][i] = state[k][i] ? 0 : 1; live(); show(); told(); }
  function user() { script = null; if (state.playing) setPlaying(false); root.classList.remove('al-fresh'); }
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Watch it add · 看它怎麼加';
    root.classList.remove('al-fresh');
  }
  function setSpeed(v) { state.speed = v; press('[data-speed]', 'data-speed', v); }

  /** 算下一位。回傳 false＝已經全部算完。 */
  function reveal() {
    const r = calc();
    if (state.shown > N) { state.shown = 0; state.cur = -1; show(); say('The answer is cleared. The adder starts with the column on the far right.', '答案先清掉。加法器從最右邊那一位開始。'); return true; }
    if (state.shown === N) {
      state.shown = N + 1; state.cur = -1; show();
      say(r.overflow ? `The last carry has nowhere to go but a fifth light, worth 16. ${fromBits(state.a)} + ${fromBits(state.b)} = ${r.value}.` : `No carry is left over, so the fifth light stays off. ${fromBits(state.a)} + ${fromBits(state.b)} = ${r.value}.`,
          r.overflow ? `最後的進位沒有下一位可以去，只好點亮第五盞燈（代表 16）。${fromBits(state.a)}＋${fromBits(state.b)}＝${r.value}。` : `沒有剩下的進位，第五盞燈不亮。${fromBits(state.a)}＋${fromBits(state.b)}＝${r.value}。`);
      return false;
    }
    const s = r.steps[state.shown];
    state.cur = s.i; state.shown++; show();
    if (view) view.pulse(s.i, s.cout);
    say(`Column worth ${2 ** s.i}: ${columnText(s)}. Write ${s.sum}${s.cout ? ', and carry 1 to the left' : '; nothing to carry'}.`,
        `代表 ${2 ** s.i} 的那一位：${columnText(s, '＋')}。寫 ${s.sum}${s.cout ? '，進 1 到左邊' : '，不用進位'}。`);
    return true;
  }
  function watch() { state.shown = N + 1; reveal(); state.wait = HOP * 0.8; setPlaying(true); }
  function stepOnce() { user(); reveal(); }

  for (const k of ['a', 'b']) R.strip[k].forEach((b) => b.addEventListener('click', () => toggle(k, Number(b.getAttribute('data-bit')))));
  R.play.addEventListener('click', () => { script = null; if (state.playing) setPlaying(false); else if (state.shown > N) watch(); else setPlaying(true); });
  $('.cp-step').addEventListener('click', stepOnce);
  $('.cp-reset').addEventListener('click', () => { user(); set(0, 0); say('Both numbers are zero. Flip some switches in the two back rows.', '兩個數都歸零了。撥撥後面兩排的開關。'); });
  $$('[data-speed]').forEach((b) => b.addEventListener('click', () => setSpeed(Number(b.getAttribute('data-speed')))));
  const tgL = $('[data-t="labels"]');
  if (tgL) tgL.addEventListener('change', () => { state.labels = tgL.checked; });

  // ── 3D ──────────────────────────────────────────────────────────────
  function make3D() {
    let renderer;
    try { renderer = new WebGLRenderer({ canvas: cv, antialias: true }); } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const scene = new Scene();
    scene.background = new Color(0x0b1326);
    const camera = new PerspectiveCamera(34, 1, 0.05, 200);
    const controls = new OrbitControls(camera, cv);
    controls.enableDamping = true; controls.dampingFactor = 0.08;
    controls.minDistance = 3; controls.maxDistance = 50; controls.maxPolarAngle = Math.PI * 0.48;
    scene.add(new HemisphereLight(0xdfe8ff, 0x1a1410, 0.8));
    scene.add(new AmbientLight(0xffffff, 0.2));
    const sun = new DirectionalLight(0xfff1dc, 1.1); sun.position.set(-4, 10, 7); scene.add(sun);
    const floor = new Mesh(new CircleGeometry(90, 64), new MeshStandardMaterial({ color: 0x121c36, roughness: 0.95 }));
    floor.rotation.x = -Math.PI / 2; scene.add(floor);

    const rowA = makeBitRow({ n: N, spacing: S }), rowB = makeBitRow({ n: N, spacing: S }), rowS = makeBitRow({ n: N + 1, spacing: S, levers: false });
    rowA.group.position.z = Z.a; rowB.group.position.z = Z.b; rowS.group.position.set(-S / 2, 0, Z.sum);
    scene.add(rowA.group, rowB.group, rowS.group);

    // 四個全加器方塊（每一位一個），頂面畫一個「+」
    const plus = canvasTex((g, w, h) => { g.fillStyle = '#22345f'; g.fillRect(0, 0, w, h); g.strokeStyle = '#7ef0e3'; g.lineWidth = 14; g.lineCap = 'round'; g.beginPath(); g.moveTo(w / 2, h * 0.24); g.lineTo(w / 2, h * 0.76); g.moveTo(w * 0.24, h / 2); g.lineTo(w * 0.76, h / 2); g.stroke(); }, 128, 128);
    const boxes = [];
    for (let i = 0; i < N; i++) {
      const m = new MeshStandardMaterial({ color: 0x22345f, roughness: 0.5, emissive: 0x7ef0e3, emissiveIntensity: 0 });
      const top = new MeshStandardMaterial({ map: plus, roughness: 0.5, emissive: 0x7ef0e3, emissiveIntensity: 0, emissiveMap: plus });
      const b = new Mesh(new BoxGeometry(S * 0.72, 0.55, 0.95), [m, m, top, m, m, m]);
      b.position.set(rowA.x(i), 0.28, Z.box); scene.add(b);
      boxes.push({ b, m, top, k: 0 });
    }
    // 方塊之間的進位線（由右到左），和最左邊接到第五盞燈的線
    const wireM = new MeshStandardMaterial({ color: 0xc98a4b, roughness: 0.35, metalness: 0.75 });
    for (let i = 0; i < N - 1; i++) { const w = new Mesh(new BoxGeometry(S * 0.3, 0.06, 0.06), wireM); w.position.set((rowA.x(i) + rowA.x(i + 1)) / 2, 0.3, Z.box); scene.add(w); }
    { const w = new Mesh(new BoxGeometry(S * 0.75, 0.06, 0.06), wireM); w.position.set(rowA.x(N - 1) - S * 0.6, 0.3, Z.box); scene.add(w); }

    const glow = canvasTex((g, w, h) => { const r = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2); r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(0.35, 'rgba(255,255,255,.45)'); r.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = r; g.fillRect(0, 0, w, h); }, 128, 128);
    const ball = new Mesh(new SphereGeometry(0.16, 18, 14), new MeshBasicMaterial({ color: 0x7ef0e3, transparent: true, opacity: 0 }));
    const halo = new Sprite(new SpriteMaterial({ map: glow, color: 0x7ef0e3, blending: AdditiveBlending, depthWrite: false, transparent: true, opacity: 0 }));
    halo.scale.setScalar(1.1); ball.add(halo); scene.add(ball);
    const fly1 = { t: 1, from: V(0, 0, 0), to: V(0, 0, 0) };
    scene.updateMatrixWorld(true);

    const lab = labeler($('.al-labels'), cv, camera);
    const lb = { a: lab.add('cp-lb cp-lb-end', ''), b: lab.add('cp-lb cp-lb-end', ''), s: lab.add('cp-lb cp-lb-end', ''), carry: lab.add('cp-lb cp-lb-carry', 'carry<small>進位</small>'), col: lab.add('cp-lb cp-lb-col', '') };
    const tmp = V(0, 0, 0);

    function sync() {
      const r = calc(), done = state.shown > N;
      state.a.forEach((v, i) => rowA.set(i, v)); state.b.forEach((v, i) => rowB.set(i, v));
      r.bits.forEach((v, i) => rowS.set(i, v && i < state.shown && (i < N || done)));
      lb.a.innerHTML = `A = ${fromBits(state.a)}`; lb.b.innerHTML = `B = ${fromBits(state.b)}`;
      lb.s.innerHTML = done ? `A + B = ${r.value}<small>答案</small>` : 'A + B = ?<small>答案</small>';
      if (state.cur >= 0 && state.cur < N) lb.col.textContent = columnText(r.steps[state.cur]);
    }
    function pulse(i, carry) {
      boxes[i].k = 1;
      if (carry) {
        fly1.t = 0; fly1.from.set(rowA.x(i), 0.75, Z.box);
        if (i + 1 < N) fly1.to.set(rowA.x(i + 1), 0.75, Z.box); else fly1.to.set(rowA.x(N - 1) - S, 0.9, Z.sum - 0.55);
      }
    }
    function fit(w, h) {
      const vf = MathUtils.degToRad(camera.fov / 2), hf = Math.atan(Math.tan(vf) * camera.aspect);
      return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf));
    }
    const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
    function goHome(instant) {
      const t = V(-S / 4, 0.2, 0.35), p = V(0, 1.25, 1).normalize().multiplyScalar(fit(10.4, 11.6)).add(t);
      if (instant) { camera.position.copy(p); controls.target.copy(t); fly.t = 1; return; }
      fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0;
    }
    function tick(dt) {
      rowA.update(dt); rowB.update(dt); rowS.update(dt);
      boxes.forEach((x, i) => { x.k = Math.max(i === state.cur ? 0.55 : 0, x.k - dt * 1.2); x.m.emissiveIntensity = x.k * 0.7; x.top.emissiveIntensity = 0.25 + x.k * 1.2; x.b.position.y = 0.28 + x.k * 0.08; });
      if (fly1.t < 1) {
        fly1.t = Math.min(1, fly1.t + (dt * state.speed) / (HOP * 0.75));
        ball.position.lerpVectors(fly1.from, fly1.to, fly1.t); ball.position.y += Math.sin(Math.PI * fly1.t) * 0.9;
        const o = Math.min(1, fly1.t * 8) * Math.min(1, (1 - fly1.t) * 6); ball.material.opacity = o; halo.material.opacity = o * 0.9;
      } else { ball.material.opacity = 0; halo.material.opacity = 0; }
      if (fly.t < 1) {
        fly.t = Math.min(1, fly.t + dt / 1.0);
        const k = MathUtils.smootherstep(fly.t, 0, 1);
        camera.position.lerpVectors(fly.p0, fly.p1, k); controls.target.lerpVectors(fly.t0, fly.t1, k);
      }
    }
    function labels() {
      const on = state.labels, right = rowA.x(0) + S * 0.85;
      lb.a.hidden = lb.b.hidden = lb.s.hidden = !on;
      if (on) { lab.place(lb.a, tmp.set(right, 0.9, Z.a - 0.5)); lab.place(lb.b, tmp.set(right, 0.9, Z.b - 0.5)); lab.place(lb.s, tmp.set(right, 0.9, Z.sum - 0.5)); }
      lb.carry.hidden = !(fly1.t < 1); if (!lb.carry.hidden) lab.place(lb.carry, ball.position, -22);
      lb.col.hidden = !on || state.cur < 0 || state.cur >= N; if (!lb.col.hidden) lab.place(lb.col, tmp.set(rowA.x(state.cur), 0.75, Z.box + 0.2), 26);
    }
    function render() { controls.update(); labels(); renderer.render(scene, camera); }

    const ray = new Raycaster(), ndc = new Vector2();
    const hit = (e) => { const r = cv.getBoundingClientRect(); ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); ray.setFromCamera(ndc, camera); const a = rowA.hit(ray); if (a >= 0) return ['a', a]; const b = rowB.hit(ray); return b >= 0 ? ['b', b] : null; };
    let down = null;
    cv.addEventListener('pointerdown', (e) => { down = { x: e.clientX, y: e.clientY }; });
    cv.addEventListener('pointerup', (e) => {
      if (!down) return;
      const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y); down = null;
      if (moved > 6) return;
      const h = hit(e); if (h) toggle(h[0], h[1]);
    });
    cv.addEventListener('pointermove', (e) => { if (e.pointerType !== 'mouse') return; const h = hit(e); rowA.hover(h && h[0] === 'a' ? h[1] : -1); rowB.hover(h && h[0] === 'b' ? h[1] : -1); cv.style.cursor = h ? 'pointer' : ''; });
    $('.al-home').addEventListener('click', () => goHome(false));

    let band0 = null;
    function resize() {
      const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.fov = camera.aspect < 1.1 ? 42 : 34; camera.updateProjectionMatrix();
      root.classList.toggle('cp-narrow', w < 520);
      const b = camera.aspect < 0.9 ? 0 : camera.aspect < 1.25 ? 1 : 2;
      if (b !== band0) { band0 = b; goHome(true); }
    }
    new ResizeObserver(resize).observe(spaceWrap);
    resize();
    return { camera, controls, scene, sync, pulse, tick, render, goHome };
  }
  view = make3D();
  if (!view) root.classList.add('al-nogl');

  // ── 卡片示範 ──────────────────────────────────────────────────────────
  const go = (a, b, sp, en, zh) => { script = null; setPlaying(false); set(a, b); setSpeed(sp); say(en, zh); script = { t: 0, list: [{ at: 1.8, fn: () => watch() }] }; };
  const DEMO = {
    simple: () => go(5, 2, 1, '0101 + 0010. No column has two 1s, so nothing will be carried.', '0101＋0010。沒有哪一位同時有兩個 1，所以完全不用進位。'),
    one: () => go(1, 1, 0.5, '0001 + 0001: one plus one. Watch the rightmost column.', '0001＋0001：一加一。看最右邊那一位。'),
    ripple: () => go(7, 1, 0.5, '0111 + 0001. One small 1 is about to start a chain of carries.', '0111＋0001。一個小小的 1，就要引發一連串的進位。'),
    overflow: () => go(15, 1, 1, '1111 + 0001: fifteen plus one. Four lights cannot show sixteen.', '1111＋0001：十五加一。四盞燈裝不下十六。'),
  };

  function step(dt) {
    state.t += dt;
    if (script) {
      script.t += dt;
      while (script && script.list.length && script.t >= script.list[0].at) script.list.shift().fn();
      if (script && !script.list.length) script = null;
    }
    if (state.playing) {
      state.wait -= dt * state.speed;
      if (state.wait <= 0) { if (!reveal()) setPlaying(false); state.wait = HOP; }
    }
    if (view) view.tick(dt);
  }
  let raf = 0, last = 0, visible = false;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
    if (view) view.render();
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  setSpeed(1); setPlaying(false); show(); told();
  root.classList.add('al-ready', 'al-fresh');

  root.__lab = {
    state, view, set, toggle, watch, stepOnce, setPlaying, setSpeed, sum,
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => view && view.goHome(true),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { step(0); if (view) view.render(); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  const h = document.querySelector('[data-cp-half]'); if (h) initHalf(h);
  const q = document.querySelector('[data-cp-addq]'); if (q) initAddQ(q);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-compadder-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
