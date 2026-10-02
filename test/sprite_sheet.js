/* sprite_sheet: renders contact sheets (characters / terrain / buildings / UI) into test/out/visual */
const puppeteer = require('puppeteer-core'); const path = require('path'), fs = require('fs');
const URL = 'file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/');
const CHROME = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find(p => fs.existsSync(p));
const only = process.argv[2] || 'all'; const OUT = path.join(__dirname, 'out', 'visual'); fs.mkdirSync(OUT, { recursive: true });
(async () => {
  const br = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] }); const pg = await br.newPage(); await pg.setViewport({ width: 1600, height: 900 });
  const logs = []; pg.on('pageerror', e => logs.push('pageerror ' + e.message)); pg.on('console', m => { if (m.type() === 'error') logs.push(m.text()); });
  await pg.goto(URL); await new Promise(r => setTimeout(r, 700));
  const save = async (name, fnName, ...args) => { const url = await pg.evaluate((f, a) => window[f](...a), fnName, args); fs.writeFileSync(path.join(OUT, name + '.png'), Buffer.from(url.split(',')[1], 'base64')); console.log('wrote', name); };
  if (only === 'all' || only === 'chars') await save('characters', '__sheetChars');
  if (only === 'all' || only === 'kids') await save('characters_states', '__sheetStates');
  if (only === 'all' || only === 'mon') await save('monsters', '__sheetMonsters');
  console.log('errors', JSON.stringify(logs)); await br.close();
})();
