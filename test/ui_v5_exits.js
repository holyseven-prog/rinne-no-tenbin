/* SEVEN 2026-11-25: every window has a way out (× or its own close), every message goes away by itself.
   Opens each in-game window and checks for a visible ×; checks toast (3 s), era-card result (10 s), hint bubble (12 s), resident panel ×,
   display menu ×. node test/ui_v5_exits.js [ja|zh] */
const puppeteer = require('puppeteer-core'); const path = require('path'), fs = require('fs');
const CHROME = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find(p => fs.existsSync(p));
const lang = process.argv[2] || 'ja'; const out = []; const ck = (n, c, x) => out.push((c ? 'PASS ' : 'FAIL ') + n + (x !== undefined ? ' ' + x : '')); const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => { const br = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] }); const pg = await br.newPage(); await pg.setViewport({ width: 1280, height: 720 });
  const logs = []; pg.on('pageerror', e => logs.push(e.message));
  await pg.evaluateOnNewDocument(l => { try { localStorage.setItem('rinne_tenbin_v1_settings', JSON.stringify({ bgm: 0, se: 0, lang: l, tutDone: true, advisor: false, hintsSeen: { duty: 1, skip: 1, listen: 1, godlv: 1, awe: 1, adv: 1 } })); } catch (e) { } }, lang);
  await pg.goto('file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/')); await wait(1500);
  await pg.evaluate(() => { __RT.ui.Game.pendingGod = 'mercy'; __RT.ui.Screens.opEnd(); }); await wait(1200);
  await pg.evaluate(() => { const G = __RT.G(); if (G.council && !G.council.done) closeCouncil(G.council.offer.slice(0, 2), null); __RT.ui.Screens.closeAll(); __RT.ui.Game.paused = true; });
  /* every closable window: a visible × that closes it */
  const wins = { pause: 'Screens.pause()', faith: 'v5FaithModal()', worldmap: 'v5MapModal()', defense: 'Screens.defense()', residents: 'Screens.residents()', chronicle: 'Screens.chronicle()', souls: 'Screens.souls()', counsel: 'Screens.counsel()',
    help: 'Screens.help()', glossary: 'Screens.glossary()', evlog: 'Screens.eventLog()', helpmenu: 'Screens.helpMenu()', eye: '(__RT.G().eye = 3, Screens.eyeOn(__RT.G().humans.find(h => h.alive && h.age > 16).id))', confirm: "Screens.confirm('?', () => {})", menu: "Screens.menu([['a', () => {}]], 't')" };
  for (const k in wins) { const ok = await pg.evaluate(js => { __RT.ui.Screens.closeAll(); try { eval(js); } catch (e) { return 'err ' + e.message; } if (!__RT.ui.Screens.stack.length) return 'not opened'; const m = document.getElementById('modal');
      const x = Array.from(m.querySelectorAll('.v5close,.v5x')).find(b => b.offsetParent); if (!x) return 'no ×'; const r = x.getBoundingClientRect(); const e = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); if (!(e === x || x.contains(e))) return '× covered'; x.click(); return __RT.ui.Screens.stack.length === 0 ? 'ok' : 'still open'; }, wins[k]);
    await wait(60); ck('window ' + k + ' has a working ×', ok === 'ok', ok); }
  /* display menu × */
  await pg.evaluate(() => UI.el.v5dispBtn.click()); await wait(100); await pg.evaluate(() => document.querySelector('#v5disp .v5dx').click()); await wait(100); ck('display menu has a working ×', await pg.evaluate(() => document.getElementById('v5disp').classList.contains('v5hide')));
  /* resident panel × (44 px) */
  const sel = await pg.evaluate(() => { const hh = __RT.G().humans.find(h => h.alive && !h.inside); __RT.ui.Game.selId = hh.id; UI.refresh(true); const b = document.querySelector('.v5sel>div:first-child>.btn'); if (!b) return 'no ×'; const s = document.getElementById('stage').getBoundingClientRect().width / 1280; const hgt = b.getBoundingClientRect().height / s; b.click(); UI.refresh(true); return hgt >= 43.5 && !__RT.ui.Game.selId ? 'ok' : 'h=' + hgt; });
  ck('resident panel has a 44 px × that closes it', sel === 'ok', sel);
  /* toast */
  await pg.evaluate(() => UI.toast('test')); await wait(3400); ck('a notification closes by itself (3 s)', await pg.evaluate(() => document.getElementById('v5toast').classList.contains('v5hide')));
  /* era card result */
  await pg.evaluate(() => { const G = __RT.G(); G.faith = 100; G.cards = [{ id: 'caravan', t: G.tick, n: G.nid++ }]; __RT.ui.UI.cardSig = ''; UI.rTab('pray', true); UI.refresh(true); }); await wait(150);
  await pg.evaluate(() => { const b = document.querySelector('#v5list .ecard .btn'); b.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, button: 0 })); }); await wait(200);
  ck('era-card result shown', await pg.evaluate(() => document.querySelector('#v5list .ecard').offsetParent !== null && !(__RT.G().cards || []).length));
  await wait(10600); await pg.evaluate(() => UI.refresh(true)); ck('era-card result closes by itself (10 s)', await pg.evaluate(() => document.querySelector('#v5list .ecard').offsetParent === null));
  /* hint bubble */
  await pg.evaluate(() => { __RT.ui.Game.paused = true; const G = __RT.G(); G.cards = [{ id: 'rumor', t: G.tick, n: G.nid++ }]; __RT.ui.UI.cardSig = ''; UI.refresh(true); }); await wait(300); await pg.evaluate(() => UI.refresh(true)); await wait(200);
  const hb = await pg.evaluate(() => !!(UI.hintEl && UI.hintEl.isConnected)); ck('a hint bubble appears (era card hint)', hb);
  if (hb) { ck('hint bubble has a ×', await pg.evaluate(() => Array.from(UI.hintEl.querySelectorAll('.btn')).some(b => b.textContent === '✕'))); await wait(12500); ck('hint bubble closes by itself (12 s)', await pg.evaluate(() => !(UI.hintEl && UI.hintEl.isConnected))); }
  ck('no page errors', logs.length === 0, JSON.stringify(logs.slice(0, 3))); ck('no ERRS', await pg.evaluate(() => ERRS.length === 0), await pg.evaluate(() => JSON.stringify(ERRS.slice(0, 3))));
  console.log(out.join('\n')); await br.close(); process.exit(out.some(l => l.startsWith('FAIL')) ? 1 : 0); })();
