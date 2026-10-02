/* perf: startup time, world-cache build time, average frame cost with 36 humans + monsters */
const puppeteer = require('puppeteer-core'); const path = require('path'), fs = require('fs');
const CHROME = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find(p => fs.existsSync(p));
(async () => {
  const br = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] }); const pg = await br.newPage(); await pg.setViewport({ width: 1280, height: 720 });
  const t0 = Date.now(); await pg.goto('file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/'), { waitUntil: 'load' }); await pg.waitForFunction(() => window.__RT && window.__RT.ui && __RT.ui.Game, { timeout: 10000 }); const loadMs = Date.now() - t0;
  const r = await pg.evaluate(() => {
    const t1 = performance.now(); for (let s = 0; s < 4; s++) getWorldCanvas(s); const worldMs = performance.now() - t1;
    __RT.newGame({ seed: 7, god: 'mercy', lang: 'ja' }); __RT.ui.Game.paused = true; __RT.ui.Game.scene = 'play';
    const G = __RT.G(); __RT.step(600); const R = __RT.ui.Render; R.centerOn(28, 21);
    const n = 240; const t2 = performance.now(); for (let i = 0; i < n; i++) R.draw(0.5, {}); const frameMs = (performance.now() - t2) / n;
    const t3 = performance.now(); for (let i = 0; i < n; i++) R.drawLabels(); const labMs = (performance.now() - t3) / n;
    return { worldMs, frameMs, labMs, humans: G.humans.filter(h => h.alive).length, monsters: G.monsters.filter(m => m.alive && !m.dormant).length };
  });
  console.log(JSON.stringify({ loadMs, ...r })); const ok = loadMs <= 1500 && r.frameMs < 8; console.log(ok ? 'PASS' : 'FAIL (startup <= 1500ms, frame < 8ms)'); await br.close(); process.exit(ok ? 0 : 1);
})();
