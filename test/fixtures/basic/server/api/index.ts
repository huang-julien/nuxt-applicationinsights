import { defineEventHandler } from "h3";

export default defineEventHandler((event) => {
    return {
        trace: event.$appInsights.trace.toString(),
        initialTrace: event.$appInsights.initialTrace,
    }
})