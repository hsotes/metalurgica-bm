import { parse } from 'node-html-parser';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const url = Array.isArray(req.query.url) ? req.query.url[0] : req.query.url;
  const mode = Array.isArray(req.query.mode) ? req.query.mode[0] : req.query.mode;

  if (!url) return res.status(400).json({ error: 'URL parameter required' });

  try {
    const html = await fetchPage(url);
    if (mode === 'full') {
      return res.json(extractFullArticle(html, url));
    }
    return res.json({ posts: extractBlogPosts(html, url) });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Scraping failed' });
  }
}

async function fetchPage(url: string): Promise<string> {
  const r = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'es-AR,es;q=0.9,en;q=0.8',
    },
  });
  if (!r.ok) throw new Error(`Failed to fetch: ${r.status}`);
  return r.text();
}

function resolveUrl(href: string, base: string): string {
  if (!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('data:')) return '';
  try { return new URL(href, base).toString(); } catch { return ''; }
}

function getImgSrc(img: any, base: string): string {
  const src = img.getAttribute('src') || img.getAttribute('data-src') || img.getAttribute('data-lazy-src') || '';
  const resolved = resolveUrl(src, base);
  if (!resolved) return '';
  // Filter out tiny icons, tracking pixels
  const w = parseInt(img.getAttribute('width') || '999');
  const h = parseInt(img.getAttribute('height') || '999');
  if (w < 50 || h < 50) return '';
  return resolved;
}

function extractPostFromElement(el: any, baseUrl: string): any | null {
  const links = el.querySelectorAll('a[href]');
  let bestLink = '';
  let bestTitle = '';

  // Find heading-based link first
  const heading = el.querySelector('h1, h2, h3, h4');
  if (heading) {
    bestTitle = heading.text.trim();
    const headingLink = heading.querySelector('a[href]') || heading.closest?.('a[href]');
    if (headingLink) {
      bestLink = resolveUrl(headingLink.getAttribute('href') || '', baseUrl);
    }
  }

  // If no heading link, find first meaningful link
  if (!bestLink) {
    for (const link of links) {
      const href = resolveUrl(link.getAttribute('href') || '', baseUrl);
      if (href && href !== baseUrl && !href.includes('#')) {
        bestLink = href;
        if (!bestTitle) bestTitle = link.text.trim();
        break;
      }
    }
  }

  if (!bestLink || !bestTitle || bestTitle.length < 5) return null;

  // Find image
  const img = el.querySelector('img');
  const image = img ? getImgSrc(img, baseUrl) : '';

  // Find excerpt
  const pTags = el.querySelectorAll('p');
  let excerpt = '';
  for (const p of pTags) {
    const text = p.text.trim();
    if (text.length > 30) { excerpt = text.slice(0, 200); break; }
  }

  // Find date
  const timeEl = el.querySelector('time');
  const dateStr = timeEl?.getAttribute('datetime') || timeEl?.text?.trim() || '';

  return { title: bestTitle, url: bestLink, image, excerpt, date: dateStr };
}

function extractBlogPosts(html: string, baseUrl: string): any[] {
  const root = parse(html);
  const posts: any[] = [];
  const seen = new Set<string>();

  function addPost(post: any) {
    if (post && post.url && !seen.has(post.url)) {
      seen.add(post.url);
      posts.push(post);
    }
  }

  // Strategy 1: <article> elements
  for (const article of root.querySelectorAll('article')) {
    addPost(extractPostFromElement(article, baseUrl));
  }

  // Strategy 2: Common blog post selectors
  if (posts.length === 0) {
    const selectors = ['.post', '.blog-post', '.entry', '.blog-entry', '.blog-item', '.news-item',
      '[class*="post-card"]', '[class*="blog-card"]', '[class*="article-card"]',
      '.card', '.item', '.hentry'];
    for (const sel of selectors) {
      try {
        for (const el of root.querySelectorAll(sel)) {
          addPost(extractPostFromElement(el, baseUrl));
        }
      } catch {}
      if (posts.length > 0) break;
    }
  }

  // Strategy 3: Links with headings in any container
  if (posts.length === 0) {
    const containers = root.querySelectorAll('main, .content, .blog, .posts, .articles, [role="main"], #content, #main');
    const searchIn = containers.length > 0 ? containers : [root];
    for (const container of searchIn) {
      const headings = container.querySelectorAll('h2, h3, h4');
      for (const h of headings) {
        const link = h.querySelector('a[href]') || h.parentNode?.querySelector?.('a[href]');
        if (link) {
          const href = resolveUrl(link.getAttribute('href') || '', baseUrl);
          const title = h.text.trim();
          if (href && title && title.length > 5 && !seen.has(href)) {
            seen.add(href);
            // Try to find an image nearby
            const parent = h.parentNode;
            const img = parent?.querySelector?.('img');
            posts.push({
              title,
              url: href,
              image: img ? getImgSrc(img, baseUrl) : '',
              excerpt: '',
              date: '',
            });
          }
        }
      }
    }
  }

  // Strategy 4: Just find all internal links with substantial text
  if (posts.length === 0) {
    const baseHost = new URL(baseUrl).hostname;
    for (const link of root.querySelectorAll('a[href]')) {
      const href = resolveUrl(link.getAttribute('href') || '', baseUrl);
      if (!href) continue;
      try {
        const linkHost = new URL(href).hostname;
        if (linkHost !== baseHost) continue;
      } catch { continue; }
      const text = link.text.trim();
      if (text.length > 20 && text.length < 200 && !seen.has(href)) {
        seen.add(href);
        const img = link.querySelector('img');
        posts.push({
          title: text,
          url: href,
          image: img ? getImgSrc(img, baseUrl) : '',
          excerpt: '',
          date: '',
        });
      }
    }
  }

  return posts.slice(0, 30);
}

