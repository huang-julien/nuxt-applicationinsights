import { defineNuxtPlugin } from "nuxt/app";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { useRuntimeConfig } from "#imports";

export default defineNuxtPlugin({
    name: 'nuxt-applicationinsights:client',
    setup() {
        const runtimeConfig = useRuntimeConfig()
        const applicationInsights = new ApplicationInsights(runtimeConfig.public.applicationinsights)

        return {
            provide: {
                appInsights: applicationInsights
            }
        }
    }
})