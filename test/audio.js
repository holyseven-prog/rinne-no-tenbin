const puppeteer = require('puppeteer-core');
const path = require('path');
const URL = 'file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/');
(async () => {
  const br = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', args: ['--autoplay-policy=no-user-gesture-required', '--no-sandbox'] });
  const pg = await br.newPage(); const logs = [];
  pg.on('console', m => { if (m.type() === 'error') logs.push(m.text()); }); pg.on('pageerror', e => logs.push('pageerror: ' + e.message));
  await pg.goto(URL); await new Promise(r => setTimeout(r, 600));
  const res = await pg.evaluate(async () => {
    const Snd = __RT.ui.Snd; const out = {};
    const names = Object.keys(SONGS);
    for (const n of names) {
      const off = new OfflineAudioContext(2, 44100 * 14, 44100); Snd.ctx = null; Snd.active = 0; Snd.init(off);
      const sp = SONGS[n]; const song = composeSong(sp); const spb = 60 / sp.bpm; const sb = off.createGain(); sb.connect(Snd.bgmBus); let cnt = 0;
      for (const e of song.ev) { const t = e.b * spb; if (t > 12) break; Snd.play(e.i, e.n || 60, t, Math.max(0.08, e.d * spb), e.v, sb); cnt++; }
      const buf = await off.startRendering(); const d = buf.getChannelData(0); let pk = 0, ss = 0; for (let i = 0; i < d.length; i++) { const v = Math.abs(d[i]); if (v > pk) pk = v; ss += d[i] * d[i]; }
      out[n] = { notes: cnt, beats: song.beats, secs: +(song.beats * spb).toFixed(1), peak: +pk.toFixed(3), rms: +Math.sqrt(ss / d.length).toFixed(4), loop: song.loop };
    }
    const ses = ['cursor', 'ok', 'cancel', 'pray', 'power1', 'power2', 'power3', 'power4', 'power5', 'success', 'crit', 'twist', 'fail', 'hit', 'level', 'reincarnate', 'awaken', 'page', 'victory', 'defeat'];
    for (const n of ses) {
      const off = new OfflineAudioContext(2, 44100 * 5, 44100); Snd.ctx = null; Snd.active = 0; Snd.muted = false; Snd.init(off); Snd.se(n);
      const buf = await off.startRendering(); const d = buf.getChannelData(0); let pk = 0, ss = 0; for (let i = 0; i < d.length; i++) { const v = Math.abs(d[i]); if (v > pk) pk = v; ss += d[i] * d[i]; }
      out['se_' + n] = { peak: +pk.toFixed(3), rms: +Math.sqrt(ss / d.length).toFixed(4) };
    }
    return out;
  });
  for (const k in res) console.log(k.padEnd(14), JSON.stringify(res[k]));
  console.log('errors', JSON.stringify(logs));
  await br.close();
})().catch(e => { console.error('FAIL', e); process.exit(1); });
