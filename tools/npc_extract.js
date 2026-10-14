/* Extract the 11 jobs x 2 sexes x 4 views from SEVEN's NPC design sheet -> tools/npc_crops.json (RGBA + alpha mask per sprite)
   and a contact sheet tools/out/npc_crops.png for checking. node tools/npc_extract.js */
const { load, savePng } = require('./imgdata'); const fs = require('fs'); fs.mkdirSync('tools/out', { recursive: true });
const JOBS = ['hero', 'swordsman', 'thief', 'mage', 'priest', 'farmer', 'merchant', 'smith', 'herbalist', 'weaponer', 'armorer'];
// panel geometry on the 1536x1024 sheet: [x0, x1, yMale0, yMale1, yFem0, yFem1]
const PANELS = [[46, 266, 150, 282, 312, 442], [312, 526, 150, 282, 312, 442], [570, 775, 150, 282, 312, 442], [818, 1028, 150, 282, 312, 442], [1072, 1283, 150, 282, 312, 442], [1328, 1530, 150, 282, 312, 442],
  [46, 290, 548, 682, 712, 845], [338, 578, 548, 682, 712, 845], [622, 871, 548, 682, 712, 845], [918, 1191, 548, 682, 712, 845], [1238, 1530, 548, 682, 712, 845]];
(async () => {
  const f = 'docs/figures/npc/npc_design_sheet.png'; const im = (await load([f]))[f]; const W = im.w;
  const px = (x, y) => { const i = (y * W + x) * 4; return [im.data[i], im.data[i + 1], im.data[i + 2]]; };
  const dist = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);
  const crops = {}; const sheet = []; let sx = 0;
  JOBS.forEach((job, pi) => {
    const [x0, x1, ym0, ym1, yf0, yf1] = PANELS[pi];
    [['M', ym0, ym1], ['F', yf0, yf1]].forEach(([sex, y0, y1]) => {
      // background = most common colour in the region border
      const cnt = {}; for (let x = x0; x < x1; x++) for (const y of [y0, y0 + 1, y1 - 1]) { const c = px(x, y).map(v => v >> 3 << 3).join(','); cnt[c] = (cnt[c] || 0) + 1; }
      const bg = Object.entries(cnt).sort((a, b) => b[1] - a[1])[0][0].split(',').map(Number);
      const isFg = (x, y) => dist(px(x, y), bg) > 60;
      // the sheet lays the 4 views out evenly: split into 4 equal columns
      const cw = (x1 - x0) / 4; const segs = [0, 1, 2, 3].map(i => [Math.round(i * cw), Math.round((i + 1) * cw) - 1]);
      const views = ['F', 'B', 'L', 'R'];
      segs.forEach((sg, vi) => {
        // connected components inside the column; keep the biggest blob and pieces touching its box
        const X0 = x0 + sg[0], X1 = x0 + sg[1], CW = X1 - X0 + 1, CH = y1 - y0; const lab = new Int32Array(CW * CH).fill(-1); const comps = [];
        for (let y = 0; y < CH; y++) for (let x = 0; x < CW; x++) { if (lab[y * CW + x] >= 0 || !isFg(X0 + x, y0 + y)) continue; const id = comps.length; const st = [[x, y]]; lab[y * CW + x] = id; let n = 0, bx0 = x, bx1 = x, by0 = y, by1 = y;
          while (st.length) { const [cx, cy] = st.pop(); n++; bx0 = Math.min(bx0, cx); bx1 = Math.max(bx1, cx); by0 = Math.min(by0, cy); by1 = Math.max(by1, cy); for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const nx = cx + dx, ny = cy + dy; if (nx < 0 || ny < 0 || nx >= CW || ny >= CH || lab[ny * CW + nx] >= 0 || !isFg(X0 + nx, y0 + ny)) continue; lab[ny * CW + nx] = id; st.push([nx, ny]); } }
          comps.push({ n, bx0, bx1, by0, by1 }); }
        const big = comps.reduce((m, c, i) => c.n > comps[m].n ? i : m, 0); const B0 = comps[big]; const keep = comps.map((c, i) => i === big || (c.n >= 6 && c.bx1 >= B0.bx0 - 3 && c.bx0 <= B0.bx1 + 3 && c.by1 >= B0.by0 - 3 && c.by0 <= B0.by1 + 3));
        let cx0 = 1e9, cx1 = -1, ty = 1e9, by = -1; comps.forEach((c, i) => { if (!keep[i]) return; cx0 = Math.min(cx0, X0 + c.bx0); cx1 = Math.max(cx1, X0 + c.bx1); ty = Math.min(ty, y0 + c.by0); by = Math.max(by, y0 + c.by1); });
        const inKeep = (x, y) => { const lx = x - X0, ly = y - y0; if (lx < 0 || ly < 0 || lx >= CW || ly >= CH) return false; const l = lab[ly * CW + lx]; return l >= 0 && keep[l]; };
        const w = cx1 - cx0 + 1, h = by - ty + 1; const rgba = new Uint8Array(w * h * 4);
        for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const c = px(cx0 + x, ty + y); const fg = inKeep(cx0 + x, ty + y); const i = (y * w + x) * 4; rgba[i] = c[0]; rgba[i + 1] = c[1]; rgba[i + 2] = c[2]; rgba[i + 3] = fg ? 255 : 0; }
        crops[job + '.' + sex + '.' + views[vi]] = { w, h, rgba: Buffer.from(rgba).toString('base64'), bg };
        sheet.push({ w, h, rgba, x: sx }); sx += w + 4;
      });
    });
  });
  fs.writeFileSync('tools/npc_crops.json', JSON.stringify(crops));
  const H = Math.max(...sheet.map(s => s.h)), Wt = sx; const out = new Uint8Array(Wt * H * 4); sheet.forEach(s => { for (let y = 0; y < s.h; y++) for (let x = 0; x < s.w; x++) { const i = (y * s.w + x) * 4, o = (y * Wt + s.x + x) * 4; out[o] = s.rgba[i]; out[o + 1] = s.rgba[i + 1]; out[o + 2] = s.rgba[i + 2]; out[o + 3] = s.rgba[i + 3]; } });
  await savePng('tools/out/npc_crops.png', Wt, H, out); console.log('crops', Object.keys(crops).length, 'sizes', sheet.slice(0, 8).map(s => s.w + 'x' + s.h).join(' '));
})();
