const puppeteer = require('puppeteer-core'); const path = require('path');
(async () => { const br = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', args: ['--no-sandbox'] }); const pg = await br.newPage(); await pg.setViewport({ width: 1280, height: 720 });
  const logs = []; pg.on('pageerror', e => logs.push(e.message)); pg.on('console', m => { if (m.type() === 'error') logs.push(m.text()); });
  await pg.evaluateOnNewDocument(() => { localStorage.setItem('rinne_tenbin_v1_settings', JSON.stringify({ bgm: 0, se: 0, speed: 1, text: 3, lang: 'ja', tutDone: true, autoSlow: false, advisor: false })); });
  await pg.goto('file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/')); await new Promise(r => setTimeout(r, 700)); await pg.mouse.click(640, 360); await new Promise(r => setTimeout(r, 300));
  await pg.evaluate(() => { __RT.ui.Game.pendingGod = 'mercy'; __RT.ui.Screens.opEnd(); });
  for (let i = 0; i < 6; i++) { await new Promise(r => setTimeout(r, 500)); console.log(JSON.stringify(await pg.evaluate(() => ({ sc: __RT.ui.Game.scene, m: __RT.ui.Game.modals.join(','), t: __RT.G().tick, c: !!(__RT.G().council), cd: __RT.G().council && __RT.G().council.done, view: __RT.ui.Game.view, paused: __RT.ui.Game.paused, errs: ERRS.slice(0, 3) })))); }
  console.log(logs.slice(0, 5)); await br.close(); })();
