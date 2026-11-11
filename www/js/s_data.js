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
    for (let g = 0; g < 20; g++) { const q = math8(classId); if (q) return q; }
    return mk("Quanto fa 2³?", "8", ["6", "9", "5"], "2 · 2 · 2 = 8.");
  }
  function mathPairs() {
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
  function filaMath() {
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
  function mathError() {
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
  function mathStima() {
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
  const inYear = (arr, c) => { const f = (arr || []).filter(x => !x.cl || (c >= x.cl[0] && c <= x.cl[1])); return f.length ? f : (arr || []); };
  return { math, mathPairs, filaMath, askRules, pairs, seqs, errors, mathError, stima, mathStima, cloze, inYear, pick, shuffle, rnd };
})();
