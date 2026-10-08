// Movimiento de todo el sitio. Si algo falla, el contenido igual queda visible
// (el script del <head> saca la clase .motion si este archivo no llega a correr).

const root = document.documentElement;
const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
const mouse = matchMedia('(hover: hover) and (pointer: fine)').matches;
(window as any).__fzMotion = true;

/* 1 · Entradas al hacer scroll ------------------------------------------- */
const REVEAL = [
  '.sec .kicker', '.sec .title', '.sec .manifesto', '.sec .lead', '.sec .note', '.sec .textlink', '.sec .meta-row',
  '.ph-body>*', '.areas>*', '.projs>*', '.listgrid>*', '.notes>*', '.road>li', '.log-row', '.fmt', '.rules',
  '.about>div', '.tl .seg', '.tl .loop', '.colhead', '.contact .reasons', '.contact .mailrow', '.contact .micro',
  '.side-box', '.pager a', '.empty',
].join(',');

if (root.classList.contains('motion') && 'IntersectionObserver' in window) {
  const els = Array.from(document.querySelectorAll<HTMLElement>(REVEAL)).filter((el) => !el.closest('.hero'));

  // Escalonado: los hermanos que entran juntos salen uno detrás del otro
  const grupos = new Map<Element, HTMLElement[]>();
  els.forEach((el) => {
    const padre = el.parentElement!;
    if (!grupos.has(padre)) grupos.set(padre, []);
    grupos.get(padre)!.push(el);
  });
  grupos.forEach((hijos) => hijos.forEach((el, i) => el.style.setProperty('--i', String(Math.min(i, 6)))));

  // Se revela todo lo que ya entró en pantalla (o quedó arriba). Revisar la posición
  // en cada scroll, en vez de esperar a que el elemento "cruce" el borde, evita que
  // queden secciones ocultas cuando alguien salta con un enlace o scrollea muy rápido.
  let pendientes = els;
  let raf = 0;
  const revisar = () => {
    raf = 0;
    const limite = innerHeight * 0.92;
    pendientes = pendientes.filter((el) => {
      if (el.getBoundingClientRect().top < limite) {
        el.classList.add('in');
        return false;
      }
      return true;
    });
    if (!pendientes.length) {
      removeEventListener('scroll', pedir);
      removeEventListener('resize', pedir);
    }
  };
  const pedir = () => { if (!raf) raf = requestAnimationFrame(revisar); };
  addEventListener('scroll', pedir, { passive: true });
  addEventListener('resize', pedir);
  pedir();
}

/* 2 · Vidrio: la luz sigue al cursor ---------------------------------------- */
if (mouse) {
  document.addEventListener(
    'pointermove',
    (e) => {
      const g = (e.target as Element).closest?.('.glass') as HTMLElement | null;
      if (!g) return;
      const r = g.getBoundingClientRect();
      g.style.setProperty('--mx', `${e.clientX - r.left}px`);
      g.style.setProperty('--my', `${e.clientY - r.top}px`);
    },
    { passive: true }
  );
}

/* 3 · Inclinación de tarjetas ------------------------------------------------ */
if (mouse && !reducido) {
  document.querySelectorAll<HTMLElement>('.area, .proj').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.classList.add('tilting');
      card.style.setProperty('--ry', `${(x * 4).toFixed(2)}deg`);
      card.style.setProperty('--rx', `${(-y * 3).toFixed(2)}deg`);
    });
    card.addEventListener('pointerleave', () => {
      card.classList.remove('tilting');
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--rx', '0deg');
    });
  });
}

/* 4 · Botones magnéticos ----------------------------------------------------- */
if (mouse && !reducido) {
  document.querySelectorAll<HTMLElement>('.tb-cta, .btn, .hero .cta, .hero .meet, .hero .play').forEach((b) => {
    b.classList.add('magnet');
    const fuerza = b.classList.contains('play') ? 0.35 : 0.18;
    b.addEventListener('pointermove', (e) => {
      const r = b.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      b.classList.add('pulling');
      b.style.translate = `${(dx * fuerza).toFixed(1)}px ${(dy * fuerza * 1.4).toFixed(1)}px`;
    });
    b.addEventListener('pointerleave', () => {
      b.classList.remove('pulling');
      b.style.translate = '';
    });
  });
}

/* 5 · Indicador deslizante en el menú --------------------------------------- */
document.querySelectorAll<HTMLElement>('.tb-nav, .hero .nav').forEach((nav) => {
  const ink = document.createElement('span');
  ink.className = 'nav-ink';
  ink.setAttribute('aria-hidden', 'true');
  nav.prepend(ink);
  const links = Array.from(nav.querySelectorAll<HTMLElement>(':scope > a:not(.n-home)'));
  const actual = links.find((a) => a.getAttribute('aria-current') === 'page') || null;
  const horizontal = () => getComputedStyle(nav).display === 'flex';
  const ir = (a: HTMLElement | null) => {
    if (!a || !horizontal()) { ink.style.opacity = '0'; return; }
    const padX = 12;
    ink.style.left = `${a.offsetLeft - padX}px`;
    ink.style.width = `${a.offsetWidth + padX * 2}px`;
    ink.style.opacity = '1';
  };
  links.forEach((a) => {
    a.addEventListener('pointerenter', () => ir(a));
    a.addEventListener('focus', () => ir(a));
  });
  nav.addEventListener('pointerleave', () => ir(actual));
  // ubicar el indicador en la página actual sin animar la primera vez
  ink.style.transition = 'none';
  ir(actual);
  requestAnimationFrame(() => requestAnimationFrame(() => (ink.style.transition = '')));
  addEventListener('resize', () => ir(actual));
});
