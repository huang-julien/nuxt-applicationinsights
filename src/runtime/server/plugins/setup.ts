import { type NitroAppPlugin } from 'nitropack'
import { useRuntimeConfig } from '#imports'
import { defu } from 'defu'

export default <NitroAppPlugin>((nitro) => {
    const runtimeConfig = useRuntimeConfig()

    nitro.hooks.hook('applicationinsights:config', (config) => {
        Object.assign(config, defu(runtimeConfig.applicationinsights, {
            connectionString: runtimeConfig.public.applicationinsights?.connectionString
        }))
    })
})
