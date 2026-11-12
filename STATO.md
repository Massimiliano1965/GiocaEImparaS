# STATO — Gioca e Impara S (GiocaEImparaS)
Aggiornato: 11/11/2026

**Cos'è:** app separata da Gioca e Impara, per le scuole superiori. Ripasso a giochi sulle materie comuni a licei, tecnici e artistici. Uso libero: niente minuti, niente blocco, niente personaggi.
**Web:** https://massimiliano1965.github.io/GiocaEImparaS/ (una volta sola: Settings > Pages > Source = GitHub Actions)
**APK:** non ancora (per ora solo versione web).

## Fatto (primo pezzo, 11/11/2026)
- 1ª superiore, sei materie: Matematica, Italiano, Inglese, Storia, Educazione civica, Scienze.
- Motore dei giochi copiato da Gioca e Impara (`www/js/games.js`, `games2.js`, `questions.js`, `voice.js`), con i giochi da bambini esclusi.
- Tre giochi nuovi in `www/js/s_games.js`: «Trova l'errore», «Stima», «Completa».
- Dodici giochi in più in `www/js/s_magazzino.js`, tutti accesi: Tris, Scalata, Parola segreta, Prima o dopo, Scommessa, Elimina, Sprint, Linea del tempo, Trova le parole, Serie, Colpo d'occhio, Chi sono? (dettagli in `MAGAZZINO.md`; pagina di prova `www/magazzino.html`). In tutto 28 tipi di sfida.
- Contenuti in `www/js/s_data.js` (classi 8–12 = 1ª–5ª superiore; ogni voce ha `cl: [dalla, alla]`).
- App in `www/js/s_app.js`, aspetto in `www/css/s.css`. Sfondi fatti con Gemini in `www/img/`.

## Fatto dopo (11/11/2026, non ancora pushato finché Massi non dà l'ok)
- 2ª, 3ª, 4ª e 5ª superiore complete per le sei materie (circa 22–28 domande per materia e anno, più coppie, sequenze, errori, stime, completa). Tutti i cinque anni sono `ready: true` in `s_app.js`.
- Matematica generata per anno: `math9`…`math12` (+ `mathPairsN`, `filaMathN`, `mathErrorN`, `mathStimaN`), registrate nella tabella `MY` in `s_data.js` (`MY.math[anno]`, ecc.). I dispatcher usano `MY` e ripiegano sulla 1ª.
- Aiutante `H(anno)` in `s_data.js`: restituisce `{q, T, SQ, ER, ST, CL}` già legati a quell'anno, per scrivere le voci più in fretta.
- Correzione motore in `games.js` (`pairsFor`, ramo inglese): i temi di coppie ora sono filtrati per classe con `Questions.inClass`; prima comparivano voci da 1ª anche nelle altre classi.
- Prova: `node` con un test su ogni anno (4 risposte uniche, coppie ≥ 4, regola `askRules` per ogni prompt, 3000 giri di matematica) e prova a tappeto nel browser (300 giochi per materia e anno, 0 errori).

## Fatto il 12/11/2026
- Controllo dei contenuti 1ª–5ª fatto con un secondo parere (Gemini); correzioni applicate. Per rifarlo: i file con tutte le domande si generano leggendo `s_data.js` (nessuna copia in repo).
- Parola segreta e Trova le parole: coppie con risposta di una parola aggiunte (blocco «COPPIE CON RISPOSTA DI UNA PAROLA» in `s_data.js`), partono in tutti gli anni (non in matematica, voluto).
- «Chi sono?»: indizi per 2ª–5ª in `WHOY[classe][materia]` dentro `s_magazzino.js`; la 1ª resta in `WHO`.
- Sfondi per materia: in `s.css` c'è già il meccanismo `body[data-sub="..."]`; basta mettere `www/img/sfondo_<materia>.png` (matematica, italiano, inglese, storia, civica, scienze; 572×1024, senza scritte né persone). Se un file manca, resta lo sfondo comune.

## Da fare
- Sfondi per materia: i prompt per Gemini sono pronti ma Gemini era al limite d'uso; Massi manda le immagini in ordine matematica, italiano, inglese, storia, civica, scienze.
- APK Android.
- «Slot frasi» e «Campo dei numeri» sono spenti: hanno ancora frasi e numeri da scuola media.
- «Salva l'omino» ha ancora disegni da bambini; le regole appaiono le prime due volte e la schermata scorre un po'.
- Non provati: voce reale su telefono e sito pubblico su telefono vero.

## Come aggiungere contenuti a un anno
Tutto sta in `www/js/s_data.js`. Anni: 9 = 2ª, 10 = 3ª, 11 = 4ª, 12 = 5ª.
1. Domande: `BANK.<materia>.push(q4(...))` con l'aiutante `H` dell'anno (stesso formato: domanda, 4 risposte con la giusta per prima, spiegazione).
2. Coppie, sequenze, errori, stime, completa: stesse strutture, con `cl` dell'anno.
3. Un tema di coppie nuovo («Collega ogni … al suo …») richiede una riga in `askRules`.
4. Matematica: funzioni dell'anno registrate in `MY`.
5. Controllo: `node` sul test dell'anno e prova nel browser; nessun errore.

Regole di Massi per questa app: icone SVG mai emoji; mostrargli l'immagine prima di pushare e aspettare l'ok; testi brevi; contenuti esatti e sul programma generale dell'anno, solo materie comuni a tutte le scuole.

## Per aprire una nuova chat
> Lavoriamo su «Gioca e Impara S» (repo Massimiliano1965/GiocaEImparaS, ramo main). Leggi prima STATO.md. Oggi voglio fare: ...
