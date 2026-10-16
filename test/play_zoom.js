/* 1280x720 world: village at camera x1 and x2 (people drawn from the sheet data), picking still works at both. node test/play_zoom.js [ja|zh] */
const puppeteer = require('puppeteer-core'); const path = require('path'), fs = require('fs');
const CHROME = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find(p => fs.existsSync(p));
const lang = process.argv[2] || 'ja'; const OUT = path.join(__dirname, 'out', 'visual', '100'); fs.mkdirSync(OUT, { recursive: true });
const out = []; const ck = (n, c, x) => out.push((c ? 'PASS ' : 'FAIL ') + n + (x ? ' ' + x : '')); const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => { const br = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] }); const pg = await br.newPage(); await pg.setViewport({ width: 1280, height: 720 });
  const logs = []; pg.on('pageerror', e => logs.push(e.message));
  await pg.evaluateOnNewDocument(l => { try { localStorage.setItem('rinne_tenbin_v1_settings', JSON.stringify({ bgm: 0, se: 0, speed: 1, text: 3, lang: l, tutDone: true, autoSlow: false, advisor: false, hintsSeen: { duty: 1, skip: 1, listen: 1, card: 1, godlv: 1, awe: 1, adv: 1 } })); } catch (e) { } }, lang);
  await pg.goto('file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/')); await wait(2500);
  ck('sprites decoded', await pg.evaluate(() => SPR_READY && Object.keys(SPR).length > 1500), await pg.evaluate(() => Object.keys(SPR).length + ''));
  await pg.evaluate(() => { __RT.ui.Game.pendingGod = 'mercy'; __RT.ui.Screens.opEnd(); }); await wait(1500);
  await pg.evaluate(() => { const G = __RT.G(); if (G.council && !G.council.done) closeCouncil(G.council.offer.slice(0, 2), null); __RT.ui.Screens.closeAll(); __RT.ui.Game.paused = true; __RT.ui.UI.toggleHide(); const ad = G.humans.filter(h => h.alive && !h.inside).slice(0, 12); ad.forEach((h, i) => { h.x = h.px = 24 + (i % 6) * 2; h.y = h.py = 23 + Math.floor(i / 6) * 2; h.dir = i % 4; h.path = []; }); __RT.ui.Render.centerOn(28, 22); }); await wait(500);
  ck('canvas is 1280x720', await pg.evaluate(() => { const c = document.getElementById('game'); return c.width === 1280 && c.height === 720; }));
  await pg.screenshot({ path: path.join(OUT, 'village_x1_' + lang + '.png') });
  await pg.evaluate(() => { __RT.ui.Render.setZoom(2); __RT.ui.Render.centerOn(28, 21); }); await wait(400); await pg.screenshot({ path: path.join(OUT, 'village_x2_' + lang + '.png') });
  // picking at x2: click the screen position of a villager -> selected
  const hit = await pg.evaluate(() => { const G = __RT.G(), R = __RT.ui.Render; const h = G.humans.find(x => x.alive && !x.inside && Math.abs(x.x * TS - R.cam.x - R.VW / 2) < R.VW / 3 && Math.abs(x.y * TS - R.cam.y - R.VH / 2) < R.VH / 3); if (!h) return null; return { id: h.id, x: (h.x * TS + 8 - R.cam.x) * R.k, y: (h.y * TS - 2 - R.cam.y) * R.k }; });
  if (hit) { await pg.mouse.click(hit.x, hit.y); await wait(300); ck('click selects the villager at x2', await pg.evaluate(id => __RT.ui.Game.selId === id, hit.id)); } else ck('a villager on screen', false);
  await pg.evaluate(() => __RT.ui.Render.setZoom(1)); await pg.keyboard.press('+'); await wait(100); ck('+ zooms to x1.5', await pg.evaluate(() => __RT.ui.Render.Z === 1.5)); await pg.keyboard.press('-'); ck('- back to x1', await pg.evaluate(() => __RT.ui.Render.Z === 1));
  ck('no page errors', logs.length === 0, JSON.stringify(logs.slice(0, 3))); ck('no ERRS', await pg.evaluate(() => ERRS.length === 0), await pg.evaluate(() => JSON.stringify(ERRS.slice(0, 3))));
  console.log(out.join('\n')); await br.close(); process.exit(out.some(l => l.startsWith('FAIL')) ? 1 : 0); })();
