const puppeteer=require('puppeteer-core');const fs=require('fs'),path=require('path');
(async()=>{const br=await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:'new',args:['--no-sandbox']});const pg=await br.newPage();await pg.setViewport({width:1600,height:900});const logs=[];pg.on('pageerror',e=>logs.push(e.message));
await pg.goto('file:///'+path.resolve('index.html').split(path.sep).join('/'));await new Promise(r=>setTimeout(r,700));
const [sea,x,y,w,h,sc,name]=process.argv.slice(2);const u=await pg.evaluate((a)=>window.__sheetWorld(...a),[+sea,+x,+y,+w,+h,+sc]);fs.writeFileSync('test/out/visual/'+name+'.png',Buffer.from(u.split(',')[1],'base64'));console.log(logs);await br.close();})();
