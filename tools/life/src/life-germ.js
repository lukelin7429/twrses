/*
 * 生命與生態 · 第四課「細菌和病毒哪裡不一樣？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：細菌是一個完整的細胞，自己長大、一分為二，所以數量一代一代加倍。
 *   病毒不是細胞，只是一包說明書；它要進到一個細胞裡，讓那個細胞替它做出新的病毒。
 *
 * 場景：兩個視角共用一支滑桿。
 *   「細菌」：一個桿狀的細菌拉長、從中間斷開，1 → 2 → 4 … → 32。
 *   「病毒」：一個病毒（畫的是感染細菌的噬菌體）落在細胞上 → 把說明書送進去 → 細胞裡長出新的病毒 → 新的病毒離開。
 * 規則在 germcalc.js。
 *
 * 產物：cd tools/life && npm run build → assets/js/life-germ.js
 * 除錯：document.querySelector('[data-lifegerm-lab]').__lab
 */
import {
  AmbientLight, CapsuleGeometry, Color, CylinderGeometry, DirectionalLight, Group, HemisphereLight, IcosahedronGeometry, Mesh,
  MeshStandardMaterial, PerspectiveCamera, Scene, TorusGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { MAX_GEN, COPIES, cells, minutes, slot, stage, copiesShown, virusCount, holding, acrossMm } from './germcalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (x) => { const t = clamp(x); return t * t * (3 - 2 * t); };
const STAGE_NAME = {
  land: ['1 · It lands on a cell', '一、落在細胞上'], inject: ['2 · Its instructions go in', '二、把說明書送進去'],
  copy: ['3 · The cell builds new viruses', '三、細胞替它做出新的病毒'], burst: ['4 · The new viruses leave', '四、新的病毒離開'],
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
  scene.background = new Color(0x0d1830);
  const camera = new PerspectiveCamera(34, 1, 0.1, 140);
  const TARGET = V(0, 0.2, 0);
  const homePos = () => TARGET.clone().add(V(2, 2.2, 13.2).multiplyScalar(camera.aspect < 0.85 ? 1.5 : camera.aspect < 1.1 ? 1.15 : 1));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 5; controls.maxDistance = 50;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xffffff, 0x2a3040, 1.2));
  scene.add(new AmbientLight(0xffffff, 0.45));
  const dl = new DirectionalLight(0xffffff, 0.9); dl.position.set(-4, 8, 9); scene.add(dl);

  const GB = new Group(), GV = new Group(); scene.add(GB, GV);
  const bodyMat = new MeshStandardMaterial({ color: 0x58c9a0, roughness: 0.5, transparent: true, opacity: 0.5, depthWrite: false });
  const dnaMat = new MeshStandardMaterial({ color: 0xffd84a, roughness: 0.5 });

  // ---------- 細菌：最多 32 個桿狀細胞，每個裡面一圈自己的 DNA（沒有細胞核） ----------
  const bodyGeo = new CapsuleGeometry(0.28, 0.75, 6, 14), loopGeo = new TorusGeometry(0.15, 0.04, 8, 20);
  const bugs = [];
  for (let i = 0; i < 2 ** MAX_GEN; i++) {
    const g = new Group();
    const body = new Mesh(bodyGeo, bodyMat); body.rotation.z = Math.PI / 2; g.add(body);
    const loop = new Mesh(loopGeo, dnaMat); loop.scale.set(2, 1, 1); loop.rotation.x = 0.5; g.add(loop);
    GB.add(g); bugs.push(g);
  }
  const HALF = 0.655;                                                    // 桿子長度的一半：兩個孩子頭尾相接時中心相距這麼多的兩倍
  function layoutBacteria(pct) {
    const t = (pct / 100) * MAX_GEN, k = Math.min(MAX_GEN - 1, Math.floor(t)), f = t >= MAX_GEN ? 1 : t - k;
    const a = smooth(f / 0.5), b = smooth((f - 0.5) / 0.5), n = 2 ** (k + 1);
    bugs.forEach((g, c) => {
      g.visible = c < n && !(f < 0.01 && (c & 1));                       // 還沒開始分裂時，兩個孩子疊在一起，只畫一個
      if (!g.visible) return;
      const P = slot(c >> 1, k), S = slot(c, k + 1), sgn = c & 1 ? 1 : -1, x0 = P[0] + sgn * HALF * a;
      g.position.set(x0 + (S[0] - x0) * b, P[1] + (S[1] - P[1]) * b, P[2] + (S[2] - P[2]) * b);
    });
  }

  // ---------- 病毒：一個大細胞（宿主）＋一個噬菌體 ----------
  const hostMat = bodyMat.clone(), hostDnaMat = dnaMat.clone(); hostDnaMat.transparent = true;
  const host = new Mesh(new CapsuleGeometry(1.3, 2.7, 8, 24), hostMat); host.rotation.z = Math.PI / 2; host.position.set(0, -0.7, 0); GV.add(host);
  const hostLoop = new Mesh(new TorusGeometry(0.5, 0.07, 8, 28), hostDnaMat); hostLoop.scale.set(2.2, 1, 1); hostLoop.rotation.x = 1.2; hostLoop.position.set(0, -0.9, 0); GV.add(hostLoop);
  const virMat = new MeshStandardMaterial({ color: 0xc77be8, roughness: 0.45, flatShading: true, transparent: true });
  const newMat = new MeshStandardMaterial({ color: 0xff7a6b, roughness: 0.45, flatShading: true });
  const geneMat = new MeshStandardMaterial({ color: 0xff4a4a, roughness: 0.4, emissive: 0xff2a2a, emissiveIntensity: 0.5 });
  const headGeo = new IcosahedronGeometry(0.42, 0), tailGeo = new CylinderGeometry(0.07, 0.07, 0.7, 8), legGeo = new CylinderGeometry(0.025, 0.025, 0.5, 6);
  function phage(mat) {                                                  // 原點在尾巴的底端（腳踩的地方）
    const g = new Group();
    const head = new Mesh(headGeo, mat); head.position.y = 1.1; head.scale.y = 1.2; g.add(head);
    const tail = new Mesh(tailGeo, mat); tail.position.y = 0.4; g.add(tail);
    for (let i = 0; i < 4; i++) {
      const leg = new Mesh(legGeo, mat), a = (i / 4) * Math.PI * 2 + 0.6;
      leg.position.set(Math.cos(a) * 0.2, 0.13, Math.sin(a) * 0.2); leg.rotation.z = -Math.cos(a) * 0.95; leg.rotation.x = Math.sin(a) * 0.95; g.add(leg);
    }
    return g;
  }
  const TOP = 0.6;                                                       // 宿主細胞頂面的高度
  const first = phage(virMat); GV.add(first);
  const gene = new Mesh(new TorusGeometry(0.13, 0.045, 8, 16, Math.PI * 1.6), geneMat); GV.add(gene);
  const kids = [];
  for (let i = 0; i < COPIES; i++) {
    const g = phage(newMat);
    g.userData.home = V(-1.95 + (i % 4) * 1.3, i < 4 ? -0.6 : -1.45, i % 2 ? 0.35 : -0.35);
    g.userData.out = V((i % 4 - 1.5) * 2.1, i < 4 ? 1.9 : -3.0, i % 2 ? 1.6 : -1.6);
    g.rotation.z = (i % 4 - 1.5) * 0.5; GV.add(g); kids.push(g);
  }
  const START = V(3.0, 1.1, 0.6), LAND = V(0, TOP, 0), tmp = V(0, 0, 0);
  function layoutVirus(s) {
    const u = smooth(s / 22), inj = clamp((s - 25) / 20), n = copiesShown(s), out = smooth((s - 80) / 20);
    first.position.lerpVectors(START, LAND, u); first.rotation.z = (1 - u) * -0.7;
    virMat.opacity = 1 - 0.75 * smooth((s - 45) / 20);                   // 把說明書送進去之後，外殼就只是空殼了
    gene.visible = s >= 25 && s < 80;
    gene.position.set(0, 1.1 + TOP - smooth(inj) * (1.1 + TOP + 0.75), 0); gene.rotation.z = s * 0.12; gene.scale.setScalar(0.8 + 0.6 * smooth(inj));
    hostMat.opacity = 0.5 * (1 - 0.85 * out); host.scale.setScalar(1 + 0.1 * out);
    hostDnaMat.opacity = 1 - 0.85 * out;
    kids.forEach((g, i) => {
      const grow = s >= 80 ? 1 : clamp(((s - 45) / 35) * COPIES - i);
      g.visible = i < n && grow > 0.01;
      if (!g.visible) return;
      g.position.lerpVectors(g.userData.home, g.userData.out, out);
      g.scale.setScalar((0.5 + 0.3 * out) * smooth(grow));
    });
  }

  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    cell: lab.add('cp-lb', 'A bacterium: one whole cell<small>細菌：一個完整的細胞</small>'),
    dna: lab.add('cp-lb', 'Its own DNA, with no nucleus<small>它自己的 DNA，沒有細胞核包著</small>'),
    count: lab.add('cp-lb lf-lb-push', ''),
    virus: lab.add('cp-lb lf-lb-push', 'A virus: a packet of instructions<small>病毒：一包說明書</small>'),
    host: lab.add('cp-lb', 'A living cell<small>一個活的細胞</small>'),
    gene: lab.add('cp-lb lf-lb-push', 'The instructions go in<small>說明書進去了</small>'),
    made: lab.add('cp-lb lf-lb-push', 'The cell builds new viruses<small>細胞替它做出新的病毒</small>'),
    out: lab.add('cp-lb lf-lb-push', 'New viruses leave<small>新的病毒離開</small>'),
  };

  const R = { views: [...root.querySelectorAll('.cp-view button')], t: $('.lf-gm-t'), tOut: $('.lf-gm-t-out'), tName: $('.lf-gm-t-name'), n: $('.lf-gm-n'), time: $('.lf-gm-time'), how: $('.lf-gm-how'),
    timeK: $('.lf-gm-time-k'), bar: $('.lf-gm-bar'), status: $('.lf-gm-status'), msgs: [...root.querySelectorAll('.lf-gm-msg')], play: $('.al-play') };
  const state = { view: 'bacteria', pct: { bacteria: 0, virus: 0 }, labels: true, playing: true, hold: 0 };
  const cur = () => state.pct[state.view];
  const gens = () => (cur() / 100) * MAX_GEN;

  function layout() {
    GB.visible = state.view === 'bacteria'; GV.visible = state.view === 'virus';
    if (GB.visible) layoutBacteria(cur()); else layoutVirus(cur());
  }
  function updateLabels() {
    const on = state.labels, b = state.view === 'bacteria', s = cur(), st = stage(s);
    const show = (el, v, x, y, z, dy = 0) => { el.hidden = !v; if (v) lab.place(el, tmp.set(x, y, z), dy); };
    show(L.cell, on && b && s <= 0, 0, 0.75, 0);
    show(L.dna, on && b && s <= 0, 0, -0.75, 0);
    show(L.count, on && b && s > 0, 0, 2.5, 0);
    show(L.virus, on && !b && st === 'land', first.position.x, first.position.y + 2.05, first.position.z);
    show(L.host, on && !b && (st === 'land' || st === 'inject'), -2.4, -2.35, 0);
    show(L.gene, on && !b && st === 'inject', 1.9, 0.2, 0);
    show(L.made, on && !b && st === 'copy', 0, 1.35, 0, -34);
    show(L.out, on && !b && st === 'burst', 0, 3.7, 0);
  }
  function readout() {
    const b = state.view === 'bacteria', s = cur(), k = holding(state.view, b ? gens() : s);
    R.views.forEach((x) => x.setAttribute('aria-pressed', x.dataset.view === state.view ? 'true' : 'false'));
    R.t.value = Math.round(s);
    if (b) {
      const g = Math.floor(gens() + 1e-6), n = cells(g);
      R.tName.textContent = 'Time · 時間'; R.tOut.textContent = `${minutes(g)} min`;
      R.n.innerHTML = `${n} ${n === 1 ? 'bacterium' : 'bacteria'}<small>${n} 個細菌</small>`;
      R.timeK.textContent = 'Divisions so far · 分裂了幾次';
      R.time.innerHTML = `${g} ${g === 1 ? 'time' : 'times'}<small>${g} 次；最快約每 20 分鐘一次</small>`;
      R.how.innerHTML = 'By itself: it splits in two<small>靠自己：一分為二</small>';
      R.status.innerHTML = `Each split doubles the number<small class="zh">每分裂一次，數量加倍</small>`;
      L.count.innerHTML = `${n} ${n === 1 ? 'bacterium' : 'bacteria'}<small>${n} 個細菌</small>`;
    } else {
      const st = stage(s), n = virusCount(s);
      R.tName.textContent = 'Step · 階段'; R.tOut.textContent = `${STAGE_NAME[st][0][0]} of 4`;
      R.n.innerHTML = `${n} ${n === 1 ? 'virus' : 'viruses'}<small>${n} 個病毒</small>`;
      R.timeK.textContent = 'Step · 階段';
      R.time.innerHTML = `${STAGE_NAME[st][0].slice(4)}<small>${STAGE_NAME[st][1]}</small>`;
      R.how.innerHTML = 'Only inside a living cell<small>只能在活的細胞裡</small>';
      R.status.innerHTML = `The cell does the building<small class="zh">動手做的是細胞</small>`;
    }
    R.bar.style.width = `${s}%`;
    R.msgs.forEach((m) => { m.hidden = m.dataset.msg !== k; });
  }
  function set(o) {
    if (o.view === 'bacteria' || o.view === 'virus') state.view = o.view;
    if (o.pct != null) state.pct[state.view] = clamp(+o.pct, 0, 100);
    layout(); readout();
  }
  function setPlaying(v) {
    state.playing = v; state.hold = 0;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.views.forEach((x) => x.addEventListener('click', () => set({ view: x.dataset.view })));
  R.t.addEventListener('input', () => { setPlaying(false); set({ pct: +R.t.value }); });
  R.play.addEventListener('click', () => { if (!state.playing && cur() >= 100) state.pct[state.view] = 0; setPlaying(!state.playing); });
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  $('.al-home').addEventListener('click', () => { camera.position.copy(homePos()); controls.target.copy(TARGET); });

  let last = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, last ? (t - last) / 1000 : 0); last = t;
    if (state.playing) {
      const s = cur();
      if (s >= 100 || s <= 0) {                                          // 兩頭各停一下
        state.hold += dt;
        if (state.hold > (s >= 100 ? 3 : 1.8)) { state.hold = 0; state.pct[state.view] = s >= 100 ? 0 : 0.01; }
      } else state.pct[state.view] = Math.min(100, s + dt * 8);
      layout(); readout();
    }
    controls.update();
    updateLabels();
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(spaceWrap);
  resize();
  camera.position.copy(homePos());
  let visible = false, raf = 0;
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting; last = 0;
    if (visible && !raf) raf = requestAnimationFrame(frame);
  }, { rootMargin: '120px' }).observe(root);

  set({});
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const DEMO = {
    one: () => { set({ view: 'bacteria', pct: 0.01 }); setPlaying(true); },
    many: () => { setPlaying(false); set({ view: 'bacteria', pct: 100 }); },
    inject: () => { setPlaying(false); set({ view: 'virus', pct: 36 }); },
    burst: () => { set({ view: 'virus', pct: 0.01 }); setPlaying(true); },
  };
  root.__lab = {
    camera, controls, state, set, setPlaying,
    render: () => { camera.position.copy(homePos()); controls.update(); layout(); updateLabels(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (k) => { if (DEMO[k]) DEMO[k](); } };
}

// ---------- 頁面下方：一毫米可以排幾個？（不需要 WebGL） ----------
function initRuler() {
  const el = document.querySelector('[data-life-ruler]');
  if (!el) return;
  const items = JSON.parse(el.dataset.items), q = (s) => el.querySelector(s), btns = [...el.querySelectorAll('.lf-ru-pick button')];
  const LO = Math.log10(10), HI = Math.log10(10000);
  function show(key) {
    const it = items.find((x) => x.key === key) || items[0];
    btns.forEach((b) => b.setAttribute('aria-pressed', b.dataset.k === it.key ? 'true' : 'false'));
    q('.lf-ru-dot').style.left = `${((Math.log10(it.nm) - LO) / (HI - LO)) * 100}%`;
    q('.lf-ru-dot').dataset.kind = it.kind;
    q('.lf-ru-size').textContent = it.size;
    q('.lf-ru-n').textContent = acrossMm(it.nm).toLocaleString('en-US');
    q('.lf-ru-en').textContent = it.note_en; q('.lf-ru-zh').textContent = it.note_zh;
    el.dataset.k = it.key;
  }
  btns.forEach((b) => b.addEventListener('click', () => show(b.dataset.k)));
  show(el.dataset.start);
  el.__ru = { show };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initRuler);
else initRuler();

lazyBoot('[data-lifegerm-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
