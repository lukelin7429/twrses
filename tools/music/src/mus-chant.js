/*
 * 音樂 Music · 第十六課「梵唄是什麼？」的互動（2D＋聲音；沒有 3D）。
 *
 * 只講聲音與節奏：一個拉長的音、換氣，與木魚式的穩定敲擊。沒有經文、沒有曲調、沒有任何錄音；不解釋教義。
 * 畫面是「鋼琴卷」：每個聲部一條，唱的時候有顏色，換氣的時候是空的；底下的小點是每一拍的敲擊。
 *   [data-ch-mode] 一起換氣／輪流換氣  [data-ch-n] 聲部數  .mu-ch-knock 敲擊開關  .mu-ch-bpm 速度  .mu-ch-play 播放
 * 2D（不需要 WebGL）：「一口氣有多長」（[data-mu-breath]，按住發聲，最長 6 秒）、「哪一個比較穩？」（[data-mu-steadyq]，六題）。
 *
 * 產物：cd tools/music && npm run build → assets/js/mus-chant.js
 * 除錯：document.querySelector('[data-muschant-lab]').__lab
 *   state（mode、n、bpm、knock、playing）、play()、stop()、events()、hz()、nowPlaying()、render()
 *   [data-mu-breath].__breath：start()、stop()、seconds()
 *   [data-mu-steadyq].__steadyq：round()、answer(0|1)、score()
 */
import { getSynth, initSoundbar, watchOffscreen } from './engine.js';
import { BPM, BREATH_MAX, MAX_VOICES, TOTAL_BEATS, beatSeconds, breathBeats, clampBpm, coverage, intervalsSd, knockTimes, longestSilence, makeSteadyRounds, renderChant, totalSeconds, voiceGain } from './chant.js';
import { midiToFreq, mulberry32 } from './pitch.js';
import { lazyBoot } from './common.js';

