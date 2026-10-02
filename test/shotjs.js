/* node test/shotjs.js <out-name> <lang> "<js to run in page after boot>" [waitMs] [vw vh] — quick one-off screenshot into test/out/visual */
const puppeteer = require('puppeteer-core'); const path = require('path'), fs = require('fs');
const [name, lang, code, wait, vw, vh] = process.argv.slice(2);
const CHROME = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find(p => fs.existsSync(p));
(async () => {
  const br = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] }); const pg = await br.newPage(); await pg.setViewport({ width: +vw || 1280, height: +vh || 720 });
  const logs = []; pg.on('pageerror', e => logs.push(e.message)); pg.on('console', m => { if (m.type() === 'error') logs.push(m.text()); });
  await pg.evaluateOnNewDocument(l => { try { localStorage.setItem('rinne_tenbin_v1_settings', JSON.stringify({ bgm: 0, se: 0, speed: 0, text: 3, lang: l || 'ja', names: 'key', theme: 'black', autoSlow: false, advisor: false, tutDone: true })); } catch (e) { } }, lang || 'ja');
  await pg.goto('file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/')); await new Promise(r => setTimeout(r, 700)); await pg.mouse.click(640, 360); await new Promise(r => setTimeout(r, 500));
  if (process.env.PLAY) { await pg.evaluate(() => { __RT.ui.Game.pendingGod = 'mercy'; __RT.ui.Screens.opEnd(); }); await new Promise(r => setTimeout(r, 900)); await pg.evaluate(() => { __RT.ui.Game.paused = true; }); }
  if (code) await pg.evaluate(code); await new Promise(r => setTimeout(r, +wait || 800));
  fs.mkdirSync(path.join(__dirname, 'out', 'visual'), { recursive: true }); await pg.screenshot({ path: path.join(__dirname, 'out', 'visual', name + '.png') }); console.log('errors', JSON.stringify(logs)); await br.close();
})();
