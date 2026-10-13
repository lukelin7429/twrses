/* 世界歷史 World History · 陸地外形的解碼（scripts/build-land.mjs 的反向；純函式，node 測試直接用）。 */
const CH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
const IDX = Object.fromEntries([...CH].map((c, i) => [c, i]));

export function unpack(s, q) {
  const out = [];
  let i = 0, x = 0, y = 0;
  const next = () => {
    let z = 0, mul = 1, b;
    do { b = IDX[s[i++]]; z += (b & 31) * mul; mul *= 32; } while (b & 32);
    return z % 2 ? -(z + 1) / 2 : z / 2;
  };
  while (i < s.length) { x += next(); y += next(); out.push([x * q, y * q]); }
  return out;
}
