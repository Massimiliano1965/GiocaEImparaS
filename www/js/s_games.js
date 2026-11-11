// ===== Gioca e Impara S — giochi nuovi per le superiori =====
// Trova l'errore, Stima, Completa. Si registrano nel motore come gli altri:
// make(classe, materia) prepara il giro, mount(el, giro, onDone) lo mostra; alla fine onDone(ok, soluzione, spiegazione, errori).
(() => {
  const H = Games.internals, { esc, shuffle, pick } = H;
  const tap = () => H.tap(), boom = () => H.boom();
  const alive = el => el && el.isConnected;
  const pips = (m, n) => `<div class="g2-pips" aria-label="Errori perdonati">${Array.from({ length: n }, (_, i) => `<i class="${i < n - m ? "" : "x"}"></i>`).join("")}</div>`;
  const num = v => String(v).replace(".", ",");

  // ---------------------------------------------------------------- TROVA L'ERRORE
  Games.register("errore", {
    subjects: ["italiano", "matematica", "inglese", "storia", "scienze", "civica"],
    make: (c, s) => {
      const d = s === "matematica" ? SUP.mathError(c) : pick(SUP.inYear(SUP.errors[s], c));
      if (!d) return null;
      let rows = d.rows.map((t, i) => ({ t, bad: i === d.wrong }));
      if (!d.steps) rows = shuffle(rows);   // i passaggi di un esercizio restano in ordine, le frasi si mescolano
      return { kind: "errore", title: "Trova l'errore", prompt: d.p, hint: "Tocca la riga sbagliata. Un errore si perdona, al secondo si perde.",
        speechIntro: "Trova l'errore.", rows, fix: d.fix, expl: d.e, steps: !!d.steps, en: !!d.en,
        solution: `${rows.find(r => r.bad).t} → ${d.fix}` };
    },
    mount: (el, r, onDone) => {
      let m = 0, done = false; const st = r.rows.map(() => "");
      function draw() {
        el.innerHTML = `<div class="g2 sg sg-err">${pips(m, 2)}
          <div class="sg-rows ${r.steps ? "steps" : ""}">${r.rows.map((row, i) => `<button class="sg-row ${st[i]}" data-i="${i}" ${done || st[i] ? "disabled" : ""}><b>${i + 1}</b><span${r.en ? ' lang="en"' : ""}>${esc(row.t)}</span></button>`).join("")}</div>
          ${done ? `<div class="sg-fix"><small>Corretto</small><span${r.en ? ' lang="en"' : ""}>${esc(r.fix)}</span></div>` : ""}</div>`;
      }
      el.onclick = e => {
        const b = e.target.closest(".sg-row"); if (!b || done) return;
        const i = +b.dataset.i;
        if (r.rows[i].bad) { done = true; st[i] = "hit"; tap(); draw(); onDone(true, r.solution, r.expl, m); return; }
        m++; st[i] = "ko"; boom();
        if (m >= 2) { done = true; st[r.rows.findIndex(x => x.bad)] = "show"; draw(); onDone(false, r.solution, r.expl, 3); return; }
        draw();
      };
      draw();
    }
  });

  // ---------------------------------------------------------------- STIMA
  Games.register("stima", {
    subjects: ["matematica", "storia", "scienze", "civica"],
    make: (c, s) => {
      const d = s === "matematica" ? SUP.mathStima(c) : pick(SUP.inYear(SUP.stima[s], c));
      if (!d) return null;
      const u = d.unit ? " " + d.unit : "";
      return { kind: "stima", title: "Stima", prompt: d.q, hint: `Sposta il cursore e conferma. Vale se sbagli al massimo di ${num(d.tol)}${u}.`,
        speechIntro: "Stima. Sposta il cursore sul valore che ti sembra giusto, poi conferma.", d, solution: num(d.ans) + u };
    },
    mount: (el, r, onDone) => {
      const d = r.d, u = d.unit ? " " + d.unit : "", dec = d.step < 1 ? 1 : 0;
      const snap = v => { const k = Math.round((v - d.min) / d.step) * d.step + d.min; return +Math.min(d.max, Math.max(d.min, k)).toFixed(dec); };
      let v = snap((d.min + d.max) / 2), done = false, ok = false;
      const pct = x => ((x - d.min) / (d.max - d.min)) * 100;
      function draw() {
        el.innerHTML = `<div class="g2 sg sg-est">
          <div class="sg-val ${done ? (ok ? "ok" : "ko") : ""}"><b>${num(v.toFixed(dec))}</b><small>${esc(d.unit || "")}</small></div>
          <div class="sg-scale">${done ? `<i class="band" style="left:${Math.max(0, pct(d.ans - d.tol))}%;width:${Math.min(100, pct(d.ans + d.tol)) - Math.max(0, pct(d.ans - d.tol))}%"></i><i class="right" style="left:${pct(d.ans)}%"></i><i class="mine" style="left:${pct(v)}%"></i>` : ""}
            <input type="range" min="${d.min}" max="${d.max}" step="${d.step}" value="${v}" aria-label="La tua stima" ${done ? "disabled" : ""}></div>
          <div class="sg-ends"><span>${num(d.min)}${esc(u)}</span><span>${num(d.max)}${esc(u)}</span></div>
          ${done ? `<div class="sg-fix"><small>Valore giusto</small><span>${esc(r.solution)}</span></div>`
            : `<div class="sg-nudge"><button data-n="-10" aria-label="Molto meno">−−</button><button data-n="-1" aria-label="Meno">−</button><button data-n="1" aria-label="Più">+</button><button data-n="10" aria-label="Molto più">++</button></div>
               <button class="g2-go" data-go="1">Conferma</button>`}</div>`;
        const inp = el.querySelector("input");
        if (inp && !done) inp.oninput = () => { v = snap(+inp.value); const b = el.querySelector(".sg-val b"); if (b) b.textContent = num(v.toFixed(dec)); };
      }
      el.onclick = e => {
        if (done) return;
        const n = e.target.closest("[data-n]"), go = e.target.closest("[data-go]");
        if (n) { v = snap(v + +n.dataset.n * d.step); tap(); draw(); return; }
        if (!go) return;
        done = true; ok = Math.abs(v - d.ans) <= d.tol + 1e-9;
        if (ok) tap(); else boom();
        draw();
        const diff = Math.abs(v - d.ans);
        onDone(ok, r.solution, `${d.e} La tua stima: ${num(v.toFixed(dec))}${u}${diff ? ` (scarto ${num(diff.toFixed(dec))})` : ", precisa"}.`, ok ? 0 : 3);
      };
      draw();
    }
  });

  // ---------------------------------------------------------------- COMPLETA
  Games.register("completa", {
    subjects: ["italiano", "inglese"],
    make: (c, s) => {
      const list = shuffle(SUP.inYear(SUP.cloze[s], c)).slice(0, 3);
      if (list.length < 3) return null;
      const items = list.map(x => { const o = shuffle(x.opts.slice()); return { s: x.s, opts: o, c: o.indexOf(x.opts[x.c]), e: x.e, en: !!x.en }; });
      const full = it => it.s.replace(/_{2,}/, it.opts[it.c]);
      return { kind: "completa", title: "Completa", prompt: "Completa ogni frase con la parola giusta.", hint: "Tre frasi di fila. Un errore si perdona, al secondo si perde.",
        speechIntro: "Completa.", items, solution: items.map(full).join(" · ") };
    },
    mount: (el, r, onDone) => {
      let k = 0, m = 0, done = false, lock = false; const bad = new Set();
      function draw(filled) {
        const it = r.items[k], parts = it.s.split(/_{2,}/);
        el.innerHTML = `<div class="g2 sg sg-clo">${pips(m, 2)}
          <div class="sg-step">${r.items.map((_, i) => `<i class="${i < k || (filled && i === k) ? "on" : i === k ? "cur" : ""}"></i>`).join("")}</div>
          <p class="sg-sent"${it.en ? ' lang="en"' : ""}>${esc(parts[0])}<mark class="${filled ? "ok" : ""}">${filled ? esc(it.opts[it.c]) : "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"}</mark>${esc(parts[1] || "")}</p>
          <div class="sg-opts">${it.opts.map((o, i) => `<button class="sg-opt ${bad.has(i) ? "ko" : filled && i === it.c ? "ok" : ""}" data-i="${i}" ${filled || bad.has(i) || done ? "disabled" : ""}${it.en ? ' lang="en"' : ""}>${esc(o)}</button>`).join("")}</div></div>`;
      }
      el.onclick = e => {
        const b = e.target.closest(".sg-opt"); if (!b || done || lock) return;
        const it = r.items[k], i = +b.dataset.i;
        if (i === it.c) {
          tap(); lock = true; draw(true);
          setTimeout(() => {
            if (!alive(el)) return;
            lock = false; bad.clear();
            if (k === r.items.length - 1) { done = true; onDone(true, r.solution, it.e, m); return; }
            k++; draw(false);
          }, 750);
          return;
        }
        m++; bad.add(i); boom();
        if (m >= 2) { done = true; draw(true); onDone(false, it.s.replace(/_{2,}/, it.opts[it.c]), it.e, 3); return; }
        draw(false);
      };
      draw(false);
    }
  });
})();
