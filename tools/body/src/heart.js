/*
 * 人體探索 · 第三課「血液在身體裡怎麼流動？」的 3D 心臟與兩個循環（全部是示意模型，自己畫的）。
 *
 * 畫法：像面對一個人那樣看——他的右邊在畫面左邊。所以右心（送血到肺）在左、左心（送血到全身）在右。
 *   心臟：四個腔室（心房在上、心室在下），外面一層半透明心壁；四個瓣膜照心跳週期開關。
 *   肺循環：右心室 → 肺動脈 → 左右兩片肺（微血管）→ 肺靜脈 → 左心房
 *   體循環：左心室 → 主動脈 → 上半身（頭與手臂）或下半身（身體與腿）的微血管 → 腔靜脈 → 右心房
 *
 * 血球：每一顆沿著「右心房→右心室→肺→左心房→左心室→全身→右心房」這條環狀路線走，
 *   在肺的微血管裡由暗紅變鮮紅（拿到氧氣），在全身的微血管裡變回暗紅（交出氧氣）。
 *   血管裡的血在心室收縮時衝一下（脈搏），心臟裡的血在心室放鬆時流進心室。
 *   每一段在一次心跳裡前進的量相同，所以血球只會一陣一陣地走，不會越積越多。
 *   ※ 真正的靜脈血是暗紅色，不是藍色；這裡用暗紅紫色，跟課文的迷思段一致。
 *
 * 心跳週期（p = 0–1）：0–0.12 心房收縮；0.12–0.45 心室收縮（房室瓣關＝「噗」，動脈瓣開）；
 *   0.45–1 心室放鬆（動脈瓣關＝「通」，房室瓣開，血流進心室）。
 *
 * 親身測量：按「量我的脈搏」，15 秒內每摸到一下就按一次，×4 就是每分鐘心跳，心臟改用這個速度跳。
 *
 * 產物：cd tools/body && npm run build → assets/js/heart.js
 */
