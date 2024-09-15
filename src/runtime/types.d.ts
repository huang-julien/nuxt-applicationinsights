import type { Snippet } from "@microsoft/applicationinsights-web";
import type { TNitroAppInsightsConfig } from "nitro-applicationinsights";


declare module '@nuxt/schema' {
    interface RuntimeConfig {
        applicationinsights: Partial<TNitroAppInsightsConfig>
    }

    interface PublicRuntimeConfig {
        applicationinsights: Partial<Snippet['config']>
    }

}

declare module '#app/nuxt' {
    interface RuntimeNuxtHooks {
        'applicationinsights:config:client': (config: Snippet) => void
        'applicationinsights:load:error': (error: Error) => void
    }
}

