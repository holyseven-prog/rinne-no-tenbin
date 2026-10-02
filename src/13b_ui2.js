/* ================= UI part 2: feed, goal, tooltips, cast reasons, advisor (R5) ================= */
Object.assign(S, {
  feed: ['できごと', '事件'], feed_all: ['ぜんぶ', '全部'], faith_over: ['あふれた信仰が、町を少しゆたかにした。', '滿出來的信仰，讓城鎮稍微富足了一些。'],
  feed_none: ['（まだ何もありません）', '（還沒有事件）'], goal: ['もくひょう', '目標'],
  goal_text: ['魔王が目覚める前に、勇者を育てて魔王を倒そう。', '在魔王覺醒之前，培育勇者並打倒魔王。'],
  goal_text2: ['魔王が目覚めた！討伐隊を守り、魔王を倒そう。', '魔王覺醒了！守護討伐隊，打倒魔王。'],
  gb_balance: ['天秤', '天秤'], gb_boss: ['魔王の目覚め', '魔王覺醒'], gb_hero: ['勇者の成長', '勇者成長'], gb_awake: ['目覚めた！', '覺醒了！'],
  names_all: ['名前：全員', '名字：全部'], names_key: ['名前：大事な人だけ', '名字：重要者'], names_none: ['名前：なし', '名字：不顯示'],
  names_btn: ['名', '名'], names_label: ['名前の表示', '名字顯示'], names_opt_all: ['全員', '全部'], names_opt_key: ['大事な人のみ', '僅重要者'], names_opt_none: ['なし', '不顯示'],
  theme_label: ['ウィンドウの色', '視窗配色'], theme_black: ['黒', '黑'], theme_blue: ['青', '藍'], autoslow_label: ['大事な出来事で自動減速', '重要事件自動降速'], advisor_label: ['顧問のひとこと', '顧問提示'],
  auto_slowed: ['大事な出来事なので、速度を×1に下げました', '發生重要事件，已把速度降到 ×1'],
  adv_hunger: ['【顧問】飢えで祈っている人がいます。恩寵がいちばん合います。', '【顧問】有人餓著肚子在祈禱，恩寵最合適。'],
  adv_sick: ['【顧問】けがや病気の人がいます。恩寵で治せます。', '【顧問】有人受傷或生病了，恩寵可以治好他。'],
  adv_faith: ['【顧問】信仰力がいっぱいです。祈りに応えて使いましょう。', '【顧問】信仰力快滿了，回應祈禱把它用掉吧。'],
  adv_dark: ['【顧問】天秤が闇に傾いています。勢力操作（光）を考えましょう。', '【顧問】天秤偏向暗側了，可以考慮勢力操作（光）。'],
  adv_light: ['【顧問】光に傾きすぎです。物語が止まってしまうかも。', '【顧問】太偏向光了，故事可能會停下來。'],
  adv_boss: ['【顧問】魔王が目覚めました。信仰力をためて、討伐隊を助けましょう。', '【顧問】魔王覺醒了，存好信仰力，去幫助討伐隊吧。'],
  adv_pray_many: ['【顧問】祈りがたまっています。放っておくと信仰力が減ります。', '【顧問】祈禱累積很多了，放著不管信仰力會減少。'],
  adv_hero: ['【顧問】まだ弱い勇者候補がいます。神託で勇気を与えるのも手です。', '【顧問】還有成長中的勇者候補，用神諭賜予勇氣也是個辦法。'],
  rec_label: ['おすすめ', '建議'], rec_none: ['おすすめなし', '無建議'],
  res_head_resolved: ['{name}の祈り（{pk}）に応えた。信仰力 +{g}', '回應了{name}的祈禱（{pk}），信仰力 +{g}'],
  res_oracle_ok: ['{name}は{b}。三日間、その方向に動く。', '{name}{b}，三天內會朝那個方向行動。'],
  res_oracle_twist: ['お告げが取り違えられた。{name}は{b}。', '神諭被誤解了。{name}{b}。'],
  res_grace_ok: ['{name}の傷が治り、二日間つよくなった。', '{name}的傷治好了，兩天內變得更強。'],
  res_grace_crit: ['{name}は完全に回復し、経験も積んだ。', '{name}完全康復，還累積了經驗。'],
  res_grace_twist: ['恩寵で{name}は調子に乗った。すこし回復し、無茶をしやすい。', '{name}因恩寵得意忘形。稍微恢復了，但容易亂來。'],
  res_trial_ok: ['{name}の近くに魔物が現れた。乗り越えれば強くなる。', '{name}附近出現了魔物。撐過去就會變強。'],
  res_trial_crit: ['{name}は試練を乗り越え、レベルが上がった。', '{name}撐過了試煉，等級提升了。'],
  res_trial_twist: ['試練はききんになり、食べ物がへった。', '試煉變成了飢荒，食物變少了。'],
  res_soul_ok: ['魂の「{k}」が増えた（{n}）。', '靈魂的「{k}」增加了（{n}）。'],
  res_soul_twist: ['因果がねらいと違う方向にゆれた。', '因果偏向了和預期不同的方向。'],
  res_force_ok: ['天秤が{d}へ {n}。魔物が弱り、戦士が元気になった。', '天秤往{d}移動了 {n}。魔物變弱，戰士恢復了精神。'],
  res_force_dark: ['天秤が闇へ {n}。魔物が増える。', '天秤往暗側移動了 {n}。魔物變多了。'],
  res_force_twist: ['力が逆に働き、天秤は反対へ動いた。', '力量反向作用，天秤往相反方向移動了。'],
  res_fail_gen: ['神の声は届かなかった。', '神的聲音沒有傳達到。'],
  res_why_fatigue: ['理由：同じ神力を続けて使い、疲れています。', '原因：連續使用同一種神力，造成疲勞。'],
  res_why_faith: ['理由：相手の信仰が薄いようです。', '原因：對方的信仰似乎很淡薄。'],
  res_why_luck: ['理由：成功率は{p}％。運が悪かっただけです。', '原因：成功率只有 {p}%，單純運氣不好。'],
  res_cost: ['消費 {c}　（残り {f}）', '消耗 {c}　（剩餘 {f}）'],
  a_light: ['光', '光'], a_dark: ['闇', '暗'],
  tip_faith: ['信仰力', '信仰力'], tip_faith_d: ['神の力のもと。祈りに応えると増え、神力を使うと減ります。0のまま長く続くと、神は世界から去ります。', '神明的力量來源。回應祈禱會增加，使用神力會減少。長期維持 0，神就會離開這個世界。'],
  tip_bal: ['光と闇の天秤', '光暗天秤'], tip_bal_d: ['左（光）に傾くと平和ですが、傾きすぎると物語が止まります。右（闇）に傾くと魔物が増え、魔王が早く目覚めます。「ちょうど中くらい〜少し光」がいちばん世界が元気です。', '往左（光）偏會比較和平，但偏太多故事會停滯。往右（暗）偏則魔物增加，魔王會提早覺醒。「中間～稍微偏光」時世界最有活力。'],
  tip_date: ['日付', '日期'], tip_date_d: ['1年は12日。春夏秋冬が3日ずつ。第7年の春ごろ、魔王が目覚めます。', '一年有 12 天，春夏秋冬各 3 天。大約第 7 年春天，魔王會覺醒。'],
  tip_speed: ['速さ', '速度'], tip_speed_d: ['⏸ 一時停止（Space）　×1〜×64（Q/E で上げ下げ）。×1 はゲーム内1日＝実時間60秒。', '⏸ 暫停（Space）　×1～×64（Q/E 調整）。×1 時遊戲內 1 天 = 現實 60 秒。'],
  tip_names: ['名前の表示', '名字顯示'], tip_names_d: ['押すたびに「全員／大事な人だけ／なし」が切り替わります。Nキーを押している間は全員表示。', '每按一次切換「全部／僅重要者／不顯示」。按住 N 鍵時暫時顯示所有人。'],
  tip_mini: ['地図', '地圖'], tip_mini_d: ['クリックした場所にカメラが動きます。黄色い点は祈っている人、紫は魔王城です。', '點擊會把鏡頭移到該處。黃點是正在祈禱的人，紫色是魔王城。'],
  tip_eye: ['神眼', '神眼'], tip_eye_d: ['住人をじっと見て、寿命・因果・前世を知ります。1日ごとに1回ふえます（最大3）。X を押してから住人をクリック。', '仔細觀察居民，得知壽命、因果與前世。每天回復 1 次（最多 3 次）。按 X 後點擊居民。'],
  tip_counsel: ['顧問ミルラ', '顧問米菈'], tip_counsel_d: ['いまの状況・危険・おすすめの行動を、成功率つきで教えてくれます。決めるのはあなたです。（G）', '會告訴你目前狀況、風險與建議行動，並附上成功率。決定的是你。（G）'],
  tip_chron: ['史官の書庫', '史官書庫'], tip_chron_d: ['あなたの世界で起きたことが、物語として書かれています。人物を追いかけることもできます。（H）', '你的世界發生的事會被寫成故事，也可以追蹤特定人物。（H）'],
  tip_fav: ['眷顧者', '眷顧者'], tip_fav_d: ['神が特にみまもる最大5人。死んだあとも魂の河で追いかけられ、転生先にも干渉しやすくなります。住人の詳細窓の「★」で指定。', '神特別守護的最多 5 人。死後也能在靈魂之河追蹤，轉生時更容易干涉。可在居民詳細視窗按「★」指定。'],
  tip_goal: ['もくひょう', '目標'], tip_goal_d: ['ゲームの目標と進み具合です。魔王が目覚めるまでに、勇者になれる人を育てましょう。', '遊戲目標與進度。請在魔王覺醒前，培育能成為勇者的人。'],
  tip_feed: ['できごと', '事件'], tip_feed_d: ['世界で起きたことの一覧です。クリックすると、その場所にカメラが動きます。', '世界上發生的事件列表。點擊會把鏡頭移到事件發生的地方。'],
  tip_pray: ['祈りカード', '祈禱卡片'], tip_pray_d: ['住人があなたに願っていることです。色の線が赤いほど急ぎ。放っておくと2日で消え、信仰力が少し減ります。', '居民向你許的願望。邊框越紅越緊急，放著不管 2 天就會消失，並讓信仰力小幅下降。'],
  tip_urg: ['下の線は残り時間です。', '下方的線條代表剩餘時間。'],
  tip_cost: ['消費', '消耗'], tip_good: ['向いている祈り', '適合的祈禱'], tip_risk: ['リスク', '風險'],
  tipp_oracle: ['夢でひとこと助言して、3日間その人の行動の向きを変えます。いちばん安い。', '在夢中給一句提示，3 天內改變對方的行動傾向。最便宜。'],
  tipg_oracle: ['どの祈りにも使える（恋・赦し・復讐に特に向く）', '各種祈禱皆可（尤其適合戀愛、寬恕、復仇）'], tipr_oracle: ['取り違えられると、逆の行動をとる（曲解）', '被誤解時，對方會做出相反的行動（曲解）'],
  tipp_grace: ['傷を治し、2日間 攻撃と防御を上げます。', '治療傷勢，並在 2 天內提升攻擊與防禦。'],
  tipg_grace: ['病気・飢え・戦の加護・死の恐れ・子の誕生', '疾病、飢餓、戰場加護、死亡恐懼、新生命'], tipr_grace: ['調子に乗って、無茶をすることがある', '對方可能得意忘形而亂來'],
  tipp_trial: ['魔物や飢饉をぶつけて、成長のきっかけを与えます。', '降下魔物或飢荒，作為成長的契機。'],
  tipg_trial: ['強くしたい人（祈りへの返事ではありません）', '想讓他變強的人（不是用來回應祈禱的）'], tipr_trial: ['相手が死ぬことがある。天秤が少し闇に傾く', '對方可能死亡，天秤會稍微偏向暗'],
  tipp_soul: ['魂の因果（善・悪・功・執）を動かします。眷顧者にはよく効きます。', '調整靈魂的因果（善、惡、功、執）。對眷顧者特別有效。'],
  tipg_soul: ['赦し・復讐・死の恐れ／転生先を変えたいとき', '寬恕、復仇、死亡恐懼／想改變轉生去向時'], tipr_soul: ['ねらいと違う因果が増えることがある', '有時會增加預期之外的因果'],
  tipp_force: ['光か闇へ、世界の天秤を動かします。光なら魔物が弱り、戦士が元気になります。', '把世界的天秤推向光或暗。推向光時魔物會變弱，戰士也會恢復精神。'],
  tipg_force: ['魔物の襲来・魔王との戦いの前', '魔物來襲時、挑戰魔王之前'], tipr_force: ['曲解すると、反対側へ傾く', '被曲解時，會往相反方向傾斜'],
  tip_succ: ['成功率', '成功率'], tip_pick: ['まず住人を選ぶと、成功率が出ます', '先選一個居民，就會顯示成功率'],
  tipk_sick: ['病気やけがで苦しんでいます。恩寵で治せます。', '正因疾病或受傷而痛苦，用恩寵可以治好。'],
  tipk_hunger: ['食べ物がなくて困っています。恩寵や神託でパンが届きます。', '沒有食物而受苦，用恩寵或神諭能讓他得到麵包。'],
  tipk_love: ['好きな人がいます。神託で背中を押せます。', '有喜歡的人，可以用神諭推他一把。'],
  tipk_battle: ['これから戦いに行きます。恩寵で守れます。', '即將上戰場，用恩寵可以守護他。'],
  tipk_revenge: ['憎しみを抱えています。神託でしずめられます。', '懷著恨意，可以用神諭讓他平靜。'],
  tipk_forgive: ['罪の気持ちがあります。神託や魂への干渉で赦せます。', '心懷罪惡感，用神諭或干涉靈魂可以寬恕他。'],
  tipk_birth: ['もうすぐ子が生まれます。恩寵で無事を守れます。', '孩子就要出生了，用恩寵可以保佑平安。'],
  tipk_fear: ['死ぬのが怖いと思っています。恩寵で安心させられます。', '害怕死亡，用恩寵可以讓他安心。'],
  tip_need_hunger: ['おなか。高いと食べに行く。', '肚子餓的程度，越高越想去吃飯。'], tip_need_safety: ['安心。敵が近いと上がる。', '不安全感，敵人靠近時會升高。'], tip_need_wealth: ['お金への不安。', '對金錢的不安。'],
  tip_need_belong: ['さびしさ。高いと人に会いに行く。', '寂寞程度，越高越想去見人。'], tip_need_honor: ['名誉欲。冒険者は手柄で満たされる。', '名譽欲，冒險者靠戰功滿足。'], tip_need_faith: ['祈りたい気持ち。高いと祈る。', '想祈禱的心情，越高越會去祈禱。'],
  tip_karma: ['善＝人助け　悪＝盗み・乱暴　功＝戦いの手柄　執＝未練。転生後の職や性格に影響します。', '善＝助人　惡＝偷竊暴力　功＝戰功　執＝執念。會影響轉生後的職業與性格。'],
  tip_motive: ['この人がいま、なぜその行動を選んだか（上位3つ）です。', '這個人現在為什麼選擇這個行動（前三名理由）。'],
});
const Tip = {
  timer: 0,
  attach(el, fn) {
    el.addEventListener('mouseenter', () => { clearTimeout(Tip.timer); Tip.timer = setTimeout(() => Tip.show(el, fn), 260); });
    el.addEventListener('mouseleave', () => Tip.hide()); el.addEventListener('mousedown', () => Tip.hide());
  },
  show(el, fn) {
    const txt = typeof fn === 'function' ? fn() : fn; if (!txt || !el.isConnected) return;
    const d = $('tip'); d.innerHTML = ''; (Array.isArray(txt) ? txt : [txt]).forEach((l, i) => { if (l) d.appendChild(h('div', i === 0 ? { class: 'gold', style: 'font-weight:bold' } : (l.startsWith('›') ? { class: 'blu' } : {}), l)); });
    d.style.display = 'block';
    const sr = $('stage').getBoundingClientRect(), r = el.getBoundingClientRect(), s = Scale.s;
    const ex = (r.left - sr.left) / s, ey = (r.top - sr.top) / s, ew = r.width / s, eh = r.height / s; const w = d.offsetWidth, hh = d.offsetHeight;
    let x = clamp(ex + ew / 2 - w / 2, 6, 1274 - w), y = ey + eh + 8; if (y + hh > 712) y = ey - hh - 8; if (y < 4) y = 4;
    d.style.left = x + 'px'; d.style.top = y + 'px';
  },
  hide() { clearTimeout(Tip.timer); const d = $('tip'); if (d) d.style.display = 'none'; },
};

