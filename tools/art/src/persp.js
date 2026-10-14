/*
 * 美術 Art · 透視（純函式；test/persp.test.mjs）。第五課〈怎麼在平面上畫出一個房間？〉用，之後講空間的課共用。
 *
 * 做法是「畫家的窗戶」：畫面是一塊固定的長方形（picture plane），立在走廊口（z＝0），寬 PIC.w、高 PIC.h，底邊貼著地板；
 * 眼睛在窗戶前面 D 的地方（z＝D），位置是 (ex, ey)。走廊往裡面延伸（z < 0）。
 * 空間裡的一點 P，和眼睛連成一條直線；這條線穿過窗戶的地方，就是它在畫面上的位置。
 *
 *   project(P, eye)          三維的點 → 畫面上的點 [X, Y]（和走廊同一個單位：公尺）
 *   vanishingPoint(dir, eye) 朝 dir 方向延伸的所有平行線，在畫面上靠攏的那一點
 *   horizonY(eye)            視平線的高度＝眼睛的高度
 *   apparent(size, z, eye)   放在深度 z 的東西，在畫面上有多大
 * art-hall.js 的相機用同一組數字（非對稱的視錐），所以 3D 畫面上的消失點和這裡算的一樣。
 */
export const PIC = { w: 4, h: 3 };              // 畫面（也是走廊的橫切面）：寬 4 公尺、高 3 公尺
export const HALL = { w: 4, h: 3, len: 18 };    // 走廊：寬、高、長
export const EYE0 = { x: 0, y: 1.2, d: 3 };     // 預設的眼睛：正中間、1.2 公尺高（坐著或小朋友站著）、離窗戶 3 公尺
export const EYE_Y = { min: 0.5, max: 2.5 };
export const EYE_X = { min: -1.7, max: 1.7 };
export const HEIGHTS = {                        // 三種眼睛的高度（公尺；示意的數字）
  crouch: { y: 0.6, en: 'Crouching', zh: '蹲著' },
  stand: { y: 1.2, en: 'Standing', zh: '站著' },
  chair: { y: 2.2, en: 'On a chair', zh: '站在椅子上' },
};

/** 三維的點 [x, y, z]（z ≤ 0 在窗戶後面）→ 畫面上的 [X, Y]。 */
export function project(P, eye = EYE0) {
  const k = eye.d / (eye.d - P[2]);            // 越遠（z 越負）k 越小
  return [eye.x + (P[0] - eye.x) * k, eye.y + (P[1] - eye.y) * k];
}
/** 往 dir＝[dx, dy, dz] 方向延伸的平行線的消失點；和畫面平行的方向（dz＝0）沒有消失點，回傳 null。 */
export function vanishingPoint(dir, eye = EYE0) {
  if (Math.abs(dir[2]) < 1e-12) return null;
  const k = eye.d / -dir[2];
  return [eye.x + dir[0] * k, eye.y + dir[1] * k];
}
/** 視平線在畫面上的高度：永遠等於眼睛的高度。 */
export const horizonY = (eye = EYE0) => eye.y;
/** 深度 z 的地方，一個 size 大的東西在畫面上有多大。 */
export const apparent = (size, z, eye = EYE0) => size * eye.d / (eye.d - z);
/** 畫面座標 [X, Y]（原點在窗戶底邊中間，Y 朝上）→ 0–1 的比例座標 [u, v]（原點在左上，v 朝下），給 SVG 與 canvas 用。 */
export const toUV = ([X, Y]) => [(X + PIC.w / 2) / PIC.w, 1 - Y / PIC.h];
export const fromUV = ([u, v]) => [u * PIC.w - PIC.w / 2, (1 - v) * PIC.h];
/** 一條三維線段的兩端投到畫面上。 */
export const projectSeg = (a, b, eye = EYE0) => [project(a, eye), project(b, eye)];
/** 畫面上兩點的距離，換成「畫面寬度的百分之幾」。 */
export const offPercent = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]) / PIC.w * 100;

/** 給相機用的非對稱視錐（near 平面上的 left／right／top／bottom），讓窗戶剛好填滿畫面。 */
export function frustum(eye = EYE0, near = 0.1) {
  const k = near / eye.d;
  return { left: (-PIC.w / 2 - eye.x) * k, right: (PIC.w / 2 - eye.x) * k, bottom: (0 - eye.y) * k, top: (PIC.h - eye.y) * k, near };
}

