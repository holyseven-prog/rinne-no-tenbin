const fs = require('fs');
process.chdir(__dirname + '/src');
function rep(file, from, to) { let s = fs.readFileSync(file, 'utf8'); if (!s.includes(from)) { console.log('MISSING in', file, ':', from.slice(0, 80)); return; } s = s.replace(from, () => to); fs.writeFileSync(file, s); }
const m = '15_main.js';
// attachHooks: feed with position + auto slow
rep(m, "    if (l && (ev.tension >= 0.5 || ['death', 'birth', 'marriage', 'promotion', 'reincarnation'].indexOf(ev.type) >= 0)) UI.toast(l, ev.tension >= 0.8 ? '#ffb8a0' : (ev.type === 'birth' || ev.type === 'marriage') ? '#a8ffc0' : '#ffffff');", "    if (l && (ev.tension >= 0.5 || ['death', 'birth', 'marriage', 'promotion', 'reincarnation'].indexOf(ev.type) >= 0)) UI.pushFeed(l, ev.tension >= 0.8 ? '#ffb8a0' : (ev.type === 'birth' || ev.type === 'marriage') ? '#a8ffc0' : '#ffffff', ev.pos, ev.tension >= 0.8);\n    if (['death', 'siege', 'boss_sortie', 'destined_reunion'].indexOf(ev.type) >= 0 || (ev.type === 'monster_raid' && ev.payload.cad >= 0)) { const a = ev.actors[0] && G.idx[ev.actors[0]]; if (ev.type !== 'death' || (a && (soulOf(a).fav || G.spot.indexOf(a.id) >= 0 || G.track.indexOf(a.id) >= 0 || isAdv(a)))) Game.autoSlow(); }");
rep(m, "  G.onPrayer = p => { Snd.se('pray'); UI.lastPray = ''; };", "  G.onPrayer = p => { Snd.se('pray'); UI.lastPray = ''; if (p.urg > 0.8 && G.tick > START_TICK + 3 * TICK_DAY) Game.autoSlow(); };");
rep(m, "  G.onChapter = ch => { if (ch.no > 1) { UI.toast(t('new_chapter') + '：' + renderChapter(ch).title, '#ffe9a0'); Snd.se('page'); } };", "  G.onChapter = ch => { if (ch.no > 1) { UI.pushFeed(t('new_chapter') + '：' + renderChapter(ch).title, '#ffe9a0', null, false); Snd.se('page'); } };");
// afterNew: tutorial for new games, theme
rep(m, "  afterNew() {\n    attachHooks();", "  applyTheme() { document.body.classList.toggle('theme-blue', this.settings.theme === 'blue'); document.body.classList.toggle('theme-black', this.settings.theme !== 'blue'); },\n  afterNew(isNew) {\n    attachHooks(); this.applyTheme();");
rep(m, "    Snd.playSong('town_day'); Game.bgmName = 'town_day';\n  },", "    Snd.playSong('town_day'); Game.bgmName = 'town_day'; Game.tut = null; $('tut').style.display = 'none';\n    if (isNew === true && !Game.settings.tutDone) setTimeout(() => Tut.start(), 300);\n  },");
rep(m, "    newGame({ god: godId, seed: (Date.now() ^ (Math.random() * 1e9)) & 0xffffff, lang: LANG, gen: gen || 1 }); Game.afterNew();", "    newGame({ god: godId, seed: (Date.now() ^ (Math.random() * 1e9)) & 0xffffff, lang: LANG, gen: gen || 1 }); Game.afterNew(!gen || gen === 1);");
// load settings: theme
rep(m, "    Snd.vol.bgm = this.settings.bgm; Snd.vol.se = this.settings.se; this.speedIdx = clamp(this.settings.speed, 0, 3);", "    Snd.vol.bgm = this.settings.bgm; Snd.vol.se = this.settings.se; this.speedIdx = clamp(this.settings.speed, 0, 3); this.applyTheme();");
// frame: labels, hover, tutorial update, advisor
rep(m, "    Render.clampCam(); Render.draw(stopped ? 0 : this.acc, {});", "    Render.clampCam(); Render.draw(stopped ? 0 : this.acc, {});\n    if (sc === 'play' || sc === 'ending') { if (this.mouseCanvas && !Game.modals.length) { const wx = Render.cam.x + this.mouse.x / 2, wy = Render.cam.y + this.mouse.y / 2; const hv = pickEntityAt(wx, wy); this.hoverId = hv ? hv.id : 0; } else this.hoverId = 0; Render.drawLabels(); }");
rep(m, "    this.hudT += dt; if (this.hudT > 0.16) { this.hudT = 0; UI.refresh(); }", "    this.hudT += dt; if (this.hudT > 0.16) { this.hudT = 0; UI.refresh(); if (this.tut) this.tut.update(); }\n    if (sc === 'play' && !stopped && dayIdx(G.tick) !== this.advDayChecked) { this.advDayChecked = dayIdx(G.tick); this.advisorTick(); }");
// N key: no repeat
rep(m, "    case 'n': Game.nextNotable(); break;", "    case 'n': if (!e.repeat) Game.nextNotable(); break;");
// tut update also when tutorial active and time frozen: refresh above runs; labels clear on title
