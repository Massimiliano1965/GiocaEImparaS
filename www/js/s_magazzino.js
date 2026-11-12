// ===== Gioca e Impara S — MAGAZZINO GIOCHI (per ragazzi dai 14 anni) =====
// Dodici giochi in più, pronti da accendere. Usano gli stessi dati degli altri: domande (Questions.next),
// coppie (SUP.pairs), sequenze (SUP.seqs). Ognuno si registra con Games.register(nome, { subjects, make, mount }):
//   make(classe, materia)  -> prepara il giro (o null se per quella materia non ci sono dati)
//   mount(el, giro, onDone) -> lo mostra; alla fine onDone(riuscito, soluzione, spiegazione, errori)
// Regola comune: un errore si perdona, al secondo si perde (dove non c'è scritto altro).
// Per accenderli nell'app basta caricare questo file dopo s_games.js; l'elenco è in MAGAZZINO.md.
(() => {
  const H = Games.internals, { esc, shuffle, pick, rnd } = H;
  const tap = () => H.tap(), boom = () => H.boom();
  const alive = el => el && el.isConnected;
  const ALL = ["italiano", "matematica", "inglese", "storia", "scienze", "civica"];
  const NOMATH = ALL.filter(s => s !== "matematica");
  const pips = (m, n) => `<div class="g2-pips" aria-label="Errori perdonati">${Array.from({ length: n }, (_, i) => `<i class="${i < n - m ? "" : "x"}"></i>`).join("")}</div>`;
  const lang = on => (on ? ' lang="en"' : "");
  const later = (el, ms, fn) => setTimeout(() => { if (alive(el)) fn(); }, ms);

  // n domande diverse per materia e classe, con risposte non troppo lunghe
  function questions(s, c, n, maxLen) {
    const out = [], seen = new Set();
    for (let g = 0; out.length < n && g < 80; g++) {
      const q = typeof Questions !== "undefined" ? Questions.next(s, c) : null;
      if (!q || !Array.isArray(q.a) || q.a.length < 4 || seen.has(q.q) || q.q.length > 150) continue;
      if (maxLen && q.a.some(a => String(a).length > maxLen)) continue;
      seen.add(q.q); out.push(q);
    }
    return out.length === n ? out : null;
  }
  // i quattro pulsanti di risposta; st[i] = "" | "ok" | "ko" | "off" | "sel"
  const answers = (q, st, locked) => `<div class="sx-ans">${q.a.map((a, i) => `<button class="sx-opt ${st[i] || ""}" data-a="${i}" ${locked || st[i] === "off" || st[i] === "ko" ? "disabled" : ""}${lang(q.ae)}><b>${"ABCD"[i]}</b><span>${esc(a)}</span></button>`).join("")}</div>`;
  const qtext = q => `<p class="sx-q">${esc(q.q)}</p>`;
  // sequenze della materia; per la matematica quelle generate
  function sequences(s, c) {
    if (s === "matematica") return Array.from({ length: 4 }, () => SUP.filaMath(c)).filter(Boolean);
    return SUP.inYear((SUP.seqs[s] || []).slice(), c);
  }
  // domanda singola ricavata da una coppia «Collega ogni … al suo …»
  function askOf(prompt, left) {
    const hit = (SUP.askRules || []).find(r => r[0].test(prompt));
    return hit ? `${hit[1]}«${left}»${hit[2]}` : `${String(prompt).replace(/\.$/, "")}: «${left}»`;
  }
  const plain = w => String(w).normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase();
  // coppie con la risposta di una parola sola (solo lettere), per i giochi di parole
  function wordPairs(s, c, min, max) {
    const out = [];
    SUP.inYear((SUP.pairs[s] || []).slice(), c).forEach(T => T.pairs.forEach(p => {
      const w = plain(p[1]);
      if (/^[A-Z]+$/.test(w) && w.length >= min && w.length <= max) out.push({ clue: askOf(T.prompt, p[0]), left: p[0], word: w, shown: p[1], en: !!T.rEn });
    }));
    return out;
  }

  // ================================================================ 1. TRIS
  // Scegli una casella e rispondi: giusta = la casella è tua, sbagliata = la prende il bot. Poi muove il bot.
  const LINES = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  const won = (b, m) => LINES.some(l => l.every(i => b[i] === m));
  function botMove(b) {
    const free = b.map((v, i) => (v ? -1 : i)).filter(i => i >= 0);
    if (!free.length) return -1;
    for (const m of ["O", "X"]) for (const i of free) { const t = b.slice(); t[i] = m; if (won(t, m)) return i; }
    return b[4] ? pick(free) : 4;
  }
  const MARK = { X: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>', O: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" stroke-width="3"/></svg>' };
  Games.register("tris", {
    subjects: ALL,
    make: (c, s) => {
      const qs = questions(s, c, 6, 60); if (!qs) return null;
      return { kind: "tris", title: "Tris", prompt: "Fai tris contro il bot.", hint: "Scegli una casella e rispondi: se è giusta la casella è tua, se sbagli la prende il bot. Poi tocca a lui.",
        speechIntro: "Tris. Scegli una casella e rispondi alla domanda.", qs, s, c, q0: qs[0] };
    },
    mount: (el, r, onDone) => {
      const b = Array(9).fill(""); let k = 0, cell = -1, st = [], lock = false, done = false, good = 0, asked = 0, last = null;
      const nextQ = () => { if (k >= r.qs.length) { const more = questions(r.s, r.c, 4, 60); if (more) r.qs.push(...more); } return r.qs[Math.min(k, r.qs.length - 1)]; };
      function draw() {
        const q = cell >= 0 ? nextQ() : null;
        el.innerHTML = `<div class="g2 sx sx-tris">
          <div class="sx-board">${b.map((v, i) => `<button class="sx-cell ${v === "X" ? "me" : v === "O" ? "bot" : ""} ${i === cell ? "cur" : ""}" data-c="${i}" ${v || done || lock || cell >= 0 ? "disabled" : ""} aria-label="Casella ${i + 1}${v === "X" ? ", tua" : v === "O" ? ", del bot" : ""}">${MARK[v] || ""}</button>`).join("")}</div>
          ${q ? qtext(q) + answers(q, st, lock) : `<p class="sx-note">${done ? "" : "Tocca una casella libera"}</p>`}</div>`;
      }
      function end() {
        const w = won(b, "X"), l = won(b, "O"), full = b.every(Boolean);
        if (!w && !l && !full) return false;
        done = true; cell = -1; draw();
        const ok = w || (!l && b.filter(v => v === "X").length > b.filter(v => v === "O").length);
        onDone(ok, last && !last.ok ? last.q.a[last.q.c] : "", `${w ? "Tris!" : l ? "Tris del bot." : "Griglia piena."} Risposte giuste: ${good} su ${asked}.${last && !last.ok ? " Ultima sbagliata: " + last.q.q : ""}`, ok ? Math.min(2, asked - good) : 3);
        return true;
      }
      el.onclick = e => {
        if (done || lock) return;
        const c = e.target.closest(".sx-cell"), a = e.target.closest(".sx-opt");
        if (c && cell < 0) { cell = +c.dataset.c; st = []; tap(); draw(); return; }
        if (!a || cell < 0) return;
        const q = nextQ(), i = +a.dataset.a, ok = i === q.c;
        asked++; lock = true; last = { q, ok };
        if (ok) { good++; st[i] = "ok"; b[cell] = "X"; tap(); } else { st[i] = "ko"; st[q.c] = "ok"; b[cell] = "O"; boom(); }
        draw();
        later(el, ok ? 600 : 1500, () => {
          k++; cell = -1; lock = false;
          if (end()) return;
          if (ok) { const m = botMove(b); if (m >= 0) b[m] = "O"; if (end()) return; }
          draw();
        });
      };
      draw();
    }
  });

  // ================================================================ 2. SCALATA
  // Cinque domande di fila, due aiuti (50:50 e Cambia domanda). Un errore si perdona.
  Games.register("scalata", {
    subjects: ALL,
    make: (c, s) => {
      const qs = questions(s, c, 7, 70); if (!qs) return null;
      return { kind: "scalata", title: "Scalata", prompt: "Cinque domande per arrivare in cima.", hint: "Hai due aiuti, una volta ciascuno: «50:50» toglie due risposte sbagliate, «Cambia» sostituisce la domanda. Un errore si perdona.",
        speechIntro: "Scalata. Cinque domande per arrivare in cima.", qs, q0: qs[0] };
    },
    mount: (el, r, onDone) => {
      let step = 0, qi = 0, m = 0, st = [], lock = false, done = false; const used = { half: false, swap: false };
      function draw() {
        const q = r.qs[qi];
        el.innerHTML = `<div class="g2 sx sx-scal">${pips(m, 2)}
          <div class="sx-ladder">${[0, 1, 2, 3, 4].map(i => `<i class="${i < step ? "on" : i === step ? "cur" : ""}">${i + 1}</i>`).join("")}</div>
          ${qtext(q)}${answers(q, st, lock || done)}
          <div class="sx-help"><button data-h="half" ${used.half || lock || done ? "disabled" : ""}>50:50</button><button data-h="swap" ${used.swap || lock || done || qi >= r.qs.length - 1 ? "disabled" : ""}>Cambia</button></div></div>`;
      }
      el.onclick = e => {
        if (done || lock) return;
        const h = e.target.closest("[data-h]"), a = e.target.closest(".sx-opt"), q = r.qs[qi];
        if (h) {
          if (h.dataset.h === "half" && !used.half) { used.half = true; shuffle([0, 1, 2, 3].filter(i => i !== q.c)).slice(0, 2).forEach(i => { st[i] = "off"; }); }
          else if (h.dataset.h === "swap" && !used.swap && qi < r.qs.length - 1) { used.swap = true; qi++; st = []; }
          tap(); draw(); return;
        }
        if (!a) return;
        const i = +a.dataset.a;
        if (i === q.c) {
          st[i] = "ok"; lock = true; tap(); step++; draw();
          later(el, 650, () => {
            lock = false;
            if (step >= 5) { done = true; draw(); onDone(true, "", q.e, m); return; }
            qi = Math.min(qi + 1, r.qs.length - 1); st = []; draw();
          });
          return;
        }
        m++; st[i] = "ko"; boom();
        if (m >= 2) { done = true; st[q.c] = "ok"; draw(); onDone(false, q.a[q.c], q.e, 3); return; }
        draw();
      };
      draw();
    }
  });

  // ================================================================ 3. PAROLA SEGRETA
  // Indovina la parola-risposta in cinque tentativi: verde = lettera al posto giusto, giallo = c'è ma altrove.
  const KEYS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
  Games.register("parola", {
    subjects: NOMATH,
    make: (c, s) => {
      const list = wordPairs(s, c, 3, 9); if (!list.length) return null;
      const w = pick(list);
      return { kind: "parola", title: "Parola segreta", prompt: w.clue, hint: `La risposta ha ${w.word.length} lettere: hai cinque tentativi. Verde = lettera al posto giusto, giallo = la lettera c'è ma in un altro posto.`,
        speechIntro: "Parola segreta. Scrivi la risposta: hai cinque tentativi.", word: w.word, shown: w.shown, en: w.en, solution: w.shown };
    },
    mount: (el, r, onDone) => {
      const W = r.word, n = W.length, tries = []; let cur = "", done = false; const keyState = {};
      function score(g) {
        const res = Array(n).fill("no"), left = {};
        for (let i = 0; i < n; i++) { if (g[i] === W[i]) res[i] = "ok"; else left[W[i]] = (left[W[i]] || 0) + 1; }
        for (let i = 0; i < n; i++) { if (res[i] !== "ok" && left[g[i]]) { res[i] = "near"; left[g[i]]--; } }
        return res;
      }
      function draw() {
        const rows = [];
        for (let t = 0; t < 5; t++) {
          const g = tries[t], live = t === tries.length && !done;
          rows.push(`<div class="sx-wrow">${Array.from({ length: n }, (_, i) => `<i class="${g ? g.res[i] : ""} ${live && i === cur.length ? "cur" : ""}">${g ? g.w[i] : live ? cur[i] || "" : ""}</i>`).join("")}</div>`);
        }
        el.innerHTML = `<div class="g2 sx sx-word" style="--n:${n}">
          <div class="sx-wgrid" aria-label="Tentativi">${rows.join("")}</div>
          <div class="sx-keys">${KEYS.map((row, ri) => `<div>${ri === 2 ? `<button class="wide" data-k="ENTER" ${done ? "disabled" : ""}>Invio</button>` : ""}${row.split("").map(ch => `<button class="${keyState[ch] || ""}" data-k="${ch}" ${done ? "disabled" : ""}>${ch}</button>`).join("")}${ri === 2 ? `<button class="wide" data-k="DEL" ${done ? "disabled" : ""} aria-label="Cancella">Canc</button>` : ""}</div>`).join("")}</div></div>`;
      }
      function press(k) {
        if (done) return;
        if (k === "DEL") { cur = cur.slice(0, -1); draw(); return; }
        if (k === "ENTER") {
          if (cur.length < n) return;
          const res = score(cur); tries.push({ w: cur, res });
          cur.split("").forEach((ch, i) => { const v = res[i], old = keyState[ch]; if (v === "ok" || (v === "near" && old !== "ok") || (v === "no" && !old)) keyState[ch] = v; });
          const hit = res.every(x => x === "ok"); cur = "";
          if (hit) { done = true; tap(); draw(); onDone(true, r.shown, "", tries.length <= 2 ? 0 : tries.length <= 4 ? 1 : 2); return; }
          boom();
          if (tries.length >= 5) { done = true; draw(); onDone(false, r.shown, "", 3); return; }
          draw(); return;
        }
        if (cur.length < n) { cur += k; tap(); draw(); }
      }
      el.onclick = e => { const b = e.target.closest("[data-k]"); if (b) press(b.dataset.k); };
      draw();
    }
  });

  // ================================================================ 4. PRIMA O DOPO
  // Due elementi della stessa sequenza: quale viene prima? Cinque colpi di fila.
  Games.register("primadopo", {
    subjects: ALL,
    make: (c, s) => {
      const list = sequences(s, c).filter(q => q && q.items && q.items.length >= 3); if (!list.length) return null;
      const duels = [], seen = new Set();
      for (let g = 0; duels.length < 5 && g < 80; g++) {
        const q = pick(list), i = rnd(0, q.items.length - 2), j = rnd(i + 1, q.items.length - 1), key = q.items[i] + "|" + q.items[j];
        if (seen.has(key)) continue; seen.add(key);
        duels.push({ p: q.p, first: q.items[i], second: q.items[j], flip: Math.random() < 0.5 });
      }
      if (duels.length < 5) return null;
      return { kind: "primadopo", title: "Prima o dopo", prompt: "Quale dei due viene prima?", hint: "Cinque confronti di fila. Sopra c'è l'ordine da seguire. Un errore si perdona.",
        speechIntro: "Prima o dopo. Tocca quello che viene prima.", duels, en: s === "inglese" };
    },
    mount: (el, r, onDone) => {
      let k = 0, m = 0, done = false, lock = false, mark = null;
      function draw() {
        const d = r.duels[k], pair = d.flip ? [d.second, d.first] : [d.first, d.second];
        el.innerHTML = `<div class="g2 sx sx-duo">${pips(m, 2)}
          <div class="sg-step">${r.duels.map((_, i) => `<i class="${i < k ? "on" : i === k ? "cur" : ""}"></i>`).join("")}</div>
          <p class="sx-rule">${esc(d.p)}</p>
          <div class="sx-pair">${pair.map((t, i) => `<button class="sx-card ${mark ? (t === d.first ? "ok" : mark === t ? "ko" : "") : ""}" data-t="${i}" ${lock || done ? "disabled" : ""}${lang(r.en)}>${esc(t)}</button>`).join('<span class="sx-vs">o</span>')}</div></div>`;
      }
      el.onclick = e => {
        const b = e.target.closest(".sx-card"); if (!b || lock || done) return;
        const d = r.duels[k], pair = d.flip ? [d.second, d.first] : [d.first, d.second], t = pair[+b.dataset.t], ok = t === d.first;
        mark = t; lock = true;
        if (ok) tap(); else { m++; boom(); }
        draw();
        if (!ok && m >= 2) { done = true; onDone(false, `${d.first} → ${d.second}`, d.p, 3); return; }
        later(el, ok ? 550 : 1300, () => {
          lock = false; mark = null;
          if (k === r.duels.length - 1) { done = true; draw(); onDone(true, "", "", m); return; }
          k++; draw();
        });
      };
      draw();
    }
  });

  // ================================================================ 5. SCOMMESSA
  // Tre domande: scegli la risposta e punta 1, 2 o 3 punti. Giusta li vinci, sbagliata li perdi. Servono almeno 3 punti.
  Games.register("scommessa", {
    subjects: ALL,
    make: (c, s) => {
      const qs = questions(s, c, 3, 70); if (!qs) return null;
      return { kind: "scommessa", title: "Scommessa", prompt: "Quanto sei sicuro della risposta?", hint: "Tre domande. Scegli la risposta, poi punta 1, 2 o 3 punti: se è giusta li vinci, se è sbagliata li perdi. Per vincere servono almeno 3 punti.",
        speechIntro: "Scommessa. Scegli la risposta e poi quanti punti puntare.", qs, q0: qs[0] };
    },
    mount: (el, r, onDone) => {
      let k = 0, pts = 0, sel = -1, st = [], lock = false, done = false, lastBad = null;
      function draw() {
        const q = r.qs[k], s2 = st.slice(); if (sel >= 0 && !lock) s2[sel] = "sel";
        el.innerHTML = `<div class="g2 sx sx-bet">
          <div class="sx-score"><span>Punti</span><b class="${pts < 0 ? "neg" : ""}">${String(pts).replace("-", "−")}</b><span>obiettivo 3</span></div>
          <div class="sg-step">${r.qs.map((_, i) => `<i class="${i < k ? "on" : i === k ? "cur" : ""}"></i>`).join("")}</div>
          ${qtext(q)}${answers(q, s2, lock || done)}
          <div class="sx-stake" aria-label="Quanto punti">${[["1", "Poco sicuro"], ["2", "Abbastanza"], ["3", "Sicurissimo"]].map(([v, t]) => `<button data-s="${v}" ${sel < 0 || lock || done ? "disabled" : ""}><b>${v}</b><small>${t}</small></button>`).join("")}</div></div>`;
      }
      el.onclick = e => {
        if (lock || done) return;
        const a = e.target.closest(".sx-opt"), s = e.target.closest("[data-s]"), q = r.qs[k];
        if (a) { sel = +a.dataset.a; tap(); draw(); return; }
        if (!s || sel < 0) return;
        const stake = +s.dataset.s, ok = sel === q.c;
        lock = true; st = [];
        if (ok) { st[sel] = "ok"; pts += stake; tap(); } else { st[sel] = "ko"; st[q.c] = "ok"; pts -= stake; lastBad = q; boom(); }
        draw();
        later(el, ok ? 700 : 1500, () => {
          lock = false; sel = -1; st = [];
          if (k === r.qs.length - 1) {
            done = true; draw();
            const win = pts >= 3;
            onDone(win, lastBad ? lastBad.a[lastBad.c] : "", `Hai chiuso con ${String(pts).replace("-", "−")} punti su un obiettivo di 3.${lastBad ? " Sbagliata: " + lastBad.q : ""}`, win ? (lastBad ? 1 : 0) : 3);
            return;
          }
          k++; draw();
        });
      };
      draw();
    }
  });

  // ================================================================ 6. ELIMINA
  // Al contrario del solito: tocca le tre risposte SBAGLIATE e lascia in piedi quella giusta. Tre domande.
  Games.register("elimina", {
    subjects: ALL,
    make: (c, s) => {
      const qs = questions(s, c, 3, 70); if (!qs) return null;
      return { kind: "elimina", title: "Elimina", prompt: "Elimina le risposte sbagliate.", hint: "Tocca le tre risposte sbagliate e lascia in piedi quella giusta. Tre domande. Un errore si perdona.",
        speechIntro: "Elimina. Tocca le risposte sbagliate e lascia quella giusta.", qs, q0: qs[0] };
    },
    mount: (el, r, onDone) => {
      let k = 0, m = 0, st = [], lock = false, done = false;
      function draw() {
        const q = r.qs[k];
        el.innerHTML = `<div class="g2 sx sx-elim">${pips(m, 2)}
          <div class="sg-step">${r.qs.map((_, i) => `<i class="${i < k ? "on" : i === k ? "cur" : ""}"></i>`).join("")}</div>
          ${qtext(q)}${answers(q, st, lock || done)}</div>`;
      }
      const next = q => later(el, 900, () => {
        lock = false; st = [];
        if (k === r.qs.length - 1) { done = true; onDone(true, "", q.e, m); return; }
        k++; draw();
      });
      el.onclick = e => {
        const a = e.target.closest(".sx-opt"); if (!a || lock || done) return;
        const q = r.qs[k], i = +a.dataset.a;
        if (i === q.c) {
          m++; boom(); st = q.a.map((_, j) => (j === q.c ? "ok" : "off")); lock = true; draw();
          if (m >= 2) { done = true; onDone(false, q.a[q.c], q.e, 3); return; }
          next(q); return;
        }
        st[i] = "off"; tap();
        if (st.filter(x => x === "off").length === 3) { st[q.c] = "ok"; lock = true; draw(); next(q); return; }
        draw();
      };
      draw();
    }
  });

  // ================================================================ 7. SPRINT
  // Cinque risposte giuste prima che scada il tempo. Ogni errore costa 5 secondi.
  Games.register("sprint", {
    subjects: ALL,
    make: (c, s) => {
      const qs = questions(s, c, 8, 50); if (!qs) return null;
      return { kind: "sprint", title: "Sprint", prompt: "Cinque risposte giuste prima che scada il tempo.", hint: "Hai 60 secondi. Ogni errore costa 5 secondi.",
        speechIntro: "Sprint. Cinque risposte giuste prima che scada il tempo.", qs, s, c, q0: qs[0], T: 60 };
    },
    mount: (el, r, onDone) => {
      let k = 0, good = 0, bad = 0, left = r.T, st = [], lock = false, done = false, lastBad = null, timer = null;
      const q = () => { if (k >= r.qs.length) { const more = questions(r.s, r.c, 5, 50); if (more) r.qs.push(...more); else k = 0; } return r.qs[k]; };
      const bar = () => { const b = el.querySelector(".sx-time em"), t = el.querySelector(".sx-time b"); if (b) b.style.width = Math.max(0, (left / r.T) * 100) + "%"; if (t) t.textContent = Math.max(0, Math.ceil(left)); };
      function draw() {
        const cur = q();
        el.innerHTML = `<div class="g2 sx sx-sprint">
          <div class="sx-time"><b>${Math.ceil(left)}</b><i><em style="width:${(left / r.T) * 100}%"></em></i></div>
          <div class="sg-step five">${[0, 1, 2, 3, 4].map(i => `<i class="${i < good ? "on" : i === good ? "cur" : ""}"></i>`).join("")}</div>
          ${qtext(cur)}${answers(cur, st, lock || done)}</div>`;
      }
      function finish(ok) {
        done = true; clearInterval(timer); draw();
        onDone(ok, !ok && lastBad ? lastBad.a[lastBad.c] : "", ok ? `Cinque giuste con ${Math.ceil(left)} secondi di margine.` : `Tempo scaduto: ${good} giuste su 5.${lastBad ? " Sbagliata: " + lastBad.q : ""}`, ok ? Math.min(2, bad) : 3);
      }
      timer = setInterval(() => {
        if (!alive(el)) { clearInterval(timer); return; }
        if (done) return;
        left -= 0.25; bar();
        if (left <= 0) finish(false);
      }, 250);
      el.onclick = e => {
        const a = e.target.closest(".sx-opt"); if (!a || lock || done) return;
        const cur = q(), i = +a.dataset.a, ok = i === cur.c;
        lock = true;
        if (ok) { st[i] = "ok"; good++; tap(); } else { st[i] = "ko"; st[cur.c] = "ok"; bad++; left -= 5; lastBad = cur; boom(); }
        draw();
        if (good >= 5) { finish(true); return; }
        if (left <= 0) { finish(false); return; }
        later(el, ok ? 350 : 1100, () => { if (done) return; lock = false; st = []; k++; draw(); });
      };
      draw();
    }
  });

  // ================================================================ 8. LINEA DEL TEMPO
  // Un elemento alla volta: tocca il punto della linea in cui va inserito.
  Games.register("linea", {
    subjects: ALL,
    make: (c, s) => {
      const list = sequences(s, c).filter(q => q && q.items && q.items.length >= 4); if (!list.length) return null;
      const q = pick(list);
      let items = q.items.slice();
      if (items.length > 5) { const idx = shuffle(items.map((_, i) => i)).slice(0, 5).sort((a, b) => a - b); items = idx.map(i => items[i]); }
      const order = shuffle(items.map((_, i) => i));
      return { kind: "linea", title: "Linea del tempo", prompt: q.p, hint: "Un elemento alla volta: tocca il punto della linea in cui va messo. Un errore si perdona.",
        speechIntro: "Linea del tempo. Tocca il punto in cui va messo ogni elemento.", items, order, en: s === "inglese", solution: items.join(" → ") };
    },
    mount: (el, r, onDone) => {
      const placed = [r.order[0]]; let n = 1, m = 0, done = false, lock = false, badGap = -1;
      function draw() {
        const cur = n < r.order.length ? r.order[n] : -1, line = placed.slice().sort((a, b) => a - b);
        const gap = g => (cur >= 0 && !done ? `<button class="sx-gap ${badGap === g ? "ko" : ""}" data-g="${g}" ${lock ? "disabled" : ""} aria-label="Metti qui">qui</button>` : "");
        el.innerHTML = `<div class="g2 sx sx-line">${pips(m, 2)}
          ${cur >= 0 && !done ? `<div class="sx-put"><small>Dove va?</small><b${lang(r.en)}>${esc(r.items[cur])}</b></div>` : ""}
          <div class="sx-track">${gap(0)}${line.map((i, p) => `<div class="sx-node"${lang(r.en)}>${esc(r.items[i])}</div>${gap(p + 1)}`).join("")}</div></div>`;
      }
      el.onclick = e => {
        const b = e.target.closest(".sx-gap"); if (!b || done || lock) return;
        const cur = r.order[n], line = placed.slice().sort((a, b2) => a - b2), g = +b.dataset.g;
        const right = line.filter(i => i < cur).length;
        if (g === right) {
          placed.push(cur); n++; badGap = -1; tap();
          if (n >= r.order.length) { done = true; draw(); onDone(true, r.solution, "", m); return; }
          draw(); return;
        }
        m++; badGap = g; boom();
        if (m >= 2) { done = true; r.order.slice(n).forEach(i => placed.push(i)); draw(); onDone(false, r.solution, "", 3); return; }
        draw();
      };
      draw();
    }
  });

  // ================================================================ 9. TROVA LE PAROLE
  // Le risposte sono nascoste nella griglia: tocca la prima e l'ultima lettera. Due minuti di tempo.
  Games.register("trovaparole", {
    subjects: NOMATH,
    make: (c, s) => {
      const N = 9, pool = shuffle(wordPairs(s, c, 3, N)), words = [], seen = new Set();
      for (const w of pool) { if (!seen.has(w.word) && words.length < 4) { seen.add(w.word); words.push(w); } }
      if (words.length < 3) return null;
      const grid = Array(N * N).fill("");
      for (const w of words.slice().sort((a, b) => b.word.length - a.word.length)) {
        let ok = false;
        for (let g = 0; g < 300 && !ok; g++) {
          const dir = pick([[0, 1], [1, 0], [1, 1]]), L = w.word.length;
          const r0 = rnd(0, N - 1 - dir[0] * (L - 1)), c0 = rnd(0, N - 1 - dir[1] * (L - 1));
          const cells = Array.from({ length: L }, (_, i) => (r0 + dir[0] * i) * N + c0 + dir[1] * i);
          if (cells.every((p, i) => !grid[p] || grid[p] === w.word[i])) { cells.forEach((p, i) => { grid[p] = w.word[i]; }); w.cells = cells; ok = true; }
        }
        if (!ok) return null;
      }
      const ABC = "AEIOAEIOBCDFGLMNPRSTUV";
      for (let i = 0; i < grid.length; i++) if (!grid[i]) grid[i] = ABC[rnd(0, ABC.length - 1)];
      return { kind: "trovaparole", title: "Trova le parole", prompt: "Le risposte sono nascoste nella griglia.", hint: "Tocca la prima e poi l'ultima lettera di ogni risposta. Le parole vanno da sinistra a destra, dall'alto in basso o in diagonale. Hai due minuti.",
        speechIntro: "Trova le parole. Le risposte sono nascoste nella griglia.", N, grid, words, T: 120, solution: words.map(w => `${w.left} → ${w.shown}`).join(" · ") };
    },
    mount: (el, r, onDone) => {
      const N = r.N, found = new Set(), lit = new Set(); let first = -1, left = r.T, done = false, timer = null, flash = -1;
      function draw() {
        el.innerHTML = `<div class="g2 sx sx-find">
          <div class="sx-time"><b>${Math.ceil(left)}</b><i><em style="width:${(left / r.T) * 100}%"></em></i></div>
          <div class="sx-grid" style="--n:${N}">${r.grid.map((ch, i) => `<button class="${lit.has(i) ? "hit" : ""} ${i === first ? "sel" : ""} ${i === flash ? "ko" : ""}" data-p="${i}" ${done ? "disabled" : ""}>${ch}</button>`).join("")}</div>
          <ul class="sx-clues">${r.words.map((w, i) => `<li class="${found.has(i) ? "on" : ""}">${esc(w.clue)}${found.has(i) || done ? ` <b>${esc(w.shown)}</b>` : ""}</li>`).join("")}</ul></div>`;
      }
      const stopAll = ok => { done = true; clearInterval(timer); if (!ok) r.words.forEach(w => w.cells.forEach(p => lit.add(p))); draw(); onDone(ok, r.solution, ok ? "" : `Tempo scaduto: trovate ${found.size} su ${r.words.length}.`, ok ? 0 : 3); };
      timer = setInterval(() => {
        if (!alive(el)) { clearInterval(timer); return; }
        if (done) return;
        left -= 1; const b = el.querySelector(".sx-time em"), t = el.querySelector(".sx-time b");
        if (b) b.style.width = Math.max(0, (left / r.T) * 100) + "%"; if (t) t.textContent = Math.max(0, left);
        if (left <= 0) stopAll(false);
      }, 1000);
      el.onclick = e => {
        const b = e.target.closest("[data-p]"); if (!b || done) return;
        const p = +b.dataset.p; flash = -1;
        if (first < 0) { first = p; tap(); draw(); return; }
        if (p === first) { first = -1; draw(); return; }
        const hit = r.words.findIndex((w, i) => !found.has(i) && ((w.cells[0] === first && w.cells[w.cells.length - 1] === p) || (w.cells[0] === p && w.cells[w.cells.length - 1] === first)));
        if (hit >= 0) { found.add(hit); r.words[hit].cells.forEach(c => lit.add(c)); first = -1; tap(); if (found.size === r.words.length) { stopAll(true); return; } draw(); return; }
        flash = p; first = -1; boom(); draw();
      };
      draw();
    }
  });

  // ================================================================ 10. SERIE (solo matematica)
  // Tre successioni: trova il numero che continua la serie.
  function serie() {
    const t = rnd(0, 5), mk = (seq, next, rule, off) => {
      const opts = new Set([next]); let g = 0;
      const cand = [next + off, next - off, next + 2 * off, next + 1, next - 1, next + 3, next * 2, next - 2 * off];
      for (const v of shuffle(cand)) { if (opts.size < 4 && v !== next && v > -1000) opts.add(v); if (g++ > 20) break; }
      if (opts.size < 4) return null;
      const a = shuffle([...opts]).map(v => String(v).replace("-", "−"));
      return { seq: seq.map(v => String(v).replace("-", "−")), a, c: a.indexOf(String(next).replace("-", "−")), rule };
    };
    if (t === 0) { const a = rnd(-9, 20), d = pick([3, 4, 6, 7, 9, -3, -4]), s = [0, 1, 2, 3].map(i => a + d * i); return mk(s, a + 4 * d, `Si aggiunge sempre ${String(d).replace("-", "−")}.`, Math.abs(d) + 1); }
    if (t === 1) { const a = pick([1, 2, 3, 5]), q = pick([2, 3]), s = [0, 1, 2, 3].map(i => a * Math.pow(q, i)); return mk(s, a * Math.pow(q, 4), `Si moltiplica sempre per ${q}.`, a * q); }
    if (t === 2) { const k = rnd(1, 6), s = [0, 1, 2, 3].map(i => (k + i) * (k + i)); return mk(s, (k + 4) * (k + 4), "Sono i quadrati di numeri consecutivi.", 2 * k + 3); }
    if (t === 3) { const a = rnd(1, 4), b = rnd(2, 6), s = [a, b, a + b, a + 2 * b, 2 * a + 3 * b]; return mk(s, 3 * a + 5 * b, "Ogni numero è la somma dei due precedenti.", a + 1); }
    if (t === 4) { const a = rnd(1, 9), s = [a]; [1, 2, 3, 4].forEach(i => s.push(s[i - 1] + i + 1)); return mk(s.slice(0, 5), s[4] + 6, "La differenza cresce di 1 ogni volta: +2, +3, +4, +5, +6.", 2); }
    const k = rnd(1, 3), s = [0, 1, 2, 3].map(i => Math.pow(k + i, 3)); return mk(s, Math.pow(k + 4, 3), "Sono i cubi di numeri consecutivi.", 2 * (k + 4));
  }
  Games.register("serie", {
    subjects: ["matematica"],
    make: () => {
      const items = []; for (let g = 0; items.length < 3 && g < 40; g++) { const x = serie(); if (x && !items.some(y => y.seq.join() === x.seq.join())) items.push(x); }
      if (items.length < 3) return null;
      return { kind: "serie", title: "Serie", prompt: "Quale numero continua la serie?", hint: "Tre serie di fila: trova la regola e scegli il numero che viene dopo. Un errore si perdona.",
        speechIntro: "Serie. Trova il numero che continua la serie.", items };
    },
    mount: (el, r, onDone) => {
      let k = 0, m = 0, st = [], lock = false, done = false;
      function draw() {
        const it = r.items[k];
        el.innerHTML = `<div class="g2 sx sx-serie">${pips(m, 2)}
          <div class="sg-step">${r.items.map((_, i) => `<i class="${i < k ? "on" : i === k ? "cur" : ""}"></i>`).join("")}</div>
          <div class="sx-seq">${it.seq.map(v => `<i>${v}</i>`).join("")}<i class="q ${lock || done ? "ok" : ""}">${lock || done ? it.a[it.c] : "?"}</i></div>
          <div class="sx-nums">${it.a.map((a, i) => `<button class="sx-opt ${st[i] || ""}" data-a="${i}" ${lock || done || st[i] === "ko" ? "disabled" : ""}>${a}</button>`).join("")}</div>
          ${lock || done ? `<p class="sx-note">${esc(it.rule)}</p>` : ""}</div>`;
      }
      el.onclick = e => {
        const a = e.target.closest(".sx-opt"); if (!a || lock || done) return;
        const it = r.items[k], i = +a.dataset.a;
        if (i === it.c) {
          st[i] = "ok"; lock = true; tap(); draw();
          later(el, 1100, () => { lock = false; st = []; if (k === r.items.length - 1) { done = true; draw(); onDone(true, "", it.rule, m); return; } k++; draw(); });
          return;
        }
        m++; st[i] = "ko"; boom();
        if (m >= 2) { done = true; draw(); onDone(false, `${it.seq.join(", ")}, ${it.a[it.c]}`, it.rule, 3); return; }
        draw();
      };
      draw();
    }
  });

  // ================================================================ 11. COLPO D'OCCHIO
  // Guarda le coppie per qualche secondo, poi spariscono: tre domande a memoria.
  Games.register("colpo", {
    subjects: NOMATH,
    make: (c, s) => {
      const list = SUP.inYear((SUP.pairs[s] || []).slice(), c).filter(T => T.pairs.length >= 4); if (!list.length) return null;
      const T = pick(list), ps = shuffle(T.pairs).slice(0, 4).map(p => ({ l: String(p[0]), r: String(p[1]) }));
      if (new Set(ps.map(p => p.r)).size < 4) return null;
      return { kind: "colpo", title: "Colpo d'occhio", prompt: "Memorizza le coppie: poi spariscono.", hint: "Hai dieci secondi per guardarle (o tocca «Pronto»). Poi tre domande a memoria. Un errore si perdona.",
        speechIntro: "Colpo d'occhio. Memorizza le coppie, poi rispondi a memoria.", ps, ask: shuffle(ps.map((_, i) => i)).slice(0, 3), lEn: s === "inglese", rEn: !!T.rEn,
        solution: ps.map(p => `${p.l} → ${p.r}`).join(" · ") };
    },
    mount: (el, r, onDone) => {
      let phase = 0, left = 10, k = 0, m = 0, st = [], lock = false, done = false, timer = null, opts = [];
      const setOpts = () => { opts = shuffle(r.ps.map(p => p.r)); };
      function draw() {
        if (phase === 0) {
          el.innerHTML = `<div class="g2 sx sx-flash"><div class="sx-time"><b>${left}</b><i><em style="width:${left * 10}%"></em></i></div>
            <div class="sx-mem">${r.ps.map(p => `<div><span${lang(r.lEn)}>${esc(p.l)}</span><b${lang(r.rEn)}>${esc(p.r)}</b></div>`).join("")}</div>
            <button class="g2-go" data-go="1">Pronto</button></div>`;
          return;
        }
        const p = r.ps[r.ask[k]];
        el.innerHTML = `<div class="g2 sx sx-flash">${pips(m, 2)}
          <div class="sg-step">${r.ask.map((_, i) => `<i class="${i < k ? "on" : i === k ? "cur" : ""}"></i>`).join("")}</div>
          <p class="sx-q"${lang(r.lEn)}>${esc(p.l)}</p>
          <div class="sx-ans">${opts.map((o, i) => `<button class="sx-opt ${st[i] || ""}" data-a="${i}" ${lock || done || st[i] === "ko" ? "disabled" : ""}${lang(r.rEn)}><b>${"ABCD"[i]}</b><span>${esc(o)}</span></button>`).join("")}</div></div>`;
      }
      const go = () => { if (phase) return; clearInterval(timer); phase = 1; setOpts(); draw(); };
      timer = setInterval(() => { if (!alive(el)) { clearInterval(timer); return; } left--; if (left <= 0) go(); else draw(); }, 1000);
      el.onclick = e => {
        if (e.target.closest("[data-go]")) { tap(); go(); return; }
        const a = e.target.closest(".sx-opt"); if (!a || lock || done || !phase) return;
        const p = r.ps[r.ask[k]], i = +a.dataset.a;
        if (opts[i] === p.r) {
          st[i] = "ok"; lock = true; tap(); draw();
          later(el, 600, () => { lock = false; st = []; if (k === r.ask.length - 1) { done = true; onDone(true, r.solution, "", m); return; } k++; setOpts(); draw(); });
          return;
        }
        m++; st[i] = "ko"; boom();
        if (m >= 2) { done = true; st[opts.indexOf(p.r)] = "ok"; draw(); onDone(false, r.solution, "", 3); return; }
        draw();
      };
      draw();
    }
  });

  // ================================================================ 12. CHI SONO?
  // Indizi uno alla volta: prima indovini, più vale. Una risposta sbagliata si perdona e fa uscire un altro indizio.
  const WHO = {
    storia: [
      ["Pericle", ["Alessandro Magno", "Clistene", "Leonida"], ["Vivo ad Atene nel V secolo a.C.", "Sotto di me si costruisce il Partenone.", "Guido la città nella sua età d'oro.", "Muoio di peste all'inizio della guerra del Peloponneso."]],
      ["Annibale", ["Scipione", "Pirro", "Giulio Cesare"], ["Sono un generale cartaginese.", "Da ragazzo giuro odio eterno a Roma.", "Attraverso le Alpi con gli elefanti.", "Vengo sconfitto a Zama da Scipione."]],
      ["Alessandro Magno", ["Filippo II", "Pericle", "Dario"], ["Sono re di Macedonia.", "Il mio maestro è Aristotele.", "Sconfiggo l'Impero persiano.", "Muoio a Babilonia nel 323 a.C."]],
      ["Giulio Cesare", ["Pompeo", "Augusto", "Silla"], ["Conquisto la Gallia.", "Attraverso il Rubicone con l'esercito.", "Divento dittatore a vita.", "Vengo ucciso alle Idi di marzo."]],
      ["I Fenici", ["I Sumeri", "Gli Egizi", "Gli Ittiti"], ["Siamo un popolo di mercanti e navigatori.", "Le nostre città sono Tiro, Sidone e Biblo.", "Fondiamo Cartagine.", "Diffondiamo l'alfabeto nel Mediterraneo."]],
      ["Hammurabi", ["Sargon", "Nabucodonosor", "Ramses II"], ["Sono un re di Babilonia.", "Regno nel XVIII secolo a.C.", "Unifico gran parte della Mesopotamia.", "Faccio incidere un codice di leggi su una stele."]]
    ],
    scienze: [
      ["Marte", ["Venere", "Mercurio", "Giove"], ["Sono un pianeta roccioso.", "Ho due piccole lune.", "Sono il quarto pianeta dal Sole.", "Mi chiamano il pianeta rosso."]],
      ["Ossigeno", ["Azoto", "Idrogeno", "Carbonio"], ["A temperatura ambiente sono un gas.", "Ho numero atomico 8.", "Formo circa il 21% dell'aria.", "Servo alla respirazione."]],
      ["La Luna", ["Il Sole", "Venere", "Marte"], ["Non brillo di luce propria.", "Giro attorno alla Terra in circa 27 giorni.", "Sono la causa principale delle maree.", "Sono l'unico satellite naturale della Terra."]],
      ["Troposfera", ["Stratosfera", "Mesosfera", "Termosfera"], ["Sono uno strato dell'atmosfera.", "Sono lo strato più vicino al suolo.", "Contengo quasi tutto il vapore acqueo.", "In me avvengono i fenomeni meteorologici."]],
      ["Granito", ["Basalto", "Marmo", "Calcare"], ["Sono una roccia.", "Nasco dal magma.", "Mi raffreddo lentamente in profondità.", "Sono fatto di quarzo, feldspati e miche."]],
      ["Giove", ["Saturno", "Urano", "Nettuno"], ["Sono un pianeta gassoso.", "Ho una Grande Macchia Rossa.", "Tra le mie lune c'è Ganimede.", "Sono il pianeta più grande del sistema solare."]]
    ],
    italiano: [
      ["Ulisse", ["Achille", "Enea", "Ettore"], ["Sono re di Itaca.", "Mia moglie è Penelope.", "Ho l'idea del cavallo di legno.", "Il mio viaggio di ritorno dura dieci anni."]],
      ["Achille", ["Agamennone", "Ulisse", "Patroclo"], ["Sono il più forte degli eroi greci.", "Mia madre è la dea Teti.", "La mia ira apre l'Iliade.", "Uccido Ettore in duello."]],
      ["Enea", ["Ettore", "Paride", "Turno"], ["Sono un eroe troiano.", "Fuggo da Troia in fiamme con mio padre Anchise.", "Amo la regina Didone.", "Dai miei discendenti nascerà Roma."]],
      ["Metafora", ["Similitudine", "Iperbole", "Anafora"], ["Sono una figura retorica.", "Accosto due cose diverse.", "Non uso mai «come».", "«Sei un leone» è un mio esempio."]],
      ["Narratore onnisciente", ["Narratore interno", "Protagonista", "Antagonista"], ["Racconto una storia.", "Non sono un personaggio.", "Conosco il passato e il futuro.", "So anche che cosa pensano i personaggi."]],
      ["Virgilio", ["Omero", "Orazio", "Ovidio"], ["Sono un poeta latino.", "Vivo al tempo di Augusto.", "Scrivo le Bucoliche e le Georgiche.", "Il mio poema più famoso è l'Eneide."]]
    ],
    civica: [
      ["Presidente della Repubblica", ["Presidente del Consiglio", "Presidente del Senato", "Presidente della Camera"], ["Sono eletto dal Parlamento in seduta comune.", "Resto in carica sette anni.", "Promulgo le leggi.", "Rappresento l'unità nazionale."]],
      ["Parlamento", ["Governo", "Magistratura", "Corte costituzionale"], ["Sono formato da due Camere.", "Sono eletto dai cittadini.", "Do la fiducia al Governo.", "Approvo le leggi."]],
      ["Corte costituzionale", ["Corte di cassazione", "Consiglio di Stato", "Consiglio superiore della magistratura"], ["Sono formata da quindici giudici.", "Ho sede a Roma, nel Palazzo della Consulta.", "Giudico i conflitti tra i poteri dello Stato.", "Controllo che le leggi rispettino la Costituzione."]],
      ["Articolo 3", ["Articolo 1", "Articolo 11", "Articolo 21"], ["Sono un articolo della Costituzione.", "Sono tra i principi fondamentali.", "Chiedo alla Repubblica di rimuovere gli ostacoli.", "Dico che tutti i cittadini sono uguali davanti alla legge."]],
      ["Unione europea", ["ONU", "NATO", "Consiglio d'Europa"], ["Nasco per tappe dopo la Seconda guerra mondiale.", "Ho un Parlamento eletto ogni cinque anni.", "Molti dei miei Stati usano la stessa moneta.", "Conto 27 Stati membri."]],
      ["Agenda 2030", ["Protocollo di Kyoto", "Costituzione italiana", "Dichiarazione universale dei diritti umani"], ["Sono stata approvata nel 2015.", "Mi ha voluta l'ONU.", "Riguardo tutti i Paesi del mondo.", "Ho 17 obiettivi di sviluppo sostenibile."]]
    ],
    inglese: [
      ["library", ["bookshop", "museum", "school"], ["It is a place.", "It is very quiet.", "You can borrow things there.", "It is full of books."]],
      ["umbrella", ["raincoat", "hat", "suitcase"], ["It is an object.", "You carry it in your hand.", "You open it outside.", "You use it when it rains."]],
      ["breakfast", ["lunch", "dinner", "snack"], ["It is a meal.", "Many people have coffee or tea with it.", "You have it after you wake up.", "It is the first meal of the day."]],
      ["nurse", ["teacher", "doctor", "chef"], ["It is a job.", "This person wears a uniform.", "This person works in a hospital.", "This person looks after patients, but is not a doctor."]],
      ["Monday", ["Friday", "Saturday", "Tuesday"], ["It is a day of the week.", "It is not at the weekend.", "School starts again on this day.", "It comes after Sunday."]],
      ["winter", ["spring", "summer", "autumn"], ["It is a season.", "Days are short.", "It can snow.", "It comes after autumn."]]
    ]
  };
  // Indizi di «Chi sono?» per la 2ª–5ª superiore: WHOY[classe][materia] = [risposta, [tre sbagliate], [quattro indizi dal più vago al più chiaro]]
  const WHOY = {
    9: {
      matematica: [
        ["Ipotenusa", ["Cateto", "Altezza", "Diagonale"], ["Sono un lato.", "Esisto solo in un triangolo rettangolo.", "Sono il lato più lungo.", "Sto di fronte all'angolo retto."]],
        ["√2", ["1,5", "π", "√4"], ["Sono un numero.", "Non posso scrivermi come frazione.", "Il mio quadrato è 2.", "Valgo circa 1,41."]],
        ["(a + b)²", ["a² + b²", "a² − b²", "(a − b)²"], ["Sono un prodotto notevole.", "Mi sviluppo in tre termini.", "Contengo il doppio prodotto.", "Valgo a² + 2ab + b²."]],
        ["a² − b²", ["(a − b)²", "a² + b²", "(a + b)²"], ["Sono un'espressione con due termini.", "Tra i due termini c'è un meno.", "Entrambi i termini sono quadrati.", "Mi scompongo in (a + b)(a − b)."]]
      ],
      storia: [
        ["Augusto", ["Giulio Cesare", "Nerone", "Traiano"], ["Sono pronipote e figlio adottivo di Giulio Cesare.", "Vinco Antonio e Cleopatra ad Azio.", "Il Senato mi dà un titolo che significa «venerabile».", "Sono il primo imperatore romano."]],
        ["Costantino", ["Diocleziano", "Teodosio", "Giustiniano"], ["Sono un imperatore romano del IV secolo.", "Vinco Massenzio a Ponte Milvio.", "Nel 313 concedo libertà di culto ai cristiani.", "Fondo Costantinopoli."]],
        ["Carlo Magno", ["Clodoveo", "Ottone I", "Pipino il Breve"], ["Sono un re dei Franchi.", "Sono figlio di Pipino il Breve.", "Sconfiggo i Longobardi.", "Sono incoronato imperatore nell'anno 800."]],
        ["Giustiniano", ["Costantino", "Teodorico", "Eraclio"], ["Sono un imperatore bizantino.", "Regno nel VI secolo.", "Faccio raccogliere il diritto romano in un Corpus.", "Mia moglie è Teodora."]],
        ["Maometto", ["Abramo", "Mosè", "Saladino"], ["Sono nato alla Mecca.", "Nel 622 compio l'egira.", "Il mio messaggio è raccolto nel Corano.", "Sono il profeta dell'islam."]]
      ],
      scienze: [
        ["Mitocondrio", ["Cloroplasto", "Ribosoma", "Nucleo"], ["Sono un organello della cellula.", "Mi trovo nelle cellule animali e vegetali.", "Sono la centrale energetica della cellula.", "Produco ATP con la respirazione cellulare."]],
        ["Cloroplasto", ["Mitocondrio", "Vacuolo", "Nucleo"], ["Sono un organello.", "Mi trovo nelle cellule vegetali.", "Contengo la clorofilla.", "Qui avviene la fotosintesi."]],
        ["DNA", ["RNA", "Proteina", "Lipide"], ["Sono una molecola.", "Ho la forma di una doppia elica.", "Sono fatto di quattro basi.", "Contengo l'informazione genetica."]],
        ["Acqua", ["Ammoniaca", "Metano", "Sale"], ["Sono un composto.", "Nella mia molecola ci sono tre atomi.", "La mia formula è H₂O.", "Copro la maggior parte della superficie terrestre."]],
        ["Elettrone", ["Protone", "Neutrone", "Nucleo"], ["Sono una particella.", "Sono molto più leggero del protone.", "Ho carica negativa.", "Giro attorno al nucleo."]]
      ],
      italiano: [
        ["Renzo Tramaglino", ["Don Rodrigo", "Fra Cristoforo", "Don Abbondio"], ["Sono un personaggio di un romanzo storico.", "Faccio il filatore di seta.", "Sono innamorato di Lucia.", "Non riesco a sposarla per colpa di don Rodrigo."]],
        ["Don Abbondio", ["Fra Cristoforo", "Il cardinal Federigo", "L'Innominato"], ["Sono un curato di campagna.", "Ho paura dei bravi.", "Rifiuto di celebrare un matrimonio.", "Sono un personaggio dei Promessi sposi."]],
        ["L'Innominato", ["Don Rodrigo", "Fra Cristoforo", "Il Griso"], ["Sono un potente signore.", "Vivo in un castello.", "Faccio rapire Lucia.", "Mi converto dopo la notte che passo con lei."]],
        ["Fra Cristoforo", ["Don Abbondio", "Il Griso", "Padre Provinciale"], ["Sono un frate cappuccino.", "Da giovane ho ucciso un uomo.", "Aiuto Renzo e Lucia.", "Muoio di peste al lazzaretto."]],
        ["Sonetto", ["Ottava", "Terzina", "Quartina"], ["Sono una forma poetica.", "Ho versi endecasillabi.", "Sono composto da quattordici versi.", "Ho due quartine e due terzine."]]
      ],
      civica: [
        ["ONU", ["NATO", "UE", "OMS"], ["Sono un'organizzazione internazionale.", "Nasco nel 1945.", "Ho sede a New York.", "Ho un Consiglio di sicurezza."]],
        ["NATO", ["ONU", "UE", "OMC"], ["Sono un'alleanza.", "Nasco nel 1949.", "Sono un'alleanza militare difensiva.", "Il mio trattato è firmato a Washington."]],
        ["Schengen", ["Euro", "Maastricht", "Erasmus"], ["Sono uno spazio europeo.", "Prendo il nome da una località del Lussemburgo.", "Elimino i controlli sulle persone ai confini interni.", "Permetto di circolare tra molti Paesi senza passaporto."]],
        ["BCE", ["FMI", "OMC", "BEI"], ["Sono un'istituzione dell'Unione europea.", "Ho sede a Francoforte.", "Governo la politica monetaria dell'area euro.", "Il mio compito principale è mantenere stabili i prezzi."]],
        ["Costituzione", ["Codice civile", "Statuto Albertino", "Dichiarazione universale"], ["Sono un testo.", "Sono la legge fondamentale della Repubblica.", "Ho 139 articoli.", "Sono entrata in vigore nel 1948."]]
      ],
      inglese: [
        ["airport", ["station", "harbour", "hotel"], ["It is a place.", "You go there to travel.", "You check in your luggage there.", "Planes take off and land there."]],
        ["passport", ["ticket", "visa", "licence"], ["It is a document.", "You show it at the border.", "It has your photo.", "You need it to travel to another country."]],
        ["dentist", ["doctor", "nurse", "pharmacist"], ["It is a job.", "This person works with teeth.", "You go to this person for a check-up.", "This person can fill a cavity."]],
        ["tomorrow", ["yesterday", "today", "tonight"], ["It is a word about time.", "It is not in the past.", "It is not today.", "It is the day after today."]],
        ["elbow", ["knee", "wrist", "shoulder"], ["It is a part of the body.", "It is part of the arm.", "It is a joint.", "It is in the middle of your arm."]]
      ]
    },
    10: {
      matematica: [
        ["Parabola", ["Iperbole", "Circonferenza", "Retta"], ["Sono una curva.", "Sono il grafico di y = ax² + bx + c.", "Ho un vertice e un asse di simmetria.", "Se a > 0 sono rivolta verso l'alto."]],
        ["Discriminante", ["Vertice", "Ascissa", "Coefficiente"], ["Sono una quantità legata a un'equazione di secondo grado.", "Mi indico con la lettera greca delta.", "Se sono negativo non ci sono soluzioni reali.", "Valgo b² − 4ac."]],
        ["Circonferenza", ["Parabola", "Ellisse", "Retta"], ["Sono un luogo di punti.", "Ho un centro e un raggio.", "Tutti i miei punti sono alla stessa distanza dal centro.", "La mia equazione è (x − a)² + (y − b)² = r²."]],
        ["Coefficiente angolare", ["Intercetta", "Ordinata", "Ascissa"], ["Sono un numero legato a una retta.", "Misuro la sua pendenza.", "Nella forma y = mx + q sono la lettera m.", "Due rette parallele hanno lo stesso me."]]
      ],
      storia: [
        ["Federico Barbarossa", ["Federico II", "Enrico IV", "Ottone I"], ["Sono un imperatore del XII secolo.", "Appartengo alla casa di Svevia.", "Scendo più volte in Italia.", "Vengo sconfitto dai comuni a Legnano nel 1176."]],
        ["Giovanna d'Arco", ["Eleonora d'Aquitania", "Caterina de' Medici", "Maria Stuarda"], ["Sono una contadina francese.", "Dico di sentire delle voci.", "Guido l'esercito francese a Orléans.", "Vengo bruciata sul rogo a Rouen nel 1431."]],
        ["Cristoforo Colombo", ["Vasco da Gama", "Amerigo Vespucci", "Magellano"], ["Sono un navigatore genovese.", "Cerco una nuova rotta per le Indie.", "Parto da Palos nel 1492.", "Arrivo in un continente che gli Europei non conoscevano."]],
        ["Martin Lutero", ["Calvino", "Erasmo", "Zwingli"], ["Sono un monaco tedesco.", "Contesto la vendita delle indulgenze.", "Scrivo 95 tesi.", "Do inizio alla Riforma protestante."]],
        ["Lorenzo de' Medici", ["Cosimo il Vecchio", "Ludovico il Moro", "Savonarola"], ["Governo Firenze nel Quattrocento.", "Sono un mecenate di artisti.", "Mi chiamano il Magnifico.", "Sono il nipote di Cosimo il Vecchio."]]
      ],
      scienze: [
        ["Etna", ["Vesuvio", "Stromboli", "Vulcano"], ["Sono un vulcano italiano.", "Sono in Sicilia.", "Sono il più alto vulcano attivo d'Europa.", "Mi trovo vicino a Catania."]],
        ["Placca tettonica", ["Faglia", "Magma", "Dorsale"], ["Sono un frammento della litosfera.", "Mi muovo molto lentamente.", "Ai miei margini avvengono terremoti e vulcani.", "Sulla Terra ce ne sono alcune grandi e molte piccole."]],
        ["Magnitudo", ["Intensità", "Epicentro", "Ipocentro"], ["Sono un numero.", "Misuro un terremoto.", "Misuro l'energia liberata alla sorgente.", "Si usa la scala Richter o la scala del momento."]],
        ["Mole", ["Grammo", "Litro", "Atomo"], ["Sono un'unità di misura del Sistema internazionale.", "Misuro la quantità di sostanza.", "Contengo 6,022·10²³ particelle.", "Il mio numero porta il nome di Avogadro."]],
        ["Acido", ["Base", "Sale", "Ossido"], ["Sono una sostanza chimica.", "Ho un pH minore di 7.", "Cedo ioni H⁺.", "Ne è un esempio il succo di limone."]]
      ],
      italiano: [
        ["Dante", ["Petrarca", "Boccaccio", "Virgilio"], ["Sono nato a Firenze nel 1265.", "Sono stato esiliato dalla mia città.", "Il mio primo amore è Beatrice.", "Scrivo la Divina Commedia."]],
        ["Petrarca", ["Dante", "Boccaccio", "Ariosto"], ["Sono un poeta del Trecento.", "Sono nato ad Arezzo.", "Amo una donna di nome Laura.", "Scrivo il Canzoniere."]],
        ["Boccaccio", ["Petrarca", "Dante", "Machiavelli"], ["Sono un autore del Trecento.", "Vivo a lungo a Napoli e a Firenze.", "Racconto cento novelle.", "Scrivo il Decameron."]],
        ["Machiavelli", ["Guicciardini", "Ariosto", "Castiglione"], ["Sono un fiorentino.", "Lavoro come segretario della Repubblica.", "Dopo l'esilio scrivo un trattato politico.", "Sono l'autore del Principe."]],
        ["Ariosto", ["Tasso", "Boiardo", "Pulci"], ["Sono un poeta del Cinquecento.", "Vivo alla corte degli Este a Ferrara.", "Scrivo un poema in ottave.", "Il mio poema è l'Orlando furioso."]]
      ],
      civica: [
        ["Regione", ["Provincia", "Comune", "Città metropolitana"], ["Sono un ente territoriale.", "In Italia ce ne sono venti.", "Alcune di noi hanno uno statuto speciale.", "Ho un Consiglio e un presidente."]],
        ["Referendum", ["Plebiscito", "Elezione", "Petizione"], ["Sono uno strumento di democrazia diretta.", "I cittadini votano su una questione.", "Posso abrogare una legge.", "Ho bisogno del quorum per essere valido."]],
        ["Decreto-legge", ["Legge delega", "Disegno di legge", "Regolamento"], ["Sono un atto con forza di legge.", "Mi emana il Governo.", "Servo nei casi straordinari di necessità e urgenza.", "Devo essere convertito dal Parlamento entro sessanta giorni."]],
        ["Suffragio universale", ["Voto segreto", "Voto di scambio", "Astensione"], ["Sono un principio elettorale.", "Valgo per tutti i cittadini maggiorenni.", "Non dipendo dal censo o dal sesso.", "Riconosco il diritto di voto a tutti."]],
        ["Sciopero", ["Serrata", "Tirocinio", "Petizione"], ["Sono un diritto.", "Riguardo i lavoratori.", "Sono previsto dall'articolo 40 della Costituzione.", "Consisto nell'astensione collettiva dal lavoro."]]
      ],
      inglese: [
        ["lawyer", ["judge", "police officer", "teacher"], ["It is a job.", "This person works with the law.", "This person gives legal advice.", "This person can defend you in court."]],
        ["scholarship", ["salary", "pension", "loan"], ["It is money.", "You can get it as a student.", "You do not have to pay it back.", "It helps you pay for your studies."]],
        ["deadline", ["holiday", "appointment", "schedule"], ["It is a point in time.", "You have it at work or at school.", "It is the last moment to finish something.", "If you miss it, you are late."]],
        ["fridge", ["oven", "freezer", "cupboard"], ["It is an object.", "You find it in the kitchen.", "It uses electricity.", "It keeps food cold."]],
        ["mayor", ["president", "governor", "minister"], ["It is a job in politics.", "This person is elected.", "This person leads a town or a city.", "This person works in the town hall."]]
      ]
    },
    11: {
      matematica: [
        ["Logaritmo", ["Radice", "Potenza", "Fattoriale"], ["Sono un'operazione.", "Sono l'inverso di un'operazione con le potenze.", "Rispondo alla domanda: a quale esponente elevo la base?", "log₂ 8 = 3 è un mio esempio."]],
        ["Radiante", ["Grado", "Pascal", "Metro"], ["Sono un'unità di misura.", "Misuro gli angoli.", "Un angolo giro vale 2π di me.", "Un angolo piatto vale π di me."]],
        ["Fattoriale", ["Potenza", "Radice", "Progressione"], ["Sono un'operazione tra numeri interi.", "Mi indico con un punto esclamativo.", "Mi usi nel calcolo combinatorio.", "5! vale 120."]],
        ["Progressione geometrica", ["Progressione aritmetica", "Fattoriale", "Disposizione"], ["Sono una successione di numeri.", "Ogni termine si ottiene dal precedente con un'operazione.", "Moltiplico sempre per la stessa ragione.", "2, 6, 18, 54 è un mio esempio."]]
      ],
      storia: [
        ["Luigi XIV", ["Luigi XVI", "Enrico IV", "Napoleone"], ["Sono un re di Francia.", "Regno per oltre settant'anni.", "Mi chiamano il Re Sole.", "Costruisco la reggia di Versailles."]],
        ["Oliver Cromwell", ["Carlo I", "Guglielmo d'Orange", "Carlo II"], ["Sono un uomo politico inglese del Seicento.", "Guido l'esercito del Parlamento.", "Faccio giustiziare il re.", "Governo l'Inghilterra come Lord protettore."]],
        ["Robespierre", ["Danton", "Marat", "Napoleone"], ["Sono un avvocato francese.", "Sono un capo dei giacobini.", "Guido la Francia durante il Terrore.", "Finisco ghigliottinato nel 1794."]],
        ["Napoleone", ["Luigi XVI", "Wellington", "Metternich"], ["Nasco in Corsica.", "Prendo il potere nel 1799.", "Mi incorono imperatore nel 1804.", "Vengo sconfitto a Waterloo ed esiliato a Sant'Elena."]],
        ["Metternich", ["Talleyrand", "Bismarck", "Cavour"], ["Sono un ministro austriaco.", "Guido il Congresso di Vienna.", "Difendo l'ordine conservatore in Europa.", "Il mio nome è legato alla Restaurazione."]]
      ],
      scienze: [
        ["Cuore", ["Polmone", "Fegato", "Rene"], ["Sono un organo.", "Sono un muscolo.", "Ho quattro camere.", "Pompo il sangue in tutto il corpo."]],
        ["Neurone", ["Globulo rosso", "Cellula muscolare", "Linfocita"], ["Sono una cellula.", "Faccio parte del sistema nervoso.", "Trasmetto impulsi elettrici.", "Comunico con altri neuroni attraverso le sinapsi."]],
        ["Insulina", ["Adrenalina", "Tiroxina", "Glucagone"], ["Sono un ormone.", "Sono prodotta dal pancreas.", "Aiuto le cellule a usare il glucosio.", "Abbasso la glicemia."]],
        ["Globuli rossi", ["Piastrine", "Globuli bianchi", "Plasma"], ["Siamo cellule del sangue.", "Non abbiamo il nucleo.", "Abbiamo dentro l'emoglobina.", "Trasportiamo l'ossigeno."]],
        ["Anticorpo", ["Antibiotico", "Vaccino", "Virus"], ["Sono una proteina.", "Faccio parte del sistema immunitario.", "Sono prodotto dai linfociti B.", "Riconosco e neutralizzo gli agenti estranei."]]
      ],
      italiano: [
        ["Foscolo", ["Parini", "Alfieri", "Leopardi"], ["Nasco a Zante, un'isola greca.", "Sono un poeta del primo Ottocento.", "Scrivo un romanzo epistolare, l'Ortis.", "Scrivo Dei sepolcri."]],
        ["Leopardi", ["Foscolo", "Manzoni", "Pascoli"], ["Nasco a Recanati.", "Passo molte ore nella biblioteca di mio padre.", "Scrivo i Canti.", "Sono il poeta del pessimismo cosmico."]],
        ["Goldoni", ["Alfieri", "Parini", "Metastasio"], ["Sono un autore veneziano.", "Scrivo per il teatro.", "Riformo la commedia dell'arte.", "Sono l'autore de La locandiera."]],
        ["Beccaria", ["Verri", "Voltaire", "Montesquieu"], ["Sono un illuminista milanese.", "Sono contro la tortura.", "Sono contro la pena di morte.", "Sono l'autore di Dei delitti e delle pene."]],
        ["Alfieri", ["Goldoni", "Parini", "Foscolo"], ["Sono un autore piemontese.", "Scrivo tragedie.", "Amo la libertà e odio la tirannide.", "Sono l'autore del Saul."]]
      ],
      civica: [
        ["PIL", ["Inflazione", "Debito pubblico", "Deficit"], ["Sono un indicatore economico.", "Misuro la produzione di un Paese.", "Considero beni e servizi finali.", "Sono il prodotto interno lordo."]],
        ["Inflazione", ["PIL", "Deflazione", "Recessione"], ["Sono un fenomeno economico.", "Riguardo i prezzi.", "Sono un aumento generale e continuo.", "Riduco il potere d'acquisto della moneta."]],
        ["IVA", ["IRPEF", "IMU", "Accise"], ["Sono un'imposta.", "Sono un'imposta indiretta.", "Colpisco i consumi.", "La mia aliquota ordinaria in Italia è il 22%."]],
        ["OMS", ["FAO", "UNESCO", "UNICEF"], ["Sono un'agenzia dell'ONU.", "Ho sede a Ginevra.", "Mi occupo di salute.", "Sono l'Organizzazione mondiale della sanità."]],
        ["Sindacato", ["Partito", "Cooperativa", "Camera di commercio"], ["Sono un'associazione.", "Sono riconosciuto dalla Costituzione.", "Tutelo gli interessi dei lavoratori.", "Posso negoziare i contratti collettivi."]]
      ],
      inglese: [
        ["inflation", ["deflation", "recession", "unemployment"], ["It is an economic word.", "It is about prices.", "It means prices go up.", "Your money buys less."]],
        ["unemployment", ["retirement", "inflation", "salary"], ["It is a situation.", "It is about work.", "It is when you want a job but cannot find one.", "A person in this situation is called jobless."]],
        ["tax", ["fine", "salary", "bill"], ["It is money.", "You pay it to the government.", "Companies and workers pay it.", "It pays for public services."]],
        ["election", ["revolution", "debate", "census"], ["It is an event.", "It happens in a democracy.", "People vote.", "A new government can come out of it."]],
        ["breakthrough", ["setback", "routine", "failure"], ["It is a noun.", "It is a positive thing.", "It is an important discovery or achievement.", "Scientists hope to make one."]]
      ]
    },
    12: {
      matematica: [
        ["Derivata", ["Integrale", "Limite", "Funzione"], ["Sono un concetto dell'analisi.", "Misuro come cambia una funzione.", "Geometricamente sono il coefficiente angolare della tangente.", "D(x²) = 2x è un mio esempio."]],
        ["Integrale", ["Derivata", "Limite", "Logaritmo"], ["Sono un'operazione dell'analisi.", "Sono l'operazione inversa della derivazione.", "Posso calcolare un'area sotto una curva.", "Mi scrivo con un segno a forma di S allungata."]],
        ["Limite", ["Derivata", "Integrale", "Asintoto"], ["Sono un concetto dell'analisi.", "Descrivo a che valore si avvicina una funzione.", "Posso valere un numero, +∞ oppure −∞.", "Un mio esempio famoso è sen x / x per x che tende a 0: vale 1."]],
        ["Asintoto", ["Tangente", "Massimo", "Dominio"], ["Sono una retta.", "Sono legato al grafico di una funzione.", "Il grafico mi si avvicina sempre di più.", "Ci sono asintoti verticali, orizzontali e obliqui."]]
      ],
      storia: [
        ["Garibaldi", ["Cavour", "Mazzini", "Vittorio Emanuele II"], ["Sono nato a Nizza.", "Combatto anche in Sud America.", "Guido i volontari in camicia rossa.", "Nel 1860 parto con i Mille."]],
        ["Cavour", ["Garibaldi", "Mazzini", "Crispi"], ["Sono un politico piemontese.", "Sono primo ministro del Regno di Sardegna.", "Stringo un'alleanza con la Francia di Napoleone III.", "Sono l'artefice diplomatico dell'unità d'Italia."]],
        ["Mussolini", ["Hitler", "Giolitti", "Franco"], ["Sono stato un giornalista socialista.", "Fondo i Fasci di combattimento nel 1919.", "Marcio su Roma nel 1922.", "Sono il capo del fascismo."]],
        ["Hitler", ["Mussolini", "Stalin", "Franco"], ["Sono nato in Austria.", "Divento cancelliere nel 1933.", "Guido il Terzo Reich.", "Invado la Polonia nel 1939."]],
        ["Gorbačëv", ["Stalin", "Eltsin", "Breznev"], ["Sono un leader sovietico.", "Lancio le riforme chiamate glasnost e perestrojka.", "Sono l'ultimo segretario del PCUS.", "Con me si dissolve l'URSS nel 1991."]]
      ],
      scienze: [
        ["Mendel", ["Darwin", "Pasteur", "Watson"], ["Sono stato un monaco.", "Coltivo piselli nel giardino del convento.", "Studio come si trasmettono i caratteri.", "Sono considerato il padre della genetica."]],
        ["Darwin", ["Mendel", "Lamarck", "Wegener"], ["Sono un naturalista inglese.", "Viaggio sul Beagle.", "Visito le isole Galápagos.", "Propongo la selezione naturale."]],
        ["Wegener", ["Darwin", "Mendel", "Newton"], ["Sono uno scienziato tedesco.", "Sono un meteorologo.", "Nel 1912 propongo una nuova teoria sulla Terra.", "Parlo di deriva dei continenti."]],
        ["CRISPR", ["PCR", "Vaccino", "Antibiotico"], ["Sono una tecnica di laboratorio.", "Derivo da un sistema di difesa dei batteri.", "Permetto di modificare il DNA con precisione.", "Ho dato un Nobel nel 2020 a Charpentier e Doudna."]],
        ["Effetto serra", ["Buco dell'ozono", "Pioggia acida", "Smog"], ["Sono un fenomeno atmosferico.", "Senza di me la Terra sarebbe troppo fredda.", "Alcuni gas trattengono il calore.", "La CO₂ che emettiamo mi rende più intenso."]]
      ],
      italiano: [
        ["Verga", ["Pirandello", "Svevo", "Pascoli"], ["Sono un siciliano di Catania.", "Sono un esponente del Verismo.", "Scrivo il Ciclo dei vinti.", "Scrivo I Malavoglia."]],
        ["Pirandello", ["Svevo", "Verga", "D'Annunzio"], ["Nasco in Sicilia.", "Scrivo molto per il teatro.", "Vinco il Nobel nel 1934.", "Scrivo Il fu Mattia Pascal."]],
        ["Svevo", ["Pirandello", "Saba", "Montale"], ["Vivo a Trieste.", "Faccio il commerciante e poi l'industriale.", "Il mio vero nome è Ettore Schmitz.", "Scrivo La coscienza di Zeno."]],
        ["Ungaretti", ["Montale", "Quasimodo", "Saba"], ["Sono nato ad Alessandria d'Egitto.", "Faccio il soldato nella Prima guerra mondiale.", "Scrivo versi brevissimi.", "Sono l'autore dell'Allegria."]],
        ["Montale", ["Ungaretti", "Quasimodo", "Saba"], ["Sono un poeta ligure.", "Vinco il Nobel nel 1975.", "Uso il correlativo oggettivo.", "Scrivo Ossi di seppia."]]
      ],
      civica: [
        ["Parlamento europeo", ["Commissione europea", "Consiglio dell'UE", "Corte di giustizia"], ["Sono un'istituzione dell'UE.", "Sono eletto ogni cinque anni.", "Rappresento i cittadini europei.", "Ho sedi a Strasburgo e a Bruxelles."]],
        ["Presidente del Consiglio", ["Presidente della Repubblica", "Presidente della Camera", "Ministro dell'Interno"], ["Sono una carica dello Stato.", "Sono nominato dal Presidente della Repubblica.", "Dirigo la politica generale del Governo.", "Guido il Consiglio dei ministri."]],
        ["GDPR", ["SPID", "NATO", "IVA"], ["Sono un regolamento europeo.", "Sono in vigore dal 2018.", "Riguardo i dati personali.", "Tutelo la privacy dei cittadini."]],
        ["SPID", ["GDPR", "PEC", "IBAN"], ["Sono un sistema italiano.", "Ti identifico online.", "Dai accesso ai servizi della pubblica amministrazione.", "Sono il Sistema pubblico di identità digitale."]],
        ["Giovanni Falcone", ["Paolo Borsellino", "Carlo Alberto dalla Chiesa", "Aldo Moro"], ["Sono stato un magistrato.", "Lavoro a Palermo.", "Sono un protagonista del maxiprocesso alla mafia.", "Muoio nella strage di Capaci nel 1992."]]
      ],
      inglese: [
        ["democracy", ["monarchy", "dictatorship", "oligarchy"], ["It is a system of government.", "It comes from a Greek word.", "The people hold the power.", "Citizens choose their leaders by voting."]],
        ["climate", ["weather", "season", "temperature"], ["It is a noun.", "It is about the atmosphere.", "It describes conditions over many years.", "Global warming is changing it."]],
        ["refugee", ["tourist", "immigrant", "traveller"], ["It is a person.", "This person has left home.", "This person is escaping war or persecution.", "This person asks for protection in another country."]],
        ["privacy", ["security", "freedom", "identity"], ["It is a right.", "It is about information.", "It is the right to keep personal things secret.", "Data laws protect it online."]],
        ["sustainable", ["profitable", "reliable", "portable"], ["It is an adjective.", "It is used when talking about the environment.", "It does not use up natural resources.", "It can continue in the long term."]]
      ]
    }
  };
  function whoMath() {
    for (let g = 0; g < 60; g++) {
      const n = rnd(20, 90), ds = Math.floor(n / 10) + (n % 10), lo = n - rnd(2, 5), hi = lo + 8;
      const far = n + 18 <= 99 ? n + 18 : n - 18, same = n % 2 === 0 ? n + 2 : n - 2, odd = n + 1;
      const opts = [far, same, odd];
      if (new Set([n, ...opts]).size < 4 || opts.some(v => v < 10 || v > 99)) continue;
      return [String(n), opts.map(String), [`Sono un numero ${n % 2 === 0 ? "pari" : "dispari"} di due cifre.`, n % 3 === 0 ? "Sono divisibile per 3." : "Non sono divisibile per 3.", `La somma delle mie cifre è ${ds}.`, `Sono compreso tra ${lo} e ${hi}.`]];
    }
    return null;
  }
  Games.register("chisono", {
    subjects: ALL,
    make: (c, s) => {
      const d = c === 8 ? (s === "matematica" ? whoMath() : pick(WHO[s] || [])) : pick((WHOY[c] || {})[s] || []) || (s === "matematica" ? whoMath() : null);   // 1ª: WHO; 2ª–5ª: WHOY
      if (!d) return null;
      const opts = shuffle([d[0], ...d[1]]);
      return { kind: "chisono", title: "Chi sono?", prompt: s === "matematica" ? "Che numero sono?" : s === "inglese" ? "Che parola è?" : "Chi sono?", hint: "Gli indizi escono uno alla volta. Rispondi appena lo sai: meno indizi usi, più vale. Un errore si perdona.",
        speechIntro: "Chi sono? Ascolta gli indizi e rispondi appena lo sai.", clues: d[2], opts, c: opts.indexOf(d[0]), en: s === "inglese", solution: d[0] };
    },
    mount: (el, r, onDone) => {
      let shown = 1, m = 0, st = [], done = false;
      function draw() {
        el.innerHTML = `<div class="g2 sx sx-who">${pips(m, 2)}
          <ol class="sx-cluel">${r.clues.map((t, i) => `<li class="${i < shown ? "on" : ""}"${lang(r.en)}>${i < shown ? esc(t) : "…"}</li>`).join("")}</ol>
          <div class="sx-ans">${r.opts.map((o, i) => `<button class="sx-opt ${st[i] || ""}" data-a="${i}" ${done || st[i] === "ko" ? "disabled" : ""}${lang(r.en)}><b>${"ABCD"[i]}</b><span>${esc(o)}</span></button>`).join("")}</div>
          <button class="sx-more" data-more="1" ${done || shown >= r.clues.length ? "disabled" : ""}>Un altro indizio</button></div>`;
      }
      el.onclick = e => {
        if (done) return;
        if (e.target.closest("[data-more]")) { if (shown < r.clues.length) { shown++; tap(); draw(); } return; }
        const a = e.target.closest(".sx-opt"); if (!a) return;
        const i = +a.dataset.a;
        if (i === r.c) { done = true; st[i] = "ok"; tap(); const used = shown; shown = r.clues.length; draw(); onDone(true, r.solution, `Indovinato con ${used} ${used === 1 ? "indizio" : "indizi"} su ${r.clues.length}.`, Math.min(2, m + (used > 2 ? 1 : 0))); return; }
        m++; st[i] = "ko"; boom();
        if (m >= 2) { done = true; st[r.c] = "ok"; shown = r.clues.length; draw(); onDone(false, r.solution, r.clues[r.clues.length - 1], 3); return; }
        shown = Math.min(r.clues.length, shown + 1); draw();
      };
      draw();
    }
  });
})();
