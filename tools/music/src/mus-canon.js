/*
 * 音樂 Music · 第十八課「巴哈為什麼重要？」的互動（2D＋聲音；沒有 3D）。
 *
 * 一個機制：卡農是同一條旋律，每個聲部晚一點進來，自己追自己。能追得上，是因為這條旋律疊起來不刺耳。
 * 旋律是我們自己寫的，不是巴哈的任何曲子。畫面是「鋼琴卷」，每個聲部一種顏色。
 *   [data-cn-mode] 卡農／一起唱同一條／各唱不同的旋律  [data-cn-n] 聲部數  [data-cn-off] 錯開幾拍（2、4、6、8）  .mu-cn-play 播放
 * 2D（不需要 WebGL）：「這是哪一種？」（[data-mu-canonq]，六題）。
 *
 * 產物：cd tools/music && npm run build → assets/js/mus-canon.js
 * 除錯：document.querySelector('[data-muscanon-lab]').__lab
 *   state（mode、n、offset、playing）、play(mode, n, offset)、stop()、events()、hz()、nowPlaying()、render()
 *   [data-mu-canonq].__canonq：round()、answer(模式)、score()
 */
import { getSynth, initSoundbar, watchOffscreen } from './engine.js';
import { BPM, MAX_VOICES, MODES, OFFSETS, beatSeconds, entryBeats, makeCanonRounds, modeOf, renderCanon, totalBeats, totalSeconds, voiceGain } from './canon.js';
import { midiToFreq, mulberry32 } from './pitch.js';
import { lazyBoot } from './common.js';

const seed = () => (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;
const audioOn = (s) => s.state.unlocked && !s.state.muted && s.running && s.running();
const LEAD = 0.15;
const COLORS = ['#d89b1d', '#0d9d8c', '#d6573a', '#7a3fb3'];
const AMPS = [[1, 0.5, 0.3, 0.15], [1, 0.2, 0.6, 0.1], [1, 0.7, 0.1, 0.05], [1, 0.1, 0.1, 0.5]];

export function scheduleCanon(synth, base, mode, n, offset) {
  renderCanon(mode, n, offset).forEach((e) => {
    synth.toneComplex(midiToFreq(e.midi), AMPS[e.voice % 4], { at: Math.max(base, base + e.time), env: { attack: 0.015, decay: 0.45, sustain: 0.15 }, dur: Math.max(0.15, e.dur), gain: 0.55 * e.gain });
  });
}

function drawRoll(cv, mode, n, offset, playheadSec = -1) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2), w = cv.clientWidth || 700, h = cv.clientHeight || 220;
  if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
  const c = cv.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0);
  c.fillStyle = '#fffdf6'; c.fillRect(0, 0, w, h);
  const T = totalSeconds(mode, n, offset), bs = beatSeconds(), top = 18, lo = 46, hi = 74, rollH = h - top - 12;
  const X = (t) => 10 + (t / T) * (w - 20), Y = (m) => top + (1 - (m - lo) / (hi - lo)) * rollH;
  c.font = '600 10px "PingFang TC", sans-serif';
  const tb = totalBeats(mode, n, offset);
  for (let b = 0; b <= tb; b += 4) { const x = X(b * bs); c.strokeStyle = '#e4dfcc'; c.lineWidth = 1; c.beginPath(); c.moveTo(x, top - 4); c.lineTo(x, top + rollH + 4); c.stroke(); if (b < tb) { c.fillStyle = '#9a927a'; c.fillText(String(b / 4 + 1), x + 3, top - 6); } }
  renderCanon(mode, n, offset).forEach((e) => {
    const x = X(e.time), wd = Math.max(2, X(e.time + e.dur) - x - 1);
    c.fillStyle = COLORS[e.voice % 4]; c.globalAlpha = 0.85; c.fillRect(x, Y(e.midi) - 3.5, wd, 7);
  });
  c.globalAlpha = 1;
  if (playheadSec >= 0) { c.strokeStyle = '#2b2a24'; c.lineWidth = 2; c.beginPath(); c.moveTo(X(playheadSec), top - 4); c.lineTo(X(playheadSec), top + rollH + 4); c.stroke(); }
}

