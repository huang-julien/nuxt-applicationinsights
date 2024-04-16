export default defineNuxtConfig({
  modules: ['../src/module'],
  myModule: {},
  devtools: { enabled: true },
  runtimeConfig:{
    public: {
      applicationinsights: {
        connectionString: ''
      }
    }
  }
})
