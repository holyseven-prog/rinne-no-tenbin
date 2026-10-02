const fs=require('fs'),vm=require('vm');
vm.runInThisContext(fs.readFileSync(__dirname+'/sim_bundle.js','utf8'),{filename:'sim'});
const RT=globalThis.__RT;
const N=+process.argv[2]||30, god=process.argv[3]||'mercy';
const res={};
for(const pol of ['none','basic']){
  const cnt={}; let fsum=0,fn=0,yrs=0,errs=0, tries=0, nanc=0;
  for(let s=1;s<=N;s++){
    RT.newGame({seed:s*7919,god,lang:'ja'}); RT.policy(pol); const G=RT.G();
    try{ RT.step(30000); }catch(e){ errs++; console.log('ERR seed',s,e.stack.split('\n').slice(0,3).join(' | ')); }
    const k=G.ending?G.ending.kind:'none'; cnt[k]=(cnt[k]||0)+1; fsum+=G.stats.faithSum/ (G.stats.faithN||1); fn++; yrs+=yearOf(G.tick); tries+=G.bossTries;
    if(!isFinite(G.faith)||!isFinite(G.balance)) nanc++;
  }
  console.log(pol,JSON.stringify(cnt),'avgFaith',(fsum/fn).toFixed(1),'avgYear',(yrs/N).toFixed(1),'bossTries',(tries/N).toFixed(2),'errs',errs,'nan',nanc);
}
