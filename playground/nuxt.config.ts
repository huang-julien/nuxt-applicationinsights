export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  runtimeConfig:{
    public: {
      applicationinsights: {
        connectionString: ''
      }
    }
  }
})
