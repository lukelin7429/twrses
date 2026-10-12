/*
 * 音樂 Music · 第三課的兩個小互動（不需要 WebGL）。HTML 由 build.py 產生，這裡綁行為。
 *
 *   initTap(el)    [data-mu-tap]    跟著拍：先數四拍預備，再跟著節拍器敲十六下（滑鼠、手指、空白鍵）；畫出每一下的誤差（毫秒）、算平均
 *   initMeter(el)  [data-mu-meter]  這是幾拍子？：聽三個小節的強弱循環，選二、三、四拍；六題，記第一次就答對的題數
 *   除錯：el.__tap（metro、tap()、results()）、el.__meter（round()、answer(n)、play()）
 */
import { getSynth, watchOffscreen } from './engine.js';
import { METERS, beatSeconds, makeMeterRounds, nearestBeat, tapStats } from './beat.js';
import { createMetronome } from './metro.js';
import { mulberry32 } from './pitch.js';

const seed = () => (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;
const COUNT_IN = 4, TAPS = 16;

export function initTap(root) {
  const synth = getSynth();
  const R = { start: root.querySelector('.mu-tp-start'), drum: root.querySelector('.mu-tp-drum'), cv: root.querySelector('.mu-tp-cv'),
    msg: root.querySelector('.mu-tp-msg'), dots: [...root.querySelectorAll('.mu-tp-dots i')], count: root.querySelector('.mu-tp-count'),
    mean: root.querySelector('.mu-tp-mean'), mae: root.querySelector('.mu-tp-mae'), within: root.querySelector('.mu-tp-within'),
    flash: root.querySelector('[data-t="flash"]') };
  let bpm = 90, metro = null, t0 = 0, taps = new Map(), running = false, finishTimer = 0;
  const iv = () => beatSeconds(bpm);

  function draw() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2), w = R.cv.clientWidth || 300, h = R.cv.clientHeight || 140;
    if (R.cv.width !== w * dpr) { R.cv.width = w * dpr; R.cv.height = h * dpr; }
    const g = R.cv.getContext('2d'); g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, w, h);
    const range = Math.min(250, iv() * 500);          // 畫面上下各半拍，最多 ±250 ms
    const Y = (ms) => h / 2 - (ms / range) * (h / 2 - 8);
    g.fillStyle = 'rgba(47,158,99,.14)'; g.fillRect(0, Y(50), w, Y(-50) - Y(50));
    g.strokeStyle = 'rgba(0,0,0,.25)'; g.beginPath(); g.moveTo(0, Y(0)); g.lineTo(w, Y(0)); g.stroke();
    g.fillStyle = '#6a6a6a'; g.font = '11px sans-serif'; g.fillText('late · 晚', 4, 12); g.fillText('early · 早', 4, h - 4);
    for (let i = 0; i < TAPS; i++) {
      const x = 40 + (i / (TAPS - 1)) * (w - 56), e = taps.get(COUNT_IN + i);
      g.fillStyle = 'rgba(0,0,0,.18)'; g.fillRect(x - 0.5, h - 10, 1, 6);
      if (e === undefined) continue;
      const ms = e * 1000;
      g.fillStyle = Math.abs(ms) <= 50 ? '#2f9e63' : '#d6527f';
      g.beginPath(); g.arc(x, Y(Math.max(-range, Math.min(range, ms))), 5.5, 0, Math.PI * 2); g.fill();
    }
  }
  function results() {
    const errs = [...taps.entries()].filter(([i]) => i >= COUNT_IN && i < COUNT_IN + TAPS).map(([, e]) => e * 1000);
    return { errs, ...tapStats(errs, 50) };
  }
  function show() {
    const r = results();
    R.mean.textContent = r.n ? `${r.mean > 0 ? '+' : r.mean < 0 ? '−' : ''}${Math.abs(r.mean).toFixed(0)} ms` : '—';
    R.mae.textContent = r.n ? `${r.mae.toFixed(0)} ms` : '—';
    R.within.textContent = r.n ? `${r.within} / ${r.n}` : '—';
    draw();
  }
  function finish() {
    running = false; metro.stop(); R.start.disabled = false; R.start.textContent = '▶ Play again · 再玩一次';
    root.classList.remove('is-running');
    const r = results();
    if (!r.n) { R.msg.innerHTML = 'No taps were counted. Tap the drum along with the clicks.<span class="zh">沒有記到敲擊。跟著喀喀聲敲鼓面。</span>'; return; }
    const dir = r.mean < -3 ? ['early', '早'] : r.mean > 3 ? ['late', '晚'] : null;
    R.msg.innerHTML = `${r.within} of ${r.n} taps were within 50 ms of the beat. On average you were ${dir ? `${Math.abs(r.mean).toFixed(0)} ms ${dir[0]}` : 'right on the beat'}. This is measured on your own device, and the delay of your speaker and screen is not corrected.` +
      `<span class="zh">${r.n} 下裡有 ${r.within} 下和拍子相差在 50 毫秒以內。平均${dir ? `${dir[1]}了 ${Math.abs(r.mean).toFixed(0)} 毫秒` : '剛好落在拍子上'}。這是在你自己的裝置上量的，喇叭與螢幕的延遲沒有校正。</span>`;
  }
  function onBeat(b) {
    const k = b.index;
    setTimeout(() => {
      if (!running) return;
      R.dots.forEach((d, i) => d.classList.toggle('is-on', i === b.beat - 1 && (!R.flash || R.flash.checked)));
      R.dots.forEach((d, i) => d.classList.toggle('is-strong', i === 0));
      const inCount = k < COUNT_IN;
      R.count.textContent = inCount ? `${k + 1}` : `${k - COUNT_IN + 1} / ${TAPS}`;
      root.classList.toggle('is-counting', inCount);
    }, Math.max(0, (b.time - metro.now()) * 1000));
    if (k === COUNT_IN + TAPS) { clearTimeout(finishTimer); finishTimer = setTimeout(finish, Math.max(0, (b.time - metro.now()) * 1000) + 150); }
  }
  function tap() {
    if (!running) return;
    const t = metro.now();
    const r = nearestBeat(t, metro.state.t0, iv());
    root.classList.add('is-hit'); setTimeout(() => root.classList.remove('is-hit'), 90);
    if (r.index < COUNT_IN || r.index >= COUNT_IN + TAPS || taps.has(r.index)) return;
    taps.set(r.index, r.err);
    show();
  }
  function start() {
    synth.unlock();
    synth.stopAll();
    taps = new Map(); running = true;
    R.start.disabled = true; R.start.textContent = 'Listen, then tap · 先聽，再敲';
    root.classList.add('is-running');
    R.msg.innerHTML = 'Count four beats, then tap along on the drum.<span class="zh">先數四拍，再跟著敲鼓面。</span>';
    if (!metro) metro = createMetronome(synth, { onBeat });
    t0 = metro.start({ bpm, meter: 4 });   // 時間軸若中途換了，metro.state.t0 會跟著更新
    show();
  }
  root.querySelectorAll('[data-tbpm]').forEach((b) => b.addEventListener('click', () => {
    bpm = Number(b.getAttribute('data-tbpm'));
    root.querySelectorAll('[data-tbpm]').forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
    if (running) { running = false; if (metro) metro.stop(); R.start.disabled = false; R.start.textContent = '▶ Start · 開始'; }
    taps = new Map(); show();
  }));
  R.start.addEventListener('click', start);
  R.drum.addEventListener('pointerdown', (e) => { e.preventDefault(); tap(); });
  R.drum.addEventListener('keydown', (e) => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); tap(); } });
  window.addEventListener('resize', draw);
  watchOffscreen(root);
  const off = new IntersectionObserver((ents) => { if (!ents[0].isIntersecting && running) { running = false; metro.stop(); R.start.disabled = false; R.start.textContent = '▶ Start · 開始'; } }, { threshold: 0.05 });
  off.observe(root);
  show();
  root.__tap = { get metro() { return metro; }, tap, results, start, setBpm: (b) => { bpm = b; }, t0: () => t0 };
}

