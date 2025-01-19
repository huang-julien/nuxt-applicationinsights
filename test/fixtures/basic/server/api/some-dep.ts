import { defineEventHandler } from "h3";


export default defineTracedEventHandler(async (event) => {
    return {
        trace: event.context.span.spanContext(),
    }
})