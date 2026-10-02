/* ---- 01_util.js ---- */
'use strict';
/* ================= util / constants ================= */
const TICK_DAY = 144, DAYS_YEAR = 12, TICK_YEAR = 1728, MW = 64, MH = 40, TS = 16, START_TICK = 36;
const BOSS_BASE_TICK = 6 * TICK_YEAR;
let G = null, LANG = 'ja';
const TUNE = Object.assign({ bossHp: 2300, bossAtk: 38, bossDef: 22, bossGrow: 1.08, waveBase: 4, waveGrow: 2.2, waveInt: 8, waveDec: 1.1, drift: 1.2, cadMul: 1, pen: 1, disMul: 0, townDrain: 0.55, expDelay: 6, expRatio: 1.1, polRes: 60, warQuests: 0, scorch: 0.28 }, (typeof globalThis !== 'undefined' && globalThis.__TUNE) || {});
const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
const lerp = (a, b, t) => a + (b - a) * t;
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const isNum = v => typeof v === 'number' && isFinite(v);

function RNG(seed) { this.s = (seed >>> 0) || 1; }
RNG.prototype.next = function () {
  this.s = (this.s + 0x6D2B79F5) >>> 0;
  let t = this.s;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
RNG.prototype.int = function (a, b) { return a + Math.floor(this.next() * (b - a + 1)); };
RNG.prototype.pick = function (arr) { return arr[Math.floor(this.next() * arr.length)]; };
RNG.prototype.chance = function (p) { return this.next() < p; };
RNG.prototype.range = function (a, b) { return a + this.next() * (b - a); };

const rnd = () => G.rng.next();
const rint = (a, b) => G.rng.int(a, b);
const rpick = arr => G.rng.pick(arr);
const rchance = p => G.rng.next() < p;
const rrange = (a, b) => G.rng.range(a, b);
function strHash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }

/* ---- i18n core ---- */
const S = {};
function fmt(str, v) {
  if (!v) return str;
  return str.replace(/\{(\w+)\}/g, (m, k) => (v[k] === undefined ? m : v[k]));
}
const li = () => (LANG === 'ja' ? 0 : 1);
function t(k, v) {
  const e = S[k];
  if (!e) return '??' + k;
  return fmt(e[li()], v);
}
function pr(p, v) { return fmt(p[li()], v); }
function nm(e) { return e ? (e.name ? e.name[li()] : e.n ? e.n[li()] : '?') : '?'; }

/* ---- time ---- */
const hourOf = tk => Math.floor((tk % TICK_DAY) / 6);
const dayIdx = tk => Math.floor(tk / TICK_DAY);
const yearOf = tk => Math.floor(tk / TICK_YEAR) + 1;
const seasonOf = tk => Math.floor((dayIdx(tk) % DAYS_YEAR) / 3);
const KANJI_NUM = ['', '一', '二', '三'];
S.season = [['春', '夏', '秋', '冬'], ['春', '夏', '秋', '冬']];
function dateStr(tk, gen) {
  const y = yearOf(tk), s = S.season[0][seasonOf(tk)], d = (dayIdx(tk) % DAYS_YEAR) % 3 + 1, hh = hourOf(tk);
  if (LANG === 'ja') return `第${gen || 1}世 ${y}年目 ${s} ${KANJI_NUM[d]}日目 ${hh}時`;
  return `第${gen || 1}世 第${y}年 ${s} 第${KANJI_NUM[d]}日 ${hh}時`;
}
function timeWord(tk) {
  const h = hourOf(tk);
  return h < 5 ? 'night' : h < 10 ? 'morning' : h < 16 ? 'day' : h < 19 ? 'dusk' : h < 23 ? 'evening' : 'night';
}

/* ---- 02_data.js ---- */
/* ================= static data ================= */
const NAMES_M = [
  ['ガルド', '加爾德'], ['カイル', '凱爾'], ['トマス', '托馬斯'], ['ヴィクト', '維克特'], ['ロラン', '洛蘭'], ['ハンス', '漢斯'],
  ['オリン', '奧林'], ['バルト', '巴爾特'], ['ユーリ', '尤里'], ['ディオ', '迪歐'], ['ルカ', '盧卡'], ['ネロ', '內羅'],
  ['ベン', '班恩'], ['ラルフ', '拉爾夫'], ['ゼノ', '澤諾'], ['コルト', '柯爾特'], ['ミハイ', '米海'], ['アベル', '亞伯爾'],
  ['レオン', '雷昂'], ['タロス', '塔羅斯'], ['ヨーク', '約克'], ['ダン', '丹恩']];
const NAMES_F = [
  ['リナ', '莉娜'], ['ミーナ', '米娜'], ['セシル', '賽西爾'], ['エマ', '艾瑪'], ['レナ', '蕾娜'], ['フィオ', '菲歐'],
  ['アンナ', '安娜'], ['ノエル', '諾艾爾'], ['ティナ', '蒂娜'], ['ソフィ', '蘇菲'], ['ミレイ', '米蕾'], ['ララ', '菈菈'],
  ['ヘレン', '海倫'], ['イリス', '伊莉絲'], ['クララ', '克拉拉'], ['ニーナ', '妮娜'], ['ユナ', '尤娜'], ['マリア', '瑪莉亞'],
  ['ルシア', '露西亞'], ['ペトラ', '佩特拉'], ['エルナ', '艾爾娜'], ['ロッテ', '洛特']];

const JOBS = {
  swordsman: { n: ['剣士', '劍士'], hp: 44, atk: 9, def: 6, spd: 1.0, range: 1.5, adv: true },
  mage: { n: ['魔法使い', '魔法師'], hp: 28, atk: 12, def: 2, spd: 1.0, range: 5, adv: true },
  priest: { n: ['僧侶', '僧侶'], hp: 36, atk: 5, def: 4, spd: 1.0, range: 1.5, adv: true },
  thief: { n: ['盗賊', '盜賊'], hp: 32, atk: 8, def: 3, spd: 1.3, range: 1.5, adv: true },
  farmer: { n: ['農夫', '農夫'], hp: 30, atk: 3, def: 2, spd: 1.0, range: 1.5 },
  merchant: { n: ['商人', '商人'], hp: 30, atk: 3, def: 2, spd: 1.0, range: 1.5 },
  smith: { n: ['鍛冶', '鐵匠'], hp: 40, atk: 5, def: 5, spd: 0.9, range: 1.5 },
  herbalist: { n: ['薬師', '藥師'], hp: 28, atk: 3, def: 2, spd: 1.0, range: 1.5 },
  historian: { n: ['史官', '史官'], hp: 26, atk: 1, def: 1, spd: 1.0, range: 1.5 },
};
const ADV_JOBS = ['swordsman', 'mage', 'priest', 'thief'];

const TRAITS = {
  brave: ['勇敢', '勇敢'], timid: ['臆病', '膽小'], greedy: ['強欲', '貪婪'], loyal: ['義理堅い', '重義'],
  curious: ['好奇心', '好奇'], stubborn: ['頑固', '固執'], kind: ['優しい', '溫柔'], ambitious: ['野心家', '野心家'],
};
const TRAIT_KEYS = Object.keys(TRAITS);

/* monsters: hp atk def spd tier exp gold range */
const MONS = {
  mush: { n: ['ぷくぷく茸', '噗噗菇'], hp: 20, atk: 5, def: 1, spd: 0.8, tier: 1, exp: 6, gold: 2, range: 1.5 },
  bat: { n: ['影こうもり', '影蝠'], hp: 15, atk: 6, def: 0, spd: 1.3, tier: 1, exp: 6, gold: 2, range: 1.5 },
  turtle: { n: ['岩殻ガメ', '岩殼龜'], hp: 44, atk: 7, def: 7, spd: 0.7, tier: 2, exp: 11, gold: 4, range: 1.5 },
  goblin: { n: ['小鬼の斥候', '小鬼斥候'], hp: 36, atk: 10, def: 3, spd: 1.0, tier: 2, exp: 12, gold: 5, range: 1.5 },
  skel: { n: ['骸骨剣士', '骷髏劍士'], hp: 58, atk: 13, def: 5, spd: 1.0, tier: 3, exp: 18, gold: 7, range: 1.5 },
  wolf: { n: ['魔狼', '魔狼'], hp: 52, atk: 15, def: 3, spd: 1.4, tier: 3, exp: 20, gold: 8, range: 1.5 },
};
const MON_BY_TIER = { 1: ['mush', 'bat'], 2: ['turtle', 'goblin'], 3: ['skel', 'wolf'] };
const CADRES = [
  { key: 'verna', n: ['霧の公爵ヴェルナ', '霧公爵 維爾娜'], hp: 380, atk: 19, def: 8, spd: 1.0, range: 4, home: { x: 50, y: 29 } },
  { key: 'garum', n: ['骨の将軍ガルム', '骨將軍 加爾姆'], hp: 460, atk: 22, def: 11, spd: 0.9, range: 1.5, home: { x: 52, y: 11 } },
  { key: 'serene', n: ['影の女王セレネ', '影之女王 瑟蕾娜'], hp: 340, atk: 21, def: 7, spd: 1.3, range: 1.5, home: { x: 46, y: 35 } },
];
const BOSS = { key: 'noctal', n: ['黒冠の王ノクタール', '黑冠之王 諾克塔爾'], hp: TUNE.bossHp, atk: TUNE.bossAtk, def: TUNE.bossDef, spd: 1.0, range: 1.8, home: { x: 60, y: 17 } };

const POWERS = [
  { id: 'oracle', cost: 6, n: ['神託', '神諭'], d: ['住人に夢でお告げ。行動の傾向を一時的に変える', '以夢境向居民降下神諭，暫時改變其行動傾向'] },
  { id: 'grace', cost: 15, n: ['恩寵', '恩寵'], d: ['回復・幸運・才能の一時付与', '賜予回復、幸運與暫時的才能'] },
  { id: 'trial', cost: 25, n: ['試煉', '試煉'], d: ['困難を与える。成長や悲劇のきっかけ', '降下困難，成為成長或悲劇的契機'] },
  { id: 'soul', cost: 30, n: ['魂への干渉', '干涉靈魂'], d: ['転生先や因果に介入する（眷顧者に強い）', '介入轉生去向與因果（對眷顧者特別有效）'] },
  { id: 'force', cost: 40, n: ['勢力操作', '勢力操作'], d: ['光と闇の勢力バランスを動かす', '撥動光與暗的勢力平衡'] },
];
const POWER_BY_ID = {}; POWERS.forEach(p => POWER_BY_ID[p.id] = p);

const GODS = [
  { id: 'mercy', n: ['慈愛の神', '慈愛之神'], d: ['初期信仰が高く、恩寵が安い。', '初始信仰較高，恩寵較便宜。'], faith0: 70, cost: { grace: 0.75 }, bonus: { grace: 0.08, soul: 0.04 } },
  { id: 'order', n: ['秩序の神', '秩序之神'], d: ['神託が安く、成功しやすい。', '神諭便宜且容易成功。'], faith0: 60, cost: { oracle: 0.6 }, bonus: { oracle: 0.1, force: 0.05 } },
  { id: 'chaos', n: ['混沌の神', '混沌之神'], d: ['試煉と勢力操作が安いが、結果が荒れる。', '試煉與勢力操作便宜，但結果起伏劇烈。'], faith0: 55, cost: { trial: 0.6, force: 0.8 }, bonus: { trial: 0.1 }, wild: 0.08 },
];

const PRAYER_KINDS = ['sick', 'hunger', 'love', 'battle', 'revenge', 'forgive', 'birth', 'fear'];
const PRAYER_ANS = { // which powers can answer
  sick: ['grace', 'oracle'], hunger: ['grace', 'oracle'], love: ['oracle', 'grace'], battle: ['grace', 'oracle'],
  revenge: ['oracle', 'soul'], forgive: ['oracle', 'soul'], birth: ['grace'], fear: ['grace', 'oracle', 'soul'],
};
S.pray_sick = [['体が熱い。どうか、この病を取り除いてください……', '身體發燙。求您，帶走這場病……'], ['傷が癒えません。神よ、あと少しだけ力を。', '傷口遲遲不癒合。神啊，再給我一點力氣。']];
S.pray_hunger = [['もう何日もまともに食べていません。パンを一切れ、どうか。', '好幾天沒好好吃過東西了。求您，賜我一塊麵包。'], ['畑が痩せていて、食べるものがありません……。', '田地貧瘠，沒有東西可吃……。']];
S.pray_love = [['あの人に、この想いが届きますように。', '願這份心意，能傳達給那個人。'], ['あの人の隣にいたい。それだけが、願いです。', '想待在那個人身邊。這就是我唯一的願望。']];
S.pray_battle = [['これから戦いに向かいます。仲間を、どうかお守りください。', '我即將奔赴戰場。求您守護我的夥伴。'], ['剣を握る手が震えます。勇気を、お与えください。', '握劍的手在顫抖。求您賜予我勇氣。']];
S.pray_revenge = [['あいつを許せない。この憎しみを、どうすればいいのですか。', '無法原諒那傢伙。這份恨意，我該怎麼辦。'], ['奪われたものを、取り返したい。', '我想奪回被搶走的東西。']];
S.pray_forgive = [['取り返しのつかないことをしました。赦しを、どうか。', '我犯下了無法挽回的錯。求您寬恕。'], ['あの日の言葉を、取り消せるなら……。', '若能收回那天說的話……。']];
S.pray_birth = [['もうすぐ、子が生まれます。母子ともに無事でありますように。', '孩子就快出生了。願母子平安。']];
S.pray_fear = [['死ぬのが、怖いのです。眠るたび、闇が近づいてくる。', '我害怕死亡。每次入睡，黑暗都更近一步。'], ['この命は、どこへ行くのでしょう。', '這條生命，究竟要往哪裡去呢。']];
S.pk = {}; // prayer kind names
['sick:病気:疾病', 'hunger:飢え:飢餓', 'love:恋:戀情', 'battle:戦の加護:戰場加護', 'revenge:復讐:復仇', 'forgive:赦し:寬恕', 'birth:子の誕生:新生命', 'fear:死の恐れ:死亡恐懼'].forEach(s => { const a = s.split(':'); S['pk_' + a[0]] = [a[1], a[2]]; });

const PLACES = { // key -> names
  farm: ['西の農地', '西邊農地'], town: ['町リュミエ', '琉米耶鎮'], field: ['魔物の野', '魔物原野'], plateau: ['魔王の台地', '魔王高地'],
  guild: ['天秤亭', '天秤亭'], tavern: ['酒場', '酒館'], church: ['教会', '教會'], smithy: ['鍛冶屋', '鐵匠鋪'], shop: ['道具屋', '雜貨鋪'],
  apothecary: ['薬屋', '藥鋪'], inn: ['宿屋', '旅店'], house: ['民家', '民宅'], mill: ['風車小屋', '風車小屋'], hut: ['農家', '農舍'], castle: ['魔王城', '魔王城'],
  plaza: ['広場', '廣場'], lake: ['湖のほとり', '湖畔'], wood: ['森の道', '森林小徑'],
};

/* ---- 03_world.js ---- */
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
  [[37, 28], [41, 28]].forEach((p, i) => mk('house', p[0], p[1], 3, 3, (i + 2) % 4));
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

/* ---- 04_state.js ---- */
/* ================= state / entities ================= */
const AGING = 4; // human years per game year
const ADULT_AGE = 14, ELDER_AGE = 55;
const POP_MAX = 80;
const HAIR_N = 8, CLOTH_N = 8;

function emptyKarma() { return { good: 0, evil: 0, deed: 0, attach: 0 }; }
function mkSoul(h) {
  const s = { id: G.nid++, k: emptyKarma(), lives: [], state: 'alive', hid: h ? h.id : 0, wait: 0, fav: false, bonds: [], echo: null, lastJob: h ? h.job : null, name: h ? h.name : null };
  G.souls.push(s); if (G.sidx) G.sidx[s.id] = s; return s;
}
function soulOf(h) { return G.sidx[h.soul]; }
function hById(id) { return G.idx[id]; }

function newGame(o) {
  o = o || {};
  if (o.lang) LANG = o.lang;
  const seed = (o.seed === undefined ? (Date.now() & 0xffffff) : o.seed) >>> 0;
  const god = GODS.find(g => g.id === (o.god || 'mercy')) || GODS[0];
  G = {
    ver: 1, seed, god: god.id, gen: o.gen || 1, tick: START_TICK, rng: new RNG(seed), nid: 1,
    humans: [], monsters: [], souls: [], quests: [], parties: [], prayers: [], events: [], chapters: [], log: [],
    faith: god.faith0, faithMax: 150, balance: 20, balAcc: 0, balYear: [], hist: [],
    eye: 3, eyeT: 0, town: { food: 140, gold: 200, hp: 100, potions: 8, gearStock: 4 },
    boss: null, cadres: [], awakenTick: BOSS_BASE_TICK, awakened: false, bossFight: false, lastBossTry: -99999,
    ending: null, stats: { kills: 0, deaths: 0, births: 0, prayers: 0, answered: 0, casts: 0, quests: 0, raids: 0 },
    flags: {}, tut: { prayer: false, oracle: false, chron: false, counsel: false, skipped: false }, favored: [], policy: 'none',
    stag: 0, faithZero: 0, raidDay: 0, dayKills: 0, dayGood: 0, dayEvil: 0, lastNotable: 0, spot: [], track: [],
    idx: {}, sidx: {}, qidx: {}, pidx: {}, killBal: 0, oracleNext: 0, nextQuestDay: 0, bossTries: 0, townAlert: 0, wave: 0, chapNo: 0, lastChapTick: 0, reunions: {}, nameUse: {}, userScheduled: {},
  };
  initWorldState();
  rebuildIdx();
  chronPrologue();
  return G;
}
function rebuildIdx() {
  G.idx = {}; G.sidx = {};
  G.humans.forEach(h => G.idx[h.id] = h);
  G.monsters.forEach(m => G.idx[m.id] = m);
  G.souls.forEach(s => G.sidx[s.id] = s);
  G.qidx = {}; G.quests.forEach(q => G.qidx[q.id] = q);
  G.pidx = {}; G.parties.forEach(p => G.pidx[p.id] = p);
}

function pickName(sex) {
  const pool = sex === 'M' ? NAMES_M : NAMES_F;
  for (let i = 0; i < 12; i++) { const n = rpick(pool); if (!G.humans.some(h => h.alive && h.name[0] === n[0])) return n; }
  return rpick(pool);
}
function lvlMul(l) { return 1 + 0.14 * (l - 1); }
function mkHuman(o) {
  const J = JOBS[o.job];
  const sex = o.sex || (rchance(0.5) ? 'M' : 'F');
  const age = o.age === undefined ? rint(18, 40) : o.age;
  const lvl = o.lvl || 1;
  const tr = []; const t1 = rpick(TRAIT_KEYS); tr.push(t1); if (rchance(0.5)) { const t2 = rpick(TRAIT_KEYS); if (t2 !== t1) tr.push(t2); }
  const h = {
    id: G.nid++, name: o.name || pickName(sex), sex, age, job: o.job, lvl, exp: 0, hp: 1, maxHp: 1, gold: o.gold !== undefined ? o.gold : rint(10, 60),
    needs: { hunger: rrange(5, 40), energy: rrange(0, 30), safety: 5, wealth: rrange(10, 50), belong: rrange(10, 60), honor: rrange(0, 50), faith: rrange(10, 50) },
    traits: o.traits || tr, home: o.home === undefined ? -1 : o.home, rel: {}, soul: 0, alive: true,
    x: 0, y: 0, px: 0, py: 0, path: [], act: null, state: 'idle', tgt: 0, cd: 0, inside: 0, gear: o.gear || 0, pots: 0, buffs: {}, bias: null,
    spouse: 0, master: 0, party: 0, kills: 0, thinkCd: rint(0, 2), prayCd: rint(30, 120), fame: 0, adv: o.adv !== undefined ? o.adv : !!J.adv, retired: !!o.retired,
    look: o.look || { hair: rint(0, HAIR_N - 1), style: rint(0, 3), skin: rint(0, 2), cloth: rint(0, CLOTH_N - 1), acc: rint(0, 2) },
    motive: [], drama: { desire: '', fear: '', secret: '', lie: '' }, born: G.tick, lastEat: 0, echo: o.echo || null, child: age < ADULT_AGE, hideT: 0, healCd: 0, cause: '', lastPrayKind: '', grief: 0, ageAcc: 0,
  };
  const st = hStats(h); h.maxHp = st.hp; h.hp = o.hpFrac ? st.hp * o.hpFrac : st.hp;
  const s = o.soul ? G.sidx[o.soul] : null;
  if (s) { h.soul = s.id; s.hid = h.id; s.state = 'alive'; } else { const ns = mkSoul(h); h.soul = ns.id; }
  return h;
}
function hStats(h) {
  if (h._st && h._sT === G.tick && h._sL === h.lvl && h._sG === h.gear && h._sJ === h.job) return h._st;
  const J = JOBS[h.job]; const m = lvlMul(h.lvl) * (1 + 0.07 * h.gear);
  let ageM = 1; if (h.age < ADULT_AGE) ageM = 0.35 + 0.65 * (h.age / ADULT_AGE); else if (h.age > 58) ageM = Math.max(0.6, 1 - (h.age - 58) * 0.02);
  const b = h.buffs; const bm = (b.grace && b.grace > G.tick ? 1.2 : 1) * (b.bless && b.bless > G.tick ? 1.2 : 1);
  const bd = G.balance >= 50 ? 1.04 : 1;
  const out = { hp: J.hp * lvlMul(h.lvl) * (1 + 0.04 * h.gear) * ageM, atk: J.atk * m * ageM * bm * bd, def: J.def * m * ageM * (b.grace && b.grace > G.tick ? 1.2 : 1) * (b.bless && b.bless > G.tick ? 1.1 : 1), spd: J.spd * (b.haste && b.haste > G.tick ? 1.2 : 1), range: J.range };
  h._st = out; h._sT = G.tick; h._sL = h.lvl; h._sG = h.gear; h._sJ = h.job; return out;
}
function placeAt(e, x, y) { e.x = x; e.y = y; e.px = x; e.py = y; e.path = []; }
function homeDoor(h) { const b = W.blds[h.home]; return b ? b.appr : PLAZA; }