const seed = () => (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;
const audioOn = (s) => s.state.unlocked && !s.state.muted && s.running && s.running();
const LEAD = 0.15;
const COLORS = ['#d89b1d', '#0d9d8c', '#d6573a', '#7a3fb3'];
const VOICE_AMPS = [1, 0.5, 0.3, 0.15];
const pct = (x) => Math.round(x * 100);

function knock(synth, at, gain = 1) {
  synth.toneInharmonic(520, [1, 2.4, 3.9], [1, 0.5, 0.3], { dur: 0.16, damp: 1.2, gain: 0.55 * gain, attack: 0.002, at });
}
export function scheduleChant(synth, base, opts) {
  renderChant(opts).forEach((e) => {
    const at = Math.max(base, base + e.time);
    if (e.part === 'knock') knock(synth, at);
    else synth.toneComplex(midiToFreq(e.midi) * Math.pow(2, e.cents / 1200), VOICE_AMPS, { at, env: { attack: 0.25, decay: 0.3, sustain: 0.85 }, dur: Math.max(0.2, e.dur * 0.98), gain: 0.5 * e.gain });
  });
}

function drawRoll(cv, st, playheadSec = -1) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2), w = cv.clientWidth || 700, h = cv.clientHeight || 200;
  if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
  const c = cv.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0);
  c.fillStyle = '#fffdf6'; c.fillRect(0, 0, w, h);
  const T = totalSeconds(st.bpm), bs = beatSeconds(st.bpm), top = 18, laneH = (h - top - 30) / MAX_VOICES;
  const X = (t) => 10 + (t / T) * (w - 20);
  c.font = '600 10px "PingFang TC", sans-serif';
  for (let b = 0; b <= TOTAL_BEATS; b += 8) { const x = X(b * bs); c.strokeStyle = '#d9d3bb'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(x, top - 4); c.lineTo(x, h - 20); c.stroke(); if (b < TOTAL_BEATS) { c.fillStyle = '#9a927a'; c.fillText(`phrase ${b / 8 + 1}`, x + 3, top - 6); } }
  const ev = renderChant({ bpm: st.bpm, n: st.n, mode: st.mode, knock: st.knock });
  ev.forEach((e) => {
    if (e.part === 'knock') { c.fillStyle = 'rgba(107,100,80,.75)'; c.beginPath(); c.arc(X(e.time), h - 10, 2.6, 0, 7); c.fill(); return; }
    const y = top + e.voice * laneH, x = X(e.time), wd = Math.max(2, X(e.time + e.dur) - x - 1);
    c.fillStyle = COLORS[e.voice]; c.globalAlpha = 0.85; c.fillRect(x, y + 3, wd, laneH - 7); c.globalAlpha = 1;
  });
  if (playheadSec >= 0) { c.strokeStyle = '#2b2a24'; c.lineWidth = 2; c.beginPath(); c.moveTo(X(playheadSec), top - 4); c.lineTo(X(playheadSec), h - 18); c.stroke(); }
}

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const synth = getSynth();
  const cv = $('.mu-ch-cv'), msg = $('.mu-msg');
  const state = { mode: 'together', n: 3, bpm: BPM, knock: true, playing: false };
  let raf = 0, endTimer = 0;
  const say = (en, zh) => { msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  function show() {
    $$('[data-ch-mode]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-ch-mode') === state.mode ? 'true' : 'false'));
    $$('[data-ch-n]').forEach((b) => b.setAttribute('aria-pressed', +b.getAttribute('data-ch-n') === state.n ? 'true' : 'false'));
    $('.mu-ch-knock').setAttribute('aria-pressed', state.knock ? 'true' : 'false');
    $('.mu-ch-bpm').value = String(state.bpm); $('.mu-ch-bpmv').textContent = String(state.bpm);
    const cov = coverage(state.mode, state.n), gap = longestSilence(state.mode, state.n), g = voiceGain(state.n);
    $('.mu-ch-info').innerHTML = `<b>${state.n} voice${state.n > 1 ? 's' : ''} · ${state.n} 個聲部</b> <small>the sound is on for ${pct(cov)}% of the time; the longest silence is ${gap < 0.05 ? 'none' : (+gap.toFixed(1)) + ' beats'} · 有聲音的時間佔 ${pct(cov)}%；最長的無聲空隙：${gap < 0.05 ? '沒有' : (+gap.toFixed(1)) + ' 拍'}；each voice at ${pct(g)}% of the volume · 每個聲部是原音量的 ${pct(g)}%</small>`;
    drawRoll(cv, state, -1);
  }
  function stop() {
    cancelAnimationFrame(raf); clearTimeout(endTimer);
    if (state.playing) synth.stopAll();
    state.playing = false; $('.mu-ch-play').innerHTML = '&#9654; Play · 播放'; drawRoll(cv, state, -1);
  }
  function play() {
    stop(); show();
    synth.unlock();
    const base = (audioOn(synth) ? synth.clock() : 0) + LEAD;
    if (audioOn(synth)) scheduleChant(synth, base, { bpm: state.bpm, n: state.n, mode: state.mode, knock: state.knock });
    state.playing = true; $('.mu-ch-play').innerHTML = 'Stop · 停止';
    const t0p = performance.now() + LEAD * 1000, total = totalSeconds(state.bpm) + 0.5;
    const loop = () => { const t = (performance.now() - t0p) / 1000; drawRoll(cv, state, Math.max(0, t)); if (t < total) raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    endTimer = setTimeout(() => { state.playing = false; $('.mu-ch-play').innerHTML = '&#9654; Play · 播放'; drawRoll(cv, state, -1); }, (total + LEAD) * 1000 + 100);
    if (state.n === 1) say('One voice: a long note, a short breath, and a long note again. The knocks keep the beat steady.', '一個聲部：一個長音、一口短短的氣、再一個長音。敲擊讓拍子保持穩定。');
    else if (state.mode === 'together') say('Everyone breathes at the same time, so the sound has small gaps. The knocks do not stop.', '大家同時換氣，所以聲音有小小的空隙。敲擊沒有停。');
    else say('Each voice breathes at a different time, so at least one voice is always singing and the sound never stops.', '每個聲部在不同的時間換氣，所以永遠至少有一個聲部在唱，聲音不中斷。');
  }
  $$('[data-ch-mode]').forEach((b) => b.addEventListener('click', () => { state.mode = b.getAttribute('data-ch-mode'); if (state.n < 2) state.n = 2; play(); }));
  $$('[data-ch-n]').forEach((b) => b.addEventListener('click', () => { state.n = +b.getAttribute('data-ch-n'); play(); }));
  $('.mu-ch-knock').addEventListener('click', () => { state.knock = !state.knock; show(); });
  const bg = $('.mu-ch-bpm'); bg.addEventListener('input', () => { state.bpm = clampBpm(+bg.value); show(); }); bg.addEventListener('change', () => { if (state.playing) play(); });
  $('.mu-ch-play').addEventListener('click', () => (state.playing ? stop() : play()));
  window.addEventListener('resize', show);
  new IntersectionObserver((e) => { if (!e[0].isIntersecting && state.playing) stop(); }, { threshold: 0.05 }).observe(root);
  watchOffscreen(root);
  show();
  say('Choose how the voices breathe and how many there are, then press play. This is our own model of sound and breath, not a recording of any chanting.', '選聲部怎麼換氣、有幾個聲部，再按播放。這是我們對聲音與呼吸的模型，不是任何唱誦的錄音。');
  root.classList.add('al-ready');
  root.__lab = { state, play, stop, events: () => renderChant({ bpm: state.bpm, n: state.n, mode: state.mode, knock: state.knock }), hz: () => synth.hz(), nowPlaying: () => synth.nowPlaying(), render: show };
  return { ready: () => true, demo: (v) => { const [m, n] = String(v).split(':'); state.mode = m === 'staggered' ? 'staggered' : 'together'; state.n = +n || 3; play(); } };
}

