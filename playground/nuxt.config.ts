export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },

  applicationinsights: {
    connectionString: 'InstrumentationKey=f629321d-170e-4630-85d3-09908821ab5a;IngestionEndpoint=https://francecentral-1.in.applicationinsights.azure.com/;LiveEndpoint=https://francecentral.livediagnostics.monitor.azure.com/'

  },

  runtimeConfig:{
    public: {
      applicationinsights: {
        connectionString: ''
      }
    }
  },

  compatibilityDate: '2024-09-30'
})