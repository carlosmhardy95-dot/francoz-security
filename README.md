# FRANCOZ SECURITY — sitio web

Sitio hecho con **Astro**. Astro arma páginas a partir de archivos de texto (Markdown):
para publicar una nota o un laboratorio no hace falta tocar código, solo agregar un archivo.

---

## Dónde está cada cosa

| Quiero cambiar… | Archivo |
| --- | --- |
| El correo, el lema o la etapa actual | `src/data/site.ts` |
| Las 4 áreas (textos y temas) | `src/data/areas.ts` |
| Las notas | `src/content/notas/` |
| Las entradas del LAB | `src/content/lab/` |
| Los proyectos | `src/content/proyectos/` |
| La dirección del sitio (dominio) | `astro.config.mjs` |
| Los textos fijos de la Home | `src/pages/index.astro` |

Los archivos que empiezan con `_` (por ejemplo `_plantilla.md`) son plantillas: **no se publican**.

---

## Cómo agregar una nota, un laboratorio o un proyecto

1. Entrá a la carpeta que corresponde (`src/content/notas/`, `src/content/lab/` o `src/content/proyectos/`).
2. Copiá el archivo `_plantilla.md` y cambiale el nombre. El nombre es la dirección de la página:
   `que-es-osint.md` se publica en `/notas/que-es-osint/`. Usá minúsculas, sin tildes y con guiones.
3. Completá los datos de arriba (entre las dos líneas `---`) y escribí el texto abajo.
4. Mientras no esté terminado, dejá `estado: en-preparacion`. Aparece en las listas como «En preparación», pero sin página propia.
5. Cuando esté listo, cambiá a `estado: publicada` (en proyectos: `en-curso` o `publicado`) y poné la `fecha`.
6. Guardá y subí el cambio (ver «Publicar cambios»). Vercel actualiza el sitio solo.

**Imágenes:** creá la carpeta `public/img/`, poné ahí la captura (por ejemplo `lab-001-red.png`) y en el texto escribí:
`![Descripción de la captura](/img/lab-001-red.png)`

**Errores:** si un dato está mal (por ejemplo, una descripción de más de 170 caracteres o un área que no existe), el sitio no se publica y Vercel muestra el motivo en español. Corregilo y volvé a subir.

---

## Ver el sitio en tu computadora (opcional)

Necesitás tener instalado Node.js 22 o más nuevo (https://nodejs.org).

1. Abrí una terminal dentro de esta carpeta.
2. Escribí `npm install` y esperá que termine (solo la primera vez).
3. Escribí `npm run dev`.
4. Abrí en el navegador la dirección que aparece (normalmente `http://localhost:4321`).
5. Los cambios que guardes se ven al instante. Para cerrar, en la terminal apretá `Ctrl + C`.

---

## Antes de publicar por primera vez

- En `src/data/site.ts`, reemplazá `contacto@[tu-dominio]` por el correo real.
- Revisá los estados de los proyectos en `src/content/proyectos/`.
- Cuando tengas dominio propio, cambialo en `astro.config.mjs` (o cargá la variable `SITE_URL` en Vercel).

---

## Cuando llegue la Etapa 03 (servicios)

1. En `src/data/site.ts`, cambiá `etapa` a `{ numero: '03', nombre: 'Primeros servicios' }`. La hoja de ruta, el hero y el footer se actualizan solos.
2. En `src/data/areas.ts`, completá `servicioFuturo` en cada área que tenga servicio. Aparece al final de la página de esa área.
3. Para sumar «Servicios» al menú, agregalo en la lista `NAV` de `src/data/site.ts`.
