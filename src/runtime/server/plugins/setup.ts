import { NitroAppPlugin } from 'nitropack'
import { useRuntimeConfig } from '#imports'

export default <NitroAppPlugin>((nitro) => {
    const runtimeConfig = useRuntimeConfig()
    
    nitro.hooks.hook('applicationinsights:config', (config) => {
        Object.assign(config, runtimeConfig.applicationinsights)
    })
})
