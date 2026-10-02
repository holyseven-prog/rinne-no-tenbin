const fs=require('fs'),vm=require('vm');vm.runInThisContext(fs.readFileSync(__dirname+'/sim_bundle.js','utf8'),{filename:'sim'});
const RT=globalThis.__RT;let cap=0,n=0,sum=0,low=0;
for(let sd=1;sd<=+(process.argv[3]||12);sd++){RT.newGame({seed:sd*31,god:'mercy',lang:'ja'});RT.policy(process.argv[2]||'basic');const G=RT.G();
 for(let i=0;i<700&&!G.ending;i++){RT.step(144);n++;sum+=G.faith;if(G.faith>=140)cap++;if(G.faith<20)low++;}}
console.log('avg',(sum/n).toFixed(1),'capShare',(cap/n).toFixed(2),'lowShare',(low/n).toFixed(2));
