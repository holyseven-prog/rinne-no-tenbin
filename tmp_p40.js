const fs = require('fs');
function patch(f, pairs) {
  let s = fs.readFileSync(f, 'utf8');
  for (const [a, b] of pairs) { if (!s.includes(a)) { console.log('MISSING in ' + f + ': ' + a.slice(0, 60)); continue; } s = s.replace(a, () => b); }
  fs.writeFileSync(f, s);
}
patch('src/04_state.js', [
  ["chapNo: 0, lastChapTick: 0,", "chapNo: 0, lastChapTick: 0, arcs: [], fores: [], notes: [], used: {}, bigActs: [], lostFores: 0, lastScene: {}, recapDone: false,"],
]);
patch('src/07_world.js', [
  ["  G.events.push(ev);\n", "  G.events.push(ev); if (typeof memUpdate === 'function') memUpdate(ev);\n"],
  ["function yearlyUpdate() {\n  const yr = yearOf(G.tick);", "function yearlyUpdate() {\n  const yr = yearOf(G.tick); yearEndFores();"],
]);
patch('src/05_ai.js', [
  ["      if (G.onPrayerEnd) G.onPrayerEnd(p);\n    } else { const h = hById(p.hid);", "      if (h && h.alive) logEvent('prayer_expired', [h.id], { kind: p.kind }, [], 0.4, 0.4, h);\n      if (G.onPrayerEnd) G.onPrayerEnd(p);\n    } else { const h = hById(p.hid);"],
  ["h.gear++; const st = hStats(h); h.maxHp = st.hp; }", "h.gear++; const st = hStats(h); h.maxHp = st.hp; if (h.gear === 3 || h.gear === 5) logEvent('gear', [h.id], { g: h.gear }, [], 0.35, 0.5, h); }"],
  ["    h.quarrel = { who: best.id, t: G.tick }; h.rel[best.id] -= 30;", "    h.quarrel = { who: best.id, t: G.tick }; h.rel[best.id] -= 30;"],
  ["  if (!h.spouse && !best.spouse && sameGen && aff >= 62 &&", "  if (!h.spouse && !best.spouse && sameGen && aff >= 52 && aff < 62 && !h.love && !best.love && h.sex !== best.sex && !h.noticed && rchance(0.25)) { h.noticed = G.tick; logEvent('love_notice', [h.id, best.id], {}, ['relation'], 0.5, 0.6, h); return; }\n  if (!h.spouse && !best.spouse && sameGen && aff >= 62 &&"],
]);
patch('src/08_faith.js', [
  ["  logEvent(outcome === 'crit' && pid !== 'force' ? 'miracle'", "  const rsv = h ? G.fores.some(f => f.state === 'open' && f.hid === h.id && (f.type === 'dream' || f.type === 'wish')) : false;\n  if (h && (outcome === 'crit' || outcome === 'success') && pid !== 'force') { G.bigActs.push({ pid, out: outcome, name: h.name, t: G.tick }); G.bigActs.sort((a, b) => (b.out === 'crit') - (a.out === 'crit')); if (G.bigActs.length > 6) G.bigActs.length = 6; }\n  logEvent(outcome === 'crit' && pid !== 'force' ? 'miracle'"],
  ["{ pid, out: outcome, dir: dir || '', kind: pk0 }, ['divine']", "{ pid, out: outcome, dir: dir || '', kind: pk0, resolved: rsv }, ['divine']"],
]);
patch('src/10_api.js', [
  ["G.rng = new RNG(1); G.rng.s = o.rngS;", "G.rng = new RNG(1); G.rng.s = o.rngS; ['arcs', 'fores', 'notes', 'bigActs'].forEach(k => { if (!G[k]) G[k] = []; }); if (!G.used) G.used = {}; if (!G.lastScene) G.lastScene = {};"],
]);
