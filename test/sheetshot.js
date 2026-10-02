const puppeteer=require('puppeteer-core');const path=require('path'),fs=require('fs');
const CHROME=[process.env.CHROME_PATH,'C:/Program Files/Google/Chrome/Application/chrome.exe','/usr/bin/google-chrome'].filter(Boolean).find(p=>fs.existsSync(p));
(async()=>{const br=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox']});const pg=await br.newPage();await pg.setViewport({width:1600,height:900});const logs=[];pg.on('pageerror',e=>logs.push(e.message));
await pg.goto('file:///'+path.resolve(__dirname,'../index.html').split(path.sep).join('/'));await new Promise(r=>setTimeout(r,700));
const [fn,out,...args]=process.argv.slice(2);const u=await pg.evaluate((f,a)=>window[f](...a),fn,args.map(x=>isNaN(+x)?x:+x));fs.mkdirSync(path.join(__dirname,'out','visual'),{recursive:true});fs.writeFileSync(path.join(__dirname,'out','visual',out+'.png'),Buffer.from(u.split(',')[1],'base64'));console.log(logs);await br.close();})();
