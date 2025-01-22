import { context, propagation } from "@opentelemetry/api"
import { getTrace } from "../utils/traces"


export default defineTracedEventHandler(async () => {
    const headers = {}
    propagation.inject(context.active(), headers)
    const { trace } = await $fetch<{ trace: string }>('/api/some-dep', {
        headers
    })

    return {
        trace: getTrace(),
        dependencyTrace: trace
    }
})