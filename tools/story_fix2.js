/* story_check 'rep' (2): 12 continuation transitions instead of 6; JA god callbacks written as one piece around the quote (「…」 followed by に / と). */
const fs = require('fs');
let s = fs.readFileSync('src/09_story.js', 'utf8');
const ADD = [['{MN}の話はひと休みして、{A}の話をつづけよう。', '{MN}的故事先休息一下，繼續說{A}的故事。'], ['{A}の物語は、まだ途中だ。{MN}のことは、もう少し待とう。', '{A}的故事還在途中，{MN}的事再等一等。'], ['ふたたび{A}に目を向ける。{MN}はまだ出てこない。', '再次把目光放到{A}身上，{MN}還不會出場。'], ['{MN}から目をはなしたまま、{A}を見つめつづける。', '視線離開{MN}，繼續看著{A}。'], ['この章も{A}が主役だ。{MN}の話は、また今度。', '這一章的主角依然是{A}，{MN}的故事下次再說。'], ['{A}の歩みを、もう少し追いかける。{MN}はそのあとだ。', '再多追一下{A}的腳步，{MN}的事之後再說。']];
const a = "['つづけて{A}の話をする（この章に{MN}は出てこない）。', '接著是{A}的故事，{MN}不在這一章出現。']];";
if (!s.includes(a)) { console.log('MISS trans'); process.exit(1); }
s = s.replace(a, a.slice(0, -2) + ', ' + ADD.map(x => JSON.stringify(x).replace(/"/g, "'")).join(', ') + '];');
s = s.replace("ch.trI = pickUniq(rg, 'TR.' + kk + '.' + (ids[0] || 0), kk === 'c' ? 6 : 8);", "ch.trI = pickUniq(rg, 'TR.' + kk + '.' + (ids[0] || 0), kk === 'c' ? 12 : 8);");
fs.writeFileSync('src/09_story.js', s);
let c = fs.readFileSync('src/09tz_cb2.js', 'utf8');
const JA = {
  god_crit: ['{A}は前に、神さまの「{PW}」によって奇跡を見たことがある。', '{A}は、神さまの「{PW}」に触れてから、体が不思議なほど軽かった。', '{A}は今日も、神さまの「{PW}」に支えられて立っている。', '{A}は、「{PW}」に照らされた日の光をまだ覚えていた。'],
  god_success: ['{A}は少し前に神さまの「{PW}」に助けられ、それ以来前向きになれた。', '{A}は「{PW}」と神さまのことを、今も忘れていない。', '{A}は「{PW}」に元気をもらい、また祈ってみようと思った。', '祈りが届き、神さまの「{PW}」に包まれた日のことを、{A}は胸にしまっている。'],
  god_twist: ['{A}は神さまの「{PW}」に期待したが、思ったとおりにはならなかった。', '{A}は、「{PW}」と言われた意味を取りちがえたのかもしれない。', '{A}は、むずかしい神さまの「{PW}」にためいきをついた。', '{A}の調子は、「{PW}」と関係があるのか、少しおかしかった。'],
  god_fail: ['神さまへの願い「{PW}」に、{A}は答えをもらえなかった。', '{A}は、届かなかった「{PW}」に、まだ心を残していた。', '{A}は、神さまが忙しくて「{PW}」に気づかなかったのだと自分に言い聞かせていた。', '{A}は、届かなかった「{PW}」にもめげず、祈るのをやめなかった。'],
};
for (const k in JA) { const a2 = c.indexOf('  ' + k + ': '); const b2 = c.indexOf('\n', a2); const line = c.slice(a2, b2); const arr = JSON.parse(line.slice(line.indexOf('['), line.lastIndexOf(']') + 1)); arr.forEach((p, i) => p[0] = JA[k][i]); c = c.slice(0, a2) + '  ' + k + ': ' + JSON.stringify(arr) + ',' + c.slice(b2); }
fs.writeFileSync('src/09tz_cb2.js', c); console.log('ok');
