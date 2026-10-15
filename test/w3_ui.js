/* V4.2 W3 UI: training screen, expedition plan -> floor battles -> continue/retreat -> report, castle interior floors. node test/w3_ui.js [ja|zh] */
const puppeteer = require('puppeteer-core'); const path = require('path'), fs = require('fs');
const CHROME = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find(p => fs.existsSync(p));
const lang = process.argv[2] || 'ja'; const OUT = path.join(__dirname, 'out', 'visual', 'v42'); fs.mkdirSync(OUT, { recursive: true });
const out = []; const ck = (n, c, x) => out.push((c ? 'PASS ' : 'FAIL ') + n + (x ? ' ' + x : '')); const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const br = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] }); const pg = await br.newPage(); await pg.setViewport({ width: 1280, height: 720 });
  const logs = []; pg.on('pageerror', e => logs.push(e.message));
  await pg.evaluateOnNewDocument(l => { try { localStorage.setItem('rinne_tenbin_v1_settings', JSON.stringify({ bgm: 0, se: 0, speed: 1, text: 3, lang: l, names: 'key', theme: 'black', autoSlow: false, advisor: false, tutDone: true, hintsSeen: { duty: 1, skip: 1, listen: 1, card: 1, godlv: 1, awe: 1, adv: 1, train: 1, exp: 1 } })); } catch (e) { } }, lang);
  await pg.goto('file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/')); await wait(700); await pg.mouse.click(640, 360); await wait(300);
  await pg.evaluate(() => { __RT.ui.Game.pendingGod = 'mercy'; __RT.ui.Screens.opEnd(); }); await wait(900);
  // skip the council, make a strong hero party
  await pg.evaluate(() => { const G = __RT.G(); if (G.council && !G.council.done) closeCouncil(G.council.offer.slice(0, 2), null); __RT.ui.Screens.closeAll(); __RT.ui.Game.modals.length = 0;
    const advs = G.humans.filter(h => h.alive && h.age >= 16).slice(0, 5); advs.forEach((h, i) => { h.adv = 1; h.lvl = 12 - i; const st = hStats(h); h.maxHp = st.hp; h.hp = h.maxHp; }); G.heroId = advs[0].id; G.godLv = 4; G.faith = 300; G.faithMax = 400; G.store = G.store || {}; G.store.stoneS = 5; G.store.stoneM = 4; G.moralePerm = 20; });
  const modal = () => pg.evaluate(() => __RT.ui.Game.modals.join(','));
  await pg.keyboard.press('b'); await wait(400); const btns = await pg.evaluate(() => Array.from(document.querySelectorAll('#modal .btn')).map(b => b.textContent).join('|')); ck('defense has training + expedition buttons', /✦/.test(btns) && /⚔/.test(btns), btns.slice(0, 200));
  await pg.evaluate(() => Array.from(document.querySelectorAll('#modal .btn')).find(b => /✦/.test(b.textContent)).click()); await wait(400); ck('training screen opens', (await modal()).indexOf('training') >= 0, await modal());
  const trTxt = await pg.evaluate(() => document.querySelector('#modal').textContent); ck('training shows throne delta', /%/.test(trTxt)); await pg.screenshot({ path: path.join(OUT, 'w3_training_' + lang + '.png') });
  const f0 = await pg.evaluate(() => __RT.G().faith); await pg.evaluate(() => { const b = Array.from(document.querySelectorAll('#modal .card .btn'))[0]; if (b) b.click(); }); await wait(300); ck('training spends faith', (await pg.evaluate(() => __RT.G().faith)) < f0);
  await pg.keyboard.press('Escape'); await wait(300);
  await pg.evaluate(() => Array.from(document.querySelectorAll('#modal .btn')).find(b => /⚔/.test(b.textContent)).click()); await wait(400); ck('expedition plan opens', (await modal()).indexOf('expedition') >= 0, await modal());
  const plan = await pg.evaluate(() => document.querySelector('#modal').textContent); ck('plan shows 4 floors with forecasts', (plan.match(/%/g) || []).length >= 8, (plan.match(/%/g) || []).length + ''); await pg.screenshot({ path: path.join(OUT, 'w3_plan_' + lang + '.png') });
  await pg.evaluate(() => Array.from(document.querySelectorAll('#modal .btn.big')).find(b => /30/.test(b.textContent)).click()); await wait(500); ck('battle screen after departure', (await modal()).indexOf('expbattle') >= 0, await modal()); await pg.screenshot({ path: path.join(OUT, 'w3_battle_' + lang + '.png') });
  // fight: always pick the first help option, continue while possible
  let guard = 0, sawChoice = false;
  while (guard++ < 30) { const st = await pg.evaluate(() => { const E = __RT.G().castle.exp; return E ? { done: E.done, cleared: E.cleared } : null; }); if (!st || st.done) break;
    const txt = await pg.evaluate(() => Array.from(document.querySelectorAll('#modal .btn.big')).map(b => b.textContent).join('|'));
    if (/次の階|下一層/.test(txt)) { if (!sawChoice) { sawChoice = true; await pg.screenshot({ path: path.join(OUT, 'w3_between_' + lang + '.png') }); } await pg.evaluate(() => Array.from(document.querySelectorAll('#modal .btn.big'))[0].click()); }
    else await pg.evaluate(() => { const b = Array.from(document.querySelectorAll('#modal .btn.big')).filter(x => !x.classList.contains('dis')); b[0].click(); });
    await wait(200); }
  const E = await pg.evaluate(() => { const E = __RT.G().castle.exp; return E && { done: E.done, cleared: E.cleared, how: E.how, n: E.results.length }; }); ck('expedition finishes', E && E.done, JSON.stringify(E)); ck('continue/retreat choice appeared or first floor lost', sawChoice || (E && E.cleared === 0));
  await pg.screenshot({ path: path.join(OUT, 'w3_result_' + lang + '.png') });
  await pg.evaluate(() => Array.from(document.querySelectorAll('#modal .btn.big')).pop().click()); await wait(300); ck('result closes', (await modal()) === '', await modal());
  ck('party is away after the expedition', await pg.evaluate(() => { const G = __RT.G(); return G.humans.some(h => h.alive && h.away && h.returnAt); }));
  ck('anger rose', await pg.evaluate(() => __RT.G().castle.anger > 0));
  // castle interior
  await pg.evaluate(() => { const G = __RT.G(); if (G.council && !G.council.done) closeCouncil(G.council.offer.slice(0, 2), null); __RT.ui.Screens.closeAll(); __RT.ui.Game.modals.length = 0; __RT.ui.Game.paused = true; }); await wait(300);
  await pg.evaluate(() => { __RT.ui.UI.el.regBtns.castle.click(); }); await wait(400); ck('castle view on', await pg.evaluate(() => __RT.ui.Game.view === 'castle'));
  for (let f = 1; f <= 4; f++) { await pg.evaluate(f => { __RT.ui.Game.castleFloor = f; __RT.ui.UI.refreshCastleBar(); }, f); await wait(700); await pg.screenshot({ path: path.join(OUT, 'w3_castle' + f + '_' + lang + '.png') }); }
  await pg.evaluate(() => Array.from(__RT.ui.UI.el.castleBar.querySelectorAll('.btn')).pop().click()); await wait(200); ck('back to world', await pg.evaluate(() => __RT.ui.Game.view === 'world'));
  ck('no page errors', logs.length === 0, JSON.stringify(logs.slice(0, 3))); ck('no ERRS', await pg.evaluate(() => ERRS.length === 0), await pg.evaluate(() => JSON.stringify(ERRS.slice(0, 3))));
  console.log(out.join('\n')); await br.close(); process.exit(out.some(l => l.startsWith('FAIL')) ? 1 : 0);
})();
