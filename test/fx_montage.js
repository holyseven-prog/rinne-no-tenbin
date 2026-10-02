/* divine effects montage: 5 powers x 6 frames -> test/out/visual/divine_fx.png */
const puppeteer = require('puppeteer-core'); const path = require('path'), fs = require('fs');
const CHROME = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find(p => fs.existsSync(p));
const OUT = path.join(__dirname, 'out', 'visual'); const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const br = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] }); const pg = await br.newPage(); await pg.setViewport({ width: 1280, height: 720 });
  await pg.evaluateOnNewDocument(() => { try { localStorage.setItem('rinne_tenbin_v1_settings', JSON.stringify({ bgm: 0, se: 0, speed: 0, text: 3, lang: 'ja', names: 'key', theme: 'black', autoSlow: false, advisor: false, tutDone: true, weather: false })); } catch (e) { } });
  await pg.goto('file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/')); await wait(700); await pg.mouse.click(640, 360); await wait(300);
  await pg.evaluate(() => { __RT.ui.Game.pendingGod = 'mercy'; __RT.ui.Screens.opEnd(); }); await wait(900);
  await pg.evaluate(() => { __RT.ui.Game.paused = true; __RT.G().tick = 144 + 12 * 6; __RT.ui.Render.centerOn(28, 21); window.requestAnimationFrame = () => 0; }); await wait(250);
  const shots = [];
  for (const pid of ['grace', 'oracle', 'trial', 'soul', 'force']) {
    for (let f = 0; f < 6; f++) {
      await pg.evaluate((p, ff) => { const R = __RT.ui.Render; R.beam = { x: R.cam.x + 320, y: R.cam.y + 200, life: 46 - ff * 8, pid: p, out: 'success' }; R.dim = 0.45; R.draw(0, {}); }, pid, f); await wait(60);
      const buf = await pg.screenshot({ clip: { x: 340, y: 200, width: 600, height: 340 } }); shots.push(buf.toString('base64'));
    }
  }
  const pg2 = await br.newPage(); await pg2.setViewport({ width: 1600, height: 900 });
  const url = await pg2.evaluate(async (imgs) => { const cv = document.createElement('canvas'); cv.width = 6 * 300; cv.height = 5 * 170; const c = cv.getContext('2d'); await Promise.all(imgs.map((b, i) => new Promise(r => { const im = new Image(); im.onload = () => { c.drawImage(im, (i % 6) * 300, ((i / 6) | 0) * 170, 300, 170); r(); }; im.src = 'data:image/png;base64,' + b; }))); return cv.toDataURL('image/png'); }, shots);
  fs.writeFileSync(path.join(OUT, 'divine_fx.png'), Buffer.from(url.split(',')[1], 'base64')); console.log('ok'); await br.close();
})();