function extractFullArticle(html: string, url: string) {
  const root = parse(html);

  // Remove noise
  root.querySelectorAll('script, style, nav, header, footer, .sidebar, .comments, .related, .share, .social, form, iframe, [class*="cookie"], [class*="popup"], [class*="modal"], [class*="widget"], [class*="sidebar"], [class*="footer"], [class*="header"], [class*="menu"], [class*="nav"]')
    .forEach(el => el.remove());

  // Find title
  const title = root.querySelector('h1')?.text?.trim() || root.querySelector('title')?.text?.trim()?.split('|')[0]?.trim() || '';

  // Find main content area
  const mainSelectors = [
    'article .entry-content', 'article .post-content', 'article .content',
    '.entry-content', '.post-content', '.article-content', '.blog-content',
    'article', 'main', '[role="main"]', '.content', '#content',
  ];

  let content: any = null;
  for (const sel of mainSelectors) {
    const el = root.querySelector(sel);
    if (el && el.text.trim().length > 200) { content = el; break; }
  }
  if (!content) content = root.querySelector('body') || root;

  // Extract images
  const images: string[] = [];
  content.querySelectorAll('img').forEach((img: any) => {
    const src = getImgSrc(img, url);
    if (src && !src.includes('logo') && !src.includes('icon') && !src.includes('avatar') && !src.includes('pixel')) {
      images.push(src);
    }
  });

  // Convert to markdown
  const markdown = nodeToMarkdown(content, url);

  return { title, content: markdown, images, url };
}

function nodeToMarkdown(el: any, base: string): string {
  let md = '';
  const children = el.childNodes || [];

  for (const child of children) {
    if (child.nodeType === 3) {
      md += child.text;
      continue;
    }
    if (child.nodeType !== 1) continue;

    const tag = child.tagName?.toLowerCase() || '';

    if (['script', 'style', 'nav', 'footer', 'aside', 'form', 'iframe'].includes(tag)) continue;

    if (/^h[1-6]$/.test(tag)) {
      const level = parseInt(tag[1]);
      const text = child.text.trim();
      if (text) md += `\n${'#'.repeat(level)} ${text}\n\n`;
    } else if (tag === 'p') {
      const inner = nodeToMarkdown(child, base).trim();
      if (inner) md += `${inner}\n\n`;
    } else if (tag === 'ul') {
      for (const li of child.querySelectorAll(':scope > li')) {
        md += `- ${li.text.trim()}\n`;
      }
      md += '\n';
    } else if (tag === 'ol') {
      let i = 1;
      for (const li of child.querySelectorAll(':scope > li')) {
        md += `${i}. ${li.text.trim()}\n`;
        i++;
      }
      md += '\n';
    } else if (tag === 'img') {
      const src = getImgSrc(child, base);
      if (src) md += `\n![${child.getAttribute('alt') || ''}](${src})\n\n`;
    } else if (tag === 'blockquote') {
      const text = child.text.trim();
      if (text) md += `> ${text}\n\n`;
    } else if (tag === 'strong' || tag === 'b') {
      md += `**${child.text.trim()}**`;
    } else if (tag === 'em' || tag === 'i') {
      md += `*${child.text.trim()}*`;
    } else if (tag === 'a') {
      const href = resolveUrl(child.getAttribute('href') || '', base);
      const text = child.text.trim();
      if (href && text) md += `[${text}](${href})`;
      else if (text) md += text;
    } else if (tag === 'br') {
      md += '\n';
    } else if (tag === 'hr') {
      md += '\n---\n\n';
    } else if (tag === 'table') {
      md += extractTable(child) + '\n\n';
    } else if (['div', 'section', 'main', 'figure', 'figcaption', 'span', 'li'].includes(tag)) {
      md += nodeToMarkdown(child, base);
    }
  }

  return md.replace(/\n{3,}/g, '\n\n').trim();
}

function extractTable(table: any): string {
  const rows = table.querySelectorAll('tr');
  if (rows.length === 0) return '';
  let md = '';
  rows.forEach((row: any, i: number) => {
    const cells = row.querySelectorAll('th, td');
    const line = cells.map((c: any) => c.text.trim()).join(' | ');
    md += `| ${line} |\n`;
    if (i === 0) md += `| ${cells.map(() => '---').join(' | ')} |\n`;
  });
  return md;
}
