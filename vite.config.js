import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

export default defineConfig({
  // For GitHub Pages deployment (set by workflow) or local dev
  base: process.env.BASE_PATH || '/',
  plugins: [
    react(),
    tsconfigPaths()
  ],
  resolve: {
    alias: {
      '@framework': path.resolve(__dirname, './src/_framework'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5153,
  },
})