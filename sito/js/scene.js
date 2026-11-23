/* =====================================================================
   SCENE ANIMATE DEGLI INDIRIZZI (disegnate su canvas, dietro ai contenuti)
   Ogni scena: function (W, H) → { disegna(ctx, t, dt), scura?, alto? }
   t = secondi dall'avvio, dt = secondi dall'ultimo fotogramma.
   scura: pagina con fondo scuro (titoli chiari); alto: spazio da lasciare
   in cima alla pagina (es. il frontone del tempio).
   Regola generale: le scritte non si sovrappongono, si urtano (vedi urti()).
   ===================================================================== */
(function () {
  const rnd = (a, b) => a + Math.random() * (b - a);
  const scegli = a => a[Math.floor(Math.random() * a.length)];
  function rgba(hex, a) { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; }
  function schiarisci(hex, k) { const n = parseInt(hex.slice(1), 16); const f = c => Math.round(c + (255 - c) * k); return `rgb(${f(n >> 16)},${f((n >> 8) & 255)},${f(n & 255)})`; }
  function scurisci(hex, k) { const n = parseInt(hex.slice(1), 16); const f = c => Math.round(c * (1 - k)); return `rgb(${f(n >> 16)},${f((n >> 8) & 255)},${f(n & 255)})`; }
  /* falce di luna: cerchio meno un cerchio spostato, ritagliata dentro il cerchio esterno (niente pezzi che escono) */
  function falce(ctx, x, y, R, dx, dy, r, col) { const d = Math.ceil(R * 2 + 4), c = document.createElement("canvas"); c.width = d * 2; c.height = d * 2; const q = c.getContext("2d"); q.scale(2, 2);
    q.fillStyle = col; q.beginPath(); q.arc(d / 2, d / 2, R, 0, Math.PI * 2); q.fill(); q.globalCompositeOperation = "destination-out"; q.fillStyle = "#000"; q.beginPath(); q.arc(d / 2 + dx, d / 2 + dy, r, 0, Math.PI * 2); q.fill();
    ctx.drawImage(c, x - d / 2, y - d / 2, d, d); }
  const SERIF = "'Times New Roman','Libro Serif',Times,serif";
  const VIVI = ["#ff3b30", "#ff9500", "#ffcc00", "#34c759", "#00c7be", "#007aff", "#af52de", "#ff2d55", "#5856d6"];

  /* ---------- urti tra corpi (cerchi "c" o rettangoli "r"): nessuna sovrapposizione ---------- */
  function contatto(a, b) {
    if (a.f === "c" && b.f === "c") { const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 0.01, m = a.r + b.r; return d < m ? { nx: dx / d, ny: dy / d, ov: m - d } : null; }
    if (a.f === "r" && b.f === "r") { const dx = b.x - a.x, dy = b.y - a.y, ox = a.hw + b.hw - Math.abs(dx), oy = a.hh + b.hh - Math.abs(dy); if (ox <= 0 || oy <= 0) return null; return ox < oy ? { nx: Math.sign(dx) || 1, ny: 0, ov: ox } : { nx: 0, ny: Math.sign(dy) || 1, ov: oy }; }
    const inv = a.f === "r", c = inv ? b : a, r = inv ? a : b;
    const px = Math.max(r.x - r.hw, Math.min(c.x, r.x + r.hw)), py = Math.max(r.y - r.hh, Math.min(c.y, r.y + r.hh));
    let dx = px - c.x, dy = py - c.y, d = Math.hypot(dx, dy); if (d >= c.r) return null; if (d < 0.01) { dx = r.x - c.x; dy = r.y - c.y; d = Math.hypot(dx, dy) || 1; }
    const n = { nx: dx / d, ny: dy / d, ov: c.r - d }; if (inv) { n.nx *= -1; n.ny *= -1; } return n;
  }
  function urti(corpi, W, H, alto) {
    alto = alto || 0;
    corpi.forEach(a => { const ex = a.f === "c" ? a.r : a.hw, ey = a.f === "c" ? a.r : a.hh;
      if (a.x < ex) { a.x = ex; a.vx = Math.abs(a.vx); } if (a.x > W - ex) { a.x = W - ex; a.vx = -Math.abs(a.vx); }
      if (a.y < alto + ey) { a.y = alto + ey; a.vy = Math.abs(a.vy); } if (a.y > H - ey) { a.y = H - ey; a.vy = -Math.abs(a.vy); } });
    for (let i = 0; i < corpi.length; i++) for (let j = i + 1; j < corpi.length; j++) {
      const a = corpi[i], b = corpi[j], k = contatto(a, b); if (!k) continue;
      const ma = a.m || 1, mb = b.m || 1, ta = mb / (ma + mb), tb = ma / (ma + mb);
      a.x -= k.nx * k.ov * ta; a.y -= k.ny * k.ov * ta; b.x += k.nx * k.ov * tb; b.y += k.ny * k.ov * tb;
      const p = (a.vx - b.vx) * k.nx + (a.vy - b.vy) * k.ny;
      if (p > 0) { const q = 2 * p / (ma + mb); a.vx -= q * mb * k.nx; a.vy -= q * mb * k.ny; b.vx += q * ma * k.nx; b.vy += q * ma * k.ny; }
    }
  }
  /* solo separazione tra corpi (senza pareti): chi si tocca rimbalza e si allontana, non si sovrappone mai */
  function separa(corpi, giri) {
    for (let g = 0; g < (giri || 1); g++) for (let i = 0; i < corpi.length; i++) for (let j = i + 1; j < corpi.length; j++) {
      const a = corpi[i], b = corpi[j], k = contatto(a, b); if (!k) continue;
      const ma = a.m || 1, mb = b.m || 1, ta = mb / (ma + mb), tb = ma / (ma + mb);
      a.x -= k.nx * (k.ov + 0.5) * ta; a.y -= k.ny * (k.ov + 0.5) * ta; b.x += k.nx * (k.ov + 0.5) * tb; b.y += k.ny * (k.ov + 0.5) * tb;
      const p = (a.vx - b.vx) * k.nx + (a.vy - b.vy) * k.ny;
      if (p > 0) { const q = 2 * p / (ma + mb); a.vx -= q * mb * k.nx; a.vy -= q * mb * k.ny; b.vx += q * ma * k.nx; b.vy += q * ma * k.ny; }
    }
  }
  /* nuvole: si spostano in orizzontale, se si urtano cambiano un po' velocità e quota ma non si sovrappongono mai;
     quando escono da un lato rientrano dall'altro in un punto libero */
  function muoviNuvole(nuvole, dt, W, y0, y1, ew, eh) {
    nuvole.forEach(n => { n.f = "r"; n.hw = ew * n.s; n.hh = eh * n.s; if (n.vx === undefined) { n.vx = n.v; n.vy = 0; } n.m = n.s;
      n.vx += (n.v - n.vx) * Math.min(1, dt * 0.4); n.vy += (0 - n.vy) * Math.min(1, dt * 0.4); n.x += n.vx * dt; n.y += n.vy * dt; });
    if (!nuvole.pronte) { separa(nuvole, 80); nuvole.forEach(n => { n.vx = n.v; n.vy = 0; }); nuvole.pronte = true; }
    separa(nuvole, 2);
    nuvole.forEach(n => {
      if (n.y < y0) { n.y = y0; n.vy = Math.abs(n.vy); } if (n.y > y1) { n.y = y1; n.vy = -Math.abs(n.vy); }
      const fuori = n.v > 0 ? n.x - n.hw > W + 10 : n.x + n.hw < -10;
      if (fuori) { n.x = n.v > 0 ? -n.hw - 10 : W + n.hw + 10;
        for (let k = 0; k < 15; k++) { n.y = y0 + Math.random() * (y1 - y0); if (!nuvole.some(o => o !== n && contatto(n, o))) break; } n.vx = n.v; n.vy = 0; }
    });
  }
  function etichetta(ctx, testo, size) { ctx.font = `italic ${size}px ${SERIF}`; return { hw: ctx.measureText(testo).width / 2 + 8, hh: size * 0.62 + 4 }; }

  /* ------------------------------------------------------------------ */
  /* LICEO SCIENTIFICO: molecole con legami che si urtano; quando due si avvicinano
     compare la formula dell'interazione (elettrica, gravitazionale…) che urta le altre */
  function scientifico(W, H) {
    const EL = { H: ["#f2f2f2", 10], O: ["#e5484d", 15], C: ["#3d434c", 15], N: ["#3b6fd8", 14], Na: ["#9b59d0", 17], Cl: ["#2fb36d", 17], S: ["#e2b714", 16] };
    const MOL = [
      { a: [["O", 0, 0], ["H", -0.85, 0.6], ["H", 0.85, 0.6]], l: [[0, 1, 1], [0, 2, 1]], nome: "H₂O" },
      { a: [["O", -1.2, 0], ["C", 0, 0], ["O", 1.2, 0]], l: [[0, 1, 2], [1, 2, 2]], nome: "CO₂" },
      { a: [["C", 0, 0], ["H", 0.95, -0.4], ["H", -0.95, -0.4], ["H", 0.35, 0.95], ["H", -0.2, -1.05]], l: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]], nome: "CH₄" },
      { a: [["N", 0, 0], ["H", -0.9, 0.55], ["H", 0.9, 0.55], ["H", 0, -1]], l: [[0, 1, 1], [0, 2, 1], [0, 3, 1]], nome: "NH₃" },
      { a: [["O", -0.6, 0], ["O", 0.6, 0]], l: [[0, 1, 2]], nome: "O₂" },
      { a: [["N", -0.55, 0], ["N", 0.55, 0]], l: [[0, 1, 3]], nome: "N₂" },
      { a: [["Na", 0, 0]], l: [], carica: "+" }, { a: [["Cl", 0, 0]], l: [], carica: "−" },
      { a: [["C", -0.6, 0], ["C", 0.6, 0], ["H", -1.2, -0.8], ["H", -1.2, 0.8], ["H", 1.2, -0.8], ["H", 1.2, 0.8]], l: [[0, 1, 2], [0, 2, 1], [0, 3, 1], [1, 4, 1], [1, 5, 1]], nome: "C₂H₄" },
      { a: [["S", 0, 0], ["O", -1.1, 0.5], ["O", 1.1, 0.5]], l: [[0, 1, 2], [0, 2, 2]], nome: "SO₂" }
    ];
    const FORMULE = ["F = k · q₁q₂ / r²", "F = G · m₁m₂ / r²", "U = k · q₁q₂ / r", "U = −G · m₁m₂ / r", "E = k · q / r²", "F = q · E", "E = mc²", "E = h · f",
      "p = m · v", "F = m · a", "ΔU = q · ΔV", "λ = h / p", "PV = nRT", "Q.E.D.", "C.V.D.", "a² + b² = c²", "F = −k · x", "W = F · s", "E = ½ m v²"];
    const u = W < 600 ? 19 : 24, corpi = [], etichette = [], legami = [];
    const n = Math.round(Math.min(34, Math.max(12, W * H / 30000)));
    for (let i = 0; i < n; i++) {
      const t = MOL[i % MOL.length]; let r = 0; t.a.forEach(([e, x, y]) => { r = Math.max(r, Math.hypot(x, y) * u + EL[e][1]); });
      corpi.push({ f: "c", t, x: rnd(r, W - r), y: rnd(80 + r, H - r), vx: rnd(-30, 30), vy: rnd(-30, 30), r: r + 4, m: t.a.length, ang: rnd(0, 6), va: rnd(-0.5, 0.5), mol: true });
    }
    for (let k = 0; k < 400; k++) urti(corpi, W, H, 60);
    function atomo(ctx, e, x, y, carica) {
      const [c, r] = EL[e]; const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.1, x, y, r);
      g.addColorStop(0, schiarisci(c, 0.75)); g.addColorStop(0.55, c); g.addColorStop(1, scurisci(c, 0.35));
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
      ctx.fillStyle = e === "H" ? "#556" : "rgba(255,255,255,.9)"; ctx.font = `bold ${Math.round(r * 0.85)}px ${SERIF}`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(e, x, y + 1); if (carica) { ctx.fillStyle = "#fff"; ctx.font = `bold ${Math.round(r * 0.7)}px ${SERIF}`; ctx.fillText(carica, x + r * 0.62, y - r * 0.55); }
      ctx.textBaseline = "alphabetic";
    }
    function molecola(ctx, b) {
      const P = b.t.a.map(([e, x, y]) => { const c = Math.cos(b.ang), s = Math.sin(b.ang); return [e, b.x + (x * c - y * s) * u, b.y + (x * s + y * c) * u]; });
      ctx.strokeStyle = "rgba(90,100,120,.75)"; ctx.lineCap = "round";
      b.t.l.forEach(([i, j, ord]) => { const [, x0, y0] = P[i], [, x1, y1] = P[j], dx = x1 - x0, dy = y1 - y0, d = Math.hypot(dx, dy), nx = -dy / d, ny = dx / d;
        for (let k = 0; k < ord; k++) { const o = (k - (ord - 1) / 2) * 4.5; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0 + nx * o, y0 + ny * o); ctx.lineTo(x1 + nx * o, y1 + ny * o); ctx.stroke(); } });
      P.forEach(([e, x, y]) => atomo(ctx, e, x, y, b.t.carica));
    }
    let prossimo = 0.5;
    return {
      disegna(ctx, t, dt) {
        corpi.forEach(b => { b.x += b.vx * dt; b.y += b.vy * dt; if (b.mol) b.ang += b.va * dt; });
        urti(corpi, W, H, 60);
        /* nuove interazioni tra due molecole vicine */
        prossimo -= dt;
        if (prossimo <= 0 && etichette.length < Math.max(4, Math.round(n / 4))) {
          prossimo = rnd(0.5, 1.2);
          const mol = corpi.filter(b => b.mol); let best = null, dmin = 1e9;
          for (let k = 0; k < 12; k++) { const a = scegli(mol), b = scegli(mol); if (a === b || legami.some(l => l.a === a || l.b === b || l.a === b || l.b === a)) continue; const d = Math.hypot(a.x - b.x, a.y - b.y); if (d < dmin) { dmin = d; best = [a, b]; } }
          if (best && dmin < 320) {
            const [a, b] = best, ioni = a.t.carica && b.t.carica && a.t.carica !== b.t.carica;
            const testo = ioni ? "F = k · q₁q₂ / r²" : scegli(FORMULE), size = W < 600 ? 15 : 19, dim = etichetta(ctx, testo, size);
            const e = { f: "r", testo, size, x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, vx: rnd(-20, 20), vy: rnd(-20, 20), hw: dim.hw, hh: dim.hh, m: 2, vita: 0 };
            etichette.push(e); corpi.push(e); legami.push({ a, b, e, vita: 0 });
          }
        }
        /* legami di interazione: linea tratteggiata con le frecce delle forze */
        for (let i = legami.length - 1; i >= 0; i--) {
          const l = legami[i]; l.vita += dt; if (l.vita > 7) { legami.splice(i, 1); continue; }
          const a = Math.min(1, l.vita) * Math.min(1, (7 - l.vita) / 1.5), dx = l.b.x - l.a.x, dy = l.b.y - l.a.y, d = Math.hypot(dx, dy) || 1, nx = dx / d, ny = dy / d;
          ctx.strokeStyle = `rgba(31,79,163,${0.45 * a})`; ctx.lineWidth = 1.4; ctx.setLineDash([6, 6]); ctx.lineDashOffset = -t * 20;
          ctx.beginPath(); ctx.moveTo(l.a.x, l.a.y); ctx.lineTo(l.b.x, l.b.y); ctx.stroke(); ctx.setLineDash([]);
          [[l.a, 1], [l.b, -1]].forEach(([c, s]) => { const x0 = c.x + nx * s * (c.r + 4), y0 = c.y + ny * s * (c.r + 4), x1 = x0 + nx * s * 26, y1 = y0 + ny * s * 26;
            ctx.strokeStyle = `rgba(184,50,47,${0.7 * a})`; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 - nx * s * 8 - ny * 5, y1 - ny * s * 8 + nx * 5); ctx.lineTo(x1 - nx * s * 8 + ny * 5, y1 - ny * s * 8 - nx * 5); ctx.closePath(); ctx.fillStyle = `rgba(184,50,47,${0.7 * a})`; ctx.fill(); });
          l.e.alfa = a;
        }
        corpi.filter(b => b.mol).forEach(b => { ctx.save(); ctx.globalAlpha = 0.62; molecola(ctx, b); ctx.restore(); });
        for (let i = etichette.length - 1; i >= 0; i--) {
          const e = etichette[i]; e.vita += dt; if (e.vita > 7) { etichette.splice(i, 1); corpi.splice(corpi.indexOf(e), 1); continue; }
          const a = e.alfa === undefined ? 1 : e.alfa;
          ctx.fillStyle = `rgba(255,255,255,${0.85 * a})`; ctx.strokeStyle = `rgba(31,79,163,${0.55 * a})`; ctx.lineWidth = 1.2;
          ctx.fillRect(e.x - e.hw, e.y - e.hh, e.hw * 2, e.hh * 2); ctx.strokeRect(e.x - e.hw, e.y - e.hh, e.hw * 2, e.hh * 2);
          ctx.fillStyle = `rgba(31,50,96,${a})`; ctx.font = `italic ${e.size}px ${SERIF}`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(e.testo, e.x, e.y + 1); ctx.textBaseline = "alphabetic";
        }
      }
    };
  }

  /* ------------------------------------------------------------------ */
  /* SCIENTIFICO DI NOTTE: il sistema solare nello spazio; le formule (Keplero, Newton…) urtano i pianeti e tra loro */
  function spazio(W, H) {
    const fondo = document.createElement("canvas"); fondo.width = W; fondo.height = H; const f = fondo.getContext("2d");
    const g = f.createLinearGradient(0, 0, W, H); g.addColorStop(0, "#05070f"); g.addColorStop(1, "#0c1230"); f.fillStyle = g; f.fillRect(0, 0, W, H);
    [["#5b2a86", 0.25, 0.3], ["#1f4fa3", 0.75, 0.6], ["#7a1f5c", 0.6, 0.15]].forEach(([c, x, y]) => { const r = Math.max(W, H) * 0.45, n = f.createRadialGradient(W * x, H * y, 0, W * x, H * y, r); n.addColorStop(0, rgba(c, 0.28)); n.addColorStop(1, rgba(c, 0)); f.fillStyle = n; f.fillRect(0, 0, W, H); });
    for (let i = 0; i < W * H / 900; i++) { f.fillStyle = `rgba(255,255,255,${rnd(0.2, 0.9)})`; f.beginPath(); f.arc(rnd(0, W), rnd(0, H), rnd(0.3, 1.3), 0, 7); f.fill(); }
    const sole = { x: W * 0.08, y: H * 0.92 }, sc = Math.max(W, H) / 1300;
    const PIANETI = [["Mercurio", 4, ["#b9b0a6"], 0.17, 2.4], ["Venere", 7, ["#e9cf94"], 0.26, 1.8], ["Terra", 8, ["#3d7fd9", "#3fae5a"], 0.36, 1.5], ["Marte", 6, ["#c9532f"], 0.46, 1.2],
      ["Giove", 19, ["#d9b48a", "#b07a4f"], 0.62, 0.65], ["Saturno", 16, ["#e7d29a", "#c9a764"], 0.78, 0.5], ["Urano", 11, ["#8fd3dc"], 0.92, 0.35], ["Nettuno", 10, ["#3f5fd1"], 1.04, 0.28]];
    const pianeti = PIANETI.map(([nome, r, col, d, v]) => ({ nome, r: r * Math.max(0.8, sc), col, a: d * Math.max(W, H) * 0.95, v: v * 0.12, ang: rnd(-1.4, -0.1), f: "c", m: 1e6, vx: 0, vy: 0 }));
    pianeti.forEach(p => { p.r0 = p.r; p.r = p.r0 + 6; });
    const FORMULE = ["T² = k · a³", "F = G · m₁m₂ / r²", "v = √(G · M / r)", "E = mc²", "c ≈ 3 · 10⁸ m/s", "1 UA ≈ 1,5 · 10¹¹ m", "g = G · M / r²", "λ = c / f", "Eppur si muove", "F = m · a", "E = h · f", "Q.E.D."];
    const etichette = []; let prossima = 0.3;
    const cometa = { vita: 99 };
    function pianeta(ctx, p, x, y) {
      const r = p.r0, dx = sole.x - x, dy = sole.y - y, d = Math.hypot(dx, dy), lx = dx / d, ly = dy / d;
      if (p.nome === "Saturno") { ctx.strokeStyle = "rgba(230,210,160,.55)"; ctx.lineWidth = r * 0.35; ctx.beginPath(); ctx.ellipse(x, y, r * 2.1, r * 0.6, -0.35, Math.PI, Math.PI * 2); ctx.stroke(); }
      const gr = ctx.createRadialGradient(x + lx * r * 0.5, y + ly * r * 0.5, r * 0.1, x, y, r * 1.05); gr.addColorStop(0, schiarisci(p.col[0], 0.35)); gr.addColorStop(0.6, p.col[0]); gr.addColorStop(1, scurisci(p.col[0], 0.75));
      ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
      if (p.col[1]) { ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.clip(); ctx.fillStyle = rgba(p.col[1], 0.55);
        if (p.nome === "Terra") { [[-0.3, -0.2, 0.45], [0.35, 0.25, 0.35]].forEach(([a, b, s]) => { ctx.beginPath(); ctx.ellipse(x + a * r, y + b * r, s * r, s * r * 0.7, 0.4, 0, 7); ctx.fill(); }); }
        else for (let k = -3; k <= 3; k += 1.4) ctx.fillRect(x - r, y + k * r * 0.22, r * 2, r * 0.13); ctx.restore(); }
      if (p.nome === "Saturno") { ctx.strokeStyle = "rgba(230,210,160,.75)"; ctx.lineWidth = r * 0.35; ctx.beginPath(); ctx.ellipse(x, y, r * 2.1, r * 0.6, -0.35, 0, Math.PI); ctx.stroke(); }
      if (p.nome === "Terra") { const la = p.ang * 6; ctx.fillStyle = "#cfcfcf"; ctx.beginPath(); ctx.arc(x + Math.cos(la) * r * 2.2, y + Math.sin(la) * r * 0.8, r * 0.3, 0, 7); ctx.fill(); }
    }
    return {
      scura: true,
      disegna(ctx, t, dt) {
        ctx.drawImage(fondo, 0, 0, W, H);
        /* orbite e Sole */
        ctx.strokeStyle = "rgba(180,200,255,.16)"; ctx.lineWidth = 1; pianeti.forEach(p => { ctx.beginPath(); ctx.ellipse(sole.x, sole.y, p.a, p.a * 0.55, -0.12, 0, 7); ctx.stroke(); });
        const gs = ctx.createRadialGradient(sole.x, sole.y, 0, sole.x, sole.y, 160 * sc + 60); gs.addColorStop(0, "rgba(255,240,180,1)"); gs.addColorStop(0.25, "rgba(255,190,70,.85)"); gs.addColorStop(1, "rgba(255,140,40,0)"); ctx.fillStyle = gs; ctx.beginPath(); ctx.arc(sole.x, sole.y, 160 * sc + 60, 0, 7); ctx.fill();
        pianeti.forEach(p => { p.ang += p.v * dt * 0.4; const c = Math.cos(-0.12), s = Math.sin(-0.12), ex = Math.cos(p.ang) * p.a, ey = Math.sin(p.ang) * p.a * 0.55; p.x = sole.x + ex * c - ey * s; p.y = sole.y + ex * s + ey * c; });
        pianeti.forEach(p => { if (p.x > -40 && p.x < W + 40 && p.y > -40 && p.y < H + 40) pianeta(ctx, p, p.x, p.y); });
        /* cometa */
        cometa.vita += dt; if (cometa.vita > 9) Object.assign(cometa, { vita: 0, x: rnd(0.3, 1) * W, y: -20, vx: rnd(-260, -160), vy: rnd(90, 160) });
        if (cometa.vita < 5) { cometa.x += cometa.vx * dt; cometa.y += cometa.vy * dt; const L = 120, n = Math.hypot(cometa.vx, cometa.vy); const gc = ctx.createLinearGradient(cometa.x, cometa.y, cometa.x - cometa.vx / n * L, cometa.y - cometa.vy / n * L); gc.addColorStop(0, "rgba(220,240,255,.9)"); gc.addColorStop(1, "rgba(220,240,255,0)"); ctx.strokeStyle = gc; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cometa.x, cometa.y); ctx.lineTo(cometa.x - cometa.vx / n * L, cometa.y - cometa.vy / n * L); ctx.stroke(); }
        /* formule che urtano pianeti e altre formule */
        prossima -= dt;
        if (prossima <= 0 && etichette.length < (W < 600 ? 4 : 8)) { prossima = rnd(1, 2.2); const testo = scegli(FORMULE), size = W < 600 ? 15 : 19, d = etichetta(ctx, testo, size); etichette.push({ f: "r", testo, size, x: rnd(d.hw, W - d.hw), y: rnd(90, H - 40), vx: rnd(-30, 30), vy: rnd(-25, 25), hw: d.hw, hh: d.hh, m: 2, vita: 0 }); }
        const corpi = pianeti.filter(p => p.x > -40 && p.x < W + 40 && p.y > -40 && p.y < H + 40).concat(etichette);
        etichette.forEach(e => { e.x += e.vx * dt; e.y += e.vy * dt; }); urti(corpi, W, H, 60);
        for (let i = etichette.length - 1; i >= 0; i--) { const e = etichette[i]; e.vita += dt; if (e.vita > 12) { etichette.splice(i, 1); continue; }
          const a = Math.min(1, e.vita) * Math.min(1, (12 - e.vita) / 1.5);
          ctx.fillStyle = `rgba(12,20,50,${0.75 * a})`; ctx.strokeStyle = `rgba(150,180,255,${0.6 * a})`; ctx.lineWidth = 1.2; ctx.fillRect(e.x - e.hw, e.y - e.hh, e.hw * 2, e.hh * 2); ctx.strokeRect(e.x - e.hw, e.y - e.hh, e.hw * 2, e.hh * 2);
          ctx.fillStyle = `rgba(230,238,255,${a})`; ctx.font = `italic ${e.size}px ${SERIF}`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(e.testo, e.x, e.y + 1); ctx.textBaseline = "alphabetic"; }
      }
    };
  }

  /* SCIENZE APPLICATE DI NOTTE: pioggia di 0 e 1 verdi su fondo nero (stile Matrix) */
  function matrix(W, H) {
    const passo = W < 600 ? 14 : 17;
    const col = Array.from({ length: Math.ceil(W / passo) }, (_, i) => ({ x: i * passo + passo / 2, y: rnd(-H, H), v: rnd(70, 200), L: Math.floor(rnd(10, 30)), ch: Array.from({ length: 40 }, () => Math.random() < 0.5 ? "0" : "1") }));
    return {
      scura: true,
      disegna(ctx, t, dt) {
        ctx.fillStyle = "#000"; ctx.fillRect(0, 0, W, H);
        ctx.font = `bold ${passo}px monospace`; ctx.textAlign = "center";
        col.forEach(c => {
          c.y += c.v * dt; if (c.y - c.L * passo > H) { c.y = rnd(-300, 0); c.v = rnd(70, 200); c.L = Math.floor(rnd(10, 30)); }
          if (Math.random() < dt * 6) c.ch[Math.floor(Math.random() * c.ch.length)] = Math.random() < 0.5 ? "0" : "1";
          for (let k = 0; k < c.L; k++) { const y = c.y - k * passo; if (y < -passo || y > H + passo) continue;
            ctx.fillStyle = k === 0 ? "rgba(210,255,220,.95)" : `rgba(0,${Math.round(255 - k * 4)},70,${0.85 * (1 - k / c.L)})`; ctx.fillText(c.ch[(k + Math.floor(c.y / passo)) % c.ch.length], c.x, y); }
        });
        const v = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.3, W / 2, H / 2, Math.max(W, H) * 0.75); v.addColorStop(0, "rgba(0,0,0,0)"); v.addColorStop(1, "rgba(0,0,0,.55)"); ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);
      }
    };
  }

  /* ------------------------------------------------------------------ */
  /* SCIENZE APPLICATE DI GIORNO: scheda madre che riempie lo schermo. Ogni componente compare una sola volta
     (CPU, GPU, RAM, ROM, SSD, I/O, Wi-Fi, NPU) ed è collegato agli altri da bus di piste percorse da impulsi di luce */
  function scienzeApplicate(W, H) {
    const TEAL = "#1f6f8b", g = W < 600 ? 12 : 18;
    const fondo = document.createElement("canvas"); fondo.width = W; fondo.height = H; const f = fondo.getContext("2d");
    f.fillStyle = "#eef6f3"; f.fillRect(0, 0, W, H);
    f.strokeStyle = "rgba(31,111,139,.06)"; f.lineWidth = 1; for (let x = 0; x < W; x += g) { f.beginPath(); f.moveTo(x, 0); f.lineTo(x, H); f.stroke(); } for (let y = 0; y < H; y += g) { f.beginPath(); f.moveTo(0, y); f.lineTo(W, y); f.stroke(); }
    const TIPI = [["CPU", 7, 7], ["GPU", 7, 5], ["RAM", 10, 3], ["ROM", 5, 3], ["SSD", 6, 4], ["I/O", 5, 5], ["Wi-Fi", 4, 4], ["NPU", 5, 5]];
    const chip = [];
    TIPI.forEach(([nome, cw, chh]) => {
      const w = cw * g, h = chh * g;
      for (let k = 0; k < 400; k++) {
        const x = Math.round(rnd(g * 2, W - w - g * 2) / g) * g, y = Math.round(rnd(70, H - h - g * 2) / g) * g, m = g * 4;
        if (chip.some(c => x < c.x + c.w + m && c.x < x + w + m && y < c.y + c.h + m && c.y < y + h + m)) continue;
        chip.push({ nome, x, y, w, h, cx: x + w / 2, cy: y + h / 2 }); break;
      }
    });
    /* bus a 3 piste tra due componenti: esce dal lato verso l'altro, va in orizzontale, poi in verticale (angoli a 45°) */
    const piste = [];
    function bus(a, b) {
      const n = 3, sp = Math.max(5, g * 0.4), dx = b.cx - a.cx, dy = b.cy - a.cy;
      for (let i = 0; i < n; i++) {
        const o = (i - (n - 1) / 2) * sp;
        const x0 = dx > 0 ? a.x + a.w : a.x, y0 = a.cy + o, x1 = b.cx + o, y1 = dy > 0 ? b.y : b.y + b.h;
        const sx = Math.sign(x1 - x0) || 1, sy = Math.sign(y1 - y0) || 1, d = Math.min(Math.abs(x1 - x0), Math.abs(y1 - y0), 18);
        const pts = [[x0, y0], [x1 - sx * d - sx * o * sy * 0, y0], [x1, y0 + sy * d], [x1, y1]];
        let L = 0; for (let k = 1; k < pts.length; k++) L += Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]); piste.push({ pts, L });
      }
    }
    const cpu = chip.find(c => c.nome === "CPU");
    if (cpu) chip.forEach(c => { if (c !== cpu) bus(cpu, c); });
    const coppie = [["GPU", "RAM"], ["SSD", "ROM"], ["I/O", "Wi-Fi"], ["NPU", "RAM"]];
    coppie.forEach(([p, q]) => { const a = chip.find(c => c.nome === p), b = chip.find(c => c.nome === q); if (a && b) bus(a, b); });
    f.lineCap = "round"; f.lineJoin = "round";
    piste.forEach(p => { f.strokeStyle = "rgba(31,111,139,.38)"; f.lineWidth = 2; f.beginPath(); f.moveTo(...p.pts[0]); p.pts.slice(1).forEach(q => f.lineTo(...q)); f.stroke(); });
    /* piccoli componenti: resistenze e condensatori */
    for (let k = 0; k < W * H / 30000; k++) { const x = rnd(0, W), y = rnd(70, H); if (chip.some(c => x > c.x - 20 && x < c.x + c.w + 20 && y > c.y - 20 && y < c.y + c.h + 20)) continue;
      if (Math.random() < 0.5) { f.fillStyle = "#d9c9a3"; f.fillRect(x, y, 16, 6); f.fillStyle = "#b5562b"; f.fillRect(x + 4, y, 2, 6); f.fillStyle = "#2a2a2a"; f.fillRect(x + 8, y, 2, 6); f.fillStyle = "#d9a514"; f.fillRect(x + 11, y, 2, 6); }
      else { f.fillStyle = "#2a6db0"; f.beginPath(); f.arc(x, y, 6, 0, 7); f.fill(); f.fillStyle = "#cfd8dc"; f.fillRect(x - 6, y - 1, 3, 2); } }
    chip.forEach(c => {
      f.fillStyle = "#26323d"; f.fillRect(c.x, c.y, c.w, c.h); f.strokeStyle = "#4a6472"; f.lineWidth = 2; f.strokeRect(c.x + 5, c.y + 5, c.w - 10, c.h - 10);
      f.fillStyle = "#c9a74b"; for (let x = c.x + g / 2; x < c.x + c.w - 2; x += g / 2) { f.fillRect(x - 1.5, c.y - 6, 3, 6); f.fillRect(x - 1.5, c.y + c.h, 3, 6); } for (let y = c.y + g / 2; y < c.y + c.h - 2; y += g / 2) { f.fillRect(c.x - 6, y - 1.5, 6, 3); f.fillRect(c.x + c.w, y - 1.5, 6, 3); }
      f.fillStyle = "rgba(220,235,245,.92)"; f.font = `bold ${Math.round(Math.min(c.h * 0.32, g * 1.2))}px ${SERIF}`; f.textAlign = "center"; f.textBaseline = "middle"; f.fillText(c.nome, c.cx, c.cy); f.textBaseline = "alphabetic";
      f.fillStyle = "#3a4a56"; f.beginPath(); f.arc(c.x + 10, c.y + 10, 2.5, 0, 7); f.fill();
    });
    function punto(p, s) { let d = s * p.L; for (let i = 1; i < p.pts.length; i++) { const [x0, y0] = p.pts[i - 1], [x1, y1] = p.pts[i], l = Math.hypot(x1 - x0, y1 - y0); if (d <= l) return [x0 + (x1 - x0) * d / l, y0 + (y1 - y0) * d / l]; d -= l; } return p.pts[p.pts.length - 1]; }
    const impulsi = [];
    return {
      disegna(ctx, t, dt) {
        ctx.drawImage(fondo, 0, 0, W, H);
        while (impulsi.length < Math.max(6, piste.length * 0.6)) impulsi.push({ p: scegli(piste), s: 0, v: rnd(160, 320), inv: Math.random() < 0.5 });
        for (let i = impulsi.length - 1; i >= 0; i--) {
          const q = impulsi[i]; q.s += q.v * dt / Math.max(60, q.p.L); if (q.s >= 1) { impulsi.splice(i, 1); continue; }
          for (let k = 0; k < 7; k++) { const u = Math.max(0, q.s - k * 0.02), [x, y] = punto(q.p, q.inv ? 1 - u : u); ctx.fillStyle = `rgba(34,184,240,${0.75 * (1 - k / 7)})`; ctx.beginPath(); ctx.arc(x, y, 3 - k * 0.3, 0, 7); ctx.fill(); }
          const [x, y] = punto(q.p, q.inv ? 1 - q.s : q.s), gl = ctx.createRadialGradient(x, y, 0, x, y, 16); gl.addColorStop(0, "rgba(34,184,240,.5)"); gl.addColorStop(1, "rgba(34,184,240,0)"); ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(x, y, 16, 0, 7); ctx.fill();
        }
        /* il LED di ogni componente lampeggia quando ci arriva un impulso */
        chip.forEach((c, k) => { const on = Math.sin(t * 3 + k * 1.7) > 0.3; ctx.fillStyle = on ? "rgba(60,230,120,.95)" : "rgba(60,230,120,.25)"; ctx.beginPath(); ctx.arc(c.x + c.w - 10, c.y + 10, 3, 0, 7); ctx.fill(); });
        void TEAL;
      }
    };
  }

  /* ------------------------------------------------------------------ */
  /* TRED: mosaico di esagoni nel cielo + paesaggio sostenibile (colline, fiume, alberi, pannelli, pale).
     Di notte: stelle e luna, finestre accese, luci rosse sulle pale, lucciole al posto delle foglie. */
  function tred(W, H, notte) {
    const P = notte ? { cielo: ["#0b1633", "#26406e"], c1: "#2e4a52", c2: "#284a3c", c3: "#1f3d2e", fiume: "#2b4f7a", tronco: "#3a2c20", pino: "#173826", chioma: "#1f4a2c", muro: "#8c8577", tetto: "#5e2c22", finestra: "#ffd76a", porta: "#3a2a1c", pannello: "#1a2b45", pala: "#9aa6b2", ombra: "#6b7682" }
      : { cielo: ["#d9efff", "#f4fbff"], c1: "#b9dcc0", c2: "#8fca8f", c3: "#6db56f", fiume: "#8fd0f0", tronco: "#7a5a3a", pino: "#2f7d4a", chioma: "#3f9a52", muro: "#f3e6d0", tetto: "#c0533d", finestra: "#7fb7e0", porta: "#8a5a3a", pannello: "#2d4f7c", pala: "#ffffff", ombra: "#cfd8dc" };
    const orizz = H * (W < 600 ? 0.62 : 0.55);
    const paes = document.createElement("canvas"); paes.width = W; paes.height = H; const p = paes.getContext("2d");
    const cielo = p.createLinearGradient(0, 0, 0, orizz); cielo.addColorStop(0, P.cielo[0]); cielo.addColorStop(1, P.cielo[1]); p.fillStyle = cielo; p.fillRect(0, 0, W, orizz + 40);
    if (notte) for (let i = 0; i < W * orizz / 1500; i++) { p.fillStyle = `rgba(255,255,240,${rnd(0.3, 0.9)})`; p.beginPath(); p.arc(rnd(0, W), rnd(0, orizz), rnd(0.4, 1.4), 0, 7); p.fill(); }
    function collina(base, amp, col, fase, ond) { p.fillStyle = col; p.beginPath(); p.moveTo(0, H); for (let x = 0; x <= W + 10; x += 10) p.lineTo(x, base + Math.sin(x / ond + fase) * amp + Math.sin(x / (ond * 0.43) + fase * 2) * amp * 0.35); p.lineTo(W, H); p.closePath(); p.fill(); }
    const yC = (base, amp, fase, ond, x) => base + Math.sin(x / ond + fase) * amp + Math.sin(x / (ond * 0.43) + fase * 2) * amp * 0.35;
    const C1 = [orizz, H * 0.05, 1.3, W * 0.18], C2 = [orizz + H * 0.09, H * 0.05, 4.1, W * 0.22], C3 = [orizz + H * 0.2, H * 0.045, 2.2, W * 0.15];
    collina(C1[0], C1[1], P.c1, C1[2], C1[3]);
    collina(C2[0], C2[1], P.c2, C2[2], C2[3]);
    p.fillStyle = P.fiume; p.beginPath(); const fx = W * 0.3;
    for (let y = C2[0]; y <= H; y += 6) { const k = (y - C2[0]) / (H - C2[0]), x = fx + Math.sin(k * 4) * W * 0.06 - k * W * 0.05, w = 6 + k * W * 0.12; y === C2[0] ? p.moveTo(x - w, y) : p.lineTo(x - w, y); }
    for (let y = H; y >= C2[0]; y -= 6) { const k = (y - C2[0]) / (H - C2[0]), x = fx + Math.sin(k * 4) * W * 0.06 - k * W * 0.05, w = 6 + k * W * 0.12; p.lineTo(x + w, y); }
    p.closePath(); p.fill();
    collina(C3[0], C3[1], P.c3, C3[2], C3[3]);
    const px0 = W * 0.55, py0 = yC(...C3, W * 0.6) + 18, pw = Math.min(46, W * 0.05);
    for (let r = 0; r < 3; r++) for (let c = 0; c < Math.max(4, Math.round(W / 140)); c++) {
      const x = px0 + c * (pw + 8) + r * 10, y = py0 + r * (pw * 0.55 + 6);
      p.fillStyle = P.pannello; p.beginPath(); p.moveTo(x, y); p.lineTo(x + pw, y); p.lineTo(x + pw - 8, y + pw * 0.5); p.lineTo(x - 8, y + pw * 0.5); p.closePath(); p.fill();
      p.strokeStyle = notte ? "rgba(140,170,220,.35)" : "rgba(170,210,255,.7)"; p.lineWidth = 0.8; for (let k = 1; k < 4; k++) { p.beginPath(); p.moveTo(x + k * pw / 4, y); p.lineTo(x + k * pw / 4 - 8, y + pw * 0.5); p.stroke(); } p.beginPath(); p.moveTo(x - 4, y + pw * 0.25); p.lineTo(x + pw - 4, y + pw * 0.25); p.stroke();
      p.strokeStyle = "#6b7280"; p.beginPath(); p.moveTo(x + pw / 2 - 4, y + pw * 0.5); p.lineTo(x + pw / 2 - 4, y + pw * 0.7); p.stroke();
    }
    function albero(x, y, s, tipo) {
      p.fillStyle = P.tronco; p.fillRect(x - s * 0.08, y - s * 0.4, s * 0.16, s * 0.4);
      if (tipo) { p.fillStyle = P.pino; for (let k = 0; k < 3; k++) { p.beginPath(); p.moveTo(x, y - s * (1.25 - k * 0.25)); p.lineTo(x + s * (0.32 + k * 0.08), y - s * (0.55 - k * 0.2) - s * 0.25); p.lineTo(x - s * (0.32 + k * 0.08), y - s * (0.55 - k * 0.2) - s * 0.25); p.closePath(); p.fill(); } }
      else { p.fillStyle = P.chioma; [[0, -0.7, 0.38], [-0.22, -0.5, 0.28], [0.22, -0.5, 0.28]].forEach(([dx, dy, r]) => { p.beginPath(); p.arc(x + dx * s, y + dy * s, r * s, 0, 7); p.fill(); }); p.fillStyle = "rgba(255,255,255,.1)"; p.beginPath(); p.arc(x - s * 0.1, y - s * 0.8, s * 0.15, 0, 7); p.fill(); }
    }
    for (let k = 0; k < Math.round(W / 45); k++) { const x = rnd(0, W); if (Math.abs(x - fx) < W * 0.12) continue; albero(x, yC(...C2, x) + rnd(4, 20), rnd(22, 34), Math.random() < 0.5); }
    for (let k = 0; k < Math.round(W / 70); k++) { const x = rnd(0, W * 0.5); if (Math.abs(x - fx + W * 0.04) < W * 0.14) continue; albero(x, yC(...C3, x) + rnd(10, 40), rnd(34, 50), Math.random() < 0.5); }
    const finestre = [];
    for (let k = 0; k < 3; k++) { const x = W * (0.08 + k * 0.07), y = yC(...C3, x) + 30, s = 30;
      p.fillStyle = P.muro; p.fillRect(x - s / 2, y - s * 0.6, s, s * 0.6); p.fillStyle = P.tetto; p.beginPath(); p.moveTo(x - s * 0.6, y - s * 0.6); p.lineTo(x, y - s * 1.05); p.lineTo(x + s * 0.6, y - s * 0.6); p.closePath(); p.fill();
      p.fillStyle = P.pannello; p.beginPath(); p.moveTo(x + 2, y - s * 0.95); p.lineTo(x + s * 0.45, y - s * 0.66); p.lineTo(x + s * 0.3, y - s * 0.66); p.lineTo(x - 2, y - s * 0.86); p.closePath(); p.fill();
      p.fillStyle = P.finestra; p.fillRect(x - s * 0.3, y - s * 0.45, s * 0.2, s * 0.18); finestre.push([x - s * 0.2, y - s * 0.36]); p.fillStyle = P.porta; p.fillRect(x + s * 0.08, y - s * 0.38, s * 0.2, s * 0.38); }
    const pale = [], nP = W < 600 ? 3 : 6;
    for (let k = 0; k < nP; k++) { const lontana = k % 2 === 0, x = W * (0.12 + k * (0.8 / nP)) + rnd(-20, 20), base = lontana ? yC(...C1, x) + 6 : yC(...C2, x) + 8, h = lontana ? H * 0.17 : H * 0.25; if (Math.abs(x - fx) < 40) continue; pale.push({ x, base, h: Math.min(h, lontana ? 150 : 220), a: rnd(0, 6), v: rnd(0.8, 1.4), lontana, f: rnd(0, 6) }); }
    pale.sort((a, b) => a.lontana === b.lontana ? 0 : a.lontana ? -1 : 1);
    function pala(ctx, q, t) {
      const top = q.base - q.h, s = q.h / 200, col = q.lontana && !notte ? "#e6eef2" : P.pala, ombra = P.ombra;
      const g = ctx.createLinearGradient(q.x - 6 * s, 0, q.x + 6 * s, 0); g.addColorStop(0, ombra); g.addColorStop(0.5, col); g.addColorStop(1, ombra);
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(q.x - 7 * s, q.base); ctx.lineTo(q.x - 3 * s, top); ctx.lineTo(q.x + 3 * s, top); ctx.lineTo(q.x + 7 * s, q.base); ctx.closePath(); ctx.fill();
      ctx.fillStyle = ombra; ctx.fillRect(q.x - 5 * s, top - 6 * s, 16 * s, 9 * s);
      ctx.save(); ctx.translate(q.x, top - 2 * s); ctx.rotate(q.a);
      for (let k = 0; k < 3; k++) { ctx.rotate(Math.PI * 2 / 3); ctx.fillStyle = col; ctx.strokeStyle = ombra; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-3 * s, 0); ctx.quadraticCurveTo(-5 * s, -q.h * 0.25, -1.5 * s, -q.h * 0.48); ctx.lineTo(1.5 * s, -q.h * 0.48); ctx.quadraticCurveTo(4 * s, -q.h * 0.2, 3 * s, 0); ctx.closePath(); ctx.fill(); ctx.stroke(); }
      ctx.fillStyle = ombra; ctx.beginPath(); ctx.arc(0, 0, 4.5 * s, 0, 7); ctx.fill(); ctx.restore();
      if (notte && Math.sin(t * 2.5 + q.f) > 0.2) { const lx = q.x + 4 * s, ly = top - 7 * s, gl = ctx.createRadialGradient(lx, ly, 0, lx, ly, 10); gl.addColorStop(0, "rgba(255,60,50,.95)"); gl.addColorStop(1, "rgba(255,60,50,0)"); ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(lx, ly, 10, 0, 7); ctx.fill(); }
    }
    const R = W < 600 ? 22 : 30, hexW = Math.sqrt(3) * R, celle = [];
    const ICONE = ["foglia", "goccia", "fulmine", "sole", "riciclo", "bit"];
    for (let row = 0, y = 60; y < orizz + R; row++, y += R * 1.5) for (let x = (row % 2) * hexW / 2; x < W + hexW; x += hexW) celle.push({ x, y, icona: Math.random() < 0.12 ? scegli(ICONE) : null, f: rnd(0, 6) });
    function esagono(ctx, x, y, r) { ctx.beginPath(); for (let k = 0; k < 6; k++) { const a = Math.PI / 6 + k * Math.PI / 3; k ? ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r) : ctx.moveTo(x + Math.cos(a) * r, y + Math.sin(a) * r); } ctx.closePath(); }
    function icona(ctx, tipo, x, y, s, col) {
      ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 1.6;
      if (tipo === "foglia") { ctx.beginPath(); ctx.moveTo(x - s, y + s); ctx.quadraticCurveTo(x - s, y - s, x + s, y - s); ctx.quadraticCurveTo(x + s, y + s, x - s, y + s); ctx.fill(); }
      else if (tipo === "goccia") { ctx.beginPath(); ctx.moveTo(x, y - s * 1.1); ctx.quadraticCurveTo(x + s, y + 0.1 * s, x, y + s); ctx.quadraticCurveTo(x - s, y + 0.1 * s, x, y - s * 1.1); ctx.fill(); }
      else if (tipo === "fulmine") { ctx.beginPath(); ctx.moveTo(x + s * 0.3, y - s); ctx.lineTo(x - s * 0.5, y + s * 0.1); ctx.lineTo(x, y + s * 0.1); ctx.lineTo(x - s * 0.3, y + s); ctx.lineTo(x + s * 0.5, y - s * 0.1); ctx.lineTo(x, y - s * 0.1); ctx.closePath(); ctx.fill(); }
      else if (tipo === "sole") { ctx.beginPath(); ctx.arc(x, y, s * 0.45, 0, 7); ctx.fill(); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * s * 0.65, y + Math.sin(a) * s * 0.65); ctx.lineTo(x + Math.cos(a) * s, y + Math.sin(a) * s); ctx.stroke(); } }
      else if (tipo === "riciclo") { for (let k = 0; k < 3; k++) { const a = k * Math.PI * 2 / 3 - Math.PI / 2; ctx.beginPath(); ctx.arc(x, y, s * 0.75, a + 0.3, a + 1.75); ctx.stroke(); const b = a + 1.75, ex = x + Math.cos(b) * s * 0.75, ey = y + Math.sin(b) * s * 0.75; ctx.beginPath(); ctx.moveTo(ex + Math.cos(b - 1.2) * 5, ey + Math.sin(b - 1.2) * 5); ctx.lineTo(ex + Math.cos(b + 1.57) * 4, ey + Math.sin(b + 1.57) * 4); ctx.lineTo(ex + Math.cos(b - 2.6) * 5, ey + Math.sin(b - 2.6) * 5); ctx.fill(); } }
      else { ctx.font = `bold ${s * 1.3}px ${SERIF}`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(Math.round(x + y) % 2 ? "01" : "10", x, y); ctx.textBaseline = "alphabetic"; }
    }
    const nuvole = Array.from({ length: notte ? 3 : 5 }, () => ({ x: rnd(0, W), y: rnd(0.1, 0.4) * orizz, s: rnd(0.7, 1.3), v: rnd(6, 16) }));
    const foglie = [], pixel = [];
    const lucciole = notte ? Array.from({ length: Math.round(W / 40) }, () => ({ x: rnd(0, W), y: rnd(orizz, H), vx: rnd(-15, 15), vy: rnd(-10, 10), f: rnd(0, 6) })) : [];
    return {
      scura: !!notte,
      disegna(ctx, t, dt) {
        ctx.drawImage(paes, 0, 0, W, H);
        const c1x = W * (0.5 + 0.4 * Math.sin(t * 0.21)), c1y = orizz * (0.5 + 0.3 * Math.cos(t * 0.17));
        celle.forEach(c => {
          const fade = Math.max(0, 1 - c.y / orizz) * 0.9 + 0.1, d = Math.hypot(c.x - c1x, c.y - c1y), on = Math.max(0, Math.sin(d / 90 - t * 1.6 + c.f * 0.15)) ** 3;
          esagono(ctx, c.x, c.y, R - 2); ctx.fillStyle = on > 0.05 ? `rgba(${c.x < W / 2 ? "52,170,110" : "40,150,220"},${(notte ? 0.3 : 0.22) * on * fade})` : "rgba(255,255,255,0)"; ctx.fill();
          ctx.strokeStyle = notte ? `rgba(90,200,160,${0.18 * fade})` : `rgba(42,122,82,${0.16 * fade})`; ctx.lineWidth = 1; ctx.stroke();
          if (c.icona && on > 0.25) icona(ctx, c.icona, c.x, c.y, R * 0.38, `rgba(${c.icona === "goccia" || c.icona === "bit" ? "60,160,230" : c.icona === "sole" || c.icona === "fulmine" ? "230,170,30" : "52,160,92"},${0.8 * on * fade})`);
        });
        const sx = W * 0.86, sy = Math.min(140, orizz * 0.3);
        if (notte) { /* falce di luna vera (niente disco scuro sopra) e alone sfumato disegnato sopra */
          falce(ctx, sx, sy, 24, 10, -6, 21, "#fffbe6");
          const gm = ctx.createRadialGradient(sx - 6, sy + 3, 8, sx, sy, 85); gm.addColorStop(0, "rgba(255,250,225,.35)"); gm.addColorStop(0.4, "rgba(255,250,225,.12)"); gm.addColorStop(1, "rgba(255,250,225,0)"); ctx.fillStyle = gm; ctx.beginPath(); ctx.arc(sx, sy, 85, 0, 7); ctx.fill(); }
        else { const gs = ctx.createRadialGradient(sx, sy, 10, sx, sy, 90); gs.addColorStop(0, "rgba(255,214,90,.9)"); gs.addColorStop(0.35, "rgba(255,214,90,.45)"); gs.addColorStop(1, "rgba(255,214,90,0)"); ctx.fillStyle = gs; ctx.beginPath(); ctx.arc(sx, sy, 90, 0, 7); ctx.fill(); }
        ctx.fillStyle = notte ? "rgba(120,140,180,.35)" : "rgba(255,255,255,.92)"; muoviNuvole(nuvole, dt, W, 70, orizz * 0.45, 54, 36); ctx.beginPath(); nuvole.forEach(n => { [[0, 0, 26], [-30, 8, 20], [30, 8, 22], [10, -14, 20], [-14, -8, 17]].forEach(([dx, dy, r], i) => { ctx.moveTo(n.x + dx * n.s + r * n.s, n.y + dy * n.s); ctx.arc(n.x + dx * n.s, n.y + dy * n.s, r * n.s, 0, Math.PI * 2); }); }); ctx.fill();
        pale.forEach(q => { q.a += q.v * dt; pala(ctx, q, t); });
        if (notte) {
          finestre.forEach(([x, y]) => { const g = ctx.createRadialGradient(x, y, 0, x, y, 16); g.addColorStop(0, "rgba(255,215,106,.5)"); g.addColorStop(1, "rgba(255,215,106,0)"); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 16, 0, 7); ctx.fill(); });
          lucciole.forEach(l => { l.x += (l.vx + Math.sin(t + l.f) * 10) * dt; l.y += (l.vy + Math.cos(t * 1.3 + l.f) * 8) * dt; if (l.x < 0 || l.x > W) l.vx *= -1; if (l.y < orizz || l.y > H) l.vy *= -1;
            const a = 0.5 + 0.5 * Math.sin(t * 3 + l.f * 2); const g = ctx.createRadialGradient(l.x, l.y, 0, l.x, l.y, 7); g.addColorStop(0, `rgba(230,255,120,${a})`); g.addColorStop(1, "rgba(230,255,120,0)"); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(l.x, l.y, 7, 0, 7); ctx.fill(); });
          return;
        }
        if (Math.random() < dt * 2.2 && foglie.length < 26) foglie.push({ x: -20, y: rnd(0.1, 0.8) * orizz, v: rnd(70, 140), f: rnd(0, 6), r: rnd(0, 6), s: rnd(10, 17), lim: rnd(0.4, 0.92) * W, c: scegli(["#3f9a52", "#6aa84f", "#9bbb3a", "#e0a02a", "#d9732a"]) });
        for (let i = foglie.length - 1; i >= 0; i--) {
          const fo = foglie[i]; fo.x += fo.v * dt; fo.y += (Math.sin(t * 2 + fo.f) * 35 + 10) * dt; fo.r += dt * 2;
          if (fo.x > fo.lim) { for (let k = 0; k < 12; k++) pixel.push({ x: fo.x + rnd(-fo.s, fo.s), y: fo.y + rnd(-fo.s, fo.s) / 2, vx: rnd(30, 90), vy: rnd(-30, 30), vita: 0, bit: Math.random() < 0.4 ? (Math.random() < 0.5 ? "0" : "1") : null, c: k % 3 ? fo.c : "#2a86c9", s: rnd(3, 6) }); foglie.splice(i, 1); continue; }
          ctx.save(); ctx.translate(fo.x, fo.y); ctx.rotate(Math.sin(fo.r) * 1.1); ctx.fillStyle = fo.c; ctx.beginPath(); ctx.moveTo(-fo.s, 0); ctx.bezierCurveTo(-fo.s * 0.4, -fo.s * 0.8, fo.s * 0.6, -fo.s * 0.6, fo.s, 0); ctx.bezierCurveTo(fo.s * 0.6, fo.s * 0.6, -fo.s * 0.4, fo.s * 0.8, -fo.s, 0); ctx.fill();
          ctx.strokeStyle = "rgba(255,255,255,.55)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-fo.s * 1.25, 0); ctx.lineTo(fo.s * 0.9, 0); for (let k = -0.5; k <= 0.5; k += 0.33) { ctx.moveTo(fo.s * k, 0); ctx.lineTo(fo.s * (k + 0.25), -fo.s * 0.32); ctx.moveTo(fo.s * k, 0); ctx.lineTo(fo.s * (k + 0.25), fo.s * 0.32); } ctx.stroke(); ctx.restore();
        }
        ctx.font = `bold 13px ${SERIF}`; ctx.textAlign = "center";
        for (let i = pixel.length - 1; i >= 0; i--) { const q = pixel[i]; q.vita += dt; q.x += q.vx * dt; q.y += q.vy * dt; const a = 0.85 * (1 - q.vita / 2.5); if (a <= 0) { pixel.splice(i, 1); continue; } ctx.fillStyle = rgba(q.c, a); if (q.bit) ctx.fillText(q.bit, q.x, q.y); else ctx.fillRect(q.x, q.y, q.s, q.s); }
      }
    };
  }

  /* ------------------------------------------------------------------ */
  /* LINGUISTICO: festoni di bandierine colorate con lettere di tanti alfabeti e saluti */
  function linguistico(W, H) {
    const LETTERE = ["A", "Ñ", "Ç", "ß", "É", "Ø", "Ä", "Ω", "Λ", "Σ", "Ж", "Я", "Б", "ب", "ع", "あ", "の", "中", "文", "한", "글", "Ü", "Ã", "Å", "Π", "Ф"];
    const SALUTI = ["Ciao", "Hello", "Hola", "Bonjour", "Hallo", "Olá", "Привет", "你好", "Merhaba", "Hej", "こんにちは", "Γειά"];
    const festoni = [], passo = W < 600 ? 34 : 44;
    const n = Math.max(4, Math.round((H - 140) / (W < 600 ? 120 : 105)));
    for (let k = 0; k < n; k++) {
      const y0 = 140 + k * (H - 160) / n + rnd(-15, 15), y1 = y0 + rnd(-60, 60), sag = rnd(25, 55), L = Math.hypot(W + 60, y1 - y0);
      const band = []; let i = 0; for (let s = passo / 2; s < L; s += passo, i++) band.push({ s: s / L, col: VIVI[(k * 3 + i) % VIVI.length], testo: (i % 6 === 3) ? scegli(SALUTI) : scegli(LETTERE), f: rnd(0, 6) });
      festoni.push({ y0, y1, sag, band, f: rnd(0, 6) });
    }
    const P = (fe, u, t) => { const x = -30 + u * (W + 60), y = fe.y0 + (fe.y1 - fe.y0) * u + Math.sin(Math.PI * u) * (fe.sag + Math.sin(t * 0.8 + fe.f) * 4); return [x, y]; };
    return {
      disegna(ctx, t) {
        festoni.forEach(fe => {
          ctx.strokeStyle = "rgba(110,90,60,.6)"; ctx.lineWidth = 1.5; ctx.beginPath(); for (let u = 0; u <= 1.001; u += 0.02) { const [x, y] = P(fe, u, t); u ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
          fe.band.forEach(b => {
            const [x, y] = P(fe, b.s, t), [x2, y2] = P(fe, Math.min(1, b.s + 0.01), t), ang = Math.atan2(y2 - y, x2 - x) + Math.sin(t * 1.6 + b.f) * 0.1;
            const lungo = b.testo.length > 2; ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
            const w = lungo ? Math.max(passo * 0.9, b.testo.length * 9 + 14) : passo * 0.72, h = lungo ? passo * 0.75 : passo * 0.95;
            ctx.fillStyle = b.col; ctx.globalAlpha = 0.85; ctx.beginPath();
            if (lungo) { ctx.moveTo(-w / 2, 0); ctx.lineTo(w / 2, 0); ctx.lineTo(w / 2, h); ctx.lineTo(0, h * 0.78); ctx.lineTo(-w / 2, h); } else { ctx.moveTo(-w / 2, 0); ctx.lineTo(w / 2, 0); ctx.lineTo(0, h); }
            ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1;
            ctx.fillStyle = "#fff"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.font = `bold ${lungo ? 12 : Math.round(passo * 0.36)}px ${SERIF}`;
            ctx.fillText(b.testo, 0, lungo ? h * 0.38 : h * 0.33); ctx.textBaseline = "alphabetic"; ctx.restore();
          });
        });
      }
    };
  }

  const COSTELLAZIONI = [
    { gr: "Ὠρίων", la: "Orion", s: [[0.2, 0.05], [0.75, 0.12], [0.38, 0.45], [0.5, 0.48], [0.62, 0.51], [0.25, 0.92], [0.8, 0.88], [0.5, 0.2]], l: [[0, 7], [1, 7], [0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6]] },
    { gr: "Κασσιόπεια", la: "Cassiopeia", s: [[0, 0.3], [0.25, 0.75], [0.5, 0.45], [0.75, 0.85], [1, 0.35]], l: [[0, 1], [1, 2], [2, 3], [3, 4]] },
    { gr: "Ἄρκτος Μεγάλη", la: "Ursa Maior", s: [[0, 0.2], [0.22, 0.25], [0.4, 0.35], [0.55, 0.5], [0.6, 0.85], [0.95, 0.85], [0.95, 0.5]], l: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]] },
    { gr: "Πήγασος", la: "Pegasus", s: [[0.2, 0.3], [0.65, 0.3], [0.65, 0.75], [0.2, 0.75], [0.95, 0.15], [0, 0.95], [0.9, 0.95]], l: [[0, 1], [1, 2], [2, 3], [3, 0], [1, 4], [3, 5], [2, 6]] },
    { gr: "Κύκνος", la: "Cygnus", s: [[0.5, 0], [0.5, 0.4], [0.5, 1], [0, 0.35], [1, 0.45], [0.2, 0.37], [0.8, 0.43]], l: [[0, 1], [1, 2], [3, 5], [5, 1], [1, 6], [6, 4]] },
    { gr: "Σκορπίος", la: "Scorpius", s: [[0.1, 0], [0.15, 0.2], [0.3, 0.35], [0.4, 0.5], [0.45, 0.7], [0.6, 0.85], [0.8, 0.9], [0.95, 0.75], [0.9, 0.6]], l: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8]] },
    { gr: "Λέων", la: "Leo", s: [[0.1, 0.4], [0.2, 0.15], [0.4, 0.05], [0.5, 0.3], [0.4, 0.5], [0.9, 0.55], [0.85, 0.9], [0.45, 0.85]], l: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [4, 7], [7, 6], [6, 5], [5, 3]] },
    { gr: "Λύρα", la: "Lyra", s: [[0.5, 0], [0.35, 0.35], [0.65, 0.35], [0.3, 0.95], [0.7, 0.95]], l: [[0, 1], [0, 2], [1, 2], [1, 3], [2, 4], [3, 4]] }
  ];
  /* tempio greco disegnato una volta sola (frontone, fregio, colonne doriche intere, stilobate con meandro) */
  function tempioGreco(W, H, notte) {
    const piccolo = W < 600, cw = piccolo ? 26 : Math.min(60, W * 0.05), fr = piccolo ? 70 : Math.min(130, H * 0.16), baseT = 54, alto = baseT + fr;
    const marmo = notte ? "#d9cfb8" : "#efe6d2", ombra = notte ? "#9c8d6c" : "#c9b994", scuro = notte ? "#7e6f50" : "#a8956b", chiaro = notte ? "#cfc4aa" : "#e6dbc1";
    const c = document.createElement("canvas"); c.width = W; c.height = H; const p = c.getContext("2d");
    const archTop = baseT + fr * 0.55;
    p.fillStyle = marmo; p.beginPath(); p.moveTo(0, archTop); p.lineTo(W / 2, baseT + 4); p.lineTo(W, archTop); p.closePath(); p.fill(); p.strokeStyle = ombra; p.lineWidth = 3; p.stroke();
    p.fillStyle = chiaro; p.beginPath(); p.moveTo(W * 0.08, archTop - 4); p.lineTo(W / 2, baseT + fr * 0.12); p.lineTo(W * 0.92, archTop - 4); p.closePath(); p.fill();
    p.fillStyle = marmo; p.fillRect(0, archTop, W, fr * 0.27); p.strokeStyle = ombra; p.lineWidth = 2; p.strokeRect(-2, archTop, W + 4, fr * 0.27);
    const tg = piccolo ? 26 : 44; for (let x = 6; x < W; x += tg * 2) { p.fillStyle = ombra; p.fillRect(x, archTop + 4, tg * 0.55, fr * 0.27 - 8); p.fillStyle = marmo; p.fillRect(x + tg * 0.14, archTop + 4, 2, fr * 0.27 - 8); p.fillRect(x + tg * 0.36, archTop + 4, 2, fr * 0.27 - 8); }
    p.fillStyle = chiaro; p.fillRect(0, archTop + fr * 0.27, W, fr * 0.18); p.strokeStyle = ombra; p.strokeRect(-2, archTop + fr * 0.27, W + 4, fr * 0.18);
    const archBot = archTop + fr * 0.45, sb = H - 46;
    /* colonna dorica tutta d'un pezzo: abaco, echino, collarino e fusto rastremato che poggia direttamente sullo stilobate */
    function colonna(x) {
      const top = archBot, w = cw, yA = top + w * 0.2, yE = yA + w * 0.28, yN = yE + w * 0.1;
      const g = p.createLinearGradient(x - w * 0.6, 0, x + w * 0.6, 0); g.addColorStop(0, ombra); g.addColorStop(0.3, marmo); g.addColorStop(0.62, marmo); g.addColorStop(1, scuro);
      p.fillStyle = g; p.strokeStyle = ombra; p.lineWidth = 1.2;
      p.fillRect(x - w * 0.78, top, w * 1.56, w * 0.2); p.strokeRect(x - w * 0.78, top, w * 1.56, w * 0.2);
      p.beginPath(); p.moveTo(x - w * 0.72, yA); p.quadraticCurveTo(x - w * 0.7, yE - w * 0.04, x - w * 0.5, yE); p.lineTo(x + w * 0.5, yE); p.quadraticCurveTo(x + w * 0.7, yE - w * 0.04, x + w * 0.72, yA); p.closePath(); p.fill(); p.stroke();
      p.beginPath(); p.moveTo(x - w * 0.5, yE); p.lineTo(x + w * 0.5, yE); p.lineTo(x + w * 0.6, sb); p.lineTo(x - w * 0.6, sb); p.closePath(); p.fill();
      p.strokeStyle = scuro; p.lineWidth = 1; [yE + 3, yE + 6, yN].forEach(y => { const k = (y - yE) / (sb - yE), hw = w * (0.5 + 0.1 * k); p.beginPath(); p.moveTo(x - hw, y); p.lineTo(x + hw, y); p.stroke(); });
      p.strokeStyle = notte ? "rgba(90,80,60,.5)" : "rgba(150,130,90,.45)"; for (let k = 1; k < 8; k++) { const f = -0.5 + k / 8; p.beginPath(); p.moveTo(x + f * w, yN + 2); p.lineTo(x + f * w * 1.2, sb); p.stroke(); }
    }
    colonna(cw * 1.1); colonna(W - cw * 1.1); if (W > 1100) { colonna(cw * 3); colonna(W - cw * 3); }
    [[0, 16], [16, 15], [31, 15]].forEach(([dy, h], k) => { p.fillStyle = k % 2 ? chiaro : marmo; p.fillRect(0, sb + dy, W, h); p.strokeStyle = ombra; p.lineWidth = 1.5; p.strokeRect(-2, sb + dy, W + 4, h); });
    p.strokeStyle = scuro; p.lineWidth = 1.5; const u = 4; for (let x = 4; x < W; x += u * 4) { const y = sb + 18; p.beginPath(); p.moveTo(x, y + u * 2.5); p.lineTo(x, y); p.lineTo(x + u * 3, y); p.lineTo(x + u * 3, y + u * 2); p.lineTo(x + u, y + u * 2); p.lineTo(x + u, y + u); p.lineTo(x + u * 2, y + u); p.stroke(); }
    const marg = piccolo ? cw * 2 : cw * (W > 1100 ? 4 : 2.2);
    return { canvas: c, alto, zona: { x0: marg, x1: W - marg, y0: alto + 20, y1: H - 70 }, piccolo };
  }

  /* CLASSICO DI NOTTE: tempio + cielo stellato con le costellazioni mitologiche (nomi in greco e latino, senza sovrapporsi) */
  function classicoNotte(W, H) {
    const T = tempioGreco(W, H, true), { zona, piccolo, alto } = T;
    const stelle = Array.from({ length: Math.round(W * H / 3500) }, () => [rnd(0, W), rnd(alto, H - 46), rnd(0.4, 1.5), rnd(0, 6)]);
    const attive = []; let prossima = 0;
    return {
      scura: true, alto,
      disegna(ctx, t, dt) {
        const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#0b1430"); g.addColorStop(1, "#1d2c57"); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        stelle.forEach(([x, y, r, f]) => { ctx.fillStyle = `rgba(255,250,230,${0.35 + 0.35 * Math.sin(t * 1.3 + f)})`; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); });
        prossima -= dt;
        if (prossima <= 0 && attive.length < (piccolo ? 2 : 4)) {
          prossima = rnd(1.5, 3); const c = scegli(COSTELLAZIONI.filter(c => !attive.some(a => a.c === c)));
          if (c) { const s = piccolo ? rnd(110, 150) : rnd(170, 240);
            for (let k = 0; k < 20; k++) { const x = rnd(zona.x0, Math.max(zona.x0 + 1, zona.x1 - s)), y = rnd(zona.y0, Math.max(zona.y0 + 1, zona.y1 - s - 40));
              if (!attive.some(a => x < a.x + a.s + 30 && a.x < x + s + 30 && y < a.y + a.s + 70 && a.y < y + s + 70)) { attive.push({ c, x, y, s, vita: 0 }); break; } } }
        }
        for (let i = attive.length - 1; i >= 0; i--) {
          const a = attive[i]; a.vita += dt; if (a.vita > 13) { attive.splice(i, 1); continue; }
          const al = a.vita > 11 ? 1 - (a.vita - 11) / 2 : 1, prog = Math.min(1, a.vita / 3), P = a.c.s.map(([x, y]) => [a.x + x * a.s, a.y + y * a.s]);
          ctx.strokeStyle = `rgba(200,215,255,${0.55 * al})`; ctx.lineWidth = 1.3;
          a.c.l.forEach(([i0, i1], k) => { const q = Math.max(0, Math.min(1, prog * a.c.l.length - k)); if (!q) return; const [x0, y0] = P[i0], [x1, y1] = P[i1]; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + (x1 - x0) * q, y0 + (y1 - y0) * q); ctx.stroke(); });
          P.forEach(([x, y]) => { const gl = ctx.createRadialGradient(x, y, 0, x, y, 9); gl.addColorStop(0, `rgba(255,248,220,${al})`); gl.addColorStop(1, "rgba(255,248,220,0)"); ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(x, y, 9, 0, 7); ctx.fill(); });
          const na = Math.max(0, Math.min(1, (a.vita - 2.5) / 1)) * al; ctx.textAlign = "center";
          ctx.fillStyle = `rgba(232,200,120,${na})`; ctx.font = `italic ${piccolo ? 16 : 20}px ${SERIF}`; ctx.fillText(a.c.gr, a.x + a.s / 2, a.y + a.s + 24);
          ctx.fillStyle = `rgba(200,210,235,${na * 0.85})`; ctx.font = `${piccolo ? 12 : 14}px ${SERIF}`; ctx.fillText(a.c.la.toUpperCase().split("").join(" "), a.x + a.s / 2, a.y + a.s + 42);
        }
        ctx.drawImage(T.canvas, 0, 0, W, H);
      }
    };
  }

  /* CLASSICO DI GIORNO: tra le colonne del tempio il paesaggio dell'Egeo (mare, isole con un tempio e case bianche,
     ulivi, una barca a vela, gabbiani) e in primo piano una meridiana di marmo che segna l'ORA REALE del dispositivo;
     anche il sole è nella posizione dell'ora reale. */
  function classicoGiorno(W, H) {
    const T = tempioGreco(W, H, false), { zona, alto, piccolo } = T;
    const orizz = alto + (H - alto) * (piccolo ? 0.5 : 0.56), costa = H - 46;
    const ora = () => { const d = new Date(); return Math.max(6.2, Math.min(17.8, d.getHours() + d.getMinutes() / 60)); };
    /* paesaggio fisso disegnato una volta */
    const c = document.createElement("canvas"); c.width = W; c.height = H; const p = c.getContext("2d");
    const cielo = p.createLinearGradient(0, alto, 0, orizz); cielo.addColorStop(0, "#5fb0e8"); cielo.addColorStop(1, "#d9effa"); p.fillStyle = cielo; p.fillRect(0, 0, W, orizz);
    const mare = p.createLinearGradient(0, orizz, 0, costa); mare.addColorStop(0, "#1f6fb8"); mare.addColorStop(0.6, "#2b8fd0"); mare.addColorStop(1, "#3fb6d6"); p.fillStyle = mare; p.fillRect(0, orizz, W, costa - orizz);
    /* isole all'orizzonte */
    function isola(x0, w, h, col) { p.fillStyle = col; p.beginPath(); p.moveTo(x0, orizz + 1); for (let k = 0; k <= 30; k++) { const u = k / 30; p.lineTo(x0 + u * w, orizz - Math.sin(Math.PI * u) ** 0.8 * h * (0.85 + 0.15 * Math.sin(u * 9))); } p.lineTo(x0 + w, orizz + 1); p.closePath(); p.fill(); }
    const iw = Math.min(W * 0.34, 420);
    isola(zona.x0 + (zona.x1 - zona.x0) * 0.04, iw, piccolo ? 30 : 55, "#8fa7c4");
    isola(zona.x0 + (zona.x1 - zona.x0) * 0.58, iw * 0.9, piccolo ? 24 : 42, "#9fb4cc");
    isola(zona.x0 + (zona.x1 - zona.x0) * 0.34, iw * 0.55, piccolo ? 16 : 26, "#b2c3d6");
    /* tempietto sull'isola di sinistra */
    const tx = zona.x0 + (zona.x1 - zona.x0) * 0.04 + iw * 0.5, ty = orizz - (piccolo ? 30 : 55) * 0.98, ts = piccolo ? 0.55 : 1;
    p.fillStyle = "#f3eee2"; p.fillRect(tx - 30 * ts, ty - 4 * ts, 60 * ts, 4 * ts); for (let k = 0; k < 7; k++) p.fillRect(tx - 26 * ts + k * 8.4 * ts, ty - 22 * ts, 4 * ts, 18 * ts);
    p.fillRect(tx - 30 * ts, ty - 26 * ts, 60 * ts, 4 * ts); p.beginPath(); p.moveTo(tx - 31 * ts, ty - 26 * ts); p.lineTo(tx, ty - 36 * ts); p.lineTo(tx + 31 * ts, ty - 26 * ts); p.closePath(); p.fill();
    /* case bianche con cupole blu sull'isola di destra */
    const cx0 = zona.x0 + (zona.x1 - zona.x0) * 0.58 + iw * 0.25;
    for (let k = 0; k < 9; k++) { const x = cx0 + (k % 5) * 18 * ts + rnd(-3, 3), y = orizz - (piccolo ? 10 : 18) - Math.floor(k / 5) * 12 * ts - Math.sin((x - cx0) / (iw * 0.9) * Math.PI) * 14 * ts, w = rnd(12, 18) * ts, h = rnd(9, 13) * ts;
      p.fillStyle = "#fbfbf7"; p.fillRect(x, y - h, w, h); p.fillStyle = "#3a6fb5"; p.fillRect(x + w * 0.35, y - h * 0.55, w * 0.25, h * 0.35); if (k % 4 === 1) { p.fillStyle = "#2f5fae"; p.beginPath(); p.arc(x + w / 2, y - h, w * 0.4, Math.PI, 0); p.fill(); } }
    /* costa in primo piano con rocce chiare */
    p.fillStyle = "#d9c59a"; p.beginPath(); p.moveTo(0, costa + 2); for (let x = 0; x <= W; x += 12) p.lineTo(x, costa - 14 - Math.sin(x / 70) * 8 - Math.sin(x / 23) * 3); p.lineTo(W, costa + 2); p.closePath(); p.fill();
    p.fillStyle = "#c4ac7c"; for (let k = 0; k < W / 40; k++) { const x = rnd(0, W); p.beginPath(); p.ellipse(x, costa - 8, rnd(8, 18), rnd(4, 7), 0, 0, 7); p.fill(); }
    /* ulivi: tronco nodoso disegnato una volta, chioma animata */
    const ulivi = [];
    const posUlivi = piccolo ? [0.1, 0.9] : [0.05, 0.2, 0.8, 0.95];
    posUlivi.forEach(u => { const x = zona.x0 + (zona.x1 - zona.x0) * u, y = costa - 16, h = piccolo ? 60 : 95;
      p.strokeStyle = "#6b5640"; p.lineCap = "round"; p.lineWidth = piccolo ? 5 : 8; p.beginPath(); p.moveTo(x, y); p.bezierCurveTo(x - 10, y - h * 0.3, x + 12, y - h * 0.5, x - 4, y - h * 0.75); p.stroke();
      p.lineWidth = piccolo ? 3 : 5; p.beginPath(); p.moveTo(x + 2, y - h * 0.45); p.quadraticCurveTo(x + 22, y - h * 0.6, x + 26, y - h * 0.8); p.moveTo(x - 6, y - h * 0.55); p.quadraticCurveTo(x - 24, y - h * 0.65, x - 28, y - h * 0.82); p.stroke();
      ulivi.push({ x, y: y - h * 0.82, r: piccolo ? 26 : 40, f: rnd(0, 6), ciuffi: Array.from({ length: 16 }, () => [rnd(-1.2, 1.2), rnd(-0.7, 0.5), rnd(0.35, 0.6)]) }); });
    /* meridiana: posizione e geometria */
    const md = { x: piccolo ? W * 0.5 : zona.x0 + (zona.x1 - zona.x0) * 0.5, y: costa - (piccolo ? 40 : 58), rx: piccolo ? 70 : 120 };
    md.ry = md.rx * 0.44;
    const LAT = 41 * Math.PI / 180, ROMANI = ["VI", "VII", "VIII", "IX", "X", "XI", "XII", "I", "II", "III", "IV", "V", "VI"];
    const angoloOra = h => Math.atan(Math.sin(LAT) * Math.tan((h - 12) * 15 * Math.PI / 180)) + (h < 6 || h > 18 ? Math.PI : 0);
    const P = (a, k) => [md.x + Math.sin(a) * md.rx * k, md.y - Math.cos(a) * md.ry * k];
    function meridiana(ctx, t) {
      /* piedistallo */
      const g = ctx.createLinearGradient(md.x - md.rx * 0.4, 0, md.x + md.rx * 0.4, 0); g.addColorStop(0, "#cbbd9c"); g.addColorStop(0.4, "#f2ead8"); g.addColorStop(1, "#b9a985");
      ctx.fillStyle = g; ctx.fillRect(md.x - md.rx * 0.3, md.y, md.rx * 0.6, costa - md.y); ctx.fillRect(md.x - md.rx * 0.42, costa - 10, md.rx * 0.84, 10);
      /* quadrante di marmo visto in prospettiva */
      ctx.fillStyle = "#b9a985"; ctx.beginPath(); ctx.ellipse(md.x, md.y + 6, md.rx * 1.04, md.ry * 1.08, 0, 0, 7); ctx.fill();
      const gq = ctx.createRadialGradient(md.x - md.rx * 0.3, md.y - md.ry * 0.5, 4, md.x, md.y, md.rx); gq.addColorStop(0, "#fbf7ee"); gq.addColorStop(1, "#e2d6bb");
      ctx.fillStyle = gq; ctx.beginPath(); ctx.ellipse(md.x, md.y, md.rx, md.ry, 0, 0, 7); ctx.fill(); ctx.strokeStyle = "#a8956b"; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.beginPath(); ctx.ellipse(md.x, md.y, md.rx * 0.86, md.ry * 0.86, 0, 0, 7); ctx.stroke();
      /* linee orarie e numeri romani (dalle 6 alle 18) */
      ctx.strokeStyle = "rgba(120,100,60,.7)"; ctx.lineWidth = 1; ctx.fillStyle = "#6e5a36"; ctx.font = `${piccolo ? 8 : 11}px ${SERIF}`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      for (let h = 6; h <= 18; h++) { const a = angoloOra(h), [x0, y0] = P(a, 0.12), [x1, y1] = P(a, 0.86), [xn, yn] = P(a, 0.94); ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.fillText(ROMANI[h - 6], xn, yn); }
      /* ombra dello gnomone all'ora reale (va dalla parte opposta al sole) */
      const a = angoloOra(ora()), [sx, sy] = P(a, 0.84);
      ctx.fillStyle = "rgba(50,35,15,.6)"; ctx.beginPath(); ctx.moveTo(md.x - 3, md.y); ctx.lineTo(sx, sy); ctx.lineTo(md.x + 3, md.y); ctx.closePath(); ctx.fill();
      /* gnomone di bronzo, inclinato verso nord */
      ctx.fillStyle = "#9a6b2a"; ctx.strokeStyle = "#6b4a1a"; ctx.beginPath(); ctx.moveTo(md.x, md.y); ctx.lineTo(md.x, md.y - md.ry * 0.85); ctx.lineTo(md.x + 3, md.y - md.ry * 0.85); ctx.lineTo(md.x + 3, md.y - md.ry * 0.1); ctx.lineTo(md.x, md.y - md.rx * 0.32 - md.ry * 0.2); ctx.closePath(); ctx.fill(); ctx.stroke();
      /* motto sul bordo anteriore */
      ctx.fillStyle = "#7d6a46"; ctx.font = `bold ${piccolo ? 8 : 12}px ${SERIF}`; ctx.fillText("T E M P U S   F U G I T", md.x, md.y + md.ry * 0.62);
      ctx.textBaseline = "alphabetic";
    }
    const nuvole = Array.from({ length: piccolo ? 3 : 5 }, () => ({ x: rnd(0, W), y: rnd(alto + 30, orizz - 80), s: rnd(0.6, 1.1), v: rnd(4, 9) }));
    const gabbiani = Array.from({ length: piccolo ? 3 : 6 }, () => ({ x: rnd(0, W), y: rnd(alto + 40, orizz - 30), v: rnd(20, 40), f: rnd(0, 6), d: Math.random() < 0.5 ? 1 : -1 }));
    const barca = { x: rnd(zona.x0, zona.x1), v: piccolo ? 6 : 10 };
    return {
      alto,
      disegna(ctx, t, dt) {
        ctx.drawImage(c, 0, 0, W, H);
        /* sole nella posizione dell'ora reale: sorge a sinistra, è alto a mezzogiorno, tramonta a destra */
        const fr = (ora() - 6) / 12, sx = zona.x0 + (zona.x1 - zona.x0) * (0.05 + 0.9 * fr), sy = orizz - 20 - Math.sin(Math.PI * fr) * (orizz - alto - 90);
        const gs = ctx.createRadialGradient(sx, sy, 8, sx, sy, 110); gs.addColorStop(0, "rgba(255,250,220,1)"); gs.addColorStop(0.2, "rgba(255,230,140,.9)"); gs.addColorStop(1, "rgba(255,220,120,0)"); ctx.fillStyle = gs; ctx.beginPath(); ctx.arc(sx, sy, 110, 0, 7); ctx.fill();
        ctx.fillStyle = "#fff6d0"; ctx.beginPath(); ctx.arc(sx, sy, 22, 0, 7); ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,.9)"; muoviNuvole(nuvole, dt, W, alto + 30, orizz - 70, 54, 36); ctx.beginPath(); nuvole.forEach(n => { [[0, 0, 26], [-30, 8, 20], [30, 8, 22], [10, -14, 20], [-14, -8, 17]].forEach(([dx, dy, r]) => { ctx.moveTo(n.x + dx * n.s + r * n.s, n.y + dy * n.s); ctx.arc(n.x + dx * n.s, n.y + dy * n.s, r * n.s, 0, Math.PI * 2); }); }); ctx.fill();
        /* riflesso del sole e luccichii sul mare */
        for (let k = 0; k < 22; k++) { const y = orizz + 4 + k * (costa - orizz - 30) / 22, w = (14 + k * 1.2) * (0.6 + 0.4 * Math.sin(t * 1.7 + k * 2.3)); ctx.fillStyle = `rgba(255,250,220,${0.5 - k * 0.018})`; ctx.fillRect(sx - w / 2 + Math.sin(t * 0.8 + k * 1.9) * 6, y, w, 1.5); }
        ctx.fillStyle = "rgba(255,255,255,.6)"; for (let k = 0; k < 40; k++) { const x = (k * 113 + t * 12) % W, y = orizz + 10 + ((k * 61) % 100) / 100 * (costa - orizz - 30); if (Math.sin(t * 2.5 + k) > 0.7) ctx.fillRect(x, y, 6, 1.5); }
        /* barca a vela */
        barca.x += barca.v * dt; if (barca.x > W + 60) barca.x = -60;
        const by = orizz + (costa - orizz) * 0.35 + Math.sin(t * 1.4) * 1.5;
        ctx.fillStyle = "#7a4a2a"; ctx.beginPath(); ctx.moveTo(barca.x - 26, by); ctx.lineTo(barca.x + 28, by); ctx.lineTo(barca.x + 20, by + 8); ctx.lineTo(barca.x - 20, by + 8); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = "#5a3a1a"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(barca.x, by); ctx.lineTo(barca.x, by - 44); ctx.stroke();
        ctx.fillStyle = "#fbf5e6"; ctx.beginPath(); ctx.moveTo(barca.x + 2, by - 42); ctx.quadraticCurveTo(barca.x + 24, by - 22, barca.x + 22, by - 4); ctx.lineTo(barca.x + 2, by - 4); ctx.closePath(); ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,.5)"; ctx.fillRect(barca.x - 60, by + 7, 34, 1.5);
        /* gabbiani */
        gabbiani.forEach(g => { g.x += g.d * g.v * dt; if (g.x > W + 30) g.x = -30; if (g.x < -30) g.x = W + 30; const ali = Math.sin(t * 5 + g.f) * 5;
          ctx.strokeStyle = "rgba(60,70,90,.8)"; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(g.x - 11, g.y - ali); ctx.quadraticCurveTo(g.x - 5, g.y - 6, g.x, g.y); ctx.quadraticCurveTo(g.x + 5, g.y - 6, g.x + 11, g.y - ali); ctx.stroke(); });
        /* chiome degli ulivi, verde argento, mosse dal vento */
        ulivi.forEach(u => u.ciuffi.forEach(([dx, dy, r], k) => { const w = Math.sin(t * 1.3 + u.f + k) * 2.5;
          ctx.fillStyle = k % 3 === 0 ? "#9fb08a" : k % 3 === 1 ? "#7f9473" : "#6d8466"; ctx.beginPath(); ctx.ellipse(u.x + dx * u.r + w, u.y + dy * u.r, u.r * r, u.r * r * 0.7, 0, 0, 7); ctx.fill(); }));
        meridiana(ctx, t);
        ctx.drawImage(T.canvas, 0, 0, W, H);
      }
    };
  }

  /* ------------------------------------------------------------------ */
  /* ARTISTICO DI GIORNO: macchie di colore e gocce che diventano schizzi "a fumetto":
     forma tonda e gonfia con lobi arrotondati, gocce staccate, bordo più scuro e riflesso bianco */
  function artistico(W, H, notte) {
    /* di notte: stesso tema su fondo scuro, con colori fluorescenti che brillano (come vernice sotto la luce UV) */
    /* verde e azzurro in tonalità più piene (come viola e arancione), niente verde acido o ciano */
    const TINTE = notte ? ["#ff2bd6", "#ff6b00", "#b026ff", "#ffd400", "#ff1744", "#3ac46a", "#3d6dff", "#ff8a1f", "#8f3dff"] : VIVI;
    const macchie = [], schizzi = [], gocce = [];
    function contorno(n, irr) { return Array.from({ length: n }, () => 1 + rnd(-irr, irr)); }
    function curvaChiusa(ctx, pts) { const n = pts.length; ctx.beginPath(); const m = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; ctx.moveTo(...m(pts[n - 1], pts[0])); for (let i = 0; i < n; i++) { const q = m(pts[i], pts[(i + 1) % n]); ctx.quadraticCurveTo(pts[i][0], pts[i][1], q[0], q[1]); } ctx.closePath(); }
    function nuovaMacchia() { macchie.push({ x: rnd(0, W), y: rnd(0, H), R: rnd(70, 180), c: scegli(TINTE), vita: 0, durata: rnd(10, 16), strati: Array.from({ length: 5 }, () => contorno(14, 0.25)), rot: rnd(0, 6) }); }
    for (let i = 0; i < 6; i++) { nuovaMacchia(); macchie[i].vita = rnd(0, 7); }
    /* uno schizzo è un'unione di cerchi: corpo centrale + lobi gonfi (catene di cerchi che finiscono con una "palla") + gocce staccate */
    function nuovoSchizzo(x, y, c) {
      const r = rnd(20, 34), cerchi = [[0, 0, r]];
      const n = Math.floor(rnd(6, 10)), a0 = rnd(0, 6);
      for (let k = 0; k < n; k++) {
        const a = a0 + k * Math.PI * 2 / n + rnd(-0.25, 0.25), L = rnd(1.1, 2.1), corto = Math.random() < 0.4;
        cerchi.push([Math.cos(a) * r * 0.75, Math.sin(a) * r * 0.75, r * rnd(0.45, 0.6)]);
        if (!corto) { cerchi.push([Math.cos(a) * r * L * 0.75, Math.sin(a) * r * L * 0.75, r * rnd(0.18, 0.26)]); cerchi.push([Math.cos(a) * r * L, Math.sin(a) * r * L, r * rnd(0.28, 0.4)]); }
      }
      const gocc = Array.from({ length: Math.floor(rnd(4, 9)) }, () => { const a = rnd(0, 7), d = rnd(2.4, 3.4) * r; return [Math.cos(a) * d, Math.sin(a) * d, r * rnd(0.1, 0.22)]; });
      schizzi.push({ x, y, c, vita: 0, cerchi, gocc, r });
    }
    function disegnaCerchi(ctx, s, lista, k, extra) { lista.forEach(([dx, dy, r]) => { ctx.beginPath(); ctx.arc(s.x + dx * k, s.y + dy * k, Math.max(0.1, r * k + extra), 0, 7); ctx.fill(); }); }
    let prossimaM = 1, prossimaG = 0.3;
    return {
      scura: !!notte,
      disegna(ctx, t, dt) {
        if (notte) { ctx.fillStyle = "#07070f"; ctx.fillRect(0, 0, W, H); ctx.globalCompositeOperation = "lighter"; }
        prossimaM -= dt; if (prossimaM <= 0 && macchie.length < 10) { prossimaM = rnd(1, 2); nuovaMacchia(); }
        for (let i = macchie.length - 1; i >= 0; i--) {
          const m = macchie[i]; m.vita += dt; const k = m.vita / m.durata; if (k >= 1) { macchie.splice(i, 1); continue; }
          const cr = 1 - Math.pow(1 - Math.min(1, k * 2.5), 3), a = k < 0.65 ? 1 : 1 - (k - 0.65) / 0.35;
          m.strati.forEach((s, j) => { const r = m.R * cr * (0.65 + j * 0.1); ctx.fillStyle = rgba(m.c, (notte ? 0.06 : 0.08) * a); curvaChiusa(ctx, s.map((q, n) => { const an = m.rot + n / s.length * Math.PI * 2; return [m.x + Math.cos(an) * r * q, m.y + Math.sin(an) * r * q]; })); ctx.fill(); });
        }
        if (notte) ctx.globalCompositeOperation = "source-over";
        prossimaG -= dt; if (prossimaG <= 0) { prossimaG = rnd(0.4, 0.9); gocce.push({ x: rnd(0.04, 0.96) * W, y: -20, fine: rnd(0.15, 0.92) * H, v: 0, c: scegli(TINTE) }); }
        for (let i = gocce.length - 1; i >= 0; i--) { const g = gocce[i]; g.v += 1000 * dt; g.y += g.v * dt; if (g.y >= g.fine) { gocce.splice(i, 1); nuovoSchizzo(g.x, g.fine, g.c); continue; }
          if (notte) { const gl = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, 18); gl.addColorStop(0, rgba(g.c, 0.6)); gl.addColorStop(1, rgba(g.c, 0)); ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(g.x, g.y, 18, 0, 7); ctx.fill(); }
          ctx.fillStyle = g.c; ctx.beginPath(); ctx.moveTo(g.x, g.y - 14); ctx.quadraticCurveTo(g.x + 7, g.y, g.x, g.y + 7); ctx.quadraticCurveTo(g.x - 7, g.y, g.x, g.y - 14); ctx.fill(); }
        for (let i = schizzi.length - 1; i >= 0; i--) {
          const s = schizzi[i]; s.vita += dt; if (s.vita > 12) { schizzi.splice(i, 1); continue; }
          const kk = Math.min(1, s.vita * 4), e = kk < 1 ? 1 + 0.18 * Math.sin(kk * Math.PI) - (1 - kk) : 1, a = s.vita < 9 ? 1 : 1 - (s.vita - 9) / 3;
          ctx.save(); ctx.globalAlpha = 0.92 * a;
          if (notte) { const R = s.r * 3.4 * e, gl = ctx.createRadialGradient(s.x, s.y, s.r * 0.5, s.x, s.y, R); gl.addColorStop(0, rgba(s.c, 0.45)); gl.addColorStop(1, rgba(s.c, 0)); ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(s.x, s.y, R, 0, 7); ctx.fill(); ctx.fillStyle = s.c; disegnaCerchi(ctx, s, s.cerchi, e, 2.5); }
          ctx.fillStyle = notte ? schiarisci(s.c, 0.45) : scurisci(s.c, 0.35); disegnaCerchi(ctx, s, s.cerchi, e, notte ? 0 : 2.5); disegnaCerchi(ctx, s, s.gocc, Math.min(1, kk * 1.2), 2);
          ctx.fillStyle = s.c; disegnaCerchi(ctx, s, s.cerchi, e, notte ? -3 : 0); disegnaCerchi(ctx, s, s.gocc, Math.min(1, kk * 1.2), 0);
          ctx.fillStyle = "rgba(255,255,255,.55)"; ctx.beginPath(); ctx.ellipse(s.x - s.r * 0.35 * e, s.y - s.r * 0.4 * e, s.r * 0.32 * e, s.r * 0.15 * e, -0.6, 0, 7); ctx.fill();
          ctx.beginPath(); ctx.arc(s.x + s.r * 0.1 * e, s.y - s.r * 0.62 * e, s.r * 0.07 * e, 0, 7); ctx.fill();
          ctx.restore();
        }
      }
    };
  }

  /* ------------------------------------------------------------------ */
  /* TRASPORTI E LOGISTICA (biennio): paesaggio con cielo, ferrovia, strada a due corsie e mare;
     su ogni corsia i mezzi vanno alla stessa velocità e restano distanziati (niente sovrapposizioni) */
  function trasporti(W, H, notte) {
    const piccolo = W < 600, k = piccolo ? 0.7 : 1;
    const yAria = H * 0.2, yTreno = H * 0.47, yS1 = H * 0.64, yS2 = H * 0.74, yMare = H * 0.88;
    const fondo = document.createElement("canvas"); fondo.width = W; fondo.height = H; const f = fondo.getContext("2d");
    const cielo = f.createLinearGradient(0, 0, 0, yTreno); cielo.addColorStop(0, notte ? "#0a1430" : "#cfe8fb"); cielo.addColorStop(1, notte ? "#26385f" : "#eef7ff"); f.fillStyle = cielo; f.fillRect(0, 0, W, yTreno + 10);
    if (notte) { for (let i = 0; i < W * yTreno / 1400; i++) { f.fillStyle = `rgba(255,255,240,${rnd(0.3, 0.9)})`; f.beginPath(); f.arc(rnd(0, W), rnd(0, yTreno - 120), rnd(0.4, 1.3), 0, 7); f.fill(); }
      const ly = H * 0.1 + (W < 600 ? 80 : 0); falce(f, W * 0.12, ly, 22, 9, -5, 19, "#fffbe6"); const ga = f.createRadialGradient(W * 0.12, ly, 6, W * 0.12, ly, 70); ga.addColorStop(0, "rgba(255,250,225,.3)"); ga.addColorStop(1, "rgba(255,250,225,0)"); f.fillStyle = ga; f.beginPath(); f.arc(W * 0.12, ly, 70, 0, 7); f.fill(); }
    /* città lontana */
    const palazzi = [];
    for (let x = 0; x < W;) { const w = rnd(24, 60), h = rnd(30, 110); palazzi.push([x, yTreno - 30 - h, w, h + 30, notte ? "#1c2740" : "#c7d6e6"]); x += w + rnd(0, 6); }
    for (let x = 10; x < W; x += rnd(60, 140)) { const w = rnd(18, 34), h = rnd(70, 150); palazzi.push([x, yTreno - 30 - h, w, h + 30, notte ? "#16203a" : "#b5c8db"]); }
    /* finestre solo dentro i palazzi (prima comparivano anche nel cielo) */
    palazzi.forEach(([x, y, w, h, c]) => { f.fillStyle = c; f.fillRect(x, y, w, h);
      f.fillStyle = notte ? "rgba(255,215,110,.85)" : "rgba(255,255,255,.55)";
      for (let yy = y + 6; yy < y + h - 34; yy += 9) for (let xx = x + 4; xx < x + w - 6; xx += 8) if (Math.random() < (notte ? 0.35 : 0.2)) f.fillRect(xx, yy, 3, 4); });
    /* terrapieno, ferrovia */
    f.fillStyle = notte ? "#223b2c" : "#9fcf8f"; f.fillRect(0, yTreno - 12, W, yS1 - yTreno - 30); f.fillStyle = notte ? "#4a4740" : "#a39a8c"; f.fillRect(0, yTreno + 2, W, 14);
    f.fillStyle = "#6d5a48"; for (let x = 0; x < W; x += 14) f.fillRect(x, yTreno + 4, 6, 10);
    f.fillStyle = "#555"; f.fillRect(0, yTreno + 4, W, 2.5); f.fillRect(0, yTreno + 11, W, 2.5);
    f.strokeStyle = "#7b8794"; f.lineWidth = 2; for (let x = 40; x < W; x += 160) { f.beginPath(); f.moveTo(x, yTreno + 4); f.lineTo(x, yTreno - 78 * k); f.lineTo(x + 18, yTreno - 78 * k); f.stroke(); }
    f.lineWidth = 1; f.beginPath(); f.moveTo(0, yTreno - 72 * k); f.lineTo(W, yTreno - 72 * k); f.stroke();
    /* strada */
    const sTop = yS1 - 46 * k, sBot = yS2 + 12; f.fillStyle = notte ? "#4f4b45" : "#c9c2b5"; f.fillRect(0, sTop - 10, W, 10); f.fillRect(0, sBot, W, 10);
    f.fillStyle = notte ? "#2c3038" : "#5f6670"; f.fillRect(0, sTop, W, sBot - sTop); f.fillStyle = "#f4f4f4"; for (let x = 0; x < W; x += 60) f.fillRect(x, (yS1 + yS2) / 2 - 20 * k, 32, 4);
    f.fillStyle = notte ? "#223b2c" : "#9fcf8f"; f.fillRect(0, sBot + 10, W, yMare - sBot - 40);
    const lampioni = []; for (let x = 70; x < W; x += 220) { f.strokeStyle = notte ? "#8a909a" : "#6b7280"; f.lineWidth = 2.5; f.beginPath(); f.moveTo(x, sTop - 10); f.lineTo(x, sTop - 70 * k); f.lineTo(x + 16, sTop - 70 * k); f.stroke(); lampioni.push([x + 16, sTop - 66 * k]); }
    /* mare */
    const mare = f.createLinearGradient(0, yMare - 30, 0, H); mare.addColorStop(0, notte ? "#16305a" : "#6fb8e6"); mare.addColorStop(1, notte ? "#0b1a36" : "#2f7fbf"); f.fillStyle = mare; f.fillRect(0, yMare - 30, W, H);
    const corsie = [
      { y: yAria, dir: -1, v: 120, tipi: ["aereo"], gap: W * 0.5 }, { y: yTreno, dir: 1, v: 140, tipi: ["treno"], gap: W * 0.4 },
      { y: yS1, dir: -1, v: 95, tipi: ["auto", "auto", "camion", "bus"], gap: 50 }, { y: yS2, dir: 1, v: 110, tipi: ["auto", "auto", "camion", "bus"], gap: 50 },
      { y: yMare, dir: 1, v: 26, tipi: ["portacontainer", "traghetto"], gap: 160 }];
    const LUNG = { aereo: 165, treno: 520, auto: 80, camion: 150, bus: 130, portacontainer: 260, traghetto: 200 };
    /* distanza minima tra due mezzi della stessa corsia (dal fanale posteriore di uno al muso dell'altro) */
    const DIST = { aereo: W * 0.45, treno: W * 0.35, strada: 70, mare: 140 };
    const colori = ["#e5484d", "#2a6db0", "#f2b705", "#2a7a52", "#ffffff", "#8a3b8f", "#ff7f2a"];
    corsie.forEach(c => { c.min = (c.tipi[0] === "aereo" ? DIST.aereo : c.tipi[0] === "treno" ? DIST.treno : c.y > yMare - 1 ? DIST.mare : DIST.strada) * (c.tipi[0] === "aereo" || c.tipi[0] === "treno" ? 1 : k);
      c.mezzi = []; let muso = c.dir > 0 ? W + 50 : -50;
      while (c.dir > 0 ? muso > -200 : muso < W + 200) { const tipo = scegli(c.tipi); c.mezzi.push({ tipo, x: muso, L: LUNG[tipo], col: scegli(colori) });
        /* il muso del mezzo successivo sta dietro la coda di questo, più la distanza minima e un margine a caso */
        muso -= c.dir * (LUNG[tipo] * k + c.min + rnd(0, c.min)); } });
    const nuvole = Array.from({ length: 6 }, () => ({ x: rnd(0, W), y: rnd(0.05, 0.35) * H, s: rnd(0.7, 1.3), v: -rnd(5, 12) }));
    function ruota(ctx, x, y, r) { ctx.fillStyle = "#2b2b2b"; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.fillStyle = "#cfd4da"; ctx.beginPath(); ctx.arc(x, y, r * 0.45, 0, 7); ctx.fill(); }
    let luci = false; function finestrini(ctx, x0, y, n, w, h, passo) { const ga = ctx.globalAlpha; if (luci) ctx.globalAlpha = 1; ctx.fillStyle = notte ? "#ffd76a" : "#9ed2f2"; for (let i = 0; i < n; i++) ctx.fillRect(x0 + i * passo, y, w, h); ctx.globalAlpha = ga; }
    function mezzo(ctx, m, y, dir) {
      ctx.save(); ctx.translate(m.x, y); ctx.scale(dir * k, k); // il mezzo è disegnato verso destra, con la coda in x = −L
      if (m.tipo === "aereo") { ctx.fillStyle = "#ffffff"; ctx.strokeStyle = "#9aa7b4"; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(-150, -6); ctx.lineTo(-140, -14); ctx.lineTo(-10, -14); ctx.quadraticCurveTo(12, -12, 14, -2); ctx.quadraticCurveTo(8, 6, -8, 6); ctx.lineTo(-140, 6); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = "#1f4fa3"; ctx.fillRect(-140, -2, 140, 4); ctx.beginPath(); ctx.moveTo(-148, -10); ctx.lineTo(-160, -42); ctx.lineTo(-146, -42); ctx.lineTo(-120, -14); ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#d7dee5"; ctx.beginPath(); ctx.moveTo(-60, 0); ctx.lineTo(-95, 34); ctx.lineTo(-80, 34); ctx.lineTo(-35, 2); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = "#b9c3cc"; ctx.fillRect(-82, 10, 20, 8); finestrini(ctx, -128, -10, 13, 4, 4, 8); ctx.fillStyle = "#2a3b55"; ctx.beginPath(); ctx.moveTo(2, -10); ctx.lineTo(9, -8); ctx.lineTo(8, -5); ctx.lineTo(0, -6); ctx.fill(); }
      else if (m.tipo === "treno") { const n = 5; for (let i = 0; i < n; i++) { const x = -i * 104 - 100; ctx.fillStyle = "#f4f6f8"; ctx.fillRect(x, -44, 100, 38); ctx.fillStyle = "#c8102e"; ctx.fillRect(x, -16, 100, 6); finestrini(ctx, x + 8, -36, 6, 11, 11, 15); ctx.fillStyle = "#555"; ctx.fillRect(x + 2, -6, 96, 3); ruota(ctx, x + 18, -2, 6); ruota(ctx, x + 32, -2, 6); ruota(ctx, x + 68, -2, 6); ruota(ctx, x + 82, -2, 6); }
        ctx.fillStyle = "#f4f6f8"; ctx.beginPath(); ctx.moveTo(0, -44); ctx.quadraticCurveTo(38, -40, 44, -6); ctx.lineTo(0, -6); ctx.closePath(); ctx.fill(); ctx.fillStyle = "#c8102e"; ctx.beginPath(); ctx.moveTo(0, -16); ctx.lineTo(40, -16); ctx.lineTo(43, -10); ctx.lineTo(0, -10); ctx.fill(); ctx.fillStyle = "#2a3b55"; ctx.beginPath(); ctx.moveTo(6, -40); ctx.quadraticCurveTo(26, -38, 32, -26); ctx.lineTo(6, -26); ctx.fill();
        ctx.strokeStyle = "#444"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-60, -44); ctx.lineTo(-48, -60); ctx.lineTo(-36, -44); ctx.moveTo(-54, -66); ctx.lineTo(-42, -66); ctx.stroke(); }
      else if (m.tipo === "camion") { ctx.fillStyle = m.col === "#ffffff" ? "#2a6db0" : m.col; ctx.fillRect(-150, -46, 110, 38); ctx.fillStyle = "rgba(0,0,0,.12)"; for (let x = -146; x < -42; x += 7) ctx.fillRect(x, -44, 2, 34);
        ctx.fillStyle = "#f0f0f0"; ctx.beginPath(); ctx.moveTo(-36, -8); ctx.lineTo(-36, -40); ctx.lineTo(-10, -40); ctx.lineTo(0, -24); ctx.lineTo(0, -8); ctx.closePath(); ctx.fill(); ctx.fillStyle = "#9ed2f2"; ctx.beginPath(); ctx.moveTo(-30, -36); ctx.lineTo(-12, -36); ctx.lineTo(-4, -24); ctx.lineTo(-30, -24); ctx.fill();
        ctx.fillStyle = "#333"; ctx.fillRect(-150, -8, 150, 4); ruota(ctx, -136, -2, 8); ruota(ctx, -118, -2, 8); ruota(ctx, -62, -2, 8); ruota(ctx, -18, -2, 8); }
      else if (m.tipo === "bus") { ctx.fillStyle = m.col === "#ffffff" ? "#f2b705" : m.col; ctx.fillRect(-130, -42, 130, 36); ctx.fillStyle = "#fff"; ctx.fillRect(-130, -16, 130, 3); finestrini(ctx, -122, -36, 6, 15, 12, 19); ctx.fillStyle = "#9ed2f2"; ctx.fillRect(-8, -38, 6, 20); ruota(ctx, -104, -4, 8); ruota(ctx, -24, -4, 8); }
      else if (m.tipo === "auto") { /* muso (cofano lungo e fari) a destra, in x = 0 */
        ctx.fillStyle = m.col; ctx.beginPath(); ctx.moveTo(0, -8); ctx.lineTo(0, -20); ctx.lineTo(-20, -24); ctx.lineTo(-32, -37); ctx.lineTo(-58, -37); ctx.lineTo(-70, -25); ctx.lineTo(-80, -22); ctx.lineTo(-80, -8); ctx.closePath(); ctx.fill(); ctx.strokeStyle = "rgba(0,0,0,.25)"; ctx.lineWidth = 1; ctx.stroke();
        ctx.fillStyle = notte ? "#26324a" : "#9ed2f2"; const ga = ctx.globalAlpha;
        ctx.beginPath(); ctx.moveTo(-23, -24); ctx.lineTo(-34, -34); ctx.lineTo(-43, -34); ctx.lineTo(-43, -24); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(-47, -24); ctx.lineTo(-47, -34); ctx.lineTo(-56, -34); ctx.lineTo(-66, -24); ctx.closePath(); ctx.fill(); ctx.globalAlpha = ga;
        ctx.fillStyle = "rgba(0,0,0,.2)"; ctx.fillRect(-45, -22, 1.5, 12); ctx.fillStyle = "#ffd34d"; ctx.fillRect(-4, -18, 4, 4); ctx.fillStyle = "#c0392b"; ctx.fillRect(-80, -19, 3, 4); ruota(ctx, -64, -6, 8); ruota(ctx, -16, -6, 8); }
      else if (m.tipo === "portacontainer") { ctx.fillStyle = "#24303f"; ctx.beginPath(); ctx.moveTo(-260, -16); ctx.lineTo(0, -16); ctx.lineTo(-14, 10); ctx.lineTo(-250, 10); ctx.closePath(); ctx.fill(); ctx.fillStyle = "#c0392b"; ctx.fillRect(-250, 2, 238, 8);
        const CC = ["#e5484d", "#2a6db0", "#2a7a52", "#f2b705", "#ff7f2a", "#8a3b8f"]; for (let r = 0; r < 3; r++) for (let c = 0; c < 8; c++) { ctx.fillStyle = CC[(r * 3 + c * 5 + Math.floor(m.L)) % CC.length]; ctx.fillRect(-214 + c * 22, -30 - r * 13, 21, 12); }
        ctx.fillStyle = "#f4f4f4"; ctx.fillRect(-250, -54, 30, 38); finestrini(ctx, -246, -50, 3, 7, 5, 9); ctx.fillStyle = "#c0392b"; ctx.fillRect(-244, -66, 10, 12); }
      else { ctx.fillStyle = "#ffffff"; ctx.beginPath(); ctx.moveTo(-200, -16); ctx.lineTo(0, -16); ctx.lineTo(-16, 10); ctx.lineTo(-190, 10); ctx.closePath(); ctx.fill(); ctx.fillStyle = "#1f4fa3"; ctx.fillRect(-196, 0, 184, 6);
        ctx.fillStyle = "#f4f4f4"; ctx.fillRect(-170, -40, 140, 24); ctx.fillRect(-150, -56, 90, 16); finestrini(ctx, -164, -34, 12, 7, 6, 11); finestrini(ctx, -144, -51, 7, 7, 5, 11); ctx.fillStyle = "#e5484d"; ctx.fillRect(-100, -72, 14, 16); }
      ctx.restore();
    }
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5), strato = document.createElement("canvas"); strato.width = W * dpr; strato.height = H * dpr; const sctx = strato.getContext("2d"); sctx.scale(dpr, dpr);
    function fanale(ctx, x, y, dir, lungo, col) { const g = ctx.createLinearGradient(x, y, x + dir * lungo, y); g.addColorStop(0, `rgba(${col},.32)`); g.addColorStop(1, `rgba(${col},0)`); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x, y - 2); ctx.lineTo(x + dir * lungo, y - lungo * 0.12); ctx.lineTo(x + dir * lungo, y + lungo * 0.2); ctx.closePath(); ctx.fill(); }
    function punto(ctx, x, y, r, col) { const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, `rgba(${col},1)`); g.addColorStop(1, `rgba(${col},0)`); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); }
    function fasciMezzo(ctx, m, y, dir) {
      if (m.tipo === "treno") fanale(ctx, m.x + dir * 42 * k, y - 12 * k, dir, 110 * k, "255,245,200");
      else if (["auto", "camion", "bus"].includes(m.tipo)) fanale(ctx, m.x, y - 14 * k, dir, 70 * k, "255,240,180");
    }
    function luciMezzo(ctx, m, y, dir, t) {
      const coda = m.x - dir * m.L * k;
      if (m.tipo === "aereo") { if (Math.sin(t * 6 + m.L) > 0.6) punto(ctx, coda + dir * 10 * k, y - 40 * k, 9, "255,255,255"); punto(ctx, m.x - dir * 88 * k, y + 34 * k, 6, dir > 0 ? "60,255,120" : "255,60,60"); }
      else if (m.tipo === "treno") { punto(ctx, m.x + dir * 42 * k, y - 12 * k, 6, "255,250,220"); }
      else if (m.tipo === "portacontainer" || m.tipo === "traghetto") { punto(ctx, m.x - dir * (m.tipo === "traghetto" ? 93 : 239) * k, y - 72 * k, 6, "255,255,230"); punto(ctx, m.x - dir * 8 * k, y - 12 * k, 5, dir > 0 ? "60,255,120" : "255,60,60"); }
      else { punto(ctx, m.x - dir * 2 * k, y - 14 * k, 5, "255,250,220"); punto(ctx, coda + dir * 2 * k, y - 14 * k, 5, "255,40,40"); }
    }
    return {
      scura: !!notte,
      disegna(ctx, t, dt) {
        ctx.drawImage(fondo, 0, 0, W, H);
        if (notte) lampioni.forEach(([x, y]) => { punto(ctx, x, y, 26, "255,220,140"); const g = ctx.createLinearGradient(0, y, 0, y + 80); g.addColorStop(0, "rgba(255,220,140,.25)"); g.addColorStop(1, "rgba(255,220,140,0)"); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x - 4, y); ctx.lineTo(x - 40, y + 80); ctx.lineTo(x + 40, y + 80); ctx.lineTo(x + 4, y); ctx.fill(); });
        ctx.fillStyle = notte ? "rgba(120,140,180,.3)" : "rgba(255,255,255,.95)"; muoviNuvole(nuvole, dt, W, 40, H * 0.36, 50, 32); ctx.beginPath(); nuvole.forEach(n => { [[0, 0, 24], [-28, 8, 18], [28, 8, 20], [8, -12, 18]].forEach(([dx, dy, r], i) => { ctx.moveTo(n.x + dx * n.s + r * n.s, n.y + dy * n.s); ctx.arc(n.x + dx * n.s, n.y + dy * n.s, r * n.s, 0, Math.PI * 2); }); }); ctx.fill();
        ctx.strokeStyle = notte ? "rgba(150,180,230,.35)" : "rgba(255,255,255,.55)"; ctx.lineWidth = 1.5; for (let r = 0; r < 4; r++) { ctx.beginPath(); for (let x = 0; x <= W; x += 10) { const y = yMare + 14 + r * 16 + Math.sin(x / 30 + t * 1.5 + r) * 3; x ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); }
        corsie.forEach(c => {
          c.mezzi.forEach(m => { m.x += c.dir * c.v * dt; });
          /* esce un mezzo → ne entra uno nuovo solo se c'è spazio dietro l'ultimo */
          c.mezzi = c.mezzi.filter(m => c.dir > 0 ? m.x - m.L * k < W + 40 : m.x + m.L * k > -40);
          const ultimo = c.mezzi.reduce((u, m) => !u || (c.dir > 0 ? m.x < u.x : m.x > u.x) ? m : u, null);
          /* un nuovo mezzo entra solo se dietro l'ultimo c'è almeno la distanza minima (più un margine scelto a caso una volta) */
          if (c.margine === undefined) c.margine = rnd(0, c.min);
          const libero = !ultimo ? Infinity : c.dir > 0 ? (ultimo.x - ultimo.L * k) - (-40) : (W + 40) - (ultimo.x + ultimo.L * k);
          if (libero >= c.min + c.margine) { const tipo = scegli(c.tipi); c.mezzi.push({ tipo, x: c.dir > 0 ? -40 : W + 40, L: LUNG[tipo], col: scegli(colori) }); c.margine = rnd(0, c.min); }
        });
        if (!notte) { corsie.forEach(c => c.mezzi.forEach(m => mezzo(ctx, m, c.y, c.dir))); return; }
        /* di notte i mezzi si scuriscono e restano accese solo le luci */
        corsie.forEach(c => c.mezzi.forEach(m => fasciMezzo(ctx, m, c.y, c.dir)));   /* i fasci dei fari stanno sotto i mezzi */
        sctx.clearRect(0, 0, W, H); corsie.forEach(c => c.mezzi.forEach(m => mezzo(sctx, m, c.y, c.dir)));
        sctx.globalCompositeOperation = "source-atop"; sctx.fillStyle = "rgba(6,12,32,.55)"; sctx.fillRect(0, 0, W, H); sctx.globalCompositeOperation = "source-over";
        ctx.drawImage(strato, 0, 0, W, H);
        luci = true; ctx.save(); ctx.globalAlpha = 0; corsie.forEach(c => c.mezzi.forEach(m => mezzo(ctx, m, c.y, c.dir))); ctx.restore(); luci = false;
        corsie.forEach(c => c.mezzi.forEach(m => luciMezzo(ctx, m, c.y, c.dir, t)));
      }
    };
  }

  /* ------------------------------------------------------------------ */
  /* LOGISTICA: porto con gru di banchina; i container scendono appesi allo spreader e si impilano come nel Tetris.
     Container dettagliati: lamiera ondulata, longheroni, blocchi d'angolo, porte con barre di chiusura, sigla. */
  function logistica(W, H, notte) {
    const COL = ["#b5562b", "#2a6db0", "#2a7a52", "#e8752a", "#7a7f87", "#d9a514", "#8a3b8f", "#c0392b", "#1f8a8a"];
    const cw = W < 600 ? 62 : 86, ch = Math.round(cw * 0.42), nc = Math.floor(W / cw), x0 = (W - nc * cw) / 2;
    const maxR = Math.max(4, Math.floor(H * 0.42 / ch)), base = H - 14;
    const mare = H * 0.5;
    /* sfondo: cielo, mare, nave e gru */
    const fondo = document.createElement("canvas"); fondo.width = W; fondo.height = H; const f = fondo.getContext("2d");
    const cg = f.createLinearGradient(0, 0, 0, mare); cg.addColorStop(0, notte ? "#0a1430" : "#bfe0f7"); cg.addColorStop(1, notte ? "#2a3c63" : "#f1f8fd"); f.fillStyle = cg; f.fillRect(0, 0, W, mare);
    if (notte) for (let i = 0; i < W * mare / 1500; i++) { f.fillStyle = `rgba(255,255,240,${rnd(0.3, 0.9)})`; f.beginPath(); f.arc(rnd(0, W), rnd(0, mare - 40), rnd(0.4, 1.3), 0, 7); f.fill(); }
    const mg = f.createLinearGradient(0, mare, 0, mare + 60); mg.addColorStop(0, notte ? "#16305a" : "#6fb8e6"); mg.addColorStop(1, notte ? "#0f2347" : "#3f8fcf"); f.fillStyle = mg; f.fillRect(0, mare, W, 60);
    f.fillStyle = notte ? "#3a3d44" : "#b8b4ac"; f.fillRect(0, mare + 60, W, H - mare - 60);
    f.strokeStyle = notte ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.08)"; f.lineWidth = 1; for (let x = 0; x < W; x += 60) { f.beginPath(); f.moveTo(x, mare + 60); f.lineTo(x - 40, H); f.stroke(); }
    f.fillStyle = notte ? "#d9c34a" : "#f2c94c"; f.fillRect(0, mare + 62, W, 3);
    /* nave portacontainer ormeggiata */
    const nx = W * 0.05, nw = Math.min(W * 0.9, 900), ny = mare + 40;
    f.fillStyle = notte ? "#141c2a" : "#24303f"; f.beginPath(); f.moveTo(nx, ny - 26); f.lineTo(nx + nw, ny - 26); f.lineTo(nx + nw - 30, ny + 14); f.lineTo(nx + 16, ny + 14); f.closePath(); f.fill();
    f.fillStyle = notte ? "#5a1f19" : "#b03a2e"; f.fillRect(nx + 16, ny + 4, nw - 46, 10);
    for (let r = 0; r < 4; r++) for (let c = 0; c < Math.floor((nw - 160) / 26); c++) { f.fillStyle = COL[(r * 5 + c * 3) % COL.length]; f.globalAlpha = notte ? 0.45 : 0.85; f.fillRect(nx + 130 + c * 26, ny - 38 - r * 12, 25, 11); } f.globalAlpha = 1;
    f.fillStyle = notte ? "#9aa0aa" : "#f4f4f4"; f.fillRect(nx + 30, ny - 82, 60, 56); f.fillStyle = notte ? "#ffd76a" : "#7fb7e0"; for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) f.fillRect(nx + 36 + c * 11, ny - 76 + r * 12, 6, 6);
    /* gru di banchina (STS) */
    const gru = [];
    for (let k = 0; k < (W < 600 ? 1 : 3); k++) {
      const gx = W * (0.25 + k * 0.28), gh = H * 0.42, top = mare + 62 - gh, col = notte ? "#6b4a2a" : "#e8752a";
      f.strokeStyle = col; f.lineWidth = 5; f.beginPath(); f.moveTo(gx - 40, mare + 64); f.lineTo(gx - 34, top + 30); f.moveTo(gx + 40, mare + 64); f.lineTo(gx + 34, top + 30); f.stroke();
      f.lineWidth = 2.5; f.beginPath(); for (let y = mare + 60; y > top + 40; y -= 34) { f.moveTo(gx - 38, y); f.lineTo(gx + 38, y - 30); f.moveTo(gx - 38, y); f.lineTo(gx + 38, y); } f.stroke();
      f.lineWidth = 6; f.beginPath(); f.moveTo(gx - 120, top + 30); f.lineTo(gx + 180, top + 30); f.stroke(); f.lineWidth = 2; f.beginPath(); f.moveTo(gx, top - 30); f.lineTo(gx - 110, top + 28); f.moveTo(gx, top - 30); f.lineTo(gx + 170, top + 28); f.moveTo(gx, top - 30); f.lineTo(gx, top + 30); f.stroke();
      f.fillStyle = notte ? "#c8c8c8" : "#f4f4f4"; f.fillRect(gx - 22, top + 34, 30, 22); f.fillStyle = notte ? "#ffd76a" : "#7fb7e0"; f.fillRect(gx - 18, top + 38, 22, 8);
      gru.push({ x: gx, top });
    }
    const griglia = [], cadono = [], svuota = []; let prossimo = 0;
    const riga = () => Array(nc).fill(null);
    const altezza = col => { for (let r = griglia.length - 1; r >= 0; r--) if (griglia[r][col]) return r + 1; return 0; };
    const sigla = () => "DSPU " + String(Math.floor(rnd(100000, 999999))) + " " + Math.floor(rnd(0, 10));
    const nuovoC = (w) => ({ c: scegli(COL), w, sig: sigla(), porta: Math.random() < 0.5 });
    for (let r = 0; r < Math.min(3, maxR - 1); r++) { const R = riga(); for (let c = 0; c < nc; c++) if (Math.random() < 0.75 - r * 0.22 && (r === 0 || griglia[r - 1][c])) R[c] = Object.assign(nuovoC(1), { primo: true }); griglia.push(R); }
    function container(ctx, x, y, w, d, a) {
      const h = ch - 2, X = x + 1, Y = y + 1, Wc = w - 2;
      ctx.save(); ctx.globalAlpha = a;
      ctx.fillStyle = "rgba(0,0,0,.18)"; ctx.fillRect(X + 3, Y + h, Wc - 2, 3);
      ctx.fillStyle = d.c; ctx.fillRect(X, Y, Wc, h);
      /* lamiera ondulata */
      for (let k = X + 5; k < X + Wc - 5; k += 6) { ctx.fillStyle = "rgba(255,255,255,.16)"; ctx.fillRect(k, Y + 4, 2, h - 8); ctx.fillStyle = "rgba(0,0,0,.18)"; ctx.fillRect(k + 2.5, Y + 4, 1.5, h - 8); }
      /* longheroni sopra e sotto */
      ctx.fillStyle = scurisci(d.c, 0.35); ctx.fillRect(X, Y, Wc, 3.5); ctx.fillRect(X, Y + h - 3.5, Wc, 3.5);
      /* porte con barre di chiusura */
      const px = d.porta ? X + Wc - Math.min(26, Wc * 0.32) : X, pw = Math.min(26, Wc * 0.32);
      ctx.fillStyle = scurisci(d.c, 0.12); ctx.fillRect(px, Y + 3.5, pw, h - 7); ctx.strokeStyle = scurisci(d.c, 0.45); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(px + pw / 2, Y + 3.5); ctx.lineTo(px + pw / 2, Y + h - 3.5); ctx.stroke();
      ctx.strokeStyle = "rgba(220,220,220,.9)"; ctx.lineWidth = 1.2; [0.18, 0.38, 0.62, 0.82].forEach(u => { const bx = px + pw * u; ctx.beginPath(); ctx.moveTo(bx, Y + 5); ctx.lineTo(bx, Y + h - 5); ctx.stroke(); });
      ctx.fillStyle = "rgba(230,230,230,.9)"; [0.18, 0.62].forEach(u => ctx.fillRect(px + pw * u - 1, Y + h * 0.48, 4, 2));
      /* blocchi d'angolo */
      ctx.fillStyle = "#3a3a3a"; [[X, Y], [X + Wc - 5, Y], [X, Y + h - 5], [X + Wc - 5, Y + h - 5]].forEach(([cx, cy]) => ctx.fillRect(cx, cy, 5, 5));
      /* sigla */
      if (Wc > 70) { ctx.fillStyle = "rgba(255,255,255,.9)"; ctx.font = `bold ${Math.max(7, Math.round(ch * 0.22))}px monospace`; ctx.textAlign = "left"; ctx.fillText(d.sig, (d.porta ? X : X + pw) + 6, Y + h * 0.42); ctx.font = `${Math.max(6, Math.round(ch * 0.18))}px monospace`; ctx.fillText(d.w > 1 ? "45G1" : "22G1", (d.porta ? X : X + pw) + 6, Y + h * 0.72); }
      ctx.strokeStyle = "rgba(0,0,0,.35)"; ctx.lineWidth = 1; ctx.strokeRect(X, Y, Wc, h);
      if (notte) { ctx.fillStyle = "rgba(6,12,32,.45)"; ctx.fillRect(X, Y, Wc, h + 3); }
      ctx.restore();
    }
    return {
      scura: !!notte,
      disegna(ctx, t, dt) {
        ctx.drawImage(fondo, 0, 0, W, H);
        ctx.strokeStyle = notte ? "rgba(150,180,230,.3)" : "rgba(255,255,255,.5)"; ctx.lineWidth = 1.3; for (let r = 0; r < 3; r++) { ctx.beginPath(); for (let x = 0; x <= W; x += 10) { const y = mare + 10 + r * 14 + Math.sin(x / 30 + t * 1.4 + r) * 2.5; x ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); }
        if (notte) gru.forEach(g => { const l = ctx.createRadialGradient(g.x, g.top + 34, 0, g.x, g.top + 34, 150); l.addColorStop(0, "rgba(255,230,160,.35)"); l.addColorStop(1, "rgba(255,230,160,0)"); ctx.fillStyle = l; ctx.beginPath(); ctx.arc(g.x, g.top + 34, 150, 0, 7); ctx.fill();
          if (Math.sin(t * 3 + g.x) > 0) { const r = ctx.createRadialGradient(g.x, g.top - 30, 0, g.x, g.top - 30, 9); r.addColorStop(0, "rgba(255,60,50,1)"); r.addColorStop(1, "rgba(255,60,50,0)"); ctx.fillStyle = r; ctx.beginPath(); ctx.arc(g.x, g.top - 30, 9, 0, 7); ctx.fill(); } });
        prossimo -= dt;
        if (prossimo <= 0 && cadono.length < Math.max(2, Math.floor(nc / 5))) {
          prossimo = rnd(0.4, 1); const lungo = Math.random() < 0.45 && nc > 2, w = lungo ? 2 : 1, col = Math.floor(rnd(0, nc - w + 1));
          if (!cadono.some(q => q.col < col + w && col < q.col + q.w)) cadono.push(Object.assign(nuovoC(w), { col, y: -ch - 40, v: rnd(110, 170) }));
        }
        for (let i = cadono.length - 1; i >= 0; i--) {
          const q = cadono[i]; let h = 0; for (let k = 0; k < q.w; k++) h = Math.max(h, altezza(q.col + k));
          const dest = base - (h + 1) * ch; q.y = Math.min(dest, q.y + q.v * dt);
          const x = x0 + q.col * cw, w = q.w * cw;
          /* funi e spreader che calano il container */
          ctx.strokeStyle = notte ? "rgba(200,200,200,.5)" : "rgba(60,60,60,.6)"; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x + w * 0.3, 0); ctx.lineTo(x + w * 0.3, q.y - 8); ctx.moveTo(x + w * 0.7, 0); ctx.lineTo(x + w * 0.7, q.y - 8); ctx.stroke();
          ctx.fillStyle = notte ? "#8a6a2a" : "#f2c94c"; ctx.fillRect(x + 4, q.y - 9, w - 8, 7); ctx.fillStyle = "#333"; ctx.fillRect(x + 4, q.y - 3, 4, 4); ctx.fillRect(x + w - 8, q.y - 3, 4, 4);
          container(ctx, x, q.y, w, q, 1);
          if (q.y >= dest) {
            while (griglia.length <= h) griglia.push(riga());
            for (let k = 0; k < q.w; k++) griglia[h][q.col + k] = Object.assign({}, q, { primo: k === 0 });
            cadono.splice(i, 1);
            griglia.forEach((r, ri) => { if (r.every(Boolean) && !svuota.includes(ri)) svuota.push(ri); });
            if (griglia.length >= maxR && !svuota.length) svuota.push(0);
          }
        }
        if (svuota.length) { svuota.t = (svuota.t || 0) + dt; if (svuota.t > 0.6) { svuota.sort((a, b) => b - a).forEach(r => griglia.splice(r, 1)); svuota.length = 0; svuota.t = 0; } }
        griglia.forEach((r, ri) => r.forEach((cell, ci) => {
          if (!cell || !cell.primo) return; const a = svuota.includes(ri) ? 0.4 + 0.6 * Math.abs(Math.sin((svuota.t || 0) * 20)) : 1;
          container(ctx, x0 + ci * cw, base - (ri + 1) * ch, cell.w * cw, cell, a);
        }));
      }
    };
  }

  /* ------------------------------------------------------------------ */
  /* CONDUZIONE DEL MEZZO NAVALE (A): carta nautica + onde, navi e gabbiani */
  function navaleCarta(W, H) {
    const C = "#1f3260", B = "#2a86c9";
    const fondali = Array.from({ length: Math.round(W * H / 24000) }, () => [rnd(0, W), rnd(0, H * 0.75), String(Math.floor(rnd(8, 95)))]);
    const rotte = Array.from({ length: 2 }, (_, i) => ({ pts: Array.from({ length: 5 }, (_, k) => [W * (0.08 + k * 0.21), H * (0.25 + i * 0.25) + rnd(-50, 50)]), s: rnd(0, 1), v: 0.035 }));
    const navi = ["portacontainer", "veliero", "rimorchiatore", "traghetto"].map((tipo, k) => ({ tipo, corsia: k, x: rnd(0, W), v: [10, 16, 22, 14][k] * (W < 600 ? 0.7 : 1), s: (0.45 + k * 0.17) * (W < 600 ? 0.65 : 1), f: rnd(0, 6) }));
    function nave(ctx, n, y, t, dt) {
      n.x += n.v * dt; if (n.x > W + 260 * n.s) n.x = -260 * n.s;
      const bob = Math.sin(t * 1.3 + n.f) * 0.03;
      /* scia */
      ctx.fillStyle = "rgba(255,255,255,.45)"; ctx.beginPath(); ctx.moveTo(n.x - 120 * n.s, y + 2); ctx.lineTo(n.x - 330 * n.s, y - 4); ctx.lineTo(n.x - 330 * n.s, y + 8); ctx.closePath(); ctx.fill();
      ctx.save(); ctx.translate(n.x, y); ctx.rotate(bob); ctx.scale(n.s, n.s);
      const fin = (x0, yy, nn, w, h, p) => { ctx.fillStyle = "#cfe8f7"; for (let i = 0; i < nn; i++) ctx.fillRect(x0 + i * p, yy, w, h); };
      if (n.tipo === "portacontainer") {
        ctx.fillStyle = "#b03a2e"; ctx.beginPath(); ctx.moveTo(-230, 0); ctx.lineTo(150, 0); ctx.lineTo(138, 14); ctx.lineTo(-218, 14); ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#1f2b3a"; ctx.beginPath(); ctx.moveTo(-236, -22); ctx.lineTo(160, -22); ctx.quadraticCurveTo(178, -22, 168, 0); ctx.lineTo(-226, 0); ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#f4f4f4"; ctx.font = `bold 9px ${SERIF}`; ctx.fillText("DISPENSE", 60, -9);
        const CC = ["#e5484d", "#2a6db0", "#2a7a52", "#f2b705", "#ff7f2a", "#8a3b8f", "#7a7f87"];
        for (let c = 0; c < 12; c++) for (let r = 0; r < 3 + (c % 3 === 0 ? 1 : 0); r++) { ctx.fillStyle = CC[(c * 3 + r * 5) % CC.length]; ctx.fillRect(-150 + c * 24, -34 - r * 12, 23, 11); ctx.fillStyle = "rgba(0,0,0,.15)"; for (let q = 0; q < 23; q += 4) ctx.fillRect(-150 + c * 24 + q, -34 - r * 12, 1, 11); }
        ctx.fillStyle = "#f4f4f4"; ctx.fillRect(-215, -70, 50, 48); fin(-210, -64, 4, 8, 5, 11); fin(-210, -52, 4, 8, 5, 11); ctx.fillStyle = "#e0e0e0"; ctx.fillRect(-220, -78, 60, 8);
        ctx.fillStyle = "#1f2b3a"; ctx.fillRect(-200, -100, 14, 22); ctx.fillStyle = "#e5484d"; ctx.fillRect(-200, -94, 14, 5);
        ctx.strokeStyle = "#555"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-180, -78); ctx.lineTo(-180, -110); ctx.moveTo(-188, -102); ctx.lineTo(-172, -102); ctx.moveTo(150, -22); ctx.lineTo(150, -48); ctx.stroke();
      } else if (n.tipo === "veliero") {
        ctx.fillStyle = "#f4f4f4"; ctx.beginPath(); ctx.moveTo(-70, -10); ctx.lineTo(80, -10); ctx.quadraticCurveTo(70, 8, 50, 10); ctx.lineTo(-60, 10); ctx.closePath(); ctx.fill(); ctx.fillStyle = "#1f4fa3"; ctx.fillRect(-62, 2, 118, 4);
        ctx.strokeStyle = "#5a4630"; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, -10); ctx.lineTo(0, -150); ctx.stroke();
        ctx.fillStyle = "#fffaf0"; ctx.strokeStyle = "#c9bfa8"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-4, -146); ctx.quadraticCurveTo(-60, -80, -66, -16); ctx.lineTo(-4, -16); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(4, -140); ctx.quadraticCurveTo(50, -80, 70, -14); ctx.lineTo(4, -14); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = "rgba(0,0,0,.12)"; [-110, -80, -50].forEach(yy => { ctx.beginPath(); ctx.moveTo(-4, yy); ctx.lineTo(-40 - (yy + 110) * 0.2, yy + 8); ctx.stroke(); });
        ctx.fillStyle = "#e5484d"; ctx.beginPath(); ctx.moveTo(0, -150); ctx.lineTo(16, -146); ctx.lineTo(0, -142); ctx.fill();
      } else if (n.tipo === "rimorchiatore") {
        ctx.fillStyle = "#c0392b"; ctx.beginPath(); ctx.moveTo(-60, -10); ctx.lineTo(55, -10); ctx.quadraticCurveTo(62, 4, 45, 10); ctx.lineTo(-52, 10); ctx.closePath(); ctx.fill(); ctx.fillStyle = "#222"; ctx.fillRect(-56, -12, 112, 4);
        ctx.fillStyle = "#333"; for (let k = -50; k < 50; k += 12) { ctx.beginPath(); ctx.arc(k, -2, 3, 0, 7); ctx.fill(); }
        ctx.fillStyle = "#f4f4f4"; ctx.fillRect(-20, -34, 40, 22); ctx.fillRect(-12, -50, 26, 16); fin(-16, -30, 4, 6, 6, 9); fin(-8, -46, 3, 5, 5, 7);
        ctx.fillStyle = "#1f2b3a"; ctx.fillRect(-34, -44, 10, 30); ctx.fillStyle = "#f2b705"; ctx.fillRect(-34, -40, 10, 4); ctx.fillStyle = "rgba(200,200,200,.5)"; ctx.beginPath(); ctx.arc(-29, -54 - (t * 10) % 20, 6 + (t * 6) % 6, 0, 7); ctx.fill();
      } else {
        ctx.fillStyle = "#ffffff"; ctx.beginPath(); ctx.moveTo(-150, -14); ctx.lineTo(120, -14); ctx.quadraticCurveTo(132, 2, 108, 12); ctx.lineTo(-142, 12); ctx.closePath(); ctx.fill(); ctx.fillStyle = "#1f4fa3"; ctx.fillRect(-146, 2, 250, 6);
        ctx.fillStyle = "#f7f7f7"; ctx.fillRect(-120, -38, 200, 24); ctx.fillRect(-90, -58, 140, 20); ctx.fillRect(-50, -74, 70, 16);
        fin(-114, -32, 16, 8, 7, 12); fin(-84, -52, 11, 8, 6, 12); fin(-44, -70, 5, 8, 5, 12);
        ctx.fillStyle = "#ff7f2a"; for (let k = -100; k < 60; k += 36) { ctx.beginPath(); ctx.ellipse(k, -42, 12, 4, 0, 0, 7); ctx.fill(); }
        ctx.fillStyle = "#1f4fa3"; ctx.fillRect(0, -92, 18, 18); ctx.fillStyle = "#f2b705"; ctx.fillRect(0, -86, 18, 4);
      }
      ctx.restore();
      ctx.fillStyle = "rgba(255,255,255,.75)"; ctx.beginPath(); ctx.ellipse(n.x + 150 * n.s * (n.tipo === "portacontainer" ? 1.05 : n.tipo === "traghetto" ? 0.85 : 0.5), y + 4, 14 * n.s + 4, 4, 0, 0, 7); ctx.fill();
    }
    const gabbiani = Array.from({ length: 5 }, () => ({ x: rnd(0, W), y: rnd(0.55, 0.75) * H, v: rnd(25, 45), f: rnd(0, 6) }));
    function rosa(ctx, x, y, r) {
      ctx.save(); ctx.translate(x, y); ctx.strokeStyle = rgba(C, 0.3); ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, r * 0.82, 0, 7); ctx.stroke();
      for (let k = 0; k < 72; k++) { const a = k * Math.PI / 36, l = k % 2 ? 4 : 8; ctx.beginPath(); ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r); ctx.lineTo(Math.cos(a) * (r - l), Math.sin(a) * (r - l)); ctx.stroke(); }
      for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8 - Math.PI / 2, l = k % 4 === 0 ? r * 0.8 : k % 2 === 0 ? r * 0.55 : r * 0.38, w = k % 4 === 0 ? 0.13 : 0.1;
        ctx.fillStyle = rgba(k % 2 ? B : C, 0.22); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a - w) * l * 0.3, Math.sin(a - w) * l * 0.3); ctx.lineTo(Math.cos(a) * l, Math.sin(a) * l); ctx.lineTo(Math.cos(a + w) * l * 0.3, Math.sin(a + w) * l * 0.3); ctx.closePath(); ctx.fill(); ctx.stroke(); }
      ctx.fillStyle = rgba(C, 0.5); ctx.font = `bold ${Math.round(r * 0.16)}px ${SERIF}`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      [["N", 0], ["E", 1], ["S", 2], ["W", 3]].forEach(([s, k]) => { const a = k * Math.PI / 2 - Math.PI / 2; ctx.fillText(s, Math.cos(a) * r * 1.13, Math.sin(a) * r * 1.13); });
      ctx.restore(); ctx.textBaseline = "alphabetic";
    }
    function punto(p, s) { const n = p.pts.length - 1, f = s * n, i = Math.min(n - 1, Math.floor(f)), u = f - i; return [p.pts[i][0] + (p.pts[i + 1][0] - p.pts[i][0]) * u, p.pts[i][1] + (p.pts[i + 1][1] - p.pts[i][1]) * u, Math.atan2(p.pts[i + 1][1] - p.pts[i][1], p.pts[i + 1][0] - p.pts[i][0])]; }
    return {
      disegna(ctx, t, dt) {
        /* reticolo di latitudine e longitudine */
        ctx.strokeStyle = rgba(C, 0.12); ctx.lineWidth = 1; ctx.fillStyle = rgba(C, 0.35); ctx.font = `12px ${SERIF}`;
        const gx = W / 6, gy = H / 5;
        for (let k = 1; k < 6; k++) { ctx.beginPath(); ctx.moveTo(k * gx, 0); ctx.lineTo(k * gx, H); ctx.stroke(); ctx.fillText(`${12 + k}° E`, k * gx + 4, 70); }
        for (let k = 1; k < 5; k++) { ctx.beginPath(); ctx.moveTo(0, k * gy); ctx.lineTo(W, k * gy); ctx.stroke(); ctx.fillText(`${45 - k}° N`, 6, k * gy - 4); }
        ctx.fillStyle = rgba(C, 0.2); ctx.font = `italic 11px ${SERIF}`; fondali.forEach(([x, y, s]) => ctx.fillText(s, x, y));
        rosa(ctx, W * 0.78, W < 700 ? H * 0.58 : H * 0.3, Math.min(W, H) * 0.16);
        /* rotte tracciate con la nave che le percorre */
        rotte.forEach(p => {
          ctx.strokeStyle = rgba("#b8322f", 0.4); ctx.lineWidth = 1.5; ctx.setLineDash([8, 6]); ctx.beginPath(); ctx.moveTo(...p.pts[0]); p.pts.slice(1).forEach(q => ctx.lineTo(...q)); ctx.stroke(); ctx.setLineDash([]);
          p.pts.forEach(([x, y]) => { ctx.beginPath(); ctx.arc(x, y, 3, 0, 7); ctx.stroke(); });
          p.s = (p.s + p.v * dt) % 1; const [x, y, a] = punto(p, p.s);
          ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.fillStyle = rgba(C, 0.55); ctx.beginPath(); ctx.moveTo(12, 0); ctx.lineTo(4, -5); ctx.lineTo(-10, -5); ctx.lineTo(-10, 5); ctx.lineTo(4, 5); ctx.closePath(); ctx.fill(); ctx.restore();
          ctx.fillStyle = rgba("#b8322f", 0.5); ctx.font = `italic 12px ${SERIF}`; ctx.fillText(`rotta ${String(Math.round(((a * 180 / Math.PI) + 90 + 360) % 360)).padStart(3, "0")}°`, x + 10, y - 10);
        });
        /* mare con onde a strati, creste di schiuma e riflessi; navi dettagliate che beccheggiano e lasciano la scia */
        const orizz = H * 0.8;
        const mg = ctx.createLinearGradient(0, orizz, 0, H); mg.addColorStop(0, "#7cc0e8"); mg.addColorStop(0.4, "#3f8fcf"); mg.addColorStop(1, "#1d5a96"); ctx.fillStyle = mg; ctx.fillRect(0, orizz, W, H - orizz);
        ctx.strokeStyle = "rgba(255,255,255,.6)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, orizz); ctx.lineTo(W, orizz); ctx.stroke();
        const onda = (x, r) => orizz + 10 + r * (H - orizz) / 5 + Math.sin(x / (34 + r * 14) + t * (0.9 + r * 0.25) + r * 1.7) * (2 + r * 1.6) + Math.sin(x / 13 + t * 2 + r) * 0.8;
        navi.sort((a, b) => a.corsia - b.corsia).forEach((n, idx) => {
          const r = n.corsia;
          /* fascia d'onda dietro la nave */
          ctx.fillStyle = `rgba(${r % 2 ? "70,150,210" : "55,130,195"},.55)`; ctx.beginPath(); ctx.moveTo(0, H); for (let x = 0; x <= W; x += 8) ctx.lineTo(x, onda(x, r)); ctx.lineTo(W, H); ctx.closePath(); ctx.fill();
          ctx.strokeStyle = "rgba(255,255,255,.55)"; ctx.lineWidth = 1.4; for (let x = ((t * 20 * (r + 1)) % 60) - 60; x < W; x += 60) { const y = onda(x, r); ctx.beginPath(); ctx.arc(x + 8, y + 3, 5, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke(); }
          nave(ctx, n, onda(n.x, r) + 2, t, dt); void idx;
        });
        ctx.fillStyle = "rgba(255,255,255,.7)"; for (let k = 0; k < 40; k++) { const x = (k * 97 + t * 15) % W, y = orizz + 6 + ((k * 53) % 100) / 100 * (H - orizz - 10); if (Math.sin(t * 3 + k) > 0.6) ctx.fillRect(x, y, 6 + (k % 3) * 3, 1.5); }
        gabbiani.forEach(g => { g.x += g.v * dt; if (g.x > W + 30) { g.x = -30; g.y = rnd(0.55, 0.75) * H; } const ali = Math.sin(t * 6 + g.f) * 5;
          ctx.strokeStyle = rgba(C, 0.45); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(g.x - 10, g.y - ali); ctx.quadraticCurveTo(g.x - 5, g.y - 5, g.x, g.y); ctx.quadraticCurveTo(g.x + 5, g.y - 5, g.x + 10, g.y - ali); ctx.stroke(); });
      }
    };
  }

  /* CONDUZIONE DEL MEZZO NAVALE (B): faro di notte con il fascio di luce che ruota */
  function navaleFaro(W, H) {
    const stelle = Array.from({ length: Math.round(W * H / 5000) }, () => [rnd(0, W), rnd(0, H * 0.7), rnd(0.5, 1.6), rnd(0, 6)]);
    const lucine = Array.from({ length: 4 }, () => ({ x: rnd(0, W), v: rnd(5, 12) }));
    return {
      scura: true,
      disegna(ctx, t, dt) {
        const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#0b1530"); g.addColorStop(0.75, "#1a2f5a"); g.addColorStop(1, "#0e1d3d"); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        stelle.forEach(([x, y, r, f]) => { ctx.fillStyle = `rgba(255,255,240,${0.35 + 0.35 * Math.sin(t * 1.5 + f)})`; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); });
        const mx = W < 700 ? W * 0.18 : W * 0.07, my = W < 700 ? H * 0.36 : H * 0.24; falce(ctx, mx, my, 26, 10, -6, 23, "rgba(255,250,225,.92)"); const gm = ctx.createRadialGradient(mx, my, 8, mx, my, 80); gm.addColorStop(0, "rgba(255,250,225,.3)"); gm.addColorStop(1, "rgba(255,250,225,0)"); ctx.fillStyle = gm; ctx.beginPath(); ctx.arc(mx, my, 80, 0, 7); ctx.fill();
        const orizz = H * 0.8, fx = W * 0.8, fh = Math.min(H * 0.38, 300), top = orizz - fh;
        /* fascio di luce */
        const ang = t * 0.9, lunga = Math.max(W, H) * 1.2;
        [ang, ang + Math.PI].forEach((a, k) => { const sc = Math.cos(a); const vis = Math.max(0.15, Math.abs(sc)); ctx.save(); ctx.translate(fx, top + 12);
          const gr = ctx.createRadialGradient(0, 0, 0, 0, 0, lunga * vis); gr.addColorStop(0, `rgba(255,240,180,${0.45 * vis})`); gr.addColorStop(1, "rgba(255,240,180,0)");
          ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(0, 0); const dir = sc >= 0 ? 0 : Math.PI, ap = 0.09 + 0.05 * (1 - vis); ctx.arc(0, 0, lunga * vis, dir - ap, dir + ap); ctx.closePath(); ctx.fill(); ctx.restore(); void k; });
        /* mare con il riflesso della luna */
        ctx.fillStyle = "#0d1a36"; ctx.fillRect(0, orizz, W, H - orizz);
        for (let r = 0; r < 7; r++) { ctx.strokeStyle = `rgba(120,160,220,${0.35 - r * 0.03})`; ctx.lineWidth = 1.3; ctx.beginPath();
          for (let x = 0; x <= W; x += 8) { const y = orizz + 6 + r * 13 + Math.sin(x / (30 + r * 8) + t * (1 + r * 0.2) + r) * 2.5; x ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); }
        for (let r = 0; r < 8; r++) { const w = 40 - r * 3 + Math.sin(t * 2 + r) * 6; ctx.fillStyle = `rgba(255,250,225,${0.25 - r * 0.02})`; ctx.fillRect(mx - w / 2, orizz + 6 + r * 11, w, 2); }
        lucine.forEach(l => { l.x += l.v * dt; if (l.x > W + 20) l.x = -20; ctx.fillStyle = `rgba(255,220,140,${0.6 + 0.3 * Math.sin(t * 3 + l.x)})`; ctx.beginPath(); ctx.arc(l.x, orizz - 3, 2, 0, 7); ctx.fill(); });
        /* scogli e faro */
        ctx.fillStyle = "#08122a"; ctx.beginPath(); ctx.moveTo(fx - 90, orizz + 14); ctx.quadraticCurveTo(fx - 60, orizz - 26, fx - 20, orizz - 18); ctx.quadraticCurveTo(fx + 30, orizz - 34, fx + 70, orizz - 6); ctx.lineTo(fx + 110, orizz + 14); ctx.closePath(); ctx.fill();
        const wb = fh * 0.13, wt = fh * 0.08; ctx.fillStyle = "#e9e4d8"; ctx.beginPath(); ctx.moveTo(fx - wb, orizz - 18); ctx.lineTo(fx - wt, top + 26); ctx.lineTo(fx + wt, top + 26); ctx.lineTo(fx + wb, orizz - 18); ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#b8322f"; for (let k = 0; k < 3; k++) { const y0 = top + 26 + (k * 2 + 1) * (orizz - 18 - top - 26) / 6, h = (orizz - 18 - top - 26) / 6, w0 = wt + (wb - wt) * (y0 - top - 26) / (orizz - 44 - top), w1 = wt + (wb - wt) * (y0 + h - top - 26) / (orizz - 44 - top);
          ctx.beginPath(); ctx.moveTo(fx - w0, y0); ctx.lineTo(fx + w0, y0); ctx.lineTo(fx + w1, y0 + h); ctx.lineTo(fx - w1, y0 + h); ctx.closePath(); ctx.fill(); }
        ctx.fillStyle = "#1c2440"; ctx.fillRect(fx - wt - 6, top + 22, (wt + 6) * 2, 6); ctx.fillStyle = "rgba(255,236,170,.95)"; ctx.fillRect(fx - wt + 2, top + 6, (wt - 2) * 2, 16);
        ctx.fillStyle = "#1c2440"; ctx.beginPath(); ctx.moveTo(fx - wt - 2, top + 6); ctx.lineTo(fx, top - 8); ctx.lineTo(fx + wt + 2, top + 6); ctx.closePath(); ctx.fill();
        const alone = ctx.createRadialGradient(fx, top + 14, 0, fx, top + 14, 60); alone.addColorStop(0, "rgba(255,236,170,.5)"); alone.addColorStop(1, "rgba(255,236,170,0)"); ctx.fillStyle = alone; ctx.beginPath(); ctx.arc(fx, top + 14, 60, 0, 7); ctx.fill();
      }
    };
  }

  /* ------------------------------------------------------------------ */
  /* SEGNI FLUTTUANTI (copertina, pagine dei docenti e delle discipline, pulsanti): salgono lentamente;
     se si urtano cambiano un po' velocità e direzione, ma non si sovrappongono mai */
  const immaginiIcone = {};
  function immagineIcona(nome, col) {
    const k = nome + col; if (immaginiIcone[k]) return immaginiIcone[k];
    const img = new Image(); img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="96" height="96" fill="none" stroke="${col}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${(window.TEMI.SVG || {})[nome] || ""}</svg>`.replace(/currentColor/g, col));
    return (immaginiIcone[k] = img);
  }
  function segni(W, H, opt) {
    const T = window.TEMI.dati(opt.tema), mini = opt.mini, alfa = mini ? 0.22 : opt.tema === "neutro" ? 0.17 : 0.2;
    const misura = document.createElement("canvas").getContext("2d");
    const n = Math.min(opt.quanti, Math.round(W * H / (mini ? 2600 : 7000)));
    const corpi = [];
    const L = T.segni.length, mcd = (a, b) => b ? mcd(b, a % b) : a, passo = [7, 5, 11, 3, 13, 1].find(x => mcd(x, L) === 1);
    for (let i = 0; i < n; i++) {
      const s = T.segni[(i * passo) % L], icona = s[0] === "@";
      const base = mini ? 11 + ((i * 7) % 5) * 3 : 16 + ((i * 7) % 6) * 6, fs = !icona && s.length > 3 ? base * 0.6 : base;
      let hw, hh; if (icona) { hw = hh = fs * 0.8 + 2; } else { misura.font = `${fs}px ${SERIF}`; hw = misura.measureText(s).width / 2 + 3; hh = fs * 0.5 + 2; }
      const v = -(mini ? rnd(10, 20) : rnd(12, 28));
      corpi.push({ f: "r", s, icona, fs, hw, hh, x: rnd(hw, W - hw), y: rnd(0, H), vx: rnd(-6, 6), vy: v, v, dx: rnd(-6, 6), rot: rnd(-0.25, 0.25), m: fs });
    }
    separa(corpi, 120);
    return {
      disegna(ctx, t, dt) {
        const col = mini && opt.el && opt.el.parentElement && opt.el.parentElement.matches(":hover") ? "#ffffff" : T.colore;
        corpi.forEach(c => { c.vx += (c.dx - c.vx) * Math.min(1, dt * 0.5); c.vy += (c.v - c.vy) * Math.min(1, dt * 0.5); c.x += c.vx * dt; c.y += c.vy * dt;
          if (c.x < c.hw) { c.x = c.hw; c.vx = Math.abs(c.vx); c.dx = Math.abs(c.dx); } if (c.x > W - c.hw) { c.x = W - c.hw; c.vx = -Math.abs(c.vx); c.dx = -Math.abs(c.dx); } });
        separa(corpi, 2);
        corpi.forEach(c => { if (c.y + c.hh < -4) { c.y = H + c.hh + rnd(0, 40); c.x = rnd(c.hw, W - c.hw); c.vy = c.v; } });
        ctx.save(); ctx.globalAlpha = col === "#ffffff" ? 0.3 : alfa; ctx.fillStyle = col; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        corpi.forEach(c => {
          ctx.save(); ctx.translate(c.x, c.y); ctx.rotate(c.rot + Math.sin(t * 0.4 + c.fs) * 0.08);
          if (c.icona) { const img = immagineIcona(c.s.slice(1), col); if (img.complete) ctx.drawImage(img, -c.hw + 2, -c.hh + 2, (c.hw - 2) * 2, (c.hh - 2) * 2); }
          else { ctx.font = `${c.fs}px ${SERIF}`; ctx.fillText(c.s, 0, 1); }
          ctx.restore();
        });
        ctx.restore();
      }
    };
  }

  /* ---------- giorno o notte: dalle 7 alle 19 è giorno. Per provare: ?ora=giorno oppure ?ora=notte nell'indirizzo ---------- */
  function eNotte() { const q = new URLSearchParams(location.search).get("ora"); if (q === "notte") return true; if (q === "giorno") return false; const h = new Date().getHours(); return h >= 19 || h < 7; }
  const SCENE = {
    scientifico: (W, H, n) => n ? spazio(W, H) : scientifico(W, H),
    "scienze-applicate": (W, H, n) => n ? matrix(W, H) : scienzeApplicate(W, H),
    tred: (W, H, n) => tred(W, H, n),
    linguistico: (W, H) => linguistico(W, H),
    classico: (W, H, n) => n ? classicoNotte(W, H) : classicoGiorno(W, H),
    artistico: (W, H, n) => artistico(W, H, n),
    trasporti: (W, H, n) => trasporti(W, H, n),
    logistica: (W, H, n) => logistica(W, H, n),
    navale: (W, H, n) => n ? navaleFaro(W, H) : navaleCarta(W, H),
    "navale-giorno": navaleCarta, "navale-faro": navaleFaro
  };

  /* ---------- motore: un solo ciclo di animazione per tutte le scene attive ---------- */
  const attive = [];
  const fermo = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function crea(el) {
    const nome = el.dataset.scena; if (!SCENE[nome] && nome !== "segni") return; if (el.querySelector("canvas")) return;
    const cv = document.createElement("canvas"); el.appendChild(cv); const ctx = cv.getContext("2d");
    const s = { el, cv, ctx, nome, t: 0 };
    function dim() { const dpr = Math.min(window.devicePixelRatio || 1, 1.5); const mini = el.classList.contains("mini"); s.W = mini ? el.clientWidth || 260 : innerWidth; s.H = mini ? el.clientHeight || 170 : innerHeight; cv.width = s.W * dpr; cv.height = s.H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      s.scena = nome === "segni" ? segni(s.W, s.H, { tema: el.dataset.tema, quanti: +el.dataset.quanti || 60, mini, el }) : SCENE[nome](s.W, s.H, eNotte());
      const pg = !mini && el.closest(".pagina-tema"); if (pg) { pg.classList.toggle("scura", !!s.scena.scura); pg.style.paddingTop = s.scena.alto ? (s.scena.alto - 20) + "px" : ""; } }
    dim(); s.dim = dim; attive.push(s);
    if (fermo) { for (let k = 0; k < 240; k++) passo(s, 1 / 30, k === 239); }
  }
  function passo(s, dt, disegna) {
    s.t += dt; const { ctx, W, H } = s; ctx.clearRect(0, 0, W, H);
    try { s.scena.disegna(ctx, s.t, dt); } catch (e) { console.warn("scena", s.nome, e); s.rotta = true; }
    void disegna;
  }
  let ultimo = 0;
  function ciclo(ora) {
    const dt = Math.min(0.05, (ora - ultimo) / 1000 || 0.016); ultimo = ora;
    for (let i = attive.length - 1; i >= 0; i--) { const s = attive[i]; if (!s.cv.isConnected || s.rotta) { attive.splice(i, 1); continue; } if (!fermo) passo(s, dt, true); }
    requestAnimationFrame(ciclo);
  }
  requestAnimationFrame(ciclo);
  let timer; window.addEventListener("resize", () => { clearTimeout(timer); timer = setTimeout(() => attive.forEach(s => { s.dim(); if (fermo) for (let k = 0; k < 240; k++) passo(s, 1 / 30); }), 200); });
  window.SCENE = { avvia: radice => radice.querySelectorAll(".sfondo-tema[data-scena]").forEach(crea), esiste: n => !!SCENE[n] };
})();

