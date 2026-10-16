/* ================= people and monsters from the visual team's sprites (SPR, decoded in 11r_spr.js).
   Camera x1: the 48 px set 1:1 (24 world px high). x2: the 96 px "_hd" set 1:1. x1.5: the _hd set scaled down with high quality.
   Never the x1 data enlarged. Falls back to the old code-drawn sprite when a sprite is missing. ================= */
const SPR_DIR = ['front', 'back', 'left', 'right'];
const SPR_JOB = { warrior: 'swordsman', hero: 'hero', swordsman: 'swordsman', mage: 'mage', priest: 'priest', thief: 'thief', farmer: 'farmer', merchant: 'merchant', smith: 'smith', herbalist: 'herbalist', weaponer: 'weaponer', armorer: 'armorer' };
function humanSprBase(h) { const role = roleOf(h); const sx = h.sex === 'F' ? 'f' : 'm';
  if (role === 'child') { const pj = (G && G.idx[h.parent] && G.idx[h.parent].job) || h.job || 'farmer'; return 'npc_child_' + (SPR_JOB[pj] || 'farmer') + '_' + sx; }
  if (role === 'historian') return 'npc_chronicler_' + sx;
  const job = SPR_JOB[role] || 'farmer'; if (h.age >= 56) return 'npc_elder_' + job + '_' + sx; return 'npc_' + job + '_' + sx; }
/* pick the data for the zoom: returns { cv, wpx } where wpx = source pixels per world pixel */
function sprForZoom(base) { const z = Render.Z; const hd = SPR[base + '_hd'], sd = SPR[base]; if (z >= 1.25 && hd) return { cv: hd, per: 4, smooth: z < 1.75 }; if (sd) return { cv: sd, per: 2, smooth: false }; if (hd) return { cv: hd, per: 4, smooth: true }; return null; }
/* draw a sprite with its feet at world point (wx, wy); returns the drawn height in world px or 0 */
function drawSprAt(c, base, wx, wy, alpha) { if (!SPR_READY) return 0; const s = sprForZoom(base); if (!s) return 0; const w = s.cv.width / s.per, hgt = s.cv.height / s.per;
  const k = Render.k; const x = Math.round((wx - w / 2) * k) / k, y = Math.round((wy - hgt) * k) / k; // snap to screen pixels so 1:1 stays crisp
  const sm = c.imageSmoothingEnabled; if (s.smooth) { c.imageSmoothingEnabled = true; c.imageSmoothingQuality = 'high'; } if (alpha !== undefined) c.globalAlpha = alpha; c.drawImage(s.cv, x, y, w, hgt); c.imageSmoothingEnabled = sm; if (alpha !== undefined) c.globalAlpha = 1; return hgt; }
/* fm (old frame codes): moving 1 / 3 = walk A / B, 0 = stand, 4 = idle bob (1 px), 5 = lunge (shift handled by the caller), 6 = praying */
function drawHumanSpr(c, h, fm, wx, wy) { const dir = SPR_DIR[h.dir === undefined ? 0 : h.dir] || 'front'; const f = fm === 1 ? 1 : fm === 3 ? 2 : 0; const base = humanSprBase(h) + '_' + dir + '_' + f; return drawSprAt(c, base, wx, wy + (fm === 4 ? -0.5 : 0)); }
/* monsters: type -> delivered name; frames 0..2 (bosses 0..1) */
const SPR_MON = { mush: 'mushroom', bat: 'bat', turtle: 'turtle', goblin: 'goblin', skel: 'skeleton', wolf: 'wolf', dragon: 'dragon', cad0: 'cadre_mist', cad1: 'cadre_bone', cad2: 'cadre_shadow', boss: 'king', slime: 'slime', hornrab: 'horn_rabbit', flower: 'poison_flower', gargoyle: 'gargoyle', griffin: 'griffin', snowwolf: 'snow_wolf' };
function monSprBase(m) { const k = m.boss ? 'boss' : m.cad >= 0 ? 'cad' + m.cad : m.type; return SPR_MON[k] ? 'enemy_' + SPR_MON[k] : null; }
function drawMonSpr(c, m, frame, wx, wy) { const b = monSprBase(m); if (!b) return 0; const dir = SPR_DIR[m.dir === undefined ? 2 : m.dir] || 'left'; const big = m.boss || m.cad >= 0 || m.type === 'dragon'; let f = frame % (big ? 2 : 3); if (!SPR[b + '_' + dir + '_' + f] && !SPR[b + '_' + dir + '_' + f + '_hd']) f = 0; return drawSprAt(c, b + '_' + dir + '_' + f, wx, wy); }
/* battle screen (600x150 canvas in 14e): frames facing left */
function battleSprCanvas(name, frame) { if (!SPR_READY) return null; const b = 'enemy_' + name + '_left_'; let s = SPR[b + (frame % 2)] || SPR[b + '0']; return s || null; } /* the 48 px-scale set: same size relation to the 48 px people as in the field */
