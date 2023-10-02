import { defineNuxtModule, createResolver, addServerPlugin, normalizeModuleTranspilePath, addTypeTemplate, resolvePath } from '@nuxt/kit'
// Module options TypeScript interface definition
export interface ModuleOptions { }

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-applicationinsights',
    configKey: 'applicationinsights',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    addTypeTemplate({
      filename: 'types/nuxt-applicationinsights.d.ts',
       getContents() {
        return `/// <reference types="nitro-applicationinsights/types" />`
      }
    })

    nuxt.hook('nitro:config', (config) => {
      config.typescript = config.typescript || {}
      config.typescript.tsConfig = config.typescript.tsConfig || {}
      config.typescript.tsConfig.compilerOptions = config.typescript.tsConfig.compilerOptions || []
      config.typescript.tsConfig.compilerOptions.types = config.typescript.tsConfig.compilerOptions.types || []
      config.typescript.tsConfig.compilerOptions.types.push('nitro-applicationinsights')
    })

    nuxt.hook('prepare:types', ({ references }) => {
      references.push({ path: './types/nitro-applicationinsights' })
    })

    addServerPlugin(resolver.resolve('./runtime/server/plugins/applicationinsights'))
  }
})
