const fs = require('fs'), vm = require('vm'); vm.runInThisContext(fs.readFileSync(__dirname + '/sim_bundle.js', 'utf8'), { filename: 'sim' });
const R = globalThis.__RT; const c = {}; const of = faithLog; globalThis.faithLog = function (k, v) { c[k] = (c[k] || 0) + v; return of.apply(this, arguments); };
for (let s = 1; s <= 2; s++) { R.newGame({ seed: s * 7919 + 11, god: 'mercy', lang: 'ja' }); R.policy('engaged'); const g = R.G(); let low = 0, n = 0; for (let i = 0; i < TICK_YEAR * 3 && !g.ending; i++) { R.step(1); if (i % 12 === 0) { n++; if (g.faith < g.faithMax * 0.1) low++; } } console.log('seed', s, 'low', (low / n).toFixed(2), 'max', g.faithMax); }
console.log(JSON.stringify(Object.fromEntries(Object.entries(c).map(([k, v]) => [k, Math.round(v)]).sort((a, b) => b[1] - a[1]))));
