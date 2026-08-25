/* ============================================================
   FILMIFY · comportamiento compartido
   Cabecera, grano, revelados al hacer scroll, favoritos y las
   piezas de interfaz que se repiten en todas las páginas.
   ============================================================ */
(function () {
  'use strict';
  const F = window.FILMIFY;
  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  /* ---------------------------------------------- cabecera sólida al bajar */
  const header = $('#header');
  const hero   = $('#hero');
  // Sin hero (páginas interiores) la cabecera nace sólida y se queda así:
  // el scroll solo la alterna cuando hay un vídeo detrás del que despegarse.
  if (header && hero) {
    const onScroll = () => {
      const limite = hero.offsetHeight - (window.innerWidth < 760 ? 120 : 160);
      header.classList.toggle('solid', window.scrollY > limite);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
  }

  /* ---------------------------------------------- revelado al hacer scroll */
  const rv = $$('.rv');
  if (rv.length) {
    const io = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .12, rootMargin: '0px 0px -8% 0px' });
    rv.forEach(el => io.observe(el));
  }

  /* ---------------------------------------------- contadores */
  const cuentas = $$('[data-count]');
  if (cuentas.length) {
    const io2 = new IntersectionObserver(es => {
      es.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target, fin = parseFloat(el.dataset.count);
        const dec = parseInt(el.dataset.dec || '0', 10);
        let t0 = null;
        const paso = t => {
          if (!t0) t0 = t;
          const p = Math.min((t - t0) / 1400, 1);
          const v = fin * (1 - Math.pow(1 - p, 3));
          el.textContent = dec ? v.toFixed(dec).replace('.', ',')
                               : String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
          if (p < 1) requestAnimationFrame(paso);
        };
        requestAnimationFrame(paso);
        io2.unobserve(el);
      });
    }, { threshold: .5 });
    cuentas.forEach(el => io2.observe(el));
  }

  /* ---------------------------------------------- favoritos (persisten en el navegador) */
  const CLAVE = 'filmify:favoritos';
  const leerFavs = () => {
    try { return new Set(JSON.parse(localStorage.getItem(CLAVE) || '[]')); }
    catch (e) { return new Set(); }
  };
  const guardarFavs = s => {
    try { localStorage.setItem(CLAVE, JSON.stringify(Array.from(s))); } catch (e) {}
  };
  let favs = leerFavs();

  const pintarFav = btn => {
    const on = favs.has(btn.dataset.fav);
    btn.classList.toggle('on', on);
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    btn.setAttribute('aria-label', on ? 'Quitar de favoritos' : 'Guardar en favoritos');
  };
  const refrescarFavs = () => $$('.fav[data-fav]').forEach(pintarFav);
  refrescarFavs();

  document.addEventListener('click', e => {
    const b = e.target.closest('.fav[data-fav]');
    if (!b) return;
    e.preventDefault();
    const id = b.dataset.fav;
    favs.has(id) ? favs.delete(id) : favs.add(id);
    guardarFavs(favs);
    refrescarFavs();
    const n = $('#favCount');
    if (n) { n.textContent = favs.size; n.hidden = favs.size === 0; }
  });

  const nFav = $('#favCount');
  if (nFav) { nFav.textContent = favs.size; nFav.hidden = favs.size === 0; }

  /* ---------------------------------------------- tarjeta de equipo reutilizable */
  const iconoMask = k => `-webkit-mask-image:url(assets/icons/${k}.png);mask-image:url(assets/icons/${k}.png)`;

  function tarjetaEquipo(eq, opciones) {
    const o = opciones || {};
    const c  = F.cat(eq.cat);
    const d  = F.dueno(eq.dueno);
    const g  = F.GRAD[eq.grad];
    const badges = (eq.badges || []).map((b, i) =>
      `<span class="badge${i ? ' badge--ink' : ''}">${b}</span>`).join('');
    const venta = o.modo === 'venta';
    const precio = venta
      ? (eq.venta ? `<div class="prod-price"><b>${F.eur(eq.venta)}</b><span>en venta</span></div>
                     <p class="prod-alt">o ${F.eur(eq.dia)} / día en alquiler</p>`
                  : `<div class="prod-price"><b>Solo alquiler</b></div>
                     <p class="prod-alt">${F.eur(eq.dia)} / día</p>`)
      : `<div class="prod-price"><b>${F.eur(eq.dia)}</b><span>/ día</span></div>
         ${eq.venta ? `<p class="prod-alt">o ${F.eur(eq.venta)} comprándolo</p>`
                    : `<p class="prod-alt">No está a la venta</p>`}`;

    return `<article class="prod rv">
      <a class="prod-link" href="equipo.html?id=${eq.id}" aria-label="${eq.titulo}">
        <div class="thumb" style="background:linear-gradient(142deg,${g[0]},${g[1]})">
          <span class="art"></span>
          <i style="${iconoMask(eq.cat)}"></i>
          <div class="badges">${badges}</div>
        </div>
      </a>
      <button class="fav" type="button" data-fav="${eq.id}" aria-pressed="false"
              aria-label="Guardar en favoritos">
        <svg viewBox="0 0 24 24"><path d="M12 20s-7.5-4.6-7.5-9.7A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.5 2.9C19.5 15.4 12 20 12 20Z"/></svg>
      </button>
      <div class="prod-body">
        <span class="prod-cat">${c.name}</span>
        <h3><a href="equipo.html?id=${eq.id}">${eq.titulo}</a></h3>
        <p class="prod-meta">
          <svg viewBox="0 0 24 24"><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/></svg>
          ${eq.ciudad} · ${eq.barrio} · a ${String(eq.km).replace('.', ',')} km
        </p>
        ${precio}
        <div class="seller">
          <span class="av" style="background:${d.av}">${d.ini}</span>
          <span class="nm">${d.nombre.split(' ')[0]} ${d.nombre.split(' ')[1][0]}.</span>
          <span class="rt"><svg viewBox="0 0 24 24"><path d="m12 3.6 2.5 5.4 5.9.7-4.4 4 1.2 5.8L12 16.6 6.8 19.5 8 13.7 3.6 9.7l5.9-.7Z"/></svg>${String(d.nota).replace('.', ',')}</span>
        </div>
      </div>
    </article>`;
  }

  /* ---------------------------------------------- calendario de disponibilidad */
  function calendario(eq, mes, anio, seleccion) {
    const bloq = new Set(eq.bloqueados || []);
    const primero = new Date(anio, mes, 1);
    const diasMes = new Date(anio, mes + 1, 0).getDate();
    let inicio = primero.getDay(); inicio = inicio === 0 ? 6 : inicio - 1; // lunes primero
    const hoy = new Date(); hoy.setHours(0, 0, 0, 0);

    const iso = d => `${anio}-${String(mes + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    let html = '<div class="cal-grid" role="grid">';
    ['L', 'M', 'X', 'J', 'V', 'S', 'D'].forEach(d =>
      html += `<span class="cal-dow" aria-hidden="true">${d}</span>`);
    for (let i = 0; i < inicio; i++) html += '<span class="cal-cell cal-empty"></span>';
    for (let d = 1; d <= diasMes; d++) {
      const f = iso(d);
      const fecha = new Date(anio, mes, d);
      const pasado = fecha < hoy;
      const ocupado = bloq.has(f);
      const dentro = seleccion && seleccion.desde && seleccion.hasta &&
                     f >= seleccion.desde && f <= seleccion.hasta;
      const extremo = seleccion && (f === seleccion.desde || f === seleccion.hasta);
      const cls = ['cal-cell'];
      if (pasado || ocupado) cls.push('is-off');
      if (dentro) cls.push('is-in');
      if (extremo) cls.push('is-edge');
      html += `<button type="button" class="${cls.join(' ')}" data-fecha="${f}"
        ${pasado || ocupado ? 'disabled aria-disabled="true"' : ''}
        aria-label="${d} de ${primero.toLocaleDateString('es-ES', { month: 'long' })}${ocupado ? ', ocupado' : ''}">${d}</button>`;
    }
    html += '</div>';
    return html;
  }

  /* ---------------------------------------------- parámetros de URL */
  const params = new URLSearchParams(location.search);

  window.FilmifyUI = { $, $$, tarjetaEquipo, calendario, params, iconoMask, favs };
})();
