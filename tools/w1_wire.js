/* one-shot patch: wire V4.2 W1/W2 (07d_field.js) into the simulation and the renderer */
const fs = require('fs');
const P = (f, pairs) => { let s = fs.readFileSync(f, 'utf8'); for (const [a, b] of pairs) { if (!s.includes(a)) { console.log('MISSING', f, a.slice(0, 90)); process.exit(1); } s = s.split(a).join(b); } fs.writeFileSync(f, s); };
P('src/04_state.js', [["  initAssaults(); G.godXp = 0;", "  initAssaults(); initField(); G.godXp = 0;"]]);
P('src/07_world.js', [["  dailyDefense(); periodDaily();", "  dailyDefense(); periodDaily(); fieldDaily();"],
  ["  assaultTick(); councilTick(); cardTick();", "  assaultTick(); councilTick(); cardTick(); fieldSpawnTick();"]]);
P('src/06_combat.js', [
  ["  if (G.tick % 8 === 0 && wildCount() < monsterCap() && (G.forceMonsters || true)) { spawnMonster(tierForSpawn()); }", "  if (!G.eco && G.tick % 8 === 0 && wildCount() < monsterCap()) { spawnMonster(tierForSpawn()); } // V4.2: zone ecology spawns instead"],
  ["  if (!m.alive) return; m.alive = false; m.hp = 0; G.stats.kills++; G.dayKills++;", "  if (!m.alive) return; m.alive = false; m.hp = 0; G.stats.kills++; G.dayKills++; onFieldKill(m, by);"],
  ["  if (!h.alive) return; h.alive = false; h.hp = 0; h.cause = cause; h.diedAt = G.tick; G.stats.deaths++;", "  if (!h.alive) return; h.alive = false; h.hp = 0; h.cause = cause; h.diedAt = G.tick; G.stats.deaths++; inheritGear(h);"],
  ["  let atk = st.atk * rrange(0.85, 1.15);\n  let crit = h.job === 'thief' ? 0.2 : 0.05; let cm = 1;", "  let atk = st.atk * rrange(0.85, 1.15) * gearMul(h); if (h.named && h.named.w && ((h.named.w.trait === 'wolf' && /wolf/.test(tg.type || '')) || (h.named.w.trait === 'dragon' && /wyrm|dragon/.test(tg.type || '')))) atk *= 1.5;\n  let crit = h.job === 'thief' ? 0.2 : 0.05; let cm = 1;"],
  ["  if (b.hp <= 0) { if (b.job) killHuman(b, 'battle', a); else killMonster(b, a); }", "  if (b.hp <= 0 && b.job && b.rare === 'sageStone' && !b.sageUsed) { b.sageUsed = 1; b.hp = Math.max(1, b.maxHp * 0.3); logEvent('sage_saved', [b.id], {}, ['growth'], 0.6, 0.7, b); }\n  if (b.hp <= 0) { if (b.job) killHuman(b, 'battle', a); else killMonster(b, a); }"],
  ["function advPower(h) { const st = hStats(h); const J = JOBS[h.job]; return Math.sqrt(st.hp * st.atk) * (h.hp / h.maxHp + 0.2); }", "function advPower(h) { const st = hStats(h); const J = JOBS[h.job]; return Math.sqrt(st.hp * st.atk) * (h.hp / h.maxHp + 0.2) * (typeof gearMul === 'function' ? gearMul(h) : 1); }"],
  ["  const lo = tier === 1 ? 44 : tier === 2 ? 46 : 48, hi = tier === 1 ? 47 : tier === 2 ? 50 : 52;\n  let p = randWalkableIn(lo, 5, hi, 38);", "  const z = ZONES[Math.min(ZONES.length - 1, tier - 1)]; let p = randWalkableIn(z.x0 + 1, 6, Math.min(z.x1 - 1, z.x0 + 12), MH - 8); // V4.2: quests go to the zone of their tier"],
  ["tx: p.x, ty: p.y, reward: 0, exp: 0, party: 0, t: G.tick, mon: rpick(MON_BY_TIER[Math.min(3, tier)]) };", "tx: p.x, ty: p.y, reward: 0, exp: 0, party: 0, t: G.tick, mon: rpick(ZONE_MONS[z.id] || MON_BY_TIER[Math.min(3, tier)]), zone: z.id };"],
  ["    const yr = yearOf(G.tick); let tier = 1 + (yr >= 4 ? 1 : 0) + (yr >= 6 ? 1 : 0); if (G.awakened) tier = 3; if (rchance(0.3) && tier > 1) tier--;", "    const yr = yearOf(G.tick); let tier = 1 + (yr >= 4 ? 1 : 0) + (yr >= 6 ? 1 : 0); if (G.awakened) tier = 3; if (rchance(0.3) && tier > 1) tier--;\n    { const top = G.humans.filter(o => o.alive && isAdv(o)).map(o => o.lvl).sort((a, b) => b - a).slice(0, 3); const lv = top.length ? top.reduce((a, b) => a + b, 0) / top.length : 1; if (lv >= 10 && rchance(0.25)) tier = 5; else if (lv >= 7 && rchance(0.35)) tier = Math.max(tier, 4); } // strong parties go deeper"],
]);
P('src/07b_assault.js', [["  return t;\n}\nfunction adaptT", "  if (G.eco && !G.noEco) t *= 1 + ecoMod(); // V4.2: more monsters in the field -> a stronger assault\n  return t;\n}\nfunction adaptT"]]);
P('src/09_story.js', [["    case 'festival': return 'family_day';", "    case 'lord_slain': return 'promotion'; case 'named_gear': return 'g_gear'; case 'inherit_gear': return 'g_gear';\n    case 'festival': return 'family_day';"]]);
P('src/07c_council.js', [["const FEED_S = { assault_start: 1,", "const FEED_S = { lord_slain: 1, assault_start: 1,"]]);
// monsters: placeholder recolours for the new kinds (their own art waits for SEVEN's design sheet)
fs.appendFileSync('src/11f_monsters.js', `
/* V4.2 W1: the new field monsters reuse a base form with a colour shift until their design sheet arrives (art spec Part E: "wait for SEVEN") */
const MON_ALIAS = { slime: ['mush', 'hue-rotate(200deg) saturate(1.2)'], hornrab: ['wolf', 'hue-rotate(150deg) saturate(0.6) brightness(1.3)'], flower: ['mush', 'hue-rotate(260deg) saturate(1.4)'], mush2: ['mush', 'hue-rotate(80deg) saturate(1.2)'], slimeK: ['mush', 'hue-rotate(180deg) brightness(0.8) saturate(1.6)'], bat2: ['bat', 'hue-rotate(90deg) brightness(0.8)'],
  gargoyle: ['bat', 'grayscale(1) brightness(1.1)'], griffin: ['bat', 'hue-rotate(160deg) saturate(1.5) brightness(1.3)'], snowwolf: ['wolf', 'grayscale(1) brightness(1.7)'], goblin2: ['goblin', 'hue-rotate(320deg) brightness(0.85)'], wyrm: ['wolf', 'hue-rotate(110deg) saturate(1.6)'], skel2: ['skel', 'sepia(0.8) brightness(0.8)'] };
const _monSprite42 = monsterSprite;
monsterSprite = function (m, frame, dir) {
  const al = MON_ALIAS[m.type]; if (!al || m.boss || m.cad >= 0) return _monSprite42(m, frame, dir);
  const src = _monSprite42(Object.assign({}, m, { type: al[0] }), frame, dir); const key = 'al.' + m.type + '.' + src.width + '.' + frame + '.' + (dir === undefined ? m.dir : dir); if (spriteCache[key]) return spriteCache[key];
  const cv = mkCanvas(src.width, src.height), c = cv.getContext('2d'); c.filter = al[1]; c.drawImage(src, 0, 0); c.filter = 'none'; return (spriteCache[key] = cv);
};
`);
console.log('ok');
