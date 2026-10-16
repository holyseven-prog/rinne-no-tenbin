/* battle scene + field monsters drawn from the delivered sprites. node test/play_battle.js -> test/out/visual/100/battle_*.png, world_monsters.png */
const puppeteer = require('puppeteer-core'); const path = require('path'), fs = require('fs');
const CHROME = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find(p => fs.existsSync(p));
const OUT = path.join(__dirname, 'out', 'visual', '100'); const out = []; const ck = (n, c, x) => out.push((c ? 'PASS ' : 'FAIL ') + n + (x ? ' ' + x : '')); const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => { const br = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] }); const pg = await br.newPage(); await pg.setViewport({ width: 1280, height: 720 });
  const logs = []; pg.on('pageerror', e => logs.push(e.message));
  await pg.evaluateOnNewDocument(() => { try { localStorage.setItem('rinne_tenbin_v1_settings', JSON.stringify({ bgm: 0, se: 0, lang: 'ja', tutDone: true, advisor: false, hintsSeen: { duty: 1, skip: 1, listen: 1, card: 1, godlv: 1, awe: 1, adv: 1 } })); } catch (e) { } });
  await pg.goto('file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/')); await wait(2500);
  await pg.evaluate(() => { __RT.ui.Game.pendingGod = 'mercy'; __RT.ui.Screens.opEnd(); }); await wait(1500);
  await pg.evaluate(() => { const G = __RT.G(); if (G.council && !G.council.done) closeCouncil(G.council.offer.slice(0, 2), null); __RT.ui.Screens.closeAll(); __RT.ui.Game.paused = true; __RT.ui.UI.toggleHide(); });
  /* battle scenes for each assault kind, on a plain page */
  const kinds = await pg.evaluate(() => Object.keys(ASSAULT_DEF));
  for (const a of kinds) { const ok = await pg.evaluate(a => { try { const cv = battleSceneCanvas({ a, phase: 1, done: false, partial: [], grade: 0 }); cv.id = 'bshot'; const old = document.getElementById('bshot'); if (old) old.remove(); cv.style.position = 'fixed'; cv.style.left = '0'; cv.style.top = '0'; cv.style.zIndex = 9999; cv.style.margin = '0'; document.body.appendChild(cv); return true; } catch (e) { return e.message; } }, a);
    if (ok !== true) { ck('battle ' + a, false, ok); continue; } await wait(100); await pg.screenshot({ path: path.join(OUT, 'battle_' + a + '.png'), clip: { x: 0, y: 0, width: 1004, height: 254 } }); ck('battle ' + a, true); }
  await pg.evaluate(() => { const o = document.getElementById('bshot'); if (o) o.remove(); });
  /* one of each monster type next to the plaza, camera x2 */
  const n = await pg.evaluate(() => { const G = __RT.G(); const types = Object.keys(SPR_MON).filter(k => !/^cad|boss/.test(k)); let i = 0; for (const t of types) { const m = spawnMonster(1, { x: 28, y: 24 }); if (!m) continue; m.type = t; m.x = m.px = 22 + (i % 7) * 2; m.y = m.py = 23 + Math.floor(i / 7) * 2; m.path = []; m.dir = 0; i++; } __RT.ui.Render.setZoom(2); __RT.ui.Render.centerOn(28, 24); return i; });
  await wait(400); await pg.screenshot({ path: path.join(OUT, 'world_monsters.png') }); ck('monsters placed', n > 8, n + '');
  ck('no page errors', logs.length === 0, JSON.stringify(logs.slice(0, 3))); ck('no ERRS', await pg.evaluate(() => ERRS.length === 0), await pg.evaluate(() => JSON.stringify(ERRS.slice(0, 3))));
  console.log(out.join('\n')); await br.close(); process.exit(out.some(l => l.startsWith('FAIL')) ? 1 : 0); })();
