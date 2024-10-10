export default defineNuxtConfig({
    modules: ['nuxt-applicationinsights', '@nuxt/eslint'],
    imports: {
        autoImport: false,
    },
    typescript:{
        includeWorkspace: true
    }
})