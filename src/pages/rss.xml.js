import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE, numeroLab } from '../data/site';

export async function GET(context) {
  const notas = await getCollection('notas', (n) => n.data.estado === 'publicada');
  const lab = await getCollection('lab', (e) => e.data.estado === 'publicada');

  const items = [
    ...notas.map((n) => ({
      title: n.data.titulo,
      description: n.data.descripcion,
      pubDate: n.data.fecha ?? new Date(),
      link: `/insights/${n.id}/`,
    })),
    ...lab.map((e) => ({
      title: `FRANCOZ LAB ${numeroLab(e.data.numero)} — ${e.data.titulo}`,
      description: e.data.descripcion,
      pubDate: e.data.fecha ?? new Date(),
      link: `/lab/${e.id}/`,
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: SITE.nombre,
    description: SITE.descripcion,
    site: context.site,
    items,
    customData: '<language>es-AR</language>',
  });
}
