// Obtiene el access token de LinkedIn para el publicador. Se corre A MANO,
// una vez cada ~60 dias, en la maquina de Hernan. Node 20+, sin dependencias.
//
// El token que devuelve es del MIEMBRO que aprueba en el navegador. Para que
// los posts salgan como Facundo Boto Mariani, el paso 2 hay que hacerlo con la
// sesion de LinkedIn de Facundo abierta.
//
// PASO 1 - imprimir la URL de autorizacion:
//     set LINKEDIN_CLIENT_ID=xxxxxxxx
//     node scripts/linkedin/obtener-token.mjs url
//
// PASO 2 - abrir esa URL en el navegador, aprobar, y copiar el valor del
//     parametro ?code=... de la barra de direcciones. El codigo dura ~30 min.
//
// PASO 3 - canjear el codigo por el token:
//     set LINKEDIN_CLIENT_ID=xxxxxxxx
//     set LINKEDIN_CLIENT_SECRET=yyyyyyyy
//     node scripts/linkedin/obtener-token.mjs canjear <codigo>
//
// Imprime el access token, su vencimiento y el URN del miembro. Esos dos
// valores van como secrets del repositorio: LINKEDIN_ACCESS_TOKEN y
// LINKEDIN_AUTHOR_URN.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const REDIRECT_URI = 'https://www.metalurgicabotomariani.com.ar/admin/';
const SCOPES = 'openid profile w_member_social';

function requerido(nombre) {
  const v = process.env[nombre];
  if (!v) {
    console.error(`\nFalta la variable de entorno ${nombre}.`);
    console.error('Se saca de la pestana Auth de la app en developer.linkedin.com\n');
    process.exit(1);
  }
  // Ya paso: se copio el texto de ejemplo en vez del valor real, y el error
  // recien aparecio en la pantalla de LinkedIn.
  if (/^(tu_|your_|xxx)/i.test(v) || v.includes('client_id') || v.includes('client_secret')) {
    console.error(`\n${nombre} tiene el texto de ejemplo, no el valor real: "${v}"`);
    console.error('Reemplazarlo por el valor de Application credentials, en la pestana');
    console.error('Auth de la app MBM blog publisher en developer.linkedin.com\n');
    process.exit(1);
  }
  return v;
}

function urlAutorizacion() {
  const u = new URL('https://www.linkedin.com/oauth/v2/authorization');
  u.searchParams.set('response_type', 'code');
  u.searchParams.set('client_id', requerido('LINKEDIN_CLIENT_ID'));
  u.searchParams.set('redirect_uri', REDIRECT_URI);
  u.searchParams.set('state', 'mbm' + Date.now());
  u.searchParams.set('scope', SCOPES);
  console.log('\nAbrir esta URL en el navegador, CON LA SESION DE FACUNDO:\n');
  console.log(u.toString());
  console.log('\nDespues de aprobar, el navegador va a redirigir a una URL que');
  console.log('incluye ?code=XXXXX  — copiar ese valor y usarlo en el paso 3.\n');
}

// Acepta el codigo pelado o la URL completa a la que redirigio LinkedIn. Lo
// segundo es lo comodo: se copia la barra de direcciones y listo.
function extraerCodigo(entrada) {
  const t = entrada.trim().replace(/^["']|["']$/g, '');
  if (t.startsWith('http')) {
    const code = new URL(t).searchParams.get('code');
    if (!code) {
      console.error('\nEsa URL no trae ?code=. Revisar que sea la de despues de aprobar.\n');
      process.exit(1);
    }
    return code;
  }
  return t;
}

async function canjear(entrada) {
  const codigo = extraerCodigo(entrada);
  const clientId = requerido('LINKEDIN_CLIENT_ID');
  const clientSecret = requerido('LINKEDIN_CLIENT_SECRET');

  const res = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: codigo,
      redirect_uri: REDIRECT_URI,
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });
  const data = await res.json();
  if (!res.ok || !data.access_token) {
    console.error('\nLinkedIn rechazo el canje:', JSON.stringify(data, null, 2));
    console.error('\nCausas habituales: el codigo ya se uso, vencio (duran ~30 min),');
    console.error('o el redirect_uri no coincide exactamente con el registrado en la app.\n');
    process.exit(1);
  }

  // El URN del autor sale de userinfo: es el "sub" del miembro que aprobo.
  const meRes = await fetch('https://api.linkedin.com/v2/userinfo', {
    headers: { Authorization: `Bearer ${data.access_token}` },
  });
  const me = await meRes.json();
  if (!meRes.ok || !me.sub) {
    console.error('\nNo se pudo leer /v2/userinfo:', JSON.stringify(me, null, 2));
    process.exit(1);
  }

  const vence = new Date(Date.now() + data.expires_in * 1000);
  console.log('\n================ CARGAR COMO SECRETS DEL REPOSITORIO ================\n');
  console.log('LINKEDIN_ACCESS_TOKEN');
  console.log(data.access_token);
  console.log('\nLINKEDIN_AUTHOR_URN');
  console.log(`urn:li:person:${me.sub}`);
  console.log('\n====================================================================');
  console.log(`\nMiembro autorizado : ${me.name || '(sin nombre)'}`);
  console.log(`Vence              : ${vence.toISOString().slice(0, 16).replace('T', ' ')} UTC`);
  console.log(`Dias de validez    : ${Math.round(data.expires_in / 86400)}`);
  console.log('\nVERIFICAR que el miembro autorizado sea Facundo. Si dice otro nombre,');
  console.log('se aprobo con la sesion equivocada y hay que repetir el paso 2.\n');

  // Respaldo FUERA del repositorio: el repo es publico y esto no puede
  // terminar commiteado ni por accidente. Paso una vez que se cerro la
  // consola antes de copiar el token, y el codigo es de un solo uso.
  const destino = path.join(os.tmpdir(), 'linkedin-mbm-token.txt');
  fs.writeFileSync(
    destino,
    [
      'LINKEDIN_ACCESS_TOKEN',
      data.access_token,
      '',
      'LINKEDIN_AUTHOR_URN',
      `urn:li:person:${me.sub}`,
      '',
      'LINKEDIN_TOKEN_VENCE',
      vence.toISOString().slice(0, 10),
      '',
      `Miembro autorizado: ${me.name || '(sin nombre)'}`,
      '',
      'Cargar los tres en:',
      'https://github.com/hsotes/metalurgica-bm/settings/secrets/actions',
      'Despues BORRAR este archivo.',
    ].join('\n'),
    'utf8'
  );
  console.log(`\nRespaldo escrito en:\n  ${destino}`);
  console.log('Borralo despues de cargar los secrets.\n');
}

const [modo, arg] = process.argv.slice(2);
if (modo === 'url') {
  urlAutorizacion();
} else if (modo === 'canjear' && arg) {
  await canjear(arg.trim());
} else {
  console.log('\nUso:');
  console.log('  node scripts/linkedin/obtener-token.mjs url');
  console.log('  node scripts/linkedin/obtener-token.mjs canjear <codigo>\n');
  process.exit(1);
}
