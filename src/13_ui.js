/* ================= UI core: strings, DOM helpers, HUD ================= */
function h(tag, a, ...kids) {
  const e = document.createElement(tag);
  if (a) for (const k in a) {
    const v = a[k];
    if (k === 'class') e.className = v; else if (k === 'style') { if (typeof v === 'string') e.style.cssText = v; else Object.assign(e.style, v); }
    else if (k === 'html') e.innerHTML = v; else if (k.slice(0, 2) === 'on') e.addEventListener(k.slice(2), v);
    else if (v !== false && v != null) e.setAttribute(k, v);
  }
  const add = c => { if (c == null || c === false) return; if (Array.isArray(c)) { c.forEach(add); return; } e.appendChild(typeof c === 'object' ? c : document.createTextNode(String(c))); };
  kids.forEach(add); return e;
}
const $ = id => document.getElementById(id);
Object.assign(S, {
  title: ['輪廻の天秤', '輪迴之天秤'], title_sub: ['RINNE NO TENBIN', 'SCALE OF REINCARNATION'],
  new_game: ['はじめから', '新遊戲'], continue: ['つづきから', '繼續遊戲'], settings: ['設定', '設定'], language: ['言語：日本語', '語言：繁體中文'],
  press_start: ['クリック または キーを押してください', '請點擊或按下任意鍵'], no_save: ['セーブデータがありません', '沒有存檔'],
  god_select: ['神格を選んでください', '請選擇神格'], god_ok: ['この神にする', '就決定是這位神'], faith0: ['初期信仰力', '初始信仰力'], back: ['戻る', '返回'],
  skip: ['スキップ', '跳過'], next: ['次へ ▶', '下一頁 ▶'], opening_hint: ['クリック／Space で次へ　Esc でスキップ', '點擊／Space 繼續　Esc 跳過'],
  faith: ['信仰力', '信仰力'], eye: ['神眼', '神眼'], counsel: ['顧問', '顧問'], chronicle: ['史官の書庫', '史官書庫'], prayers: ['祈り', '祈禱'], favored: ['眷顧者', '眷顧者'],
  no_prayers: ['（いまは祈りがありません）', '（目前沒有祈禱）'], no_fav: ['（★で眷顧者を指定）', '（以★指定眷顧者）'], minimap: ['地図', '地圖'],
  light: ['光', '光'], dark: ['闇', '暗'], pause: ['一時停止', '暫停'], speed: ['速度', '速度'], menu: ['メニュー', '選單'],
  cost: ['消費', '消耗'], faith_short: ['信仰力が足りません', '信仰力不足'], pick_target: ['{p}：対象を選んでください（Esc／右クリックで解除）', '{p}：請選擇對象（Esc／右鍵取消）'],
  fatigue: ['干渉疲労', '干涉疲勞'], succ: ['成功率', '成功率'], key_hint: ['H 書庫　R 住人　S 魂の河　G 顧問　N 注目　Space 停止　Q/E 速度　M 消音　Esc メニュー', 'H 書庫　R 居民　S 靈魂之河　G 顧問　N 關注　Space 暫停　Q/E 速度　M 靜音　Esc 選單'],
  out_crit: ['大成功！', '大成功！'], out_success: ['成功', '成功'], out_twist: ['曲解…', '曲解…'], out_fail: ['失敗', '失敗'],
  side_lostgold: ['お告げは取り違えられ、金貨が失われた。', '神諭被誤解，金幣遺失了。'], side_hubris: ['恩寵は慢心を生み、無謀な気を起こさせた。', '恩寵招來傲慢，讓對方衝動起來。'], side_famine: ['試煉は飢饉となって町を襲った。', '試煉化為飢荒襲向小鎮。'],
  side_levelup: ['試練を越え、一段と強くなった。', '跨越試煉，變得更強了。'], side_reverse: ['力は思わぬ向きに傾いた。', '力量傾向了出乎意料的方向。'], side_random: ['因果が思わぬ方へ揺らいだ。', '因果朝意想不到的方向搖擺。'],

  bias_brave: ['勇気を持つようになった', '變得有勇氣了'], bias_careful: ['慎重になった', '變得謹慎了'], bias_kind: ['仁愛の心が芽生えた', '萌生了仁愛之心'],
  dir_brave: ['勇気を与える', '賜予勇氣'], dir_careful: ['慎重を促す', '勸其謹慎'], dir_kind: ['仁愛を説く', '宣說仁愛'],
  dir_good: ['善業を育てる', '培育善業'], dir_evil: ['悪業を促す', '助長惡業'], dir_deed: ['功業を積ませる', '累積功業'], dir_attach: ['執念を深める', '加深執念'],
  force_light: ['光に傾ける', '傾向光'], force_dark: ['闇に傾ける', '傾向暗'], choose: ['どうする？', '要怎麼做？'],
  res_age: ['{n}歳', '{n}歲'], res_lv: ['Lv{n}', 'Lv{n}'], res_hp: ['HP', 'HP'], gold: ['所持金', '持有金'], motive: ['なぜ：', '為何：'], karma: ['因果', '因果'],
  k_good: ['善', '善'], k_evil: ['悪', '惡'], k_deed: ['功', '功'], k_attach: ['執', '執'],
  n_hunger: ['飢餓', '飢餓'], n_energy: ['疲労', '疲勞'], n_safety: ['安全', '安全'], n_wealth: ['財富', '財富'], n_belong: ['所属', '歸屬'], n_honor: ['名誉', '名譽'], n_faith: ['信仰', '信仰'],
  fav_on: ['★眷顧する', '★眷顧'], fav_off: ['★解除', '★解除'], track_on: ['追う', '追蹤'], track_off: ['追跡中', '追蹤中'], supp: ['補傳', '補傳'], eye_use: ['神眼', '神眼'], close: ['閉じる', '關閉'],
  act_sleep: ['睡眠', '睡眠'], act_eat: ['食事', '用餐'], act_work: ['仕事', '工作'], act_pray: ['祈り', '祈禱'], act_social: ['社交', '社交'], act_rest: ['休息', '休息'], act_quest: ['依頼', '委託'], act_hunt: ['討伐', '討伐'],
  act_train: ['鍛錬', '鍛鍊'], act_learn: ['学び', '學習'], act_shopP: ['薬の購入', '買藥'], act_shopG: ['装備の購入', '買裝備'], act_hide: ['避難', '避難'], act_muster: ['防衛集結', '防衛集結'], act_idle: ['待機', '待機'], act_hide_home: ['避難', '避難'],
  st_idle: ['待機', '待機'], st_fight: ['戦闘中', '戰鬥中'], st_dead: ['死亡', '死亡'], st_river: ['川で待機', '河中等待'], st_alive: ['生存', '生存'],
  tut_title: ['はじめての導き', '初次引導'], tut1: ['祈りを一つ叶える', '實現一個祈禱'], tut2: ['神託を一度使う', '使用一次神諭'], tut3: ['史官の書庫を開く（H）', '開啟史官書庫（H）'], tut4: ['顧問に聞く（G）', '詢問顧問（G）'],
  tut_g1: ['まず、右の「祈り」カードをクリックして対象を選び、下の神力ボタン（1〜5）で応えてみましょう。', '先點擊右側的「祈禱」卡片選定對象，再用下方神力按鈕（1～5）回應吧。'],
  tut_g2: ['神託（1）は安価で、住人の行動傾向を変えられます。住人を直接クリックして使ってみましょう。', '神諭（1）費用低廉，能改變居民的行動傾向。試著直接點擊居民使用吧。'],
  tut_g3: ['H キーで史官の書庫を開くと、世界の出来事が物語として綴られています。', '按 H 開啟史官書庫，世界發生的事會被寫成故事。'],
  tut_g4: ['G キーで顧問ミルラに相談できます。成功確率とリスクだけを教えてくれます。', '按 G 可向顧問米菈諮詢。她只會告訴你成功機率與風險。'],
  tut_done: ['基本はこれで十分です。あとは、見守るも導くも、あなた次第。', '基本操作就是這些。接下來要守望還是引導，由你決定。'],
  new_chapter: ['史官が新しい章を綴った', '史官寫下了新的一章'], storage_warn: ['保存領域を使えません。メモリ内で続行します。', '無法使用儲存空間，將以記憶體繼續進行。'],
  saved: ['セーブしました', '已存檔'], loaded: ['ロードしました', '已讀取'], no_slot: ['空きスロット', '空欄位'], slot: ['スロット{n}', '欄位{n}'], autosave: ['オートセーブ', '自動存檔'],
  save: ['セーブ', '存檔'], load: ['ロード', '讀取'], resume: ['再開', '繼續'], to_title: ['タイトルへ', '回到標題'], help: ['操作説明', '操作說明'],
  volume_bgm: ['BGM音量', 'BGM音量'], volume_se: ['SE音量', 'SE音量'], def_speed: ['既定速度', '預設速度'], text_speed: ['テキスト速度', '文字速度'], mute: ['ミュート', '靜音'], on: ['ON', 'ON'], off: ['OFF', 'OFF'],
  confirm_title: ['タイトルへ戻りますか？（未セーブの進行は失われます）', '要回到標題嗎？（未存檔的進度會遺失）'], yes: ['はい', '是'], no: ['いいえ', '否'],
  resident_list: ['住人一覧', '居民一覽'], soul_river: ['転生の川', '轉生之河'], col_name: ['名前', '名字'], col_job: ['職', '職業'], col_lv: ['Lv', 'Lv'], col_age: ['年齢', '年齡'], col_hp: ['HP', 'HP'], col_state: ['状態', '狀態'], col_karma: ['因果', '因果'], col_wait: ['待機', '等待'],
  f_all: ['全員', '全部'], f_adv: ['冒険者', '冒險者'], f_other: ['その他', '其他'], f_child: ['子ども', '孩童'],
  soul_intervene: ['介入', '介入'], soul_prev: ['前世', '前世'], soul_years: ['{n}年', '{n}年'], soul_none: ['川に魂はいません', '河中沒有靈魂'], soul_alive: ['（現世）', '（現世）'],
  g_title: ['顧問ミルラ', '顧問米菈'], g_greet: ['成功確率とリスクをお伝えします。決めるのは、あなたです。', '我只會告訴你成功機率與風險。決定的是你。'],
  g_goal: ['目標', '目標'], goal_boss: ['魔王を討たせたい', '想討伐魔王'], goal_nurture: ['誰かを育てたい', '想培育某人'], goal_avoid: ['悲劇を避けたい', '想避免悲劇'], goal_drama: ['物語を劇的にしたい', '想讓故事更戲劇化'],
  g_status: ['現状', '現狀'], g_risk: ['リスク', '風險'], g_actions: ['できること', '可做的事'], g_exec: ['実行', '執行'],
  bal_even: ['つりあい', '平衡'], bal_lead: ['が優勢', '佔優勢'],
  st_balance: ['天秤：{n}', '天秤：{n}'], st_faith: ['信仰力：{n}', '信仰力：{n}'], st_pop: ['人口 {n}／冒険者 {a}（平均Lv{l}）', '人口 {n}／冒險者 {a}（平均Lv{l}）'], st_boss_pre: ['魔王の覚醒まで：およそ{n}年', '距離魔王覺醒：約{n}年'], st_boss_post: ['魔王は覚醒済み。幹部は残り{n}体。', '魔王已覺醒。幹部尚存{n}名。'], st_town: ['町の無事度：{n}％', '小鎮安全度：{n}%'], st_ratio: ['討伐隊の勝算指数：{n}', '討伐隊勝算指數：{n}'],
  rk_dark: ['闇に傾いています。魔物が増え、魔王の覚醒が早まります。', '天秤傾向暗側。魔物增加，魔王覺醒將提早。'], rk_light: ['光に傾きすぎです。停滞して物語が動かなくなる恐れがあります。', '天秤過於偏光。恐怕陷入停滯，故事不再前進。'], rk_faith: ['信仰力が心許ありません。祈りを放置すると、さらに減ります。', '信仰力所剩不多。放著祈禱不管只會更少。'],
  rk_town: ['町が危機です。防衛に失敗すれば、世界は滅びます。', '小鎮岌岌可危。防衛失敗的話，世界將毀滅。'], rk_adv: ['冒険者が少なすぎます。', '冒險者太少了。'], rk_ok: ['いまのところ、大きな危険はありません。', '目前沒有重大危險。'], rk_food: ['食料が尽きかけています。', '糧食快要耗盡了。'],
  c_force_light: ['勢力操作：光へ（天秤を光側へ。魔物を退け、戦士を癒す）', '勢力操作：偏向光（天秤移向光側，退敵並治癒戰士）'], c_force_dark: ['勢力操作：闇へ（魔物を増やし、物語を動かす。危険）', '勢力操作：偏向暗（增加魔物，推動故事。危險）'],
  c_grace_hero: ['恩寵：{who}に（回復と加護）', '恩寵：賜予{who}（回復與加護）'], c_grace_heal: ['恩寵：{who}を癒す', '恩寵：治癒{who}'], c_oracle_brave: ['神託：{who}に勇気を', '神諭：賜予{who}勇氣'],
  c_trial: ['試煉：{who}に（成長か、悲劇か）', '試煉：降於{who}（成長或悲劇）'], c_answer: ['{who}の祈り（{pk}）に応える', '回應{who}的祈禱（{pk}）'], c_oracle_love: ['神託：{who}の恋を後押しする', '神諭：推{who}的戀情一把'],
  risk_death: ['死の危険あり', '有死亡風險'],
  h_title: ['史官ソウジュの書庫', '史官蒼壽的書庫'], h_none: ['まだ章がありません', '尚無章節'], h_prev: ['◀ 前の章', '◀ 上一章'], h_next: ['次の章 ▶', '下一章 ▶'], h_track: ['この人物を追う', '追蹤此人'], h_untrack: ['追跡をやめる', '取消追蹤'], h_supp: ['補傳を求める', '請求補傳'],
  h_spot: ['立傳（主役）', '立傳（主角）'], h_tracked: ['追跡中', '追蹤中'], h_foresh: ['伏線', '伏筆'], h_ch: ['第{n}章', '第{n}章'], ink_wet: ['墨未乾', '墨未乾'], ink_draft: ['手稿', '手稿'], ink_final: ['定稿', '定稿'],
  tr_witness: ['目撃', '目擊'], tr_hearsay: ['転述', '轉述'], tr_infer: ['推想', '推想'], h_notes: ['書庫の手引き', '書庫指南'],
  f_awaken: ['魔王の席が、少しずつ温まっている……。', '魔王之席，正慢慢變暖……。'], f_cad: ['三体の幹部が、東の野で目を覚ましつつある。', '三名幹部正在東邊原野逐漸甦醒。'], f_love: ['{a}と{b}の想いは、まだ言葉になっていない。', '{a}與{b}的心意，尚未化為言語。'], f_preg: ['{a}の家に、もうすぐ新しい命が。', '{a}家中，不久將迎來新生命。'], f_old: ['{a}の寿命は、そう長くない。', '{a}的壽命，所剩不多。'], f_fight: ['討伐隊が魔王城へ向かっている。', '討伐隊正前往魔王城。'], f_echo: ['{a}の中に、前世の影が眠っている。', '{a}的體內，沉睡著前世的殘影。'],
  r_title: ['物語の終わり', '故事的終結'], end_victory: ['魔王討伐', '魔王討伐'], end_doom: ['滅世', '滅世'], end_godleft: ['神の退場', '神的退場'], end_stagnant: ['停滞の終幕', '停滯的終幕'],
  r_stats: ['経過 {y}年／ 死者 {d}／ 誕生 {b}／ 依頼 {q}／ 叶えた祈り {a}', '歷時 {y}年／ 死者 {d}／ 誕生 {b}／ 委託 {q}／ 應許祈禱 {a}'],
  r_book: ['史書を見る', '閱讀史書'], r_next: ['第{n}世を始める', '開始第{n}世'], book_title: ['史書「第{n}世」', '史書「第{n}世」'], copy: ['クリップボードにコピー', '複製到剪貼簿'], copied: ['コピーしました', '已複製'], download: ['テキストで保存', '存成文字檔'], copy_fail: ['コピーできませんでした。下のテキストを選択してください。', '無法複製，請直接選取下方文字。'],
  awaken_msg: ['魔王ノクタールが、目を覚ました。', '魔王諾克塔爾，醒來了。'], cut_awaken: ['黒冠の王が、目覚める——', '黑冠之王，甦醒了——'],
  more: ['…', '…'],
});
const EVL = {
  death: ['{A}が息を引き取った', '{A}離世了'], birth: ['{B}が生まれた', '{B}誕生了'], party_formed: ['{A}たちが依頼に出発した', '{A}等人出發執行委託'], quest_clear: ['{A}たちが依頼を達成した', '{A}等人完成了委託'],
  quest_fail: ['依頼は失敗に終わった', '委託以失敗收場'], love_start: ['{A}と{B}が惹かれ合っている', '{A}與{B}互相吸引'], marriage: ['{A}と{B}が結ばれた', '{A}與{B}結為連理'], quarrel: ['{A}と{B}が口論した', '{A}與{B}吵了起來'], reconcile: ['{A}と{B}が仲直りした', '{A}與{B}和好了'],
  betrayal: ['{A}が{B}の財布を盗んだ', '{A}偷了{B}的錢包'], promotion: ['{A}が成長した（Lv{L}）', '{A}成長了（Lv{L}）'], monster_raid: ['魔物の群れが町に迫る！', '魔物群正逼近小鎮！'], boss_awaken: ['魔王ノクタールが覚醒した！', '魔王諾克塔爾覺醒了！'],
  cadre_slain: ['幹部が討たれた！', '幹部被討伐了！'], boss_slain: ['魔王が倒れた——', '魔王倒下了——'], boss_expedition: ['討伐隊が魔王城へ向かう', '討伐隊前往魔王城'], reincarnation: ['{A}が転生した', '{A}轉生了'], destined_reunion: ['{A}と{B}が宿命の再会を果たした', '{A}與{B}完成了宿命的重逢'],
  soul_echo: ['{A}に前世の記憶が目覚めた', '{A}喚醒了前世的記憶'], siege: ['町が危機に瀕している！', '小鎮危在旦夕！'], boss_sortie: ['魔王が自ら進軍を始めた！', '魔王親自開始進軍了！'], first_battle: ['{A}の初陣', '{A}的初陣'], mentor_parting: ['{B}が師の元を巣立つ', '{B}離開師父身邊獨立了'],
  divine_act: null, miracle: ['奇跡が起きた', '奇蹟發生了'], coming_of_age: ['{A}が成人した', '{A}成年了'],
};
function evLine(ev) {
  const p = EVL[ev.type]; if (!p) return null;
  const nm = i => { const e = G.idx[i]; const n = (ev.names && ev.names[i]) || (e && e.name); return n ? n[li()] : '?'; };
  return fmt(p[li()], { A: ev.actors[0] ? nm(ev.actors[0]) : '', B: ev.actors[1] ? nm(ev.actors[1]) : ev.actors[0] ? nm(ev.actors[0]) : '', L: ev.payload.lvl || '' });
}

