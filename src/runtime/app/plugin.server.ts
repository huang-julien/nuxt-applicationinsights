import { defineNuxtPlugin } from "#imports"
import { INITIAL_TRACE_KEY } from "./utils"
import type NodeClient from 'applicationinsights/out/Library/NodeClient'
import type Traceparent from 'applicationinsights/out/Library/Traceparent'

export default defineNuxtPlugin<{
    appInsights: {
        startTime: number;
        client: NodeClient;
        trace: Traceparent;
        initialTrace: string;
        properties: Record<string, string>;
        shouldTrack: boolean;
    }
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