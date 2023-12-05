import { defineNuxtPlugin } from "#imports"
import { type H3Event } from "h3"
import { INITIAL_TRACE_KEY } from "./utils"

export default defineNuxtPlugin<{
    appInsights: H3Event['$appInsights']
}>({
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