export function initMeter(root) {
  const synth = getSynth();
  const R = { k: root.querySelector('.mu-mt-k'), score: root.querySelector('.mu-mt-score'), msg: root.querySelector('.mu-mt-msg'), play: root.querySelector('.mu-mt-play'),
    opts: [...root.querySelectorAll('[data-pick]')], next: root.querySelector('.mu-mt-next'), desc: root.querySelector('.mu-mt-desc'), nosound: root.querySelector('.mu-mt-nosound'),
    dots: [...root.querySelectorAll('.mu-mt-dots i')] };
  let rounds = makeMeterRounds(mulberry32(seed()), 6), q = 0, first = 0, tried = false, done = false, metro = null, stopTimer = 0;
  const BPM = 100;

  function stop() { clearTimeout(stopTimer); if (metro) metro.stop(); R.dots.forEach((d) => d.classList.remove('is-on')); }
  function play() {
    stop();
    if (!synth.state.supported) return;
    if (!synth.state.unlocked && !synth.unlock()) return;
    const m = rounds[q];
    if (!metro) metro = createMetronome(synth, { onBeat: (b) => { setTimeout(() => { R.dots.forEach((d, i) => d.classList.toggle('is-on', i === b.index % 4 && b.index < 3 * m)); }, Math.max(0, (b.time - metro.now()) * 1000)); } });
    metro.start({ bpm: BPM, meter: m });
    stopTimer = setTimeout(stop, (3 * m * beatSeconds(BPM) + 0.5) * 1000);
  }
  function ask() {
    tried = false; done = false;
    R.k.innerHTML = `Question ${q + 1} of ${rounds.length} · 第 ${q + 1} 題（共 ${rounds.length} 題）`;
    R.opts.forEach((b) => { b.className = 'mu-mt-opt'; b.disabled = false; });
    R.next.hidden = true;
    const ns = !synth.state.supported;
    R.nosound.hidden = !ns; R.desc.hidden = !ns;
    R.desc.innerHTML = `The pattern in each bar: ${METERS[rounds[q]].pattern.map((l) => (l === 2 ? 'STRONG' : l === 1 ? 'medium' : 'weak')).join(', ')}.<span class="zh">每一小節的強弱：${METERS[rounds[q]].pattern.map((l) => (l === 2 ? '強' : l === 1 ? '次強' : '弱')).join('、')}。</span>`;
    R.msg.innerHTML = 'Press play. Listen for the strong beat that comes back, and count the beats between.<span class="zh">按播放。聽那個一直回來的強拍，數兩個強拍之間有幾拍。</span>';
  }
  function answer(n) {
    if (done) return;
    const b = R.opts.find((x) => Number(x.getAttribute('data-pick')) === n);
    if (n === rounds[q]) {
      done = true; if (!tried) first++;
      b.classList.add('is-right'); R.opts.forEach((x) => { x.disabled = true; });
      R.msg.innerHTML = `Yes: ${METERS[n].en.toLowerCase()}.<span class="zh">答對了：${METERS[n].zh}。</span>`;
      R.score.textContent = `${first} / ${q + 1}`;
      R.next.hidden = false; R.next.textContent = q + 1 < rounds.length ? 'Next question · 下一題' : 'See my score · 看成績';
      stop();
    } else {
      tried = true; b.classList.add('is-wrong'); b.disabled = true;
      R.msg.innerHTML = 'Not that one. Play it again and count from one strong beat to the next.<span class="zh">不是這個。再播一次，從一個強拍數到下一個強拍。</span>';
    }
  }
  R.opts.forEach((b) => b.addEventListener('click', () => answer(Number(b.getAttribute('data-pick')))));
  R.play.addEventListener('click', play);
  R.next.addEventListener('click', () => {
    if (R.next.dataset.again) { delete R.next.dataset.again; rounds = makeMeterRounds(mulberry32(seed()), 6); q = 0; first = 0; R.score.textContent = '0 / 0'; ask(); play(); return; }
    q++;
    if (q >= rounds.length) {
      R.k.innerHTML = 'Finished · 完成';
      R.msg.innerHTML = `You got ${first} of ${rounds.length} right on the first try.<span class="zh">你第一次就答對 ${first} 題（共 ${rounds.length} 題）。</span>`;
      R.opts.forEach((x) => { x.disabled = true; });
      R.next.textContent = 'Play again · 再玩一次'; R.next.dataset.again = '1';
      return;
    }
    ask(); play();
  });
  synth.subscribe(() => { const ns = !synth.state.supported; R.nosound.hidden = !ns; R.desc.hidden = !ns || done; });
  watchOffscreen(root);
  ask();
  root.__meter = { round: () => rounds[q], answer, score: () => ({ first, q }), play, get metro() { return metro; } };
}
