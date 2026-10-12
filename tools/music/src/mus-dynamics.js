/*
 * 音樂 Music · 第四課「怎麼告訴演奏的人『大聲一點』『快一點』？」的互動（2D＋聲音；有空間結構才用 3D，這一課沒有）。
 *
 * 一個機制：音樂記號用義大利文——力度（dynamics）說多大聲、速度（tempo）說多快，兩者可以分開改。
 * 同一段自己寫的短旋律（四小節，dynamics.js 的 MELODY），選一個力度（pp…ff）、一個速度（largo…presto）、一個形狀
 * （不變、漸強 <、漸弱 >），按播放：每個音用 synth.tone 排在 AudioContext 的時間軸上；琴鍵捲簾（piano roll）上
 * 每個音的亮度與粗細隨增益變化，播放頭用同一條時間走。
 *   .mu-cd-dyn[data-dyn]   力度階梯          .mu-cd-tmp[data-tempo]  速度階梯          [data-shape]  形狀
 * 2D（不需要 WebGL）：「這是哪一個記號？」「哪一個是 allegro？」（dyn2d.js）。
 *
 * 產物：cd tools/music && npm run build → assets/js/mus-dynamics.js
 * 除錯：document.querySelector('[data-musdyn-lab]').__lab
 *   state（dyn、tempo、shape、playing）、plan()（目前設定排出來的每個音的時間、音高、增益）、hz()、nowPlaying()、
 *   set(dyn, tempo, shape)、play()、stop()、demo('soft'|'loud'|'cresc'|'speeds')、render()
 */
import { getSynth, initSoundbar, watchOffscreen } from './engine.js';
import { DYNAMICS, MELODY_BEATS, TEMPOS, dynOf, melodySeconds, planMelody, tempoOf } from './dynamics.js';
import { lazyBoot } from './common.js';
import { initSigns, initTempoQ } from './dyn2d.js';