import {
  AdditiveBlending, AmbientLight, BufferGeometry, CanvasTexture, CatmullRomCurve3, Color, DirectionalLight,
  DoubleSide, Group, HemisphereLight, InstancedMesh, Line, LineBasicMaterial, MathUtils, Mesh,
  MeshStandardMaterial, Object3D, PerspectiveCamera, Scene, SphereGeometry, Sprite, SpriteMaterial,
  TorusGeometry, CircleGeometry, TubeGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';

const POOR = new Color(0x7a2a66);          // 缺氧的血：暗紅紫（不是藍色）
const RICH = new Color(0xff3434);          // 充氧的血：鮮紅
const STROKE_L = 0.07;                      // 成人安靜時每跳約 70 毫升
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const V = (x, y, z) => new Vector3(x, y, z);

// ---------------- 形狀 ----------------
const CH = {   // 腔室中心與大小（x 正＝畫面右＝病人的左邊）
  ra: { c: V(-0.62, 0.5, 0.05), s: V(0.42, 0.4, 0.4), side: 'r', en: 'Right atrium', zh: '右心房' },
  rv: { c: V(-0.34, -0.42, 0.22), s: V(0.5, 0.62, 0.42), side: 'r', en: 'Right ventricle', zh: '右心室' },
  la: { c: V(0.56, 0.56, -0.2), s: V(0.4, 0.36, 0.38), side: 'l', en: 'Left atrium', zh: '左心房' },
  lv: { c: V(0.36, -0.48, 0.0), s: V(0.52, 0.72, 0.5), side: 'l', en: 'Left ventricle', zh: '左心室' },
};
// 微血管：來回彎曲的小管子
function capillary(center, w, h, turns, vertical = true) {
  const pts = [];
  for (let i = 0; i <= turns * 8; i++) {
    const t = i / (turns * 8);
    const a = t * turns * Math.PI * 2;
    if (vertical) pts.push(V(center.x + Math.sin(a) * w * 0.5, center.y + h * 0.5 - t * h, center.z + Math.cos(a) * w * 0.25));
    else pts.push(V(center.x - w * 0.5 + t * w, center.y + Math.sin(a) * h * 0.5, center.z + Math.cos(a) * h * 0.25));
  }
  return pts;
}
const LUNG_R = V(-2.35, 0.55, -0.1), LUNG_L = V(2.35, 0.55, -0.1);
const HEAD = V(0, 2.75, -0.1), LOWER = V(0, -2.75, -0.1);
function routes() {
  const lungR = capillary(LUNG_R, 0.9, 1.5, 3), lungL = capillary(LUNG_L, 0.9, 1.5, 3);
  const head = capillary(HEAD, 1.3, 0.5, 3, false), lower = capillary(LOWER, 1.6, 0.6, 3, false).reverse();
  const trunk = V(-0.02, 1.15, 0.38);
  return {
    inR: [CH.ra.c, V(-0.55, 0.05, 0.18), CH.rv.c],                           // 右心房→右心室（三尖瓣）
    inL: [CH.la.c, V(0.5, 0.05, -0.08), CH.lv.c],                            // 左心房→左心室（二尖瓣）
    pulm: [
      { key: 'lungR', out: [CH.rv.c, V(-0.18, 0.25, 0.42), trunk, V(-0.8, 1.35, 0.25), V(-1.7, 1.45, 0.05), lungR[0]],
        cap: lungR, back: [lungR[lungR.length - 1], V(-1.6, -0.1, -0.35), V(-0.6, 0.3, -0.62), V(0.2, 0.5, -0.55), CH.la.c] },
      { key: 'lungL', out: [CH.rv.c, V(-0.18, 0.25, 0.42), trunk, V(0.8, 1.35, 0.25), V(1.7, 1.45, 0.05), lungL[0]],
        cap: lungL, back: [lungL[lungL.length - 1], V(1.7, -0.1, -0.35), V(1.1, 0.35, -0.45), CH.la.c] },
    ],
    sys: [
      { key: 'head', out: [CH.lv.c, V(0.18, 0.2, 0.12), V(0.12, 1.3, 0.02), V(-0.05, 1.75, -0.12), V(0.35, 2.3, -0.1), head[0]],
        cap: head, back: [head[head.length - 1], V(-0.9, 2.3, 0.05), V(-0.72, 1.5, 0.1), V(-0.66, 0.95, 0.08), CH.ra.c] },
      { key: 'lower', out: [CH.lv.c, V(0.18, 0.2, 0.12), V(0.12, 1.3, 0.02), V(-0.05, 1.75, -0.12), V(-0.35, 1.3, -0.5), V(-0.15, -0.9, -0.6), V(0.4, -2.0, -0.3), lower[0]],
        cap: lower, back: [lower[lower.length - 1], V(-0.7, -1.9, 0.12), V(-0.78, -0.6, 0.12), V(-0.7, 0.1, 0.08), CH.ra.c] },
    ],
  };
}

// 一條完整路線切成幾段；w 是這段在「一圈」裡占的時間份量，flow 決定它在心跳的哪個時候動
function buildCircuit(R, pi, si) {
  const P = R.pulm[pi], S = R.sys[si];
  const c = (pts) => new CatmullRomCurve3(pts, false, 'centripetal');
  return [
    { curve: c(R.inR), w: 1, flow: 'dia', stop: 0, o2: 'poor' },
    { curve: c(P.out), w: 1.4, flow: 'sys', stop: 1, o2: 'poor' },
    { curve: c(P.cap), w: 1.6, flow: 'sys', stop: 3, o2: 'lung' },
    { curve: c(P.back), w: 1.2, flow: 'sys', stop: 4, o2: 'rich' },
    { curve: c(R.inL), w: 1, flow: 'dia', stop: 4, o2: 'rich' },
    { curve: c(S.out), w: 1.6, flow: 'sys', stop: 5, o2: 'rich' },
    { curve: c(S.cap), w: 1.8, flow: 'sys', stop: 7, o2: 'body' },
    { curve: c(S.back), w: 1.8, flow: 'sys', stop: 8, o2: 'poor' },
  ];
}

// 心跳週期裡的流速形狀（積分都是 1，所以每一段每跳前進的量一樣）
const SYS0 = 0.12, SYS1 = 0.45;
function bump(p, a, b) { return p > a && p < b ? Math.sin(Math.PI * (p - a) / (b - a)) : 0; }
function makeProfile(fn) {
  let sum = 0; const N = 400;
  for (let i = 0; i < N; i++) sum += fn((i + 0.5) / N) / N;
  return (p) => fn(p) / sum;
}
const FLOW = {
  sys: makeProfile((p) => 0.18 + bump(p, SYS0, SYS1 + 0.05) * 1.6),
  dia: makeProfile((p) => 0.18 + bump(p, SYS1, 1) * 1.1 + bump(p, 0, SYS0) * 1.4),
};

function glowTex() {
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const g = c.getContext('2d');
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.3, 'rgba(255,230,160,.7)'); gr.addColorStop(1, 'rgba(255,200,80,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  return new CanvasTexture(c);
}

function initLab(root) {
  const $ = (sel) => root.querySelector(sel);
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
  scene.background = new Color(0x0a1224);
  const camera = new PerspectiveCamera(32, 1, 0.1, 100);
  const TARGET = V(0, 0.1, 0);
  const homePos = () => V(1.6, 0.9, 12.6).multiplyScalar(camera.aspect < 0.9 ? 1.35 : 1);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 3; controls.maxDistance = 26;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xdfe8ff, 0x2a1a20, 1.0));
  scene.add(new AmbientLight(0xffffff, 0.2));
  const key = new DirectionalLight(0xfff3e0, 2.0); key.position.set(3, 4, 6); scene.add(key);
  const rim = new DirectionalLight(0x9fc4ff, 0.9); rim.position.set(-4, 2, -4); scene.add(rim);

  const R = {
    bpm: $('.hr-bpm'), src: $('.hr-src'), day: $('.hr-day'), lmin: $('.hr-lmin'), lday: $('.hr-lday'), tubs: $('.hr-tubs'),
    stops: [...root.querySelectorAll('.hr-stops li')], play: $('.al-play'),
    measure: $('.hr-measure'), tap: $('.hr-tap'), tapN: $('.hr-tap-n'), tapS: $('.hr-tap-s'), tapBox: $('.hr-tapbox'), tapMsg: $('.hr-tap-msg'),
  };
  const lab = labeler($('.al-labels'), cv, camera);
  const state = {
    bpm: 72, phase: 0, playing: true, speed: 1, labels: true, follow: true, wall: true, sound: false,
    src: 'rest', measuring: null, focus: null, focusT: 0,
  };

  // ---------------- 心臟 ----------------
  const heart = new Group();
  scene.add(heart);
  const chambers = {};
  for (const [k, ch] of Object.entries(CH)) {
    const mat = new MeshStandardMaterial({ color: ch.side === 'r' ? POOR : RICH, roughness: 0.45, transparent: true, opacity: 0.9, emissive: 0x000000 });
    const m = new Mesh(new SphereGeometry(1, 40, 28), mat);
    m.position.copy(ch.c); m.scale.copy(ch.s);
    heart.add(m);
    chambers[k] = m;
  }
  // 心壁：半透明的外殼，心尖朝左下（病人的左）
  const wall = new Mesh(new SphereGeometry(1, 48, 32), new MeshStandardMaterial({ color: 0xd9776f, transparent: true, opacity: 0.16, roughness: 0.6, depthWrite: false, side: DoubleSide }));
  wall.position.set(0.02, -0.05, 0.02); wall.scale.set(1.3, 1.35, 0.95); wall.rotation.z = 0.35;
  wall.renderOrder = 3;
  heart.add(wall);
  // 中隔：左右兩個幫浦中間的牆
  const septum = new Mesh(new SphereGeometry(1, 24, 16), new MeshStandardMaterial({ color: 0xc86a62, roughness: 0.7 }));
  septum.position.set(0.02, -0.1, 0.05); septum.scale.set(0.05, 1.05, 0.45);
  heart.add(septum);

  // 瓣膜：環＋一片「門」，關的時候門片出現
  const valves = {};
  const mkValve = (pos, normal, color) => {
    const g = new Group();
    g.add(new Mesh(new TorusGeometry(0.13, 0.025, 10, 28), new MeshStandardMaterial({ color: 0xf6e7c8, roughness: 0.4 })));
    const leaf = new Mesh(new CircleGeometry(0.12, 24), new MeshStandardMaterial({ color, side: DoubleSide, transparent: true, opacity: 0.85 }));
    g.add(leaf);
    g.position.copy(pos);
    g.lookAt(pos.clone().add(normal));
    g.userData.leaf = leaf;
    heart.add(g);
    return g;
  };
  valves.tri = mkValve(V(-0.55, 0.05, 0.18), V(0.2, 1, 0), 0xf6e7c8);
  valves.mit = mkValve(V(0.5, 0.05, -0.08), V(-0.2, 1, 0), 0xf6e7c8);
  valves.pul = mkValve(V(-0.12, 0.62, 0.44), V(0.1, 1, 0.2), 0xf6e7c8);
  valves.aor = mkValve(V(0.16, 0.55, 0.1), V(0, 1, 0), 0xf6e7c8);

  // ---------------- 血管、肺、微血管 ----------------
  const RT = routes();
  const vessels = new Group();
  scene.add(vessels);
  const tube = (pts, col, r = 0.07, op = 0.28) => {
    const m = new Mesh(new TubeGeometry(new CatmullRomCurve3(pts, false, 'centripetal'), 96, r, 12, false),
      new MeshStandardMaterial({ color: col, transparent: true, opacity: op, roughness: 0.5, depthWrite: false }));
    m.renderOrder = 2;
    vessels.add(m);
    return m;
  };
  for (const P of RT.pulm) { tube(P.out, POOR, 0.08); tube(P.cap, 0xc05a78, 0.035, 0.35); tube(P.back, RICH, 0.075); }
  for (const S of RT.sys) { tube(S.out, RICH, 0.09); tube(S.cap, 0xc05a78, 0.035, 0.35); tube(S.back, POOR, 0.085); }
  const blob = (pos, sc, col, op = 0.14) => {
    const m = new Mesh(new SphereGeometry(1, 36, 24), new MeshStandardMaterial({ color: col, transparent: true, opacity: op, roughness: 0.8, depthWrite: false }));
    m.position.copy(pos); m.scale.copy(sc); m.renderOrder = 1;
    scene.add(m);
    return m;
  };
  const lungs = [blob(LUNG_R, V(0.72, 1.15, 0.55), 0xf2a7b8, 0.18), blob(LUNG_L, V(0.72, 1.15, 0.55), 0xf2a7b8, 0.18)];
  blob(HEAD, V(1.05, 0.55, 0.45), 0x9fc4ff, 0.1);
  blob(LOWER, V(1.25, 0.6, 0.45), 0x9fc4ff, 0.1);

  // ---------------- 血球 ----------------
  const CIRCUITS = [];
  for (let pi = 0; pi < 2; pi++) for (let si = 0; si < 2; si++) CIRCUITS.push(buildCircuit(RT, pi, si));
  const N = 280;
  const cells = new InstancedMesh(new SphereGeometry(0.045, 10, 8), new MeshStandardMaterial({ roughness: 0.35 }), N);
  scene.add(cells);
  const DROPS = [];
  const totalW = CIRCUITS[0].reduce((a, s) => a + s.w, 0);
  for (let i = 0; i < N; i++) {
    // 大約 3/4 的血走下半身，1/4 走上半身；左右肺各半
    const si = (i % 4 === 0) ? 0 : 1, pi = i % 2;
    DROPS.push({ circ: CIRCUITS[pi * 2 + si], seg: 0, u: 0, pos: i / N * totalW });
  }
  // 依照起始的「路程」放到對應的段落
  for (const d of DROPS) {
    let s = d.pos;
    for (let k = 0; k < d.circ.length; k++) {
      if (s < d.circ[k].w || k === d.circ.length - 1) { d.seg = k; d.u = Math.min(0.999, s / d.circ[k].w); break; }
      s -= d.circ[k].w;
    }
  }
  const tracked = DROPS[Math.floor(N * 0.37)];
  tracked.circ = CIRCUITS[1];      // 右肺＋下半身，路線最長最好看
  const glow = new Sprite(new SpriteMaterial({ map: glowTex(), blending: AdditiveBlending, depthWrite: false, transparent: true }));
  glow.scale.set(0.5, 0.5, 1);
  scene.add(glow);
  const TRAIL = 60;
  const trailPts = Array.from({ length: TRAIL }, () => V(0, 0, 0));
  const trail = new Line(new BufferGeometry().setFromPoints(trailPts), new LineBasicMaterial({ color: 0xffd36e, transparent: true, opacity: 0.8 }));
  scene.add(trail);

  const dummy = new Object3D();
  const col = new Color();
  function dropColor(seg, u) {
    const o2 = seg.o2;
    if (o2 === 'lung') return col.copy(POOR).lerp(RICH, MathUtils.smoothstep(u, 0.25, 0.75));
    if (o2 === 'body') return col.copy(RICH).lerp(POOR, MathUtils.smoothstep(u, 0.25, 0.75));
    if (o2 === 'rich') return col.copy(RICH);
    return col.copy(POOR);
  }
  const tmp = V(0, 0, 0);
  function placeDrops() {
    for (let i = 0; i < N; i++) {
      const d = DROPS[i];
      const seg = d.circ[d.seg];
      seg.curve.getPointAt(Math.min(1, d.u), tmp);
      dummy.position.copy(tmp);
      const s = d === tracked ? 1.9 : 1;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      cells.setMatrixAt(i, dummy.matrix);
      cells.setColorAt(i, dropColor(seg, d.u));
    }
    cells.instanceMatrix.needsUpdate = true;
    if (cells.instanceColor) cells.instanceColor.needsUpdate = true;
    const tseg = tracked.circ[tracked.seg];
    tseg.curve.getPointAt(Math.min(1, tracked.u), glow.position);
  }
  function advance(dt) {
    const beatsPerSec = state.bpm / 60 * state.speed;
    const perBeat = totalW / 8;     // 一滴血大約 8 下心跳走完一圈（真實約一分鐘；這裡加快）
    for (const d of DROPS) {
      let seg = d.circ[d.seg];
      d.u += FLOW[seg.flow](state.phase) * beatsPerSec * perBeat * dt / seg.w;
      while (d.u >= 1) {
        d.u -= 1;
        d.seg = (d.seg + 1) % d.circ.length;
        if (d.seg === 0 && d !== tracked) {
          // 回到右心房時重新選路線，上下半身、左右肺的比例維持
          const si = Math.random() < 0.25 ? 0 : 1, pi = Math.random() < 0.5 ? 0 : 1;
          d.circ = CIRCUITS[pi * 2 + si];
        }
        seg = d.circ[d.seg];
      }
    }
  }

  // ---------------- 心跳 ----------------
  function beatShape(p) {
    const atria = 1 - 0.14 * bump(p, 0, SYS0 + 0.02);
    const vent = 1 - 0.2 * MathUtils.smoothstep(p, SYS0, SYS0 + 0.1) * (1 - MathUtils.smoothstep(p, SYS1 - 0.05, SYS1 + 0.12));
    return { atria, vent };
  }
  function applyBeat() {
    const { atria, vent } = beatShape(state.phase);
    for (const k of ['ra', 'la']) chambers[k].scale.copy(CH[k].s).multiplyScalar(atria);
    for (const k of ['rv', 'lv']) chambers[k].scale.copy(CH[k].s).multiplyScalar(vent);
    wall.scale.set(1.3, 1.35, 0.95).multiplyScalar(0.94 + 0.06 * vent);
    const sys = state.phase > SYS0 && state.phase < SYS1;
    valves.tri.userData.leaf.visible = sys;         // 心室收縮時房室瓣關上
    valves.mit.userData.leaf.visible = sys;
    valves.pul.userData.leaf.visible = !sys;        // 其餘時間動脈瓣關上
    valves.aor.userData.leaf.visible = !sys;
    // 被點名的腔室閃一下
    for (const [k, m] of Object.entries(chambers)) {
      const on = state.focus === k && state.focusT > 0;
      m.material.emissive.setHex(on ? 0xffc857 : 0x000000);
      m.material.emissiveIntensity = on ? 0.35 + 0.35 * Math.sin(state.focusT * 9) : 0;
    }
  }

  // 心跳聲（預設關閉；打開時才建立 AudioContext）
  let actx = null;
  function thump(freq, dur, gain) {
    if (!actx) return;
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(freq, actx.currentTime);
    o.frequency.exponentialRampToValueAtTime(freq * 0.6, actx.currentTime + dur);
    g.gain.setValueAtTime(0.0001, actx.currentTime);
    g.gain.exponentialRampToValueAtTime(gain, actx.currentTime + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + dur);
    o.connect(g).connect(actx.destination);
    o.start(); o.stop(actx.currentTime + dur + 0.02);
  }

  // ---------------- 標籤 ----------------
  const LB = {};
  for (const [k, ch] of Object.entries(CH)) LB[k] = lab.add(`hr-lb hr-lb-${ch.side}`, `${ch.en} · ${ch.zh}`);
  const extra = [
    ['lungR', 'Lung · 肺', V(-2.35, 1.95, 0)], ['lungL', 'Lung · 肺', V(2.35, 1.95, 0)],
    ['head', 'Head and arms · 頭與手臂', V(0, 3.35, 0)], ['lower', 'Body and legs · 身體與腿', V(0, -3.4, 0)],
    ['aorta', 'Aorta · 主動脈', V(0.55, 1.8, 0)], ['pa', 'Pulmonary artery · 肺動脈', V(-1.05, 1.7, 0.25)],
    ['vc', 'Vena cava · 腔靜脈', V(-1.3, -1.2, 0.2)], ['pv', 'Pulmonary veins · 肺靜脈', V(1.45, -0.25, -0.2)],
    ['valve', 'Valves · 瓣膜', V(-0.2, 0.05, 0.55)],
  ];
  const XL = extra.map(([k, html, at]) => ({ k, el: lab.add(`hr-lb hr-lb-x hr-lb-${k}`, html), at }));
  const sideR = lab.add('hr-side hr-side-r', 'Right side → lungs<small>右心：送到肺</small>');
  const sideL = lab.add('hr-side hr-side-l', 'Left side → body<small>左心：送到全身</small>');
  const OFF = { ra: V(-0.72, 0.28, 0.2), rv: V(-0.78, -0.35, 0.3), la: V(0.72, 0.3, 0), lv: V(0.8, -0.42, 0.2) };
  function updateLabels() {
    const on = state.labels;
    for (const [k, el] of Object.entries(LB)) { el.hidden = !on && state.focus !== k; if (!el.hidden) lab.place(el, CH[k].c.clone().add(OFF[k])); }
    for (const x of XL) { x.el.hidden = !on; if (on) lab.place(x.el, x.at); }
    sideR.hidden = sideL.hidden = !on;
    if (on) { lab.place(sideR, V(-1.05, -1.35, 0.4)); lab.place(sideL, V(1.1, -1.45, 0.3)); }
  }

  // ---------------- 讀數 ----------------
  const SRC = {
    rest: ['Adult at rest', '成人安靜時'], sleep: ['Asleep', '睡覺時'], child: ['Child at rest', '孩子安靜時'],
    run: ['Running', '跑步時'], you: ['Your pulse', '你的脈搏'],
  };
  const fmt = (n) => Math.round(n).toLocaleString('en-US');
  function readout() {
    R.bpm.textContent = String(Math.round(state.bpm));
    const s = SRC[state.src];
    R.src.innerHTML = `${esc(s[0])}<small>${esc(s[1])}</small>`;
    // 運動時每跳的量也會變多；這裡只用安靜時的 70 毫升，所以跑步的數字偏保守
    const lmin = state.bpm * STROKE_L;
    R.day.textContent = fmt(state.bpm * 1440);
    R.lmin.textContent = lmin.toFixed(1);
    R.lday.textContent = fmt(lmin * 1440);
    R.tubs.textContent = fmt(lmin * 1440 / 150);
    root.querySelectorAll('[data-rate]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-rate') === state.src ? 'true' : 'false'));
  }
  let lastStop = -1;
  function stopsReadout() {
    const seg = tracked.circ[tracked.seg];
    let stop = seg.stop;
    if (tracked.seg === 1 && tracked.u < 0.12) stop = 1;          // 剛離開右心室
    else if (tracked.seg === 1) stop = 2;
    if (tracked.seg === 4) stop = tracked.u < 0.5 ? 4 : 5;
    if (tracked.seg === 5) stop = tracked.u < 0.1 ? 5 : 6;
    if (tracked.seg === 0) stop = tracked.u < 0.5 ? 0 : 1;
    if (stop !== lastStop) {
      lastStop = stop;
      R.stops.forEach((li, i) => li.classList.toggle('on', i === stop));
    }
  }

  // ---------------- 操作 ----------------
  const RATES = { sleep: 55, rest: 72, child: 90, run: 150 };
  root.querySelectorAll('[data-rate]').forEach((b) => b.addEventListener('click', () => {
    state.src = b.getAttribute('data-rate');
    state.bpm = RATES[state.src];
    readout();
  }));
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
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="follow"]', (v) => { state.follow = v; glow.visible = trail.visible = v; root.classList.toggle('hr-nofollow', !v); });
  bind('[data-t="wall"]', (v) => { wall.visible = v; });
  bind('[data-t="sound"]', (v) => {
    state.sound = v;
    if (v && !actx) { try { actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { actx = null; } }
    if (actx && actx.state === 'suspended') actx.resume();
  });
  $('.al-home').addEventListener('click', () => flyTo(homePos(), TARGET));

  // 量脈搏：15 秒內每摸到一下就按一次
  const MEASURE_S = 15;
  function startMeasure() {
    state.measuring = { t0: performance.now(), n: 0 };
    R.tapBox.classList.add('on');
    R.measure.hidden = true;
    R.tapN.textContent = '0';
    R.tapS.textContent = String(MEASURE_S);
    R.tapMsg.innerHTML = 'Tap the big button (or press the space bar) every time you feel a beat.<span class="zh">每摸到一下脈搏，就按一次大按鈕（或空白鍵）。</span>';
    R.tap.focus({ preventScroll: true });
  }
  function tapOnce() {
    if (!state.measuring) return;
    state.measuring.n += 1;
    R.tapN.textContent = String(state.measuring.n);
    R.tap.classList.remove('hit'); void R.tap.offsetWidth; R.tap.classList.add('hit');
  }
  function endMeasure() {
    const n = state.measuring.n;
    state.measuring = null;
    R.tapBox.classList.remove('on');
    R.measure.hidden = false;
    R.measure.querySelector('span').innerHTML = 'Measure again<small>再量一次</small>';
    if (n < 5) {
      R.tapMsg.innerHTML = 'Only a few taps. Find your pulse first, then try again.<span class="zh">按的次數太少，先找到脈搏再試一次。</span>';
      return;
    }
    const bpm = MathUtils.clamp(n * 4, 40, 220);
    state.bpm = bpm; state.src = 'you';
    readout();
    R.tapMsg.innerHTML = `${n} beats in 15 seconds × 4 = <b>${bpm}</b> beats a minute. The heart in the model now beats with yours.`
      + `<span class="zh">15 秒 ${n} 下 × 4 ＝ 每分鐘 <b>${bpm}</b> 下。模型裡的心臟現在跟著你的心跳跳動。</span>`;
  }
  R.measure.addEventListener('click', startMeasure);
  R.tap.addEventListener('pointerdown', (e) => { e.preventDefault(); tapOnce(); });
  R.tap.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); tapOnce(); } });

  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0; }
  function focusChamber(k) {
    state.focus = k; state.focusT = 3;
    flyTo(CH[k].c.clone().multiplyScalar(0.5).add(V(0.9, 0.6, 6.2)), CH[k].c.clone().multiplyScalar(0.5));
  }

  // ---------------- 尺寸、迴圈 ----------------
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = camera.aspect < 0.9 ? 40 : 32;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(spaceWrap);
  resize();
  camera.position.copy(homePos());
  if (spaceWrap.clientWidth < 520) {
    state.labels = false;
    const t = $('[data-t="labels"]'); if (t) t.checked = false;
  }

  let visible = false, raf = 0, last = 0;
  function step(dt) {
    if (state.playing) {
      const prev = state.phase;
      state.phase = (state.phase + dt * state.bpm / 60 * state.speed) % 1;
      const crossed = (a) => (prev < a && state.phase >= a) || (state.phase < prev && (prev < a || state.phase >= a));
      if (state.sound && state.speed >= 1) {
        if (crossed(SYS0)) thump(62, 0.16, 0.9);           // 噗：房室瓣關上
        if (crossed(SYS1)) thump(90, 0.1, 0.55);           // 通：動脈瓣關上
      }
      advance(dt);
    }
    if (state.focusT > 0) state.focusT -= dt;
    if (state.measuring) {
      const left = MEASURE_S - (performance.now() - state.measuring.t0) / 1000;
      R.tapS.textContent = String(Math.max(0, Math.ceil(left)));
      if (left <= 0) endMeasure();
    }
    applyBeat();
    placeDrops();
    if (state.follow) {
      trailPts.pop(); trailPts.unshift(glow.position.clone());
      trail.geometry.setFromPoints(trailPts);
      stopsReadout();
    }
    lungs.forEach((l, i) => { const b = 1 + 0.03 * Math.sin(performance.now() / 700 + i); l.scale.set(0.72 * b, 1.15 * b, 0.55 * b); });
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 0.9);
      const k = MathUtils.smootherstep(fly.t, 0, 1);
      camera.position.lerpVectors(fly.p0, fly.p1, k);
      controls.target.lerpVectors(fly.t0, fly.t1, k);
    }
  }
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
    controls.update();
    updateLabels();
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);
  // 空白鍵：量脈搏時當作按一下（焦點不在按鈕上也可以）
  document.addEventListener('keydown', (e) => {
    if (state.measuring && e.key === ' ' && document.activeElement !== R.tap) { e.preventDefault(); tapOnce(); }
  });

  // 先把血球放到起始位置、跑一小段，讓一打開就是正在流動的樣子
  for (let i = 0; i < 40; i++) { state.phase = (state.phase + 0.025) % 1; advance(0.025 * 60 / state.bpm); }
  readout();
  applyBeat();
  placeDrops();
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  // 除錯用：$('[data-heart-lab]').__lab；背景分頁 rAF 很慢時用 run(秒)／render() 直接推進與畫
  root.__lab = {
    camera, controls, state, focusChamber,
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { controls.update(); updateLabels(); renderer.render(scene, camera); },
  };
  return { ready: () => true, focus: focusChamber, measure: startMeasure };
}

lazyBoot('[data-heart-lab]', initLab, {
  focus: (lab, v) => lab.focus(v),
  measure: (lab) => lab.measure(),
});
