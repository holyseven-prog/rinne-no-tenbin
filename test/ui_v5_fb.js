/* SEVEN feedback 2026-11-25: era card shows each choice's effect, then the result after a choice (and when it runs out);
   傾聴 shows the count and says why when it cannot be used; the event list fills the panel. node test/ui_v5_fb.js [ja|zh] */
const puppeteer = require('puppeteer-core'); const path = require('path'), fs = require('fs');
const CHROME = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find(p => fs.existsSync(p));
const lang = process.argv[2] || 'ja'; const OUT = path.join(__dirname, 'out', 'visual', 'ui_v5'); fs.mkdirSync(OUT, { recursive: true });
const out = []; const ck = (n, c, x) => out.push((c ? 'PASS ' : 'FAIL ') + n + (x !== undefined ? ' ' + x : '')); const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => { const br = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] }); const pg = await br.newPage(); await pg.setViewport({ width: 1280, height: 720 });
  const logs = []; pg.on('pageerror', e => logs.push(e.message)); const side = n => pg.screenshot({ path: path.join(OUT, 'fb_' + n + '_' + lang + '.png'), clip: { x: 960, y: 90, width: 320, height: 460 } });
  await pg.evaluateOnNewDocument(l => { try { localStorage.setItem('rinne_tenbin_v1_settings', JSON.stringify({ bgm: 0, se: 0, lang: l, tutDone: true, advisor: false, hintsSeen: { duty: 1, skip: 1, listen: 1, card: 1, godlv: 1, awe: 1, adv: 1 } })); } catch (e) { } }, lang);
  await pg.goto('file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/')); await wait(1500);
  await pg.evaluate(() => { __RT.ui.Game.pendingGod = 'mercy'; __RT.ui.Screens.opEnd(); }); await wait(1200);
  await pg.evaluate(() => { const G = __RT.G(); if (G.council && !G.council.done) closeCouncil(G.council.offer.slice(0, 2), null); __RT.ui.Screens.closeAll(); for (let i = 0; i < 300; i++) tick(); __RT.ui.Game.paused = true; G.faith = 100; G.cards = [{ id: 'nest', t: G.tick, n: G.nid++ }]; __RT.ui.UI.cardSig = ''; __RT.ui.UI.rTab('pray', true); __RT.ui.UI.refresh(true); }); await wait(300);
  const fx = await pg.evaluate(() => Array.from(document.querySelectorAll('#v5list .ecard .sm')).map(e => e.textContent).filter(s => s.indexOf('→') === 0));
  ck('each choice says what it does', fx.length === 3, JSON.stringify(fx)); await side('card');
  const b = await pg.evaluate(() => { const x = Array.from(document.querySelectorAll('#v5list .ecard .btn'))[1]; const r = x.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }); const f0 = await pg.evaluate(() => __RT.G().faith);
  await pg.mouse.click(b.x, b.y); await wait(300);
  const r = await pg.evaluate(() => { const txt = document.querySelector('#v5list .ecard') ? document.querySelector('#v5list .ecard').textContent : ''; return { cards: __RT.G().cards.length, txt, vis: document.querySelector('#v5list .ecard').offsetParent !== null, toast: !document.getElementById('v5toast').classList.contains('v5hide'), ok: txt.indexOf(t('v5_card_res')) >= 0 && txt.indexOf(v5CardFx('nest', 'stop')) >= 0 }; });
  ck('after a choice: options gone, result shown (choice + effect) + toast', r.cards === 0 && r.vis && r.ok && r.toast, JSON.stringify(r));
  ck('the choice was paid', await pg.evaluate(f => __RT.G().faith === f - 20, f0)); await side('result');
  await pg.evaluate(() => { const ok = Array.from(document.querySelectorAll('#v5list .ecard .btn')).pop(); ok.click(); }); await wait(200); ck('OK closes the result', await pg.evaluate(() => document.querySelector('#v5list .ecard').offsetParent === null));
  /* running out */
  await pg.evaluate(() => { const G = __RT.G(); G.cards = [{ id: 'rumor', t: G.tick, n: G.nid++ }]; __RT.ui.UI.cardSig = ''; __RT.ui.UI.refresh(true); }); await wait(100);
  await pg.evaluate(() => { const G = __RT.G(); const c = G.cards[0]; G.cards = []; resolveCard(c, 'leave'); __RT.ui.UI.refresh(true); }); await wait(150);
  ck('a card that ran out says so', await pg.evaluate(() => document.querySelector('#v5list .ecard').textContent.indexOf(t('v5_card_exp')) >= 0)); await pg.evaluate(() => Array.from(document.querySelectorAll('#v5list .ecard .btn')).pop().click());
  /* 傾聴 */
  await pg.evaluate(() => { const G = __RT.G(); G.prayers.filter(p => p.state === 'open').forEach(p => p.state = 'expired'); G.humans.filter(h => h.alive && h.age > 16).slice(0, 3).forEach((h, i) => { h.prayCd = 0; addPrayer(h, ['sick', 'hunger', 'fear'][i], 0.4); }); G.listenLeft = 1; __RT.ui.UI.lastPray = ''; __RT.ui.UI.refresh(true); }); await wait(200);
  ck('傾聴 shows the count left', await pg.evaluate(() => Array.from(document.querySelectorAll('#v5list .prayc>.btn')).every(b => /1\/3/.test(b.textContent))));
  await pg.evaluate(() => document.querySelector('#v5list .prayc>.btn').click()); await wait(200);
  const L = await pg.evaluate(() => ({ left: __RT.G().listenLeft, done: Array.from(document.querySelectorAll('#v5list .prayc>.btn')).filter(b => b.textContent.indexOf(t('v5_listen_done')) >= 0).length, off: Array.from(document.querySelectorAll('#v5list .prayc>.btn.dis')).length }));
  ck('after listening: 0 left, one marked 傾聴済み, the others off', L.left === 0 && L.done === 1 && L.off === 3, JSON.stringify(L));
  await pg.evaluate(() => Array.from(document.querySelectorAll('#v5list .prayc>.btn')).find(b => b.textContent.indexOf(t('v5_listen_done')) < 0).click()); await wait(150);
  ck('pressing an off 傾聴 says why', await pg.evaluate(() => document.getElementById('v5toast').textContent === t('v5_listen_why0'))); await side('listen');
  /* event list */
  await pg.evaluate(() => { for (let i = 0; i < 30; i++) __RT.ui.UI.pushFeed('テスト事件 ' + i + ' ' + 'とても長い事件の説明文がここに入ります'.repeat(1), '#f6f2e8'); __RT.ui.UI.rTab('feed', true); }); await wait(200);
  const fd = await pg.evaluate(() => { const l = document.getElementById('v5list'); return { n: UI.el.feedList.children.length, scroll: l.scrollHeight > l.clientHeight, newest: UI.el.feedList.firstChild.textContent.indexOf('29') >= 0 }; });
  ck('event list: up to 40, newest first, scrolls inside the panel', fd.n >= 30 && fd.newest && fd.scroll, JSON.stringify(fd)); await side('feed');
  ck('no page errors', logs.length === 0, JSON.stringify(logs.slice(0, 3))); ck('no ERRS', await pg.evaluate(() => ERRS.length === 0), await pg.evaluate(() => JSON.stringify(ERRS.slice(0, 3))));
  console.log(out.join('\n')); await br.close(); process.exit(out.some(l => l.startsWith('FAIL')) ? 1 : 0); })();
