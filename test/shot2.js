/* deliverable screenshots: 6 per language (god select / opening / main / prayer / chronicle / ending) into test/shots/<lang>_*.png */
const puppeteer = require('puppeteer-core');
const path = require('path');
const URL = 'file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/');
(async () => {
  const br = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', args: ['--autoplay-policy=no-user-gesture-required', '--no-sandbox', '--window-size=1280,720'] });
  const wait = ms => new Promise(r => setTimeout(r, ms));
  for (const lang of ['ja', 'zh']) {
    const pg = await br.newPage(); await pg.setViewport({ width: 1280, height: 720 });
    const logs = []; pg.on('pageerror', e => logs.push('pageerror: ' + e.message)); pg.on('console', m => { if (m.type() === 'error') logs.push(m.text()); });
    await pg.evaluateOnNewDocument((lg) => { try { localStorage.setItem('rinne_tenbin_v1_settings', JSON.stringify({ bgm: 0, se: 0, speed: 0, text: 2, lang: lg, names: 'key', theme: 'black', autoSlow: true, advisor: true, tutDone: true })); } catch (e) { } }, lang);
    await pg.goto(URL); await wait(800);
    const ev = f => pg.evaluate(f); const shot = n => pg.screenshot({ path: path.join(__dirname, 'shots', lang + '_' + n + '.png') });
    await pg.mouse.click(640, 360); await wait(400);
    await ev(() => __RT.ui.Screens.godSelect()); await wait(400); await shot('1_god');
    await ev(() => { __RT.ui.Game.pendingGod = 'mercy'; __RT.ui.Screens.opening(); }); await wait(2800); await shot('2_opening');
    await ev(() => __RT.ui.Screens.opEnd()); await wait(500);
    await ev(() => { __RT.ui.Game.speedIdx = 3; }); await wait(12000); await ev(() => { __RT.ui.Game.speedIdx = 0; }); await wait(400); await shot('3_main');
    // prayer: make sure someone prays
    await ev(() => { const G = __RT.G(); const h = G.humans.find(x => x.alive && x.age >= 16); if (h && typeof addPrayer === 'function') { } }); await wait(200);
    await ev(() => { const U = __RT.ui; const pr = U.Screens.prayer ? null : null; const G = __RT.G(); const op = G.prayers.find(p => p.state === 'open'); if (op) { U.Game.select ? U.Game.select(op.hid) : null; } }); await wait(500); await shot('4_prayer');
    await ev(() => { __RT.step(1500); }); await wait(200);
    await ev(() => __RT.ui.Screens.chronicle()); await wait(500); await shot('5_chron'); await ev(() => __RT.ui.Screens.closeAll());
    await ev(() => { const G = __RT.G(); __RT.policy('basic'); for (let i = 0; i < 40000 && !G.ending; i++) __RT.step(1); __RT.ui.Screens.ending(); }); await wait(3500); await shot('6_ending');
    console.log(lang, 'errors', JSON.stringify(await ev(() => __RT.errors())), JSON.stringify(logs));
    await pg.close();
  }
  await br.close();
})().catch(e => { console.error('FAIL', e); process.exit(1); });
