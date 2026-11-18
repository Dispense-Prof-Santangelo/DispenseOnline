/* =====================================================================
   ANIMAZIONI INTERATTIVE
   Ogni animazione è una funzione ANIM.nome(contenitore, stampa).
   Nel testo si richiama con <div class="anim" data-anim="nome"></div>.
   ===================================================================== */
(function () {
  const NS = "http://www.w3.org/2000/svg";
  const C = { blu: "#1f4fa3", bluc: "#cfdcf5", arancio: "#e8752a", aranc: "#fbd9bf", verde: "#1f8a5b", verdec: "#c9ecd9",
    viola: "#6b47b8", violac: "#ddd2f3", giallo: "#f4c430", rosso: "#c8373b", grigio: "#9aa4b8", testo: "#1c2333" };

  function S(tag, attrs, parent, testo) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (testo !== undefined) e.textContent = testo;
    if (parent) parent.appendChild(e);
    return e;
  }
  function H(tag, attrs, parent, html) {
    const e = document.createElement(tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (html !== undefined) e.innerHTML = html;
    if (parent) parent.appendChild(e);
    return e;
  }
  function svg(parent, w, h) { return S("svg", { viewBox: `0 0 ${w} ${h}`, role: "img" }, parent); }
  function cursore(comandi, etichetta, min, max, val, cb) {
    const l = H("label", {}, comandi, etichetta + " ");
    const r = H("input", { type: "range", min, max, value: val, step: 1 }, l);
    const o = H("output", {}, l, val);
    r.addEventListener("input", () => { o.textContent = r.value; cb(+r.value); });
    return r;
  }
  function bottone(comandi, testo, cb, secondario) {
    const b = H("button", { type: "button", class: secondario ? "secondario" : "" }, comandi, testo);
    b.addEventListener("click", cb); return b;
  }
  const mcd = (a, b) => (b ? mcd(b, a % b) : a);
  const mcm = (a, b) => (a / mcd(a, b)) * b;
  const sup = n => String(n).split("").map(c => "⁰¹²³⁴⁵⁶⁷⁸⁹"[c]).join("");

  const ANIM = {};

  /* 1 ─ Semiretta: successivo e precedente */
  ANIM.semiretta = function (el, stampa) {
    const W = 760, H0 = 150, x0 = 40, passo = 48, N = 14;
    const s = svg(el, W, H0);
    S("line", { x1: x0 - 10, y1: 100, x2: W - 14, y2: 100, stroke: C.testo, "stroke-width": 2.5 }, s);
    S("path", { d: `M${W - 14} 100 l-12 -7 v14 z`, fill: C.testo }, s);
    for (let i = 0; i <= N; i++) {
      const x = x0 + i * passo;
      S("line", { x1: x, y1: 92, x2: x, y2: 108, stroke: C.testo, "stroke-width": 2 }, s);
      S("text", { x, y: 132, "text-anchor": "middle", "font-size": 17, "font-weight": 700, fill: C.testo }, s, i);
    }
    S("text", { x: x0, y: 30, "font-size": 13, fill: C.grigio }, s, "origine");
    const arco = S("path", { fill: "none", stroke: C.arancio, "stroke-width": 2.5, "stroke-dasharray": "5 5", opacity: 0 }, s);
    const etArco = S("text", { "text-anchor": "middle", "font-size": 14, "font-weight": 800, fill: C.arancio, opacity: 0 }, s, "+1");
    const pall = S("circle", { r: 13, cy: 100, fill: C.blu, stroke: "#fff", "stroke-width": 3 }, s);
    let n = 5, inCorsa = null;
    const lett = H("div", { class: "lettura" }, el);
    function posa() {
      pall.setAttribute("cx", x0 + n * passo);
      lett.innerHTML = n === 0
        ? "<b>n = 0</b> · precedente: <b>non esiste</b> (0 è il più piccolo naturale) · successivo: <b>1</b>"
        : `<b>n = ${n}</b> · precedente: <b>${n - 1}</b> · successivo: <b>${n + 1}</b>`;
      r.value = n; r.nextElementSibling.textContent = n;
    }
    function salta(dir, fine) {
      const da = n, a = n + dir; if (a < 0 || a > N) { fine && fine(); return; }
      const xa = x0 + da * passo, xb = x0 + a * passo, xm = (xa + xb) / 2;
      arco.setAttribute("d", `M${xa} 100 Q${xm} 30 ${xb} 100`); arco.setAttribute("opacity", 1);
      etArco.textContent = dir > 0 ? "+1" : "−1"; etArco.setAttribute("x", xm); etArco.setAttribute("y", 54); etArco.setAttribute("opacity", 1);
      const t0 = performance.now(), dur = 550;
      (function f(t) {
        const p = Math.min(1, (t - t0) / dur), x = xa + (xb - xa) * p, y = 100 - 4 * 70 * p * (1 - p) * 0.9;
        pall.setAttribute("cx", x); pall.setAttribute("cy", y);
        if (p < 1) requestAnimationFrame(f);
        else { n = a; pall.setAttribute("cy", 100); posa(); setTimeout(() => { arco.setAttribute("opacity", 0); etArco.setAttribute("opacity", 0); }, 250); fine && fine(); }
      })(t0);
    }
    const com = H("div", { class: "comandi" }, el);
    const r = cursore(com, "n =", 0, N, n, v => { n = v; posa(); });
    bottone(com, "◀ precedente", () => { if (n === 0) { lett.innerHTML = "Lo <b>0</b> non ha precedente: non si può tornare indietro!"; return; } salta(-1); }, true);
    bottone(com, "successivo ▶", () => salta(1), true);
    bottone(com, "▶ Avvia i salti", () => {
      if (inCorsa) return; n = 0; posa();
      inCorsa = true; (function giro() { if (n >= N) { inCorsa = null; return; } salta(1, () => setTimeout(giro, 120)); })();
    });
    posa();
  };

  /* 2 ─ Divisione con resto: caramelle nei sacchetti */
  ANIM.divisione = function (el) {
    let a = 23, b = 5;
    const box = H("div", {}, el), lett = H("div", { class: "lettura" }, el);
    const com = H("div", { class: "comandi" }, el);
    cursore(com, "Caramelle (a)", 1, 40, a, v => { a = v; disegna(); });
    cursore(com, "Per sacchetto (b)", 1, 9, b, v => { b = v; disegna(); });
    function disegna() {
      box.innerHTML = "";
      const q = Math.floor(a / b), r = a % b, R = 7, sp = 17;
      const wS = b * sp + 14, hS = 46, gap = 12, W = 760;
      const perRiga = Math.max(1, Math.floor((W - 20) / (wS + gap)));
      const righe = Math.ceil(q / perRiga) || 0;
      const H0 = 20 + righe * (hS + 18) + 60;
      const s = svg(box, W, H0);
      let k = 0;
      for (let i = 0; i < q; i++) {
        const x = 10 + (i % perRiga) * (wS + gap), y = 10 + Math.floor(i / perRiga) * (hS + 18);
        S("rect", { x, y, width: wS, height: hS, rx: 2, fill: C.bluc, stroke: C.blu, "stroke-width": 2 }, s);
        S("text", { x: x + wS / 2, y: y + hS + 14, "text-anchor": "middle", "font-size": 12, fill: C.blu, "font-weight": 700 }, s, "sacchetto " + (i + 1));
        for (let j = 0; j < b; j++) {
          const c = S("circle", { cx: x + 14 + j * sp, cy: y + hS / 2, r: R, fill: C.arancio, class: "car" }, s);
          c.style.cssText = `opacity:0;transition:opacity .25s ${k++ * 0.025}s`;
        }
      }
      const yr = 20 + righe * (hS + 18) + 10;
      S("text", { x: 10, y: yr + 20, "font-size": 14, "font-weight": 800, fill: r ? C.rosso : C.verde }, s, r ? "avanzano:" : "nessuna caramella avanza: divisione esatta!");
      for (let j = 0; j < r; j++) {
        const c = S("circle", { cx: 100 + j * sp, cy: yr + 15, r: R, fill: C.rosso }, s);
        c.style.cssText = `opacity:0;transition:opacity .25s ${k++ * 0.025}s`;
      }
      requestAnimationFrame(() => requestAnimationFrame(() => s.querySelectorAll("circle").forEach(c => (c.style.opacity = 1))));
      lett.innerHTML = `<b>${a}</b> = <b>${b}</b> · <b style="color:${C.blu}">${q}</b> + <b style="color:${C.rosso}">${r}</b> &emsp; → quoziente <b>${q}</b>, resto <b>${r}</b> ${r < b ? "(il resto è minore del divisore ✓)" : ""}`;
    }
    disegna();
  };

  /* 3 ─ Albero delle potenze */
  ANIM.albero = function (el, stampa) {
    let base = 2, esp = 4;
    const box = H("div", {}, el), lett = H("div", { class: "lettura" }, el);
    const com = H("div", { class: "comandi" }, el);
    let rEsp;
    cursore(com, "Base", 2, 3, base, v => { base = v; const mx = base === 2 ? 6 : 4; rEsp.max = mx; if (esp > mx) { esp = mx; rEsp.value = mx; rEsp.nextElementSibling.textContent = mx; } disegna(); });
    rEsp = cursore(com, "Esponente", 0, 6, esp, v => { esp = v; disegna(); });
    function disegna() {
      box.innerHTML = "";
      const W = 760, dy = 52, H0 = 40 + Math.max(1, esp) * dy + 20;
      const s = svg(box, W, H0);
      let prec = [W / 2];
      const nodo0 = S("circle", { cx: W / 2, cy: 24, r: 9, fill: C.blu }, s);
      for (let k = 1; k <= esp; k++) {
        const nNodi = Math.pow(base, k), y = 24 + k * dy, larg = (W - 40) / nNodi, nuovi = [];
        const g = S("g", {}, s);
        g.style.cssText = stampa ? "" : `opacity:0;transition:opacity .4s ${k * 0.35}s`;
        for (let i = 0; i < nNodi; i++) {
          const x = 20 + larg * (i + 0.5), padre = prec[Math.floor(i / base)];
          S("line", { x1: padre, y1: y - dy + 6, x2: x, y2: y - 5, stroke: k === esp ? C.verde : C.grigio, "stroke-width": k === esp ? 1.6 : 1.2 }, g);
          S("circle", { cx: x, cy: y, r: Math.max(2.2, Math.min(8, larg / 3)), fill: k === esp ? C.verde : C.blu }, g);
          nuovi.push(x);
        }
        S("text", { x: W - 6, y: y - 10, "text-anchor": "end", "font-size": 13, "font-weight": 800, fill: C.viola }, g, `${base}${sup(k)} = ${nNodi}`);
        prec = nuovi;
      }
      S("text", { x: W - 6, y: 20, "text-anchor": "end", "font-size": 13, "font-weight": 800, fill: C.viola }, s, `${base}⁰ = 1`);
      if (!stampa) requestAnimationFrame(() => requestAnimationFrame(() => s.querySelectorAll("g").forEach(g => (g.style.opacity = 1))));
      const fattori = esp === 0 ? "nessun fattore: per convenzione vale 1" : Array(esp).fill(base).join(" · ");
      lett.innerHTML = `<b>${base}${sup(esp)}</b> = ${fattori} = <b>${Math.pow(base, esp)}</b> rami all'ultimo livello`;
    }
    disegna();
  };

  /* 4 ─ Espressione passo dopo passo */
  ANIM.espressione = function (el, stampa) {
    const P = [
      ["{[(<span class=hl>2 + 3</span>)² − 5 · 3] : 2 + 4⁰} · 3", "Si comincia dalle parentesi <b>tonde</b>: 2 + 3 = 5"],
      ["{[<span class=hl>5²</span> − 5 · 3] : 2 + 4⁰} · 3", "Nelle quadre, prima la <b>potenza</b>: 5² = 25"],
      ["{[25 − <span class=hl>5 · 3</span>] : 2 + 4⁰} · 3", "Poi la <b>moltiplicazione</b>: 5 · 3 = 15"],
      ["{[<span class=hl>25 − 15</span>] : 2 + 4⁰} · 3", "Infine la <b>sottrazione</b>: 25 − 15 = 10. Le quadre sono risolte"],
      ["{10 : 2 + <span class=hl>4⁰</span>} · 3", "Nelle graffe, prima la <b>potenza</b>: 4⁰ = 1"],
      ["{<span class=hl>10 : 2</span> + 1} · 3", "Poi la <b>divisione</b>: 10 : 2 = 5"],
      ["{<span class=hl>5 + 1</span>} · 3", "Poi l'<b>addizione</b>: 5 + 1 = 6"],
      ["<span class=hl>6 · 3</span>", "Fuori dalle parentesi resta l'ultima operazione: 6 · 3 = 18"],
      ["18", "Il <b>valore</b> dell'espressione è <b>18</b> ✓"]
    ];
    if (stampa) {
      const ol = H("ol", { style: "font-family:var(--serif);font-size:1.05rem" }, el);
      P.forEach(p => H("li", {}, ol, p[0].replace(/<[^>]+>/g, "") + " &emsp; <span style='font-family:var(--serif);font-size:.9rem;color:#566079'>— " + p[1] + "</span>"));
      return;
    }
    let i = 0;
    const ex = H("div", { class: "passo-expr" }, el), nota = H("div", { class: "passo-nota" }, el);
    const com = H("div", { class: "comandi" }, el);
    const av = bottone(com, "Passo successivo ▶", () => { if (i < P.length - 1) { i++; mostra(); } });
    bottone(com, "↺ Ricomincia", () => { i = 0; mostra(); }, true);
    const cont = H("span", { style: "color:#566079" }, com);
    function mostra() { ex.innerHTML = P[i][0]; nota.innerHTML = P[i][1]; cont.textContent = `passo ${i + 1} di ${P.length}`; av.disabled = i === P.length - 1; av.style.opacity = av.disabled ? .5 : 1; }
    mostra();
  };

  /* 5 ─ Proprietà distributiva con le aree */
  ANIM.area = function (el) {
    let a = 4, b = 5, c = 3;
    const box = H("div", {}, el), lett = H("div", { class: "lettura" }, el);
    const com = H("div", { class: "comandi" }, el);
    cursore(com, "a", 1, 7, a, v => { a = v; disegna(); });
    cursore(com, "b", 1, 10, b, v => { b = v; disegna(); });
    cursore(com, "c", 1, 8, c, v => { c = v; disegna(); });
    function disegna() {
      box.innerHTML = "";
      const u = 34, x0 = 60, y0 = 40, W = 760, H0 = y0 + 7 * u + 40;
      const s = svg(box, W, H0);
      function blocco(x, w, col, colc, nome) {
        for (let i = 0; i < w; i++) for (let j = 0; j < a; j++) {
          const q = S("rect", { x: x + i * u, y: y0 + j * u, width: u, height: u, fill: colc, stroke: "#fff", "stroke-width": 2 }, s);
          q.style.cssText = `opacity:0;transition:opacity .3s ${(i + j) * 0.03}s`;
        }
        S("rect", { x, y: y0, width: w * u, height: a * u, fill: "none", stroke: col, "stroke-width": 3, rx: 3 }, s);
        S("text", { x: x + (w * u) / 2, y: y0 + (a * u) / 2 + 6, "text-anchor": "middle", "font-size": 18, "font-weight": 800, fill: col }, s, nome);
      }
      blocco(x0, b, C.blu, C.bluc, `a·b = ${a * b}`);
      blocco(x0 + b * u, c, C.arancio, C.aranc, `a·c = ${a * c}`);
      S("text", { x: x0 + (b * u) / 2, y: y0 - 12, "text-anchor": "middle", "font-size": 16, "font-weight": 800, fill: C.blu }, s, `b = ${b}`);
      S("text", { x: x0 + b * u + (c * u) / 2, y: y0 - 12, "text-anchor": "middle", "font-size": 16, "font-weight": 800, fill: C.arancio }, s, `c = ${c}`);
      S("text", { x: x0 - 12, y: y0 + (a * u) / 2 + 6, "text-anchor": "end", "font-size": 16, "font-weight": 800, fill: C.testo }, s, `a = ${a}`);
      requestAnimationFrame(() => requestAnimationFrame(() => s.querySelectorAll("rect").forEach(r => (r.style.opacity = 1))));
      lett.innerHTML = `a · (b + c) = ${a} · ${b + c} = <b>${a * (b + c)}</b> &emsp; a · b + a · c = <span style="color:${C.blu}">${a * b}</span> + <span style="color:${C.arancio}">${a * c}</span> = <b>${a * b + a * c}</b> &emsp; ✓`;
    }
    disegna();
  };

  /* 6 ─ Prodotto di potenze con la stessa base */
  ANIM.gettoni = function (el, stampa) {
    let m = 3, n = 2, unito = false;
    const box = H("div", {}, el), lett = H("div", { class: "lettura" }, el);
    const com = H("div", { class: "comandi" }, el);
    cursore(com, "m", 1, 5, m, v => { m = v; unito = false; disegna(); });
    cursore(com, "n", 1, 5, n, v => { n = v; unito = false; disegna(); });
    const bu = bottone(com, "Unisci i fattori ▶", () => { unito = !unito; disegna(); });
    function disegna() {
      box.innerHTML = "";
      const W = 760, H0 = 130, R = 24, sp = 58, gap = 110;
      const s = svg(box, W, H0);
      const tot = (m + n) * sp + (unito ? 0 : gap), xs = (W - tot) / 2 + R;
      const g1 = S("g", {}, s), g2 = S("g", {}, s);
      g2.style.cssText = "transition:transform .8s cubic-bezier(.3,.8,.3,1)";
      for (let i = 0; i < m; i++) {
        S("circle", { cx: xs + i * sp, cy: 60, r: R, fill: C.bluc, stroke: C.blu, "stroke-width": 3 }, g1);
        S("text", { x: xs + i * sp, y: 67, "text-anchor": "middle", "font-size": 20, "font-weight": 800, fill: C.blu }, g1, "a");
        if (i < m - 1 || unito) S("text", { x: xs + i * sp + sp / 2, y: 66, "text-anchor": "middle", "font-size": 20, fill: C.testo }, g1, "·");
      }
      const xs2 = xs + m * sp + (unito ? 0 : gap);
      if (!unito) S("text", { x: xs + m * sp - sp / 2 + gap / 2 + 12, y: 68, "text-anchor": "middle", "font-size": 30, "font-weight": 800, fill: C.testo }, s, "·");
      for (let i = 0; i < n; i++) {
        S("circle", { cx: xs2 + i * sp, cy: 60, r: R, fill: unito ? C.bluc : C.aranc, stroke: unito ? C.blu : C.arancio, "stroke-width": 3 }, g2);
        S("text", { x: xs2 + i * sp, y: 67, "text-anchor": "middle", "font-size": 20, "font-weight": 800, fill: unito ? C.blu : C.arancio }, g2, "a");
        if (i < n - 1) S("text", { x: xs2 + i * sp + sp / 2, y: 66, "text-anchor": "middle", "font-size": 20, fill: C.testo }, g2, "·");
      }
      if (unito) {
        g2.style.transform = `translateX(${gap}px)`;
        requestAnimationFrame(() => requestAnimationFrame(() => { g2.style.transform = "translateX(0)"; }));
        S("text", { x: W / 2, y: 120, "text-anchor": "middle", "font-size": 15, "font-weight": 800, fill: C.verde }, s, `${m + n} fattori uguali ad a`);
      } else {
        S("text", { x: xs + ((m - 1) * sp) / 2, y: 120, "text-anchor": "middle", "font-size": 15, "font-weight": 800, fill: C.blu }, s, `a${sup(m)}: ${m} fattori`);
        S("text", { x: xs2 + ((n - 1) * sp) / 2, y: 120, "text-anchor": "middle", "font-size": 15, "font-weight": 800, fill: C.arancio }, s, `a${sup(n)}: ${n} fattori`);
      }
      bu.textContent = unito ? "↺ Separa" : "Unisci i fattori ▶";
      lett.innerHTML = `a<sup>${m}</sup> · a<sup>${n}</sup> = a<sup>${m}+${n}</sup> = <b>a<sup>${m + n}</sup></b> &emsp; con a = 2: ${2 ** m} · ${2 ** n} = <b>${2 ** (m + n)}</b> = 2<sup>${m + n}</sup>`;
    }
    if (stampa) unito = false;
    disegna();
  };

  /* 7 ─ Piastrelle e rettangoli: i divisori */
  ANIM.rettangoli = function (el) {
    let n = 12;
    const box = H("div", {}, el), lett = H("div", { class: "lettura" }, el);
    const com = H("div", { class: "comandi" }, el);
    cursore(com, "Piastrelle n =", 1, 36, n, v => { n = v; disegna(); });
    function disegna() {
      box.innerHTML = "";
      const coppie = []; for (let d = 1; d * d <= n; d++) if (n % d === 0) coppie.push([d, n / d]);
      const u = n <= 18 ? 30 : 20, W = 760, gap = 30;
      // disposizione a righe
      let x = 10, y = 10, hRiga = 0; const pos = [];
      coppie.forEach(([h, w]) => {
        const ww = w * u, hh = h * u + 22;
        if (x + ww > W - 10) { x = 10; y += hRiga + 16; hRiga = 0; }
        pos.push([x, y, h, w]); x += ww + gap; hRiga = Math.max(hRiga, hh);
      });
      const s = svg(box, W, y + hRiga + 10);
      let k = 0;
      pos.forEach(([x, y, h, w], idx) => {
        const col = idx === 0 ? [C.verde, C.verdec] : [C.blu, C.bluc];
        for (let i = 0; i < h; i++) for (let j = 0; j < w; j++) {
          const q = S("rect", { x: x + j * u, y: y + i * u, width: u - 2, height: u - 2, rx: 1, fill: col[1], stroke: col[0], "stroke-width": 1.2 }, s);
          q.style.cssText = `opacity:0;transition:opacity .2s ${(k++) * 0.006 + idx * 0.25}s`;
        }
        S("text", { x, y: y + h * u + 16, "font-size": 13, "font-weight": 800, fill: col[0] }, s, `${h} × ${w}`);
      });
      requestAnimationFrame(() => requestAnimationFrame(() => s.querySelectorAll("rect").forEach(r => (r.style.opacity = 1))));
      const div = []; for (let d = 1; d <= n; d++) if (n % d === 0) div.push(d);
      const tipo = n === 1 ? "<b>1</b> non è né primo né composto (ha un solo divisore)" : div.length === 2 ? `<b style="color:${C.verde}">${n} è PRIMO</b>: si dispone solo in una fila` : `<b style="color:${C.blu}">${n} è COMPOSTO</b>: si dispone in ${coppie.length} rettangoli diversi`;
      lett.innerHTML = `Divisori di ${n}: <b>${div.join(", ")}</b> (${div.length} divisori) · ${tipo}`;
    }
    disegna();
  };

  /* 8 ─ Crivello di Eratostene */
  ANIM.crivello = function (el, stampa) {
    const W = 760, cw = 74, ch = 38, x0 = 10, y0 = 8, cols = 10;
    const s = svg(el, W, y0 + 10 * ch + 8);
    const colori = { 2: "#f6d2b8", 3: "#d6e4f7", 5: "#e3d8f5", 7: "#f9e3a7" };
    const celle = {};
    for (let v = 1; v <= 100; v++) {
      const i = v - 1, x = x0 + (i % cols) * cw, y = y0 + Math.floor(i / cols) * ch;
      const r = S("rect", { x: x + 2, y: y + 2, width: cw - 4, height: ch - 4, rx: 1, fill: "#fff", stroke: "#d9dfeb" }, s);
      const t = S("text", { x: x + cw / 2, y: y + ch / 2 + 6, "text-anchor": "middle", "font-size": 16, "font-weight": 700, fill: C.testo }, s, v);
      const l = S("line", { x1: x + 14, y1: y + ch - 10, x2: x + cw - 14, y2: y + 10, stroke: C.rosso, "stroke-width": 2, opacity: 0 }, s);
      celle[v] = { r, t, l };
    }
    const lett = H("div", { class: "lettura" }, el);
    const com = H("div", { class: "comandi" }, el);
    let timer = [];
    function azzera() {
      timer.forEach(clearTimeout); timer = [];
      for (let v = 1; v <= 100; v++) { celle[v].r.setAttribute("fill", "#fff"); celle[v].l.setAttribute("opacity", 0); celle[v].t.setAttribute("fill", C.testo); celle[v].r.setAttribute("stroke", "#d9dfeb"); }
      lett.innerHTML = "Premi <b>Avvia</b>: verranno cancellati, uno dopo l'altro, i multipli di 2, 3, 5 e 7.";
    }
    function cancella(v, col) { celle[v].r.setAttribute("fill", col); celle[v].l.setAttribute("opacity", .8); celle[v].t.setAttribute("fill", C.grigio); }
    function primo(v) { celle[v].r.setAttribute("fill", C.verde); celle[v].t.setAttribute("fill", "#fff"); celle[v].r.setAttribute("stroke", C.verde); }
    function finale() {
      const primi = []; for (let v = 2; v <= 100; v++) { let p = true; for (let d = 2; d * d <= v; d++) if (v % d === 0) p = false; if (p) { primi.push(v); primo(v); } }
      lett.innerHTML = `Sono rimasti <b>${primi.length} numeri primi</b> minori di 100. Bastano i multipli di 2, 3, 5, 7 perché 11 · 11 = 121 supera già 100.`;
    }
    function avvia() {
      azzera(); let t = 0; const d = 70;
      timer.push(setTimeout(() => { cancella(1, "#eceff5"); lett.innerHTML = "L'<b>1</b> non è primo: lo togliamo subito."; }, t)); t += 700;
      [2, 3, 5, 7].forEach(p => {
        timer.push(setTimeout(() => { primo(p); lett.innerHTML = `<b>${p}</b> è primo: cancelliamo tutti i suoi multipli (da ${p * p} in poi, i precedenti sono già cancellati).`; }, t)); t += 600;
        for (let v = p * p; v <= 100; v += p) { const vv = v; timer.push(setTimeout(() => cancella(vv, colori[p]), t)); t += d; }
        t += 400;
      });
      timer.push(setTimeout(finale, t));
    }
    if (stampa) { cancella(1, "#eceff5"); [2, 3, 5, 7].forEach(p => { for (let v = p * p; v <= 100; v += p) cancella(v, colori[p]); }); finale(); return; }
    bottone(com, "▶ Avvia", avvia);
    bottone(com, "↺ Ricomincia", azzera, true);
    const leg = H("span", { style: "font-size:.85rem;color:#566079" }, com,
      Object.entries(colori).map(([p, c]) => `<span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:${c};vertical-align:-1px"></span> multipli di ${p}`).join(" &emsp; "));
    azzera();
  };

  /* 9 ─ Piastrelle quadrate: il MCD */
  ANIM.piastrelle = function (el) {
    let a = 24, b = 18;
    const box = H("div", {}, el), lett = H("div", { class: "lettura" }, el);
    const com = H("div", { class: "comandi" }, el);
    cursore(com, "Base (dm)", 2, 36, a, v => { a = v; disegna(); });
    cursore(com, "Altezza (dm)", 2, 24, b, v => { b = v; disegna(); });
    function disegna() {
      box.innerHTML = "";
      const g = mcd(a, b), W = 760, u = Math.min(700 / a, 300 / b), x0 = (W - a * u) / 2, y0 = 14;
      const s = svg(box, W, b * u + 30);
      let k = 0;
      for (let i = 0; i < a / g; i++) for (let j = 0; j < b / g; j++) {
        const q = S("rect", { x: x0 + i * g * u, y: y0 + j * g * u, width: g * u, height: g * u, fill: (i + j) % 2 ? C.verdec : "#e9f7ef", stroke: C.verde, "stroke-width": 1.5 }, s);
        q.style.cssText = `opacity:0;transition:opacity .25s ${(k++) * 0.02}s`;
      }
      S("rect", { x: x0, y: y0, width: a * u, height: b * u, fill: "none", stroke: C.testo, "stroke-width": 3 }, s);
      requestAnimationFrame(() => requestAnimationFrame(() => s.querySelectorAll("rect").forEach(r => (r.style.opacity = 1))));
      const n = (a / g) * (b / g);
      lett.innerHTML = `MCD(${a}, ${b}) = <b>${g}</b> → la piastrella più grande è un quadrato di lato <b>${g} dm</b>; ne servono ${a / g} × ${b / g} = <b>${n}</b>.` + (g === 1 ? " I due numeri sono <b>primi tra loro</b>." : "");
    }
    disegna();
  };

  /* 10 ─ Cicale e predatori: il mcm */
  ANIM.cicale = function (el) {
    let c = 13, p = 4;
    const box = H("div", {}, el), lett = H("div", { class: "lettura" }, el);
    const com = H("div", { class: "comandi" }, el);
    cursore(com, "Ciclo cicale (anni)", 10, 18, c, v => { c = v; disegna(); });
    cursore(com, "Ciclo predatore", 2, 6, p, v => { p = v; disegna(); });
    function disegna() {
      box.innerHTML = "";
      const W = 760, Y = 120, x0 = 30, x1 = W - 20, u = (x1 - x0) / Y;
      const s = svg(box, W, 150);
      S("line", { x1: x0, y1: 120, x2: x1, y2: 120, stroke: C.testo, "stroke-width": 2 }, s);
      for (let t = 0; t <= Y; t += 10) {
        S("line", { x1: x0 + t * u, y1: 116, x2: x0 + t * u, y2: 124, stroke: C.testo }, s);
        S("text", { x: x0 + t * u, y: 140, "text-anchor": "middle", "font-size": 11, fill: C.grigio }, s, t);
      }
      S("text", { x: x0, y: 16, "font-size": 12, "font-weight": 800, fill: C.verde }, s, "cicale");
      S("text", { x: x0, y: 98, "font-size": 12, "font-weight": 800, fill: C.rosso }, s, "predatori");
      const M = mcm(c, p); let incontri = 0, k = 0;
      for (let t = M; t <= Y; t += M) {
        incontri++;
        const r = S("rect", { x: x0 + t * u - 7, y: 22, width: 14, height: 92, rx: 1, fill: C.giallo, opacity: 0 }, s);
        r.style.cssText = `transition:opacity .4s ${0.6 + incontri * 0.3}s`;
      }
      for (let t = 0; t <= Y; t += c) {
        const e = S("circle", { cx: x0 + t * u, cy: 40, r: 8, fill: C.verde }, s);
        e.style.cssText = `opacity:0;transition:opacity .3s ${(k++) * 0.06}s`;
      }
      for (let t = 0; t <= Y; t += p) {
        const e = S("path", { d: `M${x0 + t * u} 70 l7 12 h-14 z`, fill: C.rosso }, s);
        e.style.cssText = `opacity:0;transition:opacity .3s ${(k++) * 0.02}s`;
      }
      requestAnimationFrame(() => requestAnimationFrame(() => s.querySelectorAll("circle,path,rect").forEach(r => { r.style.opacity = r.tagName === "rect" ? .55 : 1; })));
      lett.innerHTML = `Si incontrano ogni <b>mcm(${c}, ${p}) = ${M} anni</b> → in 120 anni <b>${incontri}</b> ${incontri === 1 ? "incontro" : "incontri"} (oltre all'anno 0).` +
        (M === c ? ` &emsp; <span style="color:${C.rosso}">Ahi! Le cicale incontrano i predatori a <b>ogni</b> uscita.</span>` : "");
    }
    disegna();
  };

  window.ANIM = ANIM;
})();