/* ---- feed ---- */
UI.feed = []; UI.feedSig = '';
UI.buildFeed = function () {
  const E = this.el;
  const w = h('div', { class: 'win glass', style: 'left:1018px;top:440px;width:254px;height:124px;padding:3px 8px;overflow:hidden' },
    h('h3', { style: 'display:flex;justify-content:space-between;align-items:center' }, t('feed'), h('span', { class: 'btn', style: 'font-size:11px;padding:0 5px', onclick: () => Screens.eventLog() }, t('feed_all'))),
    E.feedList = h('div', { style: 'font-size:13px;line-height:1.28' }));
  Tip.attach(w.firstChild.firstChild, () => [t('tip_feed'), t('tip_feed_d')]);
  return w;
};
UI.pushFeed = function (text, col, pos, imp) {
  this.feed.push({ text, col: col || '#fff', pos: pos || null, imp: !!imp, tick: G ? G.tick : 0 }); if (this.feed.length > 200) this.feed.shift(); this.feedSig = '';
  if (this.el.feedList) this.renderFeed();
};
UI.toast = function (text, col) { this.pushFeed(text, col || '#fff'); };
UI.renderFeed = function () {
  const E = this.el; if (!E.feedList) return; E.feedList.innerHTML = '';
  const last = this.feed.slice(-5);
  if (!last.length) E.feedList.appendChild(h('div', { class: 'sm dim' }, t('feed_none')));
  last.forEach(f => {
    const d = h('div', { style: 'color:' + f.col + ';cursor:' + (f.pos ? 'pointer' : 'default') + ';white-space:nowrap;overflow:hidden;text-overflow:ellipsis;' + (f.imp ? 'font-weight:bold;' : '') + (G && G.tick - f.tick < 40 ? 'text-decoration:underline dotted;' : ''), title: f.text, onclick: () => { if (f.pos) { Render.centerOn(f.pos.x, f.pos.y); Game.follow = 0; Render.rings.push({ x: f.pos.x * TS + 8, y: f.pos.y * TS + 8, r: 4, life: 14, col: '#ffe060' }); } } }, (f.pos ? '▸ ' : '・') + f.text);
    E.feedList.appendChild(d);
  });
};

