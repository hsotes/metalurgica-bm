import { useState, useEffect } from 'react';
import { marked } from 'marked';
import {
  hasToken, setToken, clearToken, validateToken,
  listArticles, createArticle, updateArticle, deleteArticle,
  type ArticleMeta,
} from './github';
import { contentTemplates, categories, slugify } from './templates';
import {
  getCalendar, addCalendarEntry, updateCalendarEntry, deleteCalendarEntry,
  getScraperSites, addScraperSite, deleteScraperSite,
  type CalendarEntry, type ScraperSite,
} from './storage';

type View = 'dashboard' | 'editor' | 'calendar' | 'settings';

interface EditorInit {
  title?: string;
  category?: string;
  contentType?: string;
  sourceUrl?: string;
}

interface ScrapedPost {
  title: string;
  url: string;
  image: string;
  excerpt: string;
  date: string;
}

export default function AdminApp() {
  const [view, setView] = useState<View>('dashboard');
  const [tokenReady, setTokenReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<ArticleMeta[]>([]);
  const [editingArticle, setEditingArticle] = useState<ArticleMeta | null>(null);
  const [editorInit, setEditorInit] = useState<EditorInit | null>(null);
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => { checkToken(); }, []);

  async function checkToken() {
    if (hasToken()) {
      if (await validateToken()) { setTokenReady(true); loadArticles(); }
      else { clearToken(); setLoading(false); setView('settings'); }
    } else { setLoading(false); setView('settings'); }
  }

  async function loadArticles() {
    setLoading(true);
    try { setArticles(await listArticles()); } catch (e: any) { flash('err', e.message); }
    setLoading(false);
  }

  function flash(type: 'ok' | 'err', text: string) {
    setMsg({ type, text });
    setTimeout(() => setMsg(null), 5000);
  }

  function goEdit(article: ArticleMeta | null) {
    setEditingArticle(article);
    setEditorInit(null);
    setView('editor');
  }

  function goEditFromCalendar(entry: CalendarEntry) {
    setEditingArticle(null);
    setEditorInit({
      title: entry.title,
      category: entry.category,
      contentType: entry.contentType,
      sourceUrl: entry.sourceUrl,
    });
    setView('editor');
  }

  function goDash() { setEditingArticle(null); setEditorInit(null); setView('dashboard'); loadArticles(); }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Montserrat', system-ui, sans-serif" }}>
      {/* ---- SIDEBAR ---- */}
      <aside style={{ width: 240, backgroundColor: '#111827', color: '#fff', display: 'flex', flexDirection: 'column' as const, flexShrink: 0 }}>
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #1f2937' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: '#9acd32', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, color: '#111827' }}>MBM</div>
            <div><div style={{ fontWeight: 700, fontSize: 13 }}>Editorial MBM</div><div style={{ fontSize: 10, color: '#9ca3af' }}>Dashboard de contenido</div></div>
          </div>
        </div>
        <nav style={{ flex: 1, padding: '12px 8px' }}>
          {([
            ['dashboard', 'Dashboard', 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z'],
            ['editor', 'Nuevo Articulo', 'M12 5v14M5 12h14'],
            ['calendar', 'Calendario', 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'],
            ['settings', 'Configuracion', 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z'],
          ] as const).map(([v, label, path]) => (
            <button key={v} onClick={() => { if (v === 'editor') goEdit(null); else if (v === 'dashboard') goDash(); else setView(v as View); }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '9px 10px', marginBottom: 2, borderRadius: 6, border: 'none', cursor: 'pointer', backgroundColor: view === v ? '#1f2937' : 'transparent', color: view === v ? '#fff' : '#9ca3af', fontSize: 13, fontWeight: view === v ? 600 : 400, fontFamily: 'inherit', textAlign: 'left' as const }}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={path} /></svg>
              {label}
            </button>
          ))}
        </nav>
        <div style={{ padding: '12px 16px', borderTop: '1px solid #1f2937' }}>
          <a href="/" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: 12 }}>← Volver al sitio</a>
        </div>
      </aside>

      {/* ---- MAIN ---- */}
      <main style={{ flex: 1, backgroundColor: '#f3f4f6', overflow: 'auto', minHeight: '100vh' }}>
        {msg && <div style={{ padding: '10px 24px', backgroundColor: msg.type === 'ok' ? '#065f46' : '#991b1b', color: '#fff', fontSize: 13, fontWeight: 500 }}>{msg.text}</div>}

        {!tokenReady && view !== 'settings' ? (
          <SettingsPanel onSave={async t => { setToken(t); if (await validateToken()) { setTokenReady(true); setView('dashboard'); loadArticles(); } else { clearToken(); flash('err', 'Token invalido'); } }} />
        ) : view === 'settings' ? (
          <SettingsPanel onSave={async t => { setToken(t); if (await validateToken()) { setTokenReady(true); setView('dashboard'); loadArticles(); flash('ok', 'Token OK'); } else { clearToken(); flash('err', 'Token invalido'); } }} />
        ) : view === 'dashboard' ? (
          <DashboardPanel articles={articles} loading={loading} onNew={() => goEdit(null)} onEdit={a => goEdit(a)}
            onDelete={async a => { if (!confirm(`Eliminar "${a.title}"?`)) return; try { await deleteArticle(a.filename, a.sha); flash('ok', 'Eliminado. Redesplegando...'); loadArticles(); } catch (e: any) { flash('err', e.message); } }} />
        ) : view === 'editor' ? (
          <EditorPanel article={editingArticle} initialData={editorInit} onBack={goDash}
            onPublish={async (fn, fm, body, sha) => { try { if (sha) { await updateArticle(fn, fm, body, sha); flash('ok', 'Actualizado'); } else { await createArticle(fn, fm, body); flash('ok', 'Publicado'); } goDash(); } catch (e: any) { flash('err', e.message); } }} />
        ) : view === 'calendar' ? (
          <CalendarPanel onCreateArticle={goEditFromCalendar} />
        ) : null}
      </main>
    </div>
  );
}

