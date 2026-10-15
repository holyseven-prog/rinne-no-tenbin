/* V4.1b 2-1: with 8 open prayers every card can be scrolled into view and selected; the era card stays outside the list; the panel ends above the action bar.
   node test/pray_scroll.js [ja|zh] */
const puppeteer = require('puppeteer-core'); const path = require('path'), fs = require('fs');
const CHROME = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find(p => fs.existsSync(p));
const lang = process.argv[2] || 'ja'; const OUT = path.join(__dirname, 'out', 'visual', 'v41b'); fs.mkdirSync(OUT, { recursive: true });
const out = []; const ck = (n, c, x) => out.push((c ? 'PASS ' : 'FAIL ') + n + (x ? ' ' + x : '')); const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const br = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] }); const pg = await br.newPage(); await pg.setViewport({ width: 1280, height: 720 });
  const logs = []; pg.on('pageerror', e => logs.push(e.message));
  await pg.evaluateOnNewDocument(l => { try { localStorage.setItem('rinne_tenbin_v1_settings', JSON.stringify({ bgm: 0, se: 0, speed: 1, text: 3, lang: l, tutDone: true, autoSlow: false, advisor: false, hintsSeen: { duty: 1, skip: 1, listen: 1, card: 1, godlv: 1, awe: 1, adv: 1 } })); } catch (e) { } }, lang);
  await pg.goto('file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/')); await wait(1200);
  await pg.evaluate(() => { __RT.ui.Game.pendingGod = 'mercy'; __RT.ui.Screens.opEnd(); }); await wait(1500);
  await pg.evaluate(() => { const G = __RT.G(); if (G.council && !G.council.done) closeCouncil(G.council.offer.slice(0, 2), null); __RT.ui.Screens.closeAll(); __RT.ui.Game.paused = true;
    G.prayers = G.prayers.filter(p => p.state !== 'open'); G.humans.filter(h => h.alive && h.age >= 16).slice(0, 8).forEach((h, i) => { h.prayCd = 0; addPrayer(h, ['sick', 'hunger', 'battle', 'fear', 'love', 'sick', 'hunger', 'battle'][i], 0.3 + i * 0.08); });
    G.cards = [{ id: 'rumor', t: G.tick, n: G.nid++ }]; __RT.ui.UI.cardSig = ''; __RT.ui.UI.lastPray = ''; __RT.ui.UI.rTab('pray', true); __RT.ui.UI.refresh(true); __RT.ui.UI.refreshWar(); });
  await wait(500);
  const info = await pg.evaluate(() => { const E = __RT.ui.UI.el; const r = E.rightWin.getBoundingClientRect(); const st = document.getElementById('stage').getBoundingClientRect(); const s = st.width / 1280; return { open: openPrayers().length, cards: E.prayList.querySelectorAll('.card').length, bottom: (r.bottom - st.top) / s, cardOutside: !E.rBody.contains(E.cardWin), scrollable: E.rBody.scrollHeight > E.rBody.clientHeight, ov: getComputedStyle(E.rBody).overflowY }; });
  ck('8 prayers, 8 cards', info.open === 8 && info.cards === 8, JSON.stringify(info)); ck('era card is outside the list', info.cardOutside); ck('list scrolls (overflow auto)', info.ov === 'auto'); ck('panel ends above the action bar (<= 642)', info.bottom <= 642, info.bottom.toFixed(0));
  await pg.screenshot({ path: path.join(OUT, 'pray8_top_' + lang + '.png') });
  // every card: scroll it into view with the wheel, click it, it becomes the selected prayer
  let ok = 0; const miss = [];
  for (let i = 0; i < 8; i++) { const box = await pg.evaluate(i => { const E = __RT.ui.UI.el; const c = E.prayList.querySelectorAll('.card')[i]; const lr = E.rBody.getBoundingClientRect(); const r = c.getBoundingClientRect(); return { y: r.top, h: r.height, top: lr.top, bot: lr.bottom, x: r.left + 30, id: c._p && c._p.id }; }, i);
    let b = box; for (let k = 0; k < 20 && (b.y < b.top || b.y + 18 > b.bot); k++) { await pg.mouse.move(b.x, (b.top + b.bot) / 2); await pg.mouse.wheel({ deltaY: b.y + 18 > b.bot ? 80 : -80 }); await wait(80); b = await pg.evaluate(i => { const E = __RT.ui.UI.el; const c = E.prayList.querySelectorAll('.card')[i]; const lr = E.rBody.getBoundingClientRect(); const r = c.getBoundingClientRect(); return { y: r.top, h: r.height, top: lr.top, bot: lr.bottom, x: r.left + 30, id: c._p && c._p.id }; }, i); }
    const hit = await pg.evaluate((x, y) => { const el = document.elementFromPoint(x, y); return !!(el && el.closest && el.closest('.card')); }, b.x, b.y + 10);
    if (!hit) { miss.push(i + ':hidden'); continue; } await pg.mouse.click(b.x, b.y + 10); await wait(200); const sel = await pg.evaluate(() => __RT.ui.UI.selPrayer); if (sel === b.id) ok++; else miss.push(i + ':notsel');
    if (i === 7) await pg.screenshot({ path: path.join(OUT, 'pray8_bottom_' + lang + '.png') });
    await pg.evaluate(() => { __RT.ui.UI.selPrayer = 0; __RT.ui.UI.lastPray = ''; __RT.ui.UI.refresh(true); }); await wait(150); }
  ck('all 8 can be scrolled to and selected', ok === 8, ok + '/8 ' + JSON.stringify(miss));
  ck('no page errors', logs.length === 0, JSON.stringify(logs.slice(0, 3)));
  console.log(out.join('\n')); await br.close(); process.exit(out.some(l => l.startsWith('FAIL')) ? 1 : 0);
})();
