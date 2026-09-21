// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";
import {
    defineConfig,
    fontProviders
} from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import { existsSync, readdirSync } from "node:fs";

import icon from "astro-icon";

const locales = ["en", "ru"];
const defaultLocale = "en";

const hasArticles = (locale) =>
    existsSync(`src/content/articles/${locale}`) &&
    readdirSync(`src/content/articles/${locale}`).some((file) => /\.mdx?$/.test(file));

const emptyListings = locales
    .filter((locale) => !hasArticles(locale))
    .map((locale) => `/${locale}/articles`);

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
