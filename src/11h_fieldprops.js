/* ================= V4.2 Part C: field objects from SEVEN's sheet (FIELDART), scattered per zone (deterministic) ================= */
const FIELD_SET = {
  plains: { camp: ['f_tent', 'f_camp', 'f_campgear'], solo: ['f_grass_l', 'f_grass_s', 'f_berry', 'n_flower', 'f_cart', 'f_barrel', 'f_crate', 'f_well', 'f_gather', 'f_post', 'n_stump'], n: 70 },
  forest: { camp: ['f_shrine', 'f_chest', 'f_mush'], solo: ['n_stump', 'n_log', 'f_mush', 'n_shrub', 'f_hidden', 'f_gather', 'f_grass_l', 'f_berry'], n: 60 },
  swamp: { camp: ['f_stele', 'f_vortex', 'f_bone'], solo: ['n_dead', 'f_bone', 'f_lump', 'f_grass_s', 'f_mush', 'f_rocks'], n: 55 },
  mountain: { camp: ['f_arch', 'f_save', 'f_chest_open'], solo: ['f_rock_l', 'f_rocks', 'n_rock_s', 'f_pillar', 'f_gather', 'n_dead', 'f_lump'], n: 60 },
  nest: { camp: ['f_altar', 'f_dbone', 'f_bone'], solo: ['f_dbone', 'f_bone', 'f_lump', 'f_rocks', 'f_pillar'], n: 45 },
};
for (const k in FIELDART) PROPS['fa_' + k] = (c, x, y) => { const A = FIELDART[k]; const cv = artCanvas(A, 'fa.' + k); shadowPx(c, x + 8, y + 14, Math.min(7, A.w / 2 - 1), 1); c.drawImage(cv, x + Math.round((16 - A.w) / 2), y + 16 - A.h); };
function fieldProps(used) {
  const out = []; const okT = tp => tp === T.GRASS || tp === T.FLOWER || tp === T.WILD || tp === T.SWAMP || tp === T.SNOW || tp === T.VOLC || tp === T.SAND;
  const free = (x, y) => { if (!okT(tileAt(x, y)) || used[x + ',' + y]) return false; for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const t2 = tileAt(x + dx, y + dy); if (t2 === T.PATH || t2 === T.BRIDGE || t2 === T.DOOR) return false; } return true; };
  const add = (x, y, k) => { if (!FIELDART[k]) return; used[x + ',' + y] = 1; out.push([x, y, 'fa_' + k]); };
  ZONES.forEach((Z, zi) => { const S = FIELD_SET[Z.id]; if (!S) return;
    // one landmark cluster per zone (camp / shrine / altar)
    for (let tries = 0; tries < 200; tries++) { const x = Z.x0 + 3 + Math.floor(hsh(zi, tries, 900) * (Z.x1 - Z.x0 - 6)), y = 8 + Math.floor(hsh(tries, zi, 901) * (MH - 16)); if (![0, 1, 2].every(i => free(x + i, y))) continue; S.camp.forEach((k, i) => add(x + i, y, k)); break; }
    for (let i = 0, n = 0; i < S.n * 6 && n < S.n; i++) { const x = Z.x0 + Math.floor(hsh(zi, i, 910) * (Z.x1 - Z.x0 + 1)), y = 3 + Math.floor(hsh(i, zi, 911) * (MH - 5)); if (!free(x, y)) continue; add(x, y, S.solo[Math.floor(hsh(x, y, 912) * S.solo.length)]); n++; } });
  return out;
}
const _townProps42 = townProps; townProps = function () { const place = _townProps42(); const used = {}; place.forEach(p => used[p[0] + ',' + p[1]] = 1); return place.concat(fieldProps(used)); };
