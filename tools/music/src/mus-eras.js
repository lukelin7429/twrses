/*
 * 音樂 Music · 第十三課「西洋古典音樂四百年怎麼變？」的互動（2D＋聲音；沒有 3D）。
 *
 * 一個機制：音樂的寫法隨時代改變。同一段自己寫的短旋律，用巴洛克式、古典式、浪漫式三種寫法各奏一次：
 * 畫面是「鋼琴卷」（橫軸時間、縱軸音高）加力度曲線；旋律音完全一樣，改變的是伴奏、力度、音色與速度的彈性。
 *   [data-era]  時期    .mu-er-play  播放    .mu-er-tune  只聽旋律（證明旋律沒有變）
 * 2D（不需要 WebGL）：「這是哪個時期？」（[data-mu-eraq]，六題）。
 * 三種寫法是我們依各時期的典型特徵做的簡化示範，不是任何作曲家或樂曲。
 *
 * 產物：cd tools/music && npm run build → assets/js/mus-eras.js
 * 除錯：document.querySelector('[data-museras-lab]').__lab
 *   state（era、tuneOnly、playing）、play(era)、stop()、events(era)、hz()、nowPlaying()、render()
 *   [data-mu-eraq].__eraq：round()、answer(時期)、score()
 */
import { getSynth, initSoundbar, watchOffscreen } from './engine.js';
import { ERAS, MELODY_BEATS, dynamicAt, eraOf, makeEraRounds, range, renderEra, rubato, totalSeconds } from './eras.js';
import { midiToFreq, mulberry32 } from './pitch.js';
import { lazyBoot } from './common.js';

