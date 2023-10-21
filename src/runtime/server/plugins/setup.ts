import { defineNitroPlugin } from 'nitropack/dist/runtime/plugin'
import { useRuntimeConfig } from '#imports'
export default defineNitroPlugin((nitro) => {
    const runtimeConfig = useRuntimeConfig()
    
    nitro.hooks.hook('applicationinsights:config', (config) => {
        Object.assign(config, runtimeConfig.applicationinsights)
    })
})
