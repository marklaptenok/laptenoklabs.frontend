# laptenoklabs.frontend

The personal website of Mark Laptenok — software engineer and engineering teacher in Pilsen,
Czech Republic. Built with Astro, published in English and Russian at
[laptenoklabs.com](https://laptenoklabs.com) and laptenoklabs.cz.

## Requirements

- Bun
- Astro 7

## Install & run

```sh
bun install      # install dependencies
bun run dev      # dev server on localhost:4321
bun run build    # production build into dist/
bun run preview  # serve the build locally
```

The output is static. `dist/` is deployed manually to Railway.

## Languages

Every page is prefixed by locale — `/en/...` and `/ru/...` — and `/` redirects to `/en`.

| Path | Purpose |
| --- | --- |
| `src/i18n/config.ts` | the locale list, default locale, and display names |
| `src/i18n/ui.ts` | every user-visible string, in both languages |
| `src/i18n/utils.ts` | translation lookup, locale-aware URLs, locale-filtered collections |

`en` is the reference in `ui.ts`, so a key missing from `ru` fails the type check rather than
falling back silently to English.

Adding a language: add it to `src/i18n/config.ts` and the `locales` array in `astro.config.mjs`,
fill in its column in `src/i18n/ui.ts`, create `src/content/*/<locale>/`, and add the matching
blocks to `.pages.yml`.

## Content

Markdown content lives in per-locale folders, so an entry id is `<locale>/<slug>`:

```
src/content/blog/en/2026-01-15-first-post.md
src/content/projects/ru/soft-engineer.md
```

Listings show only the current language; a section with no translations shows an empty state.
Pages, tag pages and RSS feeds are generated per locale, and the language switcher hides itself
when a page has no counterpart.

Frontmatter:

```md
---
title: "Post title"
description: "One-line summary."
pubDate: 2026-01-15
updatedDate: 2026-02-01
tags: [networks, rust]
heroImage: ../../../assets/blog-placeholder-3.png
---
```

`src/content/socials.yml` holds the footer links; `src/site-config.yml` holds the
language-independent settings (site title, timezone). Content is also editable through
[Pages CMS](https://pagescms.org), configured in `.pages.yml`.

## Fonts

Cormorant and Jura are fetched from Google Fonts at build time. Matias — used for the site title
in the header — is a local file at `src/assets/fonts/Matias.woff2`.

## Licence

Site content © Mark Laptenok. The underlying template is
[Astro Launchpad](https://github.com/roicort/launchpad) by Rodrigo Cortez, BSD 3-Clause; see
[LICENSE](./LICENSE).
