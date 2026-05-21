import { defineConfig } from 'vitest/config'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { resolve } from 'node:path'

export default defineConfig(({ command }) => {
  const isProduction = command === 'serve'

  return {
    plugins: [
      tanstackRouter({ autoCodeSplitting: true }),
      viteReact(),
      tailwindcss(),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './tests/setup.ts',
      css: true,
      exclude: ['**/node_modules/**', '**/dist/**', '**/tests/e2e/**'],
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    server: {
      watch: {
        usePolling: true,
      },
      host: true,
      strictPort: true,
      port: 3000,
      proxy: {
        '/api': {
          target: 'https://localhost:7132',
          changeOrigin: true,
          secure: false,
          rejectUnauthorized: false,
        },
        '/beloteHub': {
          target: 'https://localhost:7132',
          changeOrigin: true,
          secure: false,
          rejectUnauthorized: false,
          ws: true,
        },
      },
    },
  }
})
