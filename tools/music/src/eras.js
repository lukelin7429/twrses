/*
 * 音樂 Music · 第十三課「西洋古典音樂四百年怎麼變？」的純函式：同一段自己寫的旋律，用巴洛克式、古典式、浪漫式三種「寫法」排成時間。
 * 沒有 DOM、沒有聲音，node 就能測：test/eras.test.mjs。
 *
 * 約定（出處見 CLAUDE.md「音樂」一節第十三課）：
 *   - 旋律是我們自己寫的（4 小節、16 拍、C 大調、結束在主音），不是任何現成的樂曲。
 *   - 三個時期是常用的名稱，年代邊界是約略的；三種「寫法」是我們依各時期的**典型特徵**做的簡化示範，不是某位作曲家或某首曲子。
 *   - 巴洛克式：通奏低音（持續進行的低音）、短而亮的大鍵琴式音、階梯式的力度（突然變大或變小）、裝飾音。
 *   - 古典式：對稱的樂句、阿貝爾提低音（低-高-中-高的分解和弦）、力度漸強漸弱、清楚的主和弦與屬和弦。
 *   - 浪漫式：較寬的音域、速度的彈性（rubato）、大幅度的力度變化、較豐富的和聲（借用小調的四級和弦）。
 */
import { midiToFreq } from './pitch.js';

export const MELODY = [   // [midi, beats]
  [64, 1], [67, 1], [72, 2],          // E4 G4 C5
  [74, 1], [71, 1], [67, 2],          // D5 B4 G4
  [69, 1], [72, 1], [77, 1], [76, 1], // A4 C5 F5 E5
  [74, 1], [71, 1], [72, 2],          // D5 B4 C5
];
export const MELODY_BEATS = MELODY.reduce((s, n) => s + n[1], 0);
/** 每小節的和弦（根音 midi、類型）：每個時期不同 */
const C3 = 48, G2 = 43, A2 = 45, F2 = 41, D2 = 38;
const TRIAD = { maj: [0, 4, 7], min: [0, 3, 7], dom7: [0, 4, 7, 10] };
const CHORDS = {
  baroque: [[C3, 'maj'], [G2, 'maj'], [F2, 'maj'], [G2, 'maj']],
  classical: [[C3, 'maj'], [G2, 'dom7'], [F2, 'maj'], [G2, 'dom7']],
  romantic: [[C3, 'maj'], [G2, 'dom7'], [A2, 'min'], [F2, 'min']],   // 最後一小節：借用小調的四級和弦，再回到主和弦
};
export const ERAS = [
  { key: 'baroque', en: 'Baroque', zh: '巴洛克', bpm: 104, voice: 'harpsichord' },
  { key: 'classical', en: 'Classical', zh: '古典', bpm: 96, voice: 'fortepiano' },
  { key: 'romantic', en: 'Romantic', zh: '浪漫', bpm: 72, voice: 'piano' },
];
export const eraOf = (k) => ERAS.find((e) => e.key === k);

/** 一個時期的力度（0–1）隨拍數（0–16）的變化 */
export function dynamicAt(era, beat) {
  const bar = Math.floor(beat / 4);
  if (era === 'baroque') return bar < 2 ? 1.0 : 0.5;                                  // 階梯式：突然變小
  if (era === 'classical') {                                                          // 漸強、再漸弱
    if (beat < 12) return 0.5 + 0.4 * (beat / 12);
    return 0.9 - 0.45 * ((beat - 12) / 4);
  }
  const x = beat / MELODY_BEATS;                                                      // 浪漫：由很輕，大起大落，再慢慢消失
  return Math.max(0.12, 0.2 + 0.8 * Math.sin(Math.PI * Math.min(1, x * 1.15)) ** 2);
}
/** 浪漫式的彈性速度：每一拍的長度倍率（句尾放慢） */
export function rubato(era, beat) {
  if (era !== 'romantic') return 1;
  const inBar = beat % 4;
  const barEnd = inBar >= 2 ? 1 + 0.18 * ((inBar - 2) / 2) : 1;    // 小節後半漸慢
  const last = beat >= 14 ? 1.35 : 1;                                // 最後收尾更慢
  return barEnd * last;
}