const SPEEDS = [1, 4, 16, 64], TPS1 = 2.4;
const Store = {
  mem: {}, get(k) { try { const v = localStorage.getItem(k); return v === null ? (this.mem[k] || null) : v; } catch (e) { return this.mem[k] || null; } },
  set(k, v) { try { localStorage.setItem(k, v); delete this.mem[k]; return true; } catch (e) { this.mem[k] = v; if (!this.warned) { this.warned = 1; if (typeof UI !== 'undefined' && UI.toast) UI.toast(t('storage_warn'), '#ffb060'); } return false; } },
};
const Game = {
  scene: 'boot', speedIdx: 1, paused: false, modals: [], power: null, acc: 0, settings: { bgm: 0.6, se: 0.7, speed: 0, text: 2, lang: 'ja', names: 'key', theme: 'black', autoSlow: true, advisor: true, tutDone: false }, selId: 0, follow: 0, hover: null, mouse: { x: 640, y: 360 }, keys: {},
  setSpeed(n) { const i = SPEEDS.indexOf(n); if (i >= 0) { this.speedIdx = i; this.paused = false; UI.refresh(true); } },
  get timeStopped() { return this.paused || this.modals.length > 0 || this.scene !== 'play' || !!(this.tut && this.tut.on && this.tut.freeze); },
};

