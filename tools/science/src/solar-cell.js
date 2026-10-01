/*
 * 萬物原理 · 第三課「太陽能板怎麼把光變成電？」的 3D 矽太陽能電池剖面（全部是自繪示意，不是真實比例）。
 *
 * 一個機制：光子把矽裡的電子敲出來，兩層矽交界處的「內建電場」把電子往上推、把電洞往下推；
 *   電子回不去，只好繞外面的電線走——那就是電。完全沒有會動的零件。
 *
 * 座標：+X 往右、+Y 往上、+Z 朝向觀眾；正面（z = 1.5）是剖開的。
 *   上層 N 型矽（y 0.29…0.61，多一點電子）、下層 P 型矽（y −1.38…0.29，少一點電子＝電洞），
 *   交界 y = 0.29 是內建電場；頂面有銀色指狀電極與匯流條，底面是鋁背電極。
 *   電線從匯流條右端出去、經過燈泡、回到背電極；電線裡本來就塞滿電子（第一課的規則）：
 *   每有一個被敲出的電子進到頂部電極，電線裡的電子就一起挪一格，背電極那邊就有一個電洞被填掉。
 *
 * 光子：陽光＝紅外線、紅、綠、藍的混合（pv.js 的 SUN_MIX）。紅外線能量不夠，直接穿過；
 *   其他光子被吸收的深度：藍光很淺、紅光很深；能量多出 0.6 eV 的部分變成熱（橘色閃光）。少數光子被表面反射。
 *
 * 產物：cd tools/science && npm run build → assets/js/solar-cell.js（不要叫 solar.js：天文第九課已經用了這個名字）
 */
import {
  AdditiveBlending, AmbientLight, BoxGeometry, CanvasTexture, CatmullRomCurve3, Color, ConeGeometry,
  DirectionalLight, Group, HemisphereLight, InstancedMesh, MathUtils, Mesh, MeshBasicMaterial,
  MeshStandardMaterial, Object3D, PerspectiveCamera, PlaneGeometry, PointLight, Scene, SphereGeometry, Sprite,
  SpriteMaterial, SRGBColorSpace, TubeGeometry, Vector3, WebGLRenderer, DoubleSide, CylinderGeometry,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { LIGHTS, SUN_MIX, split, depthRange, canFree } from './pv.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const ease = (t) => Math.min(1, Math.max(0, MathUtils.smootherstep(t, 0, 1)));
const TOP = 0.61, JUNC = 0.29, BOT = -1.38;
const ELEC = 0x58e1ff, HOLE = 0xff8fb8;
const PH_COL = { ir: 0x8a3a3a, red: 0xff4a3a, green: 0x5cff6a, blue: 0x5a8cff };
const SUN_POS = V(-4.4, 5.0, 1.0);
const FINGERS = [-2.25, -0.75, 0.75, 2.25];
const REFLECT = 0.05;
const RATE = { sunny: 9, cloudy: 2.4, night: 0 };     // 每秒幾顆光子（模型）

const canvasTex = (draw, w = 64, h = 64) => {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace; return t;
};
const glowTex = (inner, outer) => canvasTex((g) => {
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.3, inner); gr.addColorStop(1, outer);
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
});
const cloudTex = () => canvasTex((g, w, h) => {
  for (const [x, y, r] of [[70, 80, 46], [120, 62, 58], [175, 82, 44], [120, 96, 50]]) {
    const gr = g.createRadialGradient(x, y, 0, x, y, r);
    gr.addColorStop(0, 'rgba(230,236,248,.95)'); gr.addColorStop(1, 'rgba(230,236,248,0)');
    g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
  }
}, 256, 160);

