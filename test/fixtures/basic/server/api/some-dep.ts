import { defineEventHandler } from "h3";


export default defineEventHandler(async (event) => {
    return {
        trace: event.$appInsights.trace.toString(),
    }
})