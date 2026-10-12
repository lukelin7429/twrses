/*
 * 電腦概論 · 第十五課「電腦怎麼『學習』？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：**不是有人把規則寫給電腦，而是給它很多有答案的例子，讓它一點一點調整自己**。
 * 場景：一張桌面，上面是蘋果（紅）和橘子（橘）——往右越重、往後越紅（**自己編的示意資料**）。
 * 一片立著的隔板＝電腦目前的「規則」。看一個例子：分對了隔板不動，分錯了就往對的方向挪一點。
 *   [data-set]  clean（24 顆、分得開）／few（只有 4 顆）／noisy（有 4 顆的答案被標錯）
 *   .al-play 一直學　.cp-step 看一個例子　.cp-reset 從頭來
 * 小一號、底下有白圈的是「沒看過的新水果」，用來檢查學得好不好（不拿來學）。
 *
 * 控制器不靠 WebGL：每一步都是 learn.js 的 stepOnce() 算的；沒有 WebGL 時 3D 不畫，右邊的計數與說明照樣能用。
 * 2D（不需要 WebGL）：自己當老師、八題選項——learn2d.js、key2d.js。
 *
 * 產物：cd tools/computers && npm run build → assets/js/comp-learn.js
 * 除錯：document.querySelector('[data-complearn-lab]').__lab
 *   setSet(kind)、stepOnce()、setPlaying(bool)、reset()、demo('one'|'clean'|'few'|'noisy')、run(秒)、goCam()、render()、cur()
 */
