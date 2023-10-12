import { TNitroAppInsightsConfig } from "nitro-applicationinsights";


declare module '@nuxt/schema' {
    interface RuntimeConfig {
        applicationInsights: Partial<TNitroAppInsightsConfig>
    }
}