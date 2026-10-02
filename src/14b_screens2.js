/* ================= screens part 2: help pages, glossary, event log, settings, god hints, ending summary ================= */
Object.assign(S, {
  out_sub_crit: ['（思った以上の結果）', '（超出預期的結果）'], out_sub_success: ['（うまくいった）', '（順利成功）'], out_sub_twist: ['（神意が誤解された）', '（神意被誤解了）'], out_sub_fail: ['（届かなかった）', '（沒有傳達）'],
  help_p1: ['基本の流れ', '基本流程'], help_p2: ['神力いちらん', '神力一覽'], help_p3: ['祈りの見かた', '祈禱怎麼看'], help_p4: ['結果は4段階', '結果有 4 級'], help_p5: ['天秤と魔王', '天秤與魔王'], help_p6: ['史官と物語', '史官與故事'], help_p7: ['ショートカット', '快捷鍵'], help_p8: ['3つの神格', '三種神格'],
  help_b1: ['1. 世界は自動で動きます。住人は自分で働き、食べ、恋をし、戦います。\n2. 住人があなたに「祈り」ます（右のカード）。\n3. 祈りに応えるには、下の「神力」を選んで、その人をクリックします。\n4. 応えると信仰力がふえます。神力を使うと信仰力がへります。\n5. 住人が死ぬと、魂は川へ行き、また生まれ変わります。\n6. 第7年ごろ、魔王が目覚めます。それまでに、勇者になれる人を育てましょう。', '1. 世界會自己運作。居民自己工作、吃飯、談戀愛、戰鬥。\n2. 居民會向你「祈禱」（右側的卡片）。\n3. 想回應祈禱，就選下方的「神力」，再點那個人。\n4. 回應成功會增加信仰力，使用神力會消耗信仰力。\n5. 居民死亡後，靈魂會進入河中，再次轉生。\n6. 大約第 7 年，魔王會覺醒。請在那之前，培育能成為勇者的人。'],
  help_b3: ['祈りカードには「種類」と「急ぎ度」が書いてあります。\n・赤い枠ほど急ぎです。下の線は、残り時間です。\n・放っておくと2日で消え、信仰力が少しへります。\n・「おすすめ」は、いちばん合う神力と成功率です。\n\n種類のいみ：', '祈禱卡片上有「種類」與「急迫程度」。\n・框越紅越緊急，下方的線是剩餘時間。\n・放著不管 2 天就會消失，並讓信仰力小幅下降。\n・「建議」是最適合的神力與成功率。\n\n各種類的意思：'],
  help_b4: ['神力を使うと、結果は次の4つのどれかです。\n\n【大成功】思った以上にうまくいく。信仰力もたくさん増える。\n【成功】ねらい通り。\n【曲解】神の意図が、すこし違って伝わる。例：「慎重に」が「無茶をしろ」に聞こえる。\n【失敗】届かなかった。信仰力は使うが、何も起きない。\n\n成功率は、神力の種類・相手の信仰・疲れ・祈りの急ぎ度で決まります。\n同じ神力を30日に3回以上使うと「疲れ」て、効きにくく、高くなります。', '使用神力後，結果會是下面 4 種之一。\n\n【大成功】比預期更好，信仰力也大幅增加。\n【成功】如你所願。\n【曲解】神意被稍微誤解。例：「謹慎」被聽成「放手去幹」。\n【失敗】沒有傳達，信仰力照扣，但什麼也沒發生。\n\n成功率由神力種類、對方的信仰、疲勞、祈禱的急迫程度決定。\n30 天內使用同一種神力 3 次以上會「疲勞」，效果變差、費用變高。'],
  help_b5: ['画面上の天秤は、世界の光と闇のバランスです。\n・魔物をたおしたり、人助けをすると光へ。\n・悪いことや、災いがあると闇へ。\n・闇に傾くと魔物が増え、魔王が早く目覚めます。\n・光に傾きすぎると、世界が平和すぎて物語が止まります。\n\n魔王は第7年の春ごろ（前後2年）に目覚めます。目覚めると、幹部が町を攻めに来ます。\n冒険者の討伐隊が魔王を倒せば勝ち。町がほろびたら負けです。\n\n終わり方は4つ：魔王討伐／滅世／神の退場（信仰力が0で祈りも途絶える）／停滞の終幕（光に傾きすぎて動きがない）。', '畫面上的天秤代表世界的光暗平衡。\n・打倒魔物或幫助他人會偏向光。\n・壞事或災難會偏向暗。\n・偏向暗側，魔物會增加、魔王提早覺醒。\n・偏向光側太多，世界太和平，故事會停滯。\n\n魔王大約在第 7 年春天（前後 2 年）覺醒。覺醒後，幹部會來攻打小鎮。\n冒險者討伐隊打倒魔王就獲勝，小鎮毀滅就失敗。\n\n結局共 4 種：魔王討伐／滅世／神的退場（信仰力 0 且祈禱斷絕）／停滯的終幕（太偏光而毫無變化）。'],
  help_b6: ['史官ソウジュは、世界のできごとを物語に書いています。\n・「H」で書庫を開きます。左で章を選び、真ん中で読みます。\n・各章は「だれの話か」が題名に出ます。「人物ごと」にならべかえもできます。\n・「この人物を追う」で、その人の話を優先して書いてもらえます。\n・「補伝を求める」で、その人の過去や願いを書いてもらえます。\n\n文章のタグ：目撃＝史官が見た　転述＝人から聞いた　推想＝史官の想像\n墨の状態：墨未乾＝書いたばかり　手稿＝下書き　定稿＝完成', '史官蒼壽會把世界發生的事寫成故事。\n・按「H」開啟書庫。左邊選章節，中間閱讀。\n・每一章的標題會寫出「是誰的故事」，也能切換成「依人物」排列。\n・按「追蹤此人」，史官會優先記錄這個人的故事。\n・按「請求補傳」，會寫出這個人的過去與願望。\n\n文章標籤：目擊＝史官親眼所見　轉述＝聽別人說的　推想＝史官的想像\n墨的狀態：墨未乾＝剛寫好　手稿＝草稿　定稿＝完稿'],
  help_b7: ['WASD／矢印＝カメラ　Space＝一時停止　Q／E＝速さ　1〜5＝神力\nX＝神眼　H＝史官の書庫　R＝住人一覧　S＝魂の河　G＝顧問\nN＝次の注目（押している間は全員の名前）　M＝消音　F＝全画面　Esc＝メニュー／キャンセル', 'WASD／方向鍵＝鏡頭　Space＝暫停　Q／E＝速度　1～5＝神力\nX＝神眼　H＝史官書庫　R＝居民一覽　S＝靈魂之河　G＝顧問\nN＝下一個關注（按住時顯示所有人的名字）　M＝靜音　F＝全螢幕　Esc＝選單／取消'],
  glossary: ['用語集', '用語集'], gl_title: ['むずかしい言葉の説明', '難詞說明'],
  gl_k: ['因果', '因果'], gl_k_d: ['魂にたまる「やったことの記録」。善（人助け）・悪（盗みや乱暴）・功（戦いの手柄）・執（未練）の4つ。次に生まれ変わるときの職業や性格に影響します。', '靈魂累積的「做過的事的紀錄」，分為善（助人）、惡（偷竊暴力）、功（戰功）、執（未了心願）四種，會影響下次轉生的職業與個性。'],
  gl_g: ['眷顧者', '眷顧者'], gl_g_d: ['神が特別に見守る人（最大5人）。死んでも魂の河で追いかけられ、転生先にも手を出しやすくなります。', '神特別守護的人（最多 5 人）。死後也能在靈魂之河追蹤，轉生時更容易干涉。'],
  gl_t: ['曲解', '曲解'], gl_t_d: ['神の意図が、ちがう意味で受け取られること。逆の結果になることもあります。', '神的意圖被當成別的意思接收，有時會造成相反的結果。'],
  gl_e: ['神眼', '神眼'], gl_e_d: ['住人の寿命・因果・前世をのぞく力。1日に1回ふえます（最大3）。', '窺探居民壽命、因果、前世的能力。每天回復 1 次（最多 3 次）。'],
  gl_b: ['天秤', '天秤'], gl_b_d: ['世界の光と闇のバランス。右（闇）に傾くと魔物が増え、魔王が早く目覚めます。', '世界光與暗的平衡。往右（暗）偏時魔物增加，魔王會提早覺醒。'],
  gl_f: ['信仰力', '信仰力'], gl_f_d: ['神の力の元。祈りに応えるとふえ、神力を使うとへります。上限は150。', '神力量的來源。回應祈禱會增加，使用神力會減少，上限 150。'],
  gl_r: ['転生の河', '轉生之河'], gl_r_d: ['死んだ魂が1〜3年待つ場所。待ち終わると、赤ちゃんとして生まれ変わります。', '死去的靈魂等待 1～3 年的地方。等待結束後，會以嬰兒身分重生。'],
  gl_s: ['魔王の席', '魔王之席'], gl_s_d: ['いちばん重い闇を背負った魂が座る椅子。魔王ノクタールが、いま座っています。', '背負最沉重黑暗的靈魂所坐的位子。目前坐在上面的是魔王諾克塔爾。'],
  gl_h: ['史官', '史官'], gl_h_d: ['世界のできごとを書き残す人。ソウジュという名前の住人のひとり。', '負責記錄世界大小事的人，是名叫蒼壽的居民之一。'],
  god_hint_mercy: ['はじめてにおすすめ。恩寵が安く、住人が神を信じやすい。', '建議新手使用。恩寵便宜，居民也比較信任神。'], god_hint_order: ['安定型。神託が安く、結果がぶれにくい。', '穩定型。神諭便宜，結果比較不會大起大落。'], god_hint_chaos: ['上級者向け。試煉と勢力操作が安いが、大成功も曲解も出やすい。', '進階玩家用。試煉與勢力操作便宜，但大成功與曲解都容易出現。'],
  god_diff: ['むずかしさ', '難度'],
  end_sum: ['この局のまとめ', '這一局的摘要'], end_try: ['つぎに試すなら', '下次可以試試'],
  es_victory: ['冒険者たちが魔王を倒し、世界は同じ重さの秤にもどりました。', '冒險者打倒了魔王，世界回到了平衡的天秤。'], es_doom: ['魔王に町をほろぼされ、世界は闇に沈みました。', '小鎮被魔王毀滅，世界沉入黑暗。'], es_godleft: ['祈りに応えなくなり、神は世界から去りました。', '沒有回應祈禱，神離開了這個世界。'], es_stagnant: ['光に傾きすぎて、何も起きない世界になりました。', '太偏向光，世界變成了什麼都不會發生的地方。'],
  es_acts: ['あなたは神力を {c} 回使い、{a} 件の祈りに応えました。', '你使用了 {c} 次神力，回應了 {a} 件祈禱。'], es_world: ['あなたが見ていない間にも、死者 {d} 人、誕生 {b} 人、依頼 {q} 件が起きました。', '在你沒看到的地方，也發生了 {d} 人死亡、{b} 人誕生、{q} 件委託。'],
  et_victory: ['眷顧者をふやして転生を追いかけると、物語がもっと深くなります。', '多指定幾位眷顧者並追蹤他們的轉生，故事會更有深度。'], et_doom: ['魔王が目覚める前に、天秤を光に保ち、冒険者を育ててみましょう。信仰力をためておくと決戦で助けになります。', '試著在魔王覺醒前，把天秤維持在光側並培育冒險者。存下信仰力，決戰時會有幫助。'],
  et_godleft: ['祈りに応えると信仰力が回復します。まずは「おすすめ」の神力から使ってみましょう。', '回應祈禱能恢復信仰力。先從「建議」的神力開始用用看。'], et_stagnant: ['光に傾いたら、試煉や勢力操作（闇）で世界を動かしてみましょう。', '偏光太多時，可用試煉或勢力操作（暗）讓世界動起來。'],
  ev_log: ['できごとの記録', '事件記錄'], goto: ['見にいく', '前往'],
});
Screens.helpPage = 0;
Screens.help = function (page) {
  if (page !== undefined) this.helpPage = page;
  if (this.stack.length && this.stack[this.stack.length - 1].name === 'help') { this.rerender(); return; }
  this.push('help', () => {
    const pg = this.helpPage; const L = li();
    let body;
    if (pg === 0) body = [h('div', { style: 'white-space:pre-wrap' }, pr(S.help_b1))];
    else if (pg === 1) body = POWERS.map(p => h('div', { style: 'margin-bottom:8px' }, h('b', { class: 'gold' }, p.n[L] + '　' + t('tip_cost') + ' ' + p.cost), h('div', null, t('tipp_' + p.id)), h('div', { class: 'blu' }, t('tip_good') + '：' + t('tipg_' + p.id)), h('div', { class: 'red' }, t('tip_risk') + '：' + t('tipr_' + p.id))));
    else if (pg === 2) body = [h('div', { style: 'white-space:pre-wrap' }, pr(S.help_b3)), PRAYER_KINDS.map(k => h('div', null, h('b', { class: 'gold' }, t('pk_' + k) + '：'), t('tipk_' + k)))];
    else if (pg === 3) body = [h('div', { style: 'white-space:pre-wrap' }, pr(S.help_b4))];
    else if (pg === 4) body = [h('div', { style: 'white-space:pre-wrap' }, pr(S.help_b5))];
    else if (pg === 5) body = [h('div', { style: 'white-space:pre-wrap' }, pr(S.help_b6))];
    else if (pg === 6) body = [h('div', { style: 'white-space:pre-wrap' }, pr(S.help_b7))];
    else body = GODS.map(g => h('div', { style: 'margin-bottom:10px' }, h('b', { class: 'gold' }, g.n[L]), h('div', null, t('god_hint_' + g.id)), godLines(g).map(l => h('div', { class: 'grn' }, '・' + l))));
    const tabs = h('div', { style: 'display:flex;flex-wrap:wrap;gap:5px;margin:4px 0 8px' }, [1, 2, 3, 4, 5, 6, 7, 8].map((n, i) => h('span', { class: 'btn' + (pg === i ? ' on' : ''), style: 'font-size:13px', onclick: () => { Screens.helpPage = i; Screens.rerender(); } }, t('help_p' + n))));
    return this.win(150, 50, 980, 620, [h('h3', null, t('help_title')), tabs, h('div', { class: 'scroll', style: 'height:430px;font-size:16px;line-height:1.7;padding-right:8px' }, body),
      h('div', { style: 'display:flex;gap:10px;justify-content:center;margin-top:10px' }, h('span', { class: 'btn', onclick: () => Screens.glossary() }, t('glossary')), h('span', { class: 'btn', onclick: () => { Screens.closeAll(); if (G && Game.scene === 'play') Tut.start(); } }, t('tut_replay')), h('span', { class: 'btn', onclick: () => Screens.pop() }, t('close')))], 'glass');
  });
};
Screens.glossary = function () {
  this.push('glossary', () => this.win(190, 60, 900, 600, [h('h3', null, t('gl_title')), h('div', { class: 'scroll', style: 'height:490px;font-size:16px;line-height:1.6' }, ['k', 'g', 't', 'e', 'b', 'f', 'r', 's', 'h'].map(k => h('div', { style: 'margin-bottom:10px' }, h('b', { class: 'gold' }, t('gl_' + k)), h('div', null, t('gl_' + k + '_d'))))), h('div', { style: 'text-align:center;margin-top:8px' }, h('span', { class: 'btn', onclick: () => Screens.pop() }, t('close')))], 'glass'));
};
Screens.eventLog = function () {
  this.push('evlog', () => this.win(190, 60, 900, 600, [h('h3', null, t('ev_log')), h('div', { class: 'scroll', style: 'height:490px;font-size:15px;line-height:1.5' }, UI.feed.slice().reverse().map(f => h('div', { class: 'card', style: 'display:flex;justify-content:space-between;padding:1px 8px;margin-bottom:2px;color:' + f.col, onclick: () => { if (f.pos) { Screens.closeAll(); Render.centerOn(f.pos.x, f.pos.y); Game.follow = 0; } } }, h('span', null, (f.pos ? '▸ ' : '・') + f.text), h('span', { class: 'sm' }, dateStr(f.tick, G.gen))))), h('div', { style: 'text-align:center;margin-top:8px' }, h('span', { class: 'btn', onclick: () => Screens.pop() }, t('close')))], 'glass'));
};
/* pause menu with extra entries */
Screens.pause = function () {
  if (this.stack.length && this.stack[this.stack.length - 1].name === 'pause') return;
  this.push('pause', () => this.win(470, 110, 340, 0, [h('h3', { style: 'text-align:center' }, t('pause')), h('div', { class: 'menu' },
    h('span', { class: 'btn', onclick: () => Screens.pop() }, t('resume')),
    h('span', { class: 'btn', onclick: () => Screens.saveMenu(true) }, t('save')), h('span', { class: 'btn', onclick: () => Screens.saveMenu(false) }, t('load')),
    h('span', { class: 'btn', onclick: () => Screens.help() }, t('help')), h('span', { class: 'btn', onclick: () => Screens.glossary() }, t('glossary')), h('span', { class: 'btn', onclick: () => Screens.eventLog() }, t('ev_log')),
    h('span', { class: 'btn', onclick: () => { Screens.closeAll(); Tut.start(); } }, t('tut_replay')),
    h('span', { class: 'btn', onclick: () => Screens.settings() }, t('settings')),
    h('span', { class: 'btn', onclick: () => Screens.confirm(t('confirm_title'), () => { Screens.closeAll(); Game.toTitle(); }) }, t('to_title')))], 'glass'));
  Snd.se('cursor');
};
/* settings with names / theme / auto-slow / advisor */
Screens.settings = function () {
  const st = Game.settings;
  this.push('settings', () => {
    const sl = (label, key) => h('div', { style: 'margin:6px 0;display:flex;align-items:center;gap:10px' }, h('span', { style: 'width:170px' }, label), h('input', { type: 'range', min: 0, max: 100, value: Math.round(st[key] * 100), oninput: e => { st[key] = e.target.value / 100; Snd.vol[key] = st[key]; Snd.applyVol(); Game.saveSettings(); } }));
    const opts = (label, list, cur, set) => h('div', { style: 'margin:6px 0;display:flex;gap:8px;align-items:center' }, h('span', { style: 'width:170px' }, label), list.map(o => h('span', { class: 'btn' + (cur === o[0] ? ' on' : ''), onclick: () => { set(o[0]); Game.saveSettings(); Screens.rerender(); } }, o[1])));
    return this.win(280, 70, 720, 0, [h('h3', null, t('settings')), sl(t('volume_bgm'), 'bgm'), sl(t('volume_se'), 'se'),
      opts(t('language'), [['ja', '日本語'], ['zh', '繁體中文']], LANG, v => Game.setLang(v)),
      opts(t('def_speed'), SPEEDS.map((v, i) => [i, '×' + v]), st.speed, v => { st.speed = v; Game.speedIdx = v; }),
      opts(t('text_speed'), [[1, '▸'], [2, '▸▸'], [3, '▸▸▸']], st.text, v => { st.text = v; }),
      opts(t('names_label'), [['key', t('names_opt_key')], ['all', t('names_opt_all')], ['none', t('names_opt_none')]], st.names || 'key', v => { st.names = v; }),
      opts(t('theme_label'), [['black', t('theme_black')], ['blue', t('theme_blue')]], st.theme || 'black', v => { st.theme = v; Game.applyTheme(); }),
      opts(t('fullui_label'), [[true, t('on')], [false, t('off')]], st.fullUI === true, v => { st.fullUI = v; }),
      opts(t('autoslow_label'), [[true, t('on')], [false, t('off')]], st.autoSlow !== false, v => { st.autoSlow = v; }),
      opts(t('advisor_label'), [[true, t('on')], [false, t('off')]], st.advisor !== false, v => { st.advisor = v; }),
      opts(t('mute') + ' (M)', [[true, t('on')], [false, t('off')]], !!Snd.muted, v => { Snd.setMuted(v); }),
      h('div', { style: 'text-align:center;margin-top:12px' }, h('span', { class: 'btn big', onclick: () => Screens.pop() }, t('close')))], 'glass');
  });
};
/* god select with play-style hints */
const _godSelect0 = Screens.godSelect;
Screens.godSelect = function () {
  _godSelect0.call(this);
  const cards = this.scr.querySelectorAll('.win'); const stars = { mercy: '★☆☆', order: '★★☆', chaos: '★★★' };
  GODS.forEach((g, i) => { const c = cards[i]; if (!c) return; const box = c.firstChild; if (!box) return; const b = box.querySelector('div[style*="margin-top:14px"]'); const hint = h('div', { class: 'grn', style: 'font-size:14px;line-height:1.45;margin:6px 8px;min-height:44px' }, t('god_hint_' + g.id)); const diff = h('div', { class: 'gold', style: 'font-size:15px' }, t('god_diff') + '　' + stars[g.id]); if (b) { box.insertBefore(diff, b); box.insertBefore(hint, b); } });
};
