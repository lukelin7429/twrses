/*
 * 電腦概論 · 第七課「電腦為什麼要有兩種記憶？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：**快的放不多、放得多的不快**——書桌＝記憶體（伸手就拿得到、只放得下四樣、關機就清空），
 * 書櫃＝儲存裝置（要走過去拿、放得下很多、關機還在）。兩個搭配著用。
 * 場景：左邊一座書櫃（八本書＝八樣東西），右邊一張書桌（四個位置）和一盞檯燈（亮著＝有電）。
 *   點書櫃上的書（或右邊的清單）   打開：抄一份，慢慢「走」到桌上（書櫃上那一本還在）
 *   點桌上的東西                   直接拿來用：一瞬間
 *   桌子滿了再開                   最久沒用的那一樣先被放回書櫃，新的才過來（多走一趟）
 *   .cp-dk-edit / .cp-dk-save      改一改（變成「還沒存」）／存檔（抄回書櫃）
 *   .al-play                       關機／開機：關機時桌面全部清空，沒存的修改不見；書櫃不變
 * 右邊：八樣東西的清單與狀態、桌面用了幾格、走到書櫃幾趟、在桌上直接拿幾次。
 *
 * 控制器不靠 WebGL：狀態是 memory.js 的純函式；沒有 WebGL 時 3D 不畫，右邊的清單與按鈕照樣能用。
 * 2D（不需要 WebGL）：放桌上還是放書櫃、記憶體滿了會怎樣——desk2d.js。
 *
 * 產物：cd tools/computers && npm run build → assets/js/comp-desk.js
 * 除錯：document.querySelector('[data-compdesk-lab]').__lab
 *   open(id)、editSel()、saveSel()、setPower(bool)、reset()、demo('open'|'fast'|'full'|'off')、
 *   run(秒)、goCam()、render()、sim()
 */
