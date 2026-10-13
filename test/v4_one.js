// node test/v4_one.js <seed> [god] [stepN] : print assault grades for one game
const fs = require('fs'), vm = require('vm'); vm.runInThisContext(fs.readFileSync(__dirname + '/sim_bundle.js', 'utf8'), { filename: 'sim' });
const R = globalThis.__RT; const sd = +process.argv[2] || 7919, god = process.argv[3] || 'mercy', st = +process.argv[4] || 1;
R.newGame({ seed: sd, god, lang: 'ja' }); R.policy('basic'); const g = R.G(); for (let i = 0; i < 40000 && !g.ending; i++) R.step(st);
console.log(sd, god, st, g.ending.kind, g.assaults.map(a => a.id + ':' + a.grade + '/' + a.pred + '>' + a.predFinal).join(' '), 'faith', Math.round(g.faith), 'lv', g.godLv);
