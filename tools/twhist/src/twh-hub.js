/*
 * 台灣歷史 Taiwan's Story · 系列首頁用的小 bundle：只有時間軸（不含 three.js）。
 * 產物：cd tools/twhist && npm run build → assets/js/twh-hub.js
 */
import { initTimelines } from './timeline2d.js';

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initTimelines);
else initTimelines();
