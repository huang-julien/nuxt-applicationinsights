import { defineNuxtPlugin } from "nuxt/app";
import { ApplicationInsights, } from "@microsoft/applicationinsights-web";
import type { Snippet } from "@microsoft/applicationinsights-web";
import { useRuntimeConfig, toRaw, useRouter, useRoute } from "#imports";
import { createFetch } from "ofetch"
import { generateW3CId } from "@microsoft/applicationinsights-core-js"
import { INITIAL_TRACE_KEY } from "./utils"
// @ts-expect-error virtual file
import { baseURL } from "#build/paths.mjs"
import { defu } from "defu"

export default defineNuxtPlugin({
    name: 'nuxt-applicationinsights:client',
    async setup(nuxtApp) {
        const runtimeConfig = useRuntimeConfig()
        const route = useRoute()
        const config: Snippet = {
            config: {}
        }

        await nuxtApp.callHook('applicationinsights:config:client', config)

        // @ts-expect-error
        delete globalThis.$fetch
        const applicationInsights = new ApplicationInsights(defu(config, toRaw(runtimeConfig.public.applicationinsights as Snippet)))

        applicationInsights.loadAppInsights()
        applicationInsights.addDependencyListener(dep => {
            dep.traceId = nuxtApp.payload.data[INITIAL_TRACE_KEY].split('-')[1]
        })
        applicationInsights.addTelemetryInitializer((item) => {
            if (!item.tags) { item.tags = [] }

            if (item.baseType === 'PageviewData' || item.baseType === 'PageviewPerformanceData') {
                item.tags['ai.operation.parentId'] = undefined
                item.tags['ai.operation.id'] = nuxtApp.payload.data[INITIAL_TRACE_KEY].split('-')[1]
            } else {
                item.tags['ai.operation.parentId'] = applicationInsights.context.telemetryTrace.traceID
            }
            item.tags['ai.operation.id'] = nuxtApp.payload.data[INITIAL_TRACE_KEY].split('-')[1]
        })
        applicationInsights.context.telemetryTrace.traceID = generateW3CId()

        globalThis.$fetch = createFetch({
            defaults: {
                baseURL: baseURL()
            }
        })

        const router = useRouter()
        // TODO give users the choice between route name and route matched path
        applicationInsights.trackPageView({ name: route.name as string })
        nuxtApp.hook('app:mounted', () => {
            nuxtApp.hook('page:start', () => {
                applicationInsights.context.telemetryTrace.traceID = generateW3CId()
                // TODO give users the choice between route name and route matched path
                applicationInsights.startTrackPage(router.currentRoute.value.name as string)
                applicationInsights.flush()
            })
            nuxtApp.hook('page:finish', () => {
                applicationInsights.stopTrackPage(router.currentRoute.value.name as string, router.currentRoute.value.fullPath)
                applicationInsights.flush()
            })
        })

        return {
            provide: {
                appInsights: applicationInsights
            }
        }
    }
})