function initWorldState() {
  // souls & humans
  const homes = W.homes.slice();
  const bad = G.rng;
  const R0 = [
    ['swordsman', 58, 12, { nm: ['ガルド', '加爾德'], sex: 'M', adv: false, retired: true, traits: ['stubborn', 'loyal'], key: 'gald' }],
    ['swordsman', 19, 3, { nm: ['カイル', '凱爾'], sex: 'M', traits: ['brave', 'curious'], key: 'kyle' }],
    ['swordsman', 27, 4], ['swordsman', 31, 5], ['swordsman', 23, 2],
    ['mage', 27, 4], ['mage', 22, 2], ['priest', 29, 4], ['thief', 24, 3],
    ['historian', 41, 1, { nm: ['ソウジュ', '蒼壽'], sex: 'M', traits: ['curious', 'kind'], key: 'souju' }],
    ['priest', 45, 3, { adv: false }], ['priest', 33, 2, { adv: false }],
  ];
  for (let i = 0; i < 9; i++) R0.push(['farmer', rint(20, 46), 1 + rint(0, 2)]);
  for (let i = 0; i < 3; i++) R0.push(['merchant', rint(24, 48), 1 + rint(0, 2)]);
  for (let i = 0; i < 2; i++) R0.push(['smith', rint(26, 48), 2]);
  for (let i = 0; i < 2; i++) R0.push(['herbalist', rint(24, 44), 2]);
  for (let i = 0; i < 4; i++) R0.push([rpick(['farmer', 'merchant']), rint(4, 11), 1, { child: true }]);
  ['farmer', 'merchant', 'smith', 'herbalist'].forEach(j => R0.push([j, rint(56, 64), 2, { elder: true }]));
  const used = new Set();
  R0.forEach((r, i) => {
    const o = r[3] || {};
    let sex = o.sex || (rchance(0.5) ? 'M' : 'F');
    const nm = o.nm || null;
    const h = mkHuman({ job: r[0], age: r[1], lvl: r[2], name: nm || pickName(sex), sex, traits: o.traits, adv: o.adv, retired: o.retired, gold: r[0] === 'swordsman' ? rint(30, 90) : undefined, gear: r[0] === 'swordsman' && r[2] > 3 ? 1 : 0 });
    if (o.key) G.flags[o.key] = h.id;
    G.humans.push(h);
  });
  // families / homes (3 per household, 14 homes)
  let hi = 0;
  const adults = G.humans.filter(h => h.age >= ADULT_AGE); const kids = G.humans.filter(h => h.age < ADULT_AGE);
  adults.forEach((h, i) => { h.home = homes[i % homes.length]; });
  kids.forEach((k, i) => { const par = adults[(i * 5 + 3) % adults.length]; k.home = par.home; });
  // Gald's apprentice Kyle shares home; master relation
  const gald = hById0('gald'), kyle = hById0('kyle');
  kyle.home = gald.home; kyle.master = gald.id; kyle.rel[gald.id] = 80; gald.rel[kyle.id] = 80;
  G.humans.forEach(h => { const d = homeDoor(h); const p = nearestWalkable(d.x, d.y); placeAt(h, p.x, p.y); h.look.cloth = JOB_CLOTH[h.job] !== undefined ? (JOB_CLOTH[h.job] + (h.id % 2)) % CLOTH_N : h.look.cloth; });
  // couples
  const mf = adults.filter(h => !h.adv || h.job === 'swordsman');
  const cp = (a, b) => { if (!a || !b || a.spouse || b.spouse) return; a.spouse = b.id; b.spouse = a.id; a.rel[b.id] = 90; b.rel[a.id] = 90; b.home = a.home; };
  const farmers = G.humans.filter(h => h.job === 'farmer' && h.age >= 20 && h.age < 50);
  for (let i = 0; i + 1 < farmers.length; i += 2) { if (farmers[i].sex !== farmers[i + 1].sex) cp(farmers[i], farmers[i + 1]); }
  // random acquaintance seeds
  G.humans.forEach(h => { for (let i = 0; i < 3; i++) { const o = rpick(G.humans); if (o !== h) h.rel[o.id] = rint(10, 45); } });
  G.humans.forEach(h => { h.hp = hStats(h).hp; h.maxHp = h.hp; });
  // monsters boss/cadres (dormant)
  G.boss = mkMonster('boss', BOSS.home.x, BOSS.home.y); G.boss.dormant = true; G.monsters.push(G.boss);
  CADRES.forEach((c, i) => { const m = mkMonster('cad' + i, c.home.x, c.home.y); m.hp = m.maxHp = Math.round(m.hp * TUNE.cadMul); m.atk *= TUNE.cadMul; m.dormant = true; G.cadres.push(m.id); G.monsters.push(m); });
  // initial wildlife
  for (let i = 0; i < 4; i++) spawnMonster(1);
  // opening prologue chapter (written at tick 0)
  G.pendingProlog = true;
}
const JOB_CLOTH = { swordsman: 0, mage: 1, priest: 2, thief: 3, farmer: 4, merchant: 5, smith: 6, herbalist: 7, historian: 2 };
function hById0(key) { return G.humans.find(h => h.id === G.flags[key]); }

/* ---- monsters ---- */
function mkMonster(type, x, y) {
  let base, key = type, boss = false, cad = -1;
  if (type === 'boss') { base = BOSS; boss = true; } else if (type.startsWith('cad')) { cad = +type.slice(3); base = CADRES[cad]; } else base = MONS[type];
  const m = {
    id: G.nid++, type, x, y, px: x, py: y, hp: base.hp, maxHp: base.hp, atk: base.atk, def: base.def, spd: base.spd, range: base.range, cd: 0, tgt: 0, path: [], alive: true,
    home: { x, y }, mode: 'wander', boss, cad, tier: base.tier || (boss ? 5 : 4), dormant: false, wt: rint(0, 6), sk: 0, born: G.tick, lvl: 1,
  };
  return m;
}
function monMul() { const yr = (G.tick - START_TICK) / TICK_YEAR; return 1 + 0.045 * yr; }
function spawnMonster(tier, near, mode) {
  if (G.monsters.filter(m => m.alive && !m.boss && m.cad < 0).length > 40) return null;
  const yr = yearOf(G.tick);
  const type = rpick(MON_BY_TIER[tier] || MON_BY_TIER[1]);
  let p;
  if (near) { p = nearestWalkable(near.x + rint(-3, 3), near.y + rint(-3, 3)); }
  else {
    const lo = tier === 1 ? 45 : tier === 2 ? 47 : 49;
    p = randWalkableIn(lo, 3, 55, 38);
  }
  const m = mkMonster(type, p.x, p.y);
  const mm = monMul();
  m.hp = m.maxHp = Math.round(m.hp * mm); m.atk *= mm; m.def *= (1 + 0.03 * (yr - 1));
  m.mode = mode || 'wander';
  G.monsters.push(m); G.idx[m.id] = m; return m;
}

/* ---- 05_ai.js ---- */
/* ================= human AI ================= */
const isAdv = h => h.adv && !h.retired && h.age >= 16 && h.alive;
const SEASON_YIELD = [1.0, 1.25, 1.4, 0.45];
const WALK = 0.55;

function moveAlong(e, sp) {
  let left = sp;
  while (left > 1e-6 && e.path.length) {
    const idx = e.path[0]; const tx = idx % MW, ty = (idx / MW) | 0;
    const dx = tx - e.x, dy = ty - e.y; const d = Math.hypot(dx, dy);
    if (Math.abs(dx) > Math.abs(dy)) e.dir = dx > 0 ? 3 : 2; else if (d > 0.01) e.dir = dy > 0 ? 0 : 1;
    if (d <= left) { e.x = tx; e.y = ty; e.path.shift(); left -= d; }
    else { e.x += dx / d * left; e.y += dy / d * left; left = 0; }
  }
}
function pathTo(e, tx, ty, range) {
  const p = findPath(e.x, e.y, tx, ty, range || 0);
  if (!p) return false; e.path = p; return true;
}

function updateHuman(h) {
  const n = h.needs;
  h.age += AGING / TICK_YEAR;
  const sleeping = h.act && h.act.k === 'sleep' && h.act.st === 1;
  n.hunger = Math.min(100, n.hunger + (sleeping ? 0.18 : 0.38));
  n.energy = clamp(n.energy + (sleeping ? -1.1 : 0.2), 0, 100);
  n.belong = Math.min(100, n.belong + 0.1);
  n.faith = Math.min(100, n.faith + 0.07);
  n.wealth = clamp(75 - h.gold * 0.5, 0, 100);
  n.safety = Math.max(0, n.safety - 0.5);
  if (h.child && h.age >= ADULT_AGE) becomeAdult(h);
  // starvation
  if (h.party && n.hunger >= 80 && G.town.food >= 1) { G.town.food -= 1; n.hunger = Math.max(0, n.hunger - 60); }
  if (n.hunger >= 100) { h.hp -= h.maxHp * 0.004; if (h.hp <= 0) { killHuman(h, 'starve', null); return; } }
  if (h.hp < h.maxHp && !h.tgt) h.hp = Math.min(h.maxHp, h.hp + h.maxHp * (sleeping ? 0.01 : 0.0015));
  if (h.hp <= 0) { killHuman(h, 'battle', null); return; }
  if (h.inside && !(h.act && (h.act.k === 'sleep' || h.act.k === 'hide' || h.act.k === 'rest' || h.act.k === 'eat' || h.act.k === 'shop' || h.act.k === 'work' && h.act.st === 1 && h.act.hid))) h.inside = 0;
  h.prayCd--; h.healCd--;
  // combat / threat handling
  if (!h.inside) { if (combatStep(h)) return; }
  if (G.townAlert > 0 && (G.tick + h.id) % 3 === 0 && !h.party && !(h.flee > G.tick) && canFight(h) && h.needs.hunger < 85 && h.needs.energy < 90 && h.hp > h.maxHp * 0.5 && !h.tgt && !(h.act && ['muster', 'hide', 'rest'].indexOf(h.act.k) >= 0)) { cancelAct(h); startAct(h, 'muster'); }
  // act
  if (h.act) { if (h.act.k === 'quest') partyStep(h); else stepAct(h); return; }
  if (h.path.length) { moveAlong(h, WALK * hStats(h).spd); return; }
  if (--h.thinkCd <= 0) { think(h); h.thinkCd = 2; }
}

function becomeAdult(h) {
  h.child = false; const s = soulOf(h);
  const job = pickJobForSoul(s);
  h.job = job; h.adv = !!JOBS[job].adv && !(job === 'priest' && rchance(0.35)); h.lvl = Math.max(1, h.lvl);
  const st = hStats(h); h.maxHp = st.hp; h.hp = st.hp; h.look.cloth = JOB_CLOTH[job];
  logEvent('coming_of_age', [h.id], { job }, [], 0.3, 0.5);
  if (h.echo) logEvent('soul_echo', [h.id], { prev: h.echo.name, job: h.echo.job }, ['soul'], 0.7, 0.9, h);
}
function pickJobForSoul(s) {
  const k = s ? s.k : emptyKarma(); const advN = G.humans.filter(x => x.alive && isAdv(x)).length;
  const w = {
    swordsman: 1 + k.deed * 0.12 + (advN < 12 ? 2.4 : 0), mage: 0.7 + k.deed * 0.08 + (advN < 12 ? 1.4 : 0), priest: 0.7 + k.good * 0.14, thief: 0.4 + k.evil * 0.16,
    farmer: 2.2, merchant: 1.1, smith: 0.9, herbalist: 0.9,
  };
  if (s && s.lastJob && s.lastJob !== 'historian' && k.attach >= 3) w[s.lastJob] = (w[s.lastJob] || 1) * (1 + k.attach * 0.25);
  const tot = Object.values(w).reduce((a, b) => a + b, 0); let r = rnd() * tot;
  for (const j in w) { r -= w[j]; if (r <= 0) return j; }
  return 'farmer';
}

/* ---------- decision ---------- */
function openQuests() { return G.quests.filter(q => q.state === 'open'); }
function think(h) {
  if (h.job === 'historian' && h.age >= ADULT_AGE) { thinkHistorian(h); return; }
  const n = h.needs, hr = hourOf(G.tick), night = hr >= 22 || hr < 5, day = hr >= 6 && hr < 18;
  const hpf = h.hp / h.maxHp; const has = x => h.traits.includes(x);
  const b = h.bias && h.bias.until > G.tick ? h.bias.kind : null;
  const C = [];
  const add = (k, s, why) => { if (s > 0.03) C.push({ k, s: s + rnd() * 0.05, why }); };
  add('sleep', n.energy / 100 * (night ? 1.9 : 0.3) + (n.energy > 85 ? 0.5 : 0), [['sleep', n.energy / 100]]);
  if (G.town.food > 0 || h.job === 'farmer') add('eat', n.hunger >= 30 ? n.hunger / 100 * 1.4 + (n.hunger > 65 ? 0.5 : 0) : 0, [['hunger', n.hunger / 100]]);
  const adult = h.age >= ADULT_AGE;
  const adv = isAdv(h);
  if (!adult) add('learn', day ? 0.55 : 0.05, [['learn', 0.5]]);
  else if (adv) {
    if (hpf > 0.65 && !night) {
      const qs = openQuests().length;
      const bossQ = openQuests().some(q => q.type === 'boss');
      if (qs > 0) add('quest', (0.6 + n.honor / 220 + n.wealth / 280 + (has('brave') ? 0.2 : 0) + (has('ambitious') ? 0.12 : 0) - (has('timid') ? 0.25 : 0) + (b === 'brave' ? 0.4 : 0) - (b === 'careful' ? 0.45 : 0) + (bossQ ? 0.3 : 0)), [['honor', n.honor / 100], ['wealth', n.wealth / 100], ['brave', has('brave') ? 0.3 : 0]]);
      
    }
    add('train', day ? 0.3 : 0.05, [['honor', n.honor / 100]]);
    if (h.gold >= 12 && h.pots < 2 && G.town.potions >= 1) add('shopP', h.pots < 1 ? 1.35 : 0.5 + (hpf < 0.7 ? 0.2 : 0), [['wealth', 0.3]]);
    if (h.gear < 6 && h.gold >= gearCost(h) && G.town.gearStock >= 1) add('shopG', 0.55, [['honor', 0.4]]);
  } else add('work', (day ? 0.62 + n.wealth / 400 : 0.04) + (b === 'careful' ? 0.1 : 0), [['wealth', n.wealth / 100]]);
  add('pray', n.faith / 100 * 0.6 + (h.job === 'priest' ? 0.25 : 0) + ((hr === 7 || hr === 18) ? 0.25 : 0) + (b === 'kind' ? 0.3 : 0), [['faith', n.faith / 100]]);
  add('social', (n.belong / 100) * (hr >= 17 && hr < 23 ? 1.25 : 0.55) + (b === 'kind' ? 0.3 : 0), [['belong', n.belong / 100]]);
  add('rest', hpf < 0.75 ? (1 - hpf) * 1.6 + (b === 'careful' ? 0.3 : 0) : 0, [['hp', 1 - hpf]]);
  if (!C.length) { h.thinkCd = 3; return; }
  C.sort((a, c) => c.s - a.s);
  h.motive = C.slice(0, 3).map(c => [c.k, +c.s.toFixed(2)].concat([c.why[0][0], +c.why[0][1].toFixed(2)]));
  const k = C[0].k;
  if (k === 'quest') { if (!tryFormParty(h)) { startAct(h, 'train'); } return; }
  startAct(h, k);
  maybePray(h);
}
function gearCost(h) { return Math.round(30 * Math.pow(1.7, h.gear)); }

function thinkHistorian(h) {
  const hr = hourOf(G.tick); const n = h.needs;
  if (n.energy > 60 && (hr >= 22 || hr < 5)) { startAct(h, 'sleep'); return; }
  if (n.hunger > 55 && G.town.food > 0) { startAct(h, 'eat'); return; }
  startAct(h, 'work');
}

/* ---------- acts ---------- */
function bldDoor(b) { return { tx: b.door.x, ty: b.door.y, range: 0, bld: b.id }; }
function pickBld(kind) { const l = bldOfKind(kind); return l.length ? l[0] : null; }
function actTarget(h, k) {
  const hr = hourOf(G.tick);
  switch (k) {
    case 'sleep': case 'hide_home': { const b = W.blds[h.home] || pickBld('house'); return bldDoor(b); }
    case 'eat': { if (h.gold >= 3 && h.needs.belong > 40 && !h.child && hr >= 11) return bldDoor(pickBld('tavern')); return bldDoor(W.blds[h.home] || pickBld('house')); }
    case 'rest': { if (h.gold >= 8 && h.hp < h.maxHp * 0.5 && !isHidden(h)) return bldDoor(pickBld('inn')); return bldDoor(W.blds[h.home] || pickBld('house')); }
    case 'pray': return bldDoor(pickBld('church'));
    case 'shopP': return bldDoor(pickBld('apothecary'));
    case 'shopG': return bldDoor(pickBld('smithy'));
    case 'social': { if (hr >= 17 && hr < 24 && h.gold >= 3) return bldDoor(pickBld('tavern')); const p = randWalkableIn(25, 17, 31, 22); return { tx: p.x, ty: p.y, range: 0 }; }
    case 'muster': { const p = randWalkableIn(34, 21, 38, 25); return { tx: p.x, ty: p.y, range: 0 }; }
    case 'train': { const p = randWalkableIn(18, 24, 26, 25); return { tx: p.x, ty: p.y, range: 0 }; }
    case 'learn': { if (rchance(0.5)) return bldDoor(pickBld('church')); const p = randWalkableIn(25, 17, 31, 22); return { tx: p.x, ty: p.y, range: 0 }; }
    case 'hunt': { const p = randWalkableIn(FIELD_X0 + 1, 8, FIELD_X0 + 3 + Math.min(3, yearOf(G.tick) >> 1), 36); return { tx: p.x, ty: p.y, range: 0 }; }
    case 'work': return workTarget(h);
  }
  return null;
}
function isHidden(h) { return !!h.inside; }
function workTarget(h) {
  switch (h.job) {
    case 'farmer': { const f = rpick(W.fields); return { tx: f.x, ty: f.y, range: 0 }; }
    case 'merchant': return bldDoor(pickBld('shop'));
    case 'smith': return bldDoor(pickBld('smithy'));
    case 'herbalist': return bldDoor(pickBld('apothecary'));
    case 'priest': return bldDoor(pickBld('church'));
    case 'historian': { const p = G.lastEvPos || PLAZA; const q = nearestWalkable(clamp(p.x + rint(-2, 2), 17, 42), clamp(p.y + rint(-2, 2), 6, 36)); return { tx: q.x, ty: q.y, range: 0 }; }
    default: { const p = randWalkableIn(25, 17, 31, 22); return { tx: p.x, ty: p.y, range: 0 }; }
  }
}
const ACT_DUR = { muster: 40, sleep: 70, eat: 2, rest: 14, pray: 4, shopP: 2, shopG: 2, social: 6, train: 10, learn: 12, hunt: 22, work: 12, hide: 8, hide_home: 8 };
function startAct(h, k) {
  if (k === 'wander') { h.thinkCd = 3; return false; }
  const tg = actTarget(h, k);
  if (!tg) { h.thinkCd = 3; return false; }
  const a = { k, tx: tg.tx, ty: tg.ty, range: tg.range, bld: tg.bld === undefined ? -1 : tg.bld, st: 0, n: 0, dur: ACT_DUR[k] || 6, t0: G.tick, hid: false };
  if (k === 'sleep') a.dur = Math.max(18, Math.round(h.needs.energy * 0.75)) + rint(0, 8);
  if (k === 'rest') a.dur = clamp(Math.round((1 - h.hp / h.maxHp) * 30), 6, 28);
  if (k === 'work') a.dur = 8 + rint(0, 8);
  const p = findPath(h.x, h.y, a.tx, a.ty, a.range);
  if (!p) { h.thinkCd = 4; return false; }
  h.path = p; h.act = a; h.state = k; return true;
}
function cancelAct(h) { h.act = null; h.path = []; h.state = 'idle'; if (h.inside) h.inside = 0; }

function stepAct(h) {
  const a = h.act;
  if (a.st === 0) {
    if (h.path.length) { moveAlong(h, WALK * hStats(h).spd); if (a.k === 'work' || true) { if (G.tick - a.t0 > 150) cancelAct(h); } }
    if (!h.path.length) {
      if (Math.hypot(h.x - a.tx, h.y - a.ty) <= a.range + 0.6) { a.st = 1; a.n = 0; onActStart(h, a); }
      else { const p = findPath(h.x, h.y, a.tx, a.ty, a.range); if (p && p.length) h.path = p; else cancelAct(h); }
    }
    return;
  }
  onActTick(h, a);
  if (!h.act) return;
  a.n++;
  if (a.n >= a.dur) finishAct(h);
}
function onActStart(h, a) {
  if (a.bld >= 0 && W.blds[a.bld] && W.blds[a.bld].kind !== 'castle' && ['sleep', 'eat', 'rest', 'hide', 'hide_home', 'shopP', 'shopG', 'pray'].indexOf(a.k) >= 0) h.inside = a.bld + 1;
  if (a.k === 'eat') {
    if (G.town.food >= 1 || h.job === 'farmer') {
      if (G.town.food >= 1) G.town.food -= 1;
      h.needs.hunger = Math.max(0, h.needs.hunger - 70); h.lastEat = G.tick;
      if (a.bld >= 0 && W.blds[a.bld].kind === 'tavern') { h.gold -= 2; G.town.gold += 2; h.needs.belong = Math.max(0, h.needs.belong - 8); }
    }
  }
  if (a.k === 'shopP') { if (h.gold >= 12 && G.town.potions >= 1) { h.gold -= 12; G.town.gold += 12; G.town.potions -= 1; h.pots = Math.min(3, h.pots + 1); } }
  if (a.k === 'shopG') { const c = gearCost(h); if (h.gold >= c && G.town.gearStock >= 1 && h.gear < 6) { h.gold -= c; G.town.gold += c; G.town.gearStock -= 1; h.gear++; const st = hStats(h); h.maxHp = st.hp; } }
  if (a.k === 'pray') { h.needs.faith = Math.max(0, h.needs.faith - 45); G.faith = Math.min(G.faithMax, G.faith + (h.job === 'priest' ? 0.45 : 0.18)); }
  if (a.k === 'social') socialInteract(h);
}
function onActTick(h, a) {
  const J = h.job;
  switch (a.k) {
    case 'sleep': if (h.needs.energy <= 3 && hourOf(G.tick) >= 5 && hourOf(G.tick) < 22) finishAct(h); break;
    case 'rest': { const heal = h.maxHp * (a.bld >= 0 && W.blds[a.bld].kind === 'inn' ? 0.07 : 0.045); h.hp = Math.min(h.maxHp, h.hp + heal); if (h.hp >= h.maxHp * 0.97) finishAct(h); if (a.n === 0 && a.bld >= 0 && W.blds[a.bld].kind === 'inn' && h.gold >= 6) { h.gold -= 6; G.town.gold += 6; } break; }
    case 'work': {
      h.gold += 0.06; if (h.age >= 60) h.gold -= 0.02;
      if (J === 'farmer') G.town.food += 0.42 * SEASON_YIELD[seasonOf(G.tick)] * (G.famine > G.tick ? 0.2 : 1) * (G.balance < -40 ? 0.85 : 1);
      else if (J === 'merchant') { h.gold += 0.1; G.town.gold += 0.02; }
      else if (J === 'smith') G.town.gearStock += 0.032;
      else if (J === 'herbalist') G.town.potions += 0.045;
      else if (J === 'priest') { G.faith = Math.min(G.faithMax, G.faith + 0.02); h.needs.faith = Math.max(0, h.needs.faith - 1); }
      else if (J === 'historian') { }
      break;
    }
    case 'train': addExp(h, 0.18 * (G.balance >= 70 ? 0.5 : 1)); h.needs.honor = Math.min(100, h.needs.honor + 0.3); break;
    case 'learn': { h.needs.belong = Math.max(0, h.needs.belong - 0.5); break; }
    case 'hide': case 'hide_home': { if (a.n >= a.dur - 1 && threatNear(h, 6)) a.dur += 3; break; }
    case 'hunt': { if (a.n >= a.dur - 1 && h.hp > h.maxHp * 0.6 && rchance(0.5)) a.dur += 3; break; }
  }
}
function finishAct(h) {
  const a = h.act; h.act = null; h.state = 'idle'; h.inside = 0;
  if (a && a.k === 'sleep') { h.needs.energy = Math.max(0, h.needs.energy - 20); }
  if (a && a.k === 'social') { h.needs.belong = Math.max(0, h.needs.belong - 40); }
  if (a && a.k === 'hunt') { h.needs.honor = Math.max(0, h.needs.honor - 5); }
}
function threatNear(h, r) { return G.monsters.some(m => m.alive && !m.dormant && Math.hypot(m.x - h.x, m.y - h.y) <= r); }

