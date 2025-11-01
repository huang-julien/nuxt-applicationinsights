import { defineNuxtPlugin } from "nuxt/app";
import { ApplicationInsights, } from "@microsoft/applicationinsights-web";
import type { Snippet } from "@microsoft/applicationinsights-web";
import { useNuxtApp, useRuntimeConfig   } from "#imports";

import { createFetch } from "ofetch"
import { baseURL } from "#build/paths.mjs"
import { toRaw } from "vue"

export default defineNuxtPlugin({
    name: 'nuxt-applicationinsights:client',
    async setup() {
        const nuxtApp = useNuxtApp()
        const runtimeConfig = useRuntimeConfig()
        const config: Snippet = {
            config: toRaw(runtimeConfig.public).applicationinsights ?? {}
        }

        await nuxtApp.callHook('applicationinsights:config:client', config)

        const applicationInsights = new ApplicationInsights(config)

        applicationInsights.addTelemetryInitializer((e) => {
            if(e.baseType === 'PageviewData' && nuxtApp.$router && e.baseData?.uri) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const resolvedRoute = (nuxtApp.$router as any).resolve(
                    new URL(e.baseData.uri).pathname
                 ) 

                e.baseData.name = resolvedRoute.name || resolvedRoute.path || resolvedRoute.fullPath
            }
            return true
        })

        try {
            applicationInsights.loadAppInsights()

            // @ts-expect-error delete $fetch to re-create it with the augmented fetch by applicationinsights
            delete globalThis.$fetch
            // @ts-expect-error re-create $fetch with the augmented fetch by applicationinsights
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