/* ---------- UI object ---------- */
const UI = {
  el: {}, toasts: [], lastSig: '', lastPray: '', lastFav: '', resRefs: null, bannerT: 0,
  build() {
    const root = $('ui'); root.innerHTML = ''; this.el = {}; const E = this.el;
    // --- top bar
    E.faithWin = h('div', { class: 'win', style: 'left:8px;top:6px;width:420px;height:52px;padding:4px 10px' },
      h('div', { style: 'display:flex;align-items:center;gap:8px' }, h('span', { class: 'gold', style: 'font-weight:bold;width:60px' }, t('faith')), h('div', { class: 'gauge', style: 'flex:1' }, E.faithBar = h('i')), E.faithNum = h('span', { style: 'width:70px;text-align:right' })),
      h('div', { style: 'display:flex;justify-content:space-between;margin-top:1px', class: 'sm' }, E.eyeTxt = h('span'), E.fatTxt = h('span')));
    E.balWin = h('div', { class: 'win', style: 'left:440px;top:6px;width:400px;height:52px;padding:2px 10px;display:flex;align-items:center;gap:8px;justify-content:center' },
      h('span', { class: 'gold' }, t('light')), E.balCv = h('canvas', { width: 220, height: 54 }), h('span', { style: 'color:#d0a0ff' }, t('dark')), E.balNum = h('span', { style: 'width:96px;text-align:right;font-size:13px' }));
    E.timeWin = h('div', { class: 'win', style: 'left:850px;top:6px;width:422px;height:52px;padding:2px 10px' },
      E.dateTxt = h('div', { style: 'font-size:15px;line-height:20px;white-space:nowrap' }),
      h('div', { style: 'display:flex;gap:4px;align-items:center' },
        E.spBtns = ['⏸', '×1', '×4', '×16', '×64'].map((s, i) => h('span', { class: 'btn', style: 'padding:0 7px;font-size:13px', onclick: () => { Snd.se('ok'); if (i === 0) Game.paused = !Game.paused; else { Game.speedIdx = i - 1; Game.paused = false; } UI.refresh(true); } }, s)),
        h('span', { style: 'flex:1' }), E.weatherTxt = h('span', { class: 'sm' }),
        E.namesBtn = h('span', { class: 'btn', style: 'padding:0 7px;font-size:13px', onclick: () => Game.cycleNames() }, t('names_btn')),
        h('span', { class: 'btn', style: 'padding:0 7px;font-size:13px', onclick: () => Screens.help() }, '?'),
        h('span', { class: 'btn', style: 'padding:0 7px;font-size:13px', onclick: () => Screens.pause() }, '☰')));
    // --- left: minimap + tutorial
    E.miniWin = h('div', { class: 'win', style: 'left:8px;top:64px;width:214px;height:146px;padding:3px' }, E.miniCv = h('canvas', { width: 192, height: 120, style: 'display:block;margin:4px auto 0;cursor:pointer' }));
    E.miniCv.addEventListener('mousedown', ev => { const r = E.miniCv.getBoundingClientRect(); const sc = Scale.s; const x = (ev.clientX - r.left) / sc / 3, y = (ev.clientY - r.top) / sc / 3; Render.centerOn(x, y); Game.follow = 0; });
    E.miniWin.appendChild(h('div', { class: 'sm', style: 'position:absolute;left:8px;top:-2px;display:none' }, t('minimap')));
    E.goalWin = UI.buildGoal();
    E.selWin = h('div', { class: 'win glass', style: 'left:8px;top:350px;width:300px;display:none;padding:5px 8px' });
    // --- right: prayers & favored
    E.prayWin = h('div', { class: 'win glass', style: 'left:1018px;top:64px;width:254px;padding:4px 8px' }, h('h3', null, t('prayers')), E.prayList = h('div'));
    E.favWin = h('div', { class: 'win glass', style: 'left:1018px;top:568px;width:254px;height:64px;overflow:hidden;padding:2px 8px' }, h('h3', { style: 'margin:0 0 2px;font-size:13px' }, t('favored')), E.favList = h('div'));
    E.feedWin = UI.buildFeed();
    // --- log
    E.bossWin = h('div', { class: 'win', style: 'left:440px;top:62px;width:400px;display:none;padding:2px 10px;border-color:#d8a0ff' }, h('div', { style: 'display:flex;align-items:center;gap:8px' }, E.bossName = h('b', { style: 'color:#e0b0ff;font-size:14px;white-space:nowrap' }), h('div', { class: 'gauge', style: 'flex:1;height:12px;border-color:#d8a0ff' }, E.bossBar = h('i', { style: 'background:linear-gradient(#e0a0ff,#8a30d0)' })), E.bossNum = h('span', { class: 'sm', style: 'width:44px;text-align:right' })));
    // --- bottom
    E.powWin = h('div', { class: 'win', style: 'left:232px;top:636px;width:776px;height:78px;padding:4px 6px;display:flex;gap:6px' });
    E.powBtns = POWERS.map((p, i) => {
      const b = h('div', { class: 'btn', style: 'width:146px;height:64px;padding:2px 6px;line-height:1.3;white-space:normal;text-align:left', onclick: () => selectPower(i), onmouseenter: () => { Game.hover = i; UI.refresh(true); }, onmouseleave: () => { Game.hover = null; UI.refresh(true); } },
        h('div', { style: 'display:flex;align-items:center;gap:4px' }, Ico(['oracle', 'grace', 'trial', 'soul', 'force'][i], 16), h('span', { class: 'kbd' }, String(i + 1)), h('b', null, p.n[li()])), h('div', { class: 'sm' }, '', ...[]));
      b._cost = h('div', { class: 'sm' }); b.appendChild(b._cost); return b;
    });
    E.powBtns.forEach(b => E.powWin.appendChild(b));
    E.infoWin = h('div', { class: 'win glass', style: 'left:8px;top:636px;width:216px;height:78px;padding:3px 6px;font-size:12px;line-height:1.35' });
    E.utilWin = h('div', { class: 'win', style: 'left:1018px;top:636px;width:254px;height:78px;padding:4px 6px;display:flex;gap:5px;align-items:stretch' },
      E.eyeBtn = h('div', { class: 'btn', style: 'flex:1;text-align:center;white-space:normal;padding:2px', onclick: () => { Game.power = Game.power === 'eye' ? null : 'eye'; UI.refresh(true); } }, h('div', null, h('span', { class: 'kbd' }, 'X'), t('eye'))),
      E.counselBtn = h('div', { class: 'btn', style: 'flex:1;text-align:center;white-space:normal;padding:2px', onclick: () => Screens.counsel() }, h('div', null, h('span', { class: 'kbd' }, 'G'), t('counsel'))),
      E.chronBtn = h('div', { class: 'btn', style: 'flex:1.3;text-align:center;white-space:normal;padding:2px', onclick: () => Screens.chronicle() }, h('div', null, h('span', { class: 'kbd' }, 'H'), t('chronicle'))));
    E.banner = h('div', { class: 'win', style: 'left:330px;top:120px;width:620px;text-align:center;display:none;padding:10px 14px;font-size:20px;z-index:20' });
    E.targetBar = h('div', { class: 'win', style: 'left:340px;top:612px;width:600px;text-align:center;display:none;padding:2px 8px;font-size:14px;border-color:#ffe9a0' });
    [E.faithWin, E.balWin, E.timeWin, E.bossWin, E.miniWin, E.goalWin, E.selWin, E.prayWin, E.feedWin, E.favWin, E.powWin, E.infoWin, E.utilWin, E.banner, E.targetBar].forEach(x => root.appendChild(x));
    this.lastPray = ''; this.lastFav = ''; this.resRefs = null; this.tutSig = '';
    this.attachTips(); this.renderFeed();
    this.refresh(true);
  },
  show(v) { const root = $('ui'); root.style.display = v ? 'block' : 'none'; },
  attachTips() {
    const E = this.el;
    Tip.attach(E.faithWin, () => [t('tip_faith'), t('tip_faith_d')]); Tip.attach(E.balWin, () => [t('tip_bal'), t('tip_bal_d')]); Tip.attach(E.dateTxt, () => [t('tip_date'), t('tip_date_d')]);
    E.spBtns.forEach(b => Tip.attach(b, () => [t('tip_speed'), t('tip_speed_d')])); Tip.attach(E.namesBtn, () => [t('tip_names'), t('tip_names_d'), '›' + t('names_' + (Game.settings.names || 'key'))]);
    Tip.attach(E.miniWin, () => [t('tip_mini'), t('tip_mini_d')]); Tip.attach(E.favWin, () => [t('tip_fav'), t('tip_fav_d')]);
    Tip.attach(E.eyeBtn, () => [t('tip_eye'), t('tip_eye_d')]); Tip.attach(E.counselBtn, () => [t('tip_counsel'), t('tip_counsel_d')]); Tip.attach(E.chronBtn, () => [t('tip_chron'), t('tip_chron_d')]);
    E.powBtns.forEach((b, i) => { const p = POWERS[i]; Tip.attach(b, () => { const hh = Game.selId ? hById(Game.selId) : null; const L = [p.n[li()] + '　' + t('tip_cost') + ' ' + powerCost(p.id), t('tipp_' + p.id), '›' + t('tip_good') + '：' + t('tipg_' + p.id), '›' + t('tip_risk') + '：' + t('tipr_' + p.id)]; L.push(hh && hh.alive && p.id !== 'force' ? t('tip_succ') + ' ' + Math.round(successProb(p.id, hh) * 100) + '%（' + hh.name[li()] + '）' : t('tip_pick')); return L; }); });
  },
  toast(text, col) {
    const E = this.el; if (!E.log) return;
    const d = h('div', { class: 'toast', style: { color: col || '#fff', top: '0px' } }, text);
    E.log.appendChild(d); this.toasts.push({ d, t: performance.now() });
    while (this.toasts.length > 4) { const o = this.toasts.shift(); o.d.remove(); }
    this.layoutToasts();
  },
  layoutToasts() { this.toasts.forEach((o, i) => { o.d.style.top = (this.toasts.length - 1 - i) * -0 + i * 19 + 'px'; }); },
  tickToasts(now) { for (let i = this.toasts.length - 1; i >= 0; i--) { const o = this.toasts[i]; const age = now - o.t; if (age > 5200) { o.d.remove(); this.toasts.splice(i, 1); this.layoutToasts(); } else if (age > 4400) o.d.style.opacity = 0; } },
  banner(title, sub, cls) {
    const b = this.el.banner; if (!b) return; b.innerHTML = ''; b.style.display = 'block'; b.style.borderColor = cls === 'crit' ? '#ffe060' : cls === 'fail' ? '#a0a0c0' : cls === 'twist' ? '#d090ff' : '#fff';
    b.appendChild(h('div', { style: { fontSize: '26px', fontWeight: 'bold', color: cls === 'crit' ? '#ffe060' : cls === 'fail' ? '#a8a8c8' : cls === 'twist' ? '#d8a0ff' : '#fff' } }, title)); if (sub) (Array.isArray(sub) ? sub : [sub]).forEach((l, i) => b.appendChild(h('div', { style: 'font-size:15px;margin-top:3px;line-height:1.4;' + (i === 0 ? 'color:#fff' : ''), class: 'sm' }, l)));
    this.bannerT = performance.now() + (Game.tut && Game.tut.on ? 60000 : 5200);
  },
  refresh(force) {
    if (!G || !this.el.faithWin) return;
    const E = this.el, now = performance.now();
    if (E.faithBar) { E.faithBar.style.width = (G.faith / G.faithMax * 100).toFixed(1) + '%'; UI.pxSet(E.faithNum, Math.floor(G.faith) + '/' + G.faithMax, '#ffe9a0', 3); }
    E.eyeTxt.textContent = t('eye') + ' ' + '◉'.repeat(G.eye) + '○'.repeat(3 - G.eye);
    const fs = POWERS.map(p => fatigueStage(p.id)); const fm = Math.max(...fs); E.fatTxt.textContent = fm > 0 ? t('fatigue') + ' ' + '▼'.repeat(fm) : '';
    E.dateTxt.textContent = dateStr(G.tick, G.gen);
    E.weatherTxt.textContent = (G.awakened ? '☠ ' : '') + (Game.paused ? t('pause') : (Game.modals.length ? '' : 'x' + SPEEDS[Game.speedIdx]));
    E.spBtns.forEach((b, i) => { b.classList.toggle('on', i === 0 ? Game.paused : (!Game.paused && Game.speedIdx === i - 1)); });
    { const b = G.boss, show = G.awakened && b.alive && (G.bossFight || G.sortie); E.bossWin.style.display = show ? 'block' : 'none'; if (show) { E.bossName.textContent = BOSS.n[li()]; E.bossBar.style.width = (b.hp / b.maxHp * 100).toFixed(1) + '%'; E.bossNum.textContent = Math.ceil(b.hp / b.maxHp * 100) + '%'; } }
    this.drawBalance();
    { const b = Math.round(G.balance); E.balNum.textContent = b === 0 ? t('bal_even') : (b > 0 ? t('light') : t('dark')) + t('bal_lead') + ' ' + Math.abs(b); E.balNum.style.color = b >= 0 ? '#ffd860' : '#d0a0ff'; }
    // power buttons
    POWERS.forEach((p, i) => { const b = E.powBtns[i]; const c = powerCost(p.id); const ok = G.faith >= c; b._cost.textContent = t('cost') + ' ' + c + (fs[i] ? ' ▼' + fs[i] : ''); b.classList.toggle('dis', !ok); b.classList.toggle('on', Game.power === p.id); b.firstChild.lastChild.textContent = p.n[li()]; });
    E.eyeBtn.classList.toggle('on', Game.power === 'eye'); E.eyeBtn.classList.toggle('dis', G.eye < 1);
    E.targetBar.style.display = Game.power ? 'block' : 'none';
    if (Game.power) E.targetBar.textContent = fmt(t('pick_target'), { p: Game.power === 'eye' ? t('eye') : POWER_BY_ID[Game.power].n[li()] });
    // info
    let info = '';
    if (Game.hover !== null) { const p = POWERS[Game.hover]; info = p.d[li()]; const tid = Game.selId; const hh = tid ? hById(tid) : null; if (hh && hh.alive && p.id !== 'force') info += '\n' + t('succ') + ' ' + Math.round(successProb(p.id, hh) * 100) + '%'; }
    else info = t('key_hint');
    E.infoWin.textContent = ''; info.split('\n').forEach((l, i) => E.infoWin.appendChild(h('div', i ? { class: 'gold' } : { class: 'dim' }, l)));
    if (this.bannerT && typeof Screens !== 'undefined' && Screens.stack && Screens.stack.length && E.banner.style.display !== 'none') { E.banner.style.display = 'none'; this.bannerT = 0; }
    if (this.bannerT && now > this.bannerT) { E.banner.style.display = 'none'; this.bannerT = 0; }
    this.refreshPrayers(); this.refreshFav(); this.refreshGoal(); this.refreshRes();
  },
  drawBalance() {
    const cv = this.el.balCv, c = cv.getContext('2d'); c.clearRect(0, 0, 220, 54);
    const ang = -G.balance / 100 * 0.25; const cx = 110, cy = 18, L = 72;
    c.strokeStyle = '#fff'; c.lineWidth = 3; c.beginPath(); c.moveTo(cx, 52); c.lineTo(cx, cy); c.stroke(); c.fillStyle = '#fff'; c.fillRect(cx - 14, 50, 28, 4);
    const lx = cx - Math.cos(ang) * L, ly = cy - Math.sin(ang) * L; const rx = cx + Math.cos(ang) * L, ry = cy + Math.sin(ang) * L;
    c.lineWidth = 3; c.beginPath(); c.moveTo(lx, ly); c.lineTo(rx, ry); c.stroke();
    const pan = (x, y, col) => { c.lineWidth = 1; c.strokeStyle = '#ddd'; c.beginPath(); c.moveTo(x, y); c.lineTo(x - 14, y + 14); c.moveTo(x, y); c.lineTo(x + 14, y + 14); c.stroke(); c.fillStyle = col; c.beginPath(); c.ellipse(x, y + 16, 16, 4, 0, 0, 7); c.fill(); c.fillStyle = '#fff'; c.fillRect(x - 14, y + 13, 28, 1); };
    pan(lx, ly, '#ffd860'); pan(rx, ry, '#8a50c8'); c.fillStyle = '#ffe9a0'; c.beginPath(); c.arc(lx, ly + 8, 4, 0, 7); c.fill(); c.fillStyle = '#b070f0'; c.beginPath(); c.arc(rx, ry + 8, 4, 0, 7); c.fill();
  },
  refreshPrayers() {
    const E = this.el; const allP = openPrayers().sort((a, b) => b.urg - a.urg); const prs = allP.slice(0, 3); this.prayMore = allP.length - prs.length;
    const sig = prs.map(p => p.id + ':' + (Game.selId === p.hid ? 1 : 0)).join(',') + LANG + this.prayMore;
    if (sig !== this.lastPray) {
      this.lastPray = sig; E.prayList.innerHTML = '';
      if (!prs.length) E.prayList.appendChild(h('div', { class: 'sm dim', style: 'padding:6px 0' }, t('no_prayers')));
      prs.forEach(p => {
        const hh = hById(p.hid); if (!hh) return;
        const rc = recommendFor(p); const fresh = !(this.seenP || (this.seenP = {}))[p.id]; this.seenP[p.id] = 1; const card = h('div', { class: 'card u' + (p.urg > 0.75 ? 2 : p.urg > 0.5 ? 1 : 0) + (Game.selId === p.hid ? ' sel' : '') + (fresh && G.tick > START_TICK + 30 ? ' fresh' : ''), style: 'padding:2px 6px', onclick: () => Screens.prayerClick(p.id), onmouseenter: () => { Game.flashId = p.hid; }, onmouseleave: () => { if (Game.flashId === p.hid) Game.flashId = 0; } },
          h('div', { style: 'display:flex;justify-content:space-between;font-size:13px' }, h('b', null, hh.name[li()] + ' ', h('span', { class: 'sm' }, JOBS[hh.job].n[li()])), h('span', { class: 'gold sm', style: 'display:flex;align-items:center;gap:3px' }, Ico(p.kind, 14), t('pk_' + p.kind))),
          h('div', { class: 'sm', style: 'line-height:1.22;height:32px;overflow:hidden;font-size:13px' }, pr(S['pray_' + p.kind][p.v % S['pray_' + p.kind].length])),
          h('div', { style: 'font-size:12px;color:#9affb0;margin-top:1px' }, t('rec_label') + '：' + POWER_BY_ID[rc.pid].n[li()] + ' ' + rc.mark + ' ' + Math.round(rc.p * 100) + '%'),
          h('div', { class: 'gauge', style: 'height:5px;border-width:1px;margin-top:2px' }, p._bar = h('i', { style: 'background:' + (p.urg > 0.75 ? '#ff7050' : p.urg > 0.5 ? '#ffd060' : '#fff3a0') })));
        p._bar.style.width = '100%'; card._p = p; Tip.attach(card, () => [t('pk_' + p.kind), t('tipk_' + p.kind), t('tip_pray_d'), t('tip_urg'), '›' + t('rec_label') + '：' + POWER_BY_ID[rc.pid].n[li()] + '（' + t('tip_succ') + ' ' + Math.round(rc.p * 100) + '%）']); E.prayList.appendChild(card);
      });
    }
    // timers
    Array.from(E.prayList.children).forEach(c => { if (c._p) { const left = clamp((c._p.exp - G.tick) / (2 * TICK_DAY), 0, 1); c._p._bar.style.width = (left * 100) + '%'; } });
  },
  refreshFav() {
    const E = this.el; const fv = G.favored.map(i => G.sidx[i]).filter(Boolean);
    const sig = fv.map(s => s.id + s.state + (s.hid || 0)).join(',') + LANG; if (sig === this.lastFav) return; this.lastFav = sig; E.favList.innerHTML = '';
    if (!fv.length) E.favList.appendChild(h('div', { class: 'sm dim', style: 'padding:4px 0' }, t('no_fav')));
    fv.forEach(s => { const hh = s.state === 'alive' ? hById(s.hid) : null; const nmz = hh ? hh.name[li()] : (s.lives.length ? s.lives[s.lives.length - 1].name[li()] : '?'); E.favList.appendChild(h('div', { class: 'card', style: 'font-size:13px;padding:1px 6px', onclick: () => { if (hh) Screens.focusHuman(hh.id); else Screens.souls(s.id); } }, h('span', { class: 'gold' }, '★ '), nmz, ' ', h('span', { class: 'sm' }, s.state === 'alive' ? JOBS[hh.job].n[li()] + ' Lv' + hh.lvl : t('st_river')))); });
  },
  tutSig: '',
  refreshTut() {
    const E = this.el, T = G.tut;
    if (T.skipped) { E.tutWin.style.display = 'none'; return; }
    const steps = [T.prayer, T.oracle, T.chron, T.counsel]; const done = steps.every(Boolean);
    const sig = steps.join('') + LANG + (done ? 'd' : ''); if (sig === this.tutSig) return; this.tutSig = sig;
    E.tutWin.style.display = 'block'; E.tutWin.innerHTML = '';
    E.tutWin.appendChild(h('h3', null, t('tut_title'), h('span', { class: 'btn', style: 'float:right;font-size:11px;padding:0 5px', onclick: () => { G.tut.skipped = true; UI.tutSig = ''; UI.refresh(true); } }, t('skip'))));
    ['tut1', 'tut2', 'tut3', 'tut4'].forEach((k, i) => E.tutWin.appendChild(h('div', { class: 'sm', style: 'font-size:13px;color:' + (steps[i] ? '#8affa0' : '#fff') }, (steps[i] ? '☑ ' : '☐ ') + t(k))));
    const gi = steps.indexOf(false);
    E.tutWin.appendChild(h('div', { class: 'sm gold', style: 'margin-top:3px;line-height:1.3' }, done ? t('tut_done') : t('tut_g' + (gi + 1))));
  },
  /* ---- selected resident window ---- */
  refreshRes() {
    const E = this.el, id = Game.selId, hh = id ? hById(id) : null;
    if (!hh || !hh.alive) { E.selWin.style.display = 'none'; this.resRefs = null; this.resId = 0; if (hh && !hh.alive) { Game.selId = 0; Render.sel = 0; } return; }
    E.selWin.style.display = 'block';
    if (this.resId !== id || this.resLang !== LANG) { this.buildRes(hh); this.resId = id; this.resLang = LANG; }
    const R = this.resRefs; if (!R) return;
    R.sub.textContent = JOBS[hh.job].n[li()] + '  ' + fmt(t('res_lv'), { n: hh.lvl }) + '  ' + fmt(t('res_age'), { n: Math.floor(hh.age) }) + '  ' + hh.traits.map(k => TRAITS[k][li()]).join('・') + (hh.retired ? ' ' : '');
    R.hpBar.style.width = (hh.hp / hh.maxHp * 100) + '%'; R.hpNum.textContent = Math.ceil(hh.hp) + '/' + Math.ceil(hh.maxHp);
    const n = hh.needs; const vals = { hunger: n.hunger, safety: n.safety, wealth: n.wealth, belong: n.belong, honor: n.honor, faith: n.faith };
    for (const k in R.needs) R.needs[k].style.width = clamp(vals[k], 0, 100) + '%';
    R.gold.textContent = t('gold') + ' ' + Math.floor(hh.gold) + 'G　' + (hh.gear ? '⚔+' + hh.gear : '') + (hh.pots ? ' ⚗' + hh.pots : '');
    const st = hh.tgt ? t('st_fight') : (hh.act ? t('act_' + hh.act.k) : t('act_idle'));
    R.state.textContent = st + (hh.party ? ' / ' + t('act_quest') : '');
    const mv = hh.motive || []; R.motive.textContent = mv.length ? t('motive') + mv.map(m => (S['act_' + m[0]] ? t('act_' + m[0]) : m[0]) + (m[2] && S['n_' + m[2]] ? '(' + t('n_' + m[2]) + ' ' + m[3] + ')' : '')).join(' / ') : '';
    const s = soulOf(hh); R.karma.textContent = t('karma') + ' ' + ['good', 'evil', 'deed', 'attach'].map(k => t('k_' + k) + s.k[k].toFixed(1)).join('  ') + (s.lives.length ? '  (' + t('soul_prev') + s.lives.length + ')' : '');
    R.fav.textContent = s.fav ? t('fav_off') : t('fav_on'); R.fav.classList.toggle('on', s.fav);
    R.track.textContent = G.track.indexOf(hh.id) >= 0 ? t('track_off') : t('track_on'); R.track.classList.toggle('on', G.track.indexOf(hh.id) >= 0);
  },
  buildRes(hh) {
    const E = this.el; E.selWin.innerHTML = ''; const R = {};
    E.selWin.appendChild(h('div', { style: 'display:flex;justify-content:space-between;align-items:center' }, h('span', { style: 'display:flex;align-items:center;gap:6px' }, portraitEl(hh, 36), R.name = h('b', { style: 'font-size:17px', class: 'gold' }, hh.name[li()])), h('span', { class: 'btn', style: 'padding:0 6px;font-size:12px', onclick: () => { Game.selId = 0; Render.sel = 0; UI.refresh(true); } }, '✕')));
    E.selWin.appendChild(R.sub = h('div', { class: 'sm' }));
    E.selWin.appendChild(h('div', { style: 'display:flex;align-items:center;gap:6px;margin-top:2px' }, h('span', { class: 'sm', style: 'width:22px' }, t('res_hp')), h('div', { class: 'gauge hp', style: 'flex:1;height:10px;border-width:1px' }, R.hpBar = h('i')), R.hpNum = h('span', { class: 'sm', style: 'width:60px;text-align:right' })));
    R.needs = {}; const grid = h('div', { style: 'display:grid;grid-template-columns:1fr 1fr;gap:1px 10px;margin-top:3px' });
    ['hunger', 'safety', 'wealth', 'belong', 'honor', 'faith'].forEach(k => { const b = h('i'); R.needs[k] = b; const row = h('div', { style: 'display:flex;align-items:center;gap:4px' }, h('span', { style: 'display:flex;align-items:center;gap:2px;width:50px' }, Ico(k, 12), h('span', { class: 'sm', style: 'font-size:11px' }, t('n_' + k))), h('div', { class: 'gauge need', style: 'flex:1;height:7px;border-width:1px' }, b)); Tip.attach(row, () => [t('n_' + k), t('tip_need_' + k)]); grid.appendChild(row); });
    E.selWin.appendChild(grid);
    E.selWin.appendChild(R.state = h('div', { class: 'sm', style: 'margin-top:3px' })); E.selWin.appendChild(R.gold = h('div', { class: 'sm' }));
    E.selWin.appendChild(R.motive = h('div', { class: 'sm', style: 'line-height:1.25;color:#a8e0ff' })); E.selWin.appendChild(R.karma = h('div', { class: 'sm' })); Tip.attach(R.motive, () => [t('motive'), t('tip_motive')]); Tip.attach(R.karma, () => [t('karma'), t('tip_karma')]);
    E.selWin.appendChild(h('div', { style: 'margin-top:4px;display:flex;gap:4px;flex-wrap:wrap' },
      R.fav = h('span', { class: 'btn', style: 'font-size:12px;padding:0 6px', onclick: () => { const s = soulOf(hh); if (!toggleFav(s.id)) UI.toast(t('f_full') , '#ffb060'); UI.lastFav = ''; UI.refresh(true); } }),
      R.track = h('span', { class: 'btn', style: 'font-size:12px;padding:0 6px', onclick: () => { chronTrackToggle(hh.id); UI.refresh(true); } }),
      h('span', { class: 'btn', style: 'font-size:12px;padding:0 6px', onclick: () => { Screens.eyeOn(hh.id); } }, t('eye_use')),
      h('span', { class: 'btn', style: 'font-size:12px;padding:0 6px', onclick: () => { chronSupplement(hh.id); Snd.se('page'); UI.toast(t('new_chapter'), '#ffe9a0'); } }, t('supp'))));
    this.resRefs = R;
  },
};
S.f_full = ['眷顧者は最大5人です', '眷顧者最多5人'];

