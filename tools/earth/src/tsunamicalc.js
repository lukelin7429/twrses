// 第十二課：海嘯和一般的海浪有什麼不同？
// 海嘯的速度只看水深：V = √(g h)（中央氣象署 地震百問 63）
export const G = 9.8;
export const speed = (depthM) => Math.sqrt(G * Math.max(0, depthM));       // 公尺／秒
export const kmh = (ms) => ms * 3.6;
// 模型裡的海：x 從 -8（外海）到 4（岸邊）；外海水深 4,000 公尺，往岸邊越來越淺（示例的地形）
export const X0 = -8, SHORE = 4, X1 = 6.5, DEEP = 4000, SHALLOW = 10;
export function depth(x) {
  if (x <= -4) return DEEP;
  if (x >= SHORE) return 0;
  const t = (x + 4) / (SHORE + 4);                                         // 0 → 1
  return DEEP * (SHALLOW / DEEP) ** t;                                      // 用等比的方式變淺，畫面上每一段都看得到變化
}
// 越淺越高（格林定律：波高和水深的四分之一次方成反比；真實海岸還要看地形，這裡只是示意）
export const grow = (depthM) => (DEEP / Math.max(SHALLOW, depthM)) ** 0.25;
// 畫面上的水深（不照比例：把 4,000 公尺壓成 3.4 個模型單位）
export const depthVis = (x) => (x >= SHORE ? 0 : 3.4 * (depth(x) / DEEP) ** 0.42);
// 海嘯的波峰走到哪裡：dx/dt 和當地的速度成正比（K 把真實速度換成畫面速度）
export const K = 0.016;
export function advance(x, dt) { const d = depth(x); return x + Math.max(1.6, speed(d)) * K * dt; }
