/* =====================================================================
   CAPITOLO 3 – I NUMERI RAZIONALI E I NUMERI REALI &emsp; (testi originali)
   File generato da generatori/teoria_cap3.py: per modificare i testi si cambia quel file e lo si rilancia.
   ===================================================================== */
LIBRO.capitoli.cap3 = {
  id: "cap3", anno: 1, numero: 3,
  titolo: "I numeri razionali e i numeri reali",
  sottotitolo: "Parti dell'unità, numeri con la virgola, rapporti e percentuali, e numeri che nessuna frazione può scrivere.",
  pdf: "pdf/capitolo-3-numeri-razionali-reali.pdf",
  storia: `
<p class="storia-domanda">Come si misura una cosa che non è un numero intero di volte l'unità?</p>
<p>Contare le pecore di un gregge richiede solo numeri interi. Ma quando si deve <b>dividere</b> un raccolto fra più famiglie, <b>misurare</b> un campo con una corda che non “ci sta” un numero esatto di volte, o pesare una quantità di grano più piccola dell'unità di peso, i numeri interi non bastano più. Servono le <b>parti</b> dell'unità, cioè le frazioni. Molti secoli dopo, i matematici scoprirono che nemmeno le frazioni bastano a misurare tutto, per esempio la diagonale di un quadrato, e nacquero i numeri reali.</p>
<ol class="linea-tempo">
<li><span class="data">circa 1800 a.C.</span>I <b>Babilonesi</b> scrivono le parti dell'unità in base 60, come facciamo ancora oggi con minuti e secondi. Su una tavoletta d'argilla (detta YBC 7289) compare il valore della diagonale di un quadrato di lato 1 con un errore inferiore a un milionesimo.</li>
<li><span class="data">circa 1650 a.C.</span>In <b>Egitto</b> lo scriba <b>Ahmes</b> copia il cosiddetto <i>papiro di Rhind</i>, che contiene problemi di divisione del pane e della birra. Gli Egizi scrivevano le frazioni come somme di frazioni con numeratore 1.</li>
<li><span class="data">V secolo a.C.</span>Nella scuola di <b>Pitagora</b> si scopre che il lato e la diagonale di un quadrato sono <b>incommensurabili</b>, cioè non esiste un'unità di misura che stia un numero intero di volte in entrambi. È la prima traccia dei numeri irrazionali.</li>
<li><span class="data">circa 300 a.C.</span>Negli <i>Elementi</i> di <b>Euclide</b> c'è una teoria delle <b>proporzioni</b>, attribuita a <b>Eudosso</b>, che permette di confrontare grandezze anche incommensurabili.</li>
<li><span class="data">III secolo a.C.</span><b>Archimede</b> dimostra che π è compreso fra 3 + <span class="fr"><span>10</span><span>71</span></span> e 3 + <span class="fr"><span>1</span><span>7</span></span>, cioè fra circa 3,1408 e 3,1429.</li>
<li><span class="data">628</span>L'indiano <b>Brahmagupta</b> scrive le regole per operare con le frazioni, anche con quelle che rappresentano debiti.</li>
<li><span class="data">1202</span><b>Leonardo Fibonacci</b> nel <i>Liber abaci</i> diffonde in Europa la linea di frazione, appresa dai matematici arabi, e moltissimi problemi di commercio con frazioni e proporzioni.</li>
<li><span class="data">1585</span>Il fiammingo <b>Simon Stevin</b> pubblica <i>De Thiende</i> (“La decima”), un libretto che insegna a usare le frazioni decimali per tutti i calcoli di mercanti, geometri e soldati.</li>
<li><span class="data">inizio del XVII secolo</span>Con le tavole dei logaritmi di <b>John Napier</b> si diffonde l'uso della <b>virgola</b> (o del punto) per separare la parte intera da quella decimale.</li>
<li><span class="data">1872</span><b>Richard Dedekind</b> e <b>Georg Cantor</b> danno una costruzione rigorosa dei <b>numeri reali</b>, che riempiono tutti i punti della retta.</li>
<li><span class="data">1895</span><b>Giuseppe Peano</b> usa la lettera Q, iniziale di “quoziente”, per i numeri razionali. Da qui viene il simbolo <b>ℚ</b>.</li>
</ol>
<p class="storia-capitolo"><b>In questo capitolo</b> passiamo dalle frazioni ai numeri razionali, li rappresentiamo sulla retta e impariamo a confrontarli e a calcolare con loro, anche con le potenze a esponente negativo. Vedremo che ogni numero razionale si scrive come decimale finito o periodico, e che esistono numeri, come <span class="rad">√<span class="radv">2</span></span> e π, che non sono razionali. Infine useremo frazioni e decimali per risolvere problemi con proporzioni e percentuali, per approssimare i numeri valutando l'errore e per scrivere in notazione scientifica numeri molto grandi o molto piccoli.</p>
`,
  sintesi: `
<div class="sint-blocco"><h3><span>1</span>Dalle frazioni ai numeri razionali</h3>
<p>Una <b>frazione</b> <span class="fr"><span>a</span><span><i>b</i></span></span> è una coppia ordinata di numeri naturali con <span class="mat"><i>b</i> ≠ 0</span>. È <b>propria</b> se <span class="mat"><i>a</i> &lt; <i>b</i></span>, <b>impropria</b> se <span class="mat"><i>a</i> &gt; <i>b</i></span> e non è apparente, <b>apparente</b> se <span class="mat"><i>a</i></span> è multiplo di <span class="mat"><i>b</i></span>.</p>
<p><b>Equivalenti</b>. <span class="fr"><span>a</span><span><i>b</i></span></span> ∼ <span class="fr"><span><i>c</i></span><span><i>d</i></span></span> se e solo se <span class="mat"><i>a</i> · <i>d</i> = <i>b</i> · <i>c</i></span> (prodotti in croce). Per esempio <span class="fr"><span>6</span><span>8</span></span> ∼ <span class="fr"><span>9</span><span>12</span></span> perché 6 · 12 = 8 · 9 = 72.</p>
<p><b>Proprietà invariantiva</b>. Moltiplicando o dividendo numeratore e denominatore per uno stesso numero diverso da 0 si ottiene una frazione equivalente. Una frazione è <b>ridotta ai minimi termini</b> se numeratore e denominatore sono primi fra loro; per ridurla si dividono entrambi per il loro MCD.</p>
<p>Un <b>numero razionale</b> è una classe di frazioni equivalenti (con numeratore e denominatore interi); si rappresenta con la frazione ridotta ai minimi termini. L'insieme dei razionali è <span class="mat">ℚ</span>; vale <span class="mat">ℕ ⊂ ℤ ⊂ ℚ</span>.</p></div>

<div class="sint-blocco"><h3><span>2</span>Rappresentazione e confronto</h3>
<p>Per rappresentare <span class="fr"><span>a</span><span><i>b</i></span></span> sulla retta si divide l'unità in <span class="mat"><i>b</i></span> parti uguali e se ne contano <span class="mat">a</span>, verso destra se il numero è positivo, verso sinistra se è negativo.</p>
<p><b>Confronto</b>. Si riducono le frazioni allo stesso denominatore positivo; è maggiore quella con numeratore maggiore. Fra due frazioni positive, <span class="fr"><span>a</span><span><i>b</i></span></span> &lt; <span class="fr"><span><i>c</i></span><span><i>d</i></span></span> se <span class="mat"><i>a</i> · <i>d</i> &lt; <i>b</i> · c</span>.</p>
<div class="esempio"><b>Esempio</b><span class="fr"><span>5</span><span>6</span></span> &gt; <span class="fr"><span>7</span><span>9</span></span> perché 5 · 9 = 45 &gt; 6 · 7 = 42.</div>
<p>ℚ è <b>denso</b>, cioè fra due razionali diversi ce n'è sempre un altro (per esempio la loro media).</p></div>

<div class="sint-blocco"><h3><span>3</span>Le operazioni in ℚ</h3>
<ul class="sint-lista">
<li><span class="mat"><span class="fr"><span>a</span><span><i>b</i></span></span> ± <span class="fr"><span><i>c</i></span><span><i>b</i></span></span> = <span class="fr"><span><i>a</i> ± <i>c</i></span><span><i>b</i></span></span></span><span class="nota">con denominatori diversi si riducono prima al minimo denominatore comune</span></li>
<li><span class="mat"><span class="fr"><span>a</span><span><i>b</i></span></span> · <span class="fr"><span><i>c</i></span><span><i>d</i></span></span> = <span class="fr"><span><i>a</i> · <i>c</i></span><span><i>b</i> · <i>d</i></span></span></span><span class="nota">conviene semplificare “in croce” prima di moltiplicare</span></li>
<li><span class="mat"><span class="fr"><span>a</span><span><i>b</i></span></span> : <span class="fr"><span><i>c</i></span><span><i>d</i></span></span> = <span class="fr"><span><i>a</i></span><span><i>b</i></span></span> · <span class="fr"><span><i>d</i></span><span><i>c</i></span></span></span><span class="nota">si moltiplica per il <b>reciproco</b> del divisore (<i>c</i> ≠ 0)</span></li>
<li><span class="mat"><span class="gp gt"><span class="gpL"></span><span class="gpC"><span class="fr"><span>a</span><span><i>b</i></span></span></span><span class="gpR"></span></span><sup><i>n</i></sup> = <span class="fr"><span><i>a</i><sup><i>n</i></sup></span><span><i>b</i><sup><i>n</i></sup></span></span></span><span class="nota">valgono le cinque proprietà delle potenze</span></li>
</ul>
<p>Il prodotto di un numero per il suo reciproco è 1; lo 0 non ha reciproco. In ℚ (escluso lo 0 come divisore) addizione, sottrazione, moltiplicazione e divisione sono sempre possibili.</p></div>

<div class="sint-blocco"><h3><span>4</span>Le potenze con esponente intero negativo</h3>
<p class="formula"><span class="gp gt"><span class="gpL"></span><span class="gpC"><span class="fr"><span>a</span><span><i>b</i></span></span></span><span class="gpR"></span></span><sup>−<i>n</i></sup> = <span class="gp gt"><span class="gpL"></span><span class="gpC"><span class="fr"><span><i>b</i></span><span><i>a</i></span></span></span><span class="gpR"></span></span><sup><i>n</i></sup> &emsp; con <i>a</i> ≠ 0, <i>b</i> ≠ 0</p>
<div class="esempio"><b>Esempio</b><span class="gp gt"><span class="gpL"></span><span class="gpC"><span class="fr"><span>2</span><span>5</span></span></span><span class="gpR"></span></span><sup>−2</sup> = <span class="gp gt"><span class="gpL"></span><span class="gpC"><span class="fr"><span>5</span><span>2</span></span></span><span class="gpR"></span></span><sup>2</sup> = <span class="fr"><span>25</span><span>4</span></span><br>(−3)<sup>−2</sup> = <span class="gp gt"><span class="gpL"></span><span class="gpC">−<span class="fr"><span>1</span><span>3</span></span></span><span class="gpR"></span></span><sup>2</sup> = <span class="fr"><span>1</span><span>9</span></span><br>2<sup>−1</sup> = <span class="fr"><span>1</span><span>2</span></span></div>
<p>0 elevato a un esponente negativo o nullo non ha significato.</p></div>

<div class="sint-blocco"><h3><span>5</span>I numeri razionali e i numeri decimali</h3>
<table class="tab"><tr><th>Denominatore della frazione ridotta</th><th>Numero decimale</th><th>Esempio</th></tr>
<tr><td>solo fattori 2 e 5</td><td>finito</td><td><span class="fr"><span>7</span><span>8</span></span> = 0,875</td></tr>
<tr><td>nessun fattore 2 o 5</td><td>periodico semplice</td><td><span class="fr"><span>5</span><span>11</span></span> = 0,<span class="per">45</span></td></tr>
<tr><td>fattori 2 o 5 e altri fattori</td><td>periodico misto</td><td><span class="fr"><span>7</span><span>12</span></span> = 0,58<span class="per">3</span></td></tr></table>
<p><b>Frazione generatrice</b> di un periodico. Al numeratore il numero senza virgola meno il numero formato dalle cifre prima del periodo; al denominatore tanti 9 quante sono le cifre del periodo, seguiti da tanti 0 quante sono le cifre dell'antiperiodo. Per esempio 0,4<span class="per">5</span> = <span class="fr"><span>45 − 4</span><span>90</span></span> = <span class="fr"><span>41</span><span>90</span></span>.</p></div>

<div class="sint-blocco"><h3><span>6</span>I numeri reali</h3>
<p>Un numero <b>irrazionale</b> non si può scrivere come frazione; la sua scrittura decimale è illimitata e non periodica. Sono irrazionali, per esempio, <span class="rad">√<span class="radv">2</span></span>, <span class="rad">√<span class="radv">3</span></span>, <span class="rad">√<span class="radv">5</span></span> e π. Razionali e irrazionali formano l'insieme dei numeri <b>reali</b> <span class="mat">ℝ</span>, che corrisponde a tutti i punti della retta.</p>
<p class="formula">ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ</p></div>

<div class="sint-blocco"><h3><span>7</span>Le frazioni e le proporzioni</h3>
<p>Una <b>proporzione</b> <span class="mat"><i>a</i> : <i>b</i> = <i>c</i> : <i>d</i></span> è l'uguaglianza di due rapporti; <span class="mat"><i>a</i></span> e <span class="mat"><i>d</i></span> sono gli <b>estremi</b>, <span class="mat"><i>b</i></span> e <span class="mat"><i>c</i></span> i <b>medi</b>.</p>
<ul class="sint-lista">
<li><span class="mat"><i>b</i> · <i>c</i> = <i>a</i> · <i>d</i></span><span class="nota">proprietà <b>fondamentale</b></span></li>
<li><span class="mat">(<i>a</i> + <i>b</i>) : <i>a</i> = (<i>c</i> + <i>d</i>) : <i>c</i></span><span class="nota">proprietà del <b>comporre</b> (anche con <i>b</i> e <i>d</i> al posto di <i>a</i> e <i>c</i>)</span></li>
<li><span class="mat">(<i>a</i> − <i>b</i>) : <i>a</i> = (<i>c</i> − <i>d</i>) : <i>c</i></span><span class="nota">proprietà dello <b>scomporre</b></span></li>
<li><span class="mat"><i>a</i> : <i>c</i> = <i>b</i> : <i>d</i></span><span class="nota">proprietà del <b>permutare</b> (i medi o gli estremi)</span></li>
<li><span class="mat"><i>b</i> : <i>a</i> = <i>d</i> : <i>c</i></span><span class="nota">proprietà dell'<b>invertire</b></span></li>
</ul>
<p>Il <b>medio proporzionale</b> fra <span class="mat"><i>a</i></span> e <span class="mat"><i>b</i></span> è il numero positivo <span class="mat"><i>x</i></span> con <span class="mat"><i>a</i> : <i>x</i> = <i>x</i> : <i>b</i></span>, cioè <span class="mat"><i>x</i><sup>2</sup> = <i>a</i> · b</span>.</p></div>

<div class="sint-blocco"><h3><span>8</span>Le percentuali</h3>
<p class="formula"><i>x</i>% = <span class="fr"><span><i>x</i></span><span>100</span></span> &emsp; x‰ = <span class="fr"><span><i>x</i></span><span>1000</span></span></p>
<div class="esempio"><b>Esempio</b>Il 15% di 260 è <span class="fr"><span>15</span><span>100</span></span> · 260 = 39<br><span class="fr"><span>3</span><span>8</span></span> = <span class="fr"><span>37,5</span><span>100</span></span> = 37,5%</div>
<p>Un aumento del <span class="mat"><i>p</i>%</span> si ottiene moltiplicando per <span class="fr"><span>100 + <i>p</i></span><span>100</span></span>, uno sconto del <span class="mat"><i>p</i>%</span> moltiplicando per <span class="fr"><span>100 − <i>p</i></span><span>100</span></span>. Aumenti e sconti successivi si moltiplicano, non si sommano.</p></div>

<div class="sint-blocco"><h3><span>9</span>Il calcolo approssimato</h3>
<p><b>Arrotondamento</b>. Se la prima cifra trascurata è 5 o più si aumenta di 1 l'ultima cifra tenuta (approssimazione per eccesso), altrimenti la si lascia (per difetto). Per esempio 12,3486 ≈ 12,35 a meno di 10<sup>−2</sup>.</p>
<ul class="sint-lista">
<li><span class="mat"><i>e</i><sub>a</sub> = |<i>q</i> − <i>a</i>|</span><span class="nota"><b>errore assoluto</b> (<i>q</i> numero, a valore approssimato)</span></li>
<li><span class="mat"><i>e</i><sub>r</sub> = <span class="fr"><span><i>e</i><sub>a</sub></span><span><span class="mat">|a|</span></span></span></span><span class="nota"><b>errore relativo</b>, spesso espresso in percentuale</span></li>
</ul>
<p>Fra due misure è più precisa quella con l'errore relativo minore.</p></div>

<div class="sint-blocco"><h3><span>10</span>Notazione scientifica e ordine di grandezza</h3>
<p class="formula"><i>q</i> = <i>d</i> · 10<sup><i>n</i></sup> &emsp; con 1 ≤ <i>d</i> &lt; 10 e <i>n</i> ∈ ℤ</p>
<div class="esempio"><b>Esempio</b>4 560 000 = 4,56 · 10<sup>6</sup><br>0,00072 = 7,2 · 10<sup>−4</sup></div>
<p>L'<b>ordine di grandezza</b> è la potenza di 10 più vicina al numero. Per <span class="mat"><i>d</i> · 10<sup><i>n</i></sup></span> è 10<sup><i>n</i></sup> se <span class="mat"><i>d</i> &lt; 5,5</span>, 10<sup><i>n</i>+1</sup> se <span class="mat"><i>d</i> ≥ 5,5</span> (5,5 è a metà strada fra 1 e 10).</p></div>
`,
  paragrafi: [
  { n: 1, id: "p1", titolo: "Dalle frazioni ai numeri razionali", html: `
<figure class="fig-testo" data-img="torta"><figcaption>Una torta tagliata in 8 fette uguali, di cui 3 colorate. La parte colorata è <span class="fr"><span>3</span><span>8</span></span> della torta.</figcaption></figure>
<p>Tre amici vogliono dividersi in parti uguali due pizze. Ognuno non può avere una pizza intera, ma se tagliamo ciascuna pizza in 3 spicchi uguali, ogni amico riceve 2 spicchi, cioè <b>due terzi</b> di pizza. Scriviamo questa quantità come <span class="fr"><span>2</span><span>3</span></span>. Il 3 dice in quante parti uguali abbiamo diviso l'intero, il 2 quante di quelle parti prendiamo.</p>

<h3>Le frazioni</h3>
<div class="definizione"><b>Definizione</b>
Una <b>frazione</b> è una coppia ordinata di numeri naturali <span class="mat"><i>a</i></span> e <span class="mat"><i>b</i></span>, con <span class="mat"><i>b</i> ≠ 0</span>, che si scrive <span class="fr"><span>a</span><span><i>b</i></span></span>. Il numero <span class="mat">a</span> sopra la linea di frazione è il <b>numeratore</b>, il numero <span class="mat"><i>b</i></span> sotto è il <b>denominatore</b>.</div>
<p>Una frazione indica anche una divisione, cioè <span class="fr"><span>a</span><span><i>b</i></span></span> = <span class="mat"><i>a</i> : b</span>. Per questo il denominatore non può essere 0. Scritture come <span class="fr"><span>5</span><span>0</span></span> o <span class="fr"><span>0</span><span>0</span></span> non sono frazioni.</p>
<p>Per calcolare una frazione di una quantità si divide la quantità per il denominatore e si moltiplica il risultato per il numeratore.</p>
<div class="esempio"><b>Esempio</b>i <span class="fr"><span>5</span><span>8</span></span> di 72 kg sono (72 : 8) · 5 = 9 · 5 = 45 kg.</div>
<div class="definizione"><b>Definizione</b>
Una frazione <span class="fr"><span>a</span><span><i>b</i></span></span> è
<ul><li><b>propria</b> se <span class="mat"><i>a</i> &lt; <i>b</i></span>, come <span class="fr"><span>4</span><span>9</span></span> (indica meno di un intero);</li>
<li><b>apparente</b> se <span class="mat"><i>a</i></span> è multiplo di <span class="mat"><i>b</i></span>, come <span class="fr"><span>12</span><span>4</span></span> = 3 (indica un numero intero di interi);</li>
<li><b>impropria</b> se <span class="mat"><i>a</i> &gt; <i>b</i></span> e <span class="mat"><i>a</i></span> non è multiplo di <span class="mat"><i>b</i></span>, come <span class="fr"><span>11</span><span>4</span></span> (indica più di un intero).</li></ul></div>
<div class="anim" data-anim="frazione" data-titolo="Che cosa indica una frazione"></div>

<h3>Le frazioni equivalenti</h3>
<p>Mezza pizza è la stessa quantità di due quarti o di quattro ottavi. Frazioni diverse possono quindi indicare la stessa parte dell'intero.</p>
<div class="definizione"><b>Definizione</b>
Due frazioni <span class="fr"><span>a</span><span><i>b</i></span></span> e <span class="fr"><span><i>c</i></span><span><i>d</i></span></span> sono <b>equivalenti</b>, e si scrive <span class="fr"><span>a</span><span><i>b</i></span></span> ∼ <span class="fr"><span><i>c</i></span><span><i>d</i></span></span>, se e solo se <span class="mat"><i>a</i> · <i>d</i> = <i>b</i> · c</span>. I due prodotti si chiamano <b>prodotti in croce</b>.</div>
<div class="esempio"><b>Esempio</b><span class="fr"><span>21</span><span>28</span></span> ∼ <span class="fr"><span>30</span><span>40</span></span> perché 21 · 40 = 840 e 28 · 30 = 840.<br>Invece <span class="fr"><span>4</span><span>7</span></span> e <span class="fr"><span>5</span><span>9</span></span> non sono equivalenti perché 4 · 9 = 36 e 7 · 5 = 35.</div>

<h3>La proprietà invariantiva</h3>
<div class="regola"><b>Proprietà invariantiva</b>
Se si moltiplicano, o si dividono, il numeratore e il denominatore di una frazione per uno stesso numero naturale diverso da 0, si ottiene una frazione equivalente.
<p class="formula"><span class="fr"><span>a</span><span><i>b</i></span></span> ∼ <span class="fr"><span><i>a</i> · <i>k</i></span><span><i>b</i> · <i>k</i></span></span> &emsp; <span class="fr"><span>a</span><span><i>b</i></span></span> ∼ <span class="fr"><span><i>a</i> : <i>k</i></span><span><i>b</i> : <i>k</i></span></span> &emsp; (<i>k</i> ≠ 0, divisore di a e di <i>b</i> nel secondo caso)</p></div>
<p>La proprietà si dimostra con i prodotti in croce. Infatti <span class="mat"><i>a</i> · (<i>b</i> · <i>k</i>) = <i>b</i> · (<i>a</i> · <i>k</i>)</span> per le proprietà commutativa e associativa della moltiplicazione. Da una frazione si possono quindi ottenere <b>infinite</b> frazioni equivalenti, come <span class="fr"><span>3</span><span>5</span></span> ∼ <span class="fr"><span>6</span><span>10</span></span> ∼ <span class="fr"><span>9</span><span>15</span></span> ∼ <span class="fr"><span>12</span><span>20</span></span> ∼ ….</p>
<div class="anim" data-anim="equivalenti" data-titolo="Frazioni equivalenti"></div>

<h3>La semplificazione delle frazioni</h3>
<div class="definizione"><b>Definizione</b>
Una frazione è <b>ridotta ai minimi termini</b> (o <b>irriducibile</b>) se il numeratore e il denominatore sono primi fra loro, cioè il loro unico divisore comune è 1 (MCD = 1).</div>
<p><b>Semplificare</b> una frazione vuol dire dividere il numeratore e il denominatore per uno <b>stesso</b> numero che sia divisore di entrambi. Per la proprietà invariantiva la frazione che si ottiene è equivalente a quella di partenza, cioè indica la stessa quantità con numeri più piccoli. Quando si semplifica si usa <b>barrare</b> il numero e scrivere accanto, in piccolo, il risultato della divisione: per esempio <span class="mat"><span class="fr"><span><span class="canc" data-n="4">12</span></span><span><span class="canc giu" data-n="5">15</span></span></span></span> vuol dire che 12 e 15 sono stati divisi entrambi per 3.</p>
<p>Ci sono due modi di procedere. Li vediamo sulla stessa frazione, <span class="fr"><span>36</span><span>48</span></span>.</p>
<p><b>1° modo · per passi successivi.</b> Si cerca un divisore comune facile (2, 3, 5, …), si divide, e si ripete finché è possibile.</p>
<ol class="passaggi">
<li>36 e 48 sono entrambi <b>pari</b>, quindi si possono dividere per <span class="c1">2</span>. 36 : <span class="c1">2</span> = 18 e 48 : <span class="c1">2</span> = 24. &emsp; <span class="nw"><span class="fr"><span><span class="canc" data-n="18">36</span></span><span><span class="canc giu" data-n="24">48</span></span></span> = <span class="fr"><span>18</span><span>24</span></span></span></li>
<li>18 e 24 sono ancora pari, quindi si dividono di nuovo per <span class="c1">2</span>. 18 : <span class="c1">2</span> = 9 e 24 : <span class="c1">2</span> = 12. &emsp; <span class="nw"><span class="fr"><span><span class="canc" data-n="9">18</span></span><span><span class="canc giu" data-n="12">24</span></span></span> = <span class="fr"><span>9</span><span>12</span></span></span></li>
<li>9 non è pari, ma la somma delle cifre di 9 e di 12 (cioè 9 e 1 + 2 = 3) è divisibile per 3, quindi entrambi sono divisibili per <span class="c2">3</span>. 9 : <span class="c2">3</span> = 3 e 12 : <span class="c2">3</span> = 4. &emsp; <span class="nw"><span class="fr"><span><span class="canc" data-n="3">9</span></span><span><span class="canc giu" data-n="4">12</span></span></span> = <span class="fr"><span>3</span><span>4</span></span></span></li>
<li>3 e 4 non hanno divisori comuni diversi da 1, quindi ci si ferma. <span class="perche">In tutto abbiamo diviso per 2 · 2 · 3 = 12.</span></li>
</ol>
<p><b>2° modo · con il MCD.</b> Si divide una volta sola per il <b>massimo comune divisore</b> di numeratore e denominatore, e si arriva subito alla frazione ridotta.</p>
<ol class="passaggi">
<li>Si scompongono in fattori primi i due numeri. &emsp; 36 = <span class="c1">2<sup>2</sup></span> · <span class="c2">3</span><sup>2</sup> &emsp; <span class="nw">48 = 2<sup>4</sup> · 3</span></li>
<li>Il MCD è il prodotto dei fattori <b>comuni</b>, presi con l'esponente <b>minore</b>. &emsp; <span class="nw">MCD(36; 48) = <span class="c1">2<sup>2</sup></span> · <span class="c2">3</span> = <span class="c3">12</span></span></li>
<li>Si dividono numeratore e denominatore per il MCD. &emsp; <span class="nw"><span class="fr"><span>36 : <span class="c3">12</span></span><span>48 : <span class="c3">12</span></span></span> = <span class="fr"><span>3</span><span>4</span></span></span></li>
</ol>
<p><b>Con i fattori primi.</b> Lo stesso calcolo si può vedere scrivendo i due numeri come prodotti di fattori primi e barrando i fattori uguali che compaiono sopra e sotto (ogni coppia barrata vale 1, perché <span class="fr"><span>2</span><span>2</span></span> = 1 e <span class="fr"><span>3</span><span>3</span></span> = 1).</p>
<p class="formula"><span class="fr"><span>36</span><span>48</span></span> = <span class="fr"><span><span class="canc" data-n="1"><span class="c1">2</span></span> · <span class="canc" data-n="1"><span class="c1">2</span></span> · <span class="canc" data-n="1"><span class="c2">3</span></span> · 3</span><span><span class="canc giu" data-n="1"><span class="c1">2</span></span> · <span class="canc giu" data-n="1"><span class="c1">2</span></span> · 2 · 2 · <span class="canc giu" data-n="1"><span class="c2">3</span></span></span></span> = <span class="fr"><span>3</span><span>2 · 2</span></span> = <span class="fr"><span>3</span><span>4</span></span></p>
<div class="esempio"><b>Esempio</b><span class="fr"><span>84</span><span>126</span></span>. Scomponiamo, 84 = 2<sup>2</sup> · 3 · 7 e 126 = 2 · 3<sup>2</sup> · 7. I fattori comuni con l'esponente minore sono 2, 3 e 7, quindi MCD = 2 · 3 · 7 = 42. Allora <span class="fr"><span>84 : 42</span><span>126 : 42</span></span> = <span class="fr"><span>2</span><span>3</span></span>. Controllo, 2 e 3 sono primi fra loro.</div>
<div class="attenzione"><b>Attenzione</b>Si possono semplificare solo i <b>fattori</b> (numeri che moltiplicano), mai gli <b>addendi</b>. Per esempio in <span class="fr"><span>6 + 4</span><span>6</span></span> non si può barrare il 6, perché <span class="fr"><span>6 + 4</span><span>6</span></span> = <span class="fr"><span>10</span><span>6</span></span> = <span class="fr"><span>5</span><span>3</span></span>, mentre barrando il 6 si otterrebbe 4, che è sbagliato. Prima si calcola la somma, poi si semplifica.</div>

<h3>La riduzione allo stesso denominatore</h3>
<p>Per confrontare o sommare frazioni conviene trasformarle in frazioni equivalenti con lo <b>stesso denominatore</b>. Un denominatore comune deve essere un <b>multiplo</b> di tutti i denominatori, perché ogni denominatore va moltiplicato per qualcosa per arrivarci. Fra tutti i multipli comuni si sceglie il più piccolo, cioè il <b>mcm dei denominatori</b>: si chiama <b>minimo comune denominatore</b>, e con esso i numeri restano i più piccoli possibile.</p>
<div class="regola"><b>Regola · Come ridurre allo stesso denominatore</b>
<ol>
<li>Se possibile, si semplifica ciascuna frazione.</li>
<li>Si calcola il <b>mcm dei denominatori</b>: sarà il nuovo denominatore di tutte le frazioni.</li>
<li>Per ogni frazione si cerca il <b>fattore</b> per cui moltiplicare il denominatore per ottenere il mcm. Questo fattore si trova con una divisione: <span class="mat">fattore = mcm : denominatore</span>.</li>
<li>Per la proprietà invariantiva si moltiplicano per quel fattore <b>sia il denominatore sia il numeratore</b>. Il denominatore diventa il mcm, il numeratore diventa <span class="mat">fattore · numeratore</span>.</li>
</ol>
In breve, il nuovo numeratore di ogni frazione è <span class="mat">(mcm : denominatore) · numeratore</span>.</div>
<p>Vediamo i passaggi uno per uno con le frazioni <span class="fr"><span>5</span><span>6</span></span>, <span class="fr"><span>4</span><span>15</span></span> e <span class="fr"><span>7</span><span>10</span></span>.</p>
<ol class="passaggi">
<li><b>Le frazioni sono già ridotte?</b> Sì, 5 e 6, 4 e 15, 7 e 10 sono primi fra loro.</li>
<li><b>Calcoliamo il mcm dei denominatori.</b> 6 = 2 · 3, 15 = 3 · 5, 10 = 2 · 5. Il mcm è il prodotto di tutti i fattori, comuni e non comuni, con l'esponente maggiore. &emsp; <span class="nw">mcm(6; 15; 10) = 2 · 3 · 5 = <span class="c1">30</span></span></li>
<li><b>Prima frazione, <span class="fr"><span>5</span><span>6</span></span>.</b> Il fattore è <span class="c1">30</span> : 6 = <span class="c2">5</span>, infatti 6 · <span class="c2">5</span> = 30. Moltiplichiamo per <span class="c2">5</span> il numeratore e il denominatore. &emsp; <span class="nw"><span class="fr"><span>5</span><span>6</span></span> = <span class="fr"><span>5 · <span class="c2">5</span></span><span>6 · <span class="c2">5</span></span></span> = <span class="fr"><span>25</span><span><span class="c1">30</span></span></span></span></li>
<li><b>Seconda frazione, <span class="fr"><span>4</span><span>15</span></span>.</b> Il fattore è <span class="c1">30</span> : 15 = <span class="c3">2</span>. &emsp; <span class="nw"><span class="fr"><span>4</span><span>15</span></span> = <span class="fr"><span>4 · <span class="c3">2</span></span><span>15 · <span class="c3">2</span></span></span> = <span class="fr"><span>8</span><span><span class="c1">30</span></span></span></span></li>
<li><b>Terza frazione, <span class="fr"><span>7</span><span>10</span></span>.</b> Il fattore è <span class="c1">30</span> : 10 = <span class="c4">3</span>. &emsp; <span class="nw"><span class="fr"><span>7</span><span>10</span></span> = <span class="fr"><span>7 · <span class="c4">3</span></span><span>10 · <span class="c4">3</span></span></span> = <span class="fr"><span>21</span><span><span class="c1">30</span></span></span></span></li>
<li><b>Controllo.</b> Semplificando le nuove frazioni si deve tornare a quelle iniziali, per esempio <span class="fr"><span><span class="canc" data-n="5">25</span></span><span><span class="canc giu" data-n="6">30</span></span></span> = <span class="fr"><span>5</span><span>6</span></span> dividendo per 5.</li>
</ol>
<p>Le tre frazioni, ridotte al minimo comune denominatore, sono <span class="fr"><span>25</span><span>30</span></span>, <span class="fr"><span>8</span><span>30</span></span> e <span class="fr"><span>21</span><span>30</span></span>.</p>
<div class="attenzione"><b>Attenzione</b>Anche il prodotto dei denominatori, 6 · 15 · 10 = 900, è un denominatore comune, ma i numeri diventano inutilmente grandi <span class="gp gt"><span class="gpL"></span><span class="gpC"><span class="fr"><span>750</span><span>900</span></span>, <span class="fr"><span>240</span><span>900</span></span>, <span class="fr"><span>630</span><span>900</span></span></span><span class="gpR"></span></span> e alla fine bisogna semplificare di più. Per questo si usa il mcm. Se un denominatore è multiplo di tutti gli altri, il mcm è proprio quel denominatore: per <span class="fr"><span>1</span><span>4</span></span> e <span class="fr"><span>3</span><span>8</span></span> il mcm è 8 e basta trasformare <span class="fr"><span>1</span><span>4</span></span> in <span class="fr"><span>1 · 2</span><span>4 · 2</span></span> = <span class="fr"><span>2</span><span>8</span></span>.</div>

<h3>I numeri razionali</h3>
<p>Le frazioni <span class="fr"><span>2</span><span>3</span></span>, <span class="fr"><span>4</span><span>6</span></span>, <span class="fr"><span>6</span><span>9</span></span>, <span class="fr"><span>8</span><span>12</span></span>, … indicano tutte la stessa quantità. Le raccogliamo in un unico insieme, detto <b>classe di equivalenza</b>. Ogni frazione appartiene a una e una sola classe.</p>
<div class="definizione"><b>Definizione</b>
Un <b>numero razionale assoluto</b> è una classe di frazioni equivalenti. Come suo rappresentante si sceglie di solito la frazione ridotta ai minimi termini.</div>
<p>Quando due frazioni rappresentano lo stesso numero razionale scriviamo semplicemente il segno di uguaglianza, come <span class="fr"><span>4</span><span>6</span></span> = <span class="fr"><span>2</span><span>3</span></span>.</p>
<p>Come abbiamo ampliato ℕ in ℤ aggiungendo i numeri negativi, possiamo considerare frazioni con numeratore e denominatore <b>interi</b> (denominatore diverso da 0), come −<span class="fr"><span>3</span><span>5</span></span> o <span class="fr"><span>4</span><span>−9</span></span>. Per il segno si usa la regola del prodotto dei segni, perché la frazione indica un quoziente. Per esempio <span class="fr"><span>−6</span><span>−7</span></span> = <span class="fr"><span>6</span><span>7</span></span> e <span class="fr"><span>5</span><span>−8</span></span> = −<span class="fr"><span>5</span><span>8</span></span>.</p>
<div class="definizione"><b>Definizione</b>
Un <b>numero razionale</b> è una classe di frazioni equivalenti con numeratore e denominatore interi (denominatore diverso da 0). L'insieme dei numeri razionali si indica con <span class="mat">ℚ</span>; i razionali positivi formano <span class="mat">ℚ<sup>+</sup></span>, quelli negativi <span class="mat">ℚ<sup>−</sup></span>.</div>
<p>Ogni intero <span class="mat"><i>n</i></span> è il razionale <span class="fr"><span><i>n</i></span><span>1</span></span>, per esempio −4 = −<span class="fr"><span>4</span><span>1</span></span> = −<span class="fr"><span>8</span><span>2</span></span>. Quindi <span class="mat">ℕ ⊂ ℤ ⊂ ℚ</span>. Le frazioni con numeratore 0 rappresentano lo zero, come <span class="fr"><span>0</span><span>7</span></span> = 0.</p>
<p>Come in ℤ, due razionali diversi da 0 sono <b>concordi</b> se hanno lo stesso segno e <b>discordi</b> se hanno segno diverso; <span class="fr"><span>3</span><span>4</span></span> e −<span class="fr"><span>3</span><span>4</span></span> sono <b>opposti</b>. Il <b>valore assoluto</b> è il numero senza segno, come <span class="gp gb"><span class="gpL"></span><span class="gpC">−<span class="fr"><span>5</span><span>2</span></span></span><span class="gpR"></span></span> = <span class="fr"><span>5</span><span>2</span></span>.</p>

<div class="curiosita" data-img="egizi" data-titolo="Le frazioni degli Egizi">
<p>Nell'antico Egitto le frazioni si scrivevano quasi sempre con numeratore 1, sotto il segno di una bocca aperta. Facevano eccezione <span class="fr"><span>2</span><span>3</span></span> e pochi altri casi. Per indicare <span class="fr"><span>2</span><span>5</span></span> uno scriba scriveva <span class="fr"><span>1</span><span>3</span></span> + <span class="fr"><span>1</span><span>15</span></span>, perché <span class="fr"><span>1</span><span>3</span></span> + <span class="fr"><span>1</span><span>15</span></span> = <span class="fr"><span>5</span><span>15</span></span> + <span class="fr"><span>1</span><span>15</span></span> = <span class="fr"><span>6</span><span>15</span></span> = <span class="fr"><span>2</span><span>5</span></span>.</p>
<p>Il papiro di Rhind (circa 1650 a.C.) inizia proprio con una tabella che scompone le frazioni <span class="fr"><span>2</span><span><i>n</i></span></span>, per <i>n</i> dispari da 3 a 101, in somme di frazioni unitarie diverse fra loro. Oggi queste somme si chiamano ancora <b>frazioni egizie</b>. Un problema tipico era dividere 2 pagnotte fra 5 persone. Ognuno riceve <span class="fr"><span>1</span><span>3</span></span> di pagnotta più <span class="fr"><span>1</span><span>15</span></span> di pagnotta, e i tagli sono più facili che dividere ogni pagnotta in 5.</p>
</div>
`},
  { n: 2, id: "p2", titolo: "La rappresentazione e il confronto di numeri razionali", html: `
<h3>I numeri razionali sulla retta</h3>
<p>Su una retta orientata fissiamo l'origine 0 e l'unità di misura. Per rappresentare un razionale scritto come frazione <span class="fr"><span>a</span><span><i>b</i></span></span>, con <span class="mat"><i>a</i></span> e <span class="mat"><i>b</i></span> naturali,</p>
<ul><li>dividiamo l'unità in <span class="mat"><i>b</i></span> parti uguali;</li>
<li>a partire da 0 contiamo <span class="mat">a</span> di queste parti verso destra se il numero è positivo, verso sinistra se è negativo.</li></ul>
<p>Frazioni equivalenti cadono nello stesso punto, perciò a ogni numero razionale corrisponde un solo punto della retta. Per esempio −<span class="fr"><span>3</span><span>2</span></span> e −<span class="fr"><span>6</span><span>4</span></span> sono lo stesso punto, a metà strada fra −1 e −2.</p>
<div class="anim" data-anim="rettaq" data-titolo="Un numero razionale sulla retta"></div>

<h3>Il confronto di numeri razionali</h3>
<p>Come per gli interi, sulla retta è maggiore il numero che sta più a destra. Quindi ogni positivo è maggiore di ogni negativo e lo 0 sta fra i negativi e i positivi.</p>
<div class="regola"><b>Regola</b>
Per confrontare due frazioni si scrivono con lo <b>stesso denominatore positivo</b>; è maggiore quella che ha il numeratore maggiore.</div>
<p>Confrontiamo <span class="fr"><span>7</span><span>12</span></span> e <span class="fr"><span>5</span><span>8</span></span>.</p>
<ol class="passaggi">
<li>12 = 2<sup>2</sup> · 3 e 8 = 2<sup>3</sup>, quindi mcm(12; 8) = 2<sup>3</sup> · 3 = <span class="c1">24</span>.</li>
<li>Per <span class="fr"><span>7</span><span>12</span></span> il fattore è <span class="c1">24</span> : 12 = <span class="c2">2</span>. &emsp; <span class="nw"><span class="fr"><span>7</span><span>12</span></span> = <span class="fr"><span>7 · <span class="c2">2</span></span><span>12 · <span class="c2">2</span></span></span> = <span class="fr"><span>14</span><span>24</span></span></span></li>
<li>Per <span class="fr"><span>5</span><span>8</span></span> il fattore è <span class="c1">24</span> : 8 = <span class="c3">3</span>. &emsp; <span class="nw"><span class="fr"><span>5</span><span>8</span></span> = <span class="fr"><span>5 · <span class="c3">3</span></span><span>8 · <span class="c3">3</span></span></span> = <span class="fr"><span>15</span><span>24</span></span></span></li>
<li>Ora i denominatori sono uguali e si confrontano i numeratori. 14 &lt; 15, quindi <span class="fr"><span>7</span><span>12</span></span> &lt; <span class="fr"><span>5</span><span>8</span></span>.</li>
</ol>
<p>Con le frazioni negative si procede nello stesso modo, tenendo il segno al numeratore. Per −<span class="fr"><span>2</span><span>3</span></span> e −<span class="fr"><span>3</span><span>4</span></span> il mcm è 12, i fattori sono 4 e 3. Si ottiene <span class="fr"><span>−2 · 4</span><span>12</span></span> = <span class="fr"><span>−8</span><span>12</span></span> e <span class="fr"><span>−3 · 3</span><span>12</span></span> = <span class="fr"><span>−9</span><span>12</span></span>; poiché −8 &gt; −9 risulta −<span class="fr"><span>2</span><span>3</span></span> &gt; −<span class="fr"><span>3</span><span>4</span></span>.</p>
<p>Per due frazioni positive c'è una scorciatoia, il <b>prodotto in croce</b>. <span class="fr"><span>a</span><span><i>b</i></span></span> &lt; <span class="fr"><span><i>c</i></span><span><i>d</i></span></span> se e solo se <span class="mat"><i>a</i> · <i>d</i> &lt; <i>b</i> · c</span>. Infatti, moltiplicando numeratore e denominatore per <span class="mat"><i>d</i></span> e per <span class="mat"><i>b</i></span>, le due frazioni diventano <span class="fr"><span><i>a</i> · <i>d</i></span><span><i>b</i> · <i>d</i></span></span> e <span class="fr"><span><i>b</i> · <i>c</i></span><span><i>b</i> · <i>d</i></span></span>, che hanno lo stesso denominatore.</p>
<div class="esempio"><b>Esempio</b><span class="fr"><span>8</span><span>11</span></span> e <span class="fr"><span>5</span><span>7</span></span>. 8 · 7 = 56 e 11 · 5 = 55; poiché 56 &gt; 55 si ha <span class="fr"><span>8</span><span>11</span></span> &gt; <span class="fr"><span>5</span><span>7</span></span>.</div>
<div class="attenzione"><b>Attenzione</b>Fra due frazioni positive con lo <b>stesso numeratore</b> è maggiore quella con il denominatore <b>minore</b>. Per esempio <span class="fr"><span>3</span><span>5</span></span> &gt; <span class="fr"><span>3</span><span>8</span></span>, perché dividendo l'intero in 5 parti le parti sono più grandi che dividendolo in 8.</div>

<h3>ℚ è un insieme denso</h3>
<p>Fra due interi consecutivi, come 3 e 4, non ci sono altri interi. Fra due razionali diversi, invece, ce n'è sempre un altro, per esempio la loro <b>media</b>. Fra <span class="fr"><span>1</span><span>3</span></span> e <span class="fr"><span>1</span><span>2</span></span> c'è <span class="fr"><span><span class="fr"><span>1</span><span>3</span></span> + <span class="fr"><span>1</span><span>2</span></span></span><span>2</span></span> = <span class="fr"><span>5</span><span>12</span></span>; fra <span class="fr"><span>1</span><span>3</span></span> e <span class="fr"><span>5</span><span>12</span></span> c'è <span class="fr"><span>3</span><span>8</span></span>, e così via senza fine. Per questo si dice che ℚ è <b>denso</b>: fra due razionali qualsiasi ce ne sono infiniti altri. In ℚ un numero non ha un “successivo”.</p>
<p>Prendendo sulla retta segmenti lunghi <span class="fr"><span>1</span><span>10</span></span>, poi <span class="fr"><span>1</span><span>100</span></span>, <span class="fr"><span>1</span><span>1000</span></span> e così via, si trovano punti razionali vicini quanto vogliamo a un punto qualsiasi. Vedremo però che i razionali, pur essendo “fitti”, non riempiono tutta la retta.</p>

<div class="curiosita" data-img="monocordo" data-titolo="La musica delle frazioni">
<p>Secondo la tradizione, Pitagora studiò i suoni con il <b>monocordo</b>, una cassa con una sola corda tesa e un ponticello mobile. Facendo vibrare metà corda si ottiene la stessa nota dell'intera corda, ma più acuta: è l'intervallo di <b>ottava</b>. Con <span class="fr"><span>2</span><span>3</span></span> della corda si ottiene la <b>quinta</b>, con <span class="fr"><span>3</span><span>4</span></span> la <b>quarta</b>.</p>
<p>Oggi diciamo che la frequenza di una corda è inversamente proporzionale alla sua lunghezza. Se il La di un violino vibra 440 volte al secondo, dimezzando la corda si ottengono 880 vibrazioni al secondo. I Pitagorici ne dedussero che l'armonia del mondo fosse fatta di rapporti fra numeri interi, cioè di frazioni.</p>
</div>
`},
  { n: 3, id: "p3", titolo: "Le operazioni in ℚ", html: `
<h3>L'addizione e la sottrazione</h3>
<div class="definizione"><b>Definizione</b>
La somma (o la differenza) di due frazioni con lo <b>stesso denominatore</b> è la frazione che ha lo stesso denominatore e per numeratore la somma (o la differenza) dei numeratori.
<p class="formula"><span class="fr"><span>a</span><span><i>b</i></span></span> + <span class="fr"><span><i>c</i></span><span><i>b</i></span></span> = <span class="fr"><span><i>a</i> + <i>c</i></span><span><i>b</i></span></span> &emsp; <span class="fr"><span>a</span><span><i>b</i></span></span> − <span class="fr"><span><i>c</i></span><span><i>b</i></span></span> = <span class="fr"><span><i>a</i> − <i>c</i></span><span><i>b</i></span></span></p></div>
<p>Se i denominatori sono <b>diversi</b> non si possono sommare direttamente i numeratori, perché indicano parti di grandezza diversa (non si sommano “sesti” e “quindicesimi”). Prima si riducono le frazioni al minimo comune denominatore, come visto nel paragrafo 1, poi si sommano i numeratori.</p>
<p>Calcoliamo <span class="fr"><span>5</span><span>6</span></span> + <span class="fr"><span>4</span><span>15</span></span> scrivendo tutti i passaggi.</p>
<ol class="passaggi">
<li><b>Minimo comune denominatore.</b> 6 = 2 · 3 e 15 = 3 · 5, quindi mcm(6; 15) = 2 · 3 · 5 = <span class="c1">30</span>.</li>
<li><b>Fattore di ogni frazione.</b> Per <span class="fr"><span>5</span><span>6</span></span> il fattore è <span class="c1">30</span> : 6 = <span class="c2">5</span>; per <span class="fr"><span>4</span><span>15</span></span> è <span class="c1">30</span> : 15 = <span class="c3">2</span>.</li>
<li><b>Nuovi numeratori.</b> Si moltiplica ogni numeratore per il suo fattore. &emsp; <span class="nw"><span class="fr"><span>5</span><span>6</span></span> + <span class="fr"><span>4</span><span>15</span></span> = <span class="fr"><span><span class="c2">5</span> · 5 + <span class="c3">2</span> · 4</span><span><span class="c1">30</span></span></span></span><span class="perche">Questa scrittura con un'unica linea di frazione è un modo abbreviato di scrivere <span class="fr"><span>25</span><span>30</span></span> + <span class="fr"><span>8</span><span>30</span></span>.</span></li>
<li><b>Calcolo del numeratore.</b> &emsp; <span class="nw"><span class="fr"><span>25 + 8</span><span>30</span></span> = <span class="fr"><span>33</span><span>30</span></span></span></li>
<li><b>Semplificazione.</b> 33 e 30 sono divisibili per 3. &emsp; <span class="nw"><span class="fr"><span><span class="canc" data-n="11">33</span></span><span><span class="canc giu" data-n="10">30</span></span></span> = <span class="fr"><span>11</span><span>10</span></span></span></li>
</ol>
<p>Con la stessa procedura si calcola una differenza, anche quando c'è un numero intero. Un intero si scrive come frazione con denominatore 1.</p>
<ol class="passaggi">
<li><span class="fr"><span>7</span><span>2</span></span> − <span class="fr"><span>3</span><span>5</span></span>. Il mcm è 10, i fattori sono 10 : 2 = 5 e 10 : 5 = 2. &emsp; <span class="nw"><span class="fr"><span>5 · 7 − 2 · 3</span><span>10</span></span> = <span class="fr"><span>35 − 6</span><span>10</span></span> = <span class="fr"><span>29</span><span>10</span></span></span></li>
<li>2 − <span class="fr"><span>3</span><span>4</span></span>, cioè <span class="fr"><span>2</span><span>1</span></span> − <span class="fr"><span>3</span><span>4</span></span>. Il mcm è 4, i fattori sono 4 : 1 = 4 e 4 : 4 = 1. &emsp; <span class="nw"><span class="fr"><span>4 · 2 − 1 · 3</span><span>4</span></span> = <span class="fr"><span>8 − 3</span><span>4</span></span> = <span class="fr"><span>5</span><span>4</span></span></span></li>
</ol>
<p>In ℚ, come in ℤ, la sottrazione è sempre possibile e valgono le proprietà commutativa e associativa dell'addizione, l'elemento neutro 0, l'esistenza dell'opposto e la proprietà invariantiva della sottrazione. Le regole per eliminare le parentesi sono le stesse viste per i numeri interi.</p>

<h3>La moltiplicazione</h3>
<div class="definizione"><b>Definizione</b>
Il prodotto di due frazioni è la frazione che ha per numeratore il prodotto dei numeratori e per denominatore il prodotto dei denominatori.
<p class="formula"><span class="fr"><span>a</span><span><i>b</i></span></span> · <span class="fr"><span><i>c</i></span><span><i>d</i></span></span> = <span class="fr"><span><i>a</i> · <i>c</i></span><span><i>b</i> · <i>d</i></span></span></p></div>
<p>Il segno si trova con la regola del prodotto dei segni. Prima di moltiplicare conviene <b>semplificare in croce</b>, cioè dividere per uno stesso numero un <b>numeratore</b> e un <b>denominatore</b>, anche se appartengono a frazioni diverse. Si può fare perché <span class="fr"><span>a</span><span><i>b</i></span></span> · <span class="fr"><span><i>c</i></span><span><i>d</i></span></span> = <span class="fr"><span><i>a</i> · <i>c</i></span><span><i>b</i> · <i>d</i></span></span>: tutti i numeratori stanno sopra la stessa linea di frazione e tutti i denominatori sotto, quindi semplificare un numeratore con un denominatore qualsiasi è la proprietà invariantiva.</p>
<p>Calcoliamo <span class="fr"><span>3</span><span>4</span></span> · <span class="fr"><span>8</span><span>9</span></span>.</p>
<ol class="passaggi">
<li>Il numeratore <span class="c1">3</span> e il denominatore <span class="c1">9</span> sono divisibili per <span class="c1">3</span>. 3 : 3 = 1 e 9 : 3 = 3. &emsp; <span class="nw"><span class="fr"><span><span class="canc" data-n="1"><span class="c1">3</span></span></span><span>4</span></span> · <span class="fr"><span>8</span><span><span class="canc giu" data-n="3"><span class="c1">9</span></span></span></span></span></li>
<li>Il numeratore <span class="c2">8</span> e il denominatore <span class="c2">4</span> sono divisibili per <span class="c2">4</span>. 8 : 4 = 2 e 4 : 4 = 1. &emsp; <span class="nw"><span class="fr"><span><span class="canc" data-n="1">3</span></span><span><span class="canc giu" data-n="1"><span class="c2">4</span></span></span></span> · <span class="fr"><span><span class="canc" data-n="2"><span class="c2">8</span></span></span><span><span class="canc giu" data-n="3">9</span></span></span></span></li>
<li>Si moltiplicano i numeri rimasti, numeratori con numeratori e denominatori con denominatori. &emsp; <span class="nw"><span class="fr"><span>1 · 2</span><span>1 · 3</span></span> = <span class="fr"><span>2</span><span>3</span></span></span></li>
</ol>
<p>Se non si semplifica prima, si arriva allo stesso risultato ma con numeri più grandi, cioè <span class="fr"><span>3 · 8</span><span>4 · 9</span></span> = <span class="fr"><span><span class="canc" data-n="2">24</span></span><span><span class="canc giu" data-n="3">36</span></span></span> = <span class="fr"><span>2</span><span>3</span></span>, dividendo per 12.</p>
<p>Calcoliamo <span class="gp gt"><span class="gpL"></span><span class="gpC">−<span class="fr"><span>10</span><span>21</span></span></span><span class="gpR"></span></span> · <span class="gp gt"><span class="gpL"></span><span class="gpC"><span class="fr"><span>14</span><span>15</span></span></span><span class="gpR"></span></span>.</p>
<ol class="passaggi">
<li><b>Segno.</b> I fattori sono discordi, quindi il prodotto è negativo.</li>
<li><b>Semplificazione in croce.</b> <span class="c1">10</span> e <span class="c1">15</span> si dividono per <span class="c1">5</span> (diventano 2 e 3); <span class="c2">14</span> e <span class="c2">21</span> si dividono per <span class="c2">7</span> (diventano 2 e 3). &emsp; <span class="nw">−<span class="fr"><span><span class="canc" data-n="2"><span class="c1">10</span></span></span><span><span class="canc giu" data-n="3"><span class="c2">21</span></span></span></span> · <span class="fr"><span><span class="canc" data-n="2"><span class="c2">14</span></span></span><span><span class="canc giu" data-n="3"><span class="c1">15</span></span></span></span></span></li>
<li><b>Prodotto.</b> &emsp; <span class="nw">−<span class="fr"><span>2 · 2</span><span>3 · 3</span></span> = −<span class="fr"><span>4</span><span>9</span></span></span></li>
</ol>
<p>Il prodotto di due frazioni proprie positive si può vedere come un'area. In un quadrato di lato 1 il rettangolo con lati <span class="fr"><span>a</span><span><i>b</i></span></span> e <span class="fr"><span><i>c</i></span><span><i>d</i></span></span> ha area <span class="fr"><span><i>a</i> · <i>c</i></span><span><i>b</i> · d</span></span>.</p>
<div class="anim" data-anim="prodottofrazioni" data-titolo="Il prodotto di due frazioni come area"></div>
<p>Valgono le proprietà commutativa, associativa, distributiva rispetto all'addizione, l'elemento neutro 1, l'elemento assorbente 0 e la legge di annullamento del prodotto.</p>
<div class="definizione"><b>Definizione</b>
Il <b>reciproco</b> (o <b>inverso</b>) di un razionale <span class="fr"><span>a</span><span><i>b</i></span></span> diverso da 0 è <span class="fr"><span><i>b</i></span><span>a</span></span>. Il prodotto di un numero per il suo reciproco è 1.</div>
<div class="esempio"><b>Esempio</b>Il reciproco di <span class="fr"><span>4</span><span>7</span></span> è <span class="fr"><span>7</span><span>4</span></span><br>Il reciproco di −5 è −<span class="fr"><span>1</span><span>5</span></span><br>Il reciproco di −<span class="fr"><span>1</span><span>3</span></span> è −3<br>Lo 0 non ha reciproco, perché nessun numero moltiplicato per 0 dà 1.</div>

<h3>La divisione</h3>
<div class="definizione"><b>Definizione</b>
Il quoziente di due razionali, con il divisore diverso da 0, è il prodotto del dividendo per il <b>reciproco</b> del divisore.
<p class="formula"><span class="fr"><span>a</span><span><i>b</i></span></span> : <span class="fr"><span><i>c</i></span><span><i>d</i></span></span> = <span class="fr"><span><i>a</i></span><span><i>b</i></span></span> · <span class="fr"><span><i>d</i></span><span><i>c</i></span></span> &emsp; (<i>b</i>, <i>c</i>, <i>d</i> ≠ 0)</p></div>
<p>Calcoliamo <span class="gp gt"><span class="gpL"></span><span class="gpC">−<span class="fr"><span>5</span><span>6</span></span></span><span class="gpR"></span></span> : <span class="gp gt"><span class="gpL"></span><span class="gpC"><span class="fr"><span>10</span><span>9</span></span></span><span class="gpR"></span></span>.</p>
<ol class="passaggi">
<li><b>Reciproco del divisore.</b> Il divisore è <span class="fr"><span>10</span><span>9</span></span>, il suo reciproco è <span class="fr"><span>9</span><span>10</span></span> (si scambiano numeratore e denominatore). La divisione diventa una moltiplicazione. &emsp; <span class="nw"><span class="gp gt"><span class="gpL"></span><span class="gpC">−<span class="fr"><span>5</span><span>6</span></span></span><span class="gpR"></span></span> : <span class="gp gt"><span class="gpL"></span><span class="gpC"><span class="fr"><span>10</span><span>9</span></span></span><span class="gpR"></span></span> = −<span class="fr"><span>5</span><span>6</span></span> · <span class="fr"><span>9</span><span>10</span></span></span></li>
<li><b>Segno.</b> Un fattore è negativo e l'altro positivo, quindi il risultato è negativo.</li>
<li><b>Semplificazione in croce.</b> <span class="c1">5</span> e <span class="c1">10</span> si dividono per <span class="c1">5</span>; <span class="c2">9</span> e <span class="c2">6</span> si dividono per <span class="c2">3</span>. &emsp; <span class="nw">−<span class="fr"><span><span class="canc" data-n="1"><span class="c1">5</span></span></span><span><span class="canc giu" data-n="2"><span class="c2">6</span></span></span></span> · <span class="fr"><span><span class="canc" data-n="3"><span class="c2">9</span></span></span><span><span class="canc giu" data-n="2"><span class="c1">10</span></span></span></span></span></li>
<li><b>Prodotto.</b> &emsp; <span class="nw">−<span class="fr"><span>1 · 3</span><span>2 · 2</span></span> = −<span class="fr"><span>3</span><span>4</span></span></span></li>
</ol>
<div class="attenzione"><b>Attenzione</b>Si scrive il reciproco solo del <b>divisore</b> (il secondo numero), mai del dividendo. E la semplificazione in croce si fa <b>dopo</b> aver trasformato la divisione in moltiplicazione, non prima.</div>
<div class="esempio"><b>Esempio</b>7 : 3 = <span class="fr"><span>7</span><span>1</span></span> · <span class="fr"><span>1</span><span>3</span></span> = <span class="fr"><span>7</span><span>3</span></span></div>
<p>In ℚ la divisione è sempre possibile, purché il divisore non sia 0. Per esempio 7 : 3 non ha risultato in ℤ, ma in ℚ vale <span class="fr"><span>7</span><span>3</span></span>. Per questo una frazione si chiama anche <b>rapporto</b> fra numeratore e denominatore.</p>
<div class="attenzione"><b>Attenzione</b>Dividere per un numero compreso fra 0 e 1 dà un risultato <b>più grande</b> del dividendo. Per esempio 6 : <span class="fr"><span>1</span><span>3</span></span> = 6 · 3 = 18, perché <span class="fr"><span>1</span><span>3</span></span> “sta” 18 volte in 6.</div>

<h3>La potenza</h3>
<div class="definizione"><b>Definizione</b>
La potenza di una frazione con esponente naturale <span class="mat"><i>n</i></span> è la frazione che ha per numeratore e denominatore le potenze <span class="mat"><i>n</i></span>-esime del numeratore e del denominatore.
<p class="formula"><span class="gp gt"><span class="gpL"></span><span class="gpC"><span class="fr"><span>a</span><span><i>b</i></span></span></span><span class="gpR"></span></span><sup><i>n</i></sup> = <span class="fr"><span><i>a</i><sup><i>n</i></sup></span><span><i>b</i><sup><i>n</i></sup></span></span> &emsp; <span class="gp gt"><span class="gpL"></span><span class="gpC"><span class="fr"><span>a</span><span><i>b</i></span></span></span><span class="gpR"></span></span><sup>1</sup> = <span class="fr"><span><i>a</i></span><span><i>b</i></span></span> &emsp; <span class="gp gt"><span class="gpL"></span><span class="gpC"><span class="fr"><span>a</span><span><i>b</i></span></span></span><span class="gpR"></span></span><sup>0</sup> = 1 con <i>a</i> ≠ 0</p></div>
<div class="esempio"><b>Esempio</b><span class="gp gt"><span class="gpL"></span><span class="gpC">−<span class="fr"><span>2</span><span>3</span></span></span><span class="gpR"></span></span><sup>3</sup> = <span class="fr"><span>(−2)<sup>3</sup></span><span>3<sup>3</sup></span></span> = −<span class="fr"><span>8</span><span>27</span></span><br><span class="gp gt"><span class="gpL"></span><span class="gpC"><span class="fr"><span>3</span><span>5</span></span></span><span class="gpR"></span></span><sup>2</sup> = <span class="fr"><span>9</span><span>25</span></span><br>−<span class="gp gt"><span class="gpL"></span><span class="gpC"><span class="fr"><span>1</span><span>2</span></span></span><span class="gpR"></span></span><sup>4</sup> = −<span class="fr"><span>1</span><span>16</span></span></div>
<p>Il segno segue le regole già viste in ℤ, e valgono le cinque proprietà delle potenze.</p>
<div class="attenzione"><b>Attenzione</b><span class="gp gt"><span class="gpL"></span><span class="gpC"><span class="fr"><span>2</span><span>3</span></span></span><span class="gpR"></span></span><sup>2</sup> = <span class="fr"><span>4</span><span>9</span></span>, mentre <span class="fr"><span>2<sup>2</sup></span><span>3</span></span> = <span class="fr"><span>4</span><span>3</span></span>. Senza parentesi l'esponente riguarda solo il numeratore.</div>

<h3>Espressioni e leggi di monotonia</h3>
<p>Le espressioni con i razionali si calcolano con le stesse precedenze viste in ℕ e in ℤ, cioè prima le parentesi più interne, poi le potenze, poi moltiplicazioni e divisioni da sinistra a destra, infine addizioni e sottrazioni. Conviene semplificare ogni frazione appena possibile. In ℚ valgono anche le leggi di monotonia e di cancellazione; in particolare, moltiplicando per un numero negativo i due membri di una disuguaglianza, il verso cambia.</p>
<div class="esempio"><b>Esempio</b>dalla formula <span class="mat"><i>v</i> = <span class="fr"><span><i>s</i></span><span><i>t</i></span></span></span> si ricava <span class="mat"><i>s</i> = <i>v</i> · <i>t</i></span> moltiplicando i due membri per <span class="mat"><i>t</i></span>, e poi <span class="mat"><i>t</i> = <span class="fr"><span><i>s</i></span><span><i>v</i></span></span></span> dividendo per <span class="mat"><i>v</i></span>.</div>

<div class="curiosita" data-img="cammelli" data-titolo="I 17 cammelli">
<p>Un vecchio racconto narra di un mercante che lasciò in eredità 17 cammelli ai tre figli, con queste regole. Al primo spettava <span class="fr"><span>1</span><span>2</span></span>, al secondo <span class="fr"><span>1</span><span>3</span></span>, al terzo <span class="fr"><span>1</span><span>9</span></span> dei cammelli. Nessuna divisione era esatta! Un saggio prestò ai fratelli il suo cammello. Con 18 cammelli il primo ne prese 9, il secondo 6, il terzo 2. In tutto 17, e il saggio si riprese il suo.</p>
<p>Il trucco sta in una somma di frazioni. <span class="fr"><span>1</span><span>2</span></span> + <span class="fr"><span>1</span><span>3</span></span> + <span class="fr"><span>1</span><span>9</span></span> = <span class="fr"><span>9 + 6 + 2</span><span>18</span></span> = <span class="fr"><span>17</span><span>18</span></span>, che è minore di 1. Il testamento non divideva tutta l'eredità, e il diciottesimo che “avanzava” era proprio il cammello del saggio.</p>
</div>
`},
  { n: 4, id: "p4", titolo: "Le potenze con esponente intero negativo", html: `
<p>Per le potenze di uguale base vale <span class="fr"><span><i>a</i><sup><i>m</i></sup></span><span><i>a</i><sup><i>n</i></sup></span></span> = <span class="mat"><i>a</i><sup><i>m</i> − <i>n</i></sup></span>. Che cosa succede se l'esponente del divisore è maggiore? Proviamo con 2<sup>3</sup> : 2<sup>5</sup>.</p>
<p class="formula">2<sup>3</sup> : 2<sup>5</sup> = <span class="fr"><span>2 · 2 · 2</span><span>2 · 2 · 2 · 2 · 2</span></span> = <span class="fr"><span>1</span><span>4</span></span> = <span class="fr"><span>1</span><span>2<sup>2</sup></span></span> &emsp; e, con la proprietà, &emsp; 2<sup>3 − 5</sup> = 2<sup>−2</sup></p>
<p>Se vogliamo che la proprietà valga ancora, dobbiamo porre 2<sup>−2</sup> = <span class="gp gt"><span class="gpL"></span><span class="gpC"><span class="fr"><span>1</span><span>2</span></span></span><span class="gpR"></span></span><sup>2</sup>.</p>
<div class="definizione"><b>Definizione</b>
Una potenza con base razionale diversa da 0 ed esponente intero negativo è la potenza che ha per base il <b>reciproco</b> della base e per esponente l'<b>opposto</b> dell'esponente.
<p class="formula"><span class="gp gt"><span class="gpL"></span><span class="gpC"><span class="fr"><span>a</span><span><i>b</i></span></span></span><span class="gpR"></span></span><sup>−<i>n</i></sup> = <span class="gp gt"><span class="gpL"></span><span class="gpC"><span class="fr"><span><i>b</i></span><span><i>a</i></span></span></span><span class="gpR"></span></span><sup><i>n</i></sup> &emsp; (<i>a</i> ≠ 0, <i>b</i> ≠ 0, <i>n</i> ∈ ℕ)</p></div>
<div class="esempio"><b>Esempio</b><span class="gp gt"><span class="gpL"></span><span class="gpC"><span class="fr"><span>2</span><span>5</span></span></span><span class="gpR"></span></span><sup>−2</sup> = <span class="gp gt"><span class="gpL"></span><span class="gpC"><span class="fr"><span>5</span><span>2</span></span></span><span class="gpR"></span></span><sup>2</sup> = <span class="fr"><span>25</span><span>4</span></span><br>(−3)<sup>−2</sup> = <span class="gp gt"><span class="gpL"></span><span class="gpC">−<span class="fr"><span>1</span><span>3</span></span></span><span class="gpR"></span></span><sup>2</sup> = <span class="fr"><span>1</span><span>9</span></span><br><span class="gp gt"><span class="gpL"></span><span class="gpC">−<span class="fr"><span>1</span><span>2</span></span></span><span class="gpR"></span></span><sup>−3</sup> = (−2)<sup>3</sup> = −8<br>10<sup>−3</sup> = <span class="fr"><span>1</span><span>1000</span></span></div>
<p>In particolare <span class="mat"><i>a</i><sup>−1</sup></span> è il reciproco di <span class="mat">a</span>, per esempio <span class="gp gt"><span class="gpL"></span><span class="gpC"><span class="fr"><span>4</span><span>9</span></span></span><span class="gpR"></span></span><sup>−1</sup> = <span class="fr"><span>9</span><span>4</span></span>. Il segno si stabilisce con le solite regole, guardando la base e l'esponente.</p>
<div class="attenzione"><b>Attenzione</b>−3<sup>−2</sup> = −<span class="fr"><span>1</span><span>9</span></span>, perché senza parentesi l'esponente riguarda solo il 3. Invece 0<sup>−2</sup> non ha significato, perché 0 non ha reciproco.</div>
<p>Le cinque proprietà delle potenze valgono anche con esponenti interi negativi. Per esempio <span class="gp gt"><span class="gpL"></span><span class="gpC"><span class="fr"><span>3</span><span>4</span></span></span><span class="gpR"></span></span><sup>5</sup> · <span class="gp gt"><span class="gpL"></span><span class="gpC"><span class="fr"><span>3</span><span>4</span></span></span><span class="gpR"></span></span><sup>−7</sup> = <span class="gp gt"><span class="gpL"></span><span class="gpC"><span class="fr"><span>3</span><span>4</span></span></span><span class="gpR"></span></span><sup>−2</sup> = <span class="fr"><span>16</span><span>9</span></span>.</p>
<div class="approfondimento"><b>Per approfondire · ℚ è un ampliamento di ℤ</b>
<p>Gli interi corrispondono ai razionali con denominatore 1 e le operazioni di ℚ, applicate a questi numeri, danno gli stessi risultati che in ℤ. Per esempio <span class="gp gt"><span class="gpL"></span><span class="gpC">−<span class="fr"><span>3</span><span>1</span></span></span><span class="gpR"></span></span> + <span class="gp gt"><span class="gpL"></span><span class="gpC"><span class="fr"><span>5</span><span>1</span></span></span><span class="gpR"></span></span> = <span class="fr"><span>2</span><span>1</span></span>, come −3 + 5 = 2. In più, in ℚ possiamo eseguire operazioni impossibili in ℤ, come 3 : (−4) = −<span class="fr"><span>3</span><span>4</span></span> o 2<sup>−3</sup> = <span class="fr"><span>1</span><span>8</span></span>.</p></div>

<div class="curiosita" data-img="dimezza" data-titolo="Metà, metà, metà…">
<p>Il <b>carbonio 14</b> è un tipo di carbonio presente in tutti gli esseri viventi. Dopo la morte di un organismo non viene più rinnovato e ogni 5730 anni circa la sua quantità si dimezza. Dopo <i>n</i> di questi periodi resta la frazione <span class="gp gt"><span class="gpL"></span><span class="gpC"><span class="fr"><span>1</span><span>2</span></span></span><span class="gpR"></span></span><sup><i>n</i></sup> = 2<sup>−<i>n</i></sup> della quantità iniziale.</p>
<p>In un osso con 2<sup>−3</sup> = <span class="fr"><span>1</span><span>8</span></span> del carbonio 14 iniziale sono passati 3 periodi, cioè circa 17 000 anni. È il principio della <b>datazione al radiocarbonio</b>, con cui gli archeologi stabiliscono l'età di legni, ossa e tessuti fino a circa 50 000 anni fa.</p>
</div>
`},
  { n: 5, id: "p5", titolo: "I numeri razionali e i numeri decimali", html: `
<h3>Frazioni decimali e numeri decimali</h3>
<p>Le frazioni con denominatore 10, 100, 1000, … (potenze di 10 con esponente diverso da 0) si chiamano <b>frazioni decimali</b>. Si possono scrivere con la virgola, usando la scrittura posizionale.</p>
<p class="formula"><span class="fr"><span>4072</span><span>100</span></span> = 40 + <span class="fr"><span>7</span><span>10</span></span> + <span class="fr"><span>2</span><span>100</span></span> = 4 · 10 + 0 · 1 + 7 · <span class="fr"><span>1</span><span>10</span></span> + 2 · <span class="fr"><span>1</span><span>100</span></span> = 40,72</p>
<p>A sinistra della virgola c'è la parte intera, a destra le cifre decimali (decimi, centesimi, millesimi…). Un numero con un numero finito di cifre dopo la virgola si chiama <b>decimale finito</b>.</p>

<h3>Dalle frazioni ai numeri decimali</h3>
<p>Per scrivere una frazione come numero decimale si divide il numeratore per il denominatore. Possono capitare due casi.</p>
<ul><li>A un certo punto il resto è 0. Si ottiene un <b>decimale finito</b>, come <span class="fr"><span>13</span><span>8</span></span> = 13 : 8 = 1,625.</li>
<li>Il resto non è mai 0. I resti sono minori del divisore, quindi prima o poi un resto si ripete e da lì le cifre del quoziente si ripetono. Si ottiene un <b>decimale periodico</b>, come <span class="fr"><span>25</span><span>11</span></span> = 2,272727… = 2,<span class="per">27</span>.</li></ul>
<div class="definizione"><b>Definizione</b>
In un numero decimale periodico il gruppo di cifre che si ripete si chiama <b>periodo</b> e si scrive con una linea sopra; le cifre fra la virgola e il periodo formano l'<b>antiperiodo</b>. Il periodico è <b>semplice</b> se il periodo inizia subito dopo la virgola, <b>misto</b> se c'è un antiperiodo.</div>
<div class="esempio"><b>Esempio</b><span class="fr"><span>5</span><span>9</span></span> = 0,<span class="per">5</span> è periodico semplice.<br><span class="fr"><span>29</span><span>12</span></span> = 2,41<span class="per">6</span> è periodico misto, con antiperiodo 41 e periodo 6.</div>
<div class="anim" data-anim="periodo" data-titolo="Divisione, resti e periodo"></div>
<p>Il tipo di decimale si può prevedere dal denominatore della frazione <b>ridotta ai minimi termini</b>. Una frazione è equivalente a una frazione decimale solo se il suo denominatore divide una potenza di 10, cioè contiene solo i fattori primi 2 e 5.</p>
<table class="tab"><tr><th>Il denominatore ridotto contiene</th><th>La frazione genera un decimale</th><th>Esempio</th></tr>
<tr><td>solo i fattori 2 e 5</td><td>finito</td><td><span class="fr"><span>3</span><span>40</span></span> = 0,075 &emsp; (40 = 2<sup>3</sup> · 5)</td></tr>
<tr><td>nessun fattore 2 o 5</td><td>periodico semplice</td><td><span class="fr"><span>4</span><span>7</span></span> = 0,<span class="per">571428</span></td></tr>
<tr><td>i fattori 2 o 5 e anche altri fattori</td><td>periodico misto</td><td><span class="fr"><span>1</span><span>6</span></span> = 0,1<span class="per">6</span> &emsp; (6 = 2 · 3)</td></tr></table>

<h3>Dai numeri decimali alle frazioni</h3>
<p>Ogni decimale finito o periodico è la scrittura di un razionale; la frazione corrispondente si chiama <b>frazione generatrice</b>.</p>
<div class="regola"><b>Regola</b>
<ul><li><b>Decimale finito</b>. Al numeratore il numero scritto senza virgola, al denominatore 1 seguito da tanti 0 quante sono le cifre decimali. Per esempio 1,25 = <span class="fr"><span>125</span><span>100</span></span> = <span class="fr"><span>5</span><span>4</span></span>.</li>
<li><b>Decimale periodico</b>. Al numeratore il numero scritto senza virgola (e senza la linea) meno il numero formato dalle cifre che precedono il periodo; al denominatore tanti 9 quante sono le cifre del periodo, seguiti da tanti 0 quante sono le cifre dell'antiperiodo.</li></ul></div>
<div class="esempio"><b>Esempio</b>2,<span class="per">36</span> = <span class="fr"><span>236 − 2</span><span>99</span></span> = <span class="fr"><span>234</span><span>99</span></span> = <span class="fr"><span>26</span><span>11</span></span><br>0,4<span class="per">5</span> = <span class="fr"><span>45 − 4</span><span>90</span></span> = <span class="fr"><span>41</span><span>90</span></span></div>
<p>Si può giustificare la regola con un esempio. Se <span class="mat"><i>x</i></span> = 0,<span class="per">7</span> allora 10<span class="mat"><i>x</i></span> = 7,<span class="per">7</span>; sottraendo si ha 9<span class="mat"><i>x</i></span> = 7, cioè <span class="mat"><i>x</i></span> = <span class="fr"><span>7</span><span>9</span></span>.</p>
<p>Concludiamo che ogni numero razionale si scrive come decimale finito o periodico e, viceversa, ogni decimale finito o periodico rappresenta un numero razionale.</p>
<div class="attenzione"><b>Attenzione</b>Non esistono decimali con periodo 9 che non siano numeri “già noti”. Per la regola 0,<span class="per">9</span> = <span class="fr"><span>9</span><span>9</span></span> = 1 e 2,4<span class="per">9</span> = <span class="fr"><span>249 − 24</span><span>90</span></span> = <span class="fr"><span>5</span><span>2</span></span> = 2,5. Per questo il periodo 9 non si usa.</div>

<div class="curiosita" data-img="ciclico" data-titolo="Le cifre che girano in tondo">
<p><span class="fr"><span>1</span><span>7</span></span> = 0,<span class="per">142857</span>. Proviamo a scrivere gli altri settimi. <span class="fr"><span>2</span><span>7</span></span> = 0,<span class="per">285714</span>, <span class="fr"><span>3</span><span>7</span></span> = 0,<span class="per">428571</span>, <span class="fr"><span>4</span><span>7</span></span> = 0,<span class="per">571428</span>, <span class="fr"><span>5</span><span>7</span></span> = 0,<span class="per">714285</span>, <span class="fr"><span>6</span><span>7</span></span> = 0,<span class="per">857142</span>. Il periodo ha sempre le stesse sei cifre nello stesso ordine circolare, cambia solo il punto di partenza!</p>
<p>Per questo 142857 · 2 = 285714, 142857 · 3 = 428571 e così via fino a 142857 · 6 = 857142. E 142857 · 7? Fa 999999, perché <span class="fr"><span>7</span><span>7</span></span> = 0,<span class="per">9</span> = 1. Numeri come 142857 si chiamano <b>numeri ciclici</b>.</p>
</div>
`},
  { n: 6, id: "p6", titolo: "I numeri reali", html: `
<p>Disegniamo un quadrato con il lato lungo 1. Per il teorema di Pitagora, la diagonale <span class="mat"><i>d</i></span> verifica <span class="mat"><i>d</i><sup>2</sup> = 1<sup>2</sup> + 1<sup>2</sup> = 2</span>, quindi <span class="mat"><i>d</i></span> = <span class="rad">√<span class="radv">2</span></span>. Si può dimostrare che <b>nessuna frazione</b> ha quadrato uguale a 2, cioè che <span class="rad">√<span class="radv">2</span></span> non è un numero razionale.</p>
<div class="approfondimento"><b>Per approfondire · Perché <span class="rad">√<span class="radv">2</span></span> non è razionale</b>
<p>Supponiamo per assurdo che <span class="rad">√<span class="radv">2</span></span> = <span class="fr"><span><i>a</i></span><span><i>b</i></span></span> con la frazione ridotta ai minimi termini. Allora <span class="mat"><i>a</i><sup>2</sup> = 2<i>b</i><sup>2</sup></span>, quindi <span class="mat"><i>a</i><sup>2</sup></span> è pari e anche <span class="mat"><i>a</i></span> è pari, cioè <span class="mat"><i>a</i> = 2<i>k</i></span>. Sostituendo si ha <span class="mat">4<i>k</i><sup>2</sup> = 2<i>b</i><sup>2</sup></span>, cioè <span class="mat"><i>b</i><sup>2</sup> = 2<i>k</i><sup>2</sup></span>, e anche <span class="mat"><i>b</i></span> è pari. Ma allora <span class="mat"><i>a</i></span> e <span class="mat"><i>b</i></span> hanno il divisore comune 2, contro l'ipotesi che la frazione fosse ridotta. L'ipotesi iniziale è quindi falsa.</p></div>
<div class="definizione"><b>Definizione</b>
Un numero <b>irrazionale</b> è un numero che non si può esprimere con una frazione. La sua scrittura decimale ha infinite cifre e <b>non è periodica</b>.</div>
<p>Sono irrazionali</p>
<ul><li>le radici quadrate dei numeri naturali che non sono quadrati perfetti, come <span class="rad">√<span class="radv">2</span></span> = 1,41421…, <span class="rad">√<span class="radv">3</span></span> = 1,73205…, <span class="rad">√<span class="radv">10</span></span> = 3,16227…;</li>
<li>il numero π = 3,14159…, rapporto fra la lunghezza di una circonferenza e il suo diametro.</li></ul>
<p>Anche un numero decimale costruito senza periodo, come 0,101001000100001… (dopo ogni 1 gli zeri aumentano di uno), è irrazionale.</p>
<div class="definizione"><b>Definizione</b>
I numeri razionali e i numeri irrazionali formano l'insieme dei <b>numeri reali</b>, che si indica con <span class="mat">ℝ</span>.
<p class="formula">ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ</p></div>
<p>Anche gli irrazionali si possono rappresentare sulla retta. Per <span class="rad">√<span class="radv">2</span></span> si costruisce un quadrato con un lato sull'unità da 0 a 1 e, con il compasso puntato in 0, si riporta la diagonale sulla retta. I numeri reali corrispondono a <b>tutti</b> i punti della retta, uno a uno; per questo la retta orientata si chiama anche <b>retta reale</b>.</p>
<p>Per confrontare numeri reali si usano le loro scritture decimali. Per esempio <span class="rad">√<span class="radv">2</span></span> = 1,414… &lt; <span class="fr"><span>17</span><span>12</span></span> = 1,41<span class="per">6</span>, perché le due scritture coincidono fino ai centesimi e poi 4 &lt; 6.</p>

<div class="curiosita" data-img="diagonale" data-titolo="Un segreto da non rivelare">
<p>Per i Pitagorici tutto si poteva descrivere con i numeri interi e i loro rapporti. La scoperta che lato e diagonale del quadrato non hanno una misura comune metteva in crisi questa visione. Una leggenda racconta che <b>Ippaso di Metaponto</b>, che avrebbe divulgato la scoperta, morì in un naufragio, punito dagli dei.</p>
<p>Gli storici non sanno se la storia sia vera, ma sanno che i Greci presero molto sul serio il problema. La teoria delle proporzioni di Eudosso, raccolta da Euclide, nacque proprio per ragionare su grandezze “senza misura comune”. Una vera teoria dei numeri reali arrivò solo più di duemila anni dopo.</p>
</div>
`},
  { n: 7, id: "p7", titolo: "Le frazioni e le proporzioni", html: `
<p>Due frazioni equivalenti, come <span class="fr"><span>6</span><span>8</span></span> = <span class="fr"><span>15</span><span>20</span></span>, si possono leggere come uguaglianza di due rapporti, cioè 6 : 8 = 15 : 20.</p>
<div class="definizione"><b>Definizione</b>
Una <b>proporzione</b> è un'uguaglianza fra due rapporti, <span class="mat"><i>a</i> : <i>b</i> = <i>c</i> : <i>d</i></span>, che si legge «<span class="mat">a</span> sta a <span class="mat"><i>b</i></span> come <span class="mat"><i>c</i></span> sta a <span class="mat"><i>d</i></span>». I termini <span class="mat"><i>a</i></span> e <span class="mat"><i>c</i></span> sono gli <b>antecedenti</b>, <span class="mat"><i>b</i></span> e <span class="mat"><i>d</i></span> i <b>conseguenti</b>; <span class="mat"><i>a</i></span> e <span class="mat"><i>d</i></span> sono gli <b>estremi</b>, <span class="mat"><i>b</i></span> e <span class="mat"><i>c</i></span> i <b>medi</b>.</div>
<div class="regola"><b>Proprietà fondamentale</b>
In ogni proporzione il prodotto dei medi è uguale al prodotto degli estremi.
<p class="formula"><i>a</i> : <i>b</i> = <i>c</i> : <i>d</i> &emsp; se e solo se &emsp; <i>b</i> · <i>c</i> = <i>a</i> · <i>d</i></p></div>
<p>È la definizione di frazioni equivalenti scritta in un altro modo. Per esempio in 6 : 8 = 15 : 20 si ha 8 · 15 = 120 = 6 · 20. Dalla proprietà fondamentale, o dalla proprietà invariantiva, seguono le altre proprietà.</p>
<table class="tab"><tr><th>Proprietà</th><th>Se <i>a</i> : <i>b</i> = <i>c</i> : <i>d</i> allora</th><th>Esempio con 6 : 8 = 15 : 20</th></tr>
<tr><td>dell'invertire</td><td><i>b</i> : <i>a</i> = <i>d</i> : <i>c</i></td><td>8 : 6 = 20 : 15</td></tr>
<tr><td>del permutare i medi</td><td><i>a</i> : <i>c</i> = <i>b</i> : <i>d</i></td><td>6 : 15 = 8 : 20</td></tr>
<tr><td>del permutare gli estremi</td><td><i>d</i> : <i>b</i> = <i>c</i> : <i>a</i></td><td>20 : 8 = 15 : 6</td></tr>
<tr><td>del comporre</td><td>(<i>a</i> + <i>b</i>) : <i>a</i> = (<i>c</i> + <i>d</i>) : <i>c</i> &emsp; (<i>a</i> + <i>b</i>) : <i>b</i> = (<i>c</i> + <i>d</i>) : <i>d</i></td><td>14 : 6 = 35 : 15</td></tr>
<tr><td>dello scomporre</td><td>(<i>a</i> − <i>b</i>) : <i>a</i> = (<i>c</i> − <i>d</i>) : <i>c</i> &emsp; (<i>a</i> − <i>b</i>) : <i>b</i> = (<i>c</i> − <i>d</i>) : <i>d</i></td><td>(6 − 8) : 8 = (15 − 20) : 20</td></tr></table>

<h3>Il termine incognito</h3>
<p>Le proprietà servono a trovare un termine sconosciuto. Se l'incognita compare una sola volta, basta la proprietà fondamentale.</p>
<div class="esempio"><b>Esempio</b>9 : 12 = <span class="mat"><i>x</i></span> : 20. Il prodotto dei medi è uguale a quello degli estremi, quindi 12 · <span class="mat"><i>x</i></span> = 9 · 20, da cui <span class="mat"><i>x</i></span> = <span class="fr"><span>9 · 20</span><span>12</span></span> = 15.</div>
<p>Quando l'incognita compare in due termini si usano il comporre o lo scomporre per “farla sparire” da uno dei due.</p>
<div class="esempio"><b>Esempio</b>(18 − <span class="mat"><i>x</i></span>) : <span class="mat"><i>x</i></span> = 7 : 2. Componendo, (18 − <span class="mat"><i>x</i></span> + <span class="mat"><i>x</i></span>) : <span class="mat"><i>x</i></span> = (7 + 2) : 2, cioè 18 : <span class="mat"><i>x</i></span> = 9 : 2. Quindi 9<span class="mat"><i>x</i></span> = 36 e <span class="mat"><i>x</i></span> = 4.</div>
<div class="definizione"><b>Definizione</b>
In una proporzione con i medi uguali, <span class="mat"><i>a</i> : <i>x</i> = <i>x</i> : <i>b</i></span>, il numero positivo <span class="mat"><i>x</i></span> si chiama <b>medio proporzionale</b> fra <span class="mat"><i>a</i></span> e <span class="mat"><i>b</i></span>. Si ha <span class="mat"><i>x</i><sup>2</sup> = <i>a</i> · b</span>.</div>
<div class="esempio"><b>Esempio</b>il medio proporzionale fra 4 e 25 verifica <span class="mat"><i>x</i><sup>2</sup></span> = 100, quindi <span class="mat"><i>x</i></span> = 10.</div>
<p>Con le proporzioni si risolvono molti problemi di vita quotidiana, come adattare una ricetta al numero di persone, leggere una carta geografica in scala o dividere una somma in parti proporzionali. Per dividere 120 in parti proporzionali a 3 e 5 si scrive <span class="mat"><i>x</i> : <i>y</i></span> = 3 : 5 e, componendo, (<i>x</i> + <i>y</i>) : <i>x</i> = 8 : 3, cioè 120 : <i>x</i> = 8 : 3. Si ottiene <i>x</i> = 45 e <i>y</i> = 75.</p>

<div class="curiosita" data-img="aureo" data-titolo="Il rettangolo aureo">
<p>Un rettangolo si dice <b>aureo</b> se, togliendo da esso il quadrato costruito sul lato minore, resta un rettangolo con la stessa forma di quello iniziale. Chiamando <span class="mat">a</span> la base e <span class="mat"><i>b</i></span> l'altezza, deve valere la proporzione <span class="mat"><i>a</i> : <i>b</i> = <i>b</i> : (<i>a</i> − <i>b</i>)</span>, cioè <span class="mat"><i>b</i></span> è medio proporzionale fra <span class="mat">a</span> e <span class="mat"><i>a</i> − <i>b</i></span>.</p>
<p>Il rapporto <span class="mat"><i>a</i> : <i>b</i></span> è il <b>numero aureo</b> φ = 1,6180339…, un numero irrazionale. Ripetendo la costruzione si ottiene una successione infinita di quadrati sempre più piccoli, e gli archi di circonferenza nei quadrati formano una spirale. Molti artisti e architetti hanno usato questa proporzione, anche se non tutti gli esempi che si leggono in giro sono stati misurati davvero.</p>
</div>
`},
  { n: 8, id: "p8", titolo: "Le percentuali", html: `
<p>«Sconto del 30%», «pendenza del 12%», «il 65% degli studenti va a scuola a piedi». Le percentuali sono frazioni con denominatore 100 e servono a confrontare facilmente parti di totali diversi.</p>
<div class="definizione"><b>Definizione</b>
La scrittura <span class="mat"><i>x</i>%</span> (si legge «<span class="mat"><i>x</i></span> per cento») indica la frazione <span class="fr"><span><i>x</i></span><span>100</span></span>. La scrittura <span class="mat"><i>x</i>‰</span> («<span class="mat"><i>x</i></span> per mille») indica la frazione <span class="fr"><span><i>x</i></span><span>1000</span></span>.</div>
<div class="esempio"><b>Esempio</b>40% = <span class="fr"><span>40</span><span>100</span></span> = <span class="fr"><span>2</span><span>5</span></span> = 0,4<br>7,5% = <span class="fr"><span>7,5</span><span>100</span></span> = 0,075<br>4‰ = <span class="fr"><span>4</span><span>1000</span></span> = <span class="fr"><span>1</span><span>250</span></span></div>
<p>Per scrivere una frazione come percentuale si cerca la frazione equivalente con denominatore 100, oppure si scrive il numero decimale e lo si moltiplica per 100.</p>
<div class="esempio"><b>Esempio</b><span class="fr"><span>7</span><span>20</span></span> = <span class="fr"><span>35</span><span>100</span></span> = 35%<br><span class="fr"><span>1</span><span>8</span></span> = 0,125 = 12,5%<br><span class="fr"><span>2</span><span>3</span></span> = 0,<span class="per">6</span> ≈ 66,7%</div>
<div class="anim" data-anim="percentuale" data-titolo="La percentuale su una griglia di cento quadretti"></div>

<h3>I tre problemi delle percentuali</h3>
<p>In ogni problema compaiono il <b>totale</b> <span class="mat">T</span>, la <b>percentuale</b> <span class="mat"><i>p</i>%</span> e la <b>parte</b> <span class="mat">P</span>, legate dalla proporzione <span class="mat">P : T = <i>p</i> : 100</span>.</p>
<ul><li><b>Calcolare la parte.</b> Il 15% di 260 è <span class="fr"><span>15</span><span>100</span></span> · 260 = 39.</li>
<li><b>Calcolare la percentuale.</b> 18 alunni su 24 sono il <span class="fr"><span>18</span><span>24</span></span> · 100% = 75%.</li>
<li><b>Calcolare il totale.</b> Se il 35% di un numero è 63, il numero è 63 : <span class="fr"><span>35</span><span>100</span></span> = 63 · <span class="fr"><span>100</span><span>35</span></span> = 180.</li></ul>

<h3>Aumenti e sconti</h3>
<p>Aumentare un prezzo del 20% vuol dire pagare il 100% + 20% = 120% del prezzo, cioè moltiplicarlo per <span class="fr"><span>120</span><span>100</span></span> = 1,2. Scontarlo del 20% vuol dire pagare l'80%, cioè moltiplicare per 0,8.</p>
<div class="esempio"><b>Esempio</b>un paio di scarpe da 85 € scontato del 30% costa 85 · 0,7 = 59,50 €.</div>
<p>Se conosciamo il prezzo finale e vogliamo quello iniziale, dobbiamo <b>dividere</b>. Per esempio l'IVA del 22% fa diventare un prezzo il 122% di quello iniziale; se un oggetto costa 61 € IVA compresa, senza IVA costava 61 : 1,22 = 50 €. Questa operazione si chiama <b>scorporo</b> dell'IVA.</p>
<div class="attenzione"><b>Attenzione</b>Togliere il 22% da 61 € non dà 50 €, perché il 22% è calcolato sul prezzo <b>senza</b> IVA, non su quello finale. 61 · 0,78 = 47,58 €, che è sbagliato.</div>

<div class="curiosita" data-img="sconto" data-titolo="Su e giù non fa pari">
<p>Un negozio aumenta tutti i prezzi del 20% e il mese dopo li sconta del 20%. Si torna al prezzo iniziale? No! Un oggetto da 100 € passa a 120 €, poi lo sconto del 20% si calcola su 120 €, cioè 24 €, e il prezzo diventa 96 €.</p>
<p>Le percentuali si moltiplicano, 1,2 · 0,8 = 0,96, cioè alla fine il prezzo è il 96% di quello iniziale, con un calo del 4%. Lo stesso accade invertendo l'ordine, prima lo sconto e poi l'aumento. Per tornare davvero al prezzo iniziale, dopo l'aumento del 20% bisognerebbe scontare di circa il 16,7%, perché <span class="fr"><span>1</span><span>1,2</span></span> = <span class="fr"><span>5</span><span>6</span></span> ≈ 0,833.</p>
</div>
`},
  { n: 9, id: "p9", titolo: "Il calcolo approssimato", html: `
<p>Nei calcoli di tutti i giorni non servono tutte le cifre di un numero. Il prezzo al litro della benzina ha tre decimali, ma alla cassa paghiamo al centesimo; π ha infinite cifre, ma per un disegno basta 3,14. Sostituire un numero con un altro “vicino” e più semplice si chiama <b>approssimare</b>.</p>
<h3>L'approssimazione di un numero</h3>
<p>Approssimare un numero «a meno di 10<sup>−2</sup>», cioè ai centesimi, vuol dire tenere due cifre dopo la virgola. Il modo più usato è l'<b>arrotondamento</b>.</p>
<div class="regola"><b>Regola dell'arrotondamento</b>
Si guarda la prima cifra che si trascura.
<ul><li>Se è <b>5 o maggiore</b>, si aumenta di 1 l'ultima cifra che si tiene.</li>
<li>Se è <b>minore di 5</b>, l'ultima cifra tenuta resta com'è.</li></ul></div>
<div class="esempio"><b>Esempio</b>12,3486 a meno di 10<sup>−2</sup> diventa 12,35 (la cifra trascurata è 8).<br>12,3486 a meno di 10<sup>−1</sup> diventa 12,3 (la cifra trascurata è 4).<br>25 371 a meno di 10<sup>2</sup>, cioè alle centinaia, diventa 25 400.</div>
<div class="definizione"><b>Definizione</b>
Se <span class="mat"><i>a</i></span> è un valore approssimato del numero <span class="mat"><i>q</i></span>, l'approssimazione è <b>per eccesso</b> se <span class="mat"><i>a</i> &gt; <i>q</i></span>, <b>per difetto</b> se <span class="mat"><i>a</i> &lt; <i>q</i></span>.</div>
<p>Nell'esempio 12,35 è un'approssimazione per eccesso, 12,3 per difetto. Con i numeri negativi bisogna fare attenzione, per esempio −4,27 ≈ −4,3 è per difetto, perché −4,3 &lt; −4,27.</p>
<div class="attenzione"><b>Attenzione</b>2,5 e 2,50 hanno lo stesso valore, ma come approssimazioni dicono cose diverse. Scrivere 2,50 significa che anche la cifra dei centesimi è stata calcolata ed è 0.</div>

<h3>L'errore assoluto e l'errore relativo</h3>
<div class="definizione"><b>Definizione</b>
Se <span class="mat"><i>a</i></span> è un valore approssimato del numero <span class="mat"><i>q</i></span>, si chiama <b>errore assoluto</b>, e si indica con <span class="mat"><i>e</i><sub>a</sub></span>, il numero <span class="mat"><i>e</i><sub>a</sub> = |<i>q</i> − <i>a</i>|</span>.</div>
<div class="esempio"><b>Esempio</b>Approssimando 5,2371 con 5,24 si ha <span class="mat"><i>e</i><sub>a</sub></span> = |5,2371 − 5,24| = 0,0029.<br>Approssimando <span class="fr"><span>2</span><span>3</span></span> = 0,<span class="per">6</span> con 0,67 si ha <span class="mat"><i>e</i><sub>a</sub></span> = <span class="gp gb"><span class="gpL"></span><span class="gpC"><span class="fr"><span>2</span><span>3</span></span> − <span class="fr"><span>67</span><span>100</span></span></span><span class="gpR"></span></span> = <span class="fr"><span>1</span><span>300</span></span> ≈ 0,0033.</div>
<p>L'errore assoluto da solo non basta a dire se un'approssimazione è buona. Sbagliare di 1 metro sulla distanza fra Roma e Milano è un'ottima precisione, sbagliare di 1 metro sulla lunghezza di un banco è un pessimo risultato.</p>
<div class="definizione"><b>Definizione</b>
L'<b>errore relativo</b>, che si indica con <span class="mat"><i>e</i><sub>r</sub></span>, è il rapporto fra l'errore assoluto e il valore assoluto del numero approssimato.
<p class="formula"><i>e</i><sub>r</sub> = <span class="fr"><span><i>e</i><sub>a</sub></span><span><span class="mat">|a|</span></span></span></p>
Spesso si esprime in percentuale e si chiama <b>errore percentuale</b>.</div>
<div class="esempio"><b>Esempio</b>480 approssimato con 500 ha <span class="mat"><i>e</i><sub>a</sub></span> = 20 ed <span class="mat"><i>e</i><sub>r</sub></span> = <span class="fr"><span>20</span><span>500</span></span> = 0,04 = 4%.<br>4,8 approssimato con 5 ha <span class="mat"><i>e</i><sub>a</sub></span> = 0,2 e lo stesso <span class="mat"><i>e</i><sub>r</sub></span> = 4%.<br>1248 approssimato con 1250 ha <span class="mat"><i>e</i><sub>a</sub></span> = 2 ma <span class="mat"><i>e</i><sub>r</sub></span> = <span class="fr"><span>2</span><span>1250</span></span> = 0,0016 = 0,16%, molto più piccolo.</div>

<h3>La misura e l'errore</h3>
<p>Anche una misura è un valore approssimato, perché ogni strumento ha una sensibilità limitata. Scrivere <span class="mat"><i>l</i></span> = (24,6 ± 0,1) cm vuol dire che il valore vero è compreso fra 24,5 cm e 24,7 cm; 0,1 cm è l'<b>errore assoluto</b> della misura, <span class="mat"><i>e</i><sub>a</sub></span> = 0,1 cm. L'errore relativo è <span class="mat"><i>e</i><sub>r</sub></span> =  <span class="fr"><span>0,1</span><span>24,6</span></span> ≈ 0,004 = 0,4%.</p>
<p>Fra due misure è più <b>precisa</b> quella con l'errore relativo minore. Una pista di 400 m misurata con l'errore di 0,5 m (errore relativo 0,125%) è misurata meglio di un quaderno di 30 cm misurato con l'errore di 0,1 cm (circa 0,33%).</p>

<div class="curiosita" data-img="pigreco" data-titolo="Quante cifre di π servono?">
<p>Al computer sono state calcolate migliaia di miliardi di cifre di π, ma quante ne servono davvero? Gli ingegneri della NASA che guidano le sonde nello spazio hanno spiegato di usare 3,141592653589793, cioè 15 cifre decimali.</p>
<p>Con questo valore, la circonferenza di un cerchio grande come l'orbita della sonda Voyager 1, a più di 20 miliardi di km dalla Terra, sarebbe calcolata con un errore di pochi centimetri. Un errore relativo così piccolo è più che sufficiente per qualunque calcolo pratico.</p>
</div>
`},
  { n: 10, id: "p10", titolo: "La notazione scientifica e l'ordine di grandezza", html: `
<p>La distanza fra la Terra e il Sole è circa 150 000 000 000 m, il diametro di un globulo rosso circa 0,000 007 5 m. Numeri così si leggono e si confrontano male. Con le potenze di 10 si scrivono in modo compatto, 1,5 · 10<sup>11</sup> m e 7,5 · 10<sup>−6</sup> m.</p>
<h3>La notazione scientifica</h3>
<div class="definizione"><b>Definizione</b>
Un numero è scritto in <b>notazione scientifica</b> se è il prodotto di un numero decimale <span class="mat"><i>d</i></span>, detto <b>coefficiente</b>, con <span class="mat">1 ≤ <i>d</i> &lt; 10</span>, per una potenza di 10 con esponente intero.
<p class="formula"><i>d</i> · 10<sup><i>n</i></sup> &emsp; con 1 ≤ <i>d</i> &lt; 10, <i>n</i> ∈ ℤ</p></div>
<div class="esempio"><b>Esempio</b>3,2 · 10<sup>5</sup> e 9,01 · 10<sup>−3</sup> sono in notazione scientifica.<br>32 · 10<sup>4</sup> e 0,5 · 10<sup>2</sup> non lo sono, perché 32 ≥ 10 e 0,5 &lt; 1.</div>
<p>Per scrivere un numero in notazione scientifica si sposta la virgola finché resta una sola cifra diversa da 0 prima di essa. Se la virgola si sposta di <span class="mat"><i>n</i></span> posti verso <b>sinistra</b> si moltiplica per 10<sup><i>n</i></sup>, se si sposta di <span class="mat"><i>n</i></span> posti verso <b>destra</b> si moltiplica per 10<sup>−<i>n</i></sup>.</p>
<div class="esempio"><b>Esempio</b>4 560 000 = 4,56 · 10<sup>6</sup> (virgola di 6 posti a sinistra)<br>0,000 72 = 7,2 · 10<sup>−4</sup> (virgola di 4 posti a destra)<br>63 · 10<sup>5</sup> = 6,3 · 10 · 10<sup>5</sup> = 6,3 · 10<sup>6</sup></div>
<div class="anim" data-anim="notazione" data-titolo="Spostare la virgola con le potenze di 10"></div>
<p>Per moltiplicare o dividere numeri in notazione scientifica si opera separatamente sui coefficienti e sulle potenze di 10, poi si sistema il risultato.</p>
<div class="esempio"><b>Esempio</b>(3 · 10<sup>4</sup>) · (5 · 10<sup>−7</sup>) = 15 · 10<sup>−3</sup> = 1,5 · 10<sup>−2</sup><br>(8 · 10<sup>9</sup>) : (2,5 · 10<sup>3</sup>) = 3,2 · 10<sup>6</sup></div>

<h3>L'ordine di grandezza</h3>
<p>Spesso per confrontare due grandezze basta sapere “quante cifre” hanno, cioè a quale potenza di 10 sono vicine.</p>
<div class="definizione"><b>Definizione</b>
L'<b>ordine di grandezza</b> di un numero è la potenza di 10 più vicina al numero.</div>
<p>“Più vicina” vuol dire che la <b>distanza</b>, cioè la differenza, fra il numero e quella potenza di 10 è la più piccola. Vediamo come si decide con il numero 4, che sta fra 10<sup>0</sup> = 1 e 10<sup>1</sup> = 10.</p>
<ol class="passaggi">
<li>Distanza da 1. &emsp; <span class="nw">4 − 1 = <span class="c1">3</span></span></li>
<li>Distanza da 10. &emsp; <span class="nw">10 − 4 = <span class="c2">6</span></span></li>
<li>Poiché <span class="c1">3</span> &lt; <span class="c2">6</span>, il numero 4 è più vicino a 1, quindi il suo ordine di grandezza è 10<sup>0</sup>.</li>
</ol>
<p>Il punto di mezzo fra 1 e 10 è <span class="fr"><span>1 + 10</span><span>2</span></span> = <span class="c3">5,5</span>. I numeri minori di 5,5 sono più vicini a 1, quelli maggiori sono più vicini a 10. Lo stesso vale fra 10 e 100 (il punto di mezzo è 55), fra 100 e 1000 (550) e così via. Per convenzione, a 5,5 si assegna la potenza superiore.</p>
<div class="regola"><b>Regola</b>
Il numero <span class="mat"><i>d</i> · 10<sup><i>n</i></sup></span>, in notazione scientifica, ha ordine di grandezza
<ul><li>10<sup><i>n</i></sup> se <span class="mat"><i>d</i> &lt; 5,5</span>;</li><li>10<sup><i>n</i>+1</sup> se <span class="mat"><i>d</i> ≥ 5,5</span>.</li></ul></div>
<table class="tab"><tr><th>Numero</th><th>In notazione scientifica</th><th>Ordine di grandezza</th><th>Perché</th></tr>
<tr><td>2700</td><td>2,7 · 10<sup>3</sup></td><td>10<sup>3</sup></td><td>2,7 &lt; 5,5</td></tr>
<tr><td>72 000 000</td><td>7,2 · 10<sup>7</sup></td><td>10<sup>8</sup></td><td>7,2 ≥ 5,5</td></tr>
<tr><td>0,0061</td><td>6,1 · 10<sup>−3</sup></td><td>10<sup>−2</sup></td><td>6,1 ≥ 5,5</td></tr>
<tr><td>0,00029</td><td>2,9 · 10<sup>−4</sup></td><td>10<sup>−4</sup></td><td>2,9 &lt; 5,5</td></tr></table>
<div class="attenzione"><b>Attenzione</b>Con i numeri molto piccoli si ragiona allo stesso modo. 0,0061 sta fra 10<sup>−3</sup> = 0,001 e 10<sup>−2</sup> = 0,01; la distanza da 0,01 è 0,0039, quella da 0,001 è 0,0051, quindi l'ordine di grandezza è 10<sup>−2</sup>.</div>
<p>Due numeri “differiscono di <span class="mat"><i>k</i></span> ordini di grandezza” se il rapporto fra i loro ordini di grandezza è 10<sup><i>k</i></sup>. Per esempio un'auto (circa 10<sup>3</sup> kg) e una formica (circa 10<sup>−5</sup> kg) differiscono di 8 ordini di grandezza.</p>


<h3>I prefissi del Sistema Internazionale</h3>
<p>Nelle unità di misura le potenze di 10 si indicano spesso con un <b>prefisso</b> davanti al nome dell'unità. Per esempio 3 km = 3 · 10<sup>3</sup> m e 5 μs = 5 · 10<sup>−6</sup> s.</p>
<table class="tab"><tr><th>Prefisso</th><th>Simbolo</th><th>Fattore</th><th>Esempio</th></tr>
<tr><td>giga</td><td>G</td><td>10<sup>9</sup></td><td>una grande centrale elettrica produce circa 1 GW = 10<sup>9</sup> W</td></tr>
<tr><td>mega</td><td>M</td><td>10<sup>6</sup></td><td>1 MW = 10<sup>6</sup> W</td></tr>
<tr><td>kilo</td><td><i>k</i></td><td>10<sup>3</sup></td><td>1 kg = 10<sup>3</sup> g</td></tr>
<tr><td>milli</td><td><i>m</i></td><td>10<sup>−3</sup></td><td>1 mm = 10<sup>−3</sup> m</td></tr>
<tr><td>micro</td><td>μ</td><td>10<sup>−6</sup></td><td>un capello è spesso circa 70 μm = 7 · 10<sup>−5</sup> m</td></tr>
<tr><td>nano</td><td><i>n</i></td><td>10<sup>−9</sup></td><td>un virus misura circa 100 nm = 10<sup>−7</sup> m</td></tr></table>
<div class="attenzione"><b>Attenzione</b>Molte calcolatrici scrivono i numeri in notazione scientifica con la lettera E. Sul display 4.2E−05 significa 4,2 · 10<sup>−5</sup>, e 6.02E23 significa 6,02 · 10<sup>23</sup>.</div>
<div class="curiosita" data-img="scala10" data-titolo="Dall'atomo alla stella">
<p>Mettiamo in fila alcune lunghezze. Un atomo misura circa 10<sup>−10</sup> m, un batterio 10<sup>−6</sup> m, una formica 10<sup>−3</sup> m, una persona circa 10<sup>0</sup> m, cioè 1 m. Il diametro della Terra è circa 1,3 · 10<sup>7</sup> m, la distanza Terra–Sole 1,5 · 10<sup>11</sup> m, un anno luce 9,5 · 10<sup>15</sup> m.</p>
<p>Fra l'atomo e l'anno luce ci sono circa 26 ordini di grandezza. Senza le potenze di 10 dovremmo scrivere numeri con decine di zeri, ed è proprio per questo che gli scienziati hanno inventato la notazione scientifica e i prefissi come kilo (10<sup>3</sup>), mega (10<sup>6</sup>), milli (10<sup>−3</sup>), micro (10<sup>−6</sup>) e nano (10<sup>−9</sup>).</p>
</div>
`},
  ]
};
