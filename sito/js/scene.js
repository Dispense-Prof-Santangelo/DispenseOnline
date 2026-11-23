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
    /* piste sparse ovunque, in modo disordinato: partono dai piedini dei componenti o da punti liberi della scheda,
       girano a 45° o 90° a caso, a volte in gruppi paralleli, e finiscono in un foro passante */
    const dentro = (x, y, m) => chip.some(c => x > c.x - m && x < c.x + c.w + m && y > c.y - m && y < c.y + c.h + m);
    const DIR = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
    const fori = [];
    for (let n = 0; n < W * H / 7000; n++) {
      let x, y, d, da = null;
      if (Math.random() < 0.55 && chip.length) { const c = scegli(chip), lato = Math.floor(rnd(0, 4)); da = c;
        if (lato === 0) { x = c.x + Math.round(rnd(0.1, 0.9) * c.w / (g / 2)) * (g / 2); y = c.y - 6; d = 6; }
        else if (lato === 1) { x = c.x + c.w + 6; y = c.y + Math.round(rnd(0.1, 0.9) * c.h / (g / 2)) * (g / 2); d = 0; }
        else if (lato === 2) { x = c.x + Math.round(rnd(0.1, 0.9) * c.w / (g / 2)) * (g / 2); y = c.y + c.h + 6; d = 2; }
        else { x = c.x - 6; y = c.y + Math.round(rnd(0.1, 0.9) * c.h / (g / 2)) * (g / 2); d = 4; } }
      else { x = Math.round(rnd(0, W) / g) * g; y = Math.round(rnd(70, H) / g) * g; d = Math.floor(rnd(0, 4)) * 2; if (dentro(x, y, 8)) continue; }
      const fasci = Math.random() < 0.3 ? Math.floor(rnd(2, 5)) : 1, sp = Math.max(5, g * 0.4);
      /* percorso guida */
      const guida = [[x, y]]; let ok = true;
      for (let seg = 0, ns = Math.floor(rnd(2, 6)); seg < ns; seg++) {
        if (seg) d = (d + scegli([1, -1, 2, -2, 1, -1]) + 8) % 8;
        const [ux, uy] = DIR[d], l = Math.round(rnd(2, 9)) * g * (ux && uy ? 0.7 : 1);
        let nx = x, ny = y, passo = 0;
        for (; passo < l; passo += 3) { const tx = x + ux * passo, ty = y + uy * passo; if (tx < -20 || tx > W + 20 || ty < 60 || ty > H + 20 || dentro(tx, ty, 8)) break; nx = tx; ny = ty; }
        if (passo < g) { if (seg === 0) ok = false; break; }
        x = nx; y = ny; guida.push([x, y]);
      }
      if (!ok || guida.length < 2) continue;
      for (let fi = 0; fi < fasci; fi++) {
        const o = (fi - (fasci - 1) / 2) * sp;
        const pts = guida.map(([px, py], i) => { const a = guida[Math.max(0, i - 1)], b = guida[Math.min(guida.length - 1, i + 1)], vx = b[0] - a[0], vy = b[1] - a[1], L = Math.hypot(vx, vy) || 1; return [px - vy / L * o, py + vx / L * o]; });
        let L = 0; for (let k = 1; k < pts.length; k++) L += Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]);
        piste.push({ pts, L, sottile: true }); fori.push(pts[pts.length - 1]); if (!da) fori.push(pts[0]);
      }
    }
    f.lineCap = "round"; f.lineJoin = "round";
    piste.forEach(p => { f.strokeStyle = p.sottile ? "rgba(31,111,139,.28)" : "rgba(31,111,139,.42)"; f.lineWidth = p.sottile ? 1.5 : 2; f.beginPath(); f.moveTo(...p.pts[0]); p.pts.slice(1).forEach(q => f.lineTo(...q)); f.stroke(); });
    fori.forEach(([x, y]) => { f.fillStyle = "#c9a74b"; f.beginPath(); f.arc(x, y, 3.6, 0, 7); f.fill(); f.fillStyle = "#eef6f3"; f.beginPath(); f.arc(x, y, 1.5, 0, 7); f.fill(); });
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
  /* LINGUISTICO: tre finestre affiancate sulle città delle tre lingue studiate.
     Londra (Big Ben con l'ora reale, Westminster, London Eye che gira, autobus rosso sul ponte),
     Parigi (Tour Eiffel, palazzi haussmanniani, Senna con il bateau-mouche),
     Berlino (Porta di Brandeburgo, Reichstag, torre della TV, autobus giallo).
     Di giorno e di notte; ogni finestra ha le sue nuvole, che non si sovrappongono. */
  function linguistico(W, H, notte) {
    const D = Math.min(2, window.devicePixelRatio || 1);
    const tela = (w, h) => { const c = document.createElement("canvas"); c.width = Math.ceil(w * D); c.height = Math.ceil(h * D); const x = c.getContext("2d"); x.scale(D, D); return [c, x]; };
    const piccolo = W < 600, m = piccolo ? 6 : 14, pw = (W - 2 * m) / 3, u = Math.min(pw / 260, H / 760), yW = H * 0.8;
    const finestre = [];

    /* ---------- elementi comuni ---------- */
    function cielo(p, c0, c1) {
      const g = p.createLinearGradient(0, 0, 0, yW); g.addColorStop(0, c0); g.addColorStop(1, c1); p.fillStyle = g; p.fillRect(0, 0, pw, yW + 2);
      if (notte) for (let i = 0; i < pw * yW / 2500; i++) { p.fillStyle = `rgba(255,255,240,${rnd(0.3, 0.9)})`; p.beginPath(); p.arc(rnd(0, pw), rnd(0, yW * 0.75), rnd(0.4, 1.3), 0, 7); p.fill(); }
    }
    function lontano(p, y, h0, h1, col) {
      for (let x = -5; x < pw + 5;) { const w = rnd(10, 26) * u, h = rnd(h0, h1) * u; p.fillStyle = col; p.fillRect(x, y - h, w + 1, h + 2);
        if (notte) { p.fillStyle = "rgba(255,214,130,.55)"; for (let k = 0; k < h * w / 140; k++) if (Math.random() < 0.4) p.fillRect(x + rnd(2, w - 3), y - rnd(4, h - 2), 1.6 * u, 2 * u); }
        x += w; }
    }
    function finestrelle(p, x0, y0, w, h, passoX, passoY, fw, fh, col) {
      for (let y = y0; y + fh <= y0 + h; y += passoY) for (let x = x0; x + fw <= x0 + w; x += passoX) {
        p.fillStyle = notte ? (Math.random() < 0.45 ? "#ffd27a" : "#1d2338") : col; p.fillRect(x, y, fw, fh); }
    }
    function nuvoleIn(ctx, lista, dt, col, sotto) {
      muoviNuvole(lista, dt, pw, 30 * u, yW * 0.42, 50 * u, 22 * u);
      const sb = [[0, 0, 22], [-26, 6, 16], [26, 6, 18], [8, -12, 17], [-12, -6, 14]];
      ctx.fillStyle = sotto; ctx.beginPath(); lista.forEach(n => sb.forEach(([dx, dy, r]) => { const R = r * n.s * u; ctx.moveTo(n.x + dx * n.s * u + R, n.y + dy * n.s * u); ctx.arc(n.x + dx * n.s * u, n.y + dy * n.s * u, R, 0, 7); })); ctx.fill();
      ctx.fillStyle = col; ctx.beginPath(); lista.forEach(n => sb.forEach(([dx, dy, r]) => { const R = r * n.s * u * 0.86; ctx.moveTo(n.x + dx * n.s * u + R, n.y + (dy - 4) * n.s * u); ctx.arc(n.x + dx * n.s * u, n.y + (dy - 4) * n.s * u, R, 0, 7); })); ctx.fill();
    }
    const creaNuvole = q => Array.from({ length: q }, () => ({ x: rnd(0, pw), y: rnd(40, yW * 0.4), s: rnd(0.7, 1.1), v: rnd(5, 10) }));
    function riflessi(ctx, t, y0, y1, col) { ctx.fillStyle = col; for (let i = 0; i < 26; i++) { const v = ((i * 37) % 100) / 100, x = (i * 71 + t * (6 + v * 8)) % (pw + 40) - 20, y = y0 + 4 + v * (y1 - y0 - 8); if (Math.sin(t * 1.8 + i) > 0.3) ctx.fillRect(x, y, (6 + v * 14) * u, 1.3); } }
    function bandiera(ctx, tipo, x, y, w, h) {
      ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
      if (tipo === "uk") { ctx.fillStyle = "#012169"; ctx.fillRect(x, y, w, h); ctx.lineWidth = h * 0.3; ctx.strokeStyle = "#fff"; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y + h); ctx.moveTo(x + w, y); ctx.lineTo(x, y + h); ctx.stroke();
        ctx.lineWidth = h * 0.1; ctx.strokeStyle = "#C8102E"; ctx.stroke(); ctx.fillStyle = "#fff"; ctx.fillRect(x + w * 0.4, y, w * 0.2, h); ctx.fillRect(x, y + h * 0.33, w, h * 0.34);
        ctx.fillStyle = "#C8102E"; ctx.fillRect(x + w * 0.44, y, w * 0.12, h); ctx.fillRect(x, y + h * 0.4, w, h * 0.2); }
      else if (tipo === "fr") { ["#002654", "#ffffff", "#CE1126"].forEach((c, i) => { ctx.fillStyle = c; ctx.fillRect(x + i * w / 3, y, w / 3 + 0.5, h); }); }
      else { ["#000000", "#DD0000", "#FFCE00"].forEach((c, i) => { ctx.fillStyle = c; ctx.fillRect(x, y + i * h / 3, w, h / 3 + 0.5); }); }
      ctx.restore(); ctx.strokeStyle = "rgba(0,0,0,.25)"; ctx.lineWidth = 1; ctx.strokeRect(x, y, w, h);
    }
    function targa(ctx, tipo, citta, saluto) {
      const fs = Math.max(11, Math.round(15 * u)), fw = fs * 1.6, fh = fs * 1.05;
      ctx.font = `bold ${fs}px ${SERIF}`; const tw = ctx.measureText(citta).width; ctx.font = `italic ${fs}px ${SERIF}`; const sw = piccolo ? 0 : ctx.measureText(" · " + saluto).width;
      const w = fw + tw + sw + fs * 1.6, h = fs * 2, x = pw / 2 - w / 2, y = H - h - 10 * u;
      ctx.fillStyle = notte ? "rgba(16,20,40,.85)" : "rgba(253,250,242,.92)"; ctx.beginPath(); ctx.roundRect(x, y, w, h, h / 2); ctx.fill();
      ctx.strokeStyle = notte ? "rgba(255,220,150,.5)" : "rgba(120,100,70,.4)"; ctx.lineWidth = 1; ctx.stroke();
      bandiera(ctx, tipo, x + fs * 0.7, y + (h - fh) / 2, fw, fh);
      ctx.textBaseline = "middle"; ctx.textAlign = "left"; ctx.fillStyle = notte ? "#f6ecd6" : "#2d2a26"; ctx.font = `bold ${fs}px ${SERIF}`; ctx.fillText(citta, x + fs * 0.7 + fw + fs * 0.45, y + h / 2 + 1);
      if (!piccolo) { ctx.font = `italic ${fs}px ${SERIF}`; ctx.fillStyle = notte ? "#d8c9a6" : "#6d5f4b"; ctx.fillText(" · " + saluto, x + fs * 0.7 + fw + fs * 0.45 + tw, y + h / 2 + 1); }
      ctx.textBaseline = "alphabetic";
    }

    /* ================= LONDRA ================= */
    {
      const [dietro, p] = tela(pw, H), [davanti, q] = tela(pw, H);
      cielo(p, notte ? "#0a1330" : "#9fb6c9", notte ? "#2a3560" : "#e4e8ea");
      lontano(p, yW - 4 * u, 25, 70, notte ? "#1b2447" : "#b9c4cc");
      /* cupola di St Paul e lo Shard sullo sfondo */
      const sp = pw * 0.6, sy = yW - 60 * u; p.fillStyle = notte ? "#1f2a50" : "#aab6bf"; p.fillRect(sp - 22 * u, sy, 44 * u, 60 * u); p.beginPath(); p.arc(sp, sy, 18 * u, Math.PI, 0); p.fill(); p.fillRect(sp - 3 * u, sy - 30 * u, 6 * u, 14 * u);
      const sh = pw * 0.93; let g = p.createLinearGradient(sh - 20 * u, 0, sh + 20 * u, 0); g.addColorStop(0, notte ? "#2a3762" : "#c8d6e0"); g.addColorStop(1, notte ? "#18203d" : "#8fa4b3"); p.fillStyle = g;
      p.beginPath(); p.moveTo(sh - 22 * u, yW); p.lineTo(sh - 2 * u, yW - 230 * u); p.lineTo(sh + 3 * u, yW - 215 * u); p.lineTo(sh + 22 * u, yW); p.fill();
      /* Tamigi */
      g = q.createLinearGradient(0, yW, 0, H); g.addColorStop(0, notte ? "#16213d" : "#6b8796"); g.addColorStop(1, notte ? "#0a1022" : "#40596a"); q.fillStyle = g; q.fillRect(0, yW, pw, H - yW);
      if (notte) for (let i = 0; i < 40; i++) { q.fillStyle = "rgba(255,210,120,.35)"; q.fillRect(rnd(0, pw), rnd(yW + 4, yW + 50 * u), rnd(1, 2), rnd(6, 16) * u); }
      /* Palazzo di Westminster */
      const pb = yW - 4 * u, ph = 68 * u, pierra = notte ? "#8a7550" : "#d4bc88", ombra = notte ? "#5e4e34" : "#b29a68";
      q.fillStyle = pierra; q.fillRect(-5, pb - ph, pw * 0.78, ph);
      q.fillStyle = ombra; for (let x = 0; x < pw * 0.78; x += 7 * u) q.fillRect(x, pb - ph + 6 * u, 1.2 * u, ph - 10 * u);
      finestrelle(q, 3 * u, pb - ph + 10 * u, pw * 0.76, ph - 16 * u, 7 * u, 16 * u, 3 * u, 9 * u, notte ? "" : "#8c7a58");
      q.fillStyle = pierra; for (let x = 0; x < pw * 0.78; x += 12 * u) { q.beginPath(); q.moveTo(x - 2 * u, pb - ph); q.lineTo(x, pb - ph - 12 * u); q.lineTo(x + 2 * u, pb - ph); q.fill(); }
      /* torre Victoria e guglia centrale */
      const vx = pw * 0.06, vw = 34 * u, vh = 190 * u; q.fillStyle = pierra; q.fillRect(vx, pb - vh, vw, vh); q.fillStyle = ombra; q.fillRect(vx + vw * 0.65, pb - vh, vw * 0.35, vh);
      finestrelle(q, vx + 6 * u, pb - vh + 14 * u, vw - 10 * u, vh - 30 * u, 8 * u, 20 * u, 3 * u, 12 * u, notte ? "" : "#8c7a58");
      q.fillStyle = pierra; [0, vw - 4 * u].forEach(dx => { q.beginPath(); q.moveTo(vx + dx, pb - vh); q.lineTo(vx + dx + 2 * u, pb - vh - 16 * u); q.lineTo(vx + dx + 4 * u, pb - vh); q.fill(); });
      q.strokeStyle = "#555"; q.lineWidth = 1; q.beginPath(); q.moveTo(vx + vw / 2, pb - vh); q.lineTo(vx + vw / 2, pb - vh - 26 * u); q.stroke(); bandiera(q, "uk", vx + vw / 2, pb - vh - 26 * u, 16 * u, 9 * u);
      const cx = pw * 0.42; q.fillStyle = pierra; q.beginPath(); q.moveTo(cx - 9 * u, pb - ph); q.lineTo(cx - 9 * u, pb - ph - 30 * u); q.lineTo(cx, pb - ph - 80 * u); q.lineTo(cx + 9 * u, pb - ph - 30 * u); q.lineTo(cx + 9 * u, pb - ph); q.fill();
      /* Big Ben (Elizabeth Tower) */
      const bx = Math.min(pw * 0.8, pw - 30 * u), bw = 30 * u, base = pb, alto1 = base - 205 * u, cs = alto1 - 44 * u;
      g = q.createLinearGradient(bx - bw / 2, 0, bx + bw / 2, 0); g.addColorStop(0, notte ? "#a88c58" : "#e2cd9c"); g.addColorStop(0.6, pierra); g.addColorStop(1, ombra); q.fillStyle = g;
      q.fillRect(bx - bw / 2, alto1, bw, base - alto1);
      q.fillStyle = ombra; for (let y = alto1 + 8 * u; y < base - 8 * u; y += 14 * u) { q.fillRect(bx - bw * 0.32, y, bw * 0.14, 9 * u); q.fillRect(bx + bw * 0.18, y, bw * 0.14, 9 * u); }
      q.fillStyle = g; q.fillRect(bx - bw * 0.62, cs, bw * 1.24, alto1 - cs);
      q.fillStyle = notte ? "#6e5a38" : "#a88f5f"; q.fillRect(bx - bw * 0.62, cs, bw * 1.24, 3 * u); q.fillRect(bx - bw * 0.62, alto1 - 3 * u, bw * 1.24, 3 * u);
      const bel = cs - 26 * u; q.fillStyle = g; q.fillRect(bx - bw * 0.5, bel, bw, 26 * u); q.fillStyle = notte ? "#2a2416" : "#5a4a30"; for (let k = 0; k < 3; k++) { const ax = bx - bw * 0.36 + k * bw * 0.28; q.beginPath(); q.arc(ax + 3 * u, bel + 10 * u, 3 * u, Math.PI, 0); q.fillRect(ax, bel + 10 * u, 6 * u, 12 * u); q.fill(); }
      q.fillStyle = notte ? "#2e3640" : "#3c4a55"; q.beginPath(); q.moveTo(bx - bw * 0.56, bel); q.lineTo(bx - bw * 0.1, bel - 62 * u); q.lineTo(bx + bw * 0.1, bel - 62 * u); q.lineTo(bx + bw * 0.56, bel); q.fill();
      q.fillStyle = "#d9b44a"; q.fillRect(bx - 1.2 * u, bel - 82 * u, 2.4 * u, 22 * u); q.beginPath(); q.arc(bx, bel - 82 * u, 2.5 * u, 0, 7); q.fill();
      for (let k = -1; k <= 1; k += 2) { q.beginPath(); q.moveTo(bx + k * bw * 0.56, bel); q.lineTo(bx + k * bw * 0.6, bel - 14 * u); q.lineTo(bx + k * bw * 0.46, bel); q.fill(); }
      const orologio = { x: bx, y: cs + (alto1 - cs) / 2, r: 14 * u };
      /* argine e ponte di Westminster */
      q.fillStyle = notte ? "#4d4a44" : "#9b9384"; q.fillRect(0, yW - 4 * u, pw, 8 * u);
      const yD = yW + (H - yW) * 0.42; q.fillStyle = notte ? "#2a4436" : "#4f7d62"; q.fillRect(0, yD, pw, 7 * u);
      q.fillStyle = notte ? "#3a3a3a" : "#8d8a82"; q.fillRect(0, yD + 7 * u, pw, 4 * u);
      for (let x = -20 * u; x < pw; x += 70 * u) { q.fillStyle = notte ? "#20352a" : "#3f6a52"; q.beginPath(); q.moveTo(x, yD + 11 * u); q.quadraticCurveTo(x + 35 * u, yD + 30 * u, x + 70 * u, yD + 11 * u); q.lineTo(x + 70 * u, yD + 36 * u); q.lineTo(x, yD + 36 * u); q.fill();
        q.fillStyle = notte ? "#4a463e" : "#a39c8c"; q.fillRect(x + 64 * u, yD + 11 * u, 12 * u, 34 * u); }
      q.fillStyle = notte ? "#e8c67a" : "#3f4a46"; for (let x = 10 * u; x < pw; x += 36 * u) { q.fillRect(x, yD - 16 * u, 1.4 * u, 16 * u); q.beginPath(); q.arc(x + 0.7 * u, yD - 17 * u, 2.4 * u, 0, 7); q.fill(); }
      const nuv = creaNuvole(piccolo ? 2 : 3), bus = { x: rnd(0, pw), v: 26 * u };
      finestre.push({ dietro, davanti, disegna(ctx, t, dt) {
        ctx.drawImage(dietro, 0, 0, pw, H);
        nuvoleIn(ctx, nuv, dt, notte ? "#2f3a63" : "#f3f5f6", notte ? "#232c4f" : "#cfd7dd");
        /* London Eye: la ruota gira lentamente */
        const ex = pw * 0.3, rE = Math.min(80 * u, pw * 0.22), ey = yW - 68 * u - rE * 0.8;
        ctx.strokeStyle = notte ? "rgba(120,170,255,.9)" : "#e9eef2"; ctx.lineWidth = 2.2 * u; ctx.beginPath(); ctx.arc(ex, ey, rE, 0, 7); ctx.stroke(); ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(ex, ey, rE * 0.92, 0, 7); ctx.stroke();
        ctx.strokeStyle = notte ? "rgba(120,170,255,.35)" : "rgba(220,228,234,.8)"; ctx.lineWidth = 0.7; ctx.beginPath(); for (let k = 0; k < 32; k++) { const a = k / 32 * 7 + t * 0.03; ctx.moveTo(ex, ey); ctx.lineTo(ex + Math.cos(a) * rE * 0.92, ey + Math.sin(a) * rE * 0.92); } ctx.stroke();
        ctx.fillStyle = notte ? "#bcd6ff" : "#f8fafb"; for (let k = 0; k < 32; k++) { const a = k / 32 * Math.PI * 2 + t * 0.03; ctx.beginPath(); ctx.ellipse(ex + Math.cos(a) * rE * 1.03, ey + Math.sin(a) * rE * 1.03, 2.6 * u, 1.8 * u, 0, 0, 7); ctx.fill(); }
        ctx.strokeStyle = notte ? "#5d6b8f" : "#c7cfd6"; ctx.lineWidth = 2.5 * u; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex - rE * 0.3, yW - 4 * u); ctx.moveTo(ex, ey); ctx.lineTo(ex + rE * 0.3, yW - 4 * u); ctx.stroke();
        ctx.drawImage(davanti, 0, 0, pw, H);
        /* quadrante del Big Ben con l'ora reale */
        const o = orologio, d = new Date(), hh = (d.getHours() % 12) + d.getMinutes() / 60, mm = d.getMinutes() + d.getSeconds() / 60;
        ctx.fillStyle = notte ? "#ffe9a8" : "#f4efe0"; ctx.beginPath(); ctx.arc(o.x, o.y, o.r, 0, 7); ctx.fill();
        ctx.strokeStyle = "#c9a54a"; ctx.lineWidth = 1.6 * u; ctx.stroke();
        ctx.fillStyle = "#222"; for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; ctx.fillRect(o.x + Math.sin(a) * o.r * 0.8 - 0.6, o.y - Math.cos(a) * o.r * 0.8 - 0.6, 1.2, 1.2); }
        ctx.strokeStyle = "#1a1a1a"; ctx.lineCap = "round"; ctx.lineWidth = 1.8 * u; ctx.beginPath(); ctx.moveTo(o.x, o.y); ctx.lineTo(o.x + Math.sin(hh / 12 * Math.PI * 2) * o.r * 0.5, o.y - Math.cos(hh / 12 * Math.PI * 2) * o.r * 0.5); ctx.stroke();
        ctx.lineWidth = 1.1 * u; ctx.beginPath(); ctx.moveTo(o.x, o.y); ctx.lineTo(o.x + Math.sin(mm / 60 * Math.PI * 2) * o.r * 0.78, o.y - Math.cos(mm / 60 * Math.PI * 2) * o.r * 0.78); ctx.stroke(); ctx.lineCap = "butt";
        if (notte) { const gl = ctx.createRadialGradient(o.x, o.y, o.r, o.x, o.y, o.r * 2.6); gl.addColorStop(0, "rgba(255,220,140,.35)"); gl.addColorStop(1, "rgba(255,220,140,0)"); ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(o.x, o.y, o.r * 2.6, 0, 7); ctx.fill(); }
        riflessi(ctx, t, yW + 6 * u, yD - 2, notte ? "rgba(255,210,130,.35)" : "rgba(255,255,255,.35)");
        /* autobus rosso a due piani sul ponte */
        bus.x += bus.v * dt; if (bus.x > pw + 70 * u) bus.x = -70 * u;
        const L = 62 * u, h = 36 * u, x = bus.x, y = yD;
        ctx.fillStyle = "#c8102e"; ctx.beginPath(); ctx.roundRect(x - L, y - h - 4 * u, L, h, 4 * u); ctx.fill();
        ctx.fillStyle = notte ? "#ffe3a0" : "#2b3440"; for (let r = 0; r < 2; r++) for (let k = 0; k < 5; k++) ctx.fillRect(x - L + 5 * u + k * 11 * u, y - h + r * 16 * u, 8 * u, 8 * u);
        ctx.fillStyle = "#f1e7c8"; ctx.fillRect(x - L, y - h * 0.52 - 4 * u, L, 2 * u);
        ctx.fillStyle = "#1a1a1a"; [x - L + 12 * u, x - 12 * u].forEach(wx => { ctx.beginPath(); ctx.arc(wx, y - 4 * u, 5 * u, 0, 7); ctx.fill(); });
        if (notte) { ctx.fillStyle = "rgba(255,240,180,.9)"; ctx.fillRect(x - 3 * u, y - 12 * u, 3 * u, 3 * u); }
        targa(ctx, "uk", "London", "Hello!");
      } });
    }

    /* ================= PARIGI ================= */
    {
      const [dietro, p] = tela(pw, H), [davanti, q] = tela(pw, H);
      cielo(p, notte ? "#0d1233" : "#7cb4e2", notte ? "#2b2752" : "#f5e4cc");
      lontano(p, yW - 4 * u, 20, 50, notte ? "#1f1e40" : "#c7c3c4");
      /* Tour Eiffel */
      const ex = pw / 2, eb = yW - 6 * u, hT = Math.min(440 * u, yW - 110 * u), half = y => 88 * u * Math.pow(1 - y, 2.3) + 4 * u;
      const col = notte ? "#d99a2b" : "#6f5236", traliccio = notte ? "#ffd987" : "#9a7754";
      p.beginPath(); for (let i = 0; i <= 40; i++) { const f = i / 40 * 0.93; p.lineTo(ex - half(f), eb - f * hT); } for (let i = 40; i >= 0; i--) { const f = i / 40 * 0.93; p.lineTo(ex + half(f), eb - f * hT); } p.closePath();
      p.moveTo(ex - 52 * u, eb); p.quadraticCurveTo(ex - 50 * u, eb - hT * 0.16, ex, eb - hT * 0.17); p.quadraticCurveTo(ex + 50 * u, eb - hT * 0.16, ex + 52 * u, eb); p.closePath();
      if (notte) { const gl = p.createRadialGradient(ex, eb - hT * 0.45, 10, ex, eb - hT * 0.45, hT * 0.7); gl.addColorStop(0, "rgba(255,190,90,.25)"); gl.addColorStop(1, "rgba(255,190,90,0)"); p.save(); p.fillStyle = gl; p.fillRect(0, 0, pw, yW); p.restore(); }
      p.fillStyle = col; p.fill("evenodd");
      p.save(); p.clip("evenodd"); p.strokeStyle = traliccio; p.lineWidth = 0.8; const s = 7 * u; p.beginPath(); for (let k = -H; k < H + pw; k += s) { p.moveTo(k, 0); p.lineTo(k - H, H); p.moveTo(k - H, 0); p.lineTo(k, H); } p.stroke(); p.restore();
      [[0.17, 1.25], [0.47, 1.4]].forEach(([f, ex2]) => { const w = half(f) * ex2; p.fillStyle = col; p.fillRect(ex - w, eb - f * hT - 6 * u, 2 * w, 7 * u); p.fillStyle = traliccio; for (let x = ex - w; x < ex + w; x += 4 * u) p.fillRect(x, eb - f * hT - 5 * u, 2 * u, 2 * u); });
      p.fillStyle = col; p.fillRect(ex - 6 * u, eb - hT * 0.93 - 10 * u, 12 * u, 12 * u); p.fillRect(ex - 1.2 * u, eb - hT - 4 * u, 2.4 * u, hT * 0.07 + 2 * u);
      const cima = { x: ex, y: eb - hT * 0.93 - 6 * u };
      /* Senna e palazzi haussmanniani */
      let g = q.createLinearGradient(0, yW, 0, H); g.addColorStop(0, notte ? "#1a1a3c" : "#5e8fa6"); g.addColorStop(1, notte ? "#0b0b20" : "#3c6a80"); q.fillStyle = g; q.fillRect(0, yW + 10 * u, pw, H);
      q.fillStyle = notte ? "#55503f" : "#cfc2a1"; q.fillRect(0, yW - 2 * u, pw, 13 * u); q.fillStyle = notte ? "#3d3a2e" : "#b2a37f"; q.fillRect(0, yW + 8 * u, pw, 3 * u);
      for (let x = 6 * u; x < pw; x += 24 * u) { q.fillStyle = notte ? "#2e4a28" : "#5f8a4a"; q.beginPath(); q.arc(x, yW - 12 * u, 9 * u, 0, 7); q.fill(); q.fillStyle = "#4a3a2a"; q.fillRect(x - 1, yW - 4 * u, 2, 5 * u); }
      function palazzo(x, w, h) {
        const y = yW - 2 * u - h;
        q.fillStyle = notte ? "#5d5444" : "#efe2c4"; q.fillRect(x, y, w, h);
        q.fillStyle = notte ? "#3f382d" : "#d9c9a5"; q.fillRect(x + w - 3 * u, y, 3 * u, h);
        finestrelle(q, x + 5 * u, y + 10 * u, w - 10 * u, h - 22 * u, 11 * u, 19 * u, 5 * u, 11 * u, "#5a6574");
        q.fillStyle = notte ? "#22201b" : "#3a3630"; [0.32, 0.82].forEach(f => q.fillRect(x + 2 * u, y + h * f, w - 4 * u, 1.6 * u));
        q.fillStyle = notte ? "#3b4450" : "#7e8b9a"; q.beginPath(); q.moveTo(x - 1, y); q.lineTo(x + 6 * u, y - 24 * u); q.lineTo(x + w - 6 * u, y - 24 * u); q.lineTo(x + w + 1, y); q.fill();
        q.fillStyle = notte ? "#ffd27a" : "#e9e3d6"; for (let dx = x + 10 * u; dx < x + w - 12 * u; dx += 16 * u) { q.fillRect(dx, y - 16 * u, 5 * u, 8 * u); }
        q.fillStyle = notte ? "#4a3e36" : "#b26b4f"; q.fillRect(x + w * 0.3, y - 30 * u, 6 * u, 8 * u); q.fillRect(x + w * 0.7, y - 30 * u, 6 * u, 8 * u);
      }
      for (let x = -10 * u; x < pw * 0.3; x += 0) { const w = rnd(44, 62) * u; palazzo(x, w, rnd(120, 150) * u); x += w + 2 * u; }
      for (let x = pw * 0.7; x < pw + 10 * u;) { const w = rnd(44, 62) * u; palazzo(x, w, rnd(120, 150) * u); x += w + 2 * u; }
      /* ponte ad arco sulla Senna */
      const yP = yW + (H - yW) * 0.62; q.fillStyle = notte ? "#4a4638" : "#d6c9a8";
      q.fillRect(0, yP - 8 * u, pw, 8 * u); for (let x = 0; x < pw; x += 80 * u) { q.beginPath(); q.moveTo(x, yP); q.quadraticCurveTo(x + 40 * u, yP - 2 * u, x + 80 * u, yP); q.lineTo(x + 80 * u, yP + 30 * u); q.quadraticCurveTo(x + 40 * u, yP + 2 * u, x, yP + 30 * u); q.fill(); }
      q.fillStyle = notte ? "#2a2720" : "#b3a47f"; q.fillRect(0, yP - 11 * u, pw, 3 * u);
      const nuv = creaNuvole(2), barca = { x: rnd(0, pw), v: 14 * u };
      finestre.push({ dietro, davanti, disegna(ctx, t, dt) {
        ctx.drawImage(dietro, 0, 0, pw, H);
        nuvoleIn(ctx, nuv, dt, notte ? "#38345f" : "#fbf6ee", notte ? "#2a2750" : "#e8dccb");
        if (notte) {
          /* faro che ruota dalla cima e scintillio della torre */
          const a = -Math.PI / 2 + Math.sin(t * 0.5) * 1.1, L = pw * 1.2; ctx.save(); ctx.translate(cima.x, cima.y); ctx.rotate(a);
          const gb = ctx.createLinearGradient(0, 0, L, 0); gb.addColorStop(0, "rgba(255,240,200,.35)"); gb.addColorStop(1, "rgba(255,240,200,0)"); ctx.fillStyle = gb; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(L, -L * 0.05); ctx.lineTo(L, L * 0.05); ctx.fill(); ctx.restore();
          ctx.fillStyle = "#fff"; for (let i = 0; i < 26; i++) { const f = ((i * 53 + Math.floor(t * 6) * 17) % 100) / 100 * 0.9, w = half(f); if ((i + Math.floor(t * 8)) % 3) continue; ctx.beginPath(); ctx.arc(ex + ((i * 29) % 100 / 100 - 0.5) * 2 * w, eb - f * hT, 1.4 * u, 0, 7); ctx.fill(); }
        }
        ctx.drawImage(davanti, 0, 0, pw, H);
        riflessi(ctx, t, yW + 12 * u, yP - 12 * u, notte ? "rgba(255,200,110,.35)" : "rgba(255,255,255,.4)");
        /* bateau-mouche (passa tra la riva e il ponte) */
        barca.x -= barca.v * dt; if (barca.x < -80 * u) barca.x = pw + 80 * u;
        const x = barca.x, y = yW + (yP - 12 * u - yW) * 0.75, L = 74 * u;
        ctx.fillStyle = "#f4f2ec"; ctx.beginPath(); ctx.moveTo(x - 4 * u, y - 6 * u); ctx.lineTo(x + L, y - 6 * u); ctx.lineTo(x + L - 6 * u, y + 3 * u); ctx.lineTo(x + 2 * u, y + 3 * u); ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#1f3e6e"; ctx.fillRect(x, y - 3 * u, L - 4 * u, 2 * u);
        ctx.fillStyle = notte ? "rgba(255,225,150,.9)" : "rgba(150,190,215,.85)"; ctx.fillRect(x + 8 * u, y - 15 * u, L - 22 * u, 9 * u); ctx.strokeStyle = "#e8e6df"; ctx.lineWidth = 1; for (let k = x + 8 * u; k < x + L - 14 * u; k += 7 * u) { ctx.beginPath(); ctx.moveTo(k, y - 15 * u); ctx.lineTo(k, y - 6 * u); ctx.stroke(); }
        ctx.fillStyle = "rgba(255,255,255,.45)"; ctx.fillRect(x + L, y + 2 * u, 26 * u, 1.2);
        targa(ctx, "fr", "Paris", "Bonjour !");
      } });
    }

    /* ================= BERLINO ================= */
    {
      const [dietro, p] = tela(pw, H), [davanti, q] = tela(pw, H);
      cielo(p, notte ? "#081228" : "#6aa6d9", notte ? "#232f55" : "#dbe9f2");
      lontano(p, yW - 4 * u, 20, 60, notte ? "#18213d" : "#bccad6");
      /* Fernsehturm, la torre della televisione */
      const tx = Math.min(pw * 0.8, pw - 24 * u), tb = yW, tS = tb - 290 * u, rS = 21 * u;
      let g = p.createLinearGradient(tx - 9 * u, 0, tx + 9 * u, 0); g.addColorStop(0, notte ? "#5a6070" : "#e9ecef"); g.addColorStop(1, notte ? "#2c3140" : "#a9b1b9"); p.fillStyle = g;
      p.beginPath(); p.moveTo(tx - 10 * u, tb); p.lineTo(tx - 5 * u, tS); p.lineTo(tx + 5 * u, tS); p.lineTo(tx + 10 * u, tb); p.fill();
      g = p.createRadialGradient(tx - 7 * u, tS - 7 * u, 2, tx, tS, rS); g.addColorStop(0, notte ? "#7b8296" : "#ffffff"); g.addColorStop(1, notte ? "#2c3346" : "#8d97a3"); p.fillStyle = g; p.beginPath(); p.arc(tx, tS, rS, 0, 7); p.fill();
      p.strokeStyle = notte ? "rgba(255,255,255,.15)" : "rgba(80,90,100,.35)"; p.lineWidth = 0.7; for (let k = -2; k <= 2; k++) { p.beginPath(); p.ellipse(tx, tS, rS * Math.abs(Math.cos(k * 0.6)), rS, 0, 0, 7); p.stroke(); }
      p.fillStyle = notte ? "#ffd27a" : "#3a4652"; p.fillRect(tx - rS * 0.95, tS - 1.5 * u, rS * 1.9, 3 * u);
      p.fillStyle = g; p.fillRect(tx - 3 * u, tS - rS - 12 * u, 6 * u, 12 * u);
      for (let k = 0; k < 6; k++) { p.fillStyle = k % 2 ? "#ffffff" : "#d63b2f"; p.fillRect(tx - 1.6 * u, tS - rS - 12 * u - (k + 1) * 9 * u, 3.2 * u, 9 * u); }
      const antenna = { x: tx, y: tS - rS - 66 * u };
      /* strada e piazza */
      g = q.createLinearGradient(0, yW, 0, H); g.addColorStop(0, notte ? "#2a2c33" : "#b9b6ae"); g.addColorStop(1, notte ? "#16171c" : "#8f8c85"); q.fillStyle = g; q.fillRect(0, yW, pw, H - yW);
      q.strokeStyle = notte ? "rgba(255,255,255,.06)" : "rgba(255,255,255,.25)"; q.lineWidth = 1; for (let y = yW + 6 * u; y < H; y += 9 * u) { q.beginPath(); q.moveTo(0, y); q.lineTo(pw, y); q.stroke(); }
      const yS = yW + (H - yW) * 0.48; q.fillStyle = notte ? "#1f2026" : "#6e6c68"; q.fillRect(0, yS - 16 * u, pw, 26 * u); q.fillStyle = notte ? "#8a8a70" : "#f2f0e8"; for (let x = 0; x < pw; x += 24 * u) q.fillRect(x, yS - 4 * u, 12 * u, 2 * u);
      /* Reichstag con la cupola di vetro */
      const rx = pw * 0.02, rw = 130 * u, rh = 56 * u, ry = yW - rh, pietra = notte ? "#7c705a" : "#d7cdb5", omb = notte ? "#544b3c" : "#b4a88e";
      q.fillStyle = pietra; q.fillRect(rx, ry, rw, rh); [rx - 4 * u, rx + rw - 18 * u].forEach(x => { q.fillRect(x, ry - 14 * u, 22 * u, rh + 14 * u); q.fillStyle = omb; q.fillRect(x + 16 * u, ry - 14 * u, 6 * u, rh + 14 * u); q.fillStyle = pietra; });
      finestrelle(q, rx + 22 * u, ry + 8 * u, rw - 44 * u, rh - 14 * u, 9 * u, 15 * u, 4 * u, 8 * u, "#6b6658");
      const pc = rx + rw / 2; q.fillStyle = pietra; q.fillRect(pc - 26 * u, ry - 6 * u, 52 * u, rh + 6 * u); q.fillStyle = omb; for (let k = 0; k < 6; k++) q.fillRect(pc - 23 * u + k * 9 * u, ry + 6 * u, 4 * u, rh - 6 * u);
      q.fillStyle = pietra; q.beginPath(); q.moveTo(pc - 29 * u, ry - 6 * u); q.lineTo(pc, ry - 22 * u); q.lineTo(pc + 29 * u, ry - 6 * u); q.fill();
      g = q.createLinearGradient(0, ry - 60 * u, 0, ry - 6 * u); g.addColorStop(0, notte ? "rgba(255,220,150,.85)" : "rgba(200,225,240,.9)"); g.addColorStop(1, notte ? "rgba(200,150,80,.6)" : "rgba(140,170,190,.8)"); q.fillStyle = g;
      q.beginPath(); q.ellipse(pc, ry - 6 * u, 24 * u, 34 * u, 0, Math.PI, 0); q.fill(); q.strokeStyle = notte ? "rgba(120,90,40,.6)" : "rgba(70,90,100,.6)"; q.lineWidth = 0.8;
      for (let k = 1; k < 5; k++) { q.beginPath(); q.ellipse(pc, ry - 6 * u, 24 * u * k / 5, 34 * u, 0, Math.PI, 0); q.stroke(); } for (let k = 1; k < 4; k++) { q.beginPath(); q.moveTo(pc - 24 * u * Math.sqrt(1 - (k / 4) ** 2), ry - 6 * u - 34 * u * k / 4); q.lineTo(pc + 24 * u * Math.sqrt(1 - (k / 4) ** 2), ry - 6 * u - 34 * u * k / 4); q.stroke(); }
      /* Porta di Brandeburgo */
      const gw = Math.min(210 * u, pw * 0.72), gx = Math.min(pw - gw * 0.72, Math.max(pw * 0.55, rx + rw + 112 * u)), gb = yW, ch = 92 * u, sand = notte ? "#9a8458" : "#e6d6ad", sabb = notte ? "#6d5c3c" : "#c3ae80";
      q.fillStyle = sabb; q.fillRect(gx - gw * 0.68, gb - 52 * u, gw * 0.16, 52 * u); q.fillRect(gx + gw * 0.52, gb - 52 * u, gw * 0.16, 52 * u);
      q.fillStyle = sand; q.fillRect(gx - gw / 2 - 4 * u, gb - 6 * u, gw + 8 * u, 6 * u);
      q.fillStyle = notte ? "#2a2418" : "#5a4e38"; q.fillRect(gx - gw / 2, gb - 6 * u - ch, gw, ch);
      for (let k = 0; k < 6; k++) { const cx = gx - gw / 2 + gw * 0.04 + k * gw * 0.92 / 5, cw = gw * 0.07;
        g = q.createLinearGradient(cx - cw / 2, 0, cx + cw / 2, 0); g.addColorStop(0, notte ? "#c2a468" : "#f6ead0"); g.addColorStop(0.5, sand); g.addColorStop(1, sabb); q.fillStyle = g;
        q.fillRect(cx - cw / 2, gb - 6 * u - ch, cw, ch); q.strokeStyle = notte ? "rgba(60,45,25,.5)" : "rgba(150,125,85,.5)"; q.lineWidth = 0.7; for (let f = -1; f <= 1; f++) { q.beginPath(); q.moveTo(cx + f * cw * 0.25, gb - 6 * u - ch + 6 * u); q.lineTo(cx + f * cw * 0.25, gb - 6 * u); q.stroke(); }
        q.fillStyle = sand; q.fillRect(cx - cw * 0.7, gb - 6 * u - ch, cw * 1.4, 5 * u); }
      const et = gb - 6 * u - ch; q.fillStyle = sand; q.fillRect(gx - gw / 2 - 6 * u, et - 18 * u, gw + 12 * u, 18 * u); q.fillStyle = sabb; for (let x = gx - gw / 2; x < gx + gw / 2; x += 10 * u) q.fillRect(x, et - 14 * u, 3 * u, 9 * u);
      q.fillStyle = sand; q.fillRect(gx - gw * 0.32, et - 40 * u, gw * 0.64, 22 * u); q.fillStyle = sabb; q.fillRect(gx - gw * 0.26, et - 35 * u, gw * 0.52, 12 * u);
      q.fillStyle = sand; q.fillRect(gx - gw * 0.36, et - 44 * u, gw * 0.72, 5 * u);
      /* quadriga stilizzata in bronzo verde */
      const qx = gx, qy = et - 44 * u, ver = notte ? "#3b6b5c" : "#4f8f78"; q.fillStyle = ver; q.strokeStyle = ver; q.lineWidth = 1.5 * u; q.lineCap = "round";
      for (let k = 0; k < 4; k++) { const hx = qx - 18 * u + k * 9 * u; q.beginPath(); q.ellipse(hx, qy - 9 * u, 4.5 * u, 3 * u, 0, 0, 7); q.fill(); q.beginPath(); q.moveTo(hx - 3 * u, qy - 7 * u); q.lineTo(hx - 3.5 * u, qy); q.moveTo(hx + 3 * u, qy - 7 * u); q.lineTo(hx + 2.5 * u, qy); q.moveTo(hx + 3 * u, qy - 11 * u); q.lineTo(hx + 5 * u, qy - 16 * u); q.stroke(); q.beginPath(); q.ellipse(hx + 5.5 * u, qy - 16.5 * u, 2.2 * u, 1.3 * u, 0.4, 0, 7); q.fill(); }
      q.fillRect(qx + 14 * u, qy - 12 * u, 9 * u, 8 * u); q.fillRect(qx + 17 * u, qy - 24 * u, 3 * u, 12 * u); q.beginPath(); q.arc(qx + 18.5 * u, qy - 26 * u, 2.2 * u, 0, 7); q.fill();
      q.beginPath(); q.moveTo(qx + 21 * u, qy - 18 * u); q.lineTo(qx + 24 * u, qy - 34 * u); q.stroke(); q.beginPath(); q.arc(qx + 24 * u, qy - 36 * u, 2.6 * u, 0, 7); q.lineWidth = 1 * u; q.stroke(); q.lineCap = "butt";
      if (notte) { g = q.createLinearGradient(0, gb, 0, gb - ch - 60 * u); g.addColorStop(0, "rgba(255,200,110,.35)"); g.addColorStop(1, "rgba(255,200,110,0)"); q.fillStyle = g; q.fillRect(gx - gw / 2 - 10 * u, gb - ch - 60 * u, gw + 20 * u, ch + 60 * u); }
      /* tigli di Unter den Linden */
      [pw * 0.98, pw * 1.12].forEach(x => { q.fillStyle = "#4a3a2a"; q.fillRect(x - 1.5 * u, yW - 26 * u, 3 * u, 26 * u); q.fillStyle = notte ? "#22392a" : "#5d8f4e"; q.beginPath(); q.arc(x, yW - 38 * u, 16 * u, 0, 7); q.fill(); q.fillStyle = notte ? "#2b4634" : "#77a862"; q.beginPath(); q.arc(x - 4 * u, yW - 42 * u, 9 * u, 0, 7); q.fill(); });
      const nuv = creaNuvole(piccolo ? 2 : 3), bus = { x: rnd(0, pw), v: 22 * u };
      finestre.push({ dietro, davanti, disegna(ctx, t, dt) {
        ctx.drawImage(dietro, 0, 0, pw, H);
        nuvoleIn(ctx, nuv, dt, notte ? "#2d3960" : "#f6f9fb", notte ? "#212b4e" : "#d3dde6");
        if (notte && Math.sin(t * 3) > 0) { const a = antenna, gl = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, 9 * u); gl.addColorStop(0, "rgba(255,60,50,1)"); gl.addColorStop(1, "rgba(255,60,50,0)"); ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(a.x, a.y, 9 * u, 0, 7); ctx.fill(); }
        ctx.drawImage(davanti, 0, 0, pw, H);
        /* autobus giallo a due piani (BVG) */
        bus.x -= bus.v * dt; if (bus.x < -70 * u) bus.x = pw + 70 * u;
        const L = 64 * u, h = 36 * u, x = bus.x, y = yS + 8 * u;
        ctx.fillStyle = "#f6c700"; ctx.beginPath(); ctx.roundRect(x, y - h - 4 * u, L, h, 4 * u); ctx.fill();
        ctx.fillStyle = notte ? "#ffe9b0" : "#2b3440"; for (let r = 0; r < 2; r++) for (let k = 0; k < 5; k++) ctx.fillRect(x + 5 * u + k * 11.5 * u, y - h + r * 16 * u, 8.5 * u, 8 * u);
        ctx.fillStyle = "#1a1a1a"; [x + 12 * u, x + L - 12 * u].forEach(wx => { ctx.beginPath(); ctx.arc(wx, y - 4 * u, 5 * u, 0, 7); ctx.fill(); });
        if (notte) { ctx.fillStyle = "rgba(255,240,180,.9)"; ctx.fillRect(x, y - 12 * u, 3 * u, 3 * u); }
        targa(ctx, "de", "Berlin", "Hallo!");
      } });
    }

    return {
      scura: !!notte,
      disegna(ctx, t, dt) {
        finestre.forEach((f, i) => { const x0 = i * (pw + m); ctx.save(); ctx.translate(x0, 0); ctx.beginPath(); ctx.rect(0, 0, pw, H); ctx.clip(); f.disegna(ctx, t, dt); ctx.restore(); });
        /* montanti delle finestre */
        for (let i = 1; i < 3; i++) { const x = i * (pw + m) - m; const g = ctx.createLinearGradient(x, 0, x + m, 0); g.addColorStop(0, notte ? "#2a2a33" : "#d9d0bf"); g.addColorStop(0.5, notte ? "#4a4855" : "#f8f3e8"); g.addColorStop(1, notte ? "#24242c" : "#cfc5b1"); ctx.fillStyle = g; ctx.fillRect(x, 0, m, H); }
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

  /* CLASSICO DI GIORNO: tra le colonne del tempio un paesaggio dell'Egeo.
     A sinistra un promontorio con un tempio dorico e i cipressi; a destra un'isola con un villaggio cicladico
     (case bianche, chiesa con cupola blu, mulino a vento che gira); il mare con barche e riflessi;
     in primo piano ulivi secolari, fiori, un sentiero e una meridiana di marmo che segna l'ORA REALE
     (anche il sole è nella posizione dell'ora reale). */
  function classicoGiorno(W, H) {
    const T = tempioGreco(W, H, false), { zona, alto, piccolo } = T;
    const D = Math.min(2, window.devicePixelRatio || 1);
    const tela = (w, h) => { const c = document.createElement("canvas"); c.width = Math.ceil(w * D); c.height = Math.ceil(h * D); const x = c.getContext("2d"); x.scale(D, D); return [c, x]; };
    let seme = 12345; const sr = (a = 0, b = 1) => { seme = (seme * 16807) % 2147483647; return a + (b - a) * (seme / 2147483647); };
    const Z = zona.x1 - zona.x0, X = u => zona.x0 + Z * u, base = H - 46, R = base - alto;
    const k = piccolo ? 0.6 : Math.max(0.8, Math.min(1.25, Z / 820));
    const orizz = alto + R * (piccolo ? 0.5 : 0.47);
    const ora = () => { const d = new Date(); return Math.max(6.2, Math.min(17.8, d.getHours() + d.getMinutes() / 60)); };
    const curva = pts => x => { if (x <= pts[0][0]) return pts[0][1]; for (let i = 0; i < pts.length - 1; i++) { const [a, ya] = pts[i], [b, yb] = pts[i + 1]; if (x <= b) { const u = (x - a) / (b - a), s = (1 - Math.cos(Math.PI * u)) / 2; return ya + (yb - ya) * s; } } return pts[pts.length - 1][1]; };
    const ruvido = (x, a) => (Math.sin(x * 0.071) * 1.6 + Math.sin(x * 0.23 + 1) * 0.9 + Math.sin(x * 0.53 + 2) * 0.4) * a;
    /* linea della riva in primo piano */
    const yG = x => base - R * (piccolo ? 0.13 : 0.16) + Math.sin(x / 95) * R * 0.014 + Math.sin(x / 37) * R * 0.005;
    const S = base - R * 0.16 - orizz;                                 /* altezza del mare visibile */
    const yH = orizz + S * 0.2, yV = orizz + S * 0.1;                  /* linee d'acqua del promontorio e dell'isola */

    /* ---------- CIELO ---------- */
    const [cielo, pc] = tela(W, H);
    const gc = pc.createLinearGradient(0, alto, 0, orizz); gc.addColorStop(0, "#3d93da"); gc.addColorStop(0.55, "#86c2ec"); gc.addColorStop(0.9, "#d8ecf4"); gc.addColorStop(1, "#f3ecdc");
    pc.fillStyle = gc; pc.fillRect(0, 0, W, orizz + 2);

    /* ---------- TERRA E MARE ---------- */
    const [terra, p] = tela(W, H);
    /* mare */
    const gm = p.createLinearGradient(0, orizz, 0, base); gm.addColorStop(0, "#5f95c4"); gm.addColorStop(0.04, "#2d6eac"); gm.addColorStop(0.45, "#1d64a8"); gm.addColorStop(0.8, "#1f88b9"); gm.addColorStop(1, "#38b5c2");
    p.fillStyle = gm; p.fillRect(0, orizz, W, base - orizz);
    for (let i = 0; i < 520; i++) { const u = Math.pow(sr(), 1.5), y = orizz + 3 + u * (S + R * 0.05), l = (3 + u * 34) * k, x = sr(-20, W);
      p.strokeStyle = sr() < 0.5 ? `rgba(255,255,255,${0.05 + u * 0.08})` : `rgba(8,40,90,${0.08 + u * 0.1})`; p.lineWidth = 0.6 + u * 1.2;
      p.beginPath(); p.moveTo(x, y); p.quadraticCurveTo(x + l / 2, y - 1 - u * 2, x + l, y); p.stroke(); }
    /* isole lontane nella foschia */
    function lontana(x0, w, h, col, f) { p.fillStyle = col; p.beginPath(); p.moveTo(x0, orizz + 1); for (let i = 0; i <= 60; i++) { const u = i / 60, x = x0 + u * w; p.lineTo(x, orizz - Math.pow(Math.sin(Math.PI * u), 0.7) * h - ruvido(x * f, 0.25 * k) * Math.sin(Math.PI * u)); } p.lineTo(x0 + w, orizz + 1); p.closePath(); p.fill(); }
    lontana(X(0.28), Z * 0.3, R * 0.05, "#a9bdd2", 1.3);
    lontana(X(0.4), Z * 0.2, R * 0.075, "#9cb2cb", 1.7);
    lontana(X(0.5), Z * 0.14, R * 0.035, "#b7c8da", 2.1);

    /* promontorio a sinistra con il tempio */
    const piano = yH - R * 0.27;
    const promo = curva([[-30, yH - R * 0.2], [X(-0.02), yH - R * 0.23], [X(0.04), piano], [X(0.3), piano], [X(0.36), yH - R * 0.14], [X(0.42), yH - R * 0.05], [X(0.48), yH + 1]]);
    const yP = x => promo(x) + (x > X(0.03) && x < X(0.31) ? 0 : ruvido(x, k));
    p.beginPath(); p.moveTo(-30, yH + 2); for (let x = -30; x <= X(0.48); x += 3) p.lineTo(x, yP(x)); p.lineTo(X(0.48), yH + 2); p.closePath();
    let g = p.createLinearGradient(0, piano, 0, yH); g.addColorStop(0, "#d9c398"); g.addColorStop(0.5, "#c4a97b"); g.addColorStop(1, "#9c8260"); p.fillStyle = g; p.fill();
    p.save(); p.clip();
    /* parete della scogliera in ombra con le stratificazioni */
    p.fillStyle = "rgba(90,70,50,.35)"; p.beginPath(); p.moveTo(X(0.3), piano); for (let x = X(0.3); x <= X(0.49); x += 3) p.lineTo(x, yP(x)); p.lineTo(X(0.49), yH + 2); p.lineTo(X(0.25), yH + 2); p.closePath(); p.fill();
    p.strokeStyle = "rgba(110,85,55,.35)"; p.lineWidth = 1; for (let i = 0; i < 9; i++) { const y = piano + (yH - piano) * (i + 1) / 10; p.beginPath(); p.moveTo(-30, y + ruvido(i * 40, 1)); for (let x = -30; x < X(0.5); x += 20) p.lineTo(x, y + ruvido(x + i * 50, 0.8 * k)); p.stroke(); }
    for (let i = 0; i < 40; i++) { const x = sr(X(0.3), X(0.47)), y = sr(yP(x) + 4, yH); p.strokeStyle = "rgba(70,55,40,.3)"; p.beginPath(); p.moveTo(x, y); p.lineTo(x + sr(-2, 2), y + sr(6, 16) * k); p.stroke(); }
    /* macchia mediterranea */
    for (let i = 0; i < 90; i++) { const x = sr(-30, X(0.42)), y = yP(x) + sr(1, (yH - yP(x)) * 0.5); p.fillStyle = ["#7c8650", "#6d7a47", "#8e955b", "#5f6c3f"][i % 4]; p.beginPath(); p.ellipse(x, y, sr(3, 8) * k, sr(2, 4) * k, 0, 0, 7); p.fill(); }
    p.restore();
    p.fillStyle = "rgba(10,40,80,.25)"; p.fillRect(-30, yH, X(0.5) + 30, 4 * k);
    /* cipressi */
    function cipresso(x, y, h) { const w = h * 0.16; g = p.createLinearGradient(x - w, 0, x + w, 0); g.addColorStop(0, "#3d5a33"); g.addColorStop(1, "#1f3420"); p.fillStyle = g;
      p.beginPath(); p.moveTo(x, y - h); p.bezierCurveTo(x + w * 0.9, y - h * 0.7, x + w * 1.1, y - h * 0.25, x + w * 0.5, y); p.lineTo(x - w * 0.5, y); p.bezierCurveTo(x - w * 1.1, y - h * 0.25, x - w * 0.9, y - h * 0.7, x, y - h); p.fill();
      p.strokeStyle = "rgba(120,150,90,.35)"; p.lineWidth = 1; for (let i = 0; i < 10; i++) { const yy = y - h * (0.1 + i * 0.08); p.beginPath(); p.moveTo(x - w * 0.5, yy); p.quadraticCurveTo(x - w * 0.2, yy - 3, x, yy - 1); p.stroke(); } }
    /* tempio dorico sul pianoro: poggia su un basamento che arriva fino al terreno */
    const tw = Z * (piccolo ? 0.18 : 0.15), tx = X(0.17);
    let tb = Infinity, tg = -Infinity; for (let x = tx - tw * 0.6; x <= tx + tw * 0.6; x++) { tb = Math.min(tb, yP(x)); tg = Math.max(tg, yP(x)); }
    cipresso(X(0.055), yP(X(0.055)) + 2, tw * 0.62); cipresso(X(0.03), yP(X(0.03)) + 2, tw * 0.48);
    function tempietto(cx, by, w) {
      const L = "#f5eedd", O = "#cdbe9c", sc = w * 0.03;
      p.fillStyle = "#b39f78"; p.fillRect(cx - w * 0.58, by, w * 1.16, tg - by + 3);
      for (let s = 0; s < 3; s++) { const ww = w * (1.12 - s * 0.05), y = by - (s + 1) * sc; p.fillStyle = O; p.fillRect(cx - ww / 2, y, ww, sc); p.fillStyle = L; p.fillRect(cx - ww / 2, y, ww, sc * 0.4); }
      const cb = by - 3 * sc, ch = w * 0.42, n = 6, cwid = w * 0.075, top = cb - ch;
      p.fillStyle = "#a7967a"; p.fillRect(cx - w * 0.47, top, w * 0.94, ch);             /* cella in ombra */
      p.fillStyle = "#8c7c62"; p.fillRect(cx - w * 0.47, top, w * 0.94, ch * 0.12);
      for (let i = 0; i < n; i++) { const x = cx - w * 0.47 + cwid / 2 + i * (w * 0.94 - cwid) / (n - 1);
        g = p.createLinearGradient(x - cwid / 2, 0, x + cwid / 2, 0); g.addColorStop(0, "#fffaf0"); g.addColorStop(0.45, L); g.addColorStop(1, O); p.fillStyle = g;
        p.beginPath(); p.moveTo(x - cwid * 0.5, cb); p.lineTo(x - cwid * 0.4, top + sc * 1.6); p.lineTo(x + cwid * 0.4, top + sc * 1.6); p.lineTo(x + cwid * 0.5, cb); p.closePath(); p.fill();
        p.strokeStyle = "rgba(150,130,100,.45)"; p.lineWidth = 0.6; for (let f = -1; f <= 1; f++) { p.beginPath(); p.moveTo(x + f * cwid * 0.22, cb); p.lineTo(x + f * cwid * 0.18, top + sc * 1.6); p.stroke(); }
        p.fillStyle = O; p.beginPath(); p.ellipse(x, top + sc * 1.4, cwid * 0.62, sc * 0.55, 0, 0, 7); p.fill(); p.fillStyle = L; p.fillRect(x - cwid * 0.68, top + sc * 0.4, cwid * 1.36, sc * 0.7); }
      const ar = top - w * 0.055; p.fillStyle = L; p.fillRect(cx - w * 0.52, ar, w * 1.04, w * 0.055); p.fillStyle = O; p.fillRect(cx - w * 0.52, ar + w * 0.04, w * 1.04, w * 0.015);
      const fr = ar - w * 0.05; p.fillStyle = "#e9dfc8"; p.fillRect(cx - w * 0.53, fr, w * 1.06, w * 0.05);
      p.fillStyle = O; for (let x = cx - w * 0.5; x < cx + w * 0.5; x += w * 0.06) p.fillRect(x, fr + w * 0.008, w * 0.022, w * 0.034);
      p.fillStyle = L; p.fillRect(cx - w * 0.56, fr - w * 0.015, w * 1.12, w * 0.015);
      p.beginPath(); p.moveTo(cx - w * 0.57, fr - w * 0.015); p.lineTo(cx, fr - w * 0.2); p.lineTo(cx + w * 0.57, fr - w * 0.015); p.closePath(); p.fill();
      p.fillStyle = "#d8ccb0"; p.beginPath(); p.moveTo(cx - w * 0.47, fr - w * 0.025); p.lineTo(cx, fr - w * 0.17); p.lineTo(cx + w * 0.47, fr - w * 0.025); p.closePath(); p.fill();
    }
    tempietto(tx, tb, tw);
    cipresso(X(0.3), yP(X(0.3)) + 3, tw * 0.55);

    /* isola a destra con il villaggio cicladico */
    const isola = curva([[X(0.5), yV + 1], [X(0.57), yV - R * 0.05], [X(0.66), yV - R * 0.15], [X(0.78), yV - R * 0.25], [X(0.88), yV - R * 0.3], [W + 40, yV - R * 0.31]]);
    const yI = x => isola(x) + ruvido(x + 300, 0.8 * k);
    p.beginPath(); p.moveTo(X(0.5), yV + 2); for (let x = X(0.5); x <= W + 40; x += 3) p.lineTo(x, yI(x)); p.lineTo(W + 40, yV + 2); p.closePath();
    g = p.createLinearGradient(0, yV - R * 0.3, 0, yV); g.addColorStop(0, "#d4bd8f"); g.addColorStop(1, "#a88f66"); p.fillStyle = g; p.fill();
    p.save(); p.clip();
    p.strokeStyle = "rgba(150,125,90,.55)"; p.lineWidth = 1.2; for (let i = 1; i < 8; i++) { p.beginPath(); for (let x = X(0.52); x <= W + 40; x += 6) { const y = yI(x) + (yV - yI(x)) * i / 8 + ruvido(x * 2 + i * 70, 0.5); x === X(0.52) ? p.moveTo(x, y) : p.lineTo(x, y); } p.stroke(); }
    for (let i = 0; i < 120; i++) { const x = sr(X(0.52), W), y = yI(x) + sr(1, yV - yI(x)); p.fillStyle = ["#8a9159", "#7a844e", "#9aa064"][i % 3]; p.beginPath(); p.ellipse(x, y, sr(2, 5) * k, sr(1.5, 3) * k, 0, 0, 7); p.fill(); }
    p.restore();
    p.fillStyle = "rgba(10,40,80,.25)"; p.fillRect(X(0.5), yV, W, 3 * k);
    /* case: dall'alto verso il basso, ognuna poggia sul terreno (il fondo arriva al punto più basso) */
    const case_ = [];
    for (let x = X(0.6); x < W + 20; x += sr(13, 20) * k) {
      const top = yI(x), fondo = yV - 3, liv = Math.max(1, Math.floor((fondo - top) / (14 * k)));
      for (let j = 0; j < liv; j++) if (sr() < (j === 0 ? 0.35 : 0.6)) { const w = sr(14, 22) * k, h = sr(10, 15) * k, yb = top + (fondo - top) * (j + sr(0.6, 1)) / liv; case_.push({ x: x + sr(-3, 3), yb, w, h }); }
    }
    case_.forEach(c => { c.yb = Math.max(c.yb, yI(c.x), yI(c.x + c.w)) + 1; });
    case_.sort((a, b) => a.yb - b.yb);
    case_.forEach((c, i) => { const { x, yb, w, h } = c, s = w * 0.28;
      p.fillStyle = "#c9ccd6"; p.beginPath(); p.moveTo(x + w, yb); p.lineTo(x + w + s, yb - s * 0.45); p.lineTo(x + w + s, yb - h - s * 0.45); p.lineTo(x + w, yb - h); p.closePath(); p.fill();
      p.fillStyle = "#e4e6ee"; p.beginPath(); p.moveTo(x, yb - h); p.lineTo(x + s, yb - h - s * 0.45); p.lineTo(x + w + s, yb - h - s * 0.45); p.lineTo(x + w, yb - h); p.closePath(); p.fill();
      p.fillStyle = "#fdfdf8"; p.fillRect(x, yb - h, w, h);
      p.fillStyle = "rgba(0,0,0,.08)"; p.fillRect(x, yb - h, w, 1);
      const blu = i % 3 ? "#2f63a8" : "#3b7bc4";
      p.fillStyle = blu; p.fillRect(x + w * 0.18, yb - h * 0.62, w * 0.18, h * 0.3); if (w > 16 * k) p.fillRect(x + w * 0.62, yb - h * 0.62, w * 0.18, h * 0.3);
      if (i % 2) { p.fillStyle = i % 4 === 1 ? "#2b5b9e" : "#9b4a2c"; p.fillRect(x + w * 0.42, yb - h * 0.5, w * 0.16, h * 0.5); }
      if (i % 7 === 3) { p.fillStyle = "#c4517e"; for (let f = 0; f < 6; f++) { p.beginPath(); p.arc(x + w * sr(0.1, 0.9), yb - h * sr(0.05, 0.4), 1.3 * k, 0, 7); p.fill(); } }
    });
    /* chiesa con la cupola blu e il campanile */
    const chx = X(0.74), chb = Math.max(yI(chx), yI(chx + 30 * k)) + R * 0.03, chw = 30 * k, chh = 20 * k;
    p.fillStyle = "#fdfdf8"; p.fillRect(chx, chb - chh, chw, chh); p.fillStyle = "#cfd2dc"; p.fillRect(chx + chw, chb - chh, chw * 0.25, chh);
    p.fillStyle = "#fdfdf8"; p.fillRect(chx + chw * 0.2, chb - chh - 5 * k, chw * 0.6, 5 * k);
    g = p.createRadialGradient(chx + chw * 0.42, chb - chh - 12 * k, 1, chx + chw / 2, chb - chh - 5 * k, chw * 0.4); g.addColorStop(0, "#6aa2e0"); g.addColorStop(1, "#1f4f99"); p.fillStyle = g;
    p.beginPath(); p.arc(chx + chw / 2, chb - chh - 5 * k, chw * 0.3, Math.PI, 0); p.fill();
    p.strokeStyle = "#e8d9a8"; p.lineWidth = 1.2; p.beginPath(); p.moveTo(chx + chw / 2, chb - chh - 5 * k - chw * 0.3); p.lineTo(chx + chw / 2, chb - chh - 5 * k - chw * 0.3 - 6 * k); p.moveTo(chx + chw / 2 - 2.5 * k, chb - chh - 5 * k - chw * 0.3 - 4 * k); p.lineTo(chx + chw / 2 + 2.5 * k, chb - chh - 5 * k - chw * 0.3 - 4 * k); p.stroke();
    p.fillStyle = "#2b5b9e"; p.beginPath(); p.arc(chx + chw / 2, chb - chh * 0.35, chw * 0.12, Math.PI, 0); p.fillRect(chx + chw / 2 - chw * 0.12, chb - chh * 0.35, chw * 0.24, chh * 0.35); p.fill();
    const ctx_ = chx - 9 * k; p.fillStyle = "#fdfdf8"; p.fillRect(ctx_, chb - chh - 16 * k, 9 * k, chh + 16 * k);
    p.beginPath(); p.arc(ctx_ + 4.5 * k, chb - chh - 16 * k, 4.5 * k, Math.PI, 0); p.fill(); p.fillStyle = "#3b4f6a"; p.beginPath(); p.arc(ctx_ + 4.5 * k, chb - chh - 9 * k, 2.4 * k, Math.PI, 0); p.fillRect(ctx_ + 2.1 * k, chb - chh - 9 * k, 4.8 * k, 4 * k); p.fill();
    /* torre del mulino a vento (le pale girano) */
    const mx = X(0.9), mb = yI(mx) + 3 * k, mw = 16 * k, mh = 30 * k;
    p.fillStyle = "#fbfaf3"; p.fillRect(mx - mw / 2, mb - mh, mw, mh); p.fillStyle = "#d9d9df"; p.fillRect(mx + mw * 0.15, mb - mh, mw * 0.35, mh);
    p.fillStyle = "#8a6a45"; p.beginPath(); p.moveTo(mx - mw * 0.6, mb - mh); p.quadraticCurveTo(mx, mb - mh - mw * 0.9, mx + mw * 0.6, mb - mh); p.fill();
    p.fillStyle = "#2f63a8"; p.fillRect(mx - mw * 0.12, mb - mh * 0.35, mw * 0.24, mh * 0.35);
    const mulino = { x: mx - mw * 0.1, y: mb - mh - mw * 0.25, r: 26 * k };

    /* ---------- PRIMO PIANO ---------- */
    const [primo, q] = tela(W, H);
    q.beginPath(); q.moveTo(-10, base + 10); for (let x = -10; x <= W + 10; x += 4) q.lineTo(x, yG(x)); q.lineTo(W + 10, base + 10); q.closePath();
    g = q.createLinearGradient(0, base - R * 0.17, 0, base); g.addColorStop(0, "#cdb47f"); g.addColorStop(0.35, "#bfa26c"); g.addColorStop(1, "#a88b5a"); q.fillStyle = g; q.fill();
    q.save(); q.clip();
    q.fillStyle = "rgba(110,90,60,.18)"; for (let i = 0; i < 260; i++) { q.beginPath(); q.arc(sr(0, W), sr(base - R * 0.17, base), sr(0.6, 1.8), 0, 7); q.fill(); }
    /* sentiero di lastre verso la meridiana */
    const mdx = X(0.5);
    for (let r = 0; r < 6; r++) { const y0 = yG(mdx) + 10 * k + r * (base - yG(mdx)) / 6, y1 = y0 + (base - yG(mdx)) / 6 - 2, w0 = (40 + r * 14) * k;
      for (let s = -1; s <= 1; s += 2) { q.fillStyle = r % 2 ? "#d8ccb2" : "#cfc1a3"; q.beginPath(); q.moveTo(mdx + s * 2, y0); q.lineTo(mdx + s * w0 * 0.5, y0); q.lineTo(mdx + s * (w0 + 8 * k) * 0.5, y1); q.lineTo(mdx + s * 2, y1); q.closePath(); q.fill(); } }
    q.restore();
    /* bordo erboso secco */
    for (let x = -10; x < W + 10; x += 2.2) { const y = yG(x) + 1, h = sr(4, 11) * k; q.strokeStyle = ["#9aa05c", "#b2a868", "#8a8f50", "#c3b276"][Math.floor(sr(0, 4))]; q.lineWidth = 1; q.beginPath(); q.moveTo(x, y + 2); q.quadraticCurveTo(x + sr(-2, 2), y - h * 0.6, x + sr(-4, 4), y - h); q.stroke(); }
    /* rocce */
    function roccia(x, y, r) { g = q.createRadialGradient(x - r * 0.35, y - r * 0.5, 1, x, y, r * 1.2); g.addColorStop(0, "#e2d8c4"); g.addColorStop(0.6, "#b8aa90"); g.addColorStop(1, "#8a7c63"); q.fillStyle = g;
      q.beginPath(); q.moveTo(x - r, y); q.bezierCurveTo(x - r, y - r * 0.8, x - r * 0.3, y - r * 0.95, x + r * 0.2, y - r * 0.85); q.bezierCurveTo(x + r * 0.9, y - r * 0.6, x + r * 1.1, y - r * 0.2, x + r, y); q.closePath(); q.fill();
      q.fillStyle = "rgba(60,45,30,.25)"; q.beginPath(); q.ellipse(x, y, r * 1.05, r * 0.18, 0, 0, 7); q.fill(); }
    [[0.18, 0.55, 14], [0.33, 0.4, 9], [0.68, 0.5, 12], [0.79, 0.35, 8], [0.41, 0.78, 7], [0.61, 0.82, 10]].forEach(([u, v, r]) => { const x = X(u); roccia(x, yG(x) + (base - yG(x)) * v, r * k); });
    /* fiori di campo */
    for (let i = 0; i < (piccolo ? 60 : 150); i++) { const x = sr(0, W); if (Math.abs(x - mdx) < 70 * k) continue; const y = sr(yG(x) + 4, base - 4), c = ["#d6332c", "#e8c22c", "#f5f1e8", "#9b6ac2"][i % 4];
      q.strokeStyle = "#7f8a4a"; q.lineWidth = 0.8; q.beginPath(); q.moveTo(x, y + 5 * k); q.lineTo(x, y); q.stroke(); q.fillStyle = c; q.beginPath(); q.arc(x, y, (i % 4 === 0 ? 2.4 : 1.6) * k, 0, 7); q.fill(); }

    /* ---------- ULIVI (tronco fermo, chioma che ondeggia, foglie argentate che luccicano) ---------- */
    function creaUlivo(h) {
      const cw = h * 1.7, ch = h * 1.15, ox = cw / 2, oy = ch - 4;
      const [tr, pt] = tela(cw, ch), [ve, pv] = tela(cw, ch), [ar, pa] = tela(cw, ch), punte = [];
      const cort = ["#6d5e4c", "#7c6b56", "#5b4d3e"];
      function ramo(x, y, ang, len, w, liv) {
        ang = Math.max(-Math.PI + 0.35, Math.min(-0.35, ang));
        const x2 = x + Math.cos(ang) * len, y2 = y + Math.sin(ang) * len, n = ang + Math.PI / 2, cx = (x + x2) / 2 + Math.cos(n) * len * sr(-0.22, 0.22), cy = (y + y2) / 2 + Math.sin(n) * len * sr(-0.22, 0.22), w2 = w * 0.6;
        const nx = Math.cos(n), ny = Math.sin(n);
        const gt = pt.createLinearGradient(x - nx * w, y - ny * w, x + nx * w, y + ny * w); gt.addColorStop(0, "#9c8b72"); gt.addColorStop(0.45, cort[liv % 3]); gt.addColorStop(1, "#3f342a"); pt.fillStyle = gt;
        pt.beginPath(); pt.moveTo(x + nx * w / 2, y + ny * w / 2); pt.quadraticCurveTo(cx + nx * (w + w2) / 4, cy + ny * (w + w2) / 4, x2 + nx * w2 / 2, y2 + ny * w2 / 2);
        pt.lineTo(x2 - nx * w2 / 2, y2 - ny * w2 / 2); pt.quadraticCurveTo(cx - nx * (w + w2) / 4, cy - ny * (w + w2) / 4, x - nx * w / 2, y - ny * w / 2); pt.closePath(); pt.fill();
        if (w > 4) { pt.strokeStyle = "rgba(40,30,22,.5)"; pt.lineWidth = Math.max(0.8, w * 0.08); for (let s = -1; s <= 1; s += 1) { pt.beginPath(); pt.moveTo(x + nx * w * 0.2 * s, y + ny * w * 0.2 * s); pt.quadraticCurveTo(cx + nx * w * 0.15 * s + sr(-2, 2), cy + ny * w * 0.15 * s, x2 + nx * w2 * 0.2 * s, y2 + ny * w2 * 0.2 * s); pt.stroke(); }
          pt.strokeStyle = "rgba(220,210,190,.35)"; pt.lineWidth = Math.max(0.6, w * 0.05); pt.beginPath(); pt.moveTo(x - nx * w * 0.32, y - ny * w * 0.32); pt.quadraticCurveTo(cx - nx * w * 0.25, cy - ny * w * 0.25, x2 - nx * w2 * 0.3, y2 - ny * w2 * 0.3); pt.stroke(); }
        if (liv >= 4 || len < h * 0.06) { punte.push([x2, y2, 1]); return; }
        if (liv >= 2) punte.push([x2, y2, 0.7]);
        const nf = liv === 0 ? 2 : sr() < 0.5 ? 2 : 3;
        for (let i = 0; i < nf; i++) ramo(x2, y2, ang + (i - (nf - 1) / 2) * 0.62 + sr(-0.25, 0.25), len * sr(0.62, 0.8), w2, liv + 1);
      }
      /* radici e due tronchi intrecciati, con un cavo scuro */
      g = pt.createRadialGradient(ox + h * 0.05, oy, 1, ox + h * 0.05, oy, h * 0.45); g.addColorStop(0, "rgba(70,55,30,.35)"); g.addColorStop(1, "rgba(70,55,30,0)"); pt.fillStyle = g; pt.beginPath(); pt.ellipse(ox + h * 0.05, oy, h * 0.45, h * 0.05, 0, 0, 7); pt.fill();
      ramo(ox - h * 0.035, oy, -Math.PI / 2 - 0.22, h * 0.34, h * 0.12, 0);
      ramo(ox + h * 0.035, oy, -Math.PI / 2 + 0.25, h * 0.3, h * 0.1, 0);
      pt.fillStyle = "#2e251d"; pt.beginPath(); pt.ellipse(ox - h * 0.01, oy - h * 0.14, h * 0.018, h * 0.045, 0.2, 0, 7); pt.fill();
      for (let i = 0; i < 5; i++) { pt.strokeStyle = "#5b4d3e"; pt.lineWidth = h * 0.018; pt.lineCap = "round"; pt.beginPath(); pt.moveTo(ox + (i - 2) * h * 0.02, oy - h * 0.03); pt.quadraticCurveTo(ox + (i - 2) * h * 0.05, oy - 1, ox + (i - 2) * h * 0.075, oy + 1); pt.stroke(); }
      /* chioma: masse scure, poi migliaia di foglioline strette (verdi sopra, argentate sotto) */
      punte.forEach(([x, y, f]) => { const r = h * sr(0.09, 0.13) * f + h * 0.03; for (let i = 0; i < 5; i++) { pv.fillStyle = i < 2 ? "#2f4229" : "#3a5032"; pv.beginPath(); pv.ellipse(x + sr(-r, r), y + sr(-r * 0.4, r * 0.3), r * sr(0.6, 0.9), r * sr(0.4, 0.6), 0, 0, 7); pv.fill(); } });
      punte.forEach(([x, y, f]) => { const r = h * sr(0.1, 0.14) * f + h * 0.03, nl = Math.round(110 * f);
        for (let i = 0; i < nl; i++) { const a = sr(0, 7), d = Math.sqrt(sr()), lx = x + Math.cos(a) * d * r * 1.35, ly = y + Math.sin(a) * d * r * 0.8, l = h * sr(0.022, 0.034), ang = sr(-0.9, 0.9) - 0.3;
          const alto_ = ly < y - r * 0.2 || lx < x - r * 0.4, arg = sr() < (alto_ ? 0.1 : 0.2);
          const c = arg ? (sr() < 0.5 ? "#b9c5a6" : "#9eae8c") : alto_ ? ["#6f8758", "#7d9463", "#8aa06c"][Math.floor(sr(0, 3))] : ["#3f5537", "#4b633f", "#566f48"][Math.floor(sr(0, 3))];
          const cc = arg ? pa : pv; cc.fillStyle = c; cc.beginPath(); cc.ellipse(lx, ly, l, l * 0.26, ang, 0, 7); cc.fill(); } });
      /* qualche oliva nera */
      for (let i = 0; i < 25; i++) { const [x, y] = punte[Math.floor(sr(0, punte.length))]; pv.fillStyle = "#2b2a33"; pv.beginPath(); pv.ellipse(x + sr(-h * 0.08, h * 0.08), y + sr(-h * 0.03, h * 0.06), h * 0.008, h * 0.011, 0, 0, 7); pv.fill(); }
      return { tr, ve, ar, cw, ch, ox, oy };
    }
    const hU = piccolo ? R * 0.27 : R * 0.4;
    const ulivi = (piccolo ? [0.12, 0.88] : [0.1, 0.9]).map((u, i) => { const x = X(u); return { x, y: yG(x) + (base - yG(x)) * 0.55, f: i * 2.1, m: creaUlivo(hU * (i ? 0.92 : 1)) }; });

    /* ---------- MERIDIANA ---------- */
    const md = { x: mdx, y: base - (piccolo ? 34 : 52) * k, rx: (piccolo ? 70 : 105) * k };
    md.ry = md.rx * 0.44;
    const LAT = 41 * Math.PI / 180, ROMANI = ["VI", "VII", "VIII", "IX", "X", "XI", "XII", "I", "II", "III", "IV", "V", "VI"];
    const angoloOra = h => Math.atan(Math.sin(LAT) * Math.tan((h - 12) * 15 * Math.PI / 180));
    const P = (a, f) => [md.x + Math.sin(a) * md.rx * f, md.y - Math.cos(a) * md.ry * f];
    function meridiana(ctx) {
      /* colonnina scanalata sul basamento */
      const cb = base - 4, pw = md.rx * 0.28;
      ctx.fillStyle = "#b5a483"; ctx.fillRect(md.x - md.rx * 0.45, cb - 9 * k, md.rx * 0.9, 9 * k); ctx.fillStyle = "#e7dcc3"; ctx.fillRect(md.x - md.rx * 0.45, cb - 9 * k, md.rx * 0.9, 3 * k);
      g = ctx.createLinearGradient(md.x - pw, 0, md.x + pw, 0); g.addColorStop(0, "#c2b391"); g.addColorStop(0.35, "#f6efdf"); g.addColorStop(1, "#ad9c79"); ctx.fillStyle = g;
      ctx.fillRect(md.x - pw / 2, md.y, pw, cb - 9 * k - md.y);
      ctx.strokeStyle = "rgba(140,120,90,.45)"; ctx.lineWidth = 0.8; for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(md.x + i * pw * 0.18, md.y + md.ry); ctx.lineTo(md.x + i * pw * 0.18, cb - 10 * k); ctx.stroke(); }
      /* spessore della lastra e quadrante */
      ctx.fillStyle = "#b9a985"; ctx.beginPath(); ctx.ellipse(md.x, md.y + 7 * k, md.rx * 1.03, md.ry * 1.05, 0, 0, 7); ctx.fill();
      ctx.fillRect(md.x - md.rx * 1.03, md.y, md.rx * 2.06, 7 * k);
      const gq = ctx.createRadialGradient(md.x - md.rx * 0.3, md.y - md.ry * 0.5, 4, md.x, md.y, md.rx); gq.addColorStop(0, "#fdfaf2"); gq.addColorStop(1, "#e0d4b8");
      ctx.fillStyle = gq; ctx.beginPath(); ctx.ellipse(md.x, md.y, md.rx, md.ry, 0, 0, 7); ctx.fill(); ctx.strokeStyle = "#a8956b"; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.beginPath(); ctx.ellipse(md.x, md.y, md.rx * 0.8, md.ry * 0.8, 0, 0, 7); ctx.stroke();
      ctx.strokeStyle = "rgba(120,100,60,.65)"; ctx.lineWidth = 1; ctx.fillStyle = "#6e5a36"; ctx.font = `${Math.round(10 * k)}px ${SERIF}`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      for (let h = 6; h <= 18; h++) { const a = angoloOra(h) + (h === 6 ? -1e-3 : h === 18 ? 1e-3 : 0), [x0, y0] = P(a, 0.12), [x1, y1] = P(a, 0.8), [xn, yn] = P(a, 0.9); ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.fillText(ROMANI[h - 6], xn, yn); }
      const a = angoloOra(ora()), [sx, sy] = P(a, 0.78);
      ctx.fillStyle = "rgba(50,35,15,.55)"; ctx.beginPath(); ctx.moveTo(md.x - 3, md.y); ctx.lineTo(sx, sy); ctx.lineTo(md.x + 3, md.y); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#9a6b2a"; ctx.strokeStyle = "#6b4a1a"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(md.x - 1.5, md.y + 1); ctx.lineTo(md.x - 1.5, md.y - md.ry * 0.9); ctx.lineTo(md.x + 1.5, md.y - md.ry * 0.9); ctx.lineTo(md.x + 1.5, md.y + 1); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle = "#7d6a46"; ctx.font = `bold ${Math.round(11 * k)}px ${SERIF}`; ctx.fillText("T E M P U S   F U G I T", md.x, md.y + md.ry * 0.55);
      ctx.textBaseline = "alphabetic";
    }

    /* ---------- ELEMENTI MOBILI ---------- */
    const nuvole = Array.from({ length: piccolo ? 3 : 5 }, () => ({ x: rnd(0, W), y: rnd(alto + 40, piano - 40), s: rnd(0.6, 1.05), v: rnd(4, 9) }));
    const gabbiani = Array.from({ length: piccolo ? 3 : 5 }, (_, i) => ({ x: rnd(0, W), y: alto + 50 + i * 26, v: rnd(18, 34), f: rnd(0, 6), d: i % 2 ? 1 : -1 }));
    const barche = [{ x: rnd(0, W), y: orizz + S * 0.3, s: 0.5 * k, v: 6, vela: true }, { x: rnd(0, W), y: orizz + S * 0.74, s: 0.95 * k, v: 11, vela: false }];
    function barca(ctx, b, t) {
      const { x, s } = b, y = b.y + Math.sin(t * 1.3 + x) * 1.2 * s;
      ctx.fillStyle = "rgba(255,255,255,.45)"; ctx.beginPath(); ctx.moveTo(x - 30 * s, y + 6 * s); ctx.lineTo(x - 90 * s, y + 9 * s); ctx.lineTo(x - 90 * s, y + 7 * s); ctx.closePath(); ctx.fill();
      if (b.vela) {
        ctx.fillStyle = "#fbfbf6"; ctx.beginPath(); ctx.moveTo(x - 32 * s, y); ctx.lineTo(x + 34 * s, y); ctx.lineTo(x + 24 * s, y + 9 * s); ctx.lineTo(x - 26 * s, y + 9 * s); ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#1f4f99"; ctx.fillRect(x - 30 * s, y + 2 * s, 62 * s, 2 * s);
        ctx.strokeStyle = "#555"; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 62 * s); ctx.stroke();
        ctx.fillStyle = "#fffdf5"; ctx.beginPath(); ctx.moveTo(x + 2 * s, y - 60 * s); ctx.quadraticCurveTo(x + 30 * s, y - 30 * s, x + 30 * s, y - 4 * s); ctx.lineTo(x + 2 * s, y - 4 * s); ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#eae4d4"; ctx.beginPath(); ctx.moveTo(x - 2 * s, y - 56 * s); ctx.quadraticCurveTo(x - 20 * s, y - 28 * s, x - 24 * s, y - 4 * s); ctx.lineTo(x - 2 * s, y - 4 * s); ctx.closePath(); ctx.fill();
      } else {
        /* caicco da pesca in legno, scafo bianco e azzurro con la cabina */
        ctx.fillStyle = "#f4f1e8"; ctx.beginPath(); ctx.moveTo(x - 34 * s, y - 6 * s); ctx.quadraticCurveTo(x - 30 * s, y + 9 * s, x - 18 * s, y + 10 * s); ctx.lineTo(x + 26 * s, y + 10 * s); ctx.quadraticCurveTo(x + 36 * s, y + 4 * s, x + 40 * s, y - 9 * s); ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#2a8ac6"; ctx.fillRect(x - 31 * s, y - 2 * s, 68 * s, 3 * s); ctx.fillStyle = "#c2412d"; ctx.fillRect(x - 24 * s, y + 6 * s, 52 * s, 3 * s);
        ctx.fillStyle = "#e9e2cf"; ctx.fillRect(x - 6 * s, y - 20 * s, 18 * s, 14 * s); ctx.fillStyle = "#2a5d9a"; ctx.fillRect(x - 3 * s, y - 16 * s, 5 * s, 5 * s); ctx.fillRect(x + 5 * s, y - 16 * s, 5 * s, 5 * s);
        ctx.fillStyle = "#8a5a32"; ctx.fillRect(x - 7 * s, y - 22 * s, 20 * s, 2.5 * s);
        ctx.strokeStyle = "#6b4a2a"; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x + 22 * s, y - 6 * s); ctx.lineTo(x + 22 * s, y - 30 * s); ctx.stroke();
      }
    }
    return {
      alto,
      disegna(ctx, t, dt) {
        ctx.drawImage(cielo, 0, 0, W, H);
        /* sole all'ora reale e luce calda all'alba e al tramonto */
        const fr = (ora() - 6) / 12, sx = X(0.06 + 0.88 * fr), sy = orizz - 24 - Math.sin(Math.PI * fr) * (orizz - alto - 90);
        const calda = Math.pow(1 - Math.sin(Math.PI * fr), 2) * 0.45;
        if (calda > 0.01) { const gw = ctx.createLinearGradient(0, alto, 0, orizz); gw.addColorStop(0, "rgba(255,170,90,0)"); gw.addColorStop(1, `rgba(255,170,90,${calda})`); ctx.fillStyle = gw; ctx.fillRect(0, alto, W, orizz - alto); }
        const gs = ctx.createRadialGradient(sx, sy, 10, sx, sy, 130); gs.addColorStop(0, "rgba(255,252,230,1)"); gs.addColorStop(0.18, "rgba(255,236,160,.85)"); gs.addColorStop(1, "rgba(255,225,130,0)"); ctx.fillStyle = gs; ctx.beginPath(); ctx.arc(sx, sy, 130, 0, 7); ctx.fill();
        ctx.fillStyle = "#fff8dc"; ctx.beginPath(); ctx.arc(sx, sy, 22, 0, 7); ctx.fill();
        /* nuvole con il sotto in ombra (non si sovrappongono mai) */
        muoviNuvole(nuvole, dt, W, alto + 40, piano - 40, 56, 30);
        const sbuffi = [[0, 0, 26], [-30, 8, 20], [30, 8, 22], [10, -14, 20], [-14, -8, 17], [-46, 12, 13], [46, 12, 14]];
        ctx.fillStyle = "#dfe7f1"; ctx.beginPath(); nuvole.forEach(n => sbuffi.forEach(([dx, dy, r]) => { ctx.moveTo(n.x + dx * n.s + r * n.s, n.y + dy * n.s); ctx.arc(n.x + dx * n.s, n.y + dy * n.s, r * n.s, 0, 7); })); ctx.fill();
        ctx.fillStyle = "#ffffff"; ctx.beginPath(); nuvole.forEach(n => sbuffi.forEach(([dx, dy, r]) => { ctx.moveTo(n.x + dx * n.s + r * 0.85 * n.s, n.y + (dy - 4) * n.s); ctx.arc(n.x + dx * n.s, n.y + (dy - 4) * n.s, r * 0.85 * n.s, 0, 7); })); ctx.fill();
        ctx.drawImage(terra, 0, 0, W, H);
        /* riflesso del sole e luccichii che si muovono */
        const fondo = base - R * 0.16;
        for (let i = 0; i < 26; i++) { const u = i / 26, y = orizz + 3 + u * (fondo - orizz), w = (10 + u * 60) * (0.5 + 0.5 * Math.sin(t * 1.6 + i * 2.1)); ctx.fillStyle = `rgba(255,248,215,${0.55 - u * 0.35})`; ctx.fillRect(sx - w / 2 + Math.sin(t * 0.7 + i * 1.7) * 8 * u, y, w, 1 + u * 1.5); }
        ctx.fillStyle = "rgba(255,255,255,.7)"; for (let i = 0; i < 60; i++) { const u = ((i * 61) % 100) / 100, x = (i * 137 + t * (4 + u * 10)) % (W + 20) - 10, y = orizz + 6 + Math.pow(u, 1.3) * (fondo - orizz - 10); if (Math.sin(t * 2.2 + i * 1.3) > 0.75) ctx.fillRect(x, y, (2 + u * 8) * k, 1 + u); }
        /* mulino: le pale girano */
        const m = mulino; ctx.save(); ctx.translate(m.x, m.y); ctx.rotate(t * 0.6);
        for (let i = 0; i < 8; i++) { ctx.rotate(Math.PI / 4); ctx.strokeStyle = "#6b4a2a"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(m.r, 0); ctx.stroke(); ctx.fillStyle = "rgba(250,248,240,.95)"; ctx.beginPath(); ctx.moveTo(m.r * 0.25, 0); ctx.lineTo(m.r, 0); ctx.lineTo(m.r * 0.85, m.r * 0.22); ctx.lineTo(m.r * 0.3, m.r * 0.1); ctx.closePath(); ctx.fill(); }
        ctx.restore(); ctx.fillStyle = "#4a3a2a"; ctx.beginPath(); ctx.arc(m.x, m.y, 2.5 * k, 0, 7); ctx.fill();
        /* barche su due corsie diverse */
        barche.forEach(b => { b.x += b.v * dt; if (b.x > W + 120) b.x = -120; barca(ctx, b, t); });
        /* gabbiani, ognuno sulla sua quota */
        gabbiani.forEach(g => { g.x += g.d * g.v * dt; if (g.x > W + 30) g.x = -30; if (g.x < -30) g.x = W + 30; const ali = Math.sin(t * 5 + g.f) * 5 * k, y = g.y + Math.sin(t * 0.8 + g.f) * 6;
          ctx.strokeStyle = "rgba(60,70,90,.85)"; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(g.x - 11 * k, y - ali); ctx.quadraticCurveTo(g.x - 5 * k, y - 6 * k, g.x, y); ctx.quadraticCurveTo(g.x + 5 * k, y - 6 * k, g.x + 11 * k, y - ali); ctx.stroke(); });
        /* schiuma sulla riva */
        ctx.strokeStyle = "rgba(255,255,255,.75)"; ctx.lineWidth = 2; ctx.beginPath(); for (let x = -10; x <= W + 10; x += 6) { const y = yG(x) - 2 - (1 + Math.sin(t * 1.1 + x / 60)) * 2.5; x === -10 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke();
        ctx.drawImage(primo, 0, 0, W, H);
        /* ulivi */
        ulivi.forEach(u => { const { m } = u, x0 = u.x - m.ox, y0 = u.y - m.oy, s = Math.sin(t * 0.9 + u.f);
          ctx.drawImage(m.tr, x0, y0, m.cw, m.ch); ctx.drawImage(m.ve, x0 + s * 1.3, y0, m.cw, m.ch);
          ctx.globalAlpha = 0.8 + 0.2 * Math.sin(t * 2.1 + u.f); ctx.drawImage(m.ar, x0 + s * 2.2, y0 + Math.sin(t * 1.7 + u.f) * 0.6, m.cw, m.ch); ctx.globalAlpha = 1; });
        meridiana(ctx);
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
    /* tutti i cerchi di uno strato in un solo tracciato: dove si toccano il colore resta uniforme */
    function disegnaCerchi(ctx, s, lista, k, extra) { ctx.beginPath(); lista.forEach(([dx, dy, r]) => { const rr = Math.max(0.1, r * k + extra); ctx.moveTo(s.x + dx * k + rr, s.y + dy * k); ctx.arc(s.x + dx * k, s.y + dy * k, rr, 0, 7); }); ctx.fill(); }
    /* uno schizzo pieno (opaco): copre quelli caduti prima */
    function disegnaSchizzo(ctx, s, e, kk) {
      if (notte) { const R = s.r * 3.4 * e, gl = ctx.createRadialGradient(s.x, s.y, s.r * 0.5, s.x, s.y, R); gl.addColorStop(0, rgba(s.c, 0.45)); gl.addColorStop(1, rgba(s.c, 0)); ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(s.x, s.y, R, 0, 7); ctx.fill(); ctx.fillStyle = s.c; disegnaCerchi(ctx, s, s.cerchi, e, 2.5); }
      ctx.fillStyle = notte ? schiarisci(s.c, 0.45) : scurisci(s.c, 0.35); disegnaCerchi(ctx, s, s.cerchi, e, notte ? 0 : 2.5); disegnaCerchi(ctx, s, s.gocc, Math.min(1, kk * 1.2), 2);
      ctx.fillStyle = s.c; disegnaCerchi(ctx, s, s.cerchi, e, notte ? -3 : 0); disegnaCerchi(ctx, s, s.gocc, Math.min(1, kk * 1.2), 0);
      ctx.fillStyle = "rgba(255,255,255,.55)"; ctx.beginPath(); ctx.ellipse(s.x - s.r * 0.35 * e, s.y - s.r * 0.4 * e, s.r * 0.32 * e, s.r * 0.15 * e, -0.6, 0, 7); ctx.fill();
      ctx.beginPath(); ctx.arc(s.x + s.r * 0.1 * e, s.y - s.r * 0.62 * e, s.r * 0.07 * e, 0, 7); ctx.fill();
    }
    /* mentre svanisce, lo schizzo si disegna prima su un foglio a parte e poi si sfuma tutto insieme */
    const DPR = Math.min(2, window.devicePixelRatio || 1), foglio = document.createElement("canvas"), fc = foglio.getContext("2d");
    function sfumaSchizzo(ctx, s, e, kk, a) {
      const B = Math.ceil(s.r * 8.6 + 24); if (foglio.width < B * DPR || foglio.height < B * DPR) { foglio.width = foglio.height = Math.ceil(B * DPR); }
      fc.setTransform(1, 0, 0, 1, 0, 0); fc.clearRect(0, 0, B * DPR, B * DPR); fc.setTransform(DPR, 0, 0, DPR, B / 2 - s.x, B / 2 - s.y);
      disegnaSchizzo(fc, s, e, kk);
      ctx.save(); ctx.globalAlpha = a; ctx.drawImage(foglio, 0, 0, B * DPR, B * DPR, s.x - B / 2, s.y - B / 2, B, B); ctx.restore();
    }
    let prossimaM = 1, prossimaG = 0.3;
    return {
      scura: !!notte,
      disegna(ctx, t, dt) {
        if (notte) { ctx.fillStyle = "#07070f"; ctx.fillRect(0, 0, W, H); ctx.globalCompositeOperation = "lighter"; }
        prossimaM -= dt; if (prossimaM <= 0 && macchie.length < 10) { prossimaM = rnd(1, 2); nuovaMacchia(); }
        for (let i = macchie.length - 1; i >= 0; i--) { macchie[i].vita += dt; if (macchie[i].vita >= macchie[i].durata) macchie.splice(i, 1); }
        for (const m of macchie) {
          const k = m.vita / m.durata, cr = 1 - Math.pow(1 - Math.min(1, k * 2.5), 3), a = k < 0.65 ? 1 : 1 - (k - 0.65) / 0.35;
          m.strati.forEach((s, j) => { const r = m.R * cr * (0.65 + j * 0.1); ctx.fillStyle = rgba(m.c, (notte ? 0.06 : 0.08) * a); curvaChiusa(ctx, s.map((q, n) => { const an = m.rot + n / s.length * Math.PI * 2; return [m.x + Math.cos(an) * r * q, m.y + Math.sin(an) * r * q]; })); ctx.fill(); });
        }
        if (notte) ctx.globalCompositeOperation = "source-over";
        prossimaG -= dt; if (prossimaG <= 0) { prossimaG = rnd(0.4, 0.9); gocce.push({ x: rnd(0.04, 0.96) * W, y: -20, fine: rnd(0.15, 0.92) * H, v: 0, c: scegli(TINTE) }); }
        /* prima si aggiornano le gocce in caduta (quelle che arrivano diventano schizzi) */
        for (let i = gocce.length - 1; i >= 0; i--) { const g = gocce[i]; g.v += 1000 * dt; g.y += g.v * dt; if (g.y >= g.fine) { gocce.splice(i, 1); nuovoSchizzo(g.x, g.fine, g.c); } }
        for (let i = schizzi.length - 1; i >= 0; i--) { schizzi[i].vita += dt; if (schizzi[i].vita > 12) schizzi.splice(i, 1); }
        /* schizzi dal più vecchio al più nuovo: l'ultimo arrivato sta sopra */
        for (const s of schizzi) {
          const kk = Math.min(1, s.vita * 4), e = kk < 1 ? 1 + 0.18 * Math.sin(kk * Math.PI) - (1 - kk) : 1;
          if (s.vita < 9) disegnaSchizzo(ctx, s, e, kk); else sfumaSchizzo(ctx, s, e, kk, 1 - (s.vita - 9) / 3);
        }
        /* le gocce che stanno cadendo passano sopra a tutto */
        for (const g of gocce) {
          if (notte) { const gl = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, 18); gl.addColorStop(0, rgba(g.c, 0.6)); gl.addColorStop(1, rgba(g.c, 0)); ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(g.x, g.y, 18, 0, 7); ctx.fill(); }
          ctx.fillStyle = g.c; ctx.beginPath(); ctx.moveTo(g.x, g.y - 14); ctx.quadraticCurveTo(g.x + 7, g.y, g.x, g.y + 7); ctx.quadraticCurveTo(g.x - 7, g.y, g.x, g.y - 14); ctx.fill();
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
      /* scia attaccata alla poppa: acqua bianca rimescolata + due onde che si allargano a V; onda di prua */
      const [poppa, prua] = { portacontainer: [-232, 166], veliero: [-64, 76], rimorchiatore: [-56, 58], traghetto: [-146, 126] }[n.tipo];
      const xs = n.x + poppa * n.s, xp = n.x + prua * n.s, Lw = 300 * n.s + 60, ap = 4 + 14 * n.s;
      ctx.fillStyle = "rgba(20,60,110,.25)"; ctx.beginPath(); ctx.ellipse((xs + xp) / 2, y + 6 * n.s + 2, (xp - xs) / 2, 3 + 4 * n.s, 0, 0, 7); ctx.fill();
      for (let k = 0; k < 14; k++) { const f = k / 14, x = xs - f * Lw * 0.55, r = (3 + 10 * n.s) * (0.6 + f * 1.2), a = 0.55 * (1 - f);
        ctx.fillStyle = `rgba(255,255,255,${a})`; ctx.beginPath(); ctx.ellipse(x + Math.sin(t * 3 + k) * 2, y + 4 * n.s + Math.sin(t * 2.3 + k * 1.7) * 1, r * 1.6, r * 0.45, 0, 0, 7); ctx.fill(); }
      ["-", "+"].forEach(sg => { const d = sg === "-" ? -1 : 1, gw = ctx.createLinearGradient(xs, 0, xs - Lw, 0); gw.addColorStop(0, "rgba(255,255,255,.7)"); gw.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = gw; ctx.lineWidth = 1.2 + n.s * 1.2; ctx.beginPath(); ctx.moveTo(xs, y + 5 * n.s);
        for (let k = 1; k <= 20; k++) { const f = k / 20; ctx.lineTo(xs - f * Lw, y + 5 * n.s + d * f * ap + Math.sin(f * 14 - t * 3) * 1.2); } ctx.stroke(); });
      ctx.fillStyle = "rgba(255,255,255,.85)"; ctx.beginPath(); ctx.moveTo(xp + 2 * n.s, y + 1); ctx.quadraticCurveTo(xp + 14 * n.s + Math.sin(t * 4) * 2, y + 6 * n.s, xp - 30 * n.s, y + 9 * n.s); ctx.quadraticCurveTo(xp - 6 * n.s, y + 4 * n.s, xp + 2 * n.s, y + 1); ctx.fill();
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
    const orizz = H * (W < 600 ? 0.74 : 0.72);
    const mare = (() => {
      const D = Math.min(2, window.devicePixelRatio || 1), tela = () => { const c = document.createElement("canvas"); c.width = Math.ceil(W * D); c.height = Math.ceil(H * D); const x = c.getContext("2d"); x.scale(D, D); return [c, x]; };
      const [c, p] = tela(), [onde, o] = tela();
      /* costa lontana con un faro */
      p.fillStyle = "rgba(110,140,170,.55)"; p.beginPath(); p.moveTo(-10, orizz + 1); for (let x = -10; x <= W * 0.42; x += 6) { const f = x / (W * 0.42); p.lineTo(x, orizz - Math.sin(Math.PI * Math.min(1, f * 1.1)) * 26 - Math.sin(x / 17) * 2); } p.lineTo(W * 0.42, orizz + 1); p.closePath(); p.fill();
      const fx = W * 0.12, fy = orizz - 20; p.fillStyle = "#f1f1ee"; p.beginPath(); p.moveTo(fx - 5, fy); p.lineTo(fx - 3, fy - 34); p.lineTo(fx + 3, fy - 34); p.lineTo(fx + 5, fy); p.fill();
      p.fillStyle = "#c9443c"; p.fillRect(fx - 4.4, fy - 14, 8.8, 6); p.fillRect(fx - 3.6, fy - 28, 7.2, 5); p.fillStyle = "#2b3440"; p.fillRect(fx - 4, fy - 40, 8, 6); p.beginPath(); p.moveTo(fx - 5, fy - 40); p.lineTo(fx, fy - 45); p.lineTo(fx + 5, fy - 40); p.fill();
      p.fillStyle = "rgba(130,155,180,.45)"; p.beginPath(); p.moveTo(W * 0.62, orizz + 1); for (let x = W * 0.62; x <= W + 10; x += 6) p.lineTo(x, orizz - Math.sin(Math.PI * (x - W * 0.62) / (W * 0.4)) * 14); p.lineTo(W + 10, orizz + 1); p.fill();
      const g = p.createLinearGradient(0, orizz, 0, H); g.addColorStop(0, "#8cc4e4"); g.addColorStop(0.08, "#4d9ad0"); g.addColorStop(0.5, "#2f7fc0"); g.addColorStop(1, "#1d5d99"); p.fillStyle = g; p.fillRect(0, orizz, W, H - orizz);
      p.strokeStyle = "rgba(255,255,255,.7)"; p.lineWidth = 1; p.beginPath(); p.moveTo(0, orizz + 0.5); p.lineTo(W, orizz + 0.5); p.stroke();
      for (let i = 0; i < W * (H - orizz) / 160; i++) { const v = Math.pow(Math.random(), 1.4), y = orizz + 3 + v * (H - orizz - 3), l = 4 + v * 40, x = rnd(-20, W);
        o.strokeStyle = Math.random() < 0.45 ? `rgba(255,255,255,${0.1 + v * 0.14})` : `rgba(10,45,95,${0.1 + v * 0.14})`; o.lineWidth = 0.6 + v * 1.4;
        o.beginPath(); o.moveTo(x, y); o.quadraticCurveTo(x + l / 2, y - 1 - v * 3, x + l, y); o.stroke(); }
      return { c, onde };
    })();
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
        /* mare: costa lontana con il faro, tessitura d'onde fissa che scorre piano, navi su corsie a distanze diverse */
        ctx.drawImage(mare.c, 0, 0, W, H);
        const dx = (t * 6) % W; ctx.save(); ctx.beginPath(); ctx.rect(0, orizz, W, H - orizz); ctx.clip(); ctx.drawImage(mare.onde, -dx, 0, W, H); ctx.drawImage(mare.onde, W - dx, 0, W, H); ctx.restore();
        /* riflessi che si accendono e spengono piano */
        for (let k = 0; k < 30; k++) { const v = ((k * 53) % 100) / 100, y = orizz + 8 + Math.pow(v, 1.4) * (H - orizz - 14), x = ((k * 211) % W + t * (3 + v * 6)) % W, a = Math.max(0, Math.sin(t * 0.9 + k * 2.1)) * 0.5, l = 6 + v * 26;
          ctx.strokeStyle = `rgba(255,255,255,${a})`; ctx.lineWidth = 1 + v; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + l / 2, y - 1.5 - v * 2, x + l, y); ctx.stroke(); }
        navi.sort((a, b) => a.corsia - b.corsia).forEach(n => { const yy = orizz + (H - orizz) * [0.2, 0.42, 0.64, 0.86][n.corsia]; nave(ctx, n, yy + Math.sin(t * 1.2 + n.f) * (1 + n.corsia * 0.6), t, dt); });
        gabbiani.forEach(g => { g.x += g.v * dt; if (g.x > W + 30) { g.x = -30; g.y = rnd(0.55, 0.75) * H; } const ali = Math.sin(t * 6 + g.f) * 5;
          ctx.strokeStyle = rgba(C, 0.45); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(g.x - 10, g.y - ali); ctx.quadraticCurveTo(g.x - 5, g.y - 5, g.x, g.y); ctx.quadraticCurveTo(g.x + 5, g.y - 5, g.x + 10, g.y - ali); ctx.stroke(); });
      }
    };
  }

  /* CONDUZIONE DEL MEZZO NAVALE (B): notte sul mare con il faro su un promontorio.
     Faro a strisce con lanterna a vetri, lente che ruota e lampeggia, galleria con ringhiera; casa del guardiano con le finestre accese
     e il fumo dal camino; onde che si infrangono sugli scogli; navi lontane con i fanali di via (bianco, rosso, verde), un peschereccio
     con la lampara, una boa che lampeggia; luna con il riflesso sul mare e nuvole che non si sovrappongono. */
  function navaleFaro(W, H) {
    const D = Math.min(2, window.devicePixelRatio || 1);
    const tela = () => { const c = document.createElement("canvas"); c.width = Math.ceil(W * D); c.height = Math.ceil(H * D); const x = c.getContext("2d"); x.scale(D, D); return [c, x]; };
    const piccolo = W < 600, k = piccolo ? 0.62 : Math.min(1.15, Math.max(0.8, W / 1280)), orizz = H * (piccolo ? 0.72 : 0.74);
    const fx = W * (piccolo ? 0.72 : 0.79), fh = Math.min(H * 0.4, 330 * k);
    const mx = piccolo ? W * 0.2 : W * 0.1, my = piccolo ? H * 0.3 : H * 0.22;

    /* ---------- cielo ---------- */
    const [cielo, c] = tela();
    let g = c.createLinearGradient(0, 0, 0, orizz); g.addColorStop(0, "#050b1e"); g.addColorStop(0.6, "#0f1d42"); g.addColorStop(1, "#253a6b"); c.fillStyle = g; c.fillRect(0, 0, W, orizz + 2);
    /* via lattea appena accennata */
    c.save(); c.translate(W * 0.45, H * 0.1); c.rotate(0.35); for (let i = 0; i < 900; i++) { const x = rnd(-W * 0.7, W * 0.7), y = (Math.random() + Math.random() + Math.random() - 1.5) * 50; c.fillStyle = `rgba(210,220,255,${rnd(0.05, 0.35)})`; c.fillRect(x, y, 1, 1); }
    const gv = c.createLinearGradient(0, -70, 0, 70); gv.addColorStop(0, "rgba(150,170,230,0)"); gv.addColorStop(0.5, "rgba(150,170,230,.07)"); gv.addColorStop(1, "rgba(150,170,230,0)"); c.fillStyle = gv; c.fillRect(-W, -70, 2 * W, 140); c.restore();
    for (let i = 0; i < W * orizz / 2600; i++) { c.fillStyle = `rgba(255,255,240,${rnd(0.2, 0.8)})`; c.beginPath(); c.arc(rnd(0, W), rnd(0, orizz - 20), rnd(0.3, 1.1), 0, 7); c.fill(); }
    /* bagliore all'orizzonte e costa lontana con le luci di un paese */
    g = c.createLinearGradient(0, orizz - 60, 0, orizz); g.addColorStop(0, "rgba(90,120,180,0)"); g.addColorStop(1, "rgba(90,120,180,.25)"); c.fillStyle = g; c.fillRect(0, orizz - 60, W, 60);
    c.fillStyle = "#101a36"; c.beginPath(); c.moveTo(-10, orizz + 1); for (let x = -10; x <= W * 0.5; x += 5) c.lineTo(x, orizz - 10 - Math.sin(x / 60) * 6 - Math.sin(x / 23) * 2 - (x < W * 0.25 ? Math.sin(Math.PI * x / (W * 0.25)) * 14 : 0)); c.lineTo(W * 0.5, orizz + 1); c.fill();
    for (let i = 0; i < 40; i++) { const x = rnd(W * 0.05, W * 0.45); c.fillStyle = Math.random() < 0.8 ? "rgba(255,210,130,.85)" : "rgba(255,255,230,.9)"; c.fillRect(x, orizz - rnd(3, 12), 1.5, 1.5); }

    /* ---------- mare (fisso) e tessitura delle onde ---------- */
    const [mare, q] = tela(), [onde, o] = tela();
    g = q.createLinearGradient(0, orizz, 0, H); g.addColorStop(0, "#1a2c55"); g.addColorStop(0.4, "#0e1b3a"); g.addColorStop(1, "#070f24"); q.fillStyle = g; q.fillRect(0, orizz, W, H - orizz);
    q.strokeStyle = "rgba(160,190,240,.35)"; q.lineWidth = 1; q.beginPath(); q.moveTo(0, orizz + 0.5); q.lineTo(W, orizz + 0.5); q.stroke();
    for (let i = 0; i < W * (H - orizz) / 150; i++) { const v = Math.pow(Math.random(), 1.4), y = orizz + 3 + v * (H - orizz), l = 4 + v * 44, x = rnd(-20, W);
      o.strokeStyle = Math.random() < 0.4 ? `rgba(120,160,230,${0.08 + v * 0.14})` : `rgba(0,5,20,${0.2 + v * 0.2})`; o.lineWidth = 0.6 + v * 1.5; o.beginPath(); o.moveTo(x, y); o.quadraticCurveTo(x + l / 2, y - 1 - v * 3, x + l, y); o.stroke(); }

    /* ---------- promontorio, casa del guardiano e faro (fissi) ---------- */
    const [terra, p] = tela();
    const cima = orizz - 46 * k, x0 = fx - 230 * k;
    const prof = x => x < x0 ? orizz + 20 : x < fx - 120 * k ? cima + (1 - Math.sin(Math.PI / 2 * (x - x0) / (110 * k))) * (orizz + 20 - cima) * 0.9 + Math.sin(x / 9) * 3 : cima + Math.sin(x / 13) * 2 + (x > fx + 150 * k ? (x - fx - 150 * k) * 0.25 : 0);
    p.beginPath(); p.moveTo(x0 - 20, orizz + 22); for (let x = x0 - 20; x <= W + 10; x += 3) p.lineTo(x, Math.min(orizz + 22, prof(x))); p.lineTo(W + 10, orizz + 22); p.closePath();
    g = p.createLinearGradient(0, cima, 0, orizz + 60); g.addColorStop(0, "#1d2440"); g.addColorStop(1, "#090d1e"); p.fillStyle = g; p.fill();
    p.save(); p.clip();
    /* stratificazioni della roccia e ciuffi d'erba sul pianoro */
    for (let i = 0; i < 14; i++) { const y0 = cima + 8 + i * (orizz + 20 - cima) / 14; p.strokeStyle = `rgba(${i % 2 ? "120,140,200" : "0,0,10"},${0.12 + (i % 3) * 0.04})`; p.lineWidth = 1 + (i % 2); p.beginPath(); for (let x = x0 - 20; x <= W + 10; x += 8) { const y = y0 + Math.sin(x / 41 + i) * 3 + Math.sin(x / 13 + i * 2) * 1.2; x === x0 - 20 ? p.moveTo(x, y) : p.lineTo(x, y); } p.stroke(); }
    for (let i = 0; i < 26; i++) { const x = rnd(x0 + 20 * k, W), y = rnd(prof(x) + 12, orizz + 16); p.strokeStyle = "rgba(0,0,10,.35)"; p.lineWidth = 1; p.beginPath(); p.moveTo(x, y); p.lineTo(x + rnd(-3, 3), y + rnd(6, 14) * k); p.stroke(); }
    /* bordo illuminato dalla luna */
    p.restore(); for (let x = fx - 120 * k; x <= W; x += 3) { p.strokeStyle = "rgba(90,110,70,.55)"; p.lineWidth = 1; p.beginPath(); p.moveTo(x, prof(x) + 1); p.lineTo(x + rnd(-2, 2), prof(x) - rnd(2, 6) * k); p.stroke(); }
    p.strokeStyle = "rgba(170,190,240,.35)"; p.lineWidth = 1.2; p.beginPath(); for (let x = x0; x <= W; x += 3) x === x0 ? p.moveTo(x, Math.min(orizz + 22, prof(x))) : p.lineTo(x, Math.min(orizz + 22, prof(x))); p.stroke();
    /* scogli in acqua ai piedi del promontorio */
    const scogli = [[x0 - 30 * k, 16], [x0 + 10 * k, 22], [x0 + 60 * k, 12], [fx - 40 * k, 0]].filter(([x]) => x > 0);
    scogli.forEach(([x, r]) => { if (!r) return; r *= k; p.fillStyle = "#0b1024"; p.beginPath(); p.moveTo(x - r * 1.4, orizz + 18); p.quadraticCurveTo(x - r, orizz + 18 - r * 1.3, x, orizz + 18 - r); p.quadraticCurveTo(x + r, orizz + 18 - r * 1.2, x + r * 1.5, orizz + 18); p.fill();
      p.strokeStyle = "rgba(170,190,240,.3)"; p.beginPath(); p.moveTo(x - r, orizz + 18 - r * 0.8); p.quadraticCurveTo(x - r * 0.4, orizz + 18 - r * 1.2, x + r * 0.2, orizz + 18 - r); p.stroke(); });
    /* recinto e sentiero */
    p.strokeStyle = "rgba(200,190,170,.35)"; p.lineWidth = 1; for (let x = fx - 110 * k; x < fx + 150 * k; x += 12 * k) { p.beginPath(); p.moveTo(x, prof(x)); p.lineTo(x, prof(x) - 8 * k); p.stroke(); }
    p.beginPath(); p.moveTo(fx - 110 * k, prof(fx - 110 * k) - 6 * k); for (let x = fx - 110 * k; x < fx + 150 * k; x += 6) p.lineTo(x, prof(x) - 6 * k); p.stroke();
    /* casa del guardiano */
    const hx = fx + 40 * k, hw = 90 * k, hh = 42 * k, hy = cima;
    p.fillStyle = "#cfcbc0"; p.fillRect(hx, hy - hh, hw, hh); p.fillStyle = "#a9a59b"; p.fillRect(hx + hw * 0.7, hy - hh, hw * 0.3, hh);
    p.fillStyle = "#4b2a28"; p.beginPath(); p.moveTo(hx - 6 * k, hy - hh); p.lineTo(hx + hw * 0.5, hy - hh - 26 * k); p.lineTo(hx + hw + 6 * k, hy - hh); p.fill();
    p.fillStyle = "#3a3f4c"; p.fillRect(hx + hw * 0.66, hy - hh - 30 * k, 9 * k, 16 * k);
    const finH = [[0.12, 0.35], [0.38, 0.35]]; finH.forEach(([u, v]) => { p.fillStyle = "#ffcf73"; p.fillRect(hx + hw * u, hy - hh + hh * v, 14 * k, 14 * k); p.strokeStyle = "#5a4a30"; p.lineWidth = 1; p.strokeRect(hx + hw * u, hy - hh + hh * v, 14 * k, 14 * k); p.beginPath(); p.moveTo(hx + hw * u + 7 * k, hy - hh + hh * v); p.lineTo(hx + hw * u + 7 * k, hy - hh + hh * v + 14 * k); p.moveTo(hx + hw * u, hy - hh + hh * v + 7 * k); p.lineTo(hx + hw * u + 14 * k, hy - hh + hh * v + 7 * k); p.stroke(); });
    p.fillStyle = "#3e4a5e"; p.fillRect(hx + hw * 0.76, hy - 22 * k, 11 * k, 22 * k);
    g = p.createRadialGradient(hx + hw * 0.3, hy - hh * 0.4, 2, hx + hw * 0.3, hy - hh * 0.4, 50 * k); g.addColorStop(0, "rgba(255,200,110,.25)"); g.addColorStop(1, "rgba(255,200,110,0)"); p.fillStyle = g; p.beginPath(); p.arc(hx + hw * 0.3, hy - hh * 0.4, 50 * k, 0, 7); p.fill();
    const comignolo = { x: hx + hw * 0.66 + 4.5 * k, y: hy - hh - 30 * k };
    /* torre del faro: tronco di cono con strisce, ombreggiatura cilindrica, finestrelle e porta */
    const tb = cima + 2, tt = tb - fh, wb = 26 * k, wt = 17 * k, wAt = y => wt + (wb - wt) * (y - tt) / (tb - tt);
    p.fillStyle = "#545a6b"; p.fillRect(fx - wb - 8 * k, tb - 8 * k, (wb + 8 * k) * 2, 10 * k);
    p.save(); p.beginPath(); p.moveTo(fx - wb, tb - 8 * k); p.lineTo(fx - wt, tt); p.lineTo(fx + wt, tt); p.lineTo(fx + wb, tb - 8 * k); p.closePath(); p.clip();
    const strisce = 5; for (let i = 0; i < strisce; i++) { p.fillStyle = i % 2 ? "#a3302c" : "#dcd8cc"; p.fillRect(fx - wb, tt + i * (tb - tt) / strisce, wb * 2, (tb - tt) / strisce + 1); }
    g = p.createLinearGradient(fx - wb, 0, fx + wb, 0); g.addColorStop(0, "rgba(150,170,230,.25)"); g.addColorStop(0.3, "rgba(0,0,0,0)"); g.addColorStop(0.65, "rgba(0,0,20,.35)"); g.addColorStop(1, "rgba(0,0,20,.7)"); p.fillStyle = g; p.fillRect(fx - wb, tt, wb * 2, tb - tt);
    p.restore();
    [0.22, 0.45, 0.68].forEach(f => { const y = tt + f * (tb - tt); p.fillStyle = "#ffd27a"; p.fillRect(fx - 2.5 * k, y, 5 * k, 9 * k); p.fillStyle = "#3a3020"; p.fillRect(fx - 3.5 * k, y - 1.5 * k, 7 * k, 1.5 * k); });
    p.fillStyle = "#2d3445"; p.beginPath(); p.moveTo(fx - 6 * k, tb - 8 * k); p.lineTo(fx - 6 * k, tb - 24 * k); p.arc(fx, tb - 24 * k, 6 * k, Math.PI, 0); p.lineTo(fx + 6 * k, tb - 8 * k); p.fill();
    /* galleria con ringhiera */
    const gy = tt; p.fillStyle = "#2a2f3c"; p.fillRect(fx - wt - 10 * k, gy - 4 * k, (wt + 10 * k) * 2, 5 * k);
    p.strokeStyle = "#3b4152"; p.lineWidth = 1; p.beginPath(); p.moveTo(fx - wt - 10 * k, gy - 14 * k); p.lineTo(fx + wt + 10 * k, gy - 14 * k); for (let x = fx - wt - 10 * k; x <= fx + wt + 10 * k; x += 4 * k) { p.moveTo(x, gy - 4 * k); p.lineTo(x, gy - 14 * k); } p.stroke();
    for (let x = fx - wt - 6 * k; x < fx + wt + 6 * k; x += 7 * k) { p.fillStyle = "#2a2f3c"; p.beginPath(); p.moveTo(x, gy + 1 * k); p.lineTo(x + 3 * k, gy + 7 * k); p.lineTo(x + 6 * k, gy + 1 * k); p.fill(); }
    const lan = { x: fx, y: gy - 14 * k - 14 * k, w: wt * 0.85, h: 24 * k };
    /* cupola di rame con ventilatore e parafulmine (sopra la lanterna, disegnata dopo) */
    const cup = (ctx) => { const cy = lan.y - lan.h / 2; ctx.fillStyle = "#1f3a36"; ctx.beginPath(); ctx.moveTo(fx - lan.w - 4 * k, cy); ctx.quadraticCurveTo(fx - lan.w, cy - 16 * k, fx, cy - 18 * k); ctx.quadraticCurveTo(fx + lan.w, cy - 16 * k, fx + lan.w + 4 * k, cy); ctx.fill();
      ctx.strokeStyle = "rgba(120,170,150,.5)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(fx - lan.w * 0.6, cy - 6 * k); ctx.quadraticCurveTo(fx - lan.w * 0.3, cy - 14 * k, fx, cy - 17 * k); ctx.stroke();
      ctx.fillStyle = "#1f3a36"; ctx.beginPath(); ctx.arc(fx, cy - 20 * k, 3.5 * k, 0, 7); ctx.fill(); ctx.strokeStyle = "#3c4456"; ctx.beginPath(); ctx.moveTo(fx, cy - 23 * k); ctx.lineTo(fx, cy - 36 * k); ctx.stroke(); };

    /* ---------- elementi mobili ---------- */
    const ny0 = my + 70, ny1 = Math.max(my + 90, orizz * 0.6), nuvole = Array.from({ length: piccolo ? 2 : 4 }, () => ({ x: rnd(0, W), y: rnd(ny0, ny1), s: rnd(0.7, 1.2), v: rnd(4, 8) }));
    const navi = [
      { x: rnd(0, W), y: orizz - 1, s: 0.55 * k, v: 4, tipo: "mercantile", dir: 1 },
      { x: rnd(0, W), y: orizz + (H - orizz) * 0.18, s: 0.8 * k, v: 7, tipo: "traghetto", dir: -1 },
      { x: rnd(0, W * 0.5), y: orizz + (H - orizz) * 0.42, s: 1 * k, v: 6, tipo: "peschereccio", dir: 1 }
    ];
    const boa = { x: W * (piccolo ? 0.38 : 0.5), y: orizz + (H - orizz) * 0.68 };
    const fumo = [];
    function fanali(ctx, x, y, dir, s, t) { /* fanale di testa bianco, rosso a sinistra, verde a dritta */
      const L = (cx, cy, col, r) => { const gl = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 4); gl.addColorStop(0, col); gl.addColorStop(1, "rgba(0,0,0,0)"); ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(cx, cy, r * 4, 0, 7); ctx.fill(); ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(cx, cy, r * 0.6, 0, 7); ctx.fill(); };
      L(x + dir * 10 * s, y - 26 * s, "rgba(255,255,230,.9)", 2.2); L(x + dir * 24 * s, y - 8 * s, dir > 0 ? "rgba(60,255,120,.9)" : "rgba(255,60,60,.9)", 1.8); void t;
    }
    function nave(ctx, n, t) {
      const { x, s, dir } = n, y = n.y + Math.sin(t * 1.1 + x * 0.01) * 0.8 * s;
      ctx.save(); ctx.translate(x, y); ctx.scale(dir * s, s);
      ctx.fillStyle = "#0a1020";
      if (n.tipo === "mercantile") {
        ctx.beginPath(); ctx.moveTo(-70, -8); ctx.lineTo(70, -8); ctx.lineTo(62, 2); ctx.lineTo(-66, 2); ctx.fill(); ctx.fillRect(-60, -14, 30, 6); ctx.fillRect(-58, -26, 18, 12); ctx.fillRect(-54, -34, 6, 8);
        for (let i = 0; i < 6; i++) ctx.fillRect(-24 + i * 14, -15, 12, 7);
        ctx.fillStyle = "#ffd27a"; for (let i = 0; i < 4; i++) ctx.fillRect(-56 + i * 4, -22, 2, 2);
      } else if (n.tipo === "traghetto") {
        ctx.beginPath(); ctx.moveTo(-80, -10); ctx.lineTo(76, -10); ctx.quadraticCurveTo(84, 0, 70, 4); ctx.lineTo(-74, 4); ctx.fill(); ctx.fillRect(-64, -24, 120, 14); ctx.fillRect(-40, -34, 76, 10); ctx.fillRect(4, -44, 10, 10);
        ctx.fillStyle = "#ffe0a0"; for (let r = 0; r < 2; r++) for (let i = 0; i < 18; i++) if ((i * 7 + r * 3) % 5) ctx.fillRect(-60 + i * 6.5, -21 + r * 7 - (r ? 0 : 0), 3.5, 3);
        for (let i = 0; i < 10; i++) ctx.fillRect(-36 + i * 7, -31, 3.5, 3);
      } else {
        ctx.beginPath(); ctx.moveTo(-26, -6); ctx.lineTo(28, -8); ctx.quadraticCurveTo(30, 2, 20, 4); ctx.lineTo(-22, 4); ctx.fill(); ctx.fillRect(-6, -20, 14, 13); ctx.strokeStyle = "#0a1020"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(14, -8); ctx.lineTo(14, -34); ctx.moveTo(14, -30); ctx.lineTo(-20, -8); ctx.stroke();
        ctx.fillStyle = "#ffd27a"; ctx.fillRect(-3, -17, 4, 4); ctx.fillRect(3, -17, 3, 4);
      }
      ctx.restore();
      if (n.tipo === "peschereccio") { /* lampara: luce forte verso l'acqua */
        const lx = x - dir * 10 * s, ly = y - 10 * s, gl = ctx.createRadialGradient(lx, ly, 0, lx, ly, 40 * s); gl.addColorStop(0, "rgba(255,240,200,.7)"); gl.addColorStop(1, "rgba(255,240,200,0)"); ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(lx, ly, 40 * s, 0, 7); ctx.fill();
        ctx.fillStyle = "rgba(255,240,200,.25)"; for (let i = 0; i < 6; i++) { const w = (18 - i * 2) * s + Math.sin(t * 3 + i) * 3; ctx.fillRect(lx - w / 2, y + 5 + i * 4 * s, w, 1.5); }
        const tx = x + dir * 14 * s, ty = y - 34 * s, gt = ctx.createRadialGradient(tx, ty, 0, tx, ty, 8); gt.addColorStop(0, "rgba(255,255,230,.9)"); gt.addColorStop(1, "rgba(255,255,230,0)"); ctx.fillStyle = gt; ctx.beginPath(); ctx.arc(tx, ty, 8, 0, 7); ctx.fill();
      } else fanali(ctx, x, y, dir, s, t);
    }

    return {
      scura: true,
      disegna(ctx, t, dt) {
        ctx.drawImage(cielo, 0, 0, W, H);
        /* stelle che brillano */
        for (let i = 0; i < 40; i++) { const x = (i * 263) % W, y = ((i * 131) % 100) / 100 * orizz * 0.8, a = 0.3 + 0.6 * Math.max(0, Math.sin(t * 1.3 + i * 2.7)); ctx.fillStyle = `rgba(255,255,240,${a})`; ctx.beginPath(); ctx.arc(x, y, 1.2, 0, 7); ctx.fill(); }
        /* luna */
        const gm = ctx.createRadialGradient(mx, my, 10, mx, my, 120); gm.addColorStop(0, "rgba(255,250,225,.28)"); gm.addColorStop(1, "rgba(255,250,225,0)"); ctx.fillStyle = gm; ctx.beginPath(); ctx.arc(mx, my, 120, 0, 7); ctx.fill();
        falce(ctx, mx, my, 26, 10, -6, 23, "rgba(255,250,225,.95)");
        /* nuvole scure col bordo illuminato dalla luna (non si sovrappongono) */
        muoviNuvole(nuvole, dt, W, ny0, ny1, 60, 24);
        const sb = [[0, 0, 22], [-30, 6, 16], [30, 6, 18], [10, -10, 18], [-14, -6, 14], [-50, 10, 10], [50, 10, 11]];
        ctx.fillStyle = "rgba(150,170,220,.35)"; ctx.beginPath(); nuvole.forEach(n => sb.forEach(([dx, dy, r]) => { const R = r * n.s; ctx.moveTo(n.x + dx * n.s + R, n.y + dy * n.s - 2); ctx.arc(n.x + dx * n.s, n.y + dy * n.s - 2, R, 0, 7); })); ctx.fill();
        ctx.fillStyle = "#16224a"; ctx.beginPath(); nuvole.forEach(n => sb.forEach(([dx, dy, r]) => { const R = r * n.s; ctx.moveTo(n.x + dx * n.s + R, n.y + dy * n.s + 1); ctx.arc(n.x + dx * n.s, n.y + dy * n.s + 1, R, 0, 7); })); ctx.fill();
        /* mare con le onde che scorrono e il riflesso della luna */
        ctx.drawImage(mare, 0, 0, W, H);
        const dx = (t * 5) % W; ctx.save(); ctx.beginPath(); ctx.rect(0, orizz, W, H - orizz); ctx.clip(); ctx.drawImage(onde, -dx, 0, W, H); ctx.drawImage(onde, W - dx, 0, W, H); ctx.restore();
        for (let i = 0; i < 22; i++) { const f = i / 22, y = orizz + 4 + f * (H - orizz) * 0.9, w = (8 + f * 70) * (0.4 + 0.6 * Math.abs(Math.sin(t * 1.3 + i * 1.9))); ctx.fillStyle = `rgba(255,250,225,${0.45 - f * 0.3})`; ctx.fillRect(mx - w / 2 + Math.sin(t * 0.8 + i * 2.3) * 6 * f, y, w, 1 + f * 1.5); }
        /* fascio del faro: ruota; quando punta verso di noi la lanterna lampeggia e il mare si illumina */
        const a = t * 0.8, sc = Math.cos(a), verso = Math.sin(a), lungo = Math.max(W, H) * 1.3;
        const lampo = Math.pow(Math.max(0, verso), 8);
        ctx.save(); ctx.translate(lan.x, lan.y); const dir = sc >= 0 ? 0 : Math.PI, vis = Math.max(0.12, Math.abs(sc)), ap = 0.07 + 0.25 * (1 - vis);
        const gr = ctx.createRadialGradient(0, 0, 0, 0, 0, lungo * vis); gr.addColorStop(0, `rgba(255,240,190,${0.5 * vis})`); gr.addColorStop(0.5, `rgba(255,240,190,${0.15 * vis})`); gr.addColorStop(1, "rgba(255,240,190,0)");
        ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, lungo * vis, dir - ap, dir + ap); ctx.closePath(); ctx.fill(); ctx.restore();
        if (lampo > 0.01) { ctx.fillStyle = `rgba(255,240,190,${0.18 * lampo})`; for (let i = 0; i < 16; i++) { const f = i / 16, y = orizz + 3 + f * (H - orizz), w = (20 + f * 120); ctx.fillRect(lan.x - w / 2, y, w, 1.5 + f * 2); } }
        /* navi con i fanali, peschereccio con la lampara */
        navi.forEach(n => { n.x += n.dir * n.v * dt; if (n.x > W + 100) n.x = -100; if (n.x < -100) n.x = W + 100; nave(ctx, n, t); });
        /* boa che dondola e lampeggia */
        const by = boa.y + Math.sin(t * 1.6) * 2, bt = Math.sin(t * 1.6) * 0.12; ctx.save(); ctx.translate(boa.x, by); ctx.rotate(bt);
        ctx.fillStyle = "#3a1414"; ctx.beginPath(); ctx.moveTo(-7 * k, 0); ctx.lineTo(-4 * k, -18 * k); ctx.lineTo(4 * k, -18 * k); ctx.lineTo(7 * k, 0); ctx.fill(); ctx.fillStyle = "#14202a"; ctx.fillRect(-1, -26 * k, 2, 8 * k); ctx.restore();
        if ((t % 3) < 0.5) { const gl = ctx.createRadialGradient(boa.x, by - 27 * k, 0, boa.x, by - 27 * k, 18); gl.addColorStop(0, "rgba(255,70,60,1)"); gl.addColorStop(1, "rgba(255,70,60,0)"); ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(boa.x, by - 27 * k, 18, 0, 7); ctx.fill(); ctx.fillStyle = "rgba(255,70,60,.3)"; ctx.fillRect(boa.x - 3, by + 4, 6, 14); }
        ctx.strokeStyle = "rgba(150,180,230,.4)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(boa.x, by + 1, 11 * k, 2.5, 0, 0, 7); ctx.stroke();
        /* promontorio, casa e faro */
        ctx.drawImage(terra, 0, 0, W, H);
        /* fumo dal camino */
        if (Math.random() < dt * 3) fumo.push({ x: comignolo.x, y: comignolo.y, r: 3 * k, a: 0.35 });
        for (let i = fumo.length - 1; i >= 0; i--) { const f = fumo[i]; f.y -= 10 * k * dt; f.x += 6 * k * dt; f.r += 4 * k * dt; f.a -= 0.06 * dt; if (f.a <= 0) { fumo.splice(i, 1); continue; } ctx.fillStyle = `rgba(150,160,190,${f.a})`; ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, 7); ctx.fill(); }
        /* lanterna: vetri, montanti, lente che gira */
        const L = lan, gl0 = ctx.createRadialGradient(L.x, L.y, 2, L.x, L.y, 70 * k + lampo * 160 * k); gl0.addColorStop(0, `rgba(255,236,170,${0.55 + 0.45 * lampo})`); gl0.addColorStop(1, "rgba(255,236,170,0)"); ctx.fillStyle = gl0; ctx.beginPath(); ctx.arc(L.x, L.y, 70 * k + lampo * 160 * k, 0, 7); ctx.fill();
        ctx.fillStyle = "#2a2f3c"; ctx.fillRect(L.x - L.w - 2 * k, L.y + L.h / 2, (L.w + 2 * k) * 2, 4 * k);
        ctx.fillStyle = `rgba(255,236,170,${0.85 + 0.15 * lampo})`; ctx.fillRect(L.x - L.w, L.y - L.h / 2, L.w * 2, L.h);
        const lx = L.x + Math.sin(a) * L.w * 0.5; ctx.fillStyle = "#fffdf2"; ctx.beginPath(); ctx.ellipse(lx, L.y, L.w * 0.35 * (0.4 + 0.6 * Math.abs(Math.sin(a))), L.h * 0.38, 0, 0, 7); ctx.fill();
        ctx.strokeStyle = "#2a2f3c"; ctx.lineWidth = 1.4; for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(L.x + i * L.w * 0.66, L.y - L.h / 2); ctx.lineTo(L.x + i * L.w * 0.66, L.y + L.h / 2); ctx.stroke(); }
        ctx.beginPath(); ctx.moveTo(L.x - L.w, L.y); ctx.lineTo(L.x + L.w, L.y); ctx.stroke();
        cup(ctx);
        /* onde che si infrangono sugli scogli: schiuma che sale e ricade (spruzzo sfumato) e orlo di schiuma alla base */
        scogli.forEach(([x, r], i) => { if (!r) return; const R = r * k, f = (t * 0.45 + i * 0.37) % 1, sl = Math.sin(Math.PI * f), cy = orizz + 18 - R * 0.9 - sl * R * 1.2;
          const gs = ctx.createRadialGradient(x, cy, 0, x, cy, R * (0.8 + f * 1.4)); gs.addColorStop(0, `rgba(225,235,255,${0.55 * sl})`); gs.addColorStop(1, "rgba(225,235,255,0)");
          ctx.fillStyle = gs; ctx.beginPath(); ctx.ellipse(x, cy, R * (0.8 + f * 1.4), R * (0.5 + f * 0.8), 0, 0, 7); ctx.fill();
          ctx.strokeStyle = `rgba(220,232,255,${0.35 + 0.3 * sl})`; ctx.lineWidth = 2; ctx.beginPath(); for (let j = 0; j <= 16; j++) { const u = j / 16, xx = x - R * 1.6 + u * R * 3.2, yy = orizz + 18 - Math.sin(Math.PI * u) * (2 + sl * 3) + Math.sin(u * 20 + t * 4) * 0.8; j ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); });
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
    linguistico: (W, H, n) => linguistico(W, H, n),
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

