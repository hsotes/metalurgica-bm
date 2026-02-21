import { useState, useEffect } from 'react';
import { marked } from 'marked';
import {
  hasToken, setToken, clearToken, validateToken,
  listArticles, createArticle, updateArticle, deleteArticle,
  createTrabajo, uploadImage,
  type ArticleMeta,
} from './github';
import { contentTemplates, categories, slugify } from './templates';
import {
  getCalendar, addCalendarEntry, updateCalendarEntry, deleteCalendarEntry,
  getScraperSites, addScraperSite, deleteScraperSite,
  getBanco, addToBanco, markBancoPostUsed, removeBancoPost, clearBanco, autoplanFromBanco,
  getAiKey, setAiKey, hasAiKey,
  getGptKey, setGptKey, hasGptKey,
  getAiProvider, setAiProvider, getActiveAiKey,
  saveDraft, getDraft, clearDraft, hasDraft,
  type CalendarEntry, type ScraperSite, type BancoPost, type EditorDraft,
} from './storage';

type View = 'dashboard' | 'editor' | 'calendar' | 'settings' | 'trabajo';

interface EditorInit {
  title?: string;
  category?: string;
  contentType?: string;
  sourceUrl?: string;
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
    setTimeout(() => setMsg(null), 6000);
  }

  function goEdit(article: ArticleMeta | null) { setEditingArticle(article); setEditorInit(null); setView('editor'); }
  function goEditFromCalendar(entry: CalendarEntry) {
    setEditingArticle(null);
    setEditorInit({ title: entry.title, category: entry.category, contentType: entry.contentType, sourceUrl: entry.sourceUrl });
    setView('editor');
  }
  function goDash() { setEditingArticle(null); setEditorInit(null); setView('dashboard'); loadArticles(); }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Montserrat', system-ui, sans-serif" }}>
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
            ['trabajo', 'Trabajo Entregado', 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'],
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

      <main style={{ flex: 1, backgroundColor: '#f3f4f6', overflow: 'auto', minHeight: '100vh' }}>
        {msg && <div style={{ padding: '10px 24px', backgroundColor: msg.type === 'ok' ? '#065f46' : '#991b1b', color: '#fff', fontSize: 13, fontWeight: 500 }}>{msg.text}</div>}
        {!tokenReady && view !== 'settings' ? (
          <SettingsPanel onSaveGit={async t => { setToken(t); if (await validateToken()) { setTokenReady(true); setView('dashboard'); loadArticles(); } else { clearToken(); flash('err', 'Token invalido'); } }} />
        ) : view === 'settings' ? (
          <SettingsPanel onSaveGit={async t => { setToken(t); if (await validateToken()) { setTokenReady(true); setView('dashboard'); loadArticles(); flash('ok', 'Token GitHub OK'); } else { clearToken(); flash('err', 'Token invalido'); } }} />
        ) : view === 'dashboard' ? (
          <DashboardPanel articles={articles} loading={loading} onNew={() => goEdit(null)} onEdit={a => goEdit(a)}
            onDelete={async a => { if (!confirm(`Eliminar "${a.title}"?`)) return; try { await deleteArticle(a.filename, a.sha); flash('ok', 'Eliminado'); loadArticles(); } catch (e: any) { flash('err', e.message); } }} />
        ) : view === 'editor' ? (
          <EditorPanel article={editingArticle} initialData={editorInit} onBack={goDash}
            onPublish={async (fn, fm, body, sha) => { try { if (sha) { await updateArticle(fn, fm, body, sha); flash('ok', 'Actualizado'); goDash(); } else { await createArticle(fn, fm, body); clearDraft(); } return true; } catch (e: any) { flash('err', e.message); return false; } }} />
        ) : view === 'trabajo' ? (
          <TrabajoPanel />
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
function SettingsPanel({ onSaveGit }: { onSaveGit: (t: string) => void }) {
  const [gitToken, setGitToken] = useState('');
  const [aiKey, setAiKeyLocal] = useState('');
  const [gptKey, setGptKeyLocal] = useState('');
  const [provider, setProviderLocal] = useState<'anthropic' | 'openai'>(getAiProvider());
  const [saving, setSaving] = useState(false);
  const hasGit = hasToken();
  const hasAi = hasAiKey();
  const hasGpt = hasGptKey();

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '48px 24px' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Configuracion</h1>

      <div style={{ ...card, marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <label style={{ ...labelSt, margin: 0 }}>GitHub Personal Access Token</label>
          {hasGit && <span style={{ fontSize: 10, fontWeight: 700, color: '#065f46', backgroundColor: '#d1fae5', padding: '2px 8px', borderRadius: 99 }}>CONECTADO</span>}
        </div>
        <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 10 }}>GitHub → Settings → Developer settings → Fine-grained tokens.<br />Permiso: <b>Contents: Read and Write</b> para <code>hsotes/metalurgica-bm</code>.</p>
        <input type="password" value={gitToken} onChange={e => setGitToken(e.target.value)} placeholder="github_pat_..." style={inputSt} />
        <button onClick={async () => { setSaving(true); await onSaveGit(gitToken.trim()); setSaving(false); }} disabled={saving || !gitToken.trim()} style={{ ...btnPrimary, marginTop: 10 }}>{saving ? 'Verificando...' : 'Guardar token GitHub'}</button>
      </div>

      {/* AI Provider selector */}
      <div style={{ ...card, marginBottom: 16 }}>
        <label style={{ ...labelSt, margin: '0 0 12px' }}>Proveedor de IA</label>
        <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 12 }}>Selecciona que modelo de IA usar para traduccion, SEO y LinkedIn.</p>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => { setProviderLocal('openai'); setAiProvider('openai'); }}
            style={{ flex: 1, padding: '12px 16px', borderRadius: 8, border: provider === 'openai' ? '2px solid #10a37f' : '2px solid #e5e7eb', backgroundColor: provider === 'openai' ? '#f0fdf4' : '#fff', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' as const }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: provider === 'openai' ? '#10a37f' : '#374151' }}>OpenAI GPT-4o</div>
            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>Rapido, versatil</div>
            {provider === 'openai' && <div style={{ fontSize: 10, fontWeight: 700, color: '#10a37f', marginTop: 4 }}>ACTIVO</div>}
          </button>
          <button onClick={() => { setProviderLocal('anthropic'); setAiProvider('anthropic'); }}
            style={{ flex: 1, padding: '12px 16px', borderRadius: 8, border: provider === 'anthropic' ? '2px solid #7c3aed' : '2px solid #e5e7eb', backgroundColor: provider === 'anthropic' ? '#f5f3ff' : '#fff', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' as const }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: provider === 'anthropic' ? '#7c3aed' : '#374151' }}>Anthropic Claude</div>
            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>Preciso, profesional</div>
            {provider === 'anthropic' && <div style={{ fontSize: 10, fontWeight: 700, color: '#7c3aed', marginTop: 4 }}>ACTIVO</div>}
          </button>
        </div>
      </div>

      {/* OpenAI GPT key */}
      <div style={{ ...card, marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <label style={{ ...labelSt, margin: 0 }}>OpenAI API Key (GPT-4o)</label>
          {hasGpt && <span style={{ fontSize: 10, fontWeight: 700, color: '#065f46', backgroundColor: '#d1fae5', padding: '2px 8px', borderRadius: 99 }}>CONFIGURADA</span>}
        </div>
        <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 10 }}>Obtene tu key en <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" style={{ color: '#10a37f', fontWeight: 600 }}>platform.openai.com/api-keys</a></p>
        <input type="password" value={gptKey} onChange={e => setGptKeyLocal(e.target.value)} placeholder="sk-..." style={inputSt} />
        <button onClick={() => { if (gptKey.trim()) { setGptKey(gptKey.trim()); setGptKeyLocal(''); alert('API key de OpenAI guardada'); } }} disabled={!gptKey.trim()} style={{ ...btnPrimary, marginTop: 10, backgroundColor: '#10a37f' }}>Guardar API key OpenAI</button>
      </div>

      {/* Anthropic key */}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <label style={{ ...labelSt, margin: 0 }}>Anthropic API Key (Claude)</label>
          {hasAi && <span style={{ fontSize: 10, fontWeight: 700, color: '#065f46', backgroundColor: '#d1fae5', padding: '2px 8px', borderRadius: 99 }}>CONFIGURADA</span>}
        </div>
        <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 10 }}>Obtene tu key en <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#7c3aed', fontWeight: 600 }}>console.anthropic.com</a></p>
        <input type="password" value={aiKey} onChange={e => setAiKeyLocal(e.target.value)} placeholder="sk-ant-..." style={inputSt} />
        <button onClick={() => { if (aiKey.trim()) { setAiKey(aiKey.trim()); setAiKeyLocal(''); alert('API key de Anthropic guardada'); } }} disabled={!aiKey.trim()} style={{ ...btnPrimary, marginTop: 10, backgroundColor: '#7c3aed' }}>Guardar API key Anthropic</button>
      </div>
    </div>
  );
}

// ============================================================
// DASHBOARD
// ============================================================
function DashboardPanel({ articles, loading, onNew, onEdit, onDelete }: { articles: ArticleMeta[]; loading: boolean; onNew: () => void; onEdit: (a: ArticleMeta) => void; onDelete: (a: ArticleMeta) => void }) {
  const cats = [...new Set(articles.map(a => a.category))];
  const banco = getBanco();
  const [, forceUpdate] = useState(0);
  const draft = getDraft();
  return (
    <div style={{ padding: '28px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div><h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Dashboard</h1><p style={{ color: '#6b7280', marginTop: 2, fontSize: 13 }}>Gestion de contenido</p></div>
        <button onClick={onNew} style={btnAccent}>+ Nuevo Articulo</button>
      </div>

      {draft && (
        <div style={{ ...card, marginBottom: 16, borderLeft: '4px solid #f59e0b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#92400e' }}>Borrador sin publicar</div>
            <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>"{draft.title || 'Sin titulo'}" — guardado {draft.savedAt ? new Date(draft.savedAt).toLocaleString('es-AR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : ''}</div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={onNew} style={btnAccent}>Continuar editando</button>
            <button onClick={() => { clearDraft(); forceUpdate(n => n + 1); }} style={{ ...linkBtn, color: '#dc2626' }}>Descartar</button>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        <StatBox label="Publicados" value={articles.length} />
        <StatBox label="Categorias" value={cats.length} />
        <StatBox label="En banco" value={banco.filter(b => !b.used).length} />
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
// EDITOR (with AI import + LinkedIn)
// ============================================================
function EditorPanel({ article, initialData, onBack, onPublish }: {
  article: ArticleMeta | null;
  initialData: EditorInit | null;
  onBack: () => void;
  onPublish: (fn: string, fm: Record<string, any>, body: string, sha?: string) => Promise<boolean>;
}) {
  const tpl = initialData?.contentType ? contentTemplates.find(t => t.id === initialData.contentType) : null;
  const draft = (!article && !initialData) ? getDraft() : null;
  const [step, setStep] = useState<'tpl' | 'edit'>(article || initialData || draft ? 'edit' : 'tpl');
  const [title, setTitle] = useState(article?.title || initialData?.title || draft?.title || '');
  const [desc, setDesc] = useState(article?.description || draft?.description || '');
  const [cat, setCat] = useState(article?.category || initialData?.category || draft?.category || categories[0]);
  const [tags, setTags] = useState(article?.tags.join(', ') || draft?.tags || '');
  const [img, setImg] = useState(article?.image || draft?.image || '');
  const [date, setDate] = useState(article?.date || draft?.date || new Date().toISOString().split('T')[0]);
  const [body, setBody] = useState(article?.content || tpl?.markdown || draft?.body || '');
  const [pub, setPub] = useState(false);
  const [preview, setPreview] = useState(false);

  // AI states
  const [aiLoading, setAiLoading] = useState(false);
  const [aiStatus, setAiStatus] = useState('');
  const [linkedinPost, setLinkedinPost] = useState('');
  const [showLinkedin, setShowLinkedin] = useState(false);
  const [linkedinLoading, setLinkedinLoading] = useState(false);
  const [sourceImages, setSourceImages] = useState<string[]>(draft?.sourceImages || []);
  const [published, setPublished] = useState(false);

  // Auto-save draft (debounced)
  useEffect(() => {
    if (article || published) return; // Don't save drafts when editing existing or after publish
    const timer = setTimeout(() => {
      if (title || body) {
        saveDraft({ title, description: desc, category: cat, tags, image: img, date, body, sourceImages, savedAt: new Date().toISOString(), editingFilename: undefined, editingSha: undefined, sourceUrl: initialData?.sourceUrl });
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [title, desc, cat, tags, img, date, body, sourceImages]);

  async function handleAiImport() {
    if (!initialData?.sourceUrl) return;
    const active = getActiveAiKey();
    if (!active) { alert('Configura tu API Key (OpenAI o Anthropic) en Configuracion para usar la traduccion automatica.'); return; }

    setAiLoading(true);
    try {
      setAiStatus('Scrapeando articulo original...');
      const scrapeRes = await fetch(`/api/scrape?url=${encodeURIComponent(initialData.sourceUrl)}&mode=full`);
      if (!scrapeRes.ok) throw new Error('Error al scrapear el articulo');
      const scraped = await scrapeRes.json();

      if (scraped.images?.length) setSourceImages(scraped.images);

      setAiStatus(`IA (${active.provider === 'openai' ? 'GPT-4o' : 'Claude'}) traduciendo y optimizando SEO...`);
      const aiRes = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: active.key, provider: active.provider, action: 'import_article',
          data: { title: scraped.title || initialData.title, content: scraped.content || '', sourceUrl: initialData.sourceUrl },
        }),
      });
      if (!aiRes.ok) { const err = await aiRes.json().catch(() => ({})); throw new Error(err.error || 'Error de IA'); }
      const ai = await aiRes.json();

      if (ai.title) setTitle(ai.title);
      if (ai.description) setDesc(ai.description);
      if (ai.category) setCat(ai.category);
      if (ai.tags) setTags(ai.tags.join(', '));
      if (ai.content) setBody(ai.content);
      if (ai.slug && !article) setImg(scraped.images?.[0] || '');

      setAiStatus('Articulo listo! Revisa y publica.');
      setTimeout(() => setAiStatus(''), 4000);
    } catch (e: any) { setAiStatus(''); alert('Error: ' + e.message); }
    setAiLoading(false);
  }

  async function handleGenerateLinkedin() {
    const active = getActiveAiKey();
    if (!active) { alert('Configura tu API Key (OpenAI o Anthropic) en Configuracion.'); return; }
    if (!title || !body) { alert('El articulo necesita titulo y contenido.'); return; }

    setLinkedinLoading(true);
    try {
      const slug = slugify(title);
      const blogUrl = `https://www.metalurgicabotomariani.com.ar/blog/${slug}/`;
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: active.key, provider: active.provider, action: 'linkedin', data: { title, content: body, blogUrl } }),
      });
      if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.error || 'Error generando LinkedIn'); }
      const data = await res.json();
      setLinkedinPost(data.post);
      setShowLinkedin(true);
    } catch (e: any) { alert('Error: ' + e.message); }
    setLinkedinLoading(false);
  }

  // --- POST-PUBLISH SUCCESS SCREEN ---
  if (published && !article) {
    const publishedSlug = slugify(title);
    const publishedUrl = `https://www.metalurgicabotomariani.com.ar/blog/${publishedSlug}/`;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: 32 }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <svg width="32" height="32" fill="none" stroke="#065f46" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>Articulo publicado!</h2>
        <p style={{ color: '#6b7280', marginBottom: 4, textAlign: 'center' }}>Vercel esta redesplegando. Disponible en 1-2 minutos.</p>
        <a href={publishedUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#1a4d6d', fontWeight: 600, fontSize: 14, marginBottom: 24 }}>{publishedUrl}</a>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={handleGenerateLinkedin} disabled={linkedinLoading}
            style={{ ...btnSmall, backgroundColor: '#0077b5', color: '#fff', border: 'none', padding: '10px 20px', fontSize: 14, fontWeight: 700 }}>
            {linkedinLoading ? 'Generando...' : 'Generar post LinkedIn'}
          </button>
          <button onClick={onBack} style={{ ...btnSmall, padding: '10px 20px', fontSize: 14 }}>Volver al Dashboard</button>
        </div>

        {showLinkedin && (
          <div style={{ ...card, maxWidth: 560, width: '100%', marginTop: 24, padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: 4, backgroundColor: '#0077b5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 14 }}>in</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Post para LinkedIn</h3>
            </div>
            <textarea value={linkedinPost} onChange={e => setLinkedinPost(e.target.value)} rows={12}
              style={{ width: '100%', padding: 16, borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13, lineHeight: 1.6, fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box', outline: 'none' }} />
            <div style={{ fontSize: 11, color: linkedinPost.length > 1300 ? '#dc2626' : '#9ca3af', marginTop: 4, marginBottom: 12 }}>{linkedinPost.length}/1300 caracteres</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => { navigator.clipboard.writeText(linkedinPost); alert('Copiado al portapapeles!'); }} style={{ ...btnAccent, flex: 1 }}>Copiar al portapapeles</button>
              <button onClick={handleGenerateLinkedin} disabled={linkedinLoading} style={{ ...btnSmall, flex: 0 }}>{linkedinLoading ? '...' : 'Regenerar'}</button>
            </div>
          </div>
        )}
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
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
      {/* Top bar */}
      <div style={{ padding: '10px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0, flexWrap: 'wrap', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onBack} style={linkBtn}>← Dashboard</button>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{article ? 'Editando' : 'Nuevo'}: {title || 'Sin titulo'}</span>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {initialData?.sourceUrl && (
            <button onClick={handleAiImport} disabled={aiLoading}
              style={{ ...btnSmall, backgroundColor: '#7c3aed', color: '#fff', border: 'none', fontWeight: 700 }}>
              {aiLoading ? aiStatus : 'Importar y traducir (IA)'}
            </button>
          )}
          {initialData?.sourceUrl && (
            <a href={initialData.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ ...btnSmall, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>Ver original →</a>
          )}
          <button onClick={() => setPreview(!preview)} style={{ ...btnSmall, backgroundColor: preview ? '#1a4d6d' : '#fff', color: preview ? '#fff' : '#374151', border: '1px solid #d1d5db' }}>{preview ? 'Editor' : 'Preview'}</button>
          <button onClick={async () => {
            if (!title.trim() || !desc.trim()) { alert('Completa titulo y descripcion'); return; }
            setPub(true);
            const ok = await onPublish(
              article?.filename || `${slugify(title)}.md`,
              { title: title.trim(), description: desc.trim(), date, author: 'Metalurgica Boto Mariani', image: img.trim(), category: cat, tags: tags.split(',').map(t => t.trim()).filter(Boolean) },
              body, article?.sha
            );
            setPub(false);
            if (ok && !article) setPublished(true);
          }} disabled={pub} style={btnAccent}>{pub ? 'Publicando...' : article ? 'Actualizar' : 'Publicar'}</button>
        </div>
      </div>

      {/* AI status bar */}
      {aiStatus && (
        <div style={{ padding: '8px 20px', backgroundColor: '#f5f3ff', borderBottom: '1px solid #ddd6fe', display: 'flex', alignItems: 'center', gap: 8 }}>
          {aiLoading && <div style={{ width: 14, height: 14, border: '2px solid #7c3aed', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />}
          <span style={{ fontSize: 12, fontWeight: 600, color: '#7c3aed' }}>{aiStatus}</span>
        </div>
      )}

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ flex: 1, overflow: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Metadata */}
          <div style={card}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ gridColumn: '1/-1' }}><label style={labelSt}>Titulo SEO</label><input value={title} onChange={e => setTitle(e.target.value)} placeholder="Titulo optimizado para SEO..." style={inputSt} /></div>
              <div style={{ gridColumn: '1/-1' }}><label style={labelSt}>Meta Descripcion SEO</label><textarea value={desc} onChange={e => setDesc(e.target.value)} rows={2} placeholder="150-160 caracteres, persuasiva..." style={{ ...inputSt, resize: 'vertical' }} /><div style={{ fontSize: 10, color: desc.length > 160 ? '#dc2626' : '#9ca3af', marginTop: 2 }}>{desc.length}/160</div></div>
              <div><label style={labelSt}>Categoria</label><select value={cat} onChange={e => setCat(e.target.value)} style={inputSt}>{categories.map(c => <option key={c}>{c}</option>)}</select></div>
              <div><label style={labelSt}>Fecha</label><input type="date" value={date} onChange={e => setDate(e.target.value)} style={inputSt} /></div>
              <div><label style={labelSt}>Keywords / Tags</label><input value={tags} onChange={e => setTags(e.target.value)} placeholder="keyword1, keyword2, keyword3" style={inputSt} /></div>
              <div><label style={labelSt}>Imagen portada URL</label><input value={img} onChange={e => setImg(e.target.value)} placeholder="/images/..." style={inputSt} /></div>
              <div style={{ gridColumn: '1/-1' }}><label style={labelSt}>Slug URL</label><div style={{ fontSize: 12, color: '#6b7280', padding: '8px 12px', backgroundColor: '#f9fafb', borderRadius: 6, border: '1px solid #e5e7eb' }}>/blog/<b>{slugify(title) || 'slug-del-articulo'}</b>/</div></div>
            </div>
          </div>

          {/* Source images */}
          {sourceImages.length > 0 && (
            <div style={card}>
              <label style={labelSt}>Imagenes del articulo original (click para usar como portada)</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                {sourceImages.slice(0, 8).map((src, i) => (
                  <div key={i} onClick={() => setImg(src)} style={{ width: 100, height: 70, borderRadius: 6, overflow: 'hidden', cursor: 'pointer', border: img === src ? '3px solid #9acd32' : '2px solid #e5e7eb' }}>
                    <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none'; }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Markdown editor */}
          <div style={{ ...card, flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#374151' }}>Contenido (Markdown)</span>
              <span style={{ fontSize: 11, color: '#9ca3af' }}>{body.length} chars | ~{Math.round(body.split(/\s+/).length)} palabras</span>
            </div>
            <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Contenido del articulo..." style={{ flex: 1, minHeight: 350, border: '1px solid #e5e7eb', borderRadius: 8, padding: 16, fontFamily: "'Courier New', monospace", fontSize: 13, lineHeight: 1.7, resize: 'none', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
          </div>
        </div>

        {/* Preview */}
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

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ============================================================
// TRABAJO ENTREGADO (Publish to website + LinkedIn)
// ============================================================
function TrabajoPanel() {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [publishing, setPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState('');
  const [published, setPublished] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  // LinkedIn (post-publish)
  const [linkedinPost, setLinkedinPost] = useState('');
  const [showLinkedin, setShowLinkedin] = useState(false);
  const [linkedinLoading, setLinkedinLoading] = useState(false);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setPhotoFiles(prev => [...prev, ...files]);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => setPhotoPreviews(prev => [...prev, reader.result as string]);
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  }

  function removePhoto(index: number) {
    setPhotoFiles(prev => prev.filter((_, i) => i !== index));
    setPhotoPreviews(prev => prev.filter((_, i) => i !== index));
  }

  async function handlePublish() {
    if (!projectName.trim() || !description.trim()) { alert('Completa nombre del proyecto y descripcion.'); return; }
    if (photoFiles.length === 0) { alert('Selecciona al menos una foto del proyecto.'); return; }

    setPublishing(true);
    try {
      const slug = slugify(projectName);
      const urls: string[] = [];

      for (let i = 0; i < photoFiles.length; i++) {
        setPublishStatus(`Subiendo foto ${i + 1} de ${photoFiles.length}...`);
        const url = await uploadImage(photoFiles[i], slug);
        urls.push(url);
      }

      setPublishStatus('Publicando proyecto...');
      const filename = `${slug}.md`;
      const frontmatter: Record<string, any> = {
        title: projectName.trim(),
        description: description.trim(),
        date: new Date().toISOString().split('T')[0],
        category,
        image: urls[0],
        images: urls,
      };
      await createTrabajo(filename, frontmatter, description.trim());
      setUploadedUrls(urls);
      setPublished(true);
    } catch (e: any) { alert('Error publicando: ' + e.message); }
    setPublishing(false);
    setPublishStatus('');
  }

  async function handleGenerateLinkedin() {
    const active = getActiveAiKey();
    if (!active) { alert('Configura tu API Key en Configuracion.'); return; }

    setLinkedinLoading(true);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: active.key, provider: active.provider, action: 'linkedin_trabajo',
          data: { projectName: projectName.trim(), description: description.trim(), category, photos: uploadedUrls },
        }),
      });
      if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.error || 'Error generando post'); }
      const data = await res.json();
      setLinkedinPost(data.post);
      setShowLinkedin(true);
    } catch (e: any) { alert('Error: ' + e.message); }
    setLinkedinLoading(false);
  }

  function handleReset() {
    setProjectName(''); setDescription(''); setCategory(categories[0]);
    setPhotoFiles([]); setPhotoPreviews([]); setUploadedUrls([]);
    setPublished(false); setLinkedinPost(''); setShowLinkedin(false);
  }

  // --- POST-PUBLISH SUCCESS SCREEN ---
  if (published) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: 32 }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <svg width="32" height="32" fill="none" stroke="#065f46" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>Trabajo publicado!</h2>
        <p style={{ color: '#6b7280', marginBottom: 4, textAlign: 'center' }}>"{projectName}" se publico en la web.</p>
        <p style={{ color: '#9ca3af', marginBottom: 8, textAlign: 'center', fontSize: 13 }}>Vercel esta redesplegando. Visible en /nosotros/ en 1-2 minutos.</p>
        <p style={{ color: '#6b7280', marginBottom: 24, textAlign: 'center', fontSize: 12 }}>{uploadedUrls.length} foto{uploadedUrls.length !== 1 ? 's' : ''} subida{uploadedUrls.length !== 1 ? 's' : ''}</p>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={handleGenerateLinkedin} disabled={linkedinLoading}
            style={{ ...btnSmall, backgroundColor: '#0077b5', color: '#fff', border: 'none', padding: '10px 20px', fontSize: 14, fontWeight: 700 }}>
            {linkedinLoading ? 'Generando...' : 'Generar post LinkedIn'}
          </button>
          <button onClick={handleReset} style={{ ...btnSmall, padding: '10px 20px', fontSize: 14 }}>Nuevo proyecto</button>
        </div>

        {showLinkedin && (
          <div style={{ ...card, maxWidth: 560, width: '100%', marginTop: 24, padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: 4, backgroundColor: '#0077b5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 14 }}>in</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Post para LinkedIn</h3>
            </div>
            <textarea value={linkedinPost} onChange={e => setLinkedinPost(e.target.value)} rows={12}
              style={{ width: '100%', padding: 16, borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13, lineHeight: 1.6, fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box', outline: 'none' }} />
            <div style={{ fontSize: 11, color: linkedinPost.length > 1300 ? '#dc2626' : '#9ca3af', marginTop: 4, marginBottom: 12 }}>{linkedinPost.length}/1300 caracteres</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => { navigator.clipboard.writeText(linkedinPost); alert('Copiado al portapapeles!'); }} style={{ ...btnAccent, flex: 1 }}>Copiar al portapapeles</button>
              <button onClick={handleGenerateLinkedin} disabled={linkedinLoading} style={{ ...btnSmall, flex: 0 }}>{linkedinLoading ? '...' : 'Regenerar'}</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '48px 24px' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Trabajo Entregado</h1>
      <p style={{ color: '#6b7280', marginBottom: 24, fontSize: 13 }}>Publica un proyecto terminado en la web y genera un post de LinkedIn.</p>

      <div style={card}>
        <label style={labelSt}>Nombre del proyecto</label>
        <input value={projectName} onChange={e => setProjectName(e.target.value)} placeholder="Ej: Galpon industrial 500m2 en Pilar" style={{ ...inputSt, marginBottom: 12 }} />

        <label style={labelSt}>Categoria / Unidad de negocio</label>
        <select value={category} onChange={e => setCategory(e.target.value)} style={{ ...inputSt, marginBottom: 12 }}>{categories.map(c => <option key={c}>{c}</option>)}</select>

        <label style={labelSt}>Descripcion del trabajo</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} placeholder="Describe brevemente el proyecto: que se hizo, para quien, caracteristicas principales..." style={{ ...inputSt, resize: 'vertical', marginBottom: 12 }} />

        <label style={labelSt}>Fotos del proyecto</label>
        <div
          onClick={() => document.getElementById('trabajo-photos')?.click()}
          style={{ border: '2px dashed #d1d5db', borderRadius: 8, padding: 24, textAlign: 'center', cursor: 'pointer', marginBottom: 12, backgroundColor: '#f9fafb', transition: 'border-color 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#9acd32'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#d1d5db'; }}
        >
          <svg style={{ width: 32, height: 32, color: '#9ca3af', margin: '0 auto 8px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', margin: '0 0 4px' }}>Click para seleccionar fotos</p>
          <p style={{ fontSize: 11, color: '#9ca3af', margin: 0 }}>JPG, PNG o WebP. Podes seleccionar varias a la vez.</p>
        </div>
        <input id="trabajo-photos" type="file" accept="image/*" multiple onChange={handleFileSelect} style={{ display: 'none' }} />

        {/* Photo previews */}
        {photoPreviews.length > 0 && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {photoPreviews.map((src, i) => (
              <div key={i} style={{ position: 'relative', width: 100, height: 75, borderRadius: 8, overflow: 'hidden', border: i === 0 ? '3px solid #9acd32' : '2px solid #e5e7eb' }}>
                <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {i === 0 && <div style={{ position: 'absolute', top: 0, left: 0, backgroundColor: '#9acd32', color: '#111827', fontSize: 9, fontWeight: 700, padding: '1px 6px' }}>PORTADA</div>}
                <button onClick={() => removePhoto(i)} style={{ position: 'absolute', top: 2, right: 2, width: 20, height: 20, borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>✕</button>
              </div>
            ))}
          </div>
        )}

        {photoPreviews.length > 0 && (
          <p style={{ fontSize: 11, color: '#9ca3af', marginBottom: 16 }}>
            {photoPreviews.length} foto{photoPreviews.length !== 1 ? 's' : ''} seleccionada{photoPreviews.length !== 1 ? 's' : ''}. La primera sera la portada.
          </p>
        )}

        {/* Publish status */}
        {publishStatus && (
          <div style={{ padding: '10px 14px', backgroundColor: '#eff6ff', borderRadius: 8, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 14, height: 14, border: '2px solid #1a4d6d', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', flexShrink: 0 }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#1a4d6d' }}>{publishStatus}</span>
          </div>
        )}

        <button onClick={handlePublish} disabled={publishing || !projectName.trim() || !description.trim() || photoFiles.length === 0}
          style={{ ...btnAccent, padding: '10px 20px', fontSize: 14, fontWeight: 700, width: '100%', opacity: publishing || !projectName.trim() || !description.trim() || photoFiles.length === 0 ? 0.6 : 1 }}>
          {publishing ? 'Publicando...' : 'Publicar trabajo en la web'}
        </button>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ============================================================
// CALENDAR + SCRAPER + BANCO
// ============================================================
function CalendarPanel({ onCreateArticle }: { onCreateArticle: (entry: CalendarEntry) => void }) {
  const [entries, setEntries] = useState<CalendarEntry[]>([]);
  const [monthOffset, setMonthOffset] = useState(0);
  const [selected, setSelected] = useState<CalendarEntry | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCat, setNewCat] = useState(categories[0]);
  const [newDate, setNewDate] = useState('');
  const [newType, setNewType] = useState('articulo');
  const [moveDate, setMoveDate] = useState('');

  // Scraper
  const [sites, setSites] = useState<ScraperSite[]>([]);
  const [showAddSite, setShowAddSite] = useState(false);
  const [siteForm, setSiteForm] = useState({ name: '', blogUrl: '' });
  const [scraping, setScraping] = useState(false);
  const [scrapingId, setScrapingId] = useState('');

  // Banco
  const [banco, setBanco] = useState<BancoPost[]>([]);
  const [bancoFilter, setBancoFilter] = useState('all');
  const [showAutoplan, setShowAutoplan] = useState(false);
  const [autoplanDate, setAutoplanDate] = useState(new Date().toISOString().split('T')[0]);

  // Use post modal
  const [usePost, setUsePost] = useState<BancoPost | null>(null);
  const [useDate, setUseDate] = useState('');
  const [useCat, setUseCat] = useState(categories[0]);

  useEffect(() => {
    setEntries(getCalendar());
    setSites(getScraperSites());
    setBanco(getBanco());
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
    if (!confirm('Regenerar calendario? Se perderan los cambios manuales.')) return;
    localStorage.removeItem('mbm_calendar');
    setEntries(getCalendar());
  }

  // Scraper
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
    try {
      const res = await fetch(`/api/scrape?url=${encodeURIComponent(site.blogUrl)}`);
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      if (data.posts?.length > 0) {
        const added = addToBanco(data.posts.map((p: any) => ({
          sourceUrl: p.url,
          sourceSiteName: site.name,
          title: p.title,
          image: p.image || '',
          excerpt: p.excerpt || '',
          date: p.date || '',
        })));
        setBanco(getBanco());
        alert(`${added} publicaciones nuevas agregadas al banco de ${site.name}. (${data.posts.length - added} duplicadas ignoradas)`);
      } else {
        alert('No se encontraron publicaciones en esta URL.');
      }
    } catch (e: any) {
      alert('Error scrapeando: ' + e.message);
    }
    setScraping(false);
    setScrapingId('');
  }

  // Banco actions
  function handleUsePost() {
    if (!usePost || !useDate) return;
    addCalendarEntry({
      date: useDate, title: usePost.title, category: useCat, contentType: 'articulo',
      status: 'planned', notes: usePost.excerpt || '', sourceUrl: usePost.sourceUrl,
    });
    markBancoPostUsed(usePost.id);
    setEntries(getCalendar());
    setBanco(getBanco());
    setUsePost(null);
    setUseDate('');
  }

  function handleAutoplan() {
    const result = autoplanFromBanco(autoplanDate);
    setEntries(getCalendar());
    setBanco(getBanco());
    setShowAutoplan(false);
    if (result.planned > 0) {
      alert(`Planificadas ${result.planned} publicaciones en ${result.weeks} semanas.\nContenido hasta: ${new Date(result.endDate).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}`);
    } else {
      alert('No hay publicaciones en el banco para planificar.');
    }
  }

  function handleClearBanco() {
    if (!confirm('Vaciar el banco de contenido? Se eliminaran todas las publicaciones scrapeadas.')) return;
    clearBanco();
    setBanco([]);
  }

  const unusedBanco = banco.filter(p => !p.used);
  const filteredBanco = bancoFilter === 'all' ? banco : bancoFilter === 'unused' ? unusedBanco : banco.filter(p => p.sourceSiteName === bancoFilter);
  const sourceNames = [...new Set(banco.map(p => p.sourceSiteName))];
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, marginBottom: 20 }}>
        <StatBox label="Este mes" value={totalThisMonth} />
        <StatBox label="Publicados" value={publishedThisMonth} />
        <StatBox label="Pendientes" value={totalThisMonth - publishedThisMonth} />
        <StatBox label="En banco" value={unusedBanco.length} />
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

      {/* SCRAPER */}
      <div style={{ ...card, marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Scraper de Competidores</h2>
            <p style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>Scrapea blogs de la competencia. Los resultados se acumulan en el Banco de Contenido.</p>
          </div>
          <button onClick={() => setShowAddSite(true)} style={btnAccent}>+ Agregar URL</button>
        </div>
        {sites.length === 0 ? (
          <div style={{ padding: 16, textAlign: 'center', color: '#9ca3af', fontSize: 13 }}>Agrega URLs de blogs para empezar a scrapear.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {sites.map(site => (
              <div key={site.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', backgroundColor: '#f9fafb', borderRadius: 8, border: '1px solid #e5e7eb' }}>
                <div style={{ width: 8, height: 8, borderRadius: 99, backgroundColor: '#9acd32', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{site.name}</div>
                  <div style={{ fontSize: 11, color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{site.blogUrl}</div>
                </div>
                <button onClick={() => handleScrape(site)} disabled={scraping}
                  style={{ ...btnSmall, backgroundColor: '#1a4d6d', color: '#fff', border: 'none', opacity: scraping && scrapingId === site.id ? 0.6 : 1 }}>
                  {scraping && scrapingId === site.id ? 'Scrapeando...' : 'Scrapear'}
                </button>
                <button onClick={() => handleDeleteSite(site.id)} style={{ ...linkBtn, color: '#dc2626' }}>✕</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BANCO DE CONTENIDO */}
      <div style={{ ...card, marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>
              Banco de Contenido
              <span style={{ fontSize: 13, fontWeight: 400, color: '#6b7280', marginLeft: 8 }}>{banco.length} total / {unusedBanco.length} sin usar</span>
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {unusedBanco.length > 0 && (
              <button onClick={() => setShowAutoplan(true)} style={{ ...btnAccent, fontSize: 12 }}>Planificar 3/semana</button>
            )}
            {banco.length > 0 && (
              <button onClick={handleClearBanco} style={{ ...btnSmall, color: '#dc2626', fontSize: 11 }}>Vaciar banco</button>
            )}
          </div>
        </div>

        {banco.length === 0 ? (
          <div style={{ padding: 16, textAlign: 'center', color: '#9ca3af', fontSize: 13 }}>El banco esta vacio. Scrapea sitios de competidores para llenarlo.</div>
        ) : (
          <>
            {/* Filters */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 12, flexWrap: 'wrap' }}>
              <button onClick={() => setBancoFilter('all')} style={{ ...btnSmall, fontSize: 11, backgroundColor: bancoFilter === 'all' ? '#1a4d6d' : '#fff', color: bancoFilter === 'all' ? '#fff' : '#374151' }}>Todos ({banco.length})</button>
              <button onClick={() => setBancoFilter('unused')} style={{ ...btnSmall, fontSize: 11, backgroundColor: bancoFilter === 'unused' ? '#1a4d6d' : '#fff', color: bancoFilter === 'unused' ? '#fff' : '#374151' }}>Sin usar ({unusedBanco.length})</button>
              {sourceNames.map(name => {
                const count = banco.filter(p => p.sourceSiteName === name).length;
                return (
                  <button key={name} onClick={() => setBancoFilter(name)} style={{ ...btnSmall, fontSize: 11, backgroundColor: bancoFilter === name ? '#1a4d6d' : '#fff', color: bancoFilter === name ? '#fff' : '#374151' }}>
                    {name} ({count})
                  </button>
                );
              })}
            </div>

            {/* Post grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 10, maxHeight: 500, overflow: 'auto' }}>
              {filteredBanco.map(post => (
                <div key={post.id} style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden', backgroundColor: post.used ? '#f9fafb' : '#fff', opacity: post.used ? 0.6 : 1 }}>
                  {post.image && (
                    <div style={{ aspectRatio: '16/9', overflow: 'hidden', backgroundColor: '#f3f4f6' }}>
                      <img src={post.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none'; }} />
                    </div>
                  )}
                  <div style={{ padding: 10 }}>
                    <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 4 }}>{post.sourceSiteName}{post.used && ' — USADO'}</div>
                    <h4 style={{ fontSize: 12, fontWeight: 700, margin: '0 0 6px', lineHeight: 1.3, color: '#111827' }}>{post.title}</h4>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {!post.used && (
                        <button onClick={() => { setUsePost(post); setUseDate(new Date().toISOString().split('T')[0]); }} style={{ ...btnSmall, fontSize: 10, backgroundColor: '#9acd32', color: '#111827', border: 'none', fontWeight: 700, padding: '4px 8px' }}>
                          Usar
                        </button>
                      )}
                      <a href={post.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ ...btnSmall, textDecoration: 'none', fontSize: 10, padding: '4px 8px' }}>Original</a>
                      <button onClick={() => { removeBancoPost(post.id); setBanco(getBanco()); }} style={{ ...linkBtn, color: '#dc2626', fontSize: 10 }}>✕</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ---- MODALS ---- */}

      {/* Entry detail */}
      {selected && (
        <div style={overlay} onClick={() => setSelected(null)}>
          <div style={{ ...card, maxWidth: 500, width: '90%', padding: 28 }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ ...badgeStyle(statusColors[selected.status]), fontSize: 11 }}>{statusLabels[selected.status]}</span>
              <button onClick={() => setSelected(null)} style={linkBtn}>✕</button>
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{selected.title}</h3>
            <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 4 }}>Categoria: <b>{selected.category}</b> | Tipo: <b>{selected.contentType}</b></p>
            <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 4 }}>Fecha: <b>{selected.date}</b></p>
            {selected.sourceUrl && (
              <p style={{ fontSize: 12, marginBottom: 4 }}>
                <span style={{ color: '#92400e', fontWeight: 600 }}>★ De competidor: </span>
                <a href={selected.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#1a4d6d', fontSize: 12 }}>ver original →</a>
              </p>
            )}
            <div style={{ marginTop: 12, padding: 12, backgroundColor: '#f9fafb', borderRadius: 8 }}>
              <label style={{ ...labelSt, marginBottom: 6 }}>Mover a otra fecha</label>
              <div style={{ display: 'flex', gap: 6 }}>
                <input type="date" value={moveDate} onChange={e => setMoveDate(e.target.value)} style={{ ...inputSt, flex: 1 }} />
                <button onClick={handleMoveEntry} disabled={!moveDate || moveDate === selected.date} style={{ ...btnSmall, backgroundColor: moveDate && moveDate !== selected.date ? '#1a4d6d' : '#e5e7eb', color: moveDate && moveDate !== selected.date ? '#fff' : '#9ca3af', border: 'none' }}>Mover</button>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
              {(['suggested', 'planned', 'draft', 'published'] as const).map(s => (
                <button key={s} onClick={() => handleStatusChange(selected, s)} style={{ ...btnSmall, backgroundColor: selected.status === s ? statusColors[s].bg : '#f3f4f6', color: selected.status === s ? statusColors[s].fg : '#6b7280', fontWeight: selected.status === s ? 700 : 400 }}>{statusLabels[s]}</button>
              ))}
            </div>
            <hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => { onCreateArticle(selected); setSelected(null); }} style={{ ...btnAccent, fontSize: 12 }}>Crear articulo{selected.sourceUrl ? ' (con IA)' : ''}</button>
              <button onClick={() => handleDeleteEntry(selected.id)} style={{ ...btnSmall, color: '#dc2626' }}>Eliminar</button>
            </div>
          </div>
        </div>
      )}

      {/* Add entry */}
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

      {/* Add site */}
      {showAddSite && (
        <div style={overlay} onClick={() => setShowAddSite(false)}>
          <div style={{ ...card, maxWidth: 440, width: '90%', padding: 28 }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Agregar sitio de competidor</h3>
            <label style={labelSt}>Nombre</label>
            <input value={siteForm.name} onChange={e => setSiteForm({ ...siteForm, name: e.target.value })} placeholder="Ej: Ampla Estruturas" style={{ ...inputSt, marginBottom: 10 }} />
            <label style={labelSt}>URL del blog</label>
            <input value={siteForm.blogUrl} onChange={e => setSiteForm({ ...siteForm, blogUrl: e.target.value })} placeholder="https://www.ejemplo.com/blog" style={{ ...inputSt, marginBottom: 16 }} />
            <button onClick={handleAddSite} disabled={!siteForm.name.trim() || !siteForm.blogUrl.trim()} style={btnAccent}>Agregar</button>
          </div>
        </div>
      )}

      {/* Use post */}
      {usePost && (
        <div style={overlay} onClick={() => setUsePost(null)}>
          <div style={{ ...card, maxWidth: 480, width: '90%', padding: 28 }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Programar en el calendario</h3>
            <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 16 }}>Se agregara al calendario. Despues desde ahi creas el articulo con IA.</p>
            <div style={{ padding: 12, backgroundColor: '#f9fafb', borderRadius: 8, marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{usePost.title}</div>
              <div style={{ fontSize: 11, color: '#9ca3af' }}>Fuente: {usePost.sourceSiteName}</div>
            </div>
            <label style={labelSt}>Fecha de publicacion</label>
            <input type="date" value={useDate} onChange={e => setUseDate(e.target.value)} style={{ ...inputSt, marginBottom: 10 }} />
            <label style={labelSt}>Categoria</label>
            <select value={useCat} onChange={e => setUseCat(e.target.value)} style={{ ...inputSt, marginBottom: 16 }}>{categories.map(c => <option key={c}>{c}</option>)}</select>
            <button onClick={handleUsePost} disabled={!useDate} style={btnAccent}>Agregar al calendario</button>
          </div>
        </div>
      )}

      {/* Auto-plan */}
      {showAutoplan && (
        <div style={overlay} onClick={() => setShowAutoplan(false)}>
          <div style={{ ...card, maxWidth: 440, width: '90%', padding: 28 }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Planificacion automatica</h3>
            <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 16 }}>
              Hay <b>{unusedBanco.length}</b> publicaciones sin usar en el banco.<br />
              Se planificaran 3 por semana (Mar/Mie/Jue).<br />
              Esto da contenido para <b>~{Math.ceil(unusedBanco.length / 3)} semanas</b>.
            </p>
            <label style={labelSt}>Empezar desde</label>
            <input type="date" value={autoplanDate} onChange={e => setAutoplanDate(e.target.value)} style={{ ...inputSt, marginBottom: 16 }} />
            <button onClick={handleAutoplan} style={btnAccent}>Planificar {unusedBanco.length} publicaciones</button>
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
