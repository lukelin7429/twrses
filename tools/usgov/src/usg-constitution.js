/*
 * 美國政治 U.S. Government · 第一課「一份文件怎麼管一個國家？」。
 *
 * 一個想法：**憲法是一份人民授權政府的書面契約**——先設立機關、分配權力，再劃出政府不能越過的線。
 * 3D：華盛頓的模型（dc.js）。點憲法第一、二、三條，各「長出」一棟建築（國會大廈、白宮、最高法院），右邊欄顯示
 * 那一條設立了什麼、給了哪些權力；第四到七條與修正案是前排的五個節點。後排是最初的十三州。
 * 時間軸（timeline.js／timeline2d.js）從 1774 到現在：拉到制憲之前，只有十三個州和《邦聯條例》下的一院制國會；
 * 1787-09-17 文件簽署後出現羊皮紙；各州批准的那一天變成金色、連到文件；1789-03-04 憲法施行（舊國會的小會堂消失），
 * 三棟建築各自在那個部門開始運作的那一天立起來（lab.branches：國會 1789-04-06、總統 1789-04-30、最高法院 1790-02-02）；
 * 修正案節點上的數字跟著年份增加（1791 年 10 條 … 1992 年 27 條）。
 * 三棟建築是三個權力部門的記號：真正的建築都比較晚才蓋好，模型不照比例，位置與朝向也簡化過。
 *
 * 2D（不需要 WebGL）：match2d.js「這項權力寫在哪一條？」、amend2d.js「改一個字有多難？」。
 *
 * 產物：cd tools/usgov && npm run build → assets/js/usg-constitution.js
 * 除錯：document.querySelector('[data-usgconst-lab]').__lab
 *   state（t、sel、built、playing）、setYear(小數年或 'YYYY-MM-DD')、select('pre'|'a1'…'a7'|'am')、build(key, on)、
 *   demo('league'|'build'|'outer'|'ratify')、fly('overview'|'capitol'|'whitehouse'|'court'|節點 key, 立即?)、
 *   play()、info()、run(秒)、render()、timeline（timeline2d 的 api）
 */
