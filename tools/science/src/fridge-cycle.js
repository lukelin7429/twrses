/*
 * 萬物原理 · 第十六課「冰箱怎麼讓食物變冷？」的 3D 透明冰箱（自繪示意；管路畫得比真的粗、比真的少）。
 *
 * 一個機制：冰箱不是製造冷，是把裡面的熱搬到外面。冷媒繞一圈——
 *   壓縮機（壓成又熱又擠的氣體）→ 背後的散熱管（把熱放到廚房、變成液體）→ 毛細管（壓力驟降、變得很冷）
 *   → 裡面的蒸發器（蒸發、把食物的熱吸走）→ 回壓縮機。
 *
 * 場景：冰箱門朝 +z、背面朝 −z，鏡頭在右後方；外殼半透明，看得到裡面的蒸發器和背後的散熱管。
 *   粒子顏色＝冷熱（紅熱、藍冷），大小與疏密＝氣體（大而疏）或液體（小而密）。橘色小光點＝熱。
 *   溫度用 fridgecalc.js 的簡化模型（1 秒 ≈ 模型裡的 4 分鐘）。
 *
 * 產物：cd tools/science && npm run build → assets/js/fridge-cycle.js
 */
import {
  AmbientLight, BoxGeometry, CatmullRomCurve3, Color, CylinderGeometry, DirectionalLight, EdgesGeometry, Group,
  HemisphereLight, InstancedMesh, LineBasicMaterial, LineSegments, MathUtils, Matrix4, Mesh, MeshBasicMaterial,
  MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry, TubeGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { STAGES, refrigerantAt, spacing, step as stepTemp, heatFlows, ON_ABOVE } from './fridgecalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const MIN_PER_SEC = 4;
const W = 0.7, H = 3.2, ZB = -0.7, ZF = 0.6;        // 外殼：x ∈ [−W, W]、y ∈ [0, H]、z ∈ [ZB, ZF]
const ZC = -0.86, ZE = -0.5;                        // 散熱管、蒸發器所在的平面

// ---------------- 冷媒的路徑（每一段是一串折線點） ----------------
function serpentine(x0, x1, y0, y1, rows, z) {
  const pts = [];
  for (let r = 0; r < rows; r++) {
    const y = y0 + (y1 - y0) * (r / (rows - 1));
    pts.push(r % 2 ? V(x1, y, z) : V(x0, y, z), r % 2 ? V(x0, y, z) : V(x1, y, z));
  }
  return pts;
}
const COMP = V(0.1, 0.3, -0.95);
const PATH = {
  compressor: [V(-0.12, 0.3, -0.95), V(0.3, 0.3, -0.95)],
  condenser: [V(0.3, 0.3, -0.95), V(0.6, 0.45, ZC), V(0.6, 1.95, ZC), ...serpentine(0.5, -0.5, 1.9, 0.75, 7, ZC)],
  capillary: [V(-0.5, 0.75, ZC), V(-0.62, 0.75, ZC), V(-0.62, 2.95, ZC), V(-0.5, 2.95, ZE)],
  evaporator: [V(-0.5, 2.95, ZE), ...serpentine(-0.5, 0.5, 2.9, 2.15, 5, ZE), V(0.5, 2.0, ZE), V(0.42, 0.6, -0.62), V(-0.12, 0.3, -0.95)],
};
const segLen = (pts) => pts.slice(1).reduce((a, p, i) => a + p.distanceTo(pts[i]), 0);
function pointOn(pts, k, out) {
  let d = k * segLen(pts);
  for (let i = 1; i < pts.length; i++) {
    const l = pts[i].distanceTo(pts[i - 1]);
    if (d <= l || i === pts.length - 1) return out.lerpVectors(pts[i - 1], pts[i], l ? Math.min(1, d / l) : 0);
    d -= l;
  }
  return out;
}
// u ∈ [0,1) → 位置
function posAt(u, out) {
  const st = STAGES.find((s) => u >= s.from && u < s.to) || STAGES[0];
  return pointOn(PATH[st.key], (u - st.from) / (st.to - st.from), out);
}
// 「冷媒量座標」m → u：氣體疏、液體密（同樣多的冷媒，氣體佔的管子比較長）
const TABLE = (() => {
  const n = 800, acc = [0], tmpA = V(0, 0, 0), tmpB = V(0, 0, 0);
  for (let i = 1; i <= n; i++) {
    const u0 = (i - 1) / n, u1 = Math.min(0.99999, i / n);
    acc.push(acc[i - 1] + posAt(u0, tmpA).distanceTo(posAt(u1, tmpB)) / spacing((u0 + u1) / 2));
  }
  return { n, acc, total: acc[n] };
})();
function uOfM(m) {
  const target = (((m % 1) + 1) % 1) * TABLE.total;
  let lo = 0, hi = TABLE.n;
  while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (TABLE.acc[mid] <= target) lo = mid; else hi = mid; }
  const k = (target - TABLE.acc[lo]) / Math.max(1e-9, TABLE.acc[hi] - TABLE.acc[lo]);
  return Math.min(0.99999, (lo + k) / TABLE.n);
}
const RAMP = [[0, new Color(0x2f7bff)], [0.3, new Color(0x8fd0ff)], [0.6, new Color(0xffb347)], [1, new Color(0xff4a2a)]];
function rampColor(h, out) {
  for (let i = 1; i < RAMP.length; i++) {
    if (h <= RAMP[i][0]) return out.copy(RAMP[i - 1][1]).lerp(RAMP[i][1], (h - RAMP[i - 1][0]) / (RAMP[i][0] - RAMP[i - 1][0]));
  }
  return out.copy(RAMP[RAMP.length - 1][1]);
}

