/*
 * 書法 · 第八課「書聖王羲之：蘭亭序的故事」的 3D 模型（全部自繪示意，不照實物比例）。
 *
 * 兩個看法（data-mode），鏡頭飛過去：
 *   stream 曲水流觴：山坡、竹林、亭子，一條彎彎的小溪；兩岸坐著人（簡單造型）。按「放一只酒杯」，
 *          酒杯（觴）順著水漂下來，停在某個人面前——輪到他作詩（〈蘭亭序〉原文：「引以為流觴曲水，列坐其次」「一觴一詠」）。
 *   write  四個「之」：亭子旁的矮桌上鋪著紙，毛筆寫〈蘭亭序〉裡四個寫法不同的「之」（strokes/lanting.json，
 *          描自神龍本）。可以四個一起寫（2×2），也可以一次寫一個大的（data-zhi）。
 * 2D（不需要 WebGL）：找出一樣的之（lanting2d.js 的 initSame）、練字板（pad.js，四個「之」＋碼表）。
 *
 * 座標：+X 往右、+Y 往上、+Z 朝向觀眾。產物：cd tools/callig && npm run build → assets/js/cal-lanting.js
 * 除錯：document.querySelector('[data-callanting-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, BufferGeometry, CircleGeometry, Color, ConeGeometry, CylinderGeometry, DirectionalLight, DoubleSide,
  Float32BufferAttribute, Fog, Group, HemisphereLight, MathUtils, Mesh, MeshStandardMaterial, PCFShadowMap, PerspectiveCamera,
  PlaneGeometry, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { clamp } from './brush.js';
import { makeBrush, makePaper, makeWriter, placeBrush } from './brush3d.js';
import { labeler, lazyBoot } from './common.js';
import { rng } from './ink2d.js';
import { ZHI, ZHI_KEYS, initSame, quad } from './lanting2d.js';
import { initPad } from './pad.js';

const V = (x, y, z) => new Vector3(x, y, z);
const ease = (x) => MathUtils.smootherstep(clamp(x), 0, 1);
// 小溪的中心線：x 從 −6.5 到 6.5，z 彎來彎去
const streamZ = (x) => 0.2 + 1.15 * Math.sin(x * 0.95) + 0.35 * Math.sin(x * 2.1 + 1);
const streamP = (u, out = new Vector3()) => { const x = -6.5 + 13 * u; return out.set(x, 0.03, streamZ(x)); };
const DESK = { x: 5.0, z: 3.9, y: 0.42, w: 2.5, h: 2.5 };
const SEQ0 = 0.6;

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
  scene.background = new Color(0xbfdcea);
  scene.fog = new Fog(0xbfdcea, 16, 34);
  const camera = new PerspectiveCamera(34, 1, 0.05, 200);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 0.8; controls.maxDistance = 26;
  controls.maxPolarAngle = Math.PI * 0.47;
  scene.add(new HemisphereLight(0xffffff, 0x6f8f5a, 0.95));
  scene.add(new AmbientLight(0xffffff, 0.2));
  const sun = new DirectionalLight(0xfff3dc, 1.5);
  sun.position.set(-5, 10, 6); sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -9, right: 9, top: 7, bottom: -7, near: 1, far: 30 });
  sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.03;
  scene.add(sun);
  const R = rng(8);
  const mat = (c, o = {}) => new MeshStandardMaterial({ color: c, roughness: 0.9, ...o });

  // 草地、遠山
  const ground = new Mesh(new CircleGeometry(24, 48), mat(0x86a866));
  ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);
  for (const [x, z, r, h, c] of [[-9, -11, 6, 5.5, 0x6b8f6a], [-1, -13, 7.5, 7.5, 0x5d8463], [8, -11.5, 6.5, 6, 0x6b8f6a], [14, -8, 5, 4, 0x7a9a74], [-14, -7, 5, 4.2, 0x7a9a74]]) {
    const m = new Mesh(new ConeGeometry(r, h, 7), mat(c, { flatShading: true })); m.position.set(x, h / 2 - 0.1, z); m.rotation.y = R() * 3; scene.add(m);
  }
  // 小溪：沿中心線的帶子（沙岸寬一點、水窄一點）
  function ribbon(width, y, color, extra = {}) {
    const pos = [], idx = [], N = 120;
    for (let i = 0; i <= N; i++) {
      const x = -7.5 + 15 * (i / N), z = streamZ(x), dz = (streamZ(x + 0.01) - streamZ(x - 0.01)) / 0.02;
      const L = Math.hypot(1, dz), nx = -dz / L, nz = 1 / L;
      pos.push(x + nx * width / 2, y, z + nz * width / 2, x - nx * width / 2, y, z - nz * width / 2);
      if (i < N) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
    }
    const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute(pos, 3)); g.setIndex(idx); g.computeVertexNormals();
    const m = new Mesh(g, new MeshStandardMaterial({ color, side: DoubleSide, ...extra })); m.receiveShadow = true; return m;
  }
  scene.add(ribbon(1.25, 0.012, 0xcdbf95, { roughness: 1 }));
  scene.add(ribbon(0.8, 0.024, 0x5fa9c9, { roughness: 0.15, metalness: 0.1 }));
  // 溪邊的石頭
  for (let i = 0; i < 26; i++) {
    const x = -7 + R() * 14, side = R() < 0.5 ? -1 : 1, z = streamZ(x) + side * (0.62 + R() * 0.25), s = 0.08 + R() * 0.13;
    const st = new Mesh(new SphereGeometry(s, 7, 5), mat(0x8d8a80, { flatShading: true })); st.scale.y = 0.6; st.position.set(x, s * 0.3, z); st.castShadow = true; scene.add(st);
  }
  // 竹林（茂林脩竹）
  const bambooM = mat(0x4f8a4a), leafM = mat(0x3f7a3c, { flatShading: true });
  for (let i = 0; i < 46; i++) {
    const x = -10 + R() * 20, z = -3.2 - R() * 5.5, h = 2.6 + R() * 2.2;
    const b = new Mesh(new CylinderGeometry(0.035, 0.05, h, 6), bambooM); b.position.set(x, h / 2, z); b.castShadow = true; scene.add(b);
    for (let k = 0; k < 3; k++) { const lf = new Mesh(new ConeGeometry(0.2, 0.95, 5), leafM); lf.position.set(x + (R() - 0.5) * 0.5, h * (0.62 + k * 0.16), z + (R() - 0.5) * 0.5); lf.castShadow = true; scene.add(lf); }
  }
  // 亭子（蘭亭，示意）
  const pav = new Group();
  const wood = mat(0x7a3b2a), roofM = mat(0x4a5560, { flatShading: true });
  for (const [px, pz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { const p = new Mesh(new CylinderGeometry(0.09, 0.09, 2, 10), wood); p.position.set(px, 1, pz); p.castShadow = true; pav.add(p); }
  const floor = new Mesh(new BoxGeometry(2.7, 0.16, 2.7), mat(0xb9ad94)); floor.position.y = 0.08; floor.receiveShadow = true; pav.add(floor);
  const roof = new Mesh(new ConeGeometry(2.25, 1.0, 4), roofM); roof.position.y = 2.5; roof.rotation.y = Math.PI / 4; roof.castShadow = true; pav.add(roof);
  const knob = new Mesh(new SphereGeometry(0.12, 10, 8), mat(0xc9a14a)); knob.position.y = 3.05; pav.add(knob);
  pav.position.set(-4.2, 0, -2.4); scene.add(pav);

  // 坐在兩岸的人（簡單造型：袍子＋頭＋髮髻＋坐墊）
  const robes = [0x8a5a44, 0x4f6d8a, 0x6f7f4f, 0x8a6f8a, 0xb08a4a, 0x566a6a, 0x9a5f5f, 0x5a5a7a, 0x7f8a5a, 0xa67a5a, 0x4f7a7a, 0x8a7a4f];
  const people = [];
  const US = [0.16, 0.25, 0.33, 0.42, 0.5, 0.58, 0.66, 0.75, 0.83, 0.9, 0.21, 0.47];
  US.forEach((u, i) => {
    const side = i % 2 ? 1 : -1, c = streamP(u), g = new Group();
    const x = c.x, z = c.z + side * 0.98;
    const body = new Mesh(new ConeGeometry(0.3, 0.62, 12), mat(robes[i % robes.length])); body.position.y = 0.31; body.castShadow = true; g.add(body);
    const head = new Mesh(new SphereGeometry(0.13, 14, 10), mat(0xe8c9a6)); head.position.y = 0.72; head.castShadow = true; g.add(head);
    const bun = new Mesh(new SphereGeometry(0.06, 8, 6), mat(0x1f1a17)); bun.position.y = 0.87; g.add(bun);
    const matM = new Mesh(new CylinderGeometry(0.4, 0.4, 0.03, 16), mat(0xc9b27a)); matM.position.y = 0.015; matM.receiveShadow = true; g.add(matM);
    g.position.set(x, 0, z); g.rotation.y = side > 0 ? Math.PI : 0;
    scene.add(g);
    people.push({ u, g, x, z, side, body, poems: 0, bob: 0 });
  });
  // 酒杯（觴）：紅漆的淺杯，兩邊有耳
  const cup = new Group();
  const lac = new MeshStandardMaterial({ color: 0x8a1f17, roughness: 0.35 });
  const bowl = new Mesh(new SphereGeometry(0.16, 18, 10, 0, Math.PI * 2, Math.PI * 0.55, Math.PI * 0.45), new MeshStandardMaterial({ color: 0x8a1f17, roughness: 0.35, side: DoubleSide }));
  bowl.scale.set(1.25, 0.7, 0.85); bowl.position.y = 0.11; cup.add(bowl);
  for (const s of [-1, 1]) { const ear = new Mesh(new BoxGeometry(0.2, 0.012, 0.06), lac); ear.position.set(0, 0.075, s * 0.14); cup.add(ear); }
  const wine = new Mesh(new CircleGeometry(0.12, 16), new MeshStandardMaterial({ color: 0xe9d9a0, roughness: 0.2 })); wine.rotation.x = -Math.PI / 2; wine.scale.set(1.2, 0.8, 1); wine.position.y = 0.06; cup.add(wine);
  cup.traverse((m) => { if (m.isMesh) m.castShadow = true; });
  cup.visible = false; scene.add(cup);

  // 矮桌、紙、毛筆
  const table = new Group();
  const top = new Mesh(new BoxGeometry(DESK.w + 0.5, 0.08, DESK.h + 0.5), mat(0x6a4125, { roughness: 0.6 })); top.position.y = DESK.y - 0.04; top.castShadow = true; top.receiveShadow = true; table.add(top);
  for (const [lx, lz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { const leg = new Mesh(new BoxGeometry(0.1, DESK.y - 0.08, 0.1), mat(0x4a2c18)); leg.position.set(lx * (DESK.w / 2 + 0.12), (DESK.y - 0.08) / 2, lz * (DESK.h / 2 + 0.12)); leg.castShadow = true; table.add(leg); }
  table.position.set(DESK.x, 0, DESK.z); scene.add(table);
  const paper = makePaper({ w: DESK.w, h: DESK.h, x: DESK.x, y: DESK.y + 0.006, z: DESK.z, box: 2.2, boxCenter: [DESK.x, DESK.z], grid: false });
  paper.mesh.receiveShadow = true; scene.add(paper.mesh);
  const brush = makeBrush({ hair: 'weasel' });
  brush.group.traverse((m) => { if (m.isMesh) m.castShadow = true; });
  scene.add(brush.group); brush.setInk(1);

  // 標籤
  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    stream: lab.add('cg-lb cg-lb-k', 'Winding stream<small>曲水</small>'),
    cup: lab.add('cg-lb cg-lb-t', 'Wine cup<small>觴</small>'),
    pav: lab.add('cg-lb cg-lb-k', 'Pavilion<small>亭</small>'),
    bamboo: lab.add('cg-lb cg-lb-k', 'Tall bamboo<small>脩竹</small>'),
    turn: lab.add('cg-lb cg-lb-t', ''),
    zhi: lab.add('cg-lb cg-lb-k', ''),
  };

  const R2 = { play: $('.al-play'), cups: $('.cg-cups-out'), poems: $('.cg-poems-out'), msg: $('.cg-lanting-msg'), zhiOut: $('.cg-zhi-out'), fromOut: $('.cg-from-out') };
  const state = { mode: 'stream', playing: true, labels: true, speed: 1, t: 0, zhi: 'all', cups: 0, poems: 0, cup: null, wt: 0 };
  let writer = null;
  let seed = 11;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };

  function fit(w, h) {
    const vf = MathUtils.degToRad(camera.fov / 2);
    const hf = Math.atan(Math.tan(vf) * camera.aspect);
    return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf));
  }
  const HOMES = {
    stream: () => ({ t: V(0, 0.9, -0.2), d: V(0.04, 0.5, 0.86), w: 14.5, h: 7.4 }),
    write: () => ({ t: V(DESK.x, DESK.y + 0.1, DESK.z + 0.05), d: V(-0.12, 0.92, 0.5), w: 3.5, h: 3.5 }),
  };
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t, instant) {
    if (instant) { camera.position.copy(p); controls.target.copy(t); fly.t = 1; return; }
    fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0;
  }
  function goHome(instant) { const H = HOMES[state.mode](); flyTo(H.d.clone().normalize().multiplyScalar(fit(H.w, H.h)).add(H.t), H.t, instant); }
  const press = (sel, attr, v) => $$(sel).forEach((b) => b.setAttribute('aria-pressed', b.getAttribute(attr) === String(v) ? 'true' : 'false'));
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    R2.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R2.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
    root.classList.remove('al-fresh');
  }
  function setSpeed(v) { state.speed = v; press('[data-speed]', 'data-speed', v); }

  /** 放一只酒杯：從上游漂下來，停在某個人面前（who 沒給就隨機） */
  function float(who = null) {
    const i = who == null ? Math.floor(rnd() * people.length) : who;
    state.cup = { u: 0, target: i, stopU: people[i].u, phase: 'drift', wait: 0 };
    state.cups++; cup.visible = true;
    if (R2.cups) R2.cups.textContent = String(state.cups);
    if (R2.msg) R2.msg.innerHTML = 'The cup is floating down the stream. Where will it stop?<span class="zh">酒杯順著水漂下來了，會停在誰面前呢？</span>';
    setPlaying(true);
  }
  function startWrite(k = state.zhi) {
    state.zhi = k; state.wt = 0;
    paper.clearInk();
    writer = makeWriter(paper, k === 'all' ? quad() : ZHI[k]);
    press('[data-zhi]', 'data-zhi', k);
    if (R2.zhiOut) R2.zhiOut.innerHTML = k === 'all' ? 'Four<small>四個一起寫</small>' : `No. ${ZHI[k].index}<small>全文第 ${ZHI[k].index} 個「之」</small>`;
    if (R2.fromOut) R2.fromOut.innerHTML = k === 'all' ? '暮春之初・宇宙之大<small>視聽之娛・係之矣</small>' : `${ZHI[k].from}<small>${ZHI[k].en}</small>`;
    setPlaying(true);
  }
  function setMode(m, opts = {}) {
    state.mode = m;
    root.dataset.mode = m;
    press('[data-mode]', 'data-mode', m);
    $$('.cg-panel[data-panel]').forEach((p) => { p.hidden = p.getAttribute('data-panel') !== m; });
    if (m === 'write') startWrite(opts.zhi || state.zhi); else if (!state.cup && opts.float !== false) float();
    goHome(!!opts.instant);
  }

  $$('[data-mode]').forEach((b) => b.addEventListener('click', () => setMode(b.getAttribute('data-mode'))));
  $$('[data-zhi]').forEach((b) => b.addEventListener('click', () => { if (state.mode !== 'write') setMode('write', { zhi: b.getAttribute('data-zhi') }); else startWrite(b.getAttribute('data-zhi')); }));
  $$('[data-float]').forEach((b) => b.addEventListener('click', () => { if (state.mode !== 'stream') setMode('stream', { float: false }); float(); }));
  $$('[data-speed]').forEach((b) => b.addEventListener('click', () => setSpeed(Number(b.getAttribute('data-speed')))));
  $$('.cg-again').forEach((b) => b.addEventListener('click', () => startWrite()));
  R2.play.addEventListener('click', () => setPlaying(!state.playing));
  $('.al-home').addEventListener('click', () => goHome(false));
  const lbl = $('[data-t="labels"]');
  if (lbl) lbl.addEventListener('change', () => { state.labels = lbl.checked; });

  const tmp = V(0, 0, 0);
  function step(dt) {
    const run = (state.playing ? dt : 0) * state.speed;
    state.t += run;
    // 酒杯
    const c = state.cup;
    if (c) {
      if (c.phase === 'drift') {
        c.u += run * 0.085;
        if (c.u >= c.stopU) { c.u = c.stopU; c.phase = 'stop'; c.wait = 0; const p = people[c.target]; p.poems++; state.poems++; if (R2.poems) R2.poems.textContent = String(state.poems);
          if (R2.msg) R2.msg.innerHTML = 'The cup has stopped. One cup, one poem: this guest drinks and chants a poem.<span class="zh">酒杯停下來了。「一觴一詠」：這位客人喝一杯酒、吟一首詩。</span>'; }
      } else if (c.phase === 'stop') {
        c.wait += run; people[c.target].bob = Math.sin(clamp(c.wait / 3.2) * Math.PI);
        if (c.wait > 3.4) { c.phase = 'leave'; people[c.target].bob = 0; }
      } else { c.u += run * 0.11; if (c.u > 1.04) { state.cup = null; cup.visible = false; } }
      if (state.cup) {
        streamP(Math.min(c.u, 1.06), tmp);
        const side = c.phase === 'stop' ? people[c.target].side * 0.22 * ease(c.wait / 0.6) : 0;
        cup.position.set(tmp.x, 0.03 + Math.sin(state.t * 3) * 0.012, tmp.z + side);
        cup.rotation.y = state.t * (c.phase === 'stop' ? 0.2 : 0.9);
      }
    }
    people.forEach((p) => { p.g.position.y = p.bob * 0.06; p.g.rotation.z = p.bob * 0.06 * -p.side; });
    // 寫字
    if (state.mode === 'write' && writer) {
      state.wt += run;
      const tw = state.wt - SEQ0;
      if (tw < 0) placeBrush(brush, paper, writer.poseAt(0), (1 - state.wt / SEQ0) * 0.4);
      else {
        const pose = writer.poseAt(Math.min(tw, writer.duration)), over = tw - writer.duration;
        placeBrush(brush, paper, over > 0 ? { ...pose, p: 0 } : pose, over > 0 ? ease(over / 0.7) * 0.45 : pose.hover * 0.3);
        writer.drawTo(tw);
        if (over > 2) state.wt = SEQ0 + writer.duration + 2;
      }
    } else {
      brush.group.quaternion.identity(); brush.group.position.set(DESK.x + DESK.w / 2 + 0.1, DESK.y + 0.7, DESK.z - DESK.h / 2 + 0.3); brush.setPose({ d: 0, dir: [1, 0], fan: 0, tilt: 0 });
    }
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 1.2);
      const k = ease(fly.t);
      camera.position.lerpVectors(fly.p0, fly.p1, k);
      controls.target.lerpVectors(fly.t0, fly.t1, k);
    }
  }
  function labels() {
    const on = state.labels, st = on && state.mode === 'stream';
    L.stream.hidden = L.pav.hidden = L.bamboo.hidden = !st;
    if (st) { lab.place(L.stream, V(-5.6, 0.25, streamZ(-5.6))); lab.place(L.pav, V(-4.2, 3.4, -2.4)); lab.place(L.bamboo, V(3.5, 3.9, -4)); }
    const c = state.cup;
    L.cup.hidden = !(st && c && c.phase !== 'stop');
    if (!L.cup.hidden) lab.place(L.cup, cup.position.clone().setY(0.45));
    L.turn.hidden = !(st && c && c.phase === 'stop');
    if (!L.turn.hidden) {
      const html = 'A cup, a poem<small>一觴一詠</small>';
      if (L.turn.innerHTML !== html) L.turn.innerHTML = html;
      lab.place(L.turn, V(people[c.target].x, 1.25, people[c.target].z));
    }
    const wr = on && state.mode === 'write' && state.zhi !== 'all' && writer && state.wt - SEQ0 > writer.duration * 0.5;
    L.zhi.hidden = !wr;
    if (wr) { const html = `${ZHI[state.zhi].from}<small>No. ${ZHI[state.zhi].index} of 20</small>`; if (L.zhi.innerHTML !== html) L.zhi.innerHTML = html; lab.place(L.zhi, paper.world(500, -60)); }
  }
  let raf = 0, last = 0, visible = false;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt); controls.update(); labels();
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
  setMode('stream', { instant: true });
  resize();
  root.classList.add('al-ready', 'al-fresh');

  const DEMO = { stream: () => { setMode('stream', { float: false }); float(); }, write: () => setMode('write', { zhi: 'all' }), ...Object.fromEntries(ZHI_KEYS.map((k) => [k, () => setMode('write', { zhi: k })])) };
  root.__lab = {
    camera, controls, state, scene, people, setMode, setSpeed, setPlaying, float, startWrite,
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => goHome(true),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { step(0); controls.update(); labels(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  const sm = document.querySelector('[data-cal-same]');
  if (sm) initSame(sm);
  const padEl = document.querySelector('[data-cal-pad]');
  if (padEl) initPad(padEl, ZHI.z1, ZHI);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-callanting-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
