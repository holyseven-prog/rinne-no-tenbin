/* ================= screens: title / god / opening / menus / chronicle / ending ================= */
Object.assign(S, {
  boot: ['クリック または キーを押して開始', '點擊或按下任意鍵開始'],
  god_stats: ['初期信仰力 {f}', '初始信仰力 {f}'],
  op1: ['世界には、天秤がある。光と闇が、重さを分け合うための。', '這個世界有一座天秤。光與暗在上面分擔彼此的重量。'],
  op2: ['人は祈り、神は聞く。リュミエの町では今日も、人々がパンを焼き、剣を研ぎ、誰かの無事を願っている。', '人們祈禱，神傾聽。琉米耶鎮今天也一樣，人們烤著麵包、磨著劍，為某個人祈求平安。'],
  op3: ['生きとし生けるものは、死ぬと魂の河へ下り、因果の重さに応じて、再び生まれ変わる。', '凡是活著的存在，死後都會順著靈魂之河而下，依因果的重量，再度轉生。'],
  op4: ['しかし、東の台地には、魔王の席がある。闇が満ちるとき、誰かが、そこに座る。', '然而東邊的高地上，有一把魔王之席。當黑暗盈滿，就會有人坐上去。'],
  op5: ['あなたは、神。奇跡を起こす力も、世界を救う剣も持たない。あるのは、祈りを聞く耳と、わずかな信仰力だけ。', '你是神。你沒有施展奇蹟的力量，也沒有拯救世界的劍。你擁有的，只有聆聽祈禱的耳朵，與微薄的信仰力。'],
  help_title: ['操作説明', '操作說明'],
  help_body: [
    '■ 目的：住人（CPU）の暮らしを見守り、祈りに応え、光と闇の天秤を保ちながら、魔王討伐へ導く。\n■ 画面右の「祈り」カードをクリック → 下の神力（1〜5）で応える。住人を直接クリックしても使える。\n■ 神力：神託(1) 恩寵(2) 試煉(3) 魂への干渉(4) 勢力操作(5)。成否は 大成功／成功／曲解／失敗 の4段階。同種の連発は疲労で効きにくくなる。\n■ 信仰力は祈りの成就で増え、干渉で減る。0が長く続くと神は去る。\n■ 天秤は光に傾きすぎても、闇に傾きすぎてもよくない。\n■ 住人は死ぬと転生する。★眷顧者に指定すると魂の河で追跡できる。\n■ キー：WASD/矢印=カメラ  Space=停止  Q/E=速度  1–5=神力  N=次の注目  H=書庫  R=住人  S=魂の河  G=顧問  M=消音  F=全画面  Esc=メニュー',
      '■ 目的：守望居民（CPU）的生活，回應祈禱，維持光暗天秤，引導他們討伐魔王。\n■ 點擊畫面右側的「祈禱」卡片 → 用下方神力（1～5）回應。也可直接點擊居民施放。\n■ 神力：神諭(1) 恩寵(2) 試煉(3) 干涉靈魂(4) 勢力操作(5)。結果分 大成功／成功／曲解／失敗 四階段。連續使用同種神力會疲勞而變差。\n■ 信仰力因祈禱獲得回應而增加，因干涉而消耗。長期為0，神將離去。\n■ 天秤過度偏光或偏暗都不好。\n■ 居民死後會轉生。指定★眷顧者可在靈魂之河追蹤。\n■ 按鍵：WASD/方向鍵=鏡頭  Space=暫停  Q/E=速度  1–5=神力  N=下一個關注  H=書庫  R=居民  S=靈魂之河  G=顧問  M=靜音  F=全螢幕  Esc=選單'],

});
const Screens = {
  stack: [], scr: null,
  init() { this.scr = h('div', { id: 'scr', style: 'position:absolute;left:0;top:0;width:1280px;height:720px;display:none' }); $('stage').insertBefore(this.scr, $('ui')); },
  clearScr() { this.scr.innerHTML = ''; this.scr.style.display = 'none'; },
  /* ---- modal stack ---- */
  push(name, build, onKey, opts) {
    this.stack.push({ name, build, onKey, opts: opts || {} }); this.render();
  },
  pop() { if (!this.stack.length) return; const top = this.stack.pop(); if (top.opts.onClose) top.opts.onClose(); this.render(); },
  closeAll() { while (this.stack.length) { const top = this.stack.pop(); if (top.opts.onClose) top.opts.onClose(); } this.render(); },
  closeMenu() { while (this.stack.length && this.stack[this.stack.length - 1].name === 'menu') this.stack.pop(); this.render(); },
  render() {
    const m = $('modal'); Game.modals = this.stack.map(s => s.name);
    if (!this.stack.length) { m.style.display = 'none'; m.innerHTML = ''; Snd.setPaused(false); return; }
    const top = this.stack[this.stack.length - 1]; m.style.display = 'block'; m.innerHTML = ''; m.style.background = top.opts.clear ? 'transparent' : 'rgba(0,0,0,.55)';
    m.appendChild(top.build()); Snd.setPaused(this.stack.some(s => s.name === 'pause'));
  },
  rerender() { if (this.stack.length) this.render(); },
  key(e) { if (!this.stack.length) return false; const top = this.stack[this.stack.length - 1]; if (top.onKey && top.onKey(e) === true) return true; if (e.key === 'Escape' && !top.opts.noEsc) { Snd.se('cancel'); this.pop(); return true; } return true; },
  win(x, y, w, hgt, kids, cls, extra) { return h('div', { class: 'win ' + (cls || ''), style: `left:${x}px;top:${y}px;width:${w}px;${hgt ? 'height:' + hgt + 'px;' : ''}${extra || ''}` }, kids); },
  menu(items, title) {
    const mx = clamp(Game.mouse.x - 90, 20, 1100), my = clamp(Game.mouse.y - 20, 20, 540);
    this.push('menu', () => { const w = this.win(mx, my, 230, 0, [title ? h('h3', null, title) : null, h('div', { class: 'menu' }, items.map(it => h('span', { class: 'btn', style: 'font-size:15px', onclick: () => { it[1](); } }, it[0])), h('span', { class: 'btn', style: 'font-size:13px;opacity:.8', onclick: () => Screens.pop() }, t('back')))]); return w; });
  },
  /* ---- title ---- */
  boot() {
    Game.scene = 'boot'; UI.show(false); const s = this.scr; s.style.display = 'block'; s.innerHTML = '';
    s.appendChild(h('div', { style: 'position:absolute;inset:0;background:#000;display:flex;align-items:center;justify-content:center;font-size:22px;color:#ffe9a0;cursor:pointer', onclick: () => Game.startFromBoot() }, h('div', { class: 'fade' }, t('boot'))));
  },
  title() {
    Game.scene = 'title'; UI.show(false); this.closeAll(); const s = this.scr; s.style.display = 'block'; s.innerHTML = '';
    const hasSave = [0, 1, 2, 3].some(i => Store.get('rinne_tenbin_v1_slot' + i));
    const menu = [
      [t('new_game'), () => { Snd.se('ok'); this.godSelect(); }],
      [t('continue'), () => { if (!hasSave) { Snd.se('fail'); return; } this.saveMenu(false); }, !hasSave],
      [t('settings'), () => this.settings()],
      [t('language'), () => { Game.setLang(LANG === 'ja' ? 'zh' : 'ja'); }],
    ];
    s.appendChild(h('div', { style: 'position:absolute;inset:0;background:linear-gradient(rgba(0,0,30,.35),rgba(0,0,30,0) 40%,rgba(0,0,30,.5))' }));
    s.appendChild(h('div', { class: 'title-logo', style: 'position:absolute;left:0;width:1280px;top:84px;text-align:center' }, t('title')));
    s.appendChild(h('div', { class: 'gold', style: 'position:absolute;left:0;width:1280px;top:206px;text-align:center;letter-spacing:8px;font-size:18px;text-shadow:2px 2px 0 #0a1a6e' }, t('title_sub')));
    const w = this.win(500, 380, 280, 0, h('div', { class: 'menu' }, menu.map((m, i) => h('span', { class: 'btn big' + (m[2] ? ' dis' : ''), onclick: m[1] }, m[0]))));
    s.appendChild(w);
    s.appendChild(h('div', { class: 'sm', style: 'position:absolute;left:0;width:1280px;bottom:16px;text-align:center;text-shadow:1px 1px 0 #000' }, '© Rinne no Tenbin prototype — all assets generated by code'));
  },
  godSelect() {
    Game.scene = 'godsel'; const s = this.scr; s.innerHTML = ''; s.style.display = 'block';
    s.appendChild(h('div', { style: 'position:absolute;inset:0;background:rgba(0,0,40,.72)' }));
    s.appendChild(h('div', { class: 'gold', style: 'position:absolute;left:0;width:1280px;top:46px;text-align:center;font-size:30px;text-shadow:2px 2px 0 #0a1a6e' }, t('god_select')));
    GODS.forEach((g, i) => {
      const cv = h('canvas', { width: 66, height: 66, style: 'width:132px;height:132px;image-rendering:pixelated;display:block;margin:0 auto 8px' }); drawEmblem(cv, g.id);
      const card = this.win(70 + i * 380, 130, 340, 440, h('div', { style: 'text-align:center' }, cv, h('div', { style: 'font-size:26px;font-weight:bold', class: 'gold' }, g.n[li()]), h('div', { class: 'sm', style: 'margin:8px 0;font-size:14px;line-height:1.5;min-height:48px' }, g.d[li()]),
        h('div', { style: 'text-align:left;font-size:14px;line-height:1.6;margin:6px 10px;min-height:110px' }, h('div', null, fmt(t('god_stats'), { f: g.faith0 })), godLines(g).map(l => h('div', { class: 'grn' }, '・' + l))),
        h('div', { style: 'margin-top:14px' }, h('span', { class: 'btn big', onclick: () => { Game.pendingGod = g.id; Snd.se('ok'); this.opening(); } }, t('god_ok'))), h('div', { class: 'sm', style: 'margin-top:6px' }, h('span', { class: 'kbd' }, String(i + 1)))), 'glass', 'cursor:pointer');
      s.appendChild(card);
    });
    s.appendChild(h('span', { class: 'btn', style: 'position:absolute;left:30px;top:660px', onclick: () => this.title() }, t('back')));
  },
  /* ---- opening cut-scenes ---- */
  opening() {
    Game.scene = 'opening'; Game.op = { i: 0, c: 0, t: 0, typed: 0 }; const s = this.scr; s.innerHTML = ''; s.style.display = 'block';
    s.appendChild(h('div', { style: 'position:absolute;left:0;top:0;width:1280px;height:720px;cursor:pointer', onclick: () => this.opAdvance() }));
    s.appendChild(this.opWin = this.win(110, 540, 1060, 130, [h('div', { id: 'optext', style: 'font-size:22px;line-height:1.7;min-height:80px' }), h('div', { class: 'sm', style: 'text-align:right' }, t('opening_hint'))], 'glass'));
    s.appendChild(h('span', { class: 'btn', style: 'position:absolute;right:20px;top:16px', onclick: () => this.opEnd() }, t('skip')));
    Snd.playSong('opening');
  },
  opAdvance() {
    const o = Game.op; const full = t('op' + (o.i + 1));
    if (o.typed < full.length) { o.typed = full.length; return; }
    if (o.i >= 4) { this.opEnd(); return; } o.i++; o.typed = 0; o.t = 0; Snd.se('page');
  },
  opEnd() { Game.beginPlay(Game.pendingGod || 'mercy'); },
  /* ---- help / pause / settings / save ---- */
  help() {
    this.push('help', () => this.win(190, 70, 900, 560, [h('h3', null, t('help_title')), h('div', { style: 'white-space:pre-wrap;font-size:15px;line-height:1.65;margin-top:6px' }, pr(S.help_body)), h('div', { style: 'text-align:center;margin-top:12px' }, h('span', { class: 'btn', onclick: () => Screens.pop() }, t('close')))], 'glass'));
  },
  pause() {
    if (this.stack.length && this.stack[this.stack.length - 1].name === 'pause') return;
    this.push('pause', () => this.win(470, 150, 340, 0, [h('h3', { style: 'text-align:center' }, t('pause')), h('div', { class: 'menu' },
      h('span', { class: 'btn', onclick: () => Screens.pop() }, t('resume')),
      h('span', { class: 'btn', onclick: () => Screens.saveMenu(true) }, t('save')), h('span', { class: 'btn', onclick: () => Screens.saveMenu(false) }, t('load')),
      h('span', { class: 'btn', onclick: () => Screens.settings() }, t('settings')), h('span', { class: 'btn', onclick: () => Screens.help() }, t('help')),
      h('span', { class: 'btn', onclick: () => Screens.confirm(t('confirm_title'), () => { Screens.closeAll(); Game.toTitle(); }) }, t('to_title')))], 'glass'));
    Snd.se('cursor');
  },
  confirm(msg, yes) {
    this.push('confirm', () => this.win(390, 250, 500, 0, [h('div', { style: 'font-size:17px;line-height:1.6;margin:6px 0 14px' }, msg), h('div', { style: 'text-align:center;display:flex;gap:20px;justify-content:center' }, h('span', { class: 'btn big', onclick: () => { Screens.pop(); yes(); } }, t('yes')), h('span', { class: 'btn big', onclick: () => Screens.pop() }, t('no')))], 'glass'));
  },
  settings() {
    const st = Game.settings;
    this.push('settings', () => {
      const sl = (label, key) => h('div', { style: 'margin:8px 0;display:flex;align-items:center;gap:10px' }, h('span', { style: 'width:130px' }, label), h('input', { type: 'range', min: 0, max: 100, value: Math.round(st[key] * 100), oninput: e => { st[key] = e.target.value / 100; Snd.vol[key] = st[key]; Snd.applyVol(); Game.saveSettings(); } }));
      return this.win(320, 130, 640, 0, [h('h3', null, t('settings')), sl(t('volume_bgm'), 'bgm'), sl(t('volume_se'), 'se'),
        h('div', { style: 'margin:8px 0;display:flex;gap:8px;align-items:center' }, h('span', { style: 'width:130px' }, t('language')), h('span', { class: 'btn' + (LANG === 'ja' ? ' on' : ''), onclick: () => Game.setLang('ja') }, '日本語'), h('span', { class: 'btn' + (LANG === 'zh' ? ' on' : ''), onclick: () => Game.setLang('zh') }, '繁體中文')),
        h('div', { style: 'margin:8px 0;display:flex;gap:8px;align-items:center' }, h('span', { style: 'width:130px' }, t('def_speed')), SPEEDS.map((v, i) => h('span', { class: 'btn' + (st.speed === i ? ' on' : ''), onclick: () => { st.speed = i; Game.speedIdx = i; Game.saveSettings(); Screens.rerender(); } }, '×' + v))),
        h('div', { style: 'margin:8px 0;display:flex;gap:8px;align-items:center' }, h('span', { style: 'width:130px' }, t('text_speed')), [1, 2, 3].map(v => h('span', { class: 'btn' + (st.text === v ? ' on' : ''), onclick: () => { st.text = v; Game.saveSettings(); Screens.rerender(); } }, ['', '▸', '▸▸', '▸▸▸'][v]))),
        h('div', { style: 'margin:8px 0;display:flex;gap:8px;align-items:center' }, h('span', { style: 'width:130px' }, t('mute') + ' (M)'), h('span', { class: 'btn' + (Snd.muted ? ' on' : ''), onclick: () => { Snd.setMuted(!Snd.muted); Screens.rerender(); } }, Snd.muted ? t('on') : t('off'))),
        h('div', { style: 'text-align:center;margin-top:14px' }, h('span', { class: 'btn big', onclick: () => Screens.pop() }, t('close')))], 'glass');
    });
  },
  saveMenu(saving) {
    this.push('save', () => {
      const rows = [0, 1, 2, 3].map(i => {
        if (saving && i === 0) return null;
        const meta = Save.meta(i);
        return h('div', { class: 'card', style: 'display:flex;justify-content:space-between;align-items:center;padding:6px 10px;font-size:15px', onclick: () => { if (saving) { Save.write(i); UI.toast(t('saved')); Screens.pop(); } else if (meta) { Screens.closeAll(); Game.loadSlot(i); } else Snd.se('fail'); } },
          h('span', null, i === 0 ? t('autosave') : fmt(t('slot'), { n: i })), h('span', { class: 'sm' }, meta ? meta.text : t('no_slot')));
      });
      return this.win(300, 170, 680, 0, [h('h3', null, saving ? t('save') : t('load')), rows, h('div', { style: 'text-align:center;margin-top:10px' }, h('span', { class: 'btn', onclick: () => Screens.pop() }, t('back')))], 'glass');
    });
  },
  /* ---- selection helpers ---- */
  focusHuman(id) { const hh = hById(id); if (!hh) return; Game.selId = id; Render.sel = id; Render.centerOn(hh.x, hh.y); Game.follow = id; UI.lastPray = ''; UI.refresh(true); },
  prayerClick(pid) {
    const p = G.prayers.find(x => x.id === pid); if (!p) return; const hh = hById(p.hid);
    if (Game.power && Game.power !== 'eye') { castOn(Game.power, p.hid); return; }
    this.focusHuman(p.hid);
  },
  eyeOn(id) {
    const r = useEye(hById(id)); if (!r) { UI.toast(t('faith_short'), '#ff8a8a'); return; }
    Game.power = null; Snd.se('power4'); UI.refresh(true);
    const hh = hById(id), k = r.karma;
    this.push('eye', () => this.win(400, 150, 480, 0, [h('h3', null, t('eye') + ' — ' + hh.name[li()]), h('div', { style: 'line-height:1.7;font-size:15px;margin-top:6px' },
      h('div', null, t('eye_death') + ' ' + r.deathPct + '%'), h('div', null, t('karma') + ' ' + ['good', 'evil', 'deed', 'attach'].map(x => t('k_' + x) + k[x].toFixed(1)).join('  ')), h('div', null, t('eye_soul') + ' ' + r.lives + ' / ' + r.bonds), h('div', null, t('eye_hint_' + r.hint)),
      r.echo ? h('div', { class: 'gold' }, t('eye_echo') + ' ' + r.echo.name[li()]) : null, h('div', { class: 'sm' }, t('eye_pray') + ' ' + (r.prayerSoon ? t('yes') : t('no')))), h('div', { style: 'text-align:center;margin-top:12px' }, h('span', { class: 'btn', onclick: () => Screens.pop() }, t('close')))], 'glass'));
  },
  /* ---- residents ---- */
  residents(filter, sortKey, desc) {
    filter = filter || 'all'; sortKey = sortKey || 'lvl'; if (desc === undefined) desc = true;
    this.push('residents', () => {
      let list = G.humans.filter(x => x.alive);
      if (filter === 'adv') list = list.filter(x => x.adv && !x.child); else if (filter === 'child') list = list.filter(x => x.child); else if (filter === 'other') list = list.filter(x => !x.adv && !x.child);
      const key = { name: x => x.name[li()], job: x => x.job, lvl: x => x.lvl, age: x => x.age, hp: x => x.hp / x.maxHp }[sortKey]; list.sort((a, b) => { const A = key(a), B = key(b); return (A < B ? -1 : A > B ? 1 : 0) * (desc ? -1 : 1); });
      const th = (k, label) => h('th', { onclick: () => { const nd = sortKey === k ? !desc : true; Screens.pop(); Screens.residents(filter, k, nd); } }, label + (sortKey === k ? (desc ? '▼' : '▲') : ''));
      const tb = h('table', { class: 'tb' }, h('tr', null, th('name', t('col_name')), th('job', t('col_job')), th('lvl', t('col_lv')), th('age', t('col_age')), th('hp', t('col_hp')), h('th', null, t('col_state')), h('th', null, '★')),
        list.map(x => h('tr', { onclick: () => { Screens.closeAll(); Screens.focusHuman(x.id); } }, h('td', null, x.name[li()]), h('td', null, JOBS[x.job].n[li()]), h('td', null, x.lvl), h('td', null, Math.floor(x.age)), h('td', null, Math.round(x.hp / x.maxHp * 100) + '%'), h('td', null, x.tgt ? t('st_fight') : x.act ? t('act_' + x.act.k) : t('act_idle')), h('td', { class: 'gold' }, soulOf(x).fav ? '★' : ''))));
      const tabs = ['all', 'adv', 'other', 'child'].map(f => h('span', { class: 'btn' + (filter === f ? ' on' : ''), style: 'margin-right:6px', onclick: () => { Screens.pop(); Screens.residents(f, sortKey, desc); } }, t('f_' + f)));
      return this.win(140, 50, 1000, 620, [h('h3', null, t('resident_list') + ' (' + list.length + ')'), h('div', { style: 'margin:4px 0' }, tabs), h('div', { class: 'scroll', style: 'height:500px' }, tb), h('div', { style: 'text-align:center;margin-top:6px' }, h('span', { class: 'btn', onclick: () => Screens.pop() }, t('close')))], 'glass');
    });
  },
  /* ---- soul river ---- */
  souls(focusSid) {
    this.push('souls', () => {
      let list = G.souls.filter(s => s.state === 'river' || s.fav); list.sort((a, b) => (b.fav - a.fav) || (a.wait - b.wait));
      const rows = list.map(s => {
        const hh = s.state === 'alive' ? hById(s.hid) : null; const last = s.lives[s.lives.length - 1];
        const nmz = hh ? hh.name[li()] : last ? last.name[li()] : '?', jb = hh ? JOBS[hh.job].n[li()] : last ? JOBS[last.job].n[li()] : '';
        const wait = s.state === 'river' ? fmt(t('soul_years'), { n: Math.max(0, (s.wait - G.tick) / TICK_YEAR).toFixed(1) }) : t('soul_alive');
        return h('tr', { class: s.id === focusSid ? 'sel' : '' }, h('td', { class: 'gold', onclick: () => { toggleFav(s.id); UI.lastFav = ''; Screens.rerender(); } }, s.fav ? '★' : '☆'), h('td', null, nmz), h('td', null, jb), h('td', null, ['good', 'evil', 'deed', 'attach'].map(k => t('k_' + k) + s.k[k].toFixed(1)).join(' ')), h('td', null, s.lives.length), h('td', null, wait),
          h('td', null, h('span', { class: 'btn', style: 'font-size:12px;padding:0 6px', onclick: () => { castOn('soul', s.id); } }, t('soul_intervene'))));
      });
      return this.win(140, 50, 1000, 620, [h('h3', null, t('soul_river') + ' (' + G.souls.filter(s => s.state === 'river').length + ')'), h('div', { class: 'sm', style: 'margin-bottom:4px' }, '★ ' + G.favored.length + '/5'),
        h('div', { class: 'scroll', style: 'height:500px' }, list.length ? h('table', { class: 'tb' }, h('tr', null, h('th', null, '★'), h('th', null, t('col_name')), h('th', null, t('col_job')), h('th', null, t('col_karma')), h('th', null, t('soul_prev')), h('th', null, t('col_wait')), h('th', null, '')), rows) : h('div', { class: 'dim', style: 'padding:20px' }, t('soul_none'))),
        h('div', { style: 'text-align:center;margin-top:6px' }, h('span', { class: 'btn', onclick: () => Screens.pop() }, t('close')))], 'glass');
    });
  },
  /* ---- counsel ---- */
  counsel(goal) {
    goal = goal || Game.goal || 'boss'; Game.goal = goal; G.tut.counsel = true;
    this.push('counsel', () => {
      const st = counselStatus(), acts = counselActions(goal);
      const lines = [fmt(t('st_balance'), { n: (st.balance > 0 ? '+' : '') + st.balance }), fmt(t('st_faith'), { n: st.faith }), fmt(t('st_pop'), { n: st.pop, a: st.adv, l: st.avgLv }), st.awakened ? fmt(t('st_boss_post'), { n: st.cad }) : fmt(t('st_boss_pre'), { n: st.toAwaken }), fmt(t('st_town'), { n: st.townHp })];
      if (st.bossRatio !== undefined) lines.push(fmt(t('st_ratio'), { n: st.bossRatio }));
      const risks = []; if (st.balance < -30) risks.push('rk_dark'); if (st.balance > 65) risks.push('rk_light'); if (st.faith < 25) risks.push('rk_faith'); if (st.townHp < 70) risks.push('rk_town'); if (st.adv < 5) risks.push('rk_adv'); if (st.food < 30) risks.push('rk_food'); if (!risks.length) risks.push('rk_ok');
      const goals = ['boss', 'nurture', 'avoid', 'drama'].map(g => h('span', { class: 'btn' + (goal === g ? ' on' : ''), style: 'margin-right:6px', onclick: () => { Screens.pop(); Screens.counsel(g); } }, t('goal_' + g)));
      return this.win(240, 60, 800, 600, [h('h3', null, t('g_title')), h('div', { class: 'sm', style: 'margin-bottom:6px' }, t('g_greet')), h('div', null, h('b', { class: 'gold' }, t('g_goal') + '：'), goals),
        h('h3', { style: 'margin-top:10px' }, t('g_status')), h('div', { style: 'line-height:1.6;font-size:15px' }, lines.map(l => h('div', null, '・' + l))),
        h('h3', { style: 'margin-top:10px' }, t('g_risk')), h('div', { style: 'line-height:1.6;font-size:15px;color:#ffc0a0' }, risks.map(k => h('div', null, '・' + t(k)))),
        h('h3', { style: 'margin-top:10px' }, t('g_actions')),
        acts.map(a => h('div', { class: 'card', style: 'display:flex;justify-content:space-between;align-items:center;font-size:15px;cursor:default' }, h('span', null, fmt(t(a.key), { who: a.who ? a.who[li()] : '', pk: a.pk ? t('pk_' + a.pk) : '' }), a.risk ? h('span', { class: 'red' }, '  ' + t('risk_death')) : null),
          h('span', null, h('span', { class: 'gold' }, t('succ') + ' ' + Math.round(a.p * 100) + '%　' + t('cost') + ' ' + a.cost + '　'), h('span', { class: 'btn' + (G.faith < a.cost ? ' dis' : ''), onclick: () => { if (G.faith < a.cost) return; Screens.pop(); doCast(a.pid, a.tid, a.dir); } }, t('g_exec'))))),
        h('div', { style: 'text-align:center;margin-top:12px' }, h('span', { class: 'btn', onclick: () => Screens.pop() }, t('close')))], 'glass');
    });
    UI.tutSig = '';
  },
  /* ---- chronicle ---- */
  chronicle(chId) {
    G.tut.chron = true; UI.tutSig = '';
    let sel = chId || (G.chapters.length ? G.chapters[G.chapters.length - 1].id : 0);
    const build = () => {
      const chs = G.chapters; const cur = chs.find(c => c.id === sel) || chs[chs.length - 1];
      const L = li();
      // left
      const left = h('div', { class: 'scroll', style: 'width:250px;height:540px;padding-right:4px' });
      [0, 1, 2, 3, 4].forEach(v => { const list = chs.filter(c => c.vol === v); if (!list.length) return; left.appendChild(h('div', { class: 'gold', style: 'margin:6px 0 2px;font-weight:bold;font-size:14px' }, S.vol[v][L])); list.forEach(c => { const r = renderChapter(c); left.appendChild(h('div', { class: 'card' + (cur && c.id === cur.id ? ' sel' : ''), style: 'font-size:13px;padding:1px 6px;margin-bottom:2px', onclick: () => { sel = c.id; Screens.rerender(); } }, fmt(t('h_ch'), { n: c.no }) + ' ' + r.title)); }); });
      left.appendChild(h('div', { class: 'gold', style: 'margin:10px 0 2px;font-weight:bold;font-size:14px' }, t('h_spot')));
      const people = []; G.spot.forEach(i => people.push(i)); G.track.forEach(i => { if (people.indexOf(i) < 0) people.push(i); });
      people.forEach(i => { const hh = hById(i); if (!hh || !hh.alive) return; const tr = G.track.indexOf(i) >= 0; left.appendChild(h('div', { style: 'font-size:13px;display:flex;justify-content:space-between;margin-bottom:2px' }, h('span', { style: 'cursor:pointer', onclick: () => { Screens.closeAll(); Screens.focusHuman(i); } }, (tr ? '◆ ' : '◇ ') + hh.name[L]), h('span', { class: 'btn' + (tr ? ' on' : ''), style: 'font-size:11px;padding:0 4px', onclick: () => { chronTrackToggle(i); Screens.rerender(); } }, tr ? t('h_tracked') : t('h_track')))); });
      // center
      let center;
      if (!cur) center = h('div', { class: 'par', style: 'width:610px;height:540px;padding:20px' }, t('h_none'));
      else {
        const r = renderChapter(cur); const ink = inkOf(cur);
        const dstr = dateStr(cur.t, G.gen);
        center = h('div', { class: 'par scroll', style: 'width:610px;height:500px;padding:14px 22px;font-size:16px;line-height:1.75' },
          h('div', { style: 'display:flex;justify-content:space-between;align-items:baseline;border-bottom:2px solid #6a4a1c;margin-bottom:8px' }, h('b', { style: 'font-size:22px' }, fmt(t('h_ch'), { n: cur.no }) + '　' + r.title), h('span', null, h('span', { class: 'ink ' + ink }, t('ink_' + ink)), ' ', h('span', { class: 'tag ' + cur.trust }, t('tr_' + cur.trust)))),
          h('div', { style: 'font-size:12px;color:#6a4a1c;margin-bottom:6px' }, S.vol[cur.vol][L] + '　/　' + dstr),
          r.paras.map(p => h('p', null, h('span', { class: 'tag ' + p.tag }, t('tr_' + p.tag)), p.text)),
          h('p', { style: 'text-align:right;font-style:italic;color:#5a2a0a;margin-top:12px' }, t('hist') + '：' + r.hist));
      }
      const idx = cur ? chs.indexOf(cur) : -1; const a0 = cur && cur.a[0] ? cur.a[0] : 0;
      const nav = h('div', { style: 'display:flex;gap:8px;margin-top:6px;justify-content:center;width:610px' },
        h('span', { class: 'btn' + (idx <= 0 ? ' dis' : ''), onclick: () => { if (idx > 0) { sel = chs[idx - 1].id; Snd.se('page'); Screens.rerender(); } } }, t('h_prev')), h('span', { class: 'btn' + (idx >= chs.length - 1 ? ' dis' : ''), onclick: () => { if (idx < chs.length - 1) { sel = chs[idx + 1].id; Snd.se('page'); Screens.rerender(); } } }, t('h_next')),
        cur && a0 && G.idx[a0] && G.idx[a0].alive ? h('span', { class: 'btn' + (G.track.indexOf(a0) >= 0 ? ' on' : ''), onclick: () => { chronTrackToggle(a0); Screens.rerender(); } }, G.track.indexOf(a0) >= 0 ? t('h_untrack') : t('h_track')) : null,
        cur && a0 && G.idx[a0] && G.idx[a0].alive ? h('span', { class: 'btn', onclick: () => { const c = chronSupplement(a0); if (c) { sel = c.id; Snd.se('page'); Screens.rerender(); } } }, t('h_supp')) : null);
      // right: counsel panel
      const st = counselStatus(); const acts = counselActions(Game.goal || 'boss');
      const fore = foreshadows();
      const right = h('div', { class: 'scroll', style: 'width:290px;height:540px;font-size:13px;line-height:1.5' }, h('div', { class: 'gold', style: 'font-weight:bold' }, t('g_title')),
        h('div', null, fmt(t('st_balance'), { n: (st.balance > 0 ? '+' : '') + st.balance }) + '　' + fmt(t('st_faith'), { n: st.faith })), h('div', null, st.awakened ? fmt(t('st_boss_post'), { n: st.cad }) : fmt(t('st_boss_pre'), { n: st.toAwaken })),
        h('div', { class: 'gold', style: 'font-weight:bold;margin-top:8px' }, t('g_actions')),
        acts.map(a => h('div', { class: 'card', style: 'cursor:default;font-size:12px' }, fmt(t(a.key), { who: a.who ? a.who[li()] : '', pk: a.pk ? t('pk_' + a.pk) : '' }), h('div', { class: 'gold' }, t('succ') + Math.round(a.p * 100) + '%  ' + t('cost') + a.cost, '  ', h('span', { class: 'btn' + (G.faith < a.cost ? ' dis' : ''), style: 'font-size:11px;padding:0 5px', onclick: () => { if (G.faith < a.cost) return; Screens.closeAll(); doCast(a.pid, a.tid, a.dir); } }, t('g_exec'))))),
        h('div', { class: 'gold', style: 'font-weight:bold;margin-top:8px' }, t('h_foresh')), fore.map(f => h('div', { style: 'color:#d8c8ff;margin-bottom:2px' }, '◇ ' + f)));
      return this.win(40, 30, 1200, 650, [h('h3', null, t('h_title')), h('div', { style: 'display:flex;gap:10px' }, left, h('div', null, center, nav), right), h('div', { style: 'text-align:center;margin-top:4px' }, h('span', { class: 'btn', onclick: () => Screens.pop() }, t('close')))], 'glass');
    };
    this.push('chron', build, e => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { const chs = G.chapters; const i = chs.findIndex(c => c.id === sel); const j = clamp(i + (e.key === 'ArrowRight' ? 1 : -1), 0, chs.length - 1); if (chs[j]) { sel = chs[j].id; Snd.se('page'); Screens.rerender(); } return true; } return e.key === 'h' || e.key === 'H' ? (Screens.pop(), true) : false; });
    Snd.se('page');
  },
  /* ---- ending / book ---- */
  ending() {
    const e = G.ending; if (!e) return; Game.scene = 'ending'; Game.paused = true;
    const kind = e.kind; Snd.stopSong(1.0);
    setTimeout(() => { Snd.playSong(kind === 'victory' ? 'victory' : kind === 'doom' ? 'doom' : 'revelation'); Snd.se(kind === 'victory' ? 'victory' : 'defeat'); }, 600);
    if (kind === 'victory') setTimeout(() => { if (Game.scene === 'ending') Snd.playSong('revelation'); }, 17000);
    if (kind === 'victory') Render.flash = 1;
    this.stack = []; Game.modals = []; $('modal').style.display = 'none';
    setTimeout(() => {
      if (Game.scene !== 'ending') return;
      const alive = G.stats.alive || 0;
      this.push('ending', () => this.win(250, 90, 780, 520, [h('h3', { style: 'text-align:center;font-size:20px' }, t('r_title')), h('div', { style: 'text-align:center;font-size:44px;font-weight:bold;margin:12px 0', class: kind === 'victory' ? 'gold' : kind === 'doom' ? 'red' : '' }, t('end_' + kind)),
        h('div', { class: 'par', style: 'padding:10px 18px;font-size:16px;line-height:1.7;height:190px;margin:0 10px' }, (renderChapter(G.chapters[G.chapters.length - 1] || G.chapters[0]).paras.map(p => h('p', null, p.text)))),
        h('div', { class: 'sm', style: 'text-align:center;margin:10px 0;font-size:14px' }, fmt(t('r_stats'), { y: e.year, d: G.stats.deaths, b: G.stats.births, q: G.stats.quests, a: G.stats.answered })),
        h('div', { style: 'display:flex;gap:10px;justify-content:center;margin-top:12px' }, h('span', { class: 'btn big', onclick: () => Screens.book() }, t('r_book')), h('span', { class: 'btn big', onclick: () => { Screens.closeAll(); Game.nextGen(); } }, fmt(t('r_next'), { n: G.gen + 1 })), h('span', { class: 'btn big', onclick: () => { Screens.closeAll(); Game.toTitle(); } }, t('to_title')))], 'glass'), null, { clear: false, noEsc: true });
    }, 2200);
  },
  book() {
    this.push('book', () => {
      const txt = chronAll(); const head = fmt(t('book_title'), { n: G.gen });
      return this.win(120, 30, 1040, 660, [h('h3', null, head), h('div', { class: 'par scroll', style: 'height:520px;padding:14px 22px;font-size:15px;line-height:1.7;white-space:pre-wrap;user-select:text' }, head + '\n\n' + txt),
        h('div', { style: 'display:flex;gap:10px;justify-content:center;margin-top:8px' }, h('span', { class: 'btn', onclick: () => { copyText(head + '\n\n' + txt).then(ok => UI.toast(ok ? t('copied') : t('copy_fail'))); } }, t('copy')), h('span', { class: 'btn', onclick: () => downloadText('rinne_tenbin_gen' + G.gen + '.txt', head + '\n\n' + txt) }, t('download')), h('span', { class: 'btn', onclick: () => Screens.pop() }, t('close')))], 'glass');
    });
  },
};
Object.assign(S, {
  eye_death: ['寿命の近さ（年あたり死亡確率の目安）', '壽命將近程度（每年死亡機率概估）'], eye_soul: ['魂の歴史（転生回数／縁）', '靈魂的歷史（轉生次數／因緣）'], eye_echo: ['前世の残影：', '前世的殘影：'], eye_pray: ['近く祈りそうか：', '近期會祈禱嗎：'],
  eye_hint_hurt: ['傷が深い。早めの手当てを。', '傷勢很重，宜早點治療。'], eye_hint_grief: ['喪失の悲しみを抱えている。赦しか復讐かを祈りそうだ。', '懷抱著喪失之痛。可能會祈求寬恕或復仇。'], eye_hint_love: ['誰かへの想いが募っている。', '對某人的思念漸濃。'], eye_hint_calm: ['いまのところ、穏やかだ。', '目前相當平穩。'],
});
function foreshadows() {
  const out = [];
  if (!G.awakened) out.push(t('f_awaken')); else if (G.bossFight || G.sortie) out.push(t('f_fight'));
  if (G.cadres.filter(i => G.idx[i] && G.idx[i].alive).length && (G.awakened || yearOf(G.tick) >= 3)) out.push(t('f_cad'));
  const nm = x => x.name[li()];
  G.humans.filter(x => x.alive && x.love && x.love > x.id).slice(0, 2).forEach(x => { const o = hById(x.love); if (o) out.push(fmt(t('f_love'), { a: nm(x), b: nm(o) })); });
  G.humans.filter(x => x.alive && x.preg).slice(0, 1).forEach(x => out.push(fmt(t('f_preg'), { a: nm(x) })));
  G.humans.filter(x => x.alive && x.age >= 63).slice(0, 2).forEach(x => out.push(fmt(t('f_old'), { a: nm(x) })));
  G.humans.filter(x => x.alive && x.echo && x.child).slice(0, 1).forEach(x => out.push(fmt(t('f_echo'), { a: nm(x) })));
  return out.slice(0, 7);
}
function godLines(g) {
  const L = [];
  for (const k in g.cost) L.push(POWER_BY_ID[k].n[li()] + ' ' + (LANG === 'ja' ? 'コスト' : '費用') + ' ×' + g.cost[k]);
  for (const k in g.bonus) L.push(POWER_BY_ID[k].n[li()] + ' ' + (LANG === 'ja' ? '成功率' : '成功率') + ' +' + Math.round(g.bonus[k] * 100) + '%');
  if (g.wild) L.push(LANG === 'ja' ? '大成功・曲解が出やすい' : '容易出現大成功與曲解');
  return L;
}
function drawEmblem(cv, id) {
  const c = cv.getContext('2d'); c.imageSmoothingEnabled = false; c.clearRect(0, 0, 66, 66);
  const P = { mercy: ['..rr...rr..', '.rrrr.rrrr.', 'rrwrrrrrrrr', 'rrrrrrrrrrr', 'rrrrrrrrrrr', '.rrrrrrrrr.', '..rrrrrrr..', '...rrrrr...', '....rrr....', '.....r.....'], order: ['.....y.....', '....yyy....', '.....y.....', 'yyyyyyyyyyy', '..y..y..y..', '.y...y...y.', 'yyy..y..yyy', '.....y.....', '.....y.....', '..yyyyyyy..'], chaos: ['....ppp....', '..pp...pp..', '.p..ppp..p.', 'p..p...p..p', 'p.p..p..p.p', 'p.p.ppp.p.p', 'p..p...p..p', '.p..ppp..p.', '..pp...pp..', '....ppp....'] }[id];
  const col = { r: '#ff6080', w: '#fff', y: '#ffe060', p: '#c070ff' };
  c.fillStyle = '#05083a'; c.fillRect(0, 0, 66, 66); c.fillStyle = '#10299a'; c.fillRect(2, 2, 62, 62);
  P.forEach((row, y) => { for (let x = 0; x < row.length; x++) { const ch = row[x]; if (ch !== '.') { c.fillStyle = col[ch]; c.fillRect(5 + x * 5, 8 + y * 5, 5, 5); } } });
}
function copyText(txt) {
  return new Promise(res => {
    try { if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(txt).then(() => res(true), () => res(fallbackCopy(txt))); return; } } catch (e) { }
    res(fallbackCopy(txt));
  });
}
function fallbackCopy(txt) { try { const ta = document.createElement('textarea'); ta.value = txt; ta.style.cssText = 'position:fixed;left:-9999px'; document.body.appendChild(ta); ta.select(); const ok = document.execCommand('copy'); ta.remove(); return ok; } catch (e) { return false; } }
function downloadText(name, txt) { try { const b = new Blob([txt], { type: 'text/plain;charset=utf-8' }); const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500); } catch (e) { UI.toast(t('copy_fail')); } }

