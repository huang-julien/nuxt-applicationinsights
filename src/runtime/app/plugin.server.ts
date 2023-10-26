import { defineNuxtPlugin } from "#imports"
import type { H3Event } from "h3"

export default defineNuxtPlugin<{
    appInsights: H3Event['$appInsights']
}>({
    name: 'nuxt-applicationinsights:server',
    setup(nuxtApp) { 

        return {
            provide: {
                appInsights: nuxtApp.ssrContext!.event.$appInsights
            }
        }
    }
})