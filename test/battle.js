const puppeteer = require('puppeteer-core');
const path = require('path');
const URL = 'file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/');
const lang = process.argv[2] || 'ja';
const seed = +process.argv[3] || 4;
(async () => {
  const br = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', args: ['--autoplay-policy=no-user-gesture-required', '--no-sandbox', '--window-size=1280,720'] });
  const pg = await br.newPage(); await pg.setViewport({ width: 1280, height: 720 });
  const logs = [];
  pg.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') logs.push(m.type() + ': ' + m.text()); });
  pg.on('pageerror', e => logs.push('pageerror: ' + e.message));
  await pg.evaluateOnNewDocument(l => { try { localStorage.setItem('rinne_tenbin_v1_settings', JSON.stringify({ bgm: 0.6, se: 0.7, speed: 1, text: 3, lang: l })); } catch (e) { } }, lang);
  await pg.goto(URL); await new Promise(r => setTimeout(r, 600));
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const shot = async n => { await pg.screenshot({ path: path.join(__dirname, 'shots', lang + '_' + n + '.png') }); };
  await pg.mouse.click(640, 360); await wait(400);
  await pg.evaluate(s => { __RT.ui.Screens.closeAll(); __RT.ui.Screens.clearScr(); __RT.newGame({ seed: s, god: 'order', lang: LANG }); __RT.policy('none'); }, seed);
  // run to a raid first (fast)
  await pg.evaluate(() => { const G = __RT.G(); let n = 0; while (!(G.raidAlive > 0 && G.tick > 4000) && n < 12000 && !G.ending) { __RT.step(5); n += 5; } });
  await wait(300); await pg.evaluate(() => { __RT.ui.Game.speedIdx = 1; __RT.ui.Screens.closeAll(); const G = __RT.G(); const m = G.monsters.find(x => x.alive && x.mode === 'raid'); if (m) __RT.ui.Render.centerOn(m.x, m.y); }); await wait(1500); await shot('30_raid');
  await pg.evaluate(() => { const G = __RT.G(); let n = 0; while (!G.awakened && n < 8000 && !G.ending) { __RT.step(10); n += 10; } __RT.ui.Screens.closeAll(); });
  await pg.evaluate(() => { const G = __RT.G(); let n = 0; while (!G.bossFight && n < 6000 && !G.ending) { __RT.step(5); n += 5; } __RT.ui.Screens.closeAll(); __RT.ui.Game.speedIdx = 1; });
  await wait(500);
  console.log('bossFight', await pg.evaluate(() => __RT.G().bossFight));
  for (let i = 0; i < 4; i++) { await pg.evaluate(() => { const G = __RT.G(); const p = G.parties.find(q => q.boss); const m = p && p.members.map(x => G.idx[x]).find(h => h && h.alive); if (m) { __RT.ui.Render.centerOn(m.x + 3, m.y); } else __RT.ui.Render.centerOn(58, 16); }); await wait(2500); await shot('31_boss' + i); }
  console.log('errors:', JSON.stringify(await pg.evaluate(() => __RT.errors())), 'logs:', JSON.stringify(logs));
  await br.close();
})().catch(e => { console.error('FAIL', e && e.stack ? e.stack.split(String.fromCharCode(10)).slice(0, 4).join(String.fromCharCode(10)) : e); process.exit(1); });
