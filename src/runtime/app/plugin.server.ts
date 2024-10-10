import { defineNuxtPlugin } from "#imports"
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
        nuxtApp.ssrContext!.event.$appInsights.requestTelemetry.name = `GET: ${returnIfString(nuxtApp._route.name) ?? returnIfString(nuxtApp._route.matched[0]?.name) ?? returnIfString(nuxtApp._route.matched[0]?.path) ?? nuxtApp._route.fullPath}`
        return {
            provide: {
                appInsights: nuxtApp.ssrContext!.event.$appInsights
            }
        }
    }
})

function returnIfString(maybeString: unknown): string | undefined {
    if (typeof maybeString === 'string') {
        return maybeString
    }
}
