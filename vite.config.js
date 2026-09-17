import process from 'node:process';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const configuredUrl = env.VITE_SITE_URL || process.env.URL || '';
  const siteUrl = configuredUrl ? new URL(configuredUrl).origin : '';

  return {
    define: { 'import.meta.env.VITE_SITE_URL': JSON.stringify(siteUrl) },
    plugins: [
      react(),
      {
        name: 'portfolio-metadata',
        transformIndexHtml(html) {
          if (!siteUrl) return html;
          return {
            html: html.replaceAll('content="/images/social-preview.png"', `content="${siteUrl}/images/social-preview.png"`),
            tags: [
              { tag: 'link', attrs: { rel: 'canonical', href: `${siteUrl}/` }, injectTo: 'head' },
              { tag: 'meta', attrs: { property: 'og:url', content: `${siteUrl}/` }, injectTo: 'head' },
            ],
          };
        },
        generateBundle() {
          this.emitFile({
            type: 'asset', fileName: 'robots.txt',
            source: `User-agent: *\nAllow: /\n${siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml\n` : ''}`,
          });
          if (siteUrl) this.emitFile({
            type: 'asset', fileName: 'sitemap.xml',
            source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${siteUrl}/</loc></url></urlset>\n`,
          });
        },
      },
      VitePWA({
        registerType: 'autoUpdate',
        manifest: false,
        workbox: {
          cacheId: 'sneha-portfolio',
          cleanupOutdatedCaches: true,
          globPatterns: ['**/*.{js,css,html,ico,png,svg,pdf,woff2,txt}'],
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        },
      }),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'motion-vendor': ['framer-motion', 'gsap', 'lenis'],
          },
        },
      },
    },
  };
});
