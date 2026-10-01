/*
 * 萬物原理 · 第六課「手機訊號怎麼在空中傳遞？」的 3D 山區訊號（自繪示意；距離約 1 單位＝1 公里，高度誇大）。
 *
 * 一個機制：手機和基地台之間用看不見的無線電波說話；波越走越弱，被山擋住更弱，所以山裡常收不到訊號。
 *   基地台再把訊號接進電纜網路（第五課），無線只是最後一小段。
 *
 * 場景：x 往右。左邊小鎮（平地）有基地台 A；x = 3 一道山脊；右邊山谷可以「加一座基地台 B」。
 *   你（登山客）沿著小路走（滑桿），手機連到訊號最強的基地台（換手＝handoff）。
 *   視線檢查：從基地台頂端連到手機的直線上取 40 點，只要有一點低於地形，就算被山擋住。
 *   地面顏色是訊號覆蓋圖：每個頂點都用同一套 radio.js 算格數（綠＝滿格 … 紅＝沒訊號）。
 *   一圈圈的環只是「電波從基地台往外傳」的示意，環的間距不是真實波長（真實 700 MHz 約 43 公分）。
 *
 * 產物：cd tools/science && npm run build → assets/js/cell-signal.js
 */
import {
  AmbientLight, BufferGeometry, Color, ConeGeometry, CylinderGeometry, DirectionalLight, DoubleSide,
  Float32BufferAttribute, Group, HemisphereLight, Line, LineBasicMaterial, LineDashedMaterial, MathUtils, Mesh,
  MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, PlaneGeometry, RingGeometry, Scene, SphereGeometry,
  Vector3, WebGLRenderer, BoxGeometry,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { BANDS, rxDbm, bars, wavelengthM, travelMicroseconds } from './radio.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const X0 = -6.5, X1 = 10.5, Z0 = -3.6, Z1 = 3.6;
const PATH_Z = 0.7, PHONE_H = 0.1, MAST = 1.1;
const BAR_COL = [0xd8382e, 0xff8a3a, 0xffd36e, 0xa6e05a, 0x3ad17a];

// 地形高度（單位：示意的公里，垂直誇大）
function ground(x, z) {
  const ridge = 2.1 * Math.exp(-(((x - 3) / 1.25) ** 2)) * (0.86 + 0.14 * Math.cos(z * 0.8 + 0.4));
  const hills = 0.12 * Math.sin(x * 0.9 + z * 0.6) + 0.08 * Math.cos(x * 1.7 - z * 1.1);
  const valley = 0.25 * Math.exp(-(((x - 8.8) / 1.2) ** 2)) * (1 + 0.5 * Math.abs(z) / 3);
  return Math.max(0.03, 0.15 + ridge + hills * (x > 0 ? 1 : 0.3) + valley);
}

const TOWERS = {
  A: { x: -3, z: -0.8, en: 'Base station in town', zh: '鎮上的基地台' },
  B: { x: 7.4, z: -0.9, en: 'New base station in the valley', zh: '山谷裡的新基地台' },
};
const top = (t) => V(t.x, ground(t.x, t.z) + MAST, t.z);

function blockedBetween(a, b) {
  for (let i = 1; i < 40; i++) {
    const t = i / 40;
    const x = a.x + (b.x - a.x) * t, z = a.z + (b.z - a.z) * t, y = a.y + (b.y - a.y) * t;
    if (ground(x, z) > y + 0.01) return true;
  }
  return false;
}

const MSG = {
  strong: ['Full signal. Your phone and the base station can “see” each other, so the radio waves arrive strong.',
    '訊號滿格。手機和基地台之間沒有東西擋著，無線電波送到時還很強。'],
  weak: ['The farther you go, the weaker the radio waves get. Your phone still has a connection, but videos may be slow.',
    '離得越遠，無線電波越弱。手機還連得上，但影片可能會卡。'],
  blocked: ['The mountain is in the way. Radio waves bend a little around it, but most of their strength is lost, so here you have little or no signal.',
    '山擋住了。無線電波會繞過山頂一點點，但大部分的力量都損失了，所以這裡訊號很弱，甚至沒有。'],
  handoff: ['Your phone switched to the base station in the valley because its signal is now stronger. This switch is called a handoff, and it happens without dropping your call.',
    '手機改連山谷裡的基地台，因為它現在的訊號比較強。這叫做「換手」，通話不會因此中斷。'],
  ridge: ['On top of the ridge, nothing blocks the view back to town, so you get signal again. That is why hikers often find a signal at the summit.',
    '站上山脊，往鎮上的視線沒有東西擋，訊號又回來了。所以登山客常在山頂找到訊號。'],
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
  scene.background = new Color(0x0e1a33);
  const camera = new PerspectiveCamera(34, 1, 0.1, 200);
  const TARGET = V(1.6, 0.7, 0);
  const homePos = () => TARGET.clone().add(V(-1.0, 8.5, 17.5).multiplyScalar(camera.aspect < 0.9 ? 1.45 : camera.aspect < 1.2 ? 1.05 : 1.02));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 4; controls.maxDistance = 50;
  controls.maxPolarAngle = Math.PI * 0.48;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xe6efff, 0x2a3320, 1.0));
  scene.add(new AmbientLight(0xffffff, 0.22));
  const sun = new DirectionalLight(0xfff1d6, 1.5); sun.position.set(-6, 12, 8); scene.add(sun);

  const R = {
    bars: $('.cs-bars'), barsT: $('.cs-bars-t'), km: $('.cs-km'), dbm: $('.cs-dbm'), los: $('.cs-los'), srv: $('.cs-srv'),
    us: $('.cs-us'), msg: $('.cs-msg'), pos: $('.cs-pos'), posOut: $('.cs-pos-out'), play: $('.al-play'), wl: $('.cs-wl'),
  };
  const lab = labeler($('.al-labels'), cv, camera);
  const state = { x: -2, band: 'low', towerB: false, coverage: true, labels: true, playing: true, serving: 'A', lastServing: 'A', handoffT: 0, lastMsg: '' };

  // ---------------- 地形（頂點顏色＝覆蓋圖） ----------------
  const SX = 136, SZ = 48;
  const geo = new PlaneGeometry(X1 - X0, Z1 - Z0, SX, SZ);
  geo.rotateX(-Math.PI / 2);
  geo.translate((X0 + X1) / 2, 0, (Z0 + Z1) / 2);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) pos.setY(i, ground(pos.getX(i), pos.getZ(i)));
  geo.computeVertexNormals();
  // 注意：Float32BufferAttribute 會複製陣列，所以之後要寫 geo.attributes.color.array，不能寫原本的 colors
  geo.setAttribute('color', new Float32BufferAttribute(new Float32Array(pos.count * 3), 3));
  const colors = geo.attributes.color.array;
  const terrain = new Mesh(geo, new MeshStandardMaterial({ vertexColors: true, roughness: 0.9, flatShading: false }));
  scene.add(terrain);
  const base = new Color(0x4f6b45), rock = new Color(0x7a7464), cc = new Color();
  function bestAt(x, z) {
    let best = -999, who = 'A', blk = false;
    const p = V(x, ground(x, z) + PHONE_H, z);
    for (const k of state.towerB ? ['A', 'B'] : ['A']) {
      const t = TOWERS[k], tp = top(t);
      const km = Math.hypot(x - t.x, z - t.z);
      const b = blockedBetween(tp, p);
      const r = rxDbm(km, state.band, b);
      if (r > best) { best = r; who = k; blk = b; }
    }
    return { dbm: best, who, blocked: blk };
  }
  function paintCoverage() {
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), z = pos.getZ(i), y = pos.getY(i);
      cc.copy(base).lerp(rock, MathUtils.clamp((y - 0.8) / 1.4, 0, 1));
      if (state.coverage) {
        const b = bars(bestAt(x, z).dbm);
        cc.lerp(new Color(BAR_COL[b]), 0.62);
      }
      colors[i * 3] = cc.r; colors[i * 3 + 1] = cc.g; colors[i * 3 + 2] = cc.b;
    }
    geo.attributes.color.needsUpdate = true;
  }

  // ---------------- 基地台 ----------------
  const towerG = {};
  const mastMat = new MeshStandardMaterial({ color: 0xd8dee8, metalness: 0.5, roughness: 0.4 });
  for (const [k, t] of Object.entries(TOWERS)) {
    const g = new Group(); g.position.set(t.x, ground(t.x, t.z), t.z); scene.add(g);
    g.add(at(new Mesh(new CylinderGeometry(0.035, 0.07, MAST, 10), mastMat), 0, MAST / 2, 0));
    for (let i = 0; i < 3; i++) {
      const panel = new Mesh(new BoxGeometry(0.06, 0.26, 0.14), new MeshStandardMaterial({ color: 0xf2f4f8 }));
      const a = i / 3 * Math.PI * 2;
      panel.position.set(Math.cos(a) * 0.1, MAST - 0.12, Math.sin(a) * 0.1); panel.rotation.y = -a;
      g.add(panel);
    }
    g.add(at(new Mesh(new SphereGeometry(0.05, 10, 8), new MeshBasicMaterial({ color: 0xff4a4a })), 0, MAST + 0.03, 0));
    towerG[k] = g;
  }
  towerG.B.visible = false;
  // 基地台 A 接到電纜網路（第五課）：一條往左下延伸的光纖
  const fiber = new Line(new BufferGeometry().setFromPoints([V(TOWERS.A.x, ground(TOWERS.A.x, TOWERS.A.z) + 0.02, TOWERS.A.z), V(-4.0, 0.12, 0.6), V(-5.0, 0.1, 2.4)]),
    new LineBasicMaterial({ color: 0x58e1ff }));
  scene.add(fiber);

  // ---------------- 你（登山客） ----------------
  const hiker = new Group(); scene.add(hiker);
  hiker.add(at(new Mesh(new CylinderGeometry(0.07, 0.09, 0.32, 12), new MeshStandardMaterial({ color: 0xffb02e })), 0, 0.16, 0));
  hiker.add(at(new Mesh(new SphereGeometry(0.075, 14, 10), new MeshStandardMaterial({ color: 0xf1d2b6 })), 0, 0.39, 0));
  const phoneGlow = at(new Mesh(new SphereGeometry(0.05, 10, 8), new MeshBasicMaterial({ color: 0x58e1ff })), 0.1, 0.3, 0.05);
  hiker.add(phoneGlow);
  // 小路
  const trailPts = [];
  for (let x = -4.6; x <= 9.4; x += 0.1) trailPts.push(V(x, ground(x, PATH_Z) + 0.02, PATH_Z));
  scene.add(new Line(new BufferGeometry().setFromPoints(trailPts), new LineDashedMaterial({ color: 0xf6e7c8, dashSize: 0.12, gapSize: 0.08 })).computeLineDistances());

  // 連線：手機 ↔ 服務中的基地台
  const linkGeo = new BufferGeometry().setFromPoints([V(0, 0, 0), V(1, 1, 1)]);
  const linkMat = new LineDashedMaterial({ color: 0x3ad17a, dashSize: 0.25, gapSize: 0.12, transparent: true, opacity: 0.95 });
  const link = new Line(linkGeo, linkMat); scene.add(link);
  const blockMark = new Group(); scene.add(blockMark);
  for (const s of [-1, 1]) { const b = new Mesh(new BoxGeometry(0.5, 0.07, 0.07), new MeshBasicMaterial({ color: 0xff4a4a })); b.rotation.z = s * Math.PI / 4; blockMark.add(b); }

  // ---------------- 電波（示意的環） ----------------
  const RINGS = [];
  const ringGeo = new RingGeometry(0.96, 1, 64);
  function spawnRing(k) {
    const m = new Mesh(ringGeo, new MeshBasicMaterial({ color: state.band === 'low' ? 0x4fd1c5 : 0xb89cff, transparent: true, opacity: 0.6, side: DoubleSide, depthWrite: false }));
    m.rotation.x = -Math.PI / 2;
    m.position.copy(top(TOWERS[k])).setY(top(TOWERS[k]).y - 0.12);
    scene.add(m);
    RINGS.push({ m, t: 0 });
  }
  let ringT = 0;

  // ---------------- 標籤 ----------------
  const LB = {
    A: [lab.add('bt-lb', `${TOWERS.A.en}<small>${TOWERS.A.zh}</small>`), () => top(TOWERS.A).add(V(0.3, 0.95, 0))],
    B: [lab.add('bt-lb bt-lb-b', `${TOWERS.B.en}<small>${TOWERS.B.zh}</small>`), () => top(TOWERS.B).add(V(0, 0.45, 0))],
    town: [lab.add('bt-lb ip-region', 'Town<small>小鎮</small>'), () => V(-4.2, 0.3, 2.6)],
    mtn: [lab.add('bt-lb ip-region', 'Mountain ridge<small>山脊</small>'), () => V(3, ground(3, -2.6) + 0.3, -2.6)],
    valley: [lab.add('bt-lb ip-region', 'Valley<small>山谷</small>'), () => V(8.6, 0.6, 2.7)],
    you: [lab.add('bt-lb bt-lb-b cs-you', 'You'), () => hiker.position.clone().add(V(0, 0.75, 0))],
    fiber: [lab.add('bt-lb bt-lb-el', 'To the cable network (Lesson 5)<small>接到電纜網路（第五課）</small>'), () => V(-4.6, -0.2, 1.6)],
    blocked: [lab.add('bt-lb ip-lb-lost', 'Blocked by the mountain<small>被山擋住</small>'), () => blockMark.position.clone().add(V(0, 0.5, 0))],
  };
  let narrow = false;
  function updateLabels(info) {
    const on = state.labels;
    for (const [k, [el, f]] of Object.entries(LB)) {
      let s = on;
      if (k === 'B') s = s && state.towerB;
      if (k === 'blocked') s = info.blocked;
      if (k === 'you') s = true;
      if (narrow && (k === 'fiber' || k === 'town' || k === 'valley')) s = false;
      el.hidden = !s;
      if (s) lab.place(el, f());
    }
    const b = bars(info.dbm);
    LB.you[0].innerHTML = `You · 你 <b class="cs-mini b${b}">${'▮'.repeat(b)}${'▯'.repeat(4 - b)}</b>`;
  }

  // ---------------- 讀數 ----------------
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function measure() {
    const p = V(state.x, ground(state.x, PATH_Z) + PHONE_H, PATH_Z);
    const r = bestAt(state.x, PATH_Z);
    const t = TOWERS[r.who];
    return { ...r, p, km: Math.hypot(state.x - t.x, PATH_Z - t.z), tp: top(t) };
  }
  function readout(info) {
    const b = bars(info.dbm);
    R.bars.dataset.b = String(b);
    R.barsT.innerHTML = b ? `${b} bar${b > 1 ? 's' : ''}<small>${b} 格</small>` : 'No service<small>沒有訊號</small>';
    R.km.textContent = `${info.km.toFixed(1)} km`;
    R.dbm.textContent = `${Math.round(info.dbm)} dBm`;
    R.los.innerHTML = info.blocked ? 'Blocked<small>被擋住</small>' : 'Clear<small>看得到</small>';
    R.los.classList.toggle('bad', info.blocked);
    R.srv.innerHTML = `${info.who === 'A' ? 'Town' : 'Valley'}<small>${info.who === 'A' ? '鎮上' : '山谷'}</small>`;
    R.us.textContent = `${travelMicroseconds(info.km).toFixed(0)} µs`;
    R.posOut.textContent = `${state.x.toFixed(1)} km`;
    R.pos.style.setProperty('--p', `${(state.x + 4.5) / 13.5 * 100}%`);
    R.wl.textContent = `${Math.round(wavelengthM(BANDS[state.band].mhz) * 100)} cm`;
    let key = info.blocked ? 'blocked' : b >= 4 ? 'strong' : 'weak';
    if (!info.blocked && state.x > 2.2 && state.x < 3.8 && info.who === 'A') key = 'ridge';
    if (state.handoffT > 0) key = 'handoff';
    const html = `${esc(MSG[key][0])}<span class="zh">${esc(MSG[key][1])}</span>`;
    if (html !== state.lastMsg) { R.msg.innerHTML = html; state.lastMsg = html; }
    root.querySelectorAll('[data-band]').forEach((x) => x.setAttribute('aria-pressed', x.getAttribute('data-band') === state.band ? 'true' : 'false'));
  }

  // ---------------- 操作 ----------------
  function setX(x) { state.x = MathUtils.clamp(x, -4.5, 9); R.pos.value = String(state.x); }
  R.pos.addEventListener('input', () => setX(parseFloat(R.pos.value)));
  function setBand(k) { if (BANDS[k]) { state.band = k; paintCoverage(); } }
  root.querySelectorAll('[data-band]').forEach((b) => b.addEventListener('click', () => setBand(b.getAttribute('data-band'))));
  function setTowerB(v) { state.towerB = v; towerG.B.visible = v; const t = $('[data-t="towerB"]'); if (t) t.checked = v; paintCoverage(); }
  function setCoverage(v) { state.coverage = v; const t = $('[data-t="coverage"]'); if (t) t.checked = v; paintCoverage(); }
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="coverage"]', setCoverage);
  bind('[data-t="towerB"]', setTowerB);
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  $('.al-home').addEventListener('click', () => flyTo(homePos(), TARGET));
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0; }

  // ---------------- 迴圈 ----------------
  function step(dt) {
    const info = measure();
    hiker.position.set(state.x, ground(state.x, PATH_Z), PATH_Z);
    if (info.who !== state.lastServing) { state.handoffT = 3; state.lastServing = info.who; }
    if (state.handoffT > 0) state.handoffT -= dt;
    const b = bars(info.dbm);
    linkGeo.setFromPoints([info.tp, info.p]);
    link.computeLineDistances();
    linkMat.color.setHex(BAR_COL[b]);
    linkMat.dashSize = b ? 0.5 : 0.12; linkMat.gapSize = b ? 0.05 : 0.18;
    phoneGlow.material.color.setHex(BAR_COL[b]);
    // 擋住的地方：連線上最高的地形點
    blockMark.visible = info.blocked;
    if (info.blocked) {
      let best = -1, bp = V(0, 0, 0);
      for (let i = 1; i < 40; i++) {
        const t = i / 40;
        const x = info.tp.x + (info.p.x - info.tp.x) * t, z = info.tp.z + (info.p.z - info.tp.z) * t;
        const over = ground(x, z) - (info.tp.y + (info.p.y - info.tp.y) * t);
        if (over > best) { best = over; bp.set(x, ground(x, z) + 0.1, z); }
      }
      blockMark.position.copy(bp);
      blockMark.lookAt(camera.position);
    }
    if (state.playing) {
      ringT -= dt;
      if (ringT <= 0) { spawnRing('A'); if (state.towerB) spawnRing('B'); ringT = 0.8; }
    }
    for (let i = RINGS.length - 1; i >= 0; i--) {
      const r = RINGS[i];
      if (state.playing) r.t += dt / 3.2;
      const s = 0.2 + r.t * 7;
      r.m.scale.set(s, s, 1);
      r.m.material.opacity = 0.55 * (1 - r.t);
      if (r.t >= 1) { scene.remove(r.m); r.m.material.dispose(); RINGS.splice(i, 1); }
    }
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 0.9);
      const k = MathUtils.smootherstep(fly.t, 0, 1);
      camera.position.lerpVectors(fly.p0, fly.p1, k);
      controls.target.lerpVectors(fly.t0, fly.t1, k);
    }
    return info;
  }
  let lastR = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    const info = step(dt);
    controls.update();
    updateLabels(info);
    if (t - lastR > 120) { lastR = t; readout(info); }
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

  paintCoverage();
  setX(-2);
  readout(step(0.01));
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const DEMO = {
    town: () => { setTowerB(false); setBand('low'); setX(-2); },
    behind: () => { setTowerB(false); setBand('low'); setX(6.6); },
    tower: () => { setBand('low'); setX(6.6); setTowerB(true); },
    high: () => { setTowerB(false); setBand('high'); setX(0.8); },
  };
  // 除錯：document.querySelector('[data-cellsignal-lab]').__lab
  root.__lab = {
    camera, controls, state, setX, setBand, setTowerB, setCoverage, measure,
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { const i = step(0); controls.update(); updateLabels(i); readout(i); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => { if (DEMO[v]) DEMO[v](); } };
}

lazyBoot('[data-cellsignal-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
