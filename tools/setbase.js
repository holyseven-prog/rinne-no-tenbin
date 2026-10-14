// node tools/setbase.js wave1=42 wave2=46 ... : set ASSAULT_DEF base threats
const fs = require('fs'); const f = 'src/07b_assault.js'; let s = fs.readFileSync(f, 'utf8');
for (const kv of process.argv.slice(2)) { const [k, v] = kv.split('='); const re = new RegExp('(  ' + k + ": \{[^\n]*?base: )([0-9.]+)"); if (!re.test(s)) { console.log('no', k); process.exit(1); } s = s.replace(re, '$1' + v); }
fs.writeFileSync(f, s); console.log(s.match(/base: [0-9.]+/g).join(' '));
