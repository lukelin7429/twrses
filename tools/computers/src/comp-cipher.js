/*
 * 電腦概論 · 第十四課「電腦怎麼保守祕密？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：**把訊息照約好的規則打亂（加密），只有知道金鑰的人才能還原（解密）**。
 * 中途的人看得到經過的東西，卻看不懂。規則可以公開；要保密的是金鑰。
 * 場景：左邊你的電腦、右邊朋友的電腦，中間一條線和幾個中繼點；其中一個中繼點旁邊站著一個偷看的人。
 *   0 你寫好訊息　1 上鎖（用金鑰把字母往後移 k 格；不加密就原樣送出）　2 經過偷看的人　3 送到朋友那裡　4 朋友用金鑰解開
 *   [data-msg] 三句訊息　[data-mode] plain／secret　.cp-cf-minus／.cp-cf-plus 金鑰 1–25
 *   .al-play 送出　.cp-step 一站一站走　.cp-reset 重來
 * 四張卡：plain（不加密，偷看的人讀到原文）、secret（金鑰 3）、wrongkey（朋友拿錯金鑰）、crack（偷看的人一把一把試）
 *
 * 控制器不靠 WebGL：每一站的文字是 cipher.js 算好的；沒有 WebGL 時 3D 不畫，右邊三個人各看到什麼照樣顯示。
 * 2D（不需要 WebGL）：自己加密解密、當偷看的人、金鑰有幾把——cipher2d.js。
 *
 * 產物：cd tools/computers && npm run build → assets/js/comp-cipher.js
 * 除錯：document.querySelector('[data-compcipher-lab]').__lab
 *   send()、next()、setMode('plain'|'secret')、setKey(k)、setMsg(i)、reset()、demo('plain'|'secret'|'wrongkey'|'crack')、run(秒)、goCam()、render()、cur()
 */
