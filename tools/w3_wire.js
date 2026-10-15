/* one-shot patch: wire V4.2 W3 (07e_castle.js) into the simulation */
const fs = require('fs');
const P = (f, pairs) => { let s = fs.readFileSync(f, 'utf8'); for (const [a, b] of pairs) { if (!s.includes(a)) { console.log('MISSING', f, a.slice(0, 90)); process.exit(1); } s = s.split(a).join(b); } fs.writeFileSync(f, s); };
P('src/04_state.js', [["  initAssaults(); initField(); G.godXp = 0;", "  initAssaults(); initField(); initCastle(); G.godXp = 0;"]]);
P('src/07_world.js', [["  dailyDefense(); periodDaily(); fieldDaily();", "  dailyDefense(); periodDaily(); fieldDaily(); castleDaily();"]]);
P('src/05_ai.js', [
  ["function updateHuman(h) {\n", "function updateHuman(h) {\n  if (h.away) { h.needs.hunger = Math.max(0, h.needs.hunger - 1); return; } // on an expedition / in the temple / captive\n"],
  ["  if (!v || h.lvl >= 25) return;\n  h.exp += v;", "  if (!v || h.lvl >= 25) return;\n  if (h.growthUntil > G.tick) v *= 1.5; // divine training: growth grace\n  h.exp += v;"],
]);
P('src/07b_assault.js', [
  ["  if (G.eco && !G.noEco) t *= 1 + ecoMod();", "  if (G.eco && !G.noEco) t *= 1 + ecoMod();\n  if (G.castle) { t *= angerMul(); if (a.id === 'king') t *= G.castle.kingPow; } // W3: the army's anger; a new king is stronger"],
  ["const morale = clamp(44 + ans * 36 + (G.moraleMod || 0) +", "const morale = clamp(44 + ans * 36 + (G.moraleMod || 0) + (G.moralePerm || 0) +"],
  ["  if (a.id === 'dragon' && G.dragonPact) { G.battle.pact = true; }", "  if (a.id === 'dragon' && G.dragonPact) { G.battle.pact = true; }\n  { const hero = G.heroId && G.idx[G.heroId]; if (hero && hero.alive && !hero.away) { if (hero.crown) G.battle.bonus += 2.4; if ((hero.skills || []).indexOf('heroStrike') >= 0) G.battle.bonus += 2; } } // crown +10pt, hero's strike +8pt in the decisive phase"],
  ["  const nd = { crush: [0, 1], win: [1, 2], pyrrhic: [2, 4], loss: [4, 7], rout: [7, 11] }[grade]; let dn = Math.round(rint(nd[0], nd[1]) * (k.kind === 'wave' ? 1 : 1.25));", "  const nd = { crush: [0, 1], win: [1, 2], pyrrhic: [2, 4], loss: [4, 7], rout: [7, 11] }[grade]; let dn = Math.round(rint(nd[0], nd[1]) * (k.kind === 'wave' ? 1 : 1.25) * (G.humans.some(h => h.alive && (h.skills || []).indexOf('holyShield') >= 0) ? 0.8 : 1) * (G.humans.some(h => h.alive && (h.skills || []).indexOf('healPrayer') >= 0) ? 0.75 : 1));"],
  ["  const pool = G.humans.filter(h => h.alive && h.age >= 6);", "  const pool = G.humans.filter(h => h.alive && h.age >= 6 && !h.away);"],
]);
P('src/07d_field.js', [
  ["      if (rchance(devout)) { G.faith = Math.min(G.faithMax, G.faith + I.faith); faithLog('stone', I.faith);", "      if (rchance(devout)) { G.faith = Math.min(G.faithMax, G.faith + I.faith * 0.7); faithLog('stone', I.faith * 0.7); G.store[it] = (G.store[it] || 0) + 1; // the church keeps the stone for divine training"],
  ["if (h.crown) m *= RARES.kingCrown.pow; return m; }", "if (h.crown) m *= RARES.kingCrown.pow; if (h.marks) m *= 1 + h.marks.length * 0.15 * 0.6; if (h.artifact) m *= 1 + h.artifact * 0.1; return m; }"],
]);
// partyPower already applies marks/artifact through advPower->gearMul: avoid double counting
P('src/07e_castle.js', [["function partyPower(P) { return P.reduce((s, h) => s + advPower(h) * (1 + (h.marks || []).length * 0.15 * 0.6) * (h.artifact ? 1 + h.artifact * 0.1 : 1), 0); }", "function partyPower(P) { return P.reduce((s, h) => s + advPower(h), 0); }"]]);
P('src/09_story.js', [["    case 'lord_slain': return 'promotion';", "    case 'exp_depart': return 'depart'; case 'exp_end': return p.how === 'lost' ? 'defeat' : 'return'; case 'new_king': return 'omen'; case 'king_slain_exp': return 'revelation'; case 'captive_lost': return 'funeral'; case 'captive_saved': return 'reunion'; case 'divine_train': return 'trial';\n    case 'lord_slain': return 'promotion';"]]);
P('src/07c_council.js', [["const FEED_S = { lord_slain: 1,", "const FEED_S = { new_king: 1, king_slain_exp: 1, captive_lost: 1, retaliation: 1, exp_end: 1, lord_slain: 1,"]]);
console.log('ok');
