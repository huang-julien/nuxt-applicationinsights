import { propagation } from "@opentelemetry/api"
import type { H3Event } from "h3"

export function getTrace(event: H3Event = useEvent()) {
    const carrier: Record<string, unknown> = {}
    propagation.inject(event.otel.ctx, carrier)

    return carrier.traceparent
}