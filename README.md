# FRANCOZ SECURITY — sitio web

Sitio hecho con **Astro**. Las páginas se arman a partir de archivos de texto (Markdown):
para agregar o cambiar un servicio, un artículo o una publicación del Lab no hace falta tocar código.

---

## Dónde está cada cosa

| Quiero cambiar… | Archivo |
| --- | --- |
| El correo, el lema o el formulario de contacto | `src/data/site.ts` |
| Las 4 áreas de seguridad | `src/data/areas.ts` |
| Los servicios (textos, qué incluye, cuáles se destacan) | `src/content/servicios/` |
| Los artículos de Insights | `src/content/notas/` |
| Las publicaciones de FRANCOZ LAB | `src/content/lab/` |
| La dirección del sitio (dominio) | `astro.config.mjs` |
| Los textos fijos de la Home | `src/pages/index.astro` |

Los archivos que empiezan con `_` (por ejemplo `_plantilla.md`) son plantillas: **no se publican**.

---

## Servicios

Cada servicio es un archivo en `src/content/servicios/`. El nombre del archivo es la dirección:
`hardening.md` se publica en `/servicios/hardening/`.

- `destacado: true` hace que aparezca en la página de inicio. Conviene que sean 4.
- `orden` define la posición en las listas.
- `area` tiene que ser una de: `evaluacion`, `proteccion`, `riesgo-inteligencia`, `personas-respuesta`.

Para sumar un servicio, copiá `_plantilla.md`, cambiale el nombre y completalo. El contador de servicios del inicio se actualiza solo.

---

## Insights y FRANCOZ LAB

1. Copiá el `_plantilla.md` de la carpeta (`src/content/notas/` o `src/content/lab/`) y cambiale el nombre.
2. Completá los datos de arriba (entre las dos líneas `---`) y escribí el texto abajo.
3. Mientras esté `estado: en-preparacion`, **no aparece en ningún lado** del sitio.
4. Cuando esté listo, cambiá a `estado: publicada` y poné la `fecha`.

La sección Insights de la página de inicio aparece sola cuando hay al menos un artículo publicado.

**Imágenes:** creá la carpeta `public/img/`, poné ahí la imagen y en el texto escribí `![Descripción](/img/nombre.png)`.

---

## Formulario de contacto

Mientras `formulario` esté vacío en `src/data/site.ts`, el botón abre el programa de correo del visitante con los datos cargados.
Para recibir las solicitudes directo en tu correo, sin que el visitante tenga que enviar nada aparte:

1. Creá una cuenta gratis en https://formspree.io con el correo donde querés recibir las solicitudes.
2. Creá un formulario nuevo y copiá su dirección (se ve así: `https://formspree.io/f/abcdwxyz`).
3. Pegala en `src/data/site.ts`, en `formulario: ''`, entre las comillas.
4. Subí el cambio. Desde ahí, cada solicitud llega a tu correo.

---

## Antes de publicar

- En `src/data/site.ts`, reemplazá `contacto@[tu-dominio]` por el correo real.
- Cuando tengas dominio propio, cambialo en `astro.config.mjs` (o cargá la variable `SITE_URL` en Vercel).

---

## Ver el sitio en tu computadora (opcional)

Necesitás Node.js 22 o más nuevo (https://nodejs.org).

1. Abrí una terminal dentro de esta carpeta.
2. Escribí `npm install` (solo la primera vez).
3. Escribí `npm run dev` y abrí la dirección que aparece (normalmente `http://localhost:4321`).
