/* V3.4 visual comparison shots. node test/v34_shots.js <tag>   (tag = v33 | v34)
   Same-scale (2x) crops of the live renderer: town centre, church, farm, plaza, north cliff, east border;
   plus character sheet (all jobs x M/F x 3 looks x 4 dirs) and building / tree / prop sheets (day + night).
   Output: test/out/visual/v34/<tag>_*.png ; when both tags exist, compare_*.png (left v33, right v34). */
const puppeteer = require('puppeteer-core'); const path = require('path'), fs = require('fs');
const CHROME = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find(p => fs.existsSync(p));
const tag = process.argv[2] || 'v34'; const OUT = path.join(__dirname, 'out', 'visual', 'v34'); fs.mkdirSync(OUT, { recursive: true });
const REG = { town: [17, 11], church: [18, 2], farm: [0, 8], plaza: [19, 13], cliff: [14, 0], east: [44, 12] };
(async () => {
  const br = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] }); const pg = await br.newPage(); await pg.setViewport({ width: 1280, height: 720 });
  const errs = []; pg.on('pageerror', e => errs.push(e.message));
  await pg.goto('file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/')); await new Promise(r => setTimeout(r, 800));
  const shots = await pg.evaluate((REG) => {
    const out = {}; const RD = (typeof Render !== 'undefined') ? Render : __RT.ui.Render;
    newGame({ seed: 20240601, god: 'mercy', lang: 'ja' }); G.fxOn = false; for (let i = 0; i < 400; i++) tick();
    const cv = RD.cv; const up = (src, k) => { const o = document.createElement('canvas'); o.width = src.width * k; o.height = src.height * k; const c = o.getContext('2d'); c.imageSmoothingEnabled = false; c.drawImage(src, 0, 0, o.width, o.height); return o.toDataURL(); };
    const at = (tod) => { const d = Math.floor(G.tick / TICK_DAY); G.tick = d * TICK_DAY + tod; };
    at(72); // noon
    Object.entries(REG).forEach(([k, p]) => { RD.cam.x = p[0] * TS; RD.cam.y = p[1] * TS; RD.clampCam(); RD.draw(0, {}); out[k] = up(cv, 2); });
    at(132); RD.cam.x = 17 * TS; RD.cam.y = 11 * TS; RD.draw(0, {}); out.town_night = up(cv, 2); at(72);
    // character sheet
    const jobs = ['swordsman', 'swordsman', 'mage', 'priest', 'thief', 'farmer', 'merchant', 'weaponer', 'armorer', 'smith', 'herbalist', 'historian'];
    const rows = []; jobs.forEach((j, ji) => ['M', 'F'].forEach(sx => rows.push({ job: j, sex: sx, lvl: ji === 1 ? 8 : 1, age: 24 })));
    ['M', 'F'].forEach(sx => { rows.push({ job: 'farmer', sex: sx, lvl: 1, age: 9 }); rows.push({ job: 'farmer', sex: sx, lvl: 1, age: 64 }); });
    const cs = document.createElement('canvas'); const cw = 3 * 4 * 18 + 8, chh = rows.length * 26 + 4; cs.width = cw; cs.height = chh; const cc = cs.getContext('2d'); cc.fillStyle = '#6a8a4a'; cc.fillRect(0, 0, cw, chh);
    rows.forEach((r, ri) => { for (let v = 0; v < 3; v++) for (let d = 0; d < 4; d++) { const h = { forceRole: ri < 2 ? 'hero' : undefined, id: 7000 + ri * 10 + v, alive: true, job: r.job, sex: r.sex, age: r.age, lvl: r.lvl, look: { hair: (ri * 3 + v * 2) % 8, style: v, skin: (ri + v) % 4, cloth: (ri + v * 3) % 8 } }; cc.drawImage(humanSprite(h, d, 0), 4 + (v * 4 + d) * 18, 2 + ri * 26); } });
    out.chars = up(cs, 4);
    // building sheet (day / night): crop each building from the baked world canvas
    const wc = getWorldCanvas(0); const bs = document.createElement('canvas'); bs.width = 900; bs.height = 300; const bc = bs.getContext('2d'); bc.fillStyle = '#4a6a3a'; bc.fillRect(0, 0, 900, 300);
    let bx = 4, by = 4, rowH = 0; const seen = {}; W.blds.forEach(b => { if (seen[b.kind]) return; seen[b.kind] = 1; const x = b.x * TS - 8, y = b.y * TS - 44, w = b.w * TS + 16, hh = b.h * TS + 50; if (bx + w > 900) { bx = 4; by += rowH + 4; rowH = 0; } bc.drawImage(wc, x, y, w, hh, bx, by, w, hh); bx += w + 4; rowH = Math.max(rowH, hh); });
    out.buildings = up(bs, 2);
    if (typeof drawConifer === 'function') { const ps = document.createElement('canvas'); const keys = Object.keys(PROPS).filter(k => k !== 'lamp' && k !== 'flag' && k !== 'stoneLantern'); ps.width = 20 * 16 + 8; ps.height = 4 * 44 + Math.ceil(keys.length / 20) * 22 + 12; const pc = ps.getContext('2d'); pc.fillStyle = '#3c8030'; pc.fillRect(0, 0, ps.width, ps.height);
      for (let sea = 0; sea < 4; sea++) { const y = 26 + sea * 44; drawConifer(pc, 8, y, sea, 0.5); drawBroad(pc, 44, y, sea, 0.3); drawBroad(pc, 84, y, sea, 0.8); drawShrub(pc, 116, y, sea); drawDeadTree(pc, 140, y, sea); }
      keys.forEach((k, i) => PROPS[k](pc, 4 + (i % 20) * 16, 4 * 44 + 8 + Math.floor(i / 20) * 22, 0)); out.props = up(ps, 3); out.propCount = 'data:,' + keys.length; }
    { const pl = townProps(); const res = []; for (let by = 5; by < 37; by += 8) for (let bx = TOWN_X0; bx <= TOWN_X1; bx += 8) { let n = pl.filter(p => p[0] >= bx && p[0] < bx + 8 && p[1] >= by && p[1] < by + 8).length; for (let y = by; y < by + 8; y++) for (let x = bx; x < bx + 8; x++) if (tileAt(x, y) === T.TREE) n++; n += W.blds.filter(b => b.x < bx + 8 && b.x + b.w > bx && b.y < by + 8 && b.y + b.h > by).length; res.push(n); } out.density = 'data:,' + Math.min(...res) + '/' + (res.reduce((a, b) => a + b, 0) / res.length).toFixed(1); }
    return out;
  }, REG);
  for (const [k, v] of Object.entries(shots)) if (v.indexOf('base64,') > 0) fs.writeFileSync(path.join(OUT, tag + '_' + k + '.png'), Buffer.from(v.split(',')[1], 'base64'));
  // compare sheets when both exist
  const other = tag === 'v34' ? 'v33' : null;
  if (other) for (const k of Object.keys(REG).concat(['town_night'])) {
    const a = path.join(OUT, other + '_' + k + '.png'), b = path.join(OUT, tag + '_' + k + '.png'); if (!fs.existsSync(a)) continue;
    const ua = 'data:image/png;base64,' + fs.readFileSync(a).toString('base64'), ub = 'data:image/png;base64,' + fs.readFileSync(b).toString('base64');
    const data = await pg.evaluate(async (ua, ub) => { const ld = u => new Promise(r => { const i = new Image(); i.onload = () => r(i); i.src = u; }); const A = await ld(ua), B = await ld(ub); const c = document.createElement('canvas'); c.width = A.width + B.width + 8; c.height = Math.max(A.height, B.height); const x = c.getContext('2d'); x.fillStyle = '#000'; x.fillRect(0, 0, c.width, c.height); x.drawImage(A, 0, 0); x.drawImage(B, A.width + 8, 0); return c.toDataURL(); }, ua, ub);
    fs.writeFileSync(path.join(OUT, 'compare_' + k + '.png'), Buffer.from(data.split(',')[1], 'base64'));
  }
  console.log('density(min/avg per 8x8)', (shots.density || '').replace('data:,', ''), 'props', (shots.propCount || '').replace('data:,', ''), 'shots', Object.keys(shots).length, 'errors', JSON.stringify(errs));
  await br.close(); process.exit(errs.length ? 1 : 0);
})().catch(e => { console.error('FAIL', e.stack); process.exit(1); });
