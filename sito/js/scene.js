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
  /* SCIENZE APPLICATE: scheda elettronica che riempie lo schermo con impulsi di luce + reti neurali */
  function scienzeApplicate(W, H) {
    const TEAL = "#1f6f8b", LUCE = "#22b8f0", g = W < 600 ? 18 : 22;
    const fondo = document.createElement("canvas"); fondo.width = W; fondo.height = H; const f = fondo.getContext("2d");
    const piste = [];
    /* chip */
    const chip = [];
    const nChip = Math.max(3, Math.round(W * H / 160000));
    for (let k = 0; k < nChip * 3 && chip.length < nChip; k++) {
      const w = Math.round(rnd(3, 6)) * g, h = Math.round(rnd(3, 5)) * g, x = Math.round(rnd(1, W / g - w / g - 1)) * g, y = Math.round(rnd(3, H / g - h / g - 1)) * g;
      if (chip.some(c => x < c.x + c.w + 2 * g && c.x < x + w + 2 * g && y < c.y + c.h + 2 * g && c.y < y + h + 2 * g)) continue; chip.push({ x, y, w, h, nome: scegli(["CPU", "GPU", "RAM", "I/O", "MCU", "NPU", "ROM"]) });
    }
    const DIR = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
    function traccia(x, y, d) {
      const pts = [[x, y]]; const L = Math.floor(rnd(5, 14));
      for (let k = 0; k < L; k++) { if (Math.random() < 0.3) d = (d + (Math.random() < 0.5 ? 1 : 7)) % 8; const [dx, dy] = DIR[d], n = Math.floor(rnd(1, 4)); x += dx * g * n; y += dy * g * n; if (x < 0 || x > W || y < 50 || y > H) break; pts.push([x, y]); }
      if (pts.length < 3) return; let Lt = 0; for (let i = 1; i < pts.length; i++) Lt += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); piste.push({ pts, L: Lt });
    }
    chip.forEach(c => { for (let x = c.x + g; x < c.x + c.w; x += g) { traccia(x, c.y, 6); traccia(x, c.y + c.h, 2); } for (let y = c.y + g; y < c.y + c.h; y += g) { traccia(c.x, y, 4); traccia(c.x + c.w, y, 0); } });
    const extra = Math.round(W * H / 9000); for (let k = 0; k < extra; k++) traccia(Math.round(rnd(0, W / g)) * g, Math.round(rnd(3, H / g)) * g, Math.floor(rnd(0, 8)));
    f.lineCap = "round"; f.lineJoin = "round";
    piste.forEach(p => { f.strokeStyle = rgba(TEAL, 0.2); f.lineWidth = 2.2; f.beginPath(); f.moveTo(...p.pts[0]); p.pts.slice(1).forEach(q => f.lineTo(...q)); f.stroke();
      const e = p.pts[p.pts.length - 1]; f.fillStyle = "#fff"; f.strokeStyle = rgba(TEAL, 0.35); f.lineWidth = 1.6; f.beginPath(); f.arc(e[0], e[1], 3.6, 0, 7); f.fill(); f.stroke(); });
    chip.forEach(c => { f.fillStyle = rgba("#2c3e50", 0.5); f.fillRect(c.x, c.y, c.w, c.h); f.strokeStyle = rgba(TEAL, 0.6); f.lineWidth = 1.5; f.strokeRect(c.x + 4, c.y + 4, c.w - 8, c.h - 8);
      f.fillStyle = rgba("#9fb3c8", 0.9); for (let x = c.x + g; x < c.x + c.w; x += g) { f.fillRect(x - 3, c.y - 6, 6, 6); f.fillRect(x - 3, c.y + c.h, 6, 6); } for (let y = c.y + g; y < c.y + c.h; y += g) { f.fillRect(c.x - 6, y - 3, 6, 6); f.fillRect(c.x + c.w, y - 3, 6, 6); }
      f.fillStyle = "rgba(220,235,245,.85)"; f.font = `bold ${Math.round(g * 0.75)}px ${SERIF}`; f.textAlign = "center"; f.textBaseline = "middle"; f.fillText(c.nome, c.x + c.w / 2, c.y + c.h / 2); });
    function punto(p, s) { let d = s * p.L; for (let i = 1; i < p.pts.length; i++) { const [x0, y0] = p.pts[i - 1], [x1, y1] = p.pts[i], l = Math.hypot(x1 - x0, y1 - y0); if (d <= l) return [x0 + (x1 - x0) * d / l, y0 + (y1 - y0) * d / l]; d -= l; } return p.pts[p.pts.length - 1]; }
    const impulsi = []; const nImp = Math.round(piste.length * 0.35);
    /* reti neurali a strati che fluttuano e si urtano */
    const reti = Array.from({ length: W < 600 ? 2 : Math.max(3, Math.round(W * H / 260000)) }, () => {
      const strati = [3, 5, 5, 4, 2].slice(0, Math.floor(rnd(3, 6))), w = W < 600 ? 150 : 210, h = W < 600 ? 110 : 150;
      return { f: "r", x: rnd(w, W - w), y: rnd(120, H - h), vx: rnd(-18, 18), vy: rnd(-14, 14), hw: w / 2 + 10, hh: h / 2 + 10, w, h, strati, fase: rnd(0, 3), m: 3 };
    });
    for (let k = 0; k < 200; k++) urti(reti, W, H, 60);
    function rete(ctx, R, t) {
      const pos = R.strati.map((n, i) => Array.from({ length: n }, (_, j) => [R.x - R.w / 2 + i * R.w / (R.strati.length - 1), R.y - (n - 1) / 2 * (R.h / 5)  + j * (R.h / 5)]));
      ctx.fillStyle = "rgba(255,255,255,.75)"; ctx.fillRect(R.x - R.hw, R.y - R.hh, R.hw * 2, R.hh * 2); ctx.strokeStyle = rgba(TEAL, 0.25); ctx.lineWidth = 1; ctx.strokeRect(R.x - R.hw, R.y - R.hh, R.hw * 2, R.hh * 2);
      const onda = ((t * 0.9 + R.fase) % (R.strati.length + 1));
      for (let i = 0; i < pos.length - 1; i++) pos[i].forEach(([x0, y0]) => pos[i + 1].forEach(([x1, y1]) => { const att = Math.max(0, 1 - Math.abs(onda - i - 0.5)); ctx.strokeStyle = att > 0.05 ? `rgba(34,184,240,${0.15 + 0.5 * att})` : rgba(TEAL, 0.18); ctx.lineWidth = 1 + att; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); }));
      pos.forEach((col, i) => col.forEach(([x, y]) => { const att = Math.max(0, 1 - Math.abs(onda - i)); ctx.fillStyle = att > 0.05 ? `rgba(34,184,240,${0.35 + 0.6 * att})` : "#fff"; ctx.strokeStyle = rgba(TEAL, 0.7); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, 6, 0, 7); ctx.fill(); ctx.stroke(); }));
    }
    return {
      disegna(ctx, t, dt) {
        ctx.drawImage(fondo, 0, 0, W, H);
        while (impulsi.length < nImp) impulsi.push({ p: scegli(piste), s: 0, v: rnd(0.25, 0.7) });
        for (let i = impulsi.length - 1; i >= 0; i--) {
          const q = impulsi[i]; q.s += q.v * dt * (300 / Math.max(120, q.p.L)); if (q.s >= 1) { impulsi.splice(i, 1); continue; }
          for (let k = 0; k < 6; k++) { const [x, y] = punto(q.p, Math.max(0, q.s - k * 0.025)); ctx.fillStyle = `rgba(34,184,240,${0.7 * (1 - k / 6)})`; ctx.beginPath(); ctx.arc(x, y, 3.2 - k * 0.35, 0, 7); ctx.fill(); }
          const [x, y] = punto(q.p, q.s), gl = ctx.createRadialGradient(x, y, 0, x, y, 16); gl.addColorStop(0, "rgba(34,184,240,.45)"); gl.addColorStop(1, "rgba(34,184,240,0)"); ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(x, y, 16, 0, 7); ctx.fill();
        }
        reti.forEach(R => { R.x += R.vx * dt; R.y += R.vy * dt; }); urti(reti, W, H, 60); reti.forEach(R => rete(ctx, R, t));
        void LUCE;
      }
    };
  }

  /* ------------------------------------------------------------------ */
  /* TRED: mosaico di esagoni nel cielo + paesaggio sostenibile (colline, fiume, alberi, pannelli, pale) */
  function tred(W, H) {
    const orizz = H * (W < 600 ? 0.62 : 0.55);
    const paes = document.createElement("canvas"); paes.width = W; paes.height = H; const p = paes.getContext("2d");
    /* cielo */
    const cielo = p.createLinearGradient(0, 0, 0, orizz); cielo.addColorStop(0, "#d9efff"); cielo.addColorStop(1, "#f4fbff"); p.fillStyle = cielo; p.fillRect(0, 0, W, orizz + 40);
    function collina(base, amp, col, fase, ond) { p.fillStyle = col; p.beginPath(); p.moveTo(0, H); for (let x = 0; x <= W + 10; x += 10) p.lineTo(x, base + Math.sin(x / ond + fase) * amp + Math.sin(x / (ond * 0.43) + fase * 2) * amp * 0.35); p.lineTo(W, H); p.closePath(); p.fill(); }
    const yC = (base, amp, fase, ond, x) => base + Math.sin(x / ond + fase) * amp + Math.sin(x / (ond * 0.43) + fase * 2) * amp * 0.35;
    const C1 = [orizz, H * 0.05, 1.3, W * 0.18], C2 = [orizz + H * 0.09, H * 0.05, 4.1, W * 0.22], C3 = [orizz + H * 0.2, H * 0.045, 2.2, W * 0.15];
    collina(...C1.slice(0, 2), "#b9dcc0", C1[2], C1[3]);
    /* pale lontane sulla prima collina (disegnate dopo, animate) */
    collina(C2[0], C2[1], "#8fca8f", C2[2], C2[3]);
    /* fiume */
    p.fillStyle = "#8fd0f0"; p.beginPath(); const fx = W * 0.3;
    for (let y = C2[0]; y <= H; y += 6) { const k = (y - C2[0]) / (H - C2[0]), x = fx + Math.sin(k * 4) * W * 0.06 - k * W * 0.05, w = 6 + k * W * 0.12; y === C2[0] ? p.moveTo(x - w, y) : p.lineTo(x - w, y); }
    for (let y = H; y >= C2[0]; y -= 6) { const k = (y - C2[0]) / (H - C2[0]), x = fx + Math.sin(k * 4) * W * 0.06 - k * W * 0.05, w = 6 + k * W * 0.12; p.lineTo(x + w, y); }
    p.closePath(); p.fill();
    collina(C3[0], C3[1], "#6db56f", C3[2], C3[3]);
    /* campo di pannelli solari */
    const px0 = W * 0.55, py0 = yC(...C3, W * 0.6) + 18, pw = Math.min(46, W * 0.05);
    for (let r = 0; r < 3; r++) for (let c = 0; c < Math.max(4, Math.round(W / 140)); c++) {
      const x = px0 + c * (pw + 8) + r * 10, y = py0 + r * (pw * 0.55 + 6);
      p.fillStyle = "#2d4f7c"; p.beginPath(); p.moveTo(x, y); p.lineTo(x + pw, y); p.lineTo(x + pw - 8, y + pw * 0.5); p.lineTo(x - 8, y + pw * 0.5); p.closePath(); p.fill();
      p.strokeStyle = "rgba(170,210,255,.7)"; p.lineWidth = 0.8; for (let k = 1; k < 4; k++) { p.beginPath(); p.moveTo(x + k * pw / 4, y); p.lineTo(x + k * pw / 4 - 8, y + pw * 0.5); p.stroke(); } p.beginPath(); p.moveTo(x - 4, y + pw * 0.25); p.lineTo(x + pw - 4, y + pw * 0.25); p.stroke();
      p.strokeStyle = "#6b7280"; p.beginPath(); p.moveTo(x + pw / 2 - 4, y + pw * 0.5); p.lineTo(x + pw / 2 - 4, y + pw * 0.7); p.stroke();
    }
    /* alberi */
    function albero(x, y, s, tipo) {
      p.fillStyle = "#7a5a3a"; p.fillRect(x - s * 0.08, y - s * 0.4, s * 0.16, s * 0.4);
      if (tipo) { p.fillStyle = "#2f7d4a"; for (let k = 0; k < 3; k++) { p.beginPath(); p.moveTo(x, y - s * (1.25 - k * 0.25)); p.lineTo(x + s * (0.32 + k * 0.08), y - s * (0.55 - k * 0.2) - s * 0.25); p.lineTo(x - s * (0.32 + k * 0.08), y - s * (0.55 - k * 0.2) - s * 0.25); p.closePath(); p.fill(); } }
      else { p.fillStyle = "#3f9a52"; [[0, -0.7, 0.38], [-0.22, -0.5, 0.28], [0.22, -0.5, 0.28]].forEach(([dx, dy, r]) => { p.beginPath(); p.arc(x + dx * s, y + dy * s, r * s, 0, 7); p.fill(); }); p.fillStyle = "rgba(255,255,255,.12)"; p.beginPath(); p.arc(x - s * 0.1, y - s * 0.8, s * 0.15, 0, 7); p.fill(); }
    }
    for (let k = 0; k < Math.round(W / 45); k++) { const x = rnd(0, W); if (Math.abs(x - fx) < W * 0.12) continue; albero(x, yC(...C2, x) + rnd(4, 20), rnd(22, 34), Math.random() < 0.5); }
    for (let k = 0; k < Math.round(W / 70); k++) { const x = rnd(0, W * 0.5); if (Math.abs(x - fx + W * 0.04) < W * 0.14) continue; albero(x, yC(...C3, x) + rnd(10, 40), rnd(34, 50), Math.random() < 0.5); }
    /* case con il tetto solare */
    for (let k = 0; k < 3; k++) { const x = W * (0.08 + k * 0.07), y = yC(...C3, x) + 30, s = 30;
      p.fillStyle = "#f3e6d0"; p.fillRect(x - s / 2, y - s * 0.6, s, s * 0.6); p.fillStyle = "#c0533d"; p.beginPath(); p.moveTo(x - s * 0.6, y - s * 0.6); p.lineTo(x, y - s * 1.05); p.lineTo(x + s * 0.6, y - s * 0.6); p.closePath(); p.fill();
      p.fillStyle = "#2d4f7c"; p.beginPath(); p.moveTo(x + 2, y - s * 0.95); p.lineTo(x + s * 0.45, y - s * 0.66); p.lineTo(x + s * 0.3, y - s * 0.66); p.lineTo(x - 2, y - s * 0.86); p.closePath(); p.fill();
      p.fillStyle = "#7fb7e0"; p.fillRect(x - s * 0.3, y - s * 0.45, s * 0.2, s * 0.18); p.fillStyle = "#8a5a3a"; p.fillRect(x + s * 0.08, y - s * 0.38, s * 0.2, s * 0.38); }
    /* pale eoliche */
    const pale = [];
    const nP = W < 600 ? 3 : 6;
    for (let k = 0; k < nP; k++) { const lontana = k % 2 === 0, x = W * (0.12 + k * (0.8 / nP)) + rnd(-20, 20), base = lontana ? yC(...C1, x) + 6 : yC(...C2, x) + 8, h = lontana ? H * 0.17 : H * 0.25; if (Math.abs(x - fx) < 40) continue; pale.push({ x, base, h: Math.min(h, lontana ? 150 : 220), a: rnd(0, 6), v: rnd(0.8, 1.4), lontana }); }
    pale.sort((a, b) => a.lontana === b.lontana ? 0 : a.lontana ? -1 : 1);
    function pala(ctx, q) {
      const top = q.base - q.h, s = q.h / 200, col = q.lontana ? "#e6eef2" : "#ffffff", ombra = q.lontana ? "#c5d3da" : "#cfd8dc";
      const g = ctx.createLinearGradient(q.x - 6 * s, 0, q.x + 6 * s, 0); g.addColorStop(0, ombra); g.addColorStop(0.5, col); g.addColorStop(1, ombra);
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(q.x - 7 * s, q.base); ctx.lineTo(q.x - 3 * s, top); ctx.lineTo(q.x + 3 * s, top); ctx.lineTo(q.x + 7 * s, q.base); ctx.closePath(); ctx.fill();
      ctx.fillStyle = ombra; ctx.fillRect(q.x - 5 * s, top - 6 * s, 16 * s, 9 * s);
      ctx.save(); ctx.translate(q.x, top - 2 * s); ctx.rotate(q.a);
      for (let k = 0; k < 3; k++) { ctx.rotate(Math.PI * 2 / 3); ctx.fillStyle = col; ctx.strokeStyle = ombra; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-3 * s, 0); ctx.quadraticCurveTo(-5 * s, -q.h * 0.25, -1.5 * s, -q.h * 0.48); ctx.lineTo(1.5 * s, -q.h * 0.48); ctx.quadraticCurveTo(4 * s, -q.h * 0.2, 3 * s, 0); ctx.closePath(); ctx.fill(); ctx.stroke(); }
      ctx.fillStyle = ombra; ctx.beginPath(); ctx.arc(0, 0, 4.5 * s, 0, 7); ctx.fill(); ctx.restore();
    }
    /* esagoni */
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
    const nuvole = Array.from({ length: 5 }, () => ({ x: rnd(0, W), y: rnd(0.1, 0.4) * orizz, s: rnd(0.7, 1.3), v: rnd(6, 16) }));
    const foglie = [], pixel = [];
    return {
      disegna(ctx, t, dt) {
        ctx.drawImage(paes, 0, 0, W, H);
        /* esagoni che si accendono a onde (verde energia / azzurro digitale) */
        const c1x = W * (0.5 + 0.4 * Math.sin(t * 0.21)), c1y = orizz * (0.5 + 0.3 * Math.cos(t * 0.17));
        celle.forEach(c => {
          const fade = Math.max(0, 1 - c.y / orizz) * 0.9 + 0.1, d = Math.hypot(c.x - c1x, c.y - c1y), on = Math.max(0, Math.sin(d / 90 - t * 1.6 + c.f * 0.15)) ** 3;
          esagono(ctx, c.x, c.y, R - 2); ctx.fillStyle = on > 0.05 ? `rgba(${c.x < W / 2 ? "52,170,110" : "40,150,220"},${0.22 * on * fade})` : "rgba(255,255,255,0)"; ctx.fill();
          ctx.strokeStyle = `rgba(42,122,82,${0.16 * fade})`; ctx.lineWidth = 1; ctx.stroke();
          if (c.icona && on > 0.25) icona(ctx, c.icona, c.x, c.y, R * 0.38, `rgba(${c.icona === "goccia" || c.icona === "bit" ? "40,140,210" : c.icona === "sole" || c.icona === "fulmine" ? "220,160,20" : "42,140,82"},${0.75 * on * fade})`);
        });
        /* sole */
        const sx = W * 0.86, sy = Math.min(140, orizz * 0.3), gs = ctx.createRadialGradient(sx, sy, 10, sx, sy, 90); gs.addColorStop(0, "rgba(255,214,90,.9)"); gs.addColorStop(0.35, "rgba(255,214,90,.45)"); gs.addColorStop(1, "rgba(255,214,90,0)"); ctx.fillStyle = gs; ctx.beginPath(); ctx.arc(sx, sy, 90, 0, 7); ctx.fill();
        /* nuvole */
        nuvole.forEach(n => { n.x += n.v * dt; if (n.x > W + 120) n.x = -120; ctx.fillStyle = "rgba(255,255,255,.92)"; [[0, 0, 26], [-30, 8, 20], [30, 8, 22], [10, -14, 20], [-14, -8, 17]].forEach(([dx, dy, r]) => { ctx.beginPath(); ctx.arc(n.x + dx * n.s, n.y + dy * n.s, r * n.s, 0, 7); ctx.fill(); }); ctx.fillStyle = "rgba(190,210,230,.35)"; ctx.fillRect(n.x - 44 * n.s, n.y + 14 * n.s, 88 * n.s, 4); });
        pale.forEach(q => { q.a += q.v * dt; pala(ctx, q); });
        /* luccichii sul fiume */
        ctx.strokeStyle = "rgba(255,255,255,.7)"; ctx.lineWidth = 1.5; for (let k = 0; k < 8; k++) { const y = C2[0] + ((t * 25 + k * 60) % (H - C2[0])), kk = (y - C2[0]) / (H - C2[0]), x = fx + Math.sin(kk * 4) * W * 0.06 - kk * W * 0.05; ctx.beginPath(); ctx.moveTo(x - 6 - kk * 20, y); ctx.lineTo(x + 6 + kk * 20, y); ctx.stroke(); }
        /* foglie col vento → pixel e bit */
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

  /* ------------------------------------------------------------------ */
  /* CLASSICO: tempio greco che incornicia la pagina + cielo notturno con le costellazioni mitologiche */
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
  function classico(W, H) {
    const piccolo = W < 600, cw = piccolo ? 26 : Math.min(60, W * 0.05), fr = piccolo ? 70 : Math.min(130, H * 0.16), baseT = 54, alto = baseT + fr;
    const marmo = "#efe6d2", ombra = "#c9b994", scuro = "#a8956b";
    const tempio = document.createElement("canvas"); tempio.width = W; tempio.height = H; const p = tempio.getContext("2d");
    /* frontone */
    const archTop = baseT + fr * 0.55;
    p.fillStyle = marmo; p.beginPath(); p.moveTo(0, archTop); p.lineTo(W / 2, baseT + 4); p.lineTo(W, archTop); p.closePath(); p.fill();
    p.strokeStyle = ombra; p.lineWidth = 3; p.stroke();
    p.fillStyle = "#e2d6bb"; p.beginPath(); p.moveTo(W * 0.08, archTop - 4); p.lineTo(W / 2, baseT + fr * 0.12); p.lineTo(W * 0.92, archTop - 4); p.closePath(); p.fill();
    /* fregio con triglifi e metope */
    p.fillStyle = marmo; p.fillRect(0, archTop, W, fr * 0.27); p.strokeStyle = ombra; p.lineWidth = 2; p.strokeRect(-2, archTop, W + 4, fr * 0.27);
    const tg = piccolo ? 26 : 44; for (let x = 6; x < W; x += tg * 2) { p.fillStyle = ombra; p.fillRect(x, archTop + 4, tg * 0.55, fr * 0.27 - 8); p.fillStyle = marmo; p.fillRect(x + tg * 0.14, archTop + 4, 2, fr * 0.27 - 8); p.fillRect(x + tg * 0.36, archTop + 4, 2, fr * 0.27 - 8); }
    p.fillStyle = "#e6dbc1"; p.fillRect(0, archTop + fr * 0.27, W, fr * 0.18); p.strokeStyle = ombra; p.strokeRect(-2, archTop + fr * 0.27, W + 4, fr * 0.18);
    const archBot = archTop + fr * 0.45;
    /* colonne */
    function colonna(x) {
      const top = archBot, base = H - 46, g = p.createLinearGradient(x - cw / 2, 0, x + cw / 2, 0); g.addColorStop(0, ombra); g.addColorStop(0.35, marmo); g.addColorStop(0.7, marmo); g.addColorStop(1, scuro);
      p.fillStyle = marmo; p.fillRect(x - cw * 0.75, top, cw * 1.5, cw * 0.18); p.fillStyle = "#e2d6bb"; p.beginPath(); p.moveTo(x - cw * 0.7, top + cw * 0.18); p.quadraticCurveTo(x, top + cw * 0.55, x + cw * 0.7, top + cw * 0.18); p.closePath(); p.fill();
      p.fillStyle = g; p.beginPath(); p.moveTo(x - cw * 0.5, top + cw * 0.4); p.lineTo(x + cw * 0.5, top + cw * 0.4); p.lineTo(x + cw * 0.56, base); p.lineTo(x - cw * 0.56, base); p.closePath(); p.fill();
      p.strokeStyle = "rgba(150,130,90,.45)"; p.lineWidth = 1; for (let k = 1; k < 7; k++) { const fx = -0.5 + k / 7; p.beginPath(); p.moveTo(x + fx * cw, top + cw * 0.45); p.lineTo(x + fx * cw * 1.1, base - 2); p.stroke(); }
    }
    colonna(cw * 1.1); colonna(W - cw * 1.1); if (W > 1100) { colonna(cw * 3); colonna(W - cw * 3); }
    /* stilobate con il meandro */
    const sb = H - 46; [[0, 16], [16, 15], [31, 15]].forEach(([dy, h], k) => { p.fillStyle = k % 2 ? "#e6dbc1" : marmo; p.fillRect(0, sb + dy, W, h); p.strokeStyle = ombra; p.lineWidth = 1.5; p.strokeRect(-2, sb + dy, W + 4, h); });
    p.strokeStyle = scuro; p.lineWidth = 1.5; const u = 4; for (let x = 4; x < W; x += u * 4) { const y = sb + 18; p.beginPath(); p.moveTo(x, y + u * 2.5); p.lineTo(x, y); p.lineTo(x + u * 3, y); p.lineTo(x + u * 3, y + u * 2); p.lineTo(x + u, y + u * 2); p.lineTo(x + u, y + u); p.lineTo(x + u * 2, y + u); p.stroke(); }
    const stelle = Array.from({ length: Math.round(W * H / 3500) }, () => [rnd(0, W), rnd(alto, H - 46), rnd(0.4, 1.5), rnd(0, 6)]);
    const zona = { x0: piccolo ? cw * 2 : cw * (W > 1100 ? 4 : 2.2), x1: W - (piccolo ? cw * 2 : cw * (W > 1100 ? 4 : 2.2)), y0: alto + 20, y1: H - 70 };
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
        ctx.drawImage(tempio, 0, 0, W, H);
      }
    };
  }

  /* ------------------------------------------------------------------ */
  /* ARTISTICO: macchie di colore vivo e schizzi curvilinei (stile "Art Attack") con gocce */
  function artistico(W, H) {
    const macchie = [], schizzi = [], gocce = [];
    function contorno(n, irr) { return Array.from({ length: n }, () => 1 + rnd(-irr, irr)); }
    function curvaChiusa(ctx, pts) { const n = pts.length; ctx.beginPath(); const m = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; let s = m(pts[n - 1], pts[0]); ctx.moveTo(...s); for (let i = 0; i < n; i++) { const q = m(pts[i], pts[(i + 1) % n]); ctx.quadraticCurveTo(pts[i][0], pts[i][1], q[0], q[1]); } ctx.closePath(); }
    function nuovaMacchia() { macchie.push({ x: rnd(0, W), y: rnd(0, H), R: rnd(70, 180), c: scegli(VIVI), vita: 0, durata: rnd(10, 16), strati: Array.from({ length: 5 }, () => contorno(14, 0.25)), rot: rnd(0, 6) }); }
    for (let i = 0; i < 7; i++) { nuovaMacchia(); macchie[i].vita = rnd(0, 7); }
    function nuovoSchizzo(x, y, c) {
      const r = rnd(16, 30), bracci = Array.from({ length: Math.floor(rnd(4, 8)) }, () => ({ a: rnd(0, 7), L: rnd(1.6, 3.4), w: rnd(0.22, 0.4), curva: rnd(-0.5, 0.5) }));
      const gocc = Array.from({ length: Math.floor(rnd(6, 14)) }, () => [rnd(0, 7), rnd(1.8, 4.2), rnd(2, 6)]);
      schizzi.push({ x, y, r, c, vita: 0, forma: contorno(12, 0.22), bracci, gocc, rot: rnd(0, 6) });
    }
    let prossimaM = 1, prossimaG = 0.3;
    return {
      disegna(ctx, t, dt) {
        prossimaM -= dt; if (prossimaM <= 0 && macchie.length < 12) { prossimaM = rnd(0.8, 1.8); nuovaMacchia(); }
        for (let i = macchie.length - 1; i >= 0; i--) {
          const m = macchie[i]; m.vita += dt; const k = m.vita / m.durata; if (k >= 1) { macchie.splice(i, 1); continue; }
          const cr = 1 - Math.pow(1 - Math.min(1, k * 2.5), 3), a = k < 0.65 ? 1 : 1 - (k - 0.65) / 0.35;
          m.strati.forEach((s, j) => { const r = m.R * cr * (0.65 + j * 0.1); ctx.fillStyle = rgba(m.c, 0.09 * a); curvaChiusa(ctx, s.map((q, n) => { const an = m.rot + n / s.length * Math.PI * 2; return [m.x + Math.cos(an) * r * q, m.y + Math.sin(an) * r * q]; })); ctx.fill(); });
        }
        prossimaG -= dt; if (prossimaG <= 0) { prossimaG = rnd(0.35, 0.9); gocce.push({ x: rnd(0.04, 0.96) * W, y: -20, fine: rnd(0.15, 0.92) * H, v: 0, c: scegli(VIVI) }); }
        for (let i = gocce.length - 1; i >= 0; i--) { const g = gocce[i]; g.v += 1000 * dt; g.y += g.v * dt; if (g.y >= g.fine) { gocce.splice(i, 1); nuovoSchizzo(g.x, g.fine, g.c); continue; }
          ctx.fillStyle = g.c; ctx.beginPath(); ctx.moveTo(g.x, g.y - 12); ctx.quadraticCurveTo(g.x + 6, g.y, g.x, g.y + 6); ctx.quadraticCurveTo(g.x - 6, g.y, g.x, g.y - 12); ctx.fill(); }
        for (let i = schizzi.length - 1; i >= 0; i--) {
          const s = schizzi[i]; s.vita += dt; if (s.vita > 12) { schizzi.splice(i, 1); continue; }
          const k = Math.min(1, s.vita * 5), e = 1 - Math.pow(1 - k, 3), a = s.vita < 9 ? 0.9 : 0.9 * (1 - (s.vita - 9) / 3);
          ctx.fillStyle = rgba(s.c, a);
          curvaChiusa(ctx, s.forma.map((q, n) => { const an = s.rot + n / s.forma.length * Math.PI * 2; return [s.x + Math.cos(an) * s.r * q * e, s.y + Math.sin(an) * s.r * q * e]; })); ctx.fill();
          s.bracci.forEach(b => { const L = s.r * b.L * e, x1 = s.x + Math.cos(b.a) * L, y1 = s.y + Math.sin(b.a) * L, cx = s.x + Math.cos(b.a + b.curva) * L * 0.6, cy = s.y + Math.sin(b.a + b.curva) * L * 0.6, w = s.r * b.w;
            const nx = -Math.sin(b.a), ny = Math.cos(b.a); ctx.beginPath(); ctx.moveTo(s.x + nx * w, s.y + ny * w); ctx.quadraticCurveTo(cx + nx * w * 0.5, cy + ny * w * 0.5, x1, y1); ctx.quadraticCurveTo(cx - nx * w * 0.5, cy - ny * w * 0.5, s.x - nx * w, s.y - ny * w); ctx.closePath(); ctx.fill();
            ctx.beginPath(); ctx.arc(x1, y1, w * 0.75, 0, 7); ctx.fill(); });
          s.gocc.forEach(([an, d, r]) => { ctx.beginPath(); ctx.arc(s.x + Math.cos(an) * s.r * d * e, s.y + Math.sin(an) * s.r * d * e, r, 0, 7); ctx.fill(); });
          ctx.fillStyle = `rgba(255,255,255,${0.35 * a})`; ctx.beginPath(); ctx.ellipse(s.x - s.r * 0.3, s.y - s.r * 0.3, s.r * 0.25 * e, s.r * 0.13 * e, -0.6, 0, 7); ctx.fill();
        }
      }
    };
  }

  /* ------------------------------------------------------------------ */
  /* TRASPORTI E LOGISTICA (biennio): paesaggio con cielo, ferrovia, strada a due corsie e mare;
     su ogni corsia i mezzi vanno alla stessa velocità e restano distanziati (niente sovrapposizioni) */
  function trasporti(W, H) {
    const piccolo = W < 600, k = piccolo ? 0.7 : 1;
    const yAria = H * 0.2, yTreno = H * 0.47, yS1 = H * 0.64, yS2 = H * 0.74, yMare = H * 0.88;
    const fondo = document.createElement("canvas"); fondo.width = W; fondo.height = H; const f = fondo.getContext("2d");
    const cielo = f.createLinearGradient(0, 0, 0, yTreno); cielo.addColorStop(0, "#cfe8fb"); cielo.addColorStop(1, "#eef7ff"); f.fillStyle = cielo; f.fillRect(0, 0, W, yTreno + 10);
    /* città lontana */
    f.fillStyle = "#c7d6e6"; for (let x = 0; x < W;) { const w = rnd(24, 60), h = rnd(30, 110); f.fillRect(x, yTreno - 30 - h, w, h + 30); x += w + rnd(0, 6); }
    f.fillStyle = "#b5c8db"; for (let x = 10; x < W; x += rnd(60, 140)) { const w = rnd(18, 34), h = rnd(70, 150); f.fillRect(x, yTreno - 30 - h, w, h + 30); }
    f.fillStyle = "rgba(255,255,255,.55)"; for (let i = 0; i < W / 8; i++) f.fillRect(rnd(0, W), rnd(yTreno - 160, yTreno - 40), 3, 4);
    /* terrapieno, ferrovia */
    f.fillStyle = "#9fcf8f"; f.fillRect(0, yTreno - 12, W, yS1 - yTreno - 30); f.fillStyle = "#a39a8c"; f.fillRect(0, yTreno + 2, W, 14);
    f.fillStyle = "#6d5a48"; for (let x = 0; x < W; x += 14) f.fillRect(x, yTreno + 4, 6, 10);
    f.fillStyle = "#555"; f.fillRect(0, yTreno + 4, W, 2.5); f.fillRect(0, yTreno + 11, W, 2.5);
    f.strokeStyle = "#7b8794"; f.lineWidth = 2; for (let x = 40; x < W; x += 160) { f.beginPath(); f.moveTo(x, yTreno + 4); f.lineTo(x, yTreno - 78 * k); f.lineTo(x + 18, yTreno - 78 * k); f.stroke(); }
    f.lineWidth = 1; f.beginPath(); f.moveTo(0, yTreno - 72 * k); f.lineTo(W, yTreno - 72 * k); f.stroke();
    /* strada */
    const sTop = yS1 - 46 * k, sBot = yS2 + 12; f.fillStyle = "#c9c2b5"; f.fillRect(0, sTop - 10, W, 10); f.fillRect(0, sBot, W, 10);
    f.fillStyle = "#5f6670"; f.fillRect(0, sTop, W, sBot - sTop); f.fillStyle = "#f4f4f4"; for (let x = 0; x < W; x += 60) f.fillRect(x, (yS1 + yS2) / 2 - 20 * k, 32, 4);
    f.fillStyle = "#9fcf8f"; f.fillRect(0, sBot + 10, W, yMare - sBot - 40);
    /* mare */
    const mare = f.createLinearGradient(0, yMare - 30, 0, H); mare.addColorStop(0, "#6fb8e6"); mare.addColorStop(1, "#2f7fbf"); f.fillStyle = mare; f.fillRect(0, yMare - 30, W, H);
    const corsie = [
      { y: yAria, dir: -1, v: 120, tipi: ["aereo"], gap: W * 0.5 }, { y: yTreno, dir: 1, v: 140, tipi: ["treno"], gap: W * 0.4 },
      { y: yS1, dir: -1, v: 95, tipi: ["auto", "auto", "camion", "bus"], gap: 50 }, { y: yS2, dir: 1, v: 110, tipi: ["auto", "auto", "camion", "bus"], gap: 50 },
      { y: yMare, dir: 1, v: 26, tipi: ["portacontainer", "traghetto"], gap: 160 }];
    const LUNG = { aereo: 165, treno: 520, auto: 80, camion: 150, bus: 130, portacontainer: 260, traghetto: 200 };
    corsie.forEach(c => { c.mezzi = []; let x = c.dir > 0 ? W + 50 : -50; while (c.dir > 0 ? x > -200 : x < W + 200) { const tipo = scegli(c.tipi), L = LUNG[tipo] * k; x -= c.dir * (L + c.gap + rnd(0, c.gap)); c.mezzi.push({ tipo, x, L: LUNG[tipo], col: scegli(["#e5484d", "#2a6db0", "#f2b705", "#2a7a52", "#ffffff", "#8a3b8f", "#ff7f2a"]) }); } });
    const nuvole = Array.from({ length: 6 }, () => ({ x: rnd(0, W), y: rnd(0.05, 0.35) * H, s: rnd(0.7, 1.3), v: rnd(5, 12) }));
    function ruota(ctx, x, y, r) { ctx.fillStyle = "#2b2b2b"; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.fillStyle = "#cfd4da"; ctx.beginPath(); ctx.arc(x, y, r * 0.45, 0, 7); ctx.fill(); }
    function finestrini(ctx, x0, y, n, w, h, passo) { ctx.fillStyle = "#9ed2f2"; for (let i = 0; i < n; i++) ctx.fillRect(x0 + i * passo, y, w, h); }
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
      else if (m.tipo === "auto") { ctx.fillStyle = m.col; ctx.beginPath(); ctx.moveTo(-80, -8); ctx.lineTo(-80, -22); ctx.lineTo(-62, -24); ctx.lineTo(-48, -38); ctx.lineTo(-22, -38); ctx.lineTo(-8, -24); ctx.lineTo(0, -21); ctx.lineTo(0, -8); ctx.closePath(); ctx.fill(); ctx.strokeStyle = "rgba(0,0,0,.25)"; ctx.lineWidth = 1; ctx.stroke();
        ctx.fillStyle = "#9ed2f2"; ctx.beginPath(); ctx.moveTo(-58, -24); ctx.lineTo(-46, -35); ctx.lineTo(-37, -35); ctx.lineTo(-37, -24); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(-33, -24); ctx.lineTo(-33, -35); ctx.lineTo(-24, -35); ctx.lineTo(-13, -24); ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#ffd34d"; ctx.fillRect(-4, -20, 4, 4); ruota(ctx, -62, -6, 8); ruota(ctx, -16, -6, 8); }
      else if (m.tipo === "portacontainer") { ctx.fillStyle = "#24303f"; ctx.beginPath(); ctx.moveTo(-260, -16); ctx.lineTo(0, -16); ctx.lineTo(-14, 10); ctx.lineTo(-250, 10); ctx.closePath(); ctx.fill(); ctx.fillStyle = "#c0392b"; ctx.fillRect(-250, 2, 238, 8);
        const CC = ["#e5484d", "#2a6db0", "#2a7a52", "#f2b705", "#ff7f2a", "#8a3b8f"]; for (let r = 0; r < 3; r++) for (let c = 0; c < 8; c++) { ctx.fillStyle = CC[(r * 3 + c * 5 + Math.floor(m.L)) % CC.length]; ctx.fillRect(-214 + c * 22, -30 - r * 13, 21, 12); }
        ctx.fillStyle = "#f4f4f4"; ctx.fillRect(-250, -54, 30, 38); finestrini(ctx, -246, -50, 3, 7, 5, 9); ctx.fillStyle = "#c0392b"; ctx.fillRect(-244, -66, 10, 12); }
      else { ctx.fillStyle = "#ffffff"; ctx.beginPath(); ctx.moveTo(-200, -16); ctx.lineTo(0, -16); ctx.lineTo(-16, 10); ctx.lineTo(-190, 10); ctx.closePath(); ctx.fill(); ctx.fillStyle = "#1f4fa3"; ctx.fillRect(-196, 0, 184, 6);
        ctx.fillStyle = "#f4f4f4"; ctx.fillRect(-170, -40, 140, 24); ctx.fillRect(-150, -56, 90, 16); finestrini(ctx, -164, -34, 12, 7, 6, 11); finestrini(ctx, -144, -51, 7, 7, 5, 11); ctx.fillStyle = "#e5484d"; ctx.fillRect(-100, -72, 14, 16); }
      ctx.restore();
    }
    return {
      disegna(ctx, t, dt) {
        ctx.drawImage(fondo, 0, 0, W, H);
        nuvole.forEach(n => { n.x -= n.v * dt; if (n.x < -120) n.x = W + 120; ctx.fillStyle = "rgba(255,255,255,.95)"; [[0, 0, 24], [-28, 8, 18], [28, 8, 20], [8, -12, 18]].forEach(([dx, dy, r]) => { ctx.beginPath(); ctx.arc(n.x + dx * n.s, n.y + dy * n.s, r * n.s, 0, 7); ctx.fill(); }); });
        ctx.strokeStyle = "rgba(255,255,255,.55)"; ctx.lineWidth = 1.5; for (let r = 0; r < 4; r++) { ctx.beginPath(); for (let x = 0; x <= W; x += 10) { const y = yMare + 14 + r * 16 + Math.sin(x / 30 + t * 1.5 + r) * 3; x ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); }
        corsie.forEach(c => {
          c.mezzi.forEach(m => { m.x += c.dir * c.v * dt; });
          /* esce un mezzo → ne entra uno nuovo solo se c'è spazio dietro l'ultimo */
          c.mezzi = c.mezzi.filter(m => c.dir > 0 ? m.x - m.L * k < W + 40 : m.x + m.L * k > -40);
          const ultimo = c.mezzi.reduce((u, m) => !u || (c.dir > 0 ? m.x < u.x : m.x > u.x) ? m : u, null);
          const spazio = !ultimo || (c.dir > 0 ? ultimo.x - ultimo.L * k > c.gap + rnd(0, c.gap) - 40 : W - (ultimo.x + ultimo.L * k) > c.gap + rnd(0, c.gap) - 40);
          if (spazio && Math.random() < dt * 2) { const tipo = scegli(c.tipi); c.mezzi.push({ tipo, x: c.dir > 0 ? -40 : W + 40, L: LUNG[tipo], col: scegli(["#e5484d", "#2a6db0", "#f2b705", "#2a7a52", "#ffffff", "#8a3b8f", "#ff7f2a"]) }); }
          c.mezzi.forEach(m => mezzo(ctx, m, c.y, c.dir));
        });
      }
    };
  }

  /* ------------------------------------------------------------------ */
  /* LOGISTICA: container che cadono e si impilano come nel Tetris */
  function logistica(W, H) {
    const COL = ["#b5562b", "#2a6db0", "#2a7a52", "#e8752a", "#7a7f87", "#d9a514", "#8a3b8f"];
    const cw = W < 600 ? 46 : 64, ch = Math.round(cw * 0.42), nc = Math.floor(W / cw), x0 = (W - nc * cw) / 2;
    const maxR = Math.max(4, Math.floor(H * 0.5 / ch)), base = H - 6;
    const griglia = []; // righe dal basso: array di celle {c, id} o null
    const cadono = [], svuota = []; let prossimo = 0;
    const riga = () => Array(nc).fill(null);
    /* si parte con qualche pila già formata */
    for (let r = 0; r < Math.min(3, maxR - 1); r++) { const R = riga(); for (let c = 0; c < nc; c++) if (Math.random() < 0.75 - r * 0.22 && (r === 0 || griglia[r - 1][c])) R[c] = { c: scegli(COL), primo: true, w: 1 }; griglia.push(R); }
    const altezza = col => { for (let r = griglia.length - 1; r >= 0; r--) if (griglia[r][col]) return r + 1; return 0; };
    function container(ctx, x, y, w, c, a) {
      ctx.fillStyle = rgba(c, 0.3 * a); ctx.strokeStyle = rgba(c, 0.7 * a); ctx.lineWidth = 1.3; ctx.fillRect(x + 1, y + 1, w - 2, ch - 2); ctx.strokeRect(x + 1, y + 1, w - 2, ch - 2);
      ctx.lineWidth = 0.8; ctx.beginPath(); for (let k = x + 6; k < x + w - 4; k += 5) { ctx.moveTo(k, y + 4); ctx.lineTo(k, y + ch - 4); } ctx.stroke();
    }
    return {
      disegna(ctx, t, dt) {
        prossimo -= dt;
        if (prossimo <= 0 && cadono.length < Math.max(3, Math.floor(nc / 4))) {
          prossimo = rnd(0.2, 0.55); const lungo = Math.random() < 0.4 && nc > 2, w = lungo ? 2 : 1, col = Math.floor(rnd(0, nc - w + 1));
          if (!cadono.some(f => f.col < col + w && col < f.col + f.w)) cadono.push({ col, w, y: -ch, v: rnd(120, 200), c: scegli(COL) });
        }
        for (let i = cadono.length - 1; i >= 0; i--) {
          const f = cadono[i]; let h = 0; for (let k = 0; k < f.w; k++) h = Math.max(h, altezza(f.col + k));
          const dest = base - (h + 1) * ch; f.y += f.v * dt;
          if (f.y >= dest) {
            while (griglia.length <= h) griglia.push(riga()); const id = Math.random();
            for (let k = 0; k < f.w; k++) griglia[h][f.col + k] = { c: f.c, id, primo: k === 0, w: f.w };
            cadono.splice(i, 1);
            griglia.forEach((r, ri) => { if (r.every(Boolean) && !svuota.includes(ri)) svuota.push(ri); });
            if (griglia.length >= maxR && !svuota.length) svuota.push(0);
            continue;
          }
          container(ctx, x0 + f.col * cw, f.y, f.w * cw, f.c, 1);
        }
        /* righe complete: lampeggiano e spariscono */
        if (svuota.length) { svuota.t = (svuota.t || 0) + dt; if (svuota.t > 0.6) { svuota.sort((a, b) => b - a).forEach(r => griglia.splice(r, 1)); svuota.length = 0; svuota.t = 0; } }
        griglia.forEach((r, ri) => r.forEach((cell, ci) => {
          if (!cell || !cell.primo) return; const a = svuota.includes(ri) ? 0.4 + 0.6 * Math.abs(Math.sin((svuota.t || 0) * 20)) : 1;
          container(ctx, x0 + ci * cw, base - (ri + 1) * ch, cell.w * cw, cell.c, a);
        }));
        ctx.strokeStyle = rgba("#7a7f87", 0.4); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, base + 1); ctx.lineTo(W, base + 1); ctx.stroke();
      }
    };
  }

  /* ------------------------------------------------------------------ */
  /* CONDUZIONE DEL MEZZO NAVALE (A): carta nautica + onde, navi e gabbiani */
  function navaleCarta(W, H) {
    const C = "#1f3260", B = "#2a86c9";
    const fondali = Array.from({ length: Math.round(W * H / 24000) }, () => [rnd(0, W), rnd(0, H * 0.75), String(Math.floor(rnd(8, 95)))]);
    const rotte = Array.from({ length: 2 }, (_, i) => ({ pts: Array.from({ length: 5 }, (_, k) => [W * (0.08 + k * 0.21), H * (0.25 + i * 0.25) + rnd(-50, 50)]), s: rnd(0, 1), v: 0.035 }));
    const navi = Array.from({ length: 3 }, () => ({ x: rnd(0, W), v: rnd(8, 18), s: rnd(0.6, 1) })), gabbiani = Array.from({ length: 5 }, () => ({ x: rnd(0, W), y: rnd(0.55, 0.75) * H, v: rnd(25, 45), f: rnd(0, 6) }));
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
        /* onde, navi all'orizzonte e gabbiani */
        const orizz = H * 0.84;
        navi.forEach(n => { n.x += n.v * dt; if (n.x > W + 80) n.x = -80; ctx.save(); ctx.translate(n.x, orizz + 2); ctx.scale(n.s, n.s); ctx.fillStyle = rgba(C, 0.25);
          ctx.beginPath(); ctx.moveTo(-40, -6); ctx.lineTo(40, -6); ctx.lineTo(32, 4); ctx.lineTo(-34, 4); ctx.closePath(); ctx.fill(); ctx.fillRect(-26, -16, 34, 10); ctx.fillRect(12, -22, 10, 16); ctx.restore(); });
        for (let r = 0; r < 4; r++) { ctx.strokeStyle = rgba(B, 0.35 - r * 0.05); ctx.lineWidth = 1.6; ctx.beginPath();
          for (let x = 0; x <= W; x += 8) { const y = orizz + 8 + r * 14 + Math.sin(x / (40 + r * 10) + t * (1.2 + r * 0.3) + r) * (3 + r); x ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); }
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
        const mx = W < 700 ? W * 0.18 : W * 0.07, my = W < 700 ? H * 0.36 : H * 0.24; ctx.fillStyle = "rgba(255,250,225,.85)"; ctx.beginPath(); ctx.arc(mx, my, 26, 0, 7); ctx.fill(); ctx.fillStyle = "#0f1b38"; ctx.beginPath(); ctx.arc(mx + 10, my - 6, 23, 0, 7); ctx.fill();
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

  /* NAVALE: di giorno la carta nautica, la sera e di notte (19–7) il faro */
  function navale(W, H) { const h = new Date().getHours(); return (h >= 19 || h < 7) ? navaleFaro(W, H) : navaleCarta(W, H); }

  const SCENE = { scientifico, "scienze-applicate": scienzeApplicate, tred, linguistico, classico, artistico, trasporti, logistica, navale, "navale-giorno": navaleCarta, "navale-faro": navaleFaro };

  /* ---------- motore: un solo ciclo di animazione per tutte le scene attive ---------- */
  const attive = [];
  const fermo = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function crea(el) {
    const nome = el.dataset.scena; if (!SCENE[nome]) return;
    const cv = document.createElement("canvas"); el.appendChild(cv); const ctx = cv.getContext("2d");
    const s = { el, cv, ctx, nome, t: 0 };
    function dim() { const dpr = Math.min(window.devicePixelRatio || 1, 1.5); s.W = innerWidth; s.H = innerHeight; cv.width = s.W * dpr; cv.height = s.H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); s.scena = SCENE[nome](s.W, s.H);
      const pg = el.closest(".pagina-tema"); if (pg) { pg.classList.toggle("scura", !!s.scena.scura); pg.style.paddingTop = s.scena.alto ? (s.scena.alto - 20) + "px" : ""; } }
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
