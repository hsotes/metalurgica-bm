// Publicador de la cola _programadas/ del blog de MBM.
// Corre en GitHub Actions (ver .github/workflows/publicar-programados.yml).
// Node 20+, sin dependencias externas.
//
// Flujo: carpeta vencida -> valida -> copia .md e imagenes -> build de control
// -> commit + push -> deploy hook -> espera la URL viva -> archiva la carpeta.
//
// FASE 1: solo blog. El posteo en LinkedIn se hace a mano; si la carpeta trae
// linkedin.txt el publicador lo deja anotado en el resumen como pendiente.
//
// Env opcionales: VERCEL_DEPLOY_HOOK, PUBLICAR_CARPETA (dispatch manual).

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const SITE = 'https://www.metalurgicabotomariani.com.ar';
const COLA = '_programadas';
const AUTOR = 'Metalúrgica Boto Mariani';
const IMG_EXT = ['.jpg', '.jpeg', '.png', '.webp'];
const HORA_DEFECTO = '0800';

// Categorias realmente en uso en src/content/blog. Se valida contra esta lista
// para que un typo no cree una categoria huerfana en el listado del blog.
const CATEGORIAS = [
  'Estructuras',
  'TBex',
  'Vivienda Modular',
  'Griglia',
  'Arquitectura Metalica',
  'Industria',
];

const log = (msg) => console.log(`[publicador] ${msg}`);

function resumen(linea) {
  log(linea);
  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, linea + '\n\n');
  }
}

// Momento actual en ART como string comparable "YYYY-MM-DDHHMM".
function ahoraART() {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Argentina/Buenos_Aires',
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
      .formatToParts(new Date())
      .map((x) => [x.type, x.value])
  );
  return `${p.year}-${p.month}-${p.day}${p.hour === '24' ? '00' : p.hour}${p.minute}`;
}

// Carpetas de la cola: "YYYY-MM-DD" (equivale a las 08:00) o "YYYY-MM-DD_HHMM".
// Devuelve las vencidas, de la mas vieja a la mas nueva.
// PUBLICAR_CARPETA (dispatch manual) fuerza esa carpeta sin mirar la hora.
function carpetasVencidas() {
  if (!fs.existsSync(COLA)) return [];
  if (process.env.PUBLICAR_CARPETA) {
    const nombre = process.env.PUBLICAR_CARPETA.trim();
    return fs.existsSync(path.join(COLA, nombre)) ? [nombre] : [];
  }
  const ahora = ahoraART();
  return fs
    .readdirSync(COLA, { withFileTypes: true })
    .filter((e) => e.isDirectory() && /^\d{4}-\d{2}-\d{2}(_\d{4})?$/.test(e.name))
    .map((e) => e.name)
    .filter((nombre) => {
      const [fecha, hhmm] = nombre.split('_');
      return `${fecha}${hhmm || HORA_DEFECTO}` <= ahora;
    })
    .sort();
}

function git(cmd) {
  log(`git ${cmd}`);
  execSync(`git ${cmd}`, { stdio: 'inherit' });
}

// Commit + push solo si hay algo staged (permite re-ejecutar sin romper).
function commitSiHayCambios(mensaje) {
  try {
    execSync('git diff --cached --quiet');
    log('Sin cambios para commitear (re-ejecucion): se continua.');
  } catch {
    git(`commit -m "${mensaje}"`);
    git('push');
  }
}

function parseFrontmatter(md) {
  const match = md.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const fm = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;
    let value = kv[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    fm[kv[1]] = value;
  }
  return fm;
}

async function esperarURL(url, intentos = 30, intervaloMs = 30000) {
  for (let i = 1; i <= intentos; i++) {
    try {
      const res = await fetch(url, { method: 'GET', redirect: 'follow' });
      if (res.ok) return true;
      log(`Intento ${i}/${intentos}: ${url} -> ${res.status}`);
    } catch (e) {
      log(`Intento ${i}/${intentos}: ${e.message}`);
    }
    if (i < intentos) await new Promise((r) => setTimeout(r, intervaloMs));
  }
  return false;
}

