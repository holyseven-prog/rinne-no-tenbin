/* Part C / D: extract items from SEVEN's field + castle-interior sheet row by row (connected components, left->right),
   convert to pixel art at map scale -> src/11g_fieldart.js (FIELDART[name] = {w,h,p,r}); contact sheet tools/out/field_built.png
   node tools/field_build.js */
const { load, savePng } = require('./imgdata'); const fs = require('fs'); const { convert } = require('./sprite_conv');
// [x0, y0, x1, y1, [names...], [w, h] target size]
const ROWS = [
  [925, 136, 1525, 210, ['c_floor_throne', 'c_floor_stone', 'c_floor_black', 'c_floor_magic', 'c_floor_carpet', 'c_floor_purple', 'c_floor_grid'], [16, 16], 'tile'],
  [925, 258, 1525, 342, ['c_wall', 'c_wall_evil', 'c_pillar_l', 'c_pillar_m', 'c_pillar_black', 'c_banner_l', 'c_banner_s', 'c_curtain', 'c_chain'], [16, 24]],
  [925, 400, 1525, 470, ['c_stairs_up', 'c_stairs_down', 'c_pass', 'c_pass_corner', 'c_skybridge', 'c_pit', 'c_gate', 'c_circle', 'c_warp'], [16, 16], 'tile'],
  [925, 525, 1525, 600, ['c_throne', 'c_candle_l', 'c_candle_s', 'c_fire_blue', 'c_fire_purple', 'c_skull', 'c_chest_gold', 'c_book', 'c_pillar_broken', 'c_cage'], [16, 22]],
  [925, 650, 1525, 726, ['c_statue_h', 'c_statue_m', 'c_gargoyle', 'c_idol', 'c_coffin', 'c_altar', 'c_blood', 'c_bones', 'c_crest', 'c_door'], [16, 22]],
  [518, 140, 905, 210, ['f_stele', 'f_shrine', 'f_pillar', 'f_arch', 'f_altar'], [16, 20]],
  [518, 250, 905, 310, ['f_rock_l', 'f_rocks', 'f_grass_l', 'f_grass_s', 'f_mush', 'f_berry'], [16, 16]],
  [518, 345, 905, 405, ['f_sign', 'f_post', 'f_well', 'f_camp', 'f_tent', 'f_campgear'], [16, 16]],
  [518, 450, 905, 510, ['f_cart', 'f_barrel', 'f_crate', 'f_lump', 'f_bone', 'f_dbone'], [16, 16]],
  [518, 555, 905, 620, ['f_chest_open', 'f_chest', 'f_gather', 'f_hidden', 'f_vortex', 'f_save'], [16, 16]],
  [12, 380, 505, 452, ['m_mount_s', 'm_mount_l', 'm_rock', 'm_cliff', 'm_cliff_top', 'm_step', 'm_cave', 'm_wall'], [32, 32]],
  [12, 515, 505, 572, ['w_sea', 'w_shallow', 'w_river', 'w_fall', 'w_bridge_wood', 'w_bridge_stone', 'w_bridge_rope'], [16, 16], 'tile'],
  [12, 640, 505, 712, ['n_conifer', 'n_broad', 'n_small', 'n_shrub', 'n_flower', 'n_rock_s', 'n_rock_l', 'n_stump', 'n_log', 'n_dead'], [16, 24]],
  [12, 810, 320, 872, ['o_field0', 'o_field1', 'o_field2', 'o_field3', 'o_field4'], [16, 16], 'tile'],
  [330, 815, 590, 870, ['o_mill_l', 'o_mill_s', 'o_barn', 'o_store'], [32, 32]],
  [12, 900, 320, 960, ['o_fence', 'o_bale', 'o_straw', 'o_tools', 'o_trough', 'o_feeder'], [16, 16]],
  [330, 915, 590, 970, ['o_cave_floor', 'o_cave_wall', 'o_icicle', 'o_ore', 'o_hole', 'o_ladder'], [16, 16]],
  [605, 805, 900, 865, ['s_snow', 's_snowtree', 's_ice', 's_icecliff'], [16, 16], 'tile'],
  [605, 875, 900, 935, ['s_maple', 's_leaves', 's_deadgrass', 's_deadtree'], [16, 16], 'tile'],
  [605, 940, 900, 1000, ['s_marsh', 's_poison', 's_volcrock', 's_lava'], [16, 16], 'tile'],
];
(async () => {
  const f = 'docs/figures/field/field_castle_design_sheet.png'; const im = (await load([f]))[f]; const Wd = im.w;
  const px = (x, y) => { const i = (y * Wd + x) * 4; return [im.data[i], im.data[i + 1], im.data[i + 2]]; }; const dist = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);
  const out = {}; const prev = []; let warn = [];
  for (const [x0, y0, x1, y1, names, size, mode] of ROWS) {
    const cnt = {}; for (let x = x0; x < x1; x++) for (const y of [y0, y1 - 1]) { const c = px(x, y).map(v => v >> 3 << 3).join(','); cnt[c] = (cnt[c] || 0) + 1; }
    const bg = Object.entries(cnt).sort((a, b) => b[1] - a[1])[0][0].split(',').map(Number); const card = [248, 246, 248]; const isFg = (x, y) => { const c = px(x, y); return dist(c, bg) > 60 && !(c[0] > 236 && c[1] > 232 && c[2] > 236); };
    // column projection -> segments (items are separated by background columns)
    const col = []; for (let x = x0; x < x1; x++) { let n = 0; for (let y = y0; y < y1; y++) if (isFg(x, y)) n++; col.push(n); }
    let segs = []; let s = -1; for (let i = 0; i <= col.length; i++) { const on = i < col.length && col[i] > 0; if (on && s < 0) s = i; if (!on && s >= 0) { if (i - s >= 6) segs.push([s, i - 1]); s = -1; } }
    while (segs.length > names.length) { let bi = 0, bg2 = 1e9; for (let i = 0; i + 1 < segs.length; i++) { const gap = segs[i + 1][0] - segs[i][1]; if (gap < bg2) { bg2 = gap; bi = i; } } segs.splice(bi, 2, [segs[bi][0], segs[bi + 1][1]]); }
    if (segs.length < names.length) warn.push(names[0] + ' got ' + segs.length + '/' + names.length);
    segs.forEach((sg, k) => { if (!names[k]) return; let ty = y1, by = y0; const ax = x0 + sg[0], bx = x0 + sg[1]; for (let y = y0; y < y1; y++) for (let x = ax; x <= bx; x++) if (isFg(x, y)) { ty = Math.min(ty, y); by = Math.max(by, y); }
      let ax2 = ax, bx2 = bx; if (mode === 'tile') { // keep only rows/cols that are mostly tile colour (drop the white card, the label and the frame)
        const good = isFg; const o = [ty, by, ax2, bx2];
        const rowOk = y => { let n = 0; for (let x = ax; x <= bx; x++) if (good(x, y)) n++; return n >= (bx - ax + 1) * 0.7; }; const colOk = x => { let n = 0; for (let y = ty; y <= by; y++) if (good(x, y)) n++; return n >= (by - ty + 1) * 0.6; };
        while (ty < by && !rowOk(ty)) ty++; while (by > ty && !rowOk(by)) by--; while (ax2 < bx2 && !colOk(ax2)) ax2++; while (bx2 > ax2 && !colOk(bx2)) bx2--; ty += 2; by -= 2; ax2 += 2; bx2 -= 2; if (by - ty < 8 || bx2 - ax2 < 8) { [ty, by, ax2, bx2] = [o[0] + 3, o[1] - 3, o[2] + 3, o[3] - 3]; warn.push(names[k] + ' fallback'); } } const w = bx2 - ax2 + 1, h = by - ty + 1; const rgba = new Uint8Array(w * h * 4); for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const c = px(ax2 + x, ty + y); rgba.set([c[0], c[1], c[2], mode === 'tile' || isFg(ax2 + x, ty + y) ? 255 : 0], (y * w + x) * 4); }
      const crop = { w, h, rgba: Buffer.from(rgba).toString('base64') };
      let res; if (mode === 'tile') { res = convert(crop, size[0] + 2, size[1] + 2, 12, { cov: 0 }); res = { w: size[0], h: size[1], p: res.p, r: res.r.slice(1, size[1] + 1).map(r => r.slice(1, size[0] + 1)) };
        // tiles must be seamless: rows/cols that are only outline/transparent are refilled from the nearest real row/col
        const bad = s => /^[.0]+$/.test(s); let R = res.r.slice(); const okR = R.map(r => !bad(r)); if (okR.some(Boolean)) R = R.map((r, i) => { if (okR[i]) return r; if (okR[i + 8]) return R[i + 8]; if (okR[i - 8]) return R[i - 8]; for (let d = 1; d < R.length; d++) { if (okR[i + d]) return R[i + d]; if (okR[i - d]) return R[i - d]; } return r; });
        const col = x => R.map(r => r[x]).join(''); const okC = [...Array(size[0])].map((_, x) => !bad(col(x))); if (okC.some(Boolean)) R = R.map(r => [...r].map((ch, x) => { if (okC[x]) return ch; if (okC[x + 8]) return r[x + 8]; if (okC[x - 8]) return r[x - 8]; for (let d = 1; d < size[0]; d++) { if (okC[x + d]) return r[x + d]; if (okC[x - d]) return r[x - d]; } return ch; }).join(''));
        res.r = R.map(r => r.replace(/\./g, '0')); } // tiles: no outline, fill the cell
      else res = convert(crop, size[0], size[1], 14);
      out[names[k]] = res; prev.push(res); });
  }
  fs.writeFileSync('src/11g_fieldart.js', '/* ================= field + castle-interior art (Part C / D), auto-built from SEVEN\'s sheet by tools/field_build.js — edit the tool, not this file ================= */\nconst FIELDART = ' + JSON.stringify(out) + ';\n');
  const cols = 12, cw = 36, chh = 36; const rows = Math.ceil(prev.length / cols); const W = cols * cw, H = rows * chh; const img = new Uint8Array(W * H * 4); for (let i = 0; i < img.length; i += 4) img.set([90, 110, 80, 255], i);
  prev.forEach((s, n) => { const bx = (n % cols) * cw + 2, by = Math.floor(n / cols) * chh + 2; s.r.forEach((r, y) => [...r].forEach((ch, x) => { if (ch === '.' || x >= 32 || y >= 32) return; const hx = s.p['0123456789abcdefghij'.indexOf(ch)]; if (!hx) return; img.set([1, 3, 5].map(q => parseInt(hx.slice(q, q + 2), 16)).concat([255]), ((by + y) * W + bx + x) * 4); })); });
  await savePng('tools/out/field_built.png', W, H, img); console.log('items', Object.keys(out).length, 'warn', JSON.stringify(warn));
})();
