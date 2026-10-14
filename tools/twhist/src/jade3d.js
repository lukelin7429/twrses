/*
 * 台灣歷史 Taiwan's Story · 人獸形玉玦的 3D 示意（自繪，大幅簡化；不是掃描檔）。
 * 依據：國立臺灣史前文化博物館的館藏資料（典藏號碼 20121600001：高 70 mm、寬 40 mm、厚 4.5 mm）與
 * 語音導覽的描述（兩個人並肩站立、雙手叉腰、雙腳張開；頭上頂著一隻側身的獸，有豎立的耳朵、張開的嘴、
 * 拱起的背和向上翹的尾巴；獸身中間有一條斷痕，兩邊各有一個修補用的孔）。
 * 單位：公分。原點在整件器物的中心，厚度沿 z。
 *
 *   makeJade() → { group, spots: { beast, mend, people, size } (Vector3), size: { w, h, t } }
 */
import { BoxGeometry, CylinderGeometry, ExtrudeGeometry, Group, Mesh, MeshStandardMaterial, Shape, Vector3 } from 'three';

export const JADE = { h: 7, w: 4, t: 0.45 };

export function makeJade() {
  const g = new Group();
  const jade = new MeshStandardMaterial({ color: 0x6fae84, roughness: 0.28, metalness: 0.05, emissive: 0x123a22, emissiveIntensity: 0.35 });
  const dark = new MeshStandardMaterial({ color: 0x10241a, roughness: 0.9 });
  const opt = { depth: JADE.t, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 2, curveSegments: 20 };
  const put = (shape) => { const m = new Mesh(new ExtrudeGeometry(shape, opt), jade); m.position.z = -JADE.t / 2; m.castShadow = true; g.add(m); return m; };
  /** 一條從 (x1,y1) 到 (x2,y2)、寬 w 的直條 */
  const bar = (x1, y1, x2, y2, w) => {
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), nx = (-dy / len) * w / 2, ny = (dx / len) * w / 2;
    const s = new Shape();
    s.moveTo(x1 + nx, y1 + ny); s.lineTo(x2 + nx, y2 + ny); s.lineTo(x2 - nx, y2 - ny); s.lineTo(x1 - nx, y1 - ny); s.closePath();
    return put(s);
  };
  const disc = (x, y, r) => { const s = new Shape(); s.absarc(x, y, r, 0, Math.PI * 2, false); return put(s); };

  // 兩個並肩站立的人（左右對稱）：頭、身體、叉腰的手臂、張開的雙腳
  for (const cx of [-0.98, 0.98]) {
    disc(cx, 0.82, 0.46);                                   // 頭
    bar(cx, 0.45, cx, -1.25, 0.72);                         // 身體
    for (const sgn of [-1, 1]) {
      bar(cx + sgn * 0.2, 0.2, cx + sgn * 0.9, -0.45, 0.24);   // 上臂往外
      bar(cx + sgn * 0.9, -0.45, cx + sgn * 0.25, -1.1, 0.24); // 前臂回到腰
      bar(cx + sgn * 0.18, -1.15, cx + sgn * 0.52, -3.2, 0.3); // 腳
    }
  }
  bar(-1.9, -3.3, 1.9, -3.3, 0.34);                         // 腳下那一橫
  // 頭上的獸（側身）：四條短腿接在兩個人的頭上、拱起的背、頭在左邊、尾巴在右邊往上翹
  for (const x of [-1.3, -0.72, 0.72, 1.3]) bar(x, 1.12, x, 1.72, 0.3);
  const back = new Shape();
  back.moveTo(-1.6, 1.55); back.quadraticCurveTo(0, 2.5, 1.6, 1.55); back.lineTo(1.6, 2.05); back.quadraticCurveTo(0, 3.05, -1.6, 2.05); back.closePath();
  put(back);
  disc(-1.78, 1.95, 0.4);                                   // 獸的頭
  bar(-2.02, 2.2, -2.08, 2.68, 0.18); bar(-1.66, 2.28, -1.6, 2.74, 0.18);   // 豎立的耳朵
  bar(-2.05, 1.84, -2.32, 1.74, 0.11); bar(-2.05, 1.98, -2.32, 2.0, 0.11);  // 張開的嘴（上下兩片）
  bar(1.52, 1.85, 1.9, 2.6, 0.22); bar(1.9, 2.6, 1.62, 3.3, 0.2);           // 往上翹的尾巴

  // 斷痕與兩個修補孔
  const crack = new Mesh(new BoxGeometry(0.035, 0.6, JADE.t + 0.1), dark); crack.position.set(0.06, 2.4, 0); crack.rotation.z = 0.12; g.add(crack);
  for (const x of [-0.24, 0.36]) { const h = new Mesh(new CylinderGeometry(0.07, 0.07, JADE.t + 0.12, 14), dark); h.rotation.x = Math.PI / 2; h.position.set(x, 2.42, 0); g.add(h); }

  // 一公分的比例尺（黑白相間，七格＝七公分）
  const ruler = new Group();
  for (let i = 0; i < 7; i++) {
    const m = new Mesh(new BoxGeometry(0.22, 1, 0.08), new MeshStandardMaterial({ color: i % 2 ? 0x1b2338 : 0xf3f1ea, roughness: 0.6 }));
    m.position.set(0, -3 + i, 0); ruler.add(m);
  }
  ruler.position.set(2.75, 0, 0);
  g.add(ruler);

  return {
    group: g, size: JADE,
    spots: { beast: new Vector3(-1.78, 1.95, 0.3), mend: new Vector3(0.06, 2.42, 0.35), people: new Vector3(0, -0.4, 0.35), size: new Vector3(2.75, 0.5, 0.2) },
  };
}