import {
  AmbientLight, BoxGeometry, CircleGeometry, Color, DirectionalLight, DoubleSide, HemisphereLight,
  MathUtils, Mesh, MeshStandardMaterial, PerspectiveCamera, RingGeometry, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { initChoice } from './key2d.js';
import { LIMIT, TEST, errors, init, makeSet, predict, segment, stepOnce } from './learn.js';
import { initTeach } from './learn2d.js';

const V = (x, y, z) => new Vector3(x, y, z);
const STEP = 0.34, MAXP = 24;
const P = (p, y = 0.32) => V(p.x - 5, y, 5 - p.y);

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space'), cv = $('.al-space-cv');
  const R = { msg: $('.cp-msg'), play: $('.al-play'), sets: [...$$('[data-set]')], seen: $('.cp-ln-seen'), moves: $('.cp-ln-moves'), wrong: $('.cp-ln-wrong'), fresh: $('.cp-ln-new'), n: $('.cp-ln-n') };
  const state = { set: 'clean', playing: false, wait: 0, last: null, run: 0, done: false, labels: true };
  let pts = makeSet('clean'), m = init(), view = null;
  const fruit = (l, zh) => (l > 0 ? (zh ? '蘋果' : 'an apple') : (zh ? '橘子' : 'an orange'));
  const say = (en, zh) => { R.msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  function show() {
    R.sets.forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-set') === state.set ? 'true' : 'false'));
    R.seen.textContent = String(m.seen); R.moves.textContent = String(m.moves); R.wrong.textContent = String(errors(m, pts)); R.n.textContent = String(pts.length);
    R.fresh.textContent = `${TEST.length - errors(m, TEST)} / ${TEST.length}`;
    R.play.setAttribute('aria-pressed', state.playing ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = state.playing ? 'Pause · 暫停' : state.done ? 'Learn again · 再學一次' : 'Keep learning · 一直學';
  }
  function finish() {
    state.done = true; state.playing = false;
    const w = errors(m, pts), t = TEST.length - errors(m, TEST);
    if (state.set === 'clean') say(`Done. After ${m.seen} examples the wall has moved ${m.moves} times, and every fruit is on the right side. Nobody told the computer where to put the wall. It also gets ${t} of the ${TEST.length} new fruits right, though it never saw them.`, `學好了。看了 ${m.seen} 個例子，隔板挪了 ${m.moves} 次，現在每一顆水果都在對的那一邊。沒有人告訴電腦隔板該放哪裡。那 ${TEST.length} 顆它從來沒看過的新水果，它也分對了 ${t} 顆。`);
    else if (state.set === 'few') say(`Done already, after only ${m.seen} examples. All ${pts.length} fruits are on the right side, so the computer has no reason to move the wall again. But look at the new fruits: it gets only ${t} of ${TEST.length} right. Four examples were not enough to show where the border really is.`, `才看了 ${m.seen} 個例子就學完了。${pts.length} 顆水果都在對的那一邊，所以電腦沒有理由再挪隔板。可是看看那些新水果：${TEST.length} 顆只分對 ${t} 顆。四個例子不夠，看不出真正的界線在哪裡。`);
    else say(`Stopped after ${m.seen} examples. The wall has moved ${m.moves} times and is still wrong on ${w} fruits. It will never reach zero: four of the answers it was given are wrong, and no wall can agree with all of them. The computer cannot know which answers to doubt.`, `看了 ${m.seen} 個例子後停下來。隔板挪了 ${m.moves} 次，還是有 ${w} 顆分錯。它永遠到不了零：它拿到的答案裡有四個是錯的，沒有任何一片隔板能同時符合全部。電腦沒辦法知道該懷疑哪幾個答案。`);
    show();
  }
  function stepOnce1() {
    if (state.done) return false;
    const r = stepOnce(m, pts), p = pts[r.i]; m = r.model; state.last = { i: r.i, wrong: r.wrong, t: 0 }; state.run = r.wrong ? 0 : state.run + 1;
    if (r.wrong) say(`Example ${m.seen}: ${fruit(p.label)}, weight ${p.x}, redness ${p.y}. The wall has it on the wrong side. So the wall moves a little, toward getting this one right.`, `第 ${m.seen} 個例子：${fruit(p.label, 1)}，重量 ${p.x}、紅度 ${p.y}。隔板把它分到錯的那一邊了，所以隔板挪一點，往「把這一顆分對」的方向。`);
    else say(`Example ${m.seen}: ${fruit(p.label)}, weight ${p.x}, redness ${p.y}. The wall already has it on the right side. Nothing changes.`, `第 ${m.seen} 個例子：${fruit(p.label, 1)}，重量 ${p.x}、紅度 ${p.y}。隔板已經把它分在對的那一邊了。什麼都不改。`);
    root.classList.remove('al-fresh');
    if (state.run >= pts.length || m.seen >= LIMIT) finish(); else show();
    return true;
  }
  function rewind() { pts = makeSet(state.set); m = init(); state.playing = false; state.last = null; state.run = 0; state.done = false; if (view) view.setSet(); show(); intro(); }
  function setSet(k) { state.set = k; rewind(); }
  function setPlaying(on) { if (on && state.done) rewind(); state.playing = on; state.wait = 0.2; show(); }
  const INTRO = {
    clean: ['Red apples and orange oranges lie on the table: heavier ones to the right, redder ones toward the back. The wall is the computer’s rule, and it starts in a bad place. Press “One example,” or “Keep learning.”', '桌上有紅色的蘋果和橘色的橘子：越重的越靠右，越紅的越靠後。隔板是電腦的規則，一開始擺在很差的位置。按「看一個例子」，或「一直學」。'],
    few: ['This time the computer is given only four examples. Press “Keep learning,” then compare the result with the small new fruits it has never seen.', '這一次只給電腦四個例子。按「一直學」，再拿結果和那些它沒看過的小顆新水果比一比。'],
    noisy: ['Someone made mistakes: four fruits carry the wrong answer. Each is marked. The computer does not know that. Press “Keep learning” and watch the wall.', '有人弄錯了：有四顆水果的答案標錯了，上面都有記號。電腦並不知道。按「一直學」，注意看隔板。'],
  };
  const intro = () => say(...INTRO[state.set]);

  R.sets.forEach((b) => b.addEventListener('click', () => setSet(b.getAttribute('data-set'))));
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  $('.cp-step').addEventListener('click', () => { state.playing = false; if (state.done) rewind(); stepOnce1(); show(); });
  $('.cp-reset').addEventListener('click', () => rewind());
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
    controls.minDistance = 3; controls.maxDistance = 50; controls.maxPolarAngle = Math.PI * 0.49;
    scene.add(new HemisphereLight(0xeaf0ff, 0x1a2030, 1.15)); scene.add(new AmbientLight(0xffffff, 0.4));
    const sun = new DirectionalLight(0xfff1dc, 1.3); sun.position.set(-4, 9, 6); scene.add(sun);
    const floor = new Mesh(new CircleGeometry(90, 64), new MeshStandardMaterial({ color: 0x121c36, roughness: 0.95 }));
    floor.rotation.x = -Math.PI / 2; floor.position.y = -0.3; scene.add(floor);
    const mat = (c, o = {}) => new MeshStandardMaterial({ color: c, roughness: 0.6, ...o });
    const board = new Mesh(new BoxGeometry(10.6, 0.3, 10.6), mat(0xe9dcc0, { roughness: 0.85 })); board.position.y = -0.15; scene.add(board);
    for (let i = 0; i <= 10; i += 2) { for (const horiz of [0, 1]) { const g = new Mesh(new BoxGeometry(horiz ? 10 : 0.02, 0.01, horiz ? 0.02 : 10), mat(0xc9b78f)); g.position.set(horiz ? 0 : i - 5, 0.006, horiz ? i - 5 : 0); scene.add(g); } }
    const mA = mat(0xd62828, { roughness: 0.45, emissive: 0xd62828, emissiveIntensity: 0 }), mO = mat(0xff9a2e, { roughness: 0.55, emissive: 0xff9a2e, emissiveIntensity: 0 });
    const sph = new SphereGeometry(0.3, 20, 14), ringG = new RingGeometry(0.36, 0.46, 28);
    const fruits = []; for (let i = 0; i < MAXP; i++) { const f = new Mesh(sph, mA); const r = new Mesh(ringG, mat(0x1d2a44, { side: DoubleSide })); r.rotation.x = -Math.PI / 2; r.visible = false; scene.add(f); scene.add(r); fruits.push({ f, r }); }
    const tests = TEST.map((p) => { const f = new Mesh(sph, p.label > 0 ? mA : mO); f.scale.setScalar(0.55); f.position.copy(P(p, 0.18)); scene.add(f); const r = new Mesh(new RingGeometry(0.2, 0.27, 24), mat(0xffffff, { side: DoubleSide })); r.rotation.x = -Math.PI / 2; r.position.copy(P(p, 0.012)); scene.add(r); return { f, r, p }; });
    const wallM = mat(0x7ef0e3, { transparent: true, opacity: 0.42, emissive: 0x7ef0e3, emissiveIntensity: 0.35, side: DoubleSide });
    const wall = new Mesh(new BoxGeometry(1, 1.5, 0.06), wallM); scene.add(wall);
    const cur = new Mesh(new RingGeometry(0.42, 0.56, 32), mat(0xffd36e, { emissive: 0xffd36e, emissiveIntensity: 0.9, side: DoubleSide })); cur.rotation.x = -Math.PI / 2; cur.visible = false; scene.add(cur);
    const tgt = { x: 0, z: 0, ang: 0, len: 10 }, now = { x: 0, z: 0, ang: 0, len: 10, ok: false };
    const lab = labeler($('.al-labels'), cv, camera);
    const lbAx = [lab.add('cp-lb cp-lb-end', 'heavier →<small>越重</small>'), lab.add('cp-lb cp-lb-end', 'redder ↑<small>越紅</small>')];
    const lbSide = [lab.add('cp-lb cp-lb-side is-a', 'apple side<small>蘋果這一邊</small>'), lab.add('cp-lb cp-lb-side is-o', 'orange side<small>橘子這一邊</small>')];
    const lbFlip = [0, 1, 2, 3].map(() => lab.add('cp-lb cp-lb-flip', 'wrong label<small>答案標錯</small>'));
    const tmp = V(0, 0, 0);
    const api = {
      setSet() {
        fruits.forEach((o, i) => { const p = pts[i]; o.f.visible = !!p; o.r.visible = !!p && !!p.flipped; if (!p) return; o.f.material = p.label > 0 ? mA : mO; o.f.position.copy(P(p)); o.r.position.copy(P(p, 0.014)); });
        now.ok = false; cur.visible = false;
      },
    };
    function tick(dt) {
      const s = segment(m);
      if (s) { const a = V(s[0][0] - 5, 0, 5 - s[0][1]), b = V(s[1][0] - 5, 0, 5 - s[1][1]); tgt.x = (a.x + b.x) / 2; tgt.z = (a.z + b.z) / 2; tgt.len = a.distanceTo(b); tgt.ang = Math.atan2(-(b.z - a.z), b.x - a.x); }
      if (!now.ok) { Object.assign(now, tgt); now.ok = true; }
      const e = Math.min(1, dt * 7); let d = tgt.ang - now.ang; d = Math.atan2(Math.sin(d), Math.cos(d)); if (Math.abs(d) > Math.PI / 2) d -= Math.sign(d) * Math.PI;
      now.ang += d * e; now.x += (tgt.x - now.x) * e; now.z += (tgt.z - now.z) * e; now.len += (tgt.len - now.len) * e;
      wall.position.set(now.x, 0.75, now.z); wall.rotation.y = now.ang; wall.scale.x = now.len;
      if (state.last) { state.last.t += dt; const p = pts[state.last.i]; cur.visible = true; cur.position.copy(P(p, 0.02)); cur.material.color.set(state.last.wrong ? 0xff6b5c : 0xffd36e); cur.material.emissive.set(state.last.wrong ? 0xff6b5c : 0xffd36e); wallM.emissiveIntensity = 0.35 + (state.last.wrong ? Math.max(0, 1 - state.last.t * 2.5) : 0); } else { cur.visible = false; wallM.emissiveIntensity = 0.35; }
      tests.forEach((o) => { const ok = predict(m, o.p) === o.p.label; o.r.material.color.set(ok ? 0xffffff : 0xff6b5c); });
      if (flyC.t < 1) { flyC.t = Math.min(1, flyC.t + dt / 1.0); const q = MathUtils.smootherstep(flyC.t, 0, 1); camera.position.lerpVectors(flyC.p0, flyC.p1, q); controls.target.lerpVectors(flyC.t0, flyC.t1, q); }
    }
    function fit(w, h) { const vf = MathUtils.degToRad(camera.fov / 2), hf = Math.atan(Math.tan(vf) * camera.aspect); return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf)); }
    const flyC = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
    function goHome(instant) {
      const tg = V(0, 0.2, 0.3), p = V(0, 1.05, 0.9).normalize().multiplyScalar(fit(12.6, 11.4)).add(tg);
      if (instant) { camera.position.copy(p); controls.target.copy(tg); flyC.t = 1; return; }
      flyC.p0.copy(camera.position); flyC.t0.copy(controls.target); flyC.p1.copy(p); flyC.t1.copy(tg); flyC.t = 0;
    }
    function labels() {
      const on = state.labels;
      lbAx.forEach((l) => { l.hidden = !on; }); lbSide.forEach((l) => { l.hidden = !on; });
      if (on) {
        lab.place(lbAx[0], tmp.set(3.6, 0.05, 5.75)); lab.place(lbAx[1], tmp.set(-5.75, 0.05, -3.6));
        const n = Math.hypot(m.a, m.b) || 1, ux = m.a / n, uy = m.b / n, cx = Math.max(-3.4, Math.min(3.4, now.x)), cz = Math.max(-3.4, Math.min(3.4, now.z));
        lab.place(lbSide[0], tmp.set(cx + ux * 2.1, 1.25, cz - uy * 2.1)); lab.place(lbSide[1], tmp.set(cx - ux * 2.1, 1.25, cz + uy * 2.1));
      }
      const fl = pts.filter((p) => p.flipped); lbFlip.forEach((l, i) => { l.hidden = !on || !fl[i]; if (!l.hidden) lab.place(l, P(fl[i], 0.75)); });
    }
    function render() { controls.update(); labels(); renderer.render(scene, camera); }
    $('.al-home').addEventListener('click', () => goHome(false));
    let band0 = null;
    function resize() {
      const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.fov = camera.aspect < 1.1 ? 42 : 34; camera.updateProjectionMatrix();
      root.classList.toggle('cp-narrow', w < 520);
      const bnd = camera.aspect < 0.9 ? 0 : camera.aspect < 1.25 ? 1 : 2;
      if (bnd !== band0) { band0 = bnd; goHome(true); }
    }
    new ResizeObserver(resize).observe(spaceWrap);
    api.setSet(); resize();
    return { ...api, camera, controls, scene, tick, render, goHome };
  }
  view = make3D();
  if (!view) root.classList.add('al-nogl');

  const DEMO = { one() { setSet('clean'); stepOnce1(); stepOnce1(); }, clean() { setSet('clean'); setPlaying(true); }, few() { setSet('few'); setPlaying(true); }, noisy() { setSet('noisy'); setPlaying(true); } };
  function step(dt) {
    if (state.playing && !state.done) { state.wait -= dt; if (state.wait <= 0) { state.wait = state.set === 'noisy' ? STEP * 0.3 : STEP; stepOnce1(); } }
    if (view) view.tick(dt);
  }
  let raf = 0, last = 0, visible = false;
  function frame(ts) { raf = 0; if (!visible) return; const dt = Math.min(0.05, (ts - (last || ts)) / 1000); last = ts; step(dt); if (view) view.render(); raf = requestAnimationFrame(frame); }
  new IntersectionObserver((ents) => { visible = ents[0].isIntersecting; if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); } }, { rootMargin: '120px' }).observe(root);

  show(); intro();
  root.classList.add('al-ready', 'al-fresh');

  root.__lab = {
    state, view, setSet, stepOnce: stepOnce1, setPlaying, reset: rewind, cur: () => ({ m, wrong: errors(m, pts), test: TEST.length - errors(m, TEST), n: pts.length }),
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => view && view.goHome(true),
    run: (sec) => { for (let x = 0; x < sec; x += 0.02) step(0.02); },
    render: () => { step(0); if (view) view.render(); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  const t = document.querySelector('[data-cp-teach]'); if (t) initTeach(t);
  document.querySelectorAll('[data-cp-choice]').forEach((el) => initChoice(el));
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-complearn-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
