/* A suggestion 3: is the daytime screen dimmed by an empty modal (a screen that failed to build)? Open the council at each period start up to year 6. */
const puppeteer = require('puppeteer-core'); const path = require('path'), fs = require('fs');
const lang = process.argv[2] || 'zh'; const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const br = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', args: ['--no-sandbox'] }); const pg = await br.newPage(); await pg.setViewport({ width: 1280, height: 720 });
  const logs = []; pg.on('pageerror', e => logs.push(e.message));
  await pg.evaluateOnNewDocument(l => { localStorage.setItem('rinne_tenbin_v1_settings', JSON.stringify({ bgm: 0, se: 0, speed: 1, text: 3, lang: l, tutDone: true, autoSlow: false, advisor: false })); }, lang);
  await pg.goto('file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/')); await wait(700); await pg.mouse.click(640, 360); await wait(300);
  await pg.evaluate(() => { __RT.ui.Game.pendingGod = 'order'; __RT.ui.Screens.opEnd(); }); await wait(1500);
  for (let k = 0; k < 14; k++) {
    const r = await pg.evaluate(() => { const ui = __RT.ui, G = __RT.G(); ui.Screens.closeAll(); if (G.council && !G.council.done) closeCouncil(G.council.offer.slice(0, 2), null); G.forceAuto = true; const t0 = G.tick; let n = 0; while (!(G.council && !G.council.done) && n++ < 3000 && !G.ending) tick(); G.forceAuto = false; if (G.battle && G.battle.done) G.battle = null;
      ui.Screens.closeAll(); if (G.council && !G.council.done) ui.Screens.council(); const m = document.getElementById('modal'); const win = m && m.querySelector('.win'); return { y: ((G.tick - START_TICK) / TICK_YEAR).toFixed(2), modals: ui.Game.modals.join(','), hasWin: !!win, winH: win ? win.offsetHeight : 0, errs: ERRS.slice(-3), dimBg: m ? getComputedStyle(m).backgroundColor : '' }; });
    console.log(JSON.stringify(r)); if (!r.hasWin) { await pg.screenshot({ path: path.join(__dirname, 'out', 'dim_' + k + '.png') }); }
  }
  console.log('pageerrors', JSON.stringify(logs.slice(0, 5))); await br.close();
})();