const SAY = {
  canon: ['Canon: every voice sings the same tune, but each comes in later, so the tune chases itself.', '卡農：每個聲部唱同一條旋律，但各晚一點進來，旋律就自己追自己。'],
  unison: ['Together: every voice sings the same notes at the same time. The notes are the same; only the sound gets thicker.', '一起唱同一條：每個聲部同時唱一樣的音。音一樣，只是聲音變厚。'],
  different: ['Different tunes: two voices sing two different tunes at the same time. This is not a canon.', '各唱不同的旋律：兩個聲部同時唱兩條不同的旋律。這不是卡農。'],
};

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const synth = getSynth();
  const cv = $('.mu-cn-cv'), msg = $('.mu-msg');
  const state = { mode: 'canon', n: 2, offset: 4, playing: false };
  let raf = 0, endTimer = 0;
  const say = (en, zh) => { msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  function show() {
    $$('[data-cn-mode]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-cn-mode') === state.mode ? 'true' : 'false'));
    $$('[data-cn-n]').forEach((b) => b.setAttribute('aria-pressed', +b.getAttribute('data-cn-n') === state.n ? 'true' : 'false'));
    $$('[data-cn-off]').forEach((b) => b.setAttribute('aria-pressed', +b.getAttribute('data-cn-off') === state.offset ? 'true' : 'false'));
    const isCanon = state.mode === 'canon', count = state.mode === 'different' ? 2 : state.n;
    $$('[data-cn-n]').forEach((b) => { b.disabled = state.mode === 'different'; });
    $$('[data-cn-off]').forEach((b) => { b.disabled = !isCanon; });
    const m = modeOf(state.mode), g = voiceGain(count);
    const entries = entryBeats(state.mode, count, state.offset).map((b) => b + 1).join(', ');
    $('.mu-cn-info').innerHTML = `<b>${m.en} · ${m.zh}</b> <small>${count} voices · ${count} 個聲部；entering on beats ${entries} · 進來的拍：第 ${entries} 拍；each voice at ${Math.round(g * 100)}% of the volume · 每個聲部是原音量的 ${Math.round(g * 100)}%</small>`;
    drawRoll(cv, state.mode, state.n, state.offset, -1);
  }
  function stop() {
    cancelAnimationFrame(raf); clearTimeout(endTimer);
    if (state.playing) synth.stopAll();
    state.playing = false; $('.mu-cn-play').innerHTML = '&#9654; Play · 播放'; drawRoll(cv, state.mode, state.n, state.offset, -1);
  }
  function play(mode, n, offset) {
    if (mode) state.mode = mode;
    if (n) state.n = Math.min(MAX_VOICES, Math.max(2, n));
    if (offset && OFFSETS.includes(offset)) state.offset = offset;
    stop(); show();
    synth.unlock();
    const base = (audioOn(synth) ? synth.clock() : 0) + LEAD;
    if (audioOn(synth)) scheduleCanon(synth, base, state.mode, state.n, state.offset);
    state.playing = true; $('.mu-cn-play').innerHTML = 'Stop · 停止';
    const t0p = performance.now() + LEAD * 1000, total = totalSeconds(state.mode, state.n, state.offset) + 0.5;
    const loop = () => { const t = (performance.now() - t0p) / 1000; drawRoll(cv, state.mode, state.n, state.offset, Math.max(0, t)); if (t < total) raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    endTimer = setTimeout(() => { state.playing = false; $('.mu-cn-play').innerHTML = '&#9654; Play · 播放'; drawRoll(cv, state.mode, state.n, state.offset, -1); }, (total + LEAD) * 1000 + 100);
    const s = SAY[state.mode]; say(s[0], s[1]);
  }
  $$('[data-cn-mode]').forEach((b) => b.addEventListener('click', () => { state.mode = b.getAttribute('data-cn-mode'); play(); }));
  $$('[data-cn-n]').forEach((b) => b.addEventListener('click', () => { state.n = +b.getAttribute('data-cn-n'); play(); }));
  $$('[data-cn-off]').forEach((b) => b.addEventListener('click', () => { state.offset = +b.getAttribute('data-cn-off'); play(); }));
  $('.mu-cn-play').addEventListener('click', () => (state.playing ? stop() : play()));
  window.addEventListener('resize', show);
  new IntersectionObserver((e) => { if (!e[0].isIntersecting && state.playing) stop(); }, { threshold: 0.05 }).observe(root);
  watchOffscreen(root);
  show();
  say('Choose how the voices sing, how many there are, and how many beats apart they enter. Our tune was written so that it never clashes with itself.', '選聲部怎麼唱、有幾個、各隔幾拍進來。我們的旋律是特別寫成「和自己疊起來不會打架」的。');
  root.classList.add('al-ready');
  root.__lab = { state, play, stop, events: () => renderCanon(state.mode, state.n, state.offset), hz: () => synth.hz(), nowPlaying: () => synth.nowPlaying(), render: show };
  return { ready: () => true, demo: (v) => { const [m, n, o] = String(v).split(':'); play(m, +n || 2, +o || 4); } };
}