/* ---- goal window ---- */
UI.buildGoal = function () {
  const E = this.el; const R = {};
  const bar = (label, tipKey) => { const b = h('i'); const row = h('div', { style: 'display:flex;align-items:center;gap:5px;margin-top:3px' }, h('span', { class: 'sm', style: 'width:76px;font-size:12px' }, label), h('div', { class: 'gauge', style: 'flex:1;height:9px;border-width:1px' }, b)); return { row, b }; };
  const w = h('div', { class: 'win glass', style: 'left:8px;top:216px;width:214px;padding:4px 8px' });
  R.head = h('h3', { style: 'display:flex;justify-content:space-between;align-items:center' }, t('goal'), R.tg = h('span', { class: 'btn', style: 'font-size:11px;padding:0 6px', onclick: () => { Game.goalOpen = !Game.goalOpen; UI.goalSig = ''; UI.refreshGoal(); } }, '▾'));
  R.text = h('div', { class: 'sm', style: 'line-height:1.35;color:#ffe9a0;margin-bottom:2px' });
  R.b1 = bar(t('gb_balance')); R.b2 = bar(t('gb_boss')); R.b3 = bar(t('gb_hero'));
  R.b1.b.style.background = 'linear-gradient(90deg,#ffd860,#8a50c8)'; R.b2.b.style.background = 'linear-gradient(#e0a0ff,#8a30d0)'; R.b3.b.style.background = 'linear-gradient(#80ff90,#20b040)';
  R.body = h('div', null, R.text, R.b1.row, R.b2.row, R.b3.row);
  w.append(R.head, R.body); this.goalR = R; Tip.attach(R.head.firstChild, () => [t('tip_goal'), t('tip_goal_d')]);
  Tip.attach(R.b1.row, () => [t('tip_bal'), t('tip_bal_d')]);
  return w;
};
UI.goalSig = '';
UI.refreshGoal = function () {
  const R = this.goalR; if (!R || !G) return;
  R.body.style.display = Game.goalOpen === false ? 'none' : 'block'; R.tg.textContent = Game.goalOpen === false ? '▸' : '▾';
  R.text.textContent = t(G.awakened ? 'goal_text2' : 'goal_text');
  // balance marker (50% = even)
  R.b1.b.style.width = ((G.balance + 100) / 2).toFixed(0) + '%';
  const prog = G.awakened ? 1 : clamp((G.tick - START_TICK) / (G.awakenTick - START_TICK), 0, 1); R.b2.b.style.width = (prog * 100).toFixed(0) + '%';
  const advs = G.humans.filter(x => x.alive && isAdv(x)).sort((a, b) => b.lvl - a.lvl).slice(0, 3); const avg = advs.length ? advs.reduce((a, x) => a + x.lvl, 0) / advs.length : 0; R.b3.b.style.width = (clamp(avg / 12, 0, 1) * 100).toFixed(0) + '%';
};
UI.refreshTut = function () { this.refreshGoal(); };

