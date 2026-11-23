/* =====================================================================
   CAPITOLO 2 – I NUMERI INTERI &emsp; (testi originali)
   Stessa struttura del capitolo 1: storia (apertura), paragrafi, sintesi (chiusura).
   ===================================================================== */
LIBRO.capitoli.cap2 = {
  id: "cap2", anno: 1, numero: 2,
  titolo: "I numeri interi",
  sottotitolo: "Sopra e sotto lo zero: debiti e crediti, temperature, quote e anni con il segno.",
  pdf: "pdf/capitolo-2-numeri-interi.pdf",

  /* --------------------- STORIA DELLA MATEMATICA (apertura) --------------------- */
  storia: `
<p class="storia-domanda">A che cosa serve un numero “minore di niente”?</p>
<p>Con i numeri naturali sappiamo contare ciò che <b>c'è</b>. Ma i mercanti, i banchieri e gli esattori delle tasse avevano un problema diverso, cioè annotare ciò che <b>manca</b>. Se possiedo 30 monete e ne devo 50, quanto “ho”? Per rispondere servono numeri che indichino un <b>debito</b>, cioè una quantità al di sotto di un livello di riferimento (lo zero). Per secoli questi numeri furono usati nei conti ma guardati con sospetto dai matematici; solo più tardi sono diventati numeri a pieno titolo, utili anche per temperature, altitudini e date.</p>
<ol class="linea-tempo">
<li><span class="data">circa II secolo a.C. – III secolo d.C.</span>In <b>Cina</b> il trattato <i>Nove capitoli sull'arte matematica</i> dà le regole per sommare e sottrarre quantità positive e negative con le <b>bacchette da calcolo</b>; il commentatore <b>Liu Hui</b> usa bacchette rosse per le positive e nere per le negative.</li>
<li><span class="data">628 d.C.</span>In <b>India</b> l'astronomo <b>Brahmagupta</b> scrive le regole per calcolare con i “beni” (numeri positivi), i “debiti” (numeri negativi) e lo zero. C'è già la regola del prodotto dei segni, per esempio “il prodotto di due debiti è un bene”.</li>
<li><span class="data">1202 – 1225</span><b>Leonardo Fibonacci</b>, mercante pisano, incontra problemi di denaro con una soluzione negativa e la interpreta come una <b>perdita</b>, cioè un debito.</li>
<li><span class="data">1494</span>Il frate <b>Luca Pacioli</b> descrive la <b>partita doppia</b>, il metodo dei mercanti veneziani per registrare “dare” e “avere” su due colonne, che si bilanciano come numeri opposti.</li>
<li><span class="data">1545 – 1637</span><b>Gerolamo Cardano</b> nella sua <i>Ars magna</i> accetta le soluzioni negative delle equazioni ma le chiama “numeri finti”; un secolo dopo <b>Cartesio</b> le chiama ancora “radici false”.</li>
<li><span class="data">1742</span>Lo svedese <b>Anders Celsius</b> propone una scala di 100 gradi per i termometri. Poco dopo la scala viene capovolta, con lo zero al ghiaccio che fonde, e le temperature invernali diventano numeri negativi.</li>
<li><span class="data">1770</span><b>Leonhard Euler</b> pubblica un manuale di algebra per principianti in cui spiega i numeri negativi come debiti e giustifica perché “meno per meno fa più”.</li>
<li><span class="data">1867</span>Il tedesco <b>Hermann Hankel</b> enuncia il <b>principio di permanenza delle proprietà formali</b>. Allargando un insieme di numeri, le regole vanno scelte in modo che le vecchie proprietà continuino a valere.</li>
<li><span class="data">XX secolo</span>Si diffonde il simbolo <b>ℤ</b> per l'insieme dei numeri interi, dall'iniziale della parola tedesca <i>Zahlen</i>, che significa “numeri”.</li>
</ol>
<p class="storia-capitolo"><b>In questo capitolo</b> costruiamo l'insieme dei numeri interi aggiungendo ai naturali i numeri negativi. Impareremo a rappresentarli su una retta e a confrontarli, a eseguire con loro le operazioni e le potenze, e scopriremo che in ℤ la sottrazione è sempre possibile, come serviva ai mercanti che dovevano registrare un debito. Infine studieremo le leggi di monotonia, cioè che cosa succede a uguaglianze e disuguaglianze quando si somma o si moltiplica per uno stesso numero.</p>
`,

  /* ------------------------- TEORIA IN SINTESI (chiusura) ------------------------- */
  sintesi: `
<div class="sint-blocco"><h3><span>1</span>Che cosa sono i numeri interi</h3>
<p class="formula">ℤ = {…, −3, −2, −1, 0, +1, +2, +3, …}</p>
<ul class="sint-lista">
<li><span class="mat">ℤ<sup>+</sup></span><span class="nota">interi <b>positivi</b></span></li>
<li><span class="mat">ℤ<sup>−</sup></span><span class="nota">interi <b>negativi</b></span></li>
<li><span class="mat">ℤ<sub>0</sub><sup>+</sup></span><span class="nota">interi <b>non negativi</b> (positivi e zero), che corrispondono a ℕ</span></li>
</ul>
<p><b>Opposti</b> sono due interi con segno diverso e stesso valore assoluto, come +7 e −7. Due interi diversi da 0 sono <b>concordi</b> se hanno lo stesso segno, <b>discordi</b> se hanno segno diverso.</p>
<p><b>Valore assoluto</b>. <span class="mat">|a| = <i>a</i></span> se <span class="mat"><i>a</i> ≥ 0</span> e <span class="mat">|a| = −a</span> se <span class="mat"><i>a</i> &lt; 0</span>. Per esempio |−9| = 9 e |+4| = 4.</p>
<p><b>Confronto</b>. Sulla retta orientata è maggiore il numero più a destra.</p>
<ul class="sint-lista">
<li><span class="mat">+8 &gt; +3</span><span class="nota">fra due positivi è maggiore quello con valore assoluto maggiore</span></li>
<li><span class="mat">−3 &gt; −8</span><span class="nota">fra due negativi è maggiore quello con valore assoluto <b>minore</b></span></li>
<li><span class="mat">−8 &lt; 0 &lt; +3</span><span class="nota">lo zero sta fra i negativi e i positivi</span></li>
</ul>
<p>ℤ è ordinato, discreto e infinito; ogni intero <span class="mat"><i>x</i></span> ha il precedente <span class="mat"><i>x</i> − 1</span> e il successivo <span class="mat"><i>x</i> + 1</span>.</p></div>

<div class="sint-blocco"><h3><span>2</span>L'addizione e la sottrazione</h3>
<table class="tab"><tr><th>Addendi</th><th>Valore assoluto della somma</th><th>Segno della somma</th><th>Esempio</th></tr>
<tr><td>concordi</td><td>somma dei valori assoluti</td><td>quello comune</td><td>(−6) + (−5) = −11</td></tr>
<tr><td>discordi</td><td>differenza dei valori assoluti (maggiore meno minore)</td><td>quello dell'addendo con valore assoluto maggiore</td><td>(−9) + (+4) = −5</td></tr></table>
<p class="formula"><i>a</i> − <i>b</i> = <i>a</i> + (−<i>b</i>)</p>
<p>La differenza è la somma del minuendo con l'opposto del sottraendo, per esempio (+3) − (−7) = +3 + 7 = +10. In ℤ la sottrazione è sempre possibile. Addizione e sottrazione diventano un'unica operazione, l'<b>addizione algebrica</b>.</p>
<p><b>Parentesi</b>. Con il segno + davanti si eliminano lasciando i segni invariati; con il segno − davanti si eliminano cambiando tutti i segni interni.</p></div>

<div class="sint-blocco"><h3><span>3</span>La moltiplicazione e la divisione</h3>
<table class="tab-segni"><tr><th class="angolo">·&ensp;:</th><th>+</th><th>−</th></tr><tr><th>+</th><td>+</td><td>−</td></tr><tr><th>−</th><td>−</td><td>+</td></tr></table>
<p><b>Regola del prodotto dei segni</b>. Il prodotto (o il quoziente) di due interi ha per valore assoluto il prodotto (o il quoziente) dei valori assoluti, segno + se i numeri sono concordi, segno − se sono discordi. Con più fattori il prodotto è negativo se i fattori negativi sono in numero dispari.</p>
<div class="esempio"><b>Esempio</b>(−4) · (−6) = +24 &emsp; (+30) : (−5) = −6 &emsp; (−1)(−2)(−3) = −6</div>
<p>La divisione <span class="mat"><i>a</i> : <i>b</i></span> esiste in ℤ solo se <span class="mat"><i>b</i> ≠ 0</span> e <span class="mat">|a|</span> è multiplo di <span class="mat">|<i>b</i>|</span>. ℤ è un <b>ampliamento</b> di ℕ in cui valgono tutte le proprietà delle operazioni già note (principio di permanenza).</p></div>

<div class="sint-blocco"><h3><span>4</span>La potenza</h3>
<p>Il valore assoluto di <span class="mat"><i>a</i><sup><i>n</i></sup></span> è la potenza del valore assoluto della base. Il segno è <b>negativo solo se la base è negativa e l'esponente è dispari</b>.</p>
<ul class="sint-lista">
<li><span class="mat">(−2)<sup>4</sup> = +16</span><span class="nota">base negativa, esponente pari</span></li>
<li><span class="mat">(−2)<sup>3</sup> = −8</span><span class="nota">base negativa, esponente dispari</span></li>
<li><span class="mat">−2<sup>4</sup> = −16</span><span class="nota">la potenza si calcola prima del segno</span></li>
<li><span class="mat"><i>a</i><sup>0</sup> = 1</span><span class="nota">con <i>a</i> ≠ 0; 0<sup>0</sup> non è definita</span></li>
</ul>
<p>Valgono le cinque proprietà delle potenze di ℕ, cioè <span class="mat"><i>a</i><sup><i>m</i></sup> · <i>a</i><sup><i>n</i></sup> = <i>a</i><sup><i>m</i>+<i>n</i></sup></span>, <span class="mat"><i>a</i><sup><i>m</i></sup> : <i>a</i><sup><i>n</i></sup> = <i>a</i><sup><i>m</i>−<i>n</i></sup></span>, <span class="mat">(<i>a</i><sup><i>m</i></sup>)<sup><i>n</i></sup> = <i>a</i><sup><i>m</i>·<i>n</i></sup></span>, <span class="mat"><i>a</i><sup><i>n</i></sup> · <i>b</i><sup><i>n</i></sup> = (<i>a</i> · <i>b</i>)<sup><i>n</i></sup></span>, <span class="mat"><i>a</i><sup><i>n</i></sup> : <i>b</i><sup><i>n</i></sup> = (<i>a</i> : <i>b</i>)<sup><i>n</i></sup></span>.</p></div>

<div class="sint-blocco"><h3><span>5</span>Le leggi di monotonia</h3>
<table class="tab"><tr><th>Se</th><th>Prima legge</th><th>Seconda legge</th></tr>
<tr><td><i>a</i> = <i>b</i></td><td><i>a</i> + <i>c</i> = <i>b</i> + <i>c</i></td><td><i>a</i> · <i>c</i> = <i>b</i> · <i>c</i> (con <i>c</i> ≠ 0)</td></tr>
<tr><td><i>a</i> &lt; <i>b</i></td><td><i>a</i> + <i>c</i> &lt; <i>b</i> + <i>c</i></td><td><i>a</i> · <i>c</i> &lt; <i>b</i> · <i>c</i> se <i>c</i> &gt; 0 &emsp; a · <i>c</i> &gt; <i>b</i> · <i>c</i> se <i>c</i> &lt; 0</td></tr>
<tr><td><i>a</i> &gt; <i>b</i></td><td><i>a</i> + <i>c</i> &gt; <i>b</i> + <i>c</i></td><td><i>a</i> · <i>c</i> &gt; <i>b</i> · <i>c</i> se <i>c</i> &gt; 0 &emsp; a · <i>c</i> &lt; <i>b</i> · <i>c</i> se <i>c</i> &lt; 0</td></tr></table>
<p>Moltiplicando i due membri di una disuguaglianza per un numero <b>negativo</b> si deve <b>cambiare il verso</b>. Le leggi inverse si chiamano <b>leggi di cancellazione</b>.</p></div>
`,

  /* ------------------------------ TEORIA ------------------------------ */
  paragrafi: [
  { n: 1, id: "p1", titolo: "Che cosa sono i numeri interi", html: `
<figure class="fig-testo" data-img="termometro"><figcaption>Sul termometro i numeri hanno un segno, a seconda che siano sopra o sotto lo zero.</figcaption></figure><p>Molte grandezze si misurano rispetto a un <b>livello di riferimento</b>. Sul termometro il riferimento è lo 0 °C, la temperatura a cui il ghiaccio fonde. Se fuori ci sono 12 gradi sopra lo zero scriviamo <span class="mat">+12 °C</span>, se ce ne sono 4 sotto lo zero scriviamo <span class="mat">−4 °C</span>. Allo stesso modo un sub a 20 metri sotto il livello del mare si trova a quota −20 m, mentre la vetta di un monte alto 1500 metri è a quota +1500 m.</p>
<p>Se a ogni numero naturale diverso da zero mettiamo davanti il segno + oppure il segno −, otteniamo due nuovi numeri. Per esempio da 7 si ottengono <span class="mat">+7</span> e <span class="mat">−7</span>. I numeri con il segno + si chiamano <b>positivi</b>, quelli con il segno − si chiamano <b>negativi</b>. Lo <b>0</b> non ha segno: non è né positivo né negativo.</p>
<div class="anim" data-anim="termometro" data-titolo="Il termometro: sopra e sotto lo zero"></div>

<h3>L'insieme ℤ</h3>
<div class="definizione"><b>Definizione</b>
I numeri positivi, i numeri negativi e lo zero formano l'insieme dei <b>numeri interi</b>, che si indica con <span class="mat">ℤ</span>.
<p class="formula">ℤ = {…, −4, −3, −2, −1, 0, +1, +2, +3, +4, …}</p></div>
<p>Useremo anche questi simboli per alcune parti di ℤ.</p>
<table class="tab"><tr><th>Simbolo</th><th>Che cosa contiene</th><th>Esempi</th></tr>
<tr><td>ℤ<sup>+</sup></td><td>gli interi positivi</td><td>+1, +2, +3, …</td></tr>
<tr><td>ℤ<sup>−</sup></td><td>gli interi negativi</td><td>−1, −2, −3, …</td></tr>
<tr><td>ℤ<sub>0</sub><sup>+</sup></td><td>gli interi non negativi, cioè i positivi e lo zero</td><td>0, +1, +2, +3, …</td></tr></table>
<p>A ogni numero naturale corrisponde uno e un solo intero non negativo, e viceversa. A 0 corrisponde 0, a 1 corrisponde +1, a 2 corrisponde +2 e così via. Per questo un intero positivo si scrive spesso anche <b>senza il segno +</b>, per esempio 15 indica sia il naturale 15 sia l'intero +15.</p>

<h3>Opposti, concordi, discordi</h3>
<div class="definizione"><b>Definizione</b>
Due numeri interi ottenuti dallo stesso numero naturale ma con segno diverso si dicono <b>opposti</b>, come <span class="mat">+13</span> e <span class="mat">−13</span>. Lo 0 si considera opposto di se stesso.<br>
Due interi diversi da 0 sono <b>concordi</b> se hanno lo stesso segno, <b>discordi</b> se hanno segno diverso.</div>
<div class="esempio"><b>Esempio</b>+4 e +11 sono concordi; −2 e −30 sono concordi; +6 e −1 sono discordi; +9 e −9 sono discordi e opposti.</div>

<h3>Il valore assoluto</h3>
<div class="definizione"><b>Definizione</b>
Il <b>valore assoluto</b> (o <b>modulo</b>) di un numero intero <span class="mat"><i>a</i></span>, che si indica con <span class="mat">|a|</span>, è
<ul><li>il numero stesso, se <span class="mat"><i>a</i></span> è positivo o è zero;</li>
<li>l'opposto del numero, se <span class="mat"><i>a</i></span> è negativo.</li></ul></div>
<p>In pratica il valore assoluto è il numero “senza segno”, e non è mai negativo. Di solito lo scriviamo senza il segno +.</p>
<div class="esempio"><b>Esempio</b>|+8| = 8 &emsp; |−15| = 15 &emsp; |0| = 0</div>
<p>Due numeri opposti hanno lo stesso valore assoluto. Per esempio |+6| = |−6| = 6.</p>

<h3>I numeri interi sulla retta</h3>
<p>I naturali si rappresentano su una semiretta; per gli interi serve una <b>retta orientata</b>. Fissiamo un punto, l'<b>origine</b>, a cui associamo lo 0, e un segmento come unità di misura. Poi</p>
<ul>
<li>ai punti che distano 1, 2, 3, … unità dall'origine <b>verso destra</b> associamo +1, +2, +3, …;</li>
<li>ai punti che distano 1, 2, 3, … unità dall'origine <b>verso sinistra</b> associamo −1, −2, −3, ….</li>
</ul>
<p>Il valore assoluto di un numero è la sua <b>distanza dall'origine</b>. Due numeri opposti stanno alla stessa distanza da 0, uno a destra e uno a sinistra, cioè sono <b>simmetrici</b> rispetto all'origine.</p>
<div class="anim" data-anim="rettaz" data-titolo="Sulla retta: opposto e valore assoluto"></div>

<h3>Il confronto fra numeri interi</h3>
<p>La retta è orientata verso destra, quindi ogni numero è <b>minore</b> di tutti quelli che stanno alla sua destra e <b>maggiore</b> di tutti quelli che stanno alla sua sinistra. Ne seguono queste regole.</p>
<div class="regola"><b>Regola</b>
<ul>
<li>Fra due numeri positivi è maggiore quello con valore assoluto maggiore, per esempio +9 &gt; +4.</li>
<li>Fra due numeri negativi è maggiore quello con valore assoluto <b>minore</b>, per esempio −4 &gt; −9.</li>
<li>Ogni numero positivo è maggiore di ogni numero negativo, per esempio +1 &gt; −100.</li>
<li>Lo 0 è maggiore di ogni negativo e minore di ogni positivo.</li>
</ul></div>
<div class="attenzione"><b>Attenzione</b>Con i negativi l'intuizione inganna. −20 °C è una temperatura più bassa di −2 °C, quindi −20 &lt; −2, anche se 20 è maggiore di 2.</div>
<p>Dati due interi <span class="mat"><i>a</i></span> e <span class="mat"><i>b</i></span>, vale sempre una e una sola delle relazioni <span class="mat"><i>a</i> &lt; <i>b</i></span>, <span class="mat"><i>a</i> = <i>b</i></span>, <span class="mat"><i>a</i> &gt; b</span>. Per questo ℤ è un insieme <b>ordinato</b>.</p>
<p>Ogni intero <span class="mat"><i>x</i></span> ha un <b>successivo</b> <span class="mat"><i>x</i> + 1</span> e un <b>precedente</b> <span class="mat"><i>x</i> − 1</span>. Per esempio il precedente di −6 è −7 e il successivo di −6 è −5. A differenza di quanto accade in ℕ, <b>anche lo 0 ha un precedente</b>, che è −1. Quindi ℤ non ha né un numero più piccolo di tutti né uno più grande di tutti: è un insieme <b>infinito</b> in entrambe le direzioni. Inoltre fra un intero e il suo successivo non ci sono altri interi, quindi anche ℤ, come ℕ, è un insieme <b>discreto</b>.</p>

<div class="curiosita" data-img="marmorto" data-titolo="Sotto il livello del mare">
<p>Le quote si misurano a partire dal livello medio del mare, che vale 0 metri. La vetta dell'Everest è a circa +8849 m, ma esistono luoghi asciutti con quota negativa! La riva del <b>Mar Morto</b>, fra Israele e Giordania, si trova a circa −430 m ed è il punto di terraferma più basso del pianeta. Le sue acque sono così salate che si galleggia senza alcuno sforzo.</p>
<p>In Italia la zona più bassa è vicino a Jolanda di Savoia, nel Ferrarese, a circa −3 m. Sotto il mare si scende molto di più. Il punto più profondo conosciuto degli oceani, nella <b>Fossa delle Marianne</b>, è a circa −10 900 m.</p>
<p>Fra la cima dell'Everest e il fondo della Fossa delle Marianne ci sono quindi quasi 20 km di dislivello, cioè 8849 − (−10 900) = 19 749 metri. Per calcolarlo serve proprio la sottrazione fra numeri interi che studieremo nel prossimo paragrafo.</p>
</div>
`},

  { n: 2, id: "p2", titolo: "L'addizione e la sottrazione", html: `
<p>Pensiamo a un conto in banca. Un versamento di 40 € è un numero positivo (+40), un prelievo di 25 € è un numero negativo (−25). Che cosa resta dopo il versamento e il prelievo? Per rispondere dobbiamo saper <b>sommare</b> due numeri interi.</p>

<h3>L'addizione</h3>
<div class="definizione"><b>Definizione</b>
La <b>somma di due numeri concordi</b> è un numero che ha
<ul><li>per valore assoluto la <b>somma</b> dei valori assoluti;</li>
<li>per segno lo stesso segno dei due numeri.</li></ul></div>
<div class="esempio"><b>Esempio</b>(+6) + (+9) = +(6 + 9) = +15 &emsp; (−8) + (−5) = −(8 + 5) = −13</div>
<div class="definizione"><b>Definizione</b>
La <b>somma di due numeri discordi</b> è un numero che ha
<ul><li>per valore assoluto la <b>differenza</b> fra il maggiore e il minore dei valori assoluti;</li>
<li>per segno quello del numero che ha valore assoluto maggiore.</li></ul>
La somma di due numeri opposti è 0.</div>
<div class="esempio"><b>Esempio</b>(+40) + (−25) = +(40 − 25) = +15 &emsp; (−18) + (+7) = −(18 − 7) = −11 &emsp; (−12) + (+12) = 0</div>
<p>Nel conto in banca restano quindi 15 €. Di solito si scrive in modo più breve, togliendo le parentesi e il segno dell'addizione, come in −18 + 7 = −11 oppure −8 − 5 = −13.</p>
<p>L'addizione è un'<b>operazione interna</b> in ℤ e valgono le proprietà già note in ℕ, cioè la <b>commutativa</b> e l'<b>associativa</b>; lo 0 è l'<b>elemento neutro</b>. In più c'è una proprietà nuova: ogni intero ha un <b>opposto</b>, e la somma di un numero con il suo opposto dà l'elemento neutro 0, per esempio (−9) + (+9) = 0.</p>

<h3>Le somme sulla retta</h3>
<p>Per rappresentare <span class="mat"><i>a</i> + <i>b</i></span> sulla retta partiamo dal punto <span class="mat"><i>a</i></span> e ci spostiamo di <span class="mat">|<i>b</i>|</span> unità, <b>verso destra se <i>b</i> è positivo</b> e <b>verso sinistra se <i>b</i> è negativo</b>. Il punto di arrivo è la somma.</p>
<div class="anim" data-anim="somma" data-titolo="Addizione con i salti sulla retta"></div>

<h3>La sottrazione</h3>
<div class="definizione"><b>Definizione</b>
La <b>differenza</b> di due numeri interi è la somma del minuendo con l'<b>opposto del sottraendo</b>.
<p class="formula"><i>a</i> − <i>b</i> = <i>a</i> + (−<i>b</i>)</p></div>
<div class="esempio"><b>Esempio</b>(+10) − (+4) = (+10) + (−4) = +6 &emsp; (−3) − (−11) = (−3) + (+11) = +8</div>
<p>In pratica si eliminano le parentesi del sottraendo <b>cambiandogli il segno</b>, come in (+5) − (−2) = +5 + 2 = +7.</p>
<p>In ℕ la sottrazione <span class="mat">3 − 8</span> non si poteva eseguire; in ℤ invece</p>
<p class="formula">3 − 8 = (+3) + (−8) = −5</p>
<p>La sottrazione è quindi un'<b>operazione interna</b> in ℤ e non serve più la condizione che il minuendo sia maggiore o uguale al sottraendo. Vale anche la <b>proprietà invariantiva</b>, cioè <span class="mat"><i>a</i> − <i>b</i> = (<i>a</i> + <i>c</i>) − (<i>b</i> + <i>c</i>)</span> e <span class="mat"><i>a</i> − <i>b</i> = (<i>a</i> − <i>c</i>) − (<i>b</i> − <i>c</i>)</span>. Per esempio (−7) − (−4) = (−7 + 4) − (−4 + 4) = −3 − 0 = −3.</p>
<div class="attenzione"><b>Attenzione</b>La sottrazione non è commutativa nemmeno in ℤ. Infatti 5 − 9 = −4, mentre 9 − 5 = +4, quindi i due risultati sono opposti.</div>

<h3>L'addizione algebrica</h3>
<p>Poiché ogni sottrazione si può trasformare in un'addizione, in ℤ conviene considerare addizioni e sottrazioni come un'unica operazione, l'<b>addizione algebrica</b>; il suo risultato si chiama <b>somma algebrica</b>. Per calcolare una somma algebrica con le parentesi si può</p>
<ul>
<li>calcolare prima il contenuto delle parentesi, oppure</li>
<li><b>eliminare le parentesi</b>. Se davanti c'è il segno + i segni interni restano uguali; se davanti c'è il segno − i segni interni si cambiano tutti.</li>
</ul>
<div class="esempio"><b>Esempio</b>12 − (5 − 9 + 1) = 12 − 5 + 9 − 1 = +15 &emsp; e anche &emsp; 12 − (−3) = 12 + 3 = +15</div>

<div class="approfondimento"><b>Per approfondire · Anni avanti Cristo e dopo Cristo</b>
<p>Nel nostro calendario possiamo indicare gli anni avanti Cristo con numeri negativi e quelli dopo Cristo con numeri positivi. C'è però una particolarità, cioè <b>l'anno 0 non esiste</b>, perché all'anno 1 a.C. segue direttamente l'anno 1 d.C. Per questo, se un periodo comincia in un anno a.C. e finisce in un anno d.C., alla differenza fra i due numeri bisogna togliere 1.</p>
<p>Secondo la tradizione Roma fu fondata nel 753 a.C. Quanti anni sono trascorsi fino al 2026? Si ha 2026 − (−753) − 1 = 2026 + 753 − 1 = 2778 anni.</p>
<p>Gli antichi Greci contavano gli anni in <b>Olimpiadi</b>, periodi di 4 anni a partire dai primi giochi del 776 a.C. Dal 776 a.C. al 2026 sono trascorsi 2026 + 776 − 1 = 2801 anni. Poiché 2801 = 4 · 700 + 1, sono passate 700 Olimpiadi complete e il 2026 sarebbe il secondo anno della 701<sup><i>a</i></sup> Olimpiade.</p></div>

<div class="curiosita" data-img="registro" data-titolo="Essere “in rosso”">
<p>Si dice che un conto è “in rosso” quando il saldo è negativo, cioè quando si deve del denaro alla banca. L'espressione viene dall'abitudine dei contabili di scrivere i debiti e le perdite con l'inchiostro rosso e i crediti con quello nero.</p>
<p>Curiosamente nell'antica Cina valeva il contrario. Nel commento di Liu Hui ai <i>Nove capitoli</i> le bacchette da calcolo rosse indicavano le quantità positive e quelle nere le negative!</p>
<p>Anche oggi, nei fogli di calcolo, i numeri negativi si possono far comparire in rosso con un clic. Il colore cambia, ma l'idea resta la stessa. Un segno, o un colore, distingue ciò che si ha da ciò che si deve.</p>
</div>
`},

  { n: 3, id: "p3", titolo: "La moltiplicazione e la divisione", html: `
<h3>La moltiplicazione</h3>
<div class="definizione"><b>Definizione</b>
Il <b>prodotto</b> di due numeri interi è un intero che ha
<ul><li>per valore assoluto il prodotto dei valori assoluti;</li>
<li>per segno il segno <b>+</b> se i fattori sono <b>concordi</b>, il segno <b>−</b> se i fattori sono <b>discordi</b>.</li></ul>
Questa è la <b>regola del prodotto dei segni</b>.</div>
<table class="tab-segni"><tr><th class="angolo">·</th><th>+</th><th>−</th></tr><tr><th>+</th><td>+</td><td>−</td></tr><tr><th>−</th><td>−</td><td>+</td></tr></table>
<div class="esempio"><b>Esempio</b>(+4) · (+7) = +28 &emsp; (−6) · (−3) = +18 &emsp; (−5) · (+8) = −40 &emsp; (+9) · (−2) = −18</div>
<p>Spesso il punto della moltiplicazione si omette, e si scrive (−6)(−3) al posto di (−6) · (−3). In questo caso le parentesi sono indispensabili. Infatti (+4)(−7) è una moltiplicazione e vale −28, mentre +4 − 7 è un'addizione algebrica e vale −3. Si può scrivere anche 4(−7), ma non 4 − 7.</p>
<p>Se i fattori sono più di due, basta <b>contare i fattori negativi</b>.</p>
<ul>
<li>Se sono in numero <b>pari</b>, il prodotto è <b>positivo</b>, per esempio (−2)(+3)(−5) = +30, con 2 fattori negativi.</li>
<li>Se sono in numero <b>dispari</b>, il prodotto è <b>negativo</b>, per esempio (−1)(−2)(−3) = −6, con 3 fattori negativi.</li>
</ul>
<p>Moltiplicare un numero per −1 significa <b>cambiargli il segno</b>, cioè ottenere il suo opposto. Per esempio (+12)(−1) = −12. Allo stesso modo un segno − davanti a una parentesi equivale a moltiplicare per −1 tutto il contenuto, come in −(4 − 9) = (−1)(4 − 9) = −4 + 9 = +5.</p>
<p>La moltiplicazione è un'operazione <b>interna</b> in ℤ e valgono le proprietà già note, cioè la commutativa, l'associativa e la <b>distributiva</b> rispetto all'addizione algebrica. L'elemento neutro è +1, lo 0 è l'elemento assorbente e vale la <b>legge di annullamento del prodotto</b>.</p>
<div class="anim" data-anim="segni" data-titolo="Perché meno per meno fa più? Una regolarità"></div>

<h3>La divisione</h3>
<div class="definizione"><b>Definizione</b>
Se il secondo numero è diverso da 0 e il valore assoluto del primo è multiplo del valore assoluto del secondo, il <b>quoziente</b> di due numeri interi è un intero che ha
<ul><li>per valore assoluto il quoziente dei valori assoluti;</li>
<li>per segno quello dato dalla regola del prodotto dei segni.</li></ul></div>
<div class="esempio"><b>Esempio</b>(+56) : (+8) = +7 &emsp; (−36) : (−4) = +9 &emsp; (+42) : (−6) = −7 &emsp; (−20) : (+5) = −4</div>
<p>Per la divisione valgono la <b>proprietà invariantiva</b> e la <b>distributiva a destra</b> rispetto all'addizione algebrica. Per esempio (−48) : 12 = (−48 : 4) : (12 : 4) = −12 : 3 = −4 e (18 − 30) : (−6) = 18 : (−6) − 30 : (−6) = −3 + 5 = +2.</p>
<div class="attenzione"><b>Attenzione</b>Non vale invece la distributiva <b>a sinistra</b>. Per esempio 24 : (6 − 2) = 24 : 4 = 6, mentre 24 : 6 − 24 : 2 = 4 − 12 = −8.</div>
<p>Come in ℕ, la divisione <b>non</b> è un'operazione interna in ℤ. Per esempio (−17) : (+5) non ha risultato in ℤ, perché 17 non è multiplo di 5.</p>
<table class="tab"><tr><th>Caso</th><th>Risultato</th></tr>
<tr><td><i>a</i> : (+1)</td><td>a</td></tr>
<tr><td><i>a</i> : (−1)</td><td>−a, cioè l'opposto di a</td></tr>
<tr><td><i>a</i> : <i>a</i>, con <i>a</i> ≠ 0</td><td>+1</td></tr>
<tr><td>0 : <i>a</i>, con <i>a</i> ≠ 0</td><td>0</td></tr>
<tr><td><i>a</i> : 0, con <i>a</i> ≠ 0</td><td>non è definita (impossibile)</td></tr>
<tr><td>0 : 0</td><td>non è definita (indeterminata)</td></tr></table>

<h3>ℤ è un ampliamento di ℕ</h3>
<p><b>Ampliare</b> un insieme numerico significa aggiungere nuovi numeri per risolvere problemi che prima non avevano soluzione. ℤ contiene tutti i numeri di ℕ (gli interi non negativi) più i numeri negativi, ed è quindi un ampliamento di ℕ in cui la sottrazione è sempre possibile.</p>
<p>Quando si amplia un insieme si vuole però non perdere nulla di ciò che funzionava prima. È un po' come aggiungere un piano nuovo a una casa, dove si vuole che le stanze vecchie restino abitabili e che le scale le colleghino a quelle nuove. Questo è il <b>principio di permanenza delle proprietà formali</b>. Le regole delle operazioni in ℤ sono state scelte proprio per rispettarlo, e la regola del prodotto dei segni ne è l'esempio più famoso.</p>
<ul>
<li><b>(+) · (+) = +</b>, perché sugli interi positivi vogliamo ritrovare i risultati di ℕ. Per esempio (+3)(+5) = +15 come 3 · 5 = 15.</li>
<li><b>(−) · (+) = −</b>, perché moltiplicare per +4 deve restare un'addizione ripetuta. Infatti (−6)(+4) = (−6) + (−6) + (−6) + (−6) = −24.</li>
<li><b>(+) · (−) = −</b>, perché vogliamo che valga la proprietà commutativa. Infatti (+4)(−6) = (−6)(+4) = −24.</li>
<li><b>(−) · (−) = +</b>, perché vogliamo che valga la proprietà distributiva. Sappiamo che (−3) · 0 = 0. Scrivendo 0 = (+2) + (−2) si ottiene (−3)(+2) + (−3)(−2) = 0, cioè −6 + (−3)(−2) = 0. L'unico numero che sommato a −6 dà 0 è +6, quindi deve essere (−3)(−2) = +6.</li>
</ul>

<div class="curiosita" data-img="libri" data-titolo="Lo scrittore che non credeva al “meno per meno”">
<p>Lo scrittore francese <b>Stendhal</b> (1783 – 1842), autore di romanzi famosi come <i>Il rosso e il nero</i>, da ragazzo era bravissimo in matematica. Nella sua autobiografia racconta però di essere rimasto deluso perché nessuno dei suoi insegnanti sapeva spiegargli <b>perché</b> “meno per meno fa più”. Gli rispondevano soltanto che era la regola.</p>
<p>La spiegazione c'è, e l'hai vista sopra. La regola del prodotto dei segni non è un capriccio, ma l'unica scelta che permette alla proprietà distributiva di continuare a valere anche con i numeri negativi.</p>
<p>Si può anche ragionare con il tempo. Se una vasca si svuota di 3 litri al minuto (−3) e guardiamo come era 2 minuti fa (−2), la vasca conteneva 6 litri in più (+6). Infatti (−3)(−2) = +6.</p>
</div>
`},

  { n: 4, id: "p4", titolo: "La potenza", html: `
<p>Come in ℕ, la potenza di un intero con esponente naturale è un modo breve di scrivere un prodotto di fattori uguali, per esempio <span class="mat">(−2)<sup>3</sup> = (−2)(−2)(−2)</span>. Il segno del risultato si ricava dalla regola del prodotto dei segni contando i fattori negativi.</p>
<div class="definizione"><b>Definizione</b>
La <b>potenza</b> di un numero intero con esponente naturale è un intero che ha
<ul><li>per valore assoluto la potenza del valore assoluto della base;</li>
<li>per segno il segno <b>−</b> se la base è negativa e l'esponente è <b>dispari</b>, il segno <b>+</b> in tutti gli altri casi.</li></ul></div>
<table class="tab"><tr><th>Base</th><th>Esponente pari</th><th>Esponente dispari</th></tr>
<tr><td>positiva</td><td>(+3)<sup>2</sup> = +9</td><td>(+3)<sup>3</sup> = +27</td></tr>
<tr><td>negativa</td><td>(−3)<sup>2</sup> = +9</td><td>(−3)<sup>3</sup> = −27</td></tr></table>
<p>Per esempio (−2)<sup>4</sup> = (−2)(−2)(−2)(−2) = +16, perché ci sono 4 fattori negativi, un numero pari; invece (−2)<sup>5</sup> = −32, perché i fattori negativi sono 5, un numero dispari. In particolare <b>il quadrato di un intero non è mai negativo</b>.</p>
<div class="anim" data-anim="potenza" data-titolo="Il segno di una potenza"></div>

<div class="attenzione"><b>Attenzione</b>La potenza ha la precedenza sul segno. Se la base negativa non è fra parentesi, l'esponente si riferisce solo al numero e non al segno che lo precede.
<p class="formula">−3<sup>2</sup> = −(3 · 3) = −9 &emsp; mentre &emsp; (−3)<sup>2</sup> = (−3)(−3) = +9</p></div>
<p>I casi particolari sono gli stessi di ℕ.</p>
<ul>
<li><span class="mat"><i>a</i><sup>1</sup> = <i>a</i></span>, per esempio (−7)<sup>1</sup> = −7;</li>
<li><span class="mat"><i>a</i><sup>0</sup> = 1</span> se <span class="mat"><i>a</i> ≠ 0</span>, per esempio (−7)<sup>0</sup> = +1;</li>
<li><span class="mat">0<sup><i>n</i></sup> = 0</span> se <span class="mat"><i>n</i> ≠ 0</span>, mentre <span class="mat">0<sup>0</sup></span> non è definita.</li>
</ul>
<p>Le potenze di −1 sono speciali, perché valgono +1 se l'esponente è pari e −1 se è dispari.</p>

<h3>Le proprietà delle potenze</h3>
<p>In ℤ valgono le stesse proprietà delle potenze viste in ℕ.</p>
<table class="tab"><tr><th>Proprietà</th><th>Esempio in ℤ</th></tr>
<tr><td><i>a</i><sup><i>m</i></sup> · <i>a</i><sup><i>n</i></sup> = <i>a</i><sup><i>m</i>+<i>n</i></sup></td><td>(−2)<sup>3</sup> · (−2)<sup>4</sup> = (−2)<sup>7</sup></td></tr>
<tr><td><i>a</i><sup><i>m</i></sup> : <i>a</i><sup><i>n</i></sup> = <i>a</i><sup><i>m</i>−<i>n</i></sup>, con <i>m</i> ≥ <i>n</i> e <i>a</i> ≠ 0</td><td>(−5)<sup>9</sup> : (−5)<sup>6</sup> = (−5)<sup>3</sup></td></tr>
<tr><td>(<i>a</i><sup><i>m</i></sup>)<sup><i>n</i></sup> = <i>a</i><sup><i>m</i>·<i>n</i></sup></td><td>[(−3)<sup>2</sup>]<sup>4</sup> = (−3)<sup>8</sup></td></tr>
<tr><td><i>a</i><sup><i>n</i></sup> · <i>b</i><sup><i>n</i></sup> = (<i>a</i> · <i>b</i>)<sup><i>n</i></sup></td><td>(−4)<sup>3</sup> · (+2)<sup>3</sup> = (−8)<sup>3</sup></td></tr>
<tr><td><i>a</i><sup><i>n</i></sup> : <i>b</i><sup><i>n</i></sup> = (<i>a</i> : <i>b</i>)<sup><i>n</i></sup>, con <i>b</i> ≠ 0 e |a| multiplo di |<i>b</i>|</td><td>(−18)<sup>5</sup> : (+6)<sup>5</sup> = (−3)<sup>5</sup></td></tr></table>
<p>Quando le basi sono <b>opposte</b> conviene prima renderle uguali.</p>
<ul>
<li>Se l'esponente è pari si può cambiare il segno della base, per esempio (−6)<sup>4</sup> = (+6)<sup>4</sup>.</li>
<li>Se l'esponente è dispari si può “portare fuori” il segno, per esempio (−6)<sup>3</sup> = −6<sup>3</sup>.</li>
</ul>
<div class="esempio"><b>Esempio</b>(−6)<sup>4</sup> · 6<sup>3</sup> = 6<sup>4</sup> · 6<sup>3</sup> = 6<sup>7</sup> &emsp; (−6)<sup>5</sup> : 6<sup>2</sup> = −6<sup>5</sup> : 6<sup>2</sup> = −6<sup>3</sup></div>

<h3>Le espressioni con i numeri interi</h3>
<p>Nelle espressioni con i numeri interi si seguono le stesse regole delle espressioni in ℕ. Si calcolano prima le parentesi (tonde, poi quadre, poi graffe) e, al loro interno, prima le potenze, poi moltiplicazioni e divisioni da sinistra a destra, infine le addizioni algebriche.</p>
<div class="esempio"><b>Esempio</b>[(−2)<sup>3</sup> + 5] · (−4) − (−6)<sup>2</sup> : 9 = [−8 + 5] · (−4) − 36 : 9 = (−3)(−4) − 4 = +12 − 4 = +8</div>

<div class="curiosita" data-img="lampadina" data-titolo="Acceso, spento, acceso… le potenze di −1">
<p>Immagina una lampadina comandata da un interruttore. Ogni volta che premi il pulsante, lo stato si inverte. Se +1 vuol dire “accesa” e −1 “spenta”, premere il pulsante equivale a moltiplicare per −1.</p>
<p>Partendo da accesa (+1), dopo <span class="mat"><i>n</i></span> pressioni la lampadina è nello stato <span class="mat">(−1)<sup><i>n</i></sup></span>. Dopo 2, 4, 6, … pressioni è di nuovo accesa (+1), dopo 1, 3, 5, … pressioni è spenta (−1). Quindi, per sapere come sarà dopo 2027 pressioni, non serve contarle una per una. Basta osservare che 2027 è dispari, perciò (−1)<sup>2027</sup> = −1 e la lampadina sarà spenta.</p>
<p>Questa “altalena” dei segni si usa spesso in matematica e in informatica per indicare qualcosa che si alterna, come i turni di due giocatori.</p>
</div>
`},

  { n: 5, id: "p5", titolo: "Le leggi di monotonia", html: `
<p>Le uguaglianze e le disuguaglianze fra numeri interi hanno due proprietà fondamentali, una per l'addizione e una per la moltiplicazione, chiamate <b>leggi di monotonia</b>. Le useremo moltissimo per risolvere equazioni e disequazioni.</p>
<figure class="fig-testo" data-img="bilancia"><figcaption>Una bilancia in equilibrio resta in equilibrio se aggiungiamo lo stesso peso sui due piatti.</figcaption></figure>
<h3>Prima legge di monotonia</h3>
<div class="regola"><b>Prima legge di monotonia</b>
Un'uguaglianza o una disuguaglianza resta valida se ai due membri si <b>aggiunge uno stesso numero</b>.
<p class="formula"><i>a</i> = <i>b</i> &ensp;→&ensp; <i>a</i> + <i>c</i> = <i>b</i> + <i>c</i> &emsp;&emsp; <i>a</i> &lt; <i>b</i> &ensp;→&ensp; <i>a</i> + <i>c</i> &lt; <i>b</i> + <i>c</i></p></div>
<div class="esempio"><b>Esempio</b>Da −4 &lt; +6, aggiungendo −9 ai due membri, si ottiene −4 + (−9) &lt; +6 + (−9), cioè −13 &lt; −3, che è ancora vera.</div>
<p>Aggiungere un numero equivale a spostare entrambi i numeri sulla retta della stessa quantità, nella stessa direzione. Per questo il loro ordine non cambia.</p>

<h3>Seconda legge di monotonia per le uguaglianze</h3>
<div class="regola"><b>Seconda legge per le uguaglianze</b>
Un'uguaglianza resta valida se i due membri si <b>moltiplicano per uno stesso numero diverso da 0</b>.
<p class="formula"><i>a</i> = <i>b</i> &ensp;→&ensp; <i>a</i> · <i>c</i> = <i>b</i> · <i>c</i> &emsp; con <i>c</i> ≠ 0</p></div>
<div class="esempio"><b>Esempio</b>Da 15 = 9 + 6, moltiplicando per −3, si ottiene 15 · (−3) = (9 + 6) · (−3). Entrambi i membri valgono −45.</div>

<h3>Seconda legge di monotonia per le disuguaglianze</h3>
<div class="regola"><b>Seconda legge per le disuguaglianze</b>
Se si moltiplicano i due membri di una disuguaglianza per un numero <b>positivo</b>, la disuguaglianza resta valida. Se si moltiplicano per un numero <b>negativo</b>, per ottenere una disuguaglianza valida bisogna <b>cambiare il verso</b>.
<p class="formula"><i>a</i> &lt; <i>b</i> &ensp;→&ensp; <i>a</i> · <i>c</i> &lt; <i>b</i> · <i>c</i> se <i>c</i> &gt; 0 &emsp;&emsp; a &lt; <i>b</i> &ensp;→&ensp; <i>a</i> · <i>c</i> &gt; <i>b</i> · <i>c</i> se <i>c</i> &lt; 0</p></div>
<div class="esempio"><b>Esempio</b>Da +3 &lt; +7, moltiplicando per −2, si ottiene −6 &gt; −14. Il verso cambia da &lt; a &gt;.</div>
<p>Il motivo si vede bene sulla retta. Moltiplicare per −1 scambia ogni numero con il suo opposto, cioè “ribalta” la retta attorno allo 0 come in uno specchio. Il numero che prima stava più a destra finisce più a sinistra, e quindi il verso si inverte.</p>
<div class="attenzione"><b>Attenzione</b>Nella seconda legge il numero per cui si moltiplica non può essere 0. Da 2 &lt; 5, moltiplicando per 0, si otterrebbe 0 = 0 e la disuguaglianza andrebbe persa. Per lo stesso motivo nelle leggi di cancellazione non si può “cancellare” un fattore 0, infatti 0 · 3 = 0 · 7 ma 3 ≠ 7.</div>
<div class="anim" data-anim="monotonia" data-titolo="Moltiplicare una disuguaglianza: quando cambia il verso?"></div>

<h3>Le leggi di cancellazione</h3>
<p>Valgono anche le leggi inverse, chiamate <b>leggi di cancellazione</b>. Possiamo vederle come leggi di monotonia per la sottrazione e per la divisione.</p>
<ul>
<li><b>Prima legge di cancellazione</b>. Un addendo uguale nei due membri si può eliminare. Per esempio da 9 + 4 = 7 + 2 + 4 si ottiene 9 = 7 + 2, e da 3 − 8 &lt; 5 − 8 si ottiene 3 &lt; 5.</li>
<li><b>Seconda legge di cancellazione</b>. Un fattore uguale e diverso da 0 nei due membri si può eliminare, cambiando il verso di una disuguaglianza se il fattore è negativo. Per esempio da 12 · 5 = (8 + 4) · 5 si ottiene 12 = 8 + 4, e da (−2) · 6 &lt; (−2) · 1 si ottiene 6 &gt; 1.</li>
</ul>

<div class="attenzione"><b>Attenzione</b>Elevare al quadrato i due membri <b>non</b> è una legge di monotonia. Per esempio −5 &lt; 2, ma (−5)<sup>2</sup> = 25 è maggiore di 2<sup>2</sup> = 4.</div>
<div class="esempio"><b>Esempio</b>Le leggi di monotonia servono a trovare un numero sconosciuto. Se <span class="mat"><i>x</i> + 7 = 3</span>, aggiungendo −7 ai due membri si ottiene <span class="mat"><i>x</i> = 3 − 7 = −4</span>. Se <span class="mat">−3<i>x</i> &lt; 12</span>, moltiplicando i due membri per −1 si ottiene <span class="mat">3<i>x</i> &gt; −12</span> (il verso cambia!), e quindi <i>x</i> deve essere maggiore di −4. Le studierai a fondo nei capitoli sulle equazioni e sulle disequazioni.</div>

<div class="curiosita" data-img="specchio" data-titolo="Lo specchio dei numeri">
<p>Metti uno specchio verticale appoggiato sullo 0 della retta dei numeri. Il riflesso di +5 è −5, quello di −2 è +2. Ogni numero si riflette nel suo opposto.</p>
<p>Ora guarda due numeri, per esempio 2 &lt; 5. Nello specchio, 5 è più lontano dallo 0 di 2, e il suo riflesso −5 finisce quindi più a sinistra di −2. Si ha −5 &lt; −2, cioè l'ordine si è <b>rovesciato</b>.</p>
<p>Anche negli specchi veri accade qualcosa di simile, perché la destra e la sinistra si scambiano. Per questo sul cofano delle ambulanze la scritta è stampata al contrario, così chi la vede nello specchietto retrovisore la legge nel verso giusto.</p>
</div>
`}
  ]
};