function initCanonQ(root) {
  const synth = getSynth();
  const R = { k: root.querySelector('.mu-cq-k'), score: root.querySelector('.mu-cq-score'), msg: root.querySelector('.mu-q-msg'), opts: [...root.querySelectorAll('[data-pick]')],
    next: root.querySelector('.mu-cq-next'), listen: root.querySelector('.mu-cq-listen'), show: root.querySelector('.mu-cq-show'), hint: root.querySelector('.mu-cq-hint') };
  let qs = makeCanonRounds(mulberry32(seed()), 6), q = 0, first = 0, tried = false, done = false;
  function listen() {
    synth.unlock(); synth.stopAll();
    const r = qs[q];
    if (audioOn(synth)) scheduleCanon(synth, synth.clock() + LEAD, r.mode, r.n, r.offset);
    else R.msg.innerHTML = 'No sound yet. Turn the sound on in the bar above, or press “What is in the music”.<span class="zh">還沒有聲音。請在上方的聲音列開啟聲音，或改按「音樂裡有什麼」。</span>';
  }
  function showHint() {
    const r = qs[q], eb = entryBeats(r.mode, r.n, r.offset), count = r.mode === 'different' ? 2 : r.n;
    R.hint.hidden = false;
    R.hint.innerHTML = '<span class="mu-st-k">What is in the music · 音樂裡有什麼</span><ul>' +
      `<li>${count} voices come in on beats ${eb.map((b) => b + 1).join(', ')}.<span class="zh">${count} 個聲部在第 ${eb.map((b) => b + 1).join('、')} 拍進來。</span></li>` +
      `<li>${r.mode === 'different' ? 'The two voices have different notes.' : 'All the voices have the same notes.'}<span class="zh">${r.mode === 'different' ? '兩個聲部的音不一樣。' : '所有聲部的音都一樣。'}</span></li></ul>`;
  }
  function ask() {
    tried = false; done = false;
    R.k.innerHTML = `Question ${q + 1} of ${qs.length} · 第 ${q + 1} 題（共 ${qs.length} 題）`;
    R.opts.forEach((b) => { b.className = 'mu-eq-opt'; b.disabled = false; });
    R.next.hidden = true; R.hint.hidden = true; R.hint.textContent = '';
    R.msg.innerHTML = 'What are the voices doing?<span class="zh">這些聲部在做什麼？</span>';
  }
  function answer(key) {
    if (done) return;
    const btn = R.opts.find((x) => x.getAttribute('data-pick') === key), m = modeOf(qs[q].mode);
    if (key === qs[q].mode) {
      done = true; if (!tried) first++;
      btn.classList.add('is-right'); R.opts.forEach((x) => { x.disabled = true; });
      showHint();
      R.msg.innerHTML = `Yes: ${m.en.toLowerCase()}. This is our own model, not a piece by any composer.<span class="zh">答對了：${m.zh}。這是我們自己的模型，不是任何作曲家的曲子。</span>`;
      R.score.textContent = `${first} / ${q + 1}`;
      R.next.hidden = false; R.next.textContent = q + 1 < qs.length ? 'Next question · 下一題' : 'See my score · 看成績';
    } else {
      tried = true; btn.classList.add('is-wrong'); btn.disabled = true;
      R.msg.innerHTML = 'Not that one. Listen again, or press “What is in the music”.<span class="zh">不是這個。再聽一次，或按「音樂裡有什麼」。</span>';
    }
  }
  R.opts.forEach((b) => b.addEventListener('click', () => answer(b.getAttribute('data-pick'))));
  R.listen.addEventListener('click', listen);
  R.show.addEventListener('click', showHint);
  R.next.addEventListener('click', () => {
    if (R.next.dataset.again) { delete R.next.dataset.again; qs = makeCanonRounds(mulberry32(seed()), 6); q = 0; first = 0; R.score.textContent = '0 / 0'; ask(); return; }
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
  root.__canonq = { round: () => qs[q], answer, score: () => ({ first, q }), listen };
}

function init2D() {
  const bar = document.querySelector('[data-mu-soundbar]'); if (bar) initSoundbar(bar);
  const q = document.querySelector('[data-mu-canonq]'); if (q) initCanonQ(q);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-muscanon-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
void BPM; void MODES;
