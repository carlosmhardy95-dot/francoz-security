import { getCollection } from 'astro:content';
import { numeroLab } from './site';

/** Entradas del LAB, de la más nueva a la más vieja */
export async function todoElLab() {
  const lab = await getCollection('lab');
  return lab.sort((a, b) => b.data.numero - a.data.numero);
}

/** Notas: primero las publicadas (más nuevas arriba), después las que están en preparación */
export async function todasLasNotas() {
  const notas = await getCollection('notas');
  return notas.sort((a, b) => {
    const pa = a.data.estado === 'publicada' ? 1 : 0;
    const pb = b.data.estado === 'publicada' ? 1 : 0;
    if (pa !== pb) return pb - pa;
    return (b.data.fecha?.getTime() ?? 0) - (a.data.fecha?.getTime() ?? 0);
  });
}

/** Proyectos ordenados por el campo "orden" */
export async function todosLosProyectos() {
  const p = await getCollection('proyectos');
  return p.sort((a, b) => a.data.orden - b.data.orden || a.data.codigo.localeCompare(b.data.codigo));
}

/** Datos del LAB para el hero: la última entrada publicada, o la primera si todavía no hay ninguna */
export async function resumenLab() {
  const lab = await todoElLab();
  const publicadas = lab.filter((e) => e.data.estado === 'publicada');
  const mayor = lab.length ? Math.max(...lab.map((e) => e.data.numero)) : 0;
  const siguiente = mayor + 1;
  if (publicadas.length) {
    return { numero: numeroLab(publicadas[0].data.numero), etiqueta: 'Última entrada', siguiente };
  }
  return { numero: numeroLab(1), etiqueta: 'Primera entrada', siguiente };
}
