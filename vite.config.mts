import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@src': path.resolve(__dirname, './src/'),
    },
  },
  test: {
    fileParallelism: false,
    coverage: {
      provider: 'istanbul',
      exclude: ['build', 'tests', 'copyPrismaSchema.mjs'],
    },
    globals: true,
  },
})
