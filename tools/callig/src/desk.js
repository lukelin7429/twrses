/*
 * 書法 · 第二課起共用的書桌布景（three.js）：木頭書桌、毛氈、紙鎮、小硯台。
 * 第一課 cal-four.js 有自己一份（含筆架、墨床、水盂與各種動畫），沒有改用這裡，免得動到已上線的第一課。
 *
 *   makeDesk(scene, { w, d, felt: [x, z, w, d], weight: [x, z, len], stone: [x, z] | null })
 *     → { desk, felt, weight, stone }
 * 座標同 brush3d.js：+X 往右、+Y 往上、+Z 朝向觀眾；1 單位約 10 公分。
 */
import { BoxGeometry, CircleGeometry, ExtrudeGeometry, Group, Mesh, MeshStandardMaterial, Shape } from 'three';
import { canvasTex } from './common.js';
import { rng } from './ink2d.js';

export function makeDesk(scene, { w = 9, d = 6, felt = [0, 0.35, 4.0, 4.6], weight = [0, -1.37, 2.7], stone = [3.1, -0.5] } = {}) {
  const wood = canvasTex((g, W, H) => {
    g.fillStyle = '#6a4125'; g.fillRect(0, 0, W, H);
    const r = rng(4);
    for (let i = 0; i < 140; i++) {
      const y0 = r() * H, a = 2 + r() * 6, f = 0.004 + r() * 0.01, ph = r() * 6;
      g.strokeStyle = r() < 0.5 ? `rgba(40,20,8,${0.12 + r() * 0.2})` : `rgba(160,110,60,${0.08 + r() * 0.12})`;
      g.lineWidth = 0.6 + r() * 2.2;
      g.beginPath();
      for (let x = 0; x <= W; x += 8) { const y = y0 + Math.sin(x * f + ph) * a; if (x) g.lineTo(x, y); else g.moveTo(x, y); }
      g.stroke();
    }
  }, 1024, 512);
  const side = new MeshStandardMaterial({ color: 0x4a2c18, roughness: 0.6 });
  const desk = new Mesh(new BoxGeometry(w, 0.36, d), [side, side, new MeshStandardMaterial({ map: wood, roughness: 0.55 }), side, side, side]);
  desk.receiveShadow = true; desk.position.set(0, -0.18, 0.2);
  scene.add(desk);
  const feltM = new Mesh(new BoxGeometry(felt[2], 0.012, felt[3]), new MeshStandardMaterial({
    roughness: 1, map: canvasTex((g, W, H) => {
      g.fillStyle = '#2c313d'; g.fillRect(0, 0, W, H);
      const r = rng(9);
      for (let i = 0; i < 2600; i++) { g.fillStyle = `rgba(${r() < 0.5 ? '255,255,255' : '0,0,0'},${0.03 + r() * 0.05})`; g.fillRect(r() * W, r() * H, 1 + r() * 2, 1 + r() * 2); }
    }, 256, 256),
  }));
  feltM.receiveShadow = true; feltM.position.set(felt[0], 0.006, felt[1]);
  scene.add(feltM);
  const rosewood = new MeshStandardMaterial({ color: 0x4a2618, roughness: 0.42 });
  const weightG = new Group();
  weightG.add(new Mesh(new BoxGeometry(weight[2], 0.13, 0.22), rosewood));
  const inlay = new Mesh(new BoxGeometry(weight[2] * 0.8, 0.01, 0.06), new MeshStandardMaterial({ color: 0x2a140b, roughness: 0.5 }));
  inlay.position.y = 0.066; weightG.add(inlay);
  weightG.position.set(weight[0], 0.016 + 0.065, weight[1]);
  weightG.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } });
  scene.add(weightG);
  let stoneG = null;
  if (stone) {
    // 簡化的硯台：外框、硯堂、斜坡、硯池（輪廓 x → 世界 +z，所以 rotation.y＝−π/2）
    stoneG = new Group();
    const stoneMat = new MeshStandardMaterial({ color: 0x3b2f3a, roughness: 0.62 });
    const floorMat = new MeshStandardMaterial({ color: 0x4a3c48, roughness: 0.42 });
    const B = (bw, bh, bd, x, y, z, m) => { const o = new Mesh(new BoxGeometry(bw, bh, bd), m); o.position.set(x, y, z); stoneG.add(o); };
    B(1.2, 0.1, 1.8, 0, 0.05, 0, stoneMat);
    for (const [bw, bd, x, z] of [[1.2, 0.1, 0, -0.85], [1.2, 0.1, 0, 0.85], [0.1, 1.6, -0.55, 0], [0.1, 1.6, 0.55, 0]]) B(bw, 0.2, bd, x, 0.2, z, stoneMat);
    const prof = new Shape();
    prof.moveTo(-0.8, 0.1); prof.lineTo(-0.35, 0.1); prof.quadraticCurveTo(-0.3, 0.22, -0.22, 0.25); prof.lineTo(0.8, 0.25); prof.lineTo(0.8, 0.1); prof.closePath();
    const inner = new Mesh(new ExtrudeGeometry(prof, { depth: 1.0, bevelEnabled: false }), floorMat);
    inner.rotation.y = -Math.PI / 2; inner.position.x = 0.5; stoneG.add(inner);
    const pool = new Mesh(new BoxGeometry(1.0, 0.002, 0.5), new MeshStandardMaterial({ color: 0x07080b, roughness: 0.05, metalness: 0.2 }));
    pool.position.set(0, 0.2, -0.56); stoneG.add(pool);
    const puddle = new Mesh(new CircleGeometry(0.26, 40), new MeshStandardMaterial({ color: 0x0a0a0d, roughness: 0.05, metalness: 0.2 }));
    puddle.rotation.x = -Math.PI / 2; puddle.position.set(0, 0.252, 0.3); stoneG.add(puddle);
    stoneG.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } });
    pool.castShadow = false; puddle.castShadow = false;
    stoneG.position.set(stone[0], 0, stone[1]);
    scene.add(stoneG);
  }
  return { desk, felt: feltM, weight: weightG, stone: stoneG };
}
