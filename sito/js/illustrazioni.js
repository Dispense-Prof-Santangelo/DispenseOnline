/* =====================================================================
   ILLUSTRAZIONI ORIGINALI (SVG) — si richiamano per nome:
   nelle curiosità con data-img="nome", negli esercizi con fig: "nome"
   ===================================================================== */
(function () {
  const B = "#1f4fa3", A = "#c8621f", V = "#2a7a52", P = "#6b47b8", G = "#d9a514", R = "#b8322f", K = "#2a2620", C = "#fbf8f1", L = "#e6dfcf";
  const s = (corpo, vb) => `<svg viewBox="${vb || "0 0 160 120"}" xmlns="http://www.w3.org/2000/svg" role="img">${corpo}</svg>`;
  const I = {};

  I.hotel = s(`<rect x="0" y="108" width="160" height="12" fill="${L}"/>
    <rect x="30" y="14" width="100" height="96" fill="${B}"/><rect x="24" y="8" width="112" height="10" fill="${K}"/>
    ${[0,1,2,3].map(r=>[0,1,2,3].map(c=>`<rect x="${40+c*22}" y="${26+r*18}" width="14" height="11" fill="${(r+c)%3?G:C}"/>`).join("")).join("")}
    <rect x="70" y="92" width="20" height="18" fill="${K}"/><text x="80" y="6" font-size="9" text-anchor="middle" fill="${K}" font-family="serif" font-weight="700">HOTEL ∞</text>`);

  I.calcolatrice = s(`<rect x="44" y="6" width="72" height="108" rx="4" fill="${K}"/><rect x="52" y="14" width="56" height="24" fill="#cfe0c3"/>
    <text x="104" y="32" font-size="14" text-anchor="end" font-family="monospace" fill="${R}" font-weight="700">Error</text>
    ${[0,1,2,3].map(r=>[0,1,2,3].map(c=>`<rect x="${52+c*15}" y="${46+r*16}" width="11" height="11" rx="1" fill="${c===3?A:"#8f8676"}"/>`).join("")).join("")}`);

  I.scacchiera = s(`${[...Array(8)].map((_,r)=>[...Array(8)].map((_,c)=>`<rect x="${32+c*12}" y="${10+r*12}" width="12" height="12" fill="${(r+c)%2?K:C}"/>`).join("")).join("")}
    <rect x="32" y="10" width="96" height="96" fill="none" stroke="${K}" stroke-width="2"/>
    <circle cx="38" cy="100" r="1.8" fill="${G}"/>
    ${[0,1].map(i=>`<circle cx="${47+i*5}" cy="100" r="1.8" fill="${G}"/>`).join("")}
    ${[0,1,2,3].map(i=>`<circle cx="${59+(i%2)*5}" cy="${97+Math.floor(i/2)*5}" r="1.8" fill="${G}"/>`).join("")}
    ${[...Array(8)].map((_,i)=>`<circle cx="${70.5+(i%4)*2.8}" cy="${96+Math.floor(i/4)*4.5}" r="1.4" fill="${G}"/>`).join("")}
    <path d="M40 112 q40 8 84 0" stroke="${A}" stroke-width="1.6" fill="none"/><text x="140" y="116" font-size="11" fill="${A}" font-family="serif" text-anchor="end">×2</text>`, "0 0 160 122");
  I.telefono = s(`<rect x="50" y="4" width="60" height="112" rx="8" fill="${K}"/><rect x="55" y="14" width="50" height="90" fill="${C}"/>
    <text x="80" y="52" font-size="11" text-anchor="middle" font-family="serif" fill="${K}">6 : 2(1+2)</text>
    <text x="80" y="72" font-size="16" text-anchor="middle" font-family="serif" fill="${R}" font-weight="700">= ?</text>
    <rect x="60" y="80" width="18" height="10" fill="${B}"/><text x="69" y="88" font-size="7" fill="#fff" text-anchor="middle">9</text>
    <rect x="82" y="80" width="18" height="10" fill="${A}"/><text x="91" y="88" font-size="7" fill="#fff" text-anchor="middle">1</text>`);

  I.cronometro = s(`<circle cx="80" cy="66" r="44" fill="${C}" stroke="${K}" stroke-width="5"/><rect x="72" y="8" width="16" height="10" fill="${K}"/>
    <path d="M80 66 L80 32" stroke="${R}" stroke-width="4"/><path d="M80 66 L104 78" stroke="${K}" stroke-width="3"/>
    <text x="80" y="100" font-size="12" text-anchor="middle" font-family="serif" fill="${B}" font-weight="700">99·7=693</text>`);

  I.chip = s(`<rect x="40" y="24" width="80" height="72" fill="${K}"/>${[0,1,2,3,4,5].map(i=>`<rect x="${46+i*12}" y="14" width="5" height="10" fill="${G}"/><rect x="${46+i*12}" y="96" width="5" height="10" fill="${G}"/>`).join("")}
    <text x="80" y="58" font-size="15" text-anchor="middle" font-family="monospace" fill="${G}">2¹⁰</text>
    <text x="80" y="80" font-size="13" text-anchor="middle" font-family="monospace" fill="#fff">1024</text>`);

  I.pergamena = s(`<path d="M30 18 h96 v84 h-96 z" fill="#f1e2bf" stroke="#a88b4f" stroke-width="2"/><circle cx="30" cy="18" r="8" fill="#d8c08a"/><circle cx="30" cy="102" r="8" fill="#d8c08a"/>
    <text x="78" y="44" font-size="13" text-anchor="middle" font-family="serif" fill="${K}">2 3 5 7 11</text>
    <text x="78" y="64" font-size="13" text-anchor="middle" font-family="serif" fill="${K}">13 17 19 23</text>
    <text x="78" y="90" font-size="22" text-anchor="middle" font-family="serif" fill="${R}">…∞</text>`);

  I.cicala = s(`<ellipse cx="80" cy="66" rx="18" ry="34" fill="${K}"/><circle cx="80" cy="28" r="12" fill="${K}"/><circle cx="71" cy="25" r="4.5" fill="${R}"/><circle cx="89" cy="25" r="4.5" fill="${R}"/>
    <path d="M78 40 Q30 50 40 104 Q60 86 78 60z" fill="#bfe0d2" opacity=".85" stroke="${V}"/><path d="M82 40 Q130 50 120 104 Q100 86 82 60z" fill="#bfe0d2" opacity=".85" stroke="${V}"/>
    <text x="148" y="20" font-size="13" text-anchor="end" font-family="serif" fill="${V}" font-weight="700">13 · 17</text>`);

  I.lucchetto = s(`<path d="M56 54 V38 a24 24 0 0 1 48 0 V54" fill="none" stroke="${K}" stroke-width="9"/><rect x="44" y="52" width="72" height="56" fill="${G}"/>
    <circle cx="80" cy="74" r="7" fill="${K}"/><rect x="77" y="76" width="6" height="16" fill="${K}"/>
    <text x="80" y="118" font-size="9" text-anchor="middle" font-family="monospace" fill="${B}">p · q = 3233</text>`);

  /* ---- icone per i problemi ---- */
  I.caramelle = s(`${[[42,34,A],[118,34,R],[80,62,V],[42,92,B],[118,92,P]].map(([x,y,c])=>`<path d="M${x-27} ${y-7} l11 7 l-11 7z M${x+27} ${y-7} l-11 7 l11 7z" fill="${c}"/><ellipse cx="${x}" cy="${y}" rx="16" ry="10" fill="${c}"/><path d="M${x-7} ${y-7} q5 7 0 14" stroke="#fff" stroke-width="2" fill="none" opacity=".6"/>`).join("")}`);
  I.pullman = s(`<rect x="8" y="30" width="144" height="58" rx="6" fill="${G}"/>${[0,1,2,3,4].map(i=>`<rect x="${18+i*24}" y="40" width="18" height="18" fill="#cfe2f3"/>`).join("")}<rect x="138" y="40" width="10" height="30" fill="#cfe2f3"/>
    <circle cx="40" cy="90" r="11" fill="${K}"/><circle cx="120" cy="90" r="11" fill="${K}"/><circle cx="40" cy="90" r="4" fill="#bbb"/><circle cx="120" cy="90" r="4" fill="#bbb"/><rect x="8" y="66" width="144" height="4" fill="${A}"/>`);
  I.faro = s(`<path d="M68 104 L74 34 H90 L96 104z" fill="${C}" stroke="${K}" stroke-width="2"/><path d="M70 82 h24 l1 10 h-26z M72 58 h20 l1 10 h-22z" fill="${R}"/>
    <rect x="72" y="22" width="20" height="12" fill="${G}"/><path d="M70 22 h24 l-12 -10z" fill="${K}"/><path d="M92 26 L156 6 L156 46z" fill="${G}" opacity=".45"/><path d="M72 26 L4 6 L4 46z" fill="${G}" opacity=".45"/><rect x="0" y="104" width="160" height="16" fill="${B}"/>`);
  I.nastro = s(`<path d="M10 40 C40 20 60 70 90 50 S140 40 150 60" stroke="${R}" stroke-width="12" fill="none"/>
    <circle cx="58" cy="94" r="10" fill="none" stroke="${K}" stroke-width="4"/><circle cx="82" cy="98" r="10" fill="none" stroke="${K}" stroke-width="4"/><path d="M64 86 L110 52 M76 90 L118 66" stroke="#8f8676" stroke-width="5"/>`);
  I.biscotti = s(`${[[50,50],[100,46],[76,84],[126,86],[30,92]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="20" fill="#d7a35d" stroke="#a8722f" stroke-width="2"/><circle cx="${x-6}" cy="${y-5}" r="3" fill="#5a3a1a"/><circle cx="${x+7}" cy="${y+2}" r="3" fill="#5a3a1a"/><circle cx="${x-2}" cy="${y+9}" r="2.5" fill="#5a3a1a"/>`).join("")}`);
  I.libri = s(`${[[20,B,90],[40,R,80],[58,V,96],[80,G,84],[100,P,92],[120,A,78]].map(([x,c,h])=>`<rect x="${x}" y="${110-h}" width="${c===G?22:18}" height="${h}" fill="${c}"/><rect x="${x+3}" y="${118-h}" width="${c===G?16:12}" height="3" fill="#fff" opacity=".7"/>`).join("")}<rect x="10" y="110" width="140" height="6" fill="${K}"/>`);
  I.monete = s(`${[[50,80],[62,68],[74,56],[110,84],[118,72]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="22" ry="9" fill="${G}" stroke="#9a7300" stroke-width="2"/>`).join("")}<text x="40" y="34" font-size="22" font-family="serif" fill="${V}" font-weight="700">€</text>`);
  I.mele = s(`${[[34,48,R],[80,40,V],[126,48,R],[57,90,R],[103,90,V]].map(([x,y,c])=>`<circle cx="${x}" cy="${y}" r="17" fill="${c}"/><path d="M${x} ${y-17} q2 -7 6 -9" stroke="#5a3a1a" stroke-width="3" fill="none"/><ellipse cx="${x+9}" cy="${y-21}" rx="6" ry="3" fill="${V}"/>`).join("")}`);
  I.scatole = s(`${[[20,64],[64,64],[108,64],[42,24],[86,24]].map(([x,y])=>`<rect x="${x}" y="${y}" width="40" height="40" fill="#d7a35d" stroke="#8a5a20" stroke-width="2"/><path d="M${x} ${y+12} h40" stroke="#8a5a20"/><rect x="${x+16}" y="${y}" width="8" height="12" fill="#c58b42"/>`).join("")}`);
  I.calendario = s(`<rect x="24" y="16" width="112" height="96" fill="${C}" stroke="${K}" stroke-width="2"/><rect x="24" y="16" width="112" height="22" fill="${R}"/>
    ${[...Array(20)].map((_,i)=>`<rect x="${32+(i%5)*20}" y="${46+Math.floor(i/5)*16}" width="14" height="11" fill="${i===6||i===13?G:L}"/>`).join("")}<rect x="44" y="8" width="6" height="16" fill="${K}"/><rect x="110" y="8" width="6" height="16" fill="${K}"/>`);
  function ruota(cx, cy, z, m, rot, col) {
    const r = m * z / 2, rt = r + m * 0.9, rr = r - m * 1.1, p = 2 * Math.PI / z, pts = [];
    for (let i = 0; i < z; i++) {
      const t = rot * Math.PI / 180 + i * p;
      [[rr, t - p * 0.5], [rr, t - p * 0.27], [rt, t - p * 0.15], [rt, t + p * 0.15], [rr, t + p * 0.27]].forEach(([R, a]) => pts.push(`${(cx + R * Math.cos(a)).toFixed(1)},${(cy + R * Math.sin(a)).toFixed(1)}`));
    }
    return `<polygon points="${pts.join(" ")}" fill="${col}" stroke="${K}" stroke-width="1"/><circle cx="${cx}" cy="${cy}" r="${(rr * 0.35).toFixed(1)}" fill="${C}" stroke="${K}"/><circle cx="${(cx + r * 0.6 * Math.cos(rot * Math.PI / 180)).toFixed(1)}" cy="${(cy + r * 0.6 * Math.sin(rot * Math.PI / 180)).toFixed(1)}" r="2.5" fill="${C}"/>`;
  }
  function coppia(z1, z2, m) {
    const r1 = m * z1 / 2, r2 = m * z2 / 2, tot = r1 + r2, x1 = 80 - tot / 2 + (r1 - r2) / 2, x2 = x1 + tot;
    // dente della prima ruota verso destra (0°), vano della seconda verso sinistra (180°)
    const rot2 = 180 + 180 / z2;
    return s(ruota(x1, 62, z1, m, 0, B) + ruota(x2, 62, z2, m, rot2, A));
  }
  I.ingranaggi = coppia(12, 8, 4.6);
  I.ingranaggi2 = coppia(12, 18, 3.6);
  I.pizza = s(`<circle cx="80" cy="62" r="50" fill="#e8b45a"/><circle cx="80" cy="62" r="42" fill="${R}"/>${[[64,44],[96,50],[70,78],[100,80],[84,60],[56,64]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="7" fill="#f5e6c8"/>`).join("")}
    ${[0,60,120].map(a=>`<path d="M80 62 L${80+50*Math.cos(a*Math.PI/180)} ${62+50*Math.sin(a*Math.PI/180)}" stroke="#e8b45a" stroke-width="2"/><path d="M80 62 L${80-50*Math.cos(a*Math.PI/180)} ${62-50*Math.sin(a*Math.PI/180)}" stroke="#e8b45a" stroke-width="2"/>`).join("")}`);
  I.bici = s(`<circle cx="40" cy="78" r="26" fill="none" stroke="${K}" stroke-width="4"/><circle cx="120" cy="78" r="26" fill="none" stroke="${K}" stroke-width="4"/>
    <path d="M40 78 L70 40 L104 40 L120 78 M70 40 L80 78 L104 40 M80 78 L40 78" stroke="${R}" stroke-width="5" fill="none"/><path d="M64 32 h14 M104 40 L100 28 h10" stroke="${K}" stroke-width="4"/>`);
  I.semaforo = s(`<rect x="62" y="6" width="36" height="96" rx="4" fill="${K}"/><circle cx="80" cy="26" r="11" fill="${R}"/><circle cx="80" cy="54" r="11" fill="#5b4a1a"/><circle cx="80" cy="82" r="11" fill="#1d3b2c"/><rect x="76" y="102" width="8" height="18" fill="${K}"/>`);
  I.piastrelle = s(`${[...Array(4)].map((_,r)=>[...Array(6)].map((_,c)=>`<rect x="${14+c*22}" y="${16+r*22}" width="22" height="22" fill="${(r+c)%2?"#c9e3d5":"#eaf4ee"}" stroke="${V}"/>`).join("")).join("")}<rect x="14" y="16" width="132" height="88" fill="none" stroke="${K}" stroke-width="3"/>`);
  I.dadi = s(`<rect x="22" y="40" width="50" height="50" rx="4" fill="${C}" stroke="${K}" stroke-width="3"/><rect x="88" y="30" width="50" height="50" rx="4" fill="${R}"/>
    ${[[34,52],[60,78],[47,65]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4" fill="${K}"/>`).join("")}${[[100,42],[126,42],[100,68],[126,68]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4" fill="#fff"/>`).join("")}`);
  I.squadra = s(`<path d="M20 104 L20 20 L130 104z" fill="${G}" opacity=".35" stroke="${K}" stroke-width="2"/><path d="M40 92 L40 54 L88 92z" fill="${C}" stroke="${K}"/>
    ${[...Array(10)].map((_,i)=>`<path d="M${20+i*11} 104 v-6" stroke="${K}"/>`).join("")}`);

  I.giardino = s(`<rect x="20" y="10" width="120" height="100" fill="#8cc084" stroke="${V}" stroke-width="3"/>
    <rect x="62" y="42" width="36" height="36" fill="#7fb6e6" stroke="${B}" stroke-width="2"/><path d="M68 56 q6 -4 12 0 t12 0" stroke="#fff" fill="none" stroke-width="1.5"/>
    ${[[34,24],[48,92],[124,26],[118,96],[30,66],[132,60]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3.5" fill="${[R,G,P][(x+y)%3]}"/><circle cx="${x}" cy="${y}" r="1.3" fill="#fff"/>`).join("")}`);
  I.mucchio = s(`${[[22,70,-8],[48,62,12],[74,74,-4],[100,60,20],[124,72,-14],[36,92,6],[62,96,-18],[90,94,10],[116,96,-6],[60,44,25],[88,40,-10]].map(([x,y,a])=>`<rect x="${x-11}" y="${y-11}" width="22" height="22" fill="#c9e3d5" stroke="${V}" stroke-width="1.5" transform="rotate(${a} ${x} ${y})"/>`).join("")}
    <text x="146" y="22" font-size="14" text-anchor="end" font-family="serif" fill="${V}" font-weight="700">× 36</text>`);
  I.quadretti = s(`${[...Array(12)].map((_,r)=>[...Array(12)].map((_,c)=>`<rect x="${38+c*7}" y="${16+r*7}" width="7" height="7" fill="${(r+c)%2?"#dfe8f6":"#fff"}" stroke="#9fb3d6" stroke-width=".5"/>`).join("")).join("")}
    <rect x="38" y="16" width="84" height="84" fill="none" stroke="${B}" stroke-width="2"/><text x="80" y="114" font-size="11" text-anchor="middle" font-family="serif" fill="${B}">12 cm</text>`);


  /* ---- capitolo 2 ---- */
  I.specchio = s(`<line x1="8" y1="78" x2="152" y2="78" stroke="${K}" stroke-width="1.6"/><path d="M154 78 l-7 -4 v8z" fill="${K}"/>
    ${[-5,-4,-3,-2,-1,0,1,2,3,4,5].map(i=>`<line x1="${80+i*13}" y1="74" x2="${80+i*13}" y2="82" stroke="${K}" stroke-width="${i?1:1.8}"/><text x="${80+i*13}" y="94" font-size="7.5" text-anchor="middle" font-family="serif" fill="${i<0?R:i>0?B:K}">${i>0?"+"+i:i<0?"−"+(-i):0}</text>`).join("")}
    <rect x="77.5" y="14" width="5" height="58" fill="#cfe3f3" stroke="${B}" stroke-width="1"/><line x1="79" y1="18" x2="81" y2="66" stroke="#fff" stroke-width="1"/>
    <circle cx="106" cy="78" r="4" fill="${B}"/><circle cx="145" cy="78" r="4" fill="${B}"/><circle cx="54" cy="78" r="4" fill="${R}"/><circle cx="15" cy="78" r="4" fill="${R}"/>
    <path d="M106 70 Q80 40 54 70" stroke="${P}" stroke-width="1.3" fill="none" stroke-dasharray="3 2"/><path d="M145 70 Q80 18 15 70" stroke="${P}" stroke-width="1.3" fill="none" stroke-dasharray="3 2"/>
    <text x="80" y="112" font-size="9" text-anchor="middle" font-family="serif" fill="${P}">2 &lt; 5 &#160; diventa &#160; −2 &gt; −5</text>`);

  /* ---------------- CAPITOLO 3 ---------------- */
  const fz = (x, y, n, d, col, sz) => `<text x="${x}" y="${y}" font-size="${sz||11}" text-anchor="middle" fill="${col||K}" font-family="serif" font-weight="700">${n}</text><line x1="${x-7}" y1="${y+3}" x2="${x+7}" y2="${y+3}" stroke="${col||K}" stroke-width="1"/><text x="${x}" y="${y+14}" font-size="${sz||11}" text-anchor="middle" fill="${col||K}" font-family="serif" font-weight="700">${d}</text>`;
  /* 2/5 = 1/3 + 1/15 con le barre */
  I.egizi = s(`${[0,1,2,3,4].map(i=>`<rect x="${10+i*28}" y="14" width="28" height="22" fill="${i<2?G:C}" stroke="${K}"/>`).join("")}
    ${[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(i=>`<rect x="${10+i*140/15}" y="56" width="${140/15}" height="22" fill="${i<5?A:(i<6?P:C)}" stroke="${K}" stroke-width=".7"/>`).join("")}
    ${fz(24,96,"1","3",A)}${fz(68,96,"1","15",P)}<text x="44" y="104" font-size="12" text-anchor="middle" fill="${K}" font-family="serif">+</text>
    ${fz(150,22,"2","5",K)}`, "0 0 160 118");
  /* corda del monocordo: intera, 1/2, 2/3, 3/4 */
  I.monocordo = s(`${[[1,"1","1","nota base"],[1/2,"1","2","ottava"],[2/3,"2","3","quinta"],[3/4,"3","4","quarta"]].map((r,i)=>{const y=18+i*26, Lx=110*r[0];
    return `<line x1="10" y1="${y}" x2="120" y2="${y}" stroke="${L}" stroke-width="2"/><line x1="10" y1="${y}" x2="${10+Lx}" y2="${y}" stroke="${[B,A,V,P][i]}" stroke-width="3"/>
    <rect x="${8+Lx}" y="${y-5}" width="4" height="10" fill="${K}"/>${fz(136,y-4,r[1],r[2],[B,A,V,P][i],10)}`}).join("")}
    <rect x="6" y="6" width="4" height="90" fill="${K}"/><text x="80" y="114" font-size="10" text-anchor="middle" fill="${K}" font-family="serif">corda vibrante e sue frazioni</text>`);
  /* 1/2 + 1/3 + 1/9 = 17/18 */
  I.cammelli = s(`${Array.from({length:18},(_,i)=>`<rect x="${8+i*8}" y="30" width="8" height="26" fill="${i<9?G:(i<15?A:(i<17?V:C))}" stroke="${K}" stroke-width=".6"/>`).join("")}
    ${fz(44,74,"1","2",K)}${fz(104,74,"1","3",A)}${fz(140,74,"1","9",V)}<text x="152" y="24" font-size="10" text-anchor="middle" fill="${R}" font-family="serif" font-weight="700">?</text>
    <path d="M148 28 l4 0" stroke="${R}"/><text x="80" y="16" font-size="10" text-anchor="middle" fill="${K}" font-family="serif">18 parti uguali</text>`);
  /* dimezzamento: 1, 1/2, 1/4, 1/8 */
  I.dimezza = s(`${[1,2,4,8,16].map((d,i)=>`<rect x="${12+i*30}" y="${100-80/d}" width="20" height="${80/d}" fill="${[B,V,A,P,R][i]}"/><text x="${22+i*30}" y="114" font-size="9" text-anchor="middle" fill="${K}" font-family="serif">2<tspan dy="-4" font-size="7">${i?"−"+i:"0"}</tspan></text>`).join("")}
    <line x1="6" y1="100" x2="156" y2="100" stroke="${K}"/>`);
  /* le cifre di 1/7 su un cerchio */
  I.ciclico = s(`<circle cx="80" cy="60" r="42" fill="${C}" stroke="${B}" stroke-width="2"/>${"142857".split("").map((c,i)=>{const a=-Math.PI/2+i*Math.PI/3;
    return `<circle cx="${80+42*Math.cos(a)}" cy="${60+42*Math.sin(a)}" r="11" fill="${[B,A,V,P,R,G][i]}"/><text x="${80+42*Math.cos(a)}" y="${64+42*Math.sin(a)}" font-size="12" text-anchor="middle" fill="#fff" font-family="serif" font-weight="700">${c}</text>`}).join("")}
    ${fz(80,52,"1","7",K,13)}`);
  /* quadrato e diagonale √2 */
  I.diagonale = s(`<rect x="40" y="20" width="76" height="76" fill="${C}" stroke="${K}" stroke-width="2"/><line x1="40" y1="96" x2="116" y2="20" stroke="${R}" stroke-width="2.5"/>
    <text x="78" y="112" font-size="11" text-anchor="middle" fill="${K}" font-family="serif">1</text><text x="30" y="62" font-size="11" text-anchor="middle" fill="${K}" font-family="serif">1</text>
    <path d="M83 69 l3 -2 l4 9 l5.5 -17 h11" fill="none" stroke="${K}" stroke-width="1.6" stroke-linejoin="round"/><text x="96.5" y="76" font-size="16" fill="${K}" font-family="serif" font-weight="700">2</text>`);
  /* rettangolo aureo con il quadrato e il rettangolo che resta */
  I.aureo = s(`<rect x="10" y="20" width="140" height="86.5" fill="${C}" stroke="${K}" stroke-width="2"/><rect x="10" y="20" width="86.5" height="86.5" fill="#f3e6c4" stroke="${K}"/>
    <rect x="96.5" y="20" width="53.5" height="53.5" fill="#dfe8f7" stroke="${K}"/><rect x="117" y="73.5" width="33" height="33" fill="#e3f1e8" stroke="${K}"/>
    <path d="M10 106.5 A86.5 86.5 0 0 1 96.5 20 A53.5 53.5 0 0 1 150 73.5 A33 33 0 0 1 117 106.5" fill="none" stroke="${R}" stroke-width="2.2"/>
    <text x="80" y="118" font-size="10" text-anchor="middle" fill="${K}" font-family="serif">base : altezza ≈ 1,618</text>`, "0 0 160 122");
  /* +20% poi −20% */
  I.sconto = s(`<rect x="14" y="40" width="30" height="60" fill="${B}"/><rect x="64" y="28" width="30" height="72" fill="${A}"/><rect x="114" y="42.4" width="30" height="57.6" fill="${V}"/>
    <text x="29" y="34" font-size="10" text-anchor="middle" font-family="serif" fill="${K}">100</text><text x="79" y="22" font-size="10" text-anchor="middle" font-family="serif" fill="${K}">120</text><text x="129" y="36" font-size="10" text-anchor="middle" font-family="serif" fill="${K}">96</text>
    <text x="54" y="70" font-size="9" text-anchor="middle" font-family="serif" fill="${A}">+20%</text><text x="104" y="70" font-size="9" text-anchor="middle" font-family="serif" fill="${V}">−20%</text><line x1="6" y1="100" x2="154" y2="100" stroke="${K}"/>`);
  /* cerchio, diametro e π */
  I.pigreco = s(`<circle cx="64" cy="60" r="40" fill="${C}" stroke="${B}" stroke-width="2.5"/><line x1="24" y1="60" x2="104" y2="60" stroke="${R}" stroke-width="2"/>
    <text x="64" y="54" font-size="10" text-anchor="middle" fill="${R}" font-family="serif">diametro 1</text><text x="64" y="114" font-size="10" text-anchor="middle" fill="${B}" font-family="serif">circonferenza π</text>
    <text x="136" y="40" font-size="18" text-anchor="middle" fill="${K}" font-family="serif" font-style="italic">π</text><text x="136" y="62" font-size="8.5" text-anchor="middle" fill="${K}" font-family="serif">3,14159…</text>`);
  /* scala delle potenze di 10 */
  I.scala10 = s(`<line x1="8" y1="70" x2="152" y2="70" stroke="${K}" stroke-width="2"/>${[-10,-5,0,5,10,15].map((e,i)=>`<line x1="${12+i*27.5}" y1="64" x2="${12+i*27.5}" y2="76" stroke="${K}"/><text x="${12+i*27.5}" y="92" font-size="9" text-anchor="middle" font-family="serif" fill="${K}">10<tspan dy="-4" font-size="7">${e<0?"−"+(-e):e}</tspan></text>`).join("")}
    <circle cx="12" cy="52" r="4" fill="${P}"/><text x="12" y="40" font-size="8" text-anchor="middle" font-family="serif" fill="${P}">atomo</text>
    <rect x="64" y="44" width="4" height="16" fill="${V}"/><text x="67" y="36" font-size="8" text-anchor="middle" font-family="serif" fill="${V}">noi</text>
    <circle cx="${12+3.4*27.5}" cy="52" r="7" fill="${B}"/><text x="${12+3.4*27.5}" y="36" font-size="8" text-anchor="middle" font-family="serif" fill="${B}">Terra</text>
    <circle cx="${12+4.4*27.5}" cy="50" r="9" fill="${G}"/><text x="${12+4.4*27.5}" y="34" font-size="8" text-anchor="middle" font-family="serif" fill="${A}">Sole–Terra</text>
    <text x="80" y="112" font-size="9" text-anchor="middle" font-family="serif" fill="${K}">lunghezze in metri</text>`, "0 0 160 118");
  /* torta divisa in 8 fette, 3 colorate */
  I.torta = s(`${Array.from({length:8},(_,i)=>{const a1=-Math.PI/2+i*Math.PI/4,a2=a1+Math.PI/4;return `<path d="M80 60 L${80+46*Math.cos(a1)} ${60+46*Math.sin(a1)} A46 46 0 0 1 ${80+46*Math.cos(a2)} ${60+46*Math.sin(a2)} Z" fill="${i<3?A:C}" stroke="${K}" stroke-width="1.4"/>`}).join("")}
    ${fz(140,52,"3","8",A,13)}`);

  /* ---- FOTO REALI (immagini solo illustrative): file in img/, licenze libere da Wikimedia Commons ----
     Le figure matematiche/geometriche restano disegni SVG qui sopra. */
  const FOTO = {
    mele:         ["Mele rosse", "Maksym Kozlenko", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Australian_Red_delicious_apples_at_the_store.jpg"],
    caramelle:    ["Caramelle e dolciumi", "Elisa Azzali", "CC BY 2.0", "https://commons.wikimedia.org/wiki/File:Candy_in_Damascus.jpg"],
    pizza:        ["Pizza napoletana", "Fabryx98", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Pizza-napoletana.jpg"],
    hotel:        ["Facciata di un albergo di notte", "HAuwo PPlEILML", "CC0", "https://commons.wikimedia.org/wiki/File:SZ_Shenzhen_Futian_Yuheng_Road_Hampton_Hotel_night_facade_April_2026_N13P.jpg"],
    calcolatrice: ["Calcolatrice tascabile", "LoMit", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Citizen_SLD-100NR_calculator.jpg"],
    cronometro:   ["Cronometro", "StefanPohl (Wikipedia tedesca)", "Pubblico dominio", "https://commons.wikimedia.org/wiki/File:Stoppuhr_hanhart.jpg"],
    chip:         ["Circuito integrato su una scheda", "Autore non indicato", "Pubblico dominio", "https://commons.wikimedia.org/wiki/File:Integrated_circuit_on_microchip.jpg"],
    cicala:       ["Cicala periodica", "Jbjensen1", "CC BY 4.0", "https://commons.wikimedia.org/wiki/File:Periodical_cicada_laying_eggs.jpg"],
    lucchetto:    ["Lucchetto con chiavi", "Trougnouf", "CC BY 4.0", "https://commons.wikimedia.org/wiki/File:Solex_99_30_padlock_with_keys_(DSCF2659).jpg"],
    monete:       ["Monete in euro (ritaglio)", "Kritzolina", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Paid_bill_for_coffee.jpg"],
    libri:        ["Pila di libri antichi", "Ch. Maderthoner", "CC0", "https://commons.wikimedia.org/wiki/File:Old_Books_01.JPG"],
    termometro:   ["Termometro da esterno ghiacciato", "August Geyler", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Eingefrorenes_Au%C3%9Fenthermometer.jpg"],
    marmorto:     ["Riva del Mar Morto (Giordania)", "Bernard Gagnon", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Dead_Sea,_Jordan_02.jpg"],
    registro:     ["Pagina di un registro contabile di un mercante (1832)", "Autore non indicato", "Pubblico dominio", "https://commons.wikimedia.org/wiki/File:Pittsboro_Merchant_Business_Ledger_-_DPLA_-_4cbfce8f8f08c14f851ab74af046c082_(page_42).jpg"],
    lampadina:    ["Lampadina a incandescenza", "Reinhard Manthey", "CC BY-SA 3.0 DE", "https://commons.wikimedia.org/wiki/File:Old-fashioned_light_bulb.jpg"],
    bilancia:     ["Bilancia a due piatti", "Nikodem Nijaki", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Balance_scale_IMGP9722.jpg"],
    fusione:      ["Ghisa fusa versata in una fonderia", "Sm faysal", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:In-stream_inoculation_addition_while_molten_cast_iron_is_poured_to_a_green_sand_mold_in_a_foundry_in_Bangladesh.jpg"],
    ghiaccio:     ["Cubetti di ghiaccio", "Darren Hester", "CC BY-SA 2.5", "https://commons.wikimedia.org/wiki/File:Ice_cubes_openphoto.jpg"],
    montagna:     ["Sentiero di montagna nel bosco", "Greg Grossmeier", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Trinity_Alps_Wilderness_-_Canyon_Creek_Trail.jpg"],
    bosco:        ["Luce del sole in un bosco", "Antoloji", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Sunlight_in_the_forest.jpg"],
    clessidra:    ["Clessidra di legno", "S Sepp", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Wooden_hourglass_3.jpg"]
  };
  Object.entries(FOTO).forEach(([k, f]) => { I[k] = `<img class="foto" src="img/${k}.jpg" alt="${f[0]}" title="Foto: ${f[1]}, ${f[2]}, Wikimedia Commons">`; });
  window.CREDITI_FOTO = FOTO;

  window.ILLUSTRAZIONI = I;
})();