// Valida la carpeta ANTES de tocar el repo. Todo lo que puede estar mal se
// detecta aca, con la cola intacta para corregir y reintentar.
function validarCarpeta(dir, nombreCarpeta) {
  const archivos = fs.readdirSync(dir);

  const mds = archivos.filter((f) => f.endsWith('.md'));
  if (mds.length !== 1) {
    throw new Error(`${dir} debe tener exactamente UN .md (tiene ${mds.length})`);
  }
  const slug = path.basename(mds[0], '.md');
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(
      `El nombre "${mds[0]}" no sirve como slug. Solo minusculas, numeros y guiones simples.`
    );
  }

  const fm = parseFrontmatter(fs.readFileSync(path.join(dir, mds[0]), 'utf8'));
  if (!fm) throw new Error(`${mds[0]} no tiene frontmatter valido`);
  for (const campo of ['title', 'description', 'date', 'image', 'category']) {
    if (!fm[campo]) throw new Error(`Falta "${campo}" en el frontmatter de ${mds[0]}`);
  }
  if (!CATEGORIAS.includes(fm.category)) {
    throw new Error(`Categoria invalida "${fm.category}". Validas: ${CATEGORIAS.join(' | ')}`);
  }

  // La fecha del frontmatter tiene que coincidir con la de la carpeta: el sitio
  // filtra por esa fecha (src/lib/blog.ts), asi que una fecha posterior dejaria
  // el articulo publicado pero invisible.
  const fechaCarpeta = nombreCarpeta.split('_')[0];
  if (fm.date !== fechaCarpeta) {
    throw new Error(
      `La fecha del frontmatter (${fm.date}) no coincide con la carpeta (${fechaCarpeta}). ` +
        `El filtro por fecha dejaria el articulo invisible.`
    );
  }

  const imagenes = archivos.filter((f) => IMG_EXT.includes(path.extname(f).toLowerCase()));
  if (!imagenes.some((f) => f.toLowerCase().startsWith('portada'))) {
    throw new Error(`Falta portada.(jpg|png|webp) en ${dir}`);
  }
  if (!fm.image.startsWith(`/blog/${slug}/`)) {
    throw new Error(`El frontmatter "image" debe apuntar a /blog/${slug}/... (tiene: ${fm.image})`);
  }
  // El archivo referenciado en "image" debe existir fisicamente: evita el
  // mismatch .png/.jpg que deja la portada rota.
  const nombreImagen = path.basename(fm.image);
  if (!archivos.includes(nombreImagen)) {
    throw new Error(
      `"image" referencia "${nombreImagen}" y ese archivo no esta en ${dir} ` +
        `(hay: ${imagenes.join(', ') || 'ninguna'}).`
    );
  }

  if (fm.author && fm.author !== AUTOR) {
    resumen(`⚠️ ${slug}: author es "${fm.author}" — la convencion es "${AUTOR}".`);
  }

  return { slug, fm, md: mds[0], imagenes };
}

async function publicarCarpeta(nombreCarpeta) {
  const dir = path.join(COLA, nombreCarpeta);
  const { slug, fm, md, imagenes } = validarCarpeta(dir, nombreCarpeta);
  const articleUrl = `${SITE}/blog/${slug}/`;

  // --- 1. Copiar a la coleccion y a public ---
  const destinoMd = path.join('src', 'content', 'blog', `${slug}.md`);
  const destinoImgs = path.join('public', 'blog', slug);
  if (fs.existsSync(destinoMd)) {
    throw new Error(`Ya existe ${destinoMd}. El slug esta repetido.`);
  }
  fs.mkdirSync(destinoImgs, { recursive: true });
  fs.copyFileSync(path.join(dir, md), destinoMd);
  for (const img of imagenes) {
    fs.copyFileSync(path.join(dir, img), path.join(destinoImgs, img));
  }
  log(`Copiado ${destinoMd} + ${imagenes.length} imagen(es) a ${destinoImgs}`);

  // --- 2. Build de control ---
  // El schema de Astro y el YAML recien se validan de verdad al construir. Sin
  // esta barrera, un frontmatter mal formado se commitea y rompe el deploy de
  // TODO el sitio, no solo del articulo nuevo.
  try {
    log('Build de control...');
    execSync('npm run build', { stdio: 'inherit' });
  } catch {
    fs.rmSync(destinoMd, { force: true });
    fs.rmSync(destinoImgs, { recursive: true, force: true });
    throw new Error(
      `${slug}: el build fallo, probablemente por el frontmatter. No se commiteo nada y la carpeta sigue en la cola.`
    );
  }

  // --- 3. Commit y deploy ---
  git(`add "${destinoMd}" "${destinoImgs}"`);
  commitSiHayCambios(`blog: ${fm.title.replace(/"/g, "'")}`);
  resumen(`Blog publicado: ${articleUrl}`);

  // Vercel no siempre buildea los pushes hechos con el token del bot de Actions.
  // El deploy hook fuerza el build.
  if (process.env.VERCEL_DEPLOY_HOOK) {
    const hookRes = await fetch(process.env.VERCEL_DEPLOY_HOOK, { method: 'POST' });
    log(`Deploy hook de Vercel disparado (${hookRes.status})`);
  } else {
    resumen('VERCEL_DEPLOY_HOOK sin configurar: el deploy queda a merced del webhook de git.');
  }

  log('Esperando el deploy de Vercel...');
  if (!(await esperarURL(articleUrl))) {
    throw new Error(
      `${slug}: la URL no respondio 200 en ~15 min (${articleUrl}). Revisar el deploy en Vercel.`
    );
  }
  log('URL viva.');

  // --- 4. Archivar la carpeta ---
  const archivoDir = path.join(COLA, 'publicadas', nombreCarpeta);
  fs.mkdirSync(path.dirname(archivoDir), { recursive: true });
  fs.renameSync(dir, archivoDir);
  fs.writeFileSync(
    path.join(archivoDir, 'resultado.json'),
    JSON.stringify({ carpeta: nombreCarpeta, slug, articleUrl, publicado: ahoraART() }, null, 2)
  );
  git(`add -A ${COLA}`);
  commitSiHayCambios(`chore(programadas): archivar ${nombreCarpeta} (${slug})`);
  resumen(`Carpeta archivada en ${COLA}/publicadas/${nombreCarpeta}`);

  // Fase 1: LinkedIn a mano. No es un error, es un recordatorio.
  if (fs.existsSync(path.join(archivoDir, 'linkedin.txt'))) {
    resumen(
      `PENDIENTE postear en LinkedIn. El texto quedo en ${COLA}/publicadas/${nombreCarpeta}/linkedin.txt`
    );
  }
}

