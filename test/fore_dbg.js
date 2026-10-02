const fs=require('fs'),vm=require('vm');vm.runInThisContext(fs.readFileSync(__dirname+'/sim_bundle.js','utf8'),{filename:'sim'});
const RT=globalThis.__RT;const tot={};
for(const sd of [17,38,45,59,66]){RT.newGame({seed:sd,god:'mercy',lang:'ja'});RT.policy('basic');const G=RT.G();for(let i=0;i<40000&&!G.ending;i++)RT.step(1);
G.fores.filter(f=>f.planted<G.tick-3*1728).forEach(f=>{const k=f.type+':'+f.state+(G.idx[f.hid]&&G.idx[f.hid].alive?'':'x');tot[k]=(tot[k]||0)+1;});}
console.log(JSON.stringify(tot));
