const REPO_OWNER = 'hsotes';
const REPO_NAME = 'metalurgica-bm';
const BLOG_PATH = 'src/content/blog';
const TRABAJOS_PATH = 'src/content/trabajos';
const API_BASE = 'https://api.github.com';

export interface GitHubFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  download_url: string;
}

export interface ArticleMeta {
  filename: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
  author: string;
  sha: string;
  content: string;
}

function getToken(): string | null {
  return localStorage.getItem('mbm_github_token');
}

export function setToken(token: string) {
  localStorage.setItem('mbm_github_token', token);
}

export function hasToken(): boolean {
  return !!getToken();
}

export function clearToken() {
  localStorage.removeItem('mbm_github_token');
}

async function githubFetch(path: string, options: RequestInit = {}) {
  const token = getToken();
  if (!token) throw new Error('No GitHub token configured');

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `GitHub API error: ${res.status}`);
  }

  return res.json();
}

function decodeBase64UTF8(base64: string): string {
  const cleaned = base64.replace(/\n/g, '');
  const bytes = Uint8Array.from(atob(cleaned), c => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function encodeUTF8Base64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export async function listArticles(): Promise<ArticleMeta[]> {
  const files: GitHubFile[] = await githubFetch(
    `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${BLOG_PATH}`
  );

  const articles: ArticleMeta[] = [];

  for (const file of files) {
    if (!file.name.endsWith('.md')) continue;

    try {
      const fileData = await githubFetch(
        `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${BLOG_PATH}/${file.name}`
      );

      const content = decodeBase64UTF8(fileData.content);
      const meta = parseFrontmatter(content);

      articles.push({
        filename: file.name,
        title: meta.title || file.name,
        description: meta.description || '',
        date: meta.date || '',
        category: meta.category || '',
        tags: meta.tags || [],
        image: meta.image || '',
        author: meta.author || 'Metalurgica Boto Mariani',
        sha: fileData.sha,
        content: meta.body || '',
      });
    } catch (e) {
      console.error(`Error reading ${file.name}:`, e);
    }
  }

  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function createArticle(
  filename: string,
  frontmatter: Record<string, any>,
  markdownBody: string
): Promise<void> {
  const content = buildMarkdownFile(frontmatter, markdownBody);
  const encoded = encodeUTF8Base64(content);

  await githubFetch(
    `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${BLOG_PATH}/${filename}`,
    {
      method: 'PUT',
      body: JSON.stringify({
        message: `blog: ${frontmatter.title || filename}`,
        content: encoded,
      }),
    }
  );
}

export async function updateArticle(
  filename: string,
  frontmatter: Record<string, any>,
  markdownBody: string,
  sha: string
): Promise<void> {
  const content = buildMarkdownFile(frontmatter, markdownBody);
  const encoded = encodeUTF8Base64(content);

  await githubFetch(
    `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${BLOG_PATH}/${filename}`,
    {
      method: 'PUT',
      body: JSON.stringify({
        message: `blog: actualizar ${frontmatter.title || filename}`,
        content: encoded,
        sha,
      }),
    }
  );
}

export async function deleteArticle(filename: string, sha: string): Promise<void> {
  await githubFetch(
    `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${BLOG_PATH}/${filename}`,
    {
      method: 'DELETE',
      body: JSON.stringify({
        message: `blog: eliminar ${filename}`,
        sha,
      }),
    }
  );
}

// --- Trabajos Entregados ---

export async function createTrabajo(
  filename: string,
  frontmatter: Record<string, any>,
  markdownBody: string
): Promise<void> {
  const content = buildMarkdownFile(frontmatter, markdownBody);
  const encoded = encodeUTF8Base64(content);

  await githubFetch(
    `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${TRABAJOS_PATH}/${filename}`,
    {
      method: 'PUT',
      body: JSON.stringify({
        message: `trabajo: ${frontmatter.title || filename}`,
        content: encoded,
      }),
    }
  );
}

export async function listTrabajos(): Promise<ArticleMeta[]> {
  let files: GitHubFile[];
  try {
    files = await githubFetch(
      `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${TRABAJOS_PATH}`
    );
  } catch {
    return [];
  }

  const items: ArticleMeta[] = [];

  for (const file of files) {
    if (!file.name.endsWith('.md')) continue;

    try {
      const fileData = await githubFetch(
        `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${TRABAJOS_PATH}/${file.name}`
      );

      const content = decodeBase64UTF8(fileData.content);
      const meta = parseFrontmatter(content);

      items.push({
        filename: file.name,
        title: meta.title || file.name,
        description: meta.description || '',
        date: meta.date || '',
        category: meta.category || '',
        tags: meta.images || [],
        image: meta.image || '',
        author: '',
        sha: fileData.sha,
        content: meta.body || '',
      });
    } catch (e) {
      console.error(`Error reading trabajo ${file.name}:`, e);
    }
  }

  return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function deleteTrabajo(filename: string, sha: string): Promise<void> {
  await githubFetch(
    `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${TRABAJOS_PATH}/${filename}`,
    {
      method: 'DELETE',
      body: JSON.stringify({
        message: `trabajo: eliminar ${filename}`,
        sha,
      }),
    }
  );
}

export async function validateToken(): Promise<boolean> {
  try {
    await githubFetch(`/repos/${REPO_OWNER}/${REPO_NAME}`);
    return true;
  } catch {
    return false;
  }
}

function buildMarkdownFile(frontmatter: Record<string, any>, body: string): string {
  const lines = ['---'];
  for (const [key, value] of Object.entries(frontmatter)) {
    if (Array.isArray(value)) {
      lines.push(`${key}: [${value.map(v => `"${v}"`).join(', ')}]`);
    } else if (typeof value === 'string') {
      lines.push(`${key}: "${value}"`);
    } else {
      lines.push(`${key}: ${value}`);
    }
  }
  lines.push('---');
  lines.push('');
  lines.push(body);
  return lines.join('\n');
}

function parseFrontmatter(content: string): Record<string, any> & { body: string } {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { body: content };

  const frontmatterStr = match[1];
  const body = match[2].trim();
  const meta: Record<string, any> = { body };

  for (const line of frontmatterStr.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;

    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();

    if (value.startsWith('[') && value.endsWith(']')) {
      const inner = value.slice(1, -1);
      meta[key] = inner
        .split(',')
        .map(v => v.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    } else if ((value.startsWith('"') && value.endsWith('"')) ||
               (value.startsWith("'") && value.endsWith("'"))) {
      meta[key] = value.slice(1, -1);
    } else {
      meta[key] = value;
    }
  }

  return meta;
}
