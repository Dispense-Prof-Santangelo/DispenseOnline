/* =====================================================================
   SFONDI A TEMA (discipline e indirizzi)
   Ogni tema ha: colore principale, elenco di "segni" che fluttuano
   (testo oppure icona SVG con "@nome") ed eventuali macchie di colore.
   Per una disciplina o un indirizzo nuovo basta aggiungere un tema qui.
   ===================================================================== */
(function () {
  /* icone semplici, disegnate a tratto (si colorano con currentColor) */
  const I = {
    atomo: '<ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/>',
    ingranaggio: '<path d="M10.3 2.5h3.4l.5 2.6 1.9.8 2.2-1.5 2.4 2.4-1.5 2.2.8 1.9 2.6.5v3.4l-2.6.5-.8 1.9 1.5 2.2-2.4 2.4-2.2-1.5-1.9.8-.5 2.6h-3.4l-.5-2.6-1.9-.8-2.2 1.5-2.4-2.4 1.5-2.2-.8-1.9-2.6-.5v-3.4l2.6-.5.8-1.9-1.5-2.2 2.4-2.4 2.2 1.5 1.9-.8z"/><circle cx="12" cy="12" r="3.3"/>',
    lavagna: '<rect x="3" y="3.5" width="18" height="12"/><path d="M7 19.5l2-4M17 19.5l-2-4M6.5 8h6M6.5 11h9"/>',
    tocco: '<path d="M2 9l10-4.5L22 9l-10 4.5z"/><path d="M6.5 11v4.5c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3V11M22 9v5"/>',
    provetta: '<path d="M9 3h6M10 3v12a2 2 0 0 0 4 0V3"/><path d="M10 11h4"/>',
    clessidra: '<path d="M6 3h12M6 21h12M7 3c0 5 10 5 10 9s-10 4-10 9M17 3c0 5-10 5-10 9s10 4 10 9"/>',
    libro: '<path d="M3 5c3-1 6-1 9 1v14c-3-2-6-2-9-1z"/><path d="M21 5c-3-1-6-1-9 1v14c3-2 6-2 9-1z"/>',
    fumetto: '<path d="M4 5h16v10H10l-4 4v-4H4z"/>',
    colonna: '<path d="M5 4h14M6 4c0 1.5-1 2-1 2M18 4c0 1.5 1 2 1 2M7 6h10M8 6v13M12 6v13M16 6v13M6 19h12M5 21h14"/>',
    alloro: '<path d="M12 21c-5-3-7-8-6-14M12 21c5-3 7-8 6-14"/><path d="M6.5 10c-2 0-3-1-3.5-2.5 1.5 0 3 .5 3.5 2.5zM7 14c-2 .3-3.2-.5-4-2 1.5-.2 3 .3 4 2zM17.5 10c2 0 3-1 3.5-2.5-1.5 0-3 .5-3.5 2.5zM17 14c2 .3 3.2-.5 4-2-1.5-.2-3 .3-4 2z"/>',
    anfora: '<path d="M9 3h6M10 3v3c-4 2-5 6-3 10l2 5h6l2-5c2-4 1-8-3-10V3"/><path d="M8 8c-2 0-3 2-2 4M16 8c2 0 3 2 2 4"/>',
    pennello: '<path d="M14 4l6 6-8 8-6-6z"/><path d="M6 12c-2 1-3 4-3 8 4 0 7-1 8-3"/>',
    tavolozza: '<path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 2-2s-1-1.5-1-2.5 1-1.5 2-1.5h2a4 4 0 0 0 4-4c0-4.5-4-8-9-8z"/><circle cx="7.5" cy="11" r="1.2"/><circle cx="10" cy="7" r="1.2"/><circle cx="15" cy="7" r="1.2"/>',
    matita: '<path d="M4 20h4L19 9l-4-4L4 16v4z"/><path d="M13.5 6.5l4 4"/>',
    ancora: '<circle cx="12" cy="5" r="2"/><path d="M12 7v14M8 10h8M4 14c0 4 4 7 8 7s8-3 8-7M4 14l2 1M20 14l-2 1"/>',
    timone: '<circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="1.6"/><path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19"/>',
    bussola: '<circle cx="12" cy="12" r="9"/><path d="M12 5l2.5 7L12 19l-2.5-7z"/><path d="M12 3v1.5M12 19.5V21M3 12h1.5M19.5 12H21"/>',
    nave: '<path d="M3 15h18l-3 5H6z"/><path d="M6 15V10h12v5M9 10V6h6v4M12 6V3"/>',
    onde: '<path d="M2 9c2.5-2 5-2 7.5 0s5 2 7.5 0 3.5-1.5 5-1M2 15c2.5-2 5-2 7.5 0s5 2 7.5 0 3.5-1.5 5-1"/>',
    container: '<rect x="2.5" y="6" width="19" height="12"/><path d="M6.5 6v12M10.5 6v12M14.5 6v12M18 6v12"/>',
    camion: '<path d="M2 6h12v10H2zM14 9h4l3 3v4h-7z"/><circle cx="6" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
    aereo: '<path d="M2 13l8-1.5L15 3h2l-2.5 8.5L20 11l1.5-2H23l-1 4 1 4h-1.5L20 15l-5.5-.5L17 21h-2l-5-8.5z"/>',
    foglia: '<path d="M4 20C4 10 10 4 20 4c0 10-6 16-16 16z"/><path d="M4 20L14 10"/>',
    pala: '<path d="M12 10v11M10 21h4"/><circle cx="12" cy="9" r="1.2"/><path d="M12 8c-.5-3 0-5 1-6 .5 2 .2 4-1 6zM13 9.5c2.5 1 4.5 2.5 5 4-2 0-4-1.5-5-4zM11 9.5c-2.5 1-4.5 2.5-5 4 2 0 4-1.5 5-4z"/>',
    goccia: '<path d="M12 3c3 4.5 6 8 6 11a6 6 0 0 1-12 0c0-3 3-6.5 6-11z"/>',
    chip: '<rect x="6" y="6" width="12" height="12"/><path d="M9 3v3M12 3v3M15 3v3M9 18v3M12 18v3M15 18v3M3 9h3M3 12h3M3 15h3M18 9h3M18 12h3M18 15h3"/>',
    pacco: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>'
  };
  function icona(nome) {
    return `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${I[nome] || ""}</svg>`;
  }

  /* temi: colore, segni (testo o @icona), macchie (colori delle macchie di pittura) */
  const MAT = ["π", "∑", "√", "∞", "ℕ", "÷", "x²", "∫", "≤", "%", "θ", "Δ", "7", "3", "+", "×", "∈", "sin", "cos", "e", "ℤ", "ℚ", "ℝ", "≠", "±", "∅", "∪", "∩", "∀", "∃", "log", "lim"];
  const T = {
    neutro:      { colore: "#1f4fa3", segni: ["A", "π", "α", "?", "!", "@libro", "@matita", "∑", "Ω", "@fumetto", "x", "1", "2", "3"] },
    matematica:  { colore: "#1f4fa3", segni: MAT },
    fisica:      { colore: "#1f6f8b", segni: ["F = ma", "E = mc²", "λ", "Ω", "v", "g", "Δt", "@atomo", "ħ", "∇", "°C", "Hz", "J", "W", "N"] },
    scientifico: { colore: "#1f4fa3", segni: ["π", "∑", "√", "∫", "E = mc²", "H₂O", "@atomo", "Δ", "λ", "∞", "@provetta", "F = ma", "x²", "θ", "CO₂", "sin", "@libro"] },
    "scienze-applicate": { colore: "#1f6f8b", segni: ["</>", "{ }", "01", "10", "if", "@chip", "@atomo", "CO₂", "DNA", "∑", "Δt", "@provetta", "λ", "f(x)", "for", "π"] },
    tred:        { colore: "#5a3fa8", segni: ["@foglia", "@pala", "@goccia", "0", "1", "@foglia", "CO₂", "O₂", "@pala", "01", "☀", "@goccia"] },
    linguistico: { colore: "#2a7a52", segni: ["Ciao", "Hello", "Bonjour", "Hola", "Hallo", "Olá", "Привет", "你好", "こんにちは", "Γειά", "مرحبا", "@fumetto", "@libro", "Merci", "Thanks", "Danke", "Gracias", "Grazie"] },
    classico:    { colore: "#8a5a1f", segni: ["Α", "Ω", "λόγος", "SPQR", "ἀρετή", "Ψ", "Σ", "carpe diem", "@colonna", "@alloro", "@anfora", "MMXXVI", "κόσμος", "φῶς", "Φ", "IX", "Rosa, rosae", "@libro"] },
    artistico:   { colore: "#b8322f", segni: ["@pennello", "@tavolozza", "@matita", "◯", "△", "□", "✦", "✿", "◐", "◆", "@pennello", "~"],
                   macchie: ["#e8752a", "#2a86c9", "#d9a514", "#b8322f", "#2a7a52", "#6b47b8"] },
    trasporti:   { colore: "#1f6f8b", segni: ["@ancora", "@camion", "@aereo", "@nave", "@container", "@bussola", "km", "kn", "→", "⇄", "@pacco", "N", "@onde"] },
    logistica:   { colore: "#8a5a1f", segni: ["@container", "@pacco", "@camion", "@aereo", "kg", "km", "→", "⇄", "▮▯▮▮▯▮", "t", "m³", "@nave"] },
    "navale-faro": { colore: "#1f3260", segni: ["@ancora", "@timone", "@bussola", "@nave", "@onde"] },
    "navale-giorno": { colore: "#1f3260", segni: ["@ancora", "@timone", "@bussola", "@nave", "@onde"] },
    navale:      { colore: "#1f3260", segni: ["@ancora", "@timone", "@bussola", "@nave", "@onde", "kn", "N", "S", "E", "W", "44° N", "@onde", "~"] }
  };

  /* restituisce l'HTML dello sfondo animato per un tema */
  /* restituisce il contenitore dello sfondo: la scena dell'indirizzo (pagine intere, se esiste) oppure
     i "segni" del tema che fluttuano e si urtano senza mai sovrapporsi (disegnati su canvas da js/scene.js).
     mini = sfondo dentro un pulsante; altrimenti copre tutto lo schermo. */
  function sfondo(nomeTema, quanti, conScena, mini) {
    const t = T[nomeTema] ? nomeTema : "neutro";
    if (conScena && window.SCENE && window.SCENE.esiste(t)) return `<div class="sfondo-tema scena" aria-hidden="true" data-scena="${t}" style="--tc:${T[t].colore}"></div>`;
    return `<div class="sfondo-tema ${mini ? "mini" : "scena"}" aria-hidden="true" data-scena="segni" data-tema="${t}" data-quanti="${quanti || 60}" style="--tc:${T[t].colore}"></div>`;
  }
  window.TEMI = { sfondo, icona, colore: n => (T[n] || T.neutro).colore, esiste: n => !!T[n], dati: n => T[n] || T.neutro, SVG: I };
})();
