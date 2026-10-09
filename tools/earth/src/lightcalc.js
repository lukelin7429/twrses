// 第九課：閃電和打雷是怎麼回事？
// 聲音每秒約 340 公尺、光每秒約 30 萬公里（中央氣象署 氣象常識「雷雨」）
export const SOUND = 340, LIGHT_KM_S = 300000;
export const thunderDelay = (km) => (km * 1000) / SOUND;            // 幾秒後聽到雷聲
export const lightDelay = (km) => km / LIGHT_KM_S;                   // 光幾乎立刻就到
export const distanceM = (seconds) => SOUND * seconds;               // 數到幾秒 → 幾公尺
export const D_MIN = 1, D_MAX = 5;                                   // 模型裡你離閃電幾公里
// 雲裡的電累積到滿就放電（累積的快慢是為了動畫好看選的）
export const CHARGE_TIME = 5;
export const chargeStep = (c, dt) => Math.min(1, c + dt / CHARGE_TIME);
// 一道閃電的折線（決定性的亂數，同一個編號畫出同一道）
const hash = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
export function boltPath(a, b, n, seed, wobble = 0.38) {
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n, edge = Math.sin(t * Math.PI);
    pts.push([a[0] + (b[0] - a[0]) * t + (hash(i, seed) - 0.5) * 2 * wobble * edge, a[1] + (b[1] - a[1]) * t + (hash(i, seed + 7) - 0.5) * 0.12 * edge]);
  }
  return pts;
}
