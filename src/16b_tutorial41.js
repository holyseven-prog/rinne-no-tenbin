/* ================= V4.1-A12: "3 lessons for an apprentice god" (practice world), duties list, first-use hints,
   "What's this?" mode, 4-page picture guide, easy mode, Japanese ruby ================= */
Object.assign(S, {
  l1_card: ['あなたは神さまです。村の人を見守ります。', '你是神。你要守護村裡的人。'],
  l1_a: ['光っている人が祈っています。その人をクリックしよう。', '發光的人正在祈禱。點一下那個人。'],
  l1_b: ['下のボタンが神力（神のわざ）です。「{rec}」をえらぼう。', '下面是神力（神的法術）。選「{rec}」。'],
  l1_wrong: ['まずは「{rec}」をえらんでみよう。', '先選「{rec}」試試看。'],
  l1_c: ['もう一度、祈っている人をクリックしよう。', '再點一下祈禱的人。'],
  l1_dir: ['どれか1つえらべばOKです。', '選一個就可以。'],
  l1_done: ['うまくいくと信仰力（神の力のもと）がふえます。', '成功時，信仰力（神的能量）會增加。'],
  l2_card: ['次は、村をまもる練習です。', '接下來，練習守護村莊。'],
  l2_a: ['上のらんは次の攻防（魔物との戦い）です。数字は勝てる見こみです。', '上面是下一場攻防（和魔物作戰）。數字是獲勝機率。'],
  l2_b: ['「備え（B）」をおして、村の守りを開こう。', '按「備戰（B）」打開村莊防衛。'],
  l2_c: ['★がついた行動の「行う」をおそう。', '按有★的行動的「執行」。'],
  l2_d: ['勝率が {a}% から {b}% に上がった！「閉じる」でもどろう。', '勝率從 {a}% 升到 {b}%！按「關閉」回去。'],
  l3_card: ['魔物がやって来た！戦いは3回に分かれています。', '魔物來了！戰鬥分成 3 段。'],
  l3_a: ['緑のボタンで、1回ずつ手助けしよう。', '用綠色按鈕，每段幫一次。'],
  l3_b: ['戦後報告です。あなたの手助けの効果が書いてあります。', '這是戰後報告。上面有你的幫助效果。'],
  l3_c: ['勇者は世界に1人だけ。左の勇者カードで見られます。', '勇者只有 1 位。左邊的卡片可以看。'],
  gr_a: ['最後は評定会（神さまの会議）です。目標を2つえらぼう。', '最後是評定會（神的會議）。選 2 個目標。'],
  gr_card: ['卒業です！ほんとうの世界へ行こう。', '畢業了！前往真正的世界吧。'],
  gr_easy: ['かんたんモードで始める', '用簡單模式開始'], gr_norm: ['ふつうで始める', '用一般模式開始'], gr_easy_d: ['ふつうの祈りは自動でこたえます。', '一般祈禱會自動回應。'],
  lesson: ['第{n}課', '第 {n} 課'], lesson_t: [['祈りを聞く', '守る準備', '魔物に勝つ', '卒業'], ['聽見祈禱', '守護村莊', '打贏魔物', '畢業']], stamp: ['できた！', '學會了！'],
  tut_skip2: ['スキップ', '跳過'], tut_retake: ['この課をやり直す', '重上這一課'], tut_lessons: ['練習のやり直し', '重上課程'], tut_retake_q: ['練習用の小さな世界で、もう一度学びます。いまのゲームはオートセーブします。', '會在練習用的小世界重新學習；目前的遊戲會自動存檔。'],
  // duties
  du_title: ['神務（いまやること）', '神務（現在要做的事）'], du_next: ['★ 次：{n}（{l}）', '★ 下一場：{n}（{l}）'], du_ok: ['神務達成：{n}', '神務完成：{n}'],
  du_answer: ['祈りに1つこたえる', '回應 1 個祈禱'], du_prep: ['備えを1つする（B）', '做 1 次備戰（B）'], du_p50: ['「いま」の勝率を50%以上に', '讓「現在」勝率超過 50%'],
  du_chron: ['史官の書いた物語を読む（H）', '看看史官寫了什麼（H）'], du_listen: ['祈りを「傾聴」する', '「傾聽」一個祈禱'], du_follow: ['だれか1人を追いかける（N）', '追蹤 1 個人（N）'],
  du_counsel: ['顧問に聞いてみる（G）', '問問顧問（G）'], du_eye: ['神眼で人の心を見る（X）', '用神眼看人的內心（X）'], du_castle: ['魔王城をのぞきに行く（東の端）', '去看看魔王城（東邊盡頭）'],
  du_hero: ['勇者カードを見る', '看看勇者卡'], du_souls: ['魂の河を見る（S）', '看看靈魂之河（S）'], du_fav: ['★で気になる人を見守る', '用★守護在意的人'],
  // hints
  hint_ok: ['わかった', '知道了'], hint_reset: ['ヒントをもう一度見せる', '重新顯示所有提示'], later: ['あとで教えます', '之後會教你'],
  hi_duty: ['ここに「いまやること」が出ます。全部やると神格が上がります。', '這裡會出現「現在要做的事」。完成會提升神格。'],
  hi_skip: ['⏭で、次の大事なことまで早送りできます。', '用⏭可以快轉到下一件大事。'],
  hi_awe: ['魔物があなたをこわがると「畏怖」がたまります。畏怖も力に使えます。', '魔物怕你時會累積「畏怖」。畏怖也能當神力用。'],
  hi_card: ['時代の兆しです。おす・とめる・ほうっておく、をえらびます。', '這是時代徵兆。選推動、阻止或放置。'],
  hi_godlv: ['神格が上がりました。戦いで新しい手助けが使えます。', '神格升級了。戰鬥中能用新的幫助。'],
  hi_listen: ['「傾聴」は信仰を使いません。祈りが1日長くなります。', '「傾聽」不花信仰。祈禱會延長 1 天。'],
  hi_adv: ['魂への干渉と勢力操作が使えるようになりました。', '干涉靈魂和勢力操作開放了。'],
  // what's this / guide
  q_menu: ['ヘルプ', '說明'], q_what: ['これなに？（クリックで説明）', '這是什麼？（點一下就說明）'], q_guide: ['遊び方（絵で見る）', '怎麼玩（圖解）'], q_detail: ['くわしい説明', '詳細說明'], q_pick: ['説明してほしい所をクリックしてね', '點一下想知道的地方'],
  q_person: ['{n}（{j}）', '{n}（{j}）'], q_person_d: ['村の人です。クリックで選ぶと、神力を使えます。', '這是村民。點選後可以使用神力。'], q_bld_d: ['村の建物です。人がここで働いたり休んだりします。', '這是村裡的建築。居民在這裡工作或休息。'], q_mon_d: ['魔物です。冒険者がたおすと村が安全になります。', '這是魔物。冒險者打倒牠，村莊就會安全。'], q_ground: ['地面', '地面'], q_ground_d: ['ドラッグすると地図を動かせます。', '拖曳可以移動地圖。'],
  g_t: [['あなたは神さま', '神力で助ける', '村をまもる', '物語になる'], ['你是神', '用神力幫忙', '守護村莊', '變成故事']],
  g_1: ['あなたは村を見守る神さまです。人々はあなたに祈ります。光っている人が祈っている人です。', '你是守護村莊的神。人們會向你祈禱。發光的人正在祈禱。'],
  g_2: ['下の5つのボタンが神力です。祈りにあうものをえらんで、その人をクリックします。うまくいくと信仰力がふえます。', '下面 5 個按鈕是神力。選合適的，再點那個人。成功時信仰力會增加。'],
  g_3: ['10年のあいだに魔物が5回せめてきます。上のらんで次の戦いと勝てる見こみが見られます。Bで備え、戦いでは1回ずつ手助けできます。', '10 年內魔物會進攻 5 次。上方欄可看下一場和勝率。按 B 備戰，戰鬥中每段可幫一次。'],
  g_4: ['あなたのしたことは、史官が物語に書きます。Hで物語の本が読めます。あなたの選んだ道が、ひとつの物語になります。', '你做的事，史官會寫成故事。按 H 可以讀故事書。你選的路，會變成一個故事。'],
  easy_mode: ['かんたんモード', '簡單模式'], easy_d: ['ふつうの祈りを自動でこたえ、戦いも少しやさしくなります。', '一般祈禱自動回應，戰鬥也稍微簡單。'],
});
/* ---------- Japanese ruby (furigana) for tutorial / duties / hints ---------- */
const RUBY = { 信仰力: 'しんこうりょく', 神力: 'しんりょく', 神格: 'しんかく', 攻防: 'こうぼう', 魔物: 'まもの', 勝率: 'しょうりつ', 評定会: 'ひょうじょうかい', 会議: 'かいぎ', 目標: 'もくひょう', 卒業: 'そつぎょう', 練習: 'れんしゅう', 戦後報告: 'せんごほうこく', 効果: 'こうか', 勇者: 'ゆうしゃ', 世界: 'せかい', 最後: 'さいご', 行動: 'こうどう', 史官: 'しかん', 物語: 'ものがたり', 顧問: 'こもん', 神眼: 'しんがん', 魔王城: 'まおうじょう', 傾聴: 'けいちょう', 畏怖: 'いふ', 時代: 'じだい', 兆: 'きざ', 神務: 'しんむ', 達成: 'たっせい', 早送: 'はやおく', 数字: 'すうじ', 手助: 'てだす', 神: 'かみ', 村: 'むら', 人: 'ひと', 見守: 'みまも', 光: 'ひか', 祈: 'いの', 力: 'ちから', 次: 'つぎ', 戦: 'たたか', 勝: 'か', 見: 'み', 備: 'そな', 守: 'まも', 開: 'ひら', 行: 'おこな', 上: 'うえ', 閉: 'と', 回: 'かい', 分: 'わ', 緑: 'みどり', 書: 'か', 左: 'ひだり', 下: 'した', 一度: 'いちど', 度: 'ど', 来: 'き', 大事: 'だいじ', 東: 'ひがし', 端: 'はし', 読: 'よ', 心: 'こころ', 魂: 'たましい', 河: 'かわ', 気: 'き', 使: 'つか', 長: 'なが', 新: 'あたら', 干渉: 'かんしょう', 勢力操作: 'せいりょくそうさ', 自動: 'じどう', 少: 'すこ', 年: 'ねん', 道: 'みち', 本: 'ほん', 選: 'えら', 間: 'あいだ', 地図: 'ちず', 動: 'うご', 建物: 'たてもの', 働: 'はたら', 休: 'やす', 冒険者: 'ぼうけんしゃ', 安全: 'あんぜん', 地面: 'じめん', 説明: 'せつめい', 所: 'ところ', 全部: 'ぜんぶ', 上が: ['上', 'あ'], 上げ: ['上', 'あ'], 上の: ['上', 'うえ'], 下の: ['下', 'した'] };
const RUBY_KEYS = Object.keys(RUBY).sort((a, b) => b.length - a.length);
function rb(s) { // -> HTML string; kanji words get <ruby> when the setting is on (Japanese only)
  const esc = x => x.replace(/&/g, '&amp;').replace(/</g, '&lt;'); if (LANG !== 'ja' || Game.settings.ruby === false) return esc(s);
  let o = '', i = 0; while (i < s.length) { const k = RUBY_KEYS.find(w => s.startsWith(w, i)); if (k) { const v = RUBY[k]; if (Array.isArray(v)) o += '<ruby>' + esc(v[0]) + '<rt>' + v[1] + '</rt></ruby>' + esc(k.slice(v[0].length)); else o += '<ruby>' + esc(k) + '<rt>' + v + '</rt></ruby>'; i += k.length; } else { o += esc(s[i]); i++; } } return o;
}
/* ---------- illustration cards (drawn by code) ---------- */
function tutArt(kind) {
  const cv = document.createElement('canvas'); cv.width = 64; cv.height = 64; cv.style.cssText = 'width:96px;height:96px;image-rendering:pixelated;float:left;margin:0 10px 4px 0;border:2px solid #f2f4ff;background:#24304a'; const c = cv.getContext('2d'); c.imageSmoothingEnabled = false;
  if (kind === 'god') { const g = c.createRadialGradient(32, 26, 4, 32, 26, 30); g.addColorStop(0, '#fff6c0'); g.addColorStop(1, '#24304a'); c.fillStyle = g; c.fillRect(0, 0, 64, 64); c.fillStyle = '#ffd860'; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; c.fillRect(32 + Math.cos(a) * 20 - 1, 26 + Math.sin(a) * 20 - 1, 3, 3); } c.fillStyle = '#ffe9a0'; c.beginPath(); c.arc(32, 26, 11, 0, 7); c.fill(); c.fillStyle = '#5a3a10'; c.fillRect(28, 24, 2, 2); c.fillRect(35, 24, 2, 2); c.fillRect(29, 30, 7, 1); c.fillStyle = '#3c8030'; c.fillRect(0, 52, 64, 12); for (let i = 0; i < 4; i++) { c.fillStyle = ['#c04434', '#2f5fc0', '#3a8a40', '#d0802c'][i]; c.fillRect(4 + i * 15, 46, 10, 6); c.fillStyle = '#e6d6b0'; c.fillRect(5 + i * 15, 52, 8, 5); } }
  else if (kind === 'pray') { c.fillStyle = '#3c8030'; c.fillRect(0, 48, 64, 16); const hh = (G && G.humans.find(x => x.alive && x.age >= 18)) || null; if (hh) c.drawImage(humanSprite(hh, 0, 6), 16, 8, 32, 48); const g = c.createLinearGradient(0, 0, 0, 40); g.addColorStop(0, 'rgba(255,240,160,0)'); g.addColorStop(1, 'rgba(255,240,160,0.8)'); c.fillStyle = g; c.fillRect(28, 0, 8, 40); }
  else if (kind === 'shield') { c.fillStyle = '#181020'; c.fillRect(14, 8, 36, 44); c.fillStyle = '#3a6ad0'; c.fillRect(16, 10, 32, 30); c.beginPath(); c.moveTo(16, 40); c.lineTo(32, 54); c.lineTo(48, 40); c.fill(); c.fillStyle = '#ffd860'; c.fillRect(30, 14, 4, 30); c.fillRect(22, 22, 20, 4); c.fillStyle = '#8ab8f8'; c.fillRect(18, 12, 6, 2); }
  else if (kind === 'monster') { c.fillStyle = '#3a2a4a'; c.fillRect(0, 48, 64, 16); try { c.drawImage(monsterSprite({ type: 'goblin', cad: -1 }, 0), 8, 14, 48, 48); } catch (e) { } c.fillStyle = '#ff6040'; c.fillRect(50, 6, 4, 14); c.fillRect(50, 23, 4, 4); }
  else if (kind === 'book') { c.fillStyle = '#5a3a22'; c.fillRect(8, 14, 48, 38); c.fillStyle = '#f4e8c0'; c.fillRect(11, 16, 20, 33); c.fillRect(33, 16, 20, 33); c.fillStyle = '#7a6a50'; for (let i = 0; i < 6; i++) { c.fillRect(13, 20 + i * 5, 16, 1); c.fillRect(35, 20 + i * 5, 16, 1); } c.fillStyle = '#c04434'; c.fillRect(31, 10, 2, 44); }
  else if (kind === 'crown') { c.fillStyle = '#5a3a10'; c.fillRect(10, 22, 44, 24); c.fillStyle = '#ffd040'; c.fillRect(12, 30, 40, 14); for (let i = 0; i < 3; i++) { c.fillRect(12 + i * 18, 18, 6, 14); } c.fillStyle = '#e83a3a'; c.fillRect(30, 34, 4, 4); c.fillStyle = '#fff4b0'; c.fillRect(14, 32, 10, 2); }
  return cv;
}
/* ---------- lessons ---------- */
Tut.build = function () {
  const E = UI.el, T = this; const rec = () => { const p = G.prayers.find(q => q.id === T.pid); const pid = p ? PRAYER_ANS[p.kind][0] : 'grace'; return { pid, idx: POWERS.findIndex(x => x.id === pid) }; };
  const recN = () => POWERS[rec().idx].n[li()];
  T.steps = [
    { id: 'l1card', les: 1, art: 'god', text: () => t('l1_card'), next: true, noHole: true },
    { id: 'l1a', les: 1, art: 'pray', text: () => t('l1_a'), target: () => T.humanRect(), cond: () => Game.selId === T.hid },
    { id: 'l1b', les: 1, text: () => T.wrong ? fmt(t('l1_wrong'), { rec: recN() }) : fmt(t('l1_b'), { rec: recN() }), target: () => T.rect(E.powBtns[rec().idx]), cond: () => Game.power === rec().pid },
    { id: 'l1c', les: 1, text: () => Game.modals.indexOf('menu') >= 0 ? t('l1_dir') : t('l1_c'), target: () => T.humanRect(), cond: () => G.stats.casts > 0, back: () => !Game.power && G.stats.casts === 0 && Game.modals.indexOf('menu') < 0 },
    { id: 'l1done', les: 1, text: () => t('l1_done'), target: () => T.rect(E.faithWin), next: true, stamp: true },
    { id: 'l2card', les: 2, art: 'shield', text: () => t('l2_card'), next: true, noHole: true },
    { id: 'l2a', les: 2, text: () => t('l2_a'), target: () => T.rect(E.warBar), next: true },
    { id: 'l2b', les: 2, text: () => t('l2_b'), target: () => T.rect(E.warBar), cond: () => Game.modals.indexOf('defense') >= 0, enter: () => { T.p0 = pct(winForecast().now); T.preps0 = G.stats.preps || 0; G.faith = Math.max(G.faith, 60); } },
    { id: 'l2c', les: 2, text: () => t('l2_c'), modalBox: true, cond: () => (G.stats.preps || 0) > T.preps0, enter: () => { if (Game.modals.indexOf('defense') < 0) Screens.defense(); } },
    { id: 'l2d', les: 2, text: () => fmt(t('l2_d'), { a: T.p0, b: Math.max(T.p0 + 1, pct(winForecast().now)) }), modalBox: true, stamp: true, cond: () => Game.modals.indexOf('defense') < 0, enter: () => { Snd.se('level'); Render.flash = 0.25; } },
    { id: 'l3card', les: 3, art: 'monster', text: () => t('l3_card'), next: true, noHole: true, onNext: () => { const a = nextAssault(); if (a) { a.t = G.tick + 1; a.omen = 3; } T.freeze = false; } },
    { id: 'l3a', les: 3, text: () => t('l3_a'), modalBox: true, cond: () => G.battle && G.battle.done },
    { id: 'l3b', les: 3, text: () => t('l3_b'), modalBox: true, cond: () => !G.battle && Game.modals.indexOf('battle') < 0, enter: () => { T.freeze = true; } },
    { id: 'l3c', les: 3, art: 'crown', text: () => t('l3_c'), target: () => T.rect(E.heroCard), next: true, stamp: true },
    { id: 'gra', les: 4, text: () => t('gr_a'), modalBox: true, cond: () => G.council && G.council.done, enter: () => { if (!G.council || G.council.done) openCouncil(0); setTimeout(() => { if (Game.modals.indexOf('council') < 0) Screens.council(); }, 60); } },
    { id: 'grcard', les: 4, art: 'book', text: () => t('gr_card'), noHole: true, grad: true, stamp: true },
  ];
};
/* the tutorial now runs in its own small practice world */
const _tutStart0 = Tut.start;
Tut.start = function (fromLesson) {
  if (!G || G.ending) return;
  if (!G.tutMode) { // build the practice world (fixed seed, ~18 people, first assault after one season)
    const god = G.god || 'mercy'; Screens.closeAll(); newGame({ seed: 4113, god, lang: LANG, tut: true }); Game.afterNew(false); G.tutMode = true;
    const a = G.assaults[0]; a.t = G.tick + SEASON_T + TICK_DAY; a.omen = 2; a.adRef = defenseScore(); G.awakenTick = G.assaults[4].t;
  }
  _tutStart0.call(this); this.lessonFrom = fromLesson || 1;
  if (fromLesson && fromLesson > 1) { const k = this.steps.findIndex(s => s.les === fromLesson); if (k > 0) { if (fromLesson >= 2) G.stats.casts = Math.max(1, G.stats.casts); this.i = k; this.show(); } }
};
const _tutShow0 = Tut.show; Tut.show = function () {
  const s = this.steps[this.i]; if (!s) return; _tutShow0.call(this);
  // header with lesson number, illustration, ruby text, stamp
  const head = this.box.querySelector('h3'); if (head) head.textContent = fmt(t('lesson'), { n: Math.min(s.les, 3) }) + '　' + S.lesson_t[li()][s.les - 1];
  if (s.les === 4 && head) head.textContent = S.lesson_t[li()][3];
  if (s.art) { const art = tutArt(s.art); this.txt.parentNode.insertBefore(art, this.txt); }
  this._rbSig = ''; this.layout(true);
  if (s.stamp) { const st = h('div', { class: 'tut-stamp' }, t('stamp')); this.box.appendChild(st); Snd.se('level'); }
  if (s.grad) { const row = h('div', { style: 'display:flex;gap:8px;justify-content:center;margin-top:8px;clear:both' }, h('span', { class: 'btn on', onclick: () => Tut.graduate(true) }, t('gr_easy')), h('span', { class: 'btn', onclick: () => Tut.graduate(false) }, t('gr_norm'))); this.box.appendChild(row); this.box.appendChild(h('div', { class: 'sm', style: 'text-align:center' }, t('gr_easy_d'))); }
  // the old "next" button calls next(); route onNext hooks
  const nb = Array.from(this.box.querySelectorAll('.btn.on')).find(b => b.textContent === t('next') || b.textContent === t('close')); if (nb && s.onNext) { const nb2 = nb.cloneNode(true); nb2.onclick = () => { s.onNext(); this.next(); }; nb.replaceWith(nb2); }
};
const _tutLayout0 = Tut.layout; Tut.layout = function (force) {
  _tutLayout0.call(this, force); const s = this.steps[this.i]; if (!s) return;
  const txt = s.text(); const sig = txt + LANG + (Game.settings.ruby === false); if (sig !== this._rbSig) { this._rbSig = sig; this.txt.innerHTML = rb(txt); }
  if (s.modalBox && Game.modals.length) { this.box.style.left = '840px'; this.box.style.top = '560px'; }
};
Tut.graduate = function (easy) {
  const god = G.god || 'mercy'; this.stop(true); Game.settings.easy = !!easy; Game.saveSettings();
  Screens.closeAll(); newGame({ god, seed: (Date.now() ^ (Math.random() * 1e9)) & 0xffffff, lang: LANG, easy: !!easy, learn: true }); Game.afterNew(false); G.learn = true;
};
const _tutStop0 = Tut.stop; Tut.stop = function (done) { const wasTut = G && G.tutMode; _tutStop0.call(this, done); if (wasTut && done && this.i < this.steps.length - 1 && G.tutMode) { /* skipped: leave the practice world for a real game */ const god = G.god || 'mercy'; Screens.closeAll(); newGame({ god, seed: (Date.now() ^ (Math.random() * 1e9)) & 0xffffff, lang: LANG, learn: true }); Game.afterNew(false); } };
/* freeze: the tutorial controls time (except while the practice battle plays) */
const _tutUpdate0 = Tut.update; Tut.update = function () { _tutUpdate0.call(this); if (this.on && this.freeze) Game.paused = false; };
/* ---------- duties (A12-3) ---------- */
const DUTIES = {
  answer: { snap: () => G.stats.answered, done: s => G.stats.answered > s },
  prep: { snap: () => G.stats.preps || 0, done: s => (G.stats.preps || 0) > s },
  p50: { snap: () => 0, done: () => { const f = winForecast(); return f && f.now >= 0.5; } },
  chron: { free: 1, snap: () => (Game.opened || {}).chron || 0, done: s => ((Game.opened || {}).chron || 0) > s },
  listen: { free: 1, snap: () => G.stats.listens || 0, done: s => (G.stats.listens || 0) > s },
  follow: { free: 1, snap: () => 0, done: () => !!Game.follow },
  counsel: { free: 1, snap: () => (Game.opened || {}).counsel || 0, done: s => ((Game.opened || {}).counsel || 0) > s },
  eye: { free: 1, snap: () => 0, done: () => Game.power === 'eye' },
  castle: { free: 1, snap: () => 0, done: () => Render.cam.x + 320 > PLATEAU_X0 * TS },
  hero: { free: 1, snap: () => Game.heroLook || 0, done: s => (Game.heroLook || 0) > s },
  souls: { free: 1, yr: 2, snap: () => (Game.opened || {}).souls || 0, done: s => ((Game.opened || {}).souls || 0) > s },
  fav: { snap: () => G.favored.length, done: s => G.favored.length > s },
};
const DUTY_ORDER = ['answer', 'prep', 'p50', 'chron', 'listen', 'follow', 'counsel', 'eye', 'castle', 'hero', 'souls', 'fav'];
function dutyTick() {
  if (!G || !G.assaults || G.tutMode) return; const D = G.duty = G.duty || { act: [], done: {}, snap: {} };
  for (const id of D.act.slice()) { const d = DUTIES[id]; if (d.done(D.snap[id])) { D.act.splice(D.act.indexOf(id), 1); D.done[id] = G.tick; godXp(2); if (d.free) { G.faith = Math.min(G.faithMax, G.faith + 3); faithLog('duty', 3); } UI.pushFeed(fmt(t('du_ok'), { n: t('du_' + id) }), '#a8ffc0', null, false); Snd.se('ok'); UI.dutySig = ''; } }
  const yr = yearOf(G.tick); while (D.act.length < 3) { const nx = DUTY_ORDER.find(id => !D.done[id] && D.act.indexOf(id) < 0 && (!DUTIES[id].yr || yr >= DUTIES[id].yr)); if (!nx) break; D.act.push(nx); D.snap[nx] = DUTIES[nx].snap(); UI.dutySig = ''; }
}
UI.refreshDuty = function () {
  const R = this.goalR; if (!R || !G || !G.assaults || G.tutMode) { if (R && R.duty) R.duty.style.display = 'none'; return; } if (!R.duty) { R.duty = h('div', { style: 'margin:2px 0 4px' }); R.body.insertBefore(R.duty, R.body.firstChild); Tip.attach(R.duty, () => [t('du_title'), t('hi_duty')]); }
  R.duty.style.display = 'block'; const a = nextAssault(); const D = G.duty || { act: [] }; const sig = (a ? a.id + Math.floor((a.t - G.tick) / SEASON_T) : '') + D.act.join() + LANG; if (sig === this.dutySig) return; this.dutySig = sig; R.duty.innerHTML = '';
  if (a) R.duty.appendChild(h('div', { style: 'font-size:13px;color:#ffe9a0', html: rb(fmt(t('du_next'), { n: ASSAULT_DEF[a.id].short[li()], l: fmtLeft(a.t - G.tick).replace(t('war_in') + ' ', '') })) }));
  D.act.forEach(id => R.duty.appendChild(h('div', { class: 'sm', style: 'line-height:1.35', html: '□ ' + rb(t('du_' + id)) })));
  if (R.text) R.text.style.display = 'none';
};
/* ---------- first-use hints (A12-4) ---------- */
const HINTS = [
  { id: 'duty', ok: () => G.assaults && !G.tutMode && G.duty && G.duty.act.length, el: () => UI.goalR && UI.goalR.duty },
  { id: 'skip', ok: () => { const a = nextAssault(); return a && a.t - G.tick > TICK_YEAR / 2 && G.tick > START_TICK + 2 * TICK_DAY; }, el: () => UI.el.skipBtn },
  { id: 'listen', ok: () => openPrayers().length > 0 && G.tick > START_TICK + TICK_DAY, el: () => UI.el.prayList },
  { id: 'card', ok: () => (G.cards || []).length > 0, el: () => UI.el.cardWin },
  { id: 'godlv', ok: () => (G.godLv || 1) >= 2, el: () => UI.el.warBar },
  { id: 'awe', ok: () => G.awe >= 30 && yearOf(G.tick) >= 1, el: () => UI.el.aweNum && UI.el.aweNum.parentNode },
  { id: 'adv', ok: () => G.learn && yearOf(G.tick) >= 2, el: () => UI.el.powWin },
];
UI.hintTick = function () {
  const busy = !G || G.tutMode || (Game.tut && Game.tut.on) || Game.modals.length || Game.scene !== 'play'; if (this.hintEl) this.hintEl.style.display = busy ? 'none' : 'block'; if (busy) return; const seen = Game.settings.hintsSeen = Game.settings.hintsSeen || {};
  if (this.hintEl && this.hintEl.isConnected) return;
  for (const H of HINTS) { if (seen[H.id]) continue; let ok = false; try { ok = H.ok(); } catch (e) { } if (!ok) continue; const el = H.el(); if (!el || !el.isConnected || el.offsetParent === null) continue;
    const sr = $('stage').getBoundingClientRect(), r = el.getBoundingClientRect(), s = Scale.s; const ex = (r.left - sr.left) / s, ey = (r.top - sr.top) / s, ew = r.width / s, eh = r.height / s;
    const bw = 300; const x = clamp(ex + ew / 2 - bw / 2, 6, 1274 - bw); let y = ey + eh + 10; if (y > 600) y = ey - 96;
    this.hintEl = h('div', { class: 'win glass hint-bubble', style: `left:${x}px;top:${y}px;width:${bw}px;padding:6px 10px;z-index:30;border-color:#ffe060` }, h('div', { style: 'font-size:14px;line-height:1.5', html: '💡 ' + rb(t('hi_' + H.id)) }), h('div', { style: 'text-align:right;margin-top:4px' }, h('span', { class: 'btn', style: 'font-size:12px', onclick: () => { seen[H.id] = 1; Game.saveSettings(); this.hintEl.remove(); this.hintEl = null; } }, t('hint_ok'))));
    $('ui').appendChild(this.hintEl); el.classList.add('hint-glow'); setTimeout(() => el.classList.remove('hint-glow'), 4000); break; }
};
/* locked advanced powers for new players (until year 2) */
UI.lockTick = function () {
  if (!G || !this.el.powBtns) return; const lock = (G.learn || G.easy) && yearOf(G.tick) < (G.easy ? 10 : 2);
  ['soul', 'force'].forEach(pid => { const b = this.el.powBtns[POWERS.findIndex(p => p.id === pid)]; if (!b) return; b.classList.toggle('locked', lock); if (lock && !b._lk) { b._lk = 1; Tip.attach(b, () => lock ? [t('later')] : null); } });
  if (this.el.aweNum && this.el.aweNum.parentNode) this.el.aweNum.parentNode.style.visibility = (G.easy && yearOf(G.tick) < 10) ? 'hidden' : 'visible';
  $('ui').classList.toggle('easy', !!G.easy);
};
/* ---------- "What's this?" mode + picture guide (A12-5) ---------- */
const _tipAttach0 = Tip.attach; Tip.attach = function (el, fn) { el._tipFn = fn; return _tipAttach0.call(this, el, fn); };
Screens.helpMenu = function () {
  this.push('helpmenu', () => this.win(440, 180, 400, 0, [h('h3', { style: 'text-align:center' }, t('q_menu')), h('div', { class: 'menu' },
    h('span', { class: 'btn', onclick: () => { Screens.pop(); Game.whatMode = true; document.body.style.cursor = 'help'; UI.pushFeed(t('q_pick'), '#a8e0ff', null, true); } }, '❓ ' + t('q_what')),
    h('span', { class: 'btn', onclick: () => { Screens.pop(); Screens.guide(0); } }, '🖼 ' + t('q_guide')),
    h('span', { class: 'btn', onclick: () => { Screens.pop(); Screens.help(); } }, '📖 ' + t('q_detail')),
    h('span', { class: 'btn', onclick: () => { Screens.pop(); Screens.lessonMenu(); } }, '🎓 ' + t('tut_lessons')),
    h('span', { class: 'btn', onclick: () => Screens.pop() }, t('close')))], 'glass'));
};
Screens.lessonMenu = function () {
  this.push('lessons', () => this.win(420, 170, 440, 0, [h('h3', { style: 'text-align:center' }, t('tut_lessons')), h('div', { class: 'sm', style: 'margin:4px 0 8px' }, t('tut_retake_q')), h('div', { class: 'menu' },
    ...[1, 2, 3].map(n => h('span', { class: 'btn', onclick: () => { try { Save.write('auto'); } catch (e) { } Screens.closeAll(); Game.settings.tutDone = false; Tut.start(n); } }, fmt(t('lesson'), { n }) + '　' + S.lesson_t[li()][n - 1])),
    h('span', { class: 'btn', onclick: () => Screens.pop() }, t('close')))], 'glass'));
};
Screens.guide = function (pg) {
  const L = li(); const arts = ['god', 'pray', 'shield', 'book'];
  this.push('guide', () => { const art = tutArt(arts[pg]); art.style.cssText = 'width:192px;height:192px;image-rendering:pixelated;border:2px solid #f2f4ff;background:#24304a;display:block;margin:6px auto';
    return this.win(340, 90, 600, 0, [h('h3', { style: 'text-align:center' }, (pg + 1) + ' / 4　' + S.g_t[L][pg]), art, h('div', { style: 'font-size:16px;line-height:1.7;margin:6px 10px', html: rb(t('g_' + (pg + 1))) }),
      h('div', { style: 'display:flex;justify-content:space-between;margin-top:8px' }, h('span', { class: 'btn' + (pg ? '' : ' dis'), onclick: () => { if (pg) { Screens.pop(); Screens.guide(pg - 1); } } }, '◀'), h('span', { class: 'btn', onclick: () => Screens.pop() }, t('close')), h('span', { class: 'btn' + (pg < 3 ? '' : ' dis'), onclick: () => { if (pg < 3) { Screens.pop(); Screens.guide(pg + 1); } } }, '▶'))], 'glass'); });
};
if (typeof document !== 'undefined') document.addEventListener('mousedown', ev => {
  if (!Game.whatMode) return; ev.preventDefault(); ev.stopPropagation(); Game.whatMode = false; document.body.style.cursor = '';
  let el = ev.target, lines = null; while (el && el !== document.body) { if (el._tipFn) { const v = typeof el._tipFn === 'function' ? el._tipFn() : el._tipFn; if (v) { lines = Array.isArray(v) ? v.slice(0, 3) : [v]; break; } } el = el.parentNode; }
  if (!lines && ev.target.tagName === 'CANVAS' && G) { const sr = $('stage').getBoundingClientRect(), s = Scale.s; const wx = (ev.clientX - sr.left) / s / 2 + Render.cam.x, wy = (ev.clientY - sr.top) / s / 2 + Render.cam.y; const hh = pickEntityAt(wx, wy);
    if (hh) lines = [fmt(t('q_person'), { n: hh.name[li()], j: JOBS[hh.job].n[li()] }), t('q_person_d')];
    else { const tx = Math.floor(wx / TS), ty = Math.floor(wy / TS); const b = W.blds.find(b => tx >= b.x && tx < b.x + b.w && ty >= b.y && ty < b.y + b.h); const m = G.monsters.find(m => m.alive && !m.dormant && Math.hypot(m.x * TS + 8 - wx, m.y * TS + 8 - wy) < 14);
      if (m) lines = [MONS[m.type] ? MONS[m.type].n[li()] : '?', t('q_mon_d')]; else if (b) lines = [PLACES[b.kind] ? PLACES[b.kind][li()] : b.kind, t('q_bld_d')]; else lines = [t('q_ground'), t('q_ground_d')]; } }
  if (lines) { const d = $('tip'); d.innerHTML = ''; lines.forEach((l, i) => d.appendChild(h('div', i === 0 ? { class: 'gold', style: 'font-weight:bold' } : {}, l))); d.style.display = 'block'; const sr = $('stage').getBoundingClientRect(), s = Scale.s; d.style.left = clamp((ev.clientX - sr.left) / s - 120, 6, 1000) + 'px'; d.style.top = clamp((ev.clientY - sr.top) / s + 14, 4, 640) + 'px'; setTimeout(() => Tip.hide(), 5000); }
}, true);
/* ---------- wire-up: count opened screens, run duties / hints / locks every frame ---------- */
const _push41 = Screens.push; Screens.push = function (name) { Game.opened = Game.opened || {}; Game.opened[name] = (Game.opened[name] || 0) + 1; return _push41.apply(this, arguments); };
const _rf41 = UI.refreshWar; UI.refreshWar = function () { _rf41.apply(this, arguments); try { dutyTick(); this.refreshDuty(); this.hintTick(); this.lockTick(); } catch (e) { ERRS.push('duty:' + e.message); } };
const _hcc = heroCardClick; heroCardClick = function () { Game.heroLook = (Game.heroLook || 0) + 1; _hcc(); };
