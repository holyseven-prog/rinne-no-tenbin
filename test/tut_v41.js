/* V4.1-A12 tutorial E2E: node test/tut_v41.js [ja|zh]   (env CHROME_PATH overrides the browser)
   3 lessons in the practice world with real clicks -> graduation -> duties; skip; retake a lesson. */
const puppeteer = require('puppeteer-core'); const path = require('path'), fs = require('fs');
const CHROME = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].filter(Boolean).find(p => { try { return fs.existsSync(p); } catch (e) { return false; } });
const lang = process.argv[2] || 'ja'; const URL = 'file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/');
const OUT = path.join(__dirname, 'out', 'visual', 'v41'); fs.mkdirSync(OUT, { recursive: true });
const out = []; const ck = (n, c, x) => out.push((c ? 'PASS ' : 'FAIL ') + n + (x !== undefined ? ' ' + x : '')); const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const br = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] }); const logs = [];
  async function fresh() { const pg = await br.newPage(); await pg.setViewport({ width: 1280, height: 720 }); pg.on('pageerror', e => logs.push(e.message));
    await pg.evaluateOnNewDocument(l => { try { localStorage.setItem('rinne_tenbin_v1_settings', JSON.stringify({ bgm: 0, se: 0, speed: 1, text: 3, lang: l, names: 'key', theme: 'black', autoSlow: true, advisor: false, tutDone: false, v41: 1 })); } catch (e) { } }, lang);
    await pg.goto(URL); await wait(600); await pg.mouse.click(640, 360); await wait(300); await pg.evaluate(() => { __RT.ui.Game.pendingGod = 'mercy'; __RT.ui.Screens.opEnd(); });
    for (let i = 0; i < 40 && !(await pg.evaluate(() => !!(__RT.ui.Game.tut && __RT.ui.Game.tut.on))); i++) await wait(200); await wait(300); return pg; }
  const step = pg => pg.evaluate(() => { const T = __RT.ui.Game.tut; return T && T.on ? T.steps[T.i].id : 'off'; });
  const shot = (pg, n) => pg.screenshot({ path: path.join(OUT, 'tut_' + lang + '_' + n + '.png') });
  const clickNext = pg => pg.evaluate(() => { const b = Array.from(document.querySelectorAll('#tut .btn.on'))[0]; if (b) b.click(); return !!b; });
  const center = (pg, js) => pg.evaluate(js => { const el = eval(js); if (!el) return null; const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, js);
  const humanXY = pg => pg.evaluate(() => { const T = __RT.ui.Game.tut; const hh = __RT.G().idx[T.hid]; const R = __RT.ui.Render; const sr = document.getElementById('stage').getBoundingClientRect(), sc = sr.width / 1280; return { x: sr.left + (hh.x * 16 + 8 - R.cam.x) * 2 * sc, y: sr.top + (hh.y * 16 - 2 - R.cam.y) * 2 * sc }; });
  const until = async (pg, id, ms) => { for (let i = 0; i < (ms || 4000) / 100; i++) { if ((await step(pg)) === id) return true; await wait(100); } return false; };
  /* ---------- full run ---------- */
  let pg = await fresh();
  ck('tutorial starts in the practice world', await pg.evaluate(() => __RT.G().tutMode === true && __RT.G().humans.filter(h => h.alive).length >= 12 && __RT.G().humans.filter(h => h.alive).length <= 18), await pg.evaluate(() => __RT.G().humans.filter(h => h.alive).length));
  ck('L1 card', (await step(pg)) === 'l1card'); await shot(pg, 'l1_card'); await clickNext(pg);
  ck('L1 -> click the praying person', await until(pg, 'l1a')); const t0 = await pg.evaluate(() => __RT.G().tick); await wait(800); ck('time controlled by tutorial', await pg.evaluate(() => __RT.G().tick) === t0);
  let p = await humanXY(pg); await pg.mouse.click(p.x, p.y); ck('L1 select person -> pick power', await until(pg, 'l1b')); await shot(pg, 'l1_pick');
  const recKey = await pg.evaluate(() => { const T = __RT.ui.Game.tut; const pr = __RT.G().prayers.find(q => q.id === T.pid); return String(__RT.ui.POWERS ? 1 : 1) && (['oracle', 'grace', 'trial', 'soul', 'force'].indexOf(PRAYER_ANS[pr.kind][0]) + 1); });
  await pg.keyboard.press(String(recKey)); ck('L1 power -> cast step', await until(pg, 'l1c'));
  p = await humanXY(pg); await pg.mouse.click(p.x, p.y); await wait(400);
  if (await pg.evaluate(() => __RT.ui.Game.modals.indexOf('menu') >= 0)) { await pg.evaluate(() => { const b = document.querySelector('#modal .btn'); if (b) b.click(); }); }
  ck('L1 cast done', await until(pg, 'l1done', 5000)); await shot(pg, 'l1_done'); ck('L1 stamp shown', await pg.evaluate(() => !!document.querySelector('#tut .tut-stamp'))); await clickNext(pg);
  ck('L2 card', await until(pg, 'l2card')); await clickNext(pg); await until(pg, 'l2a'); await shot(pg, 'l2_bar'); await clickNext(pg);
  ck('L2 -> open defense', await until(pg, 'l2b')); p = await center(pg, '__RT.ui.UI.el.warBar'); await pg.mouse.click(p.x, p.y);
  ck('L2 defense screen open', await until(pg, 'l2c')); const before = await pg.evaluate(() => winForecast().now);
  await pg.evaluate(() => { const cards = Array.from(document.querySelectorAll('#modal .card')); const star = cards.find(c => /★/.test(c.textContent) && c.querySelector('.btn')) || cards.find(c => c.querySelector('.btn')); star.querySelector('.btn').click(); });
  ck('L2 prep done', await until(pg, 'l2d')); const after = await pg.evaluate(() => winForecast().now); ck('L2 win chance rises after prep', after > before, Math.round(before * 100) + '->' + Math.round(after * 100)); await shot(pg, 'l2_up');
  await pg.keyboard.press('Escape'); await wait(300); if (await pg.evaluate(() => __RT.ui.Game.modals.length)) await pg.evaluate(() => __RT.ui.Screens.pop());
  ck('L3 card', await until(pg, 'l3card')); await shot(pg, 'l3_card'); await clickNext(pg);
  let bt = false; for (let i = 0; i < 80 && !bt; i++) { await wait(150); bt = await pg.evaluate(() => __RT.ui.Game.modals.indexOf('battle') >= 0); } ck('L3 battle opens', bt); await shot(pg, 'l3_battle');
  for (let ph = 0; ph < 3; ph++) { await pg.evaluate(() => { const b = Array.from(document.querySelectorAll('#modal .btn.big')).find(x => !x.classList.contains('dis') && x.style.color); if (b) b.click(); }); await wait(350); }
  ck('L3 helping always wins', await pg.evaluate(() => { const B = __RT.G().battle; return !!B && B.done && ['crush', 'win', 'pyrrhic'].indexOf(B.grade) >= 0; }), await pg.evaluate(() => __RT.G().battle && __RT.G().battle.grade)); await shot(pg, 'l3_report');
  ck('L3 report shows the god\'s help', await pg.evaluate(() => /勝率 \+|勝率 \+/.test(document.querySelector('#modal').textContent)));
  await pg.evaluate(() => { const b = Array.from(document.querySelectorAll('#modal .btn.big')).pop(); b.click(); }); ck('L3 hero card step', await until(pg, 'l3c', 5000)); await shot(pg, 'l3_hero'); await clickNext(pg);
  ck('graduation council', await until(pg, 'gra', 3000)); await wait(300);
  await pg.evaluate(() => { const cs = Array.from(document.querySelectorAll('#modal .card')); cs[0].click(); }); await wait(120); await pg.evaluate(() => { const cs = Array.from(document.querySelectorAll('#modal .card')); cs[1].click(); }); await wait(120);
  await pg.evaluate(() => { const b = Array.from(document.querySelectorAll('#modal .btn.big')).find(x => !x.classList.contains('dis')); b.click(); });
  ck('graduation card', await until(pg, 'grcard', 3000)); await shot(pg, 'graduate');
  await pg.evaluate(() => { const b = Array.from(document.querySelectorAll('#tut .btn.on')).pop(); b.click(); }); await wait(900);
  ck('real game after graduation (easy mode)', await pg.evaluate(() => !__RT.G().tutMode && __RT.G().easy === true && __RT.G().humans.filter(h => h.alive).length > 30));
  for (let i = 0; i < 20 && !(await pg.evaluate(() => __RT.ui.Game.modals.indexOf('council') >= 0)); i++) await wait(200);
  await pg.evaluate(() => { if (__RT.ui.Game.modals.indexOf('council') >= 0) { autoCouncil(); __RT.ui.Screens.closeAll(); } }); await wait(800);
  ck('duty list shows 3 duties', await pg.evaluate(() => __RT.G().duty && __RT.G().duty.act.length === 3), await pg.evaluate(() => JSON.stringify(__RT.G().duty && __RT.G().duty.act)));
  await shot(pg, 'duties');
  await pg.evaluate(() => { __RT.ui.Screens.chronicle(); }); await wait(300); await pg.evaluate(() => __RT.ui.Screens.closeAll()); await pg.evaluate(() => { const G = __RT.G(); let pr = openPrayers()[0]; if (!pr) { const hh = G.humans.find(h => h.alive && h.age > 20 && !hasPrayer(h)); hh.prayCd = 0; pr = addPrayer(hh, 'sick', 0.6); } G.faith = 120; castPower(PRAYER_ANS[pr.kind][0], pr.hid, 'kind'); }); await wait(900);
  ck('a duty gets checked', await pg.evaluate(() => Object.keys(__RT.G().duty.done).length >= 1), await pg.evaluate(() => JSON.stringify(__RT.G().duty.done)));
  // what's this + guide
  await pg.evaluate(() => __RT.ui.Screens.helpMenu()); await wait(200); await shot(pg, 'helpmenu'); await pg.evaluate(() => { __RT.ui.Screens.closeAll(); __RT.ui.Screens.guide(2); }); await wait(200); await shot(pg, 'guide3'); await pg.evaluate(() => __RT.ui.Screens.closeAll());
  await pg.evaluate(() => { __RT.ui.Game.whatMode = true; }); p = await center(pg, '__RT.ui.UI.el.faithWin'); await pg.mouse.click(p.x, p.y); await wait(200); ck("what's-this explains a panel", await pg.evaluate(() => document.getElementById('tip').style.display === 'block' && document.getElementById('tip').textContent.length > 4)); await shot(pg, 'whats_this');
  await pg.close();
  /* ---------- skip ---------- */
  pg = await fresh(); await pg.evaluate(() => { const b = Array.from(document.querySelectorAll('#tut .btn')).pop(); b.click(); }); await wait(900);
  ck('skip leaves the practice world', await pg.evaluate(() => !__RT.ui.Game.tut && !__RT.G().tutMode)); await pg.close();
  /* ---------- retake lesson 2 ---------- */
  pg = await fresh(); await pg.evaluate(() => { const b = Array.from(document.querySelectorAll('#tut .btn')).pop(); b.click(); }); await wait(900);
  await pg.evaluate(() => __RT.ui.Screens.lessonMenu()); await wait(200); await pg.evaluate(() => { const b = Array.from(document.querySelectorAll('#modal .btn'))[1]; b.click(); }); await wait(900);
  ck('retake lesson 2', (await step(pg)) === 'l2card' && await pg.evaluate(() => __RT.G().tutMode === true), await step(pg)); await pg.close();
  console.log(out.join('\n')); console.log('errors', JSON.stringify(logs.slice(0, 5)));
  await br.close(); process.exit(out.some(l => l.startsWith('FAIL')) || logs.length ? 1 : 0);
})().catch(e => { console.log(out.join('\n')); console.error('FAIL', e.stack); process.exit(1); });
