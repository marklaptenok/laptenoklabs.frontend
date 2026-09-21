// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";
import {
    defineConfig,
    fontProviders
} from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import { existsSync, readFileSync, readdirSync } from "node:fs";

import icon from "astro-icon";

const locales = ["en", "ru"];
const defaultLocale = "en";

const hasArticles = (locale) =>
    existsSync(`src/content/articles/${locale}`) &&
    readdirSync(`src/content/articles/${locale}`).some((file) => /\.mdx?$/.test(file));

const emptyListings = locales
    .filter((locale) => !hasArticles(locale))
    .map((locale) => `/${locale}/articles`);

const buildDate = new Date().toISOString().slice(0, 10);

const contentDates = () => {
    const dates = new Map();
    for (const collection of ["projects", "legal"]) {
        for (const locale of locales) {
            const dir = `src/content/${collection}/${locale}`;
            if (!existsSync(dir)) continue;
            for (const file of readdirSync(dir)) {
                if (!/\.mdx?$/.test(file)) continue;
                const text = readFileSync(`${dir}/${file}`, "utf8");
                const updated = text.match(/^updatedDate:\s*(\S+)/m);
                const published = text.match(/^pubDate:\s*(\S+)/m);
                const url = text.match(/^url:\s*(\S+)/m);
                const slug = file.replace(/\.mdx?$/, "");
                const path = url ? `/${locale}${url[1]}` : `/${locale}/${collection === "legal" ? slug : `projects/${slug}`}`;
                dates.set(path, (updated?.[1] ?? published?.[1] ?? buildDate).slice(0, 10));
            }
        }
    }
    return dates;
};

const lastmod = contentDates();

// https://astro.build/config
export default defineConfig({
    site: "https://laptenoklabs.com",
    base: "/",
    integrations: [
        mdx(),
        sitemap({
            filter: (page) => {
                const path = new URL(page).pathname;
                return path !== "/" && !emptyListings.includes(path);
            },
            serialize: (item) => ({
                ...item,
                lastmod: lastmod.get(new URL(item.url).pathname) ?? buildDate,
            }),
            i18n: {
                defaultLocale,
                locales: { en: "en", ru: "ru" },
            },
        }),
        pagefind(),
        icon(),
    ],
    trailingSlash: 'never',

    build: {
        inlineStylesheets: 'always',
    },

    i18n: {
        locales,
        defaultLocale,
        routing: {
            prefixDefaultLocale: true,
            redirectToDefaultLocale: false,
        },
    },

    vite: {
        plugins: [tailwindcss()],
        server: {
            watch: {
                usePolling: true,
                interval: 1000,
            }
        },
    },
    fonts: [{
        provider: fontProviders.google(),
        name: "Cormorant",
        cssVariable: "--font-main",
        styles: ["normal"],
        subsets: ["latin", "cyrillic"],
    },
    {
        provider: fontProviders.google(),
        name: "Jura",
        cssVariable: "--font-header",
        styles: ["normal"],
        subsets: ["latin", "cyrillic"],
    },
    {
        provider: fontProviders.local(),
        name: "Matias",
        cssVariable: "--font-title",
        fallbacks: ["Jura", "serif"],
        options: {
            variants: [{
                weight: 400,
                style: "normal",
                src: ["./src/assets/fonts/Matias.woff2"],
            }],
        },
    }],
});
