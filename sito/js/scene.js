/* =====================================================================
   SCENE ANIMATE DEGLI INDIRIZZI (disegnate su canvas, dietro ai contenuti)
   Ogni scena: function (W, H) → { disegna(ctx, t, dt) , scura? }
   t = secondi dall'avvio, dt = secondi dall'ultimo fotogramma.
   Le scene si fermano da sole quando si cambia pagina; con "riduci
   movimento" attivo si disegna un solo fotogramma fermo.
   ===================================================================== */
(function () {
  const rnd = (a, b) => a + Math.random() * (b - a);
  const scegli = a => a[Math.floor(Math.random() * a.length)];
  function rgba(hex, a) { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; }
  const SERIF = "'Times New Roman','Libro Serif',Times,serif";

  /* ------------------------------------------------------------------ */
  /* LICEO SCIENTIFICO: laboratorio, bolle, esplosioni da cui escono formule, atomi, pendolo */
  function scientifico(W, H) {
    const BLU = "#1f4fa3", liquidi = ["#2a7a52", "#2a86c9", "#b8322f", "#6b47b8", "#d9a514"];
    const FORMULE = ["E = mc²", "F = m · a", "a² + b² = c²", "PV = nRT", "v = Δs / Δt", "F = G · m₁m₂ / r²", "sin²x + cos²x = 1",
      "Q.E.D.", "C.V.D.", "∎", "2H₂ + O₂ → 2H₂O", "λ = c / f", "π ≈ 3,14159", "∫ f(x) dx", "E = h · f", "NaCl", "x = (−b ± √Δ) / 2a",
      "V = R · I", "CO₂", "e ≈ 2,718", "∑ 1/n² = π²/6", "Eppur si muove", "√2 ∉ ℚ", "Δ = b² − 4ac", "g ≈ 9,81 m/s²", "C₆H₁₂O₆"];
    const n = Math.max(3, Math.min(7, Math.floor(W / 230)));
    const fiale = Array.from({ length: n }, (_, i) => {
      const s = Math.min(130, H * 0.17) * rnd(0.8, 1.1);
      return { x: (i + 0.5) * W / n + rnd(-30, 30), y: H - 12, s, tipo: ["beuta", "provetta", "pallone"][i % 3], c: liquidi[i % liquidi.length] };
    });
    const bolle = [], formule = [], scoppi = [];
    const atomi = Array.from({ length: Math.max(2, Math.floor(W / 500)) }, () => ({ x: rnd(0.1, 0.9) * W, y: rnd(0.15, 0.6) * H, r: rnd(30, 55), vx: rnd(-8, 8), vy: rnd(-5, 5), f: rnd(0, 6) }));
    let prossimo = 0.6;
    function bocca(f) { return { x: f.x, y: f.y - (f.tipo === "provetta" ? f.s : f.s * 0.95) }; }
    function fiala(ctx, f) {
      const { x, y, s } = f; ctx.save(); ctx.lineWidth = 1.6; ctx.strokeStyle = rgba(BLU, 0.32); ctx.fillStyle = rgba(f.c, 0.13);
      ctx.beginPath();
      if (f.tipo === "beuta") { const w = s * 0.42; ctx.moveTo(x - s * 0.09, y - s * 0.95); ctx.lineTo(x - s * 0.09, y - s * 0.55); ctx.lineTo(x - w, y); ctx.lineTo(x + w, y); ctx.lineTo(x + s * 0.09, y - s * 0.55); ctx.lineTo(x + s * 0.09, y - s * 0.95); }
      else if (f.tipo === "provetta") { const w = s * 0.11; ctx.moveTo(x - w, y - s); ctx.lineTo(x - w, y - w); ctx.arc(x, y - w, w, Math.PI, 0, true); ctx.lineTo(x + w, y - s); }
      else { const r = s * 0.32; ctx.moveTo(x - s * 0.08, y - s * 0.95); ctx.lineTo(x - s * 0.08, y - r * 1.9); ctx.arc(x, y - r, r, -Math.PI / 2 - 0.25, -Math.PI / 2 + 0.25 + Math.PI * 2 - 0.5, true); ctx.lineTo(x + s * 0.08, y - s * 0.95); }
      ctx.stroke();
      /* liquido */
      ctx.beginPath();
      if (f.tipo === "beuta") { const w = s * 0.42, h = s * 0.4; ctx.moveTo(x - w, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w * (1 - h / s / 0.45 * 0.45), y - h); ctx.lineTo(x - w * (1 - h / s / 0.45 * 0.45), y - h); }
      else if (f.tipo === "provetta") { const w = s * 0.11; ctx.moveTo(x - w, y - s * 0.5); ctx.lineTo(x - w, y - w); ctx.arc(x, y - w, w, Math.PI, 0, true); ctx.lineTo(x + w, y - s * 0.5); }
      else { const r = s * 0.32; ctx.arc(x, y - r, r * 0.92, 0.2, Math.PI - 0.2); }
      ctx.closePath(); ctx.fill(); ctx.restore();
    }
    function atomo(ctx, a, t) {
      ctx.save(); ctx.translate(a.x, a.y); ctx.strokeStyle = rgba(BLU, 0.22); ctx.lineWidth = 1.2;
      for (let k = 0; k < 3; k++) {
        ctx.save(); ctx.rotate(k * Math.PI / 3 + a.f); ctx.beginPath(); ctx.ellipse(0, 0, a.r, a.r * 0.36, 0, 0, Math.PI * 2); ctx.stroke();
        const u = t * (1.2 + k * 0.3) + k * 2; ctx.fillStyle = rgba(BLU, 0.45); ctx.beginPath(); ctx.arc(Math.cos(u) * a.r, Math.sin(u) * a.r * 0.36, 2.6, 0, 7); ctx.fill(); ctx.restore();
      }
      ctx.fillStyle = rgba("#b8322f", 0.35); ctx.beginPath(); ctx.arc(0, 0, 4.5, 0, 7); ctx.fill(); ctx.restore();
    }
    return {
      disegna(ctx, t, dt) {
        /* pendolo di Galileo */
        const px = W * 0.88, L = Math.min(H * 0.32, 230), ang = 0.45 * Math.sin(t * 1.4);
        ctx.strokeStyle = rgba(BLU, 0.2); ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(px, 0, L, Math.PI / 2 - 0.47, Math.PI / 2 + 0.47); ctx.setLineDash([3, 6]); ctx.stroke(); ctx.setLineDash([]);
        const bx = px + Math.sin(ang) * L, by = Math.cos(ang) * L;
        ctx.strokeStyle = rgba(BLU, 0.35); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(bx, by); ctx.stroke();
        ctx.fillStyle = rgba(BLU, 0.3); ctx.beginPath(); ctx.arc(bx, by, 9, 0, 7); ctx.fill();
        atomi.forEach(a => { a.x += a.vx * dt; a.y += a.vy * dt; if (a.x < 40 || a.x > W - 40) a.vx *= -1; if (a.y < 60 || a.y > H * 0.7) a.vy *= -1; atomo(ctx, a, t); });
        /* bolle */
        fiale.forEach(f => { if (Math.random() < dt * 3) { const b = bocca(f); bolle.push({ x: b.x + rnd(-3, 3), y: b.y, r: rnd(2, 6), v: rnd(25, 60), f: rnd(0, 6), c: f.c, vita: 0 }); } });
        for (let i = bolle.length - 1; i >= 0; i--) {
          const b = bolle[i]; b.vita += dt; b.y -= b.v * dt; const x = b.x + Math.sin(b.vita * 3 + b.f) * 6;
          const a = Math.max(0, 0.4 - b.vita * 0.08); if (a <= 0) { bolle.splice(i, 1); continue; }
          ctx.strokeStyle = rgba(b.c, a); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(x, b.y, b.r, 0, 7); ctx.stroke();
        }
        /* esplosioni con formule */
        prossimo -= dt;
        if (prossimo <= 0 && formule.length < 14) {
          prossimo = rnd(0.6, 1.6); const f = scegli(fiale), b = bocca(f);
          scoppi.push({ x: b.x, y: b.y - 10, vita: 0, c: f.c, s: Array.from({ length: 9 }, () => [rnd(0, 7), rnd(30, 70)]) });
          formule.push({ testo: scegli(FORMULE), x: b.x, y: b.y - 20, vx: rnd(-14, 14), vy: rnd(-34, -22), vita: 0, size: rnd(17, 30), c: Math.random() < 0.5 ? BLU : f.c });
        }
        for (let i = scoppi.length - 1; i >= 0; i--) {
          const s = scoppi[i]; s.vita += dt; if (s.vita > 1.2) { scoppi.splice(i, 1); continue; }
          const k = s.vita / 1.2, a = 0.35 * (1 - k);
          ctx.fillStyle = rgba(s.c, a * 0.5); for (let j = 0; j < 5; j++) { ctx.beginPath(); ctx.arc(s.x + Math.cos(j * 1.3) * 14 * k, s.y - 10 * k + Math.sin(j * 1.3) * 10 * k, 10 + 18 * k, 0, 7); ctx.fill(); }
          ctx.strokeStyle = rgba(s.c, a); ctx.lineWidth = 1.5;
          s.s.forEach(([ang, L]) => { ctx.beginPath(); ctx.moveTo(s.x + Math.cos(ang) * L * k * 0.5, s.y + Math.sin(ang) * L * k * 0.5); ctx.lineTo(s.x + Math.cos(ang) * L * k, s.y + Math.sin(ang) * L * k); ctx.stroke(); });
        }
        ctx.textAlign = "center";
        for (let i = formule.length - 1; i >= 0; i--) {
          const f = formule[i]; f.vita += dt; f.x += f.vx * dt; f.y += f.vy * dt;
          const a = f.vita < 0.8 ? f.vita / 0.8 : Math.max(0, 1 - (f.vita - 0.8) / 9);
          if (a <= 0 || f.y < -40) { formule.splice(i, 1); continue; }
          ctx.font = `italic ${f.size * Math.min(1, 0.4 + f.vita)}px ${SERIF}`; ctx.fillStyle = rgba(f.c, 0.42 * a); ctx.fillText(f.testo, f.x, f.y);
        }
        fiale.forEach(f => fiala(ctx, f));
      }
    };
  }

  /* ------------------------------------------------------------------ */
  /* SCIENZE APPLICATE: pioggia binaria (stile Matrix), rete neurale, circuito con impulsi */
  function scienzeApplicate(W, H) {
    const VERDE = "#1e8c50", TEAL = "#1f6f8b", passo = 20;
    const colonne = Array.from({ length: Math.ceil(W / passo) }, (_, i) => ({ x: i * passo + 6, y: rnd(-H, H), v: rnd(50, 140), L: Math.floor(rnd(8, 22)), ch: Array.from({ length: 24 }, () => Math.random() < 0.5 ? "0" : "1"), on: Math.random() < 0.55 }));
    const nodi = Array.from({ length: Math.round(Math.min(46, W * H / 26000)) }, () => ({ x: rnd(0, W), y: rnd(0, H), vx: rnd(-14, 14), vy: rnd(-14, 14) }));
    const impulsi = [];
    /* piste del circuito ai due lati */
    function pista(lato) {
      const pts = []; let x = lato < 0 ? 0 : W, y = rnd(80, H - 40); pts.push([x, y]);
      const zona = Math.min(W * 0.2, 230);
      for (let k = 0; k < 4; k++) {
        if (k % 2 === 0) x = lato < 0 ? rnd(x + 30, Math.min(x + 90, zona)) : rnd(Math.max(x - 90, W - zona), x - 30);
        else y += rnd(-90, 90);
        pts.push([x, y]);
      }
      let L = 0; for (let i = 1; i < pts.length; i++) L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
      return { pts, L, p: rnd(0, 1), v: rnd(0.15, 0.4) };
    }
    const piste = [...Array.from({ length: 7 }, () => pista(-1)), ...Array.from({ length: 7 }, () => pista(1))];
    function punto(p, s) { let d = s * p.L; for (let i = 1; i < p.pts.length; i++) { const [x0, y0] = p.pts[i - 1], [x1, y1] = p.pts[i], l = Math.hypot(x1 - x0, y1 - y0); if (d <= l) return [x0 + (x1 - x0) * d / l, y0 + (y1 - y0) * d / l]; d -= l; } return p.pts[p.pts.length - 1]; }
    return {
      disegna(ctx, t, dt) {
        ctx.font = `15px ${SERIF}`; ctx.textAlign = "center";
        colonne.forEach(c => {
          if (!c.on) return; c.y += c.v * dt; if (c.y - c.L * passo > H) { c.y = rnd(-200, 0); c.v = rnd(50, 140); }
          if (Math.random() < dt * 4) c.ch[Math.floor(Math.random() * c.ch.length)] = Math.random() < 0.5 ? "0" : "1";
          for (let k = 0; k < c.L; k++) { const y = c.y - k * passo; if (y < -20 || y > H + 20) continue; ctx.fillStyle = rgba(VERDE, k === 0 ? 0.5 : 0.28 * (1 - k / c.L)); ctx.fillText(c.ch[k % c.ch.length], c.x, y); }
        });
        /* circuito */
        piste.forEach(p => {
          ctx.strokeStyle = rgba(TEAL, 0.25); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(...p.pts[0]); p.pts.slice(1).forEach(q => ctx.lineTo(...q)); ctx.stroke();
          const f = p.pts[p.pts.length - 1]; ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(f[0], f[1], 4.5, 0, 7); ctx.fill(); ctx.stroke();
          p.p = (p.p + p.v * dt) % 1; const [x, y] = punto(p, p.p);
          const g = ctx.createRadialGradient(x, y, 0, x, y, 14); g.addColorStop(0, rgba("#2a86c9", 0.75)); g.addColorStop(1, rgba("#2a86c9", 0));
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 14, 0, 7); ctx.fill();
        });
        /* rete neurale */
        nodi.forEach(n => { n.x += n.vx * dt; n.y += n.vy * dt; if (n.x < 0 || n.x > W) n.vx *= -1; if (n.y < 0 || n.y > H) n.vy *= -1; });
        const R = 170;
        for (let i = 0; i < nodi.length; i++) for (let j = i + 1; j < nodi.length; j++) {
          const a = nodi[i], b = nodi[j], d = Math.hypot(a.x - b.x, a.y - b.y); if (d > R) continue;
          ctx.strokeStyle = rgba(TEAL, 0.28 * (1 - d / R)); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          if (Math.random() < dt * 0.25) impulsi.push({ a, b, s: 0 });
        }
        for (let i = impulsi.length - 1; i >= 0; i--) {
          const p = impulsi[i]; p.s += dt * 1.4; if (p.s >= 1) { impulsi.splice(i, 1); continue; }
          const x = p.a.x + (p.b.x - p.a.x) * p.s, y = p.a.y + (p.b.y - p.a.y) * p.s; ctx.fillStyle = rgba("#2a86c9", 0.7); ctx.beginPath(); ctx.arc(x, y, 2.6, 0, 7); ctx.fill();
        }
        nodi.forEach(n => { ctx.fillStyle = "#fff"; ctx.strokeStyle = rgba(TEAL, 0.5); ctx.lineWidth = 1.4; ctx.beginPath(); ctx.arc(n.x, n.y, 4, 0, 7); ctx.fill(); ctx.stroke(); });
      }
    };
  }

  /* ------------------------------------------------------------------ */
  /* TRED: sole, pale eoliche, vento, foglie che diventano pixel e bit, ciclo dell'acqua */
  function tred(W, H) {
    const VERDE = "#2a7a52", BLU = "#2a86c9", GIALLO = "#d9a514", VIOLA = "#5a3fa8";
    const pale = Array.from({ length: W > 700 ? 3 : 2 }, (_, i) => { const h = Math.min(H * 0.32, 260) * (1 - i * 0.18); return { x: W * (0.62 + i * 0.13), y: H, h, v: rnd(0.9, 1.6), a: rnd(0, 6) }; });
    const foglie = [], pixel = [], vento = Array.from({ length: 9 }, () => ({ x: rnd(-W, W), y: rnd(0.15, 0.75) * H, L: rnd(80, 200), v: rnd(120, 220), f: rnd(0, 6) }));
    const vapore = [], pioggia = [];
    const nuvola = { x: W * 0.2, y: W < 700 ? H * 0.42 : H * 0.2 };
    return {
      disegna(ctx, t, dt) {
        /* sole */
        const sx = W * 0.1, sy = W < 700 ? H * 0.3 : H * 0.12;
        ctx.save(); ctx.translate(sx, sy); ctx.rotate(t * 0.1); ctx.strokeStyle = rgba(GIALLO, 0.45); ctx.lineWidth = 2;
        for (let k = 0; k < 12; k++) { ctx.rotate(Math.PI / 6); ctx.beginPath(); ctx.moveTo(40, 0); ctx.lineTo(58 + 6 * Math.sin(t * 2 + k), 0); ctx.stroke(); }
        ctx.restore(); ctx.fillStyle = rgba(GIALLO, 0.22); ctx.beginPath(); ctx.arc(sx, sy, 32, 0, 7); ctx.fill();
        /* ciclo dell'acqua: mare a sinistra, vapore, nuvola, pioggia */
        const mareY = H - 30;
        ctx.strokeStyle = rgba(BLU, 0.35); ctx.lineWidth = 1.5;
        for (let r = 0; r < 3; r++) { ctx.beginPath(); for (let x = 0; x <= W * 0.42; x += 8) { const y = mareY + r * 9 + Math.sin(x / 30 + t * 1.5 + r) * 3; x ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); }
        if (Math.random() < dt * 5) vapore.push({ x: rnd(10, W * 0.38), y: mareY, vita: 0 });
        for (let i = vapore.length - 1; i >= 0; i--) { const v = vapore[i]; v.vita += dt; v.y -= 30 * dt; v.x += (nuvola.x - v.x) * dt * 0.08; const a = 0.3 * Math.min(1, v.vita) * Math.max(0, 1 - (mareY - v.y) / (mareY - nuvola.y - 20)); if (a <= 0.01 && v.vita > 1) { vapore.splice(i, 1); continue; } ctx.fillStyle = rgba(BLU, a); ctx.beginPath(); ctx.arc(v.x + Math.sin(v.vita * 3) * 4, v.y, 2.2, 0, 7); ctx.fill(); }
        nuvola.x = W * 0.22 + Math.sin(t * 0.15) * W * 0.05;
        ctx.fillStyle = rgba("#7d8a99", 0.16);
        [[0, 0, 34], [-36, 10, 24], [34, 8, 26], [12, -18, 24], [-14, -12, 20]].forEach(([dx, dy, r]) => { ctx.beginPath(); ctx.arc(nuvola.x + dx, nuvola.y + dy, r, 0, 7); ctx.fill(); });
        if (Math.random() < dt * 14) pioggia.push({ x: nuvola.x + rnd(-45, 45), y: nuvola.y + 25 });
        ctx.strokeStyle = rgba(BLU, 0.35); ctx.lineWidth = 1.3;
        for (let i = pioggia.length - 1; i >= 0; i--) { const p = pioggia[i]; p.y += 260 * dt; if (p.y > mareY) { pioggia.splice(i, 1); continue; } ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - 2, p.y + 8); ctx.stroke(); }
        /* vento */
        vento.forEach(v => { v.x += v.v * dt; if (v.x > W + 50) { v.x = -v.L - rnd(0, W * 0.5); v.y = rnd(0.15, 0.75) * H; }
          ctx.strokeStyle = rgba(VERDE, 0.18); ctx.lineWidth = 1.2; ctx.beginPath();
          for (let k = 0; k <= v.L; k += 8) { const y = v.y + Math.sin((v.x + k) / 40 + v.f) * 6; k ? ctx.lineTo(v.x + k, y) : ctx.moveTo(v.x, y); } ctx.stroke(); });
        /* pale eoliche */
        pale.forEach(p => {
          const top = p.y - p.h; ctx.strokeStyle = rgba(VIOLA, 0.35); ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(p.x - 5, p.y); ctx.lineTo(p.x - 1.5, top); ctx.lineTo(p.x + 1.5, top); ctx.lineTo(p.x + 5, p.y); ctx.stroke();
          p.a += p.v * dt; ctx.save(); ctx.translate(p.x, top); ctx.rotate(p.a); ctx.fillStyle = rgba(VIOLA, 0.22);
          for (let k = 0; k < 3; k++) { ctx.rotate(Math.PI * 2 / 3); ctx.beginPath(); ctx.moveTo(0, -3); ctx.quadraticCurveTo(p.h * 0.18, -7, p.h * 0.45, 0); ctx.quadraticCurveTo(p.h * 0.18, 4, 0, 3); ctx.fill(); ctx.stroke(); }
          ctx.restore(); ctx.fillStyle = rgba(VIOLA, 0.45); ctx.beginPath(); ctx.arc(p.x, top, 4, 0, 7); ctx.fill();
        });
        /* foglie → pixel e bit */
        if (Math.random() < dt * 1.6 && foglie.length < 22) foglie.push({ x: -20, y: rnd(0.1, 0.7) * H, v: rnd(60, 120), f: rnd(0, 6), r: rnd(0, 6), s: rnd(9, 16), lim: rnd(0.45, 0.9) * W, c: scegli([VERDE, "#5f9e3a", "#8aa62a", "#c27c2c"]) });
        for (let i = foglie.length - 1; i >= 0; i--) {
          const f = foglie[i]; f.x += f.v * dt; f.y += (Math.sin(t * 2 + f.f) * 30 + 18) * dt; f.r += dt * 1.5;
          if (f.x > f.lim) {
            for (let k = 0; k < 9; k++) pixel.push({ x: f.x + rnd(-f.s, f.s), y: f.y + rnd(-f.s, f.s) / 2, vx: rnd(20, 70), vy: rnd(-25, 25), vita: 0, bit: Math.random() < 0.45 ? (Math.random() < 0.5 ? "0" : "1") : null, c: k % 2 ? f.c : BLU, s: rnd(3, 6) });
            foglie.splice(i, 1); continue;
          }
          ctx.save(); ctx.translate(f.x, f.y); ctx.rotate(Math.sin(f.r) * 0.9); ctx.fillStyle = rgba(f.c, 0.35); ctx.strokeStyle = rgba(f.c, 0.55); ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(-f.s, 0); ctx.quadraticCurveTo(0, -f.s * 0.75, f.s, 0); ctx.quadraticCurveTo(0, f.s * 0.75, -f.s, 0); ctx.fill(); ctx.beginPath(); ctx.moveTo(-f.s * 1.2, 0); ctx.lineTo(f.s, 0); ctx.stroke(); ctx.restore();
        }
        ctx.font = `13px ${SERIF}`; ctx.textAlign = "center";
        for (let i = pixel.length - 1; i >= 0; i--) {
          const p = pixel[i]; p.vita += dt; p.x += p.vx * dt; p.y += p.vy * dt; const a = 0.5 * (1 - p.vita / 2.5); if (a <= 0) { pixel.splice(i, 1); continue; }
          ctx.fillStyle = rgba(p.c, a); if (p.bit) ctx.fillText(p.bit, p.x, p.y); else ctx.fillRect(p.x, p.y, p.s, p.s);
        }
      }
    };
  }

  /* ------------------------------------------------------------------ */
  /* LINGUISTICO: mappa del mondo a puntini, rotte di volo, saluti nelle lingue delle città */
  const CONTINENTI = [
    [[-165, 60], [-160, 70], [-125, 70], [-95, 73], [-80, 68], [-62, 58], [-55, 50], [-66, 44], [-75, 38], [-80, 31], [-81, 25], [-87, 30], [-97, 27], [-97, 20], [-88, 16], [-80, 8], [-92, 14], [-105, 20], [-112, 29], [-118, 34], [-124, 40], [-124, 48], [-135, 58], [-150, 60]],
    [[-55, 60], [-45, 60], [-20, 70], [-20, 80], [-60, 82], [-70, 77], [-55, 68]],
    [[-80, 8], [-62, 10], [-50, 0], [-35, -5], [-39, -15], [-48, -26], [-58, -38], [-65, -55], [-72, -50], [-74, -40], [-71, -20], [-81, -5], [-78, 2]],
    [[-10, 36], [-9, 43], [-2, 44], [-5, 48], [3, 51], [8, 54], [5, 58], [10, 64], [25, 71], [40, 67], [60, 70], [80, 73], [110, 77], [140, 73], [170, 70], [180, 66], [160, 60], [140, 55], [135, 43], [127, 40], [122, 30], [110, 20], [105, 10], [100, 13], [98, 8], [92, 20], [80, 15], [77, 8], [72, 20], [60, 25], [50, 30], [48, 28], [55, 25], [58, 20], [52, 15], [43, 13], [35, 28], [33, 31], [36, 36], [28, 36], [26, 40], [23, 36], [20, 40], [18, 40], [16, 38], [12, 44], [8, 44], [3, 43], [-5, 36]],
    [[-17, 21], [-10, 30], [-6, 36], [10, 37], [20, 32], [32, 31], [35, 28], [43, 12], [51, 12], [40, -5], [40, -15], [35, -25], [20, -35], [17, -28], [12, -15], [13, -5], [8, 4], [-5, 5], [-15, 10]],
    [[114, -22], [122, -17], [131, -12], [137, -12], [142, -11], [146, -18], [153, -26], [150, -37], [140, -38], [132, -32], [115, -34]],
    [[-6, 50], [2, 51], [0, 53], [-3, 58], [-6, 57], [-5, 54]], [[130, 31], [135, 34], [141, 40], [142, 45], [139, 38], [132, 33]],
    [[95, 5], [105, -6], [115, -8], [120, -5], [110, 2], [100, 3]], [[44, -13], [50, -15], [48, -25], [44, -22]], [[167, -46], [174, -41], [178, -37], [172, -43]]
  ];
  const CITTA = [["Londra", -0.1, 51.5, "Hello"], ["Parigi", 2.3, 48.9, "Bonjour"], ["Madrid", -3.7, 40.4, "Hola"], ["Berlino", 13.4, 52.5, "Hallo"], ["Roma", 12.5, 41.9, "Ciao"],
    ["Lisbona", -9.1, 38.7, "Olá"], ["Mosca", 37.6, 55.8, "Привет"], ["Pechino", 116.4, 39.9, "你好"], ["Tokyo", 139.7, 35.7, "こんにちは"], ["Il Cairo", 31.2, 30, "مرحبا"],
    ["Atene", 23.7, 38, "Γειά σου"], ["New York", -74, 40.7, "Hello"], ["Città del Messico", -99.1, 19.4, "Hola"], ["Rio de Janeiro", -43.2, -22.9, "Olá"], ["Nairobi", 36.8, -1.3, "Jambo"],
    ["Nuova Delhi", 77.2, 28.6, "नमस्ते"], ["Sydney", 151.2, -33.9, "G'day"], ["Buenos Aires", -58.4, -34.6, "Hola"], ["Montréal", -73.6, 45.5, "Bonjour"], ["Seul", 127, 37.6, "안녕하세요"], ["Istanbul", 29, 41, "Merhaba"], ["Stoccolma", 18, 59.3, "Hej"]];
  function dentro(px, py, poly) { let s = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if ((yi > py) !== (yj > py) && px < (xj - xi) * (py - yi) / (yj - yi) + xi) s = !s; } return s; }
  function linguistico(W, H) {
    const VERDE = "#2a7a52";
    const sc = Math.max(W / 360, H * 0.78 / 138), cx = W / 2 - (15 + 180) * sc + 180 * sc - 15 * sc + (W / 360 >= H * 0.78 / 138 ? 15 * sc : 0);
    const ox = W / 360 >= H * 0.78 / 138 ? 0 : W / 2 - (180 + 15) * sc; // se la mappa è più larga dello schermo, centra sull'Europa
    const oy = (H - 138 * sc) / 2 + 10;
    const P = (lon, lat) => [ox + (lon + 180) * sc, oy + (80 - lat) * sc];
    void cx;
    const mappa = document.createElement("canvas"); mappa.width = W; mappa.height = H; const m = mappa.getContext("2d");
    const passo = Math.max(7, Math.round(W / 150));
    m.fillStyle = rgba(VERDE, 0.22);
    for (let y = 0; y < H; y += passo) for (let x = 0; x < W; x += passo) {
      const lon = (x - ox) / sc - 180, lat = 80 - (y - oy) / sc; if (lat < -58 || lat > 83) continue;
      if (CONTINENTI.some(c => dentro(lon, lat, c))) { m.beginPath(); m.arc(x, y, passo * 0.2, 0, 7); m.fill(); }
    }
    const rotte = [], saluti = []; let prossima = 0.2;
    return {
      disegna(ctx, t, dt) {
        ctx.drawImage(mappa, 0, 0, W, H);
        CITTA.forEach(c => { const [x, y] = P(c[1], c[2]); ctx.fillStyle = rgba(VERDE, 0.45); ctx.beginPath(); ctx.arc(x, y, 2.6, 0, 7); ctx.fill(); });
        prossima -= dt;
        if (prossima <= 0 && rotte.length < 6) {
          prossima = rnd(0.7, 1.5); const a = scegli(CITTA); let b = scegli(CITTA); while (b === a) b = scegli(CITTA);
          const [x0, y0] = P(a[1], a[2]), [x1, y1] = P(b[1], b[2]), d = Math.hypot(x1 - x0, y1 - y0);
          rotte.push({ x0, y0, x1, y1, qx: (x0 + x1) / 2, qy: (y0 + y1) / 2 - Math.min(d * 0.35, 160), s: 0, v: 280 / Math.max(d, 80), b, fine: 0 });
        }
        for (let i = rotte.length - 1; i >= 0; i--) {
          const r = rotte[i]; if (r.s < 1) { r.s = Math.min(1, r.s + r.v * dt); if (r.s >= 1) saluti.push({ x: r.x1, y: r.y1, testo: r.b[3], vita: 0 }); } else r.fine += dt;
          const a = 0.5 * Math.max(0, 1 - r.fine / 1.5); if (a <= 0) { rotte.splice(i, 1); continue; }
          ctx.strokeStyle = rgba(VERDE, a); ctx.lineWidth = 1.4; ctx.setLineDash([5, 5]); ctx.beginPath(); ctx.moveTo(r.x0, r.y0);
          const N = 30; for (let k = 1; k <= N * r.s; k++) { const u = k / N; ctx.lineTo((1 - u) * (1 - u) * r.x0 + 2 * u * (1 - u) * r.qx + u * u * r.x1, (1 - u) * (1 - u) * r.y0 + 2 * u * (1 - u) * r.qy + u * u * r.y1); } ctx.stroke(); ctx.setLineDash([]);
          if (r.s < 1) { const u = r.s, x = (1 - u) * (1 - u) * r.x0 + 2 * u * (1 - u) * r.qx + u * u * r.x1, y = (1 - u) * (1 - u) * r.y0 + 2 * u * (1 - u) * r.qy + u * u * r.y1;
            const dx = 2 * (1 - u) * (r.qx - r.x0) + 2 * u * (r.x1 - r.qx), dy = 2 * (1 - u) * (r.qy - r.y0) + 2 * u * (r.y1 - r.qy);
            ctx.save(); ctx.translate(x, y); ctx.rotate(Math.atan2(dy, dx)); ctx.fillStyle = rgba(VERDE, 0.7); ctx.beginPath(); ctx.moveTo(9, 0); ctx.lineTo(-6, -5); ctx.lineTo(-3, 0); ctx.lineTo(-6, 5); ctx.closePath(); ctx.fill(); ctx.restore(); }
        }
        ctx.textAlign = "center";
        for (let i = saluti.length - 1; i >= 0; i--) {
          const s = saluti[i]; s.vita += dt; const a = s.vita < 0.4 ? s.vita / 0.4 : Math.max(0, 1 - (s.vita - 0.4) / 3); if (a <= 0) { saluti.splice(i, 1); continue; }
          const k = Math.min(1, 0.5 + s.vita * 1.5); ctx.font = `italic ${Math.round(24 * k)}px ${SERIF}`; ctx.fillStyle = rgba(VERDE, 0.65 * a); ctx.fillText(s.testo, s.x, s.y - 12 - s.vita * 6);
          ctx.strokeStyle = rgba(VERDE, 0.5 * a); ctx.beginPath(); ctx.arc(s.x, s.y, 4 + s.vita * 10, 0, 7); ctx.stroke();
        }
      }
    };
  }

  /* ------------------------------------------------------------------ */
  /* CLASSICO: colonne ioniche ai lati, capitelli, anfore e alloro che fluttuano, meandro greco che scorre */
  function classico(W, H) {
    const OCRA = "#8a5a1f";
    function voluta(ctx, x, y, r, verso) { ctx.beginPath(); for (let a = 0; a < Math.PI * 4; a += 0.15) { const rr = r * (1 - a / (Math.PI * 4.4)); const xx = x + verso * Math.cos(a) * rr, yy = y + Math.sin(a) * rr; a ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); }
    function capitello(ctx, x, y, w) { ctx.strokeRect(x - w / 2, y, w, w * 0.08); ctx.beginPath(); ctx.moveTo(x - w * 0.42, y + w * 0.08); ctx.quadraticCurveTo(x, y + w * 0.32, x + w * 0.42, y + w * 0.08); ctx.stroke(); voluta(ctx, x - w * 0.38, y + w * 0.2, w * 0.13, 1); voluta(ctx, x + w * 0.38, y + w * 0.2, w * 0.13, -1); }
    function colonna(ctx, x, top, bottom, w) {
      ctx.save(); ctx.strokeStyle = rgba(OCRA, 0.3); ctx.lineWidth = 1.4; capitello(ctx, x, top, w * 1.6);
      const y0 = top + w * 0.45; ctx.strokeRect(x - w / 2, y0, w, bottom - y0 - w * 0.25);
      for (let k = 1; k < 6; k++) { ctx.beginPath(); ctx.moveTo(x - w / 2 + k * w / 6, y0 + 6); ctx.lineTo(x - w / 2 + k * w / 6, bottom - w * 0.3); ctx.stroke(); }
      ctx.strokeRect(x - w * 0.65, bottom - w * 0.25, w * 1.3, w * 0.12); ctx.strokeRect(x - w * 0.8, bottom - w * 0.13, w * 1.6, w * 0.13); ctx.restore();
    }
    function anfora(ctx, s) {
      ctx.beginPath(); ctx.moveTo(-s * 0.18, -s); ctx.lineTo(s * 0.18, -s); ctx.moveTo(-s * 0.12, -s); ctx.lineTo(-s * 0.12, -s * 0.7);
      ctx.bezierCurveTo(-s * 0.6, -s * 0.5, -s * 0.55, s * 0.4, -s * 0.08, s * 0.85); ctx.lineTo(s * 0.08, s * 0.85); ctx.bezierCurveTo(s * 0.55, s * 0.4, s * 0.6, -s * 0.5, s * 0.12, -s * 0.7); ctx.lineTo(s * 0.12, -s);
      ctx.moveTo(-s * 0.12, -s * 0.85); ctx.bezierCurveTo(-s * 0.45, -s * 0.9, -s * 0.45, -s * 0.5, -s * 0.33, -s * 0.45); ctx.moveTo(s * 0.12, -s * 0.85); ctx.bezierCurveTo(s * 0.45, -s * 0.9, s * 0.45, -s * 0.5, s * 0.33, -s * 0.45);
      ctx.moveTo(-s * 0.4, -s * 0.1); ctx.lineTo(s * 0.4, -s * 0.1); ctx.moveTo(-s * 0.42, s * 0.05); ctx.lineTo(s * 0.42, s * 0.05); ctx.stroke();
      ctx.beginPath(); for (let x = -s * 0.36; x < s * 0.34; x += s * 0.12) { ctx.moveTo(x, s * 0.03); ctx.lineTo(x, -s * 0.07); ctx.lineTo(x + s * 0.08, -s * 0.07); ctx.lineTo(x + s * 0.08, -s * 0.0); ctx.lineTo(x + s * 0.04, -s * 0.0); } ctx.stroke();
    }
    function alloro(ctx, s) { ctx.beginPath(); ctx.arc(0, 0, s, Math.PI * 0.15, Math.PI * 0.85, true); ctx.stroke(); for (let k = 0; k < 9; k++) { const a = Math.PI * (0.85 + k * 0.155); [1, -1].forEach(lato => { const x = Math.cos(a) * s, y = Math.sin(a) * s; ctx.save(); ctx.translate(x, y); ctx.rotate(a + lato * 0.6 + Math.PI / 2); ctx.beginPath(); ctx.ellipse(0, -s * 0.12, s * 0.05, s * 0.13, 0, 0, 7); ctx.stroke(); ctx.restore(); }); } }
    const LETTERE = ["Α", "Ω", "Σ", "Φ", "Ψ", "λόγος", "ἀρετή", "SPQR", "MMXXVI", "κόσμος", "carpe diem", "φῶς", "IX", "Δ"];
    const ogg = Array.from({ length: Math.round(Math.min(18, W / 80)) }, () => ({ x: rnd(0.15, 0.85) * W, y: rnd(0, H), v: rnd(10, 22), r: rnd(-0.3, 0.3), vr: rnd(-0.15, 0.15), s: rnd(26, 52), tipo: scegli(["anfora", "anfora", "capitello", "alloro", "lettera", "lettera"]), testo: scegli(LETTERE) }));
    function meandro(ctx, x0, y, u, lung) { ctx.beginPath(); for (let x = x0; x < lung; x += u * 4) { ctx.moveTo(x, y + u * 3); ctx.lineTo(x, y); ctx.lineTo(x + u * 3, y); ctx.lineTo(x + u * 3, y + u * 2); ctx.lineTo(x + u, y + u * 2); ctx.lineTo(x + u, y + u); ctx.lineTo(x + u * 2, y + u); ctx.moveTo(x, y + u * 3); ctx.lineTo(x + u * 4, y + u * 3); } ctx.stroke(); }
    return {
      disegna(ctx, t, dt) {
        ctx.lineWidth = 1.3;
        const cw = Math.min(46, W * 0.045);
        if (W > 560) { colonna(ctx, cw * 1.4, H * 0.12, H - 40, cw); colonna(ctx, W - cw * 1.4, H * 0.12, H - 40, cw); }
        ctx.strokeStyle = rgba(OCRA, 0.32); const u = 7, off = -((t * 18) % (u * 4));
        meandro(ctx, off - u * 4, H - u * 3 - 6, u, W + u * 4); ctx.beginPath(); ctx.moveTo(0, H - u * 3 - 12); ctx.lineTo(W, H - u * 3 - 12); ctx.stroke();
        ogg.forEach(o => {
          o.y -= o.v * dt; o.r += o.vr * dt; if (o.y < -80) { o.y = H + 60; o.x = rnd(0.15, 0.85) * W; }
          ctx.save(); ctx.translate(o.x, o.y); ctx.rotate(o.r); ctx.strokeStyle = rgba(OCRA, 0.3); ctx.fillStyle = rgba(OCRA, 0.28); ctx.lineWidth = 1.2;
          if (o.tipo === "anfora") anfora(ctx, o.s); else if (o.tipo === "capitello") capitello(ctx, 0, 0, o.s * 1.4); else if (o.tipo === "alloro") alloro(ctx, o.s * 0.7);
          else { ctx.font = `${o.s * (o.testo.length > 3 ? 0.5 : 0.9)}px ${SERIF}`; ctx.textAlign = "center"; ctx.fillText(o.testo, 0, 0); }
          ctx.restore();
        });
      }
    };
  }

  /* ------------------------------------------------------------------ */
  /* ARTISTICO: macchie d'acquerello che si allargano, schizzi e gocce di colore */
  function artistico(W, H) {
    const COL = ["#e8752a", "#2a86c9", "#d9a514", "#b8322f", "#2a7a52", "#6b47b8", "#d6336c", "#19a3a3"];
    const macchie = [], schizzi = [], gocce = [], colate = [];
    function forma(n, irr) { return Array.from({ length: n }, () => 1 + rnd(-irr, irr)); }
    function aggiungiMacchia() { macchie.push({ x: rnd(0, W), y: rnd(0, H), R: rnd(60, 170), c: scegli(COL), vita: 0, durata: rnd(9, 15), strati: Array.from({ length: 6 }, () => forma(22, 0.22)), rot: rnd(0, 6) }); }
    for (let i = 0; i < 6; i++) { aggiungiMacchia(); macchie[i].vita = rnd(0, 6); }
    let prossimaM = 1, prossimaG = 0.5, prossimaC = 3;
    return {
      disegna(ctx, t, dt) {
        ctx.save(); ctx.globalCompositeOperation = "multiply";
        prossimaM -= dt; if (prossimaM <= 0 && macchie.length < 12) { prossimaM = rnd(1, 2.2); aggiungiMacchia(); }
        for (let i = macchie.length - 1; i >= 0; i--) {
          const m = macchie[i]; m.vita += dt; const k = m.vita / m.durata; if (k >= 1) { macchie.splice(i, 1); continue; }
          const cresc = 1 - Math.pow(1 - Math.min(1, k * 2.5), 3), a = (k < 0.6 ? 1 : 1 - (k - 0.6) / 0.4);
          m.strati.forEach((s, j) => {
            const r = m.R * cresc * (0.6 + j * 0.09); ctx.fillStyle = rgba(m.c, 0.05 * a); ctx.beginPath();
            s.forEach((q, n) => { const ang = m.rot + n / s.length * Math.PI * 2, rr = r * q; n ? ctx.lineTo(m.x + Math.cos(ang) * rr, m.y + Math.sin(ang) * rr) : ctx.moveTo(m.x + Math.cos(ang) * rr, m.y + Math.sin(ang) * rr); });
            ctx.closePath(); ctx.fill();
          });
          ctx.strokeStyle = rgba(m.c, 0.12 * a); ctx.lineWidth = 1.5; ctx.beginPath(); const s0 = m.strati[5], r0 = m.R * cresc * 1.05;
          s0.forEach((q, n) => { const ang = m.rot + n / s0.length * Math.PI * 2; n ? ctx.lineTo(m.x + Math.cos(ang) * r0 * q, m.y + Math.sin(ang) * r0 * q) : ctx.moveTo(m.x + Math.cos(ang) * r0 * q, m.y + Math.sin(ang) * r0 * q); }); ctx.closePath(); ctx.stroke();
        }
        /* gocce che cadono e schizzano */
        prossimaG -= dt; if (prossimaG <= 0) { prossimaG = rnd(0.5, 1.3); gocce.push({ x: rnd(0.05, 0.95) * W, y: -20, fine: rnd(0.2, 0.9) * H, v: 0, c: scegli(COL) }); }
        for (let i = gocce.length - 1; i >= 0; i--) {
          const g = gocce[i]; g.v += 900 * dt; g.y += g.v * dt;
          if (g.y >= g.fine) { gocce.splice(i, 1); schizzi.push({ x: g.x, y: g.fine, c: g.c, vita: 0, r: rnd(10, 22), punti: Array.from({ length: Math.floor(rnd(8, 16)) }, () => [rnd(0, 7), rnd(1.3, 3.6), rnd(1.5, 5)]), forma: forma(16, 0.35), cola: Math.random() < 0.5 ? rnd(30, 110) : 0 }); continue; }
          ctx.fillStyle = rgba(g.c, 0.45); ctx.beginPath(); ctx.ellipse(g.x, g.y, 4, 7, 0, 0, 7); ctx.fill();
        }
        for (let i = schizzi.length - 1; i >= 0; i--) {
          const s = schizzi[i]; s.vita += dt; if (s.vita > 10) { schizzi.splice(i, 1); continue; }
          const k = Math.min(1, s.vita * 6), a = 0.42 * (s.vita < 7 ? 1 : 1 - (s.vita - 7) / 3);
          ctx.fillStyle = rgba(s.c, a); ctx.beginPath(); s.forma.forEach((q, n) => { const ang = n / s.forma.length * Math.PI * 2, rr = s.r * q * k; n ? ctx.lineTo(s.x + Math.cos(ang) * rr, s.y + Math.sin(ang) * rr) : ctx.moveTo(s.x + Math.cos(ang) * rr, s.y + Math.sin(ang) * rr); }); ctx.closePath(); ctx.fill();
          s.punti.forEach(([ang, d, r]) => { ctx.beginPath(); ctx.arc(s.x + Math.cos(ang) * s.r * d * k, s.y + Math.sin(ang) * s.r * d * k, r, 0, 7); ctx.fill(); });
          if (s.cola) { const L = s.cola * Math.min(1, s.vita / 4); ctx.fillRect(s.x - 2, s.y, 4, L); ctx.beginPath(); ctx.arc(s.x, s.y + L, 3.5, 0, 7); ctx.fill(); }
        }
        /* pennellate astratte (action painting) */
        prossimaC -= dt; if (prossimaC <= 0 && colate.length < 4) { prossimaC = rnd(2.5, 5); const p = [[rnd(0, W), rnd(0, H)]]; for (let k = 0; k < 5; k++) p.push([p[k][0] + rnd(-260, 260), p[k][1] + rnd(-160, 160)]); colate.push({ p, c: scegli(COL), vita: 0, w: rnd(2, 5) }); }
        for (let i = colate.length - 1; i >= 0; i--) {
          const c = colate[i]; c.vita += dt; if (c.vita > 12) { colate.splice(i, 1); continue; }
          const k = Math.min(1, c.vita / 2), a = 0.38 * (c.vita < 9 ? 1 : 1 - (c.vita - 9) / 3), N = 60;
          ctx.strokeStyle = rgba(c.c, a); ctx.lineCap = "round";
          for (let n = 1; n <= N * k; n++) {
            const u0 = (n - 1) / N * 4, u1 = n / N * 4, P = u => { const i0 = Math.min(3, Math.floor(u)), f = u - i0, [a0, a1, a2] = [c.p[i0], c.p[i0 + 1], c.p[i0 + 2]]; return [(1 - f) * (1 - f) * a0[0] + 2 * f * (1 - f) * a1[0] + f * f * a2[0], (1 - f) * (1 - f) * a0[1] + 2 * f * (1 - f) * a1[1] + f * f * a2[1]]; };
            const [x0, y0] = P(u0), [x1, y1] = P(u1); ctx.lineWidth = c.w * (0.6 + 0.8 * Math.abs(Math.sin(n * 0.4))); ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
          }
        }
        ctx.restore();
      }
    };
  }

  /* ------------------------------------------------------------------ */
  /* TRASPORTI E LOGISTICA (biennio): sfilata di mezzi su corsie diverse */
  function trasporti(W, H) {
    const C = "#1f6f8b";
    const corsie = [
      { y: H * 0.2, tipo: "aereo", dir: -1, v: 110 }, { y: H * 0.44, tipo: "treno", dir: 1, v: 90 },
      { y: H * 0.66, tipo: "strada", dir: 1, v: 70 }, { y: H * 0.74, tipo: "strada", dir: -1, v: 85 }, { y: H * 0.92, tipo: "mare", dir: 1, v: 30 }];
    const mezzi = [], nuvole = Array.from({ length: 5 }, () => ({ x: rnd(0, W), y: rnd(0.08, 0.32) * H, s: rnd(0.7, 1.3), v: rnd(6, 14) }));
    function disegnaMezzo(ctx, m) {
      ctx.save(); ctx.translate(m.x, m.y); if (m.dir < 0) ctx.scale(-1, 1); ctx.strokeStyle = rgba(C, 0.4); ctx.fillStyle = rgba(C, 0.12); ctx.lineWidth = 1.6;
      const r = (x, y, w, h) => { ctx.fillRect(x, y, w, h); ctx.strokeRect(x, y, w, h); }, ruota = (x, y, rr) => { ctx.beginPath(); ctx.arc(x, y, rr, 0, 7); ctx.fill(); ctx.stroke(); };
      if (m.tipo === "aereo") { ctx.beginPath(); ctx.moveTo(-60, -4); ctx.quadraticCurveTo(-64, -10, -52, -10); ctx.lineTo(40, -10); ctx.quadraticCurveTo(62, -8, 64, 0); ctx.quadraticCurveTo(60, 6, 40, 6); ctx.lineTo(-48, 6); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-5, 0); ctx.lineTo(-28, 32); ctx.lineTo(-18, 32); ctx.lineTo(18, 0); ctx.moveTo(-50, -8); ctx.lineTo(-62, -30); ctx.lineTo(-54, -30); ctx.lineTo(-38, -10); ctx.stroke(); for (let k = 0; k < 7; k++) ruota(-30 + k * 9, -3, 1.6); }
      else if (m.tipo === "treno") { for (let w = 0; w < m.n; w++) { const x = -w * 96; r(x - 90, -34, 86, 30); for (let k = 0; k < 4; k++) r(x - 82 + k * 20, -28, 13, 11); ruota(x - 72, -1, 6); ruota(x - 22, -1, 6); }
        ctx.beginPath(); ctx.moveTo(-4, -34); ctx.quadraticCurveTo(26, -34, 30, -4); ctx.lineTo(-4, -4); ctx.closePath(); ctx.fill(); ctx.stroke(); }
      else if (m.tipo === "camion") { r(-90, -38, 70, 32); r(-18, -28, 30, 22); ctx.strokeRect(-12, -24, 12, 9); ruota(-72, -2, 7); ruota(-40, -2, 7); ruota(0, -2, 7); }
      else if (m.tipo === "auto") { ctx.beginPath(); ctx.moveTo(-40, -6); ctx.lineTo(-38, -16); ctx.lineTo(-22, -18); ctx.lineTo(-12, -28); ctx.lineTo(14, -28); ctx.lineTo(26, -17); ctx.lineTo(38, -15); ctx.lineTo(40, -6); ctx.closePath(); ctx.fill(); ctx.stroke(); ruota(-24, -4, 6); ruota(24, -4, 6); }
      else if (m.tipo === "bus") { r(-60, -36, 110, 32); for (let k = 0; k < 5; k++) r(-54 + k * 20, -31, 14, 11); ruota(-38, -2, 6.5); ruota(30, -2, 6.5); }
      else { ctx.beginPath(); ctx.moveTo(-110, -14); ctx.lineTo(100, -14); ctx.lineTo(80, 10); ctx.lineTo(-100, 10); ctx.closePath(); ctx.fill(); ctx.stroke(); for (let k = 0; k < 6; k++) r(-90 + k * 26, -36, 24, 22); r(52, -48, 34, 34); ctx.strokeRect(58, -42, 22, 8); }
      ctx.restore();
    }
    function nuovo(c, x) { const tipo = c.tipo === "strada" ? scegli(["camion", "auto", "auto", "bus"]) : c.tipo === "mare" ? "nave" : c.tipo; return { tipo, x: x !== undefined ? x : (c.dir > 0 ? -150 - (tipo === "treno" ? 400 : 0) : W + 150), y: c.y, dir: c.dir, v: c.v * rnd(0.8, 1.25), n: Math.floor(rnd(3, 6)), c }; }
    corsie.forEach(c => { for (let k = 0; k < Math.ceil(W / 520); k++) mezzi.push(nuovo(c, rnd(0, W))); });
    return {
      disegna(ctx, t, dt) {
        nuvole.forEach(n => { n.x -= n.v * dt; if (n.x < -100) n.x = W + 100; ctx.fillStyle = rgba(C, 0.07); [[0, 0, 22], [-24, 6, 16], [24, 5, 17], [8, -12, 16]].forEach(([dx, dy, r]) => { ctx.beginPath(); ctx.arc(n.x + dx * n.s, n.y + dy * n.s, r * n.s, 0, 7); ctx.fill(); }); });
        ctx.strokeStyle = rgba(C, 0.22); ctx.lineWidth = 1.5;
        const tr = corsie[1].y; ctx.beginPath(); ctx.moveTo(0, tr + 6); ctx.lineTo(W, tr + 6); ctx.stroke(); for (let x = -((t * 0) % 18); x < W; x += 18) { ctx.beginPath(); ctx.moveTo(x, tr + 3); ctx.lineTo(x + 6, tr + 9); ctx.stroke(); }
        const s1 = corsie[2].y + 6, s2 = corsie[3].y + 6; ctx.beginPath(); ctx.moveTo(0, s1 - 40); ctx.lineTo(W, s1 - 40); ctx.moveTo(0, s2 + 2); ctx.lineTo(W, s2 + 2); ctx.stroke();
        ctx.setLineDash([22, 18]); ctx.beginPath(); ctx.moveTo(0, (s1 + s2) / 2 - 18); ctx.lineTo(W, (s1 + s2) / 2 - 18); ctx.stroke(); ctx.setLineDash([]);
        const mr = corsie[4].y; for (let r = 0; r < 3; r++) { ctx.beginPath(); for (let x = 0; x <= W; x += 10) { const y = mr + 8 + r * 9 + Math.sin(x / 26 + t * 1.6 + r) * 3; x ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); }
        for (let i = mezzi.length - 1; i >= 0; i--) { const m = mezzi[i]; m.x += m.dir * m.v * dt; if ((m.dir > 0 && m.x > W + 160 + (m.tipo === "treno" ? m.n * 96 : 0)) || (m.dir < 0 && m.x < -160)) { mezzi.splice(i, 1); mezzi.push(nuovo(m.c)); continue; } disegnaMezzo(ctx, m); }
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
  function navale(W, H) {
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

  const SCENE = { scientifico, "scienze-applicate": scienzeApplicate, tred, linguistico, classico, artistico, trasporti, logistica, navale, "navale-faro": navaleFaro };

  /* ---------- motore: un solo ciclo di animazione per tutte le scene attive ---------- */
  const attive = [];
  const fermo = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function crea(el) {
    const nome = el.dataset.scena; if (!SCENE[nome]) return;
    const cv = document.createElement("canvas"); el.appendChild(cv); const ctx = cv.getContext("2d");
    const s = { el, cv, ctx, nome, t: 0 };
    function dim() { const dpr = Math.min(window.devicePixelRatio || 1, 1.5); s.W = innerWidth; s.H = innerHeight; cv.width = s.W * dpr; cv.height = s.H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); s.scena = SCENE[nome](s.W, s.H);
      el.closest(".pagina-tema") && el.closest(".pagina-tema").classList.toggle("scura", !!s.scena.scura); }
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
