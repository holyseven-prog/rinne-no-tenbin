/* UI v5 windows: council 3-choose-2 (full = take one out first, confirm only with 2, edict optional and paid only on confirm),
   battle report for the five grades with zero / many losses, generic window skin only while playing. node test/ui_v5_win.js [ja|zh] */
const puppeteer = require('puppeteer-core'); const path = require('path'), fs = require('fs');
const CHROME = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find(p => fs.existsSync(p));
const lang = process.argv[2] || 'ja'; const OUT = path.join(__dirname, 'out', 'visual', 'ui_v5'); fs.mkdirSync(OUT, { recursive: true });
const out = []; const ck = (n, c, x) => out.push((c ? 'PASS ' : 'FAIL ') + n + (x !== undefined ? ' ' + x : '')); const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => { const br = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] }); const pg = await br.newPage(); await pg.setViewport({ width: 1280, height: 720 });
  const logs = []; pg.on('pageerror', e => logs.push(e.message)); const shot = n => pg.screenshot({ path: path.join(OUT, n + '_' + lang + '.png') });
  await pg.evaluateOnNewDocument(l => { try { localStorage.setItem('rinne_tenbin_v1_settings', JSON.stringify({ bgm: 0, se: 0, lang: l, tutDone: true, advisor: false, hintsSeen: { duty: 1, skip: 1, listen: 1, card: 1, godlv: 1, awe: 1, adv: 1 } })); } catch (e) { } }, lang);
  await pg.goto('file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/')); await wait(1500);
  await pg.evaluate(() => __RT.ui.Screens.settings()); await wait(200); ck('title-scene windows keep their own skin', await pg.evaluate(() => !document.getElementById('modal').classList.contains('v5play'))); await pg.evaluate(() => __RT.ui.Screens.closeAll());
  await pg.evaluate(() => { __RT.ui.Game.pendingGod = 'mercy'; __RT.ui.Screens.opEnd(); }); await wait(1200);
  await pg.evaluate(() => { const G = __RT.G(); if (G.council && !G.council.done) closeCouncil(G.council.offer.slice(0, 2), null); __RT.ui.Screens.closeAll(); G.council = null; G.faith = 20; openCouncil(0); __RT.ui.Screens.council(); }); await wait(300);
  const st = () => pg.evaluate(() => { const cs = Array.from(document.querySelectorAll('#modal .v5choice')); const ok = Array.from(document.querySelectorAll('#modal footer .v5b')).pop(); return { n: cs.filter(c => c.getAttribute('aria-pressed') === 'true').length, cards: cs.length, ok: !!ok && !ok.disabled }; });
  let s = await st(); ck('council: 3 cards, confirm off with 0', s.cards === 3 && s.n === 0 && !s.ok, JSON.stringify(s)); ck('council has no close button', await pg.evaluate(() => !document.querySelector('#modal .v5close')));
  await pg.keyboard.press('Escape'); await wait(100); ck('Esc does not dismiss the council', await pg.evaluate(() => __RT.ui.Game.modals.indexOf('council') >= 0));
  const click = i => pg.evaluate(i => document.querySelectorAll('#modal .v5choice')[i].click(), i);
  await click(0); await wait(80); s = await st(); ck('1 picked, confirm still off', s.n === 1 && !s.ok); await shot('council1');
  await click(1); await wait(80); s = await st(); ck('2 picked, confirm on', s.n === 2 && s.ok); await click(2); await wait(80); s = await st();
  ck('a 3rd pick is refused (no silent swap)', s.n === 2 && await pg.evaluate(() => document.querySelectorAll('#modal .v5choice')[2].getAttribute('aria-pressed') === 'false')); await shot('council2');
  ck('edicts above faith are marked 信仰不足', await pg.evaluate(() => Array.from(document.querySelectorAll('#modal .v5b')).some(b => b.getAttribute('aria-disabled') === 'true' && b.textContent.indexOf(t('v5_no_faith')) >= 0)));
  const f0 = await pg.evaluate(() => __RT.G().faith); await pg.evaluate(() => { const b = Array.from(document.querySelectorAll('#modal .v5b')).find(x => x.textContent.indexOf(EDICTS.dread.n[li()]) === 0); b.click(); }); await wait(80);
  ck('choosing an edict does not pay yet', await pg.evaluate(f => __RT.G().faith === f, f0)); await pg.evaluate(() => Array.from(document.querySelectorAll('#modal footer .v5b')).pop().click()); await wait(200);
  ck('confirm: 2 decrees + the edict, council closed', await pg.evaluate(() => __RT.G().council.done && __RT.G().decrees.filter(d => d.state === 'active').length === 2 && __RT.G().council.edict === 'dread' && __RT.ui.Game.modals.length === 0));
  /* battle report for each grade */
  for (const [grade, many] of [['crush', 0], ['win', 1], ['pyrrhic', 1], ['loss', 1], ['rout', 0]]) {
    await pg.evaluate((grade, many) => { const G = __RT.G(); __RT.ui.Screens.closeAll(); G.battle = null; const a = nextAssault(); startBattle(a); const B = G.battle; for (let i = 0; i < 3 && !B.done; i++) battleStep('none'); B.grade = grade;
      const alive = G.humans.filter(h => h.alive); B.res = Object.assign(B.res || {}, { deaths: many ? alive.slice(0, 9).map(h => h.id) : [], ruined: many ? W.blds.filter(b => b.kind === 'house').slice(0, 2).map(b => b.id) : [], wallDown: grade === 'rout' });
      __RT.ui.Screens.battle(); }, grade, many); await wait(250);
    const r = await pg.evaluate(() => { const m = document.getElementById('modal'); const o = m.querySelector('.v5outcome'); return { lose: !!m.querySelector('.v5outcome.lose'), text: o ? o.textContent : '', stats: m.querySelectorAll('.v5stat').length }; });
    const win = ['crush', 'win', 'pyrrhic'].indexOf(grade) >= 0;
    ck('report ' + grade + ': outcome first, 3 stats, ' + (win ? 'win' : 'defeat') + ' shown as such', r.stats === 3 && r.lose === !win && (await pg.evaluate((w) => t(w ? 'v5_rp_win' : 'v5_rp_lose'), win).then(k => r.text.indexOf(k) >= 0)), JSON.stringify(r)); await shot('report_' + grade);
  }
  await pg.evaluate(() => Array.from(document.querySelectorAll('#modal .v5b')).pop().click()); await wait(300); ck('closing the report ends the battle', await pg.evaluate(() => !__RT.G().battle && __RT.ui.Game.modals.length === 0));
  /* other windows get the v5 skin while playing, no text under 16 px (fresh game: the forced reports above may have ended this one) */
  await pg.goto('file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/')); await wait(1500); await pg.evaluate(() => { __RT.ui.Game.pendingGod = 'mercy'; __RT.ui.Screens.opEnd(); }); await wait(1200);
  await pg.evaluate(() => { const G = __RT.G(); if (G.council && !G.council.done) closeCouncil(G.council.offer.slice(0, 2), null); __RT.ui.Screens.closeAll(); });
  for (const n of ['defense', 'residents', 'chronicle', 'settings', 'souls']) {
    await pg.evaluate(n => { if (__RT.ui.UI.tour) __RT.ui.UI.endTour(); __RT.ui.Screens.closeAll(); __RT.ui.Screens[n](); }, n); await wait(300);
    const ok = await pg.evaluate(() => { const m = document.getElementById('modal'); const small = Array.from(m.querySelectorAll('*')).filter(e => e.offsetParent && Array.from(e.childNodes).some(c => c.nodeType === 3 && c.textContent.trim())).filter(e => parseFloat(getComputedStyle(e).fontSize) < 16).map(e => e.tagName + ':' + getComputedStyle(e).fontSize + ':' + e.textContent.slice(0, 12)); return { skin: m.classList.contains('v5play'), small: small.length, ex: small.slice(0, 3) }; });
    ck('window ' + n + ': v5 skin, no text under 16 px', ok.skin && ok.small === 0, JSON.stringify(ok)); await shot('win_' + n); }
  ck('no page errors', logs.length === 0, JSON.stringify(logs.slice(0, 3))); ck('no ERRS', await pg.evaluate(() => ERRS.length === 0), await pg.evaluate(() => JSON.stringify(ERRS.slice(0, 3))));
  console.log(out.join('\n')); await br.close(); process.exit(out.some(l => l.startsWith('FAIL')) ? 1 : 0); })();
