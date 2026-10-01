/*
 * 萬物原理 · 第四課「風力發電機怎麼發電？」的風機計算（純函式，test/wind.test.mjs 會跑）。
 *
 * 照大彰化 1、2a 離岸風場用的 Siemens Gamesa SG 8.0-167 DD 簡化：額定 8 MW、轉子直徑 167 m（掃風面積約 21,904 m²）、
 *   直驅（沒有齒輪箱），最快每分鐘約 10.3 轉；切入約 3 m/s、約 12–13 m/s 滿載、暴風約 25 m/s 以上停機保護。
 * 風的功率 = ½ × 空氣密度 × 掃風面積 × 風速³（風速加倍，功率變八倍）；風機只能接住其中一部分（功率係數 Cp），
 *   物理上限是貝茲極限 16/27 ≈ 59.3%。這裡 Cp 在中低風速取 0.45，接近滿載時逐漸下降（真實風機也是這樣），
 *   所以約 12.4 m/s 才到 8 MW；超過就調整葉片角度（變槳）把多的風「放掉」，維持 8 MW。
 */
export const RHO = 1.225;               // kg/m³，海平面空氣
export const R = 83.5;                  // m
export const AREA = Math.PI * R * R;    // ≈ 21,904 m²
export const RATED_W = 8e6;
export const CUT_IN = 3, CUT_OUT = 25;
export const MAX_RPM = 10.3;
export const BETZ = 16 / 27;
export const TSR = 8;                   // 葉尖速比：葉尖速度 ÷ 風速

export const windPower = (v) => 0.5 * RHO * AREA * v * v * v;    // 風本身帶的功率（瓦）

export function cp(v) {
  if (v <= 9) return 0.45;
  return Math.max(0.2, 0.45 - 0.15 * (v - 9) / 3.5);
}

export function regime(v) {
  if (v < CUT_IN) return 'calm';
  if (v > CUT_OUT) return 'storm';
  return windPower(v) * cp(v) >= RATED_W ? 'full' : 'rising';
}

// 發電功率（瓦）
export function power(v) {
  const r = regime(v);
  if (r === 'calm' || r === 'storm') return 0;
  return Math.min(RATED_W, windPower(v) * cp(v));
}

// 轉速（每分鐘）：葉尖速比固定，最快 10.3；風太小時慢慢空轉，暴風時停住
export function rpm(v) {
  const r = regime(v);
  if (r === 'storm') return 0;
  if (r === 'calm') return 0.5 * v;
  return Math.min(MAX_RPM, TSR * v * 60 / (2 * Math.PI * R));
}

// 葉片角度（度）：滿載以後慢慢轉開，把多的風放掉；暴風時轉到幾乎跟風平行（順槳）
export function pitch(v) {
  const r = regime(v);
  if (r === 'storm') return 88;
  if (r !== 'full') return 0;
  let lo = CUT_IN, hi = CUT_OUT;            // 找到剛好滿載的風速
  for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; if (windPower(m) * cp(m) >= RATED_W) hi = m; else lo = m; }
  return Math.min(28, (v - hi) * 2.2);
}

export const tipSpeed = (rpmv) => rpmv * 2 * Math.PI * R / 60;     // m/s
export const kmh = (ms) => ms * 3.6;
