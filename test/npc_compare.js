/* Part A acceptance: test/out/visual/npc/compare_<job>.png (left: design crop, right: implementation M/F x front/back/left/right, x4),
   silhouettes.png (all jobs black), sheet.png (all jobs, design-sheet order). node test/npc_compare.js */
const puppeteer = (() => { const pth = require('path'); for (const p of [process.env.PUPPETEER_CORE, 'puppeteer-core', pth.join(__dirname, '..', 'test', 'node_modules', 'puppeteer-core'), pth.join(__dirname, 'node_modules', 'puppeteer-core')]) { if (!p) continue; try { return require(p); } catch (e) { } } throw new Error('puppeteer-core not found: run npm i puppeteer-core in test/ or set PUPPETEER_CORE'); })(); /* env PUPPETEER_CORE / CHROME_PATH for Linux CI */ const path = require('path'), fs = require('fs');
const CHROME = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find(p => fs.existsSync(p));
const OUT = path.join(__dirname, 'out', 'visual', 'npc'); fs.mkdirSync(OUT, { recursive: true });
const JOBS = [['01_hero', 'hero', 'swordsman'], ['02_swordsman', 'warrior', 'swordsman'], ['03_thief', 'thief', 'thief'], ['04_mage', 'mage', 'mage'], ['05_priest', 'priest', 'priest'], ['06_farmer', 'farmer', 'farmer'], ['07_merchant', 'merchant', 'merchant'], ['08_smith', 'smith', 'smith'], ['09_herbalist', 'herbalist', 'herbalist'], ['10_weaponer', 'weaponer', 'weaponer'], ['11_armorer', 'armorer', 'armorer']];
(async () => {
  const br = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] }); const pg = await br.newPage(); const errs = []; pg.on('pageerror', e => errs.push(e.message));
  await pg.goto('file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/')); await new Promise(r => setTimeout(r, 700));
  for (const [file, role, job] of JOBS) {
    const u = 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, '..', 'docs', 'figures', 'npc', file + '.png')).toString('base64');
    const d = await pg.evaluate(async (u, role, job) => {
      const im = new Image(); await new Promise(r => { im.onload = r; im.src = u; }); const H = 420; const dw = Math.round(im.width * H / im.height);
      const c = document.createElement('canvas'); c.width = dw + 20 + 4 * 72; c.height = H; const g = c.getContext('2d'); g.fillStyle = '#f4efe4'; g.fillRect(0, 0, c.width, H); g.drawImage(im, 0, 0, dw, H); g.imageSmoothingEnabled = false;
      ['M', 'F'].forEach((sx, si) => [0, 1, 2, 3].forEach((dir, k) => { const h = { forceRole: role, id: 1, alive: true, job, sex: sx, age: 24, lvl: 3, look: { hair: 0, style: 0, skin: 0, cloth: 0 } }; const s = humanSprite(h, [0, 1, 2, 3][k], 0); g.drawImage(s, dw + 20 + k * 72, 40 + si * 190, 64, 96); }));
      g.fillStyle = '#333'; g.font = '14px sans-serif'; ['前', '後', '左', '右'].forEach((l, k) => g.fillText(l, dw + 20 + k * 72 + 26, 20)); return c.toDataURL();
    }, u, role, job);
    fs.writeFileSync(path.join(OUT, 'compare_' + file.slice(3) + '.png'), Buffer.from(d.split(',')[1], 'base64'));
  }
  // silhouettes + sheet
  const two = await pg.evaluate((JOBS) => {
    const mk = sil => { const c = document.createElement('canvas'); c.width = 11 * 4 * 36 / 2 + 40; c.height = 2 * 2 * 56 + 20; const g = c.getContext('2d'); g.fillStyle = sil ? '#ffffff' : '#7a9a5a'; g.fillRect(0, 0, c.width, c.height); g.imageSmoothingEnabled = false;
      JOBS.forEach(([f, role, job], ji) => ['M', 'F'].forEach((sx, si) => [0, 1, 2, 3].forEach((dir, k) => { const h = { forceRole: role, id: 1, alive: true, job, sex: sx, age: 24, lvl: 3, look: { hair: 0, style: 0, skin: 0, cloth: 0 } }; let s = humanSprite(h, dir, 0);
        if (sil) { const t = document.createElement('canvas'); t.width = 16; t.height = 24; const tg = t.getContext('2d'); tg.drawImage(s, 0, 0); tg.globalCompositeOperation = 'source-in'; tg.fillStyle = '#000'; tg.fillRect(0, 0, 16, 24); s = t; }
        const col = (ji % 6) * 4 + k, row = Math.floor(ji / 6) * 2 + si; g.drawImage(s, 10 + col * 34, 10 + row * 52, 32, 48); }))); return c.toDataURL(); };
    return [mk(false), mk(true)];
  }, JOBS);
  fs.writeFileSync(path.join(OUT, 'sheet.png'), Buffer.from(two[0].split(',')[1], 'base64')); fs.writeFileSync(path.join(OUT, 'silhouettes.png'), Buffer.from(two[1].split(',')[1], 'base64'));
  console.log('npc compare', JOBS.length, 'errors', JSON.stringify(errs)); await br.close(); process.exit(errs.length ? 1 : 0);
})().catch(e => { console.error('FAIL', e.stack); process.exit(1); });