const MSG = {
  sun: ['Sunlight is a mix of colors, plus infrared you cannot see. Watch which photons free an electron, which pass straight through, and how much turns into heat.',
    '陽光是各種顏色的光，再加上看不見的紅外線。看看哪些光子敲出了電子、哪些直接穿過去，又有多少變成了熱。'],
  red: ['Red photons carry just enough energy. They go deep into the silicon before they are absorbed, and little is left over as heat.',
    '紅光光子的能量剛好夠。它們鑽到矽的深處才被吸收，多出來變成熱的很少。'],
  blue: ['Blue photons carry more energy, but each one still frees only one electron. They are absorbed near the surface, and the extra energy becomes heat.',
    '藍光光子能量比較大，但一顆還是只能敲出一個電子。它們在表面附近就被吸收，多出來的能量變成熱。'],
  ir: ['These infrared photons carry too little energy to free an electron from silicon, so they pass straight through. No electrons, no electricity.',
    '這種紅外線光子的能量不夠，敲不出矽裡的電子，就直接穿過去。沒有電子，就沒有電。'],
  night: ['No light, no photons, no freed electrons. A solar panel makes nothing at night, so the electricity has to be saved in batteries or come from somewhere else.',
    '沒有光，就沒有光子，也沒有被敲出的電子。太陽能板晚上不發電，要先存進電池，或改用別的電。'],
  cloudy: ['Clouds block much of the light, but not all of it. Fewer photons get through, so fewer electrons flow and the bulb is dimmer.',
    '雲擋住了大部分的光，但不是全部。穿過來的光子變少，流動的電子變少，燈也比較暗。'],
};

