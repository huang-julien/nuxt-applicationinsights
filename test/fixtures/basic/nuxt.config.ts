
export default defineNuxtConfig({
  modules: [
    'nuxt-applicationinsights',
  ],

  runtimeConfig: {
    applicationinsights: {
      connectionString: 'InstrumentationKey=00000000-0000-0000-0000-000000000000;'
    },
  },

  compatibilityDate: '2024-08-07'
})