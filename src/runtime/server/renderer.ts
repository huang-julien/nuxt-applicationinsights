import { context } from '@opentelemetry/api';
// @ts-expect-error alias to nuxt renderer
import renderer from "#nuxt-renderer"
import { eventHandler } from "h3"
export default eventHandler((e) => {
    return context.with(e.otel.ctx, renderer, undefined, e)
})