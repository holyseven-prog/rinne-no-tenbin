/* Part B7: every 8x8 block of the town has at least 4 objects (props, trees or buildings). node test/props_density.js */
const puppeteer = require('puppeteer-core'); const path = require('path'), fs = require('fs');
const CHROME = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find(p => fs.existsSync(p));
(async () => { const br = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] }); const pg = await br.newPage();
  await pg.goto('file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/')); await new Promise(r => setTimeout(r, 600));
  const r = await pg.evaluate(() => { const pl = townProps(); const out = []; for (let by = 5; by < 37; by += 8) for (let bx = TOWN_X0; bx <= TOWN_X1; bx += 8) { let n = pl.filter(p => p[0] >= bx && p[0] < bx + 8 && p[1] >= by && p[1] < by + 8).length; for (let y = by; y < by + 8; y++) for (let x = bx; x < bx + 8; x++) if (tileAt(x, y) === T.TREE) n++; n += W.blds.filter(b => b.x < bx + 8 && b.x + b.w > bx && b.y < by + 8 && b.y + b.h > by).length; out.push([bx, by, n]); } return { blocks: out, kinds: Object.keys(PROPS).length }; });
  const bad = r.blocks.filter(b => b[2] < 4); console.log('blocks', r.blocks.length, 'min', Math.min(...r.blocks.map(b => b[2])), 'prop kinds', r.kinds); bad.forEach(b => console.log('FAIL block', b.join(',')));
  const ok = !bad.length && r.kinds >= 35; console.log(ok ? 'PASS' : 'FAIL'); await br.close(); process.exit(ok ? 0 : 1); })();
