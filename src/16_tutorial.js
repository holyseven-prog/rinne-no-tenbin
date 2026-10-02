/* ================= interactive tutorial (R5-1, R5-2) ================= */
Object.assign(S, {
  tut_s1: ['あなたは「神」です。この世界の人々は、あなたに祈ります。光っている人が、いま祈っています。クリックして選んでみましょう。', '你是「神」。這個世界的居民會向你祈禱。頭上發光的人正在祈禱，點他一下看看。'],
  tut_s2: ['右の「祈り」カードが、その人の願いです。種類（病気・飢えなど）と、急ぎ度（下の線）が書いてあります。「おすすめ」は、いちばん合う神力です。', '右邊的「祈禱」卡片就是他的願望。上面有種類（疾病、飢餓等）與急迫程度（下方的線）。「建議」是最適合的神力。'],
  tut_s3: ['下の5つが神力です。マウスを乗せると、効果と成功率が見られます。まずは「{rec}」を選びましょう。（数字キー {key} でもOK）', '下面的 5 個是神力。滑鼠停上去會顯示效果與成功率。先選「{rec}」吧。（按數字鍵 {key} 也可以）'],
  tut_s4: ['次に、さっきの光っている人をクリックして使います。（神託を選んだときは、向きを選ぶ小さな窓が出ます）', '接著，點擊剛才發光的那個人來施放。（選神諭時，會跳出選擇方向的小視窗）'],
  tut_s5: ['結果は4段階です。大成功・成功・曲解（神意が誤解された）・失敗。上の画面に、理由と信仰力の変化が出ています。', '結果分 4 級：大成功、成功、曲解（神意被誤解了）、失敗。上方的畫面會顯示原因與信仰力的變化。'],
  tut_s6: ['あなたのしたことは、史官が物語に書き残します。「史官の書庫」を開いてみましょう。（Hキー）', '你做的事，史官會寫成故事。打開「史官書庫」看看吧。（按 H 鍵）'],
  tut_s6b: ['ここに、世界のできごとが物語になって並びます。読んだら「閉じる」を押してください。', '這裡會把世界發生的事寫成故事。讀完後按「關閉」。'],
  tut_s7: ['迷ったら「顧問」に聞きましょう。成功率とリスクだけを教えてくれます。（Gキー）', '猶豫時就問「顧問」。她只會告訴你成功率與風險。（按 G 鍵）'],
  tut_s7b: ['顧問は、できることを成功率つきで並べます。決めるのはあなたです。閉じてください。', '顧問會把能做的事連同成功率列出來，決定的是你。看完請關閉。'],
  tut_s8: ['上の「天秤」は、世界の光と闇のバランスです。闇に傾くと魔物が増え、魔王が早く目覚めます。左の「もくひょう」で進み具合が見られます。', '上方的「天秤」代表世界的光暗平衡。偏向暗側會讓魔物增加、魔王提早覺醒。左邊的「目標」可以看進度。'],
  tut_s9: ['ここで時間の速さを変えます。⏸ は一時停止、×1〜×64 は速さです。最初は ×1 がおすすめ。大事なことが起きると、自動で ×1 に戻ります。', '在這裡調整時間速度。⏸ 是暫停，×1～×64 是速度。剛開始建議用 ×1。發生重要事件時會自動降回 ×1。'],
  tut_s10: ['これで基本はおしまいです。マウスを乗せると説明が出ます。「?」で遊び方、「☰」でメニューが開きます。さあ、世界を見守りましょう！', '基本操作就是這些。滑鼠停在任何東西上都會顯示說明。「?」可開啟玩法說明，「☰」是選單。那麼，開始守望這個世界吧！'],
  tut_replay: ['チュートリアルをもう一度', '重看教學'], tut_step: ['{i} / {n}', '{i} / {n}'],
});
const Tut = {
  on: false, i: 0, freeze: true, hid: 0, pid: 0, steps: [],
  rect(el) { if (!el || !el.isConnected) return null; const sr = $('stage').getBoundingClientRect(), r = el.getBoundingClientRect(), s = Scale.s; return { x: (r.left - sr.left) / s, y: (r.top - sr.top) / s, w: r.width / s, h: r.height / s }; },
  humanRect() {
    const hh = hById(this.hid); if (!hh) return null; const R = Render, cx = R.cam.x, cy = R.cam.y; const sx = (hh.x * TS + 8 - cx) * 2, top = (hh.y * TS - 8 - cy) * 2;
    if (sx < 20 || sx > 1260 || top < 70 || top > 600) { R.centerOn(hh.x, hh.y); return this.humanRect(); }
    return { x: sx - 30, y: top - 22, w: 60, h: 82 };
  },
  union(a, b) { if (!a || !b) return a || b; const x = Math.min(a.x, b.x), y = Math.min(a.y, b.y), x2 = Math.max(a.x + a.w, b.x + b.w), y2 = Math.max(a.y + a.h, b.y + b.h); return { x, y, w: x2 - x, h: y2 - y }; },
  build() {
    const E = UI.el, T = this;
    const rec = () => { const p = G.prayers.find(q => q.id === T.pid); const pid = p ? PRAYER_ANS[p.kind][0] : 'grace'; return { pid, idx: POWERS.findIndex(x => x.id === pid) }; };
    T.steps = [
      { id: 'intro', text: () => t('tut_s1'), target: () => T.humanRect(), cond: () => Game.selId === T.hid },
      { id: 'card', text: () => t('tut_s2'), target: () => T.rect(E.prayWin), next: true },
      { id: 'pick', text: () => fmt(t('tut_s3'), { rec: POWERS[rec().idx].n[li()], key: rec().idx + 1 }), target: () => T.rect(E.powWin), cond: () => !!Game.power && Game.power !== 'eye' },
      { id: 'cast', text: () => t('tut_s4'), target: () => T.humanRect(), cond: () => G.stats.casts > 0, back: () => !Game.power && G.stats.casts === 0 },
      { id: 'result', text: () => t('tut_s5'), target: () => T.rect(E.banner), next: true, enter: () => { if (E.banner.style.display === 'none') UI.banner('…', t('tut_s5')); } },
      { id: 'chron', text: () => t('tut_s6'), target: () => T.rect(E.chronBtn), cond: () => Game.modals.indexOf('chron') >= 0 },
      { id: 'chron2', text: () => t('tut_s6b'), noHole: true, cond: () => Game.modals.indexOf('chron') < 0 },
      { id: 'counsel', text: () => t('tut_s7'), target: () => T.rect(E.counselBtn), cond: () => Game.modals.indexOf('counsel') >= 0 },
      { id: 'counsel2', text: () => t('tut_s7b'), noHole: true, cond: () => Game.modals.indexOf('counsel') < 0 },
      { id: 'balance', text: () => t('tut_s8'), target: () => T.union(T.rect(E.balWin), T.rect(E.goalWin)), next: true },
      { id: 'speed', text: () => t('tut_s9'), target: () => T.rect(E.timeWin), next: true },
      { id: 'end', text: () => t('tut_s10'), noHole: true, next: true, last: true },
    ];
  },
  start() {
    if (!G || G.ending) return; this.on = true; this.freeze = true; this.i = 0; Game.tut = this; Game.paused = false; Game.power = null; Game.selId = 0; Render.sel = 0; Game.speedIdx = 0;
    Screens.closeAll();
    // guarantee a prayer to work with
    const near = h => Math.hypot(h.x - PLAZA.x, h.y - PLAZA.y);
    let p = openPrayers().filter(q => { const hh = hById(q.hid); return hh && hh.x > 20 && hh.x < 40; }).sort((a, b) => b.urg - a.urg)[0];
    if (!p) {
      const c = G.humans.filter(h => h.alive && h.age >= 18 && !h.inside && h.x > 20 && h.x < 40 && !hasPrayer(h)).sort((a, b) => near(a) - near(b)); const hh = c.length ? c[0] : G.humans.find(x => x.alive && x.age >= 18);
      hh.hp = Math.min(hh.hp, hh.maxHp * 0.45); hh.prayCd = 0; p = addPrayer(hh, 'sick', 0.8);
    }
    G.flags.firstPrayer = 1; this.hid = p.hid; this.pid = p.id; Render.centerOn(hById(p.hid).x, hById(p.hid).y); Game.follow = 0;
    this.build();
    if (!$('tut')._ready) { $('tut')._ready = 1; }
    $('tut').style.display = 'block'; this.show(); UI.lastPray = ''; UI.refresh(true);
  },
  stop(done) {
    this.on = false; Game.tut = null; const d = $('tut'); d.style.display = 'none'; d.innerHTML = ''; Game.paused = false;
    if (done !== false) { Game.settings.tutDone = true; Game.saveSettings(); }
    UI.banner && (UI.el.banner.style.display = 'none'); UI.bannerT = 0; UI.refresh(true);
  },
  next() { this.i++; if (this.i >= this.steps.length) { this.stop(true); return; } Snd.se('ok'); this.show(); },
  show() {
    const s = this.steps[this.i]; if (!s) return; if (s.enter) s.enter();
    const d = $('tut'); d.innerHTML = '';
    this.hole = h('div', { class: 'hole' }); this.box = h('div', { class: 'box win glass', style: 'padding:8px 12px' });
    this.txt = h('div', { style: 'font-size:16px;line-height:1.55;color:#fff' });
    const btns = h('div', { style: 'margin-top:8px;display:flex;justify-content:space-between;align-items:center' }, h('span', { class: 'sm' }, fmt(t('tut_step'), { i: this.i + 1, n: this.steps.length })),
      h('span', null, s.next ? h('span', { class: 'btn on', style: 'margin-right:6px', onclick: () => this.next() }, s.last ? t('close') : t('next')) : null, h('span', { class: 'btn', onclick: () => this.stop(true) }, t('skip'))));
    this.box.append(h('h3', null, t('tut_title')), this.txt, btns); d.append(this.hole, this.box); this.layout(true);
  },
  layout(force) {
    const s = this.steps[this.i]; if (!s) return; const r = !s.noHole && !Game.modals.length ? s.target && s.target() : null;
    this.txt.textContent = s.text();
    if (r) { this.hole.style.display = 'block'; this.hole.style.left = (r.x - 6) + 'px'; this.hole.style.top = (r.y - 6) + 'px'; this.hole.style.width = (r.w + 12) + 'px'; this.hole.style.height = (r.h + 12) + 'px'; }
    else this.hole.style.display = 'none';
    let bx, by; const bw = 420;
    if (r) { const cxm = r.x + r.w / 2, cym = r.y + r.h / 2; if (r.y > 380 && r.w > 300) { bx = clamp(cxm - bw / 2, 10, 1270 - bw); by = r.y - 200; } else if (cxm < 640) { bx = r.x + r.w + 24; by = clamp(cym - 70, 70, 540); } else { bx = r.x - bw - 24; by = clamp(cym - 70, 70, 540); } if (bx + bw > 1270 || bx < 4) { bx = clamp(cxm - bw / 2, 10, 1270 - bw); by = r.y > 360 ? r.y - 200 : r.y + r.h + 20; } }
    else { bx = 430; by = Game.modals.length ? 640 : 280; if (Game.modals.length) bx = 430; }
    this.box.style.left = Math.round(bx) + 'px'; this.box.style.top = Math.round(clamp(by, 4, 600)) + 'px';
  },
  update() {
    if (!this.on) return; const s = this.steps[this.i]; if (!s) return;
    if (s.back && s.back()) { this.i = Math.max(0, this.i - 1); this.show(); return; }
    if (s.cond && s.cond()) { this.next(); return; }
    this.layout();
  },
  afterCast(res) {
    // make the first chapter about this very act so the chronicle step has something to read
    const ev = G.events.slice().reverse().find(e => !e.used && (e.type === 'divine_act' || e.type === 'miracle') && e.t >= G.tick - 2);
    if (ev) { const sc = sceneFor(ev); if (sc) { makeChapter(sc, ev); G.lastChapTick = G.tick; } else ev.used = true; }
    G.tut.prayer = true; UI.lastPray = '';
  },
};
Game.tut = null;
