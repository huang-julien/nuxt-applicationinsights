import { defineEventHandler, setResponseHeader } from "h3";

export default defineTracedEventHandler(event => {
    // setResponseHeader(event, 'x-trace', event.$appInsights.trace.toString())
    return new Error('error message')
})