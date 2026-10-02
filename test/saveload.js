const puppeteer = require('puppeteer-core');
const path = require('path');
const URL = 'file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/');
(async () => {
  const br = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required'] });
  const pg = await br.newPage(); await pg.setViewport({ width: 1280, height: 720 });
  const logs = []; pg.on('pageerror', e => logs.push(e.message));
  await pg.goto(URL); await new Promise(r => setTimeout(r, 500));
  const r = await pg.evaluate(() => {
    __RT.ui.Screens.clearScr(); __RT.newGame({ seed: 4242, god: 'order', lang: 'ja' }); __RT.policy('basic'); __RT.step(3000);
    const snap = () => { const G = __RT.G(); return JSON.stringify({ t: G.tick, f: +G.faith.toFixed(2), b: +G.balance.toFixed(2), n: G.humans.length, nw: G.chapters.length, h0: G.humans[0].hp.toFixed(3), r: G.rng.s, m: G.monsters.length, q: G.quests.length, pr: G.prayers.length, ev: G.events.length }); };
    __RT.ui.Save.write(2); const a = snap(); __RT.step(900); const mid = snap();
    __RT.ui.Game.paused = true; __RT.ui.Game.loadSlot(2); __RT.ui.Game.paused = true; const b = snap();
    // determinism: step same amount from loaded state and compare with original continuation
    __RT.step(900); const c = snap();
    return { a, mid, b, c, same: a === b, replay: mid === c };
  });
  console.log(JSON.stringify(r, null, 1)); console.log('errors', JSON.stringify(logs));
  await br.close();
})().catch(e => { console.error('FAIL', e); process.exit(1); });
