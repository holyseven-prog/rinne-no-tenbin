/* B3: a first-use hint in Japanese (no ruby, plain kanji). node test/b3_hint.js */
const puppeteer = require('puppeteer-core'); const path = require('path'), fs = require('fs'); const OUT = path.join(__dirname, 'out', 'visual', 'b3'); fs.mkdirSync(OUT, { recursive: true }); const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => { const br = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', args: ['--no-sandbox'] }); const pg = await br.newPage(); await pg.setViewport({ width: 1280, height: 720 });
  await pg.evaluateOnNewDocument(() => { localStorage.setItem('rinne_tenbin_v1_settings', JSON.stringify({ bgm: 0, se: 0, speed: 1, text: 3, lang: 'ja', tutDone: true, autoSlow: false, advisor: false })); });
  await pg.goto('file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/')); await wait(700); await pg.mouse.click(640, 360); await wait(300);
  await pg.evaluate(() => { __RT.ui.Game.pendingGod = 'mercy'; __RT.ui.Screens.opEnd(); }); for (let i = 0; i < 20; i++) { await wait(300); if (await pg.evaluate(() => __RT.ui.Game.modals.join(',') === 'council')) break; }
  await pg.screenshot({ path: path.join(OUT, 'b3_council_ja.png') });
  await pg.evaluate(() => { const G = __RT.G(); if (G.council && !G.council.done) closeCouncil(G.council.offer.slice(0, 2), null); __RT.ui.Screens.closeAll(); G.cards = [{ id: 'rumor', t: G.tick, n: G.nid++ }]; __RT.ui.UI.cardSig = ''; });
  for (let i = 0; i < 30; i++) { await wait(300); if (await pg.evaluate(() => !!(__RT.ui.UI.hintEl && __RT.ui.UI.hintEl.isConnected))) break; }
  await pg.evaluate(() => { __RT.ui.Game.paused = true; }); await wait(200); await pg.screenshot({ path: path.join(OUT, 'b3_hint_hud_ja.png') });
  const txt = await pg.evaluate(() => document.body.innerText); console.log('ruby tags', await pg.evaluate(() => document.querySelectorAll('ruby').length), 'hint shown', await pg.evaluate(() => !!(__RT.ui.UI.hintEl && __RT.ui.UI.hintEl.isConnected)));
  await br.close(); })();