const MSG = {
  run: ['The compressor is running. Cold refrigerant inside soaks up heat from the food, and the hot coil on the back gives that heat to the kitchen.',
    '壓縮機在運轉。裡面很冷的冷媒把食物的熱吸走，背後熱熱的散熱管再把這些熱交給廚房。'],
  rest: ['Cold enough, so the compressor rests. Heat slowly leaks in through the walls. When the inside warms up a little, the compressor will start again.',
    '夠冷了，壓縮機先休息。熱會慢慢從牆壁滲進來；裡面稍微變暖，壓縮機就會再啟動。'],
  door: ['The door is open! Warm kitchen air pours in much faster than the refrigerant can carry heat out. The compressor never gets to rest.',
    '門開著！廚房的暖空氣湧進來，比冷媒搬熱的速度快得多，壓縮機完全沒辦法休息。'],
  off: ['Unplugged. Nothing is moving the heat out any more, so the inside slowly warms up to the temperature of the kitchen.',
    '插頭拔掉了。沒有東西把熱搬出去，裡面就慢慢暖到和廚房一樣的溫度。'],
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
  scene.background = new Color(0x0f1930);
  const camera = new PerspectiveCamera(34, 1, 0.1, 100);
  const TARGET = V(0, 1.6, -0.25);
  const homePos = () => TARGET.clone().add(V(6.0, 1.2, -3.9).multiplyScalar(camera.aspect < 0.7 ? 1.25 : camera.aspect < 0.95 ? 1.0 : 0.9));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 2.5; controls.maxDistance = 22;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xe6efff, 0x223044, 1.0));
  scene.add(new AmbientLight(0xffffff, 0.35));
  const sun = new DirectionalLight(0xffffff, 1.1); sun.position.set(6, 8, -6); scene.add(sun);

  // ---------------- 冰箱外殼（半透明）、門、層板、食物 ----------------
  const shellMat = new MeshStandardMaterial({ color: 0xdfe6f2, transparent: true, opacity: 0.1, depthWrite: false, roughness: 0.4 });
  const edgeMat = new LineBasicMaterial({ color: 0xcfd8ea, transparent: true, opacity: 0.7 });
  const bodyGeo = new BoxGeometry(W * 2, H, ZF - ZB);
  scene.add(at(new Mesh(bodyGeo, shellMat), 0, H / 2, (ZF + ZB) / 2));
  scene.add(at(new LineSegments(new EdgesGeometry(bodyGeo), edgeMat), 0, H / 2, (ZF + ZB) / 2));
  scene.add(at(new Mesh(new BoxGeometry(6, 0.06, 5), new MeshStandardMaterial({ color: 0x2a3548, roughness: 0.9 })), 0, -0.03, 0));
  // 裡面的空氣：冷是藍的，暖了變橘
  const airMat = new MeshBasicMaterial({ color: 0x4aa8ff, transparent: true, opacity: 0.2, depthWrite: false });
  scene.add(at(new Mesh(new BoxGeometry(W * 2 - 0.16, H - 0.75, ZF - ZB - 0.16), airMat), 0, H / 2 + 0.3, (ZF + ZB) / 2));
  // 門（鉸鏈在 x = −W）
  const door = new Group(); at(door, -W, 0, ZF); scene.add(door);
  const doorGeo = new BoxGeometry(W * 2, H, 0.1);
  door.add(at(new Mesh(doorGeo, new MeshStandardMaterial({ color: 0xe8edf5, transparent: true, opacity: 0.28, depthWrite: false })), W, H / 2, 0.05));
  door.add(at(new LineSegments(new EdgesGeometry(doorGeo), edgeMat), W, H / 2, 0.05));
  door.add(at(new Mesh(new BoxGeometry(0.06, 0.9, 0.08), new MeshStandardMaterial({ color: 0x8a96ad })), W * 2 - 0.12, 1.7, 0.14));
  // 層板與食物
  const glassMat = new MeshStandardMaterial({ color: 0xbfd6ee, transparent: true, opacity: 0.3, depthWrite: false });
  const FOOD = [];
  [0.75, 1.4, 2.05].forEach((y, i) => {
    scene.add(at(new Mesh(new BoxGeometry(W * 2 - 0.2, 0.03, 0.9), glassMat), 0, y, 0.05));
    const items = [
      [[-0.4, 0.16, 0.1], 0xff6b5a, 's'], [[0.0, 0.2, 0.2], 0x7cf29a, 'c'], [[0.38, 0.13, 0.0], 0xffd36e, 'b'],
    ];
    items.forEach(([p, col, kind], k) => {
      const geo = kind === 's' ? new SphereGeometry(0.15, 16, 12) : kind === 'c' ? new CylinderGeometry(0.1, 0.1, 0.4, 14) : new BoxGeometry(0.28, 0.24, 0.3);
      const m = at(new Mesh(geo, new MeshStandardMaterial({ color: [col, 0x58b4ff, 0xff7ad9][(i + k) % 3 === 0 ? 0 : (i + k) % 3], roughness: 0.6 })), p[0], y + p[1] + 0.02, p[2]);
      scene.add(m); FOOD.push(m.position.clone());
    });
  });

  // ---------------- 管路 ----------------
  const TUBE = { compressor: [0x6b7385, 0.03], condenser: [0x7a2a1c, 0.032], capillary: [0x9a8f6a, 0.012], evaporator: [0x1f4f9a, 0.032] };
  for (const key of Object.keys(PATH)) {
    const curve = new CatmullRomCurve3(PATH[key], false, 'catmullrom', 0.02);
    scene.add(new Mesh(new TubeGeometry(curve, PATH[key].length * 10, TUBE[key][1], 8),
      new MeshStandardMaterial({ color: TUBE[key][0], transparent: true, opacity: 0.55, depthWrite: false, roughness: 0.5 })));
  }
  // 壓縮機
  const compMat = new MeshStandardMaterial({ color: 0x2b303b, metalness: 0.5, roughness: 0.4, emissive: 0x000000 });
  const comp = at(new Mesh(new SphereGeometry(0.3, 24, 16), compMat), COMP.x, COMP.y, COMP.z); comp.scale.set(1.15, 0.85, 0.75); scene.add(comp);

  // ---------------- 冷媒粒子 ----------------
  const N = 170;
  const drops = new InstancedMesh(new SphereGeometry(1, 10, 8), new MeshBasicMaterial({ color: 0xffffff }), N);
  drops.frustumCulled = false; scene.add(drops);
  // ---------------- 熱（橘色小光點） ----------------
  const NH = 66;
  const heatMesh = new InstancedMesh(new SphereGeometry(1, 8, 6), new MeshBasicMaterial({ color: 0xffa23a, transparent: true, opacity: 0.85 }), NH);
  heatMesh.frustumCulled = false; scene.add(heatMesh);
  const heat = Array.from({ length: NH }, (_, i) => ({ kind: i < 24 ? 'in' : i < 48 ? 'out' : 'door', t: Math.random(), a: V(0, 0, 0), b: V(0, 0, 0), live: false }));
  const rnd = (a, b) => a + Math.random() * (b - a);
  function respawn(h) {
    if (h.kind === 'in') {            // 食物 → 蒸發器
      h.a.copy(FOOD[Math.floor(Math.random() * FOOD.length)]);
      h.b.set(rnd(-0.5, 0.5), rnd(2.15, 2.9), ZE + 0.03);
    } else if (h.kind === 'out') {    // 散熱管 → 廚房
      h.a.set(rnd(-0.5, 0.5), rnd(0.75, 1.9), ZC);
      h.b.set(h.a.x + rnd(-0.3, 0.3), h.a.y + rnd(0.5, 1.1), ZC - rnd(0.7, 1.3));
    } else {                          // 門外的暖空氣 → 裡面
      h.a.set(rnd(-0.2, 1.4), rnd(0.8, 2.9), ZF + rnd(0.9, 1.5));
      h.b.set(rnd(-0.5, 0.5), rnd(0.8, 2.8), rnd(-0.3, 0.3));
    }
    h.t = 0; h.live = true;
  }

  // ---------------- 標籤 ----------------
  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    comp: lab.add('bt-lb bt-lb-a', '<b>1</b> Compressor<small>壓縮機</small>'),
    cond: lab.add('bt-lb fr-lb-hot', '<b>2</b> Condenser coil: heat goes out<small>散熱管：熱送到廚房</small>'),
    cap: lab.add('bt-lb bt-lb-b', '<b>3</b> Capillary tube<small>毛細管</small>'),
    evap: lab.add('bt-lb fr-lb-cold', '<b>4</b> Evaporator: heat is soaked up<small>蒸發器：把熱吸走</small>'),
    inside: lab.add('bt-lb fr-lb-temp', ''),
    room: lab.add('bt-lb ip-region', ''),
    door: lab.add('bt-lb ip-lb-lost', 'Door open: warm air pours in<small>門開著：暖空氣湧進來</small>'),
  };

  const R = {
    room: $('.fr-room'), roomOut: $('.fr-room-out'), status: $('.fr-status'), tin: $('.fr-tin'), tout: $('.fr-tout'), comp: $('.fr-comp'),
    b1: $('.fr-bar-in'), b2: $('.fr-bar-el'), b3: $('.fr-bar-out'), doorBtn: $('.fr-door'), msg: $('.fr-msg'), play: $('.al-play'),
  };
  const state = {
    T: 4, running: false, room: 28, door: false, plugged: true, labels: true, heat: true, playing: true,
    flow: 0, m: 0, doorK: 0, lastMsg: '',
  };

  // ---------------- 每格 ----------------
  const tmpV = V(0, 0, 0), tmpC = new Color(), tmpM = new Matrix4();
  function step(dt) {
    const h = state.playing ? dt : 0;
    if (h) {
      let left = h * MIN_PER_SEC;
      while (left > 0) {       // 小步走，溫控的開關才準
        const d = Math.min(0.1, left); left -= d;
        const s = stepTemp({ T: state.T, running: state.running }, { room: state.room, door: state.door, plugged: state.plugged }, d);
        state.T = s.T; state.running = s.running;
      }
      state.flow += ((state.running ? 1 : 0) - state.flow) * Math.min(1, h * 2.5);
      state.m += h * 0.06 * state.flow;
      state.doorK += ((state.door ? 1 : 0) - state.doorK) * Math.min(1, h * 5);
    }
    door.rotation.y = -state.doorK * 1.75;
    // 冷媒
    for (let i = 0; i < N; i++) {
      const u = uOfM(state.m + i / N), r = refrigerantAt(u);
      posAt(u, tmpV);
      const sc = MathUtils.lerp(0.05, 0.028, r.liquid) * (r.stage === 'capillary' ? 0.6 : 1);
      tmpM.makeScale(sc, sc, sc).setPosition(tmpV);
      drops.setMatrixAt(i, tmpM);
      // 停機一陣子後，冷熱的差別慢慢消失
      drops.setColorAt(i, rampColor(MathUtils.lerp(0.45, r.hot, 0.25 + 0.75 * state.flow), tmpC));
    }
    drops.instanceMatrix.needsUpdate = true; if (drops.instanceColor) drops.instanceColor.needsUpdate = true;
    // 熱
    for (let i = 0; i < NH; i++) {
      const p = heat[i];
      const want = state.heat && (p.kind === 'door' ? state.doorK > 0.5 : state.flow > 0.4);
      if (p.live) { p.t += h * (p.kind === 'door' ? 0.9 : 0.55); if (p.t >= 1) p.live = false; }
      if (!p.live && want && h && Math.random() < h * 1.6) respawn(p);
      const s = p.live ? 0.04 * Math.sin(Math.PI * Math.min(1, p.t)) : 0;
      tmpV.lerpVectors(p.a, p.b, p.t);
      tmpM.makeScale(s, s, s).setPosition(tmpV);
      heatMesh.setMatrixAt(i, tmpM);
    }
    heatMesh.instanceMatrix.needsUpdate = true;
    // 裡面的空氣顏色、壓縮機
    const warm = MathUtils.clamp((state.T - 4) / 20, 0, 1);
    airMat.color.setRGB(MathUtils.lerp(0.29, 1.0, warm), MathUtils.lerp(0.66, 0.6, warm), MathUtils.lerp(1.0, 0.25, warm));
    compMat.emissive.setRGB(0.1 * state.flow, 0.025 * state.flow, 0.01 * state.flow);
    comp.position.x = COMP.x + (state.flow > 0.3 && state.playing ? Math.sin(performance.now() / 18) * 0.004 : 0);
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 0.9);
      const k = MathUtils.smootherstep(fly.t, 0, 1);
      camera.position.lerpVectors(fly.p0, fly.p1, k);
      controls.target.lerpVectors(fly.t0, fly.t1, k);
    }
  }

  let narrow = false;
  function updateLabels() {
    const on = state.labels;
    const show = (el, s, v, dy = 0) => { el.hidden = !s; if (s) lab.place(el, v, dy); };
    const mx = (el, px) => { el.style.marginLeft = `${narrow ? px * 0.35 : px}px`; };
    show(L.comp, on, V(COMP.x, COMP.y, COMP.z), narrow ? 30 : 0); mx(L.comp, narrow ? 0 : 120);
    show(L.cond, on, V(0.5, 1.2, ZC), 0); mx(L.cond, 175);
    show(L.cap, on && !narrow, V(-0.62, 2.45, ZC), 0); mx(L.cap, 105);
    show(L.evap, on, V(0, 2.95, ZE), -30); mx(L.evap, -60);
    L.inside.innerHTML = `Inside ${state.T.toFixed(1)}°C<small>冰箱裡</small>`;
    show(L.inside, true, V(0, 0.42, 0.2), 0);
    L.room.innerHTML = `Kitchen ${state.room}°C<small>廚房</small>`;
    show(L.room, on, narrow ? V(-0.3, 3.3, ZC - 0.6) : V(0.3, 2.7, ZC - 1.0), narrow ? -52 : 0); mx(L.room, narrow ? 0 : 60);
    show(L.door, state.doorK > 0.5, V(-0.2, 2.2, ZF + 1.0), 0);
  }

  // ---------------- 讀數 ----------------
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function readout() {
    R.roomOut.textContent = `${state.room}°C`;
    R.room.style.setProperty('--p', `${(state.room - 18) / 18 * 100}%`);
    R.tin.textContent = `${state.T.toFixed(1)}°C`;
    R.tout.textContent = `${state.room}°C`;
    R.comp.innerHTML = !state.plugged ? 'Off<small>沒電</small>' : state.running ? 'Running<small>運轉中</small>' : 'Resting<small>休息中</small>';
    const f = heatFlows(state.running);
    R.b1.style.setProperty('--w', `${f.inside / 3 * 100}%`); R.b1.querySelector('b').textContent = String(f.inside);
    R.b2.style.setProperty('--w', `${f.electric / 3 * 100}%`); R.b2.querySelector('b').textContent = String(f.electric);
    R.b3.style.setProperty('--w', `${f.kitchen / 3 * 100}%`); R.b3.querySelector('b').textContent = String(f.kitchen);
    let key, st;
    if (!state.plugged) { key = 'off'; st = ['Unplugged: warming up', '沒插電：慢慢變暖', 'bad']; }
    else if (state.door) { key = 'door'; st = ['Door open: too much heat', '門開著：熱進來太多', 'bad']; }
    else if (state.running) { key = 'run'; st = [state.T > ON_ABOVE + 1.5 ? 'Cooling down' : 'Moving heat out', state.T > ON_ABOVE + 1.5 ? '正在降溫' : '正在把熱搬出去', 'ok']; }
    else { key = 'rest'; st = ['Cold enough: resting', '夠冷了：休息中', '']; }
    R.status.innerHTML = `${st[0]}<small>${st[1]}</small>`; R.status.className = `fr-status ${st[2]}`;
    R.doorBtn.innerHTML = state.door ? 'Close the door<small>把門關上</small>' : '&#128682; Open the door<small>把門打開</small>';
    R.doorBtn.classList.toggle('on', state.door);
    root.classList.toggle('fr-running', state.running);
    const html = `${esc(MSG[key][0])}<span class="zh">${esc(MSG[key][1])}</span>`;
    if (html !== state.lastMsg) { R.msg.innerHTML = html; state.lastMsg = html; }
  }

  // ---------------- 操作 ----------------
  function setRoom(v) { state.room = MathUtils.clamp(Math.round(+v), 18, 36); R.room.value = String(state.room); state.T = Math.min(state.T, state.room); }
  function setDoor(v) { state.door = !!v; }
  function setPlugged(v) { state.plugged = !!v; const t = $('[data-t="plug"]'); if (t) t.checked = state.plugged; }
  function setTemp(v) { state.T = +v; }
  R.room.addEventListener('input', () => setRoom(R.room.value));
  R.doorBtn.addEventListener('click', () => setDoor(!state.door));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="heat"]', (v) => { state.heat = v; });
  bind('[data-t="plug"]', setPlugged);
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
  let lastR = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
    controls.update();
    updateLabels();
    if (t - lastR > 120) { lastR = t; readout(); }
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = camera.aspect < 0.9 ? 40 : 34;
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

  setRoom(28); state.T = 6; state.running = true; state.flow = 1;
  step(0.01); readout();
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const DEMO = {
    normal: () => { setPlugged(true); setDoor(false); setRoom(28); setTemp(6); setPlaying(true); },
    door: () => { setPlugged(true); setRoom(28); setTemp(4); setDoor(true); setPlaying(true); },
    unplug: () => { setDoor(false); setRoom(28); setTemp(4); setPlugged(false); setPlaying(true); },
    hot: () => { setPlugged(true); setDoor(false); setTemp(4); setRoom(35); setPlaying(true); },
  };
  // 除錯：document.querySelector('[data-fridge-lab]').__lab
  root.__lab = {
    camera, controls, state, setRoom, setDoor, setPlugged, setTemp,
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { step(0); controls.update(); updateLabels(); readout(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => { if (DEMO[v]) DEMO[v](); } };
}

lazyBoot('[data-fridge-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
