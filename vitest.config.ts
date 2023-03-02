import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    globals: true,
    include: ['__tests__/**/tokenize.{spec,test}.{ts,tsx,js}']
  },
})