/* ---------- power casting UI flow ---------- */
function selectPower(i) {
  if (!G || G.ending || Game.scene !== 'play') return;
  const p = POWERS[i]; const cost = powerCost(p.id);
  if (G.faith < cost) { UI.toast(t('faith_short'), '#ff8a8a'); Snd.se('fail'); return; }
  if (p.id === 'force') { Screens.menu([[t('force_light'), () => doCast('force', 0, 'light')], [t('force_dark'), () => doCast('force', 0, 'dark')]], p.n[li()]); return; }
  Game.power = Game.power === p.id ? null : p.id; Snd.se('cursor'); UI.refresh(true);
}
function castOn(pid, tid) {
  if (pid === 'oracle') Screens.menu([['brave', 'careful', 'kind'].map(k => [t('dir_' + k), () => doCast('oracle', tid, k)])].flat(), POWER_BY_ID.oracle.n[li()]);
  else if (pid === 'soul') Screens.menu(['good', 'evil', 'deed', 'attach'].map(k => [t('dir_' + k), () => doCast('soul', tid, k)]), POWER_BY_ID.soul.n[li()]);
  else doCast(pid, tid);
}
function doCast(pid, tid, dir) {
  Game.power = null;
  const res = castPower(pid, tid, dir);
  UI.lastPray = ''; UI.lastFav = ''; Screens.closeMenu();
  if (!res.ok) { UI.toast(res.err === 'faith' ? t('faith_short') : '…', '#ff8a8a'); Snd.se('fail'); UI.refresh(true); return; }
  const idx = POWERS.findIndex(p => p.id === pid);
  Snd.se('power' + (idx + 1)); setTimeout(() => Snd.se(res.outcome === 'crit' ? 'crit' : res.outcome === 'success' ? 'success' : res.outcome === 'twist' ? 'twist' : 'fail'), 300);
  if (res.outcome !== 'fail') { Snd.playSong('divine'); Game.bgmName = 'divine'; Game.divineUntil = performance.now() + 9000; }
  const nmz = res.name ? res.name[li()] : '';
  const head = (nmz ? nmz + ' ← ' : '') + POWER_BY_ID[pid].n[li()] + '（' + t('succ') + ' ' + Math.round(res.p * 100) + '%）';
  UI.banner(t('out_' + res.outcome) + ' ' + t('out_sub_' + res.outcome), [head].concat(castReason(res)), res.outcome);
  if (Game.tut && Game.tut.on) Game.tut.afterCast(res);
  UI.refresh(true);
}
