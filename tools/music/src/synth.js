/*
 * 音樂 Music · 聲音引擎：用 Web Audio API 自己合成聲音（不放任何現成錄音檔，沒有版權問題）。
 *
 *   const s = createSynth({ win: window });
 *   s.unlock()                 在使用者點擊的處理函式裡呼叫一次；之前不會發出任何聲音（瀏覽器規定，iOS Safari 尤其嚴格）
 *   s.tone(freq, opts)         彈一個音：15 ms 起音、之後指數衰減收音，不爆音；回傳 voice
 *   s.hold(freq, opts)         持續的音（拖動弦長、按住不放）：v.setFreq(f) 平滑滑音、v.release() 收音
 *   s.stopAll()                全部收音（離開分頁、捲走、朗讀開始時呼叫）
 *   s.setVolume(0–1)、s.setMuted(bool)
 *   s.nowPlaying()             [{ freq, kind }]：現在還在響的音（程式記的「目標頻率」，除錯與測試用）
 *   s.hz()                     現在正在發幾赫茲（沒有聲音是 0；多個音取最後開始的那一個）
 *   s.subscribe(fn)            狀態改變時呼叫 fn(state)
 *
 * 安全：主音量預設 0.3，經過一個壓縮器（DynamicsCompressor）才進喇叭；高於 4 kHz 的音自動壓低（safeScale）。
 * 沒有 Web Audio（或使用者還沒點）時 tone／hold 什麼都不做、也不丟錯，頁面照樣能看、能操作。
 */
import { safeScale } from './pitch.js';

export const DEFAULT_VOLUME = 0.3;
const ATTACK = 0.015;     // 秒
const RELEASE_TAU = 0.04; // 收音的時間常數（秒）
const GLIDE_TAU = 0.012;  // 滑音的時間常數（秒）
const VOICE_PEAK = 0.4;   // 單一個音的峰值（再乘主音量）
const MAX_VOICES = 8;

/** 主音量 0–1 → 增益：略帶曲線，小聲時比較細緻；最大 0.8 */
export const volumeToGain = (v) => Math.max(0, Math.min(1, v)) ** 1.5 * 0.8;

