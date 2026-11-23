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
    voci = [["Inizio", "#home"]].concat(voci);
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

  /* =====================================================================
     DUE INGRESSI: DOCENTI e STUDENTI (stesse dispense, elenchi diversi)
     Dati in catalogo.js (window.SCUOLA), sfondi in temi.js (window.TEMI).
     ===================================================================== */
  const S = window.SCUOLA, TEMI = window.TEMI;
  let contesto = null; // briciole di pane da mostrare sopra teoria ed esercizi
  const nomeAnno = n => ["", "Primo", "Secondo", "Terzo", "Quarto", "Quinto"][n] + " anno";
  const disciplina = id => S.discipline.find(d => d.id === id);
  const indirizzo = id => S.indirizzi.find(i => i.id === id);
  /* un "percorso" è un indirizzo oppure un'articolazione (es. logistica) */
  function percorso(id) {
    const i = indirizzo(id); if (i) return { id, nome: i.nome, breve: i.breve, tema: i.tema, anni: i.anni, ind: i };
    for (const x of S.indirizzi) for (const a of ((x.articolazioni || {}).scelte || []))
      if (a.id === id) return { id, nome: x.nome + " – " + a.nome, breve: a.nome, tema: a.tema, anni: x.anni, da: x.articolazioni.da, padre: x };
    return null;
  }
  function piano(disc, perc, anno) {
    const P = S.piani[disc] || {}; let p = P[`${perc}-${anno}`], giri = 0;
    while (p && p.usa && giri++ < 10) p = P[p.usa];
    return p || null;
  }
  const revisionata = id => S.stato[id] === "revisionata";
  const pronto = id => typeof id === "string" && L.capitoli[id];
  function capitoliVisibili(p, studenti) {
    return p.parti.map(pt => ({ titolo: pt.titolo, capitoli: pt.capitoli.map((c, k) => ({ c, k }))
      .filter(x => !studenti || (pronto(x.c) && revisionata(x.c))) })).filter(pt => pt.capitoli.length);
  }
  function contaRevisionati(p) { return p ? p.parti.reduce((s, pt) => s + pt.capitoli.filter(c => pronto(c) && revisionata(c)).length, 0) : 0; }

  /* pulsante grande con segni fluttuanti a tema */
  function bottoneTema(href, titolo, sotto, tema, simbolo) {
    return `<a class="bottone-tema" href="${href}" style="--tc:${TEMI.colore(tema)}">${TEMI.sfondo(tema, 14, false, true)}
      ${simbolo ? `<span class="simbolo">${simbolo}</span>` : ""}<span class="scritta">${titolo}</span><small>${sotto}</small></a>`;
  }
  function pagina(tema, contenuto) {
    app.innerHTML = `<section class="pagina-tema" style="--tc:${TEMI.colore(tema)}">${TEMI.sfondo(tema, 120, true)}<div class="pagina-tema-dentro">${contenuto}</div></section>`;
    if (window.SCENE) window.SCENE.avvia(app);
  }
  function carteAnni(n, href, attivo, extra) {
    return `<div class="griglia-anni">${Array.from({ length: n }, (_, i) => i + 1).map((a, i) => {
      const ok = attivo(a), y = L.anni[a - 1] || L.anni[0];
      return `<a class="carta-anno ${ok ? "" : "disattiva"}" ${ok ? `href="${href(a)}"` : 'aria-disabled="true"'} style="--c:${y.colore};animation-delay:${i * 0.08}s">
        <div class="num">${a}<sup>°</sup></div><div class="etichetta">${nomeAnno(a)}</div><div class="stato">${ok ? (extra ? extra(a) : "Apri ›") : "In preparazione"}</div></a>`;
    }).join("")}</div>`;
  }

  /* ---------- copertina: chi sei? ---------- */
  function copertina() {
    barra.classList.add("nascosta"); contesto = null;
    app.innerHTML = `<section class="copertina">${TEMI.sfondo("neutro", 130)}
      <div class="copertina-centro">
        <h1 class="titolo-copertina">Dispense online</h1>
        <p>Scegli il tuo ingresso</p>
        <div class="ingressi">
          ${bottoneTema("#docenti", "Docenti", "Scegli la disciplina ›", "matematica", TEMI.icona("lavagna"))}
          ${bottoneTema("#studenti", "Studenti", "Scegli indirizzo e anno ›", "linguistico", TEMI.icona("tocco"))}
        </div>
      </div></section>`;
    if (window.SCENE) window.SCENE.avvia(app);
  }

  /* ---------- DOCENTI ---------- */
  function docenti() {
    imposta([["Docenti", "#docenti"]]); contesto = null;
    pagina("neutro", `<h1>Area docenti</h1><p class="sottotitolo">Scegli la disciplina: trovi tutte le dispense, ordinate per indirizzo e anno, comprese quelle ancora in revisione.</p>
      <div class="griglia-ingressi">${S.discipline.map(d => bottoneTema(`#docenti/${d.id}`, d.nome, "Entra ›", d.tema, d.simbolo)).join("")}</div>`);
  }
  function docentiDisciplina(d) {
    imposta([["Docenti", "#docenti"], [d.nome, `#docenti/${d.id}`]]); contesto = null;
    pagina(d.tema, `<h1>${d.nome}</h1><p class="sottotitolo">Dispense per indirizzo e anno. Gli studenti vedono solo i capitoli revisionati.</p>
      ${d.gruppi.map(g => {
        const p0 = percorso(g.percorsi[0]), anni = g.anni || Array.from({ length: p0.anni }, (_, i) => i + 1);
        return `<h2 class="gruppo">${g.nome}</h2><div class="griglia-anni">${anni.map((a, i) => {
          const p = piano(d.id, g.percorsi[0], a), y = L.anni[a - 1];
          const tot = p ? p.parti.reduce((s, pt) => s + pt.capitoli.filter(pronto).length, 0) : 0;
          return `<a class="carta-anno ${p ? "" : "disattiva"}" ${p ? `href="#docenti/${d.id}/${g.percorsi[0]}-${a}"` : 'aria-disabled="true"'} data-simbolo="${y.simbolo}" style="--c:${y.colore};animation-delay:${i * 0.08}s">
            <div class="num">${a}<sup>°</sup></div><div class="etichetta">${nomeAnno(a)}</div>
            <div class="stato">${p ? `${tot} capitoli pronti · ${contaRevisionati(p)} revisionati` : "In preparazione"}</div></a>`;
        }).join("")}</div>`;
      }).join("")}`);
  }
  function docentiIndice(d, perc, anno) {
    const p = piano(d.id, perc, anno), pc = percorso(perc);
    const g = d.gruppi.find(x => x.percorsi.includes(perc));
    const voci = [["Docenti", "#docenti"], [d.nome, `#docenti/${d.id}`], [`${(g && g.nome) || pc.nome} · ${anno}° anno`, `#docenti/${d.id}/${perc}-${anno}`]];
    imposta(voci); contesto = voci;
    if (!p) return pagina(d.tema, `<h1>${d.nome}</h1><p class="sottotitolo">Dispense in preparazione.</p>`);
    indiceCapitoli(d, p, `${nomeAnno(anno)} · ${(g && g.nome) || pc.nome}`, false);
  }

  /* ---------- STUDENTI ---------- */
  function studenti() {
    imposta([["Studenti", "#studenti"]]); contesto = null;
    pagina("neutro", `<h1>Area studenti</h1><p class="sottotitolo">Scegli il tuo indirizzo.</p>
      <div class="griglia-ingressi">${S.indirizzi.map(i => bottoneTema(`#studenti/${i.id}`, i.breve, "Entra ›", i.tema)).join("")}</div>`);
  }
  function studentiIndirizzo(pc) {
    imposta([["Studenti", "#studenti"], [pc.breve, `#studenti/${pc.id}`]]); contesto = null;
    pagina(pc.tema, `<h1>${pc.nome}</h1><p class="sottotitolo">Scegli il tuo anno.</p>
      ${carteAnni(pc.anni, a => `#studenti/${pc.id}/${a}`, () => true)}`);
  }
  function studentiArticolazione(pc, anno) {
    const art = pc.ind.articolazioni;
    imposta([["Studenti", "#studenti"], [pc.breve, `#studenti/${pc.id}`], [`${anno}° anno`, `#studenti/${pc.id}/${anno}`]]); contesto = null;
    pagina(pc.tema, `<h1>${pc.nome} · ${anno}° anno</h1><p class="sottotitolo">Scegli la tua articolazione.</p>
      <div class="griglia-ingressi">${art.scelte.map(a => bottoneTema(`#studenti/${a.id}/${anno}`, a.nome, "Entra ›", a.tema)).join("")}</div>`);
  }
  function studentiAnno(pc, anno) {
    const voci = [["Studenti", "#studenti"]];
    if (pc.padre) voci.push([pc.padre.breve, `#studenti/${pc.padre.id}`], [`${anno}° anno`, `#studenti/${pc.padre.id}/${anno}`], [pc.breve, `#studenti/${pc.id}/${anno}`]);
    else voci.push([pc.breve, `#studenti/${pc.id}`], [`${anno}° anno`, `#studenti/${pc.id}/${anno}`]);
    imposta(voci); contesto = null;
    const lista = S.discipline.map(d => ({ d, p: piano(d.id, pc.id, anno) })).filter(x => x.p);
    pagina(pc.tema, `<h1>${pc.nome}</h1><p class="sottotitolo">${nomeAnno(anno)} · scegli la disciplina.</p>
      ${lista.length ? `<div class="griglia-ingressi">${lista.map(({ d, p }) => {
        const n = contaRevisionati(p);
        return n ? bottoneTema(`#studenti/${pc.id}/${anno}/${d.id}`, d.nome, `${n} ${n === 1 ? "capitolo" : "capitoli"} ›`, d.tema, d.simbolo)
          : `<div class="bottone-tema spento" style="--tc:#8a8273"><span class="simbolo">${d.simbolo}</span><span class="scritta">${d.nome}</span><small>In preparazione</small></div>`;
      }).join("")}</div>` : `<p class="vuoto-msg">Le dispense di questo anno sono in preparazione.</p>`}`);
  }
  function studentiIndice(pc, anno, d) {
    const p = piano(d.id, pc.id, anno);
    const voci = [["Studenti", "#studenti"], [pc.breve, `#studenti/${pc.id}`], [`${anno}° anno`, `#studenti/${pc.id}/${anno}`], [d.nome, `#studenti/${pc.id}/${anno}/${d.id}`]];
    imposta(voci); contesto = voci;
    if (!p || !contaRevisionati(p)) return pagina(pc.tema, `<h1>${d.nome}</h1><p class="vuoto-msg">Le dispense di ${d.nome} per questo anno sono in preparazione.</p>`);
    indiceCapitoli(d, p, `${nomeAnno(anno)} · ${pc.nome}`, true, pc.tema);
  }

  /* ---------- indice dei capitoli (docenti: tutti; studenti: solo revisionati) ---------- */
  function indiceCapitoli(d, p, sotto, studenti, tema) {
    let k = 0;
    const parti = capitoliVisibili(p, studenti);
    pagina(tema || d.tema, `<div class="contenitore indice-tema">
      <div class="intestazione-anno"><div><h1>${d.nome}</h1><p>${sotto}</p></div>
        ${!studenti && p.pdf ? `<button class="bottone b-pdf" data-pdf="${p.pdf}" data-nome="${p.pdfNome || "Libro dell'anno.pdf"}">${ICONA_PDF} Scarica il libro dell'anno (PDF)</button>` : ""}</div>
      ${parti.map(pt => `<h2 class="parte">${pt.titolo}</h2><div class="lista-capitoli">${pt.capitoli.map(({ c, k: pos }) => {
        const st = `animation-delay:${(k++) * 0.05}s`, cap = pronto(c);
        const n = cap ? cap.numero : pos + 1;
        if (!cap) return `<div class="capitolo-riga prossimamente" style="${st}"><div class="n">${n}</div><div><h3>${c.titolo}</h3></div><span class="etichetta-presto">in preparazione</span></div>`;
        const badge = studenti ? "" : (revisionata(c) ? `<span class="stato-cap ok">revisionato</span>` : `<span class="stato-cap rev">in revisione</span>`);
        const par = (L.anno1.parti.flatMap(x => x.capitoli).find(x => x.id === c) || {}).paragrafi || cap.paragrafi.map(x => x.titolo).join(" · ");
        return `<div class="capitolo-riga" style="${st}"><div class="n">${n}</div><div><h3>${cap.titolo} ${badge}</h3><p class="paragrafi">${par}</p></div>
          <div class="azioni"><a class="bottone b-teoria" href="#${c}">Teoria</a><a class="bottone b-esercizi" href="#${c}-esercizi">Esercizi</a></div></div>`;
      }).join("")}</div>`).join("")}
    </div>`);
  }
  /* briciole sopra teoria ed esercizi: dal percorso da cui si è arrivati, altrimenti area docenti */
  function briciolePrima(cap) {
    if (contesto) return contesto;
    return [["Docenti", "#docenti"], ["Matematica", "#docenti/matematica"], ["Scientifico · 1° anno", "#docenti/matematica/scientifico-1"]];
  }
  /* ---------- PAGINA 4: teoria del capitolo ---------- */
  function teoria(cap) {
    imposta(briciolePrima(cap).concat([[`Cap. ${cap.numero} · Teoria`, "#" + cap.id]]));
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
      + (cap.sintesi ? `<section class="paragrafo sintesi" id="sintesi"><h2><span class="num">✦</span>Teoria in sintesi</h2><div class="sint-griglia">${cap.sintesi}</div></section>` : "");
  }
  function testata(cap, es, stampa) {
    const sotto = !es ? cap.sottotitolo : stampa ? "Prova da solo. Dove serve, il risultato è tra parentesi quadre; gli svolgimenti completi sono nel sito."
      : "Prova da solo. Sotto ogni esercizio puoi aprire lo svolgimento con la soluzione.";
    return `<header class="testata-capitolo ${es ? "esercizi" : ""}"><span class="grande">${cap.numero}</span><div class="cap">Capitolo ${cap.numero} · ${es ? "Esercizi" : "Teoria"}</div>
      <h1>${cap.titolo}</h1><p>${sotto}</p></header>`;
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
    /* nei PDF il risultato delle espressioni e dei problemi compare tra parentesi quadre */
    const PROBLEMI = /MATEMATICA NELLA REALTÀ|EDUCAZIONE FINANZIARIA|FISICA|SCIENZE|INFORMATICA/;
    let ris = "";
    if (stampa && !e.vf && !e.o && !e.assoc && typeof e.s === "string" && !/<(table|svg|br)/.test(e.s)) {
      if (e.p || e.r) ris = e.p && e.s.includes(" = ") ? e.s.slice(e.s.lastIndexOf(" = ") + 3) : e.s;
      else if (!e.v && !e.f && e.s.length < 60 && !/SPIEGA CON|ESEMPIO|COMPLETA|TROVA L|TEST|ASSOCIA/.test(e.tag || "") &&
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
  /* divide i gruppi di un paragrafo in blocchi consecutivi: esercizi normali e "Controlla cosa sai" (anche a metà paragrafo) */
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
      ? (() => { let k = 0; return `<section class="paragrafo ex punto" id="${sg.id}"><div class="punto-testa"><span>CONTROLLA COSA SAI</span><h2>${sg.punto}</h2></div>${htmlGruppi(sg.gruppi, () => ++k, sg.id, stampa)}</section>`; })()
      : `<section class="paragrafo ex${sg.k ? " seguito" : ""}" id="${sg.k ? `e-${p.id}-${sg.k}` : "e-" + p.id}">${sg.k ? "" : `<h2><span class="num">${p.n}</span>${p.titolo}</h2>`}${htmlGruppi(sg.gruppi, cont, (sg.k ? `e-${p.id}-${sg.k}` : "e-" + p.id), stampa)}</section>`).join("");
    const sezFin = f => { let k = 0; return `<section class="paragrafo ex finale ${f.id}" id="fin-${f.id}"><div class="finale-testa"><h2>${f.titolo}</h2>${f.durata ? `<span class="durata">⏱ ${f.durata}</span>` : ""}</div>${htmlGruppi(f.gruppi, () => ++k, "fin-" + f.id, stampa)}${f.id === "verifica" ? '<p class="totale">Il tuo punteggio: …… / 100</p>' : ""}</section>`; };
    return cap.paragrafi.map(sezPar).join("") + FIN.map(sezFin).join("");
  }
  function esercizi(cap) {
    imposta(briciolePrima(cap).concat([[`Cap. ${cap.numero} · Esercizi`, "#" + cap.id + "-esercizi"]]));
    const E = cap.esercizi, FIN = cap.finali || [];
    app.innerHTML = `<div class="capitolo">
      <aside class="indice-laterale"><h4>Esercizi · Cap. ${cap.numero}</h4><ol>${cap.paragrafi.map(p => `<li><a href="#${cap.id}-esercizi" data-vai="e-${p.id}"><b>${p.n}</b>${p.titolo}</a>${segmenti(E[p.id]).some(g => g.punto) ? `<ol>${segmenti(E[p.id]).filter(g => g.punto).map((g, i, t) => `<li><a href="#${cap.id}-esercizi" data-vai="punto-${p.id}${g.n ? "-" + g.n : ""}">${t.length > 1 ? "Controlla cosa sai · " + g.punto : "Controlla cosa sai"}</a></li>`).join("")}</ol>` : ""}</li>`).join("")}
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


  /* ---------- NOTE SULLE DISPENSE, LICENZA E CREDITI DELLE IMMAGINI ---------- */
  function noteDati() { return (window.SCUOLA && SCUOLA.note) || {}; }
  function htmlCrediti(chiavi) {
    const F = window.CREDITI_FOTO || {};
    const k = (chiavi || Object.keys(F)).filter(x => F[x]);
    if (!k.length) return "";
    return `<ul class="crediti-lista">${k.map(x => { const f = F[x];
      return `<li><b>${f[0]}</b>, ${f[1]}, ${f[2]}, <a href="${f[3]}" target="_blank" rel="noopener">Wikimedia Commons</a></li>`; }).join("")}</ul>`;
  }
  function htmlNote(stampa, chiaviFoto) {
    const N = noteDati();
    const chi = N.autori ? `Le dispense sono scritte e revisionate da ${N.autori}${N.scuola ? ", " + N.scuola : ""}.`
      : `Le dispense sono scritte e revisionate dai docenti della scuola${N.scuola ? ", " + N.scuola : ""}.`;
    const lic = `<a href="${N.licenzaLink}" target="_blank" rel="noopener">Creative Commons Attribuzione – Condividi allo stesso modo 4.0 Internazionale (${N.licenza})</a>`;
    const segn = N.segnalazioni
      ? (stampa ? `Per segnalare un errore si usa il modulo anonimo indicato nel sito (${N.segnalazioni}).`
                : `<a class="bottone b-segnala" href="${N.segnalazioni}" target="_blank" rel="noopener">Segnala un errore</a> Il modulo è anonimo: indica il capitolo, il numero dell'esercizio o il paragrafo e che cosa non va.`)
      : "Se trovi un errore (un risultato sbagliato, una frase poco chiara, un refuso) avvisa il tuo docente, indicando il capitolo, il numero dell'esercizio o il paragrafo e che cosa non va. Ogni segnalazione viene controllata e corretta.";
    return `<section class="note-dispense${stampa ? " note-pdf" : ""}" id="note-dispense">
      <h2>Note sulle dispense</h2>
      <p>${chi} Il riferimento per gli argomenti sono le Indicazioni nazionali per i licei. Testi, esempi, esercizi e figure sono originali.</p>
      <p><b>Licenza.</b> Il materiale è distribuito con licenza ${lic}. Si può copiare, stampare, modificare e condividere liberamente, anche in classe, citando la fonte e distribuendo le eventuali modifiche con la stessa licenza.</p>
      <p><b>Ultimo aggiornamento.</b> ${N.aggiornamento || ""}</p>
      <p id="segnala"><b>Come segnalare un errore.</b> ${segn}</p>
      ${(window.CREDITI_FOTO && (!chiaviFoto || chiaviFoto.length)) ? `<h3 id="crediti">Crediti delle immagini</h3><p class="crediti-intro">Le foto sono solo illustrative e hanno licenze libere (pubblico dominio, CC0, CC BY, CC BY-SA).</p>${htmlCrediti(chiaviFoto)}` : ""}
    </section>`;
  }
  function paginaNote() {
    contesto = null;
    imposta([["Note sulle dispense", "#note"]]);
    app.innerHTML = `<div class="pagina-note contenitore">${htmlNote(false)}</div>`;
  }
  /* piè di pagina del sito: licenza, note, crediti, segnalazioni */
  (function () {
    const p = document.createElement("footer");
    p.className = "piede";
    p.innerHTML = `<a href="#note">Note sulle dispense</a> · <a href="#note" data-vai-a="crediti">Crediti delle immagini</a> · <a href="#note" data-vai-a="segnala">Segnala un errore</a> · <a href="${(noteDati().licenzaLink) || "#note"}" target="_blank" rel="noopener license">Licenza ${noteDati().licenza || ""}</a>`;
    document.body.appendChild(p);
    p.addEventListener("click", e => {
      const a = e.target.closest("[data-vai-a]");
      if (!a) return;
      e.preventDefault();
      if (location.hash !== "#note") location.hash = "#note";
      setTimeout(() => { const t = document.getElementById(a.dataset.vaiA); if (t) t.scrollIntoView({ behavior: "smooth" }); }, 60);
    });
  })();

  /* ---------- versione per la stampa (usata per creare i PDF) ---------- */
  window.preparaStampa = function (tipo) {
    barra.classList.add("nascosta");
    document.body.classList.add("pagina-stampa");
    const capitoli = tipo === "anno1" ? Object.values(L.capitoli).filter(c => c.anno === 1) : [L.capitoli[tipo]];
    let h = "";
    if (tipo === "anno1") {
      h += `<section class="copertina-pdf"><div style="font-size:60pt;font-family:var(--titoli)">∑</div><h1>Matematica</h1><p>Primo anno · Teoria ed esercizi</p></section>`;
      h += `<section class="indice-pdf contenitore"><h1>Indice</h1><ol>${capitoli.map(c => `<li><b>${c.titolo}</b><ol>${c.storia ? "<li class=\"extra\">Storia della matematica</li>" : ""}${c.paragrafi.map(p => `<li>${p.titolo}</li>`).join("")}${c.sintesi ? "<li class=\"extra\">Teoria in sintesi</li>" : ""}</ol></li>`).join("")}</ol></section>`;
    }
    h += capitoli.map((c, i) => `<div class="capitolo">${testata(c, false)}${corpoTeoria(c)}</div>`
      + (c.esercizi ? `<div class="capitolo esercizi-stampa">${testata(c, true, true)}${corpoEsercizi(c, true)}</div>` : "")
      /* righe per gli appunti in fondo al capitolo, se ne segue un altro (crea_pdf.js le allunga fino a fine pagina) */
      + (i < capitoli.length - 1 ? '<div class="appunti fine-capitolo"><span>Appunti</span></div>' : "")).join("");
    app.innerHTML = h;
    attivaRiquadri(app, true); attivaAnimazioni(app, true);
    /* in fondo al PDF: note sulle dispense e crediti delle sole foto presenti nel documento */
    const fotoUsate = [...new Set([...app.querySelectorAll("img.foto")].map(i => (i.getAttribute("src") || "").replace(/^.*\/|\.jpg$/g, "")))];
    app.insertAdjacentHTML("beforeend", htmlNote(true, fotoUsate));
    app.querySelectorAll(".anim").forEach(a => a.classList.add("affianca"));
    /* titoli e istruzioni dei gruppi non restano soli in fondo alla pagina: li teniamo insieme al primo esercizio */
    /* il titolo di una sezione (Controlla cosa sai, Ripasso delle basi, Teoria in sintesi…) va insieme a ciò che segue */
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
    if (k < 0) return null;
    const e = lista[k], id = e.dataset.k !== undefined ? +e.dataset.k : k;
    /* curiosità che seguono nello stesso paragrafo: possono salire a riempire il buco (sono riquadri indipendenti) */
    const sez = e.closest("section"), alt = [];
    for (let j = k + 1; j < lista.length && alt.length < 6; j++) {
      const x = lista[j];
      if (x.closest("section") !== sez) break;
      if (e.contains(x)) continue;
      if (x.matches(".riquadro")) alt.push([x.dataset.k !== undefined ? +x.dataset.k : j, Math.round(x.getBoundingClientRect().height)]);
    }
    return [id, Math.round(e.getBoundingClientRect().height), e.matches(".fig-testo, .anim, .sint-blocco, .box-es") || e.querySelector(".sint-blocco, .box-es") ? 0.6 : 0.68, e.matches(".fig-testo"), alt];
  };
  window.applicaZoom = function (lista, figure, sposta) {
    const el = [...app.querySelectorAll(BLOCCHI)];
    el.forEach((e, i) => { e.dataset.k = i; });   // numerazione fissa, prima di ogni spostamento
    /* una curiosità sale prima del blocco che non entrava, per riempire il buco in fondo alla pagina */
    (sposta || []).forEach(([a, b]) => { if (el[a] && el[b] && !el[a].contains(el[b])) el[b].before(el[a]); });
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
    if (h === "note") return paginaNote();
    /* indirizzi vecchi (link già condivisi e creazione dei PDF) */
    if (h === "anni") return docentiDisciplina(disciplina("matematica"));
    if (h === "anno-1") return docentiIndice(disciplina("matematica"), "scientifico", 1);
    const r = decodeURIComponent(h).split("/");
    if (r[0] === "docenti") {
      if (r.length === 1) return docenti();
      const d = disciplina(r[1]);
      if (d && r.length === 2) return docentiDisciplina(d);
      const pa = d && r[2] && r[2].match(/^(.+)-(\d)$/);
      if (pa && percorso(pa[1])) return docentiIndice(d, pa[1], +pa[2]);
      return docenti();
    }
    if (r[0] === "studenti") {
      if (r.length === 1) return studenti();
      const pc = percorso(r[1]);
      if (!pc) return studenti();
      if (r.length === 2) return studentiIndirizzo(pc.padre ? percorso(pc.padre.id) : pc);
      const anno = +r[2];
      if (!(anno >= 1 && anno <= pc.anni)) return studentiIndirizzo(pc);
      const art = pc.ind && pc.ind.articolazioni;
      if (art && anno >= art.da) return studentiArticolazione(pc, anno);
      if (pc.padre && anno < pc.da) return location.replace(`#studenti/${pc.padre.id}/${anno}`);
      if (r.length === 3) return studentiAnno(pc, anno);
      const d = disciplina(r[3]);
      return d ? studentiIndice(pc, anno, d) : studentiAnno(pc, anno);
    }
    const m = h.match(/^(cap\d+)(-esercizi)?$/);
    if (m && L.capitoli[m[1]]) return m[2] ? esercizi(L.capitoli[m[1]]) : teoria(L.capitoli[m[1]]);
    copertina();
  }
  window.addEventListener("hashchange", vai);
  vai();
})();
