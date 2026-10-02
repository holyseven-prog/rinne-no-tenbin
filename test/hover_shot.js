const puppeteer=require('puppeteer-core');const path=require('path'),fs=require('fs');
const CHROME=[process.env.CHROME_PATH,'C:/Program Files/Google/Chrome/Application/chrome.exe'].filter(Boolean).find(p=>fs.existsSync(p));
const [name,lang,x,y]=process.argv.slice(2);
(async()=>{const br=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox']});const pg=await br.newPage();await pg.setViewport({width:1280,height:720});
await pg.evaluateOnNewDocument(l=>{try{localStorage.setItem('rinne_tenbin_v1_settings',JSON.stringify({bgm:0,se:0,speed:0,text:3,lang:l,names:'key',theme:'black',autoSlow:false,advisor:false,tutDone:true}));}catch(e){}},lang||'ja');
await pg.goto('file:///'+path.resolve(__dirname,'../index.html').split(path.sep).join('/'));await new Promise(r=>setTimeout(r,700));await pg.mouse.click(640,360);await new Promise(r=>setTimeout(r,300));
await pg.evaluate(()=>{__RT.ui.Game.pendingGod='mercy';__RT.ui.Screens.opEnd();});await new Promise(r=>setTimeout(r,900));await pg.evaluate(()=>{__RT.ui.Game.paused=true;});
await pg.mouse.move(+x,+y);await new Promise(r=>setTimeout(r,700));await pg.screenshot({path:path.join(__dirname,'out','visual',name+'.png')});await br.close();})();
