/* ================= character compositor (V3.3 S2): layered pixel maps -> shaded, outlined 16x24 sprites =================
   Roles that must be recognisable at a glance: warrior (steel armor, helm, shield), hero (blue cape, gold circlet),
   priest (white robe, halo, gold cross), sage/mage (violet robe, tall star hat, long white beard), smith (bare arms, apron, hammer),
   farmer (straw hat, blue straps, fork), elder (bald/white, hunched, beard, cane), child (big head), men / women (hair, dress, bow). */
const JOB_ACCENT = { weaponer: '#d03a30', armorer: '#9ab0d8', farmer: '#e0bc58', merchant: '#a8703a', smith: '#d04030', thief: '#26302a', herbalist: '#4aa860', historian: '#2e3e80', warrior: '#a0a6b8', hero: '#2f5fe8', priest: '#e8c850', mage: '#6a50c8', swordsman: '#a0a6b8' };
const ROLE_CLOTH = { weaponer: '#b0603a', armorer: '#4a6ca4', warrior: '#7886ae', hero: '#f0f0fa', priest: '#f4f4fc', mage: '#5a3ab8', smith: '#7c7c8a', farmer: '#e6d6a4', merchant: '#d09a38', thief: '#3a4a3c', herbalist: '#3e9650', historian: '#3a4c88' };
const ROLE_TRIM = { weaponer: '#e8d8a0', armorer: '#d8e0f0', warrior: '#c8a040', hero: '#e8c850', priest: '#e8c850', mage: '#e8c850', smith: '#5a3a28', farmer: '#3a6ad0', merchant: '#8a5a2a', thief: '#6a5a40', herbalist: '#e8e0c0', historian: '#e8e0c0' };
const PANTS_COL = ['#42395a', '#4e3c2c', '#2e4c52', '#523240'];
const ROBE_JOBS = { mage: 1, priest: 1, historian: 1 };
const SKIRT_JOBS = { farmer: 1, merchant: 1, herbalist: 1, weaponer: 1, armorer: 1 };
function darkHex(hex, k) { const [r, g, b] = hexRgb(hex); return rgbHex(r * k, g * k, b * k); }
function mixHex(a, b, k) { const A = hexRgb(a), B = hexRgb(b); return rgbHex(A[0] + (B[0] - A[0]) * k, A[1] + (B[1] - A[1]) * k, A[2] + (B[2] - A[2]) * k); }
function roleOf(h) { if (h.age < ADULT_AGE) return 'child'; if (h.job === 'swordsman') return (h.age < 56 && (h.lvl || 1) >= 6) ? 'hero' : 'warrior'; return h.job; }
function humanRamps(h) {
  const L = h.look, role = roleOf(h), child = role === 'child', elder = h.age >= 56, female = h.sex === 'F';
  let cloth = child ? CLOTH_COL[L.cloth % CLOTH_COL.length] : (ROLE_CLOTH[role] || CLOTH_COL[L.cloth % CLOTH_COL.length]);
  if (elder && !ROBE_JOBS[role] && role !== 'warrior') cloth = mixHex(cloth, '#8f8472', 0.55);
  if (!child && (role === 'farmer' || role === 'merchant') && !elder) cloth = mixHex(cloth, CLOTH_COL[L.cloth % CLOTH_COL.length], 0.25);
  if (female && !child && (role === 'farmer' || role === 'merchant' || role === 'herbalist')) cloth = mixHex(cloth, '#d86a8a', 0.4);
  const sage = role === 'mage' && !female;
  const hairHex = elder || sage ? '#eceaf4' : HAIR_COL[L.hair % HAIR_COL.length];
  const R = { s: mkRamp(SKIN_COL[L.skin % SKIN_COL.length]), h: mkRamp(hairHex), c: mkRamp(cloth), u: mkRamp(role === 'smith' ? '#3a3a46' : darkHex(cloth, 0.84)), t: mkRamp(ROLE_TRIM[role] || '#c8b078'), p: mkRamp(role === 'smith' ? '#3a3a46' : PANTS_COL[(L.cloth + L.hair) % 4]), b: mkRamp('#5a3a24'), m: mkRamp(role === 'warrior' ? '#b4c0d8' : '#aeb4c4'), w: mkRamp('#8a5a30'), g: mkRamp('#e8c040'), a: mkRamp(JOB_ACCENT[role] || '#a8703a') };
  if (child) { R.t = mkRamp(darkHex(cloth, 0.7)); }
  return R;
}
const mirRows = rows => rows.map(r => r.split('').reverse().join(''));
function putL(g, rows, y, dy) { blit(g, rows, 0, y + (dy || 0), false); }
function putR(g, rows, y, dy) { blit(g, mirRows(rows), 8, y + (dy || 0), false); }
function putItem(g, rows, oy, dy, ox) { rows.forEach((r, j) => { const y = oy + dy + j; if (y < 0 || y >= 24) return; for (let i = 0; i < 16; i++) { const x = i + (ox || 0); if (r[i] !== '.' && x >= 0 && x < 16) g[y][x] = r[i]; } }); }
function putPix(g, pts, ch, dy) { pts.forEach(p => { const y = p[1] + (dy || 0); if (y >= 0 && y < 24 && p[0] >= 0 && p[0] < 16) g[y][p[0]] = ch; }); }
function blitO(g, o, dy, mirror, ox) { blit(g, o.rows, ox || 0, o.oy + (dy || 0), mirror); }
const MALE_STYLES = [0, 3, 5, 6], FEM_STYLES = [1, 2, 7, 3];
function humanGrid(h, dir, frame) {
  const g = emptyGrid(16, 24); const child = h.age < ADULT_AGE, elder = h.age >= 56, role = roleOf(h), female = h.sex === 'F'; const L = h.look;
  const view = dir === 0 ? 'F' : dir === 1 ? 'B' : 'S'; const robe = !child && ROBE_JOBS[role]; const skirt = !child && !robe && female && SKIRT_JOBS[role] && !elder || (!child && !robe && female && elder && SKIRT_JOBS[role]);
  const wf = frame < 4 ? frame : 0; const atk = frame === 5, pray = frame === 6; const bob = frame === 4 ? 1 : 0;
  const hdy = bob + (elder && !child ? 2 : 0);
  const k = (L.style + L.hair) % 4;
  let hstyle = child ? (female ? 7 : [0, 3, 5, 6][L.style % 4]) : elder ? (female ? 5 : 4) : role === 'hero' ? (female ? 2 : 6) : female ? FEM_STYLES[k] : MALE_STYLES[k];
  if (role === 'smith' && !female && !elder) hstyle = [0, 6, 0, 3][k]; if (role === 'mage' && !female && !elder) hstyle = 0;
  const bowOn = female && !elder && role !== 'warrior' && role !== 'mage' && role !== 'priest';
  if (child) {
    const HYc = 9;
    if (view === 'S') {
      blit(g, SD.childLegS[wf], 0, 20); blit(g, SD.childTorsoS, 0, 17); blit(g, SD.childArmS, wf === 1 ? 1 : wf === 3 ? -1 : 0, 18);
      blit(g, SD.headS, 0, HYc); const hr = SD.hairS[hstyle]; blit(g, hr.rows, 0, hr.oy - HY + HYc); if (female) putPix(g, SD.bowS, 'P', HYc - HY);
    } else {
      const lf = wf === 3 ? -1 : 0, rt = wf === 1 ? -1 : 0;
      putL(g, SD.childLegF, 20, lf); putR(g, SD.childLegF, 20, rt); blit(g, SD.childTorsoF, 0, 17, true);
      if (female) blit(g, ["...ccccc", "..tttttt"], 0, 19, true);
      putL(g, SD.childArmF, 18, wf === 1 ? -1 : wf === 3 ? 1 : 0); putR(g, SD.childArmF, 18, wf === 3 ? -1 : wf === 1 ? 1 : 0);
      blit(g, view === 'F' ? SD.headF : SD.headF.map(r => r.replace(/[erP]/g, 's')), 0, HYc, true);
      const hr = (view === 'F' ? SD.hairF : SD.hairB)[hstyle]; blit(g, hr.rows, 0, hr.oy - HY + HYc, true); if (female) putPix(g, SD.bowF, 'P', HYc - HY);
    }
    return g;
  }
  const itn = elder ? 'cane' : (role === 'weaponer' ? 'sword' : role === 'armorer' ? 'shieldItem' : SD.jobItem[role === 'warrior' || role === 'hero' ? 'swordsman' : role]);
  if (view === 'S') {
    if (role === 'hero') blit(g, SD.capeS.rows, 0, SD.capeS.oy + (wf === 1 ? 0 : wf === 3 ? 1 : 0));
    if (robe) { blit(g, SD.robeS, 0, 17); blit(g, [Rw(6, "bbb"), Rw(6, "bbb")], 0, 21); }
    else if (skirt) { blit(g, SD.legS[wf].map((r, i) => i < 1 ? '................' : r), 0, LYY + 1 - 1 + 0); blitO(g, SD.dressS, 0, false); }
    else blit(g, SD.legS[wf], 0, LYY);
    blit(g, SD.torsoS, 0, TYY);
    if (role === 'warrior') blitO(g, SD.armorS, 0, false);
    (SD.over[role === 'warrior' || role === 'hero' ? 'swordsman' : role === 'weaponer' ? 'merchant' : role === 'armorer' ? 'smith' : role] || { S: [] }).S.forEach(o => blit(g, o.rows, 0, o.oy));
    const adx = wf === 1 ? 1 : wf === 3 ? -1 : 0; const ady = atk ? -3 : 0; const hx = elder ? 1 : 0;
    if (pray) blit(g, [Rw(8, "uuu"), Rw(9, "ss")], 0, 15); else blit(g, role === 'smith' ? [Rw(7, "uu"), Rw(7, "ss"), Rw(7, "ss"), Rw(7, "ss"), Rw(7, "ss")] : SD.armS, adx, 13 + ady);
    blit(g, SD.headS, hx, HY + hdy); const hr = SD.hairS[hstyle]; blit(g, hr.rows, hx, hr.oy + hdy);
    if (elder && !female) blit(g, SD.beardS, hx, 10 + hdy); if (role === 'mage' && !female) blitO(g, SD.beardLongS, hdy, false);
    if (role === 'warrior') { blitO(g, SD.helm.S, hdy, false); blitO(g, SD.helm.plumeS, hdy, false); }
    else { const hat = SD.hat[role === 'weaponer' || role === 'armorer' ? 'merchant' : role]; if (hat) blit(g, hat.S.rows, hx, hat.S.oy + hdy); }
    if (role === 'hero') blitO(g, SD.circletS, hdy, false); if (role === 'priest') blitO(g, SD.haloS, hdy, false);
    if (bowOn) putPix(g, SD.bowS, 'P', hdy);
    if (itn && !pray) { const it = SD.item[itn]; putItem(g, it.S, it.soy, ady, adx); }
    return g;
  }
  // front / back
  const lf = wf === 3 ? -1 : 0, rt = wf === 1 ? -1 : 0;
  if (role === 'hero' && view === 'F') blitO(g, SD.capeBackF, 0, true);
  if (robe) { blit(g, view === 'F' ? SD.torsoF : SD.torsoB, 0, TYY, true); blit(g, SD.robeF, 0, 17, true); blit(g, SD.robeLegF, 0, 21, true); }
  else if (skirt) { putL(g, SD.legF.slice(1), LYY + 1, lf); putR(g, SD.legF.slice(1), LYY + 1, rt); blit(g, view === 'F' ? SD.torsoF : SD.torsoB, 0, TYY, true); blitO(g, SD.dressF, 0, true); }
  else { putL(g, SD.legF, LYY, lf); putR(g, SD.legF, LYY, rt); blit(g, view === 'F' ? SD.torsoF : SD.torsoB, 0, TYY, true); }
  if (role === 'smith') blitO(g, SD.broadF, 0, true);
  if (elder && !robe) blitO(g, SD.humpF, 0, true);
  if (role === 'warrior') blitO(g, SD.armorF, 0, true);
  const ov = (SD.over[role === 'warrior' || role === 'hero' ? 'swordsman' : role === 'weaponer' ? 'merchant' : role === 'armorer' ? 'smith' : role] || { F: [], B: [] })[view]; ov.forEach(o => { if (role === 'hero' && o.oy === 12) return; blit(g, o.rows, 0, o.oy, true); });
  if (role === 'hero' && view === 'F') blitO(g, SD.heroOverF, 0, true); if (role === 'hero' && view === 'B') blitO(g, SD.capeB, 0, true);
  const alt = wf === 1 ? -1 : wf === 3 ? 1 : 0; const aryR = atk ? -4 : -alt;
  if (pray) { blit(g, ["...uuuuu", "...uuuss"], 0, 14, true); }
  else if (role === 'smith') { putL(g, SD.armBareF, 13, alt); putR(g, SD.armBareF, 13, aryR); }
  else { putL(g, SD.armF, 13, alt); putR(g, SD.armF, 13, aryR); }
  if (role === 'warrior' && view === 'F' && !pray) blitO(g, SD.shieldF, 0, false);
  blit(g, view === 'F' ? SD.headF : SD.headF.map(r => r.replace(/[erP]/g, 's')), 0, HY + hdy, true);
  const hr = (view === 'F' ? SD.hairF : SD.hairB)[hstyle]; blit(g, hr.rows, 0, hr.oy + hdy, true);
  if (view === 'F' && elder && !female) blit(g, SD.beardF, 0, 10 + hdy, true);
  if (view === 'F' && role === 'mage' && !female) blitO(g, SD.beardLongF, hdy, true);
  if (role === 'warrior') { const hm = SD.helm[view]; blitO(g, hm, hdy, true); blitO(g, SD.helm.plumeF, hdy, true); }
  else { const hat = SD.hat[role === 'weaponer' || role === 'armorer' ? 'merchant' : role]; if (hat) { const ht = hat[view]; blit(g, ht.rows, 0, ht.oy + hdy, true); } }
  if (role === 'hero' && view === 'F') blitO(g, SD.circletF, hdy, true); if (role === 'priest') blitO(g, SD.haloF, hdy, true);
  if (bowOn) putPix(g, SD.bowF, 'P', hdy);
  if (itn && !pray) { const it = SD.item[itn]; if (view === 'F') putItem(g, it.F, it.oy, atk ? -4 : alt === -1 ? 1 : alt === 1 ? -1 : 0, 0); else if (it.B.length) putItem(g, it.B, it.boy, 0, 0); if (elder && view === 'F') blitO(g, SD.caneCrook.F ? { oy: SD.caneCrook.oy, rows: SD.caneCrook.F } : null, 0, false); }
  return g;
}
function humanSprite(h, dir, frame) {
  const L = h.look, role = roleOf(h), elder = h.age >= 56;
  const key = [role, L.hair, L.style, L.skin, L.cloth, elder ? 1 : 0, h.sex || 'M', dir, frame].join('.');
  if (spriteCache[key]) return spriteCache[key];
  const d = dir === 3 ? 2 : dir; const grid = humanGrid(h, d, frame);
  let cv = bakeGrid(grid, 16, 24, humanRamps(h));
  if (dir === 3) { const f = mkCanvas(16, 24), fc = f.getContext('2d'); fc.translate(16, 0); fc.scale(-1, 1); fc.drawImage(cv, 0, 0); cv = f; }
  spriteCache[key] = cv; return cv;
}
