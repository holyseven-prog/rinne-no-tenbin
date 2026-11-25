/* ================= UI v5 parts that wrap code defined in 16b (loaded after it) ================= */
/* hint bubbles: × as well as OK, and they close (and count as seen) after 12 s */
const _htV5 = UI.hintTick; UI.hintTick = function () { const before = this.hintEl; _htV5.apply(this, arguments); const el = this.hintEl; if (!el || el === before || el._v5) return; el._v5 = 1;
  const ok = el.querySelector('.btn'); const done = () => { if (ok && el.isConnected) ok.click(); };
  const x = h('span', { class: 'btn', style: 'position:absolute;right:4px;top:2px;min-width:32px;text-align:center', title: t('v5_close'), onclick: ev => { ev.stopPropagation(); done(); } }, '✕'); el.appendChild(x);
  setTimeout(done, 12000); };
