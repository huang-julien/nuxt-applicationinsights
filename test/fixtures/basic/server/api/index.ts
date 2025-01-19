import { defineEventHandler } from "h3";

export default defineTracedEventHandler((event) => {
    return { 
        trace: event.context.span.spanContext(),
    }
})