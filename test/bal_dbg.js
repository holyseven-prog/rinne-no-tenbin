const fs=require('fs'),vm=require('vm');vm.runInThisContext(fs.readFileSync(__dirname+'/sim_bundle.js','utf8'),{filename:'sim'});
const RT=globalThis.__RT;
for(const pol of ['none','basic']){const v=[];for(let sd=1;sd<=6;sd++){RT.newGame({seed:sd*17,god:'mercy',lang:'ja'});RT.policy(pol);const G=RT.G();const a=[];for(let i=0;i<700&&!G.ending;i++){RT.step(144);if(i%12==11)a.push(Math.round(G.balance));}v.push(a.join(','));}console.log(pol+'\n'+v.join('\n'));}