const seed = () => (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;
const audioOn = (s) => s.state.unlocked && !s.state.muted && s.running && s.running();
const LEAD = 0.15;
const VOICES = {
  harpsichord: { amps: [1, 0.85, 0.7, 0.55, 0.45, 0.35, 0.25, 0.18], env: { attack: 0.002, decay: 0.3, sustain: 0 }, maxDur: 0.5, gain: 0.5 },
  fortepiano: { amps: [1, 0.35, 0.18, 0.1, 0.07, 0.05, 0.04, 0.03], env: { attack: 0.004, decay: 0.7, sustain: 0 }, maxDur: 0.9, gain: 0.6 },
  piano: { amps: [1, 0.5, 0.3, 0.2, 0.14, 0.1, 0.07, 0.05], env: { attack: 0.005, decay: 1.5, sustain: 0 }, maxDur: 1.8, gain: 0.55 },
};
export function scheduleEra(synth, key, base, tuneOnly = false) {
  const ev = renderEra(key).filter((e) => !tuneOnly || e.part === 'melody' || e.part === 'ornament');
  ev.forEach((e) => {
    const v = VOICES[e.voice];
    synth.toneComplex(midiToFreq(e.midi), v.amps, { at: Math.max(base, base + e.time), env: v.env, dur: Math.max(0.08, Math.min(v.maxDur, e.dur * 1.05)), gain: v.gain * e.gain * (e.part === 'melody' ? 1 : 0.7) });
  });
  return ev;
}

function drawRoll(cv, key, tuneOnly, playheadSec = -1) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2), w = cv.clientWidth || 700, h = cv.clientHeight || 260;
  if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
  const c = cv.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0);
  c.fillStyle = '#fffdf6'; c.fillRect(0, 0, w, h);
  const ev = renderEra(key), T = Math.max(...ev.map((e) => e.time + e.dur)), lo = 30, hi = 82;
  const top = 8, rollH = h - 62, X = (t) => 10 + (t / T) * (w - 20), Y = (m) => top + (1 - (m - lo) / (hi - lo)) * rollH;
  // 小節線
  const era = eraOf(key);
  c.strokeStyle = '#e4dfcc'; c.lineWidth = 1; c.fillStyle = '#9a927a'; c.font = '600 10px "PingFang TC", sans-serif';
  for (let bar = 0; bar <= 4; bar++) {
    let t = 0; for (let b = 0; b < bar * 4; b++) t += (60 / era.bpm) * rubato(key, b);
    c.beginPath(); c.moveTo(X(t), top); c.lineTo(X(t), top + rollH); c.stroke();
    if (bar < 4) c.fillText(String(bar + 1), X(t) + 3, top + 10);
  }
  ev.forEach((e) => {
    const accomp = e.part !== 'melody' && e.part !== 'ornament';
    if (tuneOnly && accomp) return;
    c.fillStyle = e.part === 'melody' ? '#d89b1d' : e.part === 'ornament' ? '#d6573a' : 'rgba(13,157,140,.55)';
    const x = X(e.time), wd = Math.max(2, X(e.time + e.dur) - x - 1);
    c.fillRect(x, Y(e.midi) - 3.5, wd, e.part === 'melody' ? 7 : 5);
  });
  // 力度曲線
  const base = top + rollH + 12, ch = 38;
  c.strokeStyle = '#7a3fb3'; c.lineWidth = 2; c.beginPath();
  let first = true;
  for (let b = 0; b <= MELODY_BEATS; b += 0.1) {
    let t = 0; const n = Math.floor(b); for (let i = 0; i < n; i++) t += (60 / era.bpm) * rubato(key, i); t += (b - n) * (60 / era.bpm) * rubato(key, n);
    const y = base + ch * (1 - dynamicAt(key, Math.min(b, MELODY_BEATS - 0.001)));
    if (first) { c.moveTo(X(t), y); first = false; } else c.lineTo(X(t), y);
  }
  c.stroke();
  c.fillStyle = '#6b6450'; c.font = '600 10px "PingFang TC", sans-serif';
  c.fillText('loudness · 音量', 12, base + ch + 10); c.fillText('pitch · 音高', 12, top + rollH - 4);
  if (playheadSec >= 0) { c.strokeStyle = '#0d9d8c'; c.lineWidth = 2; c.beginPath(); c.moveTo(X(playheadSec), top); c.lineTo(X(playheadSec), base + ch); c.stroke(); }
}

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const synth = getSynth();
  const cv = $('.mu-er-cv'), msg = $('.mu-msg');
  const state = { era: 'baroque', tuneOnly: false, playing: false };
  let raf = 0, t0 = 0, endTimer = 0;
  const say = (en, zh) => { msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  function show() {
    $$('[data-era]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-era') === state.era ? 'true' : 'false'));
    $$('[data-era-features]').forEach((u) => { u.hidden = u.getAttribute('data-era-features') !== state.era; });
    const tn = $('.mu-er-tune'); if (tn) tn.setAttribute('aria-pressed', state.tuneOnly ? 'true' : 'false');
    const era = eraOf(state.era);
    $('.mu-er-info').innerHTML = `<b>${era.en} · ${era.zh}</b> <small>${era.bpm} beats per minute · 每分鐘 ${era.bpm} 拍；range ${range(state.era)} semitones · 音域 ${range(state.era)} 個半音；${totalSeconds(state.era).toFixed(1)} s</small>`;
    drawRoll(cv, state.era, state.tuneOnly, -1);
  }
  function stop() {
    cancelAnimationFrame(raf); clearTimeout(endTimer);
    if (state.playing) synth.stopAll();
    state.playing = false; $('.mu-er-play').innerHTML = '&#9654; Play · 播放'; drawRoll(cv, state.era, state.tuneOnly, -1);
  }
  function play(key) {
    if (key) { state.era = key; }
    stop(); show();
    synth.unlock();
    const base = (audioOn(synth) ? synth.clock() : 0) + LEAD;
    if (audioOn(synth)) scheduleEra(synth, state.era, base, state.tuneOnly);
    state.playing = true; $('.mu-er-play').innerHTML = 'Stop · 停止';
    const t0p = performance.now() + LEAD * 1000, total = totalSeconds(state.era) + 0.4;
    const loop = () => { const t = (performance.now() - t0p) / 1000; drawRoll(cv, state.era, state.tuneOnly, Math.max(0, t)); if (t < total) raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    endTimer = setTimeout(() => { state.playing = false; $('.mu-er-play').innerHTML = '&#9654; Play · 播放'; drawRoll(cv, state.era, state.tuneOnly, -1); }, (total + LEAD) * 1000 + 100);
    const sayE = { baroque: ['Baroque style: a bass that never stops, short bright notes, and loudness that jumps in steps.', '巴洛克式：不停的低音、短而亮的音，力度一階一階地跳。'],
      classical: ['Classical style: a broken-chord left hand, even phrases, and loudness that swells and fades smoothly.', '古典式：分解和弦的左手、均勻的樂句、力度平順地漸強漸弱。'],
      romantic: ['Romantic style: wide arpeggios, a flexible tempo that slows at the ends, and big swings in loudness.', '浪漫式：寬廣的分解和弦、在句尾放慢的彈性速度、大幅度的力度起伏。'] }[state.era];
    say(`${sayE[0]} The tune on top is exactly the same.`, `${sayE[1]} 最上面的旋律完全一樣。`);
  }
  $$('[data-era]').forEach((b) => b.addEventListener('click', () => play(b.getAttribute('data-era'))));
  $('.mu-er-play').addEventListener('click', () => (state.playing ? stop() : play()));
  const tn = $('.mu-er-tune'); if (tn) tn.addEventListener('click', () => { state.tuneOnly = !state.tuneOnly; show(); });
  window.addEventListener('resize', show);
  new IntersectionObserver((e) => { if (!e[0].isIntersecting && state.playing) stop(); }, { threshold: 0.05 }).observe(root);
  watchOffscreen(root);
  show();
  say('Choose a period and press play. The gold notes are the tune. The teal notes are the accompaniment. Switch on “Tune only” to hear that the tune is the same.', '選一個時期，按播放。金色的音是旋律，青綠色的是伴奏。打開「只聽旋律」，就聽得出旋律是一樣的。');
  root.classList.add('al-ready');
  void t0;
  root.__lab = { state, play, stop, events: (k) => renderEra(k), hz: () => synth.hz(), nowPlaying: () => synth.nowPlaying(), render: show };
  return { ready: () => true, demo: (v) => play(v) };
}

