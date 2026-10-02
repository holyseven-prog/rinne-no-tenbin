const fs=require('fs'),vm=require('vm'),path=require('path');
const dir=path.join(__dirname,'../src');
vm.runInThisContext(fs.readdirSync(dir).filter(f=>f.endsWith('.js')).sort().map(f=>fs.readFileSync(path.join(dir,f),'utf8')).join('\n')+'\n;globalThis.__X={newGame,endGame,renderChapter,G:()=>G,tick,setLang:l=>{LANG=l}};',{filename:'all'});
const X=globalThis.__X;
for(const kind of ['victory','doom','godleft','stagnant']){ for(const lang of ['ja','zh']){ X.newGame({seed:5,god:'chaos',lang}); X.setLang(lang); const G=X.G(); for(let i=0;i<400;i++) X.tick(); X.endGame(kind); const last=G.chapters[G.chapters.length-1]; const r=X.renderChapter(last); console.log(kind,lang,'|',last.scene,'|',r.title,'|',r.paras.map(p=>p.text).join('').slice(0,60)); } }
