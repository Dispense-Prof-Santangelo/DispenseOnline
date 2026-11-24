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
        ? "<b>n = 0</b> · il precedente <b>non esiste</b> (0 è il più piccolo naturale) · il successivo è <b>1</b>"
        : `<b>n = ${n}</b> · il precedente è <b>${n - 1}</b> · il successivo è <b>${n + 1}</b>`;
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
      ["{[(<span class=hl>2 + 3</span>)² − 5 · 3] : 2 + 4⁰} · 3", "Si comincia dalle parentesi <b>tonde</b>, cioè 2 + 3 = 5"],
      ["{[<span class=hl>5²</span> − 5 · 3] : 2 + 4⁰} · 3", "Nelle quadre, prima la <b>potenza</b>, cioè 5² = 25"],
      ["{[25 − <span class=hl>5 · 3</span>] : 2 + 4⁰} · 3", "Poi la <b>moltiplicazione</b>, cioè 5 · 3 = 15"],
      ["{[<span class=hl>25 − 15</span>] : 2 + 4⁰} · 3", "Infine la <b>sottrazione</b>, cioè 25 − 15 = 10. Le quadre sono risolte"],
      ["{10 : 2 + <span class=hl>4⁰</span>} · 3", "Nelle graffe, prima la <b>potenza</b>, cioè 4⁰ = 1"],
      ["{<span class=hl>10 : 2</span> + 1} · 3", "Poi la <b>divisione</b>, cioè 10 : 2 = 5"],
      ["{<span class=hl>5 + 1</span>} · 3", "Poi l'<b>addizione</b>, cioè 5 + 1 = 6"],
      ["<span class=hl>6 · 3</span>", "Fuori dalle parentesi resta l'ultima operazione, cioè 6 · 3 = 18"],
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
        S("text", { x: xs + ((m - 1) * sp) / 2, y: 120, "text-anchor": "middle", "font-size": 15, "font-weight": 800, fill: C.blu }, s, `a${sup(m)} → ${m} fattori`);
        S("text", { x: xs2 + ((n - 1) * sp) / 2, y: 120, "text-anchor": "middle", "font-size": 15, "font-weight": 800, fill: C.arancio }, s, `a${sup(n)} → ${n} fattori`);
      }
      bu.textContent = unito ? "↺ Separa" : "Unisci i fattori ▶";
      lett.innerHTML = `a<sup>${m}</sup> · a<sup>${n}</sup> = a<sup>${m}+${n}</sup> = <b>a<sup>${m + n}</sup></b> &emsp; con a = 2 si ha ${2 ** m} · ${2 ** n} = <b>${2 ** (m + n)}</b> = 2<sup>${m + n}</sup>`;
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
      lett.innerHTML = `I divisori di ${n} sono <b>${div.join(", ")}</b> (${div.length} divisori) · ${tipo}`;
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
      lett.innerHTML = `MCD(${a}; ${b}) = <b>${g}</b> → la piastrella più grande è un quadrato di lato <b>${g} dm</b>; ne servono ${a / g} × ${b / g} = <b>${n}</b>.` + (g === 1 ? " I due numeri sono <b>primi tra loro</b>." : "");
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
      lett.innerHTML = `Si incontrano ogni <b>mcm(${c}; ${p}) = ${M} anni</b> → in 120 anni <b>${incontri}</b> ${incontri === 1 ? "incontro" : "incontri"} (oltre all'anno 0).` +
        (M === c ? ` &emsp; <span style="color:${C.rosso}">Ahi! Le cicale incontrano i predatori a <b>ogni</b> uscita.</span>` : "");
    }
    disegna();
  };


  /* ===================== CAPITOLO 2 – I NUMERI INTERI ===================== */
  const fz = n => (n > 0 ? "+" + n : n < 0 ? "−" + (-n) : "0");          // intero con segno
  const fp = n => (n < 0 ? "(" + fz(n) + ")" : fz(n));                      // tra parentesi se negativo
  function cursoreZ(comandi, etichetta, min, max, val, cb) {
    const l = H("label", {}, comandi, etichetta + " ");
    const r = H("input", { type: "range", min, max, value: val, step: 1 }, l);
    const o = H("output", {}, l, fz(val));
    r.addEventListener("input", () => { o.textContent = fz(+r.value); cb(+r.value); });
    return r;
  }
  function retta(s, x0, u, y, da, a, etichette) {
    S("line", { x1: x0 + da * u - 18, y1: y, x2: x0 + a * u + 22, y2: y, stroke: C.testo, "stroke-width": 2.2 }, s);
    S("path", { d: `M${x0 + a * u + 24} ${y} l-11 -6 v12 z`, fill: C.testo }, s);
    for (let i = da; i <= a; i++) {
      const x = x0 + i * u;
      S("line", { x1: x, y1: y - 7, x2: x, y2: y + 7, stroke: C.testo, "stroke-width": i === 0 ? 2.6 : 1.5 }, s);
      if (etichette !== false) S("text", { x, y: y + 26, "text-anchor": "middle", "font-size": u < 28 ? 11.5 : 14, "font-weight": i === 0 ? 800 : 600, fill: i < 0 ? C.rosso : i > 0 ? C.blu : C.testo }, s, fz(i));
    }
  }

  /* 11 ─ Termometro: sopra e sotto lo zero */
  ANIM.termometro = function (el) {
    let t = -4;
    const box = H("div", {}, el), lett = H("div", { class: "lettura" }, el);
    const com = H("div", { class: "comandi" }, el);
    cursoreZ(com, "Temperatura (°C)", -20, 30, t, v => { t = v; disegna(); });
    function disegna() {
      box.innerHTML = "";
      const W = 760, H0 = 236, xT = 120, y0 = 12, u = 3;   // scala da +30 a −20
      const s = svg(box, W, H0);
      const yv = v => y0 + 10 + (30 - v) * u;
      S("rect", { x: xT - 11, y: y0, width: 22, height: 50 * u + 20, rx: 11, fill: "#fff", stroke: C.testo, "stroke-width": 2 }, s);
      S("circle", { cx: xT, cy: y0 + 50 * u + 34, r: 20, fill: C.rosso, stroke: C.testo, "stroke-width": 2 }, s);
      S("rect", { x: xT - 6, y: yv(t), width: 12, height: y0 + 50 * u + 30 - yv(t), fill: C.rosso }, s);
      for (let v = -20; v <= 30; v += 5) {
        S("line", { x1: xT + 14, y1: yv(v), x2: xT + (v % 10 ? 22 : 30), y2: yv(v), stroke: C.testo, "stroke-width": v === 0 ? 2.6 : 1.3 }, s);
        if (v % 10 === 0) S("text", { x: xT + 36, y: yv(v) + 5, "font-size": 14, "font-weight": v === 0 ? 800 : 600, fill: v < 0 ? C.rosso : v > 0 ? C.blu : C.testo }, s, fz(v));
      }
      S("line", { x1: xT - 40, y1: yv(0), x2: W - 30, y2: yv(0), stroke: C.grigio, "stroke-dasharray": "6 5", "stroke-width": 1.5 }, s);
      S("text", { x: W - 30, y: yv(0) - 8, "text-anchor": "end", "font-size": 13, fill: C.grigio }, s, "livello di riferimento, 0 °C (il ghiaccio fonde)");
      S("text", { x: 260, y: 50, "font-size": 16, "font-weight": 800, fill: C.blu }, s, "sopra lo zero → numeri positivi");
      S("text", { x: 260, y: 180, "font-size": 16, "font-weight": 800, fill: C.rosso }, s, "sotto lo zero → numeri negativi");
      S("path", { d: `M${xT - 18} ${yv(t)} l-14 -7 v14 z`, fill: C.arancio }, s);
      S("text", { x: xT - 38, y: yv(t) + 5, "text-anchor": "end", "font-size": 16, "font-weight": 800, fill: C.arancio }, s, fz(t) + " °C");
      lett.innerHTML = t > 0 ? `<b>${fz(t)} °C</b> → ${t} gradi <b>sopra</b> lo zero, quindi numero <b style="color:${C.blu}">positivo</b>`
        : t < 0 ? `<b>${fz(t)} °C</b> → ${-t} gradi <b>sotto</b> lo zero, quindi numero <b style="color:${C.rosso}">negativo</b>`
        : `<b>0 °C</b> → è il livello di riferimento e lo zero non è né positivo né negativo`;
    }
    disegna();
  };

  /* 12 ─ Retta dei numeri interi: opposto e valore assoluto */
  ANIM.rettaz = function (el) {
    let a = -5;
    const box = H("div", {}, el), lett = H("div", { class: "lettura" }, el);
    const com = H("div", { class: "comandi" }, el);
    cursoreZ(com, "a =", -9, 9, a, v => { a = v; disegna(); });
    function disegna() {
      box.innerHTML = "";
      const W = 760, u = 38, x0 = W / 2, y = 110;
      const s = svg(box, W, 178);
      retta(s, x0, u, y, -9, 9);
      if (a !== 0) {
        const xa = x0 + a * u, xo = x0 - a * u;
        S("path", { d: `M${x0} ${y - 14} L${xa} ${y - 14}`, stroke: C.arancio, "stroke-width": 5, opacity: .8 }, s);
        S("path", { d: `M${x0} ${y + 40} L${xo} ${y + 40}`, stroke: C.verde, "stroke-width": 5, opacity: .8 }, s);
        S("text", { x: (x0 + xa) / 2, y: y - 22, "text-anchor": "middle", "font-size": 14, "font-weight": 800, fill: C.arancio }, s, `distanza da 0 = |a| = ${Math.abs(a)}`);
        S("text", { x: (x0 + xo) / 2, y: y + 58, "text-anchor": "middle", "font-size": 14, "font-weight": 800, fill: C.verde }, s, `distanza da 0 = ${Math.abs(a)}`);
        S("path", { d: `M${xa} ${y - 46} Q${x0} ${y - 100} ${xo} ${y - 46}`, fill: "none", stroke: C.viola, "stroke-width": 2, "stroke-dasharray": "5 5" }, s);
        S("text", { x: x0, y: y - 80, "text-anchor": "middle", "font-size": 13, "font-weight": 700, fill: C.viola }, s, "simmetrici rispetto a 0");
        S("circle", { cx: xo, cy: y, r: 11, fill: C.verde, stroke: "#fff", "stroke-width": 3 }, s);
        S("text", { x: xo, y: y - 34, "text-anchor": "middle", "font-size": 15, "font-weight": 800, fill: C.verde }, s, "−a");
      }
      S("circle", { cx: x0 + a * u, cy: y, r: 11, fill: C.arancio, stroke: "#fff", "stroke-width": 3 }, s);
      S("text", { x: x0 + a * u, y: y - 34, "text-anchor": "middle", "font-size": 15, "font-weight": 800, fill: C.arancio }, s, "a");
      lett.innerHTML = a === 0 ? "<b>a = 0</b> → lo zero è opposto di se stesso e |0| = 0"
        : `<b>a = ${fz(a)}</b> → opposto <b>−a = ${fz(-a)}</b> &emsp; valore assoluto <b>|${fz(a)}| = ${Math.abs(a)}</b> &emsp; precedente ${fz(a - 1)}, successivo ${fz(a + 1)}`;
    }
    disegna();
  };

  /* 13 ─ Somma con i salti sulla retta */
  ANIM.somma = function (el, stampa) {
    let a = 2, b = -6;
    const box = H("div", {}, el), lett = H("div", { class: "lettura" }, el);
    const com = H("div", { class: "comandi" }, el);
    cursoreZ(com, "a =", -7, 7, a, v => { a = v; disegna(); });
    cursoreZ(com, "b =", -7, 7, b, v => { b = v; disegna(); });
    function disegna() {
      box.innerHTML = "";
      const W = 760, u = 25, x0 = W / 2, y = 112;
      const s = svg(box, W, 190);
      retta(s, x0, u, y, -14, 14);
      const xa = x0 + a * u, xs = x0 + (a + b) * u;
      if (a) {
        S("path", { d: `M${x0} ${y + 44} L${xa} ${y + 44}`, stroke: C.blu, "stroke-width": 4 }, s);
        S("text", { x: (x0 + xa) / 2, y: y + 64, "text-anchor": "middle", "font-size": 13, "font-weight": 800, fill: C.blu }, s, "a = " + fz(a));
      }
      const g = S("g", {}, s);
      S("path", { d: `M${xa} ${y - 4} Q${(xa + xs) / 2} ${y - 95} ${xs} ${y - 4}`, fill: "none", stroke: b >= 0 ? C.verde : C.rosso, "stroke-width": 3, "stroke-dasharray": "7 5" }, g);
      S("text", { x: (xa + xs) / 2, y: y - 58, "text-anchor": "middle", "font-size": 15, "font-weight": 800, fill: b >= 0 ? C.verde : C.rosso }, g,
        b === 0 ? "nessuno spostamento" : `b = ${fz(b)} → ${Math.abs(b)} ${Math.abs(b) === 1 ? "passo" : "passi"} verso ${b > 0 ? "destra" : "sinistra"}`);
      if (!stampa) { g.style.cssText = "opacity:0;transition:opacity .5s .15s"; requestAnimationFrame(() => requestAnimationFrame(() => (g.style.opacity = 1))); }
      S("circle", { cx: xa, cy: y, r: 9, fill: C.blu, stroke: "#fff", "stroke-width": 2.5 }, s);
      S("circle", { cx: xs, cy: y, r: 11, fill: C.arancio, stroke: "#fff", "stroke-width": 3 }, s);
      const tipo = a === 0 || b === 0 ? "" : (a > 0) === (b > 0) ? "addendi <b>concordi</b> → si sommano i valori assoluti, segno comune"
        : "addendi <b>discordi</b> → differenza dei valori assoluti, segno di quello con valore assoluto maggiore";
      lett.innerHTML = `${fp(a)} + ${fp(b)} = <b style="color:${C.arancio}">${fz(a + b)}</b> &emsp; ${tipo}`;
    }
    disegna();
  };

  /* 14 ─ Regola del prodotto dei segni: la regolarità della tabellina */
  ANIM.segni = function (el, stampa) {
    let k = stampa ? 8 : 4, f = -3;
    const box = H("div", {}, el), lett = H("div", { class: "lettura" }, el);
    const com = H("div", { class: "comandi" }, el);
    cursoreZ(com, "fattore fisso", -5, -1, f, v => { f = v; disegna(); });
    if (!stampa) {
      bottone(com, "Riga successiva ▼", () => { if (k < 8) { k++; disegna(); } });
      bottone(com, "↺ Ricomincia", () => { k = 4; disegna(); }, true);
    }
    function disegna() {
      box.innerHTML = "";
      const W = 760, dy = 21, H0 = 30 + 9 * dy;
      const s = svg(box, W, H0);
      for (let i = 0; i <= k; i++) {
        const m = 4 - i, y = 24 + i * dy, p = f * m, neg = m < 0;
        S("text", { x: 250, y, "text-anchor": "end", "font-size": 17, "font-weight": 700, fill: C.testo }, s, `(${fz(f)}) · ${m ? "(" + fz(m) + ")" : "0"} =`);
        S("text", { x: 262, y, "font-size": 17, "font-weight": 800, fill: p > 0 ? C.verde : p < 0 ? C.rosso : C.testo }, s, fz(p));
        if (i > 0) S("text", { x: 330, y: y - 4, "font-size": 13, fill: C.viola, "font-weight": 700 }, s, `↓ ${fz(-f)}`);
        if (neg) S("rect", { x: 70, y: y - 16, width: 230, height: 21, fill: C.verdec, opacity: .5 }, s);
      }
      S("text", { x: 420, y: 40, "font-size": 15, fill: C.testo }, s, "Quando il secondo fattore");
      S("text", { x: 420, y: 60, "font-size": 15, fill: C.testo }, s, "diminuisce di 1, il prodotto");
      S("text", { x: 420, y: 80, "font-size": 15, fill: C.viola, "font-weight": 800 }, s, `aumenta di ${-f} ogni volta.`);
      if (k > 4) {
        S("text", { x: 420, y: 130, "font-size": 15, fill: C.verde, "font-weight": 800 }, s, "Continuando la regolarità oltre lo 0,");
        S("text", { x: 420, y: 150, "font-size": 15, fill: C.verde, "font-weight": 800 }, s, "negativo per negativo dà positivo!");
      }
      lett.innerHTML = k <= 4 ? "Premi <b>Riga successiva</b> e prova a indovinare il risultato prima di vederlo."
        : `${fp(f)} · ${fp(4 - k)} = <b style="color:${C.verde}">${fz(f * (4 - k))}</b> &emsp; due fattori negativi (concordi) → prodotto <b>positivo</b>`;
    }
    disegna();
  };

  /* 15 ─ Il segno di una potenza */
  ANIM.potenza = function (el) {
    let b = -2, n = 3;
    const box = H("div", {}, el), lett = H("div", { class: "lettura" }, el);
    const com = H("div", { class: "comandi" }, el);
    cursoreZ(com, "base", -5, 5, b, v => { b = v; disegna(); });
    cursore(com, "esponente", 0, 7, n, v => { n = v; disegna(); });
    function disegna() {
      box.innerHTML = "";
      const W = 760, s = svg(box, W, 120), r = 22, sp = 70, x0 = W / 2 - ((Math.max(n, 1) - 1) * sp) / 2;
      if (n === 0) S("text", { x: W / 2, y: 60, "text-anchor": "middle", "font-size": 18, "font-weight": 700, fill: C.testo }, s, b === 0 ? "0⁰ non è definita" : "nessun fattore, per definizione la potenza vale +1");
      for (let i = 0; i < n; i++) {
        const x = x0 + i * sp, g = S("g", {}, s);
        S("circle", { cx: x, cy: 50, r, fill: b < 0 ? "#f6d4d2" : b > 0 ? C.bluc : "#eee", stroke: b < 0 ? C.rosso : C.blu, "stroke-width": 2.5 }, g);
        S("text", { x, y: 57, "text-anchor": "middle", "font-size": 17, "font-weight": 800, fill: b < 0 ? C.rosso : C.blu }, g, fz(b));
        if (i < n - 1) S("text", { x: x + sp / 2, y: 56, "text-anchor": "middle", "font-size": 22, fill: C.testo }, s, "·");
        if (b < 0) S("text", { x, y: 100, "text-anchor": "middle", "font-size": 13, "font-weight": 700, fill: C.rosso }, s, `${i + 1}° segno −`);
      }
      const v = b === 0 && n === 0 ? null : Math.pow(b, n);
      const motivo = b >= 0 || n === 0 ? (b > 0 ? "base positiva → potenza positiva" : b === 0 ? "base 0 → la potenza vale 0" : "")
        : n % 2 ? `${n} fattori negativi, un numero <b>dispari</b> → potenza <b style="color:${C.rosso}">negativa</b>` : `${n} fattori negativi, un numero <b>pari</b> → potenza <b style="color:${C.verde}">positiva</b>`;
      lett.innerHTML = v === null ? "0<sup>0</sup> non è definita" : `${fp(b)}<sup>${n}</sup> = <b>${fz(v)}</b> &emsp; ${motivo}`;
    }
    disegna();
  };

  /* 16 ─ Leggi di monotonia: moltiplicare una disuguaglianza */
  ANIM.monotonia = function (el) {
    let a = -1, b = 3, c = -2;
    const box = H("div", {}, el), lett = H("div", { class: "lettura" }, el);
    const com = H("div", { class: "comandi" }, el);
    cursoreZ(com, "a =", -4, 4, a, v => { a = v; disegna(); });
    cursoreZ(com, "b =", -4, 4, b, v => { b = v; disegna(); });
    cursoreZ(com, "moltiplico per c =", -3, 3, c, v => { c = v; disegna(); });
    const rel = (x, y) => (x < y ? "&lt;" : x > y ? "&gt;" : "=");
    function disegna() {
      box.innerHTML = "";
      const W = 760, u = 30, x0 = W / 2, s = svg(box, W, 200);
      [[60, a, b, "prima"], [150, a * c, b * c, "dopo"]].forEach(([y, p, q, et], j) => {
        retta(s, x0, u, y, -12, 12);
        S("text", { x: 14, y: y - 18, "font-size": 13, "font-weight": 700, fill: C.grigio }, s, et === "prima" ? "a e b" : "a·c e b·c");
        S("circle", { cx: x0 + p * u, cy: y, r: 10, fill: C.blu, stroke: "#fff", "stroke-width": 3 }, s);
        S("text", { x: x0 + p * u, y: y - 16, "text-anchor": "middle", "font-size": 14, "font-weight": 800, fill: C.blu }, s, j ? "a·c" : "a");
        S("circle", { cx: x0 + q * u, cy: y, r: 10, fill: C.arancio, stroke: "#fff", "stroke-width": 3 }, s);
        S("text", { x: x0 + q * u, y: y - 16 - (p === q ? 16 : 0), "text-anchor": "middle", "font-size": 14, "font-weight": 800, fill: C.arancio }, s, j ? "b·c" : "b");
      });
      const r1 = rel(a, b), r2 = rel(a * c, b * c), cambia = a !== b && c !== 0 && r1 !== r2;
      lett.innerHTML = `${fz(a)} ${r1} ${fz(b)} &ensp;→&ensp; ${fp(a)} · ${fp(c)} ${r2} ${fp(b)} · ${fp(c)}, cioè <b>${fz(a * c)} ${r2} ${fz(b * c)}</b> &emsp; `
        + (c === 0 ? `con c = 0 i due membri diventano uguali, per questo c deve essere diverso da 0`
          : a === b ? "l'uguaglianza resta vera" : cambia ? `<b style="color:${C.rosso}">c negativo → il verso si è invertito</b>` : `<b style="color:${C.verde}">c positivo → il verso resta lo stesso</b>`);
    }
    disegna();
  };

  /* ======================= CAPITOLO 3 – NUMERI RAZIONALI ======================= */
  const FR = (n, d) => `<span class="fr"><span>${n}</span><span>${d}</span></span>`;
  const FRs = (n, d) => { const g = mcd(Math.abs(n), d), a = n / g, b = d / g; return b === 1 ? (a < 0 ? "−" + (-a) : "" + a) : (a < 0 ? "−" : "") + FR(Math.abs(a), b); };

  /* 21 ─ Che cosa indica una frazione: barre divise in d parti, n parti colorate */
  ANIM.frazione = function (el) {
    let n = 3, d = 4;
    const box = H("div", {}, el), lett = H("div", { class: "lettura" }, el), com = H("div", { class: "comandi" }, el);
    cursore(com, "numeratore n", 0, 12, n, v => { n = v; disegna(); });
    cursore(com, "denominatore d", 1, 8, d, v => { d = v; disegna(); });
    function disegna() {
      box.innerHTML = "";
      const nb = Math.max(1, Math.ceil(n / d)), W = 760, bw = 680 / Math.max(nb, 1) - 14, h = 54;
      const s = svg(box, W, 120);
      for (let b = 0; b < nb; b++) {
        const x0 = 40 + b * (bw + 14);
        for (let k = 0; k < d; k++) {
          const pieno = b * d + k < n;
          S("rect", { x: x0 + k * bw / d, y: 28, width: bw / d, height: h, fill: pieno ? C.aranc : "#fff", stroke: C.testo, "stroke-width": 1.6 }, s);
        }
        S("text", { x: x0 + bw / 2, y: 104, "text-anchor": "middle", "font-size": 14, fill: C.grigio }, s, `intero ${b + 1}`);
      }
      const tipo = n % d === 0 ? "apparente: rappresenta un numero intero, " + (n / d) : (n < d ? "propria: è minore dell'intero" : "impropria: è maggiore dell'intero");
      lett.innerHTML = `Ogni intero è diviso in <b>${d}</b> parti uguali e se ne prendono <b>${n}</b>. La frazione ${FR(n, d)} è <b>${tipo}</b>.`;
    }
    disegna();
  };

  /* 22 ─ Frazioni equivalenti: moltiplico numeratore e denominatore per k */
  ANIM.equivalenti = function (el) {
    let n = 2, d = 3, k = 2;
    const box = H("div", {}, el), lett = H("div", { class: "lettura" }, el), com = H("div", { class: "comandi" }, el);
    cursore(com, "n", 1, 5, n, v => { n = Math.min(v, d); disegna(); });
    cursore(com, "d", 2, 6, d, v => { d = v; if (n > d) n = d; disegna(); });
    cursore(com, "fattore k", 1, 5, k, v => { k = v; disegna(); });
    function barra(s, y, num, den, col) {
      for (let i = 0; i < den; i++) S("rect", { x: 40 + i * 680 / den, y, width: 680 / den, height: 40, fill: i < num ? col : "#fff", stroke: C.testo, "stroke-width": 1.4 }, s);
    }
    function disegna() {
      box.innerHTML = ""; const s = svg(box, 760, 120);
      barra(s, 10, n, d, C.aranc); barra(s, 66, n * k, d * k, C.bluc);
      lett.innerHTML = `${FR(n, d)} ∼ ${FR(n + " · " + k, d + " · " + k)} = ${FR(n * k, d * k)} &emsp; la parte colorata è la stessa: le due frazioni sono <b>equivalenti</b> (prodotti in croce ${n} · ${d * k} = ${d} · ${n * k} = ${n * d * k}).`;
    }
    disegna();
  };

  /* 23 ─ Un numero razionale sulla retta orientata */
  ANIM.rettaq = function (el) {
    let n = -7, d = 4;
    const box = H("div", {}, el), lett = H("div", { class: "lettura" }, el), com = H("div", { class: "comandi" }, el);
    cursore(com, "numeratore", -12, 12, n, v => { n = v; disegna(); });
    cursore(com, "denominatore", 1, 6, d, v => { d = v; disegna(); });
    function disegna() {
      box.innerHTML = "";
      const W = 760, x0 = W / 2, u = 110, y = 90, s = svg(box, W, 150);
      S("line", { x1: 20, y1: y, x2: W - 14, y2: y, stroke: C.testo, "stroke-width": 2.5 }, s);
      S("path", { d: `M${W - 12} ${y} l-12 -7 v14 z`, fill: C.testo }, s);
      for (let i = -3 * d; i <= 3 * d; i++) {
        const x = x0 + i * u / d, intero = i % d === 0;
        S("line", { x1: x, y1: y - (intero ? 10 : 5), x2: x, y2: y + (intero ? 10 : 5), stroke: intero ? C.testo : C.grigio, "stroke-width": intero ? 2 : 1.2 }, s);
        if (intero) S("text", { x, y: y + 32, "text-anchor": "middle", "font-size": 16, "font-weight": 700, fill: C.testo }, s, i / d < 0 ? "−" + (-i / d) : i / d);
      }
      const v = n / d, xv = x0 + Math.max(-3.2, Math.min(3.2, v)) * u;
      S("path", { d: `M${x0} ${y - 22} L${xv} ${y - 22}`, stroke: v < 0 ? C.verde : C.arancio, "stroke-width": 5, opacity: .8 }, s);
      S("circle", { cx: xv, cy: y, r: 10, fill: C.rosso, stroke: "#fff", "stroke-width": 3 }, s);
      const fuori = Math.abs(v) > 3 ? " (fuori dal disegno)" : "";
      lett.innerHTML = `${FRs(n, d)} ${n === 0 ? "coincide con l'origine" : `si trova a <b>${FRs(Math.abs(n), d)}</b> unità ${v < 0 ? "a sinistra" : "a destra"} dello 0${fuori}`}. Ogni unità è divisa in ${d} parti e si contano ${Math.abs(n)} parti ${v < 0 ? "verso sinistra" : "verso destra"}.`;
    }
    disegna();
  };

  /* 24 ─ Il prodotto di due frazioni come area */
  ANIM.prodottofrazioni = function (el) {
    let a = 2, b = 3, c = 4, d = 5;
    const box = H("div", {}, el), lett = H("div", { class: "lettura" }, el), com = H("div", { class: "comandi" }, el);
    cursore(com, "a", 1, 6, a, v => { a = Math.min(v, b); disegna(); });
    cursore(com, "b", 1, 6, b, v => { b = v; if (a > b) a = b; disegna(); });
    cursore(com, "c", 1, 6, c, v => { c = Math.min(v, d); disegna(); });
    cursore(com, "d", 1, 6, d, v => { d = v; if (c > d) c = d; disegna(); });
    function disegna() {
      box.innerHTML = ""; const L0 = 220, x0 = 270, y0 = 16, s = svg(box, 760, 260);
      for (let i = 0; i < d; i++) for (let j = 0; j < b; j++) {
        const dentro = i < c && j < a;
        S("rect", { x: x0 + i * L0 / d, y: y0 + L0 - (j + 1) * L0 / b, width: L0 / d, height: L0 / b, fill: dentro ? C.aranc : (i < c ? "#fdf0e4" : (j < a ? "#e7eefb" : "#fff")), stroke: C.testo, "stroke-width": 1.2 }, s);
      }
      S("rect", { x: x0, y: y0, width: L0, height: L0, fill: "none", stroke: C.testo, "stroke-width": 2.5 }, s);
      S("text", { x: x0 + L0 * c / d / 2, y: y0 + L0 + 22, "text-anchor": "middle", "font-size": 15, "font-weight": 800, fill: C.arancio }, s, `${c}/${d}`);
      S("text", { x: x0 - 12, y: y0 + L0 - L0 * a / b / 2 + 5, "text-anchor": "end", "font-size": 15, "font-weight": 800, fill: C.blu }, s, `${a}/${b}`);
      S("text", { x: x0 + L0 + 16, y: y0 + 20, "font-size": 13, fill: C.grigio }, s, "lato 1");
      lett.innerHTML = `Il quadrato di lato 1 è diviso in ${b} · ${d} = <b>${b * d}</b> rettangolini; quelli colorati sono ${a} · ${c} = <b>${a * c}</b>. Quindi ${FR(a, b)} · ${FR(c, d)} = ${FR(a * c, b * d)}${mcd(a * c, b * d) > 1 ? " = " + FRs(a * c, b * d) : ""}.`;
    }
    disegna();
  };

  /* 25 ─ Dalla frazione al numero decimale: i resti si ripetono */
  ANIM.periodo = function (el) {
    let n = 17, d = 7;
    const box = H("div", {}, el), lett = H("div", { class: "lettura" }, el), com = H("div", { class: "comandi" }, el);
    cursore(com, "numeratore", 1, 40, n, v => { n = v; disegna(); });
    cursore(com, "denominatore", 2, 30, d, v => { d = v; disegna(); });
    function disegna() {
      const ip = Math.floor(n / d); let r = n % d; const cifre = [], resti = [], visti = {};
      while (r && visti[r] === undefined && cifre.length < 40) { visti[r] = cifre.length; resti.push(r); r *= 10; cifre.push(Math.floor(r / d)); r %= d; }
      let testo, tipo;
      if (!r) { testo = ip + (cifre.length ? "," + cifre.join("") : ""); tipo = cifre.length ? "decimale <b>finito</b>: a un certo punto il resto è 0" : "numero <b>intero</b>: la frazione è apparente"; }
      else { const k = visti[r]; testo = ip + "," + cifre.slice(0, k).join("") + `<span class="per">${cifre.slice(k).join("")}</span>`;
        tipo = `decimale <b>periodico ${k ? "misto" : "semplice"}</b>: il resto ${r} è già comparso, da lì le cifre si ripetono`; }
      box.innerHTML = `<div class="passo-expr" style="font-size:1.25rem;text-align:center">${FR(n, d)} = ${n} : ${d} = <b>${testo}</b></div>
        <p style="text-align:center;margin:.4em 0 0">resti incontrati: ${resti.map(x => x === r ? `<b style="color:${C.rosso}">${x}</b>` : x).join(", ") || "nessuno"}</p>`;
      lett.innerHTML = tipo + `. I resti possibili sono minori di ${d}, quindi al massimo ${d - 1} diversi da 0.`;
    }
    disegna();
  };

  /* 26 ─ La percentuale su una griglia 10 × 10 */
  ANIM.percentuale = function (el) {
    let p = 35, tot = 240;
    const box = H("div", {}, el), lett = H("div", { class: "lettura" }, el), com = H("div", { class: "comandi" }, el);
    cursore(com, "percentuale", 0, 100, p, v => { p = v; disegna(); });
    cursore(com, "totale", 20, 500, tot, v => { tot = v; disegna(); });
    function disegna() {
      box.innerHTML = ""; const s = svg(box, 760, 230), q = 20, x0 = 270;
      for (let i = 0; i < 100; i++) S("rect", { x: x0 + (i % 10) * q, y: 10 + Math.floor(i / 10) * q, width: q, height: q, fill: i < p ? C.aranc : "#fff", stroke: C.grigio, "stroke-width": 1 }, s);
      S("rect", { x: x0, y: 10, width: 10 * q, height: 10 * q, fill: "none", stroke: C.testo, "stroke-width": 2 }, s);
      const val = Math.round(p * tot) / 100;
      lett.innerHTML = `${p}% = ${FR(p, 100)}${mcd(p, 100) > 1 && p ? " = " + FRs(p, 100) : ""} = ${(p / 100).toString().replace(".", ",")} &emsp; il ${p}% di ${tot} è ${FR(p, 100)} · ${tot} = <b>${String(val).replace(".", ",")}</b>`;
    }
    disegna();
  };

  /* 27 ─ Notazione scientifica: sposto la virgola */
  ANIM.notazione = function (el) {
    let e = 5;
    const cifre = "345";
    const box = H("div", {}, el), lett = H("div", { class: "lettura" }, el), com = H("div", { class: "comandi" }, el);
    cursore(com, "esponente n", -6, 8, e, v => { e = v; disegna(); });
    function decim(n) {
      const s0 = cifre[0] + "," + cifre.slice(1);
      if (n === 0) return s0;
      if (n > 0) { let c = cifre.slice(0) + "0".repeat(Math.max(0, n + 1 - cifre.length)); const intera = c.slice(0, n + 1), dec = c.slice(n + 1); return grp(intera) + (dec ? "," + dec : ""); }
      return "0," + "0".repeat(-n - 1) + cifre;
    }
    function grp(s) { return s.replace(/\B(?=(\d{3})+(?!\d))/g, " "); }
    function disegna() {
      box.innerHTML = `<div class="passo-expr" style="font-size:1.3rem;text-align:center">3,45 · 10<sup>${e < 0 ? "−" + (-e) : e}</sup> = <b>${decim(e)}</b></div>`;
      lett.innerHTML = e === 0 ? "10<sup>0</sup> = 1: la virgola resta dov'è." : `Moltiplicare per 10<sup>${e < 0 ? "−" + (-e) : e}</sup> sposta la virgola di <b>${Math.abs(e)}</b> ${Math.abs(e) === 1 ? "posto" : "posti"} verso ${e > 0 ? "destra (numero grande)" : "sinistra (numero piccolo)"}. Poiché il coefficiente 3,45 è minore di 5,5, il numero è più vicino a 10<sup>${e < 0 ? "−" + (-e) : e}</sup> che a 10<sup>${e + 1 < 0 ? "−" + (-(e + 1)) : e + 1}</sup>, quindi l'ordine di grandezza è 10<sup>${e < 0 ? "−" + (-e) : e}</sup>.`;
    }
    disegna();
  };


  /* ===== CAPITOLO 4 ===== */
  /* 28 ─ Costruisci un sottoinsieme: ogni elemento dentro (1) o fuori (0) */
  ANIM.sottoinsiemi = function (el, stampa) {
    const el4 = [1, 2, 3, 4]; let dentro = stampa ? [true, false, true, false] : [true, false, true, false];
    const box = H("div", {}, el), lett = H("div", { class: "lettura" }, el), com = H("div", { class: "comandi" }, el);
    el4.forEach((x, i) => bottone(com, "elemento " + x, () => { dentro[i] = !dentro[i]; disegna(); }, true));
    function disegna() {
      box.innerHTML = ""; const s = svg(box, 520, 150);
      S("ellipse", { cx: 200, cy: 78, rx: 180, ry: 64, fill: "#fff", stroke: C.blu, "stroke-width": 2 }, s);
      S("text", { x: 34, y: 28, "font-size": 18, "font-style": "italic", "font-weight": 700, fill: C.blu, "font-family": "serif" }, s, "A");
      el4.forEach((x, i) => {
        const cx = 80 + i * 80;
        S("circle", { cx, cy: 78, r: 24, fill: dentro[i] ? C.aranc : "#fff", stroke: dentro[i] ? C.arancio : C.grigio, "stroke-width": 2 }, s);
        S("text", { x: cx, y: 85, "font-size": 20, "text-anchor": "middle", fill: C.testo, "font-family": "serif" }, s, x);
        S("text", { x: 430 + i * 20, y: 85, "font-size": 22, "text-anchor": "middle", fill: dentro[i] ? C.arancio : C.grigio, "font-family": "monospace", "font-weight": 700 }, s, dentro[i] ? 1 : 0);
      });
      S("text", { x: 460, y: 50, "font-size": 12, "text-anchor": "middle", fill: C.testo, "font-family": "serif" }, s, "codice");
      const B = el4.filter((x, i) => dentro[i]), cod = dentro.map(d => d ? 1 : 0).join("");
      lett.innerHTML = `<i>B</i> = ${B.length ? "{" + B.join(", ") + "}" : "∅"} &emsp; codice ${cod} &emsp; ` +
        (B.length === 0 ? "è l'insieme vuoto, sottoinsieme improprio. " : B.length === 4 ? "è <i>A</i> stesso, sottoinsieme improprio. " : "è un sottoinsieme proprio di <i>A</i>. ") +
        `Ogni elemento ha 2 scelte, quindi i sottoinsiemi di <i>A</i> sono 2<sup>4</sup> = 16.`;
    }
    disegna();
  };

  /* 29 ─ Le operazioni fra insiemi sul diagramma di Eulero-Venn */
  ANIM.operazioni = function (el, stampa) {
    const U = [1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 18], A = [1, 2, 3, 4, 6, 12], B = [1, 2, 3, 6, 9, 18];
    const pos = { 4: [120, 70], 12: [112, 112], 1: [200, 56], 2: [214, 94], 3: [200, 128], 6: [186, 94], 9: [282, 78], 18: [290, 116], 5: [44, 40], 7: [372, 44], 8: [372, 150] };
    const OP = [["A ∩ B", (a, b) => a && b], ["A ∪ B", (a, b) => a || b], ["A − B", (a, b) => a && !b], ["B − A", (a, b) => b && !a],
      ["complementare di A", (a, b) => !a], ["complementare di A ∪ B", (a, b) => !(a || b)]];
    let k = 0; let n = 0;
    const box = H("div", {}, el), lett = H("div", { class: "lettura" }, el), com = H("div", { class: "comandi" }, el);
    OP.forEach((o, i) => bottone(com, o[0], () => { k = i; disegna(); }, true));
    function disegna() {
      box.innerHTML = ""; const s = svg(box, 420, 180); n++;
      const id = "op" + Math.random().toString(36).slice(2, 7);
      const d = S("defs", {}, s);
      const zone = [[true, true], [true, false], [false, true], [false, false]];
      const cA = { cx: 155, cy: 90, r: 72 }, cB = { cx: 245, cy: 90, r: 72 };
      zone.forEach(([a, b], z) => {
        if (!OP[k][1](a, b)) return;
        let g = S("g", {}, s), inner = g;
        if (a) { const cp = S("clipPath", { id: id + "a" + z }, d); S("circle", cA, cp); inner = S("g", { "clip-path": `url(#${id}a${z})` }, inner); }
        if (b) { const cp = S("clipPath", { id: id + "b" + z }, d); S("circle", cB, cp); inner = S("g", { "clip-path": `url(#${id}b${z})` }, inner); }
        if (!a || !b) {
          const m = S("mask", { id: id + "m" + z }, d); S("rect", { x: 0, y: 0, width: 420, height: 180, fill: "#fff" }, m);
          if (!a) S("circle", Object.assign({ fill: "#000" }, cA), m); if (!b) S("circle", Object.assign({ fill: "#000" }, cB), m);
          inner.setAttribute("mask", `url(#${id}m${z})`);
        }
        S("rect", { x: 0, y: 0, width: 420, height: 180, fill: "#f6d58e" }, inner);
      });
      S("rect", { x: 2, y: 2, width: 416, height: 176, fill: "none", stroke: C.testo, "stroke-width": 1.5 }, s);
      S("text", { x: 12, y: 22, "font-size": 17, "font-style": "italic", "font-weight": 700, fill: C.testo, "font-family": "serif" }, s, "U");
      S("circle", Object.assign({ fill: "none", stroke: C.blu, "stroke-width": 2.2 }, cA), s);
      S("circle", Object.assign({ fill: "none", stroke: "#c8621f", "stroke-width": 2.2 }, cB), s);
      S("text", { x: 96, y: 30, "font-size": 18, "font-style": "italic", "font-weight": 700, fill: C.blu, "font-family": "serif" }, s, "A");
      S("text", { x: 304, y: 30, "font-size": 18, "font-style": "italic", "font-weight": 700, fill: "#c8621f", "font-family": "serif" }, s, "B");
      const ris = U.filter(x => OP[k][1](A.includes(x), B.includes(x)));
      U.forEach(x => S("text", { x: pos[x][0], y: pos[x][1] + 6, "font-size": 16, "text-anchor": "middle", fill: ris.includes(x) ? C.rosso : C.testo, "font-weight": ris.includes(x) ? 700 : 400, "font-family": "serif" }, s, x));
      const nome = ["<i>A</i> ∩ <i>B</i>", "<i>A</i> ∪ <i>B</i>", "<i>A</i> − <i>B</i>", "<i>B</i> − <i>A</i>", '<span class="compl"><i>A</i></span>', '<span class="compl"><i>A</i> ∪ <i>B</i></span>'][k];
      lett.innerHTML = `${nome} = ${ris.length ? "{" + ris.join(", ") + "}" : "∅"} &emsp; <i>A</i> = divisori di 12, <i>B</i> = divisori di 18, <i>U</i> = {1, 2, …, 9, 12, 18}.`;
    }
    disegna();
  };

  /* 30 ─ Connettivi e interruttori: in serie (e), in parallelo (o) */
  ANIM.circuito = function (el, stampa) {
    let p = true, q = stampa ? false : true, serie = true;
    const box = H("div", {}, el), lett = H("div", { class: "lettura" }, el), com = H("div", { class: "comandi" }, el);
    bottone(com, "interruttore p", () => { p = !p; disegna(); }, true);
    bottone(com, "interruttore q", () => { q = !q; disegna(); }, true);
    bottone(com, "serie / parallelo", () => { serie = !serie; disegna(); });
    function interr(s, x, y, chiuso, nome) {
      S("circle", { cx: x, cy: y, r: 4, fill: "#fff", stroke: C.testo, "stroke-width": 2 }, s);
      S("circle", { cx: x + 50, cy: y, r: 4, fill: "#fff", stroke: C.testo, "stroke-width": 2 }, s);
      S("line", { x1: x + 4, y1: y, x2: chiuso ? x + 46 : x + 40, y2: chiuso ? y : y - 22, stroke: chiuso ? C.verde : C.rosso, "stroke-width": 4 }, s);
      S("text", { x: x + 25, y: y - 26, "font-size": 16, "font-style": "italic", "text-anchor": "middle", fill: C.blu, "font-family": "serif", "font-weight": 700 }, s, nome);
      S("text", { x: x + 25, y: y + 22, "font-size": 13, "text-anchor": "middle", fill: chiuso ? C.verde : C.rosso, "font-family": "serif", "font-weight": 700 }, s, chiuso ? "chiuso · V" : "aperto · F");
    }
    function disegna() {
      box.innerHTML = ""; const s = svg(box, 560, 190);
      const acceso = serie ? p && q : p || q, L = (d, c) => S("path", { d, fill: "none", stroke: c || C.testo, "stroke-width": 2.4 }, s);
      S("rect", { x: 20, y: 90, width: 24, height: 34, fill: "#fff", stroke: C.testo, "stroke-width": 2 }, s);
      S("text", { x: 32, y: 112, "font-size": 14, "text-anchor": "middle", "font-family": "serif" }, s, "+");
      if (serie) { L("M32 90 V50 H100"); interr(s, 100, 50, p, "p"); L("M154 50 H220"); interr(s, 220, 50, q, "q"); L("M274 50 H300 V120 H338 M382 120 H400 V170 H32 V124"); }
      else { L("M32 90 V80 H80 M80 40 V120 M80 40 H120 M80 120 H120"); interr(s, 120, 40, p, "p"); interr(s, 120, 120, q, "q"); L("M174 40 H220 V120 H174 M220 80 H300 V120 H338 M382 120 H400 V170 H32 V124"); }
      S("circle", { cx: 360, cy: 120, r: 22, fill: acceso ? "#ffd84a" : "#e9e6df", stroke: C.testo, "stroke-width": 2 }, s);
      if (acceso) for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; S("line", { x1: 360 + 28 * Math.cos(a), y1: 120 + 28 * Math.sin(a), x2: 360 + 38 * Math.cos(a), y2: 120 + 38 * Math.sin(a), stroke: "#e0a800", "stroke-width": 3 }, s); }
      const op = serie ? "∧" : "∨", vf = b => b ? "V" : "F";
      let t = `<table class="tab tav" style="margin:0"><tr><th><i>p</i></th><th><i>q</i></th><th><i>p</i> ${op} <i>q</i></th></tr>`;
      [[true, true], [true, false], [false, true], [false, false]].forEach(([a, b]) => { const r = serie ? a && b : a || b;
        t += `<tr${a === p && b === q ? ' class="evid"' : ""}><td>${vf(a)}</td><td>${vf(b)}</td><td>${vf(r)}</td></tr>`; });
      const fo = document.createElementNS(NS, "foreignObject"); fo.setAttribute("x", 420); fo.setAttribute("y", 14); fo.setAttribute("width", 140); fo.setAttribute("height", 170);
      fo.innerHTML = `<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:14px">${t}</table></div>`; s.appendChild(fo);
      lett.innerHTML = `Interruttori in <b>${serie ? "serie" : "parallelo"}</b>, come <i>p</i> ${op} <i>q</i>. <i>p</i> è ${vf(p)}, <i>q</i> è ${vf(q)} &emsp; la lampadina è <b>${acceso ? "accesa (V)" : "spenta (F)"}</b>.`;
    }
    disegna();
  };


  /* ====================== CAPITOLO 5 ====================== */
  function freccia(s, x1, y1, x2, y2, col) {
    S("line", { x1, y1, x2, y2, stroke: col, "stroke-width": 2 }, s);
    const a = Math.atan2(y2 - y1, x2 - x1), L = 10, W = 4.5;
    S("polygon", { points: `${x2},${y2} ${x2 - L * Math.cos(a) + W * Math.sin(a)},${y2 - L * Math.sin(a) - W * Math.cos(a)} ${x2 - L * Math.cos(a) - W * Math.sin(a)},${y2 - L * Math.sin(a) + W * Math.cos(a)}`, fill: col }, s);
  }

  /* 31 ─ Relazione o funzione? Si cambiano le frecce che partono da ogni elemento di A */
  ANIM.relfun = function (el, stampa) {
    const A = [1, 2, 3, 4], B = ["a", "b", "c", "d"];
    const SCELTE = [[], [0], [1], [2], [3], [0, 1]];
    let st = [1, 2, 3, 4];
    const box = H("div", {}, el), lett = H("div", { class: "lettura" }, el), com = H("div", { class: "comandi" }, el);
    A.forEach((x, i) => bottone(com, "frecce da " + x, () => { st[i] = (st[i] + 1) % SCELTE.length; disegna(); }, true));
    bottone(com, "esempio biiettiva", () => { st = [2, 3, 4, 1]; disegna(); });
    function disegna() {
      box.innerHTML = ""; const s = svg(box, 420, 190);
      S("ellipse", { cx: 110, cy: 100, rx: 52, ry: 80, fill: "#eef3fb", stroke: C.blu, "stroke-width": 2 }, s);
      S("ellipse", { cx: 310, cy: 100, rx: 52, ry: 80, fill: "#fdf0e4", stroke: C.arancio, "stroke-width": 2 }, s);
      S("text", { x: 60, y: 26, "font-size": 18, "font-style": "italic", "font-weight": 700, fill: C.blu, "font-family": "serif" }, s, "A");
      S("text", { x: 352, y: 26, "font-size": 18, "font-style": "italic", "font-weight": 700, fill: C.arancio, "font-family": "serif" }, s, "B");
      const y = i => 46 + i * 36, arrivi = B.map(() => 0);
      A.forEach((x, i) => { S("text", { x: 100, y: y(i) + 6, "font-size": 17, "text-anchor": "middle", "font-family": "serif" }, s, x);
        S("circle", { cx: 122, cy: y(i), r: 3, fill: C.testo }, s); });
      B.forEach((b, j) => { S("text", { x: 320, y: y(j) + 6, "font-size": 17, "text-anchor": "middle", "font-family": "serif" }, s, b);
        S("circle", { cx: 298, cy: y(j), r: 3, fill: C.testo }, s); });
      A.forEach((x, i) => SCELTE[st[i]].forEach(j => { arrivi[j]++; freccia(s, 125, y(i), 294, y(j), SCELTE[st[i]].length > 1 ? C.rosso : C.verde); }));
      const senza = A.filter((x, i) => SCELTE[st[i]].length === 0), doppie = A.filter((x, i) => SCELTE[st[i]].length > 1);
      let t;
      if (senza.length || doppie.length) {
        t = "<b>Non è una funzione</b>, perché " + [senza.length ? "da " + senza.join(" e ") + " non parte nessuna freccia" : "", doppie.length ? "da " + doppie.join(" e ") + " partono due frecce" : ""].filter(Boolean).join(" e ") + ".";
      } else {
        const inj = arrivi.every(n => n <= 1), sur = arrivi.every(n => n >= 1);
        t = "<b>È una funzione</b>, da ogni elemento di <i>A</i> parte una sola freccia. " +
          (inj && sur ? "È <b>biiettiva</b>, a ogni elemento di <i>B</i> arriva esattamente una freccia." :
            (inj ? "È iniettiva" : "Non è iniettiva, a " + B.filter((b, j) => arrivi[j] > 1).join(" e ") + " arrivano più frecce") + ", " +
            (sur ? "è suriettiva." : "non è suriettiva, a " + B.filter((b, j) => !arrivi[j]).join(" e ") + " non arriva nessuna freccia."));
      }
      lett.innerHTML = t;
    }
    disegna();
  };

  /* 32 ─ Composizione: due macchine in fila, f(x) = x + 3 e g(x) = x² */
  ANIM.composizione = function (el, stampa) {
    let x = 2, prima_f = true;
    const box = H("div", {}, el), lett = H("div", { class: "lettura" }, el), com = H("div", { class: "comandi" }, el);
    const cx = cursore(com, "x =", -5, 5, x, v => { x = v; disegna(); }); cx.addEventListener("input", () => { cx.nextSibling.textContent = nf(+cx.value); });
    bottone(com, "scambia l'ordine", () => { prima_f = !prima_f; disegna(); });
    const f = t => t + 3, g = t => t * t, nf = t => (t < 0 ? "−" + (-t) : "" + t);
    function macchina(s, x0, nome, legge, col) {
      S("rect", { x: x0, y: 50, width: 110, height: 70, fill: "#fff", stroke: col, "stroke-width": 2.5 }, s);
      S("rect", { x: x0 + 10, y: 36, width: 90, height: 14, fill: col }, s);
      S("text", { x: x0 + 55, y: 82, "font-size": 20, "text-anchor": "middle", "font-style": "italic", "font-weight": 700, fill: col, "font-family": "serif" }, s, nome);
      S("text", { x: x0 + 55, y: 106, "font-size": 14, "text-anchor": "middle", fill: C.testo, "font-family": "serif" }, s, legge);
    }
    function disegna() {
      box.innerHTML = ""; const s = svg(box, 560, 160);
      const P = prima_f ? [["f", "aggiunge 3", f, C.blu], ["g", "eleva al quadrato", g, C.arancio]] : [["g", "eleva al quadrato", g, C.arancio], ["f", "aggiunge 3", f, C.blu]];
      const v1 = P[0][2](x), v2 = P[1][2](v1);
      macchina(s, 120, P[0][0], P[0][1], P[0][3]); macchina(s, 330, P[1][0], P[1][1], P[1][3]);
      [[30, 112, x], [236, 322, v1], [446, 520, v2]].forEach(([a, b, v], i) => {
        freccia(s, a + (i ? 0 : 40), 85, b, 85, C.testo);
        S("text", { x: i === 0 ? 40 : (a + b) / 2, y: 74, "font-size": 20, "text-anchor": "middle", "font-weight": 700, fill: i === 2 ? C.rosso : C.testo, "font-family": "serif" }, s, nf(v));
      });
      const nome = prima_f ? "(<i>g</i> ∘ <i>f</i>)" : "(<i>f</i> ∘ <i>g</i>)", altro = prima_f ? x * x + 3 : (x + 3) * (x + 3);
      lett.innerHTML = `${nome}(${nf(x)}) = ${prima_f ? "<i>g</i>(<i>f</i>" : "<i>f</i>(<i>g</i>"}(${nf(x)})) = ${prima_f ? "<i>g</i>" : "<i>f</i>"}(${nf(v1)}) = <b>${nf(v2)}</b>. ` +
        `Con l'ordine scambiato si otterrebbe ${nf(altro)}` + (altro === v2 ? ", lo stesso numero solo per caso." : ", quindi la composizione non è commutativa.");
    }
    disegna();
  };

  /* 33 ─ Grafici delle funzioni fondamentali, con i parametri che si muovono */
  ANIM.grafici = function (el, stampa) {
    let tipo = 0, m = 2, q = 1, k = 4, a = 1;
    const box = H("div", {}, el), lett = H("div", { class: "lettura" }, el), com = H("div", { class: "comandi" }, el), par = H("div", { class: "comandi" }, el);
    const TIPI = ["lineare", "inversa", "quadratica", "valore assoluto"];
    TIPI.forEach((t, i) => bottone(com, t, () => { tipo = i; comandi(); disegna(); }, true));
    const fmt = v => (v < 0 ? "−" : "") + String(Math.abs(v)).replace(".", ",");
    function slider(etich, min, max, step, val, cb) {
      const l = H("label", {}, par, etich + " ");
      const r = H("input", { type: "range", min, max, step, value: val }, l), o = H("output", {}, l, fmt(val));
      r.addEventListener("input", () => { let v = +r.value; if (v === 0 && min < 0) v = step; o.textContent = fmt(v); cb(v); disegna(); });
    }
    function comandi() {
      par.innerHTML = "";
      if (tipo === 0) { slider("m", -3, 3, 0.5, m, v => m = v); slider("q", -4, 4, 1, q, v => q = v); }
      if (tipo === 1) slider("k", -8, 8, 1, k, v => k = v);
      if (tipo === 2) slider("a", -2, 2, 0.5, a, v => a = v);
    }
    function disegna() {
      box.innerHTML = ""; const s = svg(box, 360, 300), u = 25, ox = 180, oy = 150; s.style.maxWidth = "420px"; s.style.display = "block"; s.style.margin = "0 auto";
      const X = t => ox + t * u, Y = t => oy - t * u;
      for (let i = -7; i <= 7; i++) S("line", { x1: X(i), y1: 0, x2: X(i), y2: 300, stroke: "#ece4d2" }, s);
      for (let j = -6; j <= 6; j++) S("line", { x1: 0, y1: Y(j), x2: 360, y2: Y(j), stroke: "#ece4d2" }, s);
      freccia(s, 0, oy, 356, oy, C.testo); freccia(s, ox, 300, ox, 4, C.testo);
      S("text", { x: 348, y: oy - 8, "font-size": 15, "font-style": "italic", "font-family": "serif" }, s, "x");
      S("text", { x: ox + 8, y: 16, "font-size": 15, "font-style": "italic", "font-family": "serif" }, s, "y");
      [-6, -4, -2, 2, 4, 6].forEach(i => { S("text", { x: X(i), y: oy + 15, "font-size": 11, "text-anchor": "middle", "font-family": "serif" }, s, i < 0 ? "−" + (-i) : i);
        S("text", { x: ox - 6, y: Y(i) + 4, "font-size": 11, "text-anchor": "end", "font-family": "serif" }, s, i < 0 ? "−" + (-i) : i); });
      const f = [t => m * t + q, t => (t === 0 ? NaN : k / t), t => a * t * t, t => Math.abs(t)][tipo];
      let d = "", su = false;
      for (let i = 0; i <= 720; i++) {
        const t = -7.2 + i * 0.02, v = f(t);
        if (!isFinite(v) || Math.abs(v) > 40 || (tipo === 1 && Math.abs(t) < 0.011)) { su = false; continue; }
        d += (su ? " L" : " M") + X(t).toFixed(1) + " " + Y(v).toFixed(1); su = true;
      }
      S("path", { d, fill: "none", stroke: C.blu, "stroke-width": 2.6 }, s);
      let t;
      if (tipo === 0) t = `<i>y</i> = ${fmt(m)} · <i>x</i> ${q < 0 ? "− " + (-q) : "+ " + q} &emsp; retta che passa per (0; ${fmt(q)}). ` + (m > 0 ? "Con <i>m</i> &gt; 0 è crescente." : "Con <i>m</i> &lt; 0 è decrescente.") + (q === 0 ? " Con <i>q</i> = 0 è una proporzionalità diretta." : "");
      if (tipo === 1) t = `<i>y</i> = ${fmt(k)} : <i>x</i> &emsp; iperbole con i rami nel ${k > 0 ? "primo e nel terzo" : "secondo e nel quarto"} quadrante. Il prodotto <i>x</i> · <i>y</i> vale sempre ${fmt(k)}.`;
      if (tipo === 2) t = `<i>y</i> = ${fmt(a)} · <i>x</i><sup>2</sup> &emsp; parabola con il vertice nell'origine, rivolta verso ${a > 0 ? "l'alto" : "il basso"}. ` + (Math.abs(a) > 1 ? "È più stretta di <i>y</i> = <i>x</i><sup>2</sup>." : Math.abs(a) < 1 ? "È più larga di <i>y</i> = <i>x</i><sup>2</sup>." : "");
      if (tipo === 3) t = "<i>y</i> = |<i>x</i>| &emsp; a destra dell'asse <i>y</i> coincide con <i>y</i> = <i>x</i>, a sinistra con <i>y</i> = −<i>x</i>. Non è mai negativa.";
      lett.innerHTML = t;
    }
    comandi(); disegna();
  };


  /* 34 ─ Valore numerico: si scelgono l'espressione e i valori delle lettere */
  ANIM.valorenum = function (el, stampa) {
    let k = 0, a = -2, b = 3;
    const nf = t => (t < 0 ? "−" + (-t) : "" + t), p = t => (t < 0 ? "(" + nf(t) + ")" : nf(t));
    const I = x => `<i>${x}</i>`;
    const E = [
      { t: `3${I("a")} + 2${I("b")}`, s: (a, b) => [`3 · ${p(a)} + 2 · ${p(b)}`, `${nf(3 * a)} + ${p(2 * b)}`], v: (a, b) => 3 * a + 2 * b },
      { t: `${I("a")}<sup>2</sup> − 2${I("b")}`, s: (a, b) => [`${p(a)}<sup>2</sup> − 2 · ${p(b)}`, `${nf(a * a)} − ${p(2 * b)}`], v: (a, b) => a * a - 2 * b },
      { t: `−${I("a")}<sup>2</sup> + ${I("ab")}`, s: (a, b) => [`−${p(a)}<sup>2</sup> + ${p(a)} · ${p(b)}`, `${nf(-a * a)} + ${p(a * b)}`], v: (a, b) => -a * a + a * b },
      { t: `2${I("a")}<sup>2</sup>${I("b")}`, s: (a, b) => [`2 · ${p(a)}<sup>2</sup> · ${p(b)}`, `2 · ${a * a} · ${p(b)}`], v: (a, b) => 2 * a * a * b }
    ];
    const box = H("div", { class: "lettura", style: "font-size:1.15rem;line-height:2.2;text-align:center" }, el);
    const com = H("div", { class: "comandi" }, el), par = H("div", { class: "comandi" }, el);
    E.forEach((e, i) => bottone(com, "", () => { k = i; disegna(); }, true).innerHTML = e.t);
    const ca = cursore(par, "a =", -5, 5, a, v => { a = v; disegna(); }), cb = cursore(par, "b =", -5, 5, b, v => { b = v; disegna(); });
    [ca, cb].forEach(c => c.addEventListener("input", () => { c.nextSibling.textContent = nf(+c.value); }));
    ca.nextSibling.textContent = nf(a);
    function disegna() {
      const e = E[k], st = e.s(a, b);
      box.innerHTML = `${e.t} &emsp; con ${I("a")} = ${nf(a)} e ${I("b")} = ${nf(b)}<br>${st[0]} = ${st[1]} = <b style="color:#c8373b">${nf(e.v(a, b))}</b>`;
    }
    disegna();
  };

  /* 35 ─ Tessere: si aggiungono monomi a, b, a² positivi e negativi e si raggruppano i simili */
  ANIM.tessere = function (el, stampa) {
    let T = stampa ? ["a", "a", "a2", "-a", "b", "a", "-b", "b"] : ["a", "a", "-a", "b", "a2"];
    const box = H("div", {}, el), lett = H("div", { class: "lettura" }, el), com = H("div", { class: "comandi" }, el);
    const NOMI = { a: "<i>a</i>", b: "<i>b</i>", a2: "<i>a</i><sup>2</sup>" };
    [["+ a", "a"], ["− a", "-a"], ["+ b", "b"], ["− b", "-b"], ["+ a²", "a2"], ["− a²", "-a2"]].forEach(([t, x]) =>
      bottone(com, t, () => { if (T.length < 14) T.push(x); disegna(); }, true));
    bottone(com, "ricomincia", () => { T = []; disegna(); });
    const dim = { a: [16, 46], b: [16, 30], a2: [46, 46] }, COL = { a: C.blu, b: C.verde, a2: C.viola };
    function tessera(s, x, y, t) {
      const neg = t[0] === "-", tipo = neg ? t.slice(1) : t, [w, h] = dim[tipo];
      S("rect", { x, y: y + 46 - h, width: w, height: h, fill: neg ? "#f6d5d5" : { a: C.bluc, b: C.verdec, a2: C.violac }[tipo], stroke: neg ? C.rosso : COL[tipo], "stroke-width": 2 }, s);
      S("text", { x: x + w / 2, y: y + 46 - h / 2 + 4, "font-size": 11, "text-anchor": "middle", "font-family": "serif", "font-style": "italic", fill: neg ? C.rosso : COL[tipo] }, s, (neg ? "−" : "") + (tipo === "a2" ? "a²" : tipo));
      return w;
    }
    function disegna() {
      box.innerHTML = ""; const s = svg(box, 560, 150);
      S("text", { x: 4, y: 14, "font-size": 12, "font-family": "serif", fill: C.grigio }, s, "come le hai messe");
      let x = 4; T.forEach(t => { x += tessera(s, x, 20, t) + 6; });
      S("text", { x: 4, y: 92, "font-size": 12, "font-family": "serif", fill: C.grigio }, s, "raggruppate (le tessere opposte si annullano)");
      const n = { a: 0, b: 0, a2: 0 }; T.forEach(t => { if (t[0] === "-") n[t.slice(1)]--; else n[t]++; });
      x = 4;
      ["a2", "a", "b"].forEach(tp => { for (let i = 0; i < Math.abs(n[tp]); i++) x += tessera(s, x, 98, (n[tp] < 0 ? "-" : "") + tp) + 4; if (n[tp]) x += 14; });
      const pezzo = (t, i) => { const neg = t[0] === "-", nome = NOMI[neg ? t.slice(1) : t]; return i === 0 ? (neg ? "−" : "") + nome : (neg ? " − " : " + ") + nome; };
      let somma = T.map(pezzo).join("") || "0", ris = "";
      ["a2", "a", "b"].forEach(tp => { const c = n[tp]; if (!c) return; const m = (Math.abs(c) === 1 ? "" : Math.abs(c)) + NOMI[tp];
        ris += ris === "" ? (c < 0 ? "−" : "") + m : (c < 0 ? " − " : " + ") + m; });
      lett.innerHTML = `${somma} = <b>${ris || "0"}</b>` + (Object.values(n).filter(c => c).length > 1 ? " &emsp; Le tessere di tipo diverso restano separate: il risultato è un polinomio." : "");
    }
    disegna();
  };

  /* 36 ─ Prodotto di due monomi come area di un rettangolo */
  ANIM.rettangolo = function (el, stampa) {
    let m = 3, n = 2, conB = true;
    const box = H("div", {}, el), lett = H("div", { class: "lettura" }, el), com = H("div", { class: "comandi" }, el);
    const cm = cursore(com, "coefficiente della base", 1, 6, m, v => { m = v; disegna(); });
    const cn = cursore(com, "coefficiente dell'altezza", 1, 4, n, v => { n = v; disegna(); });
    const bb = bottone(com, "altezza con a", () => { conB = !conB; bb.textContent = conB ? "altezza con a" : "altezza con b"; disegna(); }, true);
    function disegna() {
      box.innerHTML = ""; const s = svg(box, 420, 260); s.style.maxWidth = "440px"; s.style.margin = "0 auto";
      const ua = 52, ub = conB ? 34 : 52, x0 = 70, y0 = 14;
      for (let i = 0; i < m; i++) for (let j = 0; j < n; j++)
        S("rect", { x: x0 + i * ua, y: y0 + j * ub, width: ua, height: ub, fill: (i + j) % 2 ? C.bluc : "#e6eefb", stroke: C.blu, "stroke-width": 1.4 }, s);
      S("rect", { x: x0, y: y0, width: m * ua, height: n * ub, fill: "none", stroke: C.blu, "stroke-width": 3 }, s);
      const lb = conB ? "b" : "a";
      S("text", { x: x0 + m * ua / 2, y: y0 + n * ub + 22, "font-size": 17, "text-anchor": "middle", "font-family": "serif", fill: C.testo }, s).innerHTML = (m > 1 ? m : "") + '<tspan font-style="italic">a</tspan>';
      S("text", { x: x0 - 10, y: y0 + n * ub / 2 + 6, "font-size": 17, "text-anchor": "end", "font-family": "serif", fill: C.testo }, s).innerHTML = (n > 1 ? n : "") + `<tspan font-style="italic">${lb}</tspan>`;
      S("text", { x: x0 + ua / 2, y: y0 + ub / 2 + 5, "font-size": 13, "text-anchor": "middle", "font-family": "serif", "font-style": "italic", fill: C.blu }, s, conB ? "ab" : "a²");
      const K = m * n, A = "<i>a</i>", L = conB ? "<i>b</i>" : "<i>a</i>", P = conB ? "<i>ab</i>" : "<i>a</i><sup>2</sup>";
      lett.innerHTML = `${m > 1 ? m : ""}${A} · ${n > 1 ? n : ""}${L} = (${m} · ${n})${P} = <b>${K > 1 ? K : ""}${P}</b> &emsp; il rettangolo contiene ${K} ${K === 1 ? "rettangolino" : "rettangolini"} di area ${P}.`;
    }
    disegna();
  };

  /* 37 ─ Somma per differenza: dal quadrato a² si toglie b² e il pezzo si sposta a formare (a + b)(a − b) */
  ANIM.sommadiff = function (el, stampa) {
    let a = 7, b = 3, t = stampa ? 1 : 0, anim = null;
    const box = H("div", {}, el), lett = H("div", { class: "lettura" }, el), com = H("div", { class: "comandi" }, el);
    const ca = cursore(com, "a =", 3, 9, a, v => { a = v; if (b >= a) { b = a - 1; cb.value = b; cb.nextSibling.textContent = b; } disegna(); });
    const cb = cursore(com, "b =", 1, 8, b, v => { b = Math.min(v, a - 1); cb.value = b; cb.nextSibling.textContent = b; disegna(); });
    const bt = bottone(com, "sposta il pezzo 1", () => {
      const da = t, a_ = t < 0.5 ? 1 : 0, t0 = performance.now();
      if (anim) cancelAnimationFrame(anim);
      const passo = ora => { const k = Math.min(1, (ora - t0) / 900); t = da + (a_ - da) * (k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2); disegna(); if (k < 1) anim = requestAnimationFrame(passo); };
      anim = requestAnimationFrame(passo);
    });
    function disegna() {
      box.innerHTML = ""; const s = svg(box, 440, 270); s.style.maxWidth = "460px"; s.style.margin = "0 auto";
      const u = Math.min(24, 320 / (a + b), 210 / a), x0 = 92, y0 = 20, X = v => x0 + v * u, Y = v => y0 + v * u;
      S("rect", { x: X(a - b), y: Y(0), width: b * u, height: b * u, fill: "none", stroke: C.rosso, "stroke-width": 1.5, "stroke-dasharray": "5 4" }, s);
      S("text", { x: X(a - b / 2), y: Y(b / 2) + 5, "font-size": 14, "text-anchor": "middle", "font-family": "serif", fill: C.rosso }, s).innerHTML = '<tspan font-style="italic">b</tspan>²';
      S("rect", { x: X(0), y: Y(b), width: a * u, height: (a - b) * u, fill: C.bluc, stroke: C.blu, "stroke-width": 2 }, s);
      S("text", { x: X(a / 2), y: Y(b + (a - b) / 2) + 6, "font-size": 16, "text-anchor": "middle", "font-family": "serif", fill: C.blu }, s, "2");
      const cx = X((a - b) / 2) + (X(a + b / 2) - X((a - b) / 2)) * t, cy = Y(b / 2) + (Y(b + (a - b) / 2) - Y(b / 2)) * t;
      const g = S("g", { transform: `translate(${cx} ${cy}) rotate(${90 * t})` }, s);
      S("rect", { x: -(a - b) * u / 2, y: -b * u / 2, width: (a - b) * u, height: b * u, fill: C.aranc, stroke: C.arancio, "stroke-width": 2 }, g);
      S("text", { x: 0, y: 6, "font-size": 16, "text-anchor": "middle", "font-family": "serif", fill: C.arancio, transform: `rotate(${-90 * t})` }, g, "1");
      const et = (x, y, txt, anc) => S("text", { x, y, "font-size": 15, "text-anchor": anc || "middle", "font-family": "serif", fill: C.testo }, s).innerHTML = txt;
      const I = v => `<tspan font-style="italic">${v}</tspan>`;
      if (t > 0.98) { et(X((a + b) / 2), Y(a) + 22, `${I("a")} + ${I("b")} = ${a + b}`); et(X(0) - 6, Y(b + (a - b) / 2) + 5, `${I("a")} − ${I("b")} = ${a - b}`, "end"); }
      else if (t < 0.02) { et(X(a / 2), Y(a) + 22, `${I("a")} = ${a}`); et(X(a) + 6, Y(b / 2) + 5, `${I("b")} = ${b}`, "start"); }
      bt.textContent = t > 0.5 ? "rimetti a posto il pezzo 1" : "sposta il pezzo 1";
      lett.innerHTML = `<i>a</i><sup>2</sup> − <i>b</i><sup>2</sup> = ${a}<sup>2</sup> − ${b}<sup>2</sup> = ${a * a} − ${b * b} = <b>${a * a - b * b}</b> &emsp; (<i>a</i> + <i>b</i>)(<i>a</i> − <i>b</i>) = ${a + b} · ${a - b} = <b>${(a + b) * (a - b)}</b>`;
    }
    disegna();
  };

  /* 38 ─ Quadrato di un binomio: il quadrato di lato a + b e i suoi quattro pezzi */
  ANIM.quadratobinomio = function (el, stampa) {
    let a = 5, b = 3, sbagliata = false;
    const box = H("div", {}, el), lett = H("div", { class: "lettura" }, el), com = H("div", { class: "comandi" }, el);
    cursore(com, "a =", 1, 9, a, v => { a = v; disegna(); });
    cursore(com, "b =", 1, 6, b, v => { b = v; disegna(); });
    const bt = bottone(com, "prova la formula sbagliata a² + b²", () => { sbagliata = !sbagliata; disegna(); }, true);
    function disegna() {
      box.innerHTML = ""; const s = svg(box, 420, 330); s.style.maxWidth = "420px"; s.style.margin = "0 auto";
      const u = Math.min(28, 280 / (a + b)), x0 = 60, y0 = 14, L = (a + b) * u;
      const pezzo = (x, y, w, h, f, st, txt, vuoto) => {
        S("rect", { x, y, width: w, height: h, fill: vuoto ? "#fff" : f, stroke: vuoto ? C.rosso : st, "stroke-width": vuoto ? 1.5 : 2, "stroke-dasharray": vuoto ? "5 4" : "none" }, s);
        S("text", { x: x + w / 2, y: y + h / 2 + 5, "font-size": Math.min(16, Math.max(11, Math.min(w, h) / 2.2)), "text-anchor": "middle", "font-family": "serif", fill: vuoto ? C.rosso : st }, s).innerHTML = txt;
      };
      const I = v => `<tspan font-style="italic">${v}</tspan>`;
      pezzo(x0, y0, a * u, a * u, C.bluc, C.blu, `${I("a")}² = ${a * a}`);
      pezzo(x0 + a * u, y0, b * u, a * u, C.aranc, C.arancio, `${I("ab")} = ${a * b}`, sbagliata);
      pezzo(x0, y0 + a * u, a * u, b * u, C.aranc, C.arancio, `${I("ab")} = ${a * b}`, sbagliata);
      pezzo(x0 + a * u, y0 + a * u, b * u, b * u, C.verdec, C.verde, `${I("b")}² = ${b * b}`);
      S("rect", { x: x0, y: y0, width: L, height: L, fill: "none", stroke: C.testo, "stroke-width": 2.5 }, s);
      S("text", { x: x0 + a * u / 2, y: y0 + L + 20, "font-size": 15, "text-anchor": "middle", "font-family": "serif" }, s).innerHTML = `${I("a")} = ${a}`;
      S("text", { x: x0 + a * u + b * u / 2, y: y0 + L + 20, "font-size": 15, "text-anchor": "middle", "font-family": "serif" }, s).innerHTML = `${I("b")} = ${b}`;
      bt.textContent = sbagliata ? "rimetti i due rettangoli" : "prova la formula sbagliata a² + b²";
      const tot = (a + b) * (a + b);
      lett.innerHTML = sbagliata
        ? `<i>a</i><sup>2</sup> + <i>b</i><sup>2</sup> = ${a * a} + ${b * b} = ${a * a + b * b}, ma il quadrato ha area ${a + b}<sup>2</sup> = ${tot}. <b style="color:#c8373b">Mancano i due rettangoli</b>, cioè 2<i>ab</i> = ${2 * a * b}.`
        : `(<i>a</i> + <i>b</i>)<sup>2</sup> = ${a + b}<sup>2</sup> = <b>${tot}</b> &emsp; <i>a</i><sup>2</sup> + 2<i>ab</i> + <i>b</i><sup>2</sup> = ${a * a} + ${2 * a * b} + ${b * b} = <b>${a * a + 2 * a * b + b * b}</b>`;
    }
    disegna();
  };

  /* 39 ─ Triangolo di Tartaglia: si aggiungono righe, si clicca un numero per vedere da dove viene, si colorano i dispari */
  ANIM.tartaglia = function (el, stampa) {
    let n = stampa ? 6 : 4, sel = null, dispari = false;
    const box = H("div", {}, el), lett = H("div", { class: "lettura" }, el), com = H("div", { class: "comandi" }, el);
    const C_ = (r, k) => { let c = 1; for (let i = 0; i < k; i++) c = c * (r - i) / (i + 1); return Math.round(c); };
    bottone(com, "+ una riga", () => { n = Math.min(dispari ? 31 : 10, n + 1); sel = null; disegna(); });
    bottone(com, "− una riga", () => { n = Math.max(0, n - 1); sel = null; disegna(); }, true);
    const bd = bottone(com, "colora i dispari", () => { dispari = !dispari; n = dispari ? 31 : 6; sel = null; disegna(); }, true);
    const sup = k => (k === 1 ? "" : `<sup>${k}</sup>`);
    function sviluppo(r) {
      if (r === 0) return "1";
      const t = [];
      for (let k = 0; k <= r; k++) {
        const c = C_(r, k), pa = r - k ? `<i>a</i>${sup(r - k)}` : "", pb = k ? `<i>b</i>${sup(k)}` : "";
        t.push(`${c > 1 ? c : ""}${pa}${pb}`);
      }
      return t.join(" + ");
    }
    function disegna() {
      box.innerHTML = "";
      const W = 520, dy = dispari ? 9 : 30, dx = dispari ? 16 : 46, H_ = (n + 1) * dy + 16;
      const s = svg(box, W, H_); s.style.maxWidth = "560px"; s.style.margin = "0 auto";
      for (let r = 0; r <= n; r++) for (let k = 0; k <= r; k++) {
        const x = W / 2 + (k - r / 2) * dx, y = 8 + r * dy, c = C_(r, k);
        let f = "#fff", st = C.blu;
        if (dispari) { f = c % 2 ? C.viola : "#fff"; st = c % 2 ? C.viola : "#ddd"; }
        else if (sel && r === sel[0] && k === sel[1]) { f = C.aranc; st = C.arancio; }
        else if (sel && r === sel[0] - 1 && (k === sel[1] - 1 || k === sel[1])) { f = C.verdec; st = C.verde; }
        else if (sel && r === sel[0]) { f = "#fdf3d6"; }
        const rc = S("rect", { x: x - dx / 2 + 2, y, width: dx - 4, height: dy - 3, fill: f, stroke: st, "stroke-width": dispari ? .5 : 1.4, style: dispari ? "" : "cursor:pointer" }, s);
        if (!dispari) {
          S("text", { x, y: y + dy / 2 + 3, "font-size": c > 99 ? 11 : 13, "text-anchor": "middle", "font-family": "serif", fill: C.testo, style: "pointer-events:none" }, s, String(c));
          rc.addEventListener("click", () => { sel = [r, k]; disegna(); });
        }
      }
      if (dispari) { lett.innerHTML = `${n + 1} righe: i numeri dispari sono colorati. Compare il <b>triangolo di Sierpiński</b>, fatto di triangoli dentro triangoli.`; bd.textContent = "torna ai numeri"; return; }
      bd.textContent = "colora i dispari";
      if (sel && sel[1] > 0 && sel[1] < sel[0]) {
        const [r, k] = sel;
        lett.innerHTML = `Riga ${r}: ${C_(r - 1, k - 1)} + ${C_(r - 1, k)} = <b>${C_(r, k)}</b>, la somma dei due numeri che gli stanno sopra.<br>(<i>a</i> + <i>b</i>)<sup>${r}</sup> = ${sviluppo(r)}`;
      } else {
        const r = sel ? sel[0] : n;
        lett.innerHTML = `Clicca un numero per vedere da dove viene. &emsp; Riga ${r}<br>(<i>a</i> + <i>b</i>)<sup>${r}</sup> = ${sviluppo(r)}`;
      }
    }
    disegna();
  };


  window.ANIM = ANIM;
})();
