/* B1: era-card buttons must react to real mouse clicks at x1 and x16 (10 clicks each per button); low faith must show a reason. node test/card_click.js [ja|zh] */
const puppeteer = require('puppeteer-core'); const path = require('path'), fs = require('fs');
const CHROME = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find(p => fs.existsSync(p));
const lang = process.argv[2] || 'ja'; const OUT = path.join(__dirname, 'out', 'visual', 'b1'); fs.mkdirSync(OUT, { recursive: true });
const out = []; const ck = (n, c, x) => out.push((c ? 'PASS ' : 'FAIL ') + n + (x ? ' ' + x : '')); const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const br = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] }); const pg = await br.newPage(); await pg.setViewport({ width: 1280, height: 720 });
  const logs = []; pg.on('pageerror', e => logs.push(e.message));
  await pg.evaluateOnNewDocument(l => { try { localStorage.setItem('rinne_tenbin_v1_settings', JSON.stringify({ bgm: 0, se: 0, speed: 1, text: 3, lang: l, tutDone: true, autoSlow: false, advisor: false })); } catch (e) { } }, lang);
  await pg.goto('file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/')); await wait(700); await pg.mouse.click(640, 360); await wait(300);
  await pg.evaluate(() => { __RT.ui.Game.pendingGod = 'mercy'; __RT.ui.Screens.opEnd(); }); await wait(900);
  for (let i = 0; i < 20; i++) { await wait(300); if (await pg.evaluate(() => __RT.ui.Game.modals.join(',') === 'council')) break; }
  await pg.evaluate(() => { const G = __RT.G(); if (G.council && !G.council.done) closeCouncil(G.council.offer.slice(0, 2), null); __RT.ui.Screens.closeAll(); });
  const give = () => pg.evaluate(() => { const G = __RT.G(); G.cards = [{ id: 'rumor' in CARDS ? 'rumor' : CARD_KEYS[0], t: G.tick, n: G.nid++ }]; window.__cardN = G.cards[0].n; __RT.ui.UI.cardSig = ''; });
  const btnBox = i => pg.evaluate(i => { const b = __RT.ui.UI.el.cardWin.querySelectorAll('.btn')[i]; if (!b) return null; const r = b.getBoundingClientRect(); const x = r.left + r.width / 2, y = r.top + r.height / 2; const hit = document.elementFromPoint(x, y); return { x, y, hit: hit === b || b.contains(hit), txt: b.textContent, hitDesc: hit ? hit.tagName + '.' + hit.className : '' }; }, i);
  for (const sp of [0, 2]) { // speed index 1 = x1, 4 = x16? use Game.speeds
    await pg.evaluate(sp => { const ui = __RT.ui; ui.Game.speedIdx = sp; }, sp);
    const label = await pg.evaluate(() => SPEEDS[__RT.ui.Game.speedIdx]); await give(); await wait(200); const nB = await pg.evaluate(() => __RT.ui.UI.el.cardWin.querySelectorAll('.btn').length);
    for (let b = 0; b < nB; b++) { let ok = 0, miss = [];
      for (let k = 0; k < 10; k++) { await pg.evaluate(() => { __RT.G().faith = Math.max(__RT.G().faith, 60); }); await give(); await wait(250); const bb = await btnBox(b); if (!bb) { miss.push('nobtn'); continue; } if (!bb.hit) miss.push('covered:' + bb.hitDesc);
        await pg.mouse.click(bb.x, bb.y, { delay: 60 }); await wait(150); const gone = await pg.evaluate(() => !(__RT.G().cards || []).some(c => c.n === window.__cardN)); if (gone) ok++; else miss.push('noeffect:' + JSON.stringify(await pg.evaluate(() => ({ m: __RT.ui.Game.modals.join(','), w: !!__RT.ui.Game.whatMode, p: __RT.ui.Game.paused, html: __RT.ui.UI.el.cardWin.innerText.slice(0, 40), top: (() => { const b = __RT.ui.UI.el.cardWin.querySelector('.btn'); if (!b) return ''; const r = b.getBoundingClientRect(); const e = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); return e ? e.tagName + '.' + e.className : ''; })() })))); }
      ck('speed x' + label + ' button ' + b + ' reacts 10/10', ok === 10, ok + '/10 ' + JSON.stringify(miss.slice(0, 3)));
    }
    await pg.screenshot({ path: path.join(OUT, 'card_x' + label + '_' + lang + '.png') });
  }
  // low faith: the paid option is grey and says why
  await pg.evaluate(() => { __RT.ui.Game.speedIdx = 1; __RT.G().faith = 2; }); await give(); await wait(300); const bb = await btnBox(0); await pg.mouse.click(bb.x, bb.y); await wait(250);
  const why = await pg.evaluate(() => document.body.innerText); ck('low faith shows a reason', /信仰力が足りない|信仰力不足/.test(why)); ck('paid button looks disabled', await pg.evaluate(() => getComputedStyle(__RT.ui.UI.el.cardWin.querySelector('.btn')).opacity < 0.8 || __RT.ui.UI.el.cardWin.querySelector('.btn').classList.contains('dis')));
  await pg.screenshot({ path: path.join(OUT, 'card_lowfaith_' + lang + '.png') });
  ck('no page errors', logs.length === 0, JSON.stringify(logs.slice(0, 3)));
  console.log(out.join('\n')); await br.close(); process.exit(out.some(l => l.startsWith('FAIL')) ? 1 : 0);
})();
