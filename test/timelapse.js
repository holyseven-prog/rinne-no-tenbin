/* timelapse + seasons for the visual package: node test/timelapse.js  -> test/out/visual/day_HH.png, season_N.png, weather_*.png */
const puppeteer = require('puppeteer-core'); const path = require('path'), fs = require('fs');
const CHROME = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find(p => fs.existsSync(p));
const OUT = path.join(__dirname, 'out', 'visual'); fs.mkdirSync(OUT, { recursive: true }); const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const br = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] }); const pg = await br.newPage(); await pg.setViewport({ width: 1280, height: 720 });
  const logs = []; pg.on('pageerror', e => logs.push(e.message));
  await pg.evaluateOnNewDocument(() => { try { localStorage.setItem('rinne_tenbin_v1_settings', JSON.stringify({ bgm: 0, se: 0, speed: 0, text: 3, lang: 'ja', names: 'key', theme: 'black', autoSlow: false, advisor: false, tutDone: true })); } catch (e) { } });
  await pg.goto('file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/')); await wait(700); await pg.mouse.click(640, 360); await wait(300);
  await pg.evaluate(() => { __RT.ui.Game.pendingGod = 'mercy'; __RT.ui.Screens.opEnd(); }); await wait(900);
  await pg.evaluate(() => { __RT.ui.Game.paused = true; __RT.ui.Game.speedIdx = 0; const R = __RT.ui.Render; R.centerOn(28, 21); });
  const setT = (day, hour) => pg.evaluate((d, h) => { const G = __RT.G(); G.tick = d * 144 + h * 6; }, day, hour);
  for (const hh of [0, 3, 6, 9, 12, 15, 18, 21]) { await setT(1, hh); await wait(500); await pg.screenshot({ path: path.join(OUT, 'day_' + String(hh).padStart(2, '0') + '.png') }); }
  for (const [n, d] of [[0, 1], [1, 4], [2, 7], [3, 10]]) { await setT(d, 12); await wait(500); await pg.screenshot({ path: path.join(OUT, 'season_' + n + '.png') }); }
  console.log('errors', JSON.stringify(logs)); await br.close();
})();
