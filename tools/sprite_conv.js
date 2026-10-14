/* shared: crop (RGBA) -> W x H pixel-art grid: dominant-colour blocks (dark outline pixels down-weighted), k-means palette, 1px #181020 outline */
const lum = c => (0.3 * c[0] + 0.59 * c[1] + 0.11 * c[2]) / 255;
const d2 = (a, b) => (a[0] - b[0]) ** 2 * 0.3 + (a[1] - b[1]) ** 2 * 0.59 + (a[2] - b[2]) ** 2 * 0.11;
function convert(c, W, H, K, opt) {
  opt = opt || {}; const src = Buffer.from(c.rgba, 'base64'); const fit = Math.max(c.w / (W - 2), c.h / (H - 2)); const ow = Math.max(1, Math.round(c.w / fit)), oh = Math.max(1, Math.round(c.h / fit)); const g = [];
  for (let oy = 0; oy < oh; oy++) { const row = []; for (let ox = 0; ox < ow; ox++) {
    const sx0 = Math.floor(ox * c.w / ow), sx1 = Math.max(sx0 + 1, Math.floor((ox + 1) * c.w / ow)), sy0 = Math.floor(oy * c.h / oh), sy1 = Math.max(sy0 + 1, Math.floor((oy + 1) * c.h / oh)); const bins = {}; let fg = 0, tot = 0;
    for (let y = sy0; y < sy1; y++) for (let x = sx0; x < sx1; x++) { tot++; const i = (y * c.w + x) * 4; if (!src[i + 3]) continue; fg++; const k = (src[i] >> 5) + ',' + (src[i + 1] >> 5) + ',' + (src[i + 2] >> 5); const B = bins[k] || (bins[k] = { n: 0, s: [0, 0, 0] }); B.n++; B.s[0] += src[i]; B.s[1] += src[i + 1]; B.s[2] += src[i + 2]; }
    if (fg / tot < (opt.cov || 0.42)) { row.push(null); continue; }
    const wt = B => B.n * (lum(B.s.map(v => v / B.n)) < 0.16 ? (opt.darkW || 0.3) : 1); const top = Object.values(bins).sort((a, b) => wt(b) - wt(a))[0]; row.push(top.s.map(v => Math.round(v / top.n)));
  } g.push(row); }
  const pts = []; g.forEach(r => r.forEach(p => { if (p) pts.push(p); }));
  let cent = []; const seen = new Set(); for (const p of pts.slice().sort((a, b) => lum(a) - lum(b))) { const k = p.map(v => v >> 4).join(); if (!seen.has(k)) { seen.add(k); cent.push(p.slice()); } }
  if (cent.length > K) { const step = cent.length / K; cent = Array.from({ length: K }, (_, i) => cent[Math.floor(i * step)]); }
  for (let it = 0; it < 12; it++) { const acc = cent.map(() => [0, 0, 0, 0]); pts.forEach(p => { let bi = 0, bd = 1e9; cent.forEach((q, i) => { const dd = d2(p, q); if (dd < bd) { bd = dd; bi = i; } }); acc[bi][0] += p[0]; acc[bi][1] += p[1]; acc[bi][2] += p[2]; acc[bi][3]++; }); cent = cent.map((q, i) => acc[i][3] ? [acc[i][0] / acc[i][3], acc[i][1] / acc[i][3], acc[i][2] / acc[i][3]].map(Math.round) : q); }
  const ox0 = Math.floor((W - ow) / 2), oy0 = opt.top ? 1 : H - 1 - oh; const idx = []; for (let y = 0; y < H; y++) idx.push(new Array(W).fill(-1));
  g.forEach((r, y) => r.forEach((p, x) => { if (!p) return; let bi = 0, bd = 1e9; cent.forEach((q, i) => { const dd = d2(p, q); if (dd < bd) { bd = dd; bi = i; } }); idx[oy0 + y][ox0 + x] = bi; }));
  const OI = cent.length;
  for (let pass = 0; pass < 2; pass++) { const c2 = idx.map(r => r.slice()); for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) { const v = idx[y][x]; if (v < 0) continue; const nb = [idx[y - 1][x], idx[y + 1][x], idx[y][x - 1], idx[y][x + 1]]; if (nb.includes(v)) continue; const cnt = {}; nb.forEach(q => { if (q >= 0) cnt[q] = (cnt[q] || 0) + 1; }); const best = Object.entries(cnt).sort((p, q) => q[1] - p[1])[0]; if (best && best[1] >= 3) c2[y][x] = +best[0]; } for (let y = 0; y < H; y++) idx[y] = c2[y]; }
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { if (idx[y][x] >= 0) continue; if ([[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => { const v = (idx[y + dy] || [])[x + dx]; return v !== undefined && v >= 0 && v !== OI; })) idx[y][x] = OI; }
  cent.forEach((q, i) => { if (lum(q) < 0.07) for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (idx[y][x] === i) idx[y][x] = OI; });
  const pal = cent.map(q => '#' + q.map(v => ('0' + v.toString(16)).slice(-2)).join('')); pal.push('#181020');
  const used = [...new Set(idx.flat().filter(v => v >= 0))]; const map = {}; used.forEach((v, i) => map[v] = i); const CH = '0123456789abcdefghij';
  return { w: W, h: H, p: used.map(v => pal[v]), r: idx.map(r => r.map(v => v < 0 ? '.' : CH[map[v]]).join('')) };
}
function mirror(s) { return { w: s.w, h: s.h, p: s.p, r: s.r.map(r => r.split('').reverse().join('')) }; }
module.exports = { convert, mirror };
