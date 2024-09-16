export default defineNuxtConfig({
    modules: ['nuxt-applicationinsights'],
    imports: {
        autoImport: false,
    },
    typescript:{
        includeWorkspace: true
    }
})