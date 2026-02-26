// ============================================================
// LOCAL STORAGE: Calendar + Scraper Sites + Banco de Contenido
// ============================================================

export interface CalendarEntry {
  id: string;
  date: string;
  title: string;
  category: string;
  contentType: string;
  status: 'suggested' | 'planned' | 'draft' | 'published';
  notes: string;
  sourceUrl?: string;
}

export interface ScraperSite {
  id: string;
  name: string;
  blogUrl: string;
  tag: string;
}

export interface BancoPost {
  id: string;
  sourceUrl: string;
  sourceSiteName: string;
  title: string;
  image: string;
  excerpt: string;
  date: string;
  scrapedAt: string;
  used: boolean;
  tag: string;
}

export interface EditorDraft {
  title: string;
  description: string;
  category: string;
  tags: string;
  image: string;
  date: string;
  body: string;
  sourceImages: string[];
  savedAt: string;
  editingFilename?: string;
  editingSha?: string;
  sourceUrl?: string;
}

const CALENDAR_KEY = 'mbm_calendar';
const SCRAPER_SITES_KEY = 'mbm_scraper_sites';
const BANCO_KEY = 'mbm_banco';
const AI_PROVIDER_KEY = 'mbm_ai_provider';
const DRAFT_KEY = 'mbm_editor_draft';

// --- AI Provider (solo la preferencia, NO las keys) ---

export function getAiProvider(): 'anthropic' | 'openai' {
  return (localStorage.getItem(AI_PROVIDER_KEY) as any) || 'openai';
}

export function setAiProvider(provider: 'anthropic' | 'openai') {
  localStorage.setItem(AI_PROVIDER_KEY, provider);
}

// Limpiar keys viejas que pudieran quedar en localStorage
export function cleanupOldKeys() {
  localStorage.removeItem('mbm_ai_key');
  localStorage.removeItem('mbm_gpt_key');
  localStorage.removeItem('mbm_github_token');
}

// --- Editor Draft ---

export function saveDraft(draft: EditorDraft): void {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
}

export function getDraft(): EditorDraft | null {
  const data = localStorage.getItem(DRAFT_KEY);
  return data ? JSON.parse(data) : null;
}

export function clearDraft(): void {
  localStorage.removeItem(DRAFT_KEY);
}

export function hasDraft(): boolean {
  return !!localStorage.getItem(DRAFT_KEY);
}

// --- Calendar ---

export function getCalendar(): CalendarEntry[] {
  const data = localStorage.getItem(CALENDAR_KEY);
  if (!data) return generateSuggestedCalendar();
  return JSON.parse(data);
}

export function saveCalendar(entries: CalendarEntry[]) {
  localStorage.setItem(CALENDAR_KEY, JSON.stringify(entries));
}

export function addCalendarEntry(entry: Omit<CalendarEntry, 'id'>): CalendarEntry {
  const entries = getCalendar();
  const newEntry = { ...entry, id: crypto.randomUUID() };
  entries.push(newEntry);
  saveCalendar(entries);
  return newEntry;
}

export function updateCalendarEntry(id: string, updates: Partial<CalendarEntry>) {
  const entries = getCalendar();
  const idx = entries.findIndex(e => e.id === id);
  if (idx >= 0) {
    entries[idx] = { ...entries[idx], ...updates };
    saveCalendar(entries);
  }
}

export function deleteCalendarEntry(id: string) {
  saveCalendar(getCalendar().filter(e => e.id !== id));
}

// --- Scraper Sites ---

export function getScraperSites(): ScraperSite[] {
  const data = localStorage.getItem(SCRAPER_SITES_KEY);
  if (!data) return [];
  return (JSON.parse(data) as any[]).map(s => ({ ...s, tag: s.tag || 'General' }));
}

export function saveScraperSites(sites: ScraperSite[]) {
  localStorage.setItem(SCRAPER_SITES_KEY, JSON.stringify(sites));
}

export function addScraperSite(site: Omit<ScraperSite, 'id'>): ScraperSite {
  const sites = getScraperSites();
  const newSite = { ...site, id: crypto.randomUUID() };
  sites.push(newSite);
  saveScraperSites(sites);
  return newSite;
}

export function deleteScraperSite(id: string) {
  saveScraperSites(getScraperSites().filter(s => s.id !== id));
}

// --- Banco de Contenido ---

export function getBanco(): BancoPost[] {
  const data = localStorage.getItem(BANCO_KEY);
  if (!data) return [];
  return (JSON.parse(data) as any[]).map(p => ({ ...p, tag: p.tag || 'General' }));
}

