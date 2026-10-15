/* V4 UI flow: council -> defense screen -> battle 3 phases -> report. node test/v4_ui.js [ja|zh] */
const puppeteer = require('puppeteer-core'); const path = require('path'), fs = require('fs');
const CHROME = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find(p => fs.existsSync(p));
const lang = process.argv[2] || 'ja'; const OUT = path.join(__dirname, 'out', 'visual'); fs.mkdirSync(OUT, { recursive: true });
const out = []; const ck = (n, c, x) => out.push((c ? 'PASS ' : 'FAIL ') + n + (x ? ' ' + x : '')); const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const br = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] }); const pg = await br.newPage(); await pg.setViewport({ width: 1280, height: 720 });
  const logs = []; pg.on('pageerror', e => logs.push(e.message));
  await pg.evaluateOnNewDocument(l => { try { localStorage.setItem('rinne_tenbin_v1_settings', JSON.stringify({ bgm: 0, se: 0, speed: 1, text: 3, lang: l, names: 'key', theme: 'black', autoSlow: false, advisor: false, tutDone: true })); } catch (e) { } }, lang);
  await pg.goto('file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/')); await wait(700); await pg.mouse.click(640, 360); await wait(300);
  await pg.evaluate(() => { __RT.ui.Game.pendingGod = 'mercy'; __RT.ui.Screens.opEnd(); }); await wait(900);
  ck('no council on day one (V4.1b 2-2)', await pg.evaluate(() => !__RT.G().council)); await pg.evaluate(() => { const G = __RT.G(); G.tick = START_TICK + 2 * SEASON_T - 3; __RT.ui.Game.speedIdx = 1; }); await wait(2500);
  const st = () => pg.evaluate(() => ({ modals: __RT.ui.Game.modals.join(','), tick: __RT.G().tick, council: !!(__RT.G().council && !__RT.G().council.done), battle: __RT.G().battle ? { phase: __RT.G().battle.phase, done: __RT.G().battle.done } : null }));
  let s = await st(); ck('council opens in the first autumn', s.modals === 'council', JSON.stringify(s)); await pg.screenshot({ path: path.join(OUT, 'v4_council_' + lang + '.png') });
  const t0 = s.tick; await wait(800); ck('time frozen during council', (await st()).tick === t0);
  // pick two decrees and confirm
  await pg.evaluate(() => { const cs = Array.from(document.querySelectorAll('#modal .card')); cs[0].click(); }); await wait(150); await pg.evaluate(() => { const cs = Array.from(document.querySelectorAll('#modal .card')); cs[2].click(); }); await wait(150);
  await pg.evaluate(() => { const b = Array.from(document.querySelectorAll('#modal .btn')).find(x => /決定/.test(x.textContent)); b.click(); }); await wait(400);
  s = await st(); ck('council closed, decrees set', s.modals === '' && !s.council, JSON.stringify(s)); ck('2 decrees active', await pg.evaluate(() => __RT.G().decrees.filter(d => d.state === 'active').length === 2));
  // next-assault bar visible
  const bar = await pg.evaluate(() => { const w = __RT.ui.UI.el.warBar; return w ? w.textContent : ''; }); ck('next-assault bar shows prediction', /%/.test(bar), bar);
  await pg.screenshot({ path: path.join(OUT, 'v4_hud_' + lang + '.png') });
  // defense screen via key B
  await pg.keyboard.press('b'); await wait(400); ck('B opens defense screen', (await st()).modals === 'defense'); await pg.screenshot({ path: path.join(OUT, 'v4_defense_' + lang + '.png') });
  const p0 = await pg.evaluate(() => winProb(nextAssault())); await pg.evaluate(() => { __RT.G().faith = 140; }); await pg.evaluate(() => { const b = Array.from(document.querySelectorAll('#modal .card .btn')); if (b[0]) b[0].click(); }); await wait(300);
  ck('prep action executes', await pg.evaluate(() => (__RT.G().stats.preps || 0) >= 1));
  await pg.keyboard.press('Escape'); await wait(300);
  // bring the first assault close and let it start in real time
  await pg.evaluate(() => { const G = __RT.G(); G.assaults[0].t = G.tick + 20; __RT.ui.Game.speedIdx = 2; }); await wait(3500);
  s = await st(); ck('battle modal opens and time stops', s.modals === 'battle' && s.battle && !s.battle.done, JSON.stringify(s)); await pg.screenshot({ path: path.join(OUT, 'v4_battle1_' + lang + '.png') });
  const tb = s.tick; await wait(600); ck('time frozen in battle', (await st()).tick === tb);
  for (let ph = 0; ph < 3; ph++) { await pg.evaluate(() => { const b = Array.from(document.querySelectorAll('#modal .btn')).filter(x => !x.classList.contains('dis')); b[0].click(); }); await wait(400); if (ph === 1) await pg.screenshot({ path: path.join(OUT, 'v4_battle2_' + lang + '.png') }); }
  s = await st(); ck('battle finished after 3 phases', s.battle && s.battle.done, JSON.stringify(s)); await pg.screenshot({ path: path.join(OUT, 'v4_report_' + lang + '.png') });
  await pg.evaluate(() => { const b = Array.from(document.querySelectorAll('#modal .btn')).pop(); b.click(); }); await wait(500);
  s = await st(); ck('report closed, game continues', s.modals === '' && !s.battle, JSON.stringify(s));
  for (let i = 0; i < 40 && await pg.evaluate(() => !!__RT.ui.UI.tour); i++) await wait(500); // after a lost battle the damage tour runs first (C)
  const t1 = (await st()).tick; await wait(1500); ck('time runs again', (await st()).tick > t1);
  ck('wave1 graded', await pg.evaluate(() => !!__RT.G().assaults[0].grade));
  // fast-forward to the end (auto battles) and look at the world
  await pg.evaluate(() => { __RT.policy('basic'); const G = __RT.G(); for (let i = 0; i < 30000 && !G.ending; i++) __RT.step(1); }); await wait(500);
  ck('reaches an ending', await pg.evaluate(() => !!__RT.G().ending), await pg.evaluate(() => JSON.stringify(__RT.G().ending)));
  console.log(out.join('\n')); console.log('errors', JSON.stringify(logs), JSON.stringify(await pg.evaluate(() => __RT.errors().slice(0, 3))));
  await br.close(); process.exit(out.some(l => l.startsWith('FAIL')) || logs.length ? 1 : 0);
})().catch(e => { console.log(out.join('\n')); console.error('FAIL', e.stack); process.exit(1); });
