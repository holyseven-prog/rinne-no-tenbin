// node test/world_dbg.js [seeds] : per-year adventurer count / levels / deaths, eco modifier at battles
const fs = require('fs'), vm = require('vm'); vm.runInThisContext(fs.readFileSync(__dirname + '/sim_bundle.js', 'utf8'), { filename: 'sim' });
const R = globalThis.__RT; const N = +process.argv[2] || 4;
for (let s = 1; s <= N; s++) { R.newGame({ seed: s * 7919 + 11, god: 'mercy' }); R.policy('basic'); const g = R.G(); const ofb = finishBattle; const bt = []; globalThis.finishBattle = function () { bt.push(g.battle.a + ':' + ecoMod().toFixed(2) + '/D' + Math.round(g.battle.D) + '/T' + Math.round(g.battle.T)); return ofb(); };
  const line = []; for (let y = 1; y <= 10 && !g.ending; y++) { for (let i = 0; i < 1728 && !g.ending; i++) R.step(1); const adv = g.humans.filter(h => h.alive && isAdv(h)); line.push('y' + y + ':' + adv.length + '/' + (adv.length ? Math.max(...adv.map(h => h.lvl)) : 0) + '/d' + g.humans.filter(h => !h.alive && h.cause === 'battle' && isAdvJob(h)).length); }
  globalThis.finishBattle = ofb; console.log(s, line.join(' '), '|', bt.join(' ')); }
function isAdvJob(h) { return ['swordsman', 'mage', 'priest', 'thief'].includes(h.job); }
