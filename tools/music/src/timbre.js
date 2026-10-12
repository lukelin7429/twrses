/*
 * 音樂 Music · 第二課「音色」的純函式：泛音的頻率與振幅、波形、撥弦位置、包絡。沒有 DOM、沒有聲音，node 就能測：test/timbre.test.mjs。
 *
 * 約定：
 *   - 一個樂音由基音（第 1 諧波，頻率 f0）加上第 2、3、4……諧波（頻率 n × f0）疊成；amps[n-1] 是第 n 諧波的相對振幅。
 *   - 「泛音」（overtone）的編號比「諧波」（harmonic）差一：第 1 泛音＝第 2 諧波。程式與頁面一律用「第 n 諧波」。
 *   - 波形：y(t) = Σ amps[n-1] · sin(2π n f0 t)；為了不爆音，整個波形的尖峰一律縮到 1（normalizePeak）。
 *   - 理想的撥弦（在弦長 p 處拉開再放手）：第 n 模式的振幅 ∝ sin(nπp) / n²。
 */

export const K = 8;   // 滑桿與波形用到第幾諧波

export const harmonicFreq = (f0, n) => f0 * n;

/** 四個示意的「配方」（相對振幅，第 1…8 諧波）。名稱描述的是配方，不是哪一種樂器。 */
export const RECIPES = {
  pure: { en: 'Only the fundamental', zh: '只有基音', amps: [1, 0, 0, 0, 0, 0, 0, 0] },
  all: { en: 'All harmonics, fading as 1/n', zh: '全部諧波，依 1/n 變弱', amps: [1, 1 / 2, 1 / 3, 1 / 4, 1 / 5, 1 / 6, 1 / 7, 1 / 8] },
  odd: { en: 'Odd harmonics only, fading as 1/n', zh: '只有奇數諧波，依 1/n 變弱', amps: [1, 0, 1 / 3, 0, 1 / 5, 0, 1 / 7, 0] },
  soft: { en: 'Odd harmonics only, fading as 1/n²', zh: '只有奇數諧波，依 1/n² 變弱', amps: [1, 0, 1 / 9, 0, 1 / 25, 0, 1 / 49, 0] },
};

/** 兩個示意的包絡（秒）：撥奏或敲擊（一開始最大、慢慢衰減）／拉奏（慢慢起音、可以維持） */
export const ENVELOPES = {
  struck: { en: 'Struck or plucked', zh: '敲擊或撥奏', attack: 0.005, decay: 1.4, sustain: 0 },
  bowed: { en: 'Bowed', zh: '拉奏', attack: 0.15, decay: 0.2, sustain: 0.85 },
};

/** 波形在相位 ph（0–1 為一個週期）的值（未正規化） */
export function waveAt(amps, ph) {
  let y = 0;
  for (let k = 0; k < amps.length; k++) if (amps[k]) y += amps[k] * Math.sin(2 * Math.PI * (k + 1) * ph);
  return y;
}

/** 一個週期取 n 個點 */
export function waveSamples(amps, n = 256) {
  return Array.from({ length: n }, (_, i) => waveAt(amps, i / n));
}

/** 波形尖峰（取樣 n 點的最大絕對值） */
export function peakOf(amps, n = 512) {
  let m = 0;
  for (let i = 0; i < n; i++) m = Math.max(m, Math.abs(waveAt(amps, i / n)));
  return m;
}

/** 把振幅整體縮放，讓波形尖峰剛好是 1（全部是 0 就原樣回傳） */
export function normalizePeak(amps) {
  const p = peakOf(amps);
  return p > 1e-9 ? amps.map((a) => a / p) : amps.slice();
}

/** 均方根（響度的粗略指標）：同樣尖峰下，泛音越多，RMS 越小 */
export function rms(amps) {
  let s = 0;
  for (const a of amps) s += a * a;
  return Math.sqrt(s / 2);
}

/** 理想撥弦：在弦長的 p（0–1）處撥，第 1…n 模式的相對振幅（以 max＝1 正規化）。 */
export function pluckAmps(p, n = K) {
  const raw = Array.from({ length: n }, (_, i) => Math.abs(Math.sin((i + 1) * Math.PI * p)) / ((i + 1) ** 2));
  const m = Math.max(...raw);
  return m > 1e-12 ? raw.map((a) => (Math.abs(a) < 1e-12 ? 0 : a / m)) : raw;
}

/** 第 n 個模式的節點位置（弦長 0–1，不含兩端）：j / n */
export const nodePositions = (n) => Array.from({ length: n - 1 }, (_, j) => (j + 1) / n);

/** 包絡在 t 秒的振幅（0–1）：attack 線性升到 1，之後指數衰減到 sustain 水準（時間常數 decay/3） */
export function envelopeAt(t, { attack, decay, sustain }) {
  if (t <= 0) return 0;
  if (t < attack) return t / attack;
  return sustain + (1 - sustain) * Math.exp(-(t - attack) / (decay / 3));
}

/** 「哪一個波形？」的題目：從四個配方挑出 6 題（固定種子可重現），每題答案是 RECIPES 的 key */
export function makeWhichRounds(rng, n = 6) {
  const keys = Object.keys(RECIPES);
  const out = [];
  let prev = null;
  for (let i = 0; i < n; i++) {
    let k;
    do { k = keys[Math.floor(rng() * keys.length)]; } while (k === prev);
    out.push(k); prev = k;
  }
  return out;
}
