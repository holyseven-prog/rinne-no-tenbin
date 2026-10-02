const fs = require('fs'), path = require('path');
const rows = [];
for (const f of fs.readdirSync(__dirname).filter(f => /^b3_.*\.out$/.test(f))) for (const l of fs.readFileSync(path.join(__dirname, f), 'utf8').split(String.fromCharCode(10))) { if (l.startsWith('{')) rows.push(JSON.parse(l)); }
const by = {};
rows.forEach(r => { const k = r.pol; (by[k] = by[k] || []).push(r); });
for (const k in by) {
  const a = by[k]; const cnt = {}; a.forEach(r => cnt[r.end] = (cnt[r.end] || 0) + 1);
  const avg = f => (a.reduce((s, r) => s + f(r), 0) / a.length);
  console.log(k.padEnd(6), 'n=' + a.length, JSON.stringify(cnt), 'avgTick', avg(r => r.tick).toFixed(0), 'avgWar', avg(r => r.warTicks).toFixed(0), 'tries', avg(r => r.tries).toFixed(2), 'min/max min', (Math.min(...a.map(r => r.tick)) / 9.6 / 60).toFixed(1), (Math.max(...a.map(r => r.tick)) / 9.6 / 60).toFixed(1));
}
