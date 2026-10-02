const puppeteer=require('puppeteer-core');const path=require('path'),fs=require('fs');
const CHROME=[process.env.CHROME_PATH,'C:/Program Files/Google/Chrome/Application/chrome.exe'].filter(Boolean).find(p=>fs.existsSync(p));
(async()=>{const br=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox']});const pg=await br.newPage();await pg.setViewport({width:1280,height:720});const logs=[];pg.on('pageerror',e=>logs.push(e.message));
await pg.goto('file:///'+path.resolve(__dirname,'../index.html').split(path.sep).join('/'));await new Promise(r=>setTimeout(r,700));await pg.mouse.click(640,360);await new Promise(r=>setTimeout(r,300));
await pg.evaluate(()=>{__RT.ui.Game.pendingGod='mercy';__RT.ui.Screens.opening();});await new Promise(r=>setTimeout(r,600));
await pg.evaluate(()=>{__RT.ui.Game.op.i=3;__RT.ui.Game.op.typed=0;});await new Promise(r=>setTimeout(r,1500));await pg.screenshot({path:path.join(__dirname,'out','visual','opening4.png')});console.log(logs);await br.close();})();
