// ============================================================
// LOCAL STORAGE for Calendar + Scraper Sites
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
}

const CALENDAR_KEY = 'mbm_calendar';
const SCRAPER_SITES_KEY = 'mbm_scraper_sites';

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
  const entries = getCalendar().filter(e => e.id !== id);
  saveCalendar(entries);
}

// --- Scraper Sites ---

export function getScraperSites(): ScraperSite[] {
  const data = localStorage.getItem(SCRAPER_SITES_KEY);
  return data ? JSON.parse(data) : [];
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

// ============================================================
// GENERATE SUGGESTED CALENDAR (3x/week, 12 weeks)
// Based on LinkedIn research: Tue/Wed/Thu, 70/20/10 content mix
// ============================================================

function generateSuggestedCalendar(): CalendarEntry[] {
  const suggestions = [
    // Week 1
    { dow: 2, title: 'Tipos de galpones metalicos: cual elegir segun tu industria', cat: 'Estructuras', type: 'comparativa' },
    { dow: 3, title: '5 errores comunes al elegir una parrilla de acero inoxidable', cat: 'Griglia', type: 'listicle' },
    { dow: 4, title: 'Tendencias en barandas metalicas para edificios 2026', cat: 'Arquitectura Metalica', type: 'articulo' },
    // Week 2
    { dow: 2, title: 'Vivienda modular vs construccion tradicional: costos y tiempos reales', cat: 'Vivienda Modular', type: 'comparativa' },
    { dow: 3, title: 'Gabinetes electricos para industria petrolera: requisitos y normas', cat: 'TBex', type: 'guia' },
    { dow: 4, title: 'Caso: Galpon industrial 500m2 en zona norte de Buenos Aires', cat: 'Estructuras', type: 'caso' },
    // Week 3
    { dow: 2, title: 'Como mantener tu parrilla de acero inoxidable en perfecto estado', cat: 'Griglia', type: 'guia' },
    { dow: 3, title: '8 disenos de escaleras metalicas que transforman espacios', cat: 'Arquitectura Metalica', type: 'listicle' },
    { dow: 4, title: 'Ventajas de las oficinas modulares para obras en construccion', cat: 'Vivienda Modular', type: 'articulo' },
    // Week 4
    { dow: 2, title: 'Acero galvanizado vs pintura epoxi: que proteccion elegir', cat: 'Estructuras', type: 'comparativa' },
    { dow: 3, title: 'Parrillas empotrables: la tendencia en cocinas modernas', cat: 'Griglia', type: 'articulo' },
    { dow: 4, title: 'Shelters y gabinetes con certificacion INTI: que significa', cat: 'TBex', type: 'guia' },
    // Week 5
    { dow: 2, title: 'Portones corredizos automaticos: guia completa de instalacion', cat: 'Arquitectura Metalica', type: 'guia' },
    { dow: 3, title: 'Caso: Vivienda modular de emergencia para municipio', cat: 'Vivienda Modular', type: 'caso' },
    { dow: 4, title: '7 senales de que tu estructura metalica necesita mantenimiento', cat: 'Estructuras', type: 'listicle' },
    // Week 6
    { dow: 2, title: 'Hierro forjado vs acero inoxidable en barandas: pros y contras', cat: 'Arquitectura Metalica', type: 'comparativa' },
    { dow: 3, title: 'Parrillas a medida: como disenar la parrilla perfecta', cat: 'Griglia', type: 'guia' },
    { dow: 4, title: 'Construccion modular en Argentina: el mercado en 2026', cat: 'Vivienda Modular', type: 'articulo' },
    // Week 7
    { dow: 2, title: 'Naves industriales: estructura reticulada vs portico rigido', cat: 'Estructuras', type: 'comparativa' },
    { dow: 3, title: 'Caso: Escalera helicoidal en acero para edificio residencial', cat: 'Arquitectura Metalica', type: 'caso' },
    { dow: 4, title: 'Skids metalicos para la industria del petroleo y gas', cat: 'TBex', type: 'articulo' },
    // Week 8
    { dow: 2, title: '10 ideas de cerramientos metalicos para tu jardin', cat: 'Arquitectura Metalica', type: 'listicle' },
    { dow: 3, title: 'Parrilla de hierro vs acero: diferencias reales en el asado', cat: 'Griglia', type: 'comparativa' },
    { dow: 4, title: 'Como calcular la estructura de un entrepiso metalico', cat: 'Estructuras', type: 'guia' },
    // Week 9
    { dow: 2, title: 'Containers habitables: tendencia o solucion real?', cat: 'Vivienda Modular', type: 'articulo' },
    { dow: 3, title: 'Caso: Gabinete para estacion satelital YPF', cat: 'TBex', type: 'caso' },
    { dow: 4, title: 'Pergolas metalicas: 6 disenos modernos para tu patio', cat: 'Arquitectura Metalica', type: 'listicle' },
    // Week 10
    { dow: 2, title: 'Corrosion en estructuras metalicas: tipos y como prevenirla', cat: 'Estructuras', type: 'guia' },
    { dow: 3, title: 'Asadores profesionales: que buscar en una parrilla comercial', cat: 'Griglia', type: 'articulo' },
    { dow: 4, title: 'Construccion off-site: la revolucion de la vivienda modular', cat: 'Vivienda Modular', type: 'articulo' },
    // Week 11
    { dow: 2, title: 'Caso: Estructura metalica para planta de alimentos', cat: 'Estructuras', type: 'caso' },
    { dow: 3, title: 'Rejas modernas: seguridad sin sacrificar diseno', cat: 'Arquitectura Metalica', type: 'listicle' },
    { dow: 4, title: 'Materiales para parrillas: acero 304 vs 430', cat: 'Griglia', type: 'comparativa' },
    // Week 12
    { dow: 2, title: 'Ampliaciones con estructura metalica: ventajas sobre mamposteria', cat: 'Estructuras', type: 'comparativa' },
    { dow: 3, title: 'Caso: Oficinas modulares para obra de Central Puerto', cat: 'Vivienda Modular', type: 'caso' },
    { dow: 4, title: 'Acabados en metalurgia: pintura, galvanizado, anodizado', cat: 'Arquitectura Metalica', type: 'guia' },
  ];

  const entries: CalendarEntry[] = [];
  const today = new Date();
  // Start from next Monday
  const startDate = new Date(today);
  startDate.setDate(today.getDate() + ((8 - today.getDay()) % 7 || 7));

  let weekOffset = 0;
  for (let i = 0; i < suggestions.length; i++) {
    const s = suggestions[i];
    const weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() + weekOffset * 7);

    const pubDate = new Date(weekStart);
    // dow: 2=Tue, 3=Wed, 4=Thu. weekStart is Monday (dow=1)
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
