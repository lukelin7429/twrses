/*
 * 人體探索 · 第六課「午餐吃下去之後去了哪裡？」的 3D 消化道：跟著一口飯走完全程。
 *
 * 真實的：骨架（skeleton.glb，BodyParts3D）淡淡地當身體的位置參考——頭顱、脊椎、肋骨、骨盆。
 * 自繪示意：口 → 食道 → 胃 → 小腸 → 大腸，以及肝、膽囊、胰臟。器官的位置用骨頭定位
 *   （食道在脊椎前面、胃在左上腹肋骨下、肝在右上腹、小腸盤在肚臍周圍、大腸像一個框圍著小腸）。
 *
 * 時間：一口飯各站的真實停留時間（成人、一般情況，每個人差很多）：
 *   嘴 約 1 分鐘 → 食道 約 10 秒 → 胃 2–4 小時 → 小腸 3–5 小時 → 大腸 約一天或更久 → 1–3 天後排出
 *   時間軸用「各站分配固定比例」的非線性刻度，免得嘴和食道在一條 36 小時的軸上擠成一個點。
 * 親身測量：輸入你幾點吃午餐，按「我的午餐現在在哪？」，用現在的時間算出它走到哪一站。
 *
 * 座標（沿用 skeleton.glb）：公尺、Y 朝上、臉朝 +Z、身體右邊在 -X（從正面看在畫面左邊）。
 * 產物：cd tools/body && npm run build → assets/js/digestion.js
 */
import {
  AmbientLight, BufferAttribute, BufferGeometry, CatmullRomCurve3, Color, DirectionalLight, DoubleSide,
  Group, HemisphereLight, MathUtils, Mesh, MeshStandardMaterial, PerspectiveCamera, Quaternion, Scene,
  SphereGeometry, TorusGeometry, TubeGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot, loadBones } from './common.js';

const V = (x, y, z) => new Vector3(x, y, z);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// 各站：時間範圍（小時）與時間軸上分到的比例
const STAGES = [
  { key: 'mouth', h0: 0, h1: 1 / 60, share: 0.1 },
  { key: 'esophagus', h0: 1 / 60, h1: 1 / 60 + 10 / 3600, share: 0.07 },
  { key: 'stomach', h0: 1 / 60 + 10 / 3600, h1: 3, share: 0.22 },
  { key: 'small', h0: 3, h1: 8, share: 0.28 },
  { key: 'large', h0: 8, h1: 36, share: 0.28 },
  { key: 'out', h0: 36, h1: 48, share: 0.05 },
];
let acc = 0;
for (const s of STAGES) { s.u0 = acc; acc += s.share; s.u1 = acc; }
function uToHours(u) {
  const s = STAGES.find((x) => u <= x.u1) || STAGES[STAGES.length - 1];
  const f = MathUtils.clamp((u - s.u0) / (s.u1 - s.u0), 0, 1);
  return { stage: s, f, h: s.h0 + (s.h1 - s.h0) * f };
}
function hoursToU(h) {
  if (h <= 0) return 0;
  const s = STAGES.find((x) => h <= x.h1) || STAGES[STAGES.length - 1];
  const f = MathUtils.clamp((h - s.h0) / (s.h1 - s.h0), 0, 1);
  return s.u0 + (s.u1 - s.u0) * f;
}

