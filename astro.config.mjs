// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://bmartinez.dev',
  // Static by default; the Cloudflare adapter lets individual routes opt into
  // on-demand (Worker) rendering with `export const prerender = false`.
  // Today that is only src/pages/api/contact.ts — every page stays static.
  output: 'static',
  adapter: cloudflare(),
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      // English at "/", Spanish at "/es/". No prefix on the default locale.
      prefixDefaultLocale: false,
    },
  },
});
