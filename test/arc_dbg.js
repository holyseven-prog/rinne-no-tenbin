const fs=require('fs'),vm=require('vm');vm.runInThisContext(fs.readFileSync(__dirname+'/sim_bundle.js','utf8'),{filename:'sim'});
const RT=globalThis.__RT;const G0=[];
for(const sd of [24,59,73]){RT.newGame({seed:sd,god:'mercy',lang:'ja'});RT.policy('basic');const G=RT.G();for(let i=0;i<40000&&!G.ending;i++)RT.step(1);
const a=G.arcs.filter(x=>x.kind!=='war'&&x.parts===1);console.log(sd,'arcs',G.arcs.length,'single',a.length,a.map(x=>x.kind+(x.done?'D':'')+(G.idx[x.hid]&&G.idx[x.hid].alive?'':'x')+'@'+Math.round((G.tick-x.last)/144)+'d').join(' '),'end',G.tick);}
