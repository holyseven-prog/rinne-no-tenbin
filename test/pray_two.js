/* B2: click a prayer card, then press a power key -> cast at once (2 actions); a power that cannot answer is greyed and says why. node test/pray_two.js [ja|zh] */
const puppeteer = require('puppeteer-core'); const path = require('path'), fs = require('fs');
const CHROME = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find(p => fs.existsSync(p));
const lang = process.argv[2] || 'ja'; const OUT = path.join(__dirname, 'out', 'visual', 'b2'); fs.mkdirSync(OUT, { recursive: true });
const out = []; const ck = (n, c, x) => out.push((c ? 'PASS ' : 'FAIL ') + n + (x ? ' ' + x : '')); const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const br = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] }); const pg = await br.newPage(); await pg.setViewport({ width: 1280, height: 720 });
  const logs = []; pg.on('pageerror', e => logs.push(e.message));
  await pg.evaluateOnNewDocument(l => { try { localStorage.setItem('rinne_tenbin_v1_settings', JSON.stringify({ bgm: 0, se: 0, speed: 1, text: 3, lang: l, tutDone: true, autoSlow: false, advisor: false, hintsSeen: { duty: 1, skip: 1, listen: 1, card: 1, godlv: 1, awe: 1, adv: 1 } })); } catch (e) { } }, lang);
  await pg.goto('file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/')); await wait(700); await pg.mouse.click(640, 360); await wait(300);
  await pg.evaluate(() => { __RT.ui.Game.pendingGod = 'mercy'; __RT.ui.Screens.opEnd(); }); await wait(900);
  for (let i = 0; i < 20; i++) { await wait(300); if (await pg.evaluate(() => __RT.ui.Game.modals.join(',') === 'council')) break; }
  await pg.evaluate(() => { const G = __RT.G(); if (G.council && !G.council.done) closeCouncil(G.council.offer.slice(0, 2), null); __RT.ui.Screens.closeAll(); G.cards = []; __RT.ui.Game.paused = true;
    const h = G.humans.find(x => x.alive && x.age >= 18); G.prayers = G.prayers.filter(p => p.state !== 'open'); h.prayCd = 0; addPrayer(h, 'sick', 0.6); G.faith = 100; __RT.ui.UI.lastPray = ''; __RT.ui.UI.rTab('pray', true); __RT.ui.UI.refresh(true); });
  await wait(400);
  const st = () => pg.evaluate(() => ({ casts: __RT.G().stats.casts || 0, faith: Math.round(__RT.G().faith), open: openPrayers().length, sel: __RT.ui.UI.selPrayer || 0, menu: __RT.ui.Game.modals.join(',') }));
  const s0 = await st(); ck('one open prayer', s0.open === 1, JSON.stringify(s0));
  // action 1: click the card
  const box = await pg.evaluate(() => { const c = __RT.ui.UI.el.prayList.querySelector('.card'); const r = c.getBoundingClientRect(); return { x: r.left + 40, y: r.top + 30 }; }); await pg.mouse.click(box.x, box.y); await wait(250);
  const s1 = await st(); ck('card selected (frame)', s1.sel > 0 && await pg.evaluate(() => !!__RT.ui.UI.el.prayList.querySelector('.card.psel')), JSON.stringify(s1));
  ck('soul power greyed for a sick prayer', await pg.evaluate(() => __RT.ui.UI.el.powBtns[3].classList.contains('dis')));
  await pg.screenshot({ path: path.join(OUT, 'b2_selected_' + lang + '.png') });
  // action 2: key 2 (grace)
  await pg.keyboard.press('2'); await wait(400); const s2 = await st();
  ck('cast after 2 actions', s2.casts === s0.casts + 1 && s2.menu === '', JSON.stringify(s2)); ck('faith spent', s2.faith !== s0.faith); ck('selection cleared', s2.sel === 0);
  await pg.screenshot({ path: path.join(OUT, 'b2_done_' + lang + '.png') });
  // a power that cannot answer: says why
  await pg.evaluate(() => { const G = __RT.G(); const h = G.humans.filter(x => x.alive && x.age >= 18)[2]; h.prayCd = 0; addPrayer(h, 'sick', 0.6); G.faith = 100; __RT.ui.UI.lastPray = ''; __RT.ui.UI.refresh(true); }); await wait(300);
  const box2 = await pg.evaluate(() => { const c = __RT.ui.UI.el.prayList.querySelector('.card'); const r = c.getBoundingClientRect(); return { x: r.left + 40, y: r.top + 30 }; }); await pg.mouse.click(box2.x, box2.y); await wait(200);
  const c0 = (await st()).casts; await pg.keyboard.press('4'); await wait(300); ck('unusable power does not cast', (await st()).casts === c0); ck('unusable power says why', /この祈りには使えない|這個祈禱用不了/.test(await pg.evaluate(() => document.body.innerText)));
  ck('no page errors', logs.length === 0, JSON.stringify(logs.slice(0, 3)));
  console.log(out.join('\n')); await br.close(); process.exit(out.some(l => l.startsWith('FAIL')) ? 1 : 0);
})();