/* ---------- opening artwork ---------- */
function drawOpening(c, o, dt) {
  const T0 = o.t++; c.setTransform(1, 0, 0, 1, 0, 0);
  const sky = (a, b) => { const g = c.createLinearGradient(0, 0, 0, 360); g.addColorStop(0, a); g.addColorStop(1, b); c.fillStyle = g; c.fillRect(0, 0, 640, 360); };
  const stars = n => { let s = 7; for (let i = 0; i < n; i++) { s = (s * 1103515245 + 12345) & 0x7fffffff; const x = s % 640; s = (s * 1103515245 + 12345) & 0x7fffffff; const y = s % 240; c.fillStyle = `rgba(255,255,255,${0.4 + 0.5 * Math.abs(Math.sin(T0 / 30 + i))})`; c.fillRect(x, y, 1, 1); } };
  const scale = (cx, cy, ang, big) => {
    const L = 90 * big; c.strokeStyle = '#e8e8f8'; c.fillStyle = '#e8e8f8'; c.lineWidth = 3 * big; c.beginPath(); c.moveTo(cx, cy + 90 * big); c.lineTo(cx, cy); c.stroke(); c.fillRect(cx - 24 * big, cy + 88 * big, 48 * big, 5 * big);
    const lx = cx - Math.cos(ang) * L, ly = cy - Math.sin(ang) * L, rx = cx + Math.cos(ang) * L, ry = cy + Math.sin(ang) * L; c.beginPath(); c.moveTo(lx, ly); c.lineTo(rx, ry); c.stroke(); c.fillStyle = '#ffd860'; c.beginPath(); c.arc(cx, cy, 5 * big, 0, 7); c.fill();
    const pan = (x, y, col) => { c.lineWidth = 1; c.strokeStyle = '#ddd'; c.beginPath(); c.moveTo(x, y); c.lineTo(x - 22 * big, y + 40 * big); c.moveTo(x, y); c.lineTo(x + 22 * big, y + 40 * big); c.stroke(); c.fillStyle = col; c.beginPath(); c.ellipse(x, y + 42 * big, 26 * big, 6 * big, 0, 0, 7); c.fill(); const gg = c.createRadialGradient(x, y + 30 * big, 2, x, y + 30 * big, 40 * big); gg.addColorStop(0, col); gg.addColorStop(1, 'rgba(0,0,0,0)'); c.globalAlpha = 0.5; c.fillStyle = gg; c.fillRect(x - 44 * big, y - 20 * big, 88 * big, 90 * big); c.globalAlpha = 1; };
    pan(lx, ly, '#ffe070'); pan(rx, ry, '#9050e0');
  };
  switch (o.i) {
    case 0: sky('#05082a', '#1a1a60'); stars(90); scale(320, 110 + Math.sin(T0 / 50) * 3, Math.sin(T0 / 80) * 0.1, 1.5); break;
    case 1: { G.tick = 6 * 144 + 36 + 12 * 6; Render.cam.x = 22 * TS; Render.cam.y = 8 * TS; Render.draw(0, { noNight: false }); c.fillStyle = 'rgba(255,230,160,0.14)'; for (let i = 0; i < 4; i++) { c.beginPath(); c.moveTo(120 + i * 150, 0); c.lineTo(160 + i * 150, 0); c.lineTo(80 + i * 150 + Math.sin(T0 / 90) * 10, 360); c.lineTo(20 + i * 150, 360); c.fill(); } break; }
    case 2: { sky('#02051a', '#0a2a5a'); stars(40); c.strokeStyle = '#2a6ac8'; c.lineWidth = 26; c.beginPath(); c.moveTo(-20, 230); c.bezierCurveTo(180, 170, 300, 300, 680, 220); c.stroke(); c.strokeStyle = '#4a8ae8'; c.lineWidth = 12; c.stroke(); for (let i = 0; i < 18; i++) { const u = ((T0 / 260 + i / 18) % 1); const x = -20 + u * 700; const y = 230 + Math.sin(u * 5 + 0.4) * 30 - 18; c.fillStyle = `rgba(180,230,255,${0.4 + 0.4 * Math.sin(T0 / 10 + i)})`; c.beginPath(); c.arc(x, y - 6 * Math.sin(T0 / 20 + i), 4, 0, 7); c.fill(); c.fillStyle = '#fff'; c.fillRect(x - 1, y - 6 * Math.sin(T0 / 20 + i) - 1, 2, 2); } break; }
    case 3: { sky('#12001e', '#3a1050'); c.fillStyle = '#e8d0ff'; c.beginPath(); c.arc(480, 80, 36, 0, 7); c.fill(); c.fillStyle = '#12001e'; c.beginPath(); c.arc(492, 74, 32, 0, 7); c.fill(); stars(40); c.fillStyle = '#0a0014'; c.beginPath(); c.moveTo(0, 360); c.lineTo(0, 260); c.lineTo(160, 230); c.lineTo(300, 270); c.lineTo(420, 210); c.lineTo(640, 250); c.lineTo(640, 360); c.fill(); c.fillStyle = '#1a0a28'; c.fillRect(380, 130, 120, 100); c.fillRect(370, 100, 20, 130); c.fillRect(490, 90, 20, 140); c.fillRect(420, 80, 40, 60); c.beginPath(); c.moveTo(420, 80); c.lineTo(440, 50); c.lineTo(460, 80); c.fill(); for (let i = 0; i < 5; i++) { c.fillStyle = `rgba(220,80,255,${0.6 + 0.3 * Math.sin(T0 / 12 + i)})`; c.fillRect(395 + i * 20, 160, 6, 10); } c.fillStyle = `rgba(255,40,80,${0.7 + 0.3 * Math.sin(T0 / 9)})`; c.fillRect(434, 100, 4, 3); c.fillRect(442, 100, 4, 3); c.fillStyle = '#e8c030'; c.fillRect(428, 88, 24, 4); c.fillRect(428, 84, 4, 4); c.fillRect(438, 82, 4, 6); c.fillRect(448, 84, 4, 4); const fg = c.createLinearGradient(0, 250, 0, 360); fg.addColorStop(0, 'rgba(120,40,160,0)'); fg.addColorStop(1, 'rgba(120,40,160,0.6)'); c.fillStyle = fg; c.fillRect(0, 250, 640, 110); break; }
    default: sky('#04061c', '#10104a'); stars(110); scale(320, 120, Math.sin(T0 / 60) * 0.06, 1.6); c.fillStyle = 'rgba(255,240,170,0.12)'; c.beginPath(); c.arc(320, 40, 120 + Math.sin(T0 / 30) * 6, 0, 7); c.fill();
  }
  // typewriter text
  const full = t('op' + (o.i + 1)); const sp = [0, 0.9, 0.55, 0.3][Game.settings.text] || 0.55; o.typed = Math.min(full.length, o.typed + 0.55 / (sp + 0.1) * 0.6 + 0.0);
  const el = $('optext'); if (el) el.textContent = full.slice(0, Math.floor(o.typed));
}
