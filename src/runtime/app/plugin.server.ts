import { defineNuxtPlugin } from "#imports"
import { INITIAL_TRACE_KEY } from "./utils"

export default defineNuxtPlugin({
    name: 'nuxt-applicationinsights:server',
    enforce: "pre",
    setup(nuxtApp) {
        nuxtApp.payload.data[INITIAL_TRACE_KEY] = nuxtApp.ssrContext!.event.$appInsights.initialTrace

        return {
            provide: {
                appInsights: nuxtApp.ssrContext!.event.$appInsights
            }
        }
    }
})