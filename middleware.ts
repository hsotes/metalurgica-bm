const COOKIE_NAME = 'mbm_session';

function verifyTokenEdge(token: string): boolean {
  try {
    const [, body] = token.split('.');
    const payload = JSON.parse(atob(body.replace(/-/g, '+').replace(/_/g, '/')));
    if (payload.exp && Date.now() > payload.exp) return false;
    if (payload.role !== 'admin') return false;
    return true;
  } catch {
    return false;
  }
}

export default function middleware(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Rutas protegidas
  const isAdmin = pathname.startsWith('/admin');
  const isProtectedApi = pathname.startsWith('/api/') && !pathname.startsWith('/api/auth');

  if (!isAdmin && !isProtectedApi) {
    return;
  }

  const cookie = request.headers.get('cookie') || '';
  const match = cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  const sessionToken = match ? match[1] : null;

  if (!sessionToken || !verifyTokenEdge(sessionToken)) {
    // Para APIs: devolver 401
    if (isProtectedApi) {
      return new Response(JSON.stringify({ error: 'No autenticado' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    // Para /admin: dejar pasar (el React app mostrará login)
  }
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};
