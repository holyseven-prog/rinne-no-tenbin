/* drag-to-pan E2E (V3.3 §1) */
const puppeteer = require('puppeteer-core'); const path = require('path'), fs = require('fs');
const URL = 'file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/');
const CHROME = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find(p => fs.existsSync(p));
const out = []; const ck = (n, c, x) => out.push((c ? 'PASS ' : 'FAIL ') + n + (x ? ' ' + x : '')); const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const br = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--window-size=1280,720'] }); const pg = await br.newPage(); await pg.setViewport({ width: 1280, height: 720 });
  const logs = []; pg.on('pageerror', e => logs.push(e.message));
  await pg.evaluateOnNewDocument(() => { try { localStorage.setItem('rinne_tenbin_v1_settings', JSON.stringify({ bgm: 0, se: 0, speed: 0, text: 3, lang: 'ja', names: 'key', theme: 'black', autoSlow: false, advisor: false, tutDone: true })); } catch (e) { } });
  await pg.goto(URL); await wait(600); await pg.mouse.click(640, 360); await wait(300);
  await pg.evaluate(() => { __RT.ui.Game.pendingGod = 'mercy'; __RT.ui.Screens.opEnd(); }); await wait(900);
  const cam = () => pg.evaluate(() => ({ x: __RT.ui.Render.cam.x, y: __RT.ui.Render.cam.y })); const sel = () => pg.evaluate(() => __RT.ui.Game.selId);
  await pg.evaluate(() => { __RT.ui.Game.paused = true; __RT.ui.Render.cam.x = 100; __RT.ui.Render.cam.y = 150; __RT.ui.Game.follow = 0; }); await wait(200);
  // empty-ish spot: find a point with no entity
  const spot = await pg.evaluate(() => { const R = __RT.ui.Render; for (let y = 120; y < 600; y += 20) for (let x = 300; x < 1000; x += 20) { if (!pickEntityAt(R.cam.x + x / 2, R.cam.y + y / 2)) return { x, y }; } return { x: 800, y: 400 }; });
  const c0 = await cam(); const s0 = await sel();
  await pg.mouse.move(800, 400); await pg.mouse.down(); await pg.mouse.move(650, 350, { steps: 5 }); await pg.mouse.move(500, 300, { steps: 5 }); const mid = await pg.evaluate(() => document.getElementById('game').style.cursor); await pg.mouse.up(); await wait(150);
  const c1 = await cam(); ck('1 drag moves camera by (+150,+50)', Math.abs(c1.x - c0.x - 150) < 1 && Math.abs(c1.y - c0.y - 50) < 1, JSON.stringify({ dx: c1.x - c0.x, dy: c1.y - c0.y })); ck('1 selection unchanged', (await sel()) === s0); ck('  cursor grabbing during drag', mid === 'grabbing', mid);
  // 2: tiny move click selects a human
  const hp = await pg.evaluate(() => { const G = __RT.G(), R = __RT.ui.Render; const h = G.humans.find(x => x.alive && !x.inside && x.age >= 16); if (h) R.centerOn(h.x, h.y); return h ? { id: h.id, x: (h.x * 16 + 8 - R.cam.x) * 2, y: (h.y * 16 - 2 - R.cam.y) * 2 } : null; });
  if (hp) { await pg.mouse.move(hp.x, hp.y); await pg.mouse.down(); await pg.mouse.move(hp.x + 2, hp.y + 1); await pg.mouse.up(); await wait(150); ck('2 click (<4px move) still selects', (await sel()) === hp.id); } else ck('2 click selects (no human found)', false);
  // 3: power selected + drag does not cast
  await pg.evaluate(() => { __RT.ui.Game.selId = 0; __RT.ui.Render.sel = 0; __RT.G().faith = 100; __RT.ui.Game.power = 'grace'; }); const casts0 = await pg.evaluate(() => __RT.G().stats.casts);
  const hp2 = await pg.evaluate(() => { const G = __RT.G(), R = __RT.ui.Render; const h = G.humans.find(x => x.alive && !x.inside && (x.x * 16 + 8 - R.cam.x) * 2 > 300 && (x.x * 16 + 8 - R.cam.x) * 2 < 1000 && (x.y * 16 - R.cam.y) * 2 > 120 && (x.y * 16 - R.cam.y) * 2 < 560); return h ? { x: (h.x * 16 + 8 - R.cam.x) * 2, y: (h.y * 16 - 2 - R.cam.y) * 2 } : null; });
  if (hp2) { await pg.mouse.move(hp2.x, hp2.y); await pg.mouse.down(); await pg.mouse.move(hp2.x - 80, hp2.y + 30, { steps: 4 }); await pg.mouse.up(); await wait(200); }
  ck('3 drag with power selected does not cast', (await pg.evaluate(() => __RT.G().stats.casts)) === casts0 && (await pg.evaluate(() => __RT.ui.Game.modals.length)) === 0); await pg.evaluate(() => { __RT.ui.Game.power = null; });
  // 4: clamp
  await pg.mouse.move(100, 100); await pg.mouse.down(); await pg.mouse.move(1200, 700, { steps: 6 }); await pg.mouse.move(1270, 715, { steps: 2 }); await pg.mouse.up(); await wait(100);
  for (let i = 0; i < 3; i++) { await pg.mouse.move(100, 100); await pg.mouse.down(); await pg.mouse.move(1250, 700, { steps: 4 }); await pg.mouse.up(); }
  const c4 = await cam(); ck('4 clamped at map edge', c4.x >= 0 && c4.y >= 0 && c4.x <= 64 * 16 - 640 && c4.y <= 40 * 16 - 360, JSON.stringify(c4));
  // 5: release outside window
  const c5a = await cam(); await pg.mouse.move(600, 300); await pg.mouse.down(); await pg.mouse.move(700, 350, { steps: 3 });
  await pg.evaluate(() => window.dispatchEvent(new MouseEvent('mouseup', { button: 0, clientX: -50, clientY: -50, bubbles: true }))); await wait(100);
  ck('5 drag state ends after release outside', await pg.evaluate(() => !__RT.ui.Game.drag)); await pg.mouse.up();
  // wheel pans
  const c6a = await cam(); await pg.mouse.move(640, 360); await pg.mouse.wheel({ deltaX: 40, deltaY: 40 }); await wait(100); const c6b = await cam(); ck('wheel/two-finger pans', Math.abs(c6b.x - c6a.x) > 1 || Math.abs(c6b.y - c6a.y) > 1);
  console.log(out.join('\n')); console.log('errors', JSON.stringify(logs)); await br.close(); process.exit(out.some(l => l.startsWith('FAIL')) || logs.length ? 1 : 0);
})().catch(e => { console.log(out.join('\n')); console.error('FAIL', e.stack); process.exit(1); });
