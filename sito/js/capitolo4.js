/* =====================================================================
   CAPITOLO 4 – GLI INSIEMI E LA LOGICA &emsp; (testi originali)
   File generato da generatori/teoria_cap4.py: per modificare i testi si cambia quel file e lo si rilancia.
   ===================================================================== */
LIBRO.capitoli.cap4 = {
  id: "cap4", anno: 1, numero: 4,
  titolo: "Gli insiemi e la logica",
  sottotitolo: "Raggruppare, contare e ragionare con ordine, dai diagrammi di Venn alle tavole di verità.",
  pdf: "pdf/capitolo-4-insiemi-logica.pdf",
  storia: `
<p class="storia-domanda">Come si mettono in ordine le cose del mondo, e come si fa a ragionare senza sbagliare?</p>
<p>Fin dall'antichità le persone hanno avuto due bisogni molto pratici. Il primo è <b>classificare</b>: dividere piante e animali in gruppi, separare le merci di un magazzino, decidere chi ha diritto a votare in un'assemblea. Il secondo è <b>argomentare</b>: nei tribunali e nelle piazze di Atene vinceva chi sapeva dimostrare che una conclusione segue davvero dalle premesse, e chi sapeva scoprire l'errore nel discorso dell'avversario. Dal primo bisogno nasce l'idea di <b>insieme</b>, dal secondo la <b>logica</b>. Nell'Ottocento i matematici si accorgono che le due cose sono strettamente legate, e nel Novecento questa scoperta permette di costruire i calcolatori.</p>
<ol class="linea-tempo">
<li><span class="data">IV secolo a.C.</span><b>Aristotele</b> studia i <b>sillogismi</b>, ragionamenti come «tutti gli uomini sono mortali, Socrate è un uomo, quindi Socrate è mortale», e ne cerca le forme corrette.</li>
<li><span class="data">III secolo a.C.</span>Il filosofo stoico <b>Crisippo</b> studia le proposizioni collegate da «e», «o», «se… allora» e descrive schemi di ragionamento che useremo ancora oggi.</li>
<li><span class="data">1666</span><b>Gottfried Wilhelm Leibniz</b> sogna una lingua in cui ragionare sia come fare un calcolo, così che le dispute si risolvano dicendo «calcoliamo».</li>
<li><span class="data">1768</span>Nelle <i>Lettere a una principessa tedesca</i> <b>Leonhard Euler</b> (Eulero) spiega i sillogismi disegnando cerchi uno dentro l'altro o uno accanto all'altro.</li>
<li><span class="data">1847</span><b>George Boole</b> e <b>Augustus De Morgan</b> pubblicano, nello stesso anno, due libri che trattano la logica con i simboli dell'algebra.</li>
<li><span class="data">1874</span><b>Georg Cantor</b> pubblica il primo dei suoi lavori sugli insiemi infiniti, che daranno origine alla <b>teoria degli insiemi</b>.</li>
<li><span class="data">1880</span><b>John Venn</b> propone i diagrammi con le curve che si intersecano, che oggi portano il suo nome insieme a quello di Eulero.</li>
<li><span class="data">1889</span><b>Giuseppe Peano</b> introduce il simbolo ∈ («appartiene»), dalla lettera greca epsilon, iniziale della parola che significa «è».</li>
<li><span class="data">1937</span><b>Claude Shannon</b> mostra che i circuiti elettrici con gli interruttori seguono le regole della logica di Boole. È il primo passo verso i computer.</li>
</ol>
<p class="storia-capitolo"><b>In questo capitolo</b> impariamo a descrivere gli insiemi e i loro sottoinsiemi, a operare con loro e a usare i diagrammi di Eulero-Venn per risolvere problemi di conteggio. Poi passiamo alla logica, cioè alle proposizioni, ai connettivi e alle tavole di verità, e vediamo quali ragionamenti sono corretti. Nell'ultimo paragrafo scopriamo che insiemi e logica sono due facce della stessa medaglia.</p>
`,
  sintesi: `
<div class="sint-blocco"><h3><span>1</span>Gli insiemi e come si descrivono</h3>
<p>Un raggruppamento è un <b>insieme</b> se c'è un criterio oggettivo per decidere se un oggetto ne fa parte. <i>x</i> ∈ <i>A</i> si legge «<i>x</i> appartiene ad <i>A</i>», <i>x</i> ∉ <i>A</i> «non appartiene».</p>
<ul class="sint-lista"><li><span class="mat">{1, 2, 3, 4, 6, 12}</span><span class="nota">per <b>elencazione</b>, ogni elemento una volta, l'ordine non conta</span></li>
<li><span class="mat">{<i>x</i> ∈ ℕ | <i>x</i> è divisore di 12}</span><span class="nota">con la <b>proprietà caratteristica</b></span></li>
<li><span class="mat">diagramma di Eulero-Venn</span><span class="nota">linea chiusa con gli elementi dentro</span></li></ul>
<p>∅ è l'insieme <b>vuoto</b>. |<i>A</i>| è la <b>cardinalità</b>, il numero degli elementi di un insieme finito. Due insiemi sono <b>uguali</b> se hanno gli stessi elementi.</p>
</div>
<div class="sint-blocco"><h3><span>2</span>Sottoinsiemi e insieme delle parti</h3>
<p><i>B</i> ⊆ <i>A</i> se ogni elemento di <i>B</i> sta in <i>A</i>. <i>A</i> e ∅ sono i sottoinsiemi <b>impropri</b>, gli altri sono <b>propri</b> (<i>B</i> ⊂ <i>A</i>). Il simbolo ∈ va fra elemento e insieme, ⊆ fra due insiemi.</p>
<p>L'<b>insieme delle parti</b> 𝒫(<i>A</i>) ha per elementi tutti i sottoinsiemi di <i>A</i>.</p>
<p class="formula">|<i>A</i>| = <i>n</i> &emsp; ⟹ &emsp; |𝒫(<i>A</i>)| = <span class="pot">2<sup><i>n</i></sup></span></p>
</div>
<div class="sint-blocco"><h3><span>3</span>Le operazioni tra insiemi</h3>
<ul class="sint-lista"><li><span class="mat"><i>A</i> ∩ <i>B</i></span><span class="nota"><b>intersezione</b>, elementi comuni (se è ∅ gli insiemi sono disgiunti)</span></li>
<li><span class="mat"><i>A</i> ∪ <i>B</i></span><span class="nota"><b>unione</b>, elementi di almeno uno dei due</span></li>
<li><span class="mat"><i>A</i> − <i>B</i></span><span class="nota"><b>differenza</b>, elementi di <i>A</i> che non stanno in <i>B</i> (non commutativa)</span></li>
<li><span class="mat"><span class="compl"><i>A</i></span> = <i>U</i> − <i>A</i></span><span class="nota"><b>complementare</b> rispetto all'universo <i>U</i></span></li></ul>
<p>∩ e ∪ sono commutative e associative, ciascuna è distributiva rispetto all'altra.</p>
<p class="formula"><span class="compl"><i>A</i> ∪ <i>B</i></span> = <span class="compl"><i>A</i></span> ∩ <span class="compl"><i>B</i></span> &emsp; <span class="compl"><i>A</i> ∩ <i>B</i></span> = <span class="compl"><i>A</i></span> ∪ <span class="compl"><i>B</i></span> &emsp; (De Morgan)</p>
</div>
<div class="sint-blocco"><h3><span>4</span>Prodotto cartesiano e partizioni</h3>
<p>Nella <b>coppia ordinata</b> (<i>a</i>; <i>b</i>) l'ordine conta. <i>A</i> × <i>B</i> = {(<i>x</i>; <i>y</i>) | <i>x</i> ∈ <i>A</i> e <i>y</i> ∈ <i>B</i>}, rappresentabile per elencazione, con l'albero, con la tabella a doppia entrata e con il diagramma cartesiano.</p>
<p class="formula">|<i>A</i> × <i>B</i>| = |<i>A</i>| · |<i>B</i>| &emsp; <i>A</i> × <i>B</i> ≠ <i>B</i> × <i>A</i></p>
<p>Una <b>partizione</b> di <i>A</i> è una famiglia di sottoinsiemi non vuoti, a due a due disgiunti, la cui unione è <i>A</i>.</p>
</div>
<div class="sint-blocco"><h3><span>5</span>Contare con i diagrammi di Venn</h3>
<p class="formula">|<i>A</i> ∪ <i>B</i>| = |<i>A</i>| + |<i>B</i>| − |<i>A</i> ∩ <i>B</i>|</p>
<p>Nei problemi si scrive nel diagramma il numero di elementi di ogni zona, partendo dalla zona comune a tutti gli insiemi e andando verso l'esterno. Alla fine si controlla che la somma delle zone dia il totale.</p>
<div class="esempio"><b>Esempio</b>|<i>A</i>| = 14, |<i>B</i>| = 9, |<i>A</i> ∩ <i>B</i>| = 5 &emsp; solo <i>A</i> 9, solo <i>B</i> 4, almeno uno 18.</div>
</div>
<div class="sint-blocco"><h3><span>6</span>Proposizioni e connettivi</h3>
<p>Una <b>proposizione</b> è una frase vera (V) o falsa (F) in modo oggettivo.</p>
<table class="tab tav"><tr><th><i>p</i></th><th><i>q</i></th><th><span class="compl"><i>p</i></span></th><th><i>p</i> ∧ <i>q</i></th><th><i>p</i> ∨ <i>q</i></th><th><i>p</i> ⊻ <i>q</i></th></tr><tr><td>V</td><td>V</td><td>F</td><td>V</td><td>V</td><td>F</td></tr><tr><td>V</td><td>F</td><td>F</td><td>F</td><td>V</td><td>V</td></tr><tr><td>F</td><td>V</td><td>V</td><td>F</td><td>V</td><td>V</td></tr><tr><td>F</td><td>F</td><td>V</td><td>F</td><td>F</td><td>F</td></tr></table>
<p><i>p</i> ∧ <i>q</i> è vera solo se lo sono entrambe, <i>p</i> ∨ <i>q</i> è falsa solo se lo sono entrambe, <i>p</i> ⊻ <i>q</i> è vera se una sola è vera.</p>
</div>
<div class="sint-blocco"><h3><span>7</span>Implicazione, doppia implicazione, espressioni logiche</h3>
<p><i>p</i> → <i>q</i> è falsa solo se <i>p</i> è V e <i>q</i> è F. <i>p</i> è condizione <b>sufficiente</b> per <i>q</i>, <i>q</i> è condizione <b>necessaria</b> per <i>p</i>. <i>p</i> ↔ <i>q</i> è vera se <i>p</i> e <i>q</i> hanno lo stesso valore.</p>
<p><b>Tautologia</b> sempre vera, <b>contraddizione</b> sempre falsa, espressioni <b>equivalenti</b> (≡) con la stessa tavola.</p>
<p class="formula"><i>p</i> → <i>q</i> ≡ <span class="compl"><i>q</i></span> → <span class="compl"><i>p</i></span> &emsp; <span class="compl"><i>p</i> ∧ <i>q</i></span> ≡ <span class="compl"><i>p</i></span> ∨ <span class="compl"><i>q</i></span> &emsp; <span class="compl"><i>p</i> ∨ <i>q</i></span> ≡ <span class="compl"><i>p</i></span> ∧ <span class="compl"><i>q</i></span> &emsp; <span class="compl"><i>p</i> → <i>q</i></span> ≡ <i>p</i> ∧ <span class="compl"><i>q</i></span></p>
</div>
<div class="sint-blocco"><h3><span>8</span>Ragionare correttamente</h3>
<p>Un ragionamento è <b>valido</b> se ogni volta che le premesse sono vere è vera anche la conclusione.</p>
<ul class="sint-lista"><li><span class="mat"><i>p</i> → <i>q</i>, <i>p</i> ⟹ <i>q</i></span><span class="nota">modus ponens</span></li><li><span class="mat"><i>p</i> → <i>q</i>, <span class="compl"><i>q</i></span> ⟹ <span class="compl"><i>p</i></span></span><span class="nota">modus tollens</span></li>
<li><span class="mat"><i>p</i> → <i>q</i>, <i>q</i> → <i>r</i> ⟹ <i>p</i> → <i>r</i></span><span class="nota">sillogismo ipotetico</span></li><li><span class="mat"><i>p</i> ∨ <i>q</i>, <span class="compl"><i>p</i></span> ⟹ <i>q</i></span><span class="nota">sillogismo disgiuntivo</span></li></ul>
<p>Non sono validi l'affermazione del conseguente (<i>p</i> → <i>q</i>, <i>q</i>, quindi <i>p</i>) e la negazione dell'antecedente (<i>p</i> → <i>q</i>, <span class="compl"><i>p</i></span>, quindi <span class="compl"><i>q</i></span>).</p>
</div>
<div class="sint-blocco"><h3><span>9</span>Enunciati aperti, quantificatori e insiemi</h3>
<p>Un <b>enunciato aperto</b> <i>p</i>(<i>x</i>) diventa vero o falso sostituendo <i>x</i>. Il suo <b>insieme di verità</b> è formato dagli elementi che lo rendono vero.</p>
<p>non ↔ complementare &emsp; e ↔ ∩ &emsp; o ↔ ∪ &emsp; <i>p</i> → <i>q</i> sempre vera ↔ <i>P</i> ⊆ <i>Q</i></p>
<p>∀ «per ogni», ∃ «esiste almeno un», ∃! «esiste uno e un solo».</p>
<p class="formula"><span class="compl">∀ <i>x</i>, <i>p</i>(<i>x</i>)</span> ≡ ∃ <i>x</i> | <span class="compl"><i>p</i>(<i>x</i>)</span> &emsp; <span class="compl">∃ <i>x</i> | <i>p</i>(<i>x</i>)</span> ≡ ∀ <i>x</i>, <span class="compl"><i>p</i>(<i>x</i>)</span></p>
</div>
`,
  paragrafi: [
  { n: 1, id: "p1", titolo: "Gli insiemi e come si descrivono", html: `
<p>Nella vita di tutti i giorni usiamo spesso parole come <i>gruppo</i>, <i>raccolta</i>, <i>collezione</i>, <i>squadra</i>. Gli studenti di una classe, i giorni della settimana, le carte di un mazzo sono esempi di oggetti considerati tutti insieme. In matematica questa idea si chiama <b>insieme</b>, e gli oggetti che ne fanno parte si chiamano <b>elementi</b>.</p>
<p>Il concetto di insieme è un <b>concetto primitivo</b>, cioè non si definisce con parole più semplici, come accade per il punto e la retta in geometria. Si richiede però una condizione precisa.</p>
<div class="definizione"><b>Definizione</b>
Un raggruppamento di oggetti è un <b>insieme</b> se c'è un criterio <b>oggettivo</b> che permette di stabilire, per ogni oggetto, se fa parte del raggruppamento oppure no.</div>
<div class="esempio"><b>Esempio</b>«I numeri naturali minori di 10» è un insieme, perché per qualunque numero possiamo dire con certezza se è minore di 10.<br>«Le canzoni più belle dell'anno» non è un insieme, perché ognuno ha i suoi gusti e due persone potrebbero dare risposte diverse.<br>«Gli studenti della classe più alti di 1,70 m» è un insieme, perché l'altezza si misura.</div>
<h3>Appartenenza</h3>
<p>Di solito gli insiemi si indicano con le lettere maiuscole <i>A</i>, <i>B</i>, <i>C</i>…, gli elementi con le lettere minuscole o con il loro nome.</p>
<div class="definizione"><b>Definizione</b>
Se <i>x</i> è un elemento dell'insieme <i>A</i> si scrive <span class="mat"><i>x</i> ∈ <i>A</i></span> e si legge «<i>x</i> appartiene ad <i>A</i>». Se <i>x</i> non è un elemento di <i>A</i> si scrive <span class="mat"><i>x</i> ∉ <i>A</i></span>, «<i>x</i> non appartiene ad <i>A</i>».</div>
<div class="esempio"><b>Esempio</b>Se <i>P</i> è l'insieme dei numeri primi, allora 7 ∈ <i>P</i>, perché 7 ha solo i divisori 1 e 7, e 9 ∉ <i>P</i>, perché 9 è divisibile per 3.</div>
<p>Alcuni insiemi di numeri hanno un nome fisso, che conosciamo dai capitoli precedenti. Sono ℕ (numeri naturali), ℤ (numeri interi), ℚ (numeri razionali) e ℝ (numeri reali). Per esempio −3 ∈ ℤ ma −3 ∉ ℕ.</p>
<h3>Tre modi per rappresentare un insieme</h3>
<p>Consideriamo l'insieme <i>A</i> dei divisori di 12. Possiamo descriverlo in tre modi diversi.</p>
<p><b>1. Per elencazione</b> (o rappresentazione tabulare). Si scrivono tutti gli elementi fra parentesi graffe, separati da virgole.</p>
<p class="formula"><i>A</i> = {1, 2, 3, 4, 6, 12}</p>
<p>Ogni elemento si scrive <b>una sola volta</b> e l'<b>ordine non conta</b>. Per esempio {2, 1, 12, 6, 4, 3} è lo stesso insieme. Questo modo è comodo quando gli elementi sono pochi. Se sono tanti ma seguono una regola chiara si possono usare i puntini, come in {0, 2, 4, 6, …} per i numeri pari.</p>
<p><b>2. Con la proprietà caratteristica</b>. Si scrive la proprietà che hanno tutti gli elementi dell'insieme e soltanto loro.</p>
<p class="formula"><i>A</i> = {<i>x</i> ∈ ℕ | <i>x</i> è un divisore di 12}</p>
<p>Si legge «<i>A</i> è l'insieme degli <i>x</i> appartenenti a ℕ tali che <i>x</i> è un divisore di 12». La sbarretta verticale | si legge «tale che». Questo modo è utile soprattutto quando gli elementi sono tantissimi o infiniti, come in {<i>x</i> ∈ ℝ | <i>x</i> &gt; 5}, che non si potrebbe scrivere per elencazione.</p>
<figure class="fig-testo"><svg viewBox="0 0 220 150" width="210" xmlns="http://www.w3.org/2000/svg"><rect x="1.5" y="1.5" width="217" height="147" fill="none" stroke="#2a2620" stroke-width="1.4"/><text x="12.0" y="18.0" font-size="15" font-family="serif" font-style="italic" font-weight="700" text-anchor="start" fill="#2a2620">U</text><circle cx="110" cy="80" r="56" fill="none" stroke="#1f4fa3" stroke-width="2"/><text x="66.3" y="42.3" font-size="20" font-family="serif" font-style="italic" font-weight="700" text-anchor="middle" fill="#1f4fa3">A</text><text x="110.0" y="85.0" font-size="17" font-family="serif" font-weight="400" text-anchor="middle" fill="#2a2620">1</text><text x="118.0" y="105.0" font-size="17" font-family="serif" font-weight="400" text-anchor="middle" fill="#2a2620">2</text><text x="130.0" y="77.0" font-size="17" font-family="serif" font-weight="400" text-anchor="middle" fill="#2a2620">3</text><text x="90.0" y="93.0" font-size="17" font-family="serif" font-weight="400" text-anchor="middle" fill="#2a2620">4</text><text x="102.0" y="65.0" font-size="17" font-family="serif" font-weight="400" text-anchor="middle" fill="#2a2620">6</text><text x="138.0" y="97.0" font-size="17" font-family="serif" font-weight="400" text-anchor="middle" fill="#2a2620">12</text><text x="170.0" y="57.0" font-size="17" font-family="serif" font-weight="400" text-anchor="middle" fill="#2a2620">5</text><text x="170.0" y="113.0" font-size="17" font-family="serif" font-weight="400" text-anchor="middle" fill="#2a2620">8</text><text x="178.0" y="85.0" font-size="17" font-family="serif" font-weight="400" text-anchor="middle" fill="#2a2620">10</text></svg><figcaption>Diagramma di Eulero-Venn dell'insieme <i>A</i> dei divisori di 12. I numeri 5, 8 e 10 sono fuori, perché non appartengono ad <i>A</i>.</figcaption></figure>
<p><b>3. Con un diagramma di Eulero-Venn</b>. Si disegna una linea chiusa e si scrivono dentro gli elementi dell'insieme, uno per punto. Gli oggetti che non appartengono all'insieme si scrivono fuori. Spesso si disegna anche un rettangolo che contiene tutti gli oggetti di cui si parla, l'<b>insieme universo</b> <i>U</i>.</p>
<p>Il diagramma non serve per i calcoli, ma fa <b>vedere</b> le relazioni fra gli insiemi, e lo useremo moltissimo.</p>
<h3>Insieme vuoto, finito, infinito</h3>
<div class="definizione"><b>Definizione</b>
<ul><li>L'<b>insieme vuoto</b> è l'insieme che non ha elementi. Si indica con ∅.</li>
<li>Un insieme è <b>finito</b> se i suoi elementi si possono contare fino all'ultimo, <b>infinito</b> se non è così.</li>
<li>Il numero degli elementi di un insieme finito <i>A</i> si chiama <b>cardinalità</b> di <i>A</i> e si indica con |<i>A</i>|.</li></ul></div>
<div class="esempio"><b>Esempio</b>{<i>x</i> ∈ ℕ | <i>x</i> &lt; 0} = ∅, perché nessun numero naturale è negativo.<br>L'insieme dei divisori di 12 è finito e |<i>A</i>| = 6.<br>L'insieme dei numeri pari è infinito.</div>
<div class="attenzione"><b>Attenzione</b>{0} non è l'insieme vuoto. Ha un elemento, il numero 0, quindi |{0}| = 1. Un insieme con un solo elemento si chiama <b>insieme unitario</b>.</div>
<h3>Insiemi uguali</h3>
<div class="definizione"><b>Definizione</b>
Due insiemi <i>A</i> e <i>B</i> sono <b>uguali</b>, e si scrive <i>A</i> = <i>B</i>, se hanno gli stessi elementi, cioè ogni elemento di <i>A</i> appartiene a <i>B</i> e ogni elemento di <i>B</i> appartiene ad <i>A</i>.</div>
<div class="esempio"><b>Esempio</b>{<i>x</i> ∈ ℕ | <i>x</i> è pari e <i>x</i> &lt; 9} = {0, 2, 4, 6, 8}<br>{<i>x</i> ∈ ℕ | 2 · <i>x</i> + 1 = 7} = {3}, perché l'unico numero naturale che rende vera l'uguaglianza è 3.</div>
<div class="curiosita" data-img="barbiere" data-titolo="Il barbiere che non sa se radersi">
<p>In un villaggio c'è un barbiere che rade tutti e soli gli uomini che non si radono da soli. Chi rade il barbiere? Se si rade da solo, allora non dovrebbe radersi, perché lui rade solo chi non si rade da solo. Se non si rade da solo, allora dovrebbe radersi. Qualunque risposta porta a una contraddizione.</p>
<p>Questo indovinello è una versione popolare di un problema scoperto da <b>Bertrand Russell</b> nel 1901. Russell considerò «l'insieme di tutti gli insiemi che non contengono sé stessi» e si chiese se contiene sé stesso. Anche qui ogni risposta porta a una contraddizione. Il paradosso mostrò che non si può chiamare insieme qualunque raccolta descritta a parole, e spinse i matematici a fissare regole più precise per la teoria degli insiemi.</p>
</div>
`},
  { n: 2, id: "p2", titolo: "Sottoinsiemi e insieme delle parti", html: `
<p>Nell'insieme degli studenti di una classe c'è il gruppo di quelli che giocano a calcio, nell'insieme dei numeri naturali c'è quello dei numeri pari. Ogni elemento del gruppo più piccolo appartiene anche a quello più grande.</p>
<div class="definizione"><b>Definizione</b>
Un insieme <i>B</i> è un <b>sottoinsieme</b> di <i>A</i> se ogni elemento di <i>B</i> appartiene anche ad <i>A</i>. Si scrive <span class="mat"><i>B</i> ⊆ <i>A</i></span> e si legge «<i>B</i> è contenuto o uguale ad <i>A</i>» (oppure «<i>B</i> è incluso in <i>A</i>»).</div>
<figure class="fig-testo"><svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg"><ellipse cx="110" cy="78" rx="96" ry="62" fill="#fff" stroke="#1f4fa3" stroke-width="2"/><ellipse cx="82" cy="82" rx="42" ry="32" fill="#fbe7d3" stroke="#c8621f" stroke-width="2"/><text x="30" y="26" font-size="17" font-family="serif" text-anchor="middle" fill="#1f4fa3" font-weight="700" font-style="italic">A</text><text x="76" y="46" font-size="16" font-family="serif" text-anchor="middle" fill="#c8621f" font-weight="700" font-style="italic">B</text><text x="64" y="84" font-size="15" font-family="serif" text-anchor="middle" fill="#2a2620" font-weight="400">1</text><text x="92" y="76" font-size="15" font-family="serif" text-anchor="middle" fill="#2a2620" font-weight="400">2</text><text x="84" y="104" font-size="15" font-family="serif" text-anchor="middle" fill="#2a2620" font-weight="400">4</text><text x="148" y="58" font-size="15" font-family="serif" text-anchor="middle" fill="#2a2620" font-weight="400">3</text><text x="160" y="92" font-size="15" font-family="serif" text-anchor="middle" fill="#2a2620" font-weight="400">6</text><text x="140" y="118" font-size="15" font-family="serif" text-anchor="middle" fill="#2a2620" font-weight="400">12</text></svg><figcaption><i>B</i> = {1, 2, 4} è un sottoinsieme di <i>A</i> = {1, 2, 3, 4, 6, 12}. La linea di <i>B</i> sta tutta dentro quella di <i>A</i>.</figcaption></figure>
<p>Ogni insieme <i>A</i> ha sempre almeno due sottoinsiemi, <i>A</i> stesso e l'insieme vuoto ∅. Si chiamano <b>sottoinsiemi impropri</b>. Tutti gli altri sottoinsiemi si chiamano <b>propri</b>.</p>
<div class="definizione"><b>Definizione</b>
<i>B</i> è un <b>sottoinsieme proprio</b> di <i>A</i> se <i>B</i> ⊆ <i>A</i>, <i>B</i> ≠ <i>A</i> e <i>B</i> ≠ ∅. Si scrive <span class="mat"><i>B</i> ⊂ <i>A</i></span>, «<i>B</i> è contenuto strettamente in <i>A</i>». Se <i>B</i> non è un sottoinsieme di <i>A</i> si scrive <span class="mat"><i>B</i> ⊄ <i>A</i></span>.</div>
<div class="esempio"><b>Esempio</b>{2, 4} ⊂ {1, 2, 3, 4}, perché 2 e 4 appartengono al secondo insieme e i due insiemi non sono uguali.<br>{2, 5} ⊄ {1, 2, 3, 4}, perché 5 non appartiene al secondo insieme. Basta un elemento «fuori» per dire che non c'è inclusione.<br>ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ, come abbiamo visto nei capitoli precedenti.</div>
<p>Per dimostrare che due insiemi sono uguali si può far vedere che ognuno è incluso nell'altro. Infatti se <i>A</i> ⊆ <i>B</i> e <i>B</i> ⊆ <i>A</i>, allora <i>A</i> = <i>B</i>.</p>
<div class="attenzione"><b>Attenzione</b>I simboli ∈ e ⊆ non vanno confusi. Il simbolo ∈ collega un <b>elemento</b> a un insieme, il simbolo ⊆ collega due <b>insiemi</b>. Se <i>A</i> = {1, 2, 3} si scrive 2 ∈ <i>A</i> ma {2} ⊆ <i>A</i>. Scrivere 2 ⊆ <i>A</i> o {2} ∈ <i>A</i> è un errore.</div>
<h3>L'insieme delle parti</h3>
<p>Scriviamo tutti i sottoinsiemi di <i>A</i> = {1, 2, 3}, ordinandoli per numero di elementi.</p>
<ul><li>con 0 elementi → ∅</li>
<li>con 1 elemento → {1}, {2}, {3}</li>
<li>con 2 elementi → {1, 2}, {1, 3}, {2, 3}</li>
<li>con 3 elementi → {1, 2, 3}</li></ul>
<p>Sono 8 in tutto. Possiamo considerarli a loro volta come gli elementi di un nuovo insieme.</p>
<div class="definizione"><b>Definizione</b>
L'<b>insieme delle parti</b> di <i>A</i> è l'insieme che ha per elementi tutti i sottoinsiemi di <i>A</i>. Si indica con 𝒫(<i>A</i>).</div>
<p class="formula">𝒫({1, 2, 3}) = {∅, {1}, {2}, {3}, {1, 2}, {1, 3}, {2, 3}, {1, 2, 3}}</p>
<p>Notiamo che gli elementi di 𝒫(<i>A</i>) sono insiemi. Per esempio {1, 3} ∈ 𝒫(<i>A</i>), mentre {1, 3} ⊆ <i>A</i>.</p>
<h3>Quanti sono i sottoinsiemi?</h3>
<p>Per costruire un sottoinsieme di {1, 2, 3} dobbiamo decidere, per ogni elemento, se prenderlo oppure no. Per l'elemento 1 abbiamo 2 scelte, per ciascuna di queste ne abbiamo 2 per l'elemento 2, e poi 2 per l'elemento 3. In tutto le scelte sono 2 · 2 · 2 = <span class="pot">2<sup>3</sup></span> = 8.</p>
<p>Se scriviamo 1 quando prendiamo un elemento e 0 quando lo lasciamo, ogni sottoinsieme diventa un numero scritto in base 2, come nel capitolo 1. Per esempio {1, 3} corrisponde a 101 e ∅ a 000.</p>
<table class="tab tav"><tr><th>1</th><th>2</th><th>3</th><th>sottoinsieme</th></tr>
<tr><td>0</td><td>0</td><td>0</td><td>∅</td></tr><tr><td>0</td><td>0</td><td>1</td><td>{3}</td></tr><tr><td>0</td><td>1</td><td>0</td><td>{2}</td></tr><tr><td>0</td><td>1</td><td>1</td><td>{2, 3}</td></tr>
<tr><td>1</td><td>0</td><td>0</td><td>{1}</td></tr><tr><td>1</td><td>0</td><td>1</td><td>{1, 3}</td></tr><tr><td>1</td><td>1</td><td>0</td><td>{1, 2}</td></tr><tr><td>1</td><td>1</td><td>1</td><td>{1, 2, 3}</td></tr></table>
<div class="regola"><b>Regola</b>
Se un insieme finito <i>A</i> ha <i>n</i> elementi, l'insieme delle parti 𝒫(<i>A</i>) ha <span class="pot">2<sup><i>n</i></sup></span> elementi.
<p class="formula">|<i>A</i>| = <i>n</i> &emsp; ⟹ &emsp; |𝒫(<i>A</i>)| = <span class="pot">2<sup><i>n</i></sup></span></p></div>
<div class="esempio"><b>Esempio</b>Un insieme con 5 elementi ha <span class="pot">2<sup>5</sup></span> = 32 sottoinsiemi. Di questi, 2 sono impropri (<i>A</i> e ∅) e 30 sono propri.<br>L'insieme vuoto ha <span class="pot">2<sup>0</sup></span> = 1 sottoinsieme, sé stesso, quindi 𝒫(∅) = {∅}.</div>
<div class="anim" data-anim="sottoinsiemi" data-titolo="Costruisci un sottoinsieme"></div>
<div class="curiosita" data-img="pizza" data-titolo="Quante pizze diverse?">
<p>Una pizzeria offre una base margherita e 8 ingredienti da aggiungere a scelta, senza ripetere lo stesso ingrediente. Quante pizze diverse si possono ordinare? Ogni pizza corrisponde a un sottoinsieme dell'insieme degli 8 ingredienti, compreso l'insieme vuoto (la margherita semplice). Le pizze diverse sono quindi <span class="pot">2<sup>8</sup></span> = 256.</p>
<p>Con 10 ingredienti diventerebbero 1024, con 20 ingredienti più di un milione. Ogni ingrediente in più raddoppia le possibilità.</p>
</div>
`},
  { n: 3, id: "p3", titolo: "Le operazioni tra insiemi", html: `
<p>Con gli insiemi si possono fare delle <b>operazioni</b>, che a partire da due insiemi ne costruiscono un terzo. Per vederle tutte con lo stesso esempio, prendiamo i divisori di 12 e i divisori di 18.</p>
<p class="formula"><i>A</i> = {1, 2, 3, 4, 6, 12} &emsp; <i>B</i> = {1, 2, 3, 6, 9, 18}</p>
<h3>L'intersezione</h3>
<div class="definizione"><b>Definizione</b>
L'<b>intersezione</b> di due insiemi <i>A</i> e <i>B</i> è l'insieme degli elementi che appartengono sia ad <i>A</i> sia a <i>B</i>.
<p class="formula"><i>A</i> ∩ <i>B</i> = {<i>x</i> | <i>x</i> ∈ <i>A</i> e <i>x</i> ∈ <i>B</i>}</p>
Il simbolo ∩ si legge «intersecato» oppure «intersezione».</div>
<figure class="fig-testo"><svg viewBox="0 0 280 170" width="230" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="v1c0"><circle cx="105" cy="88" r="64"/></clipPath><clipPath id="v1c1"><circle cx="175" cy="88" r="64"/></clipPath></defs><g clip-path="url(#v1c1)"><g clip-path="url(#v1c0)"><rect x="0" y="0" width="280" height="170" fill="#f6d58e"/></g></g><circle cx="105" cy="88" r="64" fill="none" stroke="#1f4fa3" stroke-width="2"/><text x="57.6" y="42.8" font-size="20" font-family="serif" font-style="italic" font-weight="700" text-anchor="middle" fill="#1f4fa3">A</text><circle cx="175" cy="88" r="64" fill="none" stroke="#c8621f" stroke-width="2"/><text x="222.4" y="42.8" font-size="20" font-family="serif" font-style="italic" font-weight="700" text-anchor="middle" fill="#c8621f">B</text><text x="138.0" y="93.0" font-size="17" font-family="serif" font-weight="400" text-anchor="middle" fill="#2a2620">1</text><text x="158.0" y="85.0" font-size="17" font-family="serif" font-weight="400" text-anchor="middle" fill="#2a2620">2</text><text x="146.0" y="113.0" font-size="17" font-family="serif" font-weight="400" text-anchor="middle" fill="#2a2620">3</text><text x="130.0" y="73.0" font-size="17" font-family="serif" font-weight="400" text-anchor="middle" fill="#2a2620">6</text><text x="86.0" y="93.0" font-size="17" font-family="serif" font-weight="400" text-anchor="middle" fill="#2a2620">4</text><text x="66.0" y="101.0" font-size="17" font-family="serif" font-weight="400" text-anchor="middle" fill="#2a2620">12</text><text x="194.0" y="93.0" font-size="17" font-family="serif" font-weight="400" text-anchor="middle" fill="#2a2620">9</text><text x="214.0" y="101.0" font-size="17" font-family="serif" font-weight="400" text-anchor="middle" fill="#2a2620">18</text></svg><figcaption>L'intersezione <i>A</i> ∩ <i>B</i> è la parte colorata, comune ai due insiemi.</figcaption></figure>
<div class="esempio"><b>Esempio</b>Per trovare <i>A</i> ∩ <i>B</i> si scorrono gli elementi di <i>A</i> uno alla volta e si tengono solo quelli che compaiono anche in <i>B</i>.
<ul class="passaggi"><li>1, 2, 3 e 6 stanno in entrambi gli insiemi, quindi si tengono.</li><li>4 e 12 non stanno in <i>B</i>, quindi si scartano.</li><li><i>A</i> ∩ <i>B</i> = {1, 2, 3, 6}</li></ul>
Sono i divisori comuni di 12 e 18. Il più grande, 6, è il MCD(12; 18).</div>
<p>Se due insiemi non hanno elementi in comune, la loro intersezione è vuota e gli insiemi si dicono <b>disgiunti</b>. Per esempio i numeri pari e i numeri dispari sono disgiunti.</p>
<h3>L'unione</h3>
<div class="definizione"><b>Definizione</b>
L'<b>unione</b> di due insiemi <i>A</i> e <i>B</i> è l'insieme degli elementi che appartengono ad <i>A</i> oppure a <i>B</i>, cioè ad almeno uno dei due.
<p class="formula"><i>A</i> ∪ <i>B</i> = {<i>x</i> | <i>x</i> ∈ <i>A</i> o <i>x</i> ∈ <i>B</i>}</p>
Il simbolo ∪ si legge «unito» oppure «unione».</div>
<div class="esempio"><b>Esempio</b><i>A</i> ∪ <i>B</i> = {1, 2, 3, 4, 6, 9, 12, 18}<br>Si scrivono prima tutti gli elementi di <i>A</i>, poi quelli di <i>B</i> che non sono già stati scritti, cioè 9 e 18. Gli elementi comuni si scrivono una volta sola.</div>
<div class="attenzione"><b>Attenzione</b>Nell'unione la parola «o» ha il significato di «almeno uno dei due», non di «uno solo dei due». Gli elementi comuni ad <i>A</i> e <i>B</i> fanno parte dell'unione. Per questo |<i>A</i> ∪ <i>B</i>| = 8, mentre |<i>A</i>| + |<i>B</i>| = 12. Nel paragrafo 5 vedremo come contare correttamente.</div>
<h3>La differenza</h3>
<div class="definizione"><b>Definizione</b>
La <b>differenza</b> fra <i>A</i> e <i>B</i> è l'insieme degli elementi di <i>A</i> che non appartengono a <i>B</i>.
<p class="formula"><i>A</i> − <i>B</i> = {<i>x</i> | <i>x</i> ∈ <i>A</i> e <i>x</i> ∉ <i>B</i>}</p></div>
<div class="esempio"><b>Esempio</b><i>A</i> − <i>B</i> = {4, 12} &emsp; si tolgono da <i>A</i> gli elementi che stanno anche in <i>B</i><br><i>B</i> − <i>A</i> = {9, 18}</div>
<p>L'esempio mostra che <i>A</i> − <i>B</i> ≠ <i>B</i> − <i>A</i>, cioè per la differenza <b>non</b> vale la proprietà commutativa. Notiamo anche che <i>A</i> − <i>B</i>, <i>A</i> ∩ <i>B</i> e <i>B</i> − <i>A</i> sono le tre parti in cui le linee del diagramma dividono <i>A</i> ∪ <i>B</i>.</p>
<h3>Il complementare</h3>
<p>Quando si lavora con gli insiemi c'è di solito un insieme universo <i>U</i> che contiene tutti gli elementi di cui si parla. Per esempio, parlando degli studenti di una scuola, <i>U</i> è l'insieme di tutti gli studenti della scuola.</p>
<div class="definizione"><b>Definizione</b>
Se <i>A</i> ⊆ <i>U</i>, il <b>complementare</b> di <i>A</i> rispetto a <i>U</i> è l'insieme degli elementi di <i>U</i> che non appartengono ad <i>A</i>. Si indica con <span class="compl"><i>A</i></span> (si legge «<i>A</i> segnato» o «complementare di <i>A</i>»).
<p class="formula"><span class="compl"><i>A</i></span> = <i>U</i> − <i>A</i> = {<i>x</i> ∈ <i>U</i> | <i>x</i> ∉ <i>A</i>}</p></div>
<div class="esempio"><b>Esempio</b>Con <i>U</i> = {<i>x</i> ∈ ℕ | 1 ≤ <i>x</i> ≤ 10} e <i>P</i> = {2, 4, 6, 8, 10} si ha <span class="compl"><i>P</i></span> = {1, 3, 5, 7, 9}, cioè i numeri dispari di <i>U</i>.</div>
<p>Valgono sempre <i>A</i> ∩ <span class="compl"><i>A</i></span> = ∅ e <i>A</i> ∪ <span class="compl"><i>A</i></span> = <i>U</i>. Inoltre il complementare del complementare è l'insieme di partenza, e il complementare di <i>U</i> è ∅.</p>
<div class="anim" data-anim="operazioni" data-titolo="Le operazioni sul diagramma"></div>
<h3>Le proprietà delle operazioni</h3>
<p>Intersezione e unione hanno proprietà simili a quelle dell'addizione e della moltiplicazione. Si possono controllare tutte colorando i diagrammi di Eulero-Venn.</p>
<table class="tab"><tr><th>Proprietà</th><th>Intersezione</th><th>Unione</th></tr>
<tr><td>commutativa</td><td><i>A</i> ∩ <i>B</i> = <i>B</i> ∩ <i>A</i></td><td><i>A</i> ∪ <i>B</i> = <i>B</i> ∪ <i>A</i></td></tr>
<tr><td>associativa</td><td>(<i>A</i> ∩ <i>B</i>) ∩ <i>C</i> = <i>A</i> ∩ (<i>B</i> ∩ <i>C</i>)</td><td>(<i>A</i> ∪ <i>B</i>) ∪ <i>C</i> = <i>A</i> ∪ (<i>B</i> ∪ <i>C</i>)</td></tr>
<tr><td>distributiva</td><td><i>A</i> ∩ (<i>B</i> ∪ <i>C</i>) = (<i>A</i> ∩ <i>B</i>) ∪ (<i>A</i> ∩ <i>C</i>)</td><td><i>A</i> ∪ (<i>B</i> ∩ <i>C</i>) = (<i>A</i> ∪ <i>B</i>) ∩ (<i>A</i> ∪ <i>C</i>)</td></tr>
<tr><td>con sé stesso</td><td><i>A</i> ∩ <i>A</i> = <i>A</i></td><td><i>A</i> ∪ <i>A</i> = <i>A</i></td></tr>
<tr><td>con ∅ e <i>U</i></td><td><i>A</i> ∩ ∅ = ∅ &emsp; <i>A</i> ∩ <i>U</i> = <i>A</i></td><td><i>A</i> ∪ ∅ = <i>A</i> &emsp; <i>A</i> ∪ <i>U</i> = <i>U</i></td></tr></table>
<p>Inoltre, se <i>B</i> ⊆ <i>A</i>, allora <i>A</i> ∩ <i>B</i> = <i>B</i> e <i>A</i> ∪ <i>B</i> = <i>A</i>.</p>
<h3>Le leggi di De Morgan</h3>
<div class="regola"><b>Leggi di De Morgan</b>
Il complementare dell'unione è l'intersezione dei complementari, e il complementare dell'intersezione è l'unione dei complementari.
<p class="formula"><span class="compl"><i>A</i> ∪ <i>B</i></span> = <span class="compl"><i>A</i></span> ∩ <span class="compl"><i>B</i></span> &emsp; <span class="compl"><i>A</i> ∩ <i>B</i></span> = <span class="compl"><i>A</i></span> ∪ <span class="compl"><i>B</i></span></p></div>
<div class="esempio"><b>Esempio</b>Verifichiamo la prima legge con <i>U</i> = {1, 2, …, 10}, <i>A</i> = {1, 2, 3, 4} e <i>B</i> = {3, 4, 5, 6}.
<ul class="passaggi"><li>Primo membro &emsp; <i>A</i> ∪ <i>B</i> = {1, 2, 3, 4, 5, 6}, quindi <span class="compl"><i>A</i> ∪ <i>B</i></span> = {7, 8, 9, 10}</li>
<li>Secondo membro &emsp; <span class="compl"><i>A</i></span> = {5, 6, 7, 8, 9, 10}, <span class="compl"><i>B</i></span> = {1, 2, 7, 8, 9, 10}, quindi <span class="compl"><i>A</i></span> ∩ <span class="compl"><i>B</i></span> = {7, 8, 9, 10}</li>
<li>I due insiemi sono uguali. <span class="perche">Un elemento non sta nell'unione proprio quando non sta né in <i>A</i> né in <i>B</i>.</span></li></ul></div>
<p>Nelle espressioni con gli insiemi, come in quelle con i numeri, si eseguono prima le operazioni dentro le parentesi. Per evitare dubbi conviene usare sempre le parentesi quando compaiono operazioni diverse.</p>
<div class="curiosita" data-img="motore" data-titolo="Gli insiemi nei motori di ricerca">
<p>Quando si cerca qualcosa in una biblioteca digitale o in un motore di ricerca, spesso si possono usare le parole AND, OR e NOT. Cercando «Venn AND Eulero» si ottengono solo i documenti che contengono entrambe le parole, cioè l'intersezione dei due insiemi di risultati. Con OR si ottiene l'unione, con NOT la differenza.</p>
<p>Per esempio, chi cerca ricette con le zucchine ma senza formaggio può scrivere «zucchine NOT formaggio». Saper combinare queste operazioni fa risparmiare molto tempo.</p>
</div>
`},
  { n: 4, id: "p4", titolo: "Prodotto cartesiano e partizioni", html: `
<p>Nell'armadio ci sono due magliette e tre paia di pantaloni. Per vestirsi si sceglie una maglietta <b>e</b> un paio di pantaloni. Ogni scelta si può descrivere con due nomi scritti in un ordine fisso, prima la maglietta e poi i pantaloni. Per descrivere situazioni come questa servono le coppie ordinate.</p>
<h3>Coppie ordinate</h3>
<div class="definizione"><b>Definizione</b>
Una <b>coppia ordinata</b> è formata da due elementi presi in un ordine preciso. Si scrive (<i>a</i>; <i>b</i>), dove <i>a</i> è il <b>primo</b> elemento e <i>b</i> il <b>secondo</b>.</div>
<p>Nelle coppie si usa il punto e virgola per non confondersi con la virgola dei numeri decimali. A differenza di quanto accade negli insiemi, nelle coppie l'ordine conta. Se <i>a</i> ≠ <i>b</i>, allora (<i>a</i>; <i>b</i>) ≠ (<i>b</i>; a). Per esempio (3; 5) ≠ (5; 3), mentre {3, 5} = {5, 3}. Due coppie sono uguali solo se hanno uguali sia i primi elementi sia i secondi.</p>
<h3>Il prodotto cartesiano</h3>
<div class="definizione"><b>Definizione</b>
Il <b>prodotto cartesiano</b> di due insiemi <i>A</i> e <i>B</i> è l'insieme di tutte le coppie ordinate che hanno il primo elemento in <i>A</i> e il secondo in <i>B</i>.
<p class="formula"><i>A</i> × <i>B</i> = {(<i>x</i>; <i>y</i>) | <i>x</i> ∈ <i>A</i> e <i>y</i> ∈ <i>B</i>}</p>
Si legge «<i>A</i> per <i>B</i>» o «<i>A</i> cartesiano <i>B</i>».</div>
<p>Il nome ricorda <b>René Descartes</b> (Cartesio), che nel 1637 descrisse i punti del piano con coppie di numeri. Torniamo alle magliette e ai pantaloni dell'armadio.</p>
<p class="formula"><i>A</i> = {rossa, blu} &emsp; <i>B</i> = {jeans, neri, beige}</p>
<p>Ogni modo di vestirsi è una coppia (maglietta; pantaloni). Possiamo rappresentare <i>A</i> × <i>B</i> in quattro modi.</p>
<p><b>1. Per elencazione</b></p>
<p class="formula"><i>A</i> × <i>B</i> = {(rossa; jeans), (rossa; neri), (rossa; beige), (blu; jeans), (blu; neri), (blu; beige)}</p>
<figure class="fig-testo"><svg viewBox="0 0 210 160" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="80" r="4" fill="#2a2620"/><line x1="10" y1="80" x2="62" y2="40" stroke="#8f8676" stroke-width="1.5"/><text x="86" y="45" font-size="15" font-family="serif" font-weight="700" text-anchor="middle" fill="#1f4fa3">rossa</text><line x1="112" y1="40" x2="150" y2="14" stroke="#8f8676" stroke-width="1.2"/><text x="156" y="19" font-size="15" font-family="serif" font-weight="700" text-anchor="start" fill="#c8621f">jeans</text><line x1="112" y1="40" x2="150" y2="40" stroke="#8f8676" stroke-width="1.2"/><text x="156" y="45" font-size="15" font-family="serif" font-weight="700" text-anchor="start" fill="#c8621f">neri</text><line x1="112" y1="40" x2="150" y2="66" stroke="#8f8676" stroke-width="1.2"/><text x="156" y="71" font-size="15" font-family="serif" font-weight="700" text-anchor="start" fill="#c8621f">beige</text><line x1="10" y1="80" x2="62" y2="120" stroke="#8f8676" stroke-width="1.5"/><text x="86" y="125" font-size="15" font-family="serif" font-weight="700" text-anchor="middle" fill="#1f4fa3">blu</text><line x1="112" y1="120" x2="150" y2="94" stroke="#8f8676" stroke-width="1.2"/><text x="156" y="99" font-size="15" font-family="serif" font-weight="700" text-anchor="start" fill="#c8621f">jeans</text><line x1="112" y1="120" x2="150" y2="120" stroke="#8f8676" stroke-width="1.2"/><text x="156" y="125" font-size="15" font-family="serif" font-weight="700" text-anchor="start" fill="#c8621f">neri</text><line x1="112" y1="120" x2="150" y2="146" stroke="#8f8676" stroke-width="1.2"/><text x="156" y="151" font-size="15" font-family="serif" font-weight="700" text-anchor="start" fill="#c8621f">beige</text></svg><figcaption>Diagramma ad albero di <i>A</i> × <i>B</i>. Ogni percorso dalla radice a una foglia è una coppia.</figcaption></figure>
<p><b>2. Con un diagramma ad albero</b>. Da un punto iniziale partono tanti rami quanti sono gli elementi di <i>A</i>. Da ognuno di questi partono tanti rami quanti sono gli elementi di <i>B</i>. Ogni percorso completo corrisponde a una coppia.</p>
<p><b>3. Con una tabella a doppia entrata</b>. Gli elementi di <i>A</i> sono le righe, quelli di <i>B</i> le colonne. Ogni casella contiene una coppia.</p>
<table class="tab"><tr><th>× </th><th>jeans</th><th>neri</th><th>beige</th></tr>
<tr><th>rossa</th><td>(rossa; jeans)</td><td>(rossa; neri)</td><td>(rossa; beige)</td></tr>
<tr><th>blu</th><td>(blu; jeans)</td><td>(blu; neri)</td><td>(blu; beige)</td></tr></table>
<figure class="fig-testo"><svg viewBox="0 0 224 134" xmlns="http://www.w3.org/2000/svg"><line x1="78" y1="14" x2="78" y2="104" stroke="#d8cfbb"/><text x="78" y="126" font-size="15" font-family="serif" font-weight="700" text-anchor="middle" fill="#c8621f">jeans</text><line x1="134" y1="14" x2="134" y2="104" stroke="#d8cfbb"/><text x="134" y="126" font-size="15" font-family="serif" font-weight="700" text-anchor="middle" fill="#c8621f">neri</text><line x1="190" y1="14" x2="190" y2="104" stroke="#d8cfbb"/><text x="190" y="126" font-size="15" font-family="serif" font-weight="700" text-anchor="middle" fill="#c8621f">beige</text><line x1="56" y1="80" x2="210" y2="80" stroke="#d8cfbb"/><text x="50" y="85" font-size="15" font-family="serif" font-weight="700" text-anchor="end" fill="#1f4fa3">rossa</text><circle cx="78" cy="80" r="6" fill="#b8322f"/><circle cx="134" cy="80" r="6" fill="#b8322f"/><circle cx="190" cy="80" r="6" fill="#b8322f"/><line x1="56" y1="36" x2="210" y2="36" stroke="#d8cfbb"/><text x="50" y="41" font-size="15" font-family="serif" font-weight="700" text-anchor="end" fill="#1f4fa3">blu</text><circle cx="78" cy="36" r="6" fill="#b8322f"/><circle cx="134" cy="36" r="6" fill="#b8322f"/><circle cx="190" cy="36" r="6" fill="#b8322f"/><line x1="56" y1="104" x2="214" y2="104" stroke="#2a2620" stroke-width="1.5"/><line x1="56" y1="104" x2="56" y2="8" stroke="#2a2620" stroke-width="1.5"/><text x="214" y="122" font-size="16" font-family="serif" font-style="italic" font-weight="700" fill="#2a2620">B</text><text x="62" y="16" font-size="16" font-family="serif" font-style="italic" font-weight="700" fill="#2a2620">A</text></svg><figcaption>Diagramma cartesiano di <i>A</i> × <i>B</i>. Ogni punto rosso corrisponde a una coppia.</figcaption></figure>
<p><b>4. Con un diagramma cartesiano</b>. Si disegnano due semirette perpendicolari, gli elementi di <i>B</i> sulla semiretta orizzontale e quelli di <i>A</i> su quella verticale. Ogni coppia è il punto in cui si incontrano la riga e la colonna corrispondenti.</p>
<p>Tutte le rappresentazioni mostrano che le coppie sono 2 · 3 = 6. Infatti per ognuna delle 2 magliette si possono scegliere 3 pantaloni.</p>
<div class="regola"><b>Regola</b>
Se <i>A</i> e <i>B</i> sono finiti, il numero delle coppie di <i>A</i> × <i>B</i> è il prodotto dei numeri degli elementi.
<p class="formula">|<i>A</i> × <i>B</i>| = |<i>A</i>| · |<i>B</i>|</p></div>
<div class="esempio"><b>Esempio</b>Un codice è formato da una lettera fra A, B, C, D e da una cifra fra 0 e 9. I codici possibili sono 4 · 10 = 40.<br>Se <i>A</i> = ∅, allora <i>A</i> × <i>B</i> = ∅ e infatti 0 · |<i>B</i>| = 0.</div>
<div class="attenzione"><b>Attenzione</b>Il prodotto cartesiano non è commutativo. Nell'esempio <i>B</i> × <i>A</i> contiene coppie come (jeans; rossa), che sono diverse da (rossa; jeans). Quindi <i>A</i> × <i>B</i> ≠ <i>B</i> × <i>A</i>, anche se hanno lo stesso numero di elementi. Il prodotto <i>A</i> × <i>A</i> si scrive anche <span class="pot"><i>A</i><sup>2</sup></span>. Per esempio ℝ<sup>2</sup> = ℝ × ℝ è l'insieme delle coppie di numeri reali, cioè dei punti del piano cartesiano.</div>
<h3>Le partizioni</h3>
<p>Quando si dividono gli studenti di una scuola nelle varie classi, ogni studente finisce in una e una sola classe, e nessuna classe resta vuota. Questo modo di dividere un insieme si chiama partizione.</p>
<figure class="fig-testo"><svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg"><ellipse cx="120" cy="84" rx="108" ry="66" fill="#fff" stroke="#2a2620" stroke-width="2"/><path d="M52 34 Q80 84 44 136" fill="none" stroke="#2a2620" stroke-width="1.8"/><path d="M128 18 Q100 76 150 150" fill="none" stroke="#2a2620" stroke-width="1.8"/><path d="M92 88 Q160 74 228 94" fill="none" stroke="#2a2620" stroke-width="1.8"/><text x="32" y="90" font-size="21" font-family="serif" font-style="italic" font-weight="700" text-anchor="middle" fill="#1f4fa3">A<tspan dy="5" font-size="13" font-style="normal">1</tspan></text><text x="92" y="62" font-size="21" font-family="serif" font-style="italic" font-weight="700" text-anchor="middle" fill="#c8621f">A<tspan dy="5" font-size="13" font-style="normal">2</tspan></text><text x="96" y="124" font-size="21" font-family="serif" font-style="italic" font-weight="700" text-anchor="middle" fill="#2a7a52">A<tspan dy="5" font-size="13" font-style="normal">3</tspan></text><text x="178" y="56" font-size="21" font-family="serif" font-style="italic" font-weight="700" text-anchor="middle" fill="#6b47b8">A<tspan dy="5" font-size="13" font-style="normal">4</tspan></text><text x="186" y="122" font-size="21" font-family="serif" font-style="italic" font-weight="700" text-anchor="middle" fill="#b8322f">A<tspan dy="5" font-size="13" font-style="normal">5</tspan></text><text x="14" y="22" font-size="20" font-family="serif" font-style="italic" font-weight="700" fill="#2a2620">A</text></svg><figcaption>Una partizione di <i>A</i> in cinque parti. Le parti non sono vuote, non si sovrappongono e insieme ricoprono tutto <i>A</i>.</figcaption></figure>
<div class="definizione"><b>Definizione</b>
Una <b>partizione</b> di un insieme <i>A</i> è una famiglia di sottoinsiemi di <i>A</i> tali che
<ul><li>nessun sottoinsieme è vuoto;</li>
<li>i sottoinsiemi sono <b>a due a due disgiunti</b>, cioè due qualsiasi di essi non hanno elementi in comune;</li>
<li>l'<b>unione</b> di tutti i sottoinsiemi è <i>A</i>.</li></ul>
In altre parole, ogni elemento di <i>A</i> appartiene a <b>uno e un solo</b> sottoinsieme.</div>
<div class="esempio"><b>Esempio</b>I numeri pari e i numeri dispari formano una partizione di ℕ.<br>I numeri interi negativi, l'insieme {0} e i numeri interi positivi formano una partizione di ℤ.<br>Gli insiemi {1, 2}, {2, 3} e {4} <b>non</b> formano una partizione di {1, 2, 3, 4}, perché 2 sta in due sottoinsiemi.<br>Gli insiemi {1} e {3, 4} non formano una partizione di {1, 2, 3, 4}, perché 2 non sta in nessun sottoinsieme.</div>
<div class="curiosita" data-img="linneo" data-titolo="Linneo e le scatole dei viventi">
<p>Nel 1735 il naturalista svedese <b>Carl von Linné</b> (Linneo) pubblicò il <i>Systema Naturae</i>, in cui divideva i viventi in regni, i regni in classi, le classi in ordini, gli ordini in generi e i generi in specie. A ogni livello i gruppi sono una partizione del gruppo superiore, perché ogni essere vivente sta in uno e un solo gruppo.</p>
<p>Lo stesso metodo si usa ancora oggi nei magazzini, nelle biblioteche e negli archivi. Una buona classificazione è proprio una catena di partizioni.</p>
</div>
`},
  { n: 5, id: "p5", titolo: "Contare con i diagrammi di Venn", html: `
<p>In una classe di 25 studenti, 14 suonano uno strumento e 9 fanno parte del coro. Quanti studenti fanno almeno una delle due attività? La risposta 14 + 9 = 23 potrebbe essere sbagliata, perché chi suona e canta nel coro verrebbe contato due volte. I diagrammi di Eulero-Venn ci aiutano a contare bene.</p>
<h3>Il numero degli elementi dell'unione</h3>
<p>Sommando |<i>A</i>| e |<i>B</i>| gli elementi di <i>A</i> ∩ <i>B</i> vengono contati due volte, una perché stanno in <i>A</i> e una perché stanno in <i>B</i>. Per correggere basta toglierli una volta.</p>
<div class="regola"><b>Regola</b>
Per due insiemi finiti <i>A</i> e <i>B</i>
<p class="formula">|<i>A</i> ∪ <i>B</i>| = |<i>A</i>| + |<i>B</i>| − |<i>A</i> ∩ <i>B</i>|</p>
Se <i>A</i> e <i>B</i> sono disgiunti, |<i>A</i> ∪ <i>B</i>| = |<i>A</i>| + |<i>B</i>|.</div>
<div class="esempio"><b>Esempio</b>Nella classe dell'inizio, 5 studenti suonano e cantano nel coro. Allora quelli che fanno almeno un'attività sono 14 + 9 − 5 = 18, e quelli che non ne fanno nessuna sono 25 − 18 = 7.</div>
<h3>Si comincia dal centro</h3>
<p>Nei problemi conviene scrivere nel diagramma il <b>numero</b> di elementi di ogni zona, partendo dalla zona comune e andando verso l'esterno.</p>
<figure class="fig-testo"><svg viewBox="0 0 280 170" width="230" xmlns="http://www.w3.org/2000/svg"><rect x="1.5" y="1.5" width="277" height="167" fill="none" stroke="#2a2620" stroke-width="1.4"/><text x="12.0" y="18.0" font-size="15" font-family="serif" font-style="italic" font-weight="700" text-anchor="start" fill="#2a2620">U</text><circle cx="105" cy="88" r="64" fill="none" stroke="#1f4fa3" stroke-width="2"/><text x="57.6" y="42.8" font-size="20" font-family="serif" font-style="italic" font-weight="700" text-anchor="middle" fill="#1f4fa3">S</text><circle cx="175" cy="88" r="64" fill="none" stroke="#c8621f" stroke-width="2"/><text x="222.4" y="42.8" font-size="20" font-family="serif" font-style="italic" font-weight="700" text-anchor="middle" fill="#c8621f">C</text><text x="138.0" y="93.0" font-size="21" font-family="serif" font-weight="700" text-anchor="middle" fill="#b8322f">5</text><text x="86.0" y="93.0" font-size="21" font-family="serif" font-weight="700" text-anchor="middle" fill="#b8322f">9</text><text x="194.0" y="93.0" font-size="21" font-family="serif" font-weight="700" text-anchor="middle" fill="#b8322f">4</text><text x="142.0" y="161.0" font-size="21" font-family="serif" font-weight="700" text-anchor="middle" fill="#b8322f">7</text></svg><figcaption>Strumento (<i>S</i>) e coro (<i>C</i>). I numeri indicano quanti studenti ci sono in ogni zona.</figcaption></figure>
<ol class="passaggi"><li>Nella zona comune si scrive 5, il numero di chi fa entrambe le attività.</li>
<li>Solo strumento &emsp; 14 − 5 = 9 <span class="perche">I 14 che suonano comprendono anche i 5 che cantano.</span></li>
<li>Solo coro &emsp; 9 − 5 = 4</li>
<li>Fuori dai due insiemi &emsp; 25 − (9 + 5 + 4) = 7</li>
<li>Controllo &emsp; 9 + 5 + 4 + 7 = 25, il totale della classe.</li></ol>
<div class="attenzione"><b>Attenzione</b>Leggere bene il testo è fondamentale. «Suonano uno strumento» comprende anche chi canta nel coro, mentre «suonano <b>soltanto</b> uno strumento» indica solo la zona di <i>S</i> fuori da <i>C</i>. «Almeno una delle due attività» indica l'unione, «nessuna delle due» la zona esterna.</div>
<h3>Con tre insiemi</h3>
<p>Il metodo funziona anche con tre insiemi. Le zone diventano otto e si parte sempre da quella al centro, comune a tutti e tre.</p>
<div class="esempio"><b>Esempio</b>In un gruppo di 50 ragazzi, 26 studiano inglese (<i>I</i>), 19 francese (<i>F</i>) e 15 spagnolo (<i>S</i>). Studiano inglese e francese in 8, inglese e spagnolo in 6, francese e spagnolo in 5, tutte e tre le lingue in 3. Quanti non studiano nessuna lingua? Quanti ne studiano una sola?
<ol class="passaggi"><li>Al centro &emsp; 3</li>
<li>Solo inglese e francese &emsp; 8 − 3 = 5</li><li>Solo inglese e spagnolo &emsp; 6 − 3 = 3</li><li>Solo francese e spagnolo &emsp; 5 − 3 = 2</li>
<li>Solo inglese &emsp; 26 − (5 + 3 + 3) = 15</li><li>Solo francese &emsp; 19 − (5 + 2 + 3) = 9</li><li>Solo spagnolo &emsp; 15 − (3 + 2 + 3) = 7</li>
<li>Almeno una lingua &emsp; 15 + 9 + 7 + 5 + 3 + 2 + 3 = 44, quindi nessuna lingua &emsp; 50 − 44 = 6</li>
<li>Una sola lingua &emsp; 15 + 9 + 7 = 31</li></ol></div>
<figure class="fig-testo"><svg viewBox="0 0 280 230" width="240" xmlns="http://www.w3.org/2000/svg"><rect x="1.5" y="1.5" width="277" height="227" fill="none" stroke="#2a2620" stroke-width="1.4"/><text x="12.0" y="18.0" font-size="15" font-family="serif" font-style="italic" font-weight="700" text-anchor="start" fill="#2a2620">U</text><circle cx="110" cy="86" r="60" fill="none" stroke="#1f4fa3" stroke-width="2"/><text x="63.2" y="47.6" font-size="20" font-family="serif" font-style="italic" font-weight="700" text-anchor="middle" fill="#1f4fa3">I</text><circle cx="170" cy="86" r="60" fill="none" stroke="#c8621f" stroke-width="2"/><text x="216.8" y="47.6" font-size="20" font-family="serif" font-style="italic" font-weight="700" text-anchor="middle" fill="#c8621f">F</text><circle cx="140" cy="140" r="60" fill="none" stroke="#2a7a52" stroke-width="2"/><text x="191.6" y="192.8" font-size="20" font-family="serif" font-style="italic" font-weight="700" text-anchor="middle" fill="#2a7a52">S</text><text x="138.0" y="109.0" font-size="21" font-family="serif" font-weight="700" text-anchor="middle" fill="#b8322f">3</text><text x="138.0" y="65.0" font-size="21" font-family="serif" font-weight="700" text-anchor="middle" fill="#b8322f">5</text><text x="102.0" y="129.0" font-size="21" font-family="serif" font-weight="700" text-anchor="middle" fill="#b8322f">3</text><text x="178.0" y="129.0" font-size="21" font-family="serif" font-weight="700" text-anchor="middle" fill="#b8322f">2</text><text x="82.0" y="77.0" font-size="21" font-family="serif" font-weight="700" text-anchor="middle" fill="#b8322f">15</text><text x="198.0" y="77.0" font-size="21" font-family="serif" font-weight="700" text-anchor="middle" fill="#b8322f">9</text><text x="138.0" y="173.0" font-size="21" font-family="serif" font-weight="700" text-anchor="middle" fill="#b8322f">7</text><text x="210.0" y="149.0" font-size="21" font-family="serif" font-weight="700" text-anchor="middle" fill="#b8322f">6</text></svg><figcaption>Le otto zone del problema delle lingue, riempite partendo dal centro.</figcaption></figure>
<p>Per tre insiemi c'è anche una formula, che si giustifica nello stesso modo. Gli elementi delle intersezioni a due vengono contati due volte e si tolgono, ma così quelli al centro, contati tre volte e tolti tre volte, spariscono, e vanno aggiunti di nuovo.</p>
<p class="formula">|<i>A</i> ∪ <i>B</i> ∪ <i>C</i>| = |<i>A</i>| + |<i>B</i>| + |<i>C</i>|<br>− |<i>A</i> ∩ <i>B</i>| − |<i>A</i> ∩ <i>C</i>| − |<i>B</i> ∩ <i>C</i>| + |<i>A</i> ∩ <i>B</i> ∩ <i>C</i>|</p>
<p>Nell'esempio 26 + 19 + 15 − 8 − 6 − 5 + 3 = 44, come avevamo trovato.</p>
<div class="curiosita" data-img="vetrata" data-titolo="Venn alla finestra">
<p>John Venn insegnò per tutta la vita all'Università di Cambridge. Il suo collegio, il Gonville and Caius College, lo ricorda con una vetrata colorata che rappresenta tre cerchi che si intersecano, proprio come il diagramma di questo paragrafo.</p>
<p>Venn aveva anche una passione per le macchine. Costruì un apparecchio per lanciare le palle da cricket, che si dimostrò così preciso da mettere in difficoltà alcuni campioni di una squadra australiana in visita a Cambridge.</p>
</div>
`},
  { n: 6, id: "p6", titolo: "Proposizioni e connettivi", html: `
<p>Passiamo ora alla logica, che studia come si collegano le frasi e quando un ragionamento è corretto. Gli oggetti di base della logica sono le proposizioni.</p>
<div class="definizione"><b>Definizione</b>
Una <b>proposizione</b> (o enunciato) è una frase per la quale si può stabilire in modo oggettivo se è <b>vera</b> o <b>falsa</b>. Essere vera o falsa è il suo <b>valore di verità</b>, che si indica con V oppure F.</div>
<div class="esempio"><b>Esempio</b>«Roma è la capitale d'Italia» è una proposizione vera.<br>«15 è un numero primo» è una proposizione falsa.<br>«Che ore sono?», «Chiudi la finestra», «Il blu è il colore più elegante» non sono proposizioni. Le prime due non affermano nulla, la terza è un'opinione.</div>
<p>In logica si accettano due principi. Per il <b>principio di non contraddizione</b> una proposizione non può essere vera e falsa nello stesso tempo. Per il <b>principio del terzo escluso</b> una proposizione è vera oppure falsa, e non c'è una terza possibilità.</p>
<p>Le proposizioni come «7 è dispari» si dicono <b>semplici</b> (o atomiche). Collegando proposizioni semplici con le parole «non», «e», «o», «se… allora» si ottengono proposizioni <b>composte</b>. Queste parole si chiamano <b>connettivi logici</b>. Indichiamo le proposizioni con le lettere minuscole <i>p</i>, <i>q</i>, <i>r</i>…</p>
<p>La cosa importante è che il valore di verità di una proposizione composta dipende <b>solo</b> dai valori di verità delle proposizioni che la formano e dal connettivo usato. Per descrivere un connettivo basta quindi una <b>tavola di verità</b>, cioè una tabella con tutti i casi possibili.</p>
<h3>La negazione</h3>

<div class="definizione"><b>Definizione</b>
La <b>negazione</b> di <i>p</i> è la proposizione «non <i>p</i>», che si indica con <span class="compl"><i>p</i></span>. È vera quando <i>p</i> è falsa ed è falsa quando <i>p</i> è vera.</div><div class="tav-lato"><table class="tab tav"><tr><th><i>p</i></th><th><span class="compl"><i>p</i></span></th></tr><tr><td>V</td><td>F</td></tr><tr><td>F</td><td>V</td></tr></table></div>
<div class="esempio"><b>Esempio</b>Sia <i>p</i> la proposizione «7 è un numero primo», che è vera. La sua negazione <span class="compl"><i>p</i></span> è «7 non è un numero primo», che è falsa.<br>La negazione di «<i>x</i> &gt; 3» è «<i>x</i> ≤ 3», non «<i>x</i> &lt; 3», perché bisogna considerare anche il caso <i>x</i> = 3.</div>
<h3>La congiunzione</h3>

<div class="definizione"><b>Definizione</b>
La <b>congiunzione</b> di <i>p</i> e <i>q</i> è la proposizione «<i>p</i> e <i>q</i>», che si indica con <i>p</i> ∧ <i>q</i>. È vera solo quando <i>p</i> e <i>q</i> sono entrambe vere.</div><div class="tav-lato"><table class="tab tav"><tr><th><i>p</i></th><th><i>q</i></th><th><i>p</i> ∧ <i>q</i></th></tr><tr><td>V</td><td>V</td><td>V</td></tr><tr><td>V</td><td>F</td><td>F</td></tr><tr><td>F</td><td>V</td><td>F</td></tr><tr><td>F</td><td>F</td><td>F</td></tr></table></div>
<p>Nella tavola ci sono 4 righe, perché per ognuno dei 2 valori di <i>p</i> ci sono 2 valori di <i>q</i>. È lo stesso conteggio del prodotto cartesiano.</p>
<div class="esempio"><b>Esempio</b>«12 è pari e 12 è multiplo di 5» è falsa, perché la seconda proposizione è falsa.<br>«12 è pari e 12 è multiplo di 3» è vera.</div>
<h3>La disgiunzione inclusiva</h3>

<div class="definizione"><b>Definizione</b>
La <b>disgiunzione inclusiva</b> di <i>p</i> e <i>q</i> è la proposizione «<i>p</i> o <i>q</i>», che si indica con <i>p</i> ∨ <i>q</i>. È falsa solo quando <i>p</i> e <i>q</i> sono entrambe false. In latino si diceva <i>vel</i>.</div><div class="tav-lato"><table class="tab tav"><tr><th><i>p</i></th><th><i>q</i></th><th><i>p</i> ∨ <i>q</i></th></tr><tr><td>V</td><td>V</td><td>V</td></tr><tr><td>V</td><td>F</td><td>V</td></tr><tr><td>F</td><td>V</td><td>V</td></tr><tr><td>F</td><td>F</td><td>F</td></tr></table></div>
<div class="esempio"><b>Esempio</b>«Per iscriversi al corso bisogna avere la patente o il diploma». Chi ha entrambi può iscriversi, quindi la «o» è inclusiva.<br>«3 &gt; 5 o 3 è dispari» è vera, perché la seconda proposizione è vera.</div>
<h3>La disgiunzione esclusiva</h3>

<div class="definizione"><b>Definizione</b>
La <b>disgiunzione esclusiva</b> di <i>p</i> e <i>q</i> è la proposizione «o <i>p</i> o <i>q</i>», che si indica con <i>p</i> ⊻ <i>q</i>. È vera quando una sola delle due proposizioni è vera. In latino si diceva <i>aut</i>.</div><div class="tav-lato"><table class="tab tav"><tr><th><i>p</i></th><th><i>q</i></th><th><i>p</i> ⊻ <i>q</i></th></tr><tr><td>V</td><td>V</td><td>F</td></tr><tr><td>V</td><td>F</td><td>V</td></tr><tr><td>F</td><td>V</td><td>V</td></tr><tr><td>F</td><td>F</td><td>F</td></tr></table></div>
<div class="esempio"><b>Esempio</b>«Domenica la partita o la vince la Juventus o la vince l'Inter». Le due cose non possono essere vere insieme, quindi la «o» è esclusiva.<br>«Nel menù a prezzo fisso puoi scegliere il dolce o il caffè» di solito significa che non puoi avere entrambi.</div>
<div class="attenzione"><b>Attenzione</b>Nella lingua italiana la parola «o» si usa con tutti e due i significati, e si capisce quale dal contesto. In matematica, quando non si dice niente, la «o» è sempre <b>inclusiva</b>.</div>
<div class="anim" data-anim="circuito" data-titolo="Connettivi e interruttori"></div>
<p>Riassumiamo i connettivi in un'unica tavola.</p>
<table class="tab tav riassunto"><tr><th><i>p</i></th><th><i>q</i></th><th><span class="compl"><i>p</i></span></th><th><i>p</i> ∧ <i>q</i></th><th><i>p</i> ∨ <i>q</i></th><th><i>p</i> ⊻ <i>q</i></th></tr><tr><td>V</td><td>V</td><td>F</td><td>V</td><td>V</td><td>F</td></tr><tr><td>V</td><td>F</td><td>F</td><td>F</td><td>V</td><td>V</td></tr><tr><td>F</td><td>V</td><td>V</td><td>F</td><td>V</td><td>V</td></tr><tr><td>F</td><td>F</td><td>V</td><td>F</td><td>F</td><td>F</td></tr></table>
<div class="curiosita" data-img="circuito" data-titolo="Le porte logiche dei computer">
<p>In un circuito elettrico un interruttore chiuso lascia passare la corrente (V), uno aperto no (F). Se due interruttori sono uno dopo l'altro, in <b>serie</b>, la lampadina si accende solo se sono chiusi tutti e due, come nella congiunzione. Se sono uno accanto all'altro, in <b>parallelo</b>, la lampadina si accende se almeno uno è chiuso, come nella disgiunzione inclusiva.</p>
<p>Claude Shannon descrisse questa somiglianza nel 1937. Oggi dentro ogni processore ci sono miliardi di minuscoli interruttori, i transistor, organizzati in «porte logiche» chiamate proprio AND, OR e NOT.</p>
</div>
`},
  { n: 7, id: "p7", titolo: "Implicazione, doppia implicazione ed espressioni logiche", html: `
<h3>L'implicazione</h3>
<p>Molte frasi della matematica e della vita quotidiana hanno la forma «se… allora». Per esempio «se un numero è divisibile per 4, allora è pari», oppure «se domani c'è il sole, andiamo al mare».</p>

<div class="definizione"><b>Definizione</b>
L'<b>implicazione</b> fra <i>p</i> e <i>q</i> è la proposizione «se <i>p</i> allora <i>q</i>», che si indica con <i>p</i> → <i>q</i>. La proposizione <i>p</i> si chiama <b>antecedente</b> (o ipotesi), la <i>q</i> <b>conseguente</b> (o tesi). L'implicazione è falsa solo quando <i>p</i> è vera e <i>q</i> è falsa.</div><div class="tav-lato"><table class="tab tav"><tr><th><i>p</i></th><th><i>q</i></th><th><i>p</i> → <i>q</i></th></tr><tr><td>V</td><td>V</td><td>V</td></tr><tr><td>V</td><td>F</td><td>F</td></tr><tr><td>F</td><td>V</td><td>V</td></tr><tr><td>F</td><td>F</td><td>V</td></tr></table></div>
<p>Per capire la tavola pensiamo alla frase «se domani c'è il sole, andiamo al mare» come a una promessa.</p>
<ul class="passaggi"><li>C'è il sole e andiamo al mare. La promessa è mantenuta (V).</li>
<li>C'è il sole e non andiamo al mare. La promessa non è mantenuta (F).</li>
<li>Non c'è il sole. La promessa non diceva nulla per questo caso, quindi andare o no al mare non la smentisce (V e V).</li></ul>
<div class="attenzione"><b>Attenzione</b>L'implicazione non dice che <i>p</i> sia la causa di <i>q</i>. La proposizione «se 2 + 2 = 4 allora Parigi è in Francia» è vera, perché antecedente e conseguente sono veri, anche se fra le due cose non c'è alcun legame.</div>
<h3>Condizione necessaria e condizione sufficiente</h3>
<p>Quando <i>p</i> → <i>q</i> è vera si dice anche che</p>
<ul><li><i>p</i> è <b>condizione sufficiente</b> per <i>q</i>, perché basta che <i>p</i> sia vera per essere sicuri che lo sia anche <i>q</i>;</li>
<li><i>q</i> è <b>condizione necessaria</b> per <i>p</i>, perché se <i>q</i> non è vera non può essere vera neppure <i>p</i>.</li></ul>
<div class="esempio"><b>Esempio</b>«Se un numero è divisibile per 4, allora è pari» è vera. Essere divisibile per 4 è sufficiente per essere pari, ma non necessario (6 è pari e non è divisibile per 4). Essere pari è necessario per essere divisibile per 4, ma non sufficiente.</div>
<h3>Inversa, contraria, contronominale</h3>
<p>Data l'implicazione <i>p</i> → <i>q</i>, scambiando o negando antecedente e conseguente se ne ottengono altre tre.</p>
<table class="tab"><tr><th>nome</th><th>forma</th><th>esempio</th><th>valore</th></tr>
<tr><td>implicazione diretta</td><td><i>p</i> → <i>q</i></td><td>se un numero è divisibile per 4, allora è pari</td><td>V</td></tr>
<tr><td>inversa</td><td><i>q</i> → <i>p</i></td><td>se un numero è pari, allora è divisibile per 4</td><td>F</td></tr>
<tr><td>contraria</td><td><span class="compl"><i>p</i></span> → <span class="compl"><i>q</i></span></td><td>se un numero non è divisibile per 4, allora non è pari</td><td>F</td></tr>
<tr><td>contronominale</td><td><span class="compl"><i>q</i></span> → <span class="compl"><i>p</i></span></td><td>se un numero non è pari, allora non è divisibile per 4</td><td>V</td></tr></table>
<p>L'implicazione diretta e la contronominale hanno sempre lo stesso valore di verità, come vedremo con le tavole. Invece l'inversa può essere falsa anche quando la diretta è vera.</p>
<h3>La doppia implicazione</h3>

<div class="definizione"><b>Definizione</b>
La <b>doppia implicazione</b> fra <i>p</i> e <i>q</i> è la proposizione «<i>p</i> se e solo se <i>q</i>», che si indica con <i>p</i> ↔ <i>q</i>. È vera quando <i>p</i> e <i>q</i> hanno lo stesso valore di verità.</div><div class="tav-lato"><table class="tab tav"><tr><th><i>p</i></th><th><i>q</i></th><th><i>p</i> ↔ <i>q</i></th></tr><tr><td>V</td><td>V</td><td>V</td></tr><tr><td>V</td><td>F</td><td>F</td></tr><tr><td>F</td><td>V</td><td>F</td></tr><tr><td>F</td><td>F</td><td>V</td></tr></table></div>
<p>La doppia implicazione equivale a «<i>p</i> → <i>q</i> e <i>q</i> → <i>p</i>». Quando è vera si dice che <i>p</i> è <b>condizione necessaria e sufficiente</b> per <i>q</i>.</p>
<div class="esempio"><b>Esempio</b>«Un numero naturale è pari se e solo se la sua ultima cifra è 0, 2, 4, 6 o 8» è vera.<br>«Un numero è divisibile per 4 se e solo se è pari» è falsa, perché l'inversa è falsa.</div>
<h3>Le espressioni logiche e le tavole di verità</h3>
<p>Combinando più connettivi si ottengono espressioni logiche come (<i>p</i> ∨ <i>q</i>) ∧ <span class="compl"><i>p</i></span>. Per trovarne la tavola di verità si procede come nelle espressioni con i numeri.</p>
<ol class="passaggi"><li>Si scrivono tutte le combinazioni dei valori delle lettere. Con 2 lettere sono <span class="pot">2<sup>2</sup></span> = 4 righe, con 3 lettere <span class="pot">2<sup>3</sup></span> = 8.</li>
<li>Si aggiunge una colonna per ogni parte dell'espressione, partendo dalle più interne. <span class="perche">La negazione si applica alla lettera o alla parentesi su cui sta il segno.</span></li>
<li>Ogni colonna si calcola con la tavola del connettivo, usando le colonne già trovate.</li></ol>
<table class="tab tav"><tr><th><i>p</i></th><th><i>q</i></th><th><i>p</i> ∨ <i>q</i></th><th><span class="compl"><i>p</i></span></th><th>(<i>p</i> ∨ <i>q</i>) ∧ <span class="compl"><i>p</i></span></th></tr><tr><td>V</td><td>V</td><td>V</td><td>F</td><td>F</td></tr><tr><td>V</td><td>F</td><td>V</td><td>F</td><td>F</td></tr><tr><td>F</td><td>V</td><td>V</td><td>V</td><td>V</td></tr><tr><td>F</td><td>F</td><td>F</td><td>V</td><td>F</td></tr></table>
<p>L'ultima colonna mostra che (<i>p</i> ∨ <i>q</i>) ∧ <span class="compl"><i>p</i></span> è vera solo quando <i>p</i> è falsa e <i>q</i> è vera.</p>
<div class="definizione"><b>Definizione</b>
<ul><li>Una <b>tautologia</b> è un'espressione sempre vera, qualunque siano i valori delle lettere. Per esempio <i>p</i> ∨ <span class="compl"><i>p</i></span>.</li>
<li>Una <b>contraddizione</b> è un'espressione sempre falsa. Per esempio <i>p</i> ∧ <span class="compl"><i>p</i></span>.</li>
<li>Due espressioni sono <b>logicamente equivalenti</b> se hanno la stessa tavola di verità. Si scrive con il simbolo ≡.</li></ul></div>
<p>Con le tavole verifichiamo che l'implicazione e la sua contronominale sono equivalenti.</p>
<table class="tab tav"><tr><th><i>p</i></th><th><i>q</i></th><th><i>p</i> → <i>q</i></th><th><span class="compl"><i>q</i></span></th><th><span class="compl"><i>p</i></span></th><th><span class="compl"><i>q</i></span> → <span class="compl"><i>p</i></span></th></tr><tr><td>V</td><td>V</td><td>V</td><td>F</td><td>F</td><td>V</td></tr><tr><td>V</td><td>F</td><td>F</td><td>V</td><td>F</td><td>F</td></tr><tr><td>F</td><td>V</td><td>V</td><td>F</td><td>V</td><td>V</td></tr><tr><td>F</td><td>F</td><td>V</td><td>V</td><td>V</td><td>V</td></tr></table>
<p>Le colonne di <i>p</i> → <i>q</i> e di <span class="compl"><i>q</i></span> → <span class="compl"><i>p</i></span> sono uguali, quindi <i>p</i> → <i>q</i> ≡ <span class="compl"><i>q</i></span> → <span class="compl"><i>p</i></span>. Allo stesso modo si dimostrano altre equivalenze molto utili.</p>
<div class="regola"><b>Leggi di De Morgan e altre equivalenze</b>
<p class="formula"><span class="compl"><i>p</i> ∧ <i>q</i></span> ≡ <span class="compl"><i>p</i></span> ∨ <span class="compl"><i>q</i></span> &emsp; <span class="compl"><i>p</i> ∨ <i>q</i></span> ≡ <span class="compl"><i>p</i></span> ∧ <span class="compl"><i>q</i></span></p>
<p class="formula"><i>p</i> → <i>q</i> ≡ <span class="compl"><i>p</i></span> ∨ <i>q</i> &emsp; <span class="compl"><i>p</i> → <i>q</i></span> ≡ <i>p</i> ∧ <span class="compl"><i>q</i></span> &emsp; <i>p</i> ↔ <i>q</i> ≡ (<i>p</i> → <i>q</i>) ∧ (<i>q</i> → <i>p</i>)</p></div>
<div class="esempio"><b>Esempio</b>La negazione di «oggi studio e vado in palestra» è «oggi non studio o non vado in palestra». Non è «oggi non studio e non vado in palestra», che dice molto di più.<br>La negazione di «se piove, prendo l'ombrello» è «piove e non prendo l'ombrello».</div>
`},
  { n: 8, id: "p8", titolo: "Ragionare correttamente", html: `
<p>Un <b>ragionamento</b> (o inferenza) parte da alcune proposizioni, le <b>premesse</b>, e ne ricava un'altra, la <b>conclusione</b>. Un ragionamento si scrive mettendo le premesse una sotto l'altra e la conclusione sotto una linea.</p>
<div class="definizione"><b>Definizione</b>
Un ragionamento è <b>valido</b> (o corretto) se, ogni volta che tutte le premesse sono vere, anche la conclusione è vera.</div>
<p>La validità dipende solo dalla <b>forma</b> del ragionamento, non dal contenuto delle frasi. Un ragionamento valido con una premessa falsa può dare una conclusione falsa, ma un ragionamento valido con premesse vere dà sempre una conclusione vera.</p>
<h3>Quattro schemi validi</h3>
<p><b>1. Modus ponens</b> (dal latino, «modo che afferma»). Se è vero che <i>p</i> implica <i>q</i> ed è vero <i>p</i>, allora è vero <i>q</i>.</p>
<div class="schema"><div><i>p</i> → <i>q</i></div><div><i>p</i></div><div class="linea"><i>q</i></div></div>
<div class="esempio"><b>Esempio</b>Se un numero termina con 0, è divisibile per 10. Il numero 370 termina con 0. Quindi 370 è divisibile per 10.</div>
<p><b>2. Modus tollens</b> («modo che toglie»). Se è vero che <i>p</i> implica <i>q</i> e <i>q</i> è falsa, allora è falsa anche <i>p</i>.</p>
<div class="schema"><div><i>p</i> → <i>q</i></div><div><span class="compl"><i>q</i></span></div><div class="linea"><span class="compl"><i>p</i></span></div></div>
<div class="esempio"><b>Esempio</b>Se un numero è divisibile per 9, la somma delle sue cifre è divisibile per 9. La somma delle cifre di 7652 è 20, che non è divisibile per 9. Quindi 7652 non è divisibile per 9.</div>
<p><b>3. Sillogismo ipotetico</b> (o regola della catena). Le implicazioni si possono concatenare.</p>
<div class="schema"><div><i>p</i> → <i>q</i></div><div><i>q</i> → <i>r</i></div><div class="linea"><i>p</i> → <i>r</i></div></div>
<div class="esempio"><b>Esempio</b>Se studio, capisco la logica. Se capisco la logica, supero la verifica. Quindi, se studio, supero la verifica.</div>
<p><b>4. Sillogismo disgiuntivo</b>. Se di due possibilità almeno una è vera e la prima è falsa, deve essere vera la seconda.</p>
<div class="schema"><div><i>p</i> ∨ <i>q</i></div><div><span class="compl"><i>p</i></span></div><div class="linea"><i>q</i></div></div>
<div class="esempio"><b>Esempio</b>Le chiavi sono nello zaino o nel cappotto. Nello zaino non ci sono. Quindi sono nel cappotto.</div>
<h3>Due errori frequenti</h3>
<p>Alcuni ragionamenti «sembrano» corretti ma non lo sono. Si chiamano <b>fallacie</b>.</p>
<div class="due-schemi"><div class="schema"><div><i>p</i> → <i>q</i></div><div><i>q</i></div><div class="linea"><i>p</i> ?</div></div><div class="schema"><div><i>p</i> → <i>q</i></div><div><span class="compl"><i>p</i></span></div><div class="linea"><span class="compl"><i>q</i></span> ?</div></div></div>
<p><b>Affermare il conseguente</b> (a sinistra). «Se piove, la strada è bagnata. La strada è bagnata. Quindi piove.» Non è valido, perché la strada potrebbe essere bagnata per un altro motivo, per esempio perché è passata l'autobotte.</p>
<p><b>Negare l'antecedente</b> (a destra). «Se piove, la strada è bagnata. Non piove. Quindi la strada non è bagnata.» Non è valido per lo stesso motivo.</p>
<h3>Controllare un ragionamento con le tavole</h3>
<p>Per stabilire se un ragionamento è valido si cercano nella tavola di verità le righe in cui <b>tutte</b> le premesse sono vere e si controlla che in quelle righe sia vera anche la conclusione. Se c'è anche una sola riga con premesse vere e conclusione falsa, il ragionamento non è valido, e quella riga è un <b>controesempio</b>.</p>
<table class="tab tav"><tr><th><i>p</i></th><th><i>q</i></th><th>premessa<br><i>p</i> → <i>q</i></th><th>premessa<br><i>q</i></th><th>conclusione<br><i>p</i></th></tr><tr class="evid"><td>V</td><td>V</td><td>V</td><td>V</td><td>V</td></tr><tr><td>V</td><td>F</td><td>F</td><td>F</td><td>V</td></tr><tr class="evid"><td>F</td><td>V</td><td>V</td><td>V</td><td>F</td></tr><tr><td>F</td><td>F</td><td>V</td><td>F</td><td>F</td></tr></table>
<p>Controlliamo l'affermazione del conseguente, con premesse <i>p</i> → <i>q</i> e <i>q</i> e conclusione <i>p</i>. Le premesse sono entrambe vere nella prima riga e nella terza. Nella terza riga la conclusione <i>p</i> è falsa, quindi il ragionamento non è valido. Il controesempio è il caso in cui <i>p</i> è falsa e <i>q</i> è vera, cioè non piove ma la strada è bagnata.</p>
<h3>Dimostrare</h3>
<p>Un <b>teorema</b> è una proposizione della forma «se ipotesi, allora tesi», e la sua <b>dimostrazione</b> è una catena di ragionamenti validi che parte dall'ipotesi e arriva alla tesi.</p>
<p>A volte conviene la <b>dimostrazione per assurdo</b>. Si suppone che la tesi sia falsa e si arriva a una contraddizione. Siccome la contraddizione non può essere vera, la tesi non può essere falsa, e quindi è vera.</p>
<div class="esempio"><b>Esempio</b>Dimostriamo per assurdo che non esiste un numero naturale più grande di tutti gli altri.
<ul class="passaggi"><li>Supponiamo che esista, e chiamiamolo <i>n</i>.</li><li>Anche <i>n</i> + 1 è un numero naturale, e <i>n</i> + 1 &gt; <i>n</i>.</li><li>Quindi <i>n</i> non è il più grande, contro quello che avevamo supposto. È una contraddizione.</li><li>La supposizione è falsa, cioè un numero naturale più grande di tutti non esiste.</li></ul></div>
<div class="curiosita" data-img="cane" data-titolo="Il cane che non abbaiò">
<p>In un racconto di Arthur Conan Doyle pubblicato nel 1892, un prezioso cavallo da corsa sparisce di notte da una stalla custodita da un cane. Sherlock Holmes fa notare all'ispettore lo «strano comportamento del cane durante la notte». L'ispettore risponde che il cane non ha fatto nulla, e Holmes replica che proprio quello è lo strano comportamento.</p>
<p>Il ragionamento di Holmes è un modus tollens. Se fosse entrato uno sconosciuto, il cane avrebbe abbaiato. Il cane non ha abbaiato. Quindi non è entrato uno sconosciuto, e il colpevole è una persona che il cane conosceva bene.</p>
</div>
`},
  { n: 9, id: "p9", titolo: "Enunciati aperti, quantificatori e insiemi", html: `
<h3>Enunciati aperti e insieme di verità</h3>
<p>La frase «<i>x</i> è un multiplo di 3» non è una proposizione, perché non possiamo dire se è vera o falsa finché non sappiamo chi è <i>x</i>. Diventa una proposizione quando al posto di <i>x</i> mettiamo un numero. Con 6 è vera, con 7 è falsa.</p>
<div class="definizione"><b>Definizione</b>
Un <b>enunciato aperto</b> (o predicato) è una frase che contiene una o più <b>variabili</b> e che diventa una proposizione quando alle variabili si sostituiscono elementi di un insieme <i>U</i>, detto <b>dominio</b> (o insieme universo). Si scrive <i>p</i>(<i>x</i>), <i>q</i>(<i>x</i>)…<br>L'<b>insieme di verità</b> di <i>p</i>(<i>x</i>) è l'insieme degli elementi di <i>U</i> che rendono vera <i>p</i>(<i>x</i>).</div>
<div class="esempio"><b>Esempio</b>Con <i>U</i> = {1, 2, …, 12}, l'insieme di verità di <i>p</i>(<i>x</i>) = «<i>x</i> è un multiplo di 3» è <i>P</i> = {3, 6, 9, 12}.<br>Con lo stesso <i>U</i>, l'insieme di verità di «<i>x</i> + 5 = 20» è ∅, e quello di «<i>x</i> + 5 &gt; 5» è tutto <i>U</i>.</div>
<h3>Logica e insiemi</h3>
<p>Prendiamo <i>U</i> = {1, 2, …, 12}, <i>p</i>(<i>x</i>) = «<i>x</i> è un multiplo di 3», con insieme di verità <i>P</i> = {3, 6, 9, 12}, e <i>q</i>(<i>x</i>) = «<i>x</i> è pari», con insieme di verità <i>Q</i> = {2, 4, 6, 8, 10, 12}. Che cosa succede con i connettivi?</p>
<ul class="passaggi"><li>«<i>x</i> non è un multiplo di 3» è vera per gli elementi di <span class="compl"><i>P</i></span> = {1, 2, 4, 5, 7, 8, 10, 11}.</li>
<li>«<i>x</i> è multiplo di 3 e pari» è vera per gli elementi di <i>P</i> ∩ <i>Q</i> = {6, 12}.</li>
<li>«<i>x</i> è multiplo di 3 o pari» è vera per gli elementi di <i>P</i> ∪ <i>Q</i> = {2, 3, 4, 6, 8, 9, 10, 12}.</li></ul>
<p>Ogni connettivo corrisponde a un'operazione fra gli insiemi di verità. Per questo le leggi di De Morgan valgono sia per gli insiemi sia per le proposizioni.</p>
<table class="tab"><tr><th>logica</th><th>insiemi</th></tr>
<tr><td>negazione &emsp; <span class="compl"><i>p</i></span></td><td>complementare &emsp; <span class="compl"><i>P</i></span></td></tr>
<tr><td>congiunzione &emsp; <i>p</i> ∧ <i>q</i></td><td>intersezione &emsp; <i>P</i> ∩ <i>Q</i></td></tr>
<tr><td>disgiunzione inclusiva &emsp; <i>p</i> ∨ <i>q</i></td><td>unione &emsp; <i>P</i> ∪ <i>Q</i></td></tr>
<tr><td><i>p</i> → <i>q</i> vera per ogni <i>x</i> di <i>U</i></td><td>inclusione &emsp; <i>P</i> ⊆ <i>Q</i></td></tr>
<tr><td><i>p</i> ↔ <i>q</i> vera per ogni <i>x</i> di <i>U</i></td><td>uguaglianza &emsp; <i>P</i> = <i>Q</i></td></tr></table>
<div class="esempio"><b>Esempio</b>Con <i>U</i> = ℕ, «se <i>x</i> è multiplo di 6, allora <i>x</i> è pari» è vera per ogni <i>x</i>. Infatti l'insieme dei multipli di 6 è incluso in quello dei numeri pari.</div>
<h3>I quantificatori</h3>
<p>Un enunciato aperto diventa una proposizione anche se diciamo per quanti elementi deve essere vero. Lo si fa con i <b>quantificatori</b>.</p>
<div class="definizione"><b>Definizione</b>
<ul><li>Il <b>quantificatore universale</b> ∀ si legge «per ogni». La proposizione «∀ <i>x</i> ∈ <i>U</i>, <i>p</i>(<i>x</i>)» è vera se <i>p</i>(<i>x</i>) è vera per tutti gli elementi di <i>U</i>, cioè se l'insieme di verità è <i>U</i>.</li>
<li>Il <b>quantificatore esistenziale</b> ∃ si legge «esiste almeno un». La proposizione «∃ <i>x</i> ∈ <i>U</i> | <i>p</i>(<i>x</i>)» è vera se <i>p</i>(<i>x</i>) è vera per almeno un elemento di <i>U</i>, cioè se l'insieme di verità non è vuoto.</li>
<li>Il simbolo ∃! si legge «esiste uno e un solo».</li></ul></div>
<div class="esempio"><b>Esempio</b>∀ <i>x</i> ∈ ℕ, <i>x</i> + 0 = <i>x</i> &emsp; è vera.<br>∀ <i>x</i> ∈ ℕ, <i>x</i> · 2 &gt; <i>x</i> &emsp; è falsa, perché per <i>x</i> = 0 si ha 0 · 2 = 0.<br>∃ <i>x</i> ∈ ℕ | <i>x</i> + 3 = 1 &emsp; è falsa, mentre ∃ <i>x</i> ∈ ℤ | <i>x</i> + 3 = 1 è vera (<i>x</i> = −2).<br>∃! <i>x</i> ∈ ℕ | 2 · <i>x</i> = 10 &emsp; è vera, perché l'unico numero è 5.</div>
<p>Per dimostrare che una proposizione con ∀ è falsa basta trovare un solo elemento per cui <i>p</i>(<i>x</i>) è falsa. Questo elemento si chiama <b>controesempio</b>. Per dimostrare che è vera, invece, non bastano molti esempi, serve un ragionamento valido per tutti gli elementi.</p>
<h3>Negare i quantificatori</h3>
<div class="regola"><b>Regola</b>
<p class="formula"><span class="compl">∀ <i>x</i>, <i>p</i>(<i>x</i>)</span> ≡ ∃ <i>x</i> | <span class="compl"><i>p</i>(<i>x</i>)</span> &emsp; <span class="compl">∃ <i>x</i> | <i>p</i>(<i>x</i>)</span> ≡ ∀ <i>x</i>, <span class="compl"><i>p</i>(<i>x</i>)</span></p>
Per negare si scambia ∀ con ∃ e si nega l'enunciato.</div>
<div class="esempio"><b>Esempio</b>La negazione di «tutti gli studenti hanno consegnato il compito» è «almeno uno studente non ha consegnato il compito». Non è «nessuno studente ha consegnato il compito».<br>La negazione di «esiste un numero primo pari» è «tutti i numeri primi sono dispari», che è falsa, perché 2 è primo e pari.<br>La negazione di «∀ <i>x</i> ∈ ℝ, <span class="pot"><i>x</i><sup>2</sup></span> &gt; 0» è «∃ <i>x</i> ∈ ℝ | <span class="pot"><i>x</i><sup>2</sup></span> ≤ 0», che è vera, per esempio con <i>x</i> = 0.</div>
<div class="curiosita" data-img="eulero41" data-titolo="Quaranta esempi non bastano">
<p>Nel 1772 Eulero notò che la formula <span class="pot"><i>n</i><sup>2</sup></span> + <i>n</i> + 41 dà un numero primo per <i>n</i> = 0, 1, 2, 3 e così via. Con <i>n</i> = 0 si ottiene 41, con <i>n</i> = 1 si ottiene 43, con <i>n</i> = 2 si ottiene 47, e si continua a trovare numeri primi fino a <i>n</i> = 39, che dà 1601.</p>
<p>Sembra che la formula dia sempre numeri primi, ma con <i>n</i> = 40 si ottiene <span class="pot">40<sup>2</sup></span> + 40 + 41 = 1681 = 41 · 41, che non è primo. Quaranta esempi veri non dimostrano una proposizione con «per ogni», mentre un solo controesempio basta a dimostrare che è falsa.</p>
</div>
`},
  ]
};
