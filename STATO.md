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

## Da fare
- Contenuti di 2ª, 3ª, 4ª e 5ª superiore (i pulsanti dell'anno sono già pronti, segnati «in arrivo»).
- Sfondo diverso per ogni materia dentro i giochi (immagini di Gemini, una per materia, senza scritte).
- APK Android.
- «Chi sono?» ha gli indizi dentro `s_magazzino.js` (`WHO`, sei per materia, solo 1ª superiore): vanno aggiunti per gli altri anni. La voce per ora legge solo il titolo, non gli indizi.
- «Slot frasi» e «Campo dei numeri» sono spenti: hanno ancora frasi e numeri da scuola media.

## Come aggiungere un anno (2ª–5ª superiore)
Tutto sta in `www/js/s_data.js`. Per ogni anno nuovo (classe 9 = 2ª, 10 = 3ª, 11 = 4ª, 12 = 5ª):
1. Domande: aggiungere a `BANK` voci con `cl: [9, 9]` (stesso formato: `q`, 4 risposte con la giusta per prima, `e` spiegazione). Circa 24 per materia.
2. Coppie (`pairs`), sequenze (`seqs`), «Trova l'errore» (`errors`), «Stima» (`stima`), «Completa» (`cloze`): stesse strutture, con `cl` dell'anno.
3. Se un tema di coppie ha una frase nuova («Collega ogni … al suo …»), aggiungere la riga in `askRules`.
4. Matematica: `math()` oggi usa solo `math8()`; aggiungere `math9()` ecc. e scegliere per classe. Lo stesso per `mathPairs`, `filaMath`, `mathError`, `mathStima`.
5. In `www/js/s_app.js`, in `YEARS`, mettere `ready: true` all'anno pronto.
6. Controllo: aprire `www/index.html` e far girare tutte le materie; nessun errore in console.

Regole di Massi per questa app: icone SVG mai emoji; mostrargli l'immagine prima di pushare e aspettare l'ok; testi brevi; contenuti esatti e sul programma generale dell'anno, solo materie comuni a tutte le scuole.

## Per aprire una nuova chat
> Lavoriamo su «Gioca e Impara S» (repo Massimiliano1965/GiocaEImparaS, ramo main). Leggi prima STATO.md. Oggi voglio fare: ...
