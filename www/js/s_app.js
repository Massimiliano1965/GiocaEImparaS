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
    { id: 8, label: "1ª", ready: true }, { id: 9, label: "2ª", ready: false }, { id: 10, label: "3ª", ready: false },
    { id: 11, label: "4ª", ready: false }, { id: 12, label: "5ª", ready: false }
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
    ko: I('<path d="M6 6l12 12M18 6L6 18"/>')
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
  let game = null;
  const voiceBtn = () => `<button class="s-ic ${store.voice ? "on" : "off"}" data-act="voice" aria-label="${store.voice ? "Voce accesa: tocca per spegnerla" : "Voce spenta: tocca per accenderla"}" aria-pressed="${store.voice}">${store.voice ? ICON.voiceOn : ICON.voiceOff}</button>`;
  function home() {
    game = null; hush(); Games.stop();
    document.body.dataset.sub = "";
    const pct = store.tot ? Math.round((store.ok / store.tot) * 100) : 0;
    $app.innerHTML = `<section class="screen s-home">
      <header class="s-top"><h1>Gioca e Impara <b>S</b></h1>${voiceBtn()}</header>
      <div class="s-years" role="group" aria-label="Anno di scuola">${YEARS.map(y => `<button class="s-year ${y.id === store.year ? "on" : ""}" data-act="year" data-y="${y.id}" ${y.ready ? "" : "disabled"}><b>${y.label}</b><small>${y.ready ? "superiore" : "in arrivo"}</small></button>`).join("")}</div>
      <div class="s-menu"><div class="s-menu-in">
        <img src="img/menu.png" alt="">
        ${SUBJ.map(s => `<button class="s-band" data-act="play" data-sub="${s.id}" style="top:${s.top}%;height:${s.h}%;--sc:${s.color}" aria-label="${esc(s.name)}, livello ${levelOf(s.id)}"><span class="s-lv">${ICON.bolt}Liv. ${levelOf(s.id)}</span></button>`).join("")}
      </div></div>
      <div class="s-foot">
        <button class="s-mix" data-act="play" data-sub="mista">${ICON.mix}<span>Sfida mista</span></button>
        <div class="s-stat"><span>${ICON.ok}<b>${store.ok}</b> riuscite</span><span>${ICON.flame}<b>${store.best}</b> di fila</span><span><b>${pct}%</b> giuste</span></div>
      </div>
    </section>`;
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
    const q = game.q, segs = [...Speech.langSegs(q.q, q.en), { t: ". " }];
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
    } else if (act === "year") { store.year = +el.dataset.y; save(); home(); }
    else if (act === "play") { Sfx.tap(); start(el.dataset.sub); }
    else if (act === "exit") home();
    else if (act === "ans") answer(+el.dataset.i);
    else if (act === "next") nextRound();
    else if (act === "repeat") repeat();
  });
  // tasto indietro: dalla partita si torna alle materie, non si esce dall'app
  document.addEventListener("backbutton", e => { if (game) { e.preventDefault(); home(); } else if (navigator.app && navigator.app.exitApp) navigator.app.exitApp(); }, false);

  home();
})();
