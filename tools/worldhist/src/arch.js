/*
 * 世界歷史 第六課〈How Did Rome Hold an Empire Together? 羅馬怎麼管住那麼大的地方？〉的純函式（node test/arch.test.mjs）。
 *
 * 一座半圓拱：內弧半徑 R、拱的厚度 t、分成 n 塊楔形石（voussoir），正中間那一塊是拱心石（keystone）。
 *   voussoirs(R, t, n)          每一塊的角度範圍與中心點：[{ i, a0, a1, mid, cx, cy, key }]（角度從左邊拱腳 π 到右邊拱腳 0）
 *   keystoneIndex(n)            拱心石是第幾塊（n 要是奇數）
 *   placeOrder(n)               放石頭的順序：從兩邊的拱腳輪流往上，拱心石最後放
 *   placedSet(n, k)             放了 k 塊之後，哪些已經在位置上
 *   stands({ n, placed, t, R, centering, minRatio })   拱撐不撐得住：
 *       拱架（centering）還在 → 撐得住（石頭靠拱架托著）
 *       拱架拿掉 → 石頭全部到位、而且 ratio(t, R) ≥ minRatio 才撐得住（minRatio 依出處，由資料傳進來）
 *   ratio(t, R)                 厚度 ÷ 拱的「中線半徑」（R + t/2）。文獻（海曼、米蘭科維奇）的 t/R 用的是中線半徑，不是內弧半徑
 *   reason(...)                 為什麼：'centering'｜'missing'｜'thin'｜'ok'
 *   gradient(dropM, lengthKm)   水道的平均坡度：每公里降幾公分
 *
 * 「t/R 的最小值」是用簡化的模型算出來的（拱只受自己的重量、石塊之間不會滑動、石頭不會被壓碎）；
 * 真實的拱還要看拱腳能不能擋住往外推的力、上面壓了多少東西。頁面上要寫明這是示意。
 */
export function keystoneIndex(n) {
  if (!Number.isInteger(n) || n < 3 || n % 2 === 0) throw new RangeError('n must be an odd integer ≥ 3');
  return (n - 1) / 2;
}

export function voussoirs(R, t, n) {
  const k = keystoneIndex(n), out = [];
  for (let i = 0; i < n; i++) {
    const a0 = Math.PI - (i / n) * Math.PI, a1 = Math.PI - ((i + 1) / n) * Math.PI, mid = (a0 + a1) / 2, r = R + t / 2;
    out.push({ i, a0, a1, mid, cx: Math.cos(mid) * r, cy: Math.sin(mid) * r, key: i === k });
  }
  return out;
}

export function placeOrder(n) {
  const k = keystoneIndex(n), out = [];
  for (let j = 0; j < k; j++) out.push(j, n - 1 - j);
  out.push(k);
  return out;
}

export function placedSet(n, k) {
  return new Set(placeOrder(n).slice(0, Math.max(0, Math.min(n, k))));
}

export function reason({ n, placed, t, R, centering, minRatio }) {
  if (centering) return 'centering';
  if (placed < n) return 'missing';
  if (ratio(t, R) < minRatio) return 'thin';
  return 'ok';
}

export const ratio = (t, R) => t / (R + t / 2);

export function stands(o) {
  const r = reason(o);
  return r === 'centering' || r === 'ok';
}

export function gradient(dropM, lengthKm) {
  return (dropM * 100) / lengthKm;          // 公分／公里
}
