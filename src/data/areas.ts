export type AreaSlug = 'defensa' | 'riesgo' | 'inteligencia' | 'automatizacion';

export interface Area {
  slug: AreaSlug;
  numero: string;
  nombre: string;
  sub: string;
  tipo: 'Dominio' | 'Transversal';
  enfoque: string;
  descripcion: string;
  temas: string[];
  // Se muestra recién en la Etapa 03. Mientras sea null, no aparece en ningún lado.
  servicioFuturo: null | { nombre: string; descripcion: string };
}

export const AREAS: Area[] = [
  {
    slug: 'defensa',
    numero: '01',
    nombre: 'Defensa',
    sub: 'Seguridad defensiva',
    tipo: 'Dominio',
    enfoque: 'Cómo se protege un sistema desde adentro.',
    descripcion:
      'Redes, sistemas y configuraciones vistos desde el lado de quien tiene que protegerlos. El trabajo de esta área se hace en laboratorios propios y aislados.',
    temas: ['Seguridad de redes', 'Hardening', 'Gestión de vulnerabilidades', 'Monitoreo y SOC', 'Active Directory'],
    servicioFuturo: null,
  },
  {
    slug: 'riesgo',
    numero: '02',
    nombre: 'Riesgo',
    sub: 'Gestión de riesgos',
    tipo: 'Dominio',
    enfoque: 'Qué puede salir mal, cuánto importa y qué hacer antes.',
    descripcion:
      'Identificar activos, amenazas y vulnerabilidades, medir el impacto y elegir controles con criterio. Los casos de estudio usan organizaciones ficticias.',
    temas: ['Inventario de activos', 'Amenazas', 'Evaluación de riesgos', 'Controles', 'ISO/IEC 27001 · 27005', 'NIST CSF'],
    servicioFuturo: null,
  },
  {
    slug: 'inteligencia',
    numero: '03',
    nombre: 'Inteligencia',
    sub: 'Fuentes abiertas',
    tipo: 'Dominio',
    enfoque: 'Información abierta convertida en criterio.',
    descripcion:
      'Cómo se busca, se verifica y se analiza información pública para tomar decisiones de seguridad. Solo sobre casos ficticios y con reglas éticas explícitas.',
    temas: ['OSINT', 'Threat intelligence', 'Análisis de fuentes', 'Casos ficticios'],
    servicioFuturo: null,
  },
  {
    slug: 'automatizacion',
    numero: '04',
    nombre: 'Automatización',
    sub: 'Transversal',
    tipo: 'Transversal',
    enfoque: 'Herramientas para que el método escale en las otras tres áreas.',
    descripcion:
      'Scripts, sistemas Linux y uso aplicado de IA para repetir, medir y documentar el trabajo de las otras áreas con menos esfuerzo manual.',
    temas: ['Python', 'Linux', 'Scripting', 'IA aplicada a seguridad'],
    servicioFuturo: null,
  },
];

export const areaPorSlug = (slug: string) => AREAS.find((a) => a.slug === slug)!;
