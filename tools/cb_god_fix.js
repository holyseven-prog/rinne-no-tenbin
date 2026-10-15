/* story_check 'rep': after 「…」 the following text must not be a fixed phrase (it repeats verbatim when the callback is used often).
   Rewrite the god_* callbacks so the part after the closing quote always carries the character's name (or the quote is followed by に / と). */
const fs = require('fs'); const f = 'src/09tz_cb2.js'; let s = fs.readFileSync(f, 'utf8');
const NEW = {
  god_crit: [['{A}は前に、神さまの「{PW}」によって奇跡を見たことがある。', '{A}以前因為神的「{PW}」，{A}親眼見過奇蹟。'], ['神さまの「{PW}」をいただいてから、{A}の体は不思議なほど軽かった。', '得到神的「{PW}」之後，{A}的身體輕得不可思議。'], ['{A}は、神さまの「{PW}」のおかげで、今日も立っていられる。', '多虧神的「{PW}」，{A}今天才能站在這裡。'], ['「{PW}」を受けた日の光を、{A}はまだ覚えていた。', '得到「{PW}」那天的光，{A}還記得。']],
  god_success: [['{A}は少し前に神さまの「{PW}」に助けられ、それ以来前向きになれた。', '不久前受了神的「{PW}」幫助，{A}從那之後變得積極了些。'], ['神さまに「{PW}」をもらったことを、{A}は忘れていない。', '被神賜予「{PW}」的事，{A}沒有忘記。'], ['「{PW}」のあと、{A}は少し元気になり、また祈ってみようと思った。', '得到「{PW}」之後，{A}稍微有了精神，想再去祈禱看看。'], ['祈りが届き、神さまの「{PW}」に包まれた日のことを、{A}は胸にしまっている。', '祈禱傳達出去、被神的「{PW}」包圍的那天，{A}一直放在心裡。']],
  god_twist: [['{A}は神さまの「{PW}」に期待したが、思ったとおりにはならなかった。', '神的「{PW}」讓{A}抱著期待，結果卻和想的不一樣。'], ['「{PW}」の意味を、{A}は取りちがえたのかもしれない。', '也許「{PW}」的意思，{A}會錯了。'], ['神さまの「{PW}」は{A}にはむずかしく、ためいきが出た。', '神的「{PW}」對{A}來說太難懂，{A}嘆了口氣。'], ['「{PW}」のあと、{A}の調子は少しおかしかった。', '得到「{PW}」之後，{A}的狀況有點不對勁。']],
  god_fail: [['神さまへの願い「{PW}」に、{A}は答えをもらえなかった。', '向神祈求的「{PW}」，{A}沒有得到回應。'], ['「{PW}」が届かなかったことを、{A}は少し引きずっていた。', '「{PW}」沒有傳達出去的事，{A}還在意著。'], ['「{PW}」が届かなかったのは神さまが忙しいからだ、と{A}は自分に言い聞かせていた。', '「{PW}」沒有傳達，是因為神太忙了，{A}這樣告訴自己。'], ['「{PW}」が届かなくても、{A}は祈るのをやめなかった。', '即使「{PW}」沒有傳達，{A}也沒有放棄祈禱。']],
};
for (const k in NEW) { const a = s.indexOf('  ' + k + ': ['); if (a < 0) { console.log('no', k); process.exit(1); } const b = s.indexOf('\n', a); s = s.slice(0, a) + '  ' + k + ': ' + JSON.stringify(NEW[k]) + ',' + s.slice(b); }
fs.writeFileSync(f, s); console.log('ok');
