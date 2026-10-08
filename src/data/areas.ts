// Las 4 áreas de seguridad que agrupan los servicios.
// Siguen la lógica del marco NIST CSF 2.0: identificar, proteger, gobernar el riesgo, responder.

export type AreaSlug = 'evaluacion' | 'proteccion' | 'riesgo-inteligencia' | 'personas-respuesta';

export interface Area {
  slug: AreaSlug;
  numero: string;
  nombre: string;
  sub: string;
  tipo: 'Área' | 'Transversal';
  enfoque: string;
}

export const AREAS: Area[] = [
  {
    slug: 'evaluacion',
    numero: '01',
    nombre: 'Evaluación',
    sub: 'Identificar',
    tipo: 'Área',
    enfoque: 'Saber dónde está expuesta tu organización y qué tan grave es.',
  },
  {
    slug: 'proteccion',
    numero: '02',
    nombre: 'Protección',
    sub: 'Fortalecer',
    tipo: 'Área',
    enfoque: 'Reforzar lo que ya tenés: sistemas, redes, equipos y nube.',
  },
  {
    slug: 'riesgo-inteligencia',
    numero: '03',
    nombre: 'Riesgo e inteligencia',
    sub: 'Decidir',
    tipo: 'Área',
    enfoque: 'Entender qué importa más y qué se sabe de tu organización desde afuera.',
  },
  {
    slug: 'personas-respuesta',
    numero: '04',
    nombre: 'Personas y respuesta',
    sub: 'Responder',
    tipo: 'Transversal',
    enfoque: 'Preparar al equipo y actuar con orden cuando algo pasa.',
  },
];

export const areaPorSlug = (slug: string) => AREAS.find((a) => a.slug === slug)!;
