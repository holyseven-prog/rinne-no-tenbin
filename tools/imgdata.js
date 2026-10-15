// helper: decode a PNG to {w,h,data(Uint8 RGBA)} / save RGBA as PNG, via headless Chrome (no npm image libs needed)
const puppeteer = (() => { const pth = require('path'); for (const p of [process.env.PUPPETEER_CORE, 'puppeteer-core', pth.join(__dirname, '..', 'test', 'node_modules', 'puppeteer-core'), pth.join(__dirname, 'node_modules', 'puppeteer-core')]) { if (!p) continue; try { return require(p); } catch (e) { } } throw new Error('puppeteer-core not found: run npm i puppeteer-core in test/ or set PUPPETEER_CORE'); })(); const fs = require('fs');
const CHROME = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find(p => fs.existsSync(p));
async function load(files) {
  const br = await puppeteer.launch({ executablePath: CHROME, headless: 'new' }); const pg = await br.newPage(); const out = {};
  for (const f of files) { const u = 'data:image/png;base64,' + fs.readFileSync(f).toString('base64');
    const r = await pg.evaluate(async u => { const i = new Image(); await new Promise(res => { i.onload = res; i.src = u; }); const c = document.createElement('canvas'); c.width = i.width; c.height = i.height; const g = c.getContext('2d'); g.drawImage(i, 0, 0); const d = g.getImageData(0, 0, i.width, i.height).data; let s = ''; for (let k = 0; k < d.length; k += 32768) s += String.fromCharCode.apply(null, d.subarray(k, k + 32768)); return { w: i.width, h: i.height, b64: btoa(s) }; }, u);
    out[f] = { w: r.w, h: r.h, data: new Uint8Array(Buffer.from(r.b64, 'base64')) }; }
  await br.close(); return out;
}
async function savePng(file, w, h, rgba) {
  const br = await puppeteer.launch({ executablePath: CHROME, headless: 'new' }); const pg = await br.newPage(); const b64 = Buffer.from(rgba).toString('base64');
  const d = await pg.evaluate((w, h, b64) => { const bin = atob(b64); const arr = new Uint8ClampedArray(bin.length); for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i); const c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d'); const im = g.createImageData(w, h); im.data.set(arr); g.putImageData(im, 0, 0); return c.toDataURL(); }, w, h, b64);
  fs.writeFileSync(file, Buffer.from(d.split(',')[1], 'base64')); await br.close();
}
module.exports = { load, savePng };