/* ---------- social ---------- */
function socialInteract(h) {
  let best = null, bd = 99;
  for (const o of G.humans) { if (o === h || !o.alive || o.inside) continue; const d = Math.hypot(o.x - h.x, o.y - h.y); if (d < bd && d <= 5) { bd = d; best = o; } }
  if (!best) { const c = G.humans.filter(o => o !== h && o.alive && !o.inside && o.age >= 10 && Math.abs(o.x - h.x) < 12); if (c.length) best = rpick(c); }
  if (!best) return;
  const comp = (h.traits.includes('kind') ? 1.3 : 1) * (best.traits.includes('kind') ? 1.2 : 1) * (h.traits.includes('stubborn') && best.traits.includes('stubborn') ? 0.5 : 1);
  const d = rrange(1.5, 5) * comp; const a0 = h.rel[best.id] || 15;
  h.rel[best.id] = clamp(a0 + d, -50, 100); best.rel[h.id] = clamp((best.rel[h.id] || 15) + d * 0.8, -50, 100);
  h.needs.belong = Math.max(0, h.needs.belong - 20); best.needs.belong = Math.max(0, best.needs.belong - 15);
  const aff = h.rel[best.id];
  const sameGen = Math.abs(h.age - best.age) <= 15 && h.age >= 16 && best.age >= 16;
  // quarrel
  if (a0 > 20 && rchance(0.012 + (h.traits.includes('stubborn') ? 0.01 : 0) + (best.traits.includes('stubborn') ? 0.01 : 0)) && !h.quarrel) {
    h.quarrel = { who: best.id, t: G.tick }; h.rel[best.id] -= 30; best.rel[h.id] -= 30;
    logEvent('quarrel', [h.id, best.id], {}, ['relation'], 0.45, 0.6, h);
    return;
  }
  if (h.quarrel && h.quarrel.who === best.id && G.tick - h.quarrel.t > TICK_DAY * 0.7) { h.quarrel = null; h.rel[best.id] += 35; best.rel[h.id] += 35; logEvent('reconcile', [h.id, best.id], {}, ['relation'], 0.5, 0.7, h); return; }
  if (!h.spouse && !best.spouse && sameGen && aff >= 62 && !h.love && !best.love && h.sex !== best.sex) {
    h.love = best.id; best.love = h.id; logEvent('love_start', [h.id, best.id], {}, ['relation'], 0.55, 0.8, h); G.dayGood += 0.5; return;
  }
  if (h.love === best.id && !h.spouse && !best.spouse && aff >= 85) {
    h.spouse = best.id; best.spouse = h.id; h.love = best.love = 0; if (best.home !== h.home) { const mv = h.sex === 'F' ? h : best, to = h.sex === 'F' ? best : h; mv.home = to.home; }
    logEvent('marriage', [h.id, best.id], {}, ['relation', 'joy'], 0.7, 0.9, h); G.dayGood += 1;
  }
  // destined reunion (soul bonds)
  const s1 = soulOf(h), s2 = soulOf(best);
  if (s1 && s2 && !h.child && !best.child) {
    const key = s1.id < s2.id ? s1.id + '_' + s2.id : s2.id + '_' + s1.id;
    if (!G.reunions[key] && (s1.bonds.some(b => b.sid === s2.id) || s2.bonds.some(b => b.sid === s1.id))) {
      G.reunions[key] = 1; h.rel[best.id] = Math.max(h.rel[best.id], 70); best.rel[h.id] = Math.max(best.rel[h.id], 70);
      logEvent('destined_reunion', [h.id, best.id], { kind: (s1.bonds.find(b => b.sid === s2.id) || s2.bonds.find(b => b.sid === s1.id) || {}).kind }, ['soul'], 0.9, 1.0, h);
    }
  }
}

/* ---------- exp ---------- */
function addExp(h, v) {
  if (!v || h.lvl >= 25) return;
  h.exp += v;
  let need = 30 * h.lvl;
  while (h.exp >= need && h.lvl < 25) {
    h.exp -= need; h.lvl++; need = 30 * h.lvl;
    const st = hStats(h); const frac = h.hp / h.maxHp; h.maxHp = st.hp; h.hp = Math.min(h.maxHp, h.maxHp * Math.max(frac, 0.7) + h.maxHp * 0.2);
    if (G.fxOn) G.fx.push({ t: 'lvl', x: h.x, y: h.y });
    if (h.master && h.lvl === 8) { const ms = hById(h.master); if (ms && ms.alive) logEvent('mentor_parting', [ms.id, h.id], {}, ['relation'], 0.6, 0.8, h); h.master = 0; }
    if (h.lvl === 5 || h.lvl === 10 || h.lvl === 15) logEvent('promotion', [h.id], { lvl: h.lvl }, ['growth'], 0.5, 0.7, h);
  }
}

/* ---------- prayers ---------- */
function openPrayers() { return G.prayers.filter(p => p.state === 'open'); }
function hasPrayer(h) { return G.prayers.some(p => p.state === 'open' && p.hid === h.id); }
function addPrayer(h, kind, urg) {
  if (h.prayCd > 0 || hasPrayer(h) || h.inside && false) return null;
  if (openPrayers().length >= 8) return null;
  const p = { id: G.nid++, hid: h.id, kind, urg: clamp(urg, 0.1, 1), t: G.tick, exp: G.tick + 2 * TICK_DAY, state: 'open', v: rint(0, 1) };
  G.prayers.push(p); h.prayCd = rint(300, 620); G.stats.prayers++;
  logEvent('prayer', [h.id], { kind }, ['prayer'], 0.3 + urg * 0.3, 0.5, h);
  if (G.fxOn) G.fx.push({ t: 'pray', x: h.x, y: h.y });
  if (G.onPrayer) G.onPrayer(p);
  return p;
}
function maybePray(h) {
  if (h.prayCd > 0 || h.child && h.age < 6) return;
  const n = h.needs, hpf = h.hp / h.maxHp;
  const fp = h.needs.faith < 60 ? 1 : 0.6;
  if (n.hunger >= 88 && rchance(0.5)) return addPrayer(h, 'hunger', 0.9);
  if (hpf < 0.4 && !h.tgt && rchance(0.35)) return addPrayer(h, 'sick', 0.8);
  if (h.grief > 0 && rchance(0.08)) { return addPrayer(h, 'revenge', 0.6); }
  if (h.quarrel && rchance(0.05)) return addPrayer(h, 'forgive', 0.5);
  if (h.guilt && rchance(0.1)) return addPrayer(h, 'forgive', 0.6);
  if (h.preg && rchance(0.08)) return addPrayer(h, 'birth', 0.7);
  if (h.age > 60 && rchance(0.012)) return addPrayer(h, 'fear', 0.6);
  if (h.love && rchance(0.01)) return addPrayer(h, 'love', 0.5);
  if (isAdv(h) && h.party && hpf < 0.7 && rchance(0.04)) return addPrayer(h, 'battle', 0.7);
  if (rchance(0.0022 * fp)) return addPrayer(h, rpick(['love', 'fear', 'forgive', 'battle']), 0.35);
}
function expirePrayers() {
  for (const p of G.prayers) {
    if (p.state !== 'open') continue;
    if (G.tick >= p.exp) {
      p.state = 'expired'; const h = hById(p.hid);
      G.faith = Math.max(0, G.faith - TUNE.pen * 0.6 * (0.5 + p.urg));
      if (h && h.alive) { h.needs.faith = Math.min(100, h.needs.faith + 10); h.disappoint = (h.disappoint || 0) + 1; }
      if (G.onPrayerEnd) G.onPrayerEnd(p);
    } else { const h = hById(p.hid); if (!h || !h.alive) { p.state = 'void'; } }
  }
  if (G.prayers.length > 120) G.prayers = G.prayers.filter(p => p.state === 'open' || G.tick - p.t < TICK_YEAR);
}

/* ---- 06_combat.js ---- */
/* ================= combat / monsters / quests / parties ================= */
function fxAdd(o) { if (G.fxOn) { if (G.fx.length > 200) G.fx.shift(); G.fx.push(o); } }
const canFight = h => h.alive && h.age >= 16 && (isAdv(h) || (h.retired && h.hp > h.maxHp * 0.5));

function nearestMon(e, r, raidOnly, allowBoss) {
  let best = null, bd = r;
  for (const m of G.monsters) {
    if (!m.alive || m.dormant) continue;
    if (m.boss && m.mode !== 'raid' && !allowBoss) continue;
    if (raidOnly && m.mode !== 'raid') continue;
    const d = Math.hypot(m.x - e.x, m.y - e.y);
    if (d < bd) { bd = d; best = m; }
  }
  return best;
}
function leaveParty(h) {
  const p = G.pidx[h.party]; h.party = 0;
  if (p) p.members = p.members.filter(i => i !== h.id);
  if (h.act && h.act.k === 'quest') { h.act = null; h.path = []; }
}
function combatStep(h) {
  const st = hStats(h);
  // priest heal
  if (h.job === 'priest' && h.age >= 14 && h.healCd <= 0 && !h.inside) {
    let best = null, bf = 0.7;
    for (const o of G.humans) { if (!o.alive || o.inside) continue; if (Math.abs(o.x - h.x) > 5 || Math.abs(o.y - h.y) > 5) continue; const f = o.hp / o.maxHp; if (f < bf) { bf = f; best = o; } }
    if (best) {
      const amt = st.atk * 1.7 + best.maxHp * 0.1; best.hp = Math.min(best.maxHp, best.hp + amt); h.healCd = 3;
      fxAdd({ t: 'heal', x: best.x, y: best.y, v: Math.round(amt) });
      if (best !== h) { h.needs.honor = Math.min(100, h.needs.honor + 0.3); soulOf(h).k.good += 0.04; }
    }
  }
  const hpf = h.hp / h.maxHp, fighter = canFight(h);
  let tg = h.tgt ? G.idx[h.tgt] : null;
  if (tg && (!tg.alive || tg.dormant)) { tg = null; h.tgt = 0; }
  const fleeing = h.flee > G.tick;
  // potion
  if (hpf < 0.5 && h.pots > 0 && h.healCd <= 0 && (tg || threatNear(h, 5))) { h.pots--; h.hp = Math.min(h.maxHp, h.hp + h.maxHp * 0.5); h.healCd = 4; fxAdd({ t: 'heal', x: h.x, y: h.y, v: Math.round(h.maxHp * 0.5) }); return false; }
  if (!tg && !fleeing) {
    if (fighter) {
      const inQuest = h.party && G.pidx[h.party];
      let R = inQuest ? 8 : 6; if (h.act && h.act.k === 'hunt') R = 9;
      const bq = inQuest && G.pidx[h.party].boss; let m = nearestMon(h, R, false, bq);
      if (!m && G.townAlert > 0 && !inQuest && h.act && h.act.k === 'muster') m = nearestMon(h, 11, true);
      if (!m && inQuest && G.pidx[h.party].boss) { m = G.boss && G.boss.alive && !G.boss.dormant && Math.hypot(G.boss.x - h.x, G.boss.y - h.y) < 14 ? G.boss : null; }
      if (m && (hpf > 0.3 || h.pots > 0)) { tg = m; h.tgt = m.id; if (h.act && h.act.k !== 'quest') { h.act = null; h.path = []; h.inside = 0; } }
    } else {
      if (threatNear(h, 4.5) && !(h.act && (h.act.k === 'hide' || h.act.k === 'hide_home'))) { cancelAct(h); h.needs.safety = 100; hideNearest(h); return false; }
    }
  }
  if (tg && fighter && hpf < 0.36 && h.pots <= 0 && !(G.pidx[h.party] && G.pidx[h.party].boss && hpf > 0.15)) {
    h.tgt = 0; tg = null; h.flee = G.tick + 25; if (h.party) leaveParty(h);
    cancelAct(h); h.needs.safety = 100; startAct(h, 'rest'); return false;
  }
  if (tg) {
    const d = Math.hypot(tg.x - h.x, tg.y - h.y);
    if (d <= st.range + 0.3) {
      h.path = []; h.cd -= 1;
      if (h.cd <= 0) { humanAttack(h, tg, st); h.cd += 2 / st.spd; }
    } else {
      h.cd = Math.max(0, h.cd - 1);
      if (!h.path.length || (G.tick + h.id) % 3 === 0) { const p = findPath(h.x, h.y, tg.x, tg.y, Math.max(1, st.range - 0.5), 500); if (p) h.path = p; else { h.tgt = 0; return false; } }
      moveAlong(h, WALK * st.spd);
    }
    return true;
  }
  return false;
}
function hideNearest(h) {
  let best = null, bd = 99;
  for (const b of W.blds) { if (b.kind === 'castle' || b.kind === 'mill') continue; const d = Math.hypot(b.door.x - h.x, b.door.y - h.y); if (d < bd) { bd = d; best = b; } }
  if (!best) return;
  const p = findPath(h.x, h.y, best.door.x, best.door.y, 0, 600); if (!p) return;
  h.path = p; h.act = { k: 'hide', tx: best.door.x, ty: best.door.y, range: 0, bld: best.id, st: 0, n: 0, dur: 8, t0: G.tick };
}
function humanAttack(h, tg, st) {
  let atk = st.atk * rrange(0.85, 1.15);
  let crit = h.job === 'thief' ? 0.2 : 0.05; let cm = 1;
  if (rchance(crit)) cm = 1.7;
  if (h.mist && h.mist > G.tick) atk *= 0.75;
  const dmg = Math.max(1, Math.round(atk * cm - tg.def * 0.5));
  fxAdd({ t: 'atk', x: h.x, y: h.y, tx: tg.x, ty: tg.y, mage: h.job === 'mage' });
  damage(tg, dmg, h, cm > 1);
}
function monsterAttack(m, tg, mul) {
  let atk = m.atk * rrange(0.85, 1.15) * (mul || 1);
  const st = hStats(tg);
  const dmg = Math.max(1, Math.round(atk - st.def * 0.5));
  fxAdd({ t: 'atk', x: m.x, y: m.y, tx: tg.x, ty: tg.y });
  damage(tg, dmg, m);
}
function damage(b, dmg, a, crit) {
  if (!b.alive) return;
  b.hp -= dmg; b.hurt = 4;
  fxAdd({ t: 'dmg', x: b.x, y: b.y, v: dmg, crit: !!crit, human: !!b.job });
  if (b.job) { b.needs.safety = 100; if (!b.tgt && a && !a.job && canFight(b)) { b.tgt = a.id; } }
  else if (a && !b.tgt) { b.tgt = a.id; }
  if (b.hp <= 0) { if (b.job) killHuman(b, 'battle', a); else killMonster(b, a); }
}
function killMonster(m, by) {
  if (!m.alive) return; m.alive = false; m.hp = 0; G.stats.kills++; G.dayKills++;
  const tier = m.tier;
  if (!m.boss && G.killBal < 0.45) { const g = 0.02 * Math.min(tier, 4); G.balance = clamp(G.balance + g, -100, 100); G.killBal += g; }
  fxAdd({ t: 'poof', x: m.x, y: m.y });
  const base = m.boss ? BOSS : m.cad >= 0 ? CADRES[m.cad] : MONS[m.type];
  const exp = (base.exp || (m.boss ? 400 : 80)) * (1 + 0.06 * (yearOf(G.tick) - 1)), gold = (base.gold || (m.boss ? 500 : 60));
  const near = G.humans.filter(o => o.alive && !o.inside && Math.hypot(o.x - m.x, o.y - m.y) <= 8 && canFight(o));
  near.forEach(o => { addExp(o, exp * (o === by ? 1 : 0.45) / Math.max(1, near.length * 0.45 + 0.55)); o.needs.honor = Math.max(0, o.needs.honor - 10); });
  if (by && by.job) {
    by.kills++; by.gold += gold; by.fame += tier; soulOf(by).k.deed += 0.25 * tier;
    const p = G.pidx[by.party]; if (p) p.kills++;
    if (!by.fk && by.lvl <= 3) { by.fk = 1; logEvent('first_battle', [by.id], { m: m.type }, ['growth'], 0.5, 0.6, by); }
  }
  if (m.cad >= 0 || m.boss) {
    logEvent(m.boss ? 'boss_slain' : 'cadre_slain', by && by.job ? [by.id] : [], { cad: m.cad }, ['boss'], 0.95, 0.9, m);
    G.balance = clamp(G.balance + (m.boss ? 10 : 6), -100, 100);
    if (m.boss) endGame('victory');
  }
  if (m.mode === 'raid') G.stats.raidKills = (G.stats.raidKills || 0) + 1;
}
function killHuman(h, cause, by) {
  if (!h.alive) return; h.alive = false; h.hp = 0; h.cause = cause; h.diedAt = G.tick; G.stats.deaths++;
  if (h.party) leaveParty(h);
  h.act = null; h.path = []; h.tgt = 0; h.inside = 0;
  const s = soulOf(h); if (s) {
    s.state = 'river'; s.lastJob = h.job; s.hid = 0; s.wait = G.tick + rint(1, 3) * TICK_YEAR * 0.9 + rint(0, 300);
    s.lives.push({ name: h.name, job: h.job, age: Math.round(h.age), cause, died: G.tick, lvl: h.lvl });
    if (cause === 'battle') s.k.deed += 1.5; if (cause === 'old') s.k.good += 1;
    if (h.spouse) { const sp = hById(h.spouse); if (sp && sp.alive) { const ss = soulOf(sp); s.bonds.push({ sid: ss.id, kind: 'love' }); ss.bonds.push({ sid: s.id, kind: 'love' }); sp.spouse = 0; sp.grief = 1; sp.needs.faith += 20; } }
    if (h.master) { const ms = hById(h.master); if (ms && ms.alive) { s.bonds.push({ sid: soulOf(ms).id, kind: 'master' }); soulOf(ms).bonds.push({ sid: s.id, kind: 'master' }); } }
    G.humans.forEach(o => { if (o.alive && o.master === h.id) { const os = soulOf(o); s.bonds.push({ sid: os.id, kind: 'master' }); os.bonds.push({ sid: s.id, kind: 'master' }); } });
    if (s.bonds.length > 6) s.bonds = s.bonds.slice(-6);
  }
  if (cause === 'battle' || cause === 'starve') G.humans.forEach(o => { if (o.alive && (o.rel[h.id] || 0) > 55) { o.grief = 1; o.needs.safety = 100; } });
  G.balance = clamp(G.balance - (cause === 'battle' ? 0.4 : 0.1), -100, 100);
  fxAdd({ t: 'soul', x: h.x, y: h.y });
  const spot = G.spot.indexOf(h.id); if (spot >= 0) G.spot.splice(spot, 1);
  logEvent('death', [h.id], { cause, by: by && by.type ? by.type : '' }, ['death'], cause === 'old' ? 0.55 : 0.8, 0.9, h);
  G.prayers.forEach(p => { if (p.hid === h.id && p.state === 'open') p.state = 'void'; });
  if (G.onDeath) G.onDeath(h);
}

/* ---------- monsters ---------- */
function updateMonster(m) {
  if (!m.alive || m.dormant) return;
  const spd = m.spd;
  let tg = m.tgt ? G.idx[m.tgt] : null;
  if (tg && (!tg.alive || tg.inside)) { tg = null; m.tgt = 0; }
  const aggro = m.boss ? (m.mode === 'raid' ? 11 : 4.5) : m.cad >= 0 ? 8 : m.mode === 'raid' ? 8 : 5.5;
  if (!tg || (G.tick + m.id) % 4 === 0) {
    let best = tg, bd = tg ? Math.hypot(tg.x - m.x, tg.y - m.y) : aggro;
    for (const o of G.humans) { if (!o.alive || o.inside) continue; const d = Math.hypot(o.x - m.x, o.y - m.y); if (d < bd) { bd = d; best = o; } }
    if (best) { tg = best; m.tgt = best.id; }
  }
  // leash for guards
  if (tg && (m.boss || m.cad >= 0) && m.mode !== 'raid' && Math.hypot(tg.x - m.home.x, tg.y - m.home.y) > (m.boss ? 10 : 15)) { tg = null; m.tgt = 0; }
  if (tg) {
    const d = Math.hypot(tg.x - m.x, tg.y - m.y);
    cadreSkill(m, tg, d);
    if (d <= m.range + 0.3) {
      m.path = []; m.cd -= 1;
      if (m.cd <= 0) { let mul = 1; if (m.cad === 1 && m.sk % 6 === 0) mul = 1.8; monsterAttack(m, tg, mul); m.cd += 2 / spd; }
    } else {
      m.cd = Math.max(0, m.cd - 1);
      if (!m.path.length || (G.tick + m.id) % 3 === 0) { const p = findPath(m.x, m.y, tg.x, tg.y, Math.max(1, m.range - 0.5), 500); if (p) m.path = p; }
      moveAlong(m, WALK * spd * (m.boss ? 0.9 : 1.05));
    }
    return;
  }
  if (m.mode === 'raid') {
    if (!m.path.length && Math.hypot(m.x - PLAZA.x, m.y - PLAZA.y) > 4) { const p = findPath(m.x, m.y, PLAZA.x + rint(-3, 3), PLAZA.y + rint(-2, 2), 1, 1500); if (p) m.path = p; }
    moveAlong(m, WALK * spd); return;
  }
  // wander / return home
  if (m.path.length) { moveAlong(m, WALK * spd * 0.6); return; }
  if (--m.wt <= 0) {
    m.wt = rint(4, 10);
    const hx = m.home.x, hy = m.home.y; const r = (m.boss || m.cad >= 0) ? 2 : 4;
    const p = nearestWalkable(hx + rint(-r, r), hy + rint(-r, r)); const pp = findPath(m.x, m.y, p.x, p.y, 0, 300); if (pp) m.path = pp;
  }
}
function cadreSkill(m, tg, d) {
  m.sk++;
  if (m.boss && m.sk % 7 === 0 && d < 4) { // heavy sweep
    G.humans.forEach(o => { if (o.alive && !o.inside && Math.hypot(o.x - m.x, o.y - m.y) <= 3) { const dmg = Math.max(1, Math.round(m.atk * 0.55 - hStats(o).def * 0.4)); damage(o, dmg, m); } });
    fxAdd({ t: 'ring', x: m.x, y: m.y });
  } else if (m.cad === 0 && m.sk % 8 === 0) { G.humans.forEach(o => { if (o.alive && Math.hypot(o.x - m.x, o.y - m.y) <= 4) o.mist = G.tick + 6; }); fxAdd({ t: 'ring', x: m.x, y: m.y }); }
  else if (m.cad === 2 && m.sk % 10 === 0 && d > 2) { // shadow dash
    let best = null, bh = 1e9; G.humans.forEach(o => { if (o.alive && !o.inside && Math.hypot(o.x - m.x, o.y - m.y) <= 8 && o.hp < bh) { bh = o.hp; best = o; } });
    if (best) { const p = nearestWalkable(best.x + 1, best.y); m.x = p.x; m.y = p.y; m.px = p.x; m.py = p.y; m.path = []; m.tgt = best.id; monsterAttack(m, best, 1.4); }
  }
}
function monsterCap() {
  const dark = clamp(0.5 - G.balance / 200, 0.05, 0.95); const yr = yearOf(G.tick);
  let cap = 2 + Math.round(dark * 6) + Math.min(4, yr - 1);
  if (G.balance >= 70) cap = Math.round(cap * 0.5);
  if (G.awakened) cap += 1; return cap;
}
function tierForSpawn() {
  const yr = yearOf(G.tick); const r = rnd();
  if (G.awakened) return r < 0.2 ? 2 : 3;
  if (yr <= 3) return 1; if (yr <= 5) return r < 0.7 ? 1 : 2; return r < 0.4 ? 1 : r < 0.85 ? 2 : 3;
}
function wildCount() { let c = 0; for (const m of G.monsters) if (m.alive && !m.boss && m.cad < 0 && m.mode !== 'raid') c++; return c; }
function spawnTick() {
  if (G.tick % 8 === 0 && wildCount() < monsterCap() && (G.forceMonsters || true)) { spawnMonster(tierForSpawn()); }
  // cleanup the dead + old wild
  if (G.tick % 144 === 0) {
    G.monsters = G.monsters.filter(m => m.alive || m.boss || m.cad >= 0);
    rebuildIdx();
  }
}
function townPressure() {
  let p = 0; G.raidAlive = 0;
  for (const m of G.monsters) { if (!m.alive || m.dormant) continue; if (m.mode === 'raid') G.raidAlive++; if (m.x >= TOWN_X0 && m.x <= TOWN_X1 && m.mode === 'raid') p += m.boss ? 0.5 : m.cad >= 0 ? 0.22 : 0.05; }
  return p;
}
function spawnRaid(n, tier, withCad) {
  const mons = [];
  for (let i = 0; i < n; i++) { const m = spawnMonster(tier, { x: FIELD_X0 + 2, y: 23 }, 'raid'); if (m) mons.push(m); }
  let cad = null;
  if (withCad) { const cs = G.cadres.map(i => G.idx[i]).filter(c => c && c.alive && c.mode !== 'raid'); if (cs.length) { cad = rpick(cs); cad.dormant = false; cad.mode = 'raid'; const p = nearestWalkable(FIELD_X0 + 4, 23); cad.x = cad.px = p.x; cad.y = cad.py = p.y; cad.path = []; cad.hp = Math.max(cad.hp, cad.maxHp * 0.7); } }
  G.stats.raids++; G.townAlert = TICK_DAY * 2;
  logEvent('monster_raid', [], { n: mons.length, cad: cad ? cad.cad : -1 }, ['raid'], withCad ? 0.85 : 0.6, 0.8, { x: FIELD_X0 + 2, y: 23 });
  return mons;
}

