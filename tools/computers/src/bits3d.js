/*
 * 電腦概論 · 位元引擎的 3D 部分：一排「開關＋燈泡」（全部自繪示意；第一～四課共用，只換幾位、擺在哪裡）。
 *
 *   makeBitRow({ n, spacing, plates }) → {
 *     group,                 整排（加進 scene）
 *     n, spacing, width,     幾位、間距、整排寬度
 *     x(i),                  第 i 位的 x（i = 0 是最右邊那一位）
 *     bulbPos(i, out),       燈泡中心（世界座標，標籤與進位小球用）
 *     set(i, on, instant),   撥開關（燈泡與撥桿會自己轉場）
 *     get(i),
 *     hit(raycaster),        點到哪一位（-1 = 沒點到）
 *     hover(i),              滑鼠移到哪一位（-1 = 都沒有）
 *     carry(i, dur),         一顆進位小球從第 i 位的燈泡跳到第 i+1 位（i = n−1 時往左飛出去＝溢位）
 *     setPlates(v),          位值牌（1、2、4…）顯示與否
 *     update(dt),            每一格呼叫
 *   }
 *
 * 座標：x 向右、y 向上、z 朝觀眾。每一位一塊底座：後面是燈泡，前面是撥桿開關，最前面斜斜一塊位值牌。
 * 撥桿往後倒（朝燈泡）＝開，往前倒（朝觀眾）＝關。
 */
import {
  AdditiveBlending, BoxGeometry, Color, CylinderGeometry, Group, MathUtils, Mesh, MeshBasicMaterial, MeshStandardMaterial,
  PlaneGeometry, PointLight, SphereGeometry, Sprite, SpriteMaterial, Vector3,
} from 'three';
import { canvasTex } from './common.js';
import { placeValue } from './bits.js';

const ON = 0xffc94a, OFF_GLASS = 0x39414f;
const LEVER = 0.5;   // 撥桿倒多少（弧度）
const _warm = new Color(0xffdb85), _green = new Color(0x38c778);

function glowTex() {
  return canvasTex((g, w, h) => {
    const r = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    r.addColorStop(0, 'rgba(255,226,150,1)'); r.addColorStop(0.35, 'rgba(255,196,80,.45)'); r.addColorStop(1, 'rgba(255,180,60,0)');
    g.fillStyle = r; g.fillRect(0, 0, w, h);
  }, 128, 128);
}

function plateTex(text) {
  return canvasTex((g, w, h) => {
    g.fillStyle = '#f4ecd8'; g.fillRect(0, 0, w, h);
    g.strokeStyle = '#c9a14a'; g.lineWidth = 8; g.strokeRect(4, 4, w - 8, h - 8);
    g.fillStyle = '#1b2440'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.font = `800 ${text.length > 2 ? 78 : 96}px "Helvetica Neue", Arial, sans-serif`;
    g.fillText(text, w / 2, h / 2 + 4);
  }, 256, 144);
}

