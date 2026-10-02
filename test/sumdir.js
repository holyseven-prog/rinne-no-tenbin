const fs = require('fs'), path = require('path');
const root = path.join(__dirname, 'sw');
for (const d of fs.readdirSync(root)) {
  const rows = [];
  for (const f of fs.readdirSync(path.join(root, d)).filter(f => f.endsWith('.out'))) for (const l of fs.readFileSync(path.join(root, d, f), 'utf8').split(String.fromCharCode(10))) if (l.startsWith('{')) rows.push(JSON.parse(l));
  const by = {}; rows.forEach(r => (by[r.pol] = by[r.pol] || []).push(r));
  const parts = Object.keys(by).map(p => { const a = by[p]; const c = {}; a.forEach(r => c[r.end] = (c[r.end] || 0) + 1); return p + ' n=' + a.length + ' win=' + (c.victory || 0) + ' doom=' + (c.doom || 0) + ' other=' + (a.length - (c.victory || 0) - (c.doom || 0)) + ' war=' + Math.round(a.reduce((s, r) => s + r.warTicks, 0) / a.length); });
  console.log(d.padEnd(8), parts.join(' | '));
}