/* ---------- quests ---------- */
const QTYPES = ['hunt', 'hunt', 'gather', 'escort', 'search'];
function mkQuest(type, tier) {
  const yr = yearOf(G.tick);
  const lo = tier === 1 ? 44 : tier === 2 ? 46 : 48, hi = tier === 1 ? 47 : tier === 2 ? 50 : 52;
  let p = randWalkableIn(lo, 5, hi, 38);
  const q = { id: G.nid++, type, tier, day: dayIdx(G.tick), state: 'open', need: type === 'hunt' ? rint(3, 4) + tier : 0, got: 0, tx: p.x, ty: p.y, reward: 0, exp: 0, party: 0, t: G.tick, mon: rpick(MON_BY_TIER[Math.min(3, tier)]) };
  q.reward = Math.round((18 + 10 * tier * tier + (q.need || 4) * 4) * (1 + 0.04 * (yr - 1)));
  q.exp = 8 + tier * 8;
  G.quests.push(q); G.qidx[q.id] = q; return q;
}
function dailyQuests() {
  const open = G.quests.filter(q => q.state === 'open' && q.type !== 'boss').length;
  const want = G.awakened ? TUNE.warQuests : 2 + (yearOf(G.tick) >= 3 ? 1 : 0);
  for (let i = open; i < want; i++) {
    const yr = yearOf(G.tick); let tier = 1 + (yr >= 4 ? 1 : 0) + (yr >= 6 ? 1 : 0); if (G.awakened) tier = 3; if (rchance(0.3) && tier > 1) tier--;
    mkQuest(rpick(QTYPES), tier);
  }
  // expire old open quests
  G.quests = G.quests.filter(q => !(q.state === 'open' && G.tick - q.t > 6 * TICK_DAY) && !((q.state === 'done' || q.state === 'fail') && G.tick - q.t > 4 * TICK_DAY));
  G.qidx = {}; G.quests.forEach(q => G.qidx[q.id] = q);
}
function advPower(h) { const st = hStats(h); const J = JOBS[h.job]; return Math.sqrt(st.hp * st.atk) * (h.hp / h.maxHp + 0.2); }
function freeAdvs() { return G.humans.filter(o => o.alive && isAdv(o) && !o.party && o.hp >= o.maxHp * 0.62 && !(o.act && o.act.k === 'sleep' && hourOf(G.tick) < 5) && !o.flee); }
function partyOk(tier, group) {
  const avg = group.reduce((a, o) => a + o.lvl + o.gear * 0.7, 0) / group.length;
  if (tier === 1) return avg >= 1.5 || group.length >= 2;
  if (tier === 2) return group.length >= 2 && avg >= 4;
  return group.length >= 3 && avg >= 7;
}
function tryFormParty(h) {
  const qs = openQuests().filter(q => q.type !== 'boss'); if (!qs.length) return false;
  const pool = freeAdvs().filter(o => o !== h && (o.pots >= 1 || o.gold < 12) && Math.hypot(o.x - h.x, o.y - h.y) < 25);
  pool.sort((a, b) => (b.lvl + b.gear) - (a.lvl + a.gear));
  qs.sort((a, b) => b.tier - a.tier);
  for (const q of qs) {
    const size = q.tier === 1 ? 2 : q.tier === 2 ? 3 : 4;
    const group = [h]; const pr = pool.find(o => o.job === 'priest' && !group.includes(o)); if (pr && size >= 3) group.push(pr);
    for (const o of pool) { if (group.length >= size) break; if (!group.includes(o)) group.push(o); }
    if (!partyOk(q.tier, group)) continue;
    makeParty(group, q); return true;
  }
  return false;
}
function makeParty(group, q) {
  const p = { id: G.nid++, members: group.map(o => o.id), q: q.id, state: 'go', t0: G.tick, kills: 0, wt: 0, boss: q.type === 'boss', goal: { x: q.tx, y: q.ty }, leader: group[0].id, n0: group.length };
  G.parties.push(p); G.pidx[p.id] = p; q.state = 'taken'; q.party = p.id; q.t = G.tick;
  group.forEach(o => { cancelAct(o); o.party = p.id; o.act = { k: 'quest', st: 1, n: 0, dur: 1e9, t0: G.tick }; o.state = 'quest'; o.flee = 0; if (rchance(0.35)) addPrayer(o, 'battle', 0.5); });
  G.stats.quests++;
  logEvent(q.type === 'boss' ? 'boss_expedition' : 'party_formed', group.map(o => o.id), { q: q.type, tier: q.tier, mon: q.mon }, ['quest'], q.type === 'boss' ? 0.95 : 0.35 + 0.1 * q.tier, 0.6, { x: W.bk.guild[0].appr.x, y: W.bk.guild[0].appr.y });
}
function partyStep(h) {
  const p = G.pidx[h.party];
  if (!p) { h.act = null; h.party = 0; return; }
  if (h.path.length) { moveAlong(h, WALK * hStats(h).spd); return; }
  const g = p.state === 'return' ? { x: W.bk.guild[0].appr.x, y: W.bk.guild[0].appr.y, r: 0 } : { x: p.goal.x, y: p.goal.y, r: p.state === 'work' ? 3 : 1 };
  const d = Math.hypot(h.x - g.x, h.y - g.y);
  if (d > g.r + 0.8) { const pp = findPath(h.x, h.y, g.x + (p.state === "return" ? 0 : rint(-1, 1)), g.y + (p.state === "return" ? 0 : rint(-1, 1)), g.r, 1800); if (pp) { h.path = pp; h.pfail = 0; } else if (++h.pfail > 4) leaveParty(h); }
  else if (p.state === 'return') {
    // arrived: payout
    const q = G.qidx[p.q]; const share = q ? q.reward / Math.max(1, p.n0) : 10;
    h.gold += share; h.needs.honor = Math.max(0, h.needs.honor - 25); h.fame += 1; addExp(h, q ? q.exp : 5); h.needs.wealth = Math.max(0, h.needs.wealth - 20);
    soulOf(h).k.good += 0.6; G.dayGood += 0.1;
    leaveParty(h);
  }
}
function updateParties() {
  for (const p of G.parties) {
    if (p.state === 'done') continue;
    const q = G.qidx[p.q];
    const mem = p.members.map(i => G.idx[i]).filter(o => o && o.alive);
    p.members = mem.map(o => o.id);
    if (!mem.length) { if (p.state === 'return') { p.state = 'done'; if (q && q.state !== 'done') q.state = 'done'; } else { p.state = 'done'; if (q) { q.state = 'fail'; q.t = G.tick; } logEvent('quest_fail', [], { q: q ? q.type : '', wipe: true, names: p.n0 }, ['quest', 'death'], 0.85, 0.9, { x: p.goal.x, y: p.goal.y }); } continue; }
    if (p.state !== 'return' && (G.tick - p.t0 > (p.boss ? 2.2 : 3) * TICK_DAY)) { p.state = 'return'; if (q) { q.state = 'fail'; q.t = G.tick; } logEvent('quest_fail', mem.map(o => o.id), { q: q ? q.type : '', wipe: false }, ['quest'], 0.5, 0.5, { x: p.goal.x, y: p.goal.y }); continue; }
    const lead = mem[0];
    const avgHp = mem.reduce((a, o) => a + o.hp / o.maxHp, 0) / mem.length;
    if ((p.state === 'go' || p.state === 'work') && avgHp < 0.5 && !p.boss) { p.state = 'return'; if (q) { q.state = 'fail'; q.t = G.tick; } logEvent('quest_fail', mem.map(o => o.id), { q: q ? q.type : '', wipe: false, retreat: true }, ['quest'], 0.5, 0.5, { x: lead.x, y: lead.y }); continue; }
    if (p.state === 'go') {
      if (Math.hypot(lead.x - p.goal.x, lead.y - p.goal.y) <= 3.2) { p.state = 'work'; p.wt = 0; }
    } else if (p.state === 'work') {
      p.wt++;
      if (p.boss) { if (!G.boss.alive) { p.state = 'return'; } continue; }
      const near = nearestMon(lead, 9);
      if (q.type === 'hunt') {
        if (p.kills >= q.need) { clearQuest(p, q, mem); continue; }
        if (!near && p.wt % 3 === 0 && avgHp > 0.6) { const m = spawnMonster(q.tier, { x: lead.x + 2, y: lead.y }, 'wander'); if (m) { m.tgt = lead.id; } }
      } else {
        if (p.wt === 2 && rchance(0.75)) { const n = rint(1, 2); for (let i = 0; i < n; i++) { const m = spawnMonster(q.tier, { x: lead.x + 2, y: lead.y }, 'wander'); if (m) m.tgt = lead.id; } }
        if (p.wt >= 8 && !near) { clearQuest(p, q, mem); continue; }
      }
    }
  }
  if (G.tick % 72 === 0) { G.parties = G.parties.filter(p => p.state !== 'done'); G.pidx = {}; G.parties.forEach(p => G.pidx[p.id] = p); }
}
function clearQuest(p, q, mem) {
  p.state = 'return'; q.state = 'done'; q.t = G.tick; G.balance = clamp(G.balance + 0.1 + 0.05 * q.tier, -100, 100); G.dayGood += 0.15;
  logEvent('quest_clear', mem.map(o => o.id), { q: q.type, tier: q.tier, mon: q.mon, reward: q.reward }, ['quest'], 0.4 + 0.1 * q.tier, 0.7, { x: W.bk.guild[0].appr.x, y: W.bk.guild[0].appr.y });
}

/* ---------- boss expedition ---------- */
function bossEstimate(group) {
  const b = G.boss; const bossAtk = b.atk, bossDef = b.def;
  let dps = 0, ehp = 0, pri = 0;
  group.forEach(o => { const st = hStats(o); dps += Math.max(1, st.atk * 0.97 - bossDef * 0.5) / (2 / st.spd); ehp += st.hp * (o.hp / o.maxHp); if (o.job === 'priest') pri++; });
  const avgDef = group.reduce((a, o) => a + hStats(o).def, 0) / group.length;
  const bdps = Math.max(1, bossAtk * 1.0 - avgDef * 0.5) / (2 / b.spd) * 1.22 + 0.4 * (bossAtk * 0.55) / 7 * Math.min(4, group.length);
  const ttk = b.hp / Math.max(1, dps), sts = ehp * (1 + 0.45 * pri) / bdps + group.length * 0.8;
  return { ttk, sts, ratio: sts / ttk };
}
function tryBossExpedition(force) {
  if (!G.awakened || !G.boss.alive || G.bossFight || G.ending) return;
  if (G.tick - G.lastBossTry < TICK_DAY * 3 && !force) return;
  if (!force && G.tick - G.awakenAt < TUNE.expDelay * TICK_DAY && G.town.hp > 50) return;
  const pool = G.humans.filter(o => o.alive && isAdv(o) && !o.party && o.hp >= o.maxHp * 0.5 && o.lvl >= 5); if (pool.length < 3 && !force) return;
  pool.sort((a, b) => advPower(b) - advPower(a));
  const group = pool.slice(0, 8); if (group.length < 3) return;
  const est = bossEstimate(group);
  const desperate = G.town.hp < 55 || G.tick - G.awakenTick > 2.5 * TICK_YEAR;
  const need = desperate ? 0.8 : TUNE.expRatio;
  if (est.ratio < need && !force) return;
  G.lastBossTry = G.tick; G.bossTries++; G.bossFight = true; G.forceBCount = 0;
  const q = mkQuest('boss', 4); q.tx = BOSS.home.x; q.ty = BOSS.home.y + 2; q.reward = 600; q.exp = 150; q.mon = 'boss';
  makeParty(group, q);
  G.pidx[q.party].goal = { x: BOSS.home.x, y: BOSS.home.y + 2 };
  G.boss.dormant = false;
  group.forEach(o => { o.pots = Math.max(o.pots, 1); });
}

/* ---- 07_world.js ---- */
/* ================= events / day update / souls / endings / main tick ================= */
function placeKey(pos) {
  if (!pos) return 'town';
  const x = pos.x, y = pos.y;
  for (const b of W.blds) { if (x >= b.x - 1 && x <= b.x + b.w && y >= b.y && y <= b.y + b.h) { if (b.kind === 'house' || b.kind === 'hut') return 'house'; return b.kind; } }
  const z = zoneOf(x);
  if (z === 'town' && x >= 24 && x <= 32 && y >= 16 && y <= 23) return 'plaza';
  if (z === 'field') { if (x >= 44 && x <= 54 && y >= 24 && y <= 36) return 'lake'; return 'field'; }
  return z;
}
function logEvent(type, actors, payload, tags, tension, emotion, where) {
  const pos = where && isNum(where.x) ? { x: Math.round(where.x), y: Math.round(where.y) } : null;
  const ev = { id: G.nid++, t: G.tick, type, actors: (actors || []).slice(), payload: payload || {}, tags: tags || [], tension: tension || 0, emotion: emotion || 0, place: placeKey(pos), pos, used: false, names: {} };
  (actors || []).forEach(i => { const e = G.idx[i]; if (e && e.name) ev.names[i] = e.name; });
  G.events.push(ev);
  if (G.events.length > 480) { let k = 0; G.events = G.events.filter(e => { if (k < 120 && e.used) { k++; return false; } return true; }); if (G.events.length > 480) G.events.splice(0, G.events.length - 400); }
  G.log.push({ t: G.tick, type, a: ev.actors.slice(0, 3) }); if (G.log.length > 80) G.log.shift();
  if (pos) G.lastEvPos = pos;
  if (tension >= 0.5) G.lastNotable = G.tick;
  if (G.onEvent) G.onEvent(ev);
  if (type.startsWith('ending_') || type === 'boss_slain') chronForce(ev);
  return ev;
}

/* ---------- souls ---------- */
function reincarnate(s) {
  const homes = W.homes.filter(hi => G.humans.filter(o => o.alive && o.home === hi).length < 5);
  const home = homes.length ? rpick(homes) : rpick(W.homes);
  const prev = s.lives[s.lives.length - 1];
  const sex = rchance(0.5) ? 'M' : 'F';
  const k = s.k;
  const tr = []; if (k.good >= 4) tr.push('kind'); if (k.evil >= 4) tr.push('greedy'); if (k.deed >= 6) tr.push('brave'); if (k.attach >= 3) tr.push('stubborn');
  if (!tr.length) tr.push(rpick(TRAIT_KEYS)); if (tr.length > 2) tr.length = 2;
  const h = mkHuman({ job: 'farmer', age: 0.2, sex, home, soul: s.id, traits: tr });
  const d = homeDoor(h); const p = nearestWalkable(d.x, d.y); placeAt(h, p.x, p.y); h.child = true;
  if (prev && rchance(0.4)) h.echo = { name: prev.name, job: prev.job };
  s.k = { good: k.good * 0.6, evil: k.evil * 0.6, deed: k.deed * 0.6, attach: k.attach * 0.6 };
  G.humans.push(h); G.idx[h.id] = h; G.stats.births++;
  logEvent('reincarnation', [h.id], { echo: !!h.echo, prev: prev ? prev.name : null, job: prev ? prev.job : null }, ['soul'], 0.55, 0.8, h);
  if (G.onReincarnate) G.onReincarnate(h, s);
  return h;
}
function birthNatural(mother) {
  const ready = G.souls.filter(s => s.state === 'river' && s.wait <= G.tick + TICK_YEAR * 0.6);
  let s = null; if (ready.length) s = rpick(ready);
  if (s) { const h = reincarnate(s); h.home = mother.home; const d = homeDoor(h); const p = nearestWalkable(d.x, d.y); placeAt(h, p.x, p.y); h.parent = mother.id; logEvent('birth', [mother.id, h.id], {}, ['family'], 0.6, 0.9, mother); return h; }
  const h = mkHuman({ job: 'farmer', age: 0.2, home: mother.home }); const d = homeDoor(h); const p = nearestWalkable(d.x, d.y); placeAt(h, p.x, p.y); h.child = true; h.parent = mother.id;
  G.humans.push(h); G.idx[h.id] = h; G.stats.births++;
  logEvent('birth', [mother.id, h.id], {}, ['family'], 0.6, 0.9, mother);
  return h;
}

/* ---------- day update ---------- */
function aliveHumans() { return G.humans.filter(h => h.alive); }
function awaken() {
  G.awakened = true; G.boss.dormant = false; G.raidDay = dayIdx(G.tick) + 5; G.awakenAt = G.tick;
  logEvent('boss_awaken', [], {}, ['boss'], 1, 1, BOSS.home);
  G.balance = clamp(G.balance - 12, -100, 100);
  G.pendingCutscene = 'awaken';
  if (G.onAwaken) G.onAwaken();
}
function dayUpdate() {
  const d = dayIdx(G.tick), yr = yearOf(G.tick);
  const alive = aliveHumans();
  // old age / accidents
  for (const h of alive) { if (h.age >= 60 && rchance((h.age - 60) * 0.002 + 0.0006)) killHuman(h, 'old', null); }
  // pregnancies / births
  const pop = aliveHumans().length;
  for (const h of aliveHumans()) {
    if (h.preg && G.tick >= h.preg) { h.preg = 0; birthNatural(h); }
    else if (!h.preg && h.sex === 'F' && h.spouse && h.age >= 18 && h.age < 42 && pop < POP_MAX && rchance(0.02)) { h.preg = G.tick + 3 * TICK_DAY; }
  }
  // forced reincarnation
  for (const s of G.souls) { if (s.state === 'river' && s.wait <= G.tick && G.humans.filter(x => x.alive).length < POP_MAX) { if (rchance(0.2) || G.tick - s.wait > TICK_YEAR * 0.5) reincarnate(s); } }
  // balance
  let b = G.balance - TUNE.drift - (G.awakened ? 0.6 : 0) + G.dayGood * 0.5 - G.dayEvil * 0.9;
  if (b > 60) b -= (b - 60) * 0.03;
  G.balance = clamp(b, -100, 100); G.balAcc += G.balance;
  if (G.balance >= 65 && G.dayKills === 0 && G.tick - G.lastNotable > TICK_DAY) G.stag++; else if (G.balance < 55) G.stag = 0;
  G.dayGood = 0; G.dayEvil = 0; G.dayKills = 0; G.killBal = 0;
  // faith
  let dis = 0; for (const h of aliveHumans()) { dis += h.disappoint || 0; if (h.disappoint > 0) h.disappoint = Math.max(0, h.disappoint - 0.012); } dis /= Math.max(1, pop);
  G.faith = Math.min(G.faithMax, G.faith + pop * 0.16 * clamp(1 - dis * TUNE.disMul, 0.1, 1));
  G.eye = Math.min(3, G.eye + 1);
  // town economy
  G.town.food = Math.max(0, Math.min(400, G.town.food)); G.town.potions = Math.min(30, G.town.potions); G.town.gearStock = Math.min(10, G.town.gearStock);
  // thieves steal
  if (rchance(0.12)) { const th = alive.filter(h => h.job === 'thief' && h.alive && h.age >= 16); if (th.length) { const t = rpick(th), v = rpick(alive.filter(h => h !== t && h.gold > 10 && h.age >= 14) || [t]); if (v && v !== t) { const amt = Math.min(v.gold, rint(8, 25)); v.gold -= amt; t.gold += amt; soulOf(t).k.evil += 1.5; t.guilt = 1; v.rel[t.id] = (v.rel[t.id] || 0) - 40; G.dayEvil += 0.5; logEvent('betrayal', [t.id, v.id], { amt }, ['crime'], 0.65, 0.8, t); } } }
  dailyQuests();
  if (d % 6 === 0 && G.humans.some(x => !x.alive && G.tick - (x.diedAt || 0) > TICK_YEAR)) { G.humans = G.humans.filter(x => x.alive || G.tick - (x.diedAt || 0) <= TICK_YEAR); rebuildIdx(); }
  // monster raids
  if (!G.awakened) {
    if (yr >= 4 && d >= G.raidDay && rchance(0.5 + (0.5 - G.balance / 200) * 0.5)) { spawnRaid(2 + (yr >> 2), yr <= 5 ? 1 : 2, false); G.raidDay = d + rint(9, 15); }
    else if (d >= G.raidDay) G.raidDay = d + 3;
  } else {
    const since = (G.tick - G.awakenAt) / TICK_YEAR;
    if (d >= G.raidDay) { spawnRaid(Math.round(TUNE.waveBase + since * TUNE.waveGrow + (G.balance < -20 ? 1 : 0)), 3, true); G.raidDay = d + Math.max(3, Math.round(TUNE.waveInt - since * TUNE.waveDec)); }
    if (!G.sortie && G.tick > G.awakenAt + 4.5 * TICK_YEAR && G.boss.alive) { G.sortie = true; G.boss.mode = 'raid'; G.boss.dormant = false; logEvent('boss_sortie', [], {}, ['boss'], 1, 1, G.boss); }
  }
  if (G.awakened && G.boss.alive && !G.bossFight) G.boss.hp = Math.min(G.boss.maxHp, G.boss.hp + G.boss.maxHp * 0.005);
  if (d % 12 === 0) { G.balYear.push(G.balAcc / 12); G.balAcc = 0; yearlyUpdate(); }
  // stats sample
  G.stats.faithSum = (G.stats.faithSum || 0) + G.faith; G.stats.faithN = (G.stats.faithN || 0) + 1;
}
function yearlyUpdate() {
  const yr = yearOf(G.tick);
  if (!G.awakened) {
    const avg = G.balYear[G.balYear.length - 1] || 0;
    G.awakenOff = clamp((G.awakenOff || 0) + (avg - 10) / 100 * 0.6, -2, 2);
    G.awakenTick = BOSS_BASE_TICK + Math.round(G.awakenOff * TICK_YEAR);
  } else if (G.boss.alive) {
    G.boss.maxHp = Math.round(G.boss.maxHp * TUNE.bossGrow); G.boss.hp = Math.min(G.boss.maxHp, G.boss.hp * TUNE.bossGrow + 1); G.boss.atk *= 1.08; G.boss.def *= 1.07;
    G.cadres.forEach(i => { const c = G.idx[i]; if (c && c.alive) { c.maxHp = Math.round(c.maxHp * 1.08); c.atk *= 1.08; c.def *= 1.05; } });
  }
}

