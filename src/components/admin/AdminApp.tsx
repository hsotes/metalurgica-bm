import { useState, useEffect } from 'react';
import { marked } from 'marked';
import {
  hasToken, setToken, clearToken, validateToken,
  listArticles, createArticle, updateArticle, deleteArticle,
  type ArticleMeta,
} from './github';
import { contentTemplates, categories, slugify } from './templates';
import {
  getCalendar, saveCalendar, addCalendarEntry, updateCalendarEntry, deleteCalendarEntry,
  getCompetitors, addCompetitor, deleteCompetitor,
  getCompetitorPosts, addCompetitorPost, markPostUsed, deleteCompetitorPost,
  type CalendarEntry, type Competitor, type CompetitorPost,
} from './storage';

type View = 'dashboard' | 'editor' | 'calendar' | 'competitors' | 'settings';

export default function AdminApp() {
  const [view, setView] = useState<View>('dashboard');
  const [tokenReady, setTokenReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<ArticleMeta[]>([]);
  const [editingArticle, setEditingArticle] = useState<ArticleMeta | null>(null);
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

  function goEdit(article: ArticleMeta | null) { setEditingArticle(article); setView('editor'); }
  function goDash() { setEditingArticle(null); setView('dashboard'); loadArticles(); }

  // Shared styles
  const S = {
    page: { flex: 1, backgroundColor: '#f3f4f6', overflow: 'auto' as const, minHeight: '100vh' },
    wrap: { display: 'flex' as const, minHeight: '100vh', fontFamily: "'Montserrat', system-ui, sans-serif" },
  };

  return (
    <div style={S.wrap}>
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
            ['competitors', 'Competidores', 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9'],
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
      <main style={S.page}>
        {msg && <div style={{ padding: '10px 24px', backgroundColor: msg.type === 'ok' ? '#065f46' : '#991b1b', color: '#fff', fontSize: 13, fontWeight: 500 }}>{msg.text}</div>}

        {!tokenReady && view !== 'settings' ? (
          <SettingsPanel onSave={async t => { setToken(t); if (await validateToken()) { setTokenReady(true); setView('dashboard'); loadArticles(); } else { clearToken(); flash('err', 'Token invalido'); } }} />
        ) : view === 'settings' ? (
          <SettingsPanel onSave={async t => { setToken(t); if (await validateToken()) { setTokenReady(true); setView('dashboard'); loadArticles(); flash('ok', 'Token OK'); } else { clearToken(); flash('err', 'Token invalido'); } }} />
        ) : view === 'dashboard' ? (
          <DashboardPanel articles={articles} loading={loading} onNew={() => goEdit(null)} onEdit={a => goEdit(a)}
            onDelete={async a => { if (!confirm(`Eliminar "${a.title}"?`)) return; try { await deleteArticle(a.filename, a.sha); flash('ok', 'Eliminado. Redesplegando...'); loadArticles(); } catch (e: any) { flash('err', e.message); } }} />
        ) : view === 'editor' ? (
          <EditorPanel article={editingArticle} onBack={goDash}
            onPublish={async (fn, fm, body, sha) => { try { if (sha) { await updateArticle(fn, fm, body, sha); flash('ok', 'Actualizado'); } else { await createArticle(fn, fm, body); flash('ok', 'Publicado'); } goDash(); } catch (e: any) { flash('err', e.message); } }} />
        ) : view === 'calendar' ? (
          <CalendarPanel onCreateArticle={(title, cat, type) => { setEditingArticle(null); setView('editor'); }} />
        ) : view === 'competitors' ? (
          <CompetitorsPanel />
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
        <Stat label="Articulos" value={articles.length} />
        <Stat label="Categorias" value={cats.length} />
        <Stat label="Ultimo" value={articles[0]?.date ? new Date(articles[0].date).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' }) : '-'} />
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

function Stat({ label, value }: { label: string; value: any }) {
  return <div style={card}><div style={{ fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div><div style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginTop: 2 }}>{value}</div></div>;
}

// ============================================================
// EDITOR
// ============================================================
function EditorPanel({ article, onBack, onPublish }: { article: ArticleMeta | null; onBack: () => void; onPublish: (fn: string, fm: Record<string, any>, body: string, sha?: string) => Promise<void> }) {
  const [step, setStep] = useState<'tpl' | 'edit'>(article ? 'edit' : 'tpl');
  const [title, setTitle] = useState(article?.title || '');
  const [desc, setDesc] = useState(article?.description || '');
  const [cat, setCat] = useState(article?.category || categories[0]);
  const [tags, setTags] = useState(article?.tags.join(', ') || '');
  const [img, setImg] = useState(article?.image || '');
  const [date, setDate] = useState(article?.date || new Date().toISOString().split('T')[0]);
  const [body, setBody] = useState(article?.content || '');
  const [pub, setPub] = useState(false);
  const [preview, setPreview] = useState(false);

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
// CALENDAR
// ============================================================
function CalendarPanel({ onCreateArticle }: { onCreateArticle: (title: string, cat: string, type: string) => void }) {
  const [entries, setEntries] = useState<CalendarEntry[]>([]);
  const [monthOffset, setMonthOffset] = useState(0);
  const [selected, setSelected] = useState<CalendarEntry | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCat, setNewCat] = useState(categories[0]);
  const [newDate, setNewDate] = useState('');
  const [newType, setNewType] = useState('articulo');

  useEffect(() => { setEntries(getCalendar()); }, []);

  const today = new Date();
  const viewDate = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDow = new Date(year, month, 1).getDay(); // 0=Sun
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

  const totalThisMonth = entries.filter(e => e.date.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`)).length;
  const publishedThisMonth = entries.filter(e => e.date.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`) && e.status === 'published').length;

  return (
    <div style={{ padding: '28px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div><h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Calendario Editorial</h1><p style={{ color: '#6b7280', marginTop: 2, fontSize: 13 }}>3 publicaciones por semana - Mar/Mie/Jue</p></div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={() => setShowAdd(true)} style={btnAccent}>+ Agregar</button>
          <button onClick={resetCalendar} style={btnSmall}>Regenerar sugerencias</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 20 }}>
        <Stat label="Este mes" value={totalThisMonth} />
        <Stat label="Publicados" value={publishedThisMonth} />
        <Stat label="Pendientes" value={totalThisMonth - publishedThisMonth} />
        <Stat label="Total plan" value={entries.length} />
      </div>

      {/* Month nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <button onClick={() => setMonthOffset(o => o - 1)} style={btnSmall}>←</button>
        <h2 style={{ fontSize: 18, fontWeight: 700, textTransform: 'capitalize', margin: 0, minWidth: 200, textAlign: 'center' }}>{monthName}</h2>
        <button onClick={() => setMonthOffset(o => o + 1)} style={btnSmall}>→</button>
      </div>

      {/* Calendar grid */}
      <div style={{ ...card, padding: 0, overflow: 'hidden' }}>
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
                    <button key={e.id} onClick={() => setSelected(e)} style={{ display: 'block', width: '100%', padding: '2px 4px', marginBottom: 2, borderRadius: 4, border: 'none', cursor: 'pointer', backgroundColor: sc.bg, color: sc.fg, fontSize: 10, fontWeight: 600, textAlign: 'left', fontFamily: 'inherit', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                      {e.title}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Entry detail modal */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }} onClick={() => setSelected(null)}>
          <div style={{ ...card, maxWidth: 480, width: '90%', padding: 28 }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ ...badge(statusColors[selected.status]), fontSize: 11 }}>{statusLabels[selected.status]}</span>
              <button onClick={() => setSelected(null)} style={linkBtn}>X</button>
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{selected.title}</h3>
            <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 4 }}>Categoria: <b>{selected.category}</b></p>
            <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 4 }}>Tipo: <b>{selected.contentType}</b></p>
            <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 16 }}>Fecha: <b>{selected.date}</b></p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {(['suggested', 'planned', 'draft', 'published'] as const).map(s => (
                <button key={s} onClick={() => handleStatusChange(selected, s)} style={{ ...btnSmall, backgroundColor: selected.status === s ? statusColors[s].bg : '#f3f4f6', color: selected.status === s ? statusColors[s].fg : '#6b7280', fontWeight: selected.status === s ? 700 : 400 }}>
                  {statusLabels[s]}
                </button>
              ))}
            </div>
            <hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => handleDeleteEntry(selected.id)} style={{ ...btnSmall, color: '#dc2626' }}>Eliminar del calendario</button>
            </div>
          </div>
        </div>
      )}

      {/* Add modal */}
      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }} onClick={() => setShowAdd(false)}>
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
    </div>
  );
}

