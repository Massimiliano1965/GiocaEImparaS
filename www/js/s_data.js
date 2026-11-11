// ===== Gioca e Impara S — contenuti delle superiori =====
// Classi: 8 = 1ª superiore ... 12 = 5ª superiore. Ogni voce può avere cl: [dalla, alla].
// Solo materie comuni a licei, tecnici e artistici. Domande: { q, a: [4 risposte], c: indice giusta, e: spiegazione }.
const SUP = (() => {
  const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  const pick = arr => arr[rnd(0, arr.length - 1)];
  const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(0, i); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const sgn = n => String(n).replace("-", "−");
  const SUPS = { 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" };
  const sup = e => String(e).split("").map(d => SUPS[d]).join("");
  const pw = (b, e) => (e === 1 ? b : b + sup(e));
  // domanda con la risposta giusta e 3 sbagliate tutte diverse, già mescolata
  function mk(q, right, wrongs, e) {
    const seen = new Set([String(right)]), opts = [String(right)];
    for (const w of wrongs) { const t = String(w); if (!seen.has(t) && opts.length < 4) { seen.add(t); opts.push(t); } }
    if (opts.length < 4) return null;
    const mixed = shuffle(opts);
    return { q, a: mixed, c: mixed.indexOf(String(right)), e };
  }

  // ---------------------------------------------------------------- MATEMATICA (generata, 1ª superiore)
  const FRAZ = [
    ["1/2 + 1/3", "5/6", ["2/5", "1/6", "2/6"], "Denominatore comune 6: 3/6 + 2/6 = 5/6."],
    ["3/4 − 1/2", "1/4", ["2/2", "1/2", "2/4"], "1/2 = 2/4, quindi 3/4 − 2/4 = 1/4."],
    ["2/3 · 3/5", "2/5", ["6/8", "5/8", "10/9"], "Si moltiplicano numeratori e denominatori: 6/15 = 2/5."],
    ["3/4 : 1/2", "3/2", ["3/8", "2/3", "1/4"], "Dividere per 1/2 è moltiplicare per 2: 6/4 = 3/2."],
    ["1/4 + 1/4", "1/2", ["2/8", "1/8", "1/16"], "2/4 si semplifica in 1/2."],
    ["5/6 − 1/3", "1/2", ["4/3", "4/6", "2/3"], "1/3 = 2/6, quindi 5/6 − 2/6 = 3/6 = 1/2."],
    ["(1/2)²", "1/4", ["1", "2/4", "1/2"], "Si eleva sia il numeratore sia il denominatore: 1/4."],
    ["2/5 + 1/10", "1/2", ["3/15", "3/10", "2/50"], "2/5 = 4/10, quindi 4/10 + 1/10 = 5/10 = 1/2."]
  ];
  function math8() {
    const t = rnd(0, 9);
    if (t === 0) {   // equazione ax + b = c
      const x = rnd(-6, 9), a = rnd(2, 7), b = rnd(1, 12), c = a * x + b;
      return mk(`Risolvi: ${a}x + ${b} = ${sgn(c)}. Quanto vale x?`, sgn(x), [sgn(x + 1), sgn(x - 1), sgn(-x), sgn(x + 2)], `${a}x = ${sgn(c)} − ${b} = ${sgn(c - b)}, quindi x = ${sgn(x)}.`);
    }
    if (t === 1) {   // equazione con la x da tutte e due le parti
      const x = rnd(-5, 8), a = rnd(4, 9), d = rnd(1, a - 2), b = rnd(1, 15), c = (a - d) * x + b;
      return mk(`Risolvi: ${a}x + ${b} = ${d === 1 ? "" : d}x ${c < 0 ? "− " + Math.abs(c) : "+ " + c}. Quanto vale x?`, sgn(x), [sgn(x + 1), sgn(x - 1), sgn(-x), sgn(x + 2)],
        `Si portano le x a sinistra e i numeri a destra: ${a - d}x = ${sgn(c - b)}, quindi x = ${sgn(x)}.`);
    }
    if (t === 2) {   // prodotto di monomi
      const a = rnd(2, 6), b = rnd(2, 5), m = rnd(1, 4), n = rnd(1, 4);
      return mk(`Quanto fa ${a}${pw("a", m)} · ${b}${pw("a", n)}?`, `${a * b}${pw("a", m + n)}`, [`${a * b}${pw("a", m * n + 1)}`, `${a + b}${pw("a", m + n)}`, `${a * b}${pw("a", Math.abs(m - n) + 5)}`, `${a + b}${pw("a", m * n + 1)}`],
        `Si moltiplicano i numeri (${a} · ${b} = ${a * b}) e si sommano gli esponenti (${m} + ${n} = ${m + n}).`);
    }
    if (t === 3) {   // quadrato di binomio
      const a = rnd(1, 7);
      return mk(`Sviluppa: (x + ${a})²`, `x² + ${2 * a}x + ${a * a}`, [`x² + ${a * a}`, `x² + ${a}x + ${a * a}`, `x² + ${2 * a}x + ${2 * a}`, `x² − ${2 * a}x + ${a * a}`],
        `Quadrato di binomio: quadrato del primo, doppio prodotto (2 · x · ${a} = ${2 * a}x), quadrato del secondo (${a * a}).`);
    }
    if (t === 4) {   // somma per differenza
      const a = rnd(2, 9);
      return mk(`Quanto fa (x + ${a})(x − ${a})?`, `x² − ${a * a}`, [`x² + ${a * a}`, `x² − ${2 * a}x + ${a * a}`, `x² − ${2 * a}`, `x² + ${2 * a}x − ${a * a}`],
        `Somma per differenza: quadrato del primo meno quadrato del secondo, cioè x² − ${a * a}.`);
    }
    if (t === 5) {   // proprietà delle potenze
      const b = pick([2, 3, 5, 10]), m = rnd(2, 5), n = rnd(2, 4);
      if (Math.random() < 0.5) return mk(`Con le proprietà delle potenze: ${pw(b, m)} · ${pw(b, n)} = ?`, pw(b, m + n), [pw(b, m * n === m + n ? m + n + 1 : m * n), pw(b * b, m + n), pw(b, m + n + 1), pw(b * b, m * n + 1)],
        `Stessa base: nel prodotto gli esponenti si sommano (${m} + ${n} = ${m + n}).`);
      return mk(`Con le proprietà delle potenze: (${pw(b, m)})${sup(n)} = ?`, pw(b, m * n), [pw(b, m + n === m * n ? m * n + 1 : m + n), pw(b * n, m), pw(b, m * n + 1), pw(b, m * n - 1)],
        `Potenza di potenza: gli esponenti si moltiplicano (${m} · ${n} = ${m * n}).`);
    }
    if (t === 6) {   // percentuali
      const p = pick([5, 10, 15, 20, 25, 30, 40, 60, 75]), base = pick([40, 60, 80, 120, 200, 240, 300, 400]), v = base * p / 100;
      if (Math.random() < 0.5) return mk(`Quanto vale il ${p}% di ${base}?`, v, [v + base / 10, v * 2, Math.max(1, v - base / 20), v + 5, v * 10], `${base} · ${p} : 100 = ${v}.`);
      return mk(`Un prezzo di ${base} € viene scontato del ${p}%. Quanto si paga?`, `${base - v} €`, [`${v} €`, `${base - v + base / 10} €`, `${base + v} €`, `${base - p} €`], `Lo sconto è ${v} €: ${base} − ${v} = ${base - v} €.`);
    }
    if (t === 7) {   // frazioni
      const f = pick(FRAZ);
      return mk(`Quanto fa ${f[0]}?`, f[1], f[2], f[3]);
    }
    if (t === 8) {   // scomposizione
      if (Math.random() < 0.5) { const a = rnd(2, 9); return mk(`Scomponi in fattori: x² − ${a * a}`, `(x + ${a})(x − ${a})`, [`(x − ${a})²`, `(x + ${a})²`, `x(x − ${a * a})`, `(x − ${a * a})(x + 1)`], `È una differenza di quadrati: x² − ${a}² = (x + ${a})(x − ${a}).`); }
      const k = pick([2, 3, 4, 5]), a = rnd(2, 5), b = rnd(1, 6);
      const gcd = (x, y) => (y ? gcd(y, x % y) : x), g = gcd(a, b), a1 = a / g, b1 = b / g, K = k * g;
      return mk(`Raccogli a fattore comune: ${K * a1}x + ${K * b1}`, `${K}(${a1 === 1 ? "" : a1}x + ${b1})`, [`${K}(${a1 === 1 ? "" : a1}x + ${K * b1})`, `${K * a1}(x + ${K * b1})`, `x(${K * a1} + ${K * b1})`, `${K}(${a1 + 1}x + ${b1})`], `Il fattore comune è ${K}: ${K * a1}x = ${K} · ${a1 === 1 ? "" : a1}x e ${K * b1} = ${K} · ${b1}.`);
    }
    // proporzione
    const a = rnd(2, 6), b = rnd(2, 6) + a, k = rnd(2, 6);
    return mk(`Trova x nella proporzione ${a} : ${b} = x : ${b * k}`, a * k, [a * k + a, b * k - a, a * k - 1, a + k, a * k + 1], `x = ${a} · ${b * k} : ${b} = ${a * k}.`);
  }
  function math(classId) {
    for (let g = 0; g < 20; g++) { const q = (MY.math[classId] || math8)(classId); if (q) return q; }
    return mk("Quanto fa 2³?", "8", ["6", "9", "5"], "2 · 2 · 2 = 8.");
  }
  function mathPairs(yr) {
    if (MY.pairs[yr]) return MY.pairs[yr]();
    const gens = [
      () => { const x = rnd(-5, 9), a = rnd(2, 6), b = rnd(1, 9); return { l: `${a}x + ${b} = ${sgn(a * x + b)}`, r: `x = ${sgn(x)}` }; },
      () => { const b = pick([2, 3, 5]), m = rnd(2, 4), n = rnd(2, 4); return { l: `${pw(b, m)} · ${pw(b, n)}`, r: pw(b, m + n) }; },
      () => { const a = rnd(2, 8); return { l: `(x + ${a})(x − ${a})`, r: `x² − ${a * a}` }; },
      () => { const a = rnd(1, 6); return { l: `(x + ${a})²`, r: `x² + ${2 * a}x + ${a * a}` }; }
    ];
    const gen = pick(gens), out = []; let g = 0;
    while (out.length < 4 && g++ < 300) { const p = gen(); if (!out.some(o => o.r === p.r || o.l === p.l)) out.push(p); }
    return out;
  }
  function filaMath(yr) {
    if (MY.fila[yr]) return MY.fila[yr]();
    const sets = [
      ["−3", "−1/2", "0", "3/4", "2"], ["−2", "−0,5", "1/4", "1", "√4 + 1"], ["2⁰", "2¹", "2²", "2³", "2⁴"], ["−5", "−2", "0", "1/2", "3"],
      ["10⁻²", "10⁻¹", "1", "10", "10²"], ["1/5", "1/4", "1/3", "1/2", "1"], ["−1", "−1/3", "1/3", "2/3", "1"], ["0,05", "0,5", "5/2", "5", "5²"]
    ];
    return { p: "Metti in fila dal più piccolo al più grande.", items: pick(sets) };
  }

  // ---------------------------------------------------------------- DOMANDE (1ª superiore)
  const Y1 = [8, 8];
  const q = (qq, a, e, extra) => Object.assign({ q: qq, a, c: 0, e, cl: Y1 }, extra || {});
  const BANK = {
    italiano: [
      q("Nella frase «Il vento ha spezzato il ramo», qual è il complemento oggetto?", ["Il ramo", "Il vento", "Ha spezzato", "Non c'è"], "Risponde alla domanda «che cosa?»: il ramo."),
      q("In «Il ramo è stato spezzato dal vento», «dal vento» è un complemento…", ["Di causa efficiente", "Di mezzo", "Di causa", "Di moto da luogo"], "Nella frase passiva indica chi o che cosa compie l'azione: essendo una cosa, è causa efficiente."),
      q("Che cos'è la fabula di un racconto?", ["I fatti in ordine cronologico", "I fatti nell'ordine scelto dall'autore", "La morale della storia", "L'elenco dei personaggi"], "La fabula è la storia in ordine di tempo; l'intreccio è l'ordine in cui l'autore la racconta."),
      q("Come si chiama un salto indietro nel racconto, verso fatti già accaduti?", ["Analessi (flashback)", "Prolessi", "Ellissi", "Digressione"], "L'analessi recupera il passato; la prolessi anticipa il futuro."),
      q("Un narratore che sa tutto, anche i pensieri dei personaggi, si dice…", ["Onnisciente", "Interno", "Inattendibile", "Protagonista"], "Il narratore onnisciente conosce fatti, pensieri e futuro di tutti i personaggi."),
      q("Chi è il protagonista dell'Odissea?", ["Ulisse (Odisseo)", "Achille", "Enea", "Ettore"], "L'Odissea racconta il ritorno di Ulisse a Itaca dopo la guerra di Troia."),
      q("Con quale parola si apre il tema dell'Iliade?", ["L'ira di Achille", "Il viaggio di Ulisse", "La fuga di Enea", "Il cavallo di legno"], "Il proemio annuncia subito l'argomento: l'ira di Achille."),
      q("Chi scrisse l'Eneide?", ["Virgilio", "Omero", "Ovidio", "Orazio"], "Virgilio la compose in latino nel I secolo a.C., sotto Augusto."),
      q("«Era un fulmine» detto di un corridore è…", ["Una metafora", "Una similitudine", "Un'iperbole numerica", "Un ossimoro"], "Non c'è il «come»: il paragone è sottinteso, quindi è una metafora."),
      q("«Ghiaccio bollente» è un esempio di…", ["Ossimoro", "Anafora", "Metonimia", "Climax"], "L'ossimoro accosta due parole di significato opposto."),
      q("La ripetizione della stessa parola all'inizio di più versi o frasi si chiama…", ["Anafora", "Allitterazione", "Enjambement", "Litote"], "L'anafora ripete una o più parole a inizio verso o frase."),
      q("In «Penso che tu abbia ragione», «che tu abbia ragione» è una subordinata…", ["Oggettiva", "Soggettiva", "Relativa", "Finale"], "Fa da complemento oggetto di «penso»: è un'oggettiva."),
      q("In «Studio per superare l'esame», «per superare l'esame» è una subordinata…", ["Finale", "Causale", "Temporale", "Consecutiva"], "Indica lo scopo dell'azione: è una finale."),
      q("Qual è il soggetto in «Piove da ore»?", ["Non c'è: il verbo è impersonale", "Ore", "Piove", "Il cielo"], "I verbi atmosferici sono impersonali: non hanno soggetto."),
      q("Quale frase contiene un predicato nominale?", ["Marta è simpatica", "Marta corre veloce", "Marta legge un libro", "Marta arriva domani"], "Verbo essere (copula) + aggettivo = predicato nominale."),
      q("Il punto di vista da cui sono raccontati i fatti si chiama…", ["Focalizzazione", "Fabula", "Sequenza", "Registro"], "La focalizzazione può essere zero, interna o esterna."),
      q("Un testo che vuole convincere il lettore di una tesi è…", ["Argomentativo", "Descrittivo", "Narrativo", "Regolativo"], "Il testo argomentativo sostiene una tesi con argomenti e prove."),
      q("Nell'epica, l'espressione fissa «Achille piè veloce» è…", ["Un epiteto", "Una similitudine", "Un proemio", "Un'invocazione"], "L'epiteto è un attributo fisso che accompagna il nome di un eroe o di un dio."),
      q("Quale forma è un congiuntivo imperfetto?", ["Che io andassi", "Che io vada", "Io andrei", "Io andai"], "«Andassi» è congiuntivo imperfetto; «vada» è presente, «andrei» condizionale, «andai» passato remoto."),
      q("In «Se avessi tempo, verrei», la frase con «se» è la…", ["Protasi", "Apodosi", "Principale", "Coordinata"], "Nel periodo ipotetico la protasi esprime la condizione, l'apodosi la conseguenza."),
      q("Quale parola è un avverbio?", ["Lentamente", "Lento", "Lentezza", "Rallentare"], "«Lentamente» modifica il verbo: è un avverbio di modo."),
      q("Che cosa indica il registro linguistico?", ["Il livello di formalità", "Il numero di parole", "Il dialetto parlato", "La lunghezza delle frasi"], "Il registro (formale, medio, informale) dipende da situazione e destinatario."),
      q("A chi si rivolge il poeta nel proemio dei poemi omerici?", ["Alla Musa", "A Zeus", "Al re", "Al lettore"], "L'invocazione alla Musa apre sia l'Iliade sia l'Odissea."),
      q("Quale coppia è formata da sinonimi?", ["Rapido – veloce", "Alto – basso", "Pesca (frutto) – pesca (sport)", "Fiore – rosa"], "I sinonimi hanno significato simile; gli altri sono contrari, omonimi e iperonimo/iponimo.")
    ],
    inglese: [
      q("Completa: «She ___ to school every day.»", ["goes", "go", "is going", "going"], "Abitudine + terza persona: present simple con -es.", { ae: true, en: ["She ___ to school every day."] }),
      q("Completa: «Look! It ___ .»", ["is raining", "rains", "rain", "rained"], "Azione in corso adesso: present continuous.", { ae: true, en: ["Look! It ___ ."] }),
      q("Qual è il past simple di «to go»?", ["went", "goed", "gone", "going"], "«Go» è irregolare: go – went – gone.", { ae: true, en: ["to go"] }),
      q("Qual è il past simple di «to buy»?", ["bought", "buyed", "brought", "buy"], "Buy – bought – bought. «Brought» viene da «bring».", { ae: true, en: ["to buy"] }),
      q("Completa: «I ___ TV when the phone rang.»", ["was watching", "watched", "am watching", "watch"], "Azione in corso nel passato interrotta da un'altra: past continuous.", { ae: true, en: ["I ___ TV when the phone rang."] }),
      q("Qual è il comparativo di «good»?", ["better", "gooder", "more good", "best"], "Good – better – the best: è irregolare.", { ae: true, en: ["good"] }),
      q("Qual è il superlativo di «bad»?", ["the worst", "the baddest", "the worse", "the most bad"], "Bad – worse – the worst.", { ae: true, en: ["bad"] }),
      q("Completa: «There isn't ___ milk in the fridge.»", ["any", "some", "a", "many"], "Nelle frasi negative si usa «any».", { ae: true, en: ["There isn't ___ milk in the fridge."] }),
      q("Completa: «How ___ money have you got?»", ["much", "many", "a lot", "few"], "«Money» è non numerabile: how much.", { ae: true, en: ["How ___ money have you got?"] }),
      q("Completa: «You ___ wear a seat belt. It's the law.»", ["must", "can", "might", "would"], "«Must» esprime obbligo.", { ae: true, en: ["You ___ wear a seat belt. It's the law."] }),
      q("Completa: «I'm tired. I think I ___ go to bed.»", ["will", "am going", "going to", "would"], "Decisione presa sul momento: will.", { ae: true, en: ["I'm tired. I think I ___ go to bed."] }),
      q("Completa: «We ___ visit Rome next week. We've already booked.»", ["are going to", "will to", "go to", "went to"], "Progetto già deciso: be going to.", { ae: true, en: ["We ___ visit Rome next week. We've already booked."] }),
      q("Che cosa significa «actually»?", ["In realtà", "Attualmente", "Attivamente", "Subito"], "È un falso amico: «attualmente» si dice «currently».", { en: ["actually"] }),
      q("Che cosa significa «library»?", ["Biblioteca", "Libreria (negozio)", "Libro", "Libertà"], "Falso amico: la libreria-negozio è «bookshop».", { en: ["library"] }),
      q("Completa: «She has lived here ___ 2020.»", ["since", "for", "from", "by"], "«Since» indica il momento d'inizio; «for» la durata.", { ae: true, en: ["She has lived here ___ 2020."] }),
      q("Completa: «Have you ever ___ sushi?»", ["eaten", "ate", "eat", "eating"], "Present perfect: have + participio passato (eaten).", { ae: true, en: ["Have you ever ___ sushi?"] }),
      q("Quale domanda è corretta?", ["Where do you live?", "Where you live?", "Where does you live?", "Where live you?"], "Nel present simple la domanda si forma con do/does + soggetto + verbo base.", { ae: true }),
      q("Completa: «He doesn't ___ coffee.»", ["like", "likes", "liking", "liked"], "Dopo «doesn't» il verbo resta alla forma base.", { ae: true, en: ["He doesn't ___ coffee."] }),
      q("Completa: «This is the boy ___ won the race.»", ["who", "which", "where", "whose"], "Per le persone il pronome relativo è «who».", { ae: true, en: ["This is the boy ___ won the race."] }),
      q("Completa: «If it rains, we ___ at home.»", ["will stay", "stayed", "would stay", "stay will"], "First conditional: if + present simple, will + verbo base.", { ae: true, en: ["If it rains, we ___ at home."] }),
      q("Qual è il plurale di «child»?", ["children", "childs", "childes", "childrens"], "Plurale irregolare: child – children.", { ae: true, en: ["child"] }),
      q("Completa: «I'm interested ___ music.»", ["in", "on", "at", "of"], "Si dice «interested in».", { ae: true, en: ["I'm interested ___ music."] }),
      q("Completa: «She's good ___ maths.»", ["at", "in", "on", "with"], "Si dice «good at».", { ae: true, en: ["She's good ___ maths."] }),
      q("Che cosa significa «to borrow»?", ["Prendere in prestito", "Dare in prestito", "Rubare", "Restituire"], "«Borrow» = prendere in prestito; «lend» = dare in prestito.", { en: ["to borrow"] })
    ],
    storia: [
      q("Con che cosa si fa finire convenzionalmente la Preistoria?", ["L'invenzione della scrittura", "La scoperta del fuoco", "La nascita di Roma", "L'uso del ferro"], "La scrittura compare in Mesopotamia verso il 3200 a.C.: da lì inizia la Storia."),
      q("Che cosa caratterizza la «rivoluzione neolitica»?", ["Agricoltura e allevamento", "La scrittura", "La lavorazione del ferro", "Le prime città-stato greche"], "Nel Neolitico l'uomo diventa agricoltore e allevatore e si fa sedentario."),
      q("Tra quali fiumi si sviluppò la civiltà mesopotamica?", ["Tigri ed Eufrate", "Nilo e Giordano", "Indo e Gange", "Tevere e Arno"], "Mesopotamia significa «terra tra i fiumi»: Tigri ed Eufrate."),
      q("Quale popolo inventò la scrittura cuneiforme?", ["I Sumeri", "Gli Egizi", "I Fenici", "I Greci"], "I Sumeri incidevano segni a forma di cuneo su tavolette d'argilla."),
      q("Per che cosa è famoso il re babilonese Hammurabi?", ["Un codice di leggi scritte", "Le piramidi", "L'alfabeto", "La democrazia"], "Il Codice di Hammurabi (XVIII secolo a.C.) è una delle prime raccolte di leggi scritte."),
      q("Quale popolo diffuse l'alfabeto fonetico nel Mediterraneo?", ["I Fenici", "Gli Ittiti", "I Persiani", "Gli Assiri"], "I Fenici, mercanti e navigatori, usavano un alfabeto di 22 segni."),
      q("Che cos'era la polis?", ["Una città-stato greca", "Un tempio", "Una legione romana", "Una colonia fenicia"], "La polis era una comunità indipendente con proprie leggi e istituzioni."),
      q("Quale polis era governata da due re e fondata sull'educazione militare?", ["Sparta", "Atene", "Tebe", "Corinto"], "A Sparta comandavano due re (diarchia) e i cittadini erano soldati."),
      q("In quale città nacque la democrazia?", ["Atene", "Sparta", "Roma", "Babilonia"], "Ad Atene, con le riforme di Clistene (fine del VI secolo a.C.)."),
      q("Contro chi combatterono i Greci a Maratona (490 a.C.)?", ["I Persiani", "I Romani", "I Cartaginesi", "I Macedoni"], "A Maratona gli Ateniesi fermarono l'esercito persiano di Dario."),
      q("Quale guerra oppose Atene e Sparta nel V secolo a.C.?", ["La guerra del Peloponneso", "Le guerre puniche", "Le guerre persiane", "La guerra di Troia"], "Durò dal 431 al 404 a.C. e finì con la vittoria di Sparta."),
      q("Chi conquistò l'Impero persiano arrivando fino all'India?", ["Alessandro Magno", "Pericle", "Giulio Cesare", "Annibale"], "Alessandro, re di Macedonia, conquistò l'impero tra il 334 e il 323 a.C."),
      q("Come si chiama l'età che segue la morte di Alessandro Magno?", ["Ellenismo", "Medioevo", "Età arcaica", "Età augustea"], "Nell'età ellenistica la cultura greca si diffonde in tutto l'Oriente."),
      q("Secondo la tradizione, in che anno fu fondata Roma?", ["753 a.C.", "509 a.C.", "476 d.C.", "264 a.C."], "La data tradizionale è il 21 aprile del 753 a.C."),
      q("Che cosa accadde a Roma nel 509 a.C.?", ["Nacque la repubblica", "Fu fondata la città", "Morì Cesare", "Cadde l'impero"], "Cacciato l'ultimo re, Tarquinio il Superbo, nasce la repubblica."),
      q("Chi erano i plebei?", ["I cittadini non nobili di Roma", "Gli schiavi", "I sacerdoti", "I soldati stranieri"], "I plebei lottarono a lungo per avere gli stessi diritti dei patrizi."),
      q("Quale magistratura difendeva gli interessi della plebe?", ["I tribuni della plebe", "I consoli", "I censori", "I pretori"], "I tribuni potevano bloccare con il veto le decisioni dannose per la plebe."),
      q("Contro quale città Roma combatté le guerre puniche?", ["Cartagine", "Atene", "Troia", "Alessandria"], "Tre guerre tra il 264 e il 146 a.C., finite con la distruzione di Cartagine."),
      q("Quale generale cartaginese attraversò le Alpi con gli elefanti?", ["Annibale", "Scipione", "Pirro", "Serse"], "Annibale invase l'Italia nel 218 a.C., durante la seconda guerra punica."),
      q("Che cosa proponevano i fratelli Gracchi?", ["Una riforma agraria", "L'abolizione del Senato", "La guerra alla Grecia", "La fine della repubblica"], "Volevano ridistribuire le terre pubbliche ai cittadini poveri."),
      q("Che cosa accadde alle Idi di marzo del 44 a.C.?", ["Fu ucciso Giulio Cesare", "Nacque l'impero", "Fu fondata Roma", "Finì la guerra punica"], "Cesare fu ucciso in Senato da un gruppo di congiurati."),
      q("Che cos'erano le piramidi egizie?", ["Tombe dei faraoni", "Templi pubblici", "Magazzini di grano", "Fortezze"], "Le piramidi custodivano il corpo e il corredo del faraone."),
      q("Come si chiama la scrittura sacra degli Egizi?", ["Geroglifica", "Cuneiforme", "Alfabetica", "Lineare B"], "I geroglifici combinavano segni che indicavano idee e suoni."),
      q("Qual era la massima carica della repubblica romana, tenuta da due uomini per un anno?", ["Il consolato", "La dittatura", "Il tribunato", "La censura"], "I due consoli guidavano lo Stato e l'esercito per un anno.")
    ],
    scienze: [
      q("Qual è il pianeta più vicino al Sole?", ["Mercurio", "Venere", "Marte", "Terra"], "L'ordine è Mercurio, Venere, Terra, Marte, Giove, Saturno, Urano, Nettuno."),
      q("Che cosa causa l'alternarsi del dì e della notte?", ["La rotazione terrestre", "La rivoluzione attorno al Sole", "Le fasi lunari", "L'inclinazione delle orbite dei pianeti"], "La Terra ruota su se stessa in circa 24 ore."),
      q("Che cosa causa principalmente le stagioni?", ["L'inclinazione dell'asse terrestre", "La distanza dal Sole", "La rotazione terrestre", "Le maree"], "L'asse inclinato di circa 23,5° fa variare l'insolazione durante l'anno."),
      q("Qual è il gas più abbondante nell'atmosfera terrestre?", ["Azoto", "Ossigeno", "Anidride carbonica", "Argon"], "L'azoto è circa il 78%, l'ossigeno circa il 21%."),
      q("In quale strato dell'atmosfera avvengono i fenomeni meteorologici?", ["Troposfera", "Stratosfera", "Mesosfera", "Termosfera"], "La troposfera è lo strato più basso e contiene quasi tutto il vapore acqueo."),
      q("Come si chiama il passaggio diretto da solido a gas?", ["Sublimazione", "Evaporazione", "Fusione", "Condensazione"], "Nella sublimazione il solido diventa gas senza passare per il liquido."),
      q("Quali particelle si trovano nel nucleo dell'atomo?", ["Protoni e neutroni", "Protoni ed elettroni", "Solo elettroni", "Neutroni ed elettroni"], "Nel nucleo ci sono protoni (positivi) e neutroni (neutri); gli elettroni stanno attorno."),
      q("Che cosa indica il numero atomico di un elemento?", ["Il numero di protoni", "Il numero di neutroni", "La massa in grammi", "Il numero di legami"], "Il numero atomico Z è il numero di protoni del nucleo."),
      q("Qual è la formula chimica dell'acqua?", ["H₂O", "CO₂", "O₂", "NaCl"], "Due atomi di idrogeno e uno di ossigeno."),
      q("Le rocce nate dal raffreddamento del magma si chiamano…", ["Magmatiche (ignee)", "Sedimentarie", "Metamorfiche", "Organogene"], "Granito e basalto sono rocce magmatiche."),
      q("Il marmo è una roccia…", ["Metamorfica", "Magmatica", "Sedimentaria", "Vulcanica"], "Il marmo nasce dalla trasformazione del calcare per calore e pressione."),
      q("Qual è l'unità di misura della massa nel Sistema Internazionale?", ["Chilogrammo", "Newton", "Litro", "Grammo"], "Nel SI la massa si misura in chilogrammi (kg)."),
      q("Come si calcola la densità di un corpo?", ["Massa diviso volume", "Volume diviso massa", "Massa per volume", "Peso per altezza"], "d = m / V."),
      q("Un miscuglio in cui i componenti non si distinguono, come acqua e sale, è…", ["Una soluzione (miscuglio omogeneo)", "Un miscuglio eterogeneo", "Un composto", "Un elemento"], "Una soluzione è un miscuglio omogeneo di soluto e solvente."),
      q("La Luna impiega circa quanto a girare attorno alla Terra?", ["27 giorni", "24 ore", "365 giorni", "7 giorni"], "Il periodo di rivoluzione della Luna è di circa 27 giorni e 8 ore."),
      q("Che cos'è una galassia?", ["Un enorme insieme di stelle, gas e polveri", "Un pianeta gassoso", "Una stella molto luminosa", "Un gruppo di comete"], "La nostra galassia, la Via Lattea, contiene centinaia di miliardi di stelle."),
      q("Quale parte dell'idrosfera contiene più acqua dolce?", ["Ghiacciai e calotte polari", "Fiumi", "Laghi", "Atmosfera"], "Circa due terzi dell'acqua dolce sono ghiaccio."),
      q("A che temperatura bolle l'acqua pura al livello del mare?", ["100 °C", "0 °C", "90 °C", "273 °C"], "A pressione atmosferica normale l'acqua bolle a 100 °C."),
      q("Un passaggio di stato è una trasformazione…", ["Fisica", "Chimica", "Nucleare", "Biologica"], "La sostanza resta la stessa: cambia solo lo stato di aggregazione."),
      q("Quale di questi è un minerale e non una roccia?", ["Quarzo", "Granito", "Calcare", "Basalto"], "Il quarzo è un minerale; le rocce sono di solito aggregati di minerali."),
      q("Che cosa misura un barometro?", ["La pressione atmosferica", "L'umidità", "La velocità del vento", "La temperatura"], "Il barometro misura la pressione dell'aria."),
      q("Qual è la stella più vicina alla Terra?", ["Il Sole", "Sirio", "La Stella Polare", "Proxima Centauri"], "Il Sole dista circa 150 milioni di chilometri."),
      q("Quale simbolo indica il sodio nella tavola periodica?", ["Na", "S", "So", "N"], "Na viene dal latino «natrium»."),
      q("Come si chiama il ciclo che porta l'acqua dal mare alle nuvole e di nuovo a terra?", ["Ciclo idrologico", "Ciclo litogenetico", "Ciclo del carbonio", "Ciclo lunare"], "Evaporazione, condensazione, precipitazioni e ritorno al mare.")
    ],
    civica: [
      q("In che anno è entrata in vigore la Costituzione italiana?", ["1948", "1946", "1861", "1958"], "È in vigore dal 1° gennaio 1948."),
      q("Che cosa dice l'articolo 1 della Costituzione?", ["L'Italia è una Repubblica democratica, fondata sul lavoro", "Tutti i cittadini sono uguali davanti alla legge", "L'Italia ripudia la guerra", "La bandiera è il tricolore"], "L'articolo 1 aggiunge che la sovranità appartiene al popolo."),
      q("Quale articolo afferma l'uguaglianza di tutti i cittadini davanti alla legge?", ["Articolo 3", "Articolo 1", "Articolo 11", "Articolo 21"], "L'articolo 3 vieta distinzioni di sesso, razza, lingua, religione, opinioni politiche, condizioni personali e sociali."),
      q("Che cosa stabilisce l'articolo 11?", ["L'Italia ripudia la guerra come strumento di offesa", "La libertà di stampa", "Il diritto di voto", "La tutela del paesaggio"], "L'Italia rifiuta la guerra come mezzo per risolvere le controversie internazionali."),
      q("Chi esercita il potere legislativo in Italia?", ["Il Parlamento", "Il Governo", "La Magistratura", "Il Presidente della Repubblica"], "Il Parlamento, formato da Camera e Senato, approva le leggi."),
      q("Chi esercita il potere esecutivo?", ["Il Governo", "Il Parlamento", "La Corte costituzionale", "I sindaci"], "Il Governo applica le leggi e guida la politica del Paese."),
      q("Quanto dura il mandato del Presidente della Repubblica?", ["7 anni", "5 anni", "4 anni", "10 anni"], "Il Presidente è eletto dal Parlamento in seduta comune e resta in carica 7 anni."),
      q("Quando si è votato il referendum tra monarchia e repubblica?", ["2 giugno 1946", "25 aprile 1945", "1° gennaio 1948", "4 novembre 1918"], "Il 2 giugno si festeggia la Festa della Repubblica."),
      q("A quale età si può votare in Italia?", ["18 anni", "16 anni", "21 anni", "25 anni"], "Dal 2021 a 18 anni si vota anche per il Senato."),
      q("Che cos'è l'Agenda 2030?", ["Un programma dell'ONU con 17 obiettivi di sviluppo sostenibile", "Una legge italiana sul lavoro", "Un trattato dell'Unione europea sull'euro", "Il calendario delle elezioni"], "È stata approvata dall'ONU nel 2015."),
      q("Quale organo giudica se una legge rispetta la Costituzione?", ["La Corte costituzionale", "La Corte di cassazione", "Il Senato", "Il Consiglio dei ministri"], "La Corte costituzionale può annullare le leggi contrarie alla Costituzione."),
      q("Che cosa tutela l'articolo 21 della Costituzione?", ["La libertà di manifestare il proprio pensiero", "Il diritto alla salute", "La proprietà privata", "Il diritto allo studio"], "Tutti possono esprimere il proprio pensiero con la parola, lo scritto e ogni altro mezzo."),
      q("Quale articolo tutela la salute come diritto fondamentale?", ["Articolo 32", "Articolo 9", "Articolo 34", "Articolo 48"], "L'articolo 32 tutela la salute come diritto dell'individuo e interesse della collettività."),
      q("«La scuola è aperta a tutti» è scritto nell'articolo…", ["34", "3", "12", "21"], "L'articolo 34 garantisce anche l'istruzione obbligatoria e gratuita."),
      q("Quante sono le Regioni italiane?", ["20", "21", "18", "25"], "Sono 20, di cui 5 a statuto speciale."),
      q("Da quanti articoli è composta la Costituzione?", ["139", "100", "54", "210"], "139 articoli, più le disposizioni transitorie e finali."),
      q("Chi nomina il Presidente del Consiglio dei ministri?", ["Il Presidente della Repubblica", "Il Parlamento", "I cittadini con il voto", "Il Senato"], "Lo nomina il Presidente della Repubblica; poi il Governo deve avere la fiducia del Parlamento."),
      q("Che cos'è il cyberbullismo?", ["Molestie e offese ripetute attraverso la rete", "Un virus informatico", "Un gioco online", "Una truffa bancaria"], "In Italia è regolato dalla legge 71 del 2017."),
      q("Quale istituzione dell'Unione europea è eletta direttamente dai cittadini?", ["Il Parlamento europeo", "La Commissione europea", "La Banca centrale europea", "Il Consiglio europeo"], "I cittadini lo eleggono ogni 5 anni."),
      q("Che cosa significa «separazione dei poteri»?", ["Legislativo, esecutivo e giudiziario sono affidati a organi diversi", "Stato e Chiesa sono separati", "Le Regioni sono indipendenti", "Camera e Senato votano separatamente"], "Il principio serve a evitare che tutto il potere sia nelle mani di uno solo."),
      q("L'articolo 9 della Costituzione tutela…", ["Il paesaggio, il patrimonio artistico, l'ambiente", "La libertà personale", "Il diritto di sciopero", "La famiglia"], "Dal 2022 l'articolo 9 cita anche ambiente, biodiversità ed ecosistemi."),
      q("Che cos'è un referendum abrogativo?", ["Un voto per cancellare una legge", "Un voto per eleggere il Parlamento", "Un voto per scegliere il sindaco", "Una proposta di legge del Governo"], "Lo prevede l'articolo 75: servono 500.000 firme o 5 Consigli regionali."),
      q("I colori della bandiera italiana, nell'ordine dall'asta, sono…", ["Verde, bianco, rosso", "Rosso, bianco, verde", "Bianco, rosso, verde", "Verde, rosso, bianco"], "Lo stabilisce l'articolo 12 della Costituzione."),
      q("Che cosa si intende per «identità digitale»?", ["L'insieme dei dati che ci identificano online", "Il numero di telefono", "La password del Wi-Fi", "Un profilo falso"], "In Italia lo SPID e la CIE permettono di accedere ai servizi pubblici online.")
    ]
  };
  if (typeof QBANK !== "undefined") Object.keys(BANK).forEach(k => { QBANK[k] = QBANK[k] || {}; QBANK[k].S = BANK[k]; });

  // ---------------------------------------------------------------- COPPIE (Collega, Memory, Incastro…)
  const T = (prompt, pairs, extra) => Object.assign({ prompt, pairs, cl: Y1 }, extra || {});
  const pairs = {
    italiano: [
      T("Collega ogni figura retorica al suo esempio.", [["Metafora", "Sei un leone"], ["Similitudine", "Forte come un leone"], ["Ossimoro", "Silenzio assordante"], ["Iperbole", "Te l'ho detto mille volte"], ["Anafora", "Per me si va… per me si va…"], ["Onomatopea", "Tic tac"]]),
      T("Collega ogni poema al suo protagonista.", [["Iliade", "Achille"], ["Odissea", "Ulisse"], ["Eneide", "Enea"], ["Epopea di Gilgamesh", "Gilgamesh"]]),
      T("Collega ogni termine alla sua definizione.", [["Fabula", "ordine cronologico"], ["Intreccio", "ordine del racconto"], ["Analessi", "salto indietro"], ["Prolessi", "anticipazione"], ["Ellissi", "tempo saltato"]]),
      T("Collega ogni subordinata al suo esempio.", [["Finale", "per vincere"], ["Causale", "perché pioveva"], ["Temporale", "quando arrivi"], ["Concessiva", "sebbene fosse tardi"], ["Relativa", "che ho letto"]])
    ],
    inglese: [
      T("Collega ogni verbo al suo past simple.", [["go", "went"], ["see", "saw"], ["take", "took"], ["buy", "bought"], ["think", "thought"], ["write", "wrote"], ["come", "came"], ["give", "gave"]], { rEn: true }),
      T("Collega ogni aggettivo al suo contrario.", [["cheap", "expensive"], ["early", "late"], ["easy", "difficult"], ["safe", "dangerous"], ["quiet", "noisy"], ["full", "empty"]], { rEn: true }),
      T("Collega ogni parola alla sua traduzione.", [["weather", "tempo atmosferico"], ["journey", "viaggio"], ["advice", "consiglio"], ["luggage", "bagagli"], ["neighbour", "vicino di casa"], ["job", "lavoro"]]),
      T("Collega ogni aggettivo al suo comparativo.", [["good", "better"], ["bad", "worse"], ["far", "further"], ["big", "bigger"], ["happy", "happier"]], { rEn: true })
    ],
    storia: [
      T("Collega ogni civiltà al suo territorio.", [["Sumeri", "Mesopotamia"], ["Egizi", "valle del Nilo"], ["Fenici", "coste del Libano"], ["Micenei", "Grecia continentale"], ["Etruschi", "Italia centrale"], ["Minoici", "Creta"]]),
      T("Collega ogni personaggio alla sua impresa.", [["Pericle", "età d'oro di Atene"], ["Alessandro Magno", "conquista della Persia"], ["Annibale", "passaggio delle Alpi"], ["Scipione", "vittoria a Zama"], ["Hammurabi", "codice di leggi"], ["Clistene", "riforma democratica"]]),
      T("Collega ogni data al suo avvenimento.", [["753 a.C.", "fondazione di Roma"], ["509 a.C.", "nascita della repubblica"], ["490 a.C.", "battaglia di Maratona"], ["323 a.C.", "morte di Alessandro"], ["146 a.C.", "distruzione di Cartagine"], ["44 a.C.", "morte di Cesare"]]),
      T("Collega ogni termine al suo significato.", [["Polis", "città-stato"], ["Agorà", "piazza"], ["Acropoli", "città alta"], ["Oligarchia", "governo di pochi"], ["Democrazia", "governo del popolo"], ["Tirannide", "governo di uno solo"]])
    ],
    scienze: [
      T("Collega ogni passaggio di stato al suo nome.", [["solido → liquido", "fusione"], ["liquido → gas", "evaporazione"], ["gas → liquido", "condensazione"], ["liquido → solido", "solidificazione"], ["solido → gas", "sublimazione"]]),
      T("Collega ogni elemento al suo simbolo.", [["Idrogeno", "H"], ["Ossigeno", "O"], ["Carbonio", "C"], ["Sodio", "Na"], ["Ferro", "Fe"], ["Azoto", "N"], ["Oro", "Au"]]),
      T("Collega ogni roccia al suo tipo.", [["Granito", "magmatica intrusiva"], ["Basalto", "magmatica effusiva"], ["Calcare", "sedimentaria"], ["Marmo", "metamorfica"]]),
      T("Collega ogni grandezza alla sua unità di misura.", [["Massa", "chilogrammo"], ["Lunghezza", "metro"], ["Tempo", "secondo"], ["Temperatura", "kelvin"], ["Forza", "newton"], ["Volume", "metro cubo"]])
    ],
    civica: [
      T("Collega ogni articolo della Carta al suo tema.", [["Art. 1", "Repubblica fondata sul lavoro"], ["Art. 3", "uguaglianza"], ["Art. 9", "paesaggio e ambiente"], ["Art. 11", "ripudio della guerra"], ["Art. 21", "libertà di pensiero"], ["Art. 32", "salute"], ["Art. 34", "scuola"]]),
      T("Collega ogni organo alla sua funzione.", [["Parlamento", "fa le leggi"], ["Governo", "applica le leggi"], ["Magistratura", "giudica"], ["Corte costituzionale", "controlla le leggi"], ["Presidente della Repubblica", "rappresenta l'unità nazionale"]]),
      T("Collega ogni data alla sua ricorrenza.", [["25 aprile", "Liberazione"], ["2 giugno", "Festa della Repubblica"], ["27 gennaio", "Giorno della Memoria"], ["1° maggio", "Festa del lavoro"], ["4 novembre", "Unità nazionale e Forze armate"]]),
      T("Collega ogni istituzione alla sua sede.", [["Parlamento europeo", "Strasburgo"], ["Commissione europea", "Bruxelles"], ["ONU", "New York"], ["Presidente della Repubblica", "Quirinale"], ["Camera dei deputati", "Montecitorio"], ["Senato", "Palazzo Madama"]])
    ]
  };

  // ---------------------------------------------------------------- SEQUENZE (Metti in fila)
  const SQ = (p, items) => ({ p, items, cl: Y1 });
  const seqs = {
    storia: [
      SQ("Metti in ordine di tempo, dal più antico.", ["Invenzione della scrittura", "Codice di Hammurabi", "Fondazione di Roma", "Battaglia di Maratona", "Morte di Alessandro Magno", "Morte di Cesare"]),
      SQ("Metti in ordine di tempo, dal più antico.", ["Paleolitico", "Neolitico", "Età del bronzo", "Età del ferro"]),
      SQ("Metti in ordine di tempo la storia di Roma.", ["Monarchia", "Nascita della repubblica", "Guerre puniche", "Riforme dei Gracchi", "Dittatura di Cesare"]),
      SQ("Metti in ordine di tempo la storia greca.", ["Civiltà micenea", "Nascita delle polis", "Guerre persiane", "Guerra del Peloponneso", "Impero di Alessandro"])
    ],
    scienze: [
      SQ("Metti in fila i pianeti, dal più vicino al Sole.", ["Mercurio", "Venere", "Terra", "Marte", "Giove", "Saturno", "Urano", "Nettuno"]),
      SQ("Metti in fila gli strati dell'atmosfera, dal suolo verso l'alto.", ["Troposfera", "Stratosfera", "Mesosfera", "Termosfera", "Esosfera"]),
      SQ("Metti in fila dal più piccolo al più grande.", ["Atomo", "Molecola", "Cellula", "Organismo", "Pianeta"]),
      SQ("Metti in fila gli strati della Terra, dalla superficie al centro.", ["Crosta", "Mantello", "Nucleo esterno", "Nucleo interno"])
    ],
    civica: [
      SQ("Metti in ordine di tempo.", ["Unità d'Italia", "Liberazione", "Referendum monarchia-repubblica", "Costituzione in vigore", "Trattati di Roma (CEE)"]),
      SQ("Metti in fila i passaggi di una legge.", ["Proposta di legge", "Approvazione di Camera e Senato", "Promulgazione del Presidente", "Pubblicazione in Gazzetta Ufficiale", "Entrata in vigore"]),
      SQ("Metti in fila dal più piccolo al più grande.", ["Comune", "Provincia", "Regione", "Stato", "Unione europea"])
    ],
    italiano: [
      SQ("Metti in ordine di tempo, dal più antico.", ["Epopea di Gilgamesh", "Iliade", "Eneide", "Divina Commedia", "I promessi sposi"]),
      SQ("Metti in fila le parti di un racconto.", ["Situazione iniziale", "Rottura dell'equilibrio", "Peripezie", "Spannung (momento di massima tensione)", "Scioglimento"]),
      SQ("Metti in fila dal più piccolo al più grande.", ["Fonema", "Sillaba", "Parola", "Frase", "Periodo"])
    ],
    inglese: [
      SQ("Metti in fila dal meno frequente al più frequente.", ["never", "rarely", "sometimes", "often", "always"]),
      SQ("Metti in fila i mesi in ordine.", ["February", "April", "June", "August", "October", "December"]),
      SQ("Metti in fila dal più piccolo al più grande.", ["a second", "a minute", "an hour", "a day", "a week", "a month"])
    ]
  };
  seqs.inglese.eng = true;

  // ---------------------------------------------------------------- TROVA L'ERRORE
  // righe: una sola è sbagliata. kind "passi" = passaggi di un esercizio; "frasi" = affermazioni; "parole" = le parole di una frase
  const ER = (p, rows, wrong, fix, e, extra) => Object.assign({ p, rows, wrong, fix, e, cl: Y1 }, extra || {});
  const errors = {
    italiano: [
      ER("Una sola frase ha un errore di grammatica: quale?", ["Se avessi studiato, avrei superato l'esame.", "Penso che lui abbia ragione.", "Se sarei ricco, comprerei una barca.", "Qual è il tuo libro preferito?"], 2, "Se fossi ricco, comprerei una barca.", "Dopo «se» nel periodo ipotetico ci vuole il congiuntivo, non il condizionale."),
      ER("Una sola frase ha un errore di ortografia: quale?", ["Un po' di pazienza non guasta.", "Qual'è la risposta giusta?", "Non so se ce n'è ancora.", "Dà sempre una mano a tutti."], 1, "Qual è la risposta giusta?", "«Qual è» si scrive senza apostrofo: è un troncamento, non un'elisione."),
      ER("Una sola affermazione sull'epica è falsa: quale?", ["L'Iliade racconta un periodo della guerra di Troia.", "L'Odissea racconta il ritorno di Ulisse a Itaca.", "L'Eneide fu scritta da Omero.", "Il proemio contiene l'invocazione alla Musa."], 2, "L'Eneide fu scritta da Virgilio.", "Omero è l'autore a cui la tradizione attribuisce Iliade e Odissea."),
      ER("Una sola frase usa male il congiuntivo: quale?", ["Credo che Marco sia già partito.", "Spero che tu stai bene.", "Benché piova, usciamo.", "Voglio che tu venga con noi."], 1, "Spero che tu stia bene.", "Dopo «spero che» ci vuole il congiuntivo: stia."),
      ER("Una sola definizione è sbagliata: quale?", ["Metafora: paragone senza «come».", "Iperbole: esagerazione.", "Ossimoro: ripetizione di una parola a inizio verso.", "Onomatopea: parola che imita un suono."], 2, "Ossimoro: accostamento di due parole opposte.", "La ripetizione a inizio verso è l'anafora."),
      ER("Una sola frase ha un errore: quale?", ["Gli ho detto di aspettare.", "A me mi piace il mare.", "Non ne voglio più.", "Ci vediamo domani."], 1, "A me piace il mare.", "«A me mi» ripete due volte lo stesso pronome.")
    ],
    inglese: [
      ER("Una sola frase ha un errore: quale?", ["She doesn't like coffee.", "He don't play tennis.", "They are watching TV.", "I went to London last year."], 1, "He doesn't play tennis.", "Alla terza persona singolare si usa «doesn't».", { en: true }),
      ER("Una sola frase ha un errore: quale?", ["I have seen that film yesterday.", "I saw that film yesterday.", "I have never been to Paris.", "She has just arrived."], 0, "I saw that film yesterday.", "Con un tempo finito e preciso (yesterday) si usa il past simple.", { en: true }),
      ER("Una sola frase ha un errore: quale?", ["There are many people here.", "How much books have you got?", "I haven't got any money.", "Would you like some tea?"], 1, "How many books have you got?", "«Books» è numerabile: how many.", { en: true }),
      ER("Una sola frase ha un errore: quale?", ["She is taller than me.", "This is the best pizza in town.", "He is more old than his sister.", "It's the most expensive car."], 2, "He is older than his sister.", "Gli aggettivi brevi fanno il comparativo con -er.", { en: true }),
      ER("Una sola frase ha un errore: quale?", ["I'm going to study tonight.", "If it rains, I will stay home.", "She can to swim very well.", "You must be quiet."], 2, "She can swim very well.", "Dopo i modali (can, must, will) il verbo è senza «to».", { en: true }),
      ER("Una sola frase ha un errore: quale?", ["The childrens are playing.", "The women are talking.", "My feet are cold.", "Those men are tall."], 0, "The children are playing.", "«Children» è già plurale.", { en: true })
    ],
    storia: [
      ER("Una sola affermazione è falsa: quale?", ["La democrazia nacque ad Atene.", "Sparta era governata da due re.", "Le guerre puniche furono combattute contro i Persiani.", "Alessandro Magno era re di Macedonia."], 2, "Le guerre puniche furono combattute contro Cartagine.", "Contro i Persiani combatterono i Greci (guerre persiane)."),
      ER("Una sola affermazione è falsa: quale?", ["I Sumeri usavano la scrittura cuneiforme.", "I Fenici diffusero l'alfabeto.", "Gli Egizi vivevano lungo il Nilo.", "Il Codice di Hammurabi fu scritto in Egitto."], 3, "Il Codice di Hammurabi fu scritto a Babilonia.", "Hammurabi era re di Babilonia, in Mesopotamia."),
      ER("Una sola data è sbagliata: quale?", ["Fondazione di Roma: 753 a.C.", "Nascita della repubblica: 509 a.C.", "Battaglia di Maratona: 490 a.C.", "Morte di Cesare: 144 a.C."], 3, "Morte di Cesare: 44 a.C.", "Cesare fu ucciso alle Idi di marzo del 44 a.C."),
      ER("Una sola affermazione è falsa: quale?", ["I tribuni della plebe avevano il diritto di veto.", "I consoli erano due e duravano in carica un anno.", "I patrizi erano gli schiavi di Roma.", "Il Senato era formato dagli ex magistrati."], 2, "I patrizi erano i nobili di Roma.", "I patrizi discendevano dalle famiglie più antiche e potenti."),
      ER("Una sola affermazione è falsa: quale?", ["Nel Neolitico nasce l'agricoltura.", "Nel Paleolitico l'uomo era nomade.", "La scrittura nasce nel Paleolitico.", "L'età dei metalli viene dopo il Neolitico."], 2, "La scrittura nasce verso il 3200 a.C., alla fine della Preistoria.", "Con la scrittura finisce la Preistoria e inizia la Storia.")
    ],
    scienze: [
      ER("Una sola affermazione è falsa: quale?", ["L'azoto è il gas più abbondante dell'atmosfera.", "Il Sole è una stella.", "La Luna brilla di luce propria.", "La Terra ruota su se stessa in circa 24 ore."], 2, "La Luna riflette la luce del Sole.", "La Luna non emette luce: la vediamo perché riflette quella solare."),
      ER("Una sola affermazione è falsa: quale?", ["Gli elettroni hanno carica negativa.", "I neutroni hanno carica positiva.", "I protoni stanno nel nucleo.", "Il numero atomico è il numero di protoni."], 1, "I neutroni non hanno carica.", "I neutroni sono neutri; positivi sono i protoni."),
      ER("Una sola affermazione è falsa: quale?", ["Il granito è una roccia magmatica.", "Il marmo è una roccia metamorfica.", "Il calcare è una roccia sedimentaria.", "Il basalto è una roccia sedimentaria."], 3, "Il basalto è una roccia magmatica effusiva.", "Il basalto nasce dalla lava che si raffredda in superficie."),
      ER("Una sola affermazione è falsa: quale?", ["La fusione è il passaggio da solido a liquido.", "L'acqua bolle a 100 °C al livello del mare.", "La condensazione è il passaggio da liquido a solido.", "Il ghiaccio fonde a 0 °C."], 2, "La condensazione è il passaggio da gas a liquido.", "Da liquido a solido si parla di solidificazione."),
      ER("Una sola affermazione è falsa: quale?", ["Le stagioni dipendono dall'inclinazione dell'asse terrestre.", "D'estate la Terra è molto più vicina al Sole.", "La rivoluzione terrestre dura circa 365 giorni.", "Giove è il pianeta più grande del sistema solare."], 1, "Nel nostro emisfero d'estate la Terra è anzi un po' più lontana dal Sole.", "Le stagioni dipendono dall'inclinazione dell'asse, non dalla distanza.")
    ],
    civica: [
      ER("Una sola affermazione è falsa: quale?", ["Il Parlamento fa le leggi.", "Il Governo giudica i reati.", "La Magistratura è indipendente.", "Il Presidente della Repubblica resta in carica 7 anni."], 1, "I reati li giudica la Magistratura.", "Il Governo ha il potere esecutivo, non quello giudiziario."),
      ER("Una sola affermazione è falsa: quale?", ["La Costituzione è in vigore dal 1948.", "La Costituzione ha 139 articoli.", "La sovranità appartiene al Governo.", "L'Italia è una Repubblica democratica."], 2, "La sovranità appartiene al popolo.", "Lo dice l'articolo 1 della Costituzione."),
      ER("Una sola affermazione è falsa: quale?", ["Il 2 giugno è la Festa della Repubblica.", "Il 25 aprile è la Festa della Liberazione.", "Il referendum del 1946 scelse la monarchia.", "Nel 1946 votarono per la prima volta anche le donne in un voto nazionale."], 2, "Il referendum del 1946 scelse la repubblica.", "Il 2 giugno 1946 gli italiani scelsero la repubblica."),
      ER("Una sola affermazione è falsa: quale?", ["L'Agenda 2030 ha 17 obiettivi.", "L'Agenda 2030 è un programma dell'ONU.", "L'Agenda 2030 riguarda solo i Paesi poveri.", "Tra gli obiettivi c'è la lotta al cambiamento climatico."], 2, "L'Agenda 2030 riguarda tutti i Paesi.", "Gli obiettivi di sviluppo sostenibile valgono per ogni Paese del mondo.")
    ]
  };
  // matematica: i passaggi di un'equazione, con uno sbagliato
  function mathError(yr) {
    if (MY.error[yr]) return MY.error[yr]();
    const x = rnd(2, 9), a = rnd(2, 6), b = rnd(2, 12), c = a * x + b;
    const good = [`${a}x + ${b} = ${c}`, `${a}x = ${c} − ${b}`, `${a}x = ${c - b}`, `x = ${c - b} : ${a}`, `x = ${x}`];
    const t = rnd(0, 2);
    const rows = good.slice();
    let wrong, fix, e;
    if (t === 0) { wrong = 1; rows[1] = `${a}x = ${c} + ${b}`; rows[2] = `${a}x = ${c + b}`; rows[3] = `x = ${c + b} : ${a}`; rows[4] = `x = ${Number.isInteger((c + b) / a) ? (c + b) / a : `${c + b}/${a}`}`; fix = good[1]; e = `Portando ${b} dall'altra parte il segno cambia: diventa − ${b}.`; }
    else if (t === 1) { wrong = 2; rows[2] = `${a}x = ${c - b + 2}`; rows[3] = `x = ${c - b + 2} : ${a}`; rows[4] = `x = ${Number.isInteger((c - b + 2) / a) ? (c - b + 2) / a : `${c - b + 2}/${a}`}`; fix = good[2]; e = `${c} − ${b} fa ${c - b}, non ${c - b + 2}.`; }
    else { wrong = 3; rows[3] = `x = ${c - b} · ${a}`; rows[4] = `x = ${(c - b) * a}`; fix = good[3]; e = `Per liberare la x si divide per ${a}, non si moltiplica.`; }
    return { p: "In quale passaggio c'è il primo errore?", rows, wrong, fix, e, steps: true };
  }

  // ---------------------------------------------------------------- STIMA (cursore)
  const ST = (qq, min, max, ans, tol, unit, e, step) => ({ q: qq, min, max, ans, tol, unit: unit || "", e, step: step || 1, cl: Y1 });
  const stima = {
    storia: [
      ST("In che anno, secondo la tradizione, fu fondata Roma? (a.C.)", 300, 1200, 753, 40, "a.C.", "Roma fu fondata nel 753 a.C."),
      ST("In che anno nacque la repubblica romana? (a.C.)", 200, 800, 509, 30, "a.C.", "La repubblica nacque nel 509 a.C."),
      ST("In che anno si combatté la battaglia di Maratona? (a.C.)", 200, 800, 490, 30, "a.C.", "Maratona: 490 a.C."),
      ST("In che anno morì Alessandro Magno? (a.C.)", 100, 600, 323, 25, "a.C.", "Alessandro morì a Babilonia nel 323 a.C."),
      ST("In che anno fu ucciso Giulio Cesare? (a.C.)", 0, 300, 44, 15, "a.C.", "Idi di marzo del 44 a.C."),
      ST("In che anno fu distrutta Cartagine? (a.C.)", 0, 400, 146, 20, "a.C.", "Cartagine fu distrutta nel 146 a.C., alla fine della terza guerra punica.")
    ],
    scienze: [
      ST("Quanta parte dell'atmosfera è ossigeno? (in percentuale)", 0, 100, 21, 4, "%", "L'ossigeno è circa il 21% dell'aria."),
      ST("Quanta parte dell'atmosfera è azoto? (in percentuale)", 0, 100, 78, 5, "%", "L'azoto è circa il 78% dell'aria."),
      ST("Quanta parte della superficie terrestre è coperta dall'acqua? (in percentuale)", 0, 100, 71, 5, "%", "Circa il 71% della superficie è coperto da oceani e mari."),
      ST("Di quanti gradi è inclinato l'asse terrestre?", 0, 90, 23, 4, "°", "L'asse è inclinato di circa 23,5°."),
      ST("Quanti minuti impiega la luce del Sole ad arrivare sulla Terra?", 0, 60, 8, 2, "min", "Circa 8 minuti e 20 secondi."),
      ST("Quanti sono gli elementi della tavola periodica?", 50, 200, 118, 8, "", "Oggi gli elementi conosciuti sono 118.")
    ],
    civica: [
      ST("In che anno è entrata in vigore la Costituzione?", 1900, 2000, 1948, 3, "", "1° gennaio 1948."),
      ST("Quanti articoli ha la Costituzione italiana?", 50, 250, 139, 8, "", "Gli articoli sono 139."),
      ST("Quanti sono oggi i deputati della Camera?", 100, 1000, 400, 30, "", "Dal 2022 i deputati sono 400.", 10),
      ST("Quanti sono oggi i senatori eletti?", 50, 500, 200, 20, "", "Dal 2022 i senatori eletti sono 200.", 10),
      ST("Quanti obiettivi ha l'Agenda 2030?", 5, 40, 17, 1, "", "Gli obiettivi di sviluppo sostenibile sono 17."),
      ST("Quanti Stati fanno parte dell'Unione europea?", 10, 50, 27, 1, "", "Dopo l'uscita del Regno Unito gli Stati membri sono 27.")
    ]
  };
  function mathStima(yr) {
    if (MY.stima[yr]) return MY.stima[yr]();
    const t = rnd(0, 2);
    if (t === 0) { const n = pick([2, 3, 5, 7, 10, 20, 50, 90, 150, 200]), v = Math.round(Math.sqrt(n) * 10) / 10; return { q: `Stima la radice quadrata di ${n}.`, min: 0, max: 20, ans: v, tol: 0.5, unit: "", step: 0.1, e: `√${n} ≈ ${String(v).replace(".", ",")}.` }; }
    if (t === 1) { const a = pick([19, 21, 29, 31, 39, 49, 51]), b = pick([19, 21, 29, 31, 41]), v = a * b; return { q: `Senza fare il conto preciso, stima ${a} · ${b}.`, min: 0, max: 3000, ans: v, tol: Math.round(v * 0.08), unit: "", step: 10, e: `${a} · ${b} = ${v}. Arrotondando: ${Math.round(a / 10) * 10} · ${Math.round(b / 10) * 10} = ${Math.round(a / 10) * Math.round(b / 10) * 100}.` }; }
    const p = pick([12, 18, 22, 35, 48, 65]), base = pick([250, 400, 600, 800]), v = base * p / 100;
    return { q: `Stima il ${p}% di ${base}.`, min: 0, max: base, ans: v, tol: Math.round(base * 0.04), unit: "", step: 5, e: `${base} · ${p} : 100 = ${v}.` };
  }

  // ---------------------------------------------------------------- COMPLETA (frase con il buco)
  const CL = (s, opts, e, extra) => Object.assign({ s, opts, c: 0, e, cl: Y1 }, extra || {});
  const cloze = {
    italiano: [
      CL("Se ___ più tempo, leggerei di più.", ["avessi", "avrei", "ho", "avrò"], "Periodo ipotetico della possibilità: se + congiuntivo imperfetto."),
      CL("Credo che Luca ___ già arrivato.", ["sia", "è", "sarebbe", "fosse stato"], "«Credo che» regge il congiuntivo presente (qui passato: sia arrivato)."),
      CL("Benché ___ stanco, continuò a lavorare.", ["fosse", "era", "sarebbe", "è"], "«Benché» vuole il congiuntivo."),
      CL("È il libro ___ ti ho parlato.", ["di cui", "che", "a cui", "per cui"], "Si parla «di» qualcosa: di cui."),
      CL("Non so ___ venire o restare a casa.", ["se", "che", "perché", "quando"], "Introduce un'interrogativa indiretta dubitativa: se."),
      CL("Ulisse, ___ astuto, ingannò Polifemo.", ["essendo", "essere", "stato", "è"], "Il gerundio esprime qui la causa: poiché era astuto."),
      CL("Il narratore ___ conosce i pensieri di tutti i personaggi.", ["onnisciente", "interno", "esterno", "protagonista"], "Il narratore onnisciente sa tutto."),
      CL("L'___ è l'ordine in cui l'autore sceglie di raccontare i fatti.", ["intreccio", "epiteto", "proemio", "antefatto"], "La fabula è l'ordine cronologico, l'intreccio quello del racconto."),
      CL("Vorrei che tu ___ con me.", ["venissi", "vieni", "verrai", "venga"], "Condizionale nella principale + congiuntivo imperfetto: vorrei che tu venissi."),
      CL("Mi chiese che cosa ___ il giorno prima.", ["avessi fatto", "ho fatto", "farei", "faccia"], "Interrogativa indiretta al passato: congiuntivo trapassato.")
    ],
    inglese: [
      CL("I ___ my homework every afternoon.", ["do", "make", "does", "am do"], "Si dice «do homework». Prima persona: do.", { en: true }),
      CL("She ___ a book at the moment.", ["is reading", "reads", "read", "has read"], "«At the moment» vuole il present continuous.", { en: true }),
      CL("We ___ to the cinema last night.", ["went", "go", "have gone", "were go"], "«Last night» vuole il past simple: went.", { en: true }),
      CL("There aren't ___ apples left.", ["any", "some", "much", "a"], "Frase negativa con nome numerabile plurale: any.", { en: true }),
      CL("He is ___ than his brother.", ["taller", "more tall", "tallest", "tall"], "Comparativo di un aggettivo breve: taller.", { en: true }),
      CL("You ___ smoke here. It's forbidden.", ["mustn't", "don't have to", "needn't", "wouldn't"], "«Mustn't» indica divieto.", { en: true }),
      CL("I've known her ___ ten years.", ["for", "since", "from", "during"], "Durata: for.", { en: true }),
      CL("___ you ever been to Scotland?", ["Have", "Did", "Do", "Are"], "Present perfect: Have you ever been…?", { en: true }),
      CL("If I ___ you, I would apologise.", ["were", "am", "would be", "be"], "Second conditional: If I were you.", { en: true }),
      CL("This is the girl ___ brother is a singer.", ["whose", "who", "which", "that"], "«Whose» indica possesso.", { en: true }),
      CL("I enjoy ___ to music.", ["listening", "to listen", "listen", "listened"], "Dopo «enjoy» il verbo va in -ing.", { en: true }),
      CL("What time ___ the train leave?", ["does", "do", "is", "has"], "Terza persona singolare: does.", { en: true })
    ]
  };

  // come si trasforma «Collega ogni … al suo …» in una domanda sola (Lettere mescolate, Salva l'omino, Pioggia di lettere)
  const askRules = [
    [/poema al suo protagonista/, "Chi è il protagonista di ", "?"],
    [/figura retorica al suo esempio/, "Qual è un esempio di ", "?"],
    [/verbo al suo past simple/, "Qual è il past simple di ", "?"],
    [/aggettivo al suo contrario/, "Qual è il contrario di ", "?"],
    [/aggettivo al suo comparativo/, "Qual è il comparativo di ", "?"],
    [/parola alla sua traduzione/, "Come si traduce ", " in italiano?"],
    [/civiltà al suo territorio/, "Dove viveva questo popolo: ", "?"],
    [/personaggio alla sua impresa/, "Per che cosa è ricordato ", "?"],
    [/data al suo avvenimento/, "Che cosa accadde nel ", "?"],
    [/termine al suo significato/, "Che cosa significa ", "?"],
    [/termine alla sua definizione/, "Che cosa indica ", "?"],
    [/passaggio di stato al suo nome/, "Come si chiama il passaggio ", "?"],
    [/elemento al suo simbolo/, "Qual è il simbolo chimico di ", "?"],
    [/roccia al suo tipo/, "Che tipo di roccia è ", "?"],
    [/grandezza alla sua unità/, "Con quale unità si misura questa grandezza: ", "?"],
    [/articolo della Carta/, "Di che cosa parla l'", " della Costituzione?"],
    [/organo alla sua funzione/, "Che cosa fa questo organo dello Stato: ", "?"],
    [/data alla sua ricorrenza/, "Che cosa si ricorda il ", "?"],
    [/istituzione alla sua sede/, "Dove ha sede ", "?"],
    [/subordinata al suo esempio/, "Qual è un esempio di subordinata ", "?"]
  ];
  // ================================================================ 2ª SUPERIORE (classe 9)
  const Y2 = [9, 9];
  const q2 = (qq, a, e, extra) => Object.assign({ q: qq, a, c: 0, e, cl: Y2 }, extra || {});
  const T2 = (prompt, ps, extra) => Object.assign({ prompt, pairs: ps, cl: Y2 }, extra || {});
  const SQ2 = (p, items) => ({ p, items, cl: Y2 });
  const ER2 = (p, rows, wrong, fix, e, extra) => Object.assign({ p, rows, wrong, fix, e, cl: Y2 }, extra || {});
  const ST2 = (qq, min, max, ans, tol, unit, e, step) => ({ q: qq, min, max, ans, tol, unit: unit || "", e, step: step || 1, cl: Y2 });
  const CL2 = (s, opts, e, extra) => Object.assign({ s, opts, c: 0, e, cl: Y2 }, extra || {});
  const gcd2 = (x, y) => (y ? gcd2(y, x % y) : x);

  // ---------------------------------------------------------------- MATEMATICA (generata, 2ª superiore)
  const TERNE = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10], [9, 12, 15], [7, 24, 25], [12, 16, 20], [20, 21, 29]];
  const ROOTS = [-7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7];
  const fmtRoots = (u, v) => { const lo = Math.min(u, v), hi = Math.max(u, v); return `x = ${sgn(lo)} e x = ${sgn(hi)}`; };
  function math9() {
    const t = rnd(0, 10);
    if (t === 0) {   // sistema lineare
      const x = rnd(1, 9), y = rnd(1, 9), s = x + y, d = x - y, askX = Math.random() < 0.5, v = askX ? x : y;
      return mk(`Risolvi il sistema: x + y = ${s} e x − y = ${sgn(d)}. Quanto vale ${askX ? "x" : "y"}?`, v, [askX ? y : x, v + 1, v - 1, s],
        `Sommando le due equazioni: 2x = ${s + d}, quindi x = ${x}. Poi y = ${s} − ${x} = ${y}.`);
    }
    if (t === 1) {   // equazione con frazioni numeriche
      const a = pick([2, 3, 4]), b = pick([3, 5, 6]);
      if (a === b) return null;
      const L = (a * b) / gcd2(a, b), x = L * rnd(1, 4), c = x / a + x / b;
      return mk(`Risolvi: x/${a} + x/${b} = ${c}. Quanto vale x?`, x, [c * a, c * b, x + a, x - 1],
        `Denominatore comune ${L}: ${L / a}x + ${L / b}x = ${L * c}, cioè ${L / a + L / b}x = ${L * c}, quindi x = ${x}.`);
    }
    if (t === 2) {   // disequazione di primo grado
      const k = pick([-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7]), a0 = rnd(2, 6), neg = Math.random() < 0.5, a = neg ? -a0 : a0, b = rnd(1, 12), c = a * k + b;
      const lhs = `${neg ? "−" : ""}${a0}x + ${b}`;
      return mk(`Risolvi la disequazione: ${lhs} > ${sgn(c)}`, neg ? `x < ${sgn(k)}` : `x > ${sgn(k)}`, [neg ? `x > ${sgn(k)}` : `x < ${sgn(k)}`, `x > ${sgn(-k)}`, `x < ${sgn(-k)}`],
        neg ? `Si porta ${b} a destra: −${a0}x > ${sgn(c - b)}. Dividendo per −${a0}, che è negativo, il verso si inverte: x < ${sgn(k)}.`
            : `Si porta ${b} a destra: ${a0}x > ${sgn(c - b)}, quindi x > ${sgn(k)}.`);
    }
    if (t === 3) {   // semplificare un radicale
      const a = rnd(2, 7), b = pick([2, 3, 5, 6, 7]), n = a * a * b;
      return mk(`Semplifica: √${n}`, `${a}√${b}`, [`${b}√${a}`, `${a + 1}√${b}`, `${a}√${b + 1}`, `${a * b}√${b}`], `${n} = ${a * a} · ${b}, quindi √${n} = ${a}√${b}.`);
    }
    if (t === 4) {   // prodotto di radicali
      const [a, b] = pick([[2, 8], [3, 12], [5, 20], [2, 18], [3, 27], [8, 18], [12, 27], [2, 50]]), k = Math.round(Math.sqrt(a * b));
      return mk(`Quanto fa √${a} · √${b}?`, k, [a + b, k + 1, k - 1, a * b], `Il prodotto di due radici è la radice del prodotto: √${a * b} = ${k}.`);
    }
    if (t === 5) {   // equazione di secondo grado
      let r1, r2;
      do { r1 = pick(ROOTS); r2 = pick(ROOTS); } while (Math.abs(r1) === Math.abs(r2));
      const B = -(r1 + r2), C = r1 * r2;
      const eq = `x² ${B < 0 ? "−" : "+"} ${Math.abs(B) === 1 ? "" : Math.abs(B)}x ${C < 0 ? "−" : "+"} ${Math.abs(C)} = 0`;
      return mk(`Quali sono le soluzioni di ${eq}?`, fmtRoots(r1, r2), [fmtRoots(-r1, -r2), fmtRoots(r1, -r2), fmtRoots(-r1, r2)],
        `Servono due numeri con somma ${sgn(r1 + r2)} e prodotto ${sgn(C)}: sono ${sgn(r1)} e ${sgn(r2)}.`);
    }
    if (t === 6) {   // retta nel piano cartesiano
      if (Math.random() < 0.5) {
        const m = pick([-4, -3, -2, -1, 1, 2, 3, 4]), x1 = rnd(-3, 3), dx = rnd(1, 4), y1 = rnd(-4, 5), x2 = x1 + dx, y2 = y1 + m * dx;
        return mk(`Qual è il coefficiente angolare della retta per A(${sgn(x1)}; ${sgn(y1)}) e B(${sgn(x2)}; ${sgn(y2)})?`, sgn(m), [sgn(-m), sgn(m + 1), sgn(m - 1), sgn(m * 2)],
          `m = Δy : Δx = ${sgn(m * dx)} : ${dx} = ${sgn(m)}.`);
      }
      const m = pick([-3, -2, 2, 3, 4]), q = pick([-5, -4, -3, -2, 2, 3, 4, 5]), x0 = rnd(2, 5), y = m * x0 + q;
      return mk(`Sulla retta y = ${sgn(m)}x ${q < 0 ? "−" : "+"} ${Math.abs(q)}, quanto vale y quando x = ${x0}?`, sgn(y), [sgn(m * x0 - q), sgn((m + q) * x0), sgn(m * x0), sgn(y + 1)],
        `Si sostituisce x: y = ${sgn(m)} · ${x0} ${q < 0 ? "−" : "+"} ${Math.abs(q)} = ${sgn(y)}.`);
    }
    if (t === 7) {   // Pitagora
      const [a, b, c] = pick(TERNE);
      if (Math.random() < 0.5) return mk(`Un triangolo rettangolo ha i cateti di ${a} cm e ${b} cm. Quanto misura l'ipotenusa?`, `${c} cm`, [`${a + b} cm`, `${c + 1} cm`, `${c - 1} cm`, `${c + 2} cm`], `c² = ${a}² + ${b}² = ${a * a + b * b}, quindi c = ${c} cm.`);
      return mk(`Un triangolo rettangolo ha l'ipotenusa di ${c} cm e un cateto di ${a} cm. Quanto misura l'altro cateto?`, `${b} cm`, [`${c - a} cm`, `${b + 1} cm`, `${b - 1} cm`, `${c + a} cm`], `b² = ${c}² − ${a}² = ${c * c - a * a}, quindi b = ${b} cm.`);
    }
    if (t === 8) {   // probabilità
      if (Math.random() < 0.5) {
        let r, b, tot;
        do { r = rnd(1, 8); b = rnd(1, 8); tot = r + b; } while (gcd2(r, tot) !== 1);
        return mk(`Un'urna contiene ${r} palline rosse e ${b} blu. Qual è la probabilità di estrarre una pallina rossa?`, `${r}/${tot}`, [`${b}/${tot}`, `${r}/${b}`, `1/${tot}`, `${r}/${tot + 1}`],
          `Casi favorevoli ${r}, casi possibili ${tot}: ${r}/${tot}.`);
      }
      const [what, n, p] = pick([["un numero pari", 3, "1/2"], ["il numero 6", 1, "1/6"], ["un multiplo di 3", 2, "1/3"], ["un numero maggiore di 4", 2, "1/3"], ["un numero minore di 3", 2, "1/3"], ["un numero primo", 3, "1/2"]]);
      return mk(`Lanciando un dado, qual è la probabilità di ottenere ${what}?`, p, ["1/2", "1/3", "1/6", "2/3", "5/6"], `I casi favorevoli sono ${n} su 6: la probabilità è ${p}.`);
    }
    if (t === 9) {   // trinomio notevole
      let a, b;
      do { a = rnd(2, 7); b = rnd(2, 8); } while (a === b);
      const s = Math.random() < 0.5 ? "+" : "−", opp = s === "+" ? "−" : "+";
      return mk(`Scomponi in fattori: x² ${s} ${a + b}x + ${a * b}`, `(x ${s} ${a})(x ${s} ${b})`, [`(x ${opp} ${a})(x ${opp} ${b})`, `(x + ${a})(x − ${b})`, `(x − ${a})(x + ${b})`],
        `Servono due numeri con prodotto ${a * b} e somma ${s === "+" ? "" : "−"}${a + b}: ${s === "+" ? "" : "−"}${a} e ${s === "+" ? "" : "−"}${b}.`);
    }
    // area del trapezio
    const bb = rnd(2, 8), B = bb + 2 * rnd(1, 5), h = rnd(2, 9), A = (B + bb) / 2 * h;
    return mk(`Un trapezio ha le basi di ${B} cm e ${bb} cm e l'altezza di ${h} cm. Quanto vale l'area?`, `${A} cm²`, [`${(B + bb) * h} cm²`, `${B * h} cm²`, `${(B - bb) / 2 * h} cm²`, `${A + h} cm²`],
      `Area = (B + b) · h : 2 = (${B} + ${bb}) · ${h} : 2 = ${A} cm².`);
  }
  function mathPairs9() {
    const gens = [
      () => { const a = rnd(2, 9), b = pick([2, 3, 5, 6, 7]); return { l: `√${a * a * b}`, r: `${a}√${b}` }; },
      () => { const a = rnd(2, 7), b = rnd(2, 8); return { l: `x² + ${a + b}x + ${a * b}`, r: `(x + ${a})(x + ${b})` }; },
      () => { const t = pick(TERNE); return { l: `cateti ${t[0]} e ${t[1]}`, r: `ipotenusa ${t[2]}` }; },
      () => { const r1 = rnd(1, 6), r2 = r1 + rnd(1, 4); return { l: `x² − ${r1 + r2}x + ${r1 * r2} = 0`, r: `x = ${r1} e x = ${r2}` }; }
    ];
    const gen = pick(gens), out = []; let g = 0;
    while (out.length < 4 && g++ < 300) { const p = gen(); if (!out.some(o => o.r === p.r || o.l === p.l)) out.push(p); }
    return out;
  }
  function filaMath9() {
    const sets = [
      ["√2", "1,5", "√3", "2", "√5"], ["−2", "−√2", "−1", "0", "√2"], ["3", "π", "√10", "3,2", "√11"], ["−3/2", "−1", "−1/2", "1/2", "3/2"],
      ["0,1", "1/5", "√0,09", "0,35", "1/2"], ["1", "√2", "√3", "2", "√5"], ["−√5", "−2", "−√3", "−1", "0"]
    ];
    return { p: "Metti in fila dal più piccolo al più grande.", items: pick(sets) };
  }
  function mathError9() {
    const t = rnd(0, 2);
    if (t === 0) {   // parentesi da distribuire
      const a = rnd(2, 6), b = rnd(2, 6), x = rnd(1, 8), c = a * (x + b), val = (n) => (Number.isInteger(n / a) ? n / a : `${n}/${a}`);
      const rows = [`${a}(x + ${b}) = ${c}`, `${a}x + ${b} = ${c}`, `${a}x = ${c - b}`, `x = ${c - b} : ${a}`, `x = ${val(c - b)}`];
      return { p: "In quale passaggio c'è il primo errore?", rows, wrong: 1, fix: `${a}x + ${a * b} = ${c}`, e: `La parentesi si moltiplica per ogni termine: ${a}(x + ${b}) = ${a}x + ${a * b}.`, steps: true };
    }
    if (t === 1) {   // disequazione con coefficiente negativo
      const a = rnd(2, 6), b = rnd(1, 9), k = rnd(1, 6), c = b - a * k;
      const rows = [`−${a}x + ${b} > ${sgn(c)}`, `−${a}x > ${sgn(c - b)}`, `x > ${k}`];
      return { p: "In quale passaggio c'è l'errore?", rows, wrong: 2, fix: `x < ${k}`, e: `Dividendo per un numero negativo (−${a}) il verso della disequazione si inverte.`, steps: true };
    }
    // equazione di secondo grado con somma e prodotto
    const r1 = rnd(1, 6), r2 = r1 + rnd(1, 4), S = r1 + r2, P = r1 * r2;
    const rows = [`x² − ${S}x + ${P} = 0`, `Cerco due numeri con somma −${S} e prodotto ${P}`, `I numeri sono −${r1} e −${r2}`, `x = −${r1} e x = −${r2}`];
    return { p: "In quale passaggio c'è il primo errore?", rows, wrong: 1, fix: `Cerco due numeri con somma ${S} e prodotto ${P}`, e: `In x² − ${S}x + ${P} = 0 la somma delle soluzioni è +${S}: il segno si inverte rispetto al coefficiente di x.`, steps: true };
  }
  function mathStima9() {
    const t = rnd(0, 2);
    if (t === 0) { const n = pick([10, 20, 30, 40, 50, 60, 70, 90, 120, 150, 200]), v = Math.round(Math.sqrt(n) * 10) / 10; return { q: `Stima la radice quadrata di ${n}.`, min: 0, max: 20, ans: v, tol: 0.5, unit: "", step: 0.1, e: `√${n} ≈ ${String(v).replace(".", ",")}.` }; }
    if (t === 1) { const [a, b] = pick([[4, 5], [5, 7], [6, 9], [3, 6], [7, 8], [2, 9]]), v = Math.round(Math.sqrt(a * a + b * b) * 10) / 10; return { q: `Stima l'ipotenusa di un triangolo rettangolo con i cateti di ${a} cm e ${b} cm.`, min: 0, max: 20, ans: v, tol: 0.5, unit: "cm", step: 0.1, e: `c = √(${a}² + ${b}²) = √${a * a + b * b} ≈ ${String(v).replace(".", ",")} cm.` }; }
    const r = pick([4, 5, 8, 10, 12]), v = Math.round(3.14 * r * r);
    return { q: `Stima l'area di un cerchio di raggio ${r} cm (usa π ≈ 3,14).`, min: 0, max: 600, ans: v, tol: Math.round(v * 0.06), unit: "cm²", step: 5, e: `A = π · r² ≈ 3,14 · ${r * r} ≈ ${v} cm².` };
  }

  // ---------------------------------------------------------------- DOMANDE (2ª superiore)
  BANK.italiano.push(
    q2("Chi scrisse «I promessi sposi»?", ["Alessandro Manzoni", "Ugo Foscolo", "Giacomo Leopardi", "Giovanni Verga"], "Manzoni lo pubblicò nel 1827 e ne diede la versione definitiva nel 1840-42."),
    q2("Dove e quando è ambientato il romanzo?", ["In Lombardia, nel Seicento", "In Toscana, nel Medioevo", "A Napoli, nell'Ottocento", "A Roma, nel Settecento"], "La vicenda si svolge tra il 1628 e il 1630, sotto la dominazione spagnola."),
    q2("Perché Renzo e Lucia non riescono a sposarsi?", ["Don Rodrigo fa minacciare don Abbondio", "I genitori non vogliono", "Lucia è già sposata", "Scoppia una guerra"], "Don Rodrigo manda i bravi a vietare le nozze: il curato, per paura, rifiuta di celebrarle."),
    q2("Chi sono i «bravi»?", ["Sgherri armati al servizio di un signore", "Frati cappuccini", "Soldati dell'esercito spagnolo", "Contadini del paese"], "Sono uomini armati che eseguono gli ordini di un potente prepotente."),
    q2("Chi è don Abbondio?", ["Il curato pauroso del paese di Renzo e Lucia", "Il signore prepotente", "Il frate che protegge Lucia", "L'arcivescovo di Milano"], "Per paura cede alle minacce dei bravi e rifiuta di celebrare le nozze."),
    q2("Che cosa accade a fra Cristoforo prima di farsi frate?", ["Uccide un uomo in uno scontro", "Perde tutti i suoi beni", "Viene rapito dai bravi", "Fa il soldato"], "Il giovane Lodovico uccide un nemico e, pentito, diventa cappuccino."),
    q2("Chi è l'Innominato?", ["Un potente signore che si converte", "Il padre di Lucia", "Un servo di don Rodrigo", "Il capo dei lanzichenecchi"], "Dopo aver fatto rapire Lucia e aver parlato con il cardinale Federigo, cambia vita."),
    q2("Chi è la monaca di Monza?", ["Gertrude, costretta dal padre a farsi monaca", "La madre di Lucia", "Una nobile milanese colpita dalla peste", "La sorella di don Rodrigo"], "Gertrude è obbligata dalla famiglia al chiostro e resta coinvolta in una vicenda drammatica."),
    q2("Quale epidemia colpisce Milano nel romanzo?", ["La peste", "Il colera", "La tubercolosi", "L'influenza"], "È la peste del 1630, diffusa anche dal passaggio dei lanzichenecchi."),
    q2("Che cosa fa credere Manzoni all'inizio del romanzo?", ["Che la storia venga da un manoscritto ritrovato", "Che sia un fatto di cronaca recente", "Che l'abbia sognata", "Che sia un testo religioso"], "È l'espediente del manoscritto anonimo del Seicento, che l'autore finge di riscrivere."),
    q2("A quale movimento letterario appartiene Manzoni?", ["Romanticismo", "Illuminismo", "Verismo", "Neoclassicismo"], "Manzoni è uno dei maggiori esponenti del Romanticismo italiano."),
    q2("Come diventa «Anna disse: Sono stanca» in discorso indiretto?", ["Anna disse che era stanca", "Anna disse che è stanca", "Anna disse sono stanca", "Anna disse che sia stanca"], "Si usa «che», la persona passa alla terza e il tempo slitta indietro: presente → imperfetto."),
    q2("Nella frase «Era così stanco che si addormentò subito», la subordinata è…", ["Consecutiva", "Causale", "Finale", "Concessiva"], "Esprime la conseguenza dell'intensità indicata nella principale («così… che»)."),
    q2("«Sebbene piovesse, uscimmo»: la subordinata è…", ["Concessiva", "Causale", "Temporale", "Finale"], "La concessiva indica un fatto che non impedisce l'azione principale."),
    q2("Che cos'è il gerundio?", ["Un modo verbale indefinito", "Un tempo del congiuntivo", "Un modo finito", "Un tipo di aggettivo"], "Come infinito e participio, non ha desinenze di persona: è un modo indefinito."),
    q2("Quanti versi ha un sonetto?", ["14", "12", "16", "10"], "Due quartine (4 + 4 versi) e due terzine (3 + 3 versi)."),
    q2("Di quante sillabe è formato l'endecasillabo?", ["Undici", "Dieci", "Dodici", "Nove"], "Ha undici sillabe metriche, con l'ultimo accento tonico sulla decima."),
    q2("Che cos'è l'enjambement?", ["Una frase che continua nel verso successivo", "La ripetizione di una parola a inizio verso", "La fusione tra due vocali", "La rima all'interno del verso"], "Il senso procede oltre la fine del verso, spezzando l'unità sintattica."),
    q2("Come si chiama l'unione della vocale finale di una parola con quella iniziale della successiva, nel verso?", ["Sinalefe", "Dieresi", "Sineresi", "Apocope"], "Le due vocali si contano come una sola sillaba metrica."),
    q2("Quale schema ha la rima baciata?", ["AABB", "ABAB", "ABBA", "ABCABC"], "I versi rimano a due a due."),
    q2("Che cos'è una terzina?", ["Una strofa di tre versi", "Un verso di tre sillabe", "Una poesia di tre strofe", "Una rima di tre parole"], "La terzina è la strofa tipica della Divina Commedia."),
    q2("Che cos'è la parafrasi di una poesia?", ["La riscrittura in prosa con parole più semplici", "Il riassunto in una frase", "L'elenco delle figure retoriche", "La traduzione in latino"], "Rende chiaro il significato senza cambiarlo."),
    q2("Qual è lo scopo di un testo espositivo?", ["Informare in modo oggettivo", "Convincere con una tesi", "Raccontare una storia", "Dare istruzioni"], "Presenta dati e spiegazioni senza sostenere un'opinione."),
    q2("Che cos'è la tesi in un testo argomentativo?", ["L'opinione che l'autore sostiene", "Il riassunto del testo", "Il titolo", "L'ultima frase"], "È l'idea centrale, sostenuta con argomenti e prove."),
    q2("Come si chiama la figura in «leggere Dante» (l'autore per l'opera)?", ["Metonimia", "Metafora", "Iperbole", "Ossimoro"], "La metonimia sostituisce un termine con un altro legato da vicinanza, come autore-opera."),
    q2("Chi è Didone nell'Eneide?", ["La regina di Cartagine", "La moglie di Enea", "La madre di Enea", "Una sacerdotessa di Apollo"], "Si innamora di Enea, che deve partire per l'Italia, e si uccide."),
    q2("Chi è la persona che Enea porta sulle spalle fuggendo da Troia in fiamme?", ["Suo padre Anchise", "Suo figlio Ascanio", "Il re Priamo", "Sua moglie Creusa"], "Enea salva il padre Anchise, il figlio Ascanio e gli dèi protettori di Troia."),
    q2("Chi è Turno nell'Eneide?", ["Il re dei Rutuli, rivale di Enea", "Il padre di Enea", "Il re di Troia", "Il dio protettore dei Latini"], "Combatte contro Enea ed è ucciso nel duello finale.")
  );
  BANK.inglese.push(
    q2("Completa: «This book ___ written by George Orwell.»", ["was", "were", "did", "has"], "Passivo al passato: was/were + participio passato. «Book» è singolare: was.", { ae: true, en: ["This book ___ written by George Orwell."] }),
    q2("Completa: «English ___ in many countries.»", ["is spoken", "speaks", "is speaking", "spoke"], "Passivo al presente: is/are + participio passato.", { ae: true, en: ["English ___ in many countries."] }),
    q2("Qual è il participio passato di «to write»?", ["written", "wrote", "writed", "writing"], "Write – wrote – written.", { ae: true, en: ["to write"] }),
    q2("Completa: «If I had more time, I ___ learn Japanese.»", ["would", "will", "did", "am going to"], "Second conditional: if + past simple, would + verbo base.", { ae: true, en: ["If I had more time, I ___ learn Japanese."] }),
    q2("Completa: «You look tired. You ___ go to bed early.»", ["should", "may", "can", "would be"], "«Should» esprime un consiglio.", { ae: true, en: ["You look tired. You ___ go to bed early."] }),
    q2("Completa: «I ___ get up at six tomorrow. The train leaves at seven.»", ["have to", "must to", "has to", "having to"], "«Have to» indica un obbligo che dipende dalle circostanze.", { ae: true, en: ["I ___ get up at six tomorrow. The train leaves at seven."] }),
    q2("Completa: «I ___ play football when I was a child.»", ["used to", "use to", "was used", "am used to"], "«Used to» + verbo base indica un'abitudine del passato.", { ae: true, en: ["I ___ play football when I was a child."] }),
    q2("Completa: «I haven't finished my homework ___.»", ["yet", "already", "just", "ago"], "«Yet» si usa nelle frasi negative e nelle domande.", { ae: true, en: ["I haven't finished my homework ___."] }),
    q2("Completa: «Don't worry. I've ___ called him.»", ["just", "yet", "ago", "since"], "«Just» significa «proprio ora» e sta tra have e participio.", { ae: true, en: ["Don't worry. I've ___ called him."] }),
    q2("Completa: «We moved here three years ___.»", ["ago", "before", "since", "for"], "«Ago» indica quanto tempo fa, e si usa con il past simple.", { ae: true, en: ["We moved here three years ___."] }),
    q2("Completa: «She said that she ___ tired.»", ["was", "is", "has been", "will be"], "Nel discorso indiretto al passato il verbo slitta indietro: am → was.", { ae: true, en: ["She said that she ___ tired."] }),
    q2("Completa: «He asked me where I ___ .»", ["lived", "live", "do live", "am living"], "Nelle domande indirette l'ordine è da frase affermativa e il tempo slitta indietro.", { ae: true, en: ["He asked me where I ___ ."] }),
    q2("Completa: «It's too cold ___ swim today.»", ["to", "for", "than", "that"], "Too + aggettivo + to + verbo base.", { ae: true, en: ["It's too cold ___ swim today."] }),
    q2("Completa: «He isn't old ___ to drive.»", ["enough", "too", "very", "so"], "«Enough» segue l'aggettivo.", { ae: true, en: ["He isn't old ___ to drive."] }),
    q2("Completa: «She is as tall ___ her brother.»", ["as", "than", "like", "that"], "Comparativo di uguaglianza: as… as.", { ae: true, en: ["She is as tall ___ her brother."] }),
    q2("Completa: «The film was ___ boring that I fell asleep.»", ["so", "such", "too", "very"], "So + aggettivo + that.", { ae: true, en: ["The film was ___ boring that I fell asleep."] }),
    q2("Completa: «It was ___ a good film that I saw it twice.»", ["such", "so", "too", "very"], "Such + a + aggettivo + nome.", { ae: true, en: ["It was ___ a good film that I saw it twice."] }),
    q2("Completa: «There are only ___ apples left.»", ["a few", "a little", "much", "any"], "«Apples» è numerabile: a few.", { ae: true, en: ["There are only ___ apples left."] }),
    q2("Completa: «There is only ___ milk left.»", ["a little", "a few", "many", "several"], "«Milk» non è numerabile: a little.", { ae: true, en: ["There is only ___ milk left."] }),
    q2("Completa: «You're coming with us, ___ you?»", ["aren't", "don't", "won't", "isn't"], "Question tag: frase affermativa, tag negativo con lo stesso ausiliare.", { ae: true, en: ["You're coming with us, ___ you?"] }),
    q2("Completa: «I want ___ a new phone.»", ["to buy", "buying", "buy", "bought"], "«Want» è seguito dall'infinito con to.", { ae: true, en: ["I want ___ a new phone."] }),
    q2("Completa: «I'm looking forward to ___ you.»", ["seeing", "see", "saw", "to see"], "Dopo «look forward to» il verbo va in -ing.", { ae: true, en: ["I'm looking forward to ___ you."] }),
    q2("Qual è il past simple di «to teach»?", ["taught", "teached", "thought", "tought"], "Teach – taught – taught. «Thought» viene da «think».", { ae: true, en: ["to teach"] }),
    q2("Completa: «I was walking home when I ___ a strange noise.»", ["heard", "was hearing", "have heard", "hear"], "Un'azione breve che interrompe un'azione in corso: past simple.", { ae: true, en: ["I was walking home when I ___ a strange noise."] }),
    q2("Che cosa significa «to look for»?", ["Cercare", "Guardare", "Sembrare", "Aspettare"], "Look at = guardare; look like = somigliare.", { en: ["to look for"] }),
    q2("Che cosa significa «to give up»?", ["Arrendersi, smettere", "Regalare", "Alzarsi", "Arrivare"], "Il phrasal verb indica rinunciare a fare qualcosa.", { en: ["to give up"] }),
    q2("Che cosa significa «to turn off»?", ["Spegnere", "Accendere", "Girare a destra", "Abbassare"], "Il contrario è «to turn on».", { en: ["to turn off"] }),
    q2("Che cosa significa «eventually»?", ["Alla fine", "Eventualmente", "Forse", "Spesso"], "Falso amico: «eventualmente» si dice «possibly» o «if necessary».", { en: ["eventually"] }),
    q2("Che cosa significa «sensible»?", ["Ragionevole", "Sensibile", "Sensuale", "Sentimentale"], "Falso amico: «sensibile» si dice «sensitive».", { en: ["sensible"] }),
    q2("Qual è il plurale di «tooth»?", ["teeth", "tooths", "toothes", "teeths"], "Plurale irregolare: tooth – teeth.", { ae: true, en: ["tooth"] }),
    q2("Quale frase è corretta?", ["I have lived here for five years.", "I live here since five years.", "I am living here for five years.", "I lived here since five years."], "Un'azione iniziata nel passato e ancora vera usa il present perfect con «for».", { ae: true })
  );
  BANK.storia.push(
    q2("Chi fu il primo imperatore romano?", ["Augusto", "Cesare", "Nerone", "Traiano"], "Ottaviano ricevette il titolo di Augusto nel 27 a.C., inaugurando il principato."),
    q2("Che cosa fu la «pax romana»?", ["Un lungo periodo di pace all'interno dell'impero", "Un trattato con i Persiani", "Una legge di Augusto", "La fine delle guerre puniche"], "Sotto Augusto e i successori, per circa due secoli, l'impero ebbe pace e prosperità interna."),
    q2("Sotto quale imperatore l'impero romano raggiunse la massima estensione?", ["Traiano", "Augusto", "Costantino", "Diocleziano"], "Con Traiano (98-117 d.C.) l'impero arrivò fino alla Dacia e alla Mesopotamia."),
    q2("Che cos'era il limes?", ["Il confine fortificato dell'impero", "Un tipo di strada", "Una legge", "Un tributo"], "Era una linea di fortezze e presidi lungo i confini."),
    q2("Che cosa erano le catacombe?", ["Cimiteri sotterranei dei primi cristiani", "Teatri", "Acquedotti", "Caserme"], "Servivano per le sepolture e talvolta per le riunioni."),
    q2("Che cos'è la tetrarchia introdotta da Diocleziano?", ["Il governo dell'impero affidato a quattro capi", "Una moneta", "Una provincia", "Un esercito"], "Due Augusti e due Cesari si dividevano il governo dell'impero."),
    q2("Che cosa stabilì l'editto di Milano del 313?", ["La libertà di culto, anche per i cristiani", "Il cristianesimo religione di Stato", "La divisione dell'impero", "La fine della schiavitù"], "Costantino e Licinio riconobbero la libertà di religione."),
    q2("Quale imperatore rese il cristianesimo religione ufficiale dell'impero?", ["Teodosio", "Costantino", "Diocleziano", "Nerone"], "Con l'editto di Tessalonica del 380 il cristianesimo divenne religione di Stato."),
    q2("Quale città Costantino fece capitale d'Oriente nel 330?", ["Costantinopoli", "Ravenna", "Atene", "Alessandria"], "Costantinopoli sorse sull'antica Bisanzio."),
    q2("Chi fu Attila?", ["Il re degli Unni", "Il re dei Goti", "Un imperatore bizantino", "Un papa"], "Fu fermato nel 451 ai Campi Catalaunici da Romani e alleati."),
    q2("Quale evento segna convenzionalmente la fine dell'impero romano d'Occidente?", ["La deposizione di Romolo Augustolo nel 476", "Il sacco di Roma del 410", "La morte di Augusto", "La divisione dell'impero nel 395"], "Nel 476 il capo barbaro Odoacre depose l'ultimo imperatore."),
    q2("Quale re ostrogoto governò l'Italia dopo Odoacre?", ["Teodorico", "Alarico", "Attila", "Clodoveo"], "Teodorico, con capitale a Ravenna, governò l'Italia dal 493."),
    q2("Che cosa fece raccogliere l'imperatore Giustiniano?", ["Le leggi romane nel Corpus iuris civilis", "Le opere di Virgilio", "I tributi dell'impero", "I canti cristiani"], "Il Corpus iuris civilis è alla base del diritto di molti Paesi europei."),
    q2("Quale popolo germanico entrò in Italia nel 568?", ["I Longobardi", "Gli Ostrogoti", "I Franchi", "Gli Unni"], "Guidati da Alboino, fecero di Pavia la loro capitale."),
    q2("Chi fu Clodoveo?", ["Il re dei Franchi che si convertì al cristianesimo", "Il re dei Visigoti", "Il capo degli Unni", "L'ultimo imperatore romano"], "Clodoveo si convertì al cattolicesimo e rafforzò il regno dei Franchi."),
    q2("Chi fu Gregorio Magno?", ["Il papa che organizzò la Chiesa tra VI e VII secolo", "Un imperatore romano", "Un re dei Longobardi", "Un capo arabo"], "Gregorio I (590-604) rafforzò la Chiesa e favorì la conversione dei Longobardi."),
    q2("Chi fondò l'ordine dei benedettini?", ["Benedetto da Norcia", "Francesco d'Assisi", "Gregorio Magno", "Agostino"], "Nel 529 fondò Montecassino, con la regola «ora et labora»."),
    q2("Che cosa facevano i monaci amanuensi?", ["Copiavano a mano i libri", "Costruivano castelli", "Comandavano eserciti", "Riscuotevano le tasse"], "Nei monasteri copiarono testi antichi, salvandoli dalla distruzione."),
    q2("Che cosa avvenne nel 622 nella vita di Maometto?", ["La fuga dalla Mecca a Medina (ègira)", "La nascita", "La conquista della Spagna", "La morte"], "Il 622 è il primo anno del calendario islamico."),
    q2("Quale libro sacro raccoglie le rivelazioni di Maometto?", ["Il Corano", "La Torah", "Il Vangelo", "I Veda"], "Il Corano è il libro sacro dell'Islam."),
    q2("Dove i Franchi fermarono l'avanzata araba nel 732?", ["A Poitiers", "A Maratona", "A Zama", "A Legnano"], "Carlo Martello fermò gli Arabi a Poitiers, in Francia."),
    q2("In che anno fu incoronato imperatore Carlo Magno?", ["800", "476", "962", "1000"], "La notte di Natale dell'800 papa Leone III lo incoronò a Roma."),
    q2("Che cos'è il feudo?", ["Terra concessa dal signore al vassallo in cambio di fedeltà", "Un tipo di moneta", "Una tassa", "Una fortezza del re"], "Il vassallo giurava fedeltà e aiuto militare; il feudo era la ricompensa."),
    q2("Chi erano i servi della gleba?", ["Contadini legati alla terra del signore", "Schiavi comprati al mercato", "Cavalieri", "Monaci"], "Non potevano lasciare il podere, che passava con la terra."),
    q2("Che cos'era la curtis nell'alto Medioevo?", ["La grande azienda agricola del signore", "Il tribunale del re", "La residenza del papa", "La piazza del mercato"], "Produceva quasi tutto ciò che serviva a chi ci viveva."),
    q2("Da dove venivano i Vichinghi?", ["Dalla Scandinavia", "Dall'Arabia", "Dall'Asia centrale", "Dalla Britannia"], "Navigatori e predoni del Nord Europa, si spinsero su drakkar fino al Mediterraneo."),
    q2("Quale carica ottenne Ottone I nel 962?", ["Imperatore del Sacro Romano Impero", "Re d'Italia", "Papa", "Duca di Normandia"], "Fu incoronato a Roma da papa Giovanni XII.")
  );
  BANK.scienze.push(
    q2("Che cos'è il numero di massa di un atomo?", ["La somma di protoni e neutroni", "Solo il numero di protoni", "Solo il numero di neutroni", "Il numero di elettroni"], "Gli elettroni hanno massa trascurabile: la massa sta nel nucleo."),
    q2("Che cosa sono gli isotopi?", ["Atomi dello stesso elemento con diverso numero di neutroni", "Atomi con diverso numero di protoni", "Molecole uguali", "Ioni positivi"], "Hanno lo stesso numero atomico ma diversa massa."),
    q2("Come sono ordinati gli elementi nella tavola periodica?", ["Per numero atomico crescente", "In ordine alfabetico", "Per colore", "Per temperatura di fusione"], "Mendeleev li ordinò per massa; oggi si usa il numero atomico."),
    q2("Che cosa hanno in comune gli elementi dello stesso gruppo?", ["Lo stesso numero di elettroni di valenza", "Lo stesso numero di protoni", "La stessa massa", "Lo stesso stato fisico"], "Per questo hanno proprietà chimiche simili."),
    q2("Che tipo di legame c'è nel sale da cucina (NaCl)?", ["Ionico", "Covalente", "Metallico", "A idrogeno"], "Il sodio cede un elettrone al cloro e i due ioni opposti si attraggono."),
    q2("Che cosa avviene in un legame covalente?", ["Gli atomi condividono elettroni", "Un atomo cede elettroni all'altro", "Gli atomi si fondono in uno solo", "I nuclei si scambiano protoni"], "Nell'acqua O e H condividono elettroni."),
    q2("Quanti atomi ci sono in una molecola di acqua (H₂O)?", ["Tre: due di idrogeno e uno di ossigeno", "Due: uno di idrogeno e uno di ossigeno", "Tre: uno di idrogeno e due di ossigeno", "Quattro"], "Il pedice 2 indica due atomi di idrogeno."),
    q2("Che cos'è una soluzione?", ["Un miscuglio omogeneo di soluto e solvente", "Un miscuglio eterogeneo", "Un composto puro", "Un elemento"], "Esempio: sale (soluto) sciolto in acqua (solvente)."),
    q2("Quale pH ha una soluzione neutra?", ["7", "0", "14", "10"], "Sotto 7 la soluzione è acida, sopra 7 è basica."),
    q2("Il succo di limone è…", ["Acido", "Neutro", "Basico", "Un sale"], "Contiene acido citrico e ha pH intorno a 2."),
    q2("Che cosa succede in una reazione chimica?", ["Gli atomi si riorganizzano formando nuove sostanze", "Cambia solo lo stato fisico", "Gli atomi scompaiono", "I neutroni diventano protoni"], "I reagenti si trasformano in prodotti, con gli stessi atomi."),
    q2("Che cosa afferma la legge di conservazione della massa di Lavoisier?", ["In una reazione la massa totale non cambia", "La massa aumenta sempre", "La massa diminuisce sempre", "La massa si trasforma in carica"], "La massa dei reagenti è uguale a quella dei prodotti."),
    q2("Quale gas formano le bollicine di un'aranciata?", ["Anidride carbonica", "Ossigeno", "Azoto", "Idrogeno"], "È CO₂ disciolta nel liquido sotto pressione."),
    q2("Quale organulo produce energia nelle cellule?", ["Mitocondrio", "Nucleo", "Ribosoma", "Vacuolo"], "Nei mitocondri avviene la respirazione cellulare."),
    q2("Quale struttura distingue la cellula vegetale da quella animale?", ["La parete cellulare", "La membrana plasmatica", "Il nucleo", "Il citoplasma"], "Le cellule vegetali hanno anche cloroplasti e un grande vacuolo."),
    q2("Che cosa contengono i cloroplasti?", ["La clorofilla", "Il DNA nucleare", "Gli enzimi digestivi", "L'acqua di riserva"], "La clorofilla cattura la luce per la fotosintesi."),
    q2("Che cosa produce la fotosintesi?", ["Glucosio e ossigeno", "Anidride carbonica e acqua", "Solo ossigeno", "Proteine"], "Con la luce, acqua e anidride carbonica diventano glucosio e ossigeno."),
    q2("Come si chiamano gli organismi che producono da soli il proprio nutrimento?", ["Autotrofi", "Eterotrofi", "Decompositori", "Parassiti"], "Le piante sono autotrofe: usano la fotosintesi."),
    q2("Qual è la forma del DNA?", ["Doppia elica", "Catena singola dritta", "Sfera", "Triplo anello"], "Watson e Crick la descrissero nel 1953."),
    q2("Quali sono le basi azotate del DNA?", ["Adenina, timina, citosina, guanina", "Adenina, uracile, citosina, guanina", "Adenina, timina, uracile, guanina", "Solo adenina e timina"], "Nell'RNA la timina è sostituita dall'uracile."),
    q2("Che cosa produce la mitosi?", ["Due cellule figlie identiche alla madre", "Quattro cellule diverse", "Un gamete", "Una cellula con metà cromosomi"], "Serve per la crescita e la riparazione dei tessuti."),
    q2("Che cosa produce la meiosi?", ["Cellule con metà dei cromosomi (gameti)", "Due cellule identiche", "Cellule con il doppio dei cromosomi", "Nessuna cellula"], "I gameti hanno un solo cromosoma per ogni coppia."),
    q2("Quanti cromosomi ha una cellula umana non sessuale?", ["46", "23", "48", "44"], "Sono 23 coppie: 46 cromosomi."),
    q2("Chi è considerato il padre della genetica?", ["Gregor Mendel", "Charles Darwin", "Louis Pasteur", "Antoni van Leeuwenhoek"], "Mendel studiò l'ereditarietà con i piselli."),
    q2("Che cos'è un allele dominante?", ["Uno che si manifesta anche in un solo esemplare", "Uno che si manifesta solo se doppio", "Uno che non si manifesta mai", "Uno che cambia a ogni generazione"], "Il recessivo si manifesta solo se è presente in due copie."),
    q2("Che cosa propose Darwin?", ["L'evoluzione per selezione naturale", "La generazione spontanea", "L'ereditarietà dei caratteri acquisiti", "L'immutabilità delle specie"], "In «L'origine delle specie» (1859) spiegò che sopravvivono gli individui meglio adattati.")
  );
  BANK.civica.push(
    q2("In che anno furono firmati i Trattati di Roma, che crearono la CEE?", ["1957", "1945", "1992", "2002"], "Sei Paesi, tra cui l'Italia, fondarono la Comunità economica europea."),
    q2("Quale trattato del 1992 istituì l'Unione europea?", ["Maastricht", "Roma", "Lisbona", "Schengen"], "Il Trattato di Maastricht fu firmato nel 1992 ed entrò in vigore nel 1993."),
    q2("In che anno entrarono in circolazione le monete e le banconote in euro?", ["2002", "1992", "1999", "2010"], "L'euro esisteva dal 1999 come moneta contabile."),
    q2("Che cosa permette lo spazio Schengen?", ["Circolare senza controlli alle frontiere interne", "Usare una moneta unica", "Votare per un solo governo", "Lavorare senza contratto"], "I Paesi aderenti hanno abolito i controlli sulle persone alle frontiere comuni."),
    q2("Ogni quanti anni si eleggono i deputati del Parlamento europeo?", ["5", "4", "7", "10"], "Ogni cinque anni votano i cittadini di tutti gli Stati membri."),
    q2("Quale organo dell'UE propone le nuove leggi?", ["La Commissione europea", "Il Consiglio d'Europa", "La BCE", "La Corte dei conti"], "Ha il potere di iniziativa legislativa."),
    q2("Che cos'è la Banca centrale europea?", ["L'istituzione che gestisce l'euro", "Un parlamento dei popoli", "Un esercito comune", "Una corte di giustizia"], "Ha sede a Francoforte e si occupa della politica monetaria."),
    q2("Che cosa significa «cittadinanza europea»?", ["Chi ha la cittadinanza di uno Stato membro è anche cittadino dell'UE", "Si ottiene pagando una tassa", "Sostituisce quella nazionale", "Vale solo in Francia"], "Si aggiunge alla cittadinanza nazionale e non la sostituisce."),
    q2("In che anno fu fondata l'ONU?", ["1945", "1918", "1957", "1989"], "Nacque alla fine della seconda guerra mondiale per mantenere la pace."),
    q2("Quanti membri permanenti ha il Consiglio di sicurezza dell'ONU?", ["5", "3", "10", "15"], "Stati Uniti, Russia, Cina, Regno Unito e Francia, con diritto di veto."),
    q2("Che cosa afferma la Dichiarazione universale dei diritti umani del 1948?", ["Che tutti gli esseri umani nascono liberi e uguali in dignità e diritti", "Che il voto è obbligatorio", "Che i confini sono aboliti", "Che la guerra è un diritto"], "È il principio dell'articolo 1."),
    q2("Che cosa riconosce l'articolo 2 della Costituzione?", ["I diritti inviolabili dell'uomo e i doveri di solidarietà", "La Repubblica fondata sul lavoro", "La libertà di religione", "Il diritto di sciopero"], "I diritti inviolabili vanno insieme ai doveri di solidarietà politica, economica e sociale."),
    q2("Che cosa afferma l'articolo 4 della Costituzione?", ["Il diritto al lavoro", "La libertà di stampa", "L'uguaglianza", "La tutela della salute"], "La Repubblica riconosce a tutti i cittadini il diritto al lavoro e promuove le condizioni per renderlo effettivo."),
    q2("Quale articolo dice che la difesa della Patria è un dovere del cittadino?", ["Articolo 52", "Articolo 48", "Articolo 3", "Articolo 21"], "L'articolo 52 la definisce «sacro dovere»."),
    q2("Che cosa prevede l'articolo 53 sulle tasse?", ["Tutti contribuiscono in base alla capacità contributiva", "Pagano solo i ricchi", "Le tasse sono volontarie", "Le tasse sono uguali per tutti"], "Il sistema tributario è improntato a criteri di progressività."),
    q2("A che età si può votare per la Camera dei deputati?", ["18 anni", "16 anni", "21 anni", "25 anni"], "Il diritto di voto si ottiene alla maggiore età."),
    q2("Quale età minima serve per essere eletti deputati?", ["25 anni", "18 anni", "30 anni", "40 anni"], "Per i senatori ne servono 40."),
    q2("Quale età minima serve per essere eletti Presidente della Repubblica?", ["50 anni", "40 anni", "35 anni", "60 anni"], "Il Presidente deve avere almeno cinquanta anni e godere dei diritti civili e politici."),
    q2("Da quali enti è costituita la Repubblica secondo l'articolo 114?", ["Comuni, Province, Città metropolitane, Regioni e Stato", "Solo Comuni e Stato", "Quartieri e Province", "Ministeri e Prefetture"], "Sono i livelli di governo del territorio."),
    q2("Chi guida il Comune?", ["Il sindaco", "Il prefetto", "Il questore", "Il presidente di Regione"], "Il sindaco è eletto dai cittadini, insieme al consiglio comunale."),
    q2("Chi sono Falcone e Borsellino?", ["Magistrati uccisi dalla mafia nel 1992", "Politici europei", "Partigiani", "Giudici della Corte costituzionale"], "Giovanni Falcone fu ucciso il 23 maggio e Paolo Borsellino il 19 luglio 1992."),
    q2("Che cos'è il cyberbullismo?", ["Prepotenze e offese ripetute online", "Un virus informatico", "Un videogioco", "Un reato inesistente"], "In Italia una legge del 2017 lo definisce e tutela le vittime."),
    q2("A che cosa serve il GDPR?", ["A proteggere i dati personali dei cittadini europei", "A regolare le monete", "A regolare i voli", "A concedere prestiti"], "È il Regolamento generale sulla protezione dei dati, applicato dal 2018."),
    q2("Quale scelta protegge meglio un account?", ["Una password lunga con lettere, numeri e simboli", "Il proprio nome", "123456", "La data di nascita"], "Meglio una password diversa per ogni servizio."),
    q2("Che cosa sono le fake news?", ["Notizie false diffuse per ingannare", "Notizie dal futuro", "Notizie sportive", "Notizie locali"], "Per verificarle si controllano fonte, data e altri siti affidabili."),
    q2("Che cosa significa sviluppo sostenibile?", ["Soddisfare i bisogni di oggi senza compromettere quelli futuri", "Bloccare ogni produzione", "Usare solo petrolio", "Crescere senza regole"], "È la definizione data dal rapporto Brundtland del 1987.")
  );

  // ---------------------------------------------------------------- COPPIE (2ª)
  pairs.italiano.push(
    T2("Collega ogni personaggio dei Promessi sposi al suo ruolo.", [["Renzo", "filatore di seta"], ["Lucia", "la promessa sposa"], ["Don Rodrigo", "signorotto prepotente"], ["Don Abbondio", "curato pauroso"], ["Fra Cristoforo", "frate protettore degli umili"], ["Innominato", "signore che si converte"], ["Agnese", "madre di Lucia"], ["Perpetua", "serva di don Abbondio"]]),
    T2("Collega ogni termine della metrica alla sua definizione.", [["Quartina", "strofa di quattro versi"], ["Terzina", "strofa di tre versi"], ["Endecasillabo", "verso di undici sillabe"], ["Rima baciata", "schema AABB"], ["Enjambement", "frase spezzata fra due versi"], ["Sinalefe", "due vocali in una sillaba"]]),
    T2("Collega ogni subordinata al suo esempio.", [["Consecutiva", "così stanco che dormì"], ["Ipotetica", "se piove, resto"], ["Concessiva", "sebbene piovesse"], ["Causale", "poiché era tardi"], ["Temporale", "mentre cenavamo"], ["Modale", "imparò suonando"]]),
    T2("Collega ogni opera al suo autore.", [["Iliade", "Omero"], ["Eneide", "Virgilio"], ["I promessi sposi", "Manzoni"], ["Metamorfosi", "Ovidio"], ["Divina Commedia", "Dante"]])
  );
  pairs.inglese.push(
    T2("Collega ogni verbo al suo past simple.", [["teach", "taught"], ["catch", "caught"], ["bring", "brought"], ["sell", "sold"], ["win", "won"], ["leave", "left"], ["meet", "met"], ["feel", "felt"], ["build", "built"], ["fall", "fell"]], { rEn: true }),
    T2("Collega ogni verbo al suo participio passato.", [["write", "written"], ["eat", "eaten"], ["break", "broken"], ["speak", "spoken"], ["drive", "driven"], ["choose", "chosen"], ["take", "taken"], ["give", "given"]], { rEn: true }),
    T2("Collega ogni parola alla sua traduzione.", [["although", "sebbene"], ["however", "tuttavia"], ["during", "durante"], ["already", "già"], ["enough", "abbastanza"], ["whether", "se (dubbio)"]]),
    T2("Collega ogni parola alla sua traduzione.", [["actually", "in realtà"], ["eventually", "alla fine"], ["sensible", "ragionevole"], ["library", "biblioteca"], ["parents", "genitori"], ["college", "università"]]),
    T2("Collega ogni aggettivo al suo contrario.", [["generous", "mean"], ["polite", "rude"], ["brave", "cowardly"], ["modern", "ancient"], ["fast", "slow"], ["fair", "unfair"]], { rEn: true })
  );
  pairs.storia.push(
    T2("Collega ogni personaggio alla sua impresa.", [["Augusto", "primo imperatore"], ["Traiano", "massima espansione dell'impero"], ["Costantino", "editto di Milano"], ["Teodosio", "cristianesimo religione di Stato"], ["Giustiniano", "Corpus iuris civilis"], ["Carlo Magno", "impero carolingio"], ["Teodorico", "re degli Ostrogoti"], ["Benedetto da Norcia", "regola monastica"]]),
    T2("Collega ogni data al suo avvenimento.", [["27 a.C.", "Ottaviano diventa Augusto"], ["313", "editto di Milano"], ["380", "cristianesimo religione di Stato"], ["476", "fine dell'impero d'Occidente"], ["568", "i Longobardi in Italia"], ["622", "ègira di Maometto"], ["800", "incoronazione di Carlo Magno"], ["962", "Ottone I imperatore"]]),
    T2("Collega ogni termine al suo significato.", [["Feudo", "terra concessa al vassallo"], ["Vassallo", "chi giura fedeltà al signore"], ["Servo della gleba", "contadino legato alla terra"], ["Limes", "confine fortificato"], ["Catacombe", "cimiteri sotterranei"], ["Curtis", "grande azienda agricola"], ["Monastero", "comunità di monaci"], ["Tetrarchia", "governo di quattro capi"]]),
    T2("Collega ogni civiltà al suo territorio.", [["Ostrogoti", "Italia (Ravenna)"], ["Longobardi", "Italia (Pavia)"], ["Franchi", "Gallia"], ["Visigoti", "Spagna"], ["Arabi", "penisola arabica"], ["Vichinghi", "Scandinavia"]])
  );
  pairs.scienze.push(
    T2("Collega ogni elemento al suo simbolo.", [["Calcio", "Ca"], ["Potassio", "K"], ["Magnesio", "Mg"], ["Cloro", "Cl"], ["Zolfo", "S"], ["Argento", "Ag"], ["Elio", "He"], ["Rame", "Cu"]]),
    T2("Collega ogni organulo alla sua funzione.", [["Mitocondrio", "produce energia"], ["Nucleo", "contiene il DNA"], ["Ribosoma", "produce proteine"], ["Cloroplasto", "fotosintesi"], ["Membrana plasmatica", "controlla gli scambi"], ["Vacuolo", "accumula sostanze"]]),
    T2("Collega ogni tipo di legame al suo esempio.", [["Ionico", "NaCl (sale)"], ["Covalente", "H₂O (acqua)"], ["Metallico", "Fe (ferro)"], ["Legame a idrogeno", "tra molecole d'acqua"]]),
    T2("Collega ogni scienziato alla sua scoperta.", [["Mendel", "leggi dell'ereditarietà"], ["Darwin", "selezione naturale"], ["Lavoisier", "conservazione della massa"], ["Mendeleev", "tavola periodica"], ["Watson e Crick", "doppia elica del DNA"], ["Pasteur", "vaccino contro la rabbia"]])
  );
  pairs.civica.push(
    T2("Collega ogni articolo della Carta al suo tema.", [["Art. 2", "diritti inviolabili"], ["Art. 4", "diritto al lavoro"], ["Art. 13", "libertà personale"], ["Art. 33", "libertà dell'arte e della scienza"], ["Art. 48", "diritto di voto"], ["Art. 52", "difesa della Patria"], ["Art. 53", "imposte"]]),
    T2("Collega ogni data alla sua ricorrenza.", [["9 maggio", "Festa dell'Europa"], ["10 dicembre", "Giornata dei diritti umani"], ["21 marzo", "Giornata delle vittime di mafia"], ["20 novembre", "Giornata dei diritti dell'infanzia"], ["25 novembre", "Giornata contro la violenza sulle donne"], ["22 aprile", "Giornata della Terra"]]),
    T2("Collega ogni istituzione alla sua sede.", [["Banca centrale europea", "Francoforte"], ["Corte di giustizia dell'UE", "Lussemburgo"], ["Corte penale internazionale", "L'Aia"], ["Consiglio dei ministri", "Palazzo Chigi"], ["Corte costituzionale", "Palazzo della Consulta"], ["UNESCO", "Parigi"]]),
    T2("Collega ogni organo dell'UE alla sua funzione.", [["Commissione europea", "propone le leggi"], ["Parlamento europeo", "approva le leggi"], ["Consiglio dell'UE", "rappresenta i governi"], ["Corte di giustizia", "interpreta il diritto UE"], ["BCE", "gestisce l'euro"]])
  );

  // ---------------------------------------------------------------- SEQUENZE (2ª)
  seqs.storia.push(
    SQ2("Metti in ordine di tempo, dal più antico.", ["Principato di Augusto", "Massima espansione con Traiano", "Riforme di Diocleziano", "Editto di Milano", "Fine dell'impero d'Occidente"]),
    SQ2("Metti in ordine di tempo, dal più antico.", ["Fondazione di Costantinopoli", "Editto di Tessalonica", "Divisione dell'impero", "Sacco di Roma di Alarico", "Deposizione di Romolo Augustolo"]),
    SQ2("Metti in ordine di tempo, dal più antico.", ["Longobardi in Italia", "Ègira di Maometto", "Battaglia di Poitiers", "Incoronazione di Carlo Magno", "Ottone I imperatore"]),
    SQ2("Metti in ordine di tempo, dal più antico.", ["Regno di Teodorico", "Impero di Giustiniano", "Arrivo dei Longobardi", "Papa Gregorio Magno"])
  );
  seqs.scienze.push(
    SQ2("Metti in fila dal più piccolo al più grande.", ["Atomo", "Molecola d'acqua", "Virus", "Batterio", "Cellula umana"]),
    SQ2("Metti in fila le fasi della mitosi.", ["Profase", "Metafase", "Anafase", "Telofase"]),
    SQ2("Metti in fila, dal più semplice al più complesso.", ["Cellula", "Tessuto", "Organo", "Apparato", "Organismo"]),
    SQ2("Metti in fila i livelli di classificazione, dal più ampio.", ["Regno", "Phylum", "Classe", "Ordine", "Famiglia", "Genere", "Specie"])
  );
  seqs.civica.push(
    SQ2("Metti in ordine di tempo, dal più antico.", ["Trattati di Roma", "Accordi di Schengen", "Trattato di Maastricht", "Euro in circolazione", "Trattato di Lisbona"]),
    SQ2("Metti in ordine di tempo, dal più antico.", ["Costituzione italiana", "Dichiarazione universale dei diritti umani", "Trattati di Roma", "Caduta del Muro di Berlino", "Trattato di Maastricht"])
  );
  seqs.italiano.push(
    SQ2("Metti in ordine di tempo, dal più antico.", ["Odissea", "Eneide", "Divina Commedia", "Orlando furioso", "I promessi sposi"]),
    SQ2("Metti in fila gli episodi dei Promessi sposi.", ["Don Abbondio incontra i bravi", "Il matrimonio a sorpresa fallisce", "Renzo va a Milano", "Lucia è rapita dall'Innominato", "Conversione dell'Innominato", "La peste a Milano", "Renzo e Lucia si sposano"])
  );
  seqs.inglese.push(
    SQ2("Metti in fila dal più freddo al più caldo.", ["freezing", "cold", "cool", "warm", "hot", "boiling"]),
    SQ2("Metti in ordine di tempo, dal più lontano.", ["last year", "last week", "yesterday", "tomorrow", "next month"]),
    SQ2("Metti in fila dal più giovane al più anziano.", ["baby", "child", "teenager", "adult", "pensioner"])
  );

  // ---------------------------------------------------------------- TROVA L'ERRORE (2ª)
  errors.italiano.push(
    ER2("Una sola frase ha un errore di grammatica: quale?", ["Sebbene era tardi, uscimmo.", "Benché fosse stanco, continuò.", "Nonostante piovesse, partimmo.", "Per quanto studiasse, non capiva."], 0, "Sebbene fosse tardi, uscimmo.", "«Sebbene» vuole il congiuntivo."),
    ER2("Una sola trasformazione in discorso indiretto è sbagliata: quale?", ["Disse: «Sono felice» → Disse che era felice.", "Chiese: «Dove vai?» → Chiese dove andassi.", "Disse: «Verrò domani» → Disse che verrà il giorno dopo.", "Disse: «Ho mangiato» → Disse che aveva mangiato."], 2, "Disse che sarebbe venuto il giorno dopo.", "Il futuro diventa condizionale composto e «domani» diventa «il giorno dopo»."),
    ER2("Una sola affermazione sui Promessi sposi è falsa: quale?", ["Renzo e Lucia sono i due promessi.", "Il romanzo è ambientato in Lombardia.", "Fra Cristoforo è il signore che perseguita Lucia.", "La peste colpisce Milano nel 1630."], 2, "Fra Cristoforo è il frate che protegge Lucia.", "A perseguitare Lucia è don Rodrigo."),
    ER2("Una sola definizione di metrica è sbagliata: quale?", ["Sonetto: 14 versi in due quartine e due terzine.", "Endecasillabo: verso di undici sillabe.", "Quartina: strofa di tre versi.", "Rima baciata: schema AABB."], 2, "Quartina: strofa di quattro versi.", "La strofa di tre versi è la terzina."),
    ER2("Una sola frase ha un errore di ortografia: quale?", ["Un amico mi ha detto la verità.", "Un'amica mi ha scritto.", "Qual è il tuo nome?", "Un'altro giorno verrò."], 3, "Un altro giorno verrò.", "Davanti a un nome maschile «un altro» si scrive senza apostrofo."),
    ER2("Una sola affermazione sull'Eneide è falsa: quale?", ["Il protagonista è Enea.", "L'autore è Virgilio.", "Racconta il ritorno di Ulisse a Itaca.", "Narra le origini del popolo romano."], 2, "Racconta il viaggio di Enea da Troia al Lazio.", "Il ritorno di Ulisse è il tema dell'Odissea.")
  );
  errors.inglese.push(
    ER2("Una sola frase ha un errore: quale?", ["I have been to Rome last year.", "I went to Rome last year.", "I have never been to Rome.", "She has just left."], 0, "I went to Rome last year.", "Con un tempo finito («last year») si usa il past simple.", { en: true }),
    ER2("Una sola frase ha un errore: quale?", ["The window was broke by the boy.", "The window was broken by the boy.", "The cake is eaten by everyone.", "English is spoken here."], 0, "The window was broken by the boy.", "Il passivo vuole il participio passato: broken.", { en: true }),
    ER2("Una sola frase ha un errore: quale?", ["If I will see her, I will tell her.", "If I see her, I will tell her.", "If it rains, we will stay home.", "If you study, you will pass."], 0, "If I see her, I will tell her.", "Dopo «if» nel first conditional si usa il present simple, non will.", { en: true }),
    ER2("Una sola frase ha un errore: quale?", ["She said me that she was tired.", "She told me that she was tired.", "He said that he was busy.", "They told us to wait."], 0, "She told me that she was tired.", "Dopo «say» non si mette la persona: si usa «told me» oppure «said to me».", { en: true }),
    ER2("Una sola frase ha un errore: quale?", ["She is the most intelligent in the class.", "He is the better player in the team.", "This is the worst day ever.", "She's older than me."], 1, "He is the best player in the team.", "Il superlativo di «good» è «the best».", { en: true }),
    ER2("Una sola frase ha un errore: quale?", ["I am agree with you.", "I'm sorry I'm late.", "He is afraid of dogs.", "We are ready."], 0, "I agree with you.", "«Agree» è un verbo: non si usa con «to be».", { en: true }),
    ER2("Una sola frase ha un errore: quale?", ["Can you lend me your pen?", "I borrowed a book from the library.", "She borrowed me her car.", "He lent me ten euros."], 2, "She lent me her car.", "«Borrow» = prendere in prestito; «lend» = dare in prestito.", { en: true })
  );
  errors.storia.push(
    ER2("Una sola affermazione è falsa: quale?", ["Augusto fu il primo imperatore romano.", "Traiano guidò l'impero alla massima estensione.", "Costantino rese il cristianesimo religione di Stato.", "Diocleziano introdusse la tetrarchia."], 2, "Costantino concesse la libertà di culto; fu Teodosio a fare del cristianesimo religione di Stato.", "Con Costantino è il 313 (libertà di culto), con Teodosio il 380."),
    ER2("Una sola affermazione è falsa: quale?", ["Odoacre depose Romolo Augustolo nel 476.", "Teodorico governò l'Italia da Ravenna.", "Giustiniano fece raccogliere le leggi romane nel Corpus iuris civilis.", "I Longobardi entrarono in Italia nel 410."], 3, "I Longobardi entrarono in Italia nel 568.", "Il 410 è l'anno del sacco di Roma da parte di Alarico."),
    ER2("Una sola data è sbagliata: quale?", ["Incoronazione di Carlo Magno: 800", "Ègira di Maometto: 622", "Battaglia di Poitiers: 732", "Ottone I imperatore: 1066"], 3, "Ottone I imperatore: 962", "Nel 1066 i Normanni conquistarono l'Inghilterra a Hastings."),
    ER2("Una sola affermazione è falsa: quale?", ["Il feudo era concesso dal signore al vassallo.", "I servi della gleba erano legati alla terra.", "I monaci benedettini seguivano la regola di Benedetto da Norcia.", "Il Corano è il libro sacro dei cristiani."], 3, "Il Corano è il libro sacro dei musulmani.", "I cristiani hanno la Bibbia, con l'Antico e il Nuovo Testamento."),
    ER2("Una sola affermazione è falsa: quale?", ["I Vichinghi venivano dalla Scandinavia.", "I Franchi vivevano in Gallia.", "Gli Unni erano guidati da Attila.", "I Visigoti conquistarono l'Egitto."], 3, "I Visigoti si stabilirono in Spagna.", "I Visigoti saccheggiarono Roma nel 410 e poi si insediarono in Spagna.")
  );
  errors.scienze.push(
    ER2("Una sola affermazione è falsa: quale?", ["Il mitocondrio produce energia.", "Il nucleo contiene il DNA.", "Il ribosoma produce proteine.", "Il cloroplasto è presente nelle cellule animali."], 3, "Il cloroplasto è presente nelle cellule vegetali.", "Gli animali non fanno la fotosintesi."),
    ER2("Una sola affermazione è falsa: quale?", ["Il DNA ha la forma di una doppia elica.", "Nell'RNA c'è l'uracile al posto della timina.", "La mitosi produce gameti con metà cromosomi.", "L'uomo ha 46 cromosomi."], 2, "La meiosi produce gameti con metà cromosomi.", "La mitosi dà due cellule figlie identiche."),
    ER2("Una sola affermazione è falsa: quale?", ["Il pH 7 è neutro.", "Un acido ha pH minore di 7.", "Una base ha pH minore di 7.", "Il limone è acido."], 2, "Una base ha pH maggiore di 7.", "Sopra 7 la soluzione è basica."),
    ER2("Una sola affermazione è falsa: quale?", ["Gli isotopi hanno lo stesso numero di protoni.", "Il legame ionico nasce dal trasferimento di elettroni.", "L'acqua ha formula H₂O.", "Il numero di massa è il numero di protoni."], 3, "Il numero di massa è la somma di protoni e neutroni.", "Il numero di protoni è il numero atomico."),
    ER2("Una sola affermazione è falsa: quale?", ["Mendel studiò i piselli.", "Un allele dominante si manifesta anche da solo.", "Darwin propose l'evoluzione per selezione naturale.", "La fotosintesi consuma ossigeno e produce anidride carbonica."], 3, "La fotosintesi consuma anidride carbonica e produce ossigeno.", "È la respirazione a consumare ossigeno.")
  );
  errors.civica.push(
    ER2("Una sola affermazione è falsa: quale?", ["Il Parlamento europeo è eletto ogni 5 anni.", "La BCE ha sede a Francoforte.", "La Commissione europea propone le leggi.", "L'ONU è nata nel 1957."], 3, "L'ONU è nata nel 1945.", "Il 1957 è l'anno dei Trattati di Roma."),
    ER2("Una sola affermazione è falsa: quale?", ["I deputati devono avere almeno 25 anni.", "I senatori devono avere almeno 40 anni.", "Il Presidente della Repubblica deve avere almeno 50 anni.", "Si può votare per la Camera a 21 anni."], 3, "Si può votare per la Camera a 18 anni.", "Il diritto di voto si ottiene con la maggiore età."),
    ER2("Una sola affermazione è falsa: quale?", ["L'articolo 4 riconosce il diritto al lavoro.", "L'articolo 48 riguarda il voto.", "L'articolo 53 riguarda le imposte.", "L'articolo 52 riguarda la libertà di stampa."], 3, "L'articolo 52 riguarda la difesa della Patria.", "La libertà di stampa è nell'articolo 21."),
    ER2("Una sola affermazione è falsa: quale?", ["Falcone e Borsellino furono uccisi nel 1992.", "Il GDPR protegge i dati personali.", "Il cyberbullismo è una prepotenza online.", "Le fake news sono notizie sempre vere."], 3, "Le fake news sono notizie false.", "Sono diffuse apposta per ingannare.")
  );

  // ---------------------------------------------------------------- STIMA (2ª)
  stima.storia.push(
    ST2("In che anno Ottaviano ricevette il titolo di Augusto? (a.C.)", 0, 100, 27, 8, "a.C.", "Nel 27 a.C. nacque il principato."),
    ST2("In che anno Teodosio fece del cristianesimo religione di Stato?", 200, 600, 380, 25, "d.C.", "Con l'editto di Tessalonica, nel 380."),
    ST2("In che anno fu deposto Romolo Augustolo?", 300, 700, 476, 25, "d.C.", "Nel 476 finisce l'impero romano d'Occidente."),
    ST2("In che anno i Longobardi entrarono in Italia?", 400, 800, 568, 30, "d.C.", "Nel 568, guidati da Alboino."),
    ST2("In che anno Carlo Magno fu incoronato imperatore?", 600, 1000, 800, 25, "d.C.", "La notte di Natale dell'800."),
    ST2("In che anno Costantino consacrò Costantinopoli?", 200, 600, 330, 25, "d.C.", "Nel 330 la città divenne capitale d'Oriente.")
  );
  stima.scienze.push(
    ST2("Quanti cromosomi ha una cellula umana non sessuale?", 0, 100, 46, 4, "", "Sono 23 coppie: 46 cromosomi."),
    ST2("In che anno Watson e Crick descrissero la doppia elica del DNA?", 1900, 2000, 1953, 5, "", "Nel 1953."),
    ST2("A quanti gradi Celsius corrisponde lo zero assoluto?", -500, 0, -273, 15, "°C", "Lo zero assoluto è −273,15 °C, cioè 0 kelvin."),
    ST2("Quanti elettroni ha un atomo di ossigeno?", 0, 20, 8, 1, "", "Il numero atomico dell'ossigeno è 8."),
    ST2("In che anno Mendeleev pubblicò la tavola periodica?", 1800, 1950, 1869, 8, "", "Nel 1869.")
  );
  stima.civica.push(
    ST2("In che anno furono firmati i Trattati di Roma?", 1900, 2000, 1957, 4, "", "Nel 1957 nacque la CEE."),
    ST2("In che anno entrarono in circolazione le monete in euro?", 1990, 2020, 2002, 2, "", "Il 1° gennaio 2002."),
    ST2("Quanti Stati fanno parte dell'ONU?", 100, 300, 193, 15, "", "Gli Stati membri sono 193."),
    ST2("Quanti membri ha in tutto il Consiglio di sicurezza dell'ONU?", 5, 50, 15, 2, "", "Cinque permanenti e dieci a rotazione."),
    ST2("In che anno fu fondata l'ONU?", 1900, 2000, 1945, 4, "", "Nel 1945."),
    ST2("In che anno furono uccisi Falcone e Borsellino?", 1980, 2010, 1992, 2, "", "Nel 1992: Falcone a maggio, Borsellino a luglio.")
  );

  // ---------------------------------------------------------------- COMPLETA (2ª)
  cloze.italiano.push(
    CL2("Ero così stanco ___ mi addormentai subito.", ["che", "da", "perché", "come"], "La consecutiva si lega alla principale con «che» dopo «così»."),
    CL2("Poiché ___ tardi, tornammo a casa.", ["era", "fosse", "sarebbe", "sia"], "«Poiché» introduce la causale e vuole l'indicativo."),
    CL2("Se avessi studiato di più, ___ promosso.", ["sarei stato", "ero", "sarò", "fossi stato"], "Ipotesi irreale del passato: congiuntivo trapassato e condizionale passato."),
    CL2("Anna disse che ___ il giorno dopo.", ["sarebbe partita", "partirà", "è partita", "parte"], "Nel discorso indiretto al passato il futuro diventa condizionale composto."),
    CL2("Don Rodrigo manda i ___ a minacciare don Abbondio.", ["bravi", "lanzichenecchi", "cavalieri", "frati"], "I bravi sono gli sgherri armati al servizio dei signori."),
    CL2("L'eroe dell'Eneide è figlio di Venere e di ___.", ["Anchise", "Priamo", "Ettore", "Latino"], "Enea è figlio di Anchise e della dea Venere."),
    CL2("Il verso di undici sillabe si chiama ___.", ["endecasillabo", "settenario", "novenario", "decasillabo"], "È il verso più usato nella poesia italiana."),
    CL2("Il sonetto è formato da due quartine e due ___.", ["terzine", "quartine", "distici", "ottave"], "Fa 14 versi in tutto."),
    CL2("Se piove, ___ a casa.", ["resto", "resterei", "fossi rimasto", "rimanessi"], "Ipotesi della realtà: indicativo presente."),
    CL2("Mi chiese se ___ andare al cinema con lui.", ["volessi", "voglio", "vorrò", "vorrei"], "Interrogativa indiretta al passato: congiuntivo imperfetto."),
    CL2("Per quanto ___ impegnato, trovò il tempo di aiutarmi.", ["fosse", "era", "sarebbe", "è"], "La concessiva «per quanto» vuole il congiuntivo."),
    CL2("Imparò a nuotare ___ ogni giorno.", ["allenandosi", "allenarsi", "allenato", "allenasse"], "Il gerundio esprime il modo: come imparò?")
  );
  cloze.inglese.push(
    CL2("This house ___ built in 1900.", ["was", "were", "is", "has"], "Passivo al passato: was + participio passato.", { en: true }),
    CL2("Many languages ___ in India.", ["are spoken", "speak", "spoke", "is spoken"], "Passivo al presente, soggetto plurale: are spoken.", { en: true }),
    CL2("If I ___ more money, I would buy a car.", ["had", "have", "would have", "will have"], "Second conditional: if + past simple.", { en: true }),
    CL2("You look tired. You ___ go to bed early.", ["should", "may", "can", "would be"], "«Should» esprime un consiglio.", { en: true }),
    CL2("She asked me ___ I was from.", ["where", "what", "who", "when"], "Domanda indiretta: where I was from.", { en: true }),
    CL2("I used ___ play the piano when I was a child.", ["to", "for", "at", "in"], "Used to + verbo base: abitudine passata.", { en: true }),
    CL2("He has lived in Milan ___ three years.", ["for", "since", "ago", "from"], "Per indicare la durata si usa for.", { en: true }),
    CL2("She has worked here ___ 2019.", ["since", "for", "ago", "during"], "Since indica il momento d'inizio.", { en: true }),
    CL2("I'm not tall ___ to reach the shelf.", ["enough", "too", "very", "so"], "Enough segue l'aggettivo.", { en: true }),
    CL2("The test was ___ difficult that nobody passed.", ["so", "such", "too", "very"], "So + aggettivo + that.", { en: true }),
    CL2("I've ___ finished my homework. Can I go out?", ["already", "yet", "ago", "still"], "Already si usa nelle frasi affermative.", { en: true }),
    CL2("We ___ TV when the lights went out.", ["were watching", "watched", "are watching", "have watched"], "Azione in corso interrotta da un'altra: past continuous.", { en: true }),
    CL2("This is the ___ film I have ever seen.", ["best", "better", "good", "most good"], "Il superlativo di good è the best.", { en: true })
  );

  // frasi per le nuove domande «Collega ogni… al suo…»
  askRules.push(
    [/personaggio dei Promessi sposi/, "Chi è ", " nei Promessi sposi?"],
    [/termine della metrica/, "Che cosa indica ", "?"],
    [/opera al suo autore/, "Chi è l'autore di ", "?"],
    [/participio passato/, "Qual è il participio passato di ", "?"],
    [/organulo alla sua funzione/, "Qual è la funzione di ", "?"],
    [/legame al suo esempio/, "Qual è un esempio di legame ", "?"],
    [/scienziato alla sua scoperta/, "Per che cosa è famoso ", "?"],
    [/organo dell'UE alla sua funzione/, "Che cosa fa questo organo dell'UE: ", "?"]
  );

  // ================================================================ 3ª SUPERIORE (classe 10)
  const MY = { math: {}, pairs: {}, fila: {}, error: {}, stima: {} };
  const H = yr => ({
    q: (qq, a, e, x) => Object.assign({ q: qq, a, c: 0, e, cl: yr }, x || {}),
    T: (prompt, ps, x) => Object.assign({ prompt, pairs: ps, cl: yr }, x || {}),
    SQ: (p, items) => ({ p, items, cl: yr }),
    ER: (p, rows, wrong, fix, e, x) => Object.assign({ p, rows, wrong, fix, e, cl: yr }, x || {}),
    ST: (qq, min, max, ans, tol, unit, e, step) => ({ q: qq, min, max, ans, tol, unit: unit || "", e, step: step || 1, cl: yr }),
    CL: (s, opts, e, x) => Object.assign({ s, opts, c: 0, e, cl: yr }, x || {})
  });
  const poly2 = (a, b, c) => `${a === 1 ? "" : a}x² ${b < 0 ? "−" : "+"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}x ${c < 0 ? "−" : "+"} ${Math.abs(c)}`;
  const TRIG = [["sen 0°", "0"], ["sen 30°", "1/2"], ["sen 45°", "√2/2"], ["sen 60°", "√3/2"], ["sen 90°", "1"], ["cos 0°", "1"], ["cos 30°", "√3/2"], ["cos 45°", "√2/2"], ["cos 60°", "1/2"], ["cos 90°", "0"], ["tg 30°", "√3/3"], ["tg 45°", "1"], ["tg 60°", "√3"]];
  const TRIGV = ["0", "1/2", "√2/2", "√3/2", "1", "√3/3", "√3", "2", "1/3"];
  const TERNE_P = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]];
  MY.math[9] = math9; MY.pairs[9] = mathPairs9; MY.fila[9] = filaMath9; MY.error[9] = mathError9; MY.stima[9] = mathStima9;

  function math10() {
    const t = rnd(0, 10);
    if (t === 0) {   // discriminante
      const a = rnd(1, 4), b = pick([-7, -6, -5, -4, -3, -2, 2, 3, 4, 5, 6, 7]), c = pick([-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6]), d = b * b - 4 * a * c;
      return mk(`Quanto vale il discriminante di ${poly2(a, b, c)} = 0?`, sgn(d), [sgn(b * b + 4 * a * c), sgn(b * b - 2 * a * c), sgn(2 * b - 4 * a * c), sgn(-d)], `Δ = b² − 4ac = ${b * b} − (4 · ${a} · ${sgn(c)}) = ${sgn(d)}.`);
    }
    if (t === 1) {   // equazione di 2° grado con a ≠ 1
      let r1, r2;
      do { r1 = pick(ROOTS); r2 = pick(ROOTS); } while (Math.abs(r1) === Math.abs(r2));
      const a = pick([2, 3]), b = -a * (r1 + r2), c = a * r1 * r2;
      return mk(`Quali sono le soluzioni di ${poly2(a, b, c)} = 0?`, fmtRoots(r1, r2), [fmtRoots(-r1, -r2), fmtRoots(r1, -r2), fmtRoots(-r1, r2)],
        `Δ = ${sgn(b * b - 4 * a * c)}, quindi x = (${sgn(-b)} ± ${Math.abs(a * (r1 - r2))}) : ${2 * a}, cioè ${sgn(r1)} e ${sgn(r2)}.`);
    }
    if (t === 2) {   // disequazione di 2° grado
      let r1, r2;
      do { r1 = pick(ROOTS); r2 = pick(ROOTS); } while (Math.abs(r1) === Math.abs(r2));
      const lo = Math.min(r1, r2), hi = Math.max(r1, r2), eq = poly2(1, -(lo + hi), lo * hi), out = `x < ${sgn(lo)} oppure x > ${sgn(hi)}`, inn = `${sgn(lo)} < x < ${sgn(hi)}`;
      if (Math.random() < 0.5) return mk(`Risolvi: ${eq} > 0`, out, [inn, `x > ${sgn(lo)}`, `x < ${sgn(hi)}`], `Le radici sono ${sgn(lo)} e ${sgn(hi)}: la parabola è positiva all'esterno delle radici.`);
      return mk(`Risolvi: ${eq} < 0`, inn, [out, `x < ${sgn(lo)}`, `x > ${sgn(hi)}`], `Le radici sono ${sgn(lo)} e ${sgn(hi)}: la parabola è negativa tra le radici.`);
    }
    if (t === 3) {   // vertice della parabola
      const a = rnd(1, 3), h = pick([-4, -3, -2, -1, 1, 2, 3, 4, 5]), b = -2 * a * h, c = pick([-5, -4, -3, -2, 2, 3, 4, 5]);
      return mk(`Qual è l'ascissa del vertice della parabola y = ${poly2(a, b, c)}?`, sgn(h), [sgn(-h), sgn(b), sgn(2 * h), sgn(h + 1)], `x del vertice = −b : 2a = ${sgn(-b)} : ${2 * a} = ${sgn(h)}.`);
    }
    if (t === 4) {   // distanza tra due punti
      const [dx, dy, d] = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 6, 10], [9, 12, 15], [12, 5, 13]]), x1 = rnd(-4, 4), y1 = rnd(-4, 4), sx = Math.random() < 0.5 ? 1 : -1, sy = Math.random() < 0.5 ? 1 : -1;
      return mk(`Qual è la distanza tra A(${sgn(x1)}; ${sgn(y1)}) e B(${sgn(x1 + sx * dx)}; ${sgn(y1 + sy * dy)})?`, d, [dx + dy, d + 1, d - 1, d * d], `d = √(Δx² + Δy²) = √(${dx}² + ${dy}²) = √${d * d} = ${d}.`);
    }
    if (t === 5) {   // punto medio
      const mx = pick([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6]), my = pick([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6]), p = rnd(1, 5), q = rnd(1, 5);
      const P = (x, y) => `(${sgn(x)}; ${sgn(y)})`;
      return mk(`Qual è il punto medio tra A${P(mx - p, my - q)} e B${P(mx + p, my + q)}?`, P(mx, my), [P(2 * mx, 2 * my), P(p, q), P(mx + 1, my), P(mx, my + 1)], `Si fa la media delle coordinate: x = ${sgn(2 * mx)} : 2 = ${sgn(mx)}, y = ${sgn(2 * my)} : 2 = ${sgn(my)}.`);
    }
    if (t === 6) {   // rette parallele e perpendicolari
      const m = pick([-5, -4, -3, -2, 2, 3, 4, 5]);
      if (Math.random() < 0.5) return mk(`Una retta ha coefficiente angolare ${sgn(m)}. Qual è il coefficiente di una retta parallela?`, sgn(m), [sgn(-m), m > 0 ? `−1/${m}` : `1/${-m}`, `1/${Math.abs(m)}`], "Due rette parallele hanno lo stesso coefficiente angolare.");
      return mk(`Una retta ha coefficiente angolare ${sgn(m)}. Qual è il coefficiente di una retta perpendicolare?`, m > 0 ? `−1/${m}` : `1/${-m}`, [sgn(m), sgn(-m), m > 0 ? `1/${m}` : `−1/${-m}`], "Per due rette perpendicolari il prodotto dei coefficienti angolari vale −1.");
    }
    if (t === 7) {   // circonferenza
      const a = pick([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]), b = pick([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]), r = rnd(2, 9);
      const eq = `(x ${a < 0 ? "+" : "−"} ${Math.abs(a)})² + (y ${b < 0 ? "+" : "−"} ${Math.abs(b)})² = ${r * r}`, P = (x, y) => `(${sgn(x)}; ${sgn(y)})`;
      if (Math.random() < 0.5) return mk(`Qual è il raggio della circonferenza ${eq}?`, r, [r * r, 2 * r, r + 1, r - 1], `Il termine a destra è r² = ${r * r}, quindi r = ${r}.`);
      return mk(`Qual è il centro della circonferenza ${eq}?`, P(a, b), [P(-a, -b), P(a, -b), P(-a, b)], `Il centro ha coordinate opposte a quelle scritte nelle parentesi: C${P(a, b)}.`);
    }
    if (t === 8) {   // angoli notevoli
      const [l, r] = pick(TRIG);
      return mk(`Quanto vale ${l}?`, r, TRIGV.filter(v => v !== r), `${l} = ${r} (angolo notevole).`);
    }
    if (t === 9) {   // equazione esponenziale
      const b = pick([2, 3, 5]), k = rnd(2, b === 5 ? 4 : 6);
      return mk(`Risolvi: ${b}ˣ = ${b ** k}. Quanto vale x?`, k, [k + 1, k - 1, b * k, b ** k], `${b ** k} = ${b}^${k}, quindi x = ${k}.`);
    }
    // trigonometria nel triangolo rettangolo
    const [a, b, c] = pick(TERNE_P), f = pick(["sen", "cos", "tg"]);
    const val = f === "sen" ? [a, c] : f === "cos" ? [b, c] : [a, b], opts = [[a, c], [b, c], [a, b], [c, a], [b, a]].map(x => `${x[0]}/${x[1]}`), right = `${val[0]}/${val[1]}`;
    return mk(`Un triangolo rettangolo ha i cateti ${a} e ${b} e l'ipotenusa ${c}. Quanto vale ${f} α, se α è l'angolo opposto al cateto ${a}?`, right, opts.filter(o => o !== right),
      f === "sen" ? `Seno = cateto opposto : ipotenusa = ${a}/${c}.` : f === "cos" ? `Coseno = cateto adiacente : ipotenusa = ${b}/${c}.` : `Tangente = cateto opposto : cateto adiacente = ${a}/${b}.`);
  }
  function mathPairs10() {
    const gens = [
      () => { const x = pick(TRIG.filter(p => /^(sen|cos)/.test(p[0]))); return { l: x[0], r: x[1] }; },
      () => { const b = pick([2, 3]), k = rnd(2, 6); return { l: `${b}ˣ = ${b ** k}`, r: `x = ${k}` }; },
      () => { const a = pick([-4, -3, -2, -1, 1, 2, 3, 4]), b = pick([-4, -3, -2, -1, 1, 2, 3, 4]), r = rnd(2, 8); return { l: `(x ${a < 0 ? "+" : "−"} ${Math.abs(a)})² + (y ${b < 0 ? "+" : "−"} ${Math.abs(b)})² = ${r * r}`, r: `centro (${sgn(a)}; ${sgn(b)})` }; },
      () => { const [a, b, c] = pick(TERNE_P); return { l: `sen α (opposto ${a}, ipotenusa ${c})`, r: `${a}/${c}` }; }
    ];
    const gen = pick(gens), out = []; let g = 0;
    while (out.length < 4 && g++ < 300) { const p = gen(); if (!out.some(o => o.r === p.r || o.l === p.l)) out.push(p); }
    return out;
  }
  function filaMath10() {
    const sets = [["cos 90°", "cos 60°", "cos 45°", "cos 30°", "cos 0°"], ["sen 0°", "sen 30°", "sen 45°", "sen 60°", "sen 90°"], ["2⁻²", "2⁻¹", "2⁰", "2¹", "2²"], ["√2/2", "√3/2", "1", "√2", "√3"], ["−3", "−√5", "−2", "−1", "0"]];
    return { p: "Metti in fila dal più piccolo al più grande.", items: pick(sets) };
  }
  function mathError10() {
    const t = rnd(0, 2);
    if (t === 0) {   // discriminante
      const r1 = rnd(1, 6), r2 = r1 + rnd(1, 4), S = r1 + r2, P = r1 * r2;
      const rows = [`x² − ${S}x + ${P} = 0`, `Δ = (−${S})² + 4 · ${P}`, `Δ = ${S * S + 4 * P}`, `x = (${S} ± √${S * S + 4 * P}) : 2`];
      return { p: "In quale passaggio c'è il primo errore?", rows, wrong: 1, fix: `Δ = (−${S})² − 4 · ${P}`, e: "Il discriminante è b² − 4ac: il termine 4ac si sottrae.", steps: true };
    }
    if (t === 1) {   // disequazione di 2° grado
      const r1 = rnd(1, 5), r2 = r1 + rnd(1, 4);
      const rows = [`x² − ${r1 + r2}x + ${r1 * r2} < 0`, `(x − ${r1})(x − ${r2}) < 0`, `x < ${r1} oppure x > ${r2}`];
      return { p: "In quale passaggio c'è l'errore?", rows, wrong: 2, fix: `${r1} < x < ${r2}`, e: "Il prodotto è negativo tra le due radici: la soluzione è l'intervallo interno.", steps: true };
    }
    const [dx, dy, d] = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 6, 10]]), x1 = rnd(0, 3), y1 = rnd(0, 3);
    const rows = [`d = √((${x1 + dx} − ${x1})² + (${y1 + dy} − ${y1})²)`, `d = √((${dx} + ${dy})²)`, `d = √${(dx + dy) ** 2}`, `d = ${dx + dy}`];
    return { p: "In quale passaggio c'è il primo errore?", rows, wrong: 1, fix: `d = √(${dx}² + ${dy}²)`, e: "Si elevano al quadrato le due differenze separatamente e poi si sommano.", steps: true };
  }
  function mathStima10() {
    const t = rnd(0, 2);
    if (t === 0) { const r = pick([3, 5, 7, 10, 12]), v = Math.round(2 * 3.14 * r); return { q: `Stima la lunghezza di una circonferenza di raggio ${r} cm (usa π ≈ 3,14).`, min: 0, max: 100, ans: v, tol: Math.max(2, Math.round(v * 0.06)), unit: "cm", step: 1, e: `C = 2πr ≈ 2 · 3,14 · ${r} ≈ ${v} cm.` }; }
    if (t === 1) { const n = pick([300, 450, 600, 700, 800, 900]), v = Math.round(Math.sqrt(n) * 10) / 10; return { q: `Stima la radice quadrata di ${n}.`, min: 0, max: 40, ans: v, tol: 1, unit: "", step: 0.1, e: `√${n} ≈ ${String(v).replace(".", ",")}.` }; }
    const dx = pick([2, 3, 5, 6, 7]), dy = pick([4, 5, 8, 9]), v = Math.round(Math.sqrt(dx * dx + dy * dy) * 10) / 10;
    return { q: `Stima la distanza tra A(0; 0) e B(${dx}; ${dy}).`, min: 0, max: 15, ans: v, tol: 0.5, unit: "", step: 0.1, e: `d = √(${dx}² + ${dy}²) = √${dx * dx + dy * dy} ≈ ${String(v).replace(".", ",")}.` };
  }
  MY.math[10] = math10; MY.pairs[10] = mathPairs10; MY.fila[10] = filaMath10; MY.error[10] = mathError10; MY.stima[10] = mathStima10;

  const { q: q3, T: q3p, SQ: SQ3, ER: ER3, ST: ST3, CL: CL3 } = H([10, 10]);
  BANK.italiano.push(
    q3("In quale lingua scrisse Dante la «Commedia»?", ["Nel volgare fiorentino", "In latino", "In provenzale", "In siciliano"], "Dante scelse il volgare perché fosse comprensibile a tutti."),
    q3("Quanti canti ha in tutto la Divina Commedia?", ["100", "99", "33", "66"], "Un canto introduttivo più 33 per ciascuna delle tre cantiche."),
    q3("Chi guida Dante nell'Inferno e nel Purgatorio?", ["Virgilio", "Beatrice", "Omero", "Ulisse"], "Virgilio rappresenta la ragione umana."),
    q3("Quale schema di rime ha la Commedia?", ["Terzine a rima incatenata (ABA BCB)", "Quartine a rima baciata", "Ottave", "Sonetti"], "È la terza rima, inventata da Dante."),
    q3("Che cos'è il contrappasso?", ["La pena legata al peccato per analogia o per contrasto", "Il premio dei beati", "Il passaggio tra Inferno e Purgatorio", "La struttura dell'Inferno"], "Ogni dannato subisce una pena che richiama la sua colpa."),
    q3("Chi sono Paolo e Francesca nel canto V dell'Inferno?", ["Due amanti, nel cerchio dei lussuriosi", "Due traditori", "Due eretici", "Due violenti"], "Il canto V è nel secondo cerchio."),
    q3("Che cos'è il Canzoniere di Petrarca?", ["Una raccolta di liriche, in gran parte per Laura", "Un poema epico", "Una raccolta di novelle", "Un trattato politico"], "È formato da 366 componimenti, in prevalenza sonetti."),
    q3("Quante novelle ha il Decameron?", ["Cento", "Cinquanta", "Settanta", "Mille"], "Dieci giovani raccontano una novella al giorno per dieci giorni."),
    q3("Da che cosa fuggono i dieci giovani del Decameron?", ["Dalla peste di Firenze del 1348", "Da una guerra", "Da una carestia", "Da un'alluvione"], "Si rifugiano in campagna e passano il tempo raccontando."),
    q3("Che cosa caratterizza l'Umanesimo?", ["Il ritorno ai classici e la centralità dell'uomo", "Il primato assoluto della fede", "Il rifiuto di latino e greco", "La scienza sperimentale"], "Gli umanisti riscoprono gli autori antichi e valorizzano l'uomo."),
    q3("Chi scrisse «Il Principe»?", ["Niccolò Machiavelli", "Francesco Guicciardini", "Pietro Bembo", "Torquato Tasso"], "Machiavelli lo scrisse nel 1513 e vi analizza come si conquista e si conserva il potere."),
    q3("Quale poema cavalleresco scrisse Ludovico Ariosto?", ["Orlando furioso", "Gerusalemme liberata", "Morgante", "Orlando innamorato"], "L'«Orlando innamorato» è di Boiardo."),
    q3("Che cos'è il Dolce stil novo?", ["Una corrente poetica che lega amore e nobiltà d'animo", "Un ordine monastico", "Una lingua", "Un'opera di Dante"], "Ne fanno parte Guinizzelli, Cavalcanti e il giovane Dante."),
    q3("Chi scrisse il «Cantico delle creature»?", ["Francesco d'Assisi", "Jacopone da Todi", "Dante", "Petrarca"], "È uno dei primi testi poetici in volgare italiano."),
    q3("Quale scuola poetica nasce alla corte di Federico II?", ["La scuola siciliana", "Il Dolce stil novo", "L'Arcadia", "La scuola toscana"], "I poeti siciliani cantano l'amore cortese in volgare."),
    q3("Che cos'è l'ottava?", ["Una strofa di otto endecasillabi (ABABABCC)", "Un verso di otto sillabe", "Un poema di otto canti", "Una rima di otto versi"], "È la strofa dei poemi cavallereschi."),
    q3("Che cos'è «Il Cortegiano» di Castiglione?", ["Un trattato sul perfetto uomo di corte", "Un poema epico", "Una commedia", "Una raccolta di novelle"], "Descrive le qualità del cortigiano ideale nell'Italia rinascimentale."),
    q3("Che cos'è l'allegoria?", ["Un racconto con un significato nascosto, figurato", "Una figura di suono", "Un verso lungo", "Una parola straniera"], "Il viaggio di Dante nell'oltretomba è allegorico."),
    q3("Che cos'è la sinestesia?", ["L'accostamento di sensazioni di sensi diversi", "La ripetizione di una parola", "L'omissione di una parola", "Un contrasto tra opposti"], "Esempio: «colore caldo»."),
    q3("Che cos'è la perifrasi?", ["Un giro di parole per indicare qualcosa", "Un paragone", "Una parola mancante", "Una ripetizione di suoni"], "Esempio: «la città eterna» per Roma."),
    q3("Che cos'è un saggio breve?", ["Un testo argomentativo basato su documenti", "Un racconto", "Una poesia", "Una cronaca"], "Si sostiene una tesi usando i documenti forniti."),
    q3("Quale cerchio dell'Inferno ospita i lussuriosi?", ["Il secondo", "Il primo", "Il terzo", "Il quinto"], "Nel primo c'è il Limbo; nel terzo i golosi.")
  );
  BANK.inglese.push(
    q3("Completa: «By the time we arrived, the film ___ .»", ["had already started", "already started", "has already started", "was already starting"], "Un'azione precedente a un'altra nel passato: past perfect.", { ae: true, en: ["By the time we arrived, the film ___ ."] }),
    q3("Completa: «If I had studied harder, I ___ the exam.»", ["would have passed", "would pass", "will pass", "had passed"], "Third conditional: if + past perfect, would have + participio.", { ae: true, en: ["If I had studied harder, I ___ the exam."] }),
    q3("Completa: «I wish I ___ more free time.»", ["had", "have", "would have", "has"], "Dopo «wish» per un desiderio sul presente si usa il past simple.", { ae: true, en: ["I wish I ___ more free time."] }),
    q3("Completa: «The lights are on, so she ___ be at home.»", ["must", "can't", "needn't", "shouldn't"], "«Must» esprime una deduzione sicura.", { ae: true, en: ["The lights are on, so she ___ be at home."] }),
    q3("Completa: «The room ___ cleaned yet.»", ["hasn't been", "isn't", "hasn't", "wasn't being"], "Present perfect passivo: has/have been + participio passato.", { ae: true, en: ["The room ___ cleaned yet."] }),
    q3("Completa: «He suggested ___ to the cinema.»", ["going", "to go", "go", "went"], "Dopo «suggest» il verbo va in -ing.", { ae: true, en: ["He suggested ___ to the cinema."] }),
    q3("Completa: «I'm used to ___ up early.»", ["getting", "get", "got", "to get"], "«Be used to» è seguito dalla forma in -ing.", { ae: true, en: ["I'm used to ___ up early."] }),
    q3("Completa: «I'll call you as soon as I ___ home.»", ["get", "will get", "got", "am getting"], "Nelle frasi temporali al futuro si usa il present simple.", { ae: true, en: ["I'll call you as soon as I ___ home."] }),
    q3("Completa: «She told me she ___ the film the day before.»", ["had seen", "saw", "has seen", "would see"], "Nel discorso indiretto il past simple diventa past perfect.", { ae: true, en: ["She told me she ___ the film the day before."] }),
    q3("Completa: «The man ___ car was stolen called the police.»", ["whose", "who", "which", "whom"], "«Whose» indica possesso.", { ae: true, en: ["The man ___ car was stolen called the police."] }),
    q3("Completa: «The more you practise, ___ you become.»", ["the better", "better", "the best", "best"], "Doppio comparativo: the more… the better.", { ae: true, en: ["The more you practise, ___ you become."] }),
    q3("Completa: «Despite ___ tired, she kept working.»", ["being", "be", "she was", "of being"], "Dopo «despite» si usa un nome o la forma in -ing.", { ae: true, en: ["Despite ___ tired, she kept working."] }),
    q3("Completa: «___ it was raining, we went out.»", ["Although", "Despite", "Because", "So"], "«Although» introduce una frase; «despite» vuole un nome.", { ae: true, en: ["___ it was raining, we went out."] }),
    q3("Completa: «You ___ better take an umbrella.»", ["had", "would", "should", "did"], "«Had better» + verbo base esprime un consiglio forte.", { ae: true, en: ["You ___ better take an umbrella."] }),
    q3("Completa: «I look forward to ___ from you.»", ["hearing", "hear", "heard", "to hear"], "Dopo «look forward to» si usa -ing.", { ae: true, en: ["I look forward to ___ from you."] }),
    q3("Qual è il past participle di «to begin»?", ["begun", "began", "beginned", "begin"], "Begin – began – begun.", { ae: true, en: ["to begin"] }),
    q3("Che cosa significa «to put off»?", ["Rimandare", "Spegnere", "Indossare", "Mettere via"], "«I put off the meeting» = ho rimandato la riunione.", { en: ["to put off"] }),
    q3("Che cosa significa «to carry out»?", ["Eseguire, portare a termine", "Portare fuori", "Trasportare", "Rifiutare"], "Si usa per esperimenti, piani, ordini.", { en: ["to carry out"] }),
    q3("Che cosa significa «to run out of»?", ["Esaurire, finire", "Correre fuori", "Dirigere", "Fuggire"], "«We ran out of milk» = abbiamo finito il latte.", { en: ["to run out of"] }),
    q3("Che cosa significa «to get along with»?", ["Andare d'accordo con", "Avanzare", "Ottenere", "Superare"], "Si dice di rapporti tra persone.", { en: ["to get along with"] }),
    q3("Che cosa significa «to pretend»?", ["Fingere", "Pretendere", "Chiedere", "Sperare"], "Falso amico: «pretendere» si dice «to demand».", { en: ["to pretend"] }),
    q3("Che cosa significa «fabric»?", ["Tessuto", "Fabbrica", "Fabbro", "Fabbricato"], "Falso amico: la fabbrica è «factory».", { en: ["fabric"] }),
    q3("Che cosa significa «lecture»?", ["Lezione universitaria, conferenza", "Lettura", "Lettera", "Libreria"], "Falso amico: la lettura è «reading».", { en: ["lecture"] })
  );
  BANK.storia.push(
    q3("Che cosa erano i comuni nell'XI-XII secolo?", ["Città che si governavano da sé con magistrati eletti", "Territori del re", "Monasteri fortificati", "Eserciti mercenari"], "Nacquero in Italia centro-settentrionale dall'unione di cittadini."),
    q3("Che cosa fu la lotta per le investiture?", ["Lo scontro tra papa e imperatore sulla nomina dei vescovi", "Una guerra tra comuni", "Una crociata", "Una rivolta di contadini"], "Contrappose papa Gregorio VII e l'imperatore Enrico IV."),
    q3("Che cosa stabilì il Concordato di Worms (1122)?", ["Che la Chiesa nominasse i vescovi, e l'imperatore li investisse del potere temporale", "La fine dell'impero", "L'inizio delle crociate", "L'indipendenza dei comuni"], "Pose fine alla lotta per le investiture."),
    q3("Chi fu sconfitto dai comuni a Legnano nel 1176?", ["Federico Barbarossa", "Ottone I", "Carlo Magno", "Federico II"], "I comuni della Lega lombarda fermarono l'imperatore."),
    q3("Che cosa furono le crociate?", ["Spedizioni militari cristiane per liberare Gerusalemme", "Guerre tra Francia e Inghilterra", "Rivolte contadine", "Pellegrinaggi pacifici"], "La prima fu bandita nel 1095 da papa Urbano II."),
    q3("Quale città conquistarono i crociati nel 1099?", ["Gerusalemme", "Costantinopoli", "Damasco", "Il Cairo"], "Al termine della prima crociata."),
    q3("Che cos'era la Magna Charta del 1215?", ["Un documento che limitava il potere del re d'Inghilterra", "La carta dei comuni italiani", "Il codice di Giustiniano", "Il trattato di Verdun"], "Fu imposta dai baroni a Giovanni Senzaterra."),
    q3("Che cosa fu la peste nera del 1348?", ["Un'epidemia che uccise circa un terzo degli europei", "Una guerra tra Venezia e Genova", "Una crociata", "Una carestia"], "Arrivò in Europa dai porti del Mediterraneo."),
    q3("Quale conflitto oppose Francia e Inghilterra dal 1337 al 1453?", ["La guerra dei cent'anni", "La guerra delle due rose", "La guerra dei trent'anni", "La guerra di successione"], "Durò più di cento anni, con lunghe tregue."),
    q3("Chi fu Giovanna d'Arco?", ["La contadina che guidò i Francesi contro gli Inglesi", "La regina d'Inghilterra", "La moglie di Carlo Magno", "Una badessa"], "Fu condannata al rogo nel 1431."),
    q3("Che cos'è la signoria?", ["Il governo di una sola famiglia su una città", "Il governo di un'assemblea popolare", "Il governo dei vescovi", "Il governo straniero"], "Molti comuni italiani diventarono signorie nel Trecento-Quattrocento."),
    q3("Che cosa fu la Pace di Lodi (1454)?", ["Un accordo tra gli Stati italiani per un equilibrio politico", "La fine della guerra dei cent'anni", "La fine delle crociate", "La pace con i Turchi"], "Garantì all'Italia alcuni decenni di relativa stabilità."),
    q3("Quale evento del 1453 segnò la fine dell'impero bizantino?", ["La conquista turca di Costantinopoli", "La peste", "Il sacco di Roma", "La battaglia di Lepanto"], "I Turchi ottomani presero la città con Maometto II."),
    q3("Quale invenzione di Gutenberg cambiò la diffusione dei libri?", ["La stampa a caratteri mobili", "La carta", "La bussola", "La polvere da sparo"], "Verso il 1455 stampò la Bibbia."),
    q3("In che anno Colombo sbarcò in America?", ["1492", "1453", "1517", "1498"], "Il 12 ottobre 1492 arrivò nelle Bahamas."),
    q3("Chi raggiunse l'India circumnavigando l'Africa nel 1498?", ["Vasco da Gama", "Cristoforo Colombo", "Magellano", "Amerigo Vespucci"], "Aprì la rotta portoghese delle spezie."),
    q3("Quale spedizione compì per la prima volta il giro del mondo (1519-22)?", ["Quella di Magellano e Elcano", "Quella di Colombo", "Quella di Cortés", "Quella di Vasco da Gama"], "Magellano morì nelle Filippine; la completò Elcano."),
    q3("Quale impero conquistò Cortés?", ["Quello azteco", "Quello inca", "Quello maya", "Quello ottomano"], "L'impero inca fu conquistato da Pizarro."),
    q3("Che cosa fu la Riforma protestante?", ["Il movimento religioso iniziato da Lutero nel 1517", "Un concilio cattolico", "Una crociata", "Un ordine monastico"], "Nacque dalla critica alla Chiesa di Roma, in particolare alle indulgenze."),
    q3("Che cosa erano le indulgenze?", ["Riduzioni della pena per i peccati, spesso in cambio di denaro", "Tasse sui contadini", "Titoli nobiliari", "Reliquie"], "La loro vendita provocò la protesta di Lutero."),
    q3("Che cosa sostenne Calvino sulla salvezza?", ["La predestinazione", "Il valore delle indulgenze", "Il libero arbitrio assoluto", "Il purgatorio"], "Dio ha già deciso chi sarà salvato."),
    q3("Quale concilio avviò la Controriforma cattolica?", ["Il Concilio di Trento", "Il Concilio di Nicea", "Il Concilio di Costanza", "Il Concilio di Worms"], "Si tenne dal 1545 al 1563."),
    q3("Che cosa stabilì la Pace di Augusta (1555)?", ["Che i sudditi seguissero la religione del loro principe", "La libertà religiosa per tutti", "La pace tra Francia e Spagna", "La fine dei Protestanti"], "Fu risolta così la guerra tra principi luterani e cattolici in Germania."),
    q3("Chi fu Carlo V?", ["L'imperatore con domini in Spagna, Austria e Americhe", "Il re di Francia", "Un papa", "Il re d'Inghilterra"], "Governò un impero vastissimo, diviso poi tra il figlio e il fratello."),
    q3("Che cosa fu la battaglia di Lepanto (1571)?", ["Una vittoria navale cristiana sui Turchi", "Una sconfitta cristiana", "Una battaglia terrestre", "Una rivolta nei Paesi Bassi"], "La Lega Santa sconfisse la flotta ottomana.")
  );
  BANK.scienze.push(
    q3("Quali sono i tre strati principali della Terra?", ["Crosta, mantello e nucleo", "Troposfera, stratosfera e mesosfera", "Litosfera, idrosfera e atmosfera", "Magma, lava e cenere"], "La crosta è il guscio esterno; il nucleo è ricco di ferro e nichel."),
    q3("Chi propose la teoria della deriva dei continenti?", ["Alfred Wegener", "Charles Darwin", "Galileo Galilei", "Isaac Newton"], "Wegener la propose nel 1912."),
    q3("Che cosa afferma la tettonica a zolle?", ["La litosfera è divisa in placche in movimento", "I continenti sono fermi", "Il mantello è immobile", "La Terra si espande"], "Le placche si muovono di pochi centimetri all'anno."),
    q3("Che cosa avviene ai margini convergenti?", ["Le placche si avvicinano e si scontrano", "Le placche si allontanano", "Le placche scorrono affiancate", "Non c'è movimento"], "Si formano catene montuose o zone di subduzione."),
    q3("Che cosa si forma lungo le dorsali oceaniche?", ["Nuova crosta oceanica", "Catene montuose", "Fosse oceaniche", "Deserti"], "Il magma sale e si solidifica tra le placche che si allontanano."),
    q3("Che cos'è l'ipocentro di un terremoto?", ["Il punto interno da cui parte il sisma", "Il punto in superficie sopra il sisma", "L'onda più veloce", "Una faglia"], "L'epicentro è il punto in superficie sopra l'ipocentro."),
    q3("Quale scala misura l'energia di un terremoto?", ["La magnitudo (scala Richter)", "La scala Mercalli", "La scala Kelvin", "La scala Beaufort"], "La Mercalli misura invece gli effetti (intensità)."),
    q3("Quali onde sismiche sono le più veloci?", ["Le onde P", "Le onde S", "Le onde superficiali", "Le onde radio"], "Arrivano per prime ai sismografi."),
    q3("Che cos'è il magma?", ["Roccia fusa sotto la superficie", "Lava solidificata", "Cenere", "Gas vulcanico"], "Quando esce in superficie si chiama lava."),
    q3("Qual è il più alto vulcano attivo d'Europa?", ["L'Etna", "Il Vesuvio", "Stromboli", "Vulcano"], "L'Etna è in Sicilia."),
    q3("Come si chiama il processo che trasforma i sedimenti in roccia?", ["Diagenesi", "Fusione", "Metamorfismo", "Erosione"], "I sedimenti si compattano e si cementano."),
    q3("Quante particelle contiene una mole di sostanza?", ["6,022 · 10²³", "6,022 · 10³²", "1,602 · 10⁻¹⁹", "9,81"], "È il numero di Avogadro."),
    q3("Qual è la massa molare dell'acqua (H₂O)?", ["18 g/mol", "16 g/mol", "10 g/mol", "34 g/mol"], "2 · 1 + 16 = 18."),
    q3("Che cos'è l'ossidazione?", ["Una perdita di elettroni", "Un acquisto di elettroni", "Un acquisto di protoni", "Una perdita di neutroni"], "È sempre accompagnata da una riduzione."),
    q3("Che cos'è un catalizzatore?", ["Una sostanza che accelera la reazione senza consumarsi", "Un reagente", "Un prodotto", "Un solvente"], "Abbassa l'energia necessaria per far partire la reazione."),
    q3("Che cos'è una reazione esotermica?", ["Una reazione che libera calore", "Una reazione che assorbe calore", "Una reazione senza energia", "Una reazione solo in acqua"], "La combustione è esotermica."),
    q3("Qual è il bilanciamento corretto di H₂ + O₂ → H₂O?", ["2H₂ + O₂ → 2H₂O", "H₂ + O₂ → H₂O", "H₂ + 2O₂ → 2H₂O", "2H₂ + 2O₂ → H₂O"], "Servono 4 atomi di H e 2 di O per lato."),
    q3("Che cosa libera in acqua un acido, secondo Arrhenius?", ["Ioni H⁺", "Ioni OH⁻", "Elettroni", "Neutroni"], "Una base libera ioni OH⁻."),
    q3("Che cosa produce una neutralizzazione?", ["Un sale e acqua", "Un gas", "Solo acqua", "Un metallo"], "Acido + base → sale + acqua."),
    q3("Qual è la formula dell'acido cloridrico?", ["HCl", "NaCl", "H₂SO₄", "NaOH"], "È formato da idrogeno e cloro."),
    q3("Che cosa studia la chimica organica?", ["I composti del carbonio", "I metalli", "I gas nobili", "Le rocce"], "Comprende idrocarburi, alcoli, proteine e molto altro."),
    q3("Quanti legami forma di solito un atomo di carbonio?", ["4", "2", "3", "6"], "Ha quattro elettroni di valenza."),
    q3("Qual è la formula del metano?", ["CH₄", "C₂H₆", "CO₂", "C₂H₄"], "È l'idrocarburo più semplice.")
  );
  BANK.civica.push(
    q3("Quale articolo riconosce il diritto di sciopero?", ["Articolo 40", "Articolo 36", "Articolo 39", "Articolo 41"], "Lo sciopero si esercita nell'ambito delle leggi che lo regolano."),
    q3("Che cosa prevede l'articolo 36?", ["Una retribuzione proporzionata e sufficiente", "La libertà di stampa", "Il diritto di voto", "La tutela del paesaggio"], "Il lavoratore ha diritto a una retribuzione che garantisca a lui e alla famiglia un'esistenza libera e dignitosa."),
    q3("Che cos'è un referendum abrogativo?", ["Un voto per cancellare in tutto o in parte una legge", "Un voto per approvare una nuova legge", "Un voto per eleggere il Presidente", "Un voto per sciogliere le Camere"], "È previsto dall'articolo 75."),
    q3("Perché il referendum abrogativo sia valido…", ["Deve votare la maggioranza degli aventi diritto", "Deve votare il 25%", "Serve il voto del Senato", "Non serve alcun quorum"], "Si chiama quorum di partecipazione."),
    q3("Quanti giudici ha la Corte costituzionale?", ["15", "9", "12", "20"], "Cinque nominati dal Presidente, cinque dal Parlamento e cinque dalle magistrature."),
    q3("Che cos'è il Consiglio superiore della magistratura?", ["L'organo di autogoverno dei magistrati", "Un tribunale", "Un sindacato", "Il governo dei giudici"], "Garantisce l'indipendenza della magistratura."),
    q3("Quante sono le Regioni italiane?", ["20", "15", "21", "18"], "Cinque hanno uno statuto speciale."),
    q3("Quante sono le Regioni a statuto speciale?", ["5", "3", "8", "12"], "Sicilia, Sardegna, Valle d'Aosta, Trentino-Alto Adige e Friuli-Venezia Giulia."),
    q3("Che cosa afferma il principio di sussidiarietà?", ["Le decisioni vanno prese al livello più vicino ai cittadini", "Tutto spetta allo Stato", "Tutto spetta alle Regioni", "Le leggi si approvano a maggioranza qualificata"], "Lo Stato interviene solo se i livelli più vicini non bastano."),
    q3("Che cos'è la separazione dei poteri?", ["Legislativo, esecutivo e giudiziario affidati a organi diversi", "Il Governo fa le leggi", "I giudici fanno le leggi", "Il Parlamento giudica"], "Serve a evitare l'abuso di potere."),
    q3("Chi teorizzò la separazione dei poteri?", ["Montesquieu", "Rousseau", "Hobbes", "Machiavelli"], "Lo fece nello «Spirito delle leggi»."),
    q3("Che cosa afferma l'articolo 49?", ["Il diritto di associarsi in partiti", "Il voto obbligatorio", "Il lavoro come dovere", "La scuola aperta a tutti"], "I partiti concorrono a determinare la politica nazionale."),
    q3("Che cosa afferma l'articolo 19?", ["La libertà di professare la propria fede religiosa", "La libertà di stampa", "La libertà di associazione", "Il diritto allo studio"], "Tutti possono professare liberamente la propria fede."),
    q3("Che cosa afferma l'articolo 17?", ["Il diritto di riunirsi pacificamente e senz'armi", "Il diritto di associarsi", "La libertà di stampa", "Il diritto d'asilo"], "Per le riunioni in luogo pubblico serve il preavviso alle autorità."),
    q3("Che cosa afferma l'articolo 18?", ["Il diritto di associarsi liberamente", "Il diritto di riunione", "Il diritto al lavoro", "La libertà di culto"], "Sono vietate le associazioni segrete."),
    q3("Che cos'è il decreto-legge?", ["Un atto del Governo con forza di legge, da convertire entro 60 giorni", "Una legge del Parlamento", "Un regolamento comunale", "Una sentenza"], "Se il Parlamento non lo converte, perde efficacia."),
    q3("Chi può sciogliere le Camere?", ["Il Presidente della Repubblica", "Il Presidente del Consiglio", "La Corte costituzionale", "Il popolo con un referendum"], "Lo fa dopo aver sentito i presidenti delle Camere."),
    q3("Che cos'è il quorum?", ["Il numero minimo di presenti o votanti per rendere valida una votazione", "Il numero massimo di voti", "Il risultato di un voto", "La data di un'elezione"], "Esiste sia per il referendum sia per le sedute parlamentari."),
    q3("Che cos'è il suffragio universale?", ["Il diritto di voto per tutti i cittadini maggiorenni", "Il voto solo per i ricchi", "Il voto solo per gli uomini", "Il voto obbligatorio"], "In Italia le donne votarono a livello nazionale per la prima volta nel 1946."),
    q3("Che cosa afferma l'articolo 41?", ["La libertà dell'iniziativa economica privata", "La proprietà solo dello Stato", "Il diritto di sciopero", "L'obbligo di voto"], "L'iniziativa privata non deve svolgersi in contrasto con l'utilità sociale."),
    q3("Qual è la differenza tra Stato e Governo?", ["Lo Stato è l'insieme delle istituzioni; il Governo dirige il potere esecutivo", "Sono la stessa cosa", "Il Governo è più grande dello Stato", "Lo Stato è solo il Parlamento"], "I governi cambiano, lo Stato resta."),
    q3("Chi nomina il Presidente del Consiglio?", ["Il Presidente della Repubblica", "Il Parlamento in seduta comune", "Il popolo", "La Corte costituzionale"], "Poi il Governo deve ottenere la fiducia delle Camere.")
  );

  pairs.italiano.push(
    q3p("Collega ogni opera al suo autore.", [["Divina Commedia", "Dante"], ["Canzoniere", "Petrarca"], ["Decameron", "Boccaccio"], ["Il Principe", "Machiavelli"], ["Orlando furioso", "Ariosto"], ["Cantico delle creature", "Francesco d'Assisi"]]),
    q3p("Collega ogni personaggio della Commedia al suo ruolo.", [["Virgilio", "guida di Dante"], ["Beatrice", "donna amata da Dante"], ["Caronte", "traghettatore delle anime"], ["Minosse", "giudice infernale"], ["Cerbero", "custode dei golosi"], ["Lucifero", "al centro dell'Inferno"]]),
    q3p("Collega ogni figura retorica al suo esempio.", [["Perifrasi", "la città eterna"], ["Litote", "non è stupido"], ["Metonimia", "bere un bicchiere"], ["Sineddoche", "cento vele all'orizzonte"], ["Sinestesia", "colore caldo"]]),
    q3p("Collega ogni corrente alla sua caratteristica.", [["Scuola siciliana", "corte di Federico II"], ["Dolce stil novo", "amore e nobiltà d'animo"], ["Umanesimo", "riscoperta dei classici"], ["Petrarchismo", "imitazione del Canzoniere"]])
  );
  pairs.inglese.push(
    q3p("Collega ogni verbo al suo past simple.", [["begin", "began"], ["forget", "forgot"], ["hide", "hid"], ["lend", "lent"], ["swim", "swam"], ["wear", "wore"], ["throw", "threw"], ["fly", "flew"]], { rEn: true }),
    q3p("Collega ogni phrasal verb al suo significato.", [["put off", "rimandare"], ["run out of", "esaurire"], ["carry out", "eseguire"], ["give up", "arrendersi"], ["find out", "scoprire"], ["look after", "prendersi cura di"]]),
    q3p("Collega ogni parola alla sua traduzione.", [["pretend", "fingere"], ["fabric", "tessuto"], ["lecture", "lezione universitaria"], ["sympathetic", "comprensivo"], ["resume", "riprendere"], ["assist", "aiutare"]]),
    q3p("Collega ogni aggettivo al suo contrario.", [["optimistic", "pessimistic"], ["temporary", "permanent"], ["visible", "invisible"], ["flexible", "rigid"], ["accurate", "inaccurate"], ["private", "public"]], { rEn: true })
  );
  pairs.storia.push(
    q3p("Collega ogni data al suo avvenimento.", [["1095", "prima crociata"], ["1176", "battaglia di Legnano"], ["1215", "Magna Charta"], ["1348", "peste nera"], ["1453", "caduta di Costantinopoli"], ["1492", "Colombo in America"], ["1517", "95 tesi di Lutero"], ["1571", "battaglia di Lepanto"]]),
    q3p("Collega ogni personaggio alla sua impresa.", [["Federico Barbarossa", "sconfitto a Legnano"], ["Lorenzo il Magnifico", "signore di Firenze"], ["Colombo", "scoperta dell'America"], ["Lutero", "Riforma protestante"], ["Carlo V", "imperatore asburgico"], ["Gutenberg", "stampa a caratteri mobili"], ["Magellano", "primo giro del mondo"], ["Vasco da Gama", "rotta per l'India"]]),
    q3p("Collega ogni termine al suo significato.", [["Comune", "città autogovernata"], ["Signoria", "potere di una famiglia"], ["Crociata", "guerra santa"], ["Indulgenza", "sconto di pena"], ["Predestinazione", "salvezza decisa da Dio"], ["Contado", "campagna attorno alla città"]]),
    q3p("Collega ogni civiltà al suo territorio.", [["Aztechi", "Messico"], ["Inca", "Ande (Perù)"], ["Maya", "Yucatán"], ["Ottomani", "Anatolia"], ["Normanni", "Italia meridionale"], ["Mongoli", "Asia centrale"]])
  );
  pairs.scienze.push(
    q3p("Collega ogni formula al suo nome.", [["HCl", "acido cloridrico"], ["NaOH", "idrossido di sodio"], ["H₂SO₄", "acido solforico"], ["CO₂", "anidride carbonica"], ["CH₄", "metano"], ["NaCl", "cloruro di sodio"]]),
    q3p("Collega ogni termine al suo significato.", [["Ipocentro", "punto d'origine del sisma"], ["Epicentro", "punto in superficie sopra l'ipocentro"], ["Magnitudo", "energia liberata"], ["Faglia", "frattura della crosta"], ["Onde P", "onde più veloci"]]),
    q3p("Collega ogni vulcano alla sua località.", [["Etna", "Sicilia"], ["Vesuvio", "Campania"], ["Stromboli", "Isole Eolie"], ["Fuji", "Giappone"], ["Krakatoa", "Indonesia"], ["Mauna Loa", "Hawaii"]]),
    q3p("Collega ogni elemento al suo simbolo.", [["Fosforo", "P"], ["Litio", "Li"], ["Stagno", "Sn"], ["Piombo", "Pb"], ["Mercurio", "Hg"], ["Zinco", "Zn"], ["Silicio", "Si"], ["Fluoro", "F"]])
  );
  pairs.civica.push(
    q3p("Collega ogni articolo della Carta al suo tema.", [["Art. 17", "riunione"], ["Art. 18", "associazione"], ["Art. 19", "libertà religiosa"], ["Art. 36", "retribuzione"], ["Art. 40", "sciopero"], ["Art. 41", "iniziativa economica"], ["Art. 49", "partiti"]]),
    q3p("Collega ogni organo alla sua funzione.", [["Corte costituzionale", "giudica le leggi"], ["CSM", "autogoverno dei magistrati"], ["Parlamento", "approva le leggi"], ["Governo", "guida l'esecutivo"], ["Presidente della Repubblica", "nomina il Presidente del Consiglio"]]),
    q3p("Collega ogni data alla sua ricorrenza.", [["10 febbraio", "Giorno del Ricordo"], ["8 marzo", "Giornata della donna"], ["23 maggio", "strage di Capaci"], ["19 luglio", "strage di via D'Amelio"], ["4 novembre", "Forze armate"], ["2 giugno", "Festa della Repubblica"]]),
    q3p("Collega ogni Regione al suo capoluogo.", [["Lombardia", "Milano"], ["Piemonte", "Torino"], ["Veneto", "Venezia"], ["Toscana", "Firenze"], ["Campania", "Napoli"], ["Puglia", "Bari"], ["Sicilia", "Palermo"], ["Emilia-Romagna", "Bologna"]])
  );

  seqs.storia.push(
    SQ3("Metti in ordine di tempo, dal più antico.", ["Lotta per le investiture", "Concordato di Worms", "Battaglia di Legnano", "Magna Charta", "Peste nera"]),
    SQ3("Metti in ordine di tempo, dal più antico.", ["Caduta di Costantinopoli", "Pace di Lodi", "Colombo in America", "Vasco da Gama in India", "Tesi di Lutero"]),
    SQ3("Metti in ordine di tempo, dal più antico.", ["Peste nera", "Giovanna d'Arco", "Caduta di Costantinopoli", "Scoperta dell'America"]),
    SQ3("Metti in ordine di tempo, dal più antico.", ["Tesi di Lutero", "Sacco di Roma", "Inizio del Concilio di Trento", "Pace di Augusta", "Battaglia di Lepanto"])
  );
  seqs.scienze.push(
    SQ3("Metti in fila le fasi di formazione di una roccia sedimentaria.", ["Erosione", "Trasporto", "Sedimentazione", "Diagenesi"]),
    SQ3("Metti in fila dal più acido al più basico.", ["Succo di limone", "Aceto", "Acqua pura", "Bicarbonato", "Candeggina"]),
    SQ3("Metti in fila per numero atomico crescente.", ["Idrogeno", "Elio", "Litio", "Berillio", "Boro"])
  );
  seqs.civica.push(
    SQ3("Metti in ordine di tempo, dal più antico.", ["Statuto albertino", "Unità d'Italia", "Voto alle donne", "Costituzione", "Referendum sul divorzio"]),
    SQ3("Metti in fila i passaggi per formare un Governo.", ["Elezioni politiche", "Consultazioni del Presidente", "Nomina del Presidente del Consiglio", "Giuramento del Governo", "Voto di fiducia delle Camere"])
  );
  seqs.italiano.push(
    SQ3("Metti in ordine di tempo, dal più antico.", ["Scuola siciliana", "Dolce stil novo", "Divina Commedia", "Decameron", "Orlando furioso"]),
    SQ3("Metti in fila i primi cerchi dell'Inferno, dall'alto.", ["Limbo", "Lussuriosi", "Golosi", "Avari e prodighi", "Iracondi"])
  );
  seqs.inglese.push(
    SQ3("Metti in fila dal più lungo al più breve.", ["a century", "a decade", "a year", "a month", "a week"]),
    SQ3("Metti in fila dal meno frequente al più frequente.", ["never", "seldom", "occasionally", "usually", "always"]),
    SQ3("Metti in fila dal più piccolo al più grande.", ["tiny", "small", "medium", "large", "huge"])
  );

  errors.italiano.push(
    ER3("Una sola affermazione è falsa: quale?", ["La Divina Commedia è divisa in tre cantiche.", "Il Decameron raccoglie cento novelle.", "Il Canzoniere è un poema in prosa.", "Il Principe fu scritto da Machiavelli."], 2, "Il Canzoniere è una raccolta di poesie.", "Raccoglie le liriche di Petrarca."),
    ER3("Una sola affermazione è falsa: quale?", ["Dante scrisse la Commedia in latino.", "Virgilio guida Dante nell'Inferno.", "La Commedia ha cento canti.", "La Commedia è scritta in terzine."], 0, "Dante scrisse la Commedia in volgare fiorentino.", "Il volgare rendeva l'opera accessibile a tutti."),
    ER3("Una sola affermazione è falsa: quale?", ["La scuola siciliana nasce alla corte di Federico II.", "Il Dolce stil novo unisce amore e nobiltà d'animo.", "Petrarca scrisse l'Orlando furioso.", "L'Umanesimo riscopre i classici."], 2, "Ariosto scrisse l'Orlando furioso.", "Petrarca è l'autore del Canzoniere."),
    ER3("Una sola definizione è sbagliata: quale?", ["Perifrasi: «la città eterna» per Roma.", "Litote: «non è stupido» per «è intelligente».", "Sineddoche: «cento vele» per cento navi.", "Metonimia: «mi piace il mare» per «mi piace il lago»."], 3, "Metonimia: «bere un bicchiere» per bere il contenuto.", "La metonimia sostituisce un termine con un altro legato da vicinanza."),
    ER3("Una sola frase ha un errore: quale?", ["Se avessi saputo, sarei venuto.", "Il libro di cui ti ho parlato è bello.", "Gli studenti che ha studiato sono promossi.", "Non so dove sia andato."], 2, "Gli studenti che hanno studiato sono promossi.", "Il verbo deve concordare con «studenti»: plurale.")
  );
  errors.inglese.push(
    ER3("Una sola frase ha un errore: quale?", ["If I would have time, I would help you.", "If I had time, I would help you.", "If she comes, I will tell her.", "If it rains, we'll stay in."], 0, "If I had time, I would help you.", "Nella frase con «if» del second conditional si usa il past simple, non «would».", { en: true }),
    ER3("Una sola frase ha un errore: quale?", ["She suggested to go home.", "She suggested going home.", "He enjoys swimming.", "They decided to leave."], 0, "She suggested going home.", "«Suggest» è seguito dalla forma in -ing.", { en: true }),
    ER3("Una sola frase ha un errore: quale?", ["By the time I arrived, he left.", "By the time I arrived, he had left.", "When I arrived, he was leaving.", "After I had eaten, I went out."], 0, "By the time I arrived, he had left.", "Un'azione precedente nel passato richiede il past perfect.", { en: true }),
    ER3("Una sola frase ha un errore: quale?", ["I wish I would have more time.", "I wish I had more time.", "I wish he were here.", "I wish I could swim."], 0, "I wish I had more time.", "Dopo «wish» sul presente si usa il past simple.", { en: true }),
    ER3("Una sola frase ha un errore: quale?", ["Despite of the rain, we went out.", "Despite the rain, we went out.", "Although it rained, we went out.", "In spite of the rain, we went out."], 0, "Despite the rain, we went out.", "«Despite» non vuole «of»; «in spite of» sì.", { en: true }),
    ER3("Una sola frase ha un errore: quale?", ["The man who car was stolen is here.", "The man whose car was stolen is here.", "The woman who lives next door is a doctor.", "The book that I read was good."], 0, "The man whose car was stolen is here.", "Per il possesso si usa «whose».", { en: true })
  );
  errors.storia.push(
    ER3("Una sola data è sbagliata: quale?", ["Il Concordato di Worms è del 1122.", "La battaglia di Legnano è del 1176.", "La Magna Charta è del 1815.", "La peste nera è del 1348."], 2, "La Magna Charta è del 1215.", "Il 1815 è l'anno del Congresso di Vienna."),
    ER3("Una sola affermazione è falsa: quale?", ["Colombo sbarcò in America nel 1492.", "Vasco da Gama raggiunse l'India per mare.", "Cortés conquistò l'impero inca.", "Magellano organizzò la prima circumnavigazione."], 2, "Cortés conquistò l'impero azteco.", "L'impero inca fu conquistato da Pizarro."),
    ER3("Una sola affermazione è falsa: quale?", ["Lutero affisse le 95 tesi nel 1517.", "Il Concilio di Trento avviò la Controriforma.", "Calvino sostenne la predestinazione.", "La Pace di Augusta stabilì la libertà religiosa individuale."], 3, "La Pace di Augusta stabilì che i sudditi seguissero la religione del principe.", "La scelta spettava al principe, non ai singoli sudditi."),
    ER3("Una sola affermazione è falsa: quale?", ["I comuni nacquero nell'XI secolo.", "Federico Barbarossa fu sconfitto a Legnano.", "La prima crociata fu bandita da papa Urbano II.", "La peste nera arrivò in Europa nel Seicento."], 3, "La peste nera arrivò in Europa nel 1347-48.", "Il Seicento è molto più tardi."),
    ER3("Una sola affermazione è falsa: quale?", ["La guerra dei cent'anni oppose Francia e Inghilterra.", "Giovanna d'Arco guidò i Francesi.", "Costantinopoli cadde nel 1453.", "Costantinopoli fu conquistata dai Mongoli."], 3, "Costantinopoli fu conquistata dai Turchi ottomani.", "Fu Maometto II a prenderla.")
  );
  errors.scienze.push(
    ER3("Una sola affermazione è falsa: quale?", ["La crosta è lo strato più esterno della Terra.", "Il nucleo è formato soprattutto da ferro e nichel.", "Il mantello è liquido come l'acqua.", "La litosfera è divisa in placche."], 2, "Il mantello è solido, ma si deforma molto lentamente.", "Solo il nucleo esterno è liquido."),
    ER3("Una sola affermazione è falsa: quale?", ["La magnitudo misura l'energia di un sisma.", "L'epicentro è il punto in superficie sopra l'ipocentro.", "Le onde S arrivano prima delle onde P.", "Le faglie sono fratture della crosta."], 2, "Le onde P arrivano prima delle onde S.", "Le onde P sono le più veloci."),
    ER3("Una sola affermazione è falsa: quale?", ["Un acido ha pH minore di 7.", "Il catalizzatore si consuma nella reazione.", "La neutralizzazione produce sale e acqua.", "L'ossidazione è perdita di elettroni."], 1, "Il catalizzatore accelera la reazione senza consumarsi.", "Alla fine della reazione è ancora tutto lì."),
    ER3("Una sola affermazione è falsa: quale?", ["Una mole contiene 6,022 · 10²³ particelle.", "La massa molare dell'acqua è circa 18 g/mol.", "Il metano ha formula CH₄.", "Il carbonio forma di solito due legami."], 3, "Il carbonio forma di solito quattro legami.", "Ha quattro elettroni di valenza."),
    ER3("Una sola affermazione è falsa: quale?", ["Wegener propose la deriva dei continenti.", "Alle dorsali oceaniche si forma nuova crosta.", "L'Etna è un vulcano spento.", "Nelle zone di subduzione una placca scende sotto un'altra."], 2, "L'Etna è un vulcano attivo.", "Erutta con frequenza.")
  );
  errors.civica.push(
    ER3("Una sola affermazione è falsa: quale?", ["La Corte costituzionale ha 15 giudici.", "Le Regioni sono 20.", "Le Regioni a statuto speciale sono 12.", "Il referendum abrogativo cancella una legge."], 2, "Le Regioni a statuto speciale sono 5.", "Sicilia, Sardegna, Valle d'Aosta, Trentino-Alto Adige, Friuli-Venezia Giulia."),
    ER3("Una sola affermazione è falsa: quale?", ["L'articolo 40 riguarda lo sciopero.", "L'articolo 36 riguarda la retribuzione.", "L'articolo 19 riguarda la libertà religiosa.", "L'articolo 49 riguarda la difesa della Patria."], 3, "L'articolo 49 riguarda i partiti.", "La difesa della Patria è nell'articolo 52."),
    ER3("Una sola affermazione è falsa: quale?", ["Il decreto-legge è un atto del Governo.", "Il decreto-legge va convertito in legge entro 60 giorni.", "Il decreto-legge è approvato direttamente dal popolo.", "Lo scioglimento delle Camere spetta al Presidente della Repubblica."], 2, "Il decreto-legge è convertito dal Parlamento.", "Il popolo non vota i decreti."),
    ER3("Una sola affermazione è falsa: quale?", ["Montesquieu teorizzò la separazione dei poteri.", "Il potere giudiziario è affidato ai giudici.", "Il Governo fa le leggi da solo.", "Il Parlamento esercita il potere legislativo."], 2, "Le leggi le approva il Parlamento.", "Il Governo ha il potere esecutivo.")
  );

  stima.storia.push(
    ST3("In che anno i comuni sconfissero Barbarossa a Legnano?", 1000, 1300, 1176, 20, "", "Nel 1176."),
    ST3("In che anno fu firmata la Magna Charta?", 1000, 1400, 1215, 25, "", "Nel 1215."),
    ST3("In che anno arrivò in Europa la peste nera?", 1200, 1500, 1348, 20, "", "Tra il 1347 e il 1348."),
    ST3("In che anno cadde Costantinopoli?", 1300, 1600, 1453, 25, "", "Nel 1453."),
    ST3("In che anno Colombo sbarcò in America?", 1300, 1700, 1492, 15, "", "Nel 1492."),
    ST3("In che anno Lutero affisse le 95 tesi?", 1300, 1700, 1517, 15, "", "Nel 1517.")
  );
  stima.scienze.push(
    ST3("Quanto vale la massa molare dell'acqua (in g/mol)?", 0, 100, 18, 2, "g/mol", "2 · 1 + 16 = 18."),
    ST3("Qual è il numero atomico del ferro?", 0, 120, 26, 3, "", "Il ferro ha 26 protoni."),
    ST3("In che anno Wegener propose la deriva dei continenti?", 1800, 2000, 1912, 6, "", "Nel 1912."),
    ST3("Quanto dista la Terra dal Sole (in milioni di km)?", 0, 400, 150, 15, "milioni di km", "Circa 150 milioni di chilometri.", 5)
  );
  stima.civica.push(
    ST3("Quanti giudici ha la Corte costituzionale?", 5, 50, 15, 2, "", "Sono 15."),
    ST3("Quante sono le Regioni italiane?", 5, 50, 20, 2, "", "Sono 20."),
    ST3("In che anno le donne italiane votarono per la prima volta a livello nazionale?", 1900, 2000, 1946, 3, "", "Nel 1946."),
    ST3("In che anno fu concesso lo Statuto albertino?", 1800, 1900, 1848, 4, "", "Nel 1848."),
    ST3("Entro quanti giorni va convertito un decreto-legge?", 0, 200, 60, 8, "giorni", "Entro 60 giorni dalla pubblicazione.", 5)
  );

  cloze.italiano.push(
    CL3("Dante scrisse la Commedia in ___ fiorentino.", ["volgare", "latino", "greco", "provenzale"], "Scelse la lingua del popolo."),
    CL3("La Commedia è composta da Inferno, Purgatorio e ___.", ["Paradiso", "Limbo", "Eden", "Cielo"], "Sono le tre cantiche."),
    CL3("Nel Decameron i giovani fuggono dalla ___ del 1348.", ["peste", "guerra", "carestia", "alluvione"], "Firenze era colpita dalla peste nera."),
    CL3("Il Canzoniere raccoglie le poesie di Petrarca, in gran parte dedicate a ___.", ["Laura", "Beatrice", "Lucia", "Fiammetta"], "Laura è la donna cantata da Petrarca."),
    CL3("Ariosto scrisse l'«Orlando ___».", ["furioso", "innamorato", "gentile", "valoroso"], "L'«Orlando innamorato» è di Boiardo."),
    CL3("Credo che Dante ___ un grande poeta.", ["sia stato", "è stato", "fu", "era"], "«Credo che» regge il congiuntivo."),
    CL3("Pensavo che tu ___ già partito.", ["fossi", "sei", "saresti", "sia"], "Congiuntivo trapassato: fossi partito."),
    CL3("Se me l'avessi detto, ti ___ aiutato.", ["avrei", "ho", "avessi", "avevo"], "Ipotesi irreale del passato: condizionale composto."),
    CL3("Lo scrittore, ___ opere sono famose, vive a Roma.", ["le cui", "che le", "di cui", "dove"], "«Le cui» indica possesso."),
    CL3("Ho letto il libro ___ mi hai consigliato.", ["che", "cui", "di cui", "a cui"], "È complemento oggetto: pronome relativo «che».")
  );
  cloze.inglese.push(
    CL3("If I had known, I ___ you.", ["would have told", "would tell", "will tell", "had told"], "Third conditional.", { en: true }),
    CL3("I wish she ___ here now.", ["were", "is", "will be", "would be"], "Dopo «wish» sul presente si usa il past simple.", { en: true }),
    CL3("He suggested ___ a taxi.", ["taking", "to take", "take", "took"], "Dopo «suggest» si usa -ing.", { en: true }),
    CL3("She is used to ___ early.", ["waking up", "wake up", "woke up", "wakes up"], "Dopo «be used to» si usa -ing.", { en: true }),
    CL3("The more I practise, ___ I play.", ["the better", "better", "the best", "best"], "Doppio comparativo.", { en: true }),
    CL3("The man ___ car was stolen called the police.", ["whose", "who", "that", "which"], "«Whose» indica possesso.", { en: true }),
    CL3("Despite ___ tired, he kept running.", ["being", "be", "he was", "of being"], "Dopo «despite» si usa -ing o un nome.", { en: true }),
    CL3("I'll call you as soon as I ___ home.", ["get", "will get", "got", "am getting"], "Nelle temporali al futuro si usa il present simple.", { en: true }),
    CL3("He ___ the film before, so he didn't come.", ["had seen", "saw", "has seen", "was seeing"], "Azione precedente nel passato: past perfect.", { en: true }),
    CL3("The room ___ cleaned yet.", ["hasn't been", "hasn't", "isn't being", "wasn't"], "Present perfect passivo.", { en: true }),
    CL3("___ the weather was bad, we went out.", ["Although", "Despite", "Because", "So"], "«Although» introduce una frase.", { en: true }),
    CL3("She must ___ tired after the flight.", ["be", "being", "to be", "been"], "Dopo un modale si usa il verbo base.", { en: true })
  );
  askRules.push(
    [/personaggio della Commedia/, "Chi è ", " nella Commedia?"],
    [/corrente alla sua caratteristica/, "Che cosa caratterizza ", "?"],
    [/phrasal verb al suo significato/, "Che cosa significa ", " in italiano?"],
    [/formula al suo nome/, "Come si chiama ", "?"],
    [/vulcano alla sua località/, "Dove si trova ", "?"],
    [/Regione al suo capoluogo/, "Qual è il capoluogo di ", "?"]
  );

  // ================================================================ 4ª SUPERIORE (classe 11)
  const SUBD = { 0: "₀", 1: "₁", 2: "₂", 3: "₃", 4: "₄", 5: "₅", 6: "₆", 7: "₇", 8: "₈", 9: "₉" };
  const subs = n => String(n).split("").map(d => SUBD[d]).join("");
  const lg = b => `log${subs(b)}`;
  const fact = n => (n <= 1 ? 1 : n * fact(n - 1));
  const fr = (n, d) => { const g = gcd2(n, d); return d / g === 1 ? String(n / g) : `${n / g}/${d / g}`; };
  const RADS = { 30: "π/6", 45: "π/4", 60: "π/3", 90: "π/2", 120: "2π/3", 135: "3π/4", 150: "5π/6", 180: "π", 270: "3π/2" };
  const TRIG2 = [["sen 120°", "√3/2"], ["cos 120°", "−1/2"], ["sen 150°", "1/2"], ["cos 150°", "−√3/2"], ["sen 180°", "0"], ["cos 180°", "−1"], ["sen 270°", "−1"], ["cos 270°", "0"], ["tg 135°", "−1"], ["cos 135°", "−√2/2"], ["sen 135°", "√2/2"], ["tg 150°", "−√3/3"]];
  const TRIG2V = ["−1", "−1/2", "0", "1/2", "√3/2", "−√3/2", "√2/2", "−√2/2", "1", "√3", "−√3/3", "√3/3"];

  function math11() {
    const t = rnd(0, 10);
    if (t === 0) {   // logaritmo di una potenza
      const b = pick([2, 3, 5, 10]), k = rnd(2, b === 2 ? 8 : b === 3 ? 5 : 4);
      return mk(`Quanto vale ${lg(b)} ${b ** k}?`, k, [k + 1, k - 1, b * k, b ** k], `${b}^${k} = ${b ** k}, quindi ${lg(b)} ${b ** k} = ${k}.`);
    }
    if (t === 1) {   // somma di logaritmi
      const [a, b, base, k] = pick([[2, 50, 10, 2], [4, 25, 10, 2], [5, 20, 10, 2], [8, 125, 10, 3], [20, 50, 10, 3], [2, 8, 2, 4], [4, 8, 2, 5], [2, 16, 2, 5], [3, 27, 3, 4]]);
      return mk(`Quanto vale ${lg(base)} ${a} + ${lg(base)} ${b}?`, k, [k + 1, k - 1, a + b, k * 2], `La somma di logaritmi è il logaritmo del prodotto: ${lg(base)} ${a * b} = ${k}.`);
    }
    if (t === 2) {   // equazione esponenziale con traslazione
      const b = pick([2, 3]), k = rnd(3, b === 2 ? 5 : 4), s = rnd(1, 2);
      return mk(`Risolvi: ${b}^(x + ${s}) = ${b ** k}. Quanto vale x?`, k - s, [k, k + s, k - s - 1, b * k], `${b ** k} = ${b}^${k}, quindi x + ${s} = ${k} e x = ${k - s}.`);
    }
    if (t === 3) {   // gradi e radianti
      const g = pick(Object.keys(RADS)), r = RADS[g];
      return mk(`Quanti radianti sono ${g}°?`, r, Object.values(RADS).filter(v => v !== r), `${g}° = ${g} · π/180 = ${r}.`);
    }
    if (t === 4) {   // valori di seno, coseno, tangente
      const [l, r] = pick(TRIG2);
      return mk(`Quanto vale ${l}?`, r, TRIG2V.filter(v => v !== r), `${l} = ${r}: si riporta l'angolo al primo quadrante e si considera il segno.`);
    }
    if (t === 5) {   // identità fondamentale
      const [a, b, c] = pick(TERNE_P);
      return mk(`Se sen α = ${a}/${c} e α è acuto, quanto vale cos α?`, `${b}/${c}`, [`${a}/${c}`, `${c - a}/${c}`, `${b}/${a}`, `${b + 1}/${c}`], `cos α = √(1 − sen² α) = √(1 − ${a * a}/${c * c}) = √(${b * b}/${c * c}) = ${b}/${c}.`);
    }
    if (t === 6) {   // calcolo combinatorio
      const u = rnd(0, 2);
      if (u === 0) { const n = rnd(3, 6), f = fact(n); return mk(`In quanti modi si possono mettere in fila ${n} persone?`, f, [n * n, n ** n, 2 * f, f / 2], `Sono le permutazioni di ${n} elementi: ${n}! = ${f}.`); }
      if (u === 1) { const n = rnd(5, 8), d = n * (n - 1) * (n - 2); return mk(`In una gara con ${n} atleti, quante classifiche diverse possono esserci per i primi tre posti?`, d, [n * 3, d / 6, n ** 3, n * (n - 1)], `Disposizioni di ${n} elementi presi a 3: ${n} · ${n - 1} · ${n - 2} = ${d}.`); }
      const n = rnd(5, 9), c = n * (n - 1) / 2;
      return mk(`${n} persone si stringono la mano una volta a testa. Quante strette di mano ci sono?`, c, [n * (n - 1), n * n, c + n, c - 1], `Combinazioni di ${n} elementi presi a 2: ${n} · ${n - 1} : 2 = ${c}.`);
    }
    if (t === 7) {   // progressioni
      if (Math.random() < 0.5) { const a1 = rnd(1, 9), d = rnd(2, 6), k = rnd(5, 9), v = a1 + (k - 1) * d; return mk(`In una progressione aritmetica il primo termine è ${a1} e la ragione è ${d}. Quanto vale il ${k}° termine?`, v, [a1 + k * d, a1 * k, a1 + (k - 2) * d, v + a1], `a${subs(k)} = a₁ + (n − 1) · d = ${a1} + ${k - 1} · ${d} = ${v}.`); }
      const a1 = rnd(1, 3), q = rnd(2, 3), k = rnd(4, 6), v = a1 * q ** (k - 1);
      return mk(`In una progressione geometrica il primo termine è ${a1} e la ragione è ${q}. Quanto vale il ${k}° termine?`, v, [a1 * q ** k, a1 * q * (k - 1), a1 + (k - 1) * q, a1 * q ** (k - 2)], `a${subs(k)} = a₁ · q^(n − 1) = ${a1} · ${q}^${k - 1} = ${v}.`);
    }
    if (t === 8) {   // probabilità
      if (Math.random() < 0.5) {
        const [w, p] = pick([["la somma è 7", "1/6"], ["la somma è 12", "1/36"], ["la somma è 8", "5/36"], ["la somma è 6", "5/36"], ["i due numeri sono uguali", "1/6"], ["la somma è 11", "1/18"], ["la somma è 10", "1/12"], ["la somma è 4", "1/12"]]);
        return mk(`Lanciando due dadi, qual è la probabilità che ${w}?`, p, ["1/6", "1/12", "1/18", "5/36", "1/36", "1/9", "7/36", "1/2"].filter(v => v !== p), `Su 36 casi possibili, i casi favorevoli danno la probabilità ${p}.`);
      }
      const r = rnd(2, 5), b = rnd(1, 4), tot = r + b;
      return mk(`Un'urna ha ${r} palline rosse e ${b} blu. Se ne estraggono due senza rimettere la prima, qual è la probabilità che siano entrambe rosse?`, fr(r * (r - 1), tot * (tot - 1)), [fr(r * r, tot * tot), fr(r, tot), fr(2 * r, tot), fr(r - 1, tot - 1)], `${r}/${tot} · ${r - 1}/${tot - 1} = ${fr(r * (r - 1), tot * (tot - 1))}.`);
    }
    if (t === 9) {   // equazione goniometrica elementare
      const [e, x] = pick([["sen x = 1/2", "30°"], ["cos x = 1/2", "60°"], ["sen x = √3/2", "60°"], ["cos x = √3/2", "30°"], ["sen x = √2/2", "45°"], ["tg x = 1", "45°"]]);
      return mk(`Risolvi ${e}, con 0° < x < 90°.`, x, ["30°", "45°", "60°", "90°", "0°"].filter(v => v !== x), `È un angolo notevole: ${e} per x = ${x}.`);
    }
    const a = pick([4, 6, 8, 10]), b = pick([4, 6, 8, 12]), A = a * b / 4;   // area con il seno
    return mk(`Un triangolo ha due lati di ${a} cm e ${b} cm che formano un angolo di 30°. Quanto vale l'area?`, `${A} cm²`, [`${a * b / 2} cm²`, `${a * b} cm²`, `${a + b} cm²`, `${A + a} cm²`], `Area = ½ · a · b · sen 30° = ½ · ${a} · ${b} · ½ = ${A} cm².`);
  }
  function mathPairs11() {
    const gens = [
      () => { const b = pick([2, 3, 5]), k = rnd(2, 6); return { l: `${lg(b)} ${b ** k}`, r: String(k) }; },
      () => { const g = pick(Object.keys(RADS)); return { l: `${g}°`, r: RADS[g] }; },
      () => { const n = rnd(3, 7); return { l: `${n}!`, r: String(fact(n)) }; },
      () => { const x = pick(TRIG2); return { l: x[0], r: x[1] }; }
    ];
    const gen = pick(gens), out = []; let g = 0;
    while (out.length < 4 && g++ < 300) { const p = gen(); if (!out.some(o => o.r === p.r || o.l === p.l)) out.push(p); }
    return out;
  }
  function filaMath11() {
    const sets = [["log₂ 1", "log₂ 2", "log₂ 8", "log₂ 16", "log₂ 64"], ["π/6", "π/4", "π/3", "π/2", "π"], ["−1", "−√2/2", "−1/2", "0", "1/2"], ["2!", "3!", "4!", "5!", "6!"], ["log₁₀ 0,1", "log₁₀ 1", "log₁₀ 10", "log₁₀ 100", "log₁₀ 1000"]];
    return { p: "Metti in fila dal più piccolo al più grande.", items: pick(sets) };
  }
  function mathError11() {
    const t = rnd(0, 2);
    if (t === 0) {   // somma di logaritmi
      const b = pick([2, 3]), m = rnd(1, 3), n = rnd(1, 3), a = b ** m, c = b ** n;
      const rows = [`${lg(b)} ${a} + ${lg(b)} ${c}`, `= ${lg(b)} (${a} + ${c})`, `= ${lg(b)} ${a + c}`];
      return { p: "In quale passaggio c'è l'errore?", rows, wrong: 1, fix: `= ${lg(b)} (${a} · ${c})`, e: "La somma di logaritmi è il logaritmo del prodotto, non della somma.", steps: true };
    }
    if (t === 1) {   // equazione esponenziale
      const b = pick([2, 3]), k = rnd(3, b === 2 ? 5 : 4), s = rnd(1, 2);
      const rows = [`${b}^(x + ${s}) = ${b ** k}`, `${b}^(x + ${s}) = ${b}^${k}`, `x + ${s} = ${k}`, `x = ${k + s}`];
      return { p: "In quale passaggio c'è il primo errore?", rows, wrong: 3, fix: `x = ${k - s}`, e: `Si sottrae ${s}, non si somma: ${k} − ${s} = ${k - s}.`, steps: true };
    }
    const [a, b, c] = pick(TERNE_P);
    const rows = [`sen α = ${a}/${c}  (α acuto)`, `cos² α = 1 − (${a}/${c})²`, `cos² α = ${b * b}/${c * c}`, `cos α = ${b * b}/${c * c}`];
    return { p: "In quale passaggio c'è il primo errore?", rows, wrong: 3, fix: `cos α = ${b}/${c}`, e: "Dal quadrato si torna alla radice: cos α = √(cos² α).", steps: true };
  }
  function mathStima11() {
    const t = rnd(0, 2);
    if (t === 0) { const [n, v] = pick([[2, 0.3], [3, 0.48], [5, 0.7], [7, 0.85], [50, 1.7], [200, 2.3]]); return { q: `Stima log₁₀ ${n}.`, min: 0, max: 4, ans: v, tol: 0.1, unit: "", step: 0.01, e: `log₁₀ ${n} ≈ ${String(v).replace(".", ",")}.` }; }
    if (t === 1) { const k = rnd(7, 12), v = 2 ** k; return { q: `Stima 2^${k}.`, min: 0, max: 5000, ans: v, tol: Math.max(10, Math.round(v * 0.06)), unit: "", step: 10, e: `2^${k} = ${v}.` }; }
    const [g, v] = pick([[50, 0.87], [100, 1.75], [200, 3.49], [300, 5.24]]);
    return { q: `Stima quanti radianti sono ${g}°.`, min: 0, max: 7, ans: v, tol: 0.1, unit: "rad", step: 0.01, e: `${g} · π/180 ≈ ${String(v).replace(".", ",")} rad.` };
  }
  MY.math[11] = math11; MY.pairs[11] = mathPairs11; MY.fila[11] = filaMath11; MY.error[11] = mathError11; MY.stima[11] = mathStima11;

  const { q: q4, T: q4p, SQ: SQ4, ER: ER4, ST: ST4, CL: CL4 } = H([11, 11]);
  BANK.italiano.push(
    q4("Chi scrisse la «Gerusalemme liberata»?", ["Torquato Tasso", "Ludovico Ariosto", "Giovan Battista Marino", "Matteo Maria Boiardo"], "È un poema in ottave sulla prima crociata."),
    q4("Di che cosa parla la «Gerusalemme liberata»?", ["Della prima crociata e della conquista di Gerusalemme", "Del ritorno di Ulisse", "Della fondazione di Roma", "Della peste di Firenze"], "Il condottiero è Goffredo di Buglione."),
    q4("Che cosa caratterizza il Barocco?", ["La ricerca della meraviglia, dell'artificio e dei contrasti", "La misura e la semplicità", "Il rifiuto di ogni retorica", "L'imitazione dei classici"], "Il Barocco si sviluppa nel Seicento."),
    q4("Chi è il maggiore poeta barocco italiano?", ["Giovan Battista Marino", "Dante", "Foscolo", "Parini"], "Marino scrisse l'«Adone»."),
    q4("Che cos'è il «Dialogo sopra i due massimi sistemi» di Galileo?", ["Un confronto in forma di dialogo tra il sistema tolemaico e il copernicano", "Un poema", "Un romanzo storico", "Una commedia"], "Fu pubblicato nel 1632."),
    q4("Che cos'è l'Illuminismo?", ["Il movimento che si affida alla ragione contro pregiudizio e superstizione", "Il movimento che esalta la fede", "Il ritorno al Medioevo", "Una scuola poetica"], "Si sviluppa nel Settecento."),
    q4("Che cos'è l'Arcadia?", ["Un'accademia nata nel 1690 che propone una poesia semplice e pastorale", "Un movimento romantico", "Una rivista illuminista", "Un teatro"], "Voleva reagire agli eccessi del Barocco."),
    q4("Che cos'era «Il Caffè»?", ["La rivista illuminista milanese dei fratelli Verri", "Un locale di Venezia", "Un poema", "Un trattato"], "Fu pubblicata a Milano tra il 1764 e il 1766."),
    q4("Chi scrisse «Dei delitti e delle pene»?", ["Cesare Beccaria", "Pietro Verri", "Montesquieu", "Giuseppe Parini"], "Beccaria si oppone alla tortura e alla pena di morte."),
    q4("Quale autore riformò la commedia italiana nel Settecento?", ["Carlo Goldoni", "Vittorio Alfieri", "Giuseppe Parini", "Pietro Metastasio"], "Sostituì le maschere con personaggi e caratteri veri."),
    q4("Chi è la protagonista de «La locandiera»?", ["Mirandolina", "Colombina", "Rosaura", "Lisetta"], "Mirandolina è la locandiera che conquista i clienti."),
    q4("Che cosa critica Parini nel «Giorno»?", ["La vita oziosa della nobiltà", "I contadini", "I Francesi", "La Chiesa"], "Lo fa con ironia, fingendo di dare lezioni a un giovane signore."),
    q4("Chi scrisse la tragedia «Saul»?", ["Vittorio Alfieri", "Ugo Foscolo", "Carlo Goldoni", "Pietro Metastasio"], "Alfieri esalta la libertà contro la tirannide."),
    q4("Che cos'è «Le ultime lettere di Jacopo Ortis»?", ["Un romanzo epistolare di Foscolo", "Un poema di Leopardi", "Una tragedia di Alfieri", "Un saggio di Manzoni"], "È il romanzo italiano più vicino al Romanticismo."),
    q4("Di che cosa parla «Dei sepolcri»?", ["Del valore della memoria dei defunti", "Dell'amore di un giovane", "Della peste", "Di una guerra"], "Foscolo ne scrisse nel 1807 (è un carme)."),
    q4("Che cos'è il Romanticismo?", ["Il movimento che esalta sentimento, individuo e nazione", "Il movimento che esalta soltanto la ragione", "Un movimento del Cinquecento", "Un movimento che cerca la perfezione formale"], "Nasce all'inizio dell'Ottocento."),
    q4("Chi scrisse i «Canti»?", ["Giacomo Leopardi", "Giovanni Pascoli", "Ugo Foscolo", "Alessandro Manzoni"], "Contengono «L'infinito» e «A Silvia»."),
    q4("In quale città nacque Leopardi?", ["Recanati", "Firenze", "Milano", "Napoli"], "Visse a lungo nella biblioteca del padre."),
    q4("Che cos'è il pessimismo cosmico di Leopardi?", ["L'idea che la natura sia indifferente o ostile all'uomo", "L'idea che il mondo sia il migliore possibile", "L'idea che la storia sia progresso", "L'idea che l'uomo sia malvagio per natura"], "Per l'ultimo Leopardi la natura è una forza cieca."),
    q4("Che cos'è il verso sciolto?", ["Un verso, di solito endecasillabo, senza rime", "Un verso di cinque sillabe", "Un verso con tre rime", "Un verso in latino"], "Lo usarono Parini e Foscolo."),
    q4("Che cos'è «Il cinque maggio»?", ["Un'ode di Manzoni sulla morte di Napoleone", "Un romanzo", "Una commedia", "Una novella"], "Manzoni la scrisse nel 1821."),
    q4("Che cos'è un romanzo storico?", ["Un romanzo con vicende inventate su uno sfondo storico", "Una cronaca di fatti reali", "Una biografia", "Un saggio"], "«I promessi sposi» è un esempio."),
    q4("Che cos'è una subordinata implicita?", ["Una subordinata con il verbo all'infinito, al gerundio o al participio", "Una subordinata al congiuntivo", "Una subordinata senza verbo", "Una frase con più verbi"], "Esempio: «Uscendo, spensi la luce».")
  );
  BANK.inglese.push(
    q4("Completa: «By next year, she ___ her degree.»", ["will have finished", "finishes", "has finished", "will finish"], "Future perfect: azione conclusa entro un momento futuro.", { ae: true, en: ["By next year, she ___ her degree."] }),
    q4("Completa: «This time tomorrow I ___ on a plane.»", ["will be sitting", "sit", "will sit", "am sitting"], "Future continuous: azione in corso in un momento futuro.", { ae: true, en: ["This time tomorrow I ___ on a plane."] }),
    q4("Completa: «If he ___ harder, he would be a better player.»", ["trained", "trains", "would train", "will train"], "Second conditional: if + past simple.", { ae: true, en: ["If he ___ harder, he would be a better player."] }),
    q4("Completa: «Had I known, I ___ differently.»", ["would have acted", "would act", "had acted", "will act"], "Third conditional con inversione: «Had I known» = «If I had known».", { ae: true, en: ["Had I known, I ___ differently."] }),
    q4("Completa: «The report ___ by the time I got there.»", ["had been finished", "was finishing", "has finished", "finished"], "Past perfect passivo: had been + participio passato.", { ae: true, en: ["The report ___ by the time I got there."] }),
    q4("Completa: «I'd rather you ___ smoke here.»", ["didn't", "don't", "wouldn't", "won't"], "«Would rather» + soggetto diverso richiede il past simple.", { ae: true, en: ["I'd rather you ___ smoke here."] }),
    q4("Completa: «She denied ___ the money.»", ["taking", "to take", "take", "took"], "Dopo «deny» si usa la forma in -ing.", { ae: true, en: ["She denied ___ the money."] }),
    q4("Completa: «He managed ___ the exam.»", ["to pass", "passing", "pass", "passed"], "«Manage» è seguito dall'infinito con to.", { ae: true, en: ["He managed ___ the exam."] }),
    q4("Completa: «I remember ___ him last year.»", ["meeting", "to meet", "meet", "met"], "Remember + -ing: ricordo di un fatto passato.", { ae: true, en: ["I remember ___ him last year."] }),
    q4("Completa: «___ the traffic, we arrived on time.»", ["Despite", "Although", "Because", "Unless"], "«Despite» è seguito da un nome.", { ae: true, en: ["___ the traffic, we arrived on time."] }),
    q4("Completa: «You won't get in ___ you book early.»", ["unless", "if", "when", "although"], "«Unless» = a meno che… non.", { ae: true, en: ["You won't get in ___ you book early."] }),
    q4("Completa: «She asked me whether I ___ the answer.»", ["knew", "know", "will know", "have known"], "Nel discorso indiretto il present simple diventa past simple.", { ae: true, en: ["She asked me whether I ___ the answer."] }),
    q4("Completa: «He said he ___ call me the next day.»", ["would", "will", "shall", "can"], "Il futuro «will» diventa «would» nel discorso indiretto.", { ae: true, en: ["He said he ___ call me the next day."] }),
    q4("Completa: «The car, ___ was very old, broke down.»", ["which", "who", "what", "whom"], "Per le cose si usa «which»; la virgola indica una relativa non restrittiva.", { ae: true, en: ["The car, ___ was very old, broke down."] }),
    q4("Completa: «It's high time we ___ home.»", ["went", "go", "will go", "going"], "«It's high time» vuole il past simple.", { ae: true, en: ["It's high time we ___ home."] }),
    q4("Che cosa significa «to come across»?", ["Imbattersi in", "Attraversare", "Rispondere", "Arrivare"], "«I came across an old photo» = mi sono imbattuto in una vecchia foto.", { en: ["to come across"] }),
    q4("Che cosa significa «to bring up»?", ["Allevare, tirare fuori un argomento", "Portare giù", "Ridurre", "Sbarcare"], "Si usa per i figli («bring up children») e per gli argomenti.", { en: ["to bring up"] }),
    q4("Che cosa significa «to turn down»?", ["Rifiutare", "Accendere", "Girare", "Attendere"], "Può anche voler dire abbassare il volume.", { en: ["to turn down"] }),
    q4("Che cosa significa «to look into»?", ["Indagare, esaminare", "Guardare dentro", "Sembrare", "Prendersi cura"], "«The police are looking into the case.»", { en: ["to look into"] }),
    q4("Che cosa significa «to figure out»?", ["Capire, risolvere", "Disegnare", "Calcolare il prezzo", "Immaginare una figura"], "«I can't figure it out» = non riesco a capirlo.", { en: ["to figure out"] }),
    q4("Che cosa significa «actual»?", ["Reale, effettivo", "Attuale", "Attivo", "Attento"], "Falso amico: «attuale» si dice «current».", { en: ["actual"] }),
    q4("Che cosa significa «to realise»?", ["Rendersi conto", "Realizzare un progetto", "Reclamare", "Registrare"], "Realizzare un progetto si dice «to achieve» o «to carry out».", { en: ["to realise"] }),
    q4("Che cosa significa «sympathy»?", ["Compassione", "Simpatia", "Gentilezza", "Rispetto"], "Falso amico: «simpatia» si dice «liking» o «charm».", { en: ["sympathy"] }),
    q4("Che cosa significa «to attend»?", ["Frequentare, partecipare", "Attendere", "Attaccare", "Attrarre"], "Attendere si dice «to wait».", { en: ["to attend"] }),
    q4("Quale frase è corretta?", ["Hardly had he left when the phone rang.", "Hardly he had left when the phone rang.", "Hardly did he left when the phone rang.", "Hardly had he leave when the phone rang."], "Dopo «hardly» all'inizio della frase c'è l'inversione: had + soggetto.", { ae: true })
  );
  BANK.storia.push(
    q4("Che cosa fu la guerra dei trent'anni (1618-48)?", ["Un conflitto europeo nato da contrasti religiosi e politici in Germania", "Una guerra tra Francia e Inghilterra", "Una rivolta contadina", "Una crociata"], "Coinvolse quasi tutte le potenze europee."),
    q4("Quale pace pose fine alla guerra dei trent'anni?", ["La pace di Vestfalia (1648)", "La pace di Lodi", "La pace di Augusta", "Il Congresso di Vienna"], "Ridisegnò l'equilibrio europeo."),
    q4("Che cos'è l'assolutismo?", ["Un governo in cui il sovrano accentra tutti i poteri", "Il governo del popolo", "Il governo di pochi nobili", "Il governo dei vescovi"], "Ne fu l'esempio più noto la Francia di Luigi XIV."),
    q4("Chi fu il «Re Sole»?", ["Luigi XIV", "Luigi XVI", "Enrico IV", "Napoleone"], "Regnò dal 1643 al 1715 e costruì la reggia di Versailles."),
    q4("Che cos'è la Gloriosa rivoluzione (1688)?", ["Il passaggio pacifico in Inghilterra a una monarchia limitata dal Parlamento", "Una rivolta in Francia", "Una guerra civile in Spagna", "L'indipendenza americana"], "Seguì il Bill of Rights del 1689."),
    q4("Chi guidò la repubblica inglese dopo l'esecuzione di Carlo I?", ["Oliver Cromwell", "Guglielmo d'Orange", "Giacomo II", "Carlo II"], "Carlo I fu giustiziato nel 1649."),
    q4("Quale scienziato formulò la legge di gravitazione universale?", ["Isaac Newton", "Galileo Galilei", "Keplero", "Copernico"], "La espose nei «Principia» (1687)."),
    q4("Che cosa afferma il metodo sperimentale di Galileo?", ["Che la natura si studia con l'osservazione e l'esperimento", "Che conta solo la tradizione", "Che bisogna credere ad Aristotele", "Che la scienza coincide con la fede"], "È la base della scienza moderna."),
    q4("Chi scrisse «Il contratto sociale»?", ["Jean-Jacques Rousseau", "Montesquieu", "Voltaire", "Diderot"], "Sostiene che la sovranità appartiene al popolo."),
    q4("Che cos'è l'«Encyclopédie»?", ["L'opera collettiva di Diderot e d'Alembert che raccoglie il sapere illuminista", "Un romanzo", "Un giornale", "Un trattato di Newton"], "Uscì in Francia a partire dal 1751."),
    q4("Che cos'è la rivoluzione industriale?", ["Il passaggio alla produzione meccanizzata in fabbrica, iniziato in Inghilterra", "La rivolta degli operai", "Una guerra commerciale", "La scoperta dell'elettricità"], "Cominciò verso la metà del Settecento."),
    q4("Quale macchina alimentò la prima rivoluzione industriale?", ["La macchina a vapore", "Il motore a scoppio", "La dinamo", "La turbina idroelettrica"], "Fu perfezionata da James Watt."),
    q4("In che anno gli Stati Uniti dichiararono l'indipendenza?", ["1776", "1789", "1815", "1750"], "Il 4 luglio 1776."),
    q4("Che cos'era l'Ancien régime?", ["La società francese divisa in tre ordini prima del 1789", "Il governo di Napoleone", "La Repubblica", "Il Direttorio"], "Clero, nobiltà e Terzo stato."),
    q4("Quale evento del 14 luglio 1789 simboleggia l'inizio della Rivoluzione francese?", ["La presa della Bastiglia", "La morte del re", "L'incoronazione di Napoleone", "La battaglia di Valmy"], "La Bastiglia era una fortezza-prigione di Parigi."),
    q4("Che cosa proclama la Dichiarazione dei diritti dell'uomo e del cittadino (1789)?", ["La libertà e l'uguaglianza dei cittadini", "La Costituzione americana", "Un trattato di pace", "Il potere assoluto del re"], "Fu un testo fondamentale per le costituzioni moderne."),
    q4("Chi erano i giacobini?", ["Rivoluzionari radicali guidati da Robespierre", "Monarchici", "Nobili emigrati", "Banchieri"], "Instaurarono il Terrore (1793-94)."),
    q4("Che cosa accadde a Luigi XVI?", ["Fu ghigliottinato nel 1793", "Fuggì in Inghilterra", "Abdicò e visse a Roma", "Fu esiliato a Sant'Elena"], "Fu condannato a morte dalla Convenzione."),
    q4("In che anno Napoleone prese il potere con il colpo di Stato del 18 brumaio?", ["1799", "1789", "1804", "1815"], "Divenne primo console."),
    q4("In che anno Napoleone si fece incoronare imperatore?", ["1804", "1799", "1815", "1789"], "Si incoronò da solo a Notre-Dame."),
    q4("Quale battaglia segnò la sconfitta definitiva di Napoleone nel 1815?", ["Waterloo", "Austerlitz", "Lipsia", "Trafalgar"], "Dopo Waterloo fu esiliato a Sant'Elena."),
    q4("Che cos'era il Congresso di Vienna (1814-15)?", ["La riunione delle potenze europee per riordinare l'Europa dopo Napoleone", "Un trattato commerciale", "Una crociata", "Un concilio"], "Furono protagonisti Metternich, Talleyrand e lo zar Alessandro I."),
    q4("Quale principio guidò il Congresso di Vienna?", ["La legittimità dei sovrani", "La sovranità popolare", "Il nazionalismo", "La libertà di stampa"], "Si volevano restaurare i sovrani cacciati dalla Rivoluzione e da Napoleone."),
    q4("Che cos'è la Santa Alleanza?", ["Un'alleanza di Russia, Austria e Prussia per difendere l'ordine conservatore", "Un'alleanza tra papa e Francia", "Un patto tra repubbliche", "Un esercito di crociati"], "Servì a reprimere i moti liberali.")
  );
  BANK.scienze.push(
    q4("Quante camere ha il cuore umano?", ["4", "2", "3", "5"], "Due atri e due ventricoli."),
    q4("Che cosa trasportano i globuli rossi?", ["Ossigeno", "Anticorpi", "Ormoni", "Glucosio"], "Contengono l'emoglobina."),
    q4("Quali vasi portano il sangue dal cuore ai tessuti?", ["Le arterie", "Le vene", "I vasi linfatici", "Gli alveoli"], "Le vene lo riportano al cuore."),
    q4("Dove avviene lo scambio di gas nei polmoni?", ["Negli alveoli", "Nei bronchi", "Nella trachea", "Nella laringe"], "Ossigeno e anidride carbonica attraversano le pareti alveolari."),
    q4("Qual è il principale muscolo della respirazione?", ["Il diaframma", "Il bicipite", "Il trapezio", "Il gluteo"], "Si contrae per far entrare l'aria."),
    q4("Dove inizia la digestione dei carboidrati?", ["Nella bocca", "Nello stomaco", "Nell'intestino crasso", "Nel fegato"], "L'amilasi salivare scompone l'amido."),
    q4("Dove avviene la maggior parte dell'assorbimento dei nutrienti?", ["Nell'intestino tenue", "Nello stomaco", "Nell'esofago", "Nel colon"], "Le sue pareti hanno milioni di villi."),
    q4("Qual è una funzione del fegato?", ["Produrre la bile e trasformare molte sostanze", "Produrre gli ormoni sessuali", "Produrre la saliva", "Pompare il sangue"], "È la più grande ghiandola del corpo."),
    q4("Quale organo produce l'insulina?", ["Il pancreas", "Il fegato", "Il rene", "La milza"], "L'insulina abbassa la glicemia."),
    q4("Che cosa fanno i reni?", ["Filtrano il sangue e producono urina", "Producono la bile", "Producono gli anticorpi", "Pompano il sangue"], "Eliminano le scorie e regolano i liquidi."),
    q4("Qual è l'unità funzionale del sistema nervoso?", ["Il neurone", "Il tendine", "Il globulo", "L'alveolo"], "Trasmette impulsi elettrici e chimici."),
    q4("Che cos'è la sinapsi?", ["Il punto di contatto tra due neuroni", "Un tipo di neurone", "Una vena", "Un muscolo"], "Il segnale passa grazie ai neurotrasmettitori."),
    q4("Che cosa sono gli anticorpi?", ["Proteine che riconoscono e neutralizzano gli agenti estranei", "Globuli rossi", "Ormoni", "Batteri utili"], "Sono prodotti dai linfociti B."),
    q4("Come agisce un vaccino?", ["Addestra il sistema immunitario a riconoscere un agente patogeno", "Uccide direttamente i virus", "Cura la malattia in corso", "Sostituisce gli anticorpi"], "Prepara la risposta immunitaria prima dell'infezione."),
    q4("Quale differenza c'è tra virus e batteri?", ["I virus non sono cellule e si riproducono dentro altre cellule", "I batteri sono più piccoli dei virus", "I virus sono cellule procarioti", "Non c'è differenza"], "I batteri sono organismi unicellulari."),
    q4("Contro che cosa sono efficaci gli antibiotici?", ["Contro i batteri", "Contro i virus", "Contro i funghi soltanto", "Contro tutti i microrganismi"], "Non curano le malattie virali, come l'influenza."),
    q4("Che cosa producono le ghiandole endocrine?", ["Ormoni", "Enzimi digestivi", "Sudore", "Lacrime"], "Gli ormoni passano direttamente nel sangue."),
    q4("Quante ossa ha uno scheletro adulto?", ["206", "180", "300", "150"], "Alla nascita sono di più, ma molte si fondono."),
    q4("Che cosa collega i tendini?", ["I muscoli alle ossa", "Le ossa tra loro", "I nervi ai muscoli", "I vasi agli organi"], "I legamenti collegano invece ossa a ossa."),
    q4("Quale vitamina si produce con l'esposizione al sole?", ["La vitamina D", "La vitamina C", "La vitamina A", "La vitamina K"], "Serve per assorbire il calcio."),
    q4("Che cos'è la glicemia?", ["La concentrazione di glucosio nel sangue", "Il pH del sangue", "Il numero di globuli", "La pressione arteriosa"], "È regolata da insulina e glucagone."),
    q4("Qual è la funzione dei globuli bianchi?", ["Difendere l'organismo dalle infezioni", "Trasportare ossigeno", "Coagulare il sangue", "Produrre bile"], "Fanno parte del sistema immunitario."),
    q4("Qual è l'organo più esteso del corpo umano?", ["La pelle", "Il fegato", "L'intestino", "Il polmone"], "Protegge dall'ambiente esterno e regola la temperatura."),
    q4("Quale struttura protegge il midollo spinale?", ["La colonna vertebrale", "La gabbia toracica", "Il cranio", "Il bacino"], "Le vertebre formano un canale protettivo.")
  );
  BANK.civica.push(
    q4("Che cos'è il PIL?", ["Il valore dei beni e servizi prodotti in un Paese in un anno", "Il totale dei risparmi", "Il debito pubblico", "Le tasse pagate"], "È il prodotto interno lordo."),
    q4("Che cos'è l'inflazione?", ["L'aumento generalizzato e continuo dei prezzi", "La diminuzione dei prezzi", "L'aumento dei salari", "La svalutazione del debito"], "Riduce il potere d'acquisto della moneta."),
    q4("Che cos'è il debito pubblico?", ["L'insieme dei debiti dello Stato verso chi gli presta denaro", "I risparmi dei cittadini", "Le tasse arretrate", "Il bilancio dei comuni"], "Lo Stato si finanzia anche con i titoli di Stato."),
    q4("Che cos'è la legge di bilancio?", ["La legge che stabilisce entrate e spese dello Stato per l'anno", "La legge elettorale", "Un decreto del Governo", "Una sentenza"], "Va approvata ogni anno dal Parlamento."),
    q4("Che cosa dice la legge della domanda e dell'offerta?", ["Il prezzo tende a salire se la domanda supera l'offerta", "Il prezzo non cambia mai", "Il prezzo scende se la domanda aumenta", "L'offerta decide da sola il prezzo"], "Il prezzo si forma sul mercato."),
    q4("Che cos'è un'imposta progressiva?", ["Un'imposta con aliquote che crescono con il reddito", "Un'imposta uguale per tutti", "Un'imposta sui beni di lusso", "Un'imposta locale"], "Lo prevede l'articolo 53 della Costituzione."),
    q4("Quale imposta è diretta?", ["L'IRPEF", "L'IVA", "Le accise", "Il dazio"], "L'IRPEF colpisce direttamente il reddito."),
    q4("Che cos'è l'IVA?", ["L'imposta sul valore aggiunto, pagata sui consumi", "L'imposta sul reddito", "L'imposta sulla casa", "Un contributo previdenziale"], "L'aliquota ordinaria italiana è il 22%."),
    q4("Che cos'è il tasso di interesse?", ["Il costo del denaro preso in prestito", "Il prezzo di un bene", "L'inflazione", "Il PIL"], "Chi presta denaro riceve un interesse."),
    q4("Che cos'è l'OMC?", ["L'Organizzazione mondiale del commercio, che regola gli scambi tra Stati", "Un'agenzia sanitaria", "Un tribunale", "Un fondo per l'ambiente"], "Ha sede a Ginevra."),
    q4("Che cos'è la NATO?", ["Un'alleanza militare difensiva nata nel 1949", "Un'organizzazione commerciale", "Un parlamento europeo", "Un tribunale"], "Fu fondata dal Trattato dell'Atlantico del Nord."),
    q4("Di che cosa si occupa l'OMS?", ["Di salute", "Di commercio", "Di istruzione", "Di agricoltura"], "È l'agenzia dell'ONU per la sanità."),
    q4("Di che cosa si occupa la FAO?", ["Di alimentazione e agricoltura", "Di salute", "Di cultura", "Di lavoro"], "Ha sede a Roma."),
    q4("Che cos'è un contratto di lavoro a tempo indeterminato?", ["Un contratto senza data di fine prestabilita", "Un contratto di un anno", "Un contratto di sei mesi", "Un contratto senza retribuzione"], "È la forma tipica del lavoro dipendente."),
    q4("Che cos'è il TFR?", ["Una somma accantonata e pagata alla fine del rapporto di lavoro", "Una tassa fissa", "Una tessera sanitaria", "Un tributo regionale"], "È il trattamento di fine rapporto."),
    q4("Che cos'è l'INPS?", ["L'ente che gestisce pensioni e prestazioni previdenziali", "Un sindacato", "Un ministero", "Una banca"], "Riceve i contributi dei lavoratori."),
    q4("Che cos'è un sindacato?", ["Un'associazione che tutela i diritti dei lavoratori", "Un partito politico", "Un'impresa", "Un tribunale"], "L'articolo 39 ne riconosce la libertà."),
    q4("Che cosa impone la normativa sulla sicurezza sul lavoro?", ["Al datore di lavoro di prevenire gli infortuni", "Il salario minimo", "Il diritto di sciopero", "Il TFR"], "Il testo base è il D.lgs. 81 del 2008."),
    q4("Che cos'è il diritto d'autore?", ["Il diritto dell'autore di decidere come usare la sua opera", "Il diritto di leggere gratis", "Una tassa", "Un marchio"], "Protegge libri, musica, film, software."),
    q4("Quale articolo cita anche la tutela dell'ambiente, della biodiversità e degli ecosistemi, nell'interesse delle future generazioni?", ["Articolo 9", "Articolo 41", "Articolo 32", "Articolo 3"], "È stato modificato nel 2022."),
    q4("Che cos'è l'economia circolare?", ["Un modello che riduce i rifiuti riusando e riciclando", "Un modello basato sull'usa e getta", "Un tipo di moneta", "Un sistema bancario"], "Si oppone all'economia «lineare»."),
    q4("Che cos'è il commercio equo e solidale?", ["Scambi che garantiscono prezzi giusti ai produttori dei Paesi poveri", "Un commercio senza tasse", "Il commercio online", "Le vendite a prezzo scontato"], "Tutela produttori e lavoratori."),
    q4("Che cos'è la globalizzazione?", ["L'intensificarsi di scambi economici, culturali e di persone a livello mondiale", "La chiusura dei confini", "La fine del commercio", "Una guerra mondiale"], "È favorita da trasporti e tecnologie digitali."),
    q4("Quale organizzazione sostiene gli Stati in difficoltà finanziarie?", ["Il Fondo monetario internazionale", "L'UNESCO", "L'OMS", "La FAO"], "Ha sede a Washington.")
  );

  pairs.italiano.push(
    q4p("Collega ogni autore alla sua opera.", [["Foscolo", "Dei sepolcri"], ["Parini", "Il giorno"], ["Beccaria", "Dei delitti e delle pene"], ["Galileo", "Dialogo sui massimi sistemi"], ["Goldoni", "La locandiera"], ["Leopardi", "Canti"]]),
    q4p("Collega ogni movimento al suo periodo.", [["Barocco", "Seicento"], ["Arcadia", "fine Seicento"], ["Illuminismo", "Settecento"], ["Neoclassicismo", "fine Settecento"], ["Romanticismo", "primo Ottocento"]]),
    q4p("Collega ogni termine alla sua definizione.", [["Barocco", "meraviglia e artificio"], ["Illuminismo", "primato della ragione"], ["Romanticismo", "sentimento e individuo"], ["Arcadia", "poesia pastorale"], ["Verso sciolto", "endecasillabo senza rime"]]),
    q4p("Collega ogni opera al suo autore.", [["Gerusalemme liberata", "Tasso"], ["Il giorno", "Parini"], ["Saul", "Alfieri"], ["La locandiera", "Goldoni"], ["Dei sepolcri", "Foscolo"], ["Canti", "Leopardi"]])
  );
  pairs.inglese.push(
    q4p("Collega ogni verbo al suo participio passato.", [["begin", "begun"], ["fly", "flown"], ["swim", "swum"], ["wear", "worn"], ["steal", "stolen"], ["hide", "hidden"], ["forgive", "forgiven"], ["ring", "rung"]], { rEn: true }),
    q4p("Collega ogni phrasal verb al suo significato.", [["come across", "imbattersi in"], ["bring up", "allevare"], ["turn down", "rifiutare"], ["look into", "indagare"], ["figure out", "capire"], ["make up", "inventare"]]),
    q4p("Collega ogni parola alla sua traduzione.", [["actual", "reale"], ["realise", "rendersi conto"], ["sympathy", "compassione"], ["attend", "frequentare"], ["magazine", "rivista"], ["argument", "discussione"]]),
    q4p("Collega ogni aggettivo al suo contrario.", [["reliable", "unreliable"], ["honest", "dishonest"], ["tolerant", "intolerant"], ["relevant", "irrelevant"], ["appropriate", "inappropriate"], ["possible", "impossible"]], { rEn: true })
  );
  pairs.storia.push(
    q4p("Collega ogni data al suo avvenimento.", [["1618", "guerra dei trent'anni"], ["1648", "pace di Vestfalia"], ["1688", "Gloriosa rivoluzione"], ["1776", "indipendenza americana"], ["1789", "presa della Bastiglia"], ["1799", "colpo di Stato di Napoleone"], ["1804", "Napoleone imperatore"], ["1815", "battaglia di Waterloo"]]),
    q4p("Collega ogni personaggio alla sua impresa.", [["Luigi XIV", "Re Sole"], ["Cromwell", "repubblica inglese"], ["Newton", "gravitazione universale"], ["Rousseau", "contratto sociale"], ["Robespierre", "Terrore"], ["Napoleone", "Codice civile"], ["Metternich", "Restaurazione"], ["Washington", "primo presidente USA"]]),
    q4p("Collega ogni termine al suo significato.", [["Assolutismo", "tutti i poteri al re"], ["Illuminismo", "primato della ragione"], ["Ancien régime", "società per ordini"], ["Terzo stato", "borghesi e popolo"], ["Restaurazione", "ritorno dei sovrani legittimi"], ["Giacobini", "rivoluzionari radicali"]])
  );
  pairs.scienze.push(
    q4p("Collega ogni organo umano alla sua funzione.", [["Cuore", "pompa il sangue"], ["Polmoni", "scambio di gas"], ["Fegato", "produce la bile"], ["Reni", "filtrano il sangue"], ["Pancreas", "produce insulina"], ["Stomaco", "digerisce le proteine"]]),
    q4p("Collega ogni componente del sangue alla sua funzione.", [["Globuli rossi", "trasportano ossigeno"], ["Globuli bianchi", "difendono dalle infezioni"], ["Piastrine", "coagulazione"], ["Plasma", "parte liquida"]]),
    q4p("Collega ogni ormone alla sua ghiandola.", [["Insulina", "pancreas"], ["Adrenalina", "surrenali"], ["Tiroxina", "tiroide"], ["Melatonina", "epifisi"]]),
    q4p("Collega ogni elemento al suo simbolo.", [["Oro", "Au"], ["Platino", "Pt"], ["Uranio", "U"], ["Bario", "Ba"], ["Cobalto", "Co"], ["Nichel", "Ni"]])
  );
  pairs.civica.push(
    q4p("Collega ogni sigla al suo significato.", [["PIL", "prodotto interno lordo"], ["IVA", "imposta sul valore aggiunto"], ["INPS", "previdenza sociale"], ["BCE", "Banca centrale europea"], ["FMI", "Fondo monetario internazionale"], ["OMC", "Organizzazione mondiale del commercio"]]),
    q4p("Collega ogni organizzazione internazionale al suo settore.", [["OMS", "salute"], ["FAO", "alimentazione e agricoltura"], ["UNESCO", "istruzione, scienza e cultura"], ["UNICEF", "infanzia"], ["NATO", "difesa militare"], ["OMC", "commercio"]]),
    q4p("Collega ogni imposta alla sua base.", [["IRPEF", "il reddito"], ["IVA", "i consumi"], ["IMU", "gli immobili"], ["IRES", "le società"]]),
    q4p("Collega ogni articolo della Carta al suo tema.", [["Art. 9", "paesaggio e ambiente"], ["Art. 32", "salute"], ["Art. 34", "scuola"], ["Art. 35", "tutela del lavoro"], ["Art. 39", "libertà sindacale"], ["Art. 42", "proprietà privata"], ["Art. 47", "tutela del risparmio"]])
  );

  seqs.storia.push(
    SQ4("Metti in ordine di tempo, dal più antico.", ["Guerra dei trent'anni", "Pace di Vestfalia", "Gloriosa rivoluzione", "Indipendenza americana", "Presa della Bastiglia"]),
    SQ4("Metti in ordine di tempo, dal più antico.", ["Presa della Bastiglia", "Esecuzione di Luigi XVI", "Colpo di Stato di Napoleone", "Incoronazione di Napoleone", "Waterloo"]),
    SQ4("Metti in ordine di tempo, dal più antico.", ["Galileo condannato", "Newton pubblica i Principia", "Encyclopédie", "Dichiarazione d'indipendenza americana"])
  );
  seqs.scienze.push(
    SQ4("Metti in fila il percorso del cibo.", ["Bocca", "Esofago", "Stomaco", "Intestino tenue", "Intestino crasso"]),
    SQ4("Metti in fila il percorso dell'aria.", ["Naso", "Faringe", "Laringe", "Trachea", "Bronchi", "Alveoli"]),
    SQ4("Metti in fila il percorso del sangue nel cuore.", ["Atrio destro", "Ventricolo destro", "Polmoni", "Atrio sinistro", "Ventricolo sinistro"])
  );
  seqs.civica.push(
    SQ4("Metti in ordine di tempo, dal più antico.", ["Nascita dell'ONU", "Nascita della NATO", "Trattati di Roma", "Trattato di Maastricht", "Introduzione dell'euro"])
  );
  seqs.italiano.push(
    SQ4("Metti in ordine di tempo, dal più antico.", ["Gerusalemme liberata", "Dialogo sopra i due massimi sistemi", "La locandiera", "Dei sepolcri", "Canti"]),
    SQ4("Metti in ordine di tempo, dal più antico.", ["Barocco", "Arcadia", "Illuminismo", "Neoclassicismo", "Romanticismo"])
  );
  seqs.inglese.push(
    SQ4("Metti in fila le età della vita.", ["childhood", "adolescence", "adulthood", "middle age", "old age"]),
    SQ4("Metti in fila dal volume più basso al più alto.", ["whisper", "speak", "shout", "scream"]),
    SQ4("Metti in fila dal giudizio più negativo al più positivo.", ["bad", "poor", "fair", "good", "excellent"])
  );

  errors.italiano.push(
    ER4("Una sola affermazione è falsa: quale?", ["Tasso scrisse la Gerusalemme liberata.", "Goldoni riformò la commedia italiana.", "Alfieri scrisse La locandiera.", "Foscolo scrisse Dei sepolcri."], 2, "Goldoni scrisse La locandiera.", "Alfieri è l'autore di tragedie come il «Saul»."),
    ER4("Una sola affermazione è falsa: quale?", ["L'Illuminismo si affida alla ragione.", "Il Romanticismo esalta il sentimento.", "Il Barocco ricerca la semplicità e la misura.", "L'Arcadia propone una poesia pastorale."], 2, "Il Barocco ricerca la meraviglia e l'artificio.", "La semplicità è più vicina all'Arcadia."),
    ER4("Una sola affermazione è falsa: quale?", ["Leopardi nacque a Recanati.", "Parini scrisse Il giorno.", "Beccaria scrisse Dei sepolcri.", "Manzoni scrisse Il cinque maggio."], 2, "Beccaria scrisse Dei delitti e delle pene.", "Dei sepolcri è di Foscolo."),
    ER4("Una sola affermazione è falsa: quale?", ["Il verso sciolto non ha rime.", "L'endecasillabo ha undici sillabe.", "Il sonetto ha sedici versi.", "L'ottava è una strofa di otto versi."], 2, "Il sonetto ha quattordici versi.", "Due quartine e due terzine."),
    ER4("Una sola affermazione è falsa: quale?", ["Per il pessimismo cosmico la natura è sempre benigna.", "Leopardi scrisse L'infinito.", "Leopardi nacque nel 1798.", "I Canti sono una raccolta di poesie."], 0, "Per il pessimismo cosmico la natura è indifferente o ostile.", "Dalla natura nasce l'infelicità dell'uomo.")
  );
  errors.inglese.push(
    ER4("Una sola frase ha un errore: quale?", ["I remember to meet him last year.", "I remember meeting him last year.", "Remember to lock the door.", "I forgot to call you."], 0, "I remember meeting him last year.", "Per un ricordo si usa «remember» + -ing.", { en: true }),
    ER4("Una sola frase ha un errore: quale?", ["She denied to take the money.", "She denied taking the money.", "He managed to pass.", "They refused to help."], 0, "She denied taking the money.", "Dopo «deny» si usa -ing.", { en: true }),
    ER4("Una sola frase ha un errore: quale?", ["Hardly he had left when the phone rang.", "Hardly had he left when the phone rang.", "No sooner had we arrived than it rained.", "Never have I seen such a view."], 0, "Hardly had he left when the phone rang.", "Con «hardly» all'inizio c'è l'inversione.", { en: true }),
    ER4("Una sola frase ha un errore: quale?", ["I'd rather you don't smoke here.", "I'd rather you didn't smoke here.", "I'd rather stay at home.", "I'd rather not go."], 0, "I'd rather you didn't smoke here.", "«Would rather» + soggetto diverso richiede il past simple.", { en: true }),
    ER4("Una sola frase ha un errore: quale?", ["If I would be you, I'd accept.", "If I were you, I'd accept.", "If she had called, I would have answered.", "Unless you hurry, you'll be late."], 0, "If I were you, I'd accept.", "Nel second conditional si usa il past simple, qui «were».", { en: true }),
    ER4("Una sola frase ha un errore: quale?", ["He told that he was tired.", "He said that he was tired.", "He told me that he was tired.", "She said to me that she was ill."], 0, "He said that he was tired.", "«Tell» vuole il complemento di persona.", { en: true })
  );
  errors.storia.push(
    ER4("Una sola data è sbagliata: quale?", ["La guerra dei trent'anni iniziò nel 1618.", "La Gloriosa rivoluzione è del 1688.", "La presa della Bastiglia è del 1799.", "Napoleone fu sconfitto a Waterloo nel 1815."], 2, "La presa della Bastiglia è del 1789.", "Il 1799 è l'anno del colpo di Stato di Napoleone."),
    ER4("Una sola affermazione è falsa: quale?", ["La Gloriosa rivoluzione limitò il potere del re inglese.", "Cromwell guidò la repubblica inglese.", "Newton formulò la legge di gravitazione universale.", "Rousseau scrisse Lo spirito delle leggi."], 3, "Montesquieu scrisse Lo spirito delle leggi.", "Rousseau è l'autore del «Contratto sociale»."),
    ER4("Una sola affermazione è falsa: quale?", ["Gli Stati Uniti dichiararono l'indipendenza nel 1776.", "Le tredici colonie si ribellarono alla Gran Bretagna.", "La rivoluzione industriale iniziò in Francia.", "La macchina a vapore fu centrale nella rivoluzione industriale."], 2, "La rivoluzione industriale iniziò in Inghilterra.", "Nacque lì verso la metà del Settecento."),
    ER4("Una sola affermazione è falsa: quale?", ["Il Congresso di Vienna si tenne nel 1814-15.", "La Restaurazione riportò sul trono i sovrani legittimi.", "Napoleone fu esiliato a Sant'Elena dopo Waterloo.", "La Santa Alleanza difendeva i princìpi della Rivoluzione francese."], 3, "La Santa Alleanza difendeva l'ordine conservatore.", "Serviva a reprimere i moti liberali."),
    ER4("Una sola affermazione è falsa: quale?", ["Nell'Ancien régime la società era divisa in tre ordini.", "Il Terzo stato comprendeva borghesi e popolo.", "Robespierre fu un nobile realista.", "I giacobini erano rivoluzionari radicali."], 2, "Robespierre fu un capo dei giacobini.", "Guidò il Terrore del 1793-94.")
  );
  errors.scienze.push(
    ER4("Una sola affermazione è falsa: quale?", ["Il cuore umano ha quattro camere.", "Le arterie portano il sangue dal cuore ai tessuti.", "Lo scambio di gas avviene nello stomaco.", "I globuli rossi trasportano ossigeno."], 2, "Lo scambio di gas avviene negli alveoli.", "Lo stomaco fa parte dell'apparato digerente."),
    ER4("Una sola affermazione è falsa: quale?", ["Il pancreas produce insulina.", "I reni filtrano il sangue.", "Gli antibiotici sono efficaci contro i virus.", "I vaccini addestrano il sistema immunitario."], 2, "Gli antibiotici agiscono contro i batteri, non contro i virus.", "Contro i virus si usano vaccini e, a volte, antivirali."),
    ER4("Una sola affermazione è falsa: quale?", ["Il neurone è l'unità del sistema nervoso.", "La sinapsi è il contatto tra due neuroni.", "I tendini collegano le ossa tra loro.", "Un adulto ha 206 ossa."], 2, "I tendini collegano i muscoli alle ossa.", "Le ossa sono unite tra loro dai legamenti."),
    ER4("Una sola affermazione è falsa: quale?", ["L'assorbimento dei nutrienti avviene soprattutto nell'intestino tenue.", "La digestione dei carboidrati inizia nella bocca.", "Il fegato produce la saliva.", "Il diaframma è il principale muscolo della respirazione."], 2, "Il fegato produce la bile.", "La saliva è prodotta dalle ghiandole salivari."),
    ER4("Una sola affermazione è falsa: quale?", ["La pelle è l'organo più esteso.", "La vitamina D si forma con l'esposizione al sole.", "Gli anticorpi sono prodotti dai globuli rossi.", "La glicemia è il livello di glucosio nel sangue."], 2, "Gli anticorpi sono prodotti dai linfociti B.", "Sono globuli bianchi.")
  );
  errors.civica.push(
    ER4("Una sola affermazione è falsa: quale?", ["Il PIL misura la produzione di un Paese in un anno.", "L'inflazione è l'aumento generale dei prezzi.", "L'IVA è un'imposta diretta sul reddito.", "Il debito pubblico è il debito dello Stato."], 2, "L'IVA è un'imposta sui consumi.", "L'imposta diretta sul reddito è l'IRPEF."),
    ER4("Una sola affermazione è falsa: quale?", ["L'IRPEF è un'imposta progressiva.", "La NATO è un'alleanza militare.", "L'OMS si occupa di commercio.", "La FAO si occupa di alimentazione."], 2, "L'OMS si occupa di salute.", "Del commercio si occupa l'OMC."),
    ER4("Una sola affermazione è falsa: quale?", ["Il TFR è una somma accantonata e pagata a fine rapporto.", "L'INPS gestisce le pensioni.", "Il sindacato tutela i lavoratori.", "Il contratto a tempo indeterminato ha una data di fine."], 3, "Il contratto a tempo indeterminato non ha una data di fine.", "È il contrario del contratto a termine."),
    ER4("Una sola affermazione è falsa: quale?", ["Il commercio equo garantisce prezzi giusti ai produttori.", "L'economia circolare riduce i rifiuti.", "La globalizzazione ha chiuso gli scambi tra Paesi.", "L'articolo 9 tutela anche l'ambiente."], 2, "La globalizzazione ha intensificato gli scambi tra Paesi.", "Merci, persone e idee circolano di più.")
  );

  stima.storia.push(
    ST4("In che anno finì la guerra dei trent'anni?", 1500, 1800, 1648, 15, "", "Con la pace di Vestfalia, nel 1648."),
    ST4("In che anno avvenne la Gloriosa rivoluzione?", 1500, 1800, 1688, 10, "", "Nel 1688."),
    ST4("In che anno gli Stati Uniti dichiararono l'indipendenza?", 1600, 1900, 1776, 8, "", "Nel 1776."),
    ST4("In che anno fu presa la Bastiglia?", 1700, 1900, 1789, 6, "", "Il 14 luglio 1789."),
    ST4("In che anno Napoleone si fece incoronare imperatore?", 1700, 1900, 1804, 6, "", "Nel 1804."),
    ST4("In che anno fu combattuta la battaglia di Waterloo?", 1700, 1900, 1815, 6, "", "Nel 1815.")
  );
  stima.scienze.push(
    ST4("Quante ossa ha un adulto?", 100, 400, 206, 20, "", "Sono 206."),
    ST4("Quanti battiti al minuto ha il cuore di un adulto a riposo, circa?", 20, 200, 70, 15, "", "Di solito tra 60 e 80.", 5),
    ST4("Quanti litri di sangue ha circa un adulto?", 0, 20, 5, 1.5, "litri", "Circa 5 litri.", 0.5),
    ST4("Qual è la temperatura normale del corpo umano (in °C)?", 30, 45, 36.5, 1, "°C", "Circa 36,5 °C.", 0.1)
  );
  stima.civica.push(
    ST4("In che anno nacque la NATO?", 1900, 2000, 1949, 3, "", "Nel 1949."),
    ST4("Quanto vale l'aliquota IVA ordinaria in Italia (in %)?", 0, 50, 22, 2, "%", "È il 22%."),
    ST4("In che anno entrò in vigore il Trattato di Maastricht?", 1980, 2010, 1993, 2, "", "Il 1° novembre 1993."),
    ST4("In che anno nacque l'ONU?", 1900, 2000, 1945, 4, "", "Nel 1945.")
  );

  cloze.italiano.push(
    CL4("Foscolo scrisse «Dei ___».", ["sepolcri", "delitti", "mali", "giorni"], "Il carme «Dei sepolcri» è del 1807."),
    CL4("Il verso sciolto è privo di ___.", ["rima", "accenti", "sillabe", "metrica"], "Di solito è un endecasillabo senza rima."),
    CL4("L'Illuminismo vuole liberare l'uomo dal pregiudizio con la ___.", ["ragione", "fede", "tradizione", "magia"], "Si definisce anche «secolo dei Lumi»."),
    CL4("Beccaria scrisse «Dei delitti e delle ___».", ["pene", "leggi", "virtù", "colpe"], "È un'opera contro la tortura e la pena di morte."),
    CL4("Leopardi nacque a ___.", ["Recanati", "Firenze", "Milano", "Napoli"], "La sua città natale è nelle Marche."),
    CL4("Se tu ___ studiato, avresti superato l'esame.", ["avessi", "avresti", "hai", "avrai"], "Ipotesi irreale del passato: congiuntivo trapassato."),
    CL4("Sebbene non ___ d'accordo, accettò.", ["fosse", "era", "sarebbe", "è"], "«Sebbene» vuole il congiuntivo."),
    CL4("Non c'è nessuno ___ possa aiutarmi.", ["che", "cui", "il quale", "dove"], "Relativa con il congiuntivo dopo «nessuno»."),
    CL4("Il poeta ___ versi ammiriamo è Leopardi.", ["i cui", "di cui", "che i", "dove"], "«I cui» indica possesso."),
    CL4("«Uscendo di casa, spensi la luce»: «uscendo» è un ___.", ["gerundio", "participio", "infinito", "congiuntivo"], "Forma una subordinata temporale implicita.")
  );
  cloze.inglese.push(
    CL4("By next year, she ___ her degree.", ["will have finished", "finishes", "has finished", "will finish"], "Future perfect.", { en: true }),
    CL4("Had I known, I ___ differently.", ["would have acted", "would act", "had acted", "will act"], "Third conditional con inversione.", { en: true }),
    CL4("I'd rather you ___ smoke here.", ["didn't", "don't", "wouldn't", "won't"], "Would rather + past simple.", { en: true }),
    CL4("She denied ___ the money.", ["taking", "to take", "take", "took"], "Deny + -ing.", { en: true }),
    CL4("He managed ___ the exam.", ["to pass", "passing", "pass", "passed"], "Manage + infinito.", { en: true }),
    CL4("I remember ___ him last year.", ["meeting", "to meet", "meet", "met"], "Remember + -ing.", { en: true }),
    CL4("___ the traffic, we arrived on time.", ["Despite", "Although", "Because", "Unless"], "Despite + nome.", { en: true }),
    CL4("You won't get in ___ you book early.", ["unless", "if", "when", "although"], "Unless = a meno che non.", { en: true }),
    CL4("She asked me whether I ___ the answer.", ["knew", "know", "will know", "have known"], "Domanda indiretta al passato.", { en: true }),
    CL4("He said he ___ call me the next day.", ["would", "will", "shall", "can"], "will → would nel discorso indiretto.", { en: true }),
    CL4("The car, ___ was very old, broke down.", ["which", "who", "what", "whom"], "Per le cose: which.", { en: true }),
    CL4("It's high time we ___ home.", ["went", "go", "will go", "going"], "«It's high time» + past simple.", { en: true })
  );
  askRules.push(
    [/autore alla sua opera/, "Quale opera scrisse ", "?"],
    [/movimento al suo periodo/, "In quale periodo si sviluppò ", "?"],
    [/organo umano alla sua funzione/, "Qual è la funzione di ", "?"],
    [/componente del sangue/, "Qual è la funzione di ", "?"],
    [/ormone alla sua ghiandola/, "Da quale ghiandola è prodotta ", "?"],
    [/sigla al suo significato/, "Che cosa significa ", "?"],
    [/organizzazione internazionale al suo settore/, "Di che cosa si occupa ", "?"],
    [/imposta alla sua base/, "Su che cosa si paga ", "?"]
  );

  // ================================================================ 5ª SUPERIORE (classe 12)
  function math12() {
    const t = rnd(0, 9);
    if (t === 0) {   // derivata di un monomio
      const a = rnd(2, 9), n = rnd(2, 6);
      return mk(`Qual è la derivata di ${a}x${sup(n)}?`, `${a * n}x${n - 1 === 1 ? "" : sup(n - 1)}`, [`${a}x${sup(n - 1)}`, `${a * n}x${sup(n)}`, `${a * (n - 1)}x${n - 1 === 1 ? "" : sup(n - 1)}`, `${n}x${n - 1 === 1 ? "" : sup(n - 1)}`], `D(a·xⁿ) = a·n·xⁿ⁻¹: ${a}·${n} = ${a * n}, e l'esponente scende a ${n - 1}.`);
    }
    if (t === 1) {   // derivata di un polinomio in un punto
      const a = rnd(1, 5), b = rnd(1, 9), x0 = rnd(1, 4), v = 2 * a * x0 + b;
      return mk(`Data f(x) = ${a}x² + ${b}x, quanto vale f'(${x0})?`, v, [v + a, a * x0 * x0 + b * x0, 2 * a + b, v - b], `f'(x) = ${2 * a}x + ${b}, quindi f'(${x0}) = ${v}.`);
    }
    if (t === 2) {   // derivate notevoli
      const [f, d] = pick([["sen x", "cos x"], ["cos x", "−sen x"], ["eˣ", "eˣ"], ["ln x", "1/x"], ["tg x", "1 + tg² x"], ["√x", "1/(2√x)"]]);
      return mk(`Qual è la derivata di ${f}?`, d, ["cos x", "−sen x", "eˣ", "1/x", "−cos x", "x·eˣ⁻¹", "sen x", "1/(2√x)"].filter(v => v !== d), `È una derivata notevole: D(${f}) = ${d}.`);
    }
    if (t === 3) {   // integrale di un monomio
      const n = rnd(1, 5), k = rnd(2, 6);
      return mk(`Qual è una primitiva di ${k * (n + 1)}x${n === 1 ? "" : sup(n)}?`, `${k}x${sup(n + 1)}`, [`${k * (n + 1)}x${sup(n + 1)}`, `${k}x${n === 1 ? "" : sup(n)}`, `${k * (n + 1) * n}x${n === 1 ? "" : sup(n - 1)}`, `${k + 1}x${sup(n + 1)}`], `∫xⁿ dx = xⁿ⁺¹/(n+1): ${k * (n + 1)}/${n + 1} = ${k}, con esponente ${n + 1}.`);
    }
    if (t === 4) {   // integrale definito
      const n = rnd(1, 3), b = rnd(1, 3), v = Math.pow(b, n + 1) / (n + 1);
      if (Number.isInteger(v)) return mk(`Quanto vale l'integrale di x${n === 1 ? "" : sup(n)} da 0 a ${b}?`, v, [v + 1, v * 2, b ** n, v - 1].filter(x => x !== v), `[x${sup(n + 1)}/${n + 1}] da 0 a ${b} = ${b ** (n + 1)}/${n + 1} = ${v}.`);
      const a = rnd(2, 6), L = rnd(2, 5);
      return mk(`Quanto vale l'integrale di ${a} da 0 a ${L}?`, a * L, [a + L, a * L + a, a * L - L, L * L], `L'integrale di una costante è costante · ampiezza = ${a} · ${L} = ${a * L}.`);
    }
    if (t === 5) {   // limiti
      const [l, r] = pick([["lim (x→∞) 1/x", "0"], ["lim (x→0) sen x / x", "1"], ["lim (x→∞) eˣ", "+∞"], ["lim (x→0⁺) ln x", "−∞"], ["lim (x→∞) (3x² + 1)/(x² − 5)", "3"], ["lim (x→∞) (2x + 1)/(x² + 3)", "0"], ["lim (x→∞) (5x³ + 1)/(x³ − 2x)", "5"], ["lim (x→∞) e⁻ˣ", "0"], ["lim (x→2) (x² − 4)/(x − 2)", "4"], ["lim (x→3) (x² − 9)/(x − 3)", "6"], ["lim (x→1) (x² − 1)/(x − 1)", "2"]]);
      return mk(`Quanto vale ${l}?`, r, ["0", "1", "+∞", "−∞", "2", "3", "4", "5", "6"].filter(v => v !== r), `Si risolve con i limiti notevoli o con il confronto tra i gradi: il risultato è ${r}.`);
    }
    if (t === 6) {   // massimi e minimi
      const h = rnd(1, 6), k = rnd(1, 9);
      return mk(`La funzione f(x) = (x − ${h})² + ${k} ha un minimo. Per quale x?`, h, [-h, k, h + k, h * 2], `f'(x) = 2(x − ${h}) = 0 per x = ${h}.`);
    }
    if (t === 7) {   // retta tangente
      const a = rnd(1, 4), x0 = rnd(1, 4), m = 2 * a * x0;
      return mk(`Qual è il coefficiente angolare della retta tangente a y = ${a}x² nel punto di ascissa ${x0}?`, m, [a * x0 * x0, m + a, a * x0, 2 * a], `m = f'(${x0}) = 2·${a}·${x0} = ${m}.`);
    }
    if (t === 8) {   // dominio
      const [f, d] = pick([["1/(x − 2)", "x ≠ 2"], ["√(x − 3)", "x ≥ 3"], ["ln(x)", "x > 0"], ["1/(x + 5)", "x ≠ −5"], ["√(x + 1)", "x ≥ −1"], ["ln(x − 4)", "x > 4"], ["1/x²", "x ≠ 0"]]);
      return mk(`Qual è il dominio di f(x) = ${f}?`, d, ["x ≠ 2", "x ≥ 3", "x > 0", "x ≠ −5", "x ≥ −1", "x > 4", "x ≠ 0", "x < 0", "x ≤ 0", "x ≠ 1"].filter(v => v !== d), `Il denominatore non si annulla, il radicando è ≥ 0 e l'argomento del logaritmo è > 0: ${d}.`);
    }
    const m = rnd(20, 90), s = rnd(2, 9);   // statistica
    const dati = [m - s, m, m + s, m];
    const med = dati.reduce((a, b) => a + b, 0) / 4;
    return mk(`Qual è la media di ${dati.join(", ")}?`, med, [med + s, med - s, m + s, med + 1], `(${dati.join(" + ")}) : 4 = ${med}.`);
  }
  function mathPairs12() {
    const gens = [
      () => { const [f, d] = pick([["sen x", "cos x"], ["cos x", "−sen x"], ["eˣ", "eˣ"], ["ln x", "1/x"], ["x²", "2x"], ["x³", "3x²"], ["5x", "5"], ["x⁴", "4x³"]]); return { l: f, r: d }; },
      () => { const [f, d] = pick([["2x", "x²"], ["3x²", "x³"], ["cos x", "sen x"], ["eˣ", "eˣ"], ["1/x", "ln x"], ["4x³", "x⁴"], ["6x", "3x²"]]); return { l: f, r: d }; },
      () => { const [l, r] = pick([["x → ∞, 1/x", "0"], ["sen x / x, x → 0", "1"], ["eˣ, x → ∞", "+∞"], ["ln x, x → 0⁺", "−∞"], ["e⁻ˣ, x → ∞", "0"], ["x², x → ∞", "+∞"]]); return { l, r }; }
    ];
    const gen = pick(gens), out = []; let g = 0;
    while (out.length < 4 && g++ < 300) { const p = gen(); if (!out.some(o => o.r === p.r || o.l === p.l)) out.push(p); }
    return out;
  }
  function filaMath12() {
    const sets = [["−1", "−1/2", "0", "1/2", "1"], ["ln 1", "ln e", "ln e²", "ln e³"], ["f'(x) = 1", "f'(x) = 2", "f'(x) = 5", "f'(x) = 10"], ["e⁰", "e¹", "e²", "e³"], ["−∞", "−1", "0", "1", "+∞"]];
    return { p: "Metti in fila dal più piccolo al più grande.", items: pick(sets) };
  }
  function mathError12() {
    const t = rnd(0, 2);
    if (t === 0) {
      const a = rnd(2, 9), n = rnd(3, 6);
      return { p: "In quale passaggio c'è l'errore?", rows: [`f(x) = ${a}x${sup(n)}`, `f'(x) = ${a}·${n}·x${sup(n - 1)}`, `f'(x) = ${a * n}x${sup(n)}`], wrong: 2, fix: `f'(x) = ${a * n}x${sup(n - 1)}`, e: "Derivando, l'esponente scende di uno.", steps: true };
    }
    if (t === 1) {
      const a = rnd(2, 6), b = rnd(2, 6);
      return { p: "In quale passaggio c'è l'errore?", rows: [`f(x) = x · eˣ`, `f'(x) = D(x) · D(eˣ)`, `f'(x) = 1 · eˣ = eˣ`], wrong: 1, fix: "f'(x) = 1·eˣ + x·eˣ = (1 + x)eˣ", e: "La derivata di un prodotto non è il prodotto delle derivate: D(f·g) = f'g + fg'.", steps: true };
    }
    const n = rnd(1, 3), k = rnd(2, 5);
    return { p: "In quale passaggio c'è l'errore?", rows: [`∫ ${k * (n + 1)}x${n === 1 ? "" : sup(n)} dx`, `= ${k * (n + 1)}·x${sup(n + 1)}/${n + 1}`, `= ${k}x${sup(n)} + c`], wrong: 2, fix: `= ${k}x${sup(n + 1)} + c`, e: "Integrando, l'esponente sale di uno.", steps: true };
  }
  function mathStima12() {
    const t = rnd(0, 2);
    if (t === 0) { const k = rnd(1, 4); return { q: `Stima e^${k}.`, min: 0, max: 60, ans: Math.round(Math.exp(k) * 10) / 10, tol: Math.max(1, Math.exp(k) * 0.08), unit: "", step: 0.1, e: `e^${k} ≈ ${String(Math.round(Math.exp(k) * 10) / 10).replace(".", ",")}.` }; }
    if (t === 1) { const [n, v] = pick([[2, 0.7], [3, 1.1], [5, 1.6], [10, 2.3], [20, 3.0], [100, 4.6]]); return { q: `Stima ln ${n}.`, min: 0, max: 6, ans: v, tol: 0.15, unit: "", step: 0.01, e: `ln ${n} ≈ ${String(v).replace(".", ",")}.` }; }
    return { q: "Stima il valore di π.", min: 2, max: 5, ans: 3.14, tol: 0.05, unit: "", step: 0.01, e: "π ≈ 3,14." };
  }
  MY.math[12] = math12; MY.pairs[12] = mathPairs12; MY.fila[12] = filaMath12; MY.error[12] = mathError12; MY.stima[12] = mathStima12;

  const { q: q5, T: q5p, SQ: SQ5, ER: ER5, ST: ST5, CL: CL5 } = H([12, 12]);
  BANK.italiano.push(
    q5("Chi scrisse «I Malavoglia»?", ["Giovanni Verga", "Luigi Pirandello", "Italo Svevo", "Giovanni Pascoli"], "È il primo romanzo del «Ciclo dei vinti»."),
    q5("Che cos'è il Verismo?", ["Il movimento che descrive la realtà sociale con impersonalità", "Il movimento che esalta il sogno", "Un movimento del Seicento", "Un movimento che imita i classici"], "Nasce in Italia nell'ultimo Ottocento, ispirato al Naturalismo francese."),
    q5("Che cos'è la «roba» per Mazzarò, in Verga?", ["La ricchezza materiale, a cui dedica tutta la vita", "Un tipo di vestito", "Un amore", "Un mestiere"], "Nella novella «La roba»."),
    q5("Che cos'è il «fanciullino» di Pascoli?", ["La parte sensibile e ingenua che vive in ogni poeta", "Un personaggio di romanzo", "Un figlio del poeta", "Un tipo di rima"], "Lo spiega nel saggio «Il fanciullino»."),
    q5("Quale raccolta di Pascoli parla della vita di campagna?", ["Myricae", "Alcyone", "Il piacere", "Canti orfici"], "«Myricae» = tamerici, piante umili."),
    q5("Chi scrisse «Il piacere»?", ["Gabriele D'Annunzio", "Giovanni Pascoli", "Luigi Pirandello", "Italo Svevo"], "Il protagonista è l'esteta Andrea Sperelli."),
    q5("Che cos'è il Decadentismo?", ["Il movimento che esprime crisi, malessere e ricerca dell'irrazionale", "Il movimento che esalta il progresso", "Un movimento del Settecento", "Un movimento illuminista"], "Si sviluppa tra fine Ottocento e primo Novecento."),
    q5("Chi è il protagonista de «Il fu Mattia Pascal»?", ["Mattia Pascal, che finge la propria morte per cambiare vita", "Zeno Cosini", "Andrea Sperelli", "Padron 'Ntoni"], "Il romanzo è di Pirandello, del 1904."),
    q5("Che cos'è l'umorismo secondo Pirandello?", ["Il «sentimento del contrario», che nasce dalla riflessione", "Un tipo di comicità semplice", "Una forma di satira politica", "Una rima"], "Dal saggio «L'umorismo» (1908)."),
    q5("Di che cosa parla «Uno, nessuno e centomila»?", ["Della frantumazione dell'identità: ognuno appare diverso agli altri", "Di una guerra", "Di un viaggio", "Di una famiglia di pescatori"], "Il protagonista è Vitangelo Moscarda."),
    q5("Chi scrisse «La coscienza di Zeno»?", ["Italo Svevo", "Luigi Pirandello", "Giuseppe Ungaretti", "Eugenio Montale"], "È un romanzo sulla psicoanalisi e sulla «malattia»."),
    q5("Chi scrisse «L'allegria»?", ["Giuseppe Ungaretti", "Eugenio Montale", "Salvatore Quasimodo", "Umberto Saba"], "Raccoglie poesie nate dall'esperienza della guerra."),
    q5("Che cosa descrive la poesia «Soldati» di Ungaretti?", ["La fragilità della vita dei soldati, come foglie d'autunno", "Una battaglia vittoriosa", "Un viaggio", "Una festa"], "È una delle poesie più brevi: «Si sta come d'autunno sugli alberi le foglie»."),
    q5("Chi scrisse «Ossi di seppia»?", ["Eugenio Montale", "Giuseppe Ungaretti", "Umberto Saba", "Giovanni Pascoli"], "È del 1925 e contiene «Spesso il male di vivere ho incontrato»."),
    q5("Che cos'è il «correlativo oggettivo» di Montale?", ["Un oggetto o una scena che esprime un'emozione senza dirla", "Una rima", "Un verso libero", "Un personaggio"], "Montale usa immagini concrete per dire sentimenti."),
    q5("Che cos'è l'Ermetismo?", ["La poesia essenziale e difficile del primo Novecento", "La poesia romantica", "La poesia barocca", "La poesia della Scapigliatura"], "Ne fu esponente anche Quasimodo."),
    q5("Chi scrisse «Se questo è un uomo»?", ["Primo Levi", "Italo Calvino", "Cesare Pavese", "Elio Vittorini"], "È la testimonianza di Levi dal lager di Auschwitz."),
    q5("Che cos'è il Neorealismo?", ["La corrente del dopoguerra che racconta la realtà sociale", "Una corrente dell'Ottocento", "La poesia ermetica", "Un movimento barocco"], "Ne fanno parte film e romanzi del dopoguerra."),
    q5("Chi scrisse «Il barone rampante»?", ["Italo Calvino", "Cesare Pavese", "Elio Vittorini", "Carlo Levi"], "È una favola in cui il protagonista vive sugli alberi."),
    q5("Chi scrisse «Il Gattopardo»?", ["Giuseppe Tomasi di Lampedusa", "Leonardo Sciascia", "Elsa Morante", "Alberto Moravia"], "Racconta la Sicilia all'epoca dell'Unità d'Italia."),
    q5("Che cos'è il Futurismo?", ["L'avanguardia che esalta la velocità, la macchina e la modernità", "Un movimento che ama il passato", "Un movimento pastorale", "La poesia ermetica"], "Fu fondato da Marinetti nel 1909."),
    q5("Che cos'è lo «stream of consciousness»?", ["Il flusso di coscienza: i pensieri resi come arrivano", "Un tipo di rima", "Un genere teatrale", "Un saggio storico"], "È tipico di Joyce e, in Italia, di Svevo."),
    q5("Che cos'è un saggio breve?", ["Un testo argomentativo basato su documenti dati", "Un racconto di fantasia", "Una poesia", "Un riassunto"], "È una delle tipologie della prima prova."),
    q5("Chi scrisse «Il deserto dei Tartari»?", ["Dino Buzzati", "Italo Calvino", "Primo Levi", "Cesare Pavese"], "Il protagonista aspetta un nemico che non arriva mai.")
  );
  BANK.inglese.push(
    q5("Completa: «If I ___ you, I would accept the offer.»", ["were", "was", "am", "had been"], "Second conditional: se fossi in te.", { ae: true, en: ["If I ___ you, I would accept the offer."] }),
    q5("Completa: «I wish I ___ more time.»", ["had", "have", "would have", "will have"], "«Wish» + past simple per un rimpianto presente.", { ae: true, en: ["I wish I ___ more time."] }),
    q5("Completa: «I wish I ___ harder last year.»", ["had studied", "studied", "would study", "have studied"], "Wish + past perfect per un rimpianto passato.", { ae: true, en: ["I wish I ___ harder last year."] }),
    q5("Completa: «She suggested ___ to the cinema.»", ["going", "to go", "go", "went"], "Dopo «suggest» si usa -ing.", { ae: true, en: ["She suggested ___ to the cinema."] }),
    q5("Completa: «He is said ___ a fortune.»", ["to have made", "making", "to make", "that made"], "Passivo impersonale con infinito passato.", { ae: true, en: ["He is said ___ a fortune."] }),
    q5("Completa: «The more you practise, ___ you become.»", ["the better", "better", "the best", "good"], "Doppio comparativo: the more… the better.", { ae: true, en: ["The more you practise, ___ you become."] }),
    q5("Completa: «Not only ___ late, but he also forgot the documents.»", ["was he", "he was", "he is", "is he"], "Con «not only» all'inizio la frase si inverte.", { ae: true, en: ["Not only ___ late, but he also forgot the documents."] }),
    q5("Completa: «I'm not used ___ up so early.»", ["to getting", "to get", "getting", "get"], "«Be used to» è seguito da -ing.", { ae: true, en: ["I'm not used ___ up so early."] }),
    q5("Completa: «She must ___ the news; she looks shocked.»", ["have heard", "hear", "heard", "be hearing"], "«Must have» + participio passato: deduzione sul passato.", { ae: true, en: ["She must ___ the news; she looks shocked."] }),
    q5("Completa: «You ___ have told me earlier!»", ["should", "must", "can", "would"], "«Should have» esprime un rimprovero.", { ae: true, en: ["You ___ have told me earlier!"] }),
    q5("Completa: «The suspect denied ___ involved in the crime.»", ["being", "to be", "be", "been"], "Deny + gerundio passivo.", { ae: true, en: ["The suspect denied ___ involved in the crime."] }),
    q5("Completa: «___ he was tired, he kept working.»", ["Although", "Despite", "Because", "So"], "Although introduce una frase con verbo.", { ae: true, en: ["___ he was tired, he kept working."] }),
    q5("Che cosa significa «to put up with»?", ["Sopportare", "Mettere su", "Costruire", "Posticipare"], "«I can't put up with this noise.»", { en: ["to put up with"] }),
    q5("Che cosa significa «to carry out»?", ["Portare a termine, eseguire", "Portare fuori", "Trasportare", "Sopportare"], "«They carried out a survey.»", { en: ["to carry out"] }),
    q5("Che cosa significa «to get over»?", ["Superare, riprendersi da", "Salire sopra", "Capire", "Raggiungere"], "«He got over the flu.»", { en: ["to get over"] }),
    q5("Che cosa significa «to run out of»?", ["Esaurire", "Uscire di corsa", "Correre via", "Gestire"], "«We ran out of milk.»", { en: ["to run out of"] }),
    q5("Che cosa significa «consistent»?", ["Coerente, costante", "Consistente", "Denso", "Concentrato"], "Falso amico: «consistente» si dice «substantial».", { en: ["consistent"] }),
    q5("Che cosa significa «eventually»?", ["Alla fine", "Eventualmente", "Spesso", "Subito"], "Falso amico: eventualmente = possibly.", { en: ["eventually"] }),
    q5("Che cosa significa «sensible»?", ["Ragionevole", "Sensibile", "Sensuale", "Sentimentale"], "Sensibile = sensitive.", { en: ["sensible"] }),
    q5("Quale tempo usa «I have been working here for five years»?", ["Present perfect continuous", "Past simple", "Past perfect", "Present continuous"], "Azione iniziata nel passato e ancora in corso.", { en: ["I have been working here for five years"] })
  );
  BANK.storia.push(
    q5("In che anno fu proclamato il Regno d'Italia?", ["1861", "1848", "1870", "1815"], "Vittorio Emanuele II ne fu il primo re."),
    q5("Quale evento completò l'unità d'Italia con la presa di Roma?", ["La breccia di Porta Pia (1870)", "La spedizione dei Mille", "La seconda guerra d'indipendenza", "La battaglia di Custoza"], "Roma divenne capitale nel 1871."),
    q5("Chi guidò la spedizione dei Mille nel 1860?", ["Giuseppe Garibaldi", "Giuseppe Mazzini", "Camillo Cavour", "Vittorio Emanuele II"], "Partì da Quarto, vicino a Genova."),
    q5("Chi fu il principale artefice diplomatico dell'unità d'Italia?", ["Camillo Benso di Cavour", "Giuseppe Mazzini", "Carlo Alberto", "Pio IX"], "Era il primo ministro del Regno di Sardegna."),
    q5("Che cos'è la Questione meridionale?", ["Il divario economico e sociale tra Nord e Sud dopo l'Unità", "Una guerra del Sud", "Un partito politico", "Un trattato"], "Esiste ancora oggi in forme diverse."),
    q5("Che cosa scatenò la Prima guerra mondiale nel 1914?", ["L'attentato di Sarajevo contro Francesco Ferdinando", "L'invasione della Polonia", "La rivoluzione russa", "La crisi del '29"], "Il 28 giugno 1914."),
    q5("In che anno l'Italia entrò nella Prima guerra mondiale?", ["1915", "1914", "1917", "1918"], "A fianco dell'Intesa, dopo il Patto di Londra."),
    q5("Che cosa fu la Rivoluzione russa del 1917?", ["La caduta dello zar e la presa del potere dei bolscevichi", "Un colpo di Stato militare", "Una guerra civile in Polonia", "Un trattato di pace"], "Lenin guidò i bolscevichi."),
    q5("Che cos'è il fascismo?", ["Il regime totalitario di Mussolini, al potere dal 1922 al 1943", "Un regime comunista", "Un governo democratico", "Una monarchia costituzionale"], "Mussolini fu capo del governo dopo la «marcia su Roma»."),
    q5("Quando avvenne la Marcia su Roma?", ["Ottobre 1922", "Ottobre 1917", "Maggio 1915", "Luglio 1943"], "Il re incaricò Mussolini di formare il governo."),
    q5("Che cosa furono le leggi razziali del 1938?", ["Norme che discriminavano gli ebrei in Italia", "Leggi sulla scuola", "Leggi sul lavoro", "Un trattato"], "Esclusero gli ebrei da scuole e impieghi."),
    q5("Che cos'è stata la crisi del 1929?", ["Un crollo della Borsa di New York che portò alla Grande depressione", "Una guerra", "Una rivoluzione", "Un trattato"], "Iniziò il 24 ottobre, il «giovedì nero»."),
    q5("Quale politica attuò Roosevelt per uscire dalla crisi?", ["Il New Deal", "Il Piano Marshall", "La NEP", "La dottrina Truman"], "Prevedeva grandi investimenti pubblici."),
    q5("Che cosa fu il nazismo?", ["Il regime totalitario di Hitler in Germania", "Un partito italiano", "Un movimento comunista", "Una monarchia"], "Hitler fu cancelliere dal 1933."),
    q5("Quando iniziò la Seconda guerra mondiale?", ["Nel 1939, con l'invasione della Polonia", "Nel 1914", "Nel 1941", "Nel 1945"], "La Germania invase la Polonia il 1° settembre."),
    q5("Che cos'è la Shoah?", ["Lo sterminio sistematico degli ebrei da parte dei nazisti", "Una battaglia", "Un trattato", "Un partito"], "Morirono circa sei milioni di ebrei."),
    q5("Quando si celebra la Liberazione in Italia?", ["25 aprile", "2 giugno", "4 novembre", "1° maggio"], "Ricorda la liberazione dal nazifascismo, nel 1945."),
    q5("Che cos'è la Guerra fredda?", ["Il confronto, senza scontro diretto, tra USA e URSS", "Una guerra in Antartide", "Una guerra tra Francia e Germania", "Un conflitto del 1914"], "Durò dal 1947 al 1991 circa."),
    q5("Che cosa fu il Muro di Berlino?", ["Il muro che divise la città dal 1961 al 1989", "Una fortificazione romana", "Un confine francese", "Un monumento"], "Il suo crollo simboleggia la fine della Guerra fredda."),
    q5("Che cos'è il Piano Marshall?", ["Il programma americano di aiuti per ricostruire l'Europa", "Un'alleanza militare", "Un trattato di pace", "Una legge italiana"], "Fu avviato nel 1948."),
    q5("Quale referendum del 2 giugno 1946 sancì la nascita della Repubblica?", ["Quello istituzionale tra monarchia e repubblica", "Quello sul divorzio", "Quello sulla Costituzione europea", "Quello sul nucleare"], "Votarono per la prima volta anche le donne."),
    q5("Che cos'è il miracolo economico italiano?", ["La forte crescita economica degli anni Cinquanta e Sessanta", "Una crisi", "Una guerra", "Un trattato"], "Cambiò la società italiana."),
    q5("Quali furono gli «anni di piombo»?", ["Gli anni Settanta segnati da terrorismo e violenza politica", "Gli anni del boom", "Gli anni della Resistenza", "Gli anni Venti"], "Tra gli episodi, il sequestro Moro (1978)."),
    q5("In che anno cadde l'Unione Sovietica?", ["1991", "1989", "1985", "1979"], "Gorbačëv ne fu l'ultimo leader."),
    q5("Quando nacque l'Unione europea con il Trattato di Maastricht?", ["1992 (in vigore dal 1993)", "1957", "1945", "2002"], "Prevedeva anche la moneta unica.")
  );
  BANK.scienze.push(
    q5("Che cos'è il DNA?", ["La molecola che contiene l'informazione genetica", "Una proteina", "Un tipo di lipide", "Un ormone"], "Ha forma di doppia elica."),
    q5("Chi scoprì la struttura a doppia elica del DNA?", ["Watson e Crick", "Mendel", "Darwin", "Pasteur"], "Nel 1953, grazie anche alle immagini di Rosalind Franklin."),
    q5("Quali sono le basi azotate del DNA?", ["Adenina, timina, citosina, guanina", "Adenina, uracile, citosina, guanina", "Glucosio, fruttosio, lattosio, saccarosio", "Alanina, glicina, serina, valina"], "A si lega a T, C si lega a G."),
    q5("Che cos'è un gene?", ["Un tratto di DNA che codifica una proteina o un carattere", "Una cellula", "Una proteina", "Un organo"], "I geni sono sui cromosomi."),
    q5("Quanti cromosomi ha una cellula somatica umana?", ["46", "23", "48", "44"], "23 coppie."),
    q5("Che cosa afferma la prima legge di Mendel?", ["Gli ibridi di prima generazione sono tutti uguali", "I caratteri si fondono sempre", "I geni si trasformano", "Non ci sono caratteri dominanti"], "È la legge della dominanza."),
    q5("Che cos'è un allele?", ["Una delle forme alternative di un gene", "Un cromosoma", "Una proteina", "Un tipo di cellula"], "Un individuo ne ha due per ogni gene."),
    q5("Che cos'è una mutazione?", ["Un cambiamento nella sequenza del DNA", "Una malattia infettiva", "Una divisione cellulare", "Una risposta immunitaria"], "Può essere neutra, dannosa o vantaggiosa."),
    q5("Che cos'è la selezione naturale?", ["Il meccanismo per cui sopravvivono più degli altri gli individui meglio adattati", "La scelta degli allevatori", "Una mutazione", "Un'estinzione di massa"], "È il meccanismo proposto da Darwin."),
    q5("Quale opera di Darwin espone la teoria dell'evoluzione?", ["L'origine delle specie", "Il capitale", "I Principia", "Il dialogo sui massimi sistemi"], "Fu pubblicata nel 1859."),
    q5("Che cos'è la fotosintesi clorofilliana?", ["Il processo con cui le piante producono glucosio da CO₂ e acqua usando la luce", "La respirazione cellulare", "La digestione", "La fermentazione"], "Produce anche ossigeno."),
    q5("Che cos'è un OGM?", ["Un organismo il cui DNA è stato modificato con tecniche di ingegneria genetica", "Un organismo estinto", "Un organismo malato", "Una cellula staminale"], "Sono organismi geneticamente modificati."),
    q5("Che cos'è la PCR?", ["Una tecnica che amplifica piccole quantità di DNA", "Un tipo di vaccino", "Un antibiotico", "Una proteina"], "Si usa per esempio nei test diagnostici."),
    q5("Che cosa fa il sistema CRISPR-Cas9?", ["Permette di modificare con precisione il DNA", "Produce energia", "Cura le infezioni batteriche", "Sintetizza proteine"], "Ha valso il Nobel 2020 a Charpentier e Doudna."),
    q5("Che cos'è una cellula staminale?", ["Una cellula non ancora specializzata, capace di trasformarsi", "Una cellula morta", "Un globulo rosso", "Un batterio"], "Può dare origine a tessuti diversi."),
    q5("Che cos'è un ecosistema?", ["L'insieme degli esseri viventi e dell'ambiente in cui vivono", "Una specie", "Un animale", "Un clima"], "Comprende fattori biotici e abiotici."),
    q5("Che cos'è la biodiversità?", ["La varietà di forme di vita presenti in un ambiente", "Il numero di abitanti", "L'inquinamento", "Il clima"], "Va tutelata anche per la stabilità degli ecosistemi."),
    q5("Quale gas serra è il principale responsabile del riscaldamento globale di origine antropica?", ["L'anidride carbonica (CO₂)", "L'ossigeno", "L'azoto", "L'elio"], "Deriva soprattutto da combustibili fossili."),
    q5("Che cos'è l'effetto serra?", ["Il trattenimento del calore da parte di alcuni gas atmosferici", "Un fenomeno solo artificiale", "Una malattia delle piante", "Il buco dell'ozono"], "Senza, la Terra sarebbe troppo fredda."),
    q5("Che cos'è la deriva dei continenti?", ["Lo spostamento lento dei continenti sulla superficie terrestre", "Una marea", "Un terremoto", "Un uragano"], "Fu proposta da Wegener nel 1912."),
    q5("Che cosa studia la tettonica a placche?", ["I movimenti delle placche della litosfera", "L'atmosfera", "Il clima", "Le maree"], "Spiega terremoti e vulcani."),
    q5("Quali sono fonti di energia rinnovabile?", ["Sole, vento, acqua", "Carbone, petrolio, gas", "Uranio e plutonio", "Solo il gas naturale"], "Si rigenerano in tempi brevi."),
    q5("Che cos'è la fissione nucleare?", ["La scissione di un nucleo pesante in nuclei più leggeri con rilascio di energia", "L'unione di nuclei leggeri", "Una reazione chimica", "Un decadimento"], "Si usa nelle centrali nucleari."),
    q5("Quanto dura circa un anno luce?", ["È la distanza percorsa dalla luce in un anno", "Un anno intero", "Un giorno", "Un secolo"], "È una unità di lunghezza, circa 9.460 miliardi di km.")
  );
  BANK.civica.push(
    q5("Quanti sono i principi fondamentali della Costituzione italiana?", ["12", "139", "9", "20"], "Sono gli articoli 1-12."),
    q5("Quanti articoli ha la Costituzione italiana?", ["139", "12", "100", "200"], "Più le disposizioni transitorie e finali."),
    q5("Quando entrò in vigore la Costituzione italiana?", ["Il 1° gennaio 1948", "Il 2 giugno 1946", "Il 25 aprile 1945", "Il 1° gennaio 1861"], "Fu approvata il 22 dicembre 1947."),
    q5("Che cosa dice l'articolo 1 della Costituzione?", ["L'Italia è una Repubblica democratica fondata sul lavoro", "Tutti i cittadini sono uguali", "La sovranità appartiene al re", "La Repubblica è una e indivisibile"], "La sovranità appartiene al popolo."),
    q5("Che cos'è la separazione dei poteri?", ["La divisione tra potere legislativo, esecutivo e giudiziario", "La divisione tra Stato e Chiesa", "La divisione tra Nord e Sud", "La divisione dei partiti"], "Serve a evitare abusi."),
    q5("Chi esercita il potere legislativo in Italia?", ["Il Parlamento", "Il Governo", "La magistratura", "Il Presidente della Repubblica"], "È formato da Camera e Senato."),
    q5("Quale organo controlla che le leggi siano conformi alla Costituzione?", ["La Corte costituzionale", "Il Governo", "Il Senato", "Il Consiglio di Stato"], "È composta da quindici giudici."),
    q5("Chi nomina i ministri?", ["Il Presidente della Repubblica, su proposta del Presidente del Consiglio", "Il Parlamento", "I cittadini", "La Corte costituzionale"], "Il Governo deve poi ottenere la fiducia delle Camere."),
    q5("Quanti anni dura il mandato del Presidente della Repubblica?", ["Sette", "Cinque", "Dieci", "Quattro"], "È eletto dal Parlamento in seduta comune."),
    q5("Che cos'è il referendum abrogativo?", ["Una consultazione per cancellare, in tutto o in parte, una legge", "Un'elezione del Governo", "Una legge di bilancio", "Un decreto"], "Per essere valido serve il quorum di partecipazione."),
    q5("Che cos'è l'Unione europea?", ["Un'unione politica ed economica di Stati europei", "Un esercito", "Un trattato commerciale tra due Stati", "Un'agenzia dell'ONU"], "Oggi conta 27 Stati membri."),
    q5("Quali sono le istituzioni principali dell'Unione europea?", ["Parlamento europeo, Consiglio, Commissione", "Senato, Camera, Governo", "ONU, NATO, FAO", "Corte costituzionale, TAR, CSM"], "Il Parlamento europeo è eletto dai cittadini."),
    q5("Che cos'è il Parlamento europeo?", ["L'assemblea dei rappresentanti eletti direttamente dai cittadini dell'UE", "Il governo dell'UE", "Un tribunale", "La banca dell'UE"], "Ha sede a Strasburgo e Bruxelles."),
    q5("Quale trattato istituì la Comunità economica europea nel 1957?", ["Il Trattato di Roma", "Il Trattato di Maastricht", "Il Trattato di Lisbona", "Il Trattato di Versailles"], "Gli Stati fondatori erano sei."),
    q5("In quale anno entrò in circolazione l'euro in forma di monete e banconote?", ["2002", "1993", "1999", "2010"], "La moneta unica fu introdotta come valuta contabile nel 1999."),
    q5("Che cos'è la cittadinanza europea?", ["Lo status aggiuntivo dei cittadini degli Stati membri, con diritti come libera circolazione", "Una carta d'identità mondiale", "Un passaporto ONU", "La cittadinanza americana"], "Si affianca alla cittadinanza nazionale."),
    q5("Che cos'è la mafia?", ["Un'organizzazione criminale che usa violenza e intimidazione per controllare territorio e affari", "Un partito politico", "Un sindacato", "Un'azienda"], "Cosa Nostra è la mafia siciliana."),
    q5("Chi furono i giudici uccisi dalla mafia nel 1992?", ["Giovanni Falcone e Paolo Borsellino", "Aldo Moro e Piersanti Mattarella", "Carlo Alberto dalla Chiesa e Pio La Torre", "Giorgio Ambrosoli e Peppino Impastato"], "Furono uccisi nelle stragi di Capaci e via D'Amelio."),
    q5("Che cos'è la legalità?", ["Il rispetto delle leggi e delle regole della convivenza", "La libertà di fare ciò che si vuole", "Una pena", "Un reato"], "È un valore alla base della convivenza civile."),
    q5("Che cos'è l'identità digitale?", ["L'insieme di informazioni che identificano una persona online", "Una carta di credito", "Un social network", "Un indirizzo email soltanto"], "Va protetta con attenzione, per esempio con lo SPID."),
    q5("Che cos'è lo SPID?", ["Il sistema di identità digitale per accedere ai servizi online della pubblica amministrazione", "Un social network", "Un tipo di firma autografa", "Una carta d'identità cartacea"], "È un sistema unico di credenziali."),
    q5("Che cos'è il GDPR?", ["Il regolamento europeo sulla protezione dei dati personali", "Una moneta digitale", "Un social network", "Un algoritmo"], "Vale dal 2018."),
    q5("Che cos'è il cyberbullismo?", ["Il bullismo compiuto con strumenti digitali", "Un videogioco", "Un reato fiscale", "Un virus"], "In Italia è regolato dalla legge 71 del 2017."),
    q5("Che cosa sono le fake news?", ["Informazioni false diffuse come se fossero vere", "Notizie confermate", "Pubblicità", "Libri"], "Vanno verificate controllando le fonti."),
    q5("Quale obiettivo dell'Agenda 2030 riguarda l'istruzione di qualità?", ["L'obiettivo 4", "L'obiettivo 1", "L'obiettivo 7", "L'obiettivo 13"], "L'Agenda ha 17 obiettivi."),
    q5("Che cos'è lo sviluppo sostenibile?", ["Uno sviluppo che soddisfa i bisogni di oggi senza compromettere quelli futuri", "Uno sviluppo senza limiti", "Un tipo di crescita economica illimitata", "Un tipo di agricoltura"], "Così lo definì il rapporto Brundtland nel 1987.")
  );

  pairs.italiano.push(
    q5p("Collega ogni autore alla sua opera.", [["Verga", "I Malavoglia"], ["Pascoli", "Myricae"], ["D'Annunzio", "Il piacere"], ["Pirandello", "Il fu Mattia Pascal"], ["Svevo", "La coscienza di Zeno"], ["Ungaretti", "L'allegria"], ["Montale", "Ossi di seppia"], ["Primo Levi", "Se questo è un uomo"]]),
    q5p("Collega ogni movimento alla sua caratteristica.", [["Verismo", "impersonalità e realtà sociale"], ["Decadentismo", "crisi e irrazionale"], ["Futurismo", "velocità e macchina"], ["Ermetismo", "poesia essenziale"], ["Neorealismo", "realtà del dopoguerra"]]),
    q5p("Collega ogni opera al suo protagonista.", [["Il fu Mattia Pascal", "Mattia Pascal"], ["La coscienza di Zeno", "Zeno Cosini"], ["Il piacere", "Andrea Sperelli"], ["I Malavoglia", "'Ntoni"], ["Uno, nessuno e centomila", "Vitangelo Moscarda"]])
  );
  pairs.inglese.push(
    q5p("Collega ogni phrasal verb al suo significato.", [["put up with", "sopportare"], ["carry out", "eseguire"], ["get over", "superare"], ["run out of", "esaurire"], ["come up with", "inventare"], ["give up", "arrendersi"]]),
    q5p("Collega ogni falso amico alla traduzione corretta.", [["eventually", "alla fine"], ["sensible", "ragionevole"], ["consistent", "coerente"], ["library", "biblioteca"], ["parents", "genitori"], ["pretend", "fingere"]]),
    q5p("Collega ogni verbo al suo passato semplice.", [["choose", "chose"], ["freeze", "froze"], ["shake", "shook"], ["throw", "threw"], ["draw", "drew"], ["bite", "bit"]], { rEn: true })
  );
  pairs.storia.push(
    q5p("Collega ogni data al suo avvenimento.", [["1861", "Regno d'Italia"], ["1870", "presa di Roma"], ["1914", "inizio Prima guerra mondiale"], ["1922", "Marcia su Roma"], ["1929", "crollo di Wall Street"], ["1939", "inizio Seconda guerra mondiale"], ["1945", "fine Seconda guerra mondiale"], ["1989", "caduta del Muro di Berlino"]]),
    q5p("Collega ogni personaggio al suo ruolo.", [["Cavour", "primo ministro sabaudo"], ["Garibaldi", "spedizione dei Mille"], ["Lenin", "rivoluzione russa"], ["Mussolini", "capo del fascismo"], ["Hitler", "capo del nazismo"], ["Roosevelt", "New Deal"], ["Churchill", "primo ministro britannico"], ["Gorbačëv", "ultimo leader sovietico"]]),
    q5p("Collega ogni termine al suo significato.", [["Fascismo", "regime di Mussolini"], ["Shoah", "sterminio degli ebrei"], ["Guerra fredda", "scontro USA-URSS"], ["Resistenza", "lotta contro nazifascismo"], ["Boom economico", "crescita anni Cinquanta"], ["Anni di piombo", "terrorismo anni Settanta"]])
  );
  pairs.scienze.push(
    q5p("Collega ogni scienziato alla sua scoperta.", [["Mendel", "leggi dell'ereditarietà"], ["Darwin", "selezione naturale"], ["Watson e Crick", "doppia elica del DNA"], ["Wegener", "deriva dei continenti"], ["Pasteur", "vaccino contro la rabbia"], ["Fleming", "penicillina"]]),
    q5p("Collega ogni base azotata alla sua compagna.", [["Adenina", "Timina"], ["Citosina", "Guanina"], ["Timina", "Adenina"], ["Guanina", "Citosina"]]),
    q5p("Collega ogni termine alla sua definizione.", [["Gene", "tratto di DNA"], ["Allele", "forma alternativa di un gene"], ["Mutazione", "cambiamento del DNA"], ["Ecosistema", "esseri viventi e ambiente"], ["Biodiversità", "varietà di forme di vita"]])
  );
  pairs.civica.push(
    q5p("Collega ogni organo al suo compito.", [["Parlamento", "fa le leggi"], ["Governo", "esegue le leggi"], ["Magistratura", "applica le leggi"], ["Corte costituzionale", "controlla le leggi"], ["Presidente della Repubblica", "garante dell'unità nazionale"]]),
    q5p("Collega ogni trattato al suo tema.", [["Trattato di Roma", "nascita della CEE"], ["Trattato di Maastricht", "Unione europea"], ["Trattato di Lisbona", "riforma dell'UE"], ["Trattato di Versailles", "fine della Prima guerra mondiale"]]),
    q5p("Collega ogni sigla al suo significato.", [["GDPR", "protezione dei dati"], ["SPID", "identità digitale"], ["UE", "Unione europea"], ["ONU", "Organizzazione delle Nazioni Unite"], ["BCE", "Banca centrale europea"]])
  );

  seqs.storia.push(
    SQ5("Metti in ordine di tempo, dal più antico.", ["Regno d'Italia", "Presa di Roma", "Prima guerra mondiale", "Marcia su Roma", "Crollo di Wall Street"]),
    SQ5("Metti in ordine di tempo, dal più antico.", ["Seconda guerra mondiale", "Liberazione dell'Italia", "Referendum istituzionale", "Costituzione in vigore", "Muro di Berlino"]),
    SQ5("Metti in ordine di tempo, dal più antico.", ["Piano Marshall", "Trattati di Roma", "Muro di Berlino", "Caduta del Muro", "Fine dell'URSS"])
  );
  seqs.scienze.push(
    SQ5("Metti in fila dal più piccolo al più grande.", ["Base azotata", "Gene", "Cromosoma", "Cellula", "Organismo"]),
    SQ5("Metti in fila i livelli di organizzazione ecologica.", ["Individuo", "Popolazione", "Comunità", "Ecosistema", "Biosfera"])
  );
  seqs.italiano.push(
    SQ5("Metti in ordine di tempo, dal più antico.", ["I Malavoglia", "Myricae", "Il fu Mattia Pascal", "L'allegria", "Ossi di seppia"]),
    SQ5("Metti in ordine di tempo, dal più antico.", ["Verismo", "Decadentismo", "Futurismo", "Ermetismo", "Neorealismo"])
  );
  seqs.civica.push(
    SQ5("Metti in ordine di tempo, dal più antico.", ["Referendum istituzionale", "Costituzione in vigore", "Trattati di Roma", "Maastricht", "Euro in circolazione"])
  );
  seqs.inglese.push(
    SQ5("Metti in fila dal meno al più probabile.", ["impossible", "unlikely", "possible", "probable", "certain"]),
    SQ5("Metti in fila dal più piccolo al più grande.", ["tiny", "small", "medium", "large", "enormous"])
  );

  errors.italiano.push(
    ER5("Una sola affermazione è falsa: quale?", ["Verga scrisse I Malavoglia.", "Pirandello scrisse Il fu Mattia Pascal.", "Svevo scrisse L'allegria.", "Montale scrisse Ossi di seppia."], 2, "Svevo scrisse La coscienza di Zeno.", "L'allegria è di Ungaretti."),
    ER5("Una sola affermazione è falsa: quale?", ["Il Verismo descrive la realtà con impersonalità.", "Il Futurismo esalta la velocità.", "L'Ermetismo è una poesia lunga e discorsiva.", "Il Neorealismo racconta la società del dopoguerra."], 2, "L'Ermetismo è una poesia essenziale e concentrata.", "I versi sono brevi e densi."),
    ER5("Una sola affermazione è falsa: quale?", ["D'Annunzio scrisse Il piacere.", "Pascoli scrisse Myricae.", "Primo Levi scrisse Il gattopardo.", "Calvino scrisse Il barone rampante."], 2, "Primo Levi scrisse Se questo è un uomo.", "Il gattopardo è di Tomasi di Lampedusa."),
    ER5("Una sola affermazione è falsa: quale?", ["Pirandello è autore di Uno, nessuno e centomila.", "Svevo è autore di La coscienza di Zeno.", "Ungaretti è autore di Il fanciullino.", "Montale è autore di La bufera e altro."], 2, "Pascoli scrisse Il fanciullino.", "Ungaretti scrisse L'allegria."),
    ER5("Una sola affermazione è falsa: quale?", ["Il Decadentismo esprime crisi e irrazionale.", "Il Futurismo fu fondato da Marinetti nel 1909.", "Il Verismo nacque nel Seicento.", "Il flusso di coscienza è tipico di Joyce."], 2, "Il Verismo nacque nell'ultimo Ottocento.", "Si ispira al Naturalismo francese.")
  );
  errors.inglese.push(
    ER5("Una sola frase ha un errore: quale?", ["If I would be rich, I'd travel more.", "If I were rich, I'd travel more.", "If I had money, I'd buy a car.", "If she calls, I'll answer."], 0, "If I were rich, I'd travel more.", "Dopo «if» non si usa «would».", { en: true }),
    ER5("Una sola frase ha un errore: quale?", ["I wish I have more time.", "I wish I had more time.", "I wish I had studied more.", "I wish he were here."], 0, "I wish I had more time.", "«Wish» per il presente vuole il past simple.", { en: true }),
    ER5("Una sola frase ha un errore: quale?", ["She suggested to go to the cinema.", "She suggested going to the cinema.", "She suggested that we go.", "She wanted to go to the cinema."], 0, "She suggested going to the cinema.", "Dopo «suggest» si usa -ing o «that…».", { en: true }),
    ER5("Una sola frase ha un errore: quale?", ["The more you practise, better you become.", "The more you practise, the better you become.", "The earlier, the better.", "The harder he works, the more he earns."], 0, "The more you practise, the better you become.", "Il doppio comparativo richiede «the» due volte.", { en: true }),
    ER5("Una sola frase ha un errore: quale?", ["I'm used to get up early.", "I'm used to getting up early.", "I used to get up early.", "I'm getting used to it."], 0, "I'm used to getting up early.", "«Be used to» è seguito da -ing.", { en: true }),
    ER5("Una sola frase ha un errore: quale?", ["She must have forgot the keys.", "She must have forgotten the keys.", "He might have left early.", "They can't have arrived yet."], 0, "She must have forgotten the keys.", "Dopo «must have» serve il participio passato.", { en: true })
  );
  errors.storia.push(
    ER5("Una sola data è sbagliata: quale?", ["Il Regno d'Italia è del 1861.", "La Marcia su Roma è del 1922.", "L'Italia entrò in guerra nel 1917.", "La Costituzione entrò in vigore nel 1948."], 2, "L'Italia entrò in guerra nel 1915.", "Nel 1917 ci fu la rotta di Caporetto."),
    ER5("Una sola affermazione è falsa: quale?", ["Cavour fu primo ministro del Regno di Sardegna.", "Garibaldi guidò la spedizione dei Mille.", "Mussolini guidò la Rivoluzione russa.", "Lenin guidò i bolscevichi."], 2, "Mussolini guidò il fascismo.", "La Rivoluzione russa è legata a Lenin."),
    ER5("Una sola affermazione è falsa: quale?", ["Il New Deal fu attuato da Roosevelt.", "La crisi del 1929 iniziò a Wall Street.", "La Seconda guerra mondiale iniziò nel 1914.", "Il Piano Marshall aiutò la ricostruzione europea."], 2, "La Seconda guerra mondiale iniziò nel 1939.", "Il 1914 è l'inizio della Prima."),
    ER5("Una sola affermazione è falsa: quale?", ["Il muro di Berlino cadde nel 1989.", "L'URSS si dissolse nel 1991.", "Il referendum istituzionale si tenne nel 1946.", "La Guerra fredda fu una guerra combattuta tra USA e URSS con scontri diretti."], 3, "Nella Guerra fredda USA e URSS non si scontrarono direttamente.", "Fu un confronto politico, economico e militare indiretto."),
    ER5("Una sola affermazione è falsa: quale?", ["Le leggi razziali furono emanate nel 1938.", "La Shoah fu lo sterminio degli ebrei.", "Il 25 aprile ricorda la nascita della Repubblica.", "Il 2 giugno ricorda il referendum del 1946."], 2, "Il 25 aprile ricorda la Liberazione.", "La Repubblica si ricorda il 2 giugno.")
  );
  errors.scienze.push(
    ER5("Una sola affermazione è falsa: quale?", ["Il DNA ha forma di doppia elica.", "Adenina si lega a timina.", "Un gene è una proteina.", "Una cellula umana somatica ha 46 cromosomi."], 2, "Un gene è un tratto di DNA, non una proteina.", "Il gene codifica una proteina."),
    ER5("Una sola affermazione è falsa: quale?", ["Darwin propose la selezione naturale.", "Mendel studiò i piselli.", "Wegener propose la teoria dei vaccini.", "Fleming scoprì la penicillina."], 2, "Wegener propose la deriva dei continenti.", "I vaccini sono associati a Jenner e Pasteur."),
    ER5("Una sola affermazione è falsa: quale?", ["La CO₂ è un gas serra.", "Sole e vento sono fonti rinnovabili.", "Il carbone è una fonte rinnovabile.", "La biodiversità è la varietà di forme di vita."], 2, "Il carbone è un combustibile fossile, non rinnovabile.", "Si è formato in milioni di anni."),
    ER5("Una sola affermazione è falsa: quale?", ["Le cellule staminali non sono specializzate.", "CRISPR modifica il DNA.", "La PCR serve a produrre proteine.", "Un OGM ha il DNA modificato."], 2, "La PCR serve ad amplificare il DNA.", "Le proteine si producono nei ribosomi."),
    ER5("Una sola affermazione è falsa: quale?", ["La fotosintesi produce glucosio.", "La fotosintesi produce ossigeno.", "La fotosintesi avviene nei mitocondri.", "La fotosintesi usa CO₂ e acqua."], 2, "La fotosintesi avviene nei cloroplasti.", "I mitocondri sono le «centrali energetiche» della cellula.")
  );
  errors.civica.push(
    ER5("Una sola affermazione è falsa: quale?", ["La Costituzione ha 139 articoli.", "I principi fondamentali sono gli articoli 1-12.", "Il Presidente della Repubblica dura in carica cinque anni.", "La Corte costituzionale controlla le leggi."], 2, "Il Presidente della Repubblica dura in carica sette anni.", "È eletto dal Parlamento in seduta comune."),
    ER5("Una sola affermazione è falsa: quale?", ["Il Parlamento fa le leggi.", "Il Governo esegue le leggi.", "La magistratura fa le leggi.", "La Corte costituzionale giudica la costituzionalità delle leggi."], 2, "La magistratura applica le leggi.", "Le leggi le fa il Parlamento."),
    ER5("Una sola affermazione è falsa: quale?", ["Il Trattato di Roma è del 1957.", "L'euro circola dal 2002.", "Il Trattato di Maastricht istituì la CEE.", "Il Parlamento europeo è eletto dai cittadini."], 2, "Il Trattato di Roma istituì la CEE, Maastricht l'UE.", "Maastricht è del 1992."),
    ER5("Una sola affermazione è falsa: quale?", ["Il GDPR protegge i dati personali.", "Lo SPID è un'identità digitale.", "Il cyberbullismo non è regolato da alcuna legge.", "Le fake news vanno verificate."], 2, "In Italia il cyberbullismo è regolato dalla legge 71 del 2017.", "La legge prevede prevenzione e tutela dei minori."),
    ER5("Una sola affermazione è falsa: quale?", ["Falcone e Borsellino furono uccisi nel 1992.", "La mafia usa violenza e intimidazione.", "La legalità consiste nel fare ciò che si vuole.", "Lo sviluppo sostenibile guarda alle generazioni future."], 2, "La legalità è il rispetto delle leggi e delle regole.", "È la base della convivenza.")
  );

  stima.storia.push(
    ST5("In che anno fu proclamato il Regno d'Italia?", 1800, 1900, 1861, 4, "", "Nel 1861."),
    ST5("In che anno l'Italia entrò nella Prima guerra mondiale?", 1900, 1950, 1915, 2, "", "Nel 1915."),
    ST5("In che anno fu la Marcia su Roma?", 1900, 1950, 1922, 3, "", "Nel 1922."),
    ST5("In che anno cadde il Muro di Berlino?", 1950, 2020, 1989, 3, "", "Nel 1989."),
    ST5("In che anno iniziò la Seconda guerra mondiale?", 1900, 1960, 1939, 3, "", "Nel 1939."),
    ST5("In che anno entrò in vigore la Costituzione italiana?", 1900, 2000, 1948, 3, "", "Nel 1948.")
  );
  stima.scienze.push(
    ST5("Quanti cromosomi ha una cellula umana somatica?", 0, 100, 46, 4, "", "Sono 46."),
    ST5("In che anno fu scoperta la doppia elica del DNA?", 1900, 2000, 1953, 4, "", "Nel 1953."),
    ST5("Quanto vale circa la velocità della luce (in migliaia di km/s)?", 0, 600, 300, 20, "migliaia km/s", "Circa 300.000 km/s.", 5)
  );
  stima.civica.push(
    ST5("Quanti articoli ha la Costituzione italiana?", 50, 300, 139, 8, "", "Sono 139."),
    ST5("In che anno nacque l'Unione europea con Maastricht?", 1950, 2020, 1992, 3, "", "Nel 1992."),
    ST5("In che anno nacque la Repubblica italiana?", 1900, 2000, 1946, 3, "", "Nel 1946."),
    ST5("Quanti sono gli obiettivi dell'Agenda 2030?", 5, 30, 17, 2, "", "Sono 17."),
    ST5("Quanti Stati membri ha oggi l'Unione europea?", 10, 40, 27, 2, "", "Sono 27.")
  );

  cloze.italiano.push(
    CL5("Verga è l'autore de «I ___».", ["Malavoglia", "Promessi sposi", "Sepolcri", "Canti"], "Il Verismo di Verga."),
    CL5("Pirandello scrisse «Il fu Mattia ___».", ["Pascal", "Zeno", "Moscarda", "Sperelli"], "Romanzo del 1904."),
    CL5("«La coscienza di ___» è di Svevo.", ["Zeno", "Mattia", "Andrea", "Vitangelo"], "Zeno Cosini è il protagonista."),
    CL5("Ungaretti scrisse «L'___».", ["allegria", "infinito", "umorismo", "estate"], "Raccoglie le poesie di guerra."),
    CL5("Montale scrisse «Ossi di ___».", ["seppia", "sabbia", "mare", "pietra"], "È del 1925."),
    CL5("Primo Levi scrisse «Se questo è un ___».", ["uomo", "amico", "nemico", "libro"], "Testimonianza dal lager."),
    CL5("Se avessi saputo la verità, non ___ partito.", ["sarei", "ero", "fossi", "sarò"], "Periodo ipotetico dell'irrealtà."),
    CL5("Credo che tu ___ ragione.", ["abbia", "hai", "avrai", "avevi"], "«Credo che» + congiuntivo."),
    CL5("Il libro ___ ti ho parlato è sul tavolo.", ["di cui", "che", "il cui", "dove"], "Pronome relativo con la preposizione «di»."),
    CL5("Pensavo che lui ___ già partito.", ["fosse", "era", "sarebbe", "è"], "Congiuntivo trapassato o imperfetto dopo «pensavo che».")
  );
  cloze.inglese.push(
    CL5("If I ___ you, I would accept the offer.", ["were", "was", "am", "had been"], "Second conditional.", { en: true }),
    CL5("I wish I ___ more time.", ["had", "have", "would have", "will have"], "Wish + past simple.", { en: true }),
    CL5("I wish I ___ harder last year.", ["had studied", "studied", "would study", "have studied"], "Wish + past perfect.", { en: true }),
    CL5("She suggested ___ to the cinema.", ["going", "to go", "go", "went"], "Suggest + -ing.", { en: true }),
    CL5("The more you practise, ___ you become.", ["the better", "better", "the best", "good"], "Doppio comparativo.", { en: true }),
    CL5("Not only ___ late, but he also forgot the documents.", ["was he", "he was", "he is", "is he"], "Inversione con «not only».", { en: true }),
    CL5("I'm not used ___ up so early.", ["to getting", "to get", "getting", "get"], "Be used to + -ing.", { en: true }),
    CL5("She must ___ the news; she looks shocked.", ["have heard", "hear", "heard", "be hearing"], "Deduzione sul passato.", { en: true }),
    CL5("You ___ have told me earlier!", ["should", "must", "can", "would"], "Rimprovero.", { en: true }),
    CL5("___ he was tired, he kept working.", ["Although", "Despite", "Because", "So"], "Although + soggetto e verbo.", { en: true })
  );
  askRules.push(
    [/scienziato alla sua scoperta/, "Che cosa scoprì o propose ", "?"],
    [/organo al suo compito/, "Qual è il compito di ", "?"],
    [/trattato al suo tema/, "Di che cosa tratta ", "?"],
    [/opera al suo protagonista/, "Chi è il protagonista di ", "?"],
    [/falso amico alla traduzione corretta/, "Che cosa significa ", "?"],
    [/verbo al suo passato semplice/, "Qual è il passato semplice di ", "?"],
    [/base azotata alla sua compagna/, "Con quale base si appaia ", "?"],
    [/personaggio al suo ruolo/, "Qual è il ruolo di ", "?"],
    [/movimento alla sua caratteristica/, "Qual è la caratteristica del ", "?"]
  );

  const inYear = (arr, c) => { const f = (arr || []).filter(x => !x.cl || (c >= x.cl[0] && c <= x.cl[1])); return f.length ? f : (arr || []); };
  return { math, mathPairs, filaMath, askRules, pairs, seqs, errors, mathError, stima, mathStima, cloze, inYear, pick, shuffle, rnd };
})();
