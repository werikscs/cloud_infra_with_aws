import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul',
      exclude: ['build'],
    },
    globals: true,
  },
})