function initBreath(root) {
  const synth = getSynth();
  const $ = (s) => root.querySelector(s);
  const hold = $('.mu-br-hold'), bar = $('.mu-br-bar i'), out = $('.mu-br-out'), msg = $('.mu-msg');
  let voice = null, t0 = 0, raf = 0, timer = 0, last = 0;
  const upd = () => { const s = (performance.now() - t0) / 1000; last = Math.min(BREATH_MAX, s); bar.style.width = `${(last / BREATH_MAX) * 100}%`; out.innerHTML = `${last.toFixed(1)} s ≈ ${breathBeats(last).toFixed(1)} beats at ${BPM} BPM · 約 ${breathBeats(last).toFixed(1)} 拍（${BPM} BPM）`; raf = requestAnimationFrame(upd); };
  function stop() {
    if (!voice && !raf) return;
    clearTimeout(timer); cancelAnimationFrame(raf); raf = 0;
    last = Math.min(BREATH_MAX, (performance.now() - t0) / 1000); bar.style.width = `${(last / BREATH_MAX) * 100}%`;
    if (voice) { try { voice.release(); } catch (e) { /* ignore */ } voice = null; }
    root.classList.remove('is-playing'); hold.setAttribute('aria-pressed', 'false');
    msg.innerHTML = `You held a note for ${last.toFixed(1)} seconds. The model needs about ${(6 * beatSeconds()).toFixed(1)} seconds for six beats at ${BPM} BPM. Then it takes a breath.<span class="zh">你拉了 ${last.toFixed(1)} 秒。模型裡六拍在 ${BPM} BPM 約 ${(6 * beatSeconds()).toFixed(1)} 秒，然後換氣。</span>`;
  }
  function start() {
    if (raf) return;
    if (synth.state.supported && (synth.state.unlocked || synth.unlock())) voice = synth.hold(midiToFreq(62), { type: 'sine', gain: 0.45 });
    t0 = performance.now(); last = 0; root.classList.add('is-playing'); hold.setAttribute('aria-pressed', 'true'); raf = requestAnimationFrame(upd);
    timer = setTimeout(stop, BREATH_MAX * 1000);
  }
  hold.addEventListener('pointerdown', (e) => { e.preventDefault(); try { hold.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ } start(); });
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((n) => hold.addEventListener(n, stop));
  hold.addEventListener('keydown', (e) => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); raf ? stop() : start(); } });
  watchOffscreen(root);
  root.__breath = { start, stop, seconds: () => last };
}

