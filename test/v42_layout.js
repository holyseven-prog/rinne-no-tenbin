/* V4.2 layout sketches for review: whole map (village + zones + castle land), village close-up, castle floors 1-4. -> docs/figures/v42/ */
const puppeteer = require('puppeteer-core'); const path = require('path'), fs = require('fs');
const OUT = path.join(__dirname, '..', 'docs', 'figures', 'v42'); fs.mkdirSync(OUT, { recursive: true });
(async () => { const br = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', args: ['--no-sandbox'] }); const pg = await br.newPage(); const errs = []; pg.on('pageerror', e => errs.push(e.message));
  await pg.goto('file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/')); await new Promise(r => setTimeout(r, 800));
  const shots = await pg.evaluate(() => { newGame({ seed: 77, god: 'mercy', lang: 'ja' }); const out = {}; const w = getWorldCanvas(0);
    const half = document.createElement('canvas'); half.width = w.width / 2; half.height = w.height / 2; const hc = half.getContext('2d'); hc.imageSmoothingEnabled = true; hc.drawImage(w, 0, 0, half.width, half.height);
    hc.font = 'bold 14px sans-serif'; hc.textAlign = 'center'; const lab = (x, y, s) => { hc.fillStyle = 'rgba(0,0,0,.6)'; const m = hc.measureText(s).width; hc.fillRect(x - m / 2 - 4, y - 13, m + 8, 18); hc.fillStyle = '#fff'; hc.fillText(s, x, y); };
    lab(28 * 8, 30, '村'); ZONES.forEach(Z => lab((Z.x0 + Z.x1) / 2 * 8, 30, ({ plains: '平原', forest: '森', swamp: '沼', mountain: '山', nest: '竜の巣' })[Z.id] + ' ★' + Z.star)); lab(152 * 8, 30, '魔王城');
    W.blds.forEach(b => { if (b.x < 56) { hc.fillStyle = 'rgba(0,0,0,.55)'; hc.font = '10px sans-serif'; const n = (PLACES[b.kind] || PLACES[b.id] || [b.kind])[0] || b.kind; const m = hc.measureText(n).width; hc.fillRect(b.x * 8 - 1, b.y * 8 - 11, m + 2, 11); hc.fillStyle = '#ffe9a0'; hc.textAlign = 'left'; hc.fillText(n, b.x * 8, b.y * 8 - 2); } });
    out.map_all = half.toDataURL();
    const v = document.createElement('canvas'); v.width = 56 * 16; v.height = 64 * 16; v.getContext('2d').drawImage(w, 0, 0); out.map_village = v.toDataURL();
    for (let f = 1; f <= 4; f++) { const M = castleMap(f); const c = document.createElement('canvas'); c.width = M.W * 16; c.height = M.H * 16; const x = c.getContext('2d');
      for (let yy = 0; yy < M.H; yy++) for (let xx = 0; xx < M.W; xx++) { const k = M.g[yy][xx]; const A = FIELDART[k === 'wall' ? (f === 2 ? 'c_wall_evil' : 'c_wall') : k]; if (A) x.drawImage(artCanvas(A, 'fa.' + k + (k === 'wall' ? f : '')), 0, 0, A.w, Math.min(A.h, 16), xx * 16, yy * 16, 16, 16); }
      M.obj.slice().sort((a, b) => a[1] - b[1]).forEach(([ox, oy, k]) => { const A = FIELDART[k]; if (!A) return; const s = k === 'c_circle' ? 2 : 1; x.drawImage(artCanvas(A, 'fa.' + k), ox * 16, oy * 16 + 16 - A.h * s, A.w * s, A.h * s); });
      out['castle_' + f + 'F'] = c.toDataURL(); }
    return out; });
  for (const k in shots) fs.writeFileSync(path.join(OUT, k + '.png'), Buffer.from(shots[k].split(',')[1], 'base64'));
  console.log('layout', Object.keys(shots).join(' '), 'errors', JSON.stringify(errs)); await br.close(); })();
