const fs=require('fs'),path=require('path');
const dir=path.join(__dirname,'src');
const files=fs.readdirSync(dir).filter(f=>f.endsWith('.js')).sort();
const simFiles=files.filter(f=>parseInt(f)<=10);
const cat=l=>l.map(f=>'/* ---- '+f+' ---- */\n'+fs.readFileSync(path.join(dir,f),'utf8')).join('\n');
fs.writeFileSync(path.join(__dirname,'test','sim_bundle.js'),cat(simFiles));
// title / UI images delivered by the visual team (視覺總指示書 part 2): runtime PNGs only, as data URLs, before every other script.
// Not in sim_bundle. Not the mockups, sources, SVGs or the logo versions with the balance (kept for other uses).
const ADIR=path.join(__dirname,'assets','design','title');
const assetKeys=[];
if(fs.existsSync(ADIR)){
  for(const sub of ['title','ui','save','settings','mode','god','opening']){ const d=path.join(ADIR,sub); if(!fs.existsSync(d)) continue;
    for(const f of fs.readdirSync(d).filter(f=>f.endsWith('.png')).sort()){ if(sub==='title'&&/^title_logo_(ja|zh)\.png$/.test(f)) continue; assetKeys.push(sub+'/'+f); } }
}
const assetsJs='const ASSETS = {\n'+assetKeys.map(k=>JSON.stringify(k)+': "data:image/png;base64,'+fs.readFileSync(path.join(ADIR,k)).toString('base64')+'"').join(',\n')+'\n};\n';
const head=fs.existsSync(path.join(dir,'head.html'))?fs.readFileSync(path.join(dir,'head.html'),'utf8'):null;
if(head){
  const js='/* ---- ASSETS (build.js) ---- */\n'+assetsJs+cat(files);
  fs.writeFileSync(path.join(__dirname,'index.html'),head.replace('/*__SCRIPT__*/',()=>js));
  console.log('index.html',fs.statSync(path.join(__dirname,'index.html')).size,'assets',assetKeys.length,Math.round(assetsJs.length/1024)+'KB');
}
console.log('built sim',simFiles.length,'files');
