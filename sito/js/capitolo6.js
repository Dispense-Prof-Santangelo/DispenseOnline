/* =====================================================================
   CAPITOLO 6 – I MONOMI &emsp; (testi originali)
   File generato da generatori/teoria_cap6.py: per modificare i testi si cambia quel file e lo si rilancia.
   ===================================================================== */
LIBRO.capitoli.cap6 = {
  id: "cap6", anno: 1, numero: 6,
  titolo: "I monomi",
  sottotitolo: "Dalle lettere al posto dei numeri al calcolo con i monomi, fino ai modelli di aree e volumi.",
  pdf: "pdf/capitolo-6-monomi.pdf",
  storia: `
<p class="storia-domanda">Come si risolve un problema una volta per tutte, prima ancora di conoscerne i numeri?</p>
<p>Gli scribi dell'antichità insegnavano la matematica con le «ricette». Si prendeva un problema con certi numeri, per esempio un campo di cui si conoscono il perimetro e l'area, e si mostrava la sequenza dei calcoli. Per un altro campo bisognava rifare tutto con i numeri nuovi, seguendo la stessa ricetta. Il bisogno pratico era quindi scrivere <b>una regola valida per tutti i casi</b>, che funzionasse per qualsiasi campo, prestito o raccolto. Per farlo servivano dei <b>simboli</b> al posto dei numeri. Ci sono voluti quasi tremila anni per passare dalle ricette scritte a parole alle lettere che usiamo oggi.</p>
<ol class="linea-tempo">
<li><span class="data">circa 1800 a.C.</span>Sulle tavolette d'argilla della <b>Mesopotamia</b> i problemi sono risolti con procedimenti passo passo, sempre con numeri precisi e senza simboli per le quantità sconosciute.</li>
<li><span class="data">circa 1650 a.C.</span>Nel <i>papiro di Rhind</i> gli scribi egizi chiamano la quantità da trovare <i>aha</i>, cioè «mucchio».</li>
<li><span class="data">III secolo d.C.</span><b>Diofanto</b> di Alessandria, nell'<i>Arithmetica</i>, indica l'incognita e le sue potenze con delle abbreviazioni. È la prima algebra «abbreviata».</li>
<li><span class="data">628</span>In India <b>Brahmagupta</b> usa le iniziali dei nomi dei colori per indicare più quantità sconosciute nello stesso problema.</li>
<li><span class="data">circa 820</span>A Baghdad <b>al-Khwārizmī</b> scrive il libro da cui prende il nome l'<b>algebra</b> (<i>al-jabr</i>). Tutto è ancora scritto a parole, anche i calcoli.</li>
<li><span class="data">1202</span><b>Leonardo Fibonacci</b>, nel <i>Liber abaci</i>, chiama l'incognita <i>res</i>, «la cosa». I maestri d'abaco italiani la chiameranno «cosa» e i loro metodi «regola della cosa».</li>
<li><span class="data">1591</span><b>François Viète</b> usa le lettere non solo per le incognite (le vocali) ma anche per i numeri noti (le consonanti). Da quel momento si possono scrivere regole generali.</li>
<li><span class="data">1637</span>Nella <i>Geometria</i> <b>René Descartes</b> (Cartesio) indica le quantità note con le prime lettere dell'alfabeto, <i>a</i>, <i>b</i>, <i>c</i>, le incognite con le ultime, <i>x</i>, <i>y</i>, <i>z</i>, e diffonde gli esponenti scritti in alto, come in <span class="pot"><i>a</i><sup>3</sup></span>.</li>
</ol>
<p class="storia-capitolo"><b>In questo capitolo</b> impariamo a usare le lettere per scrivere regole e formule e a calcolarne il valore. Poi studiamo le espressioni letterali più semplici, i <b>monomi</b>. Vediamo come si sommano, si moltiplicano, si elevano a potenza e si dividono, come si risolvono le espressioni, come si trovano il loro MCD e il loro mcm e, alla fine, come si usano per descrivere perimetri, aree, volumi e situazioni reali.</p>
`,
  sintesi: `
<div class="sint-blocco"><h3><span>1</span>Dalle parole alle lettere</h3>
<p>Un'<b>espressione letterale</b> contiene numeri e lettere legati dalle operazioni. Si omette il segno · fra numero e lettera e fra lettere, mai fra due numeri.</p>
<p>Il <b>valore numerico</b> si trova sostituendo le lettere con i numeri, scritti tra parentesi se negativi o frazionari. Un'espressione con una lettera nel divisore non ha significato per i valori che annullano il divisore (<b>condizione di esistenza</b>).</p>
<div class="esempio"><b>Esempio</b>3<span class="pot"><i>a</i><sup>2</sup></span> − 2<i>ab</i> con <i>a</i> = −2, <i>b</i> = <span class="fr"><span>3</span><span>4</span></span> &emsp; 3 · <span class="pot">(−2)<sup>2</sup></span> − 2 · (−2) · <span class="fr"><span>3</span><span>4</span></span> = 12 + 3 = 15</div>
</div>
<div class="sint-blocco"><h3><span>2</span>Che cos'è un monomio</h3>
<p>Un <b>monomio</b> contiene solo moltiplicazioni fra numeri e lettere, con esponenti naturali. In <b>forma normale</b> ha un <b>coefficiente</b> e una <b>parte letterale</b> con lettere tutte diverse.</p>
<p><b>Grado</b> rispetto a una lettera = esponente della lettera. <b>Grado complessivo</b> = somma degli esponenti. Monomi <b>simili</b> hanno la stessa parte letterale, <b>uguali</b> anche lo stesso coefficiente, <b>opposti</b> coefficienti opposti.</p>
<div class="esempio"><b>Esempio</b>5<span class="pot"><i>a</i><sup>3</sup></span><span class="pot"><i>b</i><sup>2</sup></span><i>c</i> &emsp; coefficiente 5, grado 3 rispetto ad <i>a</i>, grado complessivo 6</div>
</div>
<div class="sint-blocco"><h3><span>3</span>Addizione e sottrazione</h3>
<p>Si sommano solo monomi <b>simili</b>, sommando i coefficienti. Sottrarre vuol dire sommare l'opposto. La somma di monomi non simili è un <b>polinomio</b>. Una parentesi preceduta da − si toglie cambiando tutti i segni.</p>
<div class="esempio"><b>Esempio</b>4<span class="pot"><i>x</i><sup>2</sup></span><i>y</i> − 3<i>x</i><span class="pot"><i>y</i><sup>2</sup></span> + <span class="pot"><i>x</i><sup>2</sup></span><i>y</i> + 5<i>x</i><span class="pot"><i>y</i><sup>2</sup></span> − 2<span class="pot"><i>x</i><sup>2</sup></span><i>y</i> = (4 + 1 − 2)<span class="pot"><i>x</i><sup>2</sup></span><i>y</i> + (−3 + 5)<i>x</i><span class="pot"><i>y</i><sup>2</sup></span> = 3<span class="pot"><i>x</i><sup>2</sup></span><i>y</i> + 2<i>x</i><span class="pot"><i>y</i><sup>2</sup></span></div>
</div>
<div class="sint-blocco"><h3><span>4</span>Moltiplicazione e potenza</h3>
<ul class="sint-lista"><li><span class="mat">prodotto</span><span class="nota">prodotto dei coefficienti, gli esponenti della stessa lettera si <b>sommano</b></span></li>
<li><span class="mat">potenza</span><span class="nota">potenza del coefficiente, gli esponenti si <b>moltiplicano</b> per l'esponente</span></li></ul>
<div class="esempio"><b>Esempio</b>2<span class="pot"><i>a</i><sup>2</sup></span><i>b</i> · (−3<i>a</i><span class="pot"><i>b</i><sup>3</sup></span>) = −6<span class="pot"><i>a</i><sup>2+1</sup></span><span class="pot"><i>b</i><sup>1+3</sup></span> = −6<span class="pot"><i>a</i><sup>3</sup></span><span class="pot"><i>b</i><sup>4</sup></span> &emsp; <span class="pot">(−2<i>a</i><sup>2</sup><i>b</i>)<sup>3</sup></span> = −8<span class="pot"><i>a</i><sup>2·3</sup></span><span class="pot"><i>b</i><sup>3</sup></span> = −8<span class="pot"><i>a</i><sup>6</sup></span><span class="pot"><i>b</i><sup>3</sup></span></div>
</div>
<div class="sint-blocco"><h3><span>5</span>Divisione</h3>
<p><i>A</i> è divisibile per <i>B</i> ≠ 0 se ogni lettera di <i>B</i> compare in <i>A</i> con esponente maggiore o uguale. Si dividono i coefficienti e si <b>sottraggono</b> gli esponenti. Il grado del quoziente è la differenza dei gradi.</p>
<div class="esempio"><b>Esempio</b>12<span class="pot"><i>a</i><sup>5</sup></span><span class="pot"><i>b</i><sup>2</sup></span> : (−4<span class="pot"><i>a</i><sup>2</sup></span><i>b</i>) = −3<span class="pot"><i>a</i><sup>5−2</sup></span><span class="pot"><i>b</i><sup>2−1</sup></span> = −3<span class="pot"><i>a</i><sup>3</sup></span><i>b</i> &emsp; 5<span class="pot"><i>a</i><sup>2</sup></span><i>b</i> non è divisibile per <span class="pot"><i>a</i><sup>3</sup></span></div>
</div>
<div class="sint-blocco"><h3><span>6</span>Le espressioni con i monomi</h3>
<p>Parentesi dalla più interna, poi potenze, poi moltiplicazioni e divisioni da sinistra a destra, infine somme. Un risultato si può <b>controllare</b> confrontando il valore numerico dell'espressione e del risultato per gli stessi valori delle lettere.</p>
<div class="esempio"><b>Esempio</b><span class="pot">(−3<i>a</i><sup>2</sup><i>b</i>)<sup>2</sup></span> : (9<span class="pot"><i>a</i><sup>2</sup></span><i>b</i>) + 2<i>a</i> · (−<i>a</i><i>b</i>) = 9<span class="pot"><i>a</i><sup>4</sup></span><span class="pot"><i>b</i><sup>2</sup></span> : (9<span class="pot"><i>a</i><sup>2</sup></span><i>b</i>) + 2<i>a</i> · (−<i>a</i><i>b</i>) = <span class="pot"><i>a</i><sup>2</sup></span><i>b</i> + (−2<span class="pot"><i>a</i><sup>2</sup></span><i>b</i>) = (1 − 2)<span class="pot"><i>a</i><sup>2</sup></span><i>b</i> = −<span class="pot"><i>a</i><sup>2</sup></span><i>b</i></div>
</div>
<div class="sint-blocco"><h3><span>7</span>MCD e mcm di monomi</h3>
<p><b>MCD</b> MCD dei coefficienti, lettere <b>comuni</b> con l'esponente <b>minore</b>. <b>mcm</b> mcm dei coefficienti, <b>tutte</b> le lettere con l'esponente <b>maggiore</b>. Se i coefficienti non sono interi, il coefficiente è 1.</p>
<div class="esempio"><b>Esempio</b>MCD(12<span class="pot"><i>a</i><sup>3</sup></span><span class="pot"><i>b</i><sup>2</sup></span>; 18<span class="pot"><i>a</i><sup>2</sup></span><i>b</i><i>c</i>) = 6<span class="pot"><i>a</i><sup>2</sup></span><i>b</i> &emsp; mcm(12<span class="pot"><i>a</i><sup>3</sup></span><span class="pot"><i>b</i><sup>2</sup></span>; 18<span class="pot"><i>a</i><sup>2</sup></span><i>b</i><i>c</i>) = 36<span class="pot"><i>a</i><sup>3</sup></span><span class="pot"><i>b</i><sup>2</sup></span><i>c</i></div>
</div>
<div class="sint-blocco"><h3><span>8</span>I monomi come modelli</h3>
<p>Se le lettere sono lunghezze, il grado dice che cosa si misura. Grado 1 lunghezze e perimetri, grado 2 aree, grado 3 volumi. Se le lunghezze si moltiplicano per <i>k</i>, le aree si moltiplicano per <span class="pot"><i>k</i><sup>2</sup></span> e i volumi per <span class="pot"><i>k</i><sup>3</sup></span>.</p>
<p>Per un problema si sceglie la lettera, si scrivono le grandezze in funzione di essa, si calcola e si controllano grado e valore numerico.</p>
</div>
`,
  paragrafi: [
  { n: 1, id: "p1", titolo: "Dalle parole alle lettere", html: `
<p>In matematica usiamo le lettere da molto tempo. Nel capitolo 1 abbiamo scritto le proprietà delle operazioni come <i>a</i> + <i>b</i> = <i>b</i> + <i>a</i>, nel capitolo 5 le leggi delle funzioni come <i>y</i> = 2 · <i>x</i> + 1. In tutti questi casi la lettera sta al posto di un numero qualsiasi. Scrivere una regola con le lettere permette di dire in una sola riga una cosa che vale per infiniti numeri.</p>
<h3>Perché si usano le lettere</h3>
<p>Le lettere servono almeno a quattro scopi diversi.</p>
<ul>
<li><b>Scrivere formule</b>. Il perimetro di un quadrato di lato <i>l</i> è 4 · <i>l</i>, l'area di un rettangolo di base <i>b</i> e altezza <i>h</i> è <i>b</i> · <i>h</i>. La formula vale per tutti i quadrati e per tutti i rettangoli.</li>
<li><b>Esprimere proprietà generali</b>. La frase «in una moltiplicazione si possono scambiare i fattori» diventa <i>a</i> · <i>b</i> = <i>b</i> · <i>a</i>.</li>
<li><b>Indicare una quantità che non si conosce ancora</b>, come l'età di una persona o il prezzo di un oggetto, per poi trovarla.</li>
<li><b>Descrivere come una grandezza dipende da un'altra</b>, come lo spazio percorso da un'auto che viaggia a 90 km/h, che dopo <i>t</i> ore è 90 · <i>t</i> kilometri.</li>
</ul>
<div class="definizione"><b>Definizione</b>
Un'<b>espressione letterale</b> (o <b>espressione algebrica</b>) è un'espressione in cui compaiono numeri e lettere legati dai segni delle operazioni. Le lettere si chiamano <b>variabili</b>, perché possono assumere valori diversi.</div>
<div class="esempio"><b>Esempio</b>3 · <i>a</i> + 5 &emsp; <span class="pot"><i>x</i><sup>2</sup></span> − 2 · <i>x</i> · <i>y</i> &emsp; (<i>a</i> + <i>b</i>) : 2 &emsp; 4 · <i>l</i></div>
<h3>Come si scrivono le espressioni letterali</h3>
<p>Per rendere le scritture più brevi si seguono alcune convenzioni.</p>
<ul>
<li>Il segno · si può <b>omettere</b> fra un numero e una lettera e fra due lettere. Si scrive 3<i>a</i> invece di 3 · <i>a</i> e <i>ab</i> invece di <i>a</i> · <i>b</i>. Il numero si scrive prima delle lettere.</li>
<li>Il fattore 1 non si scrive. 1 · <i>a</i> = <i>a</i> e (−1) · <i>a</i> = −<i>a</i>.</li>
<li>Una lettera moltiplicata per sé stessa si scrive come potenza. <i>a</i> · <i>a</i> = <span class="pot"><i>a</i><sup>2</sup></span> e <i>a</i> · <i>a</i> · <i>a</i> = <span class="pot"><i>a</i><sup>3</sup></span>.</li>
<li>Davanti a una parentesi il segno · si può omettere. 3 · (<i>a</i> + <i>b</i>) si scrive 3(<i>a</i> + <i>b</i>).</li>
</ul>
<div class="attenzione"><b>Attenzione</b>Fra due <b>numeri</b> il segno · non si può mai togliere. 3 · 4 = 12, mentre 34 è un altro numero. Per lo stesso motivo il numero si scrive sempre <b>prima</b> delle lettere. Scrivere <i>a</i>3 sarebbe ambiguo.</div>
<h3>Dalle parole alle lettere</h3>
<p>Tradurre una frase in un'espressione letterale richiede attenzione all'<b>ordine</b> delle operazioni. Conviene leggere la frase dalla fine. L'ultima operazione nominata, quella «più esterna», è quella che si fa per ultima. Nella tabella <i>a</i>, <i>b</i> e <i>n</i> sono numeri qualsiasi.</p>
<table class="tab">
<tr><th>Frase</th><th>Espressione</th></tr>
<tr><td>il doppio di un numero</td><td>2<i>a</i></td></tr>
<tr><td>la metà di un numero</td><td><i>a</i> : 2 &ensp; oppure &ensp; <span class="fr"><span>1</span><span>2</span></span><i>a</i></td></tr>
<tr><td>il triplo della somma di due numeri</td><td>3(<i>a</i> + <i>b</i>)</td></tr>
<tr><td>la somma del triplo di un numero e di un altro numero</td><td>3<i>a</i> + <i>b</i></td></tr>
<tr><td>il quadrato della differenza di due numeri</td><td><span class="pot">(<i>a</i> − <i>b</i>)<sup>2</sup></span></td></tr>
<tr><td>la differenza dei quadrati di due numeri</td><td><span class="pot"><i>a</i><sup>2</sup></span> − <span class="pot"><i>b</i><sup>2</sup></span></td></tr>
<tr><td>il successivo di un numero naturale</td><td><i>n</i> + 1</td></tr>
<tr><td>un numero pari &ensp; · &ensp; un numero dispari</td><td>2<i>n</i> &ensp; · &ensp; 2<i>n</i> + 1</td></tr>
</table>
<div class="esempio"><b>Esempio</b>«Il quadrato della somma di un numero e di 5» si legge dalla fine. L'ultima operazione è il quadrato, e si fa il quadrato di una somma. Si scrive <span class="pot">(<i>a</i> + 5)<sup>2</sup></span>.<br>
«La somma del quadrato di un numero e di 5» finisce con una somma, di cui il primo addendo è un quadrato. Si scrive <span class="pot"><i>a</i><sup>2</sup></span> + 5.</div>
<p>Si può anche fare il contrario, cioè leggere a parole un'espressione. Per esempio 2(<i>x</i> − 1) è «il doppio della differenza fra un numero e 1», mentre 2<i>x</i> − 1 è «la differenza fra il doppio di un numero e 1».</p>
<h3>Il valore numerico di un'espressione letterale</h3>
<p>Se al posto delle lettere si mettono dei numeri, l'espressione letterale diventa un'espressione numerica, che si calcola con le regole dei capitoli precedenti. Il risultato si chiama <b>valore numerico</b> dell'espressione per quei valori delle lettere.</p>
<div class="regola"><b>Regola · Come si calcola il valore numerico</b>
<ol><li>Si riscrive l'espressione rimettendo i segni · che erano stati omessi.</li>
<li>Si sostituisce ogni lettera con il suo valore, scrivendo <b>tra parentesi</b> i numeri negativi e le frazioni.</li>
<li>Si calcola l'espressione numerica, rispettando l'ordine delle operazioni.</li></ol></div>
<div class="esempio"><b>Esempio</b>Calcoliamo il valore di 3<span class="pot"><i>a</i><sup>2</sup></span> − 2<i>ab</i> per <i>a</i> = −2 e <i>b</i> = <span class="fr"><span>3</span><span>4</span></span>.
<ol class="passaggi">
<li>Si rimettono i segni di moltiplicazione. <span class="perche">3<span class="pot"><i>a</i><sup>2</sup></span> vuol dire 3 · <span class="pot"><i>a</i><sup>2</sup></span> e 2<i>ab</i> vuol dire 2 · <i>a</i> · <i>b</i>.</span> &emsp; 3 · <span class="pot"><i>a</i><sup>2</sup></span> − 2 · <i>a</i> · <i>b</i></li>
<li>Si sostituiscono le lettere, con le parentesi. <span class="perche">−2 è negativo e <span class="fr"><span>3</span><span>4</span></span> è una frazione.</span> &emsp; 3 · <span class="pot">(−2)<sup>2</sup></span> − 2 · (−2) · <span class="gp gt"><span class="gpL"></span><span class="gpC"><span class="fr"><span>3</span><span>4</span></span></span><span class="gpR"></span></span></li>
<li>Si calcolano le potenze, poi i prodotti, infine la differenza. &emsp; 3 · <span class="pot">(−2)<sup>2</sup></span> − 2 · (−2) · <span class="gp gt"><span class="gpL"></span><span class="gpC"><span class="fr"><span>3</span><span>4</span></span></span><span class="gpR"></span></span> = 3 · 4 − 2 · (−2) · <span class="gp gt"><span class="gpL"></span><span class="gpC"><span class="fr"><span>3</span><span>4</span></span></span><span class="gpR"></span></span> = 3 · 4 − <span class="gp gt"><span class="gpL"></span><span class="gpC">−<span class="fr"><span>2 · 2 · 3</span><span>4</span></span></span><span class="gpR"></span></span> = 3 · 4 − <span class="gp gt"><span class="gpL"></span><span class="gpC">−<span class="fr"><span><span class="canc" data-n="1">2</span> · <span class="canc" data-n="1">2</span> · 3</span><span><span class="canc giu" data-n="1">4</span></span></span></span><span class="gpR"></span></span> = 12 − (−3) = 15</li></ol></div>
<div class="attenzione"><b>Attenzione</b>Le parentesi intorno ai numeri negativi sono indispensabili. Con <i>a</i> = −3 si ha<br>
−<span class="pot"><i>a</i><sup>2</sup></span> = −<span class="pot">(−3)<sup>2</sup></span> = −9, perché l'esponente riguarda solo il 3 dentro la parentesi e il meno davanti resta,<br>
<span class="pot">(−<i>a</i>)<sup>2</sup></span> = <span class="pot">(−(−3))<sup>2</sup></span> = <span class="pot">3<sup>2</sup></span> = 9, perché qui si eleva al quadrato l'opposto di <i>a</i>.</div>
<div class="anim" style="clear:both" data-anim="valorenum" data-titolo="Muovi i valori delle lettere"></div>
<p>Una stessa espressione ha valori diversi per valori diversi delle lettere. Per esempio 5<i>x</i> − <span class="pot"><i>x</i><sup>2</sup></span> con <i>x</i> = 3 vale 6, con <i>x</i> = 0 vale 0, con <i>x</i> = 5 vale di nuovo 0. Con l'animazione puoi provare tu.</p>
<h3>Quando un'espressione perde significato</h3>
<p>Nel capitolo 3 abbiamo visto che non si può dividere per 0. Se in un'espressione letterale c'è una divisione con una lettera nel divisore, ci sono valori della lettera per cui il calcolo non si può fare.</p>
<div class="esempio"><b>Esempio</b>L'espressione (<i>a</i> + 1) : (<i>a</i> − 2) per <i>a</i> = 5 vale 6 : 3 = 2.<br>
Per <i>a</i> = 2 diventa 3 : 0, che non ha significato. Si dice che l'espressione ha significato per <i>a</i> ≠ 2. Questa si chiama <b>condizione di esistenza</b>.<br>
Anche <span class="fr"><span>3</span><span><i>b</i></span></span>, che vuol dire 3 : <i>b</i>, ha significato solo per <i>b</i> ≠ 0.</div>
<p>In questo capitolo lavoreremo quasi sempre con espressioni in cui non si divide per una lettera, e che quindi hanno significato per tutti i valori. Le condizioni di esistenza torneranno nel capitolo sulle frazioni algebriche.</p>
<div class="curiosita" data-img="cifrario" data-titolo="Il matematico accusato di stregoneria">
<p>François Viète, l'avvocato francese che per primo usò le lettere al posto dei numeri noti, fu anche un abilissimo decifratore di messaggi segreti. Alla fine del Cinquecento la Francia era in guerra con la Spagna e il re Enrico IV gli affidò alcune lettere spagnole intercettate, scritte con un codice di centinaia di simboli. Viète riuscì a leggerle.</p>
<p>Si racconta che il re di Spagna Filippo II, scoprendo che i suoi piani erano noti ai Francesi, si lamentò con il papa accusando i nemici di usare la magia. In realtà Viète aveva fatto quello che si fa in algebra. Aveva trattato i simboli sconosciuti come incognite e aveva cercato le regole che li legavano.</p>
</div>
`},
  { n: 2, id: "p2", titolo: "Che cos'è un monomio", html: `
<p>Fra tutte le espressioni letterali, le più semplici sono quelle in cui numeri e lettere sono legati solo dalla moltiplicazione, come 5<i>a</i>, −2<span class="pot"><i>xy</i><sup>2</sup></span> o <span class="fr"><span>3</span><span>4</span></span><span class="pot"><i>a</i><sup>2</sup></span><i>b</i>. Sono i «mattoni» con cui costruiremo, nei prossimi capitoli, i polinomi.</p>
<div class="definizione"><b>Definizione</b>
Un <b>monomio</b> è un'espressione letterale in cui compaiono solo <b>moltiplicazioni</b> fra numeri e lettere. Gli esponenti delle lettere sono numeri naturali.</div>
<div class="esempio"><b>Esempio</b>Sono monomi &emsp; 7<i>a</i> &emsp; −<span class="pot"><i>x</i><sup>3</sup></span><i>y</i> &emsp; <span class="fr"><span>2</span><span>5</span></span><span class="pot"><i>ab</i><sup>2</sup></span><i>c</i> &emsp; <i>a</i> : 4, che è uguale a <span class="fr"><span>1</span><span>4</span></span><i>a</i> &emsp; 12<br>
Non sono monomi &emsp; <i>a</i> + <i>b</i>, perché c'è un'addizione &emsp; 3 : <i>x</i>, perché si divide per una lettera &emsp; <span class="pot"><i>a</i><sup>−2</sup></span>, perché l'esponente è negativo</div>
<div class="attenzione"><b>Attenzione</b>Dividere per un <b>numero</b> diverso da 0 è come moltiplicare per il suo reciproco, quindi <i>a</i> : 4 = <span class="fr"><span>1</span><span>4</span></span> · <i>a</i> è un monomio. Dividere per una <b>lettera</b> invece non è una moltiplicazione per un monomio, quindi <span class="fr"><span>3</span><span><i>x</i></span></span> non è un monomio.</div>
<h3>La forma normale</h3>
<p>Il monomio 2<i>a</i> · (−3)<i>b</i> · <span class="pot"><i>a</i><sup>2</sup></span> si può scrivere in modo più semplice. Per le proprietà commutativa e associativa della moltiplicazione possiamo spostare e raggruppare i fattori come vogliamo.</p>
<div class="esempio"><b>Esempio</b>
<ol class="passaggi">
<li>Si mettono vicini i numeri e si mettono vicine le lettere uguali. <span class="perche">Proprietà commutativa e associativa.</span> &emsp; <span class="c1">2 · (−3)</span> · <span class="c2"><i>a</i> · <span class="pot"><i>a</i><sup>2</sup></span></span> · <span class="c3"><i>b</i></span></li>
<li>Si moltiplicano i numeri, con la regola del prodotto dei segni. &emsp; <span class="c1">2 · (−3) = −6</span></li>
<li>Si moltiplicano le potenze della stessa lettera, sommando gli esponenti. &emsp; <span class="c2"><i>a</i> · <span class="pot"><i>a</i><sup>2</sup></span> = <span class="pot"><i>a</i><sup>1 + 2</sup></span> = <span class="pot"><i>a</i><sup>3</sup></span></span></li>
<li>Si scrive il risultato con il numero davanti e le lettere in ordine alfabetico. &emsp; −6<span class="pot"><i>a</i><sup>3</sup></span><i>b</i></li></ol></div>
<div class="definizione"><b>Definizione</b>
Un monomio è in <b>forma normale</b> se è scritto come prodotto di un solo numero e di lettere diverse fra loro, ciascuna con il suo esponente.<br>
Il numero si chiama <b>coefficiente</b>, l'insieme delle lettere con i loro esponenti si chiama <b>parte letterale</b>.</div>
<table class="tab">
<tr><th>Monomio</th><th>Coefficiente</th><th>Parte letterale</th></tr>
<tr><td>−6<span class="pot"><i>a</i><sup>3</sup></span><i>b</i></td><td>−6</td><td><span class="pot"><i>a</i><sup>3</sup></span><i>b</i></td></tr>
<tr><td><span class="fr"><span>3</span><span>4</span></span><span class="pot"><i>x</i><sup>2</sup></span><i>y</i></td><td><span class="fr"><span>3</span><span>4</span></span></td><td><span class="pot"><i>x</i><sup>2</sup></span><i>y</i></td></tr>
<tr><td><i>a</i><span class="pot"><i>b</i><sup>2</sup></span></td><td>1</td><td><i>a</i><span class="pot"><i>b</i><sup>2</sup></span></td></tr>
<tr><td>−<span class="pot"><i>z</i><sup>5</sup></span></td><td>−1</td><td><span class="pot"><i>z</i><sup>5</sup></span></td></tr>
<tr><td>8</td><td>8</td><td>nessuna</td></tr></table>
<p>D'ora in poi, quando parliamo di un monomio, lo supponiamo sempre scritto in forma normale. Un numero, per esempio 8, è un monomio senza parte letterale.</p>
<div class="definizione"><b>Definizione</b>
Il <b>monomio nullo</b> è il monomio con coefficiente 0. Qualunque sia la sua parte letterale, vale 0, perché 0 · <span class="pot"><i>a</i><sup>3</sup></span><i>b</i> = 0.</div>
<h3>Il grado di un monomio</h3>
<div class="definizione"><b>Definizione</b>
<ul><li>Il <b>grado di un monomio rispetto a una lettera</b> è l'esponente con cui compare quella lettera. Se la lettera non compare, il grado rispetto a quella lettera è 0.</li>
<li>Il <b>grado complessivo</b> (o semplicemente grado) di un monomio non nullo è la <b>somma</b> degli esponenti di tutte le sue lettere.</li></ul></div>
<div class="esempio"><b>Esempio</b>5<span class="pot"><i>a</i><sup>3</sup></span><span class="pot"><i>b</i><sup>2</sup></span><i>c</i> ha grado 3 rispetto ad <i>a</i>, 2 rispetto a <i>b</i>, 1 rispetto a <i>c</i>, 0 rispetto a <i>d</i>. Il grado complessivo è 3 + 2 + 1 = 6.<br>
−<i>x</i> ha grado 1, perché <i>x</i> = <span class="pot"><i>x</i><sup>1</sup></span>.<br>
Un numero diverso da 0, come −7, ha grado 0, perché non ha lettere. Il monomio nullo non ha grado.</div>
<div class="attenzione"><b>Attenzione</b>Il grado dipende solo dalla parte letterale. Il coefficiente non conta, nemmeno quando è grande. 100<i>a</i> ha grado 1, mentre <span class="pot"><i>a</i><sup>2</sup></span> ha grado 2.</div>
<h3>Monomi simili, uguali, opposti</h3>
<div class="definizione"><b>Definizione</b>
<ul><li>Due monomi sono <b>simili</b> se hanno la <b>stessa parte letterale</b>, cioè le stesse lettere con gli stessi esponenti.</li>
<li>Due monomi sono <b>uguali</b> se sono simili e hanno lo stesso coefficiente.</li>
<li>Due monomi sono <b>opposti</b> se sono simili e hanno coefficienti opposti.</li></ul></div>
<div class="esempio"><b>Esempio</b>3<span class="pot"><i>a</i><sup>2</sup></span><i>b</i> e −7<span class="pot"><i>a</i><sup>2</sup></span><i>b</i> sono simili. &emsp; 3<span class="pot"><i>a</i><sup>2</sup></span><i>b</i> e 3<i>a</i><span class="pot"><i>b</i><sup>2</sup></span> non sono simili, perché gli esponenti di <i>a</i> e di <i>b</i> sono scambiati.<br>
<span class="fr"><span>2</span><span>3</span></span><i>x</i><i>y</i> e −<span class="fr"><span>2</span><span>3</span></span><i>x</i><i>y</i> sono opposti. &emsp; <i>ba</i> e <i>ab</i> sono uguali, perché <i>ba</i> = <i>ab</i> per la proprietà commutativa.</div>
<p>Monomi simili si possono sommare in un solo monomio, come vedremo nel prossimo paragrafo. Per questo è importante riconoscerli a colpo d'occhio, mettendo sempre le lettere in ordine alfabetico.</p>
<div class="curiosita" data-img="omogeneita" data-titolo="Si possono sommare un'area e un volume?">
<p>Per i matematici greci un prodotto di due lunghezze era un'<b>area</b>, il prodotto di tre lunghezze un <b>volume</b>. Sommare un'area e un volume non aveva senso, come non ha senso sommare metri quadrati e metri cubi.</p>
<p>Viète trasformò questa idea in una regola, la <b>legge di omogeneità</b>. In un'uguaglianza tutti i termini dovevano avere lo stesso «grado», cioè la stessa dimensione. Oggi sappiamo che, quando le lettere sono numeri, si possono sommare monomi di grado diverso. Ma quando le lettere indicano lunghezze il grado ci dice ancora se un'espressione è una lunghezza (grado 1), un'area (grado 2) o un volume (grado 3). Lo useremo nel paragrafo 8.</p>
</div>
`},
  { n: 3, id: "p3", titolo: "Addizione e sottrazione di monomi", html: `
<p>Se ho 3 mele e ne aggiungo 5, ho 8 mele. Allo stesso modo 3<i>a</i> + 5<i>a</i> = 8<i>a</i>, qualunque numero sia <i>a</i>. Il motivo è la proprietà distributiva della moltiplicazione rispetto all'addizione, letta da destra verso sinistra.</p>
<p class="formula">3<i>a</i> + 5<i>a</i> = (3 + 5) · <i>a</i> = 8<i>a</i></p>
<div class="regola"><b>Regola · Somma di monomi simili</b>
La somma di due o più monomi <b>simili</b> è un monomio simile a quelli dati, che ha per coefficiente la <b>somma dei coefficienti</b>.</div>
<div class="esempio"><b>Esempio</b>3<span class="pot"><i>a</i><sup>2</sup></span><i>b</i> − 5<span class="pot"><i>a</i><sup>2</sup></span><i>b</i> + <span class="pot"><i>a</i><sup>2</sup></span><i>b</i> = (3 − 5 + 1)<span class="pot"><i>a</i><sup>2</sup></span><i>b</i> = −<span class="pot"><i>a</i><sup>2</sup></span><i>b</i><br>
<span class="fr"><span>2</span><span>3</span></span><i>a</i> − <span class="fr"><span>1</span><span>2</span></span><i>a</i> = <span class="gp gt"><span class="gpL"></span><span class="gpC"><span class="fr"><span>2</span><span>3</span></span> − <span class="fr"><span>1</span><span>2</span></span></span><span class="gpR"></span></span><i>a</i> = <span class="fr"><span>1</span><span>6</span></span><i>a</i> &emsp; perché <span class="fr"><span>2</span><span>3</span></span> − <span class="fr"><span>1</span><span>2</span></span> = <span class="fr"><span>4</span><span>6</span></span> − <span class="fr"><span>3</span><span>6</span></span> = <span class="fr"><span>1</span><span>6</span></span><br>
6<i>x</i><i>y</i> + (−6<i>x</i><i>y</i>) = (6 − 6)<i>x</i><i>y</i> = 0 &emsp; perché la somma di due monomi opposti è il monomio nullo</div>
<figure class="fig-testo"><svg viewBox="0 0 250 90" xmlns="http://www.w3.org/2000/svg" role="img"><rect x="20" y="20" width="18" height="50" fill="#dbe6f7" stroke="#1f4fa3" stroke-width="2"/><text x="29" y="50" font-size="13" font-family="serif" text-anchor="middle" fill="#1f4fa3"><tspan font-style="italic">a</tspan></text><rect x="46" y="20" width="18" height="50" fill="#dbe6f7" stroke="#1f4fa3" stroke-width="2"/><text x="55" y="50" font-size="13" font-family="serif" text-anchor="middle" fill="#1f4fa3"><tspan font-style="italic">a</tspan></text><rect x="72" y="20" width="18" height="50" fill="#dbe6f7" stroke="#1f4fa3" stroke-width="2"/><text x="81" y="50" font-size="13" font-family="serif" text-anchor="middle" fill="#1f4fa3"><tspan font-style="italic">a</tspan></text><text x="108" y="52" font-size="20" font-family="serif" text-anchor="middle" fill="#2a2620" font-weight="400">+</text><rect x="126" y="20" width="18" height="50" fill="#f6d5d5" stroke="#b8322f" stroke-width="2"/><text x="135" y="50" font-size="12" font-family="serif" text-anchor="middle" fill="#b8322f" font-weight="400">−<tspan font-style="italic">a</tspan></text><rect x="152" y="20" width="18" height="50" fill="#f6d5d5" stroke="#b8322f" stroke-width="2"/><text x="161" y="50" font-size="12" font-family="serif" text-anchor="middle" fill="#b8322f" font-weight="400">−<tspan font-style="italic">a</tspan></text><text x="192" y="52" font-size="20" font-family="serif" text-anchor="middle" fill="#2a2620" font-weight="400">=</text><rect x="210" y="20" width="18" height="50" fill="#dbe6f7" stroke="#1f4fa3" stroke-width="2"/><text x="219" y="50" font-size="13" font-family="serif" text-anchor="middle" fill="#1f4fa3"><tspan font-style="italic">a</tspan></text></svg><figcaption>Con le tessere, ogni tessera −<i>a</i> annulla una tessera <i>a</i>. Tre tessere <i>a</i> e due tessere −<i>a</i> lasciano una sola tessera <i>a</i>.</figcaption></figure>
<p>Possiamo pensare ai monomi simili come a tessere tutte uguali. Le tessere con il segno meno «annullano» quelle con il segno più. Nell'animazione puoi aggiungere e togliere tessere di tre tipi diversi, <i>a</i>, <i>b</i> e <span class="pot"><i>a</i><sup>2</sup></span>, e vedere come si raggruppano.</p>
<div class="anim" style="clear:both" data-anim="tessere" data-titolo="Raggruppa le tessere simili"></div>
<h3>E se i monomi non sono simili?</h3>
<p>Le tessere di tipo diverso non si possono riunire in una sola. 3<i>a</i> + 2<i>b</i> <b>non</b> si può scrivere come un unico monomio. Si lascia scritta così, ed è un <b>polinomio</b>, cioè una somma di monomi non simili, che studieremo nel prossimo capitolo.</p>
<div class="attenzione"><b>Attenzione</b>3<i>a</i> + 2<i>b</i> non è 5<i>ab</i>. Basta un controllo con dei numeri. Con <i>a</i> = 1 e <i>b</i> = 1 si ha 3<i>a</i> + 2<i>b</i> = 5, mentre 5<i>ab</i> = 5. Con <i>a</i> = 2 e <i>b</i> = 1, invece, 3<i>a</i> + 2<i>b</i> = 8 e 5<i>ab</i> = 10. Due espressioni uguali dovrebbero dare lo stesso valore per <b>tutti</b> i valori delle lettere.</div>
<h3>La sottrazione</h3>
<p>Come per i numeri interi e razionali, sottrarre un monomio vuol dire <b>sommare il suo opposto</b>.</p>
<p class="formula">7<span class="pot"><i>x</i><sup>2</sup></span><i>y</i> − 9<span class="pot"><i>x</i><sup>2</sup></span><i>y</i> = 7<span class="pot"><i>x</i><sup>2</sup></span><i>y</i> + (−9<span class="pot"><i>x</i><sup>2</sup></span><i>y</i>) = −2<span class="pot"><i>x</i><sup>2</sup></span><i>y</i> &emsp; &emsp; 4<i>a</i> − (−3<i>a</i>) = 4<i>a</i> + 3<i>a</i> = 7<i>a</i></p>
<h3>Le somme algebriche di monomi</h3>
<p>Una catena di addizioni e sottrazioni si chiama <b>somma algebrica</b>. Se ci sono monomi simili fra loro, si raggruppano e si sommano gruppo per gruppo. Questa operazione si chiama <b>riduzione dei termini simili</b>.</p>
<div class="esempio"><b>Esempio</b>Riduciamo 4<span class="pot"><i>x</i><sup>2</sup></span><i>y</i> − 3<i>x</i><span class="pot"><i>y</i><sup>2</sup></span> + <span class="pot"><i>x</i><sup>2</sup></span><i>y</i> + 5<i>x</i><span class="pot"><i>y</i><sup>2</sup></span> − 2<span class="pot"><i>x</i><sup>2</sup></span><i>y</i>.
<ol class="passaggi">
<li>Si individuano i gruppi di monomi simili. <span class="perche">Hanno la stessa parte letterale.</span> &emsp; <span class="c1">4<span class="pot"><i>x</i><sup>2</sup></span><i>y</i></span> <span class="c2">− 3<span class="pot"><i>xy</i><sup>2</sup></span></span> <span class="c1">+ <span class="pot"><i>x</i><sup>2</sup></span><i>y</i></span> <span class="c2">+ 5<span class="pot"><i>xy</i><sup>2</sup></span></span> <span class="c1">− 2<span class="pot"><i>x</i><sup>2</sup></span><i>y</i></span></li>
<li>Si sommano i coefficienti di ciascun gruppo. <span class="perche">I monomi con parti letterali diverse restano separati.</span> &emsp; <span class="c1">(4 + 1 − 2)<span class="pot"><i>x</i><sup>2</sup></span><i>y</i></span> + <span class="c2">(−3 + 5)<span class="pot"><i>xy</i><sup>2</sup></span></span></li>
<li>Si scrive il risultato. &emsp; <span class="c1">3<span class="pot"><i>x</i><sup>2</sup></span><i>y</i></span> + <span class="c2">2<span class="pot"><i>xy</i><sup>2</sup></span></span></li></ol></div>
<h3>Le parentesi</h3>
<p>Se in una somma algebrica ci sono parentesi, si può prima calcolare ciò che è dentro, oppure togliere le parentesi con la stessa regola dei numeri relativi.</p>
<div class="regola"><b>Regola · Togliere le parentesi</b>
<ul><li>Se davanti alla parentesi c'è il segno <b>+</b>, si toglie la parentesi e i segni dei termini restano uguali.</li>
<li>Se davanti alla parentesi c'è il segno <b>−</b>, si toglie la parentesi e si <b>cambiano tutti i segni</b> dei termini che conteneva.</li></ul></div>
<div class="esempio"><b>Esempio</b>Calcolando prima dentro la parentesi &emsp; 5<i>a</i> − (2<i>a</i> − 7<i>a</i>) = 5<i>a</i> − (−5<i>a</i>) = (5 + 5)<i>a</i> = 10<i>a</i><br>
Togliendo la parentesi &emsp; 5<i>a</i> − (2<i>a</i> − 7<i>a</i>) = 5<i>a</i> − 2<i>a</i> + 7<i>a</i> = 10<i>a</i><br>
Con i due metodi il risultato è lo stesso.</div>
<h3>Le lettere per ragionare</h3>
<p>Il calcolo con i monomi permette di <b>dimostrare</b> proprietà dei numeri che valgono sempre, e non solo nei casi che abbiamo provato.</p>
<div class="esempio"><b>Esempio</b>«La somma di tre numeri naturali consecutivi è il triplo di quello centrale».<br>
Chiamiamo <i>n</i> il numero centrale. Il precedente è <i>n</i> − 1, il successivo è <i>n</i> + 1. &emsp; (<i>n</i> − 1) + <i>n</i> + (<i>n</i> + 1) = <i>n</i> − 1 + <i>n</i> + (<i>n</i> + 1) = <i>n</i> − 1 + <i>n</i> + <i>n</i> + 1 = (1 + 1 + 1)<i>n</i> + (−1 + 1) = 3<i>n</i><br>
Infatti per 6, 7, 8 la somma è 21 = 3 · 7. Il calcolo con le lettere ci dice che succede con <b>tutte</b> le terne, senza provarle una per una.</div>
<div class="curiosita" data-img="numeropensato" data-titolo="Il trucco del numero pensato">
<p>«Pensa un numero. Raddoppialo, aggiungi 10, dividi per 2 e togli il numero che avevi pensato. Ti è rimasto 5!» Il trucco funziona sempre, e con le lettere si capisce perché.</p>
<p>Se il numero pensato è <i>n</i>, il doppio è 2<i>n</i>, poi si ottiene 2<i>n</i> + 10. La metà di 2<i>n</i> + 10 è <i>n</i> + 5, perché si dimezzano tutte e due le parti. Togliendo <i>n</i> resta <i>n</i> + 5 − <i>n</i> = 5. Il numero pensato «sparisce» perché <i>n</i> e −<i>n</i> sono monomi opposti. Prova a inventare un trucco simile, in cui alla fine resta 7.</p>
</div>
`},
  { n: 4, id: "p4", titolo: "Moltiplicazione e potenza di monomi", html: `
<h3>La moltiplicazione</h3>
<p>Per moltiplicare due monomi si usano le proprietà commutativa e associativa, come abbiamo fatto per scrivere la forma normale. Si raggruppano i coefficienti fra loro e le potenze della stessa lettera fra loro.</p>
<div class="esempio"><b>Esempio</b>Calcoliamo 2<span class="pot"><i>a</i><sup>2</sup></span><i>b</i> · (−3<i>a</i><span class="pot"><i>b</i><sup>3</sup></span>).
<ol class="passaggi">
<li>Si raggruppano i coefficienti e le lettere uguali. &emsp; <span class="c1">2 · (−3)</span> · <span class="c2"><span class="pot"><i>a</i><sup>2</sup></span> · <i>a</i></span> · <span class="c3"><i>b</i> · <span class="pot"><i>b</i><sup>3</sup></span></span></li>
<li>Si moltiplicano i coefficienti, con la regola del prodotto dei segni. &emsp; <span class="c1">2 · (−3) = −6</span></li>
<li>Per ogni lettera si sommano gli esponenti. <span class="perche">È la proprietà del prodotto di potenze con la stessa base, e <i>a</i> = <span class="pot"><i>a</i><sup>1</sup></span>.</span> &emsp; <span class="c2"><span class="pot"><i>a</i><sup>2 + 1</sup></span> = <span class="pot"><i>a</i><sup>3</sup></span></span> &ensp; <span class="c3"><span class="pot"><i>b</i><sup>1 + 3</sup></span> = <span class="pot"><i>b</i><sup>4</sup></span></span></li>
<li>Si scrive il risultato. &emsp; −6<span class="pot"><i>a</i><sup>3</sup></span><span class="pot"><i>b</i><sup>4</sup></span></li></ol></div>
<div class="regola"><b>Regola · Prodotto di monomi</b>
Il prodotto di due o più monomi è un monomio che ha
<ul><li>per coefficiente il <b>prodotto dei coefficienti</b>;</li>
<li>per parte letterale <b>tutte le lettere</b> dei fattori, ciascuna con esponente uguale alla <b>somma</b> degli esponenti che ha nei fattori.</li></ul></div>
<div class="esempio"><b>Esempio</b>3<span class="pot"><i>x</i><sup>2</sup></span> · (−<span class="pot"><i>x</i><sup>3</sup></span><i>y</i>) = −3<span class="pot"><i>x</i><sup>2+3</sup></span><i>y</i> = −3<span class="pot"><i>x</i><sup>5</sup></span><i>y</i> &emsp; la lettera <i>y</i> compare solo nel secondo fattore e si ricopia<br>
−<span class="fr"><span>2</span><span>3</span></span><i>a</i><i>b</i> · <span class="fr"><span>9</span><span>4</span></span><span class="pot"><i>a</i><sup>2</sup></span><i>c</i> = −<span class="fr"><span>3</span><span>2</span></span><span class="pot"><i>a</i><sup>3</sup></span><i>b</i><i>c</i> &emsp; perché <span class="fr"><span>2</span><span>3</span></span> · <span class="fr"><span>9</span><span>4</span></span> = <span class="fr"><span><span class="canc" data-n="1">2</span> · <span class="canc" data-n="3">9</span></span><span><span class="canc giu" data-n="1">3</span> · <span class="canc giu" data-n="2">4</span></span></span> = <span class="fr"><span>3</span><span>2</span></span><br>
5<i>x</i> · (−2<i>y</i>) · (−<i>x</i>) = 10<span class="pot"><i>x</i><sup>1+1</sup></span><i>y</i> = 10<span class="pot"><i>x</i><sup>2</sup></span><i>y</i> &emsp; i due segni meno danno un prodotto positivo</div>
<p>Poiché gli esponenti si sommano, <b>il grado del prodotto è la somma dei gradi dei fattori</b>. Nel primo esempio 2<span class="pot"><i>a</i><sup>2</sup></span><i>b</i> ha grado 3, −3<span class="pot"><i>ab</i><sup>3</sup></span> ha grado 4 e il prodotto −6<span class="pot"><i>a</i><sup>3</sup></span><span class="pot"><i>b</i><sup>4</sup></span> ha grado 3 + 4 = 7.</p>
<figure class="fig-testo"><svg viewBox="0 0 260 150" xmlns="http://www.w3.org/2000/svg" role="img"><rect x="40" y="20" width="180" height="90" fill="#dbe6f7" stroke="#1f4fa3" stroke-width="2"/><line x1="100" y1="20" x2="100" y2="110" stroke="#1f4fa3" stroke-width="1"/><line x1="160" y1="20" x2="160" y2="110" stroke="#1f4fa3" stroke-width="1"/><line x1="40" y1="65" x2="220" y2="65" stroke="#1f4fa3" stroke-width="1"/><text x="70" y="47" font-size="13" font-family="serif" text-anchor="middle" fill="#1f4fa3"><tspan font-style="italic">a</tspan><tspan font-style="italic">b</tspan></text><text x="130" y="134" font-size="15" font-family="serif" text-anchor="middle" fill="#2a2620">3<tspan font-style="italic">a</tspan></text><text x="232" y="70" font-size="15" font-family="serif" text-anchor="start" fill="#2a2620">2<tspan font-style="italic">b</tspan></text></svg><figcaption>Un rettangolo di lati 3<i>a</i> e 2<i>b</i> si divide in 6 rettangolini di lati <i>a</i> e <i>b</i>. L'area è 3<i>a</i> · 2<i>b</i> = 6<i>ab</i>.</figcaption></figure>
<p>Il prodotto di due monomi di primo grado ha un significato geometrico. Se 3<i>a</i> e 2<i>b</i> sono le misure dei lati di un rettangolo, l'area è 3<i>a</i> · 2<i>b</i> = 6<i>ab</i>. Il rettangolo contiene infatti 3 · 2 = 6 rettangolini di area <i>ab</i>. Nell'animazione puoi cambiare i coefficienti dei due lati e contare i rettangolini.</p>
<div class="anim" style="clear:both" data-anim="rettangolo" data-titolo="Il prodotto come area"></div>
<h3>La potenza</h3>
<p>Elevare un monomio alla potenza <i>n</i> vuol dire moltiplicarlo per sé stesso <i>n</i> volte. Per esempio <span class="pot">(−2<i>a</i><sup>2</sup><i>b</i>)<sup>3</sup></span> = (−2<span class="pot"><i>a</i><sup>2</sup></span><i>b</i>) · (−2<span class="pot"><i>a</i><sup>2</sup></span><i>b</i>) · (−2<span class="pot"><i>a</i><sup>2</sup></span><i>b</i>). Invece di scrivere tutti i fattori si usano le proprietà delle potenze del capitolo 1, la potenza di un prodotto e la potenza di una potenza.</p>
<div class="esempio"><b>Esempio</b>Calcoliamo <span class="pot">(−2<i>a</i><sup>2</sup><i>b</i>)<sup>3</sup></span>.
<ol class="passaggi">
<li>Si eleva alla terza il coefficiente. <span class="perche">L'esponente 3 è dispari, quindi il segno meno resta.</span> &emsp; <span class="c1"><span class="pot">(−2)<sup>3</sup></span> = −8</span></li>
<li>Si eleva alla terza ogni lettera, <b>moltiplicando</b> gli esponenti. <span class="perche">È la potenza di una potenza.</span> &emsp; <span class="c2"><span class="pot">(<i>a</i><sup>2</sup>)<sup>3</sup></span> = <span class="pot"><i>a</i><sup>2 · 3</sup></span> = <span class="pot"><i>a</i><sup>6</sup></span></span> &ensp; <span class="c3"><span class="pot"><i>b</i><sup>3</sup></span></span></li>
<li>Si scrive il risultato. &emsp; −8<span class="pot"><i>a</i><sup>6</sup></span><span class="pot"><i>b</i><sup>3</sup></span></li></ol></div>
<div class="regola"><b>Regola · Potenza di un monomio</b>
La potenza <i>n</i>-esima di un monomio è un monomio che ha per coefficiente la potenza <i>n</i>-esima del coefficiente e, per ogni lettera, l'esponente moltiplicato per <i>n</i>. Il grado della potenza è <i>n</i> volte il grado del monomio.</div>
<div class="esempio"><b>Esempio</b><span class="pot"><span class="gp gt"><span class="gpL"></span><span class="gpC"><span class="fr"><span>1</span><span>2</span></span><i>x</i><i>y</i><sup>2</sup></span><span class="gpR"></span></span><sup>2</sup></span> = <span class="fr"><span>1</span><span>4</span></span><span class="pot"><i>x</i><sup>2</sup></span><span class="pot"><i>y</i><sup>2·2</sup></span> = <span class="fr"><span>1</span><span>4</span></span><span class="pot"><i>x</i><sup>2</sup></span><span class="pot"><i>y</i><sup>4</sup></span><br>
<span class="pot">(−<span class="pot"><i>a</i><sup>3</sup></span><i>b</i><sup>2</sup>)<sup>4</sup></span> = <span class="pot"><i>a</i><sup>3·4</sup></span><span class="pot"><i>b</i><sup>2·4</sup></span> = <span class="pot"><i>a</i><sup>12</sup></span><span class="pot"><i>b</i><sup>8</sup></span> &emsp; l'esponente 4 è pari, quindi il risultato è positivo<br>
<span class="pot">(5<i>a</i><i>b</i>)<sup>0</sup></span> = 1 &emsp; come per i numeri, ogni monomio non nullo elevato a 0 dà 1</div>
<div class="attenzione"><b>Attenzione</b>Le parentesi cambiano tutto.<br>
<span class="pot">(−2<i>a</i>)<sup>2</sup></span> = 4<span class="pot"><i>a</i><sup>2</sup></span> &emsp; si eleva al quadrato anche il segno meno<br>
−<span class="pot">(2<i>a</i>)<sup>2</sup></span> = −4<span class="pot"><i>a</i><sup>2</sup></span> &emsp; il segno meno resta fuori dalla potenza<br>
2<span class="pot"><i>a</i><sup>2</sup></span> &emsp; qui l'esponente riguarda solo la lettera <i>a</i></div>
<div class="curiosita" data-img="delo" data-titolo="Raddoppiare un cubo">
<p>Secondo un racconto antico, gli abitanti dell'isola di Delo chiesero all'oracolo come fermare un'epidemia. La risposta fu di costruire un altare a forma di cubo con un volume <b>doppio</b> di quello che c'era. Gli architetti raddoppiarono lo spigolo, ma l'epidemia non finì.</p>
<p>Con i monomi si vede subito l'errore. Se lo spigolo è <i>l</i>, il volume è <span class="pot"><i>l</i><sup>3</sup></span>. Con lo spigolo doppio il volume è <span class="pot">(2<i>l</i>)<sup>3</sup></span> = 8<span class="pot"><i>l</i><sup>3</sup></span>, cioè <b>otto</b> volte quello di partenza. Trovare lo spigolo giusto, con riga e compasso, divenne uno dei tre problemi classici della geometria greca. Solo nel 1837 il francese Pierre Wantzel dimostrò che con quegli strumenti è impossibile.</p>
</div>
`},
  { n: 5, id: "p5", titolo: "Divisione di monomi", html: `
<p>Nel capitolo 1 abbiamo visto che 12 : 4 = 3 perché 3 · 4 = 12. La divisione è l'operazione inversa della moltiplicazione. Per i monomi vale la stessa idea.</p>
<div class="definizione"><b>Definizione</b>
Il <b>quoziente</b> fra un monomio <i>A</i> e un monomio <i>B</i> non nullo è, se esiste, il monomio <i>Q</i> tale che <i>Q</i> · <i>B</i> = <i>A</i>. In questo caso si dice che <i>A</i> è <b>divisibile</b> per <i>B</i>.</div>
<div class="esempio"><b>Esempio</b>Calcoliamo 12<span class="pot"><i>a</i><sup>5</sup></span><span class="pot"><i>b</i><sup>2</sup></span> : (−4<span class="pot"><i>a</i><sup>2</sup></span><i>b</i>).
<ol class="passaggi">
<li>Si dividono i coefficienti, con la regola del prodotto dei segni. &emsp; <span class="c1">12 : (−4) = −3</span></li>
<li>Per ogni lettera si <b>sottraggono</b> gli esponenti. <span class="perche">È la proprietà del quoziente di potenze con la stessa base.</span> &emsp; <span class="c2"><span class="pot"><i>a</i><sup>5 − 2</sup></span> = <span class="pot"><i>a</i><sup>3</sup></span></span> &ensp; <span class="c3"><span class="pot"><i>b</i><sup>2 − 1</sup></span> = <i>b</i></span></li>
<li>Si scrive il risultato. &emsp; −3<span class="pot"><i>a</i><sup>3</sup></span><i>b</i></li>
<li>Si controlla con la moltiplicazione. <span class="perche">Quoziente per divisore deve dare il dividendo.</span> &emsp; −3<span class="pot"><i>a</i><sup>3</sup></span><i>b</i> · (−4<span class="pot"><i>a</i><sup>2</sup></span><i>b</i>) = 12<span class="pot"><i>a</i><sup>5</sup></span><span class="pot"><i>b</i><sup>2</sup></span></li></ol></div>
<div class="regola"><b>Regola · Quoziente di monomi</b>
Un monomio <i>A</i> è divisibile per un monomio non nullo <i>B</i> se <b>ogni lettera</b> di <i>B</i> compare in <i>A</i> con un esponente <b>maggiore o uguale</b>. Il quoziente ha
<ul><li>per coefficiente il <b>quoziente dei coefficienti</b>;</li>
<li>per ogni lettera di <i>A</i>, un esponente uguale alla <b>differenza</b> fra l'esponente in <i>A</i> e quello in <i>B</i>.</li></ul>
Il grado del quoziente è la differenza fra il grado del dividendo e quello del divisore.</div>
<div class="esempio"><b>Esempio</b>6<span class="pot"><i>a</i><sup>2</sup></span><i>b</i> : (3<span class="pot"><i>a</i><sup>2</sup></span>) = 2<span class="pot"><i>a</i><sup>2−2</sup></span><i>b</i> = 2<i>b</i> &emsp; <i>a</i> ha lo stesso esponente nei due monomi, e <span class="pot"><i>a</i><sup>2 − 2</sup></span> = <span class="pot"><i>a</i><sup>0</sup></span> = 1<br>
−10<span class="pot"><i>x</i><sup>4</sup></span><span class="pot"><i>y</i><sup>3</sup></span> : (−5<i>x</i><span class="pot"><i>y</i><sup>3</sup></span>) = −(−2<span class="pot"><i>x</i><sup>3</sup></span>) = 2<span class="pot"><i>x</i><sup>3</sup></span><br>
<span class="fr"><span>2</span><span>3</span></span><span class="pot"><i>a</i><sup>3</sup></span> : <span class="gp gt"><span class="gpL"></span><span class="gpC"><span class="fr"><span>4</span><span>9</span></span><i>a</i></span><span class="gpR"></span></span> = <span class="fr"><span>3</span><span>2</span></span><span class="pot"><i>a</i><sup>3−1</sup></span> = <span class="fr"><span>3</span><span>2</span></span><span class="pot"><i>a</i><sup>2</sup></span> &emsp; perché <span class="fr"><span>2</span><span>3</span></span> : <span class="fr"><span>4</span><span>9</span></span> = <span class="fr"><span>2</span><span>3</span></span> · <span class="fr"><span>9</span><span>4</span></span> = <span class="fr"><span><span class="canc" data-n="1">2</span> · <span class="canc" data-n="3">9</span></span><span><span class="canc giu" data-n="1">3</span> · <span class="canc giu" data-n="2">4</span></span></span> = <span class="fr"><span>3</span><span>2</span></span></div>
<h3>Quando il quoziente non è un monomio</h3>
<p>Proviamo a dividere 5<span class="pot"><i>a</i><sup>2</sup></span><i>b</i> per <span class="pot"><i>a</i><sup>3</sup></span>. Dovremmo scrivere <span class="pot"><i>a</i><sup>2 − 3</sup></span> = <span class="pot"><i>a</i><sup>−1</sup></span>, ma un monomio non può avere esponenti negativi. Il risultato esiste ed è <span class="fr"><span>5<i>b</i></span><span><i>a</i></span></span>, ma non è un monomio. Allo stesso modo 4<i>x</i><i>y</i> non è divisibile per 2<i>x</i><i>z</i>, perché la lettera <i>z</i> del divisore non compare nel dividendo.</p>
<div class="attenzione"><b>Attenzione</b>
<ul><li>Si può dividere solo per un monomio <b>non nullo</b>. Inoltre, quando si divide per un monomio con delle lettere, si suppone che le lettere non valgano 0.</li>
<li>Un monomio senza lettere, cioè un numero diverso da 0, divide <b>sempre</b> qualunque monomio. Per esempio 7<span class="pot"><i>x</i><sup>2</sup></span> : 2 = <span class="fr"><span>7</span><span>2</span></span><span class="pot"><i>x</i><sup>2</sup></span>.</li></ul></div>
<p>I quozienti che non sono monomi si chiamano <b>frazioni algebriche</b> e li studieremo più avanti. In questo capitolo, negli esercizi, le divisioni saranno sempre possibili.</p>
<div class="curiosita" data-img="piscina" data-titolo="Anche le unità di misura si dividono">
<p>Una piscina contiene 300 <span class="pot">m<sup>3</sup></span> di acqua e il fondo ha un'area di 150 <span class="pot">m<sup>2</sup></span>. Quanto è profonda? Si divide il volume per l'area. 300 <span class="pot">m<sup>3</sup></span> : 150 <span class="pot">m<sup>2</sup></span> = 2 m.</p>
<p>Nel calcolo le unità di misura si comportano proprio come le lettere di un monomio. <span class="pot"><em class="u">m</em><sup>3</sup></span> : <span class="pot"><em class="u">m</em><sup>2</sup></span> = <span class="pot"><em class="u">m</em><sup>3 − 2</sup></span> = <em class="u">m</em>. Gli scienziati usano spesso questo trucco per controllare una formula. Se il risultato deve essere una lunghezza e le unità non danno metri, c'è un errore.</p>
</div>
`},
  { n: 6, id: "p6", titolo: "Le espressioni con i monomi", html: `
<p>Un'<b>espressione con i monomi</b> è una catena di operazioni fra monomi. Si calcola con le stesse regole delle espressioni numeriche dei capitoli 1, 2 e 3. Alla fine si ottiene un monomio oppure, se restano monomi non simili, un polinomio.</p>
<div class="regola"><b>Regola · L'ordine delle operazioni</b>
<ol><li>Si comincia dalle parentesi più interne, le tonde, poi le quadre, poi le graffe.</li>
<li>Dentro ogni parentesi (e alla fine fuori da tutte) si calcolano prima le <b>potenze</b>,</li>
<li>poi <b>moltiplicazioni e divisioni</b>, nell'ordine in cui sono scritte, da sinistra verso destra,</li>
<li>infine <b>addizioni e sottrazioni</b>, riducendo i termini simili.</li></ol></div>
<div class="esempio"><b>Esempio</b>Calcoliamo <span class="pot">(−3<i>a</i><sup>2</sup><i>b</i>)<sup>2</sup></span> : (9<span class="pot"><i>a</i><sup>2</sup></span><i>b</i>) + 2<i>a</i> · (−<i>a</i><i>b</i>).
<ol class="passaggi">
<li>Prima la potenza. <span class="perche"><span class="pot">(−3)<sup>2</sup></span> = 9, gli esponenti di <i>a</i> e di <i>b</i> si moltiplicano per 2.</span> &emsp; = 9<span class="pot"><i>a</i><sup>4</sup></span><span class="pot"><i>b</i><sup>2</sup></span> : (9<span class="pot"><i>a</i><sup>2</sup></span><i>b</i>) + 2<i>a</i> · (−<i>a</i><i>b</i>)</li>
<li>Poi la divisione e la moltiplicazione. <span class="perche">9 : 9 = 1 e <span class="pot"><i>a</i><sup>4 − 2</sup></span> = <span class="pot"><i>a</i><sup>2</sup></span>, <span class="pot"><i>b</i><sup>2 − 1</sup></span> = <i>b</i>. Nel prodotto 2 · (−1) = −2 e <i>a</i> · <i>a</i> = <span class="pot"><i>a</i><sup>2</sup></span>.</span> &emsp; = <span class="pot"><i>a</i><sup>2</sup></span><i>b</i> + (−2<span class="pot"><i>a</i><sup>2</sup></span><i>b</i>)</li>
<li>Infine la somma dei due monomi, che sono simili. &emsp; = (1 − 2)<span class="pot"><i>a</i><sup>2</sup></span><i>b</i> = −<span class="pot"><i>a</i><sup>2</sup></span><i>b</i></li></ol></div>
<div class="esempio"><b>Esempio</b>Calcoliamo <span class="pot">[5<span class="pot"><i>x</i><sup>2</sup></span><i>y</i> − <span class="pot">(2<i>x</i>)<sup>2</sup></span> · <i>y</i>]<sup>2</sup></span> : (−<span class="pot"><i>x</i><sup>3</sup></span><span class="pot"><i>y</i><sup>2</sup></span>).
<ol class="passaggi">
<li>Dentro la quadra, prima la potenza. <span class="perche"><span class="pot">(2<i>x</i>)<sup>2</sup></span> = 4<span class="pot"><i>x</i><sup>2</sup></span>. Tolta la quadra, la parentesi che resta diventa tonda.</span> &emsp; = <span class="pot">(5<span class="pot"><i>x</i><sup>2</sup></span><i>y</i> − 4<span class="pot"><i>x</i><sup>2</sup></span> · <i>y</i>)<sup>2</sup></span> : (−<span class="pot"><i>x</i><sup>3</sup></span><span class="pot"><i>y</i><sup>2</sup></span>)</li>
<li>Poi il prodotto. &emsp; = <span class="pot">(5<span class="pot"><i>x</i><sup>2</sup></span><i>y</i> − 4<i>x</i><sup>2</sup><i>y</i>)<sup>2</sup></span> : (−<span class="pot"><i>x</i><sup>3</sup></span><span class="pot"><i>y</i><sup>2</sup></span>)</li>
<li>Poi la differenza fra monomi simili. <span class="perche">5 − 4 = 1, e il coefficiente 1 non si scrive.</span> &emsp; = <span class="pot">(<i>x</i><sup>2</sup><i>y</i>)<sup>2</sup></span> : (−<span class="pot"><i>x</i><sup>3</sup></span><span class="pot"><i>y</i><sup>2</sup></span>)</li>
<li>Ora la potenza fuori dalla parentesi. &emsp; = <span class="pot"><i>x</i><sup>4</sup></span><span class="pot"><i>y</i><sup>2</sup></span> : (−<span class="pot"><i>x</i><sup>3</sup></span><span class="pot"><i>y</i><sup>2</sup></span>)</li>
<li>Infine la divisione. <span class="perche">1 : (−1) = −1, <span class="pot"><i>x</i><sup>4 − 3</sup></span> = <i>x</i>, <span class="pot"><i>y</i><sup>2 − 2</sup></span> = <span class="pot"><i>y</i><sup>0</sup></span> = 1.</span> &emsp; = −<i>x</i></li></ol></div>
<div class="attenzione"><b>Attenzione · Gli errori più frequenti</b>
<table class="tab">
<tr><th>Sbagliato</th><th>Giusto</th><th>Perché</th></tr>
<tr><td>3<i>a</i> + 2<i>a</i> = 5<span class="pot"><i>a</i><sup>2</sup></span></td><td>3<i>a</i> + 2<i>a</i> = 5<i>a</i></td><td>nella somma la parte letterale non cambia</td></tr>
<tr><td>3<i>a</i> + 2<i>b</i> = 5<i>ab</i></td><td>3<i>a</i> + 2<i>b</i></td><td>monomi non simili non si sommano</td></tr>
<tr><td><i>a</i> · <i>a</i> = 2<i>a</i></td><td><i>a</i> · <i>a</i> = <span class="pot"><i>a</i><sup>2</sup></span></td><td>nel prodotto si sommano gli esponenti</td></tr>
<tr><td><span class="pot"><i>a</i><sup>2</sup></span> · <span class="pot"><i>a</i><sup>3</sup></span> = <span class="pot"><i>a</i><sup>6</sup></span></td><td><span class="pot"><i>a</i><sup>2</sup></span> · <span class="pot"><i>a</i><sup>3</sup></span> = <span class="pot"><i>a</i><sup>5</sup></span></td><td>gli esponenti si moltiplicano solo nella potenza</td></tr>
<tr><td><span class="pot">(2<i>a</i>)<sup>3</sup></span> = 2<span class="pot"><i>a</i><sup>3</sup></span></td><td><span class="pot">(2<i>a</i>)<sup>3</sup></span> = 8<span class="pot"><i>a</i><sup>3</sup></span></td><td>si eleva anche il coefficiente</td></tr>
</table></div>
<h3>Un controllo con i numeri</h3>
<p>Per scoprire un errore in un calcolo letterale c'è un trucco semplice. Si scelgono dei valori per le lettere, per esempio <i>a</i> = 2 e <i>b</i> = 1, e si calcola il valore numerico dell'espressione di partenza e quello del risultato. Se i due valori sono diversi, c'è sicuramente un errore.</p>
<div class="esempio"><b>Esempio</b>Nel primo esempio, con <i>a</i> = 2 e <i>b</i> = 1, l'espressione di partenza vale <span class="pot">(−12)<sup>2</sup></span> : 36 + 4 · (−2) = 144 : 36 − 8 = 4 − 8 = −4.<br>
Il risultato −<span class="pot"><i>a</i><sup>2</sup></span><i>b</i> vale −4 · 1 = −4. I due valori coincidono.</div>
<p>Se i valori coincidono il risultato è probabilmente giusto, ma non è una prova. Conviene scegliere valori diversi fra loro e diversi da 0 e da 1, che nascondono molti errori, perché <span class="pot">1<sup>2</sup></span> = <span class="pot">1<sup>3</sup></span> = 1.</p>
<div class="curiosita" data-img="cas" data-titolo="I computer che calcolano con le lettere">
<p>Le prime calcolatrici sapevano lavorare solo con i numeri. Nel 1968, al Massachusetts Institute of Technology, iniziò lo sviluppo di <b>Macsyma</b>, uno dei primi programmi capaci di fare calcoli con le lettere. Sapeva ridurre i termini simili, moltiplicare monomi e polinomi, semplificare.</p>
<p>Oggi programmi di questo tipo si chiamano CAS, dall'inglese <i>Computer Algebra System</i>, e si trovano anche in GeoGebra e in alcune calcolatrici scientifiche. Per usarli bene, però, bisogna sapere che cosa si sta chiedendo e controllare se la risposta è ragionevole. Per esempio, un CAS scrive spesso i risultati in un ordine diverso dal nostro.</p>
</div>
`},
  { n: 7, id: "p7", titolo: "MCD e mcm di monomi", html: `
<p>Nel capitolo 1 abbiamo imparato a calcolare il massimo comune divisore e il minimo comune multiplo di numeri naturali. Le stesse idee valgono per i monomi, e ci serviranno nei prossimi capitoli per raccogliere a fattore comune e per sommare le frazioni algebriche.</p>
<p>Un monomio <i>D</i> è un <b>divisore</b> di un monomio <i>A</i> se <i>A</i> è divisibile per <i>D</i>. Per esempio 3<span class="pot"><i>a</i><sup>2</sup></span> è un divisore di 6<span class="pot"><i>a</i><sup>3</sup></span><i>b</i>, perché 6<span class="pot"><i>a</i><sup>3</sup></span><i>b</i> : (3<span class="pot"><i>a</i><sup>2</sup></span>) = 2<i>ab</i>. Un monomio <i>M</i> è un <b>multiplo</b> di <i>A</i> se è divisibile per <i>A</i>.</p>
<div class="definizione"><b>Definizione</b>
<ul><li>Il <b>massimo comune divisore</b> di due o più monomi, MCD, è il monomio di grado più alto che è divisore di tutti.</li>
<li>Il <b>minimo comune multiplo</b> di due o più monomi, mcm, è il monomio di grado più basso che è multiplo di tutti.</li></ul></div>
<div class="regola"><b>Regola · Come si calcolano MCD e mcm</b>
<table class="tab">
<tr><th></th><th>MCD</th><th>mcm</th></tr>
<tr><td>coefficiente</td><td>MCD dei valori assoluti dei coefficienti</td><td>mcm dei valori assoluti dei coefficienti</td></tr>
<tr><td>lettere</td><td>solo le lettere <b>comuni</b>, con l'esponente <b>minore</b></td><td><b>tutte</b> le lettere, con l'esponente <b>maggiore</b></td></tr></table>
Se i coefficienti non sono tutti interi, per convenzione il coefficiente del MCD e del mcm è 1. MCD e mcm si prendono sempre con il segno +.</div>
<div class="esempio"><b>Esempio</b>Calcoliamo MCD(12<span class="pot"><i>a</i><sup>3</sup></span><span class="pot"><i>b</i><sup>2</sup></span>; 18<span class="pot"><i>a</i><sup>2</sup></span><i>b</i><i>c</i>) e mcm(12<span class="pot"><i>a</i><sup>3</sup></span><span class="pot"><i>b</i><sup>2</sup></span>; 18<span class="pot"><i>a</i><sup>2</sup></span><i>b</i><i>c</i>).
<ol class="passaggi">
<li>Si scompongono i coefficienti in fattori primi. &emsp; 12 = <span class="pot">2<sup>2</sup></span> · 3 &ensp; 18 = 2 · <span class="pot">3<sup>2</sup></span></li>
<li>Coefficiente del MCD, fattori comuni con l'esponente minore. &emsp; <span class="c1">2 · 3 = 6</span></li>
<li>Lettere del MCD. <span class="perche"><i>a</i> e <i>b</i> sono comuni, <i>c</i> compare solo nel secondo monomio.</span> &emsp; <span class="c2"><span class="pot"><i>a</i><sup>2</sup></span><i>b</i></span> &emsp; MCD = <span class="c1">6</span><span class="c2"><span class="pot"><i>a</i><sup>2</sup></span><i>b</i></span></li>
<li>Coefficiente del mcm, tutti i fattori con l'esponente maggiore. &emsp; <span class="c1"><span class="pot">2<sup>2</sup></span> · <span class="pot">3<sup>2</sup></span> = 36</span></li>
<li>Lettere del mcm, tutte con l'esponente maggiore. &emsp; <span class="c2"><span class="pot"><i>a</i><sup>3</sup></span><span class="pot"><i>b</i><sup>2</sup></span><i>c</i></span> &emsp; mcm = <span class="c1">36</span><span class="c2"><span class="pot"><i>a</i><sup>3</sup></span><span class="pot"><i>b</i><sup>2</sup></span><i>c</i></span></li></ol></div>
<p>Può aiutare una tabella degli esponenti, con una riga per monomio e una colonna per lettera. Per il MCD si sceglie in ogni colonna il numero più piccolo, per il mcm il più grande.</p>
<table class="tab">
<tr><th>monomio</th><th>coefficiente</th><th>esponente di <i>a</i></th><th>esponente di <i>b</i></th><th>esponente di <i>c</i></th></tr>
<tr><td>12<span class="pot"><i>a</i><sup>3</sup></span><span class="pot"><i>b</i><sup>2</sup></span></td><td><span class="pot">2<sup>2</sup></span> · 3</td><td>3</td><td>2</td><td>0</td></tr>
<tr><td>18<span class="pot"><i>a</i><sup>2</sup></span><i>b</i><i>c</i></td><td>2 · <span class="pot">3<sup>2</sup></span></td><td>2</td><td>1</td><td>1</td></tr>
<tr><td><b>MCD</b></td><td>6</td><td>2</td><td>1</td><td>0</td></tr>
<tr><td><b>mcm</b></td><td>36</td><td>3</td><td>2</td><td>1</td></tr></table>
<div class="esempio"><b>Esempio</b>MCD(8<span class="pot"><i>x</i><sup>2</sup></span>; −12<i>x</i><i>y</i>; 20<span class="pot"><i>x</i><sup>3</sup></span><span class="pot"><i>y</i><sup>2</sup></span>) = 4<i>x</i> &emsp; mcm(8<span class="pot"><i>x</i><sup>2</sup></span>; −12<i>x</i><i>y</i>; 20<span class="pot"><i>x</i><sup>3</sup></span><span class="pot"><i>y</i><sup>2</sup></span>) = 120<span class="pot"><i>x</i><sup>3</sup></span><span class="pot"><i>y</i><sup>2</sup></span><br>
MCD<span class="gp gt"><span class="gpL"></span><span class="gpC"><span class="fr"><span>2</span><span>3</span></span><span class="pot"><i>x</i><sup>2</sup></span><i>y</i>; 4<i>x</i><span class="pot"><i>y</i><sup>3</sup></span></span><span class="gpR"></span></span> = <i>x</i><i>y</i> &emsp; mcm<span class="gp gt"><span class="gpL"></span><span class="gpC"><span class="fr"><span>2</span><span>3</span></span><span class="pot"><i>x</i><sup>2</sup></span><i>y</i>; 4<i>x</i><span class="pot"><i>y</i><sup>3</sup></span></span><span class="gpR"></span></span> = <span class="pot"><i>x</i><sup>2</sup></span><span class="pot"><i>y</i><sup>3</sup></span> &emsp; il coefficiente è 1, perché <span class="fr"><span>2</span><span>3</span></span> non è intero<br>
MCD(2<i>a</i>; 3<i>b</i>) = 1 &emsp; i due monomi non hanno divisori comuni, a parte i numeri, e si dicono <b>primi fra loro</b></div>
<p>Come per i numeri naturali, per due monomi con coefficienti interi positivi il prodotto del MCD per il mcm è uguale al prodotto dei due monomi. Nel primo esempio 6<span class="pot"><i>a</i><sup>2</sup></span><i>b</i> · 36<span class="pot"><i>a</i><sup>3</sup></span><span class="pot"><i>b</i><sup>2</sup></span><i>c</i> = 216<span class="pot"><i>a</i><sup>5</sup></span><span class="pot"><i>b</i><sup>3</sup></span><i>c</i>, e anche 12<span class="pot"><i>a</i><sup>3</sup></span><span class="pot"><i>b</i><sup>2</sup></span> · 18<span class="pot"><i>a</i><sup>2</sup></span><i>bc</i> = 216<span class="pot"><i>a</i><sup>5</sup></span><span class="pot"><i>b</i><sup>3</sup></span><i>c</i>. Il motivo è che, per ogni lettera, l'esponente minore più l'esponente maggiore è uguale alla somma dei due esponenti.</p>
<div class="curiosita" data-img="ingranaggi" data-titolo="Gli ingranaggi e il minimo comune multiplo">
<p>Due ruote dentate ingranano fra loro, una con 12 denti e l'altra con 18. Segniamo il dente della prima che tocca il dente della seconda. Dopo quanti denti i due segni torneranno a toccarsi?</p>
<p>La prima ruota torna nella posizione di partenza ogni 12 denti, la seconda ogni 18. I segni si ritrovano dopo mcm(12; 18) = 36 denti, cioè dopo 3 giri della prima ruota e 2 della seconda. Per questo nelle biciclette e negli orologi si scelgono spesso numeri di denti primi fra loro, così ogni dente tocca tutti i denti dell'altra ruota e le ruote si consumano in modo uniforme.</p>
</div>
`},
  { n: 8, id: "p8", titolo: "I monomi come modelli", html: `
<p>I monomi sono il modo più naturale per descrivere grandezze che si ottengono <b>moltiplicando</b> altre grandezze, come le aree e i volumi, e per tradurre in simboli molte situazioni reali.</p>
<h3>Perimetri, aree e volumi</h3>
<figure class="fig-testo"><svg viewBox="0 0 260 150" xmlns="http://www.w3.org/2000/svg" role="img"><path d="M40 20 h36 v72 h108 v36 h-144 z" fill="#fbe3cf" stroke="#c8621f" stroke-width="2"/><line x1="40" y1="92" x2="76" y2="92" stroke="#c8621f" stroke-dasharray="4 3"/><text x="112" y="148" font-size="15" font-family="serif" text-anchor="middle" fill="#2a2620">4<tspan font-style="italic">a</tspan></text><text x="28" y="79.0" font-size="15" font-family="serif" text-anchor="end" fill="#2a2620">3<tspan font-style="italic">a</tspan></text><text x="58.0" y="14" font-size="15" font-family="serif" text-anchor="middle" fill="#2a2620"><tspan font-style="italic">a</tspan></text><text x="192" y="115.0" font-size="15" font-family="serif" text-anchor="start" fill="#2a2620"><tspan font-style="italic">a</tspan></text></svg><figcaption>Una figura a forma di L. Le misure sono espresse con la lettera <i>a</i>.</figcaption></figure>
<div class="esempio"><b>Esempio</b>Nella figura a forma di L la parte in basso è un rettangolo di lati 4<i>a</i> e <i>a</i>. La parte in alto è un rettangolo di lati <i>a</i> e 2<i>a</i>, perché l'altezza totale è 3<i>a</i>.
<ol class="passaggi">
<li>Area. <span class="perche">Si sommano le aree dei due rettangoli.</span> &emsp; 4<i>a</i> · <i>a</i> + <i>a</i> · 2<i>a</i> = 4<span class="pot"><i>a</i><sup>2</sup></span> + 2<span class="pot"><i>a</i><sup>2</sup></span> = (4 + 2)<span class="pot"><i>a</i><sup>2</sup></span> = 6<span class="pot"><i>a</i><sup>2</sup></span></li>
<li>Perimetro. <span class="perche">Si percorre il contorno partendo dall'angolo in basso a sinistra, in senso orario.</span> &emsp; 3<i>a</i> + <i>a</i> + 2<i>a</i> + 3<i>a</i> + <i>a</i> + 4<i>a</i> = (3 + 1 + 2 + 3 + 1 + 4)<i>a</i> = 14<i>a</i></li></ol></div>
<figure class="fig-testo"><svg viewBox="0 0 260 140" xmlns="http://www.w3.org/2000/svg" role="img"><path d="M40 60 h150 v50 h-150 z" fill="#d6ede0" stroke="#2a7a52" stroke-width="2"/><path d="M40 60 l35.0 -25.0 h150 l-35.0 25.0 z" fill="#e8f5ee" stroke="#2a7a52" stroke-width="2"/><path d="M190 60 l35.0 -25.0 v50 l-35.0 25.0 z" fill="#bfe2cf" stroke="#2a7a52" stroke-width="2"/><text x="115.0" y="132" font-size="15" font-family="serif" text-anchor="middle" fill="#2a2620">3<tspan font-style="italic">a</tspan></text><text x="231.0" y="65.0" font-size="15" font-family="serif" text-anchor="start" fill="#2a2620"><tspan font-style="italic">a</tspan></text><text x="203.5" y="41.5" font-size="15" font-family="serif" text-anchor="end" fill="#2a2620">2<tspan font-style="italic">a</tspan></text></svg><figcaption>Una scatola a forma di parallelepipedo, con spigoli 3<i>a</i>, 2<i>a</i> e <i>a</i>.</figcaption></figure>
<div class="esempio"><b>Esempio</b>Il volume della scatola è 3<i>a</i> · 2<i>a</i> · <i>a</i> = 6<span class="pot"><i>a</i><sup>1+1+1</sup></span> = 6<span class="pot"><i>a</i><sup>3</sup></span>.<br>
La superficie totale è formata da tre coppie di facce uguali, di aree 3<i>a</i> · 2<i>a</i> = 6<span class="pot"><i>a</i><sup>2</sup></span>, 3<i>a</i> · <i>a</i> = 3<span class="pot"><i>a</i><sup>2</sup></span> e 2<i>a</i> · <i>a</i> = 2<span class="pot"><i>a</i><sup>2</sup></span>. Quindi è 2 · (6<span class="pot"><i>a</i><sup>2</sup></span> + 3<span class="pot"><i>a</i><sup>2</sup></span> + 2<span class="pot"><i>a</i><sup>2</sup></span>) = 2 · 11<span class="pot"><i>a</i><sup>2</sup></span> = 22<span class="pot"><i>a</i><sup>2</sup></span>.</div>
<h3>Il grado ci dice che cosa stiamo misurando</h3>
<p>Se la lettera <i>a</i> indica una lunghezza, il grado di un monomio corrisponde alla «dimensione» della grandezza.</p>
<table class="tab">
<tr><th>Grandezza</th><th>Grado</th><th>Esempio</th><th>Unità di misura</th></tr>
<tr><td>lunghezza, perimetro</td><td>1</td><td>14<i>a</i></td><td>metri</td></tr>
<tr><td>area</td><td>2</td><td>6<span class="pot"><i>a</i><sup>2</sup></span></td><td>metri quadrati</td></tr>
<tr><td>volume</td><td>3</td><td>6<span class="pot"><i>a</i><sup>3</sup></span></td><td>metri cubi</td></tr></table>
<div class="attenzione"><b>Attenzione</b>Se calcolando un'area si ottiene un monomio di grado 3, c'è sicuramente un errore. Il controllo del grado è veloce e scopre molti sbagli, ma non tutti. Un errore nel coefficiente, per esempio 5<span class="pot"><i>a</i><sup>2</sup></span> invece di 6<span class="pot"><i>a</i><sup>2</sup></span>, lascia il grado giusto.</div>
<h3>Che cosa succede se le misure raddoppiano</h3>
<figure class="fig-testo"><svg viewBox="0 0 240 110" xmlns="http://www.w3.org/2000/svg" role="img"><rect x="30" y="40" width="30" height="30" fill="#dbe6f7" stroke="#1f4fa3" stroke-width="2"/><text x="45.0" y="92" font-size="15" font-family="serif" text-anchor="middle" fill="#2a2620"><tspan font-style="italic">a</tspan></text><rect x="120" y="10" width="30" height="30" fill="#fbe3cf" stroke="#c8621f" stroke-width="2"/><rect x="120" y="40" width="30" height="30" fill="#fbe3cf" stroke="#c8621f" stroke-width="2"/><rect x="150" y="10" width="30" height="30" fill="#fbe3cf" stroke="#c8621f" stroke-width="2"/><rect x="150" y="40" width="30" height="30" fill="#fbe3cf" stroke="#c8621f" stroke-width="2"/><text x="150" y="92" font-size="15" font-family="serif" text-anchor="middle" fill="#2a2620">2<tspan font-style="italic">a</tspan></text><text x="80" y="55" font-size="22" font-family="serif" text-anchor="middle" fill="#2a2620" font-weight="400">→</text></svg><figcaption>Se il lato raddoppia, nel quadrato grande entrano 4 quadrati piccoli.</figcaption></figure>
<p>Se raddoppiamo il lato <i>a</i> della figura a forma di L, al posto di <i>a</i> dobbiamo scrivere 2<i>a</i>. L'area diventa 6 · <span class="pot">(2<i>a</i>)<sup>2</sup></span> = 6 · 4<span class="pot"><i>a</i><sup>2</sup></span> = 24<span class="pot"><i>a</i><sup>2</sup></span>, cioè 4 volte quella di prima. Il volume della scatola diventa 6 · <span class="pot">(2<i>a</i>)<sup>3</sup></span> = 48<span class="pot"><i>a</i><sup>3</sup></span>, cioè 8 volte quello di prima.</p>
<div class="regola"><b>Regola</b>Se tutte le lunghezze di una figura si moltiplicano per <i>k</i>, i perimetri si moltiplicano per <i>k</i>, le aree per <span class="pot"><i>k</i><sup>2</sup></span> e i volumi per <span class="pot"><i>k</i><sup>3</sup></span>. L'esponente è proprio il grado del monomio.</div>
<h3>Tradurre un problema in monomi</h3>
<p>Per risolvere un problema con le lettere si sceglie una lettera per la grandezza che non si conosce, si scrivono le altre grandezze in funzione di quella lettera e si calcola.</p>
<div class="esempio"><b>Esempio</b>Un quaderno costa <i>q</i> euro e una penna costa la metà di un quaderno. Quanto spende chi compra 4 quaderni e 6 penne?
<ol class="passaggi">
<li>Si scrive il prezzo di una penna. &emsp; <span class="fr"><span>1</span><span>2</span></span><i>q</i></li>
<li>Si scrive la spesa totale. &emsp; 4<i>q</i> + 6 · <span class="fr"><span>1</span><span>2</span></span><i>q</i> = 4<i>q</i> + 3<i>q</i> = (4 + 3)<i>q</i> = 7<i>q</i></li>
<li>Si usa il risultato. <span class="perche">La formula vale per qualunque prezzo del quaderno.</span> &emsp; se <i>q</i> = 1,50 euro, la spesa è 7 · 1,50 = 10,50 euro</li></ol></div>
<div class="esempio"><b>Esempio</b>Un cortile quadrato ha il lato formato da <i>n</i> mattonelle quadrate, quindi contiene <span class="pot"><i>n</i><sup>2</sup></span> mattonelle. Un cortile con il lato tre volte più lungo ne contiene <span class="pot">(3<i>n</i>)<sup>2</sup></span> = 9<span class="pot"><i>n</i><sup>2</sup></span>, cioè 9 volte di più.</div>
<div class="curiosita" data-img="fourier" data-titolo="Le formule dei fisici si controllano con le unità">
<p>Nel 1822 il matematico francese Joseph Fourier, nel libro <i>Teoria analitica del calore</i>, spiegò che in ogni formula della fisica tutti i termini devono avere le stesse «dimensioni», cioè le stesse unità di misura. È la versione moderna della legge di omogeneità di Viète.</p>
<p>Oggi questo controllo si chiama <b>analisi dimensionale</b> ed è uno dei primi che fanno scienziati e ingegneri. Per esempio, nella formula dello spazio percorso da un corpo che cade, <i>s</i> = <span class="fr"><span>1</span><span>2</span></span><span class="pot"><i>gt</i><sup>2</sup></span>, l'accelerazione <i>g</i> si misura in <span class="pot"><em class="u">m/s</em><sup>2</sup></span> e il tempo in secondi. Moltiplicando, <span class="pot"><em class="u">m/s</em><sup>2</sup></span> · <span class="pot"><em class="u">s</em><sup>2</sup></span> = <em class="u">m</em>, proprio come si semplificano i monomi. Il risultato è una lunghezza, come deve essere.</p>
</div>
`},
  ]
};