/* ---- cast result reason text (R5-7) ---- */
function castReason(res) {
  const nm = res.name ? res.name[li()] : '', pid = res.pid, o = res.outcome; const lines = [];
  if (pid === 'oracle') {
    if (o === 'crit' || o === 'success') lines.push(fmt(t('res_oracle_ok'), { name: nm, b: t('bias_' + res.biasKind) }));
    else if (o === 'twist') lines.push(fmt(t('res_oracle_twist'), { name: nm, b: t('bias_' + res.biasKind) }));
  } else if (pid === 'grace') {
    if (o === 'crit') lines.push(fmt(t('res_grace_crit'), { name: nm })); else if (o === 'success') lines.push(fmt(t('res_grace_ok'), { name: nm })); else if (o === 'twist') lines.push(fmt(t('res_grace_twist'), { name: nm }));
  } else if (pid === 'trial') {
    if (o === 'crit') lines.push(fmt(t('res_trial_crit'), { name: nm })); else if (o === 'success') lines.push(fmt(t('res_trial_ok'), { name: nm })); else if (o === 'twist') lines.push(t('res_trial_twist'));
  } else if (pid === 'soul') {
    if (o === 'crit' || o === 'success') lines.push(fmt(t('res_soul_ok'), { k: t('k_' + res.dir), n: '+' + (res.kamt || 0).toFixed(1) })); else if (o === 'twist') lines.push(t('res_soul_twist'));
  } else if (pid === 'force') {
    const d = Math.round(res.bal || 0);
    if (o === 'crit' || o === 'success') lines.push(res.dir === 'dark' ? fmt(t('res_force_dark'), { n: d }) : fmt(t('res_force_ok'), { d: t('a_light'), n: '+' + d })); else if (o === 'twist') lines.push(t('res_force_twist'));
  }
  if (res.gain) lines.push(fmt(t('res_head_resolved'), { name: nm, pk: res.pk ? t('pk_' + res.pk) : '', g: res.gain }));
  if (o === 'fail') {
    lines.push(t('res_fail_gen'));
    if (fatigueStage(pid) > 0) lines.push(t('res_why_fatigue')); else if (res.p < 0.5) lines.push(t('res_why_faith')); else lines.push(fmt(t('res_why_luck'), { p: Math.round(res.p * 100) }));
  }
  lines.push(fmt(t('res_cost'), { c: res.cost, f: Math.floor(G.faith) }));
  return lines;
}
/* recommended power for a prayer (R5-6) */
function recommendFor(pr) {
  const hh = hById(pr.hid); const pid = PRAYER_ANS[pr.kind][0]; const p = successProb(pid, hh);
  return { pid, p, mark: p >= 0.7 ? '◎' : p >= 0.5 ? '○' : '△' };
}

