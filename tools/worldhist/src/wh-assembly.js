/*
 * 世界歷史 第五課〈What Did the Greeks Start? 希臘人開了什麼頭？〉
 * 「誰能上普尼克斯山投票？」：阿提卡平原上，住在這裡的人排成四群（一個小人代表 lab.per 個人）；
 * 換成「誰能投票」只有成年男性公民亮著；「一場公民大會」時，坐得下山坡的那一小群走上普尼克斯山；
 * 「舉手表決」時拉滑桿決定多少人舉手，主席用看的判斷結果（差太少就看不出來）。
 * 人數都是學者的估計，頁面列出範圍與出處；畫面用的是 lab.groups[].use 這個示意用的數字。
 *
 * 資料在 data/world_history.json 的 lab（per、groups[]、seats、margin、modes[]、judge）。
 * 除錯：document.querySelector('[data-wh-assembly-lab]').__lab
 *   state、mode(key)、share(0–1)、tour(bool)、info()、render()
 */
import {
  AmbientLight, BoxGeometry, Color, ConeGeometry, CylinderGeometry, DirectionalLight, ExtrudeGeometry, Group, HemisphereLight,
  InstancedMesh, Mesh, MeshLambertMaterial, Object3D, PerspectiveCamera, PlaneGeometry, Scene, Shape, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { labeler, lazyBoot, bi, readJson } from './common.js';
import { figures, gridBlock, fanSeats, handsUp, judgeHands } from './assembly.js';
import './timeline2d.js';
import './centers2d.js';
import './sort2d.js';
import './ostraka2d.js';

const MODES = ['people', 'citizens', 'pnyx', 'vote'];
const GAP = 0.85;                                          // 平原上小人的間距
const PNYX = new Vector3(-30, 0, -26);                     // 普尼克斯山講台的位置
const FAN = { r0: 3.2, r1: 16, angle: 2.3, gap: 0.95, rise: 0.32 };
const CAM = {                                              // 每一種畫面的視角：[相機, 看的點]
  people: [[4, 62, 96], [0, 0, 4]],
  citizens: [[4, 62, 96], [0, 0, 4]],
  pnyx: [[-30, 11, -14], [-30, 0.8, -31]],
  vote: [[-30, 8.5, -16], [-30, 1.2, -30.5]],
};

function init(root) {
  const data = readJson(root);
  const $ = (s) => root.querySelector(s);
  const cv = $('.al-space-cv'), space = $('.al-space'), slider = $('.wh-as-share'), playBtn = $('.al-play');
  const counts = figures(data.groups, data.per);
  const total = counts.reduce((s, n) => s + n, 0);
  const voterGroup = data.groups.findIndex((g) => g.vote);
  const attend = Math.min(counts[voterGroup], Math.round(data.seats / data.per));
  const state = { mode: 'people', share: 0.6, touring: false, t: 0 };
  let raf = 0, last = 0, idle = 0, visible = true, tourAt = 0;

  // 每個小人：屬於哪一群、平原上的家、（如果去開會）山坡上的座位
  const homes = [], group = [], seat = [];
  {
    let x0 = 0; const blocks = [];
    counts.forEach((n) => { const cols = Math.max(4, Math.ceil(Math.sqrt(n * 0.55))); const b = gridBlock(n, cols, GAP); const w = (cols - 1) * GAP; blocks.push({ b, w }); x0 += w + 6; });
    let x = -(x0 - 6) / 2;
    blocks.forEach(({ b, w }, gi) => { b.forEach((p) => { homes.push(new Vector3(x + w / 2 + p.x, 0, 14 + p.z)); group.push(gi); }); blocks[gi].cx = x + w / 2; x += w + 6; });
    const seats = fanSeats(attend, FAN);
    let k = 0;
    homes.forEach((_, i) => { if (group[i] === voterGroup && k < seats.length) { const s = seats[k++]; seat.push(new Vector3(PNYX.x + s.x, s.y + 0.5, PNYX.z + s.z)); } else seat.push(null); });
    state.blocks = blocks.map((b) => b.cx);
  }
  const goers = seat.map((s, i) => (s ? i : -1)).filter((i) => i >= 0);
  let up = handsUp(goers.length, state.share);

  let view = null;
  try {
    const renderer = new WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const scene = new Scene();
    const camera = new PerspectiveCamera(36, 1, 0.5, 600);
    const controls = new OrbitControls(camera, cv);
    controls.enablePan = false; controls.enableDamping = true; controls.minDistance = 8; controls.maxDistance = 170;
    controls.maxPolarAngle = Math.PI * 0.46;
    camera.position.set(...CAM.people[0]); controls.target.set(...CAM.people[1]);
    scene.add(new HemisphereLight(0xfff6e4, 0x7a6a4a, 1.0), new AmbientLight(0xffffff, 0.25));
    const sun = new DirectionalLight(0xffffff, 1.6); sun.position.set(-40, 60, 30); scene.add(sun);
    const ground = new Mesh(new PlaneGeometry(300, 300), new MeshLambertMaterial({ color: '#cdbb84' })); ground.rotation.x = -Math.PI / 2; scene.add(ground);
    const plain = new Mesh(new PlaneGeometry(x0w(), 40), new MeshLambertMaterial({ color: '#b9b073' })); plain.rotation.x = -Math.PI / 2; plain.position.set(0, 0.01, 14); scene.add(plain);
    function x0w() { return Math.max(60, ...homes.map((h) => Math.abs(h.x) * 2 + 8)); }
    // 普尼克斯山：一圈一圈往外升高的扇形石階，中間是講台
    const hill = new Group(); hill.position.copy(PNYX); scene.add(hill);
    const rockMat = new MeshLambertMaterial({ color: '#b9a98a' });
    const rows = Math.max(...fanSeats(attend, FAN).map((q) => q.row)) + 2;     // 只畫坐得下這些人的排數，山坡看起來是坐滿的
    for (let k = 0; k < rows; k++) {
      const ri = FAN.r0 - FAN.gap / 2 + k * FAN.gap, ro = ri + FAN.gap, a0 = Math.PI / 2 - FAN.angle / 2 - 0.05, a1 = Math.PI / 2 + FAN.angle / 2 + 0.05;
      const sh = new Shape(); sh.absarc(0, 0, ro, a0, a1, false); sh.absarc(0, 0, Math.max(0.1, ri), a1, a0, true);
      const g = new ExtrudeGeometry(sh, { depth: 0.5 + k * FAN.rise, bevelEnabled: false, curveSegments: 24 });
      const m = new Mesh(g, rockMat); m.rotation.x = -Math.PI / 2; hill.add(m);
    }
    const bema = new Mesh(new BoxGeometry(2.2, 1.3, 1.6), new MeshLambertMaterial({ color: '#9e8f72' })); bema.position.set(0, 0.65, 0.4); hill.add(bema);
    // 遠方的衛城（示意，不照比例）
    const acro = new Group(); acro.position.set(34, 0, -44); scene.add(acro);
    const rock = new Mesh(new CylinderGeometry(9, 13, 7, 9), new MeshLambertMaterial({ color: '#a89878' })); rock.position.y = 3.5; acro.add(rock);
    const temple = new Mesh(new BoxGeometry(6, 2.2, 3), new MeshLambertMaterial({ color: '#efe6d2' })); temple.position.y = 8.1; acro.add(temple);
    const roof = new Mesh(new ConeGeometry(2.4, 1.2, 4), new MeshLambertMaterial({ color: '#d9c9a6' })); roof.scale.set(1.35, 1, 0.75); roof.rotation.y = Math.PI / 4; roof.position.y = 9.8; acro.add(roof);
    // 小人：身體＋頭合成一個形狀，用 InstancedMesh 一次畫完
    const body = new CylinderGeometry(0.17, 0.26, 0.62, 7); body.translate(0, 0.31, 0);
    const head = new SphereGeometry(0.15, 8, 6); head.translate(0, 0.78, 0);
    const person = mergeGeometries([body, head]);
    const people = new InstancedMesh(person, new MeshLambertMaterial({ color: '#ffffff' }), total); scene.add(people);
    const arm = new CylinderGeometry(0.05, 0.05, 0.5, 5); arm.translate(0, 0.25, 0);
    const palm = new SphereGeometry(0.09, 6, 5); palm.translate(0, 0.52, 0);
    const hands = new InstancedMesh(mergeGeometries([arm, palm]), new MeshLambertMaterial({ color: '#f4d3b0' }), Math.max(1, goers.length)); scene.add(hands);
    const colors = data.groups.map((g) => new Color(g.color));
    const labs = labeler($('.al-labels'), cv, camera);
    const L = {
      groups: data.groups.map((g) => labs.add('wh-lab wh-lab-region', bi(g.short_en || g.en, g.short_zh || g.zh))),
      pnyx: labs.add('wh-lab wh-lab-fa', 'The Pnyx<i>普尼克斯山</i>'),
      acro: labs.add('wh-lab', 'Toward the Acropolis<i>往衛城（不照比例）</i>'),
      bema: labs.add('wh-lab', 'Speakers’ platform<i>講台</i>'),
    };
    function resize() { const w = space.clientWidth, h = space.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); camera.aspect = w / h; camera.fov = w / h < 1.1 ? 44 : 36; camera.updateProjectionMatrix(); }
    new ResizeObserver(() => { resize(); render(); }).observe(space);
    controls.addEventListener('change', () => kick());
    view = { renderer, scene, camera, controls, people, hands, colors, labs, L, dummy: new Object3D(), camFrom: null, camTo: null, camT: 1 };
    resize(); controls.update();
  } catch (e) { view = null; if (window.console) console.warn('World History assembly model: 3D is off', e); }
  if (!view) root.classList.add('al-nogl', 'wh-nogl');

  const ease = (u) => (u < 0 ? 0 : u > 1 ? 1 : u * u * (3 - 2 * u));
  const gray = new Color('#8d8a80');
  const tmp = new Color();
  function place() {
    if (!view) return;
    const { people, hands, dummy, colors } = view;
    const go = state.mode === 'pnyx' || state.mode === 'vote';
    for (let i = 0; i < total; i++) {
      const h = homes[i], s = seat[i];
      const u = s && go ? ease(state.t * 1.6 - (i % 37) / 60) : 0;
      if (s && u > 0) {
        const p = h.clone().lerp(s, u);
        p.y = h.y * (1 - u) + s.y * u + Math.sin(u * Math.PI) * 2.5;          // 走過去時稍微抬高，看得出在移動
        dummy.position.copy(p);
        dummy.lookAt(PNYX.x, p.y, PNYX.z);
      } else { dummy.position.copy(h); dummy.rotation.set(0, 0, 0); }
      dummy.scale.setScalar(1); dummy.updateMatrix(); people.setMatrixAt(i, dummy.matrix);
      const dim = state.mode !== 'people' && group[i] !== voterGroup;
      tmp.copy(colors[group[i]]); if (dim) tmp.lerp(gray, 0.75).multiplyScalar(0.8);
      people.setColorAt(i, tmp);
    }
    people.instanceMatrix.needsUpdate = true; if (people.instanceColor) people.instanceColor.needsUpdate = true;
    const showHands = state.mode === 'vote';
    goers.forEach((idx, k) => {
      const s = seat[idx], on = showHands && up[k] && ease(state.t * 1.6 - (idx % 37) / 60) >= 0.98;   // 坐下了才舉手
      dummy.position.set(s.x + 0.2, s.y + 0.6, s.z);
      dummy.rotation.set(0, 0, 0); dummy.scale.setScalar(on ? 1 : 0.0001); dummy.updateMatrix(); hands.setMatrixAt(k, dummy.matrix);
    });
    hands.instanceMatrix.needsUpdate = true;
  }
  const fmt = (n) => Math.round(n).toLocaleString('en-US');
  function update() {
    const g = data.groups, all = g.reduce((s, x) => s + x.use, 0), v = g[voterGroup].use;
    $('.wh-as-voters').textContent = `${Math.round((v / all) * 100)}%`;
    $('.wh-as-seats').textContent = `${Math.round((data.seats / v) * 100)}%`;
    const yes = Math.round(goers.length * state.share), no = goers.length - yes;
    $('.wh-as-yes').textContent = `${Math.round(state.share * 100)}%`;
    const j = judgeHands(yes, no, data.margin);
    const jt = data.judge[j];
    const out = $('.wh-as-judge'); out.innerHTML = bi(jt.en, jt.zh); out.dataset.result = j;
    slider.setAttribute('aria-valuetext', `${Math.round(state.share * 100)}% raise their hands · ${Math.round(state.share * 100)}% 舉手`);
    root.querySelectorAll('[data-mode]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.mode === state.mode));
    root.querySelectorAll('[data-mode-card]').forEach((c) => { c.hidden = c.dataset.modeCard !== state.mode; });
    $('.wh-as-voterow').hidden = state.mode !== 'vote';
    root.dataset.mode = state.mode;
    place();
  }
  function render() {
    if (!view) return;
    const { labs, L, camera } = view;
    const far = state.mode === 'people' || state.mode === 'citizens';
    data.groups.forEach((gr, i) => {
      const n = counts[i], cols = Math.max(4, Math.ceil(Math.sqrt(n * 0.55))), rowsN = Math.ceil(n / cols);
      const front = camera.aspect < 1.1 && i % 2 === 1;                    // 手機上四個標籤會擠在一起：單數的放到方陣前面
      labs.place(L.groups[i], new Vector3(state.blocks[i], 1.5, front ? 14 + (rowsN * GAP) / 2 + 2.2 : 14 - (rowsN * GAP) / 2 - 1.2), far);
      L.groups[i].dataset.state = state.mode !== 'people' && i !== voterGroup ? 'maybe' : '';
    });
    labs.place(L.pnyx, new Vector3(PNYX.x, 6.5, PNYX.z - 12), true);
    labs.place(L.acro, new Vector3(34, 12, -44), far);
    labs.place(L.bema, new Vector3(PNYX.x, 2.2, PNYX.z + 1.6), !far);
    view.renderer.render(view.scene, camera);
  }
  function moveCam(mode) {
    if (!view) return;
    const [p, t] = CAM[mode];
    view.camFrom = [view.camera.position.clone(), view.controls.target.clone()];
    view.camTo = [new Vector3(...p), new Vector3(...t)];
    view.camT = 0;
  }
  function frame(tm) {
    raf = 0;
    const dt = Math.min(0.05, last ? (tm - last) / 1000 : 0.016); last = tm;
    let busy = false;
    if (view && view.camT < 1) {
      view.camT = Math.min(1, view.camT + dt / 1.6); const u = ease(view.camT);
      view.camera.position.lerpVectors(view.camFrom[0], view.camTo[0], u); view.controls.target.lerpVectors(view.camFrom[1], view.camTo[1], u); busy = true;
    }
    if (state.t < 1.2) { state.t = Math.min(1.2, state.t + dt / 3); place(); busy = true; }
    if (state.touring && tm - tourAt > 6500) {
      const i = MODES.indexOf(state.mode);
      if (i === MODES.length - 1) tour(false); else { mode(MODES[i + 1]); tourAt = tm; }
      busy = true;
    }
    if (view) view.controls.update();
    render();
    idle = busy || state.touring ? 0 : idle + 1;
    if (visible && idle < 90) raf = requestAnimationFrame(frame);
  }
  function kick() { idle = 0; if (!raf && visible) { last = 0; raf = requestAnimationFrame(frame); } }
  new IntersectionObserver((ents) => { visible = ents[0].isIntersecting; if (visible) kick(); }).observe(root);

  function mode(k, instant = false) {
    if (!MODES.includes(k)) return;
    const wasUp = state.mode === 'pnyx' || state.mode === 'vote', isUp = k === 'pnyx' || k === 'vote';
    if (isUp && !wasUp) state.t = 0;
    if (k === 'vote' && state.mode !== 'vote') state.t = Math.min(state.t, 0.6);
    state.mode = k;
    if (instant) { state.t = 1.2; if (view) { const [p, t] = CAM[k]; view.camera.position.set(...p); view.controls.target.set(...t); view.camT = 1; view.controls.update(); } }
    else moveCam(k);
    update(); kick();
  }
  function share(v) { state.share = Math.min(1, Math.max(0, v)); slider.value = Math.round(state.share * 100); up = handsUp(goers.length, state.share); update(); kick(); }
  function tour(on) {
    state.touring = on; tourAt = performance.now();
    playBtn.setAttribute('aria-pressed', on); playBtn.querySelector('.al-play-t').textContent = on ? 'Stop · 停' : 'Take the tour · 從頭看一遍';
    root.classList.toggle('is-playing', on);
    if (on) mode('people');
    kick();
  }
  slider.addEventListener('input', () => share(slider.value / 100));
  playBtn.addEventListener('click', () => tour(!state.touring));
  root.addEventListener('click', (ev) => { const b = ev.target.closest('[data-mode]'); if (b) { if (state.touring) tour(false); mode(b.dataset.mode); } });
  if (view) $('.al-home').addEventListener('click', () => { moveCam(state.mode); kick(); });
  const DEMOS = {
    people: () => mode('people'),
    citizens: () => mode('citizens'),
    pnyx: () => mode('pnyx'),
    vote: () => { mode('vote'); share(0.52); },
  };
  const api = {
    state, mode, share, tour,
    demo(n) { if (DEMOS[n]) DEMOS[n](); },
    info() {
      const yes = Math.round(goers.length * state.share);
      return { mode: state.mode, figures: total, per: data.per, attend: goers.length, share: state.share, judge: judgeHands(yes, goers.length - yes, data.margin), webgl: !!view };
    },
    render() { place(); update(); render(); },
    settle() { state.t = 1.2; if (view) { view.camT = 0.999; } place(); kick(); },
    ready: () => true,
  };
  update();
  root.__lab = api;
  return api;
}

lazyBoot('[data-wh-assembly-lab]', init, { demo: (lab, v) => lab.demo(v) });
