/* UI v5 §8-5: art mockup (left) | game screenshot (right), each at 50 %, for SEVEN. Needs test/ui_v5.js + test/ui_v5_win.js shots first.
   node tools/v5_compare.js -> test/out/visual/ui_v5/compare_<scene>_<lang>.png */
const fs = require('fs'), path = require('path'); const { load, savePng } = require('./imgdata');
const PAIRS = [['hud', 'hud'], ['display', 'display'], ['zones_off', 'zones_off'], ['view', 'view'], ['council', 'council2'], ['report', 'report_crush']];
const D = 'test/out/visual/ui_v5';
(async () => { for (const lang of ['ja', 'zh']) for (const [m, g] of PAIRS) {
    const a = 'docs/ui_v5/mockup/' + m + '_' + lang + '.png', b = path.join(D, g + '_' + lang + '.png'); if (!fs.existsSync(a) || !fs.existsSync(b)) { console.log('skip', m, lang); continue; }
    const im = await load([a, b]); const A = im[a], B = im[b]; const W = 1280 + 16, H = 360; const out = new Uint8ClampedArray(W * H * 4).fill(255);
    const put = (S, ox) => { for (let y = 0; y < H; y++) for (let x = 0; x < 640; x++) { const sx = Math.min(S.w - 1, x * 2), sy = Math.min(S.h - 1, y * 2); const si = (sy * S.w + sx) * 4, di = (y * W + ox + x) * 4; out[di] = S.data[si]; out[di + 1] = S.data[si + 1]; out[di + 2] = S.data[si + 2]; out[di + 3] = 255; } };
    put(A, 0); put(B, 656); await savePng(path.join(D, 'compare_' + m + '_' + lang + '.png'), W, H, out); console.log('compare', m, lang); } })();