/* ---- advisor bubbles (R5-11) ---- */
Game.advisorTick = function () {
  if (this.settings.advisor === false || !G || G.ending || Game.tut && Game.tut.on) return;
  const day = dayIdx(G.tick); if (G.advDay !== day) { G.advDay = day; G.advCount = 0; } if (G.advCount >= 3) return;
  const prs = openPrayers(); const say = k => { G.advCount++; UI.pushFeed(t(k), '#a8e0ff', null, false); };
  const key = () => { const a = []; if (prs.some(p => p.kind === 'hunger' && p.urg > 0.6)) a.push('adv_hunger'); if (prs.some(p => p.kind === 'sick' && p.urg > 0.6)) a.push('adv_sick'); if (G.awakened && !G.advSaid_boss) { G.advSaid_boss = 1; a.push('adv_boss'); } if (G.faith > 140) a.push('adv_faith'); if (G.balance < -30) a.push('adv_dark'); if (G.balance > 70) a.push('adv_light'); if (prs.length >= 6) a.push('adv_pray_many'); return a; };
  const last = G.advLast || {}; G.advLast = last;
  for (const k of key()) { if (G.tick - (last[k] || -99999) < 3 * TICK_DAY) continue; last[k] = G.tick; say(k); if (G.advCount >= 3) break; }
};
/* auto slow-down on important events (R5-10) */
Game.autoSlow = function () {
  if (this.settings.autoSlow === false || this.speedIdx <= 0 || !G) return;
  if (G.tick - (this.lastAuto || -9999) < 72) return; this.lastAuto = G.tick; this.speedIdx = 0; UI.pushFeed(t('auto_slowed'), '#ffd070', null, true);
};
Game.cycleNames = function () { const o = ['key', 'all', 'none']; const cur = this.settings.names || 'key'; this.settings.names = o[(o.indexOf(cur) + 1) % 3]; if (G) G.flags.noAllNames = 1; this.saveSettings(); UI.refresh(true); UI.pushFeed(t('names_' + this.settings.names), '#fff'); };
