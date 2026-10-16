/* ================= buildings from the visual team's sprites (village/bld_*, 1 source px = 1 world px, anchor = bottom centre of the footprint).
   Winter (season 3) uses the *_winter version. Falls back to the code-drawn building when the sprite is missing or not decoded yet.
   The world canvas cache is cleared once the sprites finish decoding (they decode in the background after boot). ================= */
const BLD_SPR = { church: 'church', guild: 'guild', tavern: 'tavern', inn: 'inn', shop: 'weapon_shop', armor: 'armor_shop', smithy: 'smith', apothecary: 'herbalist', castle: 'demon_castle', mill: 'windmill' };
const HOUSE_SPR = ['house_red', 'house_blue', 'house_green', 'house_yellow', 'house_brown']; /* same order as HOUSE_ROOF */
function bldSprKey(b, sea) { let n = BLD_SPR[b.kind]; if (b.kind === 'house') n = HOUSE_SPR[(b.id + b.roof) % 5]; else if (b.kind === 'hut') n = b.id % 2 ? 'farm_hut_one' : 'farm_hut_two'; if (!n) return null;
  const k = 'bld_' + n; return (sea === 3 && SPR[k + '_winter']) ? k + '_winter' : (SPR[k] ? k : null); }
const _drawBuildingCode = drawBuilding;
drawBuilding = function (c, b, sea) { const k = SPR_READY ? bldSprKey(b, sea) : null; if (!k) return _drawBuildingCode(c, b, sea);
  const cv = SPR[k]; const px = b.x * TS, py = b.y * TS, w = b.w * TS, h = b.h * TS; const ox = Math.round(px + w / 2 - cv.width / 2), oy = py + h - cv.height; c.drawImage(cv, ox, oy); /* night window glow: needs a light mask from the visual team (auto-detecting panes hit outlines) */ };
const _loadSprites0 = loadSprites;
loadSprites = async function () { await _loadSprites0(); for (const C of [worldCache, overlayCache, groundCache]) for (const k in C) delete C[k]; };
/* ---------- ground from the delivered 16x16 tiles (village/tile_*). 4 variants picked by position hash; grass / flowers / farm have
   season versions (spring = no suffix). Water and the north ledge use the 47-blob edge tiles: bit0..7 = N,E,S,W,NE,SE,SW,NW, 1 = same terrain,
   a corner bit only counts when both of its sides are set. The code-drawn bridge, stairs and cliff-foot shadows are kept. ---------- */
const SEA_SFX = ['', '_summer', '_autumn', '_winter'];
function blobMask(tx, ty, same) { const s = (x, y) => (x < 0 || y < 0 || x >= MW || y >= MH) ? true : same(W.tiles[y * MW + x]); const n = s(tx, ty - 1), e = s(tx + 1, ty), so = s(tx, ty + 1), w = s(tx - 1, ty);
  return (n ? 1 : 0) | (e ? 2 : 0) | (so ? 4 : 0) | (w ? 8 : 0) | (n && e && s(tx + 1, ty - 1) ? 16 : 0) | (so && e && s(tx + 1, ty + 1) ? 32 : 0) | (so && w && s(tx - 1, ty + 1) ? 64 : 0) | (n && w && s(tx - 1, ty - 1) ? 128 : 0); }
const m3 = m => ('00' + m).slice(-3);
function groundTileKey(tx, ty, sea) { let tp = W.tiles[ty * MW + tx]; const v = Math.floor(hsh(tx, ty, 77) * 4) & 3;
  if (tp === T.WATER) return 'tile_water_edge_' + m3(blobMask(tx, ty, t => t === T.WATER || t === T.BRIDGE));
  if (tp === T.LEDGE) return 'tile_clifftop_edge_' + m3(blobMask(tx, ty, t => t === T.LEDGE));
  if (tp === T.FLOWER) return 'tile_flowers_' + v + SEA_SFX[sea];
  if (tp === T.BLD || tp === T.TREE || tp === T.FENCE || tp === T.ROCK) tp = tx >= PLATEAU_X0 ? T.DARK : T.GRASS;
  switch (tp) { case T.PATH: case T.DOOR: return 'tile_dirt_' + v; case T.PLAZA: return 'tile_stone_' + v; case T.SAND: return 'tile_sand_' + v; case T.FIELD: return 'tile_farm_' + v + SEA_SFX[sea];
    case T.DARK: return 'tile_dark_' + v; case T.CLIFF: return 'tile_cliff_' + v; default: return 'tile_grass_' + v + SEA_SFX[sea]; } }
