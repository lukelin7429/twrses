/**
 * Verify every 🔊 button on a booklet page actually plays a recording.
 *
 *   npm i jsdom            (once, anywhere; or run from a dir that has it)
 *   node tools/verify_say.js resources/booklets/description/book2
 *
 * Loads the REAL page HTML, the REAL assets/js/main.js and the REAL manifest,
 * then dispatches a click on every [data-say] element and counts what happened.
 *
 * Why this and not a hand-written DOM stub: a stub only exercises the path you
 * already believe is taken. Three fixes in a row "passed" against a stub while
 * the live page was still using the device voice — this harness caught the one
 * button in 355 that the stub never touched.
 *
 * A clean run is: machine voice 0.
 */
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const pageDir = process.argv[2];
if (!pageDir) { console.error('usage: node tools/verify_say.js <booklet dir>'); process.exit(2); }

const ROOT = path.resolve(__dirname, '..');
const slug = pageDir.replace(/\/$/, '').split('/').slice(-2).join('-');   // description-book2
const html = fs.readFileSync(path.join(ROOT, pageDir, 'index.html'), 'utf8');
const main = fs.readFileSync(path.join(ROOT, 'assets/js/main.js'), 'utf8');
const manPath = path.join(ROOT, 'assets/data/say', slug + '.json');
if (!fs.existsSync(manPath)) { console.error('no manifest: ' + manPath + ' — run tools/gen_audio.py first'); process.exit(2); }
const manifest = JSON.parse(fs.readFileSync(manPath, 'utf8'));

// runScripts lets window.eval() run main.js inside the page's own window; without
// it the eval sees Node's globals and main.js dies on the first document call.
const dom = new JSDOM(html, { runScripts: 'outside-only', pretendToBeVisual: true,
  url: 'https://twrses.org/' + pageDir.replace(/\/$/, '') + '/' });
const w = dom.window;
const log = [];

// jsdom has no layout, so these exist only to let main.js run to the end.
w.Element.prototype.scrollTo = function () {};
w.Element.prototype.scrollIntoView = function () {};
w.HTMLMediaElement.prototype.play = function () { log.push(this.src); return Promise.resolve(); };
w.HTMLMediaElement.prototype.pause = function () {};
w.Audio = function (src) { log.push(src); return { src, pause() {}, play: () => Promise.resolve(),
  set onended(v) {}, set onerror(v) {} }; };
w.speechSynthesis = { cancel() {}, getVoices: () => [{ lang: 'en-US', name: 'stub' }],
  speak() { log.push('DEVICE-VOICE'); } };
w.SpeechSynthesisUtterance = function (t) { this.text = t; };
w.fetch = (u) => Promise.resolve({ ok: String(u).includes(slug), json: () => Promise.resolve(manifest) });

w.eval(main);

setTimeout(() => {
  const btns = [...w.document.querySelectorAll('[data-say]')];
  let human = 0, tts = 0, robot = 0;
  const stragglers = [];
  for (const b of btns) {
    log.length = 0;
    b.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
    const clip = log.find((x) => typeof x === 'string' && x.startsWith('http'));
    const voice = log.includes('DEVICE-VOICE');
    if (voice || !clip) { robot++; stragglers.push((b.getAttribute('data-say') || '').slice(0, 64)); }
    else if (clip.includes('description-audio')) human++;
    else tts++;
  }
  console.log(`${pageDir}  ·  ${btns.length} buttons`);
  console.log(`  human recording : ${human}`);
  console.log(`  generated clip  : ${tts}`);
  console.log(`  device voice    : ${robot}`);
  if (stragglers.length) {
    console.log('\nstill on the device voice:');
    stragglers.slice(0, 15).forEach((s) => console.log('  · ' + s));
    console.log('\nusually means gen_audio.py ran before build.py rewrote the page,');
    console.log('or the phrase sits outside .audio-row and has no clip of its own.');
    process.exit(1);
  }
  console.log('\nclean ✅');
}, 150);
