/*
 * 書法 · 第十一課「怎麼寫春聯？」的 3D 模型（寫字引擎示範＋一扇示意的大門，全部自繪）。
 *
 *   data-mode="write"  書桌上一張斗方（轉 45 度的紅色方紙），毛筆照筆順寫「春」或「福」（data-char="chun|fu"）。
 *                      紙是菱形，字是正的（brush3d.js makePaper 的 diamond）。右側顯示現在寫到第幾筆、叫什麼。
 *   data-mode="door"   一扇大門：兩邊各一條直的春聯、門楣上一條橫批、兩扇門板上各一張斗方（春、福）。
 *                      data-couplet 換一副對聯（root 的 data-couplets：[{ a, b, top }]，a 是上聯、b 是下聯）；
 *                      .cg-swap 左右對調、.cg-check 檢查貼得對不對（上聯在面對大門的右手邊）、.cg-flip 把「福」倒過來或轉正。
 *                      春聯上的字用系統字型畫（不是書法範本）；斗方上的「春」「福」是寫字引擎的筆畫資料。
 * 2D（不需要 WebGL）：卡片小圖、「哪一句是上聯？」（couplet2d.js）、練字板（pad.js：春、福）。
 *
 * 座標同 brush3d.js。產物：cd tools/callig && npm run build → assets/js/cal-couplets.js
 * 除錯：document.querySelector('[data-calcouplets-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, CanvasTexture, Color, DirectionalLight, Group, HemisphereLight, MathUtils, Mesh, MeshStandardMaterial, PCFShadowMap,
  PerspectiveCamera, PlaneGeometry, SRGBColorSpace, Scene, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { clamp } from './brush.js';
import { makeBrush, makePaper, makeWriter, placeBrush } from './brush3d.js';
import { canvasTex, labeler, lazyBoot } from './common.js';
import { CHARS, RED, drawFang, drawMinis, drawStrip, drawTop, initSides, upperIndex } from './couplet2d.js';
import { makeDesk } from './desk.js';
import { initPad } from './pad.js';

const V = (x, y, z) => new Vector3(x, y, z);
const ease = (x) => MathUtils.smootherstep(clamp(x), 0, 1);
const PAPER = { w: 4.3, box: 2.05, z: 0.3 };            // 斗方：對角線 4.3（約 43 公分），字框在中間
const DOOR = { leafW: 1.05, h: 2.7, stripW: 0.46, stripH: 2.3, stripX: 1.62, stripY: 1.42, topW: 2.0, topH: 0.46, topY: 3.12, fang: 0.86, fangY: 1.6 };
const SEQ0 = 0.6;

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space');
  const cv = $('.al-space-cv');
  const COUPLETS = JSON.parse(root.getAttribute('data-couplets') || '[]');
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas: cv, antialias: true });
  } catch (e) {
    root.classList.add('al-nogl');
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;
  const scene = new Scene();
  scene.background = new Color(0x0b1326);
  const camera = new PerspectiveCamera(34, 1, 0.05, 200);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 0.5; controls.maxDistance = 30;
  scene.add(new HemisphereLight(0xfff4e0, 0x2a2018, 0.85));
  scene.add(new AmbientLight(0xffffff, 0.18));
  const sun = new DirectionalLight(0xfff1dc, 1.5);
  sun.position.set(-4, 9, 6); sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -6, right: 6, top: 6, bottom: -4, near: 1, far: 30 });
  sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.02;
  scene.add(sun);

  // ---------- 書桌（寫字） ----------
  const deskG = new Group(); scene.add(deskG);
  {
    const tmp = new Scene();
    makeDesk(tmp, { w: 9, d: 6.4, felt: [0, PAPER.z, 5.4, 5.0], weight: [3.4, -1.2, 1.6], stone: [-3.5, -0.4] });
    [...tmp.children].forEach((c) => deskG.add(c));
  }
  const paper = makePaper({ w: PAPER.w, h: PAPER.w, x: 0, y: 0.016, z: PAPER.z, box: PAPER.box, grid: false, color: RED, diamond: true });
  paper.mesh.receiveShadow = true; deskG.add(paper.mesh);
  const brush = makeBrush({ hair: 'mixed' });
  brush.group.traverse((m) => { if (m.isMesh) m.castShadow = true; });
  deskG.add(brush.group); brush.setInk(1);

  // ---------- 大門（貼春聯） ----------
  const doorG = new Group(); scene.add(doorG);
  const tex = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace; t.anisotropy = 4; return { c, t, g: c.getContext('2d') }; };
  {
    const wallT = canvasTex((g, W, H) => {
      g.fillStyle = '#e9e2d2'; g.fillRect(0, 0, W, H);
      for (let i = 0; i < 1800; i++) { g.fillStyle = `rgba(${Math.random() < 0.5 ? '120,105,80' : '255,255,255'},${0.03 + Math.random() * 0.05})`; g.fillRect(Math.random() * W, Math.random() * H, 2 + Math.random() * 5, 1 + Math.random() * 2); }
    }, 512, 512);
    const wall = new Mesh(new PlaneGeometry(10, 5.4), new MeshStandardMaterial({ map: wallT, roughness: 0.95 })); wall.position.set(0, 2.7, -0.02); wall.receiveShadow = true;
    const ground = new Mesh(new PlaneGeometry(10, 5), new MeshStandardMaterial({ color: 0x8d8778, roughness: 0.95 })); ground.rotation.x = -Math.PI / 2; ground.position.set(0, 0, 2.48); ground.receiveShadow = true;
    const base = new Mesh(new BoxGeometry(10, 0.5, 0.06), new MeshStandardMaterial({ color: 0x8a5a4a, roughness: 0.9 })); base.position.set(0, 0.25, 0.01);
    const frameM = new MeshStandardMaterial({ color: 0x3a2416, roughness: 0.6 });
    const fw = DOOR.leafW * 2 + 0.24;
    const frameTop = new Mesh(new BoxGeometry(fw + 0.2, 0.2, 0.16), frameM); frameTop.position.set(0, DOOR.h + 0.1, 0.06);
    const frameL = new Mesh(new BoxGeometry(0.16, DOOR.h + 0.1, 0.16), frameM); frameL.position.set(-fw / 2, DOOR.h / 2, 0.06);
    const frameR = frameL.clone(); frameR.position.x = fw / 2;
    const sill = new Mesh(new BoxGeometry(fw + 0.3, 0.1, 0.4), new MeshStandardMaterial({ color: 0x6f6a5e, roughness: 0.9 })); sill.position.set(0, 0.05, 0.2);
    const woodT = canvasTex((g, W, H) => {
      g.fillStyle = '#7a2a1c'; g.fillRect(0, 0, W, H);
      for (let i = 0; i < 70; i++) { g.strokeStyle = `rgba(${Math.random() < 0.5 ? '40,10,6' : '190,90,60'},${0.08 + Math.random() * 0.14})`; g.lineWidth = 1 + Math.random() * 2; const x = Math.random() * W; g.beginPath(); g.moveTo(x, 0); g.bezierCurveTo(x + 8, H * 0.3, x - 8, H * 0.7, x + 4, H); g.stroke(); }
    }, 256, 512);
    const leafM = new MeshStandardMaterial({ map: woodT, roughness: 0.6 });
    for (const sx of [-1, 1]) {
      const leaf = new Mesh(new BoxGeometry(DOOR.leafW, DOOR.h, 0.08), leafM); leaf.position.set(sx * (DOOR.leafW / 2 + 0.01), DOOR.h / 2, 0.05); leaf.castShadow = true;
      const knob = new Mesh(new BoxGeometry(0.06, 0.22, 0.05), new MeshStandardMaterial({ color: 0xc9a14a, roughness: 0.35, metalness: 0.6 })); knob.position.set(sx * 0.1, 1.15, 0.11);
      doorG.add(leaf, knob);
    }
    doorG.add(wall, ground, base, frameTop, frameL, frameR, sill);
  }
  const flat = (t, w, h, alpha) => new Mesh(new PlaneGeometry(w, h), new MeshStandardMaterial({ map: t, roughness: 0.9, transparent: !!alpha, alphaTest: alpha ? 0.5 : 0 }));
  const stripR = tex(160, 800), stripL = tex(160, 800), topT = tex(800, 184), fangL = tex(384, 384), fangR = tex(384, 384);
  const mR = flat(stripR.t, DOOR.stripW, DOOR.stripH); mR.position.set(DOOR.stripX, DOOR.stripY, 0.055);
  const mL = flat(stripL.t, DOOR.stripW, DOOR.stripH); mL.position.set(-DOOR.stripX, DOOR.stripY, 0.055);
  const mT = flat(topT.t, DOOR.topW, DOOR.topH); mT.position.set(0, DOOR.topY, 0.055);
  const mFL = flat(fangL.t, DOOR.fang, DOOR.fang, true); mFL.position.set(-(DOOR.leafW / 2 + 0.01), DOOR.fangY, 0.1);
  const mFR = flat(fangR.t, DOOR.fang, DOOR.fang, true); mFR.position.set(DOOR.leafW / 2 + 0.01, DOOR.fangY, 0.1);
  doorG.add(mR, mL, mT, mFL, mFR);

  const lab = labeler($('.al-labels'), cv, camera);
  const lbUp = lab.add('cg-lb cg-lb-t', 'Upper line<small>上聯</small>');
  const lbDn = lab.add('cg-lb cg-lb-k', 'Lower line<small>下聯</small>');
  const lbTop = lab.add('cg-lb cg-lb-m', 'Horizontal scroll<small>橫批</small>');
  const lbStroke = lab.add('cg-lb cg-lb-m', '');

  const R = { play: $('.al-play'), msg: $('.cg-cp-msg'), wmsg: $('.cg-cp-wmsg'), n: $('.cg-cp-n'), name: $('.cg-cp-name'), total: $('.cg-cp-total'), up: $('.cg-cp-up'), dn: $('.cg-cp-dn') };
  const state = { mode: 'write', char: 'chun', playing: true, labels: true, speed: 1, t: 0, cam: 'near', couplet: 0, upperRight: false, flip: false, checked: false, cur: -1 };
  let writer = null;

  function fit(w, h) {
    const vf = MathUtils.degToRad(camera.fov / 2);
    const hf = Math.atan(Math.tan(vf) * camera.aspect);
    return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf));
  }
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t, instant) {
    if (instant) { camera.position.copy(p); controls.target.copy(t); fly.t = 1; return; }
    fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0;
  }
  function goHome(instant) {
    if (state.mode === 'door') {
      controls.maxPolarAngle = Math.PI * 0.56; controls.minAzimuthAngle = -Math.PI * 0.4; controls.maxAzimuthAngle = Math.PI * 0.4;
      const t = V(0, 1.82, 0);
      flyTo(t.clone().add(V(0, 0.03, 1).normalize().multiplyScalar(fit(4.5, 4.3))), t, instant);
    } else {
      controls.maxPolarAngle = Math.PI * 0.47; controls.minAzimuthAngle = -Infinity; controls.maxAzimuthAngle = Infinity;
      const top = state.cam === 'top', t = V(0, 0.05, PAPER.z + (top ? 0 : 0.1));
      flyTo(t.clone().add((top ? V(0, 1, 0.02) : V(-0.12, 0.86, 0.5)).normalize().multiplyScalar(fit(5.3, top ? 4.9 : 4.6))), t, instant);
    }
  }
  const press = (sel, attr, v) => $$(sel).forEach((b) => b.setAttribute('aria-pressed', b.getAttribute(attr) === String(v) ? 'true' : 'false'));
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
    root.classList.remove('al-fresh');
  }
  function setSpeed(v) { state.speed = v; press('[data-speed]', 'data-speed', v); }
  function setCam(v) { state.cam = v; press('[data-cam]', 'data-cam', v); goHome(false); }

  // ---------- 寫字 ----------
  function startWrite(key, opts = {}) {
    if (key) state.char = key;
    const char = CHARS[state.char];
    state.t = 0; state.cur = -1;
    paper.clearInk();
    writer = makeWriter(paper, char);
    press('[data-char]', 'data-char', state.char);
    if (R.total) R.total.textContent = String(char.count);
    if (R.n) R.n.textContent = '—'; if (R.name) R.name.innerHTML = '—';
    if (R.wmsg) R.wmsg.innerHTML = `${char.char} has ${char.count} strokes. Watch the order: top before bottom, left before right.<span class="zh">「${char.char}」一共 ${char.count} 畫。看看筆順：先上後下、先左後右。</span>`;
    if (opts.fly !== false) goHome(!!opts.instant);
    setPlaying(true);
    step(0);
  }
  // ---------- 大門 ----------
  function paintDoor() {
    const c = COUPLETS[state.couplet];
    if (!c) return;
    const right = state.upperRight ? c.a : c.b, left = state.upperRight ? c.b : c.a;
    drawStrip(stripR.g, 160, 800, right.text, { seed: 7 }); stripR.t.needsUpdate = true;
    drawStrip(stripL.g, 160, 800, left.text, { seed: 9 }); stripL.t.needsUpdate = true;
    drawTop(topT.g, 800, 184, c.top); topT.t.needsUpdate = true;
    drawFang(fangL.g, 384, 'chun'); fangL.t.needsUpdate = true;
    drawFang(fangR.g, 384, 'fu', { flip: state.flip }); fangR.t.needsUpdate = true;
    press('[data-couplet]', 'data-couplet', state.couplet);
    if (R.up) R.up.innerHTML = `${c.a.text}<small>${c.a.last.zh} ${c.a.last.py}</small>`;
    if (R.dn) R.dn.innerHTML = `${c.b.text}<small>${c.b.last.zh} ${c.b.last.py}</small>`;
    const fl = $('.cg-flip'); if (fl) fl.setAttribute('aria-pressed', state.flip ? 'true' : 'false');
  }
  function ask() {
    state.checked = false; root.classList.remove('cg-cp-ok', 'cg-cp-no');
    if (R.msg) R.msg.innerHTML = 'Which line is on the right as you face the door? Swap the sides if you need to, then check.<span class="zh">面對大門，右邊貼的是哪一句？需要的話按「左右對調」，再按「檢查」。</span>';
  }
  function setCouplet(i) { state.couplet = i; state.upperRight = Math.random() < 0.5; paintDoor(); ask(); }
  function swap() { state.upperRight = !state.upperRight; paintDoor(); ask(); }
  function check() {
    const c = COUPLETS[state.couplet], ok = state.upperRight;
    state.checked = true;
    root.classList.toggle('cg-cp-ok', ok); root.classList.toggle('cg-cp-no', !ok);
    const U = c.a.last, D = c.b.last;
    if (R.msg) R.msg.innerHTML = ok
      ? `Right! The upper line ends in ${U.zh} (${U.py}), an oblique tone, and it is on the right as you face the door. The lower line ends in ${D.zh} (${D.py}), a level tone.<span class="zh">貼對了！上聯的末字「${U.zh}」是仄聲，面對大門貼在右邊；下聯的末字「${D.zh}」是平聲，貼在左邊。</span>`
      : `Not yet. The line on the right ends in ${D.zh} (${D.py}), a level tone, so it is the lower line. Swap the sides.<span class="zh">還沒貼對。右邊這一句的末字「${D.zh}」是平聲，它是下聯。按「左右對調」。</span>`;
    return ok;
  }
  function flipFu() {
    state.flip = !state.flip; paintDoor();
    const el = $('.cg-cp-fmsg');
    if (el) el.innerHTML = state.flip ? (root.getAttribute('data-flip-on') || '') : (root.getAttribute('data-flip-off') || '');
  }
  function setMode(m, opts = {}) {
    state.mode = m; root.dataset.mode = m;
    deskG.visible = m === 'write'; doorG.visible = m === 'door';
    scene.background.setHex(m === 'door' ? 0x9db7cf : 0x0b1326);
    press('[data-mode]', 'data-mode', m);
    $$('[data-panel]').forEach((p) => { p.hidden = p.getAttribute('data-panel') !== m; });
    $$('.cg-cams').forEach((el) => { el.hidden = m !== 'write'; });
    if (m === 'write') startWrite(opts.char, { fly: false });
    else { paintDoor(); if (!state.checked) ask(); }
    goHome(!!opts.instant);
  }

  $$('[data-mode]').forEach((b) => b.addEventListener('click', () => setMode(b.getAttribute('data-mode'))));
  $$('[data-char]').forEach((b) => b.addEventListener('click', () => { if (state.mode !== 'write') setMode('write', { char: b.getAttribute('data-char') }); else startWrite(b.getAttribute('data-char'), { fly: false }); }));
  $$('[data-couplet]').forEach((b) => b.addEventListener('click', () => setCouplet(Number(b.getAttribute('data-couplet')))));
  $$('[data-speed]').forEach((b) => b.addEventListener('click', () => setSpeed(Number(b.getAttribute('data-speed')))));
  $$('[data-cam]').forEach((b) => b.addEventListener('click', () => setCam(b.getAttribute('data-cam'))));
  $$('.cg-again').forEach((b) => b.addEventListener('click', () => startWrite(null, { fly: false })));
  $$('.cg-swap').forEach((b) => b.addEventListener('click', swap));
  $$('.cg-check').forEach((b) => b.addEventListener('click', check));
  $$('.cg-flip').forEach((b) => b.addEventListener('click', flipFu));
  $$('.cg-hang').forEach((b) => b.addEventListener('click', () => setMode('door')));
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  $('.al-home').addEventListener('click', () => goHome(false));
  const lbl = $('[data-t="labels"]');
  if (lbl) lbl.addEventListener('change', () => { state.labels = lbl.checked; });

  let announced = false;
  function step(dt) {
    if (state.mode === 'write' && writer) {
      state.t += (state.playing ? dt : 0) * state.speed;
      const tw = state.t - SEQ0, dur = writer.duration;
      if (tw < 0) placeBrush(brush, paper, writer.poseAt(0), (1 - state.t / SEQ0) * 0.4);
      else {
        const pose = writer.poseAt(Math.min(tw, dur)), over = tw - dur;
        placeBrush(brush, paper, over > 0 ? { ...pose, p: 0 } : pose, over > 0 ? ease(over / 0.7) * 0.5 : pose.hover * 0.3);
        writer.drawTo(tw);
        if (over < 0 && pose.n !== state.cur) {
          state.cur = pose.n;
          const st = CHARS[state.char].strokes[pose.n];
          if (st) { if (R.n) R.n.textContent = String(pose.n + 1); if (R.name) R.name.innerHTML = `${st.en}<small>${st.zh}</small>`; lbStroke.innerHTML = `<b>${pose.n + 1}</b> ${st.zh}<small>${st.en}</small>`; }
        }
        if (over >= 0 && !announced) {
          announced = true;
          const ch = CHARS[state.char];
          if (R.wmsg) R.wmsg.innerHTML = `Done: ${ch.char} in ${ch.count} strokes. Let the ink dry flat, then hang it on the door.<span class="zh">寫好了：「${ch.char}」${ch.count} 畫。平放晾乾，再貼到門上。</span>`;
        }
        if (over < 0) announced = false;
        if (tw > dur + 2.5) state.t = SEQ0 + dur + 2.5;
      }
    }
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 1.1);
      const k = ease(fly.t);
      camera.position.lerpVectors(fly.p0, fly.p1, k);
      controls.target.lerpVectors(fly.t0, fly.t1, k);
    }
  }
  function labels() {
    const door = state.mode === 'door', on = state.labels;
    const showUD = on && door && state.checked;
    lbUp.hidden = !showUD; lbDn.hidden = !showUD; lbTop.hidden = !(on && door);
    if (showUD) {
      const ux = state.upperRight ? DOOR.stripX : -DOOR.stripX;
      lab.place(lbUp, V(ux, DOOR.stripY + DOOR.stripH / 2 + 0.17, 0.05));
      lab.place(lbDn, V(-ux, DOOR.stripY + DOOR.stripH / 2 + 0.17, 0.05));
    }
    if (on && door) lab.place(lbTop, V(0, DOOR.topY + DOOR.topH / 2 + 0.16, 0.05));
    const tw = state.t - SEQ0, writing = on && !door && writer && tw >= 0 && tw < writer.duration && state.cur >= 0;
    lbStroke.hidden = !writing;
    if (writing) lab.place(lbStroke, paper.world(500, -330));
  }

  let raf = 0, last = 0, visible = false;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
    controls.update();
    labels();
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  let band0 = null;
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = camera.aspect < 1.1 ? 42 : 34;
    camera.updateProjectionMatrix();
    root.classList.toggle('cg-narrow', w < 520);
    const band = camera.aspect < 0.9 ? 0 : camera.aspect < 1.25 ? 1 : 2;
    if (band !== band0) { band0 = band; goHome(true); }
  }
  new ResizeObserver(resize).observe(spaceWrap);
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  setSpeed(1);
  paintDoor();
  setMode('write', { char: 'chun', instant: true });
  resize();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(paintDoor);
  root.classList.add('al-ready', 'al-fresh');

  const DEMO = { write: () => setMode('write'), door: () => setMode('door'), chun: () => setMode('write', { char: 'chun' }), fu: () => setMode('write', { char: 'fu' }), flip: () => { setMode('door'); if (!state.flip) flipFu(); } };
  root.__lab = {
    camera, controls, state, scene, setMode, setSpeed, setPlaying, setCam, startWrite, setCouplet, swap, check, flipFu, COUPLETS,
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => goHome(true),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { step(0); controls.update(); labels(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  drawMinis();
  const sd = document.querySelector('[data-cal-sides]');
  if (sd) initSides(sd);
  const padEl = document.querySelector('[data-cal-pad]');
  if (padEl) initPad(padEl, CHARS[padEl.getAttribute('data-char')] || CHARS.chun, CHARS);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-calcouplets-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
