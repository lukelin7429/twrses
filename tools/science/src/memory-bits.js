/*
 * 萬物原理 · 第八課「電腦怎麼記住東西？」的 3D 記憶體格子（自繪示意，放大了不知幾億倍）。
 *
 * 一個機制：每一格是一個極小的「杯子」（電容）；裝滿電荷是 1、空的是 0。8 格排成一排＝1 個位元組，
 *   每排有編號（位址）。寫入：把文字變成位元組（UTF-8），一排一排充電或放電；讀出：一排一排看
 *   電荷有沒有過一半，再把 0 和 1 變回文字。
 * RAM（DRAM）：杯子會慢慢漏電，所以要一直「刷新」（真實約每 64 毫秒一次，這裡放慢到 2.5 秒）；
 *   關掉電源就沒人刷新，1 漸漸變成 0——這就是 RAM 一關機就忘記。
 * 快閃記憶體（手機的儲存空間）：電子關在四周都是絕緣層的盒子裡（加蓋），沒有電也不會漏。
 *
 * 場景：x 往右是一個位元組裡的 8 個位元（位值 128 … 1），z 往前是位址 0–15。計算在 memcalc.js。
 * 產物：cd tools/science && npm run build → assets/js/memory-bits.js
 */
import {
  AmbientLight, BoxGeometry, Color, CylinderGeometry, DirectionalLight, DoubleSide, Group, HemisphereLight,
  MathUtils, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Scene, TorusGeometry, Vector3,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { PLACE, THRESHOLD, encode, decode, toBits, charSpans, readBit } from './memcalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const COLS = 8, ROWS = 16, MAXB = ROWS;
const DX = 1.0, DZ = 0.84, CUP_H = 0.9;
const cx = (c) => (c - 3.5) * DX;
const rz = (r) => (r - 7.5) * DZ;
const ROW_T = 0.16;          // 寫入／讀出每排花幾秒
const REFRESH_EVERY = 2.5;   // 模型的刷新週期（真實約 64 毫秒）
const REFRESH_SWEEP = 0.8;

const MSG = {
  idle: ['Type a word and press Save. Each letter becomes a number, and each number becomes eight 0s and 1s.',
    '輸入一個字，按「存進去」。每個字母先變成一個數字，每個數字再變成 8 個 0 和 1。'],
  wroteDram: ['Saved! A full cup is a 1 and an empty cup is a 0. In RAM the charge slowly leaks away, so the computer keeps topping up the 1s. This is called refreshing.',
    '存好了！裝滿的杯子是 1、空杯子是 0。RAM 的電荷會慢慢漏掉，所以電腦要一直把 1 補滿，這叫做「刷新」。'],
  wroteFlash: ['Saved in flash memory. The electrons are locked inside an insulated box, so they stay put even without power.',
    '存進快閃記憶體了。電子被關在四周都是絕緣層的盒子裡，就算沒有電也跑不掉。'],
  wroteZh: ['Saved! Look at the rows: most Chinese characters need three bytes (24 bits), while an English letter needs only one byte.',
    '存好了！數數看有幾排：大部分中文字要 3 個位元組（24 個位元），英文字母只要 1 個位元組。'],
  readOk: ['Read back correctly! The computer checked every cup, counted it as 1 if it was more than half full, and turned the 0s and 1s back into letters.',
    '讀回來了，完全正確！電腦檢查每個杯子，超過一半就算 1，再把 0 和 1 變回文字。'],
  readBad: ['The word came back wrong or empty. Some cups leaked below the line, so their 1s turned into 0s.',
    '讀回來的字錯了，或是空的：有些杯子漏到線以下，1 就變成了 0。'],
  offDram: ['The power is off, so nothing refreshes the cups. The charge leaks away and the 1s turn into 0s. This is why RAM forgets when a computer shuts down.',
    '電源關了，沒有人刷新杯子。電荷漏光，1 變成 0。這就是電腦關機後 RAM 會忘記的原因。'],
  offFlash: ['The power is off, but flash memory keeps its electrons locked in. That is why your photos are still on your phone after it shuts down.',
    '電源關了，但快閃記憶體的電子還關在盒子裡。所以手機關機再開，照片都還在。'],
  noRefresh: ['Refresh is off. Watch the cups slowly drain: once a cup falls below the line, its 1 becomes a 0.',
    '刷新關掉了。看杯子慢慢變空：一旦低於那條線，1 就變成 0。'],
  needPower: ['Turn the power on first.', '請先打開電源。'],
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
  scene.background = new Color(0x0b1326);
  const camera = new PerspectiveCamera(34, 1, 0.1, 200);
  const TARGET = V(0, 0, 0.5);
  const homePos = () => TARGET.clone().add(V(0, 21.5, 11.5).multiplyScalar(camera.aspect < 0.9 ? 1.2 : camera.aspect < 1.2 ? 1.02 : 1));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 5; controls.maxDistance = 45;
  controls.maxPolarAngle = Math.PI * 0.47;
  controls.target.copy(TARGET);
  const hemi = new HemisphereLight(0xe6efff, 0x1a2230, 1.0); scene.add(hemi);
  const amb = new AmbientLight(0xffffff, 0.25); scene.add(amb);
  const sun = new DirectionalLight(0xffffff, 1.3); sun.position.set(-4, 10, 7); scene.add(sun);

  // ---------------- 晶片底板與導線 ----------------
  const W = COLS * DX + 1.4, D = ROWS * DZ + 1.2;
  scene.add(at(new Mesh(new BoxGeometry(W, 0.24, D), new MeshStandardMaterial({ color: 0x1d2b3f, roughness: 0.6, metalness: 0.3 })), 0, -0.12, 0));
  const wordMat = new MeshStandardMaterial({ color: 0xc9a14a, metalness: 0.7, roughness: 0.35 });
  const bitMat = new MeshStandardMaterial({ color: 0x5f7fa8, metalness: 0.6, roughness: 0.4 });
  for (let r = 0; r < ROWS; r++) scene.add(at(new Mesh(new BoxGeometry(COLS * DX + 0.4, 0.03, 0.05), wordMat), 0, 0.015, rz(r) + 0.38));
  for (let c = 0; c < COLS; c++) scene.add(at(new Mesh(new BoxGeometry(0.05, 0.03, ROWS * DZ + 0.2), bitMat), cx(c) + 0.42, 0.015, 0));

  // 正在處理的那一排（寫：橘、讀：黃、刷新：綠）
  const bar = new Mesh(new BoxGeometry(COLS * DX + 0.5, 0.02, DZ * 0.92), new MeshBasicMaterial({ color: 0xff9a3c, transparent: true, opacity: 0.35, depthWrite: false }));
  scene.add(bar); bar.visible = false;
  const rbar = new Mesh(new BoxGeometry(COLS * DX + 0.5, 0.02, DZ * 0.92), new MeshBasicMaterial({ color: 0x7cf29a, transparent: true, opacity: 0.25, depthWrite: false }));
  scene.add(rbar); rbar.visible = false;

  // ---------------- 杯子（每格一個位元） ----------------
  const cupGeo = new CylinderGeometry(0.3, 0.3, CUP_H, 24, 1, true);
  const fillGeo = new CylinderGeometry(0.265, 0.265, 1, 20); fillGeo.translate(0, 0.5, 0);
  const lidGeo = new CylinderGeometry(0.34, 0.34, 0.09, 24);
  const ringGeo = new TorusGeometry(0.31, 0.012, 6, 32); ringGeo.rotateX(Math.PI / 2);
  const cupMat = new MeshStandardMaterial({ color: 0xcfe4ff, transparent: true, opacity: 0.22, side: DoubleSide, depthWrite: false, roughness: 0.2 });
  const lidMat = new MeshStandardMaterial({ color: 0x9aa3b4, roughness: 0.5, metalness: 0.2, transparent: true, opacity: 0.45, depthWrite: false });
  const ringMat = new MeshBasicMaterial({ color: 0xffd36e, transparent: true, opacity: 0.6 });
  const ON = new Color(0x58e1ff), DIM = new Color(0x2f5f8a);
  const cells = [];
  for (let r = 0; r < ROWS; r++) {
    const row = [];
    for (let c = 0; c < COLS; c++) {
      const g = new Group(); g.position.set(cx(c), 0, rz(r)); scene.add(g);
      g.add(at(new Mesh(new CylinderGeometry(0.3, 0.3, 0.03, 24), new MeshStandardMaterial({ color: 0x2b3a52 })), 0, 0.015, 0));
      const cup = at(new Mesh(cupGeo, cupMat), 0, CUP_H / 2, 0); g.add(cup);
      const fm = new MeshStandardMaterial({ color: ON.clone(), emissive: ON.clone().multiplyScalar(0.5), roughness: 0.3 });
      const fill = at(new Mesh(fillGeo, fm), 0, 0.03, 0); fill.scale.y = 0.001; g.add(fill);
      g.add(at(new Mesh(ringGeo, ringMat), 0, 0.03 + (CUP_H - 0.06) * THRESHOLD, 0));
      const lid = at(new Mesh(lidGeo, lidMat), 0, CUP_H + 0.05, 0); lid.visible = false; g.add(lid);
      row.push({ g, fill, fm, lid, q: 0, target: 0, tau: 4 + Math.random() * 5 });
    }
    cells.push(row);
  }

  // ---------------- 標籤 ----------------
  const lab = labeler($('.al-labels'), cv, camera);
  const placeL = PLACE.map((p) => lab.add('bt-lb mb-lb-place', String(p)));
  const addrL = Array.from({ length: ROWS }, (_, r) => lab.add('bt-lb mb-lb-addr', String(r)));
  const charL = Array.from({ length: ROWS }, () => lab.add('bt-lb mb-lb-char', ''));
  const cellL = lab.add('bt-lb bt-lb-el', 'One cup = 1 bit<small>一格＝1 個位元</small>');
  const rowL = lab.add('bt-lb bt-lb-b', 'One row = 1 byte (8 bits)<small>一排＝1 個位元組（8 個位元）</small>');
  const placeHead = lab.add('bt-lb ip-region', 'Place values<small>位值</small>');
  const addrHead = lab.add('bt-lb ip-region', 'Address<small>位址</small>');

  const R = {
    text: $('.mb-text'), save: $('.mb-save'), read: $('.mb-read'), bytes: $('.mb-bytes'), back: $('.mb-back'),
    nb: $('.mb-nb'), nbits: $('.mb-nbits'), pow: $('.mb-pow'), ref: $('.mb-ref'), msg: $('.mb-msg'), play: $('.al-play'),
  };
  const state = {
    kind: 'dram', power: true, refresh: true, labels: true, playing: true,
    text: '', bytes: [], spans: [], op: null, readBytes: [], back: null, msgKey: 'idle', lastMsg: '', lastTable: '',
    clock: 0, refreshT: 0, refreshRow: -1, script: [],
  };

  // ---------------- 操作 ----------------
  function write(text) {
    if (!state.power) { state.msgKey = 'needPower'; return; }
    state.text = text;
    state.bytes = encode(text, MAXB);
    state.spans = charSpans(text, MAXB);
    state.back = null;
    state.op = { kind: 'write', t: 0 };
    R.text.value = text;
  }
  function read() {
    if (!state.power) { state.msgKey = 'needPower'; return; }
    state.readBytes = [];
    state.op = { kind: 'read', t: 0 };
  }
  function setKind(k) {
    if (k !== 'dram' && k !== 'flash') return;
    state.kind = k; state.op = null; state.back = null; state.script = [];
    for (const row of cells) for (const cl of row) { cl.q = 0; cl.lid.visible = k === 'flash'; }
    cupMat.opacity = k === 'flash' ? 0.32 : 0.22;
    cupMat.color.setHex(k === 'flash' ? 0xd9c9a8 : 0xcfe4ff);
    state.bytes = []; state.spans = []; state.text = '';
    state.msgKey = 'idle';
    root.querySelectorAll('[data-mem]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-mem') === k ? 'true' : 'false'));
    root.classList.toggle('mb-flash', k === 'flash');
  }
  function setPower(v) {
    state.power = v;
    const t = $('[data-t="power"]'); if (t) t.checked = v;
    if (!v) { state.op = null; state.back = null; state.msgKey = state.kind === 'dram' ? 'offDram' : 'offFlash'; }
    else if (state.msgKey === 'offDram' || state.msgKey === 'offFlash' || state.msgKey === 'needPower') state.msgKey = 'idle';
    hemi.intensity = v ? 1.0 : 0.45; sun.intensity = v ? 1.3 : 0.5;
    root.classList.toggle('mb-off', !v);
  }
  function setRefresh(v) {
    state.refresh = v;
    const t = $('[data-t="refresh"]'); if (t) t.checked = v;
    if (!v && state.kind === 'dram') state.msgKey = 'noRefresh';
    else if (state.msgKey === 'noRefresh') state.msgKey = 'idle';
  }
  R.save.addEventListener('click', () => write(R.text.value));
  R.text.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); write(R.text.value); } });
  R.read.addEventListener('click', read);
  root.querySelectorAll('[data-mem]').forEach((b) => b.addEventListener('click', () => setKind(b.getAttribute('data-mem'))));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="power"]', setPower);
  bind('[data-t="refresh"]', setRefresh);
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

  // ---------------- 每格 ----------------
  const rowBits = (r) => cells[r].map((cl) => readBit(cl.q));
  function step(dt) {
    if (state.playing) {
      state.clock += dt;
      // 劇本（卡片示範用）：照模擬時間執行
      while (state.script.length && state.script[0].at <= state.clock) state.script.shift().fn();
      // 漏電：只有 DRAM 會漏
      if (state.kind === 'dram') for (const row of cells) for (const cl of row) { cl.q *= Math.exp(-dt / cl.tau); }
      // 刷新：DRAM、有電、刷新開著
      if (state.kind === 'dram' && state.power && state.refresh) {
        state.refreshT += dt;
        if (state.refreshT >= REFRESH_EVERY) { state.refreshT = 0; state.refreshRow = 0; }
      } else state.refreshRow = -1;
      if (state.refreshRow >= 0) {
        const r = Math.floor(state.refreshRow);
        for (const cl of cells[r]) cl.q = readBit(cl.q) ? 1 : 0;
        state.refreshRow += dt * ROWS / REFRESH_SWEEP;
        if (state.refreshRow >= ROWS) state.refreshRow = -1;
      }
      // 寫入／讀出：一排一排
      const op = state.op;
      if (op) {
        op.t += dt;
        const r = Math.min(ROWS - 1, Math.floor(op.t / ROW_T));
        if (op.kind === 'write') {
          for (let k = 0; k <= r; k++) {
            const bits = k < state.bytes.length ? toBits(state.bytes[k]) : [0, 0, 0, 0, 0, 0, 0, 0];
            cells[k].forEach((cl, c) => { cl.q += (bits[c] - cl.q) * Math.min(1, dt * 16); });
          }
        } else {
          while (state.readBytes.length <= r && state.readBytes.length < ROWS) {
            const k = state.readBytes.length;
            state.readBytes.push(rowBits(k).reduce((s, b, i) => s + (b ? PLACE[i] : 0), 0));
          }
        }
        if (op.t >= ROWS * ROW_T + 0.2) {
          if (op.kind === 'write') {
            for (let k = 0; k < ROWS; k++) {
              const bits = k < state.bytes.length ? toBits(state.bytes[k]) : [0, 0, 0, 0, 0, 0, 0, 0];
              cells[k].forEach((cl, c) => { cl.q = bits[c]; });
            }
            state.msgKey = state.bytes.length > state.spans.length ? 'wroteZh' : state.kind === 'flash' ? 'wroteFlash' : 'wroteDram';
          } else {
            const got = decode(state.readBytes.slice(0, Math.max(state.bytes.length, 1)));
            state.back = { text: got, ok: state.bytes.length > 0 && got === decode(state.bytes) };
            state.msgKey = state.back.ok ? 'readOk' : 'readBad';
          }
          state.op = null;
        }
      }
      // 沒刷新時，提醒一下
      if (state.kind === 'dram' && state.power && !state.refresh && state.msgKey !== 'readOk' && state.msgKey !== 'readBad' && !state.op) state.msgKey = 'noRefresh';
    }
    // 畫杯子
    for (const row of cells) for (const cl of row) {
      const h = Math.max(0.001, cl.q * (CUP_H - 0.06));
      cl.fill.scale.y = h;
      const on = readBit(cl.q);
      cl.fm.color.copy(on ? ON : DIM);
      cl.fm.emissive.copy(on ? ON : DIM).multiplyScalar(on ? (state.power ? 0.55 : 0.3) : 0.15);
    }
    bar.visible = !!state.op;
    if (state.op) {
      bar.material.color.setHex(state.op.kind === 'write' ? 0xff9a3c : 0xffd36e);
      bar.position.set(0, 0.04, rz(Math.min(ROWS - 1, Math.floor(state.op.t / ROW_T))));
    }
    rbar.visible = state.refreshRow >= 0;
    if (rbar.visible) rbar.position.set(0, 0.035, rz(Math.min(ROWS - 1, Math.floor(state.refreshRow))));
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 0.9);
      const k = MathUtils.smootherstep(fly.t, 0, 1);
      camera.position.lerpVectors(fly.p0, fly.p1, k);
      controls.target.lerpVectors(fly.t0, fly.t1, k);
    }
  }

  let narrow = false;
  const shown = (s) => (s === ' ' ? '␣' : s);
  function updateLabels() {
    const on = state.labels;
    placeL.forEach((el, c) => { el.hidden = !on; if (on) lab.place(el, V(cx(c), 0.2, rz(0) - 0.85)); });
    addrL.forEach((el, r) => { el.hidden = !on; if (on) lab.place(el, V(cx(0) - 0.85, 0.1, rz(r))); });
    const startOf = new Map(state.spans.map((s) => [s.start, s]));
    const written = !state.op || state.op.kind !== 'write' ? ROWS : Math.floor(state.op.t / ROW_T) + 1;
    charL.forEach((el, r) => {
      const s = startOf.get(r);
      let html = '';
      if (s && r < written) html = `${shown(s.ch).replace(/[&<>]/g, '')}${s.n > 1 && !narrow ? `<small>${s.n} bytes</small>` : ''}`;
      else if (r < state.bytes.length && r < written && !narrow) html = '<small>…</small>';
      if (el.innerHTML !== html) el.innerHTML = html;
      el.hidden = !on || !html;
      if (!el.hidden) lab.place(el, V(cx(COLS - 1) + 0.95, 0.1, rz(r)));
    });
    const big = on && !narrow;
    cellL.hidden = !big; rowL.hidden = !big; placeHead.hidden = !big; addrHead.hidden = !big;
    if (big) {
      lab.place(cellL, V(cx(2), 0.1, rz(ROWS - 1) + 1.0), 10);
      lab.place(rowL, V(cx(COLS - 1) + 1.0, 0.1, rz(ROWS - 3)));
      lab.place(placeHead, V(cx(0) - 1.7, 0.2, rz(0) - 0.85));
      lab.place(addrHead, V(cx(0) - 1.0, 0.1, rz(ROWS - 1) + 1.0), 10);
    }
  }

  // ---------------- 讀數 ----------------
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function readout() {
    const startOf = new Map(state.spans.map((s) => [s.start, s]));
    let rows = '';
    state.bytes.forEach((b, k) => {
      const s = startOf.get(k);
      const bits = rowBits(k).map((x) => `<i class="${x ? 'one' : ''}">${x}</i>`).join('');
      rows += `<li><span class="mb-a">${k}</span><b>${s ? esc(shown(s.ch)) : '…'}</b><span class="mb-d">${b}</span><span class="mb-bits">${bits}</span></li>`;
    });
    const table = rows
      ? `<li class="mb-head"><span class="mb-a">#</span><b>Char<small>字</small></b><span class="mb-d">No.<small>數字</small></span><span class="mb-bits">Bits now<small>現在的位元</small></span></li>${rows}`
      : '<li class="mb-empty">Nothing saved yet<small>還沒有存東西</small></li>';
    if (table !== state.lastTable) { R.bytes.innerHTML = table; state.lastTable = table; }
    if (state.back) {
      const t = state.back.text.replace(/\u0000/g, '').replace(/[\u0001-\u001f]/g, '·').replace(/�/g, '?');
      R.back.innerHTML = `${t.trim() ? esc(t) : 'All 0s<small class="mb-z">全部是 0</small>'} <small>${state.back.ok ? '✓ same · 一樣' : '✗ changed · 變了'}</small>`;
      R.back.className = `mb-back ${state.back.ok ? 'ok' : 'bad'}`;
    } else if (state.op && state.op.kind === 'read') {
      R.back.innerHTML = 'Reading…<small>讀取中</small>'; R.back.className = 'mb-back';
    } else { R.back.innerHTML = '—'; R.back.className = 'mb-back'; }
    R.nb.textContent = String(state.bytes.length);
    R.nbits.textContent = String(state.bytes.length * 8);
    R.pow.innerHTML = state.power ? 'On<small>開</small>' : 'Off<small>關</small>';
    R.pow.classList.toggle('bad', !state.power);
    R.ref.innerHTML = state.kind === 'flash' ? 'Not needed<small>不需要</small>' : state.power && state.refresh ? 'Every 64 ms<small>每 64 毫秒</small>' : 'Stopped<small>停了</small>';
    R.ref.classList.toggle('bad', state.kind === 'dram' && !(state.power && state.refresh));
    const m = MSG[state.msgKey] || MSG.idle;
    const html = `${esc(m[0])}<span class="zh">${esc(m[1])}</span>`;
    if (html !== state.lastMsg) { R.msg.innerHTML = html; state.lastMsg = html; }
    R.save.disabled = R.read.disabled = !state.power;
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

  setKind('dram');
  write(R.text.value || 'HELLO');
  step(0.01); readout();
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const after = (sec, fn) => state.script.push({ at: state.clock + sec, fn });
  const fresh = (k) => { setKind(k); setPower(true); setRefresh(true); setPlaying(true); };
  const DEMO = {
    letter: () => { fresh('dram'); write('A'); },
    chinese: () => { fresh('dram'); write('彰化'); },
    ramoff: () => {
      fresh('dram'); write('HELLO');
      after(3.2, () => setPower(false));
      after(11, () => { setPower(true); read(); });
    },
    flashoff: () => {
      fresh('flash'); write('HELLO');
      after(3.2, () => setPower(false));
      after(7.5, () => { setPower(true); read(); });
    },
  };
  // 除錯：document.querySelector('[data-memory-lab]').__lab
  root.__lab = {
    camera, controls, state, cells, write, read, setKind, setPower, setRefresh, demo: (v) => DEMO[v] && DEMO[v](),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { step(0); controls.update(); updateLabels(); readout(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => { if (DEMO[v]) DEMO[v](); } };
}

lazyBoot('[data-memory-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
