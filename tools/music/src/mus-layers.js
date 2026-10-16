/*
 * 音樂 Music · 第十五課「台灣這塊土地上有哪些音樂？」的互動（2D＋聲音；沒有 3D）。
 *
 * 一個機制：聲部可以用不同的方式「疊」在一起——齊唱（同一個音）、輪唱（同一條旋律、晚一點進來）、
 * 持續音（底下一個拉長的音）、分部（平行移動）。畫面是「鋼琴卷」，每個聲部一種顏色；每多一個聲部，
 * 每個聲部的音量乘 1/√n（第十一課）。旋律是我們自己寫的，不是任何族群或樂種的曲調。
 *   [data-lay-mode] 疊法  [data-lay-n] 聲部數  .mu-ly-play 播放
 * 2D（不需要 WebGL）：「這是哪一種疊法？」（[data-mu-layerq]，六題）。
 *
 * 產物：cd tools/music && npm run build → assets/js/mus-layers.js
 * 除錯：document.querySelector('[data-muslayers-lab]').__lab
 *   state（mode、n、playing）、play(mode, n)、stop()、events()、hz()、nowPlaying()、render()
 *   [data-mu-layerq].__layerq：round()、answer(疊法)、score()
 */
import { getSynth, initSoundbar, watchOffscreen } from './engine.js';
import { BEATS, BPM, MAX_VOICES, MODES, beatSeconds, makeLayerRounds, modeOf, renderLayers, totalBeats, totalSeconds, voiceGain } from './layers.js';
import { midiToFreq, mulberry32 } from './pitch.js';
import { lazyBoot } from './common.js';

const seed = () => (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;
const audioOn = (s) => s.state.unlocked && !s.state.muted && s.running && s.running();
const LEAD = 0.15;
const COLORS = ['#d89b1d', '#0d9d8c', '#d6573a', '#7a3fb3'];
const AMPS = [1, 0.55, 0.3, 0.18, 0.1];

export function scheduleLayers(synth, base, mode, n) {
  const ev = renderLayers(mode, n);
  ev.forEach((e) => {
    const f = midiToFreq(e.midi) * Math.pow(2, (e.cents || 0) / 1200);
    synth.toneComplex(f, AMPS, { at: Math.max(base, base + e.time), env: { attack: 0.07, decay: 0.2, sustain: 0.8 }, dur: Math.max(0.15, e.dur * 0.97), gain: 0.55 * e.gain * (e.drone ? 0.8 : 1) });
  });
  return ev;
}

function drawRoll(cv, mode, n, playheadSec = -1) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2), w = cv.clientWidth || 700, h = cv.clientHeight || 240;
  if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
  const c = cv.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0);
  c.fillStyle = '#fffdf6'; c.fillRect(0, 0, w, h);
  const T = totalSeconds(mode, n), bs = beatSeconds(), top = 18, lo = 34, hi = 76, rollH = h - top - 14;
  const X = (t) => 10 + (t / T) * (w - 20), Y = (m) => top + (1 - (m - lo) / (hi - lo)) * rollH;
  c.font = '600 10px "PingFang TC", sans-serif';
  const tb = totalBeats(mode, n);
  for (let b = 0; b <= tb; b += 4) {
    const x = X(b * bs); c.strokeStyle = '#e4dfcc'; c.lineWidth = 1;
    c.beginPath(); c.moveTo(x, top - 4); c.lineTo(x, top + rollH + 4); c.stroke();
    c.fillStyle = '#9a927a'; if (b < tb) c.fillText(String(b / 4 + 1), x + 3, top - 6);
  }
  renderLayers(mode, n).forEach((e) => {
    const x = X(e.time), wd = Math.max(2, X(e.time + e.dur) - x - 1);
    c.fillStyle = COLORS[e.voice % 4]; c.globalAlpha = e.drone ? 0.45 : 0.85;
    c.fillRect(x, Y(e.midi) - 3.5, wd, e.drone ? 6 : 7);
  });
  c.globalAlpha = 1;
  if (playheadSec >= 0) { c.strokeStyle = '#2b2a24'; c.lineWidth = 2; c.beginPath(); c.moveTo(X(playheadSec), top - 4); c.lineTo(X(playheadSec), top + rollH + 4); c.stroke(); }
}

