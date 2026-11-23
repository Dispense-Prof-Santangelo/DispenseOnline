/* =====================================================================
   CATALOGO DELLE DISPENSE (unico per tutto il sito)
   - Ogni dispensa (capitolo) esiste UNA volta sola: qui ci sono solo i
     "puntatori" che dicono in quali indirizzi e anni si usa.
   - STATO: "in revisione" → visibile solo ai docenti;
            "revisionata"  → visibile anche agli studenti.
   Per pubblicare un capitolo agli studenti basta cambiarne lo stato.
   ===================================================================== */
window.SCUOLA = {

  /* ---------- INDIRIZZI ----------
     anni: quanti anni dura il percorso.
     articolazioni: dal terzo anno il percorso si divide (es. Trasporti e logistica). */
  indirizzi: [
    { id: "scientifico",       nome: "Liceo Scientifico",                       breve: "Scientifico",          anni: 5, tema: "scientifico" },
    { id: "scienze-applicate", nome: "Liceo Scientifico – Scienze applicate",   breve: "Scienze applicate",    anni: 5, tema: "scienze-applicate" },
    { id: "tred",              nome: "Liceo TRED (quadriennale)",               breve: "TRED",                 anni: 4, tema: "tred" },
    { id: "linguistico",       nome: "Liceo Linguistico",                       breve: "Linguistico",          anni: 5, tema: "linguistico" },
    { id: "classico",          nome: "Liceo Classico",                          breve: "Classico",             anni: 5, tema: "classico" },
    { id: "artistico",         nome: "Liceo Artistico",                         breve: "Artistico",            anni: 5, tema: "artistico" },
    { id: "trasporti",         nome: "Istituto Trasporti e Logistica",          breve: "Trasporti e Logistica", anni: 5, tema: "trasporti",
      articolazioni: { da: 3, scelte: [
        { id: "logistica", nome: "Logistica",                    tema: "logistica" },
        { id: "navale",    nome: "Conduzione del mezzo navale",  tema: "navale" } ] } }
  ],

  /* ---------- DISCIPLINE ----------
     gruppi: come il docente vede gli indirizzi per questa disciplina
     (indirizzi che usano le stesse dispense stanno nello stesso gruppo). */
  discipline: [
    { id: "matematica", nome: "Matematica", simbolo: "∑", tema: "matematica",
      gruppi: [
        { nome: "Liceo Scientifico e Scienze applicate", percorsi: ["scientifico", "scienze-applicate"] },
        { nome: "Liceo TRED (quadriennale)",              percorsi: ["tred"] },
        { nome: "Liceo Linguistico, Classico e Artistico", percorsi: ["linguistico", "classico", "artistico"] },
        { nome: "Trasporti e Logistica – primo biennio",  percorsi: ["trasporti"], anni: [1, 2] },
        { nome: "Trasporti e Logistica – Logistica",      percorsi: ["logistica"], anni: [3, 4, 5] },
        { nome: "Trasporti e Logistica – Conduzione del mezzo navale", percorsi: ["navale"], anni: [3, 4, 5] }
      ] }
  ],

  /* ---------- NOTE SULLE DISPENSE (pagina "Note sulle dispense" e fondo dei PDF) ----------
     autori e scuola: si lasciano vuoti finché il gruppo di docenti non decide come firmare.
     segnalazioni: indirizzo di un modulo anonimo (es. Google Moduli) per segnalare un errore; vuoto = si avvisa il docente. */
  note: {
    autori: "",
    scuola: "",
    aggiornamento: "23/11/2026",
    licenza: "CC BY-SA 4.0",
    licenzaLink: "https://creativecommons.org/licenses/by-sa/4.0/deed.it",
    segnalazioni: ""
  },

  /* ---------- STATO DI OGNI CAPITOLO ---------- */
  stato: {
    cap1: "in revisione",
    cap2: "in revisione",
    cap3: "in revisione",
    cap4: "in revisione",
    cap5: "in revisione"
  },

  /* ---------- PIANI: capitoli di ogni disciplina per percorso e anno ----------
     Chiave: "<percorso>-<anno>" (percorso = indirizzo, oppure articolazione dal 3° anno).
     Un capitolo pronto si indica con il suo id ("cap1"); uno in preparazione con { titolo }.
     Più percorsi possono puntare allo stesso piano (vedi "usa"). */
  piani: {
    matematica: {
      "scientifico-1": {
        pdf: "pdf/matematica-primo-anno.pdf", pdfNome: "Matematica - Primo anno.pdf",
        parti: [
          { titolo: "Aritmetica e algebra", capitoli: ["cap1", "cap2", "cap3", "cap4", "cap5", { titolo: "I monomi" },
            { titolo: "I polinomi e i prodotti notevoli" }, { titolo: "La scomposizione in fattori" },
            { titolo: "Le frazioni algebriche" }, { titolo: "Le equazioni lineari" }, { titolo: "Le disequazioni lineari" }] },
          { titolo: "Dati e previsioni", capitoli: [{ titolo: "Introduzione alla statistica" }] },
          { titolo: "Geometria", capitoli: [{ titolo: "Enti geometrici fondamentali" }, { titolo: "I triangoli" },
            { titolo: "Perpendicolari e parallele" }, { titolo: "I parallelogrammi e i trapezi" }] }
        ] },
      "scienze-applicate-1": { usa: "scientifico-1" },
      "tred-1": { usa: "scientifico-1" }   // da verificare con la scansione del TRED
    }
  }
};