export function saveBanco(posts: BancoPost[]) {
  localStorage.setItem(BANCO_KEY, JSON.stringify(posts));
}

export function addToBanco(posts: Omit<BancoPost, 'id' | 'scrapedAt' | 'used'>[]): number {
  const banco = getBanco();
  const existingUrls = new Set(banco.map(p => p.sourceUrl));
  let added = 0;

  for (const post of posts) {
    if (post.sourceUrl && !existingUrls.has(post.sourceUrl)) {
      banco.push({
        ...post,
        id: crypto.randomUUID(),
        scrapedAt: new Date().toISOString(),
        used: false,
      });
      existingUrls.add(post.sourceUrl);
      added++;
    }
  }

  saveBanco(banco);
  return added;
}

export function markBancoPostUsed(id: string) {
  const banco = getBanco();
  const idx = banco.findIndex(p => p.id === id);
  if (idx >= 0) {
    banco[idx].used = true;
    saveBanco(banco);
  }
}

export function removeBancoPost(id: string) {
  saveBanco(getBanco().filter(p => p.id !== id));
}

export function clearBanco() {
  localStorage.removeItem(BANCO_KEY);
}

// --- Auto-plan from Banco ---

export function autoplanFromBanco(startDate: string): { planned: number; weeks: number; endDate: string } {
  const banco = getBanco();
  const unused = banco.filter(p => !p.used);
  if (unused.length === 0) return { planned: 0, weeks: 0, endDate: startDate };

  // Shuffle for variety of sources
  const shuffled = [...unused].sort(() => Math.random() - 0.5);

  const start = new Date(startDate);
  // Align to next Monday if not already Monday
  const dayOfWeek = start.getDay();
  if (dayOfWeek !== 1) {
    start.setDate(start.getDate() + ((8 - dayOfWeek) % 7 || 7));
  }

  const entries = getCalendar();
  let weekOffset = 0;
  let planned = 0;

  for (let i = 0; i < shuffled.length; i++) {
    const post = shuffled[i];
    const dayInWeek = i % 3; // 0=Tue, 1=Wed, 2=Thu
    const pubDate = new Date(start);
    pubDate.setDate(start.getDate() + weekOffset * 7 + dayInWeek + 1); // +1 because start is Monday

    const dateStr = pubDate.toISOString().split('T')[0];

    entries.push({
      id: crypto.randomUUID(),
      date: dateStr,
      title: post.title,
      category: 'Industria', // Will be overridden when AI processes the article
      contentType: 'articulo',
      status: 'planned',
      notes: post.excerpt || '',
      sourceUrl: post.sourceUrl,
    });

    // Mark as used
    const bancoIdx = banco.findIndex(b => b.id === post.id);
    if (bancoIdx >= 0) banco[bancoIdx].used = true;

    planned++;
    if ((i + 1) % 3 === 0) weekOffset++;
  }

  saveCalendar(entries);
  saveBanco(banco);

  const lastDate = new Date(start);
  lastDate.setDate(start.getDate() + weekOffset * 7 + 4);

  return {
    planned,
    weeks: weekOffset + 1,
    endDate: lastDate.toISOString().split('T')[0],
  };
}

// ============================================================
// GENERATE SUGGESTED CALENDAR (3x/week, 12 weeks)
// ============================================================

