/* UI v5 (docs/ui_v5/implementation.md §8): HUD, three zones, view mode (U) restores the zone set, display menu, Esc order, 1-5 blocked when the
   bottom zone is hidden, notifications never open a hidden zone, zones survive a reload, map / menu / faith windows, cover ratio.
   node test/ui_v5.js [ja|zh] -> test/out/visual/ui_v5/*.png */
const puppeteer = require('puppeteer-core'); const path = require('path'), fs = require('fs');
const CHROME = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find(p => fs.existsSync(p));
const lang = process.argv[2] || 'ja'; const OUT = path.join(__dirname, 'out', 'visual', 'ui_v5'); fs.mkdirSync(OUT, { recursive: true });
const out = []; const ck = (n, c, x) => out.push((c ? 'PASS ' : 'FAIL ') + n + (x !== undefined ? ' ' + x : '')); const wait = ms => new Promise(r => setTimeout(r, ms));
const URL = 'file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/');
(async () => {
  const br = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] }); const pg = await br.newPage(); await pg.setViewport({ width: 1280, height: 720 });
  const logs = []; pg.on('pageerror', e => logs.push(e.message));
  await pg.evaluateOnNewDocument(l => { try { if (!localStorage.getItem('rinne_tenbin_v1_settings')) localStorage.setItem('rinne_tenbin_v1_settings', JSON.stringify({ bgm: 0, se: 0, speed: 1, text: 3, lang: l, tutDone: true, autoSlow: false, advisor: false, collapsed: { mini: true, goal: true, right: true, pow: true }, hintsSeen: { duty: 1, skip: 1, listen: 1, card: 1, godlv: 1, awe: 1, adv: 1 } })); } catch (e) { } }, lang);
  const start = async () => { await pg.goto(URL); await wait(1500); await pg.evaluate(() => { __RT.ui.Game.pendingGod = 'mercy'; __RT.ui.Screens.opEnd(); }); await wait(1200);
    await pg.evaluate(() => { const G = __RT.G(); if (G.council && !G.council.done) closeCouncil(G.council.offer.slice(0, 2), null); __RT.ui.Screens.closeAll(); for (let i = 0; i < 400; i++) tick(); G.cards = [{ id: 'rumor', t: G.tick, n: G.nid++ }]; __RT.ui.UI.cardSig = ''; __RT.ui.Game.paused = true; __RT.ui.UI.refresh(true); }); await wait(500); };
  await start();
  const shot = n => pg.screenshot({ path: path.join(OUT, n + '_' + lang + '.png') });
  const vis = sel => pg.evaluate(s => { const e = document.querySelector(s); return !!e && e.offsetParent !== null && getComputedStyle(e).display !== 'none'; }, sel);
  const cover = () => pg.evaluate(() => { const st = document.getElementById('stage').getBoundingClientRect(); const s = st.width / 1280; const rs = Array.from(document.querySelectorAll('#ui .v5')).filter(w => w.offsetParent !== null && getComputedStyle(w).display !== 'none' && w.id !== 'v5hint' && w.id !== 'v5toast').map(w => { const r = w.getBoundingClientRect(); return [(r.left - st.left) / s, (r.top - st.top) / s, r.width / s, r.height / s]; });
    let n = 0, c = 0; for (let y = 2; y < 720; y += 4) for (let x = 2; x < 1280; x += 4) { n++; if (rs.some(r => x >= r[0] && x < r[0] + r[2] && y >= r[1] && y < r[1] + r[3])) c++; } return c / n; });
  /* first run: all zones on even with the old 'collapsed' settings */
  ck('v5 HUD built', await pg.evaluate(() => document.getElementById('ui').classList.contains('v5') && !!document.getElementById('v5top')));
  ck('first run: three zones on (old collapsed ignored)', await pg.evaluate(() => { const z = __RT.ui.Game.settings.uiV5; return z && z.version === 1 && z.top && z.map && z.bottom; }));
  for (const s of ['#v5top', '#v5war', '#v5side', '#v5pow', '#v5mapb']) ck('visible ' + s, await vis(s));
  ck('old HUD hidden', await pg.evaluate(() => ['faithWin', 'balWin', 'timeWin', 'utilWin'].every(k => { const e = __RT.ui.UI.el.v5faith && document.querySelector('.v5old'); return !!e; }) && Array.from(document.querySelectorAll('.v5old')).every(e => e.offsetParent === null)));
  ck('no per-panel fold buttons visible', await pg.evaluate(() => Array.from(document.querySelectorAll('#ui .colbtn,#ui .ph-b')).every(e => e.offsetParent === null)));
  const fonts = await pg.evaluate(() => ({ pow: parseFloat(getComputedStyle(document.querySelector('.v5pow .nm')).fontSize), tab: parseFloat(getComputedStyle(document.querySelector('.v5tab')).fontSize), card: Math.min(...Array.from(document.querySelectorAll('#v5list .card div')).filter(e => e.offsetParent).map(e => parseFloat(getComputedStyle(e).fontSize)).concat([99])) }));
  ck('text sizes (power 20, tab 18, card >= 16)', fonts.pow === 20 && fonts.tab === 18 && fonts.card >= 16, JSON.stringify(fonts));
  ck('buttons >= 44 px tall', await pg.evaluate(() => Array.from(document.querySelectorAll('#ui .v5b,#ui .v5tab,#ui .v5pow')).filter(e => e.offsetParent).every(e => e.getBoundingClientRect().height / (document.getElementById('stage').getBoundingClientRect().width / 1280) >= 43.5)));
  ck('power costs come from powerCost()', await pg.evaluate(() => POWERS.every((p, i) => __RT.ui.UI.el.v5powBtns[i].textContent.indexOf(String(powerCost(p.id))) >= 0 || __RT.ui.UI.el.v5powBtns[i].getAttribute('aria-disabled') === 'true')));
  const cv0 = await cover(); ck('all-on cover <= 42% (v5 target ~40.5%)', cv0 <= 0.42, (cv0 * 100).toFixed(1) + '%');
  ck('centre 640x400 free of panels', await pg.evaluate(() => { const st = document.getElementById('stage').getBoundingClientRect(); const s = st.width / 1280; return Array.from(document.querySelectorAll('#ui .v5')).filter(w => w.offsetParent && w.id !== 'v5hint' && w.id !== 'v5toast').every(w => { const r = w.getBoundingClientRect(); const x0 = (r.left - st.left) / s, y0 = (r.top - st.top) / s, x1 = x0 + r.width / s, y1 = y0 + r.height / s; return x1 <= 320 || x0 >= 960 || y1 <= 160 || y0 >= 560; }); }));
  await shot('hud');
  /* tabs + unread */
  for (const k of ['feed', 'fav', 'dec', 'pray']) { await pg.evaluate(k => __RT.ui.UI.rTab(k), k); await wait(100); if (k !== 'pray') await shot('tab_' + k); }
  ck('tab selected has aria-selected', await pg.evaluate(() => document.querySelector('.v5tab[aria-selected=true]').textContent.indexOf(t('v5_tab_pray')) === 0));
  /* display menu */
  await pg.click('#v5top .tools button'); await wait(200); ck('display menu opens', await vis('#v5disp')); await shot('display');
  await pg.keyboard.press('Escape'); await wait(150); ck('Esc closes the display menu first', !(await vis('#v5disp')) && (await pg.evaluate(() => __RT.ui.Screens.stack.length)) === 0);
  /* zones one by one */
  const setZ = (k, v) => pg.evaluate((k, v) => { const z = v5Zones(); z[k] = v; v5Apply(); }, k, v);
  await setZ('bottom', false); await wait(100); ck('bottom off hides powers + hint', !(await vis('#v5pow')) && !(await vis('#v5hint')));
  await pg.keyboard.press('2'); await wait(100); ck('1-5 do nothing while the bottom zone is hidden', await pg.evaluate(() => !__RT.ui.Game.power));
  await setZ('bottom', true); await setZ('map', false); await wait(100); ck('map off hides side panel + map button', !(await vis('#v5side')) && !(await vis('#v5mapb')));
  await pg.evaluate(() => UI.toast('test notice')); await wait(100); ck('a notification does not reopen the map zone', !(await vis('#v5side')) && await vis('#v5toast'));
  await setZ('top', false); await wait(100); ck('top off: restore entry stays', !(await vis('#v5top')) && await vis('#v5restore')); await shot('zones_partial');
  await setZ('bottom', false); await wait(100); ck('all three off: restore entry still there', await vis('#v5restore')); await shot('zones_off');
  await pg.click('#v5restore'); await wait(150); ck('restore entry opens the display menu', await vis('#v5disp'));
  await pg.evaluate(() => { const b = Array.from(document.querySelectorAll('#v5disp .pair button'))[0]; b.click(); }); await wait(150);
  ck('すべて表示 turns all on', await pg.evaluate(() => { const z = v5Zones(); return z.top && z.map && z.bottom; }) && await vis('#v5side'));
  /* view mode keeps the set */
  await setZ('map', false); await pg.keyboard.press('u'); await wait(150); ck('U: view mode, compact bar + back button', await vis('#v5compact') && await vis('#v5restore') && !(await vis('#v5top')) && !(await vis('#v5pow')));
  ck('view mode does not write the zone preference', await pg.evaluate(() => { const z = v5Zones(); return z.top && !z.map && z.bottom; })); await shot('view');
  await pg.keyboard.press('u'); await wait(150); ck('U again restores the earlier set (map still off)', await vis('#v5top') && !(await vis('#v5side')) && await vis('#v5pow'));
  /* reload keeps the preference */
  await pg.evaluate(() => Game.saveSettings()); await start(); ck('reload keeps the zone preference', await pg.evaluate(() => { const z = v5Zones(); return z.top && !z.map && z.bottom; }) && !(await vis('#v5side')));
  await pg.evaluate(() => { const z = v5Zones(); z.map = true; v5Apply(); Game.saveSettings(); }); await wait(100);
  /* Esc order: power aiming, then the game menu */
  await pg.keyboard.press('1'); await wait(100); ck('1 selects a power', await pg.evaluate(() => __RT.ui.Game.power === 'oracle'));
  await pg.keyboard.press('Escape'); await wait(100); ck('Esc cancels aiming first', await pg.evaluate(() => !__RT.ui.Game.power && __RT.ui.Screens.stack.length === 0));
  await pg.keyboard.press('Escape'); await wait(200); ck('Esc then opens the game menu', await pg.evaluate(() => __RT.ui.Screens.stack.length === 1 && __RT.ui.Screens.stack[0].name === 'pause')); await shot('menu');
  ck('time stops under the menu', await pg.evaluate(() => __RT.ui.Game.timeStopped));
  await pg.keyboard.press('Tab'); await pg.keyboard.press('Tab'); ck('Tab stays inside the dialog', await pg.evaluate(() => document.getElementById('modal').contains(document.activeElement)));
  await pg.keyboard.press('Escape'); await wait(150); ck('Esc closes the menu', await pg.evaluate(() => __RT.ui.Screens.stack.length === 0));
  /* faith, map */
  await pg.click('#v5faith'); await wait(200); ck('faith detail opens', await pg.evaluate(() => __RT.ui.Screens.stack.length === 1)); await shot('faith'); await pg.keyboard.press('Escape'); await wait(100);
  await pg.click('#v5mapb'); await wait(300); ck('world map opens', await pg.evaluate(() => __RT.ui.Screens.stack.length === 1 && !!document.querySelector('#modal canvas'))); await shot('map');
  const cam0 = await pg.evaluate(() => ({ x: Render.cam.x, y: Render.cam.y })); const cvb = await pg.evaluate(() => { const r = document.querySelector('#modal canvas').getBoundingClientRect(); return { x: r.left + r.width * 0.15, y: r.top + r.height * 0.5 }; });
  await pg.mouse.click(cvb.x, cvb.y); await wait(200); ck('clicking the map moves the camera and closes it', await pg.evaluate(c => Math.abs(Render.cam.x - c.x) > 5 && __RT.ui.Screens.stack.length === 0, cam0));
  /* camera zoom does not change the HUD */
  const hb = () => pg.evaluate(() => { const r = document.getElementById('v5pow').getBoundingClientRect(); return Math.round(r.width) + 'x' + Math.round(r.height); }); const h1 = await hb(); await pg.evaluate(() => Render.setZoom(2)); await wait(100); ck('camera x2 leaves the HUD size alone', (await hb()) === h1); await pg.evaluate(() => Render.setZoom(1));
  /* faith 0 / full */
  await pg.evaluate(() => { const G = __RT.G(); G.faith = 0; UI.refresh(true); }); await wait(100); ck('faith 0: all five show 信仰不足 and disabled', await pg.evaluate(() => UI.el.v5powBtns.every(b => b.getAttribute('aria-disabled') === 'true' && b.textContent.indexOf(t('v5_no_faith')) >= 0))); await shot('faith0');
  await pg.evaluate(() => { const G = __RT.G(); G.faith = G.faithMax; UI.refresh(true); }); await wait(100); ck('faith full: enabled', await pg.evaluate(() => UI.el.v5powBtns.every(b => b.getAttribute('aria-disabled') === 'false')));
  ck('no page errors', logs.length === 0, JSON.stringify(logs.slice(0, 3))); ck('no ERRS', await pg.evaluate(() => ERRS.length === 0), await pg.evaluate(() => JSON.stringify(ERRS.slice(0, 3))));
  console.log(out.join('\n')); await br.close(); process.exit(out.some(l => l.startsWith('FAIL')) ? 1 : 0);
})();
