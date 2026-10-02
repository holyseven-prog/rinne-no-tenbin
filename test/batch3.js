// usage: node batch3.js <pol> <from> <to> [god]   (prints one line per seed immediately)
const fs = require('fs'), vm = require('vm');
globalThis.__TUNE = JSON.parse(process.env.TUNE || '{}');
vm.runInThisContext(fs.readFileSync(__dirname + '/sim_bundle.js', 'utf8'), { filename: 'sim' });
const RT = globalThis.__RT;
const pol = process.argv[2] || 'basic', a = +process.argv[3] || 1, b = +process.argv[4] || 10, god = process.argv[5] || 'mercy';
for (let s = a; s <= b; s++) {
  const t0 = Date.now();
  RT.newGame({ seed: s * 7919, god, lang: 'ja' }); RT.policy(pol); const G = RT.G();
  let aw = 0; for (let i = 0; i < 700 && !G.ending; i++) { RT.step(50); if (!aw && G.awakened) aw = G.awakenAt; }
  console.log(JSON.stringify({ s, pol, end: G.ending ? G.ending.kind : 'NONE', tick: G.tick, awaken: aw, warTicks: aw ? G.tick - aw : 0, tries: G.bossTries, ms: Date.now() - t0 }));
}
