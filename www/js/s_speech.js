// ===== Gioca e Impara S — testi letti dalla voce (ripresi da Gioca e Impara) =====
const Speech = (() => {
  function toSpeech(t) {
    return String(t)
      .replace(/²/g, " alla seconda").replace(/³/g, " alla terza").replace(/⁴/g, " alla quarta").replace(/⁵/g, " alla quinta").replace(/⁶/g, " alla sesta").replace(/⁷/g, " alla settima").replace(/⁸/g, " all'ottava").replace(/⁹/g, " alla nona").replace(/_{2,}/g, " puntini ")
      .replace(/(\d)\s*×\s*(\d)/g, "$1 per $2")
      .replace(/(\d)\s*:\s*(\d)/g, "$1 diviso $2")
      .replace(/\+/g, " più ").replace(/[−-](?=\d)/g, " meno ")
      .replace(/−/g, " meno ").replace(/=/g, " uguale a ")
      .replace(/\^(\d)/g, " alla $1 ").replace(/(\d+)\s*%/g, "$1 per cento")
      .replace(/(\d+)\/(\d+)/g, "$1 fratto $2")
      .replace(/km\/h/g, " chilometri all'ora")
      .replace(/√(\d+)/g, "radice di $1").replace(/(\d)²/g, "$1 alla seconda").replace(/(\d)³/g, "$1 alla terza")
      .replace(/→/g, ", ").replace(/·/g, ". ")
      .replace(/cm²/g, " centimetri quadrati").replace(/\bcm\b/g, " centimetri");
  }
  const ALN = "A-Za-zÀ-ÿ0-9";
  function langSegs(text, en) {
    const t = toSpeech(text);
    const list = (en || []).filter(Boolean).sort((a, b) => b.length - a.length)
      .map(x => x.replace(/[.*+?^${}()|[\]\\\/]/g, "\\$&").replace(/\s+/g, "\\s+"));
    if (!list.length) return [{ t }];
    const re = new RegExp("(^|[^" + ALN + "])(" + list.join("|") + ")(?=$|[^" + ALN + "])", "gi");
    const out = []; let last = 0, m;
    while ((m = re.exec(t))) {
      const start = m.index + m[1].length;
      if (start > last) out.push({ t: t.slice(last, start) });
      out.push({ t: m[2], l: "en" });
      last = start + m[2].length;
    }
    if (last < t.length) out.push({ t: t.slice(last) });
    return out;
  }
  // una risposta: tutta inglese se la domanda ha ae, altrimenti solo le parole segnate
  const ansSegs = (q, t) => q && q.ae ? [{ t: toSpeech(t), l: "en" }] : langSegs(t, q && q.en);
  // se è tutto italiano torna una semplice stringa
  function fin(segs) {
    const out = [];
    segs.forEach(s => {
      const p = out[out.length - 1];
      if (p && (p.l || "") === (s.l || "")) p.t += s.t; else out.push({ t: s.t, l: s.l });
    });
    return out.length === 1 && !out[0].l ? out[0].t : out;
  }

  // una frase di "Vero o falso": domanda + risposta proposta
  function vfSegs(card) {
    return [...langSegs(card.q.q, card.q.en), { t: /[?!.:…]$/.test(card.q.q) ? " Risposta proposta: " : ". Risposta proposta: " }, ...ansSegs(card.q, card.cand), { t: "." }];
  }

  // una domanda dei giochi a più domande (Talpe, Gara): domanda e risposte
  function mqSegs(q) {
    const segs = [...langSegs(q.q, q.en), { t: " Le risposte sono: " }];
    q.a.forEach((a, i) => segs.push(...ansSegs(q, a), { t: i < q.a.length - 1 ? ", " : "." }));
    return segs;
  }

  // le quattro parole di "Trova l'intruso"
  function oddSegs(card) {
    const segs = [{ t: "Quale parola non c'entra con le altre? Le parole sono: " }];
    card.words.forEach((w, i) => segs.push({ t: toSpeech(w) + (i < card.words.length - 1 ? ", " : "."), l: card.eng ? "en" : "" }));
    return segs;
  }

  // una carta di "Smista nelle scatole": la parola (nella sua lingua) e le due scatole, senza dire dove va
  function sortSegs(card) {
    return [{ t: "Dove va: " }, { t: toSpeech(card.item.t), l: card.item.en ? "en" : "" },
      { t: `? Nella scatola ${toSpeech(card.labels[0])}, o nella scatola ${toSpeech(card.labels[1])}?` }];
  }

  const OPS = { "+": "più", "−": "meno", "×": "per", ":": "diviso", "=": "uguale a", "(": "apri parentesi", ")": "chiudi parentesi" };
  function roundSpeech(r) {
    if (r.speechIntro) return fin([{ t: r.speechIntro + " " }, ...langSegs(r.prompt, r.q0 && r.q0.en)]);
    if (r.kind === "frase") return "Metti le parole in ordine per fare una frase. Le parole sono: " + r.items.map(w => w.replace(/[.,;:!?]/g, "")).join(", ") + ".";
    if (r.kind === "operazione") return (r.problem ? toSpeech(r.prompt) + " " : "") + "Metti in ordine numeri e segni per fare l'operazione. Ci sono: " +
      r.items.map(t => OPS[t] || (/^−\d/.test(t) ? "meno " + t.slice(1) : t)).join(", ") + ".";
    if (r.kind === "corsa") return fin([{ t: `Gara contro il bot ${r.bot || ""}. A ogni risposta giusta fai uno scatto: arriva prima tu alla bandiera! Premi Via quando sei pronto. Prima domanda: ` }, ...mqSegs((r.qs || [r.q])[0])]);
    if (r.kind === "talpa") return fin([{ t: "Talpe veloci. Tre domande a raffica: colpisci la talpa con la risposta giusta prima che finisca il tempo. Prima domanda: " }, ...mqSegs((r.qs || [r.q])[0])]);
    if (r.kind === "vf") return fin([{ t: "Vero o falso. Per ogni frase tocca vero se la risposta è giusta, falso se è sbagliata. Prima frase: " }, ...vfSegs(r.cards[0])]);
    if (r.kind === "scatole") return fin([{ t: `Smista nelle scatole. Metti ogni carta nella scatola giusta: ${toSpeech(r.labels[0])}, oppure ${toSpeech(r.labels[1])}. Trascina la carta o tocca la scatola. Due errori si perdonano, al terzo si perde. Prima carta: ` },
      { t: toSpeech(r.items[0].t), l: r.items[0].en ? "en" : "" }, { t: "." }]);
    if (r.kind === "intruso") return fin([{ t: "Trova l'intruso. Tocca la parola che non c'entra con le altre tre. Primo giro: " }, ...oddSegs(r.rounds[0])]);
    if (r.kind === "lettere" || r.kind === "impiccato") {
      const a = r.ask, intro = r.kind === "lettere" ? "Rimetti in ordine le lettere per formare la parola. " : "Salva l'omino. Indovina la parola toccando le lettere. ";
      const outro = r.kind === "lettere" ? " Tocca le lettere nell'ordine giusto. Due errori si perdonano." : " Due errori si perdonano, al terzo l'omino cade in acqua.";
      if (!a) return fin([{ t: intro + "La parola da trovare corrisponde a: " }, { t: toSpeech(r.clue.l), l: r.eng ? "en" : "" }, { t: ". " + toSpeech(r.hint || "") }]);
      return fin(a.bare ? [{ t: intro + toSpeech(a.text) + outro }]
        : [{ t: intro + toSpeech(a.pre.replace(/«$/, "")) }, { t: toSpeech(r.clue.l), l: r.eng ? "en" : "" }, { t: toSpeech(a.post.replace(/^»/, "")) + outro }]);
    }
    if (r.kind === "linee") {
      const segs = [{ t: "Collega con le linee. " + toSpeech(r.prompt) + " Parole a sinistra: " }];
      r.pairs.forEach((p, i) => segs.push({ t: toSpeech(p.l) + (i < r.pairs.length - 1 ? ", " : "."), l: r.eng ? "en" : "" }));
      segs.push({ t: " Parole a destra: " });
      r.order.forEach((k, i) => segs.push({ t: toSpeech(r.pairs[k].r) + (i < r.order.length - 1 ? ", " : "."), l: r.rEn ? "en" : "" }));
      return fin(segs);
    }
    if (r.kind === "fila") {
      const segs = [{ t: "Metti in fila. " + toSpeech(r.prompt) + " Gli elementi sono: " }];
      r.pool.forEach((w, i) => segs.push({ t: toSpeech(w) + (i < r.pool.length - 1 ? ", " : "."), l: r.eng ? "en" : "" }));
      return fin(segs);
    }
    if (r.kind === "memory") {
      const segs = [{ t: toSpeech(r.prompt) + " Le coppie sono: " }];
      r.pairs.forEach((p, i) => segs.push({ t: toSpeech(p.l), l: r.eng ? "en" : "" }, { t: " con " }, { t: toSpeech(p.r) + (i < r.pairs.length - 1 ? ", " : "."), l: r.rEn ? "en" : "" }));
      return fin(segs);
    }
    if (r.kind === "palloncino") {
      const segs = [{ t: toSpeech(r.prompt) + " Le parole sono: " }];
      r.pairs.forEach((p, i) => segs.push({ t: toSpeech(p.l) + (i < r.pairs.length - 1 ? ", " : "."), l: r.eng ? "en" : "" }));
      return fin(segs);
    }
    if (r.kind === "incastro" && r.eng) {
      const segs = [{ t: toSpeech(r.prompt) + " Da collegare: " }];
      r.pairs.forEach((p, i) => segs.push({ t: toSpeech(p.l) + (i < r.pairs.length - 1 ? ", " : ""), l: "en" }));
      segs.push({ t: ". I pezzi sono: " });
      r.order.forEach((k, i) => segs.push({ t: toSpeech(r.pairs[k].r) + (i < r.order.length - 1 ? ", " : ""), l: r.rEn ? "en" : "" }));
      segs.push({ t: "." });
      return fin(segs);
    }
    if (r.kind === "incastro") return toSpeech(r.prompt) + " Da collegare: " + r.pairs.map(p => toSpeech(p.l)).join(", ") + ". I pezzi sono: " + r.order.map(i => toSpeech(r.pairs[i].r)).join(", ") + ".";
    const q = r.q, segs = [{ t: r.kind === "pesca" ? "Pesca. Trascina l'amo vicino al pesce con la risposta giusta e aspetta che abbocchi. " : r.kind === "taglia" ? "Taglia al volo la risposta giusta, passando il dito sopra. " : "Canestro. Lancia il pallone nel canestro con la risposta giusta. " }, ...langSegs(r.prompt, q && q.en), { t: " Le risposte sono: " }];
    q.a.forEach((a, i) => segs.push(...ansSegs(q, a), { t: i < q.a.length - 1 ? ", " : "." }));
    return fin(segs);
  }
  return { toSpeech, langSegs, ansSegs, fin, vfSegs, mqSegs, oddSegs, sortSegs, roundSpeech };
})();
