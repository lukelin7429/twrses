/*
 * 世界歷史 第十二課〈What Was Life Like in a Castle? 住在城堡裡是什麼樣子？〉
 * 「一座城堡怎麼長大」：四個階段（土丘城寨 → 石造主塔 → 石造城牆與塔 → 同心圓城堡），按一下就把新的部分「長」出來。
 * 點城堡的任何一個部分（或下面的按鈕），旁邊的小卡寫它是做什麼用的。幾何是示意，不是任何一座真實的城堡。
 *
 * 資料在 data/world_history.json 的 lab（stages[]、parts[]、demos[]），純函式在 castle.js。
 * 除錯：document.querySelector('[data-wh-castle-lab]').__lab
 *   state、stage(key)、select(partKey|null)、play(bool)、demo(key)、info()、render()
 */
import {
  AmbientLight, BoxGeometry, CircleGeometry, Color, ConeGeometry, CylinderGeometry, DirectionalLight, Group, HemisphereLight,
  Mesh, MeshLambertMaterial, PerspectiveCamera, PlaneGeometry, Raycaster, RingGeometry, Scene, Vector2, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot, esc, bi, readJson } from './common.js';
import { STAGES, stageIndex, partsAt, newAt, ringPoints, segments } from './castle.js';
import './timeline2d.js';
import './sort2d.js';
import './match2d.js';

const R_PAL = 19, R_WALL = 20, R_OUT = 27, MOAT_IN = 29.5, MOAT_OUT = 33.5;
const CAM = { pos: [58, 50, 70], target: [0, 2, 0] };
const COL = {
  grass: '#8fb86a', earth: '#9b7a4c', ditch: '#7d6440', water: '#4a8fc4', wood: '#8a5a32', woodDark: '#6e4426',
  stone: '#c9c1b0', stoneDark: '#a99f8c', roof: '#7d4b3a', lead: '#6f7782',
};

