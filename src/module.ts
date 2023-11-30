import { defineNuxtModule, createResolver, addServerPlugin, addTypeTemplate, addPlugin } from '@nuxt/kit'
import { TNitroAppInsightsConfig } from 'nitro-applicationinsights'
import { defu } from 'defu'
import type { Snippet } from '@microsoft/applicationinsights-web'

export interface ApplicationInsightModuleOptions {
  /**
   * Application insights connection string
   * Can be overriden by serverConfig, clientConfig or runtimeConfig
   */
  connectionString?: string
  /**
   * Enable server side application insights with nitro-applicationinsights
   */
  serverEnabled: boolean
  /**
   * Enable client side application insights with @microsoft/applicationinsights-web
   */
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
      Object.assign({}, { connectionString: options.connectionString }, options.serverConfig) as Partial<TNitroAppInsightsConfig>
    )

    nuxt.options.runtimeConfig.public.applicationinsights = defu(nuxt.options.runtimeConfig.public.applicationinsights || {},      
       options.clientConfig, {
        config: {
          connectionString: options.connectionString
        }
       } as Partial<Snippet>
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

    if(options.serverEnabled) {
      addPlugin({
        src: resolver.resolve('./runtime/app/plugin.server'),
        mode: 'server',
      })
      
      // init config
      addServerPlugin(resolver.resolve('./runtime/server/plugins/setup.ts'))
      // awaiting for nitro module to transform nitro-applicationinsights into a nitro module
      addServerPlugin(resolver.resolve('./runtime/server/plugins/applicationinsights'))
    }

    if(options.clientEnabled) {
      addPlugin({
        src: resolver.resolve('./runtime/app/plugin.client'),
        mode: 'client',
      })
    }
  }
})
