/* ================= main: scale, input, loop, save, boot ================= */
const Scale = {
  s: 1,
  w: 0, h: 0,
  fit() { const iw = window.innerWidth, ih = window.innerHeight; this.w = iw; this.h = ih; const s = Math.min(iw / 1280, ih / 720); this.s = s; $('stage').style.transform = `translate(${(iw - 1280 * s) / 2}px,${(ih - 720 * s) / 2}px) scale(${s})`; },
  toStage(e) { const r = $('stage').getBoundingClientRect(); return { x: (e.clientX - r.left) / this.s, y: (e.clientY - r.top) / this.s }; },
};
const Save = {
  key: n => 'rinne_tenbin_v1_slot' + n,
  write(n) {
    try {
      G.events = G.events.slice(-260);
      const str = serializeState(); Store.set(this.key(n), str);
      Store.set(this.key(n) + '_meta', JSON.stringify({ text: dateStr(G.tick, G.gen) + ' / ' + GODS.find(g => g.id === G.god).n[li()] + ' / ' + (G.stats.alive || 0) + '人', real: Date.now() }));
    } catch (e) { ERRS.push('save:' + e.message); }
  },
  meta(n) { const m = Store.get(this.key(n) + '_meta'); if (!m || !Store.get(this.key(n))) return null; try { return JSON.parse(m); } catch (e) { return null; } },
  read(n) { return Store.get(this.key(n)); },
};
function attachHooks() {
  G.fx = G.fx || []; G.fxOn = true; Render.parts.length = 0; Render.nums.length = 0;
  G.onEvent = ev => {
    const l = evLine(ev);
    if (l && (ev.tension >= 0.5 || ['death', 'birth', 'marriage', 'promotion', 'reincarnation'].indexOf(ev.type) >= 0)) UI.pushFeed(l, ev.tension >= 0.8 ? '#ffb8a0' : (ev.type === 'birth' || ev.type === 'marriage') ? '#a8ffc0' : '#ffffff', ev.pos, ev.tension >= 0.8);
    if (['death', 'siege', 'boss_sortie', 'destined_reunion'].indexOf(ev.type) >= 0 || (ev.type === 'monster_raid' && ev.payload.cad >= 0)) { const a = ev.actors[0] && G.idx[ev.actors[0]]; if (ev.type !== 'death' || (a && (soulOf(a).fav || G.spot.indexOf(a.id) >= 0 || G.track.indexOf(a.id) >= 0 || isAdv(a)))) Game.autoSlow(); }
    if (ev.type === 'monster_raid' || ev.type === 'siege') { Snd.se('hit'); Render.shake = 3; }
    if (ev.type === 'promotion') Snd.se('level');
  };
  G.onPrayer = p => { Snd.se('pray'); UI.lastPray = ''; if (p.urg > 0.8 && G.tick > START_TICK + 3 * TICK_DAY) Game.autoSlow(); };
  G.onPrayerEnd = p => { UI.lastPray = ''; };
  G.onOverflow = () => { if (G.tick - (UI.lastOver || -9999) > 3 * TICK_DAY) { UI.lastOver = G.tick; UI.pushFeed(t('faith_over'), '#ffe9a0', null, false); } };
  G.onReincarnate = (hh, s) => { Snd.se('reincarnate'); UI.lastFav = ''; };
  G.onDeath = hh => { UI.lastFav = ''; };
  G.onChapter = ch => { if (ch.no > 1) { UI.pushFeed(t('new_chapter') + '：' + renderChapter(ch).title, '#ffe9a0', null, false); Snd.se('page'); } };
  G.onEnd = e => { Screens.ending(); };
  G.onAwaken = () => { Game.cutscene(); };
}
function pickBgm() {
  if (!G || G.ending) return null; const hh = hourOf(G.tick);
  if (G.bossFight) return 'decisive';
  if (G.awakened) return (G.raidAlive > 0 || G.townAlert > 0) ? 'battle' : 'boss_awake';
  if (G.raidAlive > 0) return 'battle';
  return (hh >= 6 && hh < 19) ? 'town_day' : 'town_night';
}
Object.assign(Game, {
  last: 0, hudT: 0, bgmT: 0, saveT: 0, miniT: 0, noteIdx: 0, lastDay: 0,
  loadSettings() {
    try { const s = Store.get('rinne_tenbin_v1_settings'); if (s) Object.assign(this.settings, JSON.parse(s)); } catch (e) { }
    LANG = this.settings.lang === 'zh' ? 'zh' : 'ja'; document.documentElement.lang = LANG === 'ja' ? 'ja' : 'zh-TW';
    Snd.vol.bgm = this.settings.bgm; Snd.vol.se = this.settings.se; this.speedIdx = clamp(this.settings.speed, 0, 3); this.applyTheme();
  },
  saveSettings() { this.settings.lang = LANG; Store.set('rinne_tenbin_v1_settings', JSON.stringify(this.settings)); },
  setLang(l) {
    LANG = l; document.documentElement.lang = l === 'ja' ? 'ja' : 'zh-TW'; document.title = t('title'); this.saveSettings();
    if (this.scene === 'title') Screens.title(); else if (this.scene === 'godsel') Screens.godSelect(); else if (this.scene === 'boot') Screens.boot();
    else if (this.scene === 'play' || this.scene === 'ending') { UI.build(); UI.resId = 0; }
    Screens.rerender();
  },
  startFromBoot() { Snd.unlock(); Snd.playSong('title'); Screens.title(); },
  demo() { newGame({ seed: 20240601, god: 'mercy', lang: LANG }); G.fxOn = true; G.fx = []; G.tick = START_TICK + TICK_DAY * 2 + 6 * 12; for (let i = 0; i < 300; i++) tick(); Render.cam.x = 17 * TS; Render.cam.y = 8 * TS; Game.demoMode = true; },
  beginPlay(godId, gen) {
    Screens.closeAll(); Screens.clearScr();
    newGame({ god: godId, seed: (Date.now() ^ (Math.random() * 1e9)) & 0xffffff, lang: LANG, gen: gen || 1 }); Game.afterNew(!gen || gen === 1);
  },
  applyTheme() { document.body.classList.toggle('theme-blue', this.settings.theme === 'blue'); document.body.classList.toggle('theme-black', this.settings.theme !== 'blue'); },
  afterNew(isNew) {
    attachHooks(); this.applyTheme(); Game.demoMode = false; Game.scene = 'play'; Game.paused = false; Game.selId = 0; Render.sel = 0; Game.power = null; Game.follow = 0; Game.speedIdx = clamp(Game.settings.speed, 0, 3); Game.acc = 0; Game.lastDay = dayIdx(G.tick);
    Screens.closeAll(); Screens.clearScr(); UI.show(true); UI.build(); UI.resId = 0; Render.centerOn(PLAZA.x, PLAZA.y - 2);
    Snd.playSong('town_day'); Game.bgmName = 'town_day'; Game.tut = null; $('tut').style.display = 'none';
    if (isNew === true && !Game.settings.tutDone) setTimeout(() => Tut.start(), 300);
  },
  nextGen() { Game.beginPlay(G.god, G.gen + 1); },
  toTitle() { Game.scene = 'title'; Snd.stopSong(0.6); Game.demo(); Snd.playSong('title'); Screens.title(); UI.show(false); },
  loadSlot(n) {
    const str = Save.read(n); if (!str) { UI.toast(t('no_slot')); return; }
    try { deserializeState(str); Screens.closeAll(); Screens.clearScr(); G.fx = []; Game.afterNew(); UI.toast(t('loaded')); }
    catch (e) { ERRS.push('load:' + e.message); UI.toast('Load error'); Game.toTitle(); }
  },
  cutscene() {
    Snd.se('awaken'); Render.shake = 8; Render.centerOn(58, 14); Snd.stopSong(0.5);
    Screens.push('cutscene', () => h('div', { style: 'position:absolute;inset:0;background:rgba(10,0,20,.86);display:flex;flex-direction:column;align-items:center;justify-content:center;animation:fd 1.2s' }, h('div', { style: 'font-size:46px;font-weight:bold;color:#e0a0ff;text-shadow:0 0 20px #a040ff,3px 3px 0 #000;letter-spacing:6px' }, t('cut_awaken')), h('div', { style: 'margin-top:20px;color:#ffe9a0;font-size:20px' }, t('awaken_msg'))), () => true, { clear: false });
    setTimeout(() => { if (Screens.stack.some(s => s.name === 'cutscene')) { Screens.stack = Screens.stack.filter(s => s.name !== 'cutscene'); Screens.render(); } Game.bgmName = ''; }, 4200);
  },
  frame(dt) {
    const sc = this.scene; const c = Render.c;
    this.fitT = (this.fitT || 0) + dt; if (this.fitT > 0.5) { this.fitT = 0; if (window.innerWidth !== Scale.w || window.innerHeight !== Scale.h) Scale.fit(); }
    if (sc !== 'play' && sc !== 'ending' && !this.labelsCleared) { this.labelsCleared = true; const lc = $('labels'); if (lc) lc.getContext('2d').clearRect(0, 0, 1280, 720); } else if (sc === 'play') this.labelsCleared = false;
    if (sc === 'boot') { c.fillStyle = '#000'; c.fillRect(0, 0, 640, 360); return; }
    if (sc === 'opening') { drawOpening(c, this.op, dt); return; }
    if (!G) return;
    if (sc === 'title' || sc === 'godsel') {
      this.acc += dt * TPS1 * 4; let n = 0; while (this.acc >= 1 && n < 20) { if (!G.ending) tick(); this.acc -= 1; n++; } if (this.acc > 1) this.acc = 0;
      Render.cam.x = 17 * TS + 40 + Math.sin(performance.now() / 9000) * 40; Render.cam.y = 8 * TS + 20; Render.clampCam(); Render.draw(this.acc, {}); return;
    }
    // play / ending
    const stopped = this.timeStopped || document.hidden;
    if (!stopped && !G.ending) {
      this.acc += dt * TPS1 * SPEEDS[this.speedIdx]; let n = 0; while (this.acc >= 1 && n < 32 && !G.ending) { tick(); this.acc -= 1; n++; } if (this.acc >= 1) this.acc = 0;
    }
    // camera
    const sp = 260 * dt; let moved = false; const K = this.keys;
    if (sc === 'play' && !Game.modals.length) {
      if (K.a || K.ArrowLeft) { Render.cam.x -= sp; moved = true; } if (K.d || K.ArrowRight) { Render.cam.x += sp; moved = true; } if (K.w || K.ArrowUp) { Render.cam.y -= sp; moved = true; } if (K.s || K.ArrowDown) { Render.cam.y += sp; moved = true; }
      if (this.mouseCanvas && !moved) { const m = this.mouse; if (m.x < 6) { Render.cam.x -= sp; moved = true; } if (m.x > 1274) { Render.cam.x += sp; moved = true; } if (m.y < 4) { Render.cam.y -= sp; moved = true; } if (m.y > 716) { Render.cam.y += sp; moved = true; } }
    }
    if (moved) this.follow = 0;
    if (this.follow) { const e = G.idx[this.follow]; if (e && e.alive) { Render.cam.x += (e.x * TS + 8 - 320 - Render.cam.x) * Math.min(1, dt * 5); Render.cam.y += (e.y * TS - 180 - Render.cam.y) * Math.min(1, dt * 5); if (Math.abs(e.x * TS + 8 - 320 - Render.cam.x) < 2) { } } else this.follow = 0; }
    Render.clampCam(); Render.draw(stopped ? 0 : this.acc, {});
    if (sc === 'play' || sc === 'ending') { if (this.mouseCanvas && !Game.modals.length) { const wx = Render.cam.x + this.mouse.x / 2, wy = Render.cam.y + this.mouse.y / 2; const hv = pickEntityAt(wx, wy); this.hoverId = hv ? hv.id : 0; } else this.hoverId = 0; Render.drawLabels(); }
    const now = performance.now();
    this.miniT += dt; if (this.miniT > 0.12 && UI.el.miniCv) { this.miniT = 0; Mini.draw(UI.el.miniCv, Render.cam.x, Render.cam.y); }
    this.hudT += dt; if (this.hudT > 0.16) { this.hudT = 0; UI.refresh(); if (this.tut) this.tut.update(); }
    if (sc === 'play' && !stopped && dayIdx(G.tick) !== this.advDayChecked) { this.advDayChecked = dayIdx(G.tick); this.advisorTick(); }
    UI.tickToasts(now);
    this.bgmT += dt; if (this.bgmT > 1) { this.bgmT = 0; const b = pickBgm(); if (b && b !== this.bgmName && now > (this.divineUntil || 0) && !Screens.stack.some(s => s.name === 'cutscene')) { this.bgmName = b; Snd.playSong(b); } }
    if (sc === 'play' && dayIdx(G.tick) !== this.lastDay) { this.lastDay = dayIdx(G.tick); if (now - this.saveT > 8000) { this.saveT = now; Save.write(0); } }
  },
  nextNotable() {
    const evs = G.events.filter(e => e.pos && e.tension >= 0.5 && G.tick - e.t < 4 * TICK_DAY); if (!evs.length) return;
    this.noteIdx = (this.noteIdx + 1) % evs.length; const e = evs[evs.length - 1 - this.noteIdx % evs.length]; this.follow = 0; Render.centerOn(e.pos.x, e.pos.y); Render.rings.push({ x: e.pos.x * TS + 8, y: e.pos.y * TS + 8, r: 4, life: 14, col: '#ffe060' }); Snd.se('cursor');
    const l = evLine(e); if (l) UI.toast('▶ ' + l, '#ffe9a0');
  },
});

