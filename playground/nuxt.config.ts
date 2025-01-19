export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  runtimeConfig:{
      applicationinsights: {
        connectionString: ''
      }
  },

  compatibilityDate: '2024-09-30'
})