function init(root) {
  const data = readJson(root);
  const $ = (s) => root.querySelector(s);
  const cv = $('.al-space-cv'), space = $('.al-space'), playBtn = $('.al-play');
  const stageCard = $('.wh-cs-stage'), partCard = $('.wh-site');
  const partBtns = [...root.querySelectorAll('[data-part]')], stageBtns = [...root.querySelectorAll('[data-stage]')];
  const state = { stage: 'motte', part: null, playing: false, playT: 0 };
  const byPart = Object.fromEntries(data.parts.map((p) => [p.key, p]));
  let raf = 0, last = 0, idle = 0, visible = true;

  let view = null;
  try {
    const renderer = new WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const scene = new Scene();
    const camera = new PerspectiveCamera(36, 1, 0.5, 600);
    const controls = new OrbitControls(camera, cv);
    controls.enablePan = false; controls.enableDamping = true; controls.minDistance = 25; controls.maxDistance = 160;
    controls.maxPolarAngle = Math.PI * 0.46; controls.target.set(...CAM.target);
    camera.position.set(...CAM.pos);
    scene.add(new HemisphereLight(0xf4f8ff, 0x6a7a4a, 1.0), new AmbientLight(0xffffff, 0.22));
    const sun = new DirectionalLight(0xffffff, 1.6); sun.position.set(-40, 60, 30); scene.add(sun);
    const ground = new Mesh(new CircleGeometry(140, 64), new MeshLambertMaterial({ color: COL.grass })); ground.rotation.x = -Math.PI / 2; scene.add(ground);

    const mats = {};
    const mat = (c) => (mats[c] ||= new MeshLambertMaterial({ color: c }));
    const groups = Object.fromEntries(data.parts.map((p) => [p.key, new Group()]));
    for (const [k, g] of Object.entries(groups)) { g.userData.part = k; scene.add(g); }
    // 每一個部分各自的材質（選中時發亮，不影響別的部分）
    const own = (k, c) => { const m = new MeshLambertMaterial({ color: c }); (groups[k].userData.mats ||= []).push(m); return m; };
    const add = (k, geo, c, x, y, z, ry = 0) => { const m = new Mesh(geo, own(k, c)); m.position.set(x, y, z); m.rotation.y = ry; m.userData.part = k; groups[k].add(m); return m; };
    const roof = (k, w, d, h, x, y, z, c = COL.roof) => { const m = add(k, new ConeGeometry(Math.hypot(w, d) / 2, h, 4, 1), c, x, y + h / 2, z, Math.PI / 4); m.scale.set(w / Math.hypot(w, d) * Math.SQRT2, 1, d / Math.hypot(w, d) * Math.SQRT2); return m; };
    const crenels = (k, w, d, y, x, z, c) => { const n = 4; for (let i = 0; i < n; i++) for (const s of [-1, 1]) { add(k, new BoxGeometry(w / (2 * n), 0.9, 0.6), c, x - w / 2 + (i + 0.5) * w / n, y, z + s * (d / 2 - 0.3)); add(k, new BoxGeometry(0.6, 0.9, d / (2 * n)), c, x + s * (w / 2 - 0.3), y, z - d / 2 + (i + 0.5) * d / n); } };

    // 壕溝（乾的）與護城河（有水）
    if (groups.ditch) { const m = add('ditch', new RingGeometry(MOAT_IN, MOAT_OUT, 72), COL.ditch, 0, 0.03, 0); m.rotation.x = -Math.PI / 2; }
    if (groups.moat) { const m = add('moat', new RingGeometry(MOAT_IN, MOAT_OUT, 72), COL.water, 0, 0.05, 0); m.rotation.x = -Math.PI / 2; }
    // 土丘與上面的木塔
    if (groups.motte) add('motte', new CylinderGeometry(4.5, 10, 6, 32), COL.earth, 0, 3, -11);
    if (groups.timbertower) { add('timbertower', new BoxGeometry(3.6, 5, 3.6), COL.wood, 0, 8.5, -11); roof('timbertower', 3.8, 3.8, 2.2, 0, 11, -11, COL.woodDark); }
    // 木柵欄：一根一根的木樁
    if (groups.palisade) for (const [x, z] of ringPoints(96, R_PAL)) add('palisade', new BoxGeometry(0.55, 3.2, 0.55), COL.wood, x, 1.6, z);
    // 石造主塔
    if (groups.keep) { add('keep', new BoxGeometry(9, 14, 9), COL.stone, 0, 7, -11); crenels('keep', 9, 9, 14.45, 0, -11, COL.stone); }
    // 大廳：木造（土丘城寨的時候）或石造
    if (groups.hall) { add('hall', new BoxGeometry(12, 4.2, 6), COL.stone, -8, 2.1, 4, 0.25); roof('hall', 12.6, 6.6, 3, -8, 4.2, 4); }
    if (groups.chapel) { add('chapel', new BoxGeometry(4, 4, 6.5), COL.stone, 9, 2, 3, -0.3); roof('chapel', 4.4, 6.9, 2.6, 9, 4, 3); }
    if (groups.kitchen) { add('kitchen', new BoxGeometry(5, 3, 4), COL.stoneDark, -7, 1.5, 12, 0.4); roof('kitchen', 5.4, 4.4, 2, -7, 3, 12); }
    if (groups.well) { add('well', new CylinderGeometry(0.9, 0.9, 1, 16), COL.stoneDark, 7, 0.5, -5); add('well', new BoxGeometry(2.4, 0.2, 0.2), COL.wood, 7, 2.2, -5); }
    // 石造城牆與塔（城門在正前方 +z，塔避開城門）
    const wallRing = (k, r, n, h, t, c) => { for (const s of segments(ringPoints(n, r, Math.PI / n))) { if (Math.abs(s.cx) < 3.5 && s.cz > 0) continue; add(k, new BoxGeometry(t, h, s.len + 0.4), c, s.cx, h / 2, s.cz, s.angle); } };
    if (groups.curtain) wallRing('curtain', R_WALL, 24, 7, 1.6, COL.stone);
    if (groups.towers) for (const [x, z] of ringPoints(8, R_WALL, Math.PI / 8)) { add('towers', new CylinderGeometry(2.3, 2.5, 9.5, 20), COL.stone, x, 4.75, z); add('towers', new CylinderGeometry(2.5, 2.5, 0.8, 20), COL.stoneDark, x, 9.9, z); }
    if (groups.gatehouse) { for (const sx of [-3.3, 3.3]) add('gatehouse', new CylinderGeometry(2.4, 2.6, 10, 20), COL.stone, sx, 5, R_WALL); add('gatehouse', new BoxGeometry(5, 4, 3.4), COL.stone, 0, 8, R_WALL); }
    if (groups.drawbridge) add('drawbridge', new BoxGeometry(3.4, 0.35, MOAT_OUT - MOAT_IN + 3), COL.woodDark, 0, 0.35, (MOAT_IN + MOAT_OUT) / 2);
    if (groups.outerwall) { wallRing('outerwall', R_OUT, 32, 4.2, 1.4, COL.stoneDark); for (const [x, z] of ringPoints(12, R_OUT, Math.PI / 12)) add('outerwall', new CylinderGeometry(1.6, 1.8, 5.8, 16), COL.stoneDark, x, 2.9, z); for (const sx of [-2.6, 2.6]) add('outerwall', new CylinderGeometry(1.7, 1.9, 6.4, 16), COL.stoneDark, sx, 3.2, R_OUT); }

    const labs = labeler($('.al-labels'), cv, camera);
    const partLabs = Object.fromEntries(data.parts.map((p) => [p.key, labs.add('wh-lab wh-lab-cs', `${esc(p.en)}<i>${esc(p.zh)}</i>`)]));
    const anchor = (k) => { const g = groups[k]; const v = new Vector3(); let n = 0, top = 0; g.children.forEach((m) => { v.add(m.position); n += 1; top = Math.max(top, m.position.y); }); if (!n) return v; v.divideScalar(n); v.y = top + 2.5; if (['ditch', 'moat', 'palisade', 'curtain', 'outerwall', 'towers'].includes(k)) { const r = k === 'palisade' ? R_PAL : k === 'outerwall' ? R_OUT : k === 'towers' || k === 'curtain' ? R_WALL : (MOAT_IN + MOAT_OUT) / 2; v.set(-r * 0.71, top + 2, r * 0.71); } return v; };
    function resize() { const w = space.clientWidth, h = space.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); camera.aspect = w / h; camera.fov = w / h < 1.1 ? 42 : 36; camera.updateProjectionMatrix(); }
    new ResizeObserver(() => { resize(); render(); }).observe(space);
    controls.addEventListener('change', () => kick());
    const ray = new Raycaster(), ndc = new Vector2(); let down = null;
    cv.addEventListener('pointerdown', (e) => { down = [e.clientX, e.clientY]; });
    cv.addEventListener('pointerup', (e) => {
      if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 6) { down = null; return; }
      down = null;
      const r = cv.getBoundingClientRect();
      ndc.set((e.clientX - r.left) / r.width * 2 - 1, -((e.clientY - r.top) / r.height * 2 - 1));
      ray.setFromCamera(ndc, camera);
      const hit = ray.intersectObjects(Object.values(groups).filter((g) => g.visible), true).find((h) => h.object.userData.part);
      select(hit ? hit.object.userData.part : null);
    });
    view = { renderer, scene, camera, controls, groups, labs, partLabs, anchor };
    resize(); controls.update();
  } catch (e) { view = null; if (window.console) console.warn('World History castle model: 3D is off', e); }
  if (!view) root.classList.add('al-nogl', 'wh-nogl');

  const visibleParts = () => partsAt(data.parts, state.stage).map((p) => p.key);
  function stageHtml() {
    const s = data.stages.find((x) => x.key === state.stage), i = stageIndex(state.stage);
    return `<p class="wh-site-k">${bi(`Stage ${i + 1} of ${STAGES.length}`, `第 ${i + 1} 階段（共 ${STAGES.length} 個）`)} · ${bi(s.when_en, s.when_zh)}</p>`
      + `<h3>${bi(s.en, s.zh)}</h3><p class="wh-cs-text">${bi(s.text_en, s.text_zh)}</p>`
      + `<p class="wh-cs-new"><b>${bi('New at this stage', '這個階段新加的')}</b>${newAt(data.parts, state.stage).map((p) => `<button type="button" data-part="${p.key}" class="wh-cs-chip">${bi(p.en, p.zh)}</button>`).join('')}</p>`
      + (s.url ? `<a class="wh-py-src" href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.src)} &#8599;</a>` : '');
  }
  function partHtml(p) {
    const when = p.stages.map((k) => { const s = data.stages.find((x) => x.key === k); return bi(s.en, s.zh); }).join('<span class="wh-cs-dot"> · </span>');
    return `<p class="wh-site-k">${bi('Part of the castle', '城堡的一部分')}</p><h3>${bi(p.en, p.zh)}</h3>`
      + `<dl><div><dt>${bi('What it was for', '做什麼用')}</dt><dd>${bi(p.what_en, p.what_zh)}</dd></div>`
      + `<div><dt>${bi('In the model', '模型裡出現在')}</dt><dd class="wh-cs-when">${when}</dd></div></dl>`
      + (p.url ? `<a class="wh-py-src" href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.src)} &#8599;</a>` : '');
  }
  function update() {
    const vis = new Set(visibleParts());
    stageCard.innerHTML = stageHtml();
    for (const b of stageBtns) b.setAttribute('aria-pressed', b.dataset.stage === state.stage);
    for (const b of root.querySelectorAll('.wh-cs-parts [data-part]')) { b.hidden = !vis.has(b.dataset.part); b.setAttribute('aria-pressed', b.dataset.part === state.part); }
    const p = state.part && byPart[state.part];
    partCard.hidden = !p;
    if (p) partCard.innerHTML = partHtml(p);
    if (!view) return;
    for (const [k, g] of Object.entries(view.groups)) {
      const on = vis.has(k); g.visible = on;
      // 土丘城寨的時候，大廳是木造的
      if (k === 'hall') g.userData.mats.forEach((m, i) => m.color.set(i === 0 ? (state.stage === 'motte' ? COL.wood : COL.stone) : COL.roof));
      for (const m of g.userData.mats || []) m.emissive = new Color(state.part === k ? '#5a4a10' : '#000000');
    }
  }
  function render() {
    if (!view) return;
    const vis = new Set(visibleParts()), fresh = new Set(newAt(data.parts, state.stage).map((p) => p.key)), narrow = root.clientWidth < 600;
    for (const [k, el] of Object.entries(view.partLabs)) {
      const show = vis.has(k) && (k === state.part || (!state.part && fresh.has(k) && !narrow));
      view.labs.place(el, view.anchor(k), show);
    }
    view.renderer.render(view.scene, view.camera);
  }
  function grow(dt) {
    if (!view) return false;
    let busy = false;
    for (const g of Object.values(view.groups)) {
      const a = g.userData.age ?? 1;
      if (g.visible && a < 1) { g.userData.age = Math.min(1, a + dt / 0.7); const e = 1 - (1 - g.userData.age) ** 3; g.scale.set(1, Math.max(0.02, e), 1); busy = true; }
    }
    return busy;
  }
  function frame(t) {
    raf = 0;
    const dt = Math.min(0.05, last ? (t - last) / 1000 : 0.016); last = t;
    let busy = false;
    if (state.playing) {
      state.playT += dt; busy = true;
      if (state.playT > 2.6) { state.playT = 0; const i = stageIndex(state.stage); if (i < STAGES.length - 1) stage(STAGES[i + 1]); else play(false); }
    }
    if (grow(dt)) busy = true;
    if (view) view.controls.update();
    render();
    idle = busy ? 0 : idle + 1;
    if (visible && idle < 80) raf = requestAnimationFrame(frame);
  }
  function kick() { idle = 0; if (!raf && visible) { last = 0; raf = requestAnimationFrame(frame); } }
  new IntersectionObserver((ents) => { visible = ents[0].isIntersecting; if (visible) kick(); }).observe(root);

  function stage(k, instant) {
    if (stageIndex(k) < 0) return;
    state.stage = k;
    if (state.part && !visibleParts().includes(state.part)) state.part = null;
    if (view && !instant) for (const p of newAt(data.parts, k)) { const g = view.groups[p.key]; g.userData.age = 0; g.scale.set(1, 0.02, 1); }
    update(); kick();
  }
  function select(k) { state.part = k && byPart[k] && visibleParts().includes(k) ? k : null; update(); kick(); }
  function play(on) {
    state.playing = on; state.playT = 0;
    if (on) { select(null); stage(STAGES[0]); }
    playBtn.setAttribute('aria-pressed', on); playBtn.querySelector('.al-play-t').textContent = on ? 'Pause · 暫停' : 'Watch it grow · 看它長大';
    root.classList.toggle('is-playing', on); kick();
  }
  playBtn.addEventListener('click', () => play(!state.playing));
  root.addEventListener('click', (ev) => {
    const s = ev.target.closest('[data-stage]'); if (s) { if (state.playing) play(false); stage(s.dataset.stage); return; }
    const p = ev.target.closest('[data-part]'); if (p) { if (state.playing) play(false); select(state.part === p.dataset.part ? null : p.dataset.part); }
  });
  if (view) $('.al-home').addEventListener('click', () => { view.camera.position.set(...CAM.pos); view.controls.target.set(...CAM.target); view.controls.update(); kick(); });
  const DEMOS = Object.fromEntries((data.demos || []).map((d) => [d.key, () => { if (state.playing) play(false); stage(d.stage, true); select(d.part || null); }]));
  const api = {
    state, stage, select, play,
    demo(n) { if (DEMOS[n]) DEMOS[n](); },
    info() { return { stage: state.stage, part: state.part, parts: visibleParts(), webgl: !!view }; },
    render() { update(); render(); },
    ready: () => true,
  };
  stage('motte', true);
  root.__lab = api;
  return api;
}

lazyBoot('[data-wh-castle-lab]', init, { demo: (lab, v) => lab.demo(v) });
