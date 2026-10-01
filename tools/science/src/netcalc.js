/*
 * 萬物原理 · 第五課「網際網路怎麼運作？」的封包計算（純函式，test/internet.test.mjs 會跑）。
 *
 * 封包：乙太網路一個封包最多 1,500 位元組（MTU），所以 3 MB 的照片大約切成 2,000 個封包。
 * 光在玻璃光纖裡每秒約 204,000 公里（真空光速 ÷ 折射率約 1.468），彰化到波士頓直線約 12,532 公里。
 * 收件端照編號把封包排回原來的順序；缺了哪一號，就請對方重送那一號（TCP 的做法）。
 */
export const MTU = 1500;
export const FIBER_KM_S = 299792.458 / 1.468;

export const packetsFor = (bytes) => Math.max(1, Math.ceil(bytes / MTU));
export const lightMs = (km) => km / FIBER_KM_S * 1000;

// 球面距離（公里）
export function greatCircleKm(lat1, lon1, lat2, lon2) {
  const r = Math.PI / 180;
  const a = Math.sin((lat2 - lat1) * r / 2) ** 2 + Math.cos(lat1 * r) * Math.cos(lat2 * r) * Math.sin((lon2 - lon1) * r / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(a));
}

// 收件端：依抵達順序，算出目前排好的結果與還缺哪幾號
export function reassemble(total, arrived) {
  const have = new Set(arrived);
  const missing = [];
  for (let i = 1; i <= total; i++) if (!have.has(i)) missing.push(i);
  return { complete: missing.length === 0, missing, ordered: [...have].sort((a, b) => a - b) };
}

// 抵達順序是不是跟送出順序不一樣（封包走了不同的路）
export const outOfOrder = (arrived) => arrived.some((n, i) => i > 0 && n < arrived[i - 1]);
