/*
 * 萬物原理 · 第十課「彩虹是怎麼形成的？」的 3D 雨滴與彩虹（自繪示意）。
 *
 * 一個機制：陽光射進雨滴時轉彎（折射）、在水滴背面反射一次、出來時再轉彎；水對各色光的折射率差一點點，
 *   所以各色從不同角度出來，而且都擠在「回頭約 42°」附近（紅約 42.3°、紫約 41.3°）。
 *   所以只有在「太陽正對面那一點」外圍 42° 的那一圈雨滴，才會把彩色光送進你的眼睛 → 彩虹是一個圓的一部分，
 *   永遠在背對太陽的方向；太陽高過 42°，彩虹整個沉到地平線以下。
 *
 * 兩個視角：
 *   「一顆雨滴」：放大的水滴剖面（2D 平面上的光路，用 rainbowcalc.js 的 Snell 定律算），可以移動光射入的位置，
 *     或一次射很多道光，看出光在 42° 附近擠在一起。
 *   「你和雨」：你站在原點面向 +z，太陽在背後（高度可調）；前方 20 公尺是一片落下的雨，
 *     每顆雨滴依「它在你眼中跟太陽正對面差幾度」上色（雨滴落下穿過那一圈時閃一下顏色）。
 *
 * 產物：cd tools/science && npm run build → assets/js/rainbow-drops.js
 */
