/*
 * 電腦概論 · 第三課「電腦怎麼做決定？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：**幾個開關接起來，就能回答「而且、或者、不是」**。
 * 一塊木板上：左邊一顆電池、右邊一盞燈泡，中間的開關有三種接法（data-gate）：
 *   and   兩個閘刀開關排成一排（串聯）：兩個都壓下去，路才通
 *   or    兩個閘刀開關一上一下（並聯）：壓下任何一個，路就通
 *   not   一個「蹺蹺板」開關：壓下把手，另一頭的接點反而翹起來，路就斷了
 * 輸入 A、B：1＝把手壓下去。路通了，銅線上有光點在跑、燈亮（輸出 1）。
 *   點開關（或右邊的 A、B 按鈕）   撥開關
 *   .al-play                       每一列都試一次（自動把所有輸入組合輪一遍）
 *   data-t="flow"                  光點；data-t="labels"  標籤
 * 右邊：這個閘的一句話、輸入與輸出、真值表（現在是哪一列會亮起來）。
 *
 * 控制器不靠 WebGL：沒有 WebGL 時 3D 不畫，右邊的按鈕與真值表照樣能用。
 * 2D（不需要 WebGL）：把閘接起來（六題）、真值表測驗（八題）——logic2d.js。
 *
 * 產物：cd tools/computers && npm run build → assets/js/comp-logic.js
 * 除錯：document.querySelector('[data-complogic-lab]').__lab
 *   setGate('and'|'or'|'not')、setIn(a, b)、toggle('a'|'b')、setPlaying(bool)、demo('and'|'or'|'not'|'wiring')、
 *   run(秒)、goCam()、render()、out()
 */
