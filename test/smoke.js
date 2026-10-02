const puppeteer = require('puppeteer-core');
const path = require('path');
const URL = 'file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/');
const lang = process.argv[2] || 'ja';
const out = [];
(async () => {
  const br = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', args: ['--autoplay-policy=no-user-gesture-required', '--no-sandbox', '--window-size=1280,720'] });
  const pg = await br.newPage(); await pg.setViewport({ width: 1280, height: 720 });
  const logs = [], reqs = [];
  pg.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') logs.push(m.type() + ': ' + m.text()); });
  pg.on('pageerror', e => logs.push('pageerror: ' + e.message));
  pg.on('request', r => { if (!r.url().startsWith('file:') && !r.url().startsWith('data:')) reqs.push(r.url()); });
  await pg.evaluateOnNewDocument(l => { try { localStorage.setItem('rinne_tenbin_v1_settings', JSON.stringify({ bgm: 0.6, se: 0.7, speed: 1, text: 3, lang: l, tutDone: true, autoSlow: false, advisor: false })); } catch (e) { } }, lang);
  await pg.goto(URL); await new Promise(r => setTimeout(r, 700));
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const shot = async n => { await pg.screenshot({ path: path.join(__dirname, 'shots', lang + '_' + n + '.png') }); };
  const ev = f => pg.evaluate(f);
  const clickBtn = txt => pg.evaluate(t => { const els = Array.from(document.querySelectorAll('#modal .btn,#modal .card,#ui .btn')); const e = els.find(x => x.textContent.indexOf(t) >= 0 && x.offsetParent !== null); if (e) { e.click(); return true; } return false; }, txt);
  const key = async k => { await pg.keyboard.press(k); await wait(120); };
  const state = () => ev(() => ({ scene: __RT.ui.Game.scene, modals: __RT.ui.Game.modals.join(','), tick: __RT.G().tick, faith: Math.round(__RT.G().faith), casts: __RT.G().stats.casts }));
  const ck = async (name, cond, extra) => { out.push((cond ? 'PASS ' : 'FAIL ') + name + (extra ? ' ' + extra : '')); };
  await pg.mouse.click(640, 360); await wait(500);
  let s = await state(); await ck('title scene', s.scene === 'title');
  await shot('01_title');
  await ev(() => document.querySelectorAll('.btn.big')[0].click()); await wait(300); s = await state(); await ck('god select', s.scene === 'godsel');
  await shot('02_god');
  await key('1'); await wait(600); s = await state(); await ck('opening via key 1', s.scene === 'opening');
  await pg.mouse.click(640, 300); await wait(200); await pg.mouse.click(640, 300); await wait(300); await shot('03_opening');
  await key('Escape'); await wait(800); s = await state(); await ck('play after skip', s.scene === 'play');
  // keys
  await key('h'); s = await state(); await ck('H opens chron', s.modals === 'chron'); await shot('05_chron'); await key('Escape');
  await key('r'); s = await state(); await ck('R opens residents', s.modals === 'residents'); await shot('06_res'); await key('Escape');
  await key('s'); s = await state(); await ck('S opens souls', s.modals === 'souls'); await shot('07_souls'); await key('Escape');
  await key('g'); s = await state(); await ck('G opens counsel', s.modals === 'counsel'); await key('Escape');
  s = await state(); await ck('modals closed', s.modals === '');
  await key('Escape'); s = await state(); await ck('Esc opens pause', s.modals === 'pause'); await shot('09_pause'); await key('Escape');
  await key(' '); const t0 = (await state()).tick; const pz = await ev(() => __RT.ui.Game.paused); await wait(600); const t1 = (await state()).tick; await ck('Space pauses', pz && t1 === t0); await key(' ');
  await key('e'); await key('e'); let sp = await ev(() => __RT.ui.Game.speedIdx); await ck('E speeds up', sp === 3); await key('q'); sp = await ev(() => __RT.ui.Game.speedIdx); await ck('Q slows', sp === 2);
  await key('m'); let mu = await ev(() => __RT.ui.Snd.muted); await ck('M mutes', mu === true); await key('m');
  await key('n');
  // run until prayers
  await ev(() => { __RT.ui.Game.speedIdx = 3; }); for (let i = 0; i < 40; i++) { await wait(500); if (await ev(() => document.querySelectorAll('#ui .card').length > 0)) break; }
  await ev(() => { __RT.ui.Game.speedIdx = 1; });
  const np = await ev(() => __RT.G().prayers.filter(p => p.state === 'open').length); await ck('prayers appear', np > 0, np + '');
  // click first prayer card
  console.log('dbg', JSON.stringify(await ev(() => ({np: __RT.G().prayers.filter(p=>p.state==='open').length, cards: document.querySelectorAll('#ui .card').length, scene: __RT.ui.Game.scene, tick: __RT.G().tick, modals: __RT.ui.Game.modals, paused: __RT.ui.Game.paused, speed: __RT.ui.Game.speedIdx})))); await ev(() => document.querySelector('#ui .card').click()); await wait(300);
  const sel = await ev(() => __RT.ui.Game.selId); await ck('prayer card selects resident', sel > 0);
  await shot('04_play_sel');
  await wait(1200); const f0 = (await state()).faith; await key('1'); const pw = await ev(() => __RT.ui.Game.power); await ck('key 1 selects oracle', pw === 'oracle');
  // click on resident on canvas
  const pos = await ev(() => { const h = __RT.G().idx[__RT.ui.Game.selId]; const R = __RT.ui.Render; return { x: (h.x * 16 + 8 - R.cam.x) * 2, y: (h.y * 16 - 2 - R.cam.y) * 2 }; });
  if (pos.x > 0 && pos.x < 1270 && pos.y > 0 && pos.y < 710) { await pg.mouse.click(pos.x, pos.y); await wait(300); s = await state(); await ck('oracle menu open', s.modals === 'menu'); await shot('08_menu');
    await clickBtn(lang === 'ja' ? '勇気' : '勇氣'); await wait(300); s = await state(); await ck('oracle cast', s.casts === 1, 'faith ' + f0 + '->' + s.faith); await shot('10_cast'); }
  else out.push('SKIP click (target offscreen ' + JSON.stringify(pos) + ')');
  // save/load roundtrip
  await key('Escape'); await clickBtn(lang === 'ja' ? 'セーブ' : '存檔'); await wait(200); await ev(() => Array.from(document.querySelectorAll('#modal .card'))[0].click()); await wait(300);
  const saved = await ev(() => !!localStorage.getItem('rinne_tenbin_v1_slot1')); await ck('manual save slot1', saved);
  const before = await ev(() => JSON.stringify({ t: __RT.G().tick, f: Math.round(__RT.G().faith * 10), n: __RT.G().humans.length }));
  await ev(() => __RT.ui.Screens.closeAll());
  await ev(() => { __RT.ui.Game.speedIdx = 3; }); await wait(1500); await ev(() => { __RT.ui.Game.speedIdx = 1; __RT.ui.Game.paused = true; });
  await ev(() => __RT.ui.Game.loadSlot(1)); await wait(300);
  const after = await ev(() => JSON.stringify({ t: __RT.G().tick, f: Math.round(__RT.G().faith * 10), n: __RT.G().humans.length }));
  { const b = JSON.parse(before), a = JSON.parse(after); await ck('load restores state', Math.abs(a.t - b.t) < 30 && a.n === b.n && Math.abs(a.f - b.f) < 30, before + ' vs ' + after); }
  await shot('11_afterload');
  // eye
  await key('x'); const pe = await ev(() => __RT.ui.Game.power); await ck('X eye mode', pe === 'eye'); await key('Escape'); 
  // speed buttons
  await clickBtn('×64'); sp = await ev(() => __RT.ui.Game.speedIdx); await ck('speed button ×64', sp === 3);
  await ev(() => { __RT.ui.Game.speedIdx = 1; });
  // zoom screenshots after longer run
  await ev(() => { __RT.ui.Game.speedIdx = 3; }); await wait(12000); await ev(() => { __RT.ui.Game.speedIdx = 1; });
  await shot('12_later');
  console.log(out.join('\n'));
  console.log('state', JSON.stringify(await ev(() => __RT.state())).slice(0, 300));
  console.log('errors:', JSON.stringify(await ev(() => __RT.errors())), 'logs:', JSON.stringify(logs), 'requests:', JSON.stringify(reqs));
  await br.close();
})().catch(e => { console.log(out.join(String.fromCharCode(10))); console.error('FAIL', e && e.stack ? e.stack.split(String.fromCharCode(10)).slice(0, 4).join(String.fromCharCode(10)) : e); process.exit(1); });
