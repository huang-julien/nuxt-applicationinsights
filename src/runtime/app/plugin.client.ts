import { defineNuxtPlugin } from "nuxt/app";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { useRuntimeConfig, toRaw } from "#imports";

export default defineNuxtPlugin({
    name: 'nuxt-applicationinsights:client',
    setup() {
        const runtimeConfig = useRuntimeConfig()

        const applicationInsights = new ApplicationInsights(toRaw(runtimeConfig.public.applicationinsights))

        return {
            provide: {
                appInsights: applicationInsights
            }
        }
    }
})