import {
  AdditiveBlending, AmbientLight, BoxGeometry, CircleGeometry, Color, CylinderGeometry, DirectionalLight, Group, HemisphereLight,
  MathUtils, Mesh, MeshBasicMaterial, MeshStandardMaterial, PCFShadowMap, PerspectiveCamera, PointLight, Raycaster, Scene,
  SphereGeometry, Sprite, SpriteMaterial, Vector2, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { canvasTex, labeler, lazyBoot } from './common.js';
import { GATES, truthTable } from './logic.js';
import { initQuiz, initWire } from './logic2d.js';

const V = (x, y, z) => new Vector3(x, y, z);
const Y = 0.2;            // 銅線離木板多高
const COPPER = 0xc98a4b;
const std = (color, o = {}) => new MeshStandardMaterial({ color, roughness: 0.6, ...o });

// 每種接法的銅線（[x, z] 折線；開關所在的地方留一個缺口）與光點走的路
const BAT = [-4.4, 0], BULB = [4.4, 0], BACK = 2.3;
const LAYOUT = {
  and: {
    sw: [{ id: 'a', x: -1.5, z: 0 }, { id: 'b', x: 1.5, z: 0 }],
    wires: [[[BAT[0], 0], [-2.0, 0]], [[-1.0, 0], [1.0, 0]], [[2.0, 0], [BULB[0], 0]]],
    paths: [{ need: ['a', 'b'], pts: [[BAT[0], 0], [BULB[0], 0], [BULB[0], BACK], [BAT[0], BACK], [BAT[0], 0]] }],
  },
  or: {
    sw: [{ id: 'a', x: 0, z: -1.0 }, { id: 'b', x: 0, z: 1.0 }],
    wires: [[[BAT[0], 0], [-2.4, 0]], [[-2.4, -1.0], [-2.4, 1.0]], [[-2.4, -1.0], [-0.5, -1.0]], [[-2.4, 1.0], [-0.5, 1.0]],
      [[0.5, -1.0], [2.4, -1.0]], [[0.5, 1.0], [2.4, 1.0]], [[2.4, -1.0], [2.4, 1.0]], [[2.4, 0], [BULB[0], 0]]],
    paths: [
      { need: ['a'], pts: [[BAT[0], 0], [-2.4, 0], [-2.4, -1.0], [2.4, -1.0], [2.4, 0], [BULB[0], 0], [BULB[0], BACK + 0.5], [BAT[0], BACK + 0.5], [BAT[0], 0]] },
      { need: ['b'], pts: [[BAT[0], 0], [-2.4, 0], [-2.4, 1.0], [2.4, 1.0], [2.4, 0], [BULB[0], 0], [BULB[0], BACK + 0.5], [BAT[0], BACK + 0.5], [BAT[0], 0]] },
    ],
  },
  not: {
    sw: [{ id: 'a', x: 0, z: 0, seesaw: true }],
    wires: [[[BAT[0], 0], [0.1, 0]], [[1.1, 0], [BULB[0], 0]]],
    paths: [{ need: ['!a'], pts: [[BAT[0], 0], [BULB[0], 0], [BULB[0], BACK], [BAT[0], BACK], [BAT[0], 0]] }],
  },
};

function wire(group, a, b) {
  const dx = b[0] - a[0], dz = b[1] - a[1], len = Math.hypot(dx, dz);
  const m = new Mesh(new BoxGeometry(len + 0.07, 0.07, 0.07), std(COPPER, { roughness: 0.35, metalness: 0.75 }));
  m.position.set((a[0] + b[0]) / 2, Y, (a[1] + b[1]) / 2); m.rotation.y = -Math.atan2(dz, dx); m.castShadow = true;
  group.add(m);
}
const post = (x, z, h = 0.34) => { const p = new Mesh(new CylinderGeometry(0.09, 0.11, h, 14), std(0xb9bec8, { roughness: 0.3, metalness: 0.85 })); p.position.set(x, Y - 0.1 + h / 2, z); p.castShadow = true; return p; };

/** 閘刀開關：左邊的柱子是轉軸，銅臂壓下去搭到右邊的柱子＝通。 */
function knife(x, z) {
  const g = new Group(); g.position.set(x, 0, z);
  const base = new Mesh(new BoxGeometry(1.5, 0.1, 0.8), std(0xdfe3ea, { roughness: 0.5 })); base.position.y = 0.11; base.castShadow = true; base.receiveShadow = true;
  const arm = new Group(); arm.position.set(-0.5, Y + 0.22, 0);
  const bar = new Mesh(new BoxGeometry(1.12, 0.07, 0.16), std(COPPER, { roughness: 0.3, metalness: 0.8 })); bar.position.x = 0.52; bar.castShadow = true;
  const knobM = std(0xd4574a, { roughness: 0.4 });
  const knob = new Mesh(new SphereGeometry(0.17, 18, 14), knobM); knob.position.set(1.12, 0.1, 0); knob.castShadow = true;
  arm.add(bar, knob);
  g.add(base, post(-0.5, 0), post(0.5, 0), arm);
  const pad = new Mesh(new BoxGeometry(1.8, 1.7, 1.3), new MeshBasicMaterial({ visible: false })); pad.position.y = 0.8; g.add(pad);
  return { g, pad, knobM, k: 0, set(k) { arm.rotation.z = MathUtils.lerp(0.72, 0, k); }, closed: (on) => on };
}

/** 蹺蹺板開關：把手在左、接點在右。把手壓下去，接點那一頭翹起來＝斷。 */
function seesaw(x, z) {
  const g = new Group(); g.position.set(x, 0, z);
  const base = new Mesh(new BoxGeometry(2.5, 0.1, 0.8), std(0xdfe3ea, { roughness: 0.5 })); base.position.set(-0.35, 0.11, 0); base.castShadow = true; base.receiveShadow = true;
  const pivot = new Mesh(new BoxGeometry(0.16, 0.6, 0.5), std(0x8a93a6, { roughness: 0.4, metalness: 0.6 })); pivot.position.set(-0.3, 0.4, 0); pivot.castShadow = true;
  const arm = new Group(); arm.position.set(-0.3, 0.66, 0);
  const beam = new Mesh(new BoxGeometry(2.0, 0.08, 0.2), std(0x7b5b3a, { roughness: 0.7 })); beam.castShadow = true;
  const knobM = std(0xd4574a, { roughness: 0.4 });
  const knob = new Mesh(new SphereGeometry(0.17, 18, 14), knobM); knob.position.set(-1.0, 0.16, 0); knob.castShadow = true;
  const link = new Mesh(new BoxGeometry(0.07, 0.36, 0.07), std(0x8a93a6)); link.position.set(0.9, -0.2, 0);
  const contact = new Mesh(new BoxGeometry(1.12, 0.07, 0.16), std(COPPER, { roughness: 0.3, metalness: 0.8 })); contact.position.set(0.9, -0.38, 0); contact.castShadow = true;
  arm.add(beam, knob, link, contact);
  g.add(base, pivot, post(0.1, 0, 0.26), post(1.1, 0, 0.26), arm);
  const pad = new Mesh(new BoxGeometry(2.9, 1.8, 1.3), new MeshBasicMaterial({ visible: false })); pad.position.set(-0.3, 0.8, 0); g.add(pad);
  return { g, pad, knobM, k: 0, set(k) { arm.rotation.z = MathUtils.lerp(0.02, 0.36, k); }, closed: (on) => !on };
}

function glowTex() {
  return canvasTex((g, w, h) => {
    const r = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(0.35, 'rgba(255,255,255,.45)'); r.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = r; g.fillRect(0, 0, w, h);
  }, 128, 128);
}

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space'), cv = $('.al-space-cv');
  const R = { rule: $('.cp-lg-rule'), out: $('.cp-lg-out'), table: $('.cp-lg-table tbody'), thead: $('.cp-lg-table thead'), msg: $('.cp-msg'), play: $('.al-play'), ins: { a: $('[data-in="a"]'), b: $('[data-in="b"]') } };
  const RULES = JSON.parse(root.getAttribute('data-rules'));
  const state = { gate: 'and', a: 0, b: 0, playing: false, labels: true, flow: true, t: 0 };
  let script = null, view = null, tour = null;

  const out = () => (state.gate === 'not' ? GATES.not.fn(state.a) : GATES[state.gate].fn(state.a, state.b));
  const say = (en, zh) => { R.msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  const press = (sel, attr, v) => $$(sel).forEach((b) => b.setAttribute('aria-pressed', b.getAttribute(attr) === String(v) ? 'true' : 'false'));

  function show() {
    const g = GATES[state.gate], o = out(), r = RULES[state.gate];
    root.dataset.gate = state.gate;
    press('[data-gate]', 'data-gate', state.gate);
    R.rule.innerHTML = `${r.en}<span class="zh">${r.zh}</span>`;
    for (const id of ['a', 'b']) {
      const b = R.ins[id]; b.setAttribute('aria-pressed', state[id] ? 'true' : 'false'); b.querySelector('b').textContent = String(state[id]);
    }
    R.ins.b.hidden = g.inputs === 1;
    R.out.innerHTML = `<b>${o}</b><span>${o ? 'Light on · 燈亮' : 'Light off · 燈滅'}</span>`;
    R.out.classList.toggle('is-on', !!o);
    R.thead.innerHTML = g.inputs === 1 ? '<tr><th>A</th><th>NOT A<small>燈</small></th></tr>' : `<tr><th>A</th><th>B</th><th>A ${g.en} B<small>燈</small></th></tr>`;
    R.table.innerHTML = truthTable(state.gate).map((row) => {
      const cur = row.a === state.a && (g.inputs === 1 || row.b === state.b);
      return `<tr class="${cur ? 'is-cur' : ''}${row.out ? ' is-one' : ''}"><td>${row.a}</td>${g.inputs === 1 ? '' : `<td>${row.b}</td>`}<td><b>${row.out}</b></td></tr>`;
    }).join('') + (g.inputs === 1 ? '<tr class="is-pad" aria-hidden="true"><td>&nbsp;</td><td></td></tr>'.repeat(2) : '');
    if (view) view.sync();
  }
  function told() {
    const g = GATES[state.gate], o = out();
    if (g.inputs === 1) say(`A is ${state.a}, so NOT A is ${o}: the light is ${o ? 'on' : 'off'}.`, `A 是 ${state.a}，所以 NOT A 是 ${o}：燈${o ? '亮' : '滅'}。`);
    else say(`A is ${state.a} and B is ${state.b}, so A ${g.en} B is ${o}: the light is ${o ? 'on' : 'off'}.`, `A 是 ${state.a}、B 是 ${state.b}，所以 A ${g.en} B 是 ${o}：燈${o ? '亮' : '滅'}。`);
  }
  function setGate(k, keep) { state.gate = k; if (!keep) { state.a = 0; state.b = 0; } if (view) view.build(); show(); }
  function setIn(a, b) { state.a = a ? 1 : 0; if (b !== undefined) state.b = b ? 1 : 0; show(); }
  function toggle(id) { if (id === 'b' && GATES[state.gate].inputs === 1) return; state[id] = state[id] ? 0 : 1; show(); told(); }
  function user() { script = null; if (state.playing) setPlaying(false); root.classList.remove('al-fresh'); }
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Try every row · 每一列都試一次';
    root.classList.remove('al-fresh');
    tour = v ? { i: -1, wait: 0 } : null;
  }

  $$('[data-gate]').forEach((b) => b.addEventListener('click', () => { user(); setGate(b.getAttribute('data-gate')); told(); }));
  for (const id of ['a', 'b']) R.ins[id].addEventListener('click', () => { user(); toggle(id); });
  R.play.addEventListener('click', () => { script = null; setPlaying(!state.playing); });
  const tgL = $('[data-t="labels"]'), tgF = $('[data-t="flow"]');
  if (tgL) tgL.addEventListener('change', () => { state.labels = tgL.checked; });
  if (tgF) tgF.addEventListener('change', () => { state.flow = tgF.checked; });

  // ── 3D ──────────────────────────────────────────────────────────────
  function make3D() {
    let renderer;
    try { renderer = new WebGLRenderer({ canvas: cv, antialias: true }); } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = PCFShadowMap;
    const scene = new Scene();
    scene.background = new Color(0x0b1326);
    const camera = new PerspectiveCamera(34, 1, 0.05, 200);
    const controls = new OrbitControls(camera, cv);
    controls.enableDamping = true; controls.dampingFactor = 0.08;
    controls.minDistance = 3; controls.maxDistance = 40; controls.maxPolarAngle = Math.PI * 0.48;
    scene.add(new HemisphereLight(0xdfe8ff, 0x1a1410, 0.8));
    scene.add(new AmbientLight(0xffffff, 0.18));
    const sun = new DirectionalLight(0xfff1dc, 1.25);
    sun.position.set(-4, 9, 6); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -7, right: 7, top: 5, bottom: -5, near: 1, far: 25 });
    sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.02;
    scene.add(sun);
    const floor = new Mesh(new CircleGeometry(90, 64), std(0x121c36, { roughness: 0.95 }));
    floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
    const board = new Mesh(new BoxGeometry(11.4, 0.12, 7.2), std(0x6b4a2e, { roughness: 0.8 }));
    board.position.set(0, 0.06, 0.6); board.receiveShadow = true; scene.add(board);

    // 電池（躺著的圓柱，右邊是正極）
    const bat = new Group(); bat.position.set(BAT[0], 0.5, 1.2);
    const body = new Mesh(new CylinderGeometry(0.34, 0.34, 1.5, 24), std(0x2f6fd0, { roughness: 0.4 })); body.rotation.x = Math.PI / 2; body.castShadow = true;
    const band = new Mesh(new CylinderGeometry(0.345, 0.345, 0.5, 24), std(0xe8b923, { roughness: 0.4 })); band.rotation.x = Math.PI / 2; band.position.z = -0.5;
    const cap = new Mesh(new CylinderGeometry(0.12, 0.12, 0.14, 16), std(0xb9bec8, { metalness: 0.8, roughness: 0.3 })); cap.rotation.x = Math.PI / 2; cap.position.z = -0.82;
    bat.add(body, band, cap); scene.add(bat);

    // 燈泡
    const glow = glowTex();
    const socket = new Mesh(new CylinderGeometry(0.22, 0.28, 0.5, 20), std(0xb9bec8, { roughness: 0.35, metalness: 0.8 })); socket.position.set(BULB[0], 0.37, 0); socket.castShadow = true;
    const glassM = new MeshStandardMaterial({ color: 0x39414f, emissive: 0xffc94a, emissiveIntensity: 0, roughness: 0.25, transparent: true, opacity: 0.9 });
    const glass = new Mesh(new SphereGeometry(0.5, 30, 22), glassM); glass.position.set(BULB[0], 1.02, 0); glass.castShadow = true;
    const halo = new Sprite(new SpriteMaterial({ map: glow, color: 0xffd36e, blending: AdditiveBlending, depthWrite: false, transparent: true, opacity: 0 }));
    halo.position.copy(glass.position); halo.scale.setScalar(3.2);
    const lamp = new PointLight(0xffc870, 0, 6, 1.6); lamp.position.set(BULB[0], 1.2, 0.3);
    scene.add(socket, glass, halo, lamp);
    const warm = new Color(0xffdb85), green = new Color(0x38c778);
    let lit = 0;

    // 光點（一批共用，路通了才看得見）
    const dots = Array.from({ length: 40 }, () => { const s = new Sprite(new SpriteMaterial({ map: glow, color: 0x7ef0e3, blending: AdditiveBlending, depthWrite: false, transparent: true, opacity: 0 })); s.scale.setScalar(0.34); scene.add(s); return s; });

    const lab = labeler($('.al-labels'), cv, camera);
    const lb = { a: lab.add('cp-lb cp-lb-in', ''), b: lab.add('cp-lb cp-lb-in', ''), out: lab.add('cp-lb cp-lb-in', ''), bat: lab.add('cp-lb cp-lb-end', 'battery<small>電池</small>') };
    const tmp = V(0, 0, 0);

    let gateGroup = null, sws = {}, paths = [];
    function build() {
      if (gateGroup) { scene.remove(gateGroup); gateGroup.traverse((m) => { if (m.geometry) m.geometry.dispose(); }); }
      gateGroup = new Group(); sws = {};
      const L = LAYOUT[state.gate], back = state.gate === 'or' ? BACK + 0.5 : BACK;
      for (const [p, q] of L.wires) wire(gateGroup, p, q);
      wire(gateGroup, [BULB[0], 0], [BULB[0], back]); wire(gateGroup, [BULB[0], back], [BAT[0], back]); wire(gateGroup, [BAT[0], back], [BAT[0], 2.0]); wire(gateGroup, [BAT[0], 0.4], [BAT[0], 0]);
      for (const s of L.sw) { const k = s.seesaw ? seesaw(s.x, s.z) : knife(s.x, s.z); k.pad.userData.sw = s.id; k.pos = s; k.k = state[s.id]; gateGroup.add(k.g); sws[s.id] = k; }
      paths = L.paths.map((p) => {
        const pts = p.pts.map(([x, z]) => V(x, Y + 0.06, z)); const seg = []; let total = 0;
        for (let i = 0; i < pts.length - 1; i++) { const d = pts[i].distanceTo(pts[i + 1]); seg.push(d); total += d; }
        return { need: p.need, pts, seg, total };
      });
      scene.add(gateGroup);
      sync();
    }
    function sync() {
      for (const id of Object.keys(sws)) sws[id].target = state[id];
      for (const id of ['a', 'b']) { lb[id].innerHTML = `${id.toUpperCase()} = ${state[id]}`; lb[id].classList.toggle('is-on', !!state[id]); }
      const o = out(); lb.out.innerHTML = `light = ${o}<small>燈＝${o}</small>`; lb.out.classList.toggle('is-on', !!o);
    }
    const live = (p) => p.need.every((n) => (n[0] === '!' ? !state[n.slice(1)] : !!state[n]));
    function at(p, d, outV) {
      let r = ((d % p.total) + p.total) % p.total;
      for (let i = 0; i < p.seg.length; i++) { if (r <= p.seg[i]) return outV.lerpVectors(p.pts[i], p.pts[i + 1], r / p.seg[i]); r -= p.seg[i]; }
      return outV.copy(p.pts[0]);
    }
    function tick(dt) {
      let moving = true;
      for (const id of Object.keys(sws)) {
        const s = sws[id]; s.k += ((s.target ?? 0) - s.k) * Math.min(1, dt * 14);
        if (Math.abs((s.target ?? 0) - s.k) > 0.08) moving = false;
        s.set(s.k); s.knobM.color.setHex(0xd4574a).lerp(green, s.k);
      }
      const o = out() && moving ? 1 : 0;
      lit += (o - lit) * Math.min(1, dt * 12);
      glassM.emissiveIntensity = lit * 2.6; glassM.color.setHex(0x39414f).lerp(warm, lit);
      halo.material.opacity = lit * 0.85; lamp.intensity = lit * 3.2;
      const on = paths.filter(live); let n = 0;
      if (state.flow && o) for (const p of on) {
        const count = Math.min(Math.floor(dots.length / on.length), Math.round(p.total / 1.1));
        for (let k = 0; k < count; k++) { const d = dots[n++]; at(p, state.t * 2.2 + (k * p.total) / count, d.position); d.material.opacity = 0.95; }
      }
      for (; n < dots.length; n++) dots[n].material.opacity = 0;
      if (fly.t < 1) {
        fly.t = Math.min(1, fly.t + dt / 1.0);
        const k = MathUtils.smootherstep(fly.t, 0, 1);
        camera.position.lerpVectors(fly.p0, fly.p1, k); controls.target.lerpVectors(fly.t0, fly.t1, k);
      }
    }
    function fit(w, h) {
      const vf = MathUtils.degToRad(camera.fov / 2), hf = Math.atan(Math.tan(vf) * camera.aspect);
      return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf));
    }
    const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
    function goHome(instant) {
      const t = V(0, 0.4, 0.5), p = V(0, 0.95, 1).normalize().multiplyScalar(fit(12.2, 6.4)).add(t);
      if (instant) { camera.position.copy(p); controls.target.copy(t); fly.t = 1; return; }
      fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0;
    }
    function labels() {
      const on = state.labels;
      for (const id of ['a', 'b']) {
        const s = sws[id]; lb[id].hidden = !on || !s;
        if (!lb[id].hidden) lab.place(lb[id], tmp.set(s.pos.x + (s.pos.seesaw ? -1.3 : 0), 1.25, s.pos.z), -8);
      }
      lb.out.hidden = !on; if (on) lab.place(lb.out, tmp.set(BULB[0], 1.9, 0), -8);
      lb.bat.hidden = !on || root.classList.contains('cp-narrow'); if (!lb.bat.hidden) lab.place(lb.bat, tmp.set(BAT[0], 1.15, 1.2), 0);
    }
    function render() { controls.update(); labels(); renderer.render(scene, camera); }

    const ray = new Raycaster(), ndc = new Vector2();
    const hit = (e) => { const r = cv.getBoundingClientRect(); ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); ray.setFromCamera(ndc, camera); const h = ray.intersectObjects(Object.values(sws).map((s) => s.pad), false)[0]; return h ? h.object.userData.sw : null; };
    let down = null;
    cv.addEventListener('pointerdown', (e) => { down = { x: e.clientX, y: e.clientY }; });
    cv.addEventListener('pointerup', (e) => {
      if (!down) return;
      const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y); down = null;
      if (moved > 6) return;
      const id = hit(e); if (id) { user(); toggle(id); }
    });
    cv.addEventListener('pointermove', (e) => { if (e.pointerType === 'mouse') cv.style.cursor = hit(e) ? 'pointer' : ''; });
    $('.al-home').addEventListener('click', () => goHome(false));

    let band0 = null;
    function resize() {
      const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.fov = camera.aspect < 1.1 ? 42 : 34; camera.updateProjectionMatrix();
      root.classList.toggle('cp-narrow', w < 520);
      const b = camera.aspect < 0.9 ? 0 : camera.aspect < 1.25 ? 1 : 2;
      if (b !== band0) { band0 = b; goHome(true); }
    }
    build();
    new ResizeObserver(resize).observe(spaceWrap);
    resize();
    return { camera, controls, scene, build, sync, tick, render, goHome };
  }
  view = make3D();
  if (!view) root.classList.add('al-nogl');

  // ── 卡片示範 ──────────────────────────────────────────────────────────
  const DEMO = {
    and() { script = null; setPlaying(false); setGate('and'); say('Two switches in a row. The current has to get through both of them.', '兩個開關排成一排，電要兩個都過得去才行。'); setPlaying(true); },
    or() { script = null; setPlaying(false); setGate('or'); say('Two switches side by side. The current can take either road.', '兩個開關一上一下，電走哪一條路都可以。'); setPlaying(true); },
    not() { script = null; setPlaying(false); setGate('not'); say('This switch is built like a seesaw. Push the handle down and the contact at the other end lifts off.', '這個開關像蹺蹺板：把手壓下去，另一頭的接點就翹起來。'); setPlaying(true); },
    wiring() {
      setPlaying(false); setGate('and'); setIn(1, 0);
      say('A is 1 and B is 0. Wired in a row (AND), the light is off.', 'A 是 1、B 是 0。排成一排（AND），燈不亮。');
      script = { t: 0, list: [
        { at: 2.6, fn: () => { setGate('or', true); say('Same switches, same positions, wired side by side (OR): the light is on. The wiring is the question being asked.', '同樣的開關、同樣的位置，改成一上一下（OR）：燈亮了。怎麼接線，就是在問什麼問題。'); } },
        { at: 6.0, fn: () => { setGate('and', true); say('Back to AND: off again. Nothing changed but the wires.', '接回 AND：又不亮了。變的只有線。'); } },
      ] };
    },
  };

  function step(dt) {
    state.t += dt;
    if (script) {
      script.t += dt;
      while (script && script.list.length && script.t >= script.list[0].at) script.list.shift().fn();
      if (script && !script.list.length) script = null;
    }
    if (tour) {
      tour.wait -= dt;
      if (tour.wait <= 0) {
        const rows = truthTable(state.gate);
        tour.i++;
        if (tour.i >= rows.length) { setPlaying(false); say(`That is every row: ${rows.length} possible inputs, and the light is on in ${rows.filter((r) => r.out).length} of them.`, `每一列都試過了：一共 ${rows.length} 種輸入，其中 ${rows.filter((r) => r.out).length} 種燈會亮。`); }
        else { const r = rows[tour.i]; setIn(r.a, r.b ?? 0); told(); tour.wait = 1.7; }
      }
    }
    if (view) view.tick(dt);
  }
  let raf = 0, last = 0, visible = false;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
    if (view) view.render();
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  setPlaying(false);
  show();
  say('Both handles are up, so there is a gap in the wire and the light is off. Push a handle down by tapping its switch.', '兩個把手都翹著，銅線中間有缺口，所以燈不亮。點一下開關，把把手壓下去。');
  root.classList.add('al-ready', 'al-fresh');

  root.__lab = {
    state, view, setGate, setIn, toggle, setPlaying, out,
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => view && view.goHome(true),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { step(0); if (view) view.render(); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  const w = document.querySelector('[data-cp-wire]'); if (w) initWire(w);
  const q = document.querySelector('[data-cp-lquiz]'); if (q) initQuiz(q);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-complogic-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
