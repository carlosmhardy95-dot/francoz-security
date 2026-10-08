// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Dirección pública del sitio. Cambiala cuando tengas el dominio definitivo
// (o cargá la variable SITE_URL en Vercel → Settings → Environment Variables).
const SITE_URL = process.env.SITE_URL || 'https://francoz-security.vercel.app';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  integrations: [sitemap()],
});
