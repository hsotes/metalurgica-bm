import { getSessionFromCookie } from './auth';

const REPO_OWNER = 'hsotes';
const REPO_NAME = 'metalurgica-bm';
const API_BASE = 'https://api.github.com';
const ALLOWED_ORIGIN = 'https://www.metalurgicabotomariani.com.ar';

// Rutas permitidas dentro del repo (whitelist para seguridad)
const ALLOWED_PATHS = ['src/content/blog', 'src/content/trabajos', 'public/trabajos', 'public/blog'];

export default async function handler(req: any, res: any) {
  const origin = process.env.VERCEL_ENV === 'production' ? ALLOWED_ORIGIN : '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // Auth check
  if (!getSessionFromCookie(req)) {
    return res.status(401).json({ error: 'No autenticado' });
  }

  const githubToken = process.env.GITHUB_TOKEN;
  if (!githubToken) {
    return res.status(500).json({ error: 'GITHUB_TOKEN no configurado en el servidor.' });
  }

  // El path viene como query param: /api/github?path=src/content/blog/article.md
  const repoPath = Array.isArray(req.query.path) ? req.query.path.join('/') : req.query.path || '';

  if (!repoPath) {
    // Validate token: GET /repos/{owner}/{repo}
    if (req.method === 'GET') {
      try {
        const r = await fetch(`${API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}`, {
          headers: {
            'Authorization': `Bearer ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        });
        if (!r.ok) return res.status(r.status).json({ error: 'GitHub token invalido' });
        return res.json({ ok: true });
      } catch (e: any) {
        return res.status(500).json({ error: e.message });
      }
    }
    return res.status(400).json({ error: 'Path requerido' });
  }

  // Validar que el path esté dentro de las rutas permitidas
  const isAllowed = ALLOWED_PATHS.some(p => repoPath.startsWith(p));
  if (!isAllowed) {
    return res.status(403).json({ error: 'Ruta no permitida' });
  }

  const githubUrl = `${API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${repoPath}`;

  try {
    const options: RequestInit = {
      method: req.method,
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
    };

    if (req.method === 'PUT' || req.method === 'DELETE') {
      options.body = JSON.stringify(req.body);
    }

    const r = await fetch(githubUrl, options);
    const data = await r.json().catch(() => ({}));

    if (!r.ok) {
      return res.status(r.status).json({ error: data.message || `GitHub API error: ${r.status}` });
    }

    return res.json(data);
  } catch (e: any) {
    return res.status(500).json({ error: e.message || 'Error conectando con GitHub' });
  }
}
