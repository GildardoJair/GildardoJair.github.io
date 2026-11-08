/* Parámetro Z · comportamiento común del sitio.
   1) Estrellas (se dibujan una sola vez; sin animación, casi sin consumo).
   2) Escenas ilustradas: cualquier <div data-scene="nombre"> se rellena con su dibujo.
   3) Tarjetas sin imagen: reciben el dibujo por defecto (función con derivada e integral).
   4) Carrusel de Novedades en la portada (flechas laterales y puntitos).
   5) Mensaje cuando una lista todavía está vacía. */
(function () {
  'use strict';

  /* ---------- 1) Estrellas ---------- */
  var cv = document.getElementById('pz-stars');
  function stars() {
    if (!cv) return;
    var w = innerWidth, h = innerHeight, d = Math.min(devicePixelRatio || 1, 2);
    cv.width = w * d; cv.height = h * d;
    var g = cv.getContext('2d'); if (!g) return;
    g.scale(d, d);
    var n = Math.min(220, Math.round(w * h / 7000)), s = 11;
    function rnd() { s = (s * 16807) % 2147483647; return s / 2147483647; }
    for (var i = 0; i < n; i++) {
      var x = rnd() * w, y = rnd() * h * 0.85, r = rnd() < 0.07 ? 1.5 : rnd() * 0.9 + 0.3;
      g.globalAlpha = (0.3 + rnd() * 0.6) * (1 - y / h);
      g.fillStyle = rnd() < 0.3 ? '#bfe9ff' : '#ffffff';
      g.beginPath(); g.arc(x, y, r, 0, 6.283); g.fill();
    }
  }
  stars();
  var rt; addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(stars, 150); });

  /* ---------- 2) Escenas ---------- */
  var G = '<path class="sg" d="M-1000 280 L-1000 244 C-600 238 -200 252 300 246 C700 240 900 250 1200 244 C1600 240 2000 250 2200 244 L2200 280Z"/>';
  var FAR = '<path class="sf" d="M-1000 280 L-1000 220 C-400 196 0 226 300 212 C560 200 760 226 1000 208 C1400 190 1800 222 2200 214 L2200 280Z"/>';
  var MT = 'M0 210 L0 178 L60 170 L110 160 L150 138 L172 132 L196 144 L225 128 L262 108 L300 126 L338 138 L376 118 L412 106 L452 128 L490 140 L530 130 L575 148 L640 162 L720 170 L800 166 L860 150 L915 110 L945 80 L962 70 L978 66 L995 72 L1015 94 L1060 128 L1110 156 L1170 170 L1200 174 L1200 210 Z';

  var SCENES = {
    /* Portada: el Popocatépetl (con fumarola) y la Iztaccíhuatl, vistos desde Puebla */
    puebla: '<svg viewBox="0 0 1200 210" aria-hidden="true">' +
      '<g transform="translate(1200 0) scale(-1 1)"><ellipse class="smoke" cx="1000" cy="62" rx="26" ry="10"/><ellipse class="smoke" cx="1034" cy="40" rx="34" ry="12"/><ellipse class="smoke" cx="1080" cy="22" rx="44" ry="13"/>' +
      '<path class="far" d="' + MT + '"/></g>' +
      '<path class="near" d="M0 210 L0 192 C200 180 320 196 520 188 C760 178 900 198 1200 186 L1200 210 Z"/></svg>',

    /* Proyectos: laboratorio */
    lab: '<svg viewBox="0 0 1200 280" aria-hidden="true" preserveAspectRatio="xMidYMax meet">' +
      '<path class="sg" d="M-1000 280 L-1000 238 L2200 238 L2200 280Z"/><path d="M-1000 238 H2200" stroke="rgba(255,255,255,.22)" stroke-width="1.5"/>' +
      '<g><rect class="ss" x="420" y="172" width="18" height="66" rx="9"/><rect x="422" y="206" width="14" height="30" rx="7" style="fill:var(--acc)" opacity=".9"/>' +
      '<rect class="ss" x="450" y="162" width="18" height="76" rx="9"/><rect x="452" y="200" width="14" height="36" rx="7" fill="#3aa38f" opacity=".9"/>' +
      '<rect class="ss" x="480" y="176" width="18" height="62" rx="9"/><rect x="482" y="212" width="14" height="24" rx="7" fill="#8a6cf0" opacity=".95"/></g>' +
      '<path class="ss" d="M572 112 H588 V166 L622 228 Q626 238 614 238 H546 Q534 238 538 228 L572 166 Z"/><path d="M557 198 H603 L622 228 Q626 238 614 238 H546 Q534 238 538 228 Z" style="fill:var(--acc)" opacity=".85"/>' +
      '<circle cx="580" cy="96" r="4" class="sa"/><circle cx="592" cy="76" r="3" class="sa"/><circle cx="578" cy="58" r="2.4" class="sa"/>' +
      '<rect class="ss" x="660" y="186" width="50" height="52" rx="3"/><rect x="662" y="208" width="46" height="28" rx="2" fill="#3aa38f" opacity=".85"/>' +
      '<rect class="ss" x="772" y="148" width="16" height="36" rx="2"/><circle class="ss" cx="780" cy="208" r="30"/><path d="M752 210 A28 28 0 0 0 808 210 Z" fill="#8a6cf0" opacity=".9"/>' +
      '</svg>',

    /* Investigaciones: Gran Telescopio Milimétrico en la Sierra Negra */
    gtm: '<svg viewBox="0 0 1200 280" aria-hidden="true" preserveAspectRatio="xMidYMax meet"><defs><linearGradient id="dg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#eef3f9"/><stop offset=".55" stop-color="#a9b8cb"/><stop offset="1" stop-color="#6c7f98"/></linearGradient></defs>' +
      '<path class="sf" d="M-1000 280 L-1000 236 L100 226 L280 206 L430 190 L570 156 L660 134 L760 124 L820 132 L910 162 L1050 198 L1190 218 L1300 228 L2200 236 L2200 280Z"/>' +
      '<path d="M570 156 L660 134 L760 124 L820 132 L910 162" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.6"/>' +
      '<g class="ss"><rect x="650" y="112" width="34" height="16" rx="2"/><rect x="690" y="118" width="22" height="12" rx="2"/><rect x="838" y="124" width="28" height="12" rx="2"/></g>' +
      '<g class="dish" transform="translate(790 126) scale(1.75)">' +
      '<path class="ss" d="M-13 -6 L-20 22 H20 L13 -6 Z"/><path d="M-6 -4 V20 M6 -4 V20" stroke="rgba(255,255,255,.22)" stroke-width="1"/>' +
      '<g transform="rotate(-24 0 -8)"><path class="ss" d="M-32 -12 L-12 -2 M32 -12 L12 -2" stroke-width="5"/>' +
      '<ellipse class="ss" cx="3" cy="-5" rx="66" ry="27"/>' +
      '<ellipse cx="0" cy="-9" rx="62" ry="25" fill="url(#dg)" stroke="#fff" stroke-opacity=".8" stroke-width="1.4"/>' +
      '<ellipse cx="0" cy="-9" rx="42" ry="16.5" fill="none" stroke="#1d2a40" stroke-opacity=".5" stroke-width=".9"/><ellipse cx="0" cy="-9" rx="22" ry="8.5" fill="none" stroke="#1d2a40" stroke-opacity=".5" stroke-width=".9"/>' +
      '<path d="M62 -9 L-62 -9 M53.7 3.5 L-53.7 -21.5 M31 12.7 L-31 -30.7 M0 16 L0 -34 M-31 12.7 L31 -30.7 M-53.7 3.5 L53.7 -21.5" stroke="#1d2a40" stroke-opacity=".45" stroke-width=".8"/>' +
      '<path d="M-54 -14 L0 -74 M54 -14 L0 -74 M-30 -30 L0 -74 M30 -30 L0 -74" stroke="#dfe8f2" stroke-width="2" stroke-linecap="round"/><circle cx="0" cy="-76" r="5.5" fill="#f4f8fc" stroke="#6c7f98"/>' +
      '<path class="sa" d="M-22 -92 Q0 -106 22 -92" stroke-width="2" opacity=".85"/><path class="sa" d="M-34 -106 Q0 -126 34 -106" stroke-width="2" opacity=".55"/></g></g>' +
      '<path class="sg" d="M-1000 280 L-1000 250 C-500 244 -100 256 400 250 C800 246 1000 254 1300 248 C1700 244 2000 252 2200 248 L2200 280Z"/></svg>',

    /* Temas: una red neuronal dibujada como constelación sobre una campana de Gauss */
    tred: '<svg viewBox="0 0 1200 280" aria-hidden="true" preserveAspectRatio="xMidYMax meet">' +
      '<g stroke="var(--acc)" stroke-width="1" opacity=".42" fill="none"><path d="M440 44 L540 30 M440 44 L540 62 M440 44 L540 92 M440 44 L540 118 M440 78 L540 30 M440 78 L540 62 M440 78 L540 92 M440 78 L540 118 M440 112 L540 30 M440 112 L540 62 M440 112 L540 92 M440 112 L540 118 M540 30 L640 40 M540 30 L640 70 M540 30 L640 100 M540 62 L640 40 M540 62 L640 70 M540 62 L640 100 M540 92 L640 40 M540 92 L640 70 M540 92 L640 100 M540 118 L640 40 M540 118 L640 70 M540 118 L640 100 M640 40 L740 58 M640 40 L740 96 M640 70 L740 58 M640 70 L740 96 M640 100 L740 58 M640 100 L740 96"/></g>' +
      '<g style="filter:drop-shadow(0 0 5px var(--acc))" fill="#fff"><circle cx="440" cy="44" r="5"/><circle cx="440" cy="78" r="5"/><circle cx="440" cy="112" r="5"/><circle cx="540" cy="30" r="5"/><circle cx="540" cy="62" r="5"/><circle cx="540" cy="92" r="5"/><circle cx="540" cy="118" r="5"/><circle cx="640" cy="40" r="5"/><circle cx="640" cy="70" r="5"/><circle cx="640" cy="100" r="5"/><circle cx="740" cy="58" r="6"/><circle cx="740" cy="96" r="6"/></g>' +
      '<path class="sf" d="M-1000 280 L-1000 252 C-300 252 100 248 300 238 C450 228 520 150 600 132 C680 150 750 228 900 238 C1100 248 1500 252 2200 252 L2200 280Z"/>' +
      '<path d="M300 238 C450 228 520 150 600 132 C680 150 750 228 900 238" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="1.5"/>' +
      '<path class="sg" d="M-1000 280 L-1000 262 Q600 246 2200 262 L2200 280Z"/></svg>',

    /* Blog: cacomixtle sobre una rama, frente a la luna */
    cacomixtle: '<svg viewBox="0 0 1200 280" aria-hidden="true" preserveAspectRatio="xMidYMax meet"><defs><clipPath id="tl"><path d="M-50 -38 C-92 -42 -126 -66 -118 -100 C-112 -124 -88 -134 -70 -122 C-82 -118 -94 -108 -98 -98 C-104 -76 -80 -58 -52 -26 Z"/></clipPath></defs>' + FAR + G +
      '<circle class="moon" cx="640" cy="104" r="64"/><g class="mcr"><circle cx="618" cy="86" r="10" fill="rgba(0,0,0,.10)"/><circle cx="662" cy="122" r="7" fill="rgba(0,0,0,.08)"/><circle cx="646" cy="76" r="5" fill="rgba(0,0,0,.08)"/></g>' +
      '<path d="M-1000 186 C-300 188 200 196 560 174 C760 164 900 172 2200 168" fill="none" stroke="var(--sil)" stroke-width="10" stroke-linecap="round"/>' +
      '<g class="ss"><ellipse cx="180" cy="190" rx="22" ry="9" transform="rotate(-20 180 190)"/><ellipse cx="300" cy="196" rx="20" ry="8" transform="rotate(15 300 196)"/><ellipse cx="800" cy="168" rx="20" ry="8" transform="rotate(-18 800 168)"/><ellipse cx="980" cy="168" rx="22" ry="9" transform="rotate(14 980 168)"/></g>' +
      '<g transform="translate(500 172) scale(1.15)">' +
      '<path class="ss" d="M-50 -38 C-92 -42 -126 -66 -118 -100 C-112 -124 -88 -134 -70 -122 C-82 -118 -94 -108 -98 -98 C-104 -76 -80 -58 -52 -26 Z"/>' +
      '<g clip-path="url(#tl)"><path d="M-50 -32 C-94 -36 -124 -62 -112 -96 C-104 -118 -84 -126 -72 -118" fill="none" stroke="#b9c4d2" stroke-opacity=".75" stroke-width="40" stroke-dasharray="7 10"/><path d="M-76 -126 L-60 -112 L-80 -108 Z" fill="var(--sil)"/></g>' +
      '<path class="ss" d="M-50 -26 C-50 -46 -20 -54 14 -50 C40 -48 52 -44 54 -36 C52 -22 30 -18 0 -18 C-26 -18 -50 -14 -50 -26 Z"/>' +
      '<ellipse class="ss" cx="-34" cy="-24" rx="16" ry="14"/><path d="M-38 -14 L-44 -2" stroke="var(--sil)" stroke-width="9" stroke-linecap="round"/><ellipse class="ss" cx="-40" cy="0" rx="11" ry="3.2"/>' +
      '<path d="M36 -24 L34 -4" stroke="var(--sil)" stroke-width="9" stroke-linecap="round"/><ellipse class="ss" cx="38" cy="0" rx="9" ry="3.2"/>' +
      '<path class="ss" d="M50 -50 C52 -66 66 -76 80 -68 L104 -60 C108 -58 108 -54 104 -52 L82 -48 C70 -44 56 -42 50 -50 Z"/>' +
      '<path class="ss" d="M60 -72 C54 -92 70 -98 76 -84 C78 -78 72 -72 66 -70 Z"/><path class="ss" d="M72 -74 C70 -94 88 -96 88 -80 C88 -74 82 -70 78 -69 Z"/><path d="M62 -76 C60 -88 68 -90 71 -82 Z" fill="var(--muted)" opacity=".5"/>' +
      '<ellipse cx="80" cy="-62" rx="11" ry="9" fill="rgba(235,238,242,.38)"/><circle cx="80" cy="-62" r="7" fill="#f3e9cf"/><circle cx="81.5" cy="-62" r="4.6" fill="#0a1220"/><circle cx="83" cy="-64" r="1.5" fill="#fff"/>' +
      '<circle cx="105" cy="-57" r="2.4" fill="#d9a9a0"/><path d="M96 -56 L122 -62 M97 -54 L124 -55 M96 -52 L120 -48" stroke="rgba(255,255,255,.45)" stroke-width=".8"/></g></svg>'
  };
  document.querySelectorAll('[data-scene]').forEach(function (el) { el.innerHTML = SCENES[el.getAttribute('data-scene')] || ''; });

  /* ---------- 3) Dibujo por defecto en tarjetas sin imagen ---------- */
  /* En las fichas no hay miniatura: se oculta el hueco de imagen */
  document.querySelectorAll('.fichas .thumbnail').forEach(function (el) { el.style.display = 'none'; });
  document.querySelectorAll('.mesa:not(.fichas) .listing-item-img-placeholder, .shead ~ .listing-item-img-placeholder').forEach(function (el) {
    el.innerHTML = '<svg viewBox="0 0 320 180" role="img" aria-label="Apunte a tinta: una función con su derivada y su integral" preserveAspectRatio="xMidYMid meet"><use href="#calc"/></svg>';
  });

  /* ---------- 4) Carrusel de Novedades (portada) ---------- */
  var box = document.querySelector('#listing-novedades');
  if (box) {
    var track = box.querySelector('.list.grid');
    if (track && track.children.length) {
      var more = document.createElement('div');
      more.className = 'g-col-1 pz-more';
      more.innerHTML = '<div class="pz-book"><span>Seguir leyendo</span><a href="temas.html">Todos los temas</a><a href="blog.html">Todo el blog</a></div>';
      track.appendChild(more);

      var wrap = document.createElement('div'); wrap.className = 'pz-carousel';
      box.parentNode.insertBefore(wrap, box); wrap.appendChild(box);
      var prev = document.createElement('button'), next = document.createElement('button');
      prev.type = next.type = 'button'; prev.className = 'pz-arrow l'; next.className = 'pz-arrow r';
      prev.setAttribute('aria-label', 'Anterior'); next.setAttribute('aria-label', 'Siguiente');
      prev.innerHTML = '&#8249;'; next.innerHTML = '&#8250;';
      wrap.appendChild(prev); wrap.appendChild(next);
      var dots = document.createElement('div'); dots.className = 'pz-dots'; dots.setAttribute('aria-label', 'Posición en el carrusel');
      wrap.parentNode.insertBefore(dots, wrap.nextSibling);

      var cards = Array.prototype.slice.call(track.children);
      var step = function () { return cards[0].getBoundingClientRect().width + 18; };
      cards.forEach(function (c, i) {
        var d = document.createElement('button'); d.type = 'button'; d.setAttribute('aria-label', 'Ir a la tarjeta ' + (i + 1));
        d.addEventListener('click', function () { track.scrollTo({ left: c.offsetLeft - cards[0].offsetLeft }); });
        dots.appendChild(d);
      });
      var upd = function () {
        prev.disabled = track.scrollLeft < 4; next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
        var best = 0, bd = 1e9;
        cards.forEach(function (c, i) { var dd = Math.abs(c.offsetLeft - cards[0].offsetLeft - track.scrollLeft); if (dd < bd) { bd = dd; best = i; } });
        if (track.scrollWidth > track.clientWidth + 4 && next.disabled) best = cards.length - 1;
        Array.prototype.forEach.call(dots.children, function (d, i) { d.setAttribute('aria-current', i === best ? 'true' : 'false'); });
      };
      prev.addEventListener('click', function () { track.scrollBy({ left: -step() }); });
      next.addEventListener('click', function () { track.scrollBy({ left: step() }); });
      track.addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); upd();
    }
  }

  /* ---------- 4b) Categorías como etiquetas sobre la mesa (en vez del panel del margen) ---------- */
  var catBox = document.querySelector('.quarto-listing-category');
  var firstMesa = document.querySelector('.mesa');
  if (catBox && firstMesa) {
    var holder = document.createElement('div'); holder.className = 'pz-chips';
    holder.appendChild(catBox); firstMesa.parentNode.insertBefore(holder, firstMesa);
  }

  /* ---------- 4c) Interruptor día / noche ---------- */
  var root = document.documentElement;
  var tools = document.querySelector('.quarto-navbar-tools') || document.querySelector('.navbar .navbar-container');
  if (tools) {
    var tb = document.createElement('button'); tb.type = 'button'; tb.className = 'pz-theme';
    tb.innerHTML = '<svg class="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>' +
      '<svg class="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
    var label = function () { var d = root.getAttribute('data-theme') === 'day'; tb.setAttribute('aria-label', d ? 'Cambiar a modo noche' : 'Cambiar a modo día'); tb.title = d ? 'Modo noche' : 'Modo día'; };
    tb.addEventListener('click', function () {
      var day = root.getAttribute('data-theme') !== 'day';
      if (day) root.setAttribute('data-theme', 'day'); else root.removeAttribute('data-theme');
      try { localStorage.setItem('pz-theme', day ? 'day' : 'night'); } catch (e) {}
      label();
    });
    tools.appendChild(tb); label();
  }

  /* ---------- 5) Listas vacías ---------- */
  document.querySelectorAll('.mesa').forEach(function (m) {
    var hasListing = m.querySelector('.quarto-listing'), items = m.querySelectorAll('.quarto-listing .g-col-1, .quarto-listing .quarto-post').length;
    var refs = m.querySelector('#refs'), entries = m.querySelectorAll('.csl-entry').length;
    if ((hasListing && !items) || (refs && !entries)) {
      var p = document.createElement('p'); p.className = 'mesa-vacia';
      p.textContent = m.getAttribute('data-vacio') || 'Aquí aparecerá el contenido en cuanto lo publique.';
      m.appendChild(p);
      var ch = document.querySelector('.pz-chips'); if (ch) ch.style.display = 'none';
    }
  });
})();
