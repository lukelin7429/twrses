/*
 * 音樂 Music · 可以彈的鍵盤（不需要 WebGL）。HTML 由 build.py 產生，這裡綁行為。
 *
 *   initKeys(el)   [data-mu-keys]：一個八度加一個高音 C（13 個鍵）；← → 換八度（C2–C7）
 *                  按鍵時顯示音名、唱名、頻率，以及「低一個八度」「高一個八度」的頻率：發現高八度＝頻率兩倍
 *                  電腦鍵盤：a w s e d f t g y h u j k（一排鋼琴鍵）
 *   除錯：el.__keys.press(midi)、.octave()、.last()
 */
import { getSynth, watchOffscreen } from './engine.js';
import { midiToFreq, noteInfo } from './pitch.js';

const fmt = (f) => (f >= 1000 ? f.toFixed(1) : f.toFixed(2));
const KEYMAP = { a: 0, w: 1, s: 2, e: 3, d: 4, f: 5, t: 6, g: 7, y: 8, h: 9, u: 10, j: 11, k: 12 };
const OCT_MIN = 2, OCT_MAX = 6;   // 鍵盤最低音是 C2…C6（+ 一個八度）
const LO = 21, HI = 108;          // 88 鍵鋼琴：A0–C8

export function initKeys(root) {
  const synth = getSynth();
  const kb = root.querySelector('.mu-kb');
  const out = { name: root.querySelector('.mu-k-name'), hz: root.querySelector('.mu-k-hz'), msg: root.querySelector('.mu-k-msg'),
    lo: root.querySelector('.mu-k-lo'), hi: root.querySelector('.mu-k-hi'), me: root.querySelector('.mu-k-me'),
    loN: root.querySelector('.mu-k-lo-n'), hiN: root.querySelector('.mu-k-hi-n'), meN: root.querySelector('.mu-k-me-n'),
    oct: root.querySelector('.mu-k-oct'), tab: root.querySelector('.mu-k-tab') };
  let octave = 4, last = null, keys = [], downs = new Map();

  const base = () => 12 * (octave + 1);   // C{octave} 的音號
  function build() {
    kb.innerHTML = '';
    keys = [];
    const whites = [];
    for (let i = 0; i <= 12; i++) {
      const m = base() + i, info = noteInfo(m);
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `mu-key ${info.white ? 'mu-white' : 'mu-black'}`;
      b.dataset.midi = String(m);
      b.setAttribute('aria-label', `${info.name} ${info.solfege}, ${fmt(midiToFreq(m))} Hz`);
      b.innerHTML = info.white ? `<span class="mu-key-n">${info.letter}${info.octave}<small>${info.solfege}</small></span>` : '';
      keys.push({ m, b, info });
      if (info.white) whites.push(keys[keys.length - 1]);
    }
    // 位置：白鍵平均排；黑鍵放在兩個白鍵之間
    const nW = whites.length;
    keys.forEach((k) => {
      if (k.info.white) {
        const idx = whites.indexOf(k);
        k.b.style.left = `${(idx / nW) * 100}%`; k.b.style.width = `${100 / nW}%`;
      } else {
        const idx = whites.findIndex((w) => w.m > k.m) - 0.5;   // 黑鍵在左邊白鍵的右緣
        k.b.style.left = `${((idx + 0.5 - 0.3) / nW) * 100}%`; k.b.style.width = `${(0.6 / nW) * 100}%`;
      }
      kb.appendChild(k.b);
    });
    out.oct.textContent = `C${octave}–C${octave + 1}`;
    root.querySelector('.mu-k-down').disabled = octave <= OCT_MIN;
    root.querySelector('.mu-k-up').disabled = octave >= OCT_MAX;
  }

  function show(m) {
    const info = noteInfo(m), f = midiToFreq(m);
    last = { midi: m, name: info.name, solfege: info.solfege, freq: f };
    keys.forEach((k) => k.b.classList.toggle('is-last', k.m === m));
    out.name.innerHTML = `${info.name} <span>· ${info.solfege}</span>`;
    out.hz.innerHTML = `${fmt(f)} <small>Hz</small>`;
    const lo = m - 12, hi = m + 12;
    const cell = (el, nEl, mm, k) => {
      const ok = mm >= LO && mm <= HI;
      el.innerHTML = ok ? `${fmt(midiToFreq(mm))} <small>Hz</small>` : '—';
      nEl.textContent = ok ? noteInfo(mm).name : '';
      return ok;
    };
    const okLo = cell(out.lo, out.loN, lo), okHi = cell(out.hi, out.hiN, hi);
    out.me.innerHTML = `${fmt(f)} <small>Hz</small>`; out.meN.textContent = info.name;
    out.tab.classList.add('is-on');
    const parts = [];
    if (okLo) parts.push(`${noteInfo(lo).name} = ${fmt(f / 2)} Hz = ${fmt(f)} Hz ÷ 2`);
    if (okHi) parts.push(`${noteInfo(hi).name} = ${fmt(f * 2)} Hz = ${fmt(f)} Hz × 2`);
    out.msg.innerHTML = parts.map((p) => `<span>${p}</span>`).join('') +
      `<span class="zh">同名的音往上走一個八度（12 個半音），頻率就乘 2；往下走一個八度，就除以 2。</span>`;
    return { info, f };
  }

  function press(m) {
    const { f } = show(m);
    synth.unlock();
    const v = synth.tone(f, { type: 'triangle', dur: 1.6 });
    return v;
  }

  function down(m, key, ev) {
    if (downs.has(key)) return;
    const el = keys.find((k) => k.m === m);
    if (el) el.b.classList.add('is-down');
    downs.set(key, { m, v: press(m), t: performance.now() });
    if (ev && ev.cancelable) ev.preventDefault();
  }
  function up(key) {
    const d = downs.get(key);
    if (!d) return;
    downs.delete(key);
    const el = keys.find((k) => k.m === d.m);
    if (el) el.b.classList.remove('is-down');
    if (d.v) { const wait = Math.max(0, 220 - (performance.now() - d.t)); setTimeout(() => d.v.release(), wait); }
  }

  kb.addEventListener('pointerdown', (e) => {
    const b = e.target.closest('.mu-key'); if (!b) return;
    try { b.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    down(Number(b.dataset.midi), `p${e.pointerId}`, e);
  });
  const end = (e) => up(`p${e.pointerId}`);
  kb.addEventListener('pointerup', end);
  kb.addEventListener('pointercancel', end);
  kb.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') { const b = e.target.closest('.mu-key'); if (b && !e.repeat) { down(Number(b.dataset.midi), `k${b.dataset.midi}`, e); } }
  });
  kb.addEventListener('keyup', (e) => {
    if (e.key === ' ' || e.key === 'Enter') { const b = e.target.closest('.mu-key'); if (b) up(`k${b.dataset.midi}`); }
  });

  // 電腦鍵盤：只有鍵盤這一區在畫面上時才接管，而且不搶輸入框
  let visible = false;
  new IntersectionObserver((ents) => { visible = ents[0].isIntersecting; }, { threshold: 0.3 }).observe(root);
  document.addEventListener('keydown', (e) => {
    if (!visible || e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target; if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
    const i = KEYMAP[e.key.toLowerCase()];
    if (i === undefined) return;
    down(base() + i, `c${e.key.toLowerCase()}`, e);
  });
  document.addEventListener('keyup', (e) => { const k = `c${e.key.toLowerCase()}`; if (downs.has(k)) up(k); });

  const shift = (d) => { octave = Math.max(OCT_MIN, Math.min(OCT_MAX, octave + d)); build(); if (last) { const m = last.midi; keys.forEach((k) => k.b.classList.toggle('is-last', k.m === m)); } };
  root.querySelector('.mu-k-down').addEventListener('click', () => shift(-1));
  root.querySelector('.mu-k-up').addEventListener('click', () => shift(1));

  // 「連續彈兩個同名音」：C 和高八度的 C
  const pair = root.querySelector('.mu-k-pair');
  if (pair) pair.addEventListener('click', () => {
    synth.unlock();
    const a = base(), b = base() + 12;
    show(a); press(a);
    setTimeout(() => { show(b); press(b); }, 900);
  });

  watchOffscreen(root);
  build();
  root.__keys = { press: (m) => { press(m); }, octave: () => octave, last: () => last, setOctave: (o) => { octave = o; build(); } };
}
