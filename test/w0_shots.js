/* V4.2 W0 screenshots: village south district, farm, 5 field zones, demon castle land, minimap. node test/w0_shots.js [season 0-3] */
const puppeteer = require('puppeteer-core'); const path = require('path'), fs = require('fs');
const CHROME = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find(p => fs.existsSync(p));
const OUT = path.join(__dirname, 'out', 'visual', 'v42'); fs.mkdirSync(OUT, { recursive: true }); const sea = +process.argv[2] || 0;
const REG = { south: [14, 36], farm: [0, 12], plains: [58, 12], forest: [80, 12], swamp: [100, 26], mountain: [118, 12], nest: [130, 12], castle: [134, 14] };
(async () => { const br = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] }); const pg = await br.newPage(); const errs = []; pg.on('pageerror', e => errs.push(e.message));
  await pg.goto('file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/')); await new Promise(r => setTimeout(r, 800));
  const shots = await pg.evaluate((REG, sea) => { const R = __RT.ui.Render; newGame({ seed: 77, god: 'mercy', lang: 'ja' }); G.fxOn = false; for (let i = 0; i < 300; i++) tick(); G.tick = Math.floor(G.tick / TICK_DAY) * TICK_DAY + 72 + sea * 3 * TICK_DAY; const out = {};
    for (const k in REG) { R.cam.x = REG[k][0] * TS; R.cam.y = REG[k][1] * TS; R.clampCam(); R.draw(0, {}); out[k] = R.cv.toDataURL(); }
    const m = document.createElement('canvas'); m.width = 800; m.height = 320; Mini.build(); Mini.draw(m, 0, 0); out.minimap = m.toDataURL(); return out; }, REG, sea);
  for (const k in shots) fs.writeFileSync(path.join(OUT, 'w0_' + k + '_s' + sea + '.png'), Buffer.from(shots[k].split(',')[1], 'base64'));
  console.log('w0 shots', Object.keys(shots).length, 'errors', JSON.stringify(errs)); await br.close(); process.exit(errs.length ? 1 : 0); })();
