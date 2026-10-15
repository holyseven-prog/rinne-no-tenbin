/* Facing test: every job x sex x look, plus children and elders, must face the way it walks.
   dir 2 = moving left, dir 3 = moving right. On the real sprite canvas, the eye pixels must sit on the walking side of the head.
   env CHROME_PATH overrides the browser (Linux CI). */
const puppeteer = (() => { const pth = require('path'); for (const p of [process.env.PUPPETEER_CORE, 'puppeteer-core', pth.join(__dirname, '..', 'test', 'node_modules', 'puppeteer-core'), pth.join(__dirname, 'node_modules', 'puppeteer-core')]) { if (!p) continue; try { return require(p); } catch (e) { } } throw new Error('puppeteer-core not found: run npm i puppeteer-core in test/ or set PUPPETEER_CORE'); })(); /* env PUPPETEER_CORE / CHROME_PATH for Linux CI */ const path = require('path'), fs = require('fs');
const CHROME = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].filter(Boolean).find(p => { try { return fs.existsSync(p); } catch (e) { return false; } });
if (!CHROME) { console.error('No Chrome found. Set CHROME_PATH.'); process.exit(2); }
(async () => {
  const br = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] }); const pg = await br.newPage();
  await pg.goto('file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/')); await new Promise(r => setTimeout(r, 600));
  const res = await pg.evaluate(() => {
    const jobs = ['swordsman', 'priest', 'mage', 'smith', 'farmer', 'merchant', 'thief', 'herbalist', 'historian', 'weaponer', 'armorer'];
    const cases = []; jobs.forEach(j => ['M', 'F'].forEach(sx => [24, 62].forEach(age => cases.push({ job: j, sex: sx, age, lvl: 3 }))));
    ['M', 'F'].forEach(sx => { cases.push({ job: 'farmer', sex: sx, age: 8, lvl: 1 }); cases.push({ job: 'swordsman', sex: sx, age: 22, lvl: 9, forceRole: 'hero' }); });
    const EYE = [[0x1c, 0x16, 0x26], [0xff, 0xe2, 0x66]];
    const out = [];
    cases.forEach((c, ci) => [0, 1, 2].forEach(st => {
      const h = Object.assign({ id: 9000 + ci, look: { hair: ci % 5, style: st, skin: ci % 3, cloth: ci % 4 }, alive: true }, c);
      const side = dir => { const cv = humanSprite(h, dir, 0); const d = cv.getContext('2d').getImageData(0, 0, 16, 24).data; let ex = 0, en = 0, hx = 0, hn = 0;
        for (let y = 3; y <= 13; y++) for (let x = 0; x < 16; x++) { const i = (y * 16 + x) * 4; if (!d[i + 3]) continue; hx += x; hn++; if (EYE.some(e => Math.abs(d[i] - e[0]) + Math.abs(d[i + 1] - e[1]) + Math.abs(d[i + 2] - e[2]) < 8)) { ex += x; en++; } }
        return en ? Math.sign(ex / en - hx / hn) : 0; };
      const l = side(2), r = side(3); out.push({ role: c.forceRole || roleOf(h), sex: c.sex, age: c.age, st, left: l, right: r });
    }));
    return out;
  });
  const bad = res.filter(r => r.left !== -1 || r.right !== 1);
  console.log('cases', res.length, 'roles', [...new Set(res.map(r => r.role + (r.age >= 56 ? '(elder)' : '')))].join(','));
  bad.slice(0, 20).forEach(b => console.log('FAIL', JSON.stringify(b)));
  console.log(bad.length ? 'FAIL facing: ' + bad.length : 'PASS facing: all sprites face their walking direction');
  await br.close(); process.exit(bad.length ? 1 : 0);
})().catch(e => { console.error('FAIL', e.stack); process.exit(1); });
