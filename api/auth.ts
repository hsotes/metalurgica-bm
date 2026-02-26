import crypto from 'crypto';

const COOKIE_NAME = 'mbm_session';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 dias
const ALLOWED_ORIGIN = 'https://www.metalurgicabotomariani.com.ar';

function cors(res: any) {
  const origin = process.env.VERCEL_ENV === 'production' ? ALLOWED_ORIGIN : '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
}

function signToken(payload: object, secret: string): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', secret).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${signature}`;
}

export function verifyToken(token: string, secret: string): object | null {
  try {
    const [header, body, signature] = token.split('.');
    const expected = crypto.createHmac('sha256', secret).update(`${header}.${body}`).digest('base64url');
    if (signature !== expected) return null;
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString());
    if (payload.exp && Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

export function getSessionFromCookie(req: any): object | null {
  const secret = process.env.SESSION_SECRET;
  if (!secret) return null;
  const cookies = req.headers?.cookie || '';
  const match = cookies.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  if (!match) return null;
  return verifyToken(match[1], secret);
}

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { password, action } = req.body;

  if (action === 'logout') {
    res.setHeader('Set-Cookie', `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=0`);
    return res.json({ ok: true });
  }

  if (action === 'check') {
    const session = getSessionFromCookie(req);
    return res.json({ authenticated: !!session });
  }

  // Login
  const adminPassword = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.SESSION_SECRET;

  if (!adminPassword || !sessionSecret) {
    return res.status(500).json({ error: 'Server no configurado. Falta ADMIN_PASSWORD o SESSION_SECRET en Vercel.' });
  }

  if (!password) {
    return res.status(400).json({ error: 'Password requerido' });
  }

  if (password !== adminPassword) {
    return res.status(401).json({ error: 'Password incorrecto' });
  }

  const token = signToken({ role: 'admin', iat: Date.now(), exp: Date.now() + COOKIE_MAX_AGE * 1000 }, sessionSecret);

  res.setHeader('Set-Cookie', `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=${COOKIE_MAX_AGE}`);
  return res.json({ ok: true });
}
