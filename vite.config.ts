import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const resolveEntryForPkg = (p) =>
  path.resolve(fileURLToPath(import.meta.url), `../src/${p}/index.ts`)

const entries = {
  '@src/icons': resolveEntryForPkg('icons'),
}

export default defineConfig({
  resolve: {
    alias: entries
  },
  plugins: [react(),
  UnoCSS({
    presets: [
      presetAttributify({ /* preset options */ }),
      presetUno(),
    ],
  })],
})
