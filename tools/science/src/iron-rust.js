/*
 * 萬物原理 · 第十九課「鐵為什麼會生鏽？」的 3D 放大的鐵表面（自繪示意；原子畫得比真的大非常多、也少非常多）。
 *
 * 一個機制：鐵＋氧（空氣）＋水，三樣到齊，鐵就慢慢變成另一種東西——紅褐色、又鬆又會剝落的鐵鏽。
 *   缺一樣就幾乎不鏽；有鹽快很多；鏽會剝落，底下新的鐵露出來又繼續鏽。油漆把鐵蓋住；鍍鋅連刮傷了都還保護著鐵。
 *
 * 場景：一塊鐵（上面兩層鐵原子）、一滴水、空氣裡的氧分子。畫面只由（時間 t、水、空氣、鹽、表面處理）決定，
 *   所以時間滑桿可以來回拉。數字用 rustcalc.js（示意模型，「天」只是模型裡的時間）。
 *
 * 產物：cd tools/science && npm run build → assets/js/iron-rust.js
 */
import {
  AmbientLight, BoxGeometry, Color, DirectionalLight, HemisphereLight, InstancedMesh, MathUtils, Matrix4, Mesh,
  MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Quaternion, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { T_MAX, COATS, speed, exposed, progress, rusted } from './rustcalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const DAYS_PER_SEC = 3;
const NX = 16, NZ = 9, D = 0.34, AR = 0.17;          // 原子格子
const hash = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
const SCRATCH_HALF = 0.52;                           // 刮痕的半寬（x 方向）
const ATOMS = [];
for (let ix = 0; ix < NX; ix++) {
  for (let iz = 0; iz < NZ; iz++) {
    const x = (ix - (NX - 1) / 2) * D, z = (iz - (NZ - 1) / 2) * D, i = ATOMS.length;
    const d = Math.hypot(x / 2.6, z / 1.5);          // 離水滴中心多遠（0～約 1.4）
    ATOMS.push({ x, z, o: MathUtils.clamp(0.7 * d / 1.4 + 0.3 * hash(i, 1), 0, 1), oS: 0.5 * Math.abs(z) / 1.4 + 0.5 * hash(i, 2), inScratch: Math.abs(x) < SCRATCH_HALF, h: [hash(i, 3), hash(i, 4), hash(i, 5), hash(i, 6)] });
  }
}
const N = ATOMS.length;

const MSG = {
  wet: ['Iron, oxygen, and water are all here, so the iron is rusting. Rust is loose and flaky. It falls away, and fresh iron underneath starts to rust too.',
    '鐵、氧、水三樣都到齊了，鐵正在生鏽。鐵鏽又鬆又會剝落，一掉下來，底下新的鐵又開始鏽。'],
  salt: ['Salt water makes rust form much faster. This is why bikes, scooters, and railings near the sea rust so quickly.',
    '鹽水讓鐵鏽長得快很多。所以海邊的腳踏車、機車和欄杆特別容易生鏽。'],
  dry: ['No water, so almost no rust. Oxygen is touching the iron, but one of the three things is missing. Keep iron dry and it lasts.',
    '沒有水，幾乎不會生鏽。氧雖然碰得到鐵，但三樣東西少了一樣。把鐵保持乾燥，它就耐用。'],
  noair: ['No air, so no oxygen. Even though the iron is wet, one of the three things is missing, and the rust cannot form.',
    '沒有空氣，就沒有氧。鐵雖然是濕的，但三樣東西少了一樣，鐵鏽長不出來。'],
  paint: ['Paint is a wall. Water and oxygen cannot reach the iron, so it does not rust, as long as the paint has no holes.',
    '油漆是一道牆。水和氧碰不到鐵，就不會生鏽——只要油漆沒有破洞。'],
  scratch: ['One scratch is enough. Water and oxygen get in through the gap, and rust starts there and creeps under the paint.',
    '一道刮痕就夠了。水和氧從缺口鑽進去，鐵鏽從那裡開始，再往油漆底下蔓延。'],
  zinc: ['This iron is coated with zinc. Even where it is scratched, the zinc gives itself up first and the iron stays safe. This is called galvanizing.',
    '這塊鐵鍍了一層鋅。就算刮傷了，鋅也會搶先被腐蝕，鐵還是安全的。這叫做鍍鋅。'],
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
  scene.background = new Color(0x13233c);
  const camera = new PerspectiveCamera(34, 1, 0.1, 100);
  const TARGET = V(0, 0.35, 0);
  const homePos = () => TARGET.clone().add(V(1.2, 4.2, 7.6).multiplyScalar(camera.aspect < 0.85 ? 1.55 : camera.aspect < 1.2 ? 1.25 : 1.0));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 3; controls.maxDistance = 24; controls.maxPolarAngle = Math.PI * 0.48;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xe6f0ff, 0x3a3028, 1.0));
  scene.add(new AmbientLight(0xffffff, 0.35));
  const sun = new DirectionalLight(0xffffff, 1.2); sun.position.set(4, 8, 6); scene.add(sun);

  // ---------------- 鐵塊、原子、鏽屑、水滴、鹽、氧、表面處理 ----------------
  const BW = NX * D + 0.2, BD = NZ * D + 0.2;
  scene.add(at(new Mesh(new BoxGeometry(BW, 1.0, BD), new MeshStandardMaterial({ color: 0x7c8794, metalness: 0.6, roughness: 0.45 })), 0, -0.84, 0));
  scene.add(at(new Mesh(new BoxGeometry(BW + 3, 0.1, BD + 3), new MeshStandardMaterial({ color: 0x25344a, roughness: 0.9 })), 0, -1.39, 0));
  const sph = new SphereGeometry(1, 14, 10);
  const top = new InstancedMesh(sph, new MeshStandardMaterial({ color: 0xffffff, metalness: 0.35, roughness: 0.5 }), N);
  const low = new InstancedMesh(sph, new MeshStandardMaterial({ color: 0xffffff, metalness: 0.35, roughness: 0.5 }), N);
  const N_PILE = 46;
  const pile = new InstancedMesh(new BoxGeometry(1, 1, 1), new MeshStandardMaterial({ color: 0xa5491a, roughness: 0.95 }), N_PILE);
  const drop = new Mesh(new SphereGeometry(1, 40, 24), new MeshStandardMaterial({ color: 0x58b4ff, transparent: true, opacity: 0.3, depthWrite: false, roughness: 0.1 }));
  drop.scale.set(2.35, 0.8, 1.35); drop.position.y = 0.45; drop.renderOrder = 2; scene.add(drop);
  const N_SALT = 22;
  const saltM = new InstancedMesh(new BoxGeometry(0.07, 0.07, 0.07), new MeshBasicMaterial({ color: 0xffffff }), N_SALT);
  const N_O2 = 26;
  const o2 = new InstancedMesh(sph, new MeshStandardMaterial({ color: 0xff4a4a, roughness: 0.4 }), N_O2 * 2);
  for (const m of [top, low, pile, saltM, o2]) { m.frustumCulled = false; scene.add(m); }
  const coatMat = new MeshStandardMaterial({ color: 0x2f7bd6, roughness: 0.5 });
  const coatFull = at(new Mesh(new BoxGeometry(BW, 0.07, BD), coatMat), 0, 0.39, 0); scene.add(coatFull);
  const sideW = (BW - SCRATCH_HALF * 2) / 2;
  const coatL = at(new Mesh(new BoxGeometry(sideW, 0.07, BD), coatMat), -(SCRATCH_HALF + sideW / 2), 0.39, 0); scene.add(coatL);
  const coatR = at(new Mesh(new BoxGeometry(sideW, 0.07, BD), coatMat), SCRATCH_HALF + sideW / 2, 0.39, 0); scene.add(coatR);
  const C_IRON = new Color(0x9aa4b2), C_RUST = [new Color(0xb5521e), new Color(0x8f3d16), new Color(0xc8692a)], C_PAINT = new Color(0x2f7bd6), C_ZINC = new Color(0xd6dde6);

  // ---------------- 標籤 ----------------
  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    iron: lab.add('bt-lb bt-lb-a', 'Iron<small>鐵</small>'),
    water: lab.add('bt-lb bt-lb-e', 'Water<small>水</small>'),
    o2: lab.add('bt-lb rt-lb-o2', 'Oxygen from the air<small>空氣裡的氧</small>'),
    rust: lab.add('bt-lb rt-lb-rust', 'Rust<small>鐵鏽</small>'),
    flakes: lab.add('bt-lb ip-region', 'Rust that has flaked off<small>剝落的鐵鏽</small>'),
    salt: lab.add('bt-lb ip-region', 'Salt<small>鹽</small>'),
    coat: lab.add('bt-lb bt-lb-b', ''),
    scratch: lab.add('bt-lb ip-lb-lost', 'Scratch<small>刮痕</small>'),
  };

  const R = {
    time: $('.rt-time'), timeOut: $('.rt-time-out'), status: $('.rt-status'), pct: $('.rt-pct'), speed: $('.rt-speed'),
    need: { iron: $('.rt-need-iron'), air: $('.rt-need-air'), water: $('.rt-need-water') },
    bars: { dry: $('.rt-bar-dry'), wet: $('.rt-bar-wet'), salt: $('.rt-bar-salt') },
    coats: [...root.querySelectorAll('.rt-coat')], msg: $('.rt-msg'), play: $('.al-play'),
  };
  const state = { t: 0, water: true, air: true, salt: false, coat: 'none', labels: true, playing: true, clock: 0, lastMsg: '' };
  const cond = () => ({ water: state.water, air: state.air, salt: state.salt, coat: state.coat });

  // ---------------- 由（t、條件）算出整個畫面 ----------------
  const tmpM = new Matrix4(), tmpQ = new Quaternion(), tmpS = V(1, 1, 1), p = V(0, 0, 0), col = new Color();
  const firstRust = V(0, 0, 0); let anyRust = false;
  function draw() {
    const c = cond(), pr = progress(state.t, c), clk = state.clock;
    const coat = state.coat, bare = coat === 'none';
    anyRust = false; let bestO = 9;
    for (let i = 0; i < N; i++) {
      const a = ATOMS[i];
      const open = bare || ((coat === 'scratch') && a.inScratch);
      const o = bare ? a.o : a.oS;
      const rustAt = o * 0.6, flakeAt = rustAt + 0.22, lowAt = flakeAt + 0.05;
      const k1 = open ? MathUtils.smoothstep(pr, rustAt, rustAt + 0.06) : 0;       // 上層：變成鏽
      const k2 = open ? MathUtils.smoothstep(pr, flakeAt, flakeAt + 0.07) : 0;     // 上層：剝落
      const k3 = open ? MathUtils.smoothstep(pr, lowAt, lowAt + 0.08) : 0;         // 下層：變成鏽
      // 上層原子
      const sw = 1 + 0.32 * k1, s = AR * sw * (1 - k2);
      p.set(a.x + k2 * (a.h[0] - 0.5) * 0.5, 0.17 + 0.06 * k1 + k2 * 0.5, a.z + k2 * (a.h[1] - 0.5) * 0.5);
      tmpM.compose(p, tmpQ.identity(), tmpS.set(s * (1 + 0.25 * k1 * a.h[2]), s * (1 - 0.2 * k1 * a.h[3]), s * (1 + 0.25 * k1 * a.h[0]))); top.setMatrixAt(i, tmpM);
      top.setColorAt(i, col.copy(C_IRON).lerp(C_RUST[i % 3], k1));
      // 下層原子
      const s2 = AR * (1 + 0.3 * k3);
      p.set(a.x, -0.17 + 0.05 * k3, a.z);
      tmpM.compose(p, tmpQ, tmpS.set(s2 * (1 + 0.2 * k3 * a.h[1]), s2, s2 * (1 + 0.2 * k3 * a.h[2]))); low.setMatrixAt(i, tmpM);
      low.setColorAt(i, col.copy(C_IRON).multiplyScalar(0.86).lerp(C_RUST[(i + 1) % 3], k3));
      if (k1 > 0.6 && k2 < 0.3 && o < bestO) { bestO = o; firstRust.set(a.x, 0.3, a.z); anyRust = true; }
      else if (k3 > 0.6 && !anyRust) { firstRust.set(a.x, 0, a.z); anyRust = true; }
    }
    top.instanceMatrix.needsUpdate = true; low.instanceMatrix.needsUpdate = true;
    if (top.instanceColor) top.instanceColor.needsUpdate = true;
    if (low.instanceColor) low.instanceColor.needsUpdate = true;
    // 掉在旁邊的鏽屑
    const fallen = rusted(state.t, c);
    for (let j = 0; j < N_PILE; j++) {
      const on = MathUtils.smoothstep(fallen, 0.12 + (j / N_PILE) * 0.8, 0.16 + (j / N_PILE) * 0.8);
      const s = on * (0.1 + hash(j, 21) * 0.12);
      p.set((hash(j, 22) - 0.5) * BW * 0.95, -1.3 + s * 0.3, BD / 2 + 0.25 + hash(j, 23) * 0.9);
      tmpQ.setFromAxisAngle(V(0.3, 1, 0.2).normalize(), hash(j, 24) * 6.28);
      tmpM.compose(p, tmpQ, tmpS.set(s * 1.4, s * 0.5, s)); pile.setMatrixAt(j, tmpM);
    }
    pile.instanceMatrix.needsUpdate = true;
    // 水滴、鹽
    drop.visible = state.water;
    for (let j = 0; j < N_SALT; j++) {
      const s = state.water && state.salt ? 1 : 0;
      p.set((hash(j, 31) - 0.5) * 3.6 + Math.sin(clk * 0.6 + j) * 0.08, 0.5 + hash(j, 32) * 0.45 + Math.sin(clk * 0.8 + j * 2) * 0.05, (hash(j, 33) - 0.5) * 1.9);
      tmpQ.setFromAxisAngle(V(1, 1, 0).normalize(), clk * 0.5 + j);
      tmpM.compose(p, tmpQ, tmpS.set(s, s, s)); saltM.setMatrixAt(j, tmpM);
    }
    saltM.instanceMatrix.needsUpdate = true;
    // 氧分子：在空氣裡飄；有水、有露出的鐵時，一部分鑽進水滴往鐵那邊去
    const diving = state.air && state.water && exposed(coat) > 0;
    for (let j = 0; j < N_O2; j++) {
      const s = state.air ? 0.085 : 0;
      const bx = (hash(j, 41) - 0.5) * 6.4, bz = (hash(j, 42) - 0.5) * 3.2, by = 1.9 + hash(j, 43) * 1.3;
      p.set(bx + Math.sin(clk * 0.5 + j) * 0.4, by + Math.sin(clk * 0.7 + j * 1.7) * 0.25, bz + Math.cos(clk * 0.4 + j) * 0.3);
      if (diving && j % 2 === 0) {
        const ph = (clk * (0.12 + 0.05 * hash(j, 44)) * (state.salt ? 1.6 : 1) + hash(j, 45)) % 1;
        const tx = coat === 'scratch' ? (hash(j, 46) - 0.5) * 0.7 : (hash(j, 46) - 0.5) * 3.6;
        p.lerp(V(tx, 0.4, (hash(j, 47) - 0.5) * 1.8), MathUtils.smoothstep(ph, 0.15, 0.95));
      }
      const ang = clk * 1.2 + j, dx = Math.cos(ang) * 0.075, dz = Math.sin(ang) * 0.075;
      tmpM.compose(V(p.x - dx, p.y, p.z - dz), tmpQ.identity(), tmpS.set(s, s, s)); o2.setMatrixAt(j * 2, tmpM);
      tmpM.compose(V(p.x + dx, p.y, p.z + dz), tmpQ, tmpS.set(s, s, s)); o2.setMatrixAt(j * 2 + 1, tmpM);
    }
    o2.instanceMatrix.needsUpdate = true;
    // 油漆／鍍鋅
    coatFull.visible = coat === 'paint';
    coatL.visible = coatR.visible = coat === 'scratch' || coat === 'zinc';
    coatMat.color.copy(coat === 'zinc' ? C_ZINC : C_PAINT); coatMat.metalness = coat === 'zinc' ? 0.7 : 0; coatMat.roughness = coat === 'zinc' ? 0.3 : 0.5;
  }

  let narrow = false;
  function updateLabels() {
    const on = state.labels, coat = state.coat;
    const show = (el, s, v, dy = 0) => { el.hidden = !s; if (s) lab.place(el, v, dy); };
    show(L.iron, on, V(-NX * D / 2 - 0.1, -0.8, NZ * D / 2 + 0.1), 0);
    show(L.water, on && state.water, V(1.7, 0.95, 0.6), -18);
    show(L.o2, on && state.air, V(-2.2, 2.9, 0), -20);
    show(L.rust, on && anyRust, firstRust, -24);
    show(L.flakes, on && !narrow && rusted(state.t, cond()) > 0.3, V(0, -1.3, NZ * D / 2 + 0.8), 18);
    show(L.salt, on && state.water && state.salt && !narrow, V(-1.2, 0.8, 0.4), 0);
    L.coat.innerHTML = coat === 'zinc' ? 'Zinc coating<small>鍍鋅層</small>' : 'Paint<small>油漆</small>';
    show(L.coat, on && coat !== 'none', V(2.2, 0.45, -NZ * D / 2), -18);
    show(L.scratch, on && (coat === 'scratch' || coat === 'zinc'), V(0, 0.4, NZ * D / 2), 22);
  }

  // ---------------- 讀數 ----------------
  const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  function readout() {
    const { t } = state, c = cond();
    R.timeOut.textContent = `Day ${Math.round(t)}`; R.time.value = String(t); R.time.style.setProperty('--p', `${t / T_MAX * 100}%`);
    const r = rusted(t, c), sp = speed(c), ex = exposed(state.coat);
    R.pct.textContent = `${Math.round(r * 100)}%`;
    R.speed.innerHTML = sp === 0 || ex === 0 ? 'None<small>不會鏽</small>' : sp > 1 ? 'Fast<small>很快</small>' : 'Steady<small>慢慢鏽</small>';
    const reach = ex > 0;
    const need = { iron: true, air: state.air && reach, water: state.water && reach };
    for (const k of Object.keys(need)) { R.need[k].classList.toggle('ok', need[k]); R.need[k].querySelector('b').textContent = need[k] ? '✓' : '✗'; }
    const sc = { dry: rusted(t, { water: false, air: true }), wet: rusted(t, { water: true, air: true }), salt: rusted(t, { water: true, air: true, salt: true }) };
    for (const k of Object.keys(sc)) {
      R.bars[k].style.setProperty('--w', `${Math.max(1.5, sc[k] * 100)}%`);
      R.bars[k].querySelector('b').textContent = `${Math.round(sc[k] * 100)}%`;
    }
    R.coats.forEach((b) => { const on = b.dataset.coat === state.coat; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on ? 'true' : 'false'); });
    let key, st;
    if (state.coat === 'paint') { key = 'paint'; st = ['Protected by paint', '油漆保護著', 'ok']; }
    else if (state.coat === 'zinc') { key = 'zinc'; st = ['Protected by zinc', '鋅保護著', 'ok']; }
    else if (!state.water) { key = 'dry'; st = ['Dry: no rust', '乾的：不生鏽', 'ok']; }
    else if (!state.air) { key = 'noair'; st = ['No oxygen: no rust', '沒有氧：不生鏽', 'ok']; }
    else if (state.coat === 'scratch') { key = 'scratch'; st = ['Rusting at the scratch', '從刮痕開始鏽', 'bad']; }
    else if (state.salt) { key = 'salt'; st = ['Rusting fast', '鏽得很快', 'bad']; }
    else { key = 'wet'; st = ['Rusting', '正在生鏽', 'bad']; }
    R.status.innerHTML = `${st[0]}<small>${st[1]}</small>`; R.status.className = `rt-status ${st[2]}`;
    const html = `${esc(MSG[key][0])}<span class="zh">${esc(MSG[key][1])}</span>`;
    if (html !== state.lastMsg) { R.msg.innerHTML = html; state.lastMsg = html; }
  }

  // ---------------- 操作 ----------------
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  function setTime(v) { state.t = MathUtils.clamp(+v, 0, T_MAX); }
  function setCoat(v) { if (COATS.includes(v)) state.coat = v; }
  function setFlag(k, v) { state[k] = !!v; const el = $(`[data-t="${k}"]`); if (el) el.checked = state[k]; }
  function restart() { state.t = 0; setPlaying(true); }
  R.time.addEventListener('input', () => { setTime(R.time.value); setPlaying(false); });
  R.coats.forEach((b) => b.addEventListener('click', () => { setCoat(b.dataset.coat); restart(); }));
  R.play.addEventListener('click', () => { if (!state.playing && state.t >= T_MAX - 0.01) state.t = 0; setPlaying(!state.playing); });
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  for (const k of ['water', 'air', 'salt']) bind(`[data-t="${k}"]`, (v) => { state[k] = v; });
  $('.al-home').addEventListener('click', () => flyTo(homePos(), TARGET));
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(pp, t) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(pp); fly.t1.copy(t); fly.t = 0; }

  function step(dt) {
    state.clock += dt;
    if (state.playing) {
      state.t = Math.min(T_MAX, state.t + dt * DAYS_PER_SEC);
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

  step(0.01); readout();
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const set = (o) => { setCoat(o.coat || 'none'); setFlag('water', o.water !== false); setFlag('air', o.air !== false); setFlag('salt', !!o.salt); restart(); };
  const DEMO = {
    wet: () => set({}),
    salt: () => set({ salt: true }),
    dry: () => set({ water: false }),
    scratch: () => set({ coat: 'scratch' }),
  };
  // 除錯：document.querySelector('[data-rust-lab]').__lab
  root.__lab = {
    camera, controls, state, setTime, setCoat, setFlag, setPlaying, set,
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { step(0); controls.update(); updateLabels(); readout(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => { if (DEMO[v]) DEMO[v](); } };
}

lazyBoot('[data-rust-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
