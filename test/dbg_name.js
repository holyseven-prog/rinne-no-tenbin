const fs=require('fs'),vm=require('vm');vm.runInThisContext(fs.readFileSync(__dirname+'/sim_bundle.js','utf8'),{filename:'sim'});
const RT=globalThis.__RT;RT.newGame({seed:(+process.argv[2]),god:'mercy',lang:process.argv[4]||'ja'});RT.policy('basic');const G=RT.G();for(let i=0;i<40000&&!G.ending;i++)RT.step(1);
const c=G.chapters.find(x=>x.no===+process.argv[3]);const r=renderChapter(c);console.log(c.scene,JSON.stringify(c.a),JSON.stringify(c.who),JSON.stringify(c.cbs));console.log(r.head);console.log(r.paras.map(p=>p.text).join('\n'));
