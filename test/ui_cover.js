/* B4: share of the 1280x720 map covered by UI windows — normal (<=30%), all collapsed (<=10%), UI hidden (U). Screenshots in test/out/visual/b4. node test/ui_cover.js [ja|zh] */
const puppeteer = require('puppeteer-core'); const path = require('path'), fs = require('fs');
const CHROME = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find(p => fs.existsSync(p));
const lang = process.argv[2] || 'ja'; const OUT = path.join(__dirname, 'out', 'visual', 'b4'); fs.mkdirSync(OUT, { recursive: true });
const out = []; const ck = (n, c, x) => out.push((c ? 'PASS ' : 'FAIL ') + n + (x ? ' ' + x : '')); const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const br = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] }); const pg = await br.newPage(); await pg.setViewport({ width: 1280, height: 720 });
  const logs = []; pg.on('pageerror', e => logs.push(e.message));
  await pg.evaluateOnNewDocument(l => { try { localStorage.setItem('rinne_tenbin_v1_settings', JSON.stringify({ bgm: 0, se: 0, speed: 1, text: 3, lang: l, tutDone: true, autoSlow: false, advisor: false, hintsSeen: { duty: 1, skip: 1, listen: 1, card: 1, godlv: 1, awe: 1, adv: 1 } })); } catch (e) { } }, lang);
  await pg.goto('file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/')); await wait(700); await pg.mouse.click(640, 360); await wait(300);
  await pg.evaluate(() => { __RT.ui.Game.pendingGod = 'mercy'; __RT.ui.Screens.opEnd(); }); await wait(900);
  for (let i = 0; i < 20; i++) { await wait(300); if (await pg.evaluate(() => __RT.ui.Game.modals.join(',') === 'council')) break; }
  await pg.evaluate(() => { const G = __RT.G(); if (G.council && !G.council.done) closeCouncil(G.council.offer.slice(0, 2), null); __RT.ui.Screens.closeAll(); for (let i = 0; i < 400; i++) tick(); G.cards = [{ id: 'rumor', t: G.tick, n: G.nid++ }]; __RT.ui.UI.cardSig = ''; __RT.ui.Game.paused = true; __RT.ui.UI.refresh(true); });
  await wait(600);
  const cover = () => pg.evaluate(() => { const st = document.getElementById('stage').getBoundingClientRect(); const s = st.width / 1280; const rs = Array.from(document.querySelectorAll('#ui .win')).filter(w => w.offsetParent !== null && getComputedStyle(w).display !== 'none' && getComputedStyle(w).visibility !== 'hidden').map(w => { const r = w.getBoundingClientRect(); return [(r.left - st.left) / s, (r.top - st.top) / s, r.width / s, r.height / s]; });
    let n = 0, c = 0; for (let y = 2; y < 720; y += 4) for (let x = 2; x < 1280; x += 4) { n++; if (rs.some(r => x >= r[0] && x < r[0] + r[2] && y >= r[1] && y < r[1] + r[3])) c++; } return c / n; });
  const c0 = await cover(); ck('normal cover <= 30%', c0 <= 0.30, (c0 * 100).toFixed(1) + '%'); await pg.screenshot({ path: path.join(OUT, 'ui_normal_' + lang + '.png') });
  const hasCollapse = await pg.evaluate(() => typeof UI.collapseAll === 'function'); if (hasCollapse) { await pg.evaluate(() => UI.collapseAll(true)); await wait(300); const c1 = await cover(); ck('all collapsed cover <= 10%', c1 <= 0.10, (c1 * 100).toFixed(1) + '%'); await pg.screenshot({ path: path.join(OUT, 'ui_collapsed_' + lang + '.png') }); await pg.evaluate(() => UI.collapseAll(false)); } else ck('collapse exists', false);
  await pg.keyboard.press('u'); await wait(300); const c2 = await cover(); ck('U hides UI (top row only)', c2 <= 0.10, (c2 * 100).toFixed(1) + '%'); await pg.screenshot({ path: path.join(OUT, 'ui_hidden_' + lang + '.png') }); await pg.keyboard.press('u'); await wait(200);
  ck('U toggles back', (await cover()) > c2 + 0.05);
  ck('no page errors', logs.length === 0, JSON.stringify(logs.slice(0, 3)));
  console.log(out.join('\n')); await br.close(); process.exit(out.some(l => l.startsWith('FAIL')) ? 1 : 0);
})();
