/*
 * 電腦概論 · 第九課「程式是什麼？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：**程式是一步一步的指令；電腦只照字面做，不會猜你的意思**。三種積木：順序、重複、條件。
 * 場景：6 × 6 的格子地板、牆、一面旗子、一台走格子的小機器人。右邊是程式，一行一行；正在做的那一行亮起來。
 *   [data-prog]   四個程式：seq（十五條照順序）、loop（同一條路改用「重複 4 次」，五條）、
 *                 bug（漏了一條右轉，機器人照做到底、停在別的地方）、cond（「如果前面是牆就左轉」）
 *   .cp-rb-room   cond 專用：同一個程式換到另一個房間再跑一次
 *   .al-play 執行／暫停　.cp-step 一次一步　.cp-reset 回到起點
 *
 * 控制器不靠 WebGL：每一步都是 robot.js 的 run() 算好的；沒有 WebGL 時 3D 不畫，右邊的程式與說明照樣能用。
 * 2D（不需要 WebGL）：排指令走到旗子、它最後面向哪一邊——robot2d.js、key2d.js。
 *
 * 產物：cd tools/computers && npm run build → assets/js/comp-robot.js
 * 除錯：document.querySelector('[data-comprobot-lab]').__lab
 *   load('seq'|'loop'|'bug'|'cond')、setRoom('roomA'|'roomB')、stepOnce()、setPlaying(bool)、reset()、demo(...)、run(秒)、goCam()、render()、res()
 */
