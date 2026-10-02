const puppeteer=require('puppeteer-core');const path=require('path');
(async()=>{const br=await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:'new',args:['--no-sandbox']});const pg=await br.newPage();await pg.setViewport({width:1280,height:720});const logs=[];pg.on('pageerror',e=>logs.push(e.message));
await pg.evaluateOnNewDocument(()=>{try{localStorage.setItem('rinne_tenbin_v1_settings',JSON.stringify({bgm:0,se:0,speed:0,text:3,lang:'ja',names:'key',theme:'black',autoSlow:false,advisor:false,tutDone:true}));}catch(e){}});
await pg.goto('file:///'+path.resolve(__dirname,'../index.html').split(path.sep).join('/'));await new Promise(r=>setTimeout(r,700));await pg.mouse.click(640,360);await new Promise(r=>setTimeout(r,300));
await pg.evaluate(()=>{__RT.ui.Game.pendingGod='mercy';__RT.ui.Screens.opEnd();});await new Promise(r=>setTimeout(r,900));
const info=await pg.evaluate(()=>{const G=__RT.G(),U=__RT.ui;const h=G.humans.find(x=>x.alive&&!x.inside&&x.age>=16);U.Render.centerOn(h.x,h.y);U.Game.paused=true;U.Game.selId=h.id;U.Game.power='oracle';const R=U.Render;return{x:(h.x*16+8-R.cam.x)*2,y:(h.y*16-2-R.cam.y)*2,scene:U.Game.scene,modals:U.Game.modals.length};});
console.log(info);await new Promise(r=>setTimeout(r,300));await pg.mouse.click(info.x,info.y);await new Promise(r=>setTimeout(r,400));
console.log(await pg.evaluate(()=>({modals:__RT.ui.Game.modals.join(','),power:__RT.ui.Game.power,drag:!!__RT.ui.Game.drag,sel:__RT.ui.Game.selId,casts:__RT.G().stats.casts})),logs);await br.close();})();
