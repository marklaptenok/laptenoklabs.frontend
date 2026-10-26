# Deploying the site

The server and the site ship together in one image. There is no object storage, no credentials at
runtime and no `bun install` at boot: `server/index.ts` has no dependencies and reads the pages
from `/app/site` inside the image.

A deploy is therefore atomic — code and content land together, or neither does. The failure of
2026-10-23, where the server was healthy and every page returned 404 because the bucket was
unreachable, cannot happen in this shape.

## Steps

```sh
bun run build                     # on the FreeBSD host, as always
bun run test:server               # 32 checks against the built dist/
bun run deploy:context            # assembles ../laptenoklabs.deploy
```

Then publish it, by one of the routes below.

## Publishing without a Linux host

The Railway CLI has no FreeBSD build, so `railway up` cannot run on the host. It does not have to:
Railway deploys a service from **a GitHub repository**, from a registry image, or from
`railway up`. The first needs nothing but `git`.

### The deploy branch (recommended, FreeBSD only)

```sh
bun run build && bun run test:server
sh deploy/push.sh              # builds the branch
sh deploy/push.sh --push       # builds and pushes it
```

`deploy/push.sh` assembles the context, writes it as a **single orphan commit** on the `deploy`
branch — no parent, so the branch never accumulates history despite carrying 13 MB — and leaves it
for you to push. Point the Railway service at this repository, branch `deploy`, builder Dockerfile.

The commit message records which source commit it was built from, so a running deploy can always
be traced back: `Site built from b9a0631 on 2026-10-25 22:30 UTC`.

`main` keeps ignoring `dist/`. Nothing from `src/`, `node_modules/` or `ai.data/` reaches the
branch — the script stages only the assembled context, and that is asserted before every push.

### `railway up` from the deployer VM

Still available, and unchanged:

```sh
cd <context> && railway up --ci --service <service-name>
```

The context must be reachable from that VM; mount it read-only the way the Bigologn bundles are.

### Two more routes, for the record

- **Build the CLI on FreeBSD.** It is the `railwayapp` crate on crates.io, MIT. `cargo install
  railwayapp` may well work natively; nobody has tried it here. If it does, the VM stops being
  necessary at all.
- **A registry image.** Needs `docker build`, which FreeBSD has not got, so it would mean building
  in CI — more moving parts than the deploy branch, for no gain here.

## Why the context is assembled instead of deploying the repo

`railway up` skips everything `.gitignore` lists, and this repo ignores `dist/` — deploying the
repo directly would ship a server with no site. `--no-gitignore` would fix that and also upload
`ai.data/`, which must never leave the machine.

So `deploy/make.sh` copies exactly three things into a directory of its own: the `Dockerfile`,
`server/index.ts`, and the built pages **renamed to `site/`**. The rename is deliberate: no
`.gitignore` anywhere can match `site/`, so the content cannot be silently dropped again.

The script refuses to run if `dist/` is older than `src/`, for the same reason `verify.py` does.

## Service settings

| setting | value |
| --- | --- |
| builder | Dockerfile (it is at the context root) |
| healthcheck path | `/healthz` |
| `PORT` | injected by Railway; the server reads it |
| `SITE_ROOT` | set by the image, no need to configure |
| `MEMORY_LOG` | `off` to silence the five-minute line |

## What the old setup was

`ai.data/index.tsx` — a Railway Function that streamed the pages from an S3 bucket. Keep it until
this service is live, then retire it: the bucket, its credentials and the Function all stop being
part of the site.
