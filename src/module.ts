import { defineNuxtModule, createResolver, addServerPlugin, addTypeTemplate, addPlugin } from '@nuxt/kit'
import { resolvePath } from "mlly"
import { defu } from 'defu'
import type { RuntimeConfig } from '@nuxt/schema'

export interface ModuleOptions {
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
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-applicationinsights',
    configKey: 'applicationinsights',
    compatibility: {
      nuxt: '>=3',
      bridge: false,
    }
  },
  // Default configuration options of the Nuxt module
  defaults: {
    serverEnabled: true,
    clientEnabled: true
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    addTypeTemplate({
      filename: 'types/nuxt-applicationinsights.d.ts',
      getContents() {
        return `/// <reference types="nitro-applicationinsights" />\n/// <reference types="nitro-opentelemetry" />`
      }
    })

    nuxt.hook('prepare:types', ({ references }) => {
      references.push({ path: './types/nuxt-applicationinsights.d.ts' })
      references.push({ path: resolver.resolve('./runtime/types.d.ts') })
    })

    if (options.connectionString) {
      nuxt.options.runtimeConfig = defu(nuxt.options.runtimeConfig, {
        public: {
          applicationinsights: {
            connectionString: options.connectionString
          }
        },
        applicationinsights: {
          connectionString: options.connectionString
        }
      }) as RuntimeConfig
    }

    if (options.serverEnabled) {
      nuxt.options.nitro.modules ||= []
      nuxt.options.nitro.modules.push(await resolvePath('nitro-applicationinsights'))
      addPlugin({
        src: resolver.resolve('./runtime/app/plugin.server'),
        mode: 'server',
      })

      // init config
      addServerPlugin(resolver.resolve('./runtime/server/plugins/setup'))
    }

    if (options.clientEnabled) {
      addPlugin({
        src: resolver.resolve('./runtime/app/plugin.client'),
        mode: 'client',
      })
    }
  }
})
