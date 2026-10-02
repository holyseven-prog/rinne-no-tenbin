/* ================= world / map / pathfinding ================= */
const T = { GRASS: 0, PATH: 1, WATER: 2, TREE: 3, ROCK: 4, FENCE: 5, FLOWER: 6, BRIDGE: 7, FIELD: 8, DARK: 9, BLD: 10, PLAZA: 11, DOOR: 12, SAND: 13 };
const BLOCK = new Uint8Array(16); BLOCK[T.WATER] = 1; BLOCK[T.TREE] = 1; BLOCK[T.ROCK] = 1; BLOCK[T.FENCE] = 1; BLOCK[T.BLD] = 1;
const TOWN_X0 = 16, TOWN_X1 = 42, FIELD_X0 = 43, PLATEAU_X0 = 56;
const PLAZA = { x: 28, y: 21 };

function zoneOf(x) { return x < TOWN_X0 ? 'farm' : x <= TOWN_X1 ? 'town' : x < PLATEAU_X0 ? 'field' : 'plateau'; }

function buildWorld() {
  const tiles = new Uint8Array(MW * MH);
  const rg = new RNG(4242);
  const set = (x, y, v) => { if (x >= 0 && y >= 0 && x < MW && y < MH) tiles[y * MW + x] = v; };
  const get = (x, y) => (x < 0 || y < 0 || x >= MW || y >= MH) ? T.ROCK : tiles[y * MW + x];
  // base
  for (let y = 0; y < MH; y++) for (let x = 0; x < MW; x++) set(x, y, x >= PLATEAU_X0 ? T.DARK : (rg.chance(0.07) ? T.FLOWER : T.GRASS));
  // fields
  [[2, 3, 5, 5], [8, 3, 5, 5], [2, 9, 5, 5], [8, 9, 5, 5], [2, 15, 11, 3]].forEach(r => { for (let y = r[1]; y < r[1] + r[3]; y++) for (let x = r[0]; x < r[0] + r[2]; x++) set(x, y, T.FIELD); });
  // lake
  for (let y = 25; y <= 35; y++) for (let x = 45; x <= 53; x++) { const dx = (x - 49) / 3.6, dy = (y - 30) / 4.2; if (dx * dx + dy * dy <= 1) set(x, y, T.WATER); }
  for (let y = 24; y <= 36; y++) for (let x = 44; x <= 54; x++) { if (get(x, y) !== T.WATER) { const n = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(d => get(x + d[0], y + d[1]) === T.WATER); if (n) set(x, y, T.SAND); } }
  // trees: borders and field
  for (let x = 14; x <= 44; x++) { for (let y = 0; y <= 4; y++) if (rg.chance(0.75)) set(x, y, T.TREE); for (let y = 37; y < MH; y++) if (rg.chance(0.75)) set(x, y, T.TREE); }
  for (let x = FIELD_X0; x < PLATEAU_X0; x++) for (let y = 0; y < MH; y++) { if (get(x, y) === T.GRASS || get(x, y) === T.FLOWER) { if (y >= 21 && y <= 25) continue; if (rg.chance(0.11)) set(x, y, T.TREE); else if (rg.chance(0.02)) set(x, y, T.ROCK); } }
  for (let x = PLATEAU_X0; x < MW; x++) for (let y = 0; y < MH; y++) { if (rg.chance(0.12) && !(y >= 9 && y <= 24 && x >= 56)) set(x, y, T.ROCK); }
  // north / south fence of the farm
  for (let x = 0; x < 15; x++) { set(x, 0, T.TREE); if (rg.chance(0.5)) set(x, 1, T.TREE); }
  for (let x = 0; x < 15; x++) for (let y = 29; y < MH; y++) if (rg.chance(0.55)) set(x, y, T.TREE);
  // roads
  const road = (x0, y0, x1, y1) => { for (let y = Math.min(y0, y1); y <= Math.max(y0, y1); y++) for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x++) { if (get(x, y) !== T.WATER) set(x, y, T.PATH); } };
  road(0, 23, 60, 23); road(17, 14, 42, 14); road(17, 31, 42, 31); road(17, 35, 42, 35); road(28, 6, 28, 35); road(60, 17, 60, 23); road(14, 14, 14, 23);
  // plaza
  for (let y = 17; y <= 22; y++) for (let x = 25; x <= 31; x++) if (get(x, y) !== T.PATH || (x !== 28 && y !== 23)) set(x, y, T.PLAZA);
  // buildings
  const blds = [];
  const mk = (kind, x, y, w, h, roof) => {
    const b = { id: blds.length, kind, x, y, w, h, roof: roof || 0, door: { x: x + (w >> 1), y: y + h - 1 }, appr: { x: x + (w >> 1), y: y + h } };
    for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) set(xx, yy, T.BLD);
    set(b.door.x, b.door.y, T.DOOR); if (get(b.appr.x, b.appr.y) !== T.PATH && get(b.appr.x, b.appr.y) !== T.PLAZA) set(b.appr.x, b.appr.y, T.PATH);
    blds.push(b); return b;
  };
  mk('church', 25, 9, 6, 5, 6);
  [[18, 11], [22, 11], [33, 11], [37, 11], [40, 11]].forEach((p, i) => mk('house', p[0], p[1], 3, 3, i % 4));
  mk('guild', 18, 19, 6, 4, 2); mk('tavern', 33, 19, 5, 4, 3); mk('shop', 39, 19, 4, 4, 1);
  mk('smithy', 17, 27, 5, 4, 4); mk('apothecary', 23, 27, 4, 4, 5); mk('inn', 30, 27, 6, 4, 0);
  [[41, 28]].forEach((p, i) => mk('house', p[0], p[1], 3, 3, (i + 2) % 4)); mk('armor', 37, 27, 4, 4, 5);
  [[18, 32], [22, 32], [32, 32], [36, 32], [40, 32]].forEach((p, i) => mk('house', p[0], p[1], 3, 3, (i + 1) % 4));
  mk('hut', 3, 20, 3, 3, 1); mk('hut', 11, 20, 3, 3, 2); mk('mill', 6, 19, 3, 4, 7);
  mk('castle', 58, 11, 5, 6, 8);
  // fountain & well (1x1 blocked deco)
  set(28, 19, T.BLD); set(25, 21, T.BLD); set(31, 21, T.BLD);
  // clear spawn areas
  const bk = {}; blds.forEach(b => { (bk[b.kind] = bk[b.kind] || []).push(b); });
  const fields = []; for (let y = 0; y < MH; y++) for (let x = 0; x < MW; x++) if (tiles[y * MW + x] === T.FIELD) fields.push({ x, y });
  const homes = blds.filter(b => b.kind === 'house' || b.kind === 'hut').map(b => b.id);
  return { tiles, blds, bk, fields, homes, get, set };
}
const W = buildWorld();
const walkable = (x, y) => x >= 0 && y >= 0 && x < MW && y < MH && !BLOCK[W.tiles[y * MW + x]];

