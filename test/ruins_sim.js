/* C acceptance: in N simulated games, ruined buildings are repaired in 2 / 4 / 6 days (pyrrhic / loss / rout) unless food or wood runs out;
   graves are added for the fallen; ruined buildings lose their function. node test/ruins_sim.js [N=30] [policy=basic] */
const fs = require('fs'), vm = require('vm'); vm.runInThisContext(fs.readFileSync(__dirname + '/sim_bundle.js', 'utf8'), { filename: 'sim' });
const RT = globalThis.__RT; const N = +process.argv[2] || 30, pol = process.argv[3] || 'basic'; const days = { pyrrhic: [], loss: [], rout: [] }; let graves = 0, deaths = 0, stalledDays = 0, ruinedTotal = 0, sleepOk = 0, sleepChecks = 0;
for (let s = 1; s <= N; s++) { RT.newGame({ seed: s * 7919 + 11, god: ['order', 'mercy', 'chaos'][s % 3], lang: 'ja' }); RT.policy(pol); const G = RT.G();
  for (let i = 0; i < 20000 && !G.ending; i++) { RT.step(1); if (G.tick % 144 === 0 && G.repairStalled) stalledDays++;
    if (G.tick % 37 === 0 && Object.keys(G.ruins).length) { // homeless people do not sleep inside their ruined house
      G.humans.forEach(h => { if (h.alive && h.act && h.act.k === 'sleep' && W.blds[h.home] && G.ruins[h.home]) { sleepChecks++; if (h.act.bld !== h.home) sleepOk++; } }); } }
  (G.repairLog || []).forEach(r => { if (days[r.grade] && !r.blessed) days[r.grade].push(r.days); }); graves += (G.graves || []).length; deaths += G.assaults.reduce((a, x) => a + ((x.res && x.res.deaths) || []).length, 0); ruinedTotal += (G.repairLog || []).length + Object.keys(G.ruins).length; }
const out = []; const ck = (n, c, x) => out.push((c ? 'PASS ' : 'FAIL ') + n + (x ? ' ' + x : ''));
const med = a => { if (!a.length) return null; const b = a.slice().sort((x, y) => x - y); return b[b.length >> 1]; };
for (const [g, want] of [['pyrrhic', 2], ['loss', 4], ['rout', 6]]) { const m = med(days[g]); const within = days[g].filter(d => Math.abs(d - want) <= 0.6).length; ck('repair ' + g + ' median ~' + want + ' days', m === null || Math.abs(m - want) <= 0.6, 'n=' + days[g].length + ' median=' + (m === null ? '-' : m.toFixed(2)) + ' within±0.6=' + within); }
ck('buildings were ruined in the runs', ruinedTotal > 0, String(ruinedTotal)); ck('repair stalled on few days', stalledDays <= N * 3, stalledDays + ' days');
ck('homeless never sleep in a ruin', sleepChecks === 0 || sleepOk === sleepChecks, sleepOk + '/' + sleepChecks); ck('graves recorded', graves > 0, graves + ' graves');
console.log(out.join('\n')); process.exit(out.some(l => l.startsWith('FAIL')) ? 1 : 0);
