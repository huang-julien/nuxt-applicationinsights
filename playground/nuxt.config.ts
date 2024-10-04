export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  runtimeConfig:{
    public: {
      applicationinsights: {
        connectionString: ''
      }
    }
  },

  compatibilityDate: '2024-09-30'
})