/* A* (4-dir). returns array of tile idx from first step to goal, [] if already there, null if none */
const _g = new Float32Array(MW * MH), _par = new Int16Array(MW * MH), _stamp = new Int32Array(MW * MH);
let _st = 0;
function findPath(sx, sy, tx, ty, range, maxN) {
  sx = Math.round(sx); sy = Math.round(sy); tx = Math.round(tx); ty = Math.round(ty);
  range = range || 0; maxN = 2700;
  const r2 = range * range + 0.001;
  if ((sx - tx) * (sx - tx) + (sy - ty) * (sy - ty) <= r2) return [];
  _st++;
  const heap = []; // [f, idx]
  const push = (f, i) => { heap.push([f, i]); let k = heap.length - 1; while (k > 0) { const p = (k - 1) >> 1; if (heap[p][0] <= heap[k][0]) break; const tmp = heap[p]; heap[p] = heap[k]; heap[k] = tmp; k = p; } };
  const pop = () => { const top = heap[0]; const last = heap.pop(); if (heap.length) { heap[0] = last; let k = 0; for (; ;) { let l = k * 2 + 1, r = l + 1, m = k; if (l < heap.length && heap[l][0] < heap[m][0]) m = l; if (r < heap.length && heap[r][0] < heap[m][0]) m = r; if (m === k) break; const tmp = heap[m]; heap[m] = heap[k]; heap[k] = tmp; k = m; } } return top; };
  const s = sy * MW + sx;
  _stamp[s] = _st; _g[s] = 0; _par[s] = -1; push(Math.abs(sx - tx) + Math.abs(sy - ty), s);
  let n = 0, goal = -1;
  const D = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  while (heap.length && n++ < maxN) {
    const cur = pop()[1]; const cx = cur % MW, cy = (cur / MW) | 0;
    if ((cx - tx) * (cx - tx) + (cy - ty) * (cy - ty) <= r2) { goal = cur; break; }
    for (let d = 0; d < 4; d++) {
      const nx = cx + D[d][0], ny = cy + D[d][1];
      if (!walkable(nx, ny)) continue;
      const ni = ny * MW + nx; const ng = _g[cur] + 1;
      if (_stamp[ni] === _st && _g[ni] <= ng) continue;
      _stamp[ni] = _st; _g[ni] = ng; _par[ni] = cur; push(ng + (Math.abs(nx - tx) + Math.abs(ny - ty)) * 1.05, ni);
    }
  }
  if (goal < 0) return null;
  const out = []; for (let c = goal; c !== s && c >= 0; c = _par[c]) out.push(c);
  return out.reverse();
}
function nearestWalkable(x, y) {
  x = Math.round(x); y = Math.round(y);
  if (walkable(x, y)) return { x, y };
  for (let r = 1; r < 8; r++) for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) { if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue; if (walkable(x + dx, y + dy)) return { x: x + dx, y: y + dy }; }
  return { x: PLAZA.x, y: PLAZA.y };
}
function randWalkableIn(x0, y0, x1, y1) {
  for (let i = 0; i < 30; i++) { const x = rint(x0, x1), y = rint(y0, y1); if (walkable(x, y) && W.tiles[y * MW + x] !== T.DOOR) return { x, y }; }
  return nearestWalkable((x0 + x1) >> 1, (y0 + y1) >> 1);
}
function bldOfKind(kind) { return W.bk[kind] || []; }
function bldCenterTile(b) { return { x: b.appr.x, y: b.appr.y }; }
