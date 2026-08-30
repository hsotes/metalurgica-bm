import { getCollection, type CollectionEntry } from 'astro:content';

// Argentina no aplica horario de verano: el offset es fijo en UTC-3.
const OFFSET_ART_MS = 3 * 60 * 60 * 1000;

// Momento actual expresado como si el reloj de Buenos Aires fuera UTC. Hace falta
// porque Astro interpreta la fecha del frontmatter como medianoche UTC del dia
// calendario: sin este corrimiento, un deploy hecho despues de las 21:00 de un dia
// adelantaria el articulo del dia siguiente.
function ahoraEnArgentina(): Date {
  return new Date(Date.now() - OFFSET_ART_MS);
}

// Articulos ya publicados, del mas reciente al mas viejo.
//
// Un articulo con fecha futura queda programado: no genera pagina, no aparece en el
// listado y no entra al sitemap hasta que el sitio se reconstruya en su fecha o
// despues. El rebuild diario lo dispara .github/workflows/publicar-programados.yml
//
// En `astro dev` no se filtra nada, para poder revisar la cola antes de que salga.
export async function getPublishedPosts(): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getCollection('blog');
  const ahora = ahoraEnArgentina().valueOf();

  return posts
    .filter((post) => import.meta.env.DEV || post.data.date.valueOf() <= ahora)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