function initSteadyQ(root) {
  const synth = getSynth();
  const R = { k: root.querySelector('.mu-st-qk'), score: root.querySelector('.mu-stq-score'), msg: root.querySelector('.mu-q-msg'), opts: [...root.querySelectorAll('[data-pick]')],
    next: root.querySelector('.mu-stq-next'), listenA: root.querySelector('.mu-stq-a'), listenB: root.querySelector('.mu-stq-b'), show: root.querySelector('.mu-stq-show'), hint: root.querySelector('.mu-stq-hint') };
  let qs = makeSteadyRounds(mulberry32(seed()), 6), q = 0, first = 0, tried = false, done = false;
  const seq = (r, which) => knockTimes(r.bpm, 12, which === r.steady ? 0 : r.wobble, mulberry32(r.seed + which));
  function listen(which) {
    synth.unlock(); synth.stopAll();
    if (audioOn(synth)) { const base = synth.clock() + LEAD; seq(qs[q], which).forEach((t) => knock(synth, base + t)); }
    else R.msg.innerHTML = 'No sound yet. Turn the sound on in the bar above, or press “What is in the knocks”.<span class="zh">還沒有聲音。請在上方的聲音列開啟聲音，或改按「敲擊裡有什麼」。</span>';
  }
  function showHint() {
    const r = qs[q], a = intervalsSd(seq(r, 0)), b = intervalsSd(seq(r, 1));
    R.hint.hidden = false;
    R.hint.innerHTML = `<span class="mu-st-k">What is in the knocks · 敲擊裡有什麼</span><ul><li>Knock set A: the gaps between knocks differ by about ${a.toFixed(0)} ms. Knock set B: about ${b.toFixed(0)} ms.<span class="zh">A 組：敲擊之間的間隔相差約 ${a.toFixed(0)} 毫秒。B 組：約 ${b.toFixed(0)} 毫秒。</span></li><li>A steady beat has gaps that are all the same.<span class="zh">穩定的拍，每個間隔都一樣。</span></li></ul>`;
  }
  function ask() {
    tried = false; done = false;
    R.k.innerHTML = `Question ${q + 1} of ${qs.length} · 第 ${q + 1} 題（共 ${qs.length} 題）`;
    R.opts.forEach((b) => { b.className = 'mu-eq-opt'; b.disabled = false; });
    R.next.hidden = true; R.hint.hidden = true; R.hint.textContent = '';
    R.msg.innerHTML = 'Listen to knock set A and knock set B. Which one keeps a steady beat?<span class="zh">聽 A 組和 B 組的敲擊。哪一組的拍子比較穩？</span>';
  }
  function answer(key) {
    if (done) return;
    const idx = key === 'A' ? 0 : 1, btn = R.opts.find((x) => x.getAttribute('data-pick') === key);
    if (idx === qs[q].steady) {
      done = true; if (!tried) first++;
      btn.classList.add('is-right'); R.opts.forEach((x) => { x.disabled = true; });
      showHint();
      R.msg.innerHTML = `Yes: set ${key} is steady. The other one wobbles by up to ${qs[q].wobble} ms.<span class="zh">答對了：${key} 組比較穩。另一組最多晃動 ${qs[q].wobble} 毫秒。</span>`;
      R.score.textContent = `${first} / ${q + 1}`;
      R.next.hidden = false; R.next.textContent = q + 1 < qs.length ? 'Next question · 下一題' : 'See my score · 看成績';
    } else {
      tried = true; btn.classList.add('is-wrong'); btn.disabled = true;
      R.msg.innerHTML = 'Not that one. Listen again, or press “What is in the knocks”.<span class="zh">不是這個。再聽一次，或按「敲擊裡有什麼」。</span>';
    }
  }
  R.opts.forEach((b) => b.addEventListener('click', () => answer(b.getAttribute('data-pick'))));
  R.listenA.addEventListener('click', () => listen(0)); R.listenB.addEventListener('click', () => listen(1));
  R.show.addEventListener('click', showHint);
  R.next.addEventListener('click', () => {
    if (R.next.dataset.again) { delete R.next.dataset.again; qs = makeSteadyRounds(mulberry32(seed()), 6); q = 0; first = 0; R.score.textContent = '0 / 0'; ask(); return; }
    q++;
    if (q >= qs.length) {
      R.k.innerHTML = 'Finished · 完成';
      R.msg.innerHTML = `You got ${first} of ${qs.length} right on the first try.<span class="zh">你第一次就答對 ${first} 題（共 ${qs.length} 題）。</span>`;
      R.opts.forEach((x) => { x.disabled = true; });
      R.next.textContent = 'Play again · 再玩一次'; R.next.dataset.again = '1';
      return;
    }
    ask();
  });
  watchOffscreen(root);
  ask();
  root.__steadyq = { round: () => qs[q], answer: (k) => answer(k === 0 ? 'A' : k === 1 ? 'B' : k), score: () => ({ first, q }), listen };
}

function init2D() {
  const bar = document.querySelector('[data-mu-soundbar]'); if (bar) initSoundbar(bar);
  const b = document.querySelector('[data-mu-breath]'); if (b) initBreath(b);
  const q = document.querySelector('[data-mu-steadyq]'); if (q) initSteadyQ(q);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-muschant-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
