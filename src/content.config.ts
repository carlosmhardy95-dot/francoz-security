import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Las 4 áreas de conocimiento. Todo el contenido pertenece a una.
const AREA = z.enum(['defensa', 'riesgo', 'inteligencia', 'automatizacion']);

// Los archivos que empiezan con "_" (las plantillas) no se publican.
const soloPublicables = '**/[^_]*.md';

/** NOTAS — explican conceptos (/notas/...) */
const notas = defineCollection({
  loader: glob({ pattern: soloPublicables, base: './src/content/notas' }),
  schema: z.object({
    titulo: z.string(),
    descripcion: z.string().max(170, 'La descripción tiene que tener menos de 170 caracteres (es la que muestra Google).'),
    area: AREA,
    tipo: z.enum(['Concepto', 'Guía', 'Comparación']),
    estado: z.enum(['publicada', 'en-preparacion']).default('en-preparacion'),
    fecha: z.coerce.date().optional(),
    revision: z.coerce.date().optional(),
    // nombres de archivo (sin .md) de entradas del LAB relacionadas
    lab: z.array(z.string()).default([]),
  }),
});

/** LAB — bitácora técnica numerada (/lab/...) */
const lab = defineCollection({
  loader: glob({ pattern: soloPublicables, base: './src/content/lab' }),
  schema: z.object({
    numero: z.number().int().positive(),
    titulo: z.string(),
    descripcion: z.string().max(170),
    area: AREA,
    tipo: z.enum(['Montaje', 'Práctica', 'Análisis', 'Herramienta', 'Write-up']),
    tecnologias: z.array(z.string()).default([]),
    serie: z.string().optional(),
    tiempo: z.string().optional(),
    repositorio: z.string().optional(),
    estado: z.enum(['publicada', 'en-preparacion']).default('en-preparacion'),
    fecha: z.coerce.date().optional(),
    revision: z.coerce.date().optional(),
  }),
});

/** PROYECTOS — casos completos con entregable (/proyectos/...) */
const proyectos = defineCollection({
  loader: glob({ pattern: soloPublicables, base: './src/content/proyectos' }),
  schema: z.object({
    codigo: z.string().regex(/^P-\d{2}$/, 'El código tiene que ser P- y dos números, por ejemplo P-01.'),
    titulo: z.string(),
    descripcion: z.string().max(170),
    area: AREA,
    estado: z.enum(['publicado', 'en-curso', 'proximo', 'en-preparacion']).default('en-preparacion'),
    entregable: z.string(),
    orden: z.number().default(99),
    inicio: z.coerce.date().optional(),
    actualizado: z.coerce.date().optional(),
    lab: z.array(z.string()).default([]),
  }),
});

export const collections = { notas, lab, proyectos };
