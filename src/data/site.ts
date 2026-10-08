// Datos generales del sitio. Este es el único lugar donde hay que cambiar
// el correo, la etapa o el lema: se actualiza en todas las páginas.

export const SITE = {
  nombre: 'FRANCOZ SECURITY',
  lema: 'La seguridad empieza antes.',
  descripcion:
    'FRANCOZ SECURITY estudia el antes: el análisis, el método y la práctica que deciden si un incidente ocurre. Ciberseguridad, riesgo e inteligencia, construido a la vista.',
  // ⚠️ Reemplazá por el correo real antes de publicar
  correo: 'contacto@[tu-dominio]',
  etapa: { numero: '01', nombre: 'Fundamentos' },
  anio: new Date().getFullYear(),
};

export const NAV = [
  { href: '/areas/', label: 'Áreas' },
  { href: '/proyectos/', label: 'Proyectos' },
  { href: '/lab/', label: 'Lab' },
  { href: '/notas/', label: 'Notas' },
  { href: '/sobre/', label: 'Sobre' },
];

export const ESTADOS: Record<string, { texto: string; vivo: boolean }> = {
  publicada: { texto: 'Publicada', vivo: false },
  publicado: { texto: 'Publicado', vivo: false },
  'en-curso': { texto: 'En curso', vivo: true },
  'en-preparacion': { texto: 'En preparación', vivo: true },
  proximo: { texto: 'Próximo', vivo: false },
};

export const numeroLab = (n: number) => `#${String(n).padStart(3, '0')}`;

export const fechaLarga = (d?: Date) =>
  d
    ? new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d)
    : '';

export const minutosDeLectura = (texto = '') =>
  Math.max(1, Math.round(texto.trim().split(/\s+/).length / 200));
