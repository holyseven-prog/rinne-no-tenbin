/* Part E acceptance: test/out/visual/enemy/compare_<name>.png (left: design crop; right: map sprites F/B/L/R x frames (x3) and battle pose (x1.5)) */
const puppeteer = (() => { const pth = require('path'); for (const p of [process.env.PUPPETEER_CORE, 'puppeteer-core', pth.join(__dirname, '..', 'test', 'node_modules', 'puppeteer-core'), pth.join(__dirname, 'node_modules', 'puppeteer-core')]) { if (!p) continue; try { return require(p); } catch (e) { } } throw new Error('puppeteer-core not found: run npm i puppeteer-core in test/ or set PUPPETEER_CORE'); })(); /* env PUPPETEER_CORE / CHROME_PATH for Linux CI */ const path = require('path'), fs = require('fs');
const CHROME = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find(p => fs.existsSync(p));
const OUT = path.join(__dirname, 'out', 'visual', 'enemy'); fs.mkdirSync(OUT, { recursive: true });
const E = [['e01_mush', 'mush'], ['e02_bat', 'bat'], ['e03_turtle', 'turtle'], ['e04_goblin', 'goblin'], ['e05_skel', 'skel'], ['e06_wolf', 'wolf'], ['e07_dragon', 'dragon'], ['e08_verna', 'verna'], ['e09_garum', 'garum'], ['e10_serene', 'serene'], ['e11_king', 'king']];
(async () => {
  const br = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] }); const pg = await br.newPage(); const errs = []; pg.on('pageerror', e => errs.push(e.message));
  await pg.goto('file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/')); await new Promise(r => setTimeout(r, 700));
  for (const [file, key] of E) { const u = 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, '..', 'docs', 'figures', 'enemy', file + '.png')).toString('base64');
    const d = await pg.evaluate(async (u, key) => { const im = new Image(); await new Promise(r => { im.onload = r; im.src = u; }); const H = 420, dw = Math.round(im.width * H / im.height); const A = ENEMYART[key];
      const big = A.map.F[0].w > 24; const sc = big ? 2 : 3; const c = document.createElement('canvas'); c.width = dw + 40 + 4 * (A.map.F[0].w * sc + 8) * 1 + 260; c.height = H; const g = c.getContext('2d'); g.fillStyle = '#f4efe4'; g.fillRect(0, 0, c.width, H); g.drawImage(im, 0, 0, dw, H); g.imageSmoothingEnabled = false;
      ['F', 'B', 'L', 'R'].forEach((v, k) => A.map[v].forEach((s, f) => g.drawImage(artCanvas(s, 'cmp.' + key + v + f), dw + 20 + k * (s.w * sc + 8), 10 + f * (s.h * sc + 8), s.w * sc, s.h * sc)));
      A.bat.L.forEach((s, f) => g.drawImage(artCanvas(s, 'cmpb.' + key + f), c.width - 250 + f * 10, 10 + f * (s.h * 1.5 > 200 ? 205 : s.h * 1.5 + 8), s.w * 1.5, s.h * 1.5)); return c.toDataURL(); }, u, key);
    fs.writeFileSync(path.join(OUT, 'compare_' + file.slice(4) + '.png'), Buffer.from(d.split(',')[1], 'base64')); }
  console.log('enemy compare', E.length, 'errors', JSON.stringify(errs)); await br.close(); process.exit(errs.length ? 1 : 0);
})().catch(e => { console.error('FAIL', e.stack); process.exit(1); });