// ============================================================
// SETTINGS
// ============================================================
function SettingsPanel({ onSave }: { onSave: (t: string) => void }) {
  const [t, setT] = useState('');
  const [saving, setSaving] = useState(false);
  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: '60px 24px' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Configuracion</h1>
      <div style={card}>
        <label style={labelSt}>GitHub Personal Access Token</label>
        <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 10 }}>GitHub → Settings → Developer settings → Fine-grained tokens.<br />Permiso: <b>Contents: Read and Write</b> para <code>hsotes/metalurgica-bm</code>.</p>
        <input type="password" value={t} onChange={e => setT(e.target.value)} placeholder="github_pat_..." style={inputSt} />
        <button onClick={async () => { setSaving(true); await onSave(t.trim()); setSaving(false); }} disabled={saving || !t.trim()} style={{ ...btnPrimary, marginTop: 12 }}>{saving ? 'Verificando...' : 'Guardar'}</button>
      </div>
    </div>
  );
}

// ============================================================
// DASHBOARD
// ============================================================
function DashboardPanel({ articles, loading, onNew, onEdit, onDelete }: { articles: ArticleMeta[]; loading: boolean; onNew: () => void; onEdit: (a: ArticleMeta) => void; onDelete: (a: ArticleMeta) => void }) {
  const cats = [...new Set(articles.map(a => a.category))];
  return (
    <div style={{ padding: '28px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div><h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Dashboard</h1><p style={{ color: '#6b7280', marginTop: 2, fontSize: 13 }}>Gestion de contenido</p></div>
        <button onClick={onNew} style={btnAccent}>+ Nuevo Articulo</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
        <StatBox label="Articulos" value={articles.length} />
        <StatBox label="Categorias" value={cats.length} />
        <StatBox label="Ultimo" value={articles[0]?.date ? new Date(articles[0].date).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' }) : '-'} />
      </div>
      <div style={card}>
        <h2 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 12px' }}>Articulos publicados</h2>
        {loading ? <p style={{ color: '#6b7280' }}>Cargando...</p> : articles.length === 0 ? <p style={{ color: '#6b7280' }}>Sin articulos.</p> : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr style={{ backgroundColor: '#f9fafb' }}>
              <th style={th}>Titulo</th><th style={th}>Categoria</th><th style={th}>Fecha</th><th style={{ ...th, textAlign: 'right' }}>Acciones</th>
            </tr></thead>
            <tbody>{articles.map(a => (
              <tr key={a.filename} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={td}><b style={{ color: '#111827' }}>{a.title}</b><br /><span style={{ fontSize: 11, color: '#9ca3af' }}>{a.filename}</span></td>
                <td style={td}><span style={{ backgroundColor: '#f0fdf4', color: '#166534', fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 99 }}>{a.category}</span></td>
                <td style={{ ...td, color: '#6b7280', fontSize: 12 }}>{a.date ? new Date(a.date).toLocaleDateString('es-AR') : '-'}</td>
                <td style={{ ...td, textAlign: 'right' }}>
                  <button onClick={() => onEdit(a)} style={linkBtn}>Editar</button>
                  <button onClick={() => onDelete(a)} style={{ ...linkBtn, color: '#dc2626', marginLeft: 6 }}>Eliminar</button>
                </td>
              </tr>
            ))}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: any }) {
  return <div style={card}><div style={{ fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div><div style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginTop: 2 }}>{value}</div></div>;
}

// ============================================================
// EDITOR
// ============================================================
function EditorPanel({ article, initialData, onBack, onPublish }: {
  article: ArticleMeta | null;
  initialData: EditorInit | null;
  onBack: () => void;
  onPublish: (fn: string, fm: Record<string, any>, body: string, sha?: string) => Promise<void>;
}) {
  const tpl = initialData?.contentType ? contentTemplates.find(t => t.id === initialData.contentType) : null;
  const [step, setStep] = useState<'tpl' | 'edit'>(article || initialData ? 'edit' : 'tpl');
  const [title, setTitle] = useState(article?.title || initialData?.title || '');
  const [desc, setDesc] = useState(article?.description || '');
  const [cat, setCat] = useState(article?.category || initialData?.category || categories[0]);
  const [tags, setTags] = useState(article?.tags.join(', ') || '');
  const [img, setImg] = useState(article?.image || '');
  const [date, setDate] = useState(article?.date || new Date().toISOString().split('T')[0]);
  const [body, setBody] = useState(article?.content || tpl?.markdown || '');
  const [pub, setPub] = useState(false);
  const [preview, setPreview] = useState(false);
  const [importing, setImporting] = useState(false);

  async function handleImportSource() {
    if (!initialData?.sourceUrl) return;
    setImporting(true);
    try {
      const res = await fetch(`/api/scrape?url=${encodeURIComponent(initialData.sourceUrl)}&mode=full`);
      if (!res.ok) throw new Error('Error al importar');
      const data = await res.json();
      if (data.title && !title) setTitle(data.title);
      if (data.content) setBody(data.content);
      if (data.images?.length > 0 && !img) setImg(data.images[0]);
    } catch (e: any) {
      alert('Error importando contenido: ' + e.message);
    }
    setImporting(false);
  }

  if (step === 'tpl') return (
    <div style={{ padding: '28px 32px' }}>
      <button onClick={onBack} style={linkBtn}>← Dashboard</button>
      <h1 style={{ fontSize: 24, fontWeight: 700, margin: '12px 0 4px' }}>Nuevo Articulo</h1>
      <p style={{ color: '#6b7280', marginBottom: 24, fontSize: 13 }}>Elige el tipo de contenido:</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
        {contentTemplates.map(t => (
          <button key={t.id} onClick={() => { setBody(t.markdown); setStep('edit'); }}
            style={{ ...card, border: '2px solid #e5e7eb', cursor: 'pointer', textAlign: 'left' as const, fontFamily: 'inherit' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#9acd32'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{t.name}</div>
            <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.5, marginBottom: 8 }}>{t.description}</div>
            <span style={{ fontSize: 10, fontWeight: 600, color: '#1a4d6d', backgroundColor: '#eff6ff', padding: '3px 8px', borderRadius: 99 }}>LinkedIn: {t.linkedinFormat}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const html = marked.parse(body) as string;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ padding: '10px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onBack} style={linkBtn}>← Dashboard</button>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{article ? 'Editando' : 'Nuevo'}: {title || 'Sin titulo'}</span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {initialData?.sourceUrl && (
            <>
              <button onClick={handleImportSource} disabled={importing} style={{ ...btnSmall, backgroundColor: '#eff6ff', color: '#1e40af', border: '1px solid #bfdbfe' }}>
                {importing ? 'Importando...' : 'Importar contenido original'}
              </button>
              <a href={initialData.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ ...btnSmall, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>Ver original →</a>
            </>
          )}
          <button onClick={() => setPreview(!preview)} style={{ ...btnSmall, backgroundColor: preview ? '#1a4d6d' : '#fff', color: preview ? '#fff' : '#374151', border: '1px solid #d1d5db' }}>{preview ? 'Ocultar preview' : 'Preview'}</button>
          <button onClick={async () => { if (!title.trim() || !desc.trim() || !img.trim()) { alert('Completa titulo, descripcion e imagen'); return; } setPub(true); await onPublish(article?.filename || `${slugify(title)}.md`, { title: title.trim(), description: desc.trim(), date, author: 'Metalurgica Boto Mariani', image: img.trim(), category: cat, tags: tags.split(',').map(t => t.trim()).filter(Boolean) }, body, article?.sha); setPub(false); }} disabled={pub} style={btnAccent}>{pub ? 'Publicando...' : article ? 'Actualizar' : 'Publicar'}</button>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ flex: 1, overflow: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={card}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ gridColumn: '1/-1' }}><label style={labelSt}>Titulo</label><input value={title} onChange={e => setTitle(e.target.value)} placeholder="Titulo..." style={inputSt} /></div>
              <div style={{ gridColumn: '1/-1' }}><label style={labelSt}>Descripcion</label><textarea value={desc} onChange={e => setDesc(e.target.value)} rows={2} placeholder="Descripcion SEO..." style={{ ...inputSt, resize: 'vertical' }} /></div>
              <div><label style={labelSt}>Categoria</label><select value={cat} onChange={e => setCat(e.target.value)} style={inputSt}>{categories.map(c => <option key={c}>{c}</option>)}</select></div>
              <div><label style={labelSt}>Fecha</label><input type="date" value={date} onChange={e => setDate(e.target.value)} style={inputSt} /></div>
              <div><label style={labelSt}>Tags (coma)</label><input value={tags} onChange={e => setTags(e.target.value)} placeholder="tag1, tag2" style={inputSt} /></div>
              <div><label style={labelSt}>Imagen portada</label><input value={img} onChange={e => setImg(e.target.value)} placeholder="/images/..." style={inputSt} /></div>
            </div>
          </div>
          <div style={{ ...card, flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#374151' }}>Contenido (Markdown)</span>
              <span style={{ fontSize: 11, color: '#9ca3af' }}>{body.length} chars</span>
            </div>
            <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Contenido..." style={{ flex: 1, minHeight: 350, border: '1px solid #e5e7eb', borderRadius: 8, padding: 16, fontFamily: "'Courier New', monospace", fontSize: 13, lineHeight: 1.7, resize: 'none', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
          </div>
        </div>
        {preview && (
          <div style={{ flex: 1, overflow: 'auto', padding: 24, borderLeft: '1px solid #e5e7eb', backgroundColor: '#fff' }}>
            <div style={{ maxWidth: 640, margin: '0 auto' }}>
              {img && <div style={{ aspectRatio: '16/9', overflow: 'hidden', borderRadius: 8, marginBottom: 20, backgroundColor: '#f3f4f6' }}><img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} /></div>}
              <span style={{ backgroundColor: '#9acd32', color: '#111827', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 99, textTransform: 'uppercase' }}>{cat}</span>
              <h1 style={{ fontSize: 28, fontWeight: 700, margin: '12px 0 8px', lineHeight: 1.2 }}>{title || 'Titulo'}</h1>
              <p style={{ color: '#6b7280', marginBottom: 20 }}>{desc}</p>
              <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', marginBottom: 20 }} />
              <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// CALENDAR + SCRAPER
// ============================================================
function CalendarPanel({ onCreateArticle }: { onCreateArticle: (entry: CalendarEntry) => void }) {
  // Calendar state
  const [entries, setEntries] = useState<CalendarEntry[]>([]);
  const [monthOffset, setMonthOffset] = useState(0);
  const [selected, setSelected] = useState<CalendarEntry | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCat, setNewCat] = useState(categories[0]);
  const [newDate, setNewDate] = useState('');
  const [newType, setNewType] = useState('articulo');
  const [moveDate, setMoveDate] = useState('');

  // Scraper state
  const [sites, setSites] = useState<ScraperSite[]>([]);
  const [showAddSite, setShowAddSite] = useState(false);
  const [siteForm, setSiteForm] = useState({ name: '', blogUrl: '' });
  const [scraping, setScraping] = useState(false);
  const [scrapingId, setScrapingId] = useState('');
  const [scrapedPosts, setScrapedPosts] = useState<ScrapedPost[]>([]);
  const [scrapedFrom, setScrapedFrom] = useState('');
  const [scrapeError, setScrapeError] = useState('');
  const [usePost, setUsePost] = useState<ScrapedPost | null>(null);
  const [useDate, setUseDate] = useState('');
  const [useCat, setUseCat] = useState(categories[0]);

  useEffect(() => {
    setEntries(getCalendar());
    setSites(getScraperSites());
  }, []);

  const today = new Date();
  const viewDate = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDow = new Date(year, month, 1).getDay();
  const monthName = viewDate.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' });

  const statusColors: Record<string, { bg: string; fg: string }> = {
    suggested: { bg: '#eff6ff', fg: '#1e40af' },
    planned: { bg: '#fef3c7', fg: '#92400e' },
    draft: { bg: '#fce7f3', fg: '#9d174d' },
    published: { bg: '#d1fae5', fg: '#065f46' },
  };
  const statusLabels: Record<string, string> = { suggested: 'Sugerido', planned: 'Planificado', draft: 'Borrador', published: 'Publicado' };

  function entriesForDay(day: number) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return entries.filter(e => e.date === dateStr);
  }

  function handleStatusChange(entry: CalendarEntry, newStatus: CalendarEntry['status']) {
    updateCalendarEntry(entry.id, { status: newStatus });
    setEntries(getCalendar());
    setSelected({ ...entry, status: newStatus });
  }

  function handleMoveEntry() {
    if (!selected || !moveDate) return;
    updateCalendarEntry(selected.id, { date: moveDate });
    setEntries(getCalendar());
    setSelected({ ...selected, date: moveDate });
    setMoveDate('');
  }

  function handleAddEntry() {
    if (!newTitle.trim() || !newDate) return;
    addCalendarEntry({ date: newDate, title: newTitle.trim(), category: newCat, contentType: newType, status: 'planned', notes: '' });
    setEntries(getCalendar());
    setShowAdd(false);
    setNewTitle('');
  }

  function handleDeleteEntry(id: string) {
    deleteCalendarEntry(id);
    setEntries(getCalendar());
    setSelected(null);
  }

  function resetCalendar() {
    if (!confirm('Regenerar calendario sugerido? Se perderan los cambios manuales.')) return;
    localStorage.removeItem('mbm_calendar');
    setEntries(getCalendar());
  }

  // Scraper functions
  function handleAddSite() {
    if (!siteForm.name.trim() || !siteForm.blogUrl.trim()) return;
    let url = siteForm.blogUrl.trim();
    if (!url.startsWith('http')) url = 'https://' + url;
    addScraperSite({ name: siteForm.name.trim(), blogUrl: url });
    setSites(getScraperSites());
    setShowAddSite(false);
    setSiteForm({ name: '', blogUrl: '' });
  }

  function handleDeleteSite(id: string) {
    deleteScraperSite(id);
    setSites(getScraperSites());
  }

  async function handleScrape(site: ScraperSite) {
    setScraping(true);
    setScrapingId(site.id);
    setScrapedPosts([]);
    setScrapedFrom(site.name);
    setScrapeError('');
    try {
      const res = await fetch(`/api/scrape?url=${encodeURIComponent(site.blogUrl)}`);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Error ${res.status}`);
      }
      const data = await res.json();
      if (!data.posts || data.posts.length === 0) {
        setScrapeError('No se encontraron publicaciones en esta URL.');
      } else {
        setScrapedPosts(data.posts);
      }
    } catch (e: any) {
      setScrapeError(e.message || 'Error al scrapear');
    }
    setScraping(false);
    setScrapingId('');
  }

  function handleUsePost() {
    if (!usePost || !useDate) return;
    addCalendarEntry({
      date: useDate,
      title: usePost.title,
      category: useCat,
      contentType: 'articulo',
      status: 'planned',
      notes: usePost.excerpt || '',
      sourceUrl: usePost.url,
    });
    setEntries(getCalendar());
    setUsePost(null);
    setUseDate('');
  }

  const totalThisMonth = entries.filter(e => e.date.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`)).length;
  const publishedThisMonth = entries.filter(e => e.date.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`) && e.status === 'published').length;

  return (
    <div style={{ padding: '28px 32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div><h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Calendario Editorial</h1><p style={{ color: '#6b7280', marginTop: 2, fontSize: 13 }}>3 publicaciones por semana - Mar/Mie/Jue</p></div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={() => setShowAdd(true)} style={btnAccent}>+ Agregar</button>
          <button onClick={resetCalendar} style={btnSmall}>Regenerar sugerencias</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 20 }}>
        <StatBox label="Este mes" value={totalThisMonth} />
        <StatBox label="Publicados" value={publishedThisMonth} />
        <StatBox label="Pendientes" value={totalThisMonth - publishedThisMonth} />
        <StatBox label="Total plan" value={entries.length} />
      </div>

      {/* Month nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <button onClick={() => setMonthOffset(o => o - 1)} style={btnSmall}>←</button>
        <h2 style={{ fontSize: 18, fontWeight: 700, textTransform: 'capitalize', margin: 0, minWidth: 200, textAlign: 'center' }}>{monthName}</h2>
        <button onClick={() => setMonthOffset(o => o + 1)} style={btnSmall}>→</button>
      </div>

      {/* Calendar grid */}
      <div style={{ ...card, padding: 0, overflow: 'hidden', marginBottom: 32 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', backgroundColor: '#f9fafb' }}>
          {['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'].map(d => (
            <div key={d} style={{ padding: '8px 4px', textAlign: 'center', fontSize: 11, fontWeight: 600, color: '#6b7280', borderBottom: '1px solid #e5e7eb' }}>{d}</div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
          {Array.from({ length: firstDow }).map((_, i) => <div key={`e${i}`} style={{ minHeight: 90, borderBottom: '1px solid #f3f4f6', borderRight: '1px solid #f3f4f6' }} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dayEntries = entriesForDay(day);
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            return (
              <div key={day} style={{ minHeight: 90, padding: 4, borderBottom: '1px solid #f3f4f6', borderRight: '1px solid #f3f4f6', backgroundColor: isToday ? '#fffff0' : '#fff' }}>
                <div style={{ fontSize: 12, fontWeight: isToday ? 700 : 400, color: isToday ? '#1a4d6d' : '#6b7280', marginBottom: 2 }}>{day}</div>
                {dayEntries.map(e => {
                  const sc = statusColors[e.status] || statusColors.suggested;
                  return (
                    <button key={e.id} onClick={() => { setSelected(e); setMoveDate(e.date); }} style={{ display: 'block', width: '100%', padding: '2px 4px', marginBottom: 2, borderRadius: 4, border: e.sourceUrl ? '1px solid #fbbf24' : 'none', cursor: 'pointer', backgroundColor: sc.bg, color: sc.fg, fontSize: 10, fontWeight: 600, textAlign: 'left', fontFamily: 'inherit', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                      {e.sourceUrl && '★ '}{e.title}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* ---- SCRAPER SECTION ---- */}
      <div style={{ ...card, marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Scraper de Competidores</h2>
            <p style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>Agrega URLs de blogs de la competencia y escrapeamos sus publicaciones para que las adaptes</p>
          </div>
          <button onClick={() => setShowAddSite(true)} style={btnAccent}>+ Agregar URL</button>
        </div>

        {sites.length === 0 ? (
          <div style={{ padding: 20, textAlign: 'center', color: '#9ca3af', fontSize: 13 }}>
            No hay sitios de competidores configurados. Agrega URLs de blogs metalurgicos para scrapear sus publicaciones.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {sites.map(site => (
              <div key={site.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', backgroundColor: '#f9fafb', borderRadius: 8, border: '1px solid #e5e7eb' }}>
                <div style={{ width: 8, height: 8, borderRadius: 99, backgroundColor: '#9acd32', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: '#111827' }}>{site.name}</div>
                  <div style={{ fontSize: 11, color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{site.blogUrl}</div>
                </div>
                <button onClick={() => handleScrape(site)} disabled={scraping}
                  style={{ ...btnSmall, backgroundColor: '#1a4d6d', color: '#fff', border: 'none', opacity: scraping && scrapingId === site.id ? 0.6 : 1 }}>
                  {scraping && scrapingId === site.id ? 'Scrapeando...' : 'Scrapear'}
                </button>
                <button onClick={() => handleDeleteSite(site.id)} style={{ ...linkBtn, color: '#dc2626', fontSize: 11 }}>✕</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Scraped results */}
      {(scrapedPosts.length > 0 || scrapeError) && (
        <div style={{ ...card, marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>
              Resultados de {scrapedFrom}
              <span style={{ fontSize: 12, fontWeight: 400, color: '#6b7280', marginLeft: 8 }}>{scrapedPosts.length} publicaciones encontradas</span>
            </h3>
            <button onClick={() => { setScrapedPosts([]); setScrapeError(''); }} style={linkBtn}>Cerrar</button>
          </div>

          {scrapeError ? (
            <div style={{ padding: 16, backgroundColor: '#fef2f2', borderRadius: 8, color: '#991b1b', fontSize: 13 }}>{scrapeError}</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
              {scrapedPosts.map((post, i) => (
                <div key={i} style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden', backgroundColor: '#fff' }}>
                  {post.image && (
                    <div style={{ aspectRatio: '16/9', overflow: 'hidden', backgroundColor: '#f3f4f6' }}>
                      <img src={post.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none'; }} />
                    </div>
                  )}
                  <div style={{ padding: 12 }}>
                    <h4 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', lineHeight: 1.3, color: '#111827' }}>{post.title}</h4>
                    {post.excerpt && <p style={{ fontSize: 11, color: '#6b7280', margin: '0 0 8px', lineHeight: 1.4 }}>{post.excerpt.slice(0, 120)}...</p>}
                    {post.date && <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 8 }}>{post.date}</div>}
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => { setUsePost(post); setUseDate(new Date().toISOString().split('T')[0]); }} style={{ ...btnSmall, backgroundColor: '#9acd32', color: '#111827', border: 'none', fontWeight: 700, fontSize: 11 }}>
                        Usar publicacion
                      </button>
                      <a href={post.url} target="_blank" rel="noopener noreferrer" style={{ ...btnSmall, textDecoration: 'none', fontSize: 11 }}>Ver original</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ---- MODALS ---- */}

      {/* Entry detail modal */}
      {selected && (
        <div style={overlay} onClick={() => setSelected(null)}>
          <div style={{ ...card, maxWidth: 500, width: '90%', padding: 28 }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ ...badgeStyle(statusColors[selected.status]), fontSize: 11 }}>{statusLabels[selected.status]}</span>
              <button onClick={() => setSelected(null)} style={linkBtn}>✕</button>
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{selected.title}</h3>
            <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 4 }}>Categoria: <b>{selected.category}</b></p>
            <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 4 }}>Tipo: <b>{selected.contentType}</b></p>
            <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 4 }}>Fecha: <b>{selected.date}</b></p>
            {selected.sourceUrl && (
              <p style={{ fontSize: 12, marginBottom: 4 }}>
                <span style={{ color: '#92400e', fontWeight: 600 }}>★ De competidor: </span>
                <a href={selected.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#1a4d6d', fontSize: 12 }}>ver original →</a>
              </p>
            )}

            {/* Move date */}
            <div style={{ marginTop: 12, padding: 12, backgroundColor: '#f9fafb', borderRadius: 8 }}>
              <label style={{ ...labelSt, marginBottom: 6 }}>Mover a otra fecha</label>
              <div style={{ display: 'flex', gap: 6 }}>
                <input type="date" value={moveDate} onChange={e => setMoveDate(e.target.value)} style={{ ...inputSt, flex: 1 }} />
                <button onClick={handleMoveEntry} disabled={!moveDate || moveDate === selected.date} style={{ ...btnSmall, backgroundColor: moveDate && moveDate !== selected.date ? '#1a4d6d' : '#e5e7eb', color: moveDate && moveDate !== selected.date ? '#fff' : '#9ca3af', border: 'none' }}>
                  Mover
                </button>
              </div>
            </div>

            {/* Status buttons */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
              {(['suggested', 'planned', 'draft', 'published'] as const).map(s => (
                <button key={s} onClick={() => handleStatusChange(selected, s)} style={{ ...btnSmall, backgroundColor: selected.status === s ? statusColors[s].bg : '#f3f4f6', color: selected.status === s ? statusColors[s].fg : '#6b7280', fontWeight: selected.status === s ? 700 : 400 }}>
                  {statusLabels[s]}
                </button>
              ))}
            </div>

            <hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => { onCreateArticle(selected); setSelected(null); }} style={{ ...btnAccent, fontSize: 12 }}>
                Crear articulo
              </button>
              <button onClick={() => handleDeleteEntry(selected.id)} style={{ ...btnSmall, color: '#dc2626' }}>Eliminar</button>
            </div>
          </div>
        </div>
      )}

      {/* Add entry modal */}
      {showAdd && (
        <div style={overlay} onClick={() => setShowAdd(false)}>
          <div style={{ ...card, maxWidth: 440, width: '90%', padding: 28 }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Agregar al calendario</h3>
            <label style={labelSt}>Titulo</label>
            <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Titulo..." style={{ ...inputSt, marginBottom: 10 }} />
            <label style={labelSt}>Fecha</label>
            <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} style={{ ...inputSt, marginBottom: 10 }} />
            <label style={labelSt}>Categoria</label>
            <select value={newCat} onChange={e => setNewCat(e.target.value)} style={{ ...inputSt, marginBottom: 10 }}>{categories.map(c => <option key={c}>{c}</option>)}</select>
            <label style={labelSt}>Tipo contenido</label>
            <select value={newType} onChange={e => setNewType(e.target.value)} style={{ ...inputSt, marginBottom: 16 }}>
              {contentTemplates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
            <button onClick={handleAddEntry} style={btnAccent}>Agregar</button>
          </div>
        </div>
      )}

      {/* Add scraper site modal */}
      {showAddSite && (
        <div style={overlay} onClick={() => setShowAddSite(false)}>
          <div style={{ ...card, maxWidth: 440, width: '90%', padding: 28 }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Agregar sitio de competidor</h3>
            <label style={labelSt}>Nombre</label>
            <input value={siteForm.name} onChange={e => setSiteForm({ ...siteForm, name: e.target.value })} placeholder="Ej: Metalurgica Martin" style={{ ...inputSt, marginBottom: 10 }} />
            <label style={labelSt}>URL del blog / noticias</label>
            <input value={siteForm.blogUrl} onChange={e => setSiteForm({ ...siteForm, blogUrl: e.target.value })} placeholder="https://www.ejemplo.com/blog" style={{ ...inputSt, marginBottom: 6 }} />
            <p style={{ fontSize: 11, color: '#9ca3af', marginBottom: 16 }}>Ingresa la URL de la pagina de blog o noticias del competidor. El scraper buscara automaticamente las publicaciones.</p>
            <button onClick={handleAddSite} disabled={!siteForm.name.trim() || !siteForm.blogUrl.trim()} style={btnAccent}>Agregar</button>
          </div>
        </div>
      )}

      {/* Use scraped post modal */}
      {usePost && (
        <div style={overlay} onClick={() => setUsePost(null)}>
          <div style={{ ...card, maxWidth: 480, width: '90%', padding: 28 }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Programar en el calendario</h3>
            <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 16 }}>Esta publicacion se agregara al calendario. Luego podras crear el articulo desde ahi.</p>
            <div style={{ padding: 12, backgroundColor: '#f9fafb', borderRadius: 8, marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{usePost.title}</div>
              {usePost.excerpt && <div style={{ fontSize: 12, color: '#6b7280' }}>{usePost.excerpt.slice(0, 150)}...</div>}
              <a href={usePost.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: '#1a4d6d', marginTop: 4, display: 'inline-block' }}>Ver original →</a>
            </div>
            <label style={labelSt}>Fecha de publicacion</label>
            <input type="date" value={useDate} onChange={e => setUseDate(e.target.value)} style={{ ...inputSt, marginBottom: 10 }} />
            <label style={labelSt}>Categoria</label>
            <select value={useCat} onChange={e => setUseCat(e.target.value)} style={{ ...inputSt, marginBottom: 16 }}>{categories.map(c => <option key={c}>{c}</option>)}</select>
            <button onClick={handleUsePost} disabled={!useDate} style={btnAccent}>Agregar al calendario</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// SHARED STYLES
// ============================================================
const card: React.CSSProperties = { backgroundColor: '#fff', borderRadius: 10, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' };
const overlay: React.CSSProperties = { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 };
const labelSt: React.CSSProperties = { display: 'block', marginBottom: 4, fontSize: 11, fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.03em' };
const inputSt: React.CSSProperties = { width: '100%', padding: '9px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' };
const btnAccent: React.CSSProperties = { padding: '9px 20px', borderRadius: 6, border: 'none', backgroundColor: '#9acd32', color: '#111827', cursor: 'pointer', fontWeight: 700, fontSize: 13, fontFamily: 'inherit' };
const btnPrimary: React.CSSProperties = { padding: '9px 20px', borderRadius: 6, border: 'none', backgroundColor: '#1a4d6d', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 13, fontFamily: 'inherit' };
const btnSmall: React.CSSProperties = { padding: '6px 12px', borderRadius: 6, border: '1px solid #d1d5db', backgroundColor: '#fff', color: '#374151', cursor: 'pointer', fontSize: 12, fontWeight: 500, fontFamily: 'inherit' };
const linkBtn: React.CSSProperties = { background: 'none', border: 'none', cursor: 'pointer', color: '#1a4d6d', fontWeight: 600, fontSize: 12, fontFamily: 'inherit', padding: '2px 4px' };
const th: React.CSSProperties = { padding: '8px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em' };
const td: React.CSSProperties = { padding: '12px 16px', fontSize: 13 };
function badgeStyle(c: { bg: string; fg: string }): React.CSSProperties { return { backgroundColor: c.bg, color: c.fg, fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 99, textTransform: 'uppercase' }; }
