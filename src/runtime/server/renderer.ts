import { context } from '@opentelemetry/api';
import renderer from "#nuxt-renderer"
import { eventHandler } from "h3"

export default eventHandler((e) => {
    return context.with(e.otel.ctx, renderer, undefined, e)
})