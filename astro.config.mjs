// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";
import {
    defineConfig,
    fontProviders
} from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
    site: "https://laptenoklabs.com",
    base: "/",
    integrations: [mdx(), sitemap(), pagefind(), icon()],
    trailingSlash: 'never',
    vite: {
        plugins: [tailwindcss()],
    },
    fonts: [{
        provider: fontProviders.google(),
        name: "Cormorant",
        cssVariable: "--font-main",
        styles: ["normal"],
    }],
});