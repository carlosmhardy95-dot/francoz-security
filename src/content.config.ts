import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Las 4 áreas de seguridad. Todo el contenido pertenece a una.
const AREA = z.enum(['evaluacion', 'proteccion', 'riesgo-inteligencia', 'personas-respuesta']);

// Los archivos que empiezan con "_" (las plantillas) no se publican.
const soloPublicables = '**/[^_]*.md';

/** SERVICIOS — el catálogo comercial (/servicios/...) */
const servicios = defineCollection({
  loader: glob({ pattern: soloPublicables, base: './src/content/servicios' }),
  schema: z.object({
    codigo: z.string().regex(/^S-\d{2}$/, 'El código tiene que ser S- y dos números, por ejemplo S-01.'),
    nombre: z.string(),
    termino: z.string().optional(),
    area: AREA,
    resumen: z.string().max(170, 'El resumen tiene que tener menos de 170 caracteres (es el que muestra Google).'),
    definicion: z.string(),
    problema: z.string(),
    beneficio: z.string(),
    incluye: z.array(z.string()).default([]),
    destacado: z.boolean().default(false),
    orden: z.number().default(99),
  }),
});

/** INSIGHTS — artículos (/insights/...). La carpeta se sigue llamando "notas". */
const notas = defineCollection({
  loader: glob({ pattern: soloPublicables, base: './src/content/notas' }),
  schema: z.object({
    titulo: z.string(),
    descripcion: z.string().max(170, 'La descripción tiene que tener menos de 170 caracteres (es la que muestra Google).'),
    area: AREA,
    tipo: z.enum(['Concepto', 'Guía', 'Comparación', 'Análisis']),
    estado: z.enum(['publicada', 'en-preparacion']).default('en-preparacion'),
    fecha: z.coerce.date().optional(),
    revision: z.coerce.date().optional(),
    lab: z.array(z.string()).default([]),
    servicios: z.array(z.string()).default([]),
  }),
});

/** FRANCOZ LAB — investigación aplicada (/lab/...) */
const lab = defineCollection({
  loader: glob({ pattern: soloPublicables, base: './src/content/lab' }),
  schema: z.object({
    numero: z.number().int().positive(),
    titulo: z.string(),
    descripcion: z.string().max(170),
    area: AREA,
    tipo: z.enum(['Entorno', 'Análisis', 'Investigación', 'Herramienta', 'Write-up']),
    tecnologias: z.array(z.string()).default([]),
    serie: z.string().optional(),
    repositorio: z.string().optional(),
    estado: z.enum(['publicada', 'en-preparacion']).default('en-preparacion'),
    fecha: z.coerce.date().optional(),
    revision: z.coerce.date().optional(),
  }),
});

export const collections = { servicios, notas, lab };
