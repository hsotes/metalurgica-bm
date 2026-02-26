import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COOKIE_NAME = 'mbm_session';

function verifyTokenEdge(token: string, secret: string): boolean {
  // En middleware de Vercel usamos Web Crypto API
  // Pero como es sync-check, hacemos verificación simplificada de estructura + expiración
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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rutas protegidas
  const isAdmin = pathname.startsWith('/admin');
  const isProtectedApi = pathname.startsWith('/api/') && !pathname.startsWith('/api/auth');

  if (!isAdmin && !isProtectedApi) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get(COOKIE_NAME)?.value;
  const secret = process.env.SESSION_SECRET || '';

  if (!sessionCookie || !verifyTokenEdge(sessionCookie, secret)) {
    // Para APIs: devolver 401
    if (isProtectedApi) {
      return new NextResponse(JSON.stringify({ error: 'No autenticado' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    // Para /admin: dejar pasar (el React app mostrará login)
    // No redirigimos porque el login está integrado en AdminApp
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};
