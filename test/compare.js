/* before/after: v0.2 (git tag v0.2-improvement) vs current: spring noon / summer dusk / autumn dawn / winter night */
const puppeteer = require('puppeteer-core'); const path = require('path'), fs = require('fs');
const CHROME = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find(p => fs.existsSync(p));
const OUT = path.join(__dirname, 'out', 'visual'); const wait = ms => new Promise(r => setTimeout(r, ms));
const cases = [['spring_noon', 1, 12], ['summer_dusk', 4, 18], ['autumn_dawn', 7, 6.5], ['winter_night', 10, 21]];
(async () => {
  const br = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
  for (const [ver, file] of [['old', path.join(OUT, '_v02.html')], ['new', path.resolve(__dirname, '../index.html')]]) {
    const pg = await br.newPage(); await pg.setViewport({ width: 1280, height: 720 });
    await pg.evaluateOnNewDocument(() => { try { localStorage.setItem('rinne_tenbin_v1_settings', JSON.stringify({ bgm: 0, se: 0, speed: 0, text: 3, lang: 'ja', names: 'key', theme: 'black', autoSlow: false, advisor: false, tutDone: true, weather: false })); } catch (e) { } });
    await pg.goto('file:///' + file.split(path.sep).join('/')); await wait(700); await pg.mouse.click(640, 360); await wait(300);
    await pg.evaluate(() => { __RT.ui.Game.pendingGod = 'mercy'; __RT.ui.Screens.opEnd(); }); await wait(900);
    await pg.evaluate(() => { __RT.ui.Game.paused = true; __RT.ui.Render.centerOn(28, 18); });
    for (const [n, d, h] of cases) { await pg.evaluate((dd, hh) => { __RT.G().tick = dd * 144 + hh * 6; }, d, h); await wait(450); await pg.screenshot({ path: path.join(OUT, 'compare_' + n + '_' + ver + '.png'), clip: { x: 0, y: 0, width: 1280, height: 720 } }); }
    await pg.close();
  }
  await br.close(); console.log('done');
})();