/* ---------- endings ---------- */
function endGame(kind) {
  if (G.ending) return;
  G.ending = { kind, t: G.tick, year: yearOf(G.tick) };
  logEvent('ending_' + kind, [], {}, ['ending'], 1, 1, null);
  if (G.onEnd) G.onEnd(G.ending);
}
function checkEndings() {
  if (G.ending) return;
  const alive = G.stats.alive;
  if (G.awakened && (G.town.hp <= 0 || alive < 6)) return endGame('doom');
  if (G.faith <= 0.5) G.faithZero++; else G.faithZero = Math.max(0, G.faithZero - 3);
  if (G.faithZero > 18 * TICK_DAY && G.tick - (G.lastAnswer || 0) > 12 * TICK_DAY) return endGame('godleft');
  if (G.stag >= 36) return endGame('stagnant');
  if (G.tick > START_TICK + 22 * TICK_YEAR) return endGame(G.awakened ? 'doom' : 'stagnant');
}

/* ---------- main tick ---------- */
function tick() {
  if (G.ending) return;
  G.tick++;
  const tk = G.tick;
  for (const h of G.humans) { h.px = h.x; h.py = h.y; if (h.hurt > 0) h.hurt--; }
  for (const m of G.monsters) { m.px = m.x; m.py = m.y; if (m.hurt > 0) m.hurt--; }
  if (!G.awakened && tk >= G.awakenTick) awaken();
  updateParties();
  let alive = 0;
  for (let i = 0; i < G.humans.length; i++) { const h = G.humans[i]; if (h.alive) { alive++; updateHuman(h); } }
  G.stats.alive = alive;
  for (let i = 0; i < G.monsters.length; i++) updateMonster(G.monsters[i]);
  spawnTick();
  // town pressure
  const pr = townPressure();
  if (pr > 0) G.town.hp = Math.max(G.awakened ? -1 : 25, G.town.hp - pr * TUNE.townDrain); else G.town.hp = Math.min(100, G.town.hp + 0.012);
  if (G.town.hp < 70 && !G.sieged && G.awakened) { G.sieged = true; logEvent('siege', [], {}, ['raid'], 0.85, 0.8, PLAZA); } else if (G.town.hp > 95) G.sieged = false;
  if (G.raidAlive === 0) G.townAlert = 0; else G.townAlert = Math.max(G.townAlert, 12);
  if (tk % 6 === 0) { expirePrayers(); if (G.bossFight && !G.parties.some(p => p.boss && p.state !== 'done')) G.bossFight = false; if (G.awakened) tryBossExpedition(); scripted(); }
  if (tk % TICK_DAY === 0) dayUpdate();
  if (G.policy === 'basic') policyBasic();
  chronTick();
  checkEndings();
}
function scripted() {
  const rel = G.tick - START_TICK;
  if (!G.flags.firstPrayer && rel >= 520) {
    G.flags.firstPrayer = 1;
    const c = G.humans.filter(h => h.alive && h.job === 'farmer' && h.age >= 18); const h = c.length ? c[0] : G.humans.find(x => x.alive);
    if (h && !hasPrayer(h)) { h.hp = Math.min(h.hp, h.maxHp * 0.45); h.prayCd = 0; const p = addPrayer(h, 'sick', 0.8); if (p) G.flags.tutPrayer = p.id; }
  }
  if (!G.flags.farewell && rel >= 680) {
    G.flags.farewell = 1; const g = hById0('gald'), k = hById0('kyle');
    if (g && k && g.alive && k.alive) logEvent('master_farewell', [g.id, k.id], { fixed: true }, ['relation'], 0.9, 0.8, g);
  }
}

/* ---- 08_faith.js ---- */
/* ================= faith / divine powers / counsel / policy ================= */
const FATIGUE_WIN = 30 * TICK_DAY;
function godOf() { return GODS.find(g => g.id === G.god) || GODS[0]; }
function fatigueStage(pid) {
  G.hist = G.hist.filter(x => G.tick - x.t < FATIGUE_WIN);
  const n = G.hist.filter(x => x.p === pid).length;
  return Math.floor(n / 3);
}
function powerCost(pid) {
  const base = POWER_BY_ID[pid].cost; const gm = godOf().cost[pid] || 1;
  return Math.max(1, Math.round(base * gm * (1 + 0.2 * fatigueStage(pid))));
}
const BASE_P = { oracle: 0.66, grace: 0.72, trial: 0.6, soul: 0.55, force: 0.62 };
function successProb(pid, h) {
  let p = BASE_P[pid] + (godOf().bonus[pid] || 0) - 0.05 * fatigueStage(pid);
  if (h) {
    p += (50 - h.needs.faith) / 260 - (h.disappoint || 0) * 0.03;
    const s = soulOf(h); if (s && s.fav) p += 0.1;
    const pray = G.prayers.find(x => x.state === 'open' && x.hid === h.id); if (pray) p += 0.04 * pray.urg + 0.04;
  }
  return clamp(p, 0.15, 0.93);
}
function rollOutcome(p) {
  const wild = godOf().wild || 0;
  const crit = p * (0.2 + wild), tw = (1 - p) * (0.55 + wild * 2);
  const u = rnd();
  if (u < crit) return 'crit'; if (u < p) return 'success'; if (u < p + tw) return 'twist'; return 'fail';
}
function resolvePrayer(pr, outcome, pid, h) {
  if (!pr || pr.state !== 'open') return;
  pr.state = outcome === 'twist' ? 'twisted' : 'answered'; pr.by = pid; pr.out = outcome;
  const gain = outcome === 'crit' ? 10 : outcome === 'success' ? 6 : 2.5;
  G.faith = Math.min(G.faithMax, G.faith + gain); G.lastAnswer = G.tick; G.stats.answered++;
  h.needs.faith = Math.max(0, h.needs.faith - 40); h.disappoint = Math.max(0, (h.disappoint || 0) - 1);
  if (G.onPrayerEnd) G.onPrayerEnd(pr);
  if (!G.tut.prayer) G.tut.prayer = true;
}
function prayerOf(h) { return G.prayers.find(p => p.state === 'open' && p.hid === h.id); }

/* cast: returns {ok,outcome,cost,...} */
function castPower(pid, tid, dir) {
  const P = POWER_BY_ID[pid]; if (!P) return { ok: false, err: 'bad' };
  const cost = powerCost(pid);
  if (G.faith < cost) return { ok: false, err: 'faith', cost };
  let h = null, s = null;
  if (pid !== 'force') {
    const e = G.idx[tid]; if (e && e.job) h = e; else if (G.sidx[tid]) s = G.sidx[tid];
    if (!h && !s) return { ok: false, err: 'target' };
    if (h && !h.alive) return { ok: false, err: 'target' };
    if (s && pid !== 'soul') return { ok: false, err: 'target' };
    if (pid === 'trial' && h && (h.child && h.age < 8)) return { ok: false, err: 'child' };
  }
  const tgtH = h || (s && s.state === 'alive' ? hById(s.hid) : null);
  const p = successProb(pid, h || tgtH);
  const outcome = rollOutcome(p);
  const pk0 = h ? ((prayerOf(h) || {}).kind || '') : '';
  G.faith -= cost; G.hist.push({ p: pid, t: G.tick }); G.stats.casts++;
  const res = { ok: true, outcome, cost, pid, p, tid, name: h ? h.name : s ? s.name : null, dir };
  if (pid === 'oracle') doOracle(h, outcome, dir || 'kind', res);
  else if (pid === 'grace') doGrace(h, outcome, res);
  else if (pid === 'trial') doTrial(h, outcome, res);
  else if (pid === 'soul') doSoul(h, s, outcome, dir || 'good', res);
  else doForce(outcome, dir || 'light', res);
  if (pid === 'oracle') G.tut.oracle = true;
  G.stats.lastCast = res;
  if (G.fxOn) { G.fx.push({ t: 'divine', x: h ? h.x : tgtH ? tgtH.x : PLAZA.x, y: h ? h.y : tgtH ? tgtH.y : PLAZA.y, pid, out: outcome }); }
  logEvent(outcome === 'crit' && pid !== 'force' ? 'miracle' : 'divine_act', h ? [h.id] : tgtH ? [tgtH.id] : [], { pid, out: outcome, dir: dir || '', kind: pk0 }, ['divine'], outcome === 'crit' ? 0.85 : outcome === 'fail' ? 0.3 : 0.5, outcome === 'crit' ? 1 : 0.6, h || tgtH || PLAZA);
  if (G.onCast) G.onCast(res);
  return res;
}
const OPP = { brave: 'careful', careful: 'brave', kind: 'brave' };
function doOracle(h, out, dir, res) {
  const pr = prayerOf(h);
  if (out === 'fail') { return; }
  const kind = out === 'twist' ? OPP[dir] : dir;
  h.bias = { kind, until: G.tick + (out === 'crit' ? 5 : 3) * TICK_DAY };
  res.biasKind = kind;
  if (pr && PRAYER_ANS[pr.kind].indexOf('oracle') >= 0) {
    if (out !== 'twist') applyPrayerBoon(pr, h, 'oracle', out === 'crit');
    resolvePrayer(pr, out, 'oracle', h);
  }
  if (out === 'crit') { h.needs.honor = Math.min(100, h.needs.honor + 15); soulOf(h).k.good += 0.5; }
  if (out === 'twist') { h.needs.safety = 100; if (rchance(0.4)) { h.gold = Math.max(0, h.gold - 10); res.side = 'lostgold'; } }
}
function applyPrayerBoon(pr, h, pid, strong) {
  const s = soulOf(h);
  switch (pr.kind) {
    case 'hunger': h.needs.hunger = Math.max(0, h.needs.hunger - 70); G.town.food += 3; break;
    case 'sick': case 'fear': h.hp = Math.min(h.maxHp, h.hp + h.maxHp * (strong ? 0.8 : 0.5)); if (pr.kind === 'fear') s.k.attach = Math.max(0, s.k.attach - 1); break;
    case 'love': { let best = null, bv = 0; for (const k in h.rel) { const o = hById(+k); if (o && o.alive && o.sex !== h.sex && !o.spouse && h.rel[k] > bv) { bv = h.rel[k]; best = o; } } if (best) { h.rel[best.id] = Math.min(100, h.rel[best.id] + 25); best.rel[h.id] = Math.min(100, (best.rel[h.id] || 0) + 20); } break; }
    case 'battle': h.buffs.bless = G.tick + 2 * TICK_DAY; break;
    case 'revenge': h.grief = 0; s.k.attach = Math.max(0, s.k.attach - 1); break;
    case 'forgive': h.guilt = 0; h.quarrel = null; s.k.evil = Math.max(0, s.k.evil - 1.5); break;
    case 'birth': if (h.preg) h.preg = Math.min(h.preg, G.tick + 12); break;
  }
}
function doGrace(h, out, res) {
  const pr = prayerOf(h);
  if (out === 'fail') return;
  if (out === 'twist') { h.hp = Math.min(h.maxHp, h.hp + h.maxHp * 0.15); h.gold += 15; h.bias = { kind: 'brave', until: G.tick + 2 * TICK_DAY }; res.side = 'hubris'; }
  else {
    const f = out === 'crit' ? 1 : 0.55; h.hp = Math.min(h.maxHp, h.hp + h.maxHp * f);
    h.buffs.grace = G.tick + (out === 'crit' ? 4 : 2) * TICK_DAY;
    if (out === 'crit') { addExp(h, h.lvl * 22 * 0.35); }
    if (h.alive) { const st = hStats(h); h.maxHp = st.hp; }
  }
  if (pr && PRAYER_ANS[pr.kind].indexOf('grace') >= 0) { if (out !== 'twist') applyPrayerBoon(pr, h, 'grace', out === 'crit'); resolvePrayer(pr, out, 'grace', h); }
}
function doTrial(h, out, res) {
  if (out === 'fail') return;
  const tier = clamp(1 + (yearOf(G.tick) >> 1), 1, 3);
  if (out === 'twist') { G.famine = G.tick + 3 * TICK_DAY; G.balance = clamp(G.balance - 3, -100, 100); res.side = 'famine'; return; }
  const n = out === 'crit' ? 1 : rint(1, 2) + (tier > 1 ? 1 : 0);
  for (let i = 0; i < n; i++) { const m = spawnMonster(out === 'crit' ? Math.min(3, tier + 1) : tier, h, 'wander'); if (m) m.tgt = h.id; }
  G.balance = clamp(G.balance - 2.5, -100, 100); G.dayEvil += 0.2;
  h.buffs.trial = G.tick + 2 * TICK_DAY; soulOf(h).k.deed += 2;
  if (out === 'crit') { h.lvl = Math.min(25, h.lvl + 1); const st = hStats(h); h.maxHp = st.hp; h.hp = h.maxHp; res.side = 'levelup'; }
  h.needs.safety = 100;
}
function doSoul(h, s, out, dir, res) {
  const soul = s || soulOf(h);
  if (out === 'fail') return;
  const f = (soul.fav ? 1.5 : 1);
  if (out === 'twist') { const keys = ['good', 'evil', 'deed', 'attach']; soul.k[rpick(keys)] += 2; res.side = 'random'; return; }
  soul.k[dir] += (out === 'crit' ? 8 : 4) * f;
  if (h) { h.guilt = 0; if (dir === 'good') { h.needs.faith = Math.max(0, h.needs.faith - 20); } const pr = prayerOf(h); if (pr && PRAYER_ANS[pr.kind].indexOf('soul') >= 0) { applyPrayerBoon(pr, h, 'soul', out === 'crit'); resolvePrayer(pr, out, 'soul', h); } }
}
function doForce(out, dir, res) {
  if (out === 'fail') return;
  const sg = dir === 'light' ? 1 : -1;
  if (out === 'twist') { G.balance = clamp(G.balance - sg * 6, -100, 100); res.side = 'reverse'; return; }
  const amt = out === 'crit' ? 26 : 16;
  G.balance = clamp(G.balance + sg * amt, -100, 100);
  if (dir === 'light') {
    let n = 0; for (const m of G.monsters) { if (m.alive && !m.boss && m.cad < 0 && m.mode !== 'raid' && n < (out === 'crit' ? 6 : 3) && rchance(0.6)) { m.alive = false; n++; fxAdd({ t: 'poof', x: m.x, y: m.y }); } }
    G.humans.forEach(h => { if (h.alive && canFight(h)) { h.buffs.bless = G.tick + 3 * TICK_DAY; h.hp = Math.min(h.maxHp, h.hp + h.maxHp * (out === 'crit' ? 0.5 : 0.25)); } });
    const sc = out === 'crit' ? TUNE.scorch * 1.6 : TUNE.scorch; G.monsters.forEach(m => { if (m.alive && !m.dormant && (m.mode === 'raid' || m.boss)) { m.hp = Math.max(1, m.hp - m.maxHp * sc); fxAdd({ t: 'ring', x: m.x, y: m.y }); } });
    G.stag = Math.max(0, G.stag - 6);
  } else { for (let i = 0; i < 3; i++) spawnMonster(tierForSpawn()); }
}
function toggleFav(sid) {
  const s = G.sidx[sid]; if (!s) return false;
  if (s.fav) { s.fav = false; G.favored = G.favored.filter(i => i !== sid); return true; }
  if (G.favored.length >= 5) return false;
  s.fav = true; G.favored.push(sid); return true;
}
function useEye(h) {
  if (G.eye < 1) return null; G.eye--;
  const s = soulOf(h); const hz = h.age >= 60 ? ((h.age - 60) * 0.002 + 0.0006) * 100 : 0.06;
  return { id: h.id, deathPct: +(hz * 12).toFixed(1), karma: s.k, act: h.act ? h.act.k : 'idle', prayerSoon: h.prayCd <= 30, echo: h.echo, bonds: s.bonds.length, lives: s.lives.length, hint: h.hp < h.maxHp * 0.4 ? 'hurt' : h.grief ? 'grief' : h.love ? 'love' : 'calm' };
}

/* ---------- counsel (顧問) ---------- */
function topAdvs(n) { return G.humans.filter(h => h.alive && isAdv(h)).sort((a, b) => advPower(b) - advPower(a)).slice(0, n); }
function counselStatus() {
  const adv = G.humans.filter(h => h.alive && isAdv(h));
  const yrsToAwaken = Math.max(0, (G.awakenTick - G.tick) / TICK_YEAR);
  const o = { balance: Math.round(G.balance), faith: Math.round(G.faith), pop: G.stats.alive || 0, adv: adv.length, avgLv: adv.length ? +(adv.reduce((a, h) => a + h.lvl, 0) / adv.length).toFixed(1) : 0, awakened: G.awakened, toAwaken: +yrsToAwaken.toFixed(1), townHp: Math.round(G.town.hp), food: Math.round(G.town.food), prayers: openPrayers().length, cad: G.cadres.filter(i => G.idx[i] && G.idx[i].alive).length };
  if (G.awakened && G.boss.alive) { const g = topAdvs(8); if (g.length >= 2) o.bossRatio = +bossEstimate(g).ratio.toFixed(2); }
  return o;
}
function counselActions(goal) {
  const out = []; const adv = topAdvs(6);
  const add = (pid, tid, dir, key, extra) => { const h = tid && G.idx[tid] && G.idx[tid].job ? G.idx[tid] : null; out.push(Object.assign({ pid, tid, dir, key, p: +successProb(pid, h).toFixed(2), cost: powerCost(pid) }, extra || {})); };
  if (goal === 'boss') {
    if (G.balance < 25) add('force', 0, 'light', 'c_force_light');
    const w = adv.find(h => h.hp < h.maxHp * 0.8) || adv[0]; if (w) add('grace', w.id, '', 'c_grace_hero', { who: w.name });
    if (adv[1]) add('oracle', adv[1].id, 'brave', 'c_oracle_brave', { who: adv[1].name });
  } else if (goal === 'nurture') {
    const young = G.humans.filter(h => h.alive && isAdv(h)).sort((a, b) => a.lvl - b.lvl)[0]; const fav = G.favored.map(i => G.sidx[i]).filter(s => s && s.state === 'alive').map(s => hById(s.hid))[0];
    const t = fav || young; if (t) { add('oracle', t.id, 'brave', 'c_oracle_brave', { who: t.name }); add('trial', t.id, '', 'c_trial', { who: t.name, risk: true }); add('grace', t.id, '', 'c_grace_hero', { who: t.name }); }
  } else if (goal === 'avoid') {
    const hurt = G.humans.filter(h => h.alive && h.hp < h.maxHp * 0.5).sort((a, b) => a.hp / a.maxHp - b.hp / b.maxHp)[0]; if (hurt) add('grace', hurt.id, '', 'c_grace_heal', { who: hurt.name });
    const pr = openPrayers().sort((a, b) => b.urg - a.urg)[0]; if (pr) { const h = hById(pr.hid); if (h) add(PRAYER_ANS[pr.kind][0], h.id, 'kind', 'c_answer', { who: h.name, pk: pr.kind }); }
    if (G.balance < 0) add('force', 0, 'light', 'c_force_light');
  } else {
    const t = adv[0]; if (t) add('trial', t.id, '', 'c_trial', { who: t.name, risk: true });
    const lovers = G.humans.filter(h => h.alive && h.love)[0]; if (lovers) add('oracle', lovers.id, 'kind', 'c_oracle_love', { who: lovers.name });
    add('force', 0, 'dark', 'c_force_dark');
  }
  return out.slice(0, 3);
}

/* ---------- auto policy ('basic') ---------- */
function policyBasic() {
  if (G.tick % 6 !== 0) return;
  const yr = yearOf(G.tick);
  const bank = G.awakened ? 120 : yr >= 5 ? 100 : 26;
  let n = 0;
  const can = (pid, res) => G.faith >= powerCost(pid) + (res === undefined ? bank : res);
  const bp = G.parties.find(p => p.boss && p.state !== 'done');
  if (bp) {
    const mem = bp.members.map(i => hById(i)).filter(h => h && h.alive).sort((a, b) => a.hp / a.maxHp - b.hp / b.maxHp);
    const lead = mem[0]; const near = lead && G.boss.alive && mem.some(m => Math.hypot(m.x - G.boss.x, m.y - G.boss.y) < 14);
    if (!near) return;
    if (G.faith >= powerCost('force') && G.tick - (G.lastForceB || 0) >= 12 && (G.forceBCount || 0) < 3 && G.balance < 90) { castPower('force', 0, 'light'); G.lastForceB = G.tick; G.forceBCount = (G.forceBCount || 0) + 1; return; }
    const keep = (G.forceBCount || 0) < 3 ? powerCost('force') : 0;
    for (const m of mem) { if (n >= 2) break; if (G.faith < powerCost('grace') + keep * (m.hp < m.maxHp * 0.35 ? 0 : 1)) continue; if (m.hp < m.maxHp * 0.45 || (!(m.buffs.grace > G.tick) && G.faith >= powerCost('grace') + keep + 10)) { castPower('grace', m.id); n++; } }
    return;
  }
  const bigRaid = G.awakened && G.raidAlive >= 3;
  if (bigRaid && G.tick - (G.lastForce || 0) > 2 * TICK_DAY && G.faith >= powerCost('force') + TUNE.polRes) { castPower('force', 0, 'light'); G.lastForce = G.tick; n++; }
  else if (!G.awakened && G.balance < -5 && can('force', 30) && G.tick - (G.lastForce || 0) > TICK_DAY) { castPower('force', 0, 'light'); G.lastForce = G.tick; n++; }
  else if (G.balance > 60 && can('force', 30) && G.stag > 10) { castPower('force', 0, 'dark'); n++; }
  if (G.awakened && G.raidAlive > 0 && n < 2) { const hurt = G.humans.filter(h => h.alive && canFight(h) && h.hp < h.maxHp * 0.45 && !(h.buffs.grace > G.tick))[0]; if (hurt && G.faith >= powerCost('grace') + TUNE.polRes) { castPower('grace', hurt.id); n++; } }
  const prs = openPrayers().sort((a, b) => b.urg - a.urg);
  for (const pr of prs) {
    if (n >= 2) break; const h = hById(pr.hid); if (!h || !h.alive) continue;
    const opts = PRAYER_ANS[pr.kind].filter(x => can(x) && (x !== 'soul' || G.faith > 80)).sort((a, b) => powerCost(a) - powerCost(b));
    if (!opts.length) continue;
    castPower(opts[0], h.id, pr.kind === 'battle' ? 'brave' : 'kind'); n++;
  }
  if (!G.awakened && n < 1 && G.faith > 70 + 15) { const hurt = G.humans.filter(h => h.alive && isAdv(h) && h.hp < h.maxHp * 0.5 && !h.inside)[0]; if (hurt && rchance(0.3)) { castPower('grace', hurt.id); n++; } }
  if (!G.awakened && yr <= 4 && G.faith > 90 && n < 1 && rchance(0.08)) { const y = G.humans.filter(h => h.alive && isAdv(h) && h.hp > h.maxHp * 0.9).sort((a, b) => a.lvl - b.lvl)[0]; if (y) castPower('trial', y.id); }
}

