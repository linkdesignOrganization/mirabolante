'use strict';

/**
 * Servidor estático zero-dependency para mirabolante-web (Azure App Service, Linux, Node 22).
 *
 * Reemplaza el hosting de Azure Static Web Apps replicando su comportamiento y añadiendo
 * un baseline de hardening de headers que el SWA no tenía:
 *
 *   - SPA fallback FIEL a public/staticwebapp.config.json: una ruta sin archivo en disco
 *     devuelve index.html (200) EXCEPTO si matchea el `exclude` (extensiones de asset o
 *     rutas bajo /images/ , /videos/), en cuyo caso devuelve un 404 real.
 *   - Sirve los estáticos del build de Angular (./browser) con MIME correctos, Cache-Control
 *     por tipo, gzip on-the-fly solo para texto y soporte de Range (206) para video/seeking.
 *   - Baseline de hardening en TODA respuesta (HSTS, nosniff, X-Frame, Referrer, Permissions).
 *     SIN CSP (decisión #4: no arriesgar romper videos/fuentes self-hosted).
 *
 * Solo usa módulos nativos de Node — ninguna dependencia externa.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// --- Raíz estática ---------------------------------------------------------
// En el App Service el artefacto se despliega como ./browser junto a server.js.
// En local (tras `npm run build`) el output vive en dist/mirabolante/browser.
const CANDIDATE_ROOTS = [
  path.join(__dirname, 'browser'),
  path.join(__dirname, 'dist', 'mirabolante', 'browser'),
];
const ROOT = CANDIDATE_ROOTS.find((p) => fs.existsSync(path.join(p, 'index.html')))
  || CANDIDATE_ROOTS[0];

const PORT = process.env.PORT || 8080;
const INDEX_FILE = path.join(ROOT, 'index.html');

// index.html cacheado en memoria (ruta caliente del SPA fallback).
let INDEX_HTML = null;
try {
  INDEX_HTML = fs.readFileSync(INDEX_FILE);
} catch {
  // Si aún no existe al arrancar, se reintenta leer en cada request.
}

// --- MIME types ------------------------------------------------------------
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.map': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ogv': 'video/ogg',
  '.mov': 'video/quicktime',
  '.wasm': 'application/wasm',
};

// Tipos de texto que vale la pena comprimir con gzip on-the-fly.
const GZIPPABLE = new Set([
  '.html', '.js', '.mjs', '.css', '.json', '.webmanifest', '.map', '.svg', '.txt', '.xml',
]);

// --- SPA fallback exclude (réplica EXACTA de staticwebapp.config.json) ------
// Asset/medios faltantes -> 404 real; ruta sin extensión -> index.html 200.
const EXCLUDE_EXT = new Set([
  '.css', '.js', '.json', '.ico', '.svg', '.png', '.jpg', '.jpeg', '.webp',
]);
const EXCLUDE_PREFIX = ['/images/', '/videos/'];

function isExcludedFromFallback(pathname, ext) {
  if (EXCLUDE_EXT.has(ext)) return true;
  return EXCLUDE_PREFIX.some((prefix) => pathname.startsWith(prefix));
}

// --- Hardening headers (decisión #4: baseline, SIN CSP) --------------------
function setSecurityHeaders(res) {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
}

// --- Cache-Control por tipo ------------------------------------------------
function cacheControlFor(ext, isIndex) {
  if (isIndex || ext === '.html') return 'no-cache';
  // Hashed JS/CSS (outputHashing: all) y fuentes -> immutable, 1 año.
  if (ext === '.js' || ext === '.mjs' || ext === '.css'
      || ext === '.woff2' || ext === '.woff' || ext === '.ttf') {
    return 'public, max-age=31536000, immutable';
  }
  // Imágenes / videos (en public/, sin hash) -> 1 día.
  return 'public, max-age=86400';
}

function endText(req, res, status, body) {
  setSecurityHeaders(res);
  res.statusCode = status;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');
  res.end(req.method === 'HEAD' ? undefined : body);
}

function send404(req, res) {
  endText(req, res, 404, 'Not Found');
}

// Sirve index.html con 200 (SPA fallback).
function serveIndex(req, res) {
  let body = INDEX_HTML;
  if (!body) {
    try {
      body = fs.readFileSync(INDEX_FILE);
      INDEX_HTML = body;
    } catch {
      return send404(req, res);
    }
  }
  setSecurityHeaders(res);
  res.statusCode = 200;
  res.setHeader('Content-Type', MIME['.html']);
  res.setHeader('Cache-Control', 'no-cache');

  if (/\bgzip\b/.test(req.headers['accept-encoding'] || '')) {
    const gz = zlib.gzipSync(body);
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Vary', 'Accept-Encoding');
    res.setHeader('Content-Length', gz.length);
    res.end(req.method === 'HEAD' ? undefined : gz);
  } else {
    res.setHeader('Content-Length', body.length);
    res.end(req.method === 'HEAD' ? undefined : body);
  }
}

// Sirve un archivo existente: gzip (texto) o Range/stream (binario).
function serveFile(req, res, filePath, stat, ext, isIndex) {
  setSecurityHeaders(res);
  res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream');
  res.setHeader('Cache-Control', cacheControlFor(ext, isIndex));

  const acceptsGzip = /\bgzip\b/.test(req.headers['accept-encoding'] || '');

  // Texto comprimible: gzip completo en memoria (los .js/.css/.html son pequeños).
  if (GZIPPABLE.has(ext) && acceptsGzip) {
    fs.readFile(filePath, (err, buf) => {
      if (err) return send404(req, res);
      const gz = zlib.gzipSync(buf);
      res.statusCode = 200;
      res.setHeader('Content-Encoding', 'gzip');
      res.setHeader('Vary', 'Accept-Encoding');
      res.setHeader('Content-Length', gz.length);
      res.end(req.method === 'HEAD' ? undefined : gz);
    });
    return;
  }

  // Binario (o texto sin gzip): Accept-Ranges + soporte de Range para video (206).
  res.setHeader('Accept-Ranges', 'bytes');
  const total = stat.size;
  const range = req.headers['range'];
  const m = range && /^bytes=(\d*)-(\d*)$/.exec(range);

  if (m) {
    let start = m[1] === '' ? null : parseInt(m[1], 10);
    let end = m[2] === '' ? null : parseInt(m[2], 10);
    if (start === null) {
      // Sufijo: últimos N bytes.
      start = Math.max(0, total - (end || 0));
      end = total - 1;
    } else if (end === null || end >= total) {
      end = total - 1;
    }
    if (Number.isNaN(start) || Number.isNaN(end) || start > end || start >= total) {
      setSecurityHeaders(res);
      res.statusCode = 416;
      res.setHeader('Content-Range', `bytes */${total}`);
      res.end();
      return;
    }
    res.statusCode = 206;
    res.setHeader('Content-Range', `bytes ${start}-${end}/${total}`);
    res.setHeader('Content-Length', end - start + 1);
    if (req.method === 'HEAD') return res.end();
    const stream = fs.createReadStream(filePath, { start, end });
    stream.on('error', () => res.destroy());
    stream.pipe(res);
    return;
  }

  res.statusCode = 200;
  res.setHeader('Content-Length', total);
  if (req.method === 'HEAD') return res.end();
  const stream = fs.createReadStream(filePath);
  stream.on('error', () => res.destroy());
  stream.pipe(res);
}

// --- Request handler -------------------------------------------------------
const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    setSecurityHeaders(res);
    res.statusCode = 405;
    res.setHeader('Allow', 'GET, HEAD');
    res.end('Method Not Allowed');
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    return send404(req, res);
  }

  if (pathname === '/' || pathname === '') {
    return serveIndex(req, res);
  }

  // Normalizar y resolver dentro de ROOT (defensa contra path traversal).
  const safeRel = path.posix.normalize(pathname).replace(/^(\.\.(\/|$))+/, '').replace(/^\/+/, '');
  const filePath = path.resolve(ROOT, safeRel);
  if (filePath !== ROOT && !filePath.startsWith(ROOT + path.sep)) {
    return send404(req, res);
  }

  const ext = path.extname(pathname).toLowerCase();

  fs.stat(filePath, (err, stat) => {
    if (!err && stat.isFile()) {
      const isIndex = filePath === path.resolve(INDEX_FILE);
      return serveFile(req, res, filePath, stat, ext, isIndex);
    }
    // No existe (o es directorio): SPA fallback, salvo que el exclude lo prohíba.
    if (isExcludedFromFallback(pathname, ext)) {
      return send404(req, res);
    }
    return serveIndex(req, res);
  });
});

server.listen(PORT, () => {
  console.log(`mirabolante-web server listening on :${PORT} (root: ${ROOT})`);
});
