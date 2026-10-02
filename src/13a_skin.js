/* ================= UI skin (V3.3 S5): 9-slice frames, hand cursor, pixel icons, portraits, pixel digits ================= */
function cvUrl(cv) { return cv.toDataURL('image/png'); }
/* ---------- 9-slice frame ---------- */
const FRAME_PAL = {
  black: { out: '#f2f4ff', mid: '#1a2260', in: '#5a6ad0', top: '#05060f', bot: '#0b1238', glassA: 0.93 },
  blue: { out: '#ffffff', mid: '#16227a', in: '#8fa0f0', top: '#0a1a6e', bot: '#10299a', glassA: 0.9 },
};
function mkFrame(theme, glass) {
  const P = FRAME_PAL[theme] || FRAME_PAL.black; const S = 6, N = S * 2 + 4; const cv = mkCanvas(N, N), c = cv.getContext('2d');
  const a = glass ? P.glassA : 1; const gr = c.createLinearGradient(0, 0, 0, N); gr.addColorStop(0, P.top); gr.addColorStop(1, P.bot);
  c.globalAlpha = a; c.fillStyle = gr; c.fillRect(0, 0, N, N); c.globalAlpha = 1;
  // clear then redraw ring layers; corners are cut (2px) for rounded pixel look
  c.clearRect(0, 0, N, N);
  c.globalAlpha = a; c.fillStyle = gr; c.fillRect(1, 1, N - 2, N - 2); c.globalAlpha = 1;
  const ring = (i, col) => { c.fillStyle = col; c.fillRect(i + 1, i, N - 2 * i - 2, 1); c.fillRect(i + 1, N - 1 - i, N - 2 * i - 2, 1); c.fillRect(i, i + 1, 1, N - 2 * i - 2); c.fillRect(N - 1 - i, i + 1, 1, N - 2 * i - 2); };
  ring(0, P.out); ring(1, P.out); ring(2, P.mid); ring(3, P.in);
  // inner corner pixels
  c.fillStyle = P.out; [[1, 1], [N - 2, 1], [1, N - 2], [N - 2, N - 2]].forEach(p => c.fillRect(p[0], p[1], 1, 1));
  c.fillStyle = P.in; [[3, 3], [N - 4, 3], [3, N - 4], [N - 4, N - 4]].forEach(p => c.fillRect(p[0], p[1], 1, 1));
  // faint bottom-edge highlight band
  c.globalAlpha = 0.18; c.fillStyle = '#fff'; c.fillRect(4, 4, N - 8, 1); c.globalAlpha = 1;
  return cvUrl(cv);
}
/* ---------- hand cursor (FF style, pointing right) ---------- */
function mkHand(frame) {
  const rows = ["................", "...oo...........", "..owwo..........", "..owwo..........", "..owwooooooooo..", "..owwwwwwwwwwwo.", "..owwwwwwwwwwwwo", "..owwwwoooooooo.", "..owwwwwwwwwwo..", "...owwwwwwwwo...", "...owwwwwwwo....", "....owwwwwwo....", "....ooooooo....."];
  const cv = mkCanvas(16, 16), c = cv.getContext('2d'); const dx = frame ? 1 : 0; const col = { o: '#1c1a40', w: '#f6f6ff' };
  rows.forEach((r, y) => { for (let x = 0; x < 16; x++) { const ch = r[x]; if (ch && ch !== '.') { c.fillStyle = col[ch]; c.fillRect(x - dx, y, 1, 1); } } });
  c.fillStyle = '#aab0e0'; [[3, 5], [3, 8], [5, 9], [8, 10]].forEach(p => c.fillRect(p[0] - dx, p[1], 1, 1)); c.fillRect(10 - dx, 6, 4, 1);
  return cvUrl(cv);
}
/* ---------- pixel digits 5x7 ---------- */
const DIG = { '0': ["01110", "10001", "10011", "10101", "11001", "10001", "01110"], '1': ["00100", "01100", "00100", "00100", "00100", "00100", "01110"], '2': ["01110", "10001", "00001", "00010", "00100", "01000", "11111"], '3': ["11110", "00001", "00001", "01110", "00001", "00001", "11110"], '4': ["00010", "00110", "01010", "10010", "11111", "00010", "00010"], '5': ["11111", "10000", "11110", "00001", "00001", "10001", "01110"], '6': ["00110", "01000", "10000", "11110", "10001", "10001", "01110"], '7': ["11111", "00001", "00010", "00100", "01000", "01000", "01000"], '8': ["01110", "10001", "10001", "01110", "10001", "10001", "01110"], '9': ["01110", "10001", "10001", "01111", "00001", "00010", "01100"], '/': ["00001", "00001", "00010", "00100", "01000", "10000", "10000"], '+': ["00000", "00100", "00100", "11111", "00100", "00100", "00000"], '-': ["00000", "00000", "00000", "11111", "00000", "00000", "00000"], ' ': ["00000", "00000", "00000", "00000", "00000", "00000", "00000"] };
const PXTEXT = {};
function pxText(str, color, sc) {
  sc = sc || 2; const key = str + '|' + color + '|' + sc; if (PXTEXT[key]) return PXTEXT[key];
  const n = str.length; const cv = mkCanvas(n * 6 * sc + sc, 9 * sc), c = cv.getContext('2d');
  for (let i = 0; i < n; i++) { const g = DIG[str[i]] || DIG[' ']; for (let y = 0; y < 7; y++) for (let x = 0; x < 5; x++) if (g[y][x] === '1') { c.fillStyle = '#000000cc'; c.fillRect((i * 6 + x + 1) * sc, (y + 1) * sc + sc, sc, sc); c.fillStyle = color; c.fillRect((i * 6 + x) * sc + sc, (y) * sc + sc, sc, sc); } }
  return (PXTEXT[key] = cvUrl(cv));
}
/* ---------- icons ---------- */
const ICON_CACHE = {};
function iconRamps(m) { const R = {}; for (const k in m) R[k] = mkRamp(m[k]); return R; }
const ICON_DEF = {
  /* powers */
  oracle: [{ c: '#f2e6c0', u: '#b89858', g: '#ffd860', t: '#8a6a3a' }, g => { rbox(g, 'u', 2, 3, 12, 2, true); rbox(g, 'u', 2, 12, 12, 2, true); rbox(g, 'c', 3, 4, 10, 9, true); [6, 8, 10].forEach(y => rbox(g, 't', 5, y, 6, 1, true)); gpx(g, 'g', 12, 1); gpx(g, 'g', 11, 2); gpx(g, 'g', 13, 2); gpx(g, 'g', 12, 3); gpx(g, 'g', 1, 7); gpx(g, 'g', 0, 8); gpx(g, 'g', 2, 8); }],
  grace: [{ c: '#ff7a9a', u: '#c0405e', g: '#ffe266', t: '#fff' }, g => { rbox(g, 'c', 2, 3, 5, 5); rbox(g, 'c', 9, 3, 5, 5); rbox(g, 'c', 3, 6, 10, 4); rbox(g, 'c', 5, 9, 6, 3); rbox(g, 'c', 7, 11, 2, 3); gpx(g, 't', 4, 4); gpx(g, 't', 5, 4); gpx(g, 'g', 13, 1); gpx(g, 'g', 12, 2); gpx(g, 'g', 14, 2); gpx(g, 'g', 13, 3); }],
  trial: [{ c: '#ffe44a', u: '#d09a10', g: '#fff', t: '#7a4ac8' }, g => { gline(g, 'c', 10, 1, 5, 7, 3); gline(g, 'c', 5, 7, 11, 7, 3); gline(g, 'c', 11, 7, 6, 14, 3); gpx(g, 'g', 9, 2); gpx(g, 'g', 8, 3); }],
  soul: [{ c: '#7ec8ff', u: '#3a78d8', g: '#fff', t: '#c8ecff' }, g => { rbox(g, 'c', 4, 3, 8, 8); rbox(g, 'c', 5, 11, 6, 2); rbox(g, 'c', 6, 13, 2, 2); rbox(g, 'c', 10, 12, 2, 2); gpx(g, 'u', 6, 6); gpx(g, 'u', 9, 6); gpx(g, 'u', 7, 8); gpx(g, 'u', 8, 8); rbox(g, 't', 5, 4, 3, 1, true); }],
  force: [{ c: '#d84a4a', u: '#8a2a2a', g: '#e8c860', w: '#8a5a30' }, g => { rbox(g, 'w', 3, 1, 2, 14, true); rbox(g, 'c', 5, 2, 8, 6); gpx(g, 'c', 13, 3); gpx(g, 'c', 13, 5); rbox(g, 'u', 5, 6, 8, 2, true); gpx(g, 'g', 3, 0); gpx(g, 'g', 4, 0); }],
  faith: [{ g: '#ffe266', u: '#c8941a', c: '#fff6c8' }, g => { rbox(g, 'g', 3, 2, 10, 2, true); rbox(g, 'g', 2, 3, 2, 3, true); rbox(g, 'g', 12, 3, 2, 3, true); rbox(g, 'c', 6, 6, 4, 4); rbox(g, 'c', 5, 9, 6, 5); gpx(g, 'u', 7, 7); gpx(g, 'u', 8, 7); }],
  scale: [{ g: '#e8c860', u: '#9a7a28', c: '#ffe9a0', m: '#9aa0b4' }, g => { rbox(g, 'm', 7, 3, 2, 11, true); rbox(g, 'u', 4, 13, 8, 2, true); rbox(g, 'g', 1, 4, 14, 2, true); rbox(g, 'c', 1, 8, 4, 2, true); rbox(g, 'c', 11, 8, 4, 2, true); gpx(g, 'u', 1, 6); gpx(g, 'u', 14, 6); gpx(g, 'u', 2, 7); gpx(g, 'u', 13, 7); }],
  /* jobs */
  swordsman: [{ m: '#cfd4e4', g: '#e0b838', w: '#8a5a30' }, g => { gline(g, 'm', 12, 2, 4, 10, 2); rbox(g, 'g', 2, 9, 5, 2, true); gline(g, 'g', 3, 10, 6, 8, 1); rbox(g, 'w', 2, 12, 2, 2, true); gpx(g, 'm', 13, 1); }],
  mage: [{ c: '#7a5ae0', u: '#4a30a0', g: '#ffd860', t: '#a890ff' }, g => { rbox(g, 'c', 4, 7, 8, 3, true); rbox(g, 'c', 6, 3, 4, 5, true); rbox(g, 'c', 7, 1, 2, 3, true); rbox(g, 'u', 2, 10, 12, 2, true); rbox(g, 'g', 5, 8, 6, 1, true); gpx(g, 't', 6, 4); }],
  priest: [{ g: '#ffe266', c: '#f4f4ff', u: '#b8b8d8' }, g => { rbox(g, 'g', 7, 1, 2, 13, true); rbox(g, 'g', 3, 5, 10, 2, true); rbox(g, 'u', 6, 12, 4, 2, true); }],
  thief: [{ m: '#cfd4e4', c: '#3a4a3c', u: '#222c24', g: '#e0b838' }, g => { rbox(g, 'c', 3, 3, 10, 9); rbox(g, 'u', 4, 6, 8, 3, true); gpx(g, 'g', 5, 7); gpx(g, 'g', 10, 7); gpx(g, 'g', 6, 7); gpx(g, 'g', 9, 7); gline(g, 'm', 13, 10, 10, 14, 1); }],
  farmer: [{ g: '#e8c040', u: '#a07818', w: '#8a5a30' }, g => { rbox(g, 'w', 7, 7, 2, 8, true); [[4, 3], [6, 1], [8, 1], [10, 3], [5, 5], [9, 5]].forEach(p => rbox(g, 'g', p[0], p[1], 2, 3)); gpx(g, 'u', 7, 6); gpx(g, 'u', 8, 6); }],
  merchant: [{ c: '#d09a38', u: '#8a6420', g: '#ffe266', w: '#8a5a30' }, g => { rbox(g, 'c', 3, 6, 10, 8); rbox(g, 'u', 5, 4, 6, 3, true); rbox(g, 'w', 4, 3, 8, 2, true); rbox(g, 'g', 6, 8, 4, 4); gpx(g, 'u', 8, 9); gpx(g, 'u', 8, 10); }],
  smith: [{ m: '#9aa2b8', u: '#5a6078', w: '#8a5a30' }, g => { rbox(g, 'w', 7, 6, 2, 9, true); rbox(g, 'm', 3, 2, 10, 5); rbox(g, 'u', 3, 6, 10, 1, true); gpx(g, 'm', 2, 3); gpx(g, 'm', 13, 3); }],
  herbalist: [{ c: '#4ac06a', u: '#2a8a44', t: '#c8f0c0', w: '#8a5a30' }, g => { rbox(g, 'c', 4, 2, 8, 8); gpx(g, 'c', 8, 1); rbox(g, 'u', 7, 3, 1, 8, true); rbox(g, 't', 5, 4, 2, 2, true); rbox(g, 'w', 7, 10, 2, 5, true); }],
  historian: [{ c: '#3a4c88', u: '#243060', t: '#f4ecd0', g: '#e8c860' }, g => { rbox(g, 'c', 2, 3, 12, 10); rbox(g, 't', 3, 4, 5, 8); rbox(g, 't', 9, 4, 4, 8); rbox(g, 'u', 8, 3, 1, 10, true); gline(g, 'g', 14, 1, 10, 6, 1); }],
  /* needs / prayer kinds */
  hunger: [{ c: '#d8a860', u: '#9a6a28', t: '#f4d890' }, g => { rbox(g, 'c', 2, 5, 12, 7); rbox(g, 't', 4, 4, 8, 2, true); rbox(g, 'u', 2, 11, 12, 1, true); [[5, 6], [8, 6], [11, 6]].forEach(p => gpx(g, 'u', p[0], p[1])); }],
  safety: [{ c: '#6a8ae0', u: '#3a50a0', g: '#e8c860' }, g => { rbox(g, 'c', 3, 2, 10, 8); rbox(g, 'c', 4, 9, 8, 3); rbox(g, 'c', 6, 11, 4, 3); rbox(g, 'g', 7, 3, 2, 8, true); rbox(g, 'g', 5, 5, 6, 2, true); }],
  wealth: [{ g: '#ffe266', u: '#c8941a', c: '#fff6c8' }, g => { rbox(g, 'u', 3, 3, 10, 10); rbox(g, 'g', 4, 4, 8, 8); rbox(g, 'c', 5, 5, 2, 2, true); gpx(g, 'u', 8, 6); gpx(g, 'u', 8, 7); gpx(g, 'u', 8, 8); gpx(g, 'u', 8, 9); }],
  belong: [{ c: '#ff7a9a', u: '#c0405e', t: '#ffc0d0' }, g => { rbox(g, 'c', 2, 3, 5, 5); rbox(g, 'c', 9, 3, 5, 5); rbox(g, 'c', 3, 6, 10, 4); rbox(g, 'c', 5, 9, 6, 3); rbox(g, 'c', 7, 11, 2, 3); }],
  honor: [{ g: '#ffe266', c: '#d84a4a', u: '#c8941a' }, g => { rbox(g, 'c', 5, 1, 2, 5, true); rbox(g, 'c', 9, 1, 2, 5, true); rbox(g, 'g', 4, 6, 8, 8); rbox(g, 'u', 7, 8, 2, 4, true); rbox(g, 'u', 6, 9, 4, 2, true); }],
  sick: [{ c: '#ff5a6a', u: '#a02a3a', t: '#fff' }, g => { rbox(g, 'c', 6, 2, 4, 12); rbox(g, 'c', 2, 6, 12, 4); rbox(g, 't', 7, 3, 1, 3, true); }],
  love: [{ c: '#ff7a9a', u: '#c0405e', t: '#ffc0d0' }, g => { rbox(g, 'c', 2, 3, 5, 5); rbox(g, 'c', 9, 3, 5, 5); rbox(g, 'c', 3, 6, 10, 4); rbox(g, 'c', 5, 9, 6, 3); rbox(g, 'c', 7, 11, 2, 3); gpx(g, 't', 4, 4); gpx(g, 't', 5, 4); }],
  battle: [{ m: '#cfd4e4', g: '#e0b838', w: '#8a5a30' }, g => { gline(g, 'm', 13, 2, 3, 12, 2); gline(g, 'm', 3, 2, 13, 12, 2); rbox(g, 'g', 2, 11, 3, 2, true); rbox(g, 'g', 11, 11, 3, 2, true); }],
  revenge: [{ c: '#ff7a30', u: '#c03a10', t: '#ffe266' }, g => { rbox(g, 'c', 4, 5, 8, 9); rbox(g, 'c', 6, 2, 4, 5); gpx(g, 'c', 7, 1); rbox(g, 't', 6, 8, 4, 5); rbox(g, 'u', 4, 12, 8, 2, true); }],
  forgive: [{ c: '#f4f4ff', u: '#b8c0e0', g: '#6ac06a' }, g => { rbox(g, 'c', 4, 5, 7, 5); rbox(g, 'c', 9, 3, 4, 3); rbox(g, 'c', 2, 8, 4, 3); gline(g, 'u', 11, 6, 15, 4, 1); gpx(g, 'e', 11, 4); rbox(g, 'g', 3, 11, 9, 1, true); gpx(g, 'g', 3, 12); gpx(g, 'g', 6, 12); gpx(g, 'g', 9, 12); }],
  birth: [{ c: '#fff2d0', u: '#d8b878', t: '#ffc0d0' }, g => { rbox(g, 'c', 4, 2, 8, 12); rbox(g, 'u', 4, 8, 8, 1, true); gpx(g, 't', 7, 4); gpx(g, 't', 8, 5); gpx(g, 't', 6, 11); gpx(g, 't', 9, 11); }],
  fear: [{ c: '#cfc8f0', u: '#8a80c0', t: '#fff' }, g => { rbox(g, 'c', 3, 2, 10, 9); for (let x = 3; x < 13; x += 2) rbox(g, 'c', x, 11, 1, 3, true); gpx(g, 'e', 6, 6); gpx(g, 'e', 6, 7); gpx(g, 'e', 9, 6); gpx(g, 'e', 9, 7); rbox(g, 'u', 7, 9, 2, 1, true); }],
  /* events */
  death: [{ c: '#e8e4d4', u: '#a8a490' }, g => { rbox(g, 'c', 3, 2, 10, 8); rbox(g, 'c', 5, 9, 6, 3); gpx(g, 'e', 5, 5); gpx(g, 'e', 6, 5); gpx(g, 'e', 5, 6); gpx(g, 'e', 6, 6); gpx(g, 'e', 9, 5); gpx(g, 'e', 10, 5); gpx(g, 'e', 9, 6); gpx(g, 'e', 10, 6); [6, 8, 10].forEach(x => gpx(g, 'e', x, 11)); }],
  marriage: [{ g: '#ffe266', u: '#c8941a', c: '#9ae0ff' }, g => { rbox(g, 'g', 3, 6, 10, 8); rbox(g, '.', 5, 8, 6, 4, true); for (let y = 8; y < 12; y++) for (let x = 5; x < 11; x++) gpx(g, '.', x, y); rbox(g, 'c', 6, 2, 4, 4); gpx(g, 'c', 8, 1); }],
  quest: [{ c: '#f2e6c0', u: '#b89858', g: '#d84a4a', t: '#8a6a3a' }, g => { rbox(g, 'c', 2, 2, 12, 12); rbox(g, 'u', 2, 2, 12, 1, true); rbox(g, 'g', 4, 4, 2, 6, true); gpx(g, 'g', 4, 12); gpx(g, 'g', 5, 12); rbox(g, 't', 8, 5, 4, 1, true); rbox(g, 't', 8, 8, 4, 1, true); }],
  boss: [{ g: '#ffe266', u: '#c8941a', c: '#8a30c0' }, g => { rbox(g, 'g', 2, 6, 12, 7); [2, 6, 10].forEach(x => rbox(g, 'g', x, 3, 2, 4, true)); rbox(g, 'c', 7, 8, 2, 3, true); rbox(g, 'u', 2, 12, 12, 1, true); }],
  raid: [{ c: '#a04a4a', u: '#5a1a2a', t: '#f4f0e8' }, g => { gline(g, 'c', 2, 2, 8, 12, 3); gline(g, 'c', 6, 2, 11, 12, 3); gline(g, 'c', 10, 2, 14, 12, 2); [[8, 12], [11, 12], [14, 12]].forEach(p => gpx(g, 't', p[0], p[1] + 1)); }],
  divine: [{ g: '#ffe266', c: '#fffbe0', u: '#d09a10' }, g => { rbox(g, 'c', 7, 1, 2, 14, true); rbox(g, 'c', 1, 7, 14, 2, true); rbox(g, 'g', 5, 5, 6, 6); rbox(g, 'c', 7, 7, 2, 2, true); }],
  town: [{ c: '#d84a3a', u: '#9a2a2a', t: '#f0d8a0', w: '#8a5a30' }, g => { for (let r = 0; r < 5; r++) rbox(g, 'c', 8 - 2 - r * 1, 2 + r, 4 + r * 2, 1, true); rbox(g, 't', 3, 7, 10, 7); rbox(g, 'w', 7, 10, 3, 4, true); rbox(g, 'u', 4, 8, 2, 2, true); }],
};
function iconCanvas(name) {
  if (ICON_CACHE[name]) return ICON_CACHE[name]; const d = ICON_DEF[name]; if (!d) return null;
  const g = emptyGrid(16, 16); d[1](g); const cv = bakeGrid(g, 16, 16, iconRamps(d[0])); ICON_CACHE[name] = cv; return cv;
}
function iconUrl(name) { const cv = iconCanvas(name); return cv ? (cv._u || (cv._u = cvUrl(cv))) : ''; }
function Ico(name, size) { const s = size || 16; const e = document.createElement('span'); e.className = 'ico'; e.style.cssText = `display:inline-block;width:${s}px;height:${s}px;background:url(${iconUrl(name)}) center/${s}px ${s}px no-repeat;image-rendering:pixelated;vertical-align:middle;flex:none`; return e; }
/* ---------- portraits: Scale3x on the 16x16 head+shoulders crop, shaded + outlined at 48x48 ---------- */
function scale3x(src) {
  const H = src.length, W = src[0].length; const at = (x, y) => (x < 0 || y < 0 || x >= W || y >= H) ? '.' : src[y][x]; const out = emptyGrid(W * 3, H * 3);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const A = at(x - 1, y - 1), B = at(x, y - 1), C = at(x + 1, y - 1), D = at(x - 1, y), E = at(x, y), F = at(x + 1, y), G = at(x - 1, y + 1), Hh = at(x, y + 1), I = at(x + 1, y + 1);
    let e = [E, E, E, E, E, E, E, E, E];
    if (B !== Hh && D !== F) {
      e[0] = D === B ? D : E; e[1] = (D === B && E !== C) || (B === F && E !== A) ? B : E; e[2] = B === F ? F : E;
      e[3] = (D === B && E !== G) || (D === Hh && E !== A) ? D : E; e[4] = E; e[5] = (B === F && E !== I) || (Hh === F && E !== C) ? F : E;
      e[6] = D === Hh ? D : E; e[7] = (D === Hh && E !== I) || (Hh === F && E !== G) ? Hh : E; e[8] = Hh === F ? F : E;
    }
    for (let k = 0; k < 9; k++) out[y * 3 + (k / 3 | 0)][x * 3 + (k % 3)] = e[k];
  }
  return out;
}
const PORTRAIT_CACHE = {};
function portraitCanvas(h) {
  const L = h.look, key = [h.job, L.hair, L.style, L.skin, L.cloth, h.age < ADULT_AGE ? 1 : 0, h.age >= 56 ? 1 : 0, h.sex].join('.'); if (PORTRAIT_CACHE[key]) return PORTRAIT_CACHE[key];
  const grid = humanGrid(h, 0, 0); const child = h.age < ADULT_AGE; const y0 = child ? 6 : 1; const crop = []; for (let y = y0; y < y0 + 16; y++) crop.push(grid[y].slice());
  // drop held items and arm pixels so only head, hair, hat and shoulders remain
  for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) { if (x < 2 || x > 13) crop[y][x] = '.'; }
  const big = scale3x(crop); const cv = bakeGrid(big, 48, 48, humanRamps(h)); PORTRAIT_CACHE[key] = cv; return cv;
}
function portraitEl(h, size) { const s = size || 48; const cv = document.createElement('canvas'); cv.width = 48; cv.height = 48; cv.getContext('2d').drawImage(portraitCanvas(h), 0, 0); cv.style.cssText = `width:${s}px;height:${s}px;image-rendering:pixelated;background:linear-gradient(#222a5a,#0c1030);border:2px solid #f2f4ff;box-sizing:content-box`; return cv; }
/* ---------- skin install ---------- */
const UISkin = {
  hand: [null, null], tick: 0,
  apply(theme) {
    if (typeof document === 'undefined') return; theme = theme === 'blue' ? 'blue' : 'black';
    let st = document.getElementById('skinCss'); if (!st) { st = document.createElement('style'); st.id = 'skinCss'; document.head.appendChild(st); }
    const f = mkFrame(theme, false), fg = mkFrame(theme, true); this.hand = [mkHand(0), mkHand(1)];
    st.textContent = `
.win{border:6px solid transparent;border-image:url(${f}) 6 fill stretch;border-radius:0;background:none;box-shadow:none;padding:3px 7px;image-rendering:pixelated}
.win.glass{border-image:url(${fg}) 6 fill stretch}
body.theme-blue .win{border-radius:0}
.win h3{margin:-3px -7px 4px;padding:2px 8px;border-bottom:1px solid var(--edge2);background:linear-gradient(90deg,rgba(60,80,190,.55),rgba(20,30,110,.05));text-shadow:1px 1px 0 #000,-1px 0 0 #000,0 -1px 0 #000;letter-spacing:1px}
.btn{border:2px solid var(--edge);border-radius:0;box-shadow:inset 0 -2px 0 rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.25);image-rendering:pixelated;clip-path:polygon(0 2px,2px 2px,2px 0,calc(100% - 2px) 0,calc(100% - 2px) 2px,100% 2px,100% calc(100% - 2px),calc(100% - 2px) calc(100% - 2px),calc(100% - 2px) 100%,2px 100%,2px calc(100% - 2px),0 calc(100% - 2px))}
.btn:active{transform:translateY(1px);box-shadow:inset 0 2px 0 rgba(0,0,0,.45)}
.btn:hover,.btn.sel{box-shadow:inset 0 -2px 0 rgba(0,0,0,.45),0 0 0 1px var(--head)}
.card{border-radius:0;background:linear-gradient(var(--card),var(--card2));image-rendering:pixelated}
.card.fresh{animation:cardflash .55s steps(4) 1}
@keyframes cardflash{0%{filter:brightness(3)}50%{filter:brightness(1.8)}100%{filter:none}}
.winopen{animation:winopen .15s steps(6) 1}
@keyframes winopen{from{transform:scale(.7,.08);opacity:.2}to{transform:scale(1,1);opacity:1}}
body{cursor:url(${this.hand[0]}) 15 6,auto}
.btn,.card,.win .btn{cursor:var(--hand,url(${this.hand[0]}) 15 6),pointer}
#game{cursor:grab}
.gauge{border-radius:0;image-rendering:pixelated}
.title-logo{text-shadow:0 0 18px #6a8aff,3px 3px 0 #000,-3px -3px 0 #000,3px -3px 0 #000,-3px 3px 0 #000,0 7px 0 #000}
.pxn{image-rendering:pixelated;vertical-align:middle}
`;
    document.body.style.setProperty('--hand', `url(${this.hand[0]}) 15 6`);
  },
  anim(dt) { this.tick += dt; const k = (this.tick * 3) % 2 < 1 ? 0 : 1; if (this._k !== k && this.hand[0]) { this._k = k; document.body.style.setProperty('--hand', `url(${this.hand[k]}) 15 6`); } },
};
/* pixel digits in HUD numbers */
UI.pxSet = function (el, str, color, sc) { if (!el) return; const k = str + '|' + color; if (el._pk === k) return; el._pk = k; el.textContent = ''; const im = document.createElement('img'); im.className = 'pxn'; im.src = pxText(str, color, sc || 2); im.style.height = (9 * (sc || 2) / 2) + 'px'; im.style.width = 'auto'; el.appendChild(im); };
/* metal balance scale with swinging pans */
UI.drawBalance = function () {
  const cv = this.el.balCv, c = cv.getContext('2d'); c.clearRect(0, 0, 220, 54);
  const swing = Math.sin(performance.now() / 700) * 0.012; const ang = -G.balance / 100 * 0.25 + swing; const cx = 110, cy = 17, L = 72;
  const M = mkRamp('#c8a850'), D = mkRamp('#8a92a8');
  // pillar + base
  fr(c, D.o, cx - 3, cy, 6, 36); fr(c, D.b, cx - 2, cy + 1, 4, 34); fr(c, D.l, cx - 2, cy + 1, 1, 34); fr(c, D.d, cx + 1, cy + 1, 1, 34);
  fr(c, D.o, cx - 15, 49, 30, 5); fr(c, D.b, cx - 14, 50, 28, 3); fr(c, D.l, cx - 14, 50, 28, 1); fr(c, D.d, cx - 14, 52, 28, 1); fr(c, D.o, cx - 8, 45, 16, 5); fr(c, D.b, cx - 7, 46, 14, 3); fr(c, D.l, cx - 7, 46, 14, 1);
  const lx = cx - Math.cos(ang) * L, ly = cy - Math.sin(ang) * L, rx = cx + Math.cos(ang) * L, ry = cy + Math.sin(ang) * L;
  // beam (3 tones, thick)
  const beam = (th, col) => { c.strokeStyle = col; c.lineWidth = th; c.beginPath(); c.moveTo(lx, ly); c.lineTo(rx, ry); c.stroke(); };
  beam(7, M.o); beam(5, M.d); beam(3, M.b); c.translate(0, -1); beam(1, M.h); c.translate(0, 1);
  c.fillStyle = M.o; c.beginPath(); c.arc(cx, cy, 5, 0, 7); c.fill(); c.fillStyle = M.l; c.beginPath(); c.arc(cx, cy, 3.5, 0, 7); c.fill(); c.fillStyle = M.h; c.fillRect(cx - 2, cy - 2, 2, 2);
  const pan = (x, y, kind) => {
    c.strokeStyle = M.d; c.lineWidth = 1; c.beginPath(); c.moveTo(x, y); c.lineTo(x - 15, y + 15); c.moveTo(x, y); c.lineTo(x + 15, y + 15); c.stroke();
    fr(c, M.o, x - 17, y + 14, 35, 5); fr(c, M.b, x - 16, y + 15, 33, 3); fr(c, M.h, x - 15, y + 15, 12, 1); fr(c, M.d, x - 14, y + 17, 30, 1);
    c.fillStyle = M.o; c.beginPath(); c.arc(x, y, 2.5, 0, 7); c.fill(); c.fillStyle = M.h; c.fillRect(x - 1, y - 1, 1, 1);
    // symbol sitting on the pan: sun (light) or crescent moon (dark)
    const ox = x, oy = y + 5; const t = performance.now() / 1000;
    if (kind === 'L') {
      for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 + t * 0.5, r0 = 7, r1 = i % 2 ? 9 : 11; c.strokeStyle = '#ffb830'; c.lineWidth = 2; c.beginPath(); c.moveTo(ox + Math.cos(a) * r0, oy + Math.sin(a) * r0); c.lineTo(ox + Math.cos(a) * r1, oy + Math.sin(a) * r1); c.stroke(); }
      c.fillStyle = '#9a5a10'; c.beginPath(); c.arc(ox, oy, 6.5, 0, 7); c.fill(); c.fillStyle = '#ffc83a'; c.beginPath(); c.arc(ox, oy, 5.5, 0, 7); c.fill(); c.fillStyle = '#fff2a0'; c.beginPath(); c.arc(ox - 1, oy - 1, 3.6, 0, 7); c.fill(); c.fillStyle = '#fff'; c.fillRect(ox - 3, oy - 3, 2, 2);
    } else {
      c.fillStyle = '#2a104a'; c.beginPath(); c.arc(ox, oy, 7.5, 0, 7); c.fill(); c.fillStyle = '#c8a0ff'; c.beginPath(); c.arc(ox, oy, 6.5, 0, 7); c.fill(); c.fillStyle = '#e8d4ff'; c.beginPath(); c.arc(ox - 1, oy - 1, 5, 0, 7); c.fill();
      c.globalCompositeOperation = 'destination-out'; c.beginPath(); c.arc(ox + 3.5, oy - 1.5, 5.6, 0, 7); c.fill(); c.globalCompositeOperation = 'source-over';
      c.fillStyle = '#e8d4ff'; c.fillRect(ox + 6, oy - 7 + Math.round(Math.sin(t * 3) * 1), 2, 2); c.fillRect(ox + 9, oy - 2, 1, 1);
    }

  };
  pan(lx, ly, 'L'); pan(rx, ry, 'D');
};
