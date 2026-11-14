// ===== Gioca e Impara S — l'app (superiori) =====
// Uso libero: niente minuti, niente blocco, niente personaggi. Si sceglie l'anno e la materia e si gioca.
(() => {
  const $app = document.getElementById("app");
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pick = a => a[Math.floor(Math.random() * a.length)];

  const SUBJ = [
    { id: "matematica", name: "Matematica", color: "#6FB6FF", top: 2.4, h: 19.5 },
    { id: "italiano", name: "Italiano", color: "#FF9DB5", top: 22.5, h: 14.6 },
    { id: "inglese", name: "Inglese", color: "#FFA94D", top: 37.4, h: 14.8 },
    { id: "storia", name: "Storia", color: "#C79BFF", top: 52.5, h: 14.9 },
    { id: "civica", name: "Educazione civica", color: "#8FD3FF", top: 67.7, h: 14.5 },
    { id: "scienze", name: "Scienze", color: "#7BE38B", top: 82.6, h: 15.3 }
  ];
  const YEARS = [
    { id: 8, label: "1ª", ready: true }, { id: 9, label: "2ª", ready: true }, { id: 10, label: "3ª", ready: true },
    { id: 11, label: "4ª", ready: true }, { id: 12, label: "5ª", ready: true }
  ];
  const GAME_SHARE = 0.8;   // quota di giri che sono giochi; il resto sono domande a risposta multipla

  // ---------------------------------------------------------------- icone (SVG, mai emoji)
  const I = (d, extra) => `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra || ""}>${d}</svg>`;
  const ICON = {
    close: I('<path d="M6 6l12 12M18 6L6 18"/>'),
    voiceOn: I('<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/>'),
    voiceOff: I('<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M17 9.5l4 5M21 9.5l-4 5"/>'),
    flame: I('<path d="M12 3c1 3.5 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3.2 2-4.2C9.5 11 11 10 12 3z"/>'),
    bolt: I('<path d="M13 2L5 14h6l-1 8 8-12h-6l1-8z"/>'),
    next: I('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    again: I('<path d="M4 12a8 8 0 1 0 2.6-5.9"/><path d="M4 4v4.5h4.5"/>'),
    ear: I('<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/>'),
    mix: I('<path d="M4 7h3c5 0 5 10 10 10h3M4 17h3c1.6 0 2.7-1 3.6-2.3M17 4l3 3-3 3M17 14l3 3-3 3M13.4 9.3C14.3 8 15.4 7 17 7h3"/>'),
    ok: I('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),
    ko: I('<path d="M6 6l12 12M18 6L6 18"/>'),
    search: I('<circle cx="11" cy="11" r="6.5"/><path d="M16 16l5 5"/>'),
    help: I('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.6 2.2c-.7.4-1.1.9-1.1 1.8M12 17v.2"/>'),
    mic: I('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>')
  };

  // ---------------------------------------------------------------- dati salvati sul dispositivo
  const KEY = "gis1";
  const blank = () => ({ year: 8, voice: true, xp: {}, ok: 0, tot: 0, best: 0, seen: {} });
  let store = blank();
  try { const s = JSON.parse(localStorage.getItem(KEY) || "null"); if (s && typeof s === "object") store = Object.assign(blank(), s); } catch (e) {}
  if (!YEARS.some(y => y.id === store.year && y.ready)) store.year = 8;
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) {} };
  const xpOf = id => store.xp[id] || 0;
  const levelOf = id => Math.floor(xpOf(id) / 100) + 1;

  // ---------------------------------------------------------------- suoni e voce
  const Sfx = (() => {
    let ctx = null;
    const tone = (f, at, dur, type, vol) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type; o.frequency.value = f;
      g.gain.setValueAtTime(vol, ctx.currentTime + at);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + at + dur);
      o.connect(g); g.connect(ctx.destination);
      o.start(ctx.currentTime + at); o.stop(ctx.currentTime + at + dur + 0.02);
    };
    const play = fn => { try { if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)(); if (ctx.state === "suspended") ctx.resume(); fn(); } catch (e) {} };
    return {
      tap: () => play(() => tone(660, 0, 0.06, "triangle", 0.12)),
      ok: () => play(() => [523, 659, 784, 1047].forEach((f, k) => tone(f, k * 0.09, 0.16, "triangle", 0.16))),
      no: () => play(() => { tone(196, 0, 0.18, "sawtooth", 0.1); tone(147, 0.12, 0.25, "sawtooth", 0.1); })
    };
  })();
  const say = segs => { if (store.voice && Voice.canSpeak()) Voice.speak(segs, () => {}); };
  const hush = () => { if (Voice.isSpeaking()) Voice.stopSpeaking(); };

  Games.setTap(() => { Sfx.tap(); hush(); });
  Games.setBoom(() => Sfx.no());
  Games.setAvatar(() => `<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="26" fill="#6FB6FF"/><circle cx="32" cy="32" r="12" fill="#0B1230"/></svg>`);
  Games.setSpeak(card => say(Speech.fin(card.mq ? Speech.mqSegs(card.mq) : card.sort ? Speech.sortSegs(card) : card.words ? Speech.oddSegs(card) : Speech.vfSegs(card))), () => !!store.voice);

  // ---------------------------------------------------------------- schermata iniziale
  let game = null, burst = null, burstPick = false;
  const voiceBtn = () => `<button class="s-ic ${store.voice ? "on" : "off"}" data-act="voice" aria-label="${store.voice ? "Voce accesa: tocca per spegnerla" : "Voce spenta: tocca per accenderla"}" aria-pressed="${store.voice}">${store.voice ? ICON.voiceOn : ICON.voiceOff}</button>`;
  function home() {
    game = null; burst = null; hush(); Games.stop();
    document.body.dataset.sub = "";
    const pct = store.tot ? Math.round((store.ok / store.tot) * 100) : 0;
    $app.innerHTML = `<section class="screen s-home">
      <header class="s-top"><h1>Gioca e Impara <b>S</b></h1><span class="s-top-btns"><button class="s-ic" data-act="intro" aria-label="Come funziona">${ICON.help}</button><button class="s-ic" data-act="search" aria-label="Cerca un argomento">${ICON.search}</button>${voiceBtn()}</span></header>
      <div class="s-years" role="group" aria-label="Anno di scuola">${YEARS.map(y => `<button class="s-year ${y.id === store.year ? "on" : ""}" data-act="year" data-y="${y.id}" ${y.ready ? "" : "disabled"}><b>${y.label}</b><small>${y.ready ? "superiore" : "in arrivo"}</small></button>`).join("")}</div>
      <div class="s-menu"><div class="s-menu-in">
        <img src="img/menu.png" alt="">
        ${SUBJ.map(s => `<button class="s-band" data-act="play" data-sub="${s.id}" style="top:${s.top}%;height:${s.h}%;--sc:${s.color}" aria-label="${esc(s.name)}, livello ${levelOf(s.id)}"><span class="s-lv">${ICON.bolt}Liv. ${levelOf(s.id)}</span></button>`).join("")}
      </div></div>
      <div class="s-foot">
        <button class="s-mix" data-act="play" data-sub="mista">${ICON.mix}<span>Sfida mista</span></button>
        <button class="s-mix s-bast ${burstPick ? "on" : ""}" data-act="bastarda" aria-pressed="${burstPick}">${ICON.bolt}<span>Raffica Bastarda</span></button>
        ${burstPick ? `<div class="s-stat"><span class="s-pickmsg">Scegli la materia della raffica (5 su 5, o si ricomincia)</span></div>` : `<div class="s-stat"><span>${ICON.ok}<b>${store.ok}</b> riuscite</span><span>${ICON.flame}<b>${store.best}</b> di fila</span><span><b>${pct}%</b> giuste</span></div>`}
      </div>
    </section>`;
  }

  // ---------------------------------------------------------------- presentazione (si apre da sola la prima volta; dopo, dal tasto «?»)
  const INTRO = [
    { ic: '<rect x="3" y="4" width="18" height="4" rx="1"/><rect x="3" y="10" width="18" height="4" rx="1"/><rect x="3" y="16" width="18" height="4" rx="1"/>', t: "Scegli anno e materia", d: "In alto tocchi l'anno (1ª–5ª superiore), poi una delle sei materie. «Sfida mista» le mescola tutte." },
    { ic: '<path d="M13 2L5 14h6l-1 8 8-12h-6l1-8z"/>', t: "Giochi e domande", d: "Ogni giro è un gioco diverso o una domanda. Nessun timer da inseguire e nessun blocco: giochi quanto vuoi." },
    { ic: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l5 5"/>', t: "Cerca quello che ti serve", d: "Con la lente scrivi, o dici a voce, un argomento, una formula o un nome storico e trovi le schede." },
    { ic: '<path d="M12 3c1 3.5 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3.2 2-4.2C9.5 11 11 10 12 3z"/>', t: "Raffica Bastarda", d: "Accendila prima di scegliere la materia: cinque domande di fila, un errore e si ricomincia da capo." },
    { ic: '<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/>', t: "Anche a voce", d: "L'altoparlante legge le domande e il microfono ti fa rispondere parlando. Puoi spegnerli quando vuoi." }
  ];
  function intro(first) {
    let n = 0;
    const done = () => { store.intro = 1; save(); const o = document.getElementById("s-intro"); if (o) o.remove(); };
    const draw = () => {
      const o = document.getElementById("s-intro") || document.body.appendChild(Object.assign(document.createElement("div"), { id: "s-intro", className: "s-intro" }));
      const x = INTRO[n], last = n === INTRO.length - 1;
      o.innerHTML = `<div class="s-intro-card" role="dialog" aria-label="Come funziona">
        <div class="s-intro-ic"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${x.ic}</svg></div>
        <h2>${esc(x.t)}</h2><p>${esc(x.d)}</p>
        <div class="s-intro-dots">${INTRO.map((_, i) => `<i class="${i === n ? "on" : ""}"></i>`).join("")}</div>
        <div class="s-fb-btn"><button class="s-btn alt" data-act="introskip">${last ? "Chiudi" : "Salta"}</button><button class="s-btn" data-act="${last ? "introskip" : "intronext"}"><span>${last ? "Inizia" : "Avanti"}</span>${last ? "" : ICON.next}</button></div>
      </div>`;
    };
    intro.next = () => { n++; draw(); };
    intro.close = done;
    draw();
  }

  // ---------------------------------------------------------------- ricerca (scritta o a voce)
  const fold = t => String(t || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  let searchIndex = null;
  function buildIndex() {
    const out = [];
    SUBJ.forEach(s => {
      const arr = (typeof QBANK !== "undefined" && QBANK[s.id] && QBANK[s.id].S) || [];
      arr.forEach(x => { if (x && x.q && x.a) out.push({ sub: s.id, cl: x.cl, t: x.q, r: x.a[x.c || 0], e: x.e || "", key: fold(x.q + " " + x.a[x.c || 0] + " " + (x.e || "")) }); });
      const pr = (SUP.pairs && SUP.pairs[s.id]) || [];
      pr.forEach(g => (g.pairs || []).forEach(p => out.push({ sub: s.id, cl: g.cl, t: p[0], r: p[1], e: g.prompt || "", key: fold(p[0] + " " + p[1]), pair: true })));
    });
    return out;
  }
  function runSearch(text) {
    if (!searchIndex) searchIndex = buildIndex();
    const w = fold(text).split(/[^a-z0-9]+/).filter(x => x.length > 1);
    if (!w.length) return [];
    return searchIndex.filter(x => w.every(k => (" " + x.key.replace(/[^a-z0-9]+/g, " ") + " ").includes(" " + k + (k.length <= 3 ? " " : ""))))
      .sort((a, b) => (+w.every(k => (" " + fold(b.t)).includes(" " + k))) - (+w.every(k => (" " + fold(a.t)).includes(" " + k))) || (a.pair ? 1 : 0) - (b.pair ? 1 : 0))
      .slice(0, 40);
  }
  const yearOf = cl => { const a = cl && cl[0]; const y = YEARS.find(v => v.id === a); return y ? y.label : ""; };
  function showResults(text) {
    const box = document.getElementById("s-res"); if (!box) return;
    const res = runSearch(text);
    if (!text.trim()) { box.innerHTML = ""; return; }
    if (!res.length) { box.innerHTML = `<p class="s-none">Nessun risultato per «${esc(text)}».</p>`; return; }
    box.innerHTML = res.map(x => { const sj = SUBJ.find(v => v.id === x.sub); return `<article class="s-card" style="--sc:${sj.color}"><div class="s-card-h"><b>${esc(sj.name)}</b><small>${yearOf(x.cl)}</small></div>` +
      (x.pair ? `<p class="s-card-q">${esc(x.t)}</p><p class="s-card-a">${esc(x.r)}</p><p class="s-card-e">${esc(x.e)}</p>` : `<p class="s-card-q">${esc(x.t)}</p><p class="s-card-a">${esc(x.r)}</p>${x.e ? `<p class="s-card-e">${esc(x.e)}</p>` : ""}`) + `</article>`; }).join("");
  }
  function searchScreen() {
    game = null; hush(); Games.stop(); document.body.dataset.sub = "";
    $app.innerHTML = `<section class="screen s-search">
      <div class="s-bar"><button class="s-ic" data-act="exit" aria-label="Torna indietro">${ICON.close}</button>
        <input id="s-q" class="s-input" type="search" placeholder="Argomento, formula, nome…" autocomplete="off" aria-label="Cerca">
        <button class="s-ic" data-act="mic" aria-label="Cerca con la voce">${ICON.mic}</button></div>
      <div id="s-res" class="s-res"></div></section>`;
    const inp = document.getElementById("s-q");
    inp.addEventListener("input", () => showResults(inp.value));
    inp.focus();
  }
  function micSearch() {
    const inp = document.getElementById("s-q"); if (!inp) return;
    if (!Voice.canListen()) { document.getElementById("s-res").innerHTML = `<p class="s-none">Il microfono non è disponibile qui: scrivi la ricerca.</p>`; return; }
    const btn = document.querySelector('[data-act="mic"]'); btn.classList.add("on");
    Voice.listen().then(m => { if (m && m[0]) { inp.value = m[0].replace(/[.!?]+$/, ""); showResults(inp.value); } })
      .catch(() => { document.getElementById("s-res").innerHTML = `<p class="s-none">Non ti ho sentito: riprova o scrivi.</p>`; })
      .then(() => btn.classList.remove("on"));
  }

  // ---------------------------------------------------------------- una partita
  function start(sub) {
    game = { mix: sub === "mista", sid: sub, streak: 0, lastKind: null, round: null, q: null, done: false, n: 0 };
    nextRound();
  }
  function nextRound() {
    if (!game) return;
    hush(); Games.stop();
    if (game.mix) game.sid = pick(SUBJ).id;
    game.done = false; game.round = null; game.q = null; game.n++; game.counted = false;
    let r = null;
    try { r = Games.pick(game.sid, store.year, game.lastKind, GAME_SHARE); } catch (e) { r = null; }
    if (r) { game.round = r; game.lastKind = r.kind; renderRound(); }
    else { game.q = Questions.next(game.sid, store.year); game.lastKind = null; renderQuiz(); }
  }
  function repeat() {
    if (!game) return;
    hush(); Games.stop(); game.done = false;
    if (game.round) renderRound(); else renderQuiz();
  }
  const bar = title => {
    const s = SUBJ.find(x => x.id === game.sid);
    document.body.dataset.sub = s.id;
    return `<div class="s-bar" style="--sc:${s.color}">
      <button class="s-ic" data-act="exit" aria-label="Torna alle materie">${ICON.close}</button>
      <span class="s-tag"><b>${esc(s.name)}</b>${title ? ` · ${esc(title)}` : ""}</span>
      <span class="s-streak" aria-label="Sfide riuscite di fila">${ICON.flame}<b id="s-streak">${game.streak}</b></span>
      ${voiceBtn()}
    </div>`;
  };
  function renderRound() {
    const r = game.round;
    // le regole di un gioco si leggono le prime due volte, poi non servono più
    const n = store.seen[r.kind] || 0, showHint = !!r.hint && n < 2;
    if (!game.counted) { store.seen[r.kind] = n + 1; save(); game.counted = true; }
    $app.innerHTML = `<section class="screen play s-play">
      ${bar(r.title)}
      <div class="s-prompt" id="bubble"><p>${esc(r.prompt)}</p>${showHint ? `<small>${esc(r.hint)}</small>` : ""}</div>
      <div id="gbox"></div>
      <div id="gfb"></div>
    </section>`;
    window.scrollTo(0, 0);
    Games.mount(document.getElementById("gbox"), r, roundDone);
    readNow();
  }
  function renderQuiz() {
    const q = game.q;
    $app.innerHTML = `<section class="screen play quiz s-play s-quiz">
      ${bar("Domanda")}
      <div class="s-prompt" id="bubble"><p>${esc(q.q)}</p></div>
      <div class="s-answers">${q.a.map((a, i) => `<button class="s-ans" data-act="ans" data-i="${i}"${q.ae ? ' lang="en"' : ""}><b>${"ABCD"[i]}</b><span>${esc(a)}</span></button>`).join("")}</div>
      <div id="gfb"></div>
    </section>`;
    window.scrollTo(0, 0);
    readNow();
  }
  function readNow() {
    if (!game || !store.voice) return;
    if (game.round) { say(Speech.roundSpeech(game.round)); return; }
    readQ(game.q);
  }
  function readQ(q) {
    if (!store.voice) return;
    const segs = [...Speech.langSegs(q.q, q.en), { t: ". " }];
    q.a.forEach((a, i) => segs.push({ t: "ABCD"[i] + ": " }, ...Speech.ansSegs(q, a), { t: ". " }));
    say(Speech.fin(segs));
  }
  function answer(i) {
    const q = game.q; if (!q || game.done) return;
    const ok = i === q.c;
    document.querySelectorAll(".s-ans").forEach((b, k) => { b.disabled = true; b.classList.add(k === q.c ? "right" : k === i ? "wrong" : "dim"); });
    if (ok) Sfx.tap(); else Sfx.no();
    finish(ok, q.a[q.c], q.e, ok ? 0 : 3, !!q.ae);
  }
  function roundDone(ok, correct, expl, mistakes) {
    const r = game && game.round; if (!r || game.done) return;
    finish(ok, (!ok && correct) || r.solution || correct, expl || (r.q && r.q.e) || "", mistakes || 0, !!(r.eng && r.rEn));
  }
  const WIN = ["Giusto.", "Esatto.", "Ben fatto.", "Centrato.", "Perfetto."], LOSE = ["Non questa volta.", "Sbagliato.", "Peccato."];
  function finish(ok, solution, expl, mistakes, solEn) {
    if (!game || game.done) return;
    game.done = true; hush();
    const gain = ok ? Math.max(5, 12 - 3 * mistakes) : 0;
    const before = levelOf(game.sid);
    store.tot++;
    if (ok) { store.ok++; game.streak++; store.best = Math.max(store.best, game.streak); store.xp[game.sid] = xpOf(game.sid) + gain; Sfx.ok(); }
    else game.streak = 0;
    save();
    const up = levelOf(game.sid) > before;
    const title = ok ? pick(WIN) : pick(LOSE);
    const st = document.getElementById("s-streak"); if (st) st.textContent = game.streak;
    const fb = document.getElementById("gfb");
    if (!fb) return;
    const into = xpOf(game.sid) % 100;
    fb.innerHTML = `<div class="s-fb ${ok ? "ok" : "ko"}" role="status" aria-live="polite">
      <div class="s-fb-head"><span class="s-fb-ic">${ok ? ICON.ok : ICON.ko}</span><h2>${esc(title)}</h2>${ok ? `<span class="s-xp">${ICON.bolt}+${gain}</span>` : ""}</div>
      ${solution ? `<p class="s-sol"><small>Soluzione</small><b${solEn ? ' lang="en"' : ""}>${esc(solution)}</b></p>` : ""}
      ${expl ? `<p class="s-expl">${esc(expl)}</p>` : ""}
      <div class="s-lvl"><span>Liv. ${levelOf(game.sid)}${up ? " — nuovo livello" : ""}</span><i><em style="width:${into}%"></em></i></div>
      <div class="s-fb-btn"><button class="s-btn alt" data-act="repeat">${ICON.again}<span>Ripeti</span></button><button class="s-btn" data-act="next"><span>Avanti</span>${ICON.next}</button></div>
    </div>`;
    fb.scrollIntoView({ block: "nearest", behavior: "smooth" });
    if (store.voice) {
      const segs = [{ t: title + " " }];
      if (!ok && solution) segs.push({ t: "Soluzione: " }, { t: Speech.toSpeech(solution) + ". ", l: solEn ? "en" : "" });
      if (expl) segs.push({ t: Speech.toSpeech(expl) });
      say(Speech.fin(segs));
    }
  }


  // ---------------------------------------------------------------- Raffica Bastarda
  // 5 domande a risposta multipla. Se sbagli anche una sola volta la raffica ricomincia da capo
  // (domande e risposte in un altro ordine) finché non fai 5 su 5. È la ripetizione mascherata da sfida.
  const BURST_N = 5;
  const BURST_KO = ["Ci sei cascato.", "Quasi. Cioè no.", "Sbagliato. Da capo.", "Era facile, e lo sai.", "Ahi. Si ricomincia."];
  const shuf = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  // stessa domanda, risposte in un altro ordine (mantiene spiegazione e marcatori inglesi)
  const reorder = q => {
    const it = shuf(q.a.map((t, i) => ({ t, ok: i === q.c })));
    const o = { q: q.q, a: it.map(x => x.t), c: it.findIndex(x => x.ok), e: q.e || "", sid: q.sid };
    if (q.en) o.en = q.en; if (q.ae) o.ae = true; return o;
  };
  function buildBurstSet(sub) {
    const qs = [], seen = new Set();
    for (let i = 0; i < 80 && qs.length < BURST_N; i++) {
      const sid = sub === "mista" ? pick(SUBJ).id : sub;
      const q = Questions.next(sid, store.year);
      if (q && q.q && !seen.has(q.q)) { seen.add(q.q); q.sid = sid; qs.push(q); }
    }
    return qs;
  }
  function startBurst(sub) {
    burstPick = false; game = null; hush(); Games.stop();
    const qs = buildBurstSet(sub);
    if (qs.length < 3) { home(); return; }
    burst = { sub, qs, idx: 0, attempt: 1, errors: 0, stumbles: {}, t0: Date.now(), locked: false };
    renderBurstQ();
  }
  function renderBurstQ() {
    const b = burst, q = b.qs[b.idx], s = SUBJ.find(x => x.id === q.sid);
    b.locked = false; document.body.dataset.sub = s.id;
    $app.innerHTML = `<section class="screen play quiz s-play s-quiz s-burst" id="s-burst">
      <div class="s-bar" style="--sc:${s.color}">
        <button class="s-ic" data-act="exit" aria-label="Torna alle materie">${ICON.close}</button>
        <span class="s-tag"><b>${esc(s.name)}</b> · Raffica, tentativo ${b.attempt}</span>
        ${voiceBtn()}
      </div>
      <div class="s-dots" role="img" aria-label="Domanda ${b.idx + 1} di ${b.qs.length}">${b.qs.map((_, i) => `<i class="${i < b.idx ? "d" : i === b.idx ? "n" : ""}"></i>`).join("")}</div>
      <div class="s-prompt" id="bubble"><p>${esc(q.q)}</p></div>
      <div class="s-answers">${q.a.map((a, i) => `<button class="s-ans" data-act="bans" data-i="${i}"${q.ae ? ' lang="en"' : ""}><b>${"ABCD"[i]}</b><span>${esc(a)}</span></button>`).join("")}</div>
      <div id="gfb"></div>
    </section>`;
    window.scrollTo(0, 0);
    readQ(q);
  }
  function burstAnswer(i) {
    const b = burst; if (!b || b.locked) return;
    const q = b.qs[b.idx], ok = i === q.c; b.locked = true; hush();
    document.querySelectorAll(".s-ans").forEach((x, k) => { x.disabled = true; x.classList.add(k === q.c ? "right" : k === i ? "wrong" : "dim"); });
    store.tot++; if (ok) store.ok++; save();
    if (ok) {
      Sfx.ok();
      setTimeout(() => { if (burst !== b) return; b.idx++; if (b.idx >= b.qs.length) renderBurstEnd(); else renderBurstQ(); }, 750);
      return;
    }
    Sfx.no(); b.errors++; b.stumbles[q.q] = (b.stumbles[q.q] || 0) + 1;
    const sec = document.getElementById("s-burst"); if (sec) sec.classList.add("s-shake");
    const title = pick(BURST_KO), fb = document.getElementById("gfb"); if (!fb) return;
    fb.innerHTML = `<div class="s-fb ko" role="status" aria-live="polite">
      <div class="s-fb-head"><span class="s-fb-ic">${ICON.ko}</span><h2>${esc(title)}</h2></div>
      <p class="s-sol"><small>Soluzione</small><b${q.ae ? ' lang="en"' : ""}>${esc(q.a[q.c])}</b></p>
      ${q.e ? `<p class="s-expl">${esc(q.e)}</p>` : ""}
      <p class="s-expl">La raffica ricomincia da capo, con le domande in un altro ordine. Si vince solo con ${b.qs.length} su ${b.qs.length}.</p>
      <div class="s-fb-btn one"><button class="s-btn" data-act="brestart">${ICON.again}<span>Ricomincia</span></button></div>
    </div>`;
    fb.scrollIntoView({ block: "nearest", behavior: "smooth" });
    if (store.voice) { const segs = [{ t: title + " Soluzione: " }, { t: Speech.toSpeech(q.a[q.c]) + ". ", l: q.ae ? "en" : "" }]; if (q.e) segs.push({ t: Speech.toSpeech(q.e) }); say(Speech.fin(segs)); }
  }
  function burstRestart() {
    const b = burst; if (!b) return;
    b.qs = shuf(b.qs).map(reorder); b.idx = 0; b.attempt++;
    renderBurstQ();
  }
  const burstRank = n => n === 1 ? "Impassibile. O l'avevi già studiato." : n === 2 ? "Testardo con metodo." : n <= 4 ? "Maratoneta della ripetizione." : "Martire del ripasso (ma ora lo sai).";
  function renderBurstEnd() {
    const b = burst, sec = Math.round((Date.now() - b.t0) / 1000), time = Math.floor(sec / 60) + ":" + String(sec % 60).padStart(2, "0");
    const worst = Object.entries(b.stumbles).sort((x, y) => y[1] - x[1]).slice(0, 3);
    const title = burstRank(b.attempt);
    document.body.dataset.sub = "";
    Sfx.ok();
    $app.innerHTML = `<section class="screen play s-play s-burst-end">
      <div class="s-bar"><button class="s-ic" data-act="exit" aria-label="Torna alle materie">${ICON.close}</button><span class="s-tag"><b>Raffica</b> · chiusa</span>${voiceBtn()}</div>
      <div class="s-fb ok" role="status">
        <p class="s-rank">Titolo sbloccato</p>
        <div class="s-fb-head"><span class="s-fb-ic">${ICON.ok}</span><h2>${esc(title)}</h2></div>
        <div class="s-stats3">
          <div><small>Tentativi</small><b>${b.attempt}</b></div>
          <div><small>Errori</small><b>${b.errors}</b></div>
          <div><small>Tempo</small><b>${time}</b></div>
        </div>
        ${worst.length ? `<p class="s-expl"><b>Dove hai inciampato</b></p><ul class="s-stumble">${worst.map(([q, c]) => `<li>${esc(q)} (${c}×)</li>`).join("")}</ul>` : `<p class="s-expl">Nessun inciampo. Ripassa tra un paio di giorni, quando avrai dimenticato qualcosa.</p>`}
        <div class="s-fb-btn"><button class="s-btn alt" data-act="exit"><span>Materie</span></button><button class="s-btn" data-act="bmore">${ICON.again}<span>Un'altra raffica</span></button></div>
      </div>
    </section>`;
    window.scrollTo(0, 0);
    if (store.voice) say(Speech.fin([{ t: "Titolo sbloccato: " + title }]));
  }

  // ---------------------------------------------------------------- tocchi
  document.addEventListener("click", e => {
    const el = e.target.closest("[data-act]"); if (!el) return;
    const act = el.dataset.act;
    if (act !== "voice") hush();
    if (act === "voice") {
      store.voice = !store.voice; save();
      if (!store.voice) Voice.stopSpeaking();
      document.querySelectorAll('[data-act="voice"]').forEach(b => { b.outerHTML = voiceBtn(); });
      if (store.voice && game && !game.done) readNow();
      else if (store.voice && burst && !burst.locked && burst.idx < burst.qs.length) readQ(burst.qs[burst.idx]);
    } else if (act === "year") { store.year = +el.dataset.y; save(); home(); }
    else if (act === "play") { Sfx.tap(); if (burstPick) startBurst(el.dataset.sub); else start(el.dataset.sub); }
    else if (act === "bastarda") { Sfx.tap(); burstPick = !burstPick; home(); }
    else if (act === "bans") burstAnswer(+el.dataset.i);
    else if (act === "brestart") burstRestart();
    else if (act === "bmore") startBurst(burst ? burst.sub : "mista");
    else if (act === "exit") { burstPick = false; home(); }
    else if (act === "search") searchScreen();
    else if (act === "intro") intro();
    else if (act === "intronext") intro.next();
    else if (act === "introskip") intro.close();
    else if (act === "mic") micSearch();
    else if (act === "ans") answer(+el.dataset.i);
    else if (act === "next") nextRound();
    else if (act === "repeat") repeat();
  });
  // tasto indietro: dalla partita si torna alle materie, non si esce dall'app
  document.addEventListener("backbutton", e => { if (game || burst || burstPick) { e.preventDefault(); burstPick = false; home(); } else if (navigator.app && navigator.app.exitApp) navigator.app.exitApp(); }, false);

  home();
  if (!store.intro) intro(true);
})();
