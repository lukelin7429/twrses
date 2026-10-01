/*
 * 萬物原理 · 第七課「GPS 怎麼知道你在哪裡？」的 3D 地球與 GPS 衛星（地球與軌道照真實比例，衛星畫得很大）。
 *
 * 一個機制：衛星不停廣播「我是誰、我在哪裡、現在幾點」；手機量出訊號走了多久，乘上光速＝離那顆衛星多遠。
 *   離一顆衛星某個距離的所有地點，在地表上連成一個圓；兩個圓交在兩點；第三個圓挑出你在的那一點。
 *   手機的時鐘若不準，每段距離都多算一樣多，圓就交不在一點——第四顆衛星讓手機連自己的時鐘誤差一起算出來。
 *
 * 場景：1 單位＝地球半徑 6,371 km；GPS 軌道半徑約 4.17。地球不轉（自轉沒畫），手機在彰化。
 *   24 顆衛星是 GPS 的基本設計（6 個軌道面 × 4），位置是示意的，不是今天真實衛星的位置。
 *   衛星繞行大幅加快、訊號（小光點）大幅放慢。計算都在 gpscalc.js（公里），這裡只負責畫。
 *
 * 產物：cd tools/science && npm run build → assets/js/gps-satellites.js
 */
import {
  AdditiveBlending, AmbientLight, BackSide, BoxGeometry, BufferGeometry, Color, ConeGeometry, DirectionalLight,
  DoubleSide, Float32BufferAttribute, Group, Line, LineBasicMaterial, LineDashedMaterial, LineSegments, MathUtils, Mesh,
  MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Points, PointsMaterial, RingGeometry, Scene,
  SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { makeRealEarth } from './earthtex.js';
import {
  C_KM_S, R_E, PERIOD_H, CHANGHUA, fromLatLon, constellation, elevationDeg, measuredRange, groundCircle,
  twoPoints, solveFix, pickSats, dist, travelSec,
} from './gpscalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const toV = (p, k = 1 / R_E) => V(p[0] * k, p[1] * k, p[2] * k);
const COLS = [0x4fd1ff, 0xff7ad9, 0x9cf25a, 0xffb02e];
const CSS_COLS = ['#4fd1ff', '#ff7ad9', '#9cf25a', '#ffb02e'];
const ERRS = [
  { s: 0, en: 'None', zh: '準確' },
  { s: 1e-6, en: '1 µs', zh: '百萬分之一秒' },
  { s: 1e-5, en: '10 µs', zh: '十萬分之一秒' },
  { s: 1e-4, en: '0.1 ms', zh: '萬分之一秒' },
  { s: 1e-3, en: '1 ms', zh: '千分之一秒' },
];
const SIM_H_PER_S = PERIOD_H / 150;   // 畫面上一圈 150 秒（真實約 12 小時，快了約 290 倍）
const PULSE_T = 1.4;                  // 訊號光點從衛星飛到手機的時間（真實約 0.07 秒，放慢約 20 倍）
const SEG = 200;

const MSG = {
  one: ['One satellite tells your phone how far away it is. Every place on this colored circle is exactly that far from the satellite, so you could be anywhere on it.',
    '一顆衛星告訴手機「你離我多遠」。這個彩色圓上的每一個地方，離衛星都剛好是這個距離，所以你可能在圓上的任何一點。'],
  two: ['A second satellite draws a second circle. The two circles cross at only two points, and you are at one of them.',
    '第二顆衛星畫出第二個圓。兩個圓只交在兩個點，你就在其中一點。'],
  three: ['A third circle passes through only one of those two points. That point is you! Finding a place from distances like this is called trilateration.',
    '第三個圓只通過那兩點中的一點，那一點就是你！像這樣用距離找出位置，叫做「三邊定位」。'],
  miss: ['Your phone’s clock is off, so every distance comes out too long by the same amount. The three circles no longer meet at one point, and the blue dot lands in the wrong place.',
    '手機的時鐘不準，每一段距離都多算了一樣多。三個圓不再交在同一點，藍點就跑到錯的地方。'],
  four: ['A fourth satellite gives the phone one more distance, enough to work out its own clock error too. The circles shrink back and meet exactly at you.',
    '第四顆衛星多給手機一段距離，剛好夠它把自己的時鐘誤差也算出來。圓縮回去，準準地交在你身上。'],
  fourOk: ['With four satellites, the phone finds where it is and what time it is at the same moment. Real phones use four or more satellites.',
    '有了四顆衛星，手機同時算出「我在哪裡」和「現在幾點」。真正的手機會用四顆以上的衛星。'],
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
  scene.background = new Color(0x050a18);
  const camera = new PerspectiveCamera(34, 1, 0.05, 300);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 1.5; controls.maxDistance = 40;
  controls.enablePan = false;

  // 彰化（公里與場景座標）、當地的東、北
  const rxKm = fromLatLon(CHANGHUA.lat, CHANGHUA.lon);
  const rx = toV(rxKm);
  const up = rx.clone().normalize();
  const east = V(0, 1, 0).cross(up).normalize();
  const north = up.clone().cross(east).normalize();

  scene.add(new AmbientLight(0xffffff, 0.45));
  const sun = new DirectionalLight(0xfff4e0, 1.7);
  sun.position.copy(up.clone().add(east.clone().multiplyScalar(0.7)).add(V(0, 0.3, 0)).multiplyScalar(20));
  scene.add(sun);

  // 星空
  {
    const n = 900, arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const u = Math.random() * 2 - 1, a = Math.random() * Math.PI * 2, s = Math.sqrt(1 - u * u);
      arr[i * 3] = 120 * s * Math.cos(a); arr[i * 3 + 1] = 120 * u; arr[i * 3 + 2] = 120 * s * Math.sin(a);
    }
    const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute(arr, 3));
    scene.add(new Points(g, new PointsMaterial({ color: 0xc9d6ff, size: 0.35, sizeAttenuation: true, transparent: true, opacity: 0.7 })));
  }

  // ---------------- 地球 ----------------
  const earth = new Mesh(new SphereGeometry(1, 128, 96), new MeshStandardMaterial({ map: makeRealEarth(), roughness: 0.92, metalness: 0 }));
  scene.add(earth);
  scene.add(new Mesh(new SphereGeometry(1.03, 64, 48), new MeshBasicMaterial({ color: 0x5aa8ff, transparent: true, opacity: 0.13, side: BackSide, depthWrite: false })));

  // 你（彰化）：紅色圖釘；藍點：手機算出來的位置
  const pin = new Group(); scene.add(pin);
  pin.position.copy(rx);
  pin.quaternion.setFromUnitVectors(V(0, 1, 0), up);
  const pinCone = at(new Mesh(new ConeGeometry(0.008, 0.045, 12), new MeshStandardMaterial({ color: 0xff4a4a })), 0, 0.022, 0);
  pinCone.rotation.x = Math.PI;
  pin.add(pinCone);
  pin.add(at(new Mesh(new SphereGeometry(0.012, 14, 10), new MeshStandardMaterial({ color: 0xff4a4a })), 0, 0.05, 0));
  const dot = new Group(); scene.add(dot);
  dot.add(new Mesh(new SphereGeometry(0.011, 16, 12), new MeshBasicMaterial({ color: 0x3d8bff })));
  const halo = new Mesh(new RingGeometry(0.014, 0.026, 32), new MeshBasicMaterial({ color: 0x8cc2ff, transparent: true, opacity: 0.55, side: DoubleSide, depthWrite: false }));
  dot.add(halo);
  const cand = [0, 1].map(() => { const m = new Mesh(new SphereGeometry(0.012, 12, 10), new MeshBasicMaterial({ color: 0xffffff })); scene.add(m); return m; });

  // ---------------- 軌道與衛星 ----------------
  const orbitG = new Group(); scene.add(orbitG);
  for (let p = 0; p < 6; p++) {
    const pts = [];
    for (let i = 0; i <= 128; i++) pts.push(toV(constellation(PERIOD_H * i / 128)[p * 4].pos));
    orbitG.add(new Line(new BufferGeometry().setFromPoints(pts), new LineBasicMaterial({ color: 0x6f86c0, transparent: true, opacity: 0.32 })));
  }
  const satMeshes = [];
  const panelMat = new MeshStandardMaterial({ color: 0x2b5fb8, metalness: 0.3, roughness: 0.5, emissive: 0x0b1d44 });
  for (let i = 0; i < 24; i++) {
    const g = new Group();
    const body = new Mesh(new BoxGeometry(0.07, 0.07, 0.09), new MeshStandardMaterial({ color: 0xdfe4ec, emissive: 0x000000, metalness: 0.4, roughness: 0.5 }));
    g.add(body);
    for (const s of [-1, 1]) g.add(at(new Mesh(new BoxGeometry(0.2, 0.006, 0.07), panelMat), s * 0.14, 0, 0));
    scene.add(g);
    satMeshes.push({ g, body });
  }

  // 地面上的圓（用一條帶子畫，比 1px 的線清楚）、距離圓錐（衛星連到圓上幾點）、訊號光點與連線
  const circles = COLS.map((c) => {
    const geo = new BufferGeometry();
    geo.setAttribute('position', new Float32BufferAttribute(new Float32Array((SEG + 1) * 2 * 3), 3));
    const idx = [];
    for (let i = 0; i < SEG; i++) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
    geo.setIndex(idx);
    const m = new Mesh(geo, new MeshBasicMaterial({ color: c, side: DoubleSide, transparent: true, opacity: 0.95, depthWrite: false }));
    m.renderOrder = 2; m.frustumCulled = false;
    scene.add(m);
    const cg = new BufferGeometry();
    cg.setAttribute('position', new Float32BufferAttribute(new Float32Array(24 * 2 * 3), 3));
    const cone = new LineSegments(cg, new LineBasicMaterial({ color: c, transparent: true, opacity: 0.22, depthWrite: false }));
    cone.frustumCulled = false;
    scene.add(cone);
    const lg = new BufferGeometry().setFromPoints([V(0, 0, 0), V(1, 1, 1)]);
    const link = new Line(lg, new LineDashedMaterial({ color: c, dashSize: 0.08, gapSize: 0.06, transparent: true, opacity: 0.7 }));
    link.frustumCulled = false;
    scene.add(link);
    const pulse = new Mesh(new SphereGeometry(0.028, 12, 10), new MeshBasicMaterial({ color: c, transparent: true, blending: AdditiveBlending, depthWrite: false }));
    scene.add(pulse);
    return { m, geo, cone, cg, link, lg, pulse };
  });

  // ---------------- 標籤 ----------------
  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    you: lab.add('bt-lb gp-lb-you', 'You (Changhua)<small>你（彰化）</small>'),
    dot: lab.add('bt-lb gp-lb-dot', 'Blue dot<small>藍點</small>'),
    orbit: lab.add('bt-lb ip-region', 'GPS orbit, 20,200 km up<small>GPS 軌道（高 20,200 公里）</small>'),
    cand: [0, 1].map(() => lab.add('bt-lb gp-lb-q', '?')),
    sats: COLS.map((c, i) => { const el = lab.add('bt-lb gp-lb-sat', ''); el.style.borderColor = CSS_COLS[i]; return el; }),
  };

  const R = {
    list: $('.gp-list'), where: $('.gp-where'), vis: $('.gp-vis'), clk: $('.gp-clk'), each: $('.gp-each'), off: $('.gp-off'),
    msg: $('.gp-msg'), err: $('.gp-err'), errOut: $('.gp-err-out'), play: $('.al-play'),
  };
  const state = {
    t: 0.4, n: 3, err: 0, labels: true, orbits: true, close: false, playing: true,
    used: [], corr: 0, lastMsg: '', lastList: '', fix: null,
  };

  // ---------------- 每格的計算 ----------------
  const tmp = V(0, 0, 0);
  function compute() {
    const sats = constellation(state.t);
    const elev = sats.map((s) => elevationDeg(rxKm, s.pos));
    if (state.used.length < 4 || state.used.some((id) => elev[id] < 12)) {
      state.used = pickSats(rxKm, sats, 4, 15).map((s) => s.id);
    }
    const n = Math.min(state.n, state.used.length);
    const use = state.used.slice(0, n).map((id) => sats[id]);
    const clockS = ERRS[state.err].s;
    const rho = use.map((s) => measuredRange(rxKm, s.pos, clockS));
    let fix = null, two = [];
    if (n >= 4) {
      const f = solveFix(use.map((s) => s.pos), rho, { clock: true, guess: state.fix && state.fix.pos });
      if (f.ok) fix = f;
    } else if (n === 3) {
      const f = solveFix(use.map((s) => s.pos), rho, { surface: true, guess: state.fix && state.fix.pos });
      if (f.ok) fix = f;
    } else if (n === 2) {
      two = twoPoints(use[0].pos, rho[0], use[1].pos, rho[1]);
    }
    state.fix = fix;
    const offKm = fix ? dist(fix.pos.map((v) => v * R_E / Math.hypot(...fix.pos)), rxKm) : null;
    return { sats, elev, use, rho, fix, two, n, clockS, offKm, vis: elev.filter((e) => e >= 10).length };
  }

  function setCircle(c, satKm, rhoKm) {
    const gc = groundCircle(satKm, rhoKm);
    c.m.visible = c.cone.visible = !!gc;
    if (!gc) return;
    const n = toV(gc.n, 1);
    const e1 = Math.abs(n.y) < 0.9 ? V(0, 1, 0).cross(n).normalize() : V(1, 0, 0).cross(n).normalize();
    const e2 = n.clone().cross(e1);
    const ang = Math.atan2(gc.r, gc.d);
    const w = state.close ? 0.0035 : 0.007;
    const pa = c.geo.attributes.position.array, ca = c.cg.attributes.position.array;
    const sp = toV(satKm);
    for (let i = 0; i <= SEG; i++) {
      const th = i / SEG * Math.PI * 2, ct = Math.cos(th), st = Math.sin(th);
      for (let k = 0; k < 2; k++) {
        const a = ang + (k ? w : -w), r = 1.004;
        tmp.copy(n).multiplyScalar(Math.cos(a)).addScaledVector(e1, Math.sin(a) * ct).addScaledVector(e2, Math.sin(a) * st).multiplyScalar(r);
        pa.set([tmp.x, tmp.y, tmp.z], (i * 2 + k) * 3);
      }
    }
    for (let j = 0; j < 24; j++) {
      const th = j / 24 * Math.PI * 2;
      tmp.copy(n).multiplyScalar(Math.cos(ang)).addScaledVector(e1, Math.sin(ang) * Math.cos(th)).addScaledVector(e2, Math.sin(ang) * Math.sin(th));
      ca.set([sp.x, sp.y, sp.z, tmp.x, tmp.y, tmp.z], j * 6);
    }
    c.geo.attributes.position.needsUpdate = true;
    c.cg.attributes.position.needsUpdate = true;
    c.geo.computeBoundingSphere();
  }

  // 從鏡頭看過去，p 是否被地球擋住
  const ray = V(0, 0, 0);
  function hidden(p) {
    ray.copy(p).sub(camera.position);
    const len = ray.length(); ray.divideScalar(len);
    const b = camera.position.dot(ray), c = camera.position.lengthSq() - 1;
    const disc = b * b - c;
    if (disc < 0) return false;
    const t = -b - Math.sqrt(disc);
    return t > 0 && t < len - 0.02;
  }

  let pulseT = 0;
  function step(dt) {
    if (state.playing) { state.t += dt * SIM_H_PER_S; pulseT += dt; }
    const info = compute();
    // 第四顆衛星：把解出的時鐘誤差慢慢從每段距離扣掉（看得到圓縮回去）
    const target = info.n >= 4 && info.fix ? info.fix.biasKm : 0;
    state.corr += (target - state.corr) * Math.min(1, dt * 2.2);
    if (Math.abs(target - state.corr) < 1e-4) state.corr = target;
    const usedSet = new Map(info.use.map((s, i) => [s.id, i]));
    info.sats.forEach((s, i) => {
      const sm = satMeshes[i];
      sm.g.position.copy(toV(s.pos));
      sm.g.lookAt(0, 0, 0);
      const k = usedSet.get(i);
      if (k != null) { sm.body.material.color.setHex(COLS[k]); sm.body.material.emissive.setHex(COLS[k]).multiplyScalar(0.45); }
      else if (info.elev[i] >= 10) { sm.body.material.color.setHex(0xf2f4f8); sm.body.material.emissive.setHex(0x222222); }
      else { sm.body.material.color.setHex(0x4a505c); sm.body.material.emissive.setHex(0x000000); }
    });
    circles.forEach((c, k) => {
      const on = k < info.n;
      c.m.visible = c.cone.visible = c.link.visible = c.pulse.visible = on;
      if (!on) return;
      const s = info.use[k];
      setCircle(c, s.pos, info.rho[k] - state.corr);
      const sp = toV(s.pos);
      c.lg.setFromPoints([sp, rx]);
      c.link.computeLineDistances();
      // 訊號光點：每 2.2 秒從衛星出發，PULSE_T 秒到手機（四顆錯開一點）
      const ph = ((pulseT + k * 0.25) % 2.2) / PULSE_T;
      c.pulse.visible = ph <= 1;
      if (ph <= 1) c.pulse.position.lerpVectors(sp, rx, ph);
      c.pulse.scale.setScalar(state.close ? 0.35 : 1);
    });
    orbitG.visible = state.orbits;
    // 藍點與兩個候選點
    dot.visible = !!info.fix;
    if (info.fix) {
      const p = toV(info.fix.pos); p.normalize().multiplyScalar(1.006);
      dot.position.copy(p);
      dot.quaternion.setFromUnitVectors(V(0, 0, 1), p.clone().normalize());
      const s = 1 + 0.25 * Math.sin(performance.now() / 260);
      halo.scale.set(s, s, 1);
    }
    cand.forEach((m, i) => { m.visible = info.n === 2 && !!info.two[i]; if (m.visible) m.position.copy(toV(info.two[i])).normalize().multiplyScalar(1.006); });
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 1.1);
      const k = MathUtils.smootherstep(fly.t, 0, 1);
      camera.position.lerpVectors(fly.p0, fly.p1, k);
      controls.target.lerpVectors(fly.t0, fly.t1, k);
    }
    return info;
  }

  let narrow = false;
  function updateLabels(info) {
    const on = state.labels;
    const show = (el, s, v, dy = 0) => { el.hidden = !s || hidden(v); if (!el.hidden) lab.place(el, v, dy); };
    show(L.you, true, rx.clone().multiplyScalar(1.0), -26);
    const off = info.offKm != null && info.offKm > 60;
    show(L.dot, on && info.fix && off, dot.position, 22);
    const op = toV(constellation(PERIOD_H * 0.62)[8].pos);
    show(L.orbit, on && state.orbits && !state.close && !narrow, op);
    L.cand.forEach((el, i) => show(el, on && info.n === 2 && !!info.two[i], cand[i].position, 20));
    L.sats.forEach((el, k) => {
      const s = info.use[k];
      if (!s) { el.hidden = true; return; }
      const html = narrow ? s.name : `${s.name}<small>${Math.round(info.rho[k] - state.corr).toLocaleString('en-US')} km</small>`;
      if (el.innerHTML !== html) el.innerHTML = html;
      show(el, on, toV(s.pos), -20);
    });
  }

  // ---------------- 讀數 ----------------
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const fmtDist = (km) => (km < 1 ? `${Math.round(km * 1000)} m` : km < 10 ? `${km.toFixed(1)} km` : `${Math.round(km).toLocaleString('en-US')} km`);
  function readout(info) {
    const rows = info.use.map((s, k) => {
      const ms = (travelSec(dist(rxKm, s.pos)) + info.clockS) * 1000;
      return `<li><i style="background:${CSS_COLS[k]}"></i><b>${s.name}</b><span>${ms.toFixed(1)} ms</span><span>${Math.round(info.rho[k]).toLocaleString('en-US')} km</span></li>`;
    }).join('');
    const listHtml = `<li class="gp-head"><i></i><b>Satellite<small>衛星</small></b><span>Travel time<small>訊號走了</small></span><span>Distance<small>距離</small></span></li>${rows}`;
    if (listHtml !== state.lastList) { R.list.innerHTML = listHtml; state.lastList = listHtml; }
    let where, key;
    if (info.n === 1) { where = ['Somewhere on this circle', '在這個圓上的某處']; key = 'one'; }
    else if (info.n === 2) { where = ['One of two points', '兩個點之一']; key = 'two'; }
    else if (info.n === 3) {
      if (info.clockS) { where = ['The circles miss!', '圓沒有交在一點！']; key = 'miss'; }
      else { where = ['Found you!', '找到你了！']; key = 'three'; }
    } else {
      where = info.clockS ? ['Found you, clock fixed', '找到你了，時鐘也校正了'] : ['Found you!', '找到你了！'];
      key = info.clockS ? 'four' : 'fourOk';
    }
    R.where.innerHTML = `${where[0]}<small>${where[1]}</small>`;
    R.where.classList.toggle('ok', key === 'three' || key === 'four' || key === 'fourOk');
    R.where.classList.toggle('bad', key === 'miss');
    R.vis.textContent = String(info.vis);
    R.clk.innerHTML = info.clockS ? `${ERRS[state.err].en}${info.n >= 4 ? '<small>fixed 已校正</small>' : ''}` : '0';
    R.each.textContent = info.clockS ? fmtDist(C_KM_S * info.clockS) : '0';
    R.off.textContent = info.offKm == null ? '—' : info.offKm < 0.005 ? '0 m' : fmtDist(info.offKm);
    R.errOut.innerHTML = `${ERRS[state.err].en} <small>${ERRS[state.err].zh}</small>`;
    R.err.style.setProperty('--p', `${state.err / 4 * 100}%`);
    const html = `${esc(MSG[key][0])}<span class="zh">${esc(MSG[key][1])}</span>`;
    if (html !== state.lastMsg) { R.msg.innerHTML = html; state.lastMsg = html; }
    root.querySelectorAll('[data-sats]').forEach((b) => b.setAttribute('aria-pressed', +b.getAttribute('data-sats') === state.n ? 'true' : 'false'));
  }

  // ---------------- 操作 ----------------
  const viewOf = (close) => {
    if (close) return [up.clone().multiplyScalar(2.75).addScaledVector(north, -0.55).addScaledVector(east, 0.15), up.clone().multiplyScalar(0.9)];
    const k = camera.aspect < 0.9 ? 1.5 : camera.aspect < 1.2 ? 1.15 : 1;
    const dir = up.clone().multiplyScalar(0.85).addScaledVector(east, 0.42).addScaledVector(north, -0.3).normalize();
    return [dir.multiplyScalar(15.5 * k), up.clone().multiplyScalar(0.9)];
  };
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo([p, t]) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0; }
  function setSats(n) { state.n = MathUtils.clamp(n | 0, 1, 4); }
  function setErr(i) { state.err = MathUtils.clamp(i | 0, 0, 4); R.err.value = String(state.err); }
  function setClose(v) { state.close = v; const t = $('[data-t="close"]'); if (t) t.checked = v; flyTo(viewOf(v)); }
  root.querySelectorAll('[data-sats]').forEach((b) => b.addEventListener('click', () => setSats(+b.getAttribute('data-sats'))));
  R.err.addEventListener('input', () => setErr(+R.err.value));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="orbits"]', (v) => { state.orbits = v; });
  bind('[data-t="close"]', setClose);
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  $('.al-home').addEventListener('click', () => flyTo(viewOf(state.close)));

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
    if (t - lastR > 150) { lastR = t; readout(info); }
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = camera.aspect < 0.9 ? 42 : 34;
    camera.updateProjectionMatrix();
    narrow = w < 560;
    root.classList.toggle('bt-narrow', narrow);
  }
  new ResizeObserver(resize).observe(spaceWrap);
  resize();
  {
    const [p, t] = viewOf(false);
    camera.position.copy(p); controls.target.copy(t);
  }
  let visible = false, raf = 0, last = 0;
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  setErr(0);
  readout(step(0.01));
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const DEMO = {
    one: () => { setErr(0); setSats(1); if (!state.close) setClose(true); },
    three: () => { setErr(0); setSats(3); if (!state.close) setClose(true); },
    clock: () => { setErr(4); setSats(3); state.corr = 0; if (!state.close) setClose(true); },
    four: () => { setErr(4); setSats(4); if (!state.close) setClose(true); },
  };
  // 除錯：document.querySelector('[data-gps-lab]').__lab
  root.__lab = {
    camera, controls, state, setSats, setErr, setClose, compute,
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { const i = step(0); controls.update(); updateLabels(i); readout(i); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => { if (DEMO[v]) DEMO[v](); } };
}

lazyBoot('[data-gps-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
