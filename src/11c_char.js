/* ================= character compositor (V3.3 S2): layered pixel maps -> shaded, outlined 16x24 sprites ================= */
const JOB_ACCENT = { farmer: '#d6b45c', merchant: '#a8703a', smith: '#c04a38', thief: '#26302a', herbalist: '#4aa860', historian: '#2e3e80', swordsman: '#a0a6b8', priest: '#e8c850', mage: '#6a50c8' };
const PANTS_COL = ['#42395a', '#4e3c2c', '#2e4c52', '#523240'];
const ROBE_JOBS = { mage: 1, priest: 1, historian: 1 };
function darkHex(hex, k) { const [r, g, b] = hexRgb(hex); return rgbHex(r * k, g * k, b * k); }
function humanRamps(h) {
  const L = h.look, child = h.age < ADULT_AGE, elder = h.age >= 56, job = h.job;
  let cloth = CLOTH_COL[L.cloth % CLOTH_COL.length];
  if (!child && JOB_COLOR[job] && job !== 'farmer' && job !== 'merchant') cloth = JOB_COLOR[job];
  const R = { s: mkRamp(SKIN_COL[L.skin % SKIN_COL.length]), h: mkRamp(elder ? '#dcdce6' : HAIR_COL[L.hair % HAIR_COL.length]), c: mkRamp(cloth), u: mkRamp(darkHex(cloth, 0.84)), t: mkRamp(JOB_TRIM[job] || '#c8b078'), p: mkRamp(PANTS_COL[(L.cloth + L.hair) % 4]), b: mkRamp('#5a3a24'), m: mkRamp('#aeb4c4'), w: mkRamp('#8a5a30'), g: mkRamp('#e0b838'), a: mkRamp(JOB_ACCENT[job] || '#a8703a') };
  if (child) { R.t = mkRamp(darkHex(cloth, 0.7)); }
  return R;
}
const mirRows = rows => rows.map(r => r.split('').reverse().join(''));
function putL(g, rows, y, dy) { blit(g, rows, 0, y + (dy || 0), false); }
function putR(g, rows, y, dy) { blit(g, mirRows(rows), 8, y + (dy || 0), false); }
function putItemF(g, it, dy, ox) { it.F.forEach((r, j) => { const y = it.oy + dy + j; if (y < 0 || y >= 24) return; for (let i = 0; i < 16; i++) { const x = i + (ox || 0); if (r[i] !== '.' && x >= 0 && x < 16) g[y][x] = r[i]; } }); }
function putItem(g, rows, oy, dy, ox) { rows.forEach((r, j) => { const y = oy + dy + j; if (y < 0 || y >= 24) return; for (let i = 0; i < 16; i++) { const x = i + (ox || 0); if (r[i] !== '.' && x >= 0 && x < 16) g[y][x] = r[i]; } }); }
function humanGrid(h, dir, frame) {
  const g = emptyGrid(16, 24); const child = h.age < ADULT_AGE, elder = h.age >= 56, job = h.job; const L = h.look;
  const view = dir === 0 ? 'F' : dir === 1 ? 'B' : 'S'; const robe = !child && ROBE_JOBS[job];
  const wf = frame < 4 ? frame : 0; const atk = frame === 5, pray = frame === 6; const bob = frame === 4 ? 1 : 0;
  const hdy = bob + (elder ? 1 : 0);
  const style = ((L.style % 4) + (L.hair % 2) * 4) % 8; // 8 outlines from style x hair
  const hstyle = child ? [0, 3, 5, 7][L.style % 4] : (job === 'smith' && !elder ? [0, 6, 4, 0][L.style % 4] : style);
  if (child) {
    const HYc = 9;
    if (view === 'S') {
      blit(g, SD.childLegS[wf], 0, 20); blit(g, SD.childTorsoS, 0, 17); blit(g, SD.childArmS, wf === 1 ? 1 : wf === 3 ? -1 : 0, 18);
      blit(g, SD.headS, 0, HYc); const hr = SD.hairS[hstyle]; blit(g, hr.rows, 0, hr.oy - HY + HYc);
    } else {
      const lf = wf === 3 ? -1 : 0, rt = wf === 1 ? -1 : 0;
      putL(g, SD.childLegF, 20, lf); putR(g, SD.childLegF, 20, rt); blit(g, SD.childTorsoF, 0, 17, true);
      putL(g, SD.childArmF, 18, wf === 1 ? -1 : wf === 3 ? 1 : 0); putR(g, SD.childArmF, 18, wf === 3 ? -1 : wf === 1 ? 1 : 0);
      blit(g, view === 'F' ? SD.headF : SD.headF.map(r => r.replace(/[erP]/g, 's')), 0, HYc, true);
      const hr = (view === 'F' ? SD.hairF : SD.hairB)[hstyle]; blit(g, hr.rows, 0, hr.oy - HY + HYc, true);
    }
    return g;
  }
  if (view === 'S') {
    if (robe) { blit(g, SD.robeS, 0, 17); blit(g, [Rw(6, "bbb"), Rw(6, "bbb")], 0, 21 - (wf === 1 || wf === 3 ? 0 : 0)); }
    else blit(g, SD.legS[wf], 0, LYY);
    blit(g, SD.torsoS, 0, TYY);
    (SD.over[job] || { S: [] }).S.forEach(o => blit(g, o.rows, 0, o.oy));
    const adx = wf === 1 ? 1 : wf === 3 ? -1 : 0; const ady = atk ? -3 : 0;
    if (pray) { blit(g, [Rw(8, "uuu"), Rw(9, "ss")], 0, 15); } else blit(g, SD.armS, adx, 13 + ady);
    blit(g, SD.headS, 0, HY + hdy);
    const hr = SD.hairS[hstyle]; blit(g, hr.rows, 0, hr.oy + hdy);
    if (elder && h.sex === 'M') blit(g, SD.beardS, 0, 10 + hdy);
    const hat = SD.hat[job]; if (hat) blit(g, hat.S.rows, 0, hat.S.oy + hdy);
    const itn = SD.jobItem[job] || (elder ? 'cane' : null); if (itn && !pray) { const it = SD.item[itn]; putItem(g, it.S, it.soy, ady, adx); }
    return g;
  }
  // front / back
  const lf = wf === 3 ? -1 : 0, rt = wf === 1 ? -1 : 0;
  if (robe) { blit(g, view === 'F' ? SD.torsoF : SD.torsoB, 0, TYY, true); blit(g, SD.robeF, 0, 17, true); blit(g, SD.robeLegF, 0, 21, true); }
  else { putL(g, SD.legF, LYY, lf); putR(g, SD.legF, LYY, rt); blit(g, view === 'F' ? SD.torsoF : SD.torsoB, 0, TYY, true); }
  if (!robe && job === 'priest') { /* never */ }
  const ov = (SD.over[job] || { F: [], B: [] })[view]; ov.forEach(o => { blit(g, o.rows, 0, o.oy, true); });
  const alt = wf === 1 ? -1 : wf === 3 ? 1 : 0; const aryR = atk ? -4 : -alt;
  if (pray) { blit(g, ["...uuuuu", "...uuuss"].map((r, i) => i ? "...uuuss" : r), 0, 14, true); }
  else { putL(g, SD.armF, 13, alt); putR(g, SD.armF, 13, aryR); }
  blit(g, view === 'F' ? SD.headF : SD.headF.map(r => r.replace(/[erP]/g, 's')), 0, HY + hdy, true);
  const hr = (view === 'F' ? SD.hairF : SD.hairB)[hstyle]; blit(g, hr.rows, 0, hr.oy + hdy, true);
  if (view === 'F' && elder && h.sex === 'M') blit(g, SD.beardF, 0, 10 + hdy, true);
  const hat = SD.hat[job]; if (hat) { const ht = hat[view]; blit(g, ht.rows, 0, ht.oy + hdy, true); }
  const itn = SD.jobItem[job] || (elder ? 'cane' : null);
  if (itn && !pray) { const it = SD.item[itn]; if (view === 'F') putItem(g, it.F, it.oy, atk ? -4 : alt === -1 ? 1 : alt === 1 ? -1 : 0, 0); else if (it.B.length) putItem(g, it.B, it.boy, 0, 0); }
  if (job === 'merchant' && view === 'S') { /* pack already in over */ }
  return g;
}
function humanSprite(h, dir, frame) {
  const L = h.look, child = h.age < ADULT_AGE, elder = h.age >= 56;
  const key = [h.job, L.hair, L.style, L.skin, L.cloth, child ? 1 : 0, elder ? 1 : 0, elder ? h.sex : '', dir, frame].join('.');
  if (spriteCache[key]) return spriteCache[key];
  const d = dir === 3 ? 2 : dir; const grid = humanGrid(h, d, frame);
  let cv = bakeGrid(grid, 16, 24, humanRamps(h));
  if (dir === 3) { const f = mkCanvas(16, 24), fc = f.getContext('2d'); fc.translate(16, 0); fc.scale(-1, 1); fc.drawImage(cv, 0, 0); cv = f; }
  spriteCache[key] = cv; return cv;
}
