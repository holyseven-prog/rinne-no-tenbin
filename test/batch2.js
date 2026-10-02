const fs=require('fs'),vm=require('vm');
globalThis.__TUNE=JSON.parse(process.env.TUNE||'{}');
vm.runInThisContext(fs.readFileSync(__dirname+'/sim_bundle.js','utf8'),{filename:'sim'});
const RT=globalThis.__RT;
const N=+process.argv[2]||30, pol=process.argv[3]||'none', god=process.argv[4]||'mercy';
const cnt={}; let fsum=0,yrs=0;
for(let s=1;s<=N;s++){ RT.newGame({seed:s*7919,god,lang:'ja'}); RT.policy(pol); const G=RT.G(); RT.step(30000); const k=G.ending?G.ending.kind:'none'; cnt[k]=(cnt[k]||0)+1; fsum+=G.stats.faithSum/(G.stats.faithN||1); yrs+=yearOf(G.tick); }
console.log(process.env.TUNE||'{}',pol,JSON.stringify(cnt),'faith',(fsum/N).toFixed(0),'yr',(yrs/N).toFixed(1));
