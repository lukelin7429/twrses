/*
 * 音樂 Music · 第二課的三個小互動（不需要 WebGL）。HTML 由 build.py 產生，這裡綁行為。
 *
 *   initMix(el)    [data-mu-mix]   八根滑桿＝第 1…8 諧波的振幅；即時畫出波形、發聲；四個配方按鈕
 *   initEnv(el)    [data-mu-env]   起音（attack）、衰減（decay）、維持（sustain）三根滑桿＋包絡曲線；「敲擊／拉奏」兩個預設
 *   initWhich(el)  [data-mu-which] 聽一個音，選出它的波形（六題，記第一次就答對的題數；沒有聲音時改讀文字說明）
 *   除錯：el.__mix（amps()、play()、set(amps)）、el.__env（params()、play()）、el.__which（round()、answer(key)）
 */
import { getSynth, watchOffscreen } from './engine.js';
import { midiToFreq } from './pitch.js';
import { ENVELOPES, K, RECIPES, envelopeAt, makeWhichRounds, normalizePeak, waveAt } from './timbre.js';
import { mulberry32 } from './pitch.js';

const F0 = midiToFreq(60);   // C4
const seed = () => (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;
const fmt = (f) => (f >= 1000 ? f.toFixed(1) : f.toFixed(2));

/** 在 canvas 上畫兩個週期的波形（amps 已不必正規化，這裡自己縮到畫面高度） */
export function drawWave(cv, amps, { color = '#0d6b5c', bg = '#fff', periods = 2 } = {}) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = cv.clientWidth || 300, h = cv.clientHeight || 100;
  if (cv.width !== w * dpr || cv.height !== h * dpr) { cv.width = w * dpr; cv.height = h * dpr; }
  const g = cv.getContext('2d');
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  g.clearRect(0, 0, w, h);
  if (bg) { g.fillStyle = bg; g.fillRect(0, 0, w, h); }
  g.strokeStyle = 'rgba(0,0,0,.12)'; g.lineWidth = 1;
  g.beginPath(); g.moveTo(0, h / 2); g.lineTo(w, h / 2); g.stroke();
  const n = normalizePeak(amps);
  g.strokeStyle = color; g.lineWidth = 2.5; g.lineJoin = 'round';
  g.beginPath();
  const N = Math.max(120, Math.floor(w));
  for (let i = 0; i <= N; i++) {
    const y = h / 2 - waveAt(n, (i / N) * periods) * (h / 2 - 8);
    if (i) g.lineTo((i / N) * w, y); else g.moveTo(0, y);
  }
  g.stroke();
}

function drawEnv(cv, e, total) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = cv.clientWidth || 300, h = cv.clientHeight || 100;
  if (cv.width !== w * dpr || cv.height !== h * dpr) { cv.width = w * dpr; cv.height = h * dpr; }
  const g = cv.getContext('2d');
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  g.fillStyle = '#fff'; g.fillRect(0, 0, w, h);
  g.strokeStyle = 'rgba(0,0,0,.12)'; g.beginPath(); g.moveTo(0, h - 10); g.lineTo(w, h - 10); g.stroke();
  g.fillStyle = 'rgba(13,107,92,.16)'; g.strokeStyle = '#0d6b5c'; g.lineWidth = 2.5;
  g.beginPath(); g.moveTo(0, h - 10);
  const N = 200;
  for (let i = 0; i <= N; i++) { const t = (i / N) * total; g.lineTo((i / N) * w, h - 10 - envelopeAt(t, e) * (h - 24)); }
  g.stroke(); g.lineTo(w, h - 10); g.closePath(); g.fill();
}