function generateSuggestedCalendar(): CalendarEntry[] {
  const suggestions = [
    { dow: 2, title: 'Tipos de galpones metalicos: cual elegir segun tu industria', cat: 'Estructuras', type: 'comparativa' },
    { dow: 3, title: '5 errores comunes al elegir una parrilla de acero inoxidable', cat: 'Griglia', type: 'listicle' },
    { dow: 4, title: 'Tendencias en barandas metalicas para edificios 2026', cat: 'Arquitectura Metalica', type: 'articulo' },
    { dow: 2, title: 'Vivienda modular vs construccion tradicional: costos y tiempos reales', cat: 'Vivienda Modular', type: 'comparativa' },
    { dow: 3, title: 'Gabinetes electricos para industria petrolera: requisitos y normas', cat: 'TBex', type: 'guia' },
    { dow: 4, title: 'Caso: Galpon industrial 500m2 en zona norte de Buenos Aires', cat: 'Estructuras', type: 'caso' },
    { dow: 2, title: 'Como mantener tu parrilla de acero inoxidable en perfecto estado', cat: 'Griglia', type: 'guia' },
    { dow: 3, title: '8 disenos de escaleras metalicas que transforman espacios', cat: 'Arquitectura Metalica', type: 'listicle' },
    { dow: 4, title: 'Ventajas de las oficinas modulares para obras en construccion', cat: 'Vivienda Modular', type: 'articulo' },
    { dow: 2, title: 'Acero galvanizado vs pintura epoxi: que proteccion elegir', cat: 'Estructuras', type: 'comparativa' },
    { dow: 3, title: 'Parrillas empotrables: la tendencia en cocinas modernas', cat: 'Griglia', type: 'articulo' },
    { dow: 4, title: 'Shelters y gabinetes con certificacion INTI: que significa', cat: 'TBex', type: 'guia' },
    { dow: 2, title: 'Portones corredizos automaticos: guia completa de instalacion', cat: 'Arquitectura Metalica', type: 'guia' },
    { dow: 3, title: 'Caso: Vivienda modular de emergencia para municipio', cat: 'Vivienda Modular', type: 'caso' },
    { dow: 4, title: '7 senales de que tu estructura metalica necesita mantenimiento', cat: 'Estructuras', type: 'listicle' },
    { dow: 2, title: 'Hierro forjado vs acero inoxidable en barandas: pros y contras', cat: 'Arquitectura Metalica', type: 'comparativa' },
    { dow: 3, title: 'Parrillas a medida: como disenar la parrilla perfecta', cat: 'Griglia', type: 'guia' },
    { dow: 4, title: 'Construccion modular en Argentina: el mercado en 2026', cat: 'Vivienda Modular', type: 'articulo' },
    { dow: 2, title: 'Naves industriales: estructura reticulada vs portico rigido', cat: 'Estructuras', type: 'comparativa' },
    { dow: 3, title: 'Caso: Escalera helicoidal en acero para edificio residencial', cat: 'Arquitectura Metalica', type: 'caso' },
    { dow: 4, title: 'Skids metalicos para la industria del petroleo y gas', cat: 'TBex', type: 'articulo' },
    { dow: 2, title: '10 ideas de cerramientos metalicos para tu jardin', cat: 'Arquitectura Metalica', type: 'listicle' },
    { dow: 3, title: 'Parrilla de hierro vs acero: diferencias reales en el asado', cat: 'Griglia', type: 'comparativa' },
    { dow: 4, title: 'Como calcular la estructura de un entrepiso metalico', cat: 'Estructuras', type: 'guia' },
    { dow: 2, title: 'Containers habitables: tendencia o solucion real?', cat: 'Vivienda Modular', type: 'articulo' },
    { dow: 3, title: 'Caso: Gabinete para estacion satelital YPF', cat: 'TBex', type: 'caso' },
    { dow: 4, title: 'Pergolas metalicas: 6 disenos modernos para tu patio', cat: 'Arquitectura Metalica', type: 'listicle' },
    { dow: 2, title: 'Corrosion en estructuras metalicas: tipos y como prevenirla', cat: 'Estructuras', type: 'guia' },
    { dow: 3, title: 'Asadores profesionales: que buscar en una parrilla comercial', cat: 'Griglia', type: 'articulo' },
    { dow: 4, title: 'Construccion off-site: la revolucion de la vivienda modular', cat: 'Vivienda Modular', type: 'articulo' },
    { dow: 2, title: 'Caso: Estructura metalica para planta de alimentos', cat: 'Estructuras', type: 'caso' },
    { dow: 3, title: 'Rejas modernas: seguridad sin sacrificar diseno', cat: 'Arquitectura Metalica', type: 'listicle' },
    { dow: 4, title: 'Materiales para parrillas: acero 304 vs 430', cat: 'Griglia', type: 'comparativa' },
    { dow: 2, title: 'Ampliaciones con estructura metalica: ventajas sobre mamposteria', cat: 'Estructuras', type: 'comparativa' },
    { dow: 3, title: 'Caso: Oficinas modulares para obra de Central Puerto', cat: 'Vivienda Modular', type: 'caso' },
    { dow: 4, title: 'Acabados en metalurgia: pintura, galvanizado, anodizado', cat: 'Arquitectura Metalica', type: 'guia' },
  ];

  const entries: CalendarEntry[] = [];
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() + ((8 - today.getDay()) % 7 || 7));

  let weekOffset = 0;
  for (let i = 0; i < suggestions.length; i++) {
    const s = suggestions[i];
    const weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() + weekOffset * 7);
    const pubDate = new Date(weekStart);
    pubDate.setDate(weekStart.getDate() + (s.dow - 1));

    entries.push({
      id: `suggested-${i}`,
      date: pubDate.toISOString().split('T')[0],
      title: s.title,
      category: s.cat,
      contentType: s.type,
      status: 'suggested',
      notes: '',
    });

    if ((i + 1) % 3 === 0) weekOffset++;
  }

  localStorage.setItem(CALENDAR_KEY, JSON.stringify(entries));
  return entries;
}