export function createSynth({ win = typeof window !== 'undefined' ? window : null, volume = DEFAULT_VOLUME } = {}) {
  const Ctor = win && (win.AudioContext || win.webkitAudioContext);
  const state = { supported: !!Ctor, unlocked: false, muted: false, volume, playing: 0 };
  const listeners = new Set();
  const voices = new Set();
  let ctx = null, master = null, order = 0;
  const clicks = new Set();   // 排在未來的點擊聲：{ when, end, freq, osc, env }

  const emit = () => { state.playing = voices.size; listeners.forEach((fn) => fn(state)); };
  const level = () => (state.muted ? 0 : volumeToGain(state.volume));
  const now = () => (ctx ? ctx.currentTime : 0);

  function unlock() {
    if (!Ctor) return false;
    if (!ctx) {
      try {
        ctx = new Ctor();
        master = ctx.createGain();
        master.gain.value = level();
        const comp = ctx.createDynamicsCompressor();
        master.connect(comp);
        comp.connect(ctx.destination);
        // iOS：在手勢裡播一小段靜音，才算「解鎖」
        const b = ctx.createBuffer(1, 1, 22050), src = ctx.createBufferSource();
        src.buffer = b; src.connect(ctx.destination); src.start(0);
      } catch (e) { ctx = null; state.supported = false; emit(); return false; }
    }
    if (ctx.state === 'suspended' && ctx.resume) { try { ctx.resume(); } catch (e) { /* ignore */ } }
    if (!state.unlocked) { state.unlocked = true; emit(); }
    return true;
  }

  function retire(v, t) {
    voices.delete(v);
    try {
      v.env.gain.cancelScheduledValues(t);
      v.env.gain.setTargetAtTime(0, t, RELEASE_TAU);
      v.osc.stop(t + RELEASE_TAU * 8);
    } catch (e) { /* ignore */ }
  }

  function make(freq, { type = 'triangle', gain = 1, kind = 'tone', attack = ATTACK, amps = null, at = 0 } = {}) {
    if (!state.unlocked || !ctx || !(freq > 0)) return null;
    if (voices.size >= MAX_VOICES) { const oldest = [...voices].sort((a, b) => a.order - b.order)[0]; retire(oldest, now()); }
    const t = Math.max(at, now());      // at：想從 AudioContext 的哪個時間開始（排在未來）；預設現在
    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    let top = freq;   // 最高的成分（安全限制要看它）
    if (amps && ctx.createPeriodicWave && osc.setPeriodicWave) {
      const real = new Float32Array(amps.length + 1), imag = new Float32Array(amps.length + 1);
      amps.forEach((a, i) => { imag[i + 1] = a; if (a) top = freq * (i + 1); });
      osc.setPeriodicWave(ctx.createPeriodicWave(real, imag, { disableNormalization: true }));
    } else {
      osc.type = type;
    }
    osc.frequency.setValueAtTime(freq, t);
    env.gain.setValueAtTime(0, t);
    env.gain.linearRampToValueAtTime(VOICE_PEAK * gain * safeScale(top), t + attack);
    osc.connect(env); env.connect(master);
    osc.start(t);
    const v = { osc, env, freq, kind, order: ++order, gain, start: t, endAt: Infinity, partials: amps ? amps.slice() : null, top,
      setFreq(f) {
        if (!(f > 0)) return;
        v.freq = f;
        const tt = now();
        osc.frequency.setTargetAtTime(f, tt, GLIDE_TAU);
        env.gain.setTargetAtTime(VOICE_PEAK * v.gain * safeScale(f * (top / freq)), tt, 0.02);
      },
      release() { if (voices.has(v)) { retire(v, now()); emit(); } },
    };
    voices.add(v);
    osc.onended = () => { voices.delete(v); try { osc.disconnect(); env.disconnect(); } catch (e) { /* ignore */ } emit(); };
    emit();
    return v;
  }

  /** 彈一個音：dur 秒（音符的長度），之後收音。可以指定 type：'sine'｜'triangle'｜'square'｜'sawtooth' */
  function tone(freq, opts = {}) {
    const v = make(freq, { ...opts, kind: 'tone' });
    if (!v) return null;
    const dur = opts.dur ?? 0.9;
    v.endAt = v.start + dur;
    // 預設像撥弦一樣慢慢衰減（sustain: true 則音量不變，到時間才收）；opts.at 可以排在未來
    if (!opts.sustain) v.env.gain.setTargetAtTime(0.0001, v.start + ATTACK, dur / 3);
    v.timer = setTimeout(() => v.release(), Math.max(30, (v.endAt - now()) * 1000));
    const rel = v.release;
    v.release = () => { clearTimeout(v.timer); rel(); };
    return v;
  }

  /**
   * 疊了很多諧波的音：amps[n-1] 是第 n 諧波的相對振幅（尖峰要事先縮到 1，見 timbre.js 的 normalizePeak）。
   * env = { attack, decay, sustain }（秒、秒、0–1 的水準）：attack 秒線性升到最大，之後以 decay/3 的時間常數衰減到 sustain；
   * dur 秒後收音（0.08 秒內，不爆音）。
   */
  function toneComplex(freq, amps, opts = {}) {
    const env = opts.env || { attack: 0.01, decay: 1, sustain: 0 };
    const v = make(freq, { ...opts, amps, attack: Math.max(0.003, env.attack), kind: 'tone' });
    if (!v) return null;
    const dur = opts.dur ?? 1.5;
    v.endAt = now() + dur;
    const peak = VOICE_PEAK * v.gain * safeScale(v.top);
    v.env.gain.setTargetAtTime(Math.max(0.0001, peak * env.sustain), now() + Math.max(0.003, env.attack), Math.max(0.01, env.decay / 3));
    v.timer = setTimeout(() => v.release(), Math.max(30, dur * 1000));
    const rel = v.release;
    v.release = () => { clearTimeout(v.timer); rel(); };
    return v;
  }

  /**
   * 在 AudioContext 的時間軸上排一個短短的點擊聲（節拍器用）：when 是 AudioContext 時間（秒，見 clock()）。
   * 2 ms 起音、約 50 ms 指數衰減；高頻照 safeScale 壓低。沒解鎖、靜音時回傳 null。
   */
  function click(when, { freq = 1000, gain = 1, dur = 0.06 } = {}) {
    if (!state.unlocked || !ctx || state.muted || !(freq > 0)) return null;
    const t = Math.max(when, now());
    const osc = ctx.createOscillator(), env = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);
    env.gain.setValueAtTime(0, t);
    env.gain.linearRampToValueAtTime(VOICE_PEAK * gain * safeScale(freq), t + 0.002);
    env.gain.setTargetAtTime(0.0001, t + 0.002, dur / 3);
    osc.connect(env); env.connect(master);
    osc.start(t); osc.stop(t + dur * 4);
    const c = { when: t, end: t + dur, freq, osc, env };
    clicks.add(c);
    osc.onended = () => { clicks.delete(c); try { osc.disconnect(); env.disconnect(); } catch (e) { /* ignore */ } };
    return c;
  }
  function cancelClicks() {
    clicks.forEach((c) => { try { c.osc.stop(0); } catch (e) { /* ignore */ } });
    clicks.clear();
  }

  /** 持續的音：按住時一直響，放開（release）才收 */
  function hold(freq, opts = {}) {
    return make(freq, { ...opts, kind: 'hold' });
  }

  function stopAll() {
    const t = now();
    [...voices].forEach((v) => { clearTimeout(v.timer); retire(v, t); });
    cancelClicks();
    emit();
  }

  function setVolume(v) {
    state.volume = Math.max(0, Math.min(1, v));
    if (master) master.gain.setTargetAtTime(level(), now(), 0.03);
    emit();
  }
  function setMuted(m) {
    state.muted = !!m;
    if (master) master.gain.setTargetAtTime(level(), now(), 0.03);
    if (m) stopAll();
    emit();
  }

  function nowPlaying() {
    const t = now();
    const cl = [...clicks].filter((c) => c.when <= t && t < c.end).map((c) => ({ freq: c.freq, kind: 'click' }));
    return cl.concat([...voices].filter((v) => v.start <= t + 1e-9).sort((a, b) => a.order - b.order).map((v) => (v.partials ? { freq: v.freq, kind: v.kind, partials: v.partials } : { freq: v.freq, kind: v.kind })));
  }
  const hz = () => { const l = nowPlaying(); return l.length ? l[l.length - 1].freq : 0; };

  // 離開分頁就停；回來之後不自動響（要使用者再點）
  if (win && win.document) {
    win.document.addEventListener('visibilitychange', () => {
      if (win.document.hidden) { stopAll(); if (ctx && ctx.suspend) { try { ctx.suspend(); } catch (e) { /* ignore */ } } }
    });
    win.addEventListener('pagehide', () => stopAll());
  }

  return {
    state, unlock, tone, toneComplex, hold, click, cancelClicks, clock: () => now(), running: () => !!(ctx && ctx.state === 'running'), stopAll, setVolume, setMuted, nowPlaying, hz,
    subscribe: (fn) => { listeners.add(fn); return () => listeners.delete(fn); },
    get context() { return ctx; },
  };
}
