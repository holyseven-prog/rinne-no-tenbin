// node test/crop.js in.png out.png x y w h [scale]
const puppeteer = require('puppeteer-core'); const fs = require('fs');
(async () => { const [inp, out, x, y, w, h, sc] = process.argv.slice(2); const br = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new' }); const pg = await br.newPage();
  const u = 'data:image/png;base64,' + fs.readFileSync(inp).toString('base64');
  const d = await pg.evaluate(async (u, x, y, w, h, sc) => { const i = new Image(); await new Promise(r => { i.onload = r; i.src = u; }); const c = document.createElement('canvas'); c.width = w * sc; c.height = h * sc; const g = c.getContext('2d'); g.imageSmoothingEnabled = false; g.drawImage(i, x, y, w, h, 0, 0, w * sc, h * sc); return c.toDataURL(); }, u, +x, +y, +w, +h, +(sc || 1));
  fs.writeFileSync(out, Buffer.from(d.split(',')[1], 'base64')); await br.close(); })();
