const fs=require('fs'),path=require('path');
const dir=path.join(__dirname,'src');
const files=fs.readdirSync(dir).filter(f=>f.endsWith('.js')).sort();
const simFiles=files.filter(f=>parseInt(f)<=10);
const cat=l=>l.map(f=>'/* ---- '+f+' ---- */\n'+fs.readFileSync(path.join(dir,f),'utf8')).join('\n');
fs.writeFileSync(path.join(__dirname,'test','sim_bundle.js'),cat(simFiles));
const head=fs.existsSync(path.join(dir,'head.html'))?fs.readFileSync(path.join(dir,'head.html'),'utf8'):null;
if(head){
  const js=cat(files);
  fs.writeFileSync(path.join(__dirname,'index.html'),head.replace('/*__SCRIPT__*/',()=>js));
  console.log('index.html',fs.statSync(path.join(__dirname,'index.html')).size);
}
console.log('built sim',simFiles.length,'files');
