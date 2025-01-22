import { context } from '@opentelemetry/api';
import errorRenderer from "#nuxt-error-renderer"
import { defineNitroErrorHandler } from '#imports';

export default defineNitroErrorHandler((error, event) => { 
    return context.with(event.otel.ctx, errorRenderer, undefined, error, event)
})