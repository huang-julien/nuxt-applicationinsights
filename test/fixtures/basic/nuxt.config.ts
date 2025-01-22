export default defineNuxtConfig({
  modules: [
    '../../../src/module'
  ],
  runtimeConfig: {
    applicationinsights: {
      connectionString: 'InstrumentationKey=00000000-0000-0000-0000-000000000000;'
    },
  },
  compatibilityDate: '2025-01-18',
  experimental: {
    asyncContext: true
  }
})