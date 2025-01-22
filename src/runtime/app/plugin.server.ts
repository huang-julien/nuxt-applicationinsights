import { defineNuxtPlugin } from "#imports"
import Applicationinsights from "applicationinsights"
import { SEMATTRS_HTTP_ROUTE } from "@opentelemetry/semantic-conventions"
 
export default defineNuxtPlugin({
    name: 'nuxt-applicationinsights:server',
    enforce: "pre",
    setup(nuxtApp) {
        nuxtApp.ssrContext!.event.otel.span.setAttributes({
            [SEMATTRS_HTTP_ROUTE]: returnIfString(nuxtApp._route.name) ?? returnIfString(nuxtApp._route.matched[0]?.name) ?? returnIfString(nuxtApp._route.matched[0]?.path) ?? nuxtApp._route.fullPath
        })
 
        return {
            provide: {
                appInsights: Applicationinsights.defaultClient
            }
        }
    }
})

function returnIfString(maybeString: unknown): string | undefined {
    if (typeof maybeString === 'string') {
        return maybeString
    }
}
