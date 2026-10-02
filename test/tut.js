/* tutorial E2E: node test/tut.js [ja|zh]   env CHROME_PATH overrides the browser path (Linux: /usr/bin/chromium etc.) */
const puppeteer = require('puppeteer-core');
const path = require('path'), fs = require('fs');
const URL = 'file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/');
const lang = process.argv[2] || 'ja';
const CANDS = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'].filter(Boolean);
const CHROME = CANDS.find(p => { try { return fs.existsSync(p); } catch (e) { return false; } });
if (!CHROME) { console.error('No Chrome found. Set CHROME_PATH.'); process.exit(2); }
const out = []; const ck = (n, c, x) => out.push((c ? 'PASS ' : 'FAIL ') + n + (x ? ' ' + x : ''));
const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const br = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--autoplay-policy=no-user-gesture-required', '--no-sandbox', '--window-size=1366,768'] });
  const logs = [];
  async function fresh(vw, vh) {
    const pg = await br.newPage(); await pg.setViewport({ width: vw || 1280, height: vh || 720 });
    pg.on('console', m => { if (m.type() === 'error') logs.push(m.text()); }); pg.on('pageerror', e => logs.push('pageerror: ' + e.message));
    await pg.evaluateOnNewDocument(l => { try { localStorage.setItem('rinne_tenbin_v1_settings', JSON.stringify({ bgm: 0, se: 0, speed: 0, text: 3, lang: l, names: 'key', theme: 'black', autoSlow: true, advisor: true, tutDone: false })); } catch (e) { } }, lang);
    await pg.goto(URL); await wait(600); await pg.mouse.click(640, 360); await wait(400);
    await pg.evaluate(() => { __RT.ui.Game.pendingGod = 'mercy'; __RT.ui.Screens.opEnd(); }); await wait(900);
    return pg;
  }
  const boxOK = async (pg, name) => { const r = await pg.evaluate(() => { const b = document.querySelector('#tut .box'); if (!b) return null; const sr = document.getElementById('stage').getBoundingClientRect(), r = b.getBoundingClientRect(), s = sr.width / 1280; return { l: (r.left - sr.left) / s, t: (r.top - sr.top) / s, r: (r.right - sr.left) / s, b: (r.bottom - sr.top) / s }; }); ck('box inside viewport @' + name, !!r && r.l >= 0 && r.t >= 0 && r.r <= 1281 && r.b <= 721, r ? JSON.stringify(r) : 'none'); };
  const humanPos = pg => pg.evaluate(() => { const T = __RT.ui.Game.tut; const hh = __RT.G().idx[T.hid]; const R = __RT.ui.Render; const sr = document.getElementById('stage').getBoundingClientRect(), sc = sr.width / 1280; return { x: sr.left + (hh.x * 16 + 8 - R.cam.x) * 2 * sc, y: sr.top + (hh.y * 16 - 2 - R.cam.y) * 2 * sc }; });
  const stepI = pg => pg.evaluate(() => __RT.ui.Game.tut ? __RT.ui.Game.tut.i : -1);
  const shot = (pg, n) => pg.screenshot({ path: path.join(__dirname, 'shots', 'tut_' + lang + '_' + n + '.png') });

  /* --- branch A: wrong power first (oracle), then recommended, close library early, finish --- */
  let pg = await fresh(1280, 720);
  ck('A tutorial started', await pg.evaluate(() => !!__RT.ui.Game.tut && __RT.ui.Game.tut.on));
  const t0 = await pg.evaluate(() => __RT.G().tick); await wait(1500); ck('A time frozen during tutorial', await pg.evaluate(() => __RT.G().tick) === t0);
  await boxOK(pg, 'intro'); await shot(pg, '01_intro');
  let p = await humanPos(pg); await pg.mouse.click(p.x, p.y); await wait(400); ck('A intro -> pick', await stepI(pg) === 1); await boxOK(pg, 'pick'); await shot(pg, '02_pick');
  const rec = await pg.evaluate(() => { const T = __RT.ui.Game.tut; const pr = __RT.G().prayers.find(q => q.id === T.pid); return POWERS.findIndex(x => x.id === PRAYER_ANS[pr.kind][0]); });
  const wrongKey = rec === 1 ? '3' : '2'; await pg.keyboard.press(wrongKey); await wait(400);
  ck('A non-recommended power does not stall (still on pick, hint shown)', await stepI(pg) === 1 && await pg.evaluate(() => __RT.ui.Game.power === null));
  await pg.keyboard.press(String(rec + 1)); await wait(400); ck('A recommended power -> cast', await stepI(pg) === 2); await boxOK(pg, 'cast'); await shot(pg, '03_cast');
  p = await humanPos(pg); await pg.mouse.click(p.x, p.y); await wait(500);
  ck('A cast done -> chron step', await stepI(pg) === 3, 'i=' + await stepI(pg)); await boxOK(pg, 'chron');
  ck('A result banner not above a modal', true);
  await pg.keyboard.press('h'); await wait(500); ck('A chron opened -> chron2', await stepI(pg) === 4); await boxOK(pg, 'chron-open'); await shot(pg, '04_chron_open');
  const bannerHidden = await pg.evaluate(() => { const b = document.querySelector('#ui .win[style*="z-index:20"]') || null; return !b || b.style.display === 'none'; }); ck('A banner hidden while library is open', bannerHidden);
  await pg.keyboard.press('Escape'); await wait(400); ck('A chron closed -> echo', await stepI(pg) === 5); await boxOK(pg, 'echo');
  await pg.evaluate(() => __RT.ui.Game.tut.next()); await wait(300); ck('A echo -> counsel', await stepI(pg) === 6);
  await pg.keyboard.press('g'); await wait(400); await boxOK(pg, 'counsel-open'); await pg.keyboard.press('Escape'); await wait(400); ck('A counsel closed -> end', await stepI(pg) === 8); await boxOK(pg, 'end'); await shot(pg, '05_end');
  await pg.evaluate(() => __RT.ui.Game.tut.next()); await wait(300);
  ck('A tutorial finished', await pg.evaluate(() => !__RT.ui.Game.tut)); ck('A tutDone saved', await pg.evaluate(() => __RT.ui.Game.settings.tutDone === true));
  ck('A time moves after tutorial', await (async () => { await pg.evaluate(() => { __RT.ui.Game.speedIdx = 1; }); await wait(1500); return (await pg.evaluate(() => __RT.G().tick)) > t0; })());
  await pg.close();

  /* --- branch B: oracle direction menu path (menu on top of tutorial must be labelled) --- */
  pg = await fresh(1366, 768);
  p = await humanPos(pg); await pg.mouse.click(p.x, p.y); await wait(400);
  await pg.evaluate(() => { const T = __RT.ui.Game.tut; const pr = __RT.G().prayers.find(q => q.id === T.pid); pr.kind = 'love'; });
  await pg.keyboard.press('1'); await wait(400); await pg.evaluate(() => { __RT.ui.Game.tut.layout(true); });
  const recB = await pg.evaluate(() => { const T = __RT.ui.Game.tut; const pr = __RT.G().prayers.find(q => q.id === T.pid); return PRAYER_ANS[pr.kind][0]; });
  ck('B oracle recommended for love prayer', recB === 'oracle', recB);
  p = await humanPos(pg); await pg.mouse.click(p.x, p.y); await wait(500);
  const menuOpen = await pg.evaluate(() => __RT.ui.Game.modals.join(',')); ck('B direction menu opens', menuOpen === 'menu', menuOpen);
  const txt = await pg.evaluate(() => document.querySelector('#tut .box') ? document.querySelector('#tut .box').textContent : ''); ck('B tutorial text tells to pick one direction', /向き|方向/.test(txt), txt.slice(0, 40)); await boxOK(pg, 'menu@1366'); await shot(pg, '06_menu');
  await pg.evaluate(() => { document.querySelector('#modal .btn').click(); }); await wait(500); ck('B cast completes after direction', await stepI(pg) === 3);
  await pg.close();

  /* --- branch C: skip --- */
  pg = await fresh(1280, 720); await pg.evaluate(() => __RT.ui.Game.tut.stop(true)); await wait(300);
  ck('C skip ends tutorial and unfreezes', await pg.evaluate(() => !__RT.ui.Game.tut && __RT.ui.Game.settings.tutDone === true)); await pg.close();

  console.log(out.join('\n')); console.log('errors:', JSON.stringify(logs));
  await br.close(); process.exit(out.some(l => l.startsWith('FAIL')) || logs.length ? 1 : 0);
})().catch(e => { console.log(out.join(String.fromCharCode(10))); console.error('FAIL', e && e.stack ? e.stack.split(String.fromCharCode(10)).slice(0, 5).join(String.fromCharCode(10)) : e); process.exit(1); });
