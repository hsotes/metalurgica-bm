import { useState, useEffect, useCallback } from 'react';
import { marked } from 'marked';
import {
  hasToken, setToken, clearToken, validateToken,
  listArticles, createArticle, updateArticle, deleteArticle,
  type ArticleMeta,
} from './github';
import { contentTemplates, categories, slugify } from './templates';

type View = 'dashboard' | 'editor' | 'settings';

export default function AdminApp() {
  const [view, setView] = useState<View>('dashboard');
  const [tokenReady, setTokenReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<ArticleMeta[]>([]);
  const [editingArticle, setEditingArticle] = useState<ArticleMeta | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    checkToken();
  }, []);

  async function checkToken() {
    if (hasToken()) {
      const valid = await validateToken();
      if (valid) {
        setTokenReady(true);
        loadArticles();
      } else {
        clearToken();
        setLoading(false);
        setView('settings');
      }
    } else {
      setLoading(false);
      setView('settings');
    }
  }

  async function loadArticles() {
    setLoading(true);
    try {
      const arts = await listArticles();
      setArticles(arts);
    } catch (e: any) {
      showMessage('error', `Error cargando articulos: ${e.message}`);
    }
    setLoading(false);
  }

  function showMessage(type: 'success' | 'error', text: string) {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  }

  function handleNewArticle() {
    setEditingArticle(null);
    setView('editor');
  }

  function handleEditArticle(article: ArticleMeta) {
    setEditingArticle(article);
    setView('editor');
  }

  async function handleDeleteArticle(article: ArticleMeta) {
    if (!confirm(`Eliminar "${article.title}"? Esta accion no se puede deshacer.`)) return;
    try {
      await deleteArticle(article.filename, article.sha);
      showMessage('success', 'Articulo eliminado. Vercel redesplegara en unos minutos.');
      loadArticles();
    } catch (e: any) {
      showMessage('error', `Error eliminando: ${e.message}`);
    }
  }

  function handleBackToDashboard() {
    setView('dashboard');
    setEditingArticle(null);
    loadArticles();
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Montserrat', system-ui, sans-serif" }}>
      {/* Sidebar */}
      <aside style={{
        width: 260,
        backgroundColor: '#111827',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid #1f2937' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 8,
              backgroundColor: '#9acd32', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: 16, color: '#111827',
            }}>
              MBM
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Editorial MBM</div>
              <div style={{ fontSize: 11, color: '#9ca3af' }}>Dashboard de contenido</div>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '16px 12px' }}>
          <SidebarButton
            active={view === 'dashboard'}
            onClick={() => { setView('dashboard'); setEditingArticle(null); }}
            icon={<IconGrid />}
            label="Dashboard"
          />
          <SidebarButton
            active={view === 'editor' && !editingArticle}
            onClick={handleNewArticle}
            icon={<IconPlus />}
            label="Nuevo Articulo"
          />
          <SidebarButton
            active={view === 'settings'}
            onClick={() => setView('settings')}
            icon={<IconGear />}
            label="Configuracion"
          />
        </nav>

        <div style={{ padding: '16px 20px', borderTop: '1px solid #1f2937', fontSize: 11, color: '#6b7280' }}>
          <a href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>
            ← Volver al sitio
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, backgroundColor: '#f3f4f6', overflow: 'auto' }}>
        {/* Top Bar */}
        {message && (
          <div style={{
            padding: '12px 24px',
            backgroundColor: message.type === 'success' ? '#065f46' : '#991b1b',
            color: '#fff',
            fontSize: 14,
            fontWeight: 500,
          }}>
            {message.text}
          </div>
        )}

        {!tokenReady && view !== 'settings' ? (
          <SettingsView
            onSave={async (token) => {
              setToken(token);
              const valid = await validateToken();
              if (valid) {
                setTokenReady(true);
                setView('dashboard');
                loadArticles();
              } else {
                clearToken();
                showMessage('error', 'Token invalido. Verifica que tenga permisos de repo.');
              }
            }}
          />
        ) : view === 'settings' ? (
          <SettingsView
            onSave={async (token) => {
              setToken(token);
              const valid = await validateToken();
              if (valid) {
                setTokenReady(true);
                setView('dashboard');
                loadArticles();
                showMessage('success', 'Token configurado correctamente.');
              } else {
                clearToken();
                showMessage('error', 'Token invalido. Verifica que tenga permisos de repo.');
              }
            }}
          />
        ) : view === 'dashboard' ? (
          <DashboardView
            articles={articles}
            loading={loading}
            onNew={handleNewArticle}
            onEdit={handleEditArticle}
            onDelete={handleDeleteArticle}
          />
        ) : view === 'editor' ? (
          <EditorView
            article={editingArticle}
            onBack={handleBackToDashboard}
            onPublish={async (filename, frontmatter, body, sha) => {
              try {
                if (sha) {
                  await updateArticle(filename, frontmatter, body, sha);
                  showMessage('success', 'Articulo actualizado. Vercel redesplegara automaticamente.');
                } else {
                  await createArticle(filename, frontmatter, body);
                  showMessage('success', 'Articulo publicado. Vercel desplegara en ~2 minutos.');
                }
                handleBackToDashboard();
              } catch (e: any) {
                showMessage('error', `Error publicando: ${e.message}`);
              }
            }}
          />
        ) : null}
      </main>
    </div>
  );
}

