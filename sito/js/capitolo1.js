/* =====================================================================
   CAPITOLO 1 – I NUMERI NATURALI &emsp; (testi originali)
   ---------------------------------------------------------------------
   Come si scrive:
   • <div class="curiosita" data-titolo="...">testo</div>
       → diventa un riquadro "Curiosità" con la lente, che si apre al clic
   • <div class="anim" data-anim="NOME" data-titolo="..."></div>
       → inserisce un'animazione interattiva (vedi animazioni.js)
   • <div class="definizione"><b>Definizione</b>...</div>, "regola",
     "attenzione", "esempio" → riquadri colorati
   ===================================================================== */
LIBRO.capitoli.cap1 = {
  id: "cap1", anno: 1, numero: 1,
  titolo: "I numeri naturali",
  sottotitolo: "Contare, ordinare, calcolare: i numeri da cui nasce tutta l'aritmetica.",
  pdf: "pdf/capitolo-1-numeri-naturali.pdf",

  /* --------------------- STORIA DELLA MATEMATICA (apertura) --------------------- */
  storia: `
<p class="storia-domanda">Da dove vengono i numeri?</p>
<p>Molto prima di saper scrivere, gli esseri umani avevano un problema molto pratico, cioè <b>tenere il conto</b>. Quante pecore sono uscite al pascolo e quante sono rientrate la sera? Quanti giorni mancano alla prossima luna piena? Quanto grano spetta a ogni famiglia dopo il raccolto? I numeri naturali sono nati per rispondere a domande come queste, e solo molto più tardi sono diventati un oggetto di studio “per sé stesso”.</p>
<ol class="linea-tempo">
<li><span class="data">circa 20 000 anni fa</span>Nell'Africa centrale è stato ritrovato l'<b>osso di Ishango</b>, con file di tacche incise. Forse serviva a contare oggetti o giorni, con un segno per ogni cosa contata, che è il modo più semplice di contare.</li>
<li><span class="data">circa 3500 a.C.</span>In <b>Mesopotamia</b> i mercanti registrano pecore, orci d'olio e misure di grano con piccoli gettoni di argilla. Dai segni impressi sulle tavolette nasce una delle prime forme di scrittura. Anche la parola “calcolo” ricorda quei tempi, perché in latino <i>calculus</i> era il sassolino usato per contare.</li>
<li><span class="data">circa 3000 a.C.</span>In <b>Egitto</b> si usano simboli diversi per 1, 10, 100 e 1000 (un bastoncino, un archetto, una corda arrotolata, un fiore di loto) per contare raccolti, tasse e operai dei grandi cantieri. Il sistema è in base 10 ma <b>non posizionale</b>, quindi per scrivere 300 si disegna tre volte il simbolo del 100.</li>
<li><span class="data">circa 300 a.C.</span>In <b>Grecia</b> Euclide, nel suo trattato <i>Elementi</i>, studia i numeri in sé. Dimostra che i numeri primi sono infiniti e descrive un metodo per trovare il massimo comune divisore di due numeri. Poco dopo Eratostene inventa il “crivello” per riconoscere i numeri primi.</li>
<li><span class="data">VII secolo d.C.</span>In <b>India</b> si afferma la scrittura <b>posizionale</b> con dieci cifre, compreso lo <b>zero</b>. Il matematico Brahmagupta (628 d.C.) spiega le regole per calcolare con lo zero.</li>
<li><span class="data">1202</span>Il mercante pisano <b>Leonardo Fibonacci</b> pubblica il <i>Liber abaci</i> e fa conoscere in Europa le cifre indo-arabe. Con esse i conti dei commercianti diventano molto più rapidi che con i numeri romani.</li>
<li><span class="data">1489 – fine del Seicento</span>Nascono i <b>simboli</b> che usiamo ancora oggi. I segni + e − compaiono in un manuale tedesco di aritmetica per mercanti (1489), il segno = viene proposto da Robert Recorde (1557), l'esponente scritto in alto da Cartesio (1637); il punto per la moltiplicazione e i due punti per la divisione si diffondono grazie a Gottfried Leibniz.</li>
<li><span class="data">1889</span>Il matematico torinese <b>Giuseppe Peano</b> descrive i numeri naturali con pochi assiomi, partendo da un primo numero e dall'idea di <b>successivo</b>, la stessa da cui parte questo capitolo.</li>
</ol>
<p class="storia-capitolo"><b>In questo capitolo</b> ripercorriamo lo stesso cammino. Impareremo a contare e confrontare, a usare le quattro operazioni nate per i commerci e le loro proprietà, a scrivere in breve numeri enormi con le potenze, a capire come funziona la scrittura posizionale in base 10 e in base 2 (quella dei computer), e a lavorare con multipli e divisori, utili per dividere in parti uguali o per capire quando due eventi che si ripetono capiteranno di nuovo insieme.</p>
`,

  /* ------------------------- TEORIA IN SINTESI (chiusura) ------------------------- */
  sintesi: `
<div class="sint-blocco"><h3><span>1</span>Che cosa sono i numeri naturali</h3>
<p>I numeri naturali sono <span class="mat">ℕ = {0, 1, 2, 3, …}</span>. Ogni numero <span class="mat"><i>n</i></span> ha un <b>successivo</b> <span class="mat"><i>n</i> + 1</span>; ogni numero diverso da 0 ha un <b>precedente</b> <span class="mat"><i>n</i> − 1</span>. Lo 0 è il più piccolo numero naturale e non esiste un numero naturale più grande di tutti.</p>
<p>Due numeri si confrontano con i simboli <span class="mat">=</span> &ensp;<span class="mat">≠</span> &ensp;<span class="mat">&lt;</span> &ensp;<span class="mat">&gt;</span> &ensp;<span class="mat">≤</span> &ensp;<span class="mat">≥</span></p>
<ul class="sint-lista">
<li><span class="mat">2<i>k</i></span><span class="nota">numeri <b>pari</b> (0, 2, 4, 6, …)</span></li>
<li><span class="mat">2<i>k</i> + 1</span><span class="nota">numeri <b>dispari</b> (1, 3, 5, 7, …)</span></li>
</ul>
</div>

<div class="sint-blocco"><h3><span>2</span>Le quattro operazioni</h3>
<table class="tab"><tr><th>Operazione</th><th>Termini</th><th>Risultato</th><th>Si può sempre fare in ℕ?</th></tr>
<tr><td>addizione</td><td>addendi</td><td>somma</td><td>sì</td></tr>
<tr><td>moltiplicazione</td><td>fattori</td><td>prodotto</td><td>sì</td></tr>
<tr><td>sottrazione</td><td>minuendo, sottraendo</td><td>differenza</td><td>solo se il minuendo è ≥ del sottraendo</td></tr>
<tr><td>divisione</td><td>dividendo, divisore</td><td>quoziente</td><td>solo se il dividendo è multiplo del divisore</td></tr></table>
<p><b>Divisione con resto.</b> Dati <span class="mat"><i>a</i></span> e <span class="mat"><i>b</i> ≠ 0</span>, si ha <span class="mat"><i>a</i> = <i>b</i> · <i>q</i> + <i>r</i></span> con <span class="mat"><i>r</i> &lt; <i>b</i></span>. Per esempio 23 = 5 · 4 + 3.</p>
<p><b>Lo 0 e l'1</b></p>
<ul class="sint-lista">
<li><span class="mat"><i>a</i> + 0 = <i>a</i></span><span class="nota">lo 0 è l'elemento neutro dell'addizione</span></li>
<li><span class="mat"><i>a</i> · 1 = <i>a</i></span><span class="nota">l'1 è l'elemento neutro della moltiplicazione</span></li>
<li><span class="mat"><i>a</i> · 0 = 0</span><span class="nota">lo 0 è l'elemento assorbente della moltiplicazione</span></li>
<li><span class="mat">0 : <i>a</i> = 0</span><span class="nota">con <i>a</i> ≠ 0</span></li>
<li><span class="mat"><i>a</i> : 0</span><span class="nota"><b>impossibile</b> se <i>a</i> ≠ 0</span></li>
<li><span class="mat">0 : 0</span><span class="nota"><b>indeterminata</b></span></li>
</ul>
</div>

<div class="sint-blocco"><h3><span>3</span>Le proprietà delle operazioni</h3>
<table class="tab"><tr><th>Proprietà</th><th>Vale per</th><th>Espressione</th></tr>
<tr><td>commutativa</td><td>addizione, moltiplicazione</td><td><i>a</i> + <i>b</i> = <i>b</i> + <i>a</i><br><i>a</i> · <i>b</i> = <i>b</i> · <i>a</i></td></tr>
<tr><td>associativa</td><td>addizione, moltiplicazione</td><td>(<i>a</i> + <i>b</i>) + <i>c</i> = <i>a</i> + (<i>b</i> + <i>c</i>)<br>(<i>a</i> · <i>b</i>) · <i>c</i> = <i>a</i> · (<i>b</i> · <i>c</i>)</td></tr>
<tr><td>distributiva</td><td>moltiplicazione rispetto ad addizione e sottrazione</td><td><i>a</i> · (<i>b</i> + <i>c</i>) = <i>a</i> · <i>b</i> + <i>a</i> · <i>c</i><br><i>a</i> · (<i>b</i> − <i>c</i>) = <i>a</i> · <i>b</i> − <i>a</i> · <i>c</i></td></tr>
<tr><td>distributiva a destra</td><td>divisione rispetto ad addizione e sottrazione</td><td>(<i>a</i> + <i>b</i>) : <i>c</i> = <i>a</i> : <i>c</i> + <i>b</i> : <i>c</i><br><small><i>c</i> ≠ 0, divisioni esatte</small></td></tr>
<tr><td>invariantiva</td><td>sottrazione</td><td><i>a</i> − <i>b</i> = (<i>a</i> + <i>c</i>) − (<i>b</i> + <i>c</i>)</td></tr>
<tr><td>invariantiva</td><td>divisione</td><td><i>a</i> : <i>b</i> = (<i>a</i> · <i>c</i>) : (<i>b</i> · <i>c</i>)<br><small><i>b</i> ≠ 0, <i>c</i> ≠ 0</small></td></tr></table>
</div>

<div class="sint-blocco"><h3><span>4</span>Le potenze e le loro proprietà</h3>
<p>La potenza <span class="mat"><span class="pot"><i>a</i><sup><i>n</i></sup></span></span> è il prodotto di <span class="mat"><i>n</i></span> fattori uguali ad <span class="mat"><i>a</i></span>. La <b>base</b> è <span class="mat"><i>a</i></span>, l'<b>esponente</b> è <span class="mat"><i>n</i></span>. Per esempio <span class="pot">2<sup>5</sup></span> = 2 · 2 · 2 · 2 · 2 = 32.</p>
<ul class="sint-lista">
<li><span class="mat"><span class="pot"><i>a</i><sup>1</sup></span> = <i>a</i></span><span class="nota">esponente 1</span></li>
<li><span class="mat"><span class="pot"><i>a</i><sup>0</sup></span> = 1</span><span class="nota">esponente 0, con <i>a</i> ≠ 0</span></li>
<li><span class="mat"><span class="pot">1<sup><i>n</i></sup></span> = 1</span><span class="nota">base 1</span></li>
<li><span class="mat"><span class="pot">0<sup><i>n</i></sup></span> = 0</span><span class="nota">base 0, con <i>n</i> ≠ 0</span></li>
<li><span class="mat"><span class="pot">0<sup>0</sup></span></span><span class="nota">non ha significato</span></li>
</ul>
<table class="tab"><tr><th>Proprietà</th><th>Espressione</th><th>Esempio</th></tr>
<tr><td>prodotto di potenze con la stessa base</td><td><span class="pot"><i>a</i><sup><i>m</i></sup></span> · <span class="pot"><i>a</i><sup><i>n</i></sup></span> = <span class="pot"><i>a</i><sup><i>m</i> + <i>n</i></sup></span></td><td><span class="pot">3<sup>2</sup></span> · <span class="pot">3<sup>4</sup></span> = <span class="pot">3<sup>6</sup></span></td></tr>
<tr><td>quoziente di potenze con la stessa base</td><td><span class="pot"><i>a</i><sup><i>m</i></sup></span> : <span class="pot"><i>a</i><sup><i>n</i></sup></span> = <span class="pot"><i>a</i><sup><i>m</i> − <i>n</i></sup></span><br><small><i>a</i> ≠ 0, <i>m</i> ≥ <i>n</i></small></td><td><span class="pot">7<sup>5</sup></span> : <span class="pot">7<sup>2</sup></span> = <span class="pot">7<sup>3</sup></span></td></tr>
<tr><td>potenza di una potenza</td><td><span class="pot">(<i>a</i><sup><i>m</i></sup>)<sup><i>n</i></sup></span> = <span class="pot"><i>a</i><sup><i>m</i> · <i>n</i></sup></span></td><td><span class="pot">(2<sup>3</sup>)<sup>4</sup></span> = <span class="pot">2<sup>12</sup></span></td></tr>
<tr><td>prodotto di potenze con lo stesso esponente</td><td><span class="pot"><i>a</i><sup><i>n</i></sup></span> · <span class="pot"><i>b</i><sup><i>n</i></sup></span> = <span class="pot">(<i>a</i> · <i>b</i>)<sup><i>n</i></sup></span></td><td><span class="pot">4<sup>3</sup></span> · <span class="pot">5<sup>3</sup></span> = <span class="pot">20<sup>3</sup></span></td></tr>
<tr><td>quoziente di potenze con lo stesso esponente</td><td><span class="pot"><i>a</i><sup><i>n</i></sup></span> : <span class="pot"><i>b</i><sup><i>n</i></sup></span> = <span class="pot">(<i>a</i> : <i>b</i>)<sup><i>n</i></sup></span><br><small><i>b</i> ≠ 0, a multiplo di <i>b</i></small></td><td><span class="pot">18<sup>2</sup></span> : <span class="pot">6<sup>2</sup></span> = <span class="pot">3<sup>2</sup></span></td></tr></table>
<p>Attenzione, non esistono regole per la somma: in generale <span class="mat"><span class="pot">(<i>a</i> + <i>b</i>)<sup>2</sup></span> ≠ <span class="pot"><i>a</i><sup>2</sup></span> + <span class="pot"><i>b</i><sup>2</sup></span></span>.</p>
</div>

<div class="sint-blocco"><h3><span>5</span>Base 10 e base 2</h3>
<p>Il nostro sistema di numerazione è <b>posizionale</b> e in <b>base 10</b>, cioè ogni posizione vale 10 volte quella alla sua destra. 3507 = 3 · <span class="pot">10<sup>3</sup></span> + 5 · <span class="pot">10<sup>2</sup></span> + 0 · <span class="pot">10<sup>1</sup></span> + 7 · <span class="pot">10<sup>0</sup></span>.</p>
<p>In <b>base 2</b> si usano solo le cifre 0 e 1 e ogni posizione vale il doppio di quella alla sua destra (1, 2, 4, 8, 16, …).</p>
<ul class="sint-lista">
<li><span class="mat">1101<sub>2</sub> = 8 + 4 + 0 + 1 = 13</span><span class="nota">da base 2 a base 10, si sommano i valori delle posizioni con l'1</span></li>
<li><span class="mat">13 → resti 1, 0, 1, 1 → 1101<sub>2</sub></span><span class="nota">da base 10 a base 2, divisioni successive per 2 e resti letti dall'ultimo al primo</span></li>
</ul>
</div>

<div class="sint-blocco"><h3><span>6</span>Le espressioni</h3>
<p><b>Ordine di calcolo.</b> Prima le parentesi, dalle tonde alle quadre alle graffe. Dentro ogni parentesi si calcolano prima le potenze, poi moltiplicazioni e divisioni nell'ordine in cui compaiono, infine addizioni e sottrazioni nell'ordine in cui compaiono.</p>
<p class="formula">[<span class="pot">(2 + 3)<sup>2</sup></span> − 5 · 3] : 2 = [25 − 15] : 2 = 10 : 2 = 5</p>
<p>In un'<b>espressione letterale</b> le lettere (variabili) stanno al posto dei numeri. Per calcolarne il valore si sostituiscono i numeri alle lettere.</p>
<table class="tab"><tr><th>A parole</th><th>Con i simboli</th><th>Con <i>a</i> = 3 e <i>b</i> = 4</th></tr>
<tr><td>il quadrato della somma di <i>a</i> e <i>b</i></td><td><span class="pot">(<i>a</i> + <i>b</i>)<sup>2</sup></span></td><td><span class="pot">7<sup>2</sup></span> = 49</td></tr>
<tr><td>la somma dei quadrati di <i>a</i> e <i>b</i></td><td><span class="pot"><i>a</i><sup>2</sup></span> + <span class="pot"><i>b</i><sup>2</sup></span></td><td>9 + 16 = 25</td></tr>
<tr><td>il doppio del successivo di a</td><td>2(<i>a</i> + 1)</td><td>2 · 4 = 8</td></tr></table>
</div>

<div class="sint-blocco"><h3><span>7</span>Multipli e divisori</h3>
<p><span class="mat"><i>a</i></span> è <b>multiplo</b> di <span class="mat"><i>b</i></span>, e <span class="mat"><i>b</i></span> è <b>divisore</b> di <span class="mat"><i>a</i></span>, se esiste un numero naturale <span class="mat"><i>c</i></span> tale che <span class="mat"><i>a</i> = <i>b</i> · c</span>. Per esempio 42 = 6 · 7, quindi 42 è multiplo di 6 e di 7, mentre 6 e 7 sono divisori di 42.</p>
<p>Un numero maggiore di 1 è <b>primo</b> se ha come divisori solo 1 e se stesso, altrimenti è <b>composto</b>. Ogni numero composto si scrive in un solo modo come prodotto di fattori primi, per esempio 90 = 2 · <span class="pot">3<sup>2</sup></span> · 5.</p>
<p><b>Criteri di divisibilità</b></p>
<table class="tab"><tr><th>Divisibile per</th><th>se…</th></tr>
<tr><td>2</td><td>l'ultima cifra è pari</td></tr>
<tr><td>3</td><td>la somma delle cifre è divisibile per 3</td></tr>
<tr><td>4</td><td>le ultime due cifre formano un multiplo di 4 (o sono 00)</td></tr>
<tr><td>5</td><td>l'ultima cifra è 0 o 5</td></tr>
<tr><td>9</td><td>la somma delle cifre è divisibile per 9</td></tr>
<tr><td>10, 100, …</td><td>termina con uno, due, … zeri</td></tr>
<tr><td>11</td><td>la differenza tra la somma delle cifre di posto dispari e quella delle cifre di posto pari è 0 o un multiplo di 11</td></tr>
<tr><td>25</td><td>le ultime due cifre sono 00, 25, 50 o 75</td></tr></table>
</div>

<div class="sint-blocco"><h3><span>8</span>MCD e mcm</h3>
<p>Il <b>MCD</b> di due o più numeri è il prodotto dei soli fattori primi <b>comuni</b>, ciascuno preso una volta con l'esponente <b>minore</b>. Il <b>mcm</b> è il prodotto dei fattori primi <b>comuni e non comuni</b>, ciascuno preso una volta con l'esponente <b>maggiore</b>.</p>
<div class="esempio"><b>Esempio</b>
<ul class="sint-lista">
<li><span class="mat">36 = <span class="pot">2<sup>2</sup></span> · <span class="pot">3<sup>2</sup></span></span></li>
<li><span class="mat">60 = <span class="pot">2<sup>2</sup></span> · 3 · 5</span></li>
<li><span class="mat">MCD(36; 60) = <span class="pot">2<sup>2</sup></span> · 3 = 12</span><span class="nota">fattori comuni, esponente minore</span></li>
<li><span class="mat">mcm(36; 60) = <span class="pot">2<sup>2</sup></span> · <span class="pot">3<sup>2</sup></span> · 5 = 180</span><span class="nota">tutti i fattori, esponente maggiore</span></li>
</ul></div>
<p>Due numeri con MCD = 1 si dicono <b>primi tra loro</b>.</p>
<p class="formula">MCD(<i>a</i>; <i>b</i>) · mcm(<i>a</i>; <i>b</i>) = <i>a</i> · <i>b</i></p>
</div>
`,

  /* ------------------------------ TEORIA ------------------------------ */
  paragrafi: [
  { n: 1, id: "p1", titolo: "Che cosa sono i numeri naturali", html: `
<figure class="fig-testo" data-img="mele"><figcaption>Quante mele? Contare è il primo uso dei numeri naturali.</figcaption></figure><p>I primi numeri che impariamo servono a <b>contare</b> (tre mele, venti studenti) e a <b>mettere in ordine</b> (il primo, il secondo, il terzo arrivato). Sono i <b>numeri naturali</b>, e l'insieme che li contiene tutti si indica con la lettera <span class="mat">ℕ</span>:</p>
<p class="formula">ℕ = {0, 1, 2, 3, 4, 5, 6, …}</p>
<p>I puntini dicono che l'elenco non finisce mai: dopo ogni numero ne viene sempre un altro.</p>

<h3>Successivo e precedente</h3>
<div class="definizione"><b>Definizione</b>
Il <b>successivo</b> di un numero naturale <span class="mat"><i>n</i></span> è <span class="mat"><i>n</i> + 1</span>. Il <b>precedente</b> di <span class="mat"><i>n</i></span> (se <span class="mat"><i>n</i> ≠ 0</span>) è <span class="mat"><i>n</i> − 1</span>. Due numeri come 7 e 8, uno successivo dell'altro, si dicono <b>consecutivi</b>.</div>
<p>Da qui seguono tre fatti importanti:</p>
<ul>
<li>ogni numero naturale ha un successivo, quindi <span class="mat">ℕ</span> è un insieme <b>infinito</b> e <b>non ha un numero più grande di tutti</b>;</li>
<li>lo <b>0</b> è l'unico numero naturale che <b>non ha precedente</b>: è il più piccolo di tutti;</li>
<li>tra due numeri consecutivi non c'è nessun altro numero naturale: per questo si dice che <span class="mat">ℕ</span> è un insieme <b>discreto</b>.</li>
</ul>

<h3>I numeri naturali su una semiretta</h3>
<p>Per “vedere” i numeri naturali disegniamo una semiretta orientata. Fissiamo il punto di partenza (l'<b>origine</b>), a cui associamo lo 0, e scegliamo un segmento come <b>unità di misura</b>. Riportando l'unità più volte una dopo l'altra otteniamo i punti 1, 2, 3, … tutti alla stessa distanza. Passare al successivo significa fare <b>un salto in avanti</b> di un'unità.</p>
<div class="anim" data-anim="semiretta" data-titolo="Salti sulla semiretta: successivo e precedente"></div>

<h3>Confrontare due numeri</h3>
<p>Dati due numeri naturali diversi, uno è sempre più grande dell'altro: sulla semiretta il maggiore si trova più a destra. Per scrivere i confronti si usano questi simboli:</p>
<table class="tab"><tr><th>Simbolo</th><th>Si legge</th><th>Esempio</th></tr>
<tr><td>=</td><td>uguale a</td><td>4 + 3 = 7</td></tr>
<tr><td>≠</td><td>diverso da</td><td>5 ≠ 8</td></tr>
<tr><td>&lt;</td><td>minore di</td><td>3 &lt; 9</td></tr>
<tr><td>&gt;</td><td>maggiore di</td><td>12 &gt; 10</td></tr>
<tr><td>≤</td><td>minore o uguale a</td><td><i>n</i> ≤ 5 vale per 0, 1, 2, 3, 4, 5</td></tr>
<tr><td>≥</td><td>maggiore o uguale a</td><td><i>n</i> ≥ 1 vale per tutti i naturali tranne lo 0</td></tr></table>
<div class="regola"><b>Trucco</b>La “bocca” del simbolo &lt; o &gt; è sempre aperta verso il numero più grande.</div>

<h3>Numeri pari e dispari</h3>
<p>Un numero è <b>pari</b> se si può dividere in due parti uguali senza resto (0, 2, 4, 6, …), <b>dispari</b> altrimenti (1, 3, 5, 7, …). Pari e dispari si alternano: il successivo di un pari è dispari e viceversa. Con le lettere, un pari si scrive <span class="mat">2<i>k</i></span> e un dispari <span class="mat">2<i>k</i> + 1</span>, dove <span class="mat"><i>k</i></span> è un numero naturale qualsiasi.</p>

<div class="curiosita" data-img="hotel" data-titolo="L'albergo di Hilbert: sempre una stanza libera">
<p>Il matematico tedesco David Hilbert inventò un esperimento mentale per far capire quanto è strano l'infinito. Immagina un albergo con <b>infinite stanze</b>, numerate 1, 2, 3, … e <b>tutte occupate</b>. Arriva un nuovo ospite: il portiere non si scompone e chiede a ogni cliente di spostarsi dalla stanza <span class="mat"><i>n</i></span> alla stanza <span class="mat"><i>n</i> + 1</span>. Nessuno resta senza camera e la stanza 1 si libera!</p>
<p>E se arrivasse un pullman con infiniti nuovi ospiti? Basta spostare ogni cliente dalla stanza <span class="mat"><i>n</i></span> alla stanza <span class="mat">2<i>n</i></span>: gli ospiti già presenti finiscono tutti nelle stanze pari e restano libere infinite stanze dispari.</p>
<p>Con un numero finito di stanze tutto questo sarebbe impossibile. È proprio il fatto che ogni numero naturale ha un successivo a rendere possibile il “trucco”.</p>
</div>
`},

  { n: 2, id: "p2", titolo: "Le quattro operazioni", html: `
<p>Con i numeri naturali possiamo eseguire le quattro operazioni. Ognuna lavora su due numeri, gli <b>operandi</b>, e restituisce un <b>risultato</b>. Operandi e risultato hanno un nome diverso a seconda dell'operazione:</p>
<table class="tab"><tr><th>Operazione</th><th>Esempio</th><th>Primo termine</th><th>Secondo termine</th><th>Risultato</th></tr>
<tr><td>addizione</td><td>9 + 4 = 13</td><td>addendo</td><td>addendo</td><td>somma</td></tr>
<tr><td>sottrazione</td><td>9 − 4 = 5</td><td>minuendo</td><td>sottraendo</td><td>differenza</td></tr>
<tr><td>moltiplicazione</td><td>9 · 4 = 36</td><td>fattore</td><td>fattore</td><td>prodotto</td></tr>
<tr><td>divisione</td><td>36 : 4 = 9</td><td>dividendo</td><td>divisore</td><td>quoziente</td></tr></table>

<h3>Quando un'operazione “funziona sempre”</h3>
<p>Se sommiamo o moltiplichiamo due numeri naturali, otteniamo sempre un numero naturale. Si dice che addizione e moltiplicazione sono <b>operazioni interne</b> in <span class="mat">ℕ</span>.</p>
<p>Con la sottrazione e la divisione non è così.</p>
<ul>
<li><span class="mat"><i>a</i> − <i>b</i></span> si può calcolare in <span class="mat">ℕ</span> solo se <span class="mat"><i>a</i> ≥ <i>b</i></span>. Per esempio 9 − 4 = 5, mentre 4 − 9 non è un numero naturale;</li>
<li><span class="mat"><i>a</i> : <i>b</i></span> dà un quoziente esatto solo se <span class="mat"><i>a</i></span> è un multiplo di <span class="mat"><i>b</i></span>. Per esempio 36 : 4 = 9, mentre 37 : 4 non ha un quoziente esatto in <span class="mat">ℕ</span>.</li>
</ul>
<p>Sottrazione e divisione sono le <b>operazioni inverse</b> di addizione e moltiplicazione. Infatti 13 − 4 = 9 perché 9 + 4 = 13, e 36 : 4 = 9 perché 9 · 4 = 36.</p>

<h3>La divisione con resto</h3>
<figure class="fig-testo" data-img="caramelle"><figcaption>Quante caramelle per ciascuno? E quante ne avanzano?</figcaption></figure><p>Quando la divisione non è esatta possiamo comunque dividere “il più possibile” e vedere quanto avanza. Se distribuiamo 23 caramelle in sacchetti da 5, riempiamo 4 sacchetti e ne avanzano 3. In simboli scriviamo</p>
<p class="formula">23 = 5 · 4 + 3</p>
<div class="definizione"><b>Definizione</b>
Dati due naturali <span class="mat"><i>a</i></span> e <span class="mat"><i>b</i></span>, con <span class="mat"><i>b</i> ≠ 0</span>, eseguire la <b>divisione con resto</b> significa trovare il <b>quoziente</b> <span class="mat"><i>q</i></span> e il <b>resto</b> <span class="mat"><i>r</i></span> tali che
<p class="formula"><i>a</i> = <i>b</i> · <i>q</i> + <i>r</i> &emsp; con &emsp; 0 ≤ <i>r</i> &lt; <i>b</i></p>
Il resto è sempre più piccolo del divisore. Se <span class="mat"><i>r</i> = 0</span> la divisione è esatta.</div>
<div class="anim" data-anim="divisione" data-titolo="Caramelle nei sacchetti: quoziente e resto"></div>

<h3>Due numeri speciali: lo 0 e l'1</h3>
<ul>
<li>Sommare 0 non cambia un numero, cioè <span class="mat"><i>a</i> + 0 = <i>a</i></span>. Lo 0 è l'<b>elemento neutro</b> dell'addizione.</li>
<li>Moltiplicare per 1 non cambia un numero, cioè <span class="mat"><i>a</i> · 1 = <i>a</i></span>. L'1 è l'<b>elemento neutro</b> della moltiplicazione.</li>
<li>Moltiplicare per 0 dà sempre 0, cioè <span class="mat"><i>a</i> · 0 = 0</span>. Lo 0 è l'<b>elemento assorbente</b> della moltiplicazione.</li>
</ul>
<div class="regola"><b>Legge di annullamento del prodotto</b>Un prodotto è uguale a 0 se e solo se almeno uno dei fattori è 0.</div>

<h3>Le divisioni con lo zero</h3>
<table class="tab"><tr><th>Caso</th><th>Risultato</th><th>Perché</th></tr>
<tr><td>0 : 7</td><td>0</td><td>infatti 0 · 7 = 0</td></tr>
<tr><td>7 : 0</td><td><b>impossibile</b></td><td>nessun numero moltiplicato per 0 dà 7</td></tr>
<tr><td>0 : 0</td><td><b>indeterminata</b></td><td>qualsiasi numero moltiplicato per 0 dà 0, quindi non c'è un'unica risposta</td></tr></table>

<div class="curiosita" data-img="calcolatrice" data-titolo="Perché la calcolatrice dice “Errore” se dividi per zero?">
<p>Prova a fare 7 : 0 su una calcolatrice: comparirà “Error” o “E”. Non è un difetto della macchina: è la matematica che non sa dare una risposta.</p>
<p>Pensa alla divisione come a una domanda: <i>“quante volte lo 0 sta nel 7?”</i>. Puoi aggiungere zeri all'infinito, ma non arriverai mai a 7. Oppure ragiona con la verifica: il risultato di 7 : 0 dovrebbe essere un numero che, moltiplicato per 0, dà 7. Ma qualsiasi numero per 0 fa 0!</p>
<p>Nel 1997 una nave da guerra americana, la USS Yorktown, rimase ferma in mare per quasi tre ore: un operatore aveva inserito per errore uno 0 in un campo del computer di bordo e il programma, tentando una divisione per zero, mandò in tilt l'intero sistema di propulsione.</p>
</div>
`},

  { n: 3, id: "p3", titolo: "Le proprietà delle operazioni", html: `
<p>Le operazioni hanno delle <b>proprietà</b>: regole che valgono sempre, qualunque siano i numeri. Conoscerle permette di calcolare più velocemente, anche a mente.</p>

<h3>Proprietà commutativa</h3>
<div class="regola"><b>Commutativa</b>Cambiando l'ordine degli addendi la somma non cambia; cambiando l'ordine dei fattori il prodotto non cambia.
<p class="formula"><i>a</i> + <i>b</i> = <i>b</i> + <i>a</i> &emsp; <i>a</i> · <i>b</i> = <i>b</i> · <i>a</i></p></div>
<p>Non vale per la sottrazione (9 − 4 ≠ 4 − 9) né per la divisione (8 : 2 ≠ 2 : 8).</p>

<h3>Proprietà associativa</h3>
<div class="regola"><b>Associativa</b>In una somma (o in un prodotto) di tre o più termini, si possono raggruppare a piacere due termini vicini e sostituirli con il loro risultato.
<p class="formula">(<i>a</i> + <i>b</i>) + <i>c</i> = <i>a</i> + (<i>b</i> + <i>c</i>) &emsp; (<i>a</i> · <i>b</i>) · <i>c</i> = <i>a</i> · (<i>b</i> · <i>c</i>)</p></div>
<div class="esempio"><b>Esempio</b> &emsp; 37 + 26 + 4 = 37 + (26 + 4) = 37 + 30 = 67 &emsp; 4 · 13 · 25 = 13 · (4 · 25) = 13 · 100 = 1300</div>
<p>Anche l'associativa non vale per la sottrazione e per la divisione. Per esempio (20 − 8) − 2 = 10, mentre 20 − (8 − 2) = 14; (48 : 4) : 2 = 6, mentre 48 : (4 : 2) = 24.</p>

<h3>Proprietà distributiva</h3>
<figure class="fig-testo" data-img="pizza"><figcaption>Ogni pizza ha 6 fette, quindi 3 pizze e poi altre 2 danno (3 + 2) · 6 = 3 · 6 + 2 · 6 fette.</figcaption></figure><div class="regola"><b>Distributiva della moltiplicazione</b>Per moltiplicare un numero per una somma (o una differenza) si può moltiplicare il numero per ciascun termine e poi sommare (o sottrarre) i risultati.
<p class="formula"><i>a</i> · (<i>b</i> + <i>c</i>) = <i>a</i> · <i>b</i> + <i>a</i> · <i>c</i> &emsp; <i>a</i> · (<i>b</i> − <i>c</i>) = <i>a</i> · <i>b</i> − <i>a</i> · <i>c</i></p></div>
<p>L'animazione mostra perché funziona: l'area di un rettangolo di base <span class="mat"><i>b</i> + <i>c</i></span> e altezza <span class="mat"><i>a</i></span> è uguale alla somma delle aree dei due rettangoli più piccoli.</p>
<div class="anim" data-anim="area" data-titolo="La proprietà distributiva vista con le aree"></div>
<p>Anche la divisione è distributiva, ma <b>solo a destra</b>. Per esempio <span class="mat">(12 + 8) : 4 = 12 : 4 + 8 : 4 = 5</span>. Invece <span class="mat">24 : (4 + 2)</span> = 4, mentre 24 : 4 + 24 : 2 = 18, quindi a sinistra la proprietà non vale.</p>

<h3>Proprietà invariantiva</h3>
<div class="regola"><b>Invariantiva</b>
<b style="display:inline;text-transform:none;letter-spacing:0">Sottrazione:</b> aggiungendo o togliendo lo stesso numero a minuendo e sottraendo, la differenza non cambia.
<p class="formula"><i>a</i> − <i>b</i> = (<i>a</i> + <i>c</i>) − (<i>b</i> + <i>c</i>)</p>
<b style="display:inline;text-transform:none;letter-spacing:0">Divisione:</b> moltiplicando o dividendo dividendo e divisore per lo stesso numero (diverso da 0), il quoziente non cambia.
<p class="formula"><i>a</i> : <i>b</i> = (<i>a</i> · <i>c</i>) : (<i>b</i> · <i>c</i>)</p></div>
<div class="esempio"><b>Esempio</b> &emsp; 83 − 28 = 85 − 30 = 55 &emsp; 4200 : 600 = 42 : 6 = 7</div>

<div class="curiosita" data-img="cronometro" data-titolo="Calcolo mentale da campioni">
<p>Chi fa i calcoli a mente velocissimo non ha una memoria speciale: usa le proprietà!</p>
<ul>
<li><b>99 · 7</b> → 99 = 100 − 1, quindi (100 − 1) · 7 = 700 − 7 = <b>693</b> (distributiva).</li>
<li><b>25 · 36</b> → 36 = 4 · 9, quindi 25 · 4 · 9 = 100 · 9 = <b>900</b> (associativa).</li>
<li><b>1000 − 637</b> → togli 1 a entrambi e ottieni 999 − 636 = <b>363</b>, senza nessun prestito (invariantiva).</li>
<li><b>15 · 14</b> → 15 · 14 = 15 · 2 · 7 = 30 · 7 = <b>210</b>.</li>
</ul>
<p>Si racconta che il giovane Carl Friedrich Gauss, a 9 anni, sommò in pochi secondi tutti i numeri da 1 a 100 accoppiandoli. Le coppie 1 + 100, 2 + 99, 3 + 98… sono 50 che valgono 101 ciascuna, quindi 50 · 101 = 5050.</p>
</div>
`},

  { n: 4, id: "p4", titolo: "Le potenze e le loro proprietà", html: `
<p>Quando moltiplichiamo un numero per se stesso più volte, la scrittura diventa lunga, come in <span class="mat">2 · 2 · 2 · 2 · 2</span>. Per abbreviarla si usa la <b>potenza</b>:</p>
<p class="formula">2 · 2 · 2 · 2 · 2 = <span class="pot">2<sup>5</sup></span> = 32</p>
<div class="definizione"><b>Definizione</b>
La <b>potenza</b> <span class="mat"><span class="pot"><i>a</i><sup><i>n</i></sup></span></span>, con <span class="mat"><i>n</i> ≥ 2</span>, è il prodotto di <span class="mat"><i>n</i></span> fattori tutti uguali ad <span class="mat"><i>a</i></span>. Il numero <span class="mat"><i>a</i></span> si chiama <b>base</b>, il numero <span class="mat"><i>n</i></span> <b>esponente</b>.</div>
<p>Si legge “<i>a</i> elevato alla <i>n</i>”. Alcune potenze hanno nomi speciali. Per esempio <span class="mat"><span class="pot"><i>a</i><sup>2</sup></span></span> è “<i>a</i> al quadrato”, <span class="mat"><span class="pot"><i>a</i><sup>3</sup></span></span> è “<i>a</i> al cubo”.</p>
<div class="attenzione"><b>Attenzione</b><span class="pot">2<sup>5</sup></span> non è 2 · 5 = 10! L'esponente dice <b>quante volte</b> la base compare come fattore, quindi <span class="pot">2<sup>5</sup></span> = 32.</div>

<h3>Esponente 1 ed esponente 0</h3>
<p>La definizione funziona da 2 fattori in su. Per gli esponenti 1 e 0 si stabilisce che</p>
<p class="formula"><span class="pot"><i>a</i><sup>1</sup></span> = <i>a</i> &emsp; <span class="pot"><i>a</i><sup>0</sup></span> = 1 &emsp; (con <i>a</i> ≠ 0)</p>
<p>La scelta di <span class="mat"><span class="pot"><i>a</i><sup>0</sup></span> = 1</span> non è un capriccio: più avanti, con le proprietà delle potenze, vedremo che è l'unica che le rende coerenti. L'espressione <span class="mat"><span class="pot">0<sup>0</sup></span></span> invece <b>non ha significato</b>. Inoltre <span class="mat"><span class="pot">1<sup><i>n</i></sup></span> = 1</span> e <span class="mat"><span class="pot">0<sup><i>n</i></sup></span> = 0</span> per ogni <span class="mat"><i>n</i> ≥ 1</span>.</p>

<h3>Le potenze crescono in fretta</h3>
<p>Ogni volta che l'esponente aumenta di 1, il risultato viene moltiplicato per la base. Con la base 2 il risultato raddoppia a ogni passo; con la base 3 triplica. Guarda l'albero: ogni ramo si divide in tanti rami quanta è la base.</p>
<div class="anim" data-anim="albero" data-titolo="L'albero delle potenze"></div>

<div class="curiosita" data-img="scacchiera" data-titolo="La leggenda della scacchiera e del riso">
<p>Una leggenda indiana racconta che l'inventore degli scacchi, invitato dal re a scegliere una ricompensa, chiese solo del riso. Voleva <b>1 chicco</b> sulla prima casella della scacchiera, <b>2</b> sulla seconda, <b>4</b> sulla terza, e così via raddoppiando fino alla sessantaquattresima.</p>
<p>Il re rise per la richiesta così modesta. Ma sull'ultima casella ci sarebbero dovuti essere <span class="mat"><span class="pot">2<sup>63</sup></span></span> chicchi, cioè più di <b>9 miliardi di miliardi</b>. Tutto il riso prodotto oggi nel mondo in un anno non basterebbe nemmeno lontanamente: per riempire la scacchiera servirebbero alcune centinaia di anni di raccolti mondiali.</p>
<p>Un esperimento simile puoi farlo con un foglio: piegandolo a metà lo spessore raddoppia. Dopo 42 piegature (se fosse possibile farle!) lo spessore supererebbe la distanza tra la Terra e la Luna.</p>
</div>

<h3>Le proprietà delle potenze</h3>
<p>Le potenze con la stessa base, o con lo stesso esponente, si possono combinare con cinque regole. Tutte nascono dalla definizione: basta “contare i fattori”.</p>

<h4>1. Prodotto di potenze con la stessa base</h4>
<p class="formula"><span class="pot"><i>a</i><sup><i>m</i></sup></span> · <span class="pot"><i>a</i><sup><i>n</i></sup></span> = <span class="pot"><i>a</i><sup><i>m</i> + <i>n</i></sup></span></p>
<p>Infatti <span class="mat"><span class="pot">2<sup>3</sup></span> · <span class="pot">2<sup>2</sup></span> = (2 · 2 · 2) · (2 · 2)</span>, quindi in tutto ci sono 3 + 2 = 5 fattori uguali a 2.</p>
<div class="anim" data-anim="gettoni" data-titolo="Contiamo i fattori: prodotto di potenze con la stessa base"></div>

<h4>2. Quoziente di potenze con la stessa base</h4>
<p class="formula"><span class="pot"><i>a</i><sup><i>m</i></sup></span> : <span class="pot"><i>a</i><sup><i>n</i></sup></span> = <span class="pot"><i>a</i><sup><i>m</i> − <i>n</i></sup></span> &emsp; (<i>a</i> ≠ 0, <i>m</i> ≥ <i>n</i>)</p>
<p>Dividendo si “eliminano” fattori. Per esempio <span class="pot">5<sup>6</sup></span> : <span class="pot">5<sup>4</sup></span> = <span class="pot">5<sup>2</sup></span>. Se <span class="mat"><i>m</i> = <i>n</i></span> otteniamo <span class="mat"><span class="pot"><i>a</i><sup><i>n</i></sup></span> : <span class="pot"><i>a</i><sup><i>n</i></sup></span> = <span class="pot"><i>a</i><sup>0</sup></span></span>; ma un numero diviso per se stesso dà 1. Ecco perché si pone <span class="mat"><span class="pot"><i>a</i><sup>0</sup></span> = 1</span>.</p>

<h4>3. Potenza di una potenza</h4>
<p class="formula"><span class="pot">(<i>a</i><sup><i>m</i></sup>)<sup><i>n</i></sup></span> = <span class="pot"><i>a</i><sup><i>m</i> · <i>n</i></sup></span></p>
<p><span class="pot">(3<sup>2</sup>)<sup>3</sup></span> = <span class="pot">3<sup>2</sup></span> · <span class="pot">3<sup>2</sup></span> · <span class="pot">3<sup>2</sup></span> = <span class="pot">3<sup>6</sup></span>.</p>

<h4>4. Prodotto di potenze con lo stesso esponente</h4>
<p class="formula"><span class="pot"><i>a</i><sup><i>n</i></sup></span> · <span class="pot"><i>b</i><sup><i>n</i></sup></span> = <span class="pot">(<i>a</i> · <i>b</i>)<sup><i>n</i></sup></span></p>
<p><span class="pot">2<sup>3</sup></span> · <span class="pot">5<sup>3</sup></span> = <span class="pot">(2 · 5)<sup>3</sup></span> = <span class="pot">10<sup>3</sup></span> = 1000. Utilissima per i calcoli a mente!</p>

<h4>5. Quoziente di potenze con lo stesso esponente</h4>
<p class="formula"><span class="pot"><i>a</i><sup><i>n</i></sup></span> : <span class="pot"><i>b</i><sup><i>n</i></sup></span> = <span class="pot">(<i>a</i> : <i>b</i>)<sup><i>n</i></sup></span> &emsp; (<i>b</i> ≠ 0, a multiplo di <i>b</i>)</p>
<p><span class="pot">12<sup>4</sup></span> : <span class="pot">4<sup>4</sup></span> = <span class="pot">(12 : 4)<sup>4</sup></span> = <span class="pot">3<sup>4</sup></span> = 81.</p>

<div class="attenzione"><b>Errori da evitare</b>
<ul style="margin:4px 0 0">
<li><span class="pot">2<sup>3</sup></span> · <span class="pot">3<sup>2</sup></span> <b>non</b> si semplifica: basi ed esponenti sono entrambi diversi.</li>
<li><span class="pot">(<i>a</i> + <i>b</i>)<sup>2</sup></span> ≠ <span class="pot"><i>a</i><sup>2</sup></span> + <span class="pot"><i>b</i><sup>2</sup></span>, perché le proprietà valgono per prodotti e quozienti, <b>non</b> per somme e differenze.</li>
<li><span class="pot">(2<sup>3</sup>)<sup>2</sup></span> = <span class="pot">2<sup>6</sup></span>, mentre <span class="pot">2<sup>3</sup></span> · <span class="pot">2<sup>2</sup></span> = <span class="pot">2<sup>5</sup></span>. Non confondere la terza proprietà con la prima.</li>
</ul></div>
`},

  { n: 5, id: "p5", titolo: "Scrivere i numeri: base 10 e base 2", html: `
<p>Per scrivere i numeri usiamo solo dieci simboli, le <b>cifre</b> 0, 1, 2, …, 9. Eppure con queste dieci cifre riusciamo a scrivere numeri grandi quanto vogliamo. Il segreto è la <b>posizione</b>: la stessa cifra vale di più o di meno a seconda del posto che occupa. In questo paragrafo vediamo come funziona il nostro sistema, che si basa sulle potenze di 10, e un sistema che si basa sulle potenze di 2, quello che usano i computer.</p>

<h3>Il sistema decimale</h3>
<figure class="fig-testo" data-img="monete"><figcaption>Unità, decine, centinaia: ogni posizione vale 10 volte la precedente.</figcaption></figure><p>Il nostro sistema di numerazione è <b>decimale</b> (si basa sul 10) e <b>posizionale</b>. Partendo da destra, la prima cifra conta le unità, la seconda le decine, la terza le centinaia, e così via. Ogni posizione vale 10 volte quella alla sua destra, quindi le posizioni corrispondono alle potenze di 10.</p>
<table class="tab"><tr><th>Posizione</th><th>migliaia</th><th>centinaia</th><th>decine</th><th>unità</th></tr>
<tr><td>Valore</td><td><span class="pot">10<sup>3</sup></span> = 1000</td><td><span class="pot">10<sup>2</sup></span> = 100</td><td><span class="pot">10<sup>1</sup></span> = 10</td><td><span class="pot">10<sup>0</sup></span> = 1</td></tr>
<tr><td>Cifre di 3507</td><td>3</td><td>5</td><td>0</td><td>7</td></tr></table>
<p>Ogni cifra si moltiplica per il valore della sua posizione e poi si sommano i risultati.</p>
<p class="formula">3507 = 3 · <span class="pot">10<sup>3</sup></span> + 5 · <span class="pot">10<sup>2</sup></span> + 0 · <span class="pot">10<sup>1</sup></span> + 7 · <span class="pot">10<sup>0</sup></span></p>
<p>Il 3 vale tremila perché sta nella posizione delle migliaia. Lo 0 è indispensabile, perché segna che le decine mancano. Senza lo 0, 3507 e 357 si scriverebbero allo stesso modo.</p>
<div class="definizione"><b>Definizione</b>
Un sistema di numerazione è <b>posizionale</b> se il valore di una cifra dipende dalla posizione che occupa nel numero. La <b>base</b> è il numero di cifre che il sistema usa, ed è anche il numero per cui si moltiplica il valore passando da una posizione a quella alla sua sinistra.</div>

<h3>Il sistema binario</h3>
<p>Nulla ci obbliga a usare proprio il 10. Con la base 2 bastano due cifre, lo <b>0</b> e l'<b>1</b>, e ogni posizione vale il doppio di quella alla sua destra.</p>
<table class="tab"><tr><th>Posizione</th><th>5ª</th><th>4ª</th><th>3ª</th><th>2ª</th><th>1ª</th></tr>
<tr><td>Valore</td><td><span class="pot">2<sup>4</sup></span> = 16</td><td><span class="pot">2<sup>3</sup></span> = 8</td><td><span class="pot">2<sup>2</sup></span> = 4</td><td><span class="pot">2<sup>1</sup></span> = 2</td><td><span class="pot">2<sup>0</sup></span> = 1</td></tr></table>
<p>Per non confondere un numero scritto in base 2 con uno scritto in base 10, si scrive la base in piccolo, in basso a destra. Per esempio 1101<sub>2</sub> si legge “uno uno zero uno in base due”.</p>

<h3>Dalla base 2 alla base 10</h3>
<div class="regola"><b>Regola</b>Per trovare il valore di un numero scritto in base 2 si moltiplica ogni cifra per la potenza di 2 della sua posizione e si sommano i risultati. In pratica basta sommare i valori delle posizioni in cui c'è un 1.</div>
<div class="esempio"><b>Esempio</b> &emsp; Quanto vale 1101<sub>2</sub> in base 10?</div>
<ol class="passaggi">
<li>Si scrivono le cifre con il valore della loro posizione, partendo da destra. &emsp; <span class="nw">1101<sub>2</sub> = <span class="c1">1</span> · <span class="pot">2<sup>3</sup></span> + <span class="c2">1</span> · <span class="pot">2<sup>2</sup></span> + <span class="c3">0</span> · <span class="pot">2<sup>1</sup></span> + <span class="c4">1</span> · <span class="pot">2<sup>0</sup></span></span></li>
<li>Si calcolano le potenze di 2. &emsp; <span class="nw">= <span class="c1">1</span> · 8 + <span class="c2">1</span> · 4 + <span class="c3">0</span> · 2 + <span class="c4">1</span> · 1</span></li>
<li>Si fanno le moltiplicazioni e si somma. <span class="perche">La cifra 0 non porta niente, quindi si possono sommare solo i valori delle posizioni con l'1.</span> &emsp; <span class="nw">= 8 + 4 + 0 + 1 = 13</span></li>
</ol>

<h3>Dalla base 10 alla base 2</h3>
<p>Per fare il cammino inverso si usano le <b>divisioni successive per 2</b>. Il resto di ogni divisione è 0 oppure 1, e questi resti sono proprio le cifre del numero in base 2.</p>
<div class="regola"><b>Regola</b>Si divide il numero per 2 e si scrive il resto. Si divide per 2 il quoziente ottenuto e si scrive il nuovo resto, e così via fino ad arrivare a quoziente 0. Il numero in base 2 si ottiene leggendo i resti <b>dall'ultimo al primo</b>.</div>
<div class="esempio"><b>Esempio</b> &emsp; Scriviamo 13 in base 2.</div>
<table class="tab"><tr><th>Divisione</th><th>Quoziente</th><th>Resto</th></tr>
<tr><td>13 : 2</td><td>6</td><td><span class="c1">1</span></td></tr>
<tr><td>6 : 2</td><td>3</td><td><span class="c2">0</span></td></tr>
<tr><td>3 : 2</td><td>1</td><td><span class="c3">1</span></td></tr>
<tr><td>1 : 2</td><td>0</td><td><span class="c4">1</span></td></tr></table>
<p>Leggendo i resti dal basso verso l'alto si ottiene 13 = <span class="c4">1</span><span class="c3">1</span><span class="c2">0</span><span class="c1">1</span><sub>2</sub>. Il primo resto è la cifra delle unità, perché dice se il numero è pari (resto 0) o dispari (resto 1). Infatti abbiamo appena visto che 1101<sub>2</sub> = 13.</p>
<div class="attenzione"><b>Attenzione</b>10<sub>2</sub> non è “dieci”, ma vale 1 · 2 + 0 · 1 = 2. Allo stesso modo 100<sub>2</sub> = 4 e 1000<sub>2</sub> = 8. In base 2, aggiungere uno 0 a destra <b>raddoppia</b> il numero, come in base 10 aggiungere uno 0 lo moltiplica per 10.</div>

<div class="curiosita" data-img="chip" data-titolo="Perché 1 kilobyte non è 1000 byte?">
<p>I computer lavorano con circuiti che hanno solo due stati, acceso e spento, ed è per questo che “pensano” in base 2. Ogni informazione è una sequenza di 0 e 1, i <b>bit</b>, e un gruppo di 8 bit (<span class="pot">2<sup>3</sup></span>) forma un <b>byte</b>.</p>
<p>La potenza di 2 più vicina a 1000 è <b><span class="pot">2<sup>10</sup></span> = 1024</b>. Per decenni i programmatori hanno chiamato “kilobyte” 1024 byte, “megabyte” 1024 · 1024 = <span class="pot">2<sup>20</sup></span> byte, e così via. Oggi per questi multipli si usano nomi diversi (kibibyte, mebibyte), ma molti programmi continuano a contare in potenze di 2. Ecco perché una chiavetta da “64 GB” sul computer risulta un po' più piccola di quanto ti aspetti!</p>
<p>Con un byte si possono scrivere <span class="pot">2<sup>8</sup></span> = 256 numeri diversi, da 00000000<sub>2</sub> = 0 a 11111111<sub>2</sub> = 255. Per questo i livelli di colore di un'immagine digitale vanno spesso da 0 a 255.</p>
</div>
`},

  { n: 6, id: "p6", titolo: "Le espressioni", html: `
<p>Un'<b>espressione</b> è una sequenza di numeri legati da operazioni, ad esempio <span class="mat">20 − 3 · 4 + <span class="pot">2<sup>3</sup></span></span>. Il risultato finale si chiama <b>valore</b> dell'espressione. Perché tutti ottengano lo stesso valore, bisogna rispettare un ordine preciso.</p>
<div class="regola"><b>Ordine delle operazioni</b>
<ol>
<li>si calcolano le <b>potenze</b>;</li>
<li>si eseguono <b>moltiplicazioni e divisioni</b>, nell'ordine in cui compaiono da sinistra a destra;</li>
<li>si eseguono <b>addizioni e sottrazioni</b>, nell'ordine in cui compaiono da sinistra a destra.</li>
</ol></div>
<div class="esempio"><b>Esempio</b> &emsp; 20 − 3 · 4 + <span class="pot">2<sup>3</sup></span> = 20 − 3 · 4 + 8 = 20 − 12 + 8 = 8 + 8 = 16</div>
<div class="attenzione"><b>Attenzione</b>“Da sinistra a destra” conta davvero. Per esempio 24 : 4 · 2 = 6 · 2 = 12, e non 24 : 8 = 3.</div>

<h3>Le parentesi</h3>
<p>Le parentesi servono a cambiare l'ordine: ciò che è dentro le parentesi si calcola <b>prima</b>. Quando ci sono più livelli si usano le parentesi <b>tonde</b> ( ), poi le <b>quadre</b> [ ] e infine le <b>graffe</b> { }, e si procede dall'interno verso l'esterno. Dentro ogni parentesi vale l'ordine delle operazioni visto sopra.</p>
<div class="anim" data-anim="espressione" data-titolo="Un'espressione risolta passo dopo passo"></div>

<h3>Le espressioni con le lettere</h3>
<p>In un'espressione possiamo usare delle lettere al posto dei numeri, come in <span class="mat">2<i>a</i> + <i>b</i></span>. Le lettere si chiamano <b>variabili</b>: il valore dell'espressione dipende dai numeri che sostituiamo. Con <span class="mat"><i>a</i> = 5</span> e <span class="mat"><i>b</i> = 3</span> si ottiene <span class="mat">2 · 5 + 3 = 13</span>.</p>
<p>Il segno di moltiplicazione tra un numero e una lettera, o tra due lettere, di solito non si scrive. Per esempio <span class="mat">2<i>a</i></span> significa <span class="mat">2 · a</span>.</p>
<p>Le lettere servono anche a <b>tradurre le frasi</b> in simboli, come nella tabella.</p>
<table class="tab"><tr><th>A parole</th><th>Con i simboli</th></tr>
<tr><td>il doppio di <i>a</i></td><td>2<i>a</i></td></tr>
<tr><td>la metà di <i>a</i></td><td><i>a</i> : 2</td></tr>
<tr><td>il successivo di <i>n</i></td><td><i>n</i> + 1</td></tr>
<tr><td>la somma dei quadrati di <i>a</i> e <i>b</i></td><td><span class="pot"><i>a</i><sup>2</sup></span> + <span class="pot"><i>b</i><sup>2</sup></span></td></tr>
<tr><td>il quadrato della somma di <i>a</i> e <i>b</i></td><td><span class="pot">(<i>a</i> + <i>b</i>)<sup>2</sup></span></td></tr></table>
<p>Le ultime due righe sembrano simili ma non lo sono: con <span class="mat"><i>a</i> = 3</span> e <span class="mat"><i>b</i> = 4</span> la prima vale 9 + 16 = 25, la seconda <span class="pot">7<sup>2</sup></span> = 49.</p>

<div class="curiosita" data-img="telefono" data-titolo="Il problema che ha diviso Internet">
<p>Qualche anno fa sui social è diventata virale questa espressione, <b>6 : 2(1 + 2)</b>. Metà delle persone rispondeva 9, l'altra metà 1. E perfino le calcolatrici non erano d'accordo tra loro!</p>
<p>Seguendo le regole che usiamo in questo libro si calcola prima la parentesi (3), poi divisione e moltiplicazione da sinistra a destra, cioè prima 6 : 2 = 3 e poi 3 · 3 = <b>9</b>. Chi risponde 1 considera invece la moltiplicazione “nascosta” 2(1 + 2) come un blocco unico, da calcolare prima.</p>
<p>La morale? Le regole servono proprio a evitare ambiguità. Chi scrive bene un'espressione usa le parentesi per non lasciare dubbi, scrivendo (6 : 2) · (1 + 2) oppure 6 : [2 · (1 + 2)].</p>
</div>
`},

  { n: 7, id: "p7", titolo: "Multipli e divisori", html: `
<div class="definizione"><b>Definizione</b>
Un numero <span class="mat"><i>a</i></span> è <b>multiplo</b> di <span class="mat"><i>b</i></span> se esiste un naturale <span class="mat"><i>k</i></span> tale che <span class="mat"><i>a</i> = <i>b</i> · k</span>. In questo caso si dice anche che <span class="mat"><i>b</i></span> è un <b>divisore</b> di <span class="mat"><i>a</i></span>, o che <span class="mat"><i>a</i></span> è <b>divisibile</b> per <span class="mat"><i>b</i></span> (con <span class="mat"><i>b</i> ≠ 0</span>).</div>
<div class="esempio"><b>Esempio</b> &emsp; 35 = 7 · 5, quindi 35 è multiplo di 7 e di 5; 7 e 5 sono divisori di 35.</div>
<ul>
<li>I multipli di un numero sono <b>infiniti</b>: i multipli di 6 sono 0, 6, 12, 18, 24, …</li>
<li>I divisori di un numero (diverso da 0) sono <b>finiti</b>: i divisori di 12 sono 1, 2, 3, 4, 6, 12.</li>
<li>Ogni numero è multiplo di 1 e di se stesso; lo 0 è multiplo di qualunque numero.</li>
</ul>

<h3>I criteri di divisibilità</h3>
<p>Per sapere se un numero è divisibile per un altro, a volte basta guardarne le cifre.</p>
<table class="tab"><tr><th>Divisibile per</th><th>se…</th><th>Esempio</th></tr>
<tr><td>2</td><td>l'ultima cifra è pari</td><td>1 358</td></tr>
<tr><td>3</td><td>la somma delle cifre è divisibile per 3</td><td>741 (7 + 4 + 1 = 12)</td></tr>
<tr><td>4</td><td>le ultime due cifre formano un multiplo di 4 (oppure sono 00)</td><td>2 316 (16)</td></tr>
<tr><td>5</td><td>l'ultima cifra è 0 o 5</td><td>4 085</td></tr>
<tr><td>9</td><td>la somma delle cifre è divisibile per 9</td><td>5 382 (5 + 3 + 8 + 2 = 18)</td></tr>
<tr><td>10, 100, …</td><td>termina con uno, due, … zeri</td><td>7 300</td></tr>
<tr><td>11</td><td>la differenza tra la somma delle cifre di posto dispari e quella delle cifre di posto pari (contando da destra) è 0 o un multiplo di 11</td><td>2 486 (6 + 4 = 10, 8 + 2 = 10)</td></tr>
<tr><td>25</td><td>le ultime due cifre sono 00, 25, 50 o 75</td><td>3 175</td></tr></table>

<h3>Numeri primi e numeri composti</h3>
<figure class="fig-testo" data-img="piastrelle"><figcaption>24 piastrelle disposte in un rettangolo 6 × 4, quindi 6 e 4 sono divisori di 24.</figcaption></figure><div class="definizione"><b>Definizione</b>
Un numero naturale maggiore di 1 è <b>primo</b> se ha esattamente due divisori, cioè 1 e se stesso. Un numero maggiore di 1 che non è primo si dice <b>composto</b>.</div>
<p>I primi numeri primi sono 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, … Il numero <b>1 non è primo</b> (ha un solo divisore) e <b>2 è l'unico primo pari</b>.</p>
<p>Un modo per “vedere” i divisori: prendi <span class="mat"><i>n</i></span> piastrelle quadrate e prova a disporle in un rettangolo pieno. Ogni rettangolo diverso corrisponde a una coppia di divisori. Un numero primo si può disporre <b>solo in una fila</b>!</p>
<div class="anim" data-anim="rettangoli" data-titolo="Piastrelle e rettangoli: trova i divisori"></div>

<h3>Il crivello di Eratostene</h3>
<p>Il matematico greco Eratostene (III secolo a.C.) inventò un metodo per trovare tutti i numeri primi fino a un certo numero: si scrivono i numeri e si cancellano, uno dopo l'altro, i multipli di 2, di 3, di 5, di 7… I numeri che restano sono i primi.</p>
<div class="anim" data-anim="crivello" data-titolo="Il crivello di Eratostene fino a 100"></div>

<div class="curiosita" data-img="pergamena" data-titolo="I numeri primi finiscono mai?">
<p>No! Lo dimostrò Euclide più di 2300 anni fa con un ragionamento bellissimo. Supponiamo che i primi siano finiti, per esempio solo 2, 3 e 5. Moltiplichiamoli e aggiungiamo 1. Otteniamo 2 · 3 · 5 + 1 = 31. Questo numero, diviso per 2, per 3 o per 5, dà sempre resto 1, quindi non è divisibile per nessuno di loro. Allora o è primo lui stesso, o ha un divisore primo che non era nella lista. In ogni caso la lista era incompleta!</p>
<p>Lo stesso ragionamento funziona con qualunque elenco finito di primi: i numeri primi sono <b>infiniti</b>. Oggi il più grande primo conosciuto ha più di 41 milioni di cifre.</p>
</div>
`},

  { n: 8, id: "p8", titolo: "Il massimo comune divisore e il minimo comune multiplo", html: `
<h3>La scomposizione in fattori primi</h3>
<p>I numeri primi sono i “mattoni” con cui si costruiscono tutti gli altri numeri.</p>
<div class="regola"><b>Teorema fondamentale dell'aritmetica</b>Ogni numero naturale maggiore di 1 si può scrivere come prodotto di fattori primi, e in un solo modo (a parte l'ordine dei fattori).</div>
<p>Per scomporre un numero lo si divide per il più piccolo primo possibile, poi si ripete con il quoziente, finché si arriva a 1.</p>
<div class="esempio"><b>Esempio</b>
<table style="font-family:var(--titoli);font-size:1.1rem;margin:6px 0;border-collapse:collapse">
<tr><td style="text-align:right;padding:0 10px;border-right:2px solid #333">180</td><td style="padding:0 10px">2</td></tr>
<tr><td style="text-align:right;padding:0 10px;border-right:2px solid #333">90</td><td style="padding:0 10px">2</td></tr>
<tr><td style="text-align:right;padding:0 10px;border-right:2px solid #333">45</td><td style="padding:0 10px">3</td></tr>
<tr><td style="text-align:right;padding:0 10px;border-right:2px solid #333">15</td><td style="padding:0 10px">3</td></tr>
<tr><td style="text-align:right;padding:0 10px;border-right:2px solid #333">5</td><td style="padding:0 10px">5</td></tr>
<tr><td style="text-align:right;padding:0 10px;border-right:2px solid #333">1</td><td></td></tr></table>
quindi 180 = <span class="pot">2<sup>2</sup></span> · <span class="pot">3<sup>2</sup></span> · 5</div>

<h3>Il massimo comune divisore (MCD)</h3>
<div class="definizione"><b>Definizione</b>
Il <b>massimo comune divisore</b> di due o più numeri è il più grande tra i loro divisori comuni.</div>
<div class="regola"><b>Regola</b>Il MCD è il prodotto dei soli fattori primi <b>comuni</b>, presi una sola volta con l'esponente <b>minore</b>.</div>
<div class="esempio"><b>Esempio</b> &emsp; 60 = <span class="pot">2<sup>2</sup></span> · 3 · 5 &emsp; 90 = 2 · <span class="pot">3<sup>2</sup></span> · 5 &emsp; MCD(60; 90) = 2 · 3 · 5 = 30</div>
<p>Se il MCD di due numeri è 1, i numeri si dicono <b>primi tra loro</b> (ad esempio 8 e 15).</p>
<p>Il MCD risponde a domande del tipo: <i>qual è la piastrella quadrata più grande con cui posso ricoprire esattamente un pavimento rettangolare?</i></p>
<div class="anim" data-anim="piastrelle" data-titolo="La piastrella più grande: il MCD"></div>

<h3>Il minimo comune multiplo (mcm)</h3>
<figure class="fig-testo" data-img="ingranaggi"><figcaption>Due ruote dentate da 12 e 8 denti tornano nella posizione iniziale dopo mcm(12; 8) = 24 denti.</figcaption></figure><div class="definizione"><b>Definizione</b>
Il <b>minimo comune multiplo</b> di due o più numeri (diversi da 0) è il più piccolo tra i loro multipli comuni diversi da 0.</div>
<div class="regola"><b>Regola</b>Il mcm è il prodotto di tutti i fattori primi, <b>comuni e non comuni</b>, presi una sola volta con l'esponente <b>maggiore</b>.</div>
<div class="esempio"><b>Esempio</b> &emsp; 60 = <span class="pot">2<sup>2</sup></span> · 3 · 5 &emsp; 90 = 2 · <span class="pot">3<sup>2</sup></span> · 5 &emsp; mcm(60; 90) = <span class="pot">2<sup>2</sup></span> · <span class="pot">3<sup>2</sup></span> · 5 = 180</div>
<p>Per due numeri vale sempre una relazione elegante: <span class="mat">MCD(<i>a</i>; <i>b</i>) · mcm(<i>a</i>; <i>b</i>) = <i>a</i> · b</span>. Per esempio, con 60 e 90 si ha MCD = 30, mcm = 180 e 30 · 180 = 5400 = 60 · 90.</p>
<div class="regola"><b>MCD o mcm? Come riconoscerli nei problemi</b>
<ul><li>Si usa il <b>MCD</b> quando bisogna <b>dividere</b> più quantità in parti uguali, le più grandi possibili, senza avanzi (per esempio tagliare due nastri da 60 cm e 90 cm in pezzi uguali e più lunghi possibile, cioè da 30 cm).</li>
<li>Si usa il <b>mcm</b> quando si cerca <b>quando</b> due o più fatti che si ripetono capiteranno di nuovo insieme (per esempio due autobus che partono ogni 60 e ogni 90 minuti ripartono insieme dopo 180 minuti).</li></ul>
Il MCD non supera mai il più piccolo dei numeri, il mcm non è mai minore del più grande.</div>
<p>Il mcm risponde a domande del tipo: <i>due eventi si ripetono ogni tot giorni: quando capiteranno di nuovo insieme?</i></p>

<div class="curiosita" data-img="cicala" data-titolo="Le cicale che contano con i numeri primi">
<p>In Nord America vivono delle cicale (del genere <i>Magicicada</i>) che passano quasi tutta la vita sottoterra e poi escono tutte insieme, a milioni, ogni <b>13</b> o ogni <b>17</b> anni. Due numeri primi: è un caso?</p>
<p>Secondo alcuni biologi no. Supponiamo che un predatore abbia un ciclo di 4 anni. Una cicala con ciclo di 12 anni lo incontrerebbe a ogni uscita (mcm(12; 4) = 12). Una cicala con ciclo di 13 anni lo incontra solo ogni mcm(13; 4) = 52 anni! Con un ciclo primo, le coincidenze con i predatori diventano rarissime.</p>
<p>Prova tu con l'animazione qui sotto: scegli i due cicli e osserva ogni quanto si incontrano.</p>
<div class="anim" data-anim="cicale" data-titolo="Cicale e predatori: ogni quanto si incontrano?"></div>
</div>

<div class="curiosita" data-img="lucchetto" data-titolo="I numeri primi che proteggono i tuoi messaggi">
<p>Moltiplicare due numeri primi è facile, anche se sono enormi. L'operazione inversa, cioè dato il prodotto ritrovare i due fattori, è invece difficilissima: con numeri di centinaia di cifre, anche i computer più potenti impiegherebbero migliaia di anni.</p>
<p>Su questa asimmetria si basa la crittografia <b>RSA</b>, inventata nel 1977, che ancora oggi protegge pagamenti online, messaggi e siti web. Ogni volta che vedi il lucchetto accanto all'indirizzo di un sito, c'è di mezzo la scomposizione in fattori primi.</p>
</div>
`}
  ]
  /* gli esercizi sono nel file esercizi-cap1.js */
};
