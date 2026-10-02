'use strict';
/* ================= util / constants ================= */
const TICK_DAY = 144, DAYS_YEAR = 12, TICK_YEAR = 1728, MW = 64, MH = 40, TS = 16, START_TICK = 36;
const BOSS_BASE_TICK = 6 * TICK_YEAR;
let G = null, LANG = 'ja';
const TUNE = Object.assign({ bossHp: 2000, bossAtk: 38, bossDef: 22, bossGrow: 1.08, waveBase: 4, waveGrow: 2.2, waveInt: 8, waveDec: 1.1, drift: 1.2, cadMul: 1, pen: 1, disMul: 0, townDrain: 0.55, expDelay: 6, expRatio: 1.1, polRes: 60, warQuests: 0, scorch: 0.28 }, (typeof globalThis !== 'undefined' && globalThis.__TUNE) || {});
const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
const lerp = (a, b, t) => a + (b - a) * t;
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const isNum = v => typeof v === 'number' && isFinite(v);

function RNG(seed) { this.s = (seed >>> 0) || 1; }
RNG.prototype.next = function () {
  this.s = (this.s + 0x6D2B79F5) >>> 0;
  let t = this.s;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
RNG.prototype.int = function (a, b) { return a + Math.floor(this.next() * (b - a + 1)); };
RNG.prototype.pick = function (arr) { return arr[Math.floor(this.next() * arr.length)]; };
RNG.prototype.chance = function (p) { return this.next() < p; };
RNG.prototype.range = function (a, b) { return a + this.next() * (b - a); };

const rnd = () => G.rng.next();
const rint = (a, b) => G.rng.int(a, b);
const rpick = arr => G.rng.pick(arr);
const rchance = p => G.rng.next() < p;
const rrange = (a, b) => G.rng.range(a, b);
function strHash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }

/* ---- i18n core ---- */
const S = {};
function fmt(str, v) {
  if (!v) return str;
  return str.replace(/\{(\w+)\}/g, (m, k) => (v[k] === undefined ? m : v[k]));
}
const li = () => (LANG === 'ja' ? 0 : 1);
function t(k, v) {
  const e = S[k];
  if (!e) return '??' + k;
  return fmt(e[li()], v);
}
function pr(p, v) { return fmt(p[li()], v); }
function nm(e) { return e ? (e.name ? e.name[li()] : e.n ? e.n[li()] : '?') : '?'; }

/* ---- time ---- */
const hourOf = tk => Math.floor((tk % TICK_DAY) / 6);
const dayIdx = tk => Math.floor(tk / TICK_DAY);
const yearOf = tk => Math.floor(tk / TICK_YEAR) + 1;
const seasonOf = tk => Math.floor((dayIdx(tk) % DAYS_YEAR) / 3);
const KANJI_NUM = ['', '一', '二', '三'];
S.season = [['春', '夏', '秋', '冬'], ['春', '夏', '秋', '冬']];
function dateStr(tk, gen) {
  const y = yearOf(tk), s = S.season[0][seasonOf(tk)], d = (dayIdx(tk) % DAYS_YEAR) % 3 + 1, hh = hourOf(tk);
  if (LANG === 'ja') return `第${gen || 1}世 ${y}年目 ${s} ${KANJI_NUM[d]}日目 ${hh}時`;
  return `第${gen || 1}世 第${y}年 ${s} 第${KANJI_NUM[d]}日 ${hh}時`;
}
function timeWord(tk) {
  const h = hourOf(tk);
  return h < 5 ? 'night' : h < 10 ? 'morning' : h < 16 ? 'day' : h < 19 ? 'dusk' : h < 23 ? 'evening' : 'night';
}