// ============================================================
// MIGRACIÓN: Re-etiquetar sitios existentes + agregar TBEX
// ============================================================

const MIGRATION_KEY = 'mbm_scraper_migrated_v1';

export function migrateScraperSites(): void {
  if (localStorage.getItem(MIGRATION_KEY)) return; // ya migrado

  const sites = getScraperSites();
  const existingUrls = new Set(sites.map(s => s.blogUrl.toLowerCase()));

  // 1. Re-etiquetar sitios existentes según patrones
  for (const site of sites) {
    const n = (site.name + ' ' + site.blogUrl).toLowerCase();
    if (/grill|parrilla|griglia|pianeta|soberano|american.?made/i.test(n)) {
      site.tag = 'Griglia';
    } else if (/modular|prefab|inhaus|casas|dvele|plant.?prefab|viviendas/i.test(n)) {
      site.tag = 'Modular';
    } else if (/steel|metal|acero|estrutura|calais|arcelormittal|bauforumstahl|metallbau|kloeckner|bci|italfaber|fxt|futurtek|marchetto|manni|ampla|armac|coppermetal|hackbarth|metro.?steel|dario.?flaccovio/i.test(n)) {
      site.tag = 'Estructuras';
    } else if (/blog.?modulaire|leblogmodulaire|sienge/i.test(n)) {
      site.tag = 'Modular';
    }
    // los que no matchean quedan como estaban (General)
  }

  // 2. Agregar sitios TBEX
  const tbexSites: Omit<ScraperSite, 'id'>[] = [
    // USA
    { name: 'Falcon Structures', blogUrl: 'https://www.falconstructures.com/blog/', tag: 'TBEX' },
    { name: 'Bud Industries', blogUrl: 'https://www.budind.com/blog/', tag: 'TBEX' },
    { name: 'Polycase TechTalk', blogUrl: 'https://www.polycase.com/techtalk/', tag: 'TBEX' },
    { name: 'American Products', blogUrl: 'https://amprod.us/blog/', tag: 'TBEX' },
    { name: 'Vertiv', blogUrl: 'https://www.vertiv.com/en-us/about/news-and-insights/vertiv-blog/', tag: 'TBEX' },
    { name: 'Maysteel Industries', blogUrl: 'https://www.maysteel.com/blog', tag: 'TBEX' },
    { name: 'NEMA Enclosures', blogUrl: 'https://www.nemaenclosures.com/blog/', tag: 'TBEX' },
    { name: 'Shelter Works', blogUrl: 'https://www.shelterworks.com/', tag: 'TBEX' },
    { name: 'Raycap', blogUrl: 'https://www.raycap.com/', tag: 'TBEX' },
    // Europa
    { name: 'Rittal', blogUrl: 'https://blog.rittal.co.uk/', tag: 'TBEX' },
    { name: 'Schneider Electric', blogUrl: 'https://blog.se.com/', tag: 'TBEX' },
    { name: 'Delvalle Box', blogUrl: 'https://www.delvallebox.com/news/', tag: 'TBEX' },
    { name: 'Grolleau', blogUrl: 'https://www.grolleau.fr/blog/', tag: 'TBEX' },
    { name: 'nVent (Hoffman)', blogUrl: 'https://blog.nvent.com/', tag: 'TBEX' },
    { name: 'Ensto', blogUrl: 'https://www.ensto.com/company/newsroom/', tag: 'TBEX' },
    // Brasil
    { name: 'DBTEC', blogUrl: 'https://dbtec.com.br/post/', tag: 'TBEX' },
    // China (en inglés)
    { name: 'ESTEL Telecom', blogUrl: 'https://blog.outdoortelecomcabinet.com/', tag: 'TBEX' },
    { name: 'KL Telecom', blogUrl: 'https://www.kl-telecom.com/resources/', tag: 'TBEX' },
  ];

  for (const ts of tbexSites) {
    if (!existingUrls.has(ts.blogUrl.toLowerCase())) {
      sites.push({ ...ts, id: crypto.randomUUID() });
    }
  }

  saveScraperSites(sites);

  // 3. Re-etiquetar banco existente
  const banco = getBanco();
  const siteTagMap = new Map(sites.map(s => [s.name, s.tag]));
  for (const post of banco) {
    const siteTag = siteTagMap.get(post.sourceSiteName);
    if (siteTag) post.tag = siteTag;
  }
  saveBanco(banco);

  localStorage.setItem(MIGRATION_KEY, '1');
}
