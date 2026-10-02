const fs = require('fs'), vm = require('vm'), path = require('path');
vm.runInThisContext(fs.readFileSync(path.join(__dirname, 'sim_bundle.js'), 'utf8'), { filename: 'sim' });
const RT = globalThis.__RT;
function nanCheck(G) {
  let bad = [];
  for (const h of G.humans) { for (const k of ['x', 'y', 'hp', 'maxHp', 'age', 'gold']) if (!isFinite(h[k])) bad.push('h.' + k); for (const k in h.needs) if (!isFinite(h.needs[k])) bad.push('need.' + k); }
  for (const m of G.monsters) for (const k of ['x', 'y', 'hp', 'maxHp', 'atk', 'def']) if (!isFinite(m[k])) bad.push('m.' + k);
  for (const k of ['faith', 'balance']) if (!isFinite(G[k])) bad.push(k);
  return bad;
}
const N = +process.argv[2] || 10;
let ok = 0, tot = 0, nanTotal = 0, maxTickMs = 0, maxPop = 0;
for (const pol of ['none', 'basic']) {
  for (let s = 1; s <= N; s++) {
    RT.newGame({ seed: s, god: ['mercy', 'order', 'chaos'][s % 3], lang: s % 2 ? 'ja' : 'zh' }); RT.policy(pol); const G = RT.G(); tot++;
    let nan = [];
    try {
      for (let i = 0; i < 400 && !G.ending; i++) { const t0 = process.hrtime.bigint(); RT.step(50); const ms = Number(process.hrtime.bigint() - t0) / 1e6 / 50; if (ms > maxTickMs) maxTickMs = ms; if (i % 20 === 0) { nan = nan.concat(nanCheck(G)); maxPop = Math.max(maxPop, G.stats.alive || 0); } }
      nan = nan.concat(nanCheck(G));
    } catch (e) { console.log('EXCEPTION', pol, s, e.stack.split('\n').slice(0, 3).join(' | ')); continue; }
    if (G.ending) ok++; else console.log('NO ENDING', pol, s, G.tick);
    if (nan.length) { nanTotal += nan.length; console.log('NaN', pol, s, nan.slice(0, 4)); }
    // chapters sanity
    const chs = G.chapters.length;
    console.log(pol.padEnd(5), 'seed', String(s).padStart(2), G.ending ? G.ending.kind.padEnd(8) : 'none    ', 'year', G.ending ? G.ending.year : '-', 'chapters', chs, 'errs', RT.errors().length);
  }
}
console.log('ended', ok + '/' + tot, 'nan', nanTotal, 'maxMsPerTick', maxTickMs.toFixed(3), 'maxPop', maxPop);
