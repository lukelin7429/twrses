import assert from 'node:assert/strict';
import { createSynth } from '../src/synth.js';
import { DYNAMICS, MELODY, MELODY_BEATS, SIGNS, TEMPOS, dynOf, lerpGain, makeSignRounds, makeTempoRounds, melodySeconds, planMelody, tempoOf } from '../src/dynamics.js';
import { mulberry32, midiToFreq } from '../src/pitch.js';

const near = (a, b, eps, m = '') => assert.ok(Math.abs(a - b) <= eps, `${m} expected ${b}, got ${a}`);

// 力度階梯：由弱到強，增益遞增、最大是 1、每一階約 3 dB
assert.deepEqual(DYNAMICS.map((d) => d.key), ['pp', 'p', 'mp', 'mf', 'f', 'ff']);
for (let i = 1; i < DYNAMICS.length; i++) {
  assert.ok(DYNAMICS[i].gain > DYNAMICS[i - 1].gain);
  const db = 20 * Math.log10(DYNAMICS[i].gain / DYNAMICS[i - 1].gain);
  assert.ok(db > 1.5 && db < 5.5, `step ${i} is ${db.toFixed(1)} dB`);
}
assert.equal(DYNAMICS[DYNAMICS.length - 1].gain, 1);
assert.equal(dynOf('mf').it, 'mezzo forte');
assert.equal(dynOf('p').it, 'piano'); assert.equal(dynOf('f').it, 'forte');

// 速度階梯：由慢到快，BPM 遞增、都在節拍器範圍內（40–180）
assert.deepEqual(TEMPOS.map((t) => t.key), ['largo', 'adagio', 'andante', 'moderato', 'allegro', 'presto']);
for (let i = 1; i < TEMPOS.length; i++) assert.ok(TEMPOS[i].bpm > TEMPOS[i - 1].bpm);
assert.ok(TEMPOS.every((t) => t.bpm >= 40 && t.bpm <= 180));
assert.equal(tempoOf('allegro').it, 'allegro');

// 旋律：四小節、16 拍、音在 C4–A4 之間
assert.equal(MELODY_BEATS, 16);
assert.ok(MELODY.every(([m]) => m >= 60 && m <= 69));
near(melodySeconds(120), 8, 1e-12); near(melodySeconds(60), 16, 1e-12);

// 排程：時間照拍數累加、頻率是 midiToFreq
{
  const ev = planMelody({ bpm: 120, dyn: 'mf' });
  assert.equal(ev.length, MELODY.length);
  near(ev[0].time, 0, 1e-12); near(ev[1].time, 0.5, 1e-12);
  near(ev[5].time + ev[5].dur, ev[6].time, 1e-12, 'no gaps');
  near(ev[ev.length - 1].time + ev[ev.length - 1].dur, 8, 1e-9);
  near(ev[0].freq, midiToFreq(60), 1e-9);
  assert.ok(ev.every((e) => e.gain === dynOf('mf').gain), 'steady keeps one gain');
  // 速度加倍，時間減半
  const e2 = planMelody({ bpm: 240, dyn: 'mf' });
  near(e2[7].time * 2, ev[7].time, 1e-12);
}
// 漸強：增益單調遞增，從 dyn 的前兩階到後兩階；漸弱相反
{
  const c = planMelody({ bpm: 100, dyn: 'mf', shape: 'cresc' });
  for (let i = 1; i < c.length; i++) assert.ok(c[i].gain >= c[i - 1].gain - 1e-12);
  near(c[0].gain, dynOf('p').gain, 1e-9, 'starts two steps below mf');
  near(c[c.length - 1].gain, dynOf('ff').gain, 1e-9, 'ends two steps above mf (capped at ff)');
  const d = planMelody({ bpm: 100, dyn: 'mf', shape: 'dim' });
  for (let i = 1; i < d.length; i++) assert.ok(d[i].gain <= d[i - 1].gain + 1e-12);
  near(d[0].gain, dynOf('ff').gain, 1e-9); near(d[d.length - 1].gain, dynOf('p').gain, 1e-9);
  // 邊界：pp 的漸強不會低於 pp
  assert.ok(planMelody({ bpm: 100, dyn: 'pp', shape: 'cresc' })[0].gain >= dynOf('pp').gain - 1e-12);
  // 增益永遠不超過 1（ff 不會比最大音量大）
  for (const dyn of DYNAMICS) for (const shape of ['steady', 'cresc', 'dim']) assert.ok(planMelody({ bpm: 100, dyn: dyn.key, shape }).every((e) => e.gain <= 1 + 1e-12 && e.gain > 0));
}
near(lerpGain(0.1, 1, 0), 0.1, 1e-12); near(lerpGain(0.1, 1, 1), 1, 1e-12); near(lerpGain(0.1, 1, 0.5), Math.sqrt(0.1), 1e-12);

// 題目
{
  const r = makeSignRounds(mulberry32(9), 6);
  assert.equal(r.length, 6);
  for (const s of SIGNS) assert.ok(r.includes(s.key), `${s.key} appears`);
  for (let i = 1; i < r.length; i++) assert.notEqual(r[i], r[i - 1]);
  assert.deepEqual(makeSignRounds(mulberry32(9), 6), r);
  const t = makeTempoRounds(mulberry32(4), 5);
  assert.equal(t.length, 5);
  for (const q of t) {
    const a = TEMPOS.findIndex((x) => x.key === q.first), b = TEMPOS.findIndex((x) => x.key === q.second);
    assert.ok(Math.abs(a - b) >= 2);
    assert.equal(q.faster, a > b ? 'first' : 'second');
  }
}

// 合成器：tone 可以排在未來（at），在那之前不算「正在響」
{
  const log = []; let t = 0;
  const param = (n) => ({ setValueAtTime(v, at) { log.push([n, 'set', v, at]); }, linearRampToValueAtTime(v, at) { log.push([n, 'ramp', v, at]); }, setTargetAtTime(v, at, tau) { log.push([n, 'target', v, at, tau]); }, cancelScheduledValues() {} });
  class Ctx { constructor() { this.state = 'running'; this.destination = {}; } get currentTime() { return t; } resume() {} suspend() {}
    createGain() { return { gain: param('gain'), connect() {}, disconnect() {} }; } createDynamicsCompressor() { return { connect() {} }; }
    createBuffer() { return {}; } createBufferSource() { return { connect() {}, start() {} }; }
    createOscillator() { return { frequency: param('freq'), connect() {}, disconnect() {}, start(at) { log.push(['osc', 'start', at]); }, stop(at) { log.push(['osc', 'stop', at]); } }; } }
  const s = createSynth({ win: { AudioContext: Ctx, document: { hidden: false, addEventListener() {} }, addEventListener() {} } });
  s.unlock(); t = 1;
  const v = s.tone(440, { at: 3, dur: 0.5, gain: 0.5, sustain: true });
  assert.ok(v);
  assert.ok(log.some((e) => e[0] === 'osc' && e[1] === 'start' && e[2] === 3), 'starts at the scheduled time');
  assert.ok(log.some((e) => e[0] === 'freq' && e[1] === 'set' && e[3] === 3));
  assert.equal(s.hz(), 0, 'not sounding before its time');
  t = 3.2; assert.equal(s.hz(), 440);
  s.stopAll(); assert.equal(s.hz(), 0);
  // at 比現在早：從現在開始
  t = 5; s.tone(330, { at: 2 }); assert.ok(log.some((e) => e[0] === 'osc' && e[1] === 'start' && e[2] === 5));
}
console.log('dynamics.test.mjs ok');