// ============================================================
// COMPETITORS
// ============================================================
function CompetitorsPanel() {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [posts, setPosts] = useState<CompetitorPost[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showAddPost, setShowAddPost] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', website: '', country: '', language: '', notes: '' });
  const [postForm, setPostForm] = useState({ title: '', url: '', date: '', topic: '', notes: '' });

  useEffect(() => { setCompetitors(getCompetitors()); setPosts(getCompetitorPosts()); }, []);

  function handleAddComp() {
    if (!form.name.trim() || !form.website.trim()) return;
    addCompetitor(form);
    setCompetitors(getCompetitors());
    setShowAdd(false);
    setForm({ name: '', website: '', country: '', language: '', notes: '' });
  }

  function handleDeleteComp(id: string) {
    if (!confirm('Eliminar competidor y sus publicaciones?')) return;
    deleteCompetitor(id);
    setCompetitors(getCompetitors());
    setPosts(getCompetitorPosts());
  }

  function handleAddPost(compId: string) {
    if (!postForm.title.trim()) return;
    addCompetitorPost({ ...postForm, competitorId: compId });
    setPosts(getCompetitorPosts());
    setShowAddPost(null);
    setPostForm({ title: '', url: '', date: '', topic: '', notes: '' });
  }

  function handleMarkUsed(id: string) {
    markPostUsed(id);
    setPosts(getCompetitorPosts());
  }

  function handleDeletePost(id: string) {
    deleteCompetitorPost(id);
    setPosts(getCompetitorPosts());
  }

  const suggestedCompetitors = [
    { name: 'Metalurgica Martin (AR)', website: 'https://www.metalurgicamartin.com.ar', country: 'Argentina', language: 'Espanol' },
    { name: 'Steelmaster (US)', website: 'https://www.steelmasterusa.com', country: 'USA', language: 'Ingles' },
    { name: 'Jansen Stahl (DE)', website: 'https://www.jansen.com', country: 'Alemania', language: 'Aleman' },
    { name: 'Metalcon Chile', website: 'https://www.metalcon.cl', country: 'Chile', language: 'Espanol' },
    { name: 'Arinox (IT)', website: 'https://www.arinox.com', country: 'Italia', language: 'Italiano' },
    { name: 'Coppermetal (BR)', website: 'https://www.coppermetal.com.br', country: 'Brasil', language: 'Portugues' },
  ];

  return (
    <div style={{ padding: '28px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div><h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Monitor de Competidores</h1><p style={{ color: '#6b7280', marginTop: 2, fontSize: 13 }}>Rastrea publicaciones de la competencia para inspirar tu contenido</p></div>
        <button onClick={() => setShowAdd(true)} style={btnAccent}>+ Agregar Competidor</button>
      </div>

      {/* Suggested competitors */}
      {competitors.length === 0 && (
        <div style={{ ...card, marginBottom: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>Competidores sugeridos</h3>
          <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 12 }}>Empresas metalurgicas de diferentes paises para monitorear y adaptar contenido:</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 8 }}>
            {suggestedCompetitors.map((sc, i) => (
              <button key={i} onClick={() => { addCompetitor(sc); setCompetitors(getCompetitors()); }}
                style={{ ...card, border: '1px solid #e5e7eb', cursor: 'pointer', textAlign: 'left' as const, fontFamily: 'inherit', padding: 14 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#9acd32'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{sc.name}</div>
                <div style={{ fontSize: 11, color: '#6b7280' }}>{sc.country} - {sc.language}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Competitor list */}
      {competitors.map(comp => {
        const compPosts = posts.filter(p => p.competitorId === comp.id).sort((a, b) => (b.date || '').localeCompare(a.date || ''));
        return (
          <div key={comp.id} style={{ ...card, marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>{comp.name}</h3>
                <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                  <span style={{ fontSize: 11, color: '#6b7280' }}>{comp.country}</span>
                  <span style={{ fontSize: 11, color: '#9ca3af' }}>|</span>
                  <span style={{ fontSize: 11, color: '#6b7280' }}>{comp.language}</span>
                  <span style={{ fontSize: 11, color: '#9ca3af' }}>|</span>
                  <a href={comp.website} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: '#1a4d6d', fontWeight: 600 }}>Visitar sitio →</a>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button onClick={() => setShowAddPost(comp.id)} style={btnSmall}>+ Publicacion</button>
                <button onClick={() => handleDeleteComp(comp.id)} style={{ ...linkBtn, color: '#dc2626', fontSize: 11 }}>Eliminar</button>
              </div>
            </div>

            {compPosts.length === 0 ? (
              <p style={{ fontSize: 12, color: '#9ca3af', fontStyle: 'italic' }}>Sin publicaciones rastreadas. Visita su sitio y registra las que te interesen.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr style={{ backgroundColor: '#f9fafb' }}>
                  <th style={{ ...th, fontSize: 10 }}>Publicacion</th>
                  <th style={{ ...th, fontSize: 10 }}>Tema</th>
                  <th style={{ ...th, fontSize: 10 }}>Fecha</th>
                  <th style={{ ...th, fontSize: 10, textAlign: 'right' }}>Acciones</th>
                </tr></thead>
                <tbody>{compPosts.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #f3f4f6', opacity: p.used ? 0.5 : 1 }}>
                    <td style={{ ...td, fontSize: 12 }}>
                      {p.url ? <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ color: '#1a4d6d', fontWeight: 600 }}>{p.title}</a> : <b>{p.title}</b>}
                      {p.notes && <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>{p.notes}</div>}
                    </td>
                    <td style={{ ...td, fontSize: 11 }}><span style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: 4 }}>{p.topic || '-'}</span></td>
                    <td style={{ ...td, fontSize: 11, color: '#6b7280' }}>{p.date || '-'}</td>
                    <td style={{ ...td, textAlign: 'right' }}>
                      {!p.used && <button onClick={() => handleMarkUsed(p.id)} style={{ ...linkBtn, fontSize: 11, color: '#065f46' }}>Usar</button>}
                      <button onClick={() => handleDeletePost(p.id)} style={{ ...linkBtn, fontSize: 11, color: '#dc2626', marginLeft: 4 }}>X</button>
                    </td>
                  </tr>
                ))}</tbody>
              </table>
            )}
          </div>
        );
      })}

      {/* Add competitor modal */}
      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }} onClick={() => setShowAdd(false)}>
          <div style={{ ...card, maxWidth: 440, width: '90%', padding: 28 }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Agregar Competidor</h3>
            <label style={labelSt}>Nombre</label>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Empresa..." style={{ ...inputSt, marginBottom: 10 }} />
            <label style={labelSt}>Sitio web</label>
            <input value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} placeholder="https://..." style={{ ...inputSt, marginBottom: 10 }} />
            <label style={labelSt}>Pais</label>
            <input value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} placeholder="Argentina, USA, Alemania..." style={{ ...inputSt, marginBottom: 10 }} />
            <label style={labelSt}>Idioma</label>
            <input value={form.language} onChange={e => setForm({ ...form, language: e.target.value })} placeholder="Espanol, Ingles, Aleman..." style={{ ...inputSt, marginBottom: 10 }} />
            <label style={labelSt}>Notas</label>
            <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={2} placeholder="Observaciones..." style={{ ...inputSt, marginBottom: 16, resize: 'vertical' }} />
            <button onClick={handleAddComp} style={btnAccent}>Agregar</button>
          </div>
        </div>
      )}

      {/* Add post modal */}
      {showAddPost && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }} onClick={() => setShowAddPost(null)}>
          <div style={{ ...card, maxWidth: 440, width: '90%', padding: 28 }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Registrar Publicacion</h3>
            <label style={labelSt}>Titulo</label>
            <input value={postForm.title} onChange={e => setPostForm({ ...postForm, title: e.target.value })} placeholder="Titulo de la publicacion..." style={{ ...inputSt, marginBottom: 10 }} />
            <label style={labelSt}>URL</label>
            <input value={postForm.url} onChange={e => setPostForm({ ...postForm, url: e.target.value })} placeholder="https://..." style={{ ...inputSt, marginBottom: 10 }} />
            <label style={labelSt}>Tema/Categoria</label>
            <input value={postForm.topic} onChange={e => setPostForm({ ...postForm, topic: e.target.value })} placeholder="Estructuras, Diseno, Marketing..." style={{ ...inputSt, marginBottom: 10 }} />
            <label style={labelSt}>Fecha</label>
            <input type="date" value={postForm.date} onChange={e => setPostForm({ ...postForm, date: e.target.value })} style={{ ...inputSt, marginBottom: 10 }} />
            <label style={labelSt}>Notas (que te interesa copiar)</label>
            <textarea value={postForm.notes} onChange={e => setPostForm({ ...postForm, notes: e.target.value })} rows={3} placeholder="Enfoque, estructura, imagenes..." style={{ ...inputSt, marginBottom: 16, resize: 'vertical' }} />
            <button onClick={() => handleAddPost(showAddPost)} style={btnAccent}>Guardar</button>
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
const labelSt: React.CSSProperties = { display: 'block', marginBottom: 4, fontSize: 11, fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.03em' };
const inputSt: React.CSSProperties = { width: '100%', padding: '9px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' };
const btnAccent: React.CSSProperties = { padding: '9px 20px', borderRadius: 6, border: 'none', backgroundColor: '#9acd32', color: '#111827', cursor: 'pointer', fontWeight: 700, fontSize: 13, fontFamily: 'inherit' };
const btnPrimary: React.CSSProperties = { padding: '9px 20px', borderRadius: 6, border: 'none', backgroundColor: '#1a4d6d', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 13, fontFamily: 'inherit' };
const btnSmall: React.CSSProperties = { padding: '6px 12px', borderRadius: 6, border: '1px solid #d1d5db', backgroundColor: '#fff', color: '#374151', cursor: 'pointer', fontSize: 12, fontWeight: 500, fontFamily: 'inherit' };
const linkBtn: React.CSSProperties = { background: 'none', border: 'none', cursor: 'pointer', color: '#1a4d6d', fontWeight: 600, fontSize: 12, fontFamily: 'inherit', padding: '2px 4px' };
const th: React.CSSProperties = { padding: '8px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em' };
const td: React.CSSProperties = { padding: '12px 16px', fontSize: 13 };
function badge(c: { bg: string; fg: string }): React.CSSProperties { return { backgroundColor: c.bg, color: c.fg, fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 99, textTransform: 'uppercase' }; }
