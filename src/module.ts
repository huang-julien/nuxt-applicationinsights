import { defineNuxtModule, createResolver, addServerPlugin, addTypeTemplate, addPlugin } from '@nuxt/kit'
import { TNitroAppInsightsConfig } from 'nitro-applicationinsights'
import { defu } from 'defu'
import { Snippet } from '@microsoft/applicationinsights-web'

// Module options TypeScript interface definition
export interface ApplicationInsightModuleOptions {
  serverEnabled: boolean
  clientEnabled: boolean
  serverConfig?: Partial<TNitroAppInsightsConfig>
  clientConfig?: Partial<Snippet>
}

export default defineNuxtModule<ApplicationInsightModuleOptions>({
  meta: {
    name: 'nuxt-applicationinsights',
    configKey: 'applicationinsights',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    serverEnabled: true,
    clientEnabled: true
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.applicationinsights = defu(nuxt.options.runtimeConfig.applicationinsights || {},      
      options.serverConfig
    )

    nuxt.options.runtimeConfig.public.applicationinsights = defu(nuxt.options.runtimeConfig.public.applicationinsights || {},      
      options.clientConfig
    )

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

    addPlugin({
      src: resolver.resolve('./runtime/app/plugin.client'),
      mode: 'client',
    })

    // init config
    addServerPlugin(resolver.resolve('./runtime/server/plugins/setup.ts'))
    // awaiting for nitro module to transform nitro-applicationinsights into a nitro module
    addServerPlugin(resolver.resolve('./runtime/server/plugins/applicationinsights'))
  }
})
