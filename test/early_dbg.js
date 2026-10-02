const fs=require('fs'),vm=require('vm');vm.runInThisContext(fs.readFileSync(__dirname+'/sim_bundle.js','utf8'),{filename:'sim'});
const RT=globalThis.__RT;const out=[];
for(let sd=1;sd<=12;sd++){RT.newGame({seed:sd*7+3,god:'mercy',lang:'ja'});RT.policy('basic');const G=RT.G();RT.step(3*1728);out.push(G.chapters.length-1+':'+G.chapters.slice(1).map(c=>c.scene[0]+c.scene[1]).join(','));}
console.log(out.join('\n'));
