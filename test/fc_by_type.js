/* A-2 diagnosis: the opening "then" forecast (fcThen) vs outcome, per assault type. node test/fc_by_type.js [N=10] [policy=engaged] [from=1] */
const fs = require('fs'), vm = require('vm'); vm.runInThisContext(fs.readFileSync(__dirname + '/sim_bundle.js', 'utf8'), { filename: 'sim' });
const RT = globalThis.__RT; const N = +process.argv[2] || 10, pol = process.argv[3] || 'engaged', F = +process.argv[4] || 1; const acc = {};
for (let s = F; s < F + N; s++) { RT.newGame({ seed: s * 7919 + 11, god: ['order', 'mercy', 'chaos'][s % 3], lang: 'ja' }); RT.policy(pol); const G = RT.G(); for (let i = 0; i < 20000 && !G.ending; i++) RT.step(1);
  G.assaults.forEach(a => { if (a.state !== 'done' || a.fcThen == null || a.grade === 'pact') return; const w = ['crush', 'win', 'pyrrhic'].indexOf(a.grade) >= 0 ? 1 : 0; console.log(JSON.stringify([a.id, +a.fcThen.toFixed(3), w])); }); }
