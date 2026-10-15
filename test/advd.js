const fs = require('fs'), vm = require('vm'); vm.runInThisContext(fs.readFileSync(__dirname + '/sim_bundle.js', 'utf8'), { filename: 'sim' });
const R = globalThis.__RT; const c = {}; const ok = killHuman; globalThis.killHuman = function (h, cause, by) { if (h.adv && !h.retired) { const k = cause + (cause === 'battle' ? (G.battle && !G.battle.done ? '/assault' : (h.x >= VIL_X1 ? '/field:' + ((zoneAt(h.x) || {}).id) : '/village')) : ''); c[k] = (c[k] || 0) + 1; } return ok.apply(this, arguments); };
for (let s = 1; s <= 4; s++) { R.newGame({ seed: s * 7919 + 11, god: ['order', 'mercy', 'chaos'][s % 3], lang: 'ja' }); R.policy('basic'); const g = R.G(); for (let i = 0; i < TICK_YEAR * 7 && !g.ending; i++) R.step(1); }
console.log(JSON.stringify(c));