import {
  AdditiveBlending, AmbientLight, BufferGeometry, CircleGeometry, Color, CylinderGeometry, DirectionalLight, DoubleSide,
  Float32BufferAttribute, Group, Line, LineBasicMaterial, LineDashedMaterial, MathUtils, Mesh, MeshBasicMaterial,
  MeshStandardMaterial, PerspectiveCamera, PlaneGeometry, Points, PointsMaterial, Scene, SphereGeometry, Vector3,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { BANDS, nWater, primaryAngle, rainbowAngle, secondaryRainbowAngle, primaryPath } from './rainbowcalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const D = Math.PI / 180;
const DROP_AT = V(300, 0, 0);      // 「一顆雨滴」放在遠處，免得和雨幕疊在一起
const RD = 3;                       // 放大的水滴半徑
const CURTAIN_Z = 20, EYE = V(0, 1.6, 0), NDROPS = 36000;
const N = BANDS.map((b) => nWater(b.nm));
const BOW = N.map((n) => rainbowAngle(n).angle);              // 各色主虹半徑（紅最大）
const BOW2 = N.map((n) => secondaryRainbowAngle(n).angle);    // 各色副虹半徑（紅最小）
const COL = BANDS.map((b) => new Color(b.css));

const MSG = {
  drop: ['Sunlight bends as it enters the raindrop, reflects off the back, and bends again as it leaves. Each color bends a tiny bit differently, so the colors come out at slightly different angles.',
    '陽光射進雨滴時轉彎，在水滴背面反射，出來時再轉彎一次。每種顏色轉彎的角度差一點點，所以各色從稍微不同的角度出來。'],
  dropPeak: ['Here the light comes back at its largest angle, about 42 degrees. Light from many entry points piles up near this angle, which is why the rainbow is bright there.',
    '這裡光回頭的角度最大，大約 42 度。從很多位置射進來的光，都擠在這個角度附近，所以彩虹在那裡特別亮。'],
  rays: ['Many rays enter the drop at different places, but notice how many of them leave close to 42 degrees. That crowd of light is the rainbow.',
    '很多道光從不同位置射進水滴，但看看有多少道都在 42 度附近出來：擠在一起的那一大片光，就是彩虹。'],
  sky: ['With the Sun behind you, only the raindrops about 42 degrees from the point straight opposite the Sun send their colors to your eyes. Those drops form a circle, so a rainbow is part of a circle.',
    '太陽在你背後時，只有離「太陽正對面那一點」大約 42 度的雨滴，會把顏色送進你的眼睛。這些雨滴排成一圈，所以彩虹是圓的一部分。'],
  low: ['When the Sun is near the horizon, the center of the circle is just below the ground, so you see a tall, nearly half-circle rainbow.',
    '太陽接近地平線時，圓心只在地面下一點點，所以你看到又高又大、接近半圓的彩虹。'],
  high: ['The Sun is higher than about 42 degrees, so the whole rainbow circle is below the horizon. That is why you rarely see a rainbow at midday.',
    '太陽高過大約 42 度，整圈彩虹都沉到地平線以下了。所以中午很少看到彩虹。'],
  double: ['The second rainbow comes from light that reflects twice inside each drop. It sits at about 50 to 52 degrees, it is fainter, and its colors are in the opposite order. The darker sky between the two bows is called Alexander’s band.',
    '第二道彩虹來自在水滴裡反射兩次的光，位置大約在 50 到 52 度，比較淡，顏色順序相反。兩道彩虹之間比較暗的天空叫做「亞歷山大暗帶」。'],
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
  const SKY_BG = new Color(0x2a3446), DROP_BG = new Color(0x0b1326);
  scene.background = SKY_BG.clone();
  const camera = new PerspectiveCamera(46, 1, 0.1, 600);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 3; controls.maxDistance = 90;
  scene.add(new AmbientLight(0xffffff, 0.55));
  const sunLight = new DirectionalLight(0xfff1d6, 1.2); scene.add(sunLight);

  const state = { view: 'sky', sun: 20, b: 0.86, rays: false, second: false, labels: true, playing: true, lastMsg: '', lastTable: '' };

  // =============== 「你和雨」 ===============
  const sky = new Group(); scene.add(sky);
  const ground = new Mesh(new PlaneGeometry(400, 400), new MeshStandardMaterial({ color: 0x3e6b47, roughness: 1 }));
  ground.rotation.x = -Math.PI / 2; sky.add(ground);
  // 你（背影）
  const you = new Group(); sky.add(you);
  you.add(at(new Mesh(new CylinderGeometry(0.22, 0.28, 1.2, 14), new MeshStandardMaterial({ color: 0xffb02e })), 0, 0.6, 0));
  you.add(at(new Mesh(new SphereGeometry(0.22, 16, 12), new MeshStandardMaterial({ color: 0x3a2a20 })), 0, 1.45, 0));
  // 雨幕
  const dropPos = new Float32Array(NDROPS * 3), dropCol = new Float32Array(NDROPS * 3);
  for (let i = 0; i < NDROPS; i++) {
    dropPos[i * 3] = (Math.random() * 2 - 1) * 30;
    dropPos[i * 3 + 1] = Math.random() * 24;
    dropPos[i * 3 + 2] = CURTAIN_Z + (Math.random() * 2 - 1) * 1.2;
  }
  const rainGeo = new BufferGeometry();
  rainGeo.setAttribute('position', new Float32BufferAttribute(dropPos, 3));
  rainGeo.setAttribute('color', new Float32BufferAttribute(dropCol, 3));
  const rainPos = rainGeo.attributes.position.array, rainCol = rainGeo.attributes.color.array;
  const rain = new Points(rainGeo, new PointsMaterial({ size: 0.2, vertexColors: true, transparent: true, blending: AdditiveBlending, depthWrite: false }));
  rain.frustumCulled = false; sky.add(rain);
  // 陽光（從背後射來的平行光線）、42° 圓錐、太陽正對面
  const sunRays = [];
  for (let k = 0; k < 6; k++) {
    const l = new Line(new BufferGeometry().setFromPoints([V(0, 0, 0), V(0, 0, 1)]), new LineBasicMaterial({ color: 0xffe28a, transparent: true, opacity: 0.3 }));
    l.frustumCulled = false; sky.add(l); sunRays.push(l);
  }
  const coneLines = [];
  for (let k = 0; k < 7; k++) {
    const l = new Line(new BufferGeometry().setFromPoints([V(0, 0, 0), V(0, 0, 1)]), new LineDashedMaterial({ color: 0xffffff, dashSize: 0.5, gapSize: 0.35, transparent: true, opacity: 0.55 }));
    l.frustumCulled = false; sky.add(l); coneLines.push(l);
  }
  const axisLine = new Line(new BufferGeometry().setFromPoints([V(0, 0, 0), V(0, 0, 1)]), new LineDashedMaterial({ color: 0xffd36e, dashSize: 0.5, gapSize: 0.35 }));
  axisLine.frustumCulled = false; sky.add(axisLine);
  const anti = new Mesh(new SphereGeometry(0.35, 14, 10), new MeshBasicMaterial({ color: 0xffd36e })); sky.add(anti);

  // =============== 「一顆雨滴」 ===============
  const dropG = new Group(); dropG.position.copy(DROP_AT); scene.add(dropG);
  dropG.add(new Mesh(new CircleGeometry(RD, 96), new MeshBasicMaterial({ color: 0x6fb6ff, transparent: true, opacity: 0.16, side: DoubleSide, depthWrite: false })));
  const rimPts = []; for (let k = 0; k <= 128; k++) rimPts.push(V(Math.cos(k / 128 * Math.PI * 2) * RD, Math.sin(k / 128 * Math.PI * 2) * RD, 0));
  dropG.add(new Line(new BufferGeometry().setFromPoints(rimPts), new LineBasicMaterial({ color: 0x9fd4ff })));
  // 點數要一開始就給對（之後 setFromPoints 只會更新、不會加大緩衝區）
  const mkLine = (c, op = 1, n = 2) => { const l = new Line(new BufferGeometry().setFromPoints(Array.from({ length: n }, (_, k) => V(k, 0, 0))), new LineBasicMaterial({ color: c, transparent: op < 1, opacity: op })); l.frustumCulled = false; dropG.add(l); return l; };
  const inRay = mkLine(0xffffff);
  const colorRays = BANDS.map((b) => mkLine(new Color(b.css), 1, 4));
  const many = Array.from({ length: 26 }, () => ({ inL: mkLine(0xffffff, 0.35), outL: mkLine(0x3ad17a, 0.85, 4) }));
  const peakLine = new Line(new BufferGeometry().setFromPoints([V(0, 0, 0), V(1, 0, 0)]), new LineDashedMaterial({ color: 0xffd36e, dashSize: 0.3, gapSize: 0.2 }));
  peakLine.frustumCulled = false; dropG.add(peakLine);
  const refLine = new Line(new BufferGeometry().setFromPoints([V(0, 0, 0), V(1, 0, 0)]), new LineDashedMaterial({ color: 0xffffff, dashSize: 0.2, gapSize: 0.2, transparent: true, opacity: 0.4 }));
  refLine.frustumCulled = false; dropG.add(refLine);
  const OUT_LEN = 16;

  // ---------------- 標籤 ----------------
  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    you: lab.add('bt-lb rb-lb-you', 'You<small>你</small>'),
    sun: lab.add('bt-lb bt-lb-b', 'Sunlight from behind you<small>陽光從你背後照來</small>'),
    anti: lab.add('bt-lb bt-lb-b', 'Straight opposite the Sun<small>太陽的正對面</small>'),
    cone: lab.add('bt-lb rb-lb-ang', '42°'),
    rain: lab.add('bt-lb bt-lb-e', 'Falling rain<small>正在下的雨</small>'),
    bow2: lab.add('bt-lb ip-region', 'Second rainbow<small>第二道彩虹</small>'),
    light: lab.add('bt-lb bt-lb-b', 'Sunlight<small>陽光</small>'),
    drop: lab.add('bt-lb bt-lb-e', 'Raindrop (enlarged)<small>雨滴（放大）</small>'),
    inBend: lab.add('bt-lb ip-region', 'Bends going in<small>進去時轉彎</small>'),
    back: lab.add('bt-lb ip-region', 'Reflects at the back<small>在背面反射</small>'),
    outBend: lab.add('bt-lb ip-region', 'Bends coming out<small>出來時再轉彎</small>'),
    exit: lab.add('bt-lb rb-lb-ang', ''),
    peak: lab.add('bt-lb rb-lb-peak', 'About 42°<small>約 42°</small>'),
  };

  const R = {
    sunR: $('.rb-sun'), sunOut: $('.rb-sun-out'), bR: $('.rb-b'), bOut: $('.rb-b-out'), table: $('.rb-angles'),
    k1: $('.rb-k1'), v1: $('.rb-v1'), k2: $('dt.rb-k2'), v2: $('.rb-v2'), msg: $('.rb-msg'), play: $('.al-play'), tk: $('.rb-tk'),
  };

  // ---------------- 計算與更新 ----------------
  const anti3 = () => V(0, -Math.sin(state.sun * D), Math.cos(state.sun * D));   // 從眼睛看向太陽正對面
  // 以「太陽正對面」為中心、角半徑 g 的圓上的方向：phi = 0 在右、90° 在上
  const ringDir = (g, phi) => {
    const a = anti3(), up = V(0, 1, 0).addScaledVector(a, -a.y).normalize(), right = V(1, 0, 0);
    return a.multiplyScalar(Math.cos(g * D)).addScaledVector(right, Math.sin(g * D) * Math.cos(phi)).addScaledVector(up, Math.sin(g * D) * Math.sin(phi)).normalize();
  };
  const sunDir = () => anti3().negate();
  function colorFor(ang) {
    // 主虹：紅在外（角度大）、紫在內
    const lo = BOW[BOW.length - 1] - 0.45, hi = BOW[0] + 0.45;
    if (ang >= lo && ang <= hi) {
      const t = MathUtils.clamp((hi - ang) / (hi - lo), 0, 0.999) * (BANDS.length);   // 0 紅 … 6 紫
      const c = COL[Math.min(BANDS.length - 1, Math.floor(t))];
      return [c.r * 1.6, c.g * 1.6, c.b * 1.6];
    }
    if (state.second) {
      const lo2 = BOW2[0] - 0.45, hi2 = BOW2[BOW2.length - 1] + 0.45;
      if (ang >= lo2 && ang <= hi2) {
        const t = MathUtils.clamp((ang - lo2) / (hi2 - lo2), 0, 0.999) * BANDS.length;     // 副虹：紅在內
        const c = COL[Math.min(BANDS.length - 1, Math.floor(t))];
        return [c.r * 0.75, c.g * 0.75, c.b * 0.75];
      }
      if (ang > hi && ang < lo2) return [0.002, 0.002, 0.003];   // 亞歷山大暗帶（顏色是線性值，畫面上會再變亮）
    }
    if (ang < lo) return [0.026, 0.03, 0.036];                   // 彩虹內側的天空比較亮
    return [0.011, 0.013, 0.017];                              // 其他雨滴：暗暗的雨幕
  }
  const tmp = V(0, 0, 0);
  function updateSky(dt) {
    const a = anti3();
    for (let i = 0; i < NDROPS; i++) {
      if (state.playing) {
        rainPos[i * 3 + 1] -= dt * 7;
        if (rainPos[i * 3 + 1] < 0) rainPos[i * 3 + 1] += 24;
      }
      tmp.set(rainPos[i * 3] - EYE.x, rainPos[i * 3 + 1] - EYE.y, rainPos[i * 3 + 2] - EYE.z).normalize();
      const ang = Math.acos(MathUtils.clamp(tmp.dot(a), -1, 1)) / D;
      const c = colorFor(ang);
      rainCol[i * 3] = c[0]; rainCol[i * 3 + 1] = c[1]; rainCol[i * 3 + 2] = c[2];
    }
    rainGeo.attributes.position.needsUpdate = true;
    rainGeo.attributes.color.needsUpdate = true;
    // 陽光：從背後越過你的肩膀射向雨幕
    sunRays.forEach((l, k) => {
      const p0 = V(-6 + k * 2.4, 2.5 + (k % 2) * 1.5, 0).addScaledVector(a, -8);
      l.geometry.setFromPoints([p0, p0.clone().addScaledVector(a, 8 + CURTAIN_Z / Math.max(0.2, a.z))]);
    });
    // 42° 圓錐：從眼睛到雨幕上的一圈（只畫地面以上）
    const g = BOW[3];
    coneLines.forEach((l, k) => {
      const dir = ringDir(g, (k / (coneLines.length - 1)) * Math.PI);   // 右 → 上 → 左
      const t = (CURTAIN_Z - EYE.z) / Math.max(0.05, dir.z);
      const end = EYE.clone().addScaledVector(dir, t);
      l.visible = end.y > 0;
      l.geometry.setFromPoints([EYE, end]); l.computeLineDistances();
    });
    const ta = (CURTAIN_Z - EYE.z) / a.z;
    const antiP = EYE.clone().addScaledVector(a, ta);
    anti.position.copy(antiP);
    axisLine.geometry.setFromPoints([EYE, antiP]); axisLine.computeLineDistances();
    return { antiP, top: g - state.sun };
  }
  function setLine(l, pts) { l.geometry.setFromPoints(pts); }
  function updateDrop() {
    const y = state.b * RD;
    const p = primaryPath(state.b, N[3], RD);
    inRay.visible = !state.rays;
    setLine(inRay, [V(-14, y, 0), V(p.p1[0], p.p1[1], 0)]);
    BANDS.forEach((b, k) => {
      const q = primaryPath(state.b, N[k], RD);
      colorRays[k].visible = !state.rays;
      setLine(colorRays[k], [V(q.p1[0], q.p1[1], 0.01 * k), V(q.p2[0], q.p2[1], 0.01 * k), V(q.p3[0], q.p3[1], 0.01 * k),
        V(q.p3[0] + q.out[0] * OUT_LEN, q.p3[1] + q.out[1] * OUT_LEN, 0.01 * k)]);
    });
    many.forEach((m, k) => {
      const bb = 0.04 + k / (many.length - 1) * 0.955;
      const q = primaryPath(bb, N[3], RD);
      m.inL.visible = m.outL.visible = state.rays;
      setLine(m.inL, [V(-14, bb * RD, 0), V(q.p1[0], q.p1[1], 0)]);
      setLine(m.outL, [V(q.p1[0], q.p1[1], 0), V(q.p2[0], q.p2[1], 0), V(q.p3[0], q.p3[1], 0), V(q.p3[0] + q.out[0] * OUT_LEN, q.p3[1] + q.out[1] * OUT_LEN, 0)]);
    });
    // 42° 的參考線：從水滴中心往「回頭 42°」的方向（光往左回去、往下偏）
    const pk = rainbowAngle(N[3]);
    const qp = primaryPath(pk.b, N[3], RD);
    setLine(peakLine, [V(qp.p3[0], qp.p3[1], 0), V(qp.p3[0] + qp.out[0] * OUT_LEN, qp.p3[1] + qp.out[1] * OUT_LEN, 0)]); peakLine.computeLineDistances();
    setLine(refLine, [V(qp.p3[0], qp.p3[1], 0), V(qp.p3[0] - OUT_LEN, qp.p3[1], 0)]); refLine.computeLineDistances();
    peakLine.visible = refLine.visible = state.rays || Math.abs(state.b - pk.b) < 0.03;
    return { p, peak: pk };
  }

  // ---------------- 每格 ----------------
  function step(dt) {
    sky.visible = state.view === 'sky';
    dropG.visible = state.view === 'drop';
    scene.background.copy(state.view === 'sky' ? SKY_BG : DROP_BG);
    sunLight.position.copy(sunDir()).multiplyScalar(30);
    const info = state.view === 'sky' ? updateSky(dt) : updateDrop();
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 0.9);
      const k = MathUtils.smootherstep(fly.t, 0, 1);
      camera.position.lerpVectors(fly.p0, fly.p1, k);
      controls.target.lerpVectors(fly.t0, fly.t1, k);
    }
    return info;
  }

  let narrow = false;
  function updateLabels(info) {
    const on = state.labels;
    for (const el of Object.values(L)) el.hidden = true;
    const show = (el, s, v, dy = 0) => { el.hidden = !s; if (s) lab.place(el, v, dy); };
    if (state.view === 'sky') {
      show(L.you, true, V(0, 1.9, 0), -16);
      show(L.sun, on && !narrow, V(-4, 4.6, 2));
      show(L.anti, on && info.antiP.y > 0.3, info.antiP, 22);
      const dir = ringDir(BOW[3], Math.PI / 2);
      const top = EYE.clone().addScaledVector(dir, (CURTAIN_Z - EYE.z) / dir.z);
      show(L.cone, on && top.y > 0, EYE.clone().lerp(top, 0.45), -12);
      show(L.rain, on && !narrow, V(17, 15, CURTAIN_Z));
      if (state.second) {
        const d2 = ringDir(BOW2[3], Math.PI / 2);
        const t2 = EYE.clone().addScaledVector(d2, (CURTAIN_Z - EYE.z) / d2.z);
        show(L.bow2, on && t2.y > 0 && t2.y < 24, t2, -16);
      }
    } else {
      const p = info.p;
      show(L.light, on, V(-11, state.b * RD + 0.6, 0).add(DROP_AT), -10);
      show(L.drop, on && !narrow, V(RD * 0.8, RD + 0.9, 0).add(DROP_AT));
      if (!state.rays) {
        show(L.inBend, on && !narrow, V(p.p1[0], p.p1[1], 0).add(DROP_AT), -22);
        show(L.back, on && !narrow, V(p.p2[0], p.p2[1], 0).add(DROP_AT), 0);
        show(L.outBend, on && !narrow, V(p.p3[0], p.p3[1], 0).add(DROP_AT), 22);
        L.exit.innerHTML = `${primaryAngle(state.b, N[3]).toFixed(1)}°`;
        show(L.exit, on, V(p.p3[0] + p.out[0] * 9, p.p3[1] + p.out[1] * 9, 0).add(DROP_AT), -14);
      }
      if (state.rays || Math.abs(state.b - info.peak.b) < 0.03) {
        const qp = primaryPath(info.peak.b, N[3], RD);
        show(L.peak, on, V(qp.p3[0] + qp.out[0] * 13, qp.p3[1] + qp.out[1] * 13, 0).add(DROP_AT), 14);
      }
    }
  }

  // ---------------- 讀數 ----------------
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function readout() {
    R.sunOut.textContent = `${Math.round(state.sun)}°`;
    R.sunR.style.setProperty('--p', `${state.sun / 60 * 100}%`);
    R.bOut.textContent = state.b.toFixed(2);
    R.bR.style.setProperty('--p', `${state.b / 0.99 * 100}%`);
    root.classList.toggle('rb-v-sky', state.view === 'sky');
    root.classList.toggle('rb-v-drop', state.view === 'drop');
    root.querySelectorAll('[data-view]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-view') === state.view ? 'true' : 'false'));
    let rows, key;
    if (state.view === 'drop') {
      R.tk.innerHTML = 'Light comes back at · 光回頭的角度';
      rows = BANDS.map((b, k) => `<li><i style="background:${b.css}"></i><span>${b.en}<small>${b.zh}</small></span><b>${primaryAngle(state.b, N[k]).toFixed(1)}°</b><em>max ${BOW[k].toFixed(1)}°</em></li>`).join('');
      R.k1.innerHTML = 'Enters at · 射入位置'; R.v1.textContent = `${Math.round(state.b * 100)}% out`;
      R.k2.innerHTML = 'How much water bends light · 水的折射率'; R.v2.textContent = `${N[0].toFixed(3)}–${N[5].toFixed(3)}`;
      key = state.rays ? 'rays' : Math.abs(state.b - rainbowAngle(N[3]).b) < 0.03 ? 'dropPeak' : 'drop';
    } else {
      R.tk.innerHTML = 'Rainbow size · 彩虹的半徑';
      rows = BANDS.map((b, k) => `<li><i style="background:${b.css}"></i><span>${b.en}<small>${b.zh}</small></span><b>${BOW[k].toFixed(1)}°</b><em>${state.second ? `2nd ${BOW2[k].toFixed(1)}°` : ''}</em></li>`).join('');
      const top = BOW[0] - state.sun;
      R.k1.innerHTML = 'Sun height · 太陽高度'; R.v1.textContent = `${Math.round(state.sun)}°`;
      R.k2.innerHTML = 'Top of the rainbow · 彩虹頂端'; R.v2.innerHTML = top > 0 ? `${top.toFixed(0)}° up<small>高</small>` : 'Below the ground<small>在地平線下</small>';
      R.v2.classList.toggle('bad', top <= 0);
      key = top <= 0 ? 'high' : state.second ? 'double' : state.sun < 8 ? 'low' : 'sky';
    }
    if (rows !== state.lastTable) { R.table.innerHTML = rows; state.lastTable = rows; }
    if (state.view === 'drop') R.v2.classList.remove('bad');
    const html = `${esc(MSG[key][0])}<span class="zh">${esc(MSG[key][1])}</span>`;
    if (html !== state.lastMsg) { R.msg.innerHTML = html; state.lastMsg = html; }
  }

  // ---------------- 操作 ----------------
  const homeOf = (v) => {
    const k = camera.aspect < 0.9 ? 1.45 : camera.aspect < 1.2 ? 1.15 : 1;
    if (v === 'drop') return [DROP_AT.clone().add(V(-4.5, -2.5, 26 * k)), DROP_AT.clone().add(V(-4.5, -2.5, 0))];
    return [V(0, 2.6, -9 * k), V(0, 9, CURTAIN_Z)];
  };
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo([p, t], instant) {
    if (instant) { camera.position.copy(p); controls.target.copy(t); fly.t = 1; return; }
    fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0;
  }
  function setView(v) { if (v !== 'sky' && v !== 'drop') return; const changed = v !== state.view; state.view = v; if (changed) flyTo(homeOf(v), true); }
  function setSun(v) { state.sun = MathUtils.clamp(+v, 0, 60); R.sunR.value = String(state.sun); }
  function setB(v) { state.b = MathUtils.clamp(+v, 0, 0.99); R.bR.value = String(state.b); }
  function setRays(v) { state.rays = v; const t = $('[data-t="rays"]'); if (t) t.checked = v; }
  function setSecond(v) { state.second = v; const t = $('[data-t="second"]'); if (t) t.checked = v; }
  R.sunR.addEventListener('input', () => setSun(R.sunR.value));
  R.bR.addEventListener('input', () => setB(R.bR.value));
  root.querySelectorAll('[data-view]').forEach((b) => b.addEventListener('click', () => setView(b.getAttribute('data-view'))));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="second"]', setSecond);
  bind('[data-t="rays"]', setRays);
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  $('.al-home').addEventListener('click', () => flyTo(homeOf(state.view)));

  // ---------------- 迴圈 ----------------
  let lastR = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    const info = step(dt);
    controls.update();
    updateLabels(info);
    if (t - lastR > 120) { lastR = t; readout(); }
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = camera.aspect < 0.9 ? 58 : 46;
    camera.updateProjectionMatrix();
    narrow = w < 560;
    root.classList.toggle('bt-narrow', narrow);
  }
  new ResizeObserver(resize).observe(spaceWrap);
  resize();
  flyTo(homeOf('sky'), true);
  let visible = false, raf = 0, last = 0;
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  setSun(20); setB(0.86);
  readout(step(0.01));
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const DEMO = {
    drop: () => { setView('drop'); setRays(false); setB(0.86); },
    rays: () => { setView('drop'); setRays(true); },
    bow: () => { setView('sky'); setSecond(false); setSun(15); },
    double: () => { setView('sky'); setSecond(true); setSun(10); },
    high: () => { setView('sky'); setSecond(false); setSun(50); },
  };
  // 除錯：document.querySelector('[data-rainbow-lab]').__lab
  root.__lab = {
    camera, controls, state, setView, setSun, setB, setRays, setSecond, BOW, BOW2,
    run: (sec) => { for (let t = 0; t < sec; t += 0.025) step(0.025); },
    render: () => { const i = step(0); controls.update(); updateLabels(i); readout(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => { if (DEMO[v]) DEMO[v](); } };
}

lazyBoot('[data-rainbow-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
