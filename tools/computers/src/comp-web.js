/*
 * 電腦概論 · 第十三課「打開一個網頁，發生了什麼？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：**打開網頁是一次問答**——你的電腦（用戶端）先問 DNS「這個名字的數字地址是多少」，
 * 再向那個地址的伺服器送出請求；伺服器回一份文字，瀏覽器把文字畫成頁面。
 *   0 你的電腦   打好網址
 *   1 → DNS      問：這個名字的地址？
 *   2 ← DNS      答：一個數字地址（查不到，這一趟就到此為止）
 *   3 → 伺服器   請求：GET 路徑
 *   4 ← 伺服器   回應：狀態碼＋一份文字
 *   5 你的電腦   瀏覽器把文字畫出來
 * 場景：左邊筆電、後面中間一本「地址簿」（DNS）、右邊伺服器；光點在三者之間來回。
 *   [data-url] 四個網址（home／pets／missing／noname）　.al-play 前往　.cp-step 一站一站走　[data-st] 跳到某一站
 *
 * 控制器不靠 WebGL：每一站的內容是 web.js 的 trace() 算好的；沒有 WebGL 時 3D 不畫，右邊六站的清單照樣能用。
 * 名字、位址、網頁全部是示意（example.com、RFC 5737 的位址），見 web.js 檔頭。
 * 2D（不需要 WebGL）：網頁是一份文字、讀懂一個網址、誰問誰答——web2d.js、key2d.js。
 *
 * 產物：cd tools/computers && npm run build → assets/js/comp-web.js
 * 除錯：document.querySelector('[data-compweb-lab]').__lab
 *   go(key)、next()、jump(n)、reset()、demo('home'|'pets'|'missing'|'noname')、run(秒)、goCam()、render()、cur()
 */
