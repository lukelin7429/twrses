/*
 * 萬物原理 · 第二十課「微波爐怎麼加熱食物？」的 3D 剖開的微波爐（自繪示意；波和分子都畫得比真的大非常多）。
 *
 * 一個機制：磁控管發出微波，在金屬箱子裡來回反射。微波讓食物裡的水分子不停地來回轉，分子互相推擠，食物就自己熱起來。
 *   箱子裡有的地方微波強（熱點）、有的地方弱（冷點），熱點相隔半個波長（約 6 公分），所以要有轉盤。
 *   冰吸收得少、可微波的盤子幾乎不吸收；金屬的尖端會冒火花。
 *
 * 場景：1 單位＝10 公分。爐腔 x ∈ [−1.6, 1.6]、y ∈ [0, 2]、z ∈ [−1.5, 1.5]，門朝 +z；磁控管在右邊。
 *   溫度只由（食物種類、時間 t、有沒有轉盤）決定，時間滑桿可以來回拉。數字用 microcalc.js（示意模型）。
 *
 * 產物：cd tools/science && npm run build → assets/js/microwave-oven.js
 */
import {
  AmbientLight, BoxGeometry, BufferGeometry, CircleGeometry, Color, CylinderGeometry, DirectionalLight, Group,
  HemisphereLight, InstancedMesh, Line, LineBasicMaterial, LineSegments, MathUtils, Matrix4, Mesh, MeshBasicMaterial,
  MeshStandardMaterial, PerspectiveCamera, Quaternion, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { T_MAX, TURN_PERIOD, WAVELENGTH_CM, FOODS, POINTS, intensity, tempAt, spread } from './microcalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const CM = 0.1, K = (2 * Math.PI) / WAVELENGTH_CM;
const CW = 1.6, CH = 2.0, CD = 1.5;                  // 爐腔半寬、高、半深
const RAMP = [[-18, new Color(0xeaf6ff)], [0, new Color(0xa9d8ff)], [20, new Color(0x4f9dff)], [32, new Color(0x4fd6a8)], [45, new Color(0xffd84a)], [70, new Color(0xff8a2a)], [100, new Color(0xe0261a)]];
function tempColor(T, out) {
  if (T <= RAMP[0][0]) return out.copy(RAMP[0][1]);
  for (let i = 1; i < RAMP.length; i++) if (T <= RAMP[i][0]) return out.copy(RAMP[i - 1][1]).lerp(RAMP[i][1], (T - RAMP[i - 1][0]) / (RAMP[i][0] - RAMP[i - 1][0]));
  return out.copy(RAMP[RAMP.length - 1][1]);
}

const MSG = {
  food: ['Microwaves make the water molecules in the food flip back and forth. The jostling molecules bump into their neighbors, and the food heats itself. The turntable carries every bite through hot spots and cold spots.',
    '微波讓食物裡的水分子不停地來回轉。轉來轉去的分子撞到旁邊的分子，食物就自己熱起來。轉盤帶著每一口食物輪流經過熱點和冷點。'],
  noturn: ['With the turntable stopped, each bite stays where it is. Bites sitting in a hot spot get very hot, and bites in a cold spot stay cold.',
    '轉盤停住了，每一口都待在原地。剛好在熱點上的很燙，在冷點上的還是冷的。'],
  ice: ['In ice, the water molecules are locked in place and can hardly turn, so ice soaks up microwaves poorly. This is why defrosting is slow.',
    '冰裡面的水分子被固定住，幾乎轉不動，所以冰不太吸收微波。這就是解凍為什麼那麼慢。'],
  plate: ['A microwave-safe plate has almost no water in it, so the microwaves pass through and it stays cool. Plates get hot only because hot food warms them.',
    '可微波的盤子裡幾乎沒有水，微波直接穿過去，盤子還是涼的。盤子會燙，只是因為被熱食物燙熱的。'],
  fork: ['Stop! Never put metal in a microwave oven. Electric charge piles up at the sharp tips of the fork and jumps through the air as sparks.',
    '快停！絕對不可以把金屬放進微波爐。電荷擠在叉子尖尖的地方，再跳過空氣變成火花。'],
  off: ['The oven is off. The moment the power stops, the microwaves are gone. Nothing is left behind in the food except heat.',
    '微波爐關著。電一停，微波馬上就消失了。留在食物裡的只有熱。'],
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
  scene.background = new Color(0x121c30);
  const camera = new PerspectiveCamera(34, 1, 0.1, 100);
  const TARGET = V(0.15, 1.1, 0);
  const homePos = () => TARGET.clone().add(V(-2.0, 3.0, 8.0).multiplyScalar(camera.aspect < 0.85 ? 1.7 : camera.aspect < 1.2 ? 1.4 : 1.0));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 3; controls.maxDistance = 24; controls.maxPolarAngle = Math.PI * 0.5;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xeaf2ff, 0x2a2f3a, 1.0));
  scene.add(new AmbientLight(0xffffff, 0.4));
  const sun = new DirectionalLight(0xffffff, 1.0); sun.position.set(-3, 7, 8); scene.add(sun);

  // ---------------- 爐子 ----------------
  const wall = new MeshStandardMaterial({ color: 0xc7ced9, metalness: 0.5, roughness: 0.5 });
  const shell = new MeshStandardMaterial({ color: 0x2a3140, metalness: 0.3, roughness: 0.6 });
  const T = 0.06;
  scene.add(at(new Mesh(new BoxGeometry(CW * 2, T, CD * 2), wall), 0, -T / 2, 0));               // 底
  scene.add(at(new Mesh(new BoxGeometry(CW * 2, CH, T), wall), 0, CH / 2, -CD - T / 2));         // 後
  scene.add(at(new Mesh(new BoxGeometry(T, CH, CD * 2), wall), -CW - T / 2, CH / 2, 0));         // 左
  scene.add(at(new Mesh(new BoxGeometry(T, CH, CD * 2), wall), CW + T / 2, CH / 2, 0));          // 右（裡面那一面）
  const topMat = new MeshStandardMaterial({ color: 0xc7ced9, metalness: 0.5, roughness: 0.5, transparent: true, opacity: 0.18, depthWrite: false });
  scene.add(at(new Mesh(new BoxGeometry(CW * 2, T, CD * 2), topMat), 0, CH + T / 2, 0));         // 頂（半透明，看得進去）
  scene.add(at(new Mesh(new BoxGeometry(0.95, CH + 0.1, CD * 2 + 0.1), shell), CW + 0.55, CH / 2, 0));   // 右邊的機件箱
  scene.add(at(new Mesh(new BoxGeometry(CW * 2 + 1.3, 0.12, CD * 2 + 0.3), shell), 0.5, -0.12, 0));
  // 磁控管
  const magMat = new MeshStandardMaterial({ color: 0xc8743a, metalness: 0.6, roughness: 0.35, emissive: 0x000000 });
  const mag = at(new Mesh(new CylinderGeometry(0.26, 0.26, 0.5, 20), magMat), CW + 0.5, 1.45, CD + 0.06); mag.rotation.x = Math.PI / 2; scene.add(mag);
  // 門上的金屬網
  const meshPts = [];
  for (let x = -CW; x <= CW + 0.001; x += 0.16) meshPts.push(V(x, 0, CD), V(x, CH, CD));
  for (let y = 0; y <= CH + 0.001; y += 0.16) meshPts.push(V(-CW, y, CD), V(CW, y, CD));
  scene.add(new LineSegments(new BufferGeometry().setFromPoints(meshPts), new LineBasicMaterial({ color: 0x9fb2d6, transparent: true, opacity: 0.22 })));

  // ---------------- 轉盤、盤子、食物、叉子 ----------------
  const table = new Group(); scene.add(table);
  table.add(at(new Mesh(new CylinderGeometry(1.3, 1.3, 0.04, 48), new MeshStandardMaterial({ color: 0xbfe0f0, transparent: true, opacity: 0.35, depthWrite: false })), 0, 0.1, 0));
  const plateMat = new MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
  table.add(at(new Mesh(new CylinderGeometry(1.0, 0.85, 0.06, 48), plateMat), 0, 0.16, 0));
  const marker = at(new Mesh(new BoxGeometry(0.16, 0.03, 0.16), new MeshStandardMaterial({ color: 0x3f9bff })), 1.15, 0.13, 0); table.add(marker);
  const NP = POINTS.length;
  const bites = new InstancedMesh(new SphereGeometry(0.17, 16, 12), new MeshStandardMaterial({ color: 0xffffff, roughness: 0.6 }), NP);
  const cubes = new InstancedMesh(new BoxGeometry(0.27, 0.27, 0.27), new MeshStandardMaterial({ color: 0xffffff, roughness: 0.2, transparent: true, opacity: 0.85 }), NP);
  for (const m of [bites, cubes]) { m.frustumCulled = false; table.add(m); }
  const fork = new Group(); table.add(fork);
  const steel = new MeshStandardMaterial({ color: 0xdfe5ee, metalness: 0.9, roughness: 0.2 });
  fork.add(at(new Mesh(new BoxGeometry(0.9, 0.03, 0.07), steel), -0.25, 0, 0));
  for (let k = -1; k <= 1; k++) fork.add(at(new Mesh(new BoxGeometry(0.38, 0.025, 0.025), steel), 0.39, 0, k * 0.06));
  fork.position.set(0, 0.52, 0.1); fork.rotation.set(0, 0.5, 0.25);
  const N_SPARK = 9;
  const sparks = new InstancedMesh(new SphereGeometry(1, 8, 6), new MeshBasicMaterial({ color: 0xfff2a0 }), N_SPARK); sparks.frustumCulled = false; fork.add(sparks);

  // ---------------- 熱點圖（食物高度的那一層）、駐波 ----------------
  const GX = 27, GZ = 25, NG = GX * GZ;
  const spots = new InstancedMesh(new CircleGeometry(0.055, 12), new MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.75, depthWrite: false }), NG);
  spots.frustumCulled = false; scene.add(spots);
  const spotData = [];
  { const q = new Quaternion().setFromAxisAngle(V(1, 0, 0), -Math.PI / 2), m = new Matrix4(), c = new Color();
    for (let ix = 0; ix < GX; ix++) for (let iz = 0; iz < GZ; iz++) {
      const x = -CW + 0.08 + ix * ((CW * 2 - 0.16) / (GX - 1)), z = -CD + 0.08 + iz * ((CD * 2 - 0.16) / (GZ - 1));
      const I = intensity(x / CM, z / CM) / 4, i = spotData.length;
      spotData.push({ x, z, I });
      m.compose(V(x, 0.07, z), q, V(1, 1, 1).multiplyScalar(0.25 + 1.2 * I)); spots.setMatrixAt(i, m);
      spots.setColorAt(i, c.setRGB(1, 0.35 + 0.5 * I, 0.1).multiplyScalar(0.25 + 0.75 * I));
    } }
  const WAVES = [-0.95, 0, 0.95].map((z) => {
    const n = 90, pts = Array.from({ length: n }, () => V(0, 0, 0));
    const line = new Line(new BufferGeometry().setFromPoints(pts), new LineBasicMaterial({ color: 0xffe066 })); line.frustumCulled = false; scene.add(line);
    return { z, pts, line, n };
  });

  // ---------------- 放大鏡：水分子 ----------------
  const zoom = new Group(); at(zoom, -2.35, 2.15, -0.9); scene.add(zoom);
  zoom.add(new Mesh(new SphereGeometry(0.78, 32, 20), new MeshStandardMaterial({ color: 0x58b4ff, transparent: true, opacity: 0.13, depthWrite: false })));
  const MOLS = [[-0.33, 0.3], [0.3, 0.33], [0, 0], [-0.32, -0.3], [0.33, -0.28]].map(([x, y], i) => {
    const g = new Group(); at(g, x, y, 0);
    g.add(new Mesh(new SphereGeometry(0.13, 16, 12), new MeshStandardMaterial({ color: 0xff4a4a, roughness: 0.4 })));
    for (const s of [-1, 1]) g.add(at(new Mesh(new SphereGeometry(0.08, 12, 10), new MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 })), Math.sin(0.91) * 0.16 * s, Math.cos(0.91) * 0.16, 0));
    zoom.add(g); return { g, ph: i * 1.3, x, y };
  });
  const leader = new Line(new BufferGeometry().setFromPoints([V(-1.9, 1.6, -0.7), V(-0.5, 0.45, -0.1)]), new LineBasicMaterial({ color: 0x9fd4ff, transparent: true, opacity: 0.5 })); scene.add(leader);

  // ---------------- 標籤 ----------------
  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    mag: lab.add('bt-lb mcw-lb-mag', 'Magnetron: makes the microwaves<small>磁控管：發出微波</small>'),
    wave: lab.add('bt-lb mcw-lb-wave', 'Microwaves bounce off the metal walls<small>微波在金屬壁之間來回反射</small>'),
    door: lab.add('bt-lb ip-region', 'Metal mesh keeps the waves in<small>金屬網把微波關在裡面</small>'),
    mol: lab.add('bt-lb bt-lb-e', ''),
    hot: lab.add('bt-lb mcw-lb-hot', 'Hot spot<small>熱點</small>'),
    table: lab.add('bt-lb ip-region', 'Turntable<small>轉盤</small>'),
    fork: lab.add('bt-lb ip-lb-lost', 'Sparks!<small>冒火花！</small>'),
  };

  const R = {
    time: $('.mcw-time'), timeOut: $('.mcw-time-out'), status: $('.mcw-status'), hot: $('.mcw-hot'), cold: $('.mcw-cold'),
    barHot: $('.mcw-bar-hot'), barCold: $('.mcw-bar-cold'), items: [...root.querySelectorAll('.mcw-item')], msg: $('.mcw-msg'), play: $('.al-play'),
  };
  const state = { t: 0, item: 'food', turn: true, waves: true, labels: true, playing: true, clock: 0, lastMsg: '' };
  const kind = () => (state.item === 'fork' ? 'food' : state.item);

  // ---------------- 由（item、t、turn）算出畫面 ----------------
  const tmpM = new Matrix4(), tmpQ = new Quaternion(), tmpS = V(1, 1, 1), p = V(0, 0, 0), col = new Color();
  const hotPos = V(0, 0, 0);
  function draw() {
    const k = kind(), on = state.playing, clk = state.clock;
    const ang = state.turn ? (2 * Math.PI * state.t) / TURN_PERIOD : 0;
    table.rotation.y = -ang;          // 俯視時 +x → +z 的方向和 microcalc 的角度一致
    let hi = -99;
    for (let i = 0; i < NP; i++) {
      const pt = POINTS[i], Tm = tempAt(k, pt.r, pt.a, state.t, state.turn);
      p.set(pt.r * CM * Math.cos(pt.a), 0.34, pt.r * CM * Math.sin(pt.a));
      const sF = k === 'food' ? 1 : 0, sI = k === 'ice' ? 1 : 0;
      tmpM.compose(p, tmpQ.identity(), tmpS.set(sF, sF * 0.85, sF)); bites.setMatrixAt(i, tmpM);
      bites.setColorAt(i, tempColor(Tm, col));
      tmpQ.setFromAxisAngle(V(0, 1, 0), i * 0.7);
      tmpM.compose(p, tmpQ, tmpS.set(sI, sI, sI)); cubes.setMatrixAt(i, tmpM);
      cubes.setColorAt(i, tempColor(Tm, col));
      if (Tm > hi) { hi = Tm; hotPos.copy(p).applyAxisAngle(V(0, 1, 0), -ang); }
    }
    for (const m of [bites, cubes]) { m.instanceMatrix.needsUpdate = true; if (m.instanceColor) m.instanceColor.needsUpdate = true; }
    plateMat.color.set(0xffffff);
    // 熱點圖與駐波
    spots.visible = state.waves && on;
    const osc = Math.cos(clk * 5);
    for (const w of WAVES) {
      w.line.visible = state.waves && on;
      const bz = Math.abs(Math.sin(K * (w.z / CM) + 0.4));
      for (let i = 0; i < w.n; i++) {
        const x = -CW + (i / (w.n - 1)) * CW * 2;
        w.pts[i].set(x, 1.25 + 0.34 * Math.sin(K * (x / CM) + 0.9) * bz * osc, w.z);
      }
      w.line.geometry.setFromPoints(w.pts);
    }
    magMat.emissive.setRGB(on ? 0.5 : 0, on ? 0.2 : 0, 0);
    // 水分子：跟著電場來回轉；冰裡的幾乎轉不動
    const amp = !on ? 0 : k === 'ice' ? 0.1 : k === 'plate' ? 0 : 1.0;
    zoom.visible = leader.visible = k !== 'plate';
    MOLS.forEach((m, i) => {
      m.g.rotation.z = (k === 'ice' ? 0 : m.ph) + amp * Math.sin(clk * 5);
      const jit = on && k !== 'ice' ? 0.02 * Math.min(1, state.t / 30) : 0;
      m.g.position.set(m.x + Math.sin(clk * 17 + i) * jit, m.y + Math.cos(clk * 13 + i * 2) * jit, 0);
    });
    // 叉子與火花
    fork.visible = state.item === 'fork';
    for (let j = 0; j < N_SPARK; j++) {
      const live = state.item === 'fork' && on && Math.sin(clk * 37 + j * 2.1) > 0.2;
      const s = live ? 0.02 + 0.03 * Math.abs(Math.sin(clk * 53 + j)) : 0;
      p.set(0.6 + Math.sin(clk * 29 + j) * 0.06 + (j % 3) * 0.03, 0.02 + Math.abs(Math.sin(clk * 31 + j * 3)) * 0.14, ((j % 3) - 1) * 0.06 + Math.cos(clk * 41 + j) * 0.04);
      tmpM.compose(p, tmpQ.identity(), tmpS.set(s, s, s)); sparks.setMatrixAt(j, tmpM);
    }
    sparks.instanceMatrix.needsUpdate = true;
  }

  let narrow = false;
  function updateLabels() {
    const on = state.labels, run = state.playing, k = kind();
    const show = (el, s, v, dy = 0) => { el.hidden = !s; if (s) lab.place(el, v, dy); };
    show(L.mag, on, V(CW + 0.5, 1.75, CD + 0.1), -18);
    show(L.wave, on && run && state.waves && !narrow, V(0.4, 1.6, -0.95), -20);
    show(L.door, on && !narrow, V(0.9, 0.25, CD), 26);
    L.mol.innerHTML = k === 'ice' ? 'In ice, the molecules are locked in place<small>冰裡的水分子被固定住</small>' : 'Water molecules flip back and forth<small>水分子來回轉動</small>';
    show(L.mol, on && k !== 'plate', V(-2.35, 2.95, -0.9), -14);
    show(L.hot, on && k === 'food' && state.item !== 'fork' && state.t > 12, hotPos, -30);
    show(L.table, on && !narrow, V(-1.2, 0.1, 0.9), 22);
    show(L.fork, state.item === 'fork' && run, V(0.5, 0.75, 0.4), -26);
  }

  // ---------------- 讀數 ----------------
  const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  function readout() {
    const { t } = state, k = kind();
    R.timeOut.textContent = `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;
    R.time.value = String(t); R.time.style.setProperty('--p', `${t / T_MAX * 100}%`);
    const sp = spread(k, t, state.turn), f = FOODS[k];
    R.hot.textContent = `${Math.round(sp.max)}°C`; R.cold.textContent = `${Math.round(sp.min)}°C`;
    const pc = (v) => `${MathUtils.clamp((v - f.start) / (100 - f.start), 0.02, 1) * 100}%`;
    R.barHot.style.setProperty('--w', pc(sp.max)); R.barCold.style.setProperty('--w', pc(sp.min));
    R.items.forEach((b) => { const on = b.dataset.item === state.item; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on ? 'true' : 'false'); });
    let key, st;
    if (state.item === 'fork' && state.playing) { key = 'fork'; st = ['Stop! No metal', '快停！不能放金屬', 'bad']; }
    else if (!state.playing && t < T_MAX - 0.01 && t > 0) { key = 'off'; st = ['Paused', '暫停中', '']; }
    else if (!state.playing && t >= T_MAX - 0.01) { key = k === 'food' ? (state.turn ? 'food' : 'noturn') : k; st = ['Ding! Done', '叮！好了', 'ok']; }
    else if (k === 'ice') { key = 'ice'; st = ['Ice warms slowly', '冰熱得很慢', '']; }
    else if (k === 'plate') { key = 'plate'; st = ['The plate stays cool', '盤子還是涼的', '']; }
    else if (!state.turn) { key = 'noturn'; st = ['Hot spots and cold spots', '有的燙、有的冷', 'bad']; }
    else { key = 'food'; st = ['Heating more evenly', '比較均勻地加熱', 'ok']; }
    R.status.innerHTML = `${st[0]}<small>${st[1]}</small>`; R.status.className = `mcw-status ${st[2]}`;
    const html = `${esc(MSG[key][0])}<span class="zh">${esc(MSG[key][1])}</span>`;
    if (html !== state.lastMsg) { R.msg.innerHTML = html; state.lastMsg = html; }
  }

  // ---------------- 操作 ----------------
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Stop · 停止' : 'Start · 啟動';
  }
  function setTime(v) { state.t = MathUtils.clamp(+v, 0, T_MAX); }
  function setItem(v) { if (['food', 'ice', 'plate', 'fork'].includes(v)) state.item = v; }
  function setFlag(k, v) { state[k] = !!v; const el = $(`[data-t="${k}"]`); if (el) el.checked = state[k]; }
  function restart() { state.t = 0; setPlaying(true); }
  R.time.addEventListener('input', () => { setTime(R.time.value); setPlaying(false); });
  R.items.forEach((b) => b.addEventListener('click', () => { setItem(b.dataset.item); restart(); }));
  R.play.addEventListener('click', () => { if (!state.playing && state.t >= T_MAX - 0.01) state.t = 0; setPlaying(!state.playing); });
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="turn"]', (v) => { state.turn = v; });
  bind('[data-t="waves"]', (v) => { state.waves = v; });
  $('.al-home').addEventListener('click', () => flyTo(homePos(), TARGET));
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(pp, t) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(pp); fly.t1.copy(t); fly.t = 0; }

  function step(dt) {
    state.clock += dt;
    if (state.playing) {
      state.t = Math.min(T_MAX, state.t + dt * 6);       // 1 秒 ＝ 模型裡的 6 秒
      if (state.t >= T_MAX) setPlaying(false);
    }
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 0.9);
      const k = MathUtils.smootherstep(fly.t, 0, 1);
      camera.position.lerpVectors(fly.p0, fly.p1, k);
      controls.target.lerpVectors(fly.t0, fly.t1, k);
    }
    draw();
  }

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

  setPlaying(true);
  step(0.01); readout();
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const DEMO = {
    food: () => { setItem('food'); setFlag('turn', true); restart(); },
    noturn: () => { setItem('food'); setFlag('turn', false); restart(); },
    ice: () => { setItem('ice'); setFlag('turn', true); restart(); },
    fork: () => { setItem('fork'); setFlag('turn', true); restart(); },
  };
  // 除錯：document.querySelector('[data-microwave-lab]').__lab
  root.__lab = {
    camera, controls, state, setTime, setItem, setFlag, setPlaying, restart,
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { step(0); controls.update(); updateLabels(); readout(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => { if (DEMO[v]) DEMO[v](); } };
}

lazyBoot('[data-microwave-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
