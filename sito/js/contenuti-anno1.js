/* =====================================================================
   ELENCO DEGLI ANNI E DEI CAPITOLI
   Per aggiungere un capitolo: inserisci una riga nell'elenco "capitoli"
   dell'anno giusto. "pronto: true" lo rende cliccabile.
   ===================================================================== */
window.LIBRO = {
  anni: [
    { n: 1, nome: "Primo anno",   colore: "#1f4fa3", simbolo: "ℕ", pronto: true },
    { n: 2, nome: "Secondo anno", colore: "#1f8a5b", simbolo: "√", pronto: false },
    { n: 3, nome: "Terzo anno",   colore: "#e8752a", simbolo: "π", pronto: false },
    { n: 4, nome: "Quarto anno",  colore: "#6b47b8", simbolo: "sin", pronto: false },
    { n: 5, nome: "Quinto anno",  colore: "#c8373b", simbolo: "∫", pronto: false }
  ],
  anno1: {
    parti: [
      { titolo: "Aritmetica e algebra", capitoli: [
        { n: 1,  id: "cap1", titolo: "I numeri naturali", pronto: true,
          paragrafi: "Numeri naturali · Le quattro operazioni · Potenze · Espressioni · Proprietà · Multipli e divisori · MCD e mcm" },
        { n: 2,  id: "cap2", titolo: "I numeri interi", pronto: true,
          paragrafi: "Che cosa sono i numeri interi · Addizione e sottrazione · Moltiplicazione e divisione · La potenza · Le leggi di monotonia" },
        { n: 3,  id: "cap3", titolo: "I numeri razionali e i numeri reali", pronto: true,
          paragrafi: "Frazioni e numeri razionali · Confronto · Operazioni in ℚ · Potenze con esponente negativo · Decimali · Numeri reali · Proporzioni · Percentuali · Calcolo approssimato · Notazione scientifica" },
        { n: 4,  id: "cap4", titolo: "Gli insiemi e la logica", pronto: true,
          paragrafi: "Insiemi · Sottoinsiemi e insieme delle parti · Operazioni · Prodotto cartesiano e partizioni · Contare con Venn · Proposizioni e connettivi · Implicazione · Ragionare correttamente · Quantificatori" },
        { n: 5,  id: "cap5", titolo: "Relazioni e funzioni", pronto: true,
          paragrafi: "Relazioni e rappresentazioni · Proprietà · Equivalenza · Ordine · Funzioni · Composizione e inversa · Grafico cartesiano · Funzioni fondamentali · Modelli" },
        { n: 6,  id: "cap6", titolo: "I monomi", pronto: true,
          paragrafi: "Dalle parole alle lettere · Che cos'è un monomio · Addizione e sottrazione · Moltiplicazione e potenza · Divisione · Espressioni · MCD e mcm · Modelli" },
        { n: 7,  id: "cap7", titolo: "I polinomi e i prodotti notevoli", pronto: true,
          paragrafi: "Che cos'è un polinomio · Addizione e sottrazione · Moltiplicazione e divisione per un monomio · Somma per differenza e quadrato di un binomio · Quadrato di un trinomio e cubo di un binomio · Triangolo di Tartaglia · Espressioni · Modelli" },
        { n: 8,  titolo: "La scomposizione in fattori" },
        { n: 9,  titolo: "Le frazioni algebriche" },
        { n: 10, titolo: "Le equazioni lineari" },
        { n: 11, titolo: "Le disequazioni lineari" }
      ]},
      { titolo: "Dati e previsioni", capitoli: [
        { n: 12, titolo: "Introduzione alla statistica" }
      ]},
      { titolo: "Geometria", capitoli: [
        { n: "G1", titolo: "Enti geometrici fondamentali" },
        { n: "G2", titolo: "I triangoli" },
        { n: "G3", titolo: "Perpendicolari e parallele" },
        { n: "G4", titolo: "I parallelogrammi e i trapezi" }
      ]}
    ]
  },
  capitoli: {} // riempito dai file dei singoli capitoli (es. capitolo1.js)
};
