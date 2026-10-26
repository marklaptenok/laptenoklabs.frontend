# Deploying the site

The server and the site ship together in one image. There is no object storage, no credentials at
runtime and no `bun install` at boot: `server/index.ts` has no dependencies and reads the pages
from `/app/site` inside the image.

A deploy is therefore atomic — code and content land together, or neither does. The failure of
2026-10-23, where the server was healthy and every page returned 404 because the bucket was
unreachable, cannot happen in this shape.

## The routine deploy

```sh
bun run build                  # bun is not on PATH: /home/marklaptenok/.bun/bin/bun
python3 ai.data/tools/verify.py
bun run test:server            # 32 checks against the built dist/
sh deploy/push.sh              # rebuilds the deploy branch
git push -f origin deploy      # Railway builds and deploys it
```

**Force, every time.** `push.sh` writes a fresh parentless commit, so every push after the first is
a non-fast-forward by design. In VS Code that is **Push (Force)** on the `deploy` branch. Nothing
is lost: the branch is a publishing surface, not a history — `main` holds the sources.

Switch back to `main` afterwards if you ever check `deploy` out. That branch has no `src/`, so a
build is impossible while it is the working tree.

## First-time setup on Railway

Done once, 2026-10-26. Recorded here because none of it is discoverable from the repository.

### 1. The Railway GitHub App

Railway reads the branch through a **GitHub App installation**, which is separate from signing in
to Railway with GitHub. The App has to be installed on the account that owns the repository and
granted access to this repository specifically. Until it is, the dashboard cannot list branches at
all — the symptom is *"Railway could not load branches"*, with no indication of the cause.

The documented checks, if branches do not appear: the App's repository access in GitHub's
installation settings (`github.com/settings/installations`), a **pending permission update**
awaiting approval there, a cache refresh through **Add → GitHub Repository → Refresh**, then
disconnect and reconnect the repository in the service settings.

Auto-deploy also requires at least one project member whose connected GitHub account has
contributor access to the repository.

### 2. The service

`+ New` → **GitHub Repo** → `laptenoklabs.frontend`, in the project that already serves the site,
so the old service keeps answering while the new one is tested.

Railway points a new service at the repository's **default branch, `main`** — which is the wrong
one. `main` carries no `site/` and no Dockerfile at its root, so that first build fails or produces
a server with no pages. Harmless, but do not wait for it: set the source first.

### 3. Settings

| section | setting | value |
| --- | --- | --- |
| Source | branch | **`deploy`** |
| Source | root directory | `/` |
| Source | watch paths | *empty* — every commit on `deploy` is a whole new site |
| Build | builder | **Dockerfile**, path `Dockerfile` (override Railpack if offered) |
| Deploy | healthcheck path | `/healthz` |
| Deploy | restart policy | on failure |
| Variables | — | **none required** |

`PORT` is injected by Railway and the server reads it; `SITE_ROOT=/app/site` is baked into the
image. `MEMORY_LOG=off` silences the five-minute memory line — leave it on until there are 7- and
14-day samples to judge the growth curve against.

### 4. Read the boot log

The build log should show only `COPY server/index.ts` and `COPY site`. The container then prints:

```json
{"tag":"ready","port":…,"root":"/app/site","files":85}
{"tag":"memory","reason":"boot","rss_mb":…,"files":85}
```

**`files: 85`** is the check that matters — that is how many files the branch carries under `site/`.
A smaller number means the image did not get the whole site.

## Verifying a deploy

```sh
sh ai.data/tools/live.sh https://<service>.up.railway.app     # 46 checks
sh ai.data/tools/timing.sh                                    # against the live domains
```

That is the table below, automated. Run it against the service's own `*.up.railway.app` domain
before any domain is moved:

| request | expected |
| --- | --- |
| `/healthz` | `200 ok` |
| `/` | 302 → `/en` |
| `/en` | 200, HTML, `ETag`, `Content-Length`, `Cache-Control: public, max-age=0, must-revalidate` |
| `/en/`, `/en/team/` | 301 to the path without the slash |
| `/en` + matching `If-None-Match` | **304**; a wrong ETag gives 200 |
| `/en` + `If-Modified-Since` | **304** |
| `HEAD /en` | 200, **empty body**, `Content-Length` kept |
| `/nowhere` | 404 carrying the real 404 page, with `Content-Length` |
| `POST /en` | **405**, `Allow: GET, HEAD` |
| `/_astro/…` | `Cache-Control: public, max-age=31536000, immutable` |
| headers | HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, CSP |
| CSP | contains **`'wasm-unsafe-eval'`** — Pagefind search dies silently without it |
| traversal | `/../package.json`, `/server/index.ts`, `/..%2f..%2fetc%2fpasswd` → 404 |

