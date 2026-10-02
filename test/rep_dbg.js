const fs=require('fs'),vm=require('vm');vm.runInThisContext(fs.readFileSync(__dirname+'/sim_bundle.js','utf8'),{filename:'sim'});
const RT=globalThis.__RT;RT.newGame({seed:+process.argv[2]||10,god:'mercy',lang:process.argv[3]||'ja'});RT.policy('basic');const G=RT.G();
for(let i=0;i<40000&&!G.ending;i++)RT.step(1);
const cnt={},sc={};G.chapters.forEach(c=>{if(c.scene==='prologue'||c.scene==='recap')return;sc[c.scene]=(sc[c.scene]||0)+1;renderChapter(c).paras.forEach(p=>p.text.replace(/「[^」]*」/g,q=>q.replace(/[。！？]/g,'・')).split(/(?<=[。！？])|(?<=」)(?![とっ、。に])/).forEach(z=>{z=z.trim();if(z.length>4)cnt[z]=(cnt[z]||0)+1;}));});
console.log(Object.entries(cnt).sort((a,b)=>b[1]-a[1]).slice(0,14).map(e=>e[1]+' '+e[0]).join('\n'));console.log(JSON.stringify(sc));
