// Datos generales del sitio. Este es el único lugar donde hay que cambiar
// el correo, el formulario o el lema: se actualiza en todas las páginas.

export const SITE = {
  nombre: 'FRANCOZ SECURITY',
  lema: 'La seguridad se decide antes.',
  tituloInicio: 'Ciberseguridad para empresas y PyMEs',
  descripcion:
    'Servicios de ciberseguridad para empresas y PyMEs: evaluación de seguridad, análisis de vulnerabilidades, pentesting, gestión de riesgos y hardening.',
  // ⚠️ Reemplazá por el correo real antes de publicar
  correo: 'contacto@[tu-dominio]',
  // Dirección del formulario (Formspree u otro servicio). Mientras esté vacía,
  // el formulario arma un correo con los datos y lo abre en el programa de correo del visitante.
  formulario: '',
  anio: new Date().getFullYear(),
};

export const NAV = [
  { href: '/servicios/', label: 'Servicios' },
  { href: '/#metodo', label: 'Método' },
  { href: '/lab/', label: 'Lab' },
  { href: '/insights/', label: 'Insights' },
  { href: '/nosotros/', label: 'Nosotros' },
];

export const CTA = { texto: 'Solicitar evaluación', href: '/contacto/' };

export const numeroLab = (n: number) => `#${String(n).padStart(3, '0')}`;

export const fechaLarga = (d?: Date) =>
  d
    ? new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d)
    : '';

export const minutosDeLectura = (texto = '') =>
  Math.max(1, Math.round(texto.trim().split(/\s+/).length / 200));
