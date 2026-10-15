/*
 * 世界歷史 第四課〈最早的城市為什麼都在河邊？〉：金字塔怎麼蓋的幾種想法（純函式；node test/pyramid.test.mjs）。
 *
 * 單位是公尺。金字塔是正四角錐，底邊 base、高 height（頁面上的實際數字與出處在 data/world_history.json）。
 *   builtFraction(p)          蓋到高度的 p（0–1）時，已經放上去的石頭占全部的比例：1 − (1 − p)³
 *   heightForFraction(f)      反過來：放了 f 的石頭時，蓋到多高
 *   halfAt(base, height, p)   高度 p 那一層的半邊寬
 *   ramp(kind, base, height, p, opt)  某一種坡道假說在「蓋到 p」時的路徑：[{ x, y, z }]（y 往上；金字塔中心在原點）
 *       'straight'  一條垂直於南面的直坡道，坡度固定，所以越蓋越長
 *       'zigzag'    在一個面上來回折返
 *       'spiral'    沿著四個面繞上去
 *       'internal'  在金字塔裡面繞（外面看不到）
 *   pathLength(path)          路徑的長度
 *   straightRampVolume(...)   直坡道本身的體積（一個楔形），用來和金字塔比
 * 坡度、寬度都是示意用的假設（opt.grade 預設 1:10，照 Edwards 2003 說「最實際」的坡度），不是任何一份研究算出的數字。
 */
export const KINDS = ['straight', 'zigzag', 'spiral', 'internal'];

export const pyramidVolume = (base, height) => base * base * height / 3;
export function builtFraction(p) { const q = Math.min(1, Math.max(0, p)); return 1 - (1 - q) ** 3; }
export function heightForFraction(f) { const q = Math.min(1, Math.max(0, f)); return 1 - Math.cbrt(1 - q); }
export const halfAt = (base, height, p) => (base / 2) * (1 - Math.min(1, Math.max(0, p)));

export function pathLength(path) {
  let s = 0;
  for (let i = 1; i < path.length; i++) s += Math.hypot(path[i].x - path[i - 1].x, path[i].y - path[i - 1].y, path[i].z - path[i - 1].z);
  return s;
}

/** 直坡道：從地面直直通到目前的頂層，坡度 grade（升高 1 公尺要走幾公尺）。 */
export function straightRampVolume(height, p, grade = 10, width = 20) {
  const h = height * p, run = h * grade;
  return 0.5 * run * h * width;
}

export function ramp(kind, base, height, p, opt = {}) {
  const grade = opt.grade || 10, h = height * Math.min(1, Math.max(0, p));
  if (h <= 0) return [];
  const half = (y) => (base / 2) * (1 - y / height);
  if (kind === 'straight') {
    const z0 = half(h);                                   // 南面在 +z
    return [{ x: 0, y: 0, z: z0 + h * grade }, { x: 0, y: h, z: z0 }];
  }
  if (kind === 'zigzag') {
    // 在南面上來回折返：每一段橫走一個面寬的八成、升高 rise
    const out = []; let y = 0, dir = -1;
    const legRise = height / 8;
    out.push({ x: -half(0) * 0.8, y: 0, z: half(0) });
    while (y < h - 1e-9) {
      const ny = Math.min(h, y + legRise);
      const w = half(ny) * 0.8;
      dir = -dir;
      out.push({ x: dir * w, y: ny, z: half(ny) });
      y = ny;
    }
    return out;
  }
  if (kind === 'spiral' || kind === 'internal') {
    // 沿著四個面繞：每走一個面（從一個角到下一個角）升高 rise。內部坡道沿同樣的路線，但縮進金字塔裡面
    const inset = kind === 'internal' ? 0.82 : 1.02;
    const corners = [[1, 1], [-1, 1], [-1, -1], [1, -1]];   // 從東南角開始，逆時針（從上面看）
    const out = []; let y = 0, k = 0;
    const perSide = kind === 'internal' ? height / 14 : height / 10;
    const at = (c, yy) => { const r = half(yy) * inset; return { x: corners[c % 4][0] * r, y: yy, z: corners[c % 4][1] * r }; };
    out.push(at(0, 0));
    while (y < h - 1e-9) {
      const ny = Math.min(h, y + perSide);
      if (ny < y + perSide - 1e-9) {                       // 最後一段只走到一半
        const a = at(k, y), b = at(k + 1, y + perSide), t = (ny - y) / perSide;
        out.push({ x: a.x + (b.x - a.x) * t, y: ny, z: a.z + (b.z - a.z) * t });
      } else out.push(at(k + 1, ny));
      y = ny; k += 1;
    }
    return out;
  }
  throw new RangeError(`Unknown ramp: ${kind}`);
}
