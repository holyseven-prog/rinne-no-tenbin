/* 開頭畫面 v3: images are drawn 1:1; nine-slice frames keep their four corners identical to the delivered PNG at every size (no blur, no seams).
   node test/title_pixel.js */
const puppeteer = require('puppeteer-core'); const path = require('path'), fs = require('fs');
const CHROME = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find(p => fs.existsSync(p));
(async () => { const br = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] }); const pg = await br.newPage(); const logs = []; pg.on('pageerror', e => logs.push(e.message));
  await pg.goto('file:///' + path.resolve(__dirname, '../index.html').split(path.sep).join('/')); await new Promise(r => setTimeout(r, 2000));
  const r = await pg.evaluate(() => { const out = []; const pix = (cv, x, y, w, h) => cv.getContext('2d').getImageData(x, y, w, h).data;
    const src = k => { const im = ASSET_IMG[k + '.png']; const c = document.createElement('canvas'); c.width = im.width; c.height = im.height; c.getContext('2d').drawImage(im, 0, 0); return c; };
    ['bg/title_01_title_bg', 'logo/logo_jp', 'logo/logo_zh', 'card/god_1', 'card/mode_easy_selected', 'bg/op_03'].forEach(k => { const a = img3(k, 0, 0), b = src(k); const da = pix(a, 0, 0, a.width, a.height), db = pix(b, 0, 0, b.width, b.height); let d = 0; for (let i = 0; i < da.length; i++) if (da[i] !== db[i]) d++; out.push([k, '1:1 ' + a.width + 'x' + a.height, d]); });
    [['ui/title_menu_frame', 300, 330], ['ui/btn_menu_normal', 268, 64], ['ui/load_window', 1056, 616], ['ui/load_title_plate', 400, 56], ['ui/save_slot_filled', 464, 188], ['ui/settings_window', 920, 600], ['ui/ui_tab_selected', 160, 48], ['ui/ui_dialog_dark', 1216, 140], ['ui/ui_button_back', 160, 56], ['ui/ui_button_normal', 118, 48], ['ui/ui_slider_track', 320, 16]].forEach(([k, w, h]) => {
      const cv = nine3(k, w, h), s = src(k); const [T, R, B, L] = cut3(k + '.png'); let d = 0; const cmp = (ax, ay, bx, by, cw, ch) => { if (cw <= 0 || ch <= 0) return; const a = pix(cv, ax, ay, cw, ch), b = pix(s, bx, by, cw, ch); for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) { d++; break; } };
      cmp(0, 0, 0, 0, L, T); cmp(w - R, 0, s.width - R, 0, R, T); cmp(0, h - B, 0, s.height - B, L, B); cmp(w - R, h - B, s.width - R, s.height - B, R, B); out.push([k, 'nine ' + w + 'x' + h + ' corners', d]); });
    return out; });
  let fail = 0; r.forEach(([k, what, bad]) => { if (bad) fail++; console.log((bad ? 'FAIL ' : 'PASS ') + k + ' ' + what + (bad ? ' diff=' + bad : '')); });
  if (logs.length) { fail++; console.log('FAIL page errors', JSON.stringify(logs.slice(0, 3))); } await br.close(); process.exit(fail ? 1 : 0); })();