// Aviso nocturno: si a las 22:00 ART la cola quedo sin nada pendiente, el
// workflow falla a proposito para que GitHub mande el mail esa misma noche.
function alertaColaVacia() {
  const ahora = ahoraART();
  if (ahora.slice(10) < '2200') return;
  const pendientes = fs.existsSync(COLA)
    ? fs
        .readdirSync(COLA, { withFileTypes: true })
        .filter((e) => e.isDirectory() && /^\d{4}-\d{2}-\d{2}(_\d{4})?$/.test(e.name))
    : [];
  if (!pendientes.length) {
    throw new Error(
      `COLA VACIA: no queda ninguna carpeta en ${COLA}/. Cargar la tanda de la semana.`
    );
  }
  log(`Cola: ${pendientes.length} carpeta(s) pendiente(s).`);
}

async function main() {
  const pendientes = carpetasVencidas();
  log(`Ahora (ART): ${ahoraART()} - carpetas vencidas: ${pendientes.length}`);

  const errores = [];
  for (const carpeta of pendientes) {
    log(`=== Publicando ${carpeta} ===`);
    try {
      await publicarCarpeta(carpeta);
    } catch (err) {
      errores.push(`${carpeta}: ${err.message}`);
      resumen(`ERROR en ${carpeta}: ${err.message}`);
    }
  }

  if (errores.length) {
    throw new Error(`${errores.length} carpeta(s) con error:\n- ${errores.join('\n- ')}`);
  }
}

// Revisa TODA la cola sin publicar nada. Es el chequeo para correr a mano
// despues de cargar la tanda de la semana: `node scripts/publicador/publicar.mjs --validar`
function validarCola() {
  const todas = fs.existsSync(COLA)
    ? fs
        .readdirSync(COLA, { withFileTypes: true })
        .filter((e) => e.isDirectory() && /^\d{4}-\d{2}-\d{2}(_\d{4})?$/.test(e.name))
        .map((e) => e.name)
        .sort()
    : [];

  const errores = [];
  for (const nombre of todas) {
    try {
      const { slug } = validarCarpeta(path.join(COLA, nombre), nombre);
      log(`OK   ${nombre}  ->  /blog/${slug}/`);
    } catch (err) {
      errores.push(nombre);
      log(`MAL  ${nombre}: ${err.message}`);
    }
  }
  log(`${todas.length} carpeta(s) en cola, ${errores.length} con problemas.`);
  if (errores.length) process.exit(1);
}

// El script se invoca en cuatro modos:
//   --contar   cuantas carpetas estan vencidas (para saltear npm ci si no hay nada)
//   --validar  revisa toda la cola sin publicar (uso manual)
//   --alerta   solo el aviso nocturno de cola vacia
//   (sin flag) publicar las vencidas
if (process.argv.includes('--contar')) {
  console.log(carpetasVencidas().length);
} else if (process.argv.includes('--validar')) {
  validarCola();
} else if (process.argv.includes('--alerta')) {
  try {
    alertaColaVacia();
  } catch (err) {
    console.error(`\n[publicador] ${err.message}`);
    if (process.env.GITHUB_STEP_SUMMARY) {
      fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${err.message}\n`);
    }
    process.exit(1);
  }
} else {
  main()
    .catch((err) => {
      console.error(`\n[publicador] ERROR: ${err.message}`);
      if (process.env.GITHUB_STEP_SUMMARY) {
        fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `ERROR: ${err.message}\n`);
      }
      process.exit(1);
    });
}
