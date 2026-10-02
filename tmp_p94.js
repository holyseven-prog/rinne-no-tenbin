const fs=require('fs');let s=fs.readFileSync('src/11_sprites.js','utf8');
function cut(startMark, endMark, repl){const a=s.indexOf(startMark);const b=s.indexOf(endMark,a);if(a<0||b<0){console.log('MISSING '+startMark+' / '+endMark);return;}s=s.slice(0,a)+repl+s.slice(b);}
cut("    // animated water sparkle","    // plateau fog","    const hf = (G.tick % TICK_DAY) / 6; this.drawWaterAnim(c, cx, cy, sea); this.drawAnimProps(c, cx, cy, sea, opts.noNight ? 0 : darkness(hf));\n");
cut("    // overlays: day/night","    // numbers","    this.applyLight(c, hf, opts, cx, cy, sea); this.drawWeather(c, sea, hf);\n");
cut("    // divine beam & dim","    if (this.dim > 0)","    this.drawDivine(c, cx, cy);\n");
fs.writeFileSync('src/11_sprites.js',s);
