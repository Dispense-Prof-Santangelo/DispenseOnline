/* =====================================================================
   NAVIGAZIONE DEL SITO (non serve modificarlo per aggiungere contenuti)
   Pagine: #home · #anni · #anno-1 · #cap1 (teoria) · #cap1-esercizi
   ===================================================================== */
(function () {
  const app = document.getElementById("app");
  const barra = document.getElementById("barra");
  const briciole = document.getElementById("briciole");
  const L = window.LIBRO;

  const ICONA_LENTE = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/><path d="M8 10.5a2.5 2.5 0 0 1 2.5-2.5" stroke-width="1.8"/></svg>';
  const ICONA_MATITA = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9l-4-4L4 16v4z"/><path d="M13.5 6.5l4 4"/></svg>';
  const ICONA_PDF = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0-5-5m5 5 5-5"/><path d="M4 19h16"/></svg>';

  /* ---------- riquadri espandibili ---------- */
  function riquadro(tipo, titolo, corpo, classe, icona) {
    return `<div class="riquadro ${classe || ""}">
      <button class="riquadro-testa" aria-expanded="false">
        <span class="icona-tonda">${icona}</span>
        <span class="riquadro-titoli"><span class="riquadro-tipo">${tipo}</span><span class="riquadro-titolo">${titolo}</span></span>
        <span class="riquadro-freccia">Apri</span>
      </button>
      <div class="riquadro-corpo"><div><div>${corpo}</div></div></div></div>`;
  }
  function attivaRiquadri(radice, aperti) {
    const ILL = window.ILLUSTRAZIONI || {};
    radice.querySelectorAll(".fig-testo[data-img]").forEach(f => { if (ILL[f.dataset.img]) f.insertAdjacentHTML("afterbegin", ILL[f.dataset.img]); });
    radice.querySelectorAll(".curiosita").forEach(d => {
      const w = document.createElement("div");
      const img = d.dataset.img && ILL[d.dataset.img] ? `<div class="illustrazione">${ILL[d.dataset.img]}</div>` : "";
      w.innerHTML = riquadro("Curiosità", d.dataset.titolo, img + d.innerHTML, "", ICONA_LENTE);
      d.replaceWith(w.firstElementChild);
    });
    radice.querySelectorAll(".riquadro").forEach(r => {
      const b = r.querySelector(".riquadro-testa"), f = r.querySelector(".riquadro-freccia");
      const imposta = on => { r.classList.toggle("aperto", on); b.setAttribute("aria-expanded", on); f.textContent = on ? "Chiudi" : "Apri"; };
      if (aperti) imposta(true);
      b.addEventListener("click", () => imposta(!r.classList.contains("aperto")));
    });
  }
  function attivaAnimazioni(radice, stampa) {
    radice.querySelectorAll(".anim[data-anim]").forEach(d => {
      const f = window.ANIM[d.dataset.anim]; if (!f) return;
      d.innerHTML = `<div class="anim-titolo"><span class="pallino"></span>${d.dataset.titolo || ""}</div>`;
      f(d, !!stampa);
    });
  }

  /* ---------- download dei PDF ---------- */
  function avviso(t) { const a = document.getElementById("avviso"); a.textContent = t; a.classList.add("su"); setTimeout(() => a.classList.remove("su"), 3200); }
  async function scarica(url, nome) {
    let dl = null;
    if (window.claude && window.claude.use) { try { dl = await window.claude.use("downloads"); } catch (e) { dl = null; } }
    if (dl) {
      try { const blob = await (await fetch(url)).blob(); await dl.save({ filename: nome, data: blob }); avviso("PDF salvato ✓"); }
      catch (e) { if (!e || e.code !== "declined") avviso("Download non riuscito: riprova."); }
      return;
    }
    const a = document.createElement("a"); a.href = url; a.download = nome; document.body.appendChild(a); a.click(); a.remove();
  }
  /* sul cellulare l'indice del capitolo si apre e chiude toccando il titolo */
  document.addEventListener("click", e => {
    const t = e.target.closest(".indice-laterale h4");
    if (t) t.parentElement.classList.toggle("aperto");
    const l = e.target.closest(".indice-laterale [data-vai]");
    if (l && window.innerWidth <= 860) l.closest(".indice-laterale").classList.remove("aperto");
  });
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-pdf]"); if (!b) return;
    e.preventDefault(); scarica(b.dataset.pdf, b.dataset.nome);
  });

  /* ---------- briciole di pane ---------- */
  function imposta(voci) {
    barra.classList.remove("nascosta");
    voci = [["Discipline", "#home"]].concat(voci);
    briciole.innerHTML = voci.map((v, i) => i < voci.length - 1 ? `<a href="${v[1]}">${v[0]}</a><span class="sep">›</span>` : `<b>${v[0]}</b>`).join("");
  }

  /* simboli e formule che salgono lentamente (sfondo animato) */
  function simboliFluttuanti(lista, quanti, base, passo) {
    let sp = "";
    for (let i = 0; i < quanti; i++) {
      const s = lista[(i * 7) % lista.length];
      sp += `<span style="left:${(i * 37) % 96}%;font-size:${base + ((i * 7) % 5) * passo}rem;animation-duration:${14 + (i * 5) % 16}s;animation-delay:-${(i * 3) % 20}s">${s}</span>`;
    }
    return sp;
  }

  /* ---------- PAGINA 1: copertina ---------- */
  function copertina() {
    barra.classList.add("nascosta");
    const simboli = ["π", "∑", "√", "∞", "ℕ", "÷", "x²", "∫", "≤", "%", "θ", "Δ", "7", "3", "+", "×", "∈", "sin", "cos", "e"];
    const sp = simboliFluttuanti(simboli, 18, 0.9, 0.5);
    app.innerHTML = `<section class="copertina">
      <div class="copertina-centro">
        <h1 class="titolo-copertina">Dispense online</h1>
        <p>Scegli la disciplina</p>
        <a class="bottone-matematica" href="#anni"><span class="simboli" aria-hidden="true">${sp}</span><span class="scritta">Matematica</span><small>Entra ›</small></a>
      </div></section>`;
  }

  /* ---------- PAGINA 2: scelta dell'anno ---------- */
  function anni() {
    imposta([["Scegli l'anno", "#anni"]]);
    const simboli = ["π", "∑", "√", "∞", "ℕ", "÷", "x²", "∫", "≤", "%", "θ", "Δ", "7", "3", "+", "×", "∈", "sin", "cos", "e",
      "α", "β", "γ", "λ", "φ", "Ω", "ℤ", "ℚ", "ℝ", "≠", "≥", "±", "∅", "∪", "∩", "⊂", "∀", "∃", "y", "x³", "log", "tg", "lim", "0", "1", "2", "5", "8", "9", "=", "−", "·", "°", "∠", "⊥", "∥"];
    let fl = "";
    for (let i = 0; i < 90; i++) {
      const s = simboli[(i * 13) % simboli.length];
      fl += `<span style="left:${(i * 37 + Math.floor(i / 9) * 11) % 100}%;font-size:${1 + ((i * 7) % 6) * 0.6}rem;animation-duration:${14 + (i * 5) % 18}s;animation-delay:-${(i * 3.3) % 32}s">${s}</span>`;
    }
    app.innerHTML = `<section class="pagina-anni"><div class="simboli" aria-hidden="true">${fl}</div><h1>Scegli il tuo anno</h1>
      <p class="sottotitolo">Teoria, animazioni, curiosità ed esercizi con le soluzioni</p>
      <div class="griglia-anni">${L.anni.map((a, i) => `
        <a class="carta-anno ${a.pronto ? "" : "disattiva"}" ${a.pronto ? `href="#anno-${a.n}"` : 'aria-disabled="true"'} data-simbolo="${a.simbolo}"
           style="--c:${a.colore};animation-delay:${i * 0.1}s">
          <div class="num">${a.n}<sup>°</sup></div><div class="etichetta">${a.nome}</div>
          <div class="stato">${a.pronto ? "Apri l'indice ›" : "In preparazione"}</div></a>`).join("")}
      </div></section>`;
  }

  /* ---------- PAGINA 3: indice dell'anno ---------- */
  function annoUno() {
    imposta([["Anni", "#anni"], ["1° anno", "#anno-1"]]);
    let k = 0;
    app.innerHTML = `<div class="contenitore">
      <div class="intestazione-anno"><div><h1>Primo anno</h1><p>Scegli un capitolo: teoria o esercizi.</p></div>
        <button class="bottone b-pdf" data-pdf="pdf/matematica-primo-anno.pdf" data-nome="Matematica - Primo anno.pdf">${ICONA_PDF} Scarica il libro del 1° anno (PDF)</button></div>
      ${L.anno1.parti.map(p => `<h2 class="parte">${p.titolo}</h2><div class="lista-capitoli">${p.capitoli.map(c => {
        const d = `animation-delay:${(k++) * 0.05}s`;
        return c.pronto ? `<div class="capitolo-riga" style="${d}"><div class="n">${c.n}</div><div><h3>${c.titolo}</h3><p class="paragrafi">${c.paragrafi}</p></div>
            <div class="azioni"><a class="bottone b-teoria" href="#${c.id}">Teoria</a><a class="bottone b-esercizi" href="#${c.id}-esercizi">Esercizi</a></div></div>`
          : `<div class="capitolo-riga prossimamente" style="${d}"><div class="n">${c.n}</div><div><h3>${c.titolo}</h3></div><span class="etichetta-presto">in preparazione</span></div>`;
      }).join("")}</div>`).join("")}
</div>`;
  }

  /* ---------- PAGINA 4: teoria del capitolo ---------- */
  function teoria(cap) {
    imposta([["Anni", "#anni"], ["1° anno", "#anno-1"], [`Cap. ${cap.numero} · Teoria`, "#" + cap.id]]);
    app.innerHTML = `<div class="capitolo">
      <aside class="indice-laterale"><h4>Capitolo ${cap.numero}</h4><ol>${cap.storia ? `<li class="extra"><a href="#${cap.id}" data-vai="storia"><b>✦</b>Storia della matematica</a></li>` : ""}${cap.paragrafi.map(p => `<li><a href="#${cap.id}" data-vai="${p.id}"><b>${p.n}</b>${p.titolo}</a></li>`).join("")}${cap.sintesi ? `<li class="extra"><a href="#${cap.id}" data-vai="sintesi"><b>✦</b>Teoria in sintesi</a></li>` : ""}</ol>
        <div class="azioni"><a class="bottone b-esercizi" href="#${cap.id}-esercizi">Vai agli esercizi ›</a>
        <button class="bottone b-pdf" data-pdf="${cap.pdf}" data-nome="Capitolo ${cap.numero} - ${cap.titolo}.pdf">${ICONA_PDF} Scarica il capitolo (PDF)</button></div></aside>
      <article>${testata(cap, false)}${corpoTeoria(cap)}</article></div>`;
    attivaRiquadri(app); attivaAnimazioni(app); collegaIndice(app);
  }
  /* teoria: storia (apertura) + paragrafi + teoria in sintesi (chiusura) */
  function corpoTeoria(cap) {
    return (cap.storia ? `<section class="paragrafo storia" id="storia"><h2><span class="num">✦</span>Storia della matematica</h2>${cap.storia}</section>` : "")
      + cap.paragrafi.map(p => `<section class="paragrafo" id="${p.id}"><h2><span class="num">${p.n}</span>${p.titolo}</h2>${p.html}</section>`).join("")
      + (cap.sintesi ? `<section class="paragrafo sintesi" id="sintesi"><h2><span class="num">✦</span>Teoria in sintesi</h2><div class="sint-griglia">${cap.sintesi}</div><div class="appunti"><span>Appunti</span></div></section>` : "");
  }
  function testata(cap, es) {
    return `<header class="testata-capitolo ${es ? "esercizi" : ""}"><span class="grande">${cap.numero}</span><div class="cap">Capitolo ${cap.numero} · ${es ? "Esercizi" : "Teoria"}</div>
      <h1>${cap.titolo}</h1><p>${es ? "Prova da solo. Sotto ogni esercizio puoi aprire lo svolgimento con la soluzione." : cap.sottotitolo}</p></header>`;
  }
  function collegaIndice(radice, sel) {
    const link = radice.querySelectorAll("[data-vai]");
    link.forEach(a => a.addEventListener("click", e => { e.preventDefault(); document.getElementById(a.dataset.vai).scrollIntoView({ behavior: "smooth" }); }));
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(v => v.forEach(x => {
      if (x.isIntersecting && [...link].some(a => a.dataset.vai === x.target.id)) link.forEach(a => a.classList.toggle("attivo", a.dataset.vai === x.target.id));
    }), { rootMargin: "-30% 0px -60% 0px" });
    radice.querySelectorAll(sel || ".paragrafo").forEach(s => io.observe(s));
  }

  /* ---------- PAGINA 5: esercizi del capitolo ---------- */
  const PALLINI = l => "●".repeat(l) + "○".repeat(3 - l);
  const LIV = ["", "facile", "medio", "impegnativo"];
  function htmlEsercizio(e, nr, stampa) {
    const ILL = window.ILLUSTRAZIONI || {};
    let fig = "";
    if (e.f) fig = e.f.startsWith("<svg") ? `<div class="fig ${e.f.includes('viewBox="0 0 520') ? "larga" : ""}">${e.f}</div>` : (ILL[e.f] ? `<div class="fig icona">${ILL[e.f]}</div>` : "");
    const caselle = `<span class="vf"><span>V</span><span>F</span></span>`;
    const voci = e.v ? `<ol class="voci ${e.vi && !e.vf ? "affiancate" : ""}">${e.v.map((x, i) => `<li><span><b>${"abcdefghijklmn"[i]}.</b> ${x}</span>${e.vf ? caselle : ""}</li>`).join("")}</ol>` : "";
    const opzioni = e.o ? `<ol class="opzioni">${e.o.map((x, i) => `<li><span class="lettera">${"ABCDE"[i]}</span><span>${x}</span></li>`).join("")}</ol>` : "";
    const assoc = e.assoc ? `<div class="associa"><ol>${e.assoc.sx.map(x => `<li>${x}</li>`).join("")}</ol><ol type="a">${e.assoc.dx.map(x => `<li>${x}</li>`).join("")}</ol></div>` : "";
    const svolg = (e.p ? `<ul class="passi">${e.p.map(x => `<li><span class="eq">${x}</span></li>`).join("")}</ul>` : "") + (e.sv ? `<p>${e.sv}</p>` : "");
    const tag = e.tag ? `<span class="tag">${e.tag}</span> ` : "";
    const punti = e.pt ? `<span class="punteggio">…… / ${e.pt}</span>` : "";
    /* nei PDF, come nel libro, il risultato delle espressioni e dei problemi compare tra parentesi quadre */
    const PROBLEMI = /INTORNO A NOI|EDUCAZIONE FINANZIARIA|FISICA|SCIENZE|INFORMATICA/;
    let ris = "";
    if (stampa && !e.vf && !e.o && !e.assoc && typeof e.s === "string" && !/<(table|svg|br)/.test(e.s)) {
      if (e.p || e.r) ris = e.p && e.s.includes(" = ") ? e.s.slice(e.s.lastIndexOf(" = ") + 3) : e.s;
      else if (!e.v && !e.f && e.s.length < 60 && !/SPIEGALO|ESEMPIO|COMPLETA|CACCIA|TEST|ASSOCIA/.test(e.tag || "") &&
               ((e.tag && PROBLEMI.test(e.tag)) || (e.t || "").replace(/<[^>]+>/g, "").length > 110)) ris = e.s;
    }
    const risultato = ris ? `<span class="ris">[${ris}]</span>` : "";
    return `<div class="esercizio"><div class="nr"><span>${nr}</span><b class="punti" title="${LIV[e.l]}">${PALLINI(e.l)}</b></div><div class="corpo">
      ${fig}${(e.t || e.tag) ? `<p class="testo">${tag}${e.t || ""}${risultato}</p>` : risultato}${voci}${opzioni}${assoc}${punti}
      ${stampa ? "" : `<button class="mostra-svolg" aria-expanded="false">Mostra svolgimento e soluzione</button>
      <div class="svolgimento"><div>${svolg}<div class="sol-finale"><b>Soluzione</b>${e.s}</div></div></div>`}
    </div></div>`;
  }
  function htmlBox(b, stampa) {
    return `<div class="box-es box-${b.tipo}"><div class="box-titolo">${b.titolo}</div><div class="box-corpo">${b.html}</div>${b.sol && !stampa ? `<button class="mostra-svolg" aria-expanded="false">Mostra svolgimento e soluzione</button><div class="svolgimento"><div><div class="sol-finale">${b.sol}</div></div></div>` : ""}</div>`;
  }
  function htmlGruppi(gruppi, contatore, idBase, stampa) {
    return gruppi.map((g, j) => {
      const box = g.box ? htmlBox(g.box, stampa) : "";
      const prima = g.box && g.box.tipo !== "agenda";
      return `<div class="gruppo" id="${idBase}-${j}">${g.tit ? `<h3>${g.tit}</h3>` : ""}${prima ? box : ""}${g.istr ? `<p class="istruzione">${g.istr}</p>` : ""}
        ${g.es.map(e => htmlEsercizio(e, contatore(), stampa)).join("")}${prima ? "" : box}</div>`;
    }).join("");
  }
  /* divide i gruppi di un paragrafo in blocchi consecutivi: esercizi normali e "Fai il punto" (anche a metà paragrafo) */
  function segmenti(gruppi) {
    const out = []; let np = 0, nn = 0;
    (gruppi || []).forEach(g => {
      const ult = out[out.length - 1];
      if (g.punto) {
        if (ult && ult.punto === g.punto) ult.gruppi.push(g);
        else out.push({ punto: g.punto, gruppi: [g], n: np++ });
      } else if (ult && !ult.punto) ult.gruppi.push(g);
      else out.push({ gruppi: [g], k: nn++ });
    });
    return out;
  }
  function corpoEsercizi(cap, stampa) {
    let n = 0; const cont = () => ++n;
    const E = cap.esercizi, FIN = cap.finali || [];
    const sezPar = p => segmenti(E[p.id]).map(sg => (sg.id = "punto-" + p.id + (sg.n ? "-" + sg.n : ""), sg)).map(sg => sg.punto
      ? (() => { let k = 0; return `<section class="paragrafo ex punto" id="${sg.id}"><div class="punto-testa"><span>FAI IL PUNTO SULLE COMPETENZE</span><h2>${sg.punto}</h2></div>${htmlGruppi(sg.gruppi, () => ++k, sg.id, stampa)}</section>`; })()
      : `<section class="paragrafo ex${sg.k ? " seguito" : ""}" id="${sg.k ? `e-${p.id}-${sg.k}` : "e-" + p.id}">${sg.k ? "" : `<h2><span class="num">${p.n}</span>${p.titolo}</h2>`}${htmlGruppi(sg.gruppi, cont, (sg.k ? `e-${p.id}-${sg.k}` : "e-" + p.id), stampa)}</section>`).join("");
    const sezFin = f => { let k = 0; return `<section class="paragrafo ex finale ${f.id}" id="fin-${f.id}"><div class="finale-testa"><h2>${f.titolo}</h2>${f.durata ? `<span class="durata">⏱ ${f.durata}</span>` : ""}</div>${htmlGruppi(f.gruppi, () => ++k, "fin-" + f.id, stampa)}${f.id === "verifica" ? '<p class="totale">Il tuo punteggio: …… / 100</p>' : ""}</section>`; };
    return cap.paragrafi.map(sezPar).join("") + FIN.map(sezFin).join("");
  }
  function esercizi(cap) {
    imposta([["Anni", "#anni"], ["1° anno", "#anno-1"], [`Cap. ${cap.numero} · Esercizi`, "#" + cap.id + "-esercizi"]]);
    const E = cap.esercizi, FIN = cap.finali || [];
    app.innerHTML = `<div class="capitolo">
      <aside class="indice-laterale"><h4>Esercizi · Cap. ${cap.numero}</h4><ol>${cap.paragrafi.map(p => `<li><a href="#${cap.id}-esercizi" data-vai="e-${p.id}"><b>${p.n}</b>${p.titolo}</a>${segmenti(E[p.id]).some(g => g.punto) ? `<ol>${segmenti(E[p.id]).filter(g => g.punto).map((g, i, t) => `<li><a href="#${cap.id}-esercizi" data-vai="punto-${p.id}${g.n ? "-" + g.n : ""}">${t.length > 1 ? "Fai il punto · " + g.punto : "Fai il punto sulle competenze"}</a></li>`).join("")}</ol>` : ""}</li>`).join("")}
        ${FIN.map(f => `<li><a href="#${cap.id}-esercizi" data-vai="fin-${f.id}"><b>✦</b>${f.titolo}</a></li>`).join("")}</ol>
        <div class="azioni"><a class="bottone b-teoria" href="#${cap.id}">‹ Torna alla teoria</a></div></aside>
      <article>${testata(cap, true)}
        <div class="barra-esercizi"><span class="legenda">Difficoltà: ●○○ facile · ●●○ media · ●●● impegnativa</span></div>
        ${corpoEsercizi(cap, false)}
      </article></div>`;
    app.querySelectorAll(".mostra-svolg").forEach(b => b.addEventListener("click", () => {
      const s = b.nextElementSibling, on = !s.classList.contains("vis");
      s.classList.toggle("vis", on); b.setAttribute("aria-expanded", on); b.textContent = on ? "Nascondi svolgimento e soluzione" : "Mostra svolgimento e soluzione";
    }));
    collegaIndice(app, ".paragrafo");
  }

  /* ---------- versione per la stampa (usata per creare i PDF) ---------- */
  window.preparaStampa = function (tipo) {
    barra.classList.add("nascosta");
    document.body.classList.add("pagina-stampa");
    const capitoli = tipo === "anno1" ? Object.values(L.capitoli).filter(c => c.anno === 1) : [L.capitoli[tipo]];
    let h = "";
    if (tipo === "anno1") {
      h += `<section class="copertina-pdf"><div style="font-size:60pt;font-family:var(--titoli)">∑</div><h1>Matematica</h1><p>Primo anno · Teoria</p></section>`;
      h += `<section class="indice-pdf contenitore"><h1>Indice</h1><ol>${capitoli.map(c => `<li><b>${c.titolo}</b><ol>${c.storia ? "<li class=\"extra\">Storia della matematica</li>" : ""}${c.paragrafi.map(p => `<li>${p.titolo}</li>`).join("")}${c.sintesi ? "<li class=\"extra\">Teoria in sintesi</li>" : ""}</ol></li>`).join("")}</ol></section>`;
    }
    h += capitoli.map(c => `<div class="capitolo">${testata(c, false)}${corpoTeoria(c)}</div>`
      + (c.esercizi ? `<div class="capitolo esercizi-stampa">${testata(c, true)}${corpoEsercizi(c, true)}</div>` : "")).join("");
    app.innerHTML = h;
    attivaRiquadri(app, true); attivaAnimazioni(app, true);
    app.querySelectorAll(".anim").forEach(a => a.classList.add("affianca"));
    /* titoli e istruzioni dei gruppi non restano soli in fondo alla pagina: li teniamo insieme al primo esercizio */
    /* il titolo di una sezione (Fai il punto, Fondamentali, Teoria in sintesi…) va insieme a ciò che segue */
    app.querySelectorAll("section.paragrafo").forEach(sez => {
      const t = sez.querySelector(":scope > .punto-testa, :scope > .finale-testa, :scope > h2");
      const dopo = t && t.nextElementSibling;
      if (dopo && (dopo.matches(".gruppo") || dopo.matches(".sint-griglia"))) dopo.insertBefore(t, dopo.firstChild);
    });
    app.querySelectorAll(".esercizi-stampa").forEach(c => {
      const h = c.querySelector(":scope > .testata-capitolo"), g = c.querySelector(".gruppo");
      if (h && g) g.insertBefore(h, g.firstChild);
    });
    app.querySelectorAll(".sint-griglia").forEach(g => {
      const t = g.firstElementChild, b = t && t.nextElementSibling;
      if (t && t.matches("h2") && b) { const w = document.createElement("div"); w.className = "tieni-insieme"; g.insertBefore(w, t); w.appendChild(t); w.appendChild(b); }
    });
    app.querySelectorAll(".gruppo").forEach(g => {
      const testa = []; let x = g.firstElementChild;
      while (x && x.matches("h2, h3, .istruzione, .punto-testa, .finale-testa, .testata-capitolo")) { testa.push(x); x = x.nextElementSibling; }
      if (!testa.length || !x || !x.matches(".esercizio, .box-es")) return;
      const w = document.createElement("div"); w.className = "tieni-insieme"; g.insertBefore(w, testa[0]);
      const tit = document.createElement("div"); tit.className = "titoli"; w.appendChild(tit);
      testa.forEach(e => tit.appendChild(e)); w.appendChild(x);
    });
  };
  /* Nei PDF gli elementi lunghi (più di un quarto di pagina) possono dividersi fra due pagine,
     così non restano grandi spazi bianchi; quelli corti restano interi. */
  window.spezzaLunghi = function (soglia) {
    soglia = soglia || 150; let n = 0;
    app.querySelectorAll(".tieni-insieme").forEach(w => { if (w.getBoundingClientRect().height > soglia * 0.6) w.classList.add("spezzabile"); });
    app.querySelectorAll(".esercizio").forEach(e => {
      if (e.getBoundingClientRect().height > soglia) { e.classList.add("spezzabile"); n++; }
    });
    return n;
  };
  /* Nei PDF i riquadri non si spezzano mai. Se un riquadro (o un blocco che non si può dividere) non entra
     nello spazio rimasto in fondo alla pagina, viene rimpicciolito quanto basta (fino al 68%, le figure e la sintesi fino al 60%); una figura affiancata al testo può invece scendere dopo il paragrafo che la segue,
     invece di lasciare un buco bianco. */
  const BLOCCHI = ".riquadro, .anim, .sint-blocco, .esempio, .definizione, .regola, .attenzione, .approfondimento, .box-es:not(:has(.lista-controllo)), table.tab-segni, table.tab, .fig-testo, .tieni-insieme, .esercizio:not(.spezzabile)";
  window.bloccoInizio = function (righe) {
    const norm = x => x.replace(/\s+/g, "").replace(/[^\p{L}\p{N}]/gu, "").toLowerCase();
    const r = norm(righe.join(" "));
    const lista = [...app.querySelectorAll(BLOCCHI)];
    let k = -1;
    lista.forEach((e, i) => { if (k < 0) { const t = norm(e.innerText).slice(0, 30); if (t.length > 6 && r.startsWith(t.slice(0, Math.min(30, r.length)))) k = i; } });
    return k < 0 ? null : [k, Math.round(lista[k].getBoundingClientRect().height), lista[k].matches(".fig-testo, .anim, .sint-blocco, .box-es") || lista[k].querySelector(".sint-blocco, .box-es") ? 0.6 : 0.68, lista[k].matches(".fig-testo")];
  };
  window.applicaZoom = function (lista, figure) {
    const el = [...app.querySelectorAll(BLOCCHI)];
    /* una figura che non entra in fondo alla pagina scende dopo il paragrafo che la segue (resta affiancata al testo) */
    (figure || []).map(k => el[k]).forEach(f => {
      if (!f) return; let x = f.nextElementSibling;
      while (x && !x.matches("p")) { if (x.matches("h2, h3, .riquadro, .anim, .definizione, .regola")) return; x = x.nextElementSibling; }
      if (x) x.after(f);
    });
    lista.forEach(([k, f]) => { const e = el[k]; if (e && !e.closest("[style*=zoom]") && !e.querySelector("[style*=zoom]")) e.style.zoom = f; });
    return lista.length;
  };
  /* Dopo l'impaginazione: un'immagine resta a fianco del testo solo se il testo la "riempie";
     se resterebbe da sola a destra, viene centrata. */
  window.sistemaImmagini = function () {
    const flottanti = [...app.querySelectorAll(".anim.affianca, .fig-testo, .illustrazione, .esercizio .fig:not(.larga)")];
    const ferma = x => x.matches(".riquadro, .approfondimento, .definizione, .regola, .attenzione, .esempio, table, h2, h3, .formula, .anim, figure, .fig-testo, .gruppo, .mostra-svolg, .opzioni, .associa");
    let cambiati = 0;
    flottanti.forEach(f => {
      if (f.classList.contains("centra")) return;
      const rf = f.getBoundingClientRect();
      let fondo = rf.top, x = f.nextElementSibling;
      while (x && !ferma(x)) { fondo = Math.max(fondo, x.getBoundingClientRect().bottom); if (x.getBoundingClientRect().top > rf.bottom) break; x = x.nextElementSibling; }
      if (rf.bottom - fondo > 28) { f.classList.remove("affianca"); f.classList.add("centra"); cambiati++; }
    });
    return cambiati;
  };

  /* ---------- router ---------- */
  function vai() {
    if (document.body.classList.contains("pagina-stampa")) return;
    const h = location.hash.slice(1) || "home";
    document.body.classList.remove("insegnante");
    window.scrollTo(0, 0);
    if (h === "home") return copertina();
    if (h === "anni") return anni();
    if (h === "anno-1") return annoUno();
    const m = h.match(/^(cap\d+)(-esercizi)?$/);
    if (m && L.capitoli[m[1]]) return m[2] ? esercizi(L.capitoli[m[1]]) : teoria(L.capitoli[m[1]]);
    copertina();
  }
  window.addEventListener("hashchange", vai);
  vai();
})();