function initEraQ(root) {
  const synth = getSynth();
  const R = { k: root.querySelector('.mu-eq-k'), score: root.querySelector('.mu-eq-score'), msg: root.querySelector('.mu-q-msg'), opts: [...root.querySelectorAll('[data-pick]')],
    next: root.querySelector('.mu-eq-next'), listen: root.querySelector('.mu-eq-listen'), show: root.querySelector('.mu-eq-show'), hint: root.querySelector('.mu-eq-hint') };
  let qs = makeEraRounds(mulberry32(seed()), 6), q = 0, first = 0, tried = false, done = false;
  const facts = (key) => {
    const ev = renderEra(key), bass = ev.filter((e) => e.part === 'bass'), inner = ev.filter((e) => e.part === 'inner');
    const mel = ev.filter((e) => e.part === 'melody');
    const levels = new Set(mel.map((e) => +e.gain.toFixed(2)));
    const out = [];
    out.push(levels.size <= 2 ? ['The loudness changes in sudden steps.', '力度突然一階一階地變。'] : ['The loudness changes gradually.', '力度是慢慢地變。']);
    if (key === 'baroque') out.push(['A bass line moves on every half beat, without a break.', '低音每半拍就動一次，沒有停。'], ['The notes are short and bright.', '音又短又亮。']);
    if (key === 'classical') out.push(['The left hand plays low, high, middle, high over and over.', '左手一直重複 低、高、中、高。'], ['The phrases are even and the speed is steady.', '樂句均勻、速度穩定。']);
    if (key === 'romantic') out.push(['The speed slows down at the ends of phrases.', '速度在句尾放慢。'], [`The notes cover a wide range: ${range(key)} semitones.`, `音的範圍很寬：${range(key)} 個半音。`]);
    void bass; void inner;
    return out;
  };
  function listen() {
    synth.unlock(); synth.stopAll();
    if (audioOn(synth)) scheduleEra(synth, qs[q], synth.clock() + LEAD, false);
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
    R.msg.innerHTML = 'The tune is always the same. Which style of writing is it?<span class="zh">旋律都一樣。這是哪一種寫法？</span>';
  }
  function answer(key) {
    if (done) return;
    const btn = R.opts.find((x) => x.getAttribute('data-pick') === key), era = eraOf(qs[q]);
    if (key === qs[q]) {
      done = true; if (!tried) first++;
      btn.classList.add('is-right'); R.opts.forEach((x) => { x.disabled = true; });
      showHint();
      R.msg.innerHTML = `Yes: the ${era.en} style. This is our own simple imitation of its typical features, not a real piece from the period.<span class="zh">答對了：${era.zh}式。這是我們依典型特徵做的簡單模仿，不是那個時期的真曲子。</span>`;
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
    if (R.next.dataset.again) { delete R.next.dataset.again; qs = makeEraRounds(mulberry32(seed()), 6); q = 0; first = 0; R.score.textContent = '0 / 0'; ask(); return; }
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
  root.__eraq = { round: () => ({ era: qs[q] }), answer, score: () => ({ first, q }), listen };
}

function init2D() {
  const bar = document.querySelector('[data-mu-soundbar]'); if (bar) initSoundbar(bar);
  const q = document.querySelector('[data-mu-eraq]'); if (q) initEraQ(q);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-museras-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
void ERAS;
