import { defineNuxtPlugin } from "nuxt/app";
import { ApplicationInsights, } from "@microsoft/applicationinsights-web";
import type { Snippet } from "@microsoft/applicationinsights-web";
import { useRuntimeConfig } from "#imports";
import { createFetch } from "ofetch"
import { baseURL } from "#build/paths.mjs"
import { toRaw } from "vue"

export default defineNuxtPlugin({
    name: 'nuxt-applicationinsights:client',
    async setup(nuxtApp) {
        const runtimeConfig = useRuntimeConfig()
        const config: Snippet = {
            config: toRaw(runtimeConfig.public).applicationinsights ?? {}
        }

        await nuxtApp.callHook('applicationinsights:config:client', config)

        const applicationInsights = new ApplicationInsights(config)

        try {
            applicationInsights.loadAppInsights()

            // @ts-expect-error
            delete globalThis.$fetch
            globalThis.$fetch = createFetch({
                defaults: {
                    baseURL: baseURL()
                }
            })
        } catch(e) {
           nuxtApp.callHook("applicationinsights:load:error", e as Error) 
        }
        return {
            provide: {
                appInsights: applicationInsights
            }
        }
    }
})