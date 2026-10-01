/*
 * 萬物原理 · 第五課「網際網路怎麼運作？」的 3D 封包旅程（全部是示意，地圖不是真實形狀與比例）。
 *
 * 一個機制：訊息被切成有編號的小封包，每個封包由路由器一站一站往前傳，可以各走各的路；
 *   到了收件端再照編號排回原樣，缺了哪一號就請對方重送。
 *
 * 地圖（示意）：左邊台灣（彰化的手機 → Wi-Fi → 網路業者 → 通訊軟體的伺服器 → 海纜登陸站），
 *   中間太平洋海底兩條電纜：A 直達美國西岸、B 經過日本；右邊北美（西岸登陸站 → 兩條陸上路線的路由器 → 波士頓）。
 *   海纜畫在半透明海面下方。每到岔路，封包隨機選一條；「剪斷直達海纜」時，路由器自動改走 B。
 *   「路上弄丟一個封包」：某一號封包在美國西岸的路由器被丟掉；收件端等不到，就送一個「請重送」回伺服器，伺服器再送一次。
 *
 * 時間大大放慢：真實的旅程大約只要十分之一秒（光在光纖裡每秒約 20 萬公里，netcalc.js）。
 *
 * 產物：cd tools/science && npm run build → assets/js/internet-packets.js
 */