function initLab(root) {
  const $ = (s) => root.querySelector(s);
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
  const scene = new Scene();
  const SKY = { day: new Color(0x0e1a34), night: new Color(0x05070f) };
  scene.background = SKY.day.clone();
  const camera = new PerspectiveCamera(34, 1, 0.1, 120);
  const TARGET = V(0.9, 1.0, 0);
  const homePos = () => V(2.6, 5.2, 15.6).multiplyScalar(camera.aspect < 0.9 ? 1.18 : camera.aspect < 1.2 ? 0.98 : 1);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 3; controls.maxDistance = 30;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xdfe8ff, 0x1a1a28, 1.0));
  scene.add(new AmbientLight(0xffffff, 0.22));
  const sunLight = new DirectionalLight(0xfff1d6, 1.8); sunLight.position.copy(SUN_POS); scene.add(sunLight);
  const rim = new DirectionalLight(0x9fc4ff, 0.6); rim.position.set(5, 2, -4); scene.add(rim);

  const R = {
    msg: $('.sl-msg'), ph: $('.sl-ph'), el: $('.sl-el'), lost: $('.sl-lost'), play: $('.al-play'),
    bar: { elec: $('.sl-b-elec'), heat: $('.sl-b-heat'), thru: $('.sl-b-thru'), refl: $('.sl-b-refl') },
    pct: { elec: $('.sl-p-elec'), heat: $('.sl-p-heat'), thru: $('.sl-p-thru'), refl: $('.sl-p-refl') },
  };
  const lab = labeler($('.al-labels'), cv, camera);
  const state = {
    gen: 0, light: 'sun', weather: 'sunny', playing: true, speed: 1, labels: true, field: true, holes: true,
    photons: 0, electrons: 0, E: { elec: 0, heat: 0, thru: 0, refl: 0 }, shift: 0, spawnT: 0, lastMsg: '', focus: null, focusT: 0,
  };

  // ---------------- 電池本體 ----------------
  const parts = { n: [], p: [], junction: [], fingers: [], back: [] };
  const nMat = new MeshStandardMaterial({ color: 0x3d6fd6, transparent: true, opacity: 0.28, depthWrite: false, roughness: 0.4 });
  const pMat = new MeshStandardMaterial({ color: 0x8a5aa8, transparent: true, opacity: 0.22, depthWrite: false, roughness: 0.4 });
  const nBox = at(new Mesh(new BoxGeometry(6, TOP - JUNC, 3), nMat), 0, (TOP + JUNC) / 2, 0); nBox.renderOrder = 1; scene.add(nBox);
  const pBox = at(new Mesh(new BoxGeometry(6, JUNC - BOT, 3), pMat), 0, (JUNC + BOT) / 2, 0); pBox.renderOrder = 1; scene.add(pBox);
  parts.n.push(nMat); parts.p.push(pMat);
  // 頂面：深藍的抗反射層（很薄、半透明，看得到下面）
  const arMat = new MeshStandardMaterial({ color: 0x1b2f6b, transparent: true, opacity: 0.35, roughness: 0.25, metalness: 0.2, side: DoubleSide, depthWrite: false });
  const ar = new Mesh(new PlaneGeometry(6, 3), arMat); ar.rotation.x = -Math.PI / 2; ar.position.y = TOP + 0.005; scene.add(ar);
  // 交界：內建電場（淡黃平面＋上下箭頭）
  const jMat = new MeshStandardMaterial({ color: 0xffd36e, transparent: true, opacity: 0.16, side: DoubleSide, depthWrite: false, emissive: 0xffd36e, emissiveIntensity: 0.15 });
  const jPlane = new Mesh(new PlaneGeometry(6, 3), jMat); jPlane.rotation.x = -Math.PI / 2; jPlane.position.y = JUNC; scene.add(jPlane);
  parts.junction.push(jMat);
  const fieldG = new Group(); scene.add(fieldG);
  for (const x of [-2.6, -1.3, 0, 1.3, 2.6]) for (const z of [-0.9, 0.9]) {
    const up = at(new Mesh(new ConeGeometry(0.07, 0.22, 10), new MeshBasicMaterial({ color: ELEC, transparent: true, opacity: 0.75 })), x - 0.12, JUNC + 0.15, z);
    const dn = at(new Mesh(new ConeGeometry(0.07, 0.22, 10), new MeshBasicMaterial({ color: HOLE, transparent: true, opacity: 0.75 })), x + 0.12, JUNC - 0.15, z);
    dn.rotation.x = Math.PI;
    fieldG.add(up, dn);
  }
  // 頂部銀色指狀電極、匯流條；底部鋁背電極
  const silver = new MeshStandardMaterial({ color: 0xdfe3ea, metalness: 0.85, roughness: 0.25 });
  for (const x of FINGERS) scene.add(at(new Mesh(new BoxGeometry(0.07, 0.05, 3), silver), x, TOP + 0.03, 0));
  scene.add(at(new Mesh(new BoxGeometry(6.2, 0.07, 0.16), silver), 0.1, TOP + 0.04, 1.42));
  parts.fingers.push(silver);
  const alu = new MeshStandardMaterial({ color: 0xa8aeb8, metalness: 0.7, roughness: 0.35 });
  scene.add(at(new Mesh(new BoxGeometry(6, 0.08, 3), alu), 0, BOT - 0.04, 0));
  parts.back.push(alu);

  // 太陽、雲
  const sun = new Sprite(new SpriteMaterial({ map: glowTex('rgba(255,230,140,.9)', 'rgba(255,190,80,0)'), blending: AdditiveBlending, depthWrite: false, transparent: true }));
  sun.position.copy(SUN_POS); sun.scale.set(3.2, 3.2, 1); scene.add(sun);
  const cloud = new Sprite(new SpriteMaterial({ map: cloudTex(), transparent: true, depthWrite: false, opacity: 0.9 }));
  cloud.position.copy(SUN_POS).lerp(V(0, 0.6, 0), 0.35); cloud.scale.set(5.6, 3.5, 1); scene.add(cloud);

  // ---------------- 外電路 ----------------
  const BULB = V(4.75, 1.2, 1.4);
  const LOOP = new CatmullRomCurve3([
    V(3.1, TOP + 0.04, 1.42), V(3.7, 1.0, 1.42), V(4.45, 1.45, 1.42), V(BULB.x, BULB.y - 0.12, 1.4),
    V(5.0, 0.6, 1.42), V(4.9, -0.8, 1.42), V(4.2, BOT - 0.04, 1.3), V(3.05, BOT - 0.04, 1.1),
  ], false, 'centripetal');
  const LOOP_L = LOOP.getLength();
  scene.add(new Mesh(new TubeGeometry(LOOP, 160, 0.04, 8, false), new MeshStandardMaterial({ color: 0x9a6a3e, roughness: 0.45, metalness: 0.4 })));
  const glassMat = new MeshStandardMaterial({ color: 0xfff6dc, transparent: true, opacity: 0.32, roughness: 0.1, emissive: 0xffc860, emissiveIntensity: 0 });
  scene.add(at(new Mesh(new CylinderGeometry(0.13, 0.15, 0.22, 16), new MeshStandardMaterial({ color: 0xb8bcc4, metalness: 0.7, roughness: 0.3 })), BULB.x, BULB.y + 0.02, 1.4));
  scene.add(at(new Mesh(new SphereGeometry(0.3, 28, 20), glassMat), BULB.x, BULB.y + 0.38, 1.4));
  const bGlow = new Sprite(new SpriteMaterial({ map: glowTex('rgba(255,225,150,.75)', 'rgba(255,190,80,0)'), blending: AdditiveBlending, depthWrite: false, transparent: true, opacity: 0 }));
  bGlow.position.set(BULB.x, BULB.y + 0.38, 1.4); bGlow.scale.set(2.2, 2.2, 1); scene.add(bGlow);
  const bLight = new PointLight(0xffc860, 0, 6); bLight.position.copy(bGlow.position); scene.add(bLight);

  // 電線裡的電子（輸送帶）
  const NE = 30, SP = LOOP_L / NE;
  const dummy = new Object3D();
  const tmp = V(0, 0, 0), tan = V(0, 0, 0);
  const wireE = new InstancedMesh(new SphereGeometry(0.06, 10, 8), new MeshBasicMaterial({ color: ELEC }), NE);
  scene.add(wireE);
  function placeWire() {
    for (let i = 0; i < NE; i++) {
      const s = (((i * SP + state.shift) % LOOP_L) + LOOP_L) % LOOP_L;
      LOOP.getPointAt(s / LOOP_L, tmp);
      dummy.position.copy(tmp); dummy.scale.setScalar(1); dummy.rotation.set(0, 0, 0); dummy.updateMatrix();
      wireE.setMatrixAt(i, dummy.matrix);
    }
    wireE.instanceMatrix.needsUpdate = true;
  }
  const arrows = [0.2, 0.5, 0.8].map((u) => {
    const m = new Mesh(new ConeGeometry(0.1, 0.28, 14), new MeshBasicMaterial({ color: ELEC, transparent: true, opacity: 0.85 }));
    m.userData.u = u; scene.add(m); return m;
  });

  // ---------------- 粒子 ----------------
  const MAXP = 90, MAXC = 140;
  const phMesh = new InstancedMesh(new SphereGeometry(0.075, 10, 8), new MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.95 }), MAXP);
  const phTrail = new InstancedMesh(new CylinderGeometry(0.025, 0.025, 1, 6), new MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4 }), MAXP);
  const elMesh = new InstancedMesh(new SphereGeometry(0.07, 10, 8), new MeshBasicMaterial({ color: ELEC }), MAXC);
  const hoMesh = new InstancedMesh(new SphereGeometry(0.075, 10, 8), new MeshBasicMaterial({ color: HOLE, transparent: true, opacity: 0.85 }), MAXC);
  const heatMesh = new InstancedMesh(new SphereGeometry(0.16, 10, 8), new MeshBasicMaterial({ color: 0xff8a2a, transparent: true, opacity: 0.55, blending: AdditiveBlending, depthWrite: false }), MAXC);
  for (const m of [phMesh, phTrail, elMesh, hoMesh, heatMesh]) { m.count = 0; m.frustumCulled = false; scene.add(m); }
  const PH = [], EL = [], HO = [], HT = [];
  let seed = 5;
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  const col = new Color();
  const Y_AXIS = V(0, 1, 0);

  function pickKind() {
    if (state.light !== 'sun') return state.light;
    let r = rnd();
    for (const [k, w] of SUN_MIX) { if ((r -= w) <= 0) return k; }
    return 'blue';
  }
  function spawnPhoton() {
    if (PH.length >= MAXP) return;
    const kind = pickKind();
    const hit = V(-2.7 + rnd() * 5.4, TOP, -1.3 + rnd() * 2.6);
    const dir = hit.clone().sub(SUN_POS).normalize();
    const start = hit.clone().addScaledVector(dir, -5.6);
    const refl = rnd() < REFLECT;
    PH.push({ kind, start, hit, dir, t: 0, refl, phase: 'in', gen: state.gen });
    state.photons += 1;
  }
  // 切換光色或重新計算之後（gen 改變），還在路上的舊光子、舊電子照樣畫，但不算進新的統計
  function absorb(p) {
    const s = split(p.kind);
    const sh = p.gen === state.gen ? s.e : 0;
    if (p.refl) { state.E.refl += sh; return; }
    if (!canFree(p.kind)) { state.E.thru += sh; return; }
    const [d0, d1] = depthRange(p.kind);
    const d = d0 + rnd() * (d1 - d0);
    const y = TOP - d * (TOP - BOT - 0.08);
    const pos = V(p.hit.x + p.dir.x * (TOP - y) / -p.dir.y, y, p.hit.z + p.dir.z * (TOP - y) / -p.dir.y);
    pos.x = MathUtils.clamp(pos.x, -2.85, 2.85); pos.z = MathUtils.clamp(pos.z, -1.4, 1.4);
    if (p.gen === state.gen) { state.E.elec += s.elec; state.E.heat += s.heat; }
    // 電子：往上到最近的指狀電極 → 沿電極到匯流條
    const fx = FINGERS.reduce((a, b) => (Math.abs(b - pos.x) < Math.abs(a - pos.x) ? b : a));
    const path = new CatmullRomCurve3([pos.clone(), V(pos.x, Math.max(pos.y, JUNC) + 0.02, pos.z), V(fx, TOP + 0.03, pos.z), V(fx, TOP + 0.04, 1.42), V(3.1, TOP + 0.04, 1.42)], false, 'centripetal');
    if (EL.length < MAXC) EL.push({ path, t: 0, dur: 1.6 + path.getLength() * 0.12, gen: p.gen });
    // 電洞：往下到背電極，在那裡等電子回來
    if (HO.length < MAXC) HO.push({ from: pos.clone(), to: V(pos.x, BOT + 0.06, pos.z), t: 0, waiting: false });
    // 多餘能量變成熱
    if (HT.length < MAXC && s.heat > 0.1) HT.push({ pos: pos.clone(), t: 0, size: Math.min(1.6, s.heat / 1.4) });
  }

  function step(dt) {
    const sp = state.speed;
    if (state.playing) {
      const rate = RATE[state.weather];
      if (rate > 0) {
        state.spawnT -= dt * sp * rate;
        while (state.spawnT <= 0) { spawnPhoton(); state.spawnT += 1; }
      }
      // 光子
      for (let i = PH.length - 1; i >= 0; i--) {
        const p = PH[i];
        p.t += dt * sp / 0.9;
        if (p.phase === 'in' && p.t >= 1) {
          if (p.refl) { p.phase = 'bounce'; p.t = 0; p.dir.y = -p.dir.y; }
          else if (!canFree(p.kind)) { p.phase = 'thru'; p.t = 0; }
          absorb(p);
          if (p.phase === 'in') { PH.splice(i, 1); continue; }
        } else if (p.phase !== 'in' && p.t >= 1) { PH.splice(i, 1); }
      }
      // 電子
      let de = 0;
      for (let i = EL.length - 1; i >= 0; i--) {
        const e = EL[i];
        const t1 = Math.min(1, e.t + dt * sp / e.dur);
        e.t = t1;
        if (e.t >= 1) {
          EL.splice(i, 1);
          if (e.gen === state.gen) state.electrons += 1;
          state.pending = (state.pending || 0) + 1;          // 輸送帶要挪一格
        }
      }
      // 輸送帶：每個進到電極的電子讓它挪一格（0.5 秒內）
      if (state.pending > 0) {
        const move = Math.min(state.pending, dt * sp / 0.5);
        state.pending -= move; de += move;
        state.fill = (state.fill || 0) + move;
        while (state.fill >= 1) {            // 背電極那邊填掉一個電洞
          state.fill -= 1;
          const k = HO.findIndex((h) => h.waiting);
          if (k >= 0) HO.splice(k, 1);
        }
      }
      state.shift += de * SP;
      state.rate = (state.rate || 0) + (de / Math.max(dt, 1e-3) - (state.rate || 0)) * Math.min(1, dt * 1.5);
      // 電洞
      for (const h of HO) { if (!h.waiting) { h.t = Math.min(1, h.t + dt * sp / 1.4); if (h.t >= 1) h.waiting = true; } }
      while (HO.length > 32) HO.shift();
      // 熱
      for (let i = HT.length - 1; i >= 0; i--) { HT[i].t += dt * sp / 0.8; if (HT[i].t >= 1) HT.splice(i, 1); }
    }
    draw();
  }

  function draw() {
    let n = 0;
    PH.forEach((p) => {
      let pos;
      if (p.phase === 'in') pos = p.start.clone().lerp(p.hit, p.t);
      else if (p.phase === 'bounce') pos = p.hit.clone().addScaledVector(p.dir, -p.t * -4);
      else pos = p.hit.clone().addScaledVector(p.dir, p.t * 3.4);
      dummy.position.copy(pos); dummy.scale.setScalar(p.kind === 'ir' ? 0.8 : 1); dummy.rotation.set(0, 0, 0); dummy.updateMatrix();
      phMesh.setMatrixAt(n, dummy.matrix);
      phMesh.setColorAt(n, col.setHex(PH_COL[p.kind]));
      // 尾巴
      const back = p.dir;                       // 尾巴拖在行進方向的後面
      dummy.position.copy(pos).addScaledVector(back, -0.35);
      dummy.quaternion.setFromUnitVectors(Y_AXIS, back.clone().normalize());
      dummy.scale.set(1, 0.7, 1); dummy.updateMatrix();
      phTrail.setMatrixAt(n, dummy.matrix);
      phTrail.setColorAt(n, col.setHex(PH_COL[p.kind]));
      dummy.quaternion.identity();
      n++;
    });
    phMesh.count = phTrail.count = n;
    phMesh.instanceMatrix.needsUpdate = phTrail.instanceMatrix.needsUpdate = true;
    if (phMesh.instanceColor) phMesh.instanceColor.needsUpdate = true;
    if (phTrail.instanceColor) phTrail.instanceColor.needsUpdate = true;
    n = 0;
    EL.forEach((e) => { e.path.getPointAt(ease(e.t), tmp); dummy.position.copy(tmp); dummy.scale.setScalar(1); dummy.updateMatrix(); elMesh.setMatrixAt(n++, dummy.matrix); });
    elMesh.count = n; elMesh.instanceMatrix.needsUpdate = true;
    n = 0;
    HO.forEach((h) => { tmp.copy(h.from).lerp(h.to, ease(h.t)); dummy.position.copy(tmp); dummy.scale.setScalar(1); dummy.updateMatrix(); hoMesh.setMatrixAt(n++, dummy.matrix); });
    hoMesh.count = state.holes ? n : 0; hoMesh.instanceMatrix.needsUpdate = true;
    n = 0;
    HT.forEach((h) => { dummy.position.copy(h.pos); dummy.scale.setScalar(h.size * (0.4 + h.t)); dummy.updateMatrix(); heatMesh.setMatrixAt(n++, dummy.matrix); });
    heatMesh.count = n; heatMesh.instanceMatrix.needsUpdate = true;
    heatMesh.material.opacity = 0.5;
    placeWire();
    const flowing = (state.rate || 0) > 0.05;
    for (const a of arrows) {
      a.visible = flowing;
      if (!flowing) continue;
      LOOP.getPointAt(a.userData.u, a.position);
      LOOP.getTangentAt(a.userData.u, tan);
      a.position.z += 0.2;
      a.quaternion.setFromUnitVectors(Y_AXIS, tan);
    }
    const b = Math.min(1, (state.rate || 0) / 5);
    glassMat.emissiveIntensity = 1.6 * b; bGlow.material.opacity = 0.9 * b; bLight.intensity = 5 * b;
  }

  // ---------------- 標籤 ----------------
  const LB = {
    sun: [lab.add('bt-lb bt-lb-b', 'Sunlight<small>陽光</small>'), () => SUN_POS.clone().add(V(0, -1.4, 0))],
    n: [lab.add('bt-lb sl-lb-n', 'N-type silicon: a few extra electrons<small>N 型矽：多一點電子</small>'), () => V(-1.6, (TOP + JUNC) / 2, 1.55)],
    junction: [lab.add('bt-lb bt-lb-b', 'Junction: built-in electric field<small>接面：內建電場</small>'), () => V(1.7, JUNC, 1.55)],
    p: [lab.add('bt-lb sl-lb-p', 'P-type silicon: “holes” where electrons are missing<small>P 型矽：少了電子的「電洞」</small>'), () => V(-1.3, -0.95, 1.55)],
    fingers: [lab.add('bt-lb bt-lb-x', 'Metal fingers<small>指狀電極</small>'), () => V(-2.25, TOP + 0.25, -1.2)],
    back: [lab.add('bt-lb bt-lb-x', 'Back contact<small>背面電極</small>'), () => V(-1.8, BOT - 0.35, 1.5)],
    bulb: [lab.add('bt-lb bt-lb-b', 'Bulb<small>燈泡</small>'), () => V(BULB.x + 0.5, BULB.y + 0.95, 1.4)],
  };
  const elLb = lab.add('bt-lb bt-lb-el', 'Freed electron<small>被敲出的電子</small>');
  const hoLb = lab.add('bt-lb sl-lb-h', 'Hole<small>電洞</small>');
  const phLb = lab.add('bt-lb bt-lb-li', 'Photon<small>光子</small>');
  // 窄螢幕用短標籤
  const SHORT = { n: 'N-type<small>N 型矽</small>', p: 'P-type<small>P 型矽</small>', junction: 'Junction<small>接面</small>' };
  const LONG = Object.fromEntries(Object.keys(SHORT).map((k) => [k, LB[k][0].innerHTML]));
  let narrow = false, labelMode = '';
  function updateLabels() {
    const mode = narrow ? 'short' : 'long';
    if (mode !== labelMode) { labelMode = mode; for (const k of Object.keys(SHORT)) LB[k][0].innerHTML = narrow ? SHORT[k] : LONG[k]; }
    const on = state.labels;
    for (const [k, [el, f]] of Object.entries(LB)) {
      let show = on || state.focus === k;
      if (k === 'sun') show = show && state.weather !== 'night';
      if (narrow && (k === 'fingers' || k === 'back')) show = show && state.focus === k;
      el.hidden = !show;
      el.classList.toggle('bt-sel', state.focus === k && state.focusT > 0);
      if (show) lab.place(el, f());
    }
    const e = on && !narrow ? EL[0] : null;
    elLb.hidden = !e; if (e) { e.path.getPointAt(ease(e.t), tmp); lab.place(elLb, tmp, -22); }
    const h = on && !narrow ? HO.find((x) => !x.waiting) : null;
    hoLb.hidden = !h; if (h) { tmp.copy(h.from).lerp(h.to, ease(h.t)); lab.place(hoLb, tmp, 22); }
    const p = on ? PH.find((x) => x.phase === 'in' && x.t > 0.3 && x.t < 0.8) : null;
    phLb.hidden = !p; if (p) { lab.place(phLb, p.start.clone().lerp(p.hit, p.t), -20); }
  }

  // ---------------- 讀數 ----------------
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  let lastR = 0;
  function readout(force) {
    const now = performance.now();
    if (!force && now - lastR < 150) return;
    lastR = now;
    R.ph.textContent = String(state.photons);
    R.el.textContent = String(state.electrons);
    const E = state.E, tot = E.elec + E.heat + E.thru + E.refl;
    for (const k of ['elec', 'heat', 'thru', 'refl']) {
      const pct = tot ? E[k] / tot * 100 : 0;
      R.bar[k].style.flexGrow = String(pct);
      R.pct[k].textContent = tot ? `${Math.round(pct)}%` : '—';
    }
    const key = state.weather === 'night' ? 'night' : state.weather === 'cloudy' && state.light === 'sun' ? 'cloudy' : state.light;
    const html = `${esc(MSG[key][0])}<span class="zh">${esc(MSG[key][1])}</span>`;
    if (html !== state.lastMsg) { R.msg.innerHTML = html; state.lastMsg = html; }
    root.querySelectorAll('[data-light]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-light') === state.light ? 'true' : 'false'));
    root.querySelectorAll('[data-weather]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-weather') === state.weather ? 'true' : 'false'));
  }
  function resetCounts() { state.gen = (state.gen || 0) + 1; state.photons = 0; state.electrons = 0; state.E = { elec: 0, heat: 0, thru: 0, refl: 0 }; }

  // ---------------- 操作 ----------------
  function setLight(k) { if (!LIGHTS[k] && k !== 'sun') return; state.light = k; resetCounts(); readout(true); }
  function setWeather(w) {
    if (!(w in RATE)) return;
    state.weather = w;
    sun.visible = w !== 'night';
    cloud.visible = w === 'cloudy';
    sunLight.intensity = w === 'sunny' ? 1.8 : w === 'cloudy' ? 0.9 : 0.15;
    scene.background.copy(w === 'night' ? SKY.night : SKY.day);
    readout(true);
  }
  root.querySelectorAll('[data-light]').forEach((b) => b.addEventListener('click', () => { setLight(b.getAttribute('data-light')); if (state.weather === 'night') setWeather('sunny'); if (!state.playing) setPlaying(true); }));
  root.querySelectorAll('[data-weather]').forEach((b) => b.addEventListener('click', () => { setWeather(b.getAttribute('data-weather')); if (!state.playing) setPlaying(true); }));
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  root.querySelectorAll('.al-speed button').forEach((b) => b.addEventListener('click', () => {
    state.speed = parseFloat(b.getAttribute('data-speed'));
    root.querySelectorAll('.al-speed button').forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
    if (!state.playing) setPlaying(true);
  }));
  $('.sl-reset').addEventListener('click', () => { resetCounts(); readout(true); });
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="field"]', (v) => { state.field = v; fieldG.visible = v; jPlane.visible = v; });
  bind('[data-t="holes"]', (v) => { state.holes = v; });
  $('.al-home').addEventListener('click', () => flyTo(homePos(), TARGET));

  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0; }
  const FOCUS = { n: V(-1, 0.45, 0.6), p: V(-1, -0.5, 0.6), junction: V(0, JUNC, 0.6), fingers: V(-1.5, TOP, 0), back: V(-1, BOT, 0.6) };
  function focusPart(k) {
    if (!FOCUS[k]) return;
    state.focus = k; state.focusT = 3.5;
    const far = camera.aspect < 0.9 ? 1.3 : 1;
    flyTo(FOCUS[k].clone().add(V(1.4, 1.6, 5.6).multiplyScalar(far)), FOCUS[k]);
  }
  function applyFocus(dt) {
    if (state.focusT > 0) state.focusT -= dt;
    const map = { n: parts.n, p: parts.p, junction: parts.junction, fingers: parts.fingers, back: parts.back };
    for (const [k, mats] of Object.entries(map)) {
      const on = state.focus === k && state.focusT > 0;
      for (const m of mats) { m.emissive.setHex(on ? 0xffc857 : (k === 'junction' ? 0xffd36e : 0x000000)); m.emissiveIntensity = on ? 0.35 + 0.3 * Math.sin(state.focusT * 8) : (k === 'junction' ? 0.15 : 0); }
    }
    if (state.focusT <= 0) state.focus = null;
  }

  // ---------------- 迴圈 ----------------
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
    applyFocus(dt);
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 0.9);
      const k = MathUtils.smootherstep(fly.t, 0, 1);
      camera.position.lerpVectors(fly.p0, fly.p1, k);
      controls.target.lerpVectors(fly.t0, fly.t1, k);
    }
    controls.update();
    updateLabels();
    readout();
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = camera.aspect < 0.9 ? 44 : 34;
    camera.updateProjectionMatrix();
    narrow = w < 560;
    root.classList.toggle('bt-narrow', narrow);
  }
  new ResizeObserver(resize).observe(spaceWrap);
  resize();
  camera.position.copy(homePos());
  let visible = false, raf = 0, last = 0;
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  setWeather('sunny');
  setLight('sun');
  for (let i = 0; i < 120; i++) step(0.025);   // 一打開就已經在流動
  resetCounts();
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  // 除錯：document.querySelector('[data-solarcell-lab]').__lab
  root.__lab = {
    camera, controls, state, setLight, setWeather, focus: focusPart,
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { controls.update(); updateLabels(); readout(true); renderer.render(scene, camera); },
  };
  return { ready: () => true, light: (k) => { setWeather('sunny'); setLight(k); }, focus: focusPart };
}

lazyBoot('[data-solarcell-lab]', initLab, {
  light: (lab, v) => lab.light(v),
  part: (lab, v) => lab.focus(v),
});
