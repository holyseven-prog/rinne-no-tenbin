const fs=require('fs');let s=fs.readFileSync('src/11_sprites.js','utf8');
const a=s.indexOf('const SEASON_COL');const b=s.indexOf('const spriteCache');
console.log(a,b);s=s.slice(0,a)+s.slice(b);fs.writeFileSync('src/11_sprites.js',s);
