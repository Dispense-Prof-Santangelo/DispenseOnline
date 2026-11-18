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
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-pdf]"); if (!b) return;
    e.preventDefault(); scarica(b.dataset.pdf, b.dataset.nome);
  });

  /* ---------- briciole di pane ---------- */
  function imposta(voci) {
    barra.classList.remove("nascosta");
    voci = [["Libri", "#home"]].concat(voci);
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
        <p>Scegli il libro</p>
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
      }).join("")}</div>`).join("")}</div>`;
  }

  /* ---------- PAGINA 4: teoria del capitolo ---------- */
  function teoria(cap) {
    imposta([["Anni", "#anni"], ["1° anno", "#anno-1"], [`Cap. ${cap.numero} · Teoria`, "#" + cap.id]]);
    app.innerHTML = `<div class="capitolo">
      <aside class="indice-laterale"><h4>Capitolo ${cap.numero}</h4><ol>${cap.paragrafi.map(p => `<li><a href="#${cap.id}" data-vai="${p.id}"><b>${p.n}</b>${p.titolo}</a></li>`).join("")}</ol>
        <div class="azioni"><a class="bottone b-esercizi" href="#${cap.id}-esercizi">Vai agli esercizi ›</a>
        <button class="bottone b-pdf" data-pdf="${cap.pdf}" data-nome="Capitolo ${cap.numero} - ${cap.titolo}.pdf">${ICONA_PDF} Scarica il capitolo (PDF)</button></div></aside>
      <article>${testata(cap, false)}${cap.paragrafi.map(p => `<section class="paragrafo" id="${p.id}"><h2><span class="num">${p.n}</span>${p.titolo}</h2>${p.html}</section>`).join("")}</article></div>`;
    attivaRiquadri(app); attivaAnimazioni(app); collegaIndice(app);
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
    return `<div class="esercizio"><div class="nr"><span>${nr}</span><b class="punti" title="${LIV[e.l]}">${PALLINI(e.l)}</b></div><div class="corpo">
      ${fig}${(e.t || e.tag) ? `<p class="testo">${tag}${e.t || ""}</p>` : ""}${voci}${opzioni}${assoc}${punti}
      ${stampa ? "" : `<button class="mostra-svolg" aria-expanded="false">Mostra svolgimento e soluzione</button>
      <div class="svolgimento"><div>${svolg}<div class="sol-finale"><b>Soluzione:</b> ${e.s}</div></div></div>`}
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
  function corpoEsercizi(cap, stampa) {
    let n = 0; const cont = () => ++n;
    const E = cap.esercizi, FIN = cap.finali || [];
    const sezPar = p => {
      const normali = (E[p.id] || []).filter(g => !g.punto), punto = (E[p.id] || []).filter(g => g.punto);
      let html = `<section class="paragrafo ex" id="e-${p.id}"><h2><span class="num">${p.n}</span>${p.titolo}</h2>${htmlGruppi(normali, cont, "e-" + p.id, stampa)}</section>`;
      if (punto.length) { let k = 0; html += `<section class="paragrafo ex punto" id="punto-${p.id}"><div class="punto-testa"><span>FAI IL PUNTO SULLE COMPETENZE</span><h2>${punto[0].punto}</h2></div>${htmlGruppi(punto, () => ++k, "punto-" + p.id, stampa)}</section>`; }
      return html;
    };
    const sezFin = f => { let k = 0; return `<section class="paragrafo ex finale ${f.id}" id="fin-${f.id}"><div class="finale-testa"><h2>${f.titolo}</h2>${f.durata ? `<span class="durata">⏱ ${f.durata}</span>` : ""}</div>${htmlGruppi(f.gruppi, () => ++k, "fin-" + f.id, stampa)}${f.id === "verifica" ? '<p class="totale">Il tuo punteggio: …… / 100</p>' : ""}</section>`; };
    return cap.paragrafi.map(sezPar).join("") + FIN.map(sezFin).join("");
  }
  function esercizi(cap) {
    imposta([["Anni", "#anni"], ["1° anno", "#anno-1"], [`Cap. ${cap.numero} · Esercizi`, "#" + cap.id + "-esercizi"]]);
    const E = cap.esercizi, FIN = cap.finali || [];
    app.innerHTML = `<div class="capitolo">
      <aside class="indice-laterale"><h4>Esercizi · Cap. ${cap.numero}</h4><ol>${cap.paragrafi.map(p => `<li><a href="#${cap.id}-esercizi" data-vai="e-${p.id}"><b>${p.n}</b>${p.titolo}</a>${(E[p.id] || []).some(g => g.punto) ? `<ol><li><a href="#${cap.id}-esercizi" data-vai="punto-${p.id}">Fai il punto sulle competenze</a></li></ol>` : ""}</li>`).join("")}
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
      h += `<section class="indice-pdf contenitore"><h1>Indice</h1><ol>${capitoli.map(c => `<li><b>${c.titolo}</b><ol>${c.paragrafi.map(p => `<li>${p.titolo}</li>`).join("")}</ol></li>`).join("")}</ol></section>`;
    }
    h += capitoli.map(c => `<div class="capitolo">${testata(c, false)}${c.paragrafi.map(p => `<section class="paragrafo" id="${p.id}"><h2><span class="num">${p.n}</span>${p.titolo}</h2>${p.html}</section>`).join("")}</div>`
      + (c.esercizi ? `<div class="capitolo esercizi-stampa">${testata(c, true)}${corpoEsercizi(c, true)}</div>` : "")).join("");
    app.innerHTML = h;
    attivaRiquadri(app, true); attivaAnimazioni(app, true);
    app.querySelectorAll(".anim").forEach(a => a.classList.add("affianca"));
  };
  /* Dopo l'impaginazione: un'immagine resta a fianco del testo solo se il testo la "riempie";
     se resterebbe da sola a destra, viene centrata. */
  window.sistemaImmagini = function () {
    const flottanti = [...app.querySelectorAll(".anim.affianca, .fig-testo, .illustrazione, .esercizio .fig:not(.larga)")];
    const ferma = x => x.matches(".riquadro, .definizione, .regola, .attenzione, .esempio, table, h2, h3, .formula, .anim, figure, .fig-testo, .gruppo, .mostra-svolg, .opzioni, .associa");
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
