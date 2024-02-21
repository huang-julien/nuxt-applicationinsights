import type { Snippet } from "@microsoft/applicationinsights-web";
import type { TNitroAppInsightsConfig } from "nitro-applicationinsights";


declare module '@nuxt/schema' {
    interface RuntimeConfig {
        applicationinsights: Partial<TNitroAppInsightsConfig>
    }

    interface PublicRuntimeConfig {
        applicationinsights: Partial<Snippet>
    }

}

declare module '#app' {
    interface RuntimeNuxtHooks {
        'applicationinsights:config:client': (config: Snippet) => void
    }
}

