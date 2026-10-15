/* C acceptance (UI): after a lost battle -> damage tour (camera visits each ruin, then the plaza), damage summary, report thumbnails,
   ruins drawn (dark + broken roof + fire / smoke + rubble), scaffolding with "修復中 n%", graves, rebuild blessing.
   Screenshots: test/out/visual/c/. node test/ruins_ui.js [ja|zh] */
const puppeteer = require('puppeteer-core'); const path = require('path'), fs = require('fs');
const CHROME = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find(p => fs.existsSync(p));
const lang = process.argv[2] || 'ja'; const OUT = path.join(__dirname, 'out', 'visual', 'c'); fs.mkdirSync(OUT, { recursive: true });
const out = []; const ck = (n, c, x) => out.push((c ? 'PASS ' : 'FAIL ') + n + (x ? ' ' + x : '')); const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const br = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] }); const pg = await br.newPage(); await pg.setViewport({ width: 1280, height: 720 });
  const logs = []; pg.on('pageerror', e => logs.push(e.message));
  await pg.evaluateOnNewDocument(l => { try { localStorage.setItem('rinne_tenbin_v1_settings', JSON.stringify({ bgm: 0, se: 0, speed: 1, text: 3, lang: l, tutDone: true, autoSlow: false, advisor: false, hintsSeen: { duty: 1, skip: 1, listen: 1, card: 1, godlv: 1, awe: 1, adv: 1 } })); } catch (e) { } }, lang);
  await pg.goto('file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/')); await wait(700); await pg.mouse.click(640, 360); await wait(300);
  await pg.evaluate(() => { __RT.ui.Game.pendingGod = 'mercy'; __RT.ui.Screens.opEnd(); }); await wait(900);
  for (let i = 0; i < 20; i++) { await wait(300); if (await pg.evaluate(() => __RT.ui.Game.modals.join(',') === 'council')) break; }
  await pg.evaluate(() => { const G = __RT.G(); if (G.council && !G.council.done) closeCouncil(G.council.offer.slice(0, 2), null); __RT.ui.Screens.closeAll(); G.cards = []; G.tick = Math.floor(G.tick / TICK_DAY) * TICK_DAY + 66; });
  // force a routed first wave: start it and make the outcome a rout
  await pg.evaluate(() => { const G = __RT.G(); const a = G.assaults[0]; a.t = G.tick + 2; __RT.ui.Game.speedIdx = 0; });
  for (let i = 0; i < 30; i++) { await wait(300); if (await pg.evaluate(() => __RT.ui.Game.modals.indexOf('battle') >= 0)) break; }
  ck('battle opened', await pg.evaluate(() => __RT.ui.Game.modals.indexOf('battle') >= 0));
  await pg.evaluate(() => { const B = __RT.G().battle; B.T += 40; for (let i = 0; i < 3 && !B.done; i++) battleStep('none'); __RT.ui.Screens.rerender(); }); await wait(500);
  const res = await pg.evaluate(() => { const B = __RT.G().battle; return { grade: B && B.grade, ruined: B && B.res ? B.res.ruined.length : -1, deaths: B && B.res ? B.res.deaths.length : -1 }; });
  ck('lost battle ruins buildings', res.ruined >= 2, JSON.stringify(res));
  ck('report shows ruined thumbnails', await pg.evaluate(() => document.querySelectorAll('#modal canvas').length >= 2)); await pg.screenshot({ path: path.join(OUT, 'c_report_' + lang + '.png') });
  // close the report -> tour starts
  await pg.evaluate(() => { const b = Array.from(document.querySelectorAll('#modal .btn.big')).pop(); b.click(); }); await wait(700);
  ck('tour started', await pg.evaluate(() => !!__RT.ui.UI.tour)); const sum = await pg.evaluate(() => __RT.ui.UI.tourEl ? __RT.ui.UI.tourEl.textContent : ''); ck('damage summary shown', /死者/.test(sum), sum.slice(0, 60));
  const cams = []; for (let i = 0; i < 4; i++) { cams.push(await pg.evaluate(() => [Math.round(__RT.ui.Render.cam.x), Math.round(__RT.ui.Render.cam.y)])); await pg.screenshot({ path: path.join(OUT, 'c_tour' + i + '_' + lang + '.png') }); await wait(1500); }
  ck('camera moves between ruins', new Set(cams.map(c => c.join(','))).size >= 2, JSON.stringify(cams));
  for (let i = 0; i < 20 && await pg.evaluate(() => !!__RT.ui.UI.tour); i++) await wait(500); ck('tour ends at the plaza', await pg.evaluate(() => !__RT.ui.UI.tour));
  // overview + close-ups: burning (day 1), scaffolding (later), graves
  await pg.evaluate(() => { __RT.ui.Game.paused = true; const R = __RT.ui.Render; R.cam.x = 18 * TS; R.cam.y = 8 * TS; R.clampCam(); }); await wait(500); await pg.screenshot({ path: path.join(OUT, 'c_overview_' + lang + '.png') });
  const id0 = await pg.evaluate(() => +Object.keys(__RT.G().ruins)[0]); await pg.evaluate(id => { const b = W.blds[id]; __RT.ui.Render.centerOn(b.x + b.w / 2, b.y + b.h / 2); }, id0); await wait(500); await pg.screenshot({ path: path.join(OUT, 'c_burning_' + lang + '.png') });
  await pg.evaluate(() => { const G = __RT.G(); G.forceAuto = true; for (let i = 0; i < TICK_DAY * 1.3; i++) tick(); G.forceAuto = false; }); await wait(500); await pg.screenshot({ path: path.join(OUT, 'c_repair_' + lang + '.png') });
  ck('repair label on screen data', await pg.evaluate(id => repairPct(id) > 0 && repairPct(id) < 100, id0));
  await pg.evaluate(() => { __RT.ui.Render.centerOn(21, 10); }); await wait(400); await pg.screenshot({ path: path.join(OUT, 'c_graves_' + lang + '.png') }); ck('graves exist', await pg.evaluate(() => (__RT.G().graves || []).length > 0));
  // defense screen: rebuild blessing finishes one building
  await pg.evaluate(() => { __RT.G().faith = 60; __RT.ui.Screens.defense(); }); await wait(400); await pg.screenshot({ path: path.join(OUT, 'c_defense_' + lang + '.png') });
  const n0 = await pg.evaluate(() => Object.keys(__RT.G().ruins).length); await pg.evaluate(() => { const b = Array.from(document.querySelectorAll('#modal .btn')).find(x => /重建/.test(x.textContent)); if (b) b.click(); }); await wait(300);
  ck('rebuild blessing finishes one', await pg.evaluate(() => Object.keys(__RT.G().ruins).length) === n0 - 1);
  ck('no page errors', logs.length === 0, JSON.stringify(logs.slice(0, 3))); ck('no ERRS', await pg.evaluate(() => ERRS.length === 0), await pg.evaluate(() => JSON.stringify(ERRS.slice(0, 3))));
  console.log(out.join('\n')); await br.close(); process.exit(out.some(l => l.startsWith('FAIL')) ? 1 : 0);
})();