import {
  AmbientLight, BoxGeometry, CanvasTexture, CatmullRomCurve3, Color, CylinderGeometry, DirectionalLight,
  ExtrudeGeometry, Group, HemisphereLight, MathUtils, Mesh, MeshBasicMaterial, MeshStandardMaterial,
  PerspectiveCamera, PlaneGeometry, Scene, Shape, SphereGeometry, SRGBColorSpace, TubeGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { reassemble, outOfOrder } from './netcalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const LAND_Y = 0.32, SEA_FLOOR = -1.0;
const SPEED = 4.6;                      // 模型裡封包每秒走幾個單位
const MSGS = { text: { n: 4, en: 'Text message', zh: '文字訊息' }, photo: { n: 10, en: 'Photo', zh: '照片' } };
const PKT_COL = [0x58e1ff, 0xffd36e, 0x7cf29a, 0xff9fd2, 0xb89cff, 0xffb27a, 0x6fd3ff, 0xf2f27a, 0x9cffd8, 0xff8a7a, 0xc6e07a, 0x8ab4ff];

// ---------------- 節點 ----------------
const N = {
  phone: { p: V(-10.3, LAND_Y, 1.9), en: 'Your phone in Changhua', zh: '你在彰化的手機', kind: 'phone' },
  wifi: { p: V(-9.3, LAND_Y, 1.1), en: 'Wi-Fi router', zh: 'Wi-Fi 路由器', kind: 'router' },
  isp: { p: V(-9.9, LAND_Y, -0.1), en: 'Internet provider', zh: '網路業者', kind: 'router' },
  dc: { p: V(-10.5, LAND_Y, -1.5), en: "The app's servers (data center)", zh: '通訊軟體的伺服器（資料中心）', kind: 'dc' },
  landTW: { p: V(-8.7, LAND_Y, -2.5), en: 'Cable landing station', zh: '海纜登陸站', kind: 'station' },
  landJP: { p: V(-3.4, LAND_Y, -5.4), en: 'Japan', zh: '日本', kind: 'station' },
  landUS: { p: V(4.4, LAND_Y, -0.6), en: 'US West Coast landing', zh: '美國西岸登陸站', kind: 'station' },
  rw: { p: V(5.4, LAND_Y, -0.2), en: 'Router', zh: '路由器', kind: 'router' },
  c1: { p: V(7.4, LAND_Y, -1.9), en: 'Router', zh: '路由器', kind: 'router' },
  c2: { p: V(7.6, LAND_Y, 1.6), en: 'Router', zh: '路由器', kind: 'router' },
  ispB: { p: V(9.4, LAND_Y, 0.0), en: 'Internet provider', zh: '網路業者', kind: 'router' },
  phoneB: { p: V(10.1, LAND_Y, 0.7), en: "Your friend's phone in Boston", zh: '波士頓朋友的手機', kind: 'phone' },
};
const lift = (p, h = 0.25) => p.clone().setY(p.y + h);
// 邊：名字 → 路徑點
function edges() {
  const E = {};
  const land = (a, b, mid) => [lift(N[a].p), ...(mid || []), lift(N[b].p)];
  E['phone-wifi'] = land('phone', 'wifi');
  E['wifi-isp'] = land('wifi', 'isp');
  E['isp-dc'] = land('isp', 'dc');
  E['dc-landTW'] = land('dc', 'landTW');
  E.cableA = [lift(N.landTW.p), V(-7.2, SEA_FLOOR + 0.25, -2.6), V(-2.6, SEA_FLOOR, -1.6), V(1.2, SEA_FLOOR, -1.0), V(3.6, SEA_FLOOR + 0.25, -0.7), lift(N.landUS.p)];
  E.cableB1 = [lift(N.landTW.p), V(-7.4, SEA_FLOOR + 0.25, -3.6), V(-5.2, SEA_FLOOR, -5.0), lift(N.landJP.p)];
  E.cableB2 = [lift(N.landJP.p), V(-1.4, SEA_FLOOR, -5.4), V(1.6, SEA_FLOOR, -3.6), V(3.6, SEA_FLOOR + 0.25, -1.4), lift(N.landUS.p)];
  E['landUS-rw'] = land('landUS', 'rw');
  E['rw-c1'] = land('rw', 'c1', [V(6.4, LAND_Y + 0.25, -1.5)]);
  E['rw-c2'] = land('rw', 'c2', [V(6.5, LAND_Y + 0.25, 1.1)]);
  E['c1-ispB'] = land('c1', 'ispB', [V(8.6, LAND_Y + 0.25, -1.3)]);
  E['c2-ispB'] = land('c2', 'ispB', [V(8.7, LAND_Y + 0.25, 1.2)]);
  E['ispB-phoneB'] = land('ispB', 'phoneB');
  const out = {};
  for (const [k, pts] of Object.entries(E)) {
    const curve = new CatmullRomCurve3(pts, false, 'centripetal');
    out[k] = { k, curve, len: curve.getLength() };
  }
  return out;
}

const MSG = {
  idle: ['Press Send. Your message will be cut into numbered packets, and each packet finds its own way across the ocean.',
    '按「傳送」。你的訊息會被切成有編號的封包，每個封包自己找路越過海洋。'],
  sending: ['Each router reads the address on a packet and passes it to the next router. Watch the packets split up: some take the direct cable, some go by way of Japan.',
    '每個路由器讀封包上的地址，再交給下一個路由器。看封包分頭走：有的走直達海纜，有的經過日本。'],
  waiting: ['One number is missing! Your friend’s phone waits a moment, then asks the app’s servers to send that packet again.',
    '少了一號！朋友的手機等了一下，就請通訊軟體的伺服器把那一號再送一次。'],
  done: ['All the packets arrived, even if they came out of order. The phone put them back together by their numbers, and the message is complete.',
    '所有封包都到了，就算到的順序亂了也沒關係。手機照編號把它們排回原樣，訊息就完整了。'],
  cut: ['The direct cable is cut, so the routers send every packet the long way, through Japan. The message still gets through.',
    '直達的海纜斷了，路由器就把每個封包都改走經過日本的遠路，訊息一樣送得到。'],
};

function numTex(n, col) {
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const g = c.getContext('2d');
  g.fillStyle = `#${col.toString(16).padStart(6, '0')}`; g.fillRect(0, 0, 64, 64);
  g.fillStyle = '#0b1220'; g.font = '800 40px system-ui, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(String(n), 32, 35);
  const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace; return t;
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
  scene.background = new Color(0x0a1224);
  const camera = new PerspectiveCamera(34, 1, 0.1, 200);
  const TARGET = V(-0.9, -0.3, -0.9);
  // 整張地圖（台灣到波士頓）寬約 28 單位：依畫面寬窄決定退多遠
  const homePos = () => TARGET.clone().add(V(0, 17, 17.5).multiplyScalar(camera.aspect < 0.9 ? 1.95 : camera.aspect < 1.2 ? 1.55 : 1.12));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 4; controls.maxDistance = 60;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xdfe8ff, 0x1a2238, 1.0));
  scene.add(new AmbientLight(0xffffff, 0.3));
  const key = new DirectionalLight(0xfff3e0, 1.4); key.position.set(-4, 14, 8); scene.add(key);

  const R = {
    slots: $('.ip-slots'), status: $('.ip-status'), msg: $('.ip-msg'), sent: $('.ip-sent'), arr: $('.ip-arr'), resent: $('.ip-resent'), order: $('.ip-order'),
  };
  const lab = labeler($('.al-labels'), cv, camera);
  const state = {
    playing: true, labels: true, lose: false, cutA: false, auto: true, autoT: 1.0, nextKind: 'text',
    msg: null, lastMsg: '',
  };

  // ---------------- 地圖 ----------------
  const sea = new Mesh(new PlaneGeometry(40, 22), new MeshStandardMaterial({ color: 0x1f5c9a, transparent: true, opacity: 0.38, roughness: 0.3, depthWrite: false }));
  sea.rotation.x = -Math.PI / 2; sea.position.set(0.5, 0, -1); sea.renderOrder = 2; scene.add(sea);
  const floor = new Mesh(new PlaneGeometry(40, 22), new MeshStandardMaterial({ color: 0x0c1830, roughness: 0.95 }));
  floor.rotation.x = -Math.PI / 2; floor.position.set(0.5, SEA_FLOOR - 0.12, -1); scene.add(floor);
  const landMat = new MeshStandardMaterial({ color: 0x3e6b4f, roughness: 0.85 });
  const blob = (cx, cz, rx, rz, rot = 0) => {
    const s = new Shape();
    for (let i = 0; i <= 48; i++) {
      const a = i / 48 * Math.PI * 2;
      const wob = 1 + 0.06 * Math.sin(a * 3 + cx) + 0.04 * Math.cos(a * 5 + cz);
      const x = Math.cos(a) * rx * wob, z = Math.sin(a) * rz * wob;
      const xr = x * Math.cos(rot) - z * Math.sin(rot), zr = x * Math.sin(rot) + z * Math.cos(rot);
      if (i) s.lineTo(xr, zr); else s.moveTo(xr, zr);
    }
    const g = new ExtrudeGeometry(s, { depth: LAND_Y - SEA_FLOOR + 0.12, bevelEnabled: false });
    g.rotateX(Math.PI / 2);
    const m = new Mesh(g, landMat);
    m.position.set(cx, LAND_Y, cz);
    scene.add(m);
    return m;
  };
  blob(-9.6, -0.2, 1.75, 3.5, 0.12);               // 台灣
  blob(-3.0, -5.6, 0.7, 1.7, -0.9);                // 日本（示意）
  const na = new Shape(); na.moveTo(4, -6); na.lineTo(12, -6); na.lineTo(12, 5); na.lineTo(4.6, 5); na.quadraticCurveTo(3.6, 0, 4, -6);
  const naG = new ExtrudeGeometry(na, { depth: LAND_Y - SEA_FLOOR + 0.12, bevelEnabled: false }); naG.rotateX(Math.PI / 2);
  scene.add(at(new Mesh(naG, landMat), 0, LAND_Y, 0));

  // ---------------- 節點的樣子 ----------------
  const nodeMesh = {};
  const ledMats = {};
  for (const [k, n] of Object.entries(N)) {
    const g = new Group(); g.position.copy(n.p); scene.add(g);
    let body;
    if (n.kind === 'phone') body = at(new Mesh(new BoxGeometry(0.28, 0.5, 0.06), new MeshStandardMaterial({ color: 0x1b2233, roughness: 0.4 })), 0, 0.27, 0);
    else if (n.kind === 'dc') {
      body = new Group();
      for (let i = 0; i < 3; i++) body.add(at(new Mesh(new BoxGeometry(0.22, 0.7, 0.32), new MeshStandardMaterial({ color: 0x39425a })), -0.26 + i * 0.26, 0.35, 0));
    } else if (n.kind === 'station') body = at(new Mesh(new BoxGeometry(0.5, 0.3, 0.4), new MeshStandardMaterial({ color: 0xd8dee8 })), 0, 0.15, 0);
    else body = at(new Mesh(new BoxGeometry(0.42, 0.14, 0.3), new MeshStandardMaterial({ color: 0x2b3550 })), 0, 0.08, 0);
    g.add(body);
    const led = new MeshBasicMaterial({ color: 0x3bff8a });
    ledMats[k] = led;
    g.add(at(new Mesh(new SphereGeometry(0.05, 8, 6), led), 0.12, n.kind === 'dc' ? 0.75 : n.kind === 'phone' ? 0.55 : 0.2, 0.16));
    if (n.kind === 'phone') g.add(at(new Mesh(new BoxGeometry(0.22, 0.4, 0.01), new MeshBasicMaterial({ color: 0x5aa8ff })), 0, 0.27, 0.035));
    nodeMesh[k] = g;
  }

  // ---------------- 線路 ----------------
  const E = edges();
  const wireMat = new MeshStandardMaterial({ color: 0x8aa0c8, roughness: 0.5 });
  const cableMat = new MeshStandardMaterial({ color: 0x1b1f28, roughness: 0.6, emissive: 0x2a6fb0, emissiveIntensity: 0.25 });
  const cutMat = new MeshStandardMaterial({ color: 0x1b1f28, roughness: 0.6, emissive: 0xff3b3b, emissiveIntensity: 0.35 });
  const edgeMesh = {};
  for (const e of Object.values(E)) {
    const isCable = e.k.startsWith('cable');
    const m = new Mesh(new TubeGeometry(e.curve, isCable ? 120 : 30, isCable ? 0.07 : 0.035, 8, false), isCable ? cableMat : wireMat);
    scene.add(m); edgeMesh[e.k] = m;
  }
  // 斷掉的地方：紅色的缺口
  const cutMark = new Group(); scene.add(cutMark);
  E.cableA.curve.getPointAt(0.5, cutMark.position);
  for (const s of [-1, 1]) { const b = new Mesh(new BoxGeometry(0.9, 0.08, 0.08), new MeshBasicMaterial({ color: 0xff4a4a })); b.rotation.y = s * Math.PI / 4; cutMark.add(b); }
  cutMark.visible = false;

  // ---------------- 封包 ----------------
  const pktGeo = new BoxGeometry(0.34, 0.34, 0.34);
  const texCache = {};
  const pktMat = (n) => (texCache[n] ||= new MeshStandardMaterial({ map: numTex(n, PKT_COL[(n - 1) % PKT_COL.length]), roughness: 0.4, emissive: 0x111111 }));
  const reqMat = new MeshBasicMaterial({ color: 0xffd36e });
  const PK = [];      // 路上的封包
  const FX = [];      // 掉封包的紅色閃光
  const pick = (a, b) => (Math.random() < 0.5 ? a : b);
  function forwardFrom(fromDc) {
    const r = fromDc ? [] : ['phone-wifi', 'wifi-isp', 'isp-dc'];
    r.push('dc-landTW');
    if (state.cutA) r.push('cableB1', 'cableB2'); else r.push(...(Math.random() < 0.5 ? ['cableA'] : ['cableB1', 'cableB2']));
    r.push('landUS-rw', pick('rw-c1', 'rw-c2'));
    r.push(r[r.length - 1] === 'rw-c1' ? 'c1-ispB' : 'c2-ispB', 'ispB-phoneB');
    return r.map((k) => ({ e: E[k], rev: false }));
  }
  function backRoute() {
    const f = forwardFrom(true).reverse();
    return f.map((s) => ({ e: s.e, rev: true }));
  }
  function spawnPacket(n, fromDc, isReq = false) {
    const mesh = new Mesh(isReq ? new SphereGeometry(0.17, 12, 10) : pktGeo, isReq ? reqMat : pktMat(n));
    scene.add(mesh);
    const route = isReq ? backRoute() : forwardFrom(fromDc);
    PK.push({ n, mesh, route, seg: 0, u: 0, isReq, lost: false });
  }

  // ---------------- 一則訊息 ----------------
  function send(kind) {
    for (const p of PK) scene.remove(p.mesh);
    PK.length = 0;
    const total = MSGS[kind].n;
    state.msg = {
      kind, total, sentAt: 0, sendT: 0, nextN: 1, arrived: [], resent: 0, lostN: state.lose ? Math.max(2, Math.ceil(total * 0.6)) : 0,
      lostDone: false, waitT: 0, requested: false, done: false, doneT: 0,
    };
    R.slots.innerHTML = Array.from({ length: total }, (_, i) =>
      `<span class="ip-slot" data-n="${i + 1}" style="--c:#${PKT_COL[i % PKT_COL.length].toString(16).padStart(6, '0')}">${i + 1}</span>`).join('');
    readout(true);
  }
  root.querySelectorAll('[data-send]').forEach((b) => b.addEventListener('click', () => { state.auto = false; send(b.getAttribute('data-send')); if (!state.playing) setPlaying(true); }));

  function arrive(p) {
    const m = state.msg;
    if (!m) return;
    if (p.isReq) {           // 「請重送」到了伺服器：把缺的那一號再送一次
      for (const n of reassemble(m.total, m.arrived).missing) { spawnPacket(n, true); m.resent += 1; }
      return;
    }
    if (!m.arrived.includes(p.n)) m.arrived.push(p.n);
    const slot = R.slots.querySelector(`[data-n="${p.n}"]`);
    if (slot) { slot.classList.add('on'); slot.dataset.order = String(m.arrived.length); }
    const r = reassemble(m.total, m.arrived);
    if (r.complete) { m.done = true; m.doneT = 0; }
    m.waitT = 0;
  }

  function step(dt) {
    if (!state.playing) return;
    const m = state.msg;
    // 自動示範：沒按過按鈕之前，文字、照片輪流傳
    if (state.auto) {
      if (!m || (m.done && m.doneT > 3.2)) {
        state.autoT -= dt;
        if (state.autoT <= 0) { send(state.nextKind); state.nextKind = state.nextKind === 'text' ? 'photo' : 'text'; state.autoT = 0.6; }
      }
    }
    if (m) {
      // 依序送出
      if (m.nextN <= m.total) {
        m.sendT -= dt;
        if (m.sendT <= 0) { spawnPacket(m.nextN, false); m.nextN += 1; m.sendT = 0.42; }
      }
      if (m.done) m.doneT += dt;
      // 等不到缺的那一號 → 送「請重送」
      const r = reassemble(m.total, m.arrived);
      const inFlight = PK.some((p) => !p.isReq && !p.lost);
      if (!r.complete && m.nextN > m.total && !inFlight && !m.requested && m.arrived.length) {
        m.waitT += dt;
        if (m.waitT > 1.1) { m.requested = true; spawnPacket(0, false, true); }
      }
    }
    // 移動
    for (let i = PK.length - 1; i >= 0; i--) {
      const p = PK[i];
      const s = p.route[p.seg];
      p.u += dt * SPEED / s.e.len;
      if (p.u >= 1) {
        p.u = 0; p.seg += 1;
        if (p.seg >= p.route.length) { arrive(p); scene.remove(p.mesh); PK.splice(i, 1); continue; }
        // 剛走完「登陸站 → 路由器」這段＝到了美國西岸的路由器：要弄丟的那一號在這裡被丟掉
        if (!p.isReq && m && p.n === m.lostN && !m.lostDone && p.route[p.seg - 1].e.k === 'landUS-rw') {
          m.lostDone = true; p.lost = true;
          FX.push({ pos: N.rw.p.clone().setY(LAND_Y + 0.3), t: 0 });
          scene.remove(p.mesh); PK.splice(i, 1); continue;
        }
      }
      const seg = p.route[p.seg];
      const u = seg.rev ? 1 - p.u : p.u;
      seg.e.curve.getPointAt(Math.min(1, Math.max(0, u)), p.mesh.position);
      p.mesh.rotation.y += dt * 1.5;
    }
    for (let i = FX.length - 1; i >= 0; i--) { FX[i].t += dt; if (FX[i].t > 1.2) FX.splice(i, 1); }
    // 路由器的燈：附近有封包時閃
    const t = performance.now() / 1000;
    for (const [k, mat] of Object.entries(ledMats)) {
      const near = PK.some((p) => p.mesh.position.distanceTo(N[k].p) < 0.7);
      mat.color.setHex(near ? (Math.sin(t * 30) > 0 ? 0xffffff : 0x3bff8a) : 0x2a9a5a);
    }
    readout();
  }

  // 掉封包的閃光（每格畫）
  const fxMesh = new Mesh(new SphereGeometry(0.5, 16, 12), new MeshBasicMaterial({ color: 0xff4a4a, transparent: true, opacity: 0 }));
  scene.add(fxMesh);
  function drawFx() {
    const f = FX[0];
    fxMesh.visible = !!f;
    if (f) { fxMesh.position.copy(f.pos); fxMesh.scale.setScalar(0.4 + f.t * 1.2); fxMesh.material.opacity = 0.7 * (1 - f.t / 1.2); }
  }

  // ---------------- 標籤 ----------------
  const LB = {};
  const show = { phone: 1, wifi: 1, isp: 1, dc: 1, landTW: 1, landJP: 1, landUS: 1, c1: 1, phoneB: 1, ispB: 0, rw: 0, c2: 0 };
  for (const [k, n] of Object.entries(N)) if (show[k]) LB[k] = lab.add(`bt-lb ip-lb-${n.kind}`, `${n.en}<small>${n.zh}</small>`);
  const extra = {
    cableA: [lab.add('bt-lb bt-lb-el', 'Undersea cable A: direct<small>海底電纜 A：直達</small>'), () => E.cableA.curve.getPointAt(0.42)],
    cableB: [lab.add('bt-lb bt-lb-el', 'Undersea cable B: by way of Japan<small>海底電纜 B：經過日本</small>'), () => E.cableB2.curve.getPointAt(0.45)],
    tw: [lab.add('bt-lb ip-region', 'Taiwan<small>台灣</small>'), () => V(-7.6, LAND_Y, 3.4)],
    pac: [lab.add('bt-lb ip-region', 'Pacific Ocean<small>太平洋</small>'), () => V(-1.5, 0, 2.6)],
    na: [lab.add('bt-lb ip-region', 'North America<small>北美洲</small>'), () => V(8.8, LAND_Y, 4.1)],
    lost: [lab.add('bt-lb ip-lb-lost', 'Packet lost!<small>封包掉了！</small>'), () => N.rw.p.clone().setY(1.2)],
  };
  // 台灣這幾站靠得很近：標籤往不同方向錯開
  const LB_OFF = { phone: V(-0.2, 0.3, 0.9), wifi: V(1.7, 0.6, 0.2), isp: V(-1.9, 0.6, 0.2), dc: V(-0.6, 1.7, -1.6), landTW: V(2.6, 0.6, 0.5), phoneB: V(0.2, 0.3, 0.9) };
  let narrow = false;
  const TIGHT = new Set(['wifi', 'isp', 'landJP', 'c1', 'landUS', 'landTW']);
  function updateLabels() {
    const on = state.labels;
    for (const [k, el] of Object.entries(LB)) {
      const hide = !on || (narrow && TIGHT.has(k));
      el.hidden = hide;
      if (!hide) lab.place(el, N[k].p.clone().add(LB_OFF[k] || V(0, 0.8, 0)));
    }
    for (const [k, [el, f]] of Object.entries(extra)) {
      let s = on;
      if (k === 'lost') s = FX.length > 0;
      if (narrow && (k === 'cableB' || k === 'pac' || k === 'tw' || k === 'na')) s = false;
      el.hidden = !s;
      if (s) lab.place(el, f());
    }
  }

  // ---------------- 讀數 ----------------
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  let lastR = 0;
  function readout(force) {
    const now = performance.now();
    if (!force && now - lastR < 150) return;
    lastR = now;
    const m = state.msg;
    let key = 'idle';
    if (m) key = m.done ? 'done' : m.requested && !m.done ? 'waiting' : 'sending';
    if (key === 'sending' && state.cutA) key = 'cut';
    const html = `${esc(MSG[key][0])}<span class="zh">${esc(MSG[key][1])}</span>`;
    if (html !== state.lastMsg) { R.msg.innerHTML = html; state.lastMsg = html; }
    if (!m) { R.status.innerHTML = 'Waiting to send<small>等待傳送</small>'; return; }
    const k = MSGS[m.kind];
    R.status.innerHTML = m.done ? `&#10003; ${esc(k.en)} complete<small>${esc(k.zh)}收到了，完整無缺</small>` : `${esc(k.en)}: ${m.arrived.length} of ${m.total} packets<small>${esc(k.zh)}：${m.total} 個封包到了 ${m.arrived.length} 個</small>`;
    R.status.classList.toggle('ok', m.done);
    R.sent.textContent = String(Math.min(m.nextN - 1, m.total));
    R.arr.textContent = String(m.arrived.length);
    R.resent.textContent = String(m.resent);
    R.order.textContent = m.arrived.length < 2 ? '—' : outOfOrder(m.arrived) ? 'Yes · 亂了' : 'No · 沒亂';
    root.classList.toggle('ip-is-done', m.done);
  }

  // ---------------- 操作 ----------------
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    const p = $('.al-play');
    p.setAttribute('aria-pressed', v ? 'true' : 'false');
    p.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  $('.al-play').addEventListener('click', () => setPlaying(!state.playing));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="lose"]', (v) => { state.lose = v; });
  bind('[data-t="cut"]', (v) => { setCut(v); });
  function setCut(v) {
    state.cutA = v; cutMark.visible = v; edgeMesh.cableA.material = v ? cutMat : cableMat;
    const t = $('[data-t="cut"]'); if (t) t.checked = v;
    // 正在 A 上的封包：斷掉那一刻在海裡的，改當作掉了（之後會被要求重送）
    readout(true);
  }
  function setLose(v) { state.lose = v; const t = $('[data-t="lose"]'); if (t) t.checked = v; }
  $('.al-home').addEventListener('click', () => flyTo(homePos(), TARGET));
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0; }

  // ---------------- 迴圈 ----------------
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
    drawFx();
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 0.9);
      const k = MathUtils.smootherstep(fly.t, 0, 1);
      camera.position.lerpVectors(fly.p0, fly.p1, k);
      controls.target.lerpVectors(fly.t0, fly.t1, k);
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
    camera.fov = camera.aspect < 0.9 ? 46 : 34;
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
  root.classList.add('al-ready', 'al-fresh', 'is-playing');
  readout(true);

  // 除錯：document.querySelector('[data-internet-lab]').__lab
  root.__lab = {
    camera, controls, state, send, setCut, setLose,
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) { step(0.02); drawFx(); } },
    render: () => { controls.update(); updateLabels(); readout(true); renderer.render(scene, camera); },
  };
  return {
    ready: () => true,
    demo: (v) => {
      state.auto = false;
      setCut(v === 'cut'); setLose(v === 'lose');
      send(v === 'photo' || v === 'cut' ? 'photo' : 'text');
      if (!state.playing) setPlaying(true);
    },
  };
}

lazyBoot('[data-internet-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