export function initMix(root) {
  const synth = getSynth();
  const sl = [...root.querySelectorAll('.mu-mx-sl')];
  const cv = root.querySelector('.mu-mx-cv'), msg = root.querySelector('.mu-mx-msg');
  const amps = () => sl.map((s) => Number(s.value) / 100);
  let timer = 0;
  function show() {
    const a = amps();
    sl.forEach((s, i) => { const o = root.querySelector(`[data-out="${i + 1}"]`); if (o) o.textContent = `${Math.round(a[i] * 100)}%`; });
    drawWave(cv, a);
    const on = a.map((v, i) => (v > 0.005 ? i + 1 : 0)).filter(Boolean);
    msg.innerHTML = on.length
      ? `Harmonics in the mix: ${on.join(', ')}. The shape repeats ${fmt(F0)} times per second.<span class="zh">現在混了第 ${on.join('、')} 諧波；這個形狀每秒重複 ${fmt(F0)} 次。</span>`
      : 'Move a slider up to add a harmonic.<span class="zh">把滑桿往上推，加入一個諧波。</span>';
  }
  function play() {
    const a = amps();
    if (!a.some((v) => v > 0.005)) return;
    synth.unlock();
    synth.stopAll();
    synth.toneComplex(F0, normalizePeak(a), { env: { attack: 0.02, decay: 1, sustain: 0.9 }, dur: 1.4, gain: 0.8 });
  }
  function set(a) { sl.forEach((s, i) => { s.value = String(Math.round((a[i] || 0) * 100)); }); show(); }
  sl.forEach((s) => {
    s.addEventListener('input', () => { root.querySelectorAll('[data-recipe]').forEach((x) => x.setAttribute('aria-pressed', 'false')); show(); });
    s.addEventListener('change', () => { clearTimeout(timer); timer = setTimeout(play, 60); });
  });
  root.querySelectorAll('[data-recipe]').forEach((b) => b.addEventListener('click', () => {
    set(RECIPES[b.getAttribute('data-recipe')].amps);
    root.querySelectorAll('[data-recipe]').forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
    play();
  }));
  root.querySelector('.mu-mx-play').addEventListener('click', play);
  window.addEventListener('resize', show);
  watchOffscreen(root);
  set(RECIPES.pure.amps);
  void K;
  root.__mix = { amps, play, set };
}

export function initEnv(root) {
  const synth = getSynth();
  const R = { a: root.querySelector('.mu-ev-a'), d: root.querySelector('.mu-ev-d'), s: root.querySelector('.mu-ev-s'), cv: root.querySelector('.mu-ev-cv'), msg: root.querySelector('.mu-ev-msg') };
  const TOTAL = 3;
  // 滑桿 0–100 ↔ 秒（對數）：attack 0.003–1.0 s、decay 0.05–2.5 s
  const toA = (v) => 0.003 * (1 / 0.003) ** (v / 100);
  const toD = (v) => 0.05 * (2.5 / 0.05) ** (v / 100);
  const params = () => ({ attack: toA(Number(R.a.value)), decay: toD(Number(R.d.value)), sustain: Number(R.s.value) / 100 });
  const fromA = (a) => (Math.log(a / 0.003) / Math.log(1 / 0.003)) * 100;
  const fromD = (d) => (Math.log(d / 0.05) / Math.log(2.5 / 0.05)) * 100;
  function show() {
    const p = params();
    root.querySelector('.mu-ev-ao').textContent = `${Math.round(p.attack * 1000)} ms`;
    root.querySelector('.mu-ev-do').textContent = `${p.decay.toFixed(2)} s`;
    root.querySelector('.mu-ev-so').textContent = `${Math.round(p.sustain * 100)}%`;
    drawEnv(R.cv, p, TOTAL);
  }
  function play() {
    const p = params();
    synth.unlock(); synth.stopAll();
    synth.toneComplex(F0, normalizePeak(RECIPES.all.amps), { env: p, dur: TOTAL * 0.7, gain: 0.8 });
  }
  root.querySelectorAll('[data-env]').forEach((b) => b.addEventListener('click', () => {
    const e = ENVELOPES[b.getAttribute('data-env')];
    R.a.value = String(Math.round(fromA(e.attack))); R.d.value = String(Math.round(fromD(e.decay))); R.s.value = String(Math.round(e.sustain * 100));
    root.querySelectorAll('[data-env]').forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
    show(); play();
  }));
  [R.a, R.d, R.s].forEach((s) => { s.addEventListener('input', show); s.addEventListener('change', play); });
  root.querySelector('.mu-ev-play').addEventListener('click', play);
  window.addEventListener('resize', show);
  watchOffscreen(root);
  R.a.value = String(Math.round(fromA(ENVELOPES.struck.attack))); R.d.value = String(Math.round(fromD(ENVELOPES.struck.decay))); R.s.value = '0';
  show();
  root.__env = { params, play };
}

