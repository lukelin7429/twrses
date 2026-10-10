/*
 * 生命與生態 · 第三課「DNA 是什麼？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：DNA 是一條扭起來的梯子，梯子的橫槓是一對一對的字母。配對規則只有一條：A 配 T、C 配 G。
 *   所以只要把梯子從中間拉開，每一半都能照規則補回另一半——一份變成一模一樣的兩份。
 *
 * 場景：12 對字母的雙螺旋。一支滑桿「解開並複製」：從上面像拉鍊一樣拉開，兩股各往左右移，
 *   新的字母（橘色骨架）一個一個接上去。側欄的 12 個字母可以點，換一個字母，搭檔跟著換，複製出來的兩份也都帶著這個改變。
 * 規則在 dnacalc.js。
 *
 * 產物：cd tools/life && npm run build → assets/js/life-dna.js
 * 除錯：document.querySelector('[data-lifedna-lab]').__lab
 */
import {
  AmbientLight, Color, CylinderGeometry, DirectionalLight, Group, HemisphereLight, Mesh,
  MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry, Sprite, SpriteMaterial, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { canvasTex, labeler, lazyBoot } from './common.js';
import { LETTERS, PAIR, START, partner, change, diff, opened, holding, clean, combos } from './dnacalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const COLOR = { A: 0x4caf6a, T: 0xe8625a, C: 0x4f9df0, G: 0xf2c14e };
const CSS = { A: '#4caf6a', T: '#e8625a', C: '#4f9df0', G: '#f2c14e' };
const N = START.length, DY = 0.62, RAD = 1, TURN = Math.PI / 5, SHIFT = 2.15;
const UP = V(0, 1, 0);

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
  const TARGET = V(0, 0, 0);
  const homePos = () => TARGET.clone().add(V(0, 1.2, 17).multiplyScalar(camera.aspect < 0.85 ? 1.5 : camera.aspect < 1.1 ? 1.15 : 1));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 6; controls.maxDistance = 50;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xffffff, 0x2a3040, 1.2));
  scene.add(new AmbientLight(0xffffff, 0.45));
  const dl = new DirectionalLight(0xffffff, 0.9); dl.position.set(-4, 8, 9); scene.add(dl);

  // 四條鏈：a、b 是原來的兩股（灰白骨架）；a2、b2 是新補上的兩股（橘色骨架）
  const CH = ['a', 'b', 'a2', 'b2'];
  const boneMat = { old: new MeshStandardMaterial({ color: 0xd4dcec, roughness: 0.5 }), fresh: new MeshStandardMaterial({ color: 0xffa64d, roughness: 0.5 }) };
  const baseMat = {}, letterMat = {};
  for (const c of LETTERS) {
    baseMat[c] = new MeshStandardMaterial({ color: COLOR[c], roughness: 0.55 });
    letterMat[c] = new SpriteMaterial({ map: canvasTex((g, w, h) => {
      g.fillStyle = '#0d1830'; g.beginPath(); g.arc(w / 2, h / 2, w / 2 - 3, 0, 7); g.fill();
      g.strokeStyle = CSS[c]; g.lineWidth = 5; g.stroke();
      g.fillStyle = '#fff'; g.font = '800 40px system-ui, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(c, w / 2, h / 2 + 2);
    }), depthTest: false, transparent: true });
  }
  const ballGeo = new SphereGeometry(0.2, 16, 12), cylGeo = new CylinderGeometry(1, 1, 1, 10);
  const G = new Group(); scene.add(G);
  const P = {}, ball = {}, rung = {}, bone = {}, sprite = {};
  for (const k of CH) {
    const m = k.length > 1 ? boneMat.fresh : boneMat.old;
    P[k] = []; ball[k] = []; rung[k] = []; bone[k] = []; sprite[k] = [];
    for (let i = 0; i < N; i++) {
      P[k].push(V(0, 0, 0));
      const b = new Mesh(ballGeo, m); G.add(b); ball[k].push(b);
      const r = new Mesh(cylGeo, baseMat.A); G.add(r); rung[k].push(r);
      const s = new Sprite(letterMat.A); s.scale.set(0.5, 0.5, 1); s.renderOrder = 5; G.add(s); sprite[k].push(s);
      if (i < N - 1) { const t = new Mesh(cylGeo, m); G.add(t); bone[k].push(t); }
    }
  }
  const tmp = V(0, 0, 0), ctr = V(0, 0, 0), end = V(0, 0, 0);
  const span = (mesh, a, b, r) => {
    const d = tmp.copy(b).sub(a), len = d.length();
    mesh.position.copy(a).addScaledVector(d, 0.5);
    mesh.scale.set(r, Math.max(len, 1e-4), r);
    mesh.quaternion.setFromUnitVectors(UP, d.multiplyScalar(1 / Math.max(len, 1e-4)));
  };

  const lab = labeler($('.al-labels'), cv, camera);
  const L = {
    orig: lab.add('cp-lb', 'One DNA molecule<small>一個 DNA 分子</small>'),
    pair: lab.add('cp-lb', 'A pairs with T, C with G<small>A 配 T，C 配 G</small>'),
    mix: lab.add('cp-lb', 'Pale: old strands · Orange: new strands<small>淺色是舊的兩股，橘色是新的兩股</small>'),
    c1: lab.add('cp-lb', 'Copy 1<small>第一份</small>'),
    c2: lab.add('cp-lb', 'Copy 2<small>第二份</small>'),
  };

  const R = { pct: $('.lf-dn-pct'), pctOut: $('.lf-dn-pct-out'), seq: $('.lf-dn-seq'), mate: $('.lf-dn-mate'), reset: $('.lf-dn-reset'), open: $('.lf-dn-open'), copies: $('.lf-dn-copies'), chg: $('.lf-dn-chg'),
    bar: $('.lf-dn-bar'), status: $('.lf-dn-status'), msgs: [...root.querySelectorAll('.lf-dn-msg')], play: $('.al-play') };
  const state = { pct: 0, seq: START, labels: true, playing: true, phase: 0, hold: 0 };
  R.seq.innerHTML = [...START].map((c, i) => `<button type="button" data-i="${i}" aria-label="Letter ${i + 1} · 第 ${i + 1} 個字母"></button>`).join('');
  R.mate.innerHTML = [...START].map(() => '<i></i>').join('');
  const seqBtns = [...R.seq.children], mateCells = [...R.mate.children];

  // 第 i 對拉開了多少（0–1）；新的那股長出來多少（0–1）
  const fOf = (i) => { const q = (state.pct / 100) * (N + 1.5); const x = clamp((q - i) / 2.5); return x * x * (3 - 2 * x); };
  function layout() {
    const mate = partner(state.seq);
    for (let i = 0; i < N; i++) {
      const y = ((N - 1) / 2 - i) * DY, th = i * TURN + state.phase, cx = RAD * Math.cos(th), cz = RAD * Math.sin(th);
      const f = fOf(i), g = clamp(f * 2 - 1), s = SHIFT * f;
      P.a[i].set(cx - s, y, cz); P.b[i].set(-cx + s, y, -cz); P.a2[i].set(-cx - s, y, -cz); P.b2[i].set(cx + s, y, cz);
      const letter = { a: state.seq[i], b: mate[i], a2: mate[i], b2: state.seq[i] };
      for (const k of CH) {
        const fresh = k.length > 1, vis = !fresh || g > 0.02, left = k === 'a' || k === 'a2';
        ctr.set(left ? -s : s, y, 0);
        ball[k][i].position.copy(P[k][i]); ball[k][i].visible = vis; ball[k][i].scale.setScalar(fresh ? Math.max(g, 0.01) : 1);
        rung[k][i].visible = vis; sprite[k][i].visible = vis;
        if (!vis) continue;
        end.copy(P[k][i]).lerp(ctr, fresh ? 0.97 * g : 0.97);
        rung[k][i].material = baseMat[letter[k]];
        span(rung[k][i], P[k][i], end, 0.105);
        sprite[k][i].material = letterMat[letter[k]];
        sprite[k][i].position.copy(P[k][i]).lerp(ctr, 0.52);
        sprite[k][i].scale.setScalar(fresh ? 0.5 * g : 0.5);
      }
    }
    for (const k of CH) {
      const fresh = k.length > 1;
      for (let i = 0; i < N - 1; i++) {
        const vis = !fresh || (clamp(fOf(i) * 2 - 1) > 0.5 && clamp(fOf(i + 1) * 2 - 1) > 0.5);
        bone[k][i].visible = vis;
        if (vis) span(bone[k][i], P[k][i], P[k][i + 1], 0.085);
      }
    }
  }
  function updateLabels() {
    const on = state.labels, top = ((N - 1) / 2) * DY, f0 = fOf(0), g0 = clamp(f0 * 2 - 1), done = state.pct >= 100;
    const show = (el, v, pos, dy = 0) => { el.hidden = !v; if (v) lab.place(el, pos, dy); };
    show(L.orig, on && state.pct <= 0, tmp.set(0, top + 0.9, 0));
    show(L.pair, on && state.pct <= 0, tmp.set(0, -top - 0.9, 0));
    show(L.c1, on && done, tmp.set(-SHIFT, top + 0.9, 0));
    show(L.c2, on && done, tmp.set(SHIFT, top + 0.9, 0));
    show(L.mix, on && g0 > 0.9 && !done, tmp.set(0, top + 1.0, 0));
  }
  function readout() {
    const mate = partner(state.seq), n = diff(state.seq, START), op = opened(state.pct, N), k = holding(state.pct, n > 0);
    R.pct.value = Math.round(state.pct); R.pctOut.textContent = `${Math.round(state.pct)}%`;
    seqBtns.forEach((b, i) => { const c = state.seq[i]; b.textContent = c; b.style.setProperty('--c', CSS[c]); b.classList.toggle('is-chg', c !== START[i]); });
    mateCells.forEach((el, i) => { el.textContent = mate[i]; el.style.setProperty('--c', CSS[mate[i]]); });
    R.open.innerHTML = `${op} of ${N} pairs<small>${N} 對裡的 ${op} 對</small>`;
    R.copies.innerHTML = state.pct >= 100 ? '2 copies, both the same<small>兩份，一模一樣</small>' : state.pct <= 0 ? '1 molecule<small>一個分子</small>' : 'Copying…<small>複製中⋯</small>';
    R.chg.innerHTML = n ? `${n} changed<small>改了 ${n} 個</small>` : 'None<small>沒有</small>';
    R.bar.style.width = `${state.pct}%`;
    R.status.innerHTML = k === 'closed' || k === 'changed' ? 'Zipped up<small class="zh">合起來的</small>' : k === 'opening' ? 'Unzipping and pairing<small class="zh">一邊解開，一邊配對</small>' : 'Copied<small class="zh">複製完成</small>';
    R.msgs.forEach((m) => { m.hidden = m.dataset.msg !== k; });
  }
  function set(o) {
    if (o.pct != null) state.pct = clamp(+o.pct, 0, 100);
    if (o.seq != null && clean(o.seq).length === N) state.seq = clean(o.seq);
    if (o.change != null && o.change >= 0 && o.change < N) state.seq = change(state.seq, o.change);
    layout(); readout();
  }
  function setPlaying(v) {
    state.playing = v; state.hold = 0;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.pct.addEventListener('input', () => { setPlaying(false); set({ pct: +R.pct.value }); });
  seqBtns.forEach((b) => b.addEventListener('click', () => set({ change: +b.dataset.i })));
  R.reset.addEventListener('click', () => set({ seq: START }));
  R.play.addEventListener('click', () => { if (!state.playing && state.pct >= 100) state.pct = 0; setPlaying(!state.playing); });
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  $('.al-home').addEventListener('click', () => { camera.position.copy(homePos()); controls.target.copy(TARGET); });

  let last = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, last ? (t - last) / 1000 : 0); last = t;
    if (state.playing) {
      state.phase += dt * 0.5;                                   // 梯子慢慢自轉，看得出它是扭起來的
      if (state.pct >= 100 || state.pct <= 0) {                  // 兩頭各停一下
        state.hold += dt;
        if (state.hold > (state.pct >= 100 ? 3 : 1.6)) { state.hold = 0; state.pct = state.pct >= 100 ? 0 : 0.01; }
      } else state.pct = Math.min(100, state.pct + dt * 11);
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
    closed: () => { setPlaying(false); set({ pct: 0, seq: START }); },
    half: () => { setPlaying(false); set({ pct: 50 }); },
    done: () => { setPlaying(false); set({ pct: 100 }); },
    change: () => { setPlaying(false); set({ pct: 0, seq: START }); set({ change: 5 }); setTimeout(() => { state.pct = 0.01; setPlaying(true); }, 900); },
  };
  root.__lab = {
    camera, controls, state, set, setPlaying,
    render: () => { camera.position.copy(homePos()); controls.update(); layout(); updateLabels(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (k) => { if (DEMO[k]) DEMO[k](); } };
}

// ---------- 頁面下方：寫一段密碼，看它的搭檔（不需要 WebGL） ----------
function initCoder() {
  const el = document.querySelector('[data-life-coder]');
  if (!el) return;
  const q = (s) => el.querySelector(s), MAX = 12;
  let seq = clean(el.dataset.start || 'GATTACA', MAX);
  const row = (s) => [...s].map((c) => `<i style="--c:${CSS[c]}">${c}</i>`).join('');
  function show() {
    q('.lf-cd-top').innerHTML = row(seq) || '<em>…</em>';
    q('.lf-cd-bot').innerHTML = row(partner(seq));
    q('.lf-cd-n').textContent = seq.length;
    q('.lf-cd-combos').textContent = seq.length ? combos(seq.length).toLocaleString('en-US') : '0';
    q('.lf-cd-full').hidden = seq.length < MAX;
    el.dataset.seq = seq;
  }
  el.querySelectorAll('[data-add]').forEach((b) => b.addEventListener('click', () => { if (seq.length < MAX && PAIR[b.dataset.add]) { seq += b.dataset.add; show(); } }));
  q('[data-del]').addEventListener('click', () => { seq = seq.slice(0, -1); show(); });
  q('[data-clear]').addEventListener('click', () => { seq = ''; show(); });
  show();
  el.__cd = { show, set: (s) => { seq = clean(s, MAX); show(); } };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initCoder);
else initCoder();

lazyBoot('[data-lifedna-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