/* ============================================================
   SIDEBAR BUTTON
   ============================================================ */

function SidebarButton({ active, onClick, icon, label }: {
  active: boolean; onClick: () => void; icon: React.ReactNode; label: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        width: '100%', padding: '10px 12px', marginBottom: 4,
        borderRadius: 8, border: 'none', cursor: 'pointer',
        backgroundColor: active ? '#1f2937' : 'transparent',
        color: active ? '#fff' : '#9ca3af',
        fontSize: 14, fontWeight: active ? 600 : 400,
        fontFamily: 'inherit', textAlign: 'left',
        transition: 'all 0.15s',
      }}
      onMouseEnter={(e) => { if (!active) e.currentTarget.style.backgroundColor = '#1f2937'; }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.backgroundColor = 'transparent'; }}
    >
      {icon}
      {label}
    </button>
  );
}

/* ============================================================
   SETTINGS VIEW
   ============================================================ */

function SettingsView({ onSave }: { onSave: (token: string) => void }) {
  const [token, setLocalToken] = useState('');
  const [saving, setSaving] = useState(false);

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '60px 24px' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: '#111827', marginBottom: 8 }}>
        Configuracion
      </h1>
      <p style={{ color: '#6b7280', marginBottom: 32, lineHeight: 1.6 }}>
        Para publicar articulos directamente desde el dashboard, necesitas un token de GitHub
        con permisos de escritura en el repositorio.
      </p>

      <div style={{
        backgroundColor: '#fff', borderRadius: 12, padding: 32,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}>
        <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, fontSize: 14, color: '#374151' }}>
          GitHub Personal Access Token
        </label>
        <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>
          Genera uno en GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens.
          Necesita permisos de <strong>Contents: Read and Write</strong> para el repo <code>hsotes/metalurgica-bm</code>.
        </p>
        <input
          type="password"
          value={token}
          onChange={(e) => setLocalToken(e.target.value)}
          placeholder="github_pat_..."
          style={{
            width: '100%', padding: '12px 16px', borderRadius: 8,
            border: '1px solid #d1d5db', fontSize: 14,
            fontFamily: 'monospace', boxSizing: 'border-box',
          }}
        />
        <button
          onClick={async () => {
            if (!token.trim()) return;
            setSaving(true);
            await onSave(token.trim());
            setSaving(false);
          }}
          disabled={saving || !token.trim()}
          style={{
            marginTop: 16, padding: '12px 32px', borderRadius: 8,
            backgroundColor: saving ? '#6b7280' : '#1a4d6d',
            color: '#fff', border: 'none', cursor: 'pointer',
            fontWeight: 600, fontSize: 14, fontFamily: 'inherit',
          }}
        >
          {saving ? 'Verificando...' : 'Guardar y verificar'}
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   DASHBOARD VIEW
   ============================================================ */

