import { defineEventHandler } from "h3"
import { getTraceparentHeaders} from "nitro-applicationinsights/runtime"

export default defineEventHandler(async (event) => {
    const { trace } = await $fetch<{trace: string}>('/api/some-dep', {
        headers: getTraceparentHeaders(event)
    })

    return {
        trace: event.$appInsights.trace.toString(),
        dependencyTrace: trace
    }
})