// 粗細會變的管子（胃、大腸的結腸袋）
function variableTube(curve, radiusAt, seg = 160, rad = 20) {
  const geo = new BufferGeometry();
  const n = (seg + 1) * (rad + 1);
  const pos = new Float32Array(n * 3), idx = [];
  const P = V(0, 0, 0), T = V(0, 0, 0), N = V(0, 0, 0), B = V(0, 0, 0), up = V(0, 1, 0), alt = V(1, 0, 0);
  for (let i = 0; i <= seg; i++) {
    const t = i / seg;
    curve.getPointAt(t, P); curve.getTangentAt(t, T);
    N.crossVectors(T, Math.abs(T.y) > 0.9 ? alt : up).normalize();
    B.crossVectors(T, N).normalize();
    const r = radiusAt(t);
    for (let j = 0; j <= rad; j++) {
      const a = j / rad * Math.PI * 2;
      const k = (i * (rad + 1) + j) * 3;
      pos[k] = P.x + (N.x * Math.cos(a) + B.x * Math.sin(a)) * r;
      pos[k + 1] = P.y + (N.y * Math.cos(a) + B.y * Math.sin(a)) * r;
      pos[k + 2] = P.z + (N.z * Math.cos(a) + B.z * Math.sin(a)) * r;
      if (i < seg && j < rad) { const q = i * (rad + 1) + j; idx.push(q, q + rad + 1, q + 1, q + rad + 1, q + rad + 2, q + 1); }
    }
  }
  geo.setAttribute('position', new BufferAttribute(pos, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return geo;
}
const cr = (pts) => new CatmullRomCurve3(pts, false, 'centripetal');

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
  const camera = new PerspectiveCamera(32, 1, 0.02, 50);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 0.25; controls.maxDistance = 5;
  scene.add(new HemisphereLight(0xdfe8ff, 0x2a1a20, 1.05));
  scene.add(new AmbientLight(0xffffff, 0.2));
  const key = new DirectionalLight(0xfff3e0, 2.0); key.position.set(1.5, 3, 3); scene.add(key);
  const rim = new DirectionalLight(0x9fc4ff, 0.9); rim.position.set(-2, 1.5, -2.5); scene.add(rim);

  const STOPS = JSON.parse(root.getAttribute('data-stops') || '[]');
  const R = {
    loading: $('.sk-loading'), bar: $('.sk-bar i'), lunch: $('.dg-lunch'), now: $('.dg-now'),
    elapsed: $('.dg-elapsed'), clock: $('.dg-clock'), en: $('.dg-stop-en'), zh: $('.dg-stop-zh'),
    time: $('.dg-stop-time'), what: $('.dg-what'), slider: $('.dg-time'), play: $('.al-play'),
    stops: [...root.querySelectorAll('.hr-stops li')],
  };
  const lab = labeler($('.al-labels'), cv, camera);
  const state = { ready: false, u: 0, playing: false, labels: true, organs: true, skel: true, live: false };

  let bones = null;
  const A = {};             // 器官與路線
  const curves = {};        // 各站的路線
  let bolus = null, ring = null, stomachMesh = null;

  loadBones(root.getAttribute('data-model'), (p) => { R.bar.style.width = `${Math.round(p * 100)}%`; }).then(({ model, bones: bs }) => {
    bones = bs;
    scene.add(model);
    for (const b of bones.values()) {
      b.mat.opacity = b.info.region === 'skull' ? 0.35 : 0.14;
      b.mat.depthWrite = false;
      b.mesh.renderOrder = 1;
    }
    const C = (id) => bones.get(id).center;
    const vz = (id) => C(id).z;
    // ---------- 定位 ----------
    const mand = bones.get('mandible').box;
    const mouth = V(0, mand.max.y - 0.012, mand.max.z - 0.03);
    const phar = V(0, C('c3').y, vz('c3') + 0.03);
    const esoPts = ['c5', 'c7', 't2', 't4', 't6', 't8', 't10'].map((id, i, arr) => V(0.004 + 0.02 * (i / (arr.length - 1)) ** 2, C(id).y, vz(id) + 0.035));
    const card = V(0.035, C('t11').y, vz('t11') + 0.06);           // 賁門：食道接胃
    const hipBox = bones.get('r-hip').box.clone().union(bones.get('l-hip').box);
    const yTop = C('l1').y - 0.005, yBot = hipBox.max.y - 0.015;
    const xW = (hipBox.max.x - hipBox.min.x) * 0.36;
    const zF = vz('l3') + 0.075;
    A.yTop = yTop; A.yBot = yBot; A.xW = xW; A.zF = zF;

    // ---------- 食道 ----------
    curves.mouth = cr([mouth, mouth.clone().lerp(phar, 0.5).add(V(0, -0.01, 0)), phar]);
    curves.esophagus = cr([phar, ...esoPts, card]);
    const mat = (c, op = 0.85) => new MeshStandardMaterial({ color: c, roughness: 0.55, transparent: op < 1, opacity: op, depthWrite: op >= 0.95 });
    const addTube = (curve, r, c, op, segs = 120) => {
      const m = new Mesh(new TubeGeometry(curve, segs, r, 14, false), mat(c, op));
      m.renderOrder = 3; scene.add(m); return m;
    };
    A.eso = addTube(curves.esophagus, 0.0085, 0xe48b8b, 0.75);

    // ---------- 胃：J 形的袋子，左上腹 ----------
    const sy = card.y, sz = card.z;
    const stomachPath = cr([card, V(0.07, sy + 0.015, sz + 0.005), V(0.095, sy - 0.04, sz + 0.02), V(0.085, sy - 0.1, sz + 0.03),
      V(0.04, sy - 0.135, sz + 0.035), V(-0.005, sy - 0.12, sz + 0.035), V(-0.03, sy - 0.095, sz + 0.03)]);
    const sR = [[0, 0.011], [0.12, 0.036], [0.3, 0.048], [0.55, 0.046], [0.75, 0.034], [0.92, 0.02], [1, 0.011]];
    const stomR = (t) => { for (let i = 1; i < sR.length; i++) if (t <= sR[i][0]) return MathUtils.lerp(sR[i - 1][1], sR[i][1], (t - sR[i - 1][0]) / (sR[i][0] - sR[i - 1][0])); return 0.011; };
    stomachMesh = new Mesh(variableTube(stomachPath, stomR), mat(0xe9a0a6, 0.55));
    stomachMesh.renderOrder = 3;
    stomachMesh.geometry.computeBoundingBox();
    const sCenter = stomachMesh.geometry.boundingBox.getCenter(V(0, 0, 0));
    const sg = new Group(); sg.position.copy(sCenter); scene.add(sg);
    stomachMesh.position.sub(sCenter); sg.add(stomachMesh);
    A.stomachG = sg;
    curves.stomach = cr([card, V(0.06, sy - 0.01, sz + 0.012), V(0.075, sy - 0.06, sz + 0.025), V(0.05, sy - 0.11, sz + 0.03),
      V(0.005, sy - 0.11, sz + 0.035), V(-0.03, sy - 0.095, sz + 0.03)]);
    const pylorus = V(-0.03, sy - 0.095, sz + 0.03);

    // ---------- 小腸：十二指腸的 C 形，再盤成好幾排 ----------
    const duo = [pylorus, V(-0.055, sy - 0.1, sz + 0.02), V(-0.06, yTop - 0.02, zF - 0.035), V(-0.03, yTop - 0.04, zF - 0.04), V(0.02, yTop - 0.03, zF - 0.035)];
    const coil = [];
    const rows = 9;
    for (let r = 0; r < rows; r++) {
      const y = yTop - 0.05 - (yTop - 0.05 - (yBot + 0.035)) * (r / (rows - 1));
      const dir = r % 2 === 0 ? 1 : -1;
      for (let k = 0; k <= 8; k++) {
        const t = k / 8;
        const x = (dir > 0 ? -1 + 2 * t : 1 - 2 * t) * xW * 0.72;
        coil.push(V(x, y + Math.sin(t * Math.PI * 3 + r) * 0.008, zF + Math.sin(t * Math.PI * 2 + r * 1.3) * 0.02));
      }
    }
    const cecum = V(-xW * 0.95, yBot + 0.02, zF - 0.01);
    curves.small = cr([...duo, ...coil, V(-xW * 0.8, yBot + 0.01, zF), cecum]);
    A.small = addTube(curves.small, 0.0085, 0xf0b4a4, 0.82, 900);

    // ---------- 大腸：像一個框圍著小腸，表面一節一節（結腸袋） ----------
    const xL = xW * 0.95;
    curves.large = cr([cecum, V(-xL, (yTop + yBot) / 2, zF - 0.015), V(-xL + 0.01, yTop + 0.01, zF - 0.01),
      V(-xW * 0.3, yTop + 0.02, zF + 0.015), V(xW * 0.3, yTop + 0.015, zF + 0.015), V(xL - 0.005, yTop + 0.03, zF - 0.02),
      V(xL, (yTop + yBot) / 2, zF - 0.025), V(xL - 0.01, yBot + 0.01, zF - 0.02), V(xW * 0.35, yBot - 0.02, zF - 0.015),
      V(0.01, yBot - 0.045, zF - 0.04), V(0, yBot - 0.1, vz('l5') + 0.04)]);
    const largeMesh = new Mesh(variableTube(curves.large, (t) => (t > 0.93 ? 0.017 : 0.02) * (1 + 0.16 * Math.abs(Math.sin(t * 90)))), mat(0xd9a07a, 0.6));
    largeMesh.renderOrder = 2; scene.add(largeMesh);
    A.large = largeMesh;

    // ---------- 肝、膽囊、胰臟 ----------
    const liver = new Mesh(new SphereGeometry(1, 40, 28), mat(0x8b3a2e, 0.72));
    liver.scale.set(0.11, 0.055, 0.075);
    liver.rotation.z = -0.25;
    liver.position.set(-0.055, sy - 0.025, sz + 0.01);
    scene.add(liver);
    const gall = new Mesh(new SphereGeometry(1, 20, 14), mat(0x3f8f4a, 0.9));
    gall.scale.set(0.016, 0.024, 0.016);
    gall.position.set(-0.06, sy - 0.08, sz + 0.035);
    scene.add(gall);
    const panc = new Mesh(new TubeGeometry(cr([V(-0.045, yTop - 0.025, zF - 0.06), V(0.0, yTop - 0.005, zF - 0.065), V(0.06, yTop + 0.015, zF - 0.07), V(0.1, yTop + 0.03, zF - 0.075)]), 40, 0.012, 10, false), mat(0xf0c96a, 0.85));
    scene.add(panc);
    A.organs = [liver, gall, panc];
    A.liver = liver; A.gall = gall; A.panc = panc;

    // ---------- 一口飯 ----------
    bolus = new Mesh(new SphereGeometry(1, 24, 16), new MeshStandardMaterial({ color: 0xf3ead6, roughness: 0.4, emissive: 0x332a10 }));
    bolus.renderOrder = 5;
    scene.add(bolus);
    ring = new Mesh(new TorusGeometry(1, 0.28, 10, 28), new MeshStandardMaterial({ color: 0xc8424a, roughness: 0.5 }));
    ring.renderOrder = 5;
    scene.add(ring);

    // 鏡頭：正面
    A.target = V(0, (mouth.y + yBot) / 2 - 0.03, 0.05);
    A.home = V(0.18, 0.06, 1.32);
    camera.position.copy(homePos());
    controls.target.copy(A.target);
    A.mouth = mouth;

    state.ready = true;
    R.loading.hidden = true;
    root.classList.add('al-ready');
    setU(0);
  }).catch((e) => {
    console.error(e);
    R.loading.innerHTML = 'The model could not be loaded. Please reload the page.<br><span class="zh">模型載入失敗，請重新整理頁面。</span>';
  });
  function homePos() { return A.target.clone().add(A.home.clone().multiplyScalar(camera.aspect < 0.9 ? 1.3 : 1)); }

  // ---------------- 狀態 → 畫面 ----------------
  const COL = { mouth: 0xf3ead6, esophagus: 0xf3ead6, stomach: 0xe8c46a, small: 0xd9b04a, large: 0x8a5a2b, out: 0x8a5a2b };
  const P = V(0, 0, 0), T = V(0, 0, 0), qz = new Quaternion(), Zax = V(0, 0, 1);
  let lastStage = '';
  const fmtH = (h) => (h < 1 / 60 ? `${Math.round(h * 3600)} s` : h < 1 ? `${Math.round(h * 60)} min` : `${h < 10 ? h.toFixed(1) : Math.round(h)} h`);
  function setU(u) {
    state.u = MathUtils.clamp(u, 0, 1);
    const { stage, f, h } = uToHours(state.u);
    const now = performance.now() / 1000;
    let r = 0.011;
    bolus.visible = stage.key !== 'out';
    ring.visible = stage.key === 'esophagus' || stage.key === 'small' || stage.key === 'large';
    if (stage.key !== 'out') {
      const c = curves[stage.key];
      const ff = stage.key === 'stomach' ? (f < 0.85 ? f * 0.75 / 0.85 : 0.75 + (f - 0.85) / 0.15 * 0.25) : f;   // 胃裡大部分時間在攪拌
      c.getPointAt(Math.min(0.999, ff), P);
      c.getTangentAt(Math.min(0.999, ff), T);
      if (stage.key === 'mouth') { r = 0.013; P.y += Math.sin(now * 12) * 0.003; }                 // 咀嚼
      if (stage.key === 'stomach') { r = 0.02 - 0.006 * f; P.x += Math.sin(now * 2.2) * 0.006; P.y += Math.cos(now * 1.7) * 0.004; }
      if (stage.key === 'small') r = 0.0085 - 0.004 * f;                                               // 養分被吸收，越走越小
      if (stage.key === 'large') r = 0.009 + 0.002 * f;
      bolus.position.copy(P);
      bolus.scale.setScalar(r);
      const colA = new Color(COL[stage.key]);
      if (stage.key === 'stomach') colA.copy(new Color(0xf3ead6).lerp(new Color(0xe8c46a), f));
      if (stage.key === 'large') colA.copy(new Color(0xc49a4a).lerp(new Color(0x7a4a22), f));
      bolus.material.color.copy(colA);
      // 蠕動：一圈收縮環在食物後面推
      if (ring.visible) {
        const tube = stage.key === 'large' ? 0.022 : 0.0105;
        const back = Math.max(0, ff - (stage.key === 'large' ? 0.012 : stage.key === 'small' ? 0.004 : 0.06));
        c.getPointAt(back, ring.position);
        c.getTangentAt(back, T);
        ring.quaternion.copy(qz.setFromUnitVectors(Zax, T));
        ring.scale.setScalar(tube);
      }
    }
    // 讀數
    R.slider.value = String(Math.round(state.u * 1000));
    R.slider.style.setProperty('--p', `${state.u * 100}%`);
    R.elapsed.textContent = stage.key === 'out' ? '1–3 days' : fmtH(h);
    const idx = STAGES.indexOf(stage);
    if (stage.key !== lastStage) {
      lastStage = stage.key;
      const s = STOPS[idx] || {};
      R.en.textContent = s.en || ''; R.zh.textContent = s.zh || '';
      R.time.innerHTML = `${esc(s.time_en || '')}<small>${esc(s.time_zh || '')}</small>`;
      R.what.innerHTML = `${esc(s.what_en || '')}<span class="zh">${esc(s.what_zh || '')}</span>`;
      R.stops.forEach((li, i) => li.classList.toggle('on', i === idx));
    }
    if (!state.live) R.clock.textContent = clockAfterLunch(h);
  }
  function lunchMinutes() {
    const [hh, mm] = (R.lunch.value || '12:00').split(':').map(Number);
    return hh * 60 + mm;
  }
  function clockAfterLunch(h) {
    const m = Math.round(lunchMinutes() + h * 60);
    const day = Math.floor(m / 1440), mm = ((m % 1440) + 1440) % 1440;
    const t = `${String(Math.floor(mm / 60)).padStart(2, '0')}:${String(mm % 60).padStart(2, '0')}`;
    return day === 0 ? `${t}` : day === 1 ? `${t} tomorrow · 明天` : `${t} +${day} days · ${day} 天後`;
  }
  // 我的午餐現在在哪：今天的午餐時間到現在過了幾小時（還沒到就算昨天的）
  function whereNow() {
    const d = new Date();
    let mins = d.getHours() * 60 + d.getMinutes() - lunchMinutes();
    if (mins < 0) mins += 1440;
    setPlaying(false);
    state.live = true;
    setU(hoursToU(mins / 60));
    R.clock.textContent = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')} now · 現在`;
  }

  // ---------------- 操作 ----------------
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
    if (v) { state.live = false; if (state.u >= 0.999) setU(0); }
  }
  R.play.addEventListener('click', () => { if (state.ready) setPlaying(!state.playing); });
  R.slider.addEventListener('input', () => { if (!state.ready) return; setPlaying(false); state.live = false; setU(parseFloat(R.slider.value) / 1000); });
  R.now.addEventListener('click', () => { if (state.ready) whereNow(); });
  R.lunch.addEventListener('change', () => { if (state.ready) { state.live = false; setU(state.u); } });
  const jump = (i) => {
    if (!state.ready) return;
    setPlaying(false); state.live = false;
    const s = STAGES[i];
    setU(s.u0 + (s.u1 - s.u0) * (s.key === 'out' ? 0.5 : 0.35));
  };
  R.stops.forEach((li, i) => {
    li.addEventListener('click', () => jump(i));
    li.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); jump(i); } });
  });
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="organs"]', (v) => { state.organs = v; A.organs.forEach((o) => { o.visible = v; }); });
  bind('[data-t="skel"]', (v) => { state.skel = v; if (bones) for (const b of bones.values()) b.mesh.visible = v; });
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  $('.al-home').addEventListener('click', () => { if (state.ready) flyTo(homePos(), A.target); });

  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0; }

  // ---------------- 標籤 ----------------
  const L = {
    food: lab.add('dg-lb dg-lb-food', 'Your lunch · 你的午餐'),
    mouth: lab.add('dg-lb', 'Mouth · 口'), eso: lab.add('dg-lb', 'Esophagus · 食道'),
    stom: lab.add('dg-lb', 'Stomach · 胃'), liver: lab.add('dg-lb dg-lb-org', 'Liver · 肝'),
    gall: lab.add('dg-lb dg-lb-org', 'Gallbladder · 膽囊'), panc: lab.add('dg-lb dg-lb-org', 'Pancreas · 胰臟'),
    small: lab.add('dg-lb', 'Small intestine · 小腸'), large: lab.add('dg-lb', 'Large intestine · 大腸'),
  };
  let autoLabels = true;
  const tgL = $('[data-t="labels"]');
  if (tgL) tgL.addEventListener('change', () => { autoLabels = false; });
  function updateLabels() {
    const on = state.ready && state.labels;
    for (const el of Object.values(L)) el.hidden = !on;
    if (!state.ready) return;
    L.food.hidden = !bolus.visible;
    if (bolus.visible) lab.place(L.food, bolus.position, -22);
    if (!on) return;
    const { yTop, yBot, xW, zF } = A;
    // 標籤往左右兩邊拉開，免得擠在肚子中間
    lab.place(L.mouth, A.mouth.clone().add(V(0.06, 0.005, 0.02)));
    lab.place(L.eso, curves.esophagus.getPointAt(0.45).add(V(0.055, 0, 0)));
    lab.place(L.stom, A.stomachG.position.clone().add(V(0.11, 0.1, 0.04)));
    L.liver.hidden = L.gall.hidden = L.panc.hidden = !state.organs;
    lab.place(L.liver, A.liver.position.clone().add(V(-0.15, 0.04, 0.05)));
    lab.place(L.gall, A.gall.position.clone().add(V(-0.12, -0.035, 0.04)));
    lab.place(L.panc, V(xW + 0.11, yTop - 0.025, zF - 0.06));
    lab.place(L.small, V(0, yBot + 0.005, zF + 0.06));
    lab.place(L.large, V(-xW - 0.08, yBot + 0.01, zF));
  }

  // ---------------- 尺寸、迴圈 ----------------
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = camera.aspect < 0.9 ? 40 : 32;
    camera.updateProjectionMatrix();
    if (autoLabels) { state.labels = w >= 520; if (tgL) tgL.checked = state.labels; }
  }
  new ResizeObserver(resize).observe(spaceWrap);
  resize();

  const PLAY_S = 32;          // 播放一次全程約 32 秒
  function step(dt) {
    if (!state.ready) return;
    if (state.playing) {
      const u = state.u + dt / PLAY_S;
      if (u >= 1) { setU(1); setPlaying(false); } else setU(u);
    } else setU(state.u);       // 咀嚼與攪拌的小動作一直在動
    const inSt = uToHours(state.u).stage.key === 'stomach';
    const k = inSt ? 1 + 0.035 * Math.sin(performance.now() / 1000 * 2.2) : 1;
    A.stomachG.scale.set(k, 2 - k, k);
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 0.9);
      const kk = MathUtils.smootherstep(fly.t, 0, 1);
      camera.position.lerpVectors(fly.p0, fly.p1, kk);
      controls.target.lerpVectors(fly.t0, fly.t1, kk);
    }
  }
  let visible = false, raf = 0, last = 0;
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
  root.classList.add('al-fresh');

  // 除錯用：$('[data-digestion-lab]').__lab；背景分頁 rAF 很慢時用 setHours(h)／render()
  root.__lab = {
    camera, controls, state, setU, setHours: (h) => { setPlaying(false); setU(hoursToU(h)); }, whereNow,
    render: () => { controls.update(); updateLabels(); renderer.render(scene, camera); },
  };
  return { ready: () => state.ready, now: whereNow };
}

lazyBoot('[data-digestion-lab]', initLab, { now: (lab) => lab.now() });
