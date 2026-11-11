# Magazzino giochi — Gioca e Impara S

Dodici giochi in più per ragazzi dai 14 anni, pronti ma **non ancora accesi nell'app**.
Stanno in `www/js/s_magazzino.js` (aspetto in `www/css/s_magazzino.css`). Si provano aprendo `www/magazzino.html`.

## Come accenderli nell'app
In `www/index.html` aggiungere, dopo `s_games.js` e dopo `s.css`:
```html
<link rel="stylesheet" href="css/s_magazzino.css">
<script src="js/s_magazzino.js"></script>
```
Da quel momento il motore li pesca insieme agli altri. Per accenderne solo alcuni, togliere dal file i `Games.register(...)` degli altri.

## Come usarli in un'altra app
Ogni gioco è un blocco `Games.register(nome, { subjects, make, mount })`:
- `make(classe, materia)` prepara il giro e restituisce `null` se mancano i dati;
- `mount(el, giro, onDone)` lo disegna dentro `el`; alla fine chiama `onDone(riuscito, soluzione, spiegazione, errori)`.
Servono solo: `Questions.next(materia, classe)` per le domande a 4 risposte, `SUP.pairs` per le coppie, `SUP.seqs` per le sequenze.

## I giochi
| Nome | Come si gioca | Dati | Materie |
|---|---|---|---|
| Tris (`tris`) | Scegli una casella e rispondi: giusta è tua, sbagliata la prende il bot. Poi muove il bot. | domande | tutte |
| Scalata (`scalata`) | Cinque domande di fila, con due aiuti: 50:50 e Cambia. | domande | tutte |
| Parola segreta (`parola`) | Indovina la risposta in cinque tentativi, con le lettere colorate. | coppie con risposta di una parola | tutte tranne matematica |
| Prima o dopo (`primadopo`) | Due elementi: quale viene prima? Cinque confronti. | sequenze | tutte |
| Scommessa (`scommessa`) | Rispondi e punta 1, 2 o 3 punti sulla tua sicurezza. Servono 3 punti. | domande | tutte |
| Elimina (`elimina`) | Tocca le tre risposte sbagliate e lascia quella giusta. | domande | tutte |
| Sprint (`sprint`) | Cinque giuste in 60 secondi; ogni errore costa 5 secondi. | domande | tutte |
| Linea del tempo (`linea`) | Un elemento alla volta: tocca il punto della linea dove va. | sequenze | tutte |
| Trova le parole (`trovaparole`) | Le risposte sono nascoste in una griglia di lettere. Due minuti. | coppie con risposta di una parola | italiano, inglese, scienze, civica |
| Serie (`serie`) | Trova il numero che continua la successione. | generata | matematica |
| Colpo d'occhio (`colpo`) | Guarda quattro coppie per dieci secondi, poi rispondi a memoria. | coppie | tutte tranne matematica |
| Chi sono? (`chisono`) | Indizi uno alla volta: prima indovini, più vale. | indizi scritti nel file (`WHO`), numeri generati | tutte |

## Provati
Ogni gioco è stato giocato in automatico fino alla vittoria e fino alla sconfitta, per ogni materia: nessun errore.
Non provati: la voce, e il tocco su un telefono vero.

## Da sapere
- «Chi sono?» ha i suoi indizi dentro `s_magazzino.js` (sei per materia, 1ª superiore): per gli altri anni vanno aggiunti lì.
- «Trova le parole» per Storia non parte: le risposte delle coppie di Storia sono quasi tutte di più parole.
- La regola è: un errore si perdona, al secondo si perde (non «due errori» come nei giochi dei piccoli).
