const fs=require('fs'),vm=require('vm');
vm.runInThisContext(fs.readFileSync(__dirname+'/sim_bundle.js','utf8'),{filename:'sim'});
const RT=globalThis.__RT;
RT.newGame({seed:1,god:'mercy',lang:'ja'});
const G=RT.G(); const k=hById0('kyle');
let last='';
for(let i=0;i<760;i++){ RT.step(1); const s=(k.act?k.act.k+':'+k.act.st:'-')+' hp'+Math.round(k.hp)+' hun'+Math.round(k.needs.hunger)+' en'+Math.round(k.needs.energy)+' pos'+Math.round(k.x)+','+Math.round(k.y)+' in'+k.inside+' party'+k.party+' flee'+k.flee+' tg'+k.tgt;
 if(i%20===0) console.log(i,s,JSON.stringify(k.motive[0]||'')); }
