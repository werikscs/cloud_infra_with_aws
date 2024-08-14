import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    fileParallelism: false,
    coverage: {
      provider: 'istanbul',
      exclude: ['build', 'tests', 'copyPrismaSchema.js'],
    },
    globals: true,
  },
})