function DashboardView({ articles, loading, onNew, onEdit, onDelete }: {
  articles: ArticleMeta[];
  loading: boolean;
  onNew: () => void;
  onEdit: (a: ArticleMeta) => void;
  onDelete: (a: ArticleMeta) => void;
}) {
  const uniqueCategories = [...new Set(articles.map(a => a.category))];

  return (
    <div style={{ padding: '32px 40px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#111827', margin: 0 }}>
            Dashboard
          </h1>
          <p style={{ color: '#6b7280', marginTop: 4, fontSize: 14 }}>
            Gestion de contenido del blog
          </p>
        </div>
        <button
          onClick={onNew}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '12px 24px', borderRadius: 8,
            backgroundColor: '#9acd32', color: '#111827',
            border: 'none', cursor: 'pointer',
            fontWeight: 700, fontSize: 14, fontFamily: 'inherit',
          }}
        >
          <IconPlus /> Nuevo Articulo
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        <StatCard label="Total articulos" value={articles.length} />
        <StatCard label="Categorias" value={uniqueCategories.length} />
        <StatCard
          label="Ultimo publicado"
          value={articles[0]?.date ? new Date(articles[0].date).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' }) : '-'}
        />
        <StatCard label="Este mes" value={articles.filter(a => {
          const d = new Date(a.date);
          const now = new Date();
          return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        }).length} />
      </div>

      {/* Articles Table */}
      <div style={{
        backgroundColor: '#fff', borderRadius: 12,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden',
      }}>
        <div style={{
          padding: '16px 24px', borderBottom: '1px solid #e5e7eb',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: 0 }}>
            Articulos publicados
          </h2>
        </div>

        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#6b7280' }}>
            Cargando articulos...
          </div>
        ) : articles.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#6b7280' }}>
            No hay articulos publicados. Crea el primero.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <th style={thStyle}>Titulo</th>
                <th style={thStyle}>Categoria</th>
                <th style={thStyle}>Fecha</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.filename} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={tdStyle}>
                    <div style={{ fontWeight: 600, color: '#111827' }}>{article.title}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{article.filename}</div>
                  </td>
                  <td style={tdStyle}>
                    <span style={{
                      backgroundColor: '#f0fdf4', color: '#166534',
                      fontSize: 12, fontWeight: 600, padding: '4px 10px',
                      borderRadius: 99,
                    }}>
                      {article.category}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, color: '#6b7280', fontSize: 13 }}>
                    {article.date ? new Date(article.date).toLocaleDateString('es-AR') : '-'}
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'right' }}>
                    <button
                      onClick={() => onEdit(article)}
                      style={actionBtnStyle}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(article)}
                      style={{ ...actionBtnStyle, color: '#dc2626', marginLeft: 8 }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding: '12px 24px', textAlign: 'left',
  fontSize: 12, fontWeight: 600, color: '#6b7280',
  textTransform: 'uppercase', letterSpacing: '0.05em',
};

const tdStyle: React.CSSProperties = {
  padding: '16px 24px', fontSize: 14,
};

const actionBtnStyle: React.CSSProperties = {
  background: 'none', border: 'none', cursor: 'pointer',
  color: '#1a4d6d', fontWeight: 600, fontSize: 13,
  fontFamily: 'inherit', padding: '4px 8px',
};

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={{
      backgroundColor: '#fff', borderRadius: 12, padding: '20px 24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color: '#111827', marginTop: 4 }}>
        {value}
      </div>
    </div>
  );
}

/* ============================================================
   EDITOR VIEW
   ============================================================ */

