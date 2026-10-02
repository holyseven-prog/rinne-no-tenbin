const puppeteer = require('puppeteer-core');
const path = require('path');
const URL = 'file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/');
const lang = process.argv[2] || 'ja';
const seed = +process.argv[3] || 1;
const pol = process.argv[4] || 'basic';
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
  await pg.evaluate((s, p) => { __RT.ui.Screens.closeAll(); __RT.ui.Screens.clearScr(); __RT.newGame({ seed: s, god: 'mercy', lang: LANG }); __RT.policy(p); }, seed, pol);
  // run to awakening
  const awk = await pg.evaluate(() => { const G = __RT.G(); let n = 0; while (!G.awakened && n < 20000 && !G.ending) { __RT.step(10); n += 10; } return { awakened: G.awakened, tick: G.tick }; });
  console.log('awaken', JSON.stringify(awk)); await wait(900); await shot('20_awaken');
  await wait(4000);
  await pg.evaluate(() => { __RT.ui.Game.speedIdx = 3; }); // let the loop run
  let ended = false; for (let i = 0; i < 80 && !ended; i++) { await wait(1000); ended = await pg.evaluate(() => !!__RT.G().ending); }
  console.log('ended', ended, await pg.evaluate(() => JSON.stringify(__RT.G().ending)));
  await wait(3500); await shot('21_ending');
  await pg.evaluate(() => __RT.ui.Screens.book()); await wait(300); await shot('22_book');
  console.log('chapters', await pg.evaluate(() => __RT.G().chapters.length));
  console.log('errors:', JSON.stringify(await pg.evaluate(() => __RT.errors())), 'logs:', JSON.stringify(logs));
  await br.close();
})().catch(e => { console.error('FAIL', e && e.stack ? e.stack.split(String.fromCharCode(10)).slice(0, 4).join(String.fromCharCode(10)) : e); process.exit(1); });