Then **run a search on the live page**, and check `/ru`, `/en/team`, `/en/faq`, `/en/privacy`,
`/robots.txt`, `/sitemap-index.xml`, `/llms.txt`, `/pagefind/pagefind.js`.

The feed is **per locale** — `/en/rss.xml` and `/ru/rss.xml`. There is no `/rss.xml`; a 404 there is
correct, in both the old shape and the new one.

## What the change bought

Measured 2026-10-26 from the FreeBSD host, DNS pinned out, 15 fresh connections per row. All three
hosts terminate on the same Railway edge (`69.46.46.x`) over HTTP/2, and the TLS handshake is
~100 ms everywhere — so the difference is the server, not the network.

| request | new service, median TTFB | old Function (`.com` / `.cz`) |
| --- | --- | --- |
| `/en` | **176 ms** | 1290 / 943 ms |
| `/ru/team` | **158 ms** | 991 / 1228 ms |
| `/en`, matching ETag → 304 | **147 ms** | 636 / 568 ms |
| `/healthz` | **157 ms** | 706 / 695 ms, and a 404 |

Five to eight times faster to first byte on pages, 4.3× on revalidation — and revalidation is the
request a returning visitor makes on every page. The spread collapses too: p90 on `/ru/team` is
167 ms against 1130 ms, because there is no second network hop left to go slow.

The old Function spent 0.8–1.1 s fetching each page from S3 before it could answer, and paid a
round trip even to confirm nothing had changed. `/healthz` on the old shape is that in miniature:
~900 ms and 104 KB to answer a request it has no route for.

*(`*.up.railway.app` resolves slowly and sometimes fails from this host — 24–56 ms against 9 ms for
the custom domains, with outright resolver failures. It is local, not Railway, and it disappears
once the custom domains point at the service.)*

## Moving the domains

The only step with downtime, so it goes last. A custom domain can be attached to **one service at a
time**: remove `laptenoklabs.com`, `www.laptenoklabs.com` and `laptenoklabs.cz` from the old
service, add them to the new one, then **update each CNAME** to Railway's new per-domain target. The
certificate issues only after DNS resolves — allow minutes, not seconds, per domain.

**Check `status.railway.com` first.** On 2026-10-26 a *TLS Certificate Issuance Rate Limit* incident
was open; moving a domain during one means detaching it from a working service and possibly not
getting a certificate on the new one, with the fix outside your control.

Afterwards, re-run the checks above against the real domains, including the `www` → apex redirect,
which cannot be tested on a `*.up.railway.app` name.

## Retiring the old stack

Once the live domains are green on the new service: delete the Function service, then the bucket and
its credentials. That removes `run.sh`, the ast-grep import scan, the generated `package.json`, the
floating `hono` pin and the S3 client from the site entirely. `ai.data/index.tsx` stays as the
record of what it was.

## Why the context is assembled instead of deploying the repo

`railway up` skips everything `.gitignore` lists, and this repo ignores `dist/` — deploying the
repo directly would ship a server with no site. `--no-gitignore` would fix that and also upload
`ai.data/`, which must never leave the machine.

So `deploy/make.sh` copies exactly three things into a directory of its own: the `Dockerfile`,
`server/index.ts`, and the built pages **renamed to `site/`**. The rename is deliberate: no
`.gitignore` anywhere can match `site/`, so the content cannot be silently dropped again.

The script refuses to run if `dist/` is older than `src/`, for the same reason `verify.py` does.

`deploy/push.sh` stages only that assembled context, through a scratch index of its own, so nothing
from `src/`, `node_modules/` or `ai.data/` can reach the branch. The commit message records the
source commit, so a running deploy is always traceable: `Site built from c7c8d0d on 2026-10-26
16:14 UTC`.

The repository is public, and so is the `deploy` branch: the built pages, the Dockerfile and the
server source. All three are public in effect anyway — but it means **a credential must never enter
the deploy context**, which is why `make.sh` copies three named paths and not a directory.

## The other publishing routes

Kept for the record; the deploy branch needs no Railway token at all, which is why it is preferred.

### `railway up` from the deployer VM

```sh
cd <context> && railway up --ci --service <service-name>
```

The context must be reachable from that VM; mount it read-only the way the Bigologn bundles are.
The VM exists because deploy tokens live only there — not because of the CLI's platform support,
since its static musl build runs on the host under the Linuxulator.

### Not worth it here

- **A GitHub Action running `railway up`.** It needs `RAILWAY_TOKEN` stored in GitHub, which would
  let anyone who can land a workflow in a public repository replace the running site.
- **A registry image.** Needs `docker build`, which FreeBSD has not got, so it would mean building
  in CI — more moving parts, for no gain over the branch.
