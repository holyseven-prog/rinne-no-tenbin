/* V4 acceptance simulation: node test/v4_sim.js [seeds=30] */
const fs = require('fs'), vm = require('vm');
globalThis.__TUNE = JSON.parse(process.env.TUNE || '{}');
vm.runInThisContext(fs.readFileSync(__dirname + '/sim_bundle.js', 'utf8'), { filename: 'sim' });
const RT = globalThis.__RT; const N = +process.argv[2] || 30; const POLS = (process.argv[3] || 'none,basic').split(',');
const ROUTINE = { party_formed: 1, quest_clear: 1, quest_fail: 1, first_battle: 1, prep: 1, walls_up: 1, rebuilt: 1, coming_of_age: 1, migrant: 1, decree_settle: 1 };
const SHOWN = ev => ev.tension >= 0.5 || ['death', 'birth', 'marriage', 'promotion', 'reincarnation'].indexOf(ev.type) >= 0 || ROUTINE[ev.type];
const out = {};
for (const pol of POLS) {
  const R = { faithPts: [], heroYears: [], heroMax: 0, fc: [], calN: [], games: 0, wins: {}, n: {}, cal: [], dragon: {}, dk: 0, decisions: 0, minutes: 0, routine: 0, shown: 0, deathsTotal: 0, endings: {} };
  for (let s = 1; s <= N; s++) {
    RT.newGame({ seed: s * 7919 + 11, god: s % 3 === 0 ? 'order' : s % 3 === 1 ? 'mercy' : 'chaos', lang: 'ja' }); RT.policy(pol); const G = RT.G();
    let lastDayShown = -1, routineDay = {};
    for (let i = 0; i < 20000 && !G.ending; i++) { RT.step(1); if (G.tick % 144 === 0) { R.faithPts.push(G.faith / G.faithMax); } }
    if (G.heroYear) R.heroYears.push(G.heroYear); else R.heroYears.push(99);
    G.assaults.forEach(a => { if (a.state !== 'done') return; R.n[a.id] = (R.n[a.id] || 0) + 1; const w = ['crush', 'win', 'pyrrhic', 'pact'].indexOf(a.grade) >= 0; R.wins[a.id] = (R.wins[a.id] || 0) + (w ? 1 : 0); if (a.grade !== 'pact') { R.cal.push([(pol === 'none' ? a.pred : a.predHelp) / 100, w ? 1 : 0]); if (a.fcThen != null) R.fc.push([a.fcThen, w ? 1 : 0]); } R.calF = R.calF || []; R.calF.push([(a.predFinal != null ? a.predFinal : a.pred) / 100, w ? 1 : 0]); if (a.id === 'dragon') { const o = G.chain.dragonOutcome; R.dragon[o] = (R.dragon[o] || 0) + 1; } });
    R.games++; R.endings[G.ending ? G.ending.kind : 'none'] = (R.endings[G.ending ? G.ending.kind : 'none'] || 0) + 1;
    R.decisions += (G.stats.decisions || 0) + (G.stats.preps || 0) + (G.stats.interventions || 0); R.minutes += (G.tick - START_TICK) / (2.4 * 4) / 60;
  }
  // calibration buckets
  const bk = arr => [0, 0.2, 0.4, 0.6, 0.8, 1.01].slice(0, 5).map((lo, k, A) => { const hi = [0.2, 0.4, 0.6, 0.8, 1.01][k]; const xs = (arr || []).filter(c => c[0] >= lo && c[0] < hi); if (!xs.length) return null; const p = xs.reduce((a, c) => a + c[0], 0) / xs.length, q = xs.reduce((a, c) => a + c[1], 0) / xs.length; return { s: p.toFixed(2) + '->' + q.toFixed(2) + '(' + xs.length + ')', e: xs.length >= 8 ? Math.abs(p - q) : 0 }; }).filter(Boolean);
  const cb = bk(R.cal), cf = bk(R.calF);
  out[pol] = { games: R.games, winRate: Object.fromEntries(Object.keys(R.n).map(k => [k, (R.wins[k] / R.n[k]).toFixed(2) + ' (' + R.n[k] + ')'])), dragon: R.dragon, endings: R.endings, decisionsPer10min: (R.decisions / R.minutes * 10).toFixed(2), faithIn30to90: (R.faithPts.filter(x => x >= 0.3 && x <= 0.9).length / R.faithPts.length).toFixed(2), faithBelow10: (R.faithPts.filter(x => x < 0.1).length / R.faithPts.length).toFixed(3), faithAvg: (R.faithPts.reduce((a, b) => a + b, 0) / R.faithPts.length).toFixed(2), heroYearMedian: R.heroYears.sort((a, b) => a - b)[Math.floor(R.heroYears.length / 2)], heroNone: R.heroYears.filter(y => y === 99).length, forecast: bk(R.fc).map(x => x.s).join(' '), forecastMaxErr: Math.max(0, ...bk(R.fc).map(x => x.e)).toFixed(2), calPre: cb.map(x => x.s).join(' '), calPreMaxErr: Math.max(...cb.map(x => x.e)).toFixed(2), calBattle: cf.map(x => x.s).join(' '), calBattleMaxErr: Math.max(...cf.map(x => x.e)).toFixed(2) };
}
console.log(JSON.stringify(out, null, 1));