const SAY = {
  unison: ['Unison: every voice sings the same notes at the same time. More voices make the sound thicker, not different.', '齊唱：每個聲部同時唱一樣的音。聲部越多，聲音越厚，但音並沒有不同。'],
  round: ['Round: every voice sings the same tune, but each one comes in four beats later than the one before.', '輪唱：每個聲部唱同一條旋律，但每個都比前一個晚四拍進來。'],
  drone: ['Drone: one voice sings the tune while the others hold a long low note underneath.', '持續音：一個聲部唱旋律，其他聲部在底下拉長一個低音。'],
  parts: ['Parts: the other voices move along with the tune, in parallel, on different notes of the scale.', '分部：其他聲部跟著旋律平行移動，唱音階裡不同的音。'],
};

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const synth = getSynth();
  const cv = $('.mu-ly-cv'), msg = $('.mu-msg');
  const state = { mode: 'unison', n: 2, playing: false };
  let raf = 0, endTimer = 0;
  const say = (en, zh) => { msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  function show() {
    $$('[data-lay-mode]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-lay-mode') === state.mode ? 'true' : 'false'));
    $$('[data-lay-n]').forEach((b) => b.setAttribute('aria-pressed', +b.getAttribute('data-lay-n') === state.n ? 'true' : 'false'));
    const m = modeOf(state.mode), g = voiceGain(state.n);
    $('.mu-ly-info').innerHTML = `<b>${m.en} · ${m.zh}</b> <small>${state.n} voice${state.n > 1 ? 's' : ''} · ${state.n} 個聲部；each voice at ${Math.round(g * 100)}% of the volume (1 ÷ √${state.n}) · 每個聲部是原音量的 ${Math.round(g * 100)}%（1 ÷ √${state.n}）</small>`;
    drawRoll(cv, state.mode, state.n, -1);
  }
  function stop() {
    cancelAnimationFrame(raf); clearTimeout(endTimer);
    if (state.playing) synth.stopAll();
    state.playing = false; $('.mu-ly-play').innerHTML = '&#9654; Play · 播放'; drawRoll(cv, state.mode, state.n, -1);
  }
  function play(mode, n) {
    if (mode) state.mode = mode;
    if (n) state.n = Math.min(MAX_VOICES, Math.max(1, n));
    stop(); show();
    synth.unlock();
    const base = (audioOn(synth) ? synth.clock() : 0) + LEAD;
    if (audioOn(synth)) scheduleLayers(synth, base, state.mode, state.n);
    state.playing = true; $('.mu-ly-play').innerHTML = 'Stop · 停止';
    const t0p = performance.now() + LEAD * 1000, total = totalSeconds(state.mode, state.n) + 0.5;
    const loop = () => { const t = (performance.now() - t0p) / 1000; drawRoll(cv, state.mode, state.n, Math.max(0, t)); if (t < total) raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    endTimer = setTimeout(() => { state.playing = false; $('.mu-ly-play').innerHTML = '&#9654; Play · 播放'; drawRoll(cv, state.mode, state.n, -1); }, (total + LEAD) * 1000 + 100);
    const s = SAY[state.mode]; say(state.n === 1 ? 'One voice: just the tune. Add a voice to hear the difference.' : s[0], state.n === 1 ? '一個聲部：只有旋律。加一個聲部，聽差別。' : s[1]);
  }
  $$('[data-lay-mode]').forEach((b) => b.addEventListener('click', () => { state.mode = b.getAttribute('data-lay-mode'); if (state.n < 2) state.n = 2; play(); }));
  $$('[data-lay-n]').forEach((b) => b.addEventListener('click', () => { state.n = +b.getAttribute('data-lay-n'); play(); }));
  $('.mu-ly-play').addEventListener('click', () => (state.playing ? stop() : play()));
  window.addEventListener('resize', show);
  new IntersectionObserver((e) => { if (!e[0].isIntersecting && state.playing) stop(); }, { threshold: 0.05 }).observe(root);
  watchOffscreen(root);
  show();
  say('Choose a way of layering and the number of voices, then press play. The tune is always our own.', '選一種疊法和聲部數，再按播放。旋律一律是我們自己寫的。');
  root.classList.add('al-ready');
  root.__lab = { state, play, stop, events: () => renderLayers(state.mode, state.n), hz: () => synth.hz(), nowPlaying: () => synth.nowPlaying(), render: show };
  return { ready: () => true, demo: (v) => { const [m, n] = String(v).split(':'); play(m, +n || 3); } };
}

