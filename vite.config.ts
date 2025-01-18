/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: '**/*.svg?react',
    }),
  ],
  resolve: {
    alias: {
      app: '/src/app',
      api: '/src/shared/api',
      assets: '/src/shared/assets',
      context: '/src/app/context',
      entities: '/src/entities',
      features: '/src/features/',
      helpers: '/src/shared/helpers',
      pages: '/src/pages',
      shared: '/src/shared',
      tests: '/src/tests',
      types: '/src/shared/types',
      utils: '/src/shared/utils',
      widgets: '/src/widgets',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
})
