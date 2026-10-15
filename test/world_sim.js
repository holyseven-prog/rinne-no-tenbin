/* V4.2 W1/W2 acceptance: node test/world_sim.js [seeds=12]
   - >= 18 monster kinds, 1 lord per zone, exp / drops grow with the star rating
   - active hunting vs no hunting: threat of the next assault differs by >= 15%
   - drops reach the storehouse, magic stones are offered (faith) or sold, named gear appears */
const fs = require('fs'), vm = require('vm'); vm.runInThisContext(fs.readFileSync(__dirname + '/sim_bundle.js', 'utf8'), { filename: 'sim' });
const R = globalThis.__RT; const N = +process.argv[2] || 12; const out = []; const ck = (n, c, x) => out.push((c ? 'PASS ' : 'FAIL ') + n + (x !== undefined ? ' ' + x : ''));
const kinds = Object.keys(MONS).filter(k => MONS[k].zone); ck('monster kinds >= 18', kinds.length >= 18, kinds.length);
const byStar = {}; kinds.forEach(k => { const m = MONS[k]; (byStar[m.star] = byStar[m.star] || []).push(m); }); const avg = (a, f) => a.reduce((s, x) => s + f(x), 0) / a.length;
const exps = Object.keys(byStar).sort().map(s => avg(byStar[s], m => m.exp)); ck('exp grows with stars', exps.every((v, i) => !i || v > exps[i - 1]), exps.map(v => v.toFixed(0)).join('<'));
const golds = Object.keys(byStar).sort().map(s => avg(byStar[s], m => m.gold)); ck('gold grows with stars', golds.every((v, i) => !i || v > golds[i - 1]), golds.map(v => v.toFixed(0)).join('<'));
ck('a lord per zone', ZONES.every(z => LORDS[z.id]), ZONES.length);
const run = noHunt => { const T = []; const st = { store: 0, offered: 0, sold: 0, named: 0, lords: 0 }; for (let s = 1; s <= N; s++) { R.newGame({ seed: s * 7919 + 11, god: 'mercy' }); R.policy('basic'); const g = R.G(); g.noHunt = noHunt;
    for (let i = 0; i < 20000 && !g.ending; i++) { R.step(1); if (g.tick % 1728 === 0 && g.tick > 3 * 1728) { const a = nextAssault(); if (a) T.push(ecoMod()); } }
    st.store += Object.values(g.store).reduce((a, b) => a + b, 0); st.offered += g.stats.offered || 0; st.sold += g.stats.sold || 0; st.named += g.humans.filter(h => h.named).length; st.lords += Object.values(g.lords).filter(l => l.gen > 0 || !l.alive).length; }
  return { mod: T.reduce((a, b) => a + b, 0) / T.length, st }; };
const A = run(false), B = run(true);
ck('hunting lowers the next threat by >= 15% vs no hunting', (B.mod - A.mod) >= 0.15, 'hunt ' + (A.mod * 100).toFixed(0) + '% / none ' + (B.mod * 100).toFixed(0) + '%');
ck('drops reach the storehouse', A.st.store > 0, A.st.store); ck('magic stones offered and sold', A.st.offered > 0 && A.st.sold > 0, A.st.offered + '/' + A.st.sold); ck('named gear appears', A.st.named > 0, A.st.named); ck('zone lords defeated', A.st.lords > 0, A.st.lords);
console.log(out.join('\n')); process.exit(out.some(l => l.startsWith('FAIL')) ? 1 : 0);
