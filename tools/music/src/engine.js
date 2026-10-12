/*
 * 音樂 Music · 每一課共用的頁面層：整頁只有一個合成器、「開啟聲音」列、離開畫面就停、朗讀與樂器不同時響。
 *
 *   getSynth()                  整頁共用的 createSynth()；除錯：window.__musSynth（.hz()、.nowPlaying()）
 *   initSoundbar(root)          [data-mu-soundbar]：🔈 開啟聲音／靜音、音量滑桿
 *   watchOffscreen(el)          el 離開畫面就 stopAll()
 */
import { createSynth } from './synth.js';

let synth = null;
const media = new Set();

/** 記住頁面上被播放的 <audio>（🔊 朗讀用 new Audio()），樂器要響之前先把它們停掉 */
function trackMedia() {
  const proto = window.HTMLMediaElement && window.HTMLMediaElement.prototype;
  if (!proto || proto.__musTracked) return;
  const play = proto.play;
  proto.play = function () { media.add(this); return play.apply(this, arguments); };
  proto.__musTracked = true;
}
function silenceSpeech() {
  media.forEach((m) => { try { m.pause(); } catch (e) { /* ignore */ } });
  media.clear();
  try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) { /* ignore */ }
  document.querySelectorAll('[data-say].on').forEach((b) => b.classList.remove('on'));
}

export function getSynth() {
  if (synth) return synth;
  synth = createSynth({ win: window });
  trackMedia();
  // 樂器要響之前，先讓朗讀安靜；朗讀按鈕按下去，樂器就收音
  for (const k of ['tone', 'toneComplex', 'hold']) {
    const f = synth[k];
    synth[k] = (...a) => { silenceSpeech(); return f(...a); };
  }
  document.addEventListener('click', (e) => { if (e.target.closest && e.target.closest('[data-say]')) synth.stopAll(); }, true);
  window.__musSynth = synth;
  return synth;
}

export function watchOffscreen(el, threshold = 0.05) {
  if (!el || !window.IntersectionObserver) return;
  new IntersectionObserver((ents) => { if (!ents[0].isIntersecting) getSynth().stopAll(); }, { threshold }).observe(el);
}

const T = {
  off: ['🔈', 'Turn sound on', '開啟聲音'],
  on: ['🔊', 'Sound is on', '聲音已開啟'],
  muted: ['🔇', 'Muted', '已靜音'],
  none: ['🔇', 'No sound in this browser', '這個瀏覽器無法發聲'],
};

export function initSoundbar(root) {
  const s = getSynth();
  const btn = root.querySelector('[data-mu="toggle"]');
  const ic = root.querySelector('.mu-sound-ic'), tx = root.querySelector('.mu-sound-t');
  const vol = root.querySelector('[data-mu="vol"]');
  const out = root.querySelector('.mu-vol-out');
  const note = root.querySelector('.mu-sound-note');
  let blipTimer = 0;
  function show() {
    const k = !s.state.supported ? 'none' : !s.state.unlocked ? 'off' : s.state.muted ? 'muted' : 'on';
    const [i, en, zh] = T[k];
    ic.textContent = i;
    tx.innerHTML = `${en} <span class="zh">${zh}</span>`;
    root.setAttribute('data-state', k);
    btn.setAttribute('aria-pressed', k === 'on' ? 'true' : 'false');
    btn.disabled = k === 'none';
    vol.value = String(Math.round(s.state.volume * 100));
    out.textContent = `${Math.round(s.state.volume * 100)}%`;
    if (note) note.hidden = k === 'on' || k === 'muted';
  }
  btn.addEventListener('click', () => {
    if (!s.state.unlocked) { if (s.unlock()) s.tone(440, { type: 'sine', dur: 0.22, sustain: true, gain: 0.7 }); }
    else s.setMuted(!s.state.muted);
  });
  vol.addEventListener('input', () => {
    s.setVolume(Number(vol.value) / 100);
    clearTimeout(blipTimer);
    if (s.state.unlocked && !s.state.muted) blipTimer = setTimeout(() => s.tone(440, { type: 'sine', dur: 0.2, sustain: true, gain: 0.7 }), 160);
  });
  s.subscribe(show);
  show();
  root.__bar = { show };
}