import {
  AmbientLight, BoxGeometry, CircleGeometry, Color, ConeGeometry, CylinderGeometry, DirectionalLight, Group, HemisphereLight,
  MathUtils, Mesh, MeshStandardMaterial, PerspectiveCamera, Scene, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { initChoice } from './key2d.js';
import { PROGS, ROOMS, count, run } from './robot.js';
import { initMaze, lines } from './robot2d.js';

const V = (x, y, z) => new Vector3(x, y, z);
const STEP = 0.55;   // 一步幾秒

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space'), cv = $('.al-space-cv');
  const R = { msg: $('.cp-msg'), play: $('.al-play'), progs: [...$$('[data-prog]')], room: $('.cp-rb-room'), code: $('.cp-rb-code'), n: $('.cp-rb-n'), steps: $('.cp-rb-steps'), step: $('.cp-step') };
  const state = { prog: 'seq', room: 'stairs', i: -1, playing: false, wait: 0, labels: true };
  let res = null, list = [], view = null;

  const say = (en, zh) => { R.msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  const cur = () => (state.i >= 0 ? res.steps[state.i] : null);
  function compile() {
    const p = PROGS[state.prog].prog; res = run(ROOMS[state.room], p); list = lines(p);
    R.code.innerHTML = list.map((l) => `<li data-path="${l.path}" style="--d:${l.depth}">${l.en}<small>${l.zh}</small>${l.rep ? '<b class="cp-rb-round"></b>' : ''}</li>`).join('');
    R.n.textContent = String(count(p));
  }
  function show() {
    const s = cur(), key = s ? s.path.join('.') : '';
    R.code.querySelectorAll('li').forEach((li) => { const p = li.getAttribute('data-path'); li.classList.toggle('is-on', p === key); li.classList.toggle('is-in', !!key && key.startsWith(`${p}.`)); const b = li.querySelector('.cp-rb-round'); if (b) b.textContent = s && key.startsWith(`${p}.`) ? `round ${s.iter} · 第 ${s.iter} 輪` : ''; });
    const on = R.code.querySelector('.is-on'); if (on && on.scrollIntoView && R.code.scrollHeight > R.code.clientHeight) R.code.scrollTop = Math.max(0, on.offsetTop - R.code.clientHeight / 2);
    R.steps.textContent = String(state.i + 1);
    R.progs.forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-prog') === state.prog ? 'true' : 'false'));
    R.room.hidden = state.prog !== 'cond';
    R.room.textContent = state.room === 'roomB' ? 'Back to the first room · 回到第一個房間' : 'Same program, another room · 同一個程式，換一個房間';
    R.play.setAttribute('aria-pressed', state.playing ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = state.playing ? 'Pause · 暫停' : state.i >= res.steps.length - 1 ? 'Run again · 再跑一次' : 'Run · 執行';
  }
  function tell() {
    const s = cur(); if (!s) return;
    const last = state.i === res.steps.length - 1;
    let en, zh;
    if (s.op === 'F') { en = s.event === 'bump' ? 'Forward. But there is a wall, so the robot bumps into it.' : 'Forward one square.'; zh = s.event === 'bump' ? '前進。可是前面是牆，機器人撞上去了。' : '前進一格。'; }
    else if (s.op === 'L') { en = 'Turn left. The robot stays on the same square.'; zh = '左轉。機器人還在同一格。'; }
    else if (s.op === 'R') { en = 'Turn right. The robot stays on the same square.'; zh = '右轉。機器人還在同一格。'; }
    else { en = s.event === 'yes' ? 'Is there a wall ahead? Yes. So it does what is inside.' : 'Is there a wall ahead? No. So it skips what is inside.'; zh = s.event === 'yes' ? '前面是牆嗎？是。所以做裡面的事。' : '前面是牆嗎？不是。所以跳過裡面的事。'; }
    if (last) {
      const n = count(PROGS[state.prog].prog), k = res.steps.length;
      if (res.result === 'goal') { en += ` It reached the flag: ${n} instructions written, ${k} steps taken.`; zh += `走到旗子了：寫了 ${n} 條指令，走了 ${k} 步。`; }
      else if (res.result === 'bump') { en += ' The program stops here. The robot does not look for another way, because no instruction told it to.'; zh += '程式停在這裡。機器人不會自己找別條路，因為沒有哪一條指令叫它這樣做。'; }
      else { en += ' The program is finished, but the robot is not at the flag. It did exactly what was written. The mistake is in the program, not in the robot.'; zh += '程式做完了，可是機器人不在旗子那裡。它完全照寫的做。錯的是程式，不是機器人。'; }
    }
    say(en, zh);
  }
  function goto(i) { state.i = i; if (view) view.move(); tell(); root.classList.remove('al-fresh'); show(); }
  function stepOnce() { if (state.i >= res.steps.length - 1) { state.playing = false; show(); return false; } goto(state.i + 1); state.wait = STEP; if (state.i >= res.steps.length - 1) { state.playing = false; show(); } return true; }
  function setPlaying(on) { if (on && state.i >= res.steps.length - 1) rewind(); state.playing = on; state.wait = 0.25; show(); }
  function rewind() { state.i = -1; state.playing = false; if (view) view.move(true); show(); }
  function load(key, room) { state.prog = key; state.room = room || PROGS[key].room; compile(); if (view) view.setRoom(); rewind(); intro(); }
  function setRoom(room) { load(state.prog, room); }
  function reset() { rewind(); intro(); }
  const INTRO = {
    seq: ['Fifteen instructions, one after another. The robot does them in order, from top to bottom. Press Run.', '十五條指令，一條接一條。機器人從上到下照順序做。按「執行」。'],
    loop: ['The same walk, written with a repeat. Five instructions instead of fifteen. Press Run and watch the rounds.', '同一段路，改用「重複」來寫：十五條變成五條。按「執行」，注意看第幾輪。'],
    bug: ['Someone left out one “turn right.” The robot cannot know that. Press Run and see where it ends up.', '有人漏寫了一條「右轉」。機器人不會知道。按「執行」，看它最後停在哪裡。'],
    cond: ['This program asks a question before every step: is there a wall ahead? Press Run. Then try the same program in another room.', '這個程式每走一步之前都先問一個問題：前面是牆嗎？按「執行」，然後把同一個程式換到另一個房間試試。'],
  };
  const intro = () => say(...INTRO[state.prog]);
  const user = () => {};

  R.progs.forEach((b) => b.addEventListener('click', () => { user(); load(b.getAttribute('data-prog')); }));
  R.room.addEventListener('click', () => { user(); setRoom(state.room === 'roomA' ? 'roomB' : 'roomA'); });
  R.play.addEventListener('click', () => { user(); setPlaying(!state.playing); });
  R.step.addEventListener('click', () => { user(); state.playing = false; if (state.i >= res.steps.length - 1) rewind(); stepOnce(); });
  $('.cp-reset').addEventListener('click', () => { user(); reset(); });
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
    scene.add(new HemisphereLight(0xeaf0ff, 0x1a2030, 1.15)); scene.add(new AmbientLight(0xffffff, 0.35));
    const sun = new DirectionalLight(0xfff1dc, 1.3); sun.position.set(-4, 9, 6); scene.add(sun);
    const floor = new Mesh(new CircleGeometry(90, 64), new MeshStandardMaterial({ color: 0x121c36, roughness: 0.95 }));
    floor.rotation.x = -Math.PI / 2; floor.position.y = -0.02; scene.add(floor);
    const mat = (c, o = {}) => new MeshStandardMaterial({ color: c, roughness: 0.65, ...o });
    const N = 6, P = (x, y) => V(x - (N - 1) / 2, 0, y - (N - 1) / 2);
    const cA = new Color(0x2a3a5e), cB = new Color(0x24324f), cSeen = new Color(0x2f8f86), cStart = new Color(0x6b5a2a);
    const tiles = [];
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { const m = mat(0x2a3a5e); const t = new Mesh(new BoxGeometry(0.94, 0.08, 0.94), m); t.position.copy(P(x, y)).setY(0.04); scene.add(t); tiles.push({ m, seen: 0 }); }
    const wallM = mat(0x8a93a6, { roughness: 0.8 }), wallG = new BoxGeometry(0.94, 0.36, 0.94), walls = [];
    for (let i = 0; i < 8; i++) { const w = new Mesh(wallG, wallM); w.visible = false; scene.add(w); walls.push(w); }
    const flag = new Group(); scene.add(flag);
    const pole = new Mesh(new CylinderGeometry(0.03, 0.03, 1.1, 8), mat(0xdfe3ea)); pole.position.y = 0.6; flag.add(pole);
    const cloth = new Mesh(new BoxGeometry(0.42, 0.28, 0.03), mat(0xd4574a, { emissive: 0xd4574a, emissiveIntensity: 0.25 })); cloth.position.set(0.22, 0.98, 0); flag.add(cloth);
    // 機器人：面向 −z（北）
    const bot = new Group(); scene.add(bot);
    const bodyM = mat(0xffd36e, { emissive: 0xffd36e, emissiveIntensity: 0.12 });
    const body = new Mesh(new BoxGeometry(0.52, 0.4, 0.52), bodyM); body.position.y = 0.34; bot.add(body);
    const head = new Mesh(new BoxGeometry(0.36, 0.26, 0.36), mat(0xe9edf5)); head.position.y = 0.68; bot.add(head);
    for (const x of [-0.09, 0.09]) { const e = new Mesh(new BoxGeometry(0.07, 0.07, 0.03), mat(0x1d2a44)); e.position.set(x, 0.7, -0.19); bot.add(e); }
    const nose = new Mesh(new ConeGeometry(0.11, 0.26, 12), mat(0x7ef0e3, { emissive: 0x7ef0e3, emissiveIntensity: 0.5 })); nose.rotation.x = -Math.PI / 2; nose.position.set(0, 0.3, -0.4); bot.add(nose);

    const anim = { t: 1, from: V(0, 0, 0), to: V(0, 0, 0), a0: 0, a1: 0, bump: false };
    const ang = (dir) => -dir * Math.PI / 2;
    const api = {
      setRoom() {
        const lv = ROOMS[state.room]; let k = 0;
        for (const key of lv.walls) { const [x, y] = key.split(',').map(Number); walls[k].position.copy(P(x, y)).setY(0.26); walls[k].visible = true; k++; }
        for (; k < walls.length; k++) walls[k].visible = false;
        flag.position.copy(P(lv.flag.x, lv.flag.y));
      },
      move(instant) {
        const lv = ROOMS[state.room], s = cur() || lv.start, p = state.i > 0 ? res.steps[state.i - 1] : lv.start;
        if (instant || state.i < 0) { bot.position.copy(P(s.x, s.y)); bot.rotation.y = ang(s.dir); anim.t = 1; anim.a1 = bot.rotation.y; tiles.forEach((t) => { t.seen = 0; }); return; }
        anim.from.copy(P(p.x, p.y)); anim.to.copy(P(s.x, s.y)); anim.a0 = bot.rotation.y;
        let d = ang(s.dir) - anim.a0; d = Math.atan2(Math.sin(d), Math.cos(d)); anim.a1 = anim.a0 + d; anim.t = 0; anim.bump = s.event === 'bump';
        tiles[s.y * N + s.x].seen = 1;
      },
    };
    const lab = labeler($('.al-labels'), cv, camera);
    const lbF = lab.add('cp-lb cp-lb-end', 'flag<small>旗子</small>'), lbR = lab.add('cp-lb cp-lb-end', 'robot<small>機器人</small>'), lbS = lab.add('cp-lb cp-lb-end', 'start<small>起點</small>');
    const tmp = V(0, 0, 0);

    function tick(dt) {
      const lv = ROOMS[state.room];
      if (anim.t < 1) {
        anim.t = Math.min(1, anim.t + dt / (STEP * 0.8)); const k = MathUtils.smootherstep(anim.t, 0, 1);
        bot.position.lerpVectors(anim.from, anim.to, k); bot.rotation.y = anim.a0 + (anim.a1 - anim.a0) * k;
        if (anim.bump) { const f = Math.sin(Math.PI * anim.t) * 0.22; bot.position.x -= Math.sin(anim.a1) * f; bot.position.z -= Math.cos(anim.a1) * f; }
        bot.position.y = Math.sin(Math.PI * k) * (anim.from.distanceTo(anim.to) > 0.1 ? 0.08 : 0);
      }
      bodyM.color.set(res.result === 'bump' && state.i === res.steps.length - 1 ? 0xff7a66 : 0xffd36e);
      tiles.forEach((t, i) => { const x = i % N, y = Math.floor(i / N); const base = lv.start.x === x && lv.start.y === y ? cStart : (x + y) % 2 ? cA : cB; t.m.color.lerp(t.seen ? cSeen : base, Math.min(1, dt * 6)); });
      cloth.rotation.y = Math.sin(performance.now() / 500) * 0.25;
      if (flyC.t < 1) { flyC.t = Math.min(1, flyC.t + dt / 1.0); const k = MathUtils.smootherstep(flyC.t, 0, 1); camera.position.lerpVectors(flyC.p0, flyC.p1, k); controls.target.lerpVectors(flyC.t0, flyC.t1, k); }
    }
    function fit(w, h) { const vf = MathUtils.degToRad(camera.fov / 2), hf = Math.atan(Math.tan(vf) * camera.aspect); return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf)); }
    const flyC = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
    function goHome(instant) {
      const tg = V(0, 0.3, 0.1), p = V(0, 1.25, 0.72).normalize().multiplyScalar(fit(8.2, 7.9)).add(tg);
      if (instant) { camera.position.copy(p); controls.target.copy(tg); flyC.t = 1; return; }
      flyC.p0.copy(camera.position); flyC.t0.copy(controls.target); flyC.p1.copy(p); flyC.t1.copy(tg); flyC.t = 0;
    }
    function labels() {
      const on = state.labels, lv = ROOMS[state.room];
      lbF.hidden = lbR.hidden = lbS.hidden = !on; if (!on) return;
      lab.place(lbF, tmp.copy(flag.position).setY(1.45)); lab.place(lbR, tmp.copy(bot.position).setY(1.05), -14);
      const away = state.i >= 0 && (cur().x !== lv.start.x || cur().y !== lv.start.y); lbS.hidden = !away; if (away) lab.place(lbS, tmp.copy(P(lv.start.x, lv.start.y)).setY(0.3));
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
    resize();
    return { ...api, camera, controls, scene, tick, render, goHome };
  }
  compile();
  view = make3D();
  if (!view) root.classList.add('al-nogl');
  else { view.setRoom(); view.move(true); }

  const DEMO = {
    seq() { load('seq'); setPlaying(true); }, loop() { load('loop'); setPlaying(true); },
    bug() { load('bug'); setPlaying(true); }, cond() { load('cond'); setPlaying(true); },
  };

  function step(dt) {
    if (state.playing) { state.wait -= dt; if (state.wait <= 0) stepOnce(); }
    if (view) view.tick(dt);
  }
  let raf = 0, last = 0, visible = false;
  function frame(ts) { raf = 0; if (!visible) return; const dt = Math.min(0.05, (ts - (last || ts)) / 1000); last = ts; step(dt); if (view) view.render(); raf = requestAnimationFrame(frame); }
  new IntersectionObserver((ents) => { visible = ents[0].isIntersecting; if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); } }, { rootMargin: '120px' }).observe(root);

  show(); intro();
  root.classList.add('al-ready', 'al-fresh');

  root.__lab = {
    state, view, load, setRoom, stepOnce, setPlaying, reset, res: () => res,
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => view && view.goHome(true),
    run: (sec) => { for (let x = 0; x < sec; x += 0.02) step(0.02); },
    render: () => { step(0); if (view) view.render(); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  const m = document.querySelector('[data-cp-maze]'); if (m) initMaze(m);
  document.querySelectorAll('[data-cp-choice]').forEach((el) => initChoice(el));
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-comprobot-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
