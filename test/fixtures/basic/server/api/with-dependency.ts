import { defineEventHandler } from "h3"
import { context, propagation } from "@opentelemetry/api"
 

export default defineTracedEventHandler(async (event) => {
    const headers = {}
    propagation.inject(context.active(), headers)
    const { trace } = await $fetch<{ trace: string }>('/api/some-dep', {
        headers
    })

    return {
        trace: event.context.span.spanContext(),
        dependencyTrace: trace
    }
})