/* ---- 09_chron.js ---- */
/* ================= chronicle (史官): events -> director -> templates ================= */
const TIME_BEATS = {
  morning: [['朝の光が{P}に差し込んでいた。', '晨光灑進{P}。'], ['まだ冷たい朝の空気が、{P}を包んでいた。', '尚帶涼意的晨間空氣，包裹著{P}。']],
  day: [['昼の陽が高く、{P}の影は短かった。', '正午日頭高掛，{P}的影子短短的。'], ['日差しの強い昼下がりだった。{P}は、どこか眠たげだった。', '那是陽光強烈的午後。{P}顯得有些昏昏欲睡。']],
  dusk: [['夕焼けが{P}の屋根を赤く染めていた。', '夕陽把{P}的屋頂染成赤紅。'], ['日が傾き、{P}に長い影が伸びはじめていた。', '日頭西斜，{P}開始拖出長長的影子。']],
  evening: [['夜のとばりが降り、{P}に灯がともりはじめた。', '夜幕降下，{P}亮起了燈火。'], ['夕餉の匂いが、{P}の路地に漂っていた。', '晚飯的香氣，飄散在{P}的巷弄裡。']],
  night: [['深い夜だった。{P}の灯は、ほとんど消えていた。', '那是深夜。{P}的燈火幾乎都熄了。'], ['月明かりの下、{P}は息を潜めているようだった。', '月光下，{P}彷彿屏著呼吸。']],
};
const WEATHER_BEATS = [
  [['春風が、土の匂いを運んでいた。', '春風帶來泥土的氣息。'], ['薄い雲が、空をゆっくり流れていた。', '薄雲在天空緩緩流動。']],
  [['蝉の声が、遠くで途切れなく続いていた。', '遠處的蟬鳴不間斷地持續著。'], ['夏の雲が、山の向こうで大きく育っていた。', '夏日的雲，在山的彼端漸漸堆高。']],
  [['乾いた秋風に、枯れ葉が転がっていた。', '乾燥的秋風中，枯葉滾動著。'], ['収穫を終えた畑から、藁の匂いがした。', '收割完的田裡，飄來稻草的味道。']],
  [['冷たい風が、頬を刺すようだった。', '冷風彷彿刺著臉頰。'], ['薄く積もった雪が、足音を吸い込んでいた。', '薄薄積起的雪，吸走了腳步聲。']],
];
const SPEECH_TAGS = [
  ['{S}は静かに言った。', '{S}靜靜地說。'], ['{S}は目を伏せたまま答えた。', '{S}垂著眼回答。'], ['{S}の声は、少し震えていた。', '{S}的聲音，微微顫抖著。'],
  ['{S}は笑って見せた。', '{S}擠出一抹笑。'], ['{S}は短く息を吐いた。', '{S}短短地吐了口氣。'], ['{S}は、まっすぐに相手を見た。', '{S}直直地望向對方。'],
];
const INTENT = {
  encourage: { elder: ['「恐れていい。恐れたまま、足を出せ。」', '「怕也沒關係。帶著怕，把腳踏出去。」'], young: ['「大丈夫だって！{B}となら、どこでも行ける。」', '「沒問題啦！有{B}在，哪裡都去得。」'], plain: ['「焦らなくていい。いつも通りにやろう。」', '「別急。照平常那樣做就好。」'] },
  rebuff: { elder: ['「甘えるな。自分の足で立て。」', '「別撒嬌。用自己的腳站穩。」'], young: ['「放っといてくれよ。お前に何が分かる。」', '「別管我了。你懂什麼。」'], plain: ['「それは、お前が決めることだ。」', '「那是你該自己決定的事。」'] },
  hide: { elder: ['「なに、ただの古傷さ。気にするな。」', '「沒什麼，只是舊傷。別放在心上。」'], young: ['「べ、別に何でもないよ。本当に。」', '「沒、沒什麼啦。真的。」'], plain: ['「……いや、何でもない。忘れてくれ。」', '「……不，沒什麼。忘了吧。」'] },
  confess: { elder: ['「実はな、ずっと言えずにいたことがある。」', '「其實啊，有件事一直沒能說出口。」'], young: ['「聞いてほしいんだ。ずっと、{B}のことが——」', '「我想讓你聽我說。我一直，對{B}——」'], plain: ['「話しておきたいことがある。聞いてくれるか。」', '「有件事我想說清楚。你願意聽嗎。」'] },
  test: { elder: ['「ほう。ならば、一手見せてもらおうか。」', '「哦。那麼，讓我見識一招吧。」'], young: ['「本気で来いよ。手加減はなしだ。」', '「認真來啊。別手下留情。」'], plain: ['「お前の覚悟、確かめさせてもらう。」', '「讓我確認一下你的覺悟。」'] },
  entrust: { elder: ['「これを預ける。わしの代わりに、持っていけ。」', '「這個交給你。代替我，帶著它走吧。」'], young: ['「頼む。{B}にしか、任せられないんだ。」', '「拜託了。只有{B}，我才放心交給。」'], plain: ['「あとは、お前に任せた。」', '「後面，就交給你了。」'] },
  apologize: { elder: ['「すまなかった。年寄りの意地だった。」', '「對不起。是老人家的固執。」'], young: ['「ごめん！あのとき、言いすぎた。」', '「對不起！那時候，我說得太過分了。」'], plain: ['「悪かった。許してくれとは言わない。」', '「是我不好。我不求你原諒。」'] },
  lie: { elder: ['「なあに、心配はいらん。すぐ戻る。」', '「哎，不必擔心。馬上就回來。」'], young: ['「平気平気！かすり傷だよ、こんなの。」', '「沒事沒事！這種小擦傷。」'], plain: ['「大したことじゃない。本当だ。」', '「不是什麼大事。真的。」'] },
  promise: { elder: ['「帰ったら、また一杯やろう。約束だ。」', '「回來後，再喝一杯。說定了。」'], young: ['「絶対帰ってくる。約束するよ！」', '「我一定會回來。我保證！」'], plain: ['「必ず戻る。それだけは、約束する。」', '「我一定會回來。只有這件事，我向你保證。」'] },
  farewell: { elder: ['「達者でな。わしの分まで、生きろ。」', '「保重啊。連我的那份一起，活下去。」'], young: ['「さよならは言わない。またな！」', '「我不說再見。回頭見！」'], plain: ['「……さようなら。ありがとう。」', '「……再見了。謝謝你。」'] },
};
const HIST_BANK = {
  calm: [['記すべきは、勝敗ではなく、その手が震えていたことだ。', '該記下的不是勝負，而是那隻手在顫抖。'], ['後の世は、これを偶然と呼ぶだろう。私は、そうは書かない。', '後世會稱之為偶然。我不這樣寫。'], ['言葉にならなかったものを、墨はどこまで運べるだろうか。', '無法化為言語的事物，墨能運載到多遠呢。'], ['見たことは書く。見なかったことは、そう書く。', '看見的就寫。沒看見的，就如實寫成沒看見。']],
  sad: [['名を記すことしか、私にはできない。それでも、記す。', '我只能記下名字。即便如此，仍要記下。'], ['今日の墨は、いつもより重かった。', '今天的墨，比平日沉重。'], ['涙の跡は、紙の上ではすぐに乾く。胸の中では、乾かない。', '淚痕在紙上很快就乾。在胸中，不會乾。'], ['失われたものの数を、数え終える者はいない。', '沒有人能數完失去的東西。'], ['悲しみもまた、この世の重さの一部である。', '悲傷也是這個世界重量的一部分。']],
  bright: [['小さな幸いほど、記録されずに消えていく。だから私は書く。', '越是小小的幸福，越容易不被記錄就消逝。所以我書寫。'], ['笑い声の音を、文字にできないのが惜しい。', '可惜笑聲的聲音無法寫成文字。'], ['これは、のちに誰かを励ます一頁になるだろう。', '這會成為日後鼓勵某人的一頁吧。'], ['光が差す瞬間は、いつも、拍子抜けするほど静かだ。', '光照進來的瞬間，總是安靜得令人錯愕。'], ['人は、思っているより、ずっと強い。', '人，比自己以為的更堅強。']],
};
const DRAMA_POOL = {
  desire: [['強くなって、誰かを守ること', '變強，守護某個人'], ['いつか自分の店を持つこと', '總有一天擁有自己的店'], ['故郷の畑をもう一度見ること', '再看一次故鄉的田地'], ['誰かに認められること', '被某個人認同'], ['静かな老後を迎えること', '平靜地迎接晚年'], ['まだ見ぬ世界の果てを知ること', '見識未曾見過的世界盡頭']],
  fear: [['独りで死んでいくこと', '孤獨地死去'], ['大切な人を守れないこと', '守不住重要的人'], ['弱い自分を知られること', '被人知道自己的軟弱'], ['暗闇の中に取り残されること', '被遺留在黑暗之中'], ['何者にもなれないこと', '成不了任何人'], ['約束を破ってしまうこと', '違背約定']],
  secret: [['昔、仲間を見捨てて逃げたことがある', '曾經拋下夥伴逃走'], ['本当は、剣が好きではない', '其實並不喜歡劍'], ['夜な夜な、同じ夢を見ている', '夜夜都做著同一個夢'], ['誰にも言えない借金がある', '背著無法對人說的債'], ['前世の記憶の断片を持っている', '留有前世記憶的片段'], ['ある人を、ずっと想い続けている', '一直默默思念著某個人']],
  lie: [['「俺は平気だ」と、いつも言う', '總是說「我沒事」'], ['「興味がない」と、笑って言う', '笑著說「我沒興趣」'], ['「もう忘れた」と、答える', '回答說「早就忘了」'], ['「一人のほうが気楽だ」と、言い張る', '堅稱「一個人比較輕鬆」'], ['「たいした怪我じゃない」と、言う', '說「不是什麼大傷」'], ['「神なんて信じない」と、うそぶく', '嘴硬說「我才不信神」']],
};

