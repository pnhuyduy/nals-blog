import path from 'path'
import { defineConfig } from 'vite'
import { createVuePlugin as Vue2 } from 'vite-plugin-vue2'
import WindiCSS from 'vite-plugin-windicss'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import { VitePWA } from 'vite-plugin-pwa'

const config = defineConfig({
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src')}`,
    },
    dedupe: ['vue-demi'],
  },

  build: {
    minify: true,
  },

  plugins: [
    Vue2(),
    WindiCSS(),
    Components({
      resolvers: [
        IconsResolver({
          componentPrefix: '',
        }),
      ],
      dts: 'src/components.d.ts',
    }),
    Icons(),
    AutoImport({
      imports: ['@vue/composition-api', '@vueuse/core'],
      dts: 'src/auto-imports.d.ts',
    }),
    VitePWA({
      includeAssets: ['favicon.ico'],
      registerType: 'autoUpdate',
      manifest: {
        name: 'Nal Blog',
        short_name: 'NalBlog',
        description: 'Tech Blog',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: ['assets/*', '**.{js,css,html}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api-placeholder\.herokuapp\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],

  server: {
    port: 3333,
  },
})

export default config