import {
  AdditiveBlending, AmbientLight, BoxGeometry, CircleGeometry, Color, DirectionalLight, HemisphereLight,
  MathUtils, Mesh, MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry, Sprite, SpriteMaterial, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { canvasTex, labeler, lazyBoot } from './common.js';
import { initChoice } from './key2d.js';
import { LAB_URLS, parseMini, trace } from './web.js';
import { initHtml, initUrlParts, renderMini } from './web2d.js';

const V = (x, y, z) => new Vector3(x, y, z);
const DUR = 2.8;
const PL = V(-5, 1.25, 0.9), PD = V(0, 1.7, -2.8), PS = V(5, 1.7, 0.9);
const LEGS = [[PL, PL], [PL, PD], [PD, PL], [PL, PS], [PS, PL], [PL, PL]];

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space'), cv = $('.al-space-cv');
  const R = { msg: $('.cp-msg'), play: $('.al-play'), urls: [...$$('[data-url]')], rows: [...$$('[data-st]')], step: $('.cp-step'), bar: $('.cp-wb-bar') };
  const state = { key: 'home', stage: -1, playing: false, wait: 0, labels: true };
  let t = trace(LAB_URLS.home), view = null;

  const say = (en, zh) => { R.msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  const values = () => [t.url, `${t.parts.host} ?`, t.ip || 'no such name · 查無此名', t.request || '—', t.status ? `${t.status} ${t.text}` : '—', t.status ? 'page drawn · 畫出頁面' : '—'];
  function show() {
    const v = values();
    R.rows.forEach((r, i) => { r.classList.toggle('is-on', i === state.stage); r.classList.toggle('is-done', i <= state.stage); r.classList.toggle('is-off', i > t.reach); r.querySelector('.cp-ky-v').textContent = i <= state.stage ? v[i] : '…'; });
    R.urls.forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-url') === state.key ? 'true' : 'false'));
    R.bar.textContent = t.url;
    R.play.setAttribute('aria-pressed', state.playing ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = state.playing ? 'Pause · 暫停' : 'Go · 前往';
    R.step.textContent = state.stage < 0 || state.stage >= t.reach ? 'One stop at a time · 一站一站走' : 'Next stop · 下一站';
  }
  function tell() {
    const s = state.stage, h = t.parts.host;
    if (s === 0) say(`You type the address and press Enter. The browser sees a name, ${h}. But computers find each other by number, not by name.`, `你打好網址，按下 Enter。瀏覽器看到的是一個名字：${h}。可是電腦是靠數字找到彼此的，不是靠名字。`);
    else if (s === 1) say(`So the browser first asks the DNS, the address book of the internet: what is the number for ${h}?`, `所以瀏覽器先去問 DNS——網際網路的地址簿：${h} 的數字地址是多少？`);
    else if (s === 2) (t.ip
      ? say(`The DNS answers: ${t.ip}. Now the browser knows where the server is.`, `DNS 回答：${t.ip}。現在瀏覽器知道伺服器在哪裡了。`)
      : say(`The DNS has no such name in its book. Without a number, the browser has nowhere to send its request, so the trip ends here. No server was ever asked.`, `DNS 的簿子裡沒有這個名字。沒有數字地址，瀏覽器的請求就沒有地方可以送，這一趟到這裡結束。沒有任何伺服器被問到。`));
    else if (s === 3) say(`The browser sends a request to ${t.ip}. It is a short piece of text: “${t.request}” means “please send me the page at ${t.parts.path}.”`, `瀏覽器向 ${t.ip} 送出請求。請求是一小段文字：「${t.request}」的意思是「請把 ${t.parts.path} 這一頁給我」。`);
    else if (s === 4) (t.status === 200
      ? say('The server answers “200 OK” and sends back the page. Look at what the page is: a few lines of text.', '伺服器回答「200 OK」，把網頁送回來。看看網頁是什麼：就是幾行文字。')
      : say(`The server answers “404 Not Found.” The server is there and it replied, but it has no page at ${t.parts.path}.`, `伺服器回答「404 Not Found」。伺服器在，它也回話了，只是它那裡沒有 ${t.parts.path} 這一頁。`));
    else if (s === 5) (t.status === 200
      ? say('The browser reads the text and draws it: the words between the tags become a heading and a paragraph. That picture is the web page you see.', '瀏覽器讀了那份文字，把它畫出來：標籤中間的字變成一個標題和一段話。這個畫面就是你看到的網頁。')
      : say('The browser draws what it was given: a page that says the page was not found.', '瀏覽器把拿到的東西畫出來：一個寫著「找不到這一頁」的頁面。'));
  }
  function goto(n) { state.stage = n; state.wait = DUR; if (n >= t.reach) state.playing = false; if (view) view.move(n); tell(); root.classList.remove('al-fresh'); show(); }
  function go(key, auto = true) { if (key) state.key = key; t = trace(LAB_URLS[state.key]); state.playing = auto; goto(0); }
  function next() { if (state.stage < 0 || state.stage >= t.reach) go(null, false); else { state.playing = false; goto(state.stage + 1); } }
  function jump(n) { state.playing = false; goto(Math.min(n, t.reach)); }
  function pick(key) { state.key = key; t = trace(LAB_URLS[key]); state.stage = -1; state.playing = false; if (view) view.move(-1); show(); intro(); }
  function reset() { pick('home'); }
  const intro = () => say('Choose an address, then press Go. Follow the glowing dot: first to the address book, then to the server, and back to your screen.', '選一個網址，然後按「前往」。跟著光點走：先到地址簿，再到伺服器，最後回到你的螢幕。');

  R.urls.forEach((b) => b.addEventListener('click', () => go(b.getAttribute('data-url'))));
  R.play.addEventListener('click', () => { if (state.playing) { state.playing = false; show(); } else if (state.stage >= 0 && state.stage < t.reach) { state.playing = true; state.wait = 0.4; show(); } else go(null); });
  R.step.addEventListener('click', () => next());
  R.rows.forEach((r) => r.addEventListener('click', () => { if (state.stage < 0) t = trace(LAB_URLS[state.key]); jump(Number(r.getAttribute('data-st'))); }));
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
    // 筆電（用戶端）
    box(mat(0xaab4c8, { roughness: 0.5 }), 2.6, 0.12, 1.7, -5, 0.06, 1.3);
    const lid = box(mat(0x8a93a6, { roughness: 0.5 }), 2.6, 1.8, 0.1, -5, 1.0, 0.42); lid.rotation.x = -0.16;
    const scrM = mat(0x0c1424, { emissive: 0xeaf6ff, emissiveIntensity: 0, roughness: 0.3 });
    const scr = box(scrM, 2.3, 1.5, 0.02, -5, 1.02, 0.49); scr.rotation.x = -0.16;
    // DNS：一本立著的地址簿
    const dnsM = mat(0x8a5a2a, { emissive: 0xffd36e, emissiveIntensity: 0 });
    box(dnsM, 1.9, 2.3, 0.6, 0, 1.15, -2.8); box(mat(0xf4ecd8), 1.7, 2.1, 0.5, 0.08, 1.15, -2.74);
    for (let i = 0; i < 5; i++) box(mat([0xd4574a, 0xffb04a, 0x7ee0aa, 0x4f9dff, 0xc7a6ff][i]), 0.16, 0.3, 0.52, 1.02, 2.0 - i * 0.42, -2.74);
    // 伺服器
    const srvM = mat(0x2a3550, { emissive: 0x4f9dff, emissiveIntensity: 0, metalness: 0.3 });
    box(srvM, 1.5, 3.0, 1.5, 5, 1.5, 0.9);
    const leds = []; for (let i = 0; i < 6; i++) { const m = mat(0x1a2030, { emissive: 0x38c778, emissiveIntensity: 0.3 }); box(m, 1.1, 0.07, 0.04, 5, 0.5 + i * 0.44, 1.67); leds.push(m); }
    // 線與中繼站
    const wire = mat(0x56627e, { roughness: 0.5 }), nodeM = mat(0x7ef0e3, { emissive: 0x7ef0e3, emissiveIntensity: 0.35 });
    const line = (a, b, n) => { const d = b.clone().sub(a), len = d.length(); const m = new Mesh(new BoxGeometry(0.06, 0.06, len), wire); m.position.copy(a).add(b).multiplyScalar(0.5); m.lookAt(b); scene.add(m); for (let i = 1; i <= n; i++) { const s = new Mesh(new SphereGeometry(0.13, 14, 10), nodeM); s.position.copy(a).lerp(b, i / (n + 1)); scene.add(s); } };
    line(V(-3.7, 0.08, 1.3), V(4.2, 0.08, 0.9), 3); line(V(-4.2, 0.08, 0.5), V(-0.6, 0.08, -2.6), 1);

    const glow = canvasTex((g, w, h) => { const r = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2); r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(0.35, 'rgba(255,255,255,.45)'); r.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = r; g.fillRect(0, 0, w, h); }, 128, 128);
    const ball = new Sprite(new SpriteMaterial({ map: glow, color: 0xffd36e, blending: AdditiveBlending, depthWrite: false, depthTest: false, transparent: true, opacity: 0 })); ball.scale.setScalar(0.9); scene.add(ball);
    const fly = { t: 1, from: V(0, 0, 0), to: V(0, 0, 0), on: false };
    const api = { move(n) { if (n < 0) { fly.on = false; return; } const [a, b] = LEGS[n]; fly.from.copy(a); fly.to.copy(b); fly.t = a === b ? 1 : 0; fly.on = true; if (a === b) ball.position.copy(a); } };

    const lab = labeler($('.al-labels'), cv, camera);
    const lbT = [lab.add('cp-lb cp-lb-end', 'your computer: the client<small>你的電腦：用戶端</small>'), lab.add('cp-lb cp-lb-end', 'DNS: the address book<small>DNS：地址簿</small>'), lab.add('cp-lb cp-lb-end', 'the server<small>伺服器</small>')];
    const lbV = lab.add('cp-lb cp-lb-val', ''), lbP = lab.add('cp-lb cp-lb-page', '');
    let pageKey = '';
    function tick(dt) {
      const s = state.stage, e = Math.min(1, dt * 8);
      dnsM.emissiveIntensity += ((s === 1 || s === 2 ? 0.5 : 0) - dnsM.emissiveIntensity) * e;
      srvM.emissiveIntensity += ((s === 3 || s === 4 ? 0.7 : 0) - srvM.emissiveIntensity) * e;
      leds.forEach((m, i) => { m.emissiveIntensity = s === 3 || s === 4 ? 0.5 + 0.5 * Math.abs(Math.sin(performance.now() / 160 + i)) : 0.3; });
      const drawn = (s === 5) || (s === 2 && !t.ip);
      scrM.emissiveIntensity += ((drawn ? 0.9 : s >= 0 ? 0.12 : 0) - scrM.emissiveIntensity) * e;
      if (fly.on) {
        if (fly.t < 1) { fly.t = Math.min(1, fly.t + dt / 1.3); const k = MathUtils.smootherstep(fly.t, 0, 1); ball.position.lerpVectors(fly.from, fly.to, k); ball.position.y += Math.sin(Math.PI * k) * 1.1; }
        ball.material.opacity += ((s === 5 ? 0 : 1) - ball.material.opacity) * e;
      } else ball.material.opacity += (0 - ball.material.opacity) * e;
      if (flyC.t < 1) { flyC.t = Math.min(1, flyC.t + dt / 1.0); const q = MathUtils.smootherstep(flyC.t, 0, 1); camera.position.lerpVectors(flyC.p0, flyC.p1, q); controls.target.lerpVectors(flyC.t0, flyC.t1, q); }
    }
    function fit(w, h) { const vf = MathUtils.degToRad(camera.fov / 2), hf = Math.atan(Math.tan(vf) * camera.aspect); return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf)); }
    const flyC = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
    function goHome(instant) {
      const tg = V(0, 1.5, -0.4), p = V(0.0, 0.42, 1).normalize().multiplyScalar(fit(15.0, 6.4)).add(tg);
      if (instant) { camera.position.copy(p); controls.target.copy(tg); flyC.t = 1; return; }
      flyC.p0.copy(camera.position); flyC.t0.copy(controls.target); flyC.p1.copy(p); flyC.t1.copy(tg); flyC.t = 0;
    }
    const tmp = V(0, 0, 0);
    function labels() {
      const on = state.labels, s = state.stage, v = values();
      lbT.forEach((l) => { l.hidden = !on; });
      if (on) { lab.place(lbT[0], tmp.set(-5, 2.7, 0.4)); lab.place(lbT[1], tmp.set(0, 2.75, -2.8)); lab.place(lbT[2], tmp.set(5, 3.4, 0.9)); lbT[0].classList.toggle('is-on', s === 0 || s === 5); lbT[1].classList.toggle('is-on', s === 1 || s === 2); lbT[2].classList.toggle('is-on', s === 3 || s === 4); }
      const carry = s >= 1 && s <= 4 && fly.on;
      lbV.hidden = !carry; if (carry) { lbV.textContent = s === 4 ? `${v[4]} + text 文字` : v[s]; lab.place(lbV, tmp.copy(ball.position), -30); }
      const drawn = (s === 5) || (s === 2 && !t.ip && fly.t >= 1);
      lbP.hidden = !drawn;
      if (drawn) {
        const key = `${state.key}:${s}`;
        if (key !== pageKey) { pageKey = key; if (t.html) renderMini(lbP, parseMini(t.html)); else renderMini(lbP, [{ tag: 'h1', color: null, text: 'Cannot find this site' }, { tag: 'p', color: null, text: '找不到這個網站' }]); }
        lab.place(lbP, tmp.set(-5, 1.02, 0.5));
      }
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
    return { ...api, camera, controls, scene, tick, render, goHome };
  }
  view = make3D();
  if (!view) root.classList.add('al-nogl');

  const DEMO = Object.fromEntries(Object.keys(LAB_URLS).map((k) => [k, () => go(k)]));
  function step(dt) {
    if (state.playing && state.stage >= 0 && state.stage < t.reach) { state.wait -= dt; if (state.wait <= 0) goto(state.stage + 1); }
    if (view) view.tick(dt);
  }
  let raf = 0, last = 0, visible = false;
  function frame(ts) { raf = 0; if (!visible) return; const dt = Math.min(0.05, (ts - (last || ts)) / 1000); last = ts; step(dt); if (view) view.render(); raf = requestAnimationFrame(frame); }
  new IntersectionObserver((ents) => { visible = ents[0].isIntersecting; if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); } }, { rootMargin: '120px' }).observe(root);

  show(); intro();
  root.classList.add('al-ready', 'al-fresh');

  root.__lab = {
    state, view, go, next, jump, pick, reset, cur: () => t,
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => view && view.goHome(true),
    run: (sec) => { for (let x = 0; x < sec; x += 0.02) step(0.02); },
    render: () => { step(0); if (view) view.render(); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  const h = document.querySelector('[data-cp-html]'); if (h) initHtml(h);
  const u = document.querySelector('[data-cp-urlparts]'); if (u) initUrlParts(u);
  document.querySelectorAll('[data-cp-choice]').forEach((el) => initChoice(el));
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-compweb-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
