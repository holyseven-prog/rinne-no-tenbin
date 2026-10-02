const fs=require('fs');let s=fs.readFileSync('src/11_sprites.js','utf8');
const a=s.indexOf('/* ---------- humans ---------- */');const b=s.indexOf('function monsterSprite');
s=s.slice(0,a)+'const spriteCache = {};\n'+s.slice(b);fs.writeFileSync('src/11_sprites.js',s);
let p=fs.readFileSync('src/11b_palette.js','utf8');p=p.replace("const SHADED = 'shctpbmwga';","const SHADED = 'shctpbmwgau';");fs.writeFileSync('src/11b_palette.js',p);
