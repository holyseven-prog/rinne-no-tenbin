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
