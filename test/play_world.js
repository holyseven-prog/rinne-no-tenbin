/* world painted from the delivered sprites: castle plateau, west farms, winter village, night. node test/play_world.js -> test/out/visual/100/world_*.png */
const puppeteer = require('puppeteer-core'); const path = require('path'), fs = require('fs');
const CHROME = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find(p => fs.existsSync(p));
const OUT = path.join(__dirname, 'out', 'visual', '100'); const out = []; const ck = (n, c, x) => out.push((c ? 'PASS ' : 'FAIL ') + n + (x ? ' ' + x : '')); const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => { const br = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] }); const pg = await br.newPage(); await pg.setViewport({ width: 1280, height: 720 });
  const logs = []; pg.on('pageerror', e => logs.push(e.message));
  await pg.evaluateOnNewDocument(() => { try { localStorage.setItem('rinne_tenbin_v1_settings', JSON.stringify({ bgm: 0, se: 0, lang: 'ja', tutDone: true, advisor: false, hintsSeen: { duty: 1, skip: 1, listen: 1, card: 1, godlv: 1, awe: 1, adv: 1 } })); } catch (e) { } });
  await pg.goto('file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/')); await wait(2500);
  await pg.evaluate(() => { __RT.ui.Game.pendingGod = 'mercy'; __RT.ui.Screens.opEnd(); }); await wait(1500);
  await pg.evaluate(() => { const G = __RT.G(); if (G.council && !G.council.done) closeCouncil(G.council.offer.slice(0, 2), null); __RT.ui.Screens.closeAll(); __RT.ui.Game.paused = true; __RT.ui.UI.toggleHide(); });
  const shot = async (name, f) => { await pg.evaluate(f); await wait(400); await pg.screenshot({ path: path.join(OUT, 'world_' + name + '.png') }); };
  ck('sprites ready', await pg.evaluate(() => SPR_READY));
  await shot('castle', () => __RT.ui.Render.centerOn(58, 14));
  await shot('farms', () => __RT.ui.Render.centerOn(9, 20));
  await shot('winter', () => { const G = __RT.G(); G.tick += 9 * TICK_DAY; __RT.ui.Render.centerOn(28, 22); });
  await shot('night', () => { const G = __RT.G(); G.tick = G.tick - (G.tick % TICK_DAY) + 22 * 6 - 9 * TICK_DAY; __RT.ui.Render.centerOn(28, 22); });
  ck('no page errors', logs.length === 0, JSON.stringify(logs.slice(0, 3))); ck('no ERRS', await pg.evaluate(() => ERRS.length === 0), await pg.evaluate(() => JSON.stringify(ERRS.slice(0, 3))));
  console.log(out.join('\n')); await br.close(); process.exit(out.some(l => l.startsWith('FAIL')) ? 1 : 0); })();