import {
  AmbientLight, BoxGeometry, CircleGeometry, Color, CylinderGeometry, DirectionalLight, HemisphereLight,
  MathUtils, Mesh, MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { MESSAGES, shift, unshift } from './cipher.js';
import { initCipher, initKeys, initSpy } from './cipher2d.js';

const V = (x, y, z) => new Vector3(x, y, z);
const DUR = 2.8, TRY = 1.1;
const PA = V(-5, 1.2, 0.6), PM = V(0, 1.2, 0.6), PB = V(5, 1.2, 0.6);
const POS = [PA, PA, PM, PB, PB];

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space'), cv = $('.al-space-cv');
  const R = { msg: $('.cp-msg'), play: $('.al-play'), msgs: [...$$('[data-msg]')], modes: [...$$('[data-mode]')], kv: $('.cp-cf-kv'), keyBox: $('.cp-cf-key'), you: $('.cp-cf-you'), spy: $('.cp-cf-spy'), friend: $('.cp-cf-friend'), step: $('.cp-step') };
  const state = { mi: 0, mode: 'secret', k: 3, fk: null, crack: false, stage: -1, playing: false, wait: 0, tries: 0, tw: 0, labels: true };
  let view = null;
  const plain = () => MESSAGES[state.mi], secret = () => state.mode === 'secret';
  const wire = () => (secret() ? shift(plain(), state.k) : plain());
  const fkey = () => (state.fk == null ? state.k : state.fk);
  const friendReads = () => (secret() ? unshift(wire(), fkey()) : plain());
  const spySees = () => (!secret() ? plain() : state.crack && state.tries > 0 ? unshift(wire(), state.tries) : wire());
  const cracked = () => state.crack && state.tries >= state.k;

  const say = (en, zh) => { R.msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  function show() {
    R.msgs.forEach((b, i) => b.setAttribute('aria-pressed', i === state.mi ? 'true' : 'false'));
    R.modes.forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-mode') === state.mode ? 'true' : 'false'));
    R.kv.textContent = String(state.k); R.keyBox.classList.toggle('is-off', !secret());
    R.you.textContent = state.stage >= 0 ? plain() : '…';
    R.spy.textContent = state.stage >= 2 ? spySees() : '…';
    R.friend.textContent = state.stage >= 4 ? friendReads() : '…';
    R.spy.parentNode.classList.toggle('is-bad', state.stage >= 2 && (!secret() || cracked()));
    R.friend.parentNode.classList.toggle('is-bad', state.stage >= 4 && friendReads() !== plain());
    R.play.setAttribute('aria-pressed', state.playing ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = state.playing ? 'Pause · 暫停' : 'Send · 送出';
    R.step.textContent = state.stage < 0 || state.stage >= 4 ? 'One stop at a time · 一站一站走' : 'Next stop · 下一站';
  }
  function tell() {
    const s = state.stage, k = state.k;
    if (s === 0) say(`You write a message to your friend: “${plain()}”. On its way it will pass through machines that neither of you controls.`, `你寫了一則訊息給朋友：「${plain()}」。它在路上會經過一些你們兩個都管不到的機器。`);
    else if (s === 1) (secret()
      ? say(`Before it leaves, your computer locks it with the key ${k}: every letter moves ${k} place${k === 1 ? '' : 's'} along the alphabet. Now it reads “${wire()}”.`, `出發之前，你的電腦用金鑰 ${k} 把它鎖起來：每個字母往後移 ${k} 格。現在它變成「${wire()}」。`)
      : say('No lock this time. The message leaves exactly as you wrote it.', '這一次不上鎖。訊息照你寫的原樣送出去。'));
    else if (s === 2) {
      if (!secret()) say(`Someone along the way is watching. They read every word: “${plain()}”.`, `路上有人在偷看。每一個字他都讀到了：「${plain()}」。`);
      else if (!state.crack) say(`Someone along the way is watching. They see “${wire()}”. They have the message, but without the key it means nothing to them.`, `路上有人在偷看。他看到的是「${wire()}」。訊息他拿到了，可是沒有金鑰，對他來說毫無意義。`);
      else if (state.tries === 0) say(`The watcher has “${wire()}” and decides to try every key, one after another.`, `偷看的人拿到「${wire()}」，決定把每一把金鑰一把一把試。`);
      else if (!cracked()) say(`Key ${state.tries}: “${spySees()}”. Not English. Try the next one.`, `金鑰 ${state.tries}：「${spySees()}」。不是英文。試下一把。`);
      else say(`Key ${state.tries}: “${spySees()}”. That is English. The lock is broken after ${state.tries} tr${state.tries === 1 ? 'y' : 'ies'}. With only 25 possible keys, this cipher cannot keep a secret from anyone patient.`, `金鑰 ${state.tries}：「${spySees()}」。這是英文。試了 ${state.tries} 把，鎖就破了。金鑰只有 25 種可能，這種加密擋不住任何有耐心的人。`);
    } else if (s === 3) say(`The message arrives at your friend’s computer, still reading “${wire()}”.`, `訊息送到朋友的電腦了，內容仍然是「${wire()}」。`);
    else if (s === 4) {
      if (!secret()) say(`Your friend reads “${plain()}”. So did the watcher.`, `朋友讀到「${plain()}」。偷看的人也讀到了。`);
      else if (friendReads() === plain()) say(`Your friend has the same key, ${fkey()}, and moves every letter back ${fkey()} place${fkey() === 1 ? '' : 's'}: “${plain()}”. ${cracked() ? 'But the watcher broke it too.' : 'Only the two of you could read it.'}`, `朋友有同一把金鑰 ${fkey()}，把每個字母往回移 ${fkey()} 格：「${plain()}」。${cracked() ? '可是偷看的人也破解了。' : '只有你們兩個讀得懂。'}`);
      else say(`Your friend uses the key ${fkey()}, but you locked the message with ${k}. Out comes “${friendReads()}”: nonsense. Both sides must have exactly the same key.`, `朋友用的金鑰是 ${fkey()}，可是你上鎖用的是 ${k}。解出來是「${friendReads()}」：一串沒有意義的字。兩邊的金鑰必須一模一樣。`);
    }
  }
  function goto(n) { state.stage = n; state.wait = DUR; if (n === 2) { state.tries = 0; state.tw = TRY; } if (n >= 4) state.playing = false; tell(); root.classList.remove('al-fresh'); show(); }
  function send(auto = true) { state.playing = auto; goto(0); }
  function next() { if (state.stage < 0 || state.stage >= 4) send(false); else if (state.stage === 2 && state.crack && secret() && !cracked()) { state.tries++; tell(); show(); } else { state.playing = false; goto(state.stage + 1); } }
  function idle() { state.stage = -1; state.playing = false; state.tries = 0; show(); intro(); }
  function setMode(m) { state.mode = m; state.fk = null; state.crack = false; idle(); }
  function setKey(k) { state.k = Math.max(1, Math.min(25, k)); state.fk = null; idle(); }
  function setMsg(i) { state.mi = i; idle(); }
  function reset() { state.mi = 0; state.mode = 'secret'; state.k = 3; state.fk = null; state.crack = false; idle(); }
  const intro = () => say('Choose a message, decide whether to lock it, and press Send. Watch what each of the three people ends up with: you, the watcher in the middle, and your friend.', '選一則訊息，決定要不要上鎖，然後按「送出」。看看三個人最後各拿到什麼：你、中間偷看的人、你的朋友。');

  R.msgs.forEach((b, i) => b.addEventListener('click', () => setMsg(i)));
  R.modes.forEach((b) => b.addEventListener('click', () => setMode(b.getAttribute('data-mode'))));
  $('.cp-cf-minus').addEventListener('click', () => setKey(state.k - 1)); $('.cp-cf-plus').addEventListener('click', () => setKey(state.k + 1));
  R.play.addEventListener('click', () => { if (state.playing) { state.playing = false; show(); } else if (state.stage >= 0 && state.stage < 4) { state.playing = true; state.wait = 0.4; show(); } else send(); });
  R.step.addEventListener('click', () => next());
  $('.cp-reset').addEventListener('click', () => reset());
  const tgL = $('[data-t="labels"]');
  if (tgL) tgL.addEventListener('change', () => { state.labels = tgL.checked; });

  // ── 3D ──────────────────────────────────────────────────────────────
  function make3D() {
    let renderer;
    try { renderer = new WebGLRenderer({ canvas: cv, antialias: true }); } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const scene = new Scene();
    scene.background = new Color(0x0b1326);
    const camera = new PerspectiveCamera(34, 1, 0.05, 200);
    const controls = new OrbitControls(camera, cv);
    controls.enableDamping = true; controls.dampingFactor = 0.08;
    controls.minDistance = 3; controls.maxDistance = 60; controls.maxPolarAngle = Math.PI * 0.49;
    scene.add(new HemisphereLight(0xeaf0ff, 0x1a2030, 1.1)); scene.add(new AmbientLight(0xffffff, 0.35));
    const sun = new DirectionalLight(0xfff1dc, 1.3); sun.position.set(-3, 9, 8); scene.add(sun);
    const floor = new Mesh(new CircleGeometry(90, 64), new MeshStandardMaterial({ color: 0x121c36, roughness: 0.95 }));
    floor.rotation.x = -Math.PI / 2; scene.add(floor);
    const mat = (c, o = {}) => new MeshStandardMaterial({ color: c, roughness: 0.6, ...o });
    const box = (m, w, h, d, x, y, z) => { const b = new Mesh(new BoxGeometry(w, h, d), m); b.position.set(x, y, z); scene.add(b); return b; };
    const laptop = (x, c) => { box(mat(c, { roughness: 0.5 }), 2.2, 0.12, 1.5, x, 0.06, 1.0); const l = box(mat(c, { roughness: 0.5 }), 2.2, 1.5, 0.1, x, 0.85, 0.28); l.rotation.x = -0.16; const s = box(mat(0x0c1424, { emissive: 0xeaf6ff, emissiveIntensity: 0.1 }), 1.95, 1.25, 0.02, x, 0.87, 0.35); s.rotation.x = -0.16; return s.material; };
    const scrA = laptop(-5, 0xaab4c8), scrB = laptop(5, 0xc9a47a);
    box(mat(0x56627e, { roughness: 0.5 }), 7.8, 0.06, 0.06, 0, 0.08, 1.0);
    const nodeM = mat(0x7ef0e3, { emissive: 0x7ef0e3, emissiveIntensity: 0.35 });
    for (const x of [-2.4, 0, 2.4]) { const s = new Mesh(new SphereGeometry(0.15, 14, 10), nodeM); s.position.set(x, 0.12, 1.0); scene.add(s); }
    // 偷看的人：站在中間那個中繼點後面
    const spyM = mat(0x3a2a4a, { emissive: 0xff6b5c, emissiveIntensity: 0 });
    const body = new Mesh(new CylinderGeometry(0.3, 0.42, 1.3, 18), spyM); body.position.set(0, 0.65, -0.5); scene.add(body);
    const head = new Mesh(new SphereGeometry(0.28, 18, 14), mat(0x2a1f36)); head.position.set(0, 1.55, -0.5); scene.add(head);
    const hat = new Mesh(new CylinderGeometry(0.5, 0.5, 0.05, 20), mat(0x1a1424)); hat.position.set(0, 1.74, -0.5); scene.add(hat);
    const hat2 = new Mesh(new CylinderGeometry(0.26, 0.3, 0.3, 20), mat(0x1a1424)); hat2.position.set(0, 1.9, -0.5); scene.add(hat2);
    const eyeM = mat(0xff6b5c, { emissive: 0xff6b5c, emissiveIntensity: 0.2 });
    for (const x of [-0.1, 0.1]) { const e = new Mesh(new SphereGeometry(0.05, 10, 8), eyeM); e.position.set(x, 1.58, -0.24); scene.add(e); }
    // 信封與鎖
    const envM = mat(0xf4ecd8, { emissive: 0xffd36e, emissiveIntensity: 0.15 });
    const env = box(envM, 0.9, 0.55, 0.08, PA.x, PA.y, PA.z); env.visible = false;
    const lockM = mat(0xffd36e, { emissive: 0xffd36e, emissiveIntensity: 0.5, metalness: 0.4 });
    const lock = new Mesh(new BoxGeometry(0.26, 0.22, 0.12), lockM); lock.position.set(0, -0.02, 0.08); env.add(lock);
    const shackle = new Mesh(new CylinderGeometry(0.09, 0.09, 0.05, 14, 1, true), lockM); shackle.rotation.x = Math.PI / 2; shackle.position.set(0, 0.14, 0.08); env.add(shackle);

    const lab = labeler($('.al-labels'), cv, camera);
    const lbT = [lab.add('cp-lb cp-lb-end', 'you<small>你</small>'), lab.add('cp-lb cp-lb-end cp-lb-spy', 'someone watching<small>偷看的人</small>'), lab.add('cp-lb cp-lb-end', 'your friend<small>你的朋友</small>')];
    const lbE = lab.add('cp-lb cp-lb-val', ''), lbS = lab.add('cp-lb cp-lb-val cp-lb-note', ''), lbF = lab.add('cp-lb cp-lb-val', ''), lbY = lab.add('cp-lb cp-lb-val', '');
    const tmp = V(0, 0, 0), target = V(0, 0, 0);
    function tick(dt) {
      const s = state.stage, e = Math.min(1, dt * 5);
      env.visible = s >= 0; if (s >= 0) { target.copy(POS[s]); env.position.lerp(target, Math.min(1, dt * 2.2)); } else env.position.copy(PA);
      const locked = secret() && s >= 1 && !(s >= 4 && friendReads() === plain()); lock.visible = shackle.visible = locked;
      const peek = s === 2 ? 1 : 0; spyM.emissiveIntensity += ((peek && (!secret() || cracked()) ? 0.6 : 0) - spyM.emissiveIntensity) * e; eyeM.emissiveIntensity += ((peek ? 1.4 : 0.2) - eyeM.emissiveIntensity) * e;
      scrA.emissiveIntensity += ((s === 0 || s === 1 ? 0.7 : 0.1) - scrA.emissiveIntensity) * e; scrB.emissiveIntensity += ((s >= 3 ? 0.7 : 0.1) - scrB.emissiveIntensity) * e;
      if (flyC.t < 1) { flyC.t = Math.min(1, flyC.t + dt / 1.0); const q = MathUtils.smootherstep(flyC.t, 0, 1); camera.position.lerpVectors(flyC.p0, flyC.p1, q); controls.target.lerpVectors(flyC.t0, flyC.t1, q); }
    }
    function fit(w, h) { const vf = MathUtils.degToRad(camera.fov / 2), hf = Math.atan(Math.tan(vf) * camera.aspect); return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf)); }
    const flyC = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
    function goHome(instant) {
      const tg = V(0, 1.35, 0.2), p = V(0, 0.34, 1).normalize().multiplyScalar(fit(14.6, 5.6)).add(tg);
      if (instant) { camera.position.copy(p); controls.target.copy(tg); flyC.t = 1; return; }
      flyC.p0.copy(camera.position); flyC.t0.copy(controls.target); flyC.p1.copy(p); flyC.t1.copy(tg); flyC.t = 0;
    }
    function labels() {
      const on = state.labels, s = state.stage;
      lbT.forEach((l) => { l.hidden = !on; });
      if (on) { lab.place(lbT[0], tmp.set(-5, 2.15, 0.3)); lab.place(lbT[1], tmp.set(0, 2.5, -0.5)); lab.place(lbT[2], tmp.set(5, 2.15, 0.3)); }
      const moving = s >= 1 && s <= 3; lbE.hidden = !moving; if (moving) { lbE.textContent = wire(); lab.place(lbE, tmp.copy(env.position), -34); }
      lbY.hidden = s !== 0; if (s === 0) { lbY.textContent = plain(); lab.place(lbY, tmp.copy(env.position), -34); }
      const note = s >= 2; lbS.hidden = !note; if (note) { lbS.textContent = state.crack && secret() && state.tries > 0 ? `key ${state.tries}: ${spySees()}` : spySees(); lbS.classList.toggle('is-bad', !secret() || cracked()); lab.place(lbS, tmp.set(0, 0.6, -0.5), 46); }
      lbF.hidden = s < 4; if (s >= 4) { lbF.textContent = friendReads(); lbF.classList.toggle('is-bad', friendReads() !== plain()); lab.place(lbF, tmp.copy(env.position), -34); }
    }
    function render() { controls.update(); labels(); renderer.render(scene, camera); }
    $('.al-home').addEventListener('click', () => goHome(false));
    let band0 = null;
    function resize() {
      const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.fov = camera.aspect < 1.1 ? 42 : 34; camera.updateProjectionMatrix();
      root.classList.toggle('cp-narrow', w < 520);
      const bnd = camera.aspect < 0.9 ? 0 : camera.aspect < 1.25 ? 1 : 2;
      if (bnd !== band0) { band0 = bnd; goHome(true); }
    }
    new ResizeObserver(resize).observe(spaceWrap);
    resize();
    return { camera, controls, scene, tick, render, goHome };
  }
  view = make3D();
  if (!view) root.classList.add('al-nogl');

  const set = (mode, k, fk, crack) => { state.mi = 0; state.mode = mode; state.k = k; state.fk = fk; state.crack = crack; state.stage = -1; state.tries = 0; send(); };
  const DEMO = { plain() { set('plain', 3, null, false); }, secret() { set('secret', 3, null, false); }, wrongkey() { set('secret', 3, 4, false); }, crack() { set('secret', 3, null, true); } };

  function step(dt) {
    if (state.playing && state.stage >= 0 && state.stage < 4) {
      if (state.stage === 2 && state.crack && secret() && !cracked()) { state.tw -= dt; if (state.tw <= 0) { state.tw = TRY * 1.6; state.tries++; state.wait = DUR; tell(); show(); } }
      else { state.wait -= dt; if (state.wait <= 0) goto(state.stage + 1); }
    }
    if (view) view.tick(dt);
  }
  let raf = 0, last = 0, visible = false;
  function frame(ts) { raf = 0; if (!visible) return; const dt = Math.min(0.05, (ts - (last || ts)) / 1000); last = ts; step(dt); if (view) view.render(); raf = requestAnimationFrame(frame); }
  new IntersectionObserver((ents) => { visible = ents[0].isIntersecting; if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); } }, { rootMargin: '120px' }).observe(root);

  show(); intro();
  root.classList.add('al-ready', 'al-fresh');

  root.__lab = {
    state, view, send, next, setMode, setKey, setMsg, reset, cur: () => ({ plain: plain(), wire: wire(), spy: spySees(), friend: friendReads(), cracked: cracked() }),
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => view && view.goHome(true),
    run: (sec) => { for (let x = 0; x < sec; x += 0.02) step(0.02); },
    render: () => { step(0); if (view) view.render(); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  const c = document.querySelector('[data-cp-cipher]'); if (c) initCipher(c);
  const s = document.querySelector('[data-cp-spy]'); if (s) initSpy(s);
  const k = document.querySelector('[data-cp-keys]'); if (k) initKeys(k);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-compcipher-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
