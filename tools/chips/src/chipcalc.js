/*
 * 晶片與半導體 · 第一課的計算（純函式，node 測試在 test/doping.test.mjs）。
 *
 * 導電能力：σ = q (n μn + p μp)（單位 S/cm），電阻率 ρ = 1/σ（Ω·cm）。
 *   純矽（本質半導體）n = p = ni；摻雜後照電中性 n − p = Nd − Na、n p = ni² 解出 n、p。
 *   遷移率用 Caughey–Thomas 經驗式（300 K 的矽，參數同多數教科書的擬合值），摻越多越慢。
 *   用這套算：純矽約 3.3 × 10⁵ Ω·cm（Ioffe 研究所表列 3.2 × 10⁵；Wikipedia 表 2.3 × 10⁵，差在本質載子濃度的取值）；
 *   N 型 10¹⁶ cm⁻³ ≈ 0.53 Ω·cm、P 型 ≈ 1.45 Ω·cm（Irvin 曲線約 0.5、1.4）。
 * 導電測試器：兩顆三號電池（3 V）＋紅色 LED（約 1.9 V）＋100 Ω 限流，測一塊 2 cm 長、1 cm² 截面的材料。
 * 晶片清單：每樣東西「至少」幾顆，資料在 data/semiconductors.json 的 home。
 */

export const Q = 1.602e-19;            // 基本電荷（庫侖）
export const SI_ATOMS = 5.0e22;        // 矽每立方公分的原子數
export const NI = 1.0e10;              // 300 K 矽的本質載子濃度（cm⁻³，常用的整數值）

// 對照材料的電阻率（Ω·cm）：銅 1.68 × 10⁻⁸ Ω·m、玻璃取 10¹¹–10¹⁵ Ω·m 的中間 10¹³（Wikipedia 電阻率表，20 °C）
export const RHO = { copper: 1.68e-6, glass: 1e15 };

export function mobility(N) {
  const n = 68.5 + (1414 - 68.5) / (1 + Math.pow(N / 9.2e16, 0.711));
  const p = 44.9 + (470.5 - 44.9) / (1 + Math.pow(N / 2.23e17, 0.719));
  return { n, p };
}

/** 摻雜後的自由電子 n 與電洞 p（cm⁻³）。type: 'pure' | 'n' | 'p'；N：每立方公分摻進幾個原子。 */
export function carriers(type, N = 0) {
  const net = type === 'n' ? N : type === 'p' ? -N : 0;
  const half = net / 2;
  const root = Math.sqrt(half * half + NI * NI);
  // 避免大數相減失去精度：多數載子用相加、少數載子用 ni²/多數
  if (net >= 0) { const n = half + root; return { n, p: (NI * NI) / n }; }
  const p = -half + root; return { n: (NI * NI) / p, p };
}

/** 矽的導電度（S/cm）。 */
export function siConductivity(type, N = 0) {
  const { n, p } = carriers(type, N);
  const mu = mobility(type === 'pure' ? 0 : N);
  return Q * (n * mu.n + p * mu.p);
}

export const siResistivity = (type, N = 0) => 1 / siConductivity(type, N);

/** 「每幾個矽原子換一個」→ 每立方公分摻幾個原子；反過來：每幾個原子有一個自由的電子或電洞 */
export const dopantsFromRatio = (oneIn) => SI_ATOMS / oneIn;
export function atomsPerFreeCarrier(type, N = 0) {
  const { n, p } = carriers(type, N);
  return SI_ATOMS / (type === 'p' ? p : n);   // 純矽也只數自由電子（電洞一樣多，但標籤寫的是電子）
}
/** 滑桿 0–70 → 每幾個矽原子換一個（10¹¹ … 10⁴，每 10 格差 10 倍） */
export const AMT_MAX = 70;
export const oneInFromSlider = (v) => Math.pow(10, 11 - v / 10);

/** 跟純矽比，導電好幾倍 */
export const timesBetter = (type, N) => siConductivity(type, N) / siConductivity('pure');

/** 導電測試器：電流（安培）。rho：Ω·cm；樣品長 L 公分、截面 A 平方公分。 */
export const TESTER = { volts: 3, ledVf: 1.9, series: 100, L: 2, A: 1 };
export function testerCurrent(rho, t = TESTER) {
  const R = (rho * t.L) / t.A;
  return Math.max(0, (t.volts - t.ledVf) / (R + t.series));
}
/** LED 亮度 0–1（以銅棒當滿分）；看不到的微光當 0 */
export function ledLevel(rho, t = TESTER) {
  const k = testerCurrent(rho, t) / testerCurrent(RHO.copper, t);
  return k < 0.002 ? 0 : k;
}

/** 對數刻度上的位置 0–1（導電度 S/cm，範圍 10⁻¹⁶ … 10⁷） */
export const LOG_MIN = -16, LOG_MAX = 7;
export const ladderPos = (sigma) => Math.min(1, Math.max(0, (Math.log10(sigma) - LOG_MIN) / (LOG_MAX - LOG_MIN)));

/** 家裡的晶片：items = [{key, n}]，counts = {key: 數量} → 至少幾顆 */
export function homeChips(items, counts) {
  let total = 0, things = 0;
  for (const it of items) {
    const q = Math.max(0, Math.floor(Number(counts[it.key]) || 0));
    total += q * it.n; things += q;
  }
  return { total, things };
}

/** 給人看的大數：兩位有效數字；英文用 million／billion／trillion，中文用萬、億、兆 */
export function fmtBig(x) {
  const sig = (v) => +v.toPrecision(2);
  const loc = (v) => v.toLocaleString('en-US');
  x = +x.toPrecision(3);   // 10 的次方算出來可能是 999999999.9999，先修整，免得寫成「1000 million」
  let en, zh;
  if (x >= 1e12) en = `${sig(x / 1e12)} trillion`;
  else if (x >= 1e9) en = `${sig(x / 1e9)} billion`;
  else if (x >= 1e6) en = `${sig(x / 1e6)} million`;
  else en = loc(sig(x));
  if (x >= 1e12) zh = `${loc(sig(x / 1e12))} 兆`;
  else if (x >= 1e8) zh = `${loc(sig(x / 1e8))} 億`;
  else if (x >= 1e4) zh = `${loc(sig(x / 1e4))} 萬`;
  else zh = loc(sig(x));
  return { en, zh };
}
