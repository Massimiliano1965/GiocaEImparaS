# STATO — Gioca e Impara S (GiocaEImparaS)
Aggiornato: 11/11/2026

**Cos'è:** app separata da Gioca e Impara, per le scuole superiori. Ripasso a giochi sulle materie comuni a licei, tecnici e artistici. Uso libero: niente minuti, niente blocco, niente personaggi.
**Web:** https://massimiliano1965.github.io/GiocaEImparaS/ (una volta sola: Settings > Pages > Source = GitHub Actions)
**APK:** non ancora (per ora solo versione web).

## Fatto (primo pezzo, 11/11/2026)
- 1ª superiore, sei materie: Matematica, Italiano, Inglese, Storia, Educazione civica, Scienze.
- Motore dei giochi copiato da Gioca e Impara (`www/js/games.js`, `games2.js`, `questions.js`, `voice.js`), con i giochi da bambini esclusi.
- Tre giochi nuovi in `www/js/s_games.js`: «Trova l'errore», «Stima», «Completa».
- Contenuti in `www/js/s_data.js` (classi 8–12 = 1ª–5ª superiore; ogni voce ha `cl: [dalla, alla]`).
- App in `www/js/s_app.js`, aspetto in `www/css/s.css`. Sfondi fatti con Gemini in `www/img/`.

## Da fare
- Contenuti di 2ª, 3ª, 4ª e 5ª superiore (i pulsanti dell'anno sono già pronti, segnati «in arrivo»).
- Sfondo diverso per ogni materia dentro i giochi (immagini di Gemini, una per materia, senza scritte).
- APK Android.
- «Slot frasi» e «Campo dei numeri» sono spenti: hanno ancora frasi e numeri da scuola media.

## Per aprire una nuova chat
> Lavoriamo su «Gioca e Impara S» (repo Massimiliano1965/GiocaEImparaS, ramo main). Leggi prima STATO.md. Oggi voglio fare: ...
