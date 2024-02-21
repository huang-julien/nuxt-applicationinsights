import { defineNuxtPlugin } from "nuxt/app";
import { ApplicationInsights, } from "@microsoft/applicationinsights-web";
import type { Snippet } from "@microsoft/applicationinsights-web";
import { useRuntimeConfig, toRaw, useRouter } from "#imports";
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
 
        const config: Snippet = {
            config: {}
        }

        await nuxtApp.callHook('applicationinsights:config:client', config)

        // @ts-expect-error
        delete globalThis.$fetch
        const applicationInsights = new ApplicationInsights(defu(config, toRaw(runtimeConfig.public.applicationinsights as Snippet)))
     
        applicationInsights.loadAppInsights()
        applicationInsights.addTelemetryInitializer((item) => {
            if(!item.tags) { item.tags = [] }

            if(item.baseType !== 'PageviewData') {
                if(item.ext?.trace){
                    item.ext.trace.traceID = generateW3CId()
                    item.ext.trace.parentID = applicationInsights.context.telemetryTrace.traceID
                }
            }
            item.tags['ai.operation.id'] = nuxtApp.payload.data[INITIAL_TRACE_KEY] 
        })
        applicationInsights.context.telemetryTrace.parentID = nuxtApp.payload.data[INITIAL_TRACE_KEY].split('-')[1]
 
        globalThis.$fetch = createFetch({
            defaults: {
                baseURL: baseURL()
            }
        })

        const router = useRouter()

        router.beforeEach((to, from, next) => {  
            applicationInsights.context.telemetryTrace.parentID = nuxtApp.payload.data[INITIAL_TRACE_KEY].split('-')[1]
            applicationInsights.context.telemetryTrace.traceID = generateW3CId()
            // TODO give users the choice between route name and route matched path
            applicationInsights.startTrackPage(to.name as string)
            next()
        })
 
         router.afterEach((to) => {  
            applicationInsights.stopTrackPage(to.name as string)
            applicationInsights.flush()
        })

        return {
            provide: {
                appInsights: applicationInsights
            }
        }
    }
})