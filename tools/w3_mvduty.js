const fs = require('fs'); let s = fs.readFileSync('src/14g_v42_ui.js', 'utf8'); const i = s.indexOf('const _rd43'); const j = s.indexOf('\n', i); let line = s.slice(i, j + 1); s = s.slice(0, i) + s.slice(j + 1); fs.writeFileSync('src/14g_v42_ui.js', s);
line = line.replace(`if (R.duty.querySelector('[data-k="' + k + '"]')) return;`, `const old = R.duty.querySelector('[data-k="' + k + '"]'); if (old) old.remove();`);
const out = `/* ================= V4.2 hooks that must load after the V4.1 tutorial layer (duties, hints) ================= */
Object.assign(S, { hi_train: ['勇者が育ったら「神の鍛錬」で鍛えられます。魔王城の玉座が近づきます。', '勇者成長後，可以用「神的鍛鍊」強化他。王座會更近。'], hi_exp: ['仲間がそろいました。「魔王城への遠征」で城を攻められます。ただし魔王軍は怒ります。', '同伴到齊了。可以用「遠征魔王城」攻城，但魔王軍會發怒。'] });
` + line + `HINTS.push({ id: 'train', ok: () => G.heroId && G.idx[G.heroId] && G.idx[G.heroId].alive && G.faith >= 30, el: () => UI.el.warBar }, { id: 'exp', ok: () => G.castle && !expMissing().length, el: () => UI.el.warBar });
`;
fs.writeFileSync('src/16c_v42_hooks.js', out); console.log(out.includes('old.remove'));
