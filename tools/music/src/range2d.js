/*
 * 音樂 Music · 「人耳聽得到的範圍」滑桿（不需要 WebGL）。
 *
 *   initRange(el)  [data-mu-range]：對數刻度的滑桿（20–20,000 Hz，每一個八度一樣寬）；
 *                  按住「按住聆聽」才發聲，最長 3 秒就自動停；音量再壓低，高頻自動更小聲（pitch.js safeScale）。
 *                  鋼琴範圍（27.5–4186 Hz）、A4 與中央 C 標在刻度上。
 *   除錯：el.__range.freq()、.setFreq(hz)
 */
import { getSynth, watchOffscreen } from './engine.js';
import { freqToSlider, hearingZone, midiToFreq, nearestNote, sliderToFreq } from './pitch.js';

const LO = 20, HI = 20000, MAX_SEC = 3;

export function initRange(root) {
  const synth = getSynth();
  const sl = root.querySelector('.mu-rg-slider'), hold = root.querySelector('.mu-rg-hold');
  const out = { hz: root.querySelector('.mu-rg-hz'), note: root.querySelector('.mu-rg-note'), msg: root.querySelector('.mu-rg-msg') };
  const marks = root.querySelector('.mu-rg-marks');
  let f = 440, voice = null, timer = 0;

  const fmt = (x) => (x >= 1000 ? Math.round(x).toLocaleString('en-US') : x >= 100 ? x.toFixed(0) : x.toFixed(1));
  function show() {
    out.hz.innerHTML = `${fmt(f)} <small>Hz</small>`;
    const piano = f >= midiToFreq(21) * 0.97 && f <= midiToFreq(108) * 1.03;
    const n = nearestNote(f);
    out.note.innerHTML = piano ? `Closest piano key: ${n.name} (${n.solfege})<span class="zh">最接近的鋼琴鍵：${n.name}（${n.solfege}）</span>`
      : `Outside the piano's range<span class="zh">超出鋼琴的音域</span>`;
    const z = hearingZone(f);
    root.dataset.zone = z;
  }
  function setFreq(x) {
    f = Math.min(HI, Math.max(LO, x));
    sl.value = String(Math.round(freqToSlider(f, LO, HI) * 1000));
    if (voice) voice.setFreq(f);
    show();
  }
  function stop() {
    clearTimeout(timer);
    if (voice) { voice.release(); voice = null; }
    root.classList.remove('is-playing');
    hold.setAttribute('aria-pressed', 'false');
  }
  function start() {
    if (voice) return;
    if (!synth.state.supported) {
      out.msg.innerHTML = 'This browser cannot make sound, so there is nothing to hear. The numbers still change.<span class="zh">這個瀏覽器無法發聲，所以聽不到；數字照樣會變。</span>';
      return;
    }
    if (!synth.state.unlocked && !synth.unlock()) return;
    voice = synth.hold(f, { type: 'sine', gain: 0.6 });
    hold.setAttribute('aria-pressed', 'true');
    root.classList.add('is-playing');
    clearTimeout(timer);
    timer = setTimeout(stop, MAX_SEC * 1000);
  }

  sl.addEventListener('input', () => setFreq(sliderToFreq(Number(sl.value) / 1000, LO, HI)));
  hold.addEventListener('pointerdown', (e) => { e.preventDefault(); try { hold.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ } start(); });
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((n) => hold.addEventListener(n, stop));
  hold.addEventListener('keydown', (e) => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); voice ? stop() : start(); } });
  root.querySelectorAll('[data-hz]').forEach((b) => b.addEventListener('click', () => setFreq(Number(b.dataset.hz))));

  // 刻度上的記號
  if (marks) {
    const at = (x) => `${freqToSlider(x, LO, HI) * 100}%`;
    const piano = marks.querySelector('.mu-rg-piano');
    if (piano) { piano.style.left = at(midiToFreq(21)); piano.style.width = `${(freqToSlider(midiToFreq(108), LO, HI) - freqToSlider(midiToFreq(21), LO, HI)) * 100}%`; }
    marks.querySelectorAll('[data-at]').forEach((m) => { m.style.left = at(Number(m.dataset.at)); });
  }

  watchOffscreen(root);
  setFreq(440);
  root.__range = { freq: () => f, setFreq, start, stop };
}
