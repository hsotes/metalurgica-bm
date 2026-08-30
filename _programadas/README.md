# Cola de publicaciones programadas — Blog MBM

Acá se deja la tanda de la semana: una carpeta por publicación. El workflow
`.github/workflows/publicar-programados.yml` corre **cada 30 minutos entre las 8:00 y las
22:30 ART** y publica toda carpeta cuya fecha y hora ya vencieron.

Nadie toca el dashboard `/admin` para esto. El artículo se arma acá y sale solo.

## Convención (obligatoria)

    _programadas/
      2026-09-01/                      ← sin hora = se publica a las 08:00 ART
        disipacion-interna-equipos.md  ← el nombre del archivo ES el slug final
        portada.jpg                    ← obligatoria, 1200x630 horizontal
        apoyo-01.jpg                   ← imágenes de apoyo, opcionales
        linkedin.txt                   ← texto del post, opcional (fase 1: se postea a mano)
      2026-09-03_1430/                 ← con _HHMM = se publica a esa hora ART
        ...
      publicadas/                      ← el workflow mueve acá lo ya publicado

## Reglas

1. **Un solo `.md` por carpeta.** Su nombre sin la extensión es el slug, y la URL final
   será `https://www.metalurgicabotomariani.com.ar/blog/{slug}/`. Solo minúsculas, números
   y guiones simples.

2. **El frontmatter sigue el schema de `src/content.config.ts`:**

   | Campo | Regla |
   |---|---|
   | `title` | obligatorio |
   | `description` | obligatorio |
   | `date` | obligatorio, `YYYY-MM-DD`, **tiene que coincidir con la fecha de la carpeta** |
   | `image` | obligatorio, apunta a `/blog/{slug}/portada.jpg` |
   | `category` | obligatorio, una de: Estructuras · TBex · Vivienda Modular · Griglia · Arquitectura Metalica · Industria |
   | `author` | opcional, por defecto `Metalúrgica Boto Mariani` |
   | `tags` | opcional, array YAML |

3. **Las imágenes se referencian por su ruta final**, `/blog/{slug}/portada.jpg` y
   `/blog/{slug}/apoyo-01.jpg`. El workflow copia todo lo que haya en la carpeta a
   `public/blog/{slug}/`.

4. **`portada.jpg` es obligatoria** y el archivo que nombra `image` tiene que existir de
   verdad en la carpeta. Un `.png` declarado como `.jpg` frena la publicación.

5. **Si no hay carpetas vencidas, el workflow no hace nada** y termina bien.

6. Horario válido: **8:00 a 22:30 ART**, en bloques de 30 minutos (`_0900`, `_1430`,
   `_2000`). Una carpeta con hora fuera de ese rango sale en la primera corrida siguiente.

7. **A las 22:00 ART, si la cola quedó vacía, el workflow falla a propósito** y GitHub
   manda un mail esa misma noche. Es el recordatorio de cargar la tanda.

## Qué pasa si algo está mal

Todas las validaciones corren **antes** de tocar el repositorio, y además se hace un
**build de control** con el artículo ya copiado. Si el frontmatter está mal, el build falla,
se descarta la copia y la carpeta queda intacta en la cola para corregir y reintentar.
Nunca se commitea algo que rompa el deploy del sitio.

## Prueba manual

Actions → **Publicar programados** → *Run workflow*, indicando el nombre exacto de la
carpeta (por ejemplo `2026-09-01_1430`) para publicarla ya, sin esperar al cron.

## Fase 2 pendiente

El posteo automático en LinkedIn todavía no está. Si la carpeta trae `linkedin.txt`, el
workflow lo deja anotado en el resumen del job como pendiente de postear a mano.