const LEAD = 0.12;

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const synth = getSynth();
  const cv = $('.mu-cd-roll'), msg = $('.mu-msg'), playBtn = $('.mu-cd-play');
  const state = { dyn: 'mf', tempo: 'allegro', shape: 'steady', playing: false };
  let perfStart = 0, total = 0, raf = 0, endTimer = 0, queue = [];
  const say = (en, zh) => { msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  const plan = () => planMelody({ bpm: tempoOf(state.tempo).bpm, dyn: state.dyn, shape: state.shape });

  function show() {
    $$('[data-dyn]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-dyn') === state.dyn ? 'true' : 'false'));
    $$('[data-tempo]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-tempo') === state.tempo ? 'true' : 'false'));
    $$('[data-shape]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-shape') === state.shape ? 'true' : 'false'));
    const d = dynOf(state.dyn), t = tempoOf(state.tempo);
    const shapeEn = state.shape === 'cresc' ? 'crescendo (<): getting louder' : state.shape === 'dim' ? 'diminuendo (>): getting softer' : 'steady';
    const shapeZh = state.shape === 'cresc' ? '漸強（<）：越來越大聲' : state.shape === 'dim' ? '漸弱（>）：越來越小聲' : '不變';
    $('.mu-cd-read-dyn').innerHTML = `<b>${d.it}</b> <i>${d.key}</i> · ${d.en}<span class="zh">${d.zh}</span>`;
    $('.mu-cd-read-tmp').innerHTML = `<b>${t.it}</b> · ${t.en}<span class="zh">${t.zh}</span>`;
    $('.mu-cd-read-shape').innerHTML = `${shapeEn}<span class="zh">${shapeZh}</span>`;
    $('.mu-cd-bpm').textContent = `${t.bpm}`;
    $('.mu-cd-sec').textContent = melodySeconds(t.bpm).toFixed(1);
    draw(-1);
  }

  function draw(playhead) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2), w = cv.clientWidth || 600, h = cv.clientHeight || 190;
    if (cv.width !== w * dpr || cv.height !== h * dpr) { cv.width = w * dpr; cv.height = h * dpr; }
    const g = cv.getContext('2d');
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.fillStyle = '#0c1428'; g.fillRect(0, 0, w, h);
    const padX = 16, W = w - padX * 2, lo = 59, hi = 70, row = (h - 30) / (hi - lo + 1);
    g.strokeStyle = 'rgba(160,180,230,.12)'; g.lineWidth = 1;
    for (let m = lo; m <= hi; m++) { const y = 10 + (hi - m) * row; g.beginPath(); g.moveTo(padX, y + row); g.lineTo(w - padX, y + row); g.stroke(); }
    for (let b = 0; b <= MELODY_BEATS; b += 4) { const x = padX + (b / MELODY_BEATS) * W; g.strokeStyle = 'rgba(160,180,230,.3)'; g.beginPath(); g.moveTo(x, 6); g.lineTo(x, h - 20); g.stroke(); }
    const ev = plan(), spb = 60 / tempoOf(state.tempo).bpm;
    ev.forEach((e) => {
      const x = padX + (e.time / spb / MELODY_BEATS) * W, ww = (e.dur / spb / MELODY_BEATS) * W - 3;
      const hh = 5 + e.gain * (row - 2), y = 10 + (hi - e.midi) * row + (row - hh) / 2;
      const on = playhead >= e.time && playhead < e.time + e.dur;
      const a = 0.28 + 0.72 * e.gain;
      g.fillStyle = on ? `rgba(255,255,255,${a})` : `rgba(255,211,110,${a})`;
      g.beginPath(); g.roundRect ? g.roundRect(x, y, Math.max(3, ww), hh, 3) : g.rect(x, y, Math.max(3, ww), hh); g.fill();
    });
    if (playhead >= 0) {
      const x = padX + (playhead / (melodySeconds(tempoOf(state.tempo).bpm))) * W;
      g.strokeStyle = '#7ef0e3'; g.lineWidth = 2; g.beginPath(); g.moveTo(x, 6); g.lineTo(x, h - 20); g.stroke();
    }
    g.fillStyle = '#9fb0cf'; g.font = '11px sans-serif';
    g.fillText('pitch ↑ · 音高', padX, h - 6); g.fillText('time → · 時間', w - padX - 74, h - 6);
    g.fillText('brighter and thicker = louder · 越亮越粗＝越大聲', w / 2 - 110, h - 6);
  }

  function stop() {
    cancelAnimationFrame(raf); clearTimeout(endTimer); queue.forEach(clearTimeout); queue = [];
    synth.stopAll();
    state.playing = false;
    playBtn.setAttribute('aria-pressed', 'false');
    playBtn.innerHTML = '&#9654; Play the melody · 播放旋律';
    draw(-1);
  }
  function play(after) {
    stop();
    synth.unlock();
    const ev = plan();
    total = melodySeconds(tempoOf(state.tempo).bpm);
    const audio = synth.state.unlocked && !synth.state.muted && synth.running && synth.running();
    const base = (audio ? synth.clock() : 0) + LEAD;
    if (audio) ev.forEach((e) => synth.tone(e.freq, { type: 'triangle', at: base + e.time, dur: Math.max(0.12, e.dur * 0.92), gain: e.gain }));
    perfStart = performance.now() + LEAD * 1000;
    state.playing = true;
    playBtn.setAttribute('aria-pressed', 'true');
    playBtn.innerHTML = 'Stop · 停止';
    const loop = () => {
      const t = (performance.now() - perfStart) / 1000;
      draw(t < 0 ? -1 : t);
      if (t < total) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    endTimer = setTimeout(() => { state.playing = false; playBtn.setAttribute('aria-pressed', 'false'); playBtn.innerHTML = '&#9654; Play the melody · 播放旋律'; draw(-1); if (after) after(); }, (total + LEAD) * 1000 + 80);
  }
  function set(d, t, s, quiet) {
    if (d) state.dyn = d; if (t) state.tempo = t; if (s) state.shape = s;
    show();
    if (!quiet) { const dd = dynOf(state.dyn), tt = tempoOf(state.tempo); say(`${dd.it} (${dd.key}) at ${tt.it}. Press play. The melody is the same each time. Only the sign changes.`, `${dd.it}（${dd.key}）、${tt.it}。按播放。旋律每次都一樣，只有記號不一樣。`); }
  }

  $$('[data-dyn]').forEach((b) => b.addEventListener('click', () => { set(b.getAttribute('data-dyn')); play(); }));
  $$('[data-tempo]').forEach((b) => b.addEventListener('click', () => { set(null, b.getAttribute('data-tempo')); play(); }));
  $$('[data-shape]').forEach((b) => b.addEventListener('click', () => { set(null, null, b.getAttribute('data-shape')); play(); }));
  playBtn.addEventListener('click', () => (state.playing ? stop() : play()));
  window.addEventListener('resize', () => draw(-1));
  new IntersectionObserver((ents) => { if (!ents[0].isIntersecting && state.playing) stop(); }, { threshold: 0.05 }).observe(root);
  watchOffscreen(root);

  const needSound = () => (synth.state.unlocked && !synth.state.muted ? '' : ' (Turn the sound on to hear it. · 打開聲音就能聽到。)');
  const DEMO = {
    soft() { set('p', 'andante', 'steady', true); say('Piano: soft.' + needSound(), 'Piano（p）：弱。'); play(); },
    loud() { set('f', 'andante', 'steady', true); say('Forte: loud. The notes and the speed are the same as before.' + needSound(), 'Forte（f）：強。音和速度都和剛才一樣。'); play(); },
    cresc() { set('mf', 'moderato', 'cresc', true); say('Crescendo: it starts soft and gets louder, note by note.' + needSound(), 'Crescendo：從小聲開始，一個音一個音越來越大聲。'); play(); },
    speeds() {
      set('mf', 'adagio', 'steady', true); say('First adagio, then allegro: the same melody, the same loudness.' + needSound(), '先 adagio、再 allegro：同一段旋律、同樣的音量。');
      play(() => { set(null, 'allegro', null, true); play(); });
    },
  };
  show();
  say('Pick a loudness and a speed, then press play. Try crescendo and diminuendo too.', '選一個力度、一個速度，再按播放。也試試漸強和漸弱。');
  root.classList.add('al-ready');
  root.__lab = { state, plan, hz: () => synth.hz(), nowPlaying: () => synth.nowPlaying(), set: (d, t, s) => set(d, t, s), play: () => play(), stop, demo: (v) => DEMO[v] && DEMO[v](), render: () => draw(-1), TEMPOS, DYNAMICS };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  const bar = document.querySelector('[data-mu-soundbar]'); if (bar) initSoundbar(bar);
  const s = document.querySelector('[data-mu-sign]'); if (s) initSigns(s);
  const t = document.querySelector('[data-mu-tempoq]'); if (t) initTempoQ(t);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-musdyn-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
