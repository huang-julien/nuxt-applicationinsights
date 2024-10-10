export default defineNuxtConfig({
    modules: [
        '@nuxt/eslint',
        'nuxt-applicationinsights'
    ],
    imports: {
        autoImport: false,
    },
    typescript: {
        includeWorkspace: true
    }
})