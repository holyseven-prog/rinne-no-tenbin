const fs = require('fs'); let s = fs.readFileSync('src/09_story.js', 'utf8');
function rep(a, b) { if (!s.includes(a)) { console.log('MISSING: ' + a.slice(0, 70)); return; } s = s.replace(a, () => b); }
rep("function pickUniq(rg, key, n, avoid) {", "const CAP = 2;\nfunction pickUniq(rg, key, n, avoid, cap) {");
rep("  if (!best.length) best = [0]; const i = best[rg.int(0, best.length - 1)];", "  if (cap && bu >= cap) return -1;\n  if (!best.length) best = [0]; const i = best[rg.int(0, best.length - 1)];");
// computePicks: skippable parts get the cap
rep("pk.set = rg.int(0, 1); pk.sp0 = rg.int(0, SPEECH_TAGS.length - 1); pk.sp1 = rg.int(0, SPEECH_TAGS.length - 1);", "pk.set = rg.int(0, 1); pk.sp0 = pickUniq(rg, 'SP', SPEECH_TAGS.length, null, CAP); pk.sp1 = pickUniq(rg, 'SP', SPEECH_TAGS.length, null, CAP);");
rep("pk.tb = pickUniq(rg, 'TB.' + ch.tod, TIME_BEATS[ch.tod].length); pk.wx = pickUniq(rg, 'WX.' + ch.sea, WEATHER_BEATS[ch.sea].length);", "pk.tb = pickUniq(rg, 'TB.' + ch.tod, TIME_BEATS[ch.tod].length, null, CAP); pk.wx = pickUniq(rg, 'WX.' + ch.sea, WEATHER_BEATS[ch.sea].length, null, CAP);");
rep("pk.d1 = pickUniq(rg, 'D.' + ch.scene, sc.dev.length); pk.d2 = pickUniq(rg, 'D.' + ch.scene, sc.dev.length, [pk.d1]);", "pk.d1 = pickUniq(rg, 'D.' + ch.scene, sc.dev.length, null, CAP); pk.d2 = pickUniq(rg, 'D.' + ch.scene, sc.dev.length, pk.d1 >= 0 ? [pk.d1] : null, CAP);");
rep("pk.inner = pickUniq(rg, 'I.' + ch.scene, sc.inner.length);", "pk.inner = pickUniq(rg, 'I.' + ch.scene, sc.inner.length, null, CAP);");
rep("pk['l' + k] = pickUniq(rg, 'L.' + it + '.' + voice, n); });", "pk['l' + k] = pickUniq(rg, 'L.' + it + '.' + voice, n, null, CAP); });");
rep("pk.cb = (ch.cbs || []).map(c => pickUniq(rg, 'CB.' + c.ty, (CB[c.ty] || [[0, 0]]).length));", "pk.cb = (ch.cbs || []).map(c => pickUniq(rg, 'CB.' + c.ty, (CB[c.ty] || [[0, 0]]).length, null, CAP));");
// render
rep("const useTime = pk.set === 0; const filler = useTime ? f(TIME_BEATS[ch.tod][pk.tb % TIME_BEATS[ch.tod].length]) : f(WEATHER_BEATS[ch.sea][pk.wx % WEATHER_BEATS[ch.sea].length]);",
  "const useTime = pk.set === 0; const fi = useTime ? pk.tb : pk.wx; const filler = fi < 0 ? '' : useTime ? f(TIME_BEATS[ch.tod][pk.tb % TIME_BEATS[ch.tod].length]) : f(WEATHER_BEATS[ch.sea][pk.wx % WEATHER_BEATS[ch.sea].length]);");
rep("(ch.cbs || []).forEach((c, i) => { const pool = CB[c.ty]; if (!pool) return;", "(ch.cbs || []).forEach((c, i) => { const pool = CB[c.ty]; if (!pool || pk.cb[i] < 0) return;");
rep("paras.push(mk(f(sc.dev[pk.d1].p) + f(sc.dev[pk.d2].p), tag));", "{ const dv = (pk.d1 >= 0 ? f(sc.dev[pk.d1].p) : '') + (pk.d2 >= 0 ? f(sc.dev[pk.d2].p) : ''); if (dv) paras.push(mk(dv, tag)); }");
rep("const line = arr[pk['l' + k] % arr.length]; const vv = Object.assign({}, v, { B: nameOf(lis) }); const tg = SPEECH_TAGS[k === 0 ? pk.sp0 : pk.sp1]; dl += fmt(line[L], vv) + fmt(tg[L], { S: nameOf(spk) }); });",
  "if (pk['l' + k] < 0) return; const line = arr[pk['l' + k] % arr.length]; const vv = Object.assign({}, v, { B: nameOf(lis) }); const tgi = k === 0 ? pk.sp0 : pk.sp1; dl += fmt(line[L], vv) + (tgi >= 0 ? fmt(SPEECH_TAGS[tgi][L], { S: nameOf(spk) }) : ''); });");
rep("      paras.push(mk(dl, tag));\n    }\n    paras.push(mk(f(sc.inner[pk.inner].p), 'infer'));", "      if (dl) paras.push(mk(dl, tag));\n    }\n    if (pk.inner >= 0) paras.push(mk(f(sc.inner[pk.inner].p), 'infer'));");
fs.writeFileSync('src/09_story.js', s);
