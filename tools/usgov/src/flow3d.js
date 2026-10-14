/*
 * 美國政治 U.S. Government · 3D 的「箭頭」（每課共用）：從一棟建築飛到另一棟的一道弧線，尾端一個箭頭、線上一顆會跑的光點。
 * 用來表示「誰對誰做了什麼」：否決、推翻否決、提名、宣告違憲……（第二課）；之後法案、案件在機關之間怎麼走也用它。
 *
 *   makeArrow() → { group, set(from, to, color, lift?), progress(0–1), hide() }
 *     set：重新產生弧線（from、to 是 Vector3；lift 是弧線中點抬高多少，不給就依距離決定）
 *     progress：線畫到哪裡；到 1 才出現箭頭
 */
import { ConeGeometry, Group, Mesh, MeshBasicMaterial, QuadraticBezierCurve3, SphereGeometry, TubeGeometry, Vector3 } from 'three';

const SEG = 64, RAD = 6;
export function makeArrow() {
  const group = new Group();
  const mat = new MeshBasicMaterial({ color: 0xffd36e, transparent: true, opacity: 0.95, fog: false });
  let tube = null, curve = null;
  const head = new Mesh(new ConeGeometry(0.34, 0.9, 16), mat);
  const dot = new Mesh(new SphereGeometry(0.26, 16, 12), new MeshBasicMaterial({ color: 0xffffff, fog: false }));
  group.add(head, dot);
  group.visible = false;
  const up = new Vector3(0, 1, 0), tan = new Vector3();
  return {
    group,
    set(from, to, color, lift) {
      const mid = from.clone().add(to).multiplyScalar(0.5);
      mid.y = Math.max(from.y, to.y) + (lift != null ? lift : 2.2 + from.distanceTo(to) * 0.22);
      curve = new QuadraticBezierCurve3(from.clone(), mid, to.clone());
      if (tube) { group.remove(tube); tube.geometry.dispose(); }
      tube = new Mesh(new TubeGeometry(curve, SEG, 0.09, RAD, false), mat);
      group.add(tube);
      mat.color.setHex(color);
      group.visible = true;
      this.progress(0);
    },
    progress(k) {
      if (!curve) return;
      const p = Math.min(1, Math.max(0, k));
      tube.geometry.setDrawRange(0, Math.floor(SEG * p) * RAD * 6);
      const at = Math.min(0.985, p);
      curve.getPoint(at, dot.position);
      curve.getPoint(0.985, head.position);
      curve.getTangent(0.985, tan).normalize();
      head.quaternion.setFromUnitVectors(up, tan);
      head.visible = p >= 0.97;
      dot.visible = p < 0.97 && p > 0;
    },
    hide() { group.visible = false; },
  };
}
