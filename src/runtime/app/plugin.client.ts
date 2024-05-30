import { defineNuxtPlugin } from "nuxt/app";
import { ApplicationInsights, } from "@microsoft/applicationinsights-web";
import type { Snippet } from "@microsoft/applicationinsights-web";
import { useRuntimeConfig } from "#imports";
import { createFetch } from "ofetch"
// @ts-expect-error virtual file
import { baseURL } from "#build/paths.mjs"

export default defineNuxtPlugin({
    name: 'nuxt-applicationinsights:client',
    async setup(nuxtApp) {
        const runtimeConfig = useRuntimeConfig()
        const config: Snippet = {
            config: runtimeConfig.public.applicationinsights ?? {}
        }

        await nuxtApp.callHook('applicationinsights:config:client', config)

        const applicationInsights = new ApplicationInsights(config)

        applicationInsights.loadAppInsights()

        // @ts-expect-error
        delete globalThis.$fetch
        globalThis.$fetch = createFetch({
            defaults: {
                baseURL: baseURL()
            }
        })

        return {
            provide: {
                appInsights: applicationInsights
            }
        }
    }
})