/* scene packs: t=title, talk=intents, intro/act/inner/close = beat pairs, mood */
const SC = {
  depart: { t: ['出立', '出發'], mood: 'bright', talk: ['encourage', 'promise'],
    intro: [['{A}は装備の紐を締め直し、{B}の顔を見た。', '{A}重新繫緊裝備的繩結，看向{B}。'], ['天秤亭の掲示板から、一枚の依頼書が剥がされた。', '天秤亭的佈告板上，一張委託書被取了下來。'], ['{P}の前に、旅支度の影がいくつも並んだ。', '{P}前，並排站著好幾道整裝待發的身影。']],
    act: [['依頼は{M}の討伐。報酬は決して多くないが、断る理由もなかった。', '委託內容是討伐{M}。報酬不算豐厚，卻也沒有拒絕的理由。'], ['{B}が革袋の薬を数え、無言のまま一つ多く{A}へ手渡した。', '{B}清點著皮袋裡的藥，默默多分了一瓶給{A}。'], ['門が開き、冷たい空気が一行の頬を撫でた。', '城門開啟，冷冽的空氣拂過一行人的臉頰。']],
    inner: [['戻れる保証など、誰にもない。それでも足は前へ出た。', '沒有人能保證歸來。腳步仍舊向前邁出。'], ['{A}は胸の内で、帰り道の歩数を数えていた。', '{A}在心中，數著歸途的步數。']],
    close: [['一行の背が、丘の向こうへ小さくなっていった。', '一行人的背影，在山丘彼端漸漸變小。'], ['見送る者の祈りだけが、町に残った。', '只有送行者的祈禱，留在鎮上。']] },
  mentor_parting: { t: ['師弟の別れ', '師徒話別'], mood: 'sad', talk: ['entrust', 'farewell'],
    intro: [['稽古場に、木剣の乾いた音が止んだ。{A}は{B}の前に静かに立った。', '練武場上，木劍清脆的聲響停了。{A}靜靜站在{B}面前。'], ['{P}の風は冷たく、{B}の肩に載った一年分の疲れを撫でていった。', '{P}的風很冷，輕撫著{B}肩上積了一年的疲憊。'], ['その日、{B}は初めて、師の背を追うのをやめることになった。', '那一天，{B}第一次必須停止追逐師父的背影。']],
    act: [['{A}は古い鞘を差し出した。柄の革は、幾度も巻き直された跡がある。', '{A}遞出一把舊劍鞘。劍柄的皮革上，有著反覆重纏的痕跡。'], ['{B}は何か言いかけて、結局、深く頭を下げただけだった。', '{B}想說些什麼，最後只是深深低下了頭。'], ['夕暮れの影が、二人の間で一本に重なった。', '暮色的影子，在兩人之間重疊成一條。']],
    inner: [['教わったのは剣だけではない。{B}はそれを、まだうまく言葉にできなかった。', '學到的不只是劍術。{B}還沒辦法把這件事好好說出口。'], ['{A}は思う。弟子が自分を越えていく日ほど、嬉しく寂しい日はない、と。', '{A}心想：弟子超越自己的那一天，是最令人歡喜、也最寂寞的日子。']],
    close: [['稽古場には、洗い終えた木剣が二本、並んで立てかけられていた。', '練武場裡，洗淨的兩把木劍並排倚在牆邊。'], ['それが、師弟の最後の稽古になった。', '那成了師徒最後一次練習。']] },
  firstbattle: { t: ['初陣', '初陣'], mood: 'bright', talk: ['encourage', 'lie'],
    intro: [['{A}の掌は、汗で剣の柄に張りついていた。', '{A}的掌心被汗水黏在劍柄上。'], ['初めて見る{M}は、思っていたよりずっと大きかった。', '第一次見到的{M}，比想像中大得多。'], ['{P}の草が風に鳴る。{A}の鼓動のほうが、うるさかった。', '{P}的草隨風作響。{A}的心跳聲更吵。']],
    act: [['足がすくんだ。次の瞬間、体が勝手に前へ出ていた。', '雙腿一軟。下一瞬，身體卻自己衝了上去。'], ['一太刀、二太刀。{M}が崩れ落ちたとき、{A}はしばらく動けなかった。', '一刀、兩刀。當{M}倒下時，{A}好一陣子動彈不得。'], ['仲間の{B}が肩を叩いた。その手の温かさで、ようやく息を思い出した。', '同伴{B}拍了拍肩。那手掌的溫度，才讓{A}想起該呼吸。']],
    inner: [['怖かった。けれど、逃げなかった。それだけが{A}の誇りだった。', '很可怕。但沒有逃走。只有這件事，是{A}的驕傲。'], ['あの重さを、{A}は一生忘れないだろう。', '那份重量，{A}大概一輩子也忘不了。']],
    close: [['初陣の夜、{A}は剣を抱いたまま、泥のように眠った。', '初陣之夜，{A}抱著劍，像泥一樣沉沉睡去。'], ['帰り道の空は、妙に高く見えた。', '歸途的天空，看起來格外高遠。']] },
  defeat: { t: ['敗北', '敗北'], mood: 'sad', talk: ['apologize', 'rebuff'],
    intro: [['勝てると思っていた。それが、最初の誤りだった。', '原以為能贏。那是最初的錯誤。'], ['{P}に、{M}の咆哮がまだ残っているようだった。', '{P}彷彿還殘留著{M}的咆哮。'], ['退く合図が出たとき、すでに陣は崩れていた。', '撤退信號發出時，陣形早已潰散。']],
    act: [['{A}は{B}を背負い、泥の中を一歩ずつ町へ向かった。', '{A}揹著{B}，在泥濘中一步一步走向鎮上。'], ['折れた剣の柄だけが、{A}の手の中に残っていた。', '只有斷劍的劍柄，還留在{A}手中。'], ['戻れなかった者の名が、口の中で一つずつ消えていった。', '沒能回來的人的名字，在口中一個個消散。']],
    inner: [['悔しさは、涙より先に喉を焼いた。', '不甘心，比眼淚更早灼傷了喉嚨。'], ['敗北は終わりではない。そう言い聞かせるほど、声は細くなった。', '敗北不是終結。越是這樣告訴自己，聲音越是細弱。']],
    close: [['天秤亭の灯は、その夜、いつもより長くともっていた。', '那一夜，天秤亭的燈比平日亮得更久。'], ['傷は癒える。だが、あの景色は、きっと癒えない。', '傷會痊癒。但那幅景象，大概不會。']] },
  return: { t: ['帰還', '歸還'], mood: 'bright', talk: ['encourage', 'promise'],
    intro: [['夕方の門が開き、泥だらけの一行が戻ってきた。', '傍晚城門開啟，滿身泥濘的一行人回來了。'], ['天秤亭の扉の鈴が鳴った。{A}たちの顔を見て、誰かが小さく息をついた。', '天秤亭的門鈴響起。看見{A}他們的臉，有人輕輕鬆了口氣。'], ['{P}に灯がともるころ、{A}の影が長く伸びた。', '{P}亮起燈火時，{A}的影子被拉得很長。']],
    act: [['報酬の{N}Gが、卓の上でちゃり、と鳴った。', '{N}金幣的報酬，在桌上叮噹作響。'], ['{B}は疲れ切った顔で、それでも誰より先に杯を掲げた。', '{B}一臉疲憊，卻仍比誰都先舉起酒杯。'], ['{A}は{M}の牙を卓に置き、短く報告を済ませた。', '{A}把{M}的獠牙放到桌上，簡短地完成了報告。']],
    inner: [['帰れた。それだけで、今日は十分だった。', '能回來。光這樣，今天就夠了。'], ['{A}は、掌の傷を数えながら、小さく笑った。', '{A}一邊數著掌上的傷，一邊輕輕笑了。']],
    close: [['その夜の酒は、少しだけ甘かった。', '那一夜的酒，微微有些甜。'], ['掲示板には、もう次の依頼が貼られていた。', '佈告板上，已經貼出了下一份委託。']] },
  confess: { t: ['告白', '告白'], mood: 'bright', talk: ['confess', 'hide'],
    intro: [['祭りの灯が消えかけたころ、{A}は{B}を呼び止めた。', '祭典的燈火快要熄滅時，{A}叫住了{B}。'], ['{P}の端、人通りの絶えた場所で、二人きりになった。', '{P}一隅，在人跡斷絕之處，只剩兩人。'], ['言うまいと決めていた言葉が、喉の奥で何度も形を変えた。', '決定不說出口的話，在喉嚨深處一次次改變形狀。']],
    act: [['{B}は足を止め、ゆっくり振り返った。', '{B}停下腳步，緩緩回過頭。'], ['{A}は拳を握り、それから、ほどいた。', '{A}握緊拳頭，然後又鬆開。'], ['沈黙が、鐘の音ひとつ分だけ続いた。', '沉默持續了一聲鐘響那麼久。']],
    inner: [['答えがどうであれ、言えたことだけで、{A}の胸は軽かった。', '無論答案如何，光是說出口，{A}的胸口就輕了。'], ['{B}は、自分でも気づかないうちに、微笑んでいた。', '{B}連自己都沒察覺，嘴角已悄悄上揚。']],
    close: [['夜風が、二人の間を静かに通り抜けた。', '夜風靜靜穿過兩人之間。'], ['明日からの景色が、少しだけ違って見えるだろう。', '明天起的風景，大概會有些不同吧。']] },
  wedding: { t: ['婚礼', '婚禮'], mood: 'bright', talk: ['promise', 'confess'],
    intro: [['{P}の鐘が、いつもより高く鳴った。', '{P}的鐘聲，比平日響得更高。'], ['花を編んだ輪が、{B}の髪にそっと載せられた。', '編成的花環，被輕輕戴在{B}的髮上。'], ['質素な席だった。それでも、集まった顔はみな笑っていた。', '簡樸的席位。然而聚集的臉龐都笑著。']],
    act: [['{A}は誓いの言葉を、一度つかえて、二度目で言い切った。', '{A}的誓詞，第一次卡住，第二次才說完。'], ['酒が回り、誰かが古い歌を歌い始めた。', '酒過三巡，有人唱起了古老的歌。'], ['{B}が差し出した手に、{A}の手が重なった。', '{A}的手，覆上了{B}伸出的手。']],
    inner: [['幸せとは、案外こういう静かなものなのかもしれない。', '幸福，或許出乎意料地，就是這樣安靜的東西。'], ['この日を、{A}は何度も夢に見てきた。', '{A}曾無數次，夢見這一天。']],
    close: [['鐘の余韻が消えても、二人は並んで立っていた。', '鐘聲餘韻散去之後，兩人仍並肩站著。'], ['祝福は、神にではなく、隣の人に向けて捧げられた。', '祝福，不是獻給神，而是獻給身旁的人。']] },
  drift: { t: ['すれ違い', '擦身而過'], mood: 'sad', talk: ['hide', 'rebuff'],
    intro: [['言葉は足りていた。足りなかったのは、聞く耳のほうだった。', '話語並不缺。缺的是願意聆聽的耳朵。'], ['{P}ですれ違ったとき、{A}と{B}は互いに目を逸らした。', '在{P}擦肩而過時，{A}與{B}彼此別開了視線。'], ['小さな行き違いが、気づけば壁になっていた。', '小小的錯過，不知不覺間成了一道牆。']],
    act: [['{A}は何か言いかけて、結局、挨拶だけ残して通り過ぎた。', '{A}想說什麼，最後只留下一句招呼便走了過去。'], ['{B}が差し出そうとした包みは、そのまま懐に戻された。', '{B}本想遞出的包裹，又原封不動收回了懷中。'], ['同じ道を歩きながら、二人の影は決して重ならなかった。', '走在同一條路上，兩人的影子始終沒有重疊。']],
    inner: [['本当は、謝りたかった。ただ、その一言が重かった。', '其實想道歉。只是那一句話太沉重。'], ['距離は、縮めるより、広げるほうがずっと容易い。', '距離，拉遠總是比拉近容易得多。']],
    close: [['日が暮れても、どちらの窓にも灯がともらなかった。', '天黑了，兩邊的窗戶都沒有亮起燈。'], ['春になれば、きっと雪も解ける——そう信じるしかなかった。', '到了春天，雪一定會融——只能這麼相信。']] },
  quarrel: { t: ['喧嘩', '爭吵'], mood: 'sad', talk: ['rebuff', 'test'],
    intro: [['{P}に、怒鳴り声が響いた。', '{P}迴盪著怒吼聲。'], ['酒の席のはずが、いつの間にか、昔の話になっていた。', '本該是酒席，不知不覺間卻成了翻舊帳。'], ['きっかけは些細な言葉だった。{A}は、それを許せなかった。', '起因只是細微的一句話。{A}卻無法原諒。']],
    act: [['杯が卓を叩き、周りの客が一斉に口をつぐんだ。', '酒杯敲在桌上，周圍的客人頓時噤聲。'], ['{B}は立ち上がり、椅子が大きな音を立てて倒れた。', '{B}站起身，椅子哐地一聲倒下。'], ['誰かが止めに入ったが、二人は互いから目を離さなかった。', '有人上前勸阻，兩人卻誰也沒移開視線。']],
    inner: [['言いすぎた、と気づいたのは、扉が閉まった後だった。', '發現說得太過分時，已是門關上之後。'], ['怒りの奥には、いつも、言えなかった寂しさがある。', '憤怒的深處，總藏著說不出口的寂寞。']],
    close: [['残された杯の酒が、静かに波紋を描いていた。', '留下的酒杯裡，酒液靜靜漾著波紋。'], ['その夜、{P}はいつもより早く灯を落とした。', '那一夜，{P}比平日更早熄了燈。']] },
  reconcile: { t: ['仲直り', '和好'], mood: 'bright', talk: ['apologize', 'promise'],
    intro: [['三日ぶりに、{A}は{B}の家の戸を叩いた。', '隔了三天，{A}敲響了{B}家的門。'], ['雪解けのような静けさが、{P}に降りていた。', '如同融雪般的寧靜，降臨在{P}。'], ['先に頭を下げたのは、意外にも、頑固な{A}のほうだった。', '先低頭的，出乎意料是固執的{A}。']],
    act: [['{B}は黙って、{A}の前に杯をひとつ置いた。', '{B}默默地在{A}面前放下一只杯子。'], ['二人は並んで腰を下ろし、しばらく窓の外を眺めていた。', '兩人並肩坐下，好一會兒只是望著窗外。'], ['照れ隠しの咳払いが、同時に二つ重なった。', '掩飾害羞的咳嗽聲，同時響起了兩聲。']],
    inner: [['許すとは、忘れることではない。覚えたまま、隣に座ることだ。', '原諒，不是忘記。是記得，卻仍坐在身旁。'], ['仲違いの時間さえ、後から見れば、必要な遠回りだった。', '就連鬧翻的那段時間，事後看來也是必要的繞路。']],
    close: [['湯気の立つ杯の向こうで、二人はようやく笑った。', '在冒著熱氣的杯子對面，兩人終於笑了。'], ['窓の外で、風が少しだけ暖かくなった。', '窗外，風稍稍暖了起來。']] },
  funeral: { t: ['葬送', '送葬'], mood: 'sad', talk: ['farewell', 'promise'],
    intro: [['{P}の鐘が、ゆっくり三度鳴った。', '{P}的鐘，緩緩敲了三下。'], ['白い花が、{A}の名を刻んだ石の前に積まれていった。', '白花一朵朵堆在刻有{A}之名的石前。'], ['風のない朝だった。弔いの列は、音もなく進んだ。', '那是無風的清晨。送葬的行列悄無聲息地前進。']],
    act: [['{B}は{A}の形見を、そっと胸の前で抱えた。', '{B}把{A}的遺物，輕輕抱在胸前。'], ['僧侶の祈りが終わり、{A}の魂は、河へと送られた。', '僧侶的祈禱結束，{A}的靈魂被送往河川。'], ['誰もが、{A}との最後の会話を思い出そうとしていた。', '每個人都在回想與{A}最後的對話。']],
    inner: [['死は終わりではない。そう教わっても、胸の穴は塞がらなかった。', '死亡不是終點。即使這樣被教導，胸口的空洞也無法填補。'], ['{A}が遺したものは、名前よりも、残された者の癖の中にあった。', '{A}留下的東西，比起名字，更存在於留下之人的習慣裡。']],
    close: [['魂は川を下り、いつか、どこかで、また誰かになる。', '靈魂順流而下，總有一天，在某處，再次成為某人。'], ['夜、{B}は{A}の席に、空の杯をひとつ置いた。', '夜裡，{B}在{A}的座位上，放了一只空杯。']] },
  birth: { t: ['誕生', '誕生'], mood: 'bright', talk: ['promise', 'entrust'],
    intro: [['夜明け前、{P}の一室で、小さな産声が上がった。', '黎明之前，{P}的一間屋裡，響起了小小的啼哭。'], ['長い夜が明けた。{A}は、疲れ果てた顔で、それでも微笑んでいた。', '漫長的夜晚結束。{A}雖然疲憊不堪，仍露出微笑。'], ['窓の外で、鳥が一羽、慌てたように鳴いた。', '窗外，有一隻鳥慌張地叫了一聲。']],
    act: [['産婆が{B}を白い布に包み、{A}の腕に抱かせた。', '產婆用白布包起{B}，放入{A}的臂彎。'], ['{B}は小さな指で、{A}の指を確かに握った。', '{B}用小小的手指，牢牢握住{A}的手指。'], ['近所の者が次々と訪れ、小さな祝いの品を置いていった。', '鄰居們陸續造訪，留下小小的賀禮。']],
    inner: [['この子の魂は、どこから来たのだろう。{A}はふと、そう思った。', '這孩子的靈魂，是從哪裡來的呢。{A}忽然這麼想。'], ['名前は、もう決めてある。{B}。いい名前だ。', '名字早已決定。{B}。是個好名字。']],
    close: [['教会の鐘が、新しい命のために一度だけ鳴らされた。', '教會的鐘，為了新的生命，只敲響了一次。'], ['朝の光が、揺りかごの縁を金色に染めた。', '晨光把搖籃的邊緣染成金色。']] },
  promotion: { t: ['昇進', '晉升'], mood: 'bright', talk: ['encourage', 'test'],
    intro: [['天秤亭の奥で、小さな儀式が行われた。', '天秤亭的深處，舉行了一場小小的儀式。'], ['{A}の名が、掲示板の一番上に書き換えられた。', '{A}的名字，被改寫到佈告板的最上方。'], ['{P}に、拍手が起きた。{A}は照れて、うつむいた。', '{P}響起掌聲。{A}害羞地低下了頭。']],
    act: [['{A}は新しい腕章を受け取り、指先で何度もなぞった。', '{A}收下新的臂章，指尖來回摩挲。'], ['努力の数を数えた者だけが、この重さを知っている。', '只有數過自己努力次數的人，才懂這份重量。'], ['師と呼べる誰かが、遠くで静かに頷いていた。', '能稱為師父的某人，在遠處靜靜點頭。']],
    inner: [['まだ道の途中だ。分かっている。それでも、今日だけは胸を張っていい。', '還在路途中。這點明白。不過，只有今天可以挺起胸膛。'], ['強くなるとは、守るものが増えることでもあった。', '變強，也意味著要守護的東西增加了。']],
    close: [['その夜、{A}は剣を磨き、いつもより長く眺めていた。', '那夜，{A}擦拭著劍，比平常看得更久。'], ['掲示板の隅に、新しい依頼が風にはためいていた。', '佈告板的一角，新的委託在風中輕輕拍動。']] },
  betrayal: { t: ['裏切り', '背叛'], mood: 'sad', talk: ['lie', 'rebuff'],
    intro: [['財布が軽いと気づいたのは、日が暮れてからだった。', '直到日暮，才發現錢包輕了。'], ['{P}で、小さな噂が、静かに広がり始めた。', '{P}裡，一則小小的傳言靜靜擴散開來。'], ['信じていた手が、同じ手でなければよかったのに。', '若那隻曾被信賴的手，不是同一隻就好了。']],
    act: [['{B}は{A}の前に立ち、空になった革袋を卓に置いた。', '{B}站在{A}面前，把空了的皮袋放到桌上。'], ['{A}は目を逸らし、唇の端だけで笑ってみせた。', '{A}別開視線，只用嘴角擠出一抹笑。'], ['{N}Gの重みが、二人の間に、静かに沈んでいた。', '{N}金幣的重量，靜靜沉在兩人之間。']],
    inner: [['金より重いものを、{A}は確かに失った。', '比金錢更重的東西，{A}確實失去了。'], ['裏切りは一瞬だ。けれど、疑いは、長く残る。', '背叛只在一瞬。但猜疑，會長久留存。']],
    close: [['その夜、{B}は戸締まりを二度確かめた。', '那一夜，{B}把門窗確認了兩遍。'], ['{A}の名は、帳面の隅に、小さく書き足された。', '{A}的名字，被小小地添寫在帳簿一角。']] },
  forgive: { t: ['赦し', '寬恕'], mood: 'calm', talk: ['apologize', 'promise'],
    intro: [['教会の薄暗い礼拝堂で、{A}は長いあいだ祈っていた。', '教會昏暗的禮拜堂裡，{A}祈禱了很長一段時間。'], ['赦しを求める者は、いつも、扉の外で一度立ち止まる。', '尋求寬恕的人，總會在門外停下一次。'], ['{B}の足音が、石の床に、遠慮がちに響いた。', '{B}的腳步聲，在石地板上怯怯地迴響。']],
    act: [['{A}は振り向き、{B}の握りしめた拳を見た。', '{A}轉過身，看見{B}緊握的拳頭。'], ['蝋燭の炎が、一度だけ大きく揺れて、また静かになった。', '燭火大幅搖曳了一次，又歸於平靜。'], ['長い沈黙のあと、{A}はゆっくり、手を差し出した。', '漫長的沉默之後，{A}緩緩伸出手。']],
    inner: [['許すと決めたのは、神の声のせいではない。{A}自身の選択だった。', '決定原諒，並非因為神的聲音。而是{A}自己的選擇。'], ['重荷を下ろす、というのは、案外、静かなものらしい。', '卸下重擔，似乎出乎意料地安靜。']],
    close: [['蝋燭の光が、二つの影を、ひとつの形にした。', '燭光讓兩道影子，合成了同一個形狀。'], ['外へ出ると、雲が切れて、星が見えた。', '走出門外，雲散開，露出了星星。']] },
  oracle_dream: { t: ['神託の夢', '神諭之夢'], mood: 'calm', talk: ['hide', 'confess'],
    intro: [['その夜、{A}は不思議な夢を見た。', '那一夜，{A}做了一個奇異的夢。'], ['眠りの底で、秤の音がした。ゆっくりと、傾く音だった。', '沉睡的深處，傳來天秤的聲音。是緩緩傾斜的聲音。'], ['{P}の灯が消えたあと、光のない光が、枕元に降りた。', '{P}的燈熄滅之後，沒有光的光，降臨在枕邊。']],
    act: [['顔のない誰かが、{A}の名を、三度だけ呼んだ。', '沒有臉孔的某人，只呼喚了{A}的名字三次。'], ['言葉は聞き取れなかった。だが、意味だけは胸に残った。', '聽不清話語。但意思，留在了胸口。'], ['目覚めたとき、頬は濡れ、掌は不思議と温かかった。', '醒來時，臉頰濕潤，掌心卻異常溫暖。']],
    inner: [['あれは神の声だったのか。それとも、願いが形になっただけか。', '那是神的聲音嗎。還是只是願望化成了形。'], ['{A}は考えるのをやめ、とにかく、今日の一歩目を選んだ。', '{A}不再多想，總之，選了今日的第一步。']],
    close: [['朝の鐘が鳴った。夢の続きのように、世界はいつもより澄んでいた。', '晨鐘響起。彷彿夢的延續，世界比平日更為澄澈。'], ['史官は、その夢のことを、墨の乾く前に書き留めた。', '史官趁墨還沒乾，把那場夢記了下來。']] },
  miracle: { t: ['奇跡', '奇蹟'], mood: 'bright', talk: ['confess', 'promise'],
    intro: [['それは、あまりにも静かな奇跡だった。', '那是一個太過安靜的奇蹟。'], ['{P}に、説明のつかない光が満ちた。', '{P}被無法解釋的光芒充滿。'], ['誰かが祈り、そして、誰かが答えた。', '有人祈禱，然後，有人回應了。']],
    act: [['{A}の傷は、見る間に塞がり、頬に血の色が戻った。', '{A}的傷口，在眾人眼前癒合，臉頰重現血色。'], ['居合わせた者は、息をするのも忘れて見入っていた。', '在場的人屏息凝望，忘了呼吸。'], ['光は一度だけ脈打ち、そして、空へ溶けていった。', '光只脈動了一次，便融進天空。']],
    inner: [['信じることと、知ることは違う。だが、今日だけは、同じ顔をしていた。', '相信與知道並不相同。但只有今天，它們長著同一張臉。'], ['{A}は、膝をついた。ただ、ありがとう、とだけ言った。', '{A}跪了下去。只說了一句：謝謝。']],
    close: [['教会の鐘は、頼まれもしないのに、ひとりでに鳴った。', '教會的鐘，沒人拜託，卻自己響了起來。'], ['後世は、これを偶然と呼ぶのだろう。', '後世，大概會稱之為偶然吧。']] },
  raid: { t: ['魔物襲来', '魔物來襲'], mood: 'calm', talk: ['encourage', 'lie'],
    intro: [['見張りの鐘が、夜の{P}を引き裂いた。', '哨戒的鐘聲，撕裂了{P}的夜。'], ['地平の向こうから、魔物の群れが砂煙を上げて迫ってきた。', '地平線彼端，魔物的群體捲起沙塵逼近。'], ['{N}体の影が、{P}の柵に迫った。', '{N}道黑影，逼近{P}的柵欄。']],
    act: [['{A}は剣を抜き、門の前に立ちふさがった。', '{A}拔出劍，擋在門前。'], ['子どもたちは家に隠され、戸に閂がかけられた。', '孩子們被藏進家中，門被插上門閂。'], ['矢が唸り、杖の先に光が集まり、最初の一体が倒れた。', '箭矢呼嘯，杖尖聚起光芒，第一隻魔物倒下。']],
    inner: [['守るべきものが背にある。それだけで、恐怖は少しだけ形を変えた。', '守護之物就在身後。光是如此，恐懼便稍稍改變了形狀。'], ['数では劣る。けれど、退く場所は、もうなかった。', '人數居於劣勢。但已無處可退。']],
    close: [['夜明けまでに、柵の外の影は、すべて静かになった。', '天亮之前，柵欄外的黑影全都安靜了。'], ['焦げた匂いが、朝霧の中で、いつまでも漂っていた。', '焦味，在晨霧中久久飄散不去。']] },
  siege: { t: ['籠城', '守城'], mood: 'sad', talk: ['encourage', 'lie'],
    intro: [['三日目の夜、{P}の備蓄は目に見えて減っていた。', '第三夜，{P}的儲備眼看著減少。'], ['城壁の外では、魔の者たちが、昼も夜も輪を縮めていた。', '城牆外，魔物們日夜不停地縮小包圍圈。'], ['人々は教会に身を寄せ、声をひそめて夜を数えた。', '人們聚集在教會，壓低聲音數著夜晚。']],
    act: [['{A}は残った薬を等分し、一人ひとりの手に載せた。', '{A}把剩下的藥平均分配，一個個放在眾人手中。'], ['子どもが泣くと、誰かが歌い、その歌が、少しずつ広がっていった。', '孩子哭了，有人唱起歌，歌聲漸漸傳開。'], ['門の閂が、軋んだ。{A}が背で、それを押さえた。', '門閂發出吱嘎聲。{A}用背頂住了它。']],
    inner: [['耐えれば夜は明ける。そう信じることだけが、残された武器だった。', '只要撐過去，夜就會明。相信這件事，是僅存的武器。'], ['数えきれない祈りが、石壁の隙間に染みこんでいた。', '數不清的祈禱，滲入石牆的縫隙。']],
    close: [['暁の光が差すまで、誰も、眠らなかった。', '直到曙光照入，沒有人入睡。'], ['籠城は、まだ、終わらない。', '守城，仍未結束。']] },
  reunion: { t: ['再会', '重逢'], mood: 'calm', talk: ['confess', 'promise'],
    intro: [['初めて会ったはずだった。それなのに、{A}は{B}の笑い方を知っていた。', '明明是第一次見面。然而{A}卻認得{B}的笑法。'], ['{P}の人混みの中で、二人の視線が、同時に止まった。', '在{P}的人群中，兩人的視線同時停住。'], ['名前を聞く前から、懐かしさが先に立っていた。', '還沒問名字，懷念就已先一步湧起。']],
    act: [['{B}は首をかしげ、それから、小さく笑った。「どこかで、会いましたか」', '{B}歪著頭，然後輕輕笑了。「我們，在哪裡見過嗎？」'], ['二人は理由も分からないまま、同じ歩幅で歩き出した。', '兩人不明所以，卻以相同的步幅並肩走了起來。'], ['古い歌の一節が、どちらからともなく、口をついて出た。', '一段古老的歌詞，不知是誰先起頭，脫口而出。']],
    inner: [['魂は、忘れたふりをして、ちゃんと覚えている。', '靈魂，假裝忘記，其實全都記得。'], ['転生の河は、すべてを洗い流すわけではないらしい。', '轉生之河，似乎並未洗去一切。']],
    close: [['それが、再び結ばれた縁の、最初の一日だった。', '那是再度相繫之緣的第一天。'], ['史官は、静かに筆を置き、窓の外を見た。', '史官靜靜擱下筆，望向窗外。']] },
  awakening: { t: ['転生の覚醒', '轉生的覺醒'], mood: 'calm', talk: ['confess', 'hide'],
    intro: [['その子は、誰にも教わっていない歌を口ずさんでいた。', '那孩子哼著沒人教過的歌。'], ['{A}は、{P}の古い井戸をのぞき込み、ふと、{V}の名を呟いた。', '{A}探頭望著{P}的老井，忽然低聲念出{V}的名字。'], ['眠っていた何かが、{A}の瞳の奥で、そっと目を開けた。', '沉睡的某物，在{A}瞳孔深處，悄悄睜開了眼。']],
    act: [['{A}は、自分が知らないはずの道を、迷いなく歩いた。', '{A}毫不迷惘地走上了自己本不該認得的路。'], ['見たことのない剣の構えが、{A}の腕に自然と宿った。', '從未見過的劍式，自然而然地附在{A}的手臂上。'], ['周りの大人は驚き、それから、懐かしそうに目を細めた。', '周圍的大人先是驚訝，接著懷念地瞇起了眼。']],
    inner: [['前の生の名残は、夢のように淡い。それでも、確かにそこにあった。', '前世的殘影，像夢一樣淡。然而確實存在。'], ['{A}は怖くなかった。ただ、少しだけ、懐かしかった。', '{A}並不害怕。只是，有一點點懷念。']],
    close: [['河の向こうで、誰かが、微笑んだ気がした。', '彷彿河的彼端，有人微笑了。'], ['魂の旅は、まだ、続いている。', '靈魂的旅程，仍在繼續。']] },
  omen: { t: ['魔王の兆し', '魔王的徵兆'], mood: 'sad', talk: ['hide', 'encourage'],
    intro: [['その朝、空の色が、わずかに濁っていた。', '那天清晨，天空的顏色微微混濁。'], ['東の台地で、紫の霧が、ゆっくりと渦を巻き始めた。', '東邊高地上，紫色的霧開始緩緩捲起漩渦。'], ['鳥が一斉に飛び立ち、犬が遠くを見て、低く唸った。', '鳥群同時飛起，狗望向遠方，低聲嗚咽。']],
    act: [['黒い冠を戴いた影が、城の窓辺に、立ち上がった。', '戴著黑冠的影子，在城堡窗邊站了起來。'], ['天秤の皿が、人の目にも分かるほど、闇の側へ沈んだ。', '天秤的盤子，沉向暗的一側，連人眼都看得出來。'], ['教会の鐘は鳴らなかった。誰も、鳴らす勇気がなかった。', '教會的鐘沒有響。沒有人，有勇氣敲響它。']],
    inner: [['来るべきものが、ついに来た。誰もが、そう知っていた。', '該來的終於來了。每個人都知道。'], ['世界は、息を止めて、次の一手を待っていた。', '世界屏住呼吸，等待下一手。']],
    close: [['その夜、{P}の灯は、いつもの倍、ともされた。', '那一夜，{P}的燈火，點了平日的兩倍。'], ['——黒冠の王、ノクタール。その名が、ついに記された。', '——黑冠之王，諾克塔爾。這個名字，終於被寫下。']] },
  eve: { t: ['決戦前夜', '決戰前夜'], mood: 'calm', talk: ['promise', 'entrust'],
    intro: [['決戦の前夜、天秤亭は、いつになく静かだった。', '決戰前夜，天秤亭靜得異乎尋常。'], ['{N}人の討伐隊が、卓を囲み、それぞれの剣を磨いていた。', '{N}人的討伐隊圍著桌子，各自擦拭著自己的劍。'], ['誰も、明日のことを口にしなかった。それが、かえって、すべてを語っていた。', '沒有人談論明天。反而，這已說明了一切。']],
    act: [['{A}は地図の上に、小さな印をひとつだけ打った。', '{A}在地圖上，只標下了一個小小的記號。'], ['{B}は、遺書とも手紙ともつかない紙を、何度も折りたたんだ。', '{B}反覆摺著那張說不清是遺書還是書信的紙。'], ['外では、祈りの声が、細く、途切れずに続いていた。', '門外，祈禱聲細細地、不曾間斷地持續著。']],
    inner: [['勝てるかどうかは、問題ではない。向かうかどうか、それだけだった。', '能不能贏不是問題。去，還是不去，只有這個問題。'], ['{A}は、静かに、自分の名前を一度だけ呟いた。', '{A}靜靜地，只低聲念了一次自己的名字。']],
    close: [['夜が明けた。討伐隊は、誰にも見送られず、東へ向かった。', '天亮了。討伐隊沒有人送行，向東出發。'], ['史官は、まだ墨の乾かぬ頁を、そっと閉じた。', '史官輕輕合上墨跡未乾的書頁。']] },
  battle: { t: ['決戦', '決戰'], mood: 'calm', talk: ['encourage', 'farewell'],
    intro: [['{M}の影が、{P}の空を覆った。', '{M}的影子，覆蓋了{P}的天空。'], ['剣と爪がぶつかる音が、天秤の皿を震わせた。', '劍與爪相撞的聲響，震動了天秤的盤子。'], ['地面が、鳴いた。それが、戦いの始まりだった。', '大地鳴動。那便是戰鬥的開端。']],
    act: [['{A}は{M}の懐へ飛び込み、渾身の一撃を叩き込んだ。', '{A}衝入{M}懷中，使出渾身一擊。'], ['仲間の一人が倒れ、{B}がその名を叫んだ。声は、剣戟にかき消された。', '一名同伴倒下，{B}喊出他的名字。聲音被刀劍聲淹沒。'], ['光と闇が、一瞬だけ、等しい重さで揺れた。', '光與暗，在一瞬間，以相同的重量搖晃。']],
    inner: [['勝敗の先を考える余裕はなかった。ただ、手を止めないこと。', '沒有餘裕思考勝負之後。只是，不能停下手。'], ['これが最後の一太刀になるなら、悔いのないものを。', '若這是最後一刀，願無所悔恨。']],
    close: [['やがて、音が止んだ。残ったのは、風と、息づかいだけだった。', '不久，聲音停了。剩下的，只有風和呼吸聲。'], ['{M}の名は、史書の中で、重く記されることになる。', '{M}的名字，將在史書中被沉重地記下。']] },
  trial: { t: ['試煉', '試煉'], mood: 'calm', talk: ['hide', 'confess'],
    intro: [['それは、祝福とは呼べない夜だった。', '那是無法稱為祝福的夜晚。'], ['{P}に、見慣れぬ魔物の影が現れた。', '{P}出現了陌生魔物的身影。'], ['{A}は、天を仰いだ。答えは、なかった。', '{A}仰望天空。沒有答案。']],
    act: [['{A}は剣を構え、震える足で、一歩前へ出た。', '{A}舉起劍，用顫抖的雙腿，向前踏出一步。'], ['痛みは本物だった。だからこそ、勝ち取ったものも本物だった。', '疼痛是真的。正因如此，贏得的東西也是真的。'], ['夜が明けるころ、{A}の目は、昨日と違う色をしていた。', '天亮時，{A}的眼神，與昨日不同。']],
    inner: [['神が与えるのは、恵みだけではない。{A}は、それを理解し始めていた。', '神賜予的不只是恩惠。{A}開始明白這一點。'], ['痛みの意味は、後からしか、分からない。', '痛苦的意義，只有事後才會明白。']],
    close: [['史官は、そこに『試煉』と、ただ一語だけ記した。', '史官在那裡，只寫下了「試煉」一詞。'], ['やがて{A}は、その夜のことを、感謝と共に思い出すことになる。', '日後{A}回想起那一夜，將會帶著感謝。']] },
  supplement: { t: ['補伝', '補傳'], mood: 'calm', talk: [],
    intro: [['{A}という人物について、少し書き添えておく。', '關於{A}這個人，在此補記幾筆。']],
    act: [['{A}の望みは、{D}だった。', '{A}的願望，是{D}。'], ['{A}が何より恐れているのは、{F}だった。', '{A}最害怕的，是{F}。']],
    inner: [['誰にも言っていないが、{A}には秘密がある。{S}。', '雖未對任何人說過，{A}有個祕密。{S}。']],
    close: [['そして{A}は、{L}。それが、{A}のついている小さな嘘だった。', '而{A}，{L}。那是{A}撒的小小的謊。']] },
};
const FIXED = {
  prologue: { t: ['序章', '序章'], mood: 'calm', paras: [[['世界には、天秤がある。光と闇が、重さを分け合うための。人は祈り、神は聞く——それが、この世のはじまりのかたちだった。名もなき書き手は、まだ乾かぬ墨で、最初の一行を記す。', '這個世界有一座天秤。光與暗在上面分擔彼此的重量。人們祈禱，神傾聽——世界最初的樣子便是如此。無名的記錄者，用尚未乾透的墨，寫下第一行。']]] },
  master_farewell: { t: ['師弟の別れ', '師徒話別'], mood: 'sad', paras: [
    [['「この北境の件、お前が行け」', '「這趟北境，你去。」']],
    [['{B}は目を丸くした。「師匠、でも——」', '{B}愣了一下。「師父，可是——」']],
    [['{A}は振り向かず、研ぎ石を桶に沈めた。剣は鈍っていない。鈍っているのは、それを握る己の手のほうだと、老人は知っていた。', '{A}沒有回頭，只是把磨刀石沉進水桶。劍並沒有鈍。鈍的是握劍的手，老人心裡清楚。']]] },
  revelation: { t: ['同源の啓示', '同源的啟示'], mood: 'calm', paras: [
    [['{A}の最後の一撃が、黒冠の王の胸を貫いた。城は、長い溜め息のように、静まり返った。', '{A}的最後一擊，貫穿了黑冠之王的胸膛。城堡如同一聲悠長的嘆息，靜了下來。']],
    [['倒れた魔王の胸から、淡い光が立ちのぼった。それは、かつて人々が「勇者」と呼んだ者の——先代アルヴィンの魂と、寸分違わぬ色をしていた。', '倒下的魔王胸口升起一縷淡光。那光的顏色，與人們曾稱為「勇者」的先代阿爾文的靈魂，分毫不差。']],
    [['天秤の両の皿は、同じ重さで静かに揺れていた。', '天秤的兩端，以同樣的重量，靜靜搖晃。']]] },
  finale_doom: { t: ['滅世', '滅世'], mood: 'sad', paras: [
    [['鐘は、もう鳴らなかった。リュミエの灯は、ひとつ、またひとつと消え、最後に残ったのは、黒冠の王の足音だけだった。天秤の皿は、闇の側へ、静かに沈みきった。——それでも、記録者は筆を置かなかった。', '鐘不再響了。琉米耶的燈火一盞接著一盞熄滅，最後剩下的，只有黑冠之王的腳步聲。天秤的盤子，靜靜沉入暗的那一側。——即便如此，記錄者依然沒有擱筆。']],
    [['魂たちは河へ下った。いつか、この世が再び、天秤を取り戻す日まで。', '靈魂們順流而下。直到有朝一日，這個世界重新拾回天秤。']]] },
  finale_godleft: { t: ['神の退場', '神的退場'], mood: 'sad', paras: [
    [['祈りが届かなくなって、どれほど経っただろう。人々は、空に向かって手を合わせることを、いつしかやめた。神の気配は、薄い霧のように、世界から静かに退いていった。残された天秤は、風に揺れるだけだった。', '祈禱傳不到的日子，已過了多久。人們不知何時，不再朝著天空合掌。神的氣息，如同薄霧，悄悄從世界退去。留下的天秤，只在風中搖晃。']],
    [['それでも人は、自分の足で歩いていく。それもまた、ひとつの物語だった。', '即便如此，人仍用自己的雙腳走下去。那也是一則故事。']]] },
  finale_stagnant: { t: ['停滞の終幕', '停滯的終幕'], mood: 'calm', paras: [
    [['何も起きない日々が、三年続いた。光は満ち、魔物は消え、冒険者の剣は鞘の中で眠った。平和と呼ぶには、あまりに静かだった。天秤は光の皿に深く傾いたまま、動かなかった。', '什麼也沒有發生的日子，持續了三年。光芒充盈，魔物消失，冒險者的劍在鞘中沉睡。若稱之為和平，又太過安靜。天秤深深傾向光的一側，紋風不動。']],
    [['史官は、最後の頁に、白紙の一行を残した。いつか誰かが、そこに何かを書くために。', '史官在最後一頁，留下了一行空白。為了有一天，有人能在那裡寫下些什麼。']]] },
};
S.vol = { 0: ['序章', '序章'], 1: ['第一部 成長', '第一部 成長'], 2: ['第二部 魔王覚醒', '第二部 魔王覺醒'], 3: ['第三部 決戦前夜', '第三部 決戰前夜'], 4: ['終章', '終章'] };

