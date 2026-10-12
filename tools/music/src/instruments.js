/*
 * 音樂 Music · 第九課「樂器怎麼發出聲音？」的純函式：四個家族（弦、空氣柱、膜、體）、各家族的泛音比、改變音高的比例關係、振動的形狀。
 * 沒有 DOM、沒有聲音，node 就能測：test/instruments.test.mjs。
 *
 * 約定（每一項的出處見 CLAUDE.md「音樂」一節第九課）：
 *   - 弦：f ∝ (1/L)·√(T/μ)（Mersenne 定律；Wikipedia “String vibration”）；諧波是 1、2、3…倍。
 *   - 空氣柱：開管 n＝1、2、3…；閉管（一端封閉）n＝1、3、5…，基音比同長度開管低一個八度；f ∝ 1/L（Wikipedia “Acoustic resonance”）。
 *   - 膜：理想圓膜各模式頻率比 1、1.593、2.135、2.295、2.917（Penn State 的 Russell 頁；Bessel 零點 2.40483、3.83171、5.13562、5.52008、7.01559）；
 *     f ∝ √T ÷ D（HyperPhysics 的圓膜頁：f01 = (0.766/D)·√(T/σ)）。
 *   - 體（棒）：兩端自由的棒，ω ∝ (β_n L)²，β_n L ＝ 1.50562π、2.49975π、3.50001π、4.50000π（Wikipedia “Euler–Bernoulli beam theory”），
 *     比值 1 : 2.757 : 5.404 : 8.933；ω ∝ β²·√(EI/μ)，β ∝ 1/L，所以 f ∝ t / L²（t 是棒的厚度）。
 *   - 鐘（調好音的）：低音（hum）、敲擊音（strike）、小三度音（tierce）、五度音（quint）、高八度（nominal）；
 *     相對 hum 是 1、2、2.4、3、4（用 Wikipedia “Bell (instrument)” 給的音程算出來的純律比）。
 *   - 這些聲音是我們自己合成的簡化配方，不是真樂器的錄音。
 */

export const FAMILIES = [
  { key: 'string', en: 'String', zh: '弦', hs_en: 'chordophone', hs_zh: '弦鳴樂器', icon: '🎻',
    vibrates_en: 'a stretched string', vibrates_zh: '一條拉緊的弦', start_en: 'plucked, bowed, or struck', start_zh: '撥、拉（弓）、或敲',
    pitch_en: 'shorter, tighter, or lighter string', pitch_zh: '弦縮短、拉緊、或換輕的弦', ex_en: 'guitar, violin, piano, erhu, pipa', ex_zh: '吉他、小提琴、鋼琴、二胡、琵琶' },
  { key: 'air', en: 'Air column', zh: '空氣柱', hs_en: 'aerophone', hs_zh: '氣鳴樂器', icon: '🎷',
    vibrates_en: 'the air inside a tube', vibrates_zh: '管子裡的空氣', start_en: 'blown across an edge, or through a reed or buzzing lips', start_zh: '吹過邊緣、簧片，或用嘴唇振動',
    pitch_en: 'shorter tube (finger holes, valves, slide)', pitch_zh: '管子縮短（按音孔、活塞、滑管）', ex_en: 'flute, clarinet, trumpet, the Chinese flute (di)', ex_zh: '長笛、單簧管、小號、笛' },
  { key: 'membrane', en: 'Membrane', zh: '膜', hs_en: 'membranophone', hs_zh: '膜鳴樂器', icon: '🥁',
    vibrates_en: 'a stretched skin or plastic head', vibrates_zh: '一張拉緊的皮或膜', start_en: 'struck with sticks or hands', start_zh: '用鼓槌或手敲',
    pitch_en: 'tighter head, or a smaller drum', pitch_zh: '鼓皮拉緊，或鼓比較小', ex_en: 'snare drum, timpani, the Chinese drum (gu)', ex_zh: '小鼓、定音鼓、鼓' },
  { key: 'body', en: 'Body', zh: '體', hs_en: 'idiophone', hs_zh: '體鳴樂器', icon: '🔔',
    vibrates_en: 'the instrument itself: a bar, plate, or bell', vibrates_zh: '樂器本身：棒、板或鐘', start_en: 'struck, shaken, or scraped', start_zh: '敲、搖或刮',
    pitch_en: 'shorter, thicker bar, or a smaller bell', pitch_zh: '棒縮短、變厚，或鐘比較小', ex_en: 'xylophone, marimba, bell, gong (luo)', ex_zh: '木琴、馬林巴琴、鐘、鑼' },
];
export const familyOf = (k) => FAMILIES.find((f) => f.key === k);

// ── 各家族的泛音比與相對振幅 ────────────────────────────────────────────────
export const stringPartials = (n = 8) => ({ ratios: Array.from({ length: n }, (_, i) => i + 1), amps: Array.from({ length: n }, (_, i) => 1 / (i + 1)) });
export const airPartials = (closed = true, n = 4) => {
  const ratios = Array.from({ length: n }, (_, i) => (closed ? 2 * i + 1 : i + 1));
  return { ratios, amps: ratios.map((r) => 1 / r) };
};
/** 理想圓膜的模式頻率比（Russell；(0,1)、(1,1)、(2,1)、(0,2)、(1,2)） */
export const MEMBRANE_RATIOS = [1, 1.593, 2.135, 2.295, 2.917];
export const MEMBRANE_ZEROS = [2.40483, 3.83171, 5.13562, 5.52008, 7.01559];
export const membranePartials = () => ({ ratios: MEMBRANE_RATIOS.slice(), amps: [1, 0.7, 0.5, 0.4, 0.3] });
/** 兩端自由的棒：β_n L ÷ π */
export const BAR_ROOTS = [1.50562, 2.49975, 3.50001, 4.5];
export const barRatios = () => BAR_ROOTS.map((r) => (r / BAR_ROOTS[0]) ** 2);
export const barPartials = () => ({ ratios: barRatios(), amps: [1, 0.55, 0.3, 0.18] });
/** 調好音的鐘：hum、strike、tierce、quint、nominal（相對 hum） */
export const BELL_NAMES = ['hum', 'strike', 'tierce', 'quint', 'nominal'];
export const BELL_RATIOS = [1, 2, 2.4, 3, 4];
export const bellPartials = () => ({ ratios: BELL_RATIOS.slice(), amps: [0.7, 1, 0.55, 0.4, 0.3] });

