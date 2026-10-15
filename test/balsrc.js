const fs = require('fs'), vm = require('vm'); vm.runInThisContext(fs.readFileSync(__dirname + '/sim_bundle.js', 'utf8'), { filename: 'sim' });
const R = globalThis.__RT; R.newGame({ seed: 7930, god: 'mercy', lang: 'ja' }); R.policy('basic'); const g = R.G(); const c = {};
const ol = logEvent; globalThis.logEvent = function (type) { c[type] = (c[type] || 0) + 1; return ol.apply(this, arguments); };
for (let i = 0; i < TICK_YEAR * 2 && !g.ending; i++) R.step(1);
console.log('bal', Math.round(g.balance), ['quest_clear', 'quest_fail', 'love_start', 'marriage', 'prayer_answer', 'answer', 'kill', 'monster_kill', 'hunt'].map(k => k + ':' + (c[k] || 0)).join(' '), JSON.stringify(Object.entries(c).sort((a, b) => b[1] - a[1]).slice(0, 25)));
