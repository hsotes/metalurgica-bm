const ANTHROPIC_API = 'https://api.anthropic.com/v1/messages';
const OPENAI_API = 'https://api.openai.com/v1/chat/completions';
const CLAUDE_MODEL = 'claude-sonnet-4-20250514';
const GPT_MODEL = 'gpt-4o';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { apiKey, provider, action, data } = req.body;
  if (!apiKey) return res.status(400).json({ error: 'API key requerida. Configura tu API key en Configuracion.' });

  const callAI = provider === 'openai' ? callGPT : callClaude;

  try {
    if (action === 'import_article') {
      return res.json(await importArticle(callAI, apiKey, data));
    } else if (action === 'linkedin') {
      return res.json(await generateLinkedIn(callAI, apiKey, data));
    } else if (action === 'linkedin_trabajo') {
      return res.json(await generateLinkedInTrabajo(callAI, apiKey, data));
    } else {
      return res.status(400).json({ error: 'Accion desconocida' });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Error de IA' });
  }
}

type AICall = (apiKey: string, prompt: string, maxTokens: number) => Promise<string>;

async function callClaude(apiKey: string, prompt: string, maxTokens = 4096): Promise<string> {
  const r = await fetch(ANTHROPIC_API, {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: maxTokens,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  if (!r.ok) {
    const err = await r.json().catch(() => ({}));
    throw new Error(err.error?.message || `Anthropic API error: ${r.status}`);
  }
  const data = await r.json();
  return data.content[0].text;
}

async function callGPT(apiKey: string, prompt: string, maxTokens = 4096): Promise<string> {
  const r = await fetch(OPENAI_API, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: GPT_MODEL,
      max_tokens: maxTokens,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  if (!r.ok) {
    const err = await r.json().catch(() => ({}));
    throw new Error(err.error?.message || `OpenAI API error: ${r.status}`);
  }
  const data = await r.json();
  return data.choices[0].message.content;
}

async function importArticle(callAI: AICall, apiKey: string, data: { title: string; content: string; sourceUrl: string }) {
  const prompt = `Eres el editor jefe de Metalurgica Boto Mariani, una empresa metalurgica argentina con mas de 30 años de experiencia en estructuras metalicas, arquitectura metalica, parrillas de acero inoxidable (marca Griglia), vivienda modular y gabinetes industriales (TBex).

Tu tarea: tomar el siguiente articulo de un competidor y crear una version COMPLETAMENTE NUEVA, profesional y optimizada para SEO, en español argentino.

ARTICULO ORIGINAL:
Titulo: ${data.title}
URL fuente: ${data.sourceUrl}

Contenido:
${data.content.slice(0, 8000)}

INSTRUCCIONES EDITORIALES (SOP001):
1. TRADUCE al español argentino si esta en otro idioma
2. REESCRIBE completamente con voz propia - NO copies textualmente
3. Estructura editorial profesional:
   - Introduccion atrapante que enganche al lector (2-3 parrafos)
   - Secciones con subtitulos H2 claros y descriptivos
   - Datos tecnicos precisos con explicaciones accesibles
   - Listas y tablas comparativas donde corresponda
   - Conclusion con valor agregado
4. El articulo debe tener MINIMO 1000 palabras
5. Termina con: "---\\n\\nEn **Metalurgica Boto Mariani** tenemos mas de 30 años fabricando soluciones metalicas a medida. [Consultanos sobre tu proyecto](/contacto/)."
6. Usa "vos" en lugar de "tu" (español argentino)
7. Incluye datos tecnicos reales y precisos

METADATOS SEO (SOP001):
- Titulo SEO: max 60 caracteres, incluir keyword principal
- Meta descripcion: 150-160 caracteres, persuasiva, con keyword
- Slug URL: sin acentos ni ñ, palabras separadas por guiones, max 5 palabras
- Tags: 5 keywords relevantes en español
- Categoria: EXACTAMENTE una de estas: Estructuras, Arquitectura Metalica, Griglia, Vivienda Modular, TBex, Industria

RESPONDE UNICAMENTE con JSON valido (sin code blocks ni explicaciones). Estructura exacta:
{
  "title": "titulo seo",
  "description": "meta descripcion seo",
  "slug": "slug-url",
  "category": "Categoria",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "content": "articulo completo en markdown"
}`;

  const response = await callAI(apiKey, prompt, 8192);

  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) return JSON.parse(jsonMatch[0]);
    return JSON.parse(response);
  } catch {
    throw new Error('Error parseando respuesta de IA. Intenta de nuevo.');
  }
}

async function generateLinkedIn(callAI: AICall, apiKey: string, data: { title: string; content: string; blogUrl: string }) {
  const prompt = `Genera un post de LinkedIn profesional en español argentino para Metalurgica Boto Mariani.

ARTICULO DE BLOG:
Titulo: ${data.title}
URL: ${data.blogUrl}
Contenido (resumen):
${data.content.slice(0, 3000)}

FORMATO DEL POST:
1. GANCHO: Pregunta provocadora o dato impactante (1 linea)
2. Linea en blanco
3. DESARROLLO: 3-4 puntos clave del articulo, cada uno en su linea
4. Linea en blanco
5. CTA: Invitar a leer el articulo completo con el link
6. Linea en blanco
7. HASHTAGS: 5-6 hashtags relevantes

REGLAS:
- Maximo 1300 caracteres total
- Tono profesional pero cercano, NO corporativo aburrido
- NO uses "Hola red!" ni "Les comparto" ni cliches de LinkedIn
- SI menciona que es de Metalurgica Boto Mariani
- Usa emojis con moderacion (max 3-4 en todo el post)
- El link al blog va en el CTA

RESPONDE UNICAMENTE con el texto del post, sin explicaciones ni comillas envolventes.`;

  const post = await callAI(apiKey, prompt, 1024);
  return { post: post.trim() };
}

async function generateLinkedInTrabajo(callAI: AICall, apiKey: string, data: { projectName: string; description: string; category: string; photos: string[] }) {
  const prompt = `Genera un post de LinkedIn profesional en español argentino para Metalurgica Boto Mariani, anunciando la entrega de un proyecto completado.

DATOS DEL PROYECTO:
Nombre: ${data.projectName}
Categoria: ${data.category}
Descripcion: ${data.description}
Cantidad de fotos que acompanan el post: ${data.photos.length}

FORMATO DEL POST:
1. GANCHO: Dato impactante o frase que genere orgullo profesional (1 linea)
2. Linea en blanco
3. DESCRIPCION: Que se hizo, para quien, caracteristicas tecnicas relevantes (3-5 lineas)
4. Linea en blanco
5. CIERRE: Frase de orgullo + invitar a contactar para proyectos similares
6. Linea en blanco
7. HASHTAGS: 5-6 hashtags relevantes

REGLAS:
- Maximo 1300 caracteres total
- Tono profesional pero cercano, con orgullo por el trabajo realizado
- NO uses "Hola red!" ni cliches de LinkedIn
- SI menciona que es de Metalurgica Boto Mariani
- Usa emojis con moderacion (max 3-4)
- ${data.photos.length > 0 ? 'Menciona que las fotos muestran el resultado final' : 'No menciones fotos'}
- Incluye datos tecnicos si la descripcion los proporciona

RESPONDE UNICAMENTE con el texto del post, sin explicaciones ni comillas envolventes.`;

  const post = await callAI(apiKey, prompt, 1024);
  return { post: post.trim() };
}
