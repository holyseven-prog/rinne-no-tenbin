// node test/v4_margin.js [seeds] [policy] : per-assault mean D, T, help and the base shift needed for target win rates
const fs = require('fs'), vm = require('vm'); vm.runInThisContext(fs.readFileSync(__dirname + '/sim_bundle.js', 'utf8'), { filename: 'sim' });
const RT = globalThis.__RT; const N = +process.argv[2] || 16, pol = process.argv[3] || 'basic'; const acc = {};
const TGT = { wave1: 0.78, wave2: 0.78, dragon: 0.68, wave3: 0.78, king: 0.62 };
for (let s = 1; s <= N; s++) { RT.newGame({ seed: s * 7919 + 11, god: ['order', 'mercy', 'chaos'][s % 3], lang: 'ja' }); RT.policy(pol); const G = RT.G(); const ofb = finishBattle; globalThis.finishBattle = function () { const B = G.battle; (acc[B.a] = acc[B.a] || []).push([B.D, B.T, B.bonus, B.L]); return ofb(); }; for (let i = 0; i < 20000 && !G.ending; i++) RT.step(1); globalThis.finishBattle = ofb; }
for (const k of ASSAULT_ORDER) { const xs = acc[k] || []; if (!xs.length) continue; const m = f => xs.reduce((a, x) => a + f(x), 0) / xs.length; const p = m(x => sigm((x[0] - x[1] + x[2] + 3) / WIN_K));
  // find shift d so mean sigm((D-T+b+3-d)/K) = target
  let lo = -40, hi = 40; for (let it = 0; it < 40; it++) { const d = (lo + hi) / 2; const q = m(x => sigm((x[0] - x[1] + x[2] + 3 - d) / WIN_K)); if (q > TGT[k]) lo = d; else hi = d; }
  console.log(k, 'n', xs.length, 'D', m(x => x[0]).toFixed(1), 'T', m(x => x[1]).toFixed(1), 'help', m(x => x[2]).toFixed(1), 'p', p.toFixed(2), 'baseShift', ((lo + hi) / 2).toFixed(1), 'meanL', m(x => x[3]).toFixed(2), 'win', m(x => (x[0] - x[1] + x[2] + x[3]) >= -3 ? 1 : 0).toFixed(2)); }
