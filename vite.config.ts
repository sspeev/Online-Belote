import { defineConfig } from 'vitest/config'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { resolve } from 'node:path'

export default defineConfig(({ command }) => {
  const isDevelopment = command === 'serve'

  return {
    plugins: [
      tanstackRouter({ autoCodeSplitting: true }),
      viteReact(),
      tailwindcss(),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      css: true,
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
      // Only proxy API requests in dev — avoids CORS without needing an absolute URL.
      // In production, VITE_API_URL is set to the deployed backend and used directly.
      ...(isDevelopment && {
        proxy: {
          '/api': {
            target: 'http://localhost:8081',
            changeOrigin: true,
            secure: false,
          },
          '/beloteHub': {
            target: 'http://localhost:8081',
            changeOrigin: true,
            secure: false,
            ws: true, // WebSocket proxying for SignalR
          },
        },
      }),
    },
  }
})