/* ---------- chapter building ---------- */
function volumeNow() {
  if (G.ending) return 4;
  if (G.bossFight || G.sortie || (G.awakened && G.cadres.filter(i => G.idx[i] && !G.idx[i].alive).length >= 2)) return 3;
  return G.awakened ? 2 : 1;
}
function nmPair(e) { return e && e.name ? e.name : (e && e.n) || ['？', '？']; }
function chronHistorian() { return G.humans.find(h => h.alive && h.job === 'historian'); }
function trustFor(ev) {
  const hs = chronHistorian(); if (!hs) return 'hearsay';
  if (ev.actors.indexOf(hs.id) >= 0) return 'witness';
  if (ev.pos && Math.hypot(hs.x - ev.pos.x, hs.y - ev.pos.y) < 10) return 'witness';
  return 'hearsay';
}
function seasonOfTick(tk) { return seasonOf(tk); }
function sceneFor(ev) {
  const p = ev.payload || {};
  switch (ev.type) {
    case 'master_farewell': return ev.payload.fixed ? 'master_farewell' : 'mentor_parting';
    case 'mentor_parting': return 'mentor_parting';
    case 'party_formed': return (p.tier >= 2 && ev.id % 100 < 40) ? 'depart' : null;
    case 'boss_expedition': return 'eve';
    case 'first_battle': return 'firstbattle';
    case 'quest_clear': return (p.tier >= 2 && ev.id % 100 < 35) ? 'return' : null;
    case 'quest_fail': return p.q === 'boss' ? 'battle' : (p.wipe || ev.id % 100 < 30) ? 'defeat' : null;
    case 'love_start': return 'confess'; case 'marriage': return 'wedding';
    case 'quarrel': return ev.id % 3 === 0 ? 'drift' : 'quarrel'; case 'reconcile': return 'reconcile';
    case 'death': return 'funeral'; case 'birth': return 'birth'; case 'promotion': return 'promotion'; case 'betrayal': return 'betrayal';
    case 'divine_act': if (p.pid === 'oracle' && (p.out === 'success' || p.out === 'crit') && p.kind === 'forgive') return 'forgive'; if (p.pid === 'oracle' && p.out !== 'fail') return 'oracle_dream'; if (p.pid === 'trial' && p.out !== 'fail') return 'trial'; return null;
    case 'miracle': return 'miracle';
    case 'monster_raid': return 'raid'; case 'siege': return 'siege';
    case 'destined_reunion': return 'reunion'; case 'soul_echo': return 'awakening';
    case 'boss_awaken': case 'boss_sortie': return 'omen';
    case 'cadre_slain': return 'battle'; case 'boss_slain': return 'revelation';
    case 'ending_doom': return 'finale_doom'; case 'ending_godleft': return 'finale_godleft'; case 'ending_stagnant': return 'finale_stagnant';
  }
  return null;
}
const FORCE_EV = { master_farewell: 1, boss_awaken: 1, boss_slain: 1, boss_sortie: 1, ending_doom: 1, ending_godleft: 1, ending_stagnant: 1, boss_expedition: 1, cadre_slain: 1 };
const TURNING = { death: 0.9, boss_awaken: 1, boss_slain: 1, cadre_slain: 0.9, boss_expedition: 0.95, marriage: 0.7, love_start: 0.65, betrayal: 0.7, reconcile: 0.6, destined_reunion: 0.9, soul_echo: 0.8, miracle: 0.8, monster_raid: 0.55, siege: 0.8, birth: 0.6, promotion: 0.5, quest_fail: 0.5 };
function dramaScore(ev) {
  const fresh = 1 - G.chapters.slice(-6).filter(c => c.ev === ev.type).length / 6;
  let rel = ev.actors.length >= 2 ? 0.8 : ev.actors.length === 1 ? 0.55 : 0.3;
  if (ev.actors.some(i => G.spot.indexOf(i) >= 0 || G.track.indexOf(i) >= 0)) rel += 0.25;
  return clamp(ev.tension * 0.35 + ev.emotion * 0.25 + Math.min(1, rel) * 0.2 + (TURNING[ev.type] || 0.3) * 0.1 + fresh * 0.1, 0, 1);
}
const ADV_SCENE = { raid: 1, siege: 1, battle: 1, eve: 1, depart: 1, return: 1, defeat: 1, firstbattle: 1, trial: 1, omen: 1 };
function fillActors(ids, seed, scene) {
  const rg = new RNG(seed); const out = ids.slice(0, 3);
  let pool = G.humans.filter(h => h.alive && h.age >= 16 && out.indexOf(h.id) < 0);
  if (scene === 'funeral' && out.length === 1) { const d = G.idx[out[0]]; let b = null, bv = -1; if (d) for (const k in d.rel) { const o = G.idx[k]; if (o && o.alive && o.age >= 10 && d.rel[k] > bv) { bv = d.rel[k]; b = o; } } if (b) { out.push(b.id); return out; } }
  if (ADV_SCENE[scene]) { const pa = pool.filter(h => isAdv(h)); if (pa.length) pool = pa; }
  if (!out.length && (scene === 'prologue')) return out;
  while (out.length < 2 && pool.length) { const i = rg.int(0, pool.length - 1); out.push(pool[i].id); pool.splice(i, 1); }
  return out;
}
function makeChapter(scene, ev, over) {
  const seed = (ev ? ev.id * 2654435761 : G.chapNo * 977) >>> 0;
  const ids = ev ? fillActors(ev.actors, seed, scene) : [];
  const an = {}; ids.forEach(i => { const e = G.idx[i]; an[i] = (ev && ev.names && ev.names[i]) || (e && e.name) || ['？', '？']; });
  const p = ev ? ev.payload : {};
  const ch = {
    id: G.nid++, no: ++G.chapNo, t: ev ? ev.t : G.tick, now: G.tick, scene, ev: ev ? ev.type : '', vol: volumeNow(), seed, a: ids, an, pl: ev ? ev.place : 'town', tod: timeWord(ev ? ev.t : G.tick), sea: seasonOfTick(ev ? ev.t : G.tick),
    trust: ev ? trustFor(ev) : 'witness', N: p.n || p.reward || p.amt || p.n0 || (G.parties.find(q => q.boss) ? G.parties.find(q => q.boss).n0 : 5), M: null, V: null, year: yearOf(ev ? ev.t : G.tick),
  };
  if (p.mon && MONS[p.mon]) ch.M = MONS[p.mon].n; else if (p.mon === 'boss') ch.M = BOSS.n; else if (p.cad >= 0 && CADRES[p.cad]) ch.M = CADRES[p.cad].n; else if (scene === 'battle') ch.M = BOSS.n; else ch.M = MONS[rpick0(['mush', 'bat', 'goblin', 'wolf'], seed)].n;
  if (p.prev) ch.V = p.prev; else { const hh = ids.length ? G.idx[ids[0]] : null; ch.V = hh && hh.echo ? hh.echo.name : ['古い友', '舊友']; }
  ch.vo = {}; ids.forEach(i => { const e = G.idx[i]; ch.vo[i] = e && e.alive !== undefined ? voiceOf(e) : 'plain'; });
  if (scene === 'supplement') ch.sup = over && over.sup;
  if (over) Object.assign(ch, over);
  ch.pk = computePicks(ch); G.chapters.push(ch); if (G.chapters.length > 400) G.chapters.splice(0, 40);
  if (ev) { ev.used = true; ev.ch = ch.id; }
  if (G.onChapter) G.onChapter(ch);
  return ch;
}
function rpick0(arr, seed) { return arr[(seed >>> 3) % arr.length]; }
function voiceOf(h) { if (h.age >= 50 || h.traits.indexOf('stubborn') >= 0) return 'elder'; if (h.age < 27 || h.traits.indexOf('brave') >= 0 || h.traits.indexOf('curious') >= 0) return 'young'; return 'plain'; }
function chronPrologue() { if (G.chapters.length) return; makeChapter('prologue', null, { fixedKey: 'prologue', a: [], an: {}, vol: 0, trust: 'infer' }); }

function chronForce(ev) {
  const sc = sceneFor(ev); if (!sc) { ev.used = true; return; }
  if (sc.startsWith('finale') || sc === 'revelation') {
    const killer = ev.actors[0] ? ev.actors : (G.parties.find(q => q.boss) || { members: [] }).members.slice(0, 1);
    ev.actors = killer.length ? killer : ev.actors;
    makeChapter(sc, ev, { fixedKey: sc, vol: 4, trust: 'witness' }); return;
  }
  makeChapter(sc, ev, ev.type === 'master_farewell' && ev.payload.fixed ? { fixedKey: 'master_farewell' } : undefined);
}

function chronTick() {
  if (G.tick % 6 !== 3) return;
  if (G.tick % TICK_DAY === 3) updateSpot();
  // eligible events
  let best = null, bs = 0;
  for (let i = G.events.length - 1; i >= 0; i--) {
    const ev = G.events[i]; if (ev.used) continue;
    const age = G.tick - ev.t;
    if (age > 3 * TICK_DAY) { ev.used = true; continue; }
    if (age < 6) continue;
    const sc = sceneFor(ev); if (!sc) { ev.used = true; continue; }
    if (FORCE_EV[ev.type]) { chronForce(ev); continue; }
    if (G.tick - ((G.lastScene || {})[sc] || -999) < 120) continue;
    const s = dramaScore(ev); if (s > bs) { bs = s; best = ev; }
  }
  const since = G.tick - (G.lastChapTick || 0);
  if (best && ((bs >= 0.46 && since >= 72) || (bs >= 0.28 && since >= 216) || (bs >= 0.72 && since >= 30))) {
    // mark near-duplicates used
    const sc = sceneFor(best);
    makeChapter(sc, best); G.lastChapTick = G.tick; G.lastScene = G.lastScene || {}; G.lastScene[sc] = G.tick;
    G.events.forEach(e => { if (!e.used && e.type === best.type && Math.abs(e.t - best.t) < 12) e.used = true; });
  }
}
function updateSpot() {
  const sc = {};
  for (const ev of G.events) { if (G.tick - ev.t > 2 * TICK_DAY) continue; const d = dramaScore(ev); ev.actors.forEach(i => { sc[i] = (sc[i] || 0) + d; }); }
  const arr = Object.keys(sc).map(k => [+k, sc[k]]).filter(a => { const h = G.idx[a[0]]; return h && h.alive; }).sort((a, b) => b[1] - a[1]);
  G.spot = arr.filter(a => G.track.indexOf(a[0]) < 0).slice(0, Math.max(0, 3 - G.track.length)).map(a => a[0]);
}
function chronTrackToggle(hid) { const i = G.track.indexOf(hid); if (i >= 0) { G.track.splice(i, 1); return true; } if (G.track.length >= 3) return false; G.track.push(hid); return true; }
function chronSupplement(hid) {
  const h = hById(hid); if (!h) return null;
  const hs = (k, n) => (strHash(k + h.id) % n);
  const sup = { d: hs('d', 6), f: hs('f', 6), s: hs('s', 6), l: hs('l', 6) };
  const ev = { id: G.nid++, t: G.tick, type: 'supplement', actors: [h.id], payload: {}, tags: [], tension: 0, emotion: 0, place: placeKey(h), pos: { x: h.x, y: h.y }, used: true, names: { [h.id]: h.name } };
  const ch = makeChapter('supplement', ev, { sup, supName: h.name }); ch.trust = 'infer';
  return ch;
}

/* ---------- rendering ---------- */
function computePicks(ch) {
  const rg = new RNG(ch.seed); const sc = SC[ch.scene]; const fx = FIXED[ch.fixedKey];
  const mood = fx ? fx.mood : sc ? sc.mood : 'calm';
  const idx = G.chapters.indexOf(ch); const before = (idx < 0 ? G.chapters : G.chapters.slice(0, idx));
  const same = before.filter(c => c.scene === ch.scene && c.pk).slice(-3), all = before.filter(c => c.pk && c.pk.hm === mood).slice(-4);
  const pick = (kind, n, pool) => { const used = new Set(pool.map(c => c.pk[kind])); let i = rg.int(0, n - 1), g = 0; while (used.has(i) && g++ < 8 && used.size < n) i = rg.int(0, n - 1); return i; };
  const pk = { hm: mood, hist: pick('hist', HIST_BANK[mood].length, all), tb: rg.int(0, 1), wx: rg.int(0, 1), sp0: rg.int(0, SPEECH_TAGS.length - 1), sp1: rg.int(0, SPEECH_TAGS.length - 1) };
  if (sc) { pk.intro = pick('intro', sc.intro.length, same); pk.a1 = pick('a1', sc.act.length, same); pk.a2 = (pk.a1 + 1 + rg.int(0, Math.max(0, sc.act.length - 2))) % sc.act.length; pk.inner = pick('inner', sc.inner.length, same); pk.close = pick('close', sc.close.length, same); }
  return pk;
}
function renderChapter(ch) {
  const L = li(); if (!ch.pk) ch.pk = computePicks(ch); const pk = ch.pk;
  const nameOf = i => (ch.an[i] || ['？', '？'])[L];
  const placeName = PLACES[ch.pl] ? PLACES[ch.pl][L] : PLACES.town[L];
  const A = ch.a[0] ? nameOf(ch.a[0]) : t('anon'), B = ch.a[1] ? nameOf(ch.a[1]) : A;
  const v = { A, B, C: ch.a[2] ? nameOf(ch.a[2]) : B, P: placeName, M: ch.M ? ch.M[L] : '', N: ch.N, V: ch.V ? ch.V[L] : '', D: '', F: '', S: '', L: '' };
  const f = p => fmt(p[L], v);
  const mk = (text, tag) => ({ text, tag });
  const tag = ch.trust === 'infer' ? 'infer' : ch.trust;
  let title, paras = [], mood;
  const fx = FIXED[ch.fixedKey];
  if (fx) {
    title = fx.t[L]; mood = fx.mood;
    fx.paras.forEach((pp, i) => paras.push(mk(pp.map(f).join(''), ch.fixedKey === 'prologue' ? 'infer' : tag)));
  } else {
    const sc = SC[ch.scene]; title = sc.t[L]; mood = sc.mood;
    if (ch.scene === 'supplement' && ch.sup) { v.D = DRAMA_POOL.desire[ch.sup.d][L]; v.F = DRAMA_POOL.fear[ch.sup.f][L]; v.S = DRAMA_POOL.secret[ch.sup.s][L]; v.L = DRAMA_POOL.lie[ch.sup.l][L]; }
    const tb = TIME_BEATS[ch.tod] || TIME_BEATS.day;
    const setting = f(tb[pk.tb % tb.length]) + f(WEATHER_BEATS[ch.sea][pk.wx % 2]);
    paras.push(mk(setting, tag));
    paras.push(mk(f(sc.intro[pk.intro]), tag));
    paras.push(mk(f(sc.act[pk.a1]) + (sc.act.length > 1 && pk.a2 !== pk.a1 ? f(sc.act[pk.a2]) : ''), tag));
    if (sc.talk && sc.talk.length && !NOTALK[ch.scene]) {
      let dl = ''; const ids = [ch.a[0], ch.a[1] || ch.a[0]];
      sc.talk.forEach((it, k) => {
        const spk = ids[k % 2], lis = ids[(k + 1) % 2]; const voice = (ch.vo && ch.vo[spk]) || 'plain';
        const line = INTENT[it][voice]; const vv = Object.assign({}, v, { B: nameOf(lis) });
        const tg = SPEECH_TAGS[k === 0 ? pk.sp0 : pk.sp1];
        dl += fmt(line[L], vv) + fmt(tg[L], { S: nameOf(spk) });
      });
      paras.push(mk(dl, tag));
    }
    paras.push(mk(f(sc.inner[pk.inner]), 'infer'));
    paras.push(mk(f(sc.close[pk.close]), tag));
  }
  const hb = HIST_BANK[mood || 'calm']; const hh = hb[pk.hist % hb.length];
  return { title, paras, hist: hh[L], mood };
}
const NOTALK = { oracle_dream: 1, omen: 1, trial: 1, miracle: 1, awakening: 1 };
function inkOf(ch) { const age = G.tick - ch.now; return age < TICK_DAY ? 'wet' : age < TICK_YEAR ? 'draft' : 'final'; }
function chronText(ch) { const r = renderChapter(ch); return `【${ch.no}】${r.title}\n` + r.paras.map(p => p.text).join('\n') + `\n${t('hist')}：${r.hist}`; }
function chronAll() { return G.chapters.map(chronText).join('\n\n'); }
S.anon = ['誰か', '某人']; S.hist = ['史官曰', '史官曰'];

/* ---- 10_api.js ---- */
/* ================= debug API / save serialization ================= */
const ERRS = [];
function serializeState() {
  const skip = { idx: 1, sidx: 1, qidx: 1, pidx: 1, fx: 1, fxOn: 1, rng: 1 };
  const o = {};
  for (const k in G) { if (skip[k] || typeof G[k] === 'function') continue; o[k] = G[k]; }
  o.rngS = G.rng.s; o.lang = LANG;
  return JSON.stringify(o);
}
function deserializeState(str) {
  const o = JSON.parse(str);
  if (!o || o.ver !== 1) throw new Error('version');
  const fxOn = G ? G.fxOn : false, cbs = {};
  if (G) for (const k in G) if (typeof G[k] === 'function') cbs[k] = G[k];
  G = Object.assign({}, o, cbs); G.rng = new RNG(1); G.rng.s = o.rngS; G.fx = []; G.fxOn = fxOn; delete G.rngS;
  rebuildIdx(); return G;
}
function phaseName() { return G.ending ? 'ended' : G.awakened ? 'awakened' : 'peace'; }
const RT = {
  state() {
    return { tick: G.tick, date: dateStr(G.tick, G.gen), year: yearOf(G.tick), pop: G.stats.alive || G.humans.filter(h => h.alive).length, faith: +G.faith.toFixed(1), balance: +G.balance.toFixed(1),
      boss: { awake: G.awakened, alive: G.boss.alive, hp: Math.round(G.boss.hp), maxHp: G.boss.maxHp }, phase: phaseName(), ending: G.ending ? G.ending.kind : null, townHp: +G.town.hp.toFixed(1), food: Math.round(G.town.food),
      adv: G.humans.filter(h => h.alive && isAdv(h)).length, monsters: G.monsters.filter(m => m.alive && !m.dormant).length, prayers: openPrayers().length, stats: G.stats };
  },
  setSpeed(n) { if (typeof Game !== 'undefined') Game.setSpeed(n); },
  step(n) { for (let i = 0; i < n && !G.ending; i++) tick(); return G.tick; },
  seed(n) { newGame({ seed: n, god: G.god, lang: LANG }); },
  newGame(o) { newGame(o); if (typeof Game !== 'undefined' && Game.afterNew) Game.afterNew(); return RT.state(); },
  policy(p) { G.policy = p; },
  log() { return G.log.slice(-40); },
  chronicle() { return typeof chronAll === 'function' ? chronAll() : ''; },
  errors() { return ERRS.slice(); },
  cast(pid, tid, dir) { return castPower(pid, tid, dir); },
  G() { return G; },
};
if (typeof window !== 'undefined') {
  window.__RT = RT;
  window.addEventListener('error', e => { ERRS.push(String(e.message) + ' @' + (e.lineno || '')); });
  window.addEventListener('unhandledrejection', e => { ERRS.push('rej:' + String(e.reason)); });
}
if (typeof globalThis !== 'undefined') globalThis.__RT = RT;