import {
  AmbientLight, BoxGeometry, BufferGeometry, CanvasTexture, Color, CylinderGeometry, DirectionalLight, DoubleSide, Fog, Group, HemisphereLight,
  Line, LineBasicMaterial, LineDashedMaterial, Mesh, MeshStandardMaterial, PerspectiveCamera, PlaneGeometry, SRGBColorSpace, Scene,
  Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { makeDC, EXTENT } from './dc.js';
import { countAt, formatEn, formatZh, latestAt, parseDate, sortEvents } from './timeline.js';
import { makeTimeline } from './timeline2d.js';
import { initMatch } from './match2d.js';
import { initAmend } from './amend2d.js';

const FOV = 34;
const ART_BUILDING = { a1: 'capitol', a2: 'whitehouse', a3: 'court' };
const NODE_POS = { a4: [-12.2, 5.4], a5: [-6.3, 8.5], am: [0, 9.9], a6: [6.3, 8.5], a7: [12.2, 5.4] };
const NODE_COLOR = { a4: 0x6fd3c0, a5: 0xffb86b, am: 0xff8fa3, a6: 0x9db8ff, a7: 0xd9c56a };
const DOC_POS = new Vector3(0, 0, 4.6);
const ease = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const cv = $('.al-space-cv'), spaceWrap = $('.al-space');
  const data = JSON.parse($('script[type="application/json"]').textContent);
  const now = data.max;

  // ── 事件：頁面資料裡的歷史事件＋十三州批准的日期＋第十一條以後的修正案 ──
  const T = {};
  const events = [];
  for (const e of data.events) { const t = parseDate(e.date); T[e.id] = t; events.push({ ...e, t }); }
  const states = data.states.map((s, i) => ({ ...s, i, t: parseDate(s.date) }));
  for (const s of states) {
    if (events.some((e) => Math.abs(e.t - s.t) < 1e-6)) continue;   // 第一州、第九州、最後一州已經是主要事件
    events.push({ id: `st-${s.abbr}`, t: s.t, rank: 5, cls: 'is-state', en: `${s.en} ratifies`, zh: `${s.zh}批准`, short_en: s.abbr, short_zh: s.zh,
      note_en: `${s.en} becomes state number ${s.order} to ratify the Constitution.`, note_zh: `${s.zh}成為第 ${s.order} 個批准憲法的州。` });
  }
  const amends = data.amendments.map((a) => ({ ...a, t: parseDate(a.date) }));
  for (const a of amends) {
    if (a.n <= 10) continue;
    events.push({ id: `am-${a.n}`, t: a.t, rank: a.n === 27 ? 2 : 4, cls: 'is-amend', precision: 'year', en: `Amendment ${a.n}`, zh: `第 ${a.n} 條修正案`,
      short_en: `Am. ${a.n}`, short_zh: `第 ${a.n} 條`, note_en: `Amendment ${a.n} is ratified: ${a.en}.`, note_zh: `第 ${a.n} 條修正案完成批准：${a.zh}。` });
  }
  const sorted = sortEvents(events);
  const state = { t: T.signed, sel: 'pre', built: { a1: false, a2: false, a3: false }, playing: false, labels: true, statesOn: true };

  // ── 右邊欄（不靠 WebGL） ──
  const whenT = $('.ug-when-t'), whenE = $('.ug-when-e'), whenN = $('.ug-when-n'), cntS = $('.ug-cnt-states'), cntA = $('.ug-cnt-amend');
  const playBtn = $('.ug-play');
  // 三個部門各自在開始運作的那一天出現（國會 1789-04-06、總統 1789-04-30、最高法院 1790-02-02）；在那之前，簽署之後點過條文也會先長出來
  const T_BRANCH = Object.fromEntries(Object.entries(data.branches).map(([k, v]) => [k, parseDate(v)]));
  const isBuilt = (k) => state.t >= T_BRANCH[k] - 1e-9 || (state.t >= T.signed - 1e-9 && state.built[k]);
  function syncUI() {
    root.querySelectorAll('button[data-art]').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.art === state.sel));
      b.classList.toggle('is-built', !!ART_BUILDING[b.dataset.art] && isBuilt(b.dataset.art));
    });
    root.querySelectorAll('.ug-art').forEach((d) => { d.hidden = d.dataset.artPanel !== state.sel; });
    const e = latestAt(sorted, state.t);
    whenT.innerHTML = `${formatEn(state.t)}<span class="zh">${formatZh(state.t)}</span>`;
    if (e) {
      whenE.innerHTML = `${e.en}<span class="zh">${e.zh}</span>`;
      whenN.innerHTML = `${e.note_en || ''}<span class="zh">${e.note_zh || ''}</span>`;
    } else {
      whenE.innerHTML = `${data.before_en}<span class="zh">${data.before_zh}</span>`;
      whenN.innerHTML = '';
    }
    cntS.textContent = `${countAt(states, state.t)} / 13`;
    cntA.textContent = String(countAt(amends, state.t));
    root.classList.toggle('ug-pre-doc', state.t < T.signed - 1e-9);
    playBtn.setAttribute('aria-pressed', String(state.playing));
    playBtn.classList.toggle('is-playing', state.playing);
    playBtn.querySelector('.al-play-t').textContent = state.playing ? 'Pause · 暫停' : 'Play the founding years · 播放建國那幾年';
  }

  // ── 時間軸 ──
  const tl = makeTimeline($('.ug-tl'), {
    min: data.min, max: now, view: [data.presets[0].a, data.presets[0].b], value: state.t, events, presets: data.presets,
    onChange(t) { state.playing = false; applyYear(t); syncUI(); kick(); },
  });

  // ── 3D ──
  let view = null;
  try { view = init3D(); } catch (e) { view = null; }
  if (!view) root.classList.add('al-nogl');

  function init3D() {
    let renderer;
    try { renderer = new WebGLRenderer({ canvas: cv, antialias: true }); } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x060b18, 1);
    const scene = new Scene();
    scene.fog = new Fog(0x060b18, 46, 120);   // 地面往遠處淡進背景，看不到邊
    const camera = new PerspectiveCamera(FOV, 1, 0.5, 400);
    scene.add(new AmbientLight(0xffffff, 0.75));
    scene.add(new HemisphereLight(0xdfe8ff, 0x1a2436, 0.9));
    const sun = new DirectionalLight(0xfff4dc, 2.1); sun.position.set(-14, 22, 18); scene.add(sun);

    const dc = makeDC();
    scene.add(dc.group);
    for (const k of Object.keys(dc.buildings)) dc.setGrow(k, 0);
    const grow = { capitol: 0, whitehouse: 0, court: 0 };

    // 最初的十三州：後排的一道弧，由北到南
    const stateG = new Group(); scene.add(stateG);
    const C_COLONY = new Color(0x5a5f6e), C_STATE = new Color(0x4b6396), C_RATIFIED = new Color(0xe0b24a);
    const blocks = states.map((s, i) => {
      const a = ((200 - (220 * i) / 12) * Math.PI) / 180;
      const pos = new Vector3(0.6 + Math.cos(a) * 17, 0, -3 - Math.sin(a) * 8.6);
      const m = new MeshStandardMaterial({ color: C_STATE.clone(), roughness: 0.7 });
      const b = new Mesh(new BoxGeometry(1.25, 0.7, 1.25), m); b.position.copy(pos).setY(0.35);
      stateG.add(b);
      const lineM = new LineBasicMaterial({ color: 0xe0b24a, transparent: true, opacity: 0 });
      const ln = new Line(new BufferGeometry().setFromPoints([pos.clone().setY(0.72), DOC_POS.clone().setY(0.25)]), lineM);
      stateG.add(ln);
      return { s, pos, mesh: b, mat: m, line: ln, lineM, k: 0 };
    });
    // 《邦聯條例》的「友好同盟」：一條把十三州鬆鬆串起來的虛線
    const league = new Line(new BufferGeometry().setFromPoints(blocks.map((b) => b.pos.clone().setY(0.8))),
      new LineDashedMaterial({ color: 0x9fb0cf, dashSize: 0.5, gapSize: 0.35, transparent: true, opacity: 0 }));
    league.computeLineDistances(); stateG.add(league);
    // 《邦聯條例》下的國會：一間只有一個議場的小會堂（放在後來國會大廈的位置）
    const hall = new Group(); hall.position.copy(dc.SITES.capitol);
    const hm = new MeshStandardMaterial({ color: 0xa9795a, roughness: 0.9 });
    const hb = new Mesh(new BoxGeometry(2.6, 1.0, 1.6), hm); hb.position.y = 0.56; hall.add(hb);
    const hr = new Mesh(new CylinderGeometry(0.02, 1.15, 0.6, 4, 1), new MeshStandardMaterial({ color: 0x5b4a44, roughness: 0.9 }));
    hr.rotation.y = Math.PI / 4; hr.scale.set(1.62, 1, 1); hr.position.y = 1.36; hall.add(hr);
    const ht = new Mesh(new BoxGeometry(0.36, 0.7, 0.36), hm); ht.position.y = 1.7; hall.add(ht);
    scene.add(hall);

    // 羊皮紙：那一份文件
    const docTex = (() => {
      const c = document.createElement('canvas'); c.width = 512; c.height = 660;
      const g = c.getContext('2d');
      g.fillStyle = '#efe2bd'; g.fillRect(0, 0, 512, 660);
      const gr = g.createRadialGradient(256, 330, 120, 256, 330, 420); gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(1, 'rgba(140,100,40,.28)');
      g.fillStyle = gr; g.fillRect(0, 0, 512, 660);
      g.fillStyle = '#2a2117'; g.font = 'italic 700 74px Georgia, "Times New Roman", serif'; g.textAlign = 'left';
      g.fillText('We the People', 26, 96);
      g.fillStyle = 'rgba(42,33,23,.5)';
      for (let y = 136, n = 0; y < 630; y += 15, n++) {
        if (n % 9 === 8) { y += 12; continue; }
        g.fillRect(26, y, 460 - ((n * 53) % 70), 3);
      }
      const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace; return t;
    })();
    const doc = new Mesh(new PlaneGeometry(2.9, 3.74), new MeshStandardMaterial({ map: docTex, roughness: 0.9, side: DoubleSide, transparent: true }));
    doc.position.copy(DOC_POS).setY(1.15); doc.rotation.x = -0.95;
    scene.add(doc);

    // 第四到七條與修正案：前排的五個節點，各有一條線接到文件
    const nodes = {};
    for (const [key, [x, z]] of Object.entries(NODE_POS)) {
      const g = new Group(); g.position.set(x, 0, z);
      const m = new MeshStandardMaterial({ color: NODE_COLOR[key], roughness: 0.5, emissive: NODE_COLOR[key], emissiveIntensity: 0.1, transparent: true });
      const p = new Mesh(new CylinderGeometry(0.85, 1.0, 0.42, 6), m); p.position.y = 0.21; g.add(p);
      const lm = new LineBasicMaterial({ color: NODE_COLOR[key], transparent: true, opacity: 0.5 });
      const ln = new Line(new BufferGeometry().setFromPoints([new Vector3(x, 0.3, z), DOC_POS.clone().setY(0.2)]), lm);
      scene.add(g); scene.add(ln);
      nodes[key] = { g, m, ln, lm, pos: new Vector3(x, 0.6, z), k: 0, lit: 0 };
    }

    const controls = new OrbitControls(camera, cv);
    controls.enableDamping = true; controls.dampingFactor = 0.12; controls.rotateSpeed = 0.55; controls.zoomSpeed = 0.7;
    controls.maxPolarAngle = Math.PI * 0.485; controls.minDistance = 5; controls.screenSpacePanning = false;
    controls.enablePan = false;

    // 標籤
    const labs = labeler($('.al-labels'), cv, camera);
    const L = [];
    const addLab = (cls, html, pos, dy, when) => { const el = labs.add(`ug-lab3 ${cls}`, html); L.push({ el, pos, dy, when }); return el; };
    addLab('is-b', 'Congress <i>國會</i><small>Article I · 第一條</small>', dc.buildings.capitol.pos.clone().setY(5.3), 0, () => grow.capitol > 0.6);
    addLab('is-b', 'The President <i>總統</i><small>Article II · 第二條</small>', dc.buildings.whitehouse.pos.clone().setY(2.9), 0, () => grow.whitehouse > 0.6);
    addLab('is-b', 'The Courts <i>法院</i><small>Article III · 第三條</small>', dc.buildings.court.pos.clone().setY(3.5), 0, () => grow.court > 0.6);
    const hallLab = addLab('is-old', '', dc.SITES.capitol.clone().setY(2.5), 0, () => hall.visible && grow.capitol < 0.3);
    addLab('is-doc', 'The Constitution <i>憲法</i>', DOC_POS.clone().setY(2.9), 0, () => doc.visible);
    const nodeName = { a4: 'Art. IV<b> · The states</b> <i>州與州</i>', a5: 'Art. V<b> · Amending</b> <i>修憲</i>', am: '', a6: 'Art. VI<b> · Supreme law</b> <i>最高條款</i>', a7: 'Art. VII<b> · Ratifying</b> <i>批准</i>' };
    const amLab = {};
    for (const key of Object.keys(nodes)) amLab[key] = addLab(`is-node is-${key}`, nodeName[key], nodes[key].pos.clone().setY(1.25), 0, () => nodes[key].k > 0.5);
    blocks.forEach((b) => addLab('is-st', b.s.abbr, b.pos.clone().setY(1.1), 0, () => state.statesOn));

    // 鏡頭
    const tanF = Math.tan((FOV * Math.PI) / 360);
    let aspect = 1;
    const OV_DIR = new Vector3(0, 0.6, 0.8).normalize(), OV_STEEP = new Vector3(0, 0.83, 0.56).normalize(), OV_TARGET = new Vector3(0, 0.6, 0.2);
    function overview() {
      // 畫面窄（手機是正方形的畫布）時從比較高的地方往下看，前後的深度才撐得滿畫面
      const narrow = aspect < 1.15;
      const dist = Math.max((narrow ? 31 : EXTENT.w) / 2 / (tanF * aspect), (EXTENT.d * 0.62) / tanF) * 1.02;
      return { target: OV_TARGET.clone(), position: OV_TARGET.clone().addScaledVector(narrow ? OV_STEEP : OV_DIR, dist) };
    }
    function shotOf(key) {
      if (key === 'overview') return overview();
      if (dc.buildings[key]) {
        const f = dc.focusOf(key);
        // 畫面窄的時候退後一點，整棟才放得下
        const k = Math.max(1, 1.25 / aspect);
        return { target: f.target, position: f.target.clone().add(f.position.sub(f.target).multiplyScalar(k)) };
      }
      const p = key === 'pre' ? DOC_POS.clone().setY(1.1) : nodes[key] ? nodes[key].pos.clone() : null;
      if (!p) return overview();
      const k = Math.max(1, 1.2 / aspect);
      return { target: p, position: p.clone().add(new Vector3(key === 'pre' ? 0 : -p.x * 0.18, 5.2, 9.5).multiplyScalar(k)) };
    }
    let fly = null, shot = 'overview';
    function flyTo(key, immediate) {
      shot = key;
      const to = shotOf(key);
      if (immediate) { camera.position.copy(to.position); controls.target.copy(to.target); camera.lookAt(to.target); fly = null; return; }
      fly = { p0: camera.position.clone(), t0: controls.target.clone(), p1: to.position, t1: to.target, k: 0 };
    }
    function resize() {
      const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      aspect = w / h; camera.aspect = aspect; camera.updateProjectionMatrix();
      controls.maxDistance = overview().position.distanceTo(OV_TARGET) * 1.5;
      if (shot && !userMoved) flyTo(shot, true);
    }
    let userMoved = false;
    controls.addEventListener('start', () => { userMoved = true; fly = null; });

    const tmpC = new Color(), proj = new Vector3();
    /** 往目標靠近；回傳還在不在動 */
    function tick(dt) {
      let moving = false;
      const t = state.t;
      const approach = (cur, to, rate) => { const d = to - cur; if (Math.abs(d) < 0.002) return to; moving = true; return cur + Math.sign(d) * Math.min(Math.abs(d), dt * rate); };
      for (const [art, key] of Object.entries(ART_BUILDING)) {
        grow[key] = approach(grow[key], isBuilt(art) ? 1 : 0, 0.75);
        dc.setGrow(key, ease(grow[key]));
        dc.buildings[key].pad.visible = t >= T.signed - 1e-9;
      }
      const docOn = t >= T.signed - 1e-9;
      doc.material.opacity = approach(doc.material.opacity, docOn ? 1 : 0, 2.5); doc.visible = doc.material.opacity > 0.01;
      const hallOn = t < T.government - 1e-9;
      hall.scale.y = Math.max(0.001, approach(hall.scale.y, hallOn ? 1 : 0, 1.6)); hall.visible = hall.scale.y > 0.01 && grow.capitol < 0.5;
      const hallHtml = t < T.articles_force - 1e-9 ? '<b>Continental Congress</b> <i>大陸會議</i>' : '<b>Congress under the Articles</b> <i>邦聯國會</i><small>one chamber, one vote per state · 一院、每州一票</small>';
      if (hallLab.dataset.h !== hallHtml) { hallLab.dataset.h = hallHtml; hallLab.innerHTML = hallHtml; }
      league.material.opacity = approach(league.material.opacity, t >= T.articles_force - 1e-9 && t < T.government - 1e-9 ? 0.85 : 0, 2);
      league.visible = league.material.opacity > 0.01 && state.statesOn;
      for (const b of blocks) {
        const rat = t >= b.s.t - 1e-9;
        b.k = approach(b.k, rat ? 1 : 0, 2.2);
        tmpC.copy(t < T.declaration - 1e-9 ? C_COLONY : C_STATE).lerp(C_RATIFIED, b.k);
        b.mat.color.copy(tmpC);
        b.mat.emissive.setHex(0xe0b24a); b.mat.emissiveIntensity = 0.22 * b.k;
        b.mesh.scale.y = 1 + 0.5 * b.k; b.mesh.position.y = 0.35 * b.mesh.scale.y;
        b.lineM.opacity = 0.55 * b.k; b.line.visible = b.k > 0.01 && state.statesOn;
        b.mesh.visible = state.statesOn;
      }
      const lit = t >= T.ninth - 1e-9;
      for (const [key, n] of Object.entries(nodes)) {
        const on = key === 'am' ? t >= T.proposed12 - 1e-9 : docOn;
        n.k = approach(n.k, on ? 1 : 0, 2.5);
        n.lit = approach(n.lit, (key === 'am' ? t >= T.bor - 1e-9 : lit) ? 1 : 0, 2);
        n.g.visible = n.k > 0.01; n.ln.visible = n.g.visible;
        n.g.scale.setScalar(0.6 + 0.4 * n.k);
        n.m.opacity = n.k; n.lm.opacity = 0.2 + 0.4 * n.lit;
        n.m.emissiveIntensity = 0.08 + 0.5 * n.lit + (state.sel === key ? 0.45 : 0);
        n.g.position.y = state.sel === key ? 0.25 : 0;
      }
      const cnt = countAt(amends, t);
      const amHtml = `Amendments <i>修正案</i><small>${cnt === 0 ? (t >= T.proposed12 ? 'proposed, not yet ratified · 已提出，尚未批准' : '') : `${cnt} ratified · 已批准 ${cnt} 條`}</small>`;
      if (amLab.am.innerHTML !== amHtml) amLab.am.innerHTML = amHtml;
      if (fly) {
        fly.k = Math.min(1, fly.k + dt / 1.25);
        const e = ease(fly.k);
        camera.position.lerpVectors(fly.p0, fly.p1, e); controls.target.lerpVectors(fly.t0, fly.t1, e);
        if (fly.k >= 1) fly = null;
        moving = true;
      }
      if (controls.update()) moving = true;
      return moving;
    }
    function render() {
      renderer.render(scene, camera);
      for (const l of L) {
        if (!state.labels || !l.when()) { l.el.style.opacity = 0; continue; }
        labs.place(l.el, l.pos, l.dy || 0);
        proj.copy(l.pos).project(camera);
        if (Math.abs(proj.x) > 0.97 || Math.abs(proj.y) > 0.97) l.el.style.opacity = 0;
      }
    }
    new ResizeObserver(() => { resize(); render(); }).observe(spaceWrap);
    resize(); flyTo('overview', true);
    return { renderer, scene, camera, controls, dc, tick, render, flyTo, grow, resetUser() { userMoved = false; } };
  }

  // ── 狀態 ──
  function applyYear(t) {
    state.t = Math.min(now, Math.max(data.min, t));
    if (state.t < T.signed - 1e-9) state.built = { a1: false, a2: false, a3: false };
  }
  let seq = null;   // 示範用的排程：[{ at: 秒, fn }]
  const api = {
    state, timeline: tl, T,
    ready: () => true,
    setYear(t) { state.playing = false; applyYear(typeof t === 'string' ? parseDate(t) : t); tl.set(state.t, true); syncUI(); kick(); },
    select(key, opt = {}) {
      state.sel = key;
      if (key !== 'pre' || opt.force) { if (state.t < T.signed - 1e-9) { applyYear(T.signed); tl.set(state.t, true); } }
      if (ART_BUILDING[key]) state.built[key] = true;
      if (view && !opt.stay) { view.resetUser(); view.flyTo(ART_BUILDING[key] || key); }
      syncUI(); kick();
    },
    build(key, on = true) { state.built[key] = on; syncUI(); kick(); },
    fly(key, immediate) { if (view) { view.resetUser(); view.flyTo(key, immediate); kick(); } },
    play() {
      if (state.playing) { state.playing = false; syncUI(); return; }
      tl.fit('founding');
      if (state.t >= T.bor + 0.4 || state.t < data.presets[0].a) applyYear(T.declaration - 0.5);
      if (view) { view.resetUser(); view.flyTo('overview'); }
      state.playing = true; syncUI(); kick();
    },
    demo(k) {
      seq = null; state.playing = false;
      if (k === 'league') { tl.fit('founding'); api.setYear('1783-09-03'); state.sel = 'pre'; api.fly('overview'); }
      else if (k === 'build') {
        tl.fit('founding'); state.built = { a1: false, a2: false, a3: false }; api.setYear(T.signed); api.fly('overview');
        seq = { t: 0, steps: [[0.9, () => api.select('a1')], [3.6, () => api.select('a2')], [6.3, () => api.select('a3')], [9.2, () => api.fly('overview')]] };
      } else if (k === 'outer') {
        tl.fit('founding'); api.setYear('1788-07-01'); api.fly('overview');
        seq = { t: 0, steps: [[1.2, () => api.select('a4')], [3.6, () => api.select('a5')], [6.0, () => api.select('a6')], [8.4, () => api.select('a7')], [10.8, () => api.fly('overview')]] };
      } else if (k === 'ratify') { tl.fit('founding'); applyYear(T.signed - 0.05); tl.set(state.t, true); api.fly('overview'); state.playing = true; }
      syncUI(); kick();
    },
    info() {
      return { t: state.t, date: formatEn(state.t), sel: state.sel, built: Object.keys(ART_BUILDING).filter(isBuilt),
        ratified: countAt(states, state.t), amendments: countAt(amends, state.t), grow: view ? { ...view.grow } : null };
    },
    run(sec) { for (let i = 0, n = Math.ceil(sec * 60); i < n; i++) step(1 / 60); },
    render() { if (view) view.render(); },
  };

  // ── 控制 ──
  root.querySelectorAll('button[data-art]').forEach((b) => b.addEventListener('click', () => { seq = null; state.playing = false; api.select(b.dataset.art); }));
  playBtn.addEventListener('click', () => { seq = null; api.play(); });
  root.querySelectorAll('[data-t]').forEach((c) => c.addEventListener('change', () => {
    if (c.dataset.t === 'labels') state.labels = c.checked; else if (c.dataset.t === 'states') state.statesOn = c.checked;
    kick();
  }));
  if (view) $('.al-home').addEventListener('click', () => { api.fly('overview'); });

  // ── 迴圈：只在需要時畫 ──
  let raf = 0, last = 0, visible = true, idle = 0;
  function step(dt) {
    let moving = false;
    if (seq) {
      seq.t += dt;
      while (seq && seq.steps.length && seq.steps[0][0] <= seq.t) { const fn = seq.steps.shift()[1]; const keep = seq; fn(); seq = keep; }
      if (seq && !seq.steps.length) seq = null;
      moving = true;
    }
    if (state.playing) {
      // 1787 年 9 月到 1790 年中事情最密，放慢
      const slow = state.t > T.signed - 0.15 && state.t < T.signed + 3.0;
      let t = state.t + dt * (slow ? 0.36 : 1.7);
      const endT = T.bor + 0.45;
      if (t >= endT) { t = endT; state.playing = false; }
      applyYear(t); tl.set(state.t, true); syncUI();
      moving = true;
    }
    if (view && view.tick(dt)) moving = true;
    return moving;
  }
  function frame(nowMs) {
    raf = 0;
    const dt = last ? Math.min(0.05, (nowMs - last) / 1000) : 0.016;
    last = nowMs;
    const moving = step(dt);
    if (view) view.render();
    idle = moving ? 0 : idle + 1;
    if (visible && idle < 90) raf = requestAnimationFrame(frame);
  }
  function kick() { idle = 0; if (!raf && visible) { last = 0; raf = requestAnimationFrame(frame); } }
  if (view) {
    view.controls.addEventListener('start', kick); view.controls.addEventListener('change', kick);
    cv.addEventListener('pointerdown', kick); cv.addEventListener('wheel', kick, { passive: true });
  }
  new IntersectionObserver((ents) => { visible = ents[0].isIntersecting; if (visible) kick(); }).observe(root);

  syncUI();
  kick();
  root.__lab = api;
  return api;
}

function init2D() {
  document.querySelectorAll('[data-ug-match]').forEach((el) => initMatch(el));
  document.querySelectorAll('[data-ug-amend]').forEach((el) => initAmend(el));
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D); else init2D();

lazyBoot('[data-usgconst-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
