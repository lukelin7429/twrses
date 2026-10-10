/*
 * 電腦概論 · 第八課「按下一個鍵，發生了什麼？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：**輸入 → 處理 → 輸出，一路都是 0 和 1**——同一次按鍵，一路換了幾種樣子：
 *   0 鍵盤   鍵底下的開關接通
 *   1 線上   一個「哪一個鍵」的編號（USB HID 的編號；有沒有按 Shift 都一樣）
 *   2 處理   電腦把「鍵的編號＋Shift＋鍵盤配置」查成一個字元的編號（a＝97、A＝65）
 *   3 記憶體 八個位元
 *   4 螢幕   亮起來的像素（哪幾格亮由字型決定；這裡是自己畫的 5×7 點陣）
 * 場景：左邊鍵盤（1、A、Shift、空白鍵）→ 線 → 中間的電路板（處理器、八格記憶體）→ 線 → 右邊螢幕（5×7 像素）。
 *   [data-key] 或點 3D 的鍵      選一個鍵並按下去
 *   .cp-ky-shift 或點 3D 的 Shift  按住／放開 Shift
 *   .al-play                      按下去，一路走到螢幕；.cp-step 一次走一站；[data-st] 跳到某一站
 *
 * 控制器不靠 WebGL：每一站的樣子是 keypath.js 的純函式；沒有 WebGL 時 3D 不畫，右邊五站的清單照樣能用。
 * 2D（不需要 WebGL）：現在它是什麼樣子、輸入還是輸出、自己按一個鍵——key2d.js。
 *
 * 產物：cd tools/computers && npm run build → assets/js/comp-key.js
 * 除錯：document.querySelector('[data-compkey-lab]').__lab
 *   press(keyId)、setShift(bool)、next()、jump(n)、reset()、demo('press'|'shift'|'one'|'space')、run(秒)、goCam()、render()、cur()
 */
