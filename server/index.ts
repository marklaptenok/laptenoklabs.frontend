const ROOT = Bun.env.SITE_ROOT ?? "./dist";
const PORT = Number(Bun.env.PORT ?? 3000);

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "media-src 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS: Record<string, string> = {
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()",
  "Content-Security-Policy": CSP,
};

const CONTENT_TYPES: Record<string, string> = {
  html: "text/html; charset=utf-8",
  js: "text/javascript; charset=utf-8",
  css: "text/css; charset=utf-8",
  json: "application/json; charset=utf-8",
  xml: "application/xml; charset=utf-8",
  txt: "text/plain; charset=utf-8",
  svg: "image/svg+xml",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  avif: "image/avif",
  ico: "image/x-icon",
  woff2: "font/woff2",
  pdf: "application/pdf",
  wasm: "application/wasm",
  pagefind: "application/octet-stream",
};

const IMMUTABLE = "public, max-age=31536000, immutable";
const REVALIDATE = "public, max-age=0, must-revalidate";
const SHORT = "public, max-age=3600";

function cacheControl(pathname: string) {
  if (pathname.startsWith("/_astro/")) return IMMUTABLE;
  if (pathname.startsWith("/pagefind/fragment/")) return IMMUTABLE;
  if (pathname.startsWith("/pagefind/index/")) return IMMUTABLE;
  if (pathname.endsWith(".pagefind")) return IMMUTABLE;
  if (pathname.endsWith(".html")) return REVALIDATE;
  return SHORT;
}

function contentType(pathname: string) {
  const extension = pathname.split(".").pop()?.toLowerCase() ?? "";
  return CONTENT_TYPES[extension] ?? "application/octet-stream";
}

type Entry = { file: string; size: number; etag: string; lastModified: string; type: string; cache: string };

const routes = new Map<string, Entry>();

async function index(dir: string, prefix = "") {
  const { readdir, stat } = await import("node:fs/promises");
  for (const name of await readdir(dir)) {
    const full = `${dir}/${name}`;
    const info = await stat(full);
    if (info.isDirectory()) {
      await index(full, `${prefix}/${name}`);
      continue;
    }
    const urlPath = `${prefix}/${name}`;
    routes.set(urlPath, {
      file: full,
      size: info.size,
      etag: `"${info.size.toString(16)}-${Math.round(info.mtimeMs).toString(16)}"`,
      lastModified: new Date(info.mtimeMs).toUTCString(),
      type: contentType(urlPath),
      cache: cacheControl(urlPath),
    });
  }
}

await index(ROOT);

const notFound = routes.get("/404.html");
const notFoundBody = notFound ? await Bun.file(notFound.file).text() : "Not Found";

const counters = { requests: 0, head: 0, notModified: 0, notFound: 0 };
const started = Date.now();

function logMemory(reason: string) {
  const m = process.memoryUsage();
  console.log(JSON.stringify({
    tag: "memory",
    reason,
    uptime_min: Math.round((Date.now() - started) / 60000),
    rss_mb: Math.round(m.rss / 1048576),
    heap_mb: Math.round(m.heapUsed / 1048576),
    external_mb: Math.round(m.external / 1048576),
    files: routes.size,
    ...counters,
  }));
}

function resolve(pathname: string) {
  return routes.get(pathname) ?? routes.get(`${pathname}/index.html`);
}

function respond(status: number, body: BodyInit | null, headers: Record<string, string>) {
  return new Response(body, { status, headers: { ...SECURITY_HEADERS, ...headers } });
}

const server = Bun.serve({
  port: PORT,
  idleTimeout: 30,
  fetch(request) {
    const url = new URL(request.url);
    const method = request.method;

    if (method !== "GET" && method !== "HEAD") {
      return respond(405, "Method Not Allowed", { Allow: "GET, HEAD", "Cache-Control": "no-store" });
    }

    if (url.hostname.startsWith("www.")) {
      url.hostname = url.hostname.slice(4);
      return respond(301, null, { Location: url.toString(), "Cache-Control": SHORT });
    }

    if (url.pathname !== "/" && url.pathname.endsWith("/")) {
      return respond(301, null, {
        Location: url.pathname.replace(/\/+$/, "") + url.search,
        "Cache-Control": SHORT,
      });
    }

    if (url.pathname === "/healthz") {
      return respond(200, "ok", { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" });
    }

    counters.requests++;
    if (method === "HEAD") counters.head++;

    if (url.pathname === "/") {
      return respond(302, null, { Location: "/en", "Cache-Control": SHORT });
    }

    const pathname = decodeURIComponent(url.pathname);
    const entry = resolve(pathname);

    if (!entry) {
      counters.notFound++;
      const headers = {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": REVALIDATE,
        "Content-Length": String(Buffer.byteLength(notFoundBody)),
      };
      return respond(404, method === "HEAD" ? null : notFoundBody, headers);
    }

    const headers: Record<string, string> = {
      "Content-Type": entry.type,
      "Cache-Control": entry.cache,
      ETag: entry.etag,
      "Last-Modified": entry.lastModified,
      "Content-Length": String(entry.size),
    };

    const ifNoneMatch = request.headers.get("if-none-match");
    const ifModifiedSince = request.headers.get("if-modified-since");
    const matches = ifNoneMatch?.split(",").some((tag) => tag.trim() === entry.etag);
    const unchanged =
      ifModifiedSince && Date.parse(entry.lastModified) <= Date.parse(ifModifiedSince) + 999;

    if (matches || (!ifNoneMatch && unchanged)) {
      counters.notModified++;
      return respond(304, null, { ETag: entry.etag, "Cache-Control": entry.cache });
    }

    if (method === "HEAD") return respond(200, null, headers);

    return respond(200, Bun.file(entry.file), headers);
  },
});

if (Bun.env.MEMORY_LOG !== "off") {
  logMemory("boot");
  const timer = setInterval(() => logMemory("interval"), Number(Bun.env.MEMORY_LOG_MS ?? 300000));
  timer.unref();
}

console.log(JSON.stringify({ tag: "ready", port: server.port, root: ROOT, files: routes.size }));