export function initWhich(root) {
  const synth = getSynth();
  const R = { k: root.querySelector('.mu-wh-k'), score: root.querySelector('.mu-wh-score'), msg: root.querySelector('.mu-wh-msg'), opts: [...root.querySelectorAll('[data-pick]')],
    play: root.querySelector('.mu-wh-play'), next: root.querySelector('.mu-wh-next'), desc: root.querySelector('.mu-wh-desc'), nosound: root.querySelector('.mu-wh-nosound') };
  let rounds, q = 0, first = 0, tried = false, done = false;
  R.opts.forEach((b) => drawWave(b.querySelector('canvas'), RECIPES[b.getAttribute('data-pick')].amps, { color: '#0d6b5c', bg: null }));
  const key = () => rounds[q];
  function play() {
    if (!synth.state.supported) return;
    if (!synth.state.unlocked && !synth.unlock()) return;
    synth.stopAll();
    synth.toneComplex(F0, normalizePeak(RECIPES[key()].amps), { env: { attack: 0.02, decay: 1, sustain: 0.9 }, dur: 1.3, gain: 0.8 });
  }
  function ask() {
    tried = false; done = false;
    R.k.innerHTML = `Question ${q + 1} of ${rounds.length} · 第 ${q + 1} 題（共 ${rounds.length} 題）`;
    R.opts.forEach((b) => { b.className = 'mu-wh-opt'; b.disabled = false; });
    R.next.hidden = true;
    const noSound = !synth.state.supported;
    R.nosound.hidden = !noSound;
    R.desc.hidden = !noSound;
    const r = RECIPES[key()];
    R.desc.innerHTML = `This note has: ${r.en.toLowerCase()}.<span class="zh">這個音：${r.zh}。</span>`;
    R.msg.innerHTML = 'Press play, listen, then pick the shape that matches.<span class="zh">按播放、聽一聽，再選出對得上的波形。</span>';
  }
  function answer(k) {
    if (done) return;
    const b = R.opts.find((x) => x.getAttribute('data-pick') === k);
    if (k === key()) {
      done = true; if (!tried) first++;
      b.classList.add('is-right'); R.opts.forEach((x) => { x.disabled = true; });
      const r = RECIPES[k];
      R.msg.innerHTML = `Yes: ${r.en.toLowerCase()}.<span class="zh">答對了：${r.zh}。</span>`;
      R.score.textContent = `${first} / ${q + 1}`;
      R.next.hidden = false; R.next.textContent = q + 1 < rounds.length ? 'Next question · 下一題' : 'See my score · 看成績';
    } else {
      tried = true; b.classList.add('is-wrong'); b.disabled = true;
      R.msg.innerHTML = 'Not that one. Play it again and compare the shapes.<span class="zh">不是這個。再播一次，比較一下形狀。</span>';
    }
  }
  R.opts.forEach((b) => b.addEventListener('click', () => answer(b.getAttribute('data-pick'))));
  R.play.addEventListener('click', play);
  R.next.addEventListener('click', () => {
    if (R.next.dataset.again) { delete R.next.dataset.again; rounds = makeWhichRounds(mulberry32(seed()), 6); q = 0; first = 0; R.score.textContent = '0 / 0'; ask(); play(); return; }
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
  window.addEventListener('resize', () => R.opts.forEach((b) => drawWave(b.querySelector('canvas'), RECIPES[b.getAttribute('data-pick')].amps, { bg: null })));
  synth.subscribe(() => { if (rounds) { const ns = !synth.state.supported; R.nosound.hidden = !ns; R.desc.hidden = !ns || done; } });
  watchOffscreen(root);
  rounds = makeWhichRounds(mulberry32(seed()), 6);
  ask();
  root.__which = { round: () => key(), answer, score: () => ({ first, q }), play };
}
