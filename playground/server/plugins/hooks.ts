export default defineNitroPlugin(nitro => {
    nitro.hooks.hook('otel:span:end', ({ event}) => { 
    })
})