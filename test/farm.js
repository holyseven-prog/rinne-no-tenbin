const fs = require('fs'), vm = require('vm'); vm.runInThisContext(fs.readFileSync(__dirname + '/sim_bundle.js', 'utf8'), { filename: 'sim' });
const R = globalThis.__RT; R.newGame({ seed: 7930, god: 'mercy', lang: 'ja' }); R.policy('basic'); const g = R.G(); const acts = {}; let n = 0, f0 = g.town.food, prod = 0;
for (let i = 0; i < TICK_YEAR; i++) { const a = g.town.food; R.step(1); g.humans.forEach(h => { if (h.alive && h.job === 'farmer' && !h.child) { n++; const k = h.act ? h.act.k : (h.path && h.path.length ? 'walk' : 'idle'); acts[k] = (acts[k] || 0) + 1; } }); }
console.log('farmer-ticks', n, Object.entries(acts).sort((a, b) => b[1] - a[1]).map(([k, v]) => k + ' ' + (v / n * 100).toFixed(0) + '%').join(' '), 'food', Math.round(g.town.food));
const fm = g.humans.filter(h => h.alive && h.job === 'farmer'); console.log('homes', fm.slice(0, 6).map(h => { const d = homeDoor(h); return d.x + ',' + d.y; }).join(' '));