function initLayerQ(root) {
  const synth = getSynth();
  const R = { k: root.querySelector('.mu-ly-k'), score: root.querySelector('.mu-ly-score'), msg: root.querySelector('.mu-q-msg'), opts: [...root.querySelectorAll('[data-pick]')],
    next: root.querySelector('.mu-ly-next'), listen: root.querySelector('.mu-ly-listen'), show: root.querySelector('.mu-ly-show'), hint: root.querySelector('.mu-ly-hint') };
  let qs = makeLayerRounds(mulberry32(seed()), 6), q = 0, first = 0, tried = false, done = false;
  const facts = (r) => {
    const ev = renderLayers(r.mode, r.n), starts = [...new Set(ev.filter((e) => !e.drone).map((e) => +e.beat.toFixed(2)))];
    const firstNotes = [...new Set(ev.filter((e) => e.time < 0.05).map((e) => e.voice))].length;
    const out = [];
    if (r.mode === 'unison') out.push(['All the voices sing the same pitch at the same moment.', '所有聲部在同一個時刻唱同一個音高。']);
    if (r.mode === 'round') out.push([`The voices come in one after another: ${r.n - 1} later entr${r.n - 1 > 1 ? 'ies' : 'y'}, each four beats after the last.`, `聲部一個接一個進來：後面有 ${r.n - 1} 次進入，每次比前一個晚四拍。`]);
    if (r.mode === 'drone') out.push(['One low note is held under the whole tune.', '整條旋律底下，一直拉著一個低音。']);
    if (r.mode === 'parts') out.push(['The voices start together but sing different notes, moving in the same direction.', '聲部一起開始，但唱不同的音，往同一個方向走。']);
    out.push([`${firstNotes} of ${r.n} voices sing at the very start.`, `一開始就有 ${firstNotes} 個（共 ${r.n} 個）聲部在唱。`]);
    void starts;
    return out;
  };
  function listen() {
    synth.unlock(); synth.stopAll();
    if (audioOn(synth)) scheduleLayers(synth, synth.clock() + LEAD, qs[q].mode, qs[q].n);
    else R.msg.innerHTML = 'No sound yet. Turn the sound on in the bar above, or press “What is in the music”.<span class="zh">還沒有聲音。請在上方的聲音列開啟聲音，或改按「音樂裡有什麼」。</span>';
  }
  function showHint() {
    R.hint.hidden = false;
    R.hint.innerHTML = '<span class="mu-st-k">What is in the music · 音樂裡有什麼</span><ul>' + facts(qs[q]).map((f) => `<li>${f[0]}<span class="zh">${f[1]}</span></li>`).join('') + '</ul>';
  }
  function ask() {
    tried = false; done = false;
    R.k.innerHTML = `Question ${q + 1} of ${qs.length} · 第 ${q + 1} 題（共 ${qs.length} 題）`;
    R.opts.forEach((b) => { b.className = 'mu-eq-opt'; b.disabled = false; });
    R.next.hidden = true; R.hint.hidden = true; R.hint.textContent = '';
    R.msg.innerHTML = 'The tune is always the same. How are the voices layered?<span class="zh">旋律都一樣。聲部是怎麼疊的？</span>';
  }
  function answer(key) {
    if (done) return;
    const btn = R.opts.find((x) => x.getAttribute('data-pick') === key), m = modeOf(qs[q].mode);
    if (key === qs[q].mode) {
      done = true; if (!tried) first++;
      btn.classList.add('is-right'); R.opts.forEach((x) => { x.disabled = true; });
      showHint();
      R.msg.innerHTML = `Yes: ${m.en.toLowerCase()}. This is our own model of one way to layer voices, not a song from any people or tradition.<span class="zh">答對了：${m.zh}。這是我們對一種疊法的模型，不是任何族群或樂種的歌。</span>`;
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
    if (R.next.dataset.again) { delete R.next.dataset.again; qs = makeLayerRounds(mulberry32(seed()), 6); q = 0; first = 0; R.score.textContent = '0 / 0'; ask(); return; }
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
  root.__layerq = { round: () => qs[q], answer, score: () => ({ first, q }), listen };
}

function init2D() {
  const bar = document.querySelector('[data-mu-soundbar]'); if (bar) initSoundbar(bar);
  const q = document.querySelector('[data-mu-layerq]'); if (q) initLayerQ(q);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-muslayers-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
void BEATS; void BPM;
