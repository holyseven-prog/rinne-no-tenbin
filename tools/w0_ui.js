/* one-shot patch: V4.2 W0 UI — wide minimap, region buttons + red dots, Home key, one cached season, save version */
const fs = require('fs');
const P = (f, pairs) => { let s = fs.readFileSync(f, 'utf8'); for (const [a, b] of pairs) { if (!s.includes(a)) { console.log('MISSING', f, a.slice(0, 80)); process.exit(1); } s = s.split(a).join(b); } fs.writeFileSync(f, s); };
P('src/13_ui.js', [
  ["E.miniCv = h('canvas', { width: 192, height: 120,", "E.miniCv = h('canvas', { width: 200, height: 80,"],
  ["const x = (ev.clientX - r.left) / sc / 3, y = (ev.clientY - r.top) / sc / 3;", "const x = (ev.clientX - r.left) / sc / (200 / MW), y = (ev.clientY - r.top) / sc / (80 / MH);"],
]);
P('src/11_sprites.js', [["    if (!G.awakened) { c.fillStyle = '#7a30a0'; c.fillRect(60 * sx, 13 * sy, 3, 3); }", "    c.fillStyle = G.awakened ? '#ff40ff' : '#7a30a0'; c.fillRect(BOSS.home.x * sx - 1, (BOSS.home.y - 6) * sy, 4, 4);"]]);
P('src/15_main.js', [["    case 'h': Screens.chronicle(); break;", "    case 'h': Screens.chronicle(); break;\n    case 'home': Render.centerOn(PLAZA.x, PLAZA.y); Game.follow = 0; break;"]]);
// keep only the current season baked (the map is 2560x1024 px)
P('src/11d_world.js', [["function getWorldCanvas(sea) {\n  if (worldCache[sea]) return worldCache[sea];", "function getWorldCanvas(sea) {\n  if (worldCache[sea]) return worldCache[sea];\n  for (const k in worldCache) { delete worldCache[k]; delete overlayCache[k]; delete groundCache[k]; } // V4.2: only the current season stays cached"]]);
// save format v2 (the map changed); old saves get a clear message instead of a broken load
P('src/04_state.js', [["    ver: 1, tutMode:", "    ver: 2, tutMode:"]]);
P('src/10_api.js', [["  if (!o || o.ver !== 1) throw new Error('version');", "  if (!o || o.ver !== 2) throw new Error('version'); // V4.2: saves from before the big map cannot be migrated"]]);
P('src/15_main.js', [["    catch (e) { ERRS.push('load:' + e.message); UI.toast('Load error'); Game.toTitle(); }", "    catch (e) { if (e.message === 'version') { UI.toast(t('old_save')); return; } ERRS.push('load:' + e.message); UI.toast('Load error'); Game.toTitle(); }"]]);
fs.appendFileSync('src/14f_v41_ui.js', `
/* ---------- V4.2 W0: region buttons under the minimap (red dot = something happened there), Home key ---------- */
Object.assign(S, { reg_village: ['村', '村莊'], reg_plains: ['平原', '平原'], reg_forest: ['森', '森林'], reg_swamp: ['沼', '沼澤'], reg_mountain: ['山', '山岳'], reg_nest: ['竜巣', '龍巢'], reg_castle: ['魔王城', '魔王城'], tip_reg: ['地域へ移動', '移動到區域'], tip_reg_d: ['押すとその地域を映します。赤い点は、最近そこで大事なことが起きた印です。Homeキーで村へ戻ります。', '按下會移到該區域。紅點代表最近那裡發生了大事。按 Home 鍵回到村莊。'], old_save: ['このセーブは古い地図（V4.1以前）用なので読み込めません。新しく始めてください。', '這個存檔是舊地圖（V4.1 以前）用的，無法讀取，請重新開始。'] });
const REGIONS = [['village', 28, 26], ['plains', 67, 23], ['forest', 90, 23], ['swamp', 109, 30], ['mountain', 126, 23], ['nest', 140, 23], ['castle', 152, 24]];
const _ub42 = UI.build; UI.build = function () { _ub42.apply(this, arguments); const E = this.el; if (!E.miniWin) return;
  E.regRow = h('div', { style: 'display:flex;flex-wrap:wrap;gap:2px;margin:3px 2px 0' }); E.regBtns = {};
  REGIONS.forEach(([id, x, y]) => { const b = h('span', { class: 'btn', style: 'font-size:10px;padding:0 4px;position:relative;line-height:16px', onclick: () => { Render.centerOn(x, y); Game.follow = 0; UI.regionSeen[id] = G.tick; } }, t('reg_' + id)); b._dot = h('i', { style: 'position:absolute;right:-2px;top:-3px;width:6px;height:6px;border-radius:3px;background:#ff3a3a;display:none' }); b.appendChild(b._dot); E.regBtns[id] = b; E.regRow.appendChild(b); Tip.attach(b, () => [t('tip_reg'), t('tip_reg_d')]); });
  E.miniWin.appendChild(E.regRow); UI.regionSeen = UI.regionSeen || {}; };
function regionOfX(x) { if (x <= VIL_X1) return 'village'; if (x >= PLATEAU_X0) return 'castle'; const z = zoneAt(x); return z ? z.id : 'village'; }
const _rw42 = UI.refreshWar; UI.refreshWar = function () { _rw42.apply(this, arguments); const E = this.el; if (!E.regBtns || !G) return; if ((this._regT = (this._regT || 0) + 1) % 20) return;
  const hot = {}; for (let i = G.events.length - 1; i >= 0 && i > G.events.length - 60; i--) { const e = G.events[i]; if (!e.pos || G.tick - e.t > 2 * TICK_DAY) continue; const c = feedClass(e); if (c !== 'S' && c !== 'A') continue; const r = regionOfX(e.pos.x); if (e.t > (UI.regionSeen[r] || 0)) hot[r] = 1; }
  for (const id in E.regBtns) E.regBtns[id]._dot.style.display = hot[id] ? 'block' : 'none'; };
`);
console.log('ok');