// ── 線稿：三個場景，都是三維線段的清單（每段 [[x,y,z],[x,y,z]]），投影後畫成 SVG ─────────
const seg = (a, b) => [a, b];
export function hallwayLines() {
  const { w, h, len } = HALL, x = w / 2, out = [];
  for (const [sx, sy] of [[-x, 0], [x, 0], [-x, h], [x, h]]) out.push(seg([sx, sy, 0], [sx, sy, -len]));          // 四條往裡面的邊
  out.push(seg([-x, 0, -len], [x, 0, -len]), seg([x, 0, -len], [x, h, -len]), seg([x, h, -len], [-x, h, -len]), seg([-x, h, -len], [-x, 0, -len]));   // 盡頭的牆
  for (let z = -2; z > -len; z -= 2) out.push(seg([-x, 0, z], [x, 0, z]));                                        // 地板的橫線
  for (const sx of [-1, 0, 1]) out.push(seg([sx, 0, 0], [sx, 0, -len]));                                           // 地板的直線
  for (const z of [-4, -9, -14]) for (const s of [-1, 1]) {                                                       // 兩側的門
    out.push(seg([s * x, 0, z], [s * x, 2.1, z]), seg([s * x, 2.1, z], [s * x, 2.1, z - 1.2]), seg([s * x, 2.1, z - 1.2], [s * x, 0, z - 1.2]));
  }
  out.push(seg([-0.5, 0, -len], [-0.5, 2.1, -len]), seg([-0.5, 2.1, -len], [0.5, 2.1, -len]), seg([0.5, 2.1, -len], [0.5, 0, -len]));   // 盡頭的門
  return out;
}
export function railwayLines() {
  const out = [], far = -60;
  for (const sx of [-0.72, 0.72]) out.push(seg([sx, 0, 0], [sx, 0, far]));                    // 兩條鐵軌
  for (let z = -1; z > far; z -= 1.5) out.push(seg([-1.2, 0, z], [1.2, 0, z]));                // 枕木
  for (let z = -6; z > far; z -= 12) out.push(seg([2.6, 0, z], [2.6, 2.8, z]), seg([2.2, 2.5, z], [3.0, 2.5, z]));   // 電線桿
  out.push(seg([2.6, 2.8, -6], [2.6, 2.8, far]));                                              // 電線
  return out;
}
export function streetLines() {
  const out = [], far = -50;
  for (const sx of [-1.9, 1.9]) out.push(seg([sx, 0, 0], [sx, 0, far]));                       // 路的兩邊
  for (let z = -2; z > far; z -= 5) out.push(seg([0, 0, z], [0, 0, z - 2]));                   // 路中間的虛線
  for (const s of [-1, 1]) {                                                                   // 兩排房子：屋頂線、樓層線、牆的轉角
    out.push(seg([s * 1.9, 2.9, -3], [s * 1.9, 2.9, far]), seg([s * 1.9, 1.5, -3], [s * 1.9, 1.5, far]));
    for (let z = -3; z > far; z -= 6) out.push(seg([s * 1.9, 0, z], [s * 1.9, 2.9, z]));
  }
  return out;
}
export const SCENES = {
  hallway: { en: 'A hallway', zh: '一條走廊', lines: hallwayLines },
  railway: { en: 'Railway tracks', zh: '鐵軌', lines: railwayLines },
  street: { en: 'A street', zh: '一條街', lines: streetLines },
};
/** 把場景的線段投到畫面上，並裁掉完全在畫面外的（回傳 0–1 比例座標的線段）。 */
export function sceneUV(key, eye) {
  return SCENES[key].lines().map(([a, b]) => [toUV(project(a, eye)), toUV(project(b, eye))])
    .filter(([p, q]) => !((p[0] < 0 && q[0] < 0) || (p[0] > 1 && q[0] > 1) || (p[1] < 0 && q[1] < 0) || (p[1] > 1 && q[1] > 1)));
}

// 「消失點在哪裡？」五題：場景＋眼睛的位置。答案＝正前方（往 -z）那組平行線的消失點＝(eye.x, eye.y)。
export const VP_ROUNDS = [
  { scene: 'hallway', eye: { x: 0, y: 1.2, d: 3 } },
  { scene: 'railway', eye: { x: 0, y: 1.6, d: 3 } },
  { scene: 'hallway', eye: { x: 1.1, y: 0.7, d: 3 } },
  { scene: 'street', eye: { x: -0.8, y: 1.5, d: 3 } },
  { scene: 'hallway', eye: { x: -1.2, y: 2.2, d: 3 } },
];
export const HIT_AT = 4, NEAR_AT = 10;        // 差距（畫面寬度的百分比）：4 以內算找到，10 以內算很接近
export function vpGrade(pct) {
  if (pct <= HIT_AT) return { key: 'hit', mark: '●', en: 'Found it', zh: '找到了' };
  if (pct <= NEAR_AT) return { key: 'near', mark: '◐', en: 'Close', zh: '很接近' };
  return { key: 'far', mark: '○', en: 'Not there yet', zh: '還差一段' };
}

// 兩根一樣高的柱子（1.5 公尺），一根近、一根遠
export const POST = { h: 1.5, near: -2, x: 1.2 };
export function postPicture(z, eye = EYE0, x = POST.x) {
  const foot = project([x, 0, z], eye), top = project([x, POST.h, z], eye);
  return { foot, top, height: top[1] - foot[1] };
}