import {
  AdditiveBlending, AmbientLight, BoxGeometry, CircleGeometry, Color, ConeGeometry, CylinderGeometry, DirectionalLight, HemisphereLight,
  MathUtils, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, PointLight, Raycaster, Scene, Sprite, SpriteMaterial,
  Vector2, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { canvasTex, labeler, lazyBoot } from './common.js';
import { initFull, initWhere } from './desk2d.js';
import { ITEMS, edit, isDirty, makeDesk, onDesk, powerOff, powerOn, save, use } from './memory.js';

const V = (x, y, z) => new Vector3(x, y, z);
const COLORS = { essay: 0xf4ecd8, game: 0xd4574a, music: 0xc7a6ff, browser: 0x4f9dff, photos: 0xffb04a, video: 0x3ac7b0, slides: 0xff8fb0, chat: 0x7ee0aa };
const SHELF = (i) => V(-4.2 + (i % 4) * 0.72 + 0.3, i < 4 ? 2.75 : 1.2, -0.6);
const SLOT = (k) => V(0.75 + k * 1.0, 1.62, 0.25);
const WALK = 1.5;   // 從書櫃走到書桌幾秒（示意）

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space'), cv = $('.al-space-cv');
  const NAMES = JSON.parse(root.getAttribute('data-items'));
  const R = { msg: $('.cp-msg'), play: $('.al-play'), used: $('.cp-dk-used'), trips: $('.cp-dk-trips'), uses: $('.cp-dk-uses'), list: [...$$('[data-item]')], edit: $('.cp-dk-edit'), save: $('.cp-dk-save') };
  const state = { sel: null, labels: true, slots: [null, null, null, null] };
  let sim = makeDesk(4), script = null, view = null;

  const nm = (id) => NAMES[id];
  const say = (en, zh) => { R.msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  function show() {
    R.used.textContent = `${sim.desk.length} / ${sim.cap}`; R.trips.textContent = String(sim.trips); R.uses.textContent = String(sim.uses);
    R.list.forEach((b) => { const id = b.getAttribute('data-item'); b.classList.toggle('is-desk', onDesk(sim, id)); b.classList.toggle('is-dirty', isDirty(sim, id)); b.setAttribute('aria-pressed', state.sel === id ? 'true' : 'false'); b.disabled = !sim.power; });
    const can = sim.power && state.sel && onDesk(sim, state.sel);
    R.edit.disabled = !can; R.save.disabled = !(can && isDirty(sim, state.sel));
    root.classList.toggle('cp-off', !sim.power);
    R.play.setAttribute('aria-pressed', sim.power ? 'false' : 'true');
    R.play.querySelector('.al-play-t').textContent = sim.power ? 'Switch off · 關機' : 'Switch on · 開機';
    if (view) view.sync();
  }
  function open(id) {
    if (!sim.power) { say('The power is off. Switch on first.', '現在沒有電。先開機。'); return; }
    const r = use(sim, id); sim = r.state; state.sel = id;
    let delay = 0;
    for (const e of r.events) {
      if (e.type === 'evict') { const k = state.slots.indexOf(e.id); state.slots[k] = null; if (view) view.leave(e.id, k, delay); delay += WALK * 0.8; }
      if (e.type === 'fetch') { const k = state.slots.indexOf(null); state.slots[k] = e.id; if (view) view.arrive(e.id, k, delay); }
      if (e.type === 'hit' && view) view.bump(e.id);
    }
    const ev = r.events.find((e) => e.type === 'evict'), n = nm(id);
    if (r.events[0].type === 'hit') say(`${n.en} is already on the desk, so the processor has it at once. No walk to the bookcase.`, `「${n.zh}」已經在桌上了，處理器伸手就拿到，不用走到書櫃。`);
    else if (ev) say(`The desk is full. ${nm(ev.id).en}, which had not been used for the longest time, goes back to the bookcase${ev.dirty ? ' with its unsaved changes parked there for now' : ''}, and then a copy of ${n.en} is carried over. Two slow trips.`, `桌子滿了。最久沒用的「${nm(ev.id).zh}」先被放回書櫃${ev.dirty ? '（還沒存的修改也先暫放在那裡）' : ''}，然後才把「${n.zh}」抄一份搬過來。慢慢走了兩趟。`);
    else say(`A copy of ${n.en} is carried from the bookcase to the desk. The book on the shelf stays where it is.`, `從書櫃抄一份「${n.zh}」搬到桌上。書櫃上那一本還在原來的地方。`);
    root.classList.remove('al-fresh'); show();
  }
  function editSel() {
    if (!state.sel || !onDesk(sim, state.sel)) return;
    sim = edit(sim, state.sel); const n = nm(state.sel);
    say(`You changed ${n.en}. The change is only on the desk so far. The copy in the bookcase is still the old one.`, `你改了「${n.zh}」。這個修改目前只在桌上，書櫃裡那一份還是舊的。`); show();
  }
  function saveSel() {
    if (!state.sel || !isDirty(sim, state.sel) || !onDesk(sim, state.sel)) return;
    sim = save(sim, state.sel); const n = nm(state.sel);
    if (view) view.send(state.sel, state.slots.indexOf(state.sel));
    say(`Saved. The new version of ${n.en} has been copied to the bookcase, so it will still be there after the power goes off.`, `存檔了。「${n.zh}」的新版本抄回書櫃了，所以關機以後它還在。`); show();
  }
  function setPower(on) {
    if (on === sim.power) return;
    if (!on) {
      const r = powerOff(sim); sim = r.state; state.slots = [null, null, null, null]; state.sel = null;
      if (view) view.clear();
      say(r.lost.length ? `Power off. The desk is wiped clean, and the unsaved changes to ${r.lost.map((k) => nm(k).en).join(' and ')} are gone. Everything in the bookcase is still there.` : 'Power off. The desk is wiped clean. Nothing was lost, because nothing was waiting to be saved. Everything in the bookcase is still there.',
          r.lost.length ? `關機。桌面被清空，「${r.lost.map((k) => nm(k).zh).join('」和「')}」還沒存的修改不見了。書櫃裡的東西都還在。` : '關機。桌面被清空。沒有東西遺失，因為沒有還沒存的修改。書櫃裡的東西都還在。');
    } else { sim = powerOn(sim); say('Power on. The desk is empty, so anything you want has to be carried over from the bookcase again.', '開機。桌面是空的，所以想用什麼，都得再從書櫃搬過來。'); }
    root.classList.remove('al-fresh'); show();
  }
  function reset() { sim = makeDesk(4); state.sel = null; state.slots = [null, null, null, null]; if (view) view.clear(); show(); }
  const user = () => { script = null; };

  R.list.forEach((b) => b.addEventListener('click', () => { user(); open(b.getAttribute('data-item')); }));
  R.edit.addEventListener('click', () => { user(); editSel(); });
  R.save.addEventListener('click', () => { user(); saveSel(); });
  R.play.addEventListener('click', () => { user(); setPower(!sim.power); });
  $('.cp-reset').addEventListener('click', () => { user(); reset(); intro(); });
  const tgL = $('[data-t="labels"]');
  if (tgL) tgL.addEventListener('change', () => { state.labels = tgL.checked; });
  const intro = () => say('Eight things are kept in the bookcase. The desk has room for four. Tap a book to open it, and watch how long the trip takes.', '書櫃裡放著八樣東西，桌上只放得下四樣。點一本書把它打開，看看這一趟要走多久。');

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
    const hemi = new HemisphereLight(0xeaf0ff, 0x2a2420, 1.1); scene.add(hemi);
    scene.add(new AmbientLight(0xffffff, 0.35));
    const sun = new DirectionalLight(0xfff1dc, 1.3); sun.position.set(-3, 8, 9); scene.add(sun);
    const floor = new Mesh(new CircleGeometry(90, 64), new MeshStandardMaterial({ color: 0x121c36, roughness: 0.95 }));
    floor.rotation.x = -Math.PI / 2; scene.add(floor);
    const mat = (c, o = {}) => new MeshStandardMaterial({ color: c, roughness: 0.6, ...o });
    const box = (m, w, h, d, x, y, z) => { const b = new Mesh(new BoxGeometry(w, h, d), m); b.position.set(x, y, z); scene.add(b); return b; };

    // 書櫃
    const wood = mat(0x6b4a2e, { roughness: 0.8 });
    box(wood, 3.3, 0.12, 1.0, -2.82, 0.5, -0.6); box(wood, 3.3, 0.12, 1.0, -2.82, 2.05, -0.6); box(wood, 3.3, 0.12, 1.0, -2.82, 3.6, -0.6);
    box(wood, 0.12, 3.6, 1.0, -4.47, 1.8, -0.6); box(wood, 0.12, 3.6, 1.0, -1.17, 1.8, -0.6); box(mat(0x4a3320, { roughness: 0.85 }), 3.3, 3.6, 0.06, -2.82, 1.8, -1.08);
    const books = {};
    ITEMS.forEach((id, i) => {
      const m = mat(COLORS[id], { emissive: COLORS[id], emissiveIntensity: 0 });
      const p = SHELF(i), b = box(m, 0.46, 1.15, 0.72, p.x, p.y, p.z);
      const pad = box(new MeshBasicMaterial({ visible: false }), 0.7, 1.4, 1.1, p.x, p.y, p.z + 0.1); pad.userData.id = id; pad.userData.where = 'shelf';
      books[id] = { b, m, pad, k: 0, home: p.clone() };
    });
    // 書桌與檯燈
    const dm = mat(0x8a6a48, { roughness: 0.7 });
    box(dm, 4.6, 0.14, 2.2, 2.25, 1.5, 0.2);
    for (const [x, z] of [[0.15, -0.75], [4.35, -0.75], [0.15, 1.15], [4.35, 1.15]]) box(dm, 0.14, 1.5, 0.14, x, 0.75, z);
    const pads = [0, 1, 2, 3].map((k) => { const p = SLOT(k); return box(mat(0x6f5438, { roughness: 0.8 }), 0.86, 0.02, 1.25, p.x, 1.58, p.z); });
    const lampM = new MeshStandardMaterial({ color: 0xffe9a8, emissive: 0xffd36e, emissiveIntensity: 1.6, roughness: 0.4 });
    const lampBase = new Mesh(new CylinderGeometry(0.2, 0.24, 0.06, 20), mat(0x2a3550)); lampBase.position.set(4.15, 1.6, -0.6); scene.add(lampBase);
    const lampPole = new Mesh(new CylinderGeometry(0.03, 0.03, 0.9, 10), mat(0x2a3550)); lampPole.position.set(4.15, 2.05, -0.6); scene.add(lampPole);
    const shade = new Mesh(new ConeGeometry(0.34, 0.34, 20, 1, true), lampM); shade.position.set(4.15, 2.62, -0.6); scene.add(shade);
    const lamp = new PointLight(0xffd9a0, 6, 7, 1.6); lamp.position.set(4.0, 2.5, -0.3); scene.add(lamp);

    const glow = canvasTex((g, w, h) => { const r = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2); r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(0.35, 'rgba(255,255,255,.45)'); r.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = r; g.fillRect(0, 0, w, h); }, 128, 128);
    const ball = new Sprite(new SpriteMaterial({ map: glow, color: 0x7ef0e3, blending: AdditiveBlending, depthWrite: false, transparent: true, opacity: 0 })); ball.scale.setScalar(0.6); scene.add(ball);
    const flyB = { t: 1, from: V(0, 0, 0), to: V(0, 0, 0) };

    // 桌上的東西（每樣一個扁扁的方塊）；moves 是正在走的動畫
    const copies = {}, moves = [];
    function copyOf(id) {
      if (copies[id]) return copies[id];
      const m = mat(COLORS[id], { emissive: COLORS[id], emissiveIntensity: 0 });
      const b = new Mesh(new BoxGeometry(0.72, 0.16, 1.02), m); b.visible = false; scene.add(b);
      const pad = new Mesh(new BoxGeometry(0.9, 0.5, 1.2), new MeshBasicMaterial({ visible: false })); pad.userData.id = id; pad.userData.where = 'desk'; b.add(pad);
      return (copies[id] = { b, m, pad, k: 0, on: false });
    }
    const api = {
      arrive(id, k, delay) { const c = copyOf(id); c.on = true; moves.push({ c, from: books[id].home.clone(), to: SLOT(k), t: -delay / WALK, show: true }); books[id].k = 1; },
      leave(id, k, delay) { const c = copyOf(id); c.on = false; moves.push({ c, from: SLOT(k), to: books[id].home.clone(), t: -delay / WALK, hide: true }); },
      bump(id) { const c = copyOf(id); c.k = 1; },
      send(id, k) { flyB.t = 0; flyB.from.copy(SLOT(k)); flyB.to.copy(books[id].home); books[id].k = 1; },
      clear() { moves.length = 0; for (const id of Object.keys(copies)) { copies[id].b.visible = false; copies[id].on = false; } },
      sync() {},
    };
    const lab = labeler($('.al-labels'), cv, camera);
    const lbBook = {}, lbCopy = {};
    for (const id of ITEMS) { lbBook[id] = lab.add('cp-lb cp-lb-book', `${NAMES[id].emoji}<small>${NAMES[id].zh}</small>`); lbCopy[id] = lab.add('cp-lb cp-lb-copy', ''); }
    const lbT = [lab.add('cp-lb cp-lb-end', 'storage: the bookcase<small>儲存裝置：書櫃</small>'), lab.add('cp-lb cp-lb-end', 'memory: the desk<small>記憶體：書桌</small>')];
    const tmp = V(0, 0, 0);

    function tick(dt) {
      const on = sim.power ? 1 : 0;
      lampM.emissiveIntensity += (on * 1.6 - lampM.emissiveIntensity) * Math.min(1, dt * 6); lamp.intensity += (on * 6 - lamp.intensity) * Math.min(1, dt * 6);
      hemi.intensity += ((on ? 1.1 : 0.75) - hemi.intensity) * Math.min(1, dt * 4);
      for (let i = moves.length - 1; i >= 0; i--) {
        const m = moves[i]; m.t += dt / WALK;
        if (m.t < 0) continue;
        const k = MathUtils.smootherstep(Math.min(1, m.t), 0, 1);
        m.c.b.visible = true; m.c.b.position.lerpVectors(m.from, m.to, k); m.c.b.position.y += Math.sin(Math.PI * k) * 1.2; m.c.b.position.z += Math.sin(Math.PI * k) * 1.4;
        m.c.b.rotation.z = (1 - k) * (m.show ? Math.PI / 2 : 0) + (m.hide ? k * Math.PI / 2 : 0);
        if (m.t >= 1) { if (m.hide) m.c.b.visible = false; else { m.c.b.rotation.z = 0; m.c.b.position.copy(m.to); } moves.splice(i, 1); }
      }
      for (const id of ITEMS) {
        const bk = books[id]; bk.k = Math.max(0, bk.k - dt * 0.6); bk.m.emissiveIntensity = bk.k * 0.6;
        const c = copies[id]; if (!c) continue;
        c.k = Math.max(0, c.k - dt * 1.6); c.m.emissiveIntensity = c.k * 0.9 + (state.sel === id ? 0.18 : 0);
        if (c.on && !moves.some((m) => m.c === c)) c.b.position.y = SLOT(0).y + Math.sin(c.k * Math.PI) * 0.25;
      }
      if (flyB.t < 1) { flyB.t = Math.min(1, flyB.t + dt / (WALK * 0.8)); ball.position.lerpVectors(flyB.from, flyB.to, flyB.t); ball.position.y += Math.sin(Math.PI * flyB.t) * 1.2; ball.position.z += Math.sin(Math.PI * flyB.t) * 1.2; ball.material.opacity = Math.min(1, flyB.t * 8) * Math.min(1, (1 - flyB.t) * 6); } else ball.material.opacity = 0;
      if (flyC.t < 1) { flyC.t = Math.min(1, flyC.t + dt / 1.0); const k = MathUtils.smootherstep(flyC.t, 0, 1); camera.position.lerpVectors(flyC.p0, flyC.p1, k); controls.target.lerpVectors(flyC.t0, flyC.t1, k); }
    }
    function fit(w, h) { const vf = MathUtils.degToRad(camera.fov / 2), hf = Math.atan(Math.tan(vf) * camera.aspect); return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf)); }
    const flyC = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
    function goHome(instant) {
      const t = V(0, 1.9, 0), p = V(0.12, 0.42, 1).normalize().multiplyScalar(fit(10.6, 5.6)).add(t);
      if (instant) { camera.position.copy(p); controls.target.copy(t); flyC.t = 1; return; }
      flyC.p0.copy(camera.position); flyC.t0.copy(controls.target); flyC.p1.copy(p); flyC.t1.copy(t); flyC.t = 0;
    }
    function labels() {
      const on = state.labels;
      for (const id of ITEMS) {
        lbBook[id].hidden = !on; if (on) lab.place(lbBook[id], tmp.copy(books[id].home).setY(books[id].home.y + 0.78), 0);
        const c = copies[id], vis = !!c && c.b.visible;
        lbCopy[id].hidden = !vis;
        if (vis) { const d = isDirty(sim, id) && onDesk(sim, id); lbCopy[id].innerHTML = `${NAMES[id].emoji} ${NAMES[id].en}${d ? '<b>● not saved 還沒存</b>' : ''}<small>${NAMES[id].zh}</small>`; lbCopy[id].classList.toggle('is-on', state.sel === id); lab.place(lbCopy[id], tmp.copy(c.b.position).setY(c.b.position.y + 0.25), -22); }
      }
      lbT[0].hidden = lbT[1].hidden = !on;
      if (on) { lab.place(lbT[0], tmp.set(-2.82, 4.05, -0.6)); lab.place(lbT[1], tmp.set(2.25, 3.2, 0)); }
    }
    function render() { controls.update(); labels(); renderer.render(scene, camera); }

    const ray = new Raycaster(), ndc = new Vector2();
    const hit = (e) => { const r = cv.getBoundingClientRect(); ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); ray.setFromCamera(ndc, camera); const list = [...ITEMS.map((id) => books[id].pad), ...Object.values(copies).filter((c) => c.b.visible).map((c) => c.pad)]; const h = ray.intersectObjects(list, false)[0]; return h ? h.object.userData.id : null; };
    let down = null;
    cv.addEventListener('pointerdown', (e) => { down = { x: e.clientX, y: e.clientY }; });
    cv.addEventListener('pointerup', (e) => { if (!down) return; const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y); down = null; if (moved > 6) return; const id = hit(e); if (id) { user(); open(id); } });
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
  const seq = (list) => { script = { t: 0, list }; };
  const DEMO = {
    open() { script = null; reset(); intro(); seq([{ at: 1.2, fn: () => open('essay') }]); },
    fast() { script = null; reset(); open('essay'); seq([{ at: 2.4, fn: () => open('essay') }, { at: 3.6, fn: () => open('essay') }, { at: 4.8, fn: () => { open('essay'); say('Three more uses, and no more walking. Once something is on the desk, getting it is instant.', '又用了三次，一步都不用走。東西一旦在桌上，拿它就是一瞬間的事。'); } }]); },
    full() { script = null; reset(); say('Four things fill the desk. Watch what happens when a fifth is opened.', '四樣東西就把桌子放滿了。看看打開第五樣時會怎樣。'); seq([{ at: 0.6, fn: () => open('essay') }, { at: 2.4, fn: () => open('game') }, { at: 4.2, fn: () => open('music') }, { at: 6.0, fn: () => open('browser') }, { at: 8.4, fn: () => open('photos') }]); },
    off() { script = null; reset(); open('essay'); seq([{ at: 2.2, fn: () => editSel() }, { at: 5.0, fn: () => setPower(false) }, { at: 9.0, fn: () => setPower(true) }, { at: 11.0, fn: () => { open('essay'); say('The essay is back, but it is the old version from the bookcase. The change was never saved, so it went when the power did.', '作文回來了，可是這是書櫃裡的舊版本。那次修改從來沒有存檔，所以跟著電一起消失了。'); } }]); },
  };

  function step(dt) {
    if (script) { script.t += dt; while (script && script.list.length && script.t >= script.list[0].at) script.list.shift().fn(); if (script && !script.list.length) script = null; }
    if (view) view.tick(dt);
  }
  let raf = 0, last = 0, visible = false;
  function frame(t) { raf = 0; if (!visible) return; const dt = Math.min(0.05, (t - (last || t)) / 1000); last = t; step(dt); if (view) view.render(); raf = requestAnimationFrame(frame); }
  new IntersectionObserver((ents) => { visible = ents[0].isIntersecting; if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); } }, { rootMargin: '120px' }).observe(root);

  show(); intro();
  root.classList.add('al-ready', 'al-fresh');

  root.__lab = {
    state, view, open, editSel, saveSel, setPower, reset, sim: () => sim,
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => view && view.goHome(true),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { step(0); if (view) view.render(); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  const w = document.querySelector('[data-cp-where]'); if (w) initWhere(w);
  const f = document.querySelector('[data-cp-full]'); if (f) initFull(f);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-compdesk-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
