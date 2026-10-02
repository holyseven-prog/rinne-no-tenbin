const fs=require('fs'),vm=require('vm');vm.runInThisContext(fs.readFileSync(__dirname+'/sim_bundle.js','utf8'),{filename:'sim'});
const RT=globalThis.__RT;RT.newGame({seed:+process.argv[2],god:'mercy',lang:'ja'});RT.policy('basic');const G=RT.G();for(let i=0;i<40000&&!G.ending;i++)RT.step(1);
console.log('main',G.main,G.idx[G.main]&&G.idx[G.main].name[0]);G.chapters.slice(1,11).forEach(c=>console.log(c.no,c.scene,(c.an[c.a[0]]||[''])[0],c.who.indexOf(c.mainId)>=0?'MAIN':'-','yr',(c.t/1728).toFixed(1)));