import {
  AdditiveBlending, AmbientLight, BoxGeometry, CircleGeometry, Color, DirectionalLight, HemisphereLight,
  MathUtils, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Raycaster, Scene, Sprite, SpriteMaterial,
  Vector2, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { canvasTex, labeler, lazyBoot } from './common.js';
import { initChoice, initLive } from './key2d.js';
import { diff, trace } from './keypath.js';

const V = (x, y, z) => new Vector3(x, y, z);
const DUR = 2.6;   // 自動播放時每一站停幾秒
const KEYPOS = { Digit1: [-5.95, 0.15, 0.9], KeyA: [-4.75, 0.15, 0.9], Shift: [-5.75, 1.15, 1.3], Space: [-4.25, 1.15, 1.5] };
const STOPS = (keyId) => [V(KEYPOS[keyId][0], 0.95, KEYPOS[keyId][1]), V(-2.7, 0.55, 0.4), V(-1.15, 1.0, 0.4), V(1.05, 1.0, 0.4), V(5.2, 2.0, 0.25)];
const charName = (c, zh) => (c === ' ' ? (zh ? '空白' : 'a space') : `“${c}”`);
const bits4 = (b) => `${b.slice(0, 4)} ${b.slice(4)}`;

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space'), cv = $('.al-space-cv');
  const R = { msg: $('.cp-msg'), play: $('.al-play'), keys: [...$$('[data-key]')], shift: $('.cp-ky-shift'), rows: [...$$('[data-st]')], step: $('.cp-step') };
  const state = { key: 'KeyA', shift: false, stage: -1, playing: false, wait: 0, labels: true };
  let t = trace('KeyA', false), prev = null, script = null, view = null;

  const say = (en, zh) => { R.msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  const values = () => [
    'switch closed · 開關接通',
    `key ${t.usageHex} = ${t.usage}${t.shift ? ' + Shift' : ''}`,
    `${t.char === ' ' ? 'space 空白' : t.char} = ${t.code}`,
    bits4(t.bits),
    `${t.lit} of 35 pixels · 亮 ${t.lit} 格`,
  ];
  function show() {
    const v = values();
    R.rows.forEach((r, i) => { r.classList.toggle('is-on', i === state.stage); r.classList.toggle('is-done', i <= state.stage); r.querySelector('.cp-ky-v').textContent = i <= state.stage ? v[i] : '…'; });
    R.keys.forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-key') === state.key ? 'true' : 'false'));
    R.shift.setAttribute('aria-pressed', state.shift ? 'true' : 'false');
    R.play.setAttribute('aria-pressed', state.playing ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = `Press ${state.shift ? 'Shift + ' : ''}${t.cap} · 按下 ${state.shift ? 'Shift＋' : ''}${t.cap === 'Space' ? '空白鍵' : t.cap}`;
    R.step.textContent = state.stage < 0 || state.stage >= 4 ? 'One stop at a time · 一站一站走' : 'Next stop · 下一站';
  }
  function tell() {
    const s = state.stage, sh = t.shift, cap = t.cap === 'Space' ? 'Space' : t.cap, capZh = t.cap === 'Space' ? '空白' : t.cap;
    if (s === 0) say(`You press the ${cap} key${sh ? ' while holding Shift' : ''}. Under the key, a switch closes. That is all the key itself does.`, `你按下 ${capZh} 鍵${sh ? '（同時按住 Shift）' : ''}。鍵的下面，一個開關接通了。這個鍵自己做的事就只有這樣。`);
    else if (s === 1) say(`The keyboard sends a number that says which key was pressed: ${t.usageHex}, which is ${t.usage}. It is not a character yet.${sh ? ' The keyboard also reports that Shift is down.' : ''} With or without Shift, this key always sends ${t.usage}.`, `鍵盤送出一個編號，說的是「哪一個鍵被按了」：${t.usageHex}，也就是 ${t.usage}。它還不是一個字元。${sh ? '鍵盤也回報 Shift 正被按著。' : ''}有沒有按 Shift，這個鍵送出的都是 ${t.usage}。`);
    else if (s === 2) say(`The computer looks it up: key ${t.usage}, Shift ${sh ? 'down' : 'up'}, U.S. keyboard layout. The answer is the character ${charName(t.char)}, which has the number ${t.code}.`, `電腦查表：第 ${t.usage} 號鍵、Shift ${sh ? '按著' : '沒按'}、美式鍵盤配置。查到的是字元${charName(t.char, true)}，它的編號是 ${t.code}。`);
    else if (s === 3) say(`The number ${t.code} goes into memory as eight bits: ${bits4(t.bits)}. Now the program you are typing in has the character.`, `${t.code} 這個數以八個位元放進記憶體：${bits4(t.bits)}。現在，你正在用的那個程式拿到這個字元了。`);
    else if (s === 4) {
      let en = t.lit ? `To show it, the computer uses a font to decide which pixels to light: ${t.lit} of the 35 in this small grid.` : 'A space lights no pixels at all. But it is still a character: the number 32 is sitting in memory.';
      let zh = t.lit ? `要把它顯示出來，電腦用字型決定哪幾個像素要亮：這個小格子的 35 格裡亮了 ${t.lit} 格。` : '空白一個像素都不亮。但它還是一個字元：32 這個數好好地放在記憶體裡。';
      if (prev && prev.keyId === t.keyId && prev.shift !== t.shift) {
        const d = diff(prev, t);
        en += d.char ? ` Compare with last time: the key number was the same, ${t.usage}. Everything after the lookup was different.` : ' Compare with last time: with or without Shift, everything was the same.';
        zh += d.char ? `和上一次比：鍵的編號一樣，都是 ${t.usage}；查表之後的每一站都不一樣。` : '和上一次比：有沒有按 Shift，每一站都一樣。';
      }
      say(en, zh);
    }
  }
  function go(n) {
    state.stage = n; state.wait = DUR;
    if (n >= 4) state.playing = false;
    if (view) view.move(n);
    tell(); root.classList.remove('al-fresh'); show();
    if (n >= 4) prev = t;
  }
  function press(keyId, auto = true) { if (keyId) state.key = keyId; t = trace(state.key, state.shift); state.playing = auto; go(0); }
  function next() { if (state.stage < 0 || state.stage >= 4) press(null, false); else { state.playing = false; go(state.stage + 1); } }
  function jump(n) { state.playing = false; if (state.stage < 0) t = trace(state.key, state.shift); go(n); }
  function setShift(on) { state.shift = !!on; idle(); }
  function pick(keyId) { state.key = keyId; idle(); }
  function idle() { t = trace(state.key, state.shift); state.stage = -1; state.playing = false; if (view) view.move(-1); show(); }
  function reset() { prev = null; state.key = 'KeyA'; state.shift = false; idle(); intro(); }
  const intro = () => say('Choose a key, then press it. Follow the glowing dot from the keyboard to the screen, and watch what the key turns into at each stop.', '選一個鍵，然後按下去。跟著那顆光點從鍵盤走到螢幕，看看這個鍵在每一站變成什麼樣子。');
  const user = () => { script = null; };

  R.keys.forEach((b) => b.addEventListener('click', () => { user(); press(b.getAttribute('data-key')); }));
  R.shift.addEventListener('click', () => { user(); setShift(!state.shift); });
  R.play.addEventListener('click', () => { user(); press(null); });
  R.step.addEventListener('click', () => { user(); next(); });
  R.rows.forEach((r) => r.addEventListener('click', () => { user(); jump(Number(r.getAttribute('data-st'))); }));
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
    controls.minDistance = 3; controls.maxDistance = 60; controls.maxPolarAngle = Math.PI * 0.49;
    scene.add(new HemisphereLight(0xeaf0ff, 0x1a2030, 1.1)); scene.add(new AmbientLight(0xffffff, 0.35));
    const sun = new DirectionalLight(0xfff1dc, 1.3); sun.position.set(-3, 9, 8); scene.add(sun);
    const floor = new Mesh(new CircleGeometry(90, 64), new MeshStandardMaterial({ color: 0x121c36, roughness: 0.95 }));
    floor.rotation.x = -Math.PI / 2; scene.add(floor);
    const mat = (c, o = {}) => new MeshStandardMaterial({ color: c, roughness: 0.6, ...o });
    const box = (m, w, h, d, x, y, z) => { const b = new Mesh(new BoxGeometry(w, h, d), m); b.position.set(x, y, z); scene.add(b); return b; };

    // 鍵盤
    box(mat(0x2a3550, { roughness: 0.7 }), 3.4, 0.3, 2.3, -5.0, 0.15, 0.65);
    const keys = {};
    for (const [id, [x, z, w]] of Object.entries(KEYPOS)) {
      const m = mat(id === 'Shift' ? 0xaab4c8 : 0xe9edf5, { emissive: 0xffd36e, emissiveIntensity: 0 });
      const b = box(m, w, 0.3, 0.8, x, 0.45, z); b.userData.id = id;
      keys[id] = { b, m, k: 0 };
    }
    // 線、電路板、處理器、記憶體
    const wire = mat(0x56627e, { roughness: 0.5 });
    box(wire, 1.2, 0.08, 0.08, -2.75, 0.1, 0.4); box(wire, 2.0, 0.08, 0.08, 3.25, 0.1, 0.4); box(wire, 0.08, 0.08, 0.7, 4.25, 0.1, 0.05);
    box(mat(0x16563f, { roughness: 0.8 }), 4.4, 0.2, 2.6, 0, 0.1, 0.4);
    const chipM = mat(0x2b2f3a, { emissive: 0x4f9dff, emissiveIntensity: 0, metalness: 0.3 });
    box(chipM, 1.1, 0.26, 1.1, -1.15, 0.33, 0.4); box(mat(0xc9ced9, { metalness: 0.6, roughness: 0.3 }), 0.6, 0.04, 0.6, -1.15, 0.48, 0.4);
    const cells = [];
    for (let i = 0; i < 8; i++) { const m = mat(0x25304a, { emissive: 0xffd36e, emissiveIntensity: 0 }); cells.push({ m, b: box(m, 0.24, 0.24, 0.5, 0.1 + i * 0.27, 0.32, 0.4), k: 0 }); }
    // 螢幕
    const dark = mat(0x1a2030, { roughness: 0.5 });
    box(dark, 3.0, 3.7, 0.18, 5.2, 2.05, -0.3); box(dark, 0.3, 0.3, 0.3, 5.2, 0.15, -0.3); box(dark, 1.4, 0.08, 0.9, 5.2, 0.04, -0.3);
    box(mat(0x070b16, { roughness: 0.3 }), 2.6, 3.3, 0.02, 5.2, 2.05, -0.2);
    const px = [];
    for (let r = 0; r < 7; r++) for (let c = 0; c < 5; c++) { const m = new MeshBasicMaterial({ color: 0x101a30 }); px.push({ m, k: 0, b: box(m, 0.36, 0.36, 0.03, 5.2 + (c - 2) * 0.42, 2.05 + (3 - r) * 0.42, -0.18) }); }

    const glow = canvasTex((g, w, h) => { const r = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2); r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(0.35, 'rgba(255,255,255,.45)'); r.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = r; g.fillRect(0, 0, w, h); }, 128, 128);
    const ball = new Sprite(new SpriteMaterial({ map: glow, color: 0xffd36e, blending: AdditiveBlending, depthWrite: false, depthTest: false, transparent: true, opacity: 0 })); ball.scale.setScalar(0.9); scene.add(ball);
    const fly = { t: 1, from: V(0, 0, 0), to: V(0, 0, 0), on: false };
    const cOn = new Color(0xeaf6ff), cOff = new Color(0x101a30);

    const api = {
      move(n) {
        if (n < 0) { fly.on = false; return; }
        const st = STOPS(state.key);
        fly.from.copy(n === 0 || !fly.on ? st[Math.max(0, n - 1)] : fly.to); fly.to.copy(st[n]); fly.t = n === 0 ? 1 : 0; fly.on = true;
        if (n === 0) ball.position.copy(st[0]);
      },
    };
    const lab = labeler($('.al-labels'), cv, camera);
    const TITLES = [['keyboard', '鍵盤'], ['the cable', '線上'], ['processor', '處理器'], ['memory', '記憶體'], ['screen', '螢幕']];
    const TPOS = [V(-5.0, 1.75, 0.2), V(-2.75, 0.1, 1.5), V(-1.15, 1.75, 0.2), V(1.05, 1.75, 0.2), V(5.2, 4.25, -0.3)];
    const VPOS = [V(-5.0, 1.0, 0.2), V(-2.75, 0.1, 1.5), V(-1.15, 1.0, 0.2), V(1.05, 1.0, 0.2), V(5.2, 0.55, 0.6)];
    const lbT = TITLES.map(([en, zh], i) => lab.add('cp-lb cp-lb-end', `<i>${i + 1}</i><span> ${en}</span><small>${zh}</small>`));
    const lbV = TITLES.map(() => lab.add('cp-lb cp-lb-val', ''));
    const lbK = Object.keys(KEYPOS).map((id) => { const s = lab.add('cp-lb cp-lb-cap', id === 'KeyA' ? 'A' : id === 'Digit1' ? '1' : id); s.dataset.id = id; return s; });
    const tmp = V(0, 0, 0);

    function tick(dt) {
      const s = state.stage, e = Math.min(1, dt * 10);
      for (const [id, k] of Object.entries(keys)) {
        const down = (s >= 0 && id === state.key) || (id === 'Shift' && state.shift);
        k.b.position.y += ((down ? 0.34 : 0.45) - k.b.position.y) * e;
        k.m.emissiveIntensity += (((id === state.key && s === 0) || (id === 'Shift' && state.shift) ? 0.7 : id === state.key ? 0.25 : 0) - k.m.emissiveIntensity) * e;
      }
      chipM.emissiveIntensity += ((s === 2 ? 1.1 : 0) - chipM.emissiveIntensity) * e;
      cells.forEach((c, i) => { const on = s >= 3 && t.bits[i] === '1'; c.k += ((on ? 1 : 0) - c.k) * e; c.m.emissiveIntensity = c.k * (s === 3 ? 1.5 : 0.8); });
      px.forEach((p, i) => { const on = s >= 4 && t.rows[Math.floor(i / 5)][i % 5] === '#'; p.k += ((on ? 1 : 0) - p.k) * Math.min(1, dt * 5); p.m.color.lerpColors(cOff, cOn, p.k); });
      if (fly.on) {
        if (fly.t < 1) { fly.t = Math.min(1, fly.t + dt / 0.9); const k = MathUtils.smootherstep(fly.t, 0, 1); ball.position.lerpVectors(fly.from, fly.to, k); ball.position.y += Math.sin(Math.PI * k) * 0.5; }
        ball.material.opacity += ((state.stage === 4 && fly.t >= 1 ? 0 : 1) - ball.material.opacity) * Math.min(1, e * (state.stage === 4 ? 0.25 : 1));
      } else ball.material.opacity += (0 - ball.material.opacity) * e;
      if (flyC.t < 1) { flyC.t = Math.min(1, flyC.t + dt / 1.0); const k = MathUtils.smootherstep(flyC.t, 0, 1); camera.position.lerpVectors(flyC.p0, flyC.p1, k); controls.target.lerpVectors(flyC.t0, flyC.t1, k); }
    }
    function fit(w, h) { const vf = MathUtils.degToRad(camera.fov / 2), hf = Math.atan(Math.tan(vf) * camera.aspect); return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf)); }
    const flyC = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
    function goHome(instant) {
      const tg = V(0, 1.45, 0.2), p = V(0.04, 0.46, 1).normalize().multiplyScalar(fit(15.3, 5.4)).add(tg);
      if (instant) { camera.position.copy(p); controls.target.copy(tg); flyC.t = 1; return; }
      flyC.p0.copy(camera.position); flyC.t0.copy(controls.target); flyC.p1.copy(p); flyC.t1.copy(tg); flyC.t = 0;
    }
    function labels() {
      const on = state.labels, v = values(), narrow = root.classList.contains('cp-narrow');
      lbT.forEach((l, i) => { l.hidden = !on; if (on) { l.classList.toggle('is-on', i === state.stage); lab.place(l, TPOS[i], i === 1 ? 6 : 0); } });
      lbV.forEach((l, i) => { const vis = i > 0 && (narrow ? i === state.stage : i <= state.stage); l.hidden = !vis; if (vis) { l.textContent = i === 1 ? `${t.usage}${t.shift ? ' + Shift' : ''}` : i === 2 ? `${t.char === ' ' ? '␣' : t.char} = ${t.code}` : i === 3 ? v[3] : `${t.lit} / 35`; l.classList.toggle('is-on', i === state.stage); lab.place(l, VPOS[i], i === 1 ? 44 : 0); } });
      lbK.forEach((l) => { const k = keys[l.dataset.id]; l.hidden = !on; if (on) lab.place(l, tmp.copy(k.b.position).setY(k.b.position.y + 0.17)); });
    }
    function render() { controls.update(); labels(); renderer.render(scene, camera); }

    const ray = new Raycaster(), ndc = new Vector2();
    const hit = (e) => { const r = cv.getBoundingClientRect(); ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); ray.setFromCamera(ndc, camera); const h = ray.intersectObjects(Object.values(keys).map((k) => k.b), false)[0]; return h ? h.object.userData.id : null; };
    let down = null;
    cv.addEventListener('pointerdown', (e) => { down = { x: e.clientX, y: e.clientY }; });
    cv.addEventListener('pointerup', (e) => { if (!down) return; const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y); down = null; if (moved > 6) return; const id = hit(e); if (!id) return; user(); if (id === 'Shift') setShift(!state.shift); else press(id); });
    cv.addEventListener('pointermove', (e) => { if (e.pointerType === 'mouse') cv.style.cursor = hit(e) ? 'pointer' : ''; });
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
  view = make3D();
  if (!view) root.classList.add('al-nogl');

  // ── 卡片示範 ──────────────────────────────────────────────────────────
  const DEMO = {
    press() { script = null; prev = null; state.shift = false; press('KeyA'); },
    shift() { script = null; state.shift = false; t = trace('KeyA', false); prev = t; state.shift = true; press('KeyA'); },
    one() { script = null; prev = trace('Digit1', false); state.shift = true; press('Digit1'); },
    space() { script = null; prev = null; state.shift = false; press('Space'); },
  };

  function step(dt) {
    if (script) { script.t += dt; while (script && script.list.length && script.t >= script.list[0].at) script.list.shift().fn(); if (script && !script.list.length) script = null; }
    if (state.playing && state.stage >= 0 && state.stage < 4) { state.wait -= dt; if (state.wait <= 0) go(state.stage + 1); }
    if (view) view.tick(dt);
  }
  let raf = 0, last = 0, visible = false;
  function frame(ts) { raf = 0; if (!visible) return; const dt = Math.min(0.05, (ts - (last || ts)) / 1000); last = ts; step(dt); if (view) view.render(); raf = requestAnimationFrame(frame); }
  new IntersectionObserver((ents) => { visible = ents[0].isIntersecting; if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); } }, { rootMargin: '120px' }).observe(root);

  show(); intro();
  root.classList.add('al-ready', 'al-fresh');

  root.__lab = {
    state, view, press, setShift, pick, next, jump, reset, cur: () => t,
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => view && view.goHome(true),
    run: (sec) => { for (let x = 0; x < sec; x += 0.02) step(0.02); },
    render: () => { step(0); if (view) view.render(); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  document.querySelectorAll('[data-cp-choice]').forEach((el) => initChoice(el));
  const l = document.querySelector('[data-cp-live]'); if (l) initLive(l);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-compkey-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
