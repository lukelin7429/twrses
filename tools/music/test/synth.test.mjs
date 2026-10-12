import assert from 'node:assert/strict';
import { createSynth, volumeToGain, DEFAULT_VOLUME } from '../src/synth.js';

// 假的 Web Audio：只記下被排進去的事件
function makeWin() {
  const log = [];
  let t = 0;
  const param = (name) => ({ value: 0,
    setValueAtTime(v, at) { log.push([name, 'set', v, at]); }, linearRampToValueAtTime(v, at) { log.push([name, 'ramp', v, at]); },
    setTargetAtTime(v, at, tau) { log.push([name, 'target', v, at, tau]); }, cancelScheduledValues(at) { log.push([name, 'cancel', at]); } });
  class Ctx {
    constructor() { this.state = 'suspended'; this.destination = {}; log.push(['ctx', 'new']); }
    get currentTime() { return t; }
    resume() { this.state = 'running'; log.push(['ctx', 'resume']); }
    suspend() { this.state = 'suspended'; }
    createGain() { return { gain: param('gain'), connect() {}, disconnect() {} }; }
    createDynamicsCompressor() { return { connect() {} }; }
    createBuffer() { return {}; }
    createBufferSource() { return { connect() {}, start() { log.push(['silent', 'start']); } }; }
    createOscillator() { const o = { type: 'sine', frequency: param('freq'), connect() {}, disconnect() {}, start() { log.push(['osc', 'start', o.type]); }, stop(at) { log.push(['osc', 'stop', at]); } }; return o; }
  }
  const handlers = {};
  const doc = { hidden: false, addEventListener(n, fn) { handlers[n] = fn; } };
  const win = { AudioContext: Ctx, document: doc, addEventListener(n, fn) { handlers[n] = fn; } };
  return { win, log, handlers, doc, tick: (s) => { t += s; } };
}

// 沒有 Web Audio：什麼都不做、不丟錯
{
  const s = createSynth({ win: {} });
  assert.equal(s.state.supported, false);
  assert.equal(s.unlock(), false);
  assert.equal(s.tone(440), null);
  assert.equal(s.hold(440), null);
  assert.equal(s.hz(), 0);
  s.stopAll(); s.setVolume(0.5); s.setMuted(true);
}

// 使用者還沒點之前，不會發出聲音
{
  const { win, log } = makeWin();
  const s = createSynth({ win });
  assert.equal(s.state.supported, true);
  assert.equal(s.state.unlocked, false);
  assert.equal(s.tone(440), null);
  assert.equal(s.hz(), 0);
  assert.ok(!log.some((e) => e[0] === 'ctx' && e[1] === 'new'), 'no AudioContext before unlock');
  assert.equal(DEFAULT_VOLUME, 0.3);
  assert.equal(s.state.volume, 0.3);
  assert.ok(s.unlock());
  assert.equal(s.state.unlocked, true);
  assert.ok(log.some((e) => e[0] === 'ctx' && e[1] === 'resume'));
  assert.ok(log.some((e) => e[0] === 'silent'), 'plays a silent buffer to unlock iOS');
}

// 彈一個音：頻率正確、有起音（從 0 開始）、不是瞬間滿格
{
  const { win, log, tick } = makeWin();
  const s = createSynth({ win });
  s.unlock();
  const v = s.tone(261.6256, { dur: 0.5 });
  assert.ok(v);
  assert.equal(s.hz(), 261.6256);
  assert.deepEqual(s.nowPlaying(), [{ freq: 261.6256, kind: 'tone' }]);
  const setF = log.find((e) => e[0] === 'freq' && e[1] === 'set');
  assert.equal(setF[2], 261.6256);
  const g0 = log.find((e) => e[0] === 'gain' && e[1] === 'set' && e[2] === 0);
  assert.ok(g0, 'envelope starts at zero (no click)');
  const ramp = log.find((e) => e[0] === 'gain' && e[1] === 'ramp');
  assert.ok(ramp && ramp[2] > 0 && ramp[3] > 0, 'attack ramp has a duration');
  s.stopAll();
  assert.equal(s.hz(), 0);
  assert.ok(log.some((e) => e[0] === 'gain' && e[1] === 'target' && e[2] === 0), 'release ends at zero');
  assert.ok(log.some((e) => e[0] === 'osc' && e[1] === 'stop'));
  tick(1);
}

// 持續的音：滑音只改頻率；音量與靜音
{
  const { win, log } = makeWin();
  const s = createSynth({ win });
  s.unlock();
  const v = s.hold(220, { type: 'sine' });
  assert.equal(s.hz(), 220);
  v.setFreq(440);
  assert.equal(s.hz(), 440);
  assert.ok(log.some((e) => e[0] === 'freq' && e[1] === 'target' && e[2] === 440));
  v.release();
  assert.equal(s.hz(), 0);
  s.hold(330);
  s.setMuted(true);
  assert.equal(s.hz(), 0, 'muting stops everything');
  assert.equal(s.hold(330) !== null, true);
  s.setVolume(2); assert.equal(s.state.volume, 1);
  s.setVolume(-1); assert.equal(s.state.volume, 0);
  assert.equal(volumeToGain(0), 0);
  assert.ok(volumeToGain(1) <= 0.8 + 1e-12);
  assert.ok(volumeToGain(0.3) < volumeToGain(0.6));
}

// 高頻自動壓低振幅
{
  const { win, log } = makeWin();
  const s = createSynth({ win });
  s.unlock();
  s.hold(1000);
  s.hold(12000);
  const ramps = log.filter((e) => e[0] === 'gain' && e[1] === 'ramp').map((e) => e[2]);
  assert.ok(ramps[1] < ramps[0] * 0.5, 'a 12 kHz tone is much quieter than a 1 kHz tone');
}

// 離開分頁：全部收音
{
  const { win, handlers, doc } = makeWin();
  const s = createSynth({ win });
  s.unlock();
  s.hold(440);
  assert.equal(s.hz(), 440);
  doc.hidden = true;
  handlers.visibilitychange();
  assert.equal(s.hz(), 0);
}

// 訂閱
{
  const { win } = makeWin();
  const s = createSynth({ win });
  let n = 0;
  const off = s.subscribe(() => { n++; });
  s.unlock(); s.setVolume(0.5);
  assert.ok(n >= 2);
  off();
  const before = n; s.setVolume(0.6); assert.equal(n, before);
}
console.log('synth.test.mjs ok');
