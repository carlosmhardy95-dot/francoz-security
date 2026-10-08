import { getCollection } from 'astro:content';

// En un sitio comercial solo se muestra lo terminado:
// las piezas con estado "en-preparacion" no aparecen en ningún listado.

/** Servicios ordenados por el campo "orden" */
export async function todosLosServicios() {
  const s = await getCollection('servicios');
  return s.sort((a, b) => a.data.orden - b.data.orden || a.data.codigo.localeCompare(b.data.codigo));
}

/** Entradas publicadas del LAB, de la más nueva a la más vieja */
export async function labPublicado() {
  const lab = await getCollection('lab', (e) => e.data.estado === 'publicada');
  return lab.sort((a, b) => b.data.numero - a.data.numero);
}

/** Insights publicados, del más nuevo al más viejo */
export async function insightsPublicados() {
  const n = await getCollection('notas', (x) => x.data.estado === 'publicada');
  return n.sort((a, b) => (b.data.fecha?.getTime() ?? 0) - (a.data.fecha?.getTime() ?? 0));
}
