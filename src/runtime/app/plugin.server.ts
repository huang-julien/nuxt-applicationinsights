import { defineNuxtPlugin } from "#imports"

export default defineNuxtPlugin({
    name: 'nuxt-applicationinsights:server',
    setup(nuxtApp) {
        const appInsights = nuxtApp.ssrContext!.event.$appInsights

        return {
            provide: {
                appInsights
            }
        }
    }
})