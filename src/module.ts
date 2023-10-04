import { defineNuxtModule, createResolver, addServerPlugin, addTypeTemplate } from '@nuxt/kit'
// Module options TypeScript interface definition
export interface ModuleOptions {

}

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
        return `/// <reference types="nitro-applicationinsights" />`
      }
    })

    nuxt.hook('prepare:types', ({ references }) => {
      references.push({ path: './types/nuxt-applicationinsights.d.ts' })
    })

    addServerPlugin(resolver.resolve('./runtime/server/plugins/applicationinsights'))
  }
})