/* ---------- input ---------- */
function onKeyDown(e) {
  Snd.unlock();
  const k = e.key; const kl = k.length === 1 ? k.toLowerCase() : k;
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if (Game.scene === 'boot') { e.preventDefault(); Game.startFromBoot(); return; }
  if (kl === 'm' && Game.scene !== 'boot') { Snd.setMuted(!Snd.muted); UI.toast(Snd.muted ? t('mute') + ' ON' : t('mute') + ' OFF'); return; }
  if (kl === 'f') { try { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen(); } catch (er) { } return; }
  if (Screens.stack.length) { if (Screens.key(e)) { e.preventDefault(); return; } }
  if (Game.scene === 'opening') { if (k === ' ' || k === 'Enter') { e.preventDefault(); Screens.opAdvance(); } else if (k === 'Escape') Screens.opEnd(); return; }
  if (Game.scene === 'godsel') { if (['1', '2', '3'].indexOf(k) >= 0) { Game.pendingGod = GODS[+k - 1].id; Screens.opening(); } else if (k === 'Escape') Screens.title(); return; }
  if (Game.scene === 'title') return;
  if (Game.scene === 'ending') return;
  Game.keys[kl] = true; Game.keys[k] = true;
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].indexOf(k) >= 0) e.preventDefault();
  switch (kl) {
    case 'Escape': if (Game.power) { Game.power = null; UI.refresh(true); } else Screens.pause(); break;
    case ' ': Game.paused = !Game.paused; UI.refresh(true); break;
    case 'q': Game.speedIdx = Math.max(0, Game.speedIdx - 1); Game.paused = false; UI.refresh(true); break;
    case 'e': Game.speedIdx = Math.min(3, Game.speedIdx + 1); Game.paused = false; UI.refresh(true); break;
    case '1': case '2': case '3': case '4': case '5': selectPower(+kl - 1); break;
    case 'x': if (G.eye > 0) { Game.power = Game.power === 'eye' ? null : 'eye'; UI.refresh(true); } break;
    case 'h': Screens.chronicle(); break;
    case 'r': Screens.residents(); break;
    case 's': if (!e.shiftKey || true) Screens.souls(); break;
    case 'g': Screens.counsel(); break;
    case 'n': if (!e.repeat) Game.nextNotable(); break;
  }
}
function onKeyUp(e) { const k = e.key; Game.keys[k] = false; if (k.length === 1) Game.keys[k.toLowerCase()] = false; }
function onCanvasDown(e) {
  Snd.unlock(); if (Game.scene !== 'play' || Game.modals.length) return;
  const p = Scale.toStage(e);
  if (e.button === 2) { e.preventDefault(); if (Game.power) { Game.power = null; UI.refresh(true); } return; }
  const wx = Render.cam.x + p.x / 2, wy = Render.cam.y + p.y / 2; const hh = pickEntityAt(wx, wy);
  Game.mouse = p;
  if (hh) {
    if (Game.power === 'eye') { Screens.eyeOn(hh.id); return; }
    if (Game.power) { Game.selId = hh.id; Render.sel = hh.id; castOn(Game.power, hh.id); return; }
    Game.selId = hh.id; Render.sel = hh.id; Game.follow = 0; UI.lastPray = ''; UI.refresh(true); Snd.se('cursor');
  } else if (!Game.power) { Game.selId = 0; Render.sel = 0; UI.refresh(true); }
}
function boot() {
  Scale.fit(); window.addEventListener('resize', () => Scale.fit());
  const cv = $('game'); Render.init(cv); Screens.init(); Game.loadSettings(); document.title = t('title');
  document.addEventListener('keydown', onKeyDown); document.addEventListener('keyup', onKeyUp);
  window.addEventListener('blur', () => { Game.keys = {}; });
  cv.addEventListener('mousedown', onCanvasDown); cv.addEventListener('contextmenu', e => e.preventDefault());
  $('stage').addEventListener('mousemove', e => { Game.mouse = Scale.toStage(e); Game.mouseCanvas = e.target === cv; });
  $('stage').addEventListener('mouseleave', () => { Game.mouseCanvas = false; });
  $('stage').addEventListener('click', e => { Snd.unlock(); const b = e.target.closest && e.target.closest('.btn,.card'); if (b && !b.classList.contains('dis')) Snd.se('ok'); }, true);
  document.addEventListener('visibilitychange', () => { if (document.hidden) { Snd.setPaused(true); } else Snd.setPaused(Screens.stack.some(s => s.name === 'pause')); });
  Game.demo(); Mini.build(); Screens.boot();
  Game.last = performance.now();
  const loop = ts => { requestAnimationFrame(loop); try { const dt = Math.min(0.1, Math.max(0.001, (ts - Game.last) / 1000)); Game.last = ts; Game.frame(dt); } catch (err) { ERRS.push('frame:' + (err && err.stack ? err.stack.split('\n').slice(0, 3).join('|') : err)); } };
  requestAnimationFrame(loop);
  window.__RT.ui = { Game, Screens, UI, Render, Snd, Save, Scale };
}
if (typeof window !== 'undefined' && typeof document !== 'undefined') { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot(); }
