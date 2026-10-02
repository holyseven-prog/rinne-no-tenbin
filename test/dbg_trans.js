const fs=require('fs'),vm=require('vm');vm.runInThisContext(fs.readFileSync(__dirname+'/sim_bundle.js','utf8'),{filename:'sim'});
const RT=globalThis.__RT;RT.newGame({seed:+process.argv[2]||73,god:'mercy',lang:'ja'});RT.policy('basic');const G=RT.G();
for(let i=0;i<40000&&!G.ending;i++)RT.step(1);
const nm=c=>(c.an[c.a[0]]||[''])[0];
G.chapters.filter(c=>!c.fixedKey&&c.scene!=='prologue'&&c.scene!=='recap').slice(0,60).forEach(c=>{const r=renderChapter(c);const info=c.info[c.a[0]]||{};const nonMain=c.mainId&&c.who.length&&c.who.indexOf(c.mainId)<0;
 const txt=r.paras.map(p=>p.text).join('').replace(/（[^）]*）/g,'');
 if(nonMain&&!(c.mainNm&&r.paras[0].text.includes(c.mainNm[0]))) console.log('TRANS?',c.no,c.scene,r.paras[0].text.slice(0,50));
 if((info.job!=='swordsman'&&/剣|刃|鞘|素振|刀/.test(r.title+txt))||(info.job!=='mage'&&/魔法|魔力|呪文|杖|魔導/.test(r.title+txt))) console.log('JOB',c.no,c.scene,info.job,(r.title+txt).match(/.{0,8}(剣|刃|鞘|素振|刀|魔法|魔力|呪文|杖|魔導).{0,6}/)[0]);
 if(c.a.length>=2&&c.who.length===2&&!(c.info[c.a[1]]||{}).rel) console.log('NOREL',c.no,c.scene,c.ev);});
