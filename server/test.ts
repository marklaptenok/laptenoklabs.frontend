const PORT = 3399;
const BASE = `http://127.0.0.1:${PORT}`;

const proc = Bun.spawn(["bun", "run", "server/index.ts"], {
  env: { ...process.env, PORT: String(PORT), SITE_ROOT: "./dist", MEMORY_LOG: "off" },
  stdout: "pipe",
  stderr: "inherit",
});

for (let i = 0; i < 100; i++) {
  try {
    await fetch(`${BASE}/healthz`, { signal: AbortSignal.timeout(300) });
    break;
  } catch {
    await Bun.sleep(100);
  }
}

let pass = 0;
const failures: string[] = [];
const check = (ok: boolean, label: string, detail = "") => {
  if (ok) pass++;
  else failures.push(`${label}${detail ? "   " + detail : ""}`);
};

const get = (path: string, init?: RequestInit) =>
  fetch(`${BASE}${path}`, { redirect: "manual", ...init });

const home = await get("/en");
check(home.status === 200, "/en is served", `${home.status}`);
const body = await home.text();
check(body.includes("Communication among computer systems"), "/en carries the real page");
check(home.headers.get("content-type") === "text/html; charset=utf-8", "html content type");
check(home.headers.get("cache-control") === "public, max-age=0, must-revalidate", "html revalidates");
check(home.headers.get("content-length") === String(Buffer.byteLength(body)), "content-length is exact",
      `${home.headers.get("content-length")} vs ${Buffer.byteLength(body)}`);
check(home.headers.get("strict-transport-security")?.startsWith("max-age=") === true, "HSTS set");
check(home.headers.get("content-security-policy")?.includes("wasm-unsafe-eval") === true, "CSP allows pagefind wasm");
check(home.headers.get("x-content-type-options") === "nosniff", "nosniff set");
check(home.headers.get("access-control-allow-origin") === null, "no CORS wildcard");

const etag = home.headers.get("etag")!;
check(/^"[0-9a-f]+-[0-9a-f]+"$/.test(etag), "etag is quoted and derived from size+mtime", etag);
const revalidated = await get("/en", { headers: { "If-None-Match": etag } });
check(revalidated.status === 304, "matching etag gets 304", `${revalidated.status}`);
const stale = await get("/en", { headers: { "If-None-Match": '"nope"' } });
check(stale.status === 200, "stale etag gets the page", `${stale.status}`);
const since = await get("/en", { headers: { "If-Modified-Since": home.headers.get("last-modified")! } });
check(since.status === 304, "unchanged since gets 304", `${since.status}`);

const head = await get("/en", { method: "HEAD" });
check(head.status === 200 && (await head.text()) === "", "HEAD has no body");
check(head.headers.get("content-length") === String(Buffer.byteLength(body)), "HEAD reports the full size");

const root = await get("/");
check(root.status === 302 && root.headers.get("location") === "/en", "/ redirects to /en",
      `${root.status} ${root.headers.get("location")}`);
const slash = await get("/en/");
check(slash.status === 301 && slash.headers.get("location") === "/en", "trailing slash is stripped",
      `${slash.status} ${slash.headers.get("location")}`);
const www = await fetch(`${BASE}/en`, { redirect: "manual", headers: { Host: "www.laptenoklabs.com" } });
check(www.status === 200 || www.status === 301, "www host handled", `${www.status}`);

const missing = await get("/no/such/page");
check(missing.status === 404, "missing path is 404", `${missing.status}`);
const missingBody = await missing.text();
check(missingBody.includes("Page not found") || missingBody.includes("not exist"),
      "404 serves the styled page", `${missingBody.length} bytes`);
const missingHead = await get("/no/such/page", { method: "HEAD" });
check(missingHead.status === 404 && (await missingHead.text()) === "", "HEAD on a miss has no body");

const asset = await get("/favicon.svg");
check(asset.status === 200 && asset.headers.get("content-type") === "image/svg+xml", "svg served");
const hashed = (body.match(/\/_astro\/[^"]+\.woff2/) ?? [])[0];
if (hashed) {
  const font = await get(hashed);
  check(font.headers.get("cache-control") === "public, max-age=31536000, immutable", "hashed assets immutable");
  check(font.headers.get("content-type") === "font/woff2", "woff2 content type");
}
const robots = await get("/robots.txt");
check(robots.status === 200 && robots.headers.get("content-type") === "text/plain; charset=utf-8", "robots.txt served");
check(robots.headers.get("cache-control") === "public, max-age=3600", "robots.txt cached an hour");

for (const attack of ["/../package.json", "/en/../../package.json", "/%2e%2e/package.json", "/./../../.env"]) {
  const r = await get(attack);
  const text = await r.text();
  check(r.status === 404 || !text.includes('"name"'), `traversal blocked: ${attack}`, `${r.status}`);
}

const post = await get("/en", { method: "POST" });
check(post.status === 405, "POST is refused", `${post.status}`);

const healthz = await get("/healthz");
check(healthz.status === 200, "healthz answers", `${healthz.status}`);

proc.kill();
console.log(`${pass}/${pass + failures.length} static server checks passed`);
for (const f of failures) console.log(`  FAIL ${f}`);
if (failures.length) process.exit(1);
