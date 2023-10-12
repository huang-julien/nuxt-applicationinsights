import { defineNuxtModule, createResolver, addServerPlugin, addTypeTemplate, addPlugin } from '@nuxt/kit'
import { TNitroAppInsightsConfig } from 'nitro-applicationinsights'

// Module options TypeScript interface definition
export interface ApplicationInsightModuleOptions {
  serverEnabled: boolean
  serverConfig?: Partial<TNitroAppInsightsConfig>
}

export default defineNuxtModule<ApplicationInsightModuleOptions>({
  meta: {
    name: 'nuxt-applicationinsights',
    configKey: 'applicationinsights',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    serverEnabled: true
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.runtimeConfig = {
      ...nuxt.options.runtimeConfig,
      applicationInsights: options.serverConfig ?? {}
    }

    addTypeTemplate({
      filename: 'types/nuxt-applicationinsights.d.ts',
       getContents() {
        return `/// <reference types="nitro-applicationinsights" />`
      }
    })

    nuxt.hook('prepare:types', ({ references }) => {
      references.push({ path: './types/nuxt-applicationinsights.d.ts' })
      references.push({ path: resolver.resolve('./runtime/types.d.ts') })
    })

    addPlugin({
      src: resolver.resolve('./runtime/app/plugin.server'),
      mode: 'server',
    })

    // init config
    addServerPlugin(resolver.resolve('./runtime/server/plugins/setup.ts'))
    // awaiting for nitro module to transform nitro-applicationinsights into a nitro module
    addServerPlugin(resolver.resolve('./runtime/server/plugins/applicationinsights'))
  }
})