/** 把一個時期排成事件：[{ time(秒), dur(秒), midi, gain(0–1), part:'melody'|'bass'|'inner', voice, beat }] */
export function renderEra(key) {
  const era = eraOf(key), spb = 60 / era.bpm, ch = CHORDS[key];
  const ev = [];
  // 拍 → 秒（含 rubato）：累積每一拍的長度
  const timeAt = (beat) => { let t = 0; const n = Math.floor(beat); for (let b = 0; b < n; b++) t += spb * rubato(key, b); return t + (beat - n) * spb * rubato(key, n); };
  const add = (beat, beats, midi, gainK, part, extra = {}) => {
    const t0 = timeAt(beat), t1 = timeAt(beat + beats);
    ev.push({ time: t0, dur: t1 - t0, midi, gain: Math.min(1, dynamicAt(key, beat) * gainK), part, voice: era.voice, beat, ...extra });
  };
  // 旋律
  let b = 0;
  MELODY.forEach(([m, n], idx) => {
    const art = key === 'baroque' ? 0.55 : key === 'classical' ? 0.9 : 1.0;
    const t0 = timeAt(b), t1 = timeAt(b + n);
    ev.push({ time: t0, dur: (t1 - t0) * art, midi: m, gain: dynamicAt(key, b), part: 'melody', voice: era.voice, beat: b });
    // 巴洛克的裝飾音：第一個長音（C5）前面加一個很快的上鄰音（mordent 式），在原音之前
    if (key === 'baroque' && idx === 2) ev.push({ time: t0 - 0.06, dur: 0.06, midi: m + 2, gain: dynamicAt(key, b) * 0.8, part: 'ornament', voice: era.voice, beat: b });
    b += n;
  });
  // 伴奏
  for (let bar = 0; bar < 4; bar++) {
    const [root, type] = ch[bar], notes = TRIAD[type].map((s) => root + s);
    const beat0 = bar * 4;
    if (key === 'baroque') {                       // 通奏低音：每半拍一個音，持續進行（走動的低音）
      for (let i = 0; i < 8; i++) add(beat0 + i * 0.5, 0.5, i % 2 ? notes[0] + 12 * 0 + (i % 4 === 1 ? 7 : 12) : notes[0], 0.7, 'bass', { voice: 'harpsichord' });
    } else if (key === 'classical') {              // 阿貝爾提低音：低-高-中-高，每半拍一個
      const lo = notes[0] + 12, mid = notes[1] + 12, hi = notes[2] + 12;
      for (let i = 0; i < 8; i++) add(beat0 + i * 0.5, 0.5, [lo, hi, mid, hi][i % 4], 0.55, 'inner');
    } else {                                       // 浪漫：低音加寬廣的分解和弦（跨兩個八度）
      add(beat0, 4, root - 12, 0.7, 'bass');
      const arp = [notes[0], notes[1], notes[2], notes[0] + 12, notes[1] + 12, notes[2] + 12];
      for (let i = 0; i < 6; i++) add(beat0 + i * (4 / 6), 4 / 6, arp[i] + 12, 0.45, 'inner');
    }
  }
  ev.sort((a, c) => a.time - c.time);
  return ev;
}
export const totalSeconds = (key) => { const e = renderEra(key).filter((x) => x.part === 'melody'); const l = e[e.length - 1]; return l.time + l.dur; };
export const melodyMidis = (key) => renderEra(key).filter((e) => e.part === 'melody').map((e) => e.midi);
export const range = (key) => { const m = renderEra(key).map((e) => e.midi); return Math.max(...m) - Math.min(...m); };
export const freqOf = (midi) => midiToFreq(midi);

/** 每個時期的特徵（給頁面的「特徵清單」；每一項都有出處才放進頁面） */
export const FEATURE_KEYS = {
  baroque: ['continuo', 'terraced', 'ornament', 'harpsichord'],
  classical: ['alberti', 'balanced', 'crescendo', 'fortepiano'],
  romantic: ['wide', 'rubato', 'dynamics', 'harmony'],
};

export function makeEraRounds(rng, n = 6) {
  const keys = ERAS.map((e) => e.key), out = keys.slice();
  while (out.length < n) out.push(keys[Math.floor(rng() * keys.length)]);
  for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [out[i], out[j]] = [out[j], out[i]]; }
  for (let i = 1; i < out.length; i++) if (out[i] === out[i - 1]) { const j = out.findIndex((k, x) => x > i && k !== out[i] && out[x - 1] !== k); if (j > 0) [out[i], out[j]] = [out[j], out[i]]; }
  return out.slice(0, n);
}
