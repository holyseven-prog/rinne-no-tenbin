/* ================= palette ramps, recolor, auto shading + selective outline (V3.3 S1) ================= */
function hexRgb(h) { h = h.replace('#', ''); if (h.length === 3) h = h.split('').map(c => c + c).join(''); const n = parseInt(h.slice(0, 6), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
function rgbHex(r, g, b) { const f = v => ('0' + Math.max(0, Math.min(255, Math.round(v))).toString(16)).slice(-2); return '#' + f(r) + f(g) + f(b); }
function rgb2hsl(r, g, b) { r /= 255; g /= 255; b /= 255; const mx = Math.max(r, g, b), mn = Math.min(r, g, b); let h = 0, s = 0; const l = (mx + mn) / 2; if (mx !== mn) { const d = mx - mn; s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn); h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; } return [h, s, l]; }
function hsl2rgb(h, s, l) { h = ((h % 360) + 360) % 360; const c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = l - c / 2; let r = 0, g = 0, b = 0; if (h < 60) { r = c; g = x; } else if (h < 120) { r = x; g = c; } else if (h < 180) { g = c; b = x; } else if (h < 240) { g = x; b = c; } else if (h < 300) { r = x; b = c; } else { r = c; b = x; } return [(r + m) * 255, (g + m) * 255, (b + m) * 255]; }
function hueToward(h, target, deg) { let d = ((target - h + 540) % 360) - 180; if (Math.abs(d) <= deg) return target; return h + Math.sign(d) * deg; }
/* 4 steps + outline: dark = cooler (toward blue-violet), light = warmer (toward yellow) */
const RAMP_CACHE = {};
function mkRamp(hex) {
  if (RAMP_CACHE[hex]) return RAMP_CACHE[hex];
  const [r, g, b] = hexRgb(hex); const [h, s, l] = rgb2hsl(r, g, b);
  const mk = (hh, ss, ll) => rgbHex(...hsl2rgb(hh, Math.max(0, Math.min(1, ss)), Math.max(0, Math.min(1, ll))));
  const R = {
    o: mk(hueToward(h, 250, 26), s * 0.8, Math.max(0.06, l * 0.26)),
    d: mk(hueToward(h, 250, 16), s * 1.04, l * 0.68),
    b: hex.length === 4 ? rgbHex(r, g, b) : hex,
    l: mk(hueToward(h, 48, 12), s * 0.96, l + (1 - l) * 0.26),
    h: mk(hueToward(h, 48, 22), s * 0.85, l + (1 - l) * 0.56),
  };
  return (RAMP_CACHE[hex] = R);
}
/* material chars */
const SHADED = 'shctpbmwgau';
const FIXED_COL = { e: '#1c1626', r: '#c8665c', f: '#f6f2ee', L: '#8ae0ff', Q: '#e24848', N: '#38c46a', Y: '#ffe266', X: '#2a2236', W: '#ffffff', P: '#ff9ab8', K: '#5a4030', O: '#f0a040' };
function matColor(ch, lvl, ramps) {
  if (FIXED_COL[ch]) return FIXED_COL[ch];
  const R = ramps[ch]; if (!R) return null;
  return lvl >= 2 ? R.h : lvl === 1 ? R.l : lvl === 0 ? R.b : R.d;
}
/* grid: array of rows (arrays of chars). Auto-shade by run edges: light from top-left. */
function autoShade(grid, W, H) {
  const lv = []; for (let y = 0; y < H; y++) { lv.push(new Array(W).fill(0)); }
  const at = (x, y) => (x < 0 || y < 0 || x >= W || y >= H) ? '.' : grid[y][x];
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const ch = grid[y][x]; if (SHADED.indexOf(ch) < 0) continue;
    const up = at(x, y - 1) !== ch, dn = at(x, y + 1) !== ch, lf = at(x - 1, y) !== ch, rt = at(x + 1, y) !== ch;
    let v = 0;
    if (up && lf) v = 2; else if (up || lf) v = 1; if (rt && dn) v = -1; else if (rt || dn) v = v > 0 ? 0 : -1;
    // thin features (1px) stay base so they don't flicker
    if (up && dn || lf && rt) v = 0;
    lv[y][x] = v;
  }
  return lv;
}
/* bake grid -> canvas with selective outline (outer silhouette in a dark tone of the neighbour) */
function bakeGrid(grid, W, H, ramps, opts) {
  opts = opts || {}; const cv = mkCanvas(W, H), c = cv.getContext('2d');
  const lv = autoShade(grid, W, H); const col = []; const rgba = [];
  for (let y = 0; y < H; y++) { col.push([]); for (let x = 0; x < W; x++) { const ch = grid[y][x]; col[y].push(ch === '.' || ch === ' ' ? null : matColor(ch, lv[y][x], ramps)); } }
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (col[y][x]) { c.fillStyle = col[y][x]; c.fillRect(x, y, 1, 1); }
  if (opts.outline !== false) {
    const px = [];
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      if (col[y][x]) continue; const nb = [[0, 1], [-1, 0], [1, 0], [0, -1]]; let src = null;
      for (const [dx, dy] of nb) { const xx = x + dx, yy = y + dy; if (xx >= 0 && yy >= 0 && xx < W && yy < H && col[yy][xx]) { src = grid[yy][xx]; break; } }
      if (!src) continue;
      let base = ramps[src] ? ramps[src].o : '#1c1626'; if (FIXED_COL[src]) base = '#1c1626';
      px.push([x, y, base]);
    }
    px.forEach(p => { c.fillStyle = p[2]; c.fillRect(p[0], p[1], 1, 1); });
  }
  return cv;
}
/* layer helpers */
function emptyGrid(W, H) { const g = []; for (let y = 0; y < H; y++) g.push(new Array(W).fill('.')); return g; }
function blit(grid, rows, ox, oy, mirror) {
  rows.forEach((r, j) => { const y = oy + j; if (y < 0 || y >= grid.length) return; const full = mirror ? r + r.split('').reverse().join('') : r; for (let i = 0; i < full.length; i++) { const x = ox + i, ch = full[i]; if (ch === '.' || ch === ' ' || x < 0 || x >= grid[0].length) continue; grid[y][x] = ch; } });
}
function flipGrid(grid) { return grid.map(r => r.slice().reverse()); }
/* named colour sets used all over the game */
const SKIN_COL = ['#f4cfa8', '#d8a070', '#a87048'];
const HAIR_COL = ['#2a2630', '#6a4228', '#9a6a30', '#e0b858', '#c04830', '#a8a8b4', '#ece8f0', '#26356a'];
const CLOTH_COL = ['#c24a4a', '#4466c8', '#e6e6ee', '#2e7a46', '#9a7a42', '#8a56ac', '#d08a30', '#2e9a9a'];
const JOB_COLOR = { swordsman: '#b84646', mage: '#6a50c8', priest: '#eeeef6', thief: '#3a4a3c', farmer: '#b09458', merchant: '#d09a38', smith: '#868694', herbalist: '#3e9650', historian: '#3a4c88' };
const JOB_TRIM = { swordsman: '#e0d0a0', mage: '#e8c850', priest: '#e8c850', thief: '#6a5a40', farmer: '#7a5a38', merchant: '#8a5a2a', smith: '#5a3a28', herbalist: '#e8e0c0', historian: '#e8e0c0' };