export function makeBitRow({ n = 8, spacing = 1.25, plates = true } = {}) {
  const group = new Group();
  const x = (i) => ((n - 1) / 2 - i) * spacing;
  const width = n * spacing;
  const std = (color, o = {}) => new MeshStandardMaterial({ color, roughness: 0.6, ...o });

  // 一塊長木板，上面一條銅線（示意：每個開關各管自己的燈）
  const board = new Mesh(new BoxGeometry(width + 0.5, 0.12, 2.5), std(0x6b4a2e, { roughness: 0.8 }));
  board.position.y = 0.06; board.receiveShadow = true; group.add(board);

  const glow = glowTex();
  const units = [];
  for (let i = 0; i < n; i++) {
    const u = new Group(); u.position.set(x(i), 0.12, 0);
    const base = new Mesh(new BoxGeometry(spacing * 0.8, 0.1, 2.1), std(0x1d2740, { roughness: 0.5 }));
    base.position.y = 0.05; base.receiveShadow = true; base.castShadow = true;

    // 燈泡（後面）
    const socket = new Mesh(new CylinderGeometry(0.16, 0.2, 0.34, 20), std(0xb9bec8, { roughness: 0.35, metalness: 0.8 }));
    socket.position.set(0, 0.27, -0.55); socket.castShadow = true;
    const glassM = new MeshStandardMaterial({ color: OFF_GLASS, emissive: ON, emissiveIntensity: 0, roughness: 0.25, transparent: true, opacity: 0.9 });
    const glass = new Mesh(new SphereGeometry(0.33, 28, 20), glassM);
    glass.position.set(0, 0.72, -0.55); glass.castShadow = true;
    const halo = new Sprite(new SpriteMaterial({ map: glow, blending: AdditiveBlending, depthWrite: false, transparent: true, opacity: 0 }));
    halo.position.copy(glass.position); halo.scale.setScalar(1.9);
    const light = new PointLight(0xffc870, 0, 3.2, 1.6);
    light.position.set(0, 0.8, -0.3);

    // 銅線
    const wire = new Mesh(new BoxGeometry(0.05, 0.02, 0.9), std(0xc98a4b, { roughness: 0.4, metalness: 0.7 }));
    wire.position.set(0, 0.11, -0.05);

    // 撥桿開關（前面）
    const house = new Mesh(new BoxGeometry(0.5, 0.2, 0.62), std(0xdfe3ea, { roughness: 0.45 }));
    house.position.set(0, 0.2, 0.42); house.castShadow = true;
    const pivot = new Group(); pivot.position.set(0, 0.3, 0.42);
    const stick = new Mesh(new CylinderGeometry(0.055, 0.075, 0.46, 14), std(0x8a93a6, { roughness: 0.3, metalness: 0.85 }));
    stick.position.y = 0.23; stick.castShadow = true;
    const knobM = std(0xd4574a, { roughness: 0.4 });
    const knob = new Mesh(new SphereGeometry(0.105, 18, 14), knobM);
    knob.position.y = 0.48; knob.castShadow = true;
    pivot.add(stick, knob); pivot.rotation.x = LEVER;

    // 位值牌（最前面，斜斜朝上）
    const plate = new Mesh(new PlaneGeometry(spacing * 0.72, spacing * 0.72 * 144 / 256), new MeshBasicMaterial({ map: plateTex(String(placeValue(i))) }));
    plate.position.set(0, 0.27, 0.98); plate.rotation.x = -0.72;
    plate.visible = plates;

    // 看不見的大方塊：手指點得到
    const pad = new Mesh(new BoxGeometry(spacing * 0.96, 1.5, 2.4), new MeshBasicMaterial({ visible: false }));
    pad.position.y = 0.6; pad.userData.bit = i;

    u.add(base, socket, glass, halo, light, wire, house, pivot, plate, pad);
    group.add(u);
    units.push({ u, glassM, halo, light, pivot, knobM, plate, pad, base, on: 0, k: 0, hover: 0 });
  }

  // 進位小球（同時最多一顆在飛，預留兩顆讓前一顆淡出）
  const balls = [0, 1].map(() => {
    const m = new Mesh(new SphereGeometry(0.13, 18, 14), new MeshBasicMaterial({ color: 0x7ef0e3, transparent: true, opacity: 0 }));
    const h = new Sprite(new SpriteMaterial({ map: glow, color: 0x7ef0e3, blending: AdditiveBlending, depthWrite: false, transparent: true, opacity: 0 }));
    h.scale.setScalar(0.9); m.add(h); m.visible = false; group.add(m);
    return { m, h, t: 1, dur: 1, x0: 0, x1: 0 };
  });
  let nextBall = 0;
  const TOP = 0.72;

  const api = {
    group, n, spacing, width, x,
    carryAt: null,   // 進位小球現在的位置（沒有在飛時是 null；標籤用）
    bulbPos(i, out = new Vector3()) { return out.set(x(i), 0.12 + TOP, -0.55).applyMatrix4(group.matrixWorld); },
    get: (i) => units[i].on,
    set(i, on, instant = false) {
      const s = units[i]; s.on = on ? 1 : 0;
      if (instant) s.k = s.on;
    },
    hit(raycaster) {
      const h = raycaster.intersectObjects(units.map((s) => s.pad), false)[0];
      return h ? h.object.userData.bit : -1;
    },
    hover(i) { units.forEach((s, k) => { s.hover = k === i ? 1 : 0; }); },
    carry(i, dur = 0.45) {
      const b = balls[nextBall]; nextBall = (nextBall + 1) % balls.length;
      b.t = 0; b.dur = dur; b.x0 = x(i); b.x1 = i + 1 < n ? x(i + 1) : x(i) - spacing * 1.1; b.out = i + 1 >= n;
      b.m.visible = true;
    },
    setPlates(v) { units.forEach((s) => { s.plate.visible = !!v; }); },
    update(dt) {
      for (const s of units) {
        s.k += (s.on - s.k) * Math.min(1, dt * 14);
        if (Math.abs(s.on - s.k) < 0.002) s.k = s.on;
        s.glassM.emissiveIntensity = s.k * 2.4;
        s.glassM.color.setHex(OFF_GLASS).lerp(_warm, s.k);
        s.halo.material.opacity = s.k * 0.85;
        s.light.intensity = s.k * 2.2;
        s.pivot.rotation.x = MathUtils.lerp(LEVER, -LEVER, s.k);
        s.knobM.color.setHex(0xd4574a).lerp(_green, s.k);
        s.base.material.emissive.setHex(0x2a3d6e); s.base.material.emissiveIntensity = s.hover * 0.9;
      }
      api.carryAt = null;
      for (const b of balls) {
        if (b.t >= 1) { b.m.visible = false; continue; }
        b.t = Math.min(1, b.t + dt / b.dur);
        const k = b.t, fade = b.out ? 1 - k : Math.min(1, (1 - k) * 6);
        b.m.position.set(MathUtils.lerp(b.x0, b.x1, k), 0.12 + TOP + 0.5 + Math.sin(Math.PI * k) * 0.55, -0.55);
        b.m.material.opacity = Math.min(1, k * 8) * fade; b.h.material.opacity = b.m.material.opacity * 0.9;
        if (b.t < 1) api.carryAt = b.m.position;
      }
    },
  };
  return api;
}
