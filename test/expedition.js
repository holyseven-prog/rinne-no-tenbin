/* V4.2 W3 acceptance: node test/expedition.js [seeds=16]
   strategies: none (no expedition), smart (divine training + gate & hall at year ~4-5), throne (training, then the throne in years 4-6 when the forecast is >= 50%),
   greedy (straight to the throne as soon as possible, no training). Reports year-10 win rate, throne success with / without training, and that
   retreat, capture & rescue, and king kill -> new king (125%, era goes on) all happen. */
const fs = require('fs'), vm = require('vm'); vm.runInThisContext(fs.readFileSync(__dirname + '/sim_bundle.js', 'utf8'), { filename: 'sim' });
const R = globalThis.__RT; const N = +process.argv[2] || 16; const res = {}; const seen = { retreat: 0, captive: 0, saved: 0, newKing: 0, kingPow: 0, eraGoesOn: 0 };
function train(g) { if (dayIdx(g.tick) % 7) return; for (const id of ['artifact', 'skill', 'mark', 'temple', 'growth']) if (trainAvailable(id) && g.faith >= trainCost(id) + Math.max(60, g.faithMax * 0.4)) { doTrain(id); return; } } // a sensible player: one training a week, keeps a reserve for prayers
for (const strat of (process.argv[3] || 'none,smart,throne,greedy').split(',')) {
  const r = res[strat] = { games: 0, wins: 0, throneTry: 0, throneWin: 0, exps: 0 };
  for (let s = 1; s <= N; s++) { R.newGame({ seed: s * 7919 + 11, god: ['mercy', 'order', 'chaos'][s % 3], lang: 'ja' }); R.policy('basic'); const g = R.G(); let done = false;
    for (let i = 0; i < 20000 && !g.ending; i++) { R.step(1); const y = (g.tick - START_TICK) / TICK_YEAR;
      if (g.tick % 144 !== 0) continue;
      if ((strat === 'smart' || strat === 'throne') && y >= 2) train(g);
      if (done || !expParty() || expMissing().length) continue; const P = expParty();
      if (strat === 'smart' && y >= 4 && y < 6) { g.expTarget = 2; g.expRisk = 0.55; g.faith = Math.max(g.faith, 30); if (startExpedition().ok) { r.exps++; autoExpedition(2); done = true; } }
      if (strat === 'throne' && y >= 4 && y < 6.5 && floorWin(P, 4, 4) >= 0.5) { g.expTarget = 4; g.expRisk = 0.3; g.faith = Math.max(g.faith, 30); if (startExpedition().ok) { r.exps++; r.throneTry++; const k0 = g.castle.kingGen; autoExpedition(4); if (g.castle.kingGen > k0) r.throneWin++; done = true; } }
      if (strat === 'greedy' && y >= 3) { g.expTarget = 4; g.expRisk = 0.0; g.faith = Math.max(g.faith, 30); if (startExpedition().ok) { r.exps++; r.throneTry++; const k0 = g.castle.kingGen; autoExpedition(4); if (g.castle.kingGen > k0) r.throneWin++; done = g.castle.kingGen > k0; } }
    }
    r.games++; if (g.ending && g.ending.kind === 'victory') r.wins++;
    (g.castle.log || []).forEach(l => { if (l.how === 'retreat') seen.retreat++; }); if (g.events.some(e => e.type === 'captive_saved')) seen.saved++; if (g.stats.captured || g.events.some(e => e.type === 'captive_lost' || e.type === 'captive_saved')) seen.captive++;
    if (g.castle.kingGen > 0) { seen.newKing++; if (Math.abs(g.castle.kingPow - Math.pow(1.25, g.castle.kingGen)) < 1e-6) seen.kingPow++; if (g.ending && g.ending.t > START_TICK + 9 * TICK_YEAR) seen.eraGoesOn++; } }
  console.log(strat, JSON.stringify({ win10: (r.wins / r.games).toFixed(2), exps: r.exps, throne: r.throneTry ? (r.throneWin / r.throneTry).toFixed(2) + ' (' + r.throneTry + ')' : '-' }));
}
const d = k => res[k] && res.none ? ((res[k].wins - res.none.wins) / N * 100).toFixed(0) : '-';
console.log('vs none (pp): smart', d('smart'), ' throne', d('throne'), ' greedy', d('greedy')); console.log('branches', JSON.stringify(seen));