function EditorView({ article, onBack, onPublish }: {
  article: ArticleMeta | null;
  onBack: () => void;
  onPublish: (filename: string, frontmatter: Record<string, any>, body: string, sha?: string) => Promise<void>;
}) {
  const [step, setStep] = useState<'template' | 'edit'>(article ? 'edit' : 'template');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('articulo');
  const [title, setTitle] = useState(article?.title || '');
  const [description, setDescription] = useState(article?.description || '');
  const [category, setCategory] = useState(article?.category || categories[0]);
  const [tags, setTags] = useState(article?.tags.join(', ') || '');
  const [image, setImage] = useState(article?.image || '');
  const [date, setDate] = useState(article?.date || new Date().toISOString().split('T')[0]);
  const [body, setBody] = useState(article?.content || '');
  const [publishing, setPublishing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  function handleSelectTemplate(templateId: string) {
    const template = contentTemplates.find(t => t.id === templateId);
    if (template) {
      setBody(template.markdown);
      setSelectedTemplate(templateId);
    }
    setStep('edit');
  }

  async function handlePublish() {
    if (!title.trim()) { alert('El titulo es obligatorio'); return; }
    if (!description.trim()) { alert('La descripcion es obligatoria'); return; }
    if (!image.trim()) { alert('La imagen de portada es obligatoria'); return; }

    setPublishing(true);

    const filename = article?.filename || `${slugify(title)}.md`;
    const frontmatter = {
      title: title.trim(),
      description: description.trim(),
      date,
      author: 'Metalurgica Boto Mariani',
      image: image.trim(),
      category,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    };

    await onPublish(filename, frontmatter, body, article?.sha);
    setPublishing(false);
  }

  const renderedHTML = marked.parse(body) as string;

  // Template selector
  if (step === 'template') {
    return (
      <div style={{ padding: '32px 40px' }}>
        <button onClick={onBack} style={backBtnStyle}>
          ← Volver al dashboard
        </button>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#111827', marginBottom: 8 }}>
          Nuevo Articulo
        </h1>
        <p style={{ color: '#6b7280', marginBottom: 32 }}>
          Elige el tipo de contenido. Cada plantilla esta optimizada para un formato especifico.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {contentTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => handleSelectTemplate(template.id)}
              style={{
                backgroundColor: '#fff', borderRadius: 12, padding: 24,
                border: '2px solid #e5e7eb', cursor: 'pointer',
                textAlign: 'left', fontFamily: 'inherit',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#9acd32';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(154,205,50,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 8 }}>
                {template.name}
              </div>
              <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5, marginBottom: 12 }}>
                {template.description}
              </div>
              <div style={{
                fontSize: 11, fontWeight: 600, color: '#1a4d6d',
                backgroundColor: '#eff6ff', padding: '4px 10px',
                borderRadius: 99, display: 'inline-block',
              }}>
                LinkedIn: {template.linkedinFormat}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Editor
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Editor Top Bar */}
      <div style={{
        padding: '12px 24px', backgroundColor: '#fff',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={onBack} style={backBtnStyle}>
            ← Dashboard
          </button>
          <span style={{ color: '#d1d5db' }}>|</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>
            {article ? 'Editando' : 'Nuevo'}: {title || 'Sin titulo'}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setShowPreview(!showPreview)}
            style={{
              padding: '8px 16px', borderRadius: 6, border: '1px solid #d1d5db',
              backgroundColor: showPreview ? '#1a4d6d' : '#fff',
              color: showPreview ? '#fff' : '#374151',
              cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
            }}
          >
            {showPreview ? 'Ocultar vista previa' : 'Vista previa'}
          </button>
          <button
            onClick={handlePublish}
            disabled={publishing}
            style={{
              padding: '8px 24px', borderRadius: 6, border: 'none',
              backgroundColor: publishing ? '#6b7280' : '#9acd32',
              color: '#111827', cursor: 'pointer',
              fontSize: 13, fontWeight: 700, fontFamily: 'inherit',
            }}
          >
            {publishing ? 'Publicando...' : (article ? 'Actualizar' : 'Publicar')}
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left: Form + Editor */}
        <div style={{
          flex: showPreview ? 1 : 1,
          overflow: 'auto', padding: 24,
          display: 'flex', flexDirection: 'column', gap: 16,
        }}>
          {/* Metadata Fields */}
          <div style={{
            backgroundColor: '#fff', borderRadius: 12, padding: 24,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Titulo</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Titulo del articulo..."
                  style={inputStyle}
                />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Descripcion</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Breve descripcion para SEO y vista previa..."
                  rows={2}
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>
              <div>
                <label style={labelStyle}>Categoria</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={inputStyle}
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Fecha</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Tags (separados por coma)</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="tag1, tag2, tag3"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Imagen de portada (ruta)</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="/images/arquitectura/foto.jpg"
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* Markdown Editor */}
          <div style={{
            backgroundColor: '#fff', borderRadius: 12,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            flex: 1, display: 'flex', flexDirection: 'column',
          }}>
            <div style={{
              padding: '12px 24px', borderBottom: '1px solid #e5e7eb',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>
                Contenido (Markdown)
              </span>
              <span style={{ fontSize: 11, color: '#9ca3af' }}>
                {body.length} caracteres
              </span>
            </div>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Escribe el contenido en Markdown..."
              style={{
                flex: 1, minHeight: 400, padding: 24, border: 'none',
                resize: 'none', fontFamily: "'Courier New', monospace",
                fontSize: 14, lineHeight: 1.7, color: '#374151',
                outline: 'none', boxSizing: 'border-box', width: '100%',
              }}
            />
          </div>
        </div>

        {/* Right: Preview */}
        {showPreview && (
          <div style={{
            flex: 1, overflow: 'auto', padding: 24,
            borderLeft: '1px solid #e5e7eb',
            backgroundColor: '#fff',
          }}>
            <div style={{ maxWidth: 700, margin: '0 auto' }}>
              {/* Preview Header */}
              {image && (
                <div style={{
                  aspectRatio: '16/9', overflow: 'hidden',
                  borderRadius: 12, marginBottom: 24, backgroundColor: '#f3f4f6',
                }}>
                  <img
                    src={image}
                    alt={title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
              <div style={{
                display: 'inline-block', backgroundColor: '#9acd32',
                color: '#111827', fontSize: 11, fontWeight: 700,
                padding: '4px 12px', borderRadius: 99,
                textTransform: 'uppercase', marginBottom: 16,
              }}>
                {category}
              </div>
              <h1 style={{ fontSize: 32, fontWeight: 700, color: '#111827', marginBottom: 12, lineHeight: 1.2 }}>
                {title || 'Titulo del articulo'}
              </h1>
              <p style={{ color: '#6b7280', fontSize: 16, marginBottom: 24, lineHeight: 1.6 }}>
                {description || 'Descripcion del articulo...'}
              </p>
              <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', marginBottom: 24 }} />

              {/* Rendered Markdown */}
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: renderedHTML }}
                style={{ lineHeight: 1.8, color: '#374151' }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const backBtnStyle: React.CSSProperties = {
  background: 'none', border: 'none', cursor: 'pointer',
  color: '#6b7280', fontSize: 13, fontWeight: 600,
  fontFamily: 'inherit', padding: '4px 0',
};

const labelStyle: React.CSSProperties = {
  display: 'block', marginBottom: 6, fontSize: 12,
  fontWeight: 600, color: '#374151', textTransform: 'uppercase',
  letterSpacing: '0.025em',
};

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px', borderRadius: 8,
  border: '1px solid #d1d5db', fontSize: 14,
  fontFamily: 'inherit', boxSizing: 'border-box',
  outline: 'none',
};

/* ============================================================
   ICONS (inline SVG)
   ============================================================ */

function IconGrid() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function IconPlus() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function IconGear() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );
}
