/*
 * 書法 · 第十二課「印章與篆刻」的 3D 模型（全部自繪示意）。
 *
 * 書桌上一張寫好字的紙、一盒印泥、一顆印章。一個機制：**印面上的字是反的，蓋出來才是正的**。
 *   .cg-stamp   蓋印：拿起來 → 把印面翻給你看（石頭的顏色）→ 蘸印泥 → 再翻給你看（凸的地方變紅）→ 轉正、蓋在紙上 → 提起來
 *   .cg-look    只把印面翻過來看（停在那裡，再按一次放回去）
 *   data-char   印面的字（第五課的小篆：日月山水人馬）
 *   data-style  zhu 朱文（陽刻，字凸出來）｜bai 白文（陰刻，字凹下去）
 *   data-carve  mirror 反著刻（對的）｜straight 照正的刻（蓋出來是反的——親眼看為什麼要反著刻）
 *   .cg-clear   換一張紙。紙上最多留三個印，可以並排比較。
 * 右側兩張小圖（.cg-seal-face、.cg-seal-print）隨時顯示「印面」與「蓋出來」，手機上 3D 很小也看得清楚。
 * 印面、印文都用 seal2d.js 畫（2D canvas 貼圖）；印章的大小、石頭的顏色是示意。
 * 2D（不需要 WebGL）：卡片小圖、「朱文還是白文？」、「設計自己的印」（seal2d.js）、練字板寫小篆（pad.js＋scripts2d.js 的 sealChar）。
 *
 * 產物：cd tools/callig && npm run build → assets/js/cal-seal.js
 * 除錯：document.querySelector('[data-calseal-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, CanvasTexture, Color, ConeGeometry, CylinderGeometry, DirectionalLight, Group, HemisphereLight, MathUtils, Mesh, MeshStandardMaterial,
  PCFShadowMap, PerspectiveCamera, PlaneGeometry, SRGBColorSpace, Scene, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { clamp, prepStroke, stamps } from './brush.js';
import { makePaper } from './brush3d.js';
import { labeler, lazyBoot } from './common.js';
import { makeDesk } from './desk.js';
import { drawStamps } from './ink2d.js';
import { initPad } from './pad.js';
import { sealChar } from './scripts2d.js';
import { GLYPH, KEYS, SYMMETRIC, drawFace, drawImpression, drawMinis, initDesign, initKind, printReads } from './seal2d.js';
import YONG from './strokes/yong.json';

const V = (x, y, z) => new Vector3(x, y, z);
const ease = (x) => MathUtils.smootherstep(clamp(x), 0, 1);
const SHEET = { x: -0.7, z: 0.25, w: 3.4, h: 4.0, box: 3.2 };
const SEAL = { w: 0.86, h: 1.5 };
const PAD = { x: 2.55, z: 1.0, r: 0.78, h: 0.2 };
const REST = [2.55, 0, -1.0], SHOW = [1.05, 1.55, 1.25];
const SLOTS = [[250, 835], [500, 835], [750, 835]];   // 紙上三個蓋印的位置（字框座標）
const TILT = MathUtils.degToRad(-104);

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space');
  const cv = $('.al-space-cv');
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
  controls.minDistance = 0.6; controls.maxDistance = 30;
  controls.maxPolarAngle = Math.PI * 0.47;
  scene.add(new HemisphereLight(0xfff4e0, 0x2a2018, 0.85));
  scene.add(new AmbientLight(0xffffff, 0.2));
  const sun = new DirectionalLight(0xfff1dc, 1.5);
  sun.position.set(-4, 9, 6); sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -6, right: 6, top: 5, bottom: -4, near: 1, far: 30 });
  sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.02;
  scene.add(sun);

  makeDesk(scene, { w: 9.4, d: 6.4, felt: [SHEET.x, SHEET.z, 4.4, 4.8], weight: [SHEET.x, SHEET.z - SHEET.h / 2 + 0.16, 2.4], stone: null });
  const paper = makePaper({ w: SHEET.w, h: SHEET.h, x: SHEET.x, y: 0.016, z: SHEET.z, box: SHEET.box, grid: false });
  paper.mesh.receiveShadow = true; scene.add(paper.mesh);
  const yong = YONG.strokes.map((st) => stamps(prepStroke(st)));
  const prints = [];   // 紙上的印：[{ key, style, carve, slot }]
  function paintPaper() {
    paper.setUnder((g, T) => {
      const k = T.k * 0.56, t = { k, ox: T.ox + 220 * T.k, oy: T.oy + 130 * T.k };   // 上半張：一個寫好的「永」
      for (const sts of yong) drawStamps(g, sts, t, { color: '#151311' });
      for (const p of prints) {
        const s = Math.round((SEAL.w / SHEET.box) * 1000 * T.k), [bx, by] = SLOTS[p.slot];
        const c = document.createElement('canvas'); c.width = s; c.height = s;
        drawImpression(c.getContext('2d'), s, p.key, p);
        g.drawImage(c, T.ox + bx * T.k - s / 2, T.oy + by * T.k - s / 2);
      }
    });
  }

  // 印泥盒
  const padG = new Group(); padG.position.set(PAD.x, 0, PAD.z);
  const dish = new Mesh(new CylinderGeometry(PAD.r, PAD.r * 0.94, PAD.h, 48), new MeshStandardMaterial({ color: 0xe9eef3, roughness: 0.25, metalness: 0.05 })); dish.position.y = PAD.h / 2;
  const ring = new Mesh(new CylinderGeometry(PAD.r * 0.99, PAD.r * 0.99, 0.03, 48), new MeshStandardMaterial({ color: 0x3d6ea3, roughness: 0.3 })); ring.position.y = PAD.h * 0.55;
  const paste = new Mesh(new CylinderGeometry(PAD.r * 0.84, PAD.r * 0.84, 0.04, 48), new MeshStandardMaterial({ color: 0xc62a1f, roughness: 0.75 })); paste.position.y = PAD.h + 0.005;
  padG.add(dish, ring, paste); padG.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); scene.add(padG);

  // 印章：原點在印面中心，石頭往 +Y
  const seal = new Group(); seal.rotation.order = 'YXZ';
  const stoneM = new MeshStandardMaterial({ color: 0xd8b98a, roughness: 0.35, metalness: 0.02 });
  const body = new Mesh(new BoxGeometry(SEAL.w, SEAL.h, SEAL.w), stoneM); body.position.y = SEAL.h / 2;
  const cap = new Mesh(new ConeGeometry(SEAL.w * 0.62, 0.36, 4), new MeshStandardMaterial({ color: 0xc9a472, roughness: 0.35 })); cap.rotation.y = Math.PI / 4; cap.position.y = SEAL.h + 0.18;
  const faceCv = document.createElement('canvas'); faceCv.width = 384; faceCv.height = 384;
  const faceT = new CanvasTexture(faceCv); faceT.colorSpace = SRGBColorSpace; faceT.anisotropy = 4;
  const face = new Mesh(new PlaneGeometry(SEAL.w, SEAL.w), new MeshStandardMaterial({ map: faceT, roughness: 0.7 }));
  face.rotation.x = Math.PI / 2; face.position.y = -0.002;   // 法線朝 −Y（印面朝下）
  seal.add(body, cap, face); seal.traverse((m) => { if (m.isMesh) m.castShadow = true; }); scene.add(seal);

  const lab = labeler($('.al-labels'), cv, camera);
  const lbFace = lab.add('cg-lb cg-lb-t', 'Seal face<small>印面</small>');
  const lbPad = lab.add('cg-lb cg-lb-k', 'Seal paste<small>印泥</small>');
  const lbPrint = lab.add('cg-lb cg-lb-m', 'Impression<small>蓋出來的印</small>');

  const R = { play: $('.al-play'), msg: $('.cg-seal-msg'), face: $('.cg-seal-face'), print: $('.cg-seal-print'), faceK: $('.cg-seal-face-k'), printK: $('.cg-seal-print-k') };
  const state = { key: 'ma', style: 'zhu', carve: 'mirror', playing: true, labels: true, t: -1, looking: false, inked: false, slot: 0, phase: 'rest' };

  function fit(w, h) {
    const vf = MathUtils.degToRad(camera.fov / 2);
    const hf = Math.atan(Math.tan(vf) * camera.aspect);
    return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf));
  }
  function goHome() {
    const t = V(0.55, 0.45, 0.3);
    camera.position.copy(t.clone().add(V(0, 0.74, 0.68).normalize().multiplyScalar(fit(6.6, 5.2))));
    controls.target.copy(t);
  }
  const press = (sel, attr, v) => $$(sel).forEach((b) => b.setAttribute('aria-pressed', b.getAttribute(attr) === String(v) ? 'true' : 'false'));
  const say = (en, zh) => { if (R.msg) R.msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };

  function paintFace() {
    drawFace(faceCv.getContext('2d'), 384, state.key, { style: state.style, carve: state.carve, inked: state.inked });
    faceT.needsUpdate = true;
    for (const [c, fn] of [[R.face, 'face'], [R.print, 'print']]) {
      if (!c) continue;
      const S = 200; c.width = S; c.height = S;
      const g = c.getContext('2d');
      if (fn === 'face') drawFace(g, S, state.key, { style: state.style, carve: state.carve, inked: state.inked, bg: '#1a2233' });
      else { g.fillStyle = '#f6f0e1'; g.fillRect(0, 0, S, S); const s = 160, t = document.createElement('canvas'); t.width = s; t.height = s; drawImpression(t.getContext('2d'), s, state.key, state); g.drawImage(t, 20, 20); }
    }
    const back = printReads(state.carve) === 'backward';
    if (R.faceK) R.faceK.innerHTML = state.carve === 'mirror' ? 'Seal face: mirror image<small>印面：字是反的</small>' : 'Seal face: the way you read it<small>印面：字是正的</small>';
    if (R.printK) R.printK.innerHTML = back ? 'On paper: backward!<small>蓋出來：反了！</small>' : 'On paper: reads correctly<small>蓋出來：字是正的</small>';
    root.classList.toggle('cg-seal-back', back);
    press('[data-char]', 'data-char', state.key); press('[data-style]', 'data-style', state.style); press('[data-carve]', 'data-carve', state.carve);
  }
  function setOpt(k, v) {
    state[k] = v; state.inked = false; state.t = -1; state.looking = false; state.phase = 'rest';
    paintFace();
    say(state.style === 'zhu'
      ? `A red-character seal of ${GLYPH[state.key]}: the lines stand up from the stone. Press Stamp it.`
      : `A white-character seal of ${GLYPH[state.key]}: the lines are cut into the stone. Press Stamp it.`,
    state.style === 'zhu' ? `朱文的「${GLYPH[state.key]}」：線條凸出來。按「蓋印」。` : `白文的「${GLYPH[state.key]}」：線條凹下去。按「蓋印」。`);
  }

  // ---------- 時間軸：[秒, x, y, z, 傾斜, 轉向] ----------
  function keys() {
    const [bx, by] = SLOTS[state.slot], w = paper.world(bx, by);
    return [
      [0.0, ...REST, 0, 0], [1.0, ...SHOW, TILT, 0], [2.6, ...SHOW, TILT, 0],
      [3.4, PAD.x, 1.0, PAD.z, 0, 0], [3.8, PAD.x, PAD.h + 0.03, PAD.z, 0, 0], [4.1, PAD.x, PAD.h + 0.03, PAD.z, 0, 0], [4.5, PAD.x, 1.0, PAD.z, 0, 0],
      [5.3, ...SHOW, TILT, 0], [6.8, ...SHOW, TILT, 0],
      [7.8, w.x, 1.0, w.z, 0, Math.PI], [8.3, w.x, 0.02, w.z, 0, Math.PI], [8.9, w.x, 0.02, w.z, 0, Math.PI],
      [9.7, 1.25, 0.9, -1.35, 0, Math.PI], [10.2, 1.25, 0, -1.35, 0, Math.PI],   // 放回桌上（紙的右後方，不擋住字）
    ];
  }
  const T_INK = 3.8, T_PRINT = 8.3, T_END = 10.2;
  let K = keys();
  function pose(t) {
    let i = 0;
    while (i < K.length - 2 && t >= K[i + 1][0]) i++;
    const a = K[i], b = K[i + 1], u = ease((t - a[0]) / Math.max(1e-6, b[0] - a[0]));
    return a.map((v, j) => (j ? v + (b[j] - v) * u : 0));
  }
  function place(p) { seal.position.set(p[1], p[2], p[3]); seal.rotation.set(p[4], p[5], 0); }

  function stamp() {
    if (prints.length >= SLOTS.length) { prints.length = 0; paintPaper(); }
    state.slot = prints.length; state.inked = false; state.looking = false; state.t = 0; state.phase = 'face'; state.done = false;
    K = keys(); paintFace(); setPlaying(true);
    say('First, look at the face of the seal. Which way do the lines go?', '先看印面。線條的方向是正的，還是反的？');
  }
  function look() {
    state.looking = !state.looking; state.t = -1;
    const b = $('.cg-look'); if (b) b.setAttribute('aria-pressed', state.looking ? 'true' : 'false');
    say(state.looking ? 'This is the face of the seal, the part that touches the paper.' : 'The seal is back on the desk.', state.looking ? '這是印面——碰到紙的那一面。' : '印章放回桌上了。');
  }
  function clearPaper() { prints.length = 0; paintPaper(); say('A fresh sheet. Stamp again to compare.', '換了一張新的紙。再蓋幾個來比較。'); }
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
    root.classList.remove('al-fresh');
  }

  $$('[data-char]').forEach((b) => b.addEventListener('click', () => setOpt('key', b.getAttribute('data-char'))));
  $$('[data-style]').forEach((b) => b.addEventListener('click', () => setOpt('style', b.getAttribute('data-style'))));
  $$('[data-carve]').forEach((b) => b.addEventListener('click', () => setOpt('carve', b.getAttribute('data-carve'))));
  $$('.cg-stamp').forEach((b) => b.addEventListener('click', stamp));
  $$('.cg-look').forEach((b) => b.addEventListener('click', look));
  $$('.cg-clear').forEach((b) => b.addEventListener('click', clearPaper));
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  $('.al-home').addEventListener('click', goHome);
  const lbl = $('[data-t="labels"]');
  if (lbl) lbl.addEventListener('change', () => { state.labels = lbl.checked; });

  let lookK = 0;
  function step(dt) {
    if (state.t >= 0) {
      const t0 = state.t;
      state.t = Math.min(T_END, state.t + (state.playing ? dt : 0));
      if (t0 < T_INK && state.t >= T_INK) {
        state.inked = true; paintFace(); state.phase = 'ink';
        say(state.style === 'zhu' ? 'Into the red paste. Only the raised lines pick it up.' : 'Into the red paste. Everything except the cut lines picks it up.',
          state.style === 'zhu' ? '蘸印泥。只有凸起來的線條沾得到。' : '蘸印泥。除了刻下去的線條，其他地方都沾到了。');
      }
      if (t0 < T_PRINT && state.t >= T_PRINT) {
        prints.push({ key: state.key, style: state.style, carve: state.carve, slot: state.slot }); paintPaper(); state.phase = 'print';
      }
      if (t0 < 8.9 && state.t >= 8.9) {
        const back = printReads(state.carve) === 'backward';
        say(back ? `It came out backward! Stamping flips left and right, so a seal carved the way you read it prints a mirror image. Try “Mirror image.”`
          : `There it is: ${GLYPH[state.key]}, the right way round. Stamping flips left and right, so the face has to be carved as a mirror image.`,
        back ? '蓋出來是反的！蓋印會把左右翻過來，所以照正的刻，蓋出來就變成反的。換成「反著刻」再試一次。'
          : `蓋好了：「${GLYPH[state.key]}」是正的。蓋印會把左右翻過來，所以印面一定要反著刻。`);
        state.done = true;
        if (SYMMETRIC.includes(state.key) && R.msg) R.msg.innerHTML += `<span class="cg-seal-sym">${GLYPH[state.key]} is almost the same on both sides, so the flip is hard to see. Try 馬, 人, or 月.<span class="zh">「${GLYPH[state.key]}」左右幾乎對稱，看不太出來有沒有翻過來。換「馬」「人」或「月」試試。</span></span>`;
      }
      place(pose(state.t));
    } else {
      lookK = clamp(lookK + (state.looking ? dt : -dt) / 0.9);
      const u = ease(lookK);
      place([0, REST[0] + (SHOW[0] - REST[0]) * u, REST[1] + (SHOW[1] - REST[1]) * u, REST[2] + (SHOW[2] - REST[2]) * u, TILT * u, 0]);
    }
  }
  function labels() {
    const on = state.labels, tilted = Math.abs(seal.rotation.x) > 1.2;
    lbFace.hidden = !(on && tilted); lbPad.hidden = !on; lbPrint.hidden = !(on && prints.length);
    if (on && tilted) lab.place(lbFace, seal.position.clone().add(V(0, 0.75, 0)));
    if (on) lab.place(lbPad, V(PAD.x, PAD.h + 0.1, PAD.z + PAD.r + 0.12));
    if (on && prints.length) { const [bx, by] = SLOTS[prints[prints.length - 1].slot]; lab.place(lbPrint, paper.world(bx, by + 215)); }
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
    camera.fov = camera.aspect < 1.1 ? 44 : 34;
    camera.updateProjectionMatrix();
    root.classList.toggle('cg-narrow', w < 520);
    const band = camera.aspect < 0.9 ? 0 : camera.aspect < 1.25 ? 1 : 2;
    if (band !== band0) { band0 = band; goHome(); }
  }
  new ResizeObserver(resize).observe(spaceWrap);
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  paintPaper();
  setOpt('key', 'ma');
  setPlaying(true);
  resize();
  root.classList.add('al-ready', 'al-fresh');

  const DEMO = { zhu: () => { setOpt('style', 'zhu'); stamp(); }, bai: () => { setOpt('style', 'bai'); stamp(); }, mirror: () => { setOpt('carve', 'mirror'); stamp(); }, straight: () => { setOpt('carve', 'straight'); stamp(); }, stamp, look: () => { if (!state.looking) look(); } };
  root.__lab = {
    camera, controls, state, scene, seal, prints, setOpt, stamp, look, clearPaper, setPlaying,
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: goHome,
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { step(0); controls.update(); labels(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  drawMinis();
  const kd = document.querySelector('[data-cal-sealkind]');
  if (kd) initKind(kd);
  const ds = document.querySelector('[data-cal-sealdesign]');
  if (ds) initDesign(ds);
  const padEl = document.querySelector('[data-cal-pad]');
  if (padEl) {
    const SEALS = Object.fromEntries(KEYS.map((k) => [k, sealChar(k)]));
    initPad(padEl, SEALS[padEl.getAttribute('data-char')] || SEALS.ma, SEALS);
  }
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-calseal-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
