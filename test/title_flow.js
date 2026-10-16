/* 視覺 part 2 acceptance: keyboard-only flow boot -> title -> mode -> god -> opening (5 pages) -> play; screenshots of every screen;
   compare images (left: mockup x2, right: game) in test/out/visual/title/; language switch on the title; button states; save / settings screens.
   node test/title_flow.js [ja|zh] */
const puppeteer = require('puppeteer-core'); const path = require('path'), fs = require('fs');
const CHROME = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find(p => fs.existsSync(p));
const lang = process.argv[2] || 'ja'; const OUT = path.join(__dirname, 'out', 'visual', 'title'); fs.mkdirSync(OUT, { recursive: true });
const MOCK = path.join(__dirname, '..', 'assets', 'design', 'title', 'mockup');
const out = []; const ck = (n, c, x) => out.push((c ? 'PASS ' : 'FAIL ') + n + (x ? ' ' + x : '')); const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const br = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] }); const pg = await br.newPage(); await pg.setViewport({ width: 1280, height: 720 });
  const logs = []; pg.on('pageerror', e => logs.push(e.message));
  await pg.evaluateOnNewDocument(l => { try { localStorage.clear(); localStorage.setItem('rinne_tenbin_v1_settings', JSON.stringify({ bgm: 0, se: 0, speed: 1, text: 3, lang: l, tutDone: true, autoSlow: false, advisor: false })); } catch (e) { } }, lang);
  await pg.goto('file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/')); await wait(1200);
  const scene = () => pg.evaluate(() => __RT.ui.Game.scene); const shots = {};
  const shot = async n => { const f = path.join(OUT, 'shot_' + n + '_' + lang + '.png'); await pg.screenshot({ path: f }); shots[n] = f; };
  ck('boot screen', await scene() === 'boot'); await shot('boot');
  await pg.keyboard.press('Enter'); await wait(1200); ck('title by key', await scene() === 'title'); await shot('title');
  // pixel test on the logo / a button corner / the background: 2x2 blocks of one colour
  // v3: every image is drawn 1:1 — the logo canvas on screen has the same pixels as the delivered PNG
  const px = await pg.evaluate(() => { const im = ASSET_IMG['logo/logo_' + (LANG === 'zh' ? 'zh' : 'jp') + '.png']; const cv = Array.from(document.querySelectorAll('#scr canvas, canvas')).find(c => c.width === im.width && c.height === im.height && c.style.left === '160px'); if (!cv) return { found: false }; const a = cv.getContext('2d').getImageData(0, 0, cv.width, cv.height).data; const t = document.createElement('canvas'); t.width = im.width; t.height = im.height; const tc = t.getContext('2d'); tc.drawImage(im, 0, 0); const b = tc.getImageData(0, 0, t.width, t.height).data; let diff = 0; for (let k = 0; k < a.length; k++) if (a[k] !== b[k]) diff++; return { found: true, w: cv.width, diff }; });
  ck('title logo drawn 1:1 (same pixels as the PNG)', px.found && px.diff === 0, JSON.stringify(px));
  // language switch: 4th item
  await pg.keyboard.press('ArrowUp'); await pg.keyboard.press('Enter'); await wait(500); const l2 = await pg.evaluate(() => LANG); ck('language switches on the title', l2 !== lang, l2); await shot('title_other_lang');
  await pg.keyboard.press('Enter'); await wait(500); ck('language back', await pg.evaluate(() => LANG) === lang);
  // settings
  await pg.keyboard.press('ArrowUp'); await pg.keyboard.press('Enter'); await wait(500); ck('settings open', await pg.evaluate(() => __RT.ui.Game.modals.join(',') === 'settings')); await shot('settings');
  await pg.keyboard.press('Tab'); await wait(200); await shot('settings_sound'); await pg.keyboard.press('Escape'); await wait(300);
  // new game -> mode -> god -> opening, keyboard only
  await pg.keyboard.press('ArrowUp'); await pg.keyboard.press('Enter'); await wait(500); ck('mode select', await scene() === 'modesel'); await shot('mode');
  await pg.keyboard.press('ArrowRight'); await wait(200); await pg.keyboard.press('Enter'); await wait(500); ck('god select', await scene() === 'godsel'); ck('easy chosen', await pg.evaluate(() => __RT.ui.Game.settings.easy === true)); await shot('god');
  await pg.keyboard.press('2'); await wait(200); ck('key 2 selects order', await pg.evaluate(() => __RT.ui.Game.godSel === 'order')); await pg.keyboard.press('Enter'); await wait(600); ck('opening', await scene() === 'opening');
  for (let p = 0; p < 5; p++) { await wait(600); await shot('opening' + (p + 1)); await pg.keyboard.press('Enter'); await wait(150); await pg.keyboard.press('Enter'); await wait(450); }
  await wait(900); ck('play after the opening', await scene() === 'play'); ck('game is easy', await pg.evaluate(() => !!__RT.G().easy)); ck('god is order', await pg.evaluate(() => __RT.G().god === 'order'));
  // save screen in game (dim backdrop, 2x2)
  await pg.evaluate(() => { const G = __RT.G(); if (G.council && !G.council.done) closeCouncil(G.council.offer.slice(0, 2), null); __RT.ui.Screens.closeAll(); __RT.ui.Screens.saveMenu(true); }); await wait(400); await shot('save');
  await pg.evaluate(() => __RT.ui.Screens.slotPick(1, true)); await wait(300); await pg.evaluate(() => { __RT.ui.Screens.closeAll(); __RT.ui.Screens.saveMenu(false); }); await wait(300);
  const meta = await pg.evaluate(() => JSON.parse(localStorage.getItem('rinne_tenbin_v1_slot1_meta') || 'null')); ck('save meta has play time / date / god', meta && meta.v2 && meta.god === 'order' && meta.gen === 1, JSON.stringify(meta)); await shot('load');
  ck('no page errors', logs.length === 0, JSON.stringify(logs.slice(0, 3))); ck('no ERRS', await pg.evaluate(() => ERRS.length === 0), await pg.evaluate(() => JSON.stringify(ERRS.slice(0, 3))));
  // compare images: mockup (x2) | game
  const pairs = [['boot', 'boot'], ['title', 'title_' + lang], ['settings', 'settings'], ['mode', 'mode'], ['god', 'god'], ['save', 'save']].concat([1, 2, 3, 4, 5].map(i => ['opening' + i, ['opening_01_balance', 'opening_02_village', 'opening_03_river', 'opening_04_throne', 'opening_05_overlook'][i - 1]]));
  const p2 = await br.newPage(); await p2.setViewport({ width: 2560, height: 720 });
  for (const [s, m] of pairs) { const mf = path.join(MOCK, m + '.png'); if (!fs.existsSync(mf) || !shots[s]) continue; const b64 = f => 'data:image/png;base64,' + fs.readFileSync(f).toString('base64');
    await p2.setContent(`<body style="margin:0;background:#000;display:flex"><img src="${b64(mf)}" style="width:1280px;height:720px;image-rendering:pixelated"><img src="${b64(shots[s])}" style="width:1280px;height:720px"></body>`); await wait(150); await p2.screenshot({ path: path.join(OUT, 'compare_' + s + '_' + lang + '.png') }); }
  console.log(out.join('\n')); await br.close(); process.exit(out.some(l => l.startsWith('FAIL')) ? 1 : 0);
})();
