import { type NitroAppPlugin } from 'nitropack'
import { useRuntimeConfig } from '#imports'
import { defu } from 'defu'
import { getQuery } from "h3"

export default <NitroAppPlugin>((nitro) => {
    const runtimeConfig = useRuntimeConfig()

    nitro.hooks.hook('applicationinsights:config', (config) => {
        Object.assign(config, defu(runtimeConfig.applicationinsights, {
            connectionString: runtimeConfig.public.applicationinsights?.connectionString
        }))
    })
    
    nitro.hooks.hook('applicationinsights:trackRequest:before', (event, telemetry) => {
        if (event.path.startsWith('/__nuxt_error')) {
			const queries = getQuery<{
				url: string
				statusCode: number
				statusMessage: string
			}>(event)

			telemetry.url = queries.url
			telemetry.success = queries.statusCode < 400
			telemetry.resultCode = queries.statusCode
			telemetry.name = `${event.method}: ${queries.url}`
			telemetry.contextObjects!['ai.operation.name'] = `${event.method}: ${queries.url}`
		}
    })
})
