/* Facing test (V4 A0): every role / child / elder / female must face the way it walks.
   dir 3 = moving right, dir 2 = moving left. The eye must sit in front of the head centre (skin+hair) on the walking side. */
const puppeteer = require('puppeteer-core'); const path = require('path'), fs = require('fs');
const CHROME = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find(p => fs.existsSync(p));
(async () => {
  const br = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] }); const pg = await br.newPage();
  await pg.goto('file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/')); await new Promise(r => setTimeout(r, 600));
  const res = await pg.evaluate(() => {
    const jobs = ['swordsman', 'priest', 'mage', 'smith', 'farmer', 'merchant', 'thief', 'herbalist', 'historian', 'weaponer', 'armorer'];
    const cases = []; jobs.forEach(j => ['M', 'F'].forEach(sx => [20, 60].forEach(age => cases.push({ job: j, sex: sx, age, lvl: j === 'swordsman' && age === 20 ? 7 : 1 }))));
    ['M', 'F'].forEach(sx => { cases.push({ job: 'farmer', sex: sx, age: 8, lvl: 1 }); cases.push({ job: 'swordsman', sex: sx, age: 22, lvl: 1 }); });
    const out = [];
    cases.forEach((c, ci) => [0, 1, 2, 3].forEach(st => {
      const h = Object.assign({ id: 9000 + ci, look: { hair: ci % 5, style: st, skin: ci % 3, cloth: ci % 4 }, alive: true }, c);
      const g = humanGrid(h, 2, 0); let sx = 0, sn = 0, ox = 0, on = 0;
      let ey = g.findIndex(r => (r || []).indexOf('e') >= 0); if (ey < 0) ey = 8; for (let y = ey - 5; y <= ey + 2 && y < g.length; y++) for (let x = 0; x < 16; x++) { const ch = (g[y] || '')[x]; if (ch !== 's' && ch !== 'h' && ch !== 'e') continue; ox += x; on++; if (ch === 'e') { sx += x; sn++; } }
      const side = sn ? Math.sign(sx / sn - ox / on) : 0; // +1: side art faces right
      const alpha = (cv, x, y) => cv.getContext('2d').getImageData(x, y, 1, 1).data[3] > 0;
      const r = humanSprite(h, 3, 0), l = humanSprite(h, 2, 0); let mirrorOk = true, sameOk = true;
      for (let y = 0; y < 24; y++) for (let x = 0; x < 16; x++) { const op = !!((g[y] || '')[x] && g[y][x] !== '.'); if (op && !alpha(r, x, y)) sameOk = false; if (alpha(l, 15 - x, y) !== alpha(r, x, y)) mirrorOk = false; }
      out.push({ role: roleOf(h), sex: c.sex, age: c.age, st, side, sameOk, mirrorOk, sn });
    }));
    return out;
  });
  const bad = res.filter(r => r.side !== 1 || !r.sameOk || !r.mirrorOk);
  const roles = [...new Set(res.map(r => r.role + (r.age >= 56 ? '(elder)' : '')))];
  console.log('cases', res.length, 'roles', roles.join(','));
  bad.slice(0, 20).forEach(b => console.log('FAIL', JSON.stringify(b)));
  console.log(bad.length ? 'FAIL facing: ' + bad.length : 'PASS facing: all sprites face their walking direction');
  await br.close(); process.exit(bad.length ? 1 : 0);
})().catch(e => { console.error('FAIL', e.stack); process.exit(1); });