const _paintGroundCode = paintGround;
paintGround = function (c, sea) { _paintGroundCode(c, sea); if (!SPR_READY) return;
  for (let ty = 0; ty < MH; ty++) for (let tx = 0; tx < MW; tx++) { const tp = W.tiles[ty * MW + tx]; if (tp === T.BRIDGE || (tp === T.PATH && tx === PLATEAU_X0 - 1)) continue; const s = SPR[groundTileKey(tx, ty, sea)]; if (!s) continue; c.drawImage(s, tx * TS, ty * TS);
    if (tp !== T.CLIFF && tp !== T.LEDGE && tp !== T.WATER && tileAt(tx, ty - 1) === T.CLIFF) shadowRect(c, tx * TS, ty * TS, 16, 2 + (hsh(tx, ty, 160) < 0.5 ? 1 : 0)); } };
const _waterTileCode = waterTile;
waterTile = function (sea, frame, mask, tx, ty) { const s = SPR_READY && SPR['tile_water_edge_' + m3(blobMask(tx, ty, t => t === T.WATER || t === T.BRIDGE))]; return s || _waterTileCode(sea, frame, mask, tx, ty); };
/* ---------- props and trees: sprite feet (bottom centre) on the bottom centre of the tile. The code version still runs on a scratch
   canvas so its side effects (night lamp positions, chimney smoke, ...) stay; the code flag wave is dropped (the sprite has its flag). ---------- */
const PROP_SPR = { barrel: 'prop_barrel', crate: 'prop_crate', sack: 'prop_sack', haystack: 'prop_haystack', lamp: 'prop_streetlamp', signpost: 'prop_signpost', bench: 'prop_bench', grave: 'prop_gravestone', cross: 'prop_cross',
  stoneLantern: 'prop_stone_lantern', flag: 'prop_flag', flowerpot: 'prop_flowerpot', clothesline: 'prop_clothesline', cart: 'prop_handcart', bush: 'prop_bush', berryBush: 'prop_berries', stump: 'prop_stump', mushrooms: 'prop_mushroom',
  woodpile: 'prop_firewood', scarecrow: 'prop_scarecrow', beehive: 'prop_beehive', well2: 'prop_well', puddle: 'prop_puddle', anvil: 'prop_anvil', flowerbed: 'prop_flower_garden', garden: 'prop_vegetable_garden', pebbles: 'prop_pebbles',
  pot: 'prop_pot', logs: 'prop_logs', trough: 'prop_water_trough', wheelbarrow: 'prop_wheelbarrow', crates2: 'prop_crate_stack', stoneSmall: 'field_prop_rock_small', bones: 'prop_bones', signboard: 'prop_noticeboard' };
let _SCRATCH = null; const scratchCtx = () => (_SCRATCH || (_SCRATCH = mkCanvas(64, 64).getContext('2d')));
function sprFeet(c, cv, fx, fy) { c.drawImage(cv, Math.round(fx - cv.width / 2), Math.round(fy - cv.height)); }
for (const k in PROP_SPR) { const code = PROPS[k]; if (!code) continue; PROPS[k] = function (c, x, y, sea) { const cv = SPR_READY && SPR[PROP_SPR[k]]; if (!cv) return code(c, x, y, sea);
  const nf = FLAGS.length; code(scratchCtx(), x, y, sea); if (k === 'flag') FLAGS.length = nf; sprFeet(c, cv, x + 8, y + 16); }; }
const TREE_SPR = { conifer: 'field_prop_conifer', broad: 'field_prop_broadleaf', shrub: 'field_prop_bush', dead: 'field_prop_dead_tree' };
const _drawTreeCode = drawTree;
drawTree = function (c, tx, ty, sea) { if (SPR_READY) { const b = TREE_SPR[treeKind(tx, ty)]; const cv = SPR[b + (sea ? SEA_SFX[sea] : '')] || SPR[b]; if (cv) return sprFeet(c, cv, tx * TS + 8, ty * TS + 16); } return _drawTreeCode(c, tx, ty, sea); };
const _drawRockCode = drawRock;
drawRock = function (c, tx, ty, sea) { const cv = SPR_READY && SPR['field_prop_rock']; if (!cv) return _drawRockCode(c, tx, ty, sea); sprFeet(c, cv, tx * TS + 8, ty * TS + 16); };
