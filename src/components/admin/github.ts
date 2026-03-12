const BLOG_PATH = 'src/content/blog';
const TRABAJOS_PATH = 'src/content/trabajos';

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

async function proxyFetch(repoPath: string, options: RequestInit = {}) {
  const url = `/api/github?path=${encodeURIComponent(repoPath)}`;

  const res = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || `API error: ${res.status}`);
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
  const files: GitHubFile[] = await proxyFetch(BLOG_PATH);

  const articles: ArticleMeta[] = [];

  for (const file of files) {
    if (!file.name.endsWith('.md')) continue;

    try {
      const fileData = await proxyFetch(`${BLOG_PATH}/${file.name}`);

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

  await proxyFetch(`${BLOG_PATH}/${filename}`, {
    method: 'PUT',
    body: JSON.stringify({
      message: `blog: ${frontmatter.title || filename}`,
      content: encoded,
    }),
  });
}

export async function updateArticle(
  filename: string,
  frontmatter: Record<string, any>,
  markdownBody: string,
  sha: string
): Promise<void> {
  const content = buildMarkdownFile(frontmatter, markdownBody);
  const encoded = encodeUTF8Base64(content);

  await proxyFetch(`${BLOG_PATH}/${filename}`, {
    method: 'PUT',
    body: JSON.stringify({
      message: `blog: actualizar ${frontmatter.title || filename}`,
      content: encoded,
      sha,
    }),
  });
}

export async function deleteArticle(filename: string, sha: string): Promise<void> {
  await proxyFetch(`${BLOG_PATH}/${filename}`, {
    method: 'DELETE',
    body: JSON.stringify({
      message: `blog: eliminar ${filename}`,
      sha,
    }),
  });
}

// --- Trabajos Entregados ---

export async function createTrabajo(
  filename: string,
  frontmatter: Record<string, any>,
  markdownBody: string
): Promise<void> {
  const content = buildMarkdownFile(frontmatter, markdownBody);
  const encoded = encodeUTF8Base64(content);

  await proxyFetch(`${TRABAJOS_PATH}/${filename}`, {
    method: 'PUT',
    body: JSON.stringify({
      message: `trabajo: ${frontmatter.title || filename}`,
      content: encoded,
    }),
  });
}

export async function listTrabajos(): Promise<ArticleMeta[]> {
  let files: GitHubFile[];
  try {
    files = await proxyFetch(TRABAJOS_PATH);
  } catch {
    return [];
  }

  const items: ArticleMeta[] = [];

  for (const file of files) {
    if (!file.name.endsWith('.md')) continue;

    try {
      const fileData = await proxyFetch(`${TRABAJOS_PATH}/${file.name}`);

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
  await proxyFetch(`${TRABAJOS_PATH}/${filename}`, {
    method: 'DELETE',
    body: JSON.stringify({
      message: `trabajo: eliminar ${filename}`,
      sha,
    }),
  });
}

const MAX_IMAGE_WIDTH = 1600;
const MAX_IMAGE_SIZE_KB = 800;

async function compressImage(file: File): Promise<string> {
  // If file is small enough already, just read it
  if (file.size <= MAX_IMAGE_SIZE_KB * 1024) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_IMAGE_WIDTH / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();

  // Try decreasing quality until under limit
  let quality = 0.85;
  let dataUrl = canvas.toDataURL('image/jpeg', quality);
  while (dataUrl.length * 0.75 > MAX_IMAGE_SIZE_KB * 1024 && quality > 0.3) {
    quality -= 0.1;
    dataUrl = canvas.toDataURL('image/jpeg', quality);
  }

  return dataUrl.split(',')[1];
}

const IMAGES_PATH = 'public/trabajos';

export async function uploadImage(file: File, projectSlug: string): Promise<string> {
  const timestamp = Date.now();
  const filename = `${projectSlug}-${timestamp}.jpg`;
  const base64 = await compressImage(file);

  await proxyFetch(`${IMAGES_PATH}/${filename}`, {
    method: 'PUT',
    body: JSON.stringify({
      message: `img: ${projectSlug}`,
      content: base64,
    }),
  });

  return `/trabajos/${filename}`;
}

const BLOG_IMAGES_PATH = 'public/blog';

export async function uploadBlogImage(file: File, slug: string): Promise<string> {
  const timestamp = Date.now();
  const filename = `${slug}-${timestamp}.jpg`;
  const base64 = await compressImage(file);

  await proxyFetch(`${BLOG_IMAGES_PATH}/${filename}`, {
    method: 'PUT',
    body: JSON.stringify({
      message: `blog-img: ${slug}`,
      content: base64,
    }),
  });

  return `/blog/${filename}`;
}

// Batch commit: multiples archivos en un solo commit (evita race condition en Vercel)
export interface BatchFile {
  path: string;
  content: string;
  encoding?: 'utf-8' | 'base64';
}

export async function batchCommit(message: string, files: BatchFile[]): Promise<void> {
  const res = await fetch('/api/github?path=', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, files }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || `Batch commit error: ${res.status}`);
  }
}

// Prepara imagen comprimida sin commitear (para usar con batchCommit)
export async function prepareBlogImage(file: File, slug: string): Promise<{ path: string; base64: string; publicUrl: string }> {
  const timestamp = Date.now();
  const filename = `${slug}-${timestamp}.jpg`;
  const base64 = await compressImage(file);
  return {
    path: `public/blog/${filename}`,
    base64,
    publicUrl: `/blog/${filename}`,
  };
}

export async function validateToken(): Promise<boolean> {
  try {
    await proxyFetch('');
    return true;
  } catch {
    return false;
  }
}

export function buildMarkdownFile(frontmatter: Record<string, any>, body: string): string {
  const lines = ['---'];
  for (const [key, value] of Object.entries(frontmatter)) {
    if (Array.isArray(value)) {
      lines.push(`${key}: [${value.map(v => `"${v}"`).join(', ')}]`);
    } else if (typeof value === 'string') {
      const clean = value.replace(/^"+|"+$/g, '');
      lines.push(`${key}: "${clean}"`);
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
