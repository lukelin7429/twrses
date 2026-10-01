/*
 * 無頭 Chrome 截圖（瀏覽器面板在背景時不繪製，用這個實測 3D 頁面；WebGL 正常）。
 *   node tools/astro/scripts/shot.mjs <url> <out.png> [寬 1280] [高 900] [mobile]  < steps.js
 * stdin 是要在頁面裡依序執行的 JS（用一行 --- 分段，每段可 await、可 return 值，結果會印出來），最後截圖。
 * 主控台的 error／warning 與未捕捉的例外也會印出來。例：
 *   node tools/astro/scripts/shot.mjs http://localhost:4140/resources/classes/astronomy/milky-way/ /tmp/a.png <<'JS'
 *   const r = document.querySelector('[data-milkyway-lab]'); r.scrollIntoView(); await new Promise(z => setTimeout(z, 3000));
 *   r.__lab.setView('inside', true); r.__lab.render(); return 1;
 *   JS
 */
import { spawn } from 'node:child_process';
import { writeFileSync, readFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const [url, out, W = '1280', H = '900', mobile] = process.argv.slice(2);
const steps = readFileSync(0, 'utf8').split('\n---\n').map((s) => s.trim()).filter(Boolean);
const port = 9333 + Math.floor(Math.random() * 500);
const dir = mkdtempSync(join(tmpdir(), 'chr'));
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${dir}`, '--use-angle=swiftshader', '--enable-unsafe-swiftshader', `--window-size=${W},${H}`, 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let tgt;
for (let k = 0; k < 50 && !tgt; k++) { await sleep(200); try { tgt = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === 'page'); } catch {} }
const ws = new WebSocket(tgt.webSocketDebuggerUrl); await new Promise((r) => ws.addEventListener('open', r));
let id = 0; const pend = new Map(); const logs = [];
ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } if (m.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(m.params.type)) logs.push(m.params.type + ': ' + m.params.args.map((a) => a.value ?? a.description).join(' ')); if (m.method === 'Runtime.exceptionThrown') logs.push('EXC: ' + JSON.stringify(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text)); });
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
await send('Runtime.enable'); await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', { width: +W, height: +H, deviceScaleFactor: 1, mobile: !!mobile });
if (mobile) await send('Emulation.setTouchEmulationEnabled', { enabled: true });
await send('Page.navigate', { url }); await sleep(2500);
for (const s of steps) { const r = await send('Runtime.evaluate', { expression: `(async()=>{${s}})()`, awaitPromise: true, returnByValue: true }); console.log('>', JSON.stringify(r.result?.result?.value ?? r.result?.exceptionDetails?.exception?.description)); }
const shot = await send('Page.captureScreenshot', { format: 'png' });
writeFileSync(out, Buffer.from(shot.result.data, 'base64'));
console.log(logs.length ? logs.join('\n') : 'no console errors/warnings');
ws.close(); chrome.kill();
