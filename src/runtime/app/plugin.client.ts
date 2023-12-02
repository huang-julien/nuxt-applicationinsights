import { defineNuxtPlugin } from "nuxt/app";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import type { Snippet } from "@microsoft/applicationinsights-web";
import { useRuntimeConfig, toRaw } from "#imports";
import { createFetch } from "ofetch"
// @ts-expect-error virtual file
import { baseURL } from "#build/paths.mjs"
 
export default defineNuxtPlugin({
    name: 'nuxt-applicationinsights:client',
      setup(nuxtApp) {
        const runtimeConfig = useRuntimeConfig()
 
        // @ts-expect-error
        delete globalThis.$fetch
        const applicationInsights = new ApplicationInsights(toRaw(runtimeConfig.public.applicationinsights as Snippet))

        applicationInsights.loadAppInsights()
        
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