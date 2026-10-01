/*
 * 萬物原理 · 第四課「風力發電機怎麼發電？」的 3D 離岸風機（自繪示意，比例照 SG 8.0-167 DD 約略縮小）。
 *
 * 一個機制：葉片像飛機的機翼，風吹過產生升力推著轉子轉；轉子直接帶動一圈磁鐵經過線圈（第二課的發電機，直驅）。
 *   風的功率跟風速的三次方成正比：風速加倍、功率八倍（windcalc.js）。
 *
 * 座標：+Y 往上，海面 y = 0；北方是 +Z、東方是 −X（從上往下看不會左右顛倒）。
 *   機艙 group 的本地 +X 是「迎風的正前方」，轉子在前面；偏航（yaw）時整個機艙轉向風來的方向。
 *   比例：1 單位 ≈ 12.8 公尺（轉子半徑 83.5 m → 6.5 單位），輪轂高約 108 m（示意）。
 *
 * 風的粒子：從上風處一個平面出發、順著風向走；穿過轉子圓面後減速（風機把風的能量拿走了，後面的風變慢）。
 * 轉速用真實的每分鐘轉數（最快約 10 轉，一圈約 6 秒）；風的粒子速度則是放慢的示意。
 *
 * 產物：cd tools/science && npm run build → assets/js/wind-turbine.js
 */
import {
  AdditiveBlending, AmbientLight, BoxGeometry, BufferGeometry, CanvasTexture, Color, CylinderGeometry,
  DirectionalLight, DoubleSide, ExtrudeGeometry, Group, HemisphereLight, InstancedMesh, Line, LineBasicMaterial,
  MathUtils, Mesh, MeshBasicMaterial, MeshStandardMaterial, Object3D, PerspectiveCamera, PlaneGeometry, Scene, Shape,
  SphereGeometry, SRGBColorSpace, TorusGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { power, rpm, pitch, regime, windPower, cp, kmh, tipSpeed, RATED_W, CUT_IN, CUT_OUT } from './windcalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const TAU = Math.PI * 2, DEG = Math.PI / 180;
const HUB_Y = 8.4, ROTOR_R = 6.5;
// 風從哪個方位吹來（度，北 0、東 90）
const WINDS = {
  ne: { from: 45, en: 'Northeast monsoon', zh: '東北季風' },
  sw: { from: 225, en: 'Southwest monsoon', zh: '西南季風' },
};
// 地圖：北 +Z、東 −X
const dirOf = (bearing) => V(-Math.sin(bearing * DEG), 0, Math.cos(bearing * DEG));

const MSG = {
  calm: ['Below about 3 meters per second, there is too little power in the wind. The rotor drifts slowly and makes no electricity.',
    '風速低於每秒約 3 公尺時，風裡的能量太少。轉子只會慢慢空轉，不發電。'],
  rising: ['The blades work like wings: the wind creates lift that pulls them around. Power grows very fast with wind speed. Double the wind, and there is eight times the power.',
    '葉片像機翼一樣：風產生升力把它們拉著轉。功率隨風速增加得非常快：風速加倍，功率就變成八倍。'],
  full: ['Full power: 8 megawatts. Now the turbine turns its blades a little away from the wind to spill the extra, so the generator is not overloaded.',
    '滿載：8 百萬瓦。這時風機會把葉片稍微轉開，把多出來的風放掉，免得發電機超載。'],
  storm: ['Storm! Above about 25 meters per second, the turbine turns its blades edge-on to the wind and stops, to protect itself until the storm passes.',
    '暴風！風速超過每秒約 25 公尺，風機把葉片轉到側面對著風、停下來保護自己，等暴風過去。'],
};

const canvasTex = (draw, w = 128, h = 128) => {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace; return t;
};

function bladeGeometry() {
  // 葉片平面形狀：根部寬、葉尖窄，前緣比較直（示意的翼型）
  const s = new Shape();
  s.moveTo(-0.18, 0);
  s.bezierCurveTo(-0.32, 0.6, -0.34, 1.6, -0.2, 3.2);
  s.lineTo(-0.06, ROTOR_R - 0.55);
  s.quadraticCurveTo(0, ROTOR_R - 0.42, 0.05, ROTOR_R - 0.55);
  s.lineTo(0.16, 3.0);
  s.bezierCurveTo(0.36, 1.6, 0.34, 0.6, 0.18, 0);
  s.lineTo(-0.18, 0);
  const g = new ExtrudeGeometry(s, { depth: 0.07, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 2, curveSegments: 16 });
  g.translate(0, 0.5, -0.035);
  return g;
}

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
  scene.background = new Color(0x0d1a33);
  const camera = new PerspectiveCamera(36, 1, 0.1, 200);
  const TARGET = V(-1.2, 7.4, 2);
  const homePos = () => V(-15, 10, 30).multiplyScalar(camera.aspect < 0.9 ? 1.3 : camera.aspect < 1.2 ? 0.95 : 1);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 4; controls.maxDistance = 60;
  controls.maxPolarAngle = Math.PI * 0.49;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xdfe8ff, 0x22344f, 1.0));
  scene.add(new AmbientLight(0xffffff, 0.25));
  const sun = new DirectionalLight(0xfff1d6, 1.7); sun.position.set(-8, 18, 10); scene.add(sun);

  const R = {
    play: $('.al-play'), ws: $('.wt-ws'), wsOut: $('.wt-ws-out'), msg: $('.wt-msg'), state: $('.wt-state'),
    p: $('.wt-p'), rpm: $('.wt-rpm'), pitch: $('.wt-pitch'), tip: $('.wt-tip'), x8: $('.wt-x8'), curve: $('.wt-curve-cv'),
  };
  const lab = labeler($('.al-labels'), cv, camera);
  const state = {
    v: 8, wind: 'ne', yaw: 0, rpm: 0, pitch: 0, angle: 0, playing: true, labels: true, inside: false, wake: true,
    lastMsg: '', focus: null, focusT: 0,
  };

  // ---------------- 海、基礎、塔 ----------------
  const seaTex = canvasTex((g, w, h) => {
    g.fillStyle = '#163a5c'; g.fillRect(0, 0, w, h);
    g.strokeStyle = 'rgba(160,200,240,.18)'; g.lineWidth = 2;
    for (let y = 6; y < h; y += 12) { g.beginPath(); for (let x = 0; x <= w; x += 8) g.lineTo(x, y + Math.sin(x * 0.15 + y) * 2); g.stroke(); }
  });
  seaTex.wrapS = seaTex.wrapT = 1000; seaTex.repeat.set(10, 10);
  const sea = new Mesh(new PlaneGeometry(90, 90), new MeshStandardMaterial({ map: seaTex, color: 0x6f9ccc, roughness: 0.35, metalness: 0.1, transparent: true, opacity: 0.92 }));
  sea.rotation.x = -Math.PI / 2; scene.add(sea);
  const parts = { blades: [], nacelle: [], tower: [], foundation: [] };
  const white = new MeshStandardMaterial({ color: 0xeef1f5, roughness: 0.45 });
  const yellow = new MeshStandardMaterial({ color: 0xf2c230, roughness: 0.5 });
  const pile = at(new Mesh(new CylinderGeometry(0.42, 0.42, 3.2, 24), new MeshStandardMaterial({ color: 0x5a6070, roughness: 0.6 })), 0, -1.2, 0);
  scene.add(pile);
  const tp = at(new Mesh(new CylinderGeometry(0.45, 0.45, 1.4, 24), yellow), 0, 0.9, 0); scene.add(tp);
  scene.add(at(new Mesh(new CylinderGeometry(0.95, 0.95, 0.12, 24), new MeshStandardMaterial({ color: 0x8a909c })), 0, 1.6, 0));
  parts.foundation.push(yellow);
  const towerMat = white.clone(); parts.tower.push(towerMat);
  scene.add(at(new Mesh(new CylinderGeometry(0.24, 0.4, HUB_Y - 1.6, 28), towerMat), 0, (HUB_Y + 1.6) / 2 - 0.15, 0));
  // 送上岸的海底電纜（亮度跟著功率）
  const cableMat = new MeshBasicMaterial({ color: 0xffb02e, transparent: true, opacity: 0.25 });
  const cable = new Mesh(new CylinderGeometry(0.05, 0.05, 20, 8), cableMat);
  cable.rotation.z = Math.PI / 2; cable.position.set(-10, -0.05, 0.6); scene.add(cable);

  // ---------------- 機艙與轉子（會偏航） ----------------
  const yawG = new Group(); yawG.position.y = HUB_Y; scene.add(yawG);
  const nacMat = new MeshStandardMaterial({ color: 0xf3f5f8, roughness: 0.4, transparent: true, opacity: 1 });
  parts.nacelle.push(nacMat);
  const nacelle = at(new Mesh(new BoxGeometry(3.0, 1.15, 1.15), nacMat), -0.7, 0.15, 0); yawG.add(nacelle);
  // 發電機：轉子那一圈磁鐵（跟著轉）＋外圈銅線圈（不動）
  const genG = new Group(); genG.position.x = 0.55; yawG.add(genG);
  const coilMat = new MeshStandardMaterial({ color: 0xc8743a, metalness: 0.55, roughness: 0.35, emissive: 0xff9a3a, emissiveIntensity: 0 });
  const stator = new Mesh(new TorusGeometry(0.62, 0.11, 10, 36), coilMat); stator.rotation.y = Math.PI / 2; genG.add(stator);
  const magnetRing = new Group(); genG.add(magnetRing);
  for (let i = 0; i < 16; i++) {
    const a = i / 16 * TAU;
    const m = new Mesh(new BoxGeometry(0.16, 0.16, 0.16), new MeshStandardMaterial({ color: i % 2 ? 0x3f7fe0 : 0xe0474c }));
    m.position.set(0, Math.cos(a) * 0.44, Math.sin(a) * 0.44); magnetRing.add(m);
  }
  genG.visible = false;
  const rotor = new Group(); rotor.position.x = 0.95; yawG.add(rotor);
  const spinner = new Mesh(new SphereGeometry(0.55, 24, 18, 0, TAU, 0, Math.PI / 2), white);
  spinner.rotation.z = -Math.PI / 2; spinner.scale.set(1, 1.5, 1); rotor.add(spinner);
  const bladeMat = new MeshStandardMaterial({ color: 0xf6f7f9, roughness: 0.4, side: DoubleSide });
  parts.blades.push(bladeMat);
  const bGeo = bladeGeometry();
  const bladeRoots = [];
  for (let i = 0; i < 3; i++) {
    const arm = new Group(); arm.rotation.x = i / 3 * TAU; rotor.add(arm);
    const root2 = new Group(); arm.add(root2);       // 繞葉片長軸轉＝變槳
    const b = new Mesh(bGeo, bladeMat); b.rotation.y = Math.PI / 2; root2.add(b);
    // 葉尖紅色警示
    const tipM = at(new Mesh(new BoxGeometry(0.08, 0.5, 0.2), new MeshStandardMaterial({ color: 0xd8382e })), 0, ROTOR_R - 0.25, 0); root2.add(tipM);
    bladeRoots.push(root2);
  }

  // ---------------- 羅盤 ----------------
  const comp = new Group(); comp.position.set(-5.5, 0.05, 6.5); scene.add(comp);
  comp.add(new Mesh(new TorusGeometry(1.4, 0.04, 6, 48).rotateX(Math.PI / 2), new MeshBasicMaterial({ color: 0x9fb0cf, transparent: true, opacity: 0.6 })));
  const compLb = {};
  for (const [k, b] of [['N', 0], ['E', 90], ['S', 180], ['W', 270]]) compLb[k] = [lab.add('bt-lb wt-cmp', k), comp.position.clone().addScaledVector(dirOf(b), 1.9)];

  // ---------------- 風的粒子 ----------------
  const NP = 220;
  const pMesh = new InstancedMesh(new BoxGeometry(1, 0.035, 0.035), new MeshBasicMaterial({ color: 0xcfefff, transparent: true, opacity: 0.55, blending: AdditiveBlending, depthWrite: false }), NP);
  pMesh.frustumCulled = false; scene.add(pMesh);
  let seed = 3;
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  const P = Array.from({ length: NP }, () => ({ s: rnd() * 40, lat: rnd() * 22 - 11, y: 1 + rnd() * 15.5, slow: false }));
  const dummy = new Object3D();
  const col = new Color();
  function placeParticles(dt) {
    const w = dirOf(WINDS[state.wind].from).multiplyScalar(-1);     // 空氣移動的方向
    const side = V(w.z, 0, -w.x);
    const hub = V(0, HUB_Y, 0);
    const speed = 0.35 * state.v;                                     // 示意速度
    const q = new Vector3();
    for (let i = 0; i < NP; i++) {
      const p = P[i];
      const pos = V(0, p.y, 0).addScaledVector(side, p.lat).addScaledVector(w, p.s - 20);
      const off = pos.clone().sub(hub); const along = off.dot(w); const radial = off.clone().addScaledVector(w, -along).length();
      const behind = along > 0.9 && radial < ROTOR_R && regime(state.v) !== 'storm' && regime(state.v) !== 'calm';
      if (state.playing) p.s += dt * speed * (behind && state.wake ? 0.55 : 1);
      if (p.s > 40) { p.s -= 40; p.lat = rnd() * 22 - 11; p.y = 1 + rnd() * 15.5; }
      dummy.position.copy(pos);
      q.copy(w);
      dummy.quaternion.setFromUnitVectors(V(1, 0, 0), q);
      const len = 0.25 + 0.09 * state.v * (behind && state.wake ? 0.55 : 1);
      dummy.scale.set(len, 1, 1);
      dummy.updateMatrix();
      pMesh.setMatrixAt(i, dummy.matrix);
      pMesh.setColorAt(i, behind && state.wake ? col.setHex(0x6f8fb0) : col.setHex(0xcfefff));
    }
    pMesh.instanceMatrix.needsUpdate = true;
    if (pMesh.instanceColor) pMesh.instanceColor.needsUpdate = true;
    pMesh.visible = state.v > 0.2;
  }

  // ---------------- 標籤 ----------------
  const tipW = new Vector3(), tmp = new Vector3();
  const LB = {
    blades: [lab.add('bt-lb', 'Blade, shaped like a wing<small>葉片：形狀像機翼</small>'), () => bladeRoots[0].localToWorld(tipW.set(0, ROTOR_R * 0.75, 0))],
    nacelle: [lab.add('bt-lb', 'Nacelle: the generator is inside<small>機艙：發電機在裡面</small>'), () => yawG.localToWorld(tmp.set(-1.6, 1.0, 0))],
    tower: [lab.add('bt-lb', 'Tower<small>塔架</small>'), () => V(0.6, 4.2, 0.6)],
    foundation: [lab.add('bt-lb bt-lb-b', 'Foundation in the seabed<small>打進海床的基樁</small>'), () => V(0.9, 0.9, 0.9)],
    wind: [lab.add('bt-lb bt-lb-el', ''), () => V(0, 12.5, 0).addScaledVector(dirOf(WINDS[state.wind].from), 9)],
    wake: [lab.add('bt-lb bt-lb-x', 'Slower air behind<small>被拿走能量、變慢的風</small>'), () => V(0, HUB_Y - 2, 0).addScaledVector(dirOf(WINDS[state.wind].from), -9)],
    cable: [lab.add('bt-lb bt-lb-b', 'Undersea cable to shore<small>海底電纜送上岸</small>'), () => V(-13, 0.3, 0.6)],
    gen: [lab.add('bt-lb gn-lb-coil', 'Ring of magnets turning past coils (Lesson 2)<small>一圈磁鐵經過線圈（第二課）</small>'), () => yawG.localToWorld(tmp.set(0.55, -1.0, 0))],
  };
  let narrow = false;
  function updateLabels() {
    const on = state.labels;
    const wd = WINDS[state.wind];
    LB.wind[0].innerHTML = `Wind from the ${wd.from === 45 ? 'northeast' : 'southwest'}<small>${wd.zh}</small>`;
    for (const [k, [el, f]] of Object.entries(LB)) {
      let show = on || state.focus === k;
      if (k === 'gen') show = show && state.inside;
      if (k === 'wake') show = show && state.wake && (regime(state.v) === 'rising' || regime(state.v) === 'full');
      if (narrow && (k === 'cable' || k === 'wake' || k === 'foundation')) show = show && state.focus === k;
      el.hidden = !show;
      el.classList.toggle('bt-sel', state.focus === k && state.focusT > 0);
      if (show) lab.place(el, f());
    }
    for (const [el, at2] of Object.values(compLb)) { el.hidden = !on; if (on) lab.place(el, at2); }
  }

  // ---------------- 功率曲線（2D） ----------------
  const cx = R.curve.getContext('2d');
  function drawCurve() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = R.curve.clientWidth, h = R.curve.clientHeight;
    if (!w || !h) return;
    if (R.curve.width !== Math.round(w * dpr)) { R.curve.width = Math.round(w * dpr); R.curve.height = Math.round(h * dpr); }
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx.clearRect(0, 0, w, h);
    const L = 30, B = 22, T = 10, RR = 8;
    const VMAX = 40;
    const X = (v) => L + v / VMAX * (w - L - RR), Y = (p) => h - B - p / RATED_W * (h - B - T);
    cx.strokeStyle = 'rgba(160,180,230,.18)'; cx.lineWidth = 1;
    for (const v of [10, 20, 30, 40]) { cx.beginPath(); cx.moveTo(X(v), T); cx.lineTo(X(v), h - B); cx.stroke(); }
    for (const p of [2e6, 4e6, 6e6, 8e6]) { cx.beginPath(); cx.moveTo(L, Y(p)); cx.lineTo(w - RR, Y(p)); cx.stroke(); }
    cx.fillStyle = 'rgba(159,176,207,.9)'; cx.font = '600 10px system-ui, sans-serif';
    for (const v of [0, 10, 20, 30, 40]) cx.fillText(String(v), X(v) - 4, h - 8);
    for (const p of [0, 4, 8]) cx.fillText(`${p}`, 8, Y(p * 1e6) + 4);
    cx.fillText('MW', 4, T + 2);
    cx.fillText('m/s', w - 26, h - 8);
    // 風本身的功率 × 貝茲上限（虛線，超出畫面就截掉）
    cx.setLineDash([3, 3]); cx.strokeStyle = 'rgba(159,176,207,.5)'; cx.beginPath();
    for (let v = 0; v <= VMAX; v += 0.1) { const p = Math.min(RATED_W * 1.08, windPower(v) * 16 / 27); const x = X(v), y = Y(p); v ? cx.lineTo(x, y) : cx.moveTo(x, y); }
    cx.stroke(); cx.setLineDash([]);
    cx.strokeStyle = '#4fd1c5'; cx.lineWidth = 2.2; cx.beginPath();
    for (let v = 0; v <= VMAX; v += 0.05) { const x = X(v), y = Y(power(v)); v ? cx.lineTo(x, y) : cx.moveTo(x, y); }
    cx.stroke();
    cx.fillStyle = '#ffd36e'; cx.beginPath(); cx.arc(X(state.v), Y(power(state.v)), 5, 0, TAU); cx.fill();
  }

  // ---------------- 讀數 ----------------
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const STATE_T = { calm: ['Too calm', '風太小'], rising: ['Power rising', '功率增加中'], full: ['Full power', '滿載'], storm: ['Storm: stopped', '暴風：停機保護'] };
  function readout() {
    const v = state.v, r = regime(v);
    R.wsOut.textContent = `${v.toFixed(1)} m/s · ${Math.round(kmh(v))} km/h`;
    R.ws.style.setProperty('--p', `${v / 40 * 100}%`);
    R.p.textContent = `${(power(v) / 1e6).toFixed(2)} MW`;
    R.rpm.textContent = state.rpm.toFixed(1);
    R.pitch.textContent = `${Math.round(state.pitch)}°`;
    R.tip.textContent = `${Math.round(kmh(tipSpeed(state.rpm)))} km/h`;
    const st = STATE_T[r];
    R.state.innerHTML = `${esc(st[0])}<small>${esc(st[1])}</small>`;
    R.state.dataset.r = r;
    const half = v / 2;
    R.x8.innerHTML = r === 'rising' && half >= CUT_IN
      ? `At ${half.toFixed(1)} m/s (half this wind): ${(power(half) / 1e6).toFixed(2)} MW. Double the wind gives <b>${(power(v) / power(half)).toFixed(1)}×</b> the power.<span class="zh">風速只有一半（${half.toFixed(1)} m/s）時：${(power(half) / 1e6).toFixed(2)} MW。風速加倍，功率變成 <b>${(power(v) / power(half)).toFixed(1)} 倍</b>。</span>`
      : `Wind ${v.toFixed(1)} m/s carries ${(windPower(v) / 1e6).toFixed(1)} MW through the rotor; the turbine turns ${Math.round(power(v) / windPower(v || 1) * 100)}% of it into electricity (the limit is 59%).<span class="zh">${v.toFixed(1)} m/s 的風穿過轉子的功率約 ${(windPower(v) / 1e6).toFixed(1)} MW；風機把其中 ${Math.round(power(v) / windPower(v || 1) * 100)}% 變成電（上限 59%）。</span>`;
    const html = `${esc(MSG[r][0])}<span class="zh">${esc(MSG[r][1])}</span>`;
    if (html !== state.lastMsg) { R.msg.innerHTML = html; state.lastMsg = html; }
    root.querySelectorAll('[data-wind]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-wind') === state.wind ? 'true' : 'false'));
  }

  // ---------------- 操作 ----------------
  function setSpeed(v) { state.v = MathUtils.clamp(v, 0, 40); R.ws.value = String(state.v); readout(); drawCurve(); }
  R.ws.addEventListener('input', () => setSpeed(parseFloat(R.ws.value)));
  function setWind(k) { if (WINDS[k]) { state.wind = k; readout(); } }
  root.querySelectorAll('[data-wind]').forEach((b) => b.addEventListener('click', () => setWind(b.getAttribute('data-wind'))));
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="inside"]', (v) => { state.inside = v; genG.visible = v; nacMat.opacity = v ? 0.22 : 1; nacMat.depthWrite = !v; });
  bind('[data-t="wake"]', (v) => { state.wake = v; });
  $('.al-home').addEventListener('click', () => flyTo(homePos(), TARGET));

  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0; }
  function lookInside() {
    const tg = yawG.localToWorld(V(0.2, 0, 0));
    const side = V(0, 0, 1).applyQuaternion(yawG.quaternion);
    const fwd = V(1, 0, 0).applyQuaternion(yawG.quaternion);
    flyTo(tg.clone().addScaledVector(side, 8.5).addScaledVector(fwd, -3).add(V(0, 2.2, 0)), tg);
    const tgl = $('[data-t="inside"]'); if (tgl && !tgl.checked) { tgl.checked = true; tgl.dispatchEvent(new Event('change')); }
  }
  $('.wt-inside-go').addEventListener('click', lookInside);

  // ---------------- 迴圈 ----------------
  function step(dt) {
    const v = state.v;
    // 偏航：慢慢轉向風來的方向（真實風機每秒不到一度，這裡加快）
    const up = dirOf(WINDS[state.wind].from);
    const targetYaw = Math.atan2(-up.z, up.x);
    let d = targetYaw - state.yaw; d = Math.atan2(Math.sin(d), Math.cos(d));
    state.yaw += d * Math.min(1, dt * 0.9);
    yawG.rotation.y = state.yaw;
    // 轉速、葉片角度慢慢跟上
    state.rpm += (rpm(v) - state.rpm) * Math.min(1, dt * 0.6);
    state.pitch += (pitch(v) - state.pitch) * Math.min(1, dt * 1.2);
    if (state.playing) state.angle = (state.angle + state.rpm / 60 * TAU * dt) % TAU;
    rotor.rotation.x = state.angle;
    magnetRing.rotation.x = state.angle;
    for (const b of bladeRoots) b.rotation.y = state.pitch * DEG;
    const pw = power(v) / RATED_W;
    coilMat.emissiveIntensity = 0.9 * pw;
    cableMat.opacity = 0.2 + 0.7 * pw;
    if (state.focusT > 0) state.focusT -= dt; else state.focus = null;
    for (const [k, mats] of Object.entries(parts)) {
      const on = state.focus === k && state.focusT > 0;
      for (const m of mats) { m.emissive.setHex(on ? 0xffc857 : 0x000000); m.emissiveIntensity = on ? 0.3 + 0.3 * Math.sin(state.focusT * 8) : 0; }
    }
    placeParticles(dt);
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 0.9);
      const k = MathUtils.smootherstep(fly.t, 0, 1);
      camera.position.lerpVectors(fly.p0, fly.p1, k);
      controls.target.lerpVectors(fly.t0, fly.t1, k);
    }
  }
  let lastR = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
    controls.update();
    updateLabels();
    if (t - lastR > 150) { lastR = t; readout(); drawCurve(); }
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = camera.aspect < 0.9 ? 44 : 36;
    camera.updateProjectionMatrix();
    narrow = w < 560;
    root.classList.toggle('bt-narrow', narrow);
    drawCurve();
  }
  new ResizeObserver(resize).observe(spaceWrap);
  resize();
  camera.position.copy(homePos());
  let visible = false, raf = 0, last = 0;
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  // 一打開就面向東北季風、已經在轉
  { const up = dirOf(WINDS.ne.from); state.yaw = Math.atan2(-up.z, up.x); }
  state.rpm = rpm(state.v);
  for (let i = 0; i < 60; i++) step(0.03);
  setSpeed(8);
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  function focusPart(k) { if (parts[k]) { state.focus = k; state.focusT = 3.5; } }
  // 除錯：document.querySelector('[data-windturbine-lab]').__lab
  root.__lab = {
    camera, controls, state, setSpeed, setWind, lookInside, focus: focusPart,
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { controls.update(); updateLabels(); readout(); drawCurve(); renderer.render(scene, camera); },
  };
  return { ready: () => true, speed: (v) => setSpeed(parseFloat(v)), inside: lookInside, focus: focusPart };
}

lazyBoot('[data-windturbine-lab]', initLab, {
  speed: (lab, v) => lab.speed(v),
  inside: (lab) => lab.inside(),
});