/** 這個家族的聲音配方：{ kind:'complex'|'inharmonic', ratios, amps, ... }（給合成器；頻率 f0） */
export function recipe(family, f0, variant = 0) {
  if (family === 'string') { const p = stringPartials(8); return { kind: 'complex', amps: p.amps, dur: 2.2, env: { attack: 0.004, decay: 1.6, sustain: 0 }, noise: null, f0 }; }
  if (family === 'air') { const p = airPartials(true, 5); return { kind: 'complex', amps: [1, 0, 0.45, 0, 0.25, 0, 0.12], dur: 1.6, env: { attack: 0.09, decay: 0.4, sustain: 0.8 }, ratios: p.ratios, noise: { freq: f0 * 3, q: 1.2, dur: 0.5, gain: 0.12, type: 'bandpass' }, f0 }; }
  if (family === 'membrane') { const p = membranePartials(); return { kind: 'inharmonic', ratios: p.ratios, amps: p.amps, dur: 0.7, damp: 3, noise: { freq: f0 * 1.5, q: 0.8, dur: 0.12, gain: 0.5, type: 'lowpass' }, f0 }; }
  const p = variant ? bellPartials() : barPartials();
  return { kind: 'inharmonic', ratios: p.ratios, amps: p.amps, dur: variant ? 3 : 1.8, damp: variant ? 0.25 : 0.5, noise: null, f0 };
}

// ── 怎麼讓它變高（相對於基準頻率 f0 的比例關係）──────────────────────────────
/** 弦：長度比 L（1＝原來）、張力比 T、線密度比 μ */
export const stringFreq = (f0, L = 1, T = 1, mu = 1) => (f0 / L) * Math.sqrt(T / mu);
/** 空氣柱：管長比 L */
export const pipeFreq = (f0, L = 1) => f0 / L;
/** 鼓：鼓皮張力比 T、直徑比 D */
export const drumFreq = (f0, T = 1, D = 1) => (f0 * Math.sqrt(T)) / D;
/** 棒：長度比 L、厚度比 t：f ∝ t / L² */
export const barFreq = (f0, L = 1, t = 1) => (f0 * t) / (L * L);

// ── 振動的形狀（畫 3D 用）─────────────────────────────────────────────────────
function besselSeries(n, x) {
  // J_n(x) 的冪級數（|x| 小於約 8 時足夠準）
  let term = (x / 2) ** n / [1, 1, 2, 6][n], sum = term;
  for (let k = 1; k < 30; k++) { term *= -((x / 2) ** 2) / (k * (k + n)); sum += term; }
  return sum;
}
export const J0 = (x) => besselSeries(0, x);
export const J1 = (x) => besselSeries(1, x);
/** 圓膜 (0,1) 模式：半徑 ρ（0–1）的位移 */
export const membraneMode01 = (rho) => J0(MEMBRANE_ZEROS[0] * rho);
/** 圓膜 (1,1) 模式：半徑 ρ、角度 θ 的位移 */
export const membraneMode11 = (rho, theta) => J1(MEMBRANE_ZEROS[1] * rho) * Math.cos(theta);
/** 兩端自由的棒第 n 個模式（n＝1、2、…）：x（0–1）的位移；β_n L ＝ BAR_ROOTS[n−1]·π */
export function barMode(n, x) {
  const BL = BAR_ROOTS[n - 1] * Math.PI;
  const sigma = (Math.cosh(BL) - Math.cos(BL)) / (Math.sinh(BL) - Math.sin(BL));
  const b = BL * x;
  return Math.cosh(b) + Math.cos(b) - sigma * (Math.sinh(b) + Math.sin(b));
}
/** 第一個模式（兩端最大、中間反向；兩個節點離兩端約 0.224） */
export const barMode1 = (x) => barMode(1, x);
/** 一端封閉、一端開的管，基音模式：從封閉端 0 到開口端 1 的位移（封閉端是節點，開口端最大） */
export const closedPipeDisp = (x) => Math.sin((Math.PI / 2) * x);

/** 題目：「這是哪一家的聲音？」n 題，每個家族至少一次，其餘隨機；頻率在 196、220、262、330 Hz 之間 */
export function makeFamilyRounds(rng, n = 6) {
  const keys = FAMILIES.map((f) => f.key), out = keys.slice();
  while (out.length < n) out.push(keys[Math.floor(rng() * keys.length)]);
  for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [out[i], out[j]] = [out[j], out[i]]; }
  // 相鄰不同
  for (let i = 1; i < out.length; i++) if (out[i] === out[i - 1]) { const j = out.findIndex((k, x) => x > i && k !== out[i] && out[x - 1] !== k); if (j > 0) [out[i], out[j]] = [out[j], out[i]]; }
  const hz = [196, 220, 262, 330];
  return out.slice(0, n).map((family) => ({ family, f0: hz[Math.floor(rng() * hz.length)], variant: family === 'body' && rng() < 0.5 ? 1 